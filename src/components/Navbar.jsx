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
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Close mobile menu on route change
    setMobileOpen(false);
    setMobileProductsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProductsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setProductsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setProductsOpen(false), 150);
  };

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `px-4 py-2 rounded text-sm font-medium transition-colors duration-200 ${
      isActive(path)
        ? "text-[#e94560] bg-white/5"
        : "text-gray-300 hover:text-[#e94560] hover:bg-white/5"
    }`;

  return (
    <nav className="bg-[#1a1a2e] w-full fixed top-0 left-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <Link to="/" className="shrink-0">
            <img
              src="/images/metric.png"
              alt="MetricAir Logo"
              style={{ height: "146px" }}
              className="w-auto object-contain"
            />
          </Link>

          {/* ── Desktop Links ── */}
          <div className="hidden lg:flex items-center gap-1">

            <Link to="/" className={navLinkClass("/")}>
              Home
            </Link>

            {/* Products mega dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`flex items-center gap-1 px-4 py-2 rounded text-sm font-medium transition-colors duration-200 ${
                  productsOpen
                    ? "text-[#e94560] bg-white/5"
                    : "text-gray-300 hover:text-[#e94560] hover:bg-white/5"
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
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[820px] bg-[#16213e] border border-white/10 rounded-xl shadow-2xl p-6 z-50"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="grid grid-cols-3 gap-x-8 gap-y-6">
                    {PRODUCTS_MENU.map((group) => (
                      <div key={group.group}>
                        <Link
                          to={group.href}
                          className="block text-[#e94560] text-xs font-bold uppercase tracking-widest mb-2 hover:text-white transition-colors duration-150"
                        >
                          {group.group}
                        </Link>
                        {group.items.length > 0 && (
                          <ul className="space-y-1">
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

            {/* About Us */}
            <Link to="/about" className={navLinkClass("/about")}>
              About Us
            </Link>
          </div>

          {/* ── Auth Buttons (desktop) ── */}
          <div className="hidden lg:flex items-center gap-2">
            <Link
              to="/login"
              className="text-gray-300 hover:text-[#e94560] border border-white/20 hover:border-[#e94560] px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
            >
              Log In
            </Link>
          </div>

          {/* ── Hamburger ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
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

          {/* Products Accordion */}
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

          {/* About Us */}
          <Link
            to="/about"
            onClick={() => setMobileOpen(false)}
            className={`block px-4 py-2.5 rounded text-sm font-medium transition-colors ${
              isActive("/about") ? "text-[#e94560] bg-white/5" : "text-gray-300 hover:text-[#e94560] hover:bg-white/5"
            }`}
          >
            About Us
          </Link>

          {/* Auth */}
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