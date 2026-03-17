// src/components/Aboutus.jsx
import React, { useEffect, useRef, useState } from 'react';

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
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

export default function AboutUs() {
  const [textRef, textInView] = useInView();
  const [imgRef, imgInView] = useInView();
  const [statsRef, statsInView] = useInView(0.2);

  return (
    <section className="w-full bg-[#1a1a2e] text-white
      pt-28 pb-16
      sm:pt-32 sm:pb-20
      lg:pt-36 lg:pb-28
      px-4 sm:px-8 lg:px-16
      overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

        {/* ── Left: Text ── */}
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

          <h2 className="text-white font-black leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            <span className="text-[#e94560]">HVAC Contractor</span>{' '}
            <span>Servicing the</span>{' '}
            <span className="text-[#e94560]">Greater Toronto Area</span>
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

        {/* ── Right: Image ── */}
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
                  bg-[#16213e]
                "
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}