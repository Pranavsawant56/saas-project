"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion, AnimatePresence, useInView, useScroll, useTransform, useMotionValue, useSpring,
} from "framer-motion";
import Image from "next/image";

/* ═══════════════════════════════════════
   COLOUR PALETTE — Template 4
   • Deep Navy     #0b1628  (primary dark)
   • Rich Navy     #112240  (secondary dark)
   • Electric Teal #00c8b4  (accent primary)
   • Teal Muted    #00917f  (accent dark)
   • Champagne     #c9a84c  (gold accent)
   • Ivory         #faf8f4  (background)
   • Warm White    #ffffff
   • Slate Blue    #4a5980  (text mid)
   • Steel         #8592a8  (text light)
   • Border Light  #e2e8f0
═══════════════════════════════════════ */

/* ─── Easing presets ─── */
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];
const EASE_SPRING = [0.34, 1.56, 0.64, 1];

/* ─── Variants ─── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, delay, ease: EASE_OUT_EXPO } },
});
const fadeLeft = (delay = 0) => ({
  hidden: { opacity: 0, x: -56 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay, ease: EASE_OUT_EXPO } },
});
const fadeRight = (delay = 0) => ({
  hidden: { opacity: 0, x: 56 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay, ease: EASE_OUT_EXPO } },
});
const scaleIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.65, delay, ease: EASE_SPRING } },
});

/* ─── Reveal wrapper ─── */
function Rev({ children, className = "", dir = "up", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const v = dir === "left" ? fadeLeft(delay) : dir === "right" ? fadeRight(delay) : dir === "scale" ? scaleIn(delay) : fadeUp(delay);
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={v} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Stagger container ─── */
function Stagger({ children, className = "", style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"}
      variants={{ visible: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } } }}
      className={className} style={style}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated Counter ─── */
function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const num = parseInt(to?.replace(/\D/g, "") || "0");
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(num / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { setCount(num); clearInterval(timer); }
      else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [inView, num]);
  return <span ref={ref}>{count}{suffix || (to?.replace(/[\d]/g, "") || "")}</span>;
}

/* ─── Pill badge ─── */
function Pill({ children, variant = "teal" }) {
  const styles = {
    teal: { bg: "rgba(0,200,180,0.12)", color: "#00c8b4", border: "1px solid rgba(0,200,180,0.3)" },
    gold: { bg: "rgba(201,168,76,0.12)", color: "#c9a84c", border: "1px solid rgba(201,168,76,0.3)" },
    navy: { bg: "rgba(11,22,40,0.06)", color: "#112240", border: "1px solid rgba(17,34,64,0.15)" },
  };
  const s = styles[variant] || styles.teal;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: s.bg, color: s.color, border: s.border, padding: "5px 14px", borderRadius: 100, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>
      {children}
    </span>
  );
}

/* ─── Section label ─── */
function Label({ children, light = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
      <span style={{ width: 28, height: 2, background: light ? "#00c8b4" : "#00c8b4", borderRadius: 2, flexShrink: 0 }} />
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: light ? "#00c8b4" : "#00917f" }}>{children}</span>
    </div>
  );
}

/* ─── Stars ─── */
function Stars({ n = 5 }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[...Array(5)].map((_, i) => (
        <span key={i} style={{ color: i < n ? "#c9a84c" : "#ddd", fontSize: 13 }}>★</span>
      ))}
    </div>
  );
}

