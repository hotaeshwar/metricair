import { useState, useEffect, useRef, useCallback } from "react";

// Extract YouTube video/playlist ID from URL
function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  // Playlist
  const playlistMatch = url.match(/[?&]list=([^&]+)/);
  if (url.includes("playlist") && playlistMatch) {
    return `https://www.youtube.com/embed/videoseries?list=${playlistMatch[1]}&autoplay=1`;
  }
  // Video ID
  const videoMatch = url.match(/(?:v=|youtu\.be\/|embed\/)([^&?/]+)/);
  if (videoMatch) {
    // Handle timestamp
    const timeMatch = url.match(/[?&]t=(\d+)/);
    const timeParam = timeMatch ? `&start=${timeMatch[1]}` : "";
    return `https://www.youtube.com/embed/${videoMatch[1]}?autoplay=1${timeParam}`;
  }
  return null;
}

// YouTube Modal
function VideoModal({ url, title, onClose }) {
  const embedUrl = getYouTubeEmbedUrl(url);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!embedUrl) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.88)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated Close button */}
        <button
          onClick={onClose}
          className="absolute -top-14 right-0 group flex items-center gap-3"
          aria-label="Close video"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <span
            className="text-white text-xs tracking-[0.3em] uppercase font-semibold opacity-60 group-hover:opacity-100 transition-opacity duration-300"
            style={{ letterSpacing: "0.25em" }}
          >
            CLOSE
          </span>
          {/* Spinning ring + morphing X */}
          <span className="relative flex items-center justify-center w-10 h-10">
            {/* Rotating dashed ring */}
            <svg
              className="absolute inset-0 w-10 h-10"
              viewBox="0 0 40 40"
              style={{
                animation: "spin-ring 3s linear infinite",
              }}
            >
              <circle
                cx="20" cy="20" r="17"
                fill="none"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="1.5"
                strokeDasharray="6 4"
              />
            </svg>
            {/* Solid ring on hover */}
            <svg
              className="absolute inset-0 w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              viewBox="0 0 40 40"
            >
              <circle cx="20" cy="20" r="17" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" />
            </svg>
            {/* X icon */}
            <svg
              className="relative w-4 h-4 text-white group-hover:rotate-90 transition-transform duration-500"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
          <style>{`
            @keyframes spin-ring {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
        </button>
        {/* Video title */}
        {title && (
          <p className="text-white text-xs tracking-widest uppercase mb-3 opacity-60">{title}</p>
        )}
        {/* 16:9 iframe container */}
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full rounded-xl shadow-2xl"
            src={embedUrl}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

// Hook for intersection observer animations
function useScrollAnimation(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function AnimatedItem({ children, delay = 0, className = "" }) {
  const [ref, visible] = useScrollAnimation(0.1);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function PlayButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute inset-0 flex items-center justify-center group cursor-pointer w-full h-full border-0 bg-transparent"
      aria-label="Play video"
    >
      <div className="w-14 h-14 bg-teal-700 bg-opacity-90 rounded-full flex items-center justify-center shadow-lg group-hover:bg-teal-600 group-hover:scale-110 transition-all duration-300">
        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </button>
  );
}

function FeaturedVideoCard({ image, title, description, link, isCenter = false, delay = 0, onPlay }) {
  return (
    <AnimatedItem delay={delay} className="flex-1 min-w-0">
      <div className={`rounded-2xl overflow-hidden ${isCenter ? "bg-gray-200 shadow-xl" : "bg-transparent"} transition-transform duration-300`}>
        <div className="relative aspect-video overflow-hidden rounded-xl">
          <img src={image} alt={title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          <PlayButton onClick={() => onPlay(link, title)} />
        </div>
        <div className={`pt-4 pb-2 ${isCenter ? "px-3" : ""}`}>
          <button
            onClick={() => onPlay(link, title)}
            className="text-teal-600 hover:text-teal-500 font-semibold text-lg leading-snug block mb-2 transition-colors duration-200 text-left bg-transparent border-0 p-0 cursor-pointer"
          >
            {title}
          </button>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </AnimatedItem>
  );
}

function ListVideoCard({ image, title, description, link, date, dark = true, delay = 0, onPlay }) {
  return (
    <AnimatedItem delay={delay} className="w-full md:w-1/2 px-0">
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <div className="relative flex-shrink-0 w-full sm:w-56 aspect-video sm:aspect-auto sm:h-36 rounded-xl overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          <PlayButton onClick={() => onPlay(link, title)} />
        </div>
        <div className="flex flex-col justify-center">
          <button
            onClick={() => onPlay(link, title)}
            className={`font-semibold text-base uppercase tracking-wide leading-snug mb-2 block hover:opacity-80 transition-opacity cursor-pointer text-left bg-transparent border-0 p-0 ${dark ? "text-gray-100" : "text-gray-800"}`}
          >
            {title}
          </button>
          <p className={`text-sm leading-relaxed mb-2 ${dark ? "text-gray-300" : "text-gray-600"}`}>{description}</p>
          {date && <p className={`text-xs ${dark ? "text-gray-400" : "text-gray-400"}`}>{date}</p>}
        </div>
      </div>
    </AnimatedItem>
  );
}

function SectionHeading({ title, color = "text-red-500", className = "" }) {
  const [ref, visible] = useScrollAnimation(0.1);
  return (
    <h2
      ref={ref}
      className={`text-3xl md:text-4xl font-light tracking-widest text-center mb-10 ${color} ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      {title}
    </h2>
  );
}

