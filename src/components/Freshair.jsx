// src/components/FreshAir.jsx
import React, { useEffect, useRef, useState } from 'react';
import LeadForm from './LeadForm';
import { CheckCircle, ArrowRight } from 'lucide-react';

/* ── useInView ── */
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

/* ── accent ── */
const A = '#8f8cff'; // brand blue — fresh, clean air feel

/* ── Services data ── */
const SERVICES = [
  {
    img: '/images/exhaust.png',
    title: 'Air Cleaners',
    desc: 'We offer air cleaners to remove contaminants from your home\'s air. Our solutions integrate seamlessly with your HVAC system to filter out particles and allergens, providing cleaner and healthier air throughout your living space.',
    highlight: 'Removes particles & allergens',
  },
  {
    img: '/images/car.png',
    title: 'Air Filters',
    desc: 'MetricAir ensures every air filter we encounter is clean and properly functioning — a key component of any HVAC system. We educate customers on the importance of regularly cleaning and replacing filters to maintain healthy air quality.',
    highlight: 'Regular inspection & replacement',
  },
  {
    img: '/images/humidifier.png',
    title: 'Humidifiers',
    desc: 'Let us help you maintain the right humidity level in your home with our humidifier services. We integrate humidifiers with your existing HVAC system to ensure consistent humidity levels throughout your property.',
    highlight: 'Consistent whole-home humidity',
  },
  {
    img: '/images/dehumdifier.png',
    title: 'Dehumidifiers',
    desc: 'Our goal is to create a healthy living environment for everyone in your home. We offer comprehensive dehumidifier services — ensuring your unit integrates with your HVAC system to remove excess moisture and prevent mold and mildew.',
    highlight: 'Prevents mold & mildew',
  },
  {
    img: '/images/ventilation.png',
    title: 'Ventilation Systems',
    desc: 'A crucial part of maintaining a healthy indoor environment is a reliable ventilation system. With our advanced services, we don\'t stop until fresh air is continuously and reliably circulating throughout your home.',
    highlight: 'Continuous fresh air circulation',
  },
  {
    img: '/images/res_uv_ai.png',
    title: 'UV Germicidal Lights',
    desc: 'We use UV germicidal lights to target bacteria, viruses, and mold spores. MetricAir eliminates air contaminants to create a healthier indoor environment for every household member.',
    highlight: 'Kills bacteria, viruses & mold spores',
  },
];

/* ── Why it matters stats ── */
const STATS = [
  { val: '5×',   label: 'Indoor air can be up to 5× more polluted than outdoor air' },
  { val: '90%',  label: 'Of time spent indoors — air quality directly affects health' },
  { val: '21pt', label: 'Inspection checklist on every service visit' },
];

/* ── Benefits list ── */
const BENEFITS = [
  'Reduce respiratory issues and allergies',
  'Eliminate airborne bacteria, viruses and mold spores',
  'Control humidity for year-round comfort',
  'Protect your HVAC system and extend its lifespan',
  'Improve sleep quality and overall well-being',
  'Certified technicians all over Canada — all makes and models serviced',
];

