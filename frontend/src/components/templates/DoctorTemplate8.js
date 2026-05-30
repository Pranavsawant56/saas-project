"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";

/*
 ╔══════════════════════════════════════════╗
 ║   DOCTOR TEMPLATE 8 — "MERIDIAN"        ║
 ║   Palette: Deep Slate + Clinical Teal   ║
 ║   Aesthetic: Modern Clinical Editorial  ║
 ╚══════════════════════════════════════════╝

  --slate-950   #0a0f1a   (richest dark)
  --slate-900   #0f1624   (base bg)
  --slate-800   #18243a   (surface)
  --slate-700   #243354   (elevated)
  --slate-600   #2e4270   (border)
  --teal        #0ea5a0   (primary accent)
  --teal-light  #2dd4bf   (hover)
  --teal-pale   #ccfbf1   (tint)
  --teal-dim    #0d6e69   (muted)
  --mint        #f0fdfa   (light bg)
  --white       #ffffff
  --pearl       #f8fffe
  --text-slate  #334155
  --text-muted  #64748b
*/

/* ─── Easing ─── */
const EASE_OUT = [0.16, 1, 0.3, 1];
const EASE_EXPO = [0.22, 1, 0.36, 1];
const SPRING = { type: "spring", stiffness: 220, damping: 26 };

/* ─── Left-to-Right entrance variants ─── */
const fromLeft = (delay = 0) => ({
  hidden: { opacity: 0, x: -64 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.72, delay, ease: EASE_OUT } },
});
const fromRight = (delay = 0) => ({
  hidden: { opacity: 0, x: 64 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.72, delay, ease: EASE_OUT } },
});
const fromBottom = (delay = 0) => ({
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.68, delay, ease: EASE_OUT } },
});
const scaleUp = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay, ease: EASE_EXPO } },
});
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

