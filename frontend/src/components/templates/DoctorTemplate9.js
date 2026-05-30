"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion, AnimatePresence, useInView, useScroll,
  useTransform, useSpring, useMotionValue, useVelocity,
  useAnimationFrame,
} from "framer-motion";
import Image from "next/image";

/*
 ╔═══════════════════════════════════════════════╗
 ║   DOCTOR TEMPLATE 9 — "VIVID"                ║
 ║   Palette: 5-Colour Editorial Multicolour    ║
 ║   Aesthetic: Bold · Kinetic · Modern         ║
 ╚═══════════════════════════════════════════════╝

  COLOUR SYSTEM (5 accent ramps)
  ─────────────────────────────
  --azure      #0057FF  (electric blue)
  --azure-dark #0038CC
  --azure-pale #E5EEFF

  --jade       #00B87C  (emerald green)
  --jade-dark  #007A52
  --jade-pale  #E0F7F0

  --amber      #FF8C00  (vivid amber)
  --amber-dark #CC6F00
  --amber-pale #FFF3E0

  --rose       #E8194B  (vivid rose/red)
  --rose-dark  #B5143B
  --rose-pale  #FFE4EC

  --violet     #7B2FFF  (electric violet)
  --violet-dark#5B1FCC
  --violet-pale#F0E8FF

  NEUTRALS
  ─────────
  --ink        #0A0A0F  (richest dark)
  --ink-mid    #14141F
  --ink-light  #1E1E2E
  --ink-border #2A2A3E
  --smoke      #F5F5FA  (light bg)
  --smoke-card #FAFAFF
  --white      #FFFFFF
  --text-body  #3A3A4A
  --text-muted #7A7A8A
*/

/* ─── Easing ─── */
const EXPO = [0.16, 1, 0.3, 1];
const CIRC = [0.0, 0.55, 0.45, 1];
const BACK = [0.34, 1.56, 0.64, 1];

/* ─── Variants ─── */
const vFadeUp = (d = 0) => ({
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: d, ease: EXPO } },
});
const vFadeLeft = (d = 0) => ({
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: d, ease: EXPO } },
});
const vFadeRight = (d = 0) => ({
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: d, ease: EXPO } },
});
const vScale = (d = 0) => ({
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, delay: d, ease: BACK } },
});
const vStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

/* ─── Scroll Reveal ─── */
function Reveal({ children, className = "", dir = "up", delay = 0, once = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-80px" });
  const variants =
    dir === "left" ? vFadeLeft(delay) :
      dir === "right" ? vFadeRight(delay) :
        dir === "scale" ? vScale(delay) : vFadeUp(delay);
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"}
      variants={variants} className={className}>
      {children}
    </motion.div>
  );
}

function Stagger({ children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"}
      variants={vStagger} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Animated Number ─── */
function CountUp({ to, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const n = parseInt(String(to).replace(/\D/g, "")) || 0;
    let cur = 0;
    const step = Math.max(1, Math.ceil(n / 60));
    const id = setInterval(() => {
      cur = Math.min(cur + step, n);
      setVal(cur);
      if (cur >= n) clearInterval(id);
    }, 22);
    return () => clearInterval(id);
  }, [inView, to]);
  return <span ref={ref}>{val}{String(to).replace(/\d/g, "")}{suffix}</span>;
}

/* ─── Magnetic Button ─── */
function MagneticBtn({ children, className = "", href = "#", ...rest }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });
  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left - r.width / 2) * 0.35);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  };
  const onLeave = () => { x.set(0); y.set(0); };
  return (
    <motion.a ref={ref} href={href} style={{ x: sx, y: sy }}
      onMouseMove={onMove} onMouseLeave={onLeave}
      className={className} {...rest}>{children}</motion.a>
  );
}

/* ─── Ticker Tape ─── */
function Ticker({ items, speed = 32, bg = "var(--azure)", color = "var(--white)" }) {
  return (
    <div style={{ background: bg, overflow: "hidden", padding: "12px 0", position: "relative" }}>
      <motion.div
        style={{ display: "flex", gap: 0, whiteSpace: "nowrap" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(2)].map((_, si) =>
          items.map((item, i) => (
            <span key={`${si}-${i}`} style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              padding: "0 28px", color, fontSize: 13, fontWeight: 600, letterSpacing: "0.06em",
            }}>
              {item}
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: color, opacity: 0.4, display: "inline-block" }} />
            </span>
          ))
        )}
      </motion.div>
    </div>
  );
}

/* ─── Colour Pill ─── */
function CPill({ color = "azure", children }) {
  const map = {
    azure: { bg: "var(--azure-pale)", text: "var(--azure-dark)", border: "var(--azure)" },
    jade: { bg: "var(--jade-pale)", text: "var(--jade-dark)", border: "var(--jade)" },
    amber: { bg: "var(--amber-pale)", text: "var(--amber-dark)", border: "var(--amber)" },
    rose: { bg: "var(--rose-pale)", text: "var(--rose-dark)", border: "var(--rose)" },
    violet: { bg: "var(--violet-pale)", text: "var(--violet-dark)", border: "var(--violet)" },
  };
  const c = map[color] || map.azure;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      background: c.bg, color: c.text, border: `1.5px solid ${c.border}`,
      borderRadius: 100, padding: "4px 14px", fontSize: 11, fontWeight: 700,
      letterSpacing: "0.16em", textTransform: "uppercase",
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: c.border, display: "inline-block" }} />
      {children}
    </span>
  );
}

