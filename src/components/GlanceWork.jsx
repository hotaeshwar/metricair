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
          <a
            href="/documents/business_portfolio.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#c3252e]/50 hover:bg-[#c3252e]/10 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-2 hover:shadow-[0_0_15px_rgba(195,37,46,0.15)]"
          >
            <span>Our Journey</span>
            <svg className="w-4 h-4 text-[#c3252e] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9.5 8.5c0 .83-.67 1.5-1.5 1.5H7v2H5.5V9H8c.83 0 1.5.67 1.5 1.5v1zM15 11.5c0 1.38-1.12 2.5-2.5 2.5H11V9h1.5c1.38 0 2.5 1.12 2.5 2.5zm4-.5h-2v1.5h1.5V14H17v2h-1.5V9H19v2zm-6.5.5c0-.55-.45-1-1-1h-1v2h1c.55 0 1-.45 1-1zM7 10.5h1V12H7z" />
            </svg>
          </a>

          {/* Link 2: HVAC Projects */}
          <a
            href="/documents/HVAC.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#8f8cff]/50 hover:bg-[#8f8cff]/10 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-2 hover:shadow-[0_0_15px_rgba(143,140,255,0.15)]"
          >
            <span>HVAC Projects</span>
            <svg className="w-4 h-4 text-[#8f8cff] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9.5 8.5c0 .83-.67 1.5-1.5 1.5H7v2H5.5V9H8c.83 0 1.5.67 1.5 1.5v1zM15 11.5c0 1.38-1.12 2.5-2.5 2.5H11V9h1.5c1.38 0 2.5 1.12 2.5 2.5zm4-.5h-2v1.5h1.5V14H17v2h-1.5V9H19v2zm-6.5.5c0-.55-.45-1-1-1h-1v2h1c.55 0 1-.45 1-1zM7 10.5h1V12H7z" />
            </svg>
          </a>

          {/* Link 3: Electric Projects */}
          <a
            href="/documents/electrical_photos.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/40 hover:bg-white/5 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-2 hover:shadow-[0_0_15px_rgba(255,255,255,0.08)]"
          >
            <span>Electric Projects</span>
            <svg className="w-4 h-4 text-gray-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9.5 8.5c0 .83-.67 1.5-1.5 1.5H7v2H5.5V9H8c.83 0 1.5.67 1.5 1.5v1zM15 11.5c0 1.38-1.12 2.5-2.5 2.5H11V9h1.5c1.38 0 2.5 1.12 2.5 2.5zm4-.5h-2v1.5h1.5V14H17v2h-1.5V9H19v2zm-6.5.5c0-.55-.45-1-1-1h-1v2h1c.55 0 1-.45 1-1zM7 10.5h1V12H7z" />
            </svg>
          </a>

          {/* Link 4: Plumbing Projects */}
          <a
            href="/documents/plumbing_photos.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#c3252e]/50 hover:bg-[#c3252e]/10 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-2 hover:shadow-[0_0_15px_rgba(195,37,46,0.15)]"
          >
            <span>Plumbing Projects</span>
            <svg className="w-4 h-4 text-[#c3252e] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9.5 8.5c0 .83-.67 1.5-1.5 1.5H7v2H5.5V9H8c.83 0 1.5.67 1.5 1.5v1zM15 11.5c0 1.38-1.12 2.5-2.5 2.5H11V9h1.5c1.38 0 2.5 1.12 2.5 2.5zm4-.5h-2v1.5h1.5V14H17v2h-1.5V9H19v2zm-6.5.5c0-.55-.45-1-1-1h-1v2h1c.55 0 1-.45 1-1zM7 10.5h1V12H7z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
