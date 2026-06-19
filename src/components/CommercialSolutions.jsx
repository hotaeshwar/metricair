// src/components/CommercialSolutions.jsx
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
    title: "Restaurants & Commercial Kitchens",
    desc: "Complete mechanical kitchen exhaust ventilation setups, NFPA-compliant grease hood installations, variable frequency drive makeup air configurations, and stamped approval permit packages.",
    href: "/commercial-solutions/restaurants",
    image: "/images/commercial.jpg",
    features: ["Grease hoods & exhaust lines", "Makeup air unit integration", "Complete design-build permit packages"]
  },
  {
    title: "Office & Retail Spaces",
    desc: "Energy-efficient commercial rooftop HVAC units (RTU), multi-split climate systems, multi-zone smart dampers, and continuous commercial ventilation to ensure compliance with local building standards.",
    href: "/commercial-solutions/office-retail",
    image: "/images/ahu.jpg",
    features: ["Rooftop HVAC units (RTU)", "Multi-zone smart dampers", "Acoustic ductwork fabrication"]
  }
];

export default function CommercialSolutions() {
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
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col gap-4">
            <div className="flex justify-center lg:justify-start mb-2">
              <img src="/images/metric.png" alt="MetricAir Logo" className="w-48 sm:w-60 lg:w-72 object-contain" />
            </div>
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest block mb-4">
              Enterprise Climate Engineering
            </span>
            <h1 className="font-black leading-tight text-3xl sm:text-5xl lg:text-6xl mb-6">
              <span className="text-[#8f8cff]">Commercial</span>{' '}
              <span className="text-[#c3252e]">HVAC</span>{' '}
              <span className="text-white">Solutions</span>
            </h1>
            <div className="w-20 h-1 rounded-full bg-gradient-to-r from-[#c3252e] via-[#8f8cff] to-white mx-auto lg:mx-0 mb-6" />
            <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Ensure safety, occupant comfort, and local municipal compliance with MetricAir's commercial climate setups. We provide engineered designs, stamps, and high-performance equipment for hospitality, corporate offices, and retail units.
            </p>
          </div>

          {/* Right image block */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 aspect-[4/3] group"
            style={{ opacity: heroInView ? 1 : 0, transform: heroInView ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s' }}
          >
            <img
              src="/images/office.jpg"
              alt="Commercial HVAC Ventilation and Climate System Installation"
              className="w-full h-full object-cover"
              draggable="false"
            />
          </div>
        </div>
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
          <span className="text-[#c3252e] text-xs font-bold uppercase tracking-widest block mb-2">Our Capabilities</span>
          <h2 className="font-black text-2xl sm:text-4xl text-white">Commercial Services</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {SUB_SERVICES.map((srv, idx) => (
            <div
              key={srv.title}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#8f8cff]/40 hover:bg-white/[0.08] flex flex-col gap-4 transition-all duration-300 group overflow-hidden"
              style={{
                opacity: gridInView ? 1 : 0,
                transform: gridInView ? 'translateY(0)' : 'translateY(40px)',
                transitionDuration: '800ms',
                transitionDelay: gridInView ? `${idx * 150}ms` : '0ms',
              }}
            >
              <div className="h-56 w-full rounded-xl overflow-hidden mb-2 relative">
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
                        <span className="text-[#8f8cff]">✓</span> {feat}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  to={srv.href}
                  className="w-full block py-2.5 rounded-lg bg-[#8f8cff] hover:bg-[#2563eb] transition-colors text-center text-xs font-bold uppercase tracking-wider text-white"
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
            <span className="text-[#8f8cff] text-xs font-bold uppercase tracking-widest block mb-2">Commercial Proposals</span>
            <h2 className="font-black text-xl sm:text-3xl text-white">Speak to a Commercial Specialist</h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-2">Get precise sizing estimates and a comprehensive proposal custom-tailored to your building blueprints.</p>
          </div>

          <LeadForm
            subject="Commercial HVAC Consultation Request"
            fromName="MetricAir Commercial Solutions"
            buttonText="Request Quote"
          />
        </div>
      </section>

    </div>
  );
}
