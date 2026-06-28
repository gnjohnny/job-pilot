"use server";

import { revalidatePath } from "next/cache";
import { createInsforgeServer } from "@/lib/insforge-server";
import { createPostHogServer } from "@/lib/posthog-server";
import { calculateProfileCompletion } from "@/lib/profile-utils";

export type SaveProfileResult = {
  success: boolean;
  error?: string;
  data?: any;
};

export async function saveProfileAction(formData: FormData): Promise<SaveProfileResult> {
  try {
    const insforge = await createInsforgeServer();
    
    // 1. Authenticate user
    const { data: { user }, error: authError } = await insforge.auth.getCurrentUser();
    if (authError || !user) {
      return { success: false, error: "Not authenticated. Please sign in again." };
    }

    // 2. Parse Profile Data JSON
    const profileDataStr = formData.get("profileData") as string;
    if (!profileDataStr) {
      return { success: false, error: "Missing profile payload data." };
    }

    let profilePayload;
    try {
      profilePayload = JSON.parse(profileDataStr);
    } catch (e) {
      return { success: false, error: "Invalid profile data format." };
    }

    // 3. Handle Resume PDF upload if present
    const resumeFile = formData.get("resume") as File | null;
    let resumePdfUrl = profilePayload.resume_pdf_url || null;

    if (resumeFile && resumeFile.size > 0) {
      const uploadPath = `${user.id}/resume.pdf`;
      const { data: uploadData, error: uploadError } = await insforge.storage
        .from("resumes")
        .upload(uploadPath, resumeFile);

      if (uploadError) {
        console.error("[actions/profile] Resume storage upload error:", uploadError);
        return { success: false, error: `Resume upload failed: ${uploadError.message}` };
      }

      if (uploadData?.url) {
        resumePdfUrl = uploadData.url;
      }
    }

    // Combine payload for completion check
    const checkPayload = {
      ...profilePayload,
      resume_pdf_url: resumePdfUrl,
    };

    // 4. Calculate profile completion metrics
    const { isComplete } = calculateProfileCompletion(checkPayload);

    // 5. Query existing profile state to check completion changes
    const { data: existingProfile } = await insforge.database
      .from("profiles")
      .select("is_complete")
      .eq("id", user.id)
      .maybeSingle();

    const previouslyComplete = existingProfile?.is_complete || false;

    // 6. Upsert the profile table row
    const { data: updatedProfile, error: upsertError } = await insforge.database
      .from("profiles")
      .upsert({
        id: user.id,
        email: user.email,
        full_name: profilePayload.full_name || null,
        phone: profilePayload.phone || null,
        location: profilePayload.location || null,
        current_title: profilePayload.current_title || null,
        experience_level: profilePayload.experience_level || "junior",
        years_experience: profilePayload.years_experience ? parseInt(String(profilePayload.years_experience), 10) : null,
        skills: profilePayload.skills || [],
        industries: profilePayload.industries || [],
        work_experience: profilePayload.work_experience || [],
        education: profilePayload.education || null,
        job_titles_seeking: profilePayload.job_titles_seeking || [],
        remote_preference: profilePayload.remote_preference || "any",
        preferred_locations: profilePayload.preferred_locations || [],
        salary_expectation: profilePayload.salary_expectation || null,
        cover_letter_tone: profilePayload.cover_letter_tone || "formal",
        linkedin_url: profilePayload.linkedin_url || null,
        portfolio_url: profilePayload.portfolio_url || null,
        work_authorization: profilePayload.work_authorization || "citizen",
        resume_pdf_url: resumePdfUrl,
        is_complete: isComplete,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (upsertError) {
      console.error("[actions/profile] Upsert profile DB error:", upsertError);
      return { success: false, error: `Failed to save profile database record: ${upsertError.message}` };
    }

    // 7. Track PostHog Event if profile is newly completed
    if (isComplete && !previouslyComplete) {
      try {
        const posthog = createPostHogServer();
        posthog.capture({
          distinctId: user.id,
          event: "profile_completed",
          properties: { userId: user.id },
        });
        await posthog.shutdown();
      } catch (phError) {
        console.error("[actions/profile] PostHog telemetry failed:", phError);
      }
    }

    // 8. Revalidate the profile path
    revalidatePath("/profile");

    return { success: true, data: updatedProfile };
  } catch (error) {
    console.error("[actions/profile] SaveProfileAction unhandled error:", error);
    return { success: false, error: "An unexpected error occurred while saving your profile." };
  }
}
