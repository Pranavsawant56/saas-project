import TemplateLayout from "./TemplateLayout";
import {
  motion, useInView, AnimatePresence, useScroll, useTransform,
  useMotionValue, useSpring, useAnimation,
} from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState, useCallback } from "react";

// ─── Easing ───────────────────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1];
const EASE_BACK = [0.175, 0.885, 0.32, 1.275];

// ─── Variants ─────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 50, filter: "blur(8px)" },
  visible: (i = 0) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.85, ease: EASE, delay: i * 0.1 },
  }),
};
const fadeLeft = {
  hidden: { opacity: 0, x: -60, filter: "blur(6px)" },
  visible: (i = 0) => ({
    opacity: 1, x: 0, filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE, delay: i * 0.1 },
  }),
};
const fadeRight = {
  hidden: { opacity: 0, x: 60, filter: "blur(6px)" },
  visible: (i = 0) => ({
    opacity: 1, x: 0, filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE, delay: i * 0.1 },
  }),
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.65, ease: EASE_BACK, delay: i * 0.08 },
  }),
};

// ─── Cursor Spotlight ─────────────────────────────────────────────────────────
const CursorSpotlight = () => {
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <motion.div
      style={{
        position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 0,
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,107,53,0.06) 0%, transparent 70%)",
        x, y, translateX: "-50%", translateY: "-50%",
      }}
    />
  );
};

// ─── Magnetic Button ──────────────────────────────────────────────────────────
const MagBtn = ({ children, className, style, href, onClick }) => {
  const ref = useRef(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 22 });
  const sy = useSpring(y, { stiffness: 250, damping: 22 });
  const Tag = href ? "a" : "button";
  return (
    <motion.div ref={ref}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.3);
        y.set((e.clientY - r.top - r.height / 2) * 0.3);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ display: "inline-block" }}>
      <motion.div style={{ x: sx, y: sy }}>
        <Tag href={href} onClick={onClick} className={className} style={style}>{children}</Tag>
      </motion.div>
    </motion.div>
  );
};

