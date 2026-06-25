// src/components/LightIndustrial.jsx
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

const SERVICES = [
  {
    title: "Industrial Exhaust Systems",
    desc: "Heavy-duty ventilation setups, hoods, and high-velocity ducting designed to capture fumes, mist, and particulate matter at the source.",
    features: ["Type I & II hoods", "NFPA-compliant grease ducts", "Corrosive fume handling", "Variable frequency drives"],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "HVLS Destratification Fans",
    desc: "High-Volume Low-Speed fans that circulate massive columns of air, balancing temperatures between the ceiling and floor to reduce heating costs.",
    features: ["Up to 24ft diameter fans", "Reverse-flow cooling options", "Smart control panels", "Integration with BAS"],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Radiant Tube Heating",
    desc: "Energy-efficient gas-fired infra-red heaters that heat objects and people directly, providing immediate warmth in large open buildings.",
    features: ["Single-stage & two-stage burners", "Linear or U-tube designs", "Reflector shields", "Zoned thermostat systems"],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
      </svg>
    ),
  },
  {
    title: "Combustible Dust Compliance",
    desc: "Specialized exhaust and dust collection systems designed and installed in compliance with NFPA standards to prevent combustible hazards.",
    features: ["Explosion-proof motors", "Static-conductive ducting", "NFPA 652 assessments", "Custom collector fabrications"],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
];

