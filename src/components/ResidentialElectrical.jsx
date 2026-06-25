// src/components/ResidentialElectrical.jsx
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
    title: "Lighting Installation",
    desc: "Transform your home with custom-engineered indoor, outdoor, and smart architectural lighting layouts designed for energy efficiency and visual beauty.",
    image: "/images/res_lighting.jpg",
    href: "/services/residential-lighting",
    highlights: ["Smart switch integration", "Energy-efficient recessed LEDs", "Landscape accent layouts"]
  },
  {
    title: "Panel Upgrades",
    desc: "Safely increase your electrical service capacity to 200A or 400A to run high-load cooling compressors, EV chargers, and new appliances.",
    image: "/images/res_panel.jpg",
    href: "/services/residential-panel",
    highlights: ["100A to 200A+ upgrades", "New breaker installations", "ESA permit and certificate compliance"]
  },
  {
    title: "EV Charger Installation",
    desc: "Professional in-home setup of Level 2 high-amp electric vehicle charging stations and dedicated outlets.",
    image: "/images/res_ev_charger.jpg",
    href: "/services/residential-ev-charger",
    highlights: ["Tesla & universal compatibility", "Weatherproof garage installations", "Dedicated subpanel configurations"]
  },
  {
    title: "Home Wiring / Setup",
    desc: "Complete rough-in copper wiring for basement suites, room additions, safety diagnostics, and knob & tube removals.",
    image: "/images/res_wiring.jpg",
    href: "/services/residential-wiring",
    highlights: ["Renovation & new build wiring", "CEC code safety audits", "Aluminum wiring replacements"]
  }
];

export default function ResidentialElectrical() {
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
          Licensed & ESA Certified Home Power Solutions
        </span>
        <h1 className="font-black leading-tight text-3xl sm:text-5xl lg:text-6xl mb-6">
          <span className="text-[#c3252e]">Residential</span>{' '}
          <span className="text-[#8f8cff]">Electrical</span>{' '}
          <span className="text-white">Services</span>
        </h1>
        <div className="w-20 h-1 rounded-full bg-gradient-to-r from-[#c3252e] via-[#8f8cff] to-white mx-auto mb-6" />
        <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
          Ensure safety, occupant comfort, and full Electrical Safety Authority (ESA) compliance with professional home wiring, panels, and charging solutions.
        </p>
      </section>

      {/* ── SUB SERVICES GRID ── */}
      <section ref={gridRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {SUB_SERVICES.map((srv, idx) => (
            <div
              key={srv.title}
              className="rounded-3xl bg-white/5 border border-white/10 hover:border-[#c3252e]/40 hover:bg-white/[0.08] flex flex-col justify-between transition-all duration-300 group overflow-hidden"
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {srv.highlights.map((feat) => (
                      <div key={feat} className="flex items-start gap-2 text-xs sm:text-sm text-gray-300 leading-snug">
                        <span className="text-[#c3252e] font-bold">✓</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6 sm:px-8 sm:pb-8">
                <Link
                  to={srv.href}
                  className="w-full block py-3 rounded-xl bg-[#c3252e] hover:bg-[#c73652] transition-colors text-center text-xs sm:text-sm font-bold uppercase tracking-wider text-white"
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
            <h2 className="font-black text-xl sm:text-3xl text-white">Request an Electrical Consultation</h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-2">Our specialists will evaluate your home electrical layout and provide a customized quote.</p>
          </div>

          <LeadForm
            subject="Residential Electrical Consultation Request"
            fromName="MetricAir Residential Electrical"
            buttonText="Request Quote"
          />
        </div>
      </section>

    </div>
  );
}
