// src/components/ResidentialHeating.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Wind, Flame, RefreshCw, Snowflake, Thermometer, Home } from 'lucide-react';

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
const HEAT_STEPS = [
  {
    num: '01',
    title: 'Pulling Heat from Outside',
    desc: 'In wintertime, the cycle is reversed — the heat pump pulls heat from the outdoor air which is absorbed by the refrigerant.',
    Icon: Wind,
  },
  {
    num: '02',
    title: 'Warming Your Home',
    desc: 'The heated refrigerant flows through the furnace and a blower circulates the warm air throughout the home via the duct system.',
    Icon: Flame,
  },
  {
    num: '03',
    title: 'Repeating the Cycle',
    desc: 'Cool air from indoors is pulled from the ductwork. The cooled refrigerant returns to the outdoor unit. The process repeats to warm the house.',
    Icon: RefreshCw,
  },
];

const COOL_STEPS = [
  {
    num: '01',
    title: 'Removing Indoor Heat',
    desc: 'In cooling mode, the heat pump works just like an air conditioner by first removing unwanted heat from the home.',
    Icon: Snowflake,
  },
  {
    num: '02',
    title: 'Transferring Heat Outside',
    desc: 'The heated refrigerant flows towards the outdoor unit to get cooled and the heat is expelled outside.',
    Icon: Thermometer,
  },
  {
    num: '03',
    title: 'Cooling Cycle Repeats',
    desc: 'The cooler refrigerant flows through the indoor coil, cooling the indoor air while absorbing heat. This process repeats to cool the home.',
    Icon: Home,
  },
];

const UNIQUE_FEATURES = [
  {
    title: 'Reversing Valve',
    desc: 'Changes the direction the refrigerant flows, allowing the system to transfer heat from outside to inside the home.',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
      </svg>
    ),
  },
  {
    title: 'Snow Stand',
    desc: 'Raises the unit off the ground preventing snow or ice from building up below and allowing the heat pump to function in freezing temperatures.',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/><path d="m20 16-4-4 4-4"/><path d="m4 8 4 4-4 4"/><path d="m16 4-4 4-4-4"/><path d="m8 20 4-4 4 4"/>
      </svg>
    ),
  },
  {
    title: 'Wall Mounted Thermostat',
    desc: 'A wall mounted heat pump thermostat is required for optimal control of your heating and cooling cycles.',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>
      </svg>
    ),
  },
];

const EQUIPMENT_OPTIONS = [
  '– Select –',
  'Air Conditioner/Ductless AC',
  'Boiler',
  'Heat Pump Ductless',
  'Heat Pump Central',
  'Furnace',
  'Fireplace',
  'Tankless Water Heater',
  'Water Filtration',
  'Water Softener',
  'Reverse Osmosis',
];

const WORKING_OPTIONS = ['– Select –', 'Yes', 'No', 'Partially'];

const PROVINCES = ['Ontario', 'British Columbia', 'Alberta', 'Quebec', 'Manitoba', 'Saskatchewan', 'Nova Scotia', 'New Brunswick', 'Prince Edward Island', 'Newfoundland and Labrador'];

const FORM_STEPS = [
  { id: 1, title: 'Contact Info',   short: 'Contact'   },
  { id: 2, title: 'Address',        short: 'Address'   },
  { id: 3, title: 'Your Equipment', short: 'Equipment' },
  { id: 4, title: 'How Can We Help', short: 'Details'  },
];

