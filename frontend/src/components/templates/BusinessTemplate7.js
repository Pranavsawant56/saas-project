import TemplateLayout from "./TemplateLayout";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState, useCallback } from "react";

// ─── Easing Curves ────────────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1];

// ─── Motion Variants ─────────────────────────────────────────────────────────
const fromLeft = {
  hidden: { opacity: 0, x: -70, filter: "blur(8px)" },
  visible: (i = 0) => ({
    opacity: 1, x: 0, filter: "blur(0px)",
    transition: { duration: 0.85, ease: EASE, delay: i * 0.11 },
  }),
};
const fromRight = {
  hidden: { opacity: 0, x: 70, filter: "blur(8px)" },
  visible: (i = 0) => ({
    opacity: 1, x: 0, filter: "blur(0px)",
    transition: { duration: 0.85, ease: EASE, delay: i * 0.11 },
  }),
};
const fromBottom = {
  hidden: { opacity: 0, y: 50, filter: "blur(6px)" },
  visible: (i = 0) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE, delay: i * 0.1 },
  }),
};
const popIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.65, ease: EASE, delay: i * 0.09 },
  }),
};

// ─── Carousel Component ───────────────────────────────────────────────────────
const Carousel = ({ items, renderItem, autoPlay = true, interval = 4000 }) => {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const total = items.length;
  const timerRef = useRef(null);

  const go = useCallback((idx) => {
    setDir(idx > current ? 1 : -1);
    setCurrent((idx + total) % total);
  }, [current, total]);

  const next = useCallback(() => go((current + 1) % total), [go, current, total]);
  const prev = useCallback(() => go((current - 1 + total) % total), [go, current, total]);

  useEffect(() => {
    if (!autoPlay) return;
    timerRef.current = setInterval(next, interval);
    return () => clearInterval(timerRef.current);
  }, [next, autoPlay, interval]);

  const variants = {
    enter: (d) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0, scale: 0.96 }),
    center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
    exit: (d) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0, scale: 0.96, transition: { duration: 0.45, ease: EASE } }),
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div style={{ overflow: "hidden", borderRadius: 28, position: "relative", minHeight: 420 }}>
        <AnimatePresence custom={dir} mode="popLayout">
          <motion.div
            key={current}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          >
            {renderItem(items[current], current)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 32 }}>
        <button onClick={prev} style={{
          width: 44, height: 44, borderRadius: "50%", border: "1.5px solid rgba(255,182,50,0.4)",
          background: "rgba(255,255,255,0.06)", color: "#FFB632", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s",
          backdropFilter: "blur(8px)"
        }}
          onMouseOver={e => { e.currentTarget.style.background = "rgba(255,182,50,0.15)"; e.currentTarget.style.borderColor = "#FFB632"; }}
          onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,182,50,0.4)"; }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
        </button>

        <div style={{ display: "flex", gap: 8 }}>
          {items.map((_, i) => (
            <button key={i} onClick={() => go(i)} style={{
              width: i === current ? 28 : 8, height: 8, borderRadius: 100,
              background: i === current ? "#FFB632" : "rgba(255,182,50,0.25)",
              border: "none", cursor: "pointer", padding: 0,
              transition: "all 0.4s ease"
            }} />
          ))}
        </div>

        <button onClick={next} style={{
          width: 44, height: 44, borderRadius: "50%", border: "1.5px solid rgba(255,182,50,0.4)",
          background: "rgba(255,255,255,0.06)", color: "#FFB632", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s",
          backdropFilter: "blur(8px)"
        }}
          onMouseOver={e => { e.currentTarget.style.background = "rgba(255,182,50,0.15)"; e.currentTarget.style.borderColor = "#FFB632"; }}
          onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,182,50,0.4)"; }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>
    </div>
  );
};

// ─── Section Label ────────────────────────────────────────────────────────────
const SectionLabel = ({ tag, title, light = false, align = "center" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  return (
    <div ref={ref} style={{ textAlign: align, marginBottom: 64 }}>
      {tag && (
        <motion.span
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }}
          style={{
            display: "inline-block", marginBottom: 14,
            padding: "5px 16px", borderRadius: 100,
            border: `1px solid ${light ? "rgba(255,182,50,0.4)" : "rgba(255,182,50,0.35)"}`,
            background: light ? "rgba(255,182,50,0.12)" : "rgba(255,182,50,0.08)",
            color: "#FFB632", fontSize: 11, fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase",
            fontFamily: "'DM Mono', monospace"
          }}
        >
          {tag}
        </motion.span>
      )}
      {title && (
        <motion.h2
          initial={{ opacity: 0, x: -28, filter: "blur(5px)" }}
          animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.75, ease: EASE, delay: 0.08 }}
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(30px, 4.5vw, 54px)",
            fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em",
            color: light ? "#FFFFFF" : "#0C0F1A",
            margin: 0
          }}
        >
          {title}
        </motion.h2>
      )}
    </div>
  );
};

