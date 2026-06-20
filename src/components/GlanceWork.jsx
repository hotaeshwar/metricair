import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

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

export default function GlanceWork() {
  const [sectionRef, sectionInView] = useInView(0.05);

  const images = [
    { src: '/images/mechanical7.jpeg', alt: 'Mechanical Room Assembly' },
    { src: '/images/mechanical8.jpeg', alt: 'Industrial Boiler and Piping' },
    { src: '/images/mechanicalwork2.jpeg', alt: 'HVAC Duct and Gas Line Work' }
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-16 bg-[#131326] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className="text-center mb-12 transition-all duration-700 ease-out"
          style={{
            opacity: sectionInView ? 1 : 0,
            transform: sectionInView ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <span className="text-[#c3252e] text-xs font-bold uppercase tracking-widest block mb-3">
            Real Workmanship
          </span>
          <h2 className="font-black text-2xl sm:text-3xl lg:text-4xl text-white leading-tight">
            Glance at Our Work
          </h2>
          <div className="w-12 h-1 rounded-full bg-gradient-to-r from-[#c3252e] to-[#8f8cff] mx-auto mt-4" />
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#c3252e]/40 shadow-xl transition-all duration-500"
              style={{
                opacity: sectionInView ? 1 : 0,
                transform: sectionInView ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.75s cubic-bezier(0.22,1,0.36,1) ${idx * 0.15}s, transform 0.75s cubic-bezier(0.22,1,0.36,1) ${idx * 0.15}s`,
              }}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/20">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 select-none"
                  draggable="false"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white text-xs font-black uppercase tracking-widest">
                    {img.alt}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Links */}
        <div
          className="mt-12 flex flex-wrap justify-center items-center gap-4 sm:gap-6 transition-all duration-700 ease-out delay-300"
          style={{
            opacity: sectionInView ? 1 : 0,
            transform: sectionInView ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          {/* Link 1: Our Journey */}
          <Link
            to="/about"
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#c3252e]/50 hover:bg-[#c3252e]/10 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-2 hover:shadow-[0_0_15px_rgba(195,37,46,0.15)]"
          >
            <span>Our Journey</span>
            <svg className="w-4 h-4 text-[#c3252e]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
