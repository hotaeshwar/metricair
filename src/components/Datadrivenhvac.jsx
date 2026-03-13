import { useState, useEffect, useRef } from "react";

export default function DataDrivenHVAC() {
  const [modalOpen, setModalOpen] = useState(false);
  const textRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    if (textRef.current) observer.observe(textRef.current);
    if (imgRef.current) observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .ddh-left {
          opacity: 0;
          transform: translateX(-28px);
          transition: opacity 0.75s cubic-bezier(0.22,1,0.36,1),
                      transform 0.75s cubic-bezier(0.22,1,0.36,1);
        }
        .ddh-left.animate-in { opacity: 1; transform: translateX(0); }

        .ddh-right {
          opacity: 0;
          transform: translateX(28px);
          transition: opacity 0.75s cubic-bezier(0.22,1,0.36,1) 0.12s,
                      transform 0.75s cubic-bezier(0.22,1,0.36,1) 0.12s;
        }
        .ddh-right.animate-in { opacity: 1; transform: translateX(0); }

        @keyframes ddh-modal-in {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
        .ddh-modal { animation: ddh-modal-in 0.25s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      <section className="w-full bg-[#0a0a0a] px-4 sm:px-6 lg:px-8 py-5">
        <div
          className="max-w-7xl mx-auto flex flex-col md:flex-row items-center overflow-hidden rounded-2xl"
          style={{ background: "#1c1c1c" }}
        >
          {/* Text — slides in from left */}
          <div
            ref={textRef}
            className="ddh-left w-full md:w-[38%] lg:w-[35%] flex flex-col justify-center gap-5 px-8 sm:px-10 py-10 shrink-0"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#cc2200] leading-tight">
              Data-driven HVAC
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Our answer to building management.
            </p>

            <div>
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-3 px-7 py-3 rounded-full text-white text-sm font-semibold transition-all duration-200 hover:brightness-125"
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
              href="https://www.captiveaire.com/catalogcontent/electriccontrols/CASLink/index"
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
            className="ddh-right w-full md:w-[62%] lg:w-[65%] p-3 md:pl-0"
          >
            <img
              src="/images/feauture.jpg"
              alt="Data-driven HVAC dashboard"
              className="w-full object-cover rounded-2xl"
              style={{ height: "220px" }}
            />
          </div>
        </div>

        {modalOpen && (
          <div
            className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4"
            onClick={() => setModalOpen(false)}
          >
            <div
              className="ddh-modal relative w-full max-w-3xl aspect-video bg-black rounded-2xl overflow-hidden"
              style={{
                border: "1.5px solid rgba(0,210,255,0.45)",
                boxShadow: "0 0 50px rgba(0,210,255,0.25)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/BpGhwZE1vJY?autoplay=1&t=6"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Data-driven HVAC Film"
              />
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-3 right-3 bg-black/60 hover:bg-black text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors text-sm"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}