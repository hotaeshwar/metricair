// src/components/ResidentialPlumbing.jsx
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
    title: "Water Supply Lines",
    desc: "Upgrade old piping to copper or clean PEX supply lines and pressure regulating systems to ensure steady, safe water flow.",
    image: "/images/res_plumbing.jpg",
    href: "/services/residential-water-supply",
    highlights: ["Copper to PEX upgrades", "Main shut-off valve setups", "Steady pressure regulation"]
  },
  {
    title: "Drainage Systems",
    desc: "Protect your basement from flooding and sewer backup with automatic sump pumps, ejector basins, and check valves.",
    image: "/images/res_drainage_ai.png",
    href: "/services/residential-drainage",
    highlights: ["Sump pump array setups", "Sewage ejector pump installs", "Backwater sewer valves"]
  },
  {
    title: "Fixture Installation",
    desc: "Upgrade your faucets, toilets, showers, and utility basins with high-efficiency modern fixtures installed by licensed plumbing professionals.",
    image: "/images/res_fixtures_ai.png",
    href: "/services/residential-fixtures",
    highlights: ["Kitchen & bathroom vanity taps", "Low-flush dual toilet setups", "Utility basin installations"]
  }
];

export default function ResidentialPlumbing() {
  const [heroRef, heroInView] = useInView(0.02);
  const [gridRef, gridInView] = useInView(0.05);
  const [formRef, formInView] = useInView(0.05);

  return (
    <div className="w-full bg-[#1a1a2e] text-white pt-24 pb-16 sm:pt-32 lg:pt-36 overflow-hidden">

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center transition-all duration-1000 ease-out"
        style={{
          opacity: heroInView ? 1 : 0,
          transform: heroInView ? 'translateY(0)' : 'translateY(30px)',
        }}
      >
        <div className="flex justify-center mb-6">
          <img src="/images/metric.png" alt="MetricAir Logo" className="w-48 sm:w-60 lg:w-72 object-contain" />
        </div>
        <span className="text-gray-400 text-xs font-bold uppercase tracking-widest block mb-4">
          Precision Piping, Drainage, & Filtration Systems
        </span>
        <h1 className="font-black leading-tight text-3xl sm:text-5xl lg:text-6xl mb-6">
          <span className="text-[#c3252e]">Residential</span>{' '}
          <span className="text-[#8f8cff]">Plumbing</span>{' '}
          <span className="text-white">Services</span>
        </h1>
        <div className="w-20 h-1 rounded-full bg-gradient-to-r from-[#c3252e] via-[#8f8cff] to-white mx-auto mb-6" />
        <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
          Ensure clean, steady water flow and worry-free drainage with our professional in-home plumbing, water treatment, and repiping layouts.
        </p>
      </section>

      {/* ── SUB SERVICES GRID ── */}
      <section ref={gridRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {SUB_SERVICES.map((srv, idx) => (
            <div
              key={srv.title}
              className="rounded-3xl bg-white/5 border border-white/10 hover:border-[#8f8cff]/40 hover:bg-white/[0.08] flex flex-col justify-between transition-all duration-300 group overflow-hidden"
              style={{
                opacity: gridInView ? 1 : 0,
                transform: gridInView ? 'translateY(0)' : 'translateY(40px)',
                transitionDuration: '800ms',
                transitionDelay: gridInView ? `${idx * 150}ms` : '0ms',
              }}
            >
              <div>
                {/* Image wrapper - no SVGs overlaid, full opacity image */}
                <div className="w-full aspect-[4/3] overflow-hidden relative">
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 select-none pointer-events-none"
                    draggable="false"
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="text-white font-black text-xl sm:text-2xl mb-3">{srv.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{srv.desc}</p>
                  <div className="grid grid-cols-1 gap-3">
                    {srv.highlights.map((feat) => (
                      <div key={feat} className="flex items-start gap-2 text-xs sm:text-sm text-gray-300 leading-snug">
                        <span className="text-[#8f8cff] font-bold">✓</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6 sm:px-8 sm:pb-8">
                <Link
                  to={srv.href}
                  className="w-full block py-3 rounded-xl bg-[#8f8cff] hover:bg-[#2563eb] transition-colors text-center text-xs sm:text-sm font-bold uppercase tracking-wider text-white"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
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
            <h2 className="font-black text-xl sm:text-3xl text-white">Request a Plumbing Consultation</h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-2">Our specialists will evaluate your home plumbing layout and provide a customized quote.</p>
          </div>

          <LeadForm
            subject="Residential Plumbing Consultation Request"
            fromName="MetricAir Residential Plumbing"
            buttonText="Request Quote"
          />
        </div>
      </section>

    </div>
  );
}
