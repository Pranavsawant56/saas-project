"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

/*
 ╔══════════════════════════════════════════════════════╗
 ║   DOCTOR TEMPLATE 10 — "MERIDIAN MEDICAL"           ║
 ║   Concept: Clinical Institution / Hospital Grade     ║
 ║                                                      ║
 ║   Design Language: Structured Editorial Medical      ║
 ║   Grid: Asymmetrical architectural panels            ║
 ║   Typography: Playfair Display + IBM Plex Sans       ║
 ║                                                      ║
 ║   Colors:                                            ║
 ║   --navy        #0F4C81  (primary authority)         ║
 ║   --azure       #1E88E5  (secondary interactive)     ║
 ║   --teal        #00ACC1  (accent diagnostic)         ║
 ║   --ice         #F8FBFD  (background)                ║
 ║   --white       #FFFFFF  (surface)                   ║
 ║   --slate       #1B2A41  (text primary)              ║
 ║   --mist        #5C6B7A  (text secondary)            ║
 ║   --emerald     #2E7D32  (success/active)            ║
 ║   --border      #D9E3EC  (dividers)                  ║
 ║   --panel       #EBF2F8  (tinted surface)            ║
 ╚══════════════════════════════════════════════════════╝
*/

/* ─────── Animation presets ─────── */
const EASE_MEDICAL = [0.25, 0.46, 0.45, 0.94];
const EASE_CRISP = [0.16, 1, 0.3, 1];

const revealY = (delay = 0, distance = 32) => ({
  hidden: { opacity: 0, y: distance },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: EASE_MEDICAL } },
});
const revealX = (delay = 0, dir = -1) => ({
  hidden: { opacity: 0, x: dir * 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, delay, ease: EASE_CRISP } },
});
const revealScale = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay, ease: EASE_MEDICAL } },
});
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

/* ─────── Utility: Scroll-triggered reveal ─────── */
function InView({ children, className = "", variants, once = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-72px" });
  return (
    <motion.div ref={ref} className={className} initial="hidden" animate={inView ? "visible" : "hidden"} variants={variants}>
      {children}
    </motion.div>
  );
}

/* ─────── Section Label ─────── */
function SectionLabel({ children, light = false }) {
  return (
    <div className={`m10-label ${light ? "m10-label--light" : ""}`}>
      <span className="m10-label-line" />
      <span>{children}</span>
    </div>
  );
}

/* ─────── Credential Badge ─────── */
function CredBadge({ icon, title, sub }) {
  return (
    <div className="m10-cred-badge">
      <div className="m10-cred-icon">{icon}</div>
      <div>
        <p className="m10-cred-title">{title}</p>
        <p className="m10-cred-sub">{sub}</p>
      </div>
    </div>
  );
}

/* ─────── Animated counter ─────── */
function AnimCount({ target }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const num = parseInt((target + "").replace(/\D/g, "")) || 0;
    let cur = 0;
    const inc = Math.max(1, Math.ceil(num / 55));
    const t = setInterval(() => {
      cur = Math.min(cur + inc, num);
      setVal(cur);
      if (cur >= num) clearInterval(t);
    }, 20);
    return () => clearInterval(t);
  }, [inView, target]);
  return <span ref={ref}>{val}{(target + "").replace(/\d/g, "")}</span>;
}

/* ─────── Timeline item ─────── */
function TimelineItem({ year, title, description, isLast }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      className={`m10-timeline-item ${isLast ? "last" : ""}`}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE_MEDICAL }}
    >
      <div className="m10-timeline-year">{year}</div>
      <div className="m10-timeline-connector">
        <div className="m10-timeline-dot" />
        {!isLast && <div className="m10-timeline-line" />}
      </div>
      <div className="m10-timeline-content">
        <h4 className="m10-timeline-title">{title}</h4>
        <p className="m10-timeline-desc">{description}</p>
      </div>
    </motion.div>
  );
}

/* ─────── Department card ─────── */
function DeptCard({ dept, isActive, onClick }) {
  return (
    <button
      className={`m10-dept-tab ${isActive ? "active" : ""}`}
      onClick={onClick}
      type="button"
    >
      <span className="m10-dept-tab-icon">{dept.icon}</span>
      <span className="m10-dept-tab-name">{dept.title || dept.name}</span>
    </button>
  );
}

/* ─────── Appointment slot selector ─────── */
function AppointmentPanel({ schedule, phone }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const slots = ["09:00", "09:30", "10:00", "10:30", "11:00", "14:00", "14:30", "15:00", "15:30", "16:00"];
  const [selDay, setSelDay] = useState(0);
  const [selSlot, setSelSlot] = useState(null);
  const [selType, setSelType] = useState("In-Person");
  const unavailable = [1, 4, 7];

  return (
    <div className="m10-appt-panel">
      <div className="m10-appt-header">
        <span className="m10-appt-live-dot" />
        <span className="m10-appt-header-text">Live Availability</span>
      </div>
      <div className="m10-appt-type-row">
        {["In-Person", "Telehealth"].map(t => (
          <button key={t} className={`m10-appt-type-btn ${selType === t ? "active" : ""}`} onClick={() => setSelType(t)} type="button">{t}</button>
        ))}
      </div>
      <p className="m10-appt-section-label">Select a day</p>
      <div className="m10-appt-days">
        {days.map((d, i) => (
          <button key={d} className={`m10-appt-day ${selDay === i ? "active" : ""}`} onClick={() => { setSelDay(i); setSelSlot(null); }} type="button">
            <span className="m10-appt-day-name">{d}</span>
          </button>
        ))}
      </div>
      <p className="m10-appt-section-label">Available times</p>
      <div className="m10-appt-slots">
        {slots.map((s, i) => (
          <button
            key={s}
            className={`m10-appt-slot ${unavailable.includes(i) ? "unavail" : ""} ${selSlot === i ? "active" : ""}`}
            onClick={() => !unavailable.includes(i) && setSelSlot(i)}
            type="button"
            disabled={unavailable.includes(i)}
          >
            {s}
          </button>
        ))}
      </div>
      {selSlot !== null && (
        <motion.div
          className="m10-appt-confirm-row"
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
        >
          <div className="m10-appt-selected">
            <span className="m10-appt-sel-label">Selected:</span>
            <span className="m10-appt-sel-val">{days[selDay]} — {slots[selSlot]}</span>
            <span className="m10-appt-sel-type">{selType}</span>
          </div>
          <a href={`tel:${phone}`} className="m10-btn-primary m10-appt-cta-btn">Confirm Booking →</a>
        </motion.div>
      )}
      {selSlot === null && (
        <p className="m10-appt-hint">Select a time slot to confirm booking</p>
      )}
    </div>
  );
}

/* ─────── Patient record testimonial ─────── */
function PatientRecord({ item }) {
  const initials = (item.name || item.patientName || "P").split(" ").map(w => w[0]).join("").slice(0, 2);
  const colors = ["#0F4C81", "#1E88E5", "#00ACC1", "#2E7D32", "#5C6B7A"];
  const col = colors[(item.name || "P").charCodeAt(0) % colors.length];
  return (
    <div className="m10-patient-record">
      <div className="m10-record-header">
        <div className="m10-record-avatar" style={{ background: col + "18", color: col, border: `1.5px solid ${col}30` }}>
          {initials}
        </div>
        <div className="m10-record-meta">
          <p className="m10-record-name">{item.name || item.patientName}</p>
          <p className="m10-record-role">Verified Patient</p>
        </div>
        <div className="m10-record-rating">
          {[...Array(item.rating || 5)].map((_, i) => (
            <span key={i} className="m10-star">★</span>
          ))}
        </div>
      </div>
      <div className="m10-record-divider" />
      <div className="m10-record-body">
        <span className="m10-record-tag">Patient Review</span>
        <p className="m10-record-text">{item.review || item.text}</p>
      </div>
      <div className="m10-record-footer">
        <span className="m10-record-verified">✓ Identity Verified</span>
        <span className="m10-record-dept">General Medicine</span>
      </div>
    </div>
  );
}

