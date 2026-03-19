// src/components/FreeConsultation.jsx
import React, { useState, useRef, useEffect } from 'react';

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export default function FreeConsultation() {
  const [form, setForm]         = useState({ fullName: '', email: '' });
  const [status, setStatus]     = useState('idle');
  const [pdfFile, setPdfFile]   = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef            = useRef(null);

  const [leftRef, leftInView]   = useInView(0.1);
  const [rightRef, rightInView] = useInView(0.1);

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFileSelect = (file) => {
    if (file && file.type === 'application/pdf') setPdfFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const payload = new FormData();
    payload.append('access_key',  'ba99ae3b-60cc-404c-b207-2a42e86aafb6');
    payload.append('subject',     `Free Consultation Request – ${form.fullName}`);
    payload.append('from_name',   'MetricAir Website');
    payload.append('email',       form.email);
    payload.append('reply_to',    form.email);
    payload.append('to',          'metricairlimited.ca@gmail.com');
    payload.append('message',
      `FREE CONSULTATION REQUEST – METRICAIR\n\nName:  ${form.fullName}\nEmail: ${form.email}\n${
        pdfFile ? `Attachment: ${pdfFile.name}` : 'No attachment'
      }\n\nSubmitted: ${new Date().toLocaleString()}`
    );
    if (pdfFile) payload.append('attachment', pdfFile);

    try {
      const res  = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: payload });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ fullName: '', email: '' });
        setPdfFile(null);
      } else {
        throw new Error('failed');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <style>{`
        /* ── fade-slide helpers ── */
        .fade-left {
          opacity: 0;
          transform: translateX(-36px);
          transition: opacity 0.75s cubic-bezier(0.22,1,0.36,1),
                      transform 0.75s cubic-bezier(0.22,1,0.36,1);
        }
        .fade-left.visible {
          opacity: 1;
          transform: translateX(0);
        }
        .fade-right {
          opacity: 0;
          transform: translateX(36px);
          transition: opacity 0.75s cubic-bezier(0.22,1,0.36,1) 0.1s,
                      transform 0.75s cubic-bezier(0.22,1,0.36,1) 0.1s;
        }
        .fade-right.visible {
          opacity: 1;
          transform: translateX(0);
        }

        /* ── Red split-apart button ── */
        .split-btn {
          position: relative;
          overflow: hidden;
        }
        .split-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          right: 50%;
          background: #e94560;
          transition: transform 0.38s cubic-bezier(0.77, 0, 0.175, 1);
          z-index: 0;
        }
        .split-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          left: 50%;
          background: #e94560;
          transition: transform 0.38s cubic-bezier(0.77, 0, 0.175, 1);
          z-index: 0;
        }
        .split-btn:hover::before { transform: translateX(-100%); }
        .split-btn:hover::after  { transform: translateX(100%); }
        .split-btn > span {
          position: relative;
          z-index: 1;
        }
      `}</style>

      <section className="w-full bg-[#0d1233] py-16 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

            {/* ── LEFT: Text ── */}
            <div
              ref={leftRef}
              className={`text-white fade-left ${leftInView ? 'visible' : ''}`}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-5 leading-snug">
                Book a Free Consultation
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Its the perfect time to save on a new furnace with our limited time up to 30% off select furnace
                units. You may be eligible to receive a FREE* Nest Learning Thermostat upon the furnace
                installation. Fill out the form and we'll let you know if you qualify. Don't miss these amazing
                offers, act fast and fill out the form for a free in-home consultation.
              </p>
            </div>

            {/* ── RIGHT: Form ── */}
            <div
              ref={rightRef}
              className={`fade-right ${rightInView ? 'visible' : ''}`}
            >
              {status === 'success' ? (
                <div className="flex flex-col gap-4">
                  <p className="text-white text-base font-medium">
                    ✓ Request sent! We'll be in touch shortly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="self-start text-gray-400 text-sm underline hover:text-white transition-colors duration-200"
                  >
                    Submit another
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4 w-full max-w-md lg:max-w-none lg:ml-auto"
                >
                  {/* Full Name */}
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                    className="w-full bg-transparent border border-white/25 rounded px-4 py-3 text-white text-sm placeholder-gray-400 outline-none focus:border-white transition-colors duration-200"
                  />

                  {/* Email */}
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                    className="w-full bg-transparent border border-white/25 rounded px-4 py-3 text-white text-sm placeholder-gray-400 outline-none focus:border-white transition-colors duration-200"
                  />

                  {/* PDF Upload */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    className={`
                      w-full border rounded px-4 py-3 cursor-pointer
                      transition-colors duration-200
                      ${dragOver
                        ? 'border-white bg-white/10'
                        : pdfFile
                          ? 'border-white/50 bg-white/5'
                          : 'border-white/25 hover:border-white/50'
                      }
                    `}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={(e) => handleFileSelect(e.target.files[0])}
                    />
                    {pdfFile ? (
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <svg className="w-4 h-4 text-red-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <polyline points="14 2 14 8 20 8"/>
                            <line x1="9" y1="13" x2="15" y2="13"/>
                            <line x1="9" y1="17" x2="11" y2="17"/>
                          </svg>
                          <span className="text-white text-sm truncate">{pdfFile.name}</span>
                          <span className="text-gray-500 text-xs shrink-0">
                            ({(pdfFile.size / 1024).toFixed(0)} KB)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setPdfFile(null); }}
                          className="text-gray-500 hover:text-white text-xs shrink-0 transition-colors duration-200"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <svg className="w-4 h-4 text-gray-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                          <polyline points="17 8 12 3 7 8"/>
                          <line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                        <span className="text-gray-400 text-sm">
                          {dragOver ? 'Drop PDF here' : 'Upload PDF (optional) — click or drag & drop'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Error */}
                  {status === 'error' && (
                    <p className="text-red-400 text-xs -mt-1">
                      Something went wrong — please try again.
                    </p>
                  )}

                  {/* Red split-apart button */}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="split-btn self-start px-7 py-3 rounded text-white text-sm font-medium cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span>{status === 'sending' ? 'Sending…' : 'Send Message'}</span>
                  </button>

                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}