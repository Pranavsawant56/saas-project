import TemplateLayout from "./TemplateLayout";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

// ─── Easing ──────────────────────────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1];

// ─── Left → Right word reveal ────────────────────────────────────────────────
function SplitReveal({ text, className, style, delay = 0, tag = "h2" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });
  const words = String(text).split(" ");
  const Tag = tag;
  return (
    <Tag ref={ref} className={className} style={{ ...style, overflow: "hidden", display: "flex", flexWrap: "wrap", gap: "0 0.28em" }}>
      {words.map((word, i) => (
        <span key={i} style={{ overflow: "hidden", display: "inline-block" }}>
          <motion.span
            display="inline-block"
            style={{ display: "inline-block" }}
            initial={{ x: -40, opacity: 0, filter: "blur(6px)" }}
            animate={isInView ? { x: 0, opacity: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.65, ease, delay: delay + i * 0.07 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

// ─── Fade-up variant ─────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 36, filter: "blur(6px)" },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.72, ease, delay: i * 0.09 },
  }),
};

// ─── Slide-from-left variant ──────────────────────────────────────────────────
const slideLeft = {
  hidden: { opacity: 0, x: -56, filter: "blur(8px)" },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease, delay: i * 0.1 },
  }),
};

// ─── Scale-in variant ─────────────────────────────────────────────────────────
const scaleIn = {
  hidden: { opacity: 0, scale: 0.88, filter: "blur(8px)" },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.72, ease, delay: i * 0.1 },
  }),
};

// ─── Color palette ───────────────────────────────────────────────────────────
const COLORS = {
  cyan: { main: "#00E5FF", soft: "rgba(0,229,255,0.12)", glow: "rgba(0,229,255,0.3)" },
  pink: { main: "#FF0055", soft: "rgba(255,0,85,0.12)", glow: "rgba(255,0,85,0.3)" },
  purple: { main: "#B026FF", soft: "rgba(176,38,255,0.12)", glow: "rgba(176,38,255,0.3)" },
  violet: { main: "#4D00FF", soft: "rgba(77,0,255,0.12)", glow: "rgba(77,0,255,0.3)" },
  lime: { main: "#39FF14", soft: "rgba(57,255,20,0.12)", glow: "rgba(57,255,20,0.3)" },
};
const CARD_ACCENTS = [COLORS.cyan, COLORS.pink, COLORS.purple, COLORS.violet];

