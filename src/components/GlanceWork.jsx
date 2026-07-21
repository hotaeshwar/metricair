import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const IMAGES = [
  { src: '/images/Glance.jpeg', alt: 'Featured Mechanical Installation' },
  { src: '/images/mechanical8.jpeg', alt: 'Industrial Boiler and Piping' },
  { src: '/images/mechanicalwork2.jpeg', alt: 'HVAC Duct and Gas Line Work' },
  // Duplicate for infinite loop scrolling
  { src: '/images/Glance.jpeg', alt: 'Featured Mechanical Installation' },
  { src: '/images/mechanical8.jpeg', alt: 'Industrial Boiler and Piping' },
  { src: '/images/mechanicalwork2.jpeg', alt: 'HVAC Duct and Gas Line Work' },
];

const REAL_COUNT = 3;

function getSlidesVisible() {
  if (typeof window === 'undefined') return 3;
  if (window.innerWidth < 640) return 1;
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

export default function GlanceWork() {
  const [sectionRef, sectionInView] = useInView(0.05);
  const [current, setCurrent] = useState(0);
  const [slidesVisible, setSlidesVisible] = useState(getSlidesVisible);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [imagesList, setImagesList] = useState(IMAGES);
  const [realCount, setRealCount] = useState(REAL_COUNT);

  useEffect(() => {
    const q = query(collection(db, "glance_work"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          src: doc.data().image || "",
          alt: doc.data().alt || "Glance of Work"
        }));
        setRealCount(list.length);
        setImagesList([...list, ...list, ...list]);
      } else {
        setRealCount(REAL_COUNT);
        setImagesList(IMAGES);
      }
    }, (err) => {
      console.error("Error fetching glance work:", err);
      setRealCount(REAL_COUNT);
      setImagesList(IMAGES);
    });
    return unsubscribe;
  }, []);

  // Handle responsive resizing
  useEffect(() => {
    function handleResize() {
      setSlidesVisible(getSlidesVisible());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play scrolling
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Infinite jump reset
  useEffect(() => {
    if (current >= realCount) {
      const t = setTimeout(() => {
        setIsTransitioning(false);
        setCurrent((prev) => prev - realCount);
      }, 700);
      return () => clearTimeout(t);
    }
  }, [current, realCount]);

  useEffect(() => {
    if (!isTransitioning) {
      const t = setTimeout(() => setIsTransitioning(true), 50);
      return () => clearTimeout(t);
    }
  }, [isTransitioning]);

  const slideW = 100 / slidesVisible;
  const translateX = -(current * slideW);

  return (
    <section
      ref={sectionRef}
      className="w-full py-10 sm:py-12 lg:py-16 px-4 sm:px-8 lg:px-16 overflow-hidden"
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
          <h2 id="metric-glance-heading" className="font-black text-2xl sm:text-3xl lg:text-4xl text-white leading-tight">
            Glance at Our Work
          </h2>
          <div className="w-12 h-1 rounded-full bg-gradient-to-r from-[#c3252e] to-[#8f8cff] mx-auto mt-4" />
        </div>

        {/* Carousel Container */}
        <div 
          className="relative w-full overflow-hidden"
          style={{
            opacity: sectionInView ? 1 : 0,
            transform: sectionInView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <div 
            className="flex"
            style={{
              transform: `translateX(${translateX}%)`,
              transition: isTransitioning ? 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
              willChange: 'transform',
            }}
          >
            {imagesList.map((img, idx) => (
              <div
                key={idx}
                className="shrink-0 px-3 sm:px-4 select-none"
                style={{ width: `${slideW}%` }}
              >
                {/* Woven into separate card container styling */}
                <div className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#c3252e]/40 shadow-xl transition-all duration-500">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/20">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover select-none"
                      draggable="false"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
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
