import Image from "next/image";

export function Testimonials() {
  return (
    <section className="w-full bg-surface-secondary py-20 border-b border-border">
      <div className="max-w-3xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Category Label */}
        <span className="font-sans text-xs font-semibold uppercase tracking-wider text-accent">
          Success Stories
        </span>

        {/* Testimonial Quote */}
        <blockquote className="mt-6 font-sans text-xl sm:text-2xl font-medium leading-relaxed text-text-primary">
          “I used to spend my evenings copy-pasting resumes. Now I open my dashboard to see
          interviews waiting. It feels like cheating. Had 3 offers on the table
          simultaneously.”
        </blockquote>

        {/* User Card */}
        <div className="mt-8 flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border">
            <Image
              src="/images/user-icon.png"
              alt="Tom Wilson avatar"
              fill
              className="object-cover"
            />
          </div>
          <div className="text-left">
            <div className="font-sans text-sm font-semibold text-text-primary">
              Tom Wilson
            </div>
            <div className="font-sans text-xs text-text-secondary">
              Junior Developer
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
