// src/components/ResidentialCooling.jsx
import React, { useEffect, useRef, useState } from 'react';
import {
  Shield, Wrench, RefreshCw, Thermometer, Wind, Droplets,
  ArrowRight, ChevronDown, CheckCircle,
} from 'lucide-react';
import LeadForm from './LeadForm';

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

/* ── Data ── */
const SERVICES = [
  {
    Icon: Shield,
    title: 'Maintain & Protect',
    desc: 'Keep your unit running at peak efficiency over its entire lifespan with annual maintenance and up to 21-point inspection.',
    color: '#e94560',
  },
  {
    Icon: Wrench,
    title: 'Repair',
    desc: "Home not cooling properly? Our licensed technicians service all makes and models and can fix many problems on the same day.",
    color: '#e94560',
  },
  {
    Icon: RefreshCw,
    title: 'Replace',
    desc: 'If you need to buy or rent a brand-new, high-efficiency air conditioner, we can help you find the right solution for your home.',
    color: '#e94560',
  },
];

const CENTRAL_STEPS = [
  {
    num: '01',
    Icon: Thermometer,
    title: 'Thermostat Triggers the System',
    desc: 'A central air conditioning system starts up when the attached thermostat senses that the temperature has increased above a preset level.',
  },
  {
    num: '02',
    Icon: Droplets,
    title: 'Refrigerant Absorbs Indoor Heat',
    desc: 'Liquid refrigerant inside the evaporator coil converts to gas. As warm humid indoor air passes over it, the coil absorbs heat and removes humidity, cooling the air.',
  },
  {
    num: '03',
    Icon: Wind,
    title: 'Cooled Air Circulates Your Home',
    desc: "The blower fan on your furnace circulates the cooled air through your home's ductwork and into the living areas.",
  },
  {
    num: '04',
    Icon: RefreshCw,
    title: 'Refrigerant Returns Outdoors',
    desc: 'The refrigerant gas travels outside through a copper pipe to the compressor. The compressor pressurizes the gas and moves it through the condenser coil, changing it back to liquid.',
  },
  {
    num: '05',
    Icon: Droplets,
    title: 'Condensate Is Drained Away',
    desc: 'The humidity pulled from the air turns into condensation, which is removed from the evaporator coil through the condensate drain line.',
  },
  {
    num: '06',
    Icon: ArrowRight,
    title: 'Cycle Repeats',
    desc: 'The heated air in the home circulates through the cold air returns to the system to be cooled and dehumidified again.',
  },
];

const DUCTLESS_POINTS = [
  { Icon: Wind,        text: 'Cools rooms only where an indoor unit is installed — targeted comfort.' },
  { Icon: RefreshCw,   text: 'Multiple indoor units (heads) can be powered by a single outdoor unit.' },
  { Icon: Shield,      text: 'No ductwork needed — ideal for older homes heated by a boiler.' },
  { Icon: Wrench,      text: 'Wired into your electrical panel — professional installation required by law.' },
  { Icon: CheckCircle, text: 'Indoor units come in wall-mounted, floor console and ceiling cassette styles.' },
];

/* ── Form data ── */
const EQUIPMENT_OPTIONS = ['– Select –','Air Conditioner/Ductless AC','Boiler','Heat Pump Ductless','Heat Pump Central','Furnace','Fireplace','Tankless Water Heater','Water Filtration','Water Softener','Reverse Osmosis'];
const WORKING_OPTIONS   = ['– Select –','Yes','No','Partially'];
const PROVINCES         = ['Ontario','British Columbia','Alberta','Quebec','Manitoba','Saskatchewan','Nova Scotia','New Brunswick','Prince Edward Island','Newfoundland and Labrador'];
const FORM_STEPS        = [
  { id: 1, short: 'Contact'   },
  { id: 2, short: 'Address'   },
  { id: 3, short: 'Equipment' },
  { id: 4, short: 'Details'   },
];

