import React, { useState, useRef } from 'react';

export default function LeadForm({ 
  subject = 'Free Consultation Request', 
  fromName = 'MetricAir Website', 
  buttonText = 'Send Message',
  buttonSubmittingText = 'Sending…',
  buttonClass = '',
  onSuccess = null,
  customMessage = ''
}) {
  const [form, setForm]         = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus]     = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [drawingFile, setDrawingFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef            = useRef(null);

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFileSelect = (file) => {
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        setErrorMessage('File size must be under 100MB.');
        setStatus('error');
        return;
      }
      setErrorMessage('');
      setDrawingFile(file);
    }
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
    payload.append('_subject',    `${subject} – ${form.name}`);
    payload.append('name',        form.name);
    payload.append('email',       form.email);
    payload.append('phone',       form.phone);
    payload.append('_replyto',    form.email);
    payload.append('message_phone', form.phone);
    payload.append('message_text', form.message);
    payload.append('_captcha',    'false');
    
    const orderDetails = customMessage ? `\n\n${customMessage}\n` : '';
    payload.append('message',
      `${subject.toUpperCase()} – METRICAIR\n\nName:  ${form.name}\nEmail: ${form.email}${orderDetails}\n\n${
        drawingFile ? `Attachment: ${drawingFile.name}` : 'No attachment'
      }\n\nSubmitted: ${new Date().toLocaleString()}`
    );
    if (drawingFile) payload.append('attachment', drawingFile);

    try {
      const res  = await fetch('https://formsubmit.co/ajax/metricairlimited.ca@gmail.com', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: payload
      });
      const data = await res.json();
      if (data.success === 'true' || data.success === true) {
        setStatus('success');
        setErrorMessage('');
        setForm({ name: '', email: '', phone: '', message: '' });
        setDrawingFile(null);
        if (onSuccess) onSuccess();
      } else {
        setErrorMessage(data.message || 'Something went wrong — please try again.');
        setStatus('error');
      }
    } catch (err) {
      setErrorMessage('Something went wrong — please try again.');
      setStatus('error');
    }
  };

  return (
    <>
      <style>{`
        /* ── Red split-apart button ── */
        .split-btn-lead {
          position: relative;
          overflow: hidden;
        }
        .split-btn-lead::before {
          content: '';
          position: absolute;
          inset: 0;
          right: 50%;
          background: #c3252e;
          transition: transform 0.38s cubic-bezier(0.77, 0, 0.175, 1);
          z-index: 0;
        }
        .split-btn-lead::after {
          content: '';
          position: absolute;
          inset: 0;
          left: 50%;
          background: #c3252e;
          transition: transform 0.38s cubic-bezier(0.77, 0, 0.175, 1);
          z-index: 0;
        }
        .split-btn-lead:hover::before { transform: translateX(-100%); }
        .split-btn-lead:hover::after  { transform: translateX(100%); }
        .split-btn-lead > span {
          position: relative;
          z-index: 1;
        }
      `}</style>

      {status === 'success' ? (
        <div className="flex flex-col gap-4 py-8 text-center items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-[#c3252e]/15 border border-[#c3252e]/40 flex items-center justify-center text-[#c3252e]">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-white font-bold text-lg">Request Sent!</h3>
          <p className="text-gray-400 text-sm max-w-sm">We'll review your details and be in touch shortly.</p>
          <button
            onClick={() => setStatus('idle')}
            className="text-gray-400 text-sm underline hover:text-white transition-colors duration-200 mt-2"
          >
            Submit another
          </button>
        </div>
      ) : (
        <form
          action="https://formsubmit.co/metricairlimited.ca@gmail.com"
          onSubmit={handleSubmit}
          method="POST"
          className="flex flex-col gap-4 w-full"
        >
          {/* Full Name */}
          <input
            type="text"
            name="name"
            value={form.name}
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

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="w-full bg-transparent border border-white/25 rounded px-4 py-3 text-white text-sm placeholder-gray-400 outline-none focus:border-white transition-colors duration-200"
          />


          {/* Message */}
          <textarea
            name="message"
            value={form.message || ''}
            onChange={handleChange}
            placeholder="Message"
            rows={4}
            className="w-full bg-transparent border border-white/25 rounded px-4 py-3 text-white text-sm placeholder-gray-400 outline-none focus:border-white transition-colors duration-200 resize-none"
          />

          {/* Drawing Upload */}
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
                : drawingFile
                  ? 'border-white/50 bg-white/5'
                  : 'border-white/25 hover:border-white/50'
              }
            `}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpeg,.jpg,.png,.pdf,.doc,.docx,.xls,.xlsx,.zip,.dwg,.txt"
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files[0])}
            />
            {drawingFile ? (
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <svg className="w-4 h-4 text-red-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="9" y1="13" x2="15" y2="13"/>
                    <line x1="9" y1="17" x2="11" y2="17"/>
                  </svg>
                  <span className="text-white text-sm truncate">{drawingFile.name}</span>
                  <span className="text-gray-500 text-xs shrink-0">
                    ({(drawingFile.size / (1024 * 1024)) >= 1 ? `${(drawingFile.size / (1024 * 1024)).toFixed(1)} MB` : `${(drawingFile.size / 1024).toFixed(0)} KB`})
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setDrawingFile(null); }}
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
                  {dragOver ? 'Drop drawing file here' : 'Upload Drawing (optional) — click or drag & drop'}
                </span>
              </div>
            )}
          </div>

          {/* Error */}
          {status === 'error' && (
            <p className="text-red-400 text-xs -mt-1">
              {errorMessage || 'Something went wrong — please try again.'}
            </p>
          )}

          {/* Red split-apart button */}
          <button
            type="submit"
            disabled={status === 'sending'}
            className={`split-btn-lead self-start px-7 py-3 rounded text-white text-sm font-medium cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${buttonClass}`}
          >
            <span>{status === 'sending' ? buttonSubmittingText : buttonText}</span>
          </button>
        </form>
      )}
    </>
  );
}
