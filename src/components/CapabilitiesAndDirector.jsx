// src/components/CapabilitiesAndDirector.jsx
import React, { useEffect, useRef, useState } from 'react';

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

export default function CapabilitiesAndDirector() {
  const [capRef, capInView] = useInView(0.05);
  const [dirRef, dirInView] = useInView(0.05);

  const capabilities = [
    "TSSA Registered Contractor",
    "Fully licensed and insured",
    "WSIB compliant",
    "Safety-trained crew",
    "In-house duct design & fabrication",
    "3D coordination with other trades"
  ];

  return (
    <div className="w-full text-white overflow-hidden">
      
      {/* ── SECTION 1: CAPABILITIES & CERTIFICATIONS ── */}
      <section
        ref={capRef}
        className="w-full py-10 sm:py-12 lg:py-16 px-4 sm:px-8 lg:px-16 bg-[#1a1a2e] relative"
      >
        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#c3252e]/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div
              className="lg:col-span-7 flex flex-col gap-6 transition-all duration-1000 ease-out"
              style={{
                opacity: capInView ? 1 : 0,
                transform: capInView ? 'translateX(0)' : 'translateX(-30px)'
              }}
            >
              <div>
                <span className="text-[#c3252e] text-xs font-bold uppercase tracking-widest block mb-3">
                  Safety & Engineering Excellence
                </span>
                <h2 id="metric-capabilities-heading" className="font-black text-3xl sm:text-4xl lg:text-5xl text-[#c3252e] leading-tight">
                  Capabilities & Certifications
                </h2>
                <div className="w-14 h-1 rounded-full bg-gradient-to-r from-[#c3252e] to-[#8f8cff] mt-4" />
              </div>

              <p className="text-white text-sm sm:text-base leading-relaxed max-w-xl">
                MetricAir is committed to upholding the highest safety standards, technical licensing, and execution quality. We manage projects from digital blueprint layouts through final physical inspection.
              </p>

              {/* Capabilities checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                {capabilities.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#c3252e]/30 transition-all duration-300 group"
                  >
                    <span className="text-[#ff5c65] text-lg font-black shrink-0 transition-transform duration-300 group-hover:scale-110">✓</span>
                    <span className="text-white text-xs sm:text-sm font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Certificate Image */}
            <div
              className="lg:col-span-5 flex justify-center lg:justify-end transition-all duration-1000 ease-out delay-200"
              style={{
                opacity: capInView ? 1 : 0,
                transform: capInView ? 'translateX(0)' : 'translateX(30px)'
              }}
            >
              <div className="relative max-w-md w-full overflow-hidden group">
                <img
                  src="/images/certificate.png"
                  alt="MetricAir Credentials and Certifications Badge"
                  className="w-full h-auto object-contain select-none transition-transform duration-500 group-hover:scale-[1.02]"
                  draggable="false"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 2: MESSAGE FROM THE DIRECTOR ── */}
      <section
        ref={dirRef}
        className="w-full py-10 sm:py-12 lg:py-16 px-4 sm:px-8 lg:px-16 bg-[#131326] relative"
      >
        {/* Decorative background glow */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#8f8cff]/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Director Image */}
            <div
              className="lg:col-span-5 flex justify-center lg:justify-start order-2 lg:order-1 transition-all duration-1000 ease-out"
              style={{
                opacity: dirInView ? 1 : 0,
                transform: dirInView ? 'translateX(0)' : 'translateX(-30px)'
              }}
            >
              <div className="relative max-w-md w-full group overflow-hidden">
                <img
                  src="/images/tej.jpeg"
                  alt="Meet our Director of Metric Air Limited"
                  className="w-full h-auto object-cover select-none transition-transform duration-500 group-hover:scale-105"
                  draggable="false"
                />
              </div>
            </div>

            {/* Right Message Content */}
            <div
              className="lg:col-span-7 flex flex-col gap-6 order-1 lg:order-2 transition-all duration-1000 ease-out delay-200"
              style={{
                opacity: dirInView ? 1 : 0,
                transform: dirInView ? 'translateX(0)' : 'translateX(30px)'
              }}
            >
              <div>
                <span className="text-[#8f8cff] text-xs font-bold uppercase tracking-widest block mb-3">
                  Meet Our Director
                </span>
                <h2 id="metric-director-heading" className="font-black text-3xl sm:text-4xl lg:text-5xl text-[#c3252e] leading-tight">
                  Message from the Director
                </h2>
                <div className="w-14 h-1 rounded-full bg-gradient-to-r from-[#8f8cff] to-[#c3252e] mt-4" />
              </div>

              <div className="flex flex-col gap-5 text-white text-sm sm:text-base leading-relaxed">
                <p className="text-white font-medium">
                  At Metric Air Limited, we deliver high-quality mechanical, electrical, and plumbing solutions built on precision, reliability, and excellence.
                </p>
                <p>
                  I founded this company independently, bringing over 7 years of hands-on industry experience with a clear vision: to build a trusted, performance-driven service company that delivers complete MEP solutions under one roof.
                </p>
                <p>
                  Since its inception, Metric Air Limited has grown through consistent workmanship, strong client relationships, and a commitment to doing every project right the first time. Our focus remains on delivering efficient, safe, and high-quality solutions that meet the evolving needs of residential, commercial, and industrial projects across Ontario.
                </p>
                <p>
                  With a skilled and dedicated team, we continue to raise standards through innovation, accountability, and professionalism in every aspect of our work.
                </p>
                <p className="border-t border-white/5 pt-4 text-xs sm:text-sm font-semibold text-white">
                  We sincerely value the trust of our clients and partners and remain committed to building long-term relationships based on quality and reliability.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
