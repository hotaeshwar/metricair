// src/components/BrandCarousel.jsx
import React, { useRef, useState, useEffect, useCallback } from 'react';

const BRANDS = [
  { src: '/images/brand1.png', alt: 'Brand Partner 1' },
  { src: '/images/brand2.png', alt: 'Brand Partner 2' },
  { src: '/images/brand3.png', alt: 'Brand Partner 3' },
  { src: '/images/brand4.png', alt: 'Brand Partner 4' },
  // duplicate set for seamless infinite loop
  { src: '/images/brand1.png', alt: 'Brand Partner 1' },
  { src: '/images/brand2.png', alt: 'Brand Partner 2' },
  { src: '/images/brand3.png', alt: 'Brand Partner 3' },
  { src: '/images/brand4.png', alt: 'Brand Partner 4' },
];

const REAL = 4;

function getSlidesVisible() {
  if (typeof window === 'undefined') return 3;
  if (window.innerWidth < 640)  return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
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
    <section className="w-full bg-white py-14 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-10 sm:mb-12">
          <span className="text-[#e94560] text-xs font-bold uppercase tracking-widest block mb-3">
            Trusted Partners
          </span>
          <h2 className="text-gray-900 font-black text-2xl sm:text-3xl lg:text-4xl leading-tight">
            Brands We Work With
          </h2>
          <div className="w-12 h-1 rounded-full bg-[#e94560] mx-auto mt-4" />
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
          {/* Left fade — white */}
          <div
            className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #ffffff, transparent)' }}
          />
          {/* Right fade — white */}
          <div
            className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #ffffff, transparent)' }}
          />

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
                  {/* Card — white bg, light gray border */}
                  <div className="
                    flex items-center justify-center
                    rounded-xl
                    h-24 sm:h-28 lg:h-32
                    bg-white
                    border border-gray-100
                    shadow-sm
                    hover:shadow-md hover:border-[#e94560]/30
                    transition-all duration-300
                    select-none
                  ">
                    <img
                      src={brand.src}
                      alt={brand.alt}
                      draggable={false}
                      className="
                        max-h-16 sm:max-h-20 lg:max-h-24
                        max-w-[75%]
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