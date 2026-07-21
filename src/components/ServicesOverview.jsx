// src/components/ServicesOverview.jsx
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

/* ── Scroll intersection reveal hook ── */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    let timer;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => {
            setInView(true);
          }, 100);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [threshold]);
  return [ref, inView];
}

export default function ServicesOverview({ hideHeader = false }) {
  const [sectionRef, sectionInView] = useInView(0.02);
  const [resRef, resInView] = useInView(0.08);
  const [comRef, comInView] = useInView(0.08);
  const [indRef, indInView] = useInView(0.08);

  return (
    <>
      <style>{`
        /* Fade up animation styles */
        .fade-up-item {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.85s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .fade-up-item.revealed {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <section
        id="services-overview"
        ref={sectionRef}
        className={`w-full bg-[#0f0f1a] text-white py-10 sm:py-12 lg:py-16 px-4 sm:px-8 lg:px-16 overflow-hidden transition-all duration-1000 ease-out ${
          sectionInView ? 'opacity-100' : 'opacity-90'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          {/* ── Section Title ── */}
          {!hideHeader && (
            <header className="text-center mb-16 sm:mb-24">
              <h2 id="metric-services-heading" className="font-black text-3xl sm:text-4xl lg:text-5xl text-[#c3252e] leading-tight">
                Our Core Expertise & Solutions
              </h2>
              <div className="w-16 h-1 rounded-full bg-gradient-to-r from-[#c3252e] via-[#8f8cff] to-white mx-auto mt-5" />
              <p className="text-white text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mt-4">
                Providing professional heating, cooling, ventilation, and custom permit designs for residential, commercial, and industrial clients all over Canada.
              </p>
            </header>
          )}

          {/* ── Staggered Content Grid ── */}
          <div className="space-y-20 sm:space-y-28 lg:space-y-36">
            
             {/* ROW 1: Residential HVAC */}
            <article
              ref={resRef}
              className={`flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16 fade-up-item ${
                resInView ? 'revealed' : ''
              }`}
            >
              {/* Image Column */}
              <div className="w-full lg:w-1/2 relative group overflow-hidden transition-all duration-300">
                <img
                  src="/images/residential.jpg"
                  alt="Energy-efficient Residential Heating and Cooling Services in Canada"
                  className="w-full h-[250px] sm:h-[350px] lg:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105 select-none"
                  draggable="false"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a]/60 via-transparent to-transparent pointer-events-none" />
              </div>
              {/* Text Column */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <span className="text-[#c3252e] text-xs font-black uppercase tracking-wider mb-2 block">
                  Home Climate Systems
                </span>
                <h3 id="metric-services-res-heading" className="text-2xl sm:text-3xl font-black mb-4 text-[#c3252e]">
                  Residential Heating & Cooling
                </h3>
                <p className="text-white text-sm sm:text-base leading-relaxed mb-6">
                  Maintain the perfect home comfort balance with MetricAir's premium residential HVAC services. From high-efficiency furnace upgrades to complete central air conditioning setups and air purification filtration, we supply, install, rent, and maintain complete domestic setups designed to reduce energy costs and improve indoor air quality.
                </p>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 mb-8 text-xs sm:text-sm font-medium text-white">
                  <li className="flex items-center gap-2">
                    <span className="text-[#ff5c65] text-lg">✓</span> Gas Furnaces & Radiant Heating
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#ff5c65] text-lg">✓</span> Central Air Conditioners
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#ff5c65] text-lg">✓</span> Heat Recovery Ventilators (HRV)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#ff5c65] text-lg">✓</span> Water Heater Rentals & Filters
                  </li>
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/residential-solutions/heating"
                    className="split-btn px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-white"
                  >
                    <span>Heating Systems</span>
                  </Link>
                  <Link
                    to="/residential-solutions/cooling"
                    className="split-btn px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-white"
                  >
                    <span>Cooling Systems</span>
                  </Link>
                </div>
              </div>
            </article>

            {/* ROW 2: Commercial HVAC */}
            <article
              ref={comRef}
              className={`flex flex-col lg:flex-row-reverse items-center gap-8 sm:gap-12 lg:gap-16 fade-up-item ${
                comInView ? 'revealed' : ''
              }`}
            >
              {/* Image Column */}
              <div className="w-full lg:w-1/2 h-[250px] sm:h-[350px] lg:h-[400px] relative group overflow-hidden rounded-xl border-none transition-all duration-300">
                <img
                  src="/images/combo.png"
                  alt="Commercial Restaurant Kitchen Exhaust and HVAC Installation Canada"
                  className="absolute top-[-40px] left-[-40px] w-[calc(100%+80px)] h-[calc(100%+80px)] min-w-[calc(100%+80px)] min-h-[calc(100%+80px)] max-w-none max-h-none object-cover select-none transition-transform duration-700 group-hover:scale-105"
                  draggable="false"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a]/60 via-transparent to-transparent pointer-events-none" />
              </div>
              {/* Text Column */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <span className="text-[#8f8cff] text-xs font-black uppercase tracking-wider mb-2 block">
                  Enterprise & Kitchen Climate
                </span>
                <h3 id="metric-services-comm-heading" className="text-2xl sm:text-3xl font-black mb-4 text-[#c3252e]">
                  Commercial Solutions & Ventilation (NFPA Compliance)
                </h3>
                <p className="text-white text-sm sm:text-base leading-relaxed mb-6">
                  MetricAir offers specialized commercial HVAC configurations, design-build packages, and high-performance makeup air setups. We are the trusted contractor all over Canada for restaurant kitchen exhaust hoods, rooftop units (RTU), office spaces, and custom construction packages, securing precise engineering approvals and building permit code compliance.
                </p>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 mb-8 text-xs sm:text-sm font-medium text-white">
                  <li className="flex items-center gap-2">
                    <span className="text-[#ff5c65] text-lg">✓</span> Commercial Kitchen Hoods
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#ff5c65] text-lg">✓</span> Rooftop HVAC Units (RTU)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#ff5c65] text-lg">✓</span> Makeup Air & Exhaust fans
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#ff5c65] text-lg">✓</span> Permit Drawing Approvals
                  </li>
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/commercial-solutions/restaurants"
                    className="split-btn px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-white"
                  >
                    <span>Restaurant Exhaust</span>
                  </Link>
                  <Link
                    to="/commercial-solutions/office-retail"
                    className="split-btn px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-white"
                  >
                    <span>Office Solutions</span>
                  </Link>
                </div>
              </div>
            </article>

            {/* ROW 3: Light Industrial HVAC */}
            <article
              ref={indRef}
              className={`flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16 fade-up-item ${
                indInView ? 'revealed' : ''
              }`}
            >
              {/* Image Column */}
              <div className="w-full lg:w-1/2 h-[250px] sm:h-[350px] lg:h-[400px] relative group overflow-hidden rounded-xl border-none transition-all duration-300">
                <img
                  src="/images/office.jpg"
                  alt="Light Industrial Warehouse Destratification and Exhaust Ventilation Canada"
                  className="absolute inset-0 w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-105"
                  draggable="false"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a]/60 via-transparent to-transparent pointer-events-none" />
              </div>
              {/* Text Column */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <span className="text-white/60 text-xs font-black uppercase tracking-wider mb-2 block">
                  Industrial Scale Airflow
                </span>
                <h3 id="metric-services-ind-heading" className="text-2xl sm:text-3xl font-black mb-4 text-[#c3252e]">
                  Industrial HVAC
                </h3>
                <p className="text-white text-sm sm:text-base leading-relaxed mb-6">
                  Improve industrial plant safety and manage warehouse thermal boundaries. MetricAir provides engineered exhaust setups, NFPA-compliant combustible dust collectors, high-volume low-speed (HVLS) destratification ceiling fans, and high-efficiency radiant gas tube heaters that warm spaces instantly.
                </p>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 mb-8 text-xs sm:text-sm font-medium text-white">
                  <li className="flex items-center gap-2">
                    <span className="text-[#ff5c65] text-lg">✓</span> Industrial Exhaust & Fume capture
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#ff5c65] text-lg">✓</span> HVLS Destratification Fans
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#ff5c65] text-lg">✓</span> Radiant Gas Tube Heating
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#ff5c65] text-lg">✓</span> Combustible Dust Exhaust
                  </li>
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/light-industrial"
                    className="split-btn px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-white"
                  >
                    <span>Industrial Solutions</span>
                  </Link>
                  <Link
                    to="/light-industrial/permit-drawings"
                    className="split-btn px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-white"
                  >
                    <span>Permit Drawings</span>
                  </Link>
                </div>
              </div>
            </article>

          </div>
        </div>
      </section>
    </>
  );
}
