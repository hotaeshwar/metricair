// src/components/ResidentialCooling.jsx
import React, { useEffect, useRef, useState } from 'react';
import {
  Shield, Wrench, RefreshCw, Thermometer, Wind, Droplets,
  ArrowRight, ChevronDown, CheckCircle,
} from 'lucide-react';

/* ── useInView ── */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
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

  /* ── Stepper ── */
  const [currentStep, setCurrentStep] = useState(1);
  const [direction,   setDirection]   = useState('forward');
  const [animating,   setAnimating]   = useState(false);
  const [status,      setStatus]      = useState('idle');

  const [form, setForm] = useState({
    firstName: '', lastName: '', phone: '', email: '',
    address: '', city: '', province: 'Ontario', postal: '',
    equipment: '– Select –', working: '– Select –',
    message: '',
  });

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const goToStep = (next) => {
    if (animating) return;
    setDirection(next > currentStep ? 'forward' : 'back');
    setAnimating(true);
    setTimeout(() => { setCurrentStep(next); setAnimating(false); }, 260);
  };

  const canAdvance = () => {
    if (currentStep === 1) return form.firstName && form.lastName && form.phone && form.email;
    if (currentStep === 2) return form.address && form.city && form.postal;
    if (currentStep === 3) return form.equipment !== '– Select –' && form.working !== '– Select –';
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const payload = new FormData();
    payload.append('access_key',  'ba99ae3b-60cc-404c-b207-2a42e86aafb6');
    payload.append('subject',     `Quote Request – Cooling – ${form.firstName} ${form.lastName}`);
    payload.append('from_name',   'MetricAir Website');
    payload.append('email',       form.email);
    payload.append('reply_to',    form.email);
    payload.append('to',          'metricairlimited.ca@gmail.com');
    payload.append('message',
      `COOLING QUOTE REQUEST – METRICAIR\n\n` +
      `Name:       ${form.firstName} ${form.lastName}\nPhone:      ${form.phone}\nEmail:      ${form.email}\n\n` +
      `Address:    ${form.address}, ${form.city}, ${form.province} ${form.postal}\n\n` +
      `Equipment:  ${form.equipment}\nWorking:    ${form.working}\n\nMessage:\n${form.message}\n\nSubmitted: ${new Date().toLocaleString()}`
    );
    try {
      const res  = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: payload });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setCurrentStep(1);
        setForm({ firstName:'',lastName:'',phone:'',email:'',address:'',city:'',province:'Ontario',postal:'',equipment:'– Select –',working:'– Select –',message:'' });
      } else throw new Error();
    } catch { setStatus('error'); }
  };

  const slideClass = animating
    ? direction === 'forward' ? 'opacity-0 translate-x-6' : 'opacity-0 -translate-x-6'
    : 'opacity-100 translate-x-0';

  const inputCls = `w-full bg-transparent border-b-2 border-white/20 px-0 py-3 text-white text-sm placeholder-gray-500 outline-none focus:border-[#3b82f6] transition-colors duration-200`;

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
          <h1 className="text-white font-black leading-tight text-4xl sm:text-5xl lg:text-6xl mb-5">
            Home Cooling &<br /><span className="text-[#3b82f6]">Air Conditioning</span>
          </h1>
          <div className="w-14 h-1 rounded-full bg-[#3b82f6] mx-auto mb-6" />
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
            {status === 'success' ? (
              <div className="flex flex-col items-center gap-5 py-16 px-8 text-center">
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-20 h-20 rounded-full border border-[#3b82f6]/30 animate-ping" style={{ animationDuration: '2s' }} />
                  <div className="w-16 h-16 rounded-full bg-[#3b82f6]/15 border border-[#3b82f6]/40 flex items-center justify-center">
                    <CheckCircle size={32} className="text-[#3b82f6]" />
                  </div>
                </div>
                <h3 className="text-white font-black text-2xl">Quote Request Sent!</h3>
                <p className="text-gray-400 text-sm max-w-xs leading-relaxed">We'll review your details and get back to you within 24 hours with a personalized cooling quote.</p>
                <button onClick={() => setStatus('idle')} className="text-gray-500 text-sm underline hover:text-white transition-colors">Submit another request</button>
              </div>
            ) : (
              <div className="p-7 sm:p-10">

                {/* Step indicator */}
                <div className="flex items-center justify-between mb-8">
                  {FORM_STEPS.map((step, idx) => {
                    const isCompleted = currentStep > step.id;
                    const isActive    = currentStep === step.id;
                    return (
                      <React.Fragment key={step.id}>
                        <div className="flex flex-col items-center gap-1.5">
                          <button type="button" onClick={() => { if (isCompleted) goToStep(step.id); }} disabled={!isCompleted} className="focus:outline-none">
                            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 font-bold text-sm transition-all duration-300 ${
                              isCompleted ? 'bg-[#3b82f6] border-[#3b82f6] text-white cursor-pointer hover:scale-110'
                              : isActive   ? 'bg-[#3b82f6]/15 border-[#3b82f6] text-[#3b82f6]'
                              : 'bg-transparent border-white/20 text-gray-600 cursor-default'
                            }`}>
                              {isCompleted
                                ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                                : step.id}
                            </div>
                          </button>
                          <span className={`text-xs font-semibold uppercase tracking-wide hidden sm:block transition-colors duration-300 ${isActive ? 'text-[#3b82f6]' : isCompleted ? 'text-gray-300' : 'text-gray-600'}`}>{step.short}</span>
                        </div>
                        {idx < FORM_STEPS.length - 1 && (
                          <div className="flex-1 h-px mx-2 relative max-w-[60px]">
                            <div className="absolute inset-0 bg-white/10 rounded" />
                            <div className="absolute inset-0 bg-[#3b82f6] rounded transition-all duration-500" style={{ width: currentStep > step.id ? '100%' : '0%' }} />
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* Step content */}
                <form onSubmit={handleSubmit}>
                  <div className={`step-slide ${slideClass}`}>

                    {/* STEP 1 */}
                    {currentStep === 1 && (
                      <div className="flex flex-col gap-5">
                        <div>
                          <p className="text-[#3b82f6] text-xs font-bold uppercase tracking-widest mb-1">Step 1 of 4</p>
                          <h3 className="text-white font-black text-xl">Contact Information</h3>
                        </div>
                        <div>
                          <label className="text-gray-500 text-xs font-semibold uppercase tracking-wider block mb-3">Name <span className="text-[#3b82f6]">*</span></label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" required className={inputCls} />
                            <input name="lastName"  value={form.lastName}  onChange={handleChange} placeholder="Last Name"  required className={inputCls} />
                          </div>
                        </div>
                        <div>
                          <label className="text-gray-500 text-xs font-semibold uppercase tracking-wider block mb-3">Phone Number <span className="text-[#3b82f6]">*</span></label>
                          <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Phone" required className={inputCls} />
                        </div>
                        <div>
                          <label className="text-gray-500 text-xs font-semibold uppercase tracking-wider block mb-3">Email Address <span className="text-[#3b82f6]">*</span></label>
                          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required className={inputCls} />
                        </div>
                      </div>
                    )}

                    {/* STEP 2 */}
                    {currentStep === 2 && (
                      <div className="flex flex-col gap-5">
                        <div>
                          <p className="text-[#3b82f6] text-xs font-bold uppercase tracking-widest mb-1">Step 2 of 4</p>
                          <h3 className="text-white font-black text-xl">Your Address</h3>
                        </div>
                        <div>
                          <label className="text-gray-500 text-xs font-semibold uppercase tracking-wider block mb-3">Address <span className="text-[#3b82f6]">*</span></label>
                          <input name="address" value={form.address} onChange={handleChange} placeholder="Address" required className={inputCls} />
                        </div>
                        <input name="city" value={form.city} onChange={handleChange} placeholder="City" required className={inputCls} />
                        <div>
                          <label className="text-gray-500 text-xs font-semibold uppercase tracking-wider block mb-2">Province</label>
                          <CustomDropdown value={form.province} onChange={(v) => setForm(p => ({ ...p, province: v }))} options={PROVINCES} />
                        </div>
                        <input name="postal" value={form.postal} onChange={handleChange} placeholder="Postal Code" required className={inputCls} />
                      </div>
                    )}

                    {/* STEP 3 */}
                    {currentStep === 3 && (
                      <div className="flex flex-col gap-5">
                        <div>
                          <p className="text-[#3b82f6] text-xs font-bold uppercase tracking-widest mb-1">Step 3 of 4</p>
                          <h3 className="text-white font-black text-xl">Your Equipment</h3>
                        </div>
                        <div>
                          <label className="text-gray-500 text-xs font-semibold uppercase tracking-wider block mb-3">Select Equipment <span className="text-[#3b82f6]">*</span></label>
                          <CustomDropdown value={form.equipment} onChange={(v) => setForm(p => ({ ...p, equipment: v }))} options={EQUIPMENT_OPTIONS} />
                        </div>
                        <div>
                          <label className="text-gray-500 text-xs font-semibold uppercase tracking-wider block mb-3">Is your equipment working? <span className="text-[#3b82f6]">*</span></label>
                          <CustomDropdown value={form.working} onChange={(v) => setForm(p => ({ ...p, working: v }))} options={WORKING_OPTIONS} />
                        </div>
                      </div>
                    )}

                    {/* STEP 4 */}
                    {currentStep === 4 && (
                      <div className="flex flex-col gap-5">
                        <div>
                          <p className="text-[#3b82f6] text-xs font-bold uppercase tracking-widest mb-1">Step 4 of 4</p>
                          <h3 className="text-white font-black text-xl">How Can We Help?</h3>
                        </div>
                        <div className="flex flex-col gap-2">
                          <textarea name="message" value={form.message} onChange={handleChange}
                            placeholder="How can we help you?"
                            maxLength={500} rows={5}
                            className={inputCls + ' resize-none border-2 rounded-lg px-4 py-3 border-white/15 focus:border-[#3b82f6]'}
                          />
                          <p className="text-gray-600 text-xs text-right">{form.message.length} of 500 max characters</p>
                        </div>
                        <p className="text-gray-600 text-xs"><span className="text-[#3b82f6]">*</span> Indicates a required field</p>
                        {status === 'error' && <p className="text-red-400 text-xs">Something went wrong — please try again.</p>}
                      </div>
                    )}
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/8">
                    <button type="button" onClick={() => goToStep(currentStep - 1)} disabled={currentStep === 1}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/15 text-gray-400 text-sm font-medium hover:border-white/35 hover:text-white transition-all duration-200 disabled:opacity-0 disabled:pointer-events-none"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
                      Back
                    </button>

                    {/* Dots */}
                    <div className="flex items-center gap-2">
                      {FORM_STEPS.map((s) => (
                        <div key={s.id} className={`rounded-full transition-all duration-300 ${
                          currentStep === s.id ? 'w-5 h-2 bg-[#3b82f6]' : currentStep > s.id ? 'w-2 h-2 bg-[#3b82f6]/50' : 'w-2 h-2 bg-white/15'
                        }`} />
                      ))}
                    </div>

                    {currentStep < 4 ? (
                      <button type="button" onClick={() => { if (canAdvance()) goToStep(currentStep + 1); }} disabled={!canAdvance()}
                        className="flex items-center gap-2 split-btn-blue px-6 py-2.5 rounded-lg text-white text-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <span className="flex items-center gap-2">
                          Next
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                        </span>
                      </button>
                    ) : (
                      <button type="submit" disabled={status === 'sending'}
                        className="split-btn-blue px-7 py-2.5 rounded-lg text-white text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <span>{status === 'sending' ? 'Submitting…' : 'Submit'}</span>
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}