// src/components/FAQ.jsx
import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

function useInView(threshold = 0.05) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    let timer;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => {
            setInView(true);
          }, 100);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [threshold]);
  return [ref, inView];
}

const FAQS = [
  {
    question: "What services does MetricAir offer?",
    answer: "MetricAir is a premier GTA mechanical contractor. We specialize in commercial kitchen ventilation and exhaust systems, makeup air units (MUA), HVAC heating and cooling systems, custom ductwork design, structural permit drawings (BCIN stamped), industrial NFPA dust compliance, and HVAC/water heater rentals."
  },
  {
    question: "What does MEP stand for and why is it important?",
    answer: "MEP stands for Mechanical, Electrical, and Plumbing. These three building systems work together to ensure that a building is safe, operational, and comfortable. Stamped MEP engineering drawings are required by Ontario municipalities to secure building permits and guarantee building code compliance."
  },
  {
    question: "Do you service residential as well as commercial/industrial properties?",
    answer: "Yes! We provide full residential heating, cooling, and water filtration services across the GTA, including gas furnaces, air conditioning, and equipment rentals. This complements our commercial division which focuses on restaurant exhaust and industrial ventilation."
  },
  {
    question: "How does the Worry-Free Rental program work?",
    answer: "Our rental program provides GTA homeowners with brand-new furnaces, air conditioners, and water heaters with zero upfront equipment purchase costs. It includes free lifetime repair parts, regular maintenance checks, and priority emergency service dispatch."
  },
  {
    question: "Can MetricAir help with building permits and structural stamps?",
    answer: "Absolutely. MetricAir's team includes BCIN-registered designers who draft mechanical plans stamped for OBC (Ontario Building Code) compliance. We guide restaurant owners and facility managers from initial drawings to final building inspection sign-offs."
  },
  {
    question: "Where is your service coverage area?",
    answer: "We cover the Greater Toronto Area (GTA) and neighboring regions across Southern Ontario, including Toronto, Mississauga, Scarborough, Whitby, Peterborough, Windsor, London, and St. Catharines."
  }
];

export default function FAQ() {
  const [sectionRef, sectionInView] = useInView(0.02);
  const [activeIdx, setActiveIdx] = useState(null);

  const toggleAccordion = (idx) => {
    setActiveIdx(activeIdx === idx ? null : idx);
  };

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 sm:py-20 lg:py-28 px-4 sm:px-8 lg:px-16 overflow-hidden transition-all duration-1000 ease-out"
      style={{
        opacity: sectionInView ? 1 : 0,
        transform: sectionInView ? 'translateY(0)' : 'translateY(30px)',
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-[#c3252e] text-xs font-bold uppercase tracking-widest block mb-3">
            Questions & Answers
          </span>
          <h2 className="font-black text-2xl sm:text-3xl lg:text-4xl leading-tight">
            <span className="text-[#c3252e]">Frequently Asked </span>
            <span className="text-white">Questions</span>
          </h2>
          <div className="w-12 h-1 rounded-full bg-gradient-to-r from-[#c3252e] to-white mx-auto mt-4" />
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-4">
          {FAQS.map((faq, idx) => {
            const isOpen = activeIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
              >
                {/* Accordion Title Button */}
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between text-left p-5 sm:p-6 text-white hover:text-[#c3252e] transition-colors focus:outline-none cursor-pointer"
                >
                  <span className="font-bold text-sm sm:text-base leading-snug">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-gray-400 group-hover:text-white transition-transform duration-300 shrink-0 ml-4 ${
                      isOpen ? 'rotate-180 text-[#c3252e]' : ''
                    }`}
                  />
                </button>

                {/* Accordion Answer Content */}
                <div
                  className={`overflow-hidden transition-all duration-350 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100 border-t border-white/5 bg-white/2' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="p-5 sm:p-6 text-gray-300 text-xs sm:text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
