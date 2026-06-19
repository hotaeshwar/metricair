// src/components/FurnacesAcRental.jsx
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

const HIGHLIGHTS = [
  "Zero Diagnostic or Repair Fees for Life",
  "Free Professional Removal of Old Systems",
  "High-Efficiency Energy Star Rated Furnaces & A/C",
  "24/7 Priority Support and Repairs Across GTA",
  "Annual Free Maintenance and Tune-ups Included",
  "Affordable Monthly Rates with Zero Capital Outlay"
];

export default function FurnacesAcRental() {
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
          Whole-Home High-Efficiency Comfort
        </span>
        <h1 className="font-black leading-tight text-3xl sm:text-5xl lg:text-6xl mb-6">
          <span className="text-[#c3252e]">Furnaces and A/C</span>{' '}
          <span className="text-[#8f8cff]">Rental</span>{' '}
          <span className="text-white">Solutions</span>
        </h1>
        <div className="w-20 h-1 rounded-full bg-gradient-to-r from-[#c3252e] via-[#8f8cff] to-white mx-auto mb-6" />
        <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
          Rent whole-home mechanical heating and cooling equipment with zero upfront costs, zero maintenance fees, and complete coverage.
        </p>
      </section>

      {/* ── CONTENT GRID ── */}
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
              <div className="grid grid-cols-2 gap-2 p-2 bg-[#16213e]/40">
                <div className="relative h-44 sm:h-56 rounded-xl overflow-hidden">
                  <img
                    src="/images/furnance.jpg"
                    alt="High-Efficiency Gas Furnace Rental GTA"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 select-none"
                    draggable="false"
                  />
                </div>
                <div className="relative h-44 sm:h-56 rounded-xl overflow-hidden">
                  <img
                    src="/images/rentals.jpg"
                    alt="High-Efficiency Air Conditioner System Rental GTA"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 select-none"
                    draggable="false"
                  />
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <h2 className="text-white font-black text-xl sm:text-2xl mb-4">Complete Comfort Protection</h2>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  Avoid the high cost of furnace or central air conditioner purchase and repair. Our ultimate mechanical rental program gives you energy savings and absolute peace of mind. We cover diagnostic visits, parts replacements, safety tuneups, and priority calls. One low monthly rate keeps your home warm in winter and cool in summer.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {HIGHLIGHTS.map((feat, idx) => (
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
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider border-b border-white/10 pb-3">Apply For System Rental</h3>

            <LeadForm
              subject="Furnace & AC Rental Inquiry"
              fromName="MetricAir Rentals"
              buttonText="Submit Rental Application"
            />
          </div>

        </div>
      </section>

    </div>
  );
}
