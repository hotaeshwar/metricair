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
    image: "/images/furnance.jpg",
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
  }
];

export default function ResidentialSolutions() {
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
          <img src="/images/metric.png" alt="MetricAir Logo" className="w-48 sm:w-60 lg:w-72 object-contain" />
        </div>
        <span className="text-gray-400 text-xs font-bold uppercase tracking-widest block mb-4">
          Home Climate Engineering
        </span>
        <h1 className="font-black leading-tight text-3xl sm:text-5xl lg:text-6xl mb-6">
          <span className="text-[#e94560]">Residential</span>{' '}
          <span className="text-[#3b82f6]">HVAC</span>{' '}
          <span className="text-white">Solutions</span>
        </h1>
        <div className="w-20 h-1 rounded-full bg-gradient-to-r from-[#e94560] via-[#3b82f6] to-white mx-auto mb-6" />
        <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
          From compact townhouse heating upgrades to sprawling custom house central ventilation setups, we build home comfort systems designed to lower energy costs and maximize clean air circulation.
        </p>
      </section>

      {/* ── SUB-SERVICES GRID ── */}
      <section ref={gridRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div 
          className="text-center mb-12 sm:mb-16 transition-all duration-700 ease-out"
          style={{
            opacity: gridInView ? 1 : 0,
            transform: gridInView ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <span className="text-[#e94560] text-xs font-bold uppercase tracking-widest block mb-2">Our Offerings</span>
          <h2 className="font-black text-2xl sm:text-4xl text-white">Residential Services</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SUB_SERVICES.map((srv, idx) => (
            <div 
              key={srv.title} 
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#e94560]/40 hover:bg-white/[0.08] flex flex-col gap-4 transition-all duration-300 group overflow-hidden"
              style={{
                opacity: gridInView ? 1 : 0,
                transform: gridInView ? 'translateY(0)' : 'translateY(40px)',
                transitionDuration: '800ms',
                transitionDelay: gridInView ? `${idx * 150}ms` : '0ms',
              }}
            >
              <div className="h-48 w-full rounded-xl overflow-hidden mb-2 relative">
                <img 
                  src={srv.image} 
                  alt={srv.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 select-none"
                  draggable="false"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-white font-bold text-lg sm:text-xl mb-2">{srv.title}</h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4">{srv.desc}</p>
                  <div className="flex flex-col gap-1.5 mb-6">
                    {srv.features.map((feat) => (
                      <span key={feat} className="text-[10px] sm:text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                        <span className="text-[#e94560]">✓</span> {feat}
                      </span>
                    ))}
                  </div>
                </div>
                <Link 
                  to={srv.href} 
                  className="w-full block py-2.5 rounded-lg bg-[#e94560] hover:bg-[#c73652] transition-colors text-center text-xs font-bold uppercase tracking-wider text-white"
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
            <span className="text-[#3b82f6] text-xs font-bold uppercase tracking-widest block mb-2">Free GTA Estimation</span>
            <h2 className="font-black text-xl sm:text-3xl text-white">Request an In-Home Consultation</h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-2">Our specialists will evaluate your floorplan and provide a customized efficiency upgrade blueprint.</p>
          </div>

          <LeadForm 
            subject="Residential HVAC Consultation Request" 
            fromName="MetricAir Residential Solutions" 
            buttonText="Request Quote" 
          />
        </div>
      </section>

    </div>
  );
}
