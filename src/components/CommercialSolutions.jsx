// src/components/CommercialSolutions.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import LeadForm from './LeadForm';

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

const SUB_SERVICES = [
  {
    title: "Restaurants & Commercial Kitchens",
    desc: "Complete mechanical kitchen exhaust ventilation setups, NFPA-compliant grease hood installations, variable frequency drive makeup air configurations, and stamped approval permit packages.",
    href: "/commercial-solutions/restaurants",
    image: "/images/commercial.jpg",
    features: ["Grease hoods & exhaust lines", "Makeup air unit integration", "Complete design-build permit packages"]
  },
  {
    title: "Office & Retail Spaces",
    desc: "Energy-efficient commercial rooftop HVAC units (RTU), multi-split climate systems, multi-zone smart dampers, and continuous commercial ventilation to ensure compliance with local building standards.",
    href: "/commercial-solutions/office-retail",
    image: "/images/ahu.jpg",
    features: ["Rooftop HVAC units (RTU)", "Multi-zone smart dampers", "Acoustic ductwork fabrication"]
  }
];

export default function CommercialSolutions() {
  const [heroRef, heroInView] = useInView(0.02);
  const [gridRef, gridInView] = useInView(0.05);
  const [elecRef, elecInView] = useInView(0.05);
  const [plumbRef, plumbInView] = useInView(0.05);
  const [formRef, formInView] = useInView(0.05);

  return (
    <div className="w-full bg-[#1a1a2e] text-white pt-24 pb-16 sm:pt-32 lg:pt-36 overflow-hidden">

      {/* ── HERO BANNER ── */}
      <section
        ref={heroRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24 lg:mb-28 transition-all duration-1000 ease-out"
        style={{
          opacity: heroInView ? 1 : 0,
          transform: heroInView ? 'translateY(0)' : 'translateY(30px)',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left content block */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col gap-4">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest block mb-4">
              Enterprise Infrastructure Engineering
            </span>
            <h1 id="metric-commercial-solutions-heading" className="font-black leading-tight text-3xl sm:text-5xl lg:text-6xl mb-6">
              <span className="text-[#8f8cff]">Commercial</span>{' '}
              <span className="text-[#c3252e]">Solutions</span>{' '}
              <span className="text-white">& Services</span>
            </h1>
            <div className="w-20 h-1 rounded-full bg-gradient-to-r from-[#c3252e] via-[#8f8cff] to-white mx-auto lg:mx-0 mb-6" />
            <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Ensure safety, occupant comfort, structural integrity, and local building permit compliance with MetricAir's commercial Mechanical, Electrical, and Plumbing engineering.
            </p>
          </div>

          {/* Right image block (keeping photo in old component as it is) */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border-none bg-transparent aspect-[4/3] group"
            style={{ opacity: heroInView ? 1 : 0, transform: heroInView ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s' }}
          >
            <img
              src="/images/combo.png"
              alt="Commercial HVAC Ventilation and Climate System Installation"
              className="absolute top-[-40px] left-[-40px] w-[calc(100%+80px)] h-[calc(100%+80px)] min-w-[calc(100%+80px)] min-h-[calc(100%+80px)] max-w-none max-h-none object-cover select-none"
              draggable="false"
            />
          </div>
        </div>
      </section>

      {/* ── HVAC SOLUTIONS SECTION ── */}
      <section id="hvac" ref={gridRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 sm:mb-32">
        <div
          className="text-center mb-12 sm:mb-16 transition-all duration-700 ease-out"
          style={{
            opacity: gridInView ? 1 : 0,
            transform: gridInView ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <span className="text-[#c3252e] text-xs font-bold uppercase tracking-widest block mb-2">Climate Systems</span>
          <h2 id="metric-commercial-hvac-heading" className="font-black text-2xl sm:text-4xl text-white">Commercial HVAC & Ventilation</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {SUB_SERVICES.map((srv, idx) => (
            <div
              key={srv.title}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#8f8cff]/40 hover:bg-white/[0.08] flex flex-col justify-between transition-all duration-300 group overflow-hidden"
              style={{
                opacity: gridInView ? 1 : 0,
                transform: gridInView ? 'translateY(0)' : 'translateY(40px)',
                transitionDuration: '800ms',
                transitionDelay: gridInView ? `${idx * 150}ms` : '0ms',
              }}
            >
              <div>
                <div className="h-56 w-full rounded-xl overflow-hidden mb-4 relative">
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 select-none"
                    draggable="false"
                  />
                </div>
                <h3 className="text-white font-bold text-lg sm:text-xl mb-2">{srv.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4">{srv.desc}</p>
                <div className="flex flex-col gap-1.5 mb-6">
                  {srv.features.map((feat) => (
                    <span key={feat} className="text-[10px] sm:text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                      <span className="text-[#8f8cff]">✓</span> {feat}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                to={srv.href}
                className="w-full block py-2.5 rounded-lg bg-[#8f8cff] hover:bg-[#2563eb] transition-colors text-center text-xs font-bold uppercase tracking-wider text-white"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── ELECTRICAL SERVICES SECTION ── */}
      <section id="electrical" ref={elecRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 sm:mb-32">
        <div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center transition-all duration-1000 ease-out"
          style={{
            opacity: elecInView ? 1 : 0,
            transform: elecInView ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          {/* Details column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <span className="text-[#8f8cff] text-xs font-bold uppercase tracking-widest block mb-2">Power Distribution & Wiring</span>
              <h2 id="metric-commercial-elec-heading" className="font-black text-2xl sm:text-4xl text-white">Commercial Electrical Services</h2>
            </div>
            
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              We engineer and deploy robust commercial electrical networks. From commercial tenant fit-outs and restaurant cooking equipment line wiring to major office building panel upgrades and energy-efficient interior/exterior LED conversions, our solutions are fully ESA-compliant.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex gap-3 text-sm text-gray-300">
                <span className="text-[#8f8cff] text-lg font-bold">✓</span>
                <div>
                  <h4 className="text-white font-bold text-sm">New Construction Electrical</h4>
                  <p className="text-gray-400 text-xs mt-0.5">Rough-in wiring, distribution panels, and fit-outs for retail/restaurants.</p>
                </div>
              </div>
              <div className="flex gap-3 text-sm text-gray-300">
                <span className="text-[#8f8cff] text-lg font-bold">✓</span>
                <div>
                  <h4 className="text-white font-bold text-sm">Panel Relocation & Upgrades</h4>
                  <p className="text-gray-400 text-xs mt-0.5">Moving high-voltage subpanels, installing main breakers, and increasing capacity.</p>
                </div>
              </div>
              <div className="flex gap-3 text-sm text-gray-300">
                <span className="text-[#8f8cff] text-lg font-bold">✓</span>
                <div>
                  <h4 className="text-white font-bold text-sm">Appliance & Equipment Power</h4>
                  <p className="text-gray-400 text-xs mt-0.5">Dedicated lines for commercial ovens, walk-in coolers, HVAC, and industrial loads.</p>
                </div>
              </div>
              <div className="flex gap-3 text-sm text-gray-300">
                <span className="text-[#8f8cff] text-lg font-bold">✓</span>
                <div>
                  <h4 className="text-white font-bold text-sm">LED Lighting Upgrades</h4>
                  <p className="text-gray-400 text-xs mt-0.5">Interior task lighting, high-bay warehouses, exterior parking lot fixtures.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Graphics column */}
          <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10 flex flex-col items-center justify-center gap-6 relative group overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-[#8f8cff]/10 border border-[#8f8cff]/20 flex items-center justify-center text-[#8f8cff]">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-xl text-center">Licensed & Insured Electricians</h3>
            <p className="text-gray-400 text-xs sm:text-sm text-center leading-relaxed">
              We design and coordinate full commercial electrical blueprints that meet Canadian Electrical Code (CEC) and local Ontario regulations.
            </p>
            <div className="w-full h-1 rounded bg-[#8f8cff]/25 mt-2" />
          </div>
        </div>
      </section>

      {/* ── PLUMBING SERVICES SECTION ── */}
      <section id="plumbing" ref={plumbRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 sm:mb-32">
        <div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center transition-all duration-1000 ease-out"
          style={{
            opacity: plumbInView ? 1 : 0,
            transform: plumbInView ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          {/* Graphics column (appears first on desktop) */}
          <div className="lg:col-span-5 order-last lg:order-first bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10 flex flex-col items-center justify-center gap-6 relative group overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-xl text-center">Commercial Water & Steam Infrastructure</h3>
            <p className="text-gray-400 text-xs sm:text-sm text-center leading-relaxed">
              From grease interceptor drainage to commercial hydronic boiler loops, we lay down robust, heavy-duty piping systems built to endure continuous high-demand use.
            </p>
            <div className="w-full h-1 rounded bg-white/20 mt-2" />
          </div>

          {/* Details column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <span className="text-white/60 text-xs font-bold uppercase tracking-widest block mb-2">Piping & Heating Loops</span>
              <h2 id="metric-commercial-plumb-heading" className="font-black text-2xl sm:text-4xl text-white">Commercial Plumbing & Piping</h2>
            </div>
            
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              We design and lay building-wide plumbing infrastructures. Our commercial plumbers specialize in commercial hot water tanks, grease trap configurations for hospitality spaces, retrofit drainage piping, backflow prevention, and complex boiler setups.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex gap-3 text-sm text-gray-300">
                <span className="text-[#8f8cff] text-lg font-bold">✓</span>
                <div>
                  <h4 className="text-white font-bold text-sm">Full Plumbing Package</h4>
                  <p className="text-gray-400 text-xs mt-0.5">Integrated plumbing layouts, drainage lines, and water main setups.</p>
                </div>
              </div>
              <div className="flex gap-3 text-sm text-gray-300">
                <span className="text-[#8f8cff] text-lg font-bold">✓</span>
                <div>
                  <h4 className="text-white font-bold text-sm">Service & Maintenance</h4>
                  <p className="text-gray-400 text-xs mt-0.5">Grease trap servicing, leak detection, drain scoping, and backflow certification.</p>
                </div>
              </div>
              <div className="flex gap-3 text-sm text-gray-300">
                <span className="text-[#8f8cff] text-lg font-bold">✓</span>
                <div>
                  <h4 className="text-white font-bold text-sm">Retrofits & Relocations</h4>
                  <p className="text-gray-400 text-xs mt-0.5">Relocating kitchen lines, adding utility sinks, and rerouting supply loops.</p>
                </div>
              </div>
              <div className="flex gap-3 text-sm text-gray-300">
                <span className="text-[#8f8cff] text-lg font-bold">✓</span>
                <div>
                  <h4 className="text-white font-bold text-sm">Boilers & Commercial Heating</h4>
                  <p className="text-gray-400 text-xs mt-0.5">Hydronic boiler loops, water heaters, radiant baseboards, and pumps.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONSULTATION FORM ── */}
      <section
        ref={formRef}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out"
        style={{
          opacity: formInView ? 1 : 0,
          transform: formInView ? 'translateY(0)' : 'translateY(40px)',
        }}
      >
        <div className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-10 lg:p-12">
          <div className="text-center mb-8 sm:mb-10">
            <span className="text-[#8f8cff] text-xs font-bold uppercase tracking-widest block mb-2">Commercial Proposals</span>
            <h2 className="font-black text-xl sm:text-3xl text-white">Speak to a Commercial Specialist</h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-2">Get precise sizing estimates and a comprehensive proposal custom-tailored to your building blueprints.</p>
          </div>

          <LeadForm
            subject="Commercial Consultation Request (HVAC/Elec/Plumb)"
            fromName="MetricAir Commercial Solutions"
            buttonText="Request Quote"
          />
        </div>
      </section>

    </div>
  );
}
