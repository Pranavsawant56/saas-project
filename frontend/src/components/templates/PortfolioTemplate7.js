import TemplateLayout from "./TemplateLayout";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

// ─── Gold design tokens (avoids broken Tailwind gold-500 classes) ─────────────
const G = "#D4AF37";
const G05 = "rgba(212,175,55,0.05)";
const G10 = "rgba(212,175,55,0.10)";
const G20 = "rgba(212,175,55,0.20)";
const G30 = "rgba(212,175,55,0.30)";
const G60 = "rgba(212,175,55,0.60)";

// ─── Marquee ticker (fixes duplicate-key bug: index scoped per copy) ──────────
const TICKER_TAGS = [
  "Brand Strategy", "Visual Identity", "Web Design",
  "Motion & UX", "Development", "Creative Direction",
  "Product Design", "Campaigns",
];

const MarqueeTicker = () => (
  <div
    style={{
      overflow: "hidden",
      borderTop: `1px solid ${G10}`,
      borderBottom: `1px solid ${G10}`,
      padding: "18px 0",
      background: "rgba(10,10,10,0.60)",
    }}
  >
    <motion.div
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      style={{ display: "flex", width: "max-content" }}
    >
      {/* Two copies for seamless loop — keys are unique via copy+index */}
      {[0, 1].map(copy =>
        TICKER_TAGS.map((tag, i) => (
          <span
            key={`ticker-${copy}-${i}`}
            style={{
              whiteSpace: "nowrap",
              padding: "0 28px",
              color: G,
              fontWeight: 700,
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              display: "flex",
              alignItems: "center",
              gap: 24,
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
            }}
          >
            {tag}
            <span style={{ color: "rgba(212,175,55,0.35)", fontSize: 16 }}>◆</span>
          </span>
        ))
      )}
    </motion.div>
  </div>
);

// ─── Horizontal scroll projects (adapted from T7 for gold aesthetic) ──────────
const HorizontalScrollProjects = ({ items = [] }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

  return (
    <>
      {/* Mobile stack */}
      <div className="block md:hidden space-y-8 px-4 pb-20">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            style={{
              position: "relative",
              height: 380,
              overflow: "hidden",
              borderRadius: 16,
              border: `1px solid ${G10}`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: 24,
            }}
          >
            <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                style={{ filter: "grayscale(1) brightness(0.45)" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.3) 60%, transparent 100%)" }} />
            </div>
            <div style={{ position: "relative", zIndex: 10 }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: G, textTransform: "uppercase", letterSpacing: "0.4em", display: "block", marginBottom: 8, fontStyle: "italic" }}>
                {item.tags || "WORK"}
              </span>
              <h3 style={{ fontSize: "1.5rem", color: "#fff", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", marginBottom: 8, lineHeight: 1.1 }}>
                {item.name}
              </h3>
              <p style={{ color: "#a1a1aa", fontSize: 13, fontStyle: "italic", marginBottom: 12, lineHeight: 1.6 }}>
                &quot;{item.desc}&quot;
              </p>
              <a
                href={item.link || "#"}
                style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3em", color: "#fff", borderBottom: `1px solid ${G}`, paddingBottom: 4 }}
              >
                Discover →
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop horizontal scroll */}
      <section ref={targetRef} className="hidden md:block relative" style={{ height: "250vh", background: "#0a0a0a" }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x, display: "flex", gap: 40, paddingLeft: 48, paddingRight: 48 }}>
            {items.map((item, idx) => (
              <div
                key={idx}
                className="group"
                style={{
                  position: "relative",
                  height: "46vh",
                  width: "36vw",
                  flexShrink: 0,
                  overflow: "hidden",
                  borderRadius: 16,
                  border: `1px solid ${G10}`,
                }}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-all duration-[2s] group-hover:scale-110"
                  style={{ filter: "grayscale(1)" }}
                  onMouseEnter={e => (e.currentTarget.style.filter = "grayscale(0)")}
                  onMouseLeave={e => (e.currentTarget.style.filter = "grayscale(1)")}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0a0a0a 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: G, textTransform: "uppercase", letterSpacing: "0.4em", display: "block", marginBottom: 8, fontStyle: "italic" }}>
                    {item.tags || "WORK"}
                  </span>
                  <h3 style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "#fff", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", marginBottom: 8, lineHeight: 1.1 }}>
                    {item.name}
                  </h3>
                  <p style={{ color: "#71717a", fontSize: 13, fontStyle: "italic", marginBottom: 16, lineHeight: 1.6, maxWidth: 320 }}>
                    &quot;{item.desc}&quot;
                  </p>
                  <a
                    href={item.link || "#"}
                    style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3em", color: "#fff", borderBottom: `1px solid ${G}`, paddingBottom: 4 }}
                    onMouseEnter={e => (e.currentTarget.style.color = G)}
                    onMouseLeave={e => (e.currentTarget.style.color = "#fff")}
                  >
                    Discover Experience →
                  </a>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

// ─── Reusable luxury card ─────────────────────────────────────────────────────
const LuxuryCard = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1, delay }}
    className={`backdrop-blur-xl rounded-2xl p-6 sm:p-10 transition-all duration-700 ${className}`}
    style={{ background: "rgba(10,10,10,0.40)", border: `1px solid ${G10}` }}
    onMouseEnter={e => (e.currentTarget.style.border = `1px solid ${G30}`)}
    onMouseLeave={e => (e.currentTarget.style.border = `1px solid ${G10}`)}
  >
    {children}
  </motion.div>
);

