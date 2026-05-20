import TemplateLayout from "./TemplateLayout";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

/* ─────────────────────────────────────────────
   QUIET LUXURY EDITORIAL — Design Tokens
   Aged gold on warm near-black. Cormorant +
   DM Mono typography. Stately transitions.
───────────────────────────────────────────── */
const T = {
  bgBase: "#080A08",
  bgRaised: "#0E110E",
  bgOverlay: "#141814",
  bgInvert: "#E8E4DC",

  gold: "#B8935A",
  goldMuted: "#7A5E34",
  goldFaint: "rgba(184,147,90,0.08)",
  goldGlow: "rgba(184,147,90,0.15)",

  text1: "#E8E4DC",
  text2: "#9A9488",
  text3: "#5A5650",
  textInvert: "#1A1A18",

  border: "rgba(184,147,90,0.12)",
  borderHover: "rgba(184,147,90,0.32)",
  borderSubtle: "rgba(232,228,220,0.05)",

  fontDisplay: "'Cormorant Garamond', 'Times New Roman', serif",
  fontLabel: "'DM Mono', 'Courier New', monospace",
  fontBody: "'Instrument Serif', 'Times New Roman', serif",

  ease: "cubic-bezier(0.16, 1, 0.3, 1)",
};

/* ─── Reusable style helpers ─────────────────── */
const card = {
  background: T.bgRaised,
  border: `0.5px solid ${T.border}`,
  borderRadius: "1.5rem",
  transition: `border-color 0.6s ${T.ease}, box-shadow 0.7s ${T.ease}`,
};

const labelStyle = {
  fontFamily: T.fontLabel,
  fontSize: "9px",
  letterSpacing: "0.28em",
  textTransform: "uppercase",
  color: T.text3,
};

const goldLabel = { ...labelStyle, color: T.gold };

/* ─── NavLink ────────────────────────────────── */
const NavLink = ({ href, children, active }) => (
  <a
    href={href}
    style={{
      fontFamily: T.fontLabel,
      fontSize: "9px",
      letterSpacing: "0.28em",
      textTransform: "uppercase",
      color: active ? T.gold : T.text3,
      position: "relative",
      paddingBottom: "6px",
      transition: `color 0.4s ${T.ease}`,
      textDecoration: "none",
    }}
    onMouseEnter={e => (e.currentTarget.style.color = T.gold)}
    onMouseLeave={e => (e.currentTarget.style.color = active ? T.gold : T.text3)}
  >
    {children}
    {active && (
      <motion.div
        layoutId="navUnderline"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "0.5px",
          background: T.gold,
        }}
      />
    )}
  </a>
);

/* ─── Section label ──────────────────────────── */
const SectionLabel = ({ children }) => (
  <span style={{ ...goldLabel, display: "block", marginBottom: "2rem" }}>
    {children}
  </span>
);

/* ─── Hairline divider ───────────────────────── */
const Divider = () => (
  <div
    style={{
      height: "0.5px",
      background: `linear-gradient(to right, transparent, ${T.goldMuted}, transparent)`,
      margin: "0 auto",
      width: "100%",
    }}
  />
);

