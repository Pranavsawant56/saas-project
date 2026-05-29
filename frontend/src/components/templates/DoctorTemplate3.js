"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

/* ═══════════════════════════════════════
   COLOUR PALETTE
   • Forest Green  #1a3d2b  (primary dark)
   • Sage Green    #4a7c5e  (mid)
   • Cream         #f5f0e8  (background)
   • Warm White    #fdfcf9  (cards)
   • Coral         #e8634a  (accent)
   • Slate         #2d3748  (text)
   • Muted Sage    #8fb39a  (dividers/subtle)
═══════════════════════════════════════ */

/* ─── Motion Variants ─── */
const fromLeft = (delay = 0) => ({
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] } },
});
const fromRight = (delay = 0) => ({
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] } },
});
const fromBottom = (delay = 0) => ({
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] } },
});
const popIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay, ease: [0.34, 1.56, 0.64, 1] } },
});

/* ─── Reveal Wrapper ─── */
function Reveal({ children, className = "", dir = "bottom", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const variants = dir === "left" ? fromLeft(delay) : dir === "right" ? fromRight(delay) : fromBottom(delay);
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={variants} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Stagger Group ─── */
function Stagger({ children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"}
      variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Coral Tag ─── */
function Tag({ children }) {
  return (
    <span className="dt3-tag">{children}</span>
  );
}

/* ─── Section Eyebrow ─── */
function Eyebrow({ children, light = false }) {
  return (
    <div className="dt3-eyebrow-wrap">
      <span className={`dt3-eyebrow ${light ? "dt3-eyebrow-light" : ""}`}>{children}</span>
      <div className={`dt3-eyebrow-line ${light ? "dt3-eyebrow-line-light" : ""}`} />
    </div>
  );
}

/* ─── Heading ─── */
function Heading({ children, light = false, size = "xl", className = "" }) {
  const cls = `dt3-heading dt3-heading-${size} ${light ? "dt3-heading-light" : ""} ${className}`;
  return <h2 className={cls}>{children}</h2>;
}

/* ─── Stars ─── */
function Stars({ n = 5 }) {
  return (
    <div className="dt3-stars">
      {[...Array(5)].map((_, i) => (
        <span key={i} style={{ color: i < n ? "#e8634a" : "#ccc" }}>★</span>
      ))}
    </div>
  );
}

/* ─── Accordion FAQ ─── */
function FaqItem({ q, a, i }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div variants={fromBottom(i * 0.07)} className="dt3-faq-item">
      <button className="dt3-faq-btn" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }} className="dt3-faq-icon">+</motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="dt3-faq-answer">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Testimonial Carousel ─── */
function TestimonialCarousel({ items }) {
  const [cur, setCur] = useState(0);
  const [dir, setDir] = useState(1);
  const len = items.length;

  const go = useCallback((next) => {
    setDir(next > cur ? 1 : -1);
    setCur((next + len) % len);
  }, [cur, len]);

  useEffect(() => {
    const t = setInterval(() => go((cur + 1) % len), 5000);
    return () => clearInterval(t);
  }, [cur, len, go]);

  const variants = {
    enter: (d) => ({ opacity: 0, x: d * 80 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
    exit: (d) => ({ opacity: 0, x: -d * 60, transition: { duration: 0.35 } }),
  };

  return (
    <div className="dt3-carousel">
      <div className="dt3-carousel-track" style={{ minHeight: 280 }}>
        <AnimatePresence custom={dir} mode="wait">
          <motion.div
            key={cur} custom={dir} variants={variants}
            initial="enter" animate="center" exit="exit"
            className="dt3-testimonial-card"
          >
            <div className="dt3-quote-mark">"</div>
            <p className="dt3-testimonial-text">{items[cur].review || items[cur].text}</p>
            <div className="dt3-testimonial-footer">
              <div className="dt3-avatar">
                {items[cur].image ? (
                  <Image src={items[cur].image} alt={items[cur].name} fill className="object-cover" />
                ) : (
                  <span>{(items[cur].name || "P")[0]}</span>
                )}
              </div>
              <div>
                <Stars n={items[cur].rating || 5} />
                <p className="dt3-reviewer-name">{items[cur].name || items[cur].patientName}</p>
                <p className="dt3-reviewer-tag">Verified Patient</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Controls */}
      <div className="dt3-carousel-controls">
        <button onClick={() => go(cur - 1)} className="dt3-carousel-btn" aria-label="Previous">‹</button>
        <div className="dt3-carousel-dots">
          {items.map((_, i) => (
            <button key={i} onClick={() => go(i)} className={`dt3-dot ${i === cur ? "dt3-dot-active" : ""}`} />
          ))}
        </div>
        <button onClick={() => go(cur + 1)} className="dt3-carousel-btn" aria-label="Next">›</button>
      </div>
    </div>
  );
}

/* ─── Services Carousel (horizontal scroll on mobile) ─── */
function ServicesCarousel({ items }) {
  const [cur, setCur] = useState(0);
  const cols = typeof window !== "undefined" && window.innerWidth >= 1024 ? 3 : typeof window !== "undefined" && window.innerWidth >= 640 ? 2 : 1;

  return (
    <div className="dt3-services-carousel">
      <Stagger className="dt3-services-grid">
        {items.map((svc, i) => (
          <motion.div key={i} variants={popIn(i * 0.07)} className="dt3-service-card">
            <div className="dt3-service-icon-wrap">
              {svc.image ? (
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image src={svc.image} alt={svc.title || svc.name} fill className="object-cover" />
                </div>
              ) : (
                <span className="dt3-service-icon">{svc.icon || "🩺"}</span>
              )}
            </div>
            <div className="dt3-service-num">0{i + 1}</div>
            <h3 className="dt3-service-title">{svc.title || svc.name}</h3>
            <p className="dt3-service-desc">{svc.description || svc.desc || "Expert personalised care."}</p>
            <div className="dt3-service-link">Learn more →</div>
          </motion.div>
        ))}
      </Stagger>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN TEMPLATE
══════════════════════════════════════ */
export default function DoctorTemplate3({ data }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* ── Destructure data ── */
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
  const displayEmail = contactEmail || "hello@healclinic.com";
  const displayAddress = address || "456 Wellness Ave, New York";
  const displayName = clinicName || "HealClinic";
  const displayEmergency = emergencyContact || displayPhone;

  const defaultServices = [
    { icon: "🫀", title: "Cardiology", description: "Advanced heart monitoring, diagnostics, and personalised treatment with cutting-edge technology." },
    { icon: "🧠", title: "Neurology", description: "Expert care for neurological disorders using the latest imaging and treatment modalities." },
    { icon: "🦴", title: "Orthopedics", description: "Comprehensive bone, joint, and muscle treatments for every stage of life." },
    { icon: "👶", title: "Pediatrics", description: "Gentle, specialised care for children from birth through adolescence." },
    { icon: "👁️", title: "Ophthalmology", description: "Complete vision care from routine exams to advanced surgical procedures." },
    { icon: "🦷", title: "Dental Care", description: "Modern dentistry for a healthy, radiant smile you'll love to share." },
  ];
  const displayServices = services?.length ? services : defaultServices;

  const defaultWhyChoose = [
    { icon: "🏅", title: "Board-Certified", description: "All specialists are nationally certified with extensive clinical experience." },
    { icon: "🔬", title: "Advanced Tech", description: "State-of-the-art equipment for precise diagnosis and effective treatment." },
    { icon: "⏰", title: "24/7 Emergency", description: "Round-the-clock emergency care so you're never without support." },
    { icon: "💊", title: "Personalised Plans", description: "Treatment plans tailored uniquely to your health profile and goals." },
  ];
  const displayWhyChoose = whyChooseUs?.length ? whyChooseUs : defaultWhyChoose;

  const defaultSchedule = [
    { day: "Monday – Friday", open: "8:00 AM", close: "8:00 PM" },
    { day: "Saturday", open: "9:00 AM", close: "5:00 PM" },
    { day: "Sunday", open: "10:00 AM", close: "2:00 PM" },
  ];
  const displaySchedule = schedule?.length ? schedule : defaultSchedule;

  const defaultStats = [
    { value: "20+", label: "Years of Experience" },
    { value: "12K+", label: "Patients Treated" },
    { value: "99%", label: "Satisfaction Rate" },
    { value: "60+", label: "Medical Specialists" },
  ];
  const displayStats = stats?.length ? stats : defaultStats;

  const defaultTestimonials = [
    { name: "Emma Collins", review: "Absolutely exceptional care from start to finish. The doctors listened, diagnosed accurately, and followed up thoroughly. I finally feel like my health is in good hands.", rating: 5 },
    { name: "Rajesh Nair", review: "World-class facilities and the warmest team I've ever encountered. They made a stressful situation feel manageable.", rating: 5 },
    { name: "Sophie Laurent", review: "From the reception to the consultation room, every interaction was professional and kind. Highly recommend this clinic to anyone.", rating: 5 },
    { name: "Daniel Okafor", review: "The specialist really took time to understand my history. Treatment was spot-on and recovery was faster than expected.", rating: 5 },
  ];
  const displayTestimonials = testimonials?.length ? testimonials : defaultTestimonials;

  const defaultTeam = [
    { name: "Dr. Priya Anand", specialization: "Cardiology", experience: "14 Years", image: null },
    { name: "Dr. Marcus Webb", specialization: "Neurology", experience: "11 Years", image: null },
    { name: "Dr. Leila Hassan", specialization: "Pediatrics", experience: "8 Years", image: null },
    { name: "Dr. James Osei", specialization: "Orthopedics", experience: "10 Years", image: null },
  ];
  const displayTeam = teamDoctors?.length ? teamDoctors : defaultTeam;

  const defaultFaqs = [
    { question: "How can I schedule an appointment?", answer: "You can book via our website, call our helpline, or walk in during clinic hours. Online booking is available 24/7." },
    { question: "Which insurance plans do you accept?", answer: "We accept most major plans including BlueCross, Aetna, Cigna, and UnitedHealth. Contact us to verify your coverage." },
    { question: "What should I bring for my first visit?", answer: "Please carry a valid ID, your insurance card, previous medical records, and a list of current medications." },
    { question: "Is emergency care available after hours?", answer: "Yes — our emergency line is active 24/7. Reach us anytime at the number listed on our contact page." },
  ];
  const displayFaqs = faqs?.length ? faqs : defaultFaqs;

  const defaultInsurance = [
    { name: "BlueCross" }, { name: "Aetna" }, { name: "Cigna" },
    { name: "UnitedHealth" }, { name: "Humana" }, { name: "Medicare" },
  ];
  const displayInsurance = insurancePartners?.length ? insurancePartners : defaultInsurance;

  const defaultGallery = [
    { caption: "Reception Lounge" }, { caption: "Consultation Suite" },
    { caption: "Diagnostic Lab" }, { caption: "Recovery Ward" },
    { caption: "Pharmacy" }, { caption: "Waiting Area" },
  ];
  const displayGallery = gallery?.length ? gallery : defaultGallery;

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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ── Root Variables ── */
        :root {
          --green-dark: #1a3d2b;
          --green-mid: #4a7c5e;
          --green-sage: #8fb39a;
          --green-light: #e8f3ec;
          --cream: #f5f0e8;
          --cream-warm: #fdfcf9;
          --coral: #e8634a;
          --coral-light: #fdf0ed;
          --coral-dark: #c44a32;
          --slate: #2d3748;
          --slate-mid: #4a5568;
          --slate-light: #718096;
          --border: #ddd8d0;
        }

        /* ── Base ── */
        .dt3 { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--slate); scroll-behavior: smooth; overflow-x: hidden; }
        .dt3-serif { font-family: 'Playfair Display', Georgia, serif; }

        /* ── Eyebrow ── */
        .dt3-eyebrow-wrap { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
        .dt3-eyebrow { font-size: 11px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: var(--coral); white-space: nowrap; }
        .dt3-eyebrow-light { color: #f9b5a5; }
        .dt3-eyebrow-line { flex: 1; height: 1px; background: var(--coral); opacity: 0.35; max-width: 60px; }
        .dt3-eyebrow-line-light { background: #f9b5a5; }

        /* ── Headings ── */
        .dt3-heading { font-family: 'Playfair Display', serif; font-weight: 700; line-height: 1.1; color: var(--slate); }
        .dt3-heading-light { color: #fff; }
        .dt3-heading-xl { font-size: clamp(2rem, 5vw, 3.5rem); margin-bottom: 1.25rem; }
        .dt3-heading-lg { font-size: clamp(1.75rem, 4vw, 2.75rem); margin-bottom: 1rem; }
        .dt3-heading-md { font-size: clamp(1.4rem, 3vw, 2rem); margin-bottom: 0.8rem; }

        /* ── Tag / Badge ── */
        .dt3-tag { display: inline-flex; align-items: center; background: var(--coral-light); color: var(--coral-dark); font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; padding: 5px 14px; border-radius: 100px; border: 1px solid #f9c4b8; }

        /* ── Buttons ── */
        .dt3-btn-primary { display: inline-flex; align-items: center; gap: 8px; background: var(--coral); color: #fff; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 14px; text-decoration: none; transition: background 0.25s, transform 0.2s; border: none; cursor: pointer; }
        .dt3-btn-primary:hover { background: var(--coral-dark); transform: translateY(-2px); }
        .dt3-btn-outline { display: inline-flex; align-items: center; gap: 8px; background: transparent; color: #fff; padding: 13px 28px; border-radius: 8px; font-weight: 600; font-size: 14px; text-decoration: none; border: 1.5px solid rgba(255,255,255,0.4); transition: border-color 0.25s, background 0.25s; }
        .dt3-btn-outline:hover { border-color: rgba(255,255,255,0.8); background: rgba(255,255,255,0.08); }
        .dt3-btn-green { display: inline-flex; align-items: center; gap: 8px; background: var(--green-dark); color: #fff; padding: 13px 28px; border-radius: 8px; font-weight: 600; font-size: 14px; text-decoration: none; transition: background 0.25s; border: none; cursor: pointer; }
        .dt3-btn-green:hover { background: var(--green-mid); }

        /* ── Navbar ── */
        .dt3-nav { position: sticky; top: 0; z-index: 50; transition: all 0.3s; }
        .dt3-nav-scrolled { background: rgba(253,252,249,0.96); backdrop-filter: blur(16px); box-shadow: 0 2px 20px rgba(26,61,43,0.08); border-bottom: 1px solid var(--border); }
        .dt3-nav-default { background: rgba(253,252,249,0.85); backdrop-filter: blur(8px); border-bottom: 1px solid var(--border); }
        .dt3-nav-inner { max-width: 1280px; margin: 0 auto; padding: 14px 20px; display: flex; justify-content: space-between; align-items: center; }
        .dt3-logo-text { font-family: 'Playfair Display', serif; font-weight: 700; color: var(--green-dark); font-size: clamp(1.1rem, 2.5vw, 1.35rem); }
        .dt3-logo-sub { font-size: 9px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--coral); display: block; line-height: 1; }
        .dt3-nav-links { display: none; align-items: center; gap: 28px; }
        @media (min-width: 1024px) { .dt3-nav-links { display: flex; } }
        .dt3-nav-link { font-size: 14px; font-weight: 500; color: var(--slate-mid); text-decoration: none; transition: color 0.2s; }
        .dt3-nav-link:hover { color: var(--green-dark); }
        .dt3-hamburger { display: flex; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 6px; }
        @media (min-width: 1024px) { .dt3-hamburger { display: none; } }
        .dt3-ham-bar { width: 22px; height: 2px; background: var(--slate); border-radius: 2px; transition: all 0.2s; }

        /* ── Mobile Menu ── */
        .dt3-mobile-menu { background: var(--cream-warm); border-top: 1px solid var(--border); }
        @media (min-width: 1024px) { .dt3-mobile-menu { display: none !important; } }
        .dt3-mobile-menu-inner { padding: 16px 20px; display: flex; flex-direction: column; gap: 4px; }
        .dt3-mobile-link { font-size: 15px; font-weight: 500; color: var(--slate); text-decoration: none; padding: 10px 0; border-bottom: 1px solid var(--border); display: block; }

        /* ── Topbar ── */
        .dt3-topbar { background: var(--green-dark); color: rgba(255,255,255,0.8); font-size: 12px; font-weight: 500; padding: 9px 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px; }
        .dt3-topbar-item { display: flex; align-items: center; gap: 6px; }
        .dt3-topbar-dot { width: 4px; height: 4px; background: var(--coral); border-radius: 50%; flex-shrink: 0; }

        /* ── Hero ── */
        .dt3-hero { position: relative; min-height: 94vh; display: flex; align-items: center; background: var(--green-dark); overflow: hidden; }
        .dt3-hero-bg { position: absolute; inset: 0; }
        .dt3-hero-pattern { position: absolute; inset: 0; background-image: radial-gradient(circle at 20% 50%, rgba(74,124,94,0.25) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(232,99,74,0.12) 0%, transparent 50%); pointer-events: none; }
        .dt3-hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 48px 48px; pointer-events: none; }
        .dt3-hero-inner { max-width: 1280px; margin: 0 auto; padding: 80px 20px; width: 100%; position: relative; z-index: 2; display: grid; grid-template-columns: 1fr; gap: 40px; align-items: center; }
        @media (min-width: 1024px) { .dt3-hero-inner { grid-template-columns: 1fr 1fr; padding: 100px 40px; } }
        .dt3-hero-content {}
        .dt3-hero-tag { margin-bottom: 20px; }
        .dt3-hero-title { font-family: 'Playfair Display', serif; font-size: clamp(2.4rem, 7vw, 5rem); font-weight: 700; color: #fff; line-height: 1.05; margin-bottom: 12px; }
        .dt3-hero-title em { font-style: italic; color: #f9b5a5; }
        .dt3-hero-divider { width: 48px; height: 2px; background: var(--coral); margin-bottom: 20px; }
        .dt3-hero-subtitle { color: rgba(255,255,255,0.65); font-size: 15px; line-height: 1.75; max-width: 480px; margin-bottom: 32px; }
        .dt3-hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 48px; }
        .dt3-hero-mini-stats { display: flex; flex-wrap: wrap; gap: 24px; border-top: 1px solid rgba(255,255,255,0.12); padding-top: 28px; }
        .dt3-hero-stat-val { font-family: 'Playfair Display', serif; font-size: 1.75rem; font-weight: 700; color: #f9b5a5; line-height: 1; }
        .dt3-hero-stat-label { font-size: 11px; color: rgba(255,255,255,0.5); margin-top: 4px; }
        /* Hero image panel */
        .dt3-hero-img-panel { display: none; position: relative; }
        @media (min-width: 1024px) { .dt3-hero-img-panel { display: block; } }
        .dt3-hero-img-frame { position: relative; border-radius: 20px 20px 120px 20px; overflow: hidden; aspect-ratio: 4/5; border: 3px solid rgba(255,255,255,0.08); }
        .dt3-hero-img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(26,61,43,0.4) 0%, transparent 60%); }
        .dt3-hero-badge { position: absolute; bottom: -16px; left: -16px; background: var(--coral); color: #fff; border-radius: 16px; padding: 16px 22px; border: 3px solid var(--green-dark); }
        .dt3-hero-badge-val { font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 700; line-height: 1; }
        .dt3-hero-badge-label { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; opacity: 0.85; }
        /* Hero: mobile bg */
        .dt3-hero-mobile-bg { position: absolute; inset: 0; background-size: cover; background-position: center; }
        .dt3-hero-mobile-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(26,61,43,0.95) 40%, rgba(26,61,43,0.7) 100%); }
        @media (min-width: 1024px) { .dt3-hero-mobile-bg, .dt3-hero-mobile-overlay { display: none; } }

        /* ── Trust Strip ── */
        .dt3-trust { background: var(--cream-warm); border-bottom: 1px solid var(--border); }
        .dt3-trust-inner { max-width: 1280px; margin: 0 auto; padding: 24px 20px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: var(--border); }
        @media (min-width: 640px) { .dt3-trust-inner { grid-template-columns: repeat(4, 1fr); } }
        .dt3-trust-cell { background: var(--cream-warm); padding: 20px; text-align: center; }
        .dt3-trust-icon { font-size: 1.5rem; margin-bottom: 8px; }
        .dt3-trust-title { font-weight: 600; font-size: 13px; color: var(--slate); margin-bottom: 3px; }
        .dt3-trust-sub { font-size: 11px; color: var(--slate-light); }

        /* ── Section Padding ── */
        .dt3-section { padding: 80px 20px; }
        @media (min-width: 768px) { .dt3-section { padding: 100px 40px; } }
        .dt3-section-inner { max-width: 1280px; margin: 0 auto; }

        /* ── About ── */
        .dt3-about-grid { display: grid; grid-template-columns: 1fr; gap: 48px; align-items: center; }
        @media (min-width: 1024px) { .dt3-about-grid { grid-template-columns: 5fr 7fr; gap: 80px; } }
        .dt3-about-img-wrap { position: relative; max-width: 420px; margin: 0 auto; }
        .dt3-about-img-bg { position: absolute; bottom: -20px; right: -20px; width: 100%; height: 100%; background: var(--green-light); border-radius: 20px; display: none; }
        @media (min-width: 480px) { .dt3-about-img-bg { display: block; } }
        .dt3-about-img { position: relative; border-radius: 20px; overflow: hidden; aspect-ratio: 3/4; border: 4px solid var(--cream-warm); box-shadow: 0 24px 64px rgba(26,61,43,0.18); }
        .dt3-about-exp-badge { position: absolute; top: -16px; right: -16px; background: var(--green-dark); color: #fff; border-radius: 14px; padding: 14px 20px; text-align: center; z-index: 1; }
        .dt3-about-exp-val { font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 700; color: #f9b5a5; line-height: 1; }
        .dt3-about-exp-label { font-size: 9px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.6); margin-top: 2px; }
        .dt3-info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin: 24px 0; }
        .dt3-info-cell { background: var(--cream); border: 1px solid var(--border); border-radius: 12px; padding: 14px; display: flex; align-items: flex-start; gap: 10px; transition: border-color 0.2s; }
        .dt3-info-cell:hover { border-color: var(--green-sage); }
        .dt3-info-icon { font-size: 1.1rem; flex-shrink: 0; margin-top: 2px; }
        .dt3-info-label { font-size: 9px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--coral); margin-bottom: 2px; }
        .dt3-info-val { font-size: 12px; font-weight: 600; color: var(--slate); }

        /* ── Services ── */
        .dt3-services-bg { background: var(--green-dark); }
        .dt3-services-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
        @media (min-width: 640px) { .dt3-services-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .dt3-services-grid { grid-template-columns: repeat(3, 1fr); } }
        .dt3-service-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 28px; position: relative; overflow: hidden; transition: background 0.3s, border-color 0.3s, transform 0.3s; cursor: pointer; }
        .dt3-service-card:hover { background: rgba(255,255,255,0.09); border-color: rgba(232,99,74,0.4); transform: translateY(-4px); }
        .dt3-service-icon-wrap { width: 52px; height: 52px; background: rgba(232,99,74,0.15); border-radius: 14px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; transition: background 0.3s; }
        .dt3-service-card:hover .dt3-service-icon-wrap { background: rgba(232,99,74,0.25); }
        .dt3-service-icon { font-size: 1.4rem; }
        .dt3-service-num { position: absolute; top: 16px; right: 18px; font-family: 'Playfair Display', serif; font-size: 2.5rem; font-weight: 700; color: rgba(255,255,255,0.04); line-height: 1; }
        .dt3-service-title { font-weight: 600; font-size: 15px; color: #fff; margin-bottom: 8px; }
        .dt3-service-desc { font-size: 13px; color: rgba(255,255,255,0.5); line-height: 1.65; }
        .dt3-service-link { margin-top: 14px; font-size: 12px; font-weight: 600; color: #f9b5a5; opacity: 0; transition: opacity 0.2s; }
        .dt3-service-card:hover .dt3-service-link { opacity: 1; }

        /* ── Why Choose ── */
        .dt3-why-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        @media (min-width: 1024px) { .dt3-why-grid { grid-template-columns: repeat(4, 1fr); } }
        .dt3-why-card { background: var(--cream-warm); border: 1px solid var(--border); border-radius: 16px; padding: 28px 22px; text-align: center; transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s; }
        .dt3-why-card:hover { border-color: var(--green-sage); transform: translateY(-4px); box-shadow: 0 16px 40px rgba(26,61,43,0.1); }
        .dt3-why-icon { font-size: 2rem; margin-bottom: 14px; }
        .dt3-why-title { font-weight: 700; font-size: 14px; color: var(--green-dark); margin-bottom: 8px; }
        .dt3-why-desc { font-size: 13px; color: var(--slate-light); line-height: 1.6; }

        /* ── Schedule ── */
        .dt3-schedule-row { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-left: 3px solid transparent; background: var(--cream-warm); transition: border-color 0.2s, background 0.2s; }
        .dt3-schedule-row:hover { border-left-color: var(--coral); background: var(--coral-light); }
        .dt3-schedule-day { font-weight: 600; font-size: 14px; color: var(--slate); }
        .dt3-schedule-time { display: flex; align-items: center; gap: 8px; font-size: 14px; }
        .dt3-schedule-open { font-weight: 700; color: var(--green-dark); }
        .dt3-schedule-sep { color: var(--border); }
        .dt3-schedule-close { color: var(--slate-light); font-weight: 500; }

        /* ── Stats Band ── */
        .dt3-stats-band { background: var(--coral); }
        .dt3-stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0; }
        @media (min-width: 768px) { .dt3-stats-grid { grid-template-columns: repeat(4, 1fr); } }
        .dt3-stat-cell { padding: 40px 24px; text-align: center; border-right: 1px solid rgba(255,255,255,0.15); border-bottom: 1px solid rgba(255,255,255,0.15); }
        .dt3-stat-cell:nth-child(2n) { border-right: none; }
        @media (min-width: 768px) { .dt3-stat-cell { border-right: 1px solid rgba(255,255,255,0.15); } .dt3-stat-cell:last-child { border-right: none; } .dt3-stat-cell { border-bottom: none; } }
        .dt3-stat-val { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 5vw, 3rem); font-weight: 700; color: #fff; line-height: 1; margin-bottom: 6px; }
        .dt3-stat-label { font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.75); text-transform: uppercase; letter-spacing: 0.12em; }

        /* ── Testimonial Carousel ── */
        .dt3-carousel { width: 100%; }
        .dt3-carousel-track { position: relative; overflow: hidden; }
        .dt3-testimonial-card { background: var(--cream-warm); border-radius: 20px; padding: 32px; border: 1px solid var(--border); }
        .dt3-quote-mark { font-family: 'Playfair Display', serif; font-size: 4rem; color: var(--green-light); line-height: 0.8; margin-bottom: 12px; }
        .dt3-testimonial-text { font-size: 15px; font-style: italic; color: var(--slate-mid); line-height: 1.75; margin-bottom: 24px; }
        .dt3-testimonial-footer { display: flex; align-items: center; gap: 12px; }
        .dt3-avatar { width: 46px; height: 46px; border-radius: 50%; background: var(--green-light); border: 2px solid var(--green-sage); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; color: var(--green-dark); overflow: hidden; position: relative; flex-shrink: 0; }
        .dt3-stars { display: flex; gap: 2px; font-size: 12px; margin-bottom: 2px; }
        .dt3-reviewer-name { font-weight: 700; font-size: 14px; color: var(--slate); }
        .dt3-reviewer-tag { font-size: 11px; color: var(--coral); font-weight: 600; }
        .dt3-carousel-controls { display: flex; align-items: center; gap: 12px; margin-top: 20px; }
        .dt3-carousel-btn { width: 38px; height: 38px; border-radius: 50%; border: 1.5px solid var(--border); background: var(--cream-warm); font-size: 18px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--slate); transition: all 0.2s; }
        .dt3-carousel-btn:hover { border-color: var(--coral); color: var(--coral); }
        .dt3-carousel-dots { display: flex; gap: 6px; flex: 1; }
        .dt3-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--border); border: none; cursor: pointer; padding: 0; transition: all 0.25s; }
        .dt3-dot-active { width: 24px; border-radius: 4px; background: var(--coral); }

        /* ── Team ── */
        .dt3-team-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        @media (min-width: 1024px) { .dt3-team-grid { grid-template-columns: repeat(4, 1fr); } }
        .dt3-team-card { background: var(--cream-warm); border-radius: 16px; overflow: hidden; border: 1px solid var(--border); transition: transform 0.3s, box-shadow 0.3s; }
        .dt3-team-card:hover { transform: translateY(-5px); box-shadow: 0 20px 48px rgba(26,61,43,0.12); }
        .dt3-team-img { height: 200px; background: var(--green-light); position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; font-size: 3rem; transition: transform 0.4s; }
        @media (min-width: 768px) { .dt3-team-img { height: 240px; } }
        .dt3-team-card:hover .dt3-team-img { transform: scale(1.04); }
        .dt3-team-bar { height: 3px; background: var(--coral); }
        .dt3-team-info { padding: 16px; }
        .dt3-team-name { font-weight: 700; font-size: 14px; color: var(--slate); margin-bottom: 2px; }
        .dt3-team-spec { font-size: 12px; color: var(--coral); font-weight: 600; margin-bottom: 4px; }
        .dt3-team-exp { font-size: 11px; color: var(--slate-light); }

        /* ── FAQ ── */
        .dt3-faq-item { border-bottom: 1px solid var(--border); }
        .dt3-faq-btn { width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 20px 0; background: none; border: none; cursor: pointer; text-align: left; }
        .dt3-faq-btn span { font-weight: 600; font-size: 15px; color: var(--slate); transition: color 0.2s; line-height: 1.4; }
        .dt3-faq-btn:hover span { color: var(--green-dark); }
        .dt3-faq-icon { width: 30px; height: 30px; min-width: 30px; border-radius: 50%; border: 1.5px solid var(--green-sage); color: var(--green-mid); display: flex; align-items: center; justify-content: center; font-size: 16px; transition: background 0.2s; }
        .dt3-faq-answer { padding: 0 0 20px; font-size: 14px; color: var(--slate-light); line-height: 1.7; }

        /* ── Insurance ── */
        .dt3-insurance-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        @media (min-width: 480px) { .dt3-insurance-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 768px) { .dt3-insurance-grid { grid-template-columns: repeat(6, 1fr); } }
        .dt3-insurance-card { background: var(--cream-warm); border: 1px solid var(--border); border-radius: 12px; padding: 18px 12px; text-align: center; font-size: 12px; font-weight: 700; color: var(--slate-mid); transition: border-color 0.2s, transform 0.2s; }
        .dt3-insurance-card:hover { border-color: var(--green-sage); transform: translateY(-2px); }

        /* ── Gallery ── */
        .dt3-gallery-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        @media (min-width: 768px) { .dt3-gallery-grid { grid-template-columns: repeat(3, 1fr); } }
        .dt3-gallery-item { position: relative; border-radius: 14px; overflow: hidden; aspect-ratio: 1; cursor: pointer; background: var(--green-light); display: flex; align-items: center; justify-content: center; font-size: 2.5rem; }
        .dt3-gallery-item-overlay { position: absolute; inset: 0; background: rgba(26,61,43,0.6); opacity: 0; transition: opacity 0.3s; display: flex; align-items: flex-end; padding: 14px; }
        .dt3-gallery-item:hover .dt3-gallery-item-overlay { opacity: 1; }
        .dt3-gallery-caption { color: #fff; font-size: 13px; font-weight: 600; }
        .dt3-gallery-item.featured { grid-column: span 2; aspect-ratio: 16/9; }
        @media (min-width: 768px) { .dt3-gallery-item.featured { grid-column: span 1; grid-row: span 2; aspect-ratio: auto; } }

        /* ── Blog ── */
        .dt3-blog-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
        @media (min-width: 640px) { .dt3-blog-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .dt3-blog-grid { grid-template-columns: repeat(3, 1fr); } }
        .dt3-blog-card { background: var(--cream-warm); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; transition: transform 0.3s, box-shadow 0.3s; cursor: pointer; }
        .dt3-blog-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(26,61,43,0.1); }
        .dt3-blog-thumb { height: 180px; display: flex; align-items: center; justify-content: center; font-size: 3rem; border-bottom: 1px solid var(--border); }
        .dt3-blog-body { padding: 20px; }
        .dt3-blog-title { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 700; color: var(--slate); margin: 10px 0 8px; line-height: 1.3; }
        .dt3-blog-excerpt { font-size: 13px; color: var(--slate-light); line-height: 1.6; margin-bottom: 12px; }
        .dt3-blog-date { font-size: 11px; color: var(--slate-light); }

        /* ── Contact ── */
        .dt3-contact-grid { display: grid; grid-template-columns: 1fr; gap: 32px; }
        @media (min-width: 1024px) { .dt3-contact-grid { grid-template-columns: 1fr 1fr; } }
        .dt3-contact-card { background: var(--cream-warm); border: 1px solid var(--border); border-radius: 16px; padding: 18px; display: flex; align-items: center; gap: 14px; transition: border-color 0.2s, background 0.2s; }
        .dt3-contact-card:hover { border-color: var(--green-sage); background: var(--green-light); }
        .dt3-contact-icon-box { width: 44px; height: 44px; background: var(--green-light); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0; }
        .dt3-contact-label { font-size: 9px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--coral); margin-bottom: 2px; }
        .dt3-contact-val { font-weight: 600; font-size: 14px; color: var(--slate); }
        .dt3-emergency-banner { background: var(--green-dark); border-radius: 16px; padding: 20px 24px; display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; }
        @media (min-width: 640px) { .dt3-emergency-banner { flex-direction: row; align-items: center; justify-content: space-between; } }
        .dt3-map-frame { border-radius: 16px; overflow: hidden; border: 1px solid var(--border); min-height: 340px; background: var(--green-light); display: flex; align-items: center; justify-content: center; }
        .dt3-map-placeholder { text-align: center; color: var(--slate-light); padding: 40px; }

        /* ── Footer ── */
        .dt3-footer { background: var(--green-dark); color: rgba(255,255,255,0.7); }
        .dt3-footer-top { max-width: 1280px; margin: 0 auto; padding: 64px 20px 40px; display: grid; grid-template-columns: 1fr; gap: 40px; }
        @media (min-width: 640px) { .dt3-footer-top { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .dt3-footer-top { grid-template-columns: 2fr 1fr 1fr 1.5fr; } }
        .dt3-footer-heading { font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--coral); margin-bottom: 16px; }
        .dt3-footer-link { display: flex; align-items: center; gap: 6px; font-size: 13px; color: rgba(255,255,255,0.55); text-decoration: none; padding: 5px 0; transition: color 0.2s; }
        .dt3-footer-link:hover { color: #f9b5a5; }
        .dt3-footer-link::before { content: '→'; font-size: 10px; opacity: 0; transition: opacity 0.2s; }
        .dt3-footer-link:hover::before { opacity: 1; }
        .dt3-footer-bottom { border-top: 1px solid rgba(255,255,255,0.08); max-width: 1280px; margin: 0 auto; padding: 20px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px; font-size: 12px; }
        .dt3-social-row { display: flex; gap: 8px; margin-top: 16px; }
        .dt3-social-btn { width: 34px; height: 34px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.12); display: flex; align-items: center; justify-content: center; font-size: 12px; color: rgba(255,255,255,0.55); text-decoration: none; transition: all 0.2s; }
        .dt3-social-btn:hover { border-color: var(--coral); color: #f9b5a5; }
        .dt3-footer-disclaimer { background: rgba(255,255,255,0.04); border-radius: 10px; padding: 14px 18px; margin-top: 32px; font-size: 11px; color: rgba(255,255,255,0.35); line-height: 1.6; border: 1px solid rgba(255,255,255,0.06); }
      `}</style>

      <div className="dt3">

        {/* ── Topbar ── */}
        <div className="dt3-topbar">
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <div className="dt3-topbar-item">
              <div className="dt3-topbar-dot" />
              📞 {displayPhone}
            </div>
            <div className="dt3-topbar-item" style={{ display: "none", wordBreak: "break-all" }}>
              <div className="dt3-topbar-dot" />
              ✉ {displayEmail}
            </div>
          </div>
          <div className="dt3-topbar-item" style={{ display: "flex" }}>
            <div className="dt3-topbar-dot" />
            🕒 {workingHours || "Mon–Sat: 8 AM – 8 PM"}
          </div>
        </div>

        {/* ── Navbar ── */}
        <motion.header
          className={`dt3-nav ${scrolled ? "dt3-nav-scrolled" : "dt3-nav-default"}`}
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="dt3-nav-inner">
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {headerType === "Image" && logoUrl ? (
                <div style={{ position: "relative", width: 120, height: 36 }}>
                  <Image src={logoUrl} alt={displayName} fill className="object-contain" />
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, background: "var(--green-dark)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>🌿</div>
                  <div>
                    <span
                      className="dt3-logo-text"
                      style={{ fontSize: clinicNameFontSize ? `clamp(1.1rem, 4vw, ${clinicNameFontSize}px)` : undefined }}
                    >{displayName}</span>
                    <span className="dt3-logo-sub">{specialty || "Medical Centre"}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Nav */}
            <nav className="dt3-nav-links">
              {navLinks.map(({ href, label }) => (
                <a key={href} href={href} className="dt3-nav-link">{label}</a>
              ))}
              <a href="#contact" className="dt3-btn-primary" style={{ padding: "10px 22px" }}>Book Appointment</a>
            </nav>

            {/* Hamburger */}
            <button className="dt3-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              <motion.div animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} className="dt3-ham-bar" />
              <motion.div animate={{ opacity: menuOpen ? 0 : 1 }} className="dt3-ham-bar" />
              <motion.div animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} className="dt3-ham-bar" />
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                className="dt3-mobile-menu overflow-hidden"
              >
                <div className="dt3-mobile-menu-inner">
                  {navLinks.map(({ href, label }) => (
                    <a key={href} href={href} className="dt3-mobile-link" onClick={() => setMenuOpen(false)}>{label}</a>
                  ))}
                  <a href="#contact" className="dt3-btn-primary" style={{ marginTop: 8, justifyContent: "center" }} onClick={() => setMenuOpen(false)}>Book Appointment</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        {/* ══ HERO ══ */}
        <section id="home" ref={heroRef} className="dt3-hero">
          <div className="dt3-hero-pattern" />
          <div className="dt3-hero-grid" />
          {/* Mobile bg */}
          <div className="dt3-hero-mobile-bg" style={{ backgroundImage: `url(${heroImage || "/images/templates/template-img-26.jpg"})` }} />
          <div className="dt3-hero-mobile-overlay" />

          <div className="dt3-hero-inner">
            {/* Text */}
            <div className="dt3-hero-content">
              <motion.div className="dt3-hero-tag" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                <div style={{ fontSize: specialtyFontSize ? `clamp(0.7rem, 2vw, ${specialtyFontSize}px)` : undefined }}>
                  <Tag>◆ {specialty || "Expert Medical Care"}</Tag>
                </div>
              </motion.div>

              <motion.h1
                className="dt3-hero-title"
                initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontSize: heroTitleFontSize ? `clamp(2.4rem, 7vw, ${heroTitleFontSize}px)` : undefined }}
              >
                {heroTitle || (<>Your Health,<br /><em>Our Greatest</em><br />Calling</>)}
              </motion.h1>

              <motion.div
                initial={{ width: 0 }} animate={{ width: 48 }}
                transition={{ duration: 0.7, delay: 0.65 }}
                className="dt3-hero-divider"
              />

              <motion.p
                className="dt3-hero-subtitle"
                initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
              >
                {tagline && <strong style={{ display: "block", color: "rgba(255,255,255,0.85)", marginBottom: 6, fontStyle: "normal" }}>{tagline}</strong>}
                {heroDescription || "Compassionate, evidence-based healthcare delivered by a team of dedicated specialists committed to your lifelong wellbeing."}
              </motion.p>

              <motion.div
                className="dt3-hero-actions"
                initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.65, delay: 0.8 }}
              >
                <a href="#contact" className="dt3-btn-primary">📅 Book Appointment</a>
                <a href={`tel:${displayEmergency}`} className="dt3-btn-outline">🚨 Emergency Line</a>
              </motion.div>

              <motion.div
                className="dt3-hero-mini-stats"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                {[["20+", "Years Experience"], ["12K+", "Patients"], ["99%", "Satisfaction"]].map(([v, l]) => (
                  <div key={l}>
                    <p className="dt3-hero-stat-val">{v}</p>
                    <p className="dt3-hero-stat-label">{l}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Image Panel (desktop) */}
            <motion.div
              className="dt3-hero-img-panel"
              initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div style={{ y: parallaxY }}>
                <div className="dt3-hero-img-frame">
                  <Image
                    src={heroImage || "/images/templates/template-img-26.jpg"}
                    alt="Doctor" fill className="object-cover object-top" priority
                  />
                  <div className="dt3-hero-img-overlay" />
                </div>
                <div className="dt3-hero-badge">
                  <p className="dt3-hero-badge-val">{experience || "20"}+</p>
                  <p className="dt3-hero-badge-label">Years of<br />Excellence</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ══ TRUST STRIP ══ */}
        <section className="dt3-trust">
          <Stagger className="dt3-trust-inner">
            {[
              { icon: "🏅", title: "Board-Certified", sub: "Nationally accredited" },
              { icon: "🚑", title: "24/7 Emergency", sub: "Always available" },
              { icon: "🔬", title: "Latest Tech", sub: "Modern diagnostics" },
              { icon: "💙", title: "10K+ Patients", sub: "Trusted care" },
            ].map((item) => (
              <motion.div key={item.title} variants={popIn()} className="dt3-trust-cell">
                <div className="dt3-trust-icon">{item.icon}</div>
                <p className="dt3-trust-title">{item.title}</p>
                <p className="dt3-trust-sub">{item.sub}</p>
              </motion.div>
            ))}
          </Stagger>
        </section>

        {/* ══ ABOUT ══ */}
        <section id="about" className="dt3-section" style={{ background: "var(--cream-warm)" }}>
          <div className="dt3-section-inner">
            <div className="dt3-about-grid">
              {/* Image */}
              <Reveal dir="left">
                <div className="dt3-about-img-wrap">
                  <div className="dt3-about-img-bg" />
                  <div className="dt3-about-img">
                    <Image src={aboutImage || "/images/templates/template-img-27.jpg"} alt="About" fill className="object-cover" />
                  </div>
                  <div className="dt3-about-exp-badge">
                    <p className="dt3-about-exp-val">{experience || "20"}+</p>
                    <p className="dt3-about-exp-label">Years Exp.</p>
                  </div>
                </div>
              </Reveal>

              {/* Content */}
              <Reveal dir="right" delay={0.1}>
                <Eyebrow>{aboutUsTitle || "About The Doctor"}</Eyebrow>
                <Heading size="xl">Dedicated to Evidence-Based Medical Excellence</Heading>
                <p style={{ color: "var(--slate-light)", lineHeight: 1.75, fontSize: 15, marginBottom: 24 }}>
                  {bio || "We combine decades of clinical expertise with genuine empathy, delivering personalised care that puts you at the centre of every decision. Our clinic stands for integrity, innovation, and impact."}
                </p>

                <div className="dt3-info-grid">
                  {[
                    { icon: "🎓", label: "Education", val: qualification || education || "MD – Medical University" },
                    { icon: "🏥", label: "Hospital", val: hospitalName || displayName },
                    { icon: "🌐", label: "Languages", val: languagesSpoken || "English, Hindi" },
                    { icon: "📜", label: "Certifications", val: certifications || "MBBS, MD, FRCP" },
                  ].map((item) => (
                    <div key={item.label} className="dt3-info-cell">
                      <span className="dt3-info-icon">{item.icon}</span>
                      <div>
                        <p className="dt3-info-label">{item.label}</p>
                        <p className="dt3-info-val">{item.val}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <a href="#contact" className="dt3-btn-primary">Get a Consultation →</a>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══ SERVICES ══ */}
        <section id="services" className="dt3-section dt3-services-bg">
          <div className="dt3-section-inner">
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 48, maxWidth: 600 }}>
              <Reveal><Eyebrow light>Our Specialties</Eyebrow></Reveal>
              <Reveal><Heading size="xl" light>Comprehensive Care Across Every Discipline</Heading></Reveal>
              <Reveal><p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.7 }}>Expert, compassionate treatment spanning a wide range of medical disciplines.</p></Reveal>
            </div>
            <ServicesCarousel items={displayServices} />
          </div>
        </section>

        {/* ══ WHY CHOOSE US ══ */}
        <section className="dt3-section" style={{ background: "var(--cream)" }}>
          <div className="dt3-section-inner">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <Reveal><Eyebrow>Why Choose Us</Eyebrow></Reveal>
              <Reveal><Heading size="xl">Why Patients Trust Our Clinic</Heading></Reveal>
              <Reveal><p style={{ color: "var(--slate-light)", maxWidth: 500, margin: "0 auto", fontSize: 14, lineHeight: 1.7 }}>World-class expertise combined with genuine care for every individual who walks through our doors.</p></Reveal>
            </div>
            <Stagger className="dt3-why-grid">
              {displayWhyChoose.map((f, i) => (
                <motion.div key={i} variants={fromBottom(i * 0.08)} className="dt3-why-card">
                  <div className="dt3-why-icon">{f.icon || "✦"}</div>
                  <h3 className="dt3-why-title">{f.title || f.featureTitle}</h3>
                  <p className="dt3-why-desc">{f.description || f.featureDescription}</p>
                </motion.div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ══ SCHEDULE ══ */}
        <section className="dt3-section" style={{ background: "var(--cream-warm)" }}>
          <div className="dt3-section-inner">
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 48 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 48 }}>
                <div style={{ maxWidth: 400 }}>
                  <Reveal dir="left"><Eyebrow>Clinic Hours</Eyebrow></Reveal>
                  <Reveal dir="left" delay={0.05}><Heading size="lg">When We're Open for You</Heading></Reveal>
                  <Reveal dir="left" delay={0.1}>
                    <p style={{ color: "var(--slate-light)", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>Drop in or call ahead. Our team is ready to assist whenever you need us.</p>
                    <a href="#contact" className="dt3-btn-green">Reserve a Slot →</a>
                  </Reveal>
                </div>
                <Reveal dir="right" className="w-full">
                  <Stagger style={{ borderRadius: 16, overflow: "hidden", border: "1px solid var(--border)" }}>
                    {displaySchedule.map((row, i) => (
                      <motion.div key={i} variants={fromLeft(i * 0.07)} className="dt3-schedule-row">
                        <span className="dt3-schedule-day">{row.day}</span>
                        <div className="dt3-schedule-time">
                          <span className="dt3-schedule-open">{row.open || row.openingTime}</span>
                          <span className="dt3-schedule-sep">—</span>
                          <span className="dt3-schedule-close">{row.close || row.closingTime}</span>
                        </div>
                      </motion.div>
                    ))}
                  </Stagger>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ══ STATS BAND ══ */}
        <section className="dt3-stats-band">
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <Stagger className="dt3-stats-grid">
              {displayStats.map((s, i) => (
                <motion.div key={i} variants={popIn(i * 0.08)} className="dt3-stat-cell">
                  <p className="dt3-stat-val">{s.value}</p>
                  <p className="dt3-stat-label">{s.label}</p>
                </motion.div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ══ TESTIMONIALS (CAROUSEL) ══ */}
        <section className="dt3-section" style={{ background: "var(--green-light)" }}>
          <div className="dt3-section-inner">
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 48, alignItems: "center" }}>
              <div>
                <Reveal dir="left"><Eyebrow>Patient Stories</Eyebrow></Reveal>
                <Reveal dir="left" delay={0.05}><Heading size="xl">What Our Patients Are Saying</Heading></Reveal>
                <Reveal dir="left" delay={0.1}>
                  <p style={{ color: "var(--slate-light)", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>Real words from the people whose health we are proud to support.</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {[1, 2, 3].map((n) => (
                      <div key={n} style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--green-sage)", border: "2px solid var(--cream-warm)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "var(--green-dark)", marginLeft: n > 1 ? -8 : 0 }}>P{n}</div>
                    ))}
                    <span style={{ fontSize: 13, color: "var(--slate-light)", fontWeight: 500, marginLeft: 8 }}>2,400+ verified reviews</span>
                  </div>
                </Reveal>
              </div>
              <Reveal dir="right">
                <TestimonialCarousel items={displayTestimonials} />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══ TEAM ══ */}
        <section id="team" className="dt3-section" style={{ background: "var(--cream)" }}>
          <div className="dt3-section-inner">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <Reveal><Eyebrow>Our Specialists</Eyebrow></Reveal>
              <Reveal><Heading size="xl">Meet the Doctors</Heading></Reveal>
            </div>
            <Stagger className="dt3-team-grid">
              {displayTeam.map((doc, i) => (
                <motion.div key={i} variants={fromBottom(i * 0.1)} className="dt3-team-card">
                  <div className="dt3-team-img">
                    {doc.image ? (
                      <Image src={doc.image} alt={doc.name || doc.doctorName} fill className="object-cover object-top" />
                    ) : "👨‍⚕️"}
                  </div>
                  <div className="dt3-team-bar" />
                  <div className="dt3-team-info">
                    <p className="dt3-team-name">{doc.name || doc.doctorName}</p>
                    <p className="dt3-team-spec">{doc.specialization}</p>
                    <p className="dt3-team-exp">{doc.experience} Experience</p>
                  </div>
                </motion.div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ══ FAQ ══ */}
        <section className="dt3-section" style={{ background: "var(--cream-warm)" }}>
          <div className="dt3-section-inner">
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 48, maxWidth: 900, margin: "0 auto" }}>
              <div>
                <Reveal dir="left"><Eyebrow>FAQ</Eyebrow></Reveal>
                <Reveal dir="left" delay={0.05}><Heading size="lg">Frequently Asked Questions</Heading></Reveal>
                <Reveal dir="left" delay={0.1}><p style={{ color: "var(--slate-light)", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>Can't find your answer? Our team is happy to help.</p>
                  <a href={`tel:${displayPhone}`} className="dt3-btn-primary">📞 Call Us</a>
                </Reveal>
              </div>
              <Stagger>
                {displayFaqs.map((faq, i) => (
                  <FaqItem key={i} q={faq.question} a={faq.answer} i={i} />
                ))}
              </Stagger>
            </div>
          </div>
        </section>

        {/* ══ INSURANCE ══ */}
        <section className="dt3-section" style={{ background: "var(--cream)", borderTop: "1px solid var(--border)" }}>
          <div className="dt3-section-inner">
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <Reveal><Eyebrow>Partners</Eyebrow></Reveal>
              <Reveal><Heading size="lg">Accepted Insurance Plans</Heading></Reveal>
            </div>
            <Stagger className="dt3-insurance-grid">
              {displayInsurance.map((ins, i) => (
                <motion.div key={i} variants={popIn(i * 0.05)} className="dt3-insurance-card">
                  {ins.logo ? (
                    <div style={{ position: "relative", height: 36, marginBottom: 6 }}>
                      <Image src={ins.logo} alt={ins.name} fill className="object-contain" />
                    </div>
                  ) : <div style={{ fontSize: "1.4rem", marginBottom: 6 }}>🏢</div>}
                  {ins.name}
                </motion.div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ══ BLOG ══ */}
        {enableBlog !== false && (
          <section className="dt3-section" style={{ background: "var(--cream-warm)" }}>
            <div className="dt3-section-inner">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
                <div>
                  <Reveal dir="left"><Eyebrow>{blogSubtitle || "Health Tips"}</Eyebrow></Reveal>
                  <Reveal dir="left" delay={0.05}><Heading size="lg">{blogSectionTitle || "Latest Health Insights"}</Heading></Reveal>
                </div>
                <Reveal dir="right">
                  <a href="#" style={{ fontSize: 13, fontWeight: 700, color: "var(--green-dark)", textDecoration: "none", borderBottom: "1.5px solid var(--green-sage)", paddingBottom: 2 }}>View all articles →</a>
                </Reveal>
              </div>
              <Stagger className="dt3-blog-grid">
                {[
                  { tag: "Wellness", emoji: "❤️", bg: "#fdf0f0", title: "10 Habits for a Healthier Heart", excerpt: "Simple daily choices that dramatically reduce your cardiovascular risk.", date: "May 2025" },
                  { tag: "Nutrition", emoji: "🥗", bg: "#f0fdf4", title: "Anti-Inflammatory Foods to Eat Daily", excerpt: "How your diet can actively fight inflammation and protect your long-term health.", date: "Apr 2025" },
                  { tag: "Mental Health", emoji: "🧘", bg: "#f5f0ff", title: "Managing Stress in Modern Life", excerpt: "Evidence-based strategies for maintaining mental balance in a demanding world.", date: "Mar 2025" },
                ].map((post, i) => (
                  <motion.article key={i} variants={fromBottom(i * 0.1)} className="dt3-blog-card">
                    <div className="dt3-blog-thumb" style={{ background: post.bg }}>
                      <span style={{ fontSize: "2.5rem" }}>{post.emoji}</span>
                    </div>
                    <div className="dt3-blog-body">
                      <Tag>{post.tag}</Tag>
                      <h3 className="dt3-blog-title">{post.title}</h3>
                      <p className="dt3-blog-excerpt">{post.excerpt}</p>
                      <p className="dt3-blog-date">{post.date}</p>
                    </div>
                  </motion.article>
                ))}
              </Stagger>
            </div>
          </section>
        )}

        {/* ══ GALLERY ══ */}
        <section className="dt3-section" style={{ background: "var(--green-dark)" }}>
          <div className="dt3-section-inner">
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <Reveal><Eyebrow light>Our Facilities</Eyebrow></Reveal>
              <Reveal><Heading size="xl" light>Clinic Gallery</Heading></Reveal>
            </div>
            <Stagger className="dt3-gallery-grid">
              {displayGallery.map((item, i) => (
                <motion.div
                  key={i} variants={popIn(i * 0.07)}
                  className={`dt3-gallery-item ${i === 0 ? "featured" : ""}`}
                  style={{ background: ["#e8f3ec", "#fdf0ed", "#f5f0e8", "#e8f3ec", "#fdf0ed", "#f5f0e8"][i % 6] }}
                >
                  {item.image ? (
                    <Image src={item.image} alt={item.caption || `Gallery ${i + 1}`} fill className="object-cover" />
                  ) : (
                    <span style={{ fontSize: "2.5rem" }}>{["🏥", "💊", "🔬", "🩺", "🧪", "🛏️"][i % 6]}</span>
                  )}
                  <div className="dt3-gallery-item-overlay">
                    <p className="dt3-gallery-caption">{item.caption || `Facility ${i + 1}`}</p>
                  </div>
                </motion.div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ══ CONTACT ══ */}
        <section id="contact" className="dt3-section" style={{ background: "var(--cream)" }}>
          <div className="dt3-section-inner">
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <Reveal><Eyebrow>Get In Touch</Eyebrow></Reveal>
              <Reveal><Heading size="xl">Contact & Location</Heading></Reveal>
            </div>

            {/* Emergency Banner */}
            <Reveal>
              <div className="dt3-emergency-banner">
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: "1.5rem" }}>🚨</span>
                  <div>
                    <p style={{ fontWeight: 700, color: "#f9b5a5", fontSize: 14 }}>Emergency? We're available 24/7</p>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>{emergencyAvailability || "Immediate response for all medical emergencies"}</p>
                  </div>
                </div>
                <a href={`tel:${displayEmergency}`} className="dt3-btn-primary" style={{ flexShrink: 0, whiteSpace: "nowrap" }}>
                  Call {displayEmergency}
                </a>
              </div>
            </Reveal>

            <div className="dt3-contact-grid">
              {/* Cards */}
              <Stagger style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { icon: "📍", label: "Address", val: displayAddress },
                  { icon: "📞", label: "Phone", val: displayPhone },
                  { icon: "✉️", label: "Email", val: displayEmail, isEmail: true },
                  ...(whatsappNumber ? [{ icon: "💬", label: "WhatsApp", val: whatsappNumber }] : []),
                  ...(ambulanceNumber ? [{ icon: "🚑", label: "Ambulance", val: ambulanceNumber }] : []),
                ].map((item, i) => (
                  <motion.div key={i} variants={fromLeft(i * 0.07)} className="dt3-contact-card">
                    <div className="dt3-contact-icon-box">{item.icon}</div>
                    <div style={item.isEmail ? { wordBreak: "break-all" } : {}}>
                      <p className="dt3-contact-label">{item.label}</p>
                      <p className="dt3-contact-val">{item.val}</p>
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

              {/* Map */}
              <Reveal dir="right">
                <div className="dt3-map-frame">
                  {googleMapsEmbed ? (
                    <iframe src={googleMapsEmbed} style={{ width: "100%", height: "100%", minHeight: 340, border: "none" }} allowFullScreen loading="lazy" title="Location" />
                  ) : (
                    <div className="dt3-map-placeholder">
                      <div style={{ fontSize: "3rem", marginBottom: 12 }}>🗺️</div>
                      <p style={{ fontWeight: 600, fontSize: 14 }}>Map will appear here</p>
                      <p style={{ fontSize: 12, marginTop: 4 }}>Add a Google Maps embed link in your editor</p>
                    </div>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══ FOOTER ══ */}
        <footer className="dt3-footer">
          <div className="dt3-footer-top">
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 36, height: 36, background: "var(--coral)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>🌿</div>
                <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#fff", fontSize: "1.2rem" }}>{displayName}</span>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 280, marginBottom: 8 }}>Delivering exceptional medical care with compassion, expertise, and dedication to every patient.</p>
              <div className="dt3-social-row">
                {["f", "𝕏", "📷", "in"].map((s, i) => (
                  <a key={i} href={socialLinks?.[["facebook", "twitter", "instagram", "linkedin"][i]] || "#"} className="dt3-social-btn">{s}</a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <p className="dt3-footer-heading">Quick Links</p>
              {navLinks.map(({ href, label }) => (
                <a key={href} href={href} className="dt3-footer-link">{label}</a>
              ))}
            </div>

            {/* Services */}
            <div>
              <p className="dt3-footer-heading">Services</p>
              {displayServices.slice(0, 5).map((s, i) => (
                <a key={i} href="#services" className="dt3-footer-link">{s.title || s.name}</a>
              ))}
            </div>

            {/* Contact */}
            <div>
              <p className="dt3-footer-heading">Get In Touch</p>
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
                <p style={{ display: "flex", gap: 8, fontSize: 13, color: "#f9b5a5" }}>
                  <span>🚨</span><span>{emergencyAvailability}</span>
                </p>
              )}
            </div>
          </div>

          {/* Disclaimer */}
          {footerDisclaimer && (
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px" }}>
              <div className="dt3-footer-disclaimer">
                <strong style={{ color: "#f9b5a5" }}>Medical Disclaimer: </strong>
                {footerDisclaimer}
              </div>
            </div>
          )}

          <div className="dt3-footer-bottom">
            <p>{footerCopyright || `© ${new Date().getFullYear()} ${displayName}. All Rights Reserved.`}</p>
            <div style={{ display: "flex", gap: 20 }}>
              <a href="#" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.2s" }}>Privacy Policy</a>
              <a href="#" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.2s" }}>Terms of Service</a>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}