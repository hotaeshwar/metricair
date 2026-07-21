// src/components/Careers.jsx
import React, { useEffect, useRef, useState } from 'react';
import LeadForm from './LeadForm';
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import {
  DollarSign,
  GraduationCap,
  Clock,
  Wrench,
  Users,
  MapPin,
} from 'lucide-react';

/* ── useInView ── */
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

/* ── Data ── */
const PERKS = [
  { title: 'Competitive Pay',     desc: 'Industry-leading wages that reflect your skills, certifications, and experience.',              Icon: DollarSign   },
  { title: 'Training & Growth',   desc: 'Ongoing certifications, manufacturer training, and clear pathways to senior roles.',            Icon: GraduationCap },
  { title: 'Flexible Scheduling', desc: 'We respect your time. Shifts designed around you — not the other way around.',                  Icon: Clock        },
  { title: 'Full Equipment',      desc: 'All tools, vehicles, and protective equipment provided — you focus on the work.',               Icon: Wrench       },
  { title: 'Great Team Culture',  desc: 'A crew that has your back. Respectful, experienced colleagues who take pride in their work.',   Icon: Users        },
  { title: 'Canada-wide Coverage', desc: 'Work across Canada with our local dispatch and regional offices.',            Icon: MapPin       },
];

const VALUES = [
  { label: 'Safety First',   desc: 'Every job, every time — no shortcuts.' },
  { label: 'Quality Work',   desc: 'We take pride in getting it right.' },
  { label: 'Respect Always', desc: 'For our team, clients, and community.' },
  { label: 'Keep Learning',  desc: 'HVAC evolves — so do we.' },
];



