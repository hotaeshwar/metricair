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
    image: "/images/water_ro_filtration_ai.png",
    features: ["5-Stage micron filtration", "Alkaline mineral reintroduction", "Dedicated lead-free faucet", "Compact space-saving tank"]
  },
  {
    title: "Whole-Home Water Softeners",
    desc: "Banish hard minerals (calcium and magnesium) to protect your home's piping, extend the lifespan of appliances, and improve skin and hair hydration.",
    image: "/images/water_softener_system_ai.png",
    features: ["Smart metered regeneration", "High-capacity resin tanks", "Energy-saving digital control", "Brine tank safety overflow valve"]
  },
  {
    title: "UV Sterilization Systems",
    desc: "Chemical-free ultraviolet disinfection that neutralizes 99.9% of bacteria, viruses, and pathogens, ensuring perfectly safe well and municipal water runs.",
    image: "/images/res_ro_uv_ai.png",
    features: ["High-output UV-C lamps", "Audible replacement alarms", "Stainless steel chambers", "Zero chemical taste or odor"]
  },
  {
    title: "Commercial Water Softening",
    desc: "Heavy-duty commercial scale softeners for restaurants, laundromats, and buildings, minimizing scale buildup on expensive glasswashers and boilers.",
    image: "/images/water_commercial_softener_ai.png",
    features: ["Dual-tank continuous soft water", "Corrosion-resistant distributors", "High salt capacity hoppers", "Custom flow rate engineering"]
  }
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
      <section ref={gridRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
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
                  <div className="grid grid-cols-1 gap-2.5">
                    {srv.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2 text-xs sm:text-sm text-gray-300 leading-snug">
                        <span className="text-[#c3252e] font-bold">✓</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONSULTATION & SCHEDULING FORM ── */}
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
            <span className="text-[#8f8cff] text-xs font-bold uppercase tracking-widest block mb-2">Free Water Testing All Over Canada</span>
            <h2 className="font-black text-xl sm:text-3xl text-white">Book an Analysis Consultation</h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-2">Speak to a conditioning specialist and choose the right filtration setup for your property.</p>
          </div>

          <LeadForm 
            subject="Water Purification Inquiry" 
            fromName="MetricAir Water Systems" 
            buttonText="Request Consultation" 
          />
        </div>
      </section>

    </div>
  );
}
