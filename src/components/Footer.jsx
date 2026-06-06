import { useState } from "react";

const FOOTER_COLUMNS = [
  {
    heading: "RESIDENTIAL SOLUTIONS",
    links: [
      { label: "Heating", href: "/residential-solutions/heating" },
      { label: "Cooling", href: "/residential-solutions/cooling" },
      { label: "Fresh Air", href: "/residential-solutions/fresh-air" },
      { label: "Water Heaters Rental", href: "/rentals/water-heaters" },
      { label: "Furnaces & A/C Rental", href: "/rentals/furnaces-ac" },
    ],
  },
  {
    heading: "COMMERCIAL & INDUSTRIAL",
    links: [
      { label: "Restaurants / Kitchens", href: "/commercial-solutions/restaurants" },
      { label: "Office & Retail Spaces", href: "/commercial-solutions/office-retail" },
      { label: "Light Industrial Solutions", href: "/light-industrial" },
      { label: "Industrial Ventilation", href: "/light-industrial" },
    ],
  },
  {
    heading: "OTHER SERVICES",
    links: [
      { label: "Drawings & Permits", href: "/other-services/drawings-permits" },
      { label: "Custom Hoses", href: "/other-services/custom-hoses" },
      { label: "Construction Packages", href: "/other-services/construction-package" },
      { label: "Custom Ductwork", href: "/other-services/custom-ductwork" },
      { label: "Water Purification", href: "/water-purification" },
    ],
  },
  {
    heading: "QUICK LINKS",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Feedback", href: "/feedback" },
      { label: "Contact Us", href: "/contact" },
      { label: "Store", href: "/store" },

    ],
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/Metric-Air-Limited/100070397580268/",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/metricairlimited/",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },

];

export default function Footer() {
  return (
    <footer className="w-full bg-[#0f0f1a] text-white relative overflow-hidden">
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e94560] to-transparent opacity-60" />

      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, #e94560 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-14 pb-8 relative z-10">

        {/* ── LOGO ROW ── */}
        <div className="mb-10 border-b border-white/5 pb-8 flex justify-center md:justify-start">
          <a href="/" className="block">
            <img
              src="/images/metric.png"
              alt="MetricAir Logo"
              className="h-24 sm:h-32 lg:h-36 w-auto object-contain"
            />
          </a>
        </div>

        {/* ── CONTENT ROW ── */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-12 items-start">

          {/* LEFT: Tagline + contact info */}
          <div className="flex flex-col gap-5 lg:w-[280px] shrink-0 w-full text-center md:text-left">
            <p className="text-gray-300 text-sm leading-relaxed tracking-wide font-medium">
              Delivering premium HVAC solutions for homes, businesses, and industrial spaces across Canada.
            </p>

            <div className="flex flex-col gap-2.5 text-xs text-gray-400 mt-2 border-t border-white/5 pt-4">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-[#e94560] font-semibold">Call:</span>
                <a href="tel:+16479241421" className="hover:text-[#e94560] transition-colors">+1 (647) 924-1421</a>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-[#e94560] font-semibold">Email:</span>
                <a href="mailto:metricairlimited.ca@gmail.com" className="hover:text-[#e94560] transition-colors break-all">metricairlimited.ca@gmail.com</a>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-[#e94560] font-semibold">Area:</span>
                <span>Greater Toronto Area</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Links grid */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
              {FOOTER_COLUMNS.map((column, index) => {
                const accentColors = [
                  "bg-[#e94560]", // Red
                  "bg-[#3b82f6]", // Blue
                  "bg-white",     // White
                  "bg-[#e94560]", // Red
                ];
                const accentBg = accentColors[index] || "bg-white";

                return (
                  <div key={column.heading} className="flex flex-col items-center text-center md:items-start md:text-left gap-4">
                    <div className="relative pb-2 w-full">
                      <h4 className="text-white text-xs font-black tracking-widest uppercase">
                        {column.heading}
                      </h4>
                      <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-8 h-[2px] ${accentBg}`} />
                    </div>
                    <ul className="flex flex-col gap-2.5 items-center text-center md:items-start md:text-left w-full">
                      {column.links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            className="block text-gray-300 text-sm font-medium hover:text-[#e94560] hover:translate-x-1.5 transition-all duration-200 leading-snug"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="border-t border-white/10 mt-2 pt-8">
          {/* Socials row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-6" />

            <div className="flex items-center gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:text-[#e94560] hover:bg-white/5 border border-white/10 hover:border-[#e94560]/40 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <span className="block w-1.5 h-1.5 rounded-full bg-[#e94560] animate-pulse" />
              <span className="text-gray-600 text-[11px]">Serving the Greater Toronto Area</span>
            </div>
          </div>

          {/* Copyright + policies row */}
          <div className="border-t border-white/5 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-gray-600 text-[11px]">
              Copyright © 2000–{new Date().getFullYear()} MetricAir Systems. All Rights Reserved.
            </p>
            <div className="flex items-center gap-4">
              {["Privacy Policy", "Warranty Policy", "Return Policy"].map((policy, i, arr) => (
                <span key={policy} className="flex items-center gap-4">
                  <a href="#" className="text-gray-600 text-[11px] font-medium hover:text-[#e94560] transition-colors duration-150">
                    {policy}
                  </a>
                  {i < arr.length - 1 && <span className="w-px h-3 bg-white/10" />}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS animation */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </footer>
  );
}