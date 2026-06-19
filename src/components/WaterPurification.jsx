// src/components/WaterPurification.jsx
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

const SYSTEMS = [
  {
    title: "Reverse Osmosis (RO) Filtration",
    desc: "Multi-stage under-sink purification that filters out lead, chlorine, heavy metals, fluoride, and bacteria to deliver clean, crisp alkaline drinking water.",
    features: ["5-Stage micron filtration", "Alkaline mineral reintroduction", "Dedicated lead-free faucet", "Compact space-saving tank"],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: "Whole-Home Water Softeners",
    desc: "Banish hard minerals (calcium and magnesium) to protect your home's piping, extend the lifespan of appliances, and improve skin and hair hydration.",
    features: ["Smart metered regeneration", "High-capacity resin tanks", "Energy-saving digital control", "Brine tank safety overflow valve"],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
  },
  {
    title: "UV Sterilization Systems",
    desc: "Chemical-free ultraviolet disinfection that neutralizes 99.9% of bacteria, viruses, and pathogens, ensuring perfectly safe well and municipal water runs.",
    features: ["High-output UV-C lamps", "Audible replacement alarms", "Stainless steel chambers", "Zero chemical taste or odor"],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "Commercial Water Softening",
    desc: "Heavy-duty commercial scale softeners for restaurants, laundromats, and buildings, minimizing scale buildup on expensive glasswashers and boilers.",
    features: ["Dual-tank continuous soft water", "Corrosion-resistant distributors", "High salt capacity hoppers", "Custom flow rate engineering"],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
];

export default function WaterPurification() {
  const [heroRef, heroInView] = useInView(0.02);
  const [gridRef, gridInView] = useInView(0.05);
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
        {/* Responsive Logo Container */}
        <div className="flex justify-center mb-6">
          <img 
            src="/images/metric.png" 
            alt="MetricAir Logo" 
            className="w-48 sm:w-60 lg:w-72 object-contain"
          />
        </div>

        <span className="text-gray-400 text-xs font-bold uppercase tracking-widest block mb-4">
          Whole-House Water Conditioning & Softening
        </span>

        {/* Heading styled with RED followed by BLUE and WHITE */}
        <h1 className="font-black leading-tight text-3xl sm:text-5xl lg:text-6xl mb-6">
          <span className="text-[#c3252e]">Water Purification</span>{' '}
          <span className="text-[#8f8cff]">Softening</span>{' '}
          <span className="text-white">Systems</span>
        </h1>

        <div className="w-20 h-1 rounded-full bg-gradient-to-r from-[#c3252e] via-[#8f8cff] to-white mx-auto mb-6" />

        <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
          Protect your piping, extend appliance life, and enjoy cleaner, purer drinking water with our heavy-duty softening and multi-stage filtration packages.
        </p>
      </section>

      {/* ── SYSTEMS/SERVICES GRID ── */}
      <section ref={gridRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div 
          className="text-center mb-12 sm:mb-16 transition-all duration-700 ease-out"
          style={{
            opacity: gridInView ? 1 : 0,
            transform: gridInView ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <span className="text-[#c3252e] text-xs font-bold uppercase tracking-widest block mb-2">Our Capabilities</span>
          <h2 className="font-black text-2xl sm:text-4xl text-white">Water Solutions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {SYSTEMS.map((srv, idx) => (
            <div 
              key={srv.title} 
              className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#c3252e]/40 hover:bg-white/[0.08] flex flex-col gap-4 sm:gap-6 transition-all ease-out"
              style={{
                opacity: gridInView ? 1 : 0,
                transform: gridInView ? 'translateY(0)' : 'translateY(40px)',
                transitionDuration: '800ms',
                transitionDelay: gridInView ? `${idx * 150}ms` : '0ms',
              }}
            >
              <div className="w-12 h-12 rounded-xl bg-[#c3252e]/10 border border-[#c3252e]/20 flex items-center justify-center text-[#c3252e]">
                {srv.icon}
              </div>
              <div>
                <h3 className="text-white font-bold text-lg sm:text-xl mb-2">{srv.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4">{srv.desc}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {srv.features.map((feat) => (
                    <span key={feat} className="text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                      ✓ {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONSULTATION & SCHEDULING FORM ── */}
      <section 
        ref={formRef}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out"
        style={{
          opacity: formInView ? 1 : 0,
          transform: formInView ? 'translateY(0)' : 'translateY(40px)',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white/5 border border-white/10 rounded-3xl overflow-hidden p-6 sm:p-10 lg:p-12">
          {/* Image Pane */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full rounded-2xl overflow-hidden group">
              <img 
                src="/images/purification.jpg" 
                alt="Pristine Water Purification and Softening Filter Installation" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 select-none"
                draggable="false"
              />
              <div className="absolute bottom-6 left-6 right-6 text-white z-10">
              <span className="text-[#c3252e] text-xs font-bold uppercase tracking-widest mb-1 block">Pure Protection</span>
              <p className="font-bold text-lg leading-snug">Ensure clean, chemical-free water for your entire family.</p>
            </div>
          </div>

          {/* Form Pane */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="text-center lg:text-left mb-8">
              <span className="text-[#8f8cff] text-xs font-bold uppercase tracking-widest block mb-2">Free GTA Water Testing</span>
              <h2 className="font-black text-xl sm:text-3xl text-white">Book an Analysis Consultation</h2>
              <p className="text-gray-400 text-xs sm:text-sm mt-2">Speak to a conditioning specialist and choose the right filtration setup for your property.</p>
            </div>

            <LeadForm 
              subject="Water Purification Inquiry" 
              fromName="MetricAir Water Systems" 
              buttonText="Request Consultation" 
            />
          </div>
        </div>
      </section>

    </div>
  );
}