export default function LightIndustrial() {
  const [heroRef, heroInView] = useInView(0.02);
  const [gridRef, gridInView] = useInView(0.05);
  const [elecRef, elecInView] = useInView(0.05);
  const [plumbRef, plumbInView] = useInView(0.05);
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
        <div className="w-full relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 group"
          style={{ opacity: heroInView ? 1 : 0, transform: heroInView ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s' }}
        >
          <img
            src="/images/combo.png"
            alt="Light Industrial HVAC Ventilation and Climate System Installation"
            className="w-full h-auto object-contain block"
            draggable="false"
          />
        </div>
      </section>

      {/* ── HVAC SOLUTIONS SECTION ── */}
      <section id="hvac" ref={gridRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 sm:mb-32">
        <div
          className="text-center mb-12 sm:mb-16 transition-all duration-700 ease-out"
          style={{
            opacity: gridInView ? 1 : 0,
            transform: gridInView ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <span className="text-[#c3252e] text-xs font-bold uppercase tracking-widest block mb-2">Our Capabilities</span>
          <h2 className="font-black text-2xl sm:text-4xl text-white">Industrial HVAC Systems</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {SERVICES.map((srv, idx) => (
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

      {/* ── ELECTRICAL SERVICES SECTION ── */}
      <section id="electrical" ref={elecRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 sm:mb-32">
        <div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center transition-all duration-1000 ease-out"
          style={{
            opacity: elecInView ? 1 : 0,
            transform: elecInView ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          {/* Details column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <span className="text-[#c3252e] text-xs font-bold uppercase tracking-widest block mb-2">High Voltage & Control Loops</span>
              <h2 className="font-black text-2xl sm:text-4xl text-white">Industrial Electrical Services</h2>
            </div>
            
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              We design and coordinate full industrial electrical systems, layout power distribution grids, configure automated process control panels, and hook up backup generators. All installations are certified by licensed professionals and comply with local safety rules.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex gap-3 text-sm text-gray-300">
                <span className="text-[#c3252e] text-lg font-bold">✓</span>
                <div>
                  <h4 className="text-white font-bold text-sm">Power Distribution Systems</h4>
                  <p className="text-gray-400 text-xs mt-0.5">Heavy industrial service panels, switchgears, sub-stations, and transformers.</p>
                </div>
              </div>
              <div className="flex gap-3 text-sm text-gray-300">
                <span className="text-[#c3252e] text-lg font-bold">✓</span>
                <div>
                  <h4 className="text-white font-bold text-sm">Industrial Equipment Wiring</h4>
                  <p className="text-gray-400 text-xs mt-0.5">Power connections for heavy blowers, dust collectors, pumps, and processors.</p>
                </div>
              </div>
              <div className="flex gap-3 text-sm text-gray-300">
                <span className="text-[#c3252e] text-lg font-bold">✓</span>
                <div>
                  <h4 className="text-white font-bold text-sm">Automation & Control Systems</h4>
                  <p className="text-gray-400 text-xs mt-0.5">Variable frequency drive (VFD) panels, PLC controllers, and sensor loops.</p>
                </div>
              </div>
              <div className="flex gap-3 text-sm text-gray-300">
                <span className="text-[#c3252e] text-lg font-bold">✓</span>
                <div>
                  <h4 className="text-white font-bold text-sm">Backup Power Systems</h4>
                  <p className="text-gray-400 text-xs mt-0.5">Heavy generator hookups, automatic transfer switches (ATS), and UPS arrays.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Graphics column */}
          <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10 flex flex-col items-center justify-center gap-6 relative group overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-[#c3252e]/10 border border-[#c3252e]/20 flex items-center justify-center text-[#c3252e]">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-xl text-center">TSSA & ESA Compliant Layouts</h3>
            <p className="text-gray-400 text-xs sm:text-sm text-center leading-relaxed">
              Our engineering layouts handle complex three-phase power loads and automated controls while maintaining full compliance.
            </p>
            <div className="w-full h-1 rounded bg-[#c3252e]/20 mt-2" />
          </div>
        </div>
      </section>

      {/* ── PLUMBING SERVICES SECTION ── */}
      <section id="plumbing" ref={plumbRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 sm:mb-32">
        <div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center transition-all duration-1000 ease-out"
          style={{
            opacity: plumbInView ? 1 : 0,
            transform: plumbInView ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          {/* Graphics column (appears first on desktop) */}
          <div className="lg:col-span-5 order-last lg:order-first bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10 flex flex-col items-center justify-center gap-6 relative group overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-[#8f8cff]/10 border border-[#8f8cff]/20 flex items-center justify-center text-[#8f8cff]">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-xl text-center">Process Fluid & Air Piping</h3>
            <p className="text-gray-400 text-xs sm:text-sm text-center leading-relaxed">
              We design and layout heavy water loops, compressed air lines, high-pressure steam distribution, and hydronic loop systems for industrial scale.
            </p>
            <div className="w-full h-1 rounded bg-[#8f8cff]/20 mt-2" />
          </div>

          {/* Details column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <span className="text-[#8f8cff] text-xs font-bold uppercase tracking-widest block mb-2">Water, Air & Steam Piping</span>
              <h2 className="font-black text-2xl sm:text-4xl text-white">Industrial Plumbing & Piping</h2>
            </div>
            
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Our industrial plumbers and pipefitters plan, fabricate, and install heavy-duty piping systems. We lay boiler loops, compressed air grids, industrial pump stations, and drainage networks built for continuous high-load operations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex gap-3 text-sm text-gray-300">
                <span className="text-[#8f8cff] text-lg font-bold">✓</span>
                <div>
                  <h4 className="text-white font-bold text-sm">Water & Drainage Piping</h4>
                  <p className="text-gray-400 text-xs mt-0.5">Heavy industrial water supply manifolds, process cooling loops, and drainage piping.</p>
                </div>
              </div>
              <div className="flex gap-3 text-sm text-gray-300">
                <span className="text-[#8f8cff] text-lg font-bold">✓</span>
                <div>
                  <h4 className="text-white font-bold text-sm">Compressed Air Systems</h4>
                  <p className="text-gray-400 text-xs mt-0.5">Copper or aluminum compressed air grids, air dryers, manifolds, and receiver hookups.</p>
                </div>
              </div>
              <div className="flex gap-3 text-sm text-gray-300">
                <span className="text-[#8f8cff] text-lg font-bold">✓</span>
                <div>
                  <h4 className="text-white font-bold text-sm">Boilers & Hydronic Loops</h4>
                  <p className="text-gray-400 text-xs mt-0.5">High-pressure steam boilers, heat exchangers, and primary/secondary heating loops.</p>
                </div>
              </div>
              <div className="flex gap-3 text-sm text-gray-300">
                <span className="text-[#8f8cff] text-lg font-bold">✓</span>
                <div>
                  <h4 className="text-white font-bold text-sm">Industrial Pump Systems</h4>
                  <p className="text-gray-400 text-xs mt-0.5">Chilled water pumps, booster pumps, sewage ejectors, and pressure vessels.</p>
                </div>
              </div>
            </div>
          </div>
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
            <span className="text-[#8f8cff] text-xs font-bold uppercase tracking-widest block mb-2">Industrial Consultations</span>
            <h2 className="font-black text-xl sm:text-3xl text-white">Speak to a Design Engineer</h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-2">Get compliant drawings and a customized quote for your building.</p>
          </div>

          <LeadForm
            subject="Industrial Inquiry (HVAC/Elec/Plumb)"
            fromName="MetricAir Industrial"
            buttonText="Request Consultation"
          />
        </div>
      </section>

    </div>
  );
}
