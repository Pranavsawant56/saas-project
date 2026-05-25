import TemplateLayout from "./TemplateLayout";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

// ─── Easing ───────────────────────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1];

// ─── Farmer Motion Variants (Left → Right) ───────────────────────────────
const fadeLeft = {
  hidden: { opacity: 0, x: -60, filter: "blur(6px)" },
  visible: (i = 0) => ({
    opacity: 1, x: 0, filter: "blur(0px)",
    transition: { duration: 0.75, ease, delay: i * 0.12 },
  }),
};

const fadeRight = {
  hidden: { opacity: 0, x: 60, filter: "blur(6px)" },
  visible: (i = 0) => ({
    opacity: 1, x: 0, filter: "blur(0px)",
    transition: { duration: 0.75, ease, delay: i * 0.12 },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: (i = 0) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.8, ease, delay: i * 0.1 },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92, x: -40 },
  visible: (i = 0) => ({
    opacity: 1, scale: 1, x: 0,
    transition: { duration: 0.8, ease, delay: i * 0.1 },
  }),
};

// ─── Section Heading ─────────────────────────────────────────────────────
const SectionHeading = ({ title, subtitle, alignment = "center" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  return (
    <div ref={ref} style={{ textAlign: alignment, marginBottom: "64px" }}>
      {subtitle && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          style={{
            display: "inline-block", padding: "6px 18px",
            background: "rgba(16,185,129,0.1)", borderRadius: "100px",
            border: "1px solid rgba(16,185,129,0.25)", marginBottom: "16px",
            color: "#059669", fontSize: "12px", fontWeight: 700,
            letterSpacing: "0.15em", textTransform: "uppercase",
            fontFamily: "'Space Grotesk', sans-serif"
          }}
        >
          {subtitle}
        </motion.div>
      )}
      {title && (
        <motion.h2
          initial={{ opacity: 0, x: -30, filter: "blur(4px)" }}
          animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="t6-heading"
          style={{
            fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700,
            color: "#0D2818", letterSpacing: "-0.03em", lineHeight: 1.1
          }}
        >
          {title}
        </motion.h2>
      )}
    </div>
  );
};