/* ─── Reveal Wrapper ─── */
function Reveal({ children, className = "", dir = "left", delay = 0, once = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-72px" });
  const v =
    dir === "right" ? fromRight(delay)
      : dir === "up" ? fromBottom(delay)
        : dir === "scale" ? scaleUp(delay)
          : fromLeft(delay);
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={v} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Stagger ─── */
function Stagger({ children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Teal Label ─── */
function TealLabel({ children }) {
  return (
    <div className="dt8-label">
      <span className="dt8-label-dash" />
      <span className="dt8-label-text">{children}</span>
    </div>
  );
}

/* ─── Animated Counter ─── */
function Counter({ target }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const num = parseInt(target.replace(/\D/g, "")) || 0;
    let c = 0;
    const step = Math.ceil(num / 55);
    const t = setInterval(() => {
      c += step;
      if (c >= num) { setCount(num); clearInterval(t); } else setCount(c);
    }, 24);
    return () => clearInterval(t);
  }, [inView, target]);
  const suffix = target.replace(/[\d]/g, "");
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Auto Testimonial Carousel ─── */
function TestimonialCarousel({ items }) {
  const [cur, setCur] = useState(0);
  const len = items.length;
  const go = useCallback((n) => setCur(((n % len) + len) % len), [len]);
  useEffect(() => { const t = setInterval(() => go(cur + 1), 5000); return () => clearInterval(t); }, [cur, go]);
  return (
    <div className="dt8-tcarousel">
      <AnimatePresence mode="wait">
        <motion.div
          key={cur}
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 60 }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
          className="dt8-tcard"
        >
          <div className="dt8-tcard-bar" />
          <p className="dt8-ttext">"{items[cur].review || items[cur].text}"</p>
          <div className="dt8-tfooter">
            <div className="dt8-tavatar">
              {(items[cur].name || "P")[0]}
            </div>
            <div>
              <p className="dt8-tname">{items[cur].name || items[cur].patientName}</p>
              <p className="dt8-trole">Verified Patient</p>
            </div>
            <div className="dt8-trating">
              {"★".repeat(items[cur].rating || 5)}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="dt8-tdots">
        {items.map((_, i) => (
          <button key={i} onClick={() => go(i)} className={`dt8-tdot ${i === cur ? "active" : ""}`} />
        ))}
      </div>
    </div>
  );
}

/* ─── Auto Service Carousel ─── */
function ServiceSlider({ items }) {
  const [cur, setCur] = useState(0);
  const len = items.length;
  const go = useCallback((n) => setCur(((n % len) + len) % len), [len]);
  useEffect(() => { const t = setInterval(() => go(cur + 1), 4200); return () => clearInterval(t); }, [cur, go]);
  return (
    <div className="dt8-svc-slider">
      {/* Left strip tabs */}
      <div className="dt8-svc-nav">
        {items.map((s, i) => (
          <button
            key={i}
            className={`dt8-svc-navbtn ${i === cur ? "active" : ""}`}
            onClick={() => { setCur(i); }}
          >
            <span className="dt8-svc-nav-icon">{s.icon || "🩺"}</span>
            <span className="dt8-svc-nav-label">{s.title || s.name}</span>
            {i === cur && <motion.div className="dt8-svc-nav-indicator" layoutId="svc-indicator" />}
          </button>
        ))}
      </div>
      {/* Panel */}
      <div className="dt8-svc-panel">
        <AnimatePresence mode="wait">
          <motion.div
            key={cur}
            initial={{ opacity: 0, x: -48 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 48 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
            className="dt8-svc-content"
          >
            <div className="dt8-svc-big-icon">{items[cur].icon || "🩺"}</div>
            <div className="dt8-svc-idx">0{cur + 1}</div>
            <h3 className="dt8-svc-title">{items[cur].title || items[cur].name}</h3>
            <p className="dt8-svc-desc">{items[cur].description || items[cur].desc || "Expert personalised care tailored to your unique health needs."}</p>
            <a href="#contact" className="dt8-btn-teal">Book Consultation →</a>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── FAQ ─── */
function FaqItem({ q, a, i }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div variants={fromLeft(i * 0.07)} className={`dt8-faq-item ${open ? "open" : ""}`}>
      <button className="dt8-faq-q" onClick={() => setOpen(!open)}>
        <span className="dt8-faq-num">0{i + 1}</span>
        <span className="dt8-faq-qtext">{q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} className="dt8-faq-icon">+</motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            <p className="dt8-faq-a">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Team Auto Scroll ─── */
function TeamScroller({ doctors }) {
  const [offset, setOffset] = useState(0);
  const len = doctors.length;
  useEffect(() => {
    const t = setInterval(() => setOffset((o) => o + 1), 3200);
    return () => clearInterval(t);
  }, []);
  const cur = offset % len;
  return (
    <div className="dt8-team-scroller">
      {doctors.map((doc, i) => {
        const pos = ((i - cur + len) % len);
        const isActive = pos === 0;
        const isSide = pos === 1 || pos === len - 1;
        return (
          <motion.div
            key={i}
            className="dt8-team-card"
            animate={{
              scale: isActive ? 1 : isSide ? 0.88 : 0.75,
              opacity: isActive ? 1 : isSide ? 0.55 : 0.25,
              zIndex: isActive ? 3 : isSide ? 2 : 1,
              x: pos === 1 ? "72%" : pos === len - 1 ? "-72%" : pos === 0 ? "0%" : pos < len / 2 ? "140%" : "-140%",
            }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <div className="dt8-team-img">
              {doc.image ? (
                <Image src={doc.image} alt={doc.name || doc.doctorName} fill className="object-cover object-top" />
              ) : (
                <div className="dt8-team-placeholder">👨‍⚕️</div>
              )}
            </div>
            <div className="dt8-team-info">
              <div className="dt8-team-teal-bar" />
              <p className="dt8-team-name">{doc.name || doc.doctorName}</p>
              <p className="dt8-team-spec">{doc.specialization}</p>
              <p className="dt8-team-exp">{doc.experience} exp.</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN TEMPLATE
══════════════════════════════════════════ */
export default function DoctorTemplate8({ data }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* ── Data ── */
  const {
    clinicName, heroTitle, specialty, heroImage, bio, aboutUsTitle, aboutImage,
    education, experience, contactEmail, phone, countryCode, address,
    workingHours, headerType, logoUrl, heroTitleFontSize, specialtyFontSize,
    services, tagline, heroDescription, qualification, certifications,
    languagesSpoken, hospitalName, whyChooseUs, schedule, stats, testimonials,
    teamDoctors, faqs, insurancePartners, blog, googleMapsEmbed,
    emergencyContact, whatsappNumber, footerDisclaimer, emergencyAvailability,
    ambulanceNumber, footerCopyright, socialLinks, enableBlog,
    blogSectionTitle, blogSubtitle,
  } = data || {};

  const displayPhone = phone ? `${countryCode ? countryCode.split(" ")[0] : ""}${phone}` : "+1 800 MED CARE";
  const displayEmail = contactEmail || "hello@meridianhealth.com";
  const displayAddress = address || "42 Wellbeing Avenue, London EC1";
  const displayName = clinicName || "Meridian Health";
  const displayEmergency = emergencyContact || displayPhone;

  const defaultServices = [
    { icon: "🫀", title: "Cardiology", description: "Cutting-edge cardiac diagnostics, imaging, and intervention using robotic catheterisation suites and AI-guided ECG analysis." },
    { icon: "🧠", title: "Neurology", description: "Specialist neurological care spanning migraine management, epilepsy, stroke rehabilitation, and complex movement disorders." },
    { icon: "🦴", title: "Orthopedics", description: "Minimally invasive joint replacement, sports injury rehab, and bone health management with rapid-recovery pathways." },
    { icon: "👶", title: "Pediatrics", description: "Child-first care from newborn health checks to adolescent well-being programmes — delivered with warmth and expertise." },
    { icon: "👁️", title: "Ophthalmology", description: "Full-spectrum eye health from refractive surgery and cataract removal to advanced retinal treatments." },
    { icon: "🩻", title: "Radiology", description: "High-resolution MRI, CT, and ultrasound interpreted by fellowship-trained radiologists within 24 hours." },
  ];
  const displayServices = services?.length ? services : defaultServices;

  const defaultWhyChoose = [
    { icon: "🏅", title: "Board-Certified Experts", description: "Every clinician holds rigorous national certification with subspecialty postgraduate training." },
    { icon: "🔬", title: "AI-Assisted Diagnostics", description: "Deep-learning imaging tools that surface anomalies human eyes may miss — faster, more accurate diagnoses." },
    { icon: "⏰", title: "Same-Day Access", description: "Urgent and routine appointments available daily. No waiting lists. No unnecessary delays." },
    { icon: "🛡️", title: "Zero-Surprise Billing", description: "Transparent, itemised billing with a dedicated support team to navigate your insurance coverage." },
    { icon: "🌍", title: "Multilingual Care", description: "Clinical staff fluent in 12+ languages — because great communication IS great care." },
    { icon: "♻️", title: "Continuity of Care", description: "One care team from first consultation to full recovery, with a unified digital health record." },
  ];
  const displayWhyChoose = whyChooseUs?.length ? whyChooseUs : defaultWhyChoose;

  const defaultSchedule = [
    { day: "Monday – Friday", open: "7:00 AM", close: "9:00 PM" },
    { day: "Saturday", open: "8:00 AM", close: "6:00 PM" },
    { day: "Sunday", open: "10:00 AM", close: "3:00 PM" },
  ];
  const displaySchedule = schedule?.length ? schedule : defaultSchedule;

  const defaultStats = [
    { value: "22+", label: "Years of Excellence" },
    { value: "21K+", label: "Patients Served" },
    { value: "97%", label: "Satisfaction Rate" },
    { value: "120+", label: "Specialists" },
  ];
  const displayStats = stats?.length ? stats : defaultStats;

  const defaultTestimonials = [
    { name: "Priya Sharma", review: "The level of attention and precision I received at Meridian Health was unlike anything I've experienced. The doctor took time to truly understand my history.", rating: 5 },
    { name: "James Okafor", review: "From booking to diagnosis in under 48 hours. The team was compassionate, efficient, and the facilities were immaculate. I felt genuinely cared for.", rating: 5 },
    { name: "Marie Dubois", review: "The specialist didn't just treat my symptoms — she looked at the whole picture. The follow-up programme has completely transformed my quality of life.", rating: 5 },
    { name: "Hiroshi Tanaka", review: "What impressed me most was the communication. Every step was explained clearly. I left feeling confident and informed, not just treated.", rating: 5 },
  ];
  const displayTestimonials = testimonials?.length ? testimonials : defaultTestimonials;

  const defaultTeam = [
    { name: "Dr. Elena Vasquez", specialization: "Cardiology", experience: "18 Years" },
    { name: "Dr. Samuel Osei", specialization: "Neurology", experience: "14 Years" },
    { name: "Dr. Anika Patel", specialization: "Orthopedics", experience: "12 Years" },
    { name: "Dr. Luca Romano", specialization: "Pediatrics", experience: "10 Years" },
    { name: "Dr. Fatima Al-Hassan", specialization: "Ophthalmology", experience: "9 Years" },
  ];
  const displayTeam = teamDoctors?.length ? teamDoctors : defaultTeam;

  const defaultFaqs = [
    { question: "How quickly can I get an appointment?", answer: "Same-day and next-day appointments are available for most specialties. Emergency consultations can be arranged within the hour for urgent cases." },
    { question: "What insurance plans do you accept?", answer: "We accept all major insurers including BUPA, AXA, Cigna, Vitality, and Aviva, as well as NHS referrals and self-pay packages." },
    { question: "What should I bring to my first visit?", answer: "Please bring a valid ID, your insurance card, a list of current medications, and any prior test results or imaging studies if available." },
    { question: "Is telemedicine available?", answer: "Yes — we offer secure video consultations for follow-up appointments, prescription renewals, and initial assessments for many conditions." },
    { question: "Do you offer emergency care after hours?", answer: "Our 24-hour emergency line connects you to a qualified clinician at any time. Critical emergencies are handled through our dedicated rapid-response unit." },
  ];
  const displayFaqs = faqs?.length ? faqs : defaultFaqs;

  const defaultInsurance = [
    { name: "BUPA" }, { name: "AXA Health" }, { name: "Cigna" },
    { name: "Vitality" }, { name: "Aviva" }, { name: "NHS" },
  ];
  const displayInsurance = insurancePartners?.length ? insurancePartners : defaultInsurance;

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#team", label: "Team" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --slate-950: #0a0f1a;
          --slate-900: #0f1624;
          --slate-800: #18243a;
          --slate-700: #243354;
          --slate-600: #2e4270;
          --teal: #0ea5a0;
          --teal-light: #2dd4bf;
          --teal-pale: #ccfbf1;
          --teal-dim: #0d6e69;
          --teal-glass: rgba(14,165,160,0.10);
          --mint: #f0fdfa;
          --pearl: #f8fffe;
          --white: #ffffff;
          --text-dark: #0f2027;
          --text-mid: #334155;
          --text-muted: #64748b;
        }

        .dt8 { font-family: 'DM Sans', sans-serif; color: var(--text-dark); background: var(--pearl); overflow-x: hidden; scroll-behavior: smooth; }
        .dt8-serif { font-family: 'DM Serif Display', Georgia, serif; }
        .dt8-inner { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
        @media (min-width: 768px) { .dt8-inner { padding: 0 48px; } }
        .dt8-section { padding: 100px 0; }
        @media (min-width: 768px) { .dt8-section { padding: 128px 0; } }

        /* ── Label ── */
        .dt8-label { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
        .dt8-label-dash { width: 28px; height: 2px; background: var(--teal); border-radius: 2px; }
        .dt8-label-text { font-size: 11px; font-weight: 600; letter-spacing: 0.24em; text-transform: uppercase; color: var(--teal); }

        /* ── Headings ── */
        .dt8-h1 { font-family: 'DM Serif Display', serif; font-size: clamp(3rem, 8vw, 6rem); line-height: 0.96; }
        .dt8-h2 { font-family: 'DM Serif Display', serif; font-size: clamp(2rem, 4.5vw, 3.4rem); line-height: 1.08; }
        .dt8-h3 { font-family: 'DM Serif Display', serif; font-size: clamp(1.4rem, 2.5vw, 1.9rem); line-height: 1.15; }

        /* ── Buttons ── */
        .dt8-btn-teal { display: inline-flex; align-items: center; gap: 8px; background: var(--teal); color: #fff; padding: 13px 26px; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none; border: none; cursor: pointer; transition: background 0.25s, transform 0.2s; letter-spacing: 0.02em; }
        .dt8-btn-teal:hover { background: var(--teal-dim); transform: translateY(-2px); }
        .dt8-btn-outline { display: inline-flex; align-items: center; gap: 8px; background: transparent; color: var(--teal); padding: 12px 26px; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none; border: 1.5px solid var(--teal); transition: all 0.25s; }
        .dt8-btn-outline:hover { background: var(--teal-glass); }
        .dt8-btn-dark { display: inline-flex; align-items: center; gap: 8px; background: var(--slate-800); color: var(--teal-light); padding: 12px 26px; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none; border: none; transition: background 0.25s; cursor: pointer; }
        .dt8-btn-dark:hover { background: var(--slate-700); }

        /* ── TOPBAR ── */
        .dt8-topbar { background: var(--slate-950); padding: 9px 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; font-size: 12px; color: rgba(255,255,255,0.45); }
        @media (min-width: 768px) { .dt8-topbar { padding: 9px 48px; } }
        .dt8-topbar-item { display: flex; align-items: center; gap: 6px; }
        .dt8-topbar-item a { color: var(--teal-light); font-weight: 600; text-decoration: none; }

        /* ── NAVBAR ── */
        .dt8-nav { position: sticky; top: 0; z-index: 50; transition: all 0.3s; }
        .dt8-nav-base { background: rgba(248,255,254,0.92); backdrop-filter: blur(18px); border-bottom: 1px solid rgba(14,165,160,0.1); }
        .dt8-nav-scrolled { background: rgba(248,255,254,0.98); box-shadow: 0 2px 28px rgba(14,165,160,0.08); border-bottom: 1px solid rgba(14,165,160,0.18); }
        .dt8-nav-inner { max-width: 1280px; margin: 0 auto; padding: 0 24px; height: 66px; display: flex; justify-content: space-between; align-items: center; }
        @media (min-width: 768px) { .dt8-nav-inner { padding: 0 48px; } }
        .dt8-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .dt8-logo-cross { width: 32px; height: 32px; background: var(--teal); border-radius: 7px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .dt8-logo-cross svg { width: 18px; height: 18px; }
        .dt8-logo-name { font-family: 'DM Serif Display', serif; font-size: 1.3rem; color: var(--slate-900); }
        .dt8-logo-tag { font-size: 9px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--teal); display: block; }
        .dt8-nav-links { display: none; align-items: center; gap: 28px; }
        @media (min-width: 1024px) { .dt8-nav-links { display: flex; } }
        .dt8-nav-link { font-size: 13.5px; font-weight: 500; color: var(--text-mid); text-decoration: none; transition: color 0.2s; }
        .dt8-nav-link:hover { color: var(--teal); }
        .dt8-hamburger { display: flex; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 8px; }
        @media (min-width: 1024px) { .dt8-hamburger { display: none; } }
        .dt8-ham-bar { width: 22px; height: 1.5px; background: var(--slate-800); border-radius: 2px; transition: all 0.2s; }
        .dt8-mobile-menu { background: var(--pearl); border-top: 1px solid rgba(14,165,160,0.1); overflow: hidden; }
        @media (min-width: 1024px) { .dt8-mobile-menu { display: none !important; } }
        .dt8-mobile-menu-inner { padding: 16px 24px; display: flex; flex-direction: column; gap: 0; }
        .dt8-mobile-link { font-size: 15px; font-weight: 500; color: var(--slate-800); text-decoration: none; padding: 12px 0; border-bottom: 1px solid rgba(14,165,160,0.08); display: block; }

        /* ══ HERO ══ */
        .dt8-hero { position: relative; min-height: 100vh; background: var(--slate-950); display: grid; grid-template-columns: 1fr; overflow: hidden; }
        @media (min-width: 1100px) { .dt8-hero { grid-template-columns: 1fr 1fr; } }
        /* Left panel */
        .dt8-hero-left { position: relative; display: flex; flex-direction: column; justify-content: center; padding: 100px 24px 80px; z-index: 2; }
        @media (min-width: 768px) { .dt8-hero-left { padding: 120px 48px 80px; } }
        @media (min-width: 1100px) { .dt8-hero-left { padding: 0 64px 0 64px; } }
        /* Decorative teal grid */
        .dt8-hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(14,165,160,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,160,0.05) 1px, transparent 1px); background-size: 48px 48px; pointer-events: none; }
        /* Teal circle glow */
        .dt8-hero-glow { position: absolute; top: 40%; left: -20%; width: 560px; height: 560px; background: radial-gradient(circle, rgba(14,165,160,0.12) 0%, transparent 65%); pointer-events: none; border-radius: 50%; }
        .dt8-hero-overline { display: flex; align-items: center; gap: 12px; font-size: 11px; font-weight: 600; letter-spacing: 0.26em; text-transform: uppercase; color: var(--teal-light); margin-bottom: 22px; }
        .dt8-hero-overline::before { content: ''; width: 36px; height: 1.5px; background: var(--teal); }
        .dt8-hero-title { font-family: 'DM Serif Display', serif; font-size: clamp(3rem, 7vw, 5.8rem); color: var(--white); line-height: 0.97; margin-bottom: 22px; }
        .dt8-hero-title em { font-style: italic; color: var(--teal-light); }
        .dt8-hero-desc { font-size: 15px; color: rgba(255,255,255,0.48); line-height: 1.8; max-width: 480px; margin-bottom: 36px; }
        .dt8-hero-ctas { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 56px; }
        /* Stats row */
        .dt8-hero-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(255,255,255,0.06); border-radius: 12px; overflow: hidden; }
        .dt8-hero-stat { padding: 18px 14px; background: rgba(255,255,255,0.03); text-align: center; }
        .dt8-hero-stat-val { font-family: 'DM Serif Display', serif; font-size: 1.9rem; color: var(--teal-light); line-height: 1; }
        .dt8-hero-stat-lbl { font-size: 10px; color: rgba(255,255,255,0.36); margin-top: 4px; letter-spacing: 0.05em; }
        /* Right image */
        .dt8-hero-right { position: relative; min-height: 50vh; }
        @media (min-width: 1100px) { .dt8-hero-right { min-height: 100vh; } }
        .dt8-hero-img-wrap { position: absolute; inset: 0; }
        .dt8-hero-img-overlay { position: absolute; inset: 0; background: linear-gradient(to right, var(--slate-950) 0%, rgba(10,15,26,0.3) 50%, transparent 100%); z-index: 1; }
        /* Teal accent stripe */
        .dt8-hero-stripe { position: absolute; top: 0; bottom: 0; left: 0; width: 4px; background: linear-gradient(to bottom, transparent, var(--teal), transparent); z-index: 3; }
        /* Floating badge */
        .dt8-hero-float { position: absolute; bottom: 48px; right: 32px; background: rgba(10,15,26,0.85); backdrop-filter: blur(12px); border: 1px solid rgba(14,165,160,0.25); border-radius: 14px; padding: 18px 22px; z-index: 4; display: flex; align-items: center; gap: 14px; }
        .dt8-hero-float-icon { width: 44px; height: 44px; background: var(--teal); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; flex-shrink: 0; }
        .dt8-hero-float-val { font-family: 'DM Serif Display', serif; font-size: 1.7rem; color: var(--white); line-height: 1; }
        .dt8-hero-float-lbl { font-size: 10px; color: rgba(255,255,255,0.4); letter-spacing: 0.08em; }

        /* ── Marquee ── */
        .dt8-marquee { background: var(--teal); overflow: hidden; padding: 13px 0; }
        .dt8-marquee-track { display: flex; animation: dt8marquee 30s linear infinite; white-space: nowrap; }
        .dt8-marquee-item { display: flex; align-items: center; gap: 14px; padding: 0 28px; font-family: 'DM Serif Display', serif; font-size: 1rem; color: rgba(0,30,30,0.85); }
        .dt8-marquee-sep { width: 5px; height: 5px; background: rgba(0,30,30,0.3); border-radius: 50%; }
        @keyframes dt8marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        /* ── ABOUT ── */
        .dt8-about-bg { background: var(--pearl); }
        .dt8-about-grid { display: grid; grid-template-columns: 1fr; gap: 72px; align-items: center; }
        @media (min-width: 1024px) { .dt8-about-grid { grid-template-columns: 5fr 7fr; } }
        .dt8-about-img-outer { position: relative; max-width: 460px; }
        .dt8-about-img-inner { border-radius: 24px 80px 24px 80px; overflow: hidden; aspect-ratio: 4/5; border: 3px solid rgba(14,165,160,0.15); }
        .dt8-about-badge { position: absolute; bottom: -24px; right: -18px; background: var(--slate-900); border-radius: 16px; padding: 18px 22px; border: 2px solid rgba(14,165,160,0.2); z-index: 2; }
        @media (min-width: 480px) { .dt8-about-badge { right: -28px; } }
        .dt8-about-badge-num { font-family: 'DM Serif Display', serif; font-size: 2.6rem; color: var(--teal-light); line-height: 1; }
        .dt8-about-badge-lbl { font-size: 9px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.4); }
        .dt8-about-teal-corner { position: absolute; top: -14px; left: -14px; width: 48px; height: 48px; border-top: 2.5px solid var(--teal); border-left: 2.5px solid var(--teal); border-radius: 0 0 0 8px; }
        .dt8-credentials { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 28px 0; }
        .dt8-cred-cell { background: var(--mint); border: 1px solid rgba(14,165,160,0.14); border-radius: 10px; padding: 14px 16px; transition: border-color 0.2s; }
        .dt8-cred-cell:hover { border-color: rgba(14,165,160,0.4); }
        .dt8-cred-lbl { font-size: 9px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--teal); margin-bottom: 4px; }
        .dt8-cred-val { font-size: 13px; font-weight: 500; color: var(--text-dark); }

        /* ── SERVICES ── */
        .dt8-svc-bg { background: var(--slate-900); }
        .dt8-svc-slider { display: grid; grid-template-columns: 1fr; border: 1px solid rgba(255,255,255,0.06); border-radius: 20px; overflow: hidden; }
        @media (min-width: 900px) { .dt8-svc-slider { grid-template-columns: 220px 1fr; } }
        .dt8-svc-nav { background: var(--slate-950); border-right: 1px solid rgba(255,255,255,0.05); display: flex; flex-direction: row; overflow-x: auto; }
        @media (min-width: 900px) { .dt8-svc-nav { flex-direction: column; overflow-x: visible; } }
        .dt8-svc-navbtn { display: flex; align-items: center; gap: 10px; padding: 16px 20px; background: transparent; border: none; cursor: pointer; text-align: left; position: relative; border-bottom: 1px solid rgba(255,255,255,0.04); flex-shrink: 0; transition: background 0.2s; }
        .dt8-svc-navbtn.active { background: rgba(14,165,160,0.08); }
        .dt8-svc-nav-indicator { position: absolute; right: 0; top: 0; bottom: 0; width: 3px; background: var(--teal); border-radius: 3px 0 0 3px; }
        @media (max-width: 899px) { .dt8-svc-nav-indicator { right: auto; bottom: 0; top: auto; width: 100%; height: 3px; border-radius: 0; } }
        .dt8-svc-nav-icon { font-size: 1.2rem; flex-shrink: 0; }
        .dt8-svc-nav-label { font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.5); transition: color 0.2s; }
        .dt8-svc-navbtn.active .dt8-svc-nav-label { color: var(--white); }
        .dt8-svc-panel { background: var(--slate-800); padding: 52px 48px; min-height: 380px; display: flex; align-items: center; }
        @media (max-width: 768px) { .dt8-svc-panel { padding: 36px 24px; } }
        .dt8-svc-content { width: 100%; }
        .dt8-svc-big-icon { font-size: 3.2rem; margin-bottom: 16px; }
        .dt8-svc-idx { font-family: 'DM Serif Display', serif; font-size: 5rem; color: rgba(14,165,160,0.07); line-height: 1; margin-bottom: 8px; }
        .dt8-svc-title { font-family: 'DM Serif Display', serif; font-size: 2.2rem; color: var(--white); margin-bottom: 14px; line-height: 1.1; }
        .dt8-svc-desc { font-size: 14px; color: rgba(255,255,255,0.48); line-height: 1.8; margin-bottom: 28px; max-width: 480px; }

        /* ── WHY ── */
        .dt8-why-bg { background: var(--mint); }
        .dt8-why-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        @media (min-width: 1024px) { .dt8-why-grid { grid-template-columns: repeat(3, 1fr); } }
        .dt8-why-card { background: var(--white); border: 1px solid rgba(14,165,160,0.1); border-radius: 16px; padding: 28px 22px; position: relative; overflow: hidden; transition: all 0.3s; }
        .dt8-why-card:hover { border-color: rgba(14,165,160,0.3); transform: translateY(-5px); box-shadow: 0 16px 40px rgba(14,165,160,0.08); }
        .dt8-why-card::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--teal); transform: scaleX(0); transform-origin: left; transition: transform 0.3s; }
        .dt8-why-card:hover::after { transform: scaleX(1); }
        .dt8-why-icon { font-size: 1.9rem; margin-bottom: 14px; display: block; }
        .dt8-why-title { font-family: 'DM Serif Display', serif; font-size: 1.2rem; color: var(--text-dark); margin-bottom: 8px; }
        .dt8-why-desc { font-size: 13px; color: var(--text-muted); line-height: 1.7; }
        .dt8-why-num { position: absolute; bottom: 10px; right: 14px; font-family: 'DM Serif Display', serif; font-size: 2.8rem; color: rgba(14,165,160,0.05); line-height: 1; }

        /* ── STATS ── */
        .dt8-stats-bg { background: var(--teal); }
        .dt8-stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); }
        @media (min-width: 768px) { .dt8-stats-grid { grid-template-columns: repeat(4, 1fr); } }
        .dt8-stat-cell { padding: 52px 32px; text-align: center; border-right: 1px solid rgba(255,255,255,0.12); position: relative; }
        .dt8-stat-cell:nth-child(even) { border-right: none; }
        @media (min-width: 768px) { .dt8-stat-cell { border-right: 1px solid rgba(255,255,255,0.12); } .dt8-stat-cell:last-child { border-right: none; } }
        .dt8-stat-val { font-family: 'DM Serif Display', serif; font-size: clamp(2.4rem, 4vw, 3.4rem); color: rgba(0,20,20,0.9); line-height: 1; margin-bottom: 8px; }
        .dt8-stat-lbl { font-size: 11px; font-weight: 600; color: rgba(0,30,30,0.6); letter-spacing: 0.12em; text-transform: uppercase; }

        /* ── TESTIMONIALS ── */
        .dt8-test-bg { background: var(--slate-900); }
        .dt8-tcarousel { }
        .dt8-tcard { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 18px; padding: 36px; position: relative; overflow: hidden; }
        .dt8-tcard-bar { position: absolute; top: 0; left: 0; bottom: 0; width: 3px; background: linear-gradient(to bottom, var(--teal), transparent); }
        .dt8-ttext { font-family: 'DM Serif Display', serif; font-size: clamp(1rem, 2vw, 1.25rem); font-style: italic; color: rgba(255,255,255,0.82); line-height: 1.7; margin-bottom: 28px; }
        .dt8-tfooter { display: flex; align-items: center; gap: 14px; }
        .dt8-tavatar { width: 46px; height: 46px; min-width: 46px; border-radius: 50%; background: var(--teal-dim); border: 2px solid rgba(14,165,160,0.35); display: flex; align-items: center; justify-content: center; font-family: 'DM Serif Display', serif; font-size: 1.2rem; font-weight: 600; color: var(--teal-light); }
        .dt8-tname { font-size: 14px; font-weight: 600; color: var(--white); }
        .dt8-trole { font-size: 11px; color: var(--teal); font-weight: 600; letter-spacing: 0.06em; }
        .dt8-trating { margin-left: auto; color: var(--teal-light); font-size: 13px; letter-spacing: 2px; }
        .dt8-tdots { display: flex; gap: 6px; margin-top: 20px; justify-content: center; }
        .dt8-tdot { width: 7px; height: 7px; border-radius: 50%; background: rgba(255,255,255,0.15); border: none; cursor: pointer; padding: 0; transition: all 0.25s; }
        .dt8-tdot.active { width: 24px; border-radius: 4px; background: var(--teal); }

        /* ── SCHEDULE ── */
        .dt8-schedule-wrap { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; overflow: hidden; }
        .dt8-sch-row { display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; border-bottom: 1px solid rgba(255,255,255,0.05); transition: background 0.2s; }
        .dt8-sch-row:last-child { border-bottom: none; }
        .dt8-sch-row:hover { background: rgba(14,165,160,0.05); }
        .dt8-sch-day { font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.6); }
        .dt8-sch-time { font-family: 'DM Serif Display', serif; font-size: 1rem; color: var(--teal-light); }

        /* ── TEAM ── */
        .dt8-team-bg { background: var(--pearl); }
        .dt8-team-scroller { position: relative; height: 420px; display: flex; align-items: center; justify-content: center; }
        .dt8-team-card { position: absolute; width: 240px; cursor: pointer; }
        .dt8-team-img { position: relative; height: 320px; border-radius: 20px; overflow: hidden; background: var(--slate-700); }
        .dt8-team-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 4rem; background: linear-gradient(135deg, var(--slate-700) 0%, var(--slate-600) 100%); }
        .dt8-team-info { padding: 16px 4px 0; }
        .dt8-team-teal-bar { width: 24px; height: 2px; background: var(--teal); margin-bottom: 8px; }
        .dt8-team-name { font-family: 'DM Serif Display', serif; font-size: 1.1rem; color: var(--text-dark); margin-bottom: 2px; }
        .dt8-team-spec { font-size: 11px; font-weight: 600; color: var(--teal); text-transform: uppercase; letter-spacing: 0.1em; }
        .dt8-team-exp { font-size: 11px; color: var(--text-muted); margin-top: 2px; }

        /* ── FAQ ── */
        .dt8-faq-bg { background: var(--pearl); }
        .dt8-faq-item { border-bottom: 1px solid rgba(14,165,160,0.1); }
        .dt8-faq-q { width: 100%; display: flex; align-items: center; gap: 14px; padding: 20px 0; background: none; border: none; cursor: pointer; text-align: left; }
        .dt8-faq-num { font-family: 'DM Serif Display', serif; font-size: 1rem; color: var(--teal); flex-shrink: 0; width: 22px; }
        .dt8-faq-qtext { font-family: 'DM Serif Display', serif; font-size: 1.1rem; color: var(--text-dark); flex: 1; line-height: 1.3; transition: color 0.2s; }
        .dt8-faq-q:hover .dt8-faq-qtext { color: var(--teal-dim); }
        .dt8-faq-icon { font-size: 22px; color: var(--teal); font-weight: 300; display: inline-block; line-height: 1; flex-shrink: 0; }
        .dt8-faq-a { font-size: 14px; color: var(--text-muted); line-height: 1.8; padding: 0 0 20px 36px; }

        /* ── INSURANCE ── */
        .dt8-ins-bg { background: var(--mint); border-top: 1px solid rgba(14,165,160,0.1); }
        .dt8-ins-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
        @media (min-width: 480px) { .dt8-ins-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 768px) { .dt8-ins-grid { grid-template-columns: repeat(6, 1fr); } }
        .dt8-ins-card { background: var(--white); border: 1px solid rgba(14,165,160,0.12); border-radius: 10px; padding: 18px 12px; text-align: center; font-size: 12px; font-weight: 700; color: var(--text-mid); letter-spacing: 0.04em; transition: all 0.2s; }
        .dt8-ins-card:hover { border-color: var(--teal); color: var(--teal-dim); transform: translateY(-2px); }

        /* ── BLOG ── */
        .dt8-blog-bg { background: var(--pearl); }
        .dt8-blog-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
        @media (min-width: 640px) { .dt8-blog-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .dt8-blog-grid { grid-template-columns: repeat(3, 1fr); } }
        .dt8-blog-card { border-radius: 16px; overflow: hidden; background: var(--white); border: 1px solid rgba(14,165,160,0.08); transition: all 0.3s; }
        .dt8-blog-card:hover { transform: translateY(-5px); box-shadow: 0 20px 48px rgba(14,165,160,0.08); border-color: rgba(14,165,160,0.25); }
        .dt8-blog-thumb { height: 180px; display: flex; align-items: center; justify-content: center; font-size: 3rem; }
        .dt8-blog-body { padding: 22px; }
        .dt8-blog-tag { display: inline-block; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; padding: 4px 12px; border-radius: 100px; background: rgba(14,165,160,0.1); color: var(--teal-dim); border: 1px solid rgba(14,165,160,0.2); }
        .dt8-blog-title { font-family: 'DM Serif Display', serif; font-size: 1.2rem; color: var(--text-dark); margin: 10px 0 8px; line-height: 1.25; }
        .dt8-blog-excerpt { font-size: 13px; color: var(--text-muted); line-height: 1.65; margin-bottom: 10px; }
        .dt8-blog-date { font-size: 11px; color: var(--teal); font-weight: 600; }

        /* ── CONTACT ── */
        .dt8-contact-bg { background: var(--slate-950); }
        .dt8-contact-grid { display: grid; grid-template-columns: 1fr; gap: 48px; }
        @media (min-width: 1024px) { .dt8-contact-grid { grid-template-columns: 1fr 1fr; } }
        .dt8-contact-card { display: flex; align-items: flex-start; gap: 16px; padding: 20px; background: rgba(255,255,255,0.03); border: 1px solid rgba(14,165,160,0.12); border-radius: 14px; transition: border-color 0.2s; }
        .dt8-contact-card:hover { border-color: rgba(14,165,160,0.3); }
        .dt8-contact-icon { width: 44px; height: 44px; min-width: 44px; background: rgba(14,165,160,0.12); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }
        .dt8-contact-lbl { font-size: 9px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--teal); margin-bottom: 3px; }
        .dt8-contact-val { font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.75); word-break: break-word; }
        .dt8-emergency { background: var(--teal); border-radius: 14px; padding: 22px 24px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 14px; margin-bottom: 28px; }
        .dt8-map-wrap { border-radius: 16px; overflow: hidden; border: 1px solid rgba(14,165,160,0.15); min-height: 340px; background: var(--slate-800); display: flex; align-items: center; justify-content: center; }
        .dt8-map-placeholder { text-align: center; color: rgba(255,255,255,0.3); }

        /* ── FOOTER ── */
        .dt8-footer { background: var(--slate-950); border-top: 1px solid rgba(14,165,160,0.1); }
        .dt8-footer-top { max-width: 1280px; margin: 0 auto; padding: 72px 24px 48px; display: grid; grid-template-columns: 1fr; gap: 40px; }
        @media (min-width: 768px) { .dt8-footer-top { padding: 72px 48px 48px; grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .dt8-footer-top { grid-template-columns: 2.5fr 1fr 1fr 1.5fr; } }
        .dt8-footer-heading { font-size: 10px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: var(--teal); margin-bottom: 18px; }
        .dt8-footer-link { display: block; font-size: 13px; color: rgba(255,255,255,0.38); text-decoration: none; padding: 5px 0; transition: color 0.2s; }
        .dt8-footer-link:hover { color: var(--teal-light); }
        .dt8-footer-divider { border: none; border-top: 1px solid rgba(255,255,255,0.05); margin: 0 24px; }
        @media (min-width: 768px) { .dt8-footer-divider { margin: 0 48px; } }
        .dt8-footer-bottom { max-width: 1280px; margin: 0 auto; padding: 20px 24px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px; font-size: 12px; color: rgba(255,255,255,0.3); }
        @media (min-width: 768px) { .dt8-footer-bottom { padding: 20px 48px; } }
        .dt8-social-row { display: flex; gap: 8px; margin-top: 18px; }
        .dt8-social-btn { width: 34px; height: 34px; border-radius: 7px; border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-size: 12px; color: rgba(255,255,255,0.38); text-decoration: none; transition: all 0.2s; }
        .dt8-social-btn:hover { border-color: var(--teal); color: var(--teal-light); }
        .dt8-disclaimer { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 10px; padding: 14px 18px; margin: 0 24px 24px; font-size: 11px; color: rgba(255,255,255,0.25); line-height: 1.65; }
        @media (min-width: 768px) { .dt8-disclaimer { margin: 0 48px 24px; } }
      `}</style>

      <div className="dt8">

        {/* ── Topbar ── */}
        <div className="dt8-topbar">
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <span className="dt8-topbar-item">
              <span>📞</span>
              <a href={`tel:${displayPhone}`}>{displayPhone}</a>
            </span>
            <span className="dt8-topbar-item">
              <span>✉</span>
              <a href={`mailto:${displayEmail}`}>{displayEmail}</a>
            </span>
          </div>
          <span className="dt8-topbar-item">
            <span>🕒</span>
            {workingHours || "Mon–Fri: 7 AM – 9 PM"}
          </span>
        </div>

        {/* ── Navbar ── */}
        <motion.header
          className={`dt8-nav ${scrolled ? "dt8-nav-scrolled" : "dt8-nav-base"}`}
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <div className="dt8-nav-inner">
            {headerType === "Image" && logoUrl ? (
              <div style={{ position: "relative", width: 130, height: 38 }}>
                <Image src={logoUrl} alt={displayName} fill className="object-contain" />
              </div>
            ) : (
              <a href="#home" className="dt8-logo">
                <div className="dt8-logo-cross">
                  <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="7" y="1" width="4" height="16" rx="2" fill="white" />
                    <rect x="1" y="7" width="16" height="4" rx="2" fill="white" />
                  </svg>
                </div>
                <div>
                  <span className="dt8-logo-name">{displayName}</span>
                  <span className="dt8-logo-tag">{specialty || "Medical Centre"}</span>
                </div>
              </a>
            )}

            <nav className="dt8-nav-links">
              {navLinks.map(({ href, label }) => (
                <a key={href} href={href} className="dt8-nav-link">{label}</a>
              ))}
              <a href="#contact" className="dt8-btn-teal" style={{ padding: "10px 20px", fontSize: 13 }}>Book Now</a>
            </nav>

            <button className="dt8-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              <motion.div animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6.5 : 0 }} className="dt8-ham-bar" />
              <motion.div animate={{ opacity: menuOpen ? 0 : 1 }} className="dt8-ham-bar" />
              <motion.div animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6.5 : 0 }} className="dt8-ham-bar" />
            </button>
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                className="dt8-mobile-menu"
              >
                <div className="dt8-mobile-menu-inner">
                  {navLinks.map(({ href, label }) => (
                    <a key={href} href={href} className="dt8-mobile-link" onClick={() => setMenuOpen(false)}>{label}</a>
                  ))}
                  <a href="#contact" className="dt8-btn-teal" style={{ marginTop: 14, justifyContent: "center" }} onClick={() => setMenuOpen(false)}>Book Now</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        {/* ══ HERO ══ */}
        <section id="home" ref={heroRef} className="dt8-hero">
          <div className="dt8-hero-grid" />
          <div className="dt8-hero-glow" />

          {/* Left content */}
          <div className="dt8-hero-left">
            <motion.p
              className="dt8-hero-overline"
              initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT }}
            >
              {specialty || "Advanced Clinical Excellence"}
            </motion.p>

            <motion.h1
              className="dt8-hero-title"
              initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: EASE_OUT }}
            >
              {heroTitle ? heroTitle : (<>Your Health,<br /><em>Our Purpose</em></>)}
            </motion.h1>

            <motion.p
              className="dt8-hero-desc"
              initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.6 }}
            >
              {tagline && <strong style={{ display: "block", color: "rgba(255,255,255,0.7)", marginBottom: 6 }}>{tagline}</strong>}
              {heroDescription || "Precision medicine delivered by world-class specialists who put people at the heart of every decision — because great healthcare is profoundly human."}
            </motion.p>

            <motion.div
              className="dt8-hero-ctas"
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.75 }}
            >
              <a href="#contact" className="dt8-btn-teal">📅 Book Appointment</a>
              <a href={`tel:${displayEmergency}`} className="dt8-btn-outline" style={{ color: "rgba(255,255,255,0.7)", borderColor: "rgba(255,255,255,0.2)" }}>🚨 Emergency</a>
            </motion.div>

            <motion.div
              className="dt8-hero-stats"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              {[["22+", "Years"], ["21K+", "Patients"], ["97%", "Satisfaction"]].map(([v, l]) => (
                <div key={l} className="dt8-hero-stat">
                  <p className="dt8-hero-stat-val">{v}</p>
                  <p className="dt8-hero-stat-lbl">{l}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right image */}
          <motion.div
            className="dt8-hero-right"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.2 }}
          >
            <div className="dt8-hero-img-wrap">
              <Image
                src={heroImage || "/images/templates/template-img-26.jpg"}
                alt="Doctor" fill className="object-cover object-top" priority
              />
              <div className="dt8-hero-img-overlay" />
              <div className="dt8-hero-stripe" />
            </div>
            <div className="dt8-hero-float">
              <div className="dt8-hero-float-icon">⭐</div>
              <div>
                <p className="dt8-hero-float-val">{experience || "22"}+</p>
                <p className="dt8-hero-float-lbl">Years of Excellence</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ══ MARQUEE ══ */}
        <div className="dt8-marquee" aria-hidden="true">
          <div className="dt8-marquee-track">
            {[...Array(2)].map((_, si) =>
              ["Precision Diagnostics", "Compassionate Care", "World-Class Specialists", "24/7 Emergency", "AI-Assisted Imaging", "Trusted by 21,000+", "Same-Day Appointments", "Transparent Billing"].map((item, i) => (
                <div key={`${si}-${i}`} className="dt8-marquee-item">
                  {item} <span className="dt8-marquee-sep" />
                </div>
              ))
            )}
          </div>
        </div>

        {/* ══ ABOUT ══ */}
        <section id="about" className="dt8-section dt8-about-bg">
          <div className="dt8-inner">
            <div className="dt8-about-grid">
              <Reveal dir="left">
                <div className="dt8-about-img-outer">
                  <div className="dt8-about-teal-corner" />
                  <div className="dt8-about-img-inner">
                    <Image src={aboutImage || "/images/templates/template-img-27.jpg"} alt="About" fill className="object-cover" />
                  </div>
                  <div className="dt8-about-badge">
                    <p className="dt8-about-badge-num">{experience || "22"}+</p>
                    <p className="dt8-about-badge-lbl">Yrs Exp.</p>
                  </div>
                </div>
              </Reveal>

              <div>
                <Reveal dir="left" delay={0.05}><TealLabel>{aboutUsTitle || "About the Practice"}</TealLabel></Reveal>
                <Reveal dir="left" delay={0.1}>
                  <h2 className="dt8-h2" style={{ color: "var(--text-dark)", marginBottom: 18 }}>
                    Science-Led Care,{" "}
                    <em style={{ fontStyle: "italic", color: "var(--teal-dim)" }}>Human First</em>
                  </h2>
                </Reveal>
                <Reveal dir="left" delay={0.15}>
                  <p style={{ color: "var(--text-muted)", lineHeight: 1.8, fontSize: 15, marginBottom: 24 }}>
                    {bio || "For over two decades we have blended clinical mastery with genuine compassion. Our multidisciplinary team harnesses the latest diagnostic technology to create care plans that are deeply personal — because no two patients, and no two conditions, are ever the same."}
                  </p>
                </Reveal>
                <Reveal dir="left" delay={0.18}>
                  <div className="dt8-credentials">
                    {[
                      { label: "Education", val: qualification || education || "MD — Medical University" },
                      { label: "Hospital", val: hospitalName || displayName },
                      { label: "Languages", val: languagesSpoken || "English, Hindi" },
                      { label: "Certifications", val: certifications || "MBBS, MD, FRCS" },
                    ].map((c) => (
                      <div key={c.label} className="dt8-cred-cell">
                        <p className="dt8-cred-lbl">{c.label}</p>
                        <p className="dt8-cred-val">{c.val}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>
                <Reveal dir="left" delay={0.22}>
                  <a href="#contact" className="dt8-btn-teal">Request Consultation →</a>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ══ SERVICES ══ */}
        <section id="services" className="dt8-section dt8-svc-bg">
          <div className="dt8-inner">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 48 }}>
              <div>
                <Reveal dir="left"><TealLabel>Our Specialties</TealLabel></Reveal>
                <Reveal dir="left" delay={0.05}>
                  <h2 className="dt8-h2" style={{ color: "var(--white)" }}>
                    Expert Medical <em style={{ fontStyle: "italic", color: "var(--teal-light)" }}>Services</em>
                  </h2>
                </Reveal>
              </div>
              <Reveal dir="right">
                <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 14, maxWidth: 300, lineHeight: 1.7 }}>
                  Tap a specialty to explore how our consultants can help you.
                </p>
              </Reveal>
            </div>
            <Reveal dir="up" delay={0.1}>
              <ServiceSlider items={displayServices} />
            </Reveal>
          </div>
        </section>

        {/* ══ WHY CHOOSE ══ */}
        <section className="dt8-section dt8-why-bg">
          <div className="dt8-inner">
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <Reveal dir="left"><TealLabel>Why Choose Us</TealLabel></Reveal>
              <Reveal dir="left" delay={0.05}>
                <h2 className="dt8-h2" style={{ color: "var(--text-dark)", marginBottom: 12 }}>
                  The Meridian <em style={{ fontStyle: "italic", color: "var(--teal-dim)" }}>Advantage</em>
                </h2>
              </Reveal>
              <Reveal dir="right" delay={0.1}>
                <p style={{ color: "var(--text-muted)", maxWidth: 460, margin: "0 auto", fontSize: 14, lineHeight: 1.75 }}>
                  World-class expertise combined with a genuine commitment to every individual.
                </p>
              </Reveal>
            </div>
            <Stagger className="dt8-why-grid">
              {displayWhyChoose.map((f, i) => (
                <motion.div key={i} variants={fromLeft(i * 0.08)} className="dt8-why-card">
                  <span className="dt8-why-icon">{f.icon || "✦"}</span>
                  <h3 className="dt8-why-title">{f.title || f.featureTitle}</h3>
                  <p className="dt8-why-desc">{f.description || f.featureDescription}</p>
                  <span className="dt8-why-num">0{i + 1}</span>
                </motion.div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ══ STATS ══ */}
        <section className="dt8-stats-bg">
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <Stagger className="dt8-stats-grid">
              {displayStats.map((s, i) => (
                <motion.div key={i} variants={scaleUp(i * 0.09)} className="dt8-stat-cell">
                  <p className="dt8-stat-val"><Counter target={s.value} /></p>
                  <p className="dt8-stat-lbl">{s.label}</p>
                </motion.div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ══ TESTIMONIALS + SCHEDULE ══ */}
        <section className="dt8-section dt8-test-bg">
          <div className="dt8-inner">
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 64 }}>
              <style>{`@media(min-width:1024px){.dt8-ts-row{grid-template-columns:1fr 1fr !important;}}`}</style>
              <div className="dt8-ts-row" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 64 }}>

                {/* Testimonials */}
                <div>
                  <Reveal dir="left"><TealLabel>Patient Stories</TealLabel></Reveal>
                  <Reveal dir="left" delay={0.05}>
                    <h2 className="dt8-h2" style={{ color: "var(--white)", marginBottom: 14 }}>
                      Real <em style={{ fontStyle: "italic", color: "var(--teal-light)" }}>Voices</em>
                    </h2>
                  </Reveal>
                  <Reveal dir="left" delay={0.1}>
                    <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 14, lineHeight: 1.75, marginBottom: 28 }}>
                      Experiences shared by the people we are privileged to care for.
                    </p>
                    <TestimonialCarousel items={displayTestimonials} />
                  </Reveal>
                </div>

                {/* Schedule */}
                <div>
                  <Reveal dir="right"><TealLabel>Opening Hours</TealLabel></Reveal>
                  <Reveal dir="right" delay={0.05}>
                    <h2 className="dt8-h2" style={{ color: "var(--white)", marginBottom: 14 }}>
                      When We're <em style={{ fontStyle: "italic", color: "var(--teal-light)" }}>Here</em>
                    </h2>
                  </Reveal>
                  <Reveal dir="right" delay={0.1}>
                    <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 14, lineHeight: 1.75, marginBottom: 24 }}>
                      Walk in or reserve a slot — we're ready when you are.
                    </p>
                    <div className="dt8-schedule-wrap" style={{ marginBottom: 24 }}>
                      {displaySchedule.map((row, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: i * 0.12 }}
                          className="dt8-sch-row"
                        >
                          <span className="dt8-sch-day">{row.day}</span>
                          <span className="dt8-sch-time">{row.open || row.openingTime} – {row.close || row.closingTime}</span>
                        </motion.div>
                      ))}
                    </div>
                    <a href="#contact" className="dt8-btn-dark">Reserve a Slot →</a>
                  </Reveal>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ══ TEAM ══ */}
        <section id="team" className="dt8-section dt8-team-bg">
          <div className="dt8-inner">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 56 }}>
              <div>
                <Reveal dir="left"><TealLabel>Our Specialists</TealLabel></Reveal>
                <Reveal dir="left" delay={0.05}>
                  <h2 className="dt8-h2" style={{ color: "var(--text-dark)" }}>
                    Meet the <em style={{ fontStyle: "italic", color: "var(--teal-dim)" }}>Doctors</em>
                  </h2>
                </Reveal>
              </div>
              <Reveal dir="right">
                <a href="#contact" className="dt8-btn-outline">All Specialists →</a>
              </Reveal>
            </div>

            <Reveal dir="up" delay={0.1}>
              <TeamScroller doctors={displayTeam} />
            </Reveal>

            {/* Team names row (full list) */}
            <Stagger style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginTop: 40 }}>
              {displayTeam.map((doc, i) => (
                <motion.div
                  key={i}
                  variants={fromLeft(i * 0.07)}
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", background: "var(--mint)", border: "1px solid rgba(14,165,160,0.14)", borderRadius: 10 }}
                >
                  <div style={{ width: 8, height: 8, background: "var(--teal)", borderRadius: "50%" }} />
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-dark)" }}>{doc.name || doc.doctorName}</p>
                    <p style={{ fontSize: 11, color: "var(--teal)", fontWeight: 600, letterSpacing: "0.06em" }}>{doc.specialization}</p>
                  </div>
                </motion.div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ══ FAQ ══ */}
        <section id="faq" className="dt8-section dt8-faq-bg">
          <div className="dt8-inner">
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 64 }}>
              <style>{`@media(min-width:1024px){.dt8-faq-row{grid-template-columns:2fr 3fr !important;}}`}</style>
              <div className="dt8-faq-row" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 64 }}>
                <div>
                  <Reveal dir="left"><TealLabel>FAQ</TealLabel></Reveal>
                  <Reveal dir="left" delay={0.05}>
                    <h2 className="dt8-h2" style={{ color: "var(--text-dark)", marginBottom: 16 }}>
                      Common <em style={{ fontStyle: "italic", color: "var(--teal-dim)" }}>Questions</em>
                    </h2>
                  </Reveal>
                  <Reveal dir="left" delay={0.1}>
                    <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.75, marginBottom: 24 }}>
                      Everything you need to know before your visit. Can't find what you're looking for?
                    </p>
                    <a href={`tel:${displayPhone}`} className="dt8-btn-teal">📞 Call Us</a>
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
        <section className="dt8-section dt8-ins-bg">
          <div className="dt8-inner">
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <Reveal dir="left"><TealLabel>Partners</TealLabel></Reveal>
              <Reveal dir="left" delay={0.05}>
                <h2 className="dt8-h2" style={{ color: "var(--text-dark)", marginBottom: 10 }}>
                  Accepted <em style={{ fontStyle: "italic", color: "var(--teal-dim)" }}>Insurance</em>
                </h2>
              </Reveal>
            </div>
            <Stagger className="dt8-ins-grid">
              {displayInsurance.map((ins, i) => (
                <motion.div key={i} variants={scaleUp(i * 0.06)} className="dt8-ins-card">
                  {ins.logo ? (
                    <div style={{ position: "relative", height: 34, marginBottom: 6 }}>
                      <Image src={ins.logo} alt={ins.name} fill className="object-contain" />
                    </div>
                  ) : <div style={{ fontSize: "1.2rem", marginBottom: 6 }}>🏢</div>}
                  {ins.name}
                </motion.div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ══ BLOG ══ */}
        {enableBlog !== false && (
          <section className="dt8-section dt8-blog-bg">
            <div className="dt8-inner">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 48 }}>
                <div>
                  <Reveal dir="left"><TealLabel>{blogSubtitle || "Health Insights"}</TealLabel></Reveal>
                  <Reveal dir="left" delay={0.05}>
                    <h2 className="dt8-h2" style={{ color: "var(--text-dark)" }}>{blogSectionTitle || <><em style={{ fontStyle: "italic" }}>Expert</em> Articles</>}</h2>
                  </Reveal>
                </div>
                <Reveal dir="right">
                  <a href="#" style={{ fontSize: 13, fontWeight: 600, color: "var(--teal)", textDecoration: "none", borderBottom: "1.5px solid rgba(14,165,160,0.3)", paddingBottom: 2 }}>All Articles →</a>
                </Reveal>
              </div>
              <Stagger className="dt8-blog-grid">
                {[
                  { tag: "Heart Health", emoji: "❤️", bg: "#f0fdfa", title: "10 Habits for a Stronger Heart", excerpt: "Small daily changes that significantly reduce cardiovascular risk over time.", date: "May 2025" },
                  { tag: "Nutrition", emoji: "🥗", bg: "#f7fee7", title: "Anti-Inflammatory Eating: A Guide", excerpt: "How your plate can be your most powerful ally against chronic inflammation.", date: "Apr 2025" },
                  { tag: "Wellbeing", emoji: "🧘", bg: "#fdf4ff", title: "Stress Management in Modern Life", excerpt: "Evidence-based strategies for balance when everything feels overwhelming.", date: "Mar 2025" },
                ].map((post, i) => (
                  <motion.article key={i} variants={fromLeft(i * 0.1)} className="dt8-blog-card">
                    <div className="dt8-blog-thumb" style={{ background: post.bg }}>
                      <span style={{ fontSize: "2.5rem" }}>{post.emoji}</span>
                    </div>
                    <div className="dt8-blog-body">
                      <span className="dt8-blog-tag">{post.tag}</span>
                      <h3 className="dt8-blog-title">{post.title}</h3>
                      <p className="dt8-blog-excerpt">{post.excerpt}</p>
                      <p className="dt8-blog-date">✦ {post.date}</p>
                    </div>
                  </motion.article>
                ))}
              </Stagger>
            </div>
          </section>
        )}

        {/* ══ CONTACT ══ */}
        <section id="contact" className="dt8-section dt8-contact-bg">
          <div className="dt8-inner">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <Reveal dir="left"><TealLabel>Get In Touch</TealLabel></Reveal>
              <Reveal dir="left" delay={0.05}>
                <h2 className="dt8-h2" style={{ color: "var(--white)", marginBottom: 10 }}>
                  Contact & <em style={{ fontStyle: "italic", color: "var(--teal-light)" }}>Location</em>
                </h2>
              </Reveal>
            </div>

            <Reveal dir="up">
              <div className="dt8-emergency">
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: "1.5rem" }}>🚨</span>
                  <div>
                    <p style={{ fontWeight: 700, color: "rgba(0,20,20,0.9)", fontSize: 15 }}>24/7 Emergency Line</p>
                    <p style={{ color: "rgba(0,20,20,0.55)", fontSize: 12 }}>{emergencyAvailability || "Immediate response for all medical emergencies"}</p>
                  </div>
                </div>
                <a href={`tel:${displayEmergency}`} className="dt8-btn-dark" style={{ flexShrink: 0, whiteSpace: "nowrap" }}>
                  Call {displayEmergency}
                </a>
              </div>
            </Reveal>

            <div className="dt8-contact-grid">
              <Stagger style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { icon: "📍", label: "Address", val: displayAddress },
                  { icon: "📞", label: "Phone", val: displayPhone },
                  { icon: "✉️", label: "Email", val: displayEmail },
                  ...(whatsappNumber ? [{ icon: "💬", label: "WhatsApp", val: whatsappNumber }] : []),
                  ...(ambulanceNumber ? [{ icon: "🚑", label: "Ambulance", val: ambulanceNumber }] : []),
                ].map((item, i) => (
                  <motion.div key={i} variants={fromLeft(i * 0.08)} className="dt8-contact-card">
                    <div className="dt8-contact-icon">{item.icon}</div>
                    <div>
                      <p className="dt8-contact-lbl">{item.label}</p>
                      <p className="dt8-contact-val">{item.val}</p>
                    </div>
                  </motion.div>
                ))}
                {whatsappNumber && (
                  <Reveal dir="left">
                    <a
                      href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
                      target="_blank" rel="noopener noreferrer"
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#25d366", color: "#fff", borderRadius: 10, padding: "14px", fontWeight: 700, fontSize: 14, textDecoration: "none" }}
                    >
                      💬 Chat on WhatsApp
                    </a>
                  </Reveal>
                )}
              </Stagger>

              <Reveal dir="right">
                <div className="dt8-map-wrap">
                  {googleMapsEmbed ? (
                    <iframe src={googleMapsEmbed} style={{ width: "100%", height: "100%", minHeight: 340, border: "none" }} allowFullScreen loading="lazy" title="Location" />
                  ) : (
                    <div className="dt8-map-placeholder">
                      <div style={{ fontSize: "3rem", marginBottom: 12 }}>🗺️</div>
                      <p style={{ fontWeight: 600, fontSize: 14, color: "rgba(255,255,255,0.5)" }}>Map will appear here</p>
                      <p style={{ fontSize: 12, marginTop: 4 }}>Add a Google Maps embed link</p>
                    </div>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══ FOOTER ══ */}
        <footer className="dt8-footer">
          <div className="dt8-footer-top">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div className="dt8-logo-cross" style={{ width: 28, height: 28, borderRadius: 6, flexShrink: 0 }}>
                  <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 16, height: 16 }}>
                    <rect x="7" y="1" width="4" height="16" rx="2" fill="white" />
                    <rect x="1" y="7" width="16" height="4" rx="2" fill="white" />
                  </svg>
                </div>
                <span style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 700, color: "#fff", fontSize: "1.25rem" }}>{displayName}</span>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.8, color: "rgba(255,255,255,0.38)", maxWidth: 280, marginBottom: 6 }}>
                Delivering extraordinary medical care with precision, compassion, and integrity.
              </p>
              <div className="dt8-social-row">
                {["f", "𝕏", "📷", "in"].map((s, i) => (
                  <a key={i} href={socialLinks?.[["facebook", "twitter", "instagram", "linkedin"][i]] || "#"} className="dt8-social-btn">{s}</a>
                ))}
              </div>
            </div>

            <div>
              <p className="dt8-footer-heading">Navigation</p>
              {navLinks.map(({ href, label }) => (
                <a key={href} href={href} className="dt8-footer-link">{label}</a>
              ))}
            </div>

            <div>
              <p className="dt8-footer-heading">Services</p>
              {displayServices.slice(0, 5).map((s, i) => (
                <a key={i} href="#services" className="dt8-footer-link">{s.title || s.name}</a>
              ))}
            </div>

            <div>
              <p className="dt8-footer-heading">Contact</p>
              {[
                { icon: "📍", val: displayAddress },
                { icon: "📞", val: displayPhone },
                { icon: "✉", val: displayEmail },
              ].map((c, i) => (
                <p key={i} style={{ display: "flex", gap: 8, fontSize: 13, marginBottom: 10, color: "rgba(255,255,255,0.38)", alignItems: "flex-start" }}>
                  <span style={{ flexShrink: 0 }}>{c.icon}</span>
                  <span style={{ lineHeight: 1.5, wordBreak: "break-all" }}>{c.val}</span>
                </p>
              ))}
              {emergencyAvailability && (
                <p style={{ display: "flex", gap: 8, fontSize: 13, color: "var(--teal)" }}>
                  <span>🚨</span><span>{emergencyAvailability}</span>
                </p>
              )}
            </div>
          </div>

          {footerDisclaimer && (
            <div className="dt8-disclaimer">
              <strong style={{ color: "var(--teal)" }}>Medical Disclaimer: </strong>
              {footerDisclaimer}
            </div>
          )}

          <hr className="dt8-footer-divider" />
          <div className="dt8-footer-bottom">
            <p>{footerCopyright || `© ${new Date().getFullYear()} ${displayName}. All Rights Reserved.`}</p>
            <div style={{ display: "flex", gap: 20 }}>
              <a href="#" style={{ color: "rgba(255,255,255,0.25)", textDecoration: "none", fontSize: 12 }}>Privacy Policy</a>
              <a href="#" style={{ color: "rgba(255,255,255,0.25)", textDecoration: "none", fontSize: 12 }}>Terms of Service</a>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}