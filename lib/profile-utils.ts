export type ProfileDataForCompletion = {
  full_name?: string | null;
  phone?: string | null;
  location?: string | null;
  current_title?: string | null;
  years_experience?: number | string | null;
  skills?: string[] | null;
  work_experience?: any[] | null;
  education?: {
    highestDegree?: string | null;
    fieldOfStudy?: string | null;
    institutionName?: string | null;
    graduationYear?: string | null;
  } | any | null;
  job_titles_seeking?: string[] | null;
  resume_pdf_url?: string | null;
};

export function calculateProfileCompletion(profile: ProfileDataForCompletion | null | undefined) {
  if (!profile) {
    return {
      percentage: 0,
      missingFields: ["NAME", "PHONE", "LOCATION", "TITLE", "YEARS_EXP", "SKILLS", "EXPERIENCE", "EDUCATION", "JOB_PREF", "RESUME"],
      isComplete: false,
    };
  }

  const missingFields: string[] = [];
  let score = 0;

  // 1. Full Name (10%)
  if (profile.full_name && profile.full_name.trim() !== "") {
    score += 10;
  } else {
    missingFields.push("NAME");
  }

  // 2. Phone Number (10%)
  if (profile.phone && profile.phone.trim() !== "" && !profile.phone.includes("000-0000")) {
    score += 10;
  } else {
    missingFields.push("PHONE");
  }

  // 3. Location (10%)
  if (profile.location && profile.location.trim() !== "" && profile.location.toLowerCase() !== "city, country") {
    score += 10;
  } else {
    missingFields.push("LOCATION");
  }

  // 4. Current Title (10%)
  if (profile.current_title && profile.current_title.trim() !== "") {
    score += 10;
  } else {
    missingFields.push("TITLE");
  }

  // 5. Years of Experience (10%)
  if (profile.years_experience !== undefined && profile.years_experience !== null && String(profile.years_experience).trim() !== "") {
    score += 10;
  } else {
    missingFields.push("YEARS_EXP");
  }

  // 6. Skills (10%)
  if (Array.isArray(profile.skills) && profile.skills.length > 0) {
    score += 10;
  } else {
    missingFields.push("SKILLS");
  }

  // 7. Work Experience (10%)
  if (Array.isArray(profile.work_experience) && profile.work_experience.length > 0 && profile.work_experience.some(w => w.company && w.company.trim() !== "")) {
    score += 10;
  } else {
    missingFields.push("EXPERIENCE");
  }

  // 8. Education (10%)
  const edu = profile.education;
  const eduFieldValid = edu && edu.fieldOfStudy && edu.fieldOfStudy.trim() !== "" && !edu.fieldOfStudy.includes("E.g.");
  const eduInstValid = edu && edu.institutionName && edu.institutionName.trim() !== "" && !edu.institutionName.includes("E.g.");
  if (eduFieldValid && eduInstValid) {
    score += 10;
  } else {
    missingFields.push("EDUCATION");
  }

  // 9. Job Preferences (10%)
  if (Array.isArray(profile.job_titles_seeking) && profile.job_titles_seeking.length > 0) {
    score += 10;
  } else {
    missingFields.push("JOB_PREF");
  }

  // 10. Resume PDF URL (10%)
  if (profile.resume_pdf_url && profile.resume_pdf_url.trim() !== "") {
    score += 10;
  } else {
    missingFields.push("RESUME");
  }

  // Core required fields for is_complete:
  // Must have name, phone, location, current_title, skills, experience, and education
  const coreRequiredFilled = 
    !missingFields.includes("NAME") &&
    !missingFields.includes("PHONE") &&
    !missingFields.includes("LOCATION") &&
    !missingFields.includes("TITLE") &&
    !missingFields.includes("SKILLS") &&
    !missingFields.includes("EXPERIENCE") &&
    !missingFields.includes("EDUCATION");

  return {
    percentage: score,
    missingFields,
    isComplete: coreRequiredFilled,
  };
}