// ─── Ticker ───────────────────────────────────────────────────────────────────
const Ticker = ({ items, reverse = false }) => {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden" }}>
      <motion.div
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 20,
            padding: "0 40px", whiteSpace: "nowrap",
            fontSize: 13, fontWeight: 600, letterSpacing: "0.08em",
            color: "rgba(255,255,255,0.35)",
            fontFamily: "'Syne', sans-serif",
            borderRight: "1px solid rgba(255,107,53,0.1)",
            textTransform: "uppercase",
          }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#FF6B35", flexShrink: 0, boxShadow: "0 0 8px #FF6B35" }} />
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// ─── 3D Portfolio Carousel ────────────────────────────────────────────────────
const PortfolioCarousel = ({ items }) => {
  const [active, setActive] = useState(0);
  const total = items.length;
  const prev = () => setActive((p) => (p - 1 + total) % total);
  const next = () => setActive((p) => (p + 1) % total);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 700);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const getStyle = (i) => {
    const diff = ((i - active) % total + total) % total;
    const offset = diff > total / 2 ? diff - total : diff;
    const absOff = Math.abs(offset);
    if (isMobile && absOff > 0) return null;
    if (!isMobile && absOff > 2) return null;
    const cardW = isMobile ? 300 : 320;
    const x = offset * (isMobile ? 0 : 340);
    const z = -absOff * 120;
    const scale = isMobile ? 1 : 1 - absOff * 0.15;
    const opacity = isMobile ? 1 : 1 - absOff * 0.35;
    const rotateY = isMobile ? 0 : offset * 18;
    return { x, z, scale, opacity, rotateY, zIndex: 10 - absOff, cardW };
  };

  return (
    <div style={{ position: "relative" }}>
      <div style={{ perspective: 1200, perspectiveOrigin: "50% 40%", height: isMobile ? 420 : 480, position: "relative", marginBottom: 48 }}>
        {items.map((item, i) => {
          const s = getStyle(i);
          if (!s) return null;
          return (
            <motion.div
              key={i}
              animate={{ x: s.x, z: s.z, scale: s.scale, opacity: s.opacity, rotateY: s.rotateY }}
              transition={{ duration: 0.7, ease: EASE }}
              onClick={() => setActive(i)}
              style={{
                position: "absolute", left: "50%", top: 0,
                translateX: "-50%",
                width: s.cardW, height: isMobile ? 400 : 440,
                borderRadius: 28,
                overflow: "hidden",
                cursor: "pointer",
                zIndex: s.zIndex,
                transformStyle: "preserve-3d",
                border: i === active ? "1.5px solid rgba(255,107,53,0.5)" : "1px solid rgba(255,255,255,0.07)",
                boxShadow: i === active ? "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,107,53,0.2)" : "0 20px 40px rgba(0,0,0,0.4)",
              }}
            >
              <div style={{ position: "relative", width: "100%", height: "70%" }}>
                {item.image && (
                  <Image src={item.image} alt={item.title} fill style={{ objectFit: "cover" }} />
                )}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, #111427 100%)" }} />
                <div style={{ position: "absolute", top: 16, left: 16 }}>
                  <span style={{
                    padding: "4px 12px", borderRadius: 100,
                    background: "rgba(255,107,53,0.2)", border: "1px solid rgba(255,107,53,0.4)",
                    fontSize: 10, fontWeight: 700, color: "#FF6B35",
                    fontFamily: "'Space Mono', monospace", letterSpacing: "0.12em",
                  }}>{item.tag || "PROJECT"}</span>
                </div>
              </div>
              <div style={{ padding: "20px 24px", background: "#111427", height: "30%" }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 6, fontFamily: "'Syne', sans-serif" }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
        <button onClick={prev} style={{
          width: 48, height: 48, borderRadius: "50%",
          background: "rgba(255,107,53,0.1)", border: "1px solid rgba(255,107,53,0.3)",
          color: "#FF6B35", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.3s",
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
        </button>
        <div style={{ display: "flex", gap: 8 }}>
          {items.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              width: i === active ? 28 : 8, height: 8, borderRadius: 100,
              background: i === active ? "#FF6B35" : "rgba(255,255,255,0.15)",
              border: "none", cursor: "pointer", transition: "all 0.4s",
            }} />
          ))}
        </div>
        <button onClick={next} style={{
          width: 48, height: 48, borderRadius: "50%",
          background: "rgba(255,107,53,0.1)", border: "1px solid rgba(255,107,53,0.3)",
          color: "#FF6B35", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.3s",
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
};

// ─── Testimonial Slider ───────────────────────────────────────────────────────
const TestimonialSlider = ({ items }) => {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (idx) => {
    setDir(idx > current ? 1 : -1);
    setCurrent(idx);
  };
  const prev = () => go((current - 1 + items.length) % items.length);
  const next = () => go((current + 1) % items.length);

  useEffect(() => {
    const t = setInterval(() => {
      setDir(1);
      setCurrent(c => (c + 1) % items.length);
    }, 5000);
    return () => clearInterval(t);
  }, [items.length]);

  const variants = {
    enter: (d) => ({ x: d * 80, opacity: 0, filter: "blur(6px)" }),
    center: { x: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE } },
    exit: (d) => ({ x: d * -80, opacity: 0, filter: "blur(6px)", transition: { duration: 0.4 } }),
  };

  const t = items[current];
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 32 }}>
        {[...Array(5)].map((_, i) => (
          <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#FF6B35"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
        ))}
      </div>

      <div style={{ position: "relative", minHeight: 160, overflow: "hidden" }}>
        <AnimatePresence custom={dir} mode="wait">
          <motion.div key={current} custom={dir} variants={variants} initial="enter" animate="center" exit="exit">
            <blockquote style={{
              fontSize: "clamp(16px, 2.5vw, 26px)", fontWeight: 500, fontFamily: "'Syne', sans-serif",
              color: "#fff", lineHeight: 1.6, marginBottom: 40,
              fontStyle: "italic",
            }}>
              "{t.review}"
            </blockquote>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(135deg, #FF6B35, #FFB547)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 20, color: "#07080F", fontFamily: "'Syne', sans-serif" }}>
                {t.name?.[0]}
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", fontFamily: "'Syne', sans-serif" }}>{t.name}</div>
                <div style={{ fontSize: 13, color: "#FF6B35", fontFamily: "'Space Mono', monospace" }}>{t.role}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 32 }}>
        {items.map((_, i) => (
          <button key={i} onClick={() => go(i)} style={{
            width: i === current ? 32 : 8, height: 8, borderRadius: 100,
            background: i === current ? "#FF6B35" : "rgba(255,255,255,0.2)",
            border: "none", cursor: "pointer", transition: "all 0.4s",
          }} />
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 24 }}>
        {[{ fn: prev, icon: "M19 12H5M12 5l-7 7 7 7" }, { fn: next, icon: "M5 12h14M12 5l7 7-7 7" }].map((btn, i) => (
          <button key={i} onClick={btn.fn} style={{
            width: 44, height: 44, borderRadius: "50%",
            background: "rgba(255,107,53,0.08)", border: "1px solid rgba(255,107,53,0.25)",
            color: "#FF6B35", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.3s",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={btn.icon} /></svg>
          </button>
        ))}
      </div>
    </div>
  );
};

// ─── Pricing Toggle ───────────────────────────────────────────────────────────
const PricingToggle = ({ plans }) => {
  const [annual, setAnnual] = useState(false);
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 64 }}>
        <span style={{ fontSize: 15, color: !annual ? "#fff" : "rgba(255,255,255,0.4)", fontWeight: 600, fontFamily: "'Syne', sans-serif" }}>Monthly</span>
        <button onClick={() => setAnnual(!annual)} style={{
          width: 56, height: 30, borderRadius: 100, cursor: "pointer",
          background: annual ? "#FF6B35" : "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,107,53,0.3)",
          position: "relative", transition: "background 0.4s",
        }}>
          <motion.div animate={{ x: annual ? 27 : 3 }} transition={{ type: "spring", stiffness: 400, damping: 30 }}
            style={{ position: "absolute", top: 3, width: 22, height: 22, borderRadius: "50%", background: "#fff" }} />
        </button>
        <span style={{ fontSize: 15, color: annual ? "#fff" : "rgba(255,255,255,0.4)", fontWeight: 600, fontFamily: "'Syne', sans-serif" }}>
          Annual <span style={{ fontSize: 12, color: "#FFB547", fontFamily: "'Space Mono', monospace" }}>-20%</span>
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center" }}>
        {plans.map((p, i) => {
          const featured = p.highlight || i === 1;
          const rawPrice = p.price?.replace(/[^0-9]/g, "");
          const displayPrice = rawPrice && annual
            ? `$${Math.round(+rawPrice * 0.8).toLocaleString()}`
            : p.price;

          return (
            <motion.div key={i}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={scaleIn} custom={i * 0.2}
              whileHover={{ y: -8 }}
              style={{
                flex: "1 1 280px", maxWidth: 380,
                background: featured
                  ? "linear-gradient(145deg, #1a1030, #1c1535)"
                  : "#0D0F1E",
                border: featured ? "1.5px solid rgba(255,107,53,0.5)" : "1px solid rgba(255,255,255,0.07)",
                borderRadius: 28, padding: "44px 32px",
                position: "relative", overflow: "hidden",
                boxShadow: featured ? "0 0 80px rgba(255,107,53,0.12)" : "none",
              }}
            >
              {featured && (
                <div style={{ position: "absolute", top: 0, right: 0, background: "linear-gradient(135deg, #FF6B35, #FFB547)", color: "#07080F", fontSize: 10, fontWeight: 800, padding: "8px 20px", borderBottomLeftRadius: 18, fontFamily: "'Space Mono', monospace", letterSpacing: "0.12em" }}>
                  MOST POPULAR
                </div>
              )}
              <div style={{ position: "absolute", top: -40, right: -40, width: 150, height: 150, borderRadius: "50%", background: featured ? "rgba(255,107,53,0.08)" : "transparent", filter: "blur(30px)" }} />

              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ fontSize: 12, fontFamily: "'Space Mono', monospace", letterSpacing: "0.18em", color: featured ? "#FF6B35" : "rgba(255,255,255,0.35)", marginBottom: 12, textTransform: "uppercase" }}>
                  {p.planName}
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
                  <AnimatePresence mode="wait">
                    <motion.span key={annual ? "a" : "m"} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                      style={{ fontSize: 52, fontWeight: 800, color: "#fff", fontFamily: "'Syne', sans-serif", letterSpacing: "-0.04em", lineHeight: 1 }}>
                      {displayPrice}
                    </motion.span>
                  </AnimatePresence>
                  <span style={{ fontSize: 14, color: "rgba(255,255,255,0.3)" }}>{p.period}</span>
                </div>
                {annual && rawPrice && (
                  <div style={{ fontSize: 12, color: "#FFB547", fontFamily: "'Space Mono', monospace", marginBottom: 24 }}>
                    Save ${Math.round(+rawPrice * 0.2 * 12).toLocaleString()} / year
                  </div>
                )}
                <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "28px 0" }} />
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px", display: "flex", flexDirection: "column", gap: 14 }}>
                  {(p.features?.split(",") || []).map((feat, j) => (
                    <li key={j} style={{ display: "flex", gap: 12, fontSize: 14, color: "rgba(255,255,255,0.65)", alignItems: "flex-start" }}>
                      <div style={{ width: 18, height: 18, borderRadius: 5, background: "rgba(255,107,53,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                      </div>
                      {feat.trim()}
                    </li>
                  ))}
                </ul>
                <button style={{
                  width: "100%", padding: "16px", borderRadius: 100,
                  background: featured ? "linear-gradient(135deg, #FF6B35, #FFB547)" : "transparent",
                  border: featured ? "none" : "1.5px solid rgba(255,107,53,0.4)",
                  color: featured ? "#07080F" : "#FF6B35",
                  fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700,
                  cursor: "pointer", transition: "all 0.3s",
                }}>
                  {p.price === "Custom" ? "Let's Talk" : "Get Started →"}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// ─── Progress Ring ────────────────────────────────────────────────────────────
const ProgressRing = ({ value, label, color = "#FF6B35", size = 120 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [progress, setProgress] = useState(0);
  const r = (size - 14) / 2;
  const circ = 2 * Math.PI * r;

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = value / (1.5 * 60);
    const t = setInterval(() => {
      start += step;
      if (start >= value) { setProgress(value); clearInterval(t); }
      else setProgress(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(t);
  }, [inView, value]);

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth="7" strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={inView ? { strokeDashoffset: circ - (progress / 100) * circ } : {}}
          transition={{ duration: 1.5, ease: EASE }}
        />
      </svg>
      <div style={{ marginTop: -size / 2 - 10, fontSize: 24, fontWeight: 800, color: "#fff", fontFamily: "'Syne', sans-serif", zIndex: 1 }}>
        {progress}%
      </div>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "'Space Mono', monospace", letterSpacing: "0.1em", textAlign: "center" }}>{label}</div>
    </div>
  );
};

// ─── CountUp ─────────────────────────────────────────────────────────────────
const CountUp = ({ end, suffix = "", prefix = "", duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration * 60);
    const t = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(t); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(t);
  }, [inView, end, duration]);
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

// ─── FAQ Accordion ────────────────────────────────────────────────────────────
const FAQItem = ({ q, a, idx }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp} custom={idx * 0.2}
      style={{ borderBottom: "1px solid rgba(255,107,53,0.1)", overflow: "hidden" }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "22px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 16,
      }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(14px, 2vw, 17px)", fontWeight: 700, color: "#fff" }}>{q}</span>
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }}
          style={{
            width: 32, height: 32, borderRadius: 10, flexShrink: 0,
            background: open ? "linear-gradient(135deg, #FF6B35, #FFB547)" : "rgba(255,107,53,0.1)",
            border: "1px solid rgba(255,107,53,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: open ? "#07080F" : "#FF6B35", fontSize: 22, lineHeight: 1, fontWeight: 300,
          }}>+</motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}>
            <p style={{ paddingBottom: 22, fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, margin: 0 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Section Label ────────────────────────────────────────────────────────────
const Label = ({ children }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 14,
    padding: "6px 16px", borderRadius: 100,
    background: "rgba(255,107,53,0.08)", border: "1px solid rgba(255,107,53,0.25)",
    fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700,
    color: "#FF6B35", letterSpacing: "0.2em", textTransform: "uppercase",
  }}>
    <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#FF6B35", boxShadow: "0 0 6px #FF6B35" }} />
    {children}
  </span>
);

