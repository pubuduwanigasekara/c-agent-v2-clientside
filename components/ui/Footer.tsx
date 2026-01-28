"use client";

import React from "react";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://www.facebook.com/entwoh",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/entwoh",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/company/entwoh",
    },
    {
      name: "YouTube",
      icon: Youtube,
      href: "https://www.youtube.com/@entwoh",
    },
  ];

  return (
    <footer className="bg-[#11074b] border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <img
            src="https://ik.imagekit.io/ojcyr6b6l/EN2H%20Main%20Logo%20Black%20Edition.png?updatedAt=1765596023483"
            alt="EN2H Logo"
            className="h-8 w-auto brightness-0 invert"
          />
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6 mb-12">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-[#ef660f] transition-colors"
              aria-label={social.name}
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="w-full pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
            © {currentYear} EN2H PVT LTD. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-white/20 text-[10px] font-bold uppercase tracking-widest">
              Secured by EN2H AI
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
