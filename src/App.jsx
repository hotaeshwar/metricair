// src/App.jsx
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar                from "./components/Navbar";
import Hero                  from "./components/Hero";
import RealWorldApplications from "./components/RealWorldApplications";
import IndustryLeader        from "./components/IndustryLeader";
import AboutUs               from "./components/Aboutus";
import ContactUs             from "./components/Contactus";
import Careers               from "./components/Careers";
import Feedback              from "./components/Feedback";
import Store                 from "./components/Store";
import ResidentialHeating    from "./components/Residentialheating";
import ResidentialCooling    from "./components/ResidentialCooling";
import FreshAir              from "./components/Freshair";
import CommercialRestaurant  from "./components/CommercialRestaurant";
import Footer                from "./components/Footer";

/* ── Scroll to top on every route change ── */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

/* ── Splash Screen ── */
function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const steps = [
      { target: 30,  duration: 300 },
      { target: 55,  duration: 250 },
      { target: 72,  duration: 400 },
      { target: 88,  duration: 200 },
      { target: 100, duration: 250 },
    ];

    let current = 0;
    let stepIndex = 0;

    const runStep = () => {
      if (stepIndex >= steps.length) return;
      const { target, duration } = steps[stepIndex];
      const start = current;
      const diff = target - start;
      const startTime = performance.now();

      const tick = (now) => {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / duration, 1);
        const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        current = Math.round(start + diff * eased);
        setProgress(current);
        if (t < 1) {
          requestAnimationFrame(tick);
        } else {
          stepIndex++;
          if (stepIndex < steps.length) {
            setTimeout(runStep, 40);
          } else {
            setTimeout(() => {
              setFadeOut(true);
              setTimeout(() => onComplete?.(), 600);
            }, 300);
          }
        }
      };
      requestAnimationFrame(tick);
    };

    const timer = setTimeout(runStep, 200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "#0f0f1a",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      transition: "opacity 0.6s ease, transform 0.6s ease",
      opacity: fadeOut ? 0 : 1,
      transform: fadeOut ? "scale(1.04)" : "scale(1)",
      pointerEvents: fadeOut ? "none" : "all",
    }}>
      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -60%)",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(233,69,96,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Spinning rings + logo */}
      <div style={{ position: "relative", width: "280px", height: "280px", marginBottom: "40px" }}>
        {/* Outer ring */}
        <svg viewBox="0 0 180 180" style={{ position: "absolute", inset: 0, animation: "spinRing 1.4s linear infinite" }}>
          <circle cx="90" cy="90" r="82" fill="none" stroke="rgba(233,69,96,0.15)" strokeWidth="2" />
          <circle cx="90" cy="90" r="82" fill="none" stroke="#e94560" strokeWidth="2.5"
            strokeLinecap="round" strokeDasharray="80 436" strokeDashoffset="0" />
        </svg>
        {/* Inner ring */}
        <svg viewBox="0 0 180 180" style={{ position: "absolute", inset: "18px", animation: "spinRingReverse 2s linear infinite" }}>
          <circle cx="72" cy="72" r="64" fill="none" stroke="rgba(233,69,96,0.08)" strokeWidth="1.5" />
          <circle cx="72" cy="72" r="64" fill="none" stroke="rgba(233,69,96,0.5)" strokeWidth="1.5"
            strokeLinecap="round" strokeDasharray="40 362" strokeDashoffset="0" />
        </svg>
        {/* Logo */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src="/images/metric.png" alt="MetricAir" style={{
            width: "70vw", maxWidth: "320px", height: "auto", objectFit: "contain",
            animation: "pulseLogo 2s ease-in-out infinite",
          }} />
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        width: "220px", height: "2px",
        background: "rgba(255,255,255,0.06)",
        borderRadius: "9999px", overflow: "hidden", marginBottom: "14px",
      }}>
        <div style={{
          height: "100%", width: `${progress}%`,
          background: "linear-gradient(90deg, #c73652, #e94560, #ff6b81)",
          borderRadius: "9999px", transition: "width 0.08s linear",
          boxShadow: "0 0 8px rgba(233,69,96,0.7)",
        }} />
      </div>

      {/* Percentage */}
      <span style={{
        fontFamily: "'Courier New', monospace",
        fontSize: "11px", letterSpacing: "0.2em",
        color: "rgba(233,69,96,0.7)", fontWeight: "600",
      }}>
        {progress}%
      </span>

      <style>{`
        @keyframes spinRing        { from { transform: rotate(0deg); }   to { transform: rotate(360deg); } }
        @keyframes spinRingReverse { from { transform: rotate(0deg); }   to { transform: rotate(-360deg); } }
        @keyframes pulseLogo       { 0%,100% { opacity:0.85; transform:scale(1); } 50% { opacity:1; transform:scale(1.04); } }
      `}</style>
    </div>
  );
}

/* ── App ── */
export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          {/* ── Main pages ── */}
          <Route path="/"         element={<><Hero /><RealWorldApplications /><IndustryLeader /><Footer /></>} />
          <Route path="/about"    element={<><AboutUs /><Footer /></>} />
          <Route path="/contact"  element={<><ContactUs /><Footer /></>} />
          <Route path="/careers"  element={<><Careers /><Footer /></>} />
          <Route path="/feedback" element={<><Feedback /><Footer /></>} />
          <Route path="/store"    element={<><Store /><Footer /></>} />

          {/* ── Residential Solutions ── */}
          <Route path="/residential-solutions/heating"   element={<><ResidentialHeating /><Footer /></>} />
          <Route path="/residential-solutions/cooling"   element={<><ResidentialCooling /><Footer /></>} />
          <Route path="/residential-solutions/fresh-air" element={<><FreshAir /><Footer /></>} />

          {/* ── Commercial Solutions ── */}
          <Route path="/commercial-solutions/restaurants" element={<><CommercialRestaurant /><Footer /></>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}