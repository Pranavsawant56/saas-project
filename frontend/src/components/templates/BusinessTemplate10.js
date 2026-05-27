import TemplateLayout from "./TemplateLayout";
import {
  motion, useInView, AnimatePresence, useScroll, useTransform,
  useMotionValue, useSpring,
} from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

const EASE = [0.25, 0.46, 0.45, 0.94];
const EASE_SPRING = { type: "spring", stiffness: 180, damping: 24 };

const revealUp = {
  hidden: { opacity: 0, y: 48 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE, delay: i * 0.12 } }),
};
const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: (i = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE, delay: i * 0.1 } }),
};
const slideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: (i = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE, delay: i * 0.1 } }),
};
const popIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i = 0) => ({ opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE, delay: i * 0.09 } }),
};

const NoiseOverlay = () => (
  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.04, zIndex: 1 }} xmlns="http://www.w3.org/2000/svg">
    <filter id="noise10"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
    <rect width="100%" height="100%" filter="url(#noise10)" />
  </svg>
);

const MagBtn = ({ children, className, style, href, onClick }) => {
  const ref = useRef(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 20 });
  const sy = useSpring(y, { stiffness: 220, damping: 20 });
  const Tag = href ? "a" : "button";
  return (
    <motion.div ref={ref}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.25);
        y.set((e.clientY - r.top - r.height / 2) * 0.25);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ display: "inline-block" }}>
      <motion.div style={{ x: sx, y: sy }}>
        <Tag href={href} onClick={onClick} className={className} style={style}>{children}</Tag>
      </motion.div>
    </motion.div>
  );
};

const Marquee = ({ items, speed = 35 }) => {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden" }}>
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", width: "max-content", alignItems: "center" }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 20, padding: "0 40px", whiteSpace: "nowrap", fontSize: 11, fontWeight: 600, letterSpacing: "0.22em", color: "#8FAF9A", fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#B87333", flexShrink: 0 }} />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const RotatingRing = () => {
  const text = "AVAILABLE FOR WORK · EST. 2012 · CRAFTED WITH PURPOSE · ";
  const radius = 68;
  return (
    <motion.div animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      style={{ width: 150, height: 150, position: "relative" }}>
      <svg viewBox="0 0 150 150" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <path id="ringCircle10" d={`M 75,75 m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`} />
        </defs>
        <text fontSize="9" fontFamily="'DM Sans', sans-serif" letterSpacing="2.5" fill="#1B4332" fontWeight="600">
          <textPath href="#ringCircle10">{text}</textPath>
        </text>
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 46, height: 46, borderRadius: "50%", background: "#1B4332", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F5F0E8" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </div>
      </div>
    </motion.div>
  );
};

