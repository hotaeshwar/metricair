// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

/* ── Real WhatsApp SVG icon ── */
const WhatsAppIcon = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16.003 2.667C8.636 2.667 2.667 8.636 2.667 16.003c0 2.354.636 4.653 1.845 6.664L2.667 29.333l6.865-1.797A13.28 13.28 0 0 0 16.003 29.34c7.367 0 13.33-5.969 13.33-13.337S23.37 2.667 16.003 2.667Zm0 24.394a11.03 11.03 0 0 1-5.627-1.543l-.403-.24-4.074 1.067 1.087-3.966-.264-.407a11.037 11.037 0 0 1-1.691-5.969c0-6.1 4.969-11.063 11.072-11.063 6.1 0 11.063 4.963 11.063 11.063S22.103 27.061 16.003 27.061Zm6.07-8.279c-.333-.167-1.97-.972-2.275-1.083-.306-.11-.529-.167-.751.167-.222.333-.861 1.083-1.056 1.305-.194.222-.389.25-.722.083-.333-.167-1.406-.518-2.678-1.652-.99-.883-1.658-1.972-1.853-2.305-.194-.333-.021-.513.147-.68.15-.148.333-.389.5-.583.167-.194.222-.333.333-.556.111-.222.056-.417-.028-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01a1.225 1.225 0 0 0-.889.417c-.305.333-1.166 1.139-1.166 2.778s1.194 3.222 1.36 3.444c.167.222 2.349 3.583 5.694 5.028.796.344 1.417.549 1.9.703.799.254 1.527.218 2.102.132.641-.095 1.97-.806 2.247-1.584.278-.778.278-1.444.194-1.583-.083-.14-.305-.222-.638-.39Z" />
  </svg>
);

const PRODUCT_MENU = {
  residential: [
    { label: "Heating", href: "/residential-solutions/heating" },
    { label: "Cooling", href: "/residential-solutions/cooling" },
    { label: "Fresh Air", href: "/residential-solutions/fresh-air" },
    { label: "Water Heaters Rental", href: "/rentals/water-heaters" },
    { label: "Furnaces & A/C Rental", href: "/rentals/furnaces-ac" },
    { label: "Water Purification", href: "/water-purification" },
    { label: "Drawings and Permits", href: "/other-services/drawings-permits" },
    { label: "Custom Hoses", href: "/other-services/custom-hoses" },
    { label: "Custom Ductwork", href: "/other-services/custom-ductwork" },
  ],
  commercial: [
    { label: "Restaurants / Kitchens", href: "/commercial-solutions/restaurants" },
    { label: "Office & Retail Spaces", href: "/commercial-solutions/office-retail" },
    { label: "Complete Construction Package", href: "/other-services/construction-package" },
  ],
  lightIndustrial: [
    { label: "Industrial Exhaust Systems", href: "/light-industrial/exhaust-systems" },
    { label: "HVLS Destratification Fans", href: "/light-industrial/hvls-fans" },
    { label: "Radiant Tube Heating", href: "/light-industrial/radiant-heating" },
    { label: "Combustible Dust Compliance", href: "/light-industrial/dust-compliance" },
    { label: "Engineered Permit Drawings", href: "/light-industrial/permit-drawings" },
    { label: "Air Quality Assessments", href: "/light-industrial/air-quality" },
  ],
};

