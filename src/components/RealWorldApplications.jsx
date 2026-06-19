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

      <section className="w-full bg-[#0d1233] py-16 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

            {/* ── LEFT: Text ── */}
            <div
              ref={leftRef}
              className={`text-white fade-left ${leftInView ? 'visible' : ''}`}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-5 leading-snug">
                <span className="text-[#c3252e]">Book a </span>
                <span className="text-[#8f8cff]">Free </span>
                <span className="text-white">Consultation</span>
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Its the perfect time to save on a new furnace with our limited time up to 30% off select furnace
                units. You may be eligible to receive a FREE* Nest Learning Thermostat upon the furnace
                installation. Fill out the form and we'll let you know if you qualify. Don't miss these amazing
                offers, act fast and fill out the form for a free in-home consultation.
              </p>
            </div>

            {/* ── RIGHT: Form ── */}
            <div
              ref={rightRef}
              className={`fade-right ${rightInView ? 'visible' : ''} w-full max-w-md lg:max-w-none lg:ml-auto`}
            >
              <LeadForm 
                subject="Free Consultation Request" 
                fromName="MetricAir Website"
                buttonText="Send Message"
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