const ServiceAccordion = ({ services }) => {
  const [active, setActive] = useState(0);
  return (
    <div style={{ border: "1px solid rgba(212,175,55,0.4)", borderRadius: 4, overflow: "hidden" }}>
      {/* Mobile: stacked */}
      <div className="t10-service-mobile">
        {services.map((s, i) => (
          <div key={i} onClick={() => setActive(active === i ? -1 : i)}
            style={{ borderBottom: i < services.length - 1 ? "1px solid rgba(212,175,55,0.2)" : "none", background: active === i ? "#1B4332" : "transparent" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", cursor: "pointer" }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: active === i ? "#F5F0E8" : "#0E1117" }}>{s.name || s.title}</span>
              <motion.span animate={{ rotate: active === i ? 45 : 0 }} transition={{ duration: 0.3 }}
                style={{ fontSize: 20, color: active === i ? "#D4AF37" : "#8FAF9A", lineHeight: 1, flexShrink: 0 }}>+</motion.span>
            </div>
            <AnimatePresence initial={false}>
              {active === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }}>
                  <div style={{ padding: "0 24px 20px" }}>
                    <p style={{ fontSize: 14, color: "#8FAF9A", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>{s.desc}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      {/* Desktop: side-by-side */}
      <div className="t10-service-desktop" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ borderRight: "1px solid rgba(212,175,55,0.3)" }}>
          {services.map((s, i) => (
            <div key={i} onClick={() => setActive(i)}
              style={{ padding: "22px 28px", cursor: "pointer", borderBottom: i < services.length - 1 ? "1px solid rgba(212,175,55,0.15)" : "none", background: active === i ? "#1B4332" : "transparent", transition: "background 0.4s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: active === i ? "#F5F0E8" : "#0E1117" }}>{s.name || s.title}</span>
                <motion.span animate={{ rotate: active === i ? 45 : 0 }} transition={{ duration: 0.3 }}
                  style={{ fontSize: 20, color: active === i ? "#D4AF37" : "#8FAF9A", lineHeight: 1 }}>+</motion.span>
              </div>
            </div>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: EASE }}
            style={{ padding: "36px 32px", background: "#EDE8DC", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 280 }}>
            <div>
              <div style={{ width: 48, height: 48, borderRadius: 6, background: "#1B4332", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, fontSize: 20, color: "#D4AF37" }}>
                {services[active]?.icon || "◆"}
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: "#0E1117", marginBottom: 14, lineHeight: 1.2 }}>
                {services[active]?.name || services[active]?.title}
              </h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#5a5a4a", lineHeight: 1.8 }}>{services[active]?.desc}</p>
            </div>
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(184,115,51,0.2)" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: "0.18em", color: "#B87333", textTransform: "uppercase", fontWeight: 600 }}>
                {`0${active + 1} / 0${services.length}`}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ── Portfolio Grid — compact cards, smaller images ── */
const PortfolioGrid = ({ items }) => {
  const [hovered, setHovered] = useState(null);
  return (
    <div className="t10-portfolio-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
      {items.map((item, i) => (
        <motion.div key={i}
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={popIn} custom={i * 0.1}
          onHoverStart={() => setHovered(i)}
          onHoverEnd={() => setHovered(null)}
          style={{
            position: "relative",
            borderRadius: 5,
            overflow: "hidden",
            /* ↓ smaller ratio = shorter card */
            aspectRatio: "5/3",
            cursor: "pointer",
            background: "#1B4332",
          }}>
          {item.image && (
            <Image src={item.image} alt={item.title} fill
              style={{ objectFit: "cover", filter: hovered === i ? "brightness(0.5)" : "brightness(0.68)", transition: "filter 0.5s" }} />
          )}
          {/* always-visible bottom title strip */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(14,17,23,0.85) 0%, rgba(14,17,23,0.15) 55%, transparent 100%)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "12px 14px" }}>
            <span style={{ fontSize: 8, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.18em", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", marginBottom: 3 }}>{item.tag || "Project"}</span>
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, color: "#F5F0E8", fontWeight: 700, lineHeight: 1.2, marginBottom: 0 }}>{item.title}</h4>
          </div>
          {/* hover overlay with description */}
          <motion.div animate={{ opacity: hovered === i ? 1 : 0 }} transition={{ duration: 0.25 }}
            style={{ position: "absolute", inset: 0, background: "rgba(14,17,23,0.72)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", padding: "14px 16px", gap: 6 }}>
            <span style={{ fontSize: 8, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.2em", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase" }}>{item.tag || "Project"}</span>
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, color: "#F5F0E8", fontWeight: 700, lineHeight: 1.2 }}>{item.title}</h4>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(245,240,232,0.65)", lineHeight: 1.5 }}>{item.desc}</p>
          </motion.div>
          {/* top tag badge */}
          <div style={{ position: "absolute", top: 8, left: 8 }}>
            <span style={{ padding: "2px 8px", borderRadius: 3, background: "rgba(14,17,23,0.7)", backdropFilter: "blur(6px)", fontSize: 8, fontFamily: "'DM Sans', sans-serif", color: "#D4AF37", letterSpacing: "0.14em", fontWeight: 700, textTransform: "uppercase" }}>
              {item.tag || "Project"}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const TestimonialDeck = ({ items }) => {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const go = (idx) => { setDir(idx > active ? 1 : -1); setActive(idx); };
  useEffect(() => {
    const t = setInterval(() => { setDir(1); setActive(c => (c + 1) % items.length); }, 5500);
    return () => clearInterval(t);
  }, [items.length]);
  const vars = {
    enter: (d) => ({ x: d * 50, opacity: 0, rotate: d * 2 }),
    center: { x: 0, opacity: 1, rotate: 0, transition: { duration: 0.5, ease: EASE } },
    exit: (d) => ({ x: d * -40, opacity: 0, rotate: d * -2, transition: { duration: 0.3 } }),
  };
  const t = items[active];
  return (
    <div>
      <div style={{ position: "relative", minHeight: 300 }}>
        {[2, 1].map(offset => (
          <div key={offset} style={{ position: "absolute", inset: 0, top: offset * 9, left: offset * 7, background: offset === 2 ? "#2D6A4F" : "#1B4332", borderRadius: 4, opacity: 0.35 - offset * 0.1 }} />
        ))}
        <AnimatePresence custom={dir} mode="wait">
          <motion.div key={active} custom={dir} variants={vars} initial="enter" animate="center" exit="exit"
            style={{ position: "relative", background: "#1B4332", borderRadius: 4, padding: "36px 40px", border: "1px solid rgba(212,175,55,0.2)", zIndex: 5 }}>
            <svg width="30" height="24" viewBox="0 0 36 28" fill="none" style={{ marginBottom: 20, opacity: 0.3 }}>
              <path d="M0 28V17.5C0 9.5 4.5 3.5 13.5 0L16 4C11 6 8.5 9.5 8 14H15V28H0ZM21 28V17.5C21 9.5 25.5 3.5 34.5 0L37 4C32 6 29.5 9.5 29 14H36V28H21Z" fill="#D4AF37" />
            </svg>
            <blockquote style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(15px,1.8vw,20px)", color: "#F5F0E8", lineHeight: 1.65, marginBottom: 28, fontStyle: "italic" }}>"{t.review}"</blockquote>
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#B87333,#D4AF37)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 17, color: "#0E1117", fontFamily: "'Playfair Display', serif", flexShrink: 0 }}>{t.name?.[0]}</div>
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, color: "#F5F0E8" }}>{t.name}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#B87333" }}>{t.role}</div>
              </div>
              <div style={{ marginLeft: "auto", display: "flex", gap: 2 }}>
                {[...Array(5)].map((_, i) => <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#D4AF37"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>)}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 24, justifyContent: "center" }}>
        {items.map((_, i) => <button key={i} onClick={() => go(i)} style={{ width: i === active ? 28 : 8, height: 8, borderRadius: 100, background: i === active ? "#B87333" : "rgba(184,115,51,0.3)", border: "none", cursor: "pointer", transition: "all 0.4s" }} />)}
      </div>
    </div>
  );
};

const PricingSection = ({ plans }) => {
  const [annual, setAnnual] = useState(false);
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 52 }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: !annual ? "#0E1117" : "#8FAF9A", fontWeight: 600 }}>Monthly</span>
        <button onClick={() => setAnnual(!annual)} style={{ width: 52, height: 28, borderRadius: 100, background: annual ? "#1B4332" : "#EDE8DC", border: "1px solid rgba(27,67,50,0.3)", cursor: "pointer", position: "relative", transition: "background 0.4s" }}>
          <motion.div animate={{ x: annual ? 25 : 2 }} transition={EASE_SPRING} style={{ position: "absolute", top: 2, width: 22, height: 22, borderRadius: "50%", background: annual ? "#D4AF37" : "#8FAF9A" }} />
        </button>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: annual ? "#0E1117" : "#8FAF9A", fontWeight: 600 }}>
          Annual <span style={{ fontSize: 11, color: "#B87333", fontWeight: 700 }}>Save 20%</span>
        </span>
      </div>
      <div className="t10-pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
        {plans.map((p, i) => {
          const featured = p.highlight || i === 1;
          const rawPrice = p.price?.replace(/[^0-9]/g, "");
          const displayPrice = rawPrice && annual ? `$${Math.round(+rawPrice * 0.8).toLocaleString()}` : p.price;
          return (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} custom={i * 0.15}
              style={{ background: featured ? "#1B4332" : "#F5F0E8", border: featured ? "1px solid rgba(212,175,55,0.4)" : "1px solid rgba(27,67,50,0.15)", borderRadius: 4, padding: "40px 36px", position: "relative", overflow: "hidden" }}>
              {featured && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#B87333,#D4AF37)" }} />}
              {featured && <div style={{ position: "absolute", top: 16, right: 16, padding: "3px 10px", background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.4)", borderRadius: 3, fontSize: 9, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#D4AF37", letterSpacing: "0.16em", textTransform: "uppercase" }}>Popular</div>}
              <div style={{ fontSize: 10, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.2em", color: featured ? "#8FAF9A" : "#B87333", marginBottom: 12, textTransform: "uppercase", fontWeight: 600 }}>{p.planName}</div>
              <AnimatePresence mode="wait">
                <motion.div key={annual ? "a" : "m"} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                  style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 24 }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 700, color: featured ? "#F5F0E8" : "#0E1117", lineHeight: 1, letterSpacing: "-0.03em" }}>{displayPrice}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#8FAF9A" }}>{p.period}</span>
                </motion.div>
              </AnimatePresence>
              <div style={{ height: 1, background: featured ? "rgba(255,255,255,0.08)" : "rgba(27,67,50,0.1)", marginBottom: 24 }} />
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: 10 }}>
                {(p.features?.split(",") || []).map((feat, j) => (
                  <li key={j} style={{ display: "flex", gap: 10, fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: featured ? "rgba(245,240,232,0.7)" : "#5a5a4a", alignItems: "flex-start" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={featured ? "#D4AF37" : "#1B4332"} strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 1 }}><polyline points="20 6 9 17 4 12" /></svg>
                    {feat.trim()}
                  </li>
                ))}
              </ul>
              <button style={{ width: "100%", padding: "14px", borderRadius: 3, background: featured ? "linear-gradient(135deg,#B87333,#D4AF37)" : "transparent", border: featured ? "none" : "1.5px solid #1B4332", color: featured ? "#0E1117" : "#1B4332", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: "0.05em" }}>
                {p.price === "Custom" ? "Contact Us" : "Get Started"}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const CountUp = ({ end, suffix = "", duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let s = 0;
    const step = end / (duration * 60);
    const t = setInterval(() => {
      s += step;
      if (s >= end) { setCount(end); clearInterval(t); }
      else setCount(Math.floor(s));
    }, 1000 / 60);
    return () => clearInterval(t);
  }, [inView, end, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

const FAQItem = ({ q, a, idx }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={slideLeft} custom={idx * 0.12}
      style={{ borderBottom: "1px solid rgba(27,67,50,0.12)" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0", background: "none", border: "none", cursor: "pointer", gap: 16 }}>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: "#0E1117", textAlign: "left" }}>{q}</span>
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }}
          style={{ width: 30, height: 30, borderRadius: 4, flexShrink: 0, border: "1.5px solid", borderColor: open ? "#1B4332" : "rgba(27,67,50,0.25)", background: open ? "#1B4332" : "transparent", color: open ? "#D4AF37" : "#1B4332", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>+</motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.32, ease: EASE }}>
            <p style={{ paddingBottom: 20, fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: "#5a5a4a", lineHeight: 1.8, margin: 0 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Badge = ({ children, light = false }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 14, padding: "5px 14px", borderRadius: 3, background: light ? "rgba(245,240,232,0.1)" : "rgba(27,67,50,0.07)", border: `1px solid ${light ? "rgba(245,240,232,0.2)" : "rgba(27,67,50,0.2)"}`, fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 700, color: light ? "#8FAF9A" : "#1B4332", letterSpacing: "0.22em", textTransform: "uppercase" }}>
    <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#B87333" }} />
    {children}
  </span>
);

const BlogCard = ({ post, i }) => (
  <motion.article initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} custom={i * 0.14}
    style={{ cursor: "pointer", display: "flex", flexDirection: "column" }}>
    {post.image && (
      <div style={{ position: "relative", aspectRatio: "4/3", borderRadius: 4, overflow: "hidden", marginBottom: 18 }}>
        <Image src={post.image} alt={post.title} fill style={{ objectFit: "cover", transition: "transform 0.5s" }}
          onMouseOver={e => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseOut={e => e.currentTarget.style.transform = "scale(1)"} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(27,67,50,0.15)" }} />
      </div>
    )}
    {post.category && <span style={{ fontSize: 9, fontFamily: "'DM Sans', sans-serif", color: "#B87333", letterSpacing: "0.2em", fontWeight: 700, marginBottom: 8, textTransform: "uppercase" }}>{post.category}</span>}
    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: "#0E1117", lineHeight: 1.3, marginBottom: 10 }}>{post.title}</h3>
    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#7a7a6a", lineHeight: 1.7, marginBottom: 16, flex: 1 }}>{post.excerpt || post.desc}</p>
    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#1B4332", fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>
      Read Article <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
    </div>
  </motion.article>
);

const ProcessStep = ({ step, i, total }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={revealUp} custom={i * 0.18}
      style={{ display: "flex", flexDirection: "column", position: "relative", padding: "28px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 14 }}>
        <div style={{ width: 48, height: 48, borderRadius: 4, flexShrink: 0, background: i % 2 === 0 ? "#1B4332" : "#EDE8DC", border: "1px solid", borderColor: i % 2 === 0 ? "rgba(212,175,55,0.3)" : "rgba(27,67,50,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: i % 2 === 0 ? "#D4AF37" : "#1B4332" }}>
          {String(i + 1).padStart(2, "0")}
        </div>
        <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: "#0E1117" }}>{step.title}</h4>
      </div>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#7a7a6a", lineHeight: 1.75, paddingLeft: 66 }}>{step.desc}</p>
      {i < total - 1 && <div style={{ position: "absolute", left: 23, bottom: -1, width: 2, height: 28, background: "linear-gradient(to bottom, rgba(27,67,50,0.3), transparent)" }} />}
    </motion.div>
  );
};

export default function BusinessTemplate10({ data }) {
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
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], ["0%", "28%"]);

  useEffect(() => setMounted(true), []);

  /* Close menu on resize to desktop */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const displayName = companyName || "Verdant Studio";
  const displayPhone = phone ? `${countryCode?.split(" ")[0] || ""} ${phone}` : "";

  const activeServices = services?.some(s => s.name || s.desc) ? services : [
    { name: "Brand Strategy", desc: "We excavate the soul of your business — finding the positioning, voice, and narrative that makes you irreplaceable in your market.", icon: "◆" },
    { name: "Visual Identity", desc: "Logos, palettes, type systems, and brand guidelines that have the authority of a century-old institution and the edge of tomorrow.", icon: "◈" },
    { name: "Digital Design", desc: "Web experiences built at the intersection of beauty and conversion. Every interaction considered, every pixel intentional.", icon: "◉" },
    { name: "Creative Direction", desc: "We lead your campaigns, editorial shoots, and content systems with a vision that makes your audience stop scrolling.", icon: "◎" },
    { name: "Copywriting", desc: "Words that earn trust, command attention, and move people to act — from a single tagline to an entire content ecosystem.", icon: "◳" },
    { name: "Growth Systems", desc: "Strategy, analytics, and performance marketing married to creative excellence. Your funnel, elevated.", icon: "◐" },
  ];

  const activeFeatures = features?.some(f => f.title) ? features : [
    { title: "Rooted in craft, not convention", desc: "Every project is approached as a unique creative problem. We don't recycle templates — we build from the ground up with your specific context in mind.", tag: "PHILOSOPHY" },
    { title: "Senior eyes on every brief", desc: "Your work is reviewed and shaped by the most experienced hands in the studio — always. No juniors learning on your budget.", tag: "QUALITY" },
    { title: "Built on enduring principles", desc: "We design for longevity. Our aesthetic decisions are grounded in timeless principles, not fleeting trends.", tag: "APPROACH" },
  ];

  const activeTeam = team?.some(t => t.name) ? team : [
    { name: "Elara Voss", role: "Creative Director", bio: "15 years shaping luxury brands from Copenhagen to Tokyo. Obsessed with restraint as a design strategy.", color: "#1B4332" },
    { name: "Rohan Mehta", role: "Strategy Lead", bio: "Ex-Ogilvy. Believes in the power of a single, perfect insight over a hundred mediocre ones.", color: "#B87333" },
    { name: "Simone Adler", role: "Head of Copy", bio: "Former literary editor. Makes every sentence pull its weight, earn its place, and outlast the trend cycle.", color: "#2D6A4F" },
    { name: "Kai Nakamura", role: "Technical Director", bio: "Builds digital experiences at the edge of what browsers can do — without compromising a millisecond of load time.", color: "#D4AF37" },
  ];

  const activeTestimonials = testimonials?.some(t => t.review) ? testimonials : [
    { name: "Helena Cross", role: "Founder, Atelier Maison", review: "Working with Verdant felt like having a trusted creative partner who understood our vision before we could fully articulate it ourselves. The result was beyond anything we imagined." },
    { name: "Dominic Ferreira", role: "CEO, Canopy Group", review: "Our brand identity was stagnant for eight years. Verdant rebuilt it from the foundation — and within three months, we had our best pipeline quarter ever." },
    { name: "Yuki Tanaka", role: "CMO, Kiro Health", review: "They brought a rigour and creative intelligence to our digital presence that I hadn't seen from any studio. Our conversion rate doubled. The pride we feel in our brand now is immeasurable." },
    { name: "Isabelle Renard", role: "Director, Studio Forme", review: "Verdant doesn't just do the work — they make you think more clearly about your own business. The strategic depth underneath the beautiful surface is what sets them apart entirely." },
  ];

  const activePricing = pricing?.some(p => p.planName) ? pricing : [
    { planName: "Foundations", price: "$6,500", period: "/ project", features: "Brand audit, Logo system, 1 collateral piece, Style guide, 3 revision rounds", highlight: false },
    { planName: "Studio", price: "$12,000", period: "/ month", features: "Full identity system, Web design, Monthly retainer, Dedicated team, Slack access, Unlimited revisions, Analytics", highlight: true },
    { planName: "Atelier", price: "Custom", period: "", features: "Bespoke scope, Embedded creative team, Quarterly retreats, SLA guarantees, Executive workshops, Full IP transfer", highlight: false },
  ];

  const activeFaq = faq?.some(f => f.question) ? faq : [
    { question: "How do you approach a new project?", answer: "Every engagement begins with a deep discovery phase — usually one to two weeks of interviews, research, and creative immersion — before we commit to a single design direction." },
    { question: "How long does a typical project take?", answer: "A brand foundations project typically takes 6–10 weeks. Ongoing Studio retainers are structured in monthly cycles. Complex Atelier engagements are scoped case by case." },
    { question: "Do you work with startups?", answer: "Yes. Our Foundations package was designed for early-stage companies who understand that brand is infrastructure, not decoration." },
    { question: "What makes Verdant different from other agencies?", answer: "We operate like a studio — small, expert, intentional. We take on fewer clients than most agencies so we can go deeper." },
    { question: "Who retains ownership of the work?", answer: "You do. All intellectual property, source files, and brand assets transfer to you upon final payment with no conditions or licensing complications." },
    { question: "Can we start with a smaller scope and grow?", answer: "Absolutely. Many of our longest client relationships started with a Foundations project. We're happy to grow the engagement as the business grows." },
  ];

  const activePortfolio = portfolio?.some(p => p.title) ? portfolio : [
    { title: "Atelier Maison", desc: "Complete luxury brand identity — from logotype to flagship store experience.", tag: "Brand", image: "/images/templates/template-img-11.jpg" },
    { title: "Canopy Group", desc: "B2B brand rebuild that drove a 3× pipeline increase in 90 days.", tag: "Strategy", image: "/images/templates/template-img-12.jpg" },
    { title: "Kiro Health", desc: "Digital-first wellness brand with a 2× conversion rate improvement.", tag: "Digital", image: "/images/templates/template-img-13.jpg" },
    { title: "Studio Forme", desc: "Editorial identity for a contemporary architecture studio.", tag: "Editorial", image: "/images/templates/template-img-20.jpg" },
    { title: "The Verdant Annual", desc: "Our own annual design report — editorial, typographic, enduring.", tag: "Print", image: "/images/templates/template-img-11.jpg" },
    { title: "Bloom Commerce", desc: "End-to-end ecommerce brand and UX. 2× conversion in 6 weeks.", tag: "eCommerce", image: "/images/templates/template-img-12.jpg" },
  ];

  const activeBlog = blog?.some(b => b.title) ? blog : [
    { title: "The case for restraint in contemporary branding", excerpt: "In an era of maximum noise, the most powerful brand move is often knowing what to leave out.", category: "CRAFT", image: "/images/templates/template-img-12.jpg" },
    { title: "Why your brand guidelines aren't working", excerpt: "A style guide without strategic underpinning is just a collection of colours and fonts waiting to be ignored.", category: "STRATEGY", image: "/images/templates/template-img-13.jpg" },
    { title: "The typography decisions that make or break trust", excerpt: "Before a reader processes a single word, type has already made a dozen silent promises about your credibility.", category: "DESIGN", image: "/images/templates/template-img-20.jpg" },
  ];

  const processSteps = [
    { title: "Discovery", desc: "We listen before we create. A focused immersion into your world — your audience, your competitors, your ambitions." },
    { title: "Strategy", desc: "We define the positioning, the narrative, and the creative direction that will guide everything that follows." },
    { title: "Creation", desc: "The studio gets to work. Iterative, rigorous, and always in dialogue with you through structured review cycles." },
    { title: "Delivery", desc: "A comprehensive handoff with full files, guidelines, and a transition session so your team can steward the work confidently." },
  ];

  const marqueeItems = ["Brand Identity", "Visual Design", "Creative Direction", "Copywriting", "Digital Strategy", "Art Direction", "Editorial Design", "Typography", "Campaign Creative", "Design Systems"];

  if (!mounted) return null;

  return (
    <TemplateLayout data={data} theme="light" category="Business" hideHeader={true} hideFooter={true}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .t10 { font-family: 'DM Sans', sans-serif; background: #F5F0E8; color: #0E1117; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        .t10-wrap { max-width: 1280px; margin: 0 auto; padding: 0 48px; position: relative; }
        .t10-serif { font-family: 'Playfair Display', serif; }

        /* ── Buttons ── */
        .t10-btn { display: inline-flex; align-items: center; gap: 10px; padding: 15px 36px; background: #1B4332; color: #F5F0E8; border-radius: 3px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600; letter-spacing: 0.04em; border: none; cursor: pointer; text-decoration: none; transition: all 0.3s; }
        .t10-btn:hover { background: #0E1117; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(14,17,23,0.2); }
        .t10-btn-copper { display: inline-flex; align-items: center; gap: 10px; padding: 15px 36px; background: linear-gradient(135deg,#B87333,#D4AF37); color: #0E1117; border-radius: 3px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 700; border: none; cursor: pointer; text-decoration: none; transition: all 0.3s; }
        .t10-btn-copper:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(184,115,51,0.3); }
        .t10-btn-outline { display: inline-flex; align-items: center; gap: 10px; padding: 14px 32px; background: transparent; color: #1B4332; border-radius: 3px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600; border: 1.5px solid rgba(27,67,50,0.4); cursor: pointer; text-decoration: none; transition: all 0.3s; }
        .t10-btn-outline:hover { background: rgba(27,67,50,0.05); border-color: #1B4332; }

        /* ── Nav ── */
        .t10-nav-link { font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; color: rgba(14,17,23,0.5); text-decoration: none; transition: color 0.2s; }
        .t10-nav-link:hover { color: #1B4332; }

        /* ── Scrollbar ── */
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #F5F0E8; }
        ::-webkit-scrollbar-thumb { background: rgba(184,115,51,0.4); border-radius: 100px; }

        /* ══ Visibility helpers — base (desktop) ══ */
        /* hamburger hidden on desktop, nav links visible */
        .t10-hamburger { display: none; }
        .t10-desktop-nav { display: flex; }
        .t10-desktop-cta { display: inline-flex; }

        /* Service accordion */
        .t10-service-mobile { display: none; }
        .t10-service-desktop { display: grid; }

        /* Portfolio grid default */
        .t10-portfolio-grid { grid-template-columns: repeat(3, 1fr) !important; }

        /* ══ 1024px tablet ══ */
        @media (max-width: 1024px) {
          .t10-wrap { padding: 0 32px; }
          .t10-hero-grid { grid-template-columns: 1fr !important; }
          .t10-about-grid { grid-template-columns: 1fr !important; }
          .t10-features-grid { grid-template-columns: 1fr !important; }
          .t10-process-grid { grid-template-columns: 1fr !important; }
          .t10-testimonial-grid { grid-template-columns: 1fr !important; }
          .t10-faq-grid { grid-template-columns: 1fr !important; }
          .t10-footer-grid { grid-template-columns: 1fr 1fr !important; }
          .t10-sticky { position: static !important; }
          .t10-portfolio-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .t10-team-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .t10-hero-right { display: none !important; }
        }

        /* ══ 768px mobile ══ */
        @media (max-width: 768px) {
          .t10-wrap { padding: 0 16px; }

          /* show hamburger, hide desktop nav/cta */
          .t10-hamburger { display: flex !important; }
          .t10-desktop-nav { display: none !important; }
          .t10-desktop-cta { display: none !important; }

          /* service accordion */
          .t10-service-mobile { display: block; }
          .t10-service-desktop { display: none !important; }

          /* portfolio 2-col on mobile */
          .t10-portfolio-grid { grid-template-columns: repeat(2, 1fr) !important; }

          /* blog single col */
          .t10-blog-grid { grid-template-columns: 1fr !important; }

          /* team 2-col */
          .t10-team-grid { grid-template-columns: repeat(2, 1fr) !important; }

          /* footer stacked */
          .t10-footer-grid { grid-template-columns: 1fr !important; }

          /* hero right panel hide */
          .t10-hero-right { display: none !important; }

          /* CTA inner padding */
          .t10-cta-inner { padding: 52px 24px !important; }

          /* section padding reduce */
          .t10-section-pad { padding: 64px 0 !important; }
        }

        /* ══ 480px small mobile ══ */
        @media (max-width: 480px) {
          .t10-portfolio-grid { grid-template-columns: 1fr !important; }
          .t10-team-grid { grid-template-columns: 1fr 1fr !important; }
          .t10-pricing-grid { grid-template-columns: 1fr !important; }
          .t10-stat-row { gap: 20px !important; flex-wrap: wrap !important; }
          .t10-hero-btns { flex-direction: column !important; align-items: flex-start !important; }
          .t10-hero-btns a, .t10-hero-btns button { width: 100% !important; justify-content: center !important; }
          .t10-footer-grid { grid-template-columns: 1fr 1fr !important; }
          .t10-blog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="t10">

        {/* ══════════ HEADER ══════════ */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(245,240,232,0.93)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: "1px solid rgba(27,67,50,0.08)" }}>
          <div className="t10-wrap" style={{ height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 30, height: 30, borderRadius: 3, background: "#1B4332", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1L13 4V10L7 13L1 10V4L7 1Z" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
                  <circle cx="7" cy="7" r="2" fill="#D4AF37" />
                </svg>
              </div>
              {headerType === "Image" && logoUrl ? (
                <div style={{ position: "relative", height: 22, width: 90 }}>
                  <Image src={logoUrl} alt={displayName} fill style={{ objectFit: "contain", objectPosition: "left" }} />
                </div>
              ) : (
                <span className="t10-serif" style={{ fontSize: companyNameFontSize || 19, fontWeight: 700, color: "#0E1117", letterSpacing: "-0.02em" }}>{displayName}</span>
              )}
            </div>

            {/* Desktop Nav */}
            <nav className="t10-desktop-nav" style={{ gap: 32 }}>
              {["Work", "Services", "Process", "Pricing", "Studio"].map(n => (
                <a key={n} href={`#${n.toLowerCase()}`} className="t10-nav-link">{n}</a>
              ))}
            </nav>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* Desktop CTA */}
              <a href="#contact" className="t10-btn t10-desktop-cta" style={{ padding: "9px 18px", fontSize: 13 }}>Start a Project</a>

              {/* ── Hamburger button — shown only on mobile via CSS ── */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="t10-hamburger"
                aria-label="Toggle menu"
                style={{
                  width: 42, height: 42,
                  borderRadius: 4,
                  background: menuOpen ? "#1B4332" : "rgba(27,67,50,0.08)",
                  border: "1px solid rgba(27,67,50,0.18)",
                  cursor: "pointer",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: 5,
                  padding: 0,
                  transition: "background 0.3s",
                }}>
                <motion.span
                  animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
                  transition={{ duration: 0.28 }}
                  style={{ display: "block", width: 18, height: 2, background: menuOpen ? "#D4AF37" : "#1B4332", borderRadius: 2, transformOrigin: "center" }} />
                <motion.span
                  animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
                  transition={{ duration: 0.18 }}
                  style={{ display: "block", width: 18, height: 2, background: "#1B4332", borderRadius: 2 }} />
                <motion.span
                  animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
                  transition={{ duration: 0.28 }}
                  style={{ display: "block", width: 18, height: 2, background: menuOpen ? "#D4AF37" : "#1B4332", borderRadius: 2, transformOrigin: "center" }} />
              </button>
            </div>
          </div>
        </motion.header>

        {/* ══════════ MOBILE MENU ══════════ */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: EASE }}
              style={{ position: "fixed", top: 64, left: 0, right: 0, zIndex: 99, background: "#F5F0E8", borderBottom: "2px solid rgba(27,67,50,0.12)", boxShadow: "0 16px 40px rgba(14,17,23,0.12)", overflow: "hidden" }}>
              <div style={{ padding: "6px 16px 24px" }}>
                {["Work", "Services", "Process", "Pricing", "Studio", "Contact"].map((n, i) => (
                  <motion.a
                    key={n}
                    href={`#${n.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 0", borderBottom: "1px solid rgba(27,67,50,0.07)", fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#0E1117", textDecoration: "none", fontSize: 20 }}>
                    {n}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B87333" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.25 }}
                  style={{ marginTop: 20 }}>
                  <a href="#contact" onClick={() => setMenuOpen(false)} className="t10-btn-copper"
                    style={{ width: "100%", justifyContent: "center", fontSize: 14, display: "flex" }}>
                    Begin Your Project →
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main style={{ paddingTop: 64 }}>

          {/* ══════════ HERO ══════════ */}
          <section style={{ position: "relative", minHeight: "100vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
              <div style={{ position: "absolute", inset: 0, background: "#EDE8DC" }} />
              <div style={{ position: "absolute", right: 0, top: 0, width: "42%", height: "100%", background: "#1B4332", clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0% 100%)" }} />
            </div>
            <NoiseOverlay />

            <div className="t10-wrap t10-hero-grid"
              style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, flex: 1, alignItems: "center", paddingTop: 60, paddingBottom: 60 }}>
              {/* Left */}
              <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                style={{ paddingRight: 48, paddingBottom: 20 }}>
                <motion.div variants={revealUp} custom={0}><Badge>Creative Studio · Est. 2012</Badge></motion.div>
                <motion.h1 variants={revealUp} custom={1} className="t10-serif"
                  style={{ fontSize: heroTitleFontSize ? `${heroTitleFontSize}px` : "clamp(32px, 5vw, 78px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 0.95, color: "#0E1117", marginBottom: 28, marginTop: 8 }}>
                  {heroTitle || (<>We shape<br /><em style={{ color: "#1B4332" }}>brands</em><br />worth<br /><span style={{ color: "#B87333" }}>remembering.</span></>)}
                </motion.h1>
                <motion.p variants={revealUp} custom={2}
                  style={{ fontSize: taglineFontSize || 15, color: "#7a7a6a", lineHeight: 1.8, maxWidth: 400, marginBottom: 36 }}>
                  {tagline || "Verdant is a boutique creative studio for founders who understand that enduring brand value is the highest-return investment a business can make."}
                </motion.p>
                <motion.div variants={revealUp} custom={3} className="t10-hero-btns"
                  style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 52 }}>
                  <MagBtn href="#contact" className="t10-btn-copper">
                    Begin Your Project
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </MagBtn>
                  <MagBtn href="#work" className="t10-btn-outline">See Our Work</MagBtn>
                </motion.div>
                <motion.div variants={revealUp} custom={4} className="t10-stat-row"
                  style={{ display: "flex", gap: 40, paddingTop: 28, borderTop: "1px solid rgba(27,67,50,0.12)" }}>
                  {[{ val: 13, suf: "+", label: "Years" }, { val: 180, suf: "+", label: "Projects" }, { val: 96, suf: "%", label: "Retention" }].map((s, i) => (
                    <div key={i}>
                      <div className="t10-serif" style={{ fontSize: "clamp(24px,3vw,42px)", fontWeight: 700, color: "#1B4332", letterSpacing: "-0.04em", lineHeight: 1 }}>
                        <CountUp end={s.val} suffix={s.suf} />
                      </div>
                      <div style={{ fontSize: 10, color: "#8FAF9A", marginTop: 4, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}>{s.label}</div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right — hero image (hidden on mobile/tablet) */}
              <motion.div className="t10-hero-right"
                initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: EASE }}
                style={{ position: "relative", paddingLeft: 36 }}>
                <motion.div style={{ y: heroY }}>
                  <div style={{ borderRadius: 6, overflow: "hidden", aspectRatio: "3/4", position: "relative", boxShadow: "0 40px 80px rgba(14,17,23,0.25)" }}>
                    <Image src={heroImage || "/images/templates/template-img-11.jpg"} alt="Hero" fill style={{ objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(14,17,23,0.5) 0%, transparent 50%)" }} />
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6, ease: EASE }}
                  style={{ position: "absolute", bottom: 36, left: -8, background: "#F5F0E8", borderRadius: 4, padding: "16px 20px", border: "1px solid rgba(27,67,50,0.15)", boxShadow: "0 16px 32px rgba(14,17,23,0.1)" }}>
                  <div style={{ fontSize: 9, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.2em", color: "#B87333", fontWeight: 700, marginBottom: 4 }}>RECOGNITION</div>
                  <div className="t10-serif" style={{ fontSize: 15, fontWeight: 700, color: "#0E1117" }}>Awwwards Site of Year</div>
                  <div style={{ fontSize: 11, color: "#8FAF9A", marginTop: 2 }}>3 consecutive years</div>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }}
                  style={{ position: "absolute", top: -16, right: 8 }}>
                  <RotatingRing />
                </motion.div>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
              style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, zIndex: 3 }}>
              <span style={{ fontSize: 9, fontFamily: "'DM Sans', sans-serif", color: "rgba(14,17,23,0.3)", letterSpacing: "0.25em", textTransform: "uppercase" }}>Scroll</span>
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
                <svg width="13" height="19" viewBox="0 0 14 20" fill="none"><rect x="1" y="1" width="12" height="18" rx="6" stroke="rgba(27,67,50,0.3)" strokeWidth="1.5" /><circle cx="7" cy="7" r="2" fill="rgba(184,115,51,0.7)" /></svg>
              </motion.div>
            </motion.div>
          </section>

          {/* ══════════ MARQUEE ══════════ */}
          <div style={{ background: "#1B4332", padding: "14px 0", overflow: "hidden" }}>
            <Marquee items={marqueeItems} speed={32} />
          </div>

          {/* ══════════ ABOUT ══════════ */}
          <section id="about" className="t10-section-pad" style={{ padding: "100px 0", background: "#F5F0E8", position: "relative", overflow: "hidden" }}>
            <div className="t10-wrap">
              <div className="t10-about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideRight}>
                  <Badge>Our Story</Badge>
                  <h2 className="t10-serif" style={{ fontSize: aboutUsTitleFontSize ? `${aboutUsTitleFontSize}px` : "clamp(26px,3.8vw,50px)", fontWeight: 700, color: "#0E1117", letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 24, marginTop: 10 }}>
                    {aboutUsTitle || (<>Craft over speed.<br /><em style={{ color: "#1B4332" }}>Depth over decoration.</em></>)}
                  </h2>
                  <p style={{ fontSize: aboutUsContentFontSize || 15, color: "#7a7a6a", lineHeight: 1.85, marginBottom: 28 }}>
                    {aboutUsContent || "Verdant was founded on a single conviction: that the most powerful thing a business can invest in is how it is perceived. Over thirteen years, we've built identities, digital experiences, and creative systems for founders who share that belief."}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
                    {["No templates — every system built from first principles", "Work reviewed daily by founding creative directors", "We take on 6 new clients per quarter, maximum"].map((pt, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                        <div style={{ width: 20, height: 20, borderRadius: 3, background: "#1B4332", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                        </div>
                        <span style={{ fontSize: 13, color: "#5a5a4a", lineHeight: 1.65 }}>{pt}</span>
                      </div>
                    ))}
                  </div>
                  <a href="#contact" className="t10-btn">Work With Us →</a>
                </motion.div>

                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideLeft} style={{ position: "relative" }}>
                  <div style={{ borderRadius: 6, overflow: "hidden", aspectRatio: "4/5", position: "relative", border: "1px solid rgba(27,67,50,0.1)" }}>
                    <Image src={aboutUsImage || "/images/templates/template-img-20.jpg"} alt="About" fill style={{ objectFit: "cover" }} />
                  </div>
                  <div style={{ position: "absolute", bottom: -24, right: -20, background: "#EDE8DC", border: "1px solid rgba(212,175,55,0.3)", borderRadius: 4, padding: "20px 24px", boxShadow: "0 12px 32px rgba(14,17,23,0.08)" }}>
                    {[{ val: 13, suf: "", label: "Years of craft" }, { val: 47, suf: "", label: "Industry awards" }].map((s, i) => (
                      <div key={i} style={{ marginBottom: i === 0 ? 14 : 0 }}>
                        <div className="t10-serif" style={{ fontSize: 34, fontWeight: 700, color: "#1B4332", letterSpacing: "-0.04em", lineHeight: 1 }}><CountUp end={s.val} suffix={s.suf} /></div>
                        <div style={{ fontSize: 10, color: "#B87333", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 3 }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ══════════ SERVICES ══════════ */}
          <section id="services" className="t10-section-pad" style={{ padding: "100px 0", background: "#EDE8DC", position: "relative", overflow: "hidden" }}>
            <div className="t10-wrap">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 20 }}>
                <div>
                  <Badge>What We Do</Badge>
                  <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} className="t10-serif"
                    style={{ fontSize: "clamp(26px,4vw,54px)", fontWeight: 700, color: "#0E1117", letterSpacing: "-0.03em", marginTop: 10, lineHeight: 1.05 }}>
                    Where we<br /><em style={{ color: "#1B4332" }}>come in.</em>
                  </motion.h2>
                </div>
                <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideLeft}
                  style={{ maxWidth: 320, fontSize: 14, color: "#7a7a6a", lineHeight: 1.75 }}>
                  Six distinct disciplines, unified by the same obsession: making your business as beautiful on the outside as it is valuable on the inside.
                </motion.p>
              </div>
              <ServiceAccordion services={activeServices} />
            </div>
          </section>

          {/* ══════════ PORTFOLIO ══════════ */}
          <section id="work" className="t10-section-pad" style={{ padding: "100px 0", background: "#F5F0E8" }}>
            <div className="t10-wrap">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 36, flexWrap: "wrap", gap: 16 }}>
                <div>
                  <Badge>Selected Work</Badge>
                  <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} className="t10-serif"
                    style={{ fontSize: "clamp(26px,4vw,52px)", fontWeight: 700, color: "#0E1117", marginTop: 10, letterSpacing: "-0.03em" }}>
                    Projects we're proud of.
                  </motion.h2>
                </div>
                <motion.a href="#contact" className="t10-btn-outline" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideLeft}>
                  Full Portfolio →
                </motion.a>
              </div>
              <PortfolioGrid items={activePortfolio} />
            </div>
          </section>

          {/* ══════════ FEATURES ══════════ */}
          <section id="features" className="t10-section-pad" style={{ padding: "100px 0", background: "#1B4332", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(212,175,55,0.06) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
            <div className="t10-wrap" style={{ position: "relative", zIndex: 1 }}>
              <div className="t10-features-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }}>
                <div className="t10-sticky" style={{ position: "sticky", top: 100 }}>
                  <Badge light>Our Principles</Badge>
                  <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} className="t10-serif"
                    style={{ fontSize: "clamp(26px,3.8vw,48px)", fontWeight: 700, color: "#F5F0E8", letterSpacing: "-0.03em", lineHeight: 1.08, marginBottom: 24, marginTop: 10 }}>
                    What makes<br /><em>Verdant</em><br />different.
                  </motion.h2>
                  <p style={{ fontSize: 14, color: "rgba(143,175,154,0.8)", lineHeight: 1.8, marginBottom: 32 }}>
                    We don't compete on speed or price. We compete on the quality of thinking and the longevity of the work.
                  </p>
                  <a href="#contact" className="t10-btn-copper">Enquire Now →</a>
                </div>
                <div>
                  {activeFeatures.map((f, i) => (
                    <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideLeft} custom={i * 0.14}
                      style={{ padding: "32px 0", borderBottom: i < activeFeatures.length - 1 ? "1px solid rgba(212,175,55,0.1)" : "none" }}>
                      <div style={{ fontSize: 9, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.22em", color: "#B87333", fontWeight: 700, marginBottom: 12, textTransform: "uppercase" }}>{f.tag}</div>
                      <h4 className="t10-serif" style={{ fontSize: 20, fontWeight: 700, color: "#F5F0E8", marginBottom: 12, lineHeight: 1.2 }}>{f.title}</h4>
                      <p style={{ fontSize: 13, color: "rgba(143,175,154,0.7)", lineHeight: 1.8 }}>{f.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ══════════ TEAM ══════════ */}
          <section id="studio" className="t10-section-pad" style={{ padding: "100px 0", background: "#EDE8DC" }}>
            <div className="t10-wrap">
              <div style={{ textAlign: "center", marginBottom: 60 }}>
                <Badge>The Studio</Badge>
                <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} className="t10-serif"
                  style={{ fontSize: "clamp(26px,4vw,54px)", fontWeight: 700, color: "#0E1117", letterSpacing: "-0.03em", marginTop: 10 }}>
                  The people behind the work.
                </motion.h2>
              </div>
              <div className="t10-team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
                {activeTeam.map((m, i) => (
                  <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={popIn} custom={i * 0.1}
                    whileHover={{ y: -5, boxShadow: "0 18px 36px rgba(14,17,23,0.08)" }}
                    style={{ background: "#F5F0E8", border: "1px solid rgba(27,67,50,0.1)", borderRadius: 4, overflow: "hidden", cursor: "pointer", transition: "border-color 0.3s" }}>
                    <div style={{ position: "relative", aspectRatio: "1", background: m.color + "15", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                      {m.image ? (
                        <Image src={m.image} alt={m.name} fill style={{ objectFit: "cover" }} />
                      ) : (
                        <>
                          <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 50% 60%, ${m.color}22, transparent 70%)` }} />
                          <div style={{ width: 64, height: 64, borderRadius: "50%", background: m.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700, color: "#F5F0E8", fontFamily: "'Playfair Display', serif", zIndex: 1 }}>
                            {m.name?.[0]}
                          </div>
                        </>
                      )}
                      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: m.color }} />
                    </div>
                    <div style={{ padding: "18px 20px" }}>
                      <h4 className="t10-serif" style={{ fontSize: 16, fontWeight: 700, color: "#0E1117", marginBottom: 3 }}>{m.name}</h4>
                      <div style={{ fontSize: 10, fontWeight: 700, color: m.color, marginBottom: m.bio ? 10 : 0, letterSpacing: "0.1em", textTransform: "uppercase" }}>{m.role}</div>
                      {m.bio && <p style={{ fontSize: 12, color: "#7a7a6a", lineHeight: 1.6 }}>{m.bio}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════ PROCESS ══════════ */}
          <section id="process" className="t10-section-pad" style={{ padding: "100px 0", background: "#F5F0E8" }}>
            <div className="t10-wrap">
              <div className="t10-process-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "start" }}>
                <div className="t10-sticky" style={{ position: "sticky", top: 100 }}>
                  <Badge>How We Work</Badge>
                  <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} className="t10-serif"
                    style={{ fontSize: "clamp(24px,3.2vw,46px)", fontWeight: 700, color: "#0E1117", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 20, marginTop: 10 }}>
                    A process refined over 13 years.
                  </motion.h2>
                  <p style={{ fontSize: 14, color: "#7a7a6a", lineHeight: 1.8, marginBottom: 32 }}>
                    Every great outcome starts with a rigorous process. Ours is structured enough to be reliable, and flexible enough to handle the real world.
                  </p>
                  <a href="#contact" className="t10-btn">Start the Process</a>
                </div>
                <div>
                  {processSteps.map((step, i) => <ProcessStep key={i} step={step} i={i} total={processSteps.length} />)}
                </div>
              </div>
            </div>
          </section>

          {/* ══════════ TESTIMONIALS ══════════ */}
          <section id="testimonials" className="t10-section-pad" style={{ padding: "100px 0", background: "#0E1117", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 50%, rgba(27,67,50,0.3), transparent 50%)", pointerEvents: "none" }} />
            <div className="t10-wrap" style={{ position: "relative", zIndex: 1 }}>
              <div className="t10-testimonial-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 72, alignItems: "center" }}>
                <div>
                  <Badge light>Client Stories</Badge>
                  <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} className="t10-serif"
                    style={{ fontSize: "clamp(24px,3.5vw,48px)", fontWeight: 700, color: "#F5F0E8", letterSpacing: "-0.03em", lineHeight: 1.1, marginTop: 10, marginBottom: 24 }}>
                    The work speaks. Our clients say it louder.
                  </motion.h2>
                  <p style={{ fontSize: 14, color: "rgba(143,175,154,0.7)", lineHeight: 1.8 }}>
                    We measure success in the long-term equity our clients build — not the deliverables we ship.
                  </p>
                </div>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideLeft}>
                  <TestimonialDeck items={activeTestimonials} />
                </motion.div>
              </div>
            </div>
          </section>

          {/* ══════════ PRICING ══════════ */}
          {activePricing?.length > 0 && (
            <section id="pricing" className="t10-section-pad" style={{ padding: "100px 0", background: "#F5F0E8" }}>
              <div className="t10-wrap">
                <div style={{ textAlign: "center", marginBottom: 48 }}>
                  <Badge>Investment</Badge>
                  <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} className="t10-serif"
                    style={{ fontSize: "clamp(26px,4vw,54px)", fontWeight: 700, color: "#0E1117", letterSpacing: "-0.03em", marginTop: 10 }}>
                    Honest pricing.<br /><em style={{ color: "#1B4332" }}>Exceptional returns.</em>
                  </motion.h2>
                </div>
                <PricingSection plans={activePricing} />
              </div>
            </section>
          )}

          {/* ══════════ FAQ ══════════ */}
          {activeFaq?.length > 0 && (
            <section id="faq" className="t10-section-pad" style={{ padding: "100px 0", background: "#EDE8DC" }}>
              <div className="t10-wrap">
                <div className="t10-faq-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80, alignItems: "start" }}>
                  <div className="t10-sticky" style={{ position: "sticky", top: 100 }}>
                    <Badge>FAQ</Badge>
                    <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} className="t10-serif"
                      style={{ fontSize: "clamp(22px,3vw,44px)", fontWeight: 700, color: "#0E1117", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 16, marginTop: 10 }}>
                      Common questions, honest answers.
                    </motion.h2>
                    <p style={{ fontSize: 13, color: "#7a7a6a", lineHeight: 1.75, marginBottom: 24 }}>Have one we haven't covered? Write to us — we respond within two hours.</p>
                    <a href="#contact" className="t10-btn">Ask a Question →</a>
                  </div>
                  <div>
                    {activeFaq.map((item, i) => <FAQItem key={i} q={item.question} a={item.answer} idx={i} />)}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ══════════ BLOG ══════════ */}
          {activeBlog?.length > 0 && (
            <section id="blog" className="t10-section-pad" style={{ padding: "100px 0", background: "#F5F0E8" }}>
              <div className="t10-wrap">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 52, flexWrap: "wrap", gap: 16 }}>
                  <div>
                    <Badge>From the Studio</Badge>
                    <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} className="t10-serif"
                      style={{ fontSize: "clamp(24px,3.8vw,50px)", fontWeight: 700, color: "#0E1117", letterSpacing: "-0.03em", marginTop: 10 }}>
                      Thinking out loud.
                    </motion.h2>
                  </div>
                  <a href="#" className="t10-btn-outline">All Articles →</a>
                </div>
                <div className="t10-blog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 36 }}>
                  {activeBlog.slice(0, 3).map((post, i) => <BlogCard key={i} post={post} i={i} />)}
                </div>
              </div>
            </section>
          )}

          {/* ══════════ CTA ══════════ */}
          <section id="contact" style={{ padding: "60px 20px 100px", background: "#EDE8DC" }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: EASE }}
              style={{ maxWidth: 1200, margin: "0 auto", background: "#1B4332", borderRadius: 6, position: "relative", overflow: "hidden", textAlign: "center", border: "1px solid rgba(212,175,55,0.2)" }}>
              <div className="t10-cta-inner" style={{ padding: "88px 56px" }}>
                <NoiseOverlay />
                <div style={{ position: "absolute", top: 0, right: 0, width: "32%", height: "100%", background: "#2D6A4F", clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)", opacity: 0.55 }} />
                <div style={{ position: "relative", zIndex: 2 }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: "0.25em", color: "#B87333", fontWeight: 700, textTransform: "uppercase" }}>◆ Ready to Begin</span>
                  <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="t10-serif"
                    style={{ fontSize: "clamp(28px,5vw,68px)", fontWeight: 700, color: "#F5F0E8", margin: "20px auto 20px", maxWidth: 780, lineHeight: 0.97, letterSpacing: "-0.04em" }}>
                    {ctaTitle || (<>Let's build something<br /><em style={{ color: "#D4AF37" }}>worth keeping.</em></>)}
                  </motion.h2>
                  <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                    style={{ fontSize: 15, color: "rgba(143,175,154,0.8)", maxWidth: 420, margin: "0 auto 44px", lineHeight: 1.75 }}>
                    {ctaDesc || "We take on a limited number of new engagements each quarter. If you'd like to be considered, let's talk."}
                  </motion.p>
                  <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                    style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                    <MagBtn href={ctaButtonLink || "#"} className="t10-btn-copper" style={{ fontSize: 14, padding: "16px 40px" }}>
                      {ctaButtonText || "Begin Your Project"}
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </MagBtn>
                    {contactEmail && (
                      <a href={`mailto:${contactEmail}`} className="t10-btn-outline" style={{ color: "#8FAF9A", borderColor: "rgba(143,175,154,0.3)" }}>{contactEmail}</a>
                    )}
                  </motion.div>
                  <div style={{ display: "flex", gap: 28, justifyContent: "center", marginTop: 44, flexWrap: "wrap" }}>
                    {["6 clients max per quarter", "2-hour response time", "First call, always free"].map((b, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 11, color: "rgba(143,175,154,0.5)", fontFamily: "'DM Sans', sans-serif" }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                        {b}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        </main>

        {/* ══════════ FOOTER ══════════ */}
        <footer style={{ background: "#0E1117", padding: "72px 0 32px", borderTop: "1px solid rgba(27,67,50,0.3)" }}>
          <div className="t10-wrap">
            <div className="t10-footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 56 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 3, background: "#1B4332", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                      <path d="M7 1L13 4V10L7 13L1 10V4L7 1Z" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
                      <circle cx="7" cy="7" r="2" fill="#D4AF37" />
                    </svg>
                  </div>
                  <span className="t10-serif" style={{ fontSize: 18, fontWeight: 700, color: "#F5F0E8" }}>{displayName}</span>
                </div>
                <p style={{ fontSize: 13, color: "rgba(143,175,154,0.55)", lineHeight: 1.75, maxWidth: 240, marginBottom: 24 }}>
                  {footerDescription || "A boutique creative studio for businesses that believe in the lasting power of beautiful, considered work."}
                </p>
                <div style={{ display: "flex", gap: 8 }}>
                  {[facebookUrl, twitterUrl, linkedinUrl].filter(Boolean).map((url, i) => (
                    <a key={i} href={url} style={{ width: 32, height: 32, borderRadius: 3, background: "rgba(27,67,50,0.25)", border: "1px solid rgba(27,67,50,0.4)", display: "flex", alignItems: "center", justifyContent: "center", color: "#8FAF9A", fontSize: 9, fontFamily: "'DM Sans', sans-serif", textDecoration: "none", transition: "all 0.3s", fontWeight: 700 }}
                      onMouseOver={e => { e.currentTarget.style.background = "#1B4332"; e.currentTarget.style.color = "#D4AF37"; }}
                      onMouseOut={e => { e.currentTarget.style.background = "rgba(27,67,50,0.25)"; e.currentTarget.style.color = "#8FAF9A"; }}>
                      {["FB", "TW", "LI"][i]}
                    </a>
                  ))}
                </div>
              </div>
              {[
                { label: "Studio", links: ["About", "Services", "Process", "Careers"] },
                { label: "Work", links: ["Portfolio", "Case Studies", "Blog", "Awards"] },
                { label: "Contact", links: [contactEmail, displayPhone, address].filter(Boolean) },
              ].map((col, i) => (
                <div key={i}>
                  <div style={{ fontSize: 9, fontFamily: "'DM Sans', sans-serif", color: "#B87333", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, marginBottom: 18 }}>{col.label}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {col.links.map((lk, j) => (
                      <a key={j} href={`#${lk?.toLowerCase?.()}`} style={{ fontSize: 13, color: "rgba(143,175,154,0.45)", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", transition: "color 0.25s" }}
                        onMouseOver={e => e.target.style.color = "#F5F0E8"}
                        onMouseOut={e => e.target.style.color = "rgba(143,175,154,0.45)"}>
                        {lk}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ borderTop: "1px solid rgba(27,67,50,0.2)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
              <div style={{ fontSize: 11, color: "rgba(143,175,154,0.28)", fontFamily: "'DM Sans', sans-serif" }}>
                {footerCopyright || `© ${new Date().getFullYear()} ${displayName}. All rights reserved.`}
              </div>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                {["Privacy Policy", "Terms of Use", "Cookie Policy"].map(lk => (
                  <a key={lk} href="#" style={{ fontSize: 10, color: "rgba(143,175,154,0.28)", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", transition: "color 0.25s" }}
                    onMouseOver={e => e.target.style.color = "#8FAF9A"} onMouseOut={e => e.target.style.color = "rgba(143,175,234,0.28)"}>
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