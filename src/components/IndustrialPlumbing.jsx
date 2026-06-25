// src/components/IndustrialPlumbing.jsx
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
    title: "Industrial Water & Drainage",
    desc: "Run heavy water manifolds, layout large factory supply loops, and build corrosive waste drainage loops safely.",
    image: "/images/ind_water_drainage_ai.png",
    href: "/services/industrial-plumbing-water",
    highlights: ["Industrial water supply manifolds", "Process cooling piping loops", "Corrosive wastewater drains"]
  },
  {
    title: "Compressed Air Systems",
    desc: "Design and layout aluminum or copper compressed air lines, air dryer blocks, manifolds, and receiver vessels for factories.",
    image: "/images/ind_compressed_air_ai.png",
    href: "/services/industrial-plumbing-air",
    highlights: ["Leak-free aluminum air piping", "Refrigerated compressed air dryers", "Multi-drop manifold loops"]
  },
  {
    title: "Boiler Systems & Hydronic",
    desc: "Lay hydronic boiler pipelines, Primary/Secondary manifolds, and steam pumps for factory manufacturing heating loops.",
    image: "/images/ind_boilers_ai.png",
    href: "/services/industrial-plumbing-boilers",
    highlights: ["High-pressure steam piping", "Primary/secondary boiler loops", "Centrifugal circulation pumps"]
  },
  {
    title: "Industrial Pump Systems",
    desc: "Configure process fluid pumping stations, install heavy centrifugal booster pumps, sewage ejector wells, and expansion tanks.",
    image: "/images/ind_pump_sys_ai.png",
    href: "/services/industrial-plumbing-pumps",
    highlights: ["High-horsepower utility pumps", "Process cooling loop chillers", "Dual alternating pump controls"]
  }
];

export default function IndustrialPlumbing() {
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
          Process Fluid Supply & Compressed Air Networks
        </span>
        <h1 className="font-black leading-tight text-3xl sm:text-5xl lg:text-6xl mb-6">
          <span className="text-white">Industrial</span>{' '}
          <span className="text-[#c3252e]">Plumbing</span>{' '}
          <span className="text-[#8f8cff]">Services</span>
        </h1>
        <div className="w-20 h-1 rounded-full bg-gradient-to-r from-[#c3252e] via-[#8f8cff] to-white mx-auto mb-6" />
        <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
          Scale your fluid loops, lay compressed air grids, install cooling loop controls, and construct heavy hydronic boiler pipelines with our pipefitters.
        </p>
      </section>

      {/* ── SUB SERVICES GRID ── */}
      <section ref={gridRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
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
                  <div className="grid grid-cols-1 gap-2.5">
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
            <span className="text-[#8f8cff] text-xs font-bold uppercase tracking-widest block mb-2">Industrial Proposals</span>
            <h2 className="font-black text-xl sm:text-3xl text-white">Request an Industrial Plumbing Proposal</h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-2">Get precise sizing estimates and a comprehensive proposal custom-tailored to your building blueprints.</p>
          </div>

          <LeadForm
            subject="Industrial Plumbing Proposal Request"
            fromName="MetricAir Industrial Plumbing"
            buttonText="Request Consultation"
          />
        </div>
      </section>

    </div>
  );
}
