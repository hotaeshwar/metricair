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
    <path d="M16.003 2.667C8.636 2.667 2.667 8.636 2.667 16.003c0 2.354.636 4.653 1.845 6.664L2.667 29.333l6.865-1.797A13.28 13.28 0 0 0 16.003 29.34c7.367 0 13.33-5.969 13.33-13.337S23.37 2.667 16.003 2.667Zm0 24.394a11.03 11.03 0 0 1-5.627-1.543l-.403-.24-4.074 1.067 1.087-3.966-.264-.407a11.037 11.037 0 0 1-1.691-5.969c0-6.1 4.969-11.063 11.072-11.063 6.1 0 11.063 4.963 11.063 11.063S22.103 27.061 16.003 27.061Zm6.07-8.279c-.333-.167-1.97-.972-2.275-1.083-.306-.11-.529-.167-.751.167-.222.333-.861 1.083-1.056 1.305-.194.222-.389.25-.722.083-.333-.167-1.406-.518-2.678-1.652-.99-.883-1.658-1.972-1.853-2.305-.194-.333-.021-.513.147-.68.15-.148.333-.389.5-.583.167-.194.222-.333.333-.556.111-.222.056-.417-.028-.583-.083-.167-.75-1.806-1.028-2.472-.27-.65-.547-.562-.75-.572-.194-.009-.417-.011-.639-.011a1.225 1.225 0 0 0-.889.417c-.305.333-1.166 1.139-1.166 2.778s1.194 3.222 1.36 3.444c.167.222 2.349 3.583 5.694 5.028.796.344 1.417.549 1.9.703.799.254 1.527.218 2.102.132.641-.095 1.97-.806 2.247-1.584.278-.778.278-1.444.194-1.583-.083-.14-.305-.222-.638-.39Z"/>
  </svg>
);

const MENU_DATA = {
  residential: [
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
        { label: "Custom Houses", href: "/other-services/custom-houses" },
        { label: "Custom Ductwork Manufacturing", href: "/other-services/custom-ductwork" },
      ],
    },
  ],
  commercial: [
    {
      group: "Commercial Solutions",
      href: "/commercial-solutions",
      items: [
        { label: "Restaurants / Commercial Kitchens", href: "/commercial-solutions/restaurants" },
        { label: "Office and Retail Spaces", href: "/commercial-solutions/office-retail" },
      ],
    },
    {
      group: "Light Industrial Solutions",
      href: "/light-industrial",
      items: [],
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
        { label: "Custom Ductwork Manufacturing", href: "/other-services/custom-ductwork" },
      ],
    },
  ],
};

