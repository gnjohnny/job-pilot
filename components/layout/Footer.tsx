import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full bg-surface border-t border-border px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          alt="JobPilot Logo"
          width={94}
          height={32}
          className="object-contain"
        />
      </Link>

      {/* Footer Links */}
      <div className="flex items-center gap-6">
        <Link
          href="/dashboard"
          className="font-sans text-xs font-medium text-text-secondary hover:text-text-primary transition-colors"
        >
          Dashboard
        </Link>
        <Link
          href="/privacy"
          className="font-sans text-xs font-medium text-text-secondary hover:text-text-primary transition-colors"
        >
          Privacy Policy
        </Link>
        <Link
          href="/terms"
          className="font-sans text-xs font-medium text-text-secondary hover:text-text-primary transition-colors"
        >
          Terms & Condition
        </Link>
      </div>
    </footer>
  );
}
