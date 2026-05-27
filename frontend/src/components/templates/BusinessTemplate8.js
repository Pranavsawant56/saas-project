import TemplateLayout from "./TemplateLayout";
import { motion, useInView, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState, useCallback } from "react";

// ─── Easing Curves ────────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1];
const EASE_BACK = [0.34, 1.56, 0.64, 1];

// ─── Motion Variants ──────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 60, filter: "blur(10px)" },
  visible: (i = 0) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE, delay: i * 0.12 },
  }),
};
const fadeLeft = {
  hidden: { opacity: 0, x: -80, filter: "blur(8px)" },
  visible: (i = 0) => ({
    opacity: 1, x: 0, filter: "blur(0px)",
    transition: { duration: 0.85, ease: EASE, delay: i * 0.1 },
  }),
};
const fadeRight = {
  hidden: { opacity: 0, x: 80, filter: "blur(8px)" },
  visible: (i = 0) => ({
    opacity: 1, x: 0, filter: "blur(0px)",
    transition: { duration: 0.85, ease: EASE, delay: i * 0.1 },
  }),
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.8, rotate: -3 },
  visible: (i = 0) => ({
    opacity: 1, scale: 1, rotate: 0,
    transition: { duration: 0.7, ease: EASE_BACK, delay: i * 0.09 },
  }),
};
const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

// ─── Magnetic Button ──────────────────────────────────────────────────────────
const MagneticBtn = ({ children, className, style, href, onClick }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  const Tag = href ? "a" : "button";
  return (
    <motion.div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} style={{ display: "inline-block" }}>
      <motion.div style={{ x: sx, y: sy }}>
        <Tag href={href} onClick={onClick} className={className} style={style}>{children}</Tag>
      </motion.div>
    </motion.div>
  );
};

// ─── Horizontal Scroll Ticker ─────────────────────────────────────────────────
const Ticker = ({ items, speed = 35, reverse = false }) => {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      <motion.div
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", gap: 0, width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 24,
            padding: "0 32px", whiteSpace: "nowrap",
            fontFamily: "'Clash Display', 'Space Grotesk', sans-serif",
            fontSize: 15, fontWeight: 500,
            color: "rgba(255,255,255,0.45)",
            borderRight: "1px solid rgba(255,255,255,0.1)",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#A3E635", flexShrink: 0 }} />
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// ─── Vertical Scroll Cards (Stacked) ─────────────────────────────────────────
const StackCard = ({ children, index, total, isMobile }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1 - (total - index) * 0.03]);
  const y = useTransform(scrollYProgress, [0, 1], [60, -(total - index) * 12]);

  if (isMobile) {
    return <div ref={ref}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ scale, y, position: "sticky", top: 120 + index * 16, zIndex: index + 1 }}>
      {children}
    </motion.div>
  );
};

