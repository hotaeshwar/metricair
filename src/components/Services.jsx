// src/components/Services.jsx
import React, { useState, useEffect, useRef } from "react";
import LeadForm from "./LeadForm";
import ServicesOverview from "./ServicesOverview";

function useInView(threshold = 0.05) {
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

export default function Services() {
  const [heroRef, heroInView] = useInView(0.02);
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
          Complete Building Solutions
        </span>
        <h1 className="font-black leading-tight text-3xl sm:text-5xl lg:text-6xl mb-6">
          <span className="text-[#c3252e]">Our</span>{' '}
          <span className="text-[#8f8cff]">Core</span>{' '}
          <span className="text-white">Solutions</span>
        </h1>
        <div className="w-20 h-1 rounded-full bg-gradient-to-r from-[#c3252e] via-[#8f8cff] to-white mx-auto mb-6" />
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-gray-400 uppercase max-w-xl mx-auto mb-6">
          <span className="text-[#c3252e]">Residential</span>
          <span className="text-gray-600">|</span>
          <span className="text-[#8f8cff]">Commercial</span>
          <span className="text-gray-600">|</span>
          <span className="text-white">Industrial</span>
        </div>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
          We provide custom climate comfort solutions, commercial exhaust systems, and engineered permit drawings all over Canada. Explore our residential, commercial, and industrial expertise below.
        </p>
      </section>

      {/* ── UNIFIED SOLUTIONS GRID ── */}
      <ServicesOverview hideHeader={true} />

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
            <span className="text-[#8f8cff] text-xs font-bold uppercase tracking-widest block mb-2">Estimation Request</span>
            <h2 className="font-black text-xl sm:text-3xl text-white">Need HVAC Design or Engineering?</h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-2">Connect with our licensed P.Eng designers and field installers. We provide stamp approvals and installations all over Canada.</p>
          </div>

          <LeadForm 
            subject="MEP Services Request" 
            fromName="MetricAir Complete MEP Solutions" 
            buttonText="Request Consultation" 
          />
        </div>
      </section>

    </div>
  );
}
