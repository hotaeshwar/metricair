export default function Footer() {
  const navLinks = [
    { label: "Career Opportunities", href: "#" },
    { label: "Rep Our Products", href: "#" },
    { label: "Service Finder", href: "#" },
    { label: "Factory Certified Training", href: "#" },
    { label: "Sales Offices", href: "#" },
    { label: "National Accounts", href: "#" },
    { label: "Online Store", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "About Us", href: "#" },
  ];

  const columns = [
    {
      groups: [
        {
          heading: "COMMERCIAL SOLUTIONS",
          links: ["Restaurants / Commercial Kitchens", "Office and Retail Spaces"],
        },
        {
          heading: "RENTALS",
          links: ["Water Heaters", "Furnaces and A/C"],
        },
      ],
    },
    {
      groups: [
        {
          heading: "RESIDENTIAL SOLUTIONS",
          links: ["Heating", "Cooling", "Fresh Air"],
        },
        {
          heading: "WATER PURIFICATION SYSTEM",
          links: [],
        },
      ],
    },
    {
      groups: [
        {
          heading: "LIGHT INDUSTRIAL SOLUTIONS",
          links: [],
        },
        {
          heading: "OTHER SERVICES",
          links: [
            "Drawings and Permits",
            "Complete Construction Package for Restaurants",
            "Custom Houses",
            "Custom Ductwork Manufacturing",
          ],
        },
      ],
    },
  ];

  return (
    <>
      <style>{`
        .footer-link {
          color: #d1d5db;
          font-size: 0.875rem;
          text-decoration: none;
          transition: color 0.15s, font-weight 0s;
          font-weight: 400;
          display: inline-block;
        }
        .footer-link:hover {
          color: #E03A1E;
          font-weight: 700;
        }
        .footer-link-sm {
          color: #d1d5db;
          font-size: 0.75rem;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.15s;
        }
        .footer-link-sm:hover {
          color: #E03A1E;
          font-weight: 800;
        }
      `}</style>

      <footer className="w-full bg-[#2a2a2a] text-white px-6 sm:px-10 lg:px-16 pt-10 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-8">

            {/* ── Left column: logo + nav links + subscribe ── */}
            <div className="flex flex-col gap-5 lg:w-[230px] xl:w-[250px] shrink-0">

              {/* Logo — large, full-width within column */}
              <a href="/" className="block w-full">
                <img
                  src="/images/metric.png"
                  alt="MetricAir"
                  className="w-full max-w-[200px] h-auto object-contain"
                  style={{ minHeight: "64px" }}
                />
              </a>

              {/* Nav links */}
              <nav className="flex flex-col gap-2.5">
                {navLinks.map((link) => (
                  <a key={link.label} href={link.href} className="footer-link">
                    {link.label}
                  </a>
                ))}
              </nav>

              {/* Subscribe button */}
              <div className="mt-2">
                <a
                  href="#"
                  className="inline-block px-5 py-2.5 rounded-full text-white text-xs font-bold tracking-widest uppercase transition-all hover:brightness-110"
                  style={{ background: "#E03A1E" }}
                >
                  Subscribe to Email Updates
                </a>
              </div>
            </div>

            {/* ── Middle: 3 product columns ── */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6 xl:gap-10">
              {columns.map((col, ci) => (
                <div key={ci} className="flex flex-col gap-8">
                  {col.groups.map((group) => (
                    <div key={group.heading}>
                      <h4 className="text-[#E03A1E] text-xs font-bold tracking-widest uppercase mb-3">
                        {group.heading}
                      </h4>
                      {group.links.length > 0 && (
                        <ul className="flex flex-col gap-2">
                          {group.links.map((link) => (
                            <li key={link}>
                              <a href="#" className="footer-link leading-snug">
                                {link}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* ── Far right: language, sign in, social, legal ── */}
            <div className="flex flex-col gap-6 lg:w-[140px] xl:w-[160px] shrink-0 lg:items-end">
              {/* Sign In / Feedback */}
              <div className="flex flex-col gap-2 lg:items-end">
                <a href="#" className="footer-link">Sign In</a>
                <a href="#" className="footer-link">Feedback</a>
              </div>

              {/* Social icons */}
              <div className="flex items-center gap-3">
                <a href="#" className="text-gray-300 hover:text-[#E03A1E] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-[#E03A1E] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-[#E03A1E] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>

              {/* Copyright */}
              <p className="text-gray-500 text-[11px] leading-relaxed lg:text-right">
                Copyright © 2000–{new Date().getFullYear()}<br />
                MetricAir Systems.<br />
                All Rights Reserved.
              </p>

              {/* Legal links */}
              <div className="flex flex-col gap-1 lg:items-end">
                <a href="#" className="footer-link-sm">Privacy Policy</a>
                <a href="#" className="footer-link-sm">Warranty Policy</a>
                <a href="#" className="footer-link-sm">Return Policy</a>
              </div>
            </div>

          </div>
        </div>
      </footer>
    </>
  );
}