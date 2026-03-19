// src/components/Careers.jsx
import React, { useEffect, useRef, useState } from 'react';
import {
  DollarSign,
  GraduationCap,
  Clock,
  Wrench,
  Users,
  MapPin,
  ChevronDown,
  CheckCircle,
  Upload,
  FileText,
  X,
} from 'lucide-react';

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

/* ── Data ── */
const PERKS = [
  { title: 'Competitive Pay',     desc: 'Industry-leading wages that reflect your skills, certifications, and experience.',              Icon: DollarSign   },
  { title: 'Training & Growth',   desc: 'Ongoing certifications, manufacturer training, and clear pathways to senior roles.',            Icon: GraduationCap },
  { title: 'Flexible Scheduling', desc: 'We respect your time. Shifts designed around you — not the other way around.',                  Icon: Clock        },
  { title: 'Full Equipment',      desc: 'All tools, vehicles, and protective equipment provided — you focus on the work.',               Icon: Wrench       },
  { title: 'Great Team Culture',  desc: 'A crew that has your back. Respectful, experienced colleagues who take pride in their work.',   Icon: Users        },
  { title: 'GTA Coverage',        desc: 'Work close to home across the Greater Toronto Area — no long-haul travel required.',            Icon: MapPin       },
];

const VALUES = [
  { label: 'Safety First',   desc: 'Every job, every time — no shortcuts.' },
  { label: 'Quality Work',   desc: 'We take pride in getting it right.' },
  { label: 'Respect Always', desc: 'For our team, clients, and community.' },
  { label: 'Keep Learning',  desc: 'HVAC evolves — so do we.' },
];

const ROLES = [
  { title: 'HVAC Technician',        type: 'Full-time', location: 'GTA'         },
  { title: 'Refrigeration Mechanic', type: 'Full-time', location: 'GTA'         },
  { title: 'Sheet Metal Fabricator', type: 'Contract',  location: 'Mississauga' },
  { title: 'Apprentice Technician',  type: 'Full-time', location: 'GTA'         },
];

const EXPERIENCE_OPTIONS = ['Less than 1 year', '1–3 years', '3–5 years', '5–10 years', '10+ years'];
const ROLE_OPTIONS       = [...ROLES.map(r => r.title), 'Other / Open Application'];

