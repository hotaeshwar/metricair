// src/components/RealWorldApplications.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const applications = [
  {
    category: "Commercial Solutions",
    href: "/commercial-solutions",
    description:
      "From high-volume restaurant kitchens to modern office buildings, our commercial HVAC systems deliver precise climate control, code-compliant ventilation, and energy efficiency at scale.",
    items: [
      {
        title: "Restaurants & Commercial Kitchens",
        href: "/commercial-solutions/restaurants",
        desc: "Heavy-duty exhaust systems, make-up air units, and kitchen ventilation designed to handle grease-laden air, extreme heat, and strict health codes.",
        modal: {
          heading: "Restaurant & Commercial Kitchen HVAC",
          body: "Commercial kitchens generate enormous heat, grease-laden vapors, and moisture that standard HVAC systems cannot handle. MetricAir designs and installs purpose-built systems including Type I and Type II exhaust hoods, make-up air units (MUA) that balance negative pressure, and dedicated supply air systems to maintain comfort for staff.",
          features: ["Type I & II exhaust hoods", "Make-up air units (MUA)", "Grease duct fabrication", "NFPA 96 compliant installs", "Scheduled maintenance contracts", "Emergency service available"],
        },
        icon: (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6h16v2H4z" fill="currentColor" fillOpacity="0.15"/>
            <path d="M4 8l2 8h12l2-8"/>
            <path d="M4 6h16"/>
            <path d="M8 6V4h8v2"/>
            <path d="M9 12h6"/>
            <path d="M10 15h4"/>
          </svg>
        ),
      },
      {
        title: "Office & Retail Spaces",
        href: "/commercial-solutions/office-retail",
        desc: "Smart zoning, air balancing, and energy-recovery ventilation to keep employees comfortable and customers coming back.",
        modal: {
          heading: "Office & Retail HVAC Solutions",
          body: "Comfort directly impacts employee productivity and customer dwell time. MetricAir installs multi-zone VAV systems, energy recovery ventilators (ERV), and smart thermostats that adapt to occupancy patterns.",
          features: ["Multi-zone VAV systems", "Energy recovery ventilators (ERV)", "Smart thermostat integration", "Air balancing & commissioning", "After-hours installation", "Preventive maintenance plans"],
        },
        icon: (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor" fillOpacity="0.1"/>
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <line x1="3" y1="8" x2="21" y2="8"/>
            <line x1="3" y1="13" x2="21" y2="13"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
            <line x1="8" y1="3" x2="8" y2="8"/>
            <line x1="13" y1="3" x2="13" y2="8"/>
            <line x1="18" y1="3" x2="18" y2="8"/>
          </svg>
        ),
      },
    ],
  },
  {
    category: "Residential Solutions",
    href: "/residential-solutions",
    description:
      "Keep your home comfortable year-round with our certified residential HVAC installations, replacements, and maintenance programs — built for Canadian climates.",
    items: [
      {
        title: "Heating Systems",
        href: "/residential-solutions/heating",
        desc: "High-efficiency furnaces, boilers, and heat pumps that cut energy bills while delivering consistent warmth through harsh winters.",
        modal: {
          heading: "Residential Heating Systems",
          body: "Canada's winters demand reliable, efficient heating. MetricAir installs and services high-efficiency gas furnaces (up to 98% AFUE), hydronic boiler systems, and cold-climate heat pumps.",
          features: ["Up to 98% AFUE gas furnaces", "Hydronic boiler systems", "Cold-climate heat pumps", "Manual J load calculations", "Smart thermostat setup", "1-year labour warranty"],
        },
        icon: (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="10" width="16" height="11" rx="2" fill="currentColor" fillOpacity="0.1"/>
            <rect x="4" y="10" width="16" height="11" rx="2"/>
            <path d="M9 10V7c0 0 1-4 3-5 0 2 1 3 2 3.5C15.5 6 16 4 16 4c1 2 1 4 1 6" fill="currentColor" fillOpacity="0.2"/>
            <path d="M9 10V7c0 0 1-4 3-5 0 2 1 3 2 3.5C15.5 6 16 4 16 4c1 2 1 4 1 6"/>
            <circle cx="12" cy="16" r="2"/>
          </svg>
        ),
      },
      {
        title: "Cooling Systems",
        href: "/residential-solutions/cooling",
        desc: "Central A/C, ductless mini-splits, and heat pumps sized precisely for your home to maximize comfort and minimize operating costs.",
        modal: {
          heading: "Residential Cooling Systems",
          body: "From whole-home central air conditioning to targeted ductless mini-split systems, MetricAir has the right cooling solution for every home layout and budget.",
          features: ["Central A/C up to SEER2 20+", "Ductless mini-split systems", "Dual-fuel heat pump systems", "Correct refrigerant charging", "Electrical & permits included", "Manufacturer warranty protected"],
        },
        icon: (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="13" rx="2" fill="currentColor" fillOpacity="0.1"/>
            <rect x="2" y="7" width="20" height="13" rx="2"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
            <line x1="6" y1="7" x2="6" y2="4"/>
            <line x1="12" y1="7" x2="12" y2="4"/>
            <line x1="18" y1="7" x2="18" y2="4"/>
            <circle cx="7" cy="16" r="1.5" fill="currentColor" fillOpacity="0.3"/>
            <circle cx="7" cy="16" r="1.5"/>
            <line x1="11" y1="15" x2="19" y2="15"/>
            <line x1="11" y1="17" x2="17" y2="17"/>
          </svg>
        ),
      },
      {
        title: "Fresh Air & Ventilation",
        href: "/residential-solutions/fresh-air",
        desc: "HRV and ERV systems that bring in clean outdoor air while recovering heat energy — essential for today's airtight homes.",
        modal: {
          heading: "Fresh Air & Ventilation Systems",
          body: "Modern energy-efficient homes are so well sealed that indoor air quality suffers. MetricAir installs HRV and ERV systems that exchange stale indoor air with fresh outdoor air while recovering up to 80% of heat energy.",
          features: ["HRV & ERV systems", "Up to 80% heat recovery", "CO₂ & humidity control", "HEPA filtration add-ons", "UV air purification", "Balanced ventilation design"],
        },
        icon: (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="8" width="18" height="8" rx="2" fill="currentColor" fillOpacity="0.1"/>
            <rect x="3" y="8" width="18" height="8" rx="2"/>
            <path d="M6 10.5h7"/><path d="M11 9l2 1.5-2 1.5"/>
            <path d="M18 13.5h-7"/><path d="M13 15l-2-1.5 2-1.5"/>
            <path d="M3 10.5H1"/><path d="M3 13.5H1"/>
            <path d="M21 10.5h2"/><path d="M21 13.5h2"/>
          </svg>
        ),
      },
    ],
  },
  {
    category: "Light Industrial Solutions",
    href: "/light-industrial",
    description:
      "Purpose-built ventilation and climate systems for warehouses, manufacturing floors, auto shops, and light industrial facilities that demand reliability and compliance.",
    items: [
      {
        title: "Industrial Ventilation",
        href: "/light-industrial",
        desc: "Exhaust fans, louvers, and make-up air systems engineered to manage fumes, dust, heat, and humidity in demanding work environments.",
        modal: {
          heading: "Light Industrial Ventilation",
          body: "Industrial environments present unique HVAC challenges. MetricAir designs and installs industrial exhaust systems, destratification fans, radiant heating, and HVLS fans for large open facilities.",
          features: ["Industrial exhaust systems", "HVLS destratification fans", "Radiant tube heating", "Combustible dust compliance", "Engineered permit drawings", "Air quality assessments"],
        },
        icon: (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="2.5" fill="currentColor" fillOpacity="0.3"/>
            <circle cx="12" cy="12" r="2.5"/>
            <path d="M13.5 10C14 8 16 5.5 18 5c.5 2-1 4.5-3 5.5" fill="currentColor" fillOpacity="0.15"/>
            <path d="M13.5 10C14 8 16 5.5 18 5c.5 2-1 4.5-3 5.5"/>
            <path d="M10.5 14C10 16 8 18.5 6 19c-.5-2 1-4.5 3-5.5" fill="currentColor" fillOpacity="0.15"/>
            <path d="M10.5 14C10 16 8 18.5 6 19c-.5-2 1-4.5 3-5.5"/>
            <path d="M10 10.5C8 10 5.5 8 5 6c2-.5 4.5 1 5.5 3" fill="currentColor" fillOpacity="0.15"/>
            <path d="M10 10.5C8 10 5.5 8 5 6c2-.5 4.5 1 5.5 3"/>
            <path d="M14 13.5C16 14 18.5 16 19 18c-2 .5-4.5-1-5.5-3" fill="currentColor" fillOpacity="0.15"/>
            <path d="M14 13.5C16 14 18.5 16 19 18c-2 .5-4.5-1-5.5-3"/>
            <circle cx="12" cy="12" r="9"/>
          </svg>
        ),
      },
    ],
  },
];

