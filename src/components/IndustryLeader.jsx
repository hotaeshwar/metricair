import { useEffect, useRef } from "react";

export default function IndustryLeader() {
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
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
        /* Dark circuit-board texture pattern */
        .circuit-bg {
          background-color: #0d0d0d;
          background-image:
            linear-gradient(rgba(0,200,220,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,200,220,0.03) 1px, transparent 1px),
            radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,180,210,0.06) 0%, transparent 70%);
          background-size: 40px 40px, 40px 40px, 100% 100%;
        }

        /* Diagonal line overlay */
        .circuit-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            repeating-linear-gradient(
              135deg,
              transparent,
              transparent 60px,
              rgba(0,180,210,0.025) 60px,
              rgba(0,180,210,0.025) 61px
            );
          pointer-events: none;
        }

        /* Scroll/load animation base state */
        .fade-up {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1);
        }

        .fade-up.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .fade-up-delay {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.22s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.22s;
        }

        .fade-up-delay.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* Cyan text glow */
        .cyan-glow {
          color: #00c8dc;
          text-shadow: 0 0 40px rgba(0,200,220,0.35), 0 0 80px rgba(0,200,220,0.15);
        }

        /* Section fade-in on load */
        @keyframes sectionFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .section-reveal {
          animation: sectionFadeIn 0.9s cubic-bezier(0.22,1,0.36,1) both;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative circuit-bg section-reveal w-full overflow-hidden flex items-center justify-center mt-16"
        style={{ minHeight: "clamp(220px, 28vw, 400px)" }}
      >
        {/* Vignette edges */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, rgba(0,0,0,0.65) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-10 lg:px-16 py-14 sm:py-20 lg:py-24 text-center flex flex-col items-center gap-5 sm:gap-7">
          {/* Heading */}
          <h1
            ref={headingRef}
            className="fade-up cyan-glow font-black leading-tight tracking-tight
              text-3xl sm:text-5xl lg:text-6xl xl:text-7xl"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif", letterSpacing: "-0.01em" }}
          >
            The industry leader in innovation
          </h1>

          {/* Body paragraph */}
          <p
            ref={paraRef}
            className="fade-up-delay text-gray-400 leading-relaxed max-w-3xl
              text-xs sm:text-sm lg:text-base"
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

        {/* Bottom border glow line */}
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