/* ─── Accent Heading ─── */
function AccentH({ label, color = "azure", dark = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: `var(--${color})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 14, color: "#fff", fontWeight: 800, letterSpacing: "0.04em",
        flexShrink: 0,
      }}>✦</div>
      <span style={{
        fontSize: 11, fontWeight: 700, letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: dark ? `var(--${color}-pale)` : `var(--${color}-dark)`,
      }}>{label}</span>
    </div>
  );
}

/* ─── Service Tabs ─── */
function ServiceTabs({ items }) {
  const [active, setActive] = useState(0);
  const colours = ["azure", "jade", "amber", "rose", "violet", "jade", "azure", "rose"];
  return (
    <div className="dt9-svc-wrap">
      <div className="dt9-svc-tabs">
        {items.map((s, i) => (
          <motion.button
            key={i}
            className={`dt9-svc-tab ${i === active ? "on" : ""}`}
            onClick={() => setActive(i)}
            style={{ "--acc": `var(--${colours[i % colours.length]})` }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <span className="dt9-svc-tab-ico">{s.icon || "🩺"}</span>
            <span className="dt9-svc-tab-name">{s.title || s.name}</span>
            <motion.span
              className="dt9-svc-tab-num"
              animate={{ opacity: i === active ? 1 : 0.3 }}
            >{String(i + 1).padStart(2, "0")}</motion.span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: EXPO }}
          className="dt9-svc-panel"
          style={{ "--acc": `var(--${colours[active % colours.length]})` }}
        >
          <div className="dt9-svc-panel-ico">{items[active].icon || "🩺"}</div>
          <CPill color={colours[active % colours.length]}>Specialty</CPill>
          <h3 className="dt9-svc-panel-title">{items[active].title || items[active].name}</h3>
          <p className="dt9-svc-panel-desc">
            {items[active].description || items[active].desc || "Expert, personalised care tailored precisely to your needs."}
          </p>
          <div className="dt9-svc-panel-bar" />
          <a href="#contact" className="dt9-btn-fill">Book This Service →</a>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─── Testimonial Carousel ─── */
function TestCarousel({ items }) {
  const [cur, setCur] = useState(0);
  const [dir, setDir] = useState(1);
  const len = items.length;
  const go = useCallback((n) => {
    const next = ((n % len) + len) % len;
    setDir(next > cur ? 1 : -1);
    setCur(next);
  }, [cur, len]);
  useEffect(() => {
    const t = setInterval(() => go(cur + 1), 5500);
    return () => clearInterval(t);
  }, [cur, go]);
  const accs = ["azure", "jade", "amber", "rose", "violet"];
  const acc = accs[cur % accs.length];
  return (
    <div className="dt9-test-wrap">
      <AnimatePresence custom={dir} mode="wait">
        <motion.div
          key={cur}
          custom={dir}
          variants={{
            enter: (d) => ({ opacity: 0, x: d * 60 }),
            center: { opacity: 1, x: 0 },
            exit: (d) => ({ opacity: 0, x: -d * 40 }),
          }}
          initial="enter" animate="center" exit="exit"
          transition={{ duration: 0.5, ease: EXPO }}
          className="dt9-test-card"
          style={{ "--acc": `var(--${acc})` }}
        >
          <div className="dt9-test-stripe" />
          <div className="dt9-test-q">❝</div>
          <p className="dt9-test-text">{items[cur].review || items[cur].text}</p>
          <div className="dt9-test-foot">
            <div className="dt9-test-av">
              {items[cur].image
                ? <Image src={items[cur].image} alt={items[cur].name} fill className="object-cover" />
                : <span>{(items[cur].name || "P")[0]}</span>}
            </div>
            <div>
              <div style={{ display: "flex", gap: 2, marginBottom: 4 }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: i < (items[cur].rating || 5) ? `var(--${acc})` : "#D0D0E0", fontSize: 13 }}>★</span>
                ))}
              </div>
              <p className="dt9-test-name">{items[cur].name || items[cur].patientName}</p>
              <p className="dt9-test-role">Verified Patient</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="dt9-test-controls">
        <button className="dt9-test-arrow" onClick={() => go(cur - 1)}>‹</button>
        <div className="dt9-test-dots">
          {items.map((_, i) => (
            <motion.button
              key={i} className={`dt9-test-dot ${i === cur ? "on" : ""}`}
              onClick={() => go(i)}
              animate={{ width: i === cur ? 24 : 8, background: i === cur ? `var(--${accs[i % accs.length]})` : "#C8C8D8" }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
        <button className="dt9-test-arrow" onClick={() => go(cur + 1)}>›</button>
      </div>
    </div>
  );
}

/* ─── FAQ ─── */
function FaqItem({ q, a, idx }) {
  const [open, setOpen] = useState(false);
  const colours = ["azure", "jade", "amber", "rose", "violet"];
  const acc = colours[idx % colours.length];
  return (
    <motion.div
      variants={vFadeUp(idx * 0.07)}
      className={`dt9-faq-item ${open ? "open" : ""}`}
      style={{ "--acc": `var(--${acc})` }}
    >
      <button className="dt9-faq-q" onClick={() => setOpen(!open)}>
        <span className="dt9-faq-num">{String(idx + 1).padStart(2, "0")}</span>
        <span className="dt9-faq-text">{q}</span>
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }} className="dt9-faq-icon">+</motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32 }}
            style={{ overflow: "hidden" }}
          >
            <p className="dt9-faq-ans">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Gallery Mosaic ─── */
function GalleryMosaic({ items }) {
  const colours = ["azure", "jade", "amber", "rose", "violet"];
  if (!items?.length) {
    const placeholders = [
      { emoji: "🏥", label: "Our Clinic" },
      { emoji: "🔬", label: "Laboratory" },
      { emoji: "🩻", label: "Imaging" },
      { emoji: "💊", label: "Pharmacy" },
      { emoji: "🫀", label: "Cardio Unit" },
      { emoji: "🧬", label: "Genetics" },
    ];
    return (
      <div className="dt9-mosaic">
        {placeholders.map((p, i) => (
          <motion.div
            key={i} variants={vScale(i * 0.06)}
            className={`dt9-mosaic-cell dt9-mosaic-cell-${i + 1}`}
            style={{ "--acc": `var(--${colours[i % colours.length]})` }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="dt9-mosaic-inner">
              <span className="dt9-mosaic-emoji">{p.emoji}</span>
              <span className="dt9-mosaic-label">{p.label}</span>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }
  return (
    <div className="dt9-mosaic">
      {items.slice(0, 6).map((img, i) => (
        <motion.div key={i} variants={vScale(i * 0.06)} className={`dt9-mosaic-cell dt9-mosaic-cell-${i + 1}`} whileHover={{ scale: 1.02 }}>
          <Image src={img} alt={`Gallery ${i + 1}`} fill className="object-cover" />
        </motion.div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════
   MAIN TEMPLATE
════════════════════════════════════════ */
export default function DoctorTemplate9({ data }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroParallax = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 56);
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

  const phone_ = phone ? `${countryCode?.split(" ")[0] || ""}${phone}` : "+1 800 MED CARE";
  const email_ = contactEmail || "hello@vividclinic.com";
  const address_ = address || "12 Harley Street, London W1G";
  const name_ = clinicName || "Vivid Health";
  const emergency_ = emergencyContact || phone_;

  const DEF_SERVICES = [
    { icon: "🫀", title: "Cardiology", description: "Advanced cardiac diagnostics and interventional procedures using AI-assisted imaging and precision catheterisation." },
    { icon: "🧠", title: "Neurology", description: "Comprehensive assessment of brain, spine and nervous system disorders by fellowship-trained neurologists." },
    { icon: "🦴", title: "Orthopedics", description: "Minimally invasive joint and bone procedures with rapid-recovery pathways designed around your lifestyle." },
    { icon: "👶", title: "Pediatrics", description: "Child-centred care in a welcoming environment — making every visit positive for little patients and parents." },
    { icon: "👁️", title: "Ophthalmology", description: "Full-spectrum eye health from prescription management to advanced retinal laser treatments." },
    { icon: "🩻", title: "Radiology", description: "High-resolution MRI, CT and ultrasound interpreted by specialised radiologists within 24 hours." },
  ];
  const DEF_WHY = [
    { icon: "🏅", title: "Board-Certified", desc: "Every clinician holds national certification with advanced subspecialty training." },
    { icon: "🔬", title: "AI Diagnostics", desc: "Machine-learning assisted analysis for faster, more accurate diagnoses." },
    { icon: "⚡", title: "Same-Day Slots", desc: "Urgent and routine appointments available every day — zero long waits." },
    { icon: "🛡️", title: "Clear Pricing", desc: "Fully itemised billing with no hidden fees. We work with all major insurers." },
    { icon: "🌐", title: "Multilingual", desc: "Care delivered in 8+ languages so you're always perfectly understood." },
    { icon: "📱", title: "Digital Records", desc: "All your health data, on demand, via our secure patient portal." },
  ];
  const DEF_SCHEDULE = [
    { day: "Monday – Friday", open: "7:00 AM", close: "9:00 PM" },
    { day: "Saturday", open: "8:00 AM", close: "6:00 PM" },
    { day: "Sunday", open: "10:00 AM", close: "3:00 PM" },
  ];
  const DEF_STATS = [
    { value: "28+", label: "Years of Excellence" },
    { value: "22K+", label: "Patients Treated" },
    { value: "99%", label: "Satisfaction Rate" },
    { value: "120+", label: "Specialists" },
  ];
  const DEF_TESTIMONIALS = [
    { name: "Sophie Martin", review: "The level of care at Vivid Health is genuinely extraordinary. Every single team member treated me with the warmth and precision you'd hope for but rarely find.", rating: 5 },
    { name: "Rohan Kapoor", review: "Diagnosis was swift, the specialist was brilliant and the follow-up has been impeccable. I recommend Vivid Health without any hesitation whatsoever.", rating: 5 },
    { name: "Elena Voss", review: "I've never experienced healthcare like this. Modern facilities, compassionate staff, and a care plan I actually understand. Truly exceptional.", rating: 5 },
    { name: "James Okafor", review: "From the moment I walked in to the final sign-off, everything was seamless. The staff are warm, knowledgeable and genuinely invested in your recovery.", rating: 5 },
  ];
  const DEF_TEAM = [
    { name: "Dr. Aisha Patel", specialization: "Cardiology", experience: "16 Years" },
    { name: "Dr. Marcus Webb", specialization: "Neurology", experience: "14 Years" },
    { name: "Dr. Yuki Tanaka", specialization: "Orthopedics", experience: "12 Years" },
    { name: "Dr. Isabelle Roy", specialization: "Pediatrics", experience: "10 Years" },
    { name: "Dr. Samuel Nkosi", specialization: "Ophthalmology", experience: "11 Years" },
    { name: "Dr. Clara Fischer", specialization: "Radiology", experience: "9 Years" },
  ];
  const DEF_FAQS = [
    { question: "How do I book a consultation?", answer: "Book online 24/7 via our website, call our care line, or drop in. Same-day slots are routinely available for urgent queries." },
    { question: "Which insurance plans do you accept?", answer: "We accept all major insurers including BUPA, AXA, Cigna, Vitality and NHS referrals. Contact us to verify your coverage." },
    { question: "What should I bring to my first appointment?", answer: "A valid ID, insurance card, any previous test results or scans, and a list of current medications." },
    { question: "Is emergency care available after hours?", answer: "Yes — our 24-hour emergency line connects you to a qualified clinician day or night." },
    { question: "Can I access my records online?", answer: "Absolutely. Our secure patient portal gives you instant access to results, notes and prescriptions from any device." },
  ];
  const DEF_INSURANCE = [
    { name: "BUPA" }, { name: "AXA Health" }, { name: "Cigna" },
    { name: "Vitality" }, { name: "Aviva" }, { name: "NHS" },
  ];

  const svcs = services?.length ? services : DEF_SERVICES;
  const why = whyChooseUs?.length ? whyChooseUs : DEF_WHY;
  const sched = schedule?.length ? schedule : DEF_SCHEDULE;
  const statsD = stats?.length ? stats : DEF_STATS;
  const tests = testimonials?.length ? testimonials : DEF_TESTIMONIALS;
  const team = teamDoctors?.length ? teamDoctors : DEF_TEAM;
  const faqsD = faqs?.length ? faqs : DEF_FAQS;
  const ins = insurancePartners?.length ? insurancePartners : DEF_INSURANCE;

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#team", label: "Team" },
    { href: "#gallery", label: "Gallery" },
    { href: "#contact", label: "Contact" },
  ];

  const tickerItems = [
    "Advanced Diagnostics", "24/7 Emergency", "Expert Specialists",
    "Personalised Care", "Same-Day Bookings", "AI-Assisted Imaging",
    "Board-Certified Doctors", "Multilingual Care",
  ];

  const accentColours = ["azure", "jade", "amber", "rose", "violet"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        :root {
          --azure: #0057FF; --azure-dark: #0038CC; --azure-pale: #E5EEFF;
          --jade: #00B87C; --jade-dark: #007A52; --jade-pale: #E0F7F0;
          --amber: #FF8C00; --amber-dark: #CC6F00; --amber-pale: #FFF3E0;
          --rose: #E8194B; --rose-dark: #B5143B; --rose-pale: #FFE4EC;
          --violet: #7B2FFF; --violet-dark: #5B1FCC; --violet-pale: #F0E8FF;
          --ink: #0A0A0F; --ink-mid: #14141F; --ink-light: #1E1E2E; --ink-border: #2A2A3E;
          --smoke: #F5F5FA; --smoke-card: #FAFAFF; --white: #FFFFFF;
          --text-body: #3A3A4A; --text-muted: #7A7A8A;
        }

        .dt9 { font-family: 'DM Sans', sans-serif; color: var(--text-body); background: var(--smoke); overflow-x: hidden; scroll-behavior: smooth; }
        .dt9-serif { font-family: 'DM Serif Display', Georgia, serif; }
        .dt9-inner { max-width: 1320px; margin: 0 auto; padding: 0 24px; }
        @media(min-width:768px){ .dt9-inner { padding: 0 48px; } }
        .dt9-section { padding: 100px 0; }
        @media(min-width:768px){ .dt9-section { padding: 128px 0; } }

        /* ── Topbar ── */
        .dt9-topbar { background: var(--ink); padding: 8px 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px; }
        @media(min-width:640px){ .dt9-topbar { padding: 9px 24px; } }
        @media(min-width:768px){ .dt9-topbar { padding: 9px 48px; } }
        .dt9-topbar-item { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 500; color: rgba(255,255,255,0.5); }
        @media(min-width:640px){ .dt9-topbar-item { font-size: 12px; gap: 8px; } }
        .dt9-topbar-accent { color: var(--jade); }
        .dt9-topbar-pill { background: var(--rose); color: #fff; font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 3px 8px; border-radius: 100px; }
        .dt9-topbar-email { display: none; }
        @media(min-width:768px){ .dt9-topbar-email { display: flex; } }
        .dt9-topbar-hours { display: none; }
        @media(min-width:480px){ .dt9-topbar-hours { display: flex; } }

        /* ── Navbar ── */
        .dt9-nav { position: sticky; top: 0; z-index: 100; }
        .dt9-nav-bar { background: rgba(255,255,255,0.96); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(0,0,0,0.07); transition: box-shadow 0.3s; }
        .dt9-nav-bar.scrolled { box-shadow: 0 4px 40px rgba(0,0,0,0.1); }
        .dt9-nav-inner { max-width: 1320px; margin: 0 auto; padding: 0 16px; height: 60px; display: flex; justify-content: space-between; align-items: center; gap: 8px; }
        @media(min-width:480px){ .dt9-nav-inner { padding: 0 24px; height: 64px; } }
        @media(min-width:768px){ .dt9-nav-inner { padding: 0 48px; height: 70px; } }
        .dt9-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; flex-shrink: 0; }
        .dt9-logo-badge { width: 36px; height: 36px; border-radius: 10px; background: var(--azure); display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
        @media(min-width:480px){ .dt9-logo-badge { width: 42px; height: 42px; border-radius: 12px; font-size: 18px; } }
        .dt9-logo-name { font-family: 'DM Serif Display', serif; font-size: 1.15rem; color: var(--ink); line-height: 1; }
        @media(min-width:480px){ .dt9-logo-name { font-size: 1.35rem; } }
        .dt9-logo-tag { font-size: 8px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: var(--text-muted); display: none; }
        @media(min-width:480px){ .dt9-logo-tag { display: block; font-size: 9.5px; letter-spacing: 0.2em; } }
        .dt9-nav-links { display: none; align-items: center; gap: 4px; }
        @media(min-width:1024px){ .dt9-nav-links { display: flex; gap: 8px; } }
        .dt9-nav-link { font-size: 13px; font-weight: 500; color: var(--text-muted); text-decoration: none; padding: 6px 10px; border-radius: 8px; transition: color 0.2s, background 0.2s; white-space: nowrap; }
        @media(min-width:1200px){ .dt9-nav-link { font-size: 13.5px; padding: 6px 12px; } }
        .dt9-nav-link:hover { color: var(--azure); background: var(--azure-pale); }
        .dt9-nav-link.active { color: var(--azure); background: var(--azure-pale); }
        .dt9-nav-cta { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .dt9-nav-book-btn { display: none; }
        @media(min-width:640px){ .dt9-nav-book-btn { display: inline-flex; font-size: 13px; padding: 8px 16px; border-radius: 8px; } }
        @media(min-width:768px){ .dt9-nav-book-btn { font-size: 14px; padding: 10px 20px; } }
        .dt9-ham { background: none; border: none; cursor: pointer; padding: 6px; display: flex; flex-direction: column; gap: 5px; }
        @media(min-width:1024px){ .dt9-ham { display: none; } }
        .dt9-ham-bar { width: 22px; height: 2px; background: var(--ink); border-radius: 2px; transition: all 0.2s; }
        .dt9-mobile-menu { background: var(--white); border-top: 1px solid rgba(0,0,0,0.06); overflow: hidden; }
        @media(min-width:1024px){ .dt9-mobile-menu { display: none !important; } }
        .dt9-mobile-links { padding: 10px 16px; display: flex; flex-direction: column; }
        @media(min-width:480px){ .dt9-mobile-links { padding: 12px 24px; } }
        .dt9-mobile-link { font-size: 15px; font-weight: 500; color: var(--text-body); text-decoration: none; padding: 12px 0; border-bottom: 1px solid rgba(0,0,0,0.05); display: block; }

        /* ── Buttons ── */
        .dt9-btn { display: inline-flex; align-items: center; gap: 8px; padding: 11px 20px; border-radius: 10px; font-weight: 600; font-size: 13px; text-decoration: none; cursor: pointer; border: none; transition: transform 0.2s, opacity 0.2s; letter-spacing: 0.01em; }
        @media(min-width:480px){ .dt9-btn { padding: 13px 26px; font-size: 14px; } }
        .dt9-btn:hover { transform: translateY(-2px); opacity: 0.93; }
        .dt9-btn-azure { background: var(--azure); color: #fff; }
        .dt9-btn-jade { background: var(--jade); color: #fff; }
        .dt9-btn-rose { background: var(--rose); color: #fff; }
        .dt9-btn-ghost { background: transparent; color: var(--ink); border: 1.5px solid rgba(0,0,0,0.12); }
        .dt9-btn-ghost:hover { border-color: var(--azure); color: var(--azure); background: var(--azure-pale); }
        .dt9-btn-fill { display: inline-flex; align-items: center; gap: 8px; background: var(--acc, var(--azure)); color: #fff; padding: 12px 24px; border-radius: 10px; font-weight: 600; font-size: 14px; text-decoration: none; transition: opacity 0.2s, transform 0.2s; }
        .dt9-btn-fill:hover { opacity: 0.88; transform: translateY(-2px); }

        /* ── HERO ── */
        .dt9-hero { background: var(--ink); min-height: 100svh; position: relative; overflow: hidden; display: flex; align-items: center; }
        .dt9-hero-grid-bg { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px); background-size: 48px 48px; pointer-events: none; }
        @media(min-width:768px){ .dt9-hero-grid-bg { background-size: 64px 64px; } }
        .dt9-hero-orbs { position: absolute; inset: 0; pointer-events: none; }
        .dt9-hero-orb { position: absolute; border-radius: 50%; filter: blur(60px); }
        @media(min-width:768px){ .dt9-hero-orb { filter: blur(80px); } }

        /* Hero inner: single column on mobile, two columns ≥1100px */
        .dt9-hero-inner {
          max-width: 1320px; margin: 0 auto;
          padding: 80px 16px 60px;
          display: grid; grid-template-columns: 1fr;
          gap: 40px; position: relative; z-index: 2;
          width: 100%;
        }
        @media(min-width:480px){ .dt9-hero-inner { padding: 90px 24px 70px; } }
        @media(min-width:768px){ .dt9-hero-inner { padding: 100px 48px 80px; gap: 56px; } }
        @media(min-width:1100px){ .dt9-hero-inner { grid-template-columns: 6fr 5fr; gap: 80px; align-items: center; padding-top: 80px; padding-bottom: 80px; } }

        /* Eyebrow */
        .dt9-hero-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; display: flex; align-items: center; gap: 10px; margin-bottom: 16px; flex-wrap: wrap; }
        @media(min-width:480px){ .dt9-hero-eyebrow { font-size: 11px; letter-spacing: 0.24em; gap: 12px; margin-bottom: 20px; } }
        .dt9-hero-eyebrow-bar { width: 28px; height: 2px; border-radius: 2px; flex-shrink: 0; }
        @media(min-width:480px){ .dt9-hero-eyebrow-bar { width: 40px; } }

        /* Title */
        .dt9-hero-title { font-family: 'DM Serif Display', serif; font-size: clamp(2.6rem, 11vw, 6.8rem); color: #fff; line-height: 0.95; margin-bottom: 18px; }
        @media(min-width:480px){ .dt9-hero-title { margin-bottom: 22px; } }
        @media(min-width:768px){ .dt9-hero-title { margin-bottom: 24px; } }
        .dt9-hero-title em { font-style: italic; }

        /* Description */
        .dt9-hero-desc { color: rgba(255,255,255,0.48); font-size: 14px; line-height: 1.75; max-width: 100%; margin-bottom: 28px; }
        @media(min-width:480px){ .dt9-hero-desc { font-size: 15px; margin-bottom: 32px; } }
        @media(min-width:768px){ .dt9-hero-desc { font-size: 15.5px; max-width: 520px; margin-bottom: 36px; } }

        /* CTA buttons row */
        .dt9-hero-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 40px; }
        @media(min-width:480px){ .dt9-hero-actions { gap: 12px; margin-bottom: 48px; } }
        @media(min-width:768px){ .dt9-hero-actions { margin-bottom: 60px; } }

        /* Divider */
        .dt9-hero-divider { border: none; border-top: 1px solid rgba(255,255,255,0.08); margin-bottom: 28px; }
        @media(min-width:768px){ .dt9-hero-divider { margin-bottom: 36px; } }

        /* Stats row */
        .dt9-hero-stats-row { display: flex; flex-wrap: wrap; gap: 24px; }
        @media(min-width:480px){ .dt9-hero-stats-row { gap: 32px; } }
        @media(min-width:768px){ .dt9-hero-stats-row { gap: 36px; } }
        .dt9-hero-stat-n { font-family: 'DM Serif Display', serif; font-size: 1.9rem; color: #fff; line-height: 1; }
        @media(min-width:480px){ .dt9-hero-stat-n { font-size: 2.2rem; } }
        @media(min-width:768px){ .dt9-hero-stat-n { font-size: 2.4rem; } }
        .dt9-hero-stat-l { font-size: 10px; font-weight: 600; color: rgba(255,255,255,0.35); letter-spacing: 0.08em; margin-top: 4px; }
        @media(min-width:480px){ .dt9-hero-stat-l { font-size: 11px; } }

        /* Hero Image column — hidden on mobile, shown ≥1100px */
        .dt9-hero-img-col { display: none; }
        @media(min-width:1100px){ .dt9-hero-img-col { display: block; } }
        .dt9-hero-img-stack { position: relative; width: 100%; max-width: 480px; margin-left: auto; }
        .dt9-hero-img-main { position: relative; border-radius: 40px 120px 40px 120px; overflow: hidden; aspect-ratio: 4/5; border: 3px solid rgba(255,255,255,0.1); }
        .dt9-hero-img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(10,10,15,0.5), transparent 50%); }
        .dt9-hero-badge-card { position: absolute; bottom: 40px; left: -40px; background: #fff; border-radius: 20px; padding: 16px 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.25); display: flex; align-items: center; gap: 12px; min-width: 170px; }
        .dt9-hero-badge-dot { width: 44px; height: 44px; border-radius: 13px; background: var(--jade); display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
        .dt9-hero-badge-n { font-family: 'DM Serif Display', serif; font-size: 1.6rem; color: var(--ink); line-height: 1; }
        .dt9-hero-badge-l { font-size: 9.5px; font-weight: 600; color: var(--text-muted); letter-spacing: 0.1em; text-transform: uppercase; }
        .dt9-hero-float-pill { position: absolute; top: 40px; right: -20px; background: var(--azure); color: #fff; border-radius: 50px; padding: 10px 18px; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; display: flex; align-items: center; gap: 8px; white-space: nowrap; }

        /* Mobile hero image (shown only when no image column, i.e. <1100px) */
        .dt9-hero-mobile-img { display: block; width: 100%; max-width: 380px; margin: 0 auto; position: relative; }
        @media(min-width:640px){ .dt9-hero-mobile-img { max-width: 480px; } }
        @media(min-width:1100px){ .dt9-hero-mobile-img { display: none; } }
        .dt9-hero-mobile-img-frame { border-radius: 32px 80px 32px 80px; overflow: hidden; aspect-ratio: 4/3; border: 2px solid rgba(255,255,255,0.1); position: relative; }
        @media(min-width:640px){ .dt9-hero-mobile-img-frame { aspect-ratio: 4/3; } }
        .dt9-hero-mobile-stats { display: flex; justify-content: center; gap: 20px; margin-top: 20px; flex-wrap: wrap; }
        @media(min-width:480px){ .dt9-hero-mobile-stats { gap: 28px; } }
        .dt9-hero-mobile-stat { text-align: center; }
        .dt9-hero-mobile-stat-n { font-family: 'DM Serif Display', serif; font-size: 1.6rem; line-height: 1; }
        .dt9-hero-mobile-stat-l { font-size: 10px; font-weight: 600; color: rgba(255,255,255,0.35); letter-spacing: 0.06em; margin-top: 3px; }

        /* ── About ── */
        .dt9-about-wrap { display: grid; grid-template-columns: 1fr; gap: 64px; align-items: center; }
        @media(min-width:1024px){ .dt9-about-wrap { grid-template-columns: 1fr 1fr; gap: 96px; } }
        .dt9-about-img-rel { position: relative; }
        .dt9-about-img-box { border-radius: 120px 40px 120px 40px; overflow: hidden; aspect-ratio: 4/5; max-width: 480px; border: 4px solid var(--smoke); position: relative; }
        .dt9-about-corner { position: absolute; width: 60px; height: 60px; border: 3px solid var(--azure); }
        .dt9-about-corner-tl { top: -12px; left: -12px; border-right: none; border-bottom: none; border-radius: 12px 0 0 0; }
        .dt9-about-corner-br { bottom: -12px; right: -12px; border-left: none; border-top: none; border-radius: 0 0 12px 0; }
        .dt9-about-float { position: absolute; bottom: -24px; right: -24px; background: var(--ink); border-radius: 20px; padding: 20px 24px; text-align: center; border: 3px solid var(--smoke); z-index: 2; }
        .dt9-about-float-n { font-family: 'DM Serif Display', serif; font-size: 2.8rem; color: var(--jade); line-height: 1; }
        .dt9-about-float-l { font-size: 9.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.45); margin-top: 3px; }
        .dt9-about-tags { display: flex; flex-wrap: wrap; gap: 8px; margin: 24px 0; }
        .dt9-detail-strips { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 20px 0 28px; }
        .dt9-detail-strip { background: var(--smoke); border-radius: 12px; padding: 14px 16px; border-left: 3px solid var(--acc, var(--azure)); }
        .dt9-detail-strip-lbl { font-size: 9.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--acc, var(--azure)); margin-bottom: 3px; }
        .dt9-detail-strip-val { font-size: 13px; font-weight: 500; color: var(--ink); }

        /* ── Services ── */
        .dt9-svc-wrap { display: grid; grid-template-columns: 1fr; border-radius: 24px; overflow: hidden; border: 1px solid rgba(0,0,0,0.07); background: var(--white); }
        @media(min-width:900px){ .dt9-svc-wrap { grid-template-columns: 5fr 7fr; } }
        .dt9-svc-tabs { display: flex; flex-direction: column; background: var(--ink); }
        @media(max-width:899px){ .dt9-svc-tabs { flex-direction: row; overflow-x: auto; } }
        .dt9-svc-tab { display: flex; align-items: center; gap: 12px; padding: 18px 22px; background: none; border: none; cursor: pointer; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.05); transition: background 0.2s; position: relative; flex-shrink: 0; }
        .dt9-svc-tab:last-child { border-bottom: none; }
        .dt9-svc-tab.on { background: var(--acc); }
        .dt9-svc-tab.on::after { content:''; position:absolute; right:0; top:50%; transform:translateY(-50%); width:4px; height:50%; background:rgba(255,255,255,0.35); border-radius:2px 0 0 2px; }
        @media(max-width:899px){ .dt9-svc-tab.on::after { display:none; } }
        .dt9-svc-tab-ico { font-size: 1.2rem; flex-shrink: 0; }
        .dt9-svc-tab-name { font-size: 13.5px; font-weight: 500; color: rgba(255,255,255,0.55); flex: 1; transition: color 0.2s; white-space: nowrap; }
        .dt9-svc-tab.on .dt9-svc-tab-name { color: #fff; font-weight: 600; }
        .dt9-svc-tab-num { font-family: 'DM Serif Display', serif; font-size: 1rem; color: rgba(255,255,255,0.18); }
        .dt9-svc-panel { padding: 48px; display: flex; align-items: flex-start; flex-direction: column; justify-content: center; min-height: 380px; position: relative; }
        @media(max-width:768px){ .dt9-svc-panel { padding: 32px 24px; } }
        .dt9-svc-panel-ico { font-size: 3.2rem; margin-bottom: 18px; display: block; }
        .dt9-svc-panel-title { font-family: 'DM Serif Display', serif; font-size: 2.2rem; color: var(--ink); margin: 14px 0 12px; }
        .dt9-svc-panel-desc { font-size: 14.5px; color: var(--text-muted); line-height: 1.8; margin-bottom: 24px; max-width: 440px; }
        .dt9-svc-panel-bar { width: 48px; height: 4px; border-radius: 2px; background: var(--acc, var(--azure)); margin-bottom: 24px; }

        /* ── Why ── */
        .dt9-why-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        @media(min-width:1024px){ .dt9-why-grid { grid-template-columns: repeat(3, 1fr); } }
        .dt9-why-card { background: var(--white); border-radius: 20px; padding: 26px 22px; border: 1.5px solid transparent; border-top: 4px solid var(--acc, var(--azure)); transition: transform 0.3s, box-shadow 0.3s; cursor: default; position: relative; }
        .dt9-why-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,0,0,0.08); }
        .dt9-why-ico { font-size: 2rem; margin-bottom: 14px; display: block; }
        .dt9-why-title { font-family: 'DM Serif Display', serif; font-size: 1.2rem; color: var(--ink); margin-bottom: 8px; }
        .dt9-why-desc { font-size: 13px; color: var(--text-muted); line-height: 1.65; }

        /* ── Stats ── */
        .dt9-stats-band { background: var(--ink-mid); }
        .dt9-stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); }
        @media(min-width:768px){ .dt9-stats-grid { grid-template-columns: repeat(4, 1fr); } }
        .dt9-stat-cell { padding: 52px 32px; text-align: center; border-right: 1px solid rgba(255,255,255,0.06); position: relative; }
        .dt9-stat-cell:nth-child(2n){ border-right:none; }
        @media(min-width:768px){ .dt9-stat-cell:nth-child(2n){ border-right: 1px solid rgba(255,255,255,0.06); } .dt9-stat-cell:last-child{ border-right:none; } }
        .dt9-stat-n { font-family: 'DM Serif Display', serif; font-size: clamp(2.5rem, 5vw, 3.8rem); line-height: 1; margin-bottom: 8px; }
        .dt9-stat-l { font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.35); letter-spacing: 0.12em; text-transform: uppercase; }

        /* ── Testimonials ── */
        .dt9-test-wrap {}
        .dt9-test-card { background: var(--white); border-radius: 24px; padding: 36px; border: 1.5px solid rgba(0,0,0,0.06); position: relative; overflow: hidden; }
        .dt9-test-stripe { position: absolute; left: 0; top: 0; bottom: 0; width: 5px; background: var(--acc, var(--azure)); border-radius: 0; }
        .dt9-test-q { font-family: 'DM Serif Display', serif; font-size: 5rem; color: var(--acc, var(--azure)); line-height: 0.7; margin-bottom: 8px; opacity: 0.35; }
        .dt9-test-text { font-family: 'DM Serif Display', serif; font-size: 1.2rem; font-style: italic; color: var(--ink); line-height: 1.65; margin-bottom: 24px; }
        .dt9-test-foot { display: flex; align-items: center; gap: 14px; }
        .dt9-test-av { width: 50px; height: 50px; min-width: 50px; border-radius: 50%; background: var(--ink-light); border: 2px solid var(--acc, var(--azure)); display: flex; align-items: center; justify-content: center; font-family: 'DM Serif Display', serif; font-size: 1.2rem; color: #fff; overflow: hidden; position: relative; }
        .dt9-test-name { font-weight: 600; font-size: 14px; color: var(--ink); }
        .dt9-test-role { font-size: 11px; font-weight: 600; letter-spacing: 0.08em; color: var(--acc, var(--azure)); text-transform: uppercase; }
        .dt9-test-controls { display: flex; align-items: center; gap: 10px; margin-top: 20px; }
        .dt9-test-arrow { width: 40px; height: 40px; border-radius: 50%; border: 1.5px solid rgba(0,0,0,0.12); background: none; font-size: 18px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--text-muted); transition: all 0.2s; }
        .dt9-test-arrow:hover { border-color: var(--azure); color: var(--azure); background: var(--azure-pale); }
        .dt9-test-dots { display: flex; gap: 6px; flex: 1; }
        .dt9-test-dot { height: 8px; border-radius: 4px; border: none; cursor: pointer; padding: 0; }

        /* ── Schedule ── */
        .dt9-sched-list { border-radius: 20px; overflow: hidden; border: 1px solid rgba(0,0,0,0.07); }
        .dt9-sched-row { display: flex; justify-content: space-between; align-items: center; padding: 18px 24px; border-bottom: 1px solid rgba(0,0,0,0.05); background: var(--white); transition: background 0.2s; }
        .dt9-sched-row:last-child { border-bottom: none; }
        .dt9-sched-row:hover { background: var(--smoke); }
        .dt9-sched-day { font-size: 14px; font-weight: 500; color: var(--text-body); }
        .dt9-sched-time { display: flex; align-items: center; gap: 8px; }
        .dt9-sched-open { font-family: 'DM Serif Display', serif; font-size: 1.05rem; color: var(--jade); }
        .dt9-sched-close { font-size: 12px; color: var(--text-muted); }

        /* ── Team ── */
        .dt9-team-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        @media(min-width:768px){ .dt9-team-grid { grid-template-columns: repeat(3, 1fr); } }
        @media(min-width:1200px){ .dt9-team-grid { grid-template-columns: repeat(6, 1fr); } }
        .dt9-team-card { border-radius: 20px; overflow: hidden; aspect-ratio: 3/4; position: relative; background: var(--ink-light); cursor: pointer; }
        .dt9-team-emoji-bg { width:100%; height:100%; display:flex; align-items:center; justify-content:center; font-size: 4rem; background: linear-gradient(160deg, var(--ink-mid) 0%, var(--ink-light) 100%); transition: transform 0.5s; }
        .dt9-team-card:hover .dt9-team-emoji-bg { transform: scale(1.07); }
        .dt9-team-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(10,10,15,0.92) 40%, rgba(10,10,15,0.1) 100%); padding: 18px; display: flex; flex-direction: column; justify-content: flex-end; }
        .dt9-team-acc-bar { width: 24px; height: 3px; border-radius: 2px; margin-bottom: 8px; }
        .dt9-team-name { font-family: 'DM Serif Display', serif; font-size: 1.05rem; color: #fff; margin-bottom: 2px; }
        .dt9-team-spec { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 2px; }
        .dt9-team-exp { font-size: 10px; color: rgba(255,255,255,0.4); }

        /* ── FAQ ── */
        .dt9-faq-item { border-bottom: 1px solid rgba(0,0,0,0.06); }
        .dt9-faq-item.open { border-color: var(--acc, var(--azure)); }
        .dt9-faq-q { width: 100%; display: flex; align-items: center; gap: 14px; padding: 20px 0; background: none; border: none; cursor: pointer; text-align: left; }
        .dt9-faq-num { font-family: 'DM Serif Display', serif; font-size: 1.2rem; color: var(--acc, var(--azure)); min-width: 28px; }
        .dt9-faq-text { font-size: 15px; font-weight: 500; color: var(--ink); flex: 1; line-height: 1.4; }
        .dt9-faq-icon { width: 30px; height: 30px; min-width: 30px; border-radius: 50%; border: 1.5px solid var(--acc, var(--azure)); display: flex; align-items: center; justify-content: center; font-size: 18px; color: var(--acc, var(--azure)); font-weight: 400; line-height: 1; }
        .dt9-faq-ans { padding: 0 0 20px 42px; font-size: 14px; color: var(--text-muted); line-height: 1.75; }

        /* ── Mosaic ── */
        .dt9-mosaic { display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, 220px); gap: 12px; border-radius: 24px; overflow: hidden; }
        @media(max-width:640px){ .dt9-mosaic { grid-template-columns: repeat(2, 1fr); } }
        .dt9-mosaic-cell { position: relative; overflow: hidden; cursor: pointer; background: var(--acc, var(--azure)); }
        .dt9-mosaic-cell-1 { grid-column: span 2; grid-row: span 1; border-radius: 20px 0 0 0; }
        .dt9-mosaic-cell-2 { border-radius: 0 20px 0 0; }
        .dt9-mosaic-cell-3 { border-radius: 0 0 0 0; }
        .dt9-mosaic-cell-4 { border-radius: 0 0 0 0; }
        .dt9-mosaic-cell-5 { border-radius: 0 0 0 0; }
        .dt9-mosaic-cell-6 { border-radius: 0 0 20px 0; }
        @media(max-width:640px){ .dt9-mosaic-cell-1 { grid-column: span 1; } .dt9-mosaic-cell-3, .dt9-mosaic-cell-5 { display: none; } }
        .dt9-mosaic-inner { width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; padding: 20px; }
        .dt9-mosaic-emoji { font-size: 2.8rem; margin-bottom: 8px; }
        .dt9-mosaic-label { font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.9); }

        /* ── Insurance ── */
        .dt9-ins-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        @media(min-width:480px){ .dt9-ins-grid { grid-template-columns: repeat(3, 1fr); } }
        @media(min-width:768px){ .dt9-ins-grid { grid-template-columns: repeat(6, 1fr); } }
        .dt9-ins-card { background: var(--white); border: 1.5px solid rgba(0,0,0,0.07); border-radius: 12px; padding: 18px 12px; text-align: center; font-size: 12.5px; font-weight: 700; color: var(--text-body); letter-spacing: 0.03em; transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s; cursor: default; }
        .dt9-ins-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.07); border-color: var(--azure); }

        /* ── Blog ── */
        .dt9-blog-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
        @media(min-width:640px){ .dt9-blog-grid { grid-template-columns: repeat(2, 1fr); } }
        @media(min-width:1024px){ .dt9-blog-grid { grid-template-columns: repeat(3, 1fr); } }
        .dt9-blog-card { background: var(--white); border-radius: 20px; overflow: hidden; border: 1.5px solid rgba(0,0,0,0.06); transition: transform 0.3s, box-shadow 0.3s; cursor: pointer; }
        .dt9-blog-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,0,0,0.09); }
        .dt9-blog-thumb { height: 160px; display: flex; align-items: center; justify-content: center; font-size: 2.8rem; border-bottom: 1px solid rgba(0,0,0,0.05); position: relative; overflow: hidden; }
        .dt9-blog-body { padding: 22px; }
        .dt9-blog-title { font-family: 'DM Serif Display', serif; font-size: 1.2rem; color: var(--ink); margin: 10px 0 8px; line-height: 1.25; }
        .dt9-blog-excerpt { font-size: 13px; color: var(--text-muted); line-height: 1.65; margin-bottom: 14px; }
        .dt9-blog-meta { display: flex; align-items: center; justify-content: space-between; }
        .dt9-blog-date { font-size: 11px; font-weight: 600; color: var(--text-muted); }
        .dt9-blog-read { font-size: 12px; font-weight: 700; color: var(--azure); letter-spacing: 0.04em; text-decoration: none; }

        /* ── Contact ── */
        .dt9-contact-bg { background: var(--ink); }
        .dt9-contact-grid { display: grid; grid-template-columns: 1fr; gap: 48px; }
        @media(min-width:1024px){ .dt9-contact-grid { grid-template-columns: 1fr 1fr; } }
        .dt9-contact-card { display: flex; align-items: flex-start; gap: 14px; padding: 18px 20px; background: var(--ink-mid); border: 1px solid var(--ink-border); border-radius: 14px; transition: border-color 0.2s; }
        .dt9-contact-card:hover { border-color: rgba(255,255,255,0.15); }
        .dt9-contact-ico-wrap { width: 44px; height: 44px; min-width: 44px; border-radius: 12px; background: var(--acc, rgba(0,87,255,0.2)); display: flex; align-items: center; justify-content: center; font-size: 1.1rem; }
        .dt9-contact-lbl { font-size: 9.5px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--acc, var(--azure)); margin-bottom: 3px; }
        .dt9-contact-val { font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.8); }
        .dt9-emergency-bar { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px; background: var(--rose); border-radius: 16px; padding: 20px 24px; margin-bottom: 28px; }
        .dt9-map-frame { border-radius: 20px; overflow: hidden; min-height: 360px; background: var(--ink-light); display: flex; align-items: center; justify-content: center; border: 1px solid var(--ink-border); }

        /* ── Footer ── */
        .dt9-footer { background: var(--ink-mid); border-top: 1px solid var(--ink-border); }
        .dt9-footer-top { max-width: 1320px; margin: 0 auto; padding: 72px 24px 48px; display: grid; grid-template-columns: 1fr; gap: 40px; }
        @media(min-width:768px){ .dt9-footer-top { padding: 72px 48px 48px; grid-template-columns: repeat(2, 1fr); } }
        @media(min-width:1024px){ .dt9-footer-top { grid-template-columns: 2.5fr 1fr 1fr 1.5fr; } }
        .dt9-footer-h { font-size: 9.5px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; margin-bottom: 18px; }
        .dt9-footer-link { display: block; font-size: 13px; color: rgba(255,255,255,0.4); text-decoration: none; padding: 5px 0; transition: color 0.2s; }
        .dt9-footer-link:hover { color: rgba(255,255,255,0.85); }
        .dt9-footer-hr { border: none; border-top: 1px solid var(--ink-border); margin: 0 24px; }
        @media(min-width:768px){ .dt9-footer-hr { margin: 0 48px; } }
        .dt9-footer-bottom { max-width: 1320px; margin: 0 auto; padding: 20px 24px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px; font-size: 12px; color: rgba(255,255,255,0.3); }
        @media(min-width:768px){ .dt9-footer-bottom { padding: 20px 48px; } }
        .dt9-social-row { display: flex; gap: 8px; margin-top: 20px; }
        .dt9-social-btn { width: 36px; height: 36px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-size: 12px; color: rgba(255,255,255,0.4); text-decoration: none; transition: all 0.2s; }
        .dt9-social-btn:hover { border-color: var(--azure); color: #fff; background: var(--azure); }
        .dt9-footer-disclaimer { background: rgba(255,255,255,0.03); border-radius: 12px; padding: 14px 18px; margin: 0 24px; font-size: 11px; color: rgba(255,255,255,0.25); line-height: 1.65; border: 1px solid rgba(255,255,255,0.05); }
        @media(min-width:768px){ .dt9-footer-disclaimer { margin: 0 48px; } }
      `}</style>

      <div className="dt9">

        {/* ── Topbar ── */}
        <div className="dt9-topbar">
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <div className="dt9-topbar-item">
              <span className="dt9-topbar-accent">📞</span>{phone_}
            </div>
            <div className="dt9-topbar-item">
              <span className="dt9-topbar-accent">✉</span>{email_}
            </div>
          </div>
          <div className="dt9-topbar-item">
            <span className="dt9-topbar-pill">🚨 24/7 Emergency</span>
            {workingHours || "Mon–Fri: 7 AM – 9 PM"}
          </div>
        </div>

        {/* ── Navbar ── */}
        <motion.header
          className="dt9-nav"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: EXPO }}
        >
          <div className={`dt9-nav-bar ${scrolled ? "scrolled" : ""}`}>
            <div className="dt9-nav-inner">
              {headerType === "Image" && logoUrl ? (
                <div style={{ position: "relative", width: 130, height: 40 }}>
                  <Image src={logoUrl} alt={name_} fill className="object-contain" />
                </div>
              ) : (
                <a href="#home" className="dt9-logo">
                  <div className="dt9-logo-badge">💊</div>
                  <div>
                    <span className="dt9-logo-name">{name_}</span>
                    <span className="dt9-logo-tag">{specialty || "Advanced Medical Care"}</span>
                  </div>
                </a>
              )}
              <nav className="dt9-nav-links">
                {navLinks.map(({ href, label }) => (
                  <a key={href} href={href} className="dt9-nav-link">{label}</a>
                ))}
              </nav>
              <div className="dt9-nav-cta">
                <a href="#contact" className="dt9-btn dt9-btn-azure" style={{ display: "none" }}>Book</a>
                <a href="#contact" className="dt9-btn dt9-btn-azure" style={{ fontSize: 13, padding: "9px 20px", borderRadius: 8 }}>
                  Book Appointment
                </a>
                <button className="dt9-ham" onClick={() => setMenuOpen(!menuOpen)}>
                  <motion.div className="dt9-ham-bar" animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} />
                  <motion.div className="dt9-ham-bar" animate={{ opacity: menuOpen ? 0 : 1 }} />
                  <motion.div className="dt9-ham-bar" animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} />
                </button>
              </div>
            </div>
            <AnimatePresence>
              {menuOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                  className="dt9-mobile-menu" style={{ overflow: "hidden" }}>
                  <div className="dt9-mobile-links">
                    {navLinks.map(({ href, label }) => (
                      <a key={href} href={href} className="dt9-mobile-link" onClick={() => setMenuOpen(false)}>{label}</a>
                    ))}
                    <a href="#contact" className="dt9-btn dt9-btn-azure" style={{ marginTop: 14, justifyContent: "center" }}
                      onClick={() => setMenuOpen(false)}>Book Appointment</a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.header>

        {/* ══ HERO ══ */}
        <section id="home" ref={heroRef} className="dt9-hero">
          <div className="dt9-hero-grid-bg" />
          <div className="dt9-hero-orbs">
            <motion.div className="dt9-hero-orb"
              style={{ width: 600, height: 600, background: "rgba(0,87,255,0.15)", top: "-20%", left: "-10%" }}
              animate={{ x: [0, 30, 0], y: [0, 20, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div className="dt9-hero-orb"
              style={{ width: 400, height: 400, background: "rgba(0,184,124,0.12)", bottom: "-10%", right: "15%" }}
              animate={{ x: [0, -20, 0], y: [0, -30, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
            <motion.div className="dt9-hero-orb"
              style={{ width: 300, height: 300, background: "rgba(123,47,255,0.1)", top: "30%", right: "5%" }}
              animate={{ x: [0, 15, 0], y: [0, 25, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </div>

          {heroImage && (
            <>
              <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${heroImage})`, backgroundSize: "cover", backgroundPosition: "center" }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,15,0.85)" }} />
            </>
          )}

          <div className="dt9-hero-inner">
            <div>
              <motion.div className="dt9-hero-eyebrow"
                initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: EXPO }}>
                <div className="dt9-hero-eyebrow-bar" style={{ background: "var(--jade)" }} />
                <span style={{ color: "var(--jade)", fontSize: specialtyFontSize ? `clamp(10px, 2vw, ${specialtyFontSize}px)` : undefined }}>
                  {specialty || "Advanced Medical Excellence"}
                </span>
                <div className="dt9-hero-eyebrow-bar" style={{ background: "var(--jade)", opacity: 0.3 }} />
              </motion.div>

              <motion.h1 className="dt9-hero-title"
                initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.45, ease: EXPO }}
                style={{ fontSize: heroTitleFontSize ? `clamp(3.2rem, 9vw, ${heroTitleFontSize}px)` : undefined }}>
                {heroTitle || (<>Where <em style={{ color: "var(--azure)" }}>Science</em><br />Meets <em style={{ color: "var(--jade)" }}>Soul</em></>)}
              </motion.h1>

              <motion.p className="dt9-hero-desc"
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.65 }}>
                {tagline && <strong style={{ display: "block", color: "rgba(255,255,255,0.75)", marginBottom: 6 }}>{tagline}</strong>}
                {heroDescription || "Breakthrough diagnostics, compassionate specialists and seamless care — all in one place. Because your health deserves nothing less than the extraordinary."}
              </motion.p>

              <motion.div className="dt9-hero-actions"
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.8 }}>
                <MagneticBtn href="#contact" className="dt9-btn dt9-btn-azure">📅 Book Appointment</MagneticBtn>
                <MagneticBtn href={`tel:${emergency_}`} className="dt9-btn dt9-btn-rose">🚨 Emergency</MagneticBtn>
                <MagneticBtn href="#about" className="dt9-btn dt9-btn-ghost" style={{ color: "rgba(255,255,255,0.7)", borderColor: "rgba(255,255,255,0.15)" }}>
                  Learn More ↓
                </MagneticBtn>
              </motion.div>

              <hr className="dt9-hero-divider" />

              <motion.div className="dt9-hero-stats-row"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.1 }}>
                {[["28+", "Years", "azure"], ["22K+", "Patients", "jade"], ["99%", "Satisfaction", "amber"]].map(([n, l, c]) => (
                  <div key={l}>
                    <p className="dt9-hero-stat-n" style={{ color: `var(--${c})` }}>{n}</p>
                    <p className="dt9-hero-stat-l">{l}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Image Column */}
            <motion.div className="dt9-hero-img-col"
              initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: EXPO }}>
              <motion.div className="dt9-hero-img-stack" style={{ y: heroParallax }}>
                <div className="dt9-hero-img-main">
                  <Image src={heroImage || "/images/templates/template-img-26.jpg"} alt="Doctor" fill
                    className="object-cover object-top" priority />
                  <div className="dt9-hero-img-overlay" />
                </div>
                <motion.div className="dt9-hero-badge-card"
                  initial={{ opacity: 0, x: -30, y: 20 }} animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2, ease: BACK }}>
                  <div className="dt9-hero-badge-dot">✓</div>
                  <div>
                    <p className="dt9-hero-badge-n">{experience || "28"}+</p>
                    <p className="dt9-hero-badge-l">Years<br />Experience</p>
                  </div>
                </motion.div>
                <motion.div className="dt9-hero-float-pill"
                  initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 1.4, ease: BACK }}
                  animate_loop={{ y: [0, -8, 0] }}
                  transition_loop={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                  <span>🏅</span> Top Rated 2025
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ══ TICKER ══ */}
        <Ticker items={tickerItems} speed={30} bg="var(--azure)" color="#fff" />
        <Ticker items={tickerItems.slice().reverse()} speed={35} bg="var(--jade)" color="#fff" />

        {/* ══ ABOUT ══ */}
        <section id="about" className="dt9-section" style={{ background: "var(--smoke-card)" }}>
          <div className="dt9-inner">
            <div className="dt9-about-wrap">
              <Reveal dir="left">
                <div className="dt9-about-img-rel">
                  <div className="dt9-about-corner dt9-about-corner-tl" />
                  <div className="dt9-about-img-box">
                    <Image src={aboutImage || "/images/templates/template-img-27.jpg"} alt="About" fill className="object-cover" />
                  </div>
                  <div className="dt9-about-corner dt9-about-corner-br" style={{ borderColor: "var(--jade)" }} />
                  <div className="dt9-about-float">
                    <p className="dt9-about-float-n">{experience || "28"}+</p>
                    <p className="dt9-about-float-l">Years Exp.</p>
                  </div>
                </div>
              </Reveal>

              <div>
                <Reveal><AccentH label={aboutUsTitle || "About Our Practice"} color="azure" /></Reveal>
                <Reveal delay={0.05}>
                  <h2 className="dt9-serif" style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", fontWeight: 400, color: "var(--ink)", lineHeight: 1.1, marginBottom: 20 }}>
                    Evidence-Based Care,<br />
                    <em style={{ color: "var(--azure)" }}>Delivered with Heart</em>
                  </h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <p style={{ color: "var(--text-muted)", lineHeight: 1.85, fontSize: 15, marginBottom: 20 }}>
                    {bio || "For over two decades we've combined clinical mastery with genuine human warmth. Our multidisciplinary team draws on the latest research and technology to create care that is truly personal — because no two patients are the same."}
                  </p>
                </Reveal>

                <Reveal delay={0.12}>
                  <div className="dt9-about-tags">
                    <CPill color="azure">{specialty || "Cardiology"}</CPill>
                    <CPill color="jade">Board Certified</CPill>
                    <CPill color="amber">AI Diagnostics</CPill>
                    <CPill color="violet">Multilingual</CPill>
                  </div>
                </Reveal>

                <Reveal delay={0.14}>
                  <div className="dt9-detail-strips">
                    {[
                      { label: "Education", val: qualification || education || "MD — Medical University", col: "azure" },
                      { label: "Hospital", val: hospitalName || name_, col: "jade" },
                      { label: "Languages", val: languagesSpoken || "English, Hindi, French", col: "amber" },
                      { label: "Certifications", val: certifications || "MBBS, MD, FRCS", col: "rose" },
                    ].map((d) => (
                      <div key={d.label} className="dt9-detail-strip" style={{ "--acc": `var(--${d.col})` }}>
                        <p className="dt9-detail-strip-lbl">{d.label}</p>
                        <p className="dt9-detail-strip-val">{d.val}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>

                <Reveal delay={0.17}>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <a href="#contact" className="dt9-btn dt9-btn-azure">Request Consultation →</a>
                    <a href={`tel:${phone_}`} className="dt9-btn dt9-btn-ghost">📞 Call Now</a>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ══ SERVICES ══ */}
        <section id="services" className="dt9-section" style={{ background: "var(--ink)" }}>
          <div className="dt9-inner">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 52 }}>
              <div>
                <Reveal><AccentH label="Our Specialties" color="jade" dark /></Reveal>
                <Reveal delay={0.05}>
                  <h2 className="dt9-serif" style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", color: "#fff", lineHeight: 1.05 }}>
                    Comprehensive <em style={{ color: "var(--jade)" }}>Services</em>
                  </h2>
                </Reveal>
              </div>
              <Reveal dir="right">
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, lineHeight: 1.75, maxWidth: 320 }}>
                  Select a specialty below to discover how our experts can help you.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <ServiceTabs items={svcs} />
            </Reveal>
          </div>
        </section>

        {/* ══ WHY CHOOSE US ══ */}
        <section className="dt9-section" style={{ background: "var(--smoke)" }}>
          <div className="dt9-inner">
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <Reveal><AccentH label="Why Choose Us" color="violet" /></Reveal>
              <Reveal delay={0.05}>
                <h2 className="dt9-serif" style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", color: "var(--ink)", marginBottom: 14 }}>
                  The <em style={{ color: "var(--violet)" }}>Vivid</em> Difference
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{ color: "var(--text-muted)", maxWidth: 480, margin: "0 auto", fontSize: 14, lineHeight: 1.75 }}>
                  World-class expertise combined with genuine care for every individual who walks through our doors.
                </p>
              </Reveal>
            </div>
            <Stagger className="dt9-why-grid">
              {why.map((f, i) => {
                const c = accentColours[i % accentColours.length];
                return (
                  <motion.div key={i} variants={vFadeUp(i * 0.08)} className="dt9-why-card"
                    style={{ "--acc": `var(--${c})` }}>
                    <span className="dt9-why-ico">{f.icon || "✦"}</span>
                    <h3 className="dt9-why-title">{f.title || f.featureTitle}</h3>
                    <p className="dt9-why-desc">{f.description || f.desc || f.featureDescription}</p>
                  </motion.div>
                );
              })}
            </Stagger>
          </div>
        </section>

        {/* ══ STATS BAND ══ */}
        <section className="dt9-stats-band">
          <div style={{ maxWidth: 1320, margin: "0 auto" }}>
            <Stagger className="dt9-stats-grid">
              {statsD.map((s, i) => {
                const c = accentColours[i % accentColours.length];
                return (
                  <motion.div key={i} variants={vScale(i * 0.08)} className="dt9-stat-cell">
                    <p className="dt9-stat-n" style={{ color: `var(--${c})` }}>
                      <CountUp to={s.value} />
                    </p>
                    <p className="dt9-stat-l">{s.label}</p>
                  </motion.div>
                );
              })}
            </Stagger>
          </div>
        </section>

        {/* ══ TESTIMONIALS + SCHEDULE ══ */}
        <section className="dt9-section" style={{ background: "var(--smoke-card)" }}>
          <div className="dt9-inner">
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 64, alignItems: "start" }}>
              <style>{`@media(min-width:1024px){.dt9-ts-inner{grid-template-columns:1fr 1fr !important;}}`}</style>
              <div className="dt9-ts-inner" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 64 }}>
                <div>
                  <Reveal dir="left"><AccentH label="Patient Stories" color="rose" /></Reveal>
                  <Reveal dir="left" delay={0.05}>
                    <h2 className="dt9-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--ink)", marginBottom: 14 }}>
                      Voices That <em style={{ color: "var(--rose)" }}>Matter</em>
                    </h2>
                  </Reveal>
                  <Reveal dir="left" delay={0.1}>
                    <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.75, marginBottom: 28 }}>
                      Real stories from the patients we are honoured to serve every day.
                    </p>
                    <TestCarousel items={tests} />
                  </Reveal>
                </div>

                <div>
                  <Reveal dir="right"><AccentH label="Clinic Hours" color="amber" /></Reveal>
                  <Reveal dir="right" delay={0.05}>
                    <h2 className="dt9-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--ink)", marginBottom: 14 }}>
                      We're Open <em style={{ color: "var(--amber)" }}>When You Need Us</em>
                    </h2>
                  </Reveal>
                  <Reveal dir="right" delay={0.1}>
                    <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.75, marginBottom: 24 }}>
                      Drop-in or reserve your slot — our team is always ready to help.
                    </p>
                    <div className="dt9-sched-list" style={{ marginBottom: 24 }}>
                      {sched.map((row, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                          className="dt9-sched-row">
                          <span className="dt9-sched-day">{row.day}</span>
                          <div className="dt9-sched-time">
                            <span className="dt9-sched-open">{row.open || row.openingTime}</span>
                            <span style={{ color: "var(--text-muted)", fontSize: 12 }}>–</span>
                            <span className="dt9-sched-close">{row.close || row.closingTime}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <a href="#contact" className="dt9-btn dt9-btn-jade">Reserve a Slot →</a>
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ TEAM ══ */}
        <section id="team" className="dt9-section" style={{ background: "var(--ink)" }}>
          <div className="dt9-inner">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 52 }}>
              <div>
                <Reveal><AccentH label="Our Specialists" color="azure" dark /></Reveal>
                <Reveal delay={0.05}>
                  <h2 className="dt9-serif" style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", color: "#fff" }}>
                    Meet the <em style={{ color: "var(--azure)" }}>Doctors</em>
                  </h2>
                </Reveal>
              </div>
              <Reveal dir="right">
                <a href="#contact" className="dt9-btn dt9-btn-ghost" style={{ color: "rgba(255,255,255,0.6)", borderColor: "rgba(255,255,255,0.15)" }}>
                  All Specialists →
                </a>
              </Reveal>
            </div>
            <Stagger className="dt9-team-grid">
              {team.map((doc, i) => {
                const c = accentColours[i % accentColours.length];
                return (
                  <motion.div key={i} variants={vScale(i * 0.08)} className="dt9-team-card">
                    {doc.image
                      ? <Image src={doc.image} alt={doc.name || doc.doctorName} fill className="object-cover object-top" />
                      : <div className="dt9-team-emoji-bg">👨‍⚕️</div>}
                    <div className="dt9-team-overlay">
                      <div className="dt9-team-acc-bar" style={{ background: `var(--${c})` }} />
                      <p className="dt9-team-name">{doc.name || doc.doctorName}</p>
                      <p className="dt9-team-spec" style={{ color: `var(--${c})` }}>{doc.specialization}</p>
                      <p className="dt9-team-exp">{doc.experience} Exp.</p>
                    </div>
                  </motion.div>
                );
              })}
            </Stagger>
          </div>
        </section>

        {/* ══ GALLERY ══ */}
        <section id="gallery" className="dt9-section" style={{ background: "var(--smoke)" }}>
          <div className="dt9-inner">
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <Reveal><AccentH label="Our Facilities" color="amber" /></Reveal>
              <Reveal delay={0.05}>
                <h2 className="dt9-serif" style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", color: "var(--ink)", marginBottom: 14 }}>
                  State-of-the-Art <em style={{ color: "var(--amber)" }}>Spaces</em>
                </h2>
              </Reveal>
            </div>
            <Stagger>
              <GalleryMosaic items={gallery || []} />
            </Stagger>
          </div>
        </section>

        {/* ══ FAQ ══ */}
        <section className="dt9-section" style={{ background: "var(--smoke-card)" }}>
          <div className="dt9-inner">
            <style>{`@media(min-width:1024px){.dt9-faq-layout{grid-template-columns:2fr 3fr !important;}}`}</style>
            <div className="dt9-faq-layout" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 64 }}>
              <div>
                <Reveal dir="left"><AccentH label="FAQ" color="violet" /></Reveal>
                <Reveal dir="left" delay={0.05}>
                  <h2 className="dt9-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--ink)", marginBottom: 16 }}>
                    Frequently <em style={{ color: "var(--violet)" }}>Asked</em>
                  </h2>
                </Reveal>
                <Reveal dir="left" delay={0.1}>
                  <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.75, marginBottom: 28 }}>
                    Everything you need before your first visit. Can't find an answer?
                  </p>
                  <a href={`tel:${phone_}`} className="dt9-btn dt9-btn-azure">📞 Call Our Team</a>
                </Reveal>
              </div>
              <Stagger>
                {faqsD.map((faq, i) => (
                  <FaqItem key={i} q={faq.question} a={faq.answer} idx={i} />
                ))}
              </Stagger>
            </div>
          </div>
        </section>

        {/* ══ INSURANCE ══ */}
        <section className="dt9-section" style={{ background: "var(--smoke)" }}>
          <div className="dt9-inner">
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <Reveal><AccentH label="Insurance Partners" color="jade" /></Reveal>
              <Reveal delay={0.05}>
                <h2 className="dt9-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--ink)", marginBottom: 10 }}>
                  Accepted <em style={{ color: "var(--jade)" }}>Insurance</em>
                </h2>
              </Reveal>
            </div>
            <Stagger className="dt9-ins-grid">
              {ins.map((p, i) => (
                <motion.div key={i} variants={vScale(i * 0.05)} className="dt9-ins-card">
                  {p.logo && (
                    <div style={{ position: "relative", height: 34, marginBottom: 6 }}>
                      <Image src={p.logo} alt={p.name} fill className="object-contain" />
                    </div>
                  )}
                  {!p.logo && <div style={{ fontSize: "1.4rem", marginBottom: 6 }}>🏢</div>}
                  {p.name}
                </motion.div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ══ BLOG ══ */}
        {enableBlog !== false && (
          <section className="dt9-section" style={{ background: "var(--smoke-card)" }}>
            <div className="dt9-inner">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 48 }}>
                <div>
                  <Reveal dir="left"><AccentH label={blogSubtitle || "Health Insights"} color="rose" /></Reveal>
                  <Reveal dir="left" delay={0.05}>
                    <h2 className="dt9-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--ink)" }}>
                      {blogSectionTitle || <>From Our <em style={{ color: "var(--rose)" }}>Experts</em></>}
                    </h2>
                  </Reveal>
                </div>
                <Reveal dir="right">
                  <a href="#" className="dt9-btn dt9-btn-ghost">All Articles →</a>
                </Reveal>
              </div>
              <Stagger className="dt9-blog-grid">
                {[
                  { tag: "Heart Health", emoji: "❤️", bg: "#FFF0F0", acc: "rose", title: "10 Habits for a Stronger Heart", excerpt: "Small daily choices that dramatically reduce cardiovascular risk over time.", date: "May 2025" },
                  { tag: "Nutrition", emoji: "🥗", bg: "#F0F7F0", acc: "jade", title: "Anti-Inflammatory Foods to Eat Daily", excerpt: "How your plate can be your most powerful medicine against chronic disease.", date: "Apr 2025" },
                  { tag: "Wellbeing", emoji: "🧘", bg: "#F0F0FF", acc: "violet", title: "Managing Stress in the Modern World", excerpt: "Evidence-based strategies for maintaining balance when everything feels overwhelming.", date: "Mar 2025" },
                ].map((post, i) => (
                  <motion.article key={i} variants={vFadeUp(i * 0.1)} className="dt9-blog-card">
                    <div className="dt9-blog-thumb" style={{ background: post.bg }}>
                      <span style={{ fontSize: "2.8rem" }}>{post.emoji}</span>
                    </div>
                    <div className="dt9-blog-body">
                      <CPill color={post.acc}>{post.tag}</CPill>
                      <h3 className="dt9-blog-title">{post.title}</h3>
                      <p className="dt9-blog-excerpt">{post.excerpt}</p>
                      <div className="dt9-blog-meta">
                        <span className="dt9-blog-date">✦ {post.date}</span>
                        <a href="#" className="dt9-blog-read">Read →</a>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </Stagger>
            </div>
          </section>
        )}

        {/* ══ CONTACT ══ */}
        <section id="contact" className="dt9-section dt9-contact-bg">
          <div className="dt9-inner">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <Reveal><AccentH label="Get in Touch" color="azure" dark /></Reveal>
              <Reveal delay={0.05}>
                <h2 className="dt9-serif" style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", color: "#fff", marginBottom: 10 }}>
                  Contact & <em style={{ color: "var(--azure)" }}>Location</em>
                </h2>
              </Reveal>
            </div>

            <Reveal>
              <div className="dt9-emergency-bar">
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ fontSize: "1.6rem" }}>🚨</span>
                  <div>
                    <p style={{ fontWeight: 700, color: "#fff", fontSize: 15 }}>Medical Emergency? We respond 24/7</p>
                    <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>{emergencyAvailability || "Immediate qualified response any time, any day"}</p>
                  </div>
                </div>
                <a href={`tel:${emergency_}`} className="dt9-btn" style={{ background: "rgba(0,0,0,0.25)", color: "#fff", border: "2px solid rgba(255,255,255,0.3)", whiteSpace: "nowrap" }}>
                  🚑 Call {emergency_}
                </a>
              </div>
            </Reveal>

            <div className="dt9-contact-grid">
              <Stagger style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { icon: "📍", label: "Address", val: address_, acc: "azure" },
                  { icon: "📞", label: "Phone", val: phone_, acc: "jade" },
                  { icon: "✉️", label: "Email", val: email_, acc: "amber" },
                  ...(whatsappNumber ? [{ icon: "💬", label: "WhatsApp", val: whatsappNumber, acc: "green" }] : []),
                  ...(ambulanceNumber ? [{ icon: "🚑", label: "Ambulance", val: ambulanceNumber, acc: "rose" }] : []),
                ].map((item, i) => (
                  <motion.div key={i} variants={vFadeLeft(i * 0.08)} className="dt9-contact-card"
                    style={{ "--acc": `var(--${item.acc || "azure"})` }}>
                    <div className="dt9-contact-ico-wrap">{item.icon}</div>
                    <div style={{ wordBreak: "break-word" }}>
                      <p className="dt9-contact-lbl">{item.label}</p>
                      <p className="dt9-contact-val">{item.val}</p>
                    </div>
                  </motion.div>
                ))}
                {whatsappNumber && (
                  <Reveal>
                    <a href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
                      target="_blank" rel="noopener noreferrer"
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#25D366", color: "#fff", borderRadius: 12, padding: 14, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
                      💬 Chat on WhatsApp
                    </a>
                  </Reveal>
                )}
              </Stagger>

              <Reveal dir="right">
                <div className="dt9-map-frame">
                  {googleMapsEmbed
                    ? <iframe src={googleMapsEmbed} style={{ width: "100%", height: "100%", minHeight: 360, border: "none" }} allowFullScreen loading="lazy" title="Location" />
                    : (
                      <div style={{ textAlign: "center", color: "rgba(255,255,255,0.25)", padding: 40 }}>
                        <div style={{ fontSize: "3rem", marginBottom: 12 }}>🗺️</div>
                        <p style={{ fontWeight: 600, fontSize: 14 }}>Map will appear here</p>
                        <p style={{ fontSize: 12, marginTop: 4 }}>Add a Google Maps embed URL</p>
                      </div>
                    )}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══ FOOTER ══ */}
        <footer className="dt9-footer">
          <div className="dt9-footer-top">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: "var(--azure)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>💊</div>
                <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.3rem", color: "#fff" }}>{name_}</span>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.8, maxWidth: 280, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>
                Delivering extraordinary care with precision, compassion and integrity since {new Date().getFullYear() - (parseInt(experience) || 28)}.
              </p>
              <div className="dt9-social-row">
                {[["f", "facebook"], ["𝕏", "twitter"], ["📷", "instagram"], ["in", "linkedin"]].map(([s, key]) => (
                  <a key={key} href={socialLinks?.[key] || "#"} className="dt9-social-btn">{s}</a>
                ))}
              </div>
            </div>

            <div>
              <p className="dt9-footer-h" style={{ color: "var(--azure)" }}>Navigation</p>
              {navLinks.map(({ href, label }) => <a key={href} href={href} className="dt9-footer-link">{label}</a>)}
            </div>

            <div>
              <p className="dt9-footer-h" style={{ color: "var(--jade)" }}>Services</p>
              {svcs.slice(0, 5).map((s, i) => <a key={i} href="#services" className="dt9-footer-link">{s.title || s.name}</a>)}
            </div>

            <div>
              <p className="dt9-footer-h" style={{ color: "var(--amber)" }}>Contact</p>
              {[
                { icon: "📍", val: address_ },
                { icon: "📞", val: phone_ },
                { icon: "✉", val: email_ },
              ].map((item, i) => (
                <p key={i} style={{ display: "flex", gap: 8, fontSize: 13, marginBottom: 10, color: "rgba(255,255,255,0.4)", alignItems: "flex-start" }}>
                  <span style={{ flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ lineHeight: 1.5, wordBreak: "break-all" }}>{item.val}</span>
                </p>
              ))}
              {emergencyAvailability && (
                <p style={{ display: "flex", gap: 8, fontSize: 13, color: "var(--rose)" }}>
                  <span>🚨</span><span>{emergencyAvailability}</span>
                </p>
              )}
            </div>
          </div>

          {footerDisclaimer && (
            <div className="dt9-footer-disclaimer" style={{ marginBottom: 0 }}>
              <strong style={{ color: "var(--amber)" }}>Medical Disclaimer: </strong>
              {footerDisclaimer}
            </div>
          )}

          <hr className="dt9-footer-hr" />
          <div className="dt9-footer-bottom">
            <p>{footerCopyright || `© ${new Date().getFullYear()} ${name_}. All Rights Reserved.`}</p>
            <div style={{ display: "flex", gap: 20 }}>
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((t) => (
                <a key={t} href="#" style={{ color: "rgba(255,255,255,0.25)", textDecoration: "none", fontSize: 12 }}>{t}</a>
              ))}
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}