/* ══════════════════════════════════════════
   Main Component
══════════════════════════════════════════ */
export default function Careers() {
  const [heroRef,  heroInView]  = useInView(0.05);
  const [perksRef, perksInView] = useInView(0.08);
  const [rolesRef, rolesInView] = useInView(0.08);
  const [valRef,   valInView]   = useInView(0.08);
  const [formRef,  formInView]  = useInView(0.05);

  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "vacancies"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const v = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVacancies(v);
      setLoading(false);
    }, (error) => {
      console.error("Error subscribing to vacancies:", error);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const displayRoles = vacancies;

  return (
    <section className="w-full bg-[#1a1a2e] text-white pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-28 px-4 sm:px-8 lg:px-16 overflow-hidden">

      <style>{`
        .split-btn { position:relative; overflow:hidden; }
        .split-btn::before { content:''; position:absolute; inset:0; right:50%; background:#c3252e; transition:transform 0.38s cubic-bezier(0.77,0,0.175,1); z-index:0; }
        .split-btn::after  { content:''; position:absolute; inset:0; left:50%;  background:#c3252e; transition:transform 0.38s cubic-bezier(0.77,0,0.175,1); z-index:0; }
        .split-btn:hover::before { transform:translateX(-100%); }
        .split-btn:hover::after  { transform:translateX(100%); }
        .split-btn > span { position:relative; z-index:1; }
      `}</style>

      <div className="max-w-7xl mx-auto flex flex-col gap-20 lg:gap-28">

        {/* ══ HERO ══ */}
        <div
          ref={heroRef}
          className="text-center max-w-4xl mx-auto"
          style={{
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <span className="text-[#c3252e] text-xs font-bold uppercase tracking-widest block mb-4">Join Our Team</span>
          <h1 id="metric-careers-heading" className="font-black leading-tight text-4xl sm:text-5xl lg:text-6xl mb-6">
            <span className="text-[#c3252e]">Build a </span>
            <span className="text-[#8f8cff]">Career in</span><br />
            <span className="text-white">MEP</span>
          </h1>
          <div className="w-24 h-1 rounded-full bg-gradient-to-r from-[#c3252e] via-[#8f8cff] to-white mx-auto mb-6" />
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            MetricAir is growing all over Canada and we're looking for passionate, skilled individuals to join our crew. Whether you're a seasoned technician or just starting out — there's a place for you here.
          </p>

          {/* Stat pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            {[
              { val: '20+',  label: 'Years in Business' },
              { val: 'Canada',  label: 'Wide Coverage'     },
              { val: '100%', label: 'Licensed & Insured' },
            ].map((s, i) => (
              <div
                key={s.label}
                className="flex flex-col items-center px-6 py-4 rounded-2xl bg-white/5 border border-white/10"
                style={{
                  opacity: heroInView ? 1 : 0,
                  transform: heroInView ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 0.6s ease ${0.3 + i * 0.1}s, transform 0.6s ease ${0.3 + i * 0.1}s`,
                }}
              >
                <span className="text-[#c3252e] font-black text-2xl">{s.val}</span>
                <span className="text-gray-500 text-xs mt-1 uppercase tracking-wider">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ══ PERKS ══ */}
        <div ref={perksRef}>
          <div
            className="text-center mb-10"
            style={{
              opacity: perksInView ? 1 : 0,
              transform: perksInView ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <span className="text-[#c3252e] text-xs font-bold uppercase tracking-widest block mb-3">Why MetricAir</span>
            <h2 className="text-white font-black text-2xl sm:text-3xl lg:text-4xl">What We Offer</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PERKS.map(({ title, desc, Icon }, i) => (
              <div
                key={title}
                className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/8 hover:border-[#c3252e]/35 hover:bg-white/8 transition-all duration-300"
                style={{
                  opacity: perksInView ? 1 : 0,
                  transform: perksInView ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 0.08}s, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 0.08}s`,
                }}
              >
                <div className="text-[#c3252e] shrink-0 mt-0.5">
                  <Icon size={26} strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm mb-1.5">{title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ OPEN ROLES + VALUES ══ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Open Roles */}
          <div
            ref={rolesRef}
            style={{
              opacity: rolesInView ? 1 : 0,
              transform: rolesInView ? 'translateX(0)' : 'translateX(-36px)',
              transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <span className="text-[#c3252e] text-xs font-bold uppercase tracking-widest block mb-3">Currently Hiring</span>
            <h2 className="text-white font-black text-2xl sm:text-3xl mb-6">Open Positions</h2>

            <div className="flex flex-col gap-3">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-8 gap-2">
                  <div className="w-6 h-6 border-2 border-[#c3252e] border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-500 text-xs">Checking open roles...</p>
                </div>
              ) : displayRoles.length === 0 ? (
                <div className="p-6 rounded-xl bg-white/3 border border-white/5 text-center">
                  <p className="text-gray-400 text-sm font-semibold">No Open Positions</p>
                  <p className="text-gray-500 text-xs mt-1">We don't have active vacancies right now, but we'd love to hear from you!</p>
                </div>
              ) : (
                displayRoles.map(({ title, type, location }, i) => (
                  <div
                    key={title + "_" + i}
                    className="flex items-center justify-between p-5 rounded-xl bg-white/5 border border-white/8 hover:border-[#c3252e]/40 hover:bg-white/8 transition-all duration-300 group"
                    style={{
                      opacity: rolesInView ? 1 : 0,
                      transform: rolesInView ? 'translateX(0)' : 'translateX(-20px)',
                      transition: `opacity 0.6s ease ${0.1 + i * 0.1}s, transform 0.6s ease ${0.1 + i * 0.1}s`,
                    }}
                  >
                    <div>
                      <p className="text-white font-semibold text-sm group-hover:text-[#c3252e] transition-colors duration-200">{title}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <MapPin size={11} className="text-gray-500" />
                        <p className="text-gray-500 text-xs">{location}</p>
                      </div>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full border border-white/15 text-gray-400 shrink-0">{type}</span>
                  </div>
                ))
              )}

              {/* Open application banner */}
              <div className="mt-2 p-5 rounded-xl border border-dashed border-white/15 text-center">
                <p className="text-gray-500 text-sm">Don't see your role?</p>
                <p className="text-gray-400 text-sm mt-1">
                  Send an <span className="text-[#c3252e] font-medium">open application</span> — we're always looking for great people.
                </p>
              </div>
            </div>
          </div>

          {/* Our Values */}
          <div
            ref={valRef}
            style={{
              opacity: valInView ? 1 : 0,
              transform: valInView ? 'translateX(0)' : 'translateX(36px)',
              transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s, transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s',
            }}
          >
            <span className="text-[#c3252e] text-xs font-bold uppercase tracking-widest block mb-3">How We Operate</span>
            <h2 className="text-white font-black text-2xl sm:text-3xl mb-6">Our Values</h2>

            <div className="flex flex-col gap-5">
              {VALUES.map(({ label, desc }, i) => (
                <div
                  key={label}
                  className="flex items-start gap-4"
                  style={{
                    opacity: valInView ? 1 : 0,
                    transform: valInView ? 'translateX(0)' : 'translateX(20px)',
                    transition: `opacity 0.6s ease ${0.2 + i * 0.1}s, transform 0.6s ease ${0.2 + i * 0.1}s`,
                  }}
                >
                  <div className="w-8 h-8 rounded-full bg-[#c3252e]/15 border border-[#c3252e]/30 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[#c3252e] font-black text-xs">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{label}</p>
                    <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden">
              <div className="absolute top-3 right-4 text-[#c3252e]/20 font-black text-6xl leading-none select-none pointer-events-none" style={{ fontFamily: 'Georgia, serif' }}>"</div>
              <p className="text-gray-300 text-sm leading-relaxed italic relative z-10">
                We treat every technician like a professional — because that's exactly what they are. When our people grow, our company grows.
              </p>
              <p className="text-[#c3252e] text-xs font-bold mt-3 uppercase tracking-wider">— MetricAir Leadership</p>
            </div>
          </div>
        </div>

        {/* ══ APPLICATION FORM ══ */}
        <div
          ref={formRef}
          style={{
            opacity: formInView ? 1 : 0,
            transform: formInView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <div className="text-center mb-10">
            <span className="text-[#c3252e] text-xs font-bold uppercase tracking-widest block mb-3">Ready to Apply?</span>
            <h2 className="text-white font-black text-2xl sm:text-3xl lg:text-4xl">Submit Your Application</h2>
            <div className="w-12 h-1 rounded-full bg-[#c3252e] mx-auto mt-4" />
          </div>

          <div className="max-w-3xl mx-auto rounded-2xl bg-white/4 border border-white/10 p-6 sm:p-10">
            <LeadForm
              subject="Careers / Job Application"
              fromName="MetricAir Careers"
              buttonText="Submit Application"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
