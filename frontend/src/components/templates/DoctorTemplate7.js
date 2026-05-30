"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Image from "next/image";

/*
 ╔══════════════════════════════════════════════╗
 ║   DOCTOR TEMPLATE 7 — "NEXUS"               ║
 ║   Palette: Deep Space + Cyan Pulse          ║
 ║   Aesthetic: Futuristic Luxury Healthcare   ║
 ╚══════════════════════════════════════════════╝

  --void        #050810  (deepest bg)
  --space       #080d1a  (base bg)
  --cosmos      #0d1630  (elevated bg)
  --nebula      #121e3d  (card bg)
  --horizon     #1a2850  (border/divide)
  --cyan        #00d4ff  (primary accent)
  --cyan-dim    #0099bb  (muted accent)
  --cyan-glow   rgba(0,212,255,0.18) (glow)
  --teal        #00c4a0  (secondary accent)
  --purple      #7c3aed  (tertiary accent)
  --emerald     #10b981  (success/health)
  --white       #ffffff
  --silver      #e2eaf8  (text primary)
  --mist        #8899bb  (text secondary)
  --frost       rgba(255,255,255,0.04) (glass fill)
*/

/* ─── Easing ─── */
const EASE_OUT = [0.16, 1, 0.3, 1];
const EASE_EXPO = [0.22, 1, 0.36, 1];
const SPRING_SOFT = { type: "spring", stiffness: 200, damping: 26 };

/* ─── Variants ─── */
const slideUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 48, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, delay, ease: EASE_OUT } },
});
const slideLeft = (delay = 0) => ({
  hidden: { opacity: 0, x: -56, filter: "blur(4px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.85, delay, ease: EASE_OUT } },
});
const slideRight = (delay = 0) => ({
  hidden: { opacity: 0, x: 56, filter: "blur(4px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.85, delay, ease: EASE_OUT } },
});
const popIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.82, filter: "blur(8px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.6, delay, ease: EASE_EXPO } },
});
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

/* ─── Reveal ─── */
function Reveal({ children, className = "", dir = "up", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const v = dir === "left" ? slideLeft(delay) : dir === "right" ? slideRight(delay) : dir === "scale" ? popIn(delay) : slideUp(delay);
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={v} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Stagger Container ─── */
function Stagger({ children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Cyan Badge ─── */
function CyanBadge({ children }) {
  return (
    <div className="dt7-badge">
      <span className="dt7-badge-dot" />
      <span>{children}</span>
    </div>
  );
}

/* ─── Animated Counter ─── */
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const num = parseInt(String(target).replace(/\D/g, "")) || 0;
    let cur = 0;
    const step = Math.max(1, Math.ceil(num / 60));
    const t = setInterval(() => {
      cur += step;
      if (cur >= num) { setCount(num); clearInterval(t); } else setCount(cur);
    }, 24);
    return () => clearInterval(t);
  }, [inView, target]);
  const nonDigit = String(target).replace(/\d/g, "");
  return <span ref={ref}>{count}{nonDigit || suffix}</span>;
}

/* ─── Floating Pulse ─── */
function PulseDot({ size = 12, color = "#00d4ff", style = {} }) {
  return (
    <div style={{ position: "relative", width: size, height: size, ...style }}>
      <motion.div
        animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", inset: 0, borderRadius: "50%", background: color, opacity: 0.4 }}
      />
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: color }} />
    </div>
  );
}

/* ─── Glow Button ─── */
function GlowBtn({ href, children, variant = "cyan", onClick, style = {} }) {
  const colors = {
    cyan: { bg: "var(--cyan)", text: "var(--void)", shadow: "0 0 32px rgba(0,212,255,0.45)" },
    outline: { bg: "transparent", text: "var(--cyan)", shadow: "none", border: "1px solid rgba(0,212,255,0.4)" },
    teal: { bg: "var(--teal)", text: "var(--void)", shadow: "0 0 32px rgba(0,196,160,0.4)" },
  };
  const c = colors[variant] || colors.cyan;
  return (
    <motion.a
      href={href || "#"}
      onClick={onClick}
      whileHover={{ scale: 1.04, boxShadow: variant === "outline" ? "0 0 28px rgba(0,212,255,0.2)" : c.shadow }}
      whileTap={{ scale: 0.97 }}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        background: c.bg, color: c.text, border: c.border || "none",
        padding: "13px 28px", borderRadius: 50, fontWeight: 700, fontSize: 14,
        textDecoration: "none", cursor: "pointer", letterSpacing: "0.02em",
        boxShadow: c.shadow, transition: "background 0.2s",
        ...style,
      }}
    >
      {children}
    </motion.a>
  );
}

