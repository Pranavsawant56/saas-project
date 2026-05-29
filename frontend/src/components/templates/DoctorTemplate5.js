"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

/*
 ╔══════════════════════════════════════════╗
 ║   DOCTOR TEMPLATE 5 — "LUMINARY"        ║
 ║   Palette: Midnight Navy + Amber Gold   ║
 ║   Aesthetic: Luxury Editorial           ║
 ╚══════════════════════════════════════════╝

  --navy-deep    #080e1a   (richest dark)
  --navy         #0d1829   (base bg)
  --navy-mid     #162240   (surface)
  --navy-light   #1e2f55   (elevated surface)
  --navy-border  #243560   (border)
  --gold         #c8922a   (primary accent)
  --gold-light   #e8b24a   (hover/highlight)
  --gold-pale    #f7e4b8   (soft tint)
  --gold-dim     #7a5516   (muted)
  --ivory        #f8f4ec   (light bg)
  --ivory-warm   #fdfbf7   (card bg)
  --slate-100    #e2e8f0
  --slate-400    #94a3b8
  --slate-600    #475569
  --white        #ffffff
*/

/* ─── Easing Presets ─── */
const SPRING = { type: "spring", stiffness: 260, damping: 28 };
const EASE_OUT = [0.16, 1, 0.3, 1];
const EASE_EXPO = [0.22, 1, 0.36, 1];

