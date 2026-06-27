import Link from "next/link";

export function CTASection() {
  return (
    <section className="relative w-full py-20 px-6 overflow-hidden bg-gradient-to-b from-info-lightest via-accent-muted to-background">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-gradient-to-r from-accent/10 to-info/10 blur-3xl rounded-full opacity-60 pointer-events-none" />

      <div className="relative max-w-3xl mx-auto flex flex-col items-center text-center">
        {/* Title */}
        <h2 className="font-sans text-3xl sm:text-4xl font-extrabold leading-tight text-text-primary">
          Your next job search can feel a lot less overwhelming
        </h2>

        {/* Subtitle */}
        <p className="mt-4 font-sans text-base text-text-secondary font-medium max-w-xl">
          Set up your profile, upload your resume, and start finding matches in minutes.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/login"
            className="font-sans text-sm font-medium px-6 py-3 bg-text-primary hover:bg-text-darkest text-white rounded-md transition-colors shadow-sm inline-flex items-center gap-2"
          >
            Get Started
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
          <Link
            href="/login"
            className="font-sans text-sm font-medium px-6 py-3 bg-surface hover:bg-surface-secondary text-text-primary border border-border rounded-md transition-colors shadow-sm inline-flex items-center"
          >
            Find Your First Match
          </Link>
        </div>
      </div>
    </section>
  );
}
