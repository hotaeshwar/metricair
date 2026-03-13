import { useState, useEffect, useRef } from "react";

// ── Global animation styles ──
const ANIM_STYLES = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.96); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes slideRight {
    from { opacity: 0; transform: translateX(-28px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideLeft {
    from { opacity: 0; transform: translateX(28px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  /* Scroll-reveal base */
  .reveal         { opacity: 0; transform: translateY(32px); transition: opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1); }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  .reveal-left         { opacity: 0; transform: translateX(-28px); transition: opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1); }
  .reveal-left.visible { opacity: 1; transform: translateX(0); }

  .reveal-right         { opacity: 0; transform: translateX(28px); transition: opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1); }
  .reveal-right.visible { opacity: 1; transform: translateX(0); }

  .reveal-scale         { opacity: 0; transform: scale(0.96); transition: opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1); }
  .reveal-scale.visible { opacity: 1; transform: scale(1); }

  /* Stagger helpers */
  .delay-1 { transition-delay: 0.10s !important; }
  .delay-2 { transition-delay: 0.20s !important; }
  .delay-3 { transition-delay: 0.30s !important; }
  .delay-4 { transition-delay: 0.45s !important; }

  /* Hero page-load animations */
  .hero-title  { animation: fadeUp  0.85s cubic-bezier(0.22,1,0.36,1) 0.15s both; }
  .hero-sub    { animation: fadeUp  0.85s cubic-bezier(0.22,1,0.36,1) 0.30s both; }
  .hero-main   { animation: scaleIn 0.90s cubic-bezier(0.22,1,0.36,1) 0.40s both; }
  .hero-side-1 { animation: fadeUp  0.75s cubic-bezier(0.22,1,0.36,1) 0.50s both; }
  .hero-side-2 { animation: fadeUp  0.75s cubic-bezier(0.22,1,0.36,1) 0.62s both; }
  .hero-side-3 { animation: fadeUp  0.75s cubic-bezier(0.22,1,0.36,1) 0.74s both; }

  /* IndustryLeader already has its own transition via il-* classes — we keep those */
`;

// ── Shared scroll-reveal hook ──
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ── Side video data ──
const SIDE_VIDEOS = [
  {
    id: "lasers",
    thumb: "/images/lasers.jpg",
    title: "Using Lasers to See Air!",
    tag: null,
    youtube: "https://www.youtube.com/watch?v=lasers",
  },
  {
    id: "duct101",
    thumb: "/images/duct-101.jpg",
    title: "Duct 101",
    tag: null,
    youtube: "https://www.youtube.com/watch?v=duct101",
  },
  {
    id: "parallel",
    thumb: "/images/parallel.jpg",
    title: "Where Does The Air Go?",
    tag: "Professional Development Hour",
    youtube: "https://www.youtube.com/watch?v=parallel",
  },
];

// ── Hero Section ──
function Hero({ setActiveYoutube }) {
  return (
    <div
      className="relative w-full min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: "#060d14",
        backgroundImage: "url('/images/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 z-0 bg-black/93 pointer-events-none" />
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,210,255,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,210,255,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
      />
      <div className="absolute top-5 left-5 z-0 opacity-40 pointer-events-none">
        <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
          <path d="M0 35 L0 0 L35 0" stroke="#00d4ff" strokeWidth="1.5" fill="none"/>
          <circle cx="55" cy="55" r="28" stroke="#00d4ff" strokeWidth="0.7" fill="none"/>
          <circle cx="55" cy="55" r="8" stroke="#00d4ff" strokeWidth="0.7" fill="none"/>
          <line x1="27" y1="55" x2="83" y2="55" stroke="#00d4ff" strokeWidth="0.5"/>
          <line x1="55" y1="27" x2="55" y2="83" stroke="#00d4ff" strokeWidth="0.5"/>
        </svg>
      </div>
      <div className="absolute top-5 right-5 z-0 opacity-40 pointer-events-none">
        <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
          <path d="M110 35 L110 0 L75 0" stroke="#00d4ff" strokeWidth="1.5" fill="none"/>
          <circle cx="55" cy="55" r="28" stroke="#00d4ff" strokeWidth="0.7" fill="none"/>
          <circle cx="55" cy="55" r="8" stroke="#00d4ff" strokeWidth="0.7" fill="none"/>
          <line x1="27" y1="55" x2="83" y2="55" stroke="#00d4ff" strokeWidth="0.5"/>
          <line x1="55" y1="27" x2="55" y2="83" stroke="#00d4ff" strokeWidth="0.5"/>
        </svg>
      </div>
      <div className="absolute bottom-5 left-5 z-0 opacity-40 pointer-events-none">
        <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
          <path d="M0 75 L0 110 L35 110" stroke="#00d4ff" strokeWidth="1.5" fill="none"/>
          <circle cx="55" cy="55" r="28" stroke="#00d4ff" strokeWidth="0.7" fill="none"/>
        </svg>
      </div>
      <div className="absolute bottom-5 right-5 z-0 opacity-40 pointer-events-none">
        <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
          <path d="M110 75 L110 110 L75 110" stroke="#00d4ff" strokeWidth="1.5" fill="none"/>
          <circle cx="55" cy="55" r="28" stroke="#00d4ff" strokeWidth="0.7" fill="none"/>
        </svg>
      </div>
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 z-0 pointer-events-none"
        style={{
          width: "80%",
          height: "280px",
          background: "radial-gradient(ellipse at center top, rgba(0,210,255,0.12) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center gap-8">
        {/* Title — fades up on load */}
        <div className="text-center px-2 hero-title">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight mb-3">
            Engineering better air
          </h1>
          <p className="hero-sub text-gray-400 text-sm sm:text-base lg:text-lg tracking-widest font-light">
            Integrated air systems engineered for performance, comfort, and longevity.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          {/* Main video — scales in */}
          <div
            className="flex-1 relative rounded-2xl overflow-hidden hero-main"
            style={{
              minHeight: "300px",
              border: "1.5px solid rgba(0,210,255,0.5)",
              boxShadow: "0 0 0 1px rgba(0,210,255,0.08), 0 0 40px rgba(0,210,255,0.2), 0 0 100px rgba(0,210,255,0.07)",
            }}
          >
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src="/images/hero.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            <div className="absolute inset-0 flex items-end justify-center pb-8 sm:pb-10">
              <button
                onClick={() => setActiveYoutube("https://www.youtube.com/watch?v=TDMlGDtu20s")}
                className="relative flex items-center gap-3 text-white font-semibold px-6 sm:px-8 py-3 rounded-full transition-all duration-200 text-sm sm:text-base hover:brightness-110"
                style={{
                  background: "rgba(22, 65, 75, 0.95)",
                  border: "1.5px solid rgba(0,210,255,0.4)",
                  boxShadow: "0 0 20px rgba(0,210,255,0.15)",
                }}
              >
                <span
                  className="absolute -top-3.5 left-4 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider"
                  style={{ background: "#e94560" }}
                >
                  NEW
                </span>
                <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Paragon Maintenance
              </button>
            </div>
          </div>

          {/* Side thumbnails — staggered fade up */}
          <div className="flex flex-row lg:flex-col gap-3 lg:w-60 xl:w-68">
            {SIDE_VIDEOS.map((v, i) => (
              <button
                key={v.id}
                onClick={() => setActiveYoutube(v.youtube)}
                className={`relative flex-1 lg:flex-none rounded-xl overflow-hidden group transition-all duration-200 hover:brightness-110 hero-side-${i + 1}`}
                style={{
                  minHeight: "88px",
                  border: "1.5px solid rgba(0,210,255,0.3)",
                  boxShadow: "0 0 14px rgba(0,210,255,0.08)",
                }}
              >
                <img
                  src={v.thumb}
                  alt={v.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  style={{ minHeight: "88px", maxHeight: "128px" }}
                />
                <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors duration-200" />
                {v.tag && (
                  <div
                    className="absolute bottom-0 left-0 right-0 flex items-center gap-2 px-3 py-2"
                    style={{ background: "rgba(8,16,24,0.88)" }}
                  >
                    <div className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center shrink-0">
                      <svg className="w-2.5 h-2.5 fill-white" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <span className="text-white text-xs font-medium truncate">{v.tag}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Real World Applications Section ──
function RealWorldApplications() {
  const textRef = useReveal();
  const imgRef  = useReveal();

  return (
    <section className="w-full bg-[#0a0a0a] px-4 sm:px-6 lg:px-8 py-5">
      <div
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center overflow-hidden rounded-2xl"
        style={{ background: "#1c1c1c" }}
      >
        {/* Text — slides in from left */}
        <div
          ref={textRef}
          className="reveal-left w-full md:w-[38%] lg:w-[35%] flex flex-col justify-center gap-5 px-8 sm:px-10 py-10 shrink-0"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#cc2200] leading-tight">
            Real-world applications
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            See how CaptiveAire Systems have been used to improve air quality
            and comfort in spaces just like yours.
          </p>
          <div>
            <a
              href="/applications"
              className="inline-block px-7 py-2.5 rounded-full text-white text-sm font-semibold transition-all duration-200 hover:brightness-125"
              style={{
                background: "linear-gradient(135deg, #1b5060 0%, #0d3545 100%)",
                border: "1px solid rgba(0,180,210,0.3)",
              }}
            >
              Featured Applications
            </a>
          </div>
        </div>

        {/* Image — slides in from right */}
        <div
          ref={imgRef}
          className="reveal-right w-full md:w-[62%] lg:w-[65%] p-3 md:pl-0"
        >
          <img
            src="/images/homefeauture.jpg"
            alt="Real-world HVAC applications"
            className="w-full object-cover rounded-2xl"
            style={{ height: "220px", filter: "grayscale(100%) brightness(0.65)" }}
          />
        </div>
      </div>
    </section>
  );
}

// ── Data Driven HVAC Section ──
function DataDrivenHVAC({ setActiveYoutube }) {
  const textRef = useReveal();
  const imgRef  = useReveal();

  return (
    <section className="w-full bg-[#0a0a0a] px-4 sm:px-6 lg:px-8 py-5">
      <div
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center overflow-hidden rounded-2xl"
        style={{ background: "#1c1c1c" }}
      >
        {/* Text — slides in from left */}
        <div
          ref={textRef}
          className="reveal-left w-full md:w-[38%] lg:w-[35%] flex flex-col justify-center gap-5 px-8 sm:px-10 py-10 shrink-0"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#cc2200] leading-tight">
            Data-driven HVAC
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Our answer to building management.
          </p>
          <div>
            <button
              onClick={() => setActiveYoutube("https://www.youtube.com/watch?v=BpGhwZE1vJY&t=6s")}
              className="flex items-center gap-3 px-7 py-2.5 rounded-full text-white text-sm font-semibold transition-all duration-200 hover:brightness-125"
              style={{
                background: "linear-gradient(135deg, #1b5060 0%, #0d3545 100%)",
                border: "1px solid rgba(0,180,210,0.3)",
              }}
            >
              <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch the Film
            </button>
          </div>
          <a
            href="https://www.captiveaire.com/catalogcontent/electriccontrols/CASLink/index.asp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 text-sm underline underline-offset-4 hover:text-white transition-colors duration-200 w-fit"
          >
            Learn more about CASLink
          </a>
        </div>

        {/* Image — slides in from right */}
        <div
          ref={imgRef}
          className="reveal-right w-full md:w-[62%] lg:w-[65%] p-3 md:pl-0"
        >
          <img
            src="/images/feauture.jpg"
            alt="Data-driven HVAC dashboard"
            className="w-full object-cover rounded-2xl"
            style={{ height: "220px" }}
          />
        </div>
      </div>
    </section>
  );
}

// ── Industry Leader Section ──
function IndustryLeader() {
  const headingRef = useRef(null);
  const paraRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("il-in");
          }
        });
      },
      { threshold: 0.15 }
    );
    if (headingRef.current) observer.observe(headingRef.current);
    if (paraRef.current) observer.observe(paraRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .il-bg {
          background-color: #0d0d0d;
          background-image:
            linear-gradient(rgba(0,200,220,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,200,220,0.03) 1px, transparent 1px),
            radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,180,210,0.06) 0%, transparent 70%);
          background-size: 40px 40px, 40px 40px, 100% 100%;
        }
        .il-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            135deg, transparent, transparent 60px,
            rgba(0,180,210,0.025) 60px, rgba(0,180,210,0.025) 61px
          );
          pointer-events: none;
        }
        .il-h {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.85s cubic-bezier(0.22,1,0.36,1),
                      transform 0.85s cubic-bezier(0.22,1,0.36,1);
        }
        .il-h.il-in { opacity: 1; transform: translateY(0); }
        .il-p {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.22s,
                      transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.22s;
        }
        .il-p.il-in { opacity: 1; transform: translateY(0); }
        .il-title {
          color: #00c8dc;
          text-shadow: 0 0 40px rgba(0,200,220,0.35), 0 0 80px rgba(0,200,220,0.15);
        }
      `}</style>

      <section
        className="relative il-bg w-full overflow-hidden flex items-center justify-center"
        style={{ minHeight: "clamp(220px, 28vw, 400px)" }}
      >
        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, rgba(0,0,0,0.65) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-10 lg:px-16 py-14 sm:py-20 lg:py-24 text-center flex flex-col items-center gap-5 sm:gap-7">
          <h2
            ref={headingRef}
            className="il-h il-title font-black leading-tight text-3xl sm:text-5xl lg:text-6xl xl:text-7xl"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif", letterSpacing: "-0.01em" }}
          >
            The industry leader in innovation
          </h2>
          <p
            ref={paraRef}
            className="il-p text-gray-400 leading-relaxed max-w-3xl text-xs sm:text-sm lg:text-base"
            style={{ fontFamily: "'Georgia', serif", letterSpacing: "0.01em" }}
          >
            CaptiveAire® is the nation's leading manufacturer of commercial kitchen ventilation
            systems, and now provides a complete solution of fans, heaters, ductwork, and HVAC
            equipment. For over 45 years, we've led the industry with innovative technologies,
            unmatched service, competitive pricing, and rapid lead times. Explore our products to
            discover how we can help you maximize efficiency and achieve exceptional indoor air
            quality.
          </p>
        </div>

        {/* Bottom cyan line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0,200,220,0.4) 30%, rgba(0,200,220,0.4) 70%, transparent)",
          }}
        />
      </section>
    </>
  );
}

// ── Home Page ──
export default function Home() {
  const [activeYoutube, setActiveYoutube] = useState(null);

  return (
    <>
      {/* Inject global animation keyframes + reveal classes */}
      <style>{ANIM_STYLES}</style>

      <Hero setActiveYoutube={setActiveYoutube} />
      <RealWorldApplications />
      <DataDrivenHVAC setActiveYoutube={setActiveYoutube} />
      <IndustryLeader />

      {/* Shared YouTube Modal */}
      {activeYoutube && (
        <div
          className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4"
          onClick={() => setActiveYoutube(null)}
        >
          <div
            className="relative w-full max-w-3xl aspect-video bg-black rounded-2xl overflow-hidden"
            style={{
              border: "1.5px solid rgba(0,210,255,0.45)",
              boxShadow: "0 0 50px rgba(0,210,255,0.25)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${new URL(activeYoutube).searchParams.get("v")}?autoplay=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="YouTube video"
            />
            <button
              onClick={() => setActiveYoutube(null)}
              className="absolute top-3 right-3 bg-black/60 hover:bg-black text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors text-sm"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}