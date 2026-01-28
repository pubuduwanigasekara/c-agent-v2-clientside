"use client";

import React from "react";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

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
    {
      name: "Whatsapp",
      icon: WhatsappIcon,
      href: "https://whatsapp.com/channel/0029Vb5yDNNLdQelbVcS3W0A",
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
        </div>
      </div>
    </footer>
  );
}