export default function PortfolioTemplate({ data }) {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const {
    name = "Julian Vance",
    navFontSize = 20,
    logoUrl = "",
    heroTitle = "CRAFTING THE DIGITAL AVANT-GARDE.",
    heroSubtitle = "Senior Experience Designer",
    heroDescription = "Specializing in the intersection of visual narrative and high-performance engineering. I build digital systems that resonate with human intent and business goals.",
    avatarUrl = "/images/templates/template-img-45.jpg",
    heroTitleSize = 72,
    heroSubtitleSize = 14,
    heroDescSize = 17,
    email = "julian@vance.design",
    phone = "+1 987 654 321",
    linkedinUrl = "#",
    githubUrl = "#",
    twitterUrl = "#",
    aboutUsTitle = "The Architecture of Intent",
    aboutBio = "I specialize in bridging the gap between artistic expression and technical excellence. With over 08 years of experience, I've led projects from conceptual wireframes to global deployment.",
    aboutImage = "/images/templates/template-img-45.jpg",
    experience_years = "08",
    aboutEmail = "julian@vance.design",
    aboutLocation = "San Francisco, CA",
    experience = [],
    skills = [],
    projects = [],
    services = [],
    testimonials = [],
    location = "San Francisco, CA",
    availabilityStatus = "Available for Work",
    footerAddress = "",
    footerLinks = [],
    footerLogo = "",
    footerCopyright = "",
  } = data || {};

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ["home", "about", "skills", "projects", "experience", "services", "contact"];
      const current = sections.find(s => {
        const el = document.getElementById(s);
        if (el) {
          const r = el.getBoundingClientRect();
          return r.top <= 150 && r.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacityHero = useTransform(scrollY, [0, 300], [1, 0]);

  /* ─── Defaults ──────────────────────────────── */
  const defaultSkills = [
    { category: "Frontend", items: ["React", "Next.js", "Tailwind", "Three.js"], icon: "⚛️" },
    { category: "Backend", items: ["Node.js", "Python", "GraphQL", "Postgres"], icon: "⚙️" },
    { category: "Design", items: ["Figma", "Spline", "Webflow", "After Effects"], icon: "🎨" },
    { category: "Cloud", items: ["AWS", "Vercel", "Docker", "Git"], icon: "☁️" },
  ];
  const defaultProjects = [
    { title: "VELOCITY CORE", desc: "A high-frequency trading interface focused on data density.", image: "/images/templates/template-img-11.jpg", tags: ["Fintech", "UI/UX"], link: "#" },
    { title: "AETHERIS", desc: "Decentralized social platform with custom motion systems.", image: "/images/templates/template-img-12.jpg", tags: ["Web3", "Motion"], link: "#" },
  ];
  const defaultExperience = [
    { role: "Staff Product Designer", company: "Aura Systems", period: "2021 — Present", desc: "Orchestrating design systems for distributed cloud ecosystems." },
    { role: "Lead UI Engineer", company: "Flux Lab", period: "2018 — 2021", desc: "Developed the core component library used by 200+ engineers." },
  ];
  const defaultServices = [
    { title: "Design Systems", desc: "Scaling visual languages across global organizations.", icon: "🧊" },
    { title: "Web Performance", desc: "Optimizing the critical rendering path for sub-second load times.", icon: "⚡" },
    { title: "Creative Dev", desc: "Merging WebGL and React for immersive storytelling.", icon: "🌪️" },
  ];

  const displaySkills = skills.length > 0 ? skills : defaultSkills;
  const displayProjects = projects.length > 0 ? projects : defaultProjects;
  const displayExperience = experience.length > 0 ? experience : defaultExperience;
  const displayServices = services.length > 0 ? services : defaultServices;

  if (!mounted) return null;

  /* ─── Nav items ─────────────────────────────── */
  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Work", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <TemplateLayout data={data} theme="dark" category="Portfolio" hideHeader hideFooter>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Instrument+Serif:ital@0;1&display=swap');

        html { scroll-behavior: smooth; }

        /* Scrollbar */
        ::-webkit-scrollbar       { width: 4px; }
        ::-webkit-scrollbar-track { background: ${T.bgBase}; }
        ::-webkit-scrollbar-thumb { background: ${T.bgOverlay}; border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: ${T.goldMuted}; }

        /* Selection */
        ::selection { background: ${T.gold}; color: ${T.bgBase}; }

        /* Grain overlay */
        .portfolio-grain::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          background-size: 256px 256px;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.022;
          mix-blend-mode: overlay;
        }

        /* Warm grayscale on images */
        .img-warm-gray {
          filter: grayscale(1) brightness(0.82) sepia(0.08);
          transition: filter 0.8s cubic-bezier(0.16,1,0.3,1) !important;
        }
        .img-warm-gray:hover,
        .project-card:hover .img-warm-gray {
          filter: grayscale(0) brightness(1) sepia(0);
        }

        /* Hover card glow */
        .premium-card {
          transition: border-color 0.6s cubic-bezier(0.16,1,0.3,1),
                      box-shadow   0.7s cubic-bezier(0.16,1,0.3,1),
                      background   0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .premium-card:hover {
          border-color: ${T.borderHover} !important;
          box-shadow: 0 0 60px -15px ${T.goldGlow},
                      0 24px 64px -20px rgba(0,0,0,0.7);
        }

        /* Experience row */
        .exp-row {
          transition: background 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .exp-row:hover { background: ${T.goldFaint} !important; }
        .exp-row:hover .exp-period  { color: ${T.gold} !important; }
        .exp-row:hover .exp-bar     { width: 100% !important; background: ${T.gold} !important; }
        .exp-row:hover .exp-counter { color: ${T.gold} !important; border-color: ${T.goldMuted} !important; }

        /* Project card */
        .project-card:hover .project-arrow {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .project-card:hover .project-title { color: ${T.gold} !important; }
        .project-card:hover .project-img-wrap {
          box-shadow: 0 0 80px -20px ${T.goldGlow};
        }

        /* Service card */
        .service-card:hover .service-title { color: ${T.gold} !important; }
        .service-card:hover .service-glow  { opacity: 1 !important; }

        /* Skill card */
        .skill-card:hover .skill-dot  { opacity: 1 !important; }
        .skill-card:hover .skill-item { color: ${T.text1} !important; }

        /* Contact tile */
        .contact-tile:hover { border-color: ${T.borderHover} !important; }
        .contact-tile:hover .tile-label { color: ${T.gold} !important; }
        .contact-tile:hover a { color: ${T.gold} !important; }

        /* Footer links */
        .footer-link:hover { color: ${T.gold} !important; }

        /* Invert card hover — subtle warm inset */
        .invert-card:hover {
          box-shadow: inset 0 0 40px rgba(184,147,90,0.06);
        }
      `}</style>

      <div
        className="portfolio-grain"
        style={{
          background: T.bgBase,
          color: T.text1,
          fontFamily: T.fontBody,
          overflowX: "hidden",
          position: "relative",
        }}
      >

        {/* ══════════════════════════════════════
            NAVIGATION
        ══════════════════════════════════════ */}
        <nav
          className="px-4 py-4 md:px-12 md:py-6"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            display: "flex",
            justifyContent: "center",
            transition: `background 0.5s ${T.ease}`,
            ...(isScrolled
              ? { background: "rgba(8,10,8,0.75)", backdropFilter: "blur(28px)", borderBottom: `0.5px solid ${T.borderSubtle}` }
              : {}),
          }}
        >
          <div
            style={{
              maxWidth: "1400px",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.85rem 2rem",
              background: "rgba(14,17,14,0.6)",
              backdropFilter: "blur(24px)",
              border: `0.5px solid ${T.border}`,
              borderRadius: "50px",
            }}
          >
            {/* Brand */}
            <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}>
              {logoUrl ? (
                <Image src={logoUrl} alt={name} width={navFontSize * 1.5} height={navFontSize * 1.5} style={{ borderRadius: "4px" }} />
              ) : (
                <span style={{ fontFamily: T.fontDisplay, fontStyle: "italic", fontWeight: 700, fontSize: "1.1rem", letterSpacing: "-0.02em", color: T.text1 }}>
                  {name}
                </span>
              )}
            </motion.div>

            {/* Desktop links */}
            <div style={{ alignItems: "center", gap: "2rem" }} className="hidden md:flex">
              {navItems.map(item => (
                <NavLink key={item.label} href={item.href} active={activeSection === item.href.replace("#", "")}>
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* Mobile burger */}
            <button
              onClick={() => setIsMobileMenuOpen(o => !o)}
              style={{ background: "none", border: "none", cursor: "pointer", flexDirection: "column", gap: "5px" }}
              className="flex md:hidden flex-col gap-1"
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map(i => (
                <span key={i} style={{ display: "block", width: "20px", height: "0.5px", background: T.gold }} />
              ))}
            </button>
          </div>
        </nav>

        {/* Mobile overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 90,
                background: "rgba(8,10,8,0.97)",
                backdropFilter: "blur(24px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "2.5rem",
              }}
            >
              {navItems.map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    fontFamily: T.fontDisplay,
                    fontSize: "2.8rem",
                    fontWeight: 700,
                    fontStyle: "italic",
                    color: T.text1,
                    textDecoration: "none",
                    letterSpacing: "-0.02em",
                    transition: `color 0.3s`,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = T.gold)}
                  onMouseLeave={e => (e.currentTarget.style.color = T.text1)}
                >
                  {item.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <main>

          {/* ══════════════════════════════════════
              HERO
          ══════════════════════════════════════ */}
          <section
            id="home"
            className="flex flex-col items-center justify-center text-center relative overflow-hidden px-4 pt-24 pb-16 md:px-6 md:pt-32 md:pb-24"
            style={{
              minHeight: "70vh",
            }}
          >
            {/* Background image */}
            {avatarUrl && (
              <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
                <Image
                  src={avatarUrl}
                  alt="Background"
                  fill
                  className="img-warm-gray"
                  style={{ objectFit: "cover", opacity: 0.35 }}
                  priority
                />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, ${T.bgBase} 0%, transparent 30%, transparent 70%, ${T.bgBase} 100%)` }} />
              </div>
            )}

            {/* Gold ambient glows */}
            <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
              <div style={{ position: "absolute", top: "25%", left: "20%", width: "50%", height: "50%", background: `radial-gradient(ellipse, ${T.goldGlow} 0%, transparent 70%)`, animation: "warmPulse 6s ease-in-out infinite" }} />
              <div style={{ position: "absolute", bottom: "20%", right: "20%", width: "40%", height: "40%", background: `radial-gradient(ellipse, rgba(120,90,50,0.10) 0%, transparent 70%)`, animation: "warmPulse 7s ease-in-out 2s infinite" }} />
            </div>

            <style>{`
              @keyframes warmPulse {
                0%,100%{ opacity:0.5; transform:scale(1); }
                50%    { opacity:1;   transform:scale(1.1); }
              }
            `}</style>

            <motion.div
              style={{
                y: y1,
                opacity: opacityHero,
                position: "relative",
                zIndex: 1,
                maxWidth: "1200px",
                margin: "0 auto",
                width: "100%",
              }}
              className="relative px-4 sm:px-6 md:px-8"
            >

              {/* Avatar */}
              {avatarUrl && (
                <motion.div
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    width: "7rem",
                    height: "7rem",
                    borderRadius: "1rem",
                    border: `0.5px solid ${T.border}`,
                    padding: "6px",
                    marginBottom: "3rem",
                    marginLeft: "auto",
                    marginRight: "auto",
                    overflow: "hidden",
                    transform: "rotate(2deg)",
                    boxShadow: `0 0 40px -10px ${T.goldGlow}`,
                  }}
                >
                  <Image
                    src={avatarUrl}
                    alt={name}
                    width={128}
                    height={128}
                    className="img-warm-gray"
                    style={{ borderRadius: "0.6rem", width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </motion.div>
              )}

              {/* Subtitle */}
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                style={{
                  fontFamily: T.fontLabel,
                  fontSize: `clamp(0.7rem, 2.5vw, ${heroSubtitleSize}px)`,
                  letterSpacing: "clamp(0.15em, 1.5vw, 0.35em)",
                  textTransform: "uppercase",
                  color: T.gold,
                  display: "block",
                  marginBottom: "1.5rem",
                }}
              >
                {heroSubtitle}
              </motion.span>

              {/* H1 */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: T.fontDisplay,
                  fontWeight: 700,
                  fontStyle: "italic",
                  fontSize: `clamp(2rem, 7.5vw, ${heroTitleSize}px)`,
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  textTransform: "uppercase",
                  color: T.text1,
                  marginBottom: "2rem",
                  width: "100%",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                {heroTitle}
              </motion.h1>

              {/* Hairline divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ height: "0.5px", background: `linear-gradient(to right, transparent, ${T.goldMuted}, transparent)`, margin: "0 auto 2rem", maxWidth: "400px" }}
              />

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="px-4 md:px-0"
                style={{
                  fontFamily: T.fontBody,
                  fontSize: `clamp(1rem, 3.5vw, ${heroDescSize}px)`,
                  color: T.text2,
                  fontWeight: 300,
                  lineHeight: 1.8,
                  maxWidth: "560px",
                  margin: "0 auto",
                }}
              >
                {heroDescription}
              </motion.p>

              {/* Scroll indicator */}
              <div style={{ marginTop: "5rem", display: "flex", justifyContent: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ ...labelStyle, writingMode: "vertical-rl", marginBottom: "0.5rem" }}>SCROLL</span>
                  <motion.div
                    animate={{ y: [0, 14, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                    style={{ width: "0.5px", height: "3rem", background: `linear-gradient(to bottom, ${T.gold}, transparent)` }}
                  />
                </div>
              </div>
            </motion.div>
          </section>

          {/* ══════════════════════════════════════
              ABOUT
          ══════════════════════════════════════ */}
          <section id="about" className="py-16 px-4 md:py-24 md:px-8 max-w-[1400px] mx-auto">
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }} className="lg:grid-cols-12">
              <div
                style={{ ...card, position: "relative", overflow: "hidden" }}
                className="premium-card lg:col-span-7 px-6 py-8 md:px-14 md:py-12"
              >
                {/* Gold ambient */}
                <div style={{ position: "absolute", top: "-4rem", right: "-4rem", width: "16rem", height: "16rem", background: `radial-gradient(ellipse, ${T.goldGlow} 0%, transparent 70%)`, pointerEvents: "none" }} />

                <SectionLabel>// The Archive</SectionLabel>

                <h3 style={{ fontFamily: T.fontDisplay, fontWeight: 700, fontStyle: "italic", fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.03em", textTransform: "uppercase", marginBottom: "2rem", lineHeight: 0.9, color: T.text1 }}>
                  {aboutUsTitle}
                </h3>

                <p style={{ fontFamily: T.fontBody, fontSize: "1.2rem", color: T.text2, lineHeight: 1.85, fontWeight: 300, maxWidth: "520px", marginBottom: "2.5rem" }}>
                  {aboutBio}
                </p>

                <div style={{ borderTop: `0.5px solid ${T.borderSubtle}` }} className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { label: "Location", value: aboutLocation },
                    { label: "Direct Contact", value: aboutEmail },
                  ].map(row => (
                    <div key={row.label}>
                      <span style={labelStyle}>{row.label}</span>
                      <span style={{ fontFamily: T.fontBody, fontStyle: "italic", color: T.text1, display: "block", marginTop: "6px", fontSize: "0.95rem", wordBreak: "break-all" }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ gap: "1.25rem" }} className="lg:col-span-5 flex flex-col xl:flex-row">
                {/* About image */}
                <div className="w-full xl:w-[260px] xl:shrink-0 flex justify-center xl:justify-start">
                  <div style={{ ...card, width: "100%", maxWidth: "320px", aspectRatio: "1/1", position: "relative", overflow: "hidden", padding: "6px" }}>
                    <Image
                      src={aboutImage || avatarUrl}
                      alt="About"
                      fill
                      className="img-warm-gray"
                      style={{ objectFit: "cover", borderRadius: "1.2rem" }}
                    />
                  </div>
                </div>

                {/* Years card */}
                <div
                  className="invert-card"
                  style={{
                    flex: 1,
                    background: T.bgInvert,
                    borderRadius: "1.5rem",
                    padding: "1.75rem 2rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    cursor: "default",
                    transition: `box-shadow 0.6s ${T.ease}`,
                  }}
                >
                  <span style={{ ...labelStyle, color: "rgba(26,26,24,0.45)" }}>Global Reach</span>
                  <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: "1rem" }}>
                    <span style={{ fontFamily: T.fontDisplay, fontWeight: 700, fontStyle: "italic", fontSize: "5.5rem", lineHeight: 1, letterSpacing: "-0.04em", color: T.textInvert }}>
                      {experience_years}+
                    </span>
                    <span style={{ fontFamily: T.fontLabel, fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(26,26,24,0.45)", textAlign: "right", lineHeight: 1.8 }}>
                      Years of<br />Industry<br />Experience
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════
              SKILLS
          ══════════════════════════════════════ */}
          <section id="skills" className="py-16 px-4 md:py-24 md:px-8" style={{ background: "rgba(255,255,255,0.008)" }}>
            <div style={{ maxWidth: "1400px", margin: "0 auto", textAlign: "center", marginBottom: "3.5rem", position: "relative" }}>
              <h2 style={{ fontFamily: T.fontDisplay, fontWeight: 700, fontSize: "clamp(4rem, 12vw, 10rem)", textTransform: "uppercase", letterSpacing: "-0.04em", opacity: 0.04, lineHeight: 1, color: T.text1, userSelect: "none" }}>
                TECHNICAL
              </h2>
              <h3 style={{ fontFamily: T.fontDisplay, fontWeight: 700, fontStyle: "italic", fontSize: "clamp(2rem, 5vw, 4rem)", textTransform: "uppercase", letterSpacing: "-0.03em", color: T.text1, marginTop: "-5vw", position: "relative", zIndex: 1 }}>
                Core Capabilities.
              </h3>
            </div>

            <div style={{ maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
              {displaySkills.map((skill, i) => {
                const itemsList = Array.isArray(skill.items)
                  ? skill.items
                  : typeof skill.items === "string"
                    ? skill.items.split(",").map(s => s.trim()).filter(Boolean)
                    : [];
                return (
                  <motion.div
                    key={i}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="skill-card premium-card p-6 md:p-8"
                    style={card}
                  >
                    <div style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>
                      {skill.icon && (skill.icon.startsWith("data:image") || skill.icon.startsWith("/") || skill.icon.startsWith("http")) ? (
                        <div style={{ width: "2.5rem", height: "2.5rem", position: "relative" }}>
                          <Image src={skill.icon} alt={skill.category || "Skill"} fill style={{ objectFit: "contain" }} />
                        </div>
                      ) : skill.icon}
                    </div>

                    <h4 style={{
                      fontFamily: T.fontDisplay,
                      fontWeight: 700,
                      fontSize: data?.skillCategoryFontSize ? `${data.skillCategoryFontSize}px` : "1.15rem",
                      color: T.text1,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      borderBottom: `0.5px solid rgba(184,147,90,0.15)`,
                      paddingBottom: "0.75rem",
                      marginBottom: "1rem",
                    }}>
                      {skill.category}
                    </h4>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                      {itemsList.map(item => (
                        <div key={item} className="skill-item" style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                          <div className="skill-dot" style={{ width: "3px", height: "3px", borderRadius: "50%", background: T.gold, opacity: 0, transition: `opacity 0.4s` }} />
                          <span style={{
                            fontFamily: T.fontLabel,
                            fontSize: data?.skillTagsFontSize ? `${data.skillTagsFontSize}px` : "9px",
                            color: T.text3,
                            textTransform: "uppercase",
                            letterSpacing: "0.22em",
                            transition: `color 0.4s ${T.ease}`,
                          }}>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* ══════════════════════════════════════
              SERVICES
          ══════════════════════════════════════ */}
          <section id="services" className="py-16 px-4 md:py-24 md:px-8" style={{ borderTop: `0.5px solid ${T.borderSubtle}` }}>
            <div style={{ maxWidth: "1400px", margin: "0 auto", textAlign: "center", marginBottom: "3.5rem" }}>
              <SectionLabel>Capabilities</SectionLabel>
              <h2 style={{ fontFamily: T.fontDisplay, fontWeight: 700, fontStyle: "italic", fontSize: "clamp(2.5rem, 7vw, 6rem)", textTransform: "uppercase", letterSpacing: "-0.03em", color: T.text1 }}>
                Services.
              </h2>
            </div>

            <div style={{ maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
              {displayServices.map((service, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="service-card premium-card p-8 md:p-10"
                  style={{ ...card, position: "relative", overflow: "hidden" }}
                >
                  <div
                    className="service-glow"
                    style={{ position: "absolute", top: "-3rem", right: "-3rem", width: "10rem", height: "10rem", background: `radial-gradient(ellipse, ${T.goldGlow} 0%, transparent 70%)`, opacity: 0, transition: `opacity 0.6s ${T.ease}`, pointerEvents: "none" }}
                  />
                  <div style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>
                    {service.icon && (service.icon.startsWith("data:image") || service.icon.startsWith("/") || service.icon.startsWith("http")) ? (
                      <div style={{ width: "3rem", height: "3rem", position: "relative" }}>
                        <Image src={service.icon} alt={service.title || "Service"} fill style={{ objectFit: "contain" }} />
                      </div>
                    ) : (service.icon || "✦")}
                  </div>
                  <h4
                    className="service-title"
                    style={{ fontFamily: T.fontDisplay, fontWeight: 700, fontSize: "1.35rem", textTransform: "uppercase", letterSpacing: "-0.01em", color: T.text1, marginBottom: "0.75rem", transition: `color 0.4s ${T.ease}` }}
                  >
                    {service.title || "Service"}
                  </h4>
                  <p style={{ fontFamily: T.fontBody, color: T.text2, fontWeight: 300, lineHeight: 1.75, fontSize: "0.95rem" }}>
                    {service.desc || "Service description goes here."}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ══════════════════════════════════════
              PROJECTS
          ══════════════════════════════════════ */}
          <section id="projects" className="py-16 px-4 md:py-24 md:px-8" style={{ borderTop: `0.5px solid ${T.borderSubtle}`, borderBottom: `0.5px solid ${T.borderSubtle}` }}>
            <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "4rem" }} className="md:flex-row md:justify-between md:items-end">
                <h2 style={{ fontFamily: T.fontDisplay, fontWeight: 700, fontStyle: "italic", fontSize: "clamp(3rem, 7vw, 6rem)", textTransform: "uppercase", letterSpacing: "-0.04em", lineHeight: 0.88, color: T.text1 }}>
                  The<br />Registry.
                </h2>
                <p style={{ fontFamily: T.fontLabel, fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: T.text3, maxWidth: "220px", textAlign: "right", lineHeight: 2 }}>
                  Selected High-Performance<br />Applications 2022 — 2024
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem" }}>
                {displayProjects.map((project, i) => {
                  const tags = Array.isArray(project.tags)
                    ? project.tags
                    : typeof project.tags === "string"
                      ? project.tags.split(",").map(t => t.trim()).filter(Boolean)
                      : [];
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      className="project-card"
                      style={{ cursor: "pointer" }}
                    >
                      {/* Image */}
                      <div
                        className="project-img-wrap"
                        style={{
                          aspectRatio: "16/11",
                          position: "relative",
                          overflow: "hidden",
                          borderRadius: "1.5rem",
                          background: T.bgRaised,
                          border: `0.5px solid ${T.border}`,
                          marginBottom: "2rem",
                          transition: `box-shadow 0.7s ${T.ease}`,
                        }}
                      >
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={project.title || "Project"}
                            fill
                            className="img-warm-gray"
                            style={{ objectFit: "cover", transition: `transform 1s ${T.ease}` }}
                          />
                        ) : (
                          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: T.bgOverlay, fontFamily: T.fontLabel, fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: T.text3 }}>
                            No Image
                          </div>
                        )}
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,10,8,0.85) 0%, rgba(8,10,8,0.2) 50%, transparent 100%)", transition: `opacity 0.6s ${T.ease}` }} />

                        {/* Arrow button */}
                        <div
                          className="project-arrow"
                          style={{
                            position: "absolute",
                            top: "1.25rem",
                            right: "1.25rem",
                            width: "3rem",
                            height: "3rem",
                            borderRadius: "50%",
                            background: T.gold,
                            color: T.bgBase,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1.2rem",
                            fontWeight: 700,
                            opacity: 0,
                            transform: "translateY(8px)",
                            transition: `opacity 0.5s ${T.ease}, transform 0.5s ${T.ease}`,
                          }}
                        >
                          ↗
                        </div>
                      </div>

                      {/* Meta */}
                      <div style={{ paddingLeft: "0.25rem" }}>
                        <div style={{ display: "flex", gap: "1rem", marginBottom: "0.75rem" }}>
                          {tags.map(tag => (
                            <span key={tag} style={{ fontFamily: T.fontLabel, fontSize: "8px", letterSpacing: "0.25em", textTransform: "uppercase", color: T.text3 }}>{tag}</span>
                          ))}
                        </div>
                        <h3
                          className="project-title"
                          style={{ fontFamily: T.fontDisplay, fontWeight: 700, fontStyle: "italic", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", textTransform: "uppercase", letterSpacing: "-0.03em", color: T.text1, marginBottom: "0.75rem", transition: `color 0.4s ${T.ease}` }}
                        >
                          {project.title}
                        </h3>
                        <p style={{ fontFamily: T.fontBody, color: T.text2, fontSize: "1rem", lineHeight: 1.8, fontWeight: 300 }}>
                          {project.desc}
                        </p>

                        <motion.div
                          whileHover={{ x: 8 }}
                          transition={{ duration: 0.4 }}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.75rem",
                            marginTop: "1.5rem",
                            fontFamily: T.fontLabel,
                            fontSize: "9px",
                            letterSpacing: "0.3em",
                            textTransform: "uppercase",
                            color: T.gold,
                            borderBottom: `0.5px solid ${T.goldMuted}`,
                            paddingBottom: "4px",
                          }}
                        >
                          Full Study [0{i + 1}]
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════
              EXPERIENCE
          ══════════════════════════════════════ */}
          <section id="experience" className="py-16 px-4 md:py-24 md:px-8" style={{ background: "rgba(14,17,14,0.3)" }}>
            <div style={{ maxWidth: "860px", margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                <SectionLabel>Professional Chronology</SectionLabel>
                <h2 style={{ fontFamily: T.fontDisplay, fontWeight: 700, fontStyle: "italic", fontSize: "clamp(2.5rem, 7vw, 6rem)", textTransform: "uppercase", letterSpacing: "-0.04em", color: T.text1 }}>
                  Career Path.
                </h2>
              </div>

              <div style={{ borderRadius: "1.5rem", overflow: "hidden", border: `0.5px solid ${T.border}` }}>
                {displayExperience.map((exp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.7 }}
                    className="exp-row flex flex-col md:grid md:grid-cols-[1fr_2.5fr_auto] gap-6 md:gap-8 p-6 md:p-10"
                    style={{
                      background: T.bgBase,
                      borderBottom: i < displayExperience.length - 1 ? `0.5px solid ${T.borderSubtle}` : "none",
                      cursor: "default",
                    }}
                  >
                    <div>
                      <span
                        className="exp-period"
                        style={{ fontFamily: T.fontLabel, fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: T.text3, display: "block", marginBottom: "0.75rem", transition: `color 0.4s ${T.ease}` }}
                      >
                        {exp.period}
                      </span>
                      <div
                        className="exp-bar"
                        style={{ width: "2rem", height: "0.5px", background: T.border, transition: `width 0.6s ${T.ease}, background 0.4s ${T.ease}` }}
                      />
                    </div>

                    <div>
                      <h4 style={{ fontFamily: T.fontDisplay, fontWeight: 700, fontStyle: "italic", fontSize: "1.6rem", letterSpacing: "-0.02em", color: T.text1, marginBottom: "0.3rem" }}>
                        {exp.role}
                      </h4>
                      <span style={{ fontFamily: T.fontBody, fontSize: "1rem", color: T.text2, display: "block", marginBottom: "0.75rem" }}>
                        {exp.company}
                      </span>
                      <p style={{ fontFamily: T.fontBody, fontSize: "0.9rem", color: T.text3, fontStyle: "italic", fontWeight: 300, lineHeight: 1.7 }}>
                        &quot;{exp.desc}&quot;
                      </p>
                    </div>

                    <div
                      className="exp-counter"
                      style={{
                        width: "3rem",
                        height: "3rem",
                        borderRadius: "50%",
                        border: `0.5px solid ${T.border}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: T.fontLabel,
                        fontSize: "9px",
                        color: T.text3,
                        flexShrink: 0,
                        transition: `color 0.4s ${T.ease}, border-color 0.4s ${T.ease}`,
                      }}
                    >
                      [0{i + 1}]
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════
              CONTACT
          ══════════════════════════════════════ */}
          <section id="contact" className="py-16 px-4 md:py-24 md:px-8" style={{ borderTop: `0.5px solid ${T.borderSubtle}`, background: "rgba(14,17,14,0.2)" }}>
            <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
              <SectionLabel>// Initialize Uplink</SectionLabel>
              <h2 style={{ fontFamily: T.fontDisplay, fontWeight: 700, fontStyle: "italic", fontSize: "clamp(3rem, 9vw, 7rem)", textTransform: "uppercase", letterSpacing: "-0.04em", lineHeight: 0.9, color: T.text1, marginBottom: "3.5rem" }}>
                Get In Touch.
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                {[
                  { label: "Direct Channel", value: email, href: `mailto:${email}` },
                  { label: "Comm Link", value: phone, href: `tel:${phone}` },
                  { label: "Base Coordinates", value: location, href: null },
                  { label: "System Status", value: availabilityStatus, href: null, isStatus: true },
                ].map((tile, i) => (
                  <div
                    key={i}
                    className="contact-tile p-6 md:p-8 flex flex-col items-center justify-center text-center gap-3"
                    style={{ ...card }}
                  >
                    <span className="tile-label" style={{ ...labelStyle, transition: `color 0.4s ${T.ease}` }}>{tile.label}</span>
                    {tile.isStatus ? (
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4A7C59", boxShadow: "0 0 10px rgba(74,124,89,0.5)", animation: "warmPulse 2.5s ease-in-out infinite" }} />
                        <span style={{ fontFamily: T.fontDisplay, fontStyle: "italic", fontWeight: 700, fontSize: "1.1rem", color: "#7AAF8A" }}>{tile.value}</span>
                      </div>
                    ) : tile.href ? (
                      <a href={tile.href} style={{ fontFamily: T.fontDisplay, fontStyle: "italic", fontWeight: 700, fontSize: "clamp(0.85rem, 1.8vw, 1.15rem)", color: T.text1, textDecoration: "none", transition: `color 0.4s ${T.ease}`, wordBreak: "break-all" }}>
                        {tile.value}
                      </a>
                    ) : (
                      <span style={{ fontFamily: T.fontDisplay, fontStyle: "italic", fontWeight: 700, fontSize: "1.1rem", color: T.text1 }}>{tile.value}</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-12 md:mt-16">
                {[
                  { label: "GitHub", href: githubUrl },
                  { label: "LinkedIn", href: linkedinUrl },
                  { label: "Twitter", href: twitterUrl },
                ].map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="footer-link"
                    style={{ fontFamily: T.fontLabel, fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: T.text3, textDecoration: "none", transition: `color 0.4s ${T.ease}` }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* ══════════════════════════════════════
            FOOTER
        ══════════════════════════════════════ */}
        <footer className="py-16 px-4 md:py-24 md:px-8" style={{ borderTop: `0.5px solid ${T.borderSubtle}` }}>
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

            {/* Brand col */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {footerLogo || logoUrl ? (
                <div style={{ width: "3rem", height: "3rem", position: "relative" }}>
                  <Image src={footerLogo || logoUrl} alt="Logo" fill style={{ objectFit: "contain" }} />
                </div>
              ) : (
                <span style={{ fontFamily: T.fontDisplay, fontWeight: 700, fontStyle: "italic", fontSize: "2.5rem", letterSpacing: "-0.04em", color: T.text1, lineHeight: 1 }}>
                  {name.charAt(0)}V.
                </span>
              )}
              <p style={{ ...labelStyle, lineHeight: 2.2, color: T.text3, whiteSpace: "pre-line" }}>
                {data?.footerDescription || "Architecting\nFuture Realities"}
              </p>
            </div>

            {/* System links */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <span style={{ fontFamily: T.fontLabel, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: T.text3, fontStyle: "italic" }}>System</span>
              {footerLinks?.length > 0
                ? footerLinks.map((link, i) => (
                  <a key={i} href={link.url || "#"} className="footer-link" style={{ ...labelStyle, textDecoration: "none", transition: `color 0.4s ${T.ease}` }}>
                    {link.label || "Link"}
                  </a>
                ))
                : [["#home", "Home"], ["#projects", "Work"], ["#about", "Bio"]].map(([href, lbl]) => (
                  <a key={lbl} href={href} className="footer-link" style={{ ...labelStyle, textDecoration: "none", transition: `color 0.4s ${T.ease}` }}>{lbl}</a>
                ))
              }
            </div>

            {/* Comm */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <span style={{ fontFamily: T.fontLabel, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: T.text3, fontStyle: "italic" }}>Comm Link</span>
              <a href={`mailto:${email}`} className="footer-link" style={{ ...labelStyle, textDecoration: "none", transition: `color 0.4s ${T.ease}`, wordBreak: "break-all" }}>{email}</a>
              <a href={`tel:${phone}`} className="footer-link" style={{ ...labelStyle, textDecoration: "none", transition: `color 0.4s ${T.ease}` }}>{phone}</a>
              <span style={{ ...labelStyle, whiteSpace: "pre-line" }}>{footerAddress || location}</span>
            </div>

            {/* Signal */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <span style={{ fontFamily: T.fontLabel, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: T.text3, fontStyle: "italic" }}>Signal</span>
              {[["GitHub", githubUrl], ["LinkedIn", linkedinUrl], ["Twitter", twitterUrl]].map(([lbl, href]) => (
                <a key={lbl} href={href} className="footer-link" style={{ ...labelStyle, textDecoration: "none", transition: `color 0.4s ${T.ease}` }}>{lbl}</a>
              ))}
            </div>
          </div>

          <Divider />

          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <span style={{ ...labelStyle, fontSize: "8px", letterSpacing: "0.35em" }}>
              {footerCopyright || `© ${new Date().getFullYear()} CORE_SYS_V1 / ${name}`}
            </span>
            <div style={{ display: "flex", gap: "2rem" }}>
              {["Privacy Protocol", "Terms of Service"].map(lbl => (
                <a key={lbl} href="#" className="footer-link" style={{ ...labelStyle, fontSize: "8px", letterSpacing: "0.25em", textDecoration: "none", transition: `color 0.4s ${T.ease}` }}>{lbl}</a>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4A7C59", animation: "warmPulse 2.5s ease-in-out infinite" }} />
              <span style={{ ...labelStyle, fontSize: "8px", letterSpacing: "0.25em" }}>
                SYSTEM_OPERATIONAL [ {location.toUpperCase()} ]
              </span>
            </div>
          </div>
        </footer>

      </div>
    </TemplateLayout>
  );
}