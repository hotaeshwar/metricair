import { useState } from "react";
import { useLanguage } from "../LanguageContext";

const FOOTER_COLUMNS = [
  {
    heading: "RESIDENTIAL",
    sections: [
      {
        title: "TRADE",
        links: [
          { label: "Heating Systems", href: "/services/residential-heating" },
          { label: "Cooling Systems (AC)", href: "/services/residential-cooling" },
          { label: "Fresh Air / Ventilation", href: "/services/residential-fresh-air" },
          { label: "Radiant Tube Heating", href: "/services/residential-radiant" },
        ],
      },
      {
        title: "Electrical",
        links: [
          { label: "Lighting Installation", href: "/services/residential-lighting" },
          { label: "Panel Upgrades", href: "/services/residential-panel" },
          { label: "EV Charger Setup", href: "/services/residential-ev-charger" },
          { label: "Home Wiring / Setup", href: "/services/residential-wiring" },
        ],
      },
      {
        title: "Plumbing",
        links: [
          { label: "Water Supply Lines", href: "/services/residential-water-supply" },
          { label: "Drainage Systems", href: "/services/residential-drainage" },
          { label: "Fixture Installation", href: "/services/residential-fixtures" },
          { label: "Water Heaters", href: "/rentals/water-heaters" },
          { label: "Water Purification", href: "/water-purification" },
        ],
      },
    ],
  },
  {
    heading: "COMMERCIAL",
    sections: [
      {
        title: "TRADE",
        links: [
          { label: "Rooftop Units (RTUs)", href: "/services/commercial-rtu" },
          { label: "Ductwork Systems", href: "/services/commercial-ducts" },
          { label: "Make-up Air Units", href: "/services/commercial-makeup-air" },
          { label: "Exhaust Systems", href: "/services/commercial-exhaust" },
          { label: "Heat Pumps", href: "/services/commercial-heat-pumps" },
          { label: "Commercial Kitchen Vent", href: "/services/commercial-kitchen-vent" },
          { label: "Kitchen HVAC Wiring", href: "/services/commercial-wiring" },
          { label: "Office & Retail", href: "/commercial-solutions/office-retail" },
          { label: "Radiant Tube Heating", href: "/services/commercial-radiant" },
        ],
      },
      {
        title: "Electrical",
        links: [
          { label: "New Construction Elec", href: "/services/commercial-new-construction" },
          { label: "Panel Relocation", href: "/services/commercial-panel-relocation" },
          { label: "Power Upgrades", href: "/services/commercial-power-upgrades" },
          { label: "LED Lighting Upgrades", href: "/services/commercial-led-lighting" },
          { label: "Equipment Power Supply", href: "/services/commercial-equipment-power" },
          { label: "General Power Services", href: "/services/commercial-general-power" },
        ],
      },
      {
        title: "Plumbing",
        links: [
          { label: "Full Plumbing Package", href: "/services/commercial-plumbing-package" },
          { label: "Service & Maintenance", href: "/services/commercial-plumbing-service" },
          { label: "Retrofit Plumbing", href: "/services/commercial-plumbing-retrofit" },
          { label: "Water Heater Reloc", href: "/services/commercial-plumbing-heater" },
          { label: "Boilers & Hydronic", href: "/services/commercial-plumbing-boilers" },
          { label: "Commercial Piping", href: "/services/commercial-plumbing-piping" },
        ],
      },
    ],
  },
  {
    heading: "INDUSTRIAL",
    sections: [
      {
        title: "TRADE",
        links: [
          { label: "Industrial Ventilation", href: "/services/industrial-ventilation" },
          { label: "Dust & Fume Extraction", href: "/services/industrial-dust" },
          { label: "Make-up Air Systems", href: "/services/industrial-makeup-air" },
          { label: "Custom Ductwork Fab", href: "/services/industrial-ducts" },
          { label: "Equipment Cooling", href: "/services/industrial-cooling" },
          { label: "Gas Piping (HVAC)", href: "/services/industrial-gas-piping" },
          { label: "Radiant Tube Heating", href: "/services/industrial-radiant" },
        ],
      },
      {
        title: "Electrical",
        links: [
          { label: "Power Distribution", href: "/services/industrial-power-dist" },
          { label: "Equipment Wiring", href: "/services/industrial-wiring" },
          { label: "Automation & Control", href: "/services/industrial-automation" },
          { label: "Backup Power Systems", href: "/services/industrial-backup-power" },
        ],
      },
      {
        title: "Plumbing",
        links: [
          { label: "Water & Drainage", href: "/services/industrial-plumbing-water" },
          { label: "Compressed Air Systems", href: "/services/industrial-plumbing-air" },
          { label: "Boilers & Hydronic", href: "/services/industrial-plumbing-boilers" },
          { label: "Industrial Pump Systems", href: "/services/industrial-plumbing-pumps" },
        ],
      },
    ],
  },
  {
    heading: "RENTALS & SERVICES",
    sections: [
      {
        title: "Equipment Rentals",
        links: [
          { label: "Water Heaters Rental", href: "/rentals/water-heaters" },
          { label: "Furnaces & A/C Rental", href: "/rentals/furnaces-ac" },
        ],
      },
      {
        title: "Other Services",
        links: [
          { label: "Custom Ductwork", href: "/other-services/custom-ductwork" },
          { label: "Construction Package", href: "/other-services/construction-package" },
          { label: "Permit Drawings", href: "/light-industrial/permit-drawings" },
          { label: "Water Purification", href: "/water-purification" },
          { label: "Custom Hoses", href: "/other-services/custom-hoses" },
          { label: "Drawings and Permits", href: "/other-services/drawings-permits" },
        ],
      },
    ],
  },
  {
    heading: "QUICK LINKS",
    sections: [
      {
        title: "Navigation",
        links: [
          { label: "Home", href: "/" },
          { label: "Product / Services", href: "/services" },
          { label: "Store", href: "/store" },
          { label: "About Us", href: "/about" },
          { label: "Careers", href: "/careers" },
          { label: "Feedback", href: "/feedback" },
          { label: "Contact Us", href: "/contact" },
        ],
      },
    ],
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100070397580268",
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
  const { language, setLanguage, t } = useLanguage();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  return (
    <footer id="metric-footer-container" className="w-full footer-bg bg-transparent text-white relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-12 pb-4 relative z-10">

        {/* ── UNIFIED GRID ROW ── */}
        <div className="grid grid-cols-12 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 md:gap-6 lg:gap-8 mb-8 items-start w-full">

          {/* COLUMN 1: Logo & Tagline + Contact Info */}
          <div className="col-span-12 md:col-span-12 lg:col-span-2 flex flex-col gap-4 text-left items-start">
            <a href="/" className="block">
              <img
                src="/images/metricnew.png"
                alt="MetricAir Logo"
                className="footer-logo-img object-contain"
              />
            </a>
            <p className="text-gray-300 text-xs leading-relaxed tracking-wide font-medium max-w-sm text-left">
              {t("Delivering premium Trade solutions for homes, businesses, and industrial spaces across Canada.")}
            </p>

            <div className="flex flex-col gap-2 text-[11px] text-gray-400 mt-1 border-t border-white/5 pt-3 max-w-sm w-full text-left items-start">
              <div className="flex items-center justify-start gap-2">
                <span className="text-[#c3252e] font-semibold">{t("Call:")}</span>
                <a href="tel:+16479241421" className="hover:text-[#c3252e] transition-colors">+1 (647) 924-1421</a>
              </div>
              <div className="flex items-center justify-start gap-2">
                <span className="text-[#c3252e] font-semibold">{t("Email:")}</span>
                <a href="mailto:metricairlimited.ca@gmail.com" className="hover:text-[#c3252e] transition-colors break-all">metricairlimited.ca@gmail.com</a>
              </div>
              <div className="flex items-center justify-start gap-2">
                <span className="text-[#c3252e] font-semibold">{t("Area:")}</span>
                <span>{t("Canada")}</span>
              </div>
            </div>
          </div>

          {/* COLUMNS 2-6: Links Columns Wrapper */}
          <div className="col-span-12 lg:col-span-10 grid grid-cols-10 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 w-full">
            {FOOTER_COLUMNS.map((column, index) => {
              const accentColors = [
                "bg-[#c3252e]", // Red
                "bg-[#8f8cff]", // Blue
                "bg-white",     // White
                "bg-[#25d366]", // Green
                "bg-[#c3252e]", // Red
              ];
              const accentBg = accentColors[index] || "bg-white";

              return (
                <div
                  key={column.heading}
                  className="col-span-5 sm:col-span-2 flex flex-col items-start text-left gap-2 sm:gap-3 w-full"
                >
                  <div className="relative pb-1.5 sm:pb-2 w-full">
                    <h4 className="text-white text-xs sm:text-xs md:text-sm lg:text-base font-black tracking-wider uppercase leading-none">
                      {t(column.heading)}
                    </h4>
                    <div className={`absolute bottom-0 left-0 w-6 sm:w-8 h-[1.5px] sm:h-[2px] ${accentBg}`} />
                  </div>
                  
                  {column.sections.map((sec) => (
                    <div key={sec.title} className="w-full flex flex-col items-start text-left gap-1 sm:gap-1.5 mt-1 sm:mt-2">
                      <span className="text-[10px] sm:text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider block mb-0.5 sm:mb-1">
                        {t(sec.title)}
                      </span>
                      <ul className="flex flex-col gap-1.5 sm:gap-2 items-start text-left w-full">
                        {sec.links.map((link) => (
                          <li key={link.label} className="w-full">
                            <a
                              href={link.href}
                              className="footer-link block text-gray-300 text-[10px] sm:text-[10px] md:text-xs lg:text-sm font-semibold hover:text-[#c3252e] hover:translate-x-0.5 transition-all duration-200 leading-tight break-words"
                            >
                              {t(link.label)}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="border-t border-white/10 mt-1 pt-5">
          {/* Socials row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#c3252e]/40 text-gray-300 hover:text-white text-xs font-semibold transition-all duration-200"
              >
                {language === 'en-CA' && <span className="flex items-center gap-1.5"><CanadaFlag /> English (CA)</span>}
                {language === 'en-GB' && <span className="flex items-center gap-1.5"><UKFlag /> English (UK)</span>}
                {language === 'en-US' && <span className="flex items-center gap-1.5"><USFlag /> English (US)</span>}
                <svg className={`w-3 h-3 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {langDropdownOpen && (
                <>
                  {/* Backdrop */}
                  <div className="fixed inset-0 z-40" onClick={() => setLangDropdownOpen(false)} />

                  <div className="absolute bottom-full left-0 mb-2 w-36 rounded-xl bg-[#131326] border border-white/10 shadow-2xl p-1 z-50 flex flex-col gap-0.5 animate-[fadeSlideIn_0.2s_ease]">
                    <button
                      onClick={() => { setLanguage('en-CA'); setLangDropdownOpen(false); }}
                      className={`flex items-center gap-2.5 w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${language === 'en-CA' ? 'bg-[#c3252e] text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
                    >
                      <CanadaFlag /> CA
                    </button>
                    <button
                      onClick={() => { setLanguage('en-GB'); setLangDropdownOpen(false); }}
                      className={`flex items-center gap-2.5 w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${language === 'en-GB' ? 'bg-[#c3252e] text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
                    >
                      <UKFlag /> UK
                    </button>
                    <button
                      onClick={() => { setLanguage('en-US'); setLangDropdownOpen(false); }}
                      className={`flex items-center gap-2.5 w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${language === 'en-US' ? 'bg-[#c3252e] text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
                    >
                      <USFlag /> US
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-gray-300 hover:text-[#c3252e] hover:bg-white/5 border border-white/15 hover:border-[#c3252e]/40 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <span className="block w-1.5 h-1.5 rounded-full bg-[#c3252e] animate-pulse" />
              <span className="text-gray-400 text-[11px]">{t("Serving Canada")}</span>
            </div>
          </div>

          {/* Copyright + policies row */}
          <div className="border-t border-white/5 pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-gray-400 text-[11px]">
              Copyright © 2000–{new Date().getFullYear()} MetricAir Systems. All Rights Reserved.
            </p>
            <div className="flex items-center gap-4">
              {["Privacy Policy", "Warranty Policy", "Return Policy"].map((policy, i, arr) => (
                <span key={policy} className="flex items-center gap-4">
                  <a href="#" className="text-gray-600 text-[11px] font-medium hover:text-[#c3252e] transition-colors duration-150">
                    {policy}
                  </a>
                  {i < arr.length - 1 && <span className="w-px h-3 bg-white/10" />}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS animation & Responsive Logo */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .footer-logo-img {
          height: 180px;
          width: auto;
          max-width: 220px;
          margin-top: -85px;
          margin-bottom: -51px;
          margin-left: -62px;
        }
        @media (min-width: 768px) {
          .footer-logo-img {
            height: 280px;
            max-width: 340px;
            margin-top: -130px;
            margin-bottom: -80px;
            margin-left: -96px;
          }
        }
        @media (min-width: 1024px) {
          .footer-logo-img {
            height: 425px;
            max-width: 510px;
            margin-top: -198px;
            margin-bottom: -122px;
            margin-left: -145px;
          }
        }
      `}</style>
    </footer>
  );
}

// ── INLINE SVG FLAG ICONS (FOR COMPATIBILITY WITH ALL OS INCLUDING WINDOWS) ──
const CanadaFlag = () => (
  <svg className="w-4 h-3 object-cover rounded-sm border border-white/10 shrink-0" viewBox="0 0 20 10">
    <rect width="5" height="10" fill="#c3252e" />
    <rect x="5" width="10" height="10" fill="#fff" />
    <rect x="15" width="5" height="10" fill="#c3252e" />
    <path d="M 10,2 L 11,4 L 13,3.5 L 12,5 L 14,6.5 L 11,6.5 L 10.5,9.5 L 9.5,9.5 L 9,6.5 L 6,6.5 L 8,5 L 7,3.5 L 9,4 Z" fill="#c3252e" />
  </svg>
);

const UKFlag = () => (
  <svg className="w-4 h-3 object-cover rounded-sm border border-white/10 shrink-0" viewBox="0 0 20 10">
    <rect width="20" height="10" fill="#00247d" />
    <path d="M0,0 L20,10 M20,0 L0,10" stroke="#fff" strokeWidth="2" />
    <path d="M0,0 L20,10 M20,0 L0,10" stroke="#cf142b" strokeWidth="1" />
    <path d="M10,0 L10,10 M0,5 L20,5" stroke="#fff" strokeWidth="4" />
    <path d="M10,0 L10,10 M0,5 L20,5" stroke="#cf142b" strokeWidth="2.5" />
  </svg>
);

const USFlag = () => (
  <svg className="w-4 h-3 object-cover rounded-sm border border-white/10 shrink-0" viewBox="0 0 20 10">
    <rect width="20" height="10" fill="#fff" />
    <rect y="0" width="20" height="0.77" fill="#b22234" />
    <rect y="1.54" width="20" height="0.77" fill="#b22234" />
    <rect y="3.08" width="20" height="0.77" fill="#b22234" />
    <rect y="4.62" width="20" height="0.77" fill="#b22234" />
    <rect y="6.15" width="20" height="0.77" fill="#b22234" />
    <rect y="7.69" width="20" height="0.77" fill="#b22234" />
    <rect y="9.23" width="20" height="0.77" fill="#b22234" />
    <rect width="8" height="5.38" fill="#3c3b6e" />
    <circle cx="2" cy="1.5" r="0.25" fill="#fff" />
    <circle cx="4" cy="1.5" r="0.25" fill="#fff" />
    <circle cx="6" cy="1.5" r="0.25" fill="#fff" />
    <circle cx="3" cy="2.7" r="0.25" fill="#fff" />
    <circle cx="5" cy="2.7" r="0.25" fill="#fff" />
    <circle cx="2" cy="3.9" r="0.25" fill="#fff" />
    <circle cx="4" cy="3.9" r="0.25" fill="#fff" />
    <circle cx="6" cy="3.9" r="0.25" fill="#fff" />
  </svg>
);
