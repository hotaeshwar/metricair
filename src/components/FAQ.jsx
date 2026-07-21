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
    question: "What does Metric Air Limited do?",
    answer: "We provide complete Mechanical, Electrical, and Plumbing (MEP) services for high-rise buildings. In addition, we specialize in HVAC systems, in-house sheet metal fabrication, and complete supply and installation services for residential, commercial, and industrial projects. Our goal is to deliver high-quality, efficient, and reliable mechanical solutions for all types of construction projects."
  },
  {
    question: "Do you work on commercial projects?",
    answer: "Yes, we primarily focus on commercial and industrial projects, including high-rise buildings, office spaces, and large-scale construction developments. We also take on residential projects when required, ensuring the same level of quality and professionalism in every job."
  },
  {
    question: "Where do you operate?",
    answer: "We are based in Mississauga, Ontario (ON) and provide our services across all regions of Canada, delivering reliable and high-quality mechanical solutions for residential, commercial, and industrial projects."
  },
  {
    question: "How can I get a quote?",
    answer: "You can request a quote by contacting us with your project details, drawings, or requirements. Our team will review the information carefully and provide you with a detailed and competitive estimate based on your project scope."
  },
  {
    question: "Are your workers trained?",
    answer: "Yes, all our employees are fully trained, experienced, and certified according to industry standards. We ensure continuous training and development to maintain high-quality workmanship and safety on every project."
  },
  {
    question: "Do you follow safety rules?",
    answer: "Yes, safety is our top priority. We strictly follow all Canadian and Ontario workplace safety regulations and ensure that every worker follows proper safety procedures, including PPE usage and site safety protocols."
  },
  {
    question: "What HVAC systems do you install?",
    answer: "We install a wide range of HVAC systems, including ventilation systems, ducted systems, and commercial heating and cooling solutions designed to meet the needs of residential, commercial, and industrial buildings."
  },
  {
    question: "Do you provide maintenance?",
    answer: "Yes, we offer maintenance, repair, and inspection services to ensure that all installed systems continue to operate efficiently, safely, and reliably over time."
  },
  {
    question: "How long do projects take?",
    answer: "Project timelines vary depending on size, complexity, and requirements. Once we review the project scope, we provide a clear schedule and ensure timely completion while maintaining quality standards."
  },
  {
    question: "How can I contact you?",
    answer: "You can reach us through phone, email, or the contact form on our website. Our team is always available to answer your inquiries and assist you with project-related questions."
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
      className="w-full py-10 sm:py-12 lg:py-16 px-4 sm:px-8 lg:px-16 overflow-hidden transition-all duration-1000 ease-out"
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
          <h2 id="metric-faq-heading" className="font-black text-2xl sm:text-3xl lg:text-4xl text-[#c3252e] leading-tight">
            Frequently Asked Questions
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
                onMouseEnter={() => setActiveIdx(idx)}
                onMouseLeave={() => setActiveIdx(null)}
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
                    className={`text-gray-400 group-hover:text-white transition-transform duration-300 shrink-0 ml-4 ${isOpen ? 'rotate-180 text-[#c3252e]' : ''
                      }`}
                  />
                </button>

                {/* Accordion Answer Content */}
                <div
                  className={`overflow-hidden transition-all duration-350 ease-in-out ${isOpen ? 'max-h-96 opacity-100 border-t border-white/5 bg-white/2' : 'max-h-0 opacity-0'
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
