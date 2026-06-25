// src/components/CommercialRestaurant.jsx
import React, { useEffect, useRef, useState } from 'react';
import LeadForm from './LeadForm';
import {
  UtensilsCrossed, Droplets, Thermometer, Wind, Activity,
  ClipboardList, Wrench, Zap, Star, Phone, ChevronRight,
  CheckCircle, ArrowRight, Shield, TrendingUp, Clock,
  ChevronDown, Upload, AlertCircle,
} from 'lucide-react';

const PHONE = '+1 647 924 1421';
const PHONE_HREF = 'tel:+16479241421';
const A = '#c3252e';

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



/* ── Ladder step ── */
function LadderItem({ item, index, inView }) {
  const isEven = index % 2 === 0;
  const contentAnim = {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateX(0)' : isEven ? 'translateX(-32px)' : 'translateX(32px)',
    transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`,
  };
  const iconAnim = {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateX(0)' : isEven ? 'translateX(32px)' : 'translateX(-32px)',
    transition: `opacity 0.7s ease ${index * 0.1 + 0.1}s, transform 0.7s ease ${index * 0.1 + 0.1}s`,
  };

  const iconBlock = (
    <div style={iconAnim} className="flex items-center justify-center">
      <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl flex items-center justify-center shrink-0" style={{ background: `${A}15`, border: `2px solid ${A}30` }}>
        <item.Icon size={52} className="text-white" strokeWidth={1.5} />
      </div>
    </div>
  );

  const textBlock = (
    <div style={contentAnim} className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0" style={{ background: A, color: '#fff' }}>
          {String(index + 1).padStart(2, '0')}
        </div>
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: A }}>{item.tag}</span>
      </div>
      <h3 className="text-white font-black text-xl sm:text-2xl lg:text-3xl leading-tight">{item.title}</h3>
      <div className="w-10 h-0.5 rounded-full" style={{ background: A }} />
      {item.paras.map((p, i) => <p key={i} className="text-gray-400 text-sm sm:text-base leading-relaxed">{p}</p>)}
      {item.bullets && (
        <ul className="flex flex-col gap-2 mt-1">
          {item.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
              <CheckCircle size={14} className="mt-0.5 shrink-0" style={{ color: A }} />{b}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-8 lg:py-12 border-b border-white/6 last:border-0">
      {isEven
        ? <>{textBlock}{iconBlock}</>
        : <><div className="order-2 lg:order-1">{iconBlock}</div><div className="order-1 lg:order-2">{textBlock}</div></>
      }
    </div>
  );
}

/* ── Ladder data ── */
const LADDER_ITEMS = [
  { tag: 'Customer Experience', Icon: UtensilsCrossed, title: "We're here to help you keep customers coming back", paras: ["We know that the success of any restaurant depends on how much customers enjoy their dining experiences. A comfortable environment means more customers telling their friends and writing positive online reviews.", "88% of customers say they trust online reviews as much as personal recommendations. Talk to us and get a head start on your next 5-star rating."], bullets: null },
  { tag: 'Hot Water Systems', Icon: Droplets, title: 'Water heaters are crucial to your business', paras: ["A food premises' hot water temperature must be at least 82°C (180°F) for cleaning and sanitation purposes. Why risk disrupting service by having an unreliable supply?", "Your commercial water heater provides potable water for drinking and cooking, sanitation in your kitchens for dishwashing and handwashing, and — in cases where a heat exchanger is involved — space heating. Natural Resources Canada estimates 5.7% of energy used in a typical commercial setting comes from your water heater."], bullets: ['Leaks, temperature issues, taking too long to heat', 'Strange noises, dirty, rusty, or smelly water', 'New water heaters offer significant efficiency benefits'] },
  { tag: 'Rooftop Units', Icon: Thermometer, title: 'Rooftop Air Conditioner Unit (RTU) – your key to customer comfort', paras: ["Customer discomfort can quickly turn a great dining experience into a negative review. A properly sized and operated rooftop unit is critical — providing cooling, dehumidification, heating, and fresh air.", "A rooftop unit (RTU) combines heating, ventilating, and air conditioning in one, typically installed on the roof. They can vary in size from 3 to 40 tons. RTUs older than 10 years can be inefficient and waste energy."], bullets: ['Variable or multi-speed fan control', 'Integrated economizer control', 'Demand-controlled ventilation', 'Remote monitoring and communication', 'Most efficient RTUs up to 50% more efficient than those from 10 years ago'] },
  { tag: 'Make-Up Air', Icon: Wind, title: 'Keep cooking odours in the kitchen with make-up air', paras: ["Make-up air gives you better control of airflow to direct cooking odors away from your dining area. It also prevents your exhaust, heating and cooling systems from working harder than they should.", "Make-up air units provide cool or heated air to your restaurant, replacing air that has been ventilated out. By pulling fresh air from outside in, they improve indoor air quality and can be more effective and energy-efficient than typical ventilation fans."], bullets: null },
  { tag: 'Demand Control Ventilation', Icon: Activity, title: 'Reduce energy consumption through improved ventilation systems', paras: ["Demand Control Kitchen Ventilation (DCKV) detects temperature, vapor, and smoke in kitchens and adjusts airflow to respond to your kitchen's energy needs. Fans adjust to increase ventilation when needed, and decrease during slower periods."], bullets: ['Use up to 60% less fan energy', 'Decreased noise in kitchen and dining areas', 'Reduced odors throughout the restaurant', 'Lower your carbon footprint', 'Qualify for incentives and rebates through Enbridge'] },
  { tag: 'Equipment Program', Icon: ClipboardList, title: 'Validation, Inspection & Equipment Walk-through Program', paras: ["Do you know how much you're spending on your HVAC next year? With energy costs making up a large part of operating budgets, getting help to identify inefficiencies can save thousands in unexpected expenses.", "This technician-based survey assesses the state of repair of your HVAC and hydronic equipment. An MetricAir technician will survey and assess the operating condition of your equipment, detailing each unit on site. An easy-to-use report with engineer-reviewed recommendations will be prepared."], bullets: null },
];

const PILLARS = [
  { Icon: Wrench, title: 'Design & Install', points: ['Industry leading products — Armstrong Air, GSW, Rinnai', 'New energy-efficient equipment to offset your carbon footprint', 'Quality installations done right the first time'] },
  { Icon: Shield, title: 'Service & Maintenance', points: ['HVAC maintenance to keep your equipment safe and efficient', 'Performed by fully-licensed and insured technicians', 'Priority service through our 24/7/365 call centre'] },
  { Icon: TrendingUp, title: 'Value Creation', points: ['Utility rebates application support on eligible equipment', 'Invest savings in other business improvement projects', 'No-cost transfer on sale of property'] },
];

/* ════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════ */
export default function CommercialRestaurant() {
  const [heroRef, heroInView] = useInView(0.05);
  const [ladderRef, ladderInView] = useInView(0.04);
  const [pillarsRef, pillarsInView] = useInView(0.08);
  const [formRef, formInView] = useInView(0.05);

  return (
    <section className="w-full bg-[#1a1a2e] text-white pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-32 px-4 sm:px-8 lg:px-16 overflow-hidden">

      <style>{`
        .split-btn-red,.split-btn-red-form{position:relative;overflow:hidden;}
        .split-btn-red::before,.split-btn-red-form::before{content:'';position:absolute;inset:0;right:50%;background:${A};transition:transform 0.38s cubic-bezier(0.77,0,0.175,1);z-index:0;}
        .split-btn-red::after,.split-btn-red-form::after{content:'';position:absolute;inset:0;left:50%;background:${A};transition:transform 0.38s cubic-bezier(0.77,0,0.175,1);z-index:0;}
        .split-btn-red:hover::before,.split-btn-red-form:hover::before{transform:translateX(-100%);}
        .split-btn-red:hover::after,.split-btn-red-form:hover::after{transform:translateX(100%);}
        .split-btn-red>span,.split-btn-red-form>span{position:relative;z-index:1;}
      `}</style>

      <div className="max-w-7xl mx-auto flex flex-col gap-0">

        {/* ══ HERO ══ */}
        <div ref={heroRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center pb-20 lg:pb-28 transition-all duration-1000 ease-out"
          style={{ opacity: heroInView ? 1 : 0, transform: heroInView ? 'translateY(0)' : 'translateY(32px)' }}
        >
          {/* Left content block */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-widest block" style={{ color: A }}>Commercial Solutions</span>
            <h1 className="font-black leading-tight text-4xl sm:text-5xl lg:text-6xl">
              <span className="text-[#c3252e]">Restaurants </span>
              <span className="text-[#8f8cff]">& </span><br />
              <span className="text-white">Commercial Kitchens</span>
            </h1>
            <div className="w-14 h-1 rounded-full bg-gradient-to-r from-[#c3252e] via-[#8f8cff] to-white mb-2 mx-auto lg:mx-0" />
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              MetricAir provides comprehensive HVAC, water heating, and ventilation solutions specifically designed for restaurants and commercial kitchens all over Canada.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-4">
              {[
                { Icon: Star, val: '88%', label: 'Customers trust online reviews as much as personal recommendations' },
                { Icon: Clock, val: '24/7', label: 'Priority service through our call centre' },
                { Icon: Zap, val: '50%', label: 'More efficient modern RTUs vs 10-year-old units' },
              ].map((s, i) => (
                <div key={s.label} className="flex items-center gap-3 px-4 py-2.5 rounded-full border border-white/10 bg-white/5"
                  style={{ opacity: heroInView ? 1 : 0, transform: heroInView ? 'translateY(0)' : 'translateY(16px)', transition: `opacity 0.6s ease ${0.2 + i * 0.1}s, transform 0.6s ease ${0.2 + i * 0.1}s` }}
                >
                  <s.Icon size={14} className="text-white" />
                  <span className="font-black text-white text-xs">{s.val}</span>
                  <span className="text-gray-300 text-[10px] max-w-[120px] text-left leading-snug">{s.label}</span>
                </div>
              ))}
            </div>
            <div className="mx-auto lg:mx-0">
              <a href={PHONE_HREF} className="inline-flex items-center gap-3 split-btn-red px-8 py-4 rounded-xl text-white font-bold text-sm">
                <span className="flex items-center gap-3"><Phone size={18} />Call {PHONE}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-white/10 bg-[#0f0f1a]/50 aspect-[4/3] group"
            style={{ opacity: heroInView ? 1 : 0, transform: heroInView ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s' }}
          >
            <img 
              src="/images/resturant.jpg"
              alt="Restaurant Kitchen Ventilation"
              className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-700 select-none pointer-events-none"
              draggable="false"
            />
          </div>
        </div>

        {/* ══ LADDER ══ */}
        <div ref={ladderRef} className="flex flex-col">
          {LADDER_ITEMS.map((item, i) => (
            <LadderItem key={item.title} item={item} index={i} inView={ladderInView} />
          ))}
        </div>

        {/* ══ THREE PILLARS ══ */}
        <div ref={pillarsRef} className="pt-20 lg:pt-28">
          <div className="text-center mb-12"
            style={{ opacity: pillarsInView ? 1 : 0, transform: pillarsInView ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
          >
            <span className="text-xs font-bold uppercase tracking-widest block mb-3" style={{ color: A }}>How We Serve You</span>
            <h2 className="text-white font-black text-2xl sm:text-3xl lg:text-4xl">Our Three Pillars of Service</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {PILLARS.map(({ Icon, title, points }, i) => (
              <div key={title} className="flex flex-col gap-5 p-7 rounded-2xl bg-white/5 border border-white/8 hover:border-[#c3252e]/35 transition-all duration-300 hover:-translate-y-1"
                style={{ opacity: pillarsInView ? 1 : 0, transform: pillarsInView ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 0.65s ease ${i * 0.12}s, transform 0.65s ease ${i * 0.12}s` }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${A}15`, border: `1px solid ${A}25` }}>
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="text-white font-black text-lg">{title}</h3>
                <ul className="flex flex-col gap-2">
                  {points.map((p, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                      <ChevronRight size={14} className="mt-0.5 shrink-0" style={{ color: A }} />{p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-2xl mx-auto rounded-2xl bg-white/4 border border-white/10 p-7 sm:p-10">
          <LeadForm
            subject="Commercial Quote Request"
            fromName="MetricAir Commercial"
            buttonText="Request Commercial Quote"
          />
        </div>

        {/* ══ CTA ══ */}
        <div className="mt-16 lg:mt-20 rounded-2xl p-8 sm:p-12 text-center border"
          style={{ background: `linear-gradient(135deg, ${A}15 0%, ${A}05 100%)`, borderColor: `${A}25` }}
        >
          <h2 className="text-white font-black text-2xl sm:text-3xl mb-4">Speak to an Energy Management Consultant</h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Call MetricAir today to learn how we can help you improve your restaurant's comfort, efficiency and bottom line.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={PHONE_HREF} className="flex items-center gap-3 split-btn-red px-8 py-4 rounded-xl text-white font-bold text-base">
              <span className="flex items-center gap-3"><Phone size={20} />{PHONE}</span>
            </a>
            <a href="/contact" className="flex items-center gap-2 px-8 py-4 rounded-xl border text-white text-sm font-semibold hover:bg-white/5 transition-all duration-300" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
              Contact Us Online <ArrowRight size={16} />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
