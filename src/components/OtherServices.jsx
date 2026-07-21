// src/components/OtherServices.jsx
import React from 'react';

const SECTIONS = {
  drawings: {
    title: "Drawings and Permits",
    subtitle: "Professional Engineering & Municipal Compliance",
    desc: "We provide comprehensive HVAC load calculations, design drawings, and building permit processing to ensure compliance with local building codes.",
    features: [
      "Manual J & Manual S calculations",
      "HVAC layout & duct design drawings",
      "Building permit application & processing",
      "Engineering stamp of approval"
    ],
    details: "Our certified design team uses state-of-the-art software to perform heat loss and heat gain calculations (HRAI certified), ensuring that your heating and cooling equipment is sized perfectly for your space. We handle all municipal paperwork to obtain HVAC permits fast."
  },
  hoses: {
    title: "Custom Hoses",
    subtitle: "Precision Flexible Piping & Connectors",
    desc: "High-performance custom flexible hoses and vibration isolation connectors for residential, commercial, and industrial HVAC applications.",
    features: [
      "Gas pressure flexible hoses",
      "Braided stainless steel lines",
      "Duct & exhaust flex hoses",
      "Specialty fittings & connectors"
    ],
    details: "We manufacture and distribute pressure-tested flexible gas and water lines designed for easy installation and extreme service life. Our specialized flexible joints isolate blower and pump vibrations, preserving the structural integrity of your duct and piping systems."
  },
  ductwork: {
    title: "Custom Ductwork Manufacturing",
    subtitle: "Precision Sheet Metal Fabrication",
    desc: "Our state-of-the-art sheet metal shop manufactures custom rectangular ductwork, transitions, plenums, and specialty fittings for prompt delivery.",
    features: [
      "Heavy-gauge sheet metal fabrication",
      "Plenums, transitions & elbows",
      "Quick-turnaround commercial runs",
      "Custom galvanized & stainless steel"
    ],
    details: "With our in-house fabrication machinery, we produce standard and non-standard sheet metal ductwork to meet the precise requirements of any residential or commercial HVAC layout. Whether you need a simple furnace plenum or complex commercial duct runs, our metal shop delivers on time."
  }
};

export default function OtherServices({ activeSection = "ductwork" }) {
  const current = SECTIONS[activeSection] || SECTIONS.ductwork;

  return (
    <div className="w-full bg-[#1a1a2e] text-white pt-24 pb-16 sm:pt-32 lg:pt-36 overflow-hidden">
      
      {/* ── HERO BANNER ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20 text-center">
        {/* Responsive Logo Container */}
        <span className="text-gray-400 text-xs font-bold uppercase tracking-widest block mb-4">
          Specialty Building Services
        </span>

        {/* Heading styled with RED followed by BLUE and WHITE */}
        <h1 id="metric-other-services-heading" className="font-black leading-tight text-3xl sm:text-5xl lg:text-6xl mb-6">
          <span className="text-[#c3252e]">Other</span>{' '}
          <span className="text-[#8f8cff]">HVAC</span>{' '}
          <span className="text-white">Services</span>
        </h1>

        <div className="w-20 h-1 rounded-full bg-gradient-to-r from-[#c3252e] via-[#8f8cff] to-white mx-auto mb-6" />
      </section>

      {/* ── SERVICE TAB LAYOUT ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        {/* Responsive Tab Switcher Links */}
        <div className="flex flex-col sm:flex-row bg-white/5 border border-white/10 rounded-2xl p-2 gap-2 mb-12 max-w-3xl mx-auto">
          <a 
            href="/other-services/drawings-permits"
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-center transition-all ${
              activeSection === 'drawings' 
                ? 'bg-[#c3252e] text-white shadow-lg shadow-[#c3252e]/20' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Drawings & Permits
          </a>
          <a 
            href="/other-services/custom-hoses"
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-center transition-all ${
              activeSection === 'hoses' 
                ? 'bg-[#8f8cff] text-white shadow-lg shadow-[#8f8cff]/20' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Custom Hoses
          </a>
          <a 
            href="/other-services/custom-ductwork"
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-center transition-all ${
              activeSection === 'ductwork' 
                ? 'bg-white text-gray-900 shadow-lg' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Custom Ductwork
          </a>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 lg:p-12">
          
          {/* Text block */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <span className="text-[#8f8cff] text-xs font-bold uppercase tracking-widest block mb-2">
                {current.subtitle}
              </span>
              <h2 className="font-black text-2xl sm:text-4xl text-white">{current.title}</h2>
            </div>
            
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{current.desc}</p>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed border-l-2 border-[#c3252e]/40 pl-4 py-1">
              {current.details}
            </p>
          </div>

          {/* Features check block */}
          <div className="lg:col-span-5 bg-white/5 border border-white/5 rounded-2xl p-6 sm:p-8">
            <h4 className="text-white font-bold text-sm sm:text-base mb-6 uppercase tracking-wider border-b border-white/10 pb-3">
              Key Offerings
            </h4>
            <ul className="flex flex-col gap-4">
              {current.features.map((feat) => (
                <li key={feat} className="flex items-start gap-3 text-xs sm:text-sm text-gray-300 leading-snug">
                  <div className="w-5 h-5 rounded-full bg-[#c3252e]/10 border border-[#c3252e]/20 flex items-center justify-center text-[#c3252e] shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* ── CONSULTATION CTA ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <div className="rounded-2xl bg-white/5 border border-white/10 p-8 sm:p-12">
          <h3 className="font-black text-xl sm:text-2xl mb-4 text-white">Need a Specialty HVAC Solution?</h3>
          <p className="text-gray-400 text-sm max-w-xl mx-auto mb-8">
            Our fabrication shop and engineering specialists are ready to turn your mechanical design and permit plans into reality.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-[#c3252e] hover:brightness-110 transition-all px-8 py-3 rounded-full text-white text-xs sm:text-sm font-bold uppercase tracking-wider cursor-pointer"
          >
            Get in Touch
          </a>
        </div>
      </section>

    </div>
  );
}
