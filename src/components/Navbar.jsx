// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, Home, Building2, Factory, Wrench, Flame, Zap, Droplet, ChevronRight, DollarSign } from "lucide-react";

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
  residential: {
    hvac: [
      { label: "Heating Systems", href: "/services/residential-heating" },
      { label: "Cooling Systems (AC)", href: "/services/residential-cooling" },
      { label: "Fresh Air / Ventilation", href: "/services/residential-fresh-air" },
      { label: "Radiant Tube Heating", href: "/services/residential-radiant" },
    ],
    electrical: [
      { label: "Lighting Installation", href: "/services/residential-lighting" },
      { label: "Panel Upgrades", href: "/services/residential-panel" },
      { label: "EV Charger Installation", href: "/services/residential-ev-charger" },
      { label: "Home Wiring / Setup", href: "/services/residential-wiring" },
    ],
    plumbing: [
      { label: "Water Supply Lines", href: "/services/residential-water-supply" },
      { label: "Drainage Systems", href: "/services/residential-drainage" },
      { label: "Fixture Installation", href: "/services/residential-fixtures" },
      { label: "Water Heaters", href: "/rentals/water-heaters" },
      { label: "Water Purification", href: "/water-purification" },
    ]
  },
  commercial: {
    hvac: [
      { label: "Rooftop Units (RTUs)", href: "/services/commercial-rtu" },
      { label: "Ductwork Systems", href: "/services/commercial-ducts" },
      { label: "Make-up Air Units", href: "/services/commercial-makeup-air" },
      { label: "Exhaust Systems", href: "/services/commercial-exhaust" },
      { label: "Heat Pumps", href: "/services/commercial-heat-pumps" },
      { label: "Commercial Kitchen Vent", href: "/services/commercial-kitchen-vent" },
      { label: "Kitchen HVAC Wiring", href: "/services/commercial-wiring" },
      { label: "Office Spaces", href: "/services/commercial-office" },
      { label: "Retail Spaces", href: "/services/commercial-retail" },
      { label: "Radiant Tube Heating", href: "/services/commercial-radiant" },
    ],
    electrical: [
      { label: "New Construction Electrical", href: "/services/commercial-new-construction" },
      { label: "Panel Relocation", href: "/services/commercial-panel-relocation" },
      { label: "Power Upgrades", href: "/services/commercial-power-upgrades" },
      { label: "LED Lighting Upgrades", href: "/services/commercial-led-lighting" },
      { label: "Equipment Power Supply", href: "/services/commercial-equipment-power" },
      { label: "General Power Services", href: "/services/commercial-general-power" },
    ],
    plumbing: [
      { label: "Full Building Plumbing Package", href: "/services/commercial-plumbing-package" },
      { label: "Service & Maintenance", href: "/services/commercial-plumbing-service" },
      { label: "Retrofit Plumbing Systems", href: "/services/commercial-plumbing-retrofit" },
      { label: "Water Heater Relocation", href: "/services/commercial-plumbing-heater" },
      { label: "Boilers & Hydronic Heating", href: "/services/commercial-plumbing-boilers" },
      { label: "Commercial Piping Systems", href: "/services/commercial-plumbing-piping" },
    ]
  },
  industrial: {
    hvac: [
      { label: "Industrial Ventilation", href: "/services/industrial-ventilation" },
      { label: "Dust & Fume Extraction", href: "/services/industrial-dust" },
      { label: "Make-up Air Systems", href: "/services/industrial-makeup-air" },
      { label: "Custom Ductwork Fabrication", href: "/services/industrial-ducts" },
      { label: "Equipment Cooling Systems", href: "/services/industrial-cooling" },
      { label: "Gas Piping (HVAC-related)", href: "/services/industrial-gas-piping" },
      { label: "Radiant Tube Heating", href: "/services/industrial-radiant" },
    ],
    electrical: [
      { label: "Power Distribution Systems", href: "/services/industrial-power-dist" },
      { label: "Industrial Equipment Wiring", href: "/services/industrial-wiring" },
      { label: "Automation & Control", href: "/services/industrial-automation" },
      { label: "Backup Power Systems", href: "/services/industrial-backup-power" },
    ],
    plumbing: [
      { label: "Industrial Water & Drainage", href: "/services/industrial-plumbing-water" },
      { label: "Compressed Air Systems", href: "/services/industrial-plumbing-air" },
      { label: "Boiler Systems & Hydronic", href: "/services/industrial-plumbing-boilers" },
      { label: "Industrial Pump Systems", href: "/services/industrial-plumbing-pumps" },
    ]
  },
  rentalsAndServices: {
    rentals: [
      { label: "Water Heaters Rental", href: "/rentals/water-heaters" },
      { label: "Furnaces and A/C Rental", href: "/rentals/furnaces-ac" },
    ],
    services: [
      { label: "Custom Ductwork", href: "/other-services/custom-ductwork" },
      { label: "Complete Construction Package", href: "/other-services/construction-package" },
      { label: "Engineered Permit Drawings", href: "/light-industrial/permit-drawings" },
      { label: "Water Purification", href: "/water-purification" },
      { label: "Custom Hoses", href: "/other-services/custom-hoses" },
      { label: "Drawings and Permits", href: "/other-services/drawings-permits" },
    ]
  }
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
  
  // Mobile accordion states
  const [mobileResSecOpen, setMobileResSecOpen] = useState(null);
  const [mobileComSecOpen, setMobileComSecOpen] = useState(null);
  const [mobileIndSecOpen, setMobileIndSecOpen] = useState(null);
  const [mobileRentSecOpen, setMobileRentSecOpen] = useState(null);

  const [activeTab, setActiveTab] = useState("residential");

  const timeoutRef = useRef(null);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setMobileResOpen(false);
    if (location.pathname !== "/mep-solutions") {
      setActiveDropdown(null);
    }
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    if (activeDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown]);

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
    location.pathname.startsWith("/mep-solutions") ||
    location.pathname.startsWith("/rentals") ||
    location.pathname === "/water-purification" ||
    location.pathname.startsWith("/other-services");

  const navLinkClass = (path) =>
    `px-4 xl:px-6 py-2 rounded text-base xl:text-lg font-bold whitespace-nowrap transition-all duration-300 text-[#c3252e] ${
      isActive(path)
        ? "bg-white/5"
        : scrolled
        ? "hover:bg-white/5"
        : ""
    }`;

  const productNavLinkClass = () =>
    `px-4 xl:px-6 py-2 rounded text-base xl:text-lg font-bold whitespace-nowrap transition-all duration-300 text-[#c3252e] ${
      isProductActive()
        ? "bg-white/5"
        : scrolled
        ? "hover:bg-white/5"
        : ""
    }`;

  const renderDropdown = () => {
    if (activeDropdown !== "product") return null;

    const tabs = [
      {
        id: "residential",
        label: "Residential",
        desc: "Home HVAC, electrical, & plumbing",
        icon: Home,
        color: "text-[#c3252e]",
        bgActive: "bg-[#c3252e]/10 border-[#c3252e]/30"
      },
      {
        id: "commercial",
        label: "Commercial",
        desc: "Offices, retail, & restaurants",
        icon: Building2,
        color: "text-[#8f8cff]",
        bgActive: "bg-[#8f8cff]/10 border-[#8f8cff]/30"
      },
      {
        id: "industrial",
        label: "Industrial",
        desc: "Ventilation, exhaust, & power",
        icon: Factory,
        color: "text-white",
        bgActive: "bg-white/10 border-white/20"
      },
      {
        id: "rentalsAndServices",
        label: "Rentals & Services",
        desc: "Equipment rentals & custom work",
        icon: Wrench,
        color: "text-[#25d366]",
        bgActive: "bg-[#25d366]/10 border-[#25d366]/30"
      }
    ];

    const currentTab = tabs.find(t => t.id === activeTab) || tabs[0];

    return (
      <div
        className="fixed product-submenu rounded-2xl shadow-2xl p-6 z-50 flex flex-row gap-6"
        style={{
          top: "85px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "1150px",
          maxWidth: "calc(100vw - 32px)",
          minHeight: "480px",
        }}
      >
        {/* Left Sidebar - Tabs */}
        <div className="w-1/4 border-r border-white/10 pr-6 flex flex-col gap-2.5 justify-start pt-2">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-3 mb-2 block">
            Select Category
          </span>
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onMouseEnter={() => setActiveTab(tab.id)}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-start gap-4 p-3 rounded-xl border text-left transition-all duration-205 cursor-pointer ${
                  isTabActive
                    ? `${tab.bgActive} shadow-lg shadow-[#000]/10`
                    : "border-transparent bg-transparent hover:bg-white/5"
                }`}
              >
                <div className={`p-2 rounded-lg ${isTabActive ? tab.color + " bg-white/5" : "text-gray-400 bg-white/5"}`}>
                  <IconComponent size={20} />
                </div>
                <div className="flex-1">
                  <div className={`text-sm font-bold transition-colors ${isTabActive ? "text-white" : "text-gray-300"}`}>
                    {tab.label}
                  </div>
                  <div className="text-[11px] text-gray-400 mt-0.5 line-clamp-1 leading-none">
                    {tab.desc}
                  </div>
                </div>
                {isTabActive && (
                  <ChevronRight size={14} className={`mt-3.5 ${tab.color}`} />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Panel - Content Grid */}
        <div className="flex-1 pl-4 flex flex-col justify-between pt-2">
          {/* Header */}
          <div className="mb-4">
            <h4 className="text-white text-base font-black flex items-center gap-2">
              <span className={`inline-block w-2.5 h-2.5 rounded-full ${currentTab.color === 'text-white' ? 'bg-white' : currentTab.color.replace('text-', 'bg-')}`} />
              {currentTab.label} Solutions
            </h4>
            <p className="text-xs text-gray-400 mt-1">
              Browse our comprehensive range of {currentTab.label.toLowerCase()} services and systems.
            </p>
          </div>

          {/* Columns */}
          <div className="flex-1 grid grid-cols-3 gap-6 overflow-y-auto max-h-[300px] pr-2 no-scrollbar">
            {activeTab === "residential" && (
              <>
                {/* Residential Column 1: HVAC */}
                <div>
                  <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                    <Flame size={14} className="text-[#c3252e]" />
                    <span className="text-gray-300 text-xs font-black uppercase tracking-wider">HVAC</span>
                  </div>
                  <ul className="space-y-2">
                    {PRODUCT_MENU.residential.hvac.map(item => (
                      <li key={item.label}>
                        <Link
                          to={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="group flex items-center justify-between text-gray-300 text-[13px] font-semibold hover:text-[#c3252e] hover:pl-1 transition-all duration-150"
                        >
                          {item.label}
                          <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 text-[#c3252e] transition-opacity duration-155" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Residential Column 2: Electrical */}
                <div>
                  <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                    <Zap size={14} className="text-[#c3252e]" />
                    <Link
                      to="/residential-solutions/electrical"
                      onClick={() => setActiveDropdown(null)}
                      className="text-gray-300 text-xs font-black uppercase tracking-wider hover:text-[#c3252e] transition-colors"
                    >
                      Electrical
                    </Link>
                  </div>
                  <ul className="space-y-2">
                    {PRODUCT_MENU.residential.electrical.map(item => (
                      <li key={item.label}>
                        <Link
                          to={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="group flex items-center justify-between text-gray-300 text-[13px] font-semibold hover:text-[#c3252e] hover:pl-1 transition-all duration-150"
                        >
                          {item.label}
                          <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 text-[#c3252e] transition-opacity duration-155" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Residential Column 3: Plumbing */}
                <div>
                  <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                    <Droplet size={14} className="text-[#c3252e]" />
                    <Link
                      to="/residential-solutions/plumbing"
                      onClick={() => setActiveDropdown(null)}
                      className="text-gray-300 text-xs font-black uppercase tracking-wider hover:text-[#c3252e] transition-colors"
                    >
                      Plumbing & Water
                    </Link>
                  </div>
                  <ul className="space-y-2">
                    {PRODUCT_MENU.residential.plumbing.map(item => (
                      <li key={item.label}>
                        <Link
                          to={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="group flex items-center justify-between text-gray-300 text-[13px] font-semibold hover:text-[#c3252e] hover:pl-1 transition-all duration-150"
                        >
                          {item.label}
                          <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 text-[#c3252e] transition-opacity duration-155" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {activeTab === "commercial" && (
              <>
                {/* Commercial Column 1: HVAC */}
                <div>
                  <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                    <Flame size={14} className="text-[#8f8cff]" />
                    <span className="text-gray-300 text-xs font-black uppercase tracking-wider">HVAC</span>
                  </div>
                  <ul className="space-y-2">
                    {PRODUCT_MENU.commercial.hvac.map(item => (
                      <li key={item.label}>
                        <Link
                          to={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="group flex items-center justify-between text-gray-300 text-[13px] font-semibold hover:text-[#8f8cff] hover:pl-1 transition-all duration-150"
                        >
                          {item.label}
                          <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 text-[#8f8cff] transition-opacity duration-155" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Commercial Column 2: Electrical */}
                <div>
                  <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                    <Zap size={14} className="text-[#8f8cff]" />
                    <Link
                      to="/commercial-solutions/electrical"
                      onClick={() => setActiveDropdown(null)}
                      className="text-gray-300 text-xs font-black uppercase tracking-wider hover:text-[#8f8cff] transition-colors"
                    >
                      Electrical
                    </Link>
                  </div>
                  <ul className="space-y-2">
                    {PRODUCT_MENU.commercial.electrical.map(item => (
                      <li key={item.label}>
                        <Link
                          to={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="group flex items-center justify-between text-gray-300 text-[13px] font-semibold hover:text-[#8f8cff] hover:pl-1 transition-all duration-150"
                        >
                          {item.label}
                          <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 text-[#8f8cff] transition-opacity duration-155" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Commercial Column 3: Plumbing */}
                <div>
                  <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                    <Droplet size={14} className="text-[#8f8cff]" />
                    <Link
                      to="/commercial-solutions/plumbing"
                      onClick={() => setActiveDropdown(null)}
                      className="text-gray-300 text-xs font-black uppercase tracking-wider hover:text-[#8f8cff] transition-colors"
                    >
                      Plumbing
                    </Link>
                  </div>
                  <ul className="space-y-2">
                    {PRODUCT_MENU.commercial.plumbing.map(item => (
                      <li key={item.label}>
                        <Link
                          to={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="group flex items-center justify-between text-gray-300 text-[13px] font-semibold hover:text-[#8f8cff] hover:pl-1 transition-all duration-150"
                        >
                          {item.label}
                          <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 text-[#8f8cff] transition-opacity duration-155" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {activeTab === "industrial" && (
              <>
                {/* Industrial Column 1: HVAC */}
                <div>
                  <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                    <Flame size={14} className="text-white" />
                    <span className="text-gray-300 text-xs font-black uppercase tracking-wider">HVAC</span>
                  </div>
                  <ul className="space-y-2">
                    {PRODUCT_MENU.industrial.hvac.map(item => (
                      <li key={item.label}>
                        <Link
                          to={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="group flex items-center justify-between text-gray-300 text-[13px] font-semibold hover:text-white hover:pl-1 transition-all duration-150"
                        >
                          {item.label}
                          <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 text-white transition-opacity duration-155" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Industrial Column 2: Electrical */}
                <div>
                  <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                    <Zap size={14} className="text-white" />
                    <Link
                      to="/light-industrial/electrical"
                      onClick={() => setActiveDropdown(null)}
                      className="text-gray-300 text-xs font-black uppercase tracking-wider hover:text-white transition-colors"
                    >
                      Electrical
                    </Link>
                  </div>
                  <ul className="space-y-2">
                    {PRODUCT_MENU.industrial.electrical.map(item => (
                      <li key={item.label}>
                        <Link
                          to={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="group flex items-center justify-between text-gray-300 text-[13px] font-semibold hover:text-white hover:pl-1 transition-all duration-150"
                        >
                          {item.label}
                          <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 text-white transition-opacity duration-155" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Industrial Column 3: Plumbing */}
                <div>
                  <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                    <Droplet size={14} className="text-white" />
                    <Link
                      to="/light-industrial/plumbing"
                      onClick={() => setActiveDropdown(null)}
                      className="text-gray-300 text-xs font-black uppercase tracking-wider hover:text-white transition-colors"
                    >
                      Plumbing
                    </Link>
                  </div>
                  <ul className="space-y-2">
                    {PRODUCT_MENU.industrial.plumbing.map(item => (
                      <li key={item.label}>
                        <Link
                          to={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="group flex items-center justify-between text-gray-300 text-[13px] font-semibold hover:text-white hover:pl-1 transition-all duration-150"
                        >
                          {item.label}
                          <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 text-white transition-opacity duration-155" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {activeTab === "rentalsAndServices" && (
              <>
                {/* Rentals Column 1: Equipment Rentals */}
                <div className="col-span-1">
                  <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                    <DollarSign size={14} className="text-[#25d366]" />
                    <span className="text-gray-300 text-xs font-black uppercase tracking-wider">Equipment Rentals</span>
                  </div>
                  <ul className="space-y-2">
                    {PRODUCT_MENU.rentalsAndServices.rentals.map(item => (
                      <li key={item.label}>
                        <Link
                          to={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="group flex items-center justify-between text-gray-300 text-[13px] font-semibold hover:text-[#25d366] hover:pl-1 transition-all duration-150"
                        >
                          {item.label}
                          <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 text-[#25d366] transition-opacity duration-155" />
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {/* Highlights Card */}
                  <div className="mt-4 p-4 rounded-xl border border-[#25d366]/20 bg-[#25d366]/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-1 bg-[#25d366] text-[#1a1a2e] text-[9px] font-bold uppercase rounded-bl">
                      Promo
                    </div>
                    <h5 className="text-[11px] font-black uppercase tracking-wider text-[#25d366] mb-1">
                      Worry-Free Program
                    </h5>
                    <p className="text-[10px] text-gray-300 leading-normal">
                      Zero upfront equipment or installation costs on rentals.
                    </p>
                  </div>
                </div>

                {/* Rentals Column 2: Other Services */}
                <div className="col-span-2">
                  <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                    <Wrench size={14} className="text-[#25d366]" />
                    <Link
                      to="/services"
                      onClick={() => setActiveDropdown(null)}
                      className="text-gray-300 text-xs font-black uppercase tracking-wider hover:text-[#25d366] transition-colors"
                    >
                      Specialty Services
                    </Link>
                  </div>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {PRODUCT_MENU.rentalsAndServices.services.map(item => (
                      <li key={item.label}>
                        <Link
                          to={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="group flex items-center justify-between text-gray-300 text-[13px] font-semibold hover:text-[#25d366] hover:pl-1 transition-all duration-150"
                        >
                          {item.label}
                          <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 text-[#25d366] transition-opacity duration-155 shrink-0" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>

          {/* Footer Call to Action */}
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-[11px] text-gray-400">
              Need custom MEP plans or engineered permit drawings?
            </span>
            <div className="flex gap-3">
              <Link
                id="metric-mep-submenu-btn"
                to="/mep-solutions"
                onClick={() => setActiveDropdown(null)}
                className="px-3 py-1.5 rounded-lg border border-white/10 text-white hover:bg-white/5 text-[11px] font-bold transition-all"
              >
                MEP Solutions
              </Link>
              <a
                id="metric-whatsapp-submenu-btn"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#25d366] hover:bg-[#25d366]/90 text-white text-[11px] font-black flex items-center gap-1.5 shadow-md shadow-[#25d366]/10 transition-all"
              >
                <WhatsAppIcon size={12} />
                WhatsApp Consultation
              </a>
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
              
              {/* Product dropdown */}
              <div
                ref={dropdownRef}
                className="relative"
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === "product" ? null : "product")}
                  className={`flex items-center gap-0.5 cursor-pointer bg-transparent border-none outline-none ${productNavLinkClass()}`}
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
            </div>
          </div>

          {/* CENTER: Logo */}
          <Link
            to="/"
            className="shrink-0 flex items-center justify-center absolute left-1/2 -translate-x-1/2 w-48 h-full pointer-events-auto z-20"
          >
            <img
              src="/images/metricnew.png"
              alt="MetricAir Logo"
              style={{
                height: "425px",
                width: "auto",
                maxWidth: "510px",
                transition: "opacity 0.5s ease",
                opacity: scrolled ? 1 : 0.92,
                pointerEvents: "none",
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
              <Link to="/store" className={navLinkClass("/store")}>Store</Link>
              <Link to="/about" className={navLinkClass("/about")}>About Us</Link>

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
        <div className="xl:hidden product-submenu border-t px-4 pt-3 pb-5 space-y-1 max-h-[calc(100vh-80px)] overflow-y-auto no-scrollbar">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className={`block px-4 py-2.5 rounded text-lg font-extrabold transition-colors text-[#c3252e] ${
              isActive("/") ? "bg-white/5" : "hover:bg-white/5"
            }`}
          >
            Home
          </Link>

          {/* Product collapsible */}
          <div>
            <button
              type="button"
              onClick={() => setMobileResOpen(!mobileResOpen)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded text-lg font-extrabold transition-colors bg-transparent border-none outline-none cursor-pointer text-[#c3252e] ${
                mobileResOpen ? "bg-white/5" : "hover:bg-white/5"
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
                {/* 1. Residential */}
                <div>
                  <button
                    type="button"
                    onClick={() => setMobileResSecOpen(mobileResSecOpen === "res" ? null : "res")}
                    className="w-full flex items-center justify-between text-[#c3252e] text-xs font-bold uppercase tracking-widest mb-1.5 hover:text-white transition-colors bg-transparent border-none outline-none cursor-pointer"
                  >
                    Residential
                    <ChevronDown size={12} className={`transition-transform ${mobileResSecOpen === 'res' ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileResSecOpen === "res" && (
                    <div className="pl-2 space-y-2 mt-1">
                      <div>
                        <span className="text-gray-400 text-[10px] font-semibold uppercase block mb-1">HVAC</span>
                        <ul className="space-y-1 pl-1">
                          {PRODUCT_MENU.residential.hvac.map(item => (
                            <li key={item.label}><Link to={item.href} onClick={() => setMobileOpen(false)} className="block text-gray-300 text-xs hover:text-white">{item.label}</Link></li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="text-gray-400 text-[10px] font-semibold uppercase block mb-1">Electrical</span>
                        <ul className="space-y-1 pl-1">
                          {PRODUCT_MENU.residential.electrical.map(item => (
                            <li key={item.label}><Link to={item.href} onClick={() => setMobileOpen(false)} className="block text-gray-300 text-xs hover:text-white">{item.label}</Link></li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="text-gray-400 text-[10px] font-semibold uppercase block mb-1">Plumbing</span>
                        <ul className="space-y-1 pl-1">
                          {PRODUCT_MENU.residential.plumbing.map(item => (
                            <li key={item.label}><Link to={item.href} onClick={() => setMobileOpen(false)} className="block text-gray-300 text-xs hover:text-white">{item.label}</Link></li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Commercial */}
                <div>
                  <button
                    type="button"
                    onClick={() => setMobileComSecOpen(mobileComSecOpen === "com" ? null : "com")}
                    className="w-full flex items-center justify-between text-[#8f8cff] text-xs font-bold uppercase tracking-widest mb-1.5 hover:text-white transition-colors bg-transparent border-none outline-none cursor-pointer"
                  >
                    Commercial
                    <ChevronDown size={12} className={`transition-transform ${mobileComSecOpen === 'com' ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileComSecOpen === "com" && (
                    <div className="pl-2 space-y-2 mt-1">
                      <div>
                        <span className="text-gray-400 text-[10px] font-semibold uppercase block mb-1">HVAC</span>
                        <ul className="space-y-1 pl-1">
                          {PRODUCT_MENU.commercial.hvac.map(item => (
                            <li key={item.label}><Link to={item.href} onClick={() => setMobileOpen(false)} className="block text-gray-300 text-xs hover:text-white">{item.label}</Link></li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="text-gray-400 text-[10px] font-semibold uppercase block mb-1">Electrical</span>
                        <ul className="space-y-1 pl-1">
                          {PRODUCT_MENU.commercial.electrical.map(item => (
                            <li key={item.label}><Link to={item.href} onClick={() => setMobileOpen(false)} className="block text-gray-300 text-xs hover:text-white">{item.label}</Link></li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="text-gray-400 text-[10px] font-semibold uppercase block mb-1">Plumbing</span>
                        <ul className="space-y-1 pl-1">
                          {PRODUCT_MENU.commercial.plumbing.map(item => (
                            <li key={item.label}><Link to={item.href} onClick={() => setMobileOpen(false)} className="block text-gray-300 text-xs hover:text-white">{item.label}</Link></li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Industrial */}
                <div>
                  <button
                    type="button"
                    onClick={() => setMobileIndSecOpen(mobileIndSecOpen === "ind" ? null : "ind")}
                    className="w-full flex items-center justify-between text-white text-xs font-bold uppercase tracking-widest mb-1.5 hover:text-[#c3252e] transition-colors bg-transparent border-none outline-none cursor-pointer"
                  >
                    Industrial
                    <ChevronDown size={12} className={`transition-transform ${mobileIndSecOpen === 'ind' ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileIndSecOpen === "ind" && (
                    <div className="pl-2 space-y-2 mt-1">
                      <div>
                        <span className="text-gray-400 text-[10px] font-semibold uppercase block mb-1">HVAC</span>
                        <ul className="space-y-1 pl-1">
                          {PRODUCT_MENU.industrial.hvac.map(item => (
                            <li key={item.label}><Link to={item.href} onClick={() => setMobileOpen(false)} className="block text-gray-300 text-xs hover:text-white">{item.label}</Link></li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="text-gray-400 text-[10px] font-semibold uppercase block mb-1">Electrical</span>
                        <ul className="space-y-1 pl-1">
                          {PRODUCT_MENU.industrial.electrical.map(item => (
                            <li key={item.label}><Link to={item.href} onClick={() => setMobileOpen(false)} className="block text-gray-300 text-xs hover:text-white">{item.label}</Link></li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="text-gray-400 text-[10px] font-semibold uppercase block mb-1">Plumbing</span>
                        <ul className="space-y-1 pl-1">
                          {PRODUCT_MENU.industrial.plumbing.map(item => (
                            <li key={item.label}><Link to={item.href} onClick={() => setMobileOpen(false)} className="block text-gray-300 text-xs hover:text-white">{item.label}</Link></li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. Rentals & Services */}
                <div>
                  <button
                    type="button"
                    onClick={() => setMobileRentSecOpen(mobileRentSecOpen === "rent" ? null : "rent")}
                    className="w-full flex items-center justify-between text-[#25d366] text-xs font-bold uppercase tracking-widest mb-1.5 hover:text-white transition-colors bg-transparent border-none outline-none cursor-pointer"
                  >
                    Rentals & Services
                    <ChevronDown size={12} className={`transition-transform ${mobileRentSecOpen === 'rent' ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileRentSecOpen === "rent" && (
                    <div className="pl-2 space-y-2 mt-1">
                      <div>
                        <span className="text-gray-400 text-[10px] font-semibold uppercase block mb-1">Equipment Rentals</span>
                        <ul className="space-y-1 pl-1">
                          {PRODUCT_MENU.rentalsAndServices.rentals.map(item => (
                            <li key={item.label}><Link to={item.href} onClick={() => setMobileOpen(false)} className="block text-gray-300 text-xs hover:text-white">{item.label}</Link></li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="text-gray-400 text-[10px] font-semibold uppercase block mb-1">Other Services</span>
                        <ul className="space-y-1 pl-1">
                          {PRODUCT_MENU.rentalsAndServices.services.map(item => (
                            <li key={item.label}><Link to={item.href} onClick={() => setMobileOpen(false)} className="block text-gray-300 text-xs hover:text-white">{item.label}</Link></li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <Link
            to="/store"
            onClick={() => setMobileOpen(false)}
            className={`block px-4 py-2.5 rounded text-lg font-extrabold transition-colors text-[#c3252e] ${
              isActive("/store") ? "bg-white/5" : "hover:bg-white/5"
            }`}
          >
            Store
          </Link>

          <Link
            to="/about"
            onClick={() => setMobileOpen(false)}
            className={`block px-4 py-2.5 rounded text-lg font-extrabold transition-colors text-[#c3252e] ${
              isActive("/about") ? "bg-white/5" : "hover:bg-white/5"
            }`}
          >
            About Us
          </Link>
        </div>
      )}
    </nav>
  );
}
