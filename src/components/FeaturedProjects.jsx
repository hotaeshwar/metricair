// src/components/FeaturedProjects.jsx
import React, { useEffect, useRef, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

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
    title: "SMOKE'S POUTINERIE",
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
    location: 'SAINT JOHN, NB',
    type: 'Commercial HVAC & Piping'
  }
];

export default function FeaturedProjects() {
  const [sectionRef, sectionInView] = useInView(0.02);
  const [projectsList, setProjectsList] = useState(PROJECTS);

  useEffect(() => {
    const q = query(collection(db, "featured_projects"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          image: doc.data().image || "",
          title: doc.data().title || "",
          location: doc.data().location || "",
          type: doc.data().type || ""
        }));
        setProjectsList(list);
      } else {
        setProjectsList(PROJECTS);
      }
    }, (err) => {
      console.error("Error fetching projects:", err);
      setProjectsList(PROJECTS);
    });
    return unsubscribe;
  }, []);

  return (
    <section
      id="metric-featured-projects-section"
      ref={sectionRef}
      className="w-full py-10 sm:py-12 lg:py-16 px-4 sm:px-8 lg:px-16 overflow-hidden transition-all duration-1000 ease-out"
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
          <h2 id="metric-projects-heading" className="font-black text-2xl sm:text-3xl lg:text-4xl text-[#c3252e] leading-tight">
            Featured Projects
          </h2>
          <div className="w-12 h-1 rounded-full bg-gradient-to-r from-[#c3252e] to-white mx-auto mt-4" />
          <p className="text-white text-sm max-w-xl mx-auto mt-4 leading-relaxed">
            A showcase of professional mechanical, electrical, plumbing, and kitchen exhaust engineering systems delivered to premier commercial venues across Ontario.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {projectsList.map((proj, idx) => {
            // Centering helper classes:
            // First 3 items are lg:col-span-2.
            // 4th item (idx = 3) is lg:col-span-2 lg:col-start-2.
            // 5th item (idx = 4) is lg:col-span-2.
            const gridColClass = 'lg:col-span-2';

            return (
              <div
                key={proj.title}
                className={`group relative flex flex-col ${gridColClass}`}
                style={{
                  opacity: sectionInView ? 1 : 0,
                  transform: sectionInView ? 'translateY(0)' : 'translateY(40px)',
                  transition: `opacity 0.7s ease ${idx * 0.15}s, transform 0.7s ease ${idx * 0.15}s`,
                }}
              >
                {/* Image Wrapper */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-black/40">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 select-none"
                    draggable="false"
                  />
                </div>

                {/* Badges/Text below image */}
                <div id={`metric-project-details-${idx}`} className="mt-3 flex flex-col gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {/* Title Badge */}
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded bg-[#8f8cff]/10 border border-[#8f8cff]/30 text-[#8f8cff] text-[10px] font-black uppercase tracking-wider">
                      {proj.title}
                    </span>
                    {/* Type Badge */}
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300 text-[10px] font-bold uppercase tracking-wider">
                      {proj.type}
                    </span>
                  </div>

                  {/* Place name slim badge below */}
                  <div className="flex items-center justify-start">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#c3252e]/10 border border-[#c3252e]/30 text-[#ff5c65]">
                      <svg className="w-2.5 h-2.5 shrink-0 text-[#ff5c65]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
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
