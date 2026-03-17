// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const PRODUCTS_MENU = [
  {
    group: "Commercial Solutions",
    href: "/commercial-solutions",
    items: [
      { label: "Restaurants / Commercial Kitchens", href: "/commercial-solutions/restaurants" },
      { label: "Office and Retail Spaces", href: "/commercial-solutions/office-retail" },
    ],
  },
  {
    group: "Residential Solutions",
    href: "/residential-solutions",
    items: [
      { label: "Heating", href: "/residential-solutions/heating" },
      { label: "Cooling", href: "/residential-solutions/cooling" },
      { label: "Fresh Air", href: "/residential-solutions/fresh-air" },
    ],
  },
  {
    group: "Light Industrial Solutions",
    href: "/light-industrial",
    items: [],
  },
  {
    group: "Rentals",
    href: "/rentals",
    items: [
      { label: "Water Heaters", href: "/rentals/water-heaters" },
      { label: "Furnaces and A/C", href: "/rentals/furnaces-ac" },
    ],
  },
  {
    group: "Water Purification System",
    href: "/water-purification",
    items: [],
  },
  {
    group: "Other Services",
    href: "/other-services",
    items: [
      { label: "Drawings and Permits", href: "/other-services/drawings-permits" },
      { label: "Complete Construction Package for Restaurants", href: "/other-services/construction-package" },
      { label: "Custom Houses", href: "/other-services/custom-houses" },
      { label: "Custom Ductwork Manufacturing", href: "/other-services/custom-ductwork" },
    ],
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [hoveredGroup, setHoveredGroup] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setMobileProductsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
        setMobileProductsOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setProductsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setProductsOpen(false);
      setHoveredGroup(null);
    }, 150);
  };

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `px-4 py-2 rounded text-sm font-medium transition-all duration-300 ${
      isActive(path)
        ? "text-[#e94560] bg-white/5"
        : scrolled
        ? "text-gray-300 hover:text-[#e94560] hover:bg-white/5"
        : "text-white hover:text-[#e94560]"
    }`;

  const leftNavLinks = (
    <>
      <Link to="/" className={navLinkClass("/")}>
        Home
      </Link>
      <Link to="/about" className={navLinkClass("/about")}>
        About Us
      </Link>

      {/* Products dropdown */}
      <div
        ref={dropdownRef}
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          className={`flex items-center gap-1 px-4 py-2 rounded text-sm font-medium transition-all duration-300 ${
            productsOpen
              ? "text-[#e94560] bg-white/5"
              : scrolled
              ? "text-gray-300 hover:text-[#e94560] hover:bg-white/5"
              : "text-white hover:text-[#e94560]"
          }`}
        >
          Products
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {productsOpen && (
          <div
            className="fixed w-[860px] bg-[#16213e] border border-white/10 rounded-xl shadow-2xl p-6 z-50"
            style={{
              top: "80px",
              left: "50%",
              transform: "translateX(-50%)",
              maxWidth: "calc(100vw - 32px)",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="grid grid-cols-3 gap-x-8 gap-y-6">
              {PRODUCTS_MENU.map((group) => (
                <div
                  key={group.group}
                  className="relative"
                  onMouseEnter={() => setHoveredGroup(group.group)}
                  onMouseLeave={() => setHoveredGroup(null)}
                >
                  <Link
                    to={group.href}
                    className="flex items-center justify-between text-[#e94560] text-xs font-bold uppercase tracking-widest mb-2 hover:text-white transition-colors duration-150 group"
                  >
                    <span>{group.group}</span>
                    {group.items.length > 0 && (
                      <svg
                        className={`w-3 h-3 ml-1 transition-transform duration-200 ${
                          hoveredGroup === group.group ? "rotate-180" : ""
                        }`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>

                  {group.items.length > 0 && (
                    <ul
                      className={`space-y-1 overflow-hidden transition-all duration-200 ${
                        hoveredGroup === group.group
                          ? "max-h-60 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      {group.items.map((item) => (
                        <li key={item.label}>
                          <Link
                            to={item.href}
                            className="block text-gray-400 text-sm hover:text-[#e94560] hover:pl-1.5 transition-all duration-150"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Link to="/store" className={navLinkClass("/store")}>
        Store
      </Link>
    </>
  );

  const rightNavLinks = (
    <>
      <Link to="/feedback" className={navLinkClass("/feedback")}>
        Feedback
      </Link>
      <Link to="/careers" className={navLinkClass("/careers")}>
        Careers
      </Link>
      <Link to="/contact" className={navLinkClass("/contact")}>
        Contact Us
      </Link>

      <div className={`w-px h-5 mx-2 transition-all duration-300 ${scrolled ? "bg-white/20" : "bg-white/40"}`} />

      <Link
        to="/login"
        className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 border ${
          scrolled
            ? "text-gray-300 hover:text-[#e94560] border-white/20 hover:border-[#e94560]"
            : "text-white hover:text-[#e94560] border-white/40 hover:border-[#e94560]"
        }`}
      >
        Log In
      </Link>
    </>
  );

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 overflow-visible transition-all duration-500 ${
        scrolled
          ? "bg-[#1a1a2e] shadow-lg"
          : "bg-transparent shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 overflow-visible">

          {/* ── Desktop Left Links ── */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-start">
            {leftNavLinks}
          </div>

          {/* ── Centered Logo ── */}
          <Link
            to="/"
            className="shrink-0 flex items-center justify-center"
          >
            <img
              src="/images/metric.png"
              alt="MetricAir Logo"
              style={{
                height: "260px",
                width: "auto",
                maxWidth: "500px",
                transition: "opacity 0.5s ease",
                opacity: scrolled ? 1 : 0.92,
              }}
              className="object-contain"
            />
          </Link>

          {/* ── Desktop Right Links ── */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-end">
            {rightNavLinks}
          </div>

          {/* ── Hamburger (mobile only) ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-md transition-all duration-300 hover:bg-white/10 ${
              scrolled ? "text-gray-300 hover:text-white" : "text-white"
            }`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#16213e] border-t border-white/10 px-4 pt-3 pb-5 space-y-1">

          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className={`block px-4 py-2.5 rounded text-sm font-medium transition-colors ${
              isActive("/") ? "text-[#e94560] bg-white/5" : "text-gray-300 hover:text-[#e94560] hover:bg-white/5"
            }`}
          >
            Home
          </Link>

          <div>
            <button
              onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded text-sm font-medium transition-colors ${
                mobileProductsOpen
                  ? "text-[#e94560] bg-white/5"
                  : "text-gray-300 hover:text-[#e94560] hover:bg-white/5"
              }`}
            >
              Products
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${mobileProductsOpen ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {mobileProductsOpen && (
              <div className="mt-2 ml-3 border-l-2 border-[#e94560]/40 pl-4 space-y-5 py-2">
                {PRODUCTS_MENU.map((group) => (
                  <div key={group.group}>
                    <Link
                      to={group.href}
                      onClick={() => setMobileOpen(false)}
                      className="block text-[#e94560] text-xs font-bold uppercase tracking-widest mb-1.5 hover:text-white transition-colors"
                    >
                      {group.group}
                    </Link>
                    {group.items.length > 0 && (
                      <ul className="space-y-1.5">
                        {group.items.map((item) => (
                          <li key={item.label}>
                            <Link
                              to={item.href}
                              onClick={() => setMobileOpen(false)}
                              className="block text-gray-400 text-sm hover:text-[#e94560] transition-colors"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/about"
            onClick={() => setMobileOpen(false)}
            className={`block px-4 py-2.5 rounded text-sm font-medium transition-colors ${
              isActive("/about") ? "text-[#e94560] bg-white/5" : "text-gray-300 hover:text-[#e94560] hover:bg-white/5"
            }`}
          >
            About Us
          </Link>

          <Link
            to="/store"
            onClick={() => setMobileOpen(false)}
            className={`block px-4 py-2.5 rounded text-sm font-medium transition-colors ${
              isActive("/store") ? "text-[#e94560] bg-white/5" : "text-gray-300 hover:text-[#e94560] hover:bg-white/5"
            }`}
          >
            Store
          </Link>

          <div className="border-t border-white/10 my-2" />

          <Link
            to="/feedback"
            onClick={() => setMobileOpen(false)}
            className={`block px-4 py-2.5 rounded text-sm font-medium transition-colors ${
              isActive("/feedback") ? "text-[#e94560] bg-white/5" : "text-gray-300 hover:text-[#e94560] hover:bg-white/5"
            }`}
          >
            Feedback
          </Link>

          <Link
            to="/careers"
            onClick={() => setMobileOpen(false)}
            className={`block px-4 py-2.5 rounded text-sm font-medium transition-colors ${
              isActive("/careers") ? "text-[#e94560] bg-white/5" : "text-gray-300 hover:text-[#e94560] hover:bg-white/5"
            }`}
          >
            Careers
          </Link>

          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className={`block px-4 py-2.5 rounded text-sm font-medium transition-colors ${
              isActive("/contact") ? "text-[#e94560] bg-white/5" : "text-gray-300 hover:text-[#e94560] hover:bg-white/5"
            }`}
          >
            Contact Us
          </Link>

          <div className="pt-3">
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="block text-center text-gray-300 hover:text-[#e94560] border border-white/20 hover:border-[#e94560] px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
            >
              Log In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}