import { NextRequest, NextResponse } from "next/server";
import { createInsforgeServer } from "@/lib/insforge-server";
import pdf from "pdf-parse";
import OpenAI from "openai";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate Request
    const insforge = await createInsforgeServer();
    const { data: { user }, error: authError } = await insforge.auth.getCurrentUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2. Retrieve PDF File
    const formData = await req.formData();
    const file = formData.get("resume") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No resume file provided." },
        { status: 400 }
      );
    }

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 3. Parse PDF
    let pdfText = "";
    try {
      const parsedData = await pdf(buffer);
      pdfText = parsedData.text;
    } catch (parseError) {
      console.error("[api/resume/extract] pdf-parse error:", parseError);
      return NextResponse.json(
        { success: false, error: "Failed to parse the PDF file. Please ensure it is a valid, readable PDF." },
        { status: 400 }
      );
    }

    if (!pdfText || pdfText.trim().length < 50) {
      return NextResponse.json(
        { success: false, error: "Could not extract sufficient text from this PDF. Please try a different file." },
        { status: 400 }
      );
    }

    // 4. Query OpenAI GPT-4o
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const systemPrompt = `You are an expert AI resume parsing assistant. Your task is to extract profile details from the raw text of a candidate's resume and return a structured JSON object that exactly matches the schema below.

RULES:
1. Extract as much information as possible from the provided resume text.
2. For fields that cannot be inferred, return the default values specified.
3. The "experience_level" field MUST be one of: "junior", "mid", "senior", "lead". Determine this based on years of experience, job titles, and responsibilities.
4. The "remote_preference" field MUST be one of: "any", "remote", "hybrid", "onsite" (default is "any").
5. The "cover_letter_tone" field MUST be one of: "formal", "casual", "enthusiastic" (default is "formal").
6. The "education.highestDegree" field MUST be one of: "high_school", "bachelors", "masters", "phd", "other" (default is "high_school").
7. For "work_experience", extract up to 3 of the most recent work experiences. Do not extract more than 3. Each experience must have:
   - "company": string
   - "jobTitle": string
   - "startDate": string (e.g. "January 2022")
   - "endDate": string (e.g. "Present" or "December 2023", or empty string "" if currently working here)
   - "currentlyWorking": boolean (true if currently working there, false otherwise)
   - "responsibilities": string (bullet points summarizing duties and achievements)
8. Return ONLY a valid JSON object matching the JSON schema below. No other text or markdown formatting outside of the JSON.

JSON Schema:
{
  "full_name": string (default ""),
  "phone": string (default ""),
  "location": string (default "", e.g. "New York, USA"),
  "current_title": string (default ""),
  "experience_level": "junior" | "mid" | "senior" | "lead" (default "junior"),
  "years_experience": integer or null (default null),
  "skills": array of strings (default []),
  "industries": array of strings (default []),
  "work_experience": [
    {
      "company": string,
      "jobTitle": string,
      "startDate": string,
      "endDate": string,
      "currentlyWorking": boolean,
      "responsibilities": string
    }
  ] (max 3 items, default []),
  "education": {
    "highestDegree": "high_school" | "bachelors" | "masters" | "phd" | "other" (default "high_school"),
    "fieldOfStudy": string (default ""),
    "institutionName": string (default ""),
    "graduationYear": string (default "")
  },
  "job_titles_seeking": array of strings (default []),
  "remote_preference": "any" | "remote" | "hybrid" | "onsite" (default "any"),
  "salary_expectation": string (default ""),
  "preferred_locations": array of strings (default []),
  "cover_letter_tone": "formal" | "casual" | "enthusiastic" (default "formal")
}`;

    const userPrompt = `RESUME TEXT:
${pdfText}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      response_format: { type: "json_object" },
      temperature: 0.3,
      max_tokens: 1200,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("Empty response from OpenAI");
    }

    const parsedResult = JSON.parse(content);

    return NextResponse.json({
      success: true,
      data: parsedResult,
    });
  } catch (error) {
    console.error("[api/resume/extract] Extraction error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error during resume extraction." },
      { status: 500 }
    );
  }
}