// ─── FAQ Item with scroll animation ──────────────────────────────────────
const FAQItem = ({ item, idx }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeLeft}
      custom={idx * 0.5}
      style={{
        background: "#FFFFFF",
        border: "1px solid rgba(16,185,129,0.15)",
        borderRadius: 16,
        overflow: "hidden",
        borderLeft: open ? "3px solid #10B981" : "3px solid transparent",
        transition: "border-color 0.3s ease",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", padding: "22px 28px",
          background: "none", border: "none", cursor: "pointer",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          textAlign: "left"
        }}
      >
        <span style={{ fontSize: 16, fontWeight: 600, color: "#0D2818", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            width: 28, height: 28, borderRadius: "50%",
            background: open ? "#10B981" : "rgba(16,185,129,0.1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, marginLeft: 16,
            color: open ? "#FFFFFF" : "#059669",
            fontSize: 20, lineHeight: 1, fontWeight: 300
          }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "0 28px 24px", fontSize: 15, color: "#4B6A5B", lineHeight: 1.7 }}>
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function BusinessTemplate6({ data }) {
  const {
    headerType, companyName, logoUrl, companyNameFontSize,
    heroTitle, heroTitleFontSize, tagline, taglineFontSize, heroImage,
    aboutUsTitle, aboutUsTitleFontSize, aboutUsContent, aboutUsContentFontSize, aboutUsImage,
    services = [], features = [], portfolio = [], team = [],
    testimonials = [], pricing = [], faq = [], blog = [],
    contactTitle, contactEmail, address, countryCode, phone,
    newsletterTitle, newsletterDesc,
    ctaTitle, ctaDesc, ctaButtonText, ctaButtonLink,
    footerDescription, facebookUrl, twitterUrl, linkedinUrl, footerCopyright
  } = data || {};

  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const displayName = companyName || "Verdant Co";
  const displayPhone = phone ? `${countryCode ? countryCode.split(" ")[0] : ""} ${phone}` : phone;

  const defaultServices = [
    { name: "Strategic Planning", desc: "Aligning technology with core business objectives for unprecedented scaling." },
    { name: "Market Analysis", desc: "Data-driven insights to navigate complex global markets efficiently." },
    { name: "Financial Advisory", desc: "Optimizing capital allocation and structuring for long-term resilience." },
    { name: "Digital Transformation", desc: "Reimagining enterprise architecture with cutting-edge intelligent systems." },
  ];
  const activeServices = services?.length > 0 && services.some(s => s.name || s.desc) ? services : defaultServices;

  const defaultFeatures = [
    { title: "Intelligent Automation", desc: "Replace manual workflows with AI-driven pipelines that adapt and scale." },
    { title: "Global Infrastructure", desc: "Deploy seamlessly across distributed edge networks with zero downtime." },
    { title: "Zero-Trust Security", desc: "Enterprise-grade encryption and access controls protecting every layer." }
  ];
  const activeFeatures = features?.length > 0 && features.some(f => f.title || f.desc) ? features : defaultFeatures;

  const defaultTeam = [
    { name: "Alexandra Reed", role: "Chief Executive Officer" },
    { name: "Marcus Chen", role: "Head of Engineering" },
    { name: "Sarah Jenkins", role: "VP of Product" }
  ];
  const activeTeam = team?.length > 0 && team.some(t => t.name || t.role) ? team : defaultTeam;

  const defaultTestimonials = [
    { name: "David Kim", role: "CTO, Horizon Tech", review: "Verdant transformed our operational bandwidth within weeks. Their platform is a masterclass in elegant engineering." },
    { name: "Elena Rostova", role: "Founder, Vertex", review: "The sheer quality of the architecture provided an immediate competitive advantage. Utterly world-class." }
  ];
  const activeTestimonials = testimonials?.length > 0 && testimonials.some(t => t.name || t.review) ? testimonials : defaultTestimonials;

  if (!mounted) return null;

  return (
    <TemplateLayout data={data} theme="light" category="Business" hideHeader={true} hideFooter={true}>

      {/* ─── GLOBAL STYLES ──────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .t6-root {
          font-family: 'Inter', sans-serif;
          background-color: #F0FDF8;
          color: #0D2818;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }

        .t6-heading { font-family: 'Plus Jakarta Sans', sans-serif; }
        .t6-mono { font-family: 'Space Grotesk', sans-serif; }

        /* ── Colour Theme: Emerald + Amber ── */
        .t6-grad-text {
          background: linear-gradient(135deg, #059669 0%, #D97706 60%, #10B981 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .t6-grad-bg {
          background: linear-gradient(135deg, #059669 0%, #D97706 100%);
        }

        /* ── Cards ── */
        .t6-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(16,185,129,0.12);
          border-radius: 24px;
          transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          box-shadow: 0 4px 20px rgba(5,150,105,0.04);
          position: relative;
          overflow: hidden;
        }
        .t6-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(16,185,129,0.12);
          border-color: rgba(16,185,129,0.25);
        }

        /* ── Primary Button ── */
        .t6-btn-primary {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          padding: 16px 36px;
          background: #059669;
          color: #FFFFFF;
          border-radius: 100px;
          font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 600;
          border: none; cursor: pointer; text-decoration: none;
          box-shadow: 0 8px 24px rgba(5,150,105,0.25);
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          position: relative; overflow: hidden;
        }
        .t6-btn-primary::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, #047857, #D97706);
          opacity: 0; transition: opacity 0.4s ease;
        }
        .t6-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(5,150,105,0.35);
        }
        .t6-btn-primary:hover::before { opacity: 1; }
        .t6-btn-primary span, .t6-btn-primary svg { position: relative; z-index: 1; }

        /* ── Secondary Button ── */
        .t6-btn-secondary {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          padding: 16px 36px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(12px);
          color: #0D2818;
          border-radius: 100px;
          font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 500;
          border: 1px solid rgba(16,185,129,0.2);
          cursor: pointer; text-decoration: none;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .t6-btn-secondary:hover {
          background: #FFFFFF;
          border-color: #10B981;
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(16,185,129,0.1);
        }

        /* ── Glows ── */
        .t6-bg-glow {
          position: absolute; border-radius: 50%; pointer-events: none;
          filter: blur(80px); opacity: 0.45; z-index: 0;
        }

        /* ── Layout ── */
        .t6-container { max-width: 1320px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 1; }

        /* ── FAQ scroll container ── */
        .t6-faq-scroll {
          max-height: 520px;
          overflow-y: auto;
          padding-right: 8px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          scroll-behavior: smooth;
        }
        .t6-faq-scroll::-webkit-scrollbar { width: 4px; }
        .t6-faq-scroll::-webkit-scrollbar-track { background: rgba(16,185,129,0.05); border-radius: 100px; }
        .t6-faq-scroll::-webkit-scrollbar-thumb { background: #10B981; border-radius: 100px; }

        /* ── Amber accent stripe for service cards ── */
        .t6-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #10B981, #D97706);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .t6-card:hover::before { opacity: 1; }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .t6-container { padding: 0 16px; }
          .t6-hero-buttons { flex-direction: column; width: 100%; }
          .t6-hero-buttons > * { width: 100%; }
          .t6-faq-scroll { max-height: 420px; }
          
          /* Force grids to 1 column on small screens */
          div[style*="gridTemplateColumns"],
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
          
          /* Force feature images to stay on top on mobile */
          .t6-feature-img { order: -1 !important; }
          .t6-feature-text { order: 0 !important; }
          
          /* Make section paddings smaller on mobile */
          section {
            padding-top: 40px !important;
            padding-bottom: 40px !important;
          }
          section#portfolio {
            padding-top: 20px !important;
            padding-bottom: 20px !important;
          }
        }
      `}</style>

      <div className="t6-root" style={{ minHeight: "100vh" }}>

        {/* ══ HEADER ══ */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease }}
          style={{
            position: "fixed", top: 16, left: 16, right: 16, zIndex: 100,
            background: "rgba(240, 253, 248, 0.92)",
            backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(16,185,129,0.15)",
            borderRadius: "100px",
            boxShadow: "0 8px 32px rgba(5,150,105,0.06)",
            maxWidth: 1280, margin: "0 auto"
          }}
        >
          <div style={{ height: "64px", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {headerType === "Image" && logoUrl ? (
                <div style={{ position: "relative", height: 32, width: 120 }}>
                  <Image src={logoUrl} alt={displayName} fill style={{ objectFit: "contain", objectPosition: "left center" }} />
                </div>
              ) : (
                <span className="t6-heading" style={{ fontSize: companyNameFontSize || 20, fontWeight: 700, letterSpacing: "-0.02em", color: "#059669" }}>
                  {displayName}
                </span>
              )}
            </div>

            <nav className="hidden md:flex items-center gap-8">
              {['Services', 'Features', 'Testimonials', 'Pricing'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`}
                  style={{ fontSize: 13, fontWeight: 500, color: "#4B6A5B", textDecoration: "none", transition: "color 0.3s" }}
                  onMouseOver={e => e.target.style.color = "#059669"}
                  onMouseOut={e => e.target.style.color = "#4B6A5B"}
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex">
              <a href="#contact" className="t6-btn-primary" style={{ padding: "10px 24px", fontSize: 13 }}>
                <span>Get in Touch</span>
              </a>
            </div>

            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ background: "none", border: "none", padding: 8, cursor: "pointer" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </motion.header>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              style={{
                position: "fixed", top: 90, left: 16, right: 16, zIndex: 99,
                background: "#FFFFFF", borderRadius: 24,
                border: "1px solid rgba(16,185,129,0.15)",
                boxShadow: "0 20px 40px rgba(5,150,105,0.1)", padding: 24
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {['Services', 'Features', 'Testimonials', 'Pricing', 'Contact'].map(item => (
                  <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)}
                    style={{ fontSize: 16, fontWeight: 500, color: "#0D2818", textDecoration: "none" }}>
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main>

          {/* ══ HERO ══ */}
          <section style={{ position: "relative", paddingTop: "120px", paddingBottom: "60px", overflow: "hidden" }}>
            <div className="t6-bg-glow" style={{ top: "-10%", left: "5%", width: "38vw", height: "38vw", background: "rgba(16,185,129,0.15)" }} />
            <div className="t6-bg-glow" style={{ top: "25%", right: "-5%", width: "28vw", height: "28vw", background: "rgba(217,119,6,0.12)" }} />
            <div className="t6-bg-glow" style={{ bottom: "5%", left: "40%", width: "22vw", height: "22vw", background: "rgba(5,150,105,0.1)" }} />

            <div className="t6-container" style={{ textAlign: "center" }}>
              <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.15 } } }}>

                {/* Badge — slides from left */}
                <motion.div variants={fadeLeft} custom={0} style={{ marginBottom: 24 }}>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px",
                    background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)",
                    borderRadius: "100px", fontSize: 13, fontWeight: 600, color: "#059669",
                    boxShadow: "0 4px 12px rgba(16,185,129,0.05)"
                  }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981", display: "inline-block" }} />
                    Introducing The Future
                  </span>
                </motion.div>

                {/* Headline — slides from left */}
                <motion.h1 variants={fadeLeft} custom={1} className="t6-heading" style={{
                  fontSize: heroTitleFontSize ? `${heroTitleFontSize}px` : "clamp(48px, 7vw, 88px)",
                  fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05,
                  maxWidth: 900, margin: "0 auto 32px", color: "#0D2818"
                }}>
                  {heroTitle || "Grow. Sustain. Thrive."}
                </motion.h1>

                {/* Tagline — slides from left */}
                <motion.p variants={fadeLeft} custom={2} style={{
                  fontSize: taglineFontSize ? `${taglineFontSize}px` : "clamp(18px, 2vw, 22px)",
                  color: "#4B6A5B", lineHeight: 1.6, maxWidth: 640, margin: "0 auto 48px"
                }}>
                  {tagline || "The ultimate platform for forward-thinking enterprises. We engineer solutions that accelerate growth and redefine boundaries."}
                </motion.p>

                {/* Buttons — slides from left */}
                <motion.div variants={fadeLeft} custom={3} className="t6-hero-buttons"
                  style={{ display: "flex", gap: 16, justifyContent: "center", alignItems: "center" }}>
                  <button className="t6-btn-primary" style={{ padding: "18px 40px", fontSize: 15 }}>
                    <span>Get Started Free</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                  <button className="t6-btn-secondary" style={{ padding: "18px 40px", fontSize: 15 }}>
                    View Documentation
                  </button>
                </motion.div>
              </motion.div>

              {/* Hero Image — slides from left */}
              <motion.div
                initial={{ opacity: 0, x: -80, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                style={{ marginTop: 40, position: "relative" }}
              >
                <div style={{
                  position: "absolute", inset: "-2px",
                  background: "linear-gradient(180deg, rgba(16,185,129,0.2) 0%, transparent 100%)",
                  borderRadius: 24, filter: "blur(12px)", zIndex: 0
                }} />
                <div style={{
                  position: "relative", borderRadius: 24, overflow: "hidden",
                  border: "1px solid rgba(16,185,129,0.15)",
                  background: "#FFFFFF",
                  boxShadow: "0 30px 60px rgba(5,150,105,0.1)", zIndex: 1,
                  aspectRatio: "16/9"
                }}>
                  <Image src={heroImage || "/images/templates/template-img-12.jpg"} alt="Dashboard Preview" fill style={{ objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 60%, #F0FDF8 100%)" }} />
                </div>
              </motion.div>
            </div>
          </section>

          {/* ══ ABOUT ══ */}
          <section id="about" style={{ padding: "60px 0", background: "#FFFFFF" }}>
            <div className="t6-container">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 64, alignItems: "center" }}>

                {/* Image — from left */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                  variants={scaleIn} style={{ position: "relative" }}>
                  <div style={{ position: "absolute", top: -20, left: -20, width: "100%", height: "100%", background: "rgba(16,185,129,0.05)", borderRadius: 24 }} />
                  <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", border: "1px solid rgba(16,185,129,0.12)", aspectRatio: "4/5" }}>
                    <Image src={aboutUsImage || "/images/templates/template-img-20.jpg"} alt="About Us" fill style={{ objectFit: "cover" }} />
                    {/* Amber accent corner */}
                    <div style={{ position: "absolute", bottom: 0, right: 0, width: 80, height: 80, background: "linear-gradient(135deg, transparent 50%, rgba(217,119,6,0.3) 100%)" }} />
                  </div>
                </motion.div>

                {/* Text — from right */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                  variants={{ visible: { transition: { staggerChildren: 0.12 } } }}>
                  <motion.div variants={fadeRight} style={{ fontSize: 13, fontWeight: 700, color: "#059669", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 16 }}>
                    Our Story
                  </motion.div>
                  <motion.h2 variants={fadeRight} className="t6-heading"
                    style={{ fontSize: aboutUsTitleFontSize || "clamp(32px, 4vw, 48px)", fontWeight: 700, color: "#0D2818", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 24 }}>
                    {aboutUsTitle || "Engineering a greener future for enterprise software."}
                  </motion.h2>
                  <motion.p variants={fadeRight}
                    style={{ fontSize: aboutUsContentFontSize || 18, color: "#4B6A5B", lineHeight: 1.7, marginBottom: 32 }}>
                    {aboutUsContent || "We are a collective of engineers, designers, and strategists dedicated to crafting platforms that elevate operational efficiency. Our approach is rooted in meticulous attention to detail and uncompromising standards."}
                  </motion.p>
                  <motion.div variants={fadeRight}>
                    <button className="t6-btn-secondary" style={{ padding: "14px 32px" }}>Learn More About Us</button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ══ SERVICES ══ */}
          <section id="services" style={{ padding: "80px 0", position: "relative", background: "#F0FDF8" }}>
            <div className="t6-bg-glow" style={{ top: "30%", right: "0", width: "35vw", height: "35vw", background: "rgba(217,119,6,0.08)" }} />
            <div className="t6-container">
              <SectionHeading title="Our Expertise" subtitle="Services" alignment="center" />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
                {activeServices.map((service, idx) => (
                  <motion.div
                    key={idx}
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                    variants={fadeLeft} custom={idx * 0.6}
                    className="t6-card" style={{ padding: 40 }}
                  >
                    {service.image ? (
                      <div style={{ position: "relative", width: 48, height: 48, marginBottom: 24 }}>
                        <Image src={service.image} alt={service.name} fill style={{ objectFit: "contain" }} />
                      </div>
                    ) : (
                      <div style={{
                        width: 48, height: 48, borderRadius: 12,
                        background: idx % 2 === 0 ? "rgba(16,185,129,0.1)" : "rgba(217,119,6,0.1)",
                        display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24
                      }}>
                        <div style={{
                          width: 24, height: 24,
                          background: idx % 2 === 0 ? "linear-gradient(135deg, #10B981, #059669)" : "linear-gradient(135deg, #F59E0B, #D97706)",
                          borderRadius: 6
                        }} />
                      </div>
                    )}
                    <h3 className="t6-heading" style={{ fontSize: 20, fontWeight: 700, color: "#0D2818", marginBottom: 12 }}>
                      {service.name || service.title}
                    </h3>
                    <p style={{ fontSize: 15, color: "#4B6A5B", lineHeight: 1.6 }}>{service.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ══ FEATURES ══ */}
          <section id="features" style={{ padding: "60px 0", background: "#FFFFFF", borderTop: "1px solid rgba(16,185,129,0.06)" }}>
            <div className="t6-container">
              <SectionHeading title="Platform Capabilities" subtitle="Features" />
              <div style={{ display: "flex", flexDirection: "column", gap: 60 }}>
                {activeFeatures.map((feature, idx) => {
                  const isEven = idx % 2 === 0;
                  return (
                    <div key={idx} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 64, alignItems: "center" }}>
                      {/* Visual — alternates left/right */}
                      <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }}
                        variants={isEven ? fadeLeft : fadeRight}
                        style={{ order: isEven ? 0 : 1 }}
                        className="t6-feature-img"
                      >
                        <div style={{ borderRadius: 24, overflow: "hidden", border: "1px solid rgba(16,185,129,0.1)", background: "#F0FDF8", aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {feature.icon || feature.image ? (
                            <Image src={feature.icon || feature.image} alt={feature.title} fill style={{ objectFit: "cover" }} />
                          ) : (
                            <div style={{ width: 120, height: 120, background: "rgba(16,185,129,0.08)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <div style={{
                                width: 60, height: 60,
                                background: idx % 2 === 0 ? "linear-gradient(135deg, #10B981, #D97706)" : "linear-gradient(135deg, #D97706, #10B981)",
                                borderRadius: 16, transform: "rotate(15deg)"
                              }} />
                            </div>
                          )}
                        </div>
                      </motion.div>

                      {/* Text — opposite direction */}
                      <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }}
                        variants={isEven ? fadeRight : fadeLeft}
                        style={{ order: isEven ? 1 : 0 }}
                        className="t6-feature-text"
                      >
                        <div style={{ fontSize: 12, fontWeight: 700, color: "#D97706", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 16 }}>
                          Feature 0{idx + 1}
                        </div>
                        <h3 className="t6-heading" style={{ fontSize: 32, fontWeight: 700, color: "#0D2818", marginBottom: 20 }}>{feature.title}</h3>
                        <p style={{ fontSize: 18, color: "#4B6A5B", lineHeight: 1.7 }}>{feature.desc}</p>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ══ PORTFOLIO ══ */}
          {portfolio?.length > 0 && (
            <section id="portfolio" style={{ padding: "20px 0", background: "#F0FDF8" }}>
              <div className="t6-container">
                <SectionHeading title="Recent Work" subtitle="Portfolio" />
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                  {portfolio.map((proj, idx) => (
                    <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: true }}
                      variants={fadeLeft} custom={idx * 0.5}
                      className="t6-card" style={{ padding: 0 }}>
                      <div style={{ position: "relative", width: "100%", aspectRatio: "2/1", overflow: "hidden", borderBottom: "1px solid rgba(16,185,129,0.08)" }}>
                        <Image src={proj.image || "/images/templates/template-img-11.jpg"} alt={proj.title} fill style={{ objectFit: "cover", transition: "transform 0.6s ease" }} onMouseOver={e => e.target.style.transform = "scale(1.05)"} onMouseOut={e => e.target.style.transform = "scale(1)"} />
                      </div>
                      <div style={{ padding: 16 }}>
                        <h4 className="t6-heading" style={{ fontSize: 18, fontWeight: 700, color: "#0D2818", marginBottom: 6 }}>{proj.title}</h4>
                        <p style={{ fontSize: 13, color: "#4B6A5B", lineHeight: 1.5, marginBottom: 12 }}>{proj.desc}</p>
                        {proj.link && (
                          <a href={proj.link} style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, color: "#059669", textDecoration: "none" }}>
                            View Project <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ══ TEAM ══ */}
          <section id="team" style={{ padding: "60px 0", background: "#FFFFFF", borderTop: "1px solid rgba(16,185,129,0.06)" }}>
            <div className="t6-container">
              <SectionHeading title="Leadership" subtitle="Team" />
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 40 }}>
                {activeTeam.map((member, idx) => (
                  <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    variants={fadeLeft} custom={idx * 0.5}
                    style={{ textAlign: "center", width: 280 }}>
                    <div style={{ position: "relative", width: 140, height: 140, margin: "0 auto 24px", borderRadius: "50%", overflow: "hidden", border: "4px solid #F0FDF8", boxShadow: "0 12px 24px rgba(16,185,129,0.1)" }}>
                      {member.image ? (
                        <Image src={member.image} alt={member.name} fill style={{ objectFit: "cover" }} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #D1FAE5, #A7F3D0)" }} />
                      )}
                    </div>
                    <h4 className="t6-heading" style={{ fontSize: 20, fontWeight: 700, color: "#0D2818", marginBottom: 6 }}>{member.name}</h4>
                    <p style={{ fontSize: 14, color: "#059669", fontWeight: 600 }}>{member.role}</p>
                    {member.bio && <p style={{ fontSize: 14, color: "#4B6A5B", marginTop: 12 }}>{member.bio}</p>}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ══ TESTIMONIALS ══ */}
          <section id="testimonials" style={{ padding: "80px 0", position: "relative", background: "#F0FDF8" }}>
            <div className="t6-bg-glow" style={{ bottom: "-10%", left: "10%", width: "45vw", height: "45vw", background: "rgba(217,119,6,0.08)" }} />
            <div className="t6-container">
              <SectionHeading title="Client Endorsements" subtitle="Testimonials" />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32 }}>
                {activeTestimonials.map((testi, idx) => (
                  <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    variants={idx % 2 === 0 ? fadeLeft : fadeRight} custom={idx * 0.4}
                    className="t6-card" style={{ padding: 40 }}>
                    <div style={{ marginBottom: 24 }}>
                      {/* Amber quote icon */}
                      <svg width="36" height="36" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" fill="rgba(217,119,6,0.18)" /></svg>
                    </div>
                    <p style={{ fontSize: 16, color: "#2D4A38", lineHeight: 1.7, marginBottom: 32, fontStyle: "italic" }}>"{testi.review}"</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      {testi.image ? (
                        <Image src={testi.image} alt={testi.name} width={48} height={48} style={{ borderRadius: "50%" }} />
                      ) : (
                        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg, #D1FAE5, #A7F3D0)", display: "flex", alignItems: "center", justifyContent: "center", color: "#059669", fontWeight: 700, fontSize: 16 }}>
                          {testi.name?.[0]}
                        </div>
                      )}
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: "#0D2818" }}>{testi.name}</div>
                        <div style={{ fontSize: 13, color: "#D97706", fontWeight: 500 }}>{testi.role}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ══ PRICING ══ */}
          {pricing?.length > 0 && (
            <section id="pricing" style={{ padding: "60px 0", background: "#FFFFFF", borderTop: "1px solid rgba(16,185,129,0.06)" }}>
              <div className="t6-container">
                <SectionHeading title="Transparent Plans" subtitle="Pricing" />
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 32 }}>
                  {pricing.map((plan, idx) => {
                    const isFeatured = idx === 1;
                    return (
                      <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        variants={fadeLeft} custom={idx * 0.4}
                        className="t6-card"
                        style={{
                          flex: "1 1 320px", maxWidth: 400, padding: 40,
                          border: isFeatured ? "2px solid #10B981" : undefined,
                          transform: isFeatured ? "scale(1.02)" : "none",
                          boxShadow: isFeatured ? "0 30px 60px rgba(16,185,129,0.15)" : undefined,
                          position: "relative"
                        }}>
                        {isFeatured && (
                          <div style={{
                            position: "absolute", top: 0, left: 0, right: 0, padding: "8px",
                            background: "linear-gradient(90deg, #059669, #D97706)",
                            color: "#FFFFFF", textAlign: "center",
                            fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em"
                          }}>
                            Recommended
                          </div>
                        )}
                        <h4 className="t6-heading" style={{ fontSize: 24, fontWeight: 700, color: "#0D2818", marginTop: isFeatured ? 24 : 0, marginBottom: 12 }}>{plan.planName}</h4>
                        <div style={{ fontSize: 48, fontWeight: 800, color: isFeatured ? "#059669" : "#0D2818", letterSpacing: "-0.04em", marginBottom: 32 }}>
                          {plan.price}<span style={{ fontSize: 16, fontWeight: 500, color: "#4B6A5B" }}>/mo</span>
                        </div>
                        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px", display: "flex", flexDirection: "column", gap: 16 }}>
                          {(plan.features?.split(",") || []).map((feat, i) => (
                            <li key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 15, color: "#4B6A5B" }}>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              {feat.trim()}
                            </li>
                          ))}
                        </ul>
                        <button className={isFeatured ? "t6-btn-primary" : "t6-btn-secondary"} style={{ width: "100%", padding: "16px" }}>
                          {plan.buttonText || "Choose Plan"}
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* ══ FAQ — Scrollable with left-to-right animations ══ */}
          {faq?.length > 0 && (
            <section id="faq" style={{ padding: "60px 0", background: "#F0FDF8" }}>
              <div className="t6-container" style={{ maxWidth: 800 }}>
                <SectionHeading title="Common Questions" subtitle="FAQ" />

                {/* Scroll hint */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, color: "#059669", fontSize: 13, fontWeight: 500 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
                  Scroll to explore all questions
                </motion.div>

                {/* Scrollable FAQ list */}
                <div className="t6-faq-scroll">
                  {faq.map((item, idx) => (
                    <FAQItem key={idx} item={item} idx={idx} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ══ CTA / CONTACT ══ */}
          <section id="contact" style={{ padding: "60px 24px", display: "flex", justifyContent: "center", background: "#FFFFFF" }}>
            <motion.div
              initial={{ opacity: 0, x: -80, scale: 0.96 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease }}
              style={{
                width: "100%", maxWidth: 1200,
                background: "linear-gradient(135deg, #0D2818 0%, #064E3B 60%, #1A3A0A 100%)",
                borderRadius: 40, padding: "80px 40px", textAlign: "center",
                position: "relative", overflow: "hidden"
              }}>
              <div style={{ position: "absolute", top: "-50%", left: "-10%", width: "120%", height: "200%", background: "radial-gradient(ellipse at top, rgba(16,185,129,0.35) 0%, transparent 60%)", pointerEvents: "none" }} />
              {/* Amber accent orb */}
              <div style={{ position: "absolute", bottom: "-20%", right: "5%", width: "40%", height: "80%", background: "radial-gradient(ellipse, rgba(217,119,6,0.2) 0%, transparent 60%)", pointerEvents: "none" }} />

              <div style={{ position: "relative", zIndex: 1 }}>
                <motion.h2
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease, delay: 0.2 }}
                  className="t6-heading"
                  style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 700, color: "#ECFDF5", letterSpacing: "-0.03em", marginBottom: 24, maxWidth: 800, margin: "0 auto 24px" }}>
                  {ctaTitle || "Ready to accelerate your growth?"}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease, delay: 0.35 }}
                  style={{ fontSize: 20, color: "#6EE7B7", marginBottom: 48, maxWidth: 600, margin: "0 auto 48px" }}>
                  {ctaDesc || "Join leading companies who trust our platform to scale their digital infrastructure sustainably."}
                </motion.p>
                <motion.a
                  href={ctaButtonLink || "#"}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease, delay: 0.5 }}
                  className="t6-btn-primary"
                  style={{ background: "#10B981", padding: "20px 48px", fontSize: 16, boxShadow: "0 8px 32px rgba(16,185,129,0.35)" }}>
                  <span>{ctaButtonText || "Get Started Today"}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </motion.a>
              </div>
            </motion.div>
          </section>

        </main>

        {/* ══ FOOTER ══ */}
        <footer style={{ padding: "60px 0 40px", borderTop: "1px solid rgba(16,185,129,0.1)", background: "#F0FDF8" }}>
          <div className="t6-container">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 64, marginBottom: 64 }}>
              <div>
                <span className="t6-heading" style={{ fontSize: 24, fontWeight: 700, color: "#059669", display: "block", marginBottom: 24 }}>{displayName}</span>
                <p style={{ fontSize: 15, color: "#4B6A5B", lineHeight: 1.6, marginBottom: 24 }}>{footerDescription || "Engineered for excellence. Designed for scale."}</p>
                <div style={{ display: "flex", gap: 16 }}>
                  {facebookUrl && <a href={facebookUrl} style={{ color: "#10B981", fontWeight: 600, fontSize: 13, textDecoration: "none" }}>FB</a>}
                  {twitterUrl && <a href={twitterUrl} style={{ color: "#10B981", fontWeight: 600, fontSize: 13, textDecoration: "none" }}>TW</a>}
                  {linkedinUrl && <a href={linkedinUrl} style={{ color: "#10B981", fontWeight: 600, fontSize: 13, textDecoration: "none" }}>IN</a>}
                </div>
              </div>

              <div>
                <h5 style={{ fontSize: 14, fontWeight: 700, color: "#0D2818", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 24 }}>Company</h5>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {['About', 'Services', 'Features', 'Careers'].map(link => (
                    <a key={link} href={`#${link.toLowerCase()}`} style={{ fontSize: 15, color: "#4B6A5B", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseOver={e => e.target.style.color = "#059669"} onMouseOut={e => e.target.style.color = "#4B6A5B"}>
                      {link}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h5 style={{ fontSize: 14, fontWeight: 700, color: "#0D2818", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 24 }}>Contact</h5>
                <div style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: 15, color: "#4B6A5B" }}>
                  {contactEmail && <div>{contactEmail}</div>}
                  {displayPhone && <div>{displayPhone}</div>}
                  {address && <div>{address}</div>}
                </div>
              </div>
            </div>

            <div style={{ borderTop: "1px solid rgba(16,185,129,0.1)", paddingTop: 32, display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
              <div style={{ fontSize: 14, color: "#4B6A5B" }}>
                {footerCopyright || `© ${new Date().getFullYear()} ${displayName}. All rights reserved.`}
              </div>
              <div style={{ display: "flex", gap: 24, fontSize: 14, color: "#4B6A5B" }}>
                <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Privacy Policy</a>
                <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </TemplateLayout>
  );
}