// ─── Section heading ──────────────────────────────────────────────────────────
const SectionHeading = ({ title, subtitle, centered = false, light = false }) => (
  <div className={`mb-16 sm:mb-24 ${centered ? "text-center" : ""}`}>
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="font-bold uppercase block mb-4 sm:mb-6"
      style={{ color: light ? "#f97316" : G, fontSize: 10, letterSpacing: "0.5em" }}
    >
      {subtitle}
    </motion.span>
    <h2
      className="font-serif tracking-tight leading-none italic"
      style={{
        fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
        color: light ? "#000" : "#fff",
        fontFamily: "'Cormorant Garamond', serif",
      }}
    >
      {title}
    </h2>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────
export default function PortfolioTemplate8({ data }) {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    name = "Aria Moss",
    navFontSize = 20,
    logoUrl = "",
    heroTitle = "CRAFTING TIMELESS DIGITAL LEGACIES.",
    heroSubtitle = "Principal Experience Architect",
    heroDescription = "Defining the intersection of digital craft and luxury experience. Orchestrating high-end digital journeys for global elite brands.",
    avatarUrl = "/images/templates/template-img-50.jpg",
    heroTitleSize = 72,
    heroSubtitleSize = 24,
    heroDescSize = 18,
    aboutUsTitle = "The Art of the Possible",
    aboutBio = "Defining the intersection of digital craft and luxury experience. Orchestrating high-end digital journeys for global elite brands. My work is an ongoing exploration of elegance and utility.",
    aboutImage = "/images/templates/template-img-50.jpg",
    experience_years = "08",
    aboutEmail = "aria@luxury.com",
    aboutPhone = "+1 777 000 7777",
    aboutLocation = "London, UK",
    projects = [],
    services = [],
    skills = [],
    experience = [],
    testimonials = [],
    email = "aria@luxury.com",
    githubUrl = "#",
    linkedinUrl = "#",
    footerCopyright = "",
  } = data || {};

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Defaults ────────────────────────────────────────────────────────────────
  const defaultProjects = [
    { name: "The Royal Suite", desc: "A seamless integration of heritage and technology for a legendary hotel group.", image: "/images/templates/template-img-11.jpg", link: "#", tags: "Hospitality · 2024" },
    { name: "Elysium Chrono", desc: "Digital boutique for artisanal watchmakers, focusing on precision and elegance.", image: "/images/templates/template-img-12.jpg", link: "#", tags: "Luxury Retail" },
    { name: "Vogue Global Hub", desc: "Reimagining the digital presence of the world's leading fashion authority.", image: "/images/templates/template-img-21.jpg", link: "#", tags: "Editorial" },
  ];
  const defaultSkills = [
    { category: "Creative Direction", items: "Strategy, UI/UX, Motion, Vision" },
    { category: "Technological Craft", items: "Next.js, Three.js, GSAP, Shaders" },
    { category: "Experience Design", items: "Luxury Branding, Accessibility, Art Direction" },
  ];
  const defaultExperience = [
    { role: "Executive Director", company: "Vogue Global", period: "2020 – Present", desc: "Orchestrating the digital transformation of heritage fashion content." },
    { role: "Senior Architect", company: "Stripe Luxury", period: "2017 – 2020", desc: "Defining elite payment experiences for high-net-worth ecosystems." },
  ];
  const defaultServices = [
    { title: "Digital Strategy", desc: "Tailored strategies for elite brands seeking digital immortality.", icon: "⚜️" },
    { title: "Art Direction", desc: "Crafting visual languages that resonate with sophisticated audiences.", icon: "💎" },
    { title: "Experience Hub", desc: "Building high-performance ecosystems with artisanal code.", icon: "🏛️" },
  ];
  const defaultTestimonials = [
    { text: "Aria's vision for digital luxury is unparalleled. She doesn't just build websites; she crafts heirlooms.", name: "JULIAN VANE", role: "FOUNDER @ VANE LUXURY" },
    { text: "Working with Aria was like commissioning a master architect. Every pixel felt intentional, every interaction refined.", name: "SOPHIA ELLIOT", role: "CEO @ MAISON ELLIOT" },
  ];

  const displayProjects = projects.length > 0 ? projects : defaultProjects;
  const displaySkills = skills.length > 0 ? skills : defaultSkills;
  const displayExperience = experience.length > 0 ? experience : defaultExperience;
  const displayServices = services.length > 0 ? services : defaultServices;
  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

  if (!mounted) return null;

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <TemplateLayout data={data} theme="dark" category="Portfolio" hideHeader={true} hideFooter={true}>
      <div
        className="min-h-screen text-zinc-300 overflow-x-hidden"
        style={{ background: "#0a0a0a", fontFamily: "'Cormorant Garamond', serif" }}
      >

        {/* ── Ambient bokeh ───────────────────────────────────────────────────── */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute rounded-full animate-pulse" style={{ top: "-20%", left: "-10%", width: 600, height: 600, background: "rgba(212,175,55,0.04)", filter: "blur(120px)" }} />
          <div className="absolute rounded-full" style={{ bottom: "-10%", right: "-20%", width: 500, height: 500, background: "rgba(30,30,30,0.5)", filter: "blur(120px)" }} />
        </div>

        {/* ── Navigation ──────────────────────────────────────────────────────── */}
        <nav
          className="sticky top-0 left-0 right-0 z-[110] px-6 sm:px-12 md:px-20 py-8 flex justify-center transition-all duration-700"
          style={isScrolled ? { background: "rgba(0,0,0,0.88)", backdropFilter: "blur(32px)", paddingTop: "1.5rem", paddingBottom: "1.5rem", borderBottom: `1px solid ${G10}` } : { background: "transparent" }}
        >
          <div className="max-w-[1600px] w-full flex justify-between items-center">
            {/* Logo */}
            {logoUrl ? (
              <Image src={logoUrl} alt={name} width={40} height={40} className="p-1" style={{ border: `1px solid ${G20}` }} />
            ) : (
              <div className="px-4 sm:px-6 py-1" style={{ borderLeft: `1px solid ${G20}`, borderRight: `1px solid ${G20}`, background: "rgba(0,0,0,0.4)" }}>
                <span className="italic text-white uppercase" style={{ fontSize: navFontSize, letterSpacing: "0.2em" }}>
                  {name}
                </span>
              </div>
            )}

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8 lg:gap-10">
              {navLinks.map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-bold uppercase italic transition-all"
                  style={{ fontSize: 10, letterSpacing: "0.4em", color: "#71717a" }}
                  onMouseEnter={e => (e.currentTarget.style.color = G)}
                  onMouseLeave={e => (e.currentTarget.style.color = "#71717a")}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Mobile hamburger */}
            <div className="flex md:hidden z-[130]">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-10 h-10 rounded flex items-center justify-center transition-all"
                style={{ border: `1px solid ${isMenuOpen ? G : G30}`, color: G, background: "rgba(0,0,0,0.85)" }}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* ── Mobile drawer ────────────────────────────────────────────────────── */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 right-0 w-full sm:w-[320px] z-[120] p-8 flex flex-col justify-between"
              style={{ background: "rgba(10,10,10,0.98)", backdropFilter: "blur(32px)", borderLeft: `1px solid ${G20}` }}
            >
              <div className="space-y-12 pt-20">
                <div className="pb-4" style={{ borderBottom: `1px solid ${G20}` }}>
                  <span className="uppercase font-bold italic" style={{ fontSize: 9, letterSpacing: "0.5em", color: G }}>
                    CONCIERGE DIRECTORY
                  </span>
                </div>
                <div className="flex flex-col gap-6 text-base italic" style={{ color: "#a1a1aa" }}>
                  {navLinks.map(item => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="py-1 flex items-center gap-3 transition-colors"
                      onMouseEnter={e => (e.currentTarget.style.color = G)}
                      onMouseLeave={e => (e.currentTarget.style.color = "#a1a1aa")}
                    >
                      <span style={{ color: `${G}55`, fontSize: 12 }}>⚜</span>
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="text-[8px] uppercase pt-6" style={{ letterSpacing: "0.4em", color: "#52525b", borderTop: `1px solid ${G10}` }}>
                {name.toUpperCase()} STUDIO © {new Date().getFullYear()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="relative z-10">

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              01 · HERO
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <section id="home" className="min-h-screen flex flex-col justify-center max-w-[1600px] mx-auto relative overflow-hidden pt-20 px-4 sm:px-6 md:px-8">
            {avatarUrl && (
              <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl">
                <Image src={avatarUrl} alt="Hero background" fill className="object-cover" style={{ opacity: 0.22, filter: "grayscale(1) brightness(0.3)" }} priority />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #0a0a0a 0%, transparent 40%, #0a0a0a 100%)" }} />
              </div>
            )}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 space-y-6"
            >
              <div className="flex items-center gap-6 mb-4">
                <div className="h-[1px] w-12 sm:w-20" style={{ background: `${G}55` }} />
                <span className="font-bold uppercase italic" style={{ color: G, letterSpacing: "0.6em", fontSize: `clamp(1rem, 3.5vw, ${heroSubtitleSize}px)` }}>
                  {heroSubtitle}
                </span>
              </div>
              <h1 className="italic text-white leading-[1.05] tracking-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: `clamp(2rem, 8vw, ${heroTitleSize}px)`, wordBreak: "break-word" }}>
                {heroTitle}
              </h1>
              <p className="text-zinc-400 max-w-3xl leading-relaxed italic font-light" style={{ fontSize: `clamp(0.95rem, 2.5vw, ${heroDescSize}px)` }}>
                &quot;{heroDescription}&quot;
              </p>
              {/* Hero stat strip */}
              <div className="flex flex-wrap gap-12 pt-10" style={{ borderTop: `1px solid ${G10}` }}>
                {[
                  { val: `${experience_years}+`, label: "Years Active" },
                  { val: `${displayProjects.length * 10}+`, label: "Projects Delivered" },
                  { val: "Global", label: "Client Reach" },
                ].map((s, i) => (
                  <div key={i}>
                    <p className="text-white font-bold italic" style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)", fontFamily: "'Cormorant Garamond', serif" }}>{s.val}</p>
                    <p className="uppercase font-bold" style={{ fontSize: 10, letterSpacing: "0.3em", color: "#52525b" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              TICKER MARQUEE
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <MarqueeTicker />

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              02 · PROJECTS  (Horizontal scroll — from T7)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <section id="projects" className="py-16 md:py-0">
            <div className="px-4 sm:px-6 md:px-12 py-16 max-w-[1600px] mx-auto">
              <h2
                className="font-serif italic tracking-tighter"
                style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)", color: "rgba(212,175,55,0.10)", marginBottom: "-2rem", position: "relative", zIndex: 0 }}
              >
                FEATURE_WORK
              </h2>
              <div className="relative z-10 flex justify-between items-end mt-4 md:mt-0">
                <span style={{ color: G, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6em", fontStyle: "italic" }}>
                  CASE_STUDIES
                </span>
                <span className="hidden sm:block" style={{ color: "#52525b", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3em" }}>
                  SCROLL_DOWN
                </span>
              </div>
            </div>
            <HorizontalScrollProjects items={displayProjects} />
          </section>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              03 · ABOUT
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <section
            id="about"
            className="py-24 sm:py-40 rounded-3xl px-4 sm:px-8 mx-4"
            style={{ background: "rgba(10,10,10,0.55)" }}
          >
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-40 items-center">
              {/* Image with offset border */}
              <div className="relative w-full">
                <div
                  className="aspect-[3/4] relative rounded-sm overflow-hidden z-10 transition-all duration-1000 shadow-2xl w-full"
                  style={{ filter: "grayscale(1)" }}
                  onMouseEnter={e => (e.currentTarget.style.filter = "grayscale(0)")}
                  onMouseLeave={e => (e.currentTarget.style.filter = "grayscale(1)")}
                >
                  <Image src={aboutImage || avatarUrl || "/images/templates/template-img-50.jpg"} alt="About" fill className="object-cover" />
                </div>
                <div className="absolute -top-8 -left-8 sm:-top-10 sm:-left-10 w-full h-full -z-0 rounded-sm" style={{ border: `1px solid ${G20}` }} />
                <div className="absolute -bottom-6 -right-6 p-8 z-20 hidden md:block" style={{ background: "#0a0a0a", border: `1px solid ${G10}` }}>
                  <p className="italic mb-2" style={{ color: G, fontSize: "2rem", fontFamily: "'Cormorant Garamond', serif" }}>{experience_years}+</p>
                  <p className="font-bold uppercase" style={{ fontSize: 10, letterSpacing: "0.2em", color: "#71717a" }}>Years of Excellence</p>
                </div>
              </div>
              {/* Text */}
              <div className="space-y-10">
                <SectionHeading title={aboutUsTitle} subtitle="THE PHILOSOPHY" />
                <p className="text-zinc-400 font-light italic leading-relaxed" style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}>
                  &quot;{aboutBio}&quot;
                </p>
                <div className="grid grid-cols-2 gap-6 pt-8" style={{ borderTop: `1px solid ${G10}` }}>
                  {[
                    { label: "Email", value: aboutEmail },
                    { label: "Phone", value: aboutPhone },
                    { label: "Location", value: aboutLocation },
                    { label: "Experience", value: `${experience_years}+ Years` },
                  ].map((item, i) => (
                    <div key={i}>
                      <span className="font-bold uppercase block mb-1" style={{ fontSize: 9, letterSpacing: "0.4em", color: G }}>{item.label}</span>
                      <span className="text-zinc-400 italic" style={{ fontSize: 13 }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              04 · SKILLS  (standalone section — from T7)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <section id="skills" className="py-24 md:py-32 max-w-[1600px] mx-auto px-4 sm:px-8">
            {/* Header row */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-end pb-10 gap-4 mb-16 sm:mb-24" style={{ borderBottom: `1px solid ${G10}` }}>
              <SectionHeading title="Core Expertise" subtitle="DISCIPLINES" />
              <span className="italic font-serif mb-6 sm:mb-10" style={{ color: G60, fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
                /0{displaySkills.length}
              </span>
            </div>
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
              {displaySkills.map((skill, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.12 }}
                  className="group flex flex-col justify-between h-full"
                  style={{ gap: "2rem" }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <span className="font-bold uppercase block" style={{ fontSize: 10, letterSpacing: "0.4em", color: "#3f3f46" }}>
                      PILLAR_{String(idx + 1).padStart(2, "0")}
                    </span>
                    <h4 className="italic text-white leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}>
                      {skill.category}
                    </h4>
                    <p className="text-zinc-500 italic leading-relaxed" style={{ fontSize: 13 }}>
                      &gt; {skill.items}
                    </p>
                  </div>
                  <div
                    className="h-px w-full transition-colors duration-700"
                    style={{ background: G10 }}
                    onMouseEnter={e => (e.currentTarget.style.background = G)}
                    onMouseLeave={e => (e.currentTarget.style.background = G10)}
                  />
                </motion.div>
              ))}
            </div>
          </section>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              05 · EXPERIENCE  (White contrast flip — from T7)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <section
            id="experience"
            className="py-24 md:py-32 px-4 sm:px-6 md:px-12 rounded-3xl mx-4"
            style={{ background: "#fff", color: "#000" }}
          >
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Left column headline */}
              <div className="lg:col-span-4">
                <h2 className="italic leading-tight tracking-tighter" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3rem, 7vw, 5rem)", color: "#000" }}>
                  THE<br />JOURNEY
                </h2>
                <p className="mt-6 max-w-xs italic" style={{ fontSize: "1.1rem", color: "#71717a" }}>
                  A chronicle of refined craft and digital leadership.
                </p>
                {/* Gold accent */}
                <div className="mt-10 hidden lg:flex items-center gap-4">
                  <div style={{ width: 32, height: 32, background: G, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>⚜</div>
                  <span className="font-bold uppercase italic" style={{ fontSize: 9, letterSpacing: "0.4em", color: "#a1a1aa" }}>HERITAGE TIMELINE</span>
                </div>
              </div>
              {/* Right column entries */}
              <div className="lg:col-span-8 space-y-12 sm:space-y-16">
                {displayExperience.map((exp, idx) => (
                  <div
                    key={idx}
                    className="group relative flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-8 pb-10 transition-colors"
                    style={{ borderBottom: "1px solid #e4e4e7" }}
                    onMouseEnter={e => (e.currentTarget.style.borderBottomColor = G)}
                    onMouseLeave={e => (e.currentTarget.style.borderBottomColor = "#e4e4e7")}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <span className="font-bold uppercase block" style={{ fontSize: 10, color: G, letterSpacing: "0.4em" }}>{exp.period}</span>
                      <h3 className="italic tracking-tighter uppercase" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", color: "#000" }}>
                        {exp.role}
                      </h3>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, textAlign: "right" }}>
                      <p className="font-bold uppercase tracking-wide" style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)", color: "#a1a1aa" }}>{exp.company}</p>
                      <p className="italic max-w-sm" style={{ fontSize: 12, color: "#71717a" }}>&quot;{exp.desc}&quot;</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              06 · SERVICES
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <section id="services" className="py-24 sm:py-40 max-w-[1600px] mx-auto px-4 sm:px-8">
            <SectionHeading title="Signature Offerings" subtitle="SERVICES" centered />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              {displayServices.map((service, idx) => (
                <LuxuryCard key={idx} delay={idx * 0.1} className="flex flex-col justify-between h-full">
                  <div>
                    <div className="mb-8 sm:mb-12 opacity-50" style={{ fontSize: "2.5rem" }}>{service.icon}</div>
                    <h3 className="italic text-white mb-4 sm:mb-6 uppercase" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1rem, 2vw, 1.5rem)" }}>
                      {service.title}
                    </h3>
                    <p className="italic mb-8" style={{ fontSize: 13, color: "#71717a", lineHeight: 1.7 }}>
                      &quot;{service.desc}&quot;
                    </p>
                  </div>
                  <div className="h-[1px] w-12" style={{ background: G60 }} />
                </LuxuryCard>
              ))}
            </div>
          </section>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              07 · TESTIMONIALS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <section className="py-24 sm:py-40 max-w-[1600px] mx-auto px-4 sm:px-8">
            <SectionHeading title="The Commendations" subtitle="REMARKS" centered />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {displayTestimonials.map((t, i) => (
                <LuxuryCard key={i} delay={i * 0.1} className="text-center flex flex-col justify-between h-full p-8 sm:p-12">
                  <p className="italic text-zinc-300 leading-relaxed mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)" }}>
                    &quot;{t.text}&quot;
                  </p>
                  <div className="flex flex-col items-center gap-2" style={{ borderTop: `1px solid ${G10}`, paddingTop: "1.5rem" }}>
                    <span className="font-bold uppercase" style={{ color: G, fontSize: 10, letterSpacing: "0.3em" }}>{t.name}</span>
                    <span style={{ fontSize: 9, letterSpacing: "0.2em", color: "#52525b", textTransform: "uppercase" }}>{t.role}</span>
                  </div>
                </LuxuryCard>
              ))}
            </div>
          </section>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              08 · CONTACT
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <section id="contact" className="py-32 sm:py-48 text-center relative overflow-hidden px-4">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none" style={{ width: 800, height: 800, background: `${G}07`, filter: "blur(150px)" }} />
            <div className="max-w-4xl mx-auto relative z-10 space-y-12">
              <h2
                className="italic text-white tracking-tighter uppercase leading-none mb-12 sm:mb-20"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3rem, 12vw, 9rem)" }}
              >
                Establish<br />
                <span style={{ color: G }}>Uplink.</span>
              </h2>
              <div className="flex flex-col items-center gap-10 sm:gap-16 mb-20 sm:mb-32">
                <a
                  href={`mailto:${email}`}
                  className="italic text-white transition-all duration-700 break-all"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.25rem, 4vw, 3rem)", borderBottom: `2px solid ${G}`, paddingBottom: "0.5rem" }}
                  onMouseEnter={e => (e.currentTarget.style.color = G)}
                  onMouseLeave={e => (e.currentTarget.style.color = "#fff")}
                >
                  {email}
                </a>
                <div className="flex flex-wrap justify-center gap-8 sm:gap-16 font-bold uppercase" style={{ fontSize: 10, letterSpacing: "0.5em", color: "#52525b" }}>
                  <a href={linkedinUrl} className="transition-colors" onMouseEnter={e => (e.currentTarget.style.color = "#fff")} onMouseLeave={e => (e.currentTarget.style.color = "#52525b")}>LinkedIn</a>
                  <a href={githubUrl} className="transition-colors" onMouseEnter={e => (e.currentTarget.style.color = "#fff")} onMouseLeave={e => (e.currentTarget.style.color = "#52525b")}>GitHub</a>
                </div>
              </div>

              {/* Contact form */}
              <div className="max-w-2xl mx-auto">
                <LuxuryCard className="p-8 sm:p-16 space-y-8 sm:space-y-10 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
                    {[
                      { label: "Patron Name", placeholder: "Julian Vane", type: "text" },
                      { label: "Private Email", placeholder: "vane@estates.com", type: "email" },
                    ].map(field => (
                      <div key={field.label} className="space-y-3">
                        <label className="font-bold uppercase" style={{ fontSize: 10, letterSpacing: "0.2em", color: G }}>{field.label}</label>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          className="w-full bg-transparent py-3 outline-none italic text-white transition-all"
                          style={{ borderBottom: `1px solid ${G20}`, fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" }}
                          onFocus={e => (e.currentTarget.style.borderBottomColor = G)}
                          onBlur={e => (e.currentTarget.style.borderBottomColor = G20)}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <label className="font-bold uppercase" style={{ fontSize: 10, letterSpacing: "0.2em", color: G }}>The Brief</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your legacy project..."
                      className="w-full bg-transparent py-3 outline-none italic resize-none text-white transition-all"
                      style={{ borderBottom: `1px solid ${G20}`, fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" }}
                      onFocus={e => (e.currentTarget.style.borderBottomColor = G)}
                      onBlur={e => (e.currentTarget.style.borderBottomColor = G20)}
                    />
                  </div>
                  <button
                    className="w-full py-5 font-bold uppercase transition-all duration-700"
                    style={{ border: `1px solid ${G}`, color: G, fontSize: 11, letterSpacing: "0.5em" }}
                    onMouseEnter={e => { e.currentTarget.style.background = G; e.currentTarget.style.color = "#000"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = G; }}
                  >
                    Send Transmission
                  </button>
                </LuxuryCard>
              </div>
            </div>
          </section>
        </main>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            FOOTER  (gold icon accent — from T7 style)
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <footer className="py-16" style={{ borderTop: `1px solid ${G10}` }}>
          <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-10 text-center md:text-left px-4 sm:px-8">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              {/* Gold icon box (adapted from T7's orange X box) */}
              <div style={{ width: 36, height: 36, background: G, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#000", flexShrink: 0 }}>
                ⚜
              </div>
              <span className="italic text-white uppercase tracking-tighter" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}>{name}</span>
              <span className="hidden sm:block h-4 w-[1px] bg-zinc-800" />
              <span className="font-bold uppercase" style={{ fontSize: 10, letterSpacing: "0.5em", color: "#52525b" }}>
                {footerCopyright || `© ${new Date().getFullYear()} / DIGITAL_HEIRLOOM_V8`}
              </span>
            </div>
            <div className="flex justify-center gap-12 sm:gap-16 font-bold uppercase" style={{ fontSize: 10, letterSpacing: "0.5em", color: "#52525b" }}>
              <a href="#" className="transition-colors" onMouseEnter={e => (e.currentTarget.style.color = G)} onMouseLeave={e => (e.currentTarget.style.color = "#52525b")}>Privacy</a>
              <a href="#" className="transition-colors" onMouseEnter={e => (e.currentTarget.style.color = G)} onMouseLeave={e => (e.currentTarget.style.color = "#52525b")}>Terms</a>
              <a href="#" className="transition-colors" onMouseEnter={e => (e.currentTarget.style.color = G)} onMouseLeave={e => (e.currentTarget.style.color = "#52525b")}>Concierge</a>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-bold uppercase transition-colors"
              style={{ fontSize: 10, letterSpacing: "0.4em", color: "#52525b", background: "rgba(255,255,255,0.04)", padding: "10px 20px", border: `1px solid ${G10}` }}
              onMouseEnter={e => { e.currentTarget.style.color = G; e.currentTarget.style.borderColor = G; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#52525b"; e.currentTarget.style.borderColor = G10; }}
            >
              Top ↑
            </motion.button>
          </div>
        </footer>

        {/* ── Font import ─────────────────────────────────────────────────────── */}
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap');
          html { scroll-behavior: smooth; }
          ::-webkit-scrollbar { width: 3px; }
          ::-webkit-scrollbar-track { background: #0a0a0a; }
          ::-webkit-scrollbar-thumb { background: #D4AF37; }
        `}</style>
      </div>
    </TemplateLayout>
  );
}