const WHATSAPP_NUMBER = "16479241421";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi MetricAir! I found you on your website and I'd like to inquire about your HVAC services. Could you please help me?"
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileResOpen, setMobileResOpen] = useState(false);

  const timeoutRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setMobileResOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1280) setMobileOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    function handleScroll() { setScrolled(window.scrollY > 20); }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (menuName) => {
    clearTimeout(timeoutRef.current);
    setActiveDropdown(menuName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const isActive = (path) => location.pathname === path;

  const isProductActive = () =>
    location.pathname.startsWith("/residential-solutions") ||
    location.pathname.startsWith("/commercial-solutions") ||
    location.pathname.startsWith("/light-industrial") ||
    location.pathname.startsWith("/rentals") ||
    location.pathname === "/water-purification" ||
    location.pathname.startsWith("/other-services");

  const navLinkClass = (path) =>
    `px-2 xl:px-3 py-2 rounded text-sm font-medium whitespace-nowrap transition-all duration-300 ${
      isActive(path)
        ? "text-[#e94560] bg-white/5"
        : scrolled
        ? "text-gray-300 hover:text-[#e94560] hover:bg-white/5"
        : "text-white hover:text-[#e94560]"
    }`;

  const productNavLinkClass = () =>
    `px-2 xl:px-3 py-2 rounded text-sm font-medium whitespace-nowrap transition-all duration-300 ${
      isProductActive()
        ? "text-[#e94560] bg-white/5"
        : scrolled
        ? "text-gray-300 hover:text-[#e94560] hover:bg-white/5"
        : "text-white hover:text-[#e94560]"
    }`;

  const renderDropdown = () => {
    if (activeDropdown !== "product") return null;
    return (
      <div
        className="fixed bg-[#16213e] border border-white/10 rounded-2xl shadow-2xl p-8 z-50"
        style={{
          top: "80px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "980px",
          maxWidth: "calc(100vw - 32px)",
        }}
        onMouseEnter={() => handleMouseEnter("product")}
        onMouseLeave={handleMouseLeave}
      >
        <div className="grid grid-cols-3 gap-8">
          {/* Residential */}
          <div>
            <Link
              to="/residential-solutions"
              className="flex items-center text-[#e94560] text-sm font-black uppercase tracking-wider mb-4 hover:text-white transition-colors duration-150 pb-2 border-b border-[#e94560]/20"
            >
              Residential Solutions
            </Link>
            <div className="space-y-4">
              <div>
                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider block mb-1.5">HVAC Systems</span>
                <ul className="space-y-1">
                  <li><Link to="/residential-solutions/heating" className="block text-gray-300 text-sm hover:text-[#e94560] hover:pl-1 transition-all duration-150">Heating</Link></li>
                  <li><Link to="/residential-solutions/cooling" className="block text-gray-300 text-sm hover:text-[#e94560] hover:pl-1 transition-all duration-150">Cooling</Link></li>
                  <li><Link to="/residential-solutions/fresh-air" className="block text-gray-300 text-sm hover:text-[#e94560] hover:pl-1 transition-all duration-150">Fresh Air</Link></li>
                </ul>
              </div>
              <div>
                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider block mb-1.5">Equipment Rentals</span>
                <ul className="space-y-1">
                  <li><Link to="/rentals/water-heaters" className="block text-gray-300 text-sm hover:text-[#e94560] hover:pl-1 transition-all duration-150">Water Heaters Rental</Link></li>
                  <li><Link to="/rentals/furnaces-ac" className="block text-gray-300 text-sm hover:text-[#e94560] hover:pl-1 transition-all duration-150">Furnaces and A/C Rental</Link></li>
                </ul>
              </div>
              <div>
                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider block mb-1.5">Other Services</span>
                <ul className="space-y-1">
                  <li><Link to="/water-purification" className="block text-gray-300 text-sm hover:text-[#e94560] hover:pl-1 transition-all duration-150">Water Purification</Link></li>
                  <li><Link to="/other-services/drawings-permits" className="block text-gray-300 text-sm hover:text-[#e94560] hover:pl-1 transition-all duration-150">Drawings and Permits</Link></li>
                  <li><Link to="/other-services/custom-hoses" className="block text-gray-300 text-sm hover:text-[#e94560] hover:pl-1 transition-all duration-150">Custom Hoses</Link></li>
                  <li><Link to="/other-services/custom-ductwork" className="block text-gray-300 text-sm hover:text-[#e94560] hover:pl-1 transition-all duration-150">Custom Ductwork</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Commercial */}
          <div>
            <Link
              to="/commercial-solutions"
              className="flex items-center text-[#3b82f6] text-sm font-black uppercase tracking-wider mb-4 hover:text-white transition-colors duration-150 pb-2 border-b border-[#3b82f6]/20"
            >
              Commercial Solutions
            </Link>
            <div className="space-y-4">
              <div>
                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider block mb-1.5">Kitchens & Retail</span>
                <ul className="space-y-1">
                  <li><Link to="/commercial-solutions/restaurants" className="block text-gray-300 text-sm hover:text-[#3b82f6] hover:pl-1 transition-all duration-150">Restaurants / Commercial Kitchens</Link></li>
                  <li><Link to="/commercial-solutions/office-retail" className="block text-gray-300 text-sm hover:text-[#3b82f6] hover:pl-1 transition-all duration-150">Office and Retail Spaces</Link></li>
                </ul>
              </div>
              <div>
                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider block mb-1.5">Construction Packages</span>
                <ul className="space-y-1">
                  <li><Link to="/other-services/construction-package" className="block text-gray-300 text-sm hover:text-[#3b82f6] hover:pl-1 transition-all duration-150">Complete Construction Package</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Light Industrial */}
          <div>
            <Link
              to="/light-industrial"
              className="flex items-center text-white text-sm font-black uppercase tracking-wider mb-4 hover:text-[#e94560] transition-colors duration-150 pb-2 border-b border-white/10"
            >
              Light Industrial
            </Link>
            <div className="space-y-4">
              <div>
                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider block mb-1.5">Engineered Systems</span>
                <ul className="space-y-1">
                  <li><Link to="/light-industrial/exhaust-systems" className="block text-gray-300 text-sm hover:text-[#e94560] hover:pl-1 transition-all duration-150">Industrial Exhaust Systems</Link></li>
                  <li><Link to="/light-industrial/hvls-fans" className="block text-gray-300 text-sm hover:text-[#e94560] hover:pl-1 transition-all duration-150">HVLS Destratification Fans</Link></li>
                  <li><Link to="/light-industrial/radiant-heating" className="block text-gray-300 text-sm hover:text-[#e94560] hover:pl-1 transition-all duration-150">Radiant Tube Heating</Link></li>
                  <li><Link to="/light-industrial/dust-compliance" className="block text-gray-300 text-sm hover:text-[#e94560] hover:pl-1 transition-all duration-150">Combustible Dust Compliance</Link></li>
                  <li><Link to="/light-industrial/permit-drawings" className="block text-gray-300 text-sm hover:text-[#e94560] hover:pl-1 transition-all duration-150">Engineered Permit Drawings</Link></li>
                  <li><Link to="/light-industrial/air-quality" className="block text-gray-300 text-sm hover:text-[#e94560] hover:pl-1 transition-all duration-150">Air Quality Assessments</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 overflow-visible transition-all duration-500 ${
        scrolled ? "bg-[#1a1a2e] shadow-lg" : "bg-transparent shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ── Main row ── */}
        <div className="flex items-center h-20 overflow-visible">

          {/* LEFT: hamburger (mobile) | nav links (desktop) */}
          <div className="flex items-center flex-1">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`xl:hidden p-2 rounded-md transition-all duration-300 hover:bg-white/10 ${
                scrolled ? "text-gray-300 hover:text-white" : "text-white"
              }`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop left links */}
            <div className="hidden xl:flex items-center justify-end w-full gap-6 pr-36">
              <Link to="/" className={navLinkClass("/")}>Home</Link>
              <Link to="/about" className={navLinkClass("/about")}>About Us</Link>
            </div>
          </div>

          {/* CENTER: Logo */}
          <Link
            to="/"
            className="shrink-0 flex items-center justify-center absolute left-1/2 -translate-x-1/2"
          >
            <img
              src="/images/metric.png"
              alt="MetricAir Logo"
              style={{
                height: "220px",
                width: "auto",
                maxWidth: "260px",
                transition: "opacity 0.5s ease",
                opacity: scrolled ? 1 : 0.92,
              }}
              className="object-contain"
            />
          </Link>

          {/* RIGHT: WhatsApp + nav links */}
          <div className="flex items-center justify-end flex-1 gap-0.5">
            {/* Mobile: WhatsApp only */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="Chat on WhatsApp"
              className="xl:hidden p-2 rounded-full transition-all duration-300 group text-[#25D366]"
            >
              <span className="transition-transform duration-200 group-hover:scale-110 inline-flex">
                <WhatsAppIcon size={22} />
              </span>
            </a>

            {/* Desktop right links + WhatsApp */}
            <div className="hidden xl:flex items-center justify-start w-full gap-6 pl-36">
              {/* Product dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("product")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`flex items-center gap-0.5 ${productNavLinkClass()}`}
                >
                  Product
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      activeDropdown === "product" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {renderDropdown()}
              </div>

              <Link to="/store" className={navLinkClass("/store")}>Store</Link>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                title="Chat on WhatsApp"
                className="ml-1 p-2 rounded-full transition-all duration-300 group text-[#25D366]"
              >
                <span className="transition-transform duration-200 group-hover:scale-110 inline-flex">
                  <WhatsAppIcon size={20} />
                </span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <div className="xl:hidden bg-[#16213e] border-t border-white/10 px-4 pt-3 pb-5 space-y-1">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className={`block px-4 py-2.5 rounded text-sm font-medium transition-colors ${
              isActive("/") ? "text-[#e94560] bg-white/5" : "text-gray-300 hover:text-[#e94560] hover:bg-white/5"
            }`}
          >
            Home
          </Link>

          {/* Product collapsible */}
          <div>
            <button
              onClick={() => setMobileResOpen(!mobileResOpen)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded text-sm font-medium transition-colors ${
                mobileResOpen ? "text-[#e94560] bg-white/5" : "text-gray-300 hover:text-[#e94560] hover:bg-white/5"
              }`}
            >
              Product
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${mobileResOpen ? "rotate-180" : ""}`}
              />
            </button>

            {mobileResOpen && (
              <div className="mt-2 pl-4 border-l border-white/10 space-y-4 py-1">
                {/* Residential */}
                <div>
                  <Link
                    to="/residential-solutions"
                    onClick={() => setMobileOpen(false)}
                    className="block text-[#e94560] text-xs font-bold uppercase tracking-widest mb-1.5 hover:text-white transition-colors"
                  >
                    Residential Solutions
                  </Link>
                  <ul className="space-y-1.5 pl-2">
                    {PRODUCT_MENU.residential.map((item) => (
                      <li key={item.label}>
                        <Link
                          to={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block text-gray-400 text-sm hover:text-white transition-colors"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Commercial */}
                <div>
                  <Link
                    to="/commercial-solutions"
                    onClick={() => setMobileOpen(false)}
                    className="block text-[#3b82f6] text-xs font-bold uppercase tracking-widest mb-1.5 hover:text-white transition-colors"
                  >
                    Commercial Solutions
                  </Link>
                  <ul className="space-y-1.5 pl-2">
                    {PRODUCT_MENU.commercial.map((item) => (
                      <li key={item.label}>
                        <Link
                          to={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block text-gray-400 text-sm hover:text-white transition-colors"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Light Industrial */}
                <div>
                  <Link
                    to="/light-industrial"
                    onClick={() => setMobileOpen(false)}
                    className="block text-white text-xs font-bold uppercase tracking-widest mb-1.5 hover:text-[#e94560] transition-colors"
                  >
                    Light Industrial
                  </Link>
                  <ul className="space-y-1.5 pl-2">
                    {PRODUCT_MENU.lightIndustrial.map((item) => (
                      <li key={item.label}>
                        <Link
                          to={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block text-gray-400 text-sm hover:text-white transition-colors"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
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
        </div>
      )}
    </nav>
  );
}