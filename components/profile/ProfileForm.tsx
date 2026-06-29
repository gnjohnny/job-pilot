"use client";

import { useState } from "react";
import { 
  UploadCloud, 
  AlertCircle, 
  Calendar, 
  Plus, 
  X, 
  Trash2, 
  Sparkles,
  ChevronDown
} from "lucide-react";
import { calculateProfileCompletion } from "@/lib/profile-utils";
import { saveProfileAction } from "@/actions/profile";
import { toast } from "react-hot-toast";
import { insforge } from "@/lib/insforge-client";

// Custom SVG Circular Progress Ring
function CircularProgress({ percentage }: { percentage: number }) {
  const radius = 28;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-20 h-20">
      <svg className="w-20 h-20 transform -rotate-90">
        {/* Track circle */}
        <circle
          cx="40"
          cy="40"
          r={radius}
          className="stroke-border-light fill-transparent"
          strokeWidth={strokeWidth}
        />
        {/* Fill circle */}
        <circle
          cx="40"
          cy="40"
          r={radius}
          className="stroke-error fill-transparent transition-all duration-300 ease-in-out"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute font-sans font-bold text-lg text-text-primary">
        {percentage}%
      </span>
    </div>
  );
}

type Props = {
  initialData?: any;
  email: string;
};

