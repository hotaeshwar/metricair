// src/components/Feedback.jsx
import React, { useEffect, useRef, useState } from 'react';

/* ── useInView ── */
function useInView(threshold = 0.12) {
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

/* ── Animated counter hook ── */
function useCounter(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const numeric = parseFloat(target);
    if (isNaN(numeric)) { setCount(target); return; }
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      // For decimals like 4.9 keep one decimal place
      const current = eased * numeric;
      setCount(Number.isInteger(numeric) ? Math.floor(current) : parseFloat(current.toFixed(1)));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(numeric);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

/* ── Animated stat card ── */
function StatCard({ raw, suffix, label, started, delay = 0 }) {
  const numeric = parseFloat(raw);
  const isNum   = !isNaN(numeric);
  const count   = useCounter(isNum ? numeric : 0, 1800, started);

  return (
    <div
      className="flex flex-col items-center justify-center text-center p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#e94560]/30 transition-all duration-300"
      style={{
        opacity: started ? 1 : 0,
        transform: started ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      <span className="text-[#e94560] font-black text-4xl sm:text-5xl tracking-tight">
        {isNum ? `${count}${suffix}` : raw}
      </span>
      <span className="text-gray-500 text-xs mt-2 uppercase tracking-widest font-semibold">{label}</span>
    </div>
  );
}

/* ── Star Rating ── */
function StarRating({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  const labels = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!'];
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform duration-150 hover:scale-110 focus:outline-none"
        >
          <svg
            className="w-9 h-9 sm:w-10 sm:h-10 transition-all duration-150"
            viewBox="0 0 24 24"
            fill={(hovered || value) >= star ? '#e94560' : 'none'}
            stroke={(hovered || value) >= star ? '#e94560' : 'rgba(255,255,255,0.2)'}
            strokeWidth={1.5}
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      ))}
      {(hovered || value) > 0 && (
        <span className="text-[#e94560] text-sm font-bold ml-1 transition-all duration-150">
          {labels[hovered || value]}
        </span>
      )}
      {(hovered === 0 && value === 0) && (
        <span className="text-gray-500 text-sm ml-1">Tap to rate</span>
      )}
    </div>
  );
}

/* ── Data ── */
const CATEGORIES = [
  'Overall Experience', 'Installation Quality', 'Repair Service',
  'Response Time', 'Professionalism', 'Pricing & Value', 'Communication', 'Other',
];
const RECOMMEND_OPTIONS = [
  { value: 'yes', label: 'Yes, definitely' },
  { value: 'maybe', label: 'Maybe' },
  { value: 'no', label: 'No' },
];
const STEPS = [
  { id: 1, title: 'Your Details',        short: 'Details'  },
  { id: 2, title: 'Rate Experience',     short: 'Rating'   },
  { id: 3, title: 'Tell Us More',        short: 'Feedback' },
];

/* ════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════ */
export default function Feedback() {
  const [heroRef,  heroInView]  = useInView(0.05);
  const [statsRef, statsInView] = useInView(0.1);
  const [formRef,  formInView]  = useInView(0.05);

  /* Stepper */
  const [currentStep, setCurrentStep] = useState(1);
  const [direction,   setDirection]   = useState('forward'); // 'forward' | 'back'
  const [animating,   setAnimating]   = useState(false);

  /* Form data */
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '',
    category: '', recommend: '',
    feedback: '', improvement: '',
  });
  const [rating, setRating]   = useState(0);
  const [status, setStatus]   = useState('idle');

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  /* Step navigation with animation */
  const goToStep = (next) => {
    if (animating) return;
    setDirection(next > currentStep ? 'forward' : 'back');
    setAnimating(true);
    setTimeout(() => {
      setCurrentStep(next);
      setAnimating(false);
    }, 280);
  };

  /* Validate current step before advancing */
  const canAdvance = () => {
    if (currentStep === 1) return form.fullName.trim() !== '' && form.email.trim() !== '';
    if (currentStep === 2) return rating > 0;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0 || currentStep !== 3) return;
    setStatus('sending');
    const ratingLabel = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'][rating];

    const payload = new FormData();
    payload.append('access_key', 'ba99ae3b-60cc-404c-b207-2a42e86aafb6');
    payload.append('subject',    `Customer Feedback – ${ratingLabel} (${rating}/5) – ${form.fullName}`);
    payload.append('from_name',  'MetricAir Feedback');
    payload.append('email',      form.email);
    payload.append('reply_to',   form.email);
    payload.append('to',         'metricairlimited.ca@gmail.com');
    payload.append('message',
      `CUSTOMER FEEDBACK – METRICAIR\n\n` +
      `Name:            ${form.fullName}\n` +
      `Email:           ${form.email}\n` +
      `Phone:           ${form.phone || 'Not provided'}\n\n` +
      `Rating:          ${rating}/5 – ${ratingLabel}\n` +
      `Category:        ${form.category || 'Not specified'}\n` +
      `Would Recommend: ${form.recommend || 'Not specified'}\n\n` +
      `Feedback:\n${form.feedback}\n\n` +
      `What could we improve:\n${form.improvement || 'Nothing mentioned'}\n\n` +
      `Submitted: ${new Date().toLocaleString()}`
    );

    try {
      const res  = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: payload });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ fullName: '', email: '', phone: '', category: '', recommend: '', feedback: '', improvement: '' });
        setRating(0);
        setCurrentStep(1);
      } else throw new Error();
    } catch { setStatus('error'); }
  };

  const inputCls = `w-full bg-transparent border border-white/15 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 outline-none focus:border-[#e94560] focus:ring-1 focus:ring-[#e94560]/20 transition-all duration-200`;

  /* Slide animation classes */
  const slideClass = animating
    ? direction === 'forward'
      ? 'opacity-0 translate-x-8'
      : 'opacity-0 -translate-x-8'
    : 'opacity-100 translate-x-0';

  return (
    <section className="w-full bg-[#1a1a2e] text-white
      pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-28
      px-4 sm:px-8 lg:px-16 overflow-hidden"
    >
      <style>{`
        .split-btn { position:relative; overflow:hidden; }
        .split-btn::before { content:''; position:absolute; inset:0; right:50%; background:#e94560; transition:transform 0.38s cubic-bezier(0.77,0,0.175,1); z-index:0; }
        .split-btn::after  { content:''; position:absolute; inset:0; left:50%;  background:#e94560; transition:transform 0.38s cubic-bezier(0.77,0,0.175,1); z-index:0; }
        .split-btn:hover::before { transform:translateX(-100%); }
        .split-btn:hover::after  { transform:translateX(100%); }
        .split-btn > span { position:relative; z-index:1; }
        .step-content { transition: opacity 0.28s ease, transform 0.28s ease; }
      `}</style>

      <div className="max-w-7xl mx-auto flex flex-col gap-16 lg:gap-20">

        {/* ══ HERO ══ */}
        <div
          ref={heroRef}
          className="text-center max-w-3xl mx-auto"
          style={{
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <span className="text-[#e94560] text-xs font-bold uppercase tracking-widest block mb-4">
            Your Voice Matters
          </span>
          <h1 className="text-white font-black leading-tight text-4xl sm:text-5xl lg:text-6xl mb-5">
            Share Your<span className="text-[#e94560]"> Feedback</span>
          </h1>
          <div className="w-14 h-1 rounded-full bg-[#e94560] mx-auto mb-6" />
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            We take every piece of feedback seriously. Tell us about your experience with MetricAir — your input directly shapes how we serve the GTA community.
          </p>
        </div>

        {/* ══ ANIMATED STATS ══ */}
        <div
          ref={statsRef}
          className="grid grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto w-full"
        >
          <StatCard raw={4.9}  suffix=""   label="Avg. Rating"   started={statsInView} delay={0}    />
          <StatCard raw={500}  suffix="+"  label="Happy Clients" started={statsInView} delay={0.12} />
          <StatCard raw={98}   suffix="%"  label="Recommend Us"  started={statsInView} delay={0.24} />
        </div>

        {/* ══ STEPPER FORM ══ */}
        <div
          ref={formRef}
          className="max-w-3xl mx-auto w-full"
          style={{
            opacity: formInView ? 1 : 0,
            transform: formInView ? 'translateY(0)' : 'translateY(36px)',
            transition: 'opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <div className="rounded-2xl bg-white/4 border border-white/10 p-6 sm:p-10">

            {status === 'success' ? (
              /* ── Success ── */
              <div className="flex flex-col items-center gap-5 py-14 text-center">
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-20 h-20 rounded-full border border-[#e94560]/30 animate-ping" style={{ animationDuration: '2s' }} />
                  <div className="w-16 h-16 rounded-full bg-[#e94560]/15 border border-[#e94560]/40 flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#e94560]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                </div>
                <h3 className="text-white font-black text-2xl">Thank You!</h3>
                <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
                  Your feedback has been received. We genuinely appreciate you taking the time — it helps us serve our customers better every day.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-2 text-gray-500 text-sm underline hover:text-white transition-colors duration-200"
                >Submit another response</button>
              </div>
            ) : (
              <>
                {/* ── Step indicator ── */}
                <div className="flex items-center justify-between mb-8 sm:mb-10">
                  {STEPS.map((step, idx) => {
                    const isCompleted = currentStep > step.id;
                    const isActive    = currentStep === step.id;
                    return (
                      <React.Fragment key={step.id}>
                        {/* Step circle */}
                        <div className="flex flex-col items-center gap-1.5 flex-1">
                          <button
                            type="button"
                            onClick={() => { if (isCompleted) goToStep(step.id); }}
                            disabled={!isCompleted}
                            className="focus:outline-none"
                          >
                            <div className={`
                              w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center
                              border-2 font-bold text-sm transition-all duration-400
                              ${isCompleted
                                ? 'bg-[#e94560] border-[#e94560] text-white cursor-pointer hover:scale-110'
                                : isActive
                                  ? 'bg-[#e94560]/15 border-[#e94560] text-[#e94560]'
                                  : 'bg-transparent border-white/20 text-gray-600 cursor-default'
                              }
                            `}>
                              {isCompleted ? (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                                </svg>
                              ) : step.id}
                            </div>
                          </button>
                          <span className={`text-xs font-semibold uppercase tracking-wider hidden sm:block transition-colors duration-300 ${
                            isActive ? 'text-[#e94560]' : isCompleted ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {step.short}
                          </span>
                        </div>

                        {/* Connector line */}
                        {idx < STEPS.length - 1 && (
                          <div className="flex-1 max-w-[80px] h-px mx-2 relative">
                            <div className="absolute inset-0 bg-white/10 rounded" />
                            <div
                              className="absolute inset-0 bg-[#e94560] rounded transition-all duration-500"
                              style={{ width: currentStep > step.id ? '100%' : '0%' }}
                            />
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* ── Step content with slide animation ── */}
                <form onSubmit={handleSubmit}>
                  <div className={`step-content ${slideClass}`}>

                    {/* ──── STEP 1: Details ──── */}
                    {currentStep === 1 && (
                      <div className="flex flex-col gap-5">
                        <div>
                          <p className="text-[#e94560] text-xs font-bold uppercase tracking-widest mb-1">Step 1 of 3</p>
                          <h2 className="text-white font-black text-xl sm:text-2xl">Your Details</h2>
                          <p className="text-gray-500 text-sm mt-1">We'll use this to follow up if needed.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input type="text"  name="fullName" value={form.fullName}
                            onChange={handleChange} placeholder="Full Name *" required className={inputCls} />
                          <input type="email" name="email"    value={form.email}
                            onChange={handleChange} placeholder="Email Address *" required className={inputCls} />
                        </div>
                        <input type="tel" name="phone" value={form.phone}
                          onChange={handleChange} placeholder="Phone Number (optional)" className={inputCls} />
                      </div>
                    )}

                    {/* ──── STEP 2: Rating ──── */}
                    {currentStep === 2 && (
                      <div className="flex flex-col gap-6">
                        <div>
                          <p className="text-[#e94560] text-xs font-bold uppercase tracking-widest mb-1">Step 2 of 3</p>
                          <h2 className="text-white font-black text-xl sm:text-2xl">Rate Your Experience</h2>
                          <p className="text-gray-500 text-sm mt-1">How did we do? Be honest — we can handle it.</p>
                        </div>

                        {/* Star rating */}
                        <div className="flex flex-col gap-2">
                          <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                            Overall Rating <span className="text-[#e94560]">*</span>
                          </label>
                          <StarRating value={rating} onChange={setRating} />
                          {rating === 0 && (
                            <p className="text-red-400/60 text-xs mt-0.5">Please select a rating to continue</p>
                          )}
                        </div>

                        {/* Category chips */}
                        <div className="flex flex-col gap-3">
                          <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                            Feedback Category
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map((cat) => (
                              <button
                                key={cat}
                                type="button"
                                onClick={() => setForm(p => ({ ...p, category: p.category === cat ? '' : cat }))}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                                  form.category === cat
                                    ? 'bg-[#e94560] border-[#e94560] text-white'
                                    : 'bg-transparent border-white/15 text-gray-400 hover:border-white/40 hover:text-white'
                                }`}
                              >{cat}</button>
                            ))}
                          </div>
                        </div>

                        {/* Recommend */}
                        <div className="flex flex-col gap-3">
                          <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                            Would you recommend MetricAir?
                          </label>
                          <div className="flex flex-wrap gap-3">
                            {RECOMMEND_OPTIONS.map((opt) => (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => setForm(p => ({ ...p, recommend: opt.value }))}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                                  form.recommend === opt.value
                                    ? 'bg-[#e94560]/15 border-[#e94560] text-white'
                                    : 'bg-transparent border-white/15 text-gray-400 hover:border-white/35 hover:text-white'
                                }`}
                              >
                                <span className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
                                  form.recommend === opt.value ? 'border-[#e94560]' : 'border-gray-600'
                                }`}>
                                  {form.recommend === opt.value && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#e94560]" />
                                  )}
                                </span>
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ──── STEP 3: Tell Us More ──── */}
                    {currentStep === 3 && (
                      <div className="flex flex-col gap-5">
                        <div>
                          <p className="text-[#e94560] text-xs font-bold uppercase tracking-widest mb-1">Step 3 of 3</p>
                          <h2 className="text-white font-black text-xl sm:text-2xl">Tell Us More</h2>
                          <p className="text-gray-500 text-sm mt-1">Almost done — share the details of your experience.</p>
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                            Your Feedback <span className="text-[#e94560]">*</span>
                          </label>
                          <textarea
                            name="feedback" value={form.feedback} onChange={handleChange}
                            placeholder="What did you love about your experience with MetricAir? Tell us what went well…"
                            rows={4} required className={inputCls + ' resize-none'}
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                            What Could We Improve? <span className="text-gray-600">(optional)</span>
                          </label>
                          <textarea
                            name="improvement" value={form.improvement} onChange={handleChange}
                            placeholder="Is there anything we could do better next time? All constructive feedback is welcome…"
                            rows={3} className={inputCls + ' resize-none'}
                          />
                        </div>

                        {status === 'error' && (
                          <p className="text-red-400 text-xs">Something went wrong — please try again.</p>
                        )}
                      </div>
                    )}

                  </div>

                  {/* ── Navigation buttons ── */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/8">
                    {/* Back */}
                    <button
                      type="button"
                      onClick={() => goToStep(currentStep - 1)}
                      disabled={currentStep === 1}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/15 text-gray-400 text-sm font-medium hover:border-white/35 hover:text-white transition-all duration-200 disabled:opacity-0 disabled:pointer-events-none"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                      </svg>
                      Back
                    </button>

                    {/* Step dots */}
                    <div className="flex items-center gap-2">
                      {STEPS.map((s) => (
                        <div
                          key={s.id}
                          className={`rounded-full transition-all duration-300 ${
                            currentStep === s.id
                              ? 'w-5 h-2 bg-[#e94560]'
                              : currentStep > s.id
                                ? 'w-2 h-2 bg-[#e94560]/50'
                                : 'w-2 h-2 bg-white/15'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Next / Submit */}
                    {currentStep < 3 ? (
                      <button
                        type="button"
                        onClick={() => { if (canAdvance()) goToStep(currentStep + 1); }}
                        disabled={!canAdvance()}
                        className="flex items-center gap-2 split-btn px-6 py-2.5 rounded-lg text-white text-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <span className="flex items-center gap-2">
                          Next
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                          </svg>
                        </span>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={status === 'sending' || rating === 0}
                        className="split-btn px-7 py-2.5 rounded-lg text-white text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <span>{status === 'sending' ? 'Submitting…' : 'Submit Feedback'}</span>
                      </button>
                    )}
                  </div>
                </form>
              </>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}