/* ── Custom Dropdown ── */
function CustomDropdown({ value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    function h(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  return (
    <div ref={ref} className="relative w-full">
      <button type="button" onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between bg-transparent border-b-2 border-white/20 px-0 py-3 text-sm text-left outline-none focus:border-[#3b82f6] transition-colors duration-200 cursor-pointer hover:border-white/40"
      >
        <span className={value && value !== '– Select –' ? 'text-white' : 'text-gray-500'}>{value}</span>
        <ChevronDown size={16} className={`text-[#3b82f6] transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <ul className="absolute top-full left-0 right-0 mt-1 z-50 bg-[#0d1233] border border-white/15 rounded-lg overflow-hidden shadow-2xl max-h-56 overflow-y-auto">
          {options.map((opt) => (
            <li key={opt} onClick={() => { onChange(opt); setOpen(false); }}
              className={`px-4 py-3 text-sm cursor-pointer transition-colors duration-150 ${
                value === opt ? 'bg-[#3b82f6] text-white font-semibold' : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >{opt}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ── LadderSection: image once + steps stacked ── */
function LadderSection({ steps, image, imageAlt, imageLeft, inView }) {
  const stepsBlock = (
    <div className="flex flex-col gap-0">
      {steps.map((step, i) => (
        <div
          key={step.num}
          className="flex gap-4 relative"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateX(0)' : imageLeft ? 'translateX(24px)' : 'translateX(-24px)',
            transition: `opacity 0.65s ease ${i * 0.12}s, transform 0.65s ease ${i * 0.12}s`,
          }}
        >
          {/* Timeline */}
          <div className="flex flex-col items-center shrink-0">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 shrink-0 z-10 bg-[#3b82f6]/15 border-[#3b82f6] text-[#3b82f6]">
              {step.num}
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 w-0.5 my-2 bg-[#3b82f6]/20 min-h-[24px]" />
            )}
          </div>
          {/* Content */}
          <div className="pb-7 pt-1.5">
            <h3 className="text-white font-black text-sm sm:text-base mb-1.5 flex items-center gap-2">
              <step.Icon size={16} className="text-[#3b82f6] shrink-0" />
              {step.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const imageBlock = (
    <div
      className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 w-full aspect-[4/3]"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0)' : imageLeft ? 'translateX(-24px)' : 'translateX(24px)',
        transition: 'opacity 0.75s ease 0.1s, transform 0.75s ease 0.1s',
      }}
    >
      <img src={image} alt={imageAlt} className="w-full h-full object-contain p-4" />
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
      {imageLeft ? <>{imageBlock}{stepsBlock}</> : <>{stepsBlock}{imageBlock}</>}
    </div>
  );
}

/* ════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════ */
export default function ResidentialCooling() {
  const [heroRef,     heroInView]     = useInView(0.05);
  const [servicesRef, servicesInView] = useInView(0.08);
  const [centralRef,  centralInView]  = useInView(0.05);
  const [ductlessRef, ductlessInView] = useInView(0.08);
  const [formRef,     formInView]     = useInView(0.05);

  /* accent is blue for cooling */
  const ACCENT = '#3b82f6';

  return (
    <section className="w-full bg-[#1a1a2e] text-white pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-32 px-4 sm:px-8 lg:px-16 overflow-hidden">

      <style>{`
        .split-btn-blue{position:relative;overflow:hidden;}
        .split-btn-blue::before{content:'';position:absolute;inset:0;right:50%;background:#3b82f6;transition:transform 0.38s cubic-bezier(0.77,0,0.175,1);z-index:0;}
        .split-btn-blue::after{content:'';position:absolute;inset:0;left:50%;background:#3b82f6;transition:transform 0.38s cubic-bezier(0.77,0,0.175,1);z-index:0;}
        .split-btn-blue:hover::before{transform:translateX(-100%);}
        .split-btn-blue:hover::after{transform:translateX(100%);}
        .split-btn-blue>span{position:relative;z-index:1;}
        .step-slide{transition:opacity 0.26s ease,transform 0.26s ease;}
      `}</style>

      <div className="max-w-7xl mx-auto flex flex-col gap-20 lg:gap-28">

        {/* ══ HERO ══ */}
        <div
          ref={heroRef}
          className="text-center max-w-4xl mx-auto"
          style={{
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <span className="text-[#3b82f6] text-xs font-bold uppercase tracking-widest block mb-4">Residential Solutions</span>
          <h1 className="font-black leading-tight text-4xl sm:text-5xl lg:text-6xl mb-5">
            <span className="text-[#e94560]">Home Cooling </span>
            <span className="text-[#3b82f6]">& Air </span><br />
            <span className="text-white">Conditioning</span>
          </h1>
          <div className="w-14 h-1 rounded-full bg-gradient-to-r from-[#e94560] via-[#3b82f6] to-white mx-auto mb-6" />
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Stay cool all summer with MetricAir's professional air conditioning services. From installation to repair and annual maintenance — we've got the GTA covered.
          </p>
        </div>

        {/* ══ SERVICES ══ */}
        <div ref={servicesRef}>
          <div
            className="text-center mb-10"
            style={{
              opacity: servicesInView ? 1 : 0,
              transform: servicesInView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <span className="text-[#3b82f6] text-xs font-bold uppercase tracking-widest block mb-3">What We Do</span>
            <h2 className="text-white font-black text-2xl sm:text-3xl lg:text-4xl">Our Cooling Services</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {SERVICES.map(({ Icon, title, desc }, i) => (
              <div
                key={title}
                className="flex flex-col gap-4 p-7 rounded-2xl bg-white/5 border border-white/8 hover:border-[#3b82f6]/40 hover:bg-white/8 transition-all duration-300 group"
                style={{
                  opacity: servicesInView ? 1 : 0,
                  transform: servicesInView ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 0.65s ease ${i * 0.12}s, transform 0.65s ease ${i * 0.12}s`,
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#3b82f6]/15 border border-[#3b82f6]/25 flex items-center justify-center group-hover:bg-[#3b82f6]/25 transition-colors duration-300">
                  <Icon size={22} className="text-[#3b82f6]" />
                </div>
                <h3 className="text-white font-black text-base">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ══ HOW AC WORKS ══ */}
        <div ref={centralRef}>
          <div
            className="text-center mb-12"
            style={{
              opacity: centralInView ? 1 : 0,
              transform: centralInView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <span className="inline-flex items-center gap-2 text-[#3b82f6] text-xs font-bold uppercase tracking-widest mb-3">
              <span className="w-6 h-px bg-[#3b82f6]" />How It Works<span className="w-6 h-px bg-[#3b82f6]" />
            </span>
            <h2 className="text-white font-black text-2xl sm:text-3xl lg:text-4xl">Central Air Conditioning</h2>
            <p className="text-gray-400 text-sm mt-4 max-w-2xl mx-auto leading-relaxed">
              Most central air conditioning systems are made up of indoor and outdoor units — called a "split" system. The outdoor unit contains a condenser coil, compressor, fan and electrical components. The indoor portion, called the evaporator coil or "A" coil, sits on top of your furnace.
            </p>
          </div>

          <LadderSection
            steps={CENTRAL_STEPS}
            image="/images/coolingres.jpg"
            imageAlt="Central air conditioning system diagram"
            imageLeft={false}
            inView={centralInView}
          />

          {/* Thermostat note */}
          <div
            className="mt-8 mx-auto max-w-lg text-center p-4 rounded-xl bg-[#3b82f6]/10 border border-[#3b82f6]/25"
            style={{ opacity: centralInView ? 1 : 0, transition: 'opacity 0.7s ease 0.6s' }}
          >
            <p className="text-[#3b82f6] text-xs font-bold uppercase tracking-wider mb-1">Pro Tip</p>
            <p className="text-gray-300 text-sm">A programmable thermostat can reduce cooling costs by up to 15% annually.</p>
          </div>
        </div>

        {/* ══ DUCTLESS AC — LADDER ══ */}
        <div ref={ductlessRef}>
          <div
            className="text-center mb-12"
            style={{
              opacity: ductlessInView ? 1 : 0,
              transform: ductlessInView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <span className="inline-flex items-center gap-2 text-[#3b82f6] text-xs font-bold uppercase tracking-widest mb-3">
              <span className="w-6 h-px bg-[#3b82f6]" />No Ducts? No Problem<span className="w-6 h-px bg-[#3b82f6]" />
            </span>
            <h2 className="text-white font-black text-2xl sm:text-3xl lg:text-4xl">Ductless Air Conditioning</h2>
            <p className="text-gray-400 text-sm mt-4 max-w-2xl mx-auto leading-relaxed">
              Ductless air conditioners are split systems with outdoor and indoor components connected by a copper conduit housing the power cable, refrigerant tubing, suction tubing and a condensate drain.
            </p>
          </div>

          {/* Ladder — info panel left, points right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* LEFT: image */}
            <div
              className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 aspect-[4/3]"
              style={{
                opacity: ductlessInView ? 1 : 0,
                transform: ductlessInView ? 'translateX(0)' : 'translateX(-24px)',
                transition: 'opacity 0.75s ease, transform 0.75s ease',
              }}
            >
              <img src="/images/coolingres.jpg" alt="Ductless air conditioning unit" className="w-full h-full object-contain p-4" />
            </div>

            {/* RIGHT: points */}
            <div className="flex flex-col gap-0">
              {DUCTLESS_POINTS.map((point, i) => (
                <div
                  key={i}
                  className="flex gap-4 relative"
                  style={{
                    opacity: ductlessInView ? 1 : 0,
                    transform: ductlessInView ? 'translateX(0)' : 'translateX(24px)',
                    transition: `opacity 0.65s ease ${i * 0.12}s, transform 0.65s ease ${i * 0.12}s`,
                  }}
                >
                  {/* Timeline */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-10 h-10 rounded-full bg-[#3b82f6]/15 border border-[#3b82f6]/30 flex items-center justify-center shrink-0 z-10">
                      <point.Icon size={16} className="text-[#3b82f6]" />
                    </div>
                    {i < DUCTLESS_POINTS.length - 1 && (
                      <div className="flex-1 w-0.5 my-2 bg-[#3b82f6]/20 min-h-[20px]" />
                    )}
                  </div>
                  {/* Text */}
                  <div className="pb-6 pt-2">
                    <p className="text-gray-300 text-sm leading-relaxed">{point.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ QUOTE FORM ══ */}
        <div ref={formRef} id="cooling-quote-form">
          <div
            className="text-center mb-10"
            style={{
              opacity: formInView ? 1 : 0,
              transform: formInView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <span className="text-[#3b82f6] text-xs font-bold uppercase tracking-widest block mb-3">Ready to Start?</span>
            <h2 className="text-white font-black text-2xl sm:text-3xl lg:text-4xl">Get Your Free Quote</h2>
            <div className="w-12 h-1 rounded-full bg-[#3b82f6] mx-auto mt-4" />
          </div>

          <div
            className="max-w-2xl mx-auto rounded-2xl bg-white/4 border border-white/10 overflow-hidden"
            style={{
              opacity: formInView ? 1 : 0,
              transform: formInView ? 'translateY(0)' : 'translateY(32px)',
              transition: 'opacity 0.85s ease 0.1s, transform 0.85s ease 0.1s',
            }}
          >
            <div className="p-7 sm:p-10">
              <LeadForm
                subject="Quote Request – Residential Cooling (Air Conditioning)"
                fromName="MetricAir Website"
                buttonText="Submit Request"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}