export default function BusinessTemplate5({ data }) {
  const {
    companyName, heroTitle, tagline, heroImage,
    service1_name, service1_desc,
    service2_name, service2_desc,
    service3_name, service3_desc,
    service4_name, service4_desc,
    aboutUsTitle, aboutUsContent, aboutUsImage,
    headerType, logoUrl,
    phone, address, countryCode, contactEmail, footerAbout, footerCopyright,
    facebookUrl, twitterUrl, linkedinUrl,
    companyNameFontSize, heroTitleFontSize, taglineFontSize,
    service1_nameFontSize, service1_descFontSize,
    service2_nameFontSize, service2_descFontSize,
    service3_nameFontSize, service3_descFontSize,
    service4_nameFontSize, service4_descFontSize,
    aboutUsTitleFontSize, aboutUsContentFontSize,
    services,
  } = data || {};

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const displayName = companyName || "Neon Dynamics";
  const displayPhone = phone ? `${countryCode ? countryCode.split(" ")[0] : ""} ${phone}` : phone;
  const displayServices = services && services.length > 0 && services.some(s => s.name || s.title || s.desc)
    ? services
    : [
      { title: service1_name || "Creative Studio", desc: service1_desc || "Engineering digital ecosystems that accelerate hyperscale growth through intentional design.", nameFontSize: service1_nameFontSize, descFontSize: service1_descFontSize },
      { title: service2_name || "Strategic Growth", desc: service2_desc || "Accelerating market velocity with data-led strategic thinking.", nameFontSize: service2_nameFontSize, descFontSize: service2_descFontSize },
      { title: service3_name || "Digital Solutions", desc: service3_desc || "Crafting interfaces that are elegant, fast, and purposeful.", nameFontSize: service3_nameFontSize, descFontSize: service3_descFontSize },
      { title: service4_name || "System Design", desc: service4_desc || "Scalable foundations engineered for performance and longevity.", nameFontSize: service4_nameFontSize, descFontSize: service4_descFontSize },
    ];

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.75], [1, 0.95]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") setMobileMenuOpen(false); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <TemplateLayout data={data} theme="dark" category="Business" hideHeader={true} hideFooter={true}>

      {/* ─── GLOBAL STYLES ──────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .t5-root {
          font-family: 'Inter', sans-serif;
          background: #0A0A0F;
          color: #FAFAFA;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          overflow-x: hidden;
        }

        /* ── Typography ── */
        .t5-display { font-family: 'Syne', serif; }
        .t5-heading { font-family: 'Space Grotesk', sans-serif; }
        .t5-body    { font-family: 'Inter', sans-serif; }

        /* ── Badge ── */
        .t5-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 20px;
          border: 1.5px solid rgba(13,148,136,0.25);
          border-radius: 0px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
          color: #00E5FF;
          background: rgba(13,148,136,0.06);
          font-family: 'Space Grotesk', sans-serif;
        }
        .t5-badge::before {
          content:''; width:6px; height:6px; border-radius:50%;
          background: linear-gradient(135deg,#00E5FF,#FF0055);
          display:block; animation: pulse-dot 2s ease infinite;
        }
        @keyframes pulse-dot {
          0%,100%{ opacity:1; transform:scale(1); }
          50%{ opacity:0.5; transform:scale(0.7); }
        }

        /* ── Nav link ── */
        .t5-nav-link {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
          color: #A1A1AA; text-decoration: none;
          transition: color 0.25s ease; position: relative;
        }
        .t5-nav-link::after {
          content:''; position:absolute; bottom:-4px; left:0; width:0; height:1.5px;
          background: linear-gradient(90deg,#00E5FF,#FF0055);
          transition: width 0.3s ease;
        }
        .t5-nav-link:hover { color:#FAFAFA; }
        .t5-nav-link:hover::after { width:100%; }

        /* ── Mobile nav link ── */
        .t5-mobile-nav-link {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
          color: #FAFAFA; text-decoration: none;
          padding: 16px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: block;
          transition: color 0.25s ease;
        }
        .t5-mobile-nav-link:hover { color: #00E5FF; }

        /* ── Buttons ── */
        .t5-btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 15px 34px;
          background: linear-gradient(135deg, #00E5FF 0%, #FF0055 100%);
          color: #05050A; border-radius: 0px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
          border: none; cursor: pointer; text-decoration: none;
          box-shadow: 0 14px 40px rgba(13,148,136,0.3);
          transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
          position: relative; overflow: hidden;
        }
        .t5-btn-primary::before {
          content:''; position:absolute; inset:0;
          background: linear-gradient(135deg,#FF0055 0%,#B026FF 100%);
          opacity:0; transition: opacity 0.4s ease;
        }
        .t5-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 20px 52px rgba(234,88,12,0.38); }
        .t5-btn-primary:hover::before { opacity:1; }
        .t5-btn-primary span, .t5-btn-primary svg { position:relative; z-index:1; }

        .t5-btn-secondary {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 34px;
          background: rgba(20,20,30,0.8);
          backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
          color: #FAFAFA; border-radius: 0px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
          border: 1.5px solid rgba(255,255,255,0.08);
          cursor: pointer; text-decoration: none;
          box-shadow: 0 8px 24px rgba(255,255,255,0.06);
          transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .t5-btn-secondary:hover {
          background: #05050A; border-color: rgba(13,148,136,0.2);
          transform: translateY(-3px); box-shadow: 0 14px 36px rgba(255,255,255,0.1);
        }

        /* ── Cards (Sharp Corners) ── */
        .t5-card {
          background: rgba(15,15,25,0.78);
          backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 0px;
          transition: all 0.42s cubic-bezier(0.22,1,0.36,1);
          position: relative; overflow: hidden;
        }
        .t5-card:hover { transform: translateY(-7px); }

        /* ── Section label ── */
        .t5-label {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 10px; font-weight: 800; letter-spacing: 0.28em; text-transform: uppercase;
          display: inline-flex; align-items: center; gap: 10px;
          margin-bottom: 20px;
        }
        .t5-label::before {
          content:''; display:block; width:24px; height:1.5px;
          background: currentColor; border-radius:2px;
        }

        /* ── Gradient text ── */
        .t5-grad-blue-violet {
          background: linear-gradient(135deg,#00E5FF 0%,#FF0055 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .t5-grad-rose-amber {
          background: linear-gradient(135deg,#B026FF 0%,#4D00FF 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .t5-grad-emerald-blue {
          background: linear-gradient(135deg,#39FF14 0%,#00E5FF 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        /* ── Input ── */
        .t5-input {
          width:100%; padding: 14px 20px;
          background: rgba(15,15,25,0.7); backdrop-filter:blur(12px);
          border: 1.5px solid rgba(255,255,255,0.08); border-radius:0px;
          font-size: 14px; color:#FAFAFA; font-family:'Inter',sans-serif;
          outline:none; transition: all 0.3s ease;
        }
        .t5-input:focus { border-color:rgba(13,148,136,0.35); box-shadow: 0 0 0 4px rgba(13,148,136,0.07); }
        .t5-input::placeholder { color:#71717A; }

        /* ── Social ── */
        .t5-social {
          width:40px; height:40px; border-radius:0px;
          background: rgba(15,15,25,0.7); backdrop-filter:blur(12px);
          border: 1px solid rgba(255,255,255,0.08);
          display:flex; align-items:center; justify-content:center;
          color:#A1A1AA; text-decoration:none;
          transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .t5-social:hover {
          background: linear-gradient(135deg,#00E5FF 0%,#FF0055 100%);
          color:#05050A; border-color:transparent;
          transform:translateY(-3px); box-shadow:0 12px 30px rgba(13,148,136,0.28);
        }

        /* ── FAQ ── */
        .t5-faq {
          background: rgba(15,15,25,0.78); backdrop-filter:blur(18px);
          border: 1px solid rgba(255,255,255,0.07); border-radius:0px;
          overflow:hidden; transition: all 0.35s ease;
        }
        .t5-faq[open] { border-color:rgba(13,148,136,0.18); box-shadow:0 12px 40px rgba(13,148,136,0.08); }
        .t5-faq summary {
          padding:22px 28px; font-size:15px; font-weight:600; font-family:'Space Grotesk',sans-serif;
          color:#FAFAFA; cursor:pointer; outline:none; user-select:none;
          list-style:none; display:flex; justify-content:space-between; align-items:center;
          transition:color 0.25s;
        }
        .t5-faq summary:hover { color:#00E5FF; }
        .t5-faq summary::-webkit-details-marker { display:none; }
        .t5-faq summary::after {
          content:'+'; font-size:22px; font-weight:300; color:#71717A;
          transition:transform 0.35s cubic-bezier(0.22,1,0.36,1);
          flex-shrink: 0; margin-left: 12px;
        }
        .t5-faq[open] summary::after { transform:rotate(45deg); color:#00E5FF; }

        /* ── Pricing featured ── */
        .t5-pricing-featured {
          background: linear-gradient(145deg,#08001F 0%,#1C003D 60%,#00E5FF 100%);
          color:#0A0A0F;
        }

        /* ── Stat box ── */
        .t5-stat {
          position:absolute; top:-32px; left:-32px; width:155px; padding:22px 20px;
          background:rgba(20,20,30,0.95); backdrop-filter:blur(24px);
          border:1.5px solid rgba(255,255,255,0.6); border-radius:0px;
          box-shadow:0 24px 60px rgba(255,255,255,0.14); z-index:20;
        }

        /* ── Hamburger button ── */
        .t5-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 8px;
          border: none;
          background: transparent;
          border-radius: 0px;
          transition: background 0.2s ease;
          z-index: 60;
        }
        .t5-hamburger:hover { background: rgba(255,255,255,0.05); }
        .t5-hamburger span {
          width: 22px; height: 1.5px; background: #FAFAFA;
          display: block;
          transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
          transform-origin: center;
        }
        .t5-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .t5-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .t5-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        .t5-desktop-nav { display: flex; }

        /* ── Mobile menu drawer ── */
        .t5-mobile-menu {
          display: none;
          position: fixed;
          top: 68px;
          left: 0; right: 0;
          background: rgba(10,10,15,0.97);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 16px 40px rgba(255,255,255,0.1);
          z-index: 49;
          padding: 8px 24px 24px;
          transform: translateY(-10px);
          opacity: 0;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease;
        }
        .t5-mobile-menu.open {
          transform: translateY(0);
          opacity: 1;
        }

        @keyframes shimmer {
          0%{ background-position:200% center; }
          100%{ background-position:-200% center; }
        }
        .t5-shimmer-text {
          background: linear-gradient(90deg,#00E5FF 0%,#FF0055 40%,#B026FF 60%,#4D00FF 80%,#39FF14 100%);
          background-size:200% auto;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          animation: shimmer 4s linear infinite;
        }

        /* Glassmorphism Section Style */
        .t5-glass-section {
          background: rgba(255,255,255,0.76);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          margin: 80px 24px; border-radius: 0px;
          border: 1px solid rgba(255,255,255,0.06);
          box-shadow: 0 16px 60px rgba(13,148,136,0.07);
        }

        /* ═══════════════════════════════════════════
           RESPONSIVE BREAKPOINTS
        ═══════════════════════════════════════════ */
        @media (max-width: 1024px) {
          .t5-desktop-nav { display: none !important; }
          .t5-hamburger { display: flex !important; }
          .t5-mobile-menu { display: block; }
        }

        @media (max-width: 1024px) and (min-width: 769px) {
          .t5-hero-section { padding: 80px 32px 0 !important; }
          .t5-services-section { padding: 80px 32px !important; margin: 60px 16px !important; }
          .t5-about-section { padding: 80px 32px !important; }
          .t5-footer { padding: 80px 32px 40px !important; }
          .t5-cta-section { padding: 80px 32px !important; margin: 60px 16px !important; }
          .t5-section-padded { padding: 80px 32px !important; }
          .t5-testimonials-section { padding: 80px 32px !important; margin: 60px 16px !important; }
        }

        @media (max-width: 768px) {
          .t5-stat { display: none !important; }
          .t5-header-inner { padding: 0 16px !important; }
          .t5-company-name {
            font-size: clamp(14px, 4vw, 18px) !important;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: calc(100vw - 100px);
          }
          .t5-logo-wrap {
            max-width: calc(100vw - 100px);
            overflow: hidden;
          }
          .t5-hero-section { padding: 60px 20px 0 !important; min-height: auto !important; }
          .t5-hero-buttons { flex-direction: column !important; align-items: center !important; gap: 12px !important; }
          .t5-btn-primary, .t5-btn-secondary { width: 100%; max-width: 320px; justify-content: center; }

          .t5-services-section { padding: 60px 20px !important; margin: 40px 12px !important; border-radius: 0px !important; }
          .t5-about-section { padding: 60px 20px !important; }
          .t5-about-inner { flex-direction: column !important; gap: 40px !important; }
          .t5-about-image-wrap { flex: unset !important; width: 100% !important; }
          .t5-about-text { flex: unset !important; width: 100% !important; }
          .t5-section-padded { padding: 60px 20px !important; }
          .t5-testimonials-section { padding: 60px 20px !important; margin: 40px 12px !important; border-radius: 0px !important; }
          .t5-cta-section { padding: 72px 20px !important; margin: 40px 12px !important; border-radius: 0px !important; }

          .t5-footer { padding: 60px 20px 32px !important; }
          .t5-footer-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .t5-footer-bottom { flex-direction: column !important; text-align: center !important; gap: 8px !important; }

          .t5-pricing-featured-wrap { transform: none !important; }
          .t5-faq summary { font-size: 14px !important; padding: 18px 20px !important; }
          .t5-faq > div { padding: 0 20px 20px !important; }
          .t5-pillars { gap: 16px !important; }
        }

        @media (max-width: 480px) {
          .t5-hero-section { padding: 48px 16px 0 !important; }
          .t5-services-section { padding: 48px 16px !important; margin: 32px 8px !important; }
          .t5-about-section { padding: 48px 16px !important; }
          .t5-section-padded { padding: 48px 16px !important; }
          .t5-testimonials-section { padding: 48px 16px !important; margin: 32px 8px !important; }
          .t5-cta-section { padding: 56px 16px !important; margin: 32px 8px !important; }
          .t5-footer { padding: 48px 16px 28px !important; }
          .t5-badge { font-size: 9px !important; padding: 6px 14px !important; }
          .t5-header-inner { padding: 0 16px !important; }
        }
      `}</style>

      <div className="t5-root" style={{ minHeight: "100vh" }}>

        {/* ══════════════════════════════════════════════════
            HEADER
        ══════════════════════════════════════════════════ */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease }}
          style={{
            position: "sticky", top: 0, zIndex: 50,
            background: "rgba(10,10,15,0.90)",
            backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 4px 30px rgba(255,255,255,0.04)",
          }}
        >
          <div
            className="t5-header-inner"
            style={{
              maxWidth: 1280, margin: "0 auto",
              padding: "0 40px", height: 68,
              display: "flex", alignItems: "center", justifyBetween: "space-between",
              justifyContent: "space-between", gap: 12, minWidth: 0,
            }}
          >
            <nav className="t5-desktop-nav" style={{ gap: 40 }}>
              <a href="#home" className="t5-nav-link">Home</a>
              <a href="#about" className="t5-nav-link">About</a>
            </nav>

            <div className="t5-logo-wrap" style={{ minWidth: 0, flexShrink: 1 }}>
              {headerType === "Image" ? (
                logoUrl && typeof logoUrl === "string" && logoUrl.trim() !== "" ? (
                  <div style={{ position: "relative", height: 28, width: 120 }}>
                    <Image src={logoUrl} alt={displayName} fill style={{ objectFit: "contain" }} />
                  </div>
                ) : (
                  <div style={{ width: 34, height: 34, background: "linear-gradient(135deg,#00E5FF,#FF0055)", display: "flex", alignItems: "center", justifyContent: "center", color: "#05050A", fontSize: 13, fontWeight: 800, fontFamily: "'Space Grotesk',sans-serif" }}>
                    {displayName[0]}
                  </div>
                )
              ) : (
                <span className="t5-display t5-company-name" style={{ fontSize: companyNameFontSize ? `${companyNameFontSize}px` : 22, fontWeight: 500, color: "#FAFAFA", letterSpacing: "-0.01em" }}>
                  {displayName}
                </span>
              )}
            </div>

            <nav className="t5-desktop-nav" style={{ gap: 30, alignItems: "center" }}>
              <a href="#services" className="t5-nav-link">Expertise</a>
              <a href="#contact" className="t5-nav-link">Connect</a>
              <div style={{ position: "relative", display: "flex", alignItems: "center", marginLeft: 10 }}>
                <input 
                  type="text" 
                  placeholder={data?.headerInputPlaceholder || "Search..."} 
                  style={{ 
                    background: "rgba(15,15,25,0.6)", 
                    border: "1px solid rgba(0,229,255,0.3)", 
                    borderRadius: "4px", 
                    padding: "8px 16px", 
                    color: "#FAFAFA", 
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "13px",
                    outline: "none",
                    width: "160px",
                    boxShadow: "0 0 10px rgba(0,229,255,0.15)",
                    transition: "all 0.3s ease"
                  }} 
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(0,229,255,0.8)";
                    e.target.style.boxShadow = "0 0 15px rgba(0,229,255,0.4)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(0,229,255,0.3)";
                    e.target.style.boxShadow = "0 0 10px rgba(0,229,255,0.15)";
                  }}
                />
              </div>
            </nav>

            <button
              className={`t5-hamburger ${mobileMenuOpen ? "open" : ""}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </motion.header>

        {/* Mobile Menu Drawer */}
        <div className={`t5-mobile-menu ${mobileMenuOpen ? "open" : ""}`} aria-hidden={!mobileMenuOpen}>
          <nav>
            {[["#home", "Home"], ["#about", "About"], ["#services", "Expertise"], ["#contact", "Connect"]].map(([href, label]) => (
              <a
                key={label}
                href={href}
                className="t5-mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        {/* ══════════════════════════════════════════════════
            MAIN
        ══════════════════════════════════════════════════ */}
        <main id="home">

          {/* ── HERO (50/50 Split Layout) ────────────────────── */}
          <section
            ref={heroRef}
            className="t5-hero-section"
            style={{ padding: "100px 40px 60px", overflow: "hidden", position: "relative", minHeight: "90vh", display: "flex", alignItems: "center" }}
          >
            {/* Ambient blobs */}
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: -1, overflow: "hidden" }}>
              {/* Dynamic Gradient Blobs */}
              <motion.div
                animate={{ 
                  x: ["0%", "60%", "-20%", "0%"],
                  y: ["0%", "30%", "60%", "0%"],
                  scale: [1, 1.4, 0.8, 1]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ position: "absolute", top: "5%", left: "10%", width: 400, height: 400, background: "radial-gradient(circle, rgba(0,229,255,0.25) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(60px)" }}
              />
              <motion.div
                animate={{ 
                  x: ["0%", "-50%", "30%", "0%"],
                  y: ["0%", "50%", "-20%", "0%"],
                  scale: [1, 0.9, 1.3, 1]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                style={{ position: "absolute", top: "15%", right: "10%", width: 450, height: 450, background: "radial-gradient(circle, rgba(255,0,85,0.2) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(60px)" }}
              />
              
              {/* Bouncing / Floating Solid Balls */}
              <motion.div
                animate={{ 
                  y: ["-30px", "30px", "-30px"],
                  rotate: [0, 45, 0]
                }}
                transition={{ y: { duration: 5, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 15, repeat: Infinity, ease: "linear" } }}
                style={{ 
                  position: "absolute", top: "25%", left: "8%", width: 80, height: 80, 
                  background: "linear-gradient(135deg, #00E5FF, #B026FF)", borderRadius: "50%", 
                  boxShadow: "0 0 30px rgba(0,229,255,0.4), inset -10px -10px 20px rgba(0,0,0,0.6), inset 10px 10px 20px rgba(255,255,255,0.3)" 
                }}
              />
              <motion.div
                animate={{ 
                  y: ["40px", "-40px", "40px"],
                  rotate: [0, -90, 0]
                }}
                transition={{ y: { duration: 7, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 20, repeat: Infinity, ease: "linear" } }}
                style={{ 
                  position: "absolute", bottom: "20%", right: "12%", width: 120, height: 120, 
                  background: "linear-gradient(135deg, #FF0055, #FFD700)", borderRadius: "30%", 
                  boxShadow: "0 0 40px rgba(255,0,85,0.3), inset -15px -15px 25px rgba(0,0,0,0.5), inset 15px 15px 25px rgba(255,255,255,0.2)" 
                }}
              />
            </div>

            <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 10, width: "100%" }}>
              <div className="t5-about-inner" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "60px", justifyContent: "space-between" }}>
                
                {/* Left Col: Text */}
                <div className="t5-about-text" style={{ flex: "1 1 520px", textAlign: "left" }}>
                  <motion.div
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, ease }}
                    style={{ marginBottom: 32 }}
                  >
                    <span className="t5-badge">Hyper-Scale Neural Architecture</span>
                  </motion.div>

                  <div style={{ marginBottom: 24, overflow: "hidden" }}>
                    <SplitReveal
                      text={heroTitle || "Scaling business through elegant logic."}
                      tag="h1"
                      className="t5-display"
                      delay={0.1}
                      style={{
                        fontSize: heroTitleFontSize ? `${heroTitleFontSize}px` : "clamp(38px,6vw,80px)",
                        fontWeight: 700, color: "#FAFAFA",
                        lineHeight: 1.1, letterSpacing: "-0.02em",
                        maxWidth: 650,
                      }}
                    />
                  </div>

                  <motion.p
                    initial={{ opacity: 0, x: -40, filter: "blur(6px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, ease, delay: 0.35 }}
                    style={{ fontSize: taglineFontSize ? `${taglineFontSize}px` : "clamp(14px,1.8vw,16px)", color: "#A1A1AA", lineHeight: 1.7, maxWidth: 540, marginBottom: 40, fontWeight: 400 }}
                  >
                    {tagline || "Redefining efficiency and strategic execution with custom tools built for enterprise scale."}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease, delay: 0.45 }}
                    className="t5-hero-buttons"
                    style={{ display: "flex", gap: 16, flexWrap: "wrap" }}
                  >
                    <button className="t5-btn-primary">
                      <span>Get Started</span>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                    <button className="t5-btn-secondary" style={{ color: "#FAFAFA", borderColor: "rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.05)" }}>Learn More</button>
                  </motion.div>
                </div>

                {/* Right Col: Image */}
                <motion.div
                  initial={{ opacity: 0, y: 60, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1.1, ease, delay: 0.55 }}
                  className="t5-about-image-wrap"
                  style={{ flex: "1 1 450px", position: "relative" }}
                >
                  <div style={{ position: "absolute", inset: -30, background: "radial-gradient(ellipse,rgba(0,229,255,0.12) 0%,rgba(176,38,255,0.08) 40%,transparent 70%)", pointerEvents: "none" }} />
                  <motion.div style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}>
                    <div style={{ overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 40px 120px rgba(0,229,255,0.18)", aspectRatio: "4/3", position: "relative" }}>
                      <Image
                        src={(heroImage && typeof heroImage === "string" && heroImage.trim() !== "") ? heroImage : "/images/templates/template-img-21.jpg"}
                        alt={`${displayName} Platform`}
                        fill style={{ objectFit: "cover" }}
                      />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,5,10,0.4) 0%, transparent 50%)", pointerEvents: "none" }} />
                    </div>
                  </motion.div>
                </motion.div>

              </div>
            </div>

              {/* Foreground Animated Curved Lines (Pink & Blue) */}
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.9, zIndex: 20, pointerEvents: "none" }}>
                <defs>
                  <linearGradient id="curveBlue" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor="#00E5FF" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                  <linearGradient id="curvePink" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor="#FF0055" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                {[
                  { d: "M-10 20 C 30 10, 70 40, 110 30", grad: "curveBlue", duration: 12, delay: 0 },
                  { d: "M-10 40 C 40 60, 60 20, 110 50", grad: "curvePink", duration: 15, delay: 2 },
                  { d: "M-10 60 C 20 80, 80 40, 110 70", grad: "curveBlue", duration: 10, delay: 4 },
                  { d: "M-10 80 C 50 90, 50 10, 110 40", grad: "curvePink", duration: 18, delay: 1 },
                  { d: "M-10 10 C 20 50, 80 10, 110 20", grad: "curveBlue", duration: 14, delay: 3 },
                  { d: "M-10 50 C 30 20, 70 80, 110 60", grad: "curvePink", duration: 11, delay: 5 },
                  { d: "M-10 30 C 40 10, 60 90, 110 80", grad: "curveBlue", duration: 16, delay: 0.5 },
                  { d: "M-10 70 C 20 30, 80 60, 110 90", grad: "curvePink", duration: 13, delay: 2.5 }
                ].map((curve, i) => (
                  <motion.path
                    key={i}
                    d={curve.d}
                    fill="none"
                    stroke={`url(#${curve.grad})`}
                    strokeWidth="0.8"
                    initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
                    animate={{ pathLength: [0, 0.4, 0], pathOffset: [0, 0.6, 1], opacity: [0, 1, 0] }}
                    transition={{ 
                      duration: curve.duration, 
                      repeat: Infinity, 
                      ease: "linear",
                      delay: curve.delay
                    }}
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </svg>

          </section>

          {/* ── ABOUT ─────────────────────────────────────── */}
          <section
            id="about"
            className="t5-about-section"
            style={{ padding: "120px 40px", scrollMarginTop: 80, position: "relative", overflow: "hidden" }}
          >
            <div style={{ position: "absolute", top: "30%", right: "-10%", width: 500, height: 500, background: "radial-gradient(ellipse,rgba(192,38,211,0.07) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

            <div
              className="t5-about-inner"
              style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: "80px" }}
            >
              {/* Left Col: Image */}
              <motion.div
                variants={slideLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="t5-about-image-wrap"
                style={{ flex: "1 1 400px", position: "relative" }}
              >
                {/* Stat box */}
                <motion.div
                  className="t5-stat"
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease, delay: 0.3 }}
                >
                  <div className="t5-display t5-shimmer-text" style={{ fontSize: 42, lineHeight: 1, marginBottom: 6 }}>99.8%</div>
                  <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#A1A1AA", lineHeight: 1.5, fontFamily: "'Space Grotesk',sans-serif" }}>Process Integrity<br />Accuracy</div>
                </motion.div>

                <motion.div
                  style={{
                    position: "relative", width: "100%", aspectRatio: "4/3",
                    overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)",
                    boxShadow: "0 28px 70px rgba(255,255,255,0.10)",
                  }}
                  whileHover={{ scale: 1.02, boxShadow: "0 36px 90px rgba(13,148,136,0.14)" }}
                  transition={{ duration: 0.5, ease }}
                >
                  <Image
                    src={(aboutUsImage && typeof aboutUsImage === "string" && aboutUsImage.trim() !== "") ? aboutUsImage : "/images/templates/template-img-22.jpg"}
                    alt="About our methods" fill style={{ objectFit: "cover" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(13,148,136,0.08) 0%,rgba(79,70,229,0.06) 100%)", pointerEvents: "none" }} />
                </motion.div>
              </motion.div>

              {/* Right Col: Text */}
              <div className="t5-about-text" style={{ flex: "1 1 380px" }}>
                <motion.span
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  className="t5-label t5-grad-rose-amber"
                  style={{ display: "block" }}
                >
                  Philosophy
                </motion.span>

                <SplitReveal
                  text={aboutUsTitle || "Mastering scale and speed."}
                  className="t5-display"
                  delay={0.05}
                  style={{
                    fontSize: aboutUsTitleFontSize ? `${aboutUsTitleFontSize}px` : "clamp(28px,4vw,52px)",
                    fontWeight: 600, color: "#FAFAFA", letterSpacing: "-0.02em", lineHeight: 1.12, marginBottom: 28,
                  }}
                />

                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease, delay: 0.2 }}
                  style={{ transformOrigin: "left", width: 56, height: 2, background: "linear-gradient(90deg,#00E5FF,#FF0055,rgba(124,58,237,0))", marginBottom: 28 }}
                />

                <motion.p
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
                  style={{ fontSize: aboutUsContentFontSize ? `${aboutUsContentFontSize}px` : "clamp(14px,1.5vw,16px)", color: "#A1A1AA", lineHeight: 1.78, marginBottom: 44 }}
                >
                  {aboutUsContent || "We engineer products that allow modern operations to expand exponentially. We streamline workflows and simplify architecture to allow frictionless scalability."}
                </motion.p>

                <motion.div
                  variants={slideLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  className="t5-pillars"
                  style={{ display: "flex", gap: 28, flexWrap: "wrap" }}
                >
                  {[
                    { label: "Quantum Scale", color: COLORS.cyan.main },
                    { label: "Kinetic Fuel", color: COLORS.pink.main },
                    { label: "Neural Glow", color: COLORS.purple.main },
                    { label: "Plasma Core", color: COLORS.violet.main },
                  ].map(({ label, color }) => (
                    <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, display: "block" }} />
                      <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "#71717A", fontFamily: "'Space Grotesk',sans-serif" }}>{label}</span>
                    </div>
                  ))}
                </motion.div>
              </div>

            </div>
          </section>

          {/* ── PORTFOLIO (Moved Up) ────────────────────────── */}
          {data?.portfolio && data.portfolio.length > 0 && (
            <section id="portfolio" className="t5-section-padded" style={{ padding: "120px 40px", background: "#07070A", scrollMarginTop: 80 }}>
              <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 72 }}>
                  <span className="t5-label t5-grad-blue-violet" style={{ justifyContent: "center" }}>Case Studies</span>
                  <SplitReveal text="Selected Deployments" className="t5-heading" delay={0} style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 700, color: "#FAFAFA", letterSpacing: "-0.02em", justifyContent: "center" }} />
                </motion.div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,300px),1fr))", gap: 24 }}>
                  {data.portfolio.map((item, idx) => (
                    <motion.a
                      key={idx}
                      custom={idx}
                      variants={slideLeft}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      href={item.link || "#"}
                      className="t5-card"
                      style={{ display: "block", textDecoration: "none", color: "inherit" }}
                      whileHover={{ y: -8, boxShadow: "0 28px 72px rgba(13,148,136,0.13)" }}
                    >
                      <div style={{ position: "relative", height: 240, background: "#12121A", overflow: "hidden" }}>
                        {item.image && <Image src={item.image} alt={item.title || item.name} fill style={{ objectFit: "cover" }} />}
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(255,255,255,0.15) 0%,transparent 60%)", pointerEvents: "none" }} />
                      </div>
                      <div style={{ padding: "28px 32px" }}>
                        <h4 style={{ fontSize: 17, fontWeight: 700, color: "#FAFAFA", marginBottom: 8, letterSpacing: "-0.01em", fontFamily: "'Space Grotesk',sans-serif" }}>{item.title || item.name}</h4>
                        <p style={{ fontSize: 13.5, color: "#A1A1AA", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── FEATURES ─────────────────────────────────── */}
          {data?.features && data.features.length > 0 && (
            <section id="features" className="t5-section-padded" style={{ padding: "120px 40px", background: "linear-gradient(180deg,#05050A 0%,rgba(10,10,15,0.8) 100%)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", scrollMarginTop: 80 }}>
              <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 72 }}>
                  <span className="t5-label t5-grad-emerald-blue" style={{ justifyContent: "center" }}>Capabilities</span>
                  <SplitReveal text="System Architecture" className="t5-heading" delay={0} style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 700, color: "#FAFAFA", letterSpacing: "-0.02em", justifyContent: "center" }} />
                </motion.div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,260px),1fr))", gap: 20 }}>
                  {data.features.map((feature, idx) => {
                    const accent = CARD_ACCENTS[idx % CARD_ACCENTS.length];
                    return (
                      <motion.div
                        key={idx}
                        custom={idx}
                        variants={scaleIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="t5-card"
                        style={{ padding: "48px 40px", textAlign: "center" }}
                        whileHover={{ y: -8, boxShadow: `0 28px 72px ${accent.glow}` }}
                      >
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${accent.main},transparent)` }} />
                        <div style={{ width: 56, height: 56, background: accent.soft, borderRadius: 0, margin: "0 auto 28px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, border: `1px solid ${accent.main}22`, position: "relative" }}>
                          {feature.icon ? <Image src={feature.icon} alt={feature.title} fill style={{ objectFit: "cover" }} /> : "✦"}
                        </div>
                        <h4 style={{ fontSize: 18, fontWeight: 700, color: "#FAFAFA", marginBottom: 12, letterSpacing: "-0.01em", fontFamily: "'Space Grotesk',sans-serif" }}>{feature.title}</h4>
                        <p style={{ fontSize: 14, color: "#A1A1AA", lineHeight: 1.68, margin: 0 }}>{feature.desc}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* ── TESTIMONIALS (Moved Up) ─────────────────────── */}
          {data?.testimonials && data.testimonials.length > 0 && (
            <section
              id="testimonials"
              className="t5-testimonials-section t5-glass-section"
              style={{ padding: "120px 40px", scrollMarginTop: 80, position: "relative", overflow: "hidden" }}
            >
              <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, background: "radial-gradient(ellipse,rgba(13,148,136,0.09) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: -80, left: -80, width: 350, height: 350, background: "radial-gradient(ellipse,rgba(192,38,211,0.07) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
              <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 72 }}>
                  <span className="t5-label t5-grad-blue-violet" style={{ justifyContent: "center" }}>Partnership</span>
                  <SplitReveal text="Client Alignment" className="t5-heading" delay={0} style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 700, color: "#FAFAFA", letterSpacing: "-0.02em", justifyContent: "center" }} />
                </motion.div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,340px),1fr))", gap: 24 }}>
                  {data.testimonials.map((testi, idx) => (
                    <motion.div
                      key={idx}
                      custom={idx}
                      variants={slideLeft}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="t5-card"
                      style={{ padding: 48 }}
                      whileHover={{ y: -6, boxShadow: `0 24px 64px ${CARD_ACCENTS[idx % CARD_ACCENTS.length].glow}` }}
                    >
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${CARD_ACCENTS[idx % CARD_ACCENTS.length].main},transparent)` }} />
                      <div className="t5-display" style={{ fontSize: 52, lineHeight: 1, marginBottom: 20, fontStyle: "italic" }}>
                        <span className={idx % 2 === 0 ? "t5-grad-blue-violet" : "t5-grad-rose-amber"}>"</span>
                      </div>
                      <p style={{ fontSize: 16, color: "#D4D4D8", lineHeight: 1.74, marginBottom: 36, fontStyle: "italic" }}>{testi.review}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <div style={{ width: 48, height: 48, overflow: "hidden", border: `2px solid ${CARD_ACCENTS[idx % CARD_ACCENTS.length].soft}`, flexShrink: 0, position: "relative", background: "#12121A" }}>
                          {testi.image ? <Image src={testi.image} alt={testi.name} fill style={{ objectFit: "cover" }} /> : null}
                        </div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: "#FAFAFA", fontFamily: "'Space Grotesk',sans-serif" }}>{testi.name}</div>
                          <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: CARD_ACCENTS[idx % CARD_ACCENTS.length].main, marginTop: 2, fontFamily: "'Space Grotesk',sans-serif" }}>{testi.role}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── PRICING ──────────────────────────────────── */}
          {data?.pricing && data.pricing.length > 0 && (
            <section id="pricing" className="t5-section-padded" style={{ padding: "120px 40px", background: "linear-gradient(180deg,#05050A 0%,#07070A 100%)", scrollMarginTop: 80 }}>
              <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 72 }}>
                  <span className="t5-label t5-grad-emerald-blue" style={{ justifyContent: "center" }}>Structures</span>
                  <SplitReveal text="Frictionless Packages" className="t5-heading" delay={0} style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 700, color: "#FAFAFA", letterSpacing: "-0.02em", justifyContent: "center" }} />
                </motion.div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,280px),1fr))", gap: 20, alignItems: "center" }}>
                  {data.pricing.map((plan, idx) => {
                    const featuresList = plan.features ? plan.features.split(",").map(f => f.trim()) : [];
                    const isFeatured = idx === 1;
                    return (
                      <motion.div
                        key={idx}
                        custom={idx}
                        variants={scaleIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className={`${isFeatured ? "t5-pricing-featured" : "t5-card"} ${isFeatured ? "t5-pricing-featured-wrap" : ""}`}
                        style={{ padding: "48px 40px", position: "relative", ...(isFeatured ? { transform: "scale(1.04)", zIndex: 10 } : {}) }}
                        whileHover={!isFeatured ? { y: -8, boxShadow: `0 28px 72px ${CARD_ACCENTS[idx % CARD_ACCENTS.length].glow}` } : {}}
                      >
                        {!isFeatured && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${CARD_ACCENTS[idx % CARD_ACCENTS.length].main},transparent)` }} />}
                        {isFeatured && (
                          <>
                            <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#00E5FF,#FF0055)", color: "#05050A", padding: "6px 20px", fontSize: 9.5, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", whiteSpace: "nowrap", fontFamily: "'Space Grotesk',sans-serif", boxShadow: "0 8px 24px rgba(13,148,136,0.3)" }}>Most Popular</div>
                            <div style={{ position: "absolute", top: -80, right: -80, width: 280, height: 280, background: "radial-gradient(ellipse,rgba(234,88,12,0.3) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
                          </>
                        )}
                        <h4 style={{ fontSize: 14, fontWeight: 700, color: isFeatured ? "rgba(20,20,30,0.5)" : "#A1A1AA", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12, fontFamily: "'Space Grotesk',sans-serif" }}>{plan.planName}</h4>
                        <div className="t5-display" style={{ fontSize: 52, fontWeight: 600, color: isFeatured ? "#0A0A0F" : "#FAFAFA", marginBottom: 36, letterSpacing: "-0.02em" }}>{plan.price}</div>
                        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 36px", display: "flex", flexDirection: "column", gap: 14 }}>
                          {featuresList.map((f, i) => (
                            <li key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: isFeatured ? "rgba(20,20,30,0.72)" : "#A1A1AA" }}>
                              <span style={{ width: 18, height: 18, borderRadius: "50%", background: isFeatured ? "rgba(20,20,30,0.1)" : COLORS.cyan.soft, border: `1px solid ${isFeatured ? "rgba(20,20,30,0.2)" : COLORS.cyan.main + "33"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 9, color: isFeatured ? "#05050A" : COLORS.cyan.main }}>✓</span>
                              {f}
                            </li>
                          ))}
                        </ul>
                        <button
                          style={{
                            width: "100%", padding: "14px 0",
                            fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
                            cursor: "pointer", transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
                            background: isFeatured ? "linear-gradient(135deg,#0A0A0F,rgba(20,20,30,0.9))" : "linear-gradient(135deg,#00E5FF,#FF0055)",
                            color: isFeatured ? "#FAFAFA" : "#05050A",
                            border: "none",
                            boxShadow: isFeatured ? "0 12px 32px rgba(20,20,30,0.15)" : "0 14px 40px rgba(13,148,136,0.3)",
                            fontFamily: "'Space Grotesk',sans-serif",
                          }}
                        >
                          {plan.buttonText || "Get Started"}
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* ── TEAM ─────────────────────────────────────── */}
          {data?.team && data.team.length > 0 && (
            <section id="team" className="t5-section-padded" style={{ padding: "120px 40px", background: "#05050A", borderTop: "1px solid rgba(255,255,255,0.05)", scrollMarginTop: 80 }}>
              <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 72 }}>
                  <span className="t5-label t5-grad-rose-amber" style={{ justifyContent: "center" }}>Pioneers</span>
                  <SplitReveal text="Core Operators" className="t5-heading" delay={0} style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 700, color: "#FAFAFA", letterSpacing: "-0.02em", justifyContent: "center" }} />
                </motion.div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,220px),1fr))", gap: 20 }}>
                  {data.team.map((member, idx) => (
                    <motion.div
                      key={idx}
                      custom={idx}
                      variants={scaleIn}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="t5-card"
                      style={{ padding: "40px 32px", textAlign: "center" }}
                      whileHover={{ y: -8, boxShadow: `0 24px 60px ${CARD_ACCENTS[idx % CARD_ACCENTS.length].glow}` }}
                    >
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${CARD_ACCENTS[idx % CARD_ACCENTS.length].main},transparent)` }} />
                      <div style={{ width: 88, height: 88, overflow: "hidden", margin: "0 auto 20px", border: `2px solid ${CARD_ACCENTS[idx % CARD_ACCENTS.length].soft}`, position: "relative", background: "#12121A" }}>
                        {member.image ? <Image src={member.image} alt={member.name} fill style={{ objectFit: "cover" }} /> : null}
                      </div>
                      <h4 style={{ fontSize: 16, fontWeight: 700, color: "#FAFAFA", marginBottom: 4, fontFamily: "'Space Grotesk',sans-serif" }}>{member.name}</h4>
                      <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: CARD_ACCENTS[idx % CARD_ACCENTS.length].main, marginBottom: 14, fontFamily: "'Space Grotesk',sans-serif" }}>{member.role}</p>
                      <p style={{ fontSize: 13.5, color: "#A1A1AA", lineHeight: 1.65, margin: 0 }}>{member.bio}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── FAQ ──────────────────────────────────────── */}
          {data?.faq && data.faq.length > 0 && (
            <section id="faq" className="t5-section-padded" style={{ padding: "120px 40px", background: "linear-gradient(180deg,#07070A,#0A0A0F)", borderTop: "1px solid rgba(255,255,255,0.05)", scrollMarginTop: 80 }}>
              <div style={{ maxWidth: 760, margin: "0 auto" }}>
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 64 }}>
                  <span className="t5-label t5-grad-rose-amber" style={{ justifyContent: "center" }}>FAQ</span>
                  <SplitReveal text="System Inquiries" className="t5-heading" delay={0} style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 700, color: "#FAFAFA", letterSpacing: "-0.02em", justifyContent: "center" }} />
                </motion.div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {data.faq.map((q, idx) => (
                    <motion.details
                      key={idx}
                      custom={idx}
                      variants={slideLeft}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="t5-faq"
                    >
                      <summary>{q.question}</summary>
                      <div style={{ padding: "0 28px 24px", fontSize: 14, color: "#A1A1AA", lineHeight: 1.72 }}>{q.answer}</div>
                    </motion.details>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── BLOG ─────────────────────────────────────── */}
          {data?.blog && data.blog.length > 0 && (
            <section id="blog" className="t5-section-padded" style={{ padding: "120px 40px", background: "#05050A", scrollMarginTop: 80 }}>
              <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 72 }}>
                  <span className="t5-label t5-grad-emerald-blue" style={{ justifyContent: "center" }}>Releases</span>
                  <SplitReveal text="Intel & Insights" className="t5-heading" delay={0} style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 700, color: "#FAFAFA", letterSpacing: "-0.02em", justifyContent: "center" }} />
                </motion.div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,300px),1fr))", gap: 24 }}>
                  {data.blog.map((post, idx) => (
                    <motion.a
                      key={idx}
                      custom={idx}
                      variants={slideLeft}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      href={post.link || "#"}
                      className="t5-card"
                      style={{ display: "block", textDecoration: "none", color: "inherit" }}
                      whileHover={{ y: -8, boxShadow: `0 28px 72px ${CARD_ACCENTS[idx % CARD_ACCENTS.length].glow}` }}
                    >
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${CARD_ACCENTS[idx % CARD_ACCENTS.length].main},transparent)` }} />
                      <div style={{ position: "relative", height: 220, background: "#12121A", overflow: "hidden" }}>
                        {post.image && <Image src={post.image} alt={post.title} fill style={{ objectFit: "cover" }} />}
                        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top,${CARD_ACCENTS[idx % CARD_ACCENTS.length].glow} 0%,transparent 60%)`, pointerEvents: "none" }} />
                      </div>
                      <div style={{ padding: "28px 32px" }}>
                        <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: CARD_ACCENTS[idx % CARD_ACCENTS.length].main, display: "block", marginBottom: 10, fontFamily: "'Space Grotesk',sans-serif" }}>{post.date}</span>
                        <h4 style={{ fontSize: 17, fontWeight: 700, color: "#FAFAFA", marginBottom: 10, letterSpacing: "-0.01em", lineHeight: 1.3, fontFamily: "'Space Grotesk',sans-serif" }}>{post.title}</h4>
                        <p style={{ fontSize: 14, color: "#A1A1AA", lineHeight: 1.65, marginBottom: 20, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{post.excerpt}</p>
                        <span style={{ fontSize: 11, fontWeight: 700, color: CARD_ACCENTS[idx % CARD_ACCENTS.length].main, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'Space Grotesk',sans-serif" }}>Read Release →</span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── CTA (Split Image Style) ────────────────────────── */}
          <section
            className="t5-cta-section"
            style={{
              margin: "80px 24px",
              background: "linear-gradient(135deg,#08001F 0%,#1C003D 50%,#00E5FF 100%)",
              position: "relative", overflow: "hidden",
              boxShadow: "0 32px 80px rgba(13,148,136,0.2)",
            }}
          >
            <div style={{ position: "absolute", top: -100, left: "-5%", width: 500, height: 500, background: "radial-gradient(ellipse,rgba(13,148,136,0.18) 0%,transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: -60, right: "-5%", width: 450, height: 450, background: "radial-gradient(ellipse,rgba(234,88,12,0.14) 0%,transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: -80, left: "30%", width: 400, height: 400, background: "radial-gradient(ellipse,rgba(192,38,211,0.1) 0%,transparent 70%)", pointerEvents: "none" }} />

            <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1, display: "flex", flexWrap: "wrap", alignItems: "center" }}>
              {/* Left Side: Content */}
              <div style={{ flex: "1 1 500px", padding: "80px 48px", textAlign: "left" }}>
                <motion.span
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease }}
                  className="t5-label"
                  style={{ color: "rgba(20,20,30,0.35)" }}
                >
                  Initiate
                </motion.span>

                <SplitReveal
                  text={data?.ctaTitle || "Ready to scale your business?"}
                  className="t5-display"
                  delay={0.05}
                  style={{ fontSize: "clamp(32px,5.5vw,64px)", fontWeight: 600, color: "#0A0A0F", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 24 }}
                />

                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease, delay: 0.25 }}
                  style={{ fontSize: "clamp(14px,1.5vw,16px)", color: "rgba(20,20,30,0.6)", lineHeight: 1.72, marginBottom: 48, maxWidth: 520 }}
                >
                  {data?.ctaDesc || "Join hundreds of fast-scaling teams utilizing our tailored structures and systems."}
                </motion.p>

                <motion.a
                  href={data?.ctaButtonLink || "#contact"}
                  className="t5-btn-primary"
                  style={{ display: "inline-flex" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease, delay: 0.35 }}
                  whileHover={{ y: -4, boxShadow: "0 20px 60px rgba(13,148,136,0.4)" }}
                >
                  <span>{data?.ctaButtonText || "Get Started"}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </motion.a>
              </div>

              {/* Right Side: Split Image */}
              <div className="t5-about-image-wrap" style={{ flex: "1 1 400px", alignSelf: "stretch", position: "relative", minHeight: 360, background: "rgba(0,0,0,0.15)" }}>
                <Image
                  src={(aboutUsImage && typeof aboutUsImage === "string" && aboutUsImage.trim() !== "") ? aboutUsImage : "/images/templates/template-img-22.jpg"}
                  alt="Scale representation"
                  fill style={{ objectFit: "cover" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(7,46,51,0.9) 0%, transparent 100%)", pointerEvents: "none" }} />
              </div>
            </div>
          </section>

        </main>

        {/* ══════════════════════════════════════════════════
            FOOTER
        ══════════════════════════════════════════════════ */}
        <footer
          id="contact"
          className="t5-footer"
          style={{
            padding: "100px 40px 48px",
            background: "#05050A",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 -4px 30px rgba(255,255,255,0.03)",
          }}
        >
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div
              className="t5-footer-grid"
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,200px),1fr))", gap: "64px 40px", marginBottom: 80 }}
            >
              {/* Brand */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                {headerType === "Image" && logoUrl && typeof logoUrl === "string" && logoUrl.trim() !== "" ? (
                  <div style={{ position: "relative", height: 24, width: 100, marginBottom: 24 }}>
                    <Image src={logoUrl} alt={displayName} fill style={{ objectFit: "contain", objectPosition: "left" }} />
                  </div>
                ) : (
                  <div className="t5-display" style={{ fontSize: 22, fontWeight: 500, color: "#FAFAFA", marginBottom: 20 }}>{displayName}</div>
                )}
                <p style={{ fontSize: 13.5, color: "#A1A1AA", lineHeight: 1.72 }}>
                  {footerAbout || "Redefining the digital landscape through elite strategy and creative excellence."}
                </p>
              </motion.div>

              {/* Quick Links */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}>
                <h4 className="t5-heading" style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#FAFAFA", marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>Links</h4>
                <nav style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[["#home", "Home"], ["#services", "Expertise"], ["#about", "About"], ["#contact", "Connect"]].map(([href, label]) => (
                    <a key={label} href={href} className="t5-nav-link" style={{ fontSize: 13.5, fontWeight: 400, letterSpacing: 0, textTransform: "none", color: "#A1A1AA" }}>{label}</a>
                  ))}
                </nav>
              </motion.div>

              {/* Contact */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}>
                <h4 className="t5-heading" style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#FAFAFA", marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>Contact</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {address && <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}><span style={{ fontSize: 14, marginTop: 1 }}>📍</span><p style={{ fontSize: 13.5, color: "#A1A1AA", lineHeight: 1.6, margin: 0 }}>{address}</p></div>}
                  {displayPhone && <div style={{ display: "flex", gap: 12, alignItems: "center" }}><span style={{ fontSize: 14 }}>📞</span><p style={{ fontSize: 13.5, color: "#A1A1AA", margin: 0 }}>{displayPhone}</p></div>}
                  {contactEmail && <div style={{ display: "flex", gap: 12, alignItems: "center" }}><span style={{ fontSize: 14 }}>✉️</span><p style={{ fontSize: 13.5, color: "#A1A1AA", margin: 0 }}>{contactEmail}</p></div>}
                </div>
              </motion.div>

              {/* Newsletter */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3}>
                <h4 className="t5-heading" style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#FAFAFA", marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                  {data?.newsletterTitle || "Subscribe"}
                </h4>
                <p style={{ fontSize: 13.5, color: "#A1A1AA", marginBottom: 16, lineHeight: 1.65 }}>{data?.newsletterDesc || "Subscribe for strategic updates."}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                  <input type="email" placeholder="your@email.com" className="t5-input" />
                  <button className="t5-btn-primary" style={{ justifyContent: "center" }}>
                    <span>Subscribe</span>
                  </button>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  {facebookUrl && (
                    <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="t5-social">
                      <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.324v-21.35c0-.732-.593-1.325-1.325-1.325z" /></svg>
                    </a>
                  )}
                  {twitterUrl && (
                    <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="t5-social">
                      <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57c-.885.392-1.83.656-2.825.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                    </a>
                  )}
                  {linkedinUrl && (
                    <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="t5-social">
                      <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                    </a>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Footer Bottom */}
            <div
              className="t5-footer-bottom"
              style={{ paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}
            >
              <span className="t5-heading" style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#71717A" }}>
                {footerCopyright || `© ${new Date().getFullYear()} ${displayName} / All Rights Reserved`}
              </span>
              <span className="t5-heading" style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#71717A" }}>
                Designed for the modern web
              </span>
            </div>
          </div>
        </footer>

      </div>
    </TemplateLayout>
  );
}