const WHATSAPP_NUMBER  = "16479241421";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi MetricAir! I found you on your website and I'd like to inquire about your HVAC services. Could you please help me?"
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export default function Navbar() {
  const [mobileOpen,         setMobileOpen]         = useState(false);
  const [productsOpen,       setProductsOpen]       = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [hoveredGroup,       setHoveredGroup]       = useState(null);
  const [scrolled,           setScrolled]           = useState(false);
  const [activeTab,          setActiveTab]          = useState("residential");

  const dropdownRef = useRef(null);
  const timeoutRef  = useRef(null);
  const location    = useLocation();

  const PRODUCTS_MENU = MENU_DATA[activeTab];

  useEffect(() => {
    setMobileOpen(false);
    setMobileProductsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1280) {
        setMobileOpen(false);
        setMobileProductsOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    function handleScroll() { setScrolled(window.scrollY > 20); }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = () => { clearTimeout(timeoutRef.current); setProductsOpen(true); };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => { setProductsOpen(false); setHoveredGroup(null); }, 150);
  };

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `px-2.5 xl:px-4 py-2 rounded text-sm font-medium whitespace-nowrap transition-all duration-300 ${
      isActive(path)
        ? "text-[#e94560] bg-white/5"
        : scrolled
        ? "text-gray-300 hover:text-[#e94560] hover:bg-white/5"
        : "text-white hover:text-[#e94560]"
    }`;

  const SwitcherTab = () => (
    <div className="flex items-center justify-center mb-5">
      <div className="relative flex bg-white/5 border border-white/10 rounded-full p-1 gap-1">
        <span
          className="absolute top-1 bottom-1 rounded-full bg-[#e94560] transition-all duration-300 ease-in-out"
          style={{ width: "calc(50% - 4px)", left: activeTab === "residential" ? "4px" : "calc(50%)" }}
        />
        <button
          onClick={(e) => { e.stopPropagation(); setActiveTab("residential"); setHoveredGroup(null); }}
          className={`relative z-10 px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${
            activeTab === "residential" ? "text-white" : "text-gray-400 hover:text-gray-200"
          }`}
        >Residential</button>
        <button
          onClick={(e) => { e.stopPropagation(); setActiveTab("commercial"); setHoveredGroup(null); }}
          className={`relative z-10 px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${
            activeTab === "commercial" ? "text-white" : "text-gray-400 hover:text-gray-200"
          }`}
        >Commercial</button>
      </div>
    </div>
  );

  const leftNavLinks = (
    <>
      <Link to="/"      className={navLinkClass("/")}>Home</Link>
      <Link to="/about" className={navLinkClass("/about")}>About Us</Link>

      <div
        ref={dropdownRef}
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          className={`flex items-center gap-1 px-2.5 xl:px-4 py-2 rounded text-sm font-medium whitespace-nowrap transition-all duration-300 ${
            productsOpen
              ? "text-[#e94560] bg-white/5"
              : scrolled
              ? "text-gray-300 hover:text-[#e94560] hover:bg-white/5"
              : "text-white hover:text-[#e94560]"
          }`}
        >
          Products
          <ChevronDown size={16} className={`transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`} />
        </button>

        {productsOpen && (
          <div
            className="fixed bg-[#16213e] border border-white/10 rounded-xl shadow-2xl p-6 z-50"
            style={{ top: "80px", left: "50%", transform: "translateX(-50%)", width: "860px", maxWidth: "calc(100vw - 32px)" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <SwitcherTab />
            <div className="border-t border-white/10 mb-5" />
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
                    className="flex items-center justify-between text-[#e94560] text-xs font-bold uppercase tracking-widest mb-2 hover:text-white transition-colors duration-150"
                  >
                    <span>{group.group}</span>
                    {group.items.length > 0 && (
                      <ChevronDown
                        size={12}
                        className={`ml-1 transition-transform duration-200 ${hoveredGroup === group.group ? "rotate-180" : ""}`}
                      />
                    )}
                  </Link>
                  {group.items.length > 0 && (
                    <ul className={`space-y-1 overflow-hidden transition-all duration-200 ${
                      hoveredGroup === group.group ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                    }`}>
                      {group.items.map((item) => (
                        <li key={item.label}>
                          <Link
                            to={item.href}
                            className="block text-gray-400 text-sm hover:text-[#e94560] hover:pl-1.5 transition-all duration-150"
                          >{item.label}</Link>
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

      <Link to="/store" className={navLinkClass("/store")}>Store</Link>
    </>
  );

  const rightNavLinks = (
    <>
      <Link to="/feedback" className={navLinkClass("/feedback")}>Feedback</Link>
      <Link to="/careers"  className={navLinkClass("/careers")}>Careers</Link>
      <Link to="/contact"  className={navLinkClass("/contact")}>Contact Us</Link>

      <div className={`w-px h-5 mx-1 xl:mx-2 transition-all duration-300 ${scrolled ? "bg-white/20" : "bg-white/40"}`} />

      <Link
        to="/login"
        className={`px-3 xl:px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 border ${
          scrolled
            ? "text-gray-300 hover:text-[#e94560] border-white/20 hover:border-[#e94560]"
            : "text-white hover:text-[#e94560] border-white/40 hover:border-[#e94560]"
        }`}
      >
        Log In
      </Link>

      {/* WhatsApp icon — desktop */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp"
        className="ml-1 p-2 rounded-full transition-all duration-300 group text-[#25D366] hover:text-[#25D366]"
      >
        <span className="transition-transform duration-200 group-hover:scale-110 inline-flex">
          <WhatsAppIcon size={20} />
        </span>
      </a>
    </>
  );

  return (
    <nav className={`w-full fixed top-0 left-0 z-50 overflow-visible transition-all duration-500 ${
      scrolled ? "bg-[#1a1a2e] shadow-lg" : "bg-transparent shadow-none"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center h-20 overflow-visible">

          {/* Mobile / Tablet: Hamburger — below xl */}
          <div className="flex xl:hidden items-center flex-1 justify-start">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`p-2 rounded-md transition-all duration-300 hover:bg-white/10 ${
                scrolled ? "text-gray-300 hover:text-white" : "text-white"
              }`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop left links — xl and above */}
          <div className="hidden xl:flex items-center gap-0.5 flex-1 justify-start">
            {leftNavLinks}
          </div>

          {/* Logo — always centered */}
          <Link
            to="/"
            className="shrink-0 flex items-center justify-center absolute left-1/2 -translate-x-1/2 xl:static xl:translate-x-0 xl:mx-6"
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

          {/* Mobile / Tablet: WhatsApp icon — below xl */}
          <div className="flex xl:hidden items-center flex-1 justify-end">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="Chat on WhatsApp"
              className="p-2 rounded-full transition-all duration-300 group text-[#25D366] hover:text-[#25D366]"
            >
              <span className="transition-transform duration-200 group-hover:scale-110 inline-flex">
                <WhatsAppIcon size={22} />
              </span>
            </a>
          </div>

          {/* Desktop right links — xl and above */}
          <div className="hidden xl:flex items-center gap-0.5 flex-1 justify-end">
            {rightNavLinks}
          </div>

        </div>
      </div>

      {/* Mobile / Tablet Drawer — below xl */}
      {mobileOpen && (
        <div className="xl:hidden bg-[#16213e] border-t border-white/10 px-4 pt-3 pb-5 space-y-1">

          <Link to="/" onClick={() => setMobileOpen(false)}
            className={`block px-4 py-2.5 rounded text-sm font-medium transition-colors ${
              isActive("/") ? "text-[#e94560] bg-white/5" : "text-gray-300 hover:text-[#e94560] hover:bg-white/5"
            }`}>Home</Link>

          <div>
            <button
              onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded text-sm font-medium transition-colors ${
                mobileProductsOpen ? "text-[#e94560] bg-white/5" : "text-gray-300 hover:text-[#e94560] hover:bg-white/5"
              }`}
            >
              Products
              <ChevronDown size={16} className={`transition-transform duration-200 ${mobileProductsOpen ? "rotate-180" : ""}`} />
            </button>

            {mobileProductsOpen && (
              <div className="mt-3 mx-1">
                <div className="flex items-center justify-center mb-4">
                  <div className="relative flex bg-white/5 border border-white/10 rounded-full p-1 gap-1 w-full max-w-xs">
                    <span
                      className="absolute top-1 bottom-1 rounded-full bg-[#e94560] transition-all duration-300 ease-in-out"
                      style={{ width: "calc(50% - 4px)", left: activeTab === "residential" ? "4px" : "calc(50%)" }}
                    />
                    <button onClick={() => setActiveTab("residential")}
                      className={`relative z-10 flex-1 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${activeTab === "residential" ? "text-white" : "text-gray-400"}`}
                    >Residential</button>
                    <button onClick={() => setActiveTab("commercial")}
                      className={`relative z-10 flex-1 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${activeTab === "commercial" ? "text-white" : "text-gray-400"}`}
                    >Commercial</button>
                  </div>
                </div>

                <div className="border-l-2 border-[#e94560]/40 pl-4 space-y-5 py-2">
                  {PRODUCTS_MENU.map((group) => (
                    <div key={group.group}>
                      <Link to={group.href} onClick={() => setMobileOpen(false)}
                        className="block text-[#e94560] text-xs font-bold uppercase tracking-widest mb-1.5 hover:text-white transition-colors"
                      >{group.group}</Link>
                      {group.items.length > 0 && (
                        <ul className="space-y-1.5">
                          {group.items.map((item) => (
                            <li key={item.label}>
                              <Link to={item.href} onClick={() => setMobileOpen(false)}
                                className="block text-gray-400 text-sm hover:text-[#e94560] transition-colors"
                              >{item.label}</Link>
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

          <Link to="/about" onClick={() => setMobileOpen(false)}
            className={`block px-4 py-2.5 rounded text-sm font-medium transition-colors ${
              isActive("/about") ? "text-[#e94560] bg-white/5" : "text-gray-300 hover:text-[#e94560] hover:bg-white/5"
            }`}>About Us</Link>

          <Link to="/store" onClick={() => setMobileOpen(false)}
            className={`block px-4 py-2.5 rounded text-sm font-medium transition-colors ${
              isActive("/store") ? "text-[#e94560] bg-white/5" : "text-gray-300 hover:text-[#e94560] hover:bg-white/5"
            }`}>Store</Link>

          <div className="border-t border-white/10 my-2" />

          <Link to="/feedback" onClick={() => setMobileOpen(false)}
            className={`block px-4 py-2.5 rounded text-sm font-medium transition-colors ${
              isActive("/feedback") ? "text-[#e94560] bg-white/5" : "text-gray-300 hover:text-[#e94560] hover:bg-white/5"
            }`}>Feedback</Link>

          <Link to="/careers" onClick={() => setMobileOpen(false)}
            className={`block px-4 py-2.5 rounded text-sm font-medium transition-colors ${
              isActive("/careers") ? "text-[#e94560] bg-white/5" : "text-gray-300 hover:text-[#e94560] hover:bg-white/5"
            }`}>Careers</Link>

          <Link to="/contact" onClick={() => setMobileOpen(false)}
            className={`block px-4 py-2.5 rounded text-sm font-medium transition-colors ${
              isActive("/contact") ? "text-[#e94560] bg-white/5" : "text-gray-300 hover:text-[#e94560] hover:bg-white/5"
            }`}>Contact Us</Link>

          <div className="pt-3">
            <Link to="/login" onClick={() => setMobileOpen(false)}
              className="block text-center text-gray-300 hover:text-[#e94560] border border-white/20 hover:border-[#e94560] px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
            >Log In</Link>
          </div>
        </div>
      )}
    </nav>
  );
}