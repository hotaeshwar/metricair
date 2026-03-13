import { useEffect, useRef } from "react";

export default function RealWorldApplications() {
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
        .rwa-left {
          opacity: 0;
          transform: translateX(-28px);
          transition: opacity 0.75s cubic-bezier(0.22,1,0.36,1),
                      transform 0.75s cubic-bezier(0.22,1,0.36,1);
        }
        .rwa-left.animate-in { opacity: 1; transform: translateX(0); }

        .rwa-right {
          opacity: 0;
          transform: translateX(28px);
          transition: opacity 0.75s cubic-bezier(0.22,1,0.36,1) 0.12s,
                      transform 0.75s cubic-bezier(0.22,1,0.36,1) 0.12s;
        }
        .rwa-right.animate-in { opacity: 1; transform: translateX(0); }
      `}</style>

      <section className="w-full bg-[#0a0a0a] py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Sleek narrow card */}
          <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden flex flex-col md:flex-row">
            {/* Left side - Text content */}
            <div
              ref={textRef}
              className="rwa-left w-full md:w-1/2 p-6 md:p-8 lg:p-10 flex flex-col justify-center"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#E03A1E] leading-tight mb-3">
                Real-world
                <br />
                applications
              </h2>

              <p className="text-gray-400 text-sm md:text-base mb-6 max-w-md">
                See how CaptiveAire Systems have been used to improve air quality and comfort in spaces just like yours.
              </p>

              <div>
                <button
                  className="px-6 py-2.5 rounded-full text-white font-medium text-xs md:text-sm tracking-wide transition-all hover:brightness-110"
                  style={{
                    background: "linear-gradient(135deg, #1B4B5E 0%, #0F3A4A 100%)",
                    border: "1px solid rgba(0, 180, 210, 0.2)",
                  }}
                >
                  Featured Applications
                </button>
              </div>
            </div>

            {/* Right side - Image rectangle */}
            <div
              ref={imgRef}
              className="rwa-right w-full md:w-1/2 p-3 md:p-4 flex items-center"
            >
              <div className="w-full h-[200px] md:h-[220px] lg:h-[240px] rounded-xl overflow-hidden">
                <img
                  src="/images/homefeauture.jpg"
                  alt="HVAC installation"
                  className="w-full h-full object-cover"
                  style={{
                    filter: "grayscale(100%) brightness(0.6)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}