// ─── Blog Card ────────────────────────────────────────────────────────────────
const BlogCard = ({ post, i }) => (
  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.15}
    whileHover={{ y: -8 }}
    style={{
      background: "#0D0F1E", border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 20, overflow: "hidden", cursor: "pointer", transition: "border-color 0.3s",
    }}
    onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,107,53,0.3)"}
    onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}
  >
    {post.image && (
      <div style={{ position: "relative", aspectRatio: "16/9" }}>
        <Image src={post.image} alt={post.title} fill style={{ objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, #0D0F1E)" }} />
      </div>
    )}
    <div style={{ padding: "24px 28px" }}>
      {post.category && (
        <span style={{ fontSize: 10, fontFamily: "'Space Mono', monospace", color: "#FF6B35", letterSpacing: "0.15em", fontWeight: 700 }}>
          {post.category}
        </span>
      )}
      <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: "10px 0 10px", fontFamily: "'Syne', sans-serif", lineHeight: 1.3 }}>{post.title}</h3>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.65, marginBottom: 20 }}>{post.excerpt || post.desc}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#FF6B35", fontWeight: 600, fontFamily: "'Space Mono', monospace" }}>
        Read more <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
      </div>
    </div>
  </motion.div>
);

// ─── Process Timeline ─────────────────────────────────────────────────────────
const ProcessStep = ({ step, i, total }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const isLast = i === total - 1;
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeLeft} custom={i * 0.2}
      style={{ display: "flex", gap: 28, position: "relative" }}>
      {!isLast && (
        <div style={{ position: "absolute", left: 24, top: 52, width: 1, bottom: -40, background: "linear-gradient(to bottom, rgba(255,107,53,0.4), transparent)" }} />
      )}
      <div style={{ flexShrink: 0, width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg, #FF6B35, #FFB547)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Mono', monospace", fontSize: 14, fontWeight: 700, color: "#07080F", boxShadow: "0 0 24px rgba(255,107,53,0.3)", zIndex: 1 }}>
        {String(i + 1).padStart(2, "0")}
      </div>
      <div style={{ paddingBottom: 48 }}>
        <h4 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 8, fontFamily: "'Syne', sans-serif" }}>{step.title}</h4>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>{step.desc}</p>
      </div>
    </motion.div>
  );
};

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function BusinessTemplate9({ data }) {
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
  useEffect(() => setMounted(true), []);

  const displayName = companyName || "Nexus Studio";
  const displayPhone = phone ? `${countryCode?.split(" ")[0] || ""} ${phone}` : "";

  // ── Defaults ──
  const activeServices = services?.some(s => s.name || s.desc) ? services : [
    { name: "Product Strategy", desc: "We decode your market, define your edge, and build the roadmap that gets you there — faster than you thought possible.", icon: "◎" },
    { name: "UI/UX Design", desc: "Interfaces that feel inevitable. We obsess over every pixel, every transition, every moment of delight.", icon: "◈" },
    { name: "Web Development", desc: "Blazing-fast, accessible, scalable codebases built with the latest stack — shipped on time, every time.", icon: "⬡" },
    { name: "Brand Identity", desc: "Identities that command attention and communicate everything your audience needs to feel before they read a word.", icon: "◉" },
    { name: "Growth Marketing", desc: "Full-funnel performance systems backed by first-party data, creative testing, and ruthless iteration.", icon: "◳" },
    { name: "AI Integration", desc: "We embed intelligent automation into your workflows, products, and customer experiences — compounding your advantage.", icon: "◐" },
  ];

  const activeFeatures = features?.some(f => f.title) ? features : [
    { title: "Velocity by default", desc: "Our sprint system keeps you moving. Every two weeks: decisions made, designs shipped, code deployed.", tag: "PROCESS" },
    { title: "Async-first collaboration", desc: "No unnecessary meetings. Structured updates, shared Notion workspaces, and real-time Slack access to your team.", tag: "CULTURE" },
    { title: "Outcome-driven pricing", desc: "Our interests align with yours. We tie bonuses to your KPIs — because your growth is the only metric we care about.", tag: "ALIGNMENT" },
  ];

  const activeTeam = team?.some(t => t.name) ? team : [
    { name: "Aria Chen", role: "Creative Director", bio: "Ex-IDEO. Shaped products for Apple, Nike, and 40+ startups.", color: "#FF6B35" },
    { name: "Marcus Reid", role: "Lead Engineer", bio: "Former Google Staff SWE. Obsessed with performance at scale.", color: "#5B8BFF" },
    { name: "Sana Patel", role: "Strategy Director", bio: "Ex-McKinsey. Turns fuzzy goals into sharp, executable plans.", color: "#FFB547" },
    { name: "Jay Oluwole", role: "Head of Growth", bio: "Scaled 5 brands from zero to eight-figure revenue.", color: "#C084FC" },
  ];

  const activeTestimonials = testimonials?.some(t => t.review) ? testimonials : [
    { name: "Sofia Reyes", role: "CEO, Lunar Health", review: "Nexus completely transformed how our product feels. Our activation rate went up 42% in the first month post-launch. They don't just execute — they think." },
    { name: "Tobias Müller", role: "CTO, DataStack", review: "I've worked with a lot of agencies. Nexus is the only one that shipped exactly what they promised, when they promised it. No drama. Just results." },
    { name: "Priya Nair", role: "CMO, Bloom Commerce", review: "Our rebrand and new site doubled conversion within 6 weeks. The ROI on this engagement is unlike anything I've seen from a creative partner." },
    { name: "Chris Obi", role: "Founder, Forma", review: "The team feels like true partners — deeply invested in our success, not just our budget. We renewed immediately at the end of month one." },
    { name: "Léa Fontaine", role: "VP Product, Arcana", review: "Pixel-perfect, on-brand, and ahead of schedule. Nexus set a new standard for what I expect from any creative vendor going forward." },
  ];

  const activePricing = pricing?.some(p => p.planName) ? pricing : [
    { planName: "Launch", price: "$5,500", period: "/ project", features: "1 deliverable track, 2-week sprint, Senior designer + dev, 2 revision rounds, Figma handoff", highlight: false },
    { planName: "Scale", price: "$10,500", period: "/ month", features: "3 active tracks, Team of 5, Bi-weekly sprints, Unlimited revisions, Slack access, Analytics dashboard, Priority support", highlight: true },
    { planName: "Enterprise", price: "Custom", period: "", features: "Unlimited scope, Dedicated embedded team, Quarterly OKRs, SLA guarantees, Executive reporting, White-glove onboarding", highlight: false },
  ];

  const activeFaq = faq?.some(f => f.question) ? faq : [
    { question: "What's your onboarding process like?", answer: "We run a focused discovery sprint in week one — aligning on goals, KPIs, tooling, and communication rhythms. Most clients are fully operational within 72 hours of signing." },
    { question: "How quickly can we start?", answer: "We typically onboard new clients within 1–2 weeks. Our intake process is designed to be lightweight but thorough, so we hit the ground running without ramp-up friction." },
    { question: "Do you work with early-stage startups?", answer: "Absolutely. Our Launch package is built for pre-seed to Series A companies who need strong brand and product foundations without enterprise overheads." },
    { question: "How are revisions handled?", answer: "Scale and Enterprise clients receive unlimited revisions on active tracks. Launch clients get two structured rounds — our process is optimised to make them count." },
    { question: "Who will actually be working on our project?", answer: "You'll always work with senior practitioners — no bait-and-switch with junior staff. Your day-to-day team includes the people you meet during the sales process." },
    { question: "Who owns the deliverables?", answer: "You do. All IP, source files, and deliverables transfer to you on final payment. No hidden licensing. Our contracts are straightforward and founder-friendly." },
  ];

  const activePortfolio = portfolio?.some(p => p.title) ? portfolio : [
    { title: "Lunar Health Platform", desc: "Complete rebrand + product redesign for a digital health app. 42% activation lift.", tag: "Product", image: "/images/templates/template-img-11.jpg" },
    { title: "DataStack Dashboard", desc: "Complex data viz redesign reducing churn by 38% in 90 days.", tag: "SaaS", image: "/images/templates/template-img-12.jpg" },
    { title: "Bloom Commerce", desc: "End-to-end brand + ecom build. 2× conversion in 6 weeks.", tag: "eCommerce", image: "/images/templates/template-img-13.jpg" },
    { title: "Forma Mobile App", desc: "0→1 fintech product design. Raised $4M Series A post-launch.", tag: "FinTech", image: "/images/templates/template-img-20.jpg" },
    { title: "Arcana SaaS", desc: "Enterprise dashboard and design system for 50k+ user B2B platform.", tag: "Enterprise", image: "/images/templates/template-img-11.jpg" },
  ];

  const activeBlog = blog?.some(b => b.title) ? blog : [
    { title: "Why 90% of redesigns fail (and how to avoid it)", excerpt: "The most common cause of redesign failure isn't bad design — it's misaligned success metrics from day one.", category: "STRATEGY", image: "/images/templates/template-img-12.jpg" },
    { title: "The quiet superpower of design systems", excerpt: "A well-built design system doesn't just speed up development — it enforces brand coherence at scale.", category: "DESIGN", image: "/images/templates/template-img-13.jpg" },
    { title: "How we cut our clients' time-to-launch by 60%", excerpt: "Our sprint model was born from frustration. Here's the process we built — and why it works.", category: "PROCESS", image: "/images/templates/template-img-20.jpg" },
  ];

  const processSteps = [
    { title: "Discovery & Alignment", desc: "We map your goals, users, and constraints in a focused one-week sprint before writing a single line of code or touching a single frame." },
    { title: "Strategy & Architecture", desc: "Your dedicated team produces a clear roadmap, success metrics, and creative direction — all approved before production begins." },
    { title: "Design & Build", desc: "Two-week sprints with live previews, async reviews, and continuous delivery. You see progress daily, not at the end of the month." },
    { title: "Test & Launch", desc: "Rigorous QA, performance benchmarking, and a structured launch plan. We stay on-call through go-live and the first two weeks after." },
  ];

  const tickerItems = ["Brand Strategy", "UX Design", "Product Development", "Growth Marketing", "Engineering", "Data & Analytics", "Motion Design", "AI Integration", "Design Systems", "CRO"];

  const skills = [
    { label: "UI/UX Design", value: 98, color: "#FF6B35" },
    { label: "Web Development", value: 96, color: "#5B8BFF" },
    { label: "Brand Identity", value: 94, color: "#FFB547" },
    { label: "Growth Strategy", value: 90, color: "#C084FC" },
  ];

  if (!mounted) return null;

  return (
    <TemplateLayout data={data} theme="dark" category="Business" hideHeader={true} hideFooter={true}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .t9 {
          font-family: 'Syne', sans-serif;
          background: #07080F;
          color: #fff;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }

        .t9-wrap { max-width: 1360px; margin: 0 auto; padding: 0 40px; position: relative; z-index: 1; }

        .t9-card {
          background: #0D0F1E;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 24px;
          transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative; overflow: hidden;
        }
        .t9-card:hover {
          border-color: rgba(255,107,53,0.3);
          transform: translateY(-6px);
          box-shadow: 0 30px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,107,53,0.12);
        }
        .t9-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,107,53,0.5), transparent);
          opacity: 0; transition: opacity 0.4s;
        }
        .t9-card:hover::before { opacity: 1; }

        .t9-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          padding: 16px 40px;
          background: linear-gradient(135deg, #FF6B35, #FFB547);
          color: #07080F;
          border-radius: 100px;
          font-family: 'Syne', sans-serif;
          font-size: 14px; font-weight: 800;
          border: none; cursor: pointer; text-decoration: none;
          transition: all 0.3s;
          letter-spacing: -0.01em;
          position: relative; overflow: hidden;
        }
        .t9-btn::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .t9-btn:hover { transform: scale(1.04); box-shadow: 0 0 48px rgba(255,107,53,0.4), 0 16px 32px rgba(255,107,53,0.25); }
        .t9-btn:hover::after { opacity: 1; }

        .t9-btn-outline {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 36px;
          background: transparent;
          color: #FF6B35;
          border-radius: 100px;
          font-family: 'Syne', sans-serif;
          font-size: 14px; font-weight: 700;
          border: 1.5px solid rgba(255,107,53,0.4);
          cursor: pointer; text-decoration: none;
          transition: all 0.3s;
        }
        .t9-btn-outline:hover { background: rgba(255,107,53,0.08); border-color: #FF6B35; transform: scale(1.04); }

        .t9-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px;
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.65);
          border-radius: 100px;
          font-family: 'Syne', sans-serif;
          font-size: 13px; font-weight: 600;
          border: 1px solid rgba(255,255,255,0.08);
          cursor: pointer; text-decoration: none;
          transition: all 0.3s; backdrop-filter: blur(8px);
        }
        .t9-btn-ghost:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.18); color: #fff; }

        .t9-nav-link {
          font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 600;
          color: rgba(255,255,255,0.45); text-decoration: none;
          transition: color 0.25s; letter-spacing: -0.01em;
        }
        .t9-nav-link:hover { color: #FF6B35; }

        .t9-glow {
          position: absolute; pointer-events: none; border-radius: 50%;
          filter: blur(80px); opacity: 0.6;
        }

        .t9-grid-dots {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(255,107,53,0.1) 1px, transparent 1px);
          background-size: 36px 36px;
        }

        .t9-grid-lines {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,107,53,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,53,0.03) 1px, transparent 1px);
          background-size: 80px 80px;
        }

        /* ── Hero layout ── */
        .t9-hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 80px;
          align-items: center;
          padding: 100px 40px;
        }
        .t9-hero-image-wrap {
          position: relative;
        }
        .t9-hero-badge-1 {
          position: absolute; top: 32px; left: -40px;
        }
        .t9-hero-badge-2 {
          position: absolute; bottom: 40px; right: -28px;
        }
        .t9-hero-badge-3 {
          position: absolute; bottom: 140px; left: -50px;
        }

        /* ── Two-column grid ── */
        .t9-col-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .t9-about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 100px; align-items: center; }
        .t9-services-grid { display: grid; grid-template-columns: 360px 1fr; gap: 40px; align-items: start; }
        .t9-capabilities-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .t9-process-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 100px; align-items: start; }
        .t9-faq-grid { display: grid; grid-template-columns: 1fr 1.6fr; gap: 100px; align-items: start; }
        .t9-footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 56px; margin-bottom: 64px; }

        .t9-col-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
        .t9-col-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }

        /* ── Nav ── */
        .t9-nav-desktop { display: flex; gap: 40px; }
        .t9-nav-cta { display: flex; }
        .t9-menu-btn { display: none; background: none; border: none; cursor: pointer; color: #fff; }

        /* ── Stats strip ── */
        .t9-stats { display: flex; gap: 48px; padding-top: 40px; border-top: 1px solid rgba(255,255,255,0.06); flex-wrap: wrap; }

        /* ── Hero CTA row ── */
        .t9-hero-cta { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 72px; }

        /* ── Section header flex ── */
        .t9-section-header-flex {
          display: flex; align-items: flex-end; justify-content: space-between;
          margin-bottom: 80px; flex-wrap: wrap; gap: 24px;
        }

        /* ── Trust badges ── */
        .t9-trust-badges { display: flex; gap: 32px; justify-content: center; margin-top: 60px; flex-wrap: wrap; }

        /* ── Footer bottom ── */
        .t9-footer-bottom {
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 16px;
        }
        .t9-footer-legal { display: flex; gap: 24px; }

        /* ── Process sticky ── */
        .t9-process-sticky { position: sticky; top: 100px; }

        /* ── Skills rings ── */
        .t9-skills-rings { display: flex; gap: 40px; flex-wrap: wrap; }

        /* ── Scroll indicator ── */
        .t9-scroll-indicator {
          position: absolute; bottom: 32px; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 8px;
        }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,107,53,0.4); border-radius: 100px; }

        /* ════════════════════════════════════════════
           RESPONSIVE BREAKPOINTS
        ════════════════════════════════════════════ */

        /* ── Tablet: ≤ 1100px ── */
        @media (max-width: 1100px) {
          .t9-wrap { padding: 0 28px; }

          .t9-hero-grid {
            grid-template-columns: 1fr 1fr;
            gap: 48px;
            padding: 80px 28px;
          }
          .t9-hero-badge-1 { left: -20px; }
          .t9-hero-badge-2 { right: -14px; }
          .t9-hero-badge-3 { left: -24px; }

          .t9-about-grid { gap: 56px; }
          .t9-services-grid { grid-template-columns: 300px 1fr; }
          .t9-footer-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
          .t9-process-grid { gap: 60px; }
          .t9-faq-grid { gap: 60px; }
        }

        /* ── Small tablet / large mobile: ≤ 900px ── */
        @media (max-width: 900px) {
          .t9-wrap { padding: 0 20px; }

          /* Hero: stack vertically, image below text */
          .t9-hero-grid {
            grid-template-columns: 1fr;
            gap: 56px;
            padding: 64px 20px 80px;
            text-align: center;
          }
          .t9-hero-image-wrap { order: -1; }
          .t9-hero-badge-1 { left: 0px; top: 16px; }
          .t9-hero-badge-2 { right: 0px; bottom: 20px; }
          .t9-hero-badge-3 { display: none; }
          .t9-hero-cta { justify-content: center; }
          .t9-stats { justify-content: center; }

          /* Two-column → single column */
          .t9-about-grid,
          .t9-capabilities-grid,
          .t9-process-grid,
          .t9-faq-grid { grid-template-columns: 1fr; gap: 48px; }

          /* Services: tabs become horizontal scrollable, panel full width */
          .t9-services-grid { grid-template-columns: 1fr; gap: 32px; }

          /* Footer 2-col */
          .t9-footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; margin-bottom: 48px; }

          /* Nav */
          .t9-nav-desktop { display: none; }
          .t9-nav-cta { display: none; }
          .t9-menu-btn { display: block; }

          /* Process: unstick */
          .t9-process-sticky { position: static; }

          /* Skills rings: center + smaller */
          .t9-skills-rings { justify-content: center; }

          /* Section padding */
          .t9-section { padding: 96px 0 !important; }
        }

        /* ── Mobile: ≤ 600px ── */
        @media (max-width: 600px) {
          .t9-wrap { padding: 0 16px; }

          .t9-hero-grid { padding: 52px 16px 64px; gap: 40px; }
          .t9-hero-badge-1 { display: none; }
          .t9-hero-badge-2 { right: 8px; bottom: 16px; }

          /* Footer: single column */
          .t9-footer-grid { grid-template-columns: 1fr; gap: 28px; }
          .t9-footer-legal { flex-wrap: wrap; gap: 12px; }
          .t9-footer-bottom { flex-direction: column; align-items: flex-start; }

          /* Blog / team: single col */
          .t9-col-3 { grid-template-columns: 1fr; }
          .t9-col-4 { grid-template-columns: 1fr 1fr; }

          /* CTA banner padding */
          .t9-cta-inner { padding: 60px 24px !important; border-radius: 28px !important; }

          /* Services tab label text */
          .t9-service-tab-label { display: none; }

          /* Trust badges: column */
          .t9-trust-badges { flex-direction: column; align-items: center; gap: 16px; }

          /* Stats gap */
          .t9-stats { gap: 28px; }

          /* Scroll indicator: hide on mobile to save space */
          .t9-scroll-indicator { display: none; }

          /* Section padding */
          .t9-section { padding: 72px 0 !important; }
        }

        /* ── XS Mobile: ≤ 400px ── */
        @media (max-width: 400px) {
          .t9-col-4 { grid-template-columns: 1fr; }
          .t9-hero-cta { flex-direction: column; align-items: center; }
          .t9-hero-cta a, .t9-hero-cta button { width: 100%; text-align: center; justify-content: center; }
        }
      `}</style>

      <div className="t9">
        <CursorSpotlight />

        {/* ══════════ HEADER ══════════ */}
        <motion.header
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
            background: "rgba(7,8,15,0.82)",
            backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,107,53,0.08)",
          }}
        >
          <div className="t9-wrap" style={{ height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <div style={{ position: "relative", width: 36, height: 36, flexShrink: 0 }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #FF6B35, #FFB547)", borderRadius: 10 }} />
                <div style={{ position: "absolute", inset: 5, background: "#07080F", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 10, height: 10, background: "linear-gradient(135deg, #FF6B35, #FFB547)", borderRadius: 3, transform: "rotate(45deg)" }} />
                </div>
              </div>
              {headerType === "Image" && logoUrl ? (
                <div style={{ position: "relative", height: 26, width: 110 }}>
                  <Image src={logoUrl} alt={displayName} fill style={{ objectFit: "contain", objectPosition: "left" }} />
                </div>
              ) : (
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: companyNameFontSize || 20, fontWeight: 800, color: "#fff", letterSpacing: "-0.04em" }}>
                  {displayName}
                </span>
              )}
            </div>

            <nav className="t9-nav-desktop">
              {["Work", "Services", "Process", "Pricing"].map(n => (
                <a key={n} href={`#${n.toLowerCase()}`} className="t9-nav-link">{n}</a>
              ))}
            </nav>

            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <a href="#contact" className="t9-btn t9-nav-cta" style={{ padding: "10px 22px", fontSize: 13 }}>
                Get in Touch ↗
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="t9-menu-btn"
                aria-label="Toggle menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>
          </div>
        </motion.header>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              style={{ position: "fixed", top: 68, left: 0, right: 0, zIndex: 99, background: "#07080F", padding: "20px 24px", borderBottom: "1px solid rgba(255,107,53,0.1)" }}>
              {["Work", "Services", "Process", "Pricing", "Blog", "Contact"].map(n => (
                <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                  style={{ display: "block", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#fff", textDecoration: "none", fontSize: 18 }}>
                  {n}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <main style={{ paddingTop: 68 }}>

          {/* ══════════ HERO ══════════ */}
          <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
            <div className="t9-grid-lines" />
            <div className="t9-glow" style={{ top: "-10%", left: "-5%", width: "55%", height: "70%", background: "rgba(255,107,53,0.15)" }} />
            <div className="t9-glow" style={{ bottom: "-20%", right: "-5%", width: "45%", height: "60%", background: "rgba(91,139,255,0.1)" }} />

            <div className="t9-wrap" style={{ width: "100%" }}>
              <div className="t9-hero-grid">
                {/* Left */}
                <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
                  <motion.div variants={fadeUp} custom={0}>
                    <Label>✦ Accepting new projects — 2026</Label>
                  </motion.div>

                  <motion.h1 variants={fadeUp} custom={1}
                    style={{
                      fontSize: heroTitleFontSize ? `${heroTitleFontSize}px` : "clamp(40px, 6vw, 88px)",
                      fontWeight: 800, fontFamily: "'Syne', sans-serif",
                      letterSpacing: "-0.04em", lineHeight: 0.92, color: "#fff",
                      marginBottom: 32,
                    }}>
                    {heroTitle || (
                      <>
                        We craft<br />
                        <span style={{ background: "linear-gradient(135deg, #FF6B35, #FFB547)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                          digital
                        </span>
                        <br />
                        <span style={{ color: "rgba(255,255,255,0.25)", fontStyle: "italic" }}>experiences.</span>
                      </>
                    )}
                  </motion.h1>

                  <motion.p variants={fadeUp} custom={2}
                    style={{ fontSize: taglineFontSize || 17, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: 460, marginBottom: 48 }}>
                    {tagline || "Nexus is a full-service studio for ambitious founders — we design, build, and scale the products that shape tomorrow."}
                  </motion.p>

                  <motion.div variants={fadeUp} custom={3} className="t9-hero-cta">
                    <MagBtn href="#contact" className="t9-btn" style={{ fontSize: 15, padding: "18px 44px" }}>
                      Start a Project
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </MagBtn>
                    <MagBtn href="#work" className="t9-btn-outline">See Our Work</MagBtn>
                  </motion.div>

                  {/* Stats */}
                  <motion.div variants={fadeUp} custom={4} className="t9-stats">
                    {[
                      { val: 12, suf: "+", pre: "", label: "Years running" },
                      { val: 240, suf: "+", pre: "", label: "Projects shipped" },
                      { val: 97, suf: "%", pre: "", label: "Client retention" },
                    ].map((s, i) => (
                      <div key={i}>
                        <div style={{ fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 800, fontFamily: "'Syne', sans-serif", background: "linear-gradient(135deg, #FF6B35, #FFB547)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-0.04em", lineHeight: 1 }}>
                          <CountUp end={s.val} suffix={s.suf} prefix={s.pre} />
                        </div>
                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 6, fontFamily: "'Space Mono', monospace", letterSpacing: "0.08em" }}>{s.label}</div>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Right — hero image + floating badges */}
                <motion.div
                  className="t9-hero-image-wrap"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.3, ease: EASE }}
                >
                  <div style={{ borderRadius: 32, overflow: "hidden", aspectRatio: "4/5", position: "relative", border: "1px solid rgba(255,107,53,0.15)", boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,107,53,0.08)" }}>
                    <Image src={heroImage || "/images/templates/template-img-12.jpg"} alt="Hero" fill style={{ objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(7,8,15,0.7) 0%, transparent 50%)" }} />
                    <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: "linear-gradient(to bottom, #FF6B35, transparent)" }} />
                  </div>

                  {/* Floating badge 1 */}
                  <motion.div
                    className="t9-hero-badge-1"
                    initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9, duration: 0.6, ease: EASE }}
                    style={{ background: "rgba(7,8,15,0.9)", backdropFilter: "blur(16px)", borderRadius: 18, padding: "16px 22px", border: "1px solid rgba(255,107,53,0.25)", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}>
                    <div style={{ fontSize: 10, fontFamily: "'Space Mono', monospace", color: "#FF6B35", letterSpacing: "0.15em", marginBottom: 5 }}>LATEST WORK</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", fontFamily: "'Syne', sans-serif" }}>Lunar Health</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>+42% activation</div>
                  </motion.div>

                  {/* Floating badge 2 */}
                  <motion.div
                    className="t9-hero-badge-2"
                    initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1, duration: 0.6, ease: EASE }}
                    style={{ background: "linear-gradient(135deg, #FF6B35, #FFB547)", borderRadius: 18, padding: "16px 22px", boxShadow: "0 20px 40px rgba(255,107,53,0.3)" }}>
                    <div style={{ fontSize: 30, fontWeight: 800, color: "#07080F", fontFamily: "'Syne', sans-serif", lineHeight: 1 }}>4.9★</div>
                    <div style={{ fontSize: 12, color: "rgba(7,8,15,0.65)", marginTop: 4, fontWeight: 700 }}>Clutch rating</div>
                  </motion.div>

                  {/* Floating badge 3 — availability */}
                  <motion.div
                    className="t9-hero-badge-3"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3, duration: 0.5, ease: EASE }}
                    style={{ background: "rgba(7,8,15,0.9)", backdropFilter: "blur(16px)", borderRadius: 14, padding: "10px 16px", border: "1px solid rgba(91,139,255,0.3)", display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#5B8BFF", boxShadow: "0 0 8px #5B8BFF" }} />
                    <span style={{ fontSize: 12, color: "#fff", fontFamily: "'Space Mono', monospace" }}>Available now</span>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
              className="t9-scroll-indicator"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
              <span style={{ fontSize: 10, fontFamily: "'Space Mono', monospace", color: "rgba(255,255,255,0.2)", letterSpacing: "0.2em" }}>SCROLL</span>
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,107,53,0.6)" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
              </motion.div>
            </motion.div>
          </section>

          {/* ══════════ TICKER ══════════ */}
          <div style={{ background: "#0D0F1E", borderTop: "1px solid rgba(255,107,53,0.06)", borderBottom: "1px solid rgba(255,107,53,0.06)", padding: "18px 0", overflow: "hidden" }}>
            <Ticker items={tickerItems} />
          </div>

          {/* ══════════ ABOUT ══════════ */}
          <section id="about" className="t9-section" style={{ padding: "140px 0", background: "#07080F", position: "relative", overflow: "hidden" }}>
            <div className="t9-glow" style={{ top: "20%", right: "-8%", width: "35%", height: "50%", background: "rgba(255,107,53,0.07)" }} />
            <div className="t9-wrap">
              <div className="t9-about-grid">
                {/* Left */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft}>
                  <div style={{ borderRadius: 28, overflow: "hidden", aspectRatio: "4/5", position: "relative", border: "1px solid rgba(255,107,53,0.12)" }}>
                    <Image src={aboutUsImage || "/images/templates/template-img-20.jpg"} alt="About" fill style={{ objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(7,8,15,0.6) 0%, transparent 50%)" }} />
                    {/* Skills overlay */}
                    <div style={{ position: "absolute", bottom: 28, left: 28, right: 28 }}>
                      <div style={{ background: "rgba(7,8,15,0.9)", backdropFilter: "blur(20px)", borderRadius: 18, padding: "20px 24px", border: "1px solid rgba(255,107,53,0.2)" }}>
                        <div style={{ fontSize: 10, fontFamily: "'Space Mono', monospace", color: "#FF6B35", letterSpacing: "0.2em", marginBottom: 16 }}>CORE EXPERTISE</div>
                        {skills.map((sk, i) => (
                          <div key={i} style={{ marginBottom: i < skills.length - 1 ? 12 : 0 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontFamily: "'Syne', sans-serif" }}>{sk.label}</span>
                              <span style={{ fontSize: 12, color: sk.color, fontFamily: "'Space Mono', monospace" }}>{sk.value}%</span>
                            </div>
                            <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 100, overflow: "hidden" }}>
                              <motion.div
                                initial={{ width: 0 }} whileInView={{ width: `${sk.value}%` }}
                                viewport={{ once: true }} transition={{ duration: 1.2, ease: EASE, delay: i * 0.1 }}
                                style={{ height: "100%", background: `linear-gradient(90deg, ${sk.color}, ${sk.color}90)`, borderRadius: 100 }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Right */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeRight}>
                  <Label>Our Story</Label>
                  <h2 style={{ fontSize: aboutUsTitleFontSize ? `${aboutUsTitleFontSize}px` : "clamp(30px, 4vw, 56px)", fontWeight: 800, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.04em", color: "#fff", lineHeight: 1, marginBottom: 28, marginTop: 12 }}>
                    {aboutUsTitle || (
                      <>Built on<br /><span style={{ background: "linear-gradient(135deg, #FF6B35, #FFB547)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>obsession</span>.<br />Proven<br />by results.</>
                    )}
                  </h2>
                  <p style={{ fontSize: aboutUsContentFontSize || 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.85, marginBottom: 36 }}>
                    {aboutUsContent || "We founded Nexus because we believed great design and engineering shouldn't be gatekept behind enterprise budgets. Twelve years later, we're 50+ people, 240+ projects, and obsessively proud of every pixel we ship."}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 44 }}>
                    {["Senior teams only — no juniors learning on your budget", "Fixed-scope sprints with legally guaranteed deadlines", "Your source files and IP, owned by you from day one"].map((pt, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                        <div style={{ width: 20, height: 20, borderRadius: 6, background: "rgba(255,107,53,0.12)", border: "1px solid rgba(255,107,53,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                        </div>
                        <span style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>{pt}</span>
                      </div>
                    ))}
                  </div>
                  <a href="#contact" className="t9-btn-outline">Our Manifesto →</a>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ══════════ SERVICES ══════════ */}
          <section id="services" className="t9-section" style={{ padding: "140px 0", background: "#0D0F1E", position: "relative", overflow: "hidden" }}>
            <div className="t9-grid-dots" style={{ opacity: 0.35 }} />
            <div className="t9-wrap" style={{ position: "relative", zIndex: 1 }}>
              <div style={{ textAlign: "center", marginBottom: 80 }}>
                <Label>What We Do</Label>
                <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  style={{ fontSize: "clamp(28px, 4.5vw, 58px)", fontWeight: 800, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.04em", color: "#fff", marginTop: 12 }}>
                  Six ways we help you win.
                </motion.h2>
              </div>

              <div className="t9-services-grid">
                {/* Tabs */}
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {activeServices.map((s, i) => (
                    <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft} custom={i * 0.15}>
                      <div onClick={() => setActiveService(i)}
                        style={{
                          display: "flex", alignItems: "center", gap: 16, padding: "18px 20px", borderRadius: 14, cursor: "pointer",
                          background: activeService === i ? "rgba(255,107,53,0.08)" : "transparent",
                          border: `1px solid ${activeService === i ? "rgba(255,107,53,0.25)" : "transparent"}`,
                          transition: "all 0.3s",
                        }}>
                        <div style={{
                          width: 42, height: 42, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 18, flexShrink: 0, transition: "all 0.3s",
                          background: activeService === i ? "linear-gradient(135deg, #FF6B35, #FFB547)" : "rgba(255,107,53,0.08)",
                          color: activeService === i ? "#07080F" : "#FF6B35",
                        }}>
                          {s.icon || String(i + 1).padStart(2, "0")}
                        </div>
                        <span className="t9-service-tab-label" style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: activeService === i ? "#fff" : "rgba(255,255,255,0.4)", transition: "color 0.3s" }}>
                          {s.name || s.title}
                        </span>
                        {activeService === i && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2.5" style={{ marginLeft: "auto" }}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Content panel */}
                <AnimatePresence mode="wait">
                  <motion.div key={activeService}
                    initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="t9-card" style={{ padding: "40px 36px", minHeight: 280 }}>
                    <div className="t9-glow" style={{ top: "-30%", right: "-10%", width: "55%", height: "80%", background: "rgba(255,107,53,0.07)", filter: "blur(50px)" }} />
                    <div style={{ position: "relative", zIndex: 1 }}>
                      <div style={{ width: 60, height: 60, borderRadius: 16, background: "rgba(255,107,53,0.1)", border: "1px solid rgba(255,107,53,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, color: "#FF6B35", marginBottom: 28 }}>
                        {activeServices[activeService]?.icon || "◈"}
                      </div>
                      <h3 style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 800, fontFamily: "'Syne', sans-serif", color: "#fff", marginBottom: 18, letterSpacing: "-0.03em" }}>
                        {activeServices[activeService]?.name || activeServices[activeService]?.title}
                      </h3>
                      <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: 36 }}>
                        {activeServices[activeService]?.desc}
                      </p>
                      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                        <a href="#contact" className="t9-btn" style={{ padding: "12px 28px", fontSize: 13 }}>Get Started</a>
                        <a href="#work" className="t9-btn-ghost" style={{ fontSize: 13 }}>See Examples</a>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </section>

          {/* ══════════ PORTFOLIO — 3D CAROUSEL ══════════ */}
          <section id="work" className="t9-section" style={{ padding: "140px 0", background: "#07080F", position: "relative", overflow: "hidden" }}>
            <div className="t9-glow" style={{ top: "20%", left: "30%", width: "40%", height: "50%", background: "rgba(255,107,53,0.05)" }} />
            <div className="t9-wrap" style={{ position: "relative", zIndex: 1 }}>
              <div className="t9-section-header-flex">
                <div>
                  <Label>Our Work</Label>
                  <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft}
                    style={{ fontSize: "clamp(28px, 4.5vw, 58px)", fontWeight: 800, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.04em", color: "#fff", marginTop: 12 }}>
                    Selected projects.
                  </motion.h2>
                </div>
                <motion.a href="#contact" className="t9-btn-outline" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeRight}>
                  View all work →
                </motion.a>
              </div>
              <PortfolioCarousel items={activePortfolio} />
            </div>
          </section>

          {/* ══════════ CAPABILITIES ══════════ */}
          <section id="features" className="t9-section" style={{ padding: "140px 0", background: "#0D0F1E", position: "relative", overflow: "hidden" }}>
            <div className="t9-grid-lines" />
            <div className="t9-wrap" style={{ position: "relative", zIndex: 1 }}>
              <div className="t9-capabilities-grid">
                <div>
                  <Label>Capabilities</Label>
                  <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft}
                    style={{ fontSize: "clamp(28px, 4vw, 54px)", fontWeight: 800, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.04em", color: "#fff", marginBottom: 48, marginTop: 12 }}>
                    What sets us apart.
                  </motion.h2>
                  {/* Progress rings */}
                  <div className="t9-skills-rings">
                    {skills.map((sk, i) => (
                      <ProgressRing key={i} value={sk.value} label={sk.label} color={sk.color} size={110} />
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  {activeFeatures.map((f, i) => (
                    <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeRight} custom={i * 0.15}
                      className="t9-card" style={{ padding: "28px 30px", display: "flex", gap: 20, alignItems: "flex-start" }}>
                      <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(255,107,53,0.1)", border: "1px solid rgba(255,107,53,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "'Space Mono', monospace", fontSize: 14, fontWeight: 700, color: "#FF6B35" }}>
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <div style={{ fontSize: 10, fontFamily: "'Space Mono', monospace", color: "#FFB547", letterSpacing: "0.15em", marginBottom: 8 }}>{f.tag}</div>
                        <h4 style={{ fontSize: 17, fontWeight: 700, color: "#fff", fontFamily: "'Syne', sans-serif", marginBottom: 10 }}>{f.title}</h4>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>{f.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ══════════ TEAM ══════════ */}
          <section id="team" className="t9-section" style={{ padding: "140px 0", background: "#07080F", position: "relative" }}>
            <div className="t9-grid-dots" style={{ opacity: 0.2 }} />
            <div className="t9-wrap" style={{ position: "relative", zIndex: 1 }}>
              <div style={{ textAlign: "center", marginBottom: 80 }}>
                <Label>The Team</Label>
                <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  style={{ fontSize: "clamp(28px, 4.5vw, 58px)", fontWeight: 800, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.04em", color: "#fff", marginTop: 12 }}>
                  Who you'll work with.
                </motion.h2>
              </div>
              <div className="t9-col-4">
                {activeTeam.map((m, i) => (
                  <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.15}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="t9-card" style={{ overflow: "hidden", cursor: "pointer" }}>
                    <div style={{ position: "relative", aspectRatio: "1", background: "#111427", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                      {m.image ? (
                        <Image src={m.image} alt={m.name} fill style={{ objectFit: "cover" }} />
                      ) : (
                        <>
                          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 40%, ${m.color}18, transparent 70%)` }} />
                          <div style={{ width: 72, height: 72, borderRadius: "50%", background: `${m.color}15`, border: `2px solid ${m.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 800, color: m.color, fontFamily: "'Syne', sans-serif", zIndex: 1 }}>
                            {m.name?.[0]}
                          </div>
                        </>
                      )}
                      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: m.color }} />
                    </div>
                    <div style={{ padding: "22px 24px" }}>
                      <h4 style={{ fontSize: 17, fontWeight: 700, color: "#fff", fontFamily: "'Syne', sans-serif", marginBottom: 4 }}>{m.name}</h4>
                      <div style={{ fontSize: 11, fontFamily: "'Space Mono', monospace", color: m.color, marginBottom: m.bio ? 12 : 0, letterSpacing: "0.08em" }}>{m.role}</div>
                      {m.bio && <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.65 }}>{m.bio}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════ PROCESS ══════════ */}
          <section id="process" className="t9-section" style={{ padding: "140px 0", background: "#0D0F1E", position: "relative", overflow: "hidden" }}>
            <div className="t9-glow" style={{ top: "20%", right: "-5%", width: "35%", height: "50%", background: "rgba(91,139,255,0.07)" }} />
            <div className="t9-wrap" style={{ position: "relative", zIndex: 1 }}>
              <div className="t9-process-grid">
                <div className="t9-process-sticky">
                  <Label>How We Work</Label>
                  <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft}
                    style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.04em", color: "#fff", marginBottom: 24, marginTop: 12 }}>
                    Our process, refined over 12 years.
                  </motion.h2>
                  <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft} custom={1}
                    style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", lineHeight: 1.75 }}>
                    Every engagement follows the same four-phase framework — tight enough to be predictable, flexible enough to handle reality.
                  </motion.p>
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft} custom={2} style={{ marginTop: 36 }}>
                    <a href="#contact" className="t9-btn" style={{ fontSize: 14 }}>Start the Process →</a>
                  </motion.div>
                </div>
                <div style={{ paddingTop: 8 }}>
                  {processSteps.map((step, i) => (
                    <ProcessStep key={i} step={step} i={i} total={processSteps.length} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ══════════ TESTIMONIALS ══════════ */}
          <section id="testimonials" className="t9-section" style={{ padding: "140px 0", background: "#07080F", position: "relative", overflow: "hidden" }}>
            <div className="t9-glow" style={{ top: "30%", left: "50%", transform: "translateX(-50%)", width: "60%", height: "60%", background: "rgba(255,107,53,0.04)" }} />
            <div className="t9-wrap" style={{ position: "relative", zIndex: 1 }}>
              <div style={{ textAlign: "center", marginBottom: 72 }}>
                <Label>Client Stories</Label>
                <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  style={{ fontSize: "clamp(28px, 4.5vw, 58px)", fontWeight: 800, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.04em", color: "#fff", marginTop: 12 }}>
                  Our clients say it best.
                </motion.h2>
              </div>
              <TestimonialSlider items={activeTestimonials} />
            </div>
          </section>

          {/* ══════════ PRICING ══════════ */}
          {activePricing?.length > 0 && (
            <section id="pricing" className="t9-section" style={{ padding: "140px 0", background: "#0D0F1E", position: "relative", overflow: "hidden" }}>
              <div className="t9-grid-dots" style={{ opacity: 0.25 }} />
              <div className="t9-wrap" style={{ position: "relative", zIndex: 1 }}>
                <div style={{ textAlign: "center", marginBottom: 64 }}>
                  <Label>Pricing</Label>
                  <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                    style={{ fontSize: "clamp(28px, 4.5vw, 58px)", fontWeight: 800, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.04em", color: "#fff", marginTop: 12 }}>
                    Transparent. Simple. Yours.
                  </motion.h2>
                </div>
                <PricingToggle plans={activePricing} />
              </div>
            </section>
          )}

          {/* ══════════ FAQ ══════════ */}
          {activeFaq?.length > 0 && (
            <section id="faq" className="t9-section" style={{ padding: "140px 0", background: "#07080F", position: "relative" }}>
              <div className="t9-wrap">
                <div className="t9-faq-grid">
                  <div className="t9-process-sticky">
                    <Label>FAQ</Label>
                    <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft}
                      style={{ fontSize: "clamp(26px, 3.5vw, 48px)", fontWeight: 800, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.04em", color: "#fff", marginBottom: 20, marginTop: 12 }}>
                      Questions, answered honestly.
                    </motion.h2>
                    <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft} custom={1}
                      style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", lineHeight: 1.75, marginBottom: 32 }}>
                      Don't see yours? Message us and get a real answer within 2 hours.
                    </motion.p>
                    <motion.a href="#contact" className="t9-btn" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft} custom={2}>
                      Ask Us Anything ↗
                    </motion.a>
                  </div>
                  <div>
                    {activeFaq.map((item, i) => (
                      <FAQItem key={i} q={item.question} a={item.answer} idx={i} />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ══════════ BLOG ══════════ */}
          {activeBlog?.length > 0 && (
            <section id="blog" className="t9-section" style={{ padding: "140px 0", background: "#0D0F1E", position: "relative", overflow: "hidden" }}>
              <div className="t9-grid-lines" />
              <div className="t9-wrap" style={{ position: "relative", zIndex: 1 }}>
                <div className="t9-section-header-flex" style={{ marginBottom: 72 }}>
                  <div>
                    <Label>Insights</Label>
                    <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft}
                      style={{ fontSize: "clamp(28px, 4.5vw, 56px)", fontWeight: 800, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.04em", color: "#fff", marginTop: 12 }}>
                      From the studio.
                    </motion.h2>
                  </div>
                  <motion.a href="#" className="t9-btn-outline" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeRight}>
                    All Articles →
                  </motion.a>
                </div>
                <div className="t9-col-3">
                  {activeBlog.slice(0, 3).map((post, i) => (
                    <BlogCard key={i} post={post} i={i} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ══════════ CTA BANNER ══════════ */}
          <section id="contact" style={{ padding: "80px 20px", background: "#07080F" }}>
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE }}
              className="t9-cta-inner"
              style={{
                maxWidth: 1280, margin: "0 auto",
                background: "linear-gradient(135deg, #1a0e08, #1c1008, #0e1020)",
                borderRadius: 40, padding: "100px 60px",
                border: "1px solid rgba(255,107,53,0.2)",
                position: "relative", overflow: "hidden", textAlign: "center",
                boxShadow: "0 0 120px rgba(255,107,53,0.08)",
              }}>
              <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, borderRadius: "50%", background: "rgba(255,107,53,0.06)", filter: "blur(60px)" }} />
              <div style={{ position: "absolute", bottom: -60, left: -60, width: 240, height: 240, borderRadius: "50%", background: "rgba(91,139,255,0.06)", filter: "blur(60px)" }} />
              <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,107,53,0.06) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

              <div style={{ position: "relative", zIndex: 1 }}>
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <Label>Ready to Build?</Label>
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.8, ease: EASE }}
                  style={{ fontSize: "clamp(32px, 6vw, 76px)", fontWeight: 800, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.04em", color: "#fff", margin: "20px auto 24px", maxWidth: 900, lineHeight: 0.95 }}>
                  {ctaTitle || (
                    <>Let's make something<br /><span style={{ background: "linear-gradient(135deg, #FF6B35, #FFB547)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>extraordinary.</span></>
                  )}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  style={{ fontSize: 18, color: "rgba(255,255,255,0.45)", maxWidth: 480, margin: "0 auto 56px", lineHeight: 1.7 }}>
                  {ctaDesc || "Every great product starts with one conversation. Let's have ours — no pitch decks, no obligations."}
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                  style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                  <MagBtn href={ctaButtonLink || "#"} className="t9-btn" style={{ fontSize: 16, padding: "18px 48px" }}>
                    {ctaButtonText || "Start a Project"}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </MagBtn>
                  {contactEmail && (
                    <a href={`mailto:${contactEmail}`} className="t9-btn-outline">{contactEmail}</a>
                  )}
                </motion.div>
                <div className="t9-trust-badges">
                  {["No lock-in contracts", "Reply within 2 hours", "Free discovery call"].map((b, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.3)", fontFamily: "'Space Mono', monospace" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>
        </main>

        {/* ══════════ FOOTER ══════════ */}
        <footer style={{ background: "#07080F", padding: "80px 0 36px", borderTop: "1px solid rgba(255,107,53,0.06)" }}>
          <div className="t9-wrap">
            <div className="t9-footer-grid">
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, #FF6B35, #FFB547)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 12, height: 12, background: "#07080F", borderRadius: 3, transform: "rotate(45deg)" }} />
                  </div>
                  <span style={{ fontSize: 20, fontWeight: 800, color: "#fff", fontFamily: "'Syne', sans-serif", letterSpacing: "-0.04em" }}>{displayName}</span>
                </div>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.3)", lineHeight: 1.75, maxWidth: 270, marginBottom: 28 }}>
                  {footerDescription || "A studio obsessed with making your work undeniable."}
                </p>
                <div style={{ display: "flex", gap: 8 }}>
                  {[facebookUrl, twitterUrl, linkedinUrl].filter(Boolean).map((url, i) => (
                    <a key={i} href={url} style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(255,107,53,0.06)", border: "1px solid rgba(255,107,53,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.35)", fontSize: 10, fontFamily: "'Space Mono', monospace", textDecoration: "none", transition: "all 0.3s" }}
                      onMouseOver={e => { e.currentTarget.style.background = "rgba(255,107,53,0.12)"; e.currentTarget.style.color = "#FF6B35"; }}
                      onMouseOut={e => { e.currentTarget.style.background = "rgba(255,107,53,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.35)"; }}>
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
                  <div style={{ fontSize: 10, fontFamily: "'Space Mono', monospace", color: "#FF6B35", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 22 }}>{col.label}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {col.links.map((lk, j) => (
                      <a key={j} href={`#${lk?.toLowerCase?.()}`} style={{ fontSize: 14, color: "rgba(255,255,255,0.3)", textDecoration: "none", fontFamily: "'Syne', sans-serif", transition: "color 0.25s" }}
                        onMouseOver={e => e.target.style.color = "#FF6B35"}
                        onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.3)"}>
                        {lk}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom bar */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 28 }}>
              <div className="t9-footer-bottom">
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.18)", fontFamily: "'Space Mono', monospace" }}>
                  {footerCopyright || `© ${new Date().getFullYear()} ${displayName}. All rights reserved.`}
                </div>
                <div className="t9-footer-legal">
                  {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(lk => (
                    <a key={lk} href="#" style={{ fontSize: 11, color: "rgba(255,255,255,0.18)", textDecoration: "none", fontFamily: "'Space Mono', monospace", transition: "color 0.25s" }}
                      onMouseOver={e => e.target.style.color = "#FF6B35"} onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.18)"}>
                      {lk}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </TemplateLayout>
  );
}