/* ════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════ */
export default function FreshAir() {
  const [heroRef,     heroInView]     = useInView(0.05);
  const [statsRef,    statsInView]    = useInView(0.1);
  const [introRef,    introInView]    = useInView(0.08);
  const [servicesRef, servicesInView] = useInView(0.05);
  const [benefitsRef, benefitsInView] = useInView(0.08);
  const [formRef,     formInView]     = useInView(0.05);

  return (
    <section className="w-full bg-[#1a1a2e] text-white pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-32 px-4 sm:px-8 lg:px-16 overflow-hidden">

      <style>{`
        .split-btn-red{position:relative;overflow:hidden;}
        .split-btn-red::before{content:'';position:absolute;inset:0;right:50%;background:#c3252e !important;transition:transform 0.38s cubic-bezier(0.77,0,0.175,1);z-index:0;}
        .split-btn-red::after{content:'';position:absolute;inset:0;left:50%;background:#c3252e !important;transition:transform 0.38s cubic-bezier(0.77,0,0.175,1);z-index:0;}
        .split-btn-red:hover::before{transform:translateX(-100%);}
        .split-btn-red:hover::after{transform:translateX(100%);}
        .split-btn-red>span{position:relative;z-index:1;}
        .service-card:hover .service-icon{transform:scale(1.1) rotate(-6deg);}
        .service-icon{transition:transform 0.3s ease;}
        .white-icon{filter: brightness(0) invert(1) !important;}
      `}</style>

      <div className="max-w-7xl mx-auto flex flex-col gap-20 lg:gap-28">

        {/* ══ HERO ══ */}
        <div
          ref={heroRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Left text */}
          <div
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <span className="text-xs font-bold uppercase tracking-widest block mb-4">
              <span className="text-[#c3252e]">Residential </span>
              <span className="text-[#8f8cff]">Solutions</span>
            </span>
            <h1 id="metric-freshair-heading" className="font-black leading-tight text-4xl sm:text-5xl lg:text-6xl mb-5">
              <span className="text-[#c3252e]">Fresh Air </span>
              <span className="text-[#8f8cff]">& </span><br />
              <span className="text-white">Indoor Air Quality</span>
            </h1>
            <div className="w-14 h-1 rounded-full mb-6 bg-gradient-to-r from-[#c3252e] via-[#8f8cff] to-white" />
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-6">
              MetricAir is Canada's trusted indoor air quality expert. We have a dedicated home air quality team focused on air duct cleaning, dehumidifiers, ionizers and more — because we care about your family's well-being.
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              Whether you need an air duct cleaning or a new air filtration system, MetricAir will guide you through every step of improving your indoor air quality.
            </p>
            <button
              onClick={() => document.getElementById('freshair-quote')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 split-btn-red px-7 py-3.5 rounded-xl text-white text-sm font-bold"
            >
              <span className="flex items-center gap-2">
                Schedule an Appointment
                <ArrowRight size={16} />
              </span>
            </button>
          </div>

          {/* Right — freshair.jpg image */}
          <div
            className="relative"
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? 'translateX(0)' : 'translateX(40px)',
              transition: 'opacity 0.85s cubic-bezier(0.22,1,0.36,1) 0.1s, transform 0.85s cubic-bezier(0.22,1,0.36,1) 0.1s',
            }}
          >
            {/* Red accent corners */}
            <div className="absolute -top-3 -left-3 w-16 h-16 rounded-tl-2xl z-10 pointer-events-none" style={{ borderTop: `4px solid ${A}`, borderLeft: `4px solid ${A}` }} />
            <div className="absolute -bottom-3 -right-3 w-16 h-16 rounded-br-2xl z-10 pointer-events-none" style={{ borderBottom: `4px solid ${A}`, borderRight: `4px solid ${A}` }} />
            {/* Shadow card */}
            <div className="absolute inset-0 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)', border: '1px solid rgba(255,255,255,0.1)', transform: 'translate(8px,8px)' }} />
            <div className="relative rounded-2xl overflow-hidden bg-white" style={{ background: '#ffffff' }}>
              <img
                src="/images/freshair.jpg"
                alt="Fresh air and indoor air quality"
                className="w-full h-[280px] sm:h-[360px] lg:h-[420px] object-contain object-center rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* ══ STATS STRIP ══ */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5"
        >
          {STATS.map((s, i) => (
            <div
              key={s.val}
              className="flex items-center gap-5 p-6 rounded-2xl border border-white/8 bg-white/4 hover:border-opacity-60 transition-all duration-300"
              style={{
                opacity: statsInView ? 1 : 0,
                transform: statsInView ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.65s ease ${i * 0.12}s, transform 0.65s ease ${i * 0.12}s`,
                borderColor: statsInView ? `${A}30` : undefined,
              }}
            >
              <span className="font-black text-3xl sm:text-4xl shrink-0" style={{ color: A }}>{s.val}</span>
              <p className="text-gray-400 text-sm leading-snug">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ══ INTRO PANEL ══ */}
        <div
          ref={introRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center rounded-2xl p-8 sm:p-12 border"
          style={{
            background: `linear-gradient(135deg, ${A}10 0%, transparent 60%)`,
            borderColor: `${A}20`,
            opacity: introInView ? 1 : 0,
            transform: introInView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {/* Text */}
          <div>
            <span className="text-xs font-bold uppercase tracking-widest block mb-3" style={{ color: A }}>
              MetricAir's Commitment
            </span>
            <h2 className="text-white font-black text-2xl sm:text-3xl lg:text-4xl leading-tight mb-5">
              Comprehensive Indoor Air Quality<br />
              <span className="text-[#c3252e]">Services </span>
              <span className="text-[#8f8cff]">for all of Canada</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-4">
              MetricAir provides Canada's trusted indoor air quality solutions because we have a dedicated home air quality team that focuses on things like air duct cleaning, air dehumidifiers, and ionizers. We care about each customer's well-being and want their homes to be as healthy a living environment as possible.
            </p>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Whether you need an air duct cleaning or a new air filtration system, MetricAir will help you through every step of improving your indoor air quality. Contact us or go online to schedule an appointment today.
            </p>
          </div>
          {/* ahu.jpg */}
          <div className="rounded-2xl overflow-hidden" style={{ background: '#1a1a2e' }}>
            <img
              src="/images/ahu.jpg"
              alt="Air handling unit"
              className="w-full h-[240px] sm:h-[300px] object-cover object-center rounded-2xl"
            />
          </div>
        </div>

        {/* ══ SERVICES GRID ══ */}
        <div ref={servicesRef}>
          <div
            className="text-center mb-12"
            style={{
              opacity: servicesInView ? 1 : 0,
              transform: servicesInView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <span className="text-xs font-bold uppercase tracking-widest block mb-3" style={{ color: A }}>
              What We Offer
            </span>
            <h2 className="text-white font-black text-2xl sm:text-3xl lg:text-4xl">
              Specialized Indoor Air Quality Solutions
            </h2>
            <p className="text-gray-400 text-sm mt-3 max-w-xl mx-auto">
              Six dedicated services — each designed to tackle a different aspect of your home's air quality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map(({ img, title, desc, highlight }, i) => (
              <div
                key={title}
                className="service-card flex flex-col gap-4 p-7 rounded-2xl bg-white/5 border border-white/8 transition-all duration-300 hover:-translate-y-1"
                style={{
                  opacity: servicesInView ? 1 : 0,
                  transform: servicesInView ? 'translateY(0)' : 'translateY(28px)',
                  transition: `opacity 0.65s ease ${i * 0.1}s, transform 0.65s ease ${i * 0.1}s, border-color 0.3s, box-shadow 0.3s`,
                  ...(servicesInView ? {} : {}),
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = `${A}50`}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
              >
                {/* Icon */}
                <div
                  className="service-icon w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${A}15`, border: `1px solid ${A}25` }}
                >
                  <img
                    src={img}
                    alt={title}
                    className="w-10 h-10 object-contain white-icon"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-white font-black text-base">{title}</h3>
                  {/* Highlight badge */}
                  <span
                    className="inline-block self-start px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ background: `${A}15`, color: A }}
                  >
                    {highlight}
                  </span>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ══ BENEFITS ══ */}
        <div
          ref={benefitsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
        >
          {/* Left */}
          <div
            style={{
              opacity: benefitsInView ? 1 : 0,
              transform: benefitsInView ? 'translateX(0)' : 'translateX(-36px)',
              transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <span className="text-xs font-bold uppercase tracking-widest block mb-3" style={{ color: A }}>The Difference</span>
            <h2 className="text-white font-black text-2xl sm:text-3xl lg:text-4xl leading-tight mb-5">
              Why Invest in<br />
              <span className="text-[#c3252e]">Indoor Air </span>
              <span className="text-[#8f8cff]">Quality?</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              The air inside your home directly affects your health, comfort and HVAC system performance. MetricAir's indoor air quality solutions deliver measurable improvements you'll feel every day.
            </p>
          </div>

          {/* Right — fahu.jpg + benefits list */}
          <div className="flex flex-col gap-4">
            {/* fahu.jpg — bg matches page dark navy, no border card */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: '#1a1a2e',
                opacity: benefitsInView ? 1 : 0,
                transform: benefitsInView ? 'translateX(0)' : 'translateX(24px)',
                transition: 'opacity 0.7s ease, transform 0.7s ease',
              }}
            >
              <img
                src="/images/fahu.jpg"
                alt="Fresh air handling unit"
                className="w-full h-[200px] sm:h-[240px] object-cover object-center"
              />
            </div>
            {/* Benefits checklist */}
            <div className="flex flex-col gap-3">
              {BENEFITS.map((benefit, i) => (
                <div
                  key={benefit}
                  className="flex items-start gap-3 p-4 rounded-xl border border-white/8 bg-white/4 hover:border-opacity-50 transition-all duration-300"
                  style={{
                    opacity: benefitsInView ? 1 : 0,
                    transform: benefitsInView ? 'translateX(0)' : 'translateX(24px)',
                    transition: `opacity 0.6s ease ${0.1 + i * 0.1}s, transform 0.6s ease ${0.1 + i * 0.1}s`,
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = `${A}40`}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                >
                  <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: A }} />
                  <p className="text-gray-300 text-sm leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ QUOTE FORM ══ */}
        <div ref={formRef} id="freshair-quote">
          <div
            className="text-center mb-10"
            style={{
              opacity: formInView ? 1 : 0,
              transform: formInView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <span className="text-xs font-bold uppercase tracking-widest block mb-3" style={{ color: A }}>Ready to Breathe Easier?</span>
            <h2 className="text-white font-black text-2xl sm:text-3xl lg:text-4xl">Get Your Free Quote</h2>
            <div className="w-12 h-1 rounded-full mx-auto mt-4" style={{ background: A }} />
          </div>

          <div
            className="max-w-2xl mx-auto rounded-2xl bg-white/4 border border-white/10 p-7 sm:p-10"
            style={{
              opacity: formInView ? 1 : 0,
              transform: formInView ? 'translateY(0)' : 'translateY(32px)',
              transition: 'opacity 0.85s ease 0.1s, transform 0.85s ease 0.1s',
            }}
          >
            <LeadForm 
              subject="Fresh Air / IAQ Quote Request" 
              fromName="MetricAir IAQ" 
              buttonText="Get Free Quote" 
              buttonClass="split-btn-red"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