/* ─────── Clinic info dashboard row ─────── */
function InfoRow({ icon, label, value, highlight }) {
  return (
    <div className={`m10-info-row ${highlight ? "highlight" : ""}`}>
      <div className="m10-info-icon-wrap">
        <span className="m10-info-icon">{icon}</span>
      </div>
      <div className="m10-info-content">
        <p className="m10-info-label">{label}</p>
        <p className="m10-info-value">{value}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════ */
export default function DoctorTemplate10({ data }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDept, setActiveDept] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Auto-rotate testimonials */
  const tLen = useRef(0);
  useEffect(() => {
    if (!tLen.current) return;
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % tLen.current), 6000);
    return () => clearInterval(t);
  }, []);

  /* ── Data destructuring with defaults ── */
  const {
    clinicName, heroTitle, specialty, heroImage, bio, aboutUsTitle, aboutImage,
    education, experience, contactEmail, phone, countryCode, address,
    workingHours, headerType, logoUrl, tagline, heroDescription, qualification,
    certifications, languagesSpoken, hospitalName, whyChooseUs, schedule,
    stats, testimonials, teamDoctors, faqs, insurancePartners,
    googleMapsEmbed, emergencyContact, whatsappNumber, footerDisclaimer,
    emergencyAvailability, ambulanceNumber, footerCopyright, socialLinks,
    enableBlog, blogSectionTitle, blogSubtitle, services,
  } = data || {};

  const phone$ = `${countryCode ? countryCode.split(" ")[0] : ""}${phone || "800 MED CARE"}`;
  const email$ = contactEmail || "appointments@meridian.health";
  const address$ = address || "Suite 400, Medical Plaza, New York, NY 10001";
  const name$ = clinicName || "Meridian Medical";
  const emergency$ = emergencyContact || phone$;

  /* ── Defaults ── */
  const svcs = services?.length ? services : [
    { icon: "🫀", title: "Cardiology", description: "Advanced cardiac diagnostics, interventional cardiology, electrophysiology, and heart failure management by fellowship-trained cardiologists." },
    { icon: "🧠", title: "Neurology", description: "Comprehensive evaluation and treatment of neurological disorders including stroke, epilepsy, multiple sclerosis, and movement disorders." },
    { icon: "🦴", title: "Orthopedics", description: "Minimally invasive joint replacement, sports medicine, spine surgery, and comprehensive musculoskeletal rehabilitation programs." },
    { icon: "🩻", title: "Radiology", description: "State-of-the-art 3T MRI, 256-slice CT, PET-CT, and real-time ultrasound with teleradiology and AI-assisted interpretation." },
    { icon: "🔬", title: "Oncology", description: "Multidisciplinary cancer care combining precision diagnostics, immunotherapy, targeted therapy, and supportive palliative services." },
    { icon: "👁️", title: "Ophthalmology", description: "Complete vision care from routine exams to complex retinal surgery, cataract removal, glaucoma management, and LASIK correction." },
  ];

  const stats$ = stats?.length ? stats : [
    { value: "28+", label: "Years of Excellence" },
    { value: "42K+", label: "Patients Served" },
    { value: "99%", label: "Patient Satisfaction" },
    { value: "120+", label: "Specialist Physicians" },
  ];

  const testimonials$ = testimonials?.length ? testimonials : [
    { name: "Eleanor Hartfield", review: "The level of care at Meridian is extraordinary. My cardiologist took over an hour to explain every detail of my diagnosis and treatment plan. I've never felt more confident about my health decisions.", rating: 5 },
    { name: "Dr. Samuel Osei", review: "As a physician myself, I have high standards for healthcare. Meridian consistently exceeds them — the diagnostic accuracy, interdisciplinary coordination, and patient communication are all best-in-class.", rating: 5 },
    { name: "Maria Constanza", review: "After struggling with a complex neurological condition for years, Meridian's team finally gave me answers and a path forward. The compassion and expertise here are unmatched.", rating: 5 },
    { name: "James Whitmore", review: "From scheduling through discharge, every touchpoint was seamless and professional. The facilities are pristine, staff genuinely attentive. Worth every moment of the drive here.", rating: 5 },
  ];
  tLen.current = testimonials$.length;

  const team$ = teamDoctors?.length ? teamDoctors : [
    { name: "Dr. Priya Sharma", specialization: "Cardiology", experience: "18 Years", qualification: "MD, FACC" },
    { name: "Dr. Marcus Chen", specialization: "Neurology", experience: "14 Years", qualification: "MD, PhD, FAAN" },
    { name: "Dr. Sofia Andersson", specialization: "Oncology", experience: "12 Years", qualification: "MD, FASCO" },
    { name: "Dr. Ibrahim Al-Rashid", specialization: "Orthopedics", experience: "16 Years", qualification: "MD, FAAOS" },
    { name: "Dr. Camille Dubois", specialization: "Radiology", experience: "11 Years", qualification: "MD, ABR" },
    { name: "Dr. Kenji Yamamoto", specialization: "Ophthalmology", experience: "13 Years", qualification: "MD, FACS" },
  ];

  const faqs$ = faqs?.length ? faqs : [
    { question: "How do I schedule my first appointment?", answer: "You can book directly through our live scheduling panel above, call our care coordination line, or visit our admissions desk. New patients typically receive same-week appointments." },
    { question: "Do you accept my insurance plan?", answer: "Meridian Medical is in-network with most major insurance carriers including Blue Cross Blue Shield, Aetna, Cigna, UnitedHealthcare, and Medicare. Our billing team can verify your specific benefits prior to your visit." },
    { question: "What should I bring to my consultation?", answer: "Please bring a valid government-issued ID, your insurance card, a list of current medications, any prior diagnostic imaging on CD or digital transfer, and referral documentation if required by your plan." },
    { question: "Is there emergency care available after hours?", answer: "Our 24/7 emergency line connects you directly with an on-call physician. For life-threatening emergencies, please call 911 or proceed to the nearest emergency department." },
    { question: "How long does a typical specialist consultation take?", answer: "Initial specialist consultations are scheduled for 45–60 minutes. This allows sufficient time for a thorough medical history review, physical examination, and diagnostic planning discussion." },
  ];

  const insurance$ = insurancePartners?.length ? insurancePartners : [
    { name: "Blue Cross Blue Shield" }, { name: "Aetna" }, { name: "Cigna" },
    { name: "UnitedHealthcare" }, { name: "Medicare" }, { name: "Humana" },
    { name: "Anthem" }, { name: "Kaiser" },
  ];

  const sched$ = schedule?.length ? schedule : [
    { day: "Monday – Thursday", open: "7:00 AM", close: "8:00 PM" },
    { day: "Friday", open: "7:00 AM", close: "6:00 PM" },
    { day: "Saturday", open: "8:00 AM", close: "4:00 PM" },
    { day: "Sunday", open: "Closed", close: "" },
  ];

  const timeline = [
    { year: qualification || education ? "Education" : "1996", title: qualification || education || "MD, Harvard Medical School", description: "Graduated top of class with dual specialization." },
    { year: "Residency", title: `${hospitalName || "Johns Hopkins Hospital"}`, description: "Completed residency training in Internal Medicine and subspecialty fellowship." },
    { year: certifications ? "Board Certs" : "2003", title: certifications || "Board Certified Specialist", description: "National board certification with ongoing CME compliance." },
    { year: "Present", title: `${experience || "20"}+ Years of Practice`, description: "Continuously advancing care through research and clinical innovation." },
  ];

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#team", label: "Our Team" },
    { href: "#patients", label: "Patients" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        :root {
          --navy:    #0F4C81;
          --azure:   #1E88E5;
          --teal:    #00ACC1;
          --ice:     #F8FBFD;
          --white:   #FFFFFF;
          --slate:   #1B2A41;
          --mist:    #5C6B7A;
          --emerald: #2E7D32;
          --border:  #D9E3EC;
          --panel:   #EBF2F8;
          --panel2:  #F0F7FF;
          --danger:  #C62828;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        .m10 {
          font-family: 'IBM Plex Sans', system-ui, sans-serif;
          color: var(--slate);
          background: var(--ice);
          overflow-x: hidden;
          line-height: 1.6;
        }

        /* ── Typography ── */
        .m10-display {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 500;
          line-height: 1.08;
          letter-spacing: -0.015em;
        }
        .m10-serif { font-family: 'Playfair Display', serif; }
        .m10-mono { font-family: 'IBM Plex Mono', monospace; }

        /* ── Layout ── */
        .m10-wrap { max-width: 1380px; margin: 0 auto; padding: 0 28px; }
        @media (min-width: 768px) { .m10-wrap { padding: 0 56px; } }
        @media (min-width: 1200px) { .m10-wrap { padding: 0 80px; } }
        .m10-section { padding: 96px 0; }
        @media (min-width: 768px) { .m10-section { padding: 120px 0; } }

        /* ── Section Label ── */
        .m10-label {
          display: inline-flex; align-items: center; gap: 12px;
          margin-bottom: 16px;
        }
        .m10-label-line {
          display: block; width: 28px; height: 2px; background: var(--teal); flex-shrink: 0;
        }
        .m10-label span:last-child {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px; font-weight: 500;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--teal);
        }
        .m10-label--light .m10-label-line { background: rgba(0,172,193,0.7); }
        .m10-label--light span:last-child { color: rgba(0,172,193,0.85); }

        /* ── Buttons ── */
        .m10-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--navy); color: #fff;
          padding: 13px 26px; font-family: 'IBM Plex Sans', sans-serif;
          font-size: 13px; font-weight: 600; letter-spacing: 0.03em;
          border: none; cursor: pointer; text-decoration: none;
          transition: background 0.2s, transform 0.15s;
          border-radius: 2px;
        }
        .m10-btn-primary:hover { background: #0d3f6e; transform: translateY(-1px); }

        .m10-btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: var(--navy);
          padding: 12px 24px; font-family: 'IBM Plex Sans', sans-serif;
          font-size: 13px; font-weight: 600; letter-spacing: 0.03em;
          border: 1.5px solid var(--navy); cursor: pointer; text-decoration: none;
          transition: background 0.2s, color 0.2s;
          border-radius: 2px;
        }
        .m10-btn-secondary:hover { background: var(--navy); color: #fff; }

        .m10-btn-teal {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--teal); color: #fff;
          padding: 13px 26px; font-family: 'IBM Plex Sans', sans-serif;
          font-size: 13px; font-weight: 600; letter-spacing: 0.03em;
          border: none; cursor: pointer; text-decoration: none;
          transition: background 0.2s;
          border-radius: 2px;
        }
        .m10-btn-teal:hover { background: #0097a7; }

        /* ════════════════════════════
           TOPBAR
        ════════════════════════════ */
        .m10-topbar {
          background: var(--slate); color: rgba(255,255,255,0.65);
          font-size: 11.5px; padding: 9px 28px;
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 8px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        @media (min-width: 768px) { .m10-topbar { padding: 9px 56px; } }
        .m10-topbar-left, .m10-topbar-right { display: flex; gap: 24px; align-items: center; flex-wrap: wrap; }
        .m10-topbar-item { display: flex; align-items: center; gap: 7px; }
        .m10-topbar-icon { color: var(--teal); font-size: 13px; }
        .m10-topbar-emerg { color: #ef9a9a; font-weight: 600; letter-spacing: 0.03em; }
        .m10-topbar-dot { width: 4px; height: 4px; border-radius: 50%; background: rgba(255,255,255,0.2); }

        /* ════════════════════════════
           NAVBAR
        ════════════════════════════ */
        .m10-nav {
          position: sticky; top: 0; z-index: 100;
          transition: all 0.3s ease;
        }
        .m10-nav-base {
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
        }
        .m10-nav-scrolled {
          background: rgba(255,255,255,0.98);
          border-bottom: 2px solid var(--navy);
          box-shadow: 0 4px 24px rgba(15,76,129,0.08);
        }
        .m10-nav-inner {
          max-width: 1380px; margin: 0 auto; padding: 0 28px;
          height: 68px; display: flex; justify-content: space-between; align-items: center;
        }
        @media (min-width: 768px) { .m10-nav-inner { padding: 0 56px; } }
        @media (min-width: 1200px) { .m10-nav-inner { padding: 0 80px; } }

        /* Logo */
        .m10-logo { display: flex; align-items: center; gap: 14px; text-decoration: none; }
        .m10-logo-emblem {
          width: 38px; height: 38px; background: var(--navy);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .m10-logo-cross {
          width: 16px; height: 16px; position: relative;
        }
        .m10-logo-cross::before, .m10-logo-cross::after {
          content: ''; position: absolute; background: #fff; border-radius: 1px;
        }
        .m10-logo-cross::before { width: 4px; height: 16px; top: 0; left: 6px; }
        .m10-logo-cross::after  { width: 16px; height: 4px; top: 6px; left: 0; }
        .m10-logo-text { display: flex; flex-direction: column; gap: 1px; }
        .m10-logo-name {
          font-family: 'IBM Plex Sans', sans-serif; font-size: 17px;
          font-weight: 600; color: var(--slate); line-height: 1; letter-spacing: -0.01em;
        }
        .m10-logo-sub {
          font-family: 'IBM Plex Mono', monospace; font-size: 8.5px;
          font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--teal); line-height: 1;
        }

        /* Nav links */
        .m10-nav-links {
          display: none; align-items: center; gap: 6px;
        }
        @media (min-width: 1024px) { .m10-nav-links { display: flex; } }
        .m10-nav-link {
          font-family: 'IBM Plex Sans', sans-serif; font-size: 13px; font-weight: 500;
          color: var(--mist); text-decoration: none; padding: 8px 14px;
          letter-spacing: 0.01em; transition: color 0.2s; border-radius: 2px;
          position: relative;
        }
        .m10-nav-link:hover { color: var(--navy); }
        .m10-nav-link::after {
          content: ''; position: absolute; bottom: 4px; left: 14px; right: 14px;
          height: 1.5px; background: var(--navy); transform: scaleX(0);
          transition: transform 0.22s; transform-origin: center;
        }
        .m10-nav-link:hover::after { transform: scaleX(1); }
        .m10-nav-cta { margin-left: 8px; }

        /* Hamburger */
        .m10-hamburger {
          display: flex; flex-direction: column; gap: 5px;
          background: none; border: 1.5px solid var(--border);
          padding: 10px 11px; cursor: pointer; border-radius: 2px;
        }
        @media (min-width: 1024px) { .m10-hamburger { display: none; } }
        .m10-ham-bar { width: 18px; height: 1.5px; background: var(--slate); transition: all 0.2s; display: block; }

        /* Mobile menu */
        .m10-mobile-nav {
          background: var(--white); border-top: 1px solid var(--border);
          box-shadow: 0 8px 24px rgba(15,76,129,0.08);
        }
        .m10-mobile-nav-inner { padding: 20px 28px; display: flex; flex-direction: column; gap: 0; }
        .m10-mobile-link {
          font-family: 'IBM Plex Sans', sans-serif; font-size: 14px; font-weight: 500;
          color: var(--slate); text-decoration: none; padding: 13px 0;
          border-bottom: 1px solid var(--border); display: flex;
          justify-content: space-between; align-items: center;
          transition: color 0.2s;
        }
        .m10-mobile-link:hover { color: var(--navy); }
        .m10-mobile-link:last-of-type { border-bottom: none; }

        /* ════════════════════════════
           HERO — ARCHITECTURAL SPLIT
        ════════════════════════════ */
        .m10-hero {
          min-height: 100vh; background: var(--white);
          display: grid;
          grid-template-columns: 1fr;
          position: relative; overflow: hidden;
        }
        @media (min-width: 1100px) {
          .m10-hero { grid-template-columns: 52% 48%; min-height: 92vh; }
        }

        /* Left content panel */
        .m10-hero-left {
          background: var(--white); position: relative; z-index: 2;
          display: flex; flex-direction: column; justify-content: center;
          padding: 80px 56px 80px 80px;
        }
        @media (max-width: 1199px) { .m10-hero-left { padding: 72px 28px; align-items: center; text-align: center; } }
        @media (max-width: 768px) { .m10-hero-left { padding: 56px 20px; } }

        .m10-hero-rule {
          display: flex; align-items: center; gap: 16px; margin-bottom: 28px;
        }
        @media (max-width: 1199px) { .m10-hero-rule { justify-content: center; } }
        .m10-hero-rule-line { width: 40px; height: 2px; background: var(--teal); }
        .m10-hero-rule-text {
          font-family: 'IBM Plex Mono', monospace; font-size: 10px; font-weight: 500;
          letter-spacing: 0.22em; text-transform: uppercase; color: var(--teal);
        }

        .m10-hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.8rem, 5.5vw, 4.8rem);
          font-weight: 500; line-height: 1.06;
          color: var(--slate); margin-bottom: 10px;
          letter-spacing: -0.02em;
        }
        .m10-hero-title-em {
          font-style: italic; color: var(--navy); display: block;
        }

        .m10-hero-specialty {
          font-family: 'IBM Plex Sans', sans-serif; font-size: 15px;
          font-weight: 500; color: var(--azure); margin-bottom: 22px;
          letter-spacing: 0.01em;
        }

        .m10-hero-tagline {
          font-size: 15px; color: var(--mist); line-height: 1.8;
          max-width: 480px; margin-bottom: 36px;
        }
        @media (max-width: 1199px) { .m10-hero-tagline { margin: 0 auto 36px; } }

        .m10-hero-ctas { display: flex; flex-wrap: wrap; gap: 14px; margin-bottom: 52px; }
        @media (max-width: 1199px) { .m10-hero-ctas { justify-content: center; } }

        /* Trust strip */
        .m10-trust-strip {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 0; border-top: 1px solid var(--border);
          padding-top: 36px; max-width: 480px;
        }
        @media (max-width: 1199px) { .m10-trust-strip { margin: 0 auto; } }
        @media (max-width: 480px) { .m10-trust-strip { grid-template-columns: 1fr; } }
        .m10-trust-item {
          padding: 0 20px 0 0; border-right: 1px solid var(--border);
        }
        .m10-trust-item:last-child { border-right: none; padding-right: 0; }
        @media (max-width: 480px) { .m10-trust-item { border-right: none; border-bottom: 1px solid var(--border); padding: 14px 0; } }
        .m10-trust-val {
          font-family: 'Playfair Display', serif; font-size: 2rem;
          font-weight: 600; color: var(--navy); line-height: 1;
        }
        .m10-trust-lbl {
          font-family: 'IBM Plex Mono', monospace; font-size: 9px;
          font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--mist); margin-top: 5px;
        }

        /* Right image panel */
        .m10-hero-right {
          position: relative; overflow: hidden; min-height: 480px;
          background: var(--panel);
        }

        /* Vertical text accent */
        .m10-hero-vtxt {
          position: absolute; right: 24px; top: 50%; transform: translateY(-50%) rotate(90deg);
          font-family: 'IBM Plex Mono', monospace; font-size: 9px; font-weight: 500;
          letter-spacing: 0.28em; text-transform: uppercase; color: rgba(15,76,129,0.25);
          white-space: nowrap; z-index: 4; transform-origin: center;
        }

        /* Accreditation box */
        .m10-hero-accred {
          position: absolute; bottom: 36px; left: 36px; z-index: 5;
          background: var(--white); border: 1px solid var(--border);
          padding: 16px 20px; max-width: 240px;
          box-shadow: 0 8px 32px rgba(15,76,129,0.1);
        }
        .m10-hero-accred-title {
          font-family: 'IBM Plex Mono', monospace; font-size: 8px; font-weight: 500;
          letter-spacing: 0.2em; text-transform: uppercase; color: var(--teal);
          margin-bottom: 6px;
        }
        .m10-hero-accred-name {
          font-family: 'Playfair Display', serif; font-size: 13px;
          font-weight: 500; color: var(--slate); line-height: 1.4;
        }
        .m10-hero-accred-row {
          display: flex; align-items: center; gap: 8px; margin-top: 10px;
        }
        .m10-hero-accred-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--emerald); flex-shrink: 0; }
        .m10-hero-accred-status {
          font-family: 'IBM Plex Sans', sans-serif; font-size: 10.5px;
          font-weight: 500; color: var(--emerald);
        }

        /* Diagonal navy accent bar */
        .m10-hero-navy-bar {
          position: absolute; top: 0; left: 0; width: 6px; height: 100%;
          background: var(--navy); z-index: 3;
        }

        /* ════════════════════════════
           METRICS BAND
        ════════════════════════════ */
        .m10-metrics { background: var(--navy); }
        .m10-metrics-grid {
          display: grid; grid-template-columns: repeat(2, 1fr);
          max-width: 1380px; margin: 0 auto;
        }
        @media (min-width: 640px) { .m10-metrics-grid { grid-template-columns: repeat(4, 1fr); } }
        .m10-metric-cell {
          padding: 44px 40px; border-right: 1px solid rgba(255,255,255,0.08);
          position: relative; overflow: hidden;
        }
        .m10-metric-cell:nth-child(2n) { border-right: none; }
        @media (min-width: 640px) {
          .m10-metric-cell { border-right: 1px solid rgba(255,255,255,0.08); }
          .m10-metric-cell:last-child { border-right: none; }
        }
        .m10-metric-cell::after {
          content: ''; position: absolute; top: 0; left: 0; width: 3px; height: 100%;
          background: var(--teal); opacity: 0; transition: opacity 0.2s;
        }
        .m10-metric-cell:hover::after { opacity: 1; }
        .m10-metric-val {
          font-family: 'Playfair Display', serif; font-size: clamp(2.2rem, 4vw, 3rem);
          font-weight: 600; color: #fff; line-height: 1; margin-bottom: 8px;
        }
        .m10-metric-lbl {
          font-family: 'IBM Plex Mono', monospace; font-size: 9px;
          font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(255,255,255,0.45);
        }

        /* ════════════════════════════
           ABOUT — TIMELINE
        ════════════════════════════ */
        .m10-about-bg { background: var(--white); }
        .m10-about-grid {
          display: grid; grid-template-columns: 1fr; gap: 72px; align-items: start;
        }
        @media (min-width: 1024px) { .m10-about-grid { grid-template-columns: 48fr 52fr; gap: 96px; align-items: center; } }

        .m10-about-img-wrap {
          position: relative; max-width: 520px;
        }
        @media (max-width: 1023px) { .m10-about-img-wrap { margin: 0 auto; } }
        .m10-about-img-frame {
          position: relative; aspect-ratio: 4/5; overflow: hidden;
          border: 1px solid var(--border);
        }
        .m10-about-img-frame::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0;
          height: 4px; background: var(--navy); z-index: 2;
        }
        .m10-about-bracket-tl {
          position: absolute; top: -10px; left: -10px; width: 36px; height: 36px;
          border-top: 2px solid var(--teal); border-left: 2px solid var(--teal); z-index: 3;
        }
        .m10-about-bracket-br {
          position: absolute; bottom: -10px; right: -10px; width: 36px; height: 36px;
          border-bottom: 2px solid var(--teal); border-right: 2px solid var(--teal); z-index: 3;
        }
        .m10-about-exp-badge {
          position: absolute; bottom: -24px; right: -24px;
          background: var(--navy); padding: 20px 24px; z-index: 4;
        }
        .m10-about-exp-num {
          font-family: 'Playfair Display', serif; font-size: 2.6rem;
          font-weight: 600; color: #fff; line-height: 1;
        }
        .m10-about-exp-lbl {
          font-family: 'IBM Plex Mono', monospace; font-size: 8px; font-weight: 500;
          letter-spacing: 0.2em; text-transform: uppercase; color: var(--teal);
          margin-top: 4px;
        }

        /* Credential badges */
        .m10-cred-badges { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 28px 0 36px; }
        .m10-cred-badge {
          display: flex; align-items: center; gap: 12px;
          background: var(--panel); border: 1px solid var(--border);
          padding: 12px 14px; border-left: 3px solid var(--navy);
          transition: border-color 0.2s, background 0.2s;
        }
        .m10-cred-badge:hover { border-left-color: var(--teal); background: var(--panel2); }
        .m10-cred-icon { font-size: 1.3rem; flex-shrink: 0; }
        .m10-cred-title {
          font-family: 'IBM Plex Sans', sans-serif; font-size: 11.5px;
          font-weight: 600; color: var(--slate); line-height: 1.3;
        }
        .m10-cred-sub {
          font-family: 'IBM Plex Sans', sans-serif; font-size: 10.5px;
          color: var(--mist); margin-top: 2px; line-height: 1.3;
        }

        /* ════════════════════════════
           TIMELINE
        ════════════════════════════ */
        .m10-timeline { display: flex; flex-direction: column; gap: 0; padding-bottom: 8px; }
        .m10-timeline-item {
          display: grid; grid-template-columns: 72px 24px 1fr;
          gap: 0 16px; align-items: start; padding-bottom: 32px;
        }
        .m10-timeline-item.last { padding-bottom: 0; }
        .m10-timeline-year {
          font-family: 'IBM Plex Mono', monospace; font-size: 9.5px;
          font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--teal); padding-top: 3px; text-align: right; padding-right: 4px;
        }
        .m10-timeline-connector {
          display: flex; flex-direction: column; align-items: center; position: relative;
        }
        .m10-timeline-dot {
          width: 10px; height: 10px; border-radius: 50%; background: var(--navy);
          border: 2px solid var(--white); box-shadow: 0 0 0 2px var(--navy);
          flex-shrink: 0; z-index: 1;
        }
        .m10-timeline-line {
          width: 1px; flex: 1; min-height: 40px; background: var(--border); margin-top: 6px;
        }
        .m10-timeline-title {
          font-family: 'Playfair Display', serif; font-size: 15px; font-weight: 500;
          color: var(--slate); margin-bottom: 4px;
        }
        .m10-timeline-desc {
          font-family: 'IBM Plex Sans', sans-serif; font-size: 12.5px;
          color: var(--mist); line-height: 1.65;
        }

        /* ════════════════════════════
           SERVICES — DEPT NAVIGATION
        ════════════════════════════ */
        .m10-services-bg {
          background: var(--panel);
          border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
        }
        .m10-dept-layout {
          display: grid; grid-template-columns: 1fr; gap: 0;
          border: 1px solid var(--border); background: var(--white);
        }
        @media (min-width: 960px) { .m10-dept-layout { grid-template-columns: 280px 1fr; } }

        /* Department tabs */
        .m10-dept-tabs {
          border-right: 1px solid var(--border);
          background: var(--white);
        }
        @media (max-width: 959px) { .m10-dept-tabs { border-right: none; border-bottom: 1px solid var(--border); display: flex; overflow-x: auto; } }
        .m10-dept-tab {
          display: flex; align-items: center; gap: 14px; padding: 18px 22px;
          background: transparent; border: none; cursor: pointer; width: 100%;
          text-align: left; border-bottom: 1px solid var(--border);
          transition: background 0.18s; position: relative;
        }
        @media (max-width: 959px) { .m10-dept-tab { border-bottom: none; white-space: nowrap; flex-shrink: 0; min-width: 140px; justify-content: center; flex-direction: column; gap: 6px; border-right: 1px solid var(--border); } }
        .m10-dept-tab:last-child { border-bottom: none; }
        .m10-dept-tab::before {
          content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
          background: var(--navy); opacity: 0; transition: opacity 0.18s;
        }
        @media (max-width: 959px) { .m10-dept-tab::before { width: 100%; height: 2px; bottom: 0; top: auto; left: 0; } }
        .m10-dept-tab.active { background: var(--panel2); }
        .m10-dept-tab.active::before { opacity: 1; }
        .m10-dept-tab-icon { font-size: 1.4rem; flex-shrink: 0; }
        .m10-dept-tab-name {
          font-family: 'IBM Plex Sans', sans-serif; font-size: 13px; font-weight: 500;
          color: var(--mist); transition: color 0.18s; letter-spacing: 0.01em;
        }
        .m10-dept-tab.active .m10-dept-tab-name { color: var(--navy); font-weight: 600; }

        /* Department detail */
        .m10-dept-detail-wrap {
          padding: 52px 56px; display: flex; align-items: center; min-height: 400px;
        }
        @media (max-width: 768px) { .m10-dept-detail-wrap { padding: 36px 28px; } }
        .m10-dept-icon-hero { font-size: 3.6rem; margin-bottom: 20px; display: block; }
        .m10-dept-index {
          font-family: 'IBM Plex Mono', monospace; font-size: 9px; font-weight: 500;
          letter-spacing: 0.2em; text-transform: uppercase; color: var(--teal);
          margin-bottom: 8px;
        }
        .m10-dept-title {
          font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 500;
          color: var(--slate); margin-bottom: 14px; line-height: 1.15;
        }
        .m10-dept-desc {
          font-family: 'IBM Plex Sans', sans-serif; font-size: 14.5px;
          color: var(--mist); line-height: 1.85; margin-bottom: 28px; max-width: 520px;
        }
        .m10-dept-features {
          display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 32px;
          max-width: 480px;
        }
        @media (max-width: 640px) { .m10-dept-features { grid-template-columns: 1fr; } }
        .m10-dept-feature {
          display: flex; align-items: center; gap: 9px;
          font-family: 'IBM Plex Sans', sans-serif; font-size: 12.5px;
          color: var(--mist); padding: 8px 12px; background: var(--panel);
          border: 1px solid var(--border);
        }
        .m10-dept-feat-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--emerald); flex-shrink: 0; }

        /* ════════════════════════════
           APPOINTMENT BOOKING
        ════════════════════════════ */
        .m10-appt-bg {
          background: var(--navy); position: relative; overflow: hidden;
        }
        .m10-appt-bg::before {
          content: ''; position: absolute; top: 0; right: 0;
          width: 40%; height: 100%; background: rgba(30,136,229,0.06);
          clip-path: polygon(15% 0, 100% 0, 100% 100%, 0% 100%);
        }
        .m10-appt-grid {
          display: grid; grid-template-columns: 1fr; gap: 64px; align-items: start;
          position: relative; z-index: 2;
        }
        @media (min-width: 1024px) { .m10-appt-grid { grid-template-columns: 1fr 1fr; align-items: center; } }

        .m10-appt-left {}
        .m10-appt-heading {
          font-family: 'Playfair Display', serif; font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 500; color: #fff; margin-bottom: 16px; line-height: 1.1;
        }
        .m10-appt-heading em { font-style: italic; color: rgba(0,172,193,0.9); }
        .m10-appt-sub {
          font-family: 'IBM Plex Sans', sans-serif; font-size: 14px;
          color: rgba(255,255,255,0.55); line-height: 1.8; margin-bottom: 32px;
          max-width: 400px;
        }
        .m10-appt-feature-list { display: flex; flex-direction: column; gap: 14px; }
        .m10-appt-feature {
          display: flex; align-items: flex-start; gap: 13px;
        }
        .m10-appt-feat-icon {
          width: 32px; height: 32px; background: rgba(0,172,193,0.12);
          border: 1px solid rgba(0,172,193,0.25); display: flex;
          align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0;
        }
        .m10-appt-feat-text { font-size: 13px; color: rgba(255,255,255,0.65); line-height: 1.6; padding-top: 6px; }
        .m10-appt-feat-title { font-weight: 600; color: rgba(255,255,255,0.85); }

        /* Booking panel */
        .m10-appt-panel {
          background: var(--white); border: 1px solid var(--border);
          padding: 32px; box-shadow: 0 16px 56px rgba(0,0,0,0.18);
        }
        .m10-appt-header {
          display: flex; align-items: center; gap: 9px; margin-bottom: 20px;
          padding-bottom: 16px; border-bottom: 1px solid var(--border);
        }
        .m10-appt-live-dot {
          width: 8px; height: 8px; border-radius: 50%; background: var(--emerald);
          box-shadow: 0 0 0 3px rgba(46,125,50,0.15);
          animation: m10pulse 2s infinite;
        }
        @keyframes m10pulse {
          0%, 100% { opacity: 1; } 50% { opacity: 0.5; }
        }
        .m10-appt-header-text {
          font-family: 'IBM Plex Mono', monospace; font-size: 10px; font-weight: 500;
          letter-spacing: 0.18em; text-transform: uppercase; color: var(--emerald);
        }
        .m10-appt-section-label {
          font-family: 'IBM Plex Mono', monospace; font-size: 9px; font-weight: 500;
          letter-spacing: 0.2em; text-transform: uppercase; color: var(--mist);
          margin-bottom: 10px; margin-top: 16px;
        }
        .m10-appt-type-row { display: flex; gap: 8px; margin-bottom: 4px; }
        .m10-appt-type-btn {
          flex: 1; padding: 9px 12px; background: var(--panel);
          border: 1.5px solid var(--border); cursor: pointer;
          font-family: 'IBM Plex Sans', sans-serif; font-size: 12.5px; font-weight: 500;
          color: var(--mist); transition: all 0.18s;
        }
        .m10-appt-type-btn.active { background: var(--navy); color: #fff; border-color: var(--navy); }
        .m10-appt-type-btn:not(.active):hover { border-color: var(--navy); color: var(--navy); }

        .m10-appt-days { display: grid; grid-template-columns: repeat(6, 1fr); gap: 6px; margin-bottom: 4px; }
        .m10-appt-day {
          padding: 8px 4px; background: var(--panel); border: 1.5px solid var(--border);
          cursor: pointer; text-align: center; transition: all 0.18s;
        }
        .m10-appt-day.active { background: var(--navy); border-color: var(--navy); }
        .m10-appt-day-name {
          font-family: 'IBM Plex Mono', monospace; font-size: 9.5px; font-weight: 500;
          letter-spacing: 0.06em; color: var(--mist); transition: color 0.18s;
        }
        .m10-appt-day.active .m10-appt-day-name { color: #fff; }
        .m10-appt-day:not(.active):hover { border-color: var(--azure); }
        .m10-appt-day:not(.active):hover .m10-appt-day-name { color: var(--navy); }

        .m10-appt-slots {
          display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; margin-bottom: 4px;
        }
        @media (max-width: 480px) { .m10-appt-slots { grid-template-columns: repeat(4, 1fr); } }
        .m10-appt-slot {
          padding: 9px 6px; background: var(--panel); border: 1.5px solid var(--border);
          cursor: pointer; text-align: center;
          font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 500;
          color: var(--mist); transition: all 0.18s; letter-spacing: 0.02em;
        }
        .m10-appt-slot.active { background: var(--teal); border-color: var(--teal); color: #fff; }
        .m10-appt-slot.unavail { opacity: 0.3; cursor: not-allowed; }
        .m10-appt-slot:not(.active):not(.unavail):hover { border-color: var(--teal); color: var(--teal); }

        .m10-appt-confirm-row {
          margin-top: 16px; padding: 14px 16px;
          background: var(--panel2); border: 1px solid var(--border);
          display: flex; flex-wrap: wrap; align-items: center;
          justify-content: space-between; gap: 12px;
        }
        .m10-appt-selected { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .m10-appt-sel-label {
          font-family: 'IBM Plex Mono', monospace; font-size: 9px; font-weight: 500;
          letter-spacing: 0.15em; text-transform: uppercase; color: var(--mist);
        }
        .m10-appt-sel-val {
          font-family: 'IBM Plex Sans', sans-serif; font-size: 13px; font-weight: 600; color: var(--navy);
        }
        .m10-appt-sel-type {
          font-family: 'IBM Plex Sans', sans-serif; font-size: 11px; font-weight: 500;
          background: var(--azure); color: #fff; padding: 2px 8px;
        }
        .m10-appt-cta-btn { padding: 10px 20px; font-size: 12px; }
        .m10-appt-hint {
          font-family: 'IBM Plex Sans', sans-serif; font-size: 11.5px; color: var(--mist);
          margin-top: 14px; font-style: italic;
        }

        /* ════════════════════════════
           PATIENT RECORDS TESTIMONIALS
        ════════════════════════════ */
        .m10-patients-bg { background: var(--white); }
        .m10-patient-record {
          background: var(--white); border: 1px solid var(--border);
          padding: 24px; transition: border-color 0.2s, box-shadow 0.2s;
        }
        .m10-patient-record:hover {
          border-color: var(--navy);
          box-shadow: 0 4px 24px rgba(15,76,129,0.08);
        }
        .m10-record-header {
          display: flex; align-items: center; gap: 14px; margin-bottom: 16px;
        }
        .m10-record-avatar {
          width: 44px; height: 44px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'IBM Plex Sans', sans-serif; font-size: 14px;
          font-weight: 600; flex-shrink: 0;
        }
        .m10-record-meta { flex: 1; min-width: 0; }
        .m10-record-name {
          font-family: 'IBM Plex Sans', sans-serif; font-size: 14px; font-weight: 600;
          color: var(--slate); line-height: 1.3;
        }
        .m10-record-role {
          font-family: 'IBM Plex Mono', monospace; font-size: 9px; font-weight: 500;
          letter-spacing: 0.16em; text-transform: uppercase; color: var(--mist); margin-top: 2px;
        }
        .m10-record-rating { display: flex; gap: 2px; }
        .m10-star { color: #f59e0b; font-size: 12px; }
        .m10-record-divider { height: 1px; background: var(--border); margin-bottom: 14px; }
        .m10-record-body {}
        .m10-record-tag {
          display: inline-block;
          font-family: 'IBM Plex Mono', monospace; font-size: 8.5px; font-weight: 500;
          letter-spacing: 0.2em; text-transform: uppercase; color: var(--navy);
          background: var(--panel2); border: 1px solid var(--border);
          padding: 3px 9px; margin-bottom: 10px;
        }
        .m10-record-text {
          font-family: 'Playfair Display', serif; font-size: 14px; font-style: italic;
          color: var(--mist); line-height: 1.8;
        }
        .m10-record-footer {
          display: flex; justify-content: space-between; align-items: center;
          margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--border);
        }
        .m10-record-verified {
          font-family: 'IBM Plex Sans', sans-serif; font-size: 10.5px; font-weight: 500;
          color: var(--emerald); display: flex; align-items: center; gap: 5px;
        }
        .m10-record-dept {
          font-family: 'IBM Plex Mono', monospace; font-size: 9px; font-weight: 500;
          letter-spacing: 0.14em; text-transform: uppercase; color: var(--mist);
        }

        /* Testimonial slider */
        .m10-tslider-wrap { max-width: 960px; margin: 0 auto; }
        .m10-tslider-nav {
          display: flex; justify-content: center; gap: 8px; margin-top: 28px;
        }
        .m10-tnav-btn {
          width: 36px; height: 36px; border: 1.5px solid var(--border);
          background: transparent; cursor: pointer; display: flex;
          align-items: center; justify-content: center;
          font-size: 15px; color: var(--mist); transition: all 0.2s;
        }
        .m10-tnav-btn:hover { border-color: var(--navy); color: var(--navy); }
        .m10-tnav-dots { display: flex; gap: 8px; align-items: center; flex: 0 0 auto; }
        .m10-tnav-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--border); border: none; cursor: pointer; padding: 0;
          transition: all 0.25s;
        }
        .m10-tnav-dot.active { background: var(--navy); transform: scale(1.3); }

        /* ════════════════════════════
           TEAM
        ════════════════════════════ */
        .m10-team-bg { background: var(--panel); border-top: 1px solid var(--border); }
        .m10-team-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 2px;
        }
        @media (min-width: 768px) { .m10-team-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 1200px) { .m10-team-grid { grid-template-columns: repeat(6, 1fr); } }
        .m10-team-card {
          background: var(--white); border: 1px solid var(--border);
          overflow: hidden; transition: border-color 0.22s; cursor: default;
          position: relative;
        }
        .m10-team-card:hover { border-color: var(--navy); }
        .m10-team-card:hover .m10-team-card-bar { width: 100%; }
        .m10-team-photo {
          aspect-ratio: 1; background: var(--panel2);
          display: flex; align-items: center; justify-content: center;
          font-size: 3.2rem; position: relative; overflow: hidden;
        }
        .m10-team-card-bar {
          height: 3px; background: var(--navy); width: 0; transition: width 0.4s ease;
        }
        .m10-team-info { padding: 14px 16px; }
        .m10-team-name {
          font-family: 'Playfair Display', serif; font-size: 13.5px; font-weight: 500;
          color: var(--slate); margin-bottom: 3px; line-height: 1.3;
        }
        .m10-team-spec {
          font-family: 'IBM Plex Mono', monospace; font-size: 8.5px; font-weight: 500;
          letter-spacing: 0.14em; text-transform: uppercase; color: var(--teal);
          margin-bottom: 5px;
        }
        .m10-team-qual {
          font-family: 'IBM Plex Sans', sans-serif; font-size: 11px;
          color: var(--mist); line-height: 1.4;
        }
        .m10-team-exp-tag {
          display: inline-block; background: var(--navy); color: #fff;
          font-family: 'IBM Plex Mono', monospace; font-size: 8px; font-weight: 500;
          letter-spacing: 0.1em; padding: 3px 8px; margin-top: 6px;
        }

        /* ════════════════════════════
           FAQ
        ════════════════════════════ */
        .m10-faq-bg { background: var(--white); }
        .m10-faq-grid {
          display: grid; grid-template-columns: 1fr; gap: 72px;
        }
        @media (min-width: 1024px) { .m10-faq-grid { grid-template-columns: 2fr 3fr; align-items: start; } }
        .m10-faq-item { border-bottom: 1px solid var(--border); }
        .m10-faq-q-btn {
          width: 100%; display: flex; justify-content: space-between; align-items: center;
          gap: 16px; padding: 20px 0; background: none; border: none; cursor: pointer; text-align: left;
        }
        .m10-faq-q-text {
          font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 500;
          color: var(--slate); line-height: 1.4; transition: color 0.2s;
        }
        .m10-faq-q-btn:hover .m10-faq-q-text { color: var(--navy); }
        .m10-faq-icon-wrap {
          width: 28px; height: 28px; min-width: 28px; border: 1.5px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          font-family: 'IBM Plex Sans', sans-serif; font-size: 18px; font-weight: 300;
          color: var(--navy); transition: background 0.2s, border-color 0.2s; line-height: 1;
        }
        .m10-faq-q-btn:hover .m10-faq-icon-wrap { background: var(--navy); border-color: var(--navy); color: #fff; }
        .m10-faq-a {
          font-family: 'IBM Plex Sans', sans-serif; font-size: 13.5px;
          color: var(--mist); line-height: 1.85; padding-bottom: 20px;
        }

        /* ════════════════════════════
           INSURANCE
        ════════════════════════════ */
        .m10-ins-bg { background: var(--panel); border-top: 1px solid var(--border); }
        .m10-ins-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr); gap: 2px;
        }
        @media (min-width: 480px) { .m10-ins-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (min-width: 768px) { .m10-ins-grid { grid-template-columns: repeat(8, 1fr); } }
        .m10-ins-card {
          background: var(--white); padding: 20px 12px; text-align: center;
          border: 1px solid var(--border);
          font-family: 'IBM Plex Sans', sans-serif; font-size: 11px; font-weight: 600;
          color: var(--mist); letter-spacing: 0.03em;
          transition: background 0.2s, color 0.2s, border-color 0.2s; cursor: default;
        }
        .m10-ins-card:hover { background: var(--navy); color: #fff; border-color: var(--navy); }

        /* ════════════════════════════
           CONTACT — CLINIC DASHBOARD
        ════════════════════════════ */
        .m10-contact-bg { background: var(--white); }
        .m10-contact-grid {
          display: grid; grid-template-columns: 1fr; gap: 48px;
        }
        @media (min-width: 1024px) { .m10-contact-grid { grid-template-columns: 1fr 1fr; gap: 64px; } }

        /* Info dashboard */
        .m10-info-panel {
          background: var(--white); border: 1px solid var(--border);
          overflow: hidden;
        }
        .m10-info-panel-header {
          background: var(--navy); padding: 18px 24px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .m10-info-panel-title {
          font-family: 'IBM Plex Mono', monospace; font-size: 9.5px; font-weight: 500;
          letter-spacing: 0.22em; text-transform: uppercase; color: rgba(255,255,255,0.7);
        }
        .m10-info-panel-status {
          display: flex; align-items: center; gap: 7px;
          font-family: 'IBM Plex Mono', monospace; font-size: 9px;
          font-weight: 500; color: #a5d6a7; letter-spacing: 0.12em; text-transform: uppercase;
        }
        .m10-info-panel-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--emerald); }
        .m10-info-row {
          display: flex; align-items: center; gap: 0;
          border-bottom: 1px solid var(--border); transition: background 0.15s;
        }
        .m10-info-row:last-child { border-bottom: none; }
        .m10-info-row:hover { background: var(--panel); }
        .m10-info-row.highlight { background: var(--panel2); }
        .m10-info-icon-wrap {
          width: 48px; min-width: 48px; height: 52px; display: flex;
          align-items: center; justify-content: center;
          border-right: 1px solid var(--border); background: var(--panel);
        }
        .m10-info-icon { font-size: 1.1rem; }
        .m10-info-content { padding: 12px 16px; flex: 1; }
        .m10-info-label {
          font-family: 'IBM Plex Mono', monospace; font-size: 8.5px; font-weight: 500;
          letter-spacing: 0.2em; text-transform: uppercase; color: var(--mist); margin-bottom: 3px;
        }
        .m10-info-value {
          font-family: 'IBM Plex Sans', sans-serif; font-size: 13px; font-weight: 500;
          color: var(--slate); line-height: 1.4;
        }

        /* Schedule table */
        .m10-schedule-panel {
          background: var(--white); border: 1px solid var(--border); margin-top: 20px;
        }
        .m10-sched-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 14px 20px; border-bottom: 1px solid var(--border);
          transition: background 0.15s;
        }
        .m10-sched-row:last-child { border-bottom: none; }
        .m10-sched-row:hover { background: var(--panel); }
        .m10-sched-day {
          font-family: 'IBM Plex Sans', sans-serif; font-size: 13px; font-weight: 500;
          color: var(--slate);
        }
        .m10-sched-time {
          display: flex; align-items: center; gap: 8px;
        }
        .m10-sched-open {
          font-family: 'IBM Plex Mono', monospace; font-size: 12px; font-weight: 500;
          color: var(--emerald);
        }
        .m10-sched-sep { color: var(--border); font-size: 12px; }
        .m10-sched-close {
          font-family: 'IBM Plex Mono', monospace; font-size: 12px; font-weight: 500;
          color: var(--mist);
        }
        .m10-sched-closed {
          font-family: 'IBM Plex Mono', monospace; font-size: 12px; font-weight: 500;
          color: #ef9a9a;
        }

        /* Map panel */
        .m10-map-panel {
          border: 1px solid var(--border); overflow: hidden; min-height: 380px;
          background: var(--panel2);
          display: flex; align-items: center; justify-content: center;
        }
        .m10-map-placeholder { text-align: center; padding: 48px 24px; }
        .m10-map-icon { font-size: 2.8rem; margin-bottom: 14px; opacity: 0.4; }
        .m10-map-text {
          font-family: 'IBM Plex Mono', monospace; font-size: 10px; font-weight: 500;
          letter-spacing: 0.2em; text-transform: uppercase; color: var(--mist);
        }

        /* Emergency strip */
        .m10-emergency-bar {
          background: var(--danger); padding: 14px 24px;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 12px; margin-bottom: 32px;
        }
        .m10-emerg-left { display: flex; align-items: center; gap: 12px; }
        .m10-emerg-icon { font-size: 1.3rem; }
        .m10-emerg-title {
          font-family: 'IBM Plex Sans', sans-serif; font-size: 13.5px;
          font-weight: 600; color: #fff; line-height: 1.3;
        }
        .m10-emerg-sub {
          font-family: 'IBM Plex Sans', sans-serif; font-size: 11.5px;
          color: rgba(255,255,255,0.7); margin-top: 1px;
        }
        .m10-emerg-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.15); color: #fff;
          border: 1.5px solid rgba(255,255,255,0.4); padding: 10px 20px;
          font-family: 'IBM Plex Sans', sans-serif; font-size: 12.5px; font-weight: 600;
          text-decoration: none; transition: background 0.2s; white-space: nowrap;
          letter-spacing: 0.02em;
        }
        .m10-emerg-btn:hover { background: rgba(255,255,255,0.25); }

        /* ════════════════════════════
           WHY CHOOSE
        ════════════════════════════ */
        .m10-why-bg { background: var(--slate); }
        .m10-why-grid {
          display: grid; grid-template-columns: 1fr;
        }
        @media (min-width: 640px) { .m10-why-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .m10-why-grid { grid-template-columns: repeat(4, 1fr); } }
        .m10-why-card {
          padding: 36px 28px; border-right: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          transition: background 0.25s;
        }
        .m10-why-card:hover { background: rgba(30,136,229,0.06); }
        .m10-why-card-num {
          font-family: 'IBM Plex Mono', monospace; font-size: 9px; font-weight: 500;
          letter-spacing: 0.2em; color: var(--teal); margin-bottom: 16px;
        }
        .m10-why-icon-circle {
          width: 48px; height: 48px; background: rgba(0,172,193,0.1);
          border: 1px solid rgba(0,172,193,0.2); display: flex;
          align-items: center; justify-content: center; font-size: 1.5rem;
          margin-bottom: 20px;
        }
        .m10-why-title {
          font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 500;
          color: #fff; margin-bottom: 10px; line-height: 1.3;
        }
        .m10-why-desc {
          font-family: 'IBM Plex Sans', sans-serif; font-size: 12.5px;
          color: rgba(255,255,255,0.45); line-height: 1.8;
        }

        /* ════════════════════════════
           FOOTER
        ════════════════════════════ */
        .m10-footer { background: var(--slate); color: rgba(255,255,255,0.5); }
        .m10-footer-top {
          max-width: 1380px; margin: 0 auto; padding: 72px 28px 48px;
          display: grid; grid-template-columns: 1fr; gap: 48px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        @media (min-width: 768px) { .m10-footer-top { padding: 72px 56px 48px; grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .m10-footer-top { padding: 72px 80px 48px; grid-template-columns: 2.5fr 1fr 1fr 1.5fr; } }
        .m10-footer-col-label {
          font-family: 'IBM Plex Mono', monospace; font-size: 8.5px; font-weight: 500;
          letter-spacing: 0.25em; text-transform: uppercase; color: var(--teal);
          margin-bottom: 18px;
        }
        .m10-footer-link {
          display: block; font-family: 'IBM Plex Sans', sans-serif; font-size: 13px;
          color: rgba(255,255,255,0.45); text-decoration: none; padding: 5px 0;
          transition: color 0.2s;
        }
        .m10-footer-link:hover { color: rgba(255,255,255,0.85); }
        .m10-footer-logo {
          display: flex; align-items: center; gap: 14px; margin-bottom: 16px;
        }
        .m10-footer-logo-emb {
          width: 34px; height: 34px; background: var(--navy);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .m10-footer-logo-name {
          font-family: 'IBM Plex Sans', sans-serif; font-size: 16px; font-weight: 600;
          color: rgba(255,255,255,0.9); line-height: 1;
        }
        .m10-footer-logo-sub {
          font-family: 'IBM Plex Mono', monospace; font-size: 8px;
          letter-spacing: 0.16em; text-transform: uppercase; color: var(--teal);
        }
        .m10-footer-about {
          font-family: 'IBM Plex Sans', sans-serif; font-size: 12.5px;
          color: rgba(255,255,255,0.35); line-height: 1.8; max-width: 280px; margin-bottom: 20px;
        }
        .m10-social-row { display: flex; gap: 8px; }
        .m10-social-btn {
          width: 34px; height: 34px; border: 1px solid rgba(255,255,255,0.12);
          display: flex; align-items: center; justify-content: center;
          font-family: 'IBM Plex Sans', sans-serif; font-size: 11px; font-weight: 600;
          color: rgba(255,255,255,0.4); text-decoration: none; transition: all 0.2s;
        }
        .m10-social-btn:hover { border-color: var(--teal); color: var(--teal); }
        .m10-footer-bottom {
          max-width: 1380px; margin: 0 auto; padding: 20px 28px;
          display: flex; flex-wrap: wrap; justify-content: space-between;
          align-items: center; gap: 12px;
          font-family: 'IBM Plex Sans', sans-serif; font-size: 11px;
          color: rgba(255,255,255,0.25);
        }
        @media (min-width: 768px) { .m10-footer-bottom { padding: 20px 56px; } }
        @media (min-width: 1200px) { .m10-footer-bottom { padding: 20px 80px; } }
        .m10-footer-disclaimer {
          max-width: 1380px; margin: 0 auto; padding: 16px 28px 24px;
          font-family: 'IBM Plex Sans', sans-serif; font-size: 11px;
          color: rgba(255,255,255,0.2); line-height: 1.7;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        @media (min-width: 768px) { .m10-footer-disclaimer { padding: 16px 56px 24px; } }
      `}</style>

      <div className="m10">

        {/* ── Topbar ── */}
        <div className="m10-topbar">
          <div className="m10-topbar-left">
            <div className="m10-topbar-item">
              <span className="m10-topbar-icon">＋</span>
              <span>{name$}</span>
            </div>
            <div className="m10-topbar-dot" />
            <div className="m10-topbar-item">
              <span>{specialty || "Multispecialty Medical Center"}</span>
            </div>
          </div>
          <div className="m10-topbar-right">
            <div className="m10-topbar-item">
              <span className="m10-topbar-icon">✉</span>
              <span>{email$}</span>
            </div>
            <div className="m10-topbar-item">
              <span className="m10-topbar-emerg">Emergency: {emergency$}</span>
            </div>
          </div>
        </div>

        {/* ── Navbar ── */}
        <motion.header
          className={`m10-nav ${scrolled ? "m10-nav-scrolled" : "m10-nav-base"}`}
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE_CRISP }}
        >
          <div className="m10-nav-inner">
            {/* Logo */}
            {headerType === "Image" && logoUrl ? (
              <a href="#" className="m10-logo" style={{ position: "relative", width: 140, height: 40 }}>
                <Image src={logoUrl} alt={name$} fill className="object-contain object-left" />
              </a>
            ) : (
              <a href="#" className="m10-logo">
                <div className="m10-logo-emblem">
                  <div className="m10-logo-cross" />
                </div>
                <div className="m10-logo-text">
                  <span className="m10-logo-name">{name$}</span>
                  <span className="m10-logo-sub">{specialty || "Medical Center"}</span>
                </div>
              </a>
            )}

            {/* Desktop nav */}
            <nav className="m10-nav-links" aria-label="Main navigation">
              {navLinks.map(({ href, label }) => (
                <a key={href} href={href} className="m10-nav-link">{label}</a>
              ))}
              <a href="#appointment" className="m10-btn-primary m10-nav-cta">Book Appointment</a>
            </nav>

            {/* Hamburger */}
            <button className="m10-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" type="button">
              <motion.span className="m10-ham-bar" animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} />
              <motion.span className="m10-ham-bar" animate={{ opacity: menuOpen ? 0 : 1 }} />
              <motion.span className="m10-ham-bar" animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} />
            </button>
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.nav
                initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                className="m10-mobile-nav" style={{ overflow: "hidden" }}
                aria-label="Mobile navigation"
              >
                <div className="m10-mobile-nav-inner">
                  {navLinks.map(({ href, label }) => (
                    <a key={href} href={href} className="m10-mobile-link" onClick={() => setMenuOpen(false)}>
                      {label} <span>→</span>
                    </a>
                  ))}
                  <a href="#appointment" className="m10-btn-primary" style={{ marginTop: 20, justifyContent: "center" }} onClick={() => setMenuOpen(false)}>
                    Book Appointment
                  </a>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </motion.header>

        {/* ══ HERO ══ */}
        <section id="home" ref={heroRef} className="m10-hero">
          {/* Left text panel */}
          <div className="m10-hero-left">
            <motion.div
              className="m10-hero-rule"
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="m10-hero-rule-line" />
              <span className="m10-hero-rule-text">{specialty || "Precision Healthcare"}</span>
            </motion.div>

            <motion.h1
              className="m10-hero-title"
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: EASE_CRISP }}
            >
              {heroTitle ? heroTitle : (
                <>
                  Advanced Care,
                  <em className="m10-hero-title-em">Precisely Delivered</em>
                </>
              )}
            </motion.h1>

            {tagline && (
              <motion.p
                className="m10-hero-specialty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {tagline}
              </motion.p>
            )}

            <motion.p
              className="m10-hero-tagline"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              {heroDescription || "Expert physicians. Evidence-based protocols. Compassionate, patient-centered care that respects your time, dignity, and health goals."}
            </motion.p>

            <motion.div
              className="m10-hero-ctas"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
            >
              <a href="#appointment" className="m10-btn-primary">Schedule Appointment →</a>
              <a href={`tel:${emergency$}`} className="m10-btn-secondary">Emergency Line</a>
            </motion.div>

            <motion.div
              className="m10-trust-strip"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              {[["28+", "Years"], ["42K+", "Patients"], ["99%", "Satisfaction"]].map(([v, l]) => (
                <div key={l} className="m10-trust-item">
                  <p className="m10-trust-val">{v}</p>
                  <p className="m10-trust-lbl">{l}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right image panel */}
          <div className="m10-hero-right">
            <div className="m10-hero-navy-bar" />
            <motion.div style={{ y: heroImgY, height: "100%", position: "relative" }}>
              <Image
                src={heroImage || "/images/templates/template-img-26.jpg"}
                alt="Medical professional"
                fill
                className="object-cover object-center"
                priority
                style={{ paddingLeft: 6 }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to bottom, rgba(248,251,253,0) 60%, rgba(248,251,253,0.3) 100%)"
              }} />
            </motion.div>

            <div className="m10-hero-vtxt">
              {name$} · Established {new Date().getFullYear() - (parseInt(experience) || 28)}
            </div>

            <motion.div
              className="m10-hero-accred"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
            >
              <p className="m10-hero-accred-title">Accreditation</p>
              <p className="m10-hero-accred-name">Joint Commission International Gold Seal of Approval</p>
              <div className="m10-hero-accred-row">
                <div className="m10-hero-accred-dot" />
                <span className="m10-hero-accred-status">Active · Verified {new Date().getFullYear()}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ METRICS BAND ══ */}
        <section className="m10-metrics" aria-label="Key statistics">
          <InView variants={stagger} className="m10-metrics-grid">
            {stats$.map((s, i) => (
              <motion.div key={i} variants={revealY(i * 0.08)} className="m10-metric-cell">
                <p className="m10-metric-val"><AnimCount target={s.value} /></p>
                <p className="m10-metric-lbl">{s.label}</p>
              </motion.div>
            ))}
          </InView>
        </section>

        {/* ══ ABOUT ══ */}
        <section id="about" className="m10-section m10-about-bg">
          <div className="m10-wrap">
            <div className="m10-about-grid">
              {/* Image col */}
              <InView variants={revealX(0, -1)}>
                <div className="m10-about-img-wrap">
                  <div className="m10-about-bracket-tl" />
                  <div className="m10-about-bracket-br" />
                  <div className="m10-about-img-frame">
                    <Image
                      src={aboutImage || "/images/templates/template-img-27.jpg"}
                      alt="Doctor portrait"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="m10-about-exp-badge">
                    <p className="m10-about-exp-num">{experience || "28"}+</p>
                    <p className="m10-about-exp-lbl">Years<br />of Practice</p>
                  </div>
                </div>
              </InView>

              {/* Text col */}
              <div>
                <InView variants={revealY(0)}>
                  <SectionLabel>{aboutUsTitle || "About the Physician"}</SectionLabel>
                </InView>
                <InView variants={revealY(0.05)}>
                  <h2 className="m10-display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--slate)", marginBottom: 16, marginTop: 8 }}>
                    Medical Excellence<br />
                    <em style={{ fontStyle: "italic", color: "var(--navy)" }}>Built on Evidence</em>
                  </h2>
                </InView>
                <InView variants={revealY(0.1)}>
                  <p style={{ fontSize: 14.5, color: "var(--mist)", lineHeight: 1.85, marginBottom: 28 }}>
                    {bio || "Guided by the principles of evidence-based medicine and a genuine commitment to patient wellbeing, our practice integrates the latest clinical research with compassionate, individualized care. Every patient deserves a physician who listens, a team that coordinates, and outcomes that last."}
                  </p>
                </InView>
                <InView variants={revealY(0.12)}>
                  <div className="m10-cred-badges">
                    <CredBadge icon="🎓" title={qualification || education || "MD, Fellowship Trained"} sub="Medical Credentials" />
                    <CredBadge icon="🏥" title={hospitalName || name$} sub="Primary Institution" />
                    <CredBadge icon="🌐" title={languagesSpoken || "English, Spanish"} sub="Languages Spoken" />
                    <CredBadge icon="📋" title={certifications || "Board Certified Specialist"} sub="Certifications" />
                  </div>
                </InView>

                <InView variants={revealY(0.14)}>
                  <h3 style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--teal)", marginBottom: 20 }}>
                    Career Journey
                  </h3>
                  <div className="m10-timeline">
                    {timeline.map((t, i) => (
                      <TimelineItem key={i} year={t.year} title={t.title} description={t.description} isLast={i === timeline.length - 1} />
                    ))}
                  </div>
                </InView>
              </div>
            </div>
          </div>
        </section>

        {/* ══ SERVICES — DEPARTMENT NAVIGATION ══ */}
        <section id="services" className="m10-section m10-services-bg">
          <div className="m10-wrap">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 44 }}>
              <div>
                <InView variants={revealY(0)}><SectionLabel>Clinical Departments</SectionLabel></InView>
                <InView variants={revealY(0.05)}>
                  <h2 className="m10-display" style={{ fontSize: "clamp(1.9rem, 4vw, 2.8rem)", color: "var(--slate)", marginTop: 8 }}>
                    Our Medical Specialties
                  </h2>
                </InView>
              </div>
              <InView variants={revealX(0, 1)}>
                <p style={{ fontSize: 13, color: "var(--mist)", maxWidth: 280, lineHeight: 1.7 }}>
                  Select a department to explore our clinical services and specialist team.
                </p>
              </InView>
            </div>

            <InView variants={revealY(0.1)}>
              <div className="m10-dept-layout">
                {/* Tabs */}
                <div className="m10-dept-tabs" role="tablist" aria-label="Medical departments">
                  {svcs.map((s, i) => (
                    <DeptCard key={i} dept={s} isActive={activeDept === i} onClick={() => setActiveDept(i)} />
                  ))}
                </div>

                {/* Detail panel */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDept}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.35, ease: EASE_MEDICAL }}
                    className="m10-dept-detail-wrap"
                    role="tabpanel"
                  >
                    <div style={{ width: "100%" }}>
                      <span className="m10-dept-icon-hero">{svcs[activeDept].icon || "🏥"}</span>
                      <p className="m10-dept-index">Department {String(activeDept + 1).padStart(2, "0")}</p>
                      <h3 className="m10-dept-title">{svcs[activeDept].title || svcs[activeDept].name}</h3>
                      <p className="m10-dept-desc">{svcs[activeDept].description || svcs[activeDept].desc}</p>
                      <div className="m10-dept-features">
                        {["Board-Certified Specialists", "Advanced Diagnostics", "Multidisciplinary Approach", "Same-Day Appointments"].map(f => (
                          <div key={f} className="m10-dept-feature">
                            <div className="m10-dept-feat-dot" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                      <a href="#appointment" className="m10-btn-primary">Book a Consultation →</a>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </InView>
          </div>
        </section>

        {/* ══ WHY CHOOSE ══ */}
        <section className="m10-section m10-why-bg">
          <div className="m10-wrap">
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <InView variants={revealY(0)}><SectionLabel light>Why Meridian</SectionLabel></InView>
              <InView variants={revealY(0.05)}>
                <h2 className="m10-display" style={{ fontSize: "clamp(1.9rem, 4vw, 2.8rem)", color: "#fff", marginTop: 8, marginBottom: 12 }}>
                  The Standard of Care<br />
                  <em style={{ fontStyle: "italic", color: "rgba(0,172,193,0.85)" }}>You Deserve</em>
                </h2>
              </InView>
            </div>
            <InView variants={stagger} className="m10-why-grid">
              {(whyChooseUs?.length ? whyChooseUs : [
                { icon: "🏅", title: "Board-Certified Experts", description: "Every physician holds national board certification with subspecialty fellowship training from leading academic medical centers." },
                { icon: "🔬", title: "Diagnostic Precision", description: "AI-augmented imaging, genomic profiling, and integrated lab systems ensure diagnostic accuracy that matches published benchmarks." },
                { icon: "⚡", title: "Responsive Access", description: "New patients are seen within 48 hours. Urgent consultations available same day. After-hours coverage always staffed by physicians." },
                { icon: "🤝", title: "Coordinated Care", description: "A dedicated care coordinator manages your journey from referral to follow-up, keeping every specialist and appointment aligned." },
              ]).map((f, i) => (
                <motion.div key={i} variants={revealY(i * 0.1)} className="m10-why-card">
                  <p className="m10-why-card-num">0{i + 1}</p>
                  <div className="m10-why-icon-circle">{f.icon}</div>
                  <h3 className="m10-why-title">{f.title || f.featureTitle}</h3>
                  <p className="m10-why-desc">{f.description || f.featureDescription}</p>
                </motion.div>
              ))}
            </InView>
          </div>
        </section>

        {/* ══ APPOINTMENT BOOKING PANEL ══ */}
        <section id="appointment" className="m10-section m10-appt-bg">
          <div className="m10-wrap">
            <div className="m10-appt-grid">
              <InView variants={revealX(0, -1)}>
                <div className="m10-appt-left">
                  <SectionLabel light>Schedule a Visit</SectionLabel>
                  <h2 className="m10-appt-heading" style={{ marginTop: 12 }}>
                    Book Your<br />
                    <em>Appointment</em>
                  </h2>
                  <p className="m10-appt-sub">
                    Select your preferred consultation type, choose an available day, and pick a time slot. Our care team confirms within 30 minutes.
                  </p>
                  <div className="m10-appt-feature-list">
                    {[
                      { icon: "⏱", title: "Same-Day Urgent", text: "Same-day slots reserved daily for acute clinical needs." },
                      { icon: "📱", title: "Telehealth Available", text: "Video consultations for follow-ups and non-urgent reviews." },
                      { icon: "📋", title: "Pre-visit Forms", text: "Digital intake sent immediately upon booking confirmation." },
                    ].map((f, i) => (
                      <div key={i} className="m10-appt-feature">
                        <div className="m10-appt-feat-icon">{f.icon}</div>
                        <p className="m10-appt-feat-text">
                          <span className="m10-appt-feat-title">{f.title} — </span>
                          {f.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </InView>

              <InView variants={revealX(0.1, 1)}>
                <AppointmentPanel schedule={sched$} phone={phone$} />
              </InView>
            </div>
          </div>
        </section>

        {/* ══ TESTIMONIALS ══ */}
        <section id="patients" className="m10-section m10-patients-bg">
          <div className="m10-wrap">
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <InView variants={revealY(0)}><SectionLabel>Patient Reviews</SectionLabel></InView>
              <InView variants={revealY(0.05)}>
                <h2 className="m10-display" style={{ fontSize: "clamp(1.9rem, 4vw, 2.8rem)", color: "var(--slate)", marginTop: 8 }}>
                  Stories from Our Patients
                </h2>
              </InView>
              <InView variants={revealY(0.1)}>
                <p style={{ fontSize: 14, color: "var(--mist)", maxWidth: 440, margin: "12px auto 0", lineHeight: 1.75 }}>
                  Every review is verified by our patient relations team and represents a genuine care experience.
                </p>
              </InView>
            </div>

            <InView variants={revealY(0.1)}>
              <div className="m10-tslider-wrap">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: EASE_MEDICAL }}
                  >
                    <PatientRecord item={testimonials$[activeTestimonial]} />
                  </motion.div>
                </AnimatePresence>

                <div className="m10-tslider-nav">
                  <button className="m10-tnav-btn" onClick={() => setActiveTestimonial(p => (p - 1 + testimonials$.length) % testimonials$.length)} aria-label="Previous">←</button>
                  <div className="m10-tnav-dots">
                    {testimonials$.map((_, i) => (
                      <button key={i} className={`m10-tnav-dot ${i === activeTestimonial ? "active" : ""}`} onClick={() => setActiveTestimonial(i)} aria-label={`Review ${i + 1}`} />
                    ))}
                  </div>
                  <button className="m10-tnav-btn" onClick={() => setActiveTestimonial(p => (p + 1) % testimonials$.length)} aria-label="Next">→</button>
                </div>
              </div>
            </InView>
          </div>
        </section>

        {/* ══ TEAM ══ */}
        <section id="team" className="m10-section m10-team-bg">
          <div className="m10-wrap">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 44 }}>
              <div>
                <InView variants={revealY(0)}><SectionLabel>Medical Faculty</SectionLabel></InView>
                <InView variants={revealY(0.05)}>
                  <h2 className="m10-display" style={{ fontSize: "clamp(1.9rem, 4vw, 2.8rem)", color: "var(--slate)", marginTop: 8 }}>
                    Our Specialist Physicians
                  </h2>
                </InView>
              </div>
              <InView variants={revealX(0, 1)}>
                <a href="#contact" className="m10-btn-secondary">View Full Directory →</a>
              </InView>
            </div>

            <InView variants={stagger} className="m10-team-grid">
              {team$.map((doc, i) => (
                <motion.div key={i} variants={revealScale(i * 0.08)} className="m10-team-card">
                  <div className="m10-team-photo">
                    {doc.image ? (
                      <Image src={doc.image} alt={doc.name || doc.doctorName} fill className="object-cover object-top" />
                    ) : "👨‍⚕️"}
                  </div>
                  <div className="m10-team-card-bar" />
                  <div className="m10-team-info">
                    <p className="m10-team-name">{doc.name || doc.doctorName}</p>
                    <p className="m10-team-spec">{doc.specialization}</p>
                    <p className="m10-team-qual">{doc.qualification || "MD"}</p>
                    <span className="m10-team-exp-tag">{doc.experience}</span>
                  </div>
                </motion.div>
              ))}
            </InView>
          </div>
        </section>

        {/* ══ FAQ ══ */}
        <section className="m10-section m10-faq-bg">
          <div className="m10-wrap">
            <div className="m10-faq-grid">
              <div>
                <InView variants={revealX(0, -1)}>
                  <SectionLabel>Patient Information</SectionLabel>
                  <h2 className="m10-display" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.6rem)", color: "var(--slate)", marginTop: 12, marginBottom: 16 }}>
                    Frequently<br />
                    <em style={{ fontStyle: "italic" }}>Asked Questions</em>
                  </h2>
                  <p style={{ fontSize: 13.5, color: "var(--mist)", lineHeight: 1.8, marginBottom: 28 }}>
                    Can't find what you need? Our care coordination team is available by phone or email.
                  </p>
                  <a href={`tel:${phone$}`} className="m10-btn-teal">Speak to Our Team</a>
                </InView>
              </div>

              <InView variants={stagger}>
                {faqs$.map((faq, i) => (
                  <motion.div key={i} variants={revealY(i * 0.07)}>
                    <FaqAccordion q={faq.question} a={faq.answer} />
                  </motion.div>
                ))}
              </InView>
            </div>
          </div>
        </section>

        {/* ══ INSURANCE ══ */}
        <section className="m10-section m10-ins-bg" style={{ padding: "64px 0" }}>
          <div className="m10-wrap">
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <InView variants={revealY(0)}><SectionLabel>Coverage</SectionLabel></InView>
              <InView variants={revealY(0.05)}>
                <h2 className="m10-display" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "var(--slate)", marginTop: 8 }}>
                  Accepted Insurance Plans
                </h2>
              </InView>
            </div>
            <InView variants={stagger} className="m10-ins-grid">
              {insurance$.map((ins, i) => (
                <motion.div key={i} variants={revealScale(i * 0.04)} className="m10-ins-card">
                  {ins.logo ? (
                    <div style={{ position: "relative", height: 24, marginBottom: 6 }}>
                      <Image src={ins.logo} alt={ins.name} fill className="object-contain" />
                    </div>
                  ) : null}
                  {ins.name}
                </motion.div>
              ))}
            </InView>
          </div>
        </section>

        {/* ══ CONTACT ══ */}
        <section id="contact" className="m10-section m10-contact-bg">
          <div className="m10-wrap">
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <InView variants={revealY(0)}><SectionLabel>Contact & Location</SectionLabel></InView>
              <InView variants={revealY(0.05)}>
                <h2 className="m10-display" style={{ fontSize: "clamp(1.9rem, 4vw, 2.8rem)", color: "var(--slate)", marginTop: 8 }}>
                  Get in Touch
                </h2>
              </InView>
            </div>

            {/* Emergency bar */}
            <InView variants={revealY(0)}>
              <div className="m10-emergency-bar">
                <div className="m10-emerg-left">
                  <span className="m10-emerg-icon">🚨</span>
                  <div>
                    <p className="m10-emerg-title">24/7 Emergency Medical Line</p>
                    <p className="m10-emerg-sub">{emergencyAvailability || "On-call physicians available around the clock for urgent clinical guidance"}</p>
                  </div>
                </div>
                <a href={`tel:${emergency$}`} className="m10-emerg-btn">Call {emergency$} →</a>
              </div>
            </InView>

            <div className="m10-contact-grid">
              {/* Info dashboard */}
              <div>
                <InView variants={revealX(0, -1)}>
                  <div className="m10-info-panel">
                    <div className="m10-info-panel-header">
                      <span className="m10-info-panel-title">Clinic Information</span>
                      <span className="m10-info-panel-status">
                        <span className="m10-info-panel-dot" />
                        Active
                      </span>
                    </div>
                    <InfoRow icon="📍" label="Address" value={address$} />
                    <InfoRow icon="📞" label="Phone" value={phone$} highlight />
                    <InfoRow icon="✉" label="Email" value={email$} />
                    {whatsappNumber && <InfoRow icon="💬" label="WhatsApp" value={whatsappNumber} />}
                    {ambulanceNumber && <InfoRow icon="🚑" label="Ambulance" value={ambulanceNumber} highlight />}
                    <InfoRow icon="🌐" label="Languages" value={languagesSpoken || "English, Spanish, French"} />
                  </div>
                </InView>

                <InView variants={revealY(0.1)}>
                  <div className="m10-schedule-panel" style={{ marginTop: 20 }}>
                    {sched$.map((row, i) => (
                      <div key={i} className="m10-sched-row">
                        <span className="m10-sched-day">{row.day}</span>
                        <div className="m10-sched-time">
                          {row.open === "Closed" ? (
                            <span className="m10-sched-closed">Closed</span>
                          ) : (
                            <>
                              <span className="m10-sched-open">{row.open || row.openingTime}</span>
                              {row.close && <><span className="m10-sched-sep">—</span><span className="m10-sched-close">{row.close || row.closingTime}</span></>}
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </InView>

                {whatsappNumber && (
                  <InView variants={revealY(0.15)}>
                    <a
                      href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
                      target="_blank" rel="noopener noreferrer"
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                        background: "#25d366", color: "#fff", padding: "14px",
                        fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 600, fontSize: 13,
                        textDecoration: "none", letterSpacing: "0.03em", marginTop: 12,
                      }}
                    >
                      💬 Message Us on WhatsApp
                    </a>
                  </InView>
                )}
              </div>

              {/* Map */}
              <InView variants={revealX(0.1, 1)}>
                <div className="m10-map-panel">
                  {googleMapsEmbed ? (
                    <iframe
                      src={googleMapsEmbed}
                      style={{ width: "100%", height: "100%", minHeight: 420, border: "none" }}
                      allowFullScreen loading="lazy" title="Clinic location"
                    />
                  ) : (
                    <div className="m10-map-placeholder">
                      <div className="m10-map-icon">🗺</div>
                      <p className="m10-map-text">Map Location</p>
                      <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12, color: "var(--mist)", marginTop: 8 }}>
                        Add a Google Maps embed URL to display your location
                      </p>
                    </div>
                  )}
                </div>
              </InView>
            </div>
          </div>
        </section>

        {/* ══ FOOTER ══ */}
        <footer className="m10-footer">
          <div className="m10-footer-top">
            <div>
              <div className="m10-footer-logo">
                <div className="m10-footer-logo-emb">
                  <div className="m10-logo-cross" style={{ width: 14, height: 14 }} />
                </div>
                <div>
                  <p className="m10-footer-logo-name">{name$}</p>
                  <p className="m10-footer-logo-sub">{specialty || "Medical Center"}</p>
                </div>
              </div>
              <p className="m10-footer-about">
                Delivering evidence-based, compassionate medical care to our community for over {experience || "28"} years.
              </p>
              <div className="m10-social-row">
                {["f", "𝕏", "in", "ig"].map((s, i) => (
                  <a key={i} href={socialLinks?.[["facebook", "twitter", "linkedin", "instagram"][i]] || "#"} className="m10-social-btn">{s}</a>
                ))}
              </div>
            </div>

            <div>
              <p className="m10-footer-col-label">Navigation</p>
              {navLinks.map(({ href, label }) => (
                <a key={href} href={href} className="m10-footer-link">{label}</a>
              ))}
            </div>

            <div>
              <p className="m10-footer-col-label">Specialties</p>
              {svcs.slice(0, 5).map((s, i) => (
                <a key={i} href="#services" className="m10-footer-link">{s.title || s.name}</a>
              ))}
            </div>

            <div>
              <p className="m10-footer-col-label">Clinic Info</p>
              <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.7, marginBottom: 8 }}>
                {address$}
              </p>
              <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: 6 }}>{phone$}</p>
              <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.35)", wordBreak: "break-all" }}>{email$}</p>
              {workingHours && (
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "var(--teal)", marginTop: 10, letterSpacing: "0.1em" }}>{workingHours}</p>
              )}
            </div>
          </div>

          {footerDisclaimer && (
            <div className="m10-footer-disclaimer">
              <strong style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 8.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(0,172,193,0.5)" }}>
                Medical Disclaimer:{" "}
              </strong>
              {footerDisclaimer}
            </div>
          )}

          <div className="m10-footer-bottom">
            <p>{footerCopyright || `© ${new Date().getFullYear()} ${name$}. All rights reserved.`}</p>
            <div style={{ display: "flex", gap: 20 }}>
              <a href="#" style={{ color: "rgba(255,255,255,0.25)", textDecoration: "none", fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 11 }}>Privacy Policy</a>
              <a href="#" style={{ color: "rgba(255,255,255,0.25)", textDecoration: "none", fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 11 }}>Terms of Service</a>
              <a href="#" style={{ color: "rgba(255,255,255,0.25)", textDecoration: "none", fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 11 }}>Accessibility</a>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}

/* ── Standalone FAQ accordion (avoids useState in mapped loop) ── */
function FaqAccordion({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="m10-faq-item">
      <button className="m10-faq-q-btn" onClick={() => setOpen(!open)} type="button">
        <span className="m10-faq-q-text">{q}</span>
        <motion.span
          className="m10-faq-icon-wrap"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.18 }}
        >+</motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: "hidden" }}
          >
            <p className="m10-faq-a">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}