// ── Shared input style ──
const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#e94560]/60 focus:bg-white/8 transition-all duration-200";

const labelClass = "block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1.5";

// ── Animated close button ──
function CloseButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="group relative w-9 h-9 flex items-center justify-center rounded-full border border-white/10 hover:border-[#e94560]/60 bg-white/5 hover:bg-[#e94560]/10 transition-all duration-300"
      aria-label="Close"
    >
      <span className="absolute w-4 h-px bg-gray-400 group-hover:bg-[#e94560] rotate-45 transition-colors duration-200" />
      <span className="absolute w-4 h-px bg-gray-400 group-hover:bg-[#e94560] -rotate-45 transition-colors duration-200" />
    </button>
  );
}

// ── Quote Form Modal ──
function QuoteFormModal({ onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', propertyType: '', serviceType: '', systemAge: '', urgency: '', message: '',
  });

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-8 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#16213e] border border-white/10 rounded-2xl shadow-2xl overflow-y-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'modalIn 0.3s cubic-bezier(0.22,1,0.36,1) both' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#e94560]/10 border border-[#e94560]/20 flex items-center justify-center text-[#e94560]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-bold text-base sm:text-lg">Get a Free Quote</h3>
              <p className="text-gray-500 text-xs">We'll respond within 1 business day</p>
            </div>
          </div>
          <CloseButton onClick={onClose} />
        </div>

        {/* Body */}
        <div className="px-6 sm:px-8 py-6">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
              <div className="w-14 h-14 rounded-full bg-[#e94560]/10 border border-[#e94560]/30 flex items-center justify-center text-[#e94560]">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-white font-bold text-xl">Quote Request Sent!</h4>
              <p className="text-gray-400 text-sm max-w-sm">A MetricAir specialist will review your details and contact you within 1 business day.</p>
              <button onClick={onClose} className="mt-2 px-6 py-2.5 rounded-full text-white text-sm font-bold uppercase tracking-widest transition-all hover:brightness-110" style={{ background: '#e94560' }}>
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Full Name *</label>
                  <input name="name" required value={form.name} onChange={handle} placeholder="John Smith" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Email Address *</label>
                  <input name="email" type="email" required value={form.email} onChange={handle} placeholder="john@example.com" className={inputClass} />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Phone Number</label>
                  <input name="phone" type="tel" value={form.phone} onChange={handle} placeholder="+1 (555) 000-0000" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Property Type *</label>
                  <select name="propertyType" required value={form.propertyType} onChange={handle} className={inputClass}>
                    <option value="" disabled>Select type</option>
                    <option>Residential Home</option>
                    <option>Restaurant / Kitchen</option>
                    <option>Office / Retail</option>
                    <option>Light Industrial</option>
                    <option>Other Commercial</option>
                  </select>
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Service Needed *</label>
                  <select name="serviceType" required value={form.serviceType} onChange={handle} className={inputClass}>
                    <option value="" disabled>Select service</option>
                    <option>New Installation</option>
                    <option>Replacement / Upgrade</option>
                    <option>Repair</option>
                    <option>Maintenance / Tune-up</option>
                    <option>Air Quality Assessment</option>
                    <option>Permit & Drawings</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Current System Age</label>
                  <select name="systemAge" value={form.systemAge} onChange={handle} className={inputClass}>
                    <option value="">Select age</option>
                    <option>No existing system</option>
                    <option>0–5 years</option>
                    <option>6–10 years</option>
                    <option>11–15 years</option>
                    <option>15+ years</option>
                  </select>
                </div>
              </div>

              {/* Row 4 */}
              <div>
                <label className={labelClass}>Urgency</label>
                <div className="flex flex-wrap gap-2">
                  {['Not urgent', 'Within a week', 'Within 48 hrs', 'Emergency'].map((u) => (
                    <button
                      type="button"
                      key={u}
                      onClick={() => setForm({ ...form, urgency: u })}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                        form.urgency === u
                          ? 'bg-[#e94560] border-[#e94560] text-white'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:border-[#e94560]/40 hover:text-white'
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className={labelClass}>Additional Details</label>
                <textarea
                  name="message"
                  rows={3}
                  value={form.message}
                  onChange={handle}
                  placeholder="Describe your space, existing issues, or any specific requirements..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3 rounded-full text-white text-sm font-bold uppercase tracking-widest transition-all hover:brightness-110 flex items-center justify-center gap-2"
                style={{ background: '#e94560' }}
              >
                Submit Quote Request
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>

              <p className="text-gray-600 text-xs text-center">
                No spam. No obligation. We respect your privacy.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Expert Contact Form Modal ──
function ExpertFormModal({ onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', topic: '', preferredTime: '', message: '',
  });

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-8 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#16213e] border border-white/10 rounded-2xl shadow-2xl overflow-y-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'modalIn 0.3s cubic-bezier(0.22,1,0.36,1) both' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#e94560]/10 border border-[#e94560]/20 flex items-center justify-center text-[#e94560]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-bold text-base sm:text-lg">Talk to Our Expert</h3>
              <p className="text-gray-500 text-xs">Book a free consultation call</p>
            </div>
          </div>
          <CloseButton onClick={onClose} />
        </div>

        {/* Body */}
        <div className="px-6 sm:px-8 py-6">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
              <div className="w-14 h-14 rounded-full bg-[#e94560]/10 border border-[#e94560]/30 flex items-center justify-center text-[#e94560]">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-white font-bold text-xl">We'll Be in Touch!</h4>
              <p className="text-gray-400 text-sm max-w-sm">One of our HVAC specialists will reach out at your preferred time to discuss your needs.</p>
              <button onClick={onClose} className="mt-2 px-6 py-2.5 rounded-full text-white text-sm font-bold uppercase tracking-widest transition-all hover:brightness-110" style={{ background: '#e94560' }}>
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Full Name *</label>
                  <input name="name" required value={form.name} onChange={handle} placeholder="John Smith" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Email Address *</label>
                  <input name="email" type="email" required value={form.email} onChange={handle} placeholder="john@example.com" className={inputClass} />
                </div>
              </div>

              {/* Row 2 */}
              <div>
                <label className={labelClass}>Phone Number</label>
                <input name="phone" type="tel" value={form.phone} onChange={handle} placeholder="+1 (555) 000-0000" className={inputClass} />
              </div>

              {/* Topic */}
              <div>
                <label className={labelClass}>What do you need help with? *</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Heating', 'Cooling', 'Ventilation',
                    'Commercial Kitchen', 'Industrial', 'Rentals', 'Other'
                  ].map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setForm({ ...form, topic: t })}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                        form.topic === t
                          ? 'bg-[#e94560] border-[#e94560] text-white'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:border-[#e94560]/40 hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred time */}
              <div>
                <label className={labelClass}>Preferred Call Time</label>
                <select name="preferredTime" value={form.preferredTime} onChange={handle} className={inputClass}>
                  <option value="">Select a time slot</option>
                  <option>Morning (8am – 12pm)</option>
                  <option>Afternoon (12pm – 4pm)</option>
                  <option>Evening (4pm – 7pm)</option>
                  <option>Anytime</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className={labelClass}>Brief Description</label>
                <textarea
                  name="message"
                  rows={3}
                  value={form.message}
                  onChange={handle}
                  placeholder="Tell us a bit about your situation so we can prepare..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3 rounded-full text-white text-sm font-bold uppercase tracking-widest transition-all hover:brightness-110 flex items-center justify-center gap-2"
                style={{ background: '#e94560' }}
              >
                Book My Consultation
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>

              <p className="text-gray-600 text-xs text-center">
                Free consultation. No commitment required.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Detail Modal (Learn More) ──
function DetailModal({ item, onClose, onGetQuote }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-8 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#16213e] border border-white/10 rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'modalIn 0.3s cubic-bezier(0.22,1,0.36,1) both' }}
      >
        <div className="flex items-start justify-between gap-4 p-6 sm:p-8 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-lg bg-[#e94560]/10 border border-[#e94560]/20 flex items-center justify-center text-[#e94560] shrink-0">
              {item.icon}
            </div>
            <h3 className="text-white font-bold text-lg sm:text-xl leading-snug">
              {item.modal.heading}
            </h3>
          </div>
          <CloseButton onClick={onClose} />
        </div>

        <div className="p-6 sm:p-8 flex flex-col gap-6">
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            {item.modal.body}
          </p>
          <div>
            <p className="text-[#e94560] text-xs font-bold uppercase tracking-widest mb-4">
              What's Included
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {item.modal.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-gray-300 text-sm">
                  <svg className="w-4 h-4 text-[#e94560] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          {/* Opens QuoteFormModal */}
          <button
            onClick={() => { onClose(); onGetQuote(); }}
            className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white text-sm font-bold uppercase tracking-widest transition-all hover:brightness-110"
            style={{ background: '#e94560' }}
          >
            Get a Free Quote
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── useInView ──
function useInView(threshold = 0.15) {
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

// ── AnimatedSection ──
function AnimatedSection({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ── SplitButton — opens ExpertFormModal ──
function SplitButton({ onClick, children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative inline-flex items-center justify-center overflow-hidden rounded-full border border-[#e94560] text-sm font-bold uppercase tracking-widest px-10 py-3.5 cursor-pointer select-none"
      style={{ minWidth: '260px' }}
    >
      <span
        className="absolute inset-y-0 left-0 w-1/2 transition-transform duration-300 ease-in-out"
        style={{ background: '#e94560', transform: hovered ? 'translateX(-100%)' : 'translateX(0)' }}
      />
      <span
        className="absolute inset-y-0 right-0 w-1/2 transition-transform duration-300 ease-in-out"
        style={{ background: '#e94560', transform: hovered ? 'translateX(100%)' : 'translateX(0)' }}
      />
      <span
        className="relative z-10 transition-colors duration-300"
        style={{ color: hovered ? '#e94560' : '#ffffff' }}
      >
        {children}
      </span>
    </button>
  );
}

// ── Main export ──
export default function RealWorldApplications() {
  const [activeDetail, setActiveDetail] = useState(null);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [expertOpen, setExpertOpen] = useState(false);

  return (
    <>
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.96) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      <section className="w-full bg-[#1a1a2e] text-white py-16 sm:py-20 lg:py-28 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">

          {/* ── Section header ── */}
          <AnimatedSection className="text-center mb-14 sm:mb-16 lg:mb-20">
            <p className="text-[#e94560] text-xs font-bold uppercase tracking-widest mb-3">
              Real World Applications
            </p>
            <h2 className="text-white font-bold leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              HVAC Solutions Built for <br className="hidden sm:block" />
              Every Environment
            </h2>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Whether it's a bustling restaurant kitchen, a family home, or a light industrial facility —
              MetricAir engineers the right system for your space, your climate, and your budget.
            </p>
            <div className="mt-6 w-12 h-1 rounded-full bg-[#e94560] mx-auto" />
          </AnimatedSection>

          {/* ── Application blocks ── */}
          <div className="flex flex-col gap-16 sm:gap-20 lg:gap-24">
            {applications.map((app) => (
              <div key={app.category}>
                <AnimatedSection delay={100}>
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8 sm:mb-10 pb-4 border-b border-white/10">
                    <div>
                      <Link
                        to={app.href}
                        className="inline-block text-[#e94560] text-xs font-bold uppercase tracking-widest mb-2 hover:text-white transition-colors duration-150"
                      >
                        {app.category} ↗
                      </Link>
                      <p className="text-gray-400 text-sm sm:text-base max-w-xl leading-relaxed">
                        {app.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>

                <div className={`grid gap-6 grid-cols-1
                  ${app.items.length === 2 ? 'sm:grid-cols-2' : ''}
                  ${app.items.length === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : ''}
                `}>
                  {app.items.map((item, ii) => (
                    <AnimatedSection key={item.title} delay={150 + ii * 100}>
                      <div className="group flex flex-col gap-4 p-6 sm:p-7 rounded-xl bg-white/5 border border-white/10 hover:border-[#e94560]/50 hover:bg-white/[0.08] transition-all duration-300 h-full">
                        <div className="w-11 h-11 rounded-lg bg-[#e94560]/10 border border-[#e94560]/20 flex items-center justify-center text-[#e94560] group-hover:bg-[#e94560]/20 transition-colors duration-300">
                          {item.icon}
                        </div>
                        <Link to={item.href} className="text-white font-semibold text-base sm:text-lg group-hover:text-[#e94560] transition-colors duration-200">
                          {item.title}
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed flex-1">
                          {item.desc}
                        </p>
                        <button
                          onClick={() => setActiveDetail(item)}
                          className="inline-flex items-center gap-1.5 text-[#e94560] text-xs font-bold uppercase tracking-widest mt-2 hover:gap-3 transition-all duration-200 w-fit"
                        >
                          Learn More
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </button>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ── Bottom CTA ── */}
          <AnimatedSection delay={100} className="mt-20 sm:mt-24">
            <div className="rounded-2xl bg-white/5 border border-white/10 p-8 sm:p-10 lg:p-14 text-center">
              <p className="text-[#e94560] text-xs font-bold uppercase tracking-widest mb-3">
                Not Sure Where to Start?
              </p>
              <h3 className="text-white font-bold text-xl sm:text-2xl lg:text-3xl mb-4">
                Talk to a MetricAir HVAC Specialist
              </h3>
              <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
                Our certified technicians assess your space and recommend the most efficient, cost-effective system — with no pressure and no guesswork.
              </p>
              <div className="flex justify-center">
                {/* Opens ExpertFormModal */}
                <SplitButton onClick={() => setExpertOpen(true)}>
                  Talk to Our Expert
                </SplitButton>
              </div>
            </div>
          </AnimatedSection>

        </div>
      </section>

      {/* ── Modals ── */}
      {activeDetail && (
        <DetailModal
          item={activeDetail}
          onClose={() => setActiveDetail(null)}
          onGetQuote={() => setQuoteOpen(true)}
        />
      )}
      {quoteOpen && <QuoteFormModal onClose={() => setQuoteOpen(false)} />}
      {expertOpen && <ExpertFormModal onClose={() => setExpertOpen(false)} />}
    </>
  );
}