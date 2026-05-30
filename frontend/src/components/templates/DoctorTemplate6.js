"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

/*
 ╔══════════════════════════════════════════╗
 ║   DOCTOR TEMPLATE 6 — "VERDANT"         ║
 ║   Palette: Forest Green + Pearl Cream   ║
 ║   Aesthetic: Biophilic Luxury Medical   ║
 ╚══════════════════════════════════════════╝

  --forest       #1a3a2e   (richest dark green)
  --emerald      #2d6a4f   (primary green)
  --sage         #52b788   (mid accent)
  --mint         #95d5b2   (light accent)
  --pearl        #fafaf8   (base bg)
  --cream        #f4f1ea   (surface)
  --warm-white   #fffef9   (card bg)
  --bark         #5c4033   (warm dark)
  --stone        #8a8a7a   (muted text)
  --charcoal     #1c1c1a   (headings)
*/

/* ─── Easing Presets ─── */
const EASE_OUT = [0.16, 1, 0.3, 1];
const EASE_EXPO = [0.22, 1, 0.36, 1];
const SPRING_SOFT = { type: "spring", stiffness: 200, damping: 30 };

/* ─── Animation Variants ─── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: EASE_OUT } },
});
const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, delay, ease: EASE_OUT } },
});
const slideLeft = (delay = 0) => ({
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.85, delay, ease: EASE_EXPO } },
});
const slideRight = (delay = 0) => ({
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.85, delay, ease: EASE_EXPO } },
});
const scaleUp = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay, ease: EASE_EXPO } },
});
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

/* ─── Reveal Wrapper ─── */
function Reveal({ children, className = "", dir = "up", delay = 0, once = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-70px" });
  const map = { up: fadeUp(delay), left: slideLeft(delay), right: slideRight(delay), scale: scaleUp(delay), fade: fadeIn(delay) };
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={map[dir] || fadeUp(delay)} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Stagger Wrapper ─── */
function Stagger({ children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Section Label ─── */
function Label({ children, light = false }) {
  return (
    <div className={`dt6-label ${light ? "dt6-label-light" : ""}`}>
      <span className="dt6-label-dot" />
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
    let start = 0;
    const step = Math.ceil(num / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { setCount(num); clearInterval(timer); }
      else setCount(start);
    }, 24);
    return () => clearInterval(timer);
  }, [inView, target]);
  const raw = String(target);
  const nonNum = raw.replace(/[0-9]/g, "");
  return <span ref={ref}>{count}{nonNum || suffix}</span>;
}

/* ─── Testimonial Carousel ─── */
function TestimonialCarousel({ items }) {
  const [cur, setCur] = useState(0);
  const len = items.length;
  const go = useCallback((n) => setCur(((n % len) + len) % len), [len]);

  useEffect(() => {
    const t = setInterval(() => go(cur + 1), 5000);
    return () => clearInterval(t);
  }, [cur, go]);

  return (
    <div className="dt6-tcar">
      <div className="dt6-tcar-track">
        <AnimatePresence mode="wait">
          <motion.div
            key={cur}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="dt6-tcar-card"
          >
            <div className="dt6-tcar-quote">"</div>
            <p className="dt6-tcar-text">{items[cur].review || items[cur].text}</p>
            <div className="dt6-tcar-meta">
              <div className="dt6-tcar-avatar">
                {items[cur].image
                  ? <Image src={items[cur].image} alt={items[cur].name} fill className="object-cover" />
                  : <span>{(items[cur].name || items[cur].patientName || "P")[0]}</span>}
              </div>
              <div>
                <p className="dt6-tcar-name">{items[cur].name || items[cur].patientName}</p>
                <div className="dt6-tcar-stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ color: i < (items[cur].rating || 5) ? "#52b788" : "#d4d4c8" }}>★</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="dt6-tcar-dots">
        {items.map((_, i) => (
          <button key={i} onClick={() => go(i)} className={`dt6-tcar-dot ${i === cur ? "active" : ""}`} />
        ))}
      </div>
      <div className="dt6-tcar-nav">
        <button className="dt6-tcar-btn" onClick={() => go(cur - 1)}>←</button>
        <button className="dt6-tcar-btn" onClick={() => go(cur + 1)}>→</button>
      </div>
    </div>
  );
}

/* ─── Doctor Slider — compact paginated grid ─── */
function DoctorSlider({ items }) {
  const [page, setPage] = useState(0);
  const [cols, setCols] = useState(4);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 480) setCols(1);
      else if (w < 768) setCols(2);
      else if (w < 1024) setCols(3);
      else setCols(4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const totalPages = Math.ceil(items.length / cols);
  const shown = items.slice(page * cols, page * cols + cols);

  return (
    <div className="dt6-dslider">
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
          className="dt6-dslider-track"
        >
          {shown.map((doc, i) => (
            <div key={i} className="dt6-doc-card">
              <div className="dt6-doc-img">
                {doc.image
                  ? <Image src={doc.image} alt={doc.name || doc.doctorName} fill style={{ objectFit: "cover", objectPosition: "top" }} />
                  : <span className="dt6-doc-emoji">👨‍⚕️</span>}
                <div className="dt6-doc-overlay" />
              </div>
              <div className="dt6-doc-info">
                <p className="dt6-doc-spec">{doc.specialization}</p>
                <h3 className="dt6-doc-name">{doc.name || doc.doctorName}</h3>
                <p className="dt6-doc-exp">{doc.experience} Exp.</p>
                <a href="#contact" className="dt6-doc-book">Book →</a>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
      {totalPages > 1 && (
        <div className="dt6-dslider-nav">
          <button className="dt6-dslider-btn" onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>←</button>
          <div className="dt6-dslider-dots">
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => setPage(i)} className={`dt6-dslider-dot ${i === page ? "active" : ""}`} />
            ))}
          </div>
          <button className="dt6-dslider-btn" onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1}>→</button>
        </div>
      )}
    </div>
  );
}