const tabs = ["NEW & FEATURED","PDH","PARAGON HVAC","SUPPLY DUCT","ONE SYSTEM, ONE SOURCE","MANUFACTURING","GREASE DUCT","CORE","CASSERVICE"];
const sectionIds = ["new-featured","pdh","paragon-hvac","supply-duct","one-system","manufacturing","grease-duct","core","casservice"];

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState(0);
  const [modal, setModal] = useState(null); // { url, title }

  const openModal = useCallback((url, title) => setModal({ url, title }), []);
  const closeModal = useCallback(() => setModal(null), []);

  const scrollToSection = (index) => {
    setActiveTab(index);
    const el = document.getElementById(sectionIds[index]);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const handleScroll = () => {
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveTab(i);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Modal */}
      {modal && <VideoModal url={modal.url} title={modal.title} onClose={closeModal} />}

      {/* Header */}
      <div className="pt-16 pb-6 text-center bg-gray-100">
        <AnimatedItem delay={0}>
          <h1 className="text-4xl md:text-5xl font-light tracking-widest text-gray-700 mb-3">VIDEO RESOURCE LIBRARY</h1>
          <p className="text-gray-500 text-base md:text-lg">
            Explore the video resources below to learn more about
            <br className="hidden sm:block" /> CaptiveAire's products and services.
          </p>
        </AnimatedItem>
      </div>

      {/* Sticky Nav */}
      <div className="sticky top-0 z-50 bg-gray-700 shadow-md">
        <div className="max-w-7xl mx-auto overflow-x-auto scrollbar-hide">
          <div className="flex items-center min-w-max px-2 py-1 gap-1">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => scrollToSection(i)}
                className={`px-3 py-2 text-xs md:text-sm font-semibold tracking-wide rounded-full whitespace-nowrap transition-all duration-200 ${
                  activeTab === i ? "bg-teal-600 text-white" : "text-gray-200 hover:text-white hover:bg-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* NEW & FEATURED */}
      <section id="new-featured" className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="NEW & FEATURED" />
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <FeaturedVideoCard image="/images/maintain.jpg" title="How to Maintain Your HVAC" description="Whether you're a seasoned tech or an owner with a knack for DIY, this video gives you all the steps, tips and tricks to keep Paragon HVAC in tip top shape." link="https://www.youtube.com/watch?v=TDMlGDtu20s" delay={0} onPlay={openModal} />
            <FeaturedVideoCard image="/images/lasers.jpg" title="Ductwork - The Most Overlooked Aspect of HVAC" description="We'll show you why as we explain proper air diffusion, leakage, condensation, and the impact ductwork has on equipment selection and performance." link="https://www.youtube.com/watch?v=aDlZr4kk1ko&t=2s" isCenter={true} delay={0.15} onPlay={openModal} />
            <FeaturedVideoCard image="/images/parallel.jpg" title="Why Balancing Airflows is So Tricky" description="In this video we'll explain how we can predict and model complex airflows using simple calculations, and how software does it in an efficient, intuitive way." link="https://www.youtube.com/watch?v=fVgrwNiIDQs&t=1s" delay={0.3} onPlay={openModal} />
          </div>
        </div>
      </section>

      {/* PDH */}
      <section id="pdh" className="py-16 bg-teal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedItem>
            <h2 className="text-3xl md:text-4xl font-light tracking-widest text-white text-center mb-2">PROFESSIONAL DEVELOPMENT HOUR</h2>
            <p className="text-gray-300 text-center mb-12 text-sm md:text-base">Premier engineering-focused videos covering HVAC, Electrical Basics, Kitchen Fire Suppression, and more.</p>
          </AnimatedItem>
          <div className="flex flex-wrap">
            {[
              { img: "/images/maintain.jpg", title: "HOW TO MAINTAIN YOUR HVAC", desc: "Whether you're a seasoned tech or an owner with a knack for DIY, this video gives you all the steps, tips and tricks to keep Paragon HVAC in tip top shape.", link: "https://www.youtube.com/watch?v=TDMlGDtu20s", date: "Dec 19, 2025" },
              { img: "/images/lasers.jpg", title: "DUCTWORK - THE MOST OVERLOOKED ASPECT OF HVAC", desc: "We'll show you why as we explain proper air diffusion, leakage, condensation, and the impact ductwork has on equipment selection and performance.", link: "https://www.youtube.com/watch?v=aDlZr4kk1ko&t=2s", date: "Sep 5, 2025" },
              { img: "/images/parallel.jpg", title: "WHY BALANCING AIRFLOWS IS SO TRICKY", desc: "In this video we'll explain how we can predict and model complex airflows using simple calculations, and how software does it in an efficient, intuitive way.", link: "https://www.youtube.com/watch?v=fVgrwNiIDQs&t=1s", date: "Jun 24, 2025" },
              { img: "/images/duct-101.jpg", title: "FUNDAMENTALS OF AIRFLOW", desc: "From Bernoulli's Theorem to friction, dynamic losses, system effect and more, we'll visualize every step of the way to make air delivery concepts intuitive and fun.", link: "https://www.youtube.com/watch?v=WE2LPedFbgA", date: "May 16, 2025" },
              { img: "/images/fan-curves.jpg", title: "FAN CURVES - A DEEP DIVE", desc: "Let's build a fan curve! We condensed a wealth of knowledge into 1 video that connects all the dots.", link: "https://www.youtube.com/watch?v=sDIFtcWz4co", date: "Nov 26, 2024" },
              { img: "/images/fanbasics.jpg", title: "FAN FUNDAMENTALS", desc: "Know nothing about fans? Perfect! We'll cover the most fundamental topics like pressure gradients and the fan laws to build your understanding of both Axial and Centrifugal fans.", link: "https://www.youtube.com/watch?v=vF72pOHc1zY", date: "Nov 15, 2024" },
              { img: "/images/tile.jpg", title: "DYNAMIC SYSTEMS", desc: "This video uncovers the science of fluid dynamics involved in kitchen fire suppression systems. From Bernoulli's Law to actual field piping calculations.", link: "https://www.youtube.com/watch?v=7gxLBoLqfz0", date: "" },
              { img: "/images/tile1.jpg", title: "OUR PHILOSOPHIES", desc: "This presentation explains the history and evolution of kitchen fire suppression systems, and the different approaches and philosophies CaptiveAire has deployed.", link: "https://www.youtube.com/watch?v=MQrv0t9xATg", date: "" },
              { img: "/images/thumb.jpg", title: "COMPUTER SCIENCE FOR ALL", desc: "Learn about the basics of electronics and computer science in this video. Several basic computing concepts are taught using various methodologies.", link: "https://www.youtube.com/watch?v=pDELW2pIvWw", date: "Apr 27, 2023" },
              { img: "/images/motor.jpg", title: "ALTERNATING CURRENT, MOTORS, & CONTROLS", desc: "Explore the basics of Alternating Current (AC) and motors with discussions about generators, power distribution, transformers, motor types, speed controls, and more.", link: "https://www.youtube.com/watch?v=RG3eljmqyq4", date: "Jan 3, 2023" },
              { img: "/images/electricalbasic.jpg", title: "ELECTRICAL BASICS", desc: "This comprehensive introduction covers the basics of electricity, including discussions about how electricity is created and functions, Ohm's Law, and more.", link: "https://www.youtube.com/watch?v=nYuVSG89vg0", date: "Oct 7, 2022" },
              { img: "/images/refrigeration.jpg", title: "THE REFRIGERATION CYCLE", desc: "Learn about the basics of the refrigeration cycle. This video is helpful for anyone in the HVAC industry, especially HVAC engineers and consultants.", link: "https://www.youtube.com/watch?v=4U-XG7cY7bI&t=1s", date: "May 9, 2022" },
              { img: "/images/calculations.jpg", title: "COMMERCIAL LOAD CALCULATIONS", desc: "Learn the ins and outs of commercial HVAC load calculations—how to determine what tonnage unit you need and all of the factors at play in this decision.", link: "https://www.youtube.com/watch?v=0YCyJ1bQ3qo&t=2665s", date: "May 5, 2022" },
              { img: "/images/psychrometrics.jpg", title: "PSYCHROMETRICS", desc: "This deep dive into psychometrics and the Psychometric Chart explores how the chart came to be, how it's used, and why it's important in HVAC design.", link: "https://www.youtube.com/watch?v=UKRVxEOD9t0", date: "Oct 20, 2021" },
            ].map((v, i) => (
              <ListVideoCard key={i} image={v.img} title={v.title} description={v.desc} link={v.link} date={v.date} dark={true} delay={(i % 2) * 0.15} onPlay={openModal} />
            ))}
          </div>
        </div>
      </section>

      {/* PARAGON HVAC */}
      <section id="paragon-hvac" className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="PARAGON HVAC" color="text-red-500" />
          <div className="flex flex-wrap">
            {[
              { img: "/images/doubledlifespan.jpg", title: "WE DOUBLED THE LIFESPAN OF HVAC", desc: "Join our engineering team as we explore just some of the decisions made in designing Paragon HVAC as a next-level comfort solution.", link: "https://www.youtube.com/watch?v=pyns1XtEktk&t=1s", date: "Jun 6, 2024" },
              { img: "/images/made.jpg", title: "WHY WE MADE OUR OWN BMS", desc: "Explore how a custom BMS (Building Management System) can extract the most performance out of a sophisticated piece of equipment like Paragon HVAC.", link: "https://www.youtube.com/watch?v=BpGhwZE1vJY", date: "Feb 26, 2024" },
              { img: "/images/rtucovid.jpg", title: "A SOLUTION TO VIRAL SPREAD", desc: "The air we breathe matters more than we think. In today's modern, fully sealed buildings, contaminated air is continuously recirculated, spreading viruses and other pathogens.", link: "https://www.youtube.com/watch?v=vvr7pnqCOKo", date: "Sep 29, 2020" },
              { img: "/images/rtuoverview.jpg", title: "OVERVIEW", desc: "Backed by 40 years of ventilation expertise, Paragon HVAC by CaptiveAire is the ideal HVAC solution offering exceptional energy savings and unprecedented comfort and humidity control.", link: "https://www.youtube.com/watch?v=xS9yQMtqvpc", date: "Jan 9, 2018" },
              { img: "/images/quality.jpg", title: "INDOOR AIR QUALITY", desc: "Learn more about how Indoor Air Quality (IAQ) affects you, your health, and your performance.", link: "https://www.youtube.com/watch?v=LAyslf7MhLA", date: "Jan 9, 2018" },
            ].map((v, i) => (
              <ListVideoCard key={i} image={v.img} title={v.title} description={v.desc} link={v.link} date={v.date} dark={false} delay={(i % 2) * 0.15} onPlay={openModal} />
            ))}
          </div>
        </div>
      </section>

      {/* SUPPLY DUCT */}
      <section id="supply-duct" className="py-16 bg-teal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedItem>
            <h2 className="text-3xl md:text-4xl font-light tracking-widest text-white text-center mb-12">AIR DIFFUSION SUPPLY DUCT</h2>
          </AnimatedItem>
          <div className="flex flex-wrap">
            {[
              { img: "/images/supply-duct-installation.jpg", title: "INSTALLATION", desc: "CASService explains how to install CaptiveAire's Air Diffusion Supply Duct, a new innovative perforated stainless steel supply ductwork for HVAC applications.", link: "https://www.youtube.com/watch?v=0wdls-WH8W8", date: "Nov 8, 2021" },
              { img: "/images/supply-duct-overview.jpg", title: "OVERVIEW", desc: "Air Diffusion Supply Duct is the first of its kind in the U.S., providing an aesthetically pleasing, performance driven solution that works exceptionally well for exposed ceilings.", link: "https://www.youtube.com/watch?v=4fZiz3UduK4", date: "Feb 26, 2021" },
            ].map((v, i) => (
              <ListVideoCard key={i} image={v.img} title={v.title} description={v.desc} link={v.link} date={v.date} dark={true} delay={i * 0.15} onPlay={openModal} />
            ))}
          </div>
        </div>
      </section>

      {/* ONE SYSTEM, ONE SOURCE */}
      <section id="one-system" className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="ONE SYSTEM, ONE SOURCE" color="text-red-500" />
          <div className="flex flex-wrap">
            {[
              { img: "/images/pitch-pizza.jpg", title: "CASE STUDY - PITCH PIZZERIA", desc: "CaptiveAire's Fresh Air Restaurant System was Pitch Pizzeria's ventilation system of choice for total building ventilation.", link: "https://www.youtube.com/watch?v=IdDwRA59Rsg", date: "May 11, 2023" },
              { img: "/images/comfort.jpg", title: "FINDING PERFECT COMFORT", desc: "Achieve perfect comfort within a space with a perfectly integrated HVAC system.", link: "https://www.youtube.com/watch?v=j-g_p2BN6mM&t=2s", date: "May 18, 2021" },
              { img: "/images/osos-fars.jpg", title: "THE FRESH AIR RESTAURANT SYSTEM", desc: "CaptiveAire engineers explain the importance of integrating all aspects of a ventilation system to ensure optimum system performance and efficiency.", link: "https://www.youtube.com/watch?v=SiLtq7tsU7g", date: "Apr 13, 2021" },
              { img: "/images/osos-fresh-kitchen.jpg", title: "CASE STUDY - FRESH KITCHEN", desc: "Fresh Kitchen explains why using an integrated, total building ventilation system from CaptiveAire is the best choice.", link: "https://www.youtube.com/watch?v=GbJCJ8SUFO4", date: "May 8, 2019" },
              { img: "/images/osos-fords.jpg", title: "CASE STUDY - FORD'S GARAGE", desc: "Ford's Garage chose CaptiveAire to handle all of their ventilation needs. Hear why an integrated HVAC and kitchen ventilation system was their preferred choice.", link: "https://www.youtube.com/watch?v=kmS7WZDOutE", date: "May 8, 2019" },
            ].map((v, i) => (
              <ListVideoCard key={i} image={v.img} title={v.title} description={v.desc} link={v.link} date={v.date} dark={false} delay={(i % 2) * 0.15} onPlay={openModal} />
            ))}
          </div>
        </div>
      </section>

      {/* MANUFACTURING */}
      <section id="manufacturing" className="py-16 bg-teal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedItem>
            <h2 className="text-3xl md:text-4xl font-light tracking-widest text-white text-center mb-12">CAPTIVEAIRE MANUFACTURING</h2>
          </AnimatedItem>
          <div className="flex flex-wrap">
            <ListVideoCard image="/images/cas-manufacturing.jpg" title="CAPTIVEAIRE MANUFACTURING" description="CaptiveAire's manufacturing team is dedicated to quality, service, and continuous improvement." link="https://www.youtube.com/watch?v=lkFP7Vm0V6g&t=1s" date="May 19, 2016" dark={true} delay={0} onPlay={openModal} />
          </div>
        </div>
      </section>

      {/* GREASE DUCT */}
      <section id="grease-duct" className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="GREASE DUCT" color="text-red-500" />
          <div className="flex flex-wrap">
            {[
              { img: "/images/grease-duct-double-wall.jpg", title: "SINGLE WALL INSTALLATION SERIES", desc: "CaptiveAire's factory built, listed single wall grease ductwork is ideal for use in applications where clearance to combustibles is not required.", link: "https://www.youtube.com/playlist?list=PLxzLVWepscz0i5231hGo-HLJp2WTposuO" },
              { img: "/images/grease-duct-single-wall.jpg", title: "DOUBLE WALL INSTALLATION SERIES", desc: "CaptiveAire's factory built, listed double wall grease ductwork is ideal for use in applications where clearance to combustibles is needed.", link: "https://www.youtube.com/playlist?list=PLxzLVWepscz0b-yHr0QTZUgLuASTNlNq2" },

            ].map((v, i) => (
              <ListVideoCard key={i} image={v.img} title={v.title} description={v.desc} link={v.link} dark={false} delay={i * 0.15} onPlay={openModal} />
            ))}
          </div>
        </div>
      </section>

      {/* CORE FIRE PROTECTION */}
      <section id="core" className="py-16 bg-teal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedItem>
            <h2 className="text-3xl md:text-4xl font-light tracking-widest text-white text-center mb-12">CORE FIRE PROTECTION</h2>
          </AnimatedItem>
          <div className="flex flex-wrap">
            {[
              { img: "/images/core-overview.jpg", title: "OVERVIEW", desc: "CORE Fire Protection is CaptiveAire's state of the art water-based fire suppression system.", link: "https://www.youtube.com/watch?v=u23YppwvAFU", date: "Nov 23, 2016" },
              { img: "/images/core-solid.jpg", title: "SOLID FUEL FIRE PROTECTION", desc: "Solid fuel cooking is gaining in popularity in today's modern kitchens. CaptiveAire provides a total system design from floor to roof that vastly minimizes fire risk.", link: "https://www.youtube.com/watch?v=H0P1-FgPbCU", date: "Nov 15, 2016" },
              { img: "/images/core-installation.jpg", title: "INSTALLATION", desc: "How to install a hood with CORE Fire Protection, CaptiveAire's revolutionary water-based fire suppression system.", link: "https://www.youtube.com/watch?v=gVILtpFaPVQ&t=3s", date: "Oct 6, 2016" },
            ].map((v, i) => (
              <ListVideoCard key={i} image={v.img} title={v.title} description={v.desc} link={v.link} date={v.date} dark={true} delay={(i % 2) * 0.15} onPlay={openModal} />
            ))}
          </div>
        </div>
      </section>

      {/* CASSERVICE */}
      <section id="casservice" className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="CASSERVICE INSTRUCTIONAL SERIES" color="text-red-500" />
          <div className="flex flex-wrap">
            <ListVideoCard image="/images/service-instruction.jpg" title="CASSERVICE INSTRUCTIONAL SERIES" description="Troubleshoot common issues, learn how to start up your equipment, and learn basic do-it-yourself solutions for a variety of CaptiveAire products." link="https://www.youtube.com/playlist?list=PLxzLVWepscz1viEcX61KMuexqHgRQPEmk" dark={false} delay={0} onPlay={openModal} />
          </div>
        </div>
      </section>

      {/* EXPLORE MORE */}
      <section
        className="relative flex items-center justify-end overflow-hidden"
        style={{ minHeight: "280px", backgroundImage: "url('/images/comfort.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0" style={{ background: "rgba(13, 71, 71, 0.65)" }} />
        <AnimatedItem className="relative z-10 text-right px-8 sm:pr-16 py-16 w-full sm:w-auto">
          <h2 className="text-3xl md:text-4xl font-light tracking-widest text-white mb-4">EXPLORE MORE VIDEOS</h2>
          <div className="flex items-center justify-end gap-3">
            <p className="text-gray-200 text-lg">Subscribe to our YouTube channel</p>
            <button
              onClick={() => window.open('https://www.youtube.com/channel/UCt0ArHe_-CKAr1So3IEwmsA', '_blank', 'noopener,noreferrer')}
              className="hover:scale-110 transition-transform duration-200 flex-shrink-0 cursor-pointer bg-transparent border-0 p-0"
            >
              <svg viewBox="0 0 68 48" className="w-16 h-10">
                <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="red" />
                <path d="M45 24L27 14v20" fill="white" />
              </svg>
            </button>
          </div>
        </AnimatedItem>
      </section>
    </div>
  );
}