// ─── Marquee Testimonials (Horizontal Carousel) ───────────────────────────────
const TestimonialMarquee = ({ items }) => {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden" }}>
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", gap: 24, width: "max-content" }}
      >
        {doubled.map((t, i) => (
          <div key={i} className="t8-card-green" style={{
            width: 380, flexShrink: 0, padding: "32px 36px"
          }}>
            <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
              {[...Array(5)].map((_, j) => (
                <svg key={j} width="15" height="15" viewBox="0 0 24 24" fill="#A3E635">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.75, marginBottom: 24, fontStyle: "italic" }}>"{t.review}"</p>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #166534, #4ade80)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16, color: "#052e16" }}>
                {t.name?.[0]}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{t.name}</div>
                <div style={{ fontSize: 12, color: "#A3E635", fontFamily: "'Space Mono', monospace" }}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// ─── Accordion FAQ ────────────────────────────────────────────────────────────
const FAQItem8 = ({ q, a, idx }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp} custom={idx * 0.3}
      style={{ borderBottom: "1px solid rgba(163,230,53,0.15)", overflow: "hidden" }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "24px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 16
      }}>
        <span style={{ fontFamily: "'Clash Display', 'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, color: "#fff" }}>{q}</span>
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3, ease: EASE }}
          style={{
            width: 34, height: 34, borderRadius: 10, flexShrink: 0,
            background: open ? "#A3E635" : "rgba(163,230,53,0.1)",
            border: "1px solid rgba(163,230,53,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: open ? "#052e16" : "#A3E635", fontSize: 22, lineHeight: 1
          }}>+</motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }} style={{ overflow: "hidden" }}>
            <p style={{ paddingBottom: 24, fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, margin: 0 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Floating Counter ─────────────────────────────────────────────────────────
const CountUp = ({ end, suffix = "", duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
};

// ─── Section Tag ──────────────────────────────────────────────────────────────
const Tag8 = ({ children, dark }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16,
    padding: "6px 16px", borderRadius: 100,
    background: dark ? "rgba(163,230,53,0.1)" : "rgba(5,46,22,0.08)",
    border: `1px solid ${dark ? "rgba(163,230,53,0.3)" : "rgba(5,46,22,0.15)"}`,
    fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 500,
    color: dark ? "#A3E635" : "#166534", letterSpacing: "0.15em", textTransform: "uppercase"
  }}>
    <span style={{ width: 5, height: 5, borderRadius: "50%", background: dark ? "#A3E635" : "#166534", boxShadow: dark ? "0 0 6px #A3E635" : "none" }} />
    {children}
  </span>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BusinessTemplate8({ data }) {
  const {
    headerType, companyName, logoUrl, companyNameFontSize,
    heroTitle, heroTitleFontSize, tagline, taglineFontSize, heroImage,
    aboutUsTitle, aboutUsTitleFontSize, aboutUsContent, aboutUsContentFontSize, aboutUsImage,
    services = [], features = [], portfolio = [], team = [],
    testimonials = [], pricing = [], faq = [], blog = [],
    contactTitle, contactEmail, address, countryCode, phone,
    ctaTitle, ctaDesc, ctaButtonText, ctaButtonLink,
    footerDescription, facebookUrl, twitterUrl, linkedinUrl, footerCopyright
  } = data || {};

  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkBreakpoints = () => {
      setIsMobile(window.innerWidth <= 640);
      setIsTablet(window.innerWidth <= 900);
    };
    checkBreakpoints();
    window.addEventListener("resize", checkBreakpoints);
    return () => window.removeEventListener("resize", checkBreakpoints);
  }, []);

  const displayName = companyName || "Verdant Studio";
  const displayPhone = phone ? `${countryCode ? countryCode.split(" ")[0] : ""} ${phone}` : "";

  const activeServices = services?.some(s => s.name || s.desc) ? services : [
    { name: "Brand Systems", desc: "Cohesive visual languages that speak before you say a word — from logomark to motion identity.", icon: "⬡" },
    { name: "Product Design", desc: "Pixel-perfect, research-backed interfaces that delight users and hit business metrics.", icon: "◈" },
    { name: "Growth Engine", desc: "Full-funnel marketing systems driven by first-party data and ruthless experimentation.", icon: "◉" },
    { name: "Dev & Engineering", desc: "Scalable, performant codebases built to last — not just to ship.", icon: "◫" },
    { name: "Content Strategy", desc: "Narratives that earn attention, build trust, and turn readers into advocates.", icon: "◳" },
    { name: "Data Intelligence", desc: "Bespoke dashboards and predictive models that make complexity legible.", icon: "◐" },
  ];

  const activeFeatures = features?.some(f => f.title || f.desc) ? features : [
    { title: "Zero-latency Execution", desc: "Our proprietary edge infrastructure ensures your product responds in under 80ms — anywhere on earth. We benchmark ruthlessly and never settle for 'good enough' performance.", tag: "Infrastructure" },
    { title: "AI-augmented Workflows", desc: "We embed intelligent automation at every friction point — from content generation to QA — cutting delivery cycles by 60% without sacrificing craft.", tag: "Intelligence" },
    { title: "Radical Transparency", desc: "Every decision, deadline, and dollar is tracked in your shared workspace. No black boxes, no billing surprises — just clear, collaborative execution.", tag: "Process" },
  ];

  const activeTeam = team?.some(t => t.name) ? team : [
    { name: "Zara Osei", role: "Chief Creative", bio: "Former IDEO partner. Redesigned products used by 200M+ people.", color: "#A3E635" },
    { name: "Lucien Vance", role: "CTO", bio: "Ex-Google Brain. Obsessed with systems that scale gracefully.", color: "#34d399" },
    { name: "Mira Tanaka", role: "Strategy Director", bio: "BCG alum. Turns business chaos into clear competitive advantage.", color: "#fb923c" },
    { name: "Theo Brandt", role: "Head of Growth", bio: "Grew 3 DTC brands from $0 to $50M ARR.", color: "#c084fc" },
  ];

  const activeTestimonials = testimonials?.some(t => t.name || t.review) ? testimonials : [
    { name: "Aisha Nwosu", role: "CEO, Prism Health", review: "Verdant didn't just redesign our product — they rewired how our entire team thinks about UX. The results were immediate and dramatic." },
    { name: "Carlos Vidal", role: "CTO, Loopstack", review: "I've worked with 12 agencies. Verdant is the first that actually delivered ahead of schedule with zero quality compromises." },
    { name: "Nina Bergström", role: "CMO, Floe", review: "Our rebrand tripled inbound pipeline in one quarter. I've never seen ROI this clean from a creative investment." },
    { name: "Kwame Asante", role: "Founder, Petal", review: "The team operates like a senior in-house function — deeply integrated, incredibly fast, and genuinely invested in your success." },
    { name: "Leila Moussavi", role: "VP Product, Arcova", review: "From strategy to pixel, every deliverable was exceptional. They've become a long-term partner, not just a vendor." },
  ];

  const activePricing = pricing?.some(p => p.planName) ? pricing : [
    { planName: "Sprint", price: "$4,800", period: "/ project", features: "1 Deliverable Track, 2-week timeline, Senior designer, 2 revision rounds, Figma handoff", highlight: false },
    { planName: "Momentum", price: "$9,500", period: "/ month", features: "3 Active tracks, Dedicated team of 4, Weekly sprints, Unlimited revisions, Slack channel, Analytics dashboard", highlight: true },
    { planName: "Horizon", price: "Custom", period: "", features: "Unlimited scope, Embedded team, Quarterly strategy sessions, SLA guarantees, White-glove migration, Board-level reporting", highlight: false },
  ];

  const activeFaq = faq?.some(f => f.question) ? faq : [
    { question: "What makes Verdant different from other agencies?", answer: "We embed like an in-house team — no account managers playing telephone, no offshore assembly lines. You work directly with the senior people doing the work, every day." },
    { question: "How fast can you start a new engagement?", answer: "Most clients are fully onboarded within 72 hours. We run a tight intake sprint the first week to align on vision, tools, and communication rhythms before any deliverable begins." },
    { question: "Do you work with early-stage startups?", answer: "Absolutely. We've helped dozens of seed-stage companies establish brand and product foundations that survived Series B and beyond. Our Sprint package is built for exactly this." },
    { question: "What does your revision process look like?", answer: "Momentum and Horizon clients get unlimited revisions on active tracks — we don't stop until you're proud. Sprint clients get two structured rounds, which our process is optimised to make count." },
    { question: "Can you work within our existing tech stack?", answer: "Yes. We've shipped in Figma, Framer, Next.js, React Native, Webflow, Shopify, and more. We adapt to your environment — not the other way around." },
    { question: "How do you handle NDA and IP ownership?", answer: "All work produced under engagement belongs to you from day one. We sign mutual NDAs before any discovery call and our contracts are straightforward — no hidden licensing clauses." },
  ];

  const activePortfolio = portfolio?.some(p => p.title) ? portfolio : [
    { title: "Prism Health Rebrand", desc: "Complete brand overhaul for a digital health platform serving 2M patients.", tag: "Brand", image: "/images/templates/template-img-11.jpg" },
    { title: "Loopstack Dashboard", desc: "Data visualisation platform redesign reducing churn by 34%.", tag: "Product", image: "/images/templates/template-img-12.jpg" },
    { title: "Floe D2C Launch", desc: "End-to-end brand and ecommerce build — $2.4M revenue in 6 months.", tag: "Growth", image: "/images/templates/template-img-13.jpg" },
    { title: "Petal Mobile App", desc: "0→1 product design for a fintech app, now Series A funded.", tag: "Design", image: "/images/templates/template-img-20.jpg" },
  ];

  const tickerItems = ["Brand Strategy", "UX Research", "Product Design", "Growth Marketing", "Engineering", "Data Analytics", "Motion Design", "Content Systems", "AI Workflows", "Design Systems"];

  if (!mounted) return null;

  return (
    <TemplateLayout data={data} theme="dark" category="Business" hideHeader={true} hideFooter={true}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .t8 {
          font-family: 'Space Grotesk', sans-serif;
          background: #050f07;
          color: #fff;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }

        .t8-wrap { max-width: 1380px; margin: 0 auto; padding: 0 40px; position: relative; z-index: 1; }

        /* Typography */
        .t8-display {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          letter-spacing: -0.04em;
          line-height: 0.95;
        }
        .t8-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          letter-spacing: -0.025em;
        }
        .t8-mono {
          font-family: 'Space Mono', monospace;
        }

        /* Cards */
        .t8-card {
          background: #0f2b12;
          border: 1px solid rgba(163,230,53,0.1);
          border-radius: 24px;
          transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          position: relative;
          overflow: hidden;
        }
        .t8-card:hover {
          border-color: rgba(163,230,53,0.35);
          transform: translateY(-6px);
          box-shadow: 0 32px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(163,230,53,0.15);
        }
        .t8-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(163,230,53,0.4), transparent);
          opacity: 0;
          transition: opacity 0.4s;
        }
        .t8-card:hover::before { opacity: 1; }

        /* Green-tinted cards */
        .t8-card-green {
          background: rgba(15,43,18,0.8);
          border: 1px solid rgba(163,230,53,0.12);
          border-radius: 20px;
          transition: all 0.4s;
        }
        .t8-card-green:hover {
          border-color: rgba(163,230,53,0.3);
          background: rgba(15,43,18,0.95);
        }

        /* Buttons */
        .t8-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          padding: 16px 36px;
          background: #A3E635;
          color: #052e16;
          border-radius: 100px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px; font-weight: 700;
          border: none; cursor: pointer; text-decoration: none;
          transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          letter-spacing: -0.01em;
        }
        .t8-btn:hover {
          background: #bef264;
          transform: scale(1.04);
          box-shadow: 0 0 40px rgba(163,230,53,0.4), 0 12px 32px rgba(163,230,53,0.2);
        }
        .t8-btn-outline {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 36px;
          background: transparent;
          color: #A3E635;
          border-radius: 100px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px; font-weight: 600;
          border: 1.5px solid rgba(163,230,53,0.4);
          cursor: pointer; text-decoration: none;
          transition: all 0.35s;
          letter-spacing: -0.01em;
        }
        .t8-btn-outline:hover {
          background: rgba(163,230,53,0.08);
          border-color: #A3E635;
          transform: scale(1.04);
        }
        .t8-btn-ghost {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 28px;
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.75);
          border-radius: 100px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px; font-weight: 500;
          border: 1px solid rgba(255,255,255,0.1);
          cursor: pointer; text-decoration: none;
          transition: all 0.35s;
          backdrop-filter: blur(12px);
        }
        .t8-btn-ghost:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.25);
          color: #fff;
        }

        /* Glow blob */
        .t8-glow {
          position: absolute; pointer-events: none; border-radius: 50%;
          filter: blur(90px); opacity: 0.5;
        }

        /* Dot grid */
        .t8-dots {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(163,230,53,0.12) 1px, transparent 1px);
          background-size: 32px 32px;
        }

        /* Nav links */
        .t8-nav-link {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px; font-weight: 500;
          color: rgba(255,255,255,0.55); text-decoration: none;
          transition: color 0.25s;
          letter-spacing: 0.02em;
        }
        .t8-nav-link:hover { color: #A3E635; }

        /* Service tab */
        .t8-service-tab {
          display: flex; align-items: center; gap: 16px; padding: 20px 24px;
          border-radius: 14px; cursor: pointer; transition: all 0.3s;
          border: 1px solid transparent;
        }
        .t8-service-tab.active {
          background: rgba(163,230,53,0.08);
          border-color: rgba(163,230,53,0.2);
        }
        .t8-service-tab:hover:not(.active) { background: rgba(255,255,255,0.03); }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(163,230,53,0.3); border-radius: 100px; }

        /* ── HERO RESPONSIVE ── */
        .t8-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 100vh;
          overflow: hidden;
        }
        .t8-hero-left {
          background: #050f07;
          position: relative;
          display: flex;
          align-items: center;
          padding: 80px 0 80px 60px;
          overflow: hidden;
        }
        .t8-hero-right {
          position: relative;
          overflow: hidden;
        }
        .t8-hero-metrics {
          display: flex;
          gap: 40px;
          margin-top: 72px;
          padding-top: 48px;
          border-top: 1px solid rgba(255,255,255,0.07);
        }

        /* ── ABOUT RESPONSIVE ── */
        .t8-about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 100px;
          align-items: start;
        }

        /* ── SERVICES RESPONSIVE ── */
        .t8-services-grid {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 40px;
          align-items: start;
        }

        /* ── FEATURES CARD RESPONSIVE ── */
        .t8-feature-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          overflow: hidden;
          min-height: 360px;
        }
        .t8-feature-visual {
          background: #0a1a0c;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 48px;
        }
        .t8-feature-content {
          padding: 52px 48px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        /* ── PORTFOLIO RESPONSIVE ── */
        .t8-portfolio-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto;
          gap: 20px;
        }

        /* ── TEAM RESPONSIVE ── */
        .t8-team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
        }

        /* ── FAQ RESPONSIVE ── */
        .t8-faq-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 100px;
          align-items: start;
        }
        .t8-faq-sticky {
          position: sticky;
          top: 110px;
        }

        /* ── FOOTER RESPONSIVE ── */
        .t8-footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 56px;
          margin-bottom: 64px;
        }

        /* ── CTA RESPONSIVE ── */
        .t8-cta-box {
          max-width: 1300px;
          margin: 0 auto;
          background: #A3E635;
          border-radius: 40px;
          padding: 100px 60px;
          position: relative;
          overflow: hidden;
          text-align: center;
        }

        /* ── PRICING RESPONSIVE ── */
        .t8-pricing-flex {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
        }

        /* ════════════════════════════════════════
           TABLET  ≤ 1024px
        ═══════════════════════════════════════ */
        @media (max-width: 1024px) {
          .t8-wrap { padding: 0 32px; }

          .t8-hero-grid { grid-template-columns: 1fr; min-height: auto; }
          .t8-hero-left {
            padding: 80px 32px 64px;
            min-height: 100vh;
            align-items: flex-start;
            padding-top: 100px;
          }
          .t8-hero-right { display: none; }

          .t8-about-grid { grid-template-columns: 1fr; gap: 60px; }

          .t8-services-grid { grid-template-columns: 1fr; gap: 32px; }

          .t8-feature-inner { grid-template-columns: 1fr; min-height: auto; }
          .t8-feature-visual { min-height: 160px; padding: 40px; }
          .t8-feature-content { padding: 40px; }

          .t8-portfolio-grid { grid-template-columns: 1fr 1fr; }

          .t8-faq-grid { grid-template-columns: 1fr; gap: 48px; }
          .t8-faq-sticky { position: static; top: auto; }

          .t8-footer-grid { grid-template-columns: 1fr 1fr; gap: 40px; }

          .t8-cta-box { padding: 80px 48px; border-radius: 32px; }

          .t8-hero-metrics { gap: 28px; margin-top: 48px; }
        }

        /* ════════════════════════════════════════
           MOBILE  ≤ 768px
        ═══════════════════════════════════════ */
        @media (max-width: 768px) {
          .t8-wrap { padding: 0 20px; }

          /* Section padding */
          .t8-section-pad { padding: 80px 0 !important; }

          .t8-hero-left { padding: 24px 20px 60px; padding-top: 96px; }

          .t8-about-grid { gap: 40px; }

          .t8-services-grid { gap: 24px; }

          .t8-portfolio-grid { grid-template-columns: 1fr; }

          .t8-team-grid { grid-template-columns: 1fr 1fr; }

          .t8-footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
          }

          .t8-cta-box { padding: 56px 28px; border-radius: 24px; }

          .t8-hero-metrics { gap: 20px; flex-wrap: wrap; margin-top: 40px; padding-top: 32px; }

          .t8-feature-content { padding: 28px 24px; }
          .t8-feature-visual { padding: 28px; min-height: 120px; }

          .t8-faq-grid { gap: 32px; }
        }

        /* ════════════════════════════════════════
           SMALL MOBILE  ≤ 480px
        ═══════════════════════════════════════ */
        @media (max-width: 480px) {
          .t8-wrap { padding: 0 16px; }

          .t8-team-grid { grid-template-columns: 1fr; }

          .t8-footer-grid { grid-template-columns: 1fr; gap: 32px; }

          .t8-footer-brand-col { grid-column: span 1; }

          .t8-hero-metrics > div { min-width: calc(33% - 14px); }

          .t8-cta-box { padding: 44px 20px; border-radius: 20px; }

          .t8-pricing-flex > * { min-width: 100% !important; max-width: 100% !important; }

          /* CTA buttons stack */
          .t8-cta-btns { flex-direction: column !important; align-items: center !important; }

          /* Hero buttons */
          .t8-hero-btns { flex-direction: column !important; align-items: flex-start !important; }
          .t8-hero-btns > * { width: 100% !important; justify-content: center !important; }

          /* Service tab label on small screens */
          .t8-service-tab-label { font-size: 14px !important; }
        }

        /* ── Nav show/hide helpers ── */
        .t8-desktop-only { display: flex; }
        .t8-mobile-only  { display: none; }

        @media (max-width: 768px) {
          .t8-desktop-only { display: none !important; }
          .t8-mobile-only  { display: flex !important; }
        }

        /* Portfolio first item spanning 2 rows on desktop only */
        @media (min-width: 769px) {
          .t8-portfolio-item-0 {
            grid-row: span 2;
            min-height: 580px;
          }
          .t8-portfolio-item-n { aspect-ratio: 16/10; }
        }
        @media (max-width: 768px) {
          .t8-portfolio-item-0, .t8-portfolio-item-n { min-height: 280px; aspect-ratio: 16/10; }
        }
      `}</style>

      <div className="t8">

        {/* ══════════ HEADER ══════════ */}
        <motion.header
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE }}
          style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
            background: "rgba(5,15,7,0.85)",
            backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
            borderBottom: "1px solid rgba(163,230,53,0.08)",
          }}
        >
          <div className="t8-wrap" style={{ height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ position: "relative", width: 34, height: 34, flexShrink: 0 }}>
                <div style={{ position: "absolute", inset: 0, background: "#A3E635", borderRadius: 10, transform: "rotate(8deg)" }} />
                <div style={{ position: "absolute", inset: 4, background: "#050f07", borderRadius: 6, transform: "rotate(8deg)" }} />
                <div style={{ position: "absolute", inset: 8, background: "#A3E635", borderRadius: 3 }} />
              </div>
              {headerType === "Image" && logoUrl ? (
                <div style={{ position: "relative", height: 28, width: 120 }}>
                  <Image src={logoUrl} alt={displayName} fill style={{ objectFit: "contain", objectPosition: "left" }} />
                </div>
              ) : (
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: companyNameFontSize || 20, fontWeight: 700, color: "#fff", letterSpacing: "-0.04em" }}>
                  {displayName}
                </span>
              )}
            </div>

            {/* Desktop Nav */}
            <nav className="t8-desktop-only" style={{ gap: 36 }}>
              {["Work", "Services", "Team", "Pricing"].map(n => (
                <a key={n} href={`#${n.toLowerCase()}`} className="t8-nav-link">{n}</a>
              ))}
            </nav>

            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <a href="#contact" className="t8-btn t8-desktop-only" style={{ padding: "11px 24px", fontSize: 13 }}>
                Start a Project ↗
              </a>
              {/* Mobile hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="t8-mobile-only"
                style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", alignItems: "center", justifyContent: "center", padding: 4 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>
          </div>
        </motion.header>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              style={{ position: "fixed", top: 72, left: 0, right: 0, zIndex: 99, background: "#050f07", padding: "20px 24px", borderBottom: "1px solid rgba(163,230,53,0.1)" }}>
              {["Work", "Services", "Team", "Pricing", "Contact"].map(n => (
                <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                  style={{ display: "block", padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#fff", textDecoration: "none", fontSize: 18 }}>
                  {n}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <main style={{ paddingTop: 72 }}>

          {/* ══════════ HERO ══════════ */}
          <section style={{ position: "relative" }}>
            <div className="t8-hero-grid">
              {/* Left panel */}
              <div className="t8-hero-left">
                <div className="t8-dots" style={{ opacity: 0.6 }} />
                <div className="t8-glow" style={{ top: "20%", left: "-20%", width: "60%", height: "60%", background: "rgba(163,230,53,0.2)" }} />
                <div className="t8-glow" style={{ bottom: "0%", right: "-10%", width: "40%", height: "40%", background: "rgba(74,222,128,0.1)" }} />

                <motion.div initial="hidden" animate="visible" variants={stagger} style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 620 }}>
                  <motion.div variants={fadeLeft} custom={0}>
                    <Tag8 dark>Open for partnerships 2026</Tag8>
                  </motion.div>

                  <motion.h1 variants={fadeLeft} custom={1} className="t8-display" style={{
                    fontSize: heroTitleFontSize ? `${heroTitleFontSize}px` : "clamp(40px, 5.5vw, 84px)",
                    color: "#fff",
                    marginBottom: 32,
                    maxWidth: 580,
                    lineHeight: 0.95,
                  }}>
                    {heroTitle || (
                      <>We build{" "}
                        <span style={{ color: "#A3E635", display: "inline-block" }}>brands</span>
                        {" "}that{" "}
                        <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.55)" }}>outlast</span>
                        {" "}the hype.
                      </>
                    )}
                  </motion.h1>

                  <motion.p variants={fadeLeft} custom={2} style={{
                    fontSize: taglineFontSize ? `${taglineFontSize}px` : 17,
                    color: "rgba(255,255,255,0.55)",
                    lineHeight: 1.75, maxWidth: 440, marginBottom: 48
                  }}>
                    {tagline || "Verdant partners with founders and operators who want more than execution — they want transformation."}
                  </motion.p>

                  <motion.div variants={fadeLeft} custom={3} className="t8-hero-btns" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                    <MagneticBtn href="#contact" className="t8-btn" style={{ fontSize: 15, padding: "18px 40px" }}>
                      Start a Project
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </MagneticBtn>
                    <MagneticBtn href="#work" className="t8-btn-outline" style={{ fontSize: 15 }}>
                      View Our Work
                    </MagneticBtn>
                  </motion.div>

                  {/* Metrics row */}
                  <motion.div variants={fadeLeft} custom={4} className="t8-hero-metrics">
                    {[
                      { val: 8, suf: "yr", label: "Studio age" },
                      { val: 98, suf: "%", label: "Retention rate" },
                      { val: 200, suf: "+", label: "Brands built" },
                    ].map((s, i) => (
                      <div key={i}>
                        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 700, color: "#A3E635", letterSpacing: "-0.04em", lineHeight: 1 }}>
                          <CountUp end={s.val} suffix={s.suf} />
                        </div>
                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 6, fontFamily: "'Space Mono', monospace", letterSpacing: "0.08em" }}>{s.label}</div>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>

              {/* Right image panel — hidden on mobile via CSS */}
              <motion.div
                className="t8-hero-right"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.4, ease: EASE }}
              >
                <Image src={heroImage || "/images/templates/template-img-12.jpg"} alt="Hero" fill style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #050f07 0%, transparent 30%)" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,15,7,0.7) 0%, transparent 50%)" }} />

                <motion.div
                  initial={{ opacity: 0, y: 30, x: -20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ delay: 1, duration: 0.7, ease: EASE }}
                  style={{ position: "absolute", top: 48, left: 40, background: "rgba(5,15,7,0.85)", backdropFilter: "blur(20px)", borderRadius: 16, padding: "16px 22px", border: "1px solid rgba(163,230,53,0.2)" }}>
                  <div style={{ fontSize: 11, fontFamily: "'Space Mono', monospace", color: "#A3E635", letterSpacing: "0.12em", marginBottom: 6 }}>LATEST PROJECT</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>Floe Commerce</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>$2.4M in 6 months</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30, x: 20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.7, ease: EASE }}
                  style={{ position: "absolute", bottom: 60, right: 40, background: "#A3E635", borderRadius: 16, padding: "16px 22px" }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: "#052e16", lineHeight: 1 }}>4.9/5</div>
                  <div style={{ fontSize: 12, color: "#166534", marginTop: 4 }}>Client satisfaction</div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* ══════════ TICKER ══════════ */}
          <div style={{ background: "#0a1a0c", borderTop: "1px solid rgba(163,230,53,0.08)", borderBottom: "1px solid rgba(163,230,53,0.08)", padding: "20px 0", overflow: "hidden" }}>
            <Ticker items={tickerItems} speed={30} />
          </div>

          {/* ══════════ ABOUT ══════════ */}
          <section id="about" className="t8-section-pad" style={{ padding: "140px 0", background: "#050f07", position: "relative", overflow: "hidden" }}>
            <div className="t8-glow" style={{ top: "-10%", right: "-5%", width: "40%", height: "60%", background: "rgba(163,230,53,0.06)" }} />
            <div className="t8-wrap">
              <div className="t8-about-grid">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft}>
                  <Tag8 dark>Our Story</Tag8>
                  <h2 className="t8-display" style={{ fontSize: "clamp(32px, 5vw, 68px)", color: "#fff", lineHeight: 0.95, marginTop: 12 }}>
                    {aboutUsTitle || (
                      <>Craft over<br /><span style={{ color: "#A3E635" }}>convenience</span>.<br />Always.</>
                    )}
                  </h2>
                  <motion.div
                    initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                    transition={{ duration: 1, ease: EASE, delay: 0.3 }}
                    style={{ height: 2, background: "linear-gradient(90deg, #A3E635, transparent)", marginTop: 40, transformOrigin: "left" }}
                  />
                </motion.div>

                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={isTablet ? fadeUp : fadeRight}>
                  <p style={{ fontSize: aboutUsContentFontSize || 17, color: "rgba(255,255,255,0.6)", lineHeight: 1.85, marginBottom: 36 }}>
                    {aboutUsContent || "We started Verdant because we were tired of agencies that optimised for billable hours over outcomes. Eight years later, we run a 40-person studio with one obsession: making our clients' work undeniable."}
                  </p>

                  <div style={{ borderRadius: 20, overflow: "hidden", aspectRatio: "16/10", position: "relative", border: "1px solid rgba(163,230,53,0.1)", marginBottom: 36 }}>
                    <Image src={aboutUsImage || "/images/templates/template-img-20.jpg"} alt="About" fill style={{ objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,15,7,0.5) 0%, transparent 60%)" }} />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 40 }}>
                    {["Senior-only teams — no juniors learning on your dime", "Fixed-scope sprints with guaranteed delivery dates", "IP and source files belong to you from day one"].map((pt, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                        <div style={{ width: 22, height: 22, borderRadius: 6, background: "rgba(163,230,53,0.12)", border: "1px solid rgba(163,230,53,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#A3E635" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                        </div>
                        <span style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>{pt}</span>
                      </div>
                    ))}
                  </div>
                  <a href="#contact" className="t8-btn-outline">Our Manifesto →</a>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ══════════ SERVICES ══════════ */}
          <section id="services" className="t8-section-pad" style={{ padding: "140px 0", background: "#0a1a0c", position: "relative", overflow: "hidden" }}>
            <div className="t8-dots" style={{ opacity: 0.3 }} />
            <div className="t8-wrap" style={{ position: "relative", zIndex: 1 }}>
              <div style={{ textAlign: "center", marginBottom: 80 }}>
                <Tag8 dark>What We Do</Tag8>
                <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  className="t8-display" style={{ fontSize: "clamp(28px, 4.5vw, 60px)", color: "#fff", marginTop: 12 }}>
                  Six disciplines. One studio.
                </motion.h2>
              </div>

              <div className="t8-services-grid">
                {/* Tab list */}
                <div style={{ display: "flex", flexDirection: isTablet ? "row" : "column", gap: 4, flexWrap: isTablet ? "wrap" : "nowrap" }}>
                  {activeServices.map((s, i) => (
                    <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={isTablet ? fadeUp : fadeLeft} custom={i * 0.2}
                      style={{ flex: isTablet ? "1 1 calc(50% - 4px)" : "unset" }}>
                      <div
                        onClick={() => setActiveService(i)}
                        className={`t8-service-tab ${activeService === i ? "active" : ""}`}
                      >
                        <div style={{ width: 44, height: 44, borderRadius: 12, background: activeService === i ? "#A3E635" : "rgba(163,230,53,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: activeService === i ? "#052e16" : "#A3E635", transition: "all 0.3s", flexShrink: 0 }}>
                          {s.icon || String(i + 1).padStart(2, "0")}
                        </div>
                        <span className="t8-service-tab-label" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 600, color: activeService === i ? "#fff" : "rgba(255,255,255,0.5)", transition: "color 0.3s" }}>
                          {s.name || s.title}
                        </span>
                        {activeService === i && !isTablet && (
                          <motion.svg layoutId="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A3E635" strokeWidth="2" style={{ marginLeft: "auto" }}>
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </motion.svg>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Tab content */}
                <AnimatePresence mode="wait">
                  <motion.div key={activeService}
                    initial={{ opacity: 0, x: isTablet ? 0 : 30, y: isTablet ? 20 : 0, filter: "blur(8px)" }}
                    animate={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: isTablet ? 0 : -20, filter: "blur(4px)" }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="t8-card"
                    style={{ padding: isTablet ? "36px 32px" : "56px 52px", minHeight: isTablet ? "auto" : 360 }}
                  >
                    <div className="t8-glow" style={{ top: "-20%", right: "-10%", width: "50%", height: "70%", background: "rgba(163,230,53,0.08)", filter: "blur(60px)" }} />
                    <div style={{ position: "relative", zIndex: 1 }}>
                      <div style={{ width: 64, height: 64, borderRadius: 18, background: "rgba(163,230,53,0.12)", border: "1px solid rgba(163,230,53,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, color: "#A3E635", marginBottom: 32 }}>
                        {activeServices[activeService]?.icon || "◈"}
                      </div>
                      <h3 className="t8-heading" style={{ fontSize: "clamp(22px, 3vw, 32px)", color: "#fff", marginBottom: 20 }}>
                        {activeServices[activeService]?.name || activeServices[activeService]?.title}
                      </h3>
                      <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 40 }}>
                        {activeServices[activeService]?.desc}
                      </p>
                      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                        <a href="#contact" className="t8-btn" style={{ padding: "13px 28px", fontSize: 13 }}>Get Started</a>
                        <a href="#work" className="t8-btn-ghost" style={{ fontSize: 13 }}>See Examples</a>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </section>

          {/* ══════════ FEATURES ══════════ */}
          <section id="features" className="t8-section-pad" style={{ padding: "140px 0", background: "#050f07" }}>
            <div className="t8-wrap">
              <div style={{ textAlign: "center", marginBottom: 100 }}>
                <Tag8 dark>Capabilities</Tag8>
                <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  className="t8-display" style={{ fontSize: "clamp(28px, 4.5vw, 60px)", color: "#fff", marginTop: 12 }}>
                  What sets us apart.
                </motion.h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 28, position: "relative" }}>
                {activeFeatures.map((f, i) => (
                  <StackCard key={i} index={i} total={activeFeatures.length} isMobile={isMobile}>
                    <div className="t8-card" style={{ overflow: "hidden" }}>
                      <div className="t8-feature-inner">
                        {/* Dark visual side */}
                        <div className="t8-feature-visual">
                          <div className="t8-glow" style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "80%", height: "80%", background: `rgba(163,230,53,${0.1 + i * 0.04})` }} />
                          <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                            <div style={{ fontSize: "clamp(48px, 8vw, 80px)", fontWeight: 700, fontFamily: "'Space Mono', monospace", color: "rgba(163,230,53,0.15)", lineHeight: 1 }}>0{i + 1}</div>
                            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#A3E635", letterSpacing: "0.15em", marginTop: 8 }}>
                              {f.tag || `FEATURE ${String(i + 1).padStart(2, "0")}`}
                            </div>
                          </div>
                        </div>
                        {/* Content side */}
                        <div className="t8-feature-content">
                          <h3 className="t8-heading" style={{ fontSize: "clamp(20px, 2.5vw, 28px)", color: "#fff", marginBottom: 20, lineHeight: 1.2 }}>{f.title}</h3>
                          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>{f.desc}</p>
                          <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 8, color: "#A3E635", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                            Learn more
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </StackCard>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════ PORTFOLIO ══════════ */}
          <section id="work" className="t8-section-pad" style={{ padding: "140px 0", background: "#0a1a0c", position: "relative", overflow: "hidden" }}>
            <div className="t8-glow" style={{ bottom: "10%", left: "-10%", width: "40%", height: "60%", background: "rgba(163,230,53,0.05)" }} />
            <div className="t8-wrap" style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 80, flexWrap: "wrap", gap: 24 }}>
                <div>
                  <Tag8 dark>Our Work</Tag8>
                  <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft}
                    className="t8-display" style={{ fontSize: "clamp(28px, 4.5vw, 60px)", color: "#fff", marginTop: 12 }}>
                    Selected projects.
                  </motion.h2>
                </div>
                <motion.a href="#contact" className="t8-btn-outline" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeRight}>
                  View all work →
                </motion.a>
              </div>

              <div className="t8-portfolio-grid">
                {activePortfolio.slice(0, 4).map((p, i) => (
                  <motion.div key={i}
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={i * 0.3}
                    className={`t8-card ${i === 0 ? "t8-portfolio-item-0" : "t8-portfolio-item-n"}`}
                    style={{ overflow: "hidden", cursor: "pointer" }}
                  >
                    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: i === 0 ? 320 : 220 }}>
                      {p.image && <Image src={p.image} alt={p.title} fill style={{ objectFit: "cover", transition: "transform 0.6s ease" }} />}
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,15,7,0.9) 0%, rgba(5,15,7,0.2) 60%)" }} />
                      <div style={{ position: "absolute", top: 24, left: 24 }}>
                        <span style={{ padding: "5px 14px", borderRadius: 100, background: "rgba(163,230,53,0.15)", border: "1px solid rgba(163,230,53,0.3)", fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#A3E635", letterSpacing: "0.1em" }}>
                          {p.tag || "Project"}
                        </span>
                      </div>
                      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 28px" }}>
                        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 10, letterSpacing: "0.1em" }}>
                          {String(i + 1).padStart(2, "0")} / {String(activePortfolio.length).padStart(2, "0")}
                        </div>
                        <h3 className="t8-heading" style={{ fontSize: i === 0 ? "clamp(18px, 2.5vw, 28px)" : 20, color: "#fff", marginBottom: 8 }}>{p.title}</h3>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{p.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════ TEAM ══════════ */}
          <section id="team" className="t8-section-pad" style={{ padding: "140px 0", background: "#050f07", position: "relative" }}>
            <div className="t8-dots" style={{ opacity: 0.2 }} />
            <div className="t8-wrap" style={{ position: "relative", zIndex: 1 }}>
              <div style={{ textAlign: "center", marginBottom: 80 }}>
                <Tag8 dark>The Team</Tag8>
                <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  className="t8-display" style={{ fontSize: "clamp(28px, 4.5vw, 60px)", color: "#fff", marginTop: 12 }}>
                  Who you'll actually work with.
                </motion.h2>
              </div>
              <div className="t8-team-grid">
                {activeTeam.map((m, i) => (
                  <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.2}
                    className="t8-card" style={{ overflow: "hidden" }}>
                    <div style={{ position: "relative", aspectRatio: "1", background: "#0a1a0c", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                      {m.image ? <Image src={m.image} alt={m.name} fill style={{ objectFit: "cover" }} /> : (
                        <>
                          <div className="t8-glow" style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "70%", height: "70%", background: m.color || "#A3E635", opacity: 0.15, filter: "blur(40px)" }} />
                          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(163,230,53,0.1)", border: `2px solid ${m.color || "#A3E635"}30`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Grotesk', sans-serif", fontSize: 32, fontWeight: 700, color: m.color || "#A3E635", position: "relative", zIndex: 1 }}>
                            {m.name?.[0]}
                          </div>
                        </>
                      )}
                      <div style={{ position: "absolute", top: 0, right: 0, width: 3, height: "100%", background: m.color || "#A3E635", opacity: 0.6 }} />
                    </div>
                    <div style={{ padding: "24px 26px" }}>
                      <h4 className="t8-heading" style={{ fontSize: 18, color: "#fff", marginBottom: 4 }}>{m.name}</h4>
                      <div style={{ fontSize: 12, fontFamily: "'Space Mono', monospace", color: m.color || "#A3E635", marginBottom: m.bio ? 12 : 0 }}>{m.role}</div>
                      {m.bio && <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.65 }}>{m.bio}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════ TESTIMONIALS MARQUEE ══════════ */}
          <section id="testimonials" className="t8-section-pad" style={{ padding: "140px 0", background: "#0a1a0c", overflow: "hidden" }}>
            <div className="t8-wrap" style={{ marginBottom: 64 }}>
              <Tag8 dark>Client Stories</Tag8>
              <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft}
                className="t8-display" style={{ fontSize: "clamp(28px, 4.5vw, 60px)", color: "#fff", marginTop: 12 }}>
                Our clients say it best.
              </motion.h2>
            </div>
            <TestimonialMarquee items={activeTestimonials} />
            <div style={{ marginTop: 24 }}>
              <div style={{ overflow: "hidden" }}>
                <motion.div
                  animate={{ x: ["-50%", "0%"] }}
                  transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                  style={{ display: "flex", gap: 24, width: "max-content" }}
                >
                  {[...activeTestimonials, ...activeTestimonials].map((t, i) => (
                    <div key={i} className="t8-card-green" style={{ width: 340, flexShrink: 0, padding: "28px 32px", opacity: 0.6 }}>
                      <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, fontStyle: "italic", marginBottom: 16 }}>"{t.review?.slice(0, 80)}..."</p>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#A3E635" }}>{t.name}</div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          {/* ══════════ PRICING ══════════ */}
          {activePricing?.length > 0 && (
            <section id="pricing" className="t8-section-pad" style={{ padding: "140px 0", background: "#050f07", position: "relative", overflow: "hidden" }}>
              <div className="t8-glow" style={{ top: "30%", left: "50%", transform: "translateX(-50%)", width: "50%", height: "50%", background: "rgba(163,230,53,0.06)" }} />
              <div className="t8-wrap" style={{ position: "relative", zIndex: 1 }}>
                <div style={{ textAlign: "center", marginBottom: 80 }}>
                  <Tag8 dark>Pricing</Tag8>
                  <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                    className="t8-display" style={{ fontSize: "clamp(28px, 4.5vw, 60px)", color: "#fff", marginTop: 12 }}>
                    Transparent, always.
                  </motion.h2>
                </div>
                <div className="t8-pricing-flex">
                  {activePricing.map((p, i) => {
                    const featured = p.highlight || i === 1;
                    return (
                      <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={i * 0.25}
                        style={{
                          flex: "1 1 300px", maxWidth: 400,
                          background: featured ? "linear-gradient(135deg, #0f2b12, #163a1a)" : "#0a1a0c",
                          border: featured ? "1.5px solid rgba(163,230,53,0.4)" : "1px solid rgba(163,230,53,0.1)",
                          borderRadius: 24, padding: "44px 40px",
                          position: "relative", overflow: "hidden"
                        }}>
                        {featured && (
                          <>
                            <div className="t8-glow" style={{ top: "-20%", right: "-10%", width: "50%", height: "60%", background: "rgba(163,230,53,0.12)", filter: "blur(40px)" }} />
                            <div style={{ position: "absolute", top: 0, right: 0, background: "#A3E635", color: "#052e16", fontSize: 11, fontWeight: 700, padding: "7px 18px", borderBottomLeftRadius: 14, fontFamily: "'Space Mono', monospace", letterSpacing: "0.1em" }}>
                              MOST POPULAR
                            </div>
                          </>
                        )}
                        <div style={{ position: "relative", zIndex: 1 }}>
                          <h4 className="t8-heading" style={{ fontSize: 20, color: featured ? "#A3E635" : "rgba(255,255,255,0.6)", marginBottom: 6, fontFamily: "'Space Mono', monospace", letterSpacing: "0.08em" }}>
                            {p.planName}
                          </h4>
                          <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 32 }}>
                            <span style={{ fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: "#fff", letterSpacing: "-0.04em", lineHeight: 1 }}>{p.price}</span>
                            <span style={{ fontSize: 14, color: "rgba(255,255,255,0.35)" }}>{p.period}</span>
                          </div>
                          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px", display: "flex", flexDirection: "column", gap: 14 }}>
                            {(p.features?.split(",") || []).map((feat, j) => (
                              <li key={j} style={{ display: "flex", gap: 12, fontSize: 14, color: "rgba(255,255,255,0.65)", alignItems: "flex-start" }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A3E635" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 2 }}><polyline points="20 6 9 17 4 12" /></svg>
                                {feat.trim()}
                              </li>
                            ))}
                          </ul>
                          <button className={featured ? "t8-btn" : "t8-btn-outline"} style={{ width: "100%", justifyContent: "center" }}>
                            {p.buttonText || (p.price === "Custom" ? "Let's Talk" : "Get Started")}
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* ══════════ FAQ ══════════ */}
          {activeFaq?.length > 0 && (
            <section id="faq" className="t8-section-pad" style={{ padding: "140px 0", background: "#0a1a0c", position: "relative" }}>
              <div className="t8-dots" style={{ opacity: 0.2 }} />
              <div className="t8-wrap" style={{ position: "relative", zIndex: 1 }}>
                <div className="t8-faq-grid">
                  <div className="t8-faq-sticky">
                    <Tag8 dark>FAQ</Tag8>
                    <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft}
                      className="t8-display" style={{ fontSize: "clamp(26px, 3.5vw, 52px)", color: "#fff", marginTop: 12, marginBottom: 24 }}>
                      Common questions, honest answers.
                    </motion.h2>
                    <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft} custom={1}
                      style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 36 }}>
                      Don't see what you need? Message us and get an answer within 2 hours.
                    </motion.p>
                    <motion.a href="#contact" className="t8-btn" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft} custom={2}>
                      Ask Anything ↗
                    </motion.a>
                  </div>
                  <div>
                    {activeFaq.map((item, i) => (
                      <FAQItem8 key={i} q={item.question} a={item.answer} idx={i} />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ══════════ CTA ══════════ */}
          <section id="contact" style={{ padding: "80px 24px", background: "#050f07" }}>
            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE }}
              className="t8-cta-box"
            >
              <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, borderRadius: "50%", background: "rgba(5,15,7,0.15)" }} />
              <div style={{ position: "absolute", bottom: -80, left: -40, width: 240, height: 240, borderRadius: "50%", background: "rgba(5,15,7,0.1)" }} />
              <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(5,15,7,0.08) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

              <div style={{ position: "relative", zIndex: 1 }}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                  <span style={{ display: "inline-block", marginBottom: 24, padding: "7px 18px", borderRadius: 100, background: "rgba(5,46,22,0.15)", fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#166534", fontWeight: 700, letterSpacing: "0.15em" }}>
                    READY TO GROW?
                  </span>
                </motion.div>
                <motion.h2 className="t8-display" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
                  style={{ fontSize: "clamp(32px, 6vw, 80px)", color: "#052e16", marginBottom: 28, maxWidth: 900, margin: "0 auto 28px" }}>
                  {ctaTitle || "Let's build something\nunforgettable."}
                </motion.h2>
                <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  style={{ fontSize: "clamp(15px, 2vw, 18px)", color: "#166534", maxWidth: 520, margin: "0 auto 56px", lineHeight: 1.65 }}>
                  {ctaDesc || "Every extraordinary brand starts with one conversation. Let's have ours."}
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="t8-cta-btns"
                  style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                  <MagneticBtn href={ctaButtonLink || "#"} className="t8-btn"
                    style={{ background: "#052e16", color: "#A3E635", padding: "18px 44px", fontSize: 16 }}>
                    {ctaButtonText || "Start a Project"}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </MagneticBtn>
                  {contactEmail && (
                    <a href={`mailto:${contactEmail}`} style={{
                      display: "inline-flex", alignItems: "center", gap: 8, padding: "18px 36px",
                      background: "rgba(5,46,22,0.1)", borderRadius: 100, border: "1.5px solid rgba(5,46,22,0.2)",
                      color: "#166534", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 15, textDecoration: "none",
                      transition: "all 0.3s", wordBreak: "break-word"
                    }}>
                      {contactEmail}
                    </a>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </section>

        </main>

        {/* ══════════ FOOTER ══════════ */}
        <footer style={{ background: "#050f07", padding: "80px 0 40px", borderTop: "1px solid rgba(163,230,53,0.07)" }}>
          <div className="t8-wrap">
            <div className="t8-footer-grid">
              <div className="t8-footer-brand-col">
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                  <div style={{ position: "relative", width: 32, height: 32, flexShrink: 0 }}>
                    <div style={{ position: "absolute", inset: 0, background: "#A3E635", borderRadius: 9, transform: "rotate(8deg)" }} />
                    <div style={{ position: "absolute", inset: 4, background: "#050f07", borderRadius: 5, transform: "rotate(8deg)" }} />
                    <div style={{ position: "absolute", inset: 8, background: "#A3E635", borderRadius: 2 }} />
                  </div>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", letterSpacing: "-0.04em" }}>{displayName}</span>
                </div>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", lineHeight: 1.7, maxWidth: 280, marginBottom: 32 }}>
                  {footerDescription || "A studio obsessed with craft, quality, and outcomes that matter."}
                </p>
                <div style={{ display: "flex", gap: 10 }}>
                  {[facebookUrl, twitterUrl, linkedinUrl].filter(Boolean).map((url, i) => (
                    <a key={i} href={url} style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(163,230,53,0.05)", border: "1px solid rgba(163,230,53,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.4)", fontSize: 11, fontFamily: "'Space Mono', monospace", textDecoration: "none", transition: "all 0.3s" }}
                      onMouseOver={e => { e.currentTarget.style.background = "rgba(163,230,53,0.1)"; e.currentTarget.style.borderColor = "rgba(163,230,53,0.3)"; e.currentTarget.style.color = "#A3E635"; }}
                      onMouseOut={e => { e.currentTarget.style.background = "rgba(163,230,53,0.05)"; e.currentTarget.style.borderColor = "rgba(163,230,53,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}>
                      {["FB", "TW", "LI"][i]}
                    </a>
                  ))}
                </div>
              </div>
              {[
                { label: "Studio", links: ["About", "Services", "Careers", "Journal"] },
                { label: "Work", links: ["Portfolio", "Case Studies", "Process"] },
                { label: "Connect", links: [contactEmail, displayPhone, address].filter(Boolean) },
              ].map((col, i) => (
                <div key={i}>
                  <div style={{ fontSize: 11, fontFamily: "'Space Mono', monospace", color: "#A3E635", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 24 }}>{col.label}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {col.links.map((lk, j) => (
                      <a key={j} href={`#${lk?.toLowerCase?.()}`} style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 0.25s", wordBreak: "break-word" }}
                        onMouseOver={e => e.target.style.color = "#A3E635"}
                        onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.35)"}>
                        {lk}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.2)", fontFamily: "'Space Mono', monospace" }}>
                {footerCopyright || `© ${new Date().getFullYear()} ${displayName}. All rights reserved.`}
              </div>
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                {["Privacy Policy", "Terms of Service"].map(lk => (
                  <a key={lk} href="#" style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", textDecoration: "none", fontFamily: "'Space Mono', monospace", transition: "color 0.25s" }}
                    onMouseOver={e => e.target.style.color = "#A3E635"} onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.2)"}>
                    {lk}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>

      </div>
    </TemplateLayout>
  );
}