// ─── FAQ Accordion Item ───────────────────────────────────────────────────────
const FAQItem = ({ q, a, idx }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden" animate={inView ? "visible" : "hidden"}
      variants={fromLeft} custom={idx * 0.4}
      style={{
        borderBottom: "1px solid rgba(255,182,50,0.12)",
        overflow: "hidden",
      }}
    >
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", display: "flex", justifyContent: "space-between",
        alignItems: "center", padding: "22px 0", background: "none", border: "none",
        cursor: "pointer", textAlign: "left", gap: 16
      }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 17, fontWeight: 700, color: "#0C0F1A" }}>{q}</span>
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }}
          style={{
            width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
            background: open ? "#FFB632" : "rgba(255,182,50,0.12)",
            border: "1px solid rgba(255,182,50,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: open ? "#0C0F1A" : "#FFB632", fontSize: 22, lineHeight: 1
          }}>
          +
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <p style={{ paddingBottom: 22, fontSize: 15, color: "#4A4F6A", lineHeight: 1.75, margin: 0 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BusinessTemplate7({ data }) {
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
  useEffect(() => setMounted(true), []);

  const displayName = companyName || "Lumina Studio";
  const displayPhone = phone ? `${countryCode ? countryCode.split(" ")[0] : ""} ${phone}` : "";

  // Defaults
  const activeServices = (services?.some(s => s.name || s.desc) ? services : [
    { name: "Brand Strategy", desc: "Crafting identities that resonate deeply with modern audiences and outlast market trends." },
    { name: "Product Design", desc: "From wireframes to pixel-perfect interfaces, we shape experiences users adore." },
    { name: "Growth Marketing", desc: "Data-informed campaigns that convert attention into revenue at scale." },
    { name: "Tech Consulting", desc: "Navigating complex architecture decisions with clarity and long-term foresight." },
    { name: "Content Creation", desc: "Stories that captivate, inform, and drive measurable action for your brand." },
    { name: "Analytics & BI", desc: "Turning raw data into actionable intelligence powering smarter decisions." },
  ]);

  const activeFeatures = (features?.some(f => f.title || f.desc) ? features : [
    { title: "Adaptive AI Workflows", desc: "Dynamic pipelines that learn from your data and optimise themselves in real time, reducing manual overhead by up to 80%." },
    { title: "Edge-First Delivery", desc: "Sub-100ms response times globally via distributed edge infrastructure — your users never wait." },
    { title: "Unified Dashboard", desc: "Every metric, every team, one source of truth. Visualise performance across products in a single pane of glass." },
  ]);

  const activeTeam = (team?.some(t => t.name) ? team : [
    { name: "Nadia Okonkwo", role: "Chief Executive", bio: "15 years reshaping digital brands across three continents." },
    { name: "James Velázquez", role: "Head of Product", bio: "Former Apple design lead, obsessed with delightful UX." },
    { name: "Priya Mehta", role: "VP Engineering", bio: "Distributed systems architect and open-source contributor." },
    { name: "Tom Eriksen", role: "Growth Director", bio: "Scaled 4 startups from seed to Series B." },
  ]);

  const activeTestimonials = (testimonials?.some(t => t.name || t.review) ? testimonials : [
    { name: "Rachel Wu", role: "CEO, Spark Ventures", review: "Lumina redefined what we thought possible. The attention to craft is unlike anything I've encountered in a decade of building companies." },
    { name: "Omar Hassan", role: "CTO, Nexum", review: "Their engineering team integrated seamlessly with ours. Delivery was faster, quality was higher, and communication was impeccable." },
    { name: "Sofia Andrade", role: "Founder, Vela Studio", review: "The brand identity they built for us tripled our inbound leads within 90 days. Truly transformative work." },
    { name: "David Park", role: "Head of Product, Orbit", review: "We went from scattered processes to a well-oiled machine. Lumina's strategic clarity was the catalyst we needed." },
  ]);

  const activePricing = (pricing?.some(p => p.planName) ? pricing : [
    { planName: "Starter", price: "$49", features: "5 Projects, 10 Users, Basic Analytics, Email Support, 10GB Storage" },
    { planName: "Pro", price: "$129", features: "Unlimited Projects, 50 Users, Advanced Analytics, Priority Support, 100GB Storage, Custom Integrations" },
    { planName: "Enterprise", price: "Custom", features: "Unlimited Everything, Dedicated Account Manager, SLA Guarantee, On-premise Option, SSO & Compliance" },
  ]);

  const activeFaq = (faq?.some(f => f.question) ? faq : [
    { question: "How quickly can we get started?", answer: "Most clients are onboarded within 48 hours. We have a streamlined setup process and a dedicated onboarding specialist assigned to every account." },
    { question: "Do you offer custom integrations?", answer: "Yes — our Pro and Enterprise plans include custom integrations with your existing tech stack. We support REST, GraphQL, and webhooks out of the box." },
    { question: "What does your support look like?", answer: "Starter plans receive email support with a 24-hour response SLA. Pro gets priority response within 4 hours. Enterprise includes a dedicated Slack channel and 24/7 phone support." },
    { question: "Is there a free trial?", answer: "All plans come with a 14-day free trial, no credit card required. You can explore every feature before committing." },
    { question: "How is pricing structured for teams?", answer: "Pricing is per workspace, not per seat on Starter and Pro. Enterprise contracts are custom-scoped based on usage volume and feature requirements." },
    { question: "Can I migrate from a competitor?", answer: "Absolutely. We provide a white-glove migration service for Enterprise clients and detailed migration guides for all other plans." },
  ]);

  const activePortfolio = (portfolio?.some(p => p.title) ? portfolio : [
    { title: "Nexum Rebrand", desc: "Full identity system and digital presence for a SaaS fintech.", image: "/images/templates/template-img-11.jpg" },
    { title: "Orbit Dashboard", desc: "Complex data visualisation product for an analytics platform.", image: "/images/templates/template-img-12.jpg" },
    { title: "Vela Commerce", desc: "End-to-end ecommerce redesign yielding a 240% revenue lift.", image: "/images/templates/template-img-13.jpg" },
  ]);

  if (!mounted) return null;

  return (
    <TemplateLayout data={data} theme="light" category="Business" hideHeader={true} hideFooter={true}>

      {/* ─── GLOBAL STYLES ─────────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .t7 {
          font-family: 'DM Sans', sans-serif;
          background: #FAFAF7;
          color: #0C0F1A;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }

        /* ── Colour palette ──
           Obsidian:  #0C0F1A   Deep midnight navy
           Ink:       #1A1E30   Dark surface
           Amber:     #FFB632   Signature warm gold
           Amber dim: #C8892A   Muted amber
           Ivory:     #FAFAF7   Off-white page bg
           Mist:      #F1F0EA   Section alternating bg
           Slate:     #4A4F6A   Body text
           Border:    rgba(12,15,26,0.08)
        */

        .t7-wrap { max-width: 1340px; margin: 0 auto; padding: 0 28px; position: relative; z-index: 1; }

        /* ── Typography ── */
        .t7-display {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1.0;
        }
        .t7-heading {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          letter-spacing: -0.025em;
        }
        .t7-mono {
          font-family: 'DM Mono', monospace;
          font-weight: 500;
        }

        /* ── Cards ── */
        .t7-card {
          background: #FFFFFF;
          border: 1px solid rgba(12,15,26,0.07);
          border-radius: 20px;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }
        .t7-card:hover {
          transform: translateY(-5px);
          border-color: rgba(255,182,50,0.3);
          box-shadow: 0 24px 48px rgba(255,182,50,0.08), 0 4px 12px rgba(12,15,26,0.04);
        }
        .t7-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(255,182,50,0.04) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
        }
        .t7-card:hover::after { opacity: 1; }

        /* ── Dark cards ── */
        .t7-card-dark {
          background: #1A1E30;
          border: 1px solid rgba(255,182,50,0.12);
          border-radius: 20px;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }
        .t7-card-dark:hover {
          border-color: rgba(255,182,50,0.35);
          box-shadow: 0 24px 48px rgba(255,182,50,0.12);
          transform: translateY(-4px);
        }

        /* ── Buttons ── */
        .t7-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 9px;
          padding: 15px 34px;
          background: #FFB632;
          color: #0C0F1A;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 600;
          border: none; cursor: pointer; text-decoration: none;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative; overflow: hidden;
        }
        .t7-btn:hover {
          background: #FFC94D;
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(255,182,50,0.35);
        }
        .t7-btn-ghost {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 15px 34px;
          background: transparent;
          color: #0C0F1A;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 500;
          border: 1.5px solid rgba(12,15,26,0.15);
          cursor: pointer; text-decoration: none;
          transition: all 0.35s;
        }
        .t7-btn-ghost:hover {
          border-color: #FFB632;
          color: #C8892A;
          background: rgba(255,182,50,0.04);
        }
        .t7-btn-light {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 15px 34px;
          background: rgba(255,255,255,0.1);
          color: #FFFFFF;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 500;
          border: 1.5px solid rgba(255,255,255,0.2);
          cursor: pointer; text-decoration: none;
          transition: all 0.35s;
          backdrop-filter: blur(12px);
        }
        .t7-btn-light:hover {
          background: rgba(255,255,255,0.18);
          border-color: rgba(255,255,255,0.4);
        }

        /* ── Geometric decoration ── */
        .t7-geo {
          position: absolute; pointer-events: none; z-index: 0;
          border-radius: 50%;
          filter: blur(70px);
          opacity: 0.55;
        }

        /* ── Noise overlay ── */
        .t7-noise {
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 1;
        }

        /* ── Stat bar ── */
        .t7-stat-row {
          display: flex; gap: 0;
          border-top: 1px solid rgba(12,15,26,0.07);
          border-bottom: 1px solid rgba(12,15,26,0.07);
          overflow: hidden; border-radius: 16px;
        }
        .t7-stat-item {
          flex: 1; padding: 32px 28px;
          border-right: 1px solid rgba(12,15,26,0.07);
          transition: background 0.3s;
        }
        .t7-stat-item:last-child { border-right: none; }
        .t7-stat-item:hover { background: rgba(255,182,50,0.04); }

        /* ── Nav ── */
        .t7-nav-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 500;
          color: #4A4F6A; text-decoration: none;
          transition: color 0.25s;
          letter-spacing: 0.01em;
        }
        .t7-nav-link:hover { color: #0C0F1A; }

        /* ── Number badge ── */
        .t7-num-badge {
          width: 34px; height: 34px; border-radius: 10px;
          background: rgba(255,182,50,0.1);
          border: 1px solid rgba(255,182,50,0.25);
          display: flex; align-items: center; justify-content: center;
          font-family: 'DM Mono', monospace; font-size: 12px; font-weight: 500;
          color: #C8892A;
          flex-shrink: 0;
        }

        /* ── Scrollbar ── */
        .t7-faq-scroll::-webkit-scrollbar { width: 3px; }
        .t7-faq-scroll::-webkit-scrollbar-track { background: transparent; }
        .t7-faq-scroll::-webkit-scrollbar-thumb { background: rgba(255,182,50,0.4); border-radius: 100px; }

        @media (max-width: 768px) {
          .t7-wrap { padding: 0 18px; }
          .t7-hide-mobile { display: none !important; }
          .t7-stat-row { flex-wrap: wrap; }
          .t7-stat-item { min-width: 50%; }
        }
      `}</style>

      <div className="t7">

        {/* ══════════ HEADER ══════════ */}
        <motion.header
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE }}
          style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
            background: "rgba(250,250,247,0.88)",
            backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(12,15,26,0.06)",
          }}
        >
          <div className="t7-wrap" style={{ height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: "#FFB632", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 14, height: 14, borderRadius: 4, background: "#0C0F1A", transform: "rotate(15deg)" }} />
              </div>
              {headerType === "Image" && logoUrl ? (
                <div style={{ position: "relative", height: 28, width: 110 }}>
                  <Image src={logoUrl} alt={displayName} fill style={{ objectFit: "contain", objectPosition: "left" }} />
                </div>
              ) : (
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: companyNameFontSize || 19, fontWeight: 800, color: "#0C0F1A", letterSpacing: "-0.03em" }}>
                  {displayName}
                </span>
              )}
            </div>

            {/* Nav */}
            <nav className="t7-hide-mobile" style={{ display: "flex", gap: 32 }}>
              {["Services", "Work", "Team", "Pricing"].map(n => (
                <a key={n} href={`#${n.toLowerCase()}`} className="t7-nav-link">{n}</a>
              ))}
            </nav>

            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <a href="#contact" className="t7-btn t7-hide-mobile" style={{ padding: "10px 22px", fontSize: 13 }}>
                Let's Talk
              </a>
              <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: 6 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0C0F1A" strokeWidth="2">
                  {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>
          </div>
        </motion.header>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              style={{ position: "fixed", top: 68, left: 0, right: 0, zIndex: 99, background: "#FFFFFF", padding: 24, borderBottom: "1px solid rgba(12,15,26,0.06)", boxShadow: "0 20px 40px rgba(12,15,26,0.08)" }}>
              {["Services", "Work", "Team", "Pricing", "Contact"].map(n => (
                <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                  style={{ display: "block", padding: "14px 0", borderBottom: "1px solid rgba(12,15,26,0.05)", fontFamily: "'Syne', sans-serif", fontWeight: 600, color: "#0C0F1A", textDecoration: "none", fontSize: 16 }}>
                  {n}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <main style={{ paddingTop: 68 }}>

          {/* ══════════ HERO ══════════ */}
          <section style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "center", overflow: "hidden", background: "#0C0F1A" }}>
            <div className="t7-noise" />
            {/* Glows */}
            <div className="t7-geo" style={{ top: "-15%", left: "-8%", width: "55vw", height: "55vw", background: "rgba(255,182,50,0.18)" }} />
            <div className="t7-geo" style={{ bottom: "-10%", right: "-5%", width: "40vw", height: "40vw", background: "rgba(100,80,200,0.12)" }} />
            <div className="t7-geo" style={{ top: "40%", right: "25%", width: "20vw", height: "20vw", background: "rgba(255,182,50,0.08)" }} />

            {/* Grid lines decoration */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "80px 80px", zIndex: 0 }} />

            <div className="t7-wrap" style={{ paddingTop: 60, paddingBottom: 60 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>

                {/* Left — text */}
                <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.13 } } }}>
                  <motion.div variants={fromLeft} custom={0}>
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 28,
                      padding: "7px 16px", borderRadius: 100,
                      background: "rgba(255,182,50,0.1)", border: "1px solid rgba(255,182,50,0.25)",
                      fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#FFB632", fontWeight: 500
                    }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFB632", boxShadow: "0 0 8px #FFB632" }} />
                      Now open for 2026 partnerships
                    </span>
                  </motion.div>

                  <motion.h1 variants={fromLeft} custom={1} className="t7-display" style={{
                    fontSize: heroTitleFontSize ? `${heroTitleFontSize}px` : "clamp(44px, 6vw, 78px)",
                    color: "#FFFFFF", marginBottom: 28
                  }}>
                    {heroTitle || "Where bold ideas become brilliant products."}
                  </motion.h1>

                  <motion.p variants={fromLeft} custom={2} style={{
                    fontSize: taglineFontSize ? `${taglineFontSize}px` : 18,
                    color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 480, marginBottom: 44
                  }}>
                    {tagline || "We partner with ambitious teams to design, build, and scale digital products that define their markets."}
                  </motion.p>

                  <motion.div variants={fromLeft} custom={3} style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                    <a href="#contact" className="t7-btn" style={{ fontSize: 15, padding: "17px 36px" }}>
                      Start a Project
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </a>
                    <a href="#work" className="t7-btn-light" style={{ fontSize: 15 }}>
                      See Our Work
                    </a>
                  </motion.div>
                </motion.div>

                {/* Right — hero image */}
                <motion.div
                  initial={{ opacity: 0, x: 80, scale: 0.94 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                  style={{ position: "relative" }}
                >
                  <div style={{ position: "absolute", inset: -3, borderRadius: 28, background: "linear-gradient(135deg, rgba(255,182,50,0.4), transparent 60%)", filter: "blur(20px)", zIndex: 0 }} />
                  <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", border: "1px solid rgba(255,182,50,0.2)", aspectRatio: "4/3", zIndex: 1 }}>
                    <Image src={heroImage || "/images/templates/template-img-12.jpg"} alt="Hero" fill style={{ objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(12,15,26,0.5) 100%)" }} />
                  </div>
                  {/* Floating badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20, x: -20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    transition={{ delay: 0.9, duration: 0.6, ease: EASE }}
                    style={{
                      position: "absolute", bottom: -18, left: -18, zIndex: 2,
                      background: "#FFB632", borderRadius: 16, padding: "14px 20px",
                      boxShadow: "0 16px 32px rgba(255,182,50,0.3)"
                    }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "#0C0F1A" }}>150+</div>
                    <div style={{ fontSize: 12, fontWeight: 500, color: "#7A5A1A" }}>Projects Delivered</div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8, ease: EASE }}
                style={{ marginTop: 80, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "rgba(255,255,255,0.06)", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                {[
                  { num: "12yr", label: "In Business" },
                  { num: "98%", label: "Client Retention" },
                  { num: "40+", label: "Awards Won" },
                  { num: "3×", label: "Avg. ROI" },
                ].map((s, i) => (
                  <div key={i} style={{ padding: "28px 32px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 30, fontWeight: 800, color: "#FFB632", letterSpacing: "-0.04em" }}>{s.num}</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* ══════════ ABOUT ══════════ */}
          <section id="about" style={{ padding: "120px 0", background: "#FAFAF7" }}>
            <div className="t7-wrap">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
                {/* Text — from left */}
                <div>
                  <SectionLabel tag="About Us" title={aboutUsTitle || "Crafted with intention, built to endure."} align="left" />
                  <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fromLeft}
                    style={{ fontSize: aboutUsContentFontSize || 17, color: "#4A4F6A", lineHeight: 1.8, marginBottom: 36 }}>
                    {aboutUsContent || "We are a multidisciplinary studio of engineers, designers, and strategists. For over a decade, we've partnered with startups and Fortune 500s to turn complex problems into elegant digital solutions. Quality is not a feature — it's our baseline."}
                  </motion.p>
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fromLeft} custom={1}
                    style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 40 }}>
                    {["Human-centered design at every step", "End-to-end ownership from strategy to launch", "Transparent, collaborative process"].map((pt, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <div style={{ width: 22, height: 22, borderRadius: 6, background: "rgba(255,182,50,0.12)", border: "1px solid rgba(255,182,50,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C8892A" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                        </div>
                        <span style={{ fontSize: 15, color: "#0C0F1A", fontWeight: 500 }}>{pt}</span>
                      </div>
                    ))}
                  </motion.div>
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fromLeft} custom={2}>
                    <a href="#contact" className="t7-btn">Learn Our Story</a>
                  </motion.div>
                </div>

                {/* Image — from right */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fromRight}>
                  <div style={{ position: "relative" }}>
                    <div style={{ borderRadius: 24, overflow: "hidden", aspectRatio: "3/4", border: "1px solid rgba(12,15,26,0.08)" }}>
                      <Image src={aboutUsImage || "/images/templates/template-img-20.jpg"} alt="About" fill style={{ objectFit: "cover" }} />
                    </div>
                    {/* Decorative amber block */}
                    <div style={{ position: "absolute", top: -16, right: -16, width: "45%", height: "30%", background: "#FFB632", borderRadius: 18, zIndex: -1, opacity: 0.25 }} />
                    <div style={{ position: "absolute", bottom: 28, right: -20, background: "#0C0F1A", color: "#FFFFFF", borderRadius: 14, padding: "16px 20px", boxShadow: "0 20px 40px rgba(12,15,26,0.15)" }}>
                      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: "#FFB632" }}>2012</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>Founded</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ══════════ SERVICES ══════════ */}
          <section id="services" style={{ padding: "120px 0", background: "#F1F0EA" }}>
            <div className="t7-wrap">
              <SectionLabel tag="Services" title="Everything you need to lead." align="center" />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
                {activeServices.map((s, i) => (
                  <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
                    variants={fromLeft} custom={i * 0.5} className="t7-card" style={{ padding: "36px 32px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                      <div className="t7-num-badge">0{i + 1}</div>
                    </div>
                    <h3 className="t7-heading" style={{ fontSize: 18, color: "#0C0F1A", marginBottom: 12 }}>{s.name || s.title}</h3>
                    <p style={{ fontSize: 14, color: "#4A4F6A", lineHeight: 1.7 }}>{s.desc}</p>
                    <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 6, color: "#C8892A", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                      Learn more
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════ FEATURES ══════════ */}
          <section id="features" style={{ padding: "120px 0", background: "#FAFAF7" }}>
            <div className="t7-wrap">
              <SectionLabel tag="Capabilities" title="Built for the demands of tomorrow." align="center" />
              <div style={{ display: "flex", flexDirection: "column", gap: 80 }}>
                {activeFeatures.map((f, i) => {
                  const even = i % 2 === 0;
                  return (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
                      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={even ? fromLeft : fromRight} style={{ order: even ? 0 : 1 }}>
                        <div style={{ borderRadius: 22, overflow: "hidden", aspectRatio: "4/3", background: "#0C0F1A", border: "1px solid rgba(255,182,50,0.12)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                          {f.image || f.icon ? <Image src={f.image || f.icon} alt={f.title} fill style={{ objectFit: "cover" }} /> : (
                            <>
                              <div className="t7-geo" style={{ top: "20%", left: "20%", width: "60%", height: "60%", background: "rgba(255,182,50,0.15)", filter: "blur(40px)" }} />
                              <div style={{ width: 64, height: 64, borderRadius: 18, background: "#FFB632", position: "relative", zIndex: 1, transform: `rotate(${even ? 12 : -12}deg)` }} />
                            </>
                          )}
                        </div>
                      </motion.div>
                      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={even ? fromRight : fromLeft} style={{ order: even ? 1 : 0 }}>
                        <div style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", color: "#FFB632", letterSpacing: "0.2em", marginBottom: 16, textTransform: "uppercase" }}>Feature — {String(i + 1).padStart(2, "0")}</div>
                        <h3 className="t7-heading" style={{ fontSize: 30, color: "#0C0F1A", marginBottom: 18, lineHeight: 1.15 }}>{f.title}</h3>
                        <p style={{ fontSize: 17, color: "#4A4F6A", lineHeight: 1.75 }}>{f.desc}</p>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ══════════ PORTFOLIO / CAROUSEL ══════════ */}
          <section id="work" style={{ padding: "120px 0", background: "#0C0F1A", position: "relative", overflow: "hidden" }}>
            <div className="t7-noise" />
            <div className="t7-geo" style={{ top: "-20%", right: "-10%", width: "50vw", height: "50vw", background: "rgba(255,182,50,0.1)" }} />
            <div className="t7-wrap" style={{ position: "relative", zIndex: 1 }}>
              <SectionLabel tag="Our Work" title="Recent projects we're proud of." light align="center" />

              {/* Carousel */}
              <Carousel
                items={activePortfolio.length > 0 ? activePortfolio : [
                  { title: "Nexum Rebrand", desc: "Full identity system and digital presence for a SaaS fintech.", image: "/images/templates/template-img-11.jpg" },
                  { title: "Orbit Dashboard", desc: "Complex data visualisation for an analytics platform.", image: "/images/templates/template-img-12.jpg" },
                  { title: "Vela Commerce", desc: "End-to-end ecommerce redesign yielding a 240% revenue lift.", image: "/images/templates/template-img-13.jpg" },
                ]}
                renderItem={(item, idx) => (
                  <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 420, borderRadius: 28, overflow: "hidden", background: "#1A1E30" }}>
                    {item.image && <Image src={item.image} alt={item.title} fill style={{ objectFit: "cover", opacity: 0.65 }} />}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(12,15,26,0.85) 0%, rgba(12,15,26,0.1) 60%)" }} />
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "40px 44px" }}>
                      <div style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", color: "#FFB632", letterSpacing: "0.2em", marginBottom: 10, textTransform: "uppercase" }}>
                        Project {String(idx + 1).padStart(2, "0")}
                      </div>
                      <h3 className="t7-heading" style={{ fontSize: "clamp(24px, 4vw, 36px)", color: "#FFFFFF", marginBottom: 12 }}>{item.title}</h3>
                      <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", maxWidth: 560 }}>{item.desc}</p>
                      {item.link && (
                        <a href={item.link} style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 20, color: "#FFB632", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
                          View Case Study <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              />
            </div>
          </section>

          {/* ══════════ TEAM ══════════ */}
          <section id="team" style={{ padding: "120px 0", background: "#FAFAF7" }}>
            <div className="t7-wrap">
              <SectionLabel tag="The Team" title="People you'll actually work with." align="center" />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
                {activeTeam.map((m, i) => (
                  <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-30px" }}
                    variants={fromBottom} custom={i * 0.4} className="t7-card" style={{ padding: 0, overflow: "hidden" }}>
                    <div style={{ position: "relative", width: "100%", aspectRatio: "1", background: "linear-gradient(135deg, #1A1E30, #0C0F1A)" }}>
                      {m.image ? <Image src={m.image} alt={m.name} fill style={{ objectFit: "cover" }} /> :
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(255,182,50,0.15)", border: "2px solid rgba(255,182,50,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: "#FFB632" }}>
                            {m.name?.[0]}
                          </div>
                        </div>
                      }
                      {/* Amber stripe */}
                      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #FFB632, rgba(255,182,50,0.2))" }} />
                    </div>
                    <div style={{ padding: "22px 24px" }}>
                      <h4 className="t7-heading" style={{ fontSize: 17, color: "#0C0F1A", marginBottom: 4 }}>{m.name}</h4>
                      <div style={{ fontSize: 12, fontFamily: "'DM Mono', monospace", color: "#C8892A", marginBottom: m.bio ? 10 : 0 }}>{m.role}</div>
                      {m.bio && <p style={{ fontSize: 13, color: "#4A4F6A", lineHeight: 1.6 }}>{m.bio}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════ TESTIMONIALS CAROUSEL ══════════ */}
          <section id="testimonials" style={{ padding: "120px 0", background: "#F1F0EA" }}>
            <div className="t7-wrap">
              <SectionLabel tag="Client Stories" title="Don't take our word for it." align="center" />
              <Carousel
                items={activeTestimonials}
                interval={5000}
                renderItem={(t) => (
                  <div style={{ minHeight: 420, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 60px" }}>
                    <div style={{ maxWidth: 800, textAlign: "center" }}>
                      <div style={{ marginBottom: 32 }}>
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#FFB632" style={{ margin: "0 2px" }}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                        ))}
                      </div>
                      <blockquote style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 700, color: "#0C0F1A", lineHeight: 1.35, marginBottom: 36, letterSpacing: "-0.02em" }}>
                        "{t.review}"
                      </blockquote>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
                        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg, #1A1E30, #0C0F1A)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: "#FFB632" }}>
                          {t.name?.[0]}
                        </div>
                        <div style={{ textAlign: "left" }}>
                          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: "#0C0F1A" }}>{t.name}</div>
                          <div style={{ fontSize: 13, color: "#C8892A", fontFamily: "'DM Mono', monospace" }}>{t.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              />
            </div>
          </section>

          {/* ══════════ PRICING ══════════ */}
          {activePricing?.length > 0 && (
            <section id="pricing" style={{ padding: "120px 0", background: "#FAFAF7" }}>
              <div className="t7-wrap">
                <SectionLabel tag="Pricing" title="Honest pricing for every stage." align="center" />
                <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center" }}>
                  {activePricing.map((p, i) => {
                    const featured = i === 1;
                    return (
                      <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        variants={fromBottom} custom={i * 0.35}
                        style={{
                          flex: "1 1 300px", maxWidth: 380,
                          background: featured ? "#0C0F1A" : "#FFFFFF",
                          border: featured ? "1.5px solid rgba(255,182,50,0.35)" : "1px solid rgba(12,15,26,0.07)",
                          borderRadius: 22, padding: "40px 36px",
                          position: "relative", overflow: "hidden"
                        }}>
                        {featured && (
                          <>
                            <div className="t7-geo" style={{ top: "-30%", right: "-20%", width: "60%", height: "60%", background: "rgba(255,182,50,0.12)", filter: "blur(40px)" }} />
                            <div style={{ position: "absolute", top: 0, right: 0, background: "#FFB632", color: "#0C0F1A", fontSize: 11, fontWeight: 700, padding: "7px 16px", borderBottomLeftRadius: 14, fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em" }}>
                              POPULAR
                            </div>
                          </>
                        )}
                        <div style={{ position: "relative", zIndex: 1 }}>
                          <h4 className="t7-heading" style={{ fontSize: 22, color: featured ? "#FFFFFF" : "#0C0F1A", marginBottom: 8 }}>{p.planName}</h4>
                          <div style={{ fontSize: 48, fontWeight: 800, fontFamily: "'Syne', sans-serif", color: featured ? "#FFB632" : "#0C0F1A", letterSpacing: "-0.04em", marginBottom: 28 }}>
                            {p.price}<span style={{ fontSize: 15, fontWeight: 400, color: featured ? "rgba(255,255,255,0.5)" : "#4A4F6A" }}>{p.price !== "Custom" ? "/mo" : ""}</span>
                          </div>
                          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 36px", display: "flex", flexDirection: "column", gap: 14 }}>
                            {(p.features?.split(",") || []).map((feat, j) => (
                              <li key={j} style={{ display: "flex", gap: 11, fontSize: 14, color: featured ? "rgba(255,255,255,0.75)" : "#4A4F6A", alignItems: "flex-start" }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFB632" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 1 }}><polyline points="20 6 9 17 4 12" /></svg>
                                {feat.trim()}
                              </li>
                            ))}
                          </ul>
                          <button className={featured ? "t7-btn" : "t7-btn-ghost"} style={{ width: "100%", justifyContent: "center" }}>
                            {p.buttonText || (p.price === "Custom" ? "Contact Us" : "Get Started")}
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
            <section id="faq" style={{ padding: "120px 0", background: "#F1F0EA" }}>
              <div className="t7-wrap">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80, alignItems: "start" }}>
                  {/* Left sticky label */}
                  <div style={{ position: "sticky", top: 100 }}>
                    <SectionLabel tag="FAQ" title="Questions we get asked a lot." align="left" />
                    <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fromLeft}
                      style={{ fontSize: 16, color: "#4A4F6A", lineHeight: 1.7, marginBottom: 32 }}>
                      Can't find what you're looking for? Reach out directly and we'll get back within 4 hours.
                    </motion.p>
                    <motion.a href="#contact" className="t7-btn" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fromLeft} custom={1}>
                      Ask Us Anything
                    </motion.a>
                  </div>

                  {/* Right scrollable accordion */}
                  <div className="t7-faq-scroll" style={{ maxHeight: 560, overflowY: "auto", paddingRight: 4 }}>
                    {activeFaq.map((item, i) => (
                      <FAQItem key={i} q={item.question} a={item.answer} idx={i} />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ══════════ CTA / CONTACT ══════════ */}
          <section id="contact" style={{ padding: "100px 24px", background: "#FAFAF7", display: "flex", justifyContent: "center" }}>
            <motion.div
              initial={{ opacity: 0, x: -80, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE }}
              style={{ width: "100%", maxWidth: 1200, background: "#0C0F1A", borderRadius: 36, padding: "90px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
              <div className="t7-noise" />
              <div className="t7-geo" style={{ top: "-30%", left: "-10%", width: "50%", height: "100%", background: "rgba(255,182,50,0.14)" }} />
              <div className="t7-geo" style={{ bottom: "-20%", right: "-5%", width: "40%", height: "80%", background: "rgba(100,80,200,0.1)" }} />
              {/* Grid */}
              <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

              <div style={{ position: "relative", zIndex: 1 }}>
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                  <span style={{ display: "inline-block", marginBottom: 20, padding: "6px 16px", borderRadius: 100, background: "rgba(255,182,50,0.1)", border: "1px solid rgba(255,182,50,0.2)", fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#FFB632", fontWeight: 500, letterSpacing: "0.15em" }}>
                    GET IN TOUCH
                  </span>
                </motion.div>
                <motion.h2 className="t7-display" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
                  style={{ fontSize: "clamp(36px, 6vw, 68px)", color: "#FFFFFF", marginBottom: 24, maxWidth: 820, margin: "0 auto 24px" }}>
                  {ctaTitle || "Let's build something extraordinary."}
                </motion.h2>
                <motion.p initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
                  style={{ fontSize: 19, color: "rgba(255,255,255,0.55)", maxWidth: 580, margin: "0 auto 48px", lineHeight: 1.65 }}>
                  {ctaDesc || "Tell us about your project. We read every message and respond within one business day."}
                </motion.p>
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.35 }}
                  style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                  <a href={ctaButtonLink || "#"} className="t7-btn" style={{ padding: "18px 44px", fontSize: 16 }}>
                    {ctaButtonText || "Start a Conversation"}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </a>
                  {contactEmail && (
                    <a href={`mailto:${contactEmail}`} className="t7-btn-light" style={{ fontSize: 15 }}>
                      {contactEmail}
                    </a>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </section>

        </main>

        {/* ══════════ FOOTER ══════════ */}
        <footer style={{ background: "#0C0F1A", padding: "72px 0 36px", borderTop: "1px solid rgba(255,182,50,0.08)" }}>
          <div className="t7-wrap">
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 56 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: "#FFB632", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 12, height: 12, borderRadius: 3, background: "#0C0F1A", transform: "rotate(15deg)" }} />
                  </div>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: "#FFFFFF" }}>{displayName}</span>
                </div>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, marginBottom: 24, maxWidth: 280 }}>
                  {footerDescription || "Thoughtful design and engineering for companies that want to lead."}
                </p>
                <div style={{ display: "flex", gap: 12 }}>
                  {[facebookUrl, twitterUrl, linkedinUrl].filter(Boolean).map((url, i) => (
                    <a key={i} href={url} style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.5)", fontSize: 12, fontFamily: "'DM Mono', monospace", textDecoration: "none", transition: "all 0.3s" }}
                      onMouseOver={e => { e.currentTarget.style.background = "rgba(255,182,50,0.1)"; e.currentTarget.style.borderColor = "rgba(255,182,50,0.25)"; e.currentTarget.style.color = "#FFB632"; }}
                      onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}>
                      {["FB", "TW", "LI"][i]}
                    </a>
                  ))}
                </div>
              </div>
              {[
                { label: "Company", links: ["About", "Services", "Careers", "Blog"] },
                { label: "Work", links: ["Portfolio", "Case Studies", "Testimonials"] },
                { label: "Contact", links: [contactEmail, displayPhone, address].filter(Boolean) },
              ].map((col, i) => (
                <div key={i}>
                  <div style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", color: "#FFB632", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 20 }}>{col.label}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {col.links.map((lk, j) => (
                      <a key={j} href={`#${lk?.toLowerCase?.()}`} style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color 0.25s" }}
                        onMouseOver={e => e.target.style.color = "#FFFFFF"}
                        onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.45)"}>
                        {lk}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
                {footerCopyright || `© ${new Date().getFullYear()} ${displayName}. All rights reserved.`}
              </div>
              <div style={{ display: "flex", gap: 24 }}>
                {["Privacy Policy", "Terms"].map(lk => (
                  <a key={lk} href="#" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}
                    onMouseOver={e => e.target.style.color = "#FFB632"} onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.3)"}>
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