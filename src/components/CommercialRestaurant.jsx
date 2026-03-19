// src/components/CommercialRestaurant.jsx
import React, { useEffect, useRef, useState } from 'react';
import {
  UtensilsCrossed, Droplets, Thermometer, Wind, Activity,
  ClipboardList, Wrench, Zap, Star, Phone, ChevronRight,
  CheckCircle, ArrowRight, Shield, TrendingUp, Clock,
  ChevronDown, Upload, AlertCircle,
} from 'lucide-react';

const PHONE     = '+1 647 924 1421';
const PHONE_HREF = 'tel:+16479241421';
const A          = '#e94560';

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

/* ── Custom Dropdown ── */
function CustomDropdown({ value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    function h(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  const isSelected = value && value !== '– Select –';
  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between bg-transparent border-b-2 border-white/20 px-0 py-3 text-sm text-left outline-none transition-colors duration-200 cursor-pointer hover:border-white/40"
        style={{ borderColor: open ? A : undefined }}
      >
        <span className={isSelected ? 'text-white' : 'text-gray-500'}>{value || placeholder}</span>
        <ChevronDown size={16} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} style={{ color: A }} />
      </button>
      {open && (
        <ul className="absolute top-full left-0 right-0 mt-1 z-50 bg-[#0d1233] border border-white/15 rounded-lg overflow-hidden shadow-2xl max-h-56 overflow-y-auto">
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className="px-4 py-3 text-sm cursor-pointer transition-colors duration-150 text-gray-300 hover:text-white hover:bg-white/8"
              style={value === opt ? { background: A, color: '#fff', fontWeight: '600' } : {}}
            >{opt}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ── Form data ── */
const BUSINESS_TYPES = ['– Select –','Condo/Apartment','Foodservice','Retail','Hospitality','Healthcare','Commercial Office','Industrial','Other (please specify)'];
const REQUEST_TYPES  = ['– Select –','Emergency Repair/Service – technician required','Equipment Replacement','Moving','New Construction','Other'];
const PROVINCES      = ['Ontario','British Columbia','Alberta','Quebec','Manitoba','Saskatchewan','Nova Scotia','New Brunswick','Prince Edward Island','Newfoundland and Labrador'];

const FORM_STEPS = [
  { id: 1, short: 'Contact'  },
  { id: 2, short: 'Address'  },
  { id: 3, short: 'Business' },
  { id: 4, short: 'Request'  },
];

/* ── Stepper Form ── */
function CommercialForm({ inView }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction,   setDirection]   = useState('forward');
  const [animating,   setAnimating]   = useState(false);
  const [status,      setStatus]      = useState('idle');
  const [isUrgent,    setIsUrgent]    = useState(false);
  const [photoFile,   setPhotoFile]   = useState(null);
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    firstName: '', lastName: '', company: '', email: '', phone: '',
    address: '', city: '', province: 'Ontario',
    businessType: '– Select –',
    request: '– Select –', description: '',
  });

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const goToStep = (next) => {
    if (animating) return;
    setDirection(next > currentStep ? 'forward' : 'back');
    setAnimating(true);
    setTimeout(() => { setCurrentStep(next); setAnimating(false); }, 260);
  };

  const canAdvance = () => {
    if (currentStep === 1) return form.firstName && form.lastName && form.company && form.email && form.phone;
    if (currentStep === 2) return form.address && form.city;
    if (currentStep === 3) return form.businessType !== '– Select –';
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const payload = new FormData();
    payload.append('access_key',  'ba99ae3b-60cc-404c-b207-2a42e86aafb6');
    payload.append('subject',     `Commercial Quote – ${form.businessType} – ${form.firstName} ${form.lastName}`);
    payload.append('from_name',   'MetricAir Commercial');
    payload.append('email',       form.email);
    payload.append('reply_to',    form.email);
    payload.append('to',          'metricairlimited.ca@gmail.com');
    payload.append('message',
      `COMMERCIAL QUOTE REQUEST – METRICAIR\n\n` +
      `Name:          ${form.firstName} ${form.lastName}\n` +
      `Company:       ${form.company}\n` +
      `Email:         ${form.email}\nPhone:         ${form.phone}\n\n` +
      `Address:       ${form.address}, ${form.city}, ${form.province}\n\n` +
      `Business Type: ${form.businessType}\n` +
      `Request:       ${form.request}\n` +
      `Urgent:        ${isUrgent ? 'YES' : 'No'}\n\n` +
      `Description:\n${form.description}\n` +
      `Photo:         ${photoFile ? photoFile.name : 'None'}\n\n` +
      `Submitted: ${new Date().toLocaleString()}`
    );
    if (photoFile) payload.append('attachment', photoFile);
    try {
      const res  = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: payload });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setCurrentStep(1);
        setForm({ firstName:'',lastName:'',company:'',email:'',phone:'',address:'',city:'',province:'Ontario',businessType:'– Select –',request:'– Select –',description:'' });
        setIsUrgent(false); setPhotoFile(null);
      } else throw new Error();
    } catch { setStatus('error'); }
  };

  const slideClass = animating
    ? direction === 'forward' ? 'opacity-0 translate-x-6' : 'opacity-0 -translate-x-6'
    : 'opacity-100 translate-x-0';

  const inputCls = `w-full bg-transparent border-b-2 border-white/20 px-0 py-3 text-white text-sm placeholder-gray-500 outline-none transition-colors duration-200 focus:border-[#e94560]`;

  return (
    <div
      className="max-w-2xl mx-auto rounded-2xl bg-white/4 border border-white/10 overflow-hidden"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.85s ease 0.1s, transform 0.85s ease 0.1s',
      }}
    >
      {status === 'success' ? (
        <div className="flex flex-col items-center gap-5 py-16 px-8 text-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-20 h-20 rounded-full border border-[#e94560]/30 animate-ping" style={{ animationDuration: '2s' }} />
            <div className="w-16 h-16 rounded-full bg-[#e94560]/15 border border-[#e94560]/40 flex items-center justify-center">
              <CheckCircle size={32} className="text-[#e94560]" />
            </div>
          </div>
          <h3 className="text-white font-black text-2xl">Request Submitted!</h3>
          <p className="text-gray-400 text-sm max-w-xs leading-relaxed">We'll review your details and get back to you within 24 hours with a personalized commercial quote.</p>
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
                        : isActive   ? 'bg-[#e94560]/15 border-[#e94560] text-[#e94560]'
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

          <form onSubmit={handleSubmit}>
            <div className={`transition-all duration-[260ms] ease-out ${slideClass}`}>

              {/* STEP 1 — Contact */}
              {currentStep === 1 && (
                <div className="flex flex-col gap-5">
                  <div>
                    <p className="text-[#e94560] text-xs font-bold uppercase tracking-widest mb-1">Step 1 of 4</p>
                    <h3 className="text-white font-black text-xl">Contact Information</h3>
                  </div>

                  <div>
                    <label className="text-gray-500 text-xs font-semibold uppercase tracking-wider block mb-3">
                      Name <span className="text-[#e94560]">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" required className={inputCls} />
                      <input name="lastName"  value={form.lastName}  onChange={handleChange} placeholder="Last Name"  required className={inputCls} />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-500 text-xs font-semibold uppercase tracking-wider block mb-3">
                      Company Name <span className="text-[#e94560]">*</span>
                    </label>
                    <input name="company" value={form.company} onChange={handleChange} placeholder="Company Name" required className={inputCls} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-500 text-xs font-semibold uppercase tracking-wider block mb-3">
                        Email Address <span className="text-[#e94560]">*</span>
                      </label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required className={inputCls} />
                    </div>
                    <div>
                      <label className="text-gray-500 text-xs font-semibold uppercase tracking-wider block mb-3">
                        Phone Number <span className="text-[#e94560]">*</span>
                      </label>
                      <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Phone" required className={inputCls} />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2 — Address */}
              {currentStep === 2 && (
                <div className="flex flex-col gap-5">
                  <div>
                    <p className="text-[#e94560] text-xs font-bold uppercase tracking-widest mb-1">Step 2 of 4</p>
                    <h3 className="text-white font-black text-xl">Address Where Equipment Is Located</h3>
                  </div>

                  <div>
                    <label className="text-gray-500 text-xs font-semibold uppercase tracking-wider block mb-3">
                      Address <span className="text-[#e94560]">*</span>
                    </label>
                    <input name="address" value={form.address} onChange={handleChange} placeholder="Address" required className={inputCls} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-500 text-xs font-semibold uppercase tracking-wider block mb-3">City <span className="text-[#e94560]">*</span></label>
                      <input name="city" value={form.city} onChange={handleChange} placeholder="City" required className={inputCls} />
                    </div>
                    <div>
                      <label className="text-gray-500 text-xs font-semibold uppercase tracking-wider block mb-3">Province</label>
                      <CustomDropdown value={form.province} onChange={(v) => setForm(p => ({ ...p, province: v }))} options={PROVINCES} placeholder="Province" />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3 — Business Type */}
              {currentStep === 3 && (
                <div className="flex flex-col gap-5">
                  <div>
                    <p className="text-[#e94560] text-xs font-bold uppercase tracking-widest mb-1">Step 3 of 4</p>
                    <h3 className="text-white font-black text-xl">Business Details</h3>
                  </div>

                  <div>
                    <label className="text-gray-500 text-xs font-semibold uppercase tracking-wider block mb-3">
                      Business Type <span className="text-[#e94560]">*</span>
                    </label>
                    <CustomDropdown value={form.businessType} onChange={(v) => setForm(p => ({ ...p, businessType: v }))} options={BUSINESS_TYPES} placeholder="– Select –" />
                  </div>
                </div>
              )}

              {/* STEP 4 — Request */}
              {currentStep === 4 && (
                <div className="flex flex-col gap-5">
                  <div>
                    <p className="text-[#e94560] text-xs font-bold uppercase tracking-widest mb-1">Step 4 of 4</p>
                    <h3 className="text-white font-black text-xl">Your Request</h3>
                  </div>

                  {/* Request type */}
                  <div>
                    <label className="text-gray-500 text-xs font-semibold uppercase tracking-wider block mb-3">
                      Request <span className="text-[#e94560]">*</span>
                    </label>
                    <CustomDropdown value={form.request} onChange={(v) => setForm(p => ({ ...p, request: v }))} options={REQUEST_TYPES} placeholder="– Select –" />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="text-gray-500 text-xs font-semibold uppercase tracking-wider block mb-3">Request Description</label>
                    <textarea
                      name="description" value={form.description} onChange={handleChange}
                      placeholder="Description"
                      maxLength={500} rows={4}
                      className="w-full bg-transparent border-2 border-white/15 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 outline-none focus:border-[#e94560] transition-colors duration-200 resize-none"
                    />
                    <p className="text-gray-600 text-xs text-right mt-1">{form.description.length} of 500 max characters</p>
                  </div>

                  {/* Urgent checkbox */}
                  <div>
                    <label className="text-gray-400 text-sm font-semibold block mb-2">This is an urgent request</label>
                    <button
                      type="button"
                      onClick={() => setIsUrgent(u => !u)}
                      className="flex items-center gap-3 group"
                    >
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${isUrgent ? 'bg-[#e94560] border-[#e94560]' : 'border-white/30 group-hover:border-white/50'}`}>
                        {isUrgent && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>}
                      </div>
                      <span className={`text-sm ${isUrgent ? 'text-white' : 'text-gray-400'}`}>Yes</span>
                    </button>
                    {isUrgent && (
                      <div className="flex items-center gap-2 mt-2 p-2 rounded-lg bg-[#e94560]/10 border border-[#e94560]/20">
                        <AlertCircle size={14} className="text-[#e94560] shrink-0" />
                        <p className="text-[#e94560] text-xs">Our team will prioritize your request.</p>
                      </div>
                    )}
                  </div>

                  {/* Photo upload */}
                  <div>
                    <label className="text-gray-400 text-sm font-semibold block mb-3">Upload Photos (optional)</label>
                    <div
                      onClick={() => fileRef.current?.click()}
                      className={`w-full border rounded-lg px-4 py-3 cursor-pointer transition-colors duration-200 ${
                        photoFile ? 'border-white/40 bg-white/5' : 'border-white/15 hover:border-white/35'
                      }`}
                    >
                      <input ref={fileRef} type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => setPhotoFile(e.target.files[0])} />
                      {photoFile ? (
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2 min-w-0">
                            <Upload size={14} className="text-[#e94560] shrink-0" />
                            <span className="text-white text-sm truncate">{photoFile.name}</span>
                            <span className="text-gray-500 text-xs shrink-0">({(photoFile.size / 1024 / 1024).toFixed(1)} MB)</span>
                          </div>
                          <button type="button" onClick={(e) => { e.stopPropagation(); setPhotoFile(null); }} className="text-gray-500 hover:text-white text-xs transition-colors">Remove</button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <Upload size={14} className="text-gray-400 shrink-0" />
                          <span className="text-gray-500 text-sm">Choose File — max. 100 MB</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-600 text-xs"><span className="text-[#e94560]">*</span> Indicates a required field</p>
                  {status === 'error' && <p className="text-red-400 text-xs">Something went wrong — please try again.</p>}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/8">
              <button
                type="button"
                onClick={() => goToStep(currentStep - 1)}
                disabled={currentStep === 1}
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
                <button
                  type="button"
                  onClick={() => { if (canAdvance()) goToStep(currentStep + 1); }}
                  disabled={!canAdvance()}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-white text-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed relative overflow-hidden split-btn-red-form"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Next
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                  </span>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="px-8 py-2.5 rounded-lg text-white text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed split-btn-red-form"
                >
                  <span className="relative z-10">{status === 'sending' ? 'Submitting…' : 'Submit'}</span>
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
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
        <item.Icon size={52} style={{ color: A }} strokeWidth={1.5} />
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
  { tag:'Customer Experience', Icon:UtensilsCrossed, title:"We're here to help you keep customers coming back", paras:["We know that the success of any restaurant depends on how much customers enjoy their dining experiences. A comfortable environment means more customers telling their friends and writing positive online reviews.","88% of customers say they trust online reviews as much as personal recommendations. Talk to us and get a head start on your next 5-star rating."], bullets:null },
  { tag:'Hot Water Systems', Icon:Droplets, title:'Water heaters are crucial to your business', paras:["A food premises' hot water temperature must be at least 82°C (180°F) for cleaning and sanitation purposes. Why risk disrupting service by having an unreliable supply?","Your commercial water heater provides potable water for drinking and cooking, sanitation in your kitchens for dishwashing and handwashing, and — in cases where a heat exchanger is involved — space heating. Natural Resources Canada estimates 5.7% of energy used in a typical commercial setting comes from your water heater."], bullets:['Leaks, temperature issues, taking too long to heat','Strange noises, dirty, rusty, or smelly water','New water heaters offer significant efficiency benefits'] },
  { tag:'Rooftop Units', Icon:Thermometer, title:'Rooftop Air Conditioner Unit (RTU) – your key to customer comfort', paras:["Customer discomfort can quickly turn a great dining experience into a negative review. A properly sized and operated rooftop unit is critical — providing cooling, dehumidification, heating, and fresh air.","A rooftop unit (RTU) combines heating, ventilating, and air conditioning in one, typically installed on the roof. They can vary in size from 3 to 40 tons. RTUs older than 10 years can be inefficient and waste energy."], bullets:['Variable or multi-speed fan control','Integrated economizer control','Demand-controlled ventilation','Remote monitoring and communication','Most efficient RTUs up to 50% more efficient than those from 10 years ago'] },
  { tag:'Make-Up Air', Icon:Wind, title:'Keep cooking odours in the kitchen with make-up air', paras:["Make-up air gives you better control of airflow to direct cooking odors away from your dining area. It also prevents your exhaust, heating and cooling systems from working harder than they should.","Make-up air units provide cool or heated air to your restaurant, replacing air that has been ventilated out. By pulling fresh air from outside in, they improve indoor air quality and can be more effective and energy-efficient than typical ventilation fans."], bullets:null },
  { tag:'Demand Control Ventilation', Icon:Activity, title:'Reduce energy consumption through improved ventilation systems', paras:["Demand Control Kitchen Ventilation (DCKV) detects temperature, vapor, and smoke in kitchens and adjusts airflow to respond to your kitchen's energy needs. Fans adjust to increase ventilation when needed, and decrease during slower periods."], bullets:['Use up to 60% less fan energy','Decreased noise in kitchen and dining areas','Reduced odors throughout the restaurant','Lower your carbon footprint','Qualify for incentives and rebates through Enbridge'] },
  { tag:'Equipment Program', Icon:ClipboardList, title:'Validation, Inspection & Equipment Walk-through Program', paras:["Do you know how much you're spending on your HVAC next year? With energy costs making up a large part of operating budgets, getting help to identify inefficiencies can save thousands in unexpected expenses.","This technician-based survey assesses the state of repair of your HVAC and hydronic equipment. An MetricAir technician will survey and assess the operating condition of your equipment, detailing each unit on site. An easy-to-use report with engineer-reviewed recommendations will be prepared."], bullets:null },
];

const PILLARS = [
  { Icon:Wrench,     title:'Design & Install',       points:['Industry leading products — Armstrong Air, GSW, Rinnai','New energy-efficient equipment to offset your carbon footprint','Quality installations done right the first time'] },
  { Icon:Shield,     title:'Service & Maintenance',  points:['HVAC maintenance to keep your equipment safe and efficient','Performed by fully-licensed and insured technicians','Priority service through our 24/7/365 call centre'] },
  { Icon:TrendingUp, title:'Value Creation',          points:['Utility rebates application support on eligible equipment','Invest savings in other business improvement projects','No-cost transfer on sale of property'] },
];

/* ════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════ */
export default function CommercialRestaurant() {
  const [heroRef,    heroInView]    = useInView(0.05);
  const [ladderRef,  ladderInView]  = useInView(0.04);
  const [pillarsRef, pillarsInView] = useInView(0.08);
  const [formRef,    formInView]    = useInView(0.05);

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
        <div ref={heroRef} className="text-center max-w-4xl mx-auto pb-20 lg:pb-28"
          style={{ opacity:heroInView?1:0, transform:heroInView?'translateY(0)':'translateY(32px)', transition:'opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1)' }}
        >
          <span className="text-xs font-bold uppercase tracking-widest block mb-4" style={{ color:A }}>Commercial Solutions</span>
          <h1 className="text-white font-black leading-tight text-4xl sm:text-5xl lg:text-6xl mb-5">
            Restaurants &<br /><span style={{ color:A }}>Commercial Kitchens</span>
          </h1>
          <div className="w-14 h-1 rounded-full mx-auto mb-6" style={{ background:A }} />
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            MetricAir provides comprehensive HVAC, water heating, and ventilation solutions specifically designed for restaurants and commercial kitchens across the GTA.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            {[
              { Icon:Star,  val:'88%',  label:'Customers trust online reviews as much as personal recommendations' },
              { Icon:Clock, val:'24/7', label:'Priority service through our call centre' },
              { Icon:Zap,   val:'50%',  label:'More efficient modern RTUs vs 10-year-old units' },
            ].map((s, i) => (
              <div key={s.label} className="flex items-center gap-3 px-5 py-3 rounded-full border border-white/10 bg-white/5"
                style={{ opacity:heroInView?1:0, transform:heroInView?'translateY(0)':'translateY(16px)', transition:`opacity 0.6s ease ${0.2+i*0.1}s, transform 0.6s ease ${0.2+i*0.1}s` }}
              >
                <s.Icon size={16} style={{ color:A }} />
                <span className="font-black text-white text-sm">{s.val}</span>
                <span className="text-gray-500 text-xs max-w-[140px] text-left leading-snug">{s.label}</span>
              </div>
            ))}
          </div>
          <a href={PHONE_HREF} className="inline-flex items-center gap-3 split-btn-red px-8 py-4 rounded-xl text-white font-bold text-sm">
            <span className="flex items-center gap-3"><Phone size={18} />Call {PHONE}</span>
          </a>
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
            style={{ opacity:pillarsInView?1:0, transform:pillarsInView?'translateY(0)':'translateY(20px)', transition:'opacity 0.7s ease, transform 0.7s ease' }}
          >
            <span className="text-xs font-bold uppercase tracking-widest block mb-3" style={{ color:A }}>How We Serve You</span>
            <h2 className="text-white font-black text-2xl sm:text-3xl lg:text-4xl">Our Three Pillars of Service</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {PILLARS.map(({ Icon, title, points }, i) => (
              <div key={title} className="flex flex-col gap-5 p-7 rounded-2xl bg-white/5 border border-white/8 hover:border-[#e94560]/35 transition-all duration-300 hover:-translate-y-1"
                style={{ opacity:pillarsInView?1:0, transform:pillarsInView?'translateY(0)':'translateY(24px)', transition:`opacity 0.65s ease ${i*0.12}s, transform 0.65s ease ${i*0.12}s` }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background:`${A}15`, border:`1px solid ${A}25` }}>
                  <Icon size={22} style={{ color:A }} />
                </div>
                <h3 className="text-white font-black text-lg">{title}</h3>
                <ul className="flex flex-col gap-2">
                  {points.map((p, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                      <ChevronRight size={14} className="mt-0.5 shrink-0" style={{ color:A }} />{p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ══ STEPPER FORM ══ */}
        <div ref={formRef} className="pt-20 lg:pt-28">
          <div className="text-center mb-10"
            style={{ opacity:formInView?1:0, transform:formInView?'translateY(0)':'translateY(20px)', transition:'opacity 0.7s ease, transform 0.7s ease' }}
          >
            <span className="text-xs font-bold uppercase tracking-widest block mb-3" style={{ color:A }}>Get Started</span>
            <h2 className="text-white font-black text-2xl sm:text-3xl lg:text-4xl">Request a Commercial Quote</h2>
            <div className="w-12 h-1 rounded-full mx-auto mt-4" style={{ background:A }} />
          </div>
          <CommercialForm inView={formInView} />
        </div>

        {/* ══ CTA ══ */}
        <div className="mt-16 lg:mt-20 rounded-2xl p-8 sm:p-12 text-center border"
          style={{ background:`linear-gradient(135deg, ${A}15 0%, ${A}05 100%)`, borderColor:`${A}25` }}
        >
          <h2 className="text-white font-black text-2xl sm:text-3xl mb-4">Speak to an Energy Management Consultant</h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Call MetricAir today to learn how we can help you improve your restaurant's comfort, efficiency and bottom line.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={PHONE_HREF} className="flex items-center gap-3 split-btn-red px-8 py-4 rounded-xl text-white font-bold text-base">
              <span className="flex items-center gap-3"><Phone size={20} />{PHONE}</span>
            </a>
            <a href="/contact" className="flex items-center gap-2 px-8 py-4 rounded-xl border text-white text-sm font-semibold hover:bg-white/5 transition-all duration-300" style={{ borderColor:'rgba(255,255,255,0.2)' }}>
              Contact Us Online <ArrowRight size={16} />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}