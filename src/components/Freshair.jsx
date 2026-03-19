// src/components/FreshAir.jsx
import React, { useEffect, useRef, useState } from 'react';
import {
  Wind, Filter, Droplets, CloudOff, ArrowUpDown, Zap,
  CheckCircle, ChevronDown, ArrowRight,
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

/* ── accent ── */
const A = '#10b981'; // emerald green — fresh, clean air feel

/* ── Services data ── */
const SERVICES = [
  {
    Icon: Filter,
    title: 'Air Cleaners',
    desc: 'We offer air cleaners to remove contaminants from your home\'s air. Our solutions integrate seamlessly with your HVAC system to filter out particles and allergens, providing cleaner and healthier air throughout your living space.',
    highlight: 'Removes particles & allergens',
  },
  {
    Icon: Wind,
    title: 'Air Filters',
    desc: 'MetricAir ensures every air filter we encounter is clean and properly functioning — a key component of any HVAC system. We educate customers on the importance of regularly cleaning and replacing filters to maintain healthy air quality.',
    highlight: 'Regular inspection & replacement',
  },
  {
    Icon: Droplets,
    title: 'Humidifiers',
    desc: 'Let us help you maintain the right humidity level in your home with our humidifier services. We integrate humidifiers with your existing HVAC system to ensure consistent humidity levels throughout your property.',
    highlight: 'Consistent whole-home humidity',
  },
  {
    Icon: CloudOff,
    title: 'Dehumidifiers',
    desc: 'Our goal is to create a healthy living environment for everyone in your home. We offer comprehensive dehumidifier services — ensuring your unit integrates with your HVAC system to remove excess moisture and prevent mold and mildew.',
    highlight: 'Prevents mold & mildew',
  },
  {
    Icon: ArrowUpDown,
    title: 'Ventilation Systems',
    desc: 'A crucial part of maintaining a healthy indoor environment is a reliable ventilation system. With our advanced services, we don\'t stop until fresh air is continuously and reliably circulating throughout your home.',
    highlight: 'Continuous fresh air circulation',
  },
  {
    Icon: Zap,
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
  'Certified GTA technicians — all makes and models serviced',
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
        className="w-full flex items-center justify-between bg-transparent border-b-2 border-white/20 px-0 py-3 text-sm text-left outline-none transition-colors duration-200 cursor-pointer hover:border-white/40"
        style={{ borderColor: open ? A : undefined }}
      >
        <span className={value && value !== '– Select –' ? 'text-white' : 'text-gray-500'}>{value}</span>
        <ChevronDown size={16} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} style={{ color: A }} />
      </button>
      {open && (
        <ul className="absolute top-full left-0 right-0 mt-1 z-50 bg-[#0d1233] border border-white/15 rounded-lg overflow-hidden shadow-2xl max-h-56 overflow-y-auto">
          {options.map((opt) => (
            <li key={opt} onClick={() => { onChange(opt); setOpen(false); }}
              className="px-4 py-3 text-sm cursor-pointer transition-colors duration-150 text-gray-300 hover:text-white"
              style={value === opt ? { background: A, color: '#fff', fontWeight: '600' } : {}}
            >{opt}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

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

  /* ── Stepper ── */
  const [currentStep, setCurrentStep] = useState(1);
  const [direction,   setDirection]   = useState('forward');
  const [animating,   setAnimating]   = useState(false);
  const [status,      setStatus]      = useState('idle');

  const [form, setForm] = useState({
    firstName: '', lastName: '', phone: '', email: '',
    address: '', city: '', province: 'Ontario', postal: '',
    equipment: '– Select –', working: '– Select –', message: '',
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
    payload.append('subject',     `Quote Request – Fresh Air / IAQ – ${form.firstName} ${form.lastName}`);
    payload.append('from_name',   'MetricAir Website');
    payload.append('email',       form.email);
    payload.append('reply_to',    form.email);
    payload.append('to',          'metricairlimited.ca@gmail.com');
    payload.append('message',
      `FRESH AIR / IAQ QUOTE REQUEST – METRICAIR\n\n` +
      `Name:      ${form.firstName} ${form.lastName}\nPhone:     ${form.phone}\nEmail:     ${form.email}\n\n` +
      `Address:   ${form.address}, ${form.city}, ${form.province} ${form.postal}\n\n` +
      `Equipment: ${form.equipment}\nWorking:   ${form.working}\n\nMessage:\n${form.message}\n\nSubmitted: ${new Date().toLocaleString()}`
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

  const inputCls = `w-full bg-transparent border-b-2 border-white/20 px-0 py-3 text-white text-sm placeholder-gray-500 outline-none transition-colors duration-200`;

  return (
    <section className="w-full bg-[#1a1a2e] text-white pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-32 px-4 sm:px-8 lg:px-16 overflow-hidden">

      <style>{`
        .split-btn-green{position:relative;overflow:hidden;}
        .split-btn-green::before{content:'';position:absolute;inset:0;right:50%;background:${A};transition:transform 0.38s cubic-bezier(0.77,0,0.175,1);z-index:0;}
        .split-btn-green::after{content:'';position:absolute;inset:0;left:50%;background:${A};transition:transform 0.38s cubic-bezier(0.77,0,0.175,1);z-index:0;}
        .split-btn-green:hover::before{transform:translateX(-100%);}
        .split-btn-green:hover::after{transform:translateX(100%);}
        .split-btn-green>span{position:relative;z-index:1;}
        .step-slide{transition:opacity 0.26s ease,transform 0.26s ease;}
        .service-card:hover .service-icon{transform:scale(1.1) rotate(-6deg);}
        .service-icon{transition:transform 0.3s ease;}
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
            <span className="text-xs font-bold uppercase tracking-widest block mb-4" style={{ color: A }}>
              Residential Solutions
            </span>
            <h1 className="text-white font-black leading-tight text-4xl sm:text-5xl lg:text-6xl mb-5">
              Fresh Air &<br />
              <span style={{ color: A }}>Indoor Air Quality</span>
            </h1>
            <div className="w-14 h-1 rounded-full mb-6" style={{ background: A }} />
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-6">
              MetricAir is the GTA's trusted indoor air quality expert. We have a dedicated home air quality team focused on air duct cleaning, dehumidifiers, ionizers and more — because we care about your family's well-being.
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              Whether you need an air duct cleaning or a new air filtration system, MetricAir will guide you through every step of improving your indoor air quality.
            </p>
            <button
              onClick={() => document.getElementById('freshair-quote')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 split-btn-green px-7 py-3.5 rounded-xl text-white text-sm font-bold"
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
            <div className="relative rounded-2xl overflow-hidden" style={{ background: '#1a1a2e' }}>
              <img
                src="/images/freshair.jpg"
                alt="Fresh air and indoor air quality"
                className="w-full h-[280px] sm:h-[360px] lg:h-[420px] object-cover object-center rounded-2xl"
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
              <span style={{ color: A }}>Services for the GTA</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-4">
              MetricAir provides the GTA's trusted indoor air quality solutions because we have a dedicated home air quality team that focuses on things like air duct cleaning, air dehumidifiers, and ionizers. We care about each customer's well-being and want their homes to be as healthy a living environment as possible.
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
            {SERVICES.map(({ Icon, title, desc, highlight }, i) => (
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
                  className="service-icon w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${A}15`, border: `1px solid ${A}25` }}
                >
                  <Icon size={22} style={{ color: A }} />
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
              Why Invest in<br /><span style={{ color: A }}>Indoor Air Quality?</span>
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
                className="w-full h-[200px] sm:h-[240px] object-contain object-center"
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
                  <div className="absolute w-20 h-20 rounded-full border animate-ping" style={{ borderColor: `${A}40`, animationDuration: '2s' }} />
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: `${A}15`, border: `1px solid ${A}40` }}>
                    <CheckCircle size={32} style={{ color: A }} />
                  </div>
                </div>
                <h3 className="text-white font-black text-2xl">Quote Request Sent!</h3>
                <p className="text-gray-400 text-sm max-w-xs leading-relaxed">We'll review your details and get back to you within 24 hours with a personalized air quality quote.</p>
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
                            <div
                              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 font-bold text-sm transition-all duration-300"
                              style={
                                isCompleted ? { background: A, borderColor: A, color: '#fff', cursor: 'pointer' }
                                : isActive   ? { background: `${A}15`, borderColor: A, color: A }
                                : { background: 'transparent', borderColor: 'rgba(255,255,255,0.2)', color: '#4b5563' }
                              }
                            >
                              {isCompleted
                                ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                                : step.id}
                            </div>
                          </button>
                          <span
                            className="text-xs font-semibold uppercase tracking-wide hidden sm:block transition-colors duration-300"
                            style={{ color: isActive ? A : isCompleted ? '#d1d5db' : '#4b5563' }}
                          >{step.short}</span>
                        </div>
                        {idx < FORM_STEPS.length - 1 && (
                          <div className="flex-1 h-px mx-2 relative max-w-[60px]">
                            <div className="absolute inset-0 bg-white/10 rounded" />
                            <div className="absolute inset-0 rounded transition-all duration-500" style={{ background: A, width: currentStep > step.id ? '100%' : '0%' }} />
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* Step content */}
                <form onSubmit={handleSubmit}>
                  <div className={`step-slide ${slideClass}`}>

                    {currentStep === 1 && (
                      <div className="flex flex-col gap-5">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: A }}>Step 1 of 4</p>
                          <h3 className="text-white font-black text-xl">Contact Information</h3>
                        </div>
                        <div>
                          <label className="text-gray-500 text-xs font-semibold uppercase tracking-wider block mb-3">Name <span style={{ color: A }}>*</span></label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" required className={inputCls} style={{ '--tw-border-opacity': 1 }} onFocus={e => e.target.style.borderColor = A} onBlur={e => e.target.style.borderColor = ''} />
                            <input name="lastName"  value={form.lastName}  onChange={handleChange} placeholder="Last Name"  required className={inputCls} onFocus={e => e.target.style.borderColor = A} onBlur={e => e.target.style.borderColor = ''} />
                          </div>
                        </div>
                        <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Phone Number" required className={inputCls} onFocus={e => e.target.style.borderColor = A} onBlur={e => e.target.style.borderColor = ''} />
                        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email Address" required className={inputCls} onFocus={e => e.target.style.borderColor = A} onBlur={e => e.target.style.borderColor = ''} />
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="flex flex-col gap-5">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: A }}>Step 2 of 4</p>
                          <h3 className="text-white font-black text-xl">Your Address</h3>
                        </div>
                        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" required className={inputCls} onFocus={e => e.target.style.borderColor = A} onBlur={e => e.target.style.borderColor = ''} />
                        <input name="city" value={form.city} onChange={handleChange} placeholder="City" required className={inputCls} onFocus={e => e.target.style.borderColor = A} onBlur={e => e.target.style.borderColor = ''} />
                        <div>
                          <label className="text-gray-500 text-xs font-semibold uppercase tracking-wider block mb-2">Province</label>
                          <CustomDropdown value={form.province} onChange={(v) => setForm(p => ({ ...p, province: v }))} options={PROVINCES} />
                        </div>
                        <input name="postal" value={form.postal} onChange={handleChange} placeholder="Postal Code" required className={inputCls} onFocus={e => e.target.style.borderColor = A} onBlur={e => e.target.style.borderColor = ''} />
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="flex flex-col gap-5">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: A }}>Step 3 of 4</p>
                          <h3 className="text-white font-black text-xl">Your Equipment</h3>
                        </div>
                        <div>
                          <label className="text-gray-500 text-xs font-semibold uppercase tracking-wider block mb-3">Select Equipment <span style={{ color: A }}>*</span></label>
                          <CustomDropdown value={form.equipment} onChange={(v) => setForm(p => ({ ...p, equipment: v }))} options={EQUIPMENT_OPTIONS} />
                        </div>
                        <div>
                          <label className="text-gray-500 text-xs font-semibold uppercase tracking-wider block mb-3">Is your equipment working? <span style={{ color: A }}>*</span></label>
                          <CustomDropdown value={form.working} onChange={(v) => setForm(p => ({ ...p, working: v }))} options={WORKING_OPTIONS} />
                        </div>
                      </div>
                    )}

                    {currentStep === 4 && (
                      <div className="flex flex-col gap-5">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: A }}>Step 4 of 4</p>
                          <h3 className="text-white font-black text-xl">How Can We Help?</h3>
                        </div>
                        <div className="flex flex-col gap-2">
                          <textarea name="message" value={form.message} onChange={handleChange}
                            placeholder="How can we help you?"
                            maxLength={500} rows={5}
                            className={inputCls + ' resize-none border-2 rounded-lg px-4 py-3 border-white/15'}
                            onFocus={e => e.target.style.borderColor = A}
                            onBlur={e => e.target.style.borderColor = ''}
                          />
                          <p className="text-gray-600 text-xs text-right">{form.message.length} of 500 max characters</p>
                        </div>
                        <p className="text-gray-600 text-xs"><span style={{ color: A }}>*</span> Indicates a required field</p>
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

                    <div className="flex items-center gap-2">
                      {FORM_STEPS.map((s) => (
                        <div key={s.id} className="rounded-full transition-all duration-300"
                          style={{
                            width: currentStep === s.id ? '20px' : '8px',
                            height: '8px',
                            background: currentStep === s.id ? A : currentStep > s.id ? `${A}50` : 'rgba(255,255,255,0.15)',
                          }}
                        />
                      ))}
                    </div>

                    {currentStep < 4 ? (
                      <button type="button" onClick={() => { if (canAdvance()) goToStep(currentStep + 1); }} disabled={!canAdvance()}
                        className="flex items-center gap-2 split-btn-green px-6 py-2.5 rounded-lg text-white text-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <span className="flex items-center gap-2">Next <ArrowRight size={14} /></span>
                      </button>
                    ) : (
                      <button type="submit" disabled={status === 'sending'}
                        className="split-btn-green px-7 py-2.5 rounded-lg text-white text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed"
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