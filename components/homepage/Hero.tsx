import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative w-full pt-20 pb-16 px-6 overflow-hidden bg-gradient-to-b from-info-lightest via-accent-muted to-background">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-gradient-to-r from-accent/10 to-info/10 blur-3xl rounded-full opacity-60 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Title */}
        <h1 className="font-sans text-4xl sm:text-6xl font-extrabold leading-[1.1] tracking-tight text-text-primary max-w-3xl">
          Job hunting is hard.
          <br />
          <span className="text-text-primary">Your tools shouldn't be.</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 font-sans text-base sm:text-lg font-medium text-text-secondary leading-7 max-w-2xl">
          Stop applying blind. JobPilot finds the jobs, researches the
          companies, and gives you everything you need to stand out.
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

        {/* Browser Demo Wrapper */}
        <div className="w-full mt-16 bg-surface rounded-2xl border border-border shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-accent/5">
          {/* Browser Header */}
          <div className="bg-surface-secondary border-b border-border px-4 py-3 flex items-center gap-4">
            {/* Window Controls */}
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-error" />
              <div className="w-3 h-3 rounded-full bg-warning" />
              <div className="w-3 h-3 rounded-full bg-success" />
            </div>
            {/* Address Bar */}
            <div className="flex-1 max-w-md mx-auto bg-surface border border-border rounded-md px-3 py-1 text-xs text-text-muted flex items-center justify-center gap-1">
              <svg
                className="w-3 h-3 opacity-60 text-text-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span>jobpilot.ai/dashboard</span>
            </div>
          </div>
          {/* Content */}
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: "16/8" }}
          >
            <Image
              src="/images/dashboard-demo.png"
              alt="JobPilot Dashboard Preview"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
