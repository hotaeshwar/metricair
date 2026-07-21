// src/components/CommercialElectrical.jsx
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
    title: "New Construction Electrical",
    desc: "Comprehensive electrical design and installation for new commercial complexes, custom tenant rough-ins, and main switchgear grids.",
    image: "/images/com_new_elec_ai.png",
    href: "/services/commercial-new-construction",
    highlights: ["CEC rough-ins & conduits", "High-voltage switchgears", "Power distribution grids"]
  },
  {
    title: "Panel Relocation",
    desc: "Relocating heavy commercial subpanels, extending high-voltage feeders, and re-routing circuit breakers cleanly during renovations.",
    image: "/images/com_panel_reloc_ai.png",
    href: "/services/commercial-panel-relocation",
    highlights: ["Feeder extensions", "Subpanel moves & re-balancing", "ESA inspection clearances"]
  },
  {
    title: "Power Upgrades",
    desc: "Increase your commercial service capacity (e.g. from 200A to 400A or 600A+) to support heavy kitchen appliances, cooling compressors, and motors.",
    image: "/images/com_power_upgr_ai.png",
    href: "/services/commercial-power-upgrades",
    highlights: ["Three-phase service setup", "High capacity meter sockets", "Oversized utility transformers"]
  },
  {
    title: "LED Lighting Upgrades",
    desc: "Reduce operational energy costs and improve brightness with flat panels, high-bays, and daylight harvesting configurations.",
    image: "/images/com_led_light_ai.png",
    href: "/services/commercial-led-lighting",
    highlights: ["Office LED lay-in panels", "Showroom display lights", "Energy savings rebate setups"]
  },
  {
    title: "Equipment Power Supply",
    desc: "Dedicated line installations and safety disconnect switchbox wiring for commercial ovens, industrial compressors, RTUs, and motors.",
    image: "/images/com_equip_power_ai.png",
    href: "/services/commercial-equipment-power",
    highlights: ["Dedicated appliance lines", "High-amp NEMA outlets", "Local fused safety disconnects"]
  },
  {
    title: "General Power Services",
    desc: "Ensure full compliance and eliminate system hazards inside your store or office space with our maintenance programs.",
    image: "/images/com_general_power_ai.png",
    href: "/services/commercial-general-power",
    highlights: ["CEC code safety audits", "Subpanel load balancing", "Commercial circuit diagnostics"]
  }
];

export default function CommercialElectrical() {
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
        <span className="text-gray-400 text-xs font-bold uppercase tracking-widest block mb-4">
          High-Capacity Power Distribution & Tenant Fit-Outs
        </span>
        <h1 id="metric-comm-electrical-heading" className="font-black leading-tight text-3xl sm:text-5xl lg:text-6xl mb-6">
          <span className="text-[#8f8cff]">Commercial</span>{' '}
          <span className="text-[#c3252e]">Electrical</span>{' '}
          <span className="text-white">Services</span>
        </h1>
        <div className="w-20 h-1 rounded-full bg-gradient-to-r from-[#c3252e] via-[#8f8cff] to-white mx-auto mb-6" />
        <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
          Scale your enterprise power capacity safely. We draft commercial layouts, install subpanels, run heavy appliance lines, and carry out full code certifications.
        </p>
      </section>

      {/* ── SUB SERVICES GRID ── */}
      <section ref={gridRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
            <span className="text-[#8f8cff] text-xs font-bold uppercase tracking-widest block mb-2">Commercial Proposals</span>
            <h2 className="font-black text-xl sm:text-3xl text-white">Request a Commercial Proposal</h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-2">Get precise sizing estimates and a comprehensive proposal custom-tailored to your building blueprints.</p>
          </div>

          <LeadForm
            subject="Commercial Electrical Proposal Request"
            fromName="MetricAir Commercial Electrical"
            buttonText="Request Consultation"
          />
        </div>
      </section>

    </div>
  );
}
