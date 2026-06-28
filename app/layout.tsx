import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PostHogProvider } from "@/components/providers/PostHogProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "JobPilot — AI-Powered Job Hunting Assistant",
  description: "Discover relevant tech jobs, research employers instantly, and apply with confidence using AI-powered matching and dossiers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col">
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}


