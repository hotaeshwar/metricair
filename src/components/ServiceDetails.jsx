// src/components/ServiceDetails.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import LeadForm from './LeadForm';

function useInView(threshold = 0.1) {
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

const SERVICES_DATA = {
  // ── RESIDENTIAL HVAC ──
  'residential-heating': {
    title: 'Heating Systems',
    subtitle: 'High-Efficiency Gas Furnaces & Zoning',
    desc: 'Keep your home cozy and warm during Canadian winters with our top-tier heating systems. We supply, install, and optimize high-efficiency furnaces and boilers.',
    image: '/images/res_furnace_ai.png',
    highlights: ['Energy-Star Rated Furnaces', 'Smart Thermostat & Zone Setup', 'Annual Safety & Tune-up Inspections', 'Low Operating Noise & High Output']
  },
  'residential-cooling': {
    title: 'Cooling Systems (AC)',
    subtitle: 'Central Air & Ductless Mini-Splits',
    desc: 'Maintain a crisp, cool climate inside your home during summer peaks with our energy-efficient air conditioning and zone controls.',
    image: '/images/coolingres.jpg',
    highlights: ['High SEER Rating Central ACs', 'Multi-Zone Ductless Mini-Splits', 'Precision Coolant Charge Audits', 'Acoustic Sound-Dampening Jackets']
  },
  'residential-fresh-air': {
    title: 'Fresh Air / Ventilation',
    subtitle: 'ERV, HRV, and Active Air Filtration',
    desc: 'Breathe cleaner, purer air with advanced ventilation systems that continuously flush stale indoor air and lock out allergens.',
    image: '/images/freshair.jpg',
    highlights: ['Energy Recovery Ventilators (ERV)', 'Heat Recovery Ventilators (HRV)', 'HEPA Filtration & Air Cleaners', 'Humidity Control Humidifiers']
  },
  'residential-radiant': {
    title: 'Radiant Tube Heating',
    subtitle: 'Comfortable Garage & Basement Warming',
    desc: 'Deliver targeted infrared radiant heat directly to floors and objects, ideal for large rooms, garage workshops, or active spaces.',
    image: '/images/com_radiant_ai.png',
    highlights: ['Comfortable Infloor Pipe Setups', 'Infrared Gas-Fired Garage Tubes', 'Immediate Warmth Without Air Drafts', 'Extremely Low Fuel Consumption']
  },

  // ── RESIDENTIAL ELECTRICAL ──
  'residential-lighting': {
    title: 'Lighting Installation',
    subtitle: 'Premium Smart & Architectural Lighting',
    desc: 'Transform your home with custom-engineered indoor, outdoor, and smart architectural lighting layouts designed for energy efficiency and visual beauty.',
    image: '/images/res_lighting.jpg',
    highlights: ['Energy-Efficient LED Recessed Pots', 'Smart Switch & System Integration', 'Landscape & Security Lighting Systems', 'Architectural Accent Layouts']
  },
  'residential-panel': {
    title: 'Panel Upgrades',
    subtitle: 'Modern 100A to 200A+ Service Panel Upgrades',
    desc: 'Increase your home electrical capacity safely to support modern heavy loads like cooling compressors, EV charging, and high-amp appliances.',
    image: '/images/res_panel.jpg',
    highlights: ['100 Amp to 200/400 Amp Service', 'Brand New Breakers & Safety Bussing', 'ESA Permit Processing & Inspections', 'Dedicated Appliance Subpanels']
  },
  'residential-ev-charger': {
    title: 'EV Charger Installation',
    subtitle: 'Level 2 Electric Vehicle Charging Stations',
    desc: 'Power your electric vehicle rapidly from the comfort of your home with a certified Level 2 charger installation matched to your battery spec.',
    image: '/images/res_ev_charger.jpg',
    highlights: ['Tesla & Universal Level 2 Chargers', 'High-Amp Dedicated Service Lines', 'ESA Safety Clearance Certificates', 'Indoor/Outdoor Weatherproof Outlets']
  },
  'residential-wiring': {
    title: 'Home Wiring / Setup',
    subtitle: 'Complete Residential Wiring & Safety Audits',
    desc: 'Professional electrical wiring for home additions, basement renovations, custom homes, and safety diagnostics for older setups.',
    image: '/images/res_wiring.jpg',
    highlights: ['Renovation & Custom Build Wiring', 'Knob & Tube / Aluminum Replacements', 'CEC Safety Receptacles & GFCIs', 'Breaker Box Safety Diagnostics']
  },

  // ── RESIDENTIAL PLUMBING ──
  'residential-water-supply': {
    title: 'Water Supply Lines',
    subtitle: 'Copper & PEX Pipe Upgrades',
    desc: 'Upgrade rusty piping and ensure steady, safe water flow with copper or modern PEX supply lines and pressure regulating systems.',
    image: '/images/res_plumbing.jpg',
    highlights: ['Copper to PEX Service Replacements', 'Main Shut-off Valve Configurations', 'Steady Pressure Regulation Valves', 'Corrosion-Free Water Flow Loops']
  },
  'residential-drainage': {
    title: 'Drainage Systems',
    subtitle: 'Sump Pumps & Sewer Backflow Protection',
    desc: 'Protect your basement from flooding and backup with automatic sump pumps, sewage ejector basins, and backwater valves.',
    image: '/images/res_drainage_ai.png',
    highlights: ['CEC-Compliant Sump Pump Arrays', 'Sewage Ejector Pump Installations', 'Automatic Backwater Sewer Valves', 'Drain Scoping & Pipe Clearing']
  },
  'residential-fixtures': {
    title: 'Fixture Installation',
    subtitle: 'Premium Bathroom & Kitchen Fixtures',
    desc: 'Upgrade your faucets, toilets, showers, and sinks with high-efficiency modern fixtures installed by licensed plumbing professionals.',
    image: '/images/res_fixtures_ai.png',
    highlights: ['High-Efficiency Sinks & Faucets', 'Low-Flush Dual Toilet Installations', 'Thermostatic Shower Controls', 'Utility Sinks & Appliance Hookups']
  },

  // ── COMMERCIAL HVAC ──
  'commercial-rtu': {
    title: 'Rooftop Units (RTUs)',
    subtitle: 'High-Capacity Rooftop HVAC Systems',
    desc: 'Maintain commercial comfort and ventilation with rooftop HVAC units engineered for large open layouts, corporate offices, and warehouses.',
    image: '/images/com_rtu_ai.png',
    highlights: ['Multi-Stage Heating & Cooling', 'Economizer Damper Configurations', 'Energy-Efficient Scroll Compressors', 'Full BAS/DDC Control Loops']
  },
  'commercial-ducts': {
    title: 'Ductwork Systems',
    subtitle: 'Commercial Sheet Metal & Balancing',
    desc: 'Optimize air delivery and minimize thermal loss with custom-fabricated rectangular sheet metal duct loops and zoning systems.',
    image: '/images/com_ducts_ai.png',
    highlights: ['Heavy-Gauge Sheet Metal Fittings', 'Plenum & Transition Fabrication', 'Air Duct Sealing & Balancing', 'Acoustic Duct Liner Isolation']
  },
  'commercial-makeup-air': {
    title: 'Make-up Air Units',
    subtitle: 'High-Volume Makeup Air Systems (MUA)',
    desc: 'Ensure balanced building pressure and compensate for exhaust hoods with gas-fired or electric makeup air configurations.',
    image: '/images/com_makeup_air_ai.png',
    highlights: ['Direct Gas-Fired Air Heaters', 'Variable Frequency Drive Controls', 'Interlocked Hood System Startup', 'OBC Compliant Pressure Balancing']
  },
  'commercial-exhaust': {
    title: 'Exhaust Systems',
    subtitle: 'High-Velocity Commercial Exhaust Fans',
    desc: 'Safely exhaust heat, grease, combustion gases, and chemical fumes from your commercial building with high-velocity blowers.',
    image: '/images/com_exhaust_ai.png',
    highlights: ['Restaurant Grease Fan (Type I) Upblast', 'Utility In-Line Exhaust Fans', 'Corrosive Gas Fume capture', 'NFPA 96 Hood Integration']
  },
  'commercial-heat-pumps': {
    title: 'Heat Pumps',
    subtitle: 'Commercial Variable Flow Heat Pumps',
    desc: 'Highly efficient cooling and heating solutions utilizing VRF heat pump technologies to lower corporate energy expenditure.',
    image: '/images/com_heatpump_ai.png',
    highlights: ['Variable Refrigerant Flow (VRF)', 'Simultaneous Heating & Cooling', 'Inverter Compressor Reliability', 'Zero Emissions Thermal Management']
  },
  'commercial-kitchen-vent': {
    title: 'Commercial Kitchen Vent',
    subtitle: 'NFPA-Compliant Canopy Hood Installations',
    desc: 'Engineered canopy kitchen ventilation systems complete with Type I or Type II hoods, makeup air dampers, and grease ducting.',
    image: '/images/com_kitchen_vent_ai.png',
    highlights: ['Type I & Type II Canopy Hoods', 'NFPA 96 Fire Barrier Ducting', 'Aquamatic / Water-Wash Hood Integration', 'Ontario Building Code Stamped Plans']
  },
  'commercial-wiring': {
    title: 'Kitchen HVAC Wiring',
    subtitle: 'Commercial Kitchen Hood Power & Interlocks',
    desc: 'Bespoke control circuit routing and safety interlocks for kitchen exhaust makeup systems, gas lines, and HVAC units.',
    image: '/images/com_wiring_ai.png',
    highlights: ['Interlocked hood damper wiring', 'Gas solenoid safety shutoffs', 'Exhaust makeup motor circuits', 'CEC electrical inspections']
  },
  'commercial-office': {
    title: 'Office Spaces HVAC',
    subtitle: 'Multi-Zone Commercial Temperature Zoning',
    desc: 'Maintain quiet comfort across multiple corporate office floors with central HVAC units, variable air volume (VAV) boxes, and dampers.',
    image: '/images/com_office_ai.png',
    highlights: ['Quiet VAV damper operations', 'Multi-Floor programmable zoning', 'IAQ monitoring & fresh air flush', 'Energy savings BAS integrations']
  },
  'commercial-retail': {
    title: 'Retail Spaces HVAC',
    subtitle: 'Storefront constant-volume climate loops',
    desc: 'Banish client discomfort and maintain clean airflow inside active showrooms, boutique storefronts, and retail centers.',
    image: '/images/com_retail_ai.png',
    highlights: ['Constant-Volume rooftop loops', 'Low-profile ductwork setups', 'Showroom thermal balancing', 'Acoustic air-diffuser drops']
  },
  'commercial-radiant': {
    title: 'Radiant Tube Heating',
    subtitle: 'Commercial Floor and Bay Heat Loops',
    desc: 'Highly polished aluminum reflectors focus heat rays exactly where needed, perfect for loading docks, garage doors, and commercial spaces.',
    image: '/images/com_radiant_ai.png',
    highlights: ['Directed infrared reflector bays', 'Gas-fired radiant tube loops', 'Immediate warmth for floor slabs', 'Zero draft dust circulation']
  },

  // ── COMMERCIAL ELECTRICAL ──
  'commercial-new-construction': {
    title: 'New Construction Electrical',
    subtitle: 'Full Utility Layouts & Rough-ins',
    desc: 'Complete electrical engineering design and physically installed conduits, panels, and distribution grids for commercial new builds.',
    image: '/images/com_new_elec_ai.png',
    highlights: ['CEC Rough-ins & Conduit Bends', 'High-Voltage Switchgear Setups', 'Architectural Interior Lighting', 'Dedicated Power Distribution Panels']
  },
  'commercial-panel-relocation': {
    title: 'Panel Relocation',
    subtitle: 'Utility Subpanel Layout Modifications',
    desc: 'Safely relocate high-voltage subpanels, extend heavy feeder conductors, and restructure breakers to support floorplan adjustments.',
    image: '/images/com_panel_reloc_ai.png',
    highlights: ['Feeder Conductor Extensions', 'High-Voltage subpanel Relocations', 'ESA Inspections & Clearances', 'Load Re-balancing across Breakers']
  },
  'commercial-power-upgrades': {
    title: 'Power Upgrades',
    subtitle: 'Three-Phase Service & Amp Upgrades',
    desc: 'Increase electrical service capacity (e.g. from 200A to 400A or 600A) to support heavy cooling, ovens, and processing systems.',
    image: '/images/com_power_upgr_ai.png',
    highlights: ['Three-Phase Service Enhancements', 'High Capacity Meter Socket Installs', 'Disconnect switch System Setups', 'Oversized Transformer Integration']
  },
  'commercial-led-lighting': {
    title: 'LED Lighting Upgrades',
    subtitle: 'Office & Retail LED conversions',
    desc: 'Reduce operating overhead and improve light levels with customized LED lighting lay-ins, flat panels, and architectural spots.',
    image: '/images/com_led_light_ai.png',
    highlights: ['Office LED Flat Panel Grids', 'Storefront Spot & Showcase Display LEDs', 'Energy Savings Rebate Profiles', 'Smart Daylight harvesting Systems']
  },
  'commercial-equipment-power': {
    title: 'Equipment Power Supply',
    subtitle: 'Dedicated Appliance Power Line Wiring',
    desc: 'Professional hookups and safety switch wiring for heavy commercial ovens, industrial compressors, RTUs, and motors.',
    image: '/images/com_equip_power_ai.png',
    highlights: ['Dedicated Appliance circuit Lines', 'High-Amp NEMA Outlets & Conduits', 'Local Fused Safety Disconnects', 'CEC-Compliant Motor Protections']
  },
  'commercial-general-power': {
    title: 'General Power Services',
    subtitle: 'Commercial safety inspections & panels',
    desc: 'Ensure compliance and eliminate circuit hazards inside your store or office space with our commercial maintenance loops.',
    image: '/images/com_general_power_ai.png',
    highlights: ['CEC commercial safety audits', 'Main panel breaker tests', 'Subpanel maintenance and balances', 'Dedicated utility plug lines']
  },

  // ── COMMERCIAL PLUMBING ──
  'commercial-plumbing-package': {
    title: 'Full Building Plumbing Package',
    subtitle: 'Turnkey Commercial Utility Plumbing',
    desc: 'Complete building-wide plumbing loops, drainage lines, hot water manifolds, and grease interceptors for restaurants or retail.',
    image: '/images/com_plumbing_pkg_ai.png',
    highlights: ['Grease Interceptors & Trap Basins', 'Hot Water Loop Manifolds', 'Multi-Floor drainage stacks', 'CEC & OBC Plumbing Code Stamps']
  },
  'commercial-plumbing-service': {
    title: 'Service & Maintenance',
    subtitle: 'Drain Scoping & Backflow Prevention',
    desc: 'Keep your building compliant with local codes through backflow preventer tests, drain scoping, and grease trap servicing.',
    image: '/images/com_plumbing_srv_ai.png',
    highlights: ['Annual Backflow Certifications', 'Deep video Camera Drain Scopes', 'Grease Trap Cleaning & Flushes', 'Pressure Valve Diagnostics']
  },
  'commercial-plumbing-retrofit': {
    title: 'Retrofit Plumbing Systems',
    subtitle: 'Utility Loop & Pipe Upgrades',
    desc: 'Reroute old plumbing lines, add handwash basins, replace corrosive piping, and upgrade layout systems with copper or PEX.',
    image: '/images/com_plumbing_ret_ai.png',
    highlights: ['Copper/PEX Pipe System Upgrades', 'Additional Wash Basin Rough-ins', 'Rerouting Utility Pipe Loops', 'Sewer Lateral Pipe Replacements']
  },
  'commercial-plumbing-heater': {
    title: 'Water Heater Relocation',
    subtitle: 'Commercial cylinder and tank moves',
    desc: 'Relocate hot water cylinders, gas heaters, or pressure manifolds to optimize commercial storage space and loop path.',
    image: '/images/com_water_heater_ai.png',
    highlights: ['Cylinder tank expansions', 'Conductor line rerouting', 'TSSA gas check clearances', 'Commercial booster integration']
  },
  'commercial-plumbing-boilers': {
    title: 'Boilers & Hydronic Heating',
    subtitle: 'Heavy steam boiler loops & manifolds',
    desc: 'Provide even, highly efficient hydronic loops and heat distribution for corporate warehouses, offices, and restaurants.',
    image: '/images/com_boilers_ai.png',
    highlights: ['Hydronic space boiler loops', 'High-Output radiator grids', 'Heat exchanger audits', 'Digital thermostatic pump loops']
  },
  'commercial-plumbing-piping': {
    title: 'Commercial Piping Systems',
    subtitle: 'Enterprise fluid supply lines & manifolds',
    desc: 'Scale your water inlet grids, build PEX booster lines, and manage heavy building supply loops safely.',
    image: '/images/com_piping_sys_ai.png',
    highlights: ['High-Pressure copper layouts', 'Distribution pipe loops', 'Main shut-off configurations', 'Corrosion-resistant steel lines']
  },

  // ── INDUSTRIAL HVAC ──
  'industrial-ventilation': {
    title: 'Industrial Ventilation',
    subtitle: 'Heavy Warehouse & Factory Vent Airflow',
    desc: 'Circulate massive columns of fresh air, control ambient temperatures, and flush chemical particulate matter safely.',
    image: '/images/fahu.jpg',
    highlights: ['Large Industrial MUA Ventilation', 'Roof-Mounted High-Volume Hoods', 'Variable Frequency Drive Controls', 'Automated Temp Destratification']
  },
  'industrial-dust': {
    title: 'Dust & Fume Extraction',
    subtitle: 'NFPA-Compliant Dust Collectors',
    desc: 'Capture combustible wood dust, metal particles, and weld fumes at the source to preserve occupant safety and prevent hazards.',
    image: '/images/dust.jpg',
    highlights: ['Explosion-Proof Extraction Motors', 'NFPA 652 Combustible Assessments', 'Reverse-Pulse Fabric Collector Bags', 'Static-Conductive Grounded Ducting']
  },
  'industrial-makeup-air': {
    title: 'Make-up Air Systems',
    subtitle: 'High-volume industrial MUA balancing',
    desc: 'Restore building air balance and compensate for powerful fume hood draft rates in factories and warehouses.',
    image: '/images/com_makeup_air_ai.png',
    highlights: ['Heavy gas-fired MUA setups', 'Automated VFD fan controls', 'OBC building pressure balancing', 'Worry-free clean air flushes']
  },
  'industrial-ducts': {
    title: 'Custom Ductwork Fabrication',
    subtitle: 'Heavy-gauge galvanized sheet metal loops',
    desc: 'Design and custom weld heavy sheet metal plenums, transitions, and high-velocity duct segments built for manufacturing plants.',
    image: '/images/duct.jpg',
    highlights: ['Custom welded steel ducts', 'Heavy-Gauge sheet metal runs', 'Vibration isolation plenums', 'High-Pressure flange setups']
  },
  'industrial-cooling': {
    title: 'Equipment Cooling Systems',
    subtitle: 'Process chillers and water towers',
    desc: 'Manage thermal loads and run steady equipment cooling loops for factory tools, automation machines, and server racks.',
    image: '/images/coolingpump.png',
    highlights: ['Process chilled water loops', 'Centrifugal pump configurations', 'Automation sensor interlocks', 'Heavy cooling tower pipes']
  },
  'industrial-gas-piping': {
    title: 'Gas Piping (HVAC-related)',
    subtitle: 'High-pressure TSSA certified gas lines',
    desc: 'Run heavy natural gas supply lines, manifold shut-offs, and regulator valves for high-input burners and heaters.',
    image: '/images/ind_plumbing.jpg',
    highlights: ['High-Pressure steel gas lines', 'TSSA certified pipefitters', 'Utility regulator valves', 'Solenoid safety gas valves']
  },
  'industrial-radiant': {
    title: 'Radiant Tube Heating',
    subtitle: 'Industrial high-ceiling radiant bays',
    desc: 'Install gas-fired infrared radiant tube heaters to warm warehouse bays and workers directly, ignoring high ceiling air loss.',
    image: '/images/com_radiant_ai.png',
    highlights: ['Directed infrared warming', 'Massive utility fuel savings', 'Polished aluminum reflectors', 'Industrial thermostat zoning']
  },

  // ── INDUSTRIAL ELECTRICAL ──
  'industrial-power-dist': {
    title: 'Power Distribution Systems',
    subtitle: 'Heavy Switchgears & Transformer Arrays',
    desc: 'Deploy and layout high-voltage subpanels, industrial electrical switchgears, and power distribution grids for high-amp equipment.',
    image: '/images/ind_power_dist_ai.png',
    highlights: ['Heavy Three-Phase Switchgears', 'Industrial Step-Down Transformers', 'Bus Duct Power Drops', 'ESA Safe load Certifications']
  },
  'industrial-wiring': {
    title: 'Industrial Equipment Wiring',
    subtitle: 'High-voltage motors & machines hookups',
    desc: 'CEC-compliant line wiring, sub-conduits, and disconnects for high-horsepower blowers, pumps, VFDs, and production lines.',
    image: '/images/ind_equip_wiring_ai.png',
    highlights: ['Three-Phase motor line wiring', 'NEMA heavy disconnect box', 'Flexible steel sub-conduits', 'Automated interlock sensors']
  },
  'industrial-automation': {
    title: 'Automation & Control',
    subtitle: 'VFD Panels & PLC Control Loops',
    desc: 'Configure process automation loops, assemble VFD motor cabinets, and wire factory sensor interlocks for high productivity.',
    image: '/images/ind_automation_ai.png',
    highlights: ['PLC Automation Panel Layouts', 'Integrated VFD Cabinets', 'Limit Switches & Sensor Loops', 'BAS System Modbus Communications']
  },
  'industrial-backup-power': {
    title: 'Backup Power Systems',
    subtitle: 'Factory generator and ATS configurations',
    desc: 'Deploy massive backup diesel generators and automatic transfer switches to protect factory data loops and assembly lines.',
    image: '/images/ind_backup_power_ai.png',
    highlights: ['Mega-Watt diesel generators', 'Automatic Transfer Switches (ATS)', 'Battery backup rack arrays', 'ESA compliance certifications']
  },

  // ── INDUSTRIAL PLUMBING ──
  'industrial-plumbing-water': {
    title: 'Industrial Water & Drainage',
    subtitle: 'Massive process fluid loops & drains',
    desc: 'Run heavy water manifolds, layout large factory supply loops, and build corrosive waste drainage loops safely.',
    image: '/images/ind_water_drainage_ai.png',
    highlights: ['Industrial water supply manifolds', 'Process cooling piping loops', 'Corrosive wastewater drains', 'Piping stress calculations']
  },
  'industrial-plumbing-air': {
    title: 'Compressed Air Systems',
    subtitle: 'High-Pressure Pneumatic Air Piping',
    desc: 'Design and layout aluminum or copper compressed air lines, air dryer blocks, manifolds, and receiver vessels for factories.',
    image: '/images/ind_compressed_air_ai.png',
    highlights: ['Leak-Free Aluminum Air Piping', 'Refrigerated Compressed Air Dryers', 'Receiver Vessel Certifications', 'Multi-Drop Manifold Loops']
  },
  'industrial-plumbing-boilers': {
    title: 'Boiler Systems & Hydronic',
    subtitle: 'High-pressure steam boiler pipeline loops',
    desc: 'Lay hydronic boiler pipelines, Primary/Secondary manifolds, and steam pumps for factory manufacturing heating loops.',
    image: '/images/ind_boilers_ai.png',
    highlights: ['High-Pressure steam piping', 'Primary/Secondary boiler loops', 'Centrifugal circulation pumps', 'Steam valve configurations']
  },
  'industrial-plumbing-pumps': {
    title: 'Industrial Pump Systems',
    subtitle: 'Centrifugal Utility Pumps & Vessels',
    desc: 'Configure process fluid pumping stations, install heavy centrifugal booster pumps, sewage ejector wells, and expansion tanks.',
    image: '/images/ind_pump_sys_ai.png',
    highlights: ['High-Horsepower Utility Pumps', 'Process Cooling Loop Chillers', 'Dual Alternating Pump Controls', 'Heavy Expansion Tank Valves']
  }
};

export default function ServiceDetails() {
  const { serviceId } = useParams();
  const [heroRef, heroInView] = useInView(0.02);
  const [gridRef, gridInView] = useInView(0.05);

  const data = SERVICES_DATA[serviceId] || SERVICES_DATA['residential-heating'];

  return (
    <div className="w-full bg-[#1a1a2e] text-white pt-24 pb-16 sm:pt-32 lg:pt-36 overflow-hidden">

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center transition-all duration-1000 ease-out"
        style={{
          opacity: heroInView ? 1 : 0,
          transform: heroInView ? 'translateY(0)' : 'translateY(30px)',
        }}
      >
        <span className="text-gray-400 text-xs sm:text-sm font-bold uppercase tracking-widest block mb-4">
          {data.subtitle}
        </span>
        <h1 id="metric-servicedetails-heading" className="font-black leading-tight text-3xl sm:text-5xl lg:text-6xl mb-6">
          <span className="text-[#c3252e]">{data.title.split(' ')[0]}</span>{' '}
          <span className="text-[#8f8cff]">{data.title.split(' ').slice(1, 3).join(' ')}</span>{' '}
          <span className="text-white">{data.title.split(' ').slice(3).join(' ')}</span>
        </h1>
        <div className="w-20 h-1 rounded-full bg-gradient-to-r from-[#c3252e] via-[#8f8cff] to-white mx-auto mb-6" />
        <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
          {data.desc}
        </p>
      </section>

      {/* ── CONTENT GRID ── */}
      <section ref={gridRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

          {/* Details column */}
          <div
            className="lg:col-span-6 flex flex-col gap-6 transition-all duration-800 ease-out"
            style={{
              opacity: gridInView ? 1 : 0,
              transform: gridInView ? 'translateY(0)' : 'translateY(40px)',
            }}
          >
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden group">
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#0f0f1a]/50">
                {data.image && (
                  <img
                    src={data.image}
                    alt={data.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-700 select-none pointer-events-none"
                    draggable="false"
                  />
                )}
              </div>
              <div className="p-6 sm:p-8">
                <h2 className="text-white font-black text-xl sm:text-2xl mb-4">{data.title} Solutions</h2>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  We are dedicated to providing state-of-the-art mechanical, electrical, and plumbing engineering. Our certified teams draft stamped plans, coordinate safe installations, and verify ongoing code compliance to protect your workspace.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.highlights.map((feat, idx) => (
                    <div
                      key={feat}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300 leading-snug transition-all duration-500 ease-out"
                      style={{
                        opacity: gridInView ? 1 : 0,
                        transform: gridInView ? 'translateY(0)' : 'translateY(15px)',
                        transitionDelay: gridInView ? `${idx * 100}ms` : '0ms'
                      }}
                    >
                      <span className="text-[#c3252e] font-bold mt-0.5">✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form column */}
          <div
            className="lg:col-span-6 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 transition-all duration-800 ease-out"
            style={{
              opacity: gridInView ? 1 : 0,
              transform: gridInView ? 'translateY(0)' : 'translateY(40px)',
              transitionDelay: gridInView ? '150ms' : '0ms',
            }}
          >
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider border-b border-white/10 pb-3">Request a System Quote</h3>

            <LeadForm
              subject={`${data.title} Consultation Request`}
              fromName={`MetricAir ${data.title}`}
              buttonText="Request Consultation"
            />
          </div>

        </div>
      </section>

    </div>
  );
}
