// src/components/FreeConsultation.jsx
import React, { useState, useRef, useEffect } from 'react';
import LeadForm from './LeadForm';

function useInView(threshold = 0.15) {
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

export default function FreeConsultation() {
  const [leftRef, leftInView]   = useInView(0.1);
  const [rightRef, rightInView] = useInView(0.1);

  return (
    <>
      <style>{`
        /* ── fade-slide helpers ── */
        .fade-left {
          opacity: 0;
          transform: translateX(-36px);
          transition: opacity 0.75s cubic-bezier(0.22,1,0.36,1),
                      transform 0.75s cubic-bezier(0.22,1,0.36,1);
        }
        .fade-left.visible {
          opacity: 1;
          transform: translateX(0);
        }
        .fade-right {
          opacity: 0;
          transform: translateX(36px);
          transition: opacity 0.75s cubic-bezier(0.22,1,0.36,1) 0.1s,
                      transform 0.75s cubic-bezier(0.22,1,0.36,1) 0.1s;
        }
        .fade-right.visible {
          opacity: 1;
          transform: translateX(0);
        }

        /* ── Red split-apart button ── */
        .split-btn {
          position: relative;
          overflow: hidden;
        }
        .split-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          right: 50%;
          background: #c3252e;
          transition: transform 0.38s cubic-bezier(0.77, 0, 0.175, 1);
          z-index: 0;
        }
        .split-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          left: 50%;
          background: #c3252e;
          transition: transform 0.38s cubic-bezier(0.77, 0, 0.175, 1);
          z-index: 0;
        }
        .split-btn:hover::before { transform: translateX(-100%); }
        .split-btn:hover::after  { transform: translateX(100%); }
        .split-btn > span {
          position: relative;
          z-index: 1;
        }
      `}</style>

      <section className="w-full bg-[#0d1233] py-10 sm:py-12 lg:py-16 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

            {/* ── LEFT: Text ── */}
            <div
              ref={leftRef}
              className={`text-white fade-left ${leftInView ? 'visible' : ''}`}
            >
              <h2 id="metric-quotes-heading" className="text-2xl sm:text-3xl lg:text-4xl font-black mb-5 leading-snug text-[#c3252e]">
                Quotes & Consultation
              </h2>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                MetricAir is dedicated to providing high-quality heating, cooling, and mechanical services tailored to your space. Contact our team today to request a comprehensive, detailed quote for your installation, upgrade, or maintenance project. We will review your specifications and get back to you promptly with professional guidance and transparent pricing.
              </p>
            </div>

            {/* ── RIGHT: Form ── */}
            <div
              ref={rightRef}
              className={`fade-right ${rightInView ? 'visible' : ''} w-full max-w-md lg:max-w-none lg:ml-auto bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10`}
            >
              <LeadForm 
                subject="Quote Request" 
                fromName="MetricAir Website"
                buttonText="Quotes & Consultation"
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
