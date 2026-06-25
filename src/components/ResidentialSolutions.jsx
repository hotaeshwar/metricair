// src/components/ResidentialSolutions.jsx
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
    title: "Heating Solutions",
    desc: "Stay warm with our high-efficiency gas furnaces, smart thermostat zoning, and hydronic floor heating setups designed for maximum thermal output and fuel efficiency.",
    href: "/residential-solutions/heating",
    image: "/images/res_furnace_ai.png",
    features: ["Gas furnaces & heat pumps", "Radiant infloor heating", "Annual inspections & maintenance"]
  },
  {
    title: "Cooling Solutions",
    desc: "Banish summer heat with energy-star rated central air conditioning systems, quiet ductless mini-splits, and smart climate occupancy configurations.",
    href: "/residential-solutions/cooling",
    image: "/images/coolingres.jpg",
    features: ["Central A/C units", "Ductless mini-splits", "Zoned thermostat diagnostics"]
  },
  {
    title: "Fresh Air Systems",
    desc: "Breathe purer air with whole-house Energy Recovery Ventilators (ERV), Heat Recovery Ventilators (HRV), and HEPA filtration systems that cycle indoor air seamlessly.",
    href: "/residential-solutions/fresh-air",
    image: "/images/freshair.jpg",
    features: ["HRV & ERV installation", "Humidifiers & filters", "Indoor air quality profiling"]
  },
  {
    title: "Radiant Tube Heating",
    desc: "Energy-efficient gas-fired infra-red heaters that heat objects and people directly, providing immediate warmth in large open spaces or garage workshops.",
    href: "/light-industrial/radiant-heating",
    image: "/images/tube.jpg",
    features: ["Single-stage & two-stage burners", "Linear or U-tube designs", "Reflector shields"]
  }
];

