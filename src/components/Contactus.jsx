// src/components/ContactUs.jsx
import React, { useEffect, useRef, useState } from 'react';
import LeadForm from './LeadForm';

/* ── useInView hook ── */
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

/* ── Info cards ── */
const INFO_CARDS = [
  {
    title: 'Need Repairs',
    desc: 'Is your heating, cooling, or hot water not working? Schedule a call with one of our licenced technicians.',
    svg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
  },
  {
    title: 'Products and Services',
    desc: 'New Furnace, AC and water heater installations including water treatment, thermostats and maintenance plans.',
    svg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
        <line x1="7" y1="7" x2="7.01" y2="7"/>
      </svg>
    ),
  },
  {
    title: 'General Inquiries',
    desc: 'There is no such thing as a bad question since you learn something new with every question you ask — fix.',
    svg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
  },
];

export default function ContactUs() {
  const [cardsRef,  cardsInView]  = useInView(0.1);
  const [detailRef, detailInView] = useInView(0.08);
  const [formRef,   formInView]   = useInView(0.08);

  return (
    <section className="w-full bg-[#1a1a2e] text-white
      pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-28
      px-4 sm:px-8 lg:px-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16 lg:gap-20">

        {/* ── Page heading ── */}
        <div
          className="text-center"
          style={{
            opacity: cardsInView ? 1 : 0,
            transform: cardsInView ? 'translateY(0)' : 'translateY(-20px)',
            transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <span className="text-[#c3252e] text-xs font-bold uppercase tracking-widest block mb-3">Get In Touch</span>
          <h1 className="font-black text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
            <span className="text-[#c3252e]">Contact</span>{' '}
            <span className="text-[#8f8cff]">Us</span>{' '}
            <span className="text-white">Today</span>
          </h1>
          <div className="w-12 h-1 rounded-full bg-gradient-to-r from-[#c3252e] via-[#8f8cff] to-white mx-auto" />
        </div>

        {/* ── Three info cards ── */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {INFO_CARDS.map((card, i) => (
            <div
              key={card.title}
              className="flex flex-col items-center text-center p-7 rounded-2xl bg-white/5 border border-white/10 hover:border-[#c3252e]/40 hover:bg-white/8 transition-all duration-300"
              style={{
                opacity: cardsInView ? 1 : 0,
                transform: cardsInView ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 0.12}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 0.12}s`,
              }}
            >
              <div className="text-[#c3252e] mb-4">{card.svg}</div>
              <h3 className="text-white font-bold text-base sm:text-lg mb-3">{card.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* ── Contact Details (LEFT) + Form (RIGHT) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 lg:gap-16 items-start">

          {/* ── LEFT: Contact Details ── */}
          <div
            ref={detailRef}
            style={{
              opacity: detailInView ? 1 : 0,
              transform: detailInView ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <h2 className="text-white font-black text-2xl sm:text-3xl mb-8">
              Contact Details
            </h2>

            <div className="flex flex-col gap-6">
              {/* Name */}
              <p className="text-white font-semibold text-base">Tejinder Singh</p>

              <div className="w-full h-px bg-white/10" />

              {/* Phone */}
              <a
                href="tel:+16479241421"
                className="flex items-center gap-3 text-gray-300 hover:text-[#c3252e] transition-colors duration-200 group"
              >
                <span className="w-9 h-9 rounded-full bg-white/5 border border-white/10 group-hover:border-[#c3252e]/40 flex items-center justify-center shrink-0 transition-colors duration-200">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.07 9.81a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 2 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L6.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0 1 22 16z"/>
                  </svg>
                </span>
                <span className="text-sm">+1 647 924 1421</span>
              </a>

              {/* Email */}
              <a
                href="mailto:metricairlimited.ca@gmail.com"
                className="flex items-center gap-3 text-gray-300 hover:text-[#c3252e] transition-colors duration-200 group"
              >
                <span className="w-9 h-9 rounded-full bg-white/5 border border-white/10 group-hover:border-[#c3252e]/40 flex items-center justify-center shrink-0 transition-colors duration-200">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                <span className="text-sm break-all">metricairlimited.ca@gmail.com</span>
              </a>

              {/* Address */}
              <a
                href="https://maps.google.com/?q=7115+Rexwood+Road,+Mississauga,+ON,+L4T+4L5"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-gray-300 hover:text-[#c3252e] transition-colors duration-200 group"
              >
                <span className="w-9 h-9 rounded-full bg-white/5 border border-white/10 group-hover:border-[#c3252e]/40 flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-200">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </span>
                <span className="text-sm leading-relaxed">7115 Rexwood Road, Mississauga, ON, L4T 4L5</span>
              </a>

              <div className="w-full h-px bg-white/10" />

              {/* Business hours */}
              <div>
                <p className="text-[#c3252e] text-xs font-bold uppercase tracking-widest mb-3">Business Hours</p>
                <div className="flex flex-col gap-2 text-sm text-gray-400">
                  <div className="flex justify-between">
                    <span>Monday – Friday</span>
                    <span className="text-white">8:00 AM – 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-white">9:00 AM – 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-gray-500">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Form ── */}
          <div
            ref={formRef}
            style={{
              opacity: formInView ? 1 : 0,
              transform: formInView ? 'translateX(0)' : 'translateX(40px)',
              transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s, transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s',
            }}
          >
            <h2 className="text-white font-black text-2xl sm:text-3xl mb-8">
              Send us a Message
            </h2>

            <LeadForm 
              subject="Contact Form Message" 
              fromName="MetricAir Contact Us" 
              buttonText="Send Message" 
            />
          </div>

        </div>
      </div>

      <style>{`
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
    </section>
  );
}
