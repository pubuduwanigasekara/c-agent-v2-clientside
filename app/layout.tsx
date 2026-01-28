import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Cricket Intelligence | AI-Powered Cricket Intelligence & Match Analysis",
  description:
    "AI and data-driven T20 pre-match analysis based on historical data, players’ current form, weather conditions, and pitch reports.",

  openGraph: {
    title:
      "Cricket Intelligence | AI-Powered Cricket Intelligence & Match Analysis",
    description:
      "AI and data-driven T20 pre-match analysis based on historical data, players’ current form, weather conditions, and pitch reports.",
    url: "https://cricket-ai-agent.en2h.tech/",
    siteName: "Cricket Agent",
    images: [
      {
        url: "https://ik.imagekit.io/ojcyr6b6l/crick%20agent%20OG.png",
        width: 1200,
        height: 630,
        alt: "Cricket Agent - AI Powered Match Analysis",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Cricket Agent | AI-Powered Cricket Intelligence & Match Analysis",
    description:
      "AI and data-driven T20 pre-match analysis based on historical data, players’ current form, weather conditions, and pitch reports.",
    images: ["https://ik.imagekit.io/ojcyr6b6l/crick%20agent%20OG.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