/* ─── Animation Variants ─── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, delay, ease: EASE_OUT } },
});
const fadeLeft = (delay = 0) => ({
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay, ease: EASE_OUT } },
});
const fadeRight = (delay = 0) => ({
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay, ease: EASE_OUT } },
});
const scaleIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.65, delay, ease: EASE_EXPO } },
});
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

/* ─── Reveal Wrapper ─── */
function Reveal({ children, className = "", dir = "up", delay = 0, once = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-80px" });
  const variants = dir === "left" ? fadeLeft(delay) : dir === "right" ? fadeRight(delay) : dir === "scale" ? scaleIn(delay) : fadeUp(delay);
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={variants} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Stagger ─── */
function Stagger({ children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={staggerContainer} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Gold Label ─── */
function GoldLabel({ children }) {
  return (
    <div className="dt5-gold-label">
      <span className="dt5-gold-line" />
      <span>{children}</span>
    </div>
  );
}

/* ─── Section Number ─── */
function SectionNum({ n }) {
  return <span className="dt5-section-num">0{n}</span>;
}

/* ─── Pill Tag ─── */
function Pill({ children, dark = false }) {
  return <span className={`dt5-pill ${dark ? "dt5-pill-dark" : ""}`}>{children}</span>;
}

/* ─── Stars ─── */
function Stars({ n = 5 }) {
  return (
    <div className="dt5-stars">
      {[...Array(5)].map((_, i) => (
        <span key={i} style={{ color: i < n ? "#c8922a" : "#2a3456" }}>★</span>
      ))}
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
    const num = parseInt(target.replace(/\D/g, "")) || 0;
    let start = 0;
    const step = Math.ceil(num / 50);
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { setCount(num); clearInterval(timer); } else setCount(start);
    }, 28);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count}{target.replace(/\d/g, "") || suffix}</span>;
}

/* ─── Testimonial Carousel ─── */
function TestimonialSlider({ items }) {
  const [cur, setCur] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const len = items.length;
  const go = useCallback((n) => setCur(((n % len) + len) % len), [len]);

  useEffect(() => {
    const t = setInterval(() => go(cur + 1), 5500);
    return () => clearInterval(t);
  }, [cur, go]);

  return (
    <div className="dt5-tslider">
      <AnimatePresence mode="wait">
        <motion.div
          key={cur}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="dt5-tcard"
        >
          <div className="dt5-tquote">"</div>
          <p className="dt5-ttext">{items[cur].review || items[cur].text}</p>
          <div className="dt5-tfooter">
            <div className="dt5-tavatar">
              {items[cur].image ? (
                <Image src={items[cur].image} alt={items[cur].name} fill className="object-cover" />
              ) : (
                <span>{(items[cur].name || "P")[0]}</span>
              )}
            </div>
            <div>
              <Stars n={items[cur].rating || 5} />
              <p className="dt5-tname">{items[cur].name || items[cur].patientName}</p>
              <p className="dt5-trole">Verified Patient</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="dt5-tcontrols">
        <button onClick={() => go(cur - 1)} className="dt5-tarrow">‹</button>
        <div className="dt5-tdots">
          {items.map((_, i) => (
            <button key={i} onClick={() => go(i)} className={`dt5-tdot ${i === cur ? "active" : ""}`} />
          ))}
        </div>
        <button onClick={() => go(cur + 1)} className="dt5-tarrow">›</button>
      </div>
    </div>
  );
}

/* ─── Service Card Carousel ─── */
function ServiceCarousel({ items }) {
  const [active, setActive] = useState(0);
  return (
    <div className="dt5-svc-layout">
      {/* Tab list */}
      <div className="dt5-svc-tabs">
        {items.map((svc, i) => (
          <button
            key={i}
            className={`dt5-svc-tab ${i === active ? "active" : ""}`}
            onClick={() => setActive(i)}
          >
            <span className="dt5-svc-tab-icon">{svc.icon || "🩺"}</span>
            <span className="dt5-svc-tab-title">{svc.title || svc.name}</span>
            <span className="dt5-svc-tab-num">0{i + 1}</span>
          </button>
        ))}
      </div>
      {/* Panel */}
      <div className="dt5-svc-panel">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.42, ease: EASE_OUT }}
            className="dt5-svc-detail"
          >
            <div className="dt5-svc-detail-icon">{items[active].icon || "🩺"}</div>
            <h3 className="dt5-svc-detail-title">{items[active].title || items[active].name}</h3>
            <p className="dt5-svc-detail-desc">{items[active].description || items[active].desc || "Expert personalised care tailored to you."}</p>
            <div className="dt5-svc-detail-num">0{active + 1}</div>
            <a href="#contact" className="dt5-btn-gold">Book This Service →</a>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── FAQ Accordion ─── */
function FaqItem({ q, a, i }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div variants={fadeUp(i * 0.06)} className={`dt5-faq-item ${open ? "open" : ""}`}>
      <button className="dt5-faq-q" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.22 }} className="dt5-faq-cross">
          <span />
          <span />
        </motion.div>
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
            <p className="dt5-faq-a">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   MAIN TEMPLATE
══════════════════════════════════════════ */
export default function DoctorTemplate5({ data }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* ── Data Destructure ── */
  const {
    clinicName, heroTitle, specialty, heroImage, bio, aboutUsTitle, aboutImage,
    education, experience, contactEmail, phone, countryCode, address,
    workingHours, headerType, logoUrl, clinicNameFontSize, heroTitleFontSize,
    specialtyFontSize, services, tagline, heroDescription, qualification,
    certifications, languagesSpoken, hospitalName, whyChooseUs, schedule,
    stats, testimonials, teamDoctors, faqs, insurancePartners, blog,
    gallery, googleMapsEmbed, emergencyContact, whatsappNumber, footerDisclaimer,
    emergencyAvailability, ambulanceNumber, footerCopyright, socialLinks,
    blogSectionTitle, blogSubtitle, enableBlog
  } = data || {};

  const displayPhone = phone ? `${countryCode ? countryCode.split(" ")[0] : ""}${phone}` : "+1 800 MED CARE";
  const displayEmail = contactEmail || "care@luminahealth.com";
  const displayAddress = address || "88 Harley Street, London W1G";
  const displayName = clinicName || "Lumina Health";
  const displayEmergency = emergencyContact || displayPhone;

  const defaultServices = [
    { icon: "🫀", title: "Cardiology", description: "Advanced diagnostics and treatment of heart disease using state-of-the-art imaging, catherisation, and tailored care protocols." },
    { icon: "🧠", title: "Neurology", description: "Specialised neurological assessment for conditions ranging from headaches to complex disorders of the brain and nervous system." },
    { icon: "🦴", title: "Orthopedics", description: "Minimally invasive joint, bone, and muscle procedures with rapid recovery pathways for athletes and everyday patients alike." },
    { icon: "👶", title: "Pediatrics", description: "Warm, patient-centred care for infants, children, and adolescents — making every visit a positive health milestone." },
    { icon: "👁️", title: "Ophthalmology", description: "Complete eye health management from prescription glasses to advanced retinal laser treatments." },
    { icon: "🩻", title: "Radiology", description: "High-resolution MRI, CT, and ultrasound imaging interpreted by fellowship-trained radiologists." },
  ];
  const displayServices = services?.length ? services : defaultServices;

  const defaultWhyChoose = [
    { icon: "🏅", title: "Board-Certified Experts", description: "Every clinician holds national certification with postgraduate training in their specialty." },
    { icon: "🔬", title: "Precision Technology", description: "AI-assisted diagnostics, robotic surgery, and digital health records for seamless care." },
    { icon: "⏰", title: "Same-Day Appointments", description: "Urgent and routine slots available daily — no long waiting lists." },
    { icon: "🛡️", title: "Transparent Pricing", description: "Clear, itemised billing with no hidden fees. We work with all major insurers." },
  ];
  const displayWhyChoose = whyChooseUs?.length ? whyChooseUs : defaultWhyChoose;

  const defaultSchedule = [
    { day: "Monday – Friday", open: "7:00 AM", close: "9:00 PM" },
    { day: "Saturday", open: "8:00 AM", close: "6:00 PM" },
    { day: "Sunday", open: "10:00 AM", close: "3:00 PM" },
  ];
  const displaySchedule = schedule?.length ? schedule : defaultSchedule;

  const defaultStats = [
    { value: "25+", label: "Years Excellence" },
    { value: "18K+", label: "Patients Treated" },
    { value: "98%", label: "Satisfaction Score" },
    { value: "80+", label: "Specialists" },
  ];
  const displayStats = stats?.length ? stats : defaultStats;

  const defaultTestimonials = [
    { name: "Charlotte Webb", review: "Lumina Health completely transformed my understanding of my condition. The level of personalised attention is extraordinary — I've never felt so genuinely cared for.", rating: 5 },
    { name: "Arjun Mehta", review: "From booking to discharge, the entire experience was seamless. The specialist was knowledgeable, empathetic, and thorough. I left feeling confident in my care plan.", rating: 5 },
    { name: "Isabelle Fontaine", review: "The facilities are exceptional and the team is deeply compassionate. Lumina Health truly sets the gold standard for modern healthcare.", rating: 5 },
    { name: "David Okonkwo", review: "I was nervous coming in but the staff put me completely at ease. Diagnosis was accurate and the follow-up support has been outstanding.", rating: 5 },
  ];
  const displayTestimonials = testimonials?.length ? testimonials : defaultTestimonials;

  const defaultTeam = [
    { name: "Dr. Aisha Patel", specialization: "Cardiology", experience: "16 Years" },
    { name: "Dr. Marcus Hollis", specialization: "Neurology", experience: "13 Years" },
    { name: "Dr. Yuki Tanaka", specialization: "Orthopedics", experience: "11 Years" },
    { name: "Dr. Sophie Laurent", specialization: "Pediatrics", experience: "9 Years" },
  ];
  const displayTeam = teamDoctors?.length ? teamDoctors : defaultTeam;

  const defaultFaqs = [
    { question: "How do I book a consultation?", answer: "You can book online 24/7 via our website, call our care line, or visit in person. Same-day slots are often available for urgent queries." },
    { question: "Which insurance providers do you accept?", answer: "We accept all major insurance plans including BUPA, AXA, Cigna, Vitality, and NHS referrals. Please contact us to verify your specific coverage." },
    { question: "What should I bring to my first appointment?", answer: "Please bring a valid ID, insurance details, any previous test results or scans, and a list of current medications." },
    { question: "Is emergency care available outside normal hours?", answer: "Yes. Our 24-hour emergency line ensures you always reach a qualified clinician — no matter the time of day or night." },
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
    { href: "#team", label: "Our Team" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600&display=swap');

        /* ── Root ── */
        :root {
          --navy-deep: #080e1a;
          --navy: #0d1829;
          --navy-mid: #162240;
          --navy-light: #1e2f55;
          --navy-border: #243560;
          --gold: #c8922a;
          --gold-light: #e8b24a;
          --gold-pale: #f7e4b8;
          --gold-dim: #7a5516;
          --ivory: #f8f4ec;
          --ivory-warm: #fdfbf7;
          --text-light: #e2e8f0;
          --text-mid: #94a3b8;
          --text-dark: #475569;
          --white: #ffffff;
        }

        /* ── Base ── */
        .dt5 { font-family: 'Outfit', sans-serif; color: var(--navy); background: var(--ivory); scroll-behavior: smooth; overflow-x: hidden; }
        .dt5-serif { font-family: 'Cormorant Garamond', Georgia, serif; }

        /* ── Layout ── */
        .dt5-inner { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
        @media (min-width: 768px) { .dt5-inner { padding: 0 48px; } }
        .dt5-section { padding: 96px 0; }
        @media (min-width: 768px) { .dt5-section { padding: 120px 0; } }

        /* ── Gold Label ── */
        .dt5-gold-label { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
        .dt5-gold-line { width: 32px; height: 1.5px; background: var(--gold); flex-shrink: 0; }
        .dt5-gold-label span:last-child { font-size: 11px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: var(--gold); }

        /* ── Section Num ── */
        .dt5-section-num { font-family: 'Cormorant Garamond', serif; font-size: 5rem; font-weight: 400; color: rgba(200,146,42,0.1); line-height: 1; position: absolute; top: -20px; left: 0; user-select: none; pointer-events: none; }

        /* ── Pill ── */
        .dt5-pill { display: inline-block; font-size: 10px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; padding: 5px 14px; border-radius: 100px; border: 1px solid var(--gold-dim); color: var(--gold); background: rgba(200,146,42,0.08); }
        .dt5-pill-dark { border-color: rgba(200,146,42,0.3); color: var(--gold-light); background: rgba(200,146,42,0.1); }

        /* ── Headings ── */
        .dt5-h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(2.8rem, 8vw, 6rem); font-weight: 600; line-height: 1.0; }
        .dt5-h2 { font-family: 'Cormorant Garamond', serif; font-size: clamp(2.2rem, 5vw, 3.8rem); font-weight: 600; line-height: 1.08; }
        .dt5-h3 { font-family: 'Cormorant Garamond', serif; font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 600; line-height: 1.15; }

        /* ── Buttons ── */
        .dt5-btn-gold { display: inline-flex; align-items: center; gap: 8px; background: var(--gold); color: var(--navy-deep); padding: 14px 28px; border-radius: 6px; font-weight: 600; font-size: 14px; text-decoration: none; border: none; cursor: pointer; transition: background 0.25s, transform 0.2s; letter-spacing: 0.02em; }
        .dt5-btn-gold:hover { background: var(--gold-light); transform: translateY(-2px); }
        .dt5-btn-outline-gold { display: inline-flex; align-items: center; gap: 8px; background: transparent; color: var(--gold-light); padding: 13px 28px; border-radius: 6px; font-weight: 600; font-size: 14px; text-decoration: none; border: 1.5px solid rgba(200,146,42,0.4); transition: border-color 0.25s, background 0.25s; letter-spacing: 0.02em; }
        .dt5-btn-outline-gold:hover { border-color: var(--gold-light); background: rgba(200,146,42,0.08); }
        .dt5-btn-navy { display: inline-flex; align-items: center; gap: 8px; background: var(--navy); color: var(--gold-light); padding: 13px 28px; border-radius: 6px; font-weight: 600; font-size: 14px; text-decoration: none; border: none; cursor: pointer; transition: background 0.25s; }
        .dt5-btn-navy:hover { background: var(--navy-mid); }

        /* ── Stars ── */
        .dt5-stars { display: flex; gap: 3px; font-size: 13px; }

        /* ── Topbar ── */
        .dt5-topbar { background: var(--navy-deep); color: rgba(255,255,255,0.55); font-size: 12px; font-weight: 400; padding: 10px 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; }
        @media (min-width: 768px) { .dt5-topbar { padding: 10px 48px; } }
        .dt5-topbar-item { display: flex; align-items: center; gap: 6px; }
        .dt5-topbar-accent { color: var(--gold); font-weight: 600; }

        /* ── Navbar ── */
        .dt5-nav { position: sticky; top: 0; z-index: 50; transition: all 0.35s; }
        .dt5-nav-base { background: rgba(253,251,247,0.92); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(200,146,42,0.12); }
        .dt5-nav-scrolled { background: rgba(253,251,247,0.98); backdrop-filter: blur(24px); box-shadow: 0 4px 32px rgba(8,14,26,0.1); border-bottom: 1px solid rgba(200,146,42,0.18); }
        .dt5-nav-inner { max-width: 1280px; margin: 0 auto; padding: 0 24px; height: 68px; display: flex; justify-content: space-between; align-items: center; }
        @media (min-width: 768px) { .dt5-nav-inner { padding: 0 48px; } }
        .dt5-logo-name { font-family: 'Cormorant Garamond', serif; font-size: 1.45rem; font-weight: 700; color: var(--navy); letter-spacing: 0.02em; }
        .dt5-logo-tag { font-size: 9.5px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: var(--gold); display: block; line-height: 1; margin-top: 1px; }
        .dt5-logo-dot { width: 8px; height: 8px; background: var(--gold); border-radius: 50%; flex-shrink: 0; }
        .dt5-nav-links { display: none; align-items: center; gap: 32px; }
        @media (min-width: 1024px) { .dt5-nav-links { display: flex; } }
        .dt5-nav-link { font-size: 13.5px; font-weight: 500; color: var(--text-dark); text-decoration: none; transition: color 0.2s; letter-spacing: 0.01em; }
        .dt5-nav-link:hover { color: var(--navy); }
        .dt5-hamburger { display: flex; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 8px; }
        @media (min-width: 1024px) { .dt5-hamburger { display: none; } }
        .dt5-ham-bar { width: 24px; height: 1.5px; background: var(--navy); border-radius: 2px; transition: all 0.2s; }
        .dt5-mobile-menu { background: var(--ivory-warm); border-top: 1px solid rgba(200,146,42,0.12); }
        @media (min-width: 1024px) { .dt5-mobile-menu { display: none !important; } }
        .dt5-mobile-menu-inner { padding: 16px 24px; display: flex; flex-direction: column; gap: 0; }
        .dt5-mobile-link { font-size: 15px; font-weight: 500; color: var(--navy); text-decoration: none; padding: 12px 0; border-bottom: 1px solid rgba(200,146,42,0.1); display: block; }

        /* ── HERO ── */
        .dt5-hero { position: relative; min-height: 100vh; background: var(--navy); overflow: hidden; display: flex; flex-direction: column; justify-content: flex-end; }
        .dt5-hero-noise { position: absolute; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"); pointer-events: none; }
        .dt5-hero-lines { position: absolute; inset: 0; background-image: repeating-linear-gradient(0deg, rgba(200,146,42,0.04) 0, rgba(200,146,42,0.04) 1px, transparent 1px, transparent 72px); pointer-events: none; }
        .dt5-hero-inner { max-width: 1280px; margin: 0 auto; padding: 120px 24px 80px; width: 100%; display: grid; grid-template-columns: 1fr; gap: 48px; align-items: end; position: relative; z-index: 2; }
        @media (min-width: 768px) { .dt5-hero-inner { padding: 120px 48px 80px; } }
        @media (min-width: 1100px) { .dt5-hero-inner { grid-template-columns: 7fr 5fr; gap: 80px; align-items: center; } }
        /* Large background text */
        .dt5-hero-bg-text { position: absolute; bottom: -40px; right: -20px; font-family: 'Cormorant Garamond', serif; font-size: clamp(6rem, 18vw, 16rem); font-weight: 700; color: rgba(255,255,255,0.025); line-height: 1; user-select: none; pointer-events: none; white-space: nowrap; z-index: 1; }
        .dt5-hero-overline { font-size: 11px; font-weight: 600; letter-spacing: 0.26em; text-transform: uppercase; color: var(--gold); margin-bottom: 20px; display: flex; align-items: center; gap: 12px; }
        .dt5-hero-overline::before { content: ''; width: 40px; height: 1px; background: var(--gold); }
        .dt5-hero-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(3rem, 9vw, 6.5rem); font-weight: 600; color: var(--white); line-height: 0.95; margin-bottom: 20px; }
        .dt5-hero-title em { font-style: italic; color: var(--gold-light); }
        .dt5-hero-desc { color: rgba(255,255,255,0.5); font-size: 15px; line-height: 1.8; max-width: 500px; margin-bottom: 36px; }
        .dt5-hero-cta { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 56px; }
        .dt5-hero-stats { display: flex; flex-wrap: wrap; gap: 32px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 36px; }
        .dt5-hero-stat-val { font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; font-weight: 600; color: var(--gold-light); line-height: 1; }
        .dt5-hero-stat-lbl { font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 4px; letter-spacing: 0.04em; }
        /* Right image panel */
        .dt5-hero-img-col { display: none; }
        @media (min-width: 1100px) { .dt5-hero-img-col { display: flex; justify-content: flex-end; } }
        .dt5-hero-img-wrap { position: relative; width: 100%; max-width: 420px; }
        .dt5-hero-img-frame { position: relative; border-radius: 0 80px 0 80px; overflow: hidden; aspect-ratio: 3/4; border: 2px solid rgba(200,146,42,0.2); }
        .dt5-hero-img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(8,14,26,0.55) 0%, transparent 55%); }
        .dt5-hero-badge { position: absolute; bottom: 24px; left: -28px; background: var(--gold); color: var(--navy-deep); border-radius: 12px; padding: 18px 20px; text-align: center; border: 3px solid var(--navy); }
        .dt5-hero-badge-num { font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; font-weight: 700; line-height: 1; }
        .dt5-hero-badge-lbl { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; opacity: 0.75; }
        /* Gold corner accent */
        .dt5-corner-accent { position: absolute; top: 16px; right: 16px; width: 48px; height: 48px; border-top: 2px solid var(--gold); border-right: 2px solid var(--gold); border-radius: 0 12px 0 0; }

        /* ── Marquee Band ── */
        .dt5-marquee-band { background: var(--gold); overflow: hidden; padding: 14px 0; }
        .dt5-marquee-track { display: flex; gap: 0; animation: marquee 28s linear infinite; white-space: nowrap; }
        .dt5-marquee-item { font-family: 'Cormorant Garamond', serif; font-size: 1.05rem; font-weight: 600; color: var(--navy-deep); padding: 0 32px; display: flex; align-items: center; gap: 16px; }
        .dt5-marquee-dot { width: 5px; height: 5px; background: var(--navy-deep); border-radius: 50%; opacity: 0.4; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        /* ── About ── */
        .dt5-about-grid { display: grid; grid-template-columns: 1fr; gap: 64px; align-items: center; }
        @media (min-width: 1024px) { .dt5-about-grid { grid-template-columns: 1fr 1fr; gap: 100px; } }
        .dt5-about-img-container { position: relative; }
        .dt5-about-img-main { position: relative; border-radius: 80px 0 80px 0; overflow: hidden; aspect-ratio: 4/5; max-width: 460px; border: 3px solid rgba(200,146,42,0.15); }
        .dt5-about-accent-box { position: absolute; bottom: -28px; right: -20px; background: var(--navy); border-radius: 20px; padding: 20px 24px; border: 2px solid rgba(200,146,42,0.2); text-align: center; z-index: 1; }
        @media (min-width: 480px) { .dt5-about-accent-box { right: -28px; } }
        .dt5-about-accent-num { font-family: 'Cormorant Garamond', serif; font-size: 2.8rem; font-weight: 600; color: var(--gold-light); line-height: 1; }
        .dt5-about-accent-lbl { font-size: 9px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.45); margin-top: 3px; }
        .dt5-about-gold-accent { position: absolute; top: -16px; left: -16px; width: 56px; height: 56px; border-bottom: 2px solid var(--gold); border-left: 2px solid var(--gold); border-radius: 0 0 0 16px; }
        .dt5-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 28px 0; }
        .dt5-detail-cell { background: var(--ivory); border: 1px solid rgba(200,146,42,0.14); border-radius: 10px; padding: 14px 16px; transition: border-color 0.2s; }
        .dt5-detail-cell:hover { border-color: rgba(200,146,42,0.4); }
        .dt5-detail-lbl { font-size: 9px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 4px; }
        .dt5-detail-val { font-size: 13px; font-weight: 500; color: var(--navy); }

        /* ── Services ── */
        .dt5-svc-bg { background: var(--navy); }
        .dt5-svc-layout { display: grid; grid-template-columns: 1fr; gap: 0; border: 1px solid var(--navy-border); border-radius: 20px; overflow: hidden; }
        @media (min-width: 900px) { .dt5-svc-layout { grid-template-columns: 2fr 3fr; } }
        .dt5-svc-tabs { background: var(--navy-deep); border-right: 1px solid var(--navy-border); display: flex; flex-direction: column; }
        @media (max-width: 899px) { .dt5-svc-tabs { flex-direction: row; overflow-x: auto; border-right: none; border-bottom: 1px solid var(--navy-border); } }
        .dt5-svc-tab { display: flex; align-items: center; gap: 12px; padding: 20px 24px; background: transparent; border: none; cursor: pointer; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.04); transition: background 0.25s; position: relative; flex-shrink: 0; }
        .dt5-svc-tab:last-child { border-bottom: none; }
        .dt5-svc-tab.active { background: var(--navy-mid); }
        .dt5-svc-tab.active::after { content: ''; position: absolute; right: 0; top: 50%; transform: translateY(-50%); width: 3px; height: 40px; background: var(--gold); border-radius: 2px 0 0 2px; }
        @media (max-width: 899px) { .dt5-svc-tab.active::after { right: auto; bottom: 0; top: auto; transform: none; width: 100%; height: 3px; border-radius: 0; } }
        .dt5-svc-tab-icon { font-size: 1.3rem; flex-shrink: 0; }
        .dt5-svc-tab-title { font-size: 13.5px; font-weight: 500; color: rgba(255,255,255,0.55); transition: color 0.2s; flex: 1; }
        .dt5-svc-tab.active .dt5-svc-tab-title { color: var(--white); }
        .dt5-svc-tab-num { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; color: rgba(255,255,255,0.12); margin-left: auto; }
        .dt5-svc-panel { background: var(--navy-mid); padding: 48px; display: flex; align-items: center; min-height: 360px; }
        @media (max-width: 768px) { .dt5-svc-panel { padding: 32px 24px; } }
        .dt5-svc-detail { width: 100%; }
        .dt5-svc-detail-icon { font-size: 3rem; margin-bottom: 20px; }
        .dt5-svc-detail-num { font-family: 'Cormorant Garamond', serif; font-size: 5rem; font-weight: 700; color: rgba(200,146,42,0.08); line-height: 1; margin: 20px 0 24px; }
        .dt5-svc-detail-title { font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; font-weight: 600; color: var(--white); margin-bottom: 14px; line-height: 1.1; }
        .dt5-svc-detail-desc { font-size: 14px; color: rgba(255,255,255,0.5); line-height: 1.8; margin-bottom: 28px; max-width: 460px; }

        /* ── Why Choose ── */
        .dt5-why-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        @media (min-width: 1024px) { .dt5-why-grid { grid-template-columns: repeat(4, 1fr); } }
        .dt5-why-card { background: var(--ivory-warm); border: 1px solid rgba(200,146,42,0.1); border-radius: 16px; padding: 28px 22px; position: relative; overflow: hidden; transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s; cursor: default; }
        .dt5-why-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--gold), transparent); opacity: 0; transition: opacity 0.3s; }
        .dt5-why-card:hover { border-color: rgba(200,146,42,0.35); transform: translateY(-5px); box-shadow: 0 20px 48px rgba(8,14,26,0.08); }
        .dt5-why-card:hover::before { opacity: 1; }
        .dt5-why-icon { font-size: 1.8rem; margin-bottom: 16px; display: block; }
        .dt5-why-title { font-family: 'Cormorant Garamond', serif; font-size: 1.25rem; font-weight: 700; color: var(--navy); margin-bottom: 8px; line-height: 1.2; }
        .dt5-why-desc { font-size: 13px; color: var(--text-dark); line-height: 1.65; }
        .dt5-why-num { position: absolute; bottom: 12px; right: 16px; font-family: 'Cormorant Garamond', serif; font-size: 3rem; font-weight: 700; color: rgba(200,146,42,0.07); line-height: 1; }

        /* ── Stats Band ── */
        .dt5-stats-band { background: var(--navy); border-top: 1px solid var(--navy-border); border-bottom: 1px solid var(--navy-border); }
        .dt5-stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); }
        @media (min-width: 768px) { .dt5-stats-grid { grid-template-columns: repeat(4, 1fr); } }
        .dt5-stat-cell { padding: 48px 32px; text-align: center; border-right: 1px solid var(--navy-border); position: relative; }
        .dt5-stat-cell:nth-child(even) { border-right: none; }
        @media (min-width: 768px) { .dt5-stat-cell { border-right: 1px solid var(--navy-border); } .dt5-stat-cell:last-child { border-right: none; } }
        .dt5-stat-val { font-family: 'Cormorant Garamond', serif; font-size: clamp(2.5rem, 5vw, 3.5rem); font-weight: 600; color: var(--gold-light); line-height: 1; margin-bottom: 8px; }
        .dt5-stat-lbl { font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.35); letter-spacing: 0.14em; text-transform: uppercase; }

        /* ── Schedule ── */
        .dt5-schedule-outer { background: var(--navy); border-radius: 20px; overflow: hidden; border: 1px solid var(--navy-border); }
        .dt5-schedule-row { display: flex; justify-content: space-between; align-items: center; padding: 18px 28px; border-bottom: 1px solid var(--navy-border); transition: background 0.2s; }
        .dt5-schedule-row:last-child { border-bottom: none; }
        .dt5-schedule-row:hover { background: var(--navy-mid); }
        .dt5-schedule-day { font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.65); }
        .dt5-schedule-times { display: flex; align-items: center; gap: 10px; }
        .dt5-schedule-open { font-family: 'Cormorant Garamond', serif; font-size: 1.05rem; font-weight: 600; color: var(--gold-light); }
        .dt5-schedule-sep { color: var(--navy-border); font-size: 12px; }
        .dt5-schedule-close { font-size: 13px; color: rgba(255,255,255,0.35); }

        /* ── Testimonials ── */
        .dt5-tslider { width: 100%; }
        .dt5-tcard { background: var(--ivory-warm); border: 1px solid rgba(200,146,42,0.1); border-radius: 20px; padding: 36px; }
        .dt5-tquote { font-family: 'Cormorant Garamond', serif; font-size: 5rem; color: var(--gold); line-height: 0.7; margin-bottom: 8px; opacity: 0.4; }
        .dt5-ttext { font-family: 'Cormorant Garamond', serif; font-size: 1.25rem; font-style: italic; color: var(--navy); line-height: 1.7; margin-bottom: 28px; }
        .dt5-tfooter { display: flex; align-items: center; gap: 14px; }
        .dt5-tavatar { width: 48px; height: 48px; border-radius: 50%; background: var(--navy-light); border: 2px solid rgba(200,146,42,0.3); display: flex; align-items: center; justify-content: center; font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-weight: 600; color: var(--gold-light); overflow: hidden; position: relative; flex-shrink: 0; }
        .dt5-tname { font-weight: 600; font-size: 14px; color: var(--navy); margin-bottom: 1px; }
        .dt5-trole { font-size: 11px; color: var(--gold); font-weight: 600; letter-spacing: 0.06em; }
        .dt5-tcontrols { display: flex; align-items: center; gap: 12px; margin-top: 20px; }
        .dt5-tarrow { width: 40px; height: 40px; border-radius: 50%; border: 1px solid rgba(200,146,42,0.25); background: transparent; font-size: 20px; cursor: pointer; color: var(--navy); display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
        .dt5-tarrow:hover { border-color: var(--gold); color: var(--gold); }
        .dt5-tdots { display: flex; gap: 6px; flex: 1; }
        .dt5-tdot { width: 7px; height: 7px; border-radius: 50%; background: rgba(200,146,42,0.2); border: none; cursor: pointer; padding: 0; transition: all 0.25s; }
        .dt5-tdot.active { width: 22px; border-radius: 4px; background: var(--gold); }

        /* ── Team ── */
        .dt5-team-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        @media (min-width: 1024px) { .dt5-team-grid { grid-template-columns: repeat(4, 1fr); } }
        .dt5-team-card { position: relative; border-radius: 16px; overflow: hidden; aspect-ratio: 3/4; cursor: pointer; background: var(--navy-light); border: 1px solid var(--navy-border); }
        .dt5-team-img { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 4rem; background: linear-gradient(160deg, var(--navy-mid) 0%, var(--navy-light) 100%); transition: transform 0.5s ease; }
        .dt5-team-card:hover .dt5-team-img { transform: scale(1.05); }
        .dt5-team-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(8,14,26,0.92) 35%, rgba(8,14,26,0.2) 100%); display: flex; align-items: flex-end; padding: 22px; }
        .dt5-team-info {}
        .dt5-team-gold-bar { width: 28px; height: 2px; background: var(--gold); margin-bottom: 10px; }
        .dt5-team-name { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-weight: 600; color: var(--white); margin-bottom: 3px; line-height: 1.2; }
        .dt5-team-spec { font-size: 11px; font-weight: 600; color: var(--gold); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 3px; }
        .dt5-team-exp { font-size: 11px; color: rgba(255,255,255,0.45); }

        /* ── FAQ ── */
        .dt5-faq-item { border-bottom: 1px solid rgba(200,146,42,0.1); }
        .dt5-faq-q { width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 22px 0; background: none; border: none; cursor: pointer; text-align: left; }
        .dt5-faq-q span { font-family: 'Cormorant Garamond', serif; font-size: 1.15rem; font-weight: 600; color: var(--navy); transition: color 0.2s; line-height: 1.3; }
        .dt5-faq-q:hover span { color: var(--gold-dim); }
        .dt5-faq-cross { width: 28px; height: 28px; min-width: 28px; border-radius: 50%; border: 1px solid rgba(200,146,42,0.3); display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 0; position: relative; }
        .dt5-faq-cross span { position: absolute; width: 12px; height: 1.5px; background: var(--gold); border-radius: 1px; }
        .dt5-faq-cross span:last-child { transform: rotate(90deg); }
        .dt5-faq-a { padding: 0 0 22px; font-size: 14px; color: var(--text-dark); line-height: 1.75; }
        .dt5-faq-item.open .dt5-faq-q span { color: var(--navy); }

        /* ── Insurance ── */
        .dt5-ins-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        @media (min-width: 480px) { .dt5-ins-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 768px) { .dt5-ins-grid { grid-template-columns: repeat(6, 1fr); } }
        .dt5-ins-card { background: var(--ivory-warm); border: 1px solid rgba(200,146,42,0.12); border-radius: 10px; padding: 18px 12px; text-align: center; font-size: 12px; font-weight: 700; color: var(--text-dark); letter-spacing: 0.04em; transition: border-color 0.2s, transform 0.2s; }
        .dt5-ins-card:hover { border-color: rgba(200,146,42,0.4); transform: translateY(-2px); }

        /* ── Contact ── */
        .dt5-contact-bg { background: var(--navy); }
        .dt5-contact-grid { display: grid; grid-template-columns: 1fr; gap: 48px; }
        @media (min-width: 1024px) { .dt5-contact-grid { grid-template-columns: 1fr 1fr; } }
        .dt5-contact-info-card { display: flex; align-items: flex-start; gap: 16px; padding: 18px 20px; background: var(--navy-mid); border: 1px solid var(--navy-border); border-radius: 12px; transition: border-color 0.2s; }
        .dt5-contact-info-card:hover { border-color: rgba(200,146,42,0.3); }
        .dt5-contact-icon { width: 44px; height: 44px; min-width: 44px; background: rgba(200,146,42,0.1); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.15rem; }
        .dt5-contact-lbl { font-size: 9px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 3px; }
        .dt5-contact-val { font-size: 14px; font-weight: 500; color: var(--text-light); }
        .dt5-emergency-strip { background: var(--gold); border-radius: 12px; padding: 20px 24px; display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
        @media (min-width: 640px) { .dt5-emergency-strip { flex-direction: row; align-items: center; justify-content: space-between; } }
        .dt5-map-wrap { border-radius: 16px; overflow: hidden; border: 1px solid var(--navy-border); min-height: 340px; background: var(--navy-mid); display: flex; align-items: center; justify-content: center; }
        .dt5-map-placeholder { text-align: center; color: rgba(255,255,255,0.3); padding: 40px; }

        /* ── Blog ── */
        .dt5-blog-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
        @media (min-width: 640px) { .dt5-blog-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .dt5-blog-grid { grid-template-columns: repeat(3, 1fr); } }
        .dt5-blog-card { background: var(--ivory-warm); border: 1px solid rgba(200,146,42,0.1); border-radius: 16px; overflow: hidden; transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s; cursor: pointer; }
        .dt5-blog-card:hover { transform: translateY(-5px); box-shadow: 0 20px 48px rgba(8,14,26,0.08); border-color: rgba(200,146,42,0.3); }
        .dt5-blog-thumb { height: 180px; display: flex; align-items: center; justify-content: center; font-size: 3rem; border-bottom: 1px solid rgba(200,146,42,0.1); }
        .dt5-blog-body { padding: 22px; }
        .dt5-blog-title { font-family: 'Cormorant Garamond', serif; font-size: 1.25rem; font-weight: 700; color: var(--navy); margin: 10px 0 8px; line-height: 1.25; }
        .dt5-blog-excerpt { font-size: 13px; color: var(--text-dark); line-height: 1.65; margin-bottom: 12px; }
        .dt5-blog-date { font-size: 11px; color: var(--gold); font-weight: 600; }

        /* ── Footer ── */
        .dt5-footer { background: var(--navy-deep); color: rgba(255,255,255,0.5); }
        .dt5-footer-top { max-width: 1280px; margin: 0 auto; padding: 72px 24px 48px; display: grid; grid-template-columns: 1fr; gap: 40px; }
        @media (min-width: 768px) { .dt5-footer-top { padding: 72px 48px 48px; grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .dt5-footer-top { grid-template-columns: 2.5fr 1fr 1fr 1.5fr; } }
        .dt5-footer-heading { font-size: 10px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: var(--gold); margin-bottom: 18px; }
        .dt5-footer-link { display: block; font-size: 13px; color: rgba(255,255,255,0.45); text-decoration: none; padding: 5px 0; transition: color 0.2s; }
        .dt5-footer-link:hover { color: var(--gold-light); }
        .dt5-footer-divider { border: none; border-top: 1px solid rgba(255,255,255,0.06); margin: 0 24px; }
        @media (min-width: 768px) { .dt5-footer-divider { margin: 0 48px; } }
        .dt5-footer-bottom { max-width: 1280px; margin: 0 auto; padding: 20px 24px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px; font-size: 12px; }
        @media (min-width: 768px) { .dt5-footer-bottom { padding: 20px 48px; } }
        .dt5-social-row { display: flex; gap: 8px; margin-top: 18px; }
        .dt5-social-btn { width: 34px; height: 34px; border-radius: 7px; border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-size: 12px; color: rgba(255,255,255,0.4); text-decoration: none; transition: all 0.2s; }
        .dt5-social-btn:hover { border-color: var(--gold); color: var(--gold-light); }
        .dt5-footer-disclaimer { background: rgba(255,255,255,0.03); border-radius: 10px; padding: 14px 18px; margin: 0 24px 0; font-size: 11px; color: rgba(255,255,255,0.28); line-height: 1.65; border: 1px solid rgba(255,255,255,0.05); }
        @media (min-width: 768px) { .dt5-footer-disclaimer { margin: 0 48px 0; } }
      `}</style>

      <div className="dt5">

        {/* ── Topbar ── */}
        <div className="dt5-topbar">
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <div className="dt5-topbar-item">
              <span className="dt5-topbar-accent">📞</span>
              {displayPhone}
            </div>
            <div className="dt5-topbar-item" style={{ display: "none" }}>
              <span className="dt5-topbar-accent">✉</span>
              {displayEmail}
            </div>
          </div>
          <div className="dt5-topbar-item">
            <span className="dt5-topbar-accent">🕒</span>
            {workingHours || "Mon–Fri: 7 AM – 9 PM"}
          </div>
        </div>

        {/* ── Navbar ── */}
        <motion.header
          className={`dt5-nav ${scrolled ? "dt5-nav-scrolled" : "dt5-nav-base"}`}
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <div className="dt5-nav-inner">
            {/* Logo */}
            {headerType === "Image" && logoUrl ? (
              <div style={{ position: "relative", width: 130, height: 38 }}>
                <Image src={logoUrl} alt={displayName} fill className="object-contain" />
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div className="dt5-logo-dot" />
                <div>
                  <span className="dt5-logo-name">{displayName}</span>
                  <span className="dt5-logo-tag">{specialty || "Medical Centre"}</span>
                </div>
              </div>
            )}

            {/* Desktop Nav */}
            <nav className="dt5-nav-links">
              {navLinks.map(({ href, label }) => (
                <a key={href} href={href} className="dt5-nav-link">{label}</a>
              ))}
              <a href="#contact" className="dt5-btn-gold" style={{ padding: "10px 22px", fontSize: 13 }}>Book Appointment</a>
            </nav>

            {/* Hamburger */}
            <button className="dt5-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              <motion.div animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6.5 : 0 }} className="dt5-ham-bar" />
              <motion.div animate={{ opacity: menuOpen ? 0 : 1 }} className="dt5-ham-bar" />
              <motion.div animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6.5 : 0 }} className="dt5-ham-bar" />
            </button>
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                className="dt5-mobile-menu" style={{ overflow: "hidden" }}
              >
                <div className="dt5-mobile-menu-inner">
                  {navLinks.map(({ href, label }) => (
                    <a key={href} href={href} className="dt5-mobile-link" onClick={() => setMenuOpen(false)}>{label}</a>
                  ))}
                  <a href="#contact" className="dt5-btn-gold" style={{ marginTop: 14, justifyContent: "center" }} onClick={() => setMenuOpen(false)}>Book Appointment</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        {/* ══ HERO ══ */}
        <section id="home" ref={heroRef} className="dt5-hero">
          <div className="dt5-hero-noise" />
          <div className="dt5-hero-lines" />
          <div className="dt5-hero-bg-text">LUMINA</div>

          {/* Hero Image BG (mobile) */}
          {heroImage && (
            <>
              <div style={{ position: "absolute", inset: 0, background: `url(${heroImage}) center/cover no-repeat` }} className="dt5-hero-img-mobile" />
              <div style={{ position: "absolute", inset: 0, background: "rgba(8,14,26,0.82)" }} />
              <style>{`@media(min-width:1100px){.dt5-hero-img-mobile{display:none}}`}</style>
            </>
          )}

          <motion.div className="dt5-hero-inner" style={{ opacity: heroOpacity }}>
            {/* Content */}
            <div>
              <motion.p
                className="dt5-hero-overline"
                initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT }}
                style={{ fontSize: specialtyFontSize ? `clamp(10px, 2vw, ${specialtyFontSize}px)` : undefined }}
              >
                {specialty || "Advanced Medical Excellence"}
              </motion.p>

              <motion.h1
                className="dt5-hero-title"
                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.45, ease: EASE_OUT }}
                style={{ fontSize: heroTitleFontSize ? `clamp(3rem, 9vw, ${heroTitleFontSize}px)` : undefined }}
              >
                {heroTitle ? heroTitle : (<>Where <em>Precision</em><br />Meets<br />Compassion</>)}
              </motion.h1>

              <motion.p
                className="dt5-hero-desc"
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.65 }}
              >
                {tagline && <strong style={{ display: "block", color: "rgba(255,255,255,0.75)", marginBottom: 6, fontStyle: "normal" }}>{tagline}</strong>}
                {heroDescription || "Award-winning specialist care delivered with humanity and scientific rigour — because your health deserves nothing less than extraordinary."}
              </motion.p>

              <motion.div
                className="dt5-hero-cta"
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.8 }}
              >
                <a href="#contact" className="dt5-btn-gold">📅 Book Appointment</a>
                <a href={`tel:${displayEmergency}`} className="dt5-btn-outline-gold">🚨 Emergency Line</a>
              </motion.div>

              <motion.div
                className="dt5-hero-stats"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                {[["25+", "Years"], ["18K+", "Patients"], ["98%", "Satisfaction"]].map(([v, l]) => (
                  <div key={l}>
                    <p className="dt5-hero-stat-val">{v}</p>
                    <p className="dt5-hero-stat-lbl">{l}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Image Panel */}
            <motion.div
              className="dt5-hero-img-col"
              initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: EASE_OUT }}
            >
              <motion.div className="dt5-hero-img-wrap" style={{ y: heroY }}>
                <div className="dt5-hero-img-frame">
                  <Image
                    src={heroImage || "/images/templates/template-img-26.jpg"}
                    alt="Doctor" fill className="object-cover object-top" priority
                  />
                  <div className="dt5-hero-img-overlay" />
                  <div className="dt5-corner-accent" />
                </div>
                <div className="dt5-hero-badge">
                  <p className="dt5-hero-badge-num">{experience || "25"}+</p>
                  <p className="dt5-hero-badge-lbl">Years of<br />Excellence</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* ══ MARQUEE BAND ══ */}
        <div className="dt5-marquee-band" aria-hidden="true">
          <div className="dt5-marquee-track">
            {[...Array(2)].map((_, si) =>
              ["Advanced Diagnostics", "Personalised Care", "Expert Specialists", "24/7 Emergency", "Latest Technology", "Trusted by 18,000+", "Board-Certified Doctors", "Same-Day Appointments"].map((item, i) => (
                <div key={`${si}-${i}`} className="dt5-marquee-item">
                  {item}
                  <div className="dt5-marquee-dot" />
                </div>
              ))
            )}
          </div>
        </div>

        {/* ══ ABOUT ══ */}
        <section id="about" className="dt5-section" style={{ background: "var(--ivory-warm)" }}>
          <div className="dt5-inner">
            <div className="dt5-about-grid">
              {/* Image */}
              <Reveal dir="left">
                <div className="dt5-about-img-container">
                  <div className="dt5-about-gold-accent" />
                  <div className="dt5-about-img-main">
                    <Image src={aboutImage || "/images/templates/template-img-27.jpg"} alt="About" fill className="object-cover" />
                  </div>
                  <div className="dt5-about-accent-box">
                    <p className="dt5-about-accent-num">{experience || "25"}+</p>
                    <p className="dt5-about-accent-lbl">Years Exp.</p>
                  </div>
                </div>
              </Reveal>

              {/* Content */}
              <div>
                <Reveal><GoldLabel>{aboutUsTitle || "About the Practice"}</GoldLabel></Reveal>
                <Reveal delay={0.05}>
                  <h2 className="dt5-h2" style={{ color: "var(--navy)", marginBottom: 20 }}>
                    Evidence-Based Care, <em style={{ fontStyle: "italic", color: "var(--gold-dim)" }}>Delivered with Heart</em>
                  </h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <p style={{ color: "var(--text-dark)", lineHeight: 1.8, fontSize: 15, marginBottom: 24 }}>
                    {bio || "For over two decades we have combined clinical mastery with genuine human warmth. Our multidisciplinary team draws on the latest research and technology to create care that is truly personal — because no two patients are the same."}
                  </p>
                </Reveal>
                <Reveal delay={0.12}>
                  <div className="dt5-detail-grid">
                    {[
                      { icon: "🎓", label: "Education", val: qualification || education || "MD — Medical University" },
                      { icon: "🏥", label: "Hospital", val: hospitalName || displayName },
                      { icon: "🌐", label: "Languages", val: languagesSpoken || "English, Hindi" },
                      { icon: "📜", label: "Certifications", val: certifications || "MBBS, MD, FRCS" },
                    ].map((item) => (
                      <div key={item.label} className="dt5-detail-cell">
                        <p className="dt5-detail-lbl">{item.label}</p>
                        <p className="dt5-detail-val">{item.icon} {item.val}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>
                <Reveal delay={0.15}>
                  <a href="#contact" className="dt5-btn-gold">Request a Consultation →</a>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ══ SERVICES ══ */}
        <section id="services" className="dt5-section dt5-svc-bg">
          <div className="dt5-inner">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 48 }}>
              <div>
                <Reveal><GoldLabel>Our Specialties</GoldLabel></Reveal>
                <Reveal delay={0.05}>
                  <h2 className="dt5-h2" style={{ color: "var(--white)", marginBottom: 12 }}>
                    Comprehensive<br />Medical <em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>Services</em>
                  </h2>
                </Reveal>
              </div>
              <Reveal dir="right">
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, lineHeight: 1.7, maxWidth: 320 }}>
                  Select a specialty to learn how our experts can help you achieve optimal health.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <ServiceCarousel items={displayServices} />
            </Reveal>
          </div>
        </section>

        {/* ══ WHY CHOOSE US ══ */}
        <section className="dt5-section" style={{ background: "var(--ivory)" }}>
          <div className="dt5-inner">
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <Reveal><GoldLabel>Why Choose Us</GoldLabel></Reveal>
              <Reveal delay={0.05}>
                <h2 className="dt5-h2" style={{ color: "var(--navy)", marginBottom: 14 }}>
                  The Lumina <em style={{ fontStyle: "italic", color: "var(--gold-dim)" }}>Difference</em>
                </h2>
              </Reveal>
              <Reveal delay={0.1}><p style={{ color: "var(--text-dark)", maxWidth: 480, margin: "0 auto", fontSize: 14, lineHeight: 1.75 }}>World-class expertise combined with genuine care for every individual.</p></Reveal>
            </div>
            <Stagger className="dt5-why-grid">
              {displayWhyChoose.map((f, i) => (
                <motion.div key={i} variants={fadeUp(i * 0.09)} className="dt5-why-card">
                  <span className="dt5-why-icon">{f.icon || "✦"}</span>
                  <h3 className="dt5-why-title">{f.title || f.featureTitle}</h3>
                  <p className="dt5-why-desc">{f.description || f.featureDescription}</p>
                  <span className="dt5-why-num">0{i + 1}</span>
                </motion.div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ══ STATS BAND ══ */}
        <section className="dt5-stats-band">
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <Stagger className="dt5-stats-grid">
              {displayStats.map((s, i) => (
                <motion.div key={i} variants={scaleIn(i * 0.08)} className="dt5-stat-cell">
                  <p className="dt5-stat-val"><Counter target={s.value} /></p>
                  <p className="dt5-stat-lbl">{s.label}</p>
                </motion.div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ══ TESTIMONIALS + SCHEDULE ══ */}
        <section className="dt5-section" style={{ background: "var(--ivory-warm)" }}>
          <div className="dt5-inner">
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 64, alignItems: "start" }}>
              <style>{`@media(min-width:1024px){.dt5-ts-grid{grid-template-columns:1fr 1fr !important;}}`}</style>
              <div className="dt5-ts-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 64 }}>
                {/* Testimonials */}
                <div>
                  <Reveal dir="left"><GoldLabel>Patient Stories</GoldLabel></Reveal>
                  <Reveal dir="left" delay={0.05}>
                    <h2 className="dt5-h2" style={{ color: "var(--navy)", marginBottom: 14 }}>
                      Voices That <em style={{ fontStyle: "italic", color: "var(--gold-dim)" }}>Matter</em>
                    </h2>
                  </Reveal>
                  <Reveal dir="left" delay={0.1}>
                    <p style={{ color: "var(--text-dark)", fontSize: 14, lineHeight: 1.75, marginBottom: 32 }}>
                      Real experiences from the patients we are honoured to serve.
                    </p>
                    <TestimonialSlider items={displayTestimonials} />
                  </Reveal>
                </div>

                {/* Schedule */}
                <div>
                  <Reveal dir="right"><GoldLabel>Clinic Hours</GoldLabel></Reveal>
                  <Reveal dir="right" delay={0.05}>
                    <h2 className="dt5-h2" style={{ color: "var(--navy)", marginBottom: 14 }}>
                      When We're <em style={{ fontStyle: "italic", color: "var(--gold-dim)" }}>Open</em>
                    </h2>
                  </Reveal>
                  <Reveal dir="right" delay={0.1}>
                    <p style={{ color: "var(--text-dark)", fontSize: 14, lineHeight: 1.75, marginBottom: 28 }}>
                      Drop in or reserve your slot — our team is always ready to help.
                    </p>
                    <div className="dt5-schedule-outer" style={{ marginBottom: 24 }}>
                      {displaySchedule.map((row, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          className="dt5-schedule-row"
                        >
                          <span className="dt5-schedule-day">{row.day}</span>
                          <div className="dt5-schedule-times">
                            <span className="dt5-schedule-open">{row.open || row.openingTime}</span>
                            <span className="dt5-schedule-sep">—</span>
                            <span className="dt5-schedule-close">{row.close || row.closingTime}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <a href="#contact" className="dt5-btn-navy">Reserve a Slot →</a>
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ TEAM ══ */}
        <section id="team" className="dt5-section" style={{ background: "var(--navy)" }}>
          <div className="dt5-inner">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 48 }}>
              <div>
                <Reveal><GoldLabel>Our Specialists</GoldLabel></Reveal>
                <Reveal delay={0.05}>
                  <h2 className="dt5-h2" style={{ color: "var(--white)", marginBottom: 0 }}>Meet the <em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>Doctors</em></h2>
                </Reveal>
              </div>
              <Reveal dir="right">
                <a href="#contact" className="dt5-btn-outline-gold">View All Specialists →</a>
              </Reveal>
            </div>
            <Stagger className="dt5-team-grid">
              {displayTeam.map((doc, i) => (
                <motion.div key={i} variants={scaleIn(i * 0.1)} className="dt5-team-card">
                  <div className="dt5-team-img">
                    {doc.image ? (
                      <Image src={doc.image} alt={doc.name || doc.doctorName} fill className="object-cover object-top" />
                    ) : "👨‍⚕️"}
                  </div>
                  <div className="dt5-team-overlay">
                    <div className="dt5-team-info">
                      <div className="dt5-team-gold-bar" />
                      <p className="dt5-team-name">{doc.name || doc.doctorName}</p>
                      <p className="dt5-team-spec">{doc.specialization}</p>
                      <p className="dt5-team-exp">{doc.experience} Experience</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ══ FAQ ══ */}
        <section className="dt5-section" style={{ background: "var(--ivory)" }}>
          <div className="dt5-inner">
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 64 }}>
              <style>{`@media(min-width:1024px){.dt5-faq-grid{grid-template-columns:2fr 3fr !important;}}`}</style>
              <div className="dt5-faq-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 64 }}>
                <div>
                  <Reveal dir="left"><GoldLabel>FAQ</GoldLabel></Reveal>
                  <Reveal dir="left" delay={0.05}>
                    <h2 className="dt5-h2" style={{ color: "var(--navy)", marginBottom: 16 }}>
                      Frequently <em style={{ fontStyle: "italic", color: "var(--gold-dim)" }}>Asked</em>
                    </h2>
                  </Reveal>
                  <Reveal dir="left" delay={0.1}>
                    <p style={{ color: "var(--text-dark)", fontSize: 14, lineHeight: 1.75, marginBottom: 24 }}>
                      Everything you need to know before your visit. Can't find an answer?
                    </p>
                    <a href={`tel:${displayPhone}`} className="dt5-btn-gold">📞 Call Our Team</a>
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
        <section className="dt5-section" style={{ background: "var(--ivory-warm)", borderTop: "1px solid rgba(200,146,42,0.08)" }}>
          <div className="dt5-inner">
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <Reveal><GoldLabel>Partners</GoldLabel></Reveal>
              <Reveal delay={0.05}>
                <h2 className="dt5-h2" style={{ color: "var(--navy)", marginBottom: 10 }}>
                  Accepted <em style={{ fontStyle: "italic", color: "var(--gold-dim)" }}>Insurance</em>
                </h2>
              </Reveal>
            </div>
            <Stagger className="dt5-ins-grid">
              {displayInsurance.map((ins, i) => (
                <motion.div key={i} variants={scaleIn(i * 0.05)} className="dt5-ins-card">
                  {ins.logo ? (
                    <div style={{ position: "relative", height: 36, marginBottom: 6 }}>
                      <Image src={ins.logo} alt={ins.name} fill className="object-contain" />
                    </div>
                  ) : <div style={{ fontSize: "1.3rem", marginBottom: 6 }}>🏢</div>}
                  {ins.name}
                </motion.div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ══ BLOG ══ */}
        {enableBlog !== false && (
          <section className="dt5-section" style={{ background: "var(--ivory)" }}>
            <div className="dt5-inner">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 48 }}>
                <div>
                  <Reveal dir="left"><GoldLabel>{blogSubtitle || "Health Insights"}</GoldLabel></Reveal>
                  <Reveal dir="left" delay={0.05}>
                    <h2 className="dt5-h2" style={{ color: "var(--navy)" }}>{blogSectionTitle || "From Our <em>Experts</em>"}</h2>
                  </Reveal>
                </div>
                <Reveal dir="right">
                  <a href="#" style={{ fontSize: 13, fontWeight: 600, color: "var(--gold-dim)", textDecoration: "none", borderBottom: "1.5px solid rgba(200,146,42,0.3)", paddingBottom: 2 }}>All articles →</a>
                </Reveal>
              </div>
              <Stagger className="dt5-blog-grid">
                {[
                  { tag: "Heart Health", emoji: "❤️", bg: "#fdf5ec", title: "10 Habits for a Stronger Heart", excerpt: "Small daily changes that dramatically reduce your cardiovascular risk over time.", date: "May 2025" },
                  { tag: "Nutrition", emoji: "🥗", bg: "#f0f9f4", title: "Anti-Inflammatory Foods to Eat Daily", excerpt: "How your plate can be your most powerful medicine against chronic disease.", date: "Apr 2025" },
                  { tag: "Wellbeing", emoji: "🧘", bg: "#f5f0f9", title: "Managing Stress in the Modern World", excerpt: "Evidence-based strategies for maintaining balance when everything feels overwhelming.", date: "Mar 2025" },
                ].map((post, i) => (
                  <motion.article key={i} variants={fadeUp(i * 0.1)} className="dt5-blog-card">
                    <div className="dt5-blog-thumb" style={{ background: post.bg }}>
                      <span style={{ fontSize: "2.5rem" }}>{post.emoji}</span>
                    </div>
                    <div className="dt5-blog-body">
                      <Pill>{post.tag}</Pill>
                      <h3 className="dt5-blog-title">{post.title}</h3>
                      <p className="dt5-blog-excerpt">{post.excerpt}</p>
                      <p className="dt5-blog-date">✦ {post.date}</p>
                    </div>
                  </motion.article>
                ))}
              </Stagger>
            </div>
          </section>
        )}

        {/* ══ CONTACT ══ */}
        <section id="contact" className="dt5-section dt5-contact-bg">
          <div className="dt5-inner">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <Reveal><GoldLabel>Get In Touch</GoldLabel></Reveal>
              <Reveal delay={0.05}>
                <h2 className="dt5-h2" style={{ color: "var(--white)", marginBottom: 10 }}>
                  Contact & <em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>Location</em>
                </h2>
              </Reveal>
            </div>

            {/* Emergency strip */}
            <Reveal>
              <div className="dt5-emergency-strip" style={{ marginBottom: 36 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: "1.5rem" }}>🚨</span>
                  <div>
                    <p style={{ fontWeight: 700, color: "var(--navy)", fontSize: 15 }}>Emergency? We're available 24/7</p>
                    <p style={{ color: "rgba(8,14,26,0.55)", fontSize: 12 }}>{emergencyAvailability || "Immediate response for all medical emergencies"}</p>
                  </div>
                </div>
                <a href={`tel:${displayEmergency}`} className="dt5-btn-navy" style={{ flexShrink: 0, whiteSpace: "nowrap" }}>
                  Call {displayEmergency}
                </a>
              </div>
            </Reveal>

            <div className="dt5-contact-grid">
              <Stagger style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { icon: "📍", label: "Address", val: displayAddress },
                  { icon: "📞", label: "Phone", val: displayPhone },
                  { icon: "✉️", label: "Email", val: displayEmail },
                  ...(whatsappNumber ? [{ icon: "💬", label: "WhatsApp", val: whatsappNumber }] : []),
                  ...(ambulanceNumber ? [{ icon: "🚑", label: "Ambulance", val: ambulanceNumber }] : []),
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeLeft(i * 0.08)} className="dt5-contact-info-card">
                    <div className="dt5-contact-icon">{item.icon}</div>
                    <div style={{ wordBreak: "break-word" }}>
                      <p className="dt5-contact-lbl">{item.label}</p>
                      <p className="dt5-contact-val">{item.val}</p>
                    </div>
                  </motion.div>
                ))}
                {whatsappNumber && (
                  <Reveal>
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
                <div className="dt5-map-wrap">
                  {googleMapsEmbed ? (
                    <iframe src={googleMapsEmbed} style={{ width: "100%", height: "100%", minHeight: 340, border: "none" }} allowFullScreen loading="lazy" title="Location" />
                  ) : (
                    <div className="dt5-map-placeholder">
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
        <footer className="dt5-footer">
          <div className="dt5-footer-top">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 10, height: 10, background: "var(--gold)", borderRadius: "50%" }} />
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "#fff", fontSize: "1.35rem" }}>{displayName}</span>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.8, maxWidth: 280, marginBottom: 6 }}>
                Delivering extraordinary medical care with precision, compassion, and integrity.
              </p>
              <div className="dt5-social-row">
                {["f", "𝕏", "📷", "in"].map((s, i) => (
                  <a key={i} href={socialLinks?.[["facebook", "twitter", "instagram", "linkedin"][i]] || "#"} className="dt5-social-btn">{s}</a>
                ))}
              </div>
            </div>

            <div>
              <p className="dt5-footer-heading">Navigation</p>
              {navLinks.map(({ href, label }) => (
                <a key={href} href={href} className="dt5-footer-link">{label}</a>
              ))}
            </div>

            <div>
              <p className="dt5-footer-heading">Services</p>
              {displayServices.slice(0, 5).map((s, i) => (
                <a key={i} href="#services" className="dt5-footer-link">{s.title || s.name}</a>
              ))}
            </div>

            <div>
              <p className="dt5-footer-heading">Contact</p>
              <p style={{ display: "flex", gap: 8, fontSize: 13, marginBottom: 10, alignItems: "flex-start" }}>
                <span style={{ flexShrink: 0 }}>📍</span><span style={{ lineHeight: 1.5 }}>{displayAddress}</span>
              </p>
              <p style={{ display: "flex", gap: 8, fontSize: 13, marginBottom: 10 }}>
                <span>📞</span><span>{displayPhone}</span>
              </p>
              <p style={{ display: "flex", gap: 8, fontSize: 13, marginBottom: 10 }}>
                <span>✉</span><span style={{ wordBreak: "break-all" }}>{displayEmail}</span>
              </p>
              {emergencyAvailability && (
                <p style={{ display: "flex", gap: 8, fontSize: 13, color: "var(--gold)" }}>
                  <span>🚨</span><span>{emergencyAvailability}</span>
                </p>
              )}
            </div>
          </div>

          {footerDisclaimer && (
            <div className="dt5-footer-disclaimer">
              <strong style={{ color: "var(--gold)" }}>Medical Disclaimer: </strong>
              {footerDisclaimer}
            </div>
          )}

          <hr className="dt5-footer-divider" />
          <div className="dt5-footer-bottom">
            <p>{footerCopyright || `© ${new Date().getFullYear()} ${displayName}. All Rights Reserved.`}</p>
            <div style={{ display: "flex", gap: 20 }}>
              <a href="#" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none", fontSize: 12 }}>Privacy Policy</a>
              <a href="#" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none", fontSize: 12 }}>Terms of Service</a>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}