/* ── Custom Dropdown ── */
function CustomDropdown({ value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    function handleClick(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);
  return (
    <div ref={ref} className="relative w-full">
      <button type="button" onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between bg-transparent border-b-2 border-white/20 px-0 py-3 text-sm text-left outline-none focus:border-[#e94560] transition-colors duration-200 cursor-pointer hover:border-white/40"
      >
        <span className={value && value !== '– Select –' ? 'text-white' : 'text-gray-500'}>{value || placeholder}</span>
        <svg className={`w-4 h-4 text-[#e94560] transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      {open && (
        <ul className="absolute top-full left-0 right-0 mt-1 z-50 bg-[#0d1233] border border-white/15 rounded-lg overflow-hidden shadow-2xl max-h-56 overflow-y-auto">
          {options.map((option) => (
            <li key={option} onClick={() => { onChange(option); setOpen(false); }}
              className={`px-4 py-3 text-sm cursor-pointer transition-colors duration-150 ${
                value === option ? 'bg-[#e94560] text-white font-semibold' : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >{option}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ── LadderSection: image once on one side, all steps stacked on the other ── */
function LadderSection({ steps, image, imageAlt, imageLeft, inView, accentColor = '#e94560' }) {
  const stepsBlock = (
    <div className="flex flex-col gap-0">
      {steps.map((step, i) => (
        <div
          key={step.num}
          className="flex gap-5 relative"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateX(0)' : imageLeft ? 'translateX(24px)' : 'translateX(-24px)',
            transition: `opacity 0.65s ease ${i * 0.15}s, transform 0.65s ease ${i * 0.15}s`,
          }}
        >
          {/* Timeline */}
          <div className="flex flex-col items-center shrink-0">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 shrink-0 z-10"
              style={{ background: `${accentColor}20`, borderColor: accentColor, color: accentColor }}
            >
              {step.num}
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 w-0.5 my-2" style={{ background: `${accentColor}25` }} />
            )}
          </div>
          {/* Content */}
          <div className={`pb-8 ${i < steps.length - 1 ? '' : ''}`}>
            <h3 className="text-white font-black text-base sm:text-lg mb-2 flex items-center gap-2">
              {step.Icon && <step.Icon size={18} className="text-[#e94560] shrink-0" style={{ color: accentColor }} />}
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      {imageLeft ? (
        <>{imageBlock}{stepsBlock}</>
      ) : (
        <>{stepsBlock}{imageBlock}</>
      )}
    </div>
  );
}

/* ════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════ */
export default function ResidentialHeating() {
  const [heroRef,     heroInView]     = useInView(0.05);
  const [heatRef,     heatInView]     = useInView(0.05);
  const [coolRef,     coolInView]     = useInView(0.05);
  const [ductlessRef, ductlessInView] = useInView(0.1);
  const [pricingRef,  pricingInView]  = useInView(0.1);
  const [featuresRef, featuresInView] = useInView(0.1);
  const [formRef,     formInView]     = useInView(0.05);

  /* ── Stepper form ── */
  const [currentStep, setCurrentStep] = useState(1);
  const [direction,   setDirection]   = useState('forward');
  const [animating,   setAnimating]   = useState(false);
  const [pricingTab,  setPricingTab]  = useState('purchase');
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
    payload.append('subject',     `Quote Request – Heat Pump – ${form.firstName} ${form.lastName}`);
    payload.append('from_name',   'MetricAir Website');
    payload.append('email',       form.email);
    payload.append('reply_to',    form.email);
    payload.append('to',          'metricairlimited.ca@gmail.com');
    payload.append('message',
      `HEAT PUMP QUOTE REQUEST\n\n` +
      `Name:       ${form.firstName} ${form.lastName}\n` +
      `Phone:      ${form.phone}\nEmail:      ${form.email}\n\n` +
      `Address:    ${form.address}, ${form.city}, ${form.province} ${form.postal}\n\n` +
      `Equipment:  ${form.equipment}\n` +
      `Working:    ${form.working}\n\n` +
      `Message:\n${form.message}\n\nSubmitted: ${new Date().toLocaleString()}`
    );
    try {
      const res  = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: payload });
      const data = await res.json();
      if (data.success) { setStatus('success'); setCurrentStep(1); setForm({ firstName:'',lastName:'',phone:'',email:'',address:'',city:'',province:'Ontario',postal:'',equipment:'– Select –',working:'– Select –',message:'' }); }
      else throw new Error();
    } catch { setStatus('error'); }
  };

  const slideClass = animating
    ? direction === 'forward' ? 'opacity-0 translate-x-6' : 'opacity-0 -translate-x-6'
    : 'opacity-100 translate-x-0';

  const inputCls = `w-full bg-transparent border-b-2 border-white/20 px-0 py-3 text-white text-sm placeholder-gray-500 outline-none focus:border-[#e94560] transition-colors duration-200`;

  return (
    <section className="w-full bg-[#1a1a2e] text-white pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-32 px-4 sm:px-8 lg:px-16 overflow-hidden">

      <style>{`
        .split-btn{position:relative;overflow:hidden;}
        .split-btn::before{content:'';position:absolute;inset:0;right:50%;background:#e94560;transition:transform 0.38s cubic-bezier(0.77,0,0.175,1);z-index:0;}
        .split-btn::after{content:'';position:absolute;inset:0;left:50%;background:#e94560;transition:transform 0.38s cubic-bezier(0.77,0,0.175,1);z-index:0;}
        .split-btn:hover::before{transform:translateX(-100%);}
        .split-btn:hover::after{transform:translateX(100%);}
        .split-btn>span{position:relative;z-index:1;}
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
          <span className="text-[#e94560] text-xs font-bold uppercase tracking-widest block mb-4">Residential Solutions</span>
          <h1 className="text-white font-black leading-tight text-4xl sm:text-5xl lg:text-6xl mb-5">
            Heat Pump<br /><span className="text-[#e94560]">Heating & Cooling</span>
          </h1>
          <div className="w-14 h-1 rounded-full bg-[#e94560] mx-auto mb-6" />
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Year-round home comfort with a single system. Heat pumps provide both heating and cooling, offering exceptional energy efficiency across all seasons in the GTA.
          </p>
        </div>

        {/* ══ HEATING OPERATION — LADDER ══ */}
        <div ref={heatRef}>
          <div
            className="text-center mb-12"
            style={{
              opacity: heatInView ? 1 : 0,
              transform: heatInView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <span className="inline-flex items-center gap-2 text-[#e94560] text-xs font-bold uppercase tracking-widest mb-3">
              <span className="w-6 h-px bg-[#e94560]" />Heating Operation<span className="w-6 h-px bg-[#e94560]" />
            </span>
            <h2 className="text-white font-black text-2xl sm:text-3xl lg:text-4xl">How Your Heat Pump Heats</h2>
          </div>

          <LadderSection
            steps={HEAT_STEPS}
            image="/images/heatpump.png"
            imageAlt="Heat pump heating operation"
            imageLeft={false}
            inView={heatInView}
            accentColor="#e94560"
          />

          <div
            className="mt-6 mx-auto max-w-lg text-center p-4 rounded-xl bg-[#e94560]/10 border border-[#e94560]/25"
            style={{ opacity: heatInView ? 1 : 0, transition: 'opacity 0.7s ease 0.5s' }}
          >
            <p className="text-[#e94560] text-xs font-bold uppercase tracking-wider mb-1">Required</p>
            <p className="text-gray-300 text-sm">Wall mounted heat pump thermostat required</p>
          </div>
        </div>

        {/* ══ COOLING OPERATION — LADDER ══ */}
        <div ref={coolRef}>
          <div
            className="text-center mb-12"
            style={{
              opacity: coolInView ? 1 : 0,
              transform: coolInView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <span className="inline-flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
              <span className="w-6 h-px bg-blue-400" />Cooling Operation<span className="w-6 h-px bg-blue-400" />
            </span>
            <h2 className="text-white font-black text-2xl sm:text-3xl lg:text-4xl">How Your Heat Pump Cools</h2>
          </div>

          <LadderSection
            steps={COOL_STEPS}
            image="/images/coolingpump.png"
            imageAlt="Heat pump cooling operation"
            imageLeft={true}
            inView={coolInView}
            accentColor="#60a5fa"
          />

          <div
            className="mt-6 mx-auto max-w-lg text-center p-4 rounded-xl bg-blue-500/10 border border-blue-500/25"
            style={{ opacity: coolInView ? 1 : 0, transition: 'opacity 0.7s ease 0.5s' }}
          >
            <p className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">Required</p>
            <p className="text-gray-300 text-sm">Wall mounted heat pump thermostat required</p>
          </div>
        </div>

        {/* ══ DUCTLESS UPGRADE ══ */}
        <div
          ref={ductlessRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center rounded-2xl bg-white/4 border border-white/10 p-8 sm:p-12"
          style={{
            opacity: ductlessInView ? 1 : 0,
            transform: ductlessInView ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <div>
            <span className="text-[#e94560] text-xs font-bold uppercase tracking-widest block mb-3">Upgrade Today</span>
            <h2 className="text-white font-black text-2xl sm:text-3xl lg:text-4xl leading-tight mb-5">
              Upgrade Your Ductless AC to a<br /><span className="text-[#e94560]">Ductless Heat Pump</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              A ductless heat pump provides heating <em>and</em> cooling for homes that don't have ducts. It consists of an outdoor unit and an indoor unit — the outdoor unit brings hot or cold air from outside, while the indoor unit manages temperature and airflow.
            </p>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mt-4">
              Compared to a ductless AC that only provides cooling, a ductless heat pump offers <span className="text-white font-semibold">year-round comfort</span> in a single efficient system.
            </p>
          </div>
          <div className="rounded-2xl bg-white/5 border border-[#e94560]/20 p-8 flex flex-col gap-5 justify-center">
            <div className="w-14 h-14 rounded-full bg-[#e94560]/15 border border-[#e94560]/30 flex items-center justify-center">
              <svg className="w-7 h-7 text-[#e94560]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Outdoor Unit', desc: 'Brings hot or cold air from outside the home' },
                { label: 'Indoor Unit',  desc: 'Manages temperature and airflow inside' },
                { label: 'Year-Round',   desc: 'Heating in winter, cooling in summer — one system' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#e94560] mt-2 shrink-0" />
                  <div>
                    <span className="text-white font-bold text-sm">{item.label}: </span>
                    <span className="text-gray-400 text-sm">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ PRICING ══ */}
        <div ref={pricingRef}>
          <div
            className="text-center mb-10"
            style={{
              opacity: pricingInView ? 1 : 0,
              transform: pricingInView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <span className="text-[#e94560] text-xs font-bold uppercase tracking-widest block mb-3">Transparent Pricing</span>
            <h2 className="text-white font-black text-2xl sm:text-3xl lg:text-4xl">How Much Does an Air Source Heat Pump Cost?</h2>
            <p className="text-gray-400 text-sm mt-3 max-w-xl mx-auto">The cost varies depending on options and application. Choose the plan that works for you.</p>
          </div>

          <div
            className="max-w-2xl mx-auto"
            style={{
              opacity: pricingInView ? 1 : 0,
              transform: pricingInView ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
            }}
          >
            {/* Toggle */}
            <div className="flex items-center justify-center mb-8">
              <div className="relative flex bg-white/5 border border-white/10 rounded-full p-1 gap-1">
                <span
                  className="absolute top-1 bottom-1 rounded-full bg-[#e94560] transition-all duration-300 ease-in-out"
                  style={{ width: 'calc(50% - 4px)', left: pricingTab === 'purchase' ? '4px' : 'calc(50%)' }}
                />
                <button onClick={() => setPricingTab('purchase')}
                  className={`relative z-10 px-8 py-2 rounded-full text-sm font-bold transition-colors duration-200 ${pricingTab === 'purchase' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
                  Purchase
                </button>
                <button onClick={() => setPricingTab('rent')}
                  className={`relative z-10 px-8 py-2 rounded-full text-sm font-bold transition-colors duration-200 ${pricingTab === 'rent' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
                  Rent
                </button>
              </div>
            </div>

            {/* Price card */}
            <div className="relative rounded-2xl overflow-hidden border border-[#e94560]/30 bg-white/5">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#e94560] to-[#ff8fa3]" />
              <div className="p-8 sm:p-10 text-center">
                <p className="text-gray-400 text-sm uppercase tracking-widest font-semibold mb-3">
                  {pricingTab === 'purchase' ? 'Starting From' : 'Monthly Starting From'}
                </p>
                <div className="flex items-end justify-center gap-2 mb-2">
                  <span className="text-[#e94560] font-black text-5xl sm:text-6xl">
                    {pricingTab === 'purchase' ? '$6,995' : '$104.50'}
                  </span>
                  {pricingTab === 'rent' && <span className="text-gray-400 text-lg mb-2">/month</span>}
                </div>
                <p className="text-gray-500 text-xs mt-1">All prices in CAD. Includes installation.</p>
                <button
                  onClick={() => document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="mt-6 split-btn px-8 py-3 rounded-xl text-white text-sm font-bold"
                >
                  <span>Get a Free Quote →</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ══ UNIQUE FEATURES ══ */}
        <div ref={featuresRef}>
          <div
            className="text-center mb-10"
            style={{
              opacity: featuresInView ? 1 : 0,
              transform: featuresInView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <span className="text-[#e94560] text-xs font-bold uppercase tracking-widest block mb-3">What Sets It Apart</span>
            <h2 className="text-white font-black text-2xl sm:text-3xl lg:text-4xl">Unique to Heat Pumps</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {UNIQUE_FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="flex flex-col gap-4 p-7 rounded-2xl bg-white/5 border border-white/8 hover:border-[#e94560]/35 hover:bg-white/8 transition-all duration-300"
                style={{
                  opacity: featuresInView ? 1 : 0,
                  transform: featuresInView ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 0.65s ease ${i * 0.12}s, transform 0.65s ease ${i * 0.12}s`,
                }}
              >
                <div className="text-[#e94560]">{f.icon}</div>
                <h3 className="text-white font-bold text-base">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ══ QUOTE FORM (Stepper) ══ */}
        <div ref={formRef} id="quote-form">
          <div
            className="text-center mb-10"
            style={{
              opacity: formInView ? 1 : 0,
              transform: formInView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <span className="text-[#e94560] text-xs font-bold uppercase tracking-widest block mb-3">Ready to Start?</span>
            <h2 className="text-white font-black text-2xl sm:text-3xl lg:text-4xl">Get Your Free Quote</h2>
            <div className="w-12 h-1 rounded-full bg-[#e94560] mx-auto mt-4" />
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
                  <div className="absolute w-20 h-20 rounded-full border border-[#e94560]/30 animate-ping" style={{ animationDuration: '2s' }} />
                  <div className="w-16 h-16 rounded-full bg-[#e94560]/15 border border-[#e94560]/40 flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#e94560]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                </div>
                <h3 className="text-white font-black text-2xl">Quote Request Sent!</h3>
                <p className="text-gray-400 text-sm max-w-xs leading-relaxed">We'll review your details and get back to you within 24 hours with a personalized quote.</p>
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
                              isCompleted ? 'bg-[#e94560] border-[#e94560] text-white cursor-pointer hover:scale-110'
                              : isActive ? 'bg-[#e94560]/15 border-[#e94560] text-[#e94560]'
                              : 'bg-transparent border-white/20 text-gray-600 cursor-default'
                            }`}>
                              {isCompleted
                                ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                                : step.id}
                            </div>
                          </button>
                          <span className={`text-xs font-semibold uppercase tracking-wide hidden sm:block transition-colors duration-300 ${isActive ? 'text-[#e94560]' : isCompleted ? 'text-gray-300' : 'text-gray-600'}`}>{step.short}</span>
                        </div>
                        {idx < FORM_STEPS.length - 1 && (
                          <div className="flex-1 h-px mx-2 relative max-w-[60px]">
                            <div className="absolute inset-0 bg-white/10 rounded" />
                            <div className="absolute inset-0 bg-[#e94560] rounded transition-all duration-500" style={{ width: currentStep > step.id ? '100%' : '0%' }} />
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
                          <p className="text-[#e94560] text-xs font-bold uppercase tracking-widest mb-1">Step 1 of 4</p>
                          <h3 className="text-white font-black text-xl">Contact Information</h3>
                        </div>
                        <div>
                          <label className="text-gray-500 text-xs font-semibold uppercase tracking-wider block mb-3">Name <span className="text-[#e94560]">*</span></label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" required className={inputCls} />
                            <input name="lastName"  value={form.lastName}  onChange={handleChange} placeholder="Last Name"  required className={inputCls} />
                          </div>
                        </div>
                        <div>
                          <label className="text-gray-500 text-xs font-semibold uppercase tracking-wider block mb-3">Phone Number <span className="text-[#e94560]">*</span></label>
                          <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Phone" required className={inputCls} />
                        </div>
                        <div>
                          <label className="text-gray-500 text-xs font-semibold uppercase tracking-wider block mb-3">Email Address <span className="text-[#e94560]">*</span></label>
                          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required className={inputCls} />
                        </div>
                      </div>
                    )}

                    {/* STEP 2 */}
                    {currentStep === 2 && (
                      <div className="flex flex-col gap-5">
                        <div>
                          <p className="text-[#e94560] text-xs font-bold uppercase tracking-widest mb-1">Step 2 of 4</p>
                          <h3 className="text-white font-black text-xl">Your Address</h3>
                        </div>
                        <div>
                          <label className="text-gray-500 text-xs font-semibold uppercase tracking-wider block mb-3">Address <span className="text-[#e94560]">*</span></label>
                          <input name="address" value={form.address} onChange={handleChange} placeholder="Address" required className={inputCls} />
                        </div>
                        <input name="city" value={form.city} onChange={handleChange} placeholder="City" required className={inputCls} />
                        <div>
                          <label className="text-gray-500 text-xs font-semibold uppercase tracking-wider block mb-2">Province</label>
                          <CustomDropdown value={form.province} onChange={(v) => setForm(p => ({ ...p, province: v }))} options={PROVINCES} placeholder="Province" />
                        </div>
                        <input name="postal" value={form.postal} onChange={handleChange} placeholder="Postal Code" required className={inputCls} />
                      </div>
                    )}

                    {/* STEP 3 */}
                    {currentStep === 3 && (
                      <div className="flex flex-col gap-5">
                        <div>
                          <p className="text-[#e94560] text-xs font-bold uppercase tracking-widest mb-1">Step 3 of 4</p>
                          <h3 className="text-white font-black text-xl">Your Equipment</h3>
                        </div>
                        <div>
                          <label className="text-gray-500 text-xs font-semibold uppercase tracking-wider block mb-3">Select Equipment <span className="text-[#e94560]">*</span></label>
                          <CustomDropdown value={form.equipment} onChange={(v) => setForm(p => ({ ...p, equipment: v }))} options={EQUIPMENT_OPTIONS} placeholder="Select Equipment" />
                        </div>
                        <div>
                          <label className="text-gray-500 text-xs font-semibold uppercase tracking-wider block mb-3">Is your equipment working? <span className="text-[#e94560]">*</span></label>
                          <CustomDropdown value={form.working} onChange={(v) => setForm(p => ({ ...p, working: v }))} options={WORKING_OPTIONS} placeholder="Is your equipment working?" />
                        </div>
                      </div>
                    )}

                    {/* STEP 4 */}
                    {currentStep === 4 && (
                      <div className="flex flex-col gap-5">
                        <div>
                          <p className="text-[#e94560] text-xs font-bold uppercase tracking-widest mb-1">Step 4 of 4</p>
                          <h3 className="text-white font-black text-xl">How Can We Help?</h3>
                        </div>
                        <div className="flex flex-col gap-2">
                          <textarea name="message" value={form.message} onChange={handleChange}
                            placeholder="How can we help you?"
                            maxLength={500}
                            rows={5}
                            className={inputCls + ' resize-none border-2 rounded-lg px-4 py-3 border-white/15 focus:border-[#e94560]'}
                          />
                          <p className="text-gray-600 text-xs text-right">{form.message.length} of 500 max characters</p>
                        </div>
                        <p className="text-gray-600 text-xs"><span className="text-[#e94560]">*</span> Indicates a required field</p>
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
                          currentStep === s.id ? 'w-5 h-2 bg-[#e94560]' : currentStep > s.id ? 'w-2 h-2 bg-[#e94560]/50' : 'w-2 h-2 bg-white/15'
                        }`} />
                      ))}
                    </div>

                    {currentStep < 4 ? (
                      <button type="button" onClick={() => { if (canAdvance()) goToStep(currentStep + 1); }} disabled={!canAdvance()}
                        className="flex items-center gap-2 split-btn px-6 py-2.5 rounded-lg text-white text-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <span className="flex items-center gap-2">
                          Next
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                        </span>
                      </button>
                    ) : (
                      <button type="submit" disabled={status === 'sending'}
                        className="split-btn px-7 py-2.5 rounded-lg text-white text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed"
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