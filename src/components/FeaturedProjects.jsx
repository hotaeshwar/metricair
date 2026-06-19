// src/components/FeaturedProjects.jsx
import React, { useEffect, useRef, useState } from 'react';

function useInView(threshold = 0.05) {
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

const PROJECTS = [
  {
    image: '/images/dspot.png',
    title: 'D SPOT DESSERT CAFE',
    location: 'ST. CATHERINE & LONDON, ON',
    type: 'MEP & Kitchen Ventilation'
  },
  {
    image: '/images/fusion.jpeg',
    title: "TAHINI'S SHAWARMA",
    location: 'PETERBOROUGH, ON',
    type: 'Kitchen Exhaust & Gas Piping'
  },
  {
    image: '/images/pic2.jpeg',
    title: 'FUSION LOUNGE',
    location: 'MISSISSAUGA, ON',
    type: 'Commercial HVAC & Controls'
  },
  {
    image: '/images/pic3.jpeg',
    title: "MOKE'S POUTINERIE",
    location: 'WINDSOR, ON',
    type: 'MEP Stamped Permit Drawings'
  },
  {
    image: '/images/usok.png',
    title: 'USOK RESTAURANT',
    location: 'WHITBY, ON',
    type: 'Exhaust Hoods & Makeup Air'
  },
  {
    image: '/images/pic.jpeg',
    title: '99 KING ST – COMMERCIAL PROJECT',
    location: 'TORONTO, ON',
    type: 'Commercial HVAC & Piping'
  }
];

export default function FeaturedProjects() {
  const [sectionRef, sectionInView] = useInView(0.02);

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 sm:py-20 lg:py-28 px-4 sm:px-8 lg:px-16 overflow-hidden transition-all duration-1000 ease-out"
      style={{
        opacity: sectionInView ? 1 : 0,
        transform: sectionInView ? 'translateY(0)' : 'translateY(30px)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-[#c3252e] text-xs font-bold uppercase tracking-widest block mb-3">
            Our Portfolio
          </span>
          <h2 className="font-black text-2xl sm:text-3xl lg:text-4xl leading-tight">
            <span className="text-[#c3252e]">Featured </span>
            <span className="text-white">Projects</span>
          </h2>
          <div className="w-12 h-1 rounded-full bg-gradient-to-r from-[#c3252e] to-white mx-auto mt-4" />
          <p className="text-gray-400 text-sm max-w-xl mx-auto mt-4 leading-relaxed">
            A showcase of professional mechanical, electrical, plumbing, and kitchen exhaust engineering systems delivered to premier commercial venues across Ontario.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {PROJECTS.map((proj, idx) => {
            // Centering helper classes:
            // First 3 items are lg:col-span-2.
            // 4th item (idx = 3) is lg:col-span-2 lg:col-start-2.
            // 5th item (idx = 4) is lg:col-span-2.
            const gridColClass = 'lg:col-span-2';

            return (
              <div
                key={proj.title}
                className={`group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#c3252e]/40 shadow-xl hover:shadow-[0_0_20px_rgba(195,37,46,0.15)] transition-all duration-500 flex flex-col ${gridColClass}`}
                style={{
                  opacity: sectionInView ? 1 : 0,
                  transform: sectionInView ? 'translateY(0)' : 'translateY(40px)',
                  transition: `opacity 0.7s ease ${idx * 0.15}s, transform 0.7s ease ${idx * 0.15}s, border-color 0.3s, box-shadow 0.3s`,
                }}
              >
                {/* Image Wrapper */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/40">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 select-none"
                    draggable="false"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] via-transparent to-transparent opacity-85" />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col gap-2 flex-1">
                  <h3 className="text-white font-extrabold text-sm sm:text-base tracking-wide group-hover:text-[#c3252e] transition-colors duration-200">
                    {proj.title}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-auto">
                    <svg className="w-3.5 h-3.5 text-[#c3252e] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                      {proj.location}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
