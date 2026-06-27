"use client";

import { useState } from "react";
import Image from "next/image";

type FeatureItem = {
  title: string;
  description: string;
};

const FEATURES: FeatureItem[] = [
  {
    title: "Find jobs that actually fit",
    description:
      "Search by title and location or paste a job link. Get matched roles you can quickly scan.",
  },
  {
    title: "Know the Company Before You Apply",
    description:
      "Stop guessing what a company is about. JobPilot browses their site and gives you everything you need to apply with confidence.",
  },
  {
    title: "Keep track of every application",
    description:
      "Keep a clear view of every job you've found, tailored. Your activity and progress all stay in one simple place.",
  },
];

export function Features() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="w-full bg-surface-secondary py-20 border-b border-border">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column - Content */}
        <div className="flex flex-col">
          <h2 className="font-sans text-3xl sm:text-[32px] font-bold leading-10 text-text-primary tracking-tight mb-8">
            Manage Your Job Search With Ease
          </h2>

          <div className="flex flex-col gap-6">
            {FEATURES.map((feature, idx) => {
              const isActive = idx === activeTab;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`pl-6 border-l-2 cursor-pointer transition-all duration-300 ${
                    isActive
                      ? "border-accent text-text-primary"
                      : "border-border-muted text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <h3
                    className={`font-sans text-base font-semibold leading-6 ${
                      isActive ? "text-text-primary" : "text-text-slate-medium"
                    }`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={`mt-2 font-sans text-sm leading-5 transition-opacity ${
                      isActive
                        ? "text-text-secondary opacity-100"
                        : "text-text-muted opacity-80"
                    }`}
                  >
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column - Visual Mockup */}
        <div className="relative w-full bg-surface border border-border rounded-2xl shadow-lg overflow-hidden p-2 transition-all duration-500 hover:shadow-xl">
          <div className="relative w-full aspect-482/335 rounded-xl overflow-hidden">
            <Image
              src="/images/jobs-lists.png"
              alt="Job Matches Preview"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
