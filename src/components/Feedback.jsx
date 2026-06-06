// src/components/Feedback.jsx
import React, { useEffect, useRef, useState } from 'react';
import LeadForm from './LeadForm';

/* ── useInView ── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [threshold]);
  return [ref, inView];
}

/* ── Animated counter hook ── */
function useCounter(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) {
      setCount(0);
      return;
    }
    const numeric = parseFloat(target);
    if (isNaN(numeric)) { setCount(target); return; }
    let startTime = null;
    let animationFrameId;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      // For decimals like 4.9 keep one decimal place
      const current = eased * numeric;
      setCount(Number.isInteger(numeric) ? Math.floor(current) : parseFloat(current.toFixed(1)));
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(numeric);
      }
    };
    animationFrameId = requestAnimationFrame(step);
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [start, target, duration]);
  return count;
}

/* ── Animated stat card ── */
function StatCard({ raw, suffix, label, started, delay = 0 }) {
  const numeric = parseFloat(raw);
  const isNum   = !isNaN(numeric);
  const count   = useCounter(isNum ? numeric : 0, 1800, started);

  return (
    <div
      className="flex flex-col items-center justify-center text-center p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#e94560]/30 transition-all duration-300"
      style={{
        opacity: started ? 1 : 0,
        transform: started ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      <span className="text-[#e94560] font-black text-4xl sm:text-5xl tracking-tight">
        {isNum ? `${count}${suffix}` : raw}
      </span>
      <span className="text-gray-500 text-xs mt-2 uppercase tracking-widest font-semibold">{label}</span>
    </div>
  );
}

/* ── Star Rating ── */
function StarRating({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  const labels = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!'];
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform duration-150 hover:scale-110 focus:outline-none"
        >
          <svg
            className="w-9 h-9 sm:w-10 sm:h-10 transition-all duration-150"
            viewBox="0 0 24 24"
            fill={(hovered || value) >= star ? '#e94560' : 'none'}
            stroke={(hovered || value) >= star ? '#e94560' : 'rgba(255,255,255,0.2)'}
            strokeWidth={1.5}
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      ))}
      {(hovered || value) > 0 && (
        <span className="text-[#e94560] text-sm font-bold ml-1 transition-all duration-150">
          {labels[hovered || value]}
        </span>
      )}
      {(hovered === 0 && value === 0) && (
        <span className="text-gray-500 text-sm ml-1">Tap to rate</span>
      )}
    </div>
  );
}

/* ── Data ── */
const CATEGORIES = [
  'Overall Experience', 'Installation Quality', 'Repair Service',
  'Response Time', 'Professionalism', 'Pricing & Value', 'Communication', 'Other',
];
const RECOMMEND_OPTIONS = [
  { value: 'yes', label: 'Yes, definitely' },
  { value: 'maybe', label: 'Maybe' },
  { value: 'no', label: 'No' },
];
const STEPS = [
  { id: 1, title: 'Your Details',        short: 'Details'  },
  { id: 2, title: 'Rate Experience',     short: 'Rating'   },
  { id: 3, title: 'Tell Us More',        short: 'Feedback' },
];

/* ════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════ */
export default function Feedback() {
  const [heroRef,  heroInView]  = useInView(0.05);
  const [statsRef, statsInView] = useInView(0.1);
  const [formRef,  formInView]  = useInView(0.05);

  return (
    <section className="w-full bg-[#1a1a2e] text-white
      pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-28
      px-4 sm:px-8 lg:px-16 overflow-hidden"
    >
      <style>{`
        .split-btn { position:relative; overflow:hidden; }
        .split-btn::before { content:''; position:absolute; inset:0; right:50%; background:#e94560; transition:transform 0.38s cubic-bezier(0.77,0,0.175,1); z-index:0; }
        .split-btn::after  { content:''; position:absolute; inset:0; left:50%;  background:#e94560; transition:transform 0.38s cubic-bezier(0.77,0,0.175,1); z-index:0; }
        .split-btn:hover::before { transform:translateX(-100%); }
        .split-btn:hover::after  { transform:translateX(100%); }
        .split-btn > span { position:relative; z-index:1; }
        .step-content { transition: opacity 0.28s ease, transform 0.28s ease; }
      `}</style>

      <div className="max-w-7xl mx-auto flex flex-col gap-16 lg:gap-20">

        {/* ══ HERO ══ */}
        <div
          ref={heroRef}
          className="text-center max-w-3xl mx-auto"
          style={{
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <span className="text-[#e94560] text-xs font-bold uppercase tracking-widest block mb-4">
            Your Voice Matters
          </span>
          <h1 className="font-black leading-tight text-4xl sm:text-5xl lg:text-6xl mb-5">
            <span className="text-[#e94560]">Share </span>
            <span className="text-[#3b82f6]">Your </span>
            <span className="text-white">Feedback</span>
          </h1>
          <div className="w-14 h-1 rounded-full bg-gradient-to-r from-[#e94560] via-[#3b82f6] to-white mx-auto mb-6" />
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            We take every piece of feedback seriously. Tell us about your experience with MetricAir — your input directly shapes how we serve the GTA community.
          </p>
        </div>

        {/* ══ ANIMATED STATS ══ */}
        <div
          ref={statsRef}
          className="grid grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto w-full"
        >
          <StatCard raw={4.9}  suffix=""   label="Avg. Rating"   started={statsInView} delay={0}    />
          <StatCard raw={500}  suffix="+"  label="Happy Clients" started={statsInView} delay={0.12} />
          <StatCard raw={98}   suffix="%"  label="Recommend Us"  started={statsInView} delay={0.24} />
        </div>

        {/* ══ STEPPER FORM ══ */}
        <div
          ref={formRef}
          className="max-w-5xl mx-auto w-full"
          style={{
            opacity: formInView ? 1 : 0,
            transform: formInView ? 'translateY(0)' : 'translateY(36px)',
            transition: 'opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch bg-white/4 border border-white/10 rounded-2xl overflow-hidden p-4 sm:p-6 lg:p-8">
            {/* Left side: Image only */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full rounded-xl overflow-hidden group">
              <img 
                src="/images/feedback.jpeg" 
                alt="Client Feedback and Satisfaction" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 select-none"
                draggable="false"
              />
            </div>
            
            {/* Right side: LeadForm */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <LeadForm 
                subject="Customer Feedback" 
                fromName="MetricAir Feedback" 
                buttonText="Submit Feedback" 
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}