export function ProfileForm({ initialData, email }: Props) {
  // Profile state initialized from initialData or defaults
  const [fullName, setFullName] = useState(initialData?.full_name ?? "");
  const [phone, setPhone] = useState(initialData?.phone ?? "");
  const [location, setLocation] = useState(initialData?.location ?? "");
  const [linkedinUrl, setLinkedinUrl] = useState(initialData?.linkedin_url ?? "");
  const [portfolioUrl, setPortfolioUrl] = useState(initialData?.portfolio_url ?? "");
  const [workAuthorization, setWorkAuthorization] = useState(initialData?.work_authorization ?? "citizen");

  const [currentTitle, setCurrentTitle] = useState(initialData?.current_title ?? "");
  const [experienceLevel, setExperienceLevel] = useState(initialData?.experience_level ?? "junior");
  const [yearsExperience, setYearsExperience] = useState(
    initialData?.years_experience !== null && initialData?.years_experience !== undefined 
      ? String(initialData.years_experience) 
      : ""
  );

  // Skills state
  const [skills, setSkills] = useState<string[]>(initialData?.skills ?? []);
  const [skillInput, setSkillInput] = useState("");

  // Industries state
  const [industries, setIndustries] = useState<string[]>(initialData?.industries ?? []);
  const [industryInput, setIndustryInput] = useState("");

  // Work Experience state (up to 3)
  const [workExperience, setWorkExperience] = useState<any[]>(
    Array.isArray(initialData?.work_experience) && initialData.work_experience.length > 0
      ? initialData.work_experience.map((w: any, index: number) => ({
          id: w.id || index.toString(),
          company: w.company || "",
          jobTitle: w.jobTitle || "",
          startDate: w.startDate || "",
          endDate: w.endDate || "",
          currentlyWorking: !!w.currentlyWorking,
          responsibilities: w.responsibilities || ""
        }))
      : []
  );

  // Education state
  const [highestDegree, setHighestDegree] = useState(initialData?.education?.highestDegree ?? "high_school");
  const [fieldOfStudy, setFieldOfStudy] = useState(initialData?.education?.fieldOfStudy ?? "");
  const [institutionName, setInstitutionName] = useState(initialData?.education?.institutionName ?? "");
  const [graduationYear, setGraduationYear] = useState(initialData?.education?.graduationYear ?? "");

  // Job Preferences state
  const [jobTitlesSeeking, setJobTitlesSeeking] = useState(
    Array.isArray(initialData?.job_titles_seeking) 
      ? initialData.job_titles_seeking.join(", ") 
      : ""
  );
  const [remotePreference, setRemotePreference] = useState(initialData?.remote_preference ?? "any");
  const [salaryExpectation, setSalaryExpectation] = useState(initialData?.salary_expectation ?? "");
  const [preferredLocations, setPreferredLocations] = useState(
    Array.isArray(initialData?.preferred_locations)
      ? initialData.preferred_locations.join(", ")
      : ""
  );
  const [coverLetterTone, setCoverLetterTone] = useState(initialData?.cover_letter_tone ?? "formal");

  // File Upload and Stored Resume State
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [resumePdfUrl, setResumePdfUrl] = useState<string | null>(initialData?.resume_pdf_url ?? null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);

  // Calculate live completion stats
  const checkPayload = {
    full_name: fullName,
    phone,
    location,
    current_title: currentTitle,
    years_experience: yearsExperience,
    skills,
    work_experience: workExperience,
    education: {
      highestDegree,
      fieldOfStudy,
      institutionName,
      graduationYear,
    },
    job_titles_seeking: jobTitlesSeeking.split(",").map((t: string) => t.trim()).filter(Boolean),
    resume_pdf_url: resumePdfUrl,
  };

  const { percentage, missingFields } = calculateProfileCompletion(checkPayload);

  // Handlers for dynamic lists
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleAddIndustry = (e: React.FormEvent) => {
    e.preventDefault();
    if (industryInput.trim() && !industries.includes(industryInput.trim())) {
      setIndustries([...industries, industryInput.trim()]);
      setIndustryInput("");
    }
  };

  const handleRemoveIndustry = (industryToRemove: string) => {
    setIndustries(industries.filter(i => i !== industryToRemove));
  };

  const handleAddRole = () => {
    if (workExperience.length >= 3) return;
    setWorkExperience([
      ...workExperience,
      {
        id: Date.now().toString(),
        company: "",
        jobTitle: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        responsibilities: ""
      }
    ]);
  };

  const handleRemoveRole = (id: string) => {
    setWorkExperience(workExperience.filter(w => w.id !== id));
  };

  const handleUpdateRole = (id: string, field: string, value: any) => {
    setWorkExperience(
      workExperience.map(w => {
        if (w.id === id) {
          return { ...w, [field]: value };
        }
        return w;
      })
    );
  };

  // Drag & drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        setUploadedFile(file);
      } else {
        toast.error("Only PDF formatting is allowed.");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf") {
        setUploadedFile(file);
      } else {
        toast.error("Only PDF formatting is allowed.");
      }
    }
  };

  // Download and view stored resume PDF using authenticated client
  const handleViewStoredResume = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!resumePdfUrl) {
      toast.error("No stored resume found.");
      return;
    }

    const toastId = toast.loading("Downloading resume...");

    try {
      // Extract the key/path from the url
      // e.g. https://.../objects/user-id%2Fresume.pdf?v=...
      let path = "";
      if (resumePdfUrl.includes("/objects/")) {
        const afterObjects = resumePdfUrl.split("/objects/")[1];
        const withoutQuery = afterObjects.split("?")[0];
        path = decodeURIComponent(withoutQuery);
      } else {
        // Fallback key if URL doesn't follow expected pattern
        const userId = initialData?.id;
        if (!userId) {
          toast.dismiss(toastId);
          toast.error("Could not determine resume path.");
          return;
        }
        path = `${userId}/resume.pdf`;
      }

      const { data: blob, error: downloadError } = await insforge.storage
        .from("resumes")
        .download(path);

      if (downloadError) {
        toast.dismiss(toastId);
        toast.error(`Download failed: ${downloadError.message}`);
        return;
      }

      if (blob) {
        toast.dismiss(toastId);
        // Explicitly set MIME type to application/pdf so the browser correctly opens it as a PDF
        const pdfBlob = new Blob([blob], { type: "application/pdf" });
        const objectUrl = URL.createObjectURL(pdfBlob);
        window.open(objectUrl, "_blank");
      } else {
        toast.dismiss(toastId);
        toast.error("No content received from server.");
      }
    } catch (err) {
      toast.dismiss(toastId);
      console.error("[ProfileForm] Resume download error:", err);
      toast.error("An error occurred while downloading the resume.");
    }
  };

  const handleExtractResume = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!uploadedFile) return;

    setIsExtracting(true);
    const toastId = toast.loading("Extracting resume contents...");

    try {
      const formData = new FormData();
      formData.append("resume", uploadedFile);

      const response = await fetch("/api/resume/extract", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success && result.data) {
        const data = result.data;
        
        // Auto-fill fields
        if (data.full_name) setFullName(data.full_name);
        if (data.phone) setPhone(data.phone);
        if (data.location) setLocation(data.location);
        if (data.current_title) setCurrentTitle(data.current_title);
        if (data.experience_level) setExperienceLevel(data.experience_level);
        if (data.years_experience !== undefined && data.years_experience !== null) {
          setYearsExperience(String(data.years_experience));
        }
        if (Array.isArray(data.skills)) setSkills(data.skills);
        if (Array.isArray(data.industries)) setIndustries(data.industries);
        
        if (Array.isArray(data.work_experience)) {
          setWorkExperience(
            data.work_experience.map((w: any, index: number) => ({
              id: index.toString(),
              company: w.company || "",
              jobTitle: w.jobTitle || "",
              startDate: w.startDate || "",
              endDate: w.endDate || "",
              currentlyWorking: !!w.currentlyWorking,
              responsibilities: w.responsibilities || ""
            }))
          );
        }

        if (data.education) {
          if (data.education.highestDegree) setHighestDegree(data.education.highestDegree);
          if (data.education.fieldOfStudy) setFieldOfStudy(data.education.fieldOfStudy);
          if (data.education.institutionName) setInstitutionName(data.education.institutionName);
          if (data.education.graduationYear) setGraduationYear(data.education.graduationYear);
        }

        if (Array.isArray(data.job_titles_seeking)) {
          setJobTitlesSeeking(data.job_titles_seeking.join(", "));
        }
        if (data.remote_preference) setRemotePreference(data.remote_preference);
        if (data.salary_expectation) setSalaryExpectation(data.salary_expectation);
        if (Array.isArray(data.preferred_locations)) {
          setPreferredLocations(data.preferred_locations.join(", "));
        }
        if (data.cover_letter_tone) setCoverLetterTone(data.cover_letter_tone);

        toast.dismiss(toastId);
        toast.success("Profile details extracted successfully! Please review and save.");
      } else {
        toast.dismiss(toastId);
        toast.error(result.error || "Failed to extract details from resume.");
      }
    } catch (err) {
      toast.dismiss(toastId);
      console.error("[ProfileForm] Extraction error:", err);
      toast.error("An error occurred during resume extraction.");
    } finally {
      setIsExtracting(false);
    }
  };

  // Submit/Save Handler
  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const payload = {
        full_name: fullName,
        phone,
        location,
        current_title: currentTitle,
        experience_level: experienceLevel,
        years_experience: yearsExperience ? parseInt(yearsExperience, 10) : null,
        skills,
        industries,
        work_experience: workExperience.map((w: any) => { const { id, ...rest } = w; return rest; }),
        education: {
          highestDegree,
          fieldOfStudy,
          institutionName,
          graduationYear,
        },
        job_titles_seeking: jobTitlesSeeking.split(",").map((t: string) => t.trim()).filter(Boolean),
        remote_preference: remotePreference,
        salary_expectation: salaryExpectation,
        preferred_locations: preferredLocations.split(",").map((l: string) => l.trim()).filter(Boolean),
        cover_letter_tone: coverLetterTone,
        linkedin_url: linkedinUrl,
        portfolio_url: portfolioUrl,
        work_authorization: workAuthorization,
        resume_pdf_url: resumePdfUrl,
      };

      const formData = new FormData();
      formData.append("profileData", JSON.stringify(payload));
      
      if (uploadedFile) {
        formData.append("resume", uploadedFile);
      }

      const result = await saveProfileAction(formData);
      if (result.success) {
        toast.success("Profile saved successfully!");
        if (result.data?.resume_pdf_url) {
          setResumePdfUrl(result.data.resume_pdf_url);
        }
        setUploadedFile(null);
      } else {
        toast.error("Error saving profile: " + result.error);
      }
    } catch (err) {
      console.error("[ProfileForm] Save error:", err);
      toast.error("An unexpected error occurred while saving your profile.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto pb-12">
      {/* 1. Attention Banner */}
      {missingFields.length > 0 && (
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm flex items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-error/10 text-error shrink-0">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="font-sans text-base font-semibold text-text-primary">
                Profile needs attention
              </h2>
              <p className="font-sans text-sm text-text-secondary">
                Complete the missing fields to improve your chance of getting tailored matches and generating quality resumes.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {missingFields.map((field) => (
                  <span key={field} className="bg-error/10 text-error font-sans text-xs font-semibold px-2 py-1 rounded">
                    {field}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="shrink-0">
            <CircularProgress percentage={percentage} />
          </div>
        </div>
      )}

      {/* 2. Resume Section */}
      <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm flex flex-col gap-4">
        <div>
          <h3 className="font-sans text-base font-semibold text-text-primary">
            Resume
          </h3>
          <p className="font-sans text-sm text-text-secondary mt-1">
            Upload an existing resume to auto-fill the profile, or generate a new tailored one from your details below.
          </p>
        </div>

        {/* Drag & Drop zone */}
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
            isDragActive 
              ? "border-accent bg-accent/5" 
              : "border-border-muted bg-surface-secondary hover:bg-surface-secondary/50"
          }`}
        >
          <input
            type="file"
            id="resume-upload"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept=".pdf"
            onChange={handleFileChange}
            disabled={isExtracting}
          />
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-muted text-accent mb-4">
            <UploadCloud className="w-6 h-6" />
          </div>
          <p className="font-sans text-sm font-semibold text-text-primary">
            {uploadedFile 
              ? `Uploaded: ${uploadedFile.name}` 
              : resumePdfUrl 
                ? "Active Resume (Stored PDF)"
                : "Click to upload or drag and drop"
            }
          </p>
          <p className="font-sans text-xs text-text-secondary mt-1">
            {uploadedFile 
              ? `${(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB • PDF formatting only.`
              : "PDF formatting only. Maximum file size 5MB."
            }
          </p>
          {resumePdfUrl && !uploadedFile && (
            <button 
              type="button"
              onClick={handleViewStoredResume}
              className="text-xs text-accent hover:underline mt-1 inline-block z-10 cursor-pointer"
            >
              View stored PDF
            </button>
          )}
          {uploadedFile ? (
            <div className="flex gap-2 mt-4 z-10">
              <button
                type="button"
                onClick={handleExtractResume}
                disabled={isExtracting}
                className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-dark disabled:bg-accent/50 text-accent-foreground rounded-md font-sans text-sm font-medium shadow-sm transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                {isExtracting ? "Extracting..." : "Extract from Resume"}
              </button>
              <button
                type="button"
                onClick={() => setUploadedFile(null)}
                disabled={isExtracting}
                className="px-4 py-2 bg-surface border border-border text-text-primary rounded-md font-sans text-sm font-medium shadow-sm hover:bg-surface-secondary transition-colors cursor-pointer"
              >
                Clear
              </button>
            </div>
          ) : (
            <label
              htmlFor="resume-upload"
              className="mt-4 px-4 py-2 bg-surface border border-border text-text-primary rounded-md font-sans text-sm font-medium shadow-sm hover:bg-surface-secondary cursor-pointer transition-colors z-10"
            >
              Select Resume
            </label>
          )}
        </div>

        {/* Generate Resume Banner */}
        <div className="flex items-center justify-between bg-surface-secondary rounded-xl p-4 border border-border mt-2">
          <span className="font-sans text-sm text-text-secondary">
            Need a fresh document based on the fields below?
          </span>
          <button className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-dark text-accent-foreground rounded-md font-sans text-sm font-medium shadow-sm transition-colors cursor-pointer">
            <Sparkles className="w-4 h-4" />
            Generate Resume from Profile
          </button>
        </div>
      </div>

      {/* 3. Profile Information Section */}
      <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm flex flex-col gap-6">
        <div>
          <h3 className="font-sans text-base font-semibold text-text-primary">
            Profile Information
          </h3>
          <p className="font-sans text-sm text-text-secondary mt-1">
            This context is used to accurately represent you in agent interactions.
          </p>
        </div>

        <hr className="border-border" />

        {/* Personal Info */}
        <div className="flex flex-col gap-4">
          <h4 className="font-sans text-base font-semibold text-text-primary">
            Personal Info
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                className="font-sans text-sm text-text-primary bg-surface border border-border rounded-md px-3 py-2 focus:ring-1 focus:ring-accent focus:border-accent outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Email
              </label>
              <input
                type="email"
                value={email}
                disabled
                className="font-sans text-sm text-text-muted bg-surface-secondary border border-border rounded-md px-3 py-2 cursor-not-allowed outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="font-sans text-sm text-text-primary bg-surface border border-border rounded-md px-3 py-2 focus:ring-1 focus:ring-accent focus:border-accent outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, Country"
                className="font-sans text-sm text-text-primary bg-surface border border-border rounded-md px-3 py-2 focus:ring-1 focus:ring-accent focus:border-accent outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary">
                LinkedIn URL
              </label>
              <input
                type="url"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="https://linkedin.com/in/username"
                className="font-sans text-sm text-text-primary bg-surface border border-border rounded-md px-3 py-2 focus:ring-1 focus:ring-accent focus:border-accent outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Portfolio / GitHub
              </label>
              <input
                type="url"
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
                placeholder="https://github.com/username"
                className="font-sans text-sm text-text-primary bg-surface border border-border rounded-md px-3 py-2 focus:ring-1 focus:ring-accent focus:border-accent outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Work Authorization
              </label>
              <div className="relative">
                <select
                  value={workAuthorization}
                  onChange={(e) => setWorkAuthorization(e.target.value)}
                  className="w-full appearance-none font-sans text-sm text-text-primary bg-surface border border-border rounded-md pl-3 pr-10 py-2 focus:ring-1 focus:ring-accent focus:border-accent outline-none cursor-pointer"
                >
                  <option value="citizen">Citizen</option>
                  <option value="permanent_resident">Permanent Resident</option>
                  <option value="visa_required">Visa Required</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <hr className="border-border" />

        {/* Professional Info */}
        <div className="flex flex-col gap-4">
          <h4 className="font-sans text-base font-semibold text-text-primary">
            Professional Info
          </h4>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Current/Recent Job Title
              </label>
              <input
                type="text"
                value={currentTitle}
                onChange={(e) => setCurrentTitle(e.target.value)}
                placeholder="Current Title"
                className="font-sans text-sm text-text-primary bg-surface border border-border rounded-md px-3 py-2 focus:ring-1 focus:ring-accent focus:border-accent outline-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary">
                  Experience Level
                </label>
                <div className="relative">
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="w-full appearance-none font-sans text-sm text-text-primary bg-surface border border-border rounded-md pl-3 pr-10 py-2 focus:ring-1 focus:ring-accent focus:border-accent outline-none cursor-pointer"
                  >
                    <option value="junior">Junior</option>
                    <option value="mid">Mid-Level</option>
                    <option value="senior">Senior</option>
                    <option value="lead">Lead / Principal</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary">
                  Years of Experience
                </label>
                <input
                  type="number"
                  value={yearsExperience}
                  onChange={(e) => setYearsExperience(e.target.value)}
                  placeholder="Years"
                  className="font-sans text-sm text-text-primary bg-surface border border-border rounded-md px-3 py-2 focus:ring-1 focus:ring-accent focus:border-accent outline-none"
                />
              </div>
            </div>

            {/* Skills tag input */}
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Skills
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="Add a skill"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddSkill(e);
                    }
                  }}
                  className="flex-grow font-sans text-sm text-text-primary bg-surface border border-border rounded-md px-3 py-2 focus:ring-1 focus:ring-accent focus:border-accent outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-4 py-2 bg-surface border border-border hover:bg-surface-secondary text-text-primary font-sans text-sm font-medium rounded-md shadow-sm transition-colors cursor-pointer"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 bg-surface-secondary border border-border-light text-text-primary font-sans text-xs font-medium pl-3 pr-2 py-1 rounded-full"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-text-secondary hover:text-text-primary p-0.5 rounded-full hover:bg-border-light"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Industries Worked In */}
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Industries Worked In (Optional)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={industryInput}
                  onChange={(e) => setIndustryInput(e.target.value)}
                  placeholder="E.g. FinTech, Healthcare"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddIndustry(e);
                    }
                  }}
                  className="flex-grow font-sans text-sm text-text-primary bg-surface border border-border rounded-md px-3 py-2 focus:ring-1 focus:ring-accent focus:border-accent outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddIndustry}
                  className="px-4 py-2 bg-surface border border-border hover:bg-surface-secondary text-text-primary font-sans text-sm font-medium rounded-md shadow-sm transition-colors cursor-pointer"
                >
                  Add
                </button>
              </div>
              {industries.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {industries.map((industry) => (
                    <span
                      key={industry}
                      className="inline-flex items-center gap-1.5 bg-surface-secondary border border-border-light text-text-primary font-sans text-xs font-medium pl-3 pr-2 py-1 rounded-full"
                    >
                      {industry}
                      <button
                        type="button"
                        onClick={() => handleRemoveIndustry(industry)}
                        className="text-text-secondary hover:text-text-primary p-0.5 rounded-full hover:bg-border-light"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <hr className="border-border" />

        {/* Work Experience */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h4 className="font-sans text-base font-semibold text-text-primary">
              Work Experience
            </h4>
            {workExperience.length < 3 && (
              <button
                type="button"
                onClick={handleAddRole}
                className="flex items-center gap-1 text-accent hover:text-accent-dark font-sans text-sm font-semibold cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add role
              </button>
            )}
          </div>

          <div className="flex flex-col gap-6">
            {workExperience.length === 0 ? (
              <div className="text-center py-6 border border-dashed border-border rounded-xl">
                <p className="font-sans text-sm text-text-muted">
                  No work experience added yet. Click "Add role" to add your experience.
                </p>
              </div>
            ) : (
              workExperience.map((work, index) => (
                <div 
                  key={work.id} 
                  className="relative p-5 border border-border rounded-xl bg-surface flex flex-col gap-4"
                >
                  {/* Delete role button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveRole(work.id)}
                    className="absolute top-4 right-4 text-text-muted hover:text-error transition-colors cursor-pointer p-1 rounded-md hover:bg-error/5"
                    title="Remove experience"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={work.company}
                        onChange={(e) => handleUpdateRole(work.id, "company", e.target.value)}
                        placeholder="Company"
                        className="font-sans text-sm text-text-primary bg-surface border border-border rounded-md px-3 py-2 focus:ring-1 focus:ring-accent focus:border-accent outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary">
                        Job Title
                      </label>
                      <input
                        type="text"
                        value={work.jobTitle}
                        onChange={(e) => handleUpdateRole(work.id, "jobTitle", e.target.value)}
                        placeholder="Job Title"
                        className="font-sans text-sm text-text-primary bg-surface border border-border rounded-md px-3 py-2 focus:ring-1 focus:ring-accent focus:border-accent outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5 relative">
                      <label className="font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary">
                        Start Date
                      </label>
                      <div className="relative">
                        <input
                           type="text"
                           value={work.startDate}
                           onChange={(e) => handleUpdateRole(work.id, "startDate", e.target.value)}
                           placeholder="e.g. January 2022"
                           className="w-full font-sans text-sm text-text-primary bg-surface border border-border rounded-md pl-3 pr-10 py-2 focus:ring-1 focus:ring-accent focus:border-accent outline-none"
                        />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <label className="font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary">
                          End Date
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={work.currentlyWorking}
                            onChange={(e) => handleUpdateRole(work.id, "currentlyWorking", e.target.checked)}
                            className="rounded border-border text-accent focus:ring-accent accent-accent cursor-pointer"
                          />
                          <span className="font-sans text-xs text-text-secondary font-medium">Currently working here</span>
                        </label>
                      </div>
                      <input
                        type="text"
                        value={work.currentlyWorking ? "" : work.endDate}
                        disabled={work.currentlyWorking}
                        onChange={(e) => handleUpdateRole(work.id, "endDate", e.target.value)}
                        placeholder={work.currentlyWorking ? "---------- ----" : "e.g. Present or December 2023"}
                        className={`font-sans text-sm border rounded-md px-3 py-2 outline-none ${
                          work.currentlyWorking 
                            ? "bg-surface-secondary border-border text-text-muted cursor-not-allowed" 
                            : "bg-surface border-border text-text-primary focus:ring-1 focus:ring-accent focus:border-accent"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary">
                      Key Responsibilities
                    </label>
                    <textarea
                      value={work.responsibilities}
                      onChange={(e) => handleUpdateRole(work.id, "responsibilities", e.target.value)}
                      placeholder="Responsibilities..."
                      className="w-full h-24 font-sans text-sm text-text-primary bg-surface border border-border rounded-md px-3 py-2 focus:ring-1 focus:ring-accent focus:border-accent outline-none resize-none"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <hr className="border-border" />

        {/* Education */}
        <div className="flex flex-col gap-4">
          <h4 className="font-sans text-base font-semibold text-text-primary">
            Education
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Highest Degree
              </label>
              <div className="relative">
                <select
                  value={highestDegree}
                  onChange={(e) => setHighestDegree(e.target.value)}
                  className="w-full appearance-none font-sans text-sm text-text-primary bg-surface border border-border rounded-md pl-3 pr-10 py-2 focus:ring-1 focus:ring-accent focus:border-accent outline-none cursor-pointer"
                >
                  <option value="high_school">High School</option>
                  <option value="bachelors">Bachelor's Degree</option>
                  <option value="masters">Master's Degree</option>
                  <option value="phd">PhD</option>
                  <option value="other">Other</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Field of Study
              </label>
              <input
                type="text"
                value={fieldOfStudy}
                onChange={(e) => setFieldOfStudy(e.target.value)}
                placeholder="Computer Science"
                className="font-sans text-sm text-text-primary bg-surface border border-border rounded-md px-3 py-2 focus:ring-1 focus:ring-accent focus:border-accent outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Institution Name
              </label>
              <input
                type="text"
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                placeholder="State University"
                className="font-sans text-sm text-text-primary bg-surface border border-border rounded-md px-3 py-2 focus:ring-1 focus:ring-accent focus:border-accent outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Graduation Year
              </label>
              <input
                type="text"
                value={graduationYear}
                onChange={(e) => setGraduationYear(e.target.value)}
                placeholder="2026"
                className="font-sans text-sm text-text-primary bg-surface border border-border rounded-md px-3 py-2 focus:ring-1 focus:ring-accent focus:border-accent outline-none"
              />
            </div>
          </div>
        </div>

        <hr className="border-border" />

        {/* Job Preferences */}
        <div className="flex flex-col gap-4">
          <h4 className="font-sans text-base font-semibold text-text-primary">
            Job Preferences
          </h4>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Job Titles Seeking
              </label>
              <input
                type="text"
                value={jobTitlesSeeking}
                onChange={(e) => setJobTitlesSeeking(e.target.value)}
                placeholder="Frontend Engineer, React Developer"
                className="font-sans text-sm text-text-primary bg-surface border border-border rounded-md px-3 py-2 focus:ring-1 focus:ring-accent focus:border-accent outline-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary">
                  Remote Preference
                </label>
                <div className="relative">
                  <select
                    value={remotePreference}
                    onChange={(e) => setRemotePreference(e.target.value)}
                    className="w-full appearance-none font-sans text-sm text-text-primary bg-surface border border-border rounded-md pl-3 pr-10 py-2 focus:ring-1 focus:ring-accent focus:border-accent outline-none cursor-pointer"
                  >
                    <option value="any">Any</option>
                    <option value="remote">Remote Only</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="onsite">On-site Only</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary">
                  Salary Expectation (Optional)
                </label>
                <input
                  type="text"
                  value={salaryExpectation}
                  onChange={(e) => setSalaryExpectation(e.target.value)}
                  placeholder="e.g. $120k+"
                  className="font-sans text-sm text-text-primary bg-surface border border-border rounded-md px-3 py-2 focus:ring-1 focus:ring-accent focus:border-accent outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Preferred Locations (Optional)
              </label>
              <input
                type="text"
                value={preferredLocations}
                onChange={(e) => setPreferredLocations(e.target.value)}
                placeholder="e.g. New York, San Francisco"
                className="font-sans text-sm text-text-primary bg-surface border border-border rounded-md px-3 py-2 focus:ring-1 focus:ring-accent focus:border-accent outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Cover Letter Tone
              </label>
              <div className="relative">
                <select
                  value={coverLetterTone}
                  onChange={(e) => setCoverLetterTone(e.target.value)}
                  className="w-full appearance-none font-sans text-sm text-text-primary bg-surface border border-border rounded-md pl-3 pr-10 py-2 focus:ring-1 focus:ring-accent focus:border-accent outline-none cursor-pointer"
                >
                  <option value="formal">Formal</option>
                  <option value="casual">Casual</option>
                  <option value="enthusiastic">Enthusiastic</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button 
        onClick={handleSave}
        disabled={isSaving || isExtracting}
        className="w-full py-3 bg-accent hover:bg-accent-dark disabled:bg-accent/50 text-accent-foreground font-sans text-sm font-semibold rounded-md shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
      >
        {isSaving ? "Saving Profile..." : "Save Profile"}
      </button>
    </div>
  );
}
