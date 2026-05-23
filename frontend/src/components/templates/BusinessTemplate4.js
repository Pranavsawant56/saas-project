import TemplateLayout from "./TemplateLayout";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
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
  blue: { main: "#2563EB", soft: "rgba(37,99,235,0.10)", glow: "rgba(37,99,235,0.22)" },
  violet: { main: "#7C3AED", soft: "rgba(124,58,237,0.10)", glow: "rgba(124,58,237,0.22)" },
  rose: { main: "#E11D48", soft: "rgba(225,29,72,0.10)", glow: "rgba(225,29,72,0.22)" },
  amber: { main: "#D97706", soft: "rgba(217,119,6,0.10)", glow: "rgba(217,119,6,0.22)" },
  emerald: { main: "#059669", soft: "rgba(5,150,105,0.10)", glow: "rgba(5,150,105,0.22)" },
};
const CARD_ACCENTS = [COLORS.blue, COLORS.violet, COLORS.rose, COLORS.emerald];

export default function BusinessTemplate4({ data }) {
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

  const displayName = companyName || "Agency X";
  const displayPhone = phone ? `${countryCode ? countryCode.split(" ")[0] : ""} ${phone}` : phone;
  const displayServices = services && services.length > 0 && services.some(s => s.name || s.title || s.desc)
    ? services
    : [
      { title: service1_name || "Visual Identity", desc: service1_desc || "Building brands that resonate and endure through intentional design.", nameFontSize: service1_nameFontSize, descFontSize: service1_descFontSize },
      { title: service2_name || "Growth Strategy", desc: service2_desc || "Accelerating market velocity with data-led strategic thinking.", nameFontSize: service2_nameFontSize, descFontSize: service2_descFontSize },
      { title: service3_name || "Digital Products", desc: service3_desc || "Crafting interfaces that are elegant, fast, and purposeful.", nameFontSize: service3_nameFontSize, descFontSize: service3_descFontSize },
      { title: service4_name || "Web Architecture", desc: service4_desc || "Scalable foundations engineered for performance and longevity.", nameFontSize: service4_nameFontSize, descFontSize: service4_descFontSize },
    ];

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.75], [1, 0.96]);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") setMobileMenuOpen(false); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <TemplateLayout data={data} theme="light" category="Business" hideHeader={true} hideFooter={true}>

      {/* ─── GLOBAL STYLES ──────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .t4-root {
          font-family: 'DM Sans', sans-serif;
          background: #F8F8F6;
          color: #111111;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          overflow-x: hidden;
        }

        /* ── Typography ── */
        .t4-display { font-family: 'Playfair Display', serif; }
        .t4-heading { font-family: 'Syne', sans-serif; }
        .t4-body    { font-family: 'DM Sans', sans-serif; }

        /* ── Badge ── */
        .t4-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 20px;
          border: 1.5px solid rgba(37,99,235,0.25);
          border-radius: 999px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
          color: #2563EB;
          background: rgba(37,99,235,0.06);
          font-family: 'Syne', sans-serif;
        }
        .t4-badge::before {
          content:''; width:6px; height:6px; border-radius:50%;
          background: linear-gradient(135deg,#2563EB,#7C3AED);
          display:block; animation: pulse-dot 2s ease infinite;
        }
        @keyframes pulse-dot {
          0%,100%{ opacity:1; transform:scale(1); }
          50%{ opacity:0.5; transform:scale(0.7); }
        }

        /* ── Nav link ── */
        .t4-nav-link {
          font-family: 'Syne', sans-serif;
          font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
          color: #6B7280; text-decoration: none;
          transition: color 0.25s ease; position: relative;
        }
        .t4-nav-link::after {
          content:''; position:absolute; bottom:-4px; left:0; width:0; height:1.5px;
          background: linear-gradient(90deg,#2563EB,#7C3AED);
          transition: width 0.3s ease;
        }
        .t4-nav-link:hover { color:#111111; }
        .t4-nav-link:hover::after { width:100%; }

        /* ── Mobile nav link ── */
        .t4-mobile-nav-link {
          font-family: 'Syne', sans-serif;
          font-size: 15px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
          color: #111111; text-decoration: none;
          padding: 16px 0;
          border-bottom: 1px solid rgba(15,23,42,0.06);
          display: block;
          transition: color 0.25s ease;
        }
        .t4-mobile-nav-link:hover { color: #2563EB; }

        /* ── Buttons ── */
        .t4-btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 15px 34px;
          background: linear-gradient(135deg, #2563EB 0%, #7C3AED 100%);
          color: #FFF; border-radius: 999px;
          font-family: 'Syne', sans-serif;
          font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
          border: none; cursor: pointer; text-decoration: none;
          box-shadow: 0 14px 40px rgba(37,99,235,0.3);
          transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
          position: relative; overflow: hidden;
        }
        .t4-btn-primary::before {
          content:''; position:absolute; inset:0;
          background: linear-gradient(135deg,#7C3AED 0%,#E11D48 100%);
          opacity:0; transition: opacity 0.4s ease;
        }
        .t4-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 20px 52px rgba(124,58,237,0.38); }
        .t4-btn-primary:hover::before { opacity:1; }
        .t4-btn-primary span, .t4-btn-primary svg { position:relative; z-index:1; }

        .t4-btn-secondary {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 34px;
          background: rgba(255,255,255,0.8);
          backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
          color: #111111; border-radius: 999px;
          font-family: 'Syne', sans-serif;
          font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
          border: 1.5px solid rgba(15,23,42,0.08);
          cursor: pointer; text-decoration: none;
          box-shadow: 0 8px 24px rgba(15,23,42,0.06);
          transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .t4-btn-secondary:hover {
          background: #fff; border-color: rgba(37,99,235,0.2);
          transform: translateY(-3px); box-shadow: 0 14px 36px rgba(15,23,42,0.1);
        }

        /* ── Cards ── */
        .t4-card {
          background: rgba(255,255,255,0.78);
          backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(15,23,42,0.07);
          border-radius: 20px;
          transition: all 0.42s cubic-bezier(0.22,1,0.36,1);
          position: relative; overflow: hidden;
        }
        .t4-card:hover { transform: translateY(-7px); }

        /* ── Section label ── */
        .t4-label {
          font-family: 'Syne', sans-serif;
          font-size: 10px; font-weight: 800; letter-spacing: 0.28em; text-transform: uppercase;
          display: inline-flex; align-items: center; gap: 10px;
          margin-bottom: 20px;
        }
        .t4-label::before {
          content:''; display:block; width:24px; height:1.5px;
          background: currentColor; border-radius:2px;
        }

        /* ── Gradient text ── */
        .t4-grad-blue-violet {
          background: linear-gradient(135deg,#2563EB 0%,#7C3AED 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .t4-grad-rose-amber {
          background: linear-gradient(135deg,#E11D48 0%,#D97706 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .t4-grad-emerald-blue {
          background: linear-gradient(135deg,#059669 0%,#2563EB 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        /* ── Input ── */
        .t4-input {
          width:100%; padding: 14px 20px;
          background: rgba(255,255,255,0.7); backdrop-filter:blur(12px);
          border: 1.5px solid rgba(15,23,42,0.08); border-radius:12px;
          font-size: 14px; color:#111111; font-family:'DM Sans',sans-serif;
          outline:none; transition: all 0.3s ease;
        }
        .t4-input:focus { border-color:rgba(37,99,235,0.35); box-shadow: 0 0 0 4px rgba(37,99,235,0.07); }
        .t4-input::placeholder { color:#9CA3AF; }

        /* ── Social ── */
        .t4-social {
          width:40px; height:40px; border-radius:50%;
          background: rgba(255,255,255,0.7); backdrop-filter:blur(12px);
          border: 1px solid rgba(15,23,42,0.08);
          display:flex; align-items:center; justify-content:center;
          color:#6B7280; text-decoration:none;
          transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .t4-social:hover {
          background: linear-gradient(135deg,#2563EB 0%,#7C3AED 100%);
          color:#FFF; border-color:transparent;
          transform:translateY(-3px); box-shadow:0 12px 30px rgba(37,99,235,0.28);
        }

        /* ── FAQ ── */
        .t4-faq {
          background: rgba(255,255,255,0.78); backdrop-filter:blur(18px);
          border: 1px solid rgba(15,23,42,0.07); border-radius:16px;
          overflow:hidden; transition: all 0.35s ease;
        }
        .t4-faq[open] { border-color:rgba(37,99,235,0.18); box-shadow:0 12px 40px rgba(37,99,235,0.08); }
        .t4-faq summary {
          padding:22px 28px; font-size:15px; font-weight:600; font-family:'Syne',sans-serif;
          color:#111111; cursor:pointer; outline:none; user-select:none;
          list-style:none; display:flex; justify-content:space-between; align-items:center;
          transition:color 0.25s;
        }
        .t4-faq summary:hover { color:#2563EB; }
        .t4-faq summary::-webkit-details-marker { display:none; }
        .t4-faq summary::after {
          content:'+'; font-size:22px; font-weight:300; color:#9CA3AF;
          transition:transform 0.35s cubic-bezier(0.22,1,0.36,1);
          flex-shrink: 0; margin-left: 12px;
        }
        .t4-faq[open] summary::after { transform:rotate(45deg); color:#2563EB; }

        /* ── Pricing featured ── */
        .t4-pricing-featured {
          background: linear-gradient(145deg,#0F172A 0%,#1E1B4B 60%,#1E293B 100%);
          color:#FAFAF8;
        }

        /* ── Stat box ── */
        .t4-stat {
          position:absolute; top:-32px; left:-32px; width:155px; padding:22px 20px;
          background:rgba(255,255,255,0.95); backdrop-filter:blur(24px);
          border:1.5px solid rgba(255,255,255,0.6); border-radius:20px;
          box-shadow:0 24px 60px rgba(15,23,42,0.14); z-index:20;
        }

        /* ── Hamburger button — DESKTOP: hidden, MOBILE: visible ── */
        .t4-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 8px;
          border: none;
          background: transparent;
          border-radius: 8px;
          transition: background 0.2s ease;
          z-index: 60;
        }
        .t4-hamburger:hover { background: rgba(15,23,42,0.05); }
        .t4-hamburger span {
          width: 22px; height: 1.5px; background: #111;
          display: block;
          transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
          transform-origin: center;
        }
        .t4-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .t4-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .t4-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* ── Desktop nav — always visible on desktop ── */
        .t4-desktop-nav {
          display: flex;
        }

        /* ── Mobile menu drawer ── */
        .t4-mobile-menu {
          display: none;
          position: fixed;
          top: 68px;
          left: 0; right: 0;
          background: rgba(248,248,246,0.97);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border-bottom: 1px solid rgba(15,23,42,0.08);
          box-shadow: 0 16px 40px rgba(15,23,42,0.1);
          z-index: 49;
          padding: 8px 24px 24px;
          transform: translateY(-10px);
          opacity: 0;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease;
        }
        .t4-mobile-menu.open {
          transform: translateY(0);
          opacity: 1;
        }

        /* ── Scroll-triggered counter ── */
        @keyframes shimmer {
          0%{ background-position:200% center; }
          100%{ background-position:-200% center; }
        }
        .t4-shimmer-text {
          background: linear-gradient(90deg,#2563EB 0%,#7C3AED 40%,#E11D48 60%,#D97706 80%,#059669 100%);
          background-size:200% auto;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          animation: shimmer 4s linear infinite;
        }

        /* ═══════════════════════════════════════════
           RESPONSIVE BREAKPOINTS
        ═══════════════════════════════════════════ */

        /* ── Tablet & below (≤1024px) ── */
        @media (max-width: 1024px) {
          .t4-desktop-nav { display: none !important; }
          .t4-hamburger { display: flex !important; }
          .t4-mobile-menu { display: block; }
        }

        /* ── Tablet (769px – 1024px) ── */
        @media (max-width: 1024px) and (min-width: 769px) {
          .t4-hero-section { padding: 80px 32px 0 !important; }
          .t4-services-section { padding: 80px 32px !important; margin: 60px 16px !important; }
          .t4-about-section { padding: 80px 32px !important; }
          .t4-footer { padding: 80px 32px 40px !important; }
          .t4-cta-section { padding: 80px 32px !important; margin: 60px 16px !important; }
          .t4-section-padded { padding: 80px 32px !important; }
          .t4-testimonials-section { padding: 80px 32px !important; margin: 60px 16px !important; }
        }

        /* ── Mobile (≤768px) ── */
        @media (max-width: 768px) {
          .t4-stat { display: none !important; }

          /* Header */
          .t4-header-inner { padding: 0 16px !important; }

          /* Company name — clamp size, no overflow, no wrap */
          .t4-company-name {
            font-size: clamp(14px, 4vw, 18px) !important;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: calc(100vw - 100px);
          }
          .t4-logo-wrap {
            max-width: calc(100vw - 100px);
            overflow: hidden;
          }

          /* Hero */
          .t4-hero-section { padding: 60px 20px 0 !important; min-height: auto !important; }
          .t4-hero-buttons { flex-direction: column !important; align-items: center !important; gap: 12px !important; }
          .t4-btn-primary, .t4-btn-secondary { width: 100%; max-width: 320px; justify-content: center; }

          /* Sections */
          .t4-services-section { padding: 60px 20px !important; margin: 40px 12px !important; border-radius: 24px !important; }
          .t4-about-section { padding: 60px 20px !important; }
          .t4-about-inner { flex-direction: column !important; gap: 40px !important; }
          .t4-about-image-wrap { flex: unset !important; width: 100% !important; }
          .t4-about-text { flex: unset !important; width: 100% !important; }
          .t4-section-padded { padding: 60px 20px !important; }
          .t4-testimonials-section { padding: 60px 20px !important; margin: 40px 12px !important; border-radius: 24px !important; }
          .t4-cta-section { padding: 72px 20px !important; margin: 40px 12px !important; border-radius: 24px !important; }

          /* Footer */
          .t4-footer { padding: 60px 20px 32px !important; }
          .t4-footer-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .t4-footer-bottom { flex-direction: column !important; text-align: center !important; gap: 8px !important; }

          /* Pricing: remove featured scale on mobile */
          .t4-pricing-featured-wrap { transform: none !important; }

          /* FAQ summary text size */
          .t4-faq summary { font-size: 14px !important; padding: 18px 20px !important; }
          .t4-faq > div { padding: 0 20px 20px !important; }

          /* About pillars */
          .t4-pillars { gap: 16px !important; }
        }

        /* ── Small mobile (≤480px) ── */
        @media (max-width: 480px) {
          .t4-hero-section { padding: 48px 16px 0 !important; }
          .t4-services-section { padding: 48px 16px !important; margin: 32px 8px !important; }
          .t4-about-section { padding: 48px 16px !important; }
          .t4-section-padded { padding: 48px 16px !important; }
          .t4-testimonials-section { padding: 48px 16px !important; margin: 32px 8px !important; }
          .t4-cta-section { padding: 56px 16px !important; margin: 32px 8px !important; }
          .t4-footer { padding: 48px 16px 28px !important; }
          .t4-badge { font-size: 9px !important; padding: 6px 14px !important; }
          .t4-header-inner { padding: 0 16px !important; }
        }
      `}</style>

      <div className="t4-root" style={{ minHeight: "100vh" }}>

        {/* ══════════════════════════════════════════════════
            HEADER
        ══════════════════════════════════════════════════ */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease }}
          style={{
            position: "sticky", top: 0, zIndex: 50,
            background: "rgba(248,248,246,0.90)",
            backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)",
            borderBottom: "1px solid rgba(15,23,42,0.06)",
            boxShadow: "0 4px 30px rgba(15,23,42,0.04)",
          }}
        >
          <div
            className="t4-header-inner"
            style={{
              maxWidth: 1280, margin: "0 auto",
              padding: "0 40px", height: 68,
              display: "flex", alignItems: "center", justifyContent: "space-between",
              gap: 12, minWidth: 0,
            }}
          >
            {/* Left nav — desktop only */}
            <nav className="t4-desktop-nav" style={{ gap: 40 }}>
              <a href="#home" className="t4-nav-link">Home</a>
              <a href="#about" className="t4-nav-link">About</a>
            </nav>

            {/* Logo / Brand name */}
            <div className="t4-logo-wrap" style={{ minWidth: 0, flexShrink: 1 }}>
              {headerType === "Image" ? (
                logoUrl && typeof logoUrl === "string" && logoUrl.trim() !== "" ? (
                  <div style={{ position: "relative", height: 28, width: 120 }}>
                    <Image src={logoUrl} alt={displayName} fill style={{ objectFit: "contain" }} />
                  </div>
                ) : (
                  <div style={{ width: 34, height: 34, background: "linear-gradient(135deg,#2563EB,#7C3AED)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", fontSize: 13, fontWeight: 800, fontFamily: "'Syne',sans-serif" }}>
                    {displayName[0]}
                  </div>
                )
              ) : (
                <span className="t4-display t4-company-name" style={{ fontSize: companyNameFontSize ? `${companyNameFontSize}px` : 22, fontWeight: 500, color: "#111111", letterSpacing: "-0.01em" }}>
                  {displayName}
                </span>
              )}
            </div>

            {/* Right nav — desktop only */}
            <nav className="t4-desktop-nav" style={{ gap: 40, alignItems: "center" }}>
              <a href="#services" className="t4-nav-link">Expertise</a>
              <a href="#contact" className="t4-nav-link">Connect</a>
            </nav>

            {/* Hamburger — mobile/tablet only (hidden on desktop via CSS) */}
            <button
              className={`t4-hamburger ${mobileMenuOpen ? "open" : ""}`}
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

        {/* ── Mobile Menu Drawer ── */}
        <div className={`t4-mobile-menu ${mobileMenuOpen ? "open" : ""}`} aria-hidden={!mobileMenuOpen}>
          <nav>
            {[["#home", "Home"], ["#about", "About"], ["#services", "Expertise"], ["#contact", "Connect"]].map(([href, label]) => (
              <a
                key={label}
                href={href}
                className="t4-mobile-nav-link"
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

          {/* ── HERO ──────────────────────────────────────── */}
          <section
            ref={heroRef}
            className="t4-hero-section"
            style={{ padding: "100px 40px 0", overflow: "hidden", position: "relative", minHeight: "90vh" }}
          >
            {/* Ambient blobs */}
            <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 1000, height: 700, pointerEvents: "none", zIndex: 0 }}>
              <div style={{ position: "absolute", top: 0, left: "10%", width: 420, height: 420, background: "radial-gradient(ellipse,rgba(37,99,235,0.14) 0%,transparent 70%)", borderRadius: "50%", filter: "blur(40px)" }} />
              <div style={{ position: "absolute", top: 60, right: "10%", width: 380, height: 380, background: "radial-gradient(ellipse,rgba(124,58,237,0.13) 0%,transparent 70%)", borderRadius: "50%", filter: "blur(40px)" }} />
              <div style={{ position: "absolute", bottom: 0, left: "30%", width: 320, height: 320, background: "radial-gradient(ellipse,rgba(225,29,72,0.09) 0%,transparent 70%)", borderRadius: "50%", filter: "blur(50px)" }} />
            </div>

            <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1, textAlign: "center" }}>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease }}
                style={{ marginBottom: 52 }}
              >
                <span className="t4-badge">Premium Quality Since 2024</span>
              </motion.div>

              {/* Hero headline */}
              <div style={{ marginBottom: 28, overflow: "hidden" }}>
                <SplitReveal
                  text={heroTitle || `We Build ${displayName} Dreams.`}
                  tag="h1"
                  className="t4-display"
                  delay={0.1}
                  style={{
                    fontSize: heroTitleFontSize ? `${heroTitleFontSize}px` : "clamp(38px,7.5vw,96px)",
                    fontWeight: 700, color: "#111111",
                    lineHeight: 1.08, letterSpacing: "-0.025em",
                    maxWidth: 900, margin: "0 auto",
                    justifyContent: "center",
                  }}
                />
              </div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, x: -40, filter: "blur(6px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease, delay: 0.35 }}
                style={{ fontSize: taglineFontSize ? `${taglineFontSize}px` : "clamp(14px,2vw,17px)", color: "#6B7280", lineHeight: 1.72, maxWidth: 560, margin: "0 auto 48px", fontWeight: 400 }}
              >
                {tagline || "The modern platform designed for teams who demand excellence and simplicity in their workflow."}
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.45 }}
                className="t4-hero-buttons"
                style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 80 }}
              >
                <button className="t4-btn-primary">
                  <span>Start a Project</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <button className="t4-btn-secondary">Watch Showreel</button>
              </motion.div>

              {/* Hero image */}
              <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.1, ease, delay: 0.55 }}
                style={{ position: "relative", maxWidth: 1100, margin: "0 auto" }}
              >
                <div style={{ position: "absolute", inset: -40, background: "radial-gradient(ellipse,rgba(37,99,235,0.12) 0%,rgba(124,58,237,0.08) 40%,transparent 70%)", borderRadius: 56, pointerEvents: "none" }} />
                <motion.div style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}>
                  <div style={{ borderRadius: "clamp(16px,2.5vw,28px)", overflow: "hidden", border: "1px solid rgba(15,23,42,0.07)", boxShadow: "0 40px 120px rgba(37,99,235,0.18), 0 0 0 1px rgba(37,99,235,0.04)", aspectRatio: "16/9", position: "relative" }}>
                    <Image
                      src={(heroImage && typeof heroImage === "string" && heroImage.trim() !== "") ? heroImage : "/images/templates/template-img-21.jpg"}
                      alt={`${displayName} Platform Preview`}
                      fill style={{ objectFit: "cover" }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,23,42,0.08) 0%, transparent 50%)", pointerEvents: "none" }} />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* ── SERVICES ────────────────────────────────────── */}
          <section
            id="services"
            className="t4-services-section"
            style={{
              padding: "120px 40px",
              background: "rgba(255,255,255,0.76)",
              backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
              margin: "80px 24px", borderRadius: 36,
              border: "1px solid rgba(15,23,42,0.06)",
              boxShadow: "0 16px 60px rgba(37,99,235,0.07)",
              position: "relative", overflow: "hidden", scrollMarginTop: 80,
            }}
          >
            <div style={{ position: "absolute", top: -120, right: -120, width: 500, height: 500, background: "radial-gradient(ellipse,rgba(124,58,237,0.1) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: -80, left: -80, width: 350, height: 350, background: "radial-gradient(ellipse,rgba(37,99,235,0.08) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

            <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 72 }}>
                <span className="t4-label t4-grad-blue-violet">What We Do</span>
                <SplitReveal
                  text="Impactful Solutions"
                  className="t4-heading"
                  delay={0}
                  style={{ fontSize: "clamp(28px,4.5vw,56px)", fontWeight: 700, color: "#111111", letterSpacing: "-0.025em", lineHeight: 1.1, justifyContent: "center" }}
                />
              </motion.div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,280px),1fr))", gap: 20 }}>
                {displayServices.map((item, idx) => {
                  const accent = CARD_ACCENTS[idx % CARD_ACCENTS.length];
                  return (
                    <motion.div
                      key={idx}
                      custom={idx}
                      variants={slideLeft}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="t4-card"
                      style={{ padding: 36 }}
                      whileHover={{ y: -8, boxShadow: `0 28px 70px ${accent.glow}` }}
                    >
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${accent.main},transparent)`, borderRadius: "20px 20px 0 0" }} />
                      <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: accent.main, marginBottom: 20, fontFamily: "'Syne',sans-serif" }}>0{idx + 1}</div>
                      <h3
                        style={{ fontSize: (item.nameFontSize || item.titleFontSize) ? `${item.nameFontSize || item.titleFontSize}px` : 20, fontWeight: 700, color: "#111111", letterSpacing: "-0.01em", marginBottom: 12, lineHeight: 1.3, fontFamily: "'Syne',sans-serif" }}
                      >
                        {item.title || item.name}
                      </h3>
                      <p style={{ fontSize: item.descFontSize ? `${item.descFontSize}px` : 14, color: "#6B7280", lineHeight: 1.68, margin: 0 }}>
                        {item.desc}
                      </p>
                      <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 6, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: accent.main, fontFamily: "'Syne',sans-serif" }}>
                        Learn more
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 6h10M6.5 1.5l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── ABOUT ─────────────────────────────────────── */}
          <section
            id="about"
            className="t4-about-section"
            style={{ padding: "120px 40px", scrollMarginTop: 80, position: "relative", overflow: "hidden" }}
          >
            <div style={{ position: "absolute", top: "30%", right: "-10%", width: 500, height: 500, background: "radial-gradient(ellipse,rgba(217,119,6,0.07) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

            <div
              className="t4-about-inner"
              style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: "80px" }}
            >
              {/* Image */}
              <motion.div
                variants={slideLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="t4-about-image-wrap"
                style={{ flex: "1 1 400px", position: "relative" }}
              >
                {/* Stat card */}
                <motion.div
                  className="t4-stat"
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease, delay: 0.3 }}
                >
                  <div className="t4-display t4-shimmer-text" style={{ fontSize: 42, lineHeight: 1, marginBottom: 6 }}>98%</div>
                  <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#6B7280", lineHeight: 1.5, fontFamily: "'Syne',sans-serif" }}>Client Growth<br />Velocity</div>
                </motion.div>

                <motion.div
                  style={{
                    position: "relative", width: "100%", aspectRatio: "4/3",
                    borderRadius: 24, overflow: "hidden",
                    border: "1px solid rgba(15,23,42,0.07)",
                    boxShadow: "0 28px 70px rgba(15,23,42,0.10)",
                  }}
                  whileHover={{ scale: 1.02, boxShadow: "0 36px 90px rgba(37,99,235,0.14)" }}
                  transition={{ duration: 0.5, ease }}
                >
                  <Image
                    src={(aboutUsImage && typeof aboutUsImage === "string" && aboutUsImage.trim() !== "") ? aboutUsImage : "/images/templates/template-img-22.jpg"}
                    alt="About us" fill style={{ objectFit: "cover" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(37,99,235,0.08) 0%,rgba(124,58,237,0.06) 100%)", pointerEvents: "none" }} />
                </motion.div>
              </motion.div>

              {/* Text */}
              <div className="t4-about-text" style={{ flex: "1 1 380px" }}>
                <motion.span
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  className="t4-label t4-grad-rose-amber"
                  style={{ display: "block" }}
                >
                  The Methodology
                </motion.span>

                <SplitReveal
                  text={aboutUsTitle || "Mastering the logic layer."}
                  className="t4-display"
                  delay={0.05}
                  style={{
                    fontSize: aboutUsTitleFontSize ? `${aboutUsTitleFontSize}px` : "clamp(28px,4vw,52px)",
                    fontWeight: 600, color: "#111111", letterSpacing: "-0.02em", lineHeight: 1.12, marginBottom: 28,
                  }}
                />

                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease, delay: 0.2 }}
                  style={{ transformOrigin: "left", width: 56, height: 2, background: "linear-gradient(90deg,#2563EB,#7C3AED,rgba(124,58,237,0))", marginBottom: 28, borderRadius: 2 }}
                />

                <motion.p
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
                  style={{ fontSize: aboutUsContentFontSize ? `${aboutUsContentFontSize}px` : "clamp(14px,1.5vw,16px)", color: "#6B7280", lineHeight: 1.78, marginBottom: 44 }}
                >
                  {aboutUsContent || "We've built a logic layer that understands how modern businesses operate. Let us handle the complexity so you can focus on growth and long-term success."}
                </motion.p>

                <motion.div
                  variants={slideLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  className="t4-pillars"
                  style={{ display: "flex", gap: 28, flexWrap: "wrap" }}
                >
                  {[
                    { label: "Innovation", color: COLORS.blue.main },
                    { label: "Scale", color: COLORS.violet.main },
                    { label: "Integrity", color: COLORS.rose.main },
                    { label: "Design", color: COLORS.emerald.main },
                  ].map(({ label, color }) => (
                    <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, display: "block" }} />
                      <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "#9CA3AF", fontFamily: "'Syne',sans-serif" }}>{label}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          {/* ── FEATURES ─────────────────────────────────── */}
          {data?.features && data.features.length > 0 && (
            <section id="features" className="t4-section-padded" style={{ padding: "120px 40px", background: "linear-gradient(180deg,#FFFFFF 0%,rgba(248,248,246,0.8) 100%)", borderTop: "1px solid rgba(15,23,42,0.05)", borderBottom: "1px solid rgba(15,23,42,0.05)", scrollMarginTop: 80 }}>
              <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 72 }}>
                  <span className="t4-label t4-grad-emerald-blue" style={{ justifyContent: "center" }}>Why Choose Us</span>
                  <SplitReveal text="Key Features" className="t4-heading" delay={0} style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 700, color: "#111111", letterSpacing: "-0.025em", justifyContent: "center" }} />
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
                        className="t4-card"
                        style={{ padding: "48px 40px", textAlign: "center" }}
                        whileHover={{ y: -8, boxShadow: `0 28px 72px ${accent.glow}` }}
                      >
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${accent.main},transparent)`, borderRadius: "20px 20px 0 0" }} />
                        <div style={{ width: 56, height: 56, background: accent.soft, borderRadius: 16, margin: "0 auto 28px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, border: `1px solid ${accent.main}22`, position: "relative" }}>
                          {feature.icon ? <Image src={feature.icon} alt={feature.title} fill style={{ objectFit: "cover", borderRadius: 16 }} /> : "✦"}
                        </div>
                        <h4 style={{ fontSize: 18, fontWeight: 700, color: "#111111", marginBottom: 12, letterSpacing: "-0.01em", fontFamily: "'Syne',sans-serif" }}>{feature.title}</h4>
                        <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.68, margin: 0 }}>{feature.desc}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* ── PORTFOLIO ────────────────────────────────── */}
          {data?.portfolio && data.portfolio.length > 0 && (
            <section id="portfolio" className="t4-section-padded" style={{ padding: "120px 40px", background: "#F5F5F2", scrollMarginTop: 80 }}>
              <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 72 }}>
                  <span className="t4-label t4-grad-blue-violet" style={{ justifyContent: "center" }}>Our Work</span>
                  <SplitReveal text="Selected Projects" className="t4-heading" delay={0} style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 700, color: "#111111", letterSpacing: "-0.025em", justifyContent: "center" }} />
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
                      className="t4-card"
                      style={{ display: "block", textDecoration: "none", color: "inherit" }}
                      whileHover={{ y: -8, boxShadow: "0 28px 72px rgba(37,99,235,0.13)" }}
                    >
                      <div style={{ position: "relative", height: 240, background: "#F3F3F1", overflow: "hidden" }}>
                        {item.image && <Image src={item.image} alt={item.title || item.name} fill style={{ objectFit: "cover", transition: "transform 0.6s ease" }} />}
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(15,23,42,0.15) 0%,transparent 60%)", pointerEvents: "none" }} />
                      </div>
                      <div style={{ padding: "28px 32px" }}>
                        <h4 style={{ fontSize: 17, fontWeight: 700, color: "#111111", marginBottom: 8, letterSpacing: "-0.01em", fontFamily: "'Syne',sans-serif" }}>{item.title || item.name}</h4>
                        <p style={{ fontSize: 13.5, color: "#6B7280", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── TEAM ─────────────────────────────────────── */}
          {data?.team && data.team.length > 0 && (
            <section id="team" className="t4-section-padded" style={{ padding: "120px 40px", background: "#FFFFFF", borderTop: "1px solid rgba(15,23,42,0.05)", scrollMarginTop: 80 }}>
              <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 72 }}>
                  <span className="t4-label t4-grad-rose-amber" style={{ justifyContent: "center" }}>The Experts</span>
                  <SplitReveal text="Our Leadership" className="t4-heading" delay={0} style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 700, color: "#111111", letterSpacing: "-0.025em", justifyContent: "center" }} />
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
                      className="t4-card"
                      style={{ padding: "40px 32px", textAlign: "center" }}
                      whileHover={{ y: -8, boxShadow: `0 24px 60px ${CARD_ACCENTS[idx % CARD_ACCENTS.length].glow}` }}
                    >
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${CARD_ACCENTS[idx % CARD_ACCENTS.length].main},transparent)`, borderRadius: "20px 20px 0 0" }} />
                      <div style={{ width: 88, height: 88, borderRadius: "50%", overflow: "hidden", margin: "0 auto 20px", border: `2px solid ${CARD_ACCENTS[idx % CARD_ACCENTS.length].soft}`, position: "relative", background: "#F3F3F1" }}>
                        {member.image ? <Image src={member.image} alt={member.name} fill style={{ objectFit: "cover" }} /> : null}
                      </div>
                      <h4 style={{ fontSize: 16, fontWeight: 700, color: "#111111", marginBottom: 4, fontFamily: "'Syne',sans-serif" }}>{member.name}</h4>
                      <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: CARD_ACCENTS[idx % CARD_ACCENTS.length].main, marginBottom: 14, fontFamily: "'Syne',sans-serif" }}>{member.role}</p>
                      <p style={{ fontSize: 13.5, color: "#6B7280", lineHeight: 1.65, margin: 0 }}>{member.bio}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── TESTIMONIALS ─────────────────────────────── */}
          {data?.testimonials && data.testimonials.length > 0 && (
            <section
              id="testimonials"
              className="t4-testimonials-section"
              style={{
                padding: "120px 40px",
                background: "rgba(255,255,255,0.78)",
                backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
                margin: "80px 24px", borderRadius: 36,
                border: "1px solid rgba(15,23,42,0.06)",
                boxShadow: "0 16px 60px rgba(124,58,237,0.07)",
                position: "relative", overflow: "hidden",
                scrollMarginTop: 80,
              }}
            >
              <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, background: "radial-gradient(ellipse,rgba(124,58,237,0.09) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: -80, left: -80, width: 350, height: 350, background: "radial-gradient(ellipse,rgba(225,29,72,0.07) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
              <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 72 }}>
                  <span className="t4-label t4-grad-blue-violet" style={{ justifyContent: "center" }}>Client Feedback</span>
                  <SplitReveal text="Testimonials" className="t4-heading" delay={0} style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 700, color: "#111111", letterSpacing: "-0.025em", justifyContent: "center" }} />
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
                      className="t4-card"
                      style={{ padding: 48 }}
                      whileHover={{ y: -6, boxShadow: `0 24px 64px ${CARD_ACCENTS[idx % CARD_ACCENTS.length].glow}` }}
                    >
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${CARD_ACCENTS[idx % CARD_ACCENTS.length].main},transparent)`, borderRadius: "20px 20px 0 0" }} />
                      <div className="t4-display" style={{ fontSize: 52, lineHeight: 1, marginBottom: 20, fontStyle: "italic" }}>
                        <span className={idx % 2 === 0 ? "t4-grad-blue-violet" : "t4-grad-rose-amber"}>"</span>
                      </div>
                      <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.74, marginBottom: 36, fontStyle: "italic" }}>{testi.review}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <div style={{ width: 48, height: 48, borderRadius: "50%", overflow: "hidden", border: `2px solid ${CARD_ACCENTS[idx % CARD_ACCENTS.length].soft}`, flexShrink: 0, position: "relative", background: "#F3F3F1" }}>
                          {testi.image ? <Image src={testi.image} alt={testi.name} fill style={{ objectFit: "cover" }} /> : null}
                        </div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: "#111111", fontFamily: "'Syne',sans-serif" }}>{testi.name}</div>
                          <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: CARD_ACCENTS[idx % CARD_ACCENTS.length].main, marginTop: 2, fontFamily: "'Syne',sans-serif" }}>{testi.role}</div>
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
            <section id="pricing" className="t4-section-padded" style={{ padding: "120px 40px", background: "linear-gradient(180deg,#FFF 0%,#F5F5F2 100%)", scrollMarginTop: 80 }}>
              <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 72 }}>
                  <span className="t4-label t4-grad-emerald-blue" style={{ justifyContent: "center" }}>Flexible Plans</span>
                  <SplitReveal text="Pricing & Packages" className="t4-heading" delay={0} style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 700, color: "#111111", letterSpacing: "-0.025em", justifyContent: "center" }} />
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
                        className={`${isFeatured ? "t4-pricing-featured" : "t4-card"} ${isFeatured ? "t4-pricing-featured-wrap" : ""}`}
                        style={{ padding: "48px 40px", borderRadius: 28, position: "relative", ...(isFeatured ? { transform: "scale(1.04)", zIndex: 10 } : {}) }}
                        whileHover={!isFeatured ? { y: -8, boxShadow: `0 28px 72px ${CARD_ACCENTS[idx % CARD_ACCENTS.length].glow}` } : {}}
                      >
                        {!isFeatured && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${CARD_ACCENTS[idx % CARD_ACCENTS.length].main},transparent)`, borderRadius: "28px 28px 0 0" }} />}
                        {isFeatured && (
                          <>
                            <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#2563EB,#7C3AED)", color: "#FFF", padding: "6px 20px", borderRadius: 999, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", whiteSpace: "nowrap", fontFamily: "'Syne',sans-serif", boxShadow: "0 8px 24px rgba(37,99,235,0.3)" }}>Most Popular</div>
                            <div style={{ position: "absolute", top: -80, right: -80, width: 280, height: 280, background: "radial-gradient(ellipse,rgba(124,58,237,0.3) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
                          </>
                        )}
                        <h4 style={{ fontSize: 14, fontWeight: 700, color: isFeatured ? "rgba(250,250,248,0.5)" : "#6B7280", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12, fontFamily: "'Syne',sans-serif" }}>{plan.planName}</h4>
                        <div className="t4-display" style={{ fontSize: 52, fontWeight: 600, color: isFeatured ? "#FAFAF8" : "#111111", marginBottom: 36, letterSpacing: "-0.02em" }}>{plan.price}</div>
                        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 36px", display: "flex", flexDirection: "column", gap: 14 }}>
                          {featuresList.map((f, i) => (
                            <li key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: isFeatured ? "rgba(250,250,248,0.72)" : "#6B7280" }}>
                              <span style={{ width: 18, height: 18, borderRadius: "50%", background: isFeatured ? "rgba(250,250,248,0.1)" : COLORS.blue.soft, border: `1px solid ${isFeatured ? "rgba(250,250,248,0.2)" : COLORS.blue.main + "33"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 9, color: isFeatured ? "#FFF" : COLORS.blue.main }}>✓</span>
                              {f}
                            </li>
                          ))}
                        </ul>
                        <button
                          style={{
                            width: "100%", padding: "14px 0", borderRadius: 999,
                            fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
                            cursor: "pointer", transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
                            background: isFeatured ? "linear-gradient(135deg,#FAFAF8,rgba(250,250,248,0.9))" : "linear-gradient(135deg,#2563EB,#7C3AED)",
                            color: isFeatured ? "#111111" : "#FFF",
                            border: "none",
                            boxShadow: isFeatured ? "0 12px 32px rgba(250,250,248,0.15)" : "0 14px 40px rgba(37,99,235,0.3)",
                            fontFamily: "'Syne',sans-serif",
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

          {/* ── FAQ ──────────────────────────────────────── */}
          {data?.faq && data.faq.length > 0 && (
            <section id="faq" className="t4-section-padded" style={{ padding: "120px 40px", background: "linear-gradient(180deg,#F5F5F2,#FAFAF8)", borderTop: "1px solid rgba(15,23,42,0.05)", scrollMarginTop: 80 }}>
              <div style={{ maxWidth: 760, margin: "0 auto" }}>
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 64 }}>
                  <span className="t4-label t4-grad-rose-amber" style={{ justifyContent: "center" }}>Got Questions?</span>
                  <SplitReveal text="FAQ" className="t4-heading" delay={0} style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 700, color: "#111111", letterSpacing: "-0.025em", justifyContent: "center" }} />
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
                      className="t4-faq"
                    >
                      <summary>{q.question}</summary>
                      <div style={{ padding: "0 28px 24px", fontSize: 14, color: "#6B7280", lineHeight: 1.72 }}>{q.answer}</div>
                    </motion.details>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── BLOG ─────────────────────────────────────── */}
          {data?.blog && data.blog.length > 0 && (
            <section id="blog" className="t4-section-padded" style={{ padding: "120px 40px", background: "#FFFFFF", scrollMarginTop: 80 }}>
              <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 72 }}>
                  <span className="t4-label t4-grad-emerald-blue" style={{ justifyContent: "center" }}>Latest Insights</span>
                  <SplitReveal text="Our Blog" className="t4-heading" delay={0} style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 700, color: "#111111", letterSpacing: "-0.025em", justifyContent: "center" }} />
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
                      className="t4-card"
                      style={{ display: "block", textDecoration: "none", color: "inherit" }}
                      whileHover={{ y: -8, boxShadow: `0 28px 72px ${CARD_ACCENTS[idx % CARD_ACCENTS.length].glow}` }}
                    >
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${CARD_ACCENTS[idx % CARD_ACCENTS.length].main},transparent)`, borderRadius: "20px 20px 0 0" }} />
                      <div style={{ position: "relative", height: 220, background: "#F3F3F1", overflow: "hidden" }}>
                        {post.image && <Image src={post.image} alt={post.title} fill style={{ objectFit: "cover" }} />}
                        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top,${CARD_ACCENTS[idx % CARD_ACCENTS.length].glow} 0%,transparent 60%)`, pointerEvents: "none" }} />
                      </div>
                      <div style={{ padding: "28px 32px" }}>
                        <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: CARD_ACCENTS[idx % CARD_ACCENTS.length].main, display: "block", marginBottom: 10, fontFamily: "'Syne',sans-serif" }}>{post.date}</span>
                        <h4 style={{ fontSize: 17, fontWeight: 700, color: "#111111", marginBottom: 10, letterSpacing: "-0.01em", lineHeight: 1.3, fontFamily: "'Syne',sans-serif" }}>{post.title}</h4>
                        <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.65, marginBottom: 20, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{post.excerpt}</p>
                        <span style={{ fontSize: 11, fontWeight: 700, color: CARD_ACCENTS[idx % CARD_ACCENTS.length].main, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'Syne',sans-serif" }}>Read More →</span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── CTA ──────────────────────────────────────── */}
          <section
            className="t4-cta-section"
            style={{
              padding: "120px 40px",
              background: "linear-gradient(135deg,#0F172A 0%,#1E1B4B 50%,#1E293B 100%)",
              margin: "80px 24px", borderRadius: 36,
              textAlign: "center", position: "relative", overflow: "hidden",
              boxShadow: "0 32px 80px rgba(37,99,235,0.2)",
            }}
          >
            <div style={{ position: "absolute", top: -100, left: "-5%", width: 500, height: 500, background: "radial-gradient(ellipse,rgba(37,99,235,0.18) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: -60, right: "-5%", width: 450, height: 450, background: "radial-gradient(ellipse,rgba(124,58,237,0.14) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: -80, left: "30%", width: 400, height: 400, background: "radial-gradient(ellipse,rgba(225,29,72,0.1) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

            <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 1 }}>
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
                className="t4-label"
                style={{ color: "rgba(250,250,248,0.35)", justifyContent: "center", display: "flex" }}
              >
                Ready
              </motion.span>

              <SplitReveal
                text={data?.ctaTitle || "Ready to transform your business?"}
                className="t4-display"
                delay={0.05}
                style={{ fontSize: "clamp(32px,6vw,74px)", fontWeight: 600, color: "#FAFAF8", letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: 24, justifyContent: "center" }}
              />

              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease, delay: 0.25 }}
                style={{ fontSize: "clamp(14px,1.5vw,16px)", color: "rgba(250,250,248,0.5)", lineHeight: 1.72, marginBottom: 52 }}
              >
                {data?.ctaDesc || "Join hundreds of successful companies working with us today to scale their operations."}
              </motion.p>

              <motion.a
                href={data?.ctaButtonLink || "#contact"}
                className="t4-btn-primary"
                style={{ display: "inline-flex" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease, delay: 0.35 }}
                whileHover={{ y: -4, boxShadow: "0 20px 60px rgba(37,99,235,0.4)" }}
              >
                <span>{data?.ctaButtonText || "Get Started Now"}</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </motion.a>
            </div>
          </section>

        </main>

        {/* ══════════════════════════════════════════════════
            FOOTER
        ══════════════════════════════════════════════════ */}
        <footer
          id="contact"
          className="t4-footer"
          style={{
            padding: "100px 40px 48px",
            background: "#FFFFFF",
            borderTop: "1px solid rgba(15,23,42,0.06)",
            boxShadow: "0 -4px 30px rgba(15,23,42,0.03)",
          }}
        >
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div
              className="t4-footer-grid"
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,200px),1fr))", gap: "64px 40px", marginBottom: 80 }}
            >
              {/* Brand */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                {headerType === "Image" && logoUrl && typeof logoUrl === "string" && logoUrl.trim() !== "" ? (
                  <div style={{ position: "relative", height: 24, width: 100, marginBottom: 24 }}>
                    <Image src={logoUrl} alt={displayName} fill style={{ objectFit: "contain", objectPosition: "left" }} />
                  </div>
                ) : (
                  <div className="t4-display" style={{ fontSize: 22, fontWeight: 500, color: "#111111", marginBottom: 20 }}>{displayName}</div>
                )}
                <p style={{ fontSize: 13.5, color: "#6B7280", lineHeight: 1.72 }}>
                  {footerAbout || "Redefining the digital landscape through elite strategy and creative excellence."}
                </p>
              </motion.div>

              {/* Quick Links */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}>
                <h4 className="t4-heading" style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#111111", marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid rgba(15,23,42,0.07)" }}>Quick Links</h4>
                <nav style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[["#home", "Home"], ["#services", "Expertise"], ["#about", "About"], ["#contact", "Connect"]].map(([href, label]) => (
                    <a key={label} href={href} className="t4-nav-link" style={{ fontSize: 13.5, fontWeight: 400, letterSpacing: 0, textTransform: "none", color: "#6B7280" }}>{label}</a>
                  ))}
                </nav>
              </motion.div>

              {/* Contact */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}>
                <h4 className="t4-heading" style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#111111", marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid rgba(15,23,42,0.07)" }}>Contact</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {address && <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}><span style={{ fontSize: 14, marginTop: 1 }}>📍</span><p style={{ fontSize: 13.5, color: "#6B7280", lineHeight: 1.6, margin: 0 }}>{address}</p></div>}
                  {displayPhone && <div style={{ display: "flex", gap: 12, alignItems: "center" }}><span style={{ fontSize: 14 }}>📞</span><p style={{ fontSize: 13.5, color: "#6B7280", margin: 0 }}>{displayPhone}</p></div>}
                  {contactEmail && <div style={{ display: "flex", gap: 12, alignItems: "center" }}><span style={{ fontSize: 14 }}>✉️</span><p style={{ fontSize: 13.5, color: "#6B7280", margin: 0 }}>{contactEmail}</p></div>}
                </div>
              </motion.div>

              {/* Newsletter */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3}>
                <h4 className="t4-heading" style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#111111", marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid rgba(15,23,42,0.07)" }}>
                  {data?.newsletterTitle || "Stay Updated"}
                </h4>
                <p style={{ fontSize: 13.5, color: "#6B7280", marginBottom: 16, lineHeight: 1.65 }}>{data?.newsletterDesc || "Subscribe for the latest insights."}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                  <input type="email" placeholder="your@email.com" className="t4-input" />
                  <button className="t4-btn-primary" style={{ justifyContent: "center" }}>
                    <span>Subscribe</span>
                  </button>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  {facebookUrl && (
                    <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="t4-social">
                      <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.324v-21.35c0-.732-.593-1.325-1.325-1.325z" /></svg>
                    </a>
                  )}
                  {twitterUrl && (
                    <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="t4-social">
                      <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57c-.885.392-1.83.656-2.825.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                    </a>
                  )}
                  {linkedinUrl && (
                    <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="t4-social">
                      <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                    </a>
                  )}
                  {!facebookUrl && !twitterUrl && !linkedinUrl && <span style={{ fontSize: 12, color: "#9CA3AF" }}>No social links provided</span>}
                </div>
              </motion.div>
            </div>

            {/* Footer bottom */}
            <div
              className="t4-footer-bottom"
              style={{ paddingTop: 32, borderTop: "1px solid rgba(15,23,42,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}
            >
              <span className="t4-heading" style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9CA3AF" }}>
                {footerCopyright || `© ${new Date().getFullYear()} ${displayName} / All Rights Reserved`}
              </span>
              <span className="t4-heading" style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9CA3AF" }}>
                Designed for the modern web
              </span>
            </div>
          </div>
        </footer>

      </div>
    </TemplateLayout>
  );
}