/* ─── FAQ Item ─── */
function FaqItem({ q, a, idx }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div variants={fadeUp(idx * 0.07)} className={`dt6-faq-item ${open ? "open" : ""}`}>
      <button className="dt6-faq-q" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="dt6-faq-icon"
        >+</motion.span>
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
            <p className="dt6-faq-a">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   MAIN TEMPLATE
══════════════════════════════════════════ */
export default function DoctorTemplate6({ data }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroParallax = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
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

  const displayPhone = phone ? `${countryCode ? countryCode.split(" ")[0] : ""}${phone}` : "+1 800 VERDANT";
  const displayEmail = contactEmail || "hello@verdanthealth.com";
  const displayAddress = address || "22 Greenway Park, London W1";
  const displayName = clinicName || "Verdant Health";
  const displayEmergency = emergencyContact || displayPhone;

  const defaultServices = [
    { icon: "🫀", title: "Cardiology", description: "Precision cardiac care using advanced imaging and minimally invasive interventions for optimal heart health.", color: "#fce4e4" },
    { icon: "🧠", title: "Neurology", description: "Expert diagnosis and treatment of neurological conditions with cutting-edge brain mapping technology.", color: "#e4effe" },
    { icon: "🦴", title: "Orthopedics", description: "Joint replacement, sports injuries, and spinal care with rapid-recovery protocols.", color: "#e4f4e8" },
    { icon: "👶", title: "Pediatrics", description: "Gentle, child-centered care across all developmental stages with specialist pediatricians.", color: "#fff4e4" },
    { icon: "🌿", title: "Integrative Medicine", description: "Holistic wellness combining evidence-based medicine with complementary therapies.", color: "#e8f4ee" },
    { icon: "🩻", title: "Diagnostic Imaging", description: "High-resolution MRI, CT and ultrasound interpreted by fellowship-trained radiologists.", color: "#f0e4fe" },
  ];
  const displayServices = services?.length ? services : defaultServices;

  const defaultWhyChoose = [
    { icon: "🎓", title: "Expert Clinicians", description: "Board-certified specialists with postgraduate international training." },
    { icon: "🌱", title: "Holistic Approach", description: "We treat the whole person — body, mind, and lifestyle — not just symptoms." },
    { icon: "⚡", title: "Fast Appointments", description: "Same-day and next-day slots available across all specialties." },
    { icon: "🛡️", title: "Clear Pricing", description: "Transparent, itemised bills. No surprise costs. All major insurance accepted." },
    { icon: "📱", title: "Digital Care", description: "Video consultations, digital records, and app-based follow-ups." },
    { icon: "🌍", title: "Multilingual", description: "Care delivered in over 12 languages for our diverse community." },
  ];
  const displayWhyChoose = whyChooseUs?.length ? whyChooseUs : defaultWhyChoose;

  const defaultSchedule = [
    { day: "Monday – Friday", open: "7:00 AM", close: "8:00 PM" },
    { day: "Saturday", open: "8:00 AM", close: "5:00 PM" },
    { day: "Sunday", open: "10:00 AM", close: "2:00 PM" },
  ];
  const displaySchedule = schedule?.length ? schedule : defaultSchedule;

  const defaultStats = [
    { value: "20+", label: "Years of Excellence" },
    { value: "15K+", label: "Lives Transformed" },
    { value: "97%", label: "Patient Satisfaction" },
    { value: "60+", label: "Expert Specialists" },
  ];
  const displayStats = stats?.length ? stats : defaultStats;

  const defaultTestimonials = [
    { name: "Priya Sharma", review: "Verdant Health changed my perspective on healthcare entirely. Every detail — from the warm reception to the thorough follow-up — made me feel genuinely valued.", rating: 5 },
    { name: "James Whitfield", review: "I've visited many clinics, but nothing compares to the attentiveness here. The diagnosis was accurate, the explanation was clear, and I felt empowered.", rating: 5 },
    { name: "Mei Tanaka", review: "The integrative approach is unlike anything I've experienced. They addressed my physical symptoms AND my stress — and I left truly healthy.", rating: 5 },
    { name: "Omar Al-Hassan", review: "From the initial consultation to my post-surgery check-up, the care was extraordinary. World-class medicine with a very human touch.", rating: 5 },
  ];
  const displayTestimonials = testimonials?.length ? testimonials : defaultTestimonials;

  const defaultTeam = [
    { name: "Dr. Leila Nouri", specialization: "Cardiology", experience: "18 Years" },
    { name: "Dr. Ben Clarke", specialization: "Neurology", experience: "14 Years" },
    { name: "Dr. Amara Osei", specialization: "Orthopedics", experience: "12 Years" },
    { name: "Dr. Sarah Kim", specialization: "Pediatrics", experience: "10 Years" },
    { name: "Dr. Raj Patel", specialization: "Integrative", experience: "15 Years" },
  ];
  const displayTeam = teamDoctors?.length ? teamDoctors : defaultTeam;

  const defaultFaqs = [
    { question: "How do I schedule my first appointment?", answer: "You can book online 24/7, call our care team, or walk in. We offer same-day appointments for urgent cases and next-day for routine consultations." },
    { question: "What insurance plans do you accept?", answer: "We accept all major insurance plans including BUPA, AXA, Cigna, Vitality, and Aviva. Contact us to verify your specific coverage before your visit." },
    { question: "Do you offer video consultations?", answer: "Yes. All our specialists are available for secure video consultations via our app, making follow-ups and non-urgent consultations seamless from anywhere." },
    { question: "Is emergency care available around the clock?", answer: "Absolutely. Our 24-hour emergency line is always staffed by a senior clinician. We also have a dedicated rapid-response team for critical cases." },
    { question: "What should I bring to my appointment?", answer: "Please bring a valid ID, insurance details, any past test results or imaging, and a list of current medications. We'll handle the rest." },
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
    { href: "#doctors", label: "Doctors" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ── Root ── */
        :root {
          --forest:    #1a3a2e;
          --emerald:   #2d6a4f;
          --sage:      #52b788;
          --mint:      #95d5b2;
          --mint-pale: #d8f3dc;
          --pearl:     #fafaf8;
          --cream:     #f4f1ea;
          --warm-white:#fffef9;
          --bark:      #5c4033;
          --stone:     #7a7a6a;
          --charcoal:  #1c1c1a;
          --border:    rgba(45,106,79,0.12);
        }

        /* ── Base ── */
        .dt6 { font-family: 'DM Sans', sans-serif; background: var(--pearl); color: var(--charcoal); overflow-x: hidden; scroll-behavior: smooth; overflow-wrap: break-word; word-break: break-word; hyphens: auto; }
        .dt6 * { min-width: 0; }
        .dt6-serif { font-family: 'DM Serif Display', Georgia, serif; }

        /* ── Layout ── */
        .dt6-wrap { max-width: 1240px; margin: 0 auto; padding: 0 24px; }
        @media(min-width:768px){ .dt6-wrap { padding: 0 48px; } }
        .dt6-section { padding: 64px 0; }
        @media(min-width:768px){ .dt6-section { padding: 112px 0; } }

        /* ── Label ── */
        .dt6-label { display: inline-flex; align-items: center; gap: 8px; background: var(--mint-pale); border: 1px solid rgba(82,183,136,0.25); border-radius: 100px; padding: 6px 14px; margin-bottom: 18px; }
        .dt6-label-light { background: rgba(82,183,136,0.15); border-color: rgba(82,183,136,0.2); }
        .dt6-label-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--sage); flex-shrink: 0; }
        .dt6-label span:last-child { font-size: 11px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--emerald); }
        .dt6-label-light span:last-child { color: var(--mint); }

        /* ── Headings ── */
        .dt6-h1 { font-family: 'DM Serif Display', serif; font-size: clamp(2.5rem, 8vw, 5.8rem); line-height: 1.0; }
        .dt6-h2 { font-family: 'DM Serif Display', serif; font-size: clamp(1.8rem, 6vw, 3.4rem); line-height: 1.1; }
        .dt6-h3 { font-family: 'DM Serif Display', serif; font-size: clamp(1.3rem, 4vw, 1.9rem); line-height: 1.2; }
        .dt6-em { font-style: italic; color: var(--sage); }

        /* ── Buttons ── */
        .dt6-btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 30px; border-radius: 100px; font-weight: 600; font-size: 14px; text-decoration: none; border: none; cursor: pointer; transition: all 0.28s; letter-spacing: 0.01em; }
        .dt6-btn-primary { background: var(--emerald); color: #fff; }
        .dt6-btn-primary:hover { background: var(--forest); transform: translateY(-2px); box-shadow: 0 12px 32px rgba(45,106,79,0.3); }
        .dt6-btn-outline { background: transparent; color: var(--emerald); border: 1.5px solid var(--emerald); }
        .dt6-btn-outline:hover { background: var(--emerald); color: #fff; transform: translateY(-2px); }
        .dt6-btn-light { background: rgba(255,255,255,0.15); color: #fff; border: 1.5px solid rgba(255,255,255,0.3); backdrop-filter: blur(8px); }
        .dt6-btn-light:hover { background: rgba(255,255,255,0.25); transform: translateY(-2px); }
        .dt6-btn-sm { padding: 10px 22px; font-size: 13px; }

        /* ── Topbar ── */
        .dt6-topbar { background: var(--forest); color: rgba(255,255,255,0.6); font-size: 12px; padding: 9px 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; }
        @media(min-width:768px){ .dt6-topbar { padding: 9px 48px; } }
        .dt6-topbar-item { display: flex; align-items: center; gap: 6px; }
        .dt6-topbar-accent { color: var(--mint); }

        /* ── Navbar ── */
        .dt6-nav { position: sticky; top: 0; z-index: 50; transition: all 0.35s; }
        .dt6-nav-base { background: rgba(250,250,248,0.9); backdrop-filter: blur(18px); border-bottom: 1px solid var(--border); }
        .dt6-nav-scrolled { background: rgba(250,250,248,0.97); box-shadow: 0 4px 28px rgba(26,58,46,0.08); border-bottom: 1px solid var(--border); }
        .dt6-nav-inner { max-width: 1240px; margin: 0 auto; padding: 0 24px; height: 66px; display: flex; justify-content: space-between; align-items: center; }
        @media(min-width:768px){ .dt6-nav-inner { padding: 0 48px; } }
        .dt6-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .dt6-logo-mark { width: 36px; height: 36px; background: var(--emerald); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; transition: transform 0.2s; }
        .dt6-logo-mark:hover { transform: rotate(-5deg) scale(1.05); }
        .dt6-logo-name { font-family: 'DM Serif Display', serif; font-size: 1.3rem; color: var(--forest); }
        @media(max-width:479px){ .dt6-logo-name { font-size: 1.1rem; } }
        .dt6-logo-sub { font-size: 9px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: var(--sage); display: block; line-height: 1; }
        .dt6-nav-links { display: none; align-items: center; gap: 28px; }
        @media(min-width:1024px){ .dt6-nav-links { display: flex; } }
        .dt6-nav-a { font-size: 14px; font-weight: 500; color: var(--stone); text-decoration: none; transition: color 0.2s; }
        .dt6-nav-a:hover { color: var(--emerald); }
        .dt6-hamburger { display: flex; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 6px; }
        @media(min-width:1024px){ .dt6-hamburger { display: none; } }
        .dt6-ham-line { width: 22px; height: 2px; background: var(--charcoal); border-radius: 2px; transition: all 0.2s; }
        .dt6-mobile-nav { background: var(--warm-white); border-top: 1px solid var(--border); }
        @media(min-width:1024px){ .dt6-mobile-nav { display: none !important; } }
        .dt6-mobile-nav-inner { padding: 12px 24px; display: flex; flex-direction: column; }
        .dt6-mobile-a { font-size: 15px; font-weight: 500; color: var(--charcoal); text-decoration: none; padding: 13px 0; border-bottom: 1px solid var(--border); display: block; }

        /* ════════════════════════
           HERO — Split Geometric
        ════════════════════════ */
        .dt6-hero { min-height: 100vh; background: var(--forest); display: grid; grid-template-columns: 1fr; position: relative; overflow: hidden; }
        @media(min-width:1024px){ .dt6-hero { grid-template-columns: 1fr 1fr; } }

        /* Decorative organic blobs */
        .dt6-hero-blob1 { position: absolute; top: -120px; right: -80px; width: 500px; height: 500px; background: radial-gradient(circle, rgba(82,183,136,0.18) 0%, transparent 70%); pointer-events: none; }
        .dt6-hero-blob2 { position: absolute; bottom: -100px; left: -60px; width: 400px; height: 400px; background: radial-gradient(circle, rgba(149,213,178,0.12) 0%, transparent 70%); pointer-events: none; }
        .dt6-hero-grid { position: absolute; inset: 0; background-image: radial-gradient(rgba(82,183,136,0.07) 1px, transparent 1px); background-size: 40px 40px; pointer-events: none; }

        .dt6-hero-left { padding: 80px 24px 80px; display: flex; flex-direction: column; justify-content: center; position: relative; z-index: 2; min-width: 0; }
        @media(max-width:767px){ .dt6-hero-left { padding: 60px 24px 40px; } }
        @media(min-width:768px){ .dt6-hero-left { padding: 100px 48px 100px; } }
        @media(min-width:1024px){ .dt6-hero-left { padding: 120px 64px 120px 48px; } }

        .dt6-hero-tag { display: inline-flex; align-items: center; gap: 8px; background: rgba(82,183,136,0.12); border: 1px solid rgba(82,183,136,0.25); border-radius: 100px; padding: 7px 16px; margin-bottom: 28px; }
        .dt6-hero-tag-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--sage); animation: pulse-dot 2s infinite; }
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(1.4)} }
        .dt6-hero-tag-text { font-size: 12px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--mint); }

        .dt6-hero-title { color: #fff; margin-bottom: 20px; }
        .dt6-hero-title em { font-style: italic; color: var(--mint); }
        .dt6-hero-sub { color: rgba(255,255,255,0.5); font-size: 16px; line-height: 1.8; max-width: 480px; margin-bottom: 36px; }
        .dt6-hero-cta { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 56px; }
        @media(max-width: 479px) { .dt6-hero-cta { flex-direction: column; margin-bottom: 40px; } .dt6-hero-cta .dt6-btn { width: 100%; justify-content: center; } }
        .dt6-hero-micro { display: flex; flex-wrap: wrap; gap: 24px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 36px; }
        @media(max-width: 479px) { .dt6-hero-micro { gap: 16px; padding-top: 24px; justify-content: space-between; text-align: left; } }
        .dt6-hero-micro-val { font-family: 'DM Serif Display', serif; font-size: 2rem; color: var(--mint); line-height: 1; }
        .dt6-hero-micro-lbl { font-size: 11px; color: rgba(255,255,255,0.38); margin-top: 4px; letter-spacing: 0.04em; }

        .dt6-hero-right { position: relative; min-height: 400px; display: flex; align-items: flex-end; overflow: hidden; }
        @media(max-width: 479px) { .dt6-hero-right { min-height: 280px; } }
        @media(min-width:1024px){ .dt6-hero-right { min-height: 100vh; } }
        .dt6-hero-img { position: absolute; inset: 0; }
        .dt6-hero-img-shade { position: absolute; inset: 0; background: linear-gradient(to right, var(--forest) 0%, rgba(26,58,46,0.3) 40%, rgba(26,58,46,0.1) 100%); }
        @media(min-width:1024px){ .dt6-hero-img-shade { background: linear-gradient(to right, var(--forest) 0%, transparent 30%); } }
        .dt6-hero-badge { position: absolute; top: 32px; right: 24px; background: rgba(255,255,255,0.12); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.18); border-radius: 16px; padding: 16px 20px; z-index: 2; }
        .dt6-hero-badge-val { font-family: 'DM Serif Display', serif; font-size: 2rem; color: #fff; line-height: 1; }
        .dt6-hero-badge-lbl { font-size: 11px; color: rgba(255,255,255,0.55); margin-top: 3px; font-weight: 500; }
        /* Curved left edge on right panel */
        .dt6-hero-curve { position: absolute; left: 0; top: 0; bottom: 0; width: 60px; z-index: 1; display: none; }
        @media(min-width:1024px){ .dt6-hero-curve { display: block; } }

        /* ════════════════════════
           ABOUT — Full redesign: dark left panel + stacked right cards
        ════════════════════════ */
        .dt6-about { background: var(--pearl); }
        .dt6-about-outer { display: grid; grid-template-columns: 1fr; border-radius: 28px; overflow: hidden; border: 1px solid var(--border); }
        @media(min-width:1024px){ .dt6-about-outer { grid-template-columns: 5fr 7fr; } }

        /* Left dark panel with photo + overlay stats */
        .dt6-about-left { position: relative; min-height: 420px; background: var(--forest); overflow: hidden; }
        @media(min-width:1024px){ .dt6-about-left { min-height: 600px; } }
        .dt6-about-photo { position: absolute; inset: 0; }
        .dt6-about-photo-shade { position: absolute; inset: 0; background: linear-gradient(160deg, rgba(26,58,46,0.55) 0%, rgba(26,58,46,0.15) 60%, rgba(26,58,46,0.7) 100%); z-index: 1; }
        .dt6-about-left-content { position: absolute; inset: 0; z-index: 2; padding: 32px; display: flex; flex-direction: column; justify-content: flex-end; }
        .dt6-about-exp-badge { display: inline-flex; align-items: baseline; gap: 6px; background: rgba(255,255,255,0.1); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.15); border-radius: 14px; padding: 14px 20px; margin-bottom: 12px; align-self: flex-start; }
        .dt6-about-exp-num { font-family: 'DM Serif Display', serif; font-size: 2.4rem; color: var(--mint); line-height: 1; }
        .dt6-about-exp-lbl { font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.6); letter-spacing: 0.14em; text-transform: uppercase; }
        .dt6-about-photo-name { font-family: 'DM Serif Display', serif; font-size: 1.3rem; color: #fff; margin-bottom: 2px; }
        .dt6-about-photo-role { font-size: 11px; font-weight: 600; color: var(--sage); letter-spacing: 0.12em; text-transform: uppercase; }
        /* decorative leaf ring */
        .dt6-about-ring { position: absolute; top: -60px; right: -60px; width: 220px; height: 220px; border-radius: 50%; border: 1px solid rgba(82,183,136,0.15); z-index: 1; pointer-events: none; }
        .dt6-about-ring2 { position: absolute; top: -100px; right: -100px; width: 320px; height: 320px; border-radius: 50%; border: 1px solid rgba(82,183,136,0.08); z-index: 1; pointer-events: none; }

        /* Right content */
        .dt6-about-right { background: var(--warm-white); padding: 40px 32px; display: flex; flex-direction: column; justify-content: center; }
        @media(min-width:768px){ .dt6-about-right { padding: 52px 48px; } }
        .dt6-about-bio { color: var(--stone); font-size: 14.5px; line-height: 1.85; margin-bottom: 28px; }

        /* Credential row grid */
        .dt6-about-creds { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 24px 0 28px; }
        @media(max-width:479px){ .dt6-about-creds { grid-template-columns: 1fr; } }
        .dt6-about-cred { display: flex; align-items: flex-start; gap: 10px; background: var(--cream); border-radius: 14px; padding: 14px 16px; border: 1px solid var(--border); transition: border-color 0.2s, transform 0.2s; }
        .dt6-about-cred:hover { border-color: rgba(82,183,136,0.35); transform: translateY(-2px); }
        .dt6-about-cred-icon { width: 34px; height: 34px; min-width: 34px; background: var(--mint-pale); border-radius: 9px; display: flex; align-items: center; justify-content: center; font-size: 1rem; }
        .dt6-about-cred-lbl { font-size: 9.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--sage); margin-bottom: 2px; }
        .dt6-about-cred-val { font-size: 12.5px; font-weight: 600; color: var(--charcoal); line-height: 1.35; }

        /* Highlight strip */
        .dt6-about-strip { display: flex; gap: 0; border-radius: 14px; overflow: hidden; border: 1px solid var(--border); margin-bottom: 28px; }
        .dt6-about-strip-item { flex: 1; padding: 14px 12px; text-align: center; border-right: 1px solid var(--border); background: var(--cream); }
        .dt6-about-strip-item:last-child { border-right: none; }
        .dt6-about-strip-val { font-family: 'DM Serif Display', serif; font-size: 1.5rem; color: var(--emerald); line-height: 1; }
        .dt6-about-strip-lbl { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--stone); margin-top: 3px; }
        @media(max-width: 479px) { .dt6-about-strip { flex-direction: column; } .dt6-about-strip-item { border-right: none; border-bottom: 1px solid var(--border); } .dt6-about-strip-item:last-child { border-bottom: none; } }

        /* ════════════════════════
           SERVICES — Bento Grid
        ════════════════════════ */
        .dt6-services { background: var(--pearl); }
        .dt6-svc-bento { display: grid; grid-template-columns: 1fr; gap: 16px; }
        @media(min-width:640px){ .dt6-svc-bento { grid-template-columns: repeat(2, 1fr); } }
        @media(min-width:1024px){ .dt6-svc-bento { grid-template-columns: repeat(3, 1fr); } }
        .dt6-svc-card { background: var(--warm-white); border: 1px solid var(--border); border-radius: 24px; padding: 32px 28px; position: relative; overflow: hidden; cursor: default; transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s; }
        .dt6-svc-card:hover { transform: translateY(-6px); box-shadow: 0 24px 60px rgba(26,58,46,0.1); border-color: rgba(82,183,136,0.3); }
        .dt6-svc-card::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--sage), var(--mint)); opacity: 0; transition: opacity 0.3s; border-radius: 0 0 24px 24px; }
        .dt6-svc-card:hover::after { opacity: 1; }
        .dt6-svc-icon-wrap { width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; margin-bottom: 20px; transition: transform 0.3s; }
        .dt6-svc-card:hover .dt6-svc-icon-wrap { transform: scale(1.1) rotate(-3deg); }
        .dt6-svc-title { font-family: 'DM Serif Display', serif; font-size: 1.25rem; color: var(--charcoal); margin-bottom: 10px; line-height: 1.2; }
        .dt6-svc-desc { font-size: 13.5px; color: var(--stone); line-height: 1.7; }
        .dt6-svc-num { position: absolute; top: 20px; right: 24px; font-family: 'DM Serif Display', serif; font-size: 4rem; color: rgba(82,183,136,0.07); line-height: 1; user-select: none; }
        .dt6-svc-arrow { display: inline-flex; align-items: center; gap: 6px; color: var(--emerald); font-size: 13px; font-weight: 600; margin-top: 16px; opacity: 0; transform: translateY(6px); transition: all 0.3s; text-decoration: none; }
        .dt6-svc-card:hover .dt6-svc-arrow { opacity: 1; transform: translateY(0); }

        /* ════════════════════════
           STATS — Curved dark band
        ════════════════════════ */
        .dt6-stats-band { background: var(--forest); position: relative; overflow: hidden; padding: 72px 0; }
        .dt6-stats-bg-ring { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 600px; height: 600px; border-radius: 50%; border: 1px solid rgba(82,183,136,0.08); pointer-events: none; }
        .dt6-stats-bg-ring2 { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 900px; height: 900px; border-radius: 50%; border: 1px solid rgba(82,183,136,0.05); pointer-events: none; }
        .dt6-stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0; position: relative; z-index: 1; }
        @media(min-width:768px){ .dt6-stats-grid { grid-template-columns: repeat(4, 1fr); } }
        .dt6-stat { padding: 40px 32px; text-align: center; border-right: 1px solid rgba(82,183,136,0.1); position: relative; }
        .dt6-stat:nth-child(2n){ border-right: none; }
        @media(min-width:768px){ .dt6-stat { border-right: 1px solid rgba(82,183,136,0.1); } .dt6-stat:last-child { border-right: none; } }
        .dt6-stat-val { font-family: 'DM Serif Display', serif; font-size: clamp(2.4rem, 4.5vw, 3.5rem); color: var(--mint); line-height: 1; margin-bottom: 8px; }
        .dt6-stat-lbl { font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.35); letter-spacing: 0.1em; text-transform: uppercase; }
        @media(max-width:479px){ .dt6-stats-grid { grid-template-columns: 1fr; } .dt6-stat { border-right: none; border-bottom: 1px solid rgba(82,183,136,0.1); padding: 24px; } .dt6-stat:last-child { border-bottom: none; } }

        /* ════════════════════════
           WHY CHOOSE — 2+4 asymmetric
        ════════════════════════ */
        .dt6-why { background: var(--cream); }
        .dt6-why-layout { display: grid; grid-template-columns: 1fr; gap: 48px; }
        @media(min-width:1024px){ .dt6-why-layout { grid-template-columns: 2fr 3fr; gap: 80px; align-items: center; } }
        .dt6-why-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media(max-width:479px){ .dt6-why-grid { grid-template-columns: 1fr; } }
        .dt6-why-card { background: var(--warm-white); border: 1px solid var(--border); border-radius: 20px; padding: 24px 20px; transition: all 0.3s; cursor: default; }
        .dt6-why-card:hover { border-color: rgba(82,183,136,0.4); box-shadow: 0 12px 36px rgba(26,58,46,0.08); transform: translateY(-4px); }
        .dt6-why-icon { font-size: 1.5rem; margin-bottom: 12px; display: block; }
        .dt6-why-title { font-family: 'DM Serif Display', serif; font-size: 1.05rem; color: var(--charcoal); margin-bottom: 6px; line-height: 1.2; }
        .dt6-why-desc { font-size: 12.5px; color: var(--stone); line-height: 1.65; }

        /* ════════════════════════
           DOCTORS — Compact horizontal scroll slider
        ════════════════════════ */
        .dt6-docs { background: var(--cream); padding: 72px 0; }
        .dt6-docs-header { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 32px; }
        .dt6-dslider { width: 100%; }
        .dt6-dslider-track-wrap { overflow: hidden; }
        .dt6-dslider-track { display: grid; gap: 14px; transition: none; }
        /* responsive columns */
        .dt6-dslider-track { grid-template-columns: repeat(4, 1fr); }
        @media(max-width:1023px){ .dt6-dslider-track { grid-template-columns: repeat(3, 1fr); } }
        @media(max-width:767px){ .dt6-dslider-track { grid-template-columns: repeat(2, 1fr); } }
        @media(max-width:479px){ .dt6-dslider-track { grid-template-columns: 1fr; } }

        /* compact horizontal card */
        .dt6-doc-card { border-radius: 18px; overflow: hidden; background: var(--warm-white); border: 1px solid var(--border); cursor: pointer; transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s; display: flex; flex-direction: column; }
        .dt6-doc-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(26,58,46,0.1); border-color: rgba(82,183,136,0.3); }
        .dt6-doc-img { position: relative; aspect-ratio: 1/1; overflow: hidden; background: linear-gradient(135deg, var(--mint-pale) 0%, var(--cream) 100%); flex-shrink: 0; }
        .dt6-doc-img img { transition: transform 0.5s ease; width: 100%; height: 100%; object-fit: cover; object-position: top; }
        .dt6-doc-card:hover .dt6-doc-img img { transform: scale(1.06); }
        .dt6-doc-emoji { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 2.8rem; }
        .dt6-doc-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(26,58,46,0.55) 0%, transparent 60%); }
        .dt6-doc-info { padding: 14px 16px 16px; flex: 1; }
        .dt6-doc-spec { font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--sage); margin-bottom: 3px; }
        .dt6-doc-name { font-family: 'DM Serif Display', serif; font-size: 1.05rem; color: var(--charcoal); line-height: 1.2; margin-bottom: 3px; }
        .dt6-doc-exp { font-size: 11px; color: var(--stone); }
        .dt6-doc-book { display: inline-flex; align-items: center; gap: 5px; margin-top: 10px; font-size: 11.5px; font-weight: 600; color: var(--emerald); text-decoration: none; opacity: 0; transform: translateY(4px); transition: all 0.25s; }
        .dt6-doc-card:hover .dt6-doc-book { opacity: 1; transform: translateY(0); }

        /* slider pagination */
        .dt6-dslider-nav { display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: 24px; }
        .dt6-dslider-btn { width: 38px; height: 38px; border-radius: 50%; border: 1.5px solid var(--border); background: var(--warm-white); font-size: 16px; cursor: pointer; color: var(--emerald); transition: all 0.2s; display: flex; align-items: center; justify-content: center; }
        .dt6-dslider-btn:hover:not(:disabled) { background: var(--emerald); color: #fff; border-color: var(--emerald); box-shadow: 0 6px 20px rgba(45,106,79,0.25); }
        .dt6-dslider-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .dt6-dslider-dots { display: flex; gap: 6px; }
        .dt6-dslider-dot { width: 7px; height: 7px; border-radius: 50%; background: rgba(45,106,79,0.15); border: none; cursor: pointer; padding: 0; transition: all 0.25s; }
        .dt6-dslider-dot.active { width: 22px; border-radius: 4px; background: var(--emerald); }

        /* ════════════════════════
           TESTIMONIALS
        ════════════════════════ */
        .dt6-testimonials { background: var(--forest); position: relative; overflow: hidden; }
        .dt6-test-mesh { position: absolute; inset: 0; background: radial-gradient(ellipse at 20% 50%, rgba(82,183,136,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(149,213,178,0.08) 0%, transparent 60%); pointer-events: none; }
        .dt6-test-layout { display: grid; grid-template-columns: 1fr; gap: 56px; position: relative; z-index: 1; }
        @media(min-width:1024px){ .dt6-test-layout { grid-template-columns: 1fr 1fr; align-items: center; gap: 80px; } }
        .dt6-tcar { }
        .dt6-tcar-track { }
        .dt6-tcar-card { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(12px); border-radius: 28px; padding: 36px; }
        @media(max-width:479px){ .dt6-tcar-card { padding: 24px; } }
        .dt6-tcar-quote { font-family: 'DM Serif Display', serif; font-size: 4.5rem; color: var(--sage); line-height: 0.6; margin-bottom: 12px; opacity: 0.5; }
        .dt6-tcar-text { font-family: 'DM Serif Display', serif; font-size: 1.15rem; font-style: italic; color: rgba(255,255,255,0.85); line-height: 1.75; margin-bottom: 28px; }
        @media(max-width:479px){ .dt6-tcar-text { font-size: 1rem; } }
        .dt6-tcar-meta { display: flex; align-items: center; gap: 14px; }
        .dt6-tcar-avatar { width: 48px; height: 48px; min-width: 48px; border-radius: 50%; background: rgba(82,183,136,0.2); border: 2px solid rgba(82,183,136,0.4); display: flex; align-items: center; justify-content: center; font-family: 'DM Serif Display', serif; font-size: 1.2rem; color: var(--mint); overflow: hidden; position: relative; }
        .dt6-tcar-name { font-weight: 600; font-size: 14px; color: #fff; margin-bottom: 3px; }
        .dt6-tcar-stars { display: flex; gap: 2px; font-size: 12px; }
        .dt6-tcar-dots { display: flex; gap: 8px; margin-top: 20px; }
        .dt6-tcar-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.2); border: none; cursor: pointer; padding: 0; transition: all 0.25s; }
        .dt6-tcar-dot.active { width: 24px; border-radius: 4px; background: var(--sage); }
        .dt6-tcar-nav { display: flex; gap: 10px; margin-top: 16px; }
        .dt6-tcar-btn { width: 42px; height: 42px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.2); background: transparent; font-size: 18px; cursor: pointer; color: rgba(255,255,255,0.7); transition: all 0.2s; display: flex; align-items: center; justify-content: center; }
        .dt6-tcar-btn:hover { border-color: var(--sage); color: var(--sage); }

        /* ════════════════════════
           SCHEDULE SECTION
        ════════════════════════ */
        .dt6-schedule { background: var(--cream); }
        .dt6-schedule-grid { display: grid; grid-template-columns: 1fr; gap: 48px; }
        @media(min-width:1024px){ .dt6-schedule-grid { grid-template-columns: 1fr 1fr; align-items: start; gap: 72px; } }
        .dt6-schedule-list { background: var(--warm-white); border-radius: 24px; overflow: hidden; border: 1px solid var(--border); }
        .dt6-schedule-row { display: flex; justify-content: space-between; align-items: center; padding: 18px 24px; border-bottom: 1px solid var(--border); transition: background 0.2s; }
        @media(max-width:479px){ .dt6-schedule-row { flex-direction: column; align-items: flex-start; gap: 6px; padding: 16px; } }
        .dt6-schedule-row:last-child { border-bottom: none; }
        .dt6-schedule-row:hover { background: var(--cream); }
        .dt6-schedule-day { font-size: 14px; font-weight: 500; color: var(--charcoal); }
        .dt6-schedule-time { font-family: 'DM Serif Display', serif; font-size: 1.05rem; color: var(--emerald); }
        .dt6-emergency-card { background: var(--emerald); border-radius: 24px; padding: 32px; color: #fff; position: relative; overflow: hidden; }
        @media(max-width:479px){ .dt6-emergency-card { padding: 24px; } }
        .dt6-emergency-card::after { content: ''; position: absolute; top: -40px; right: -40px; width: 160px; height: 160px; background: rgba(255,255,255,0.07); border-radius: 50%; }
        .dt6-emergency-icon { font-size: 2.5rem; margin-bottom: 16px; display: block; }
        .dt6-emergency-title { font-family: 'DM Serif Display', serif; font-size: 1.6rem; margin-bottom: 8px; }
        .dt6-emergency-sub { font-size: 13.5px; opacity: 0.7; line-height: 1.6; margin-bottom: 20px; }

        /* ════════════════════════
           FAQ
        ════════════════════════ */
        .dt6-faq { background: var(--pearl); }
        .dt6-faq-layout { display: grid; grid-template-columns: 1fr; gap: 56px; }
        @media(min-width:1024px){ .dt6-faq-layout { grid-template-columns: 2fr 3fr; gap: 80px; align-items: start; } }
        .dt6-faq-item { border-bottom: 1px solid var(--border); }
        .dt6-faq-q { width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 22px 0; background: none; border: none; cursor: pointer; text-align: left; }
        .dt6-faq-q span:first-child { font-family: 'DM Serif Display', serif; font-size: 1.05rem; color: var(--charcoal); line-height: 1.3; transition: color 0.2s; }
        .dt6-faq-q:hover span:first-child { color: var(--emerald); }
        .dt6-faq-icon { width: 30px; height: 30px; min-width: 30px; border-radius: 50%; border: 1.5px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 300; color: var(--emerald); transition: border-color 0.2s, background 0.2s; }
        .dt6-faq-item.open .dt6-faq-icon { background: var(--emerald); color: #fff; border-color: var(--emerald); }
        .dt6-faq-a { padding: 0 0 22px; font-size: 14px; color: var(--stone); line-height: 1.75; }

        /* ════════════════════════
           INSURANCE
        ════════════════════════ */
        .dt6-insurance { background: var(--cream); }
        .dt6-ins-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 40px; }
        .dt6-ins-chip { background: var(--warm-white); border: 1px solid var(--border); border-radius: 100px; padding: 10px 22px; font-size: 13px; font-weight: 600; color: var(--charcoal); transition: all 0.2s; cursor: default; display: flex; align-items: center; gap: 8px; }
        .dt6-ins-chip:hover { border-color: var(--sage); color: var(--emerald); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(26,58,46,0.08); }

        /* ════════════════════════
           BLOG
        ════════════════════════ */
        .dt6-blog { background: var(--pearl); }
        .dt6-blog-grid { display: grid; grid-template-columns: 1fr; gap: 24px; margin-top: 48px; }
        @media(min-width:640px){ .dt6-blog-grid { grid-template-columns: repeat(2, 1fr); } }
        @media(min-width:1024px){ .dt6-blog-grid { grid-template-columns: repeat(3, 1fr); } }
        .dt6-blog-card { background: var(--warm-white); border: 1px solid var(--border); border-radius: 24px; overflow: hidden; cursor: pointer; transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s; }
        .dt6-blog-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(26,58,46,0.09); border-color: rgba(82,183,136,0.3); }
        .dt6-blog-thumb { height: 180px; display: flex; align-items: center; justify-content: center; font-size: 2.8rem; }
        .dt6-blog-body { padding: 22px; }
        .dt6-blog-tag { font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--sage); }
        .dt6-blog-title { font-family: 'DM Serif Display', serif; font-size: 1.1rem; color: var(--charcoal); margin: 8px 0; line-height: 1.3; }
        .dt6-blog-excerpt { font-size: 13px; color: var(--stone); line-height: 1.65; margin-bottom: 12px; }
        .dt6-blog-date { font-size: 11px; color: var(--stone); display: flex; align-items: center; gap: 6px; }

        /* ════════════════════════
           CONTACT
        ════════════════════════ */
        .dt6-contact { background: var(--forest); position: relative; overflow: hidden; }
        .dt6-contact-blob { position: absolute; top: -100px; right: -100px; width: 400px; height: 400px; background: radial-gradient(circle, rgba(82,183,136,0.1) 0%, transparent 70%); pointer-events: none; }
        .dt6-contact-grid { display: grid; grid-template-columns: 1fr; gap: 48px; position: relative; z-index: 1; }
        @media(min-width:1024px){ .dt6-contact-grid { grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; } }
        .dt6-contact-cards { display: flex; flex-direction: column; gap: 12px; }
        .dt6-contact-card { display: flex; align-items: flex-start; gap: 14px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 18px 20px; transition: border-color 0.2s; }
        .dt6-contact-card:hover { border-color: rgba(82,183,136,0.3); }
        .dt6-contact-card-icon { width: 42px; height: 42px; min-width: 42px; background: rgba(82,183,136,0.12); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; }
        .dt6-contact-card-lbl { font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--sage); margin-bottom: 3px; }
        .dt6-contact-card-val { font-size: 14px; color: rgba(255,255,255,0.8); font-weight: 500; }
        .dt6-map-wrap { border-radius: 24px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); min-height: 360px; background: rgba(255,255,255,0.04); display: flex; align-items: center; justify-content: center; }
        .dt6-map-ph { text-align: center; color: rgba(255,255,255,0.3); padding: 40px; }

        /* ════════════════════════
           FOOTER
        ════════════════════════ */
        .dt6-footer { background: var(--charcoal); color: rgba(255,255,255,0.45); }
        .dt6-footer-top { max-width: 1240px; margin: 0 auto; padding: 64px 24px 48px; display: grid; grid-template-columns: 1fr; gap: 40px; }
        @media(min-width:768px){ .dt6-footer-top { padding: 64px 48px 48px; grid-template-columns: repeat(2,1fr); } }
        @media(min-width:1024px){ .dt6-footer-top { grid-template-columns: 2.5fr 1fr 1fr 1.5fr; } }
        .dt6-footer-heading { font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--sage); margin-bottom: 16px; }
        .dt6-footer-link { display: block; font-size: 13px; color: rgba(255,255,255,0.4); text-decoration: none; padding: 5px 0; transition: color 0.2s; }
        .dt6-footer-link:hover { color: var(--mint); }
        .dt6-footer-hr { border: none; border-top: 1px solid rgba(255,255,255,0.06); margin: 0 24px; }
        @media(min-width:768px){ .dt6-footer-hr { margin: 0 48px; } }
        .dt6-footer-bottom { max-width: 1240px; margin: 0 auto; padding: 20px 24px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px; font-size: 12px; }
        @media(min-width:768px){ .dt6-footer-bottom { padding: 20px 48px; } }
        .dt6-social-row { display: flex; gap: 8px; margin-top: 16px; }
        .dt6-social-btn { width: 34px; height: 34px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-size: 13px; color: rgba(255,255,255,0.35); text-decoration: none; transition: all 0.2s; }
        .dt6-social-btn:hover { border-color: var(--sage); color: var(--mint); }
        .dt6-footer-disclaimer { background: rgba(255,255,255,0.03); border-radius: 12px; padding: 14px 18px; margin: 0 24px 0; font-size: 11px; color: rgba(255,255,255,0.25); line-height: 1.65; border: 1px solid rgba(255,255,255,0.05); }
        @media(min-width:768px){ .dt6-footer-disclaimer { margin: 0 48px 0; } }

        /* ════════════════════════
           FLOATING CTA STRIP
        ════════════════════════ */
        .dt6-cta-strip { background: var(--sage); }
        .dt6-cta-strip-inner { max-width: 1240px; margin: 0 auto; padding: 24px 48px; display: flex; justify-content: space-between; align-items: center; gap: 20px; flex-wrap: wrap; }
        @media(max-width:767px){ .dt6-cta-strip-inner { padding: 24px; justify-content: center; text-align: center; flex-direction: column; } }
        .dt6-cta-strip-text { font-family: 'DM Serif Display', serif; font-size: 1.4rem; color: var(--forest); }
        .dt6-cta-strip-sub { font-size: 13px; color: rgba(26,58,46,0.65); margin-top: 2px; }
      `}</style>

      <div className="dt6">

        {/* ── Topbar ── */}
        <div className="dt6-topbar">
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <div className="dt6-topbar-item">
              <span className="dt6-topbar-accent">📞</span>
              <span>{displayPhone}</span>
            </div>
            <div className="dt6-topbar-item">
              <span className="dt6-topbar-accent">✉</span>
              <span>{displayEmail}</span>
            </div>
          </div>
          <div className="dt6-topbar-item">
            <span className="dt6-topbar-accent">🕒</span>
            <span>{workingHours || "Mon–Fri 7 AM – 8 PM"}</span>
          </div>
        </div>

        {/* ── Navbar ── */}
        <motion.header
          className={`dt6-nav ${scrolled ? "dt6-nav-scrolled" : "dt6-nav-base"}`}
          initial={{ y: -70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <div className="dt6-nav-inner">
            {headerType === "Image" && logoUrl ? (
              <div style={{ position: "relative", width: 130, height: 38 }}>
                <Image src={logoUrl} alt={displayName} fill className="object-contain" />
              </div>
            ) : (
              <a href="#home" className="dt6-logo">
                <div className="dt6-logo-mark">🌿</div>
                <div>
                  <span className="dt6-logo-name">{displayName}</span>
                  <span className="dt6-logo-sub">{specialty || "Health & Wellness"}</span>
                </div>
              </a>
            )}

            <nav className="dt6-nav-links">
              {navLinks.map(({ href, label }) => (
                <a key={href} href={href} className="dt6-nav-a">{label}</a>
              ))}
              <a href="#contact" className="dt6-btn dt6-btn-primary dt6-btn-sm">Book Now</a>
            </nav>

            <button className="dt6-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              <motion.div animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} className="dt6-ham-line" />
              <motion.div animate={{ opacity: menuOpen ? 0 : 1 }} className="dt6-ham-line" />
              <motion.div animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} className="dt6-ham-line" />
            </button>
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                className="dt6-mobile-nav" style={{ overflow: "hidden" }}
              >
                <div className="dt6-mobile-nav-inner">
                  {navLinks.map(({ href, label }) => (
                    <a key={href} href={href} className="dt6-mobile-a" onClick={() => setMenuOpen(false)}>{label}</a>
                  ))}
                  <a href="#contact" className="dt6-btn dt6-btn-primary" style={{ marginTop: 14, justifyContent: "center" }} onClick={() => setMenuOpen(false)}>Book Appointment</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        {/* ══ HERO ══ */}
        <section id="home" ref={heroRef} className="dt6-hero">
          <div className="dt6-hero-blob1" />
          <div className="dt6-hero-blob2" />
          <div className="dt6-hero-grid" />

          {/* Left Content */}
          <div className="dt6-hero-left">
            <motion.div
              className="dt6-hero-tag"
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="dt6-hero-tag-dot" />
              <span className="dt6-hero-tag-text">{specialty || "Precision · Compassion · Excellence"}</span>
            </motion.div>

            <motion.h1
              className="dt6-h1 dt6-hero-title"
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: EASE_OUT }}
              style={{ fontSize: heroTitleFontSize ? `clamp(2.2rem, 8vw, ${heroTitleFontSize}px)` : undefined }}
            >
              {heroTitle ? heroTitle : (<>Your Health,<br />Our <em>Life's</em><br />Work.</>)}
            </motion.h1>

            <motion.p
              className="dt6-hero-sub"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.55 }}
            >
              {tagline && <strong style={{ display: "block", color: "rgba(255,255,255,0.75)", marginBottom: 6 }}>{tagline}</strong>}
              {heroDescription || "World-class specialists. Evidence-based care. A holistic approach to wellbeing that treats the whole person — not just the condition."}
            </motion.p>

            <motion.div
              className="dt6-hero-cta"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.7 }}
            >
              <a href="#contact" className="dt6-btn dt6-btn-primary">🌿 Book Appointment</a>
              <a href={`tel:${displayEmergency}`} className="dt6-btn dt6-btn-light">🚨 Emergency Line</a>
            </motion.div>

            <motion.div
              className="dt6-hero-micro"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              {[["20+", "Years"], ["15K+", "Patients"], ["97%", "Satisfaction"]].map(([v, l]) => (
                <div key={l}>
                  <p className="dt6-hero-micro-val">{v}</p>
                  <p className="dt6-hero-micro-lbl">{l}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Image */}
          <motion.div
            className="dt6-hero-right"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.2 }}
          >
            <div className="dt6-hero-img">
              <motion.div style={{ y: heroParallax, position: "absolute", inset: 0 }}>
                <Image
                  src={heroImage || "/images/templates/template-img-26.jpg"}
                  alt="Doctor" fill
                  className="object-cover object-center"
                  priority
                />
              </motion.div>
              <div className="dt6-hero-img-shade" />
            </div>
            {/* Glass badge */}
            <div className="dt6-hero-badge">
              <p className="dt6-hero-badge-val">{experience || "20"}+</p>
              <p className="dt6-hero-badge-lbl">Years of<br />Excellence</p>
            </div>
          </motion.div>
        </section>

        {/* ══ ABOUT ══ */}
        <section id="about" className="dt6-section dt6-about">
          <div className="dt6-wrap">
            <Reveal>
              <div className="dt6-about-outer">
                {/* Left — dark photo panel */}
                <div className="dt6-about-left">
                  <div className="dt6-about-ring" />
                  <div className="dt6-about-ring2" />
                  <div className="dt6-about-photo">
                    <Image
                      src={aboutImage || heroImage || "/images/templates/template-img-27.jpg"}
                      alt="About"
                      fill
                      style={{ objectFit: "cover", objectPosition: "center top" }}
                    />
                  </div>
                  <div className="dt6-about-photo-shade" />
                  <div className="dt6-about-left-content">
                    <div className="dt6-about-exp-badge">
                      <span className="dt6-about-exp-num">{experience || "20"}+</span>
                      <span className="dt6-about-exp-lbl">Years Trusted</span>
                    </div>
                    <p className="dt6-about-photo-name">{clinicName || "Verdant Health"}</p>
                    <p className="dt6-about-photo-role">{specialty || "Premium Medical Centre"}</p>
                  </div>
                </div>

                {/* Right — content panel */}
                <div className="dt6-about-right">
                  <Label>{aboutUsTitle || "About the Practice"}</Label>
                  <h2 className="dt6-h2" style={{ color: "var(--forest)", marginBottom: 16 }}>
                    Care Rooted in <em className="dt6-em">Science</em><br />&amp; Humanity
                  </h2>

                  <p className="dt6-about-bio">
                    {bio || "For over two decades, our multidisciplinary team has combined clinical precision with genuine human warmth. We believe the best medicine treats the whole person — bringing together advanced diagnostics, specialist expertise, and compassionate care at every step."}
                  </p>

                  {/* Highlight strip */}
                  <div className="dt6-about-strip">
                    {[
                      { val: `${experience || "20"}+`, lbl: "Years" },
                      { val: "15K+", lbl: "Patients" },
                      { val: "97%", lbl: "Satisfaction" },
                    ].map(({ val, lbl }) => (
                      <div key={lbl} className="dt6-about-strip-item">
                        <p className="dt6-about-strip-val">{val}</p>
                        <p className="dt6-about-strip-lbl">{lbl}</p>
                      </div>
                    ))}
                  </div>

                  {/* Credential cards */}
                  <div className="dt6-about-creds">
                    {[
                      { icon: "🎓", lbl: "Education", val: qualification || education || "MD — Medical University" },
                      { icon: "📜", lbl: "Certifications", val: certifications || "MBBS, MD, FRCS" },
                      { icon: "🏥", lbl: "Hospital", val: hospitalName || displayName },
                      { icon: "🌍", lbl: "Languages", val: languagesSpoken || "12+ Languages" },
                    ].map(({ icon, lbl, val }) => (
                      <div key={lbl} className="dt6-about-cred">
                        <div className="dt6-about-cred-icon">{icon}</div>
                        <div>
                          <p className="dt6-about-cred-lbl">{lbl}</p>
                          <p className="dt6-about-cred-val">{val}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <a href="#contact" className="dt6-btn dt6-btn-primary" style={{ alignSelf: "flex-start" }}>
                    Request Consultation →
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ SERVICES ══ */}
        <section id="services" className="dt6-section dt6-services">
          <div className="dt6-wrap">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 48 }}>
              <div>
                <Reveal><Label>Specialties &amp; Services</Label></Reveal>
                <Reveal delay={0.06}>
                  <h2 className="dt6-h2" style={{ color: "var(--forest)" }}>
                    Comprehensive <em className="dt6-em">Care</em><br />Across Disciplines
                  </h2>
                </Reveal>
              </div>
              <Reveal dir="right">
                <p style={{ color: "var(--stone)", fontSize: 14, lineHeight: 1.7, maxWidth: 300 }}>
                  Every specialty, under one roof — with seamless coordination between our expert teams.
                </p>
              </Reveal>
            </div>

            <Stagger className="dt6-svc-bento">
              {displayServices.map((svc, i) => (
                <motion.div key={i} variants={fadeUp(i * 0.08)} className="dt6-svc-card">
                  <div className="dt6-svc-num">0{i + 1}</div>
                  <div className="dt6-svc-icon-wrap" style={{ background: svc.color || "var(--mint-pale)" }}>
                    {svc.icon || "🩺"}
                  </div>
                  <h3 className="dt6-svc-title">{svc.title || svc.name}</h3>
                  <p className="dt6-svc-desc">{svc.description || svc.desc || "Expert care tailored to your needs."}</p>
                  <a href="#contact" className="dt6-svc-arrow">Book this service →</a>
                </motion.div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ══ STATS BAND ══ */}
        <section className="dt6-stats-band">
          <div className="dt6-stats-bg-ring" />
          <div className="dt6-stats-bg-ring2" />
          <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
            <Stagger className="dt6-stats-grid">
              {displayStats.map((s, i) => (
                <motion.div key={i} variants={scaleUp(i * 0.08)} className="dt6-stat">
                  <p className="dt6-stat-val"><Counter target={s.value} /></p>
                  <p className="dt6-stat-lbl">{s.label}</p>
                </motion.div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ══ WHY CHOOSE US ══ */}
        <section className="dt6-section dt6-why">
          <div className="dt6-wrap">
            <div className="dt6-why-layout">
              <div>
                <Reveal dir="left"><Label>Why Verdant Health</Label></Reveal>
                <Reveal dir="left" delay={0.06}>
                  <h2 className="dt6-h2" style={{ color: "var(--forest)", marginBottom: 20 }}>
                    A Different <em className="dt6-em">Standard</em><br />of Care
                  </h2>
                </Reveal>
                <Reveal dir="left" delay={0.1}>
                  <p style={{ color: "var(--stone)", fontSize: 15, lineHeight: 1.8, marginBottom: 28 }}>
                    We set ourselves apart through our commitment to treating every patient as an individual — with the time, attention, and expertise they deserve.
                  </p>
                  <a href="#contact" className="dt6-btn dt6-btn-primary">Find Out More →</a>
                </Reveal>
              </div>
              <Stagger className="dt6-why-grid">
                {displayWhyChoose.map((f, i) => (
                  <motion.div key={i} variants={fadeUp(i * 0.08)} className="dt6-why-card">
                    <span className="dt6-why-icon">{f.icon || "✦"}</span>
                    <h3 className="dt6-why-title">{f.title || f.featureTitle}</h3>
                    <p className="dt6-why-desc">{f.description || f.featureDescription}</p>
                  </motion.div>
                ))}
              </Stagger>
            </div>
          </div>
        </section>

        {/* ══ DOCTORS SLIDER ══ */}
        <section id="doctors" className="dt6-docs">
          <div className="dt6-wrap">
            <div className="dt6-docs-header">
              <div>
                <Reveal><Label>Our Team</Label></Reveal>
                <Reveal delay={0.06}>
                  <h2 className="dt6-h2" style={{ color: "var(--forest)" }}>
                    Meet Our <em className="dt6-em">Specialists</em>
                  </h2>
                </Reveal>
              </div>
              <Reveal dir="right">
                <a href="#contact" className="dt6-btn dt6-btn-outline dt6-btn-sm">View All →</a>
              </Reveal>
            </div>
            <Reveal delay={0.08}>
              <DoctorSlider items={displayTeam} />
            </Reveal>
          </div>
        </section>

        {/* ══ TESTIMONIALS ══ */}
        <section className="dt6-section dt6-testimonials">
          <div className="dt6-test-mesh" />
          <div className="dt6-wrap">
            <div className="dt6-test-layout">
              <div>
                <Reveal dir="left"><Label light>Patient Stories</Label></Reveal>
                <Reveal dir="left" delay={0.06}>
                  <h2 className="dt6-h2" style={{ color: "#fff", marginBottom: 16 }}>
                    Voices That <em style={{ fontStyle: "italic", color: "var(--mint)" }}>Matter</em>
                  </h2>
                </Reveal>
                <Reveal dir="left" delay={0.1}>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, lineHeight: 1.8, marginBottom: 28 }}>
                    Every review reflects a real relationship built on trust, transparency, and genuine care.
                  </p>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    {["Google 4.9★", "NHS Partners", "BUPA Accredited"].map((badge) => (
                      <span key={badge} style={{ background: "rgba(82,183,136,0.12)", border: "1px solid rgba(82,183,136,0.25)", borderRadius: 100, padding: "6px 14px", fontSize: 12, fontWeight: 600, color: "var(--mint)", letterSpacing: "0.08em" }}>{badge}</span>
                    ))}
                  </div>
                </Reveal>
              </div>
              <Reveal dir="right" delay={0.1}>
                <TestimonialCarousel items={displayTestimonials} />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══ SCHEDULE + EMERGENCY ══ */}
        <section className="dt6-section dt6-schedule">
          <div className="dt6-wrap">
            <div className="dt6-schedule-grid">
              <div>
                <Reveal dir="left"><Label>Opening Hours</Label></Reveal>
                <Reveal dir="left" delay={0.06}>
                  <h2 className="dt6-h2" style={{ color: "var(--forest)", marginBottom: 16 }}>
                    When We're <em className="dt6-em">Open</em>
                  </h2>
                </Reveal>
                <Reveal dir="left" delay={0.1}>
                  <p style={{ color: "var(--stone)", fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>
                    Walk-in and reserved slots available across all days. Same-day appointments for urgent needs.
                  </p>
                  <div className="dt6-schedule-list">
                    {displaySchedule.map((row, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="dt6-schedule-row"
                      >
                        <span className="dt6-schedule-day">{row.day}</span>
                        <span className="dt6-schedule-time">{row.open || row.openingTime} – {row.close || row.closingTime}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <a href="#contact" className="dt6-btn dt6-btn-primary">Reserve a Slot →</a>
                  </div>
                </Reveal>
              </div>

              <Reveal dir="right" delay={0.1}>
                <div>
                  <div className="dt6-emergency-card">
                    <span className="dt6-emergency-icon">🚨</span>
                    <h3 className="dt6-emergency-title">24/7 Emergency Care</h3>
                    <p className="dt6-emergency-sub">{emergencyAvailability || "Our senior clinicians are always on call. Day, night, or holiday — we are here when it matters most."}</p>
                    <a href={`tel:${displayEmergency}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 100, padding: "13px 24px", color: "#fff", fontWeight: 700, fontSize: 14, textDecoration: "none", transition: "all 0.2s" }}>
                      Call {displayEmergency}
                    </a>
                    {ambulanceNumber && (
                      <p style={{ marginTop: 12, fontSize: 13, opacity: 0.7 }}>Ambulance: {ambulanceNumber}</p>
                    )}
                  </div>
                  <div style={{ marginTop: 20, background: "var(--warm-white)", border: "1px solid var(--border)", borderRadius: 20, padding: "24px" }}>
                    <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--sage)", marginBottom: 10 }}>Quick Access</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {[
                        { icon: "📞", label: "Call us", val: displayPhone },
                        { icon: "✉️", label: "Email", val: displayEmail },
                        { icon: "📍", label: "Address", val: displayAddress },
                      ].map((item) => (
                        <div key={item.label} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                          <span style={{ fontSize: "1rem" }}>{item.icon}</span>
                          <p style={{ fontSize: 13, color: "var(--stone)", lineHeight: 1.5 }}><strong style={{ color: "var(--charcoal)" }}>{item.label}:</strong> {item.val}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══ FAQ ══ */}
        <section className="dt6-section dt6-faq">
          <div className="dt6-wrap">
            <div className="dt6-faq-layout">
              <div>
                <Reveal dir="left"><Label>FAQ</Label></Reveal>
                <Reveal dir="left" delay={0.06}>
                  <h2 className="dt6-h2" style={{ color: "var(--forest)", marginBottom: 16 }}>
                    Common <em className="dt6-em">Questions</em>
                  </h2>
                </Reveal>
                <Reveal dir="left" delay={0.1}>
                  <p style={{ color: "var(--stone)", fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>
                    Answers to everything you need before your first visit. Still have a question?
                  </p>
                  <a href={`tel:${displayPhone}`} className="dt6-btn dt6-btn-primary">📞 Call Our Team</a>
                </Reveal>
              </div>
              <Stagger>
                {displayFaqs.map((faq, i) => (
                  <FaqItem key={i} q={faq.question} a={faq.answer} idx={i} />
                ))}
              </Stagger>
            </div>
          </div>
        </section>

        {/* ══ CTA STRIP ══ */}
        <div className="dt6-cta-strip">
          <div className="dt6-cta-strip-inner">
            <div>
              <p className="dt6-cta-strip-text">Ready to take the first step?</p>
              <p className="dt6-cta-strip-sub">Same-day appointments available. No referral needed.</p>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="#contact" className="dt6-btn" style={{ background: "var(--forest)", color: "#fff" }}>Book Appointment</a>
              <a href={`tel:${displayPhone}`} className="dt6-btn" style={{ background: "rgba(26,58,46,0.12)", color: "var(--forest)", border: "1.5px solid var(--forest)" }}>{displayPhone}</a>
            </div>
          </div>
        </div>

        {/* ══ INSURANCE ══ */}
        <section className="dt6-section dt6-insurance">
          <div className="dt6-wrap">
            <div style={{ textAlign: "center" }}>
              <Reveal><Label>Trusted Partners</Label></Reveal>
              <Reveal delay={0.06}>
                <h2 className="dt6-h2" style={{ color: "var(--forest)" }}>
                  Accepted <em className="dt6-em">Insurance</em>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="dt6-ins-row">
                  {displayInsurance.map((ins, i) => (
                    <motion.div key={i} variants={scaleUp(i * 0.05)} className="dt6-ins-chip">
                      {ins.logo ? (
                        <div style={{ position: "relative", width: 48, height: 20 }}>
                          <Image src={ins.logo} alt={ins.name} fill className="object-contain" />
                        </div>
                      ) : <span>🏢</span>}
                      {ins.name}
                    </motion.div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══ BLOG ══ */}
        {enableBlog !== false && (
          <section className="dt6-section dt6-blog">
            <div className="dt6-wrap">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 0 }}>
                <div>
                  <Reveal dir="left"><Label>{blogSubtitle || "Health Insights"}</Label></Reveal>
                  <Reveal dir="left" delay={0.06}>
                    <h2 className="dt6-h2" style={{ color: "var(--forest)" }}>{blogSectionTitle || <>From Our <em className="dt6-em">Experts</em></>}</h2>
                  </Reveal>
                </div>
                <Reveal dir="right">
                  <a href="#" style={{ fontSize: 13, fontWeight: 600, color: "var(--emerald)", textDecoration: "none", borderBottom: "1.5px solid rgba(45,106,79,0.3)", paddingBottom: 2 }}>All articles →</a>
                </Reveal>
              </div>
              <Stagger className="dt6-blog-grid">
                {[
                  { tag: "Heart Health", emoji: "❤️", bg: "#fff1f1", title: "10 Habits for a Stronger Heart", excerpt: "Small, sustainable daily changes that dramatically reduce your cardiovascular risk over time.", date: "May 2025" },
                  { tag: "Nutrition", emoji: "🥗", bg: "#f1faf4", title: "Anti-Inflammatory Foods to Eat Daily", excerpt: "How your plate can become your most powerful medicine against chronic disease.", date: "Apr 2025" },
                  { tag: "Mind & Body", emoji: "🧘", bg: "#f4f1ff", title: "Managing Stress in the Modern World", excerpt: "Evidence-based strategies for maintaining balance when everything feels overwhelming.", date: "Mar 2025" },
                ].map((post, i) => (
                  <motion.article key={i} variants={fadeUp(i * 0.1)} className="dt6-blog-card">
                    <div className="dt6-blog-thumb" style={{ background: post.bg }}>
                      <span>{post.emoji}</span>
                    </div>
                    <div className="dt6-blog-body">
                      <p className="dt6-blog-tag">{post.tag}</p>
                      <h3 className="dt6-blog-title">{post.title}</h3>
                      <p className="dt6-blog-excerpt">{post.excerpt}</p>
                      <p className="dt6-blog-date"><span>🗓</span>{post.date}</p>
                    </div>
                  </motion.article>
                ))}
              </Stagger>
            </div>
          </section>
        )}

        {/* ══ CONTACT ══ */}
        <section id="contact" className="dt6-section dt6-contact">
          <div className="dt6-contact-blob" />
          <div className="dt6-wrap">
            <div style={{ textAlign: "center", marginBottom: 48, position: "relative", zIndex: 1 }}>
              <Reveal><Label light>Get In Touch</Label></Reveal>
              <Reveal delay={0.06}>
                <h2 className="dt6-h2" style={{ color: "#fff" }}>
                  Contact &amp; <em style={{ fontStyle: "italic", color: "var(--mint)" }}>Location</em>
                </h2>
              </Reveal>
            </div>
            <div className="dt6-contact-grid">
              <Stagger className="dt6-contact-cards">
                {[
                  { icon: "📍", label: "Address", val: displayAddress },
                  { icon: "📞", label: "Phone", val: displayPhone },
                  { icon: "✉️", label: "Email", val: displayEmail },
                  ...(whatsappNumber ? [{ icon: "💬", label: "WhatsApp", val: whatsappNumber }] : []),
                  ...(ambulanceNumber ? [{ icon: "🚑", label: "Ambulance", val: ambulanceNumber }] : []),
                ].map((item, i) => (
                  <motion.div key={i} variants={slideLeft(i * 0.08)} className="dt6-contact-card">
                    <div className="dt6-contact-card-icon">{item.icon}</div>
                    <div style={{ wordBreak: "break-word" }}>
                      <p className="dt6-contact-card-lbl">{item.label}</p>
                      <p className="dt6-contact-card-val">{item.val}</p>
                    </div>
                  </motion.div>
                ))}
                {whatsappNumber && (
                  <Reveal>
                    <a
                      href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
                      target="_blank" rel="noopener noreferrer"
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#25d366", color: "#fff", borderRadius: 14, padding: "14px", fontWeight: 700, fontSize: 14, textDecoration: "none", transition: "background 0.2s" }}
                    >
                      💬 Chat on WhatsApp
                    </a>
                  </Reveal>
                )}
              </Stagger>

              <Reveal dir="right">
                <div className="dt6-map-wrap">
                  {googleMapsEmbed ? (
                    <iframe src={googleMapsEmbed} style={{ width: "100%", height: "100%", minHeight: 360, border: "none" }} allowFullScreen loading="lazy" title="Map" />
                  ) : (
                    <div className="dt6-map-ph">
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
        <footer className="dt6-footer">
          <div className="dt6-footer-top">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 32, height: 32, background: "var(--emerald)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>🌿</div>
                <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.25rem", color: "#fff" }}>{displayName}</span>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.8, maxWidth: 260, marginBottom: 4 }}>
                Exceptional medical care delivered with precision, empathy, and respect for every individual.
              </p>
              <div className="dt6-social-row">
                {["f", "𝕏", "📷", "in"].map((s, i) => (
                  <a key={i} href={socialLinks?.[["facebook", "twitter", "instagram", "linkedin"][i]] || "#"} className="dt6-social-btn">{s}</a>
                ))}
              </div>
            </div>
            <div>
              <p className="dt6-footer-heading">Navigate</p>
              {navLinks.map(({ href, label }) => (
                <a key={href} href={href} className="dt6-footer-link">{label}</a>
              ))}
            </div>
            <div>
              <p className="dt6-footer-heading">Services</p>
              {displayServices.slice(0, 5).map((s, i) => (
                <a key={i} href="#services" className="dt6-footer-link">{s.title || s.name}</a>
              ))}
            </div>
            <div>
              <p className="dt6-footer-heading">Contact</p>
              {[["📍", displayAddress], ["📞", displayPhone], ["✉", displayEmail]].map(([icon, val]) => (
                <p key={icon} style={{ display: "flex", gap: 8, fontSize: 13, marginBottom: 8, alignItems: "flex-start" }}>
                  <span style={{ flexShrink: 0 }}>{icon}</span><span style={{ lineHeight: 1.5, wordBreak: "break-word" }}>{val}</span>
                </p>
              ))}
              {emergencyAvailability && (
                <p style={{ fontSize: 12, color: "var(--sage)", marginTop: 6, display: "flex", gap: 6, alignItems: "flex-start" }}>
                  <span>🚨</span><span>{emergencyAvailability}</span>
                </p>
              )}
            </div>
          </div>

          {footerDisclaimer && (
            <div className="dt6-footer-disclaimer">
              <strong style={{ color: "var(--sage)" }}>Medical Disclaimer: </strong>
              {footerDisclaimer}
            </div>
          )}

          <hr className="dt6-footer-hr" />
          <div className="dt6-footer-bottom">
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