/* ── Custom Dropdown ── */
function CustomDropdown({ value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between bg-transparent border border-white/15 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#e94560] transition-all duration-200 cursor-pointer"
      >
        <span className={value ? 'text-white' : 'text-gray-500'}>{value || placeholder}</span>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <ul className="absolute top-full left-0 right-0 mt-1 z-50 bg-[#16213e] border border-white/15 rounded-lg overflow-hidden shadow-2xl max-h-52 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => { onChange(option); setOpen(false); }}
              className={`px-4 py-3 text-sm cursor-pointer transition-colors duration-150 ${
                value === option
                  ? 'bg-[#e94560] text-white font-semibold'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   Main Component
══════════════════════════════════════════ */
export default function Careers() {
  const [heroRef,  heroInView]  = useInView(0.05);
  const [perksRef, perksInView] = useInView(0.08);
  const [rolesRef, rolesInView] = useInView(0.08);
  const [valRef,   valInView]   = useInView(0.08);
  const [formRef,  formInView]  = useInView(0.05);

  const [form, setForm] = useState({ fullName: '', email: '', phone: '', role: '', experience: '', message: '' });
  const [resumeFile, setResumeFile] = useState(null);
  const [dragOver, setDragOver]     = useState(false);
  const [status, setStatus]         = useState('idle');
  const fileRef = useRef(null);

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleFile = (file) => {
    if (file && (file.type === 'application/pdf' || file.name.endsWith('.pdf') || file.name.endsWith('.doc') || file.name.endsWith('.docx'))) {
      setResumeFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const payload = new FormData();
    payload.append('access_key', 'ba99ae3b-60cc-404c-b207-2a42e86aafb6');
    payload.append('subject',    `Career Application – ${form.role || 'Open Application'} – ${form.fullName}`);
    payload.append('from_name',  'MetricAir Careers');
    payload.append('email',      form.email);
    payload.append('reply_to',   form.email);
    payload.append('to',         'metricairlimited.ca@gmail.com');
    payload.append('message',
      `CAREER APPLICATION – METRICAIR\n\nName:        ${form.fullName}\nPhone:       ${form.phone}\nEmail:       ${form.email}\nRole:        ${form.role || 'Open Application'}\nExperience:  ${form.experience}\nResume:      ${resumeFile ? resumeFile.name : 'Not attached'}\n\nCover Note:\n${form.message}\n\nSubmitted: ${new Date().toLocaleString()}`
    );
    if (resumeFile) payload.append('attachment', resumeFile);

    try {
      const res  = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: payload });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ fullName: '', email: '', phone: '', role: '', experience: '', message: '' });
        setResumeFile(null);
      } else throw new Error();
    } catch { setStatus('error'); }
  };

  const inputCls = `w-full bg-transparent border border-white/15 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 outline-none focus:border-[#e94560] focus:ring-1 focus:ring-[#e94560]/20 transition-all duration-200`;

  return (
    <section className="w-full bg-[#1a1a2e] text-white pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-28 px-4 sm:px-8 lg:px-16 overflow-hidden">

      <style>{`
        .split-btn { position:relative; overflow:hidden; }
        .split-btn::before { content:''; position:absolute; inset:0; right:50%; background:#e94560; transition:transform 0.38s cubic-bezier(0.77,0,0.175,1); z-index:0; }
        .split-btn::after  { content:''; position:absolute; inset:0; left:50%;  background:#e94560; transition:transform 0.38s cubic-bezier(0.77,0,0.175,1); z-index:0; }
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
          <span className="text-[#e94560] text-xs font-bold uppercase tracking-widest block mb-4">Join Our Team</span>
          <h1 className="text-white font-black leading-tight text-4xl sm:text-5xl lg:text-6xl mb-6">
            Build a Career in<br />
            <span className="text-[#e94560]">HVAC Excellence</span>
          </h1>
          <div className="w-16 h-1 rounded-full bg-[#e94560] mx-auto mb-6" />
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            MetricAir is growing across the Greater Toronto Area and we're looking for passionate, skilled individuals to join our crew. Whether you're a seasoned technician or just starting out — there's a place for you here.
          </p>

          {/* Stat pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            {[
              { val: '20+',  label: 'Years in Business' },
              { val: 'GTA',  label: 'Wide Coverage'     },
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
                <span className="text-[#e94560] font-black text-2xl">{s.val}</span>
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
            <span className="text-[#e94560] text-xs font-bold uppercase tracking-widest block mb-3">Why MetricAir</span>
            <h2 className="text-white font-black text-2xl sm:text-3xl lg:text-4xl">What We Offer</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PERKS.map(({ title, desc, Icon }, i) => (
              <div
                key={title}
                className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/8 hover:border-[#e94560]/35 hover:bg-white/8 transition-all duration-300"
                style={{
                  opacity: perksInView ? 1 : 0,
                  transform: perksInView ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 0.08}s, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 0.08}s`,
                }}
              >
                <div className="text-[#e94560] shrink-0 mt-0.5">
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
            <span className="text-[#e94560] text-xs font-bold uppercase tracking-widest block mb-3">Currently Hiring</span>
            <h2 className="text-white font-black text-2xl sm:text-3xl mb-6">Open Positions</h2>

            <div className="flex flex-col gap-3">
              {ROLES.map(({ title, type, location }, i) => (
                <div
                  key={title}
                  className="flex items-center justify-between p-5 rounded-xl bg-white/5 border border-white/8 hover:border-[#e94560]/40 hover:bg-white/8 transition-all duration-300 group"
                  style={{
                    opacity: rolesInView ? 1 : 0,
                    transform: rolesInView ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `opacity 0.6s ease ${0.1 + i * 0.1}s, transform 0.6s ease ${0.1 + i * 0.1}s`,
                  }}
                >
                  <div>
                    <p className="text-white font-semibold text-sm group-hover:text-[#e94560] transition-colors duration-200">{title}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin size={11} className="text-gray-500" />
                      <p className="text-gray-500 text-xs">{location}</p>
                    </div>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full border border-white/15 text-gray-400 shrink-0">{type}</span>
                </div>
              ))}

              {/* Open application banner */}
              <div className="mt-2 p-5 rounded-xl border border-dashed border-white/15 text-center">
                <p className="text-gray-500 text-sm">Don't see your role?</p>
                <p className="text-gray-400 text-sm mt-1">
                  Send an <span className="text-[#e94560] font-medium">open application</span> — we're always looking for great people.
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
            <span className="text-[#e94560] text-xs font-bold uppercase tracking-widest block mb-3">How We Operate</span>
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
                  <div className="w-8 h-8 rounded-full bg-[#e94560]/15 border border-[#e94560]/30 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[#e94560] font-black text-xs">{String(i + 1).padStart(2, '0')}</span>
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
              <div className="absolute top-3 right-4 text-[#e94560]/20 font-black text-6xl leading-none select-none pointer-events-none" style={{ fontFamily: 'Georgia, serif' }}>"</div>
              <p className="text-gray-300 text-sm leading-relaxed italic relative z-10">
                We treat every technician like a professional — because that's exactly what they are. When our people grow, our company grows.
              </p>
              <p className="text-[#e94560] text-xs font-bold mt-3 uppercase tracking-wider">— MetricAir Leadership</p>
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
            <span className="text-[#e94560] text-xs font-bold uppercase tracking-widest block mb-3">Ready to Apply?</span>
            <h2 className="text-white font-black text-2xl sm:text-3xl lg:text-4xl">Submit Your Application</h2>
            <div className="w-12 h-1 rounded-full bg-[#e94560] mx-auto mt-4" />
          </div>

          <div className="max-w-3xl mx-auto rounded-2xl bg-white/4 border border-white/10 p-6 sm:p-10">

            {status === 'success' ? (
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[#e94560]/15 border border-[#e94560]/40 flex items-center justify-center">
                  <CheckCircle size={32} className="text-[#e94560]" />
                </div>
                <h3 className="text-white font-black text-xl">Application Received!</h3>
                <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
                  Thanks for applying to MetricAir. We review every application carefully and will be in touch within a few business days.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-2 text-gray-500 text-sm underline hover:text-white transition-colors duration-200"
                >Submit another application</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                {/* Name + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text"  name="fullName" value={form.fullName} onChange={handleChange}
                    placeholder="Full Name"    required className={inputCls} />
                  <input type="tel"   name="phone"    value={form.phone}    onChange={handleChange}
                    placeholder="Phone Number" required className={inputCls} />
                </div>

                {/* Email */}
                <input type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="Email Address" required className={inputCls} />

                {/* Role + Experience */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CustomDropdown
                    value={form.role}
                    onChange={(val) => setForm(p => ({ ...p, role: val }))}
                    options={ROLE_OPTIONS}
                    placeholder="Position of Interest"
                  />
                  <CustomDropdown
                    value={form.experience}
                    onChange={(val) => setForm(p => ({ ...p, experience: val }))}
                    options={EXPERIENCE_OPTIONS}
                    placeholder="Years of Experience"
                  />
                </div>

                {/* Resume upload */}
                <div
                  onClick={() => fileRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
                  className={`w-full border rounded-lg px-4 py-3 cursor-pointer transition-colors duration-200 ${
                    dragOver ? 'border-white bg-white/10' : resumeFile ? 'border-white/40 bg-white/5' : 'border-white/15 hover:border-white/35'
                  }`}
                >
                  <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden"
                    onChange={(e) => handleFile(e.target.files[0])} />

                  {resumeFile ? (
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <FileText size={16} className="text-[#e94560] shrink-0" />
                        <span className="text-white text-sm truncate">{resumeFile.name}</span>
                        <span className="text-gray-500 text-xs shrink-0">({(resumeFile.size / 1024).toFixed(0)} KB)</span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setResumeFile(null); }}
                        className="text-gray-500 hover:text-white transition-colors duration-200"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Upload size={16} className="text-gray-400 shrink-0" />
                      <span className="text-gray-500 text-sm">
                        {dragOver ? 'Drop here' : 'Upload Resume / CV (PDF or DOC) — optional'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Cover note */}
                <textarea name="message" value={form.message} onChange={handleChange}
                  placeholder="Tell us about yourself — your experience, certifications, and why you want to join MetricAir…"
                  rows={5} className={inputCls + ' resize-none'} />

                {status === 'error' && (
                  <p className="text-red-400 text-xs">Something went wrong — please try again.</p>
                )}

                <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="split-btn px-9 py-3.5 rounded-lg text-white text-sm font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{status === 'sending' ? 'Submitting…' : 'Submit Application'}</span>
                  </button>
                  <p className="text-gray-600 text-xs max-w-xs leading-relaxed">
                    We treat all applications confidentially and review each one personally.
                  </p>
                </div>

              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}