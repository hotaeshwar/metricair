// src/components/DrawingsPermits.jsx
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

const FEATURES = [
  "Manual J Residential Load Calculations",
  "Manual S Equipment Selection Matching",
  "Detailed HVAC Duct Layout Drawings",
  "HRAI Certified Heat Loss & Gain Reports",
  "Stamped Engineering Drawings",
  "Municipal Permit Submissions & Approvals"
];

export default function DrawingsPermits() {
  const [heroRef, heroInView] = useInView(0.02);
  const [gridRef, gridInView] = useInView(0.05);

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
          Municipal Building Compliance
        </span>
        <h1 className="font-black leading-tight text-3xl sm:text-5xl lg:text-6xl mb-6">
          <span className="text-[#c3252e]">Drawings &</span>{' '}
          <span className="text-[#8f8cff]">HVAC</span>{' '}
          <span className="text-white">Permits</span>
        </h1>
        <div className="w-20 h-1 rounded-full bg-gradient-to-r from-[#c3252e] via-[#8f8cff] to-white mx-auto mb-6" />
        <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
          Obtain clean HVAC permit drawings stamped by certified designers to ensure complete structural compliance with the Ontario Building Code.
        </p>
      </section>

      {/* ── DETAILS & FORM GRID ── */}
      <section ref={gridRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Details column */}
          <div 
            className="lg:col-span-6 flex flex-col gap-6 transition-all duration-800 ease-out"
            style={{
              opacity: gridInView ? 1 : 0,
              transform: gridInView ? 'translateY(0)' : 'translateY(40px)',
            }}
          >
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden group">
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#0f0f1a]/50">
                <img 
                  src="/images/drawings_permits_ai.png"
                  alt="Stamped HVAC Permit Drawings"
                  className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-700 select-none pointer-events-none"
                  draggable="false"
                />
              </div>
              <div className="p-6 sm:p-8">
                <h2 className="text-white font-black text-xl sm:text-2xl mb-4">Why Professional Drawings Matter</h2>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  Municipal inspectors require complete mechanical designs, Manual J heat load calculations, and duct design parameters before granting residential or commercial building permits. Our team produces stamped layouts that pass code review fast.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {FEATURES.map((feat, idx) => (
                    <div 
                      key={feat} 
                      className="flex items-start gap-2.5 text-xs text-gray-300 leading-snug transition-all duration-500 ease-out"
                      style={{
                        opacity: gridInView ? 1 : 0,
                        transform: gridInView ? 'translateY(0)' : 'translateY(15px)',
                        transitionDelay: gridInView ? `${idx * 100}ms` : '0ms'
                      }}
                    >
                      <span className="text-[#c3252e] font-bold mt-0.5">✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form column */}
          <div 
            className="lg:col-span-6 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 transition-all duration-800 ease-out"
            style={{
              opacity: gridInView ? 1 : 0,
              transform: gridInView ? 'translateY(0)' : 'translateY(40px)',
              transitionDelay: gridInView ? '150ms' : '0ms',
            }}
          >
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider border-b border-white/10 pb-3">Request Stamped Plans</h3>
            
            <LeadForm 
              subject="Permit Drawing Request" 
              fromName="MetricAir Permits" 
              buttonText="Submit Permit Request" 
            />
          </div>

        </div>
      </section>

    </div>
  );
}
