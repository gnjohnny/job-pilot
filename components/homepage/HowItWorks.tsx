"use client";

import { useState } from "react";
import Image from "next/image";

type HowItWorksItem = {
  title: string;
  description: string;
};

const ITEMS: HowItWorksItem[] = [
  {
    title: "Understand your match score",
    description:
      "See how your profile lines up with each role before you apply. Get a clear breakdown of what fits and what's missing.",
  },
  {
    title: "AI-Powered Job Matching",
    description:
      "Stop guessing which jobs are worth applying to. JobPilot scores every role against your actual skills so you focus on the ones that matter.",
  },
  {
    title: "Focus on the right roles",
    description:
      "Filter out low fit jobs and stay on the ones that actually matter. Spend less time sorting and more time applying.",
  },
];

export function HowItWorks() {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <section className="w-full bg-surface py-20 border-b border-border">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column - Terminal Visual Mockup */}
        <div className="relative w-full order-last md:order-first bg-overlay-dark rounded-2xl shadow-xl overflow-hidden p-2 transition-all duration-500 hover:shadow-2xl">
          {/* Terminal Header */}
          <div className="bg-overlay-dark border-b border-border-muted/30 px-4 py-2.5 flex items-center gap-3">
            {/* Window Controls */}
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-error" />
              <div className="w-3 h-3 rounded-full bg-warning" />
              <div className="w-3 h-3 rounded-full bg-success" />
            </div>
            {/* Terminal Title */}
            <div className="font-mono text-xs text-text-muted ml-2">
              agent_log.ts
            </div>
          </div>

          {/* Terminal Content */}
          <div className="relative w-full aspect-434/264 rounded-b-xl overflow-hidden bg-overlay-dark">
            <Image
              src="/images/agnet-log.png"
              alt="Agent Log Terminal Preview"
              fill
              className="object-cover p-2"
            />
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="flex flex-col">
          <h2 className="font-sans text-3xl sm:text-[32px] font-bold leading-10 text-text-primary tracking-tight mb-8">
            Apply With More Confidence, Every Time
          </h2>

          <div className="flex flex-col gap-6">
            {ITEMS.map((item, idx) => {
              const isActive = idx === activeItem;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveItem(idx)}
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
                    {item.title}
                  </h3>
                  <p
                    className={`mt-2 font-sans text-sm leading-5 transition-opacity ${
                      isActive
                        ? "text-text-secondary opacity-100"
                        : "text-text-muted opacity-80"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