/* ─── Glass Card ─── */
function GlassCard({ children, className = "", hover = true, style = {} }) {
  return (
    <motion.div
      className={`dt7-glass ${className}`}
      whileHover={hover ? { y: -6, boxShadow: "0 24px 64px rgba(0,212,255,0.12), 0 0 0 1px rgba(0,212,255,0.2)" } : {}}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ─── Testimonial Slider ─── */
function TestimonialSlider({ items }) {
  const [cur, setCur] = useState(0);
  const len = items.length;
  const go = useCallback((n) => setCur(((n % len) + len) % len), [len]);
  useEffect(() => {
    const t = setInterval(() => go(cur + 1), 5000);
    return () => clearInterval(t);
  }, [cur, go]);
  return (
    <div className="dt7-tslider">
      <AnimatePresence mode="wait">
        <motion.div
          key={cur}
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
          className="dt7-tcard"
        >
          <div className="dt7-tcard-glow" />
          <div className="dt7-tcard-quote">"</div>
          <p className="dt7-tcard-text">{items[cur].review || items[cur].text}</p>
          <div className="dt7-tcard-footer">
            <div className="dt7-tavatar">
              {items[cur].image
                ? <Image src={items[cur].image} alt={items[cur].name} fill className="object-cover" />
                : <span>{(items[cur].name || items[cur].patientName || "P")[0]}</span>}
            </div>
            <div>
              <p className="dt7-tname">{items[cur].name || items[cur].patientName}</p>
              <div className="dt7-tstars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: i < (items[cur].rating || 5) ? "var(--cyan)" : "var(--horizon)" }}>★</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="dt7-tcontrols">
        <button onClick={() => go(cur - 1)} className="dt7-tarrow">‹</button>
        {items.map((_, i) => (
          <motion.button
            key={i} onClick={() => go(i)}
            animate={{ width: i === cur ? 24 : 8, background: i === cur ? "var(--cyan)" : "var(--horizon)" }}
            className="dt7-tdot"
          />
        ))}
        <button onClick={() => go(cur + 1)} className="dt7-tarrow">›</button>
      </div>
    </div>
  );
}

/* ─── FAQ Item ─── */
function FaqItem({ q, a, i }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div variants={slideUp(i * 0.07)} className={`dt7-faq-item ${open ? "open" : ""}`}>
      <button className="dt7-faq-q" onClick={() => setOpen(!open)}>
        <span className="dt7-faq-num">0{i + 1}</span>
        <span className="dt7-faq-qtext">{q}</span>
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.22 }} className="dt7-faq-icon">+</motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            <p className="dt7-faq-a">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Floating Blob ─── */
function Blob({ cx, cy, r, color, opacity = 0.18 }) {
  return (
    <motion.div
      animate={{ x: [0, 20, -10, 0], y: [0, -15, 10, 0], scale: [1, 1.08, 0.96, 1] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: "absolute", left: cx, top: cy,
        width: r * 2, height: r * 2, borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity, transform: "translate(-50%, -50%)", pointerEvents: "none",
        filter: "blur(40px)",
      }}
    />
  );
}

/* ══════════════════════════════════════════
   MAIN TEMPLATE
══════════════════════════════════════════ */
export default function DoctorTemplate7({ data }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroParallax = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* ── Data ── */
  const {
    clinicName, heroTitle, specialty, heroImage, bio, aboutUsTitle, aboutImage,
    education, experience, contactEmail, phone, countryCode, address,
    workingHours, headerType, logoUrl, clinicNameFontSize, heroTitleFontSize,
    specialtyFontSize, services, tagline, heroDescription, qualification,
    certifications, languagesSpoken, hospitalName, whyChooseUs, schedule,
    stats, testimonials, teamDoctors, faqs, insurancePartners, blog,
    gallery, googleMapsEmbed, emergencyContact, whatsappNumber, footerDisclaimer,
    emergencyAvailability, ambulanceNumber, footerCopyright, socialLinks,
    blogSectionTitle, blogSubtitle, enableBlog,
  } = data || {};

  const displayPhone = phone ? `${countryCode ? countryCode.split(" ")[0] : ""}${phone}` : "+1 800 NEXUS MD";
  const displayEmail = contactEmail || "care@nexushealth.com";
  const displayAddress = address || "One Medical Plaza, New York, NY 10001";
  const displayName = clinicName || "Nexus Health";
  const displayEmergency = emergencyContact || displayPhone;

  const defaultServices = [
    { icon: "🫀", title: "Cardiology", description: "AI-assisted cardiac imaging, interventional procedures, and preventive programs guided by real-time diagnostics.", span: "2" },
    { icon: "🧠", title: "Neurology", description: "Comprehensive brain and nervous system evaluation with advanced MRI mapping and neurophysiology testing.", span: "1" },
    { icon: "🦴", title: "Orthopedics", description: "Robotic-assisted joint replacement and minimally invasive spine surgery with accelerated recovery.", span: "1" },
    { icon: "👶", title: "Pediatrics", description: "Child-first care environments with developmentally attuned specialists from birth through adolescence.", span: "1" },
    { icon: "👁️", title: "Ophthalmology", description: "Precision laser vision correction and retinal interventions with sub-micron imaging technology.", span: "1" },
    { icon: "🩻", title: "Radiology", description: "3T MRI, PET-CT, and AI-enhanced image analysis for rapid and accurate clinical decisions.", span: "1" },
  ];
  const displayServices = services?.length ? services : defaultServices;

  const defaultWhyChoose = [
    { icon: "🤖", title: "AI-Powered Diagnostics", description: "Machine learning algorithms cross-reference millions of cases to enhance diagnostic accuracy." },
    { icon: "🏅", title: "Fellowship-Trained Experts", description: "Every physician holds subspecialty training from world-leading academic medical centres." },
    { icon: "⚡", title: "Real-Time Results", description: "Digital lab integration and instant imaging reports eliminate days of waiting." },
    { icon: "🛡️", title: "Zero Surprise Billing", description: "Fully transparent pricing and active insurance coordination before any procedure." },
  ];
  const displayWhyChoose = whyChooseUs?.length ? whyChooseUs : defaultWhyChoose;

  const defaultSchedule = [
    { day: "Monday – Friday", open: "7:00 AM", close: "9:00 PM" },
    { day: "Saturday", open: "8:00 AM", close: "6:00 PM" },
    { day: "Sunday", open: "10:00 AM", close: "3:00 PM" },
  ];
  const displaySchedule = schedule?.length ? schedule : defaultSchedule;

  const defaultStats = [
    { value: "30+", label: "Years of Excellence" },
    { value: "24K+", label: "Lives Transformed" },
    { value: "99%", label: "Patient Satisfaction" },
    { value: "120+", label: "Specialist Doctors" },
  ];
  const displayStats = stats?.length ? stats : defaultStats;

  const defaultTestimonials = [
    { name: "Dr. Priya Nair", review: "Nexus Health redefined what I thought modern healthcare could be. Every touchpoint — from digital intake to post-visit follow-up — was seamless and deeply humane.", rating: 5 },
    { name: "James Whitfield", review: "The diagnostic precision here is unlike anything I have experienced elsewhere. My specialist identified a condition three others had missed — I am forever grateful.", rating: 5 },
    { name: "Anika Sorel", review: "The facilities feel like the future, but the warmth and personal attention feel timeless. It is a rare and remarkable combination.", rating: 5 },
    { name: "Mohamed Al-Rashid", review: "Flying in specifically for the cardiac programme was one of the best decisions of my life. World-class care delivered with extraordinary compassion.", rating: 5 },
  ];
  const displayTestimonials = testimonials?.length ? testimonials : defaultTestimonials;

  const defaultTeam = [
    { name: "Dr. Reina Sato", specialization: "Cardiology", experience: "18 Years" },
    { name: "Dr. Elias Brennan", specialization: "Neurology", experience: "15 Years" },
    { name: "Dr. Zara Osei", specialization: "Orthopedics", experience: "12 Years" },
    { name: "Dr. Luca Ferraris", specialization: "Radiology", experience: "10 Years" },
  ];
  const displayTeam = teamDoctors?.length ? teamDoctors : defaultTeam;

  const defaultFaqs = [
    { question: "How does the AI-assisted diagnostic process work?", answer: "Our proprietary system cross-references your scans and labs against a curated clinical database, flagging anomalies and surfacing relevant literature for your specialist — who reviews every finding personally." },
    { question: "Can I access my records and results digitally?", answer: "Yes. All records, imaging, lab results, and care plans are available in real time through our secure patient portal and mobile app, accessible from any device." },
    { question: "What insurance providers are accepted?", answer: "We work with all major carriers. Our pre-authorisation team will verify your coverage and provide a clear cost estimate before any appointment or procedure." },
    { question: "Is emergency care available after hours?", answer: "Our emergency line is staffed 24 hours a day, 365 days a year by board-certified clinicians who can provide triage guidance and arrange urgent care immediately." },
  ];
  const displayFaqs = faqs?.length ? faqs : defaultFaqs;

  const defaultInsurance = [
    { name: "BlueCross" }, { name: "Cigna" }, { name: "Aetna" },
    { name: "UnitedHealth" }, { name: "Humana" }, { name: "Kaiser" },
  ];
  const displayInsurance = insurancePartners?.length ? insurancePartners : defaultInsurance;

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#team", label: "Team" },
    { href: "#contact", label: "Contact" },
  ];

  const technologies = [
    { icon: "🤖", title: "AI Diagnostics", desc: "Neural network-assisted reading of pathology and radiology at scale" },
    { icon: "🔬", title: "Genomic Medicine", desc: "Personalised treatment protocols derived from your unique DNA profile" },
    { icon: "🦾", title: "Robotic Surgery", desc: "Sub-millimetre precision with haptic feedback for minimally invasive procedures" },
    { icon: "📱", title: "Digital Health Hub", desc: "Continuous remote monitoring, teleconsultation, and smart medication tracking" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');

        :root {
          --void: #050810;
          --space: #080d1a;
          --cosmos: #0d1630;
          --nebula: #121e3d;
          --horizon: #1a2850;
          --cyan: #00d4ff;
          --cyan-dim: #0099bb;
          --cyan-glow: rgba(0,212,255,0.18);
          --teal: #00c4a0;
          --purple: #7c3aed;
          --emerald: #10b981;
          --white: #ffffff;
          --silver: #e2eaf8;
          --mist: #8899bb;
          --frost: rgba(255,255,255,0.04);
          --glass: rgba(13,22,48,0.7);
          --glass-border: rgba(0,212,255,0.14);
        }

        .dt7 * { box-sizing: border-box; margin: 0; padding: 0; }
        .dt7 { font-family: 'Space Grotesk', system-ui, sans-serif; background: var(--space); color: var(--silver); overflow-x: hidden; scroll-behavior: smooth; }
        .dt7-serif { font-family: 'DM Serif Display', Georgia, serif; }

        /* ── Layout ── */
        .dt7-inner { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
        @media (min-width: 768px) { .dt7-inner { padding: 0 48px; } }
        .dt7-section { padding: 100px 0; }
        @media (min-width: 768px) { .dt7-section { padding: 128px 0; } }

        /* ── Glass ── */
        .dt7-glass {
          background: var(--glass);
          border: 1px solid var(--glass-border);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 20px;
          transition: box-shadow 0.35s, border-color 0.35s, transform 0.35s;
        }
        .dt7-glass:hover { border-color: rgba(0,212,255,0.3); }

        /* ── Badge ── */
        .dt7-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(0,212,255,0.08); border: 1px solid rgba(0,212,255,0.25); border-radius: 50px; padding: 6px 16px; }
        .dt7-badge span:last-child { font-size: 11px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: var(--cyan); }
        .dt7-badge-dot { width: 7px; height: 7px; background: var(--cyan); border-radius: 50%; box-shadow: 0 0 8px var(--cyan); animation: blink 2s infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

        /* ── Typography ── */
        .dt7-h1 { font-family: 'DM Serif Display', serif; font-size: clamp(3rem, 8vw, 6rem); font-weight: 400; line-height: 1.02; letter-spacing: -0.02em; }
        .dt7-h2 { font-family: 'DM Serif Display', serif; font-size: clamp(2.2rem, 5vw, 3.6rem); font-weight: 400; line-height: 1.08; letter-spacing: -0.01em; }
        .dt7-h3 { font-family: 'DM Serif Display', serif; font-size: clamp(1.4rem, 3vw, 1.9rem); font-weight: 400; line-height: 1.2; }
        .dt7-cyan { color: var(--cyan); }
        .dt7-mist { color: var(--mist); }

        /* ── Topbar ── */
        .dt7-topbar { background: var(--void); border-bottom: 1px solid rgba(0,212,255,0.08); padding: 9px 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; }
        @media (min-width: 768px) { .dt7-topbar { padding: 9px 48px; } }
        .dt7-topbar-item { display: flex; align-items: center; gap: 7px; font-size: 12px; color: var(--mist); }
        .dt7-topbar-accent { color: var(--cyan); font-size: 13px; }

        /* ── Nav ── */
        .dt7-nav { position: sticky; top: 0; z-index: 100; transition: all 0.4s; }
        .dt7-nav-base { background: rgba(8,13,26,0.75); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); border-bottom: 1px solid rgba(0,212,255,0.08); }
        .dt7-nav-scrolled { background: rgba(5,8,16,0.95); backdrop-filter: blur(32px); border-bottom: 1px solid rgba(0,212,255,0.15); box-shadow: 0 8px 48px rgba(0,0,0,0.5); }
        .dt7-nav-inner { max-width: 1280px; margin: 0 auto; padding: 0 24px; height: 70px; display: flex; justify-content: space-between; align-items: center; }
        @media (min-width: 768px) { .dt7-nav-inner { padding: 0 48px; } }
        .dt7-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .dt7-logo-icon { width: 36px; height: 36px; background: linear-gradient(135deg, var(--cyan), var(--teal)); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 16px; box-shadow: 0 0 20px rgba(0,212,255,0.35); }
        .dt7-logo-name { font-weight: 700; font-size: 1.15rem; color: var(--white); letter-spacing: -0.01em; }
        .dt7-logo-sub { font-size: 10px; color: var(--cyan); font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; }
        .dt7-nav-links { display: none; align-items: center; gap: 28px; }
        @media (min-width: 1024px) { .dt7-nav-links { display: flex; } }
        .dt7-nav-link { font-size: 13.5px; font-weight: 500; color: var(--mist); text-decoration: none; transition: color 0.2s; letter-spacing: 0.01em; position: relative; }
        .dt7-nav-link::after { content: ''; position: absolute; bottom: -3px; left: 0; right: 0; height: 1px; background: var(--cyan); transform: scaleX(0); transition: transform 0.25s; }
        .dt7-nav-link:hover { color: var(--white); }
        .dt7-nav-link:hover::after { transform: scaleX(1); }
        .dt7-hamburger { display: flex; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 8px; }
        @media (min-width: 1024px) { .dt7-hamburger { display: none; } }
        .dt7-ham-bar { width: 22px; height: 1.5px; background: var(--silver); border-radius: 2px; transition: all 0.22s; }
        .dt7-mobile-menu { background: var(--void); border-top: 1px solid rgba(0,212,255,0.1); }
        .dt7-mobile-link { display: block; padding: 14px 24px; font-size: 15px; font-weight: 500; color: var(--silver); text-decoration: none; border-bottom: 1px solid rgba(255,255,255,0.04); }

        /* ══ HERO ══ */
        .dt7-hero { position: relative; min-height: 100vh; background: var(--void); overflow: hidden; display: flex; align-items: center; }
        .dt7-hero-canvas { position: absolute; inset: 0; overflow: hidden; }
        .dt7-hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px); background-size: 64px 64px; }
        .dt7-hero-inner { position: relative; z-index: 2; max-width: 1280px; margin: 0 auto; padding: 100px 24px 80px; width: 100%; display: grid; grid-template-columns: 1fr; gap: 56px; align-items: center; }
        @media (min-width: 768px) { .dt7-hero-inner { padding: 100px 48px 80px; } }
        @media (min-width: 1100px) { .dt7-hero-inner { grid-template-columns: 1fr 1fr; gap: 80px; } }
        /* Left */
        .dt7-hero-specialty { font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--teal); margin-bottom: 18px; display: flex; align-items: center; gap: 10px; }
        .dt7-hero-specialty::before { content: ''; width: 28px; height: 1px; background: var(--teal); }
        .dt7-hero-title { font-family: 'DM Serif Display', serif; font-size: clamp(3rem, 8vw, 5.8rem); font-weight: 400; color: var(--white); line-height: 1.0; letter-spacing: -0.025em; margin-bottom: 22px; }
        .dt7-hero-title em { color: var(--cyan); font-style: italic; }
        .dt7-hero-desc { font-size: 15px; color: var(--mist); line-height: 1.8; max-width: 480px; margin-bottom: 36px; }
        .dt7-hero-cta { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 52px; }
        .dt7-hero-metrics { display: flex; flex-wrap: wrap; gap: 28px; padding-top: 36px; border-top: 1px solid rgba(255,255,255,0.07); }
        .dt7-metric-val { font-family: 'DM Serif Display', serif; font-size: 2rem; color: var(--cyan); line-height: 1; }
        .dt7-metric-lbl { font-size: 11px; color: var(--mist); margin-top: 3px; letter-spacing: 0.04em; }
        /* Right panel */
        .dt7-hero-right { display: none; position: relative; }
        @media (min-width: 1100px) { .dt7-hero-right { display: flex; justify-content: flex-end; align-items: center; } }
        .dt7-hero-img-wrap { position: relative; width: 420px; }
        .dt7-hero-img-frame { position: relative; border-radius: 32px 8px 32px 8px; overflow: hidden; aspect-ratio: 3/4; border: 1px solid rgba(0,212,255,0.2); box-shadow: 0 0 80px rgba(0,212,255,0.12), inset 0 0 40px rgba(0,212,255,0.04); }
        .dt7-hero-img-shine { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(0,212,255,0.08) 0%, transparent 50%, rgba(124,58,237,0.08) 100%); z-index: 1; pointer-events: none; }
        /* Floating cards */
        .dt7-float-card { position: absolute; background: var(--glass); border: 1px solid var(--glass-border); backdrop-filter: blur(20px); border-radius: 16px; padding: 14px 18px; z-index: 5; white-space: nowrap; }
        .dt7-float-card-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: var(--mist); margin-bottom: 4px; }
        .dt7-float-card-val { font-family: 'DM Serif Display', serif; font-size: 1.4rem; color: var(--white); line-height: 1; }
        .dt7-float-card-sub { font-size: 10px; color: var(--cyan); margin-top: 2px; }
        .dt7-available-badge { position: absolute; top: 20px; left: -20px; background: linear-gradient(135deg, var(--emerald), #059669); border-radius: 50px; padding: 10px 16px; display: flex; align-items: center; gap: 8px; box-shadow: 0 8px 32px rgba(16,185,129,0.3); z-index: 5; font-size: 12px; font-weight: 700; color: white; }

        /* ── Curved divider ── */
        .dt7-curve { width: 100%; overflow: hidden; line-height: 0; }
        .dt7-curve svg { display: block; width: 100%; }

        /* ── About (Split asymmetric) ── */
        .dt7-about-bg { background: var(--cosmos); }
        .dt7-about-grid { display: grid; grid-template-columns: 1fr; gap: 64px; align-items: center; }
        @media (min-width: 1024px) { .dt7-about-grid { grid-template-columns: 5fr 7fr; gap: 96px; } }
        .dt7-about-img-wrap { position: relative; }
        .dt7-about-img-frame { position: relative; border-radius: 24px 4px 24px 4px; overflow: hidden; aspect-ratio: 4/5; max-width: 440px; border: 1px solid rgba(0,212,255,0.15); box-shadow: 0 40px 100px rgba(0,0,0,0.5), 0 0 60px rgba(0,212,255,0.07); }
        .dt7-about-accent { position: absolute; bottom: -24px; right: -16px; background: linear-gradient(135deg, var(--cyan), var(--teal)); border-radius: 16px; padding: 20px 24px; text-align: center; z-index: 2; box-shadow: 0 20px 48px rgba(0,212,255,0.3); }
        .dt7-about-accent-num { font-family: 'DM Serif Display', serif; font-size: 2.5rem; color: var(--void); line-height: 1; }
        .dt7-about-accent-lbl { font-size: 9px; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(5,8,16,0.65); margin-top: 3px; }
        .dt7-detail-list { display: flex; flex-direction: column; gap: 12px; margin: 28px 0; }
        .dt7-detail-row { display: flex; align-items: center; gap: 14px; padding: 14px 18px; border-radius: 12px; background: rgba(0,212,255,0.04); border: 1px solid rgba(0,212,255,0.1); transition: border-color 0.25s; }
        .dt7-detail-row:hover { border-color: rgba(0,212,255,0.3); }
        .dt7-detail-icon { width: 38px; height: 38px; background: rgba(0,212,255,0.1); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0; }
        .dt7-detail-info-lbl { font-size: 9px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--cyan); margin-bottom: 2px; }
        .dt7-detail-info-val { font-size: 13px; font-weight: 500; color: var(--silver); }

        /* ── Services Bento ── */
        .dt7-bento { display: grid; grid-template-columns: 1fr; gap: 16px; }
        @media (min-width: 640px) { .dt7-bento { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .dt7-bento { grid-template-columns: repeat(3, 1fr); } }
        .dt7-bento-card { position: relative; padding: 32px 28px; background: var(--glass); border: 1px solid var(--glass-border); border-radius: 20px; overflow: hidden; transition: border-color 0.35s, transform 0.35s, box-shadow 0.35s; cursor: pointer; }
        .dt7-bento-card.featured { grid-column: span 2; }
        @media (max-width: 1023px) { .dt7-bento-card.featured { grid-column: span 1; } }
        .dt7-bento-card::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 80% 20%, rgba(0,212,255,0.07) 0%, transparent 60%); opacity: 0; transition: opacity 0.35s; }
        .dt7-bento-card:hover { border-color: rgba(0,212,255,0.35); transform: translateY(-6px); box-shadow: 0 32px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,212,255,0.2); }
        .dt7-bento-card:hover::before { opacity: 1; }
        .dt7-bento-icon { font-size: 2.2rem; margin-bottom: 18px; display: block; }
        .dt7-bento-title { font-family: 'DM Serif Display', serif; font-size: 1.45rem; color: var(--white); margin-bottom: 10px; line-height: 1.2; }
        .dt7-bento-desc { font-size: 13.5px; color: var(--mist); line-height: 1.72; }
        .dt7-bento-num { position: absolute; top: 20px; right: 22px; font-family: 'DM Serif Display', serif; font-size: 3.5rem; color: rgba(0,212,255,0.06); line-height: 1; }
        .dt7-bento-link { display: inline-flex; align-items: center; gap: 6px; margin-top: 18px; font-size: 12px; font-weight: 700; color: var(--cyan); text-decoration: none; letter-spacing: 0.05em; text-transform: uppercase; }
        .dt7-bento-link:hover { gap: 10px; }

        /* ── Appointment CTA ── */
        .dt7-appt-bg { background: linear-gradient(135deg, #050810 0%, #0a1428 40%, #050810 100%); position: relative; overflow: hidden; }
        .dt7-appt-card { background: linear-gradient(135deg, rgba(0,212,255,0.12) 0%, rgba(124,58,237,0.12) 100%); border: 1px solid rgba(0,212,255,0.25); border-radius: 28px; padding: 56px 48px; position: relative; overflow: hidden; text-align: center; }
        @media (max-width: 768px) { .dt7-appt-card { padding: 40px 28px; } }
        .dt7-appt-glow { position: absolute; top: -40%; left: 50%; transform: translateX(-50%); width: 600px; height: 400px; background: radial-gradient(ellipse, rgba(0,212,255,0.14) 0%, transparent 70%); pointer-events: none; }
        .dt7-appt-ring { position: absolute; width: 400px; height: 400px; border-radius: 50%; border: 1px solid rgba(0,212,255,0.08); top: 50%; left: 50%; transform: translate(-50%, -50%); pointer-events: none; }
        .dt7-appt-ring-2 { width: 600px; height: 600px; border-color: rgba(124,58,237,0.06); }
        .dt7-appt-title { font-family: 'DM Serif Display', serif; font-size: clamp(2rem, 5vw, 3.2rem); color: var(--white); line-height: 1.1; margin: 16px 0 18px; }
        .dt7-appt-sub { font-size: 15px; color: var(--mist); max-width: 480px; margin: 0 auto 36px; line-height: 1.75; }
        .dt7-appt-ctas { display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; }
        .dt7-schedule-strip { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; margin-top: 40px; }
        .dt7-schedule-pill { display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 50px; padding: 10px 20px; font-size: 13px; color: var(--silver); }
        .dt7-schedule-day { font-weight: 700; color: var(--cyan); }

        /* ── Stats ── */
        .dt7-stats-bg { background: var(--nebula); border-top: 1px solid var(--horizon); border-bottom: 1px solid var(--horizon); }
        .dt7-stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); }
        @media (min-width: 768px) { .dt7-stats-grid { grid-template-columns: repeat(4, 1fr); } }
        .dt7-stat-cell { padding: 52px 32px; text-align: center; border-right: 1px solid var(--horizon); position: relative; overflow: hidden; }
        .dt7-stat-cell:nth-child(2n) { border-right: none; }
        @media (min-width: 768px) { .dt7-stat-cell:nth-child(2n) { border-right: 1px solid var(--horizon); } .dt7-stat-cell:last-child { border-right: none; } }
        .dt7-stat-cell::before { content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 40%; height: 2px; background: linear-gradient(90deg, transparent, var(--cyan), transparent); opacity: 0.5; }
        .dt7-stat-val { font-family: 'DM Serif Display', serif; font-size: clamp(2.4rem, 4.5vw, 3.2rem); color: var(--cyan); line-height: 1; margin-bottom: 10px; }
        .dt7-stat-lbl { font-size: 11px; font-weight: 600; color: var(--mist); letter-spacing: 0.12em; text-transform: uppercase; }
        .dt7-stat-bar { width: 32px; height: 2px; background: linear-gradient(90deg, var(--cyan), var(--teal)); border-radius: 2px; margin: 10px auto 0; }

        /* ── Testimonials ── */
        .dt7-tslider { width: 100%; }
        .dt7-tcard { position: relative; padding: 40px; background: var(--glass); border: 1px solid var(--glass-border); border-radius: 24px; overflow: hidden; min-height: 240px; }
        .dt7-tcard-glow { position: absolute; top: -30%; right: -10%; width: 300px; height: 300px; background: radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%); pointer-events: none; }
        .dt7-tcard-quote { font-family: 'DM Serif Display', serif; font-size: 6rem; color: var(--cyan); line-height: 0.7; margin-bottom: 12px; opacity: 0.3; }
        .dt7-tcard-text { font-family: 'DM Serif Display', serif; font-size: 1.2rem; font-style: italic; color: var(--silver); line-height: 1.72; margin-bottom: 28px; }
        .dt7-tcard-footer { display: flex; align-items: center; gap: 14px; }
        .dt7-tavatar { width: 48px; height: 48px; min-width: 48px; border-radius: 50%; background: var(--horizon); border: 2px solid rgba(0,212,255,0.3); display: flex; align-items: center; justify-content: center; font-family: 'DM Serif Display', serif; font-size: 1.2rem; color: var(--cyan); overflow: hidden; position: relative; }
        .dt7-tname { font-weight: 700; font-size: 14px; color: var(--white); margin-bottom: 4px; }
        .dt7-tstars { display: flex; gap: 3px; font-size: 12px; }
        .dt7-tcontrols { display: flex; align-items: center; gap: 8px; margin-top: 20px; }
        .dt7-tarrow { width: 38px; height: 38px; border-radius: 50%; background: rgba(0,212,255,0.06); border: 1px solid rgba(0,212,255,0.2); font-size: 20px; color: var(--cyan); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
        .dt7-tarrow:hover { background: rgba(0,212,255,0.15); }
        .dt7-tdot { height: 8px; border-radius: 4px; border: none; cursor: pointer; padding: 0; transition: all 0.3s; }

        /* ── Team ── */
        .dt7-team-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        @media (min-width: 1024px) { .dt7-team-grid { grid-template-columns: repeat(4, 1fr); } }
        .dt7-team-card { position: relative; border-radius: 20px; overflow: hidden; aspect-ratio: 3/4; background: var(--nebula); border: 1px solid var(--horizon); cursor: pointer; }
        .dt7-team-img { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 4rem; background: linear-gradient(160deg, var(--cosmos) 0%, var(--nebula) 100%); transition: transform 0.6s ease; }
        .dt7-team-card:hover .dt7-team-img { transform: scale(1.07); }
        .dt7-team-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(5,8,16,0.95) 30%, transparent 100%); display: flex; flex-direction: column; justify-content: flex-end; padding: 24px; }
        .dt7-team-cyan-line { width: 24px; height: 2px; background: var(--cyan); margin-bottom: 10px; box-shadow: 0 0 8px var(--cyan); }
        .dt7-team-name { font-family: 'DM Serif Display', serif; font-size: 1.2rem; color: var(--white); margin-bottom: 4px; }
        .dt7-team-spec { font-size: 11px; font-weight: 700; color: var(--cyan); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 3px; }
        .dt7-team-exp { font-size: 11px; color: var(--mist); }

        /* ── Why choose ── */
        .dt7-why-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        @media (min-width: 1024px) { .dt7-why-grid { grid-template-columns: repeat(4, 1fr); } }
        .dt7-why-card { padding: 32px 24px; background: var(--glass); border: 1px solid var(--glass-border); border-radius: 18px; position: relative; overflow: hidden; transition: border-color 0.3s, transform 0.3s; cursor: default; }
        .dt7-why-card::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, var(--cyan), var(--teal)); opacity: 0; transition: opacity 0.3s; }
        .dt7-why-card:hover { border-color: rgba(0,212,255,0.3); transform: translateY(-5px); }
        .dt7-why-card:hover::after { opacity: 1; }
        .dt7-why-icon { font-size: 1.8rem; margin-bottom: 16px; display: block; }
        .dt7-why-title { font-family: 'DM Serif Display', serif; font-size: 1.15rem; color: var(--white); margin-bottom: 8px; }
        .dt7-why-desc { font-size: 13px; color: var(--mist); line-height: 1.65; }

        /* ── Technology ── */
        .dt7-tech-bg { background: var(--cosmos); }
        .dt7-tech-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        @media (min-width: 1024px) { .dt7-tech-grid { grid-template-columns: repeat(4, 1fr); } }
        .dt7-tech-card { padding: 36px 28px; background: var(--void); border: 1px solid var(--horizon); border-radius: 20px; text-align: center; position: relative; overflow: hidden; transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s; }
        .dt7-tech-card::before { content: ''; position: absolute; top: -50%; left: 50%; transform: translateX(-50%); width: 200px; height: 200px; background: radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%); opacity: 0; transition: opacity 0.4s; }
        .dt7-tech-card:hover { border-color: rgba(0,196,160,0.4); box-shadow: 0 24px 64px rgba(0,196,160,0.1); transform: translateY(-6px); }
        .dt7-tech-card:hover::before { opacity: 1; }
        .dt7-tech-icon-wrap { width: 64px; height: 64px; margin: 0 auto 20px; background: linear-gradient(135deg, rgba(0,212,255,0.12), rgba(0,196,160,0.12)); border-radius: 18px; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; border: 1px solid rgba(0,212,255,0.15); }
        .dt7-tech-title { font-family: 'DM Serif Display', serif; font-size: 1.15rem; color: var(--white); margin-bottom: 10px; }
        .dt7-tech-desc { font-size: 13px; color: var(--mist); line-height: 1.65; }

        /* ── Emergency ── */
        .dt7-emergency-bg { background: linear-gradient(135deg, #0a0314 0%, #120a1e 50%, #050810 100%); position: relative; overflow: hidden; }
        .dt7-emergency-inner { text-align: center; position: relative; z-index: 2; }
        .dt7-emergency-ring { position: absolute; border-radius: 50%; border: 1px solid rgba(124,58,237,0.15); pointer-events: none; }
        .dt7-pulse-btn { display: inline-flex; align-items: center; gap: 12px; background: linear-gradient(135deg, #7c3aed, #9d5bfb); color: white; padding: 18px 36px; border-radius: 50px; font-weight: 800; font-size: 15px; text-decoration: none; box-shadow: 0 0 40px rgba(124,58,237,0.5); animation: pulse-glow 2.5s infinite; cursor: pointer; border: none; }
        @keyframes pulse-glow { 0%,100%{box-shadow:0 0 40px rgba(124,58,237,0.5)} 50%{box-shadow:0 0 70px rgba(124,58,237,0.8),0 0 120px rgba(124,58,237,0.3)} }

        /* ── Insurance ── */
        .dt7-ins-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
        @media (min-width: 480px) { .dt7-ins-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 768px) { .dt7-ins-grid { grid-template-columns: repeat(6, 1fr); } }
        .dt7-ins-card { background: var(--frost); border: 1px solid var(--glass-border); border-radius: 12px; padding: 20px 14px; text-align: center; font-size: 12px; font-weight: 700; color: var(--mist); letter-spacing: 0.04em; transition: border-color 0.2s, color 0.2s, transform 0.2s; }
        .dt7-ins-card:hover { border-color: rgba(0,212,255,0.35); color: var(--silver); transform: translateY(-3px); }

        /* ── FAQ ── */
        .dt7-faq-item { border-bottom: 1px solid rgba(0,212,255,0.08); }
        .dt7-faq-q { width: 100%; display: flex; align-items: center; gap: 16px; padding: 22px 0; background: none; border: none; cursor: pointer; text-align: left; }
        .dt7-faq-num { font-family: 'DM Serif Display', serif; font-size: 1rem; color: var(--cyan); opacity: 0.4; min-width: 28px; flex-shrink: 0; }
        .dt7-faq-qtext { font-size: 15px; font-weight: 500; color: var(--silver); flex: 1; line-height: 1.4; transition: color 0.2s; }
        .dt7-faq-q:hover .dt7-faq-qtext { color: var(--white); }
        .dt7-faq-icon { width: 30px; height: 30px; min-width: 30px; border-radius: 50%; background: rgba(0,212,255,0.07); border: 1px solid rgba(0,212,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 300; color: var(--cyan); line-height: 1; }
        .dt7-faq-a { padding: 4px 0 24px 44px; font-size: 14px; color: var(--mist); line-height: 1.8; }

        /* ── Blog ── */
        .dt7-blog-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
        @media (min-width: 640px) { .dt7-blog-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .dt7-blog-grid { grid-template-columns: repeat(3, 1fr); } }
        .dt7-blog-card { background: var(--glass); border: 1px solid var(--glass-border); border-radius: 20px; overflow: hidden; transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s; cursor: pointer; }
        .dt7-blog-card:hover { transform: translateY(-6px); border-color: rgba(0,212,255,0.28); box-shadow: 0 24px 64px rgba(0,0,0,0.4); }
        .dt7-blog-thumb { height: 160px; display: flex; align-items: center; justify-content: center; font-size: 2.8rem; background: var(--nebula); border-bottom: 1px solid var(--horizon); }
        .dt7-blog-body { padding: 24px; }
        .dt7-blog-tag { font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--cyan); }
        .dt7-blog-title { font-family: 'DM Serif Display', serif; font-size: 1.2rem; color: var(--white); margin: 8px 0; line-height: 1.25; }
        .dt7-blog-excerpt { font-size: 13px; color: var(--mist); line-height: 1.65; margin-bottom: 12px; }
        .dt7-blog-date { font-size: 11px; color: var(--teal); font-weight: 600; }

        /* ── Contact ── */
        .dt7-contact-bg { background: var(--void); }
        .dt7-contact-grid { display: grid; grid-template-columns: 1fr; gap: 48px; }
        @media (min-width: 1024px) { .dt7-contact-grid { grid-template-columns: 1fr 1fr; } }
        .dt7-contact-info-card { display: flex; align-items: flex-start; gap: 16px; padding: 18px 20px; background: var(--frost); border: 1px solid var(--glass-border); border-radius: 14px; transition: border-color 0.25s; }
        .dt7-contact-info-card:hover { border-color: rgba(0,212,255,0.3); }
        .dt7-contact-icon { width: 44px; height: 44px; min-width: 44px; background: rgba(0,212,255,0.08); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.15rem; }
        .dt7-contact-lbl { font-size: 9px; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; color: var(--cyan); margin-bottom: 3px; }
        .dt7-contact-val { font-size: 14px; font-weight: 500; color: var(--silver); }
        .dt7-map-wrap { border-radius: 20px; overflow: hidden; border: 1px solid var(--glass-border); min-height: 360px; background: var(--nebula); display: flex; align-items: center; justify-content: center; }
        .dt7-map-placeholder { text-align: center; color: var(--mist); padding: 48px; }

        /* ── Footer ── */
        .dt7-footer { background: var(--void); border-top: 1px solid rgba(0,212,255,0.08); }
        .dt7-footer-top { max-width: 1280px; margin: 0 auto; padding: 72px 24px 48px; display: grid; grid-template-columns: 1fr; gap: 40px; }
        @media (min-width: 768px) { .dt7-footer-top { padding: 72px 48px 48px; grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .dt7-footer-top { grid-template-columns: 2.5fr 1fr 1fr 1.8fr; } }
        .dt7-footer-heading { font-size: 10px; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; color: var(--cyan); margin-bottom: 18px; }
        .dt7-footer-link { display: block; font-size: 13px; color: var(--mist); text-decoration: none; padding: 5px 0; transition: color 0.2s; }
        .dt7-footer-link:hover { color: var(--silver); }
        .dt7-footer-divider { border: none; border-top: 1px solid rgba(255,255,255,0.05); margin: 0 24px; }
        @media (min-width: 768px) { .dt7-footer-divider { margin: 0 48px; } }
        .dt7-footer-bottom { max-width: 1280px; margin: 0 auto; padding: 20px 24px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px; font-size: 12px; color: var(--mist); }
        @media (min-width: 768px) { .dt7-footer-bottom { padding: 20px 48px; } }
        .dt7-social-row { display: flex; gap: 8px; margin-top: 20px; }
        .dt7-social-btn { width: 36px; height: 36px; border-radius: 10px; border: 1px solid rgba(0,212,255,0.14); display: flex; align-items: center; justify-content: center; font-size: 13px; color: var(--mist); text-decoration: none; transition: all 0.25s; }
        .dt7-social-btn:hover { border-color: var(--cyan); color: var(--cyan); box-shadow: 0 0 16px rgba(0,212,255,0.2); }
        .dt7-footer-newsletter { background: rgba(0,212,255,0.05); border: 1px solid rgba(0,212,255,0.12); border-radius: 14px; padding: 22px; }
        .dt7-newsletter-input { width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(0,212,255,0.15); border-radius: 10px; padding: 11px 16px; color: var(--silver); font-size: 13px; font-family: inherit; outline: none; margin-bottom: 10px; }
        .dt7-newsletter-input:focus { border-color: var(--cyan); box-shadow: 0 0 0 3px rgba(0,212,255,0.08); }
        .dt7-newsletter-btn { width: 100%; background: linear-gradient(90deg, var(--cyan), var(--teal)); color: var(--void); border: none; border-radius: 10px; padding: 12px; font-weight: 800; font-size: 13px; cursor: pointer; transition: opacity 0.2s; }
        .dt7-newsletter-btn:hover { opacity: 0.9; }
        .dt7-footer-disclaimer { max-width: 1280px; margin: 0 auto; padding: 0 24px 20px; font-size: 11px; color: rgba(255,255,255,0.22); line-height: 1.65; border-top: 1px solid rgba(255,255,255,0.04); padding-top: 16px; }
        @media (min-width: 768px) { .dt7-footer-disclaimer { padding: 0 48px 20px; padding-top: 16px; } }
      `}</style>

      <div className="dt7">

        {/* ── Topbar ── */}
        <div className="dt7-topbar">
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <div className="dt7-topbar-item">
              <span className="dt7-topbar-accent">📞</span>
              <span>{displayPhone}</span>
            </div>
            <div className="dt7-topbar-item">
              <span className="dt7-topbar-accent">✉</span>
              <span>{displayEmail}</span>
            </div>
          </div>
          <div className="dt7-topbar-item">
            <PulseDot size={8} color="#10b981" />
            <span style={{ fontSize: 11, fontWeight: 700, color: "#10b981" }}>Open Now</span>
            <span style={{ color: "rgba(255,255,255,0.3)", margin: "0 4px" }}>·</span>
            <span>{workingHours || "Mon–Fri 7AM–9PM"}</span>
          </div>
        </div>

        {/* ── Navbar ── */}
        <motion.header
          className={`dt7-nav ${scrolled ? "dt7-nav-scrolled" : "dt7-nav-base"}`}
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <div className="dt7-nav-inner">
            {headerType === "Image" && logoUrl ? (
              <div style={{ position: "relative", width: 130, height: 40 }}>
                <Image src={logoUrl} alt={displayName} fill className="object-contain" />
              </div>
            ) : (
              <a href="#home" className="dt7-logo">
                <div className="dt7-logo-icon">⚕️</div>
                <div>
                  <div className="dt7-logo-name">{displayName}</div>
                  <div className="dt7-logo-sub">{specialty || "Medical Centre"}</div>
                </div>
              </a>
            )}
            <nav className="dt7-nav-links">
              {navLinks.map(({ href, label }) => (
                <a key={href} href={href} className="dt7-nav-link">{label}</a>
              ))}
              <GlowBtn href="#contact" style={{ padding: "10px 22px", fontSize: 13 }}>Book Now</GlowBtn>
            </nav>
            <button className="dt7-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              <motion.div animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6.5 : 0 }} className="dt7-ham-bar" />
              <motion.div animate={{ opacity: menuOpen ? 0 : 1 }} className="dt7-ham-bar" />
              <motion.div animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6.5 : 0 }} className="dt7-ham-bar" />
            </button>
          </div>
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                className="dt7-mobile-menu" style={{ overflow: "hidden" }}
              >
                {navLinks.map(({ href, label }) => (
                  <a key={href} href={href} className="dt7-mobile-link" onClick={() => setMenuOpen(false)}>{label}</a>
                ))}
                <div style={{ padding: "16px 24px 20px" }}>
                  <GlowBtn href="#contact" style={{ width: "100%", justifyContent: "center" }} onClick={() => setMenuOpen(false)}>Book Appointment</GlowBtn>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        {/* ══ HERO ══ */}
        <section id="home" ref={heroRef} className="dt7-hero">
          <div className="dt7-hero-canvas">
            <div className="dt7-hero-grid" />
            <Blob cx="15%" cy="30%" r={280} color="rgba(0,212,255,1)" opacity={0.12} />
            <Blob cx="80%" cy="60%" r={320} color="rgba(124,58,237,1)" opacity={0.1} />
            <Blob cx="50%" cy="90%" r={200} color="rgba(0,196,160,1)" opacity={0.08} />
          </div>

          <div className="dt7-hero-inner">
            {/* Left */}
            <div>
              <motion.p
                className="dt7-hero-specialty"
                initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT }}
                style={{ fontSize: specialtyFontSize ? `clamp(10px, 2vw, ${specialtyFontSize}px)` : undefined }}
              >
                {specialty || "Next-Generation Medical Excellence"}
              </motion.p>

              <motion.h1
                className="dt7-hero-title"
                initial={{ opacity: 0, y: 50, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 0.45, ease: EASE_OUT }}
                style={{ fontSize: heroTitleFontSize ? `clamp(3rem, 8vw, ${heroTitleFontSize}px)` : undefined }}
              >
                {heroTitle || (<>Medicine for<br /><em>the Future,</em><br />Today</>)}
              </motion.h1>

              <motion.p
                className="dt7-hero-desc"
                initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.7 }}
              >
                {tagline && <strong style={{ display: "block", color: "var(--white)", marginBottom: 6 }}>{tagline}</strong>}
                {heroDescription || "Where precision diagnostics, breakthrough therapies, and genuine compassion converge — delivering outcomes that define the new standard of care."}
              </motion.p>

              <motion.div
                className="dt7-hero-cta"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <GlowBtn href="#contact">📅 Book Appointment</GlowBtn>
                <GlowBtn href={`tel:${displayEmergency}`} variant="outline">🚨 Emergency Line</GlowBtn>
              </motion.div>

              <motion.div
                className="dt7-hero-metrics"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                {[["30+", "Years"], ["24K+", "Patients"], ["99%", "Satisfaction"]].map(([v, l]) => (
                  <div key={l}>
                    <p className="dt7-metric-val">{v}</p>
                    <p className="dt7-metric-lbl">{l}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Image Panel */}
            <motion.div
              className="dt7-hero-right"
              initial={{ opacity: 0, x: 60, filter: "blur(12px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.1, delay: 0.35, ease: EASE_OUT }}
            >
              <motion.div className="dt7-hero-img-wrap" style={{ y: heroParallax }}>
                {/* Availability badge */}
                <div className="dt7-available-badge">
                  <PulseDot size={9} color="white" />
                  Available Today
                </div>

                <div className="dt7-hero-img-frame">
                  <Image
                    src={heroImage || "/images/templates/template-img-26.jpg"}
                    alt="Doctor" fill className="object-cover object-top" priority
                  />
                  <div className="dt7-hero-img-shine" />
                </div>

                {/* Floating stat cards */}
                <motion.div
                  className="dt7-float-card"
                  style={{ bottom: 90, right: -36 }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <p className="dt7-float-card-title">Appointments</p>
                  <p className="dt7-float-card-val">{experience || "30"}+</p>
                  <p className="dt7-float-card-sub">Years of practice</p>
                </motion.div>

                <motion.div
                  className="dt7-float-card"
                  style={{ bottom: 20, left: -28 }}
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <p className="dt7-float-card-title">Success Rate</p>
                  <p className="dt7-float-card-val" style={{ color: "var(--emerald)" }}>99%</p>
                  <p className="dt7-float-card-sub" style={{ color: "var(--teal)" }}>Satisfied patients</p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Curved Divider */}
        <div className="dt7-curve" style={{ background: "var(--cosmos)", marginTop: -2 }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ height: 60 }}>
            <path d="M0,0 L0,60 Q720,0 1440,60 L1440,0 Z" fill="var(--void)" />
          </svg>
        </div>

        {/* ══ ABOUT ══ */}
        <section id="about" className="dt7-section dt7-about-bg">
          <div className="dt7-inner">
            <div className="dt7-about-grid">
              {/* Image */}
              <Reveal dir="left">
                <div className="dt7-about-img-wrap">
                  <div className="dt7-about-img-frame">
                    <Image src={aboutImage || heroImage || "/images/templates/template-img-27.jpg"} alt="About" fill className="object-cover" />
                  </div>
                  <div className="dt7-about-accent">
                    <p className="dt7-about-accent-num">{experience || "30"}+</p>
                    <p className="dt7-about-accent-lbl">Years Expertise</p>
                  </div>
                </div>
              </Reveal>

              {/* Content */}
              <div>
                <Reveal><CyanBadge>{aboutUsTitle || "About the Practice"}</CyanBadge></Reveal>
                <Reveal delay={0.06}>
                  <h2 className="dt7-h2" style={{ color: "var(--white)", margin: "18px 0 18px" }}>
                    Pioneering <em style={{ fontStyle: "italic", color: "var(--cyan)" }}>precision</em><br />in every diagnosis
                  </h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <p style={{ color: "var(--mist)", lineHeight: 1.82, fontSize: 15, marginBottom: 24 }}>
                    {bio || "For three decades we have operated at the intersection of clinical mastery and technological innovation. Our multidisciplinary specialists work in purpose-built care pods, combining AI-assisted imaging with deeply human, patient-first consultations — because exceptional outcomes begin with exceptional attention."}
                  </p>
                </Reveal>
                <Reveal delay={0.12}>
                  <div className="dt7-detail-list">
                    {[
                      { icon: "🎓", label: "Education", val: qualification || education || "MD — Premier Medical University" },
                      { icon: "🏥", label: "Affiliated Hospital", val: hospitalName || displayName },
                      { icon: "🌍", label: "Languages", val: languagesSpoken || "English, Hindi, French" },
                      { icon: "📜", label: "Certifications", val: certifications || "MBBS, MD, FRCS, FACS" },
                    ].map((item) => (
                      <div key={item.label} className="dt7-detail-row">
                        <div className="dt7-detail-icon">{item.icon}</div>
                        <div>
                          <p className="dt7-detail-info-lbl">{item.label}</p>
                          <p className="dt7-detail-info-val">{item.val}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Reveal>
                <Reveal delay={0.15}>
                  <GlowBtn href="#contact">Request Consultation →</GlowBtn>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Curved divider */}
        <div className="dt7-curve" style={{ background: "var(--space)", marginTop: -2 }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ height: 60 }}>
            <path d="M0,60 Q360,0 720,30 Q1080,60 1440,0 L1440,60 Z" fill="var(--cosmos)" />
          </svg>
        </div>

        {/* ══ SERVICES BENTO ══ */}
        <section id="services" className="dt7-section" style={{ background: "var(--space)" }}>
          <div className="dt7-inner">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 52 }}>
              <div>
                <Reveal><CyanBadge>Our Specialties</CyanBadge></Reveal>
                <Reveal delay={0.06}>
                  <h2 className="dt7-h2" style={{ color: "var(--white)", marginTop: 18 }}>
                    Comprehensive<br /><em style={{ color: "var(--cyan)", fontStyle: "italic" }}>Medical Services</em>
                  </h2>
                </Reveal>
              </div>
              <Reveal dir="right">
                <p style={{ color: "var(--mist)", fontSize: 14, lineHeight: 1.75, maxWidth: 300 }}>
                  Every specialty powered by the latest diagnostics and guided by fellowship-trained experts.
                </p>
              </Reveal>
            </div>
            <Stagger className="dt7-bento">
              {displayServices.map((svc, i) => (
                <motion.div
                  key={i}
                  variants={slideUp(i * 0.08)}
                  className={`dt7-bento-card ${svc.span === "2" ? "featured" : ""}`}
                >
                  <span className="dt7-bento-icon">{svc.icon || "🩺"}</span>
                  <h3 className="dt7-bento-title">{svc.title || svc.name}</h3>
                  <p className="dt7-bento-desc">{svc.description || svc.desc || "Expert, personalised care tailored to your unique needs."}</p>
                  <a href="#contact" className="dt7-bento-link">Learn More →</a>
                  <span className="dt7-bento-num">0{i + 1}</span>
                </motion.div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ══ APPOINTMENT CTA ══ */}
        <section className="dt7-section dt7-appt-bg">
          <div className="dt7-inner">
            <Reveal dir="scale">
              <div className="dt7-appt-card">
                <div className="dt7-appt-glow" />
                <div className="dt7-appt-ring" />
                <div className="dt7-appt-ring dt7-appt-ring-2" />
                <CyanBadge>Easy Booking</CyanBadge>
                <h2 className="dt7-appt-title">
                  Ready to take control<br />of your <em style={{ fontStyle: "italic", color: "var(--cyan)" }}>health?</em>
                </h2>
                <p className="dt7-appt-sub">
                  Same-day appointments. Digital intake. Real-time results. Experience healthcare designed around you.
                </p>
                <div className="dt7-appt-ctas">
                  <GlowBtn href="#contact">📅 Book an Appointment</GlowBtn>
                  <GlowBtn href={`tel:${displayPhone}`} variant="teal">📞 Call Us Now</GlowBtn>
                  {whatsappNumber && (
                    <GlowBtn href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`} variant="outline">💬 WhatsApp</GlowBtn>
                  )}
                </div>
                <div className="dt7-schedule-strip">
                  {displaySchedule.map((row, i) => (
                    <div key={i} className="dt7-schedule-pill">
                      <span className="dt7-schedule-day">{row.day}</span>
                      <span style={{ color: "var(--mist)", fontSize: 12 }}>{row.open || row.openingTime} – {row.close || row.closingTime}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ STATS ══ */}
        <section className="dt7-stats-bg">
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <Stagger className="dt7-stats-grid">
              {displayStats.map((s, i) => (
                <motion.div key={i} variants={popIn(i * 0.09)} className="dt7-stat-cell">
                  <p className="dt7-stat-val"><Counter target={s.value} /></p>
                  <p className="dt7-stat-lbl">{s.label}</p>
                  <div className="dt7-stat-bar" />
                </motion.div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ══ WHY CHOOSE ══ */}
        <section className="dt7-section" style={{ background: "var(--cosmos)" }}>
          <div className="dt7-inner">
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <Reveal><CyanBadge>Why Nexus</CyanBadge></Reveal>
              <Reveal delay={0.06}>
                <h2 className="dt7-h2" style={{ color: "var(--white)", marginTop: 18, marginBottom: 14 }}>
                  The Nexus <em style={{ fontStyle: "italic", color: "var(--teal)" }}>Advantage</em>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{ color: "var(--mist)", maxWidth: 440, margin: "0 auto", fontSize: 14, lineHeight: 1.78 }}>
                  Combining frontier technology with the human touch that defines great medicine.
                </p>
              </Reveal>
            </div>
            <Stagger className="dt7-why-grid">
              {displayWhyChoose.map((f, i) => (
                <motion.div key={i} variants={slideUp(i * 0.1)} className="dt7-why-card">
                  <span className="dt7-why-icon">{f.icon || "✦"}</span>
                  <h3 className="dt7-why-title">{f.title || f.featureTitle}</h3>
                  <p className="dt7-why-desc">{f.description || f.featureDescription}</p>
                </motion.div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ══ TESTIMONIALS ══ */}
        <section className="dt7-section" style={{ background: "var(--space)" }}>
          <div className="dt7-inner">
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 64, alignItems: "start" }}>
              <style>{`@media(min-width:1024px){.dt7-ts-2col{grid-template-columns:1fr 1fr !important;}}`}</style>
              <div className="dt7-ts-2col" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 64 }}>
                <div>
                  <Reveal dir="left"><CyanBadge>Patient Stories</CyanBadge></Reveal>
                  <Reveal dir="left" delay={0.06}>
                    <h2 className="dt7-h2" style={{ color: "var(--white)", marginTop: 18, marginBottom: 16 }}>
                      Voices that <em style={{ fontStyle: "italic", color: "var(--cyan)" }}>inspire</em>
                    </h2>
                  </Reveal>
                  <Reveal dir="left" delay={0.1}>
                    <p style={{ color: "var(--mist)", fontSize: 14, lineHeight: 1.78, marginBottom: 32 }}>
                      Real outcomes from the patients who trusted us with what matters most.
                    </p>
                    <TestimonialSlider items={displayTestimonials} />
                  </Reveal>
                </div>

                {/* Team */}
                <div>
                  <Reveal dir="right"><CyanBadge>Our Specialists</CyanBadge></Reveal>
                  <Reveal dir="right" delay={0.06}>
                    <h2 className="dt7-h2" style={{ color: "var(--white)", marginTop: 18, marginBottom: 16 }}>
                      Meet the <em style={{ fontStyle: "italic", color: "var(--teal)" }}>doctors</em>
                    </h2>
                  </Reveal>
                  <Reveal dir="right" delay={0.1}>
                    <div className="dt7-team-grid">
                      {displayTeam.map((doc, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.55, delay: i * 0.09, ease: EASE_EXPO }}
                          className="dt7-team-card"
                        >
                          <div className="dt7-team-img">
                            {doc.image ? (
                              <Image src={doc.image} alt={doc.name || doc.doctorName} fill className="object-cover object-top" />
                            ) : "👨‍⚕️"}
                          </div>
                          <div className="dt7-team-overlay">
                            <div className="dt7-team-cyan-line" />
                            <p className="dt7-team-name">{doc.name || doc.doctorName}</p>
                            <p className="dt7-team-spec">{doc.specialization}</p>
                            <p className="dt7-team-exp">{doc.experience} Exp.</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ TECHNOLOGY ══ */}
        <section className="dt7-section dt7-tech-bg">
          <div className="dt7-inner">
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <Reveal><CyanBadge>Medical Innovation</CyanBadge></Reveal>
              <Reveal delay={0.06}>
                <h2 className="dt7-h2" style={{ color: "var(--white)", marginTop: 18, marginBottom: 14 }}>
                  Technology that <em style={{ fontStyle: "italic", color: "var(--teal)" }}>transforms</em> care
                </h2>
              </Reveal>
            </div>
            <Stagger className="dt7-tech-grid">
              {technologies.map((tech, i) => (
                <motion.div key={i} variants={slideUp(i * 0.1)} className="dt7-tech-card">
                  <div className="dt7-tech-icon-wrap">{tech.icon}</div>
                  <h3 className="dt7-tech-title">{tech.title}</h3>
                  <p className="dt7-tech-desc">{tech.desc}</p>
                </motion.div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ══ EMERGENCY ══ */}
        <section className="dt7-section dt7-emergency-bg">
          <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
            {[200, 400, 600].map((s, i) => (
              <motion.div
                key={i}
                className="dt7-emergency-ring"
                style={{ width: s, height: s, left: "50%", top: "50%", transform: `translate(-50%, -50%)` }}
                animate={{ scale: [1, 1.06, 1], opacity: [0.15, 0.06, 0.15] }}
                transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.8 }}
              />
            ))}
          </div>
          <div className="dt7-inner" style={{ position: "relative", zIndex: 2 }}>
            <div className="dt7-emergency-inner">
              <Reveal>
                <div style={{ fontSize: "3.5rem", marginBottom: 20 }}>🚨</div>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="dt7-h2" style={{ color: "var(--white)", marginBottom: 16 }}>
                  Medical Emergency?<br /><em style={{ fontStyle: "italic", color: "#b794f4" }}>We never sleep.</em>
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p style={{ color: "var(--mist)", fontSize: 15, lineHeight: 1.78, maxWidth: 480, margin: "0 auto 36px" }}>
                  {emergencyAvailability || "Our emergency line connects you to a board-certified clinician within minutes — day or night, 365 days a year."}
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
                  <a href={`tel:${displayEmergency}`} className="dt7-pulse-btn">
                    <span>📞</span> Call {displayEmergency}
                  </a>
                  {ambulanceNumber && (
                    <GlowBtn href={`tel:${ambulanceNumber}`} variant="outline" style={{ borderColor: "rgba(124,58,237,0.4)", color: "#b794f4" }}>
                      🚑 Ambulance
                    </GlowBtn>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══ FAQ ══ */}
        <section className="dt7-section" style={{ background: "var(--space)" }}>
          <div className="dt7-inner">
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 64 }}>
              <style>{`@media(min-width:1024px){.dt7-faq-2col{grid-template-columns:2fr 3fr !important;}}`}</style>
              <div className="dt7-faq-2col" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 64 }}>
                <div>
                  <Reveal dir="left"><CyanBadge>FAQ</CyanBadge></Reveal>
                  <Reveal dir="left" delay={0.06}>
                    <h2 className="dt7-h2" style={{ color: "var(--white)", marginTop: 18, marginBottom: 18 }}>
                      Questions <em style={{ fontStyle: "italic", color: "var(--cyan)" }}>answered</em>
                    </h2>
                  </Reveal>
                  <Reveal dir="left" delay={0.1}>
                    <p style={{ color: "var(--mist)", fontSize: 14, lineHeight: 1.78, marginBottom: 28 }}>
                      Everything you should know before your first visit.
                    </p>
                    <GlowBtn href={`tel:${displayPhone}`} variant="outline">📞 Still have questions?</GlowBtn>
                  </Reveal>
                </div>
                <Stagger>
                  {displayFaqs.map((faq, i) => (
                    <FaqItem key={i} q={faq.question} a={faq.answer} i={i} />
                  ))}
                </Stagger>
              </div>
            </div>
          </div>
        </section>

        {/* ══ INSURANCE ══ */}
        <section className="dt7-section" style={{ background: "var(--cosmos)", borderTop: "1px solid var(--horizon)" }}>
          <div className="dt7-inner">
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <Reveal><CyanBadge>Insurance Partners</CyanBadge></Reveal>
              <Reveal delay={0.06}>
                <h2 className="dt7-h2" style={{ color: "var(--white)", marginTop: 18, marginBottom: 10 }}>
                  Accepted <em style={{ fontStyle: "italic", color: "var(--mist)" }}>Coverage</em>
                </h2>
              </Reveal>
            </div>
            <Stagger className="dt7-ins-grid">
              {displayInsurance.map((ins, i) => (
                <motion.div key={i} variants={popIn(i * 0.05)} className="dt7-ins-card">
                  {ins.logo ? (
                    <div style={{ position: "relative", height: 36, marginBottom: 8 }}>
                      <Image src={ins.logo} alt={ins.name} fill className="object-contain" />
                    </div>
                  ) : <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>🏢</div>}
                  {ins.name}
                </motion.div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ══ BLOG ══ */}
        {enableBlog !== false && (
          <section className="dt7-section" style={{ background: "var(--space)" }}>
            <div className="dt7-inner">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 48 }}>
                <div>
                  <Reveal dir="left"><CyanBadge>{blogSubtitle || "Health Intelligence"}</CyanBadge></Reveal>
                  <Reveal dir="left" delay={0.06}>
                    <h2 className="dt7-h2" style={{ color: "var(--white)", marginTop: 18 }}>
                      {blogSectionTitle || <><em style={{ fontStyle: "italic", color: "var(--cyan)" }}>Insights</em> from our experts</>}
                    </h2>
                  </Reveal>
                </div>
                <Reveal dir="right">
                  <a href="#" style={{ fontSize: 13, fontWeight: 700, color: "var(--cyan)", textDecoration: "none", borderBottom: "1px solid rgba(0,212,255,0.3)", paddingBottom: 2 }}>All articles →</a>
                </Reveal>
              </div>
              <Stagger className="dt7-blog-grid">
                {[
                  { tag: "Cardiology", emoji: "❤️", title: "The Future of AI-Assisted Heart Diagnosis", excerpt: "How neural networks are outperforming traditional ECG interpretation in early-stage arrhythmia detection.", date: "May 2025" },
                  { tag: "Genomics", emoji: "🧬", title: "Precision Medicine: Your DNA, Your Treatment", excerpt: "Personalised drug protocols derived from genetic analysis are achieving outcomes previously thought impossible.", date: "Apr 2025" },
                  { tag: "Wellness", emoji: "🧘", title: "The Neuroscience of Stress Reduction", excerpt: "Evidence-based interventions that rewire your brain's response to chronic pressure — backed by imaging data.", date: "Mar 2025" },
                ].map((post, i) => (
                  <motion.article key={i} variants={slideUp(i * 0.1)} className="dt7-blog-card">
                    <div className="dt7-blog-thumb" style={{ fontSize: "2.5rem" }}>{post.emoji}</div>
                    <div className="dt7-blog-body">
                      <p className="dt7-blog-tag">{post.tag}</p>
                      <h3 className="dt7-blog-title">{post.title}</h3>
                      <p className="dt7-blog-excerpt">{post.excerpt}</p>
                      <p className="dt7-blog-date">✦ {post.date}</p>
                    </div>
                  </motion.article>
                ))}
              </Stagger>
            </div>
          </section>
        )}

        {/* ══ CONTACT ══ */}
        <section id="contact" className="dt7-section dt7-contact-bg">
          <div className="dt7-inner">
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <Reveal><CyanBadge>Get In Touch</CyanBadge></Reveal>
              <Reveal delay={0.06}>
                <h2 className="dt7-h2" style={{ color: "var(--white)", marginTop: 18, marginBottom: 12 }}>
                  Contact <em style={{ fontStyle: "italic", color: "var(--cyan)" }}>& Location</em>
                </h2>
              </Reveal>
            </div>
            <div className="dt7-contact-grid">
              <Stagger style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { icon: "📍", label: "Address", val: displayAddress },
                  { icon: "📞", label: "Phone", val: displayPhone },
                  { icon: "✉️", label: "Email", val: displayEmail },
                  ...(whatsappNumber ? [{ icon: "💬", label: "WhatsApp", val: whatsappNumber }] : []),
                  ...(ambulanceNumber ? [{ icon: "🚑", label: "Ambulance", val: ambulanceNumber }] : []),
                ].map((item, i) => (
                  <motion.div key={i} variants={slideLeft(i * 0.08)} className="dt7-contact-info-card">
                    <div className="dt7-contact-icon">{item.icon}</div>
                    <div style={{ wordBreak: "break-word" }}>
                      <p className="dt7-contact-lbl">{item.label}</p>
                      <p className="dt7-contact-val">{item.val}</p>
                    </div>
                  </motion.div>
                ))}
                {whatsappNumber && (
                  <Reveal>
                    <a
                      href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
                      target="_blank" rel="noopener noreferrer"
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#25d366", color: "#fff", borderRadius: 12, padding: "14px", fontWeight: 700, fontSize: 14, textDecoration: "none" }}
                    >
                      💬 Chat on WhatsApp
                    </a>
                  </Reveal>
                )}
              </Stagger>

              <Reveal dir="right">
                <div className="dt7-map-wrap">
                  {googleMapsEmbed ? (
                    <iframe src={googleMapsEmbed} style={{ width: "100%", height: "100%", minHeight: 360, border: "none" }} allowFullScreen loading="lazy" title="Location" />
                  ) : (
                    <div className="dt7-map-placeholder">
                      <div style={{ fontSize: "3rem", marginBottom: 12 }}>🗺️</div>
                      <p style={{ fontWeight: 600, fontSize: 14 }}>Map will appear here</p>
                      <p style={{ fontSize: 12, marginTop: 4 }}>Add a Google Maps embed link</p>
                    </div>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══ FOOTER ══ */}
        <footer className="dt7-footer">
          <div className="dt7-footer-top">
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div className="dt7-logo-icon">⚕️</div>
                <div>
                  <div className="dt7-logo-name">{displayName}</div>
                  <div className="dt7-logo-sub">{specialty || "Medical Centre"}</div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: "var(--mist)", lineHeight: 1.8, maxWidth: 280 }}>
                Next-generation healthcare delivered with clinical precision and genuine compassion.
              </p>
              <div className="dt7-social-row">
                {["f", "𝕏", "📷", "in"].map((s, i) => (
                  <a key={i} href={socialLinks?.[["facebook", "twitter", "instagram", "linkedin"][i]] || "#"} className="dt7-social-btn">{s}</a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <p className="dt7-footer-heading">Navigation</p>
              {navLinks.map(({ href, label }) => (
                <a key={href} href={href} className="dt7-footer-link">{label}</a>
              ))}
            </div>

            {/* Services */}
            <div>
              <p className="dt7-footer-heading">Specialties</p>
              {displayServices.slice(0, 5).map((s, i) => (
                <a key={i} href="#services" className="dt7-footer-link">{s.title || s.name}</a>
              ))}
            </div>

            {/* Newsletter + Contact */}
            <div>
              <p className="dt7-footer-heading">Stay Connected</p>
              <div className="dt7-footer-newsletter">
                <p style={{ fontSize: 12, color: "var(--mist)", marginBottom: 12, lineHeight: 1.6 }}>Get health insights and clinic updates in your inbox.</p>
                <input type="email" className="dt7-newsletter-input" placeholder="Your email address" />
                <button className="dt7-newsletter-btn">Subscribe →</button>
              </div>
              <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 8 }}>
                <p style={{ fontSize: 13, color: "var(--mist)", display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <span>📍</span><span style={{ lineHeight: 1.5 }}>{displayAddress}</span>
                </p>
                <p style={{ fontSize: 13, color: "var(--mist)", display: "flex", gap: 8 }}>
                  <span>📞</span><span>{displayPhone}</span>
                </p>
              </div>
            </div>
          </div>

          <hr className="dt7-footer-divider" />

          {footerDisclaimer && (
            <div className="dt7-footer-disclaimer">
              <strong style={{ color: "var(--cyan)" }}>Medical Disclaimer: </strong>
              {footerDisclaimer}
            </div>
          )}

          <div className="dt7-footer-bottom">
            <p>{footerCopyright || `© ${new Date().getFullYear()} ${displayName}. All Rights Reserved.`}</p>
            <div style={{ display: "flex", gap: 20 }}>
              <a href="#" style={{ color: "var(--mist)", textDecoration: "none", fontSize: 12 }}>Privacy Policy</a>
              <a href="#" style={{ color: "var(--mist)", textDecoration: "none", fontSize: 12 }}>Terms of Service</a>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}