/* ─── Testimonial Carousel ─── */
function TestimonialCarousel({ items }) {
  const [cur, setCur] = useState(0);
  const [dir, setDir] = useState(1);
  const len = items.length;
  const go = useCallback((next) => { setDir(next > cur ? 1 : -1); setCur((next + len) % len); }, [cur, len]);
  useEffect(() => { const t = setInterval(() => go((cur + 1) % len), 5500); return () => clearInterval(t); }, [cur, len, go]);
  const variants = {
    enter: (d) => ({ opacity: 0, x: d * 60, scale: 0.97 }),
    center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
    exit: (d) => ({ opacity: 0, x: -d * 40, transition: { duration: 0.3 } }),
  };
  return (
    <div>
      <div style={{ position: "relative", minHeight: 260 }}>
        <AnimatePresence custom={dir} mode="wait">
          <motion.div key={cur} custom={dir} variants={variants} initial="enter" animate="center" exit="exit"
            style={{ background: "#ffffff", borderRadius: 20, padding: "36px 40px", border: "1px solid #e2e8f0", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 20, right: 28, fontFamily: "Georgia, serif", fontSize: "5rem", color: "rgba(0,200,180,0.12)", lineHeight: 1 }}>"</div>
            <Stars n={items[cur].rating || 5} />
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "#4a5980", fontStyle: "italic", margin: "16px 0 24px", position: "relative" }}>{items[cur].review || items[cur].text}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#00c8b4,#00917f)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 15, color: "#fff", flexShrink: 0, overflow: "hidden", position: "relative" }}>
                {items[cur].image ? <Image src={items[cur].image} alt={items[cur].name || "Patient"} fill className="object-cover" /> : (items[cur].name || "P")[0]}
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 14, color: "#0b1628" }}>{items[cur].name || items[cur].patientName}</p>
                <p style={{ fontSize: 11, color: "#00c8b4", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>Verified Patient</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 20 }}>
        {["‹", "›"].map((ch, idx) => (
          <button key={ch} onClick={() => go(idx === 0 ? cur - 1 : cur + 1)}
            style={{ width: 36, height: 36, borderRadius: "50%", border: "1.5px solid #e2e8f0", background: "#fff", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#4a5980", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#00c8b4"; e.currentTarget.style.color = "#00c8b4"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.color = "#4a5980"; }}>
            {ch}
          </button>
        ))}
        <div style={{ display: "flex", gap: 6, flex: 1 }}>
          {items.map((_, i) => (
            <button key={i} onClick={() => go(i)} style={{ width: i === cur ? 24 : 8, height: 8, borderRadius: 4, background: i === cur ? "#00c8b4" : "#e2e8f0", border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── FAQ Accordion ─── */
function FaqItem({ q, a, i }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div variants={fadeUp(i * 0.06)} style={{ borderBottom: "1px solid #e2e8f0" }}>
      <button onClick={() => setOpen(!open)}
        style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "20px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
        <span style={{ fontWeight: 600, fontSize: 15, color: open ? "#00917f" : "#0b1628", transition: "color 0.2s", lineHeight: 1.4 }}>{q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }}
          style={{ width: 28, height: 28, minWidth: 28, borderRadius: "50%", background: open ? "#00c8b4" : "transparent", border: "1.5px solid", borderColor: open ? "#00c8b4" : "#cbd5e0", color: open ? "#fff" : "#8592a8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, transition: "background 0.25s, color 0.25s" }}>
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: "hidden" }}>
            <p style={{ paddingBottom: 20, fontSize: 14, color: "#8592a8", lineHeight: 1.75 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Magnetic Button ─── */
function MagBtn({ href, children, variant = "primary", style: extStyle = {} }) {
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 25 });
  const sy = useSpring(y, { stiffness: 300, damping: 25 });
  const handle = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.25);
    y.set((e.clientY - r.top - r.height / 2) * 0.25);
  };
  const reset = () => { x.set(0); y.set(0); };
  const base = { display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 30px", borderRadius: 10, fontWeight: 700, fontSize: 14, textDecoration: "none", cursor: "pointer", border: "none", transition: "background 0.25s, transform 0.2s" };
  const variants = {
    primary: { background: "#00c8b4", color: "#0b1628" },
    gold: { background: "#c9a84c", color: "#0b1628" },
    outline: { background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.35)" },
    dark: { background: "#112240", color: "#fff" },
  };
  return (
    <motion.a href={href} style={{ ...base, ...variants[variant], x: sx, y: sy, ...extStyle }}
      onMouseMove={handle} onMouseLeave={reset}
      whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
      {children}
    </motion.a>
  );
}

/* ═══════════════════════════════════════
   MAIN TEMPLATE
═══════════════════════════════════════ */
export default function DoctorTemplate4({ data }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* ── Destructure ── */
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

  const displayPhone = phone ? `${countryCode?.split(" ")[0] || ""}${phone}` : "+1 800 MED CARE";
  const displayEmail = contactEmail || "hello@medpulse.com";
  const displayAddress = address || "100 Health Blvd, New York";
  const displayName = clinicName || "MedPulse";
  const displayEmergency = emergencyContact || displayPhone;

  const defaultServices = [
    { icon: "🫀", title: "Cardiology", description: "Advanced cardiac diagnostics, monitoring, and intervention using leading-edge technology for optimal heart health." },
    { icon: "🧠", title: "Neurology", description: "Comprehensive neurological care for complex conditions with precision imaging and expert clinical teams." },
    { icon: "🦴", title: "Orthopedics", description: "Joint, spine, and muscle care from prevention to surgical rehabilitation." },
    { icon: "👶", title: "Pediatrics", description: "Gentle, expert care for children from newborns through adolescence." },
    { icon: "👁️", title: "Ophthalmology", description: "Full-spectrum vision care including refractive surgery and retinal treatments." },
    { icon: "🩺", title: "Internal Medicine", description: "Holistic management of chronic and complex adult conditions." },
  ];
  const displayServices = services?.length ? services : defaultServices;

  const defaultWhy = [
    { icon: "🏅", title: "Board-Certified Experts", description: "Every specialist carries national accreditation and a decade+ of clinical experience." },
    { icon: "🔬", title: "Advanced Diagnostics", description: "Our labs and imaging suites run 7-Tesla MRI, AI-assisted pathology, and rapid PCR." },
    { icon: "⏰", title: "Always Available", description: "24/7 emergency lines and same-day urgent appointments for your peace of mind." },
    { icon: "💊", title: "Personalised Care", description: "Each treatment plan is built around you — your goals, history, and preferences." },
  ];
  const displayWhy = whyChooseUs?.length ? whyChooseUs : defaultWhy;

  const defaultSchedule = [
    { day: "Monday – Friday", open: "7:30 AM", close: "9:00 PM" },
    { day: "Saturday", open: "8:00 AM", close: "6:00 PM" },
    { day: "Sunday", open: "9:00 AM", close: "3:00 PM" },
  ];
  const displaySchedule = schedule?.length ? schedule : defaultSchedule;

  const defaultStats = [
    { value: "25+", label: "Years of Excellence" },
    { value: "30K+", label: "Patients Served" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "80+", label: "Specialists" },
  ];
  const displayStats = stats?.length ? stats : defaultStats;

  const defaultTestimonials = [
    { name: "Anika Singh", review: "From the moment I walked in, I felt heard and cared for. The diagnosis was thorough and the follow-up was exceptional. Truly world-class care.", rating: 5 },
    { name: "Marcus Hill", review: "After years of misdiagnosis elsewhere, the team here identified my condition in one visit. The professionalism is unmatched.", rating: 5 },
    { name: "Claire Dubois", review: "Beautiful clinic, brilliant doctors, and a team that genuinely cares about your recovery, not just your visit.", rating: 5 },
    { name: "David Osei", review: "Came in for a second opinion and never looked back. The level of detail and care is extraordinary.", rating: 5 },
  ];
  const displayTestimonials = testimonials?.length ? testimonials : defaultTestimonials;

  const defaultTeam = [
    { name: "Dr. Aisha Nkemelu", specialization: "Cardiology", experience: "16 Years", image: null },
    { name: "Dr. Luca Ferretti", specialization: "Neurology", experience: "12 Years", image: null },
    { name: "Dr. Sara Mohsen", specialization: "Pediatrics", experience: "9 Years", image: null },
    { name: "Dr. James Payne", specialization: "Orthopedics", experience: "14 Years", image: null },
  ];
  const displayTeam = teamDoctors?.length ? teamDoctors : defaultTeam;

  const defaultFaqs = [
    { question: "How do I book an appointment?", answer: "You can book via our website 24/7, call our helpline, or walk in during clinic hours. Same-day slots are often available for urgent needs." },
    { question: "Which insurance providers do you accept?", answer: "We accept all major plans including BlueCross, Aetna, Cigna, and UnitedHealth. Call us to confirm your specific plan." },
    { question: "What should I bring for my first visit?", answer: "A valid ID, insurance card, previous records, and a list of current medications. Arriving 10 minutes early helps our team prepare." },
    { question: "Is after-hours emergency care available?", answer: "Yes — our emergency line is active around the clock. You'll always reach a live clinician, not just a voicemail." },
  ];
  const displayFaqs = faqs?.length ? faqs : defaultFaqs;

  const defaultInsurance = [{ name: "BlueCross" }, { name: "Aetna" }, { name: "Cigna" }, { name: "UnitedHealth" }, { name: "Humana" }, { name: "Medicare" }];
  const displayInsurance = insurancePartners?.length ? insurancePartners : defaultInsurance;

  const defaultGallery = [{ caption: "Main Entrance" }, { caption: "Consultation Suite" }, { caption: "Diagnostic Lab" }, { caption: "Surgical Theatre" }, { caption: "Recovery Lounge" }, { caption: "Rooftop Garden" }];
  const displayGallery = gallery?.length ? gallery : defaultGallery;

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#team", label: "Team" },
    { href: "#contact", label: "Contact" },
  ];

  const galleryBg = ["#e1f5ee", "#e6f1fb", "#faeeda", "#f5f0ff", "#faece7", "#eaf3de"];
  const galleryEmoji = ["🏥", "💊", "🔬", "🩺", "🧪", "🛏️"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Nunito+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap');

        :root {
          --navy: #0b1628;
          --navy2: #112240;
          --teal: #00c8b4;
          --teal-d: #00917f;
          --gold: #c9a84c;
          --gold-d: #a07830;
          --ivory: #faf8f4;
          --white: #ffffff;
          --slate: #4a5980;
          --steel: #8592a8;
          --border: #e2e8f0;
          --card: #ffffff;
        }

        .dt4 { font-family: 'Nunito Sans', sans-serif; background: var(--ivory); color: var(--navy); scroll-behavior: smooth; overflow-x: hidden; }
        .dt4-display { font-family: 'Syne', sans-serif; }

        /* Topbar */
        .dt4-topbar { background: var(--navy); color: rgba(255,255,255,0.65); font-size: 12px; padding: 9px 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px; }
        .dt4-topbar-item { display: flex; align-items: center; gap: 7px; }
        .dt4-topbar-dot { width: 5px; height: 5px; background: var(--teal); border-radius: 50%; flex-shrink: 0; }

        /* Navbar */
        .dt4-nav { position: sticky; top: 0; z-index: 50; transition: all 0.35s; }
        .dt4-nav-base { background: rgba(250,248,244,0.92); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); }
        .dt4-nav-scrolled { background: rgba(250,248,244,0.97); backdrop-filter: blur(24px); box-shadow: 0 4px 24px rgba(11,22,40,0.08); }
        .dt4-nav-inner { max-width: 1300px; margin: 0 auto; padding: 14px 24px; display: flex; justify-content: space-between; align-items: center; }
        .dt4-nav-logo { font-family: 'Syne', sans-serif; font-weight: 800; color: var(--navy); font-size: clamp(1.1rem, 2.5vw, 1.3rem); }
        .dt4-nav-logo-dot { color: var(--teal); }
        .dt4-nav-links { display: none; align-items: center; gap: 32px; }
        @media (min-width: 1024px) { .dt4-nav-links { display: flex; } }
        .dt4-nav-link { font-size: 14px; font-weight: 600; color: var(--slate); text-decoration: none; transition: color 0.2s; position: relative; padding-bottom: 2px; }
        .dt4-nav-link::after { content: ""; position: absolute; bottom: -2px; left: 0; width: 0; height: 2px; background: var(--teal); border-radius: 2px; transition: width 0.25s; }
        .dt4-nav-link:hover { color: var(--navy); }
        .dt4-nav-link:hover::after { width: 100%; }
        .dt4-hamburger { display: flex; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 6px; }
        @media (min-width: 1024px) { .dt4-hamburger { display: none; } }
        .dt4-ham-line { width: 22px; height: 2px; background: var(--navy); border-radius: 2px; transition: all 0.2s; }

        /* Mobile menu */
        .dt4-mobile-menu { background: var(--white); border-top: 1px solid var(--border); }
        @media (min-width: 1024px) { .dt4-mobile-menu { display: none !important; } }
        .dt4-mob-link { display: block; font-size: 15px; font-weight: 600; color: var(--navy); text-decoration: none; padding: 12px 24px; border-bottom: 1px solid var(--border); }

        /* ── HERO ── */
        .dt4-hero { background: var(--navy); position: relative; overflow: hidden; min-height: 96vh; display: flex; align-items: center; }
        .dt4-hero-dots { position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(0,200,180,0.12) 1px, transparent 1px); background-size: 36px 36px; pointer-events: none; }
        .dt4-hero-glow { position: absolute; top: -20%; right: -10%; width: 70%; height: 80%; background: radial-gradient(ellipse at center, rgba(0,200,180,0.08) 0%, transparent 70%); pointer-events: none; }
        .dt4-hero-inner { max-width: 1300px; margin: 0 auto; padding: 80px 24px; width: 100%; position: relative; z-index: 2; display: grid; grid-template-columns: 1fr; gap: 40px; align-items: center; }
        @media (min-width: 1024px) { .dt4-hero-inner { grid-template-columns: 55% 45%; padding: 100px 40px; } }
        .dt4-hero-title { font-family: 'Syne', sans-serif; font-size: clamp(2.8rem, 8vw, 5.5rem); font-weight: 800; color: #fff; line-height: 1.0; margin: 16px 0 20px; letter-spacing: -0.02em; }
        .dt4-hero-title-accent { color: var(--teal); display: block; }
        .dt4-hero-sub { font-size: 15px; color: rgba(255,255,255,0.55); line-height: 1.8; max-width: 520px; margin-bottom: 36px; }
        .dt4-hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 52px; }
        .dt4-hero-mini-stats { display: flex; flex-wrap: wrap; gap: 32px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 32px; }
        .dt4-mini-val { font-family: 'Syne', sans-serif; font-size: 2rem; font-weight: 800; color: var(--teal); line-height: 1; }
        .dt4-mini-label { font-size: 11px; color: rgba(255,255,255,0.45); margin-top: 4px; }
        /* Hero image */
        .dt4-hero-img-col { display: none; }
        @media (min-width: 1024px) { .dt4-hero-img-col { display: flex; justify-content: flex-end; } }
        .dt4-hero-frame { position: relative; width: 420px; max-width: 100%; }
        .dt4-hero-img-card { border-radius: 24px 24px 80px 24px; overflow: hidden; aspect-ratio: 3/4; border: 2px solid rgba(0,200,180,0.2); position: relative; }
        .dt4-hero-img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(11,22,40,0.5) 0%, transparent 60%); }
        .dt4-hero-exp-chip { position: absolute; bottom: -20px; left: -20px; background: var(--gold); color: var(--navy); border-radius: 16px; padding: 16px 22px; border: 3px solid var(--navy); z-index: 1; }
        .dt4-hero-exp-val { font-family: 'Syne', sans-serif; font-size: 2.2rem; font-weight: 800; line-height: 1; }
        .dt4-hero-exp-label { font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.7; }
        .dt4-hero-mobile-bg { position: absolute; inset: 0; background-size: cover; background-position: center; }
        .dt4-hero-mobile-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(11,22,40,0.96) 45%, rgba(11,22,40,0.75) 100%); }
        @media (min-width: 1024px) { .dt4-hero-mobile-bg, .dt4-hero-mobile-overlay { display: none; } }

        /* ── Trust band ── */
        .dt4-trust { background: var(--white); border-bottom: 1px solid var(--border); }
        .dt4-trust-inner { max-width: 1300px; margin: 0 auto; padding: 0 24px; display: grid; grid-template-columns: repeat(2, 1fr); }
        @media (min-width: 768px) { .dt4-trust-inner { grid-template-columns: repeat(4, 1fr); } }
        .dt4-trust-cell { padding: 28px 20px; text-align: center; border-right: 1px solid var(--border); border-bottom: 1px solid var(--border); transition: background 0.2s; }
        .dt4-trust-cell:hover { background: #f0fdfb; }
        .dt4-trust-icon { font-size: 1.6rem; margin-bottom: 10px; }
        .dt4-trust-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 13px; color: var(--navy); margin-bottom: 3px; }
        .dt4-trust-sub { font-size: 11px; color: var(--steel); }

        /* ── Section spacing ── */
        .dt4-section { padding: 88px 24px; }
        @media (min-width: 768px) { .dt4-section { padding: 108px 40px; } }
        .dt4-inner { max-width: 1300px; margin: 0 auto; }

        /* ── About ── */
        .dt4-about-grid { display: grid; grid-template-columns: 1fr; gap: 48px; align-items: center; }
        @media (min-width: 1024px) { .dt4-about-grid { grid-template-columns: 1fr 1fr; gap: 80px; } }
        .dt4-about-img-wrap { position: relative; max-width: 460px; margin: 0 auto; }
        .dt4-about-img-bg-el { position: absolute; bottom: -16px; right: -16px; width: 85%; height: 85%; background: rgba(0,200,180,0.08); border-radius: 24px; border: 1px solid rgba(0,200,180,0.2); display: none; }
        @media (min-width: 480px) { .dt4-about-img-bg-el { display: block; } }
        .dt4-about-img { position: relative; border-radius: 24px; overflow: hidden; aspect-ratio: 3/4; border: 3px solid var(--white); box-shadow: 0 30px 80px rgba(11,22,40,0.18); }
        .dt4-about-badge { position: absolute; top: -16px; right: -16px; background: var(--navy); color: #fff; border-radius: 16px; padding: 14px 20px; text-align: center; z-index: 1; border: 2px solid var(--teal); }
        .dt4-about-badge-val { font-family: 'Syne', sans-serif; font-size: 2rem; font-weight: 800; color: var(--teal); line-height: 1; }
        .dt4-about-badge-label { font-size: 9px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-top: 2px; }
        .dt4-info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin: 24px 0; }
        .dt4-info-cell { background: var(--ivory); border: 1px solid var(--border); border-radius: 14px; padding: 14px 16px; display: flex; align-items: flex-start; gap: 10px; transition: border-color 0.2s; }
        .dt4-info-cell:hover { border-color: var(--teal); }
        .dt4-info-label { font-size: 9px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--teal-d); margin-bottom: 3px; }
        .dt4-info-val { font-size: 12px; font-weight: 700; color: var(--navy); }

        /* ── Services ── (dark bg with diagonal slice) */
        .dt4-services-bg { background: var(--navy2); position: relative; }
        .dt4-services-bg::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 80px; background: var(--ivory); clip-path: polygon(0 0, 100% 0, 100% 0, 0 100%); }
        .dt4-services-bg::after { content: ""; position: absolute; bottom: 0; left: 0; right: 0; height: 80px; background: var(--white); clip-path: polygon(0 100%, 100% 0, 100% 100%, 0 100%); }
        .dt4-services-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
        @media (min-width: 640px) { .dt4-services-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .dt4-services-grid { grid-template-columns: repeat(3, 1fr); } }
        .dt4-svc-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); border-radius: 18px; padding: 30px; position: relative; overflow: hidden; transition: all 0.3s; cursor: pointer; }
        .dt4-svc-card::before { content: ""; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(0,200,180,0.07) 0%, transparent 60%); opacity: 0; transition: opacity 0.3s; }
        .dt4-svc-card:hover { border-color: rgba(0,200,180,0.35); transform: translateY(-5px); }
        .dt4-svc-card:hover::before { opacity: 1; }
        .dt4-svc-icon-wrap { width: 54px; height: 54px; background: rgba(0,200,180,0.1); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 18px; font-size: 1.5rem; transition: background 0.3s; }
        .dt4-svc-card:hover .dt4-svc-icon-wrap { background: rgba(0,200,180,0.2); }
        .dt4-svc-num { position: absolute; top: 20px; right: 20px; font-family: 'Syne', sans-serif; font-size: 3rem; font-weight: 800; color: rgba(255,255,255,0.03); line-height: 1; }
        .dt4-svc-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 15px; color: #fff; margin-bottom: 8px; }
        .dt4-svc-desc { font-size: 13px; color: rgba(255,255,255,0.45); line-height: 1.7; }
        .dt4-svc-arrow { margin-top: 14px; font-size: 12px; font-weight: 700; color: var(--teal); opacity: 0; transition: opacity 0.2s, transform 0.2s; display: flex; align-items: center; gap: 4px; }
        .dt4-svc-card:hover .dt4-svc-arrow { opacity: 1; transform: translateX(4px); }

        /* ── Why ── */
        .dt4-why-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        @media (min-width: 1024px) { .dt4-why-grid { grid-template-columns: repeat(4, 1fr); } }
        .dt4-why-card { background: var(--white); border: 1px solid var(--border); border-radius: 18px; padding: 28px 22px; transition: all 0.3s; text-align: center; }
        .dt4-why-card:hover { border-color: var(--teal); transform: translateY(-5px); box-shadow: 0 20px 50px rgba(0,200,180,0.1); }
        .dt4-why-icon { font-size: 2rem; margin-bottom: 14px; }
        .dt4-why-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 14px; color: var(--navy); margin-bottom: 8px; }
        .dt4-why-desc { font-size: 13px; color: var(--steel); line-height: 1.65; }

        /* ── Schedule ── */
        .dt4-sch-row { display: flex; justify-content: space-between; align-items: center; padding: 18px 22px; border-left: 3px solid transparent; background: var(--white); transition: all 0.25s; cursor: default; }
        .dt4-sch-row:hover { border-left-color: var(--teal); background: #f0fdfb; }
        .dt4-sch-day { font-weight: 700; font-size: 14px; color: var(--navy); }
        .dt4-sch-time { display: flex; align-items: center; gap: 10px; font-size: 14px; }
        .dt4-sch-open { font-weight: 800; color: var(--teal-d); font-family: 'Syne', sans-serif; }
        .dt4-sch-close { color: var(--steel); font-weight: 500; }

        /* ── Stats band ── */
        .dt4-stats-band { background: var(--teal); }
        .dt4-stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); }
        @media (min-width: 768px) { .dt4-stats-grid { grid-template-columns: repeat(4, 1fr); } }
        .dt4-stat-cell { padding: 44px 24px; text-align: center; border-right: 1px solid rgba(11,22,40,0.12); border-bottom: 1px solid rgba(11,22,40,0.12); }
        .dt4-stat-cell:nth-child(2n) { border-right: none; }
        @media (min-width: 768px) { .dt4-stat-cell { border-right: 1px solid rgba(11,22,40,0.12); border-bottom: none; } .dt4-stat-cell:last-child { border-right: none; } }
        .dt4-stat-val { font-family: 'Syne', sans-serif; font-size: clamp(2.2rem, 5vw, 3.2rem); font-weight: 800; color: var(--navy); line-height: 1; margin-bottom: 6px; }
        .dt4-stat-label { font-size: 11px; font-weight: 700; color: rgba(11,22,40,0.6); text-transform: uppercase; letter-spacing: 0.14em; }

        /* ── Team ── */
        .dt4-team-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        @media (min-width: 1024px) { .dt4-team-grid { grid-template-columns: repeat(4, 1fr); } }
        .dt4-team-card { background: var(--white); border-radius: 18px; overflow: hidden; border: 1px solid var(--border); transition: all 0.35s; }
        .dt4-team-card:hover { transform: translateY(-6px); box-shadow: 0 24px 60px rgba(11,22,40,0.12); border-color: var(--teal); }
        .dt4-team-img { height: 200px; background: rgba(0,200,180,0.08); position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; font-size: 3rem; transition: transform 0.4s; }
        @media (min-width: 768px) { .dt4-team-img { height: 240px; } }
        .dt4-team-card:hover .dt4-team-img { transform: scale(1.05); }
        .dt4-team-bar { height: 3px; background: linear-gradient(90deg, var(--teal), var(--gold)); }
        .dt4-team-info { padding: 18px; }
        .dt4-team-name { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 14px; color: var(--navy); margin-bottom: 3px; }
        .dt4-team-spec { font-size: 12px; color: var(--teal-d); font-weight: 700; margin-bottom: 4px; }
        .dt4-team-exp { font-size: 11px; color: var(--steel); }

        /* ── Testimonials ── (dark) */
        .dt4-testi-bg { background: var(--navy); }

        /* ── FAQ ── */
        .dt4-faq-grid { display: grid; grid-template-columns: 1fr; gap: 48px; max-width: 880px; margin: 0 auto; }
        @media (min-width: 1024px) { .dt4-faq-grid { grid-template-columns: 5fr 7fr; align-items: start; } }

        /* ── Insurance ── */
        .dt4-ins-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        @media (min-width: 480px) { .dt4-ins-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 768px) { .dt4-ins-grid { grid-template-columns: repeat(6, 1fr); } }
        .dt4-ins-card { background: var(--white); border: 1px solid var(--border); border-radius: 14px; padding: 20px 12px; text-align: center; font-size: 12px; font-weight: 700; color: var(--slate); transition: all 0.2s; }
        .dt4-ins-card:hover { border-color: var(--teal); transform: translateY(-3px); }

        /* ── Gallery ── */
        .dt4-gallery-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
        @media (min-width: 768px) { .dt4-gallery-grid { grid-template-columns: repeat(3, 1fr); } }
        .dt4-gal-item { position: relative; border-radius: 16px; overflow: hidden; aspect-ratio: 1; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; cursor: pointer; transition: transform 0.3s; }
        .dt4-gal-item:hover { transform: scale(1.02); }
        .dt4-gal-item.featured { grid-column: span 2; aspect-ratio: 16/9; }
        @media (min-width: 768px) { .dt4-gal-item.featured { grid-column: span 1; grid-row: span 2; aspect-ratio: auto; } }
        .dt4-gal-overlay { position: absolute; inset: 0; background: rgba(11,22,40,0.55); opacity: 0; transition: opacity 0.3s; display: flex; align-items: flex-end; padding: 14px; }
        .dt4-gal-item:hover .dt4-gal-overlay { opacity: 1; }
        .dt4-gal-caption { color: #fff; font-size: 13px; font-weight: 700; }

        /* ── Blog ── */
        .dt4-blog-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
        @media (min-width: 640px) { .dt4-blog-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .dt4-blog-grid { grid-template-columns: repeat(3, 1fr); } }
        .dt4-blog-card { background: var(--white); border: 1px solid var(--border); border-radius: 18px; overflow: hidden; transition: all 0.3s; cursor: pointer; }
        .dt4-blog-card:hover { transform: translateY(-5px); box-shadow: 0 18px 48px rgba(11,22,40,0.1); border-color: var(--teal); }
        .dt4-blog-thumb { height: 180px; display: flex; align-items: center; justify-content: center; font-size: 3rem; border-bottom: 1px solid var(--border); }
        .dt4-blog-body { padding: 22px; }
        .dt4-blog-title { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; color: var(--navy); margin: 10px 0 8px; line-height: 1.35; }
        .dt4-blog-excerpt { font-size: 13px; color: var(--steel); line-height: 1.65; margin-bottom: 12px; }
        .dt4-blog-date { font-size: 11px; color: var(--steel); }

        /* ── Contact ── */
        .dt4-contact-grid { display: grid; grid-template-columns: 1fr; gap: 32px; }
        @media (min-width: 1024px) { .dt4-contact-grid { grid-template-columns: 1fr 1fr; } }
        .dt4-contact-card { background: var(--white); border: 1px solid var(--border); border-radius: 16px; padding: 18px; display: flex; align-items: center; gap: 14px; transition: all 0.2s; }
        .dt4-contact-card:hover { border-color: var(--teal); background: #f0fdfb; }
        .dt4-contact-icon { width: 46px; height: 46px; background: rgba(0,200,180,0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0; }
        .dt4-contact-label { font-size: 9px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--teal-d); margin-bottom: 3px; }
        .dt4-contact-val { font-weight: 700; font-size: 14px; color: var(--navy); }
        .dt4-emergency-banner { background: var(--navy); border-radius: 18px; padding: 24px 28px; display: flex; flex-direction: column; gap: 16px; margin-bottom: 28px; border: 1px solid rgba(0,200,180,0.2); }
        @media (min-width: 640px) { .dt4-emergency-banner { flex-direction: row; align-items: center; justify-content: space-between; } }
        .dt4-map-frame { border-radius: 18px; overflow: hidden; border: 1px solid var(--border); min-height: 360px; background: rgba(0,200,180,0.05); display: flex; align-items: center; justify-content: center; }
        .dt4-map-placeholder { text-align: center; color: var(--steel); padding: 40px; }

        /* ── Footer ── */
        .dt4-footer { background: var(--navy); color: rgba(255,255,255,0.55); }
        .dt4-footer-top { max-width: 1300px; margin: 0 auto; padding: 72px 24px 48px; display: grid; grid-template-columns: 1fr; gap: 48px; }
        @media (min-width: 640px) { .dt4-footer-top { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .dt4-footer-top { grid-template-columns: 2fr 1fr 1fr 1.5fr; } }
        .dt4-footer-head { font-size: 10px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: var(--teal); margin-bottom: 18px; }
        .dt4-footer-link { display: flex; align-items: center; gap: 6px; font-size: 13px; color: rgba(255,255,255,0.45); text-decoration: none; padding: 5px 0; transition: color 0.2s; }
        .dt4-footer-link:hover { color: var(--teal); }
        .dt4-footer-bottom { border-top: 1px solid rgba(255,255,255,0.06); max-width: 1300px; margin: 0 auto; padding: 20px 24px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px; font-size: 12px; }
        .dt4-social-row { display: flex; gap: 8px; margin-top: 18px; }
        .dt4-social-btn { width: 34px; height: 34px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-size: 12px; color: rgba(255,255,255,0.45); text-decoration: none; transition: all 0.2s; }
        .dt4-social-btn:hover { border-color: var(--teal); color: var(--teal); }
        .dt4-footer-disclaimer { background: rgba(255,255,255,0.03); border-radius: 12px; padding: 16px 20px; font-size: 11px; color: rgba(255,255,255,0.3); line-height: 1.6; border: 1px solid rgba(255,255,255,0.05); margin: 0 24px 0; max-width: calc(1300px - 48px); }
        @media (min-width: 1300px) { .dt4-footer-disclaimer { margin: 0 auto; } }

        /* ── Heading util ── */
        .dt4-h { font-family: 'Syne', sans-serif; font-weight: 800; letter-spacing: -0.02em; color: var(--navy); line-height: 1.05; }
        .dt4-h-xl { font-size: clamp(2rem, 5vw, 3.2rem); margin-bottom: 1rem; }
        .dt4-h-lg { font-size: clamp(1.8rem, 4vw, 2.6rem); margin-bottom: 0.9rem; }
        .dt4-h-light { color: #fff; }

        /* Scroll reveal for cards */
        @keyframes dt4-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      `}</style>

      <div className="dt4">

        {/* ── Topbar ── */}
        <div className="dt4-topbar">
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
            <div className="dt4-topbar-item"><div className="dt4-topbar-dot" />📞 {displayPhone}</div>
            <div className="dt4-topbar-item" style={{ display: "none" }}><div className="dt4-topbar-dot" />✉ {displayEmail}</div>
          </div>
          <div className="dt4-topbar-item"><div className="dt4-topbar-dot" />🕒 {workingHours || "Mon–Sat: 7:30 AM – 9 PM"}</div>
        </div>

        {/* ── Navbar ── */}
        <motion.header
          className={`dt4-nav ${scrolled ? "dt4-nav-scrolled" : "dt4-nav-base"}`}
          initial={{ y: -64, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        >
          <div className="dt4-nav-inner">
            {headerType === "Image" && logoUrl ? (
              <div style={{ position: "relative", width: 120, height: 36 }}><Image src={logoUrl} alt={displayName} fill className="object-contain" /></div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, background: "var(--navy)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", border: "1.5px solid var(--teal)", fontSize: "1rem" }}>⚕</div>
                <div>
                  <span className="dt4-nav-logo" style={{ fontSize: clinicNameFontSize ? `clamp(1.1rem,3vw,${clinicNameFontSize}px)` : undefined }}>
                    {displayName}<span className="dt4-nav-logo-dot">.</span>
                  </span>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--steel)", lineHeight: 1 }}>{specialty || "Medical Centre"}</div>
                </div>
              </div>
            )}

            <nav className="dt4-nav-links">
              {navLinks.map(({ href, label }) => <a key={href} href={href} className="dt4-nav-link">{label}</a>)}
              <MagBtn href="#contact" variant="primary" style={{ padding: "10px 22px", borderRadius: 8, fontFamily: "'Syne',sans-serif" }}>Book Now →</MagBtn>
            </nav>

            <button className="dt4-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              <motion.div animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} className="dt4-ham-line" />
              <motion.div animate={{ opacity: menuOpen ? 0 : 1 }} className="dt4-ham-line" />
              <motion.div animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} className="dt4-ham-line" />
            </button>
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="dt4-mobile-menu overflow-hidden">
                {navLinks.map(({ href, label }) => <a key={href} href={href} className="dt4-mob-link" onClick={() => setMenuOpen(false)}>{label}</a>)}
                <div style={{ padding: "12px 24px 20px" }}><MagBtn href="#contact" variant="primary" style={{ width: "100%", justifyContent: "center" }}>Book Appointment →</MagBtn></div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        {/* ══ HERO ══ */}
        <section id="home" ref={heroRef} className="dt4-hero">
          <div className="dt4-hero-dots" />
          <div className="dt4-hero-glow" />
          <div className="dt4-hero-mobile-bg" style={{ backgroundImage: `url(${heroImage || "/images/templates/template-img-26.jpg"})` }} />
          <div className="dt4-hero-mobile-overlay" />

          <div className="dt4-hero-inner">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                <Pill variant="teal">◆ {specialty || "Advanced Medical Care"}</Pill>
              </motion.div>

              <motion.h1 className="dt4-hero-title"
                initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.35, ease: EASE_OUT_EXPO }}
                style={{ fontSize: heroTitleFontSize ? `clamp(2.8rem,8vw,${heroTitleFontSize}px)` : undefined }}>
                {heroTitle ? heroTitle : (<>Your Health.<span className="dt4-hero-title-accent">Our Mission.</span>Always.</>)}
              </motion.h1>

              <motion.div initial={{ width: 0 }} animate={{ width: 60 }} transition={{ duration: 0.7, delay: 0.65 }}
                style={{ height: 3, background: "linear-gradient(90deg,#00c8b4,#c9a84c)", borderRadius: 2, marginBottom: 20 }} />

              <motion.p className="dt4-hero-sub" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.7 }}>
                {tagline && <strong style={{ display: "block", color: "#fff", marginBottom: 6 }}>{tagline}</strong>}
                {heroDescription || "World-class diagnostics, expert specialists, and compassionate care — all under one roof. Because you deserve nothing less."}
              </motion.p>

              <motion.div className="dt4-hero-actions" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, delay: 0.8 }}>
                <MagBtn href="#contact" variant="primary">📅 Book Appointment</MagBtn>
                <MagBtn href={`tel:${displayEmergency}`} variant="outline">🚨 Emergency</MagBtn>
              </motion.div>

              <motion.div className="dt4-hero-mini-stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1 }}>
                {[["25+", "Years"], ["30K+", "Patients"], ["98%", "Satisfaction"]].map(([v, l]) => (
                  <div key={l}><p className="dt4-mini-val">{v}</p><p className="dt4-mini-label">{l}</p></div>
                ))}
              </motion.div>
            </div>

            <motion.div className="dt4-hero-img-col" initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3, ease: EASE_OUT_EXPO }}>
              <div className="dt4-hero-frame">
                <motion.div style={{ y: parallaxY }}>
                  <div className="dt4-hero-img-card">
                    <Image src={heroImage || "/images/templates/template-img-26.jpg"} alt="Doctor" fill className="object-cover object-top" priority />
                    <div className="dt4-hero-img-overlay" />
                  </div>
                  <div className="dt4-hero-exp-chip">
                    <p className="dt4-hero-exp-val">{experience || "25"}+</p>
                    <p className="dt4-hero-exp-label">Years of<br />Excellence</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Trust Strip ── */}
        <section className="dt4-trust">
          <Stagger className="dt4-trust-inner">
            {[{ icon: "🏅", title: "Board-Certified", sub: "Nationally accredited" }, { icon: "🚑", title: "24/7 Emergency", sub: "Always available" }, { icon: "🔬", title: "Advanced Diagnostics", sub: "AI-assisted imaging" }, { icon: "💙", title: "30K+ Patients", sub: "Trusted annually" }].map((item) => (
              <motion.div key={item.title} variants={scaleIn()} className="dt4-trust-cell">
                <div className="dt4-trust-icon">{item.icon}</div>
                <p className="dt4-trust-title">{item.title}</p>
                <p className="dt4-trust-sub">{item.sub}</p>
              </motion.div>
            ))}
          </Stagger>
        </section>

        {/* ══ ABOUT ══ */}
        <section id="about" className="dt4-section" style={{ background: "var(--ivory)" }}>
          <div className="dt4-inner">
            <div className="dt4-about-grid">
              <Rev dir="left">
                <div className="dt4-about-img-wrap">
                  <div className="dt4-about-img-bg-el" />
                  <div className="dt4-about-img">
                    <Image src={aboutImage || "/images/templates/template-img-27.jpg"} alt="About" fill className="object-cover" />
                  </div>
                  <div className="dt4-about-badge">
                    <p className="dt4-about-badge-val">{experience || "25"}+</p>
                    <p className="dt4-about-badge-label">Years Exp.</p>
                  </div>
                </div>
              </Rev>

              <Rev dir="right" delay={0.1}>
                <Label>{aboutUsTitle || "About The Doctor"}</Label>
                <h2 className="dt4-h dt4-h-xl">Evidence-Based Care for Every Stage of Life</h2>
                <p style={{ color: "var(--steel)", lineHeight: 1.8, fontSize: 15, marginBottom: 24 }}>
                  {bio || "We blend decades of clinical mastery with genuine human empathy. Every patient receives a personalised care plan rooted in the latest evidence — delivered by a team that truly cares about your outcome."}
                </p>
                <div className="dt4-info-grid">
                  {[{ icon: "🎓", label: "Education", val: qualification || education || "MD – Medical University" }, { icon: "🏥", label: "Hospital", val: hospitalName || displayName }, { icon: "🌐", label: "Languages", val: languagesSpoken || "English, Hindi" }, { icon: "📜", label: "Certifications", val: certifications || "MBBS, MD, FRCP" }].map((item) => (
                    <div key={item.label} className="dt4-info-cell">
                      <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{item.icon}</span>
                      <div><p className="dt4-info-label">{item.label}</p><p className="dt4-info-val">{item.val}</p></div>
                    </div>
                  ))}
                </div>
                <MagBtn href="#contact" variant="dark">Get a Consultation →</MagBtn>
              </Rev>
            </div>
          </div>
        </section>

        {/* ══ SERVICES ══ */}
        <section id="services" className="dt4-section dt4-services-bg" style={{ paddingTop: 120, paddingBottom: 120 }}>
          <div className="dt4-inner" style={{ position: "relative", zIndex: 2 }}>
            <div style={{ maxWidth: 600, marginBottom: 52 }}>
              <Rev><Label light>Our Specialties</Label></Rev>
              <Rev delay={0.05}><h2 className="dt4-h dt4-h-xl dt4-h-light">World-Class Care Across Every Discipline</h2></Rev>
              <Rev delay={0.1}><p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, lineHeight: 1.75 }}>Expert treatment across a comprehensive range of specialties — all under one trusted roof.</p></Rev>
            </div>
            <Stagger className="dt4-services-grid">
              {displayServices.map((svc, i) => (
                <motion.div key={i} variants={fadeUp(i * 0.07)} className="dt4-svc-card">
                  <div className="dt4-svc-icon-wrap">
                    {svc.image ? <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 14, overflow: "hidden" }}><Image src={svc.image} alt={svc.title || svc.name} fill className="object-cover" /></div>
                      : <span>{svc.icon || "🩺"}</span>}
                  </div>
                  <div className="dt4-svc-num">0{i + 1}</div>
                  <h3 className="dt4-svc-title">{svc.title || svc.name}</h3>
                  <p className="dt4-svc-desc">{svc.description || svc.desc || "Expert personalised care."}</p>
                  <div className="dt4-svc-arrow">Learn more →</div>
                </motion.div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ══ WHY CHOOSE US ══ */}
        <section className="dt4-section" style={{ background: "var(--white)" }}>
          <div className="dt4-inner">
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <Rev><Label children="Why Choose Us" /></Rev>
              <Rev delay={0.05}><h2 className="dt4-h dt4-h-xl" style={{ textAlign: "center" }}>Why Patients Trust Us</h2></Rev>
              <Rev delay={0.1}><p style={{ color: "var(--steel)", maxWidth: 500, margin: "0 auto", fontSize: 14, lineHeight: 1.75 }}>World-class expertise paired with genuine, unhurried care for every individual.</p></Rev>
            </div>
            <Stagger className="dt4-why-grid">
              {displayWhy.map((f, i) => (
                <motion.div key={i} variants={fadeUp(i * 0.08)} className="dt4-why-card">
                  <div className="dt4-why-icon">{f.icon || "✦"}</div>
                  <h3 className="dt4-why-title">{f.title || f.featureTitle}</h3>
                  <p className="dt4-why-desc">{f.description || f.featureDescription}</p>
                </motion.div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ══ SCHEDULE ══ */}
        <section className="dt4-section" style={{ background: "var(--ivory)" }}>
          <div className="dt4-inner">
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 48 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 48 }}>
                <div style={{ maxWidth: 420 }}>
                  <Rev dir="left"><Label>Clinic Hours</Label></Rev>
                  <Rev dir="left" delay={0.05}><h2 className="dt4-h dt4-h-lg">When We're Here for You</h2></Rev>
                  <Rev dir="left" delay={0.1}>
                    <p style={{ color: "var(--steel)", fontSize: 14, lineHeight: 1.75, marginBottom: 24 }}>Appointments or walk-ins — we're ready whenever you need us most.</p>
                    <MagBtn href="#contact" variant="primary">Reserve a Slot →</MagBtn>
                  </Rev>
                </div>
                <Rev dir="right">
                  <Stagger style={{ borderRadius: 18, overflow: "hidden", border: "1px solid var(--border)" }}>
                    {displaySchedule.map((row, i) => (
                      <motion.div key={i} variants={fadeLeft(i * 0.07)} className="dt4-sch-row">
                        <span className="dt4-sch-day">{row.day}</span>
                        <div className="dt4-sch-time">
                          <span className="dt4-sch-open">{row.open || row.openingTime}</span>
                          <span style={{ color: "var(--border)" }}>—</span>
                          <span className="dt4-sch-close">{row.close || row.closingTime}</span>
                        </div>
                      </motion.div>
                    ))}
                  </Stagger>
                </Rev>
              </div>
            </div>
          </div>
        </section>

        {/* ══ STATS BAND ══ */}
        <section className="dt4-stats-band">
          <div style={{ maxWidth: 1300, margin: "0 auto" }}>
            <Stagger className="dt4-stats-grid">
              {displayStats.map((s, i) => (
                <motion.div key={i} variants={scaleIn(i * 0.09)} className="dt4-stat-cell">
                  <p className="dt4-stat-val"><Counter to={s.value} /></p>
                  <p className="dt4-stat-label">{s.label}</p>
                </motion.div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ══ TESTIMONIALS ══ */}
        <section className="dt4-section dt4-testi-bg">
          <div className="dt4-inner">
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 56, alignItems: "center" }}>
              <div>
                <Rev dir="left"><Label light>Patient Stories</Label></Rev>
                <Rev dir="left" delay={0.05}><h2 className="dt4-h dt4-h-xl dt4-h-light">What Our Patients Say</h2></Rev>
                <Rev dir="left" delay={0.1}>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, lineHeight: 1.75, marginBottom: 20 }}>Real words from real people whose health we're proud to support.</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {[1, 2, 3].map((n) => (<div key={n} style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--teal-d)", border: "2px solid var(--navy)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", marginLeft: n > 1 ? -10 : 0 }}>P{n}</div>))}
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginLeft: 10 }}>3,200+ verified reviews</span>
                  </div>
                </Rev>
              </div>
              <Rev dir="right"><TestimonialCarousel items={displayTestimonials} /></Rev>
            </div>
          </div>
        </section>

        {/* ══ TEAM ══ */}
        <section id="team" className="dt4-section" style={{ background: "var(--ivory)" }}>
          <div className="dt4-inner">
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <Rev><Label>Our Specialists</Label></Rev>
              <Rev delay={0.05}><h2 className="dt4-h dt4-h-xl" style={{ textAlign: "center" }}>Meet Our Doctors</h2></Rev>
            </div>
            <Stagger className="dt4-team-grid">
              {displayTeam.map((doc, i) => (
                <motion.div key={i} variants={fadeUp(i * 0.1)} className="dt4-team-card">
                  <div className="dt4-team-img">
                    {doc.image ? <Image src={doc.image} alt={doc.name || doc.doctorName} fill className="object-cover object-top" /> : "👨‍⚕️"}
                  </div>
                  <div className="dt4-team-bar" />
                  <div className="dt4-team-info">
                    <p className="dt4-team-name">{doc.name || doc.doctorName}</p>
                    <p className="dt4-team-spec">{doc.specialization}</p>
                    <p className="dt4-team-exp">{doc.experience} Experience</p>
                  </div>
                </motion.div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ══ FAQ ══ */}
        <section className="dt4-section" style={{ background: "var(--white)" }}>
          <div className="dt4-inner">
            <div className="dt4-faq-grid">
              <div>
                <Rev dir="left"><Label>FAQ</Label></Rev>
                <Rev dir="left" delay={0.05}><h2 className="dt4-h dt4-h-lg">Common Questions</h2></Rev>
                <Rev dir="left" delay={0.1}>
                  <p style={{ color: "var(--steel)", fontSize: 14, lineHeight: 1.75, marginBottom: 24 }}>Can't find your answer? Our care team is happy to help.</p>
                  <MagBtn href={`tel:${displayPhone}`} variant="primary">📞 Call Us</MagBtn>
                </Rev>
              </div>
              <Stagger>
                {displayFaqs.map((faq, i) => <FaqItem key={i} q={faq.question} a={faq.answer} i={i} />)}
              </Stagger>
            </div>
          </div>
        </section>

        {/* ══ INSURANCE ══ */}
        <section className="dt4-section" style={{ background: "var(--ivory)", borderTop: "1px solid var(--border)" }}>
          <div className="dt4-inner">
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <Rev><Label>Partners</Label></Rev>
              <Rev delay={0.05}><h2 className="dt4-h dt4-h-lg" style={{ textAlign: "center" }}>Accepted Insurance Plans</h2></Rev>
            </div>
            <Stagger className="dt4-ins-grid">
              {displayInsurance.map((ins, i) => (
                <motion.div key={i} variants={scaleIn(i * 0.05)} className="dt4-ins-card">
                  {ins.logo ? (<div style={{ position: "relative", height: 36, marginBottom: 6 }}><Image src={ins.logo} alt={ins.name} fill className="object-contain" /></div>) : <div style={{ fontSize: "1.4rem", marginBottom: 6 }}>🏢</div>}
                  {ins.name}
                </motion.div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ══ BLOG ══ */}
        {enableBlog !== false && (
          <section className="dt4-section" style={{ background: "var(--white)" }}>
            <div className="dt4-inner">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 44, flexWrap: "wrap", gap: 16 }}>
                <div>
                  <Rev dir="left"><Label>{blogSubtitle || "Health Insights"}</Label></Rev>
                  <Rev dir="left" delay={0.05}><h2 className="dt4-h dt4-h-lg">{blogSectionTitle || "Latest Articles"}</h2></Rev>
                </div>
                <Rev dir="right"><a href="#" style={{ fontSize: 13, fontWeight: 700, color: "var(--teal-d)", textDecoration: "none", borderBottom: "1.5px solid var(--teal)", paddingBottom: 2 }}>All articles →</a></Rev>
              </div>
              <Stagger className="dt4-blog-grid">
                {[{ tag: "Cardiology", emoji: "❤️", bg: "#fff0f0", title: "10 Daily Habits for a Healthier Heart", excerpt: "Simple evidence-based choices that dramatically cut your cardiovascular risk over time.", date: "May 2025" }, { tag: "Nutrition", emoji: "🥗", bg: "#f0fff8", title: "Anti-Inflammatory Foods Worth Eating Daily", excerpt: "How specific dietary choices actively reduce systemic inflammation and protect longevity.", date: "Apr 2025" }, { tag: "Mental Health", emoji: "🧘", bg: "#f8f0ff", title: "Managing Modern Stress Effectively", excerpt: "Evidence-based tools for maintaining mental balance in a fast, demanding world.", date: "Mar 2025" }].map((post, i) => (
                  <motion.article key={i} variants={fadeUp(i * 0.1)} className="dt4-blog-card">
                    <div className="dt4-blog-thumb" style={{ background: post.bg }}><span style={{ fontSize: "2.5rem" }}>{post.emoji}</span></div>
                    <div className="dt4-blog-body">
                      <Pill variant="teal">{post.tag}</Pill>
                      <h3 className="dt4-blog-title">{post.title}</h3>
                      <p className="dt4-blog-excerpt">{post.excerpt}</p>
                      <p className="dt4-blog-date">{post.date}</p>
                    </div>
                  </motion.article>
                ))}
              </Stagger>
            </div>
          </section>
        )}

        {/* ══ GALLERY ══ */}
        <section className="dt4-section" style={{ background: "var(--navy)" }}>
          <div className="dt4-inner">
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <Rev><Label light>Our Facilities</Label></Rev>
              <Rev delay={0.05}><h2 className="dt4-h dt4-h-xl dt4-h-light" style={{ textAlign: "center" }}>Clinic Gallery</h2></Rev>
            </div>
            <Stagger className="dt4-gallery-grid">
              {displayGallery.map((item, i) => (
                <motion.div key={i} variants={scaleIn(i * 0.07)} className={`dt4-gal-item ${i === 0 ? "featured" : ""}`} style={{ background: galleryBg[i % 6] }}>
                  {item.image ? <Image src={item.image} alt={item.caption || `Gallery ${i + 1}`} fill className="object-cover" /> : <span style={{ fontSize: "2.5rem" }}>{galleryEmoji[i % 6]}</span>}
                  <div className="dt4-gal-overlay"><p className="dt4-gal-caption">{item.caption || `Facility ${i + 1}`}</p></div>
                </motion.div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ══ CONTACT ══ */}
        <section id="contact" className="dt4-section" style={{ background: "var(--ivory)" }}>
          <div className="dt4-inner">
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <Rev><Label>Get In Touch</Label></Rev>
              <Rev delay={0.05}><h2 className="dt4-h dt4-h-xl" style={{ textAlign: "center" }}>Contact & Location</h2></Rev>
            </div>

            <Rev>
              <div className="dt4-emergency-banner">
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ fontSize: "1.6rem" }}>🚨</span>
                  <div>
                    <p style={{ fontWeight: 700, color: "var(--teal)", fontSize: 14 }}>Emergency? We're available 24/7</p>
                    <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>{emergencyAvailability || "Immediate response for all medical emergencies"}</p>
                  </div>
                </div>
                <MagBtn href={`tel:${displayEmergency}`} variant="primary" style={{ flexShrink: 0, whiteSpace: "nowrap" }}>Call {displayEmergency}</MagBtn>
              </div>
            </Rev>

            <div className="dt4-contact-grid">
              <Stagger style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { icon: "📍", label: "Address", val: displayAddress },
                  { icon: "📞", label: "Phone", val: displayPhone },
                  { icon: "✉️", label: "Email", val: displayEmail, isEmail: true },
                  ...(whatsappNumber ? [{ icon: "💬", label: "WhatsApp", val: whatsappNumber }] : []),
                  ...(ambulanceNumber ? [{ icon: "🚑", label: "Ambulance", val: ambulanceNumber }] : []),
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeLeft(i * 0.07)} className="dt4-contact-card">
                    <div className="dt4-contact-icon">{item.icon}</div>
                    <div style={item.isEmail ? { wordBreak: "break-all" } : {}}>
                      <p className="dt4-contact-label">{item.label}</p>
                      <p className="dt4-contact-val">{item.val}</p>
                    </div>
                  </motion.div>
                ))}
                {whatsappNumber && (
                  <Rev>
                    <a href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#25d366", color: "#fff", borderRadius: 14, padding: 14, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
                      💬 Chat on WhatsApp
                    </a>
                  </Rev>
                )}
              </Stagger>

              <Rev dir="right">
                <div className="dt4-map-frame">
                  {googleMapsEmbed ? (
                    <iframe src={googleMapsEmbed} style={{ width: "100%", height: "100%", minHeight: 360, border: "none" }} allowFullScreen loading="lazy" title="Location" />
                  ) : (
                    <div className="dt4-map-placeholder">
                      <div style={{ fontSize: "3rem", marginBottom: 14 }}>🗺️</div>
                      <p style={{ fontWeight: 700, fontSize: 14, color: "var(--navy)" }}>Map will appear here</p>
                      <p style={{ fontSize: 12, marginTop: 4 }}>Add a Google Maps embed link in your editor</p>
                    </div>
                  )}
                </div>
              </Rev>
            </div>
          </div>
        </section>

        {/* ══ FOOTER ══ */}
        <footer className="dt4-footer">
          <div className="dt4-footer-top">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 36, height: 36, background: "var(--teal)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>⚕</div>
                <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, color: "#fff", fontSize: "1.2rem" }}>{displayName}<span style={{ color: "var(--teal)" }}>.</span></span>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 280 }}>Delivering exceptional medical care with compassion, expertise, and dedication.</p>
              <div className="dt4-social-row">
                {["f", "𝕏", "📷", "in"].map((s, i) => (
                  <a key={i} href={socialLinks?.[["facebook", "twitter", "instagram", "linkedin"][i]] || "#"} className="dt4-social-btn">{s}</a>
                ))}
              </div>
            </div>

            <div>
              <p className="dt4-footer-head">Quick Links</p>
              {navLinks.map(({ href, label }) => <a key={href} href={href} className="dt4-footer-link">{label}</a>)}
            </div>

            <div>
              <p className="dt4-footer-head">Services</p>
              {displayServices.slice(0, 5).map((s, i) => <a key={i} href="#services" className="dt4-footer-link">{s.title || s.name}</a>)}
            </div>

            <div>
              <p className="dt4-footer-head">Contact Us</p>
              <p style={{ display: "flex", gap: 8, fontSize: 13, marginBottom: 10, alignItems: "flex-start" }}>
                <span style={{ flexShrink: 0 }}>📍</span><span style={{ lineHeight: 1.5 }}>{displayAddress}</span>
              </p>
              <p style={{ display: "flex", gap: 8, fontSize: 13, marginBottom: 10 }}>📞 {displayPhone}</p>
              <p style={{ display: "flex", gap: 8, fontSize: 13, wordBreak: "break-all" }}>✉ {displayEmail}</p>
              {emergencyAvailability && <p style={{ display: "flex", gap: 8, fontSize: 13, color: "var(--teal)", marginTop: 10 }}>🚨 {emergencyAvailability}</p>}
            </div>
          </div>

          {footerDisclaimer && (
            <div className="dt4-footer-disclaimer">
              <strong style={{ color: "var(--teal)" }}>Medical Disclaimer: </strong>{footerDisclaimer}
            </div>
          )}

          <div className="dt4-footer-bottom">
            <p>{footerCopyright || `© ${new Date().getFullYear()} ${displayName}. All Rights Reserved.`}</p>
            <div style={{ display: "flex", gap: 20 }}>
              <a href="#" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 0.2s" }}>Privacy Policy</a>
              <a href="#" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 0.2s" }}>Terms of Service</a>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}