export default function ResidentialSolutions() {
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
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24 lg:mb-28 text-center transition-all duration-1000 ease-out"
        style={{
          opacity: heroInView ? 1 : 0,
          transform: heroInView ? 'translateY(0)' : 'translateY(30px)',
        }}
      >
        <div className="flex justify-center mb-6">
          <img src="/images/metric.png" alt="MetricAir Logo" className="w-48 sm:w-60 lg:w-72 object-contain" />
        </div>
        <span className="text-gray-400 text-xs font-bold uppercase tracking-widest block mb-4">
          Home Infrastructure Engineering
        </span>
        <h1 className="font-black leading-tight text-3xl sm:text-5xl lg:text-6xl mb-6">
          <span className="text-[#c3252e]">Residential</span>{' '}
          <span className="text-[#8f8cff]">Solutions</span>{' '}
          <span className="text-white">& Services</span>
        </h1>
        <div className="w-20 h-1 rounded-full bg-gradient-to-r from-[#c3252e] via-[#8f8cff] to-white mx-auto mb-6" />
        <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
          Providing high-performance mechanical, electrical, and plumbing engineering services for residential clients. From smart climate controls to ESA-compliant wiring and plumbing, we handle your home comfort safely.
        </p>
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
          <span className="text-[#c3252e] text-xs font-bold uppercase tracking-widest block mb-2">Climate Control</span>
          <h2 className="font-black text-2xl sm:text-4xl text-white">Residential HVAC Systems</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SUB_SERVICES.map((srv, idx) => (
            <div 
              key={srv.title} 
              className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#c3252e]/40 hover:bg-white/[0.08] flex flex-col justify-between transition-all duration-300 group overflow-hidden"
              style={{
                opacity: gridInView ? 1 : 0,
                transform: gridInView ? 'translateY(0)' : 'translateY(40px)',
                transitionDuration: '800ms',
                transitionDelay: gridInView ? `${idx * 150}ms` : '0ms',
              }}
            >
              <div>
                <div className="h-40 w-full rounded-xl overflow-hidden mb-4 relative">
                  <img 
                    src={srv.image} 
                    alt={srv.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 select-none"
                    draggable="false"
                  />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{srv.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4">{srv.desc}</p>
                <div className="flex flex-col gap-1.5 mb-6">
                  {srv.features.map((feat) => (
                    <span key={feat} className="text-[10px] sm:text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                      <span className="text-[#c3252e]">✓</span> {feat}
                    </span>
                  ))}
                </div>
              </div>
              <Link 
                to={srv.href} 
                className="w-full block py-2.5 rounded-lg bg-[#c3252e] hover:bg-[#c73652] transition-colors text-center text-xs font-bold uppercase tracking-wider text-white mt-auto"
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
              <span className="text-[#c3252e] text-xs font-bold uppercase tracking-widest block mb-2">Power & Safety</span>
              <h2 className="font-black text-2xl sm:text-4xl text-white">Residential Electrical Services</h2>
            </div>
            
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Our certified, licensed residential electricians ensure your home's power systems are robust, efficient, and fully ESA-compliant. From installing modern fixtures to executing complex service panel upgrades and electric vehicle chargers, we keep your home running safely.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex gap-3 text-sm text-gray-300">
                <span className="text-[#c3252e] text-lg font-bold">✓</span>
                <div>
                  <h4 className="text-white font-bold text-sm">Lighting Installation</h4>
                  <p className="text-gray-400 text-xs mt-0.5">Recessed LEDs, smart switches, landscape, and security lighting.</p>
                </div>
              </div>
              <div className="flex gap-3 text-sm text-gray-300">
                <span className="text-[#c3252e] text-lg font-bold">✓</span>
                <div>
                  <h4 className="text-white font-bold text-sm">Panel Upgrades</h4>
                  <p className="text-gray-400 text-xs mt-0.5">Service upgrades (100A to 200A+) to handle higher modern loads.</p>
                </div>
              </div>
              <div className="flex gap-3 text-sm text-gray-300">
                <span className="text-[#c3252e] text-lg font-bold">✓</span>
                <div>
                  <h4 className="text-white font-bold text-sm">EV Charger Installation</h4>
                  <p className="text-gray-400 text-xs mt-0.5">Level 2 electric vehicle home charging stations and outlets.</p>
                </div>
              </div>
              <div className="flex gap-3 text-sm text-gray-300">
                <span className="text-[#c3252e] text-lg font-bold">✓</span>
                <div>
                  <h4 className="text-white font-bold text-sm">Home Wiring & Setups</h4>
                  <p className="text-gray-400 text-xs mt-0.5">Basement renovations, rewiring, knob & tube removal, and safety checks.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Graphics column */}
          <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10 flex flex-col items-center justify-center gap-6 relative group overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-[#c3252e]/10 border border-[#c3252e]/20 flex items-center justify-center text-[#c3252e]">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-xl text-center">ESA Certified Installations</h3>
            <p className="text-gray-400 text-xs sm:text-sm text-center leading-relaxed">
              Every electrical modification we perform is certified by licensed electricians and fully compliant with the Electrical Safety Authority guidelines.
            </p>
            <div className="w-full h-1 rounded bg-[#c3252e]/20 mt-2" />
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
            <div className="w-16 h-16 rounded-2xl bg-[#8f8cff]/10 border border-[#8f8cff]/20 flex items-center justify-center text-[#8f8cff]">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-xl text-center">Pure Water & Piping Solutions</h3>
            <p className="text-gray-400 text-xs sm:text-sm text-center leading-relaxed">
              We lay plumbing loops, clean drains, and install heavy filtration networks to guarantee pure water flow and worry-free drainage in your household.
            </p>
            <div className="w-full h-1 rounded bg-[#8f8cff]/20 mt-2" />
          </div>

          {/* Details column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <span className="text-[#8f8cff] text-xs font-bold uppercase tracking-widest block mb-2">Water & Drainage</span>
              <h2 className="font-black text-2xl sm:text-4xl text-white">Residential Plumbing Services</h2>
            </div>
            
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              MetricAir provides top-tier residential plumbing layouts, fixtures, and maintenance. From fixing basic supply line leaks and mapping sump pumps to water softeners and tankless hot water heater installs, our plumbing division delivers professional results.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex gap-3 text-sm text-gray-300">
                <span className="text-[#8f8cff] text-lg font-bold">✓</span>
                <div>
                  <h4 className="text-white font-bold text-sm">Water Supply Lines</h4>
                  <p className="text-gray-400 text-xs mt-0.5">Copper, PEX piping, main shut-off valves, and distribution layouts.</p>
                </div>
              </div>
              <div className="flex gap-3 text-sm text-gray-300">
                <span className="text-[#8f8cff] text-lg font-bold">✓</span>
                <div>
                  <h4 className="text-white font-bold text-sm">Drainage Systems</h4>
                  <p className="text-gray-400 text-xs mt-0.5">Sewer backup valves, sump pumps, drain cleaning, and scoping.</p>
                </div>
              </div>
              <div className="flex gap-3 text-sm text-gray-300">
                <span className="text-[#8f8cff] text-lg font-bold">✓</span>
                <div>
                  <h4 className="text-white font-bold text-sm">Fixture Installation</h4>
                  <p className="text-gray-400 text-xs mt-0.5">Kitchen/bathroom sinks, high-efficiency toilets, showers, and faucets.</p>
                </div>
              </div>
              <div className="flex gap-3 text-sm text-gray-300">
                <span className="text-[#8f8cff] text-lg font-bold">✓</span>
                <div>
                  <h4 className="text-white font-bold text-sm">Water Heaters & Purification</h4>
                  <p className="text-gray-400 text-xs mt-0.5">Whole-house filters, softeners, tankless boilers, and rental hot water systems.</p>
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
            <span className="text-[#8f8cff] text-xs font-bold uppercase tracking-widest block mb-2">Free Canada-wide Estimation</span>
            <h2 className="font-black text-xl sm:text-3xl text-white">Request an In-Home Consultation</h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-2">Our specialists will evaluate your floorplan and provide a customized efficiency upgrade blueprint.</p>
          </div>

          <LeadForm 
            subject="Residential Consultation Request (HVAC/Elec/Plumb)" 
            fromName="MetricAir Residential Solutions" 
            buttonText="Request Quote" 
          />
        </div>
      </section>

    </div>
  );
}
