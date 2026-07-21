// src/components/BrandCarousel.jsx
import React, { useRef, useState, useEffect, useCallback } from 'react';

const BRANDS = [
  { src: '/images/Trane.png', alt: 'Trane' },
  { src: '/images/York.png', alt: 'York' },
  { src: '/images/Captiveaire.png', alt: 'Captiveaire' },
  { src: '/images/Daikin.png', alt: 'Daikin' },
  { src: '/images/Fast Kitchen Hoods.png', alt: 'Fast Kitchen Hoods' },
  { src: '/images/Lennox.png', alt: 'Lennox' },
  { src: '/images/Mitsubishi.png', alt: 'Mitsubishi' },
  { src: '/images/Navien.png', alt: 'Navien' },
  { src: '/images/Rheem.png', alt: 'Rheem' },
  { src: '/images/Rinnai.png', alt: 'Rinnai' },
  { src: '/images/Tosot.png', alt: 'Tosot' },
  { src: '/images/Aquamatic logo.png', alt: 'Aquamatic' },
  { src: '/images/Sunair logo.jpg', alt: 'Sunair' },
  { src: '/images/Ventilation direct.png', alt: 'Ventilation Direct' },
  // duplicate set for seamless infinite loop
  { src: '/images/Trane.png', alt: 'Trane' },
  { src: '/images/York.png', alt: 'York' },
  { src: '/images/Captiveaire.png', alt: 'Captiveaire' },
  { src: '/images/Daikin.png', alt: 'Daikin' },
  { src: '/images/Fast Kitchen Hoods.png', alt: 'Fast Kitchen Hoods' },
  { src: '/images/Lennox.png', alt: 'Lennox' },
  { src: '/images/Mitsubishi.png', alt: 'Mitsubishi' },
  { src: '/images/Navien.png', alt: 'Navien' },
  { src: '/images/Rheem.png', alt: 'Rheem' },
  { src: '/images/Rinnai.png', alt: 'Rinnai' },
  { src: '/images/Tosot.png', alt: 'Tosot' },
  { src: '/images/Aquamatic logo.png', alt: 'Aquamatic' },
  { src: '/images/Sunair logo.jpg', alt: 'Sunair' },
  { src: '/images/Ventilation direct.png', alt: 'Ventilation Direct' },
];

const REAL = 14;

function getSlidesVisible() {
  if (typeof window === 'undefined') return 3;
  if (window.innerWidth < 640)  return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
}

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

export default function BrandCarousel() {
  const [current, setCurrent]                 = useState(0);
  const [slidesVisible, setSlidesVisible]     = useState(getSlidesVisible);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused]               = useState(false);
  const [dragStart, setDragStart]             = useState(null);
  const [dragOffset, setDragOffset]           = useState(0);
  const autoRef  = useRef(null);
  const trackRef = useRef(null);

  const [sectionRef, sectionInView] = useInView(0.05);

  // ── Resize ──
  useEffect(() => {
    function onResize() { setSlidesVisible(getSlidesVisible()); }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // ── Auto-play ──
  const startAuto = useCallback(() => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => setCurrent(p => p + 1), 2800);
  }, []);

  useEffect(() => {
    if (!isPaused) startAuto();
    return () => clearInterval(autoRef.current);
  }, [isPaused, startAuto]);

  // ── Infinite jump ──
  useEffect(() => {
    if (current >= REAL) {
      const t = setTimeout(() => {
        setIsTransitioning(false);
        setCurrent(p => p - REAL);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [current]);

  useEffect(() => {
    if (!isTransitioning) {
      const t = setTimeout(() => setIsTransitioning(true), 20);
      return () => clearTimeout(t);
    }
  }, [isTransitioning]);

  const slideW     = 100 / slidesVisible;
  const translateX =
    -(current * slideW) +
    (dragOffset / (trackRef.current?.offsetWidth || 1)) * 100 * slidesVisible;

  // ── Drag / swipe ──
  const onDragStart = (clientX) => {
    clearInterval(autoRef.current);
    setDragStart(clientX);
  };
  const onDragMove = (clientX) => {
    if (dragStart === null) return;
    setDragOffset(clientX - dragStart);
  };
  const onDragEnd = () => {
    if (dragStart === null) return;
    if (dragOffset < -50)     setCurrent(p => p + 1);
    else if (dragOffset > 50) setCurrent(p => Math.max(p - 1, 0));
    setDragStart(null);
    setDragOffset(0);
    if (!isPaused) startAuto();
  };

  return (
    // ── White section background ──
    <section 
      ref={sectionRef}
      className="w-full py-10 sm:py-12 lg:py-16 px-4 sm:px-8 lg:px-16 overflow-hidden transition-all duration-1000 ease-out"
      style={{
        opacity: sectionInView ? 1 : 0,
        transform: sectionInView ? 'translateY(0)' : 'translateY(30px)',
      }}
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-10 sm:mb-12">
          <span className="text-[#c3252e] text-xs font-bold uppercase tracking-widest block mb-3">
            Trusted Partners
          </span>
          <h2 id="metric-brands-heading" className="font-black text-2xl sm:text-3xl lg:text-4xl leading-tight">
            <span className="text-[#c3252e]">Brands </span>
            <span className="text-[#8f8cff]">We Work </span>
            <span className="text-white">With</span>
          </h2>
          <div className="w-12 h-1 rounded-full bg-gradient-to-r from-[#c3252e] via-[#8f8cff] to-white mx-auto mt-4" />
        </div>

        {/* ── Carousel ── */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            setDragStart(null);
            setDragOffset(0);
          }}
        >


          {/* Track */}
          <div
            ref={trackRef}
            className="overflow-hidden"
            onMouseDown={(e) => onDragStart(e.clientX)}
            onMouseMove={(e) => onDragMove(e.clientX)}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
            onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
            onTouchEnd={onDragEnd}
            style={{ cursor: dragStart !== null ? 'grabbing' : 'grab' }}
          >
            <div
              className="flex"
              style={{
                transform: `translateX(${translateX}%)`,
                transition:
                  isTransitioning && dragStart === null
                    ? 'transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                    : 'none',
                willChange: 'transform',
              }}
            >
              {BRANDS.map((brand, i) => (
                <div
                  key={i}
                  className="shrink-0 px-4 sm:px-6"
                  style={{ width: `${slideW}%` }}
                >
                  {/* Transparent centered slide, no card container */}
                  <div className="
                    flex items-center justify-center
                    h-24 sm:h-28 lg:h-32
                    transition-all duration-300
                    select-none
                    opacity-80 hover:opacity-100
                  ">
                    <img
                      src={brand.src}
                      alt={brand.alt}
                      draggable={false}
                      className="
                        max-h-16 sm:max-h-20 lg:max-h-24
                        max-w-[85%]
                        object-contain
                        transition-all duration-300
                        select-none
                      "
                      style={{ pointerEvents: 'none' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
