// src/components/ResidentialHeating.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Wind, Flame, RefreshCw, Snowflake, Thermometer, Home } from 'lucide-react';
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
        className="w-full flex items-center justify-between bg-transparent border-b-2 border-white/20 px-0 py-3 text-sm text-left outline-none focus:border-[#c3252e] transition-colors duration-200 cursor-pointer hover:border-white/40"
      >
        <span className={value && value !== '– Select –' ? 'text-white' : 'text-gray-500'}>{value || placeholder}</span>
        <svg className={`w-4 h-4 text-[#c3252e] transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      {open && (
        <ul className="absolute top-full left-0 right-0 mt-1 z-50 bg-[#0d1233] border border-white/15 rounded-lg overflow-hidden shadow-2xl max-h-56 overflow-y-auto">
          {options.map((option) => (
            <li key={option} onClick={() => { onChange(option); setOpen(false); }}
              className={`px-4 py-3 text-sm cursor-pointer transition-colors duration-150 ${
                value === option ? 'bg-[#c3252e] text-white font-semibold' : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >{option}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ── LadderSection: image once on one side, all steps stacked on the other ── */
function LadderSection({ steps, image, imageAlt, imageLeft, inView, accentColor = '#c3252e' }) {
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
              {step.Icon && <step.Icon size={18} className="text-[#c3252e] shrink-0" style={{ color: accentColor }} />}
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
  const [pricingTab,  setPricingTab]  = useState('purchase');

  return (
    <section className="w-full bg-[#1a1a2e] text-white pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-32 px-4 sm:px-8 lg:px-16 overflow-hidden">

      <style>{`
        .split-btn{position:relative;overflow:hidden;}
        .split-btn::before{content:'';position:absolute;inset:0;right:50%;background:#c3252e;transition:transform 0.38s cubic-bezier(0.77,0,0.175,1);z-index:0;}
        .split-btn::after{content:'';position:absolute;inset:0;left:50%;background:#c3252e;transition:transform 0.38s cubic-bezier(0.77,0,0.175,1);z-index:0;}
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
          <span className="text-[#c3252e] text-xs font-bold uppercase tracking-widest block mb-4">Residential Solutions</span>
          <h1 className="font-black leading-tight text-4xl sm:text-5xl lg:text-6xl mb-5">
            <span className="text-[#c3252e]">Heat Pump </span>
            <span className="text-[#8f8cff]">Heating & </span><br />
            <span className="text-white">Cooling</span>
          </h1>
          <div className="w-14 h-1 rounded-full bg-gradient-to-r from-[#c3252e] via-[#8f8cff] to-white mx-auto mb-6" />
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
            <span className="inline-flex items-center gap-2 text-[#c3252e] text-xs font-bold uppercase tracking-widest mb-3">
              <span className="w-6 h-px bg-[#c3252e]" />Heating Operation<span className="w-6 h-px bg-[#c3252e]" />
            </span>
            <h2 className="text-white font-black text-2xl sm:text-3xl lg:text-4xl">How Your Heat Pump Heats</h2>
          </div>

          <LadderSection
            steps={HEAT_STEPS}
            image="/images/heatpump.png"
            imageAlt="Heat pump heating operation"
            imageLeft={false}
            inView={heatInView}
            accentColor="#c3252e"
          />

          <div
            className="mt-6 mx-auto max-w-lg text-center p-4 rounded-xl bg-[#c3252e]/10 border border-[#c3252e]/25"
            style={{ opacity: heatInView ? 1 : 0, transition: 'opacity 0.7s ease 0.5s' }}
          >
            <p className="text-[#c3252e] text-xs font-bold uppercase tracking-wider mb-1">Required</p>
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
            <span className="text-[#c3252e] text-xs font-bold uppercase tracking-widest block mb-3">Upgrade Today</span>
            <h2 className="text-white font-black text-2xl sm:text-3xl lg:text-4xl leading-tight mb-5">
              Upgrade Your Ductless AC to a<br /><span className="text-[#c3252e]">Ductless Heat Pump</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              A ductless heat pump provides heating <em>and</em> cooling for homes that don't have ducts. It consists of an outdoor unit and an indoor unit — the outdoor unit brings hot or cold air from outside, while the indoor unit manages temperature and airflow.
            </p>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mt-4">
              Compared to a ductless AC that only provides cooling, a ductless heat pump offers <span className="text-white font-semibold">year-round comfort</span> in a single efficient system.
            </p>
          </div>
          <div className="rounded-2xl bg-white/5 border border-[#c3252e]/20 p-8 flex flex-col gap-5 justify-center">
            <div className="w-14 h-14 rounded-full bg-[#c3252e]/15 border border-[#c3252e]/30 flex items-center justify-center">
              <svg className="w-7 h-7 text-[#c3252e]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
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
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c3252e] mt-2 shrink-0" />
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
            <span className="text-[#c3252e] text-xs font-bold uppercase tracking-widest block mb-3">Transparent Pricing</span>
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
                  className="absolute top-1 bottom-1 rounded-full bg-[#c3252e] transition-all duration-300 ease-in-out"
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
            <div className="relative rounded-2xl overflow-hidden border border-[#c3252e]/30 bg-white/5">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c3252e] to-[#ff8fa3]" />
              <div className="p-8 sm:p-10 text-center">
                <p className="text-gray-400 text-sm uppercase tracking-widest font-semibold mb-3">
                  {pricingTab === 'purchase' ? 'Starting From' : 'Monthly Starting From'}
                </p>
                <div className="flex items-end justify-center gap-2 mb-2">
                  <span className="text-[#c3252e] font-black text-5xl sm:text-6xl">
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
            <span className="text-[#c3252e] text-xs font-bold uppercase tracking-widest block mb-3">What Sets It Apart</span>
            <h2 className="text-white font-black text-2xl sm:text-3xl lg:text-4xl">Unique to Heat Pumps</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {UNIQUE_FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="flex flex-col gap-4 p-7 rounded-2xl bg-white/5 border border-white/8 hover:border-[#c3252e]/35 hover:bg-white/8 transition-all duration-300"
                style={{
                  opacity: featuresInView ? 1 : 0,
                  transform: featuresInView ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 0.65s ease ${i * 0.12}s, transform 0.65s ease ${i * 0.12}s`,
                }}
              >
                <div className="text-[#c3252e]">{f.icon}</div>
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
            <span className="text-[#c3252e] text-xs font-bold uppercase tracking-widest block mb-3">Ready to Start?</span>
            <h2 className="text-white font-black text-2xl sm:text-3xl lg:text-4xl">Get Your Free Quote</h2>
            <div className="w-12 h-1 rounded-full bg-[#c3252e] mx-auto mt-4" />
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
                subject="Quote Request – Residential Heating (Heat Pump)"
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
