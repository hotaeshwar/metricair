// src/components/Aboutus.jsx
import React, { useEffect, useRef, useState } from 'react';

function useInView(threshold = 0.12) {
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

function useCounter(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const numeric = parseFloat(target);
    if (isNaN(numeric)) { setCount(target); return; }
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numeric));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(numeric);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function StatCard({ value, label, suffix = '', started }) {
  const numeric = parseFloat(value);
  const isNumber = !isNaN(numeric);
  const count = useCounter(isNumber ? numeric : value, 1800, started);
  return (
    <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white/5 border border-white/10">
      <span className="text-[#e94560] font-black text-xl sm:text-2xl">
        {isNumber ? `${count}${suffix}` : value}
      </span>
      <span className="text-gray-400 text-xs mt-1 leading-snug">{label}</span>
    </div>
  );
}

const VALUES = [
  {
    title: "Engineering Quality",
    desc: "We don't believe in generic mechanical setups. Every furnace, AC duct fabrication, or commercial kitchen hood we install is engineered to match your space parameters perfectly.",
    icon: (
      <svg className="w-6 h-6 text-[#e94560]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      </svg>
    )
  },
  {
    title: "Customer Protection",
    desc: "HVAC failures shouldn't cause financial panic. Our Worry-Free Rental programs offer zero upfront costs, zero parts or maintenance fees, and lifetime priority support runs across the GTA.",
    icon: (
      <svg className="w-6 h-6 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: "Complete Compliance",
    desc: "We manage the entire municipal permit compliance scope. Our certified engineers draft P.Eng stamped OBC calculations, blueprints, and pass structural building reviews cleanly.",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  }
];

const CERTIFICATIONS = [
  { title: "TSSA Certified", desc: "Technical Standards & Safety Authority HVAC Contractor" },
  { title: "HRAI Active Member", desc: "Heating, Refrigeration and Air Conditioning Institute Member" },
  { title: "OBC BCIN Designers", desc: "Ontario Building Code BCIN Registered blueprints" },
  { title: "Fully Insured & WSIB", desc: "Comprehensive WSIB safety and general liability insurance protection" }
];

export default function AboutUs() {
  const [textRef, textInView] = useInView();
  const [imgRef, imgInView] = useInView();
  const [statsRef, statsInView] = useInView(0.2);
  const [valuesRef, valuesInView] = useInView(0.05);
  const [certRef, certInView] = useInView(0.05);

  return (
    <section className="w-full bg-[#1a1a2e] text-white pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-28 px-4 sm:px-8 lg:px-16 overflow-hidden">
      
      <div className="max-w-7xl mx-auto flex flex-col gap-20 lg:gap-28">

        {/* ── INTRO SECTION ── */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Text */}
          <div
            ref={textRef}
            className="w-full lg:w-1/2 flex flex-col gap-6"
            style={{
              opacity: textInView ? 1 : 0,
              transform: textInView ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <span className="text-[#e94560] text-xs font-bold uppercase tracking-widest">
              About MetricAir
            </span>

            <h2 className="font-black leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              <span className="text-[#e94560]">HVAC Contractor</span>{' '}
              <span className="text-[#3b82f6]">Servicing the</span>{' '}
              <span className="text-white">Greater Toronto Area</span>
            </h2>

            <div className="w-12 h-1 rounded-full bg-[#e94560]" />

            <div className="flex flex-col gap-4 text-gray-400 text-sm sm:text-base leading-relaxed">
              <p>
                <span className="text-white font-semibold">
                  We understand the problems faced due to HVAC equipment breakdown
                </span>
                <span> — we are here to solve them. </span>
                <span className="text-white font-medium">Air Metric</span>
                <span> offers </span>
                <span className="text-[#e94560] font-semibold">Heating</span>
                <span>, </span>
                <span className="text-[#e94560] font-semibold">Cooling</span>
                <span>, and </span>
                <span className="text-[#e94560] font-semibold">Water Heating</span>
                <span> services throughout the Greater Toronto Area, specialising in repairs and installations.</span>
              </p>

              <p>
                <span>We have a wide range of products and services including </span>
                <span className="text-white font-medium">Furnaces</span>
                <span>, </span>
                <span className="text-white font-medium">Air Conditioners</span>
                <span>, </span>
                <span className="text-white font-medium">Water Heaters</span>
                <span>, </span>
                <span className="text-white font-medium">Ductless Heating Systems (Mini-Splits)</span>
                <span>, </span>
                <span className="text-white font-medium">Water Purification & Softening Systems</span>
                <span>, and </span>
                <span className="text-white font-medium">Humidifiers</span>
                <span>.</span>
              </p>

              <p>
                <span>Being stuck without </span>
                <span className="text-[#e94560] font-semibold">heat</span>
                <span>, </span>
                <span className="text-[#e94560] font-semibold">air conditioning</span>
                <span>, or </span>
                <span className="text-[#e94560] font-semibold">hot water</span>
                <span> can be tough — that's why we offer </span>
                <span className="text-white font-semibold">maintenance plans</span>
                <span> for your Furnace, AC, and Water Heater so you're never left in the cold.</span>
              </p>
            </div>

            {/* Stats row */}
            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-4 pt-2"
              style={{
                opacity: statsInView ? 1 : 0,
                transform: statsInView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s, transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s',
              }}
            >
              <StatCard value={20}   suffix="+" label="Years Experience" started={statsInView} />
              <StatCard value={5000} suffix="+" label="Homes Serviced"   started={statsInView} />
              <StatCard value="GTA"  suffix=""  label="Wide Coverage"    started={statsInView} />
            </div>
          </div>

          {/* Right: Image */}
          <div
            ref={imgRef}
            className="w-full lg:w-1/2"
            style={{
              opacity: imgInView ? 1 : 0,
              transform: imgInView ? 'translateX(0)' : 'translateX(40px)',
              transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1) 0.15s, transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.15s',
            }}
          >
            <div className="relative rounded-2xl overflow-visible">
              {/* Shadow card behind image */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  transform: 'translate(8px, 8px)',
                }}
              />

              {/* Red accent corners */}
              <div className="absolute -top-3 -left-3 w-16 h-16 rounded-tl-2xl border-t-4 border-l-4 border-[#e94560] z-10" />
              <div className="absolute -bottom-3 -right-3 w-16 h-16 rounded-br-2xl border-b-4 border-r-4 border-[#e94560] z-10" />

              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="/images/gta.png"
                  alt="MetricAir servicing the Greater Toronto Area"
                  className="
                    relative z-[1] w-full rounded-2xl
                    h-[260px]
                    sm:h-[340px]
                    md:h-[380px]
                    lg:h-[460px]
                    xl:h-[520px]
                    object-contain
                    object-center
                    bg-white
                  "
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── CORE VALUES SECTION ── */}
        <div ref={valuesRef} className="flex flex-col gap-12 border-t border-white/10 pt-16">
          <div className="text-center">
            <span className="text-[#3b82f6] text-xs font-bold uppercase tracking-widest block mb-3">Our Principles</span>
            <h3 className="text-white font-black text-2xl sm:text-3xl lg:text-4xl leading-tight">The MetricAir Values</h3>
            <div className="w-12 h-1 rounded-full bg-[#3b82f6] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {VALUES.map((val, idx) => (
              <div
                key={val.title}
                className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#e94560]/40 hover:bg-white/[0.08] flex flex-col gap-4 transition-all duration-500 ease-out"
                style={{
                  opacity: valuesInView ? 1 : 0,
                  transform: valuesInView ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: valuesInView ? `${idx * 150}ms` : '0ms'
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  {val.icon}
                </div>
                <h4 className="text-white font-bold text-lg">{val.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── SAFETY & LICENSING SECTION ── */}
        <div ref={certRef} className="flex flex-col gap-12 border-t border-white/10 pt-16 mb-6">
          <div className="text-center">
            <span className="text-white text-xs font-bold uppercase tracking-widest block mb-3">Standards & Licenses</span>
            <h3 className="text-[#e94560] font-black text-2xl sm:text-3xl lg:text-4xl leading-tight">Certifications & Safety</h3>
            <div className="w-12 h-1 rounded-full bg-white mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {CERTIFICATIONS.map((cert, idx) => (
              <div
                key={cert.title}
                className="p-5 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-2 transition-all duration-700 ease-out"
                style={{
                  opacity: certInView ? 1 : 0,
                  transform: certInView ? 'translateY(0)' : 'translateY(25px)',
                  transitionDelay: certInView ? `${idx * 120}ms` : '0ms'
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[#e94560] text-lg font-bold">✓</span>
                  <h4 className="text-white font-bold text-sm leading-snug">{cert.title}</h4>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed pl-5">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}