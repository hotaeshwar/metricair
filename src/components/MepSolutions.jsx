// src/components/MepSolutions.jsx
import React, { useState, useEffect, useRef } from 'react';
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

const MEP_SECTIONS = [
  {
    title: "Mechanical (HVAC & Ventilation)",
    desc: "Comprehensive thermal design, high-velocity exhaust ventilation, rooftop units (RTU), duct fabrications, and energy management system configurations for residential, commercial, and industrial structures.",
    features: [
      "Heating & Cooling (A/C) installations",
      "Fresh Air & Makeup Air (MUA) setups",
      "Industrial Dust & Fume Extraction",
      "Gas Piping & Radiant Heating Systems"
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Electrical Services",
    desc: "From major service upgrades to bespoke custom control wiring, we deliver robust, safe, and fully ESA-compliant power distribution layouts for high-demand equipment, backup power configurations, and EV chargers.",
    features: [
      "Panel Upgrades & Service Relocations",
      "EV Charger & Smart Lighting Layouts",
      "Industrial Power Distribution & Wiring",
      "Automation & Generator Backup Systems"
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Plumbing & Piping",
    desc: "Precision plumbing, industrial fluid supply distribution, compressed air infrastructure, and hydronic boiler loops. We layout complete water and drainage lines tailored for commercial scale use.",
    features: [
      "Water Supply & Drainage Piping Layouts",
      "Boilers & Hydronic Space Heating Loops",
      "Compressed Air & Gas Piping Installations",
      "Commercial Pump Systems & Water Heaters"
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
];

export default function MepSolutions() {
  const [heroRef, heroInView] = useInView(0.02);
  const [gridRef, gridInView] = useInView(0.05);
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
          <div className="lg:col-span-6 text-center lg:text-left flex flex-col gap-4">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest block">
              Unified Engineering Solutions
            </span>

            <h1 id="metric-mep-solutions-heading" className="font-black leading-tight text-3xl sm:text-5xl lg:text-6xl">
              <span className="text-[#8f8cff]">Complete</span>{' '}
              <span className="text-[#c3252e]">MEP</span>{' '}
              <span className="text-white">Solutions</span>
            </h1>

            <div className="w-14 h-1 rounded-full bg-gradient-to-r from-[#c3252e] via-[#8f8cff] to-white mb-2 mx-auto lg:mx-0" />

            <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              MetricAir integrates Mechanical, Electrical, and Plumbing engineering services into a unified delivery model. We handle compliance drawings, physical installation, and ongoing maintenance for residential, commercial, and industrial facilities.
            </p>
          </div>

          {/* Right image block replaced with premium SVG and dynamic AI background */}
          <div className="lg:col-span-6 w-full relative rounded-3xl overflow-hidden border border-white/10 bg-[#0f0f1a]/50 group aspect-[16/9]"
            style={{ opacity: heroInView ? 1 : 0, transform: heroInView ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s' }}
          >
            <img 
              src="/images/mep_solutions_ai.png"
              alt="Complete MEP Solutions Infographic"
              className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-700 select-none pointer-events-none"
              draggable="false"
            />
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section ref={gridRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div
          className="text-center mb-12 sm:mb-16 transition-all duration-700 ease-out"
          style={{
            opacity: gridInView ? 1 : 0,
            transform: gridInView ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <span className="text-[#c3252e] text-xs font-bold uppercase tracking-widest block mb-2">Our Capabilities</span>
          <h2 className="font-black text-2xl sm:text-4xl text-white">Full MEP Service Suite</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {MEP_SECTIONS.map((sec, idx) => (
            <div
              key={sec.title}
              className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#c3252e]/40 hover:bg-white/[0.08] flex flex-col gap-4 sm:gap-6 transition-all ease-out"
              style={{
                opacity: gridInView ? 1 : 0,
                transform: gridInView ? 'translateY(0)' : 'translateY(40px)',
                transitionDuration: '800ms',
                transitionDelay: gridInView ? `${idx * 150}ms` : '0ms',
              }}
            >
              <div className="w-12 h-12 rounded-xl bg-[#c3252e]/10 border border-[#c3252e]/20 flex items-center justify-center text-[#c3252e]">
                {sec.icon}
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-white font-bold text-lg sm:text-xl mb-2">{sec.title}</h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4">{sec.desc}</p>
                </div>
                <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                  {sec.features.map((feat) => (
                    <span key={feat} className="text-[11px] sm:text-xs font-semibold text-gray-300 flex items-center gap-2">
                      <span className="text-[#c3252e] font-bold">✓</span> {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT & CONSULTATION FORM ── */}
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
            <span className="text-[#8f8cff] text-xs font-bold uppercase tracking-widest block mb-2">MEP Project Design</span>
            <h2 className="font-black text-xl sm:text-3xl text-white">Speak to an MEP Specialist</h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-2">Submit your plans or requirements for an integrated, ESA/TSSA compliant engineering quote.</p>
          </div>

          <LeadForm
            subject="MEP solutions Inquiry"
            fromName="MetricAir MEP Solutions"
            buttonText="Request Consultation"
          />
        </div>
      </section>

    </div>
  );
}
