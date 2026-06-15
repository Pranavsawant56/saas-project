import { useState, useEffect, useRef, useCallback } from "react";
import {
   motion,
   useScroll,
   useTransform,
   AnimatePresence,
   useInView,
   useMotionValue,
   useSpring,
} from "framer-motion";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const T = {
   obsidian: "#080C0A",
   deepForest: "#0D1F17",
   cardBg: "#101A14",
   surfaceBg: "#152010",
   gold: "#C8A45A",
   goldLight: "#E8C87A",
   goldDim: "#8A6E32",
   sage: "#6B9E7A",
   cream: "#F2EDE4",
   offWhite: "#D4CFC6",
   muted: "#7A8A7E",
   midMuted: "#4A5A4E",
   emerald: "#2D6A4F",
   mintAccent: "#A8D5BA",
};

// ─── DEFAULT DATA ──────────────────────────────────────────────────────────────
const DEFAULT_DATA = {
   agencyName: "AURUM EVENTS",
   tagline: "Crafting Moments That Echo Forever",
   heroTitle: "Where Vision Becomes Legend",
   bio: "AURUM Events is a luxury event production house redefining what's possible. We architect immersive experiences — from intimate galas to stadium spectacles — where every detail breathes intentionality and every moment is sculpted with precision.",
   aboutUsTitle: "The Art of Experience",
   contactEmail: "hello@aurumevents.co",
   phone: "+91 98765 43210",
   address: "The Grand Atelier, BKC, Mumbai 400051",
   footerCopyright: `© ${new Date().getFullYear()} AURUM Events. All rights reserved.`,
   heroImage: "/images/templates/template-img-38.jpg",
   aboutImage: "/images/templates/template-img-39.jpg",
   services: [],
   projects: [],
};

const DEFAULT_SERVICES = [
   { name: "Gala & Galas", desc: "Opulent evenings with hand-crafted décor, Michelin-starred catering, and orchestrated grandeur.", icon: "✦", color: T.gold, img: "/images/templates/template-img-36.jpg" },
   { name: "Cultural Festivals", desc: "Multi-day cultural odysseys that fuse heritage with avant-garde production design.", icon: "◈", color: T.sage, img: "/images/templates/template-img-37.jpg" },
   { name: "Immersive Experiences", desc: "Spatial storytelling using projection mapping, scent design, and tactile installations.", icon: "◎", color: T.mintAccent, img: "/images/templates/template-img-41.jpg" },
   { name: "Brand Summits", desc: "Premium brand activations that command attention and build lasting impressions.", icon: "⬡", color: T.gold, img: "/images/templates/template-img-44.jpg" },
   { name: "Destination Events", desc: "From Santorini cliffs to Rajasthani palaces — we produce anywhere.", icon: "◇", color: T.sage, img: "/images/templates/template-img-45.jpg" },
   { name: "Private Celebrations", desc: "Bespoke milestone events where every candle, flower, and note is curated for you.", icon: "✿", color: T.mintAccent, img: "/images/templates/template-img-46.jpg" },
];

const DEFAULT_PROJECTS = [
   { name: "The Ivory Gala", desc: "A 500-guest black-tie affair in a heritage palace with live chamber orchestra.", tag: "Gala", color: T.gold, img: "/images/templates/template-img-44.jpg", stat: "500", year: "2024" },
   { name: "Namma Festival", desc: "Five-day cultural celebration drawing 80,000 attendees across three cities.", tag: "Festival", color: T.sage, img: "/images/templates/template-img-45.jpg", stat: "80K", year: "2024" },
   { name: "Terra Immersive", desc: "An underground art experience with biome installations and generative AI visuals.", tag: "Immersive", color: T.mintAccent, img: "/images/templates/template-img-46.jpg", stat: "3K", year: "2023" },
   { name: "Summit Luxe", desc: "Global CEO conclave with spatial branding and curated networking journeys.", tag: "Corporate", color: T.gold, img: "/images/templates/template-img-47.jpg", stat: "1.2K", year: "2023" },
];

const DEFAULT_CATEGORIES = [
   { label: "Gala Evenings", icon: "✦", from: T.gold, to: T.goldDim },
   { label: "Festivals", icon: "◈", from: T.sage, to: T.emerald },
   { label: "Immersive Art", icon: "◎", from: T.mintAccent, to: T.sage },
   { label: "Destination", icon: "◇", from: T.goldLight, to: T.gold },
   { label: "Corporate Luxury", icon: "⬡", from: T.sage, to: T.mintAccent },
   { label: "Private Events", icon: "✿", from: T.gold, to: T.emerald },
   { label: "Product Launches", icon: "◉", from: T.mintAccent, to: T.goldDim },
   { label: "Brand Activations", icon: "⟡", from: T.goldLight, to: T.sage },
];

const DEFAULT_PROCESS = [
   { step: "I", title: "Discovery Session", desc: "We listen deeply — to your story, your guests, your aspirations — before a single idea is sketched.", icon: "◎", color: T.gold },
   { step: "II", title: "Vision Architecture", desc: "A full creative treatment: mood boards, spatial plans, guest journey maps, and sensory blueprints.", icon: "◈", color: T.sage },
   { step: "III", title: "Production Build", desc: "Our artisan crew brings every element to life — set, lighting, florals, AV, and catering.", icon: "⬡", color: T.mintAccent },
   { step: "IV", title: "Live Orchestration", desc: "On the day, our production maestros ensure every beat lands exactly as envisioned.", icon: "✦", color: T.gold },
   { step: "V", title: "Legacy Capture", desc: "Premium photography, film, and a curated digital archive delivered within 72 hours.", icon: "◇", color: T.sage },
];

const DEFAULT_TESTIMONIALS = [
   { name: "Ishaan Tharoor", role: "CEO, Veridian Group", text: "AURUM didn't produce our summit — they elevated our brand. Every guest asked who was behind it. The answer created business for us.", avatar: "IT", color: T.gold },
   { name: "Priya Nambiar", role: "Founder, Namma Festival", text: "Five cities, 80,000 people, zero chaos. Their production discipline is matched only by their creative vision. Truly a league apart.", avatar: "PN", color: T.sage },
   { name: "Rahul Oberoi", role: "Director, Terra Art Foundation", text: "Our immersive installation became the most talked-about experience of the year. AURUM understood what we were trying to say before we did.", avatar: "RO", color: T.mintAccent },
];

const DEFAULT_TEAM = [
   { name: "Ananya Mehta", role: "Creative Director", badge: "Visionary", color: T.gold },
   { name: "Siddharth Rao", role: "Production Head", badge: "Architect", color: T.sage },
   { name: "Kavya Pillai", role: "Experience Designer", badge: "Sculptor", color: T.mintAccent },
   { name: "Arnav Khanna", role: "Technical Director", badge: "Engineer", color: T.gold },
];

const DEFAULT_PRICING = [
   { name: "Curated", price: "₹2.5L", desc: "Refined events for up to 200 guests.", color: T.sage, features: ["Up to 200 guests", "Full design concept", "Venue styling", "Day-of team", "Photography"] },
   { name: "Prestige", price: "₹8L", desc: "Our signature luxury package for marquee occasions.", color: T.gold, popular: true, features: ["Up to 1,500 guests", "Bespoke stage & décor", "Production crew of 20", "Live entertainment booking", "Cinematic film reel", "Social content suite"] },
   { name: "Sovereign", price: "Custom", desc: "Unlimited vision. Unlimited scale. Zero compromise.", color: T.mintAccent, features: ["Unlimited scale", "Custom built environments", "Global logistics", "Full media relations", "Year-round partnership", "Legacy documentation"] },
];

const DEFAULT_FAQS = [
   { q: "What makes AURUM different from other event agencies?", a: "We approach every event as a narrative — not a logistics exercise. Every element is story-driven, spatially coherent, and emotionally intentional." },
   { q: "Do you manage destination events internationally?", a: "Yes. We've produced events across India, UAE, UK, and Southeast Asia, with full logistics, vendor partnerships, and cultural research built in." },
   { q: "How early do we need to begin planning?", a: "For galas and large-scale events, 4–8 months is ideal. For intimate experiences, we can execute extraordinary things in 6–8 weeks." },
   { q: "Can you work within a fixed budget?", a: "Absolutely. We're skilled at architectural value — maximising visual and experiential impact within clear financial boundaries." },
   { q: "What does post-event documentation include?", a: "A curated photo gallery, cinematic highlight film, press-ready content set, and a full production debrief report — delivered within 72 hours." },
];

const DEFAULT_GALLERY = [
   "/images/templates/template-img-36.jpg",
   "/images/templates/template-img-37.jpg",
   "/images/templates/template-img-38.jpg",
   "/images/templates/template-img-39.jpg",
   "/images/templates/template-img-40.jpg",
   "/images/templates/template-img-41.jpg",
   "/images/templates/template-img-44.jpg",
   "/images/templates/template-img-45.jpg",
   "/images/templates/template-img-46.jpg",
];

const DEFAULT_CLIENTS = ["The Leela", "Tata Trusts", "Reliance Arts", "Taj Hotels", "HDFC Luminary", "Art Basel", "Forbes India", "JSW Culture", "Godrej Design", "Lodha Group"];

// ─── ANIMATED COUNTER ──────────────────────────────────────────────────────────
function Counter({ to, suffix = "" }) {
   const ref = useRef(null);
   const inView = useInView(ref, { once: true });
   const [val, setVal] = useState(0);
   useEffect(() => {
      if (!inView) return;
      let start = null;
      const animate = (ts) => {
         if (!start) start = ts;
         const p = Math.min((ts - start) / 2000, 1);
         const ease = 1 - Math.pow(1 - p, 3);
         setVal(Math.floor(ease * to));
         if (p < 1) requestAnimationFrame(animate);
         else setVal(to);
      };
      requestAnimationFrame(animate);
   }, [inView, to]);
   return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

// ─── MARQUEE ───────────────────────────────────────────────────────────────────
function Marquee({ items, speed = 30, reverse = false }) {
   return (
      <div
         className="flex overflow-hidden whitespace-nowrap py-4"
         style={{ background: T.surfaceBg, borderTop: `1px solid ${T.gold}20`, borderBottom: `1px solid ${T.gold}20` }}
      >
         <motion.div
            className="flex items-center gap-10 sm:gap-16"
            animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
            transition={{ duration: speed, ease: "linear", repeat: Infinity }}
         >
            {[...items, ...items, ...items, ...items].map((item, i) => (
               <span
                  key={i}
                  className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] shrink-0 flex items-center gap-3 sm:gap-4"
                  style={{ color: i % 2 === 0 ? T.gold : T.muted }}
               >
                  {item}
                  <span style={{ color: T.goldDim, opacity: 0.6 }}>✦</span>
               </span>
            ))}
         </motion.div>
      </div>
   );
}

// ─── SECTION LABEL ─────────────────────────────────────────────────────────────
function SectionLabel({ color = T.gold, children }) {
   return (
      <motion.div
         initial={{ opacity: 0, x: -40 }}
         whileInView={{ opacity: 1, x: 0 }}
         viewport={{ once: true }}
         transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
         className="flex items-center gap-3 mb-4 sm:mb-5"
      >
         <div className="w-6 sm:w-8 h-px" style={{ background: color }} />
         <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.3em] sm:tracking-[0.35em]" style={{ color }}>
            {children}
         </span>
      </motion.div>
   );
}

// ─── ANIMATION VARIANTS ────────────────────────────────────────────────────────
const ltr = (i = 0, distance = 60) => ({
   initial: { opacity: 0, x: -distance },
   whileInView: { opacity: 1, x: 0 },
   viewport: { once: true, margin: "-60px" },
   transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
});

const fadeUp = (i = 0) => ({
   initial: { opacity: 0, y: 50, x: -20 },
   whileInView: { opacity: 1, y: 0, x: 0 },
   viewport: { once: true, margin: "-40px" },
   transition: { duration: 0.65, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] },
});

// ─── CAROUSEL COMPONENT ────────────────────────────────────────────────────────
function Carousel({ items, renderItem, autoPlay = true, interval = 4000 }) {
   const [current, setCurrent] = useState(0);
   const [dir, setDir] = useState(1);
   const dragX = useMotionValue(0);

   const go = useCallback((next) => {
      setDir(next > current ? 1 : -1);
      setCurrent(next);
   }, [current]);

   const prev = () => go((current - 1 + items.length) % items.length);
   const next = () => go((current + 1) % items.length);

   useEffect(() => {
      if (!autoPlay) return;
      const t = setInterval(() => {
         setDir(1);
         setCurrent(p => (p + 1) % items.length);
      }, interval);
      return () => clearInterval(t);
   }, [items.length, interval, autoPlay]);

   const variants = {
      enter: (d) => ({ x: d > 0 ? 120 : -120, opacity: 0, scale: 0.96 }),
      center: { x: 0, opacity: 1, scale: 1 },
      exit: (d) => ({ x: d > 0 ? -120 : 120, opacity: 0, scale: 0.96 }),
   };

   const handleDragEnd = (_, info) => {
      if (info.offset.x < -40) next();
      else if (info.offset.x > 40) prev();
   };

   return (
      <div className="relative w-full">
         <div className="overflow-hidden rounded-2xl sm:rounded-3xl">
            <AnimatePresence mode="wait" custom={dir}>
               <motion.div
                  key={current}
                  custom={dir}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.15}
                  onDragEnd={handleDragEnd}
                  style={{ x: dragX, cursor: "grab" }}
                  className="w-full select-none touch-pan-y"
               >
                  {renderItem(items[current], current)}
               </motion.div>
            </AnimatePresence>
         </div>

         {/* Dots */}
         <div className="flex justify-center gap-2 mt-4 sm:mt-6">
            {items.map((_, i) => (
               <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="rounded-full transition-all duration-400"
                  style={{
                     width: i === current ? 24 : 7,
                     height: 7,
                     background: i === current ? T.gold : `${T.gold}30`,
                     minWidth: 7,
                  }}
               />
            ))}
         </div>

         {/* Arrow buttons — hidden on xs, shown on sm+ */}
         <button
            onClick={prev}
            aria-label="Previous"
            className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center transition-all hover:scale-110 z-10"
            style={{ background: `${T.obsidian}CC`, border: `1px solid ${T.gold}40`, color: T.gold, backdropFilter: "blur(8px)" }}
         >
            ←
         </button>
         <button
            onClick={next}
            aria-label="Next"
            className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center transition-all hover:scale-110 z-10"
            style={{ background: `${T.obsidian}CC`, border: `1px solid ${T.gold}40`, color: T.gold, backdropFilter: "blur(8px)" }}
         >
            →
         </button>
      </div>
   );
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function EventTemplate6({ data }) {
   const d = { ...DEFAULT_DATA, ...data };
   const services = d.services?.length && d.services.some(s => s.name) ? d.services : DEFAULT_SERVICES;
   const projects = d.projects?.length && d.projects.some(p => p.name) ? d.projects : DEFAULT_PROJECTS;
   const CLIENTS = d.trustedClients?.length > 0 && d.trustedClients.some(c => c.name) ? d.trustedClients.map(c => c.name) : DEFAULT_CLIENTS;
   const CATEGORIES = d.eventCategories?.length > 0 ? d.eventCategories.map((c, i) => ({ ...DEFAULT_CATEGORIES[i % DEFAULT_CATEGORIES.length], label: c.name })) : DEFAULT_CATEGORIES;
   const PROCESS = d.eventPlanningProcess?.length > 0 && d.eventPlanningProcess.some(p => p.step) ? d.eventPlanningProcess.map((p, i) => ({ ...DEFAULT_PROCESS[i % DEFAULT_PROCESS.length], title: p.step, desc: p.desc })) : DEFAULT_PROCESS;
   const TESTIMONIALS = d.testimonials?.length > 0 && d.testimonials.some(t => t.review) ? d.testimonials.map((t, i) => ({ name: t.clientName, role: t.event, text: t.review, avatar: t.clientName?.[0] || "T", color: DEFAULT_TESTIMONIALS[i % DEFAULT_TESTIMONIALS.length].color })) : DEFAULT_TESTIMONIALS;
   const TEAM = d.team?.length > 0 && d.team.some(t => t.name) ? d.team.map((t, i) => ({ ...DEFAULT_TEAM[i % DEFAULT_TEAM.length], name: t.name, role: t.role })) : DEFAULT_TEAM;
   const PRICING = d.pricing?.length > 0 && d.pricing.some(p => p.planName) ? d.pricing.map((p, i) => ({ ...DEFAULT_PRICING[i % DEFAULT_PRICING.length], name: p.planName, price: p.price, features: p.features ? p.features.split(",").map(f => f.trim()) : [] })) : DEFAULT_PRICING;
   const FAQS = d.faqs?.length > 0 && d.faqs.some(f => f.question) ? d.faqs.map(f => ({ q: f.question, a: f.answer })) : DEFAULT_FAQS;
   const GALLERY = d.gallery?.length > 0 && d.gallery.some(g => g.image) ? d.gallery.map(g => g.image) : DEFAULT_GALLERY;

   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const [activeFaq, setActiveFaq] = useState(null);
   const [lightbox, setLightbox] = useState(null);

   const heroRef = useRef(null);
   const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
   const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);
   const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

   const mouseX = useMotionValue(0);
   const mouseY = useMotionValue(0);
   const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 });
   const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 });
   const handleMouseMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left - rect.width / 2) * 0.04);
      mouseY.set((e.clientY - rect.top - rect.height / 2) * 0.04);
   };

   return (
      <div style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif", background: T.obsidian, color: T.cream, overflowX: "hidden" }}>

         {/* ── NAVBAR ─────────────────────────────────────────────────────── */}
         <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-3 sm:pt-5"
         >
            <div
               className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl"
               style={{ background: "rgba(8,12,10,0.90)", backdropFilter: "blur(20px)", border: `1px solid ${T.gold}22` }}
            >
               {/* Logo */}
               <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                  className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                     style={{ background: `linear-gradient(135deg, ${T.gold}, ${T.goldDim})`, color: T.obsidian, letterSpacing: "0.15em" }}>A</div>
                  <span className="text-sm sm:text-lg font-light tracking-[0.15em] sm:tracking-[0.2em] uppercase truncate" style={{ color: T.gold }}>
                     {d.agencyName}
                  </span>
               </motion.div>

               {/* Desktop nav */}
               <nav className="hidden lg:flex items-center gap-8 xl:gap-10 text-xs font-light uppercase tracking-[0.25em]" style={{ color: T.muted }}>
                  {["Services", "Work", "Process", "Pricing", "Contact"].map((item, i) => (
                     <motion.a key={item} href={`#${item.toLowerCase()}`}
                        initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i + 0.4 }}
                        className="hover:text-gold transition-colors relative group"
                        style={{ color: "inherit" }}
                        onMouseEnter={e => e.target.style.color = T.gold}
                        onMouseLeave={e => e.target.style.color = T.muted}>
                        {item}
                        <span className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                           style={{ background: T.gold }} />
                     </motion.a>
                  ))}
               </nav>

               <div className="flex items-center gap-2 sm:gap-3">
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
                     className="hidden lg:block">
                     <a href="#contact"
                        className="px-5 py-2 sm:px-6 sm:py-2.5 text-xs uppercase tracking-[0.25em] rounded-full transition-all hover:scale-105"
                        style={{ border: `1px solid ${T.gold}`, color: T.gold, background: `${T.gold}10` }}>
                        Enquire
                     </a>
                  </motion.div>

                  {/* Hamburger */}
                  <button
                     className="lg:hidden p-2 rounded-lg touch-manipulation"
                     style={{ color: T.gold }}
                     onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                     aria-label="Toggle menu"
                  >
                     <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                           d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                     </svg>
                  </button>
               </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
               {isMobileMenuOpen && (
                  <motion.div
                     initial={{ opacity: 0, y: -10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}
                     className="mx-3 sm:mx-6 mt-2 p-5 sm:p-6 rounded-xl sm:rounded-2xl flex flex-col gap-4 sm:gap-5"
                     style={{ background: T.cardBg, border: `1px solid ${T.gold}20` }}
                  >
                     {["Services", "Work", "Process", "Pricing", "Contact"].map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`}
                           onClick={() => setIsMobileMenuOpen(false)}
                           className="text-sm font-light uppercase tracking-[0.25em] py-1 touch-manipulation"
                           style={{ color: T.offWhite }}>
                           {item}
                        </a>
                     ))}
                     <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}
                        className="text-center py-3 text-xs uppercase tracking-[0.25em] rounded-full mt-2 touch-manipulation"
                        style={{ border: `1px solid ${T.gold}`, color: T.gold }}>
                        Enquire Now
                     </a>
                  </motion.div>
               )}
            </AnimatePresence>
         </motion.header>

         {/* ── HERO ──────────────────────────────────────────────────────── */}
         <section
            ref={heroRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-[100svh] flex flex-col justify-end pt-28 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 overflow-hidden"
         >
            {/* Background */}
            <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
               <img
                  src={d.heroImage || "/images/templates/template-img-38.jpg"}
                  alt="Hero"
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.35) saturate(0.8)" }}
               />
               <div className="absolute inset-0"
                  style={{ background: `linear-gradient(to top, ${T.obsidian} 30%, ${T.obsidian}80 60%, transparent 100%)` }} />
               <div className="absolute inset-0 opacity-30"
                  style={{ backgroundImage: `radial-gradient(${T.gold}10 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
            </motion.div>

            {/* Floating orb — hidden on mobile for performance */}
            <motion.div
               className="absolute top-1/3 right-1/4 w-48 sm:w-80 h-48 sm:h-80 rounded-full pointer-events-none opacity-10 hidden sm:block"
               style={{ x: smoothX, y: smoothY, background: `radial-gradient(circle, ${T.gold}, transparent 70%)` }}
            />

            <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto w-full">
               <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-end">
                  {/* Main hero copy */}
                  <div className="lg:col-span-8">
                     <SectionLabel>Est. 2016 · Mumbai · India</SectionLabel>

                     <div className="overflow-hidden mb-1 sm:mb-2">
                        <motion.h1
                           initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                           transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                           className="font-light leading-[0.88] tracking-tight"
                           style={{
                              color: T.cream,
                              fontSize: "clamp(2.5rem, 10vw, 7rem)",
                           }}
                        >
                           {d.heroTitle.split(" ").slice(0, 2).join(" ")}
                        </motion.h1>
                     </div>
                     <div className="overflow-hidden">
                        <motion.h1
                           initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                           transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                           className="font-light leading-[0.88] tracking-tight italic"
                           style={{
                              color: T.gold,
                              fontSize: "clamp(2.5rem, 10vw, 7rem)",
                           }}
                        >
                           {d.heroTitle.split(" ").slice(2).join(" ")}
                        </motion.h1>
                     </div>

                     <motion.div
                        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.7 }}
                        className="h-px my-5 sm:my-8 origin-left"
                        style={{ background: `linear-gradient(to right, ${T.gold}, transparent)`, width: "min(60%, 320px)" }}
                     />

                     <motion.p {...ltr(4)}
                        className="text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-xl mb-7 sm:mb-10"
                        style={{ color: T.muted, letterSpacing: "0.03em" }}>
                        {d.tagline}
                     </motion.p>

                     <motion.div {...ltr(5)} className="flex flex-col xs:flex-row gap-3 sm:gap-4">
                        <a href="#contact"
                           className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] transition-all hover:scale-105 touch-manipulation"
                           style={{ background: T.gold, color: T.obsidian, fontWeight: 600 }}>
                           Begin Your Journey <span>→</span>
                        </a>
                        <a href="#work"
                           className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] transition-all hover:scale-105 touch-manipulation"
                           style={{ border: `1px solid ${T.gold}50`, color: T.gold }}>
                           View Portfolio
                        </a>
                     </motion.div>
                  </div>

                  {/* Stats — horizontal on mobile, vertical on desktop */}
                  <motion.div
                     initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                     className="lg:col-span-4 grid grid-cols-3 lg:grid-cols-1 gap-3 mt-6 lg:mt-0"
                  >
                     {[
                        { v: 350, s: "+", l: "Events Crafted", icon: "✦" },
                        { v: 98, s: "%", l: "Client Return Rate", icon: "◎" },
                        { v: 12, s: "", l: "Years of Excellence", icon: "◈" },
                     ].map((stat, i) => (
                        <motion.div key={i}
                           initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: 0.8 + i * 0.12 }}
                           className="p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl"
                           style={{ background: `${T.surfaceBg}CC`, border: `1px solid ${T.gold}18`, backdropFilter: "blur(10px)" }}>
                           <div className="text-[10px] sm:text-xs mb-1" style={{ color: T.gold }}>{stat.icon}</div>
                           <div className="text-xl sm:text-2xl lg:text-4xl font-light" style={{ color: T.cream }}>
                              <Counter to={stat.v} suffix={stat.s} />
                           </div>
                           <div className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] mt-0.5 sm:mt-1 leading-tight" style={{ color: T.muted }}>{stat.l}</div>
                        </motion.div>
                     ))}
                  </motion.div>
               </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
               className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
               style={{ color: T.goldDim }}>
               <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
                  className="w-px h-10 sm:h-12" style={{ background: `linear-gradient(to bottom, ${T.gold}, transparent)` }} />
               <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.35em] sm:tracking-[0.4em]">Scroll</span>
            </motion.div>
         </section>

         {/* ── MARQUEE ──────────────────────────────────────────────────────── */}
         <Marquee items={CLIENTS} speed={35} />

         {/* ── ABOUT ────────────────────────────────────────────────────────── */}
         <section id="about" className="py-16 sm:py-24 lg:py-36 px-4 sm:px-6 relative overflow-hidden" style={{ background: T.deepForest }}>
            <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 pointer-events-none opacity-5"
               style={{ background: `radial-gradient(circle at top right, ${T.gold}, transparent 70%)` }} />
            <div className="absolute bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 pointer-events-none opacity-5"
               style={{ background: `radial-gradient(circle at bottom left, ${T.sage}, transparent 70%)` }} />

            <div className="max-w-7xl mx-auto">
               <div className="max-w-2xl mx-auto">
                  {/* Image */}
                  <motion.div {...ltr(0)} className="relative">
                     <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden"
                        style={{ border: `1px solid ${T.gold}20`, aspectRatio: "3/4", maxHeight: "70vh" }}>
                        <img src={d.aboutImage || "/images/templates/template-img-39.jpg"}
                           alt="About" className="w-full h-full object-cover"
                           style={{ filter: "saturate(0.7) brightness(0.8)" }} />
                        <div className="absolute inset-0"
                           style={{ background: `linear-gradient(to top, ${T.deepForest}CC, transparent 60%)` }} />
                        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 w-10 sm:w-16 h-10 sm:h-16 pointer-events-none"
                           style={{ borderTop: `2px solid ${T.gold}80`, borderLeft: `2px solid ${T.gold}80` }} />
                        <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-10 sm:w-16 h-10 sm:h-16 pointer-events-none"
                           style={{ borderBottom: `2px solid ${T.gold}80`, borderRight: `2px solid ${T.gold}80` }} />
                     </div>

                     {/* Floating badges — positioned safely on mobile */}
                     <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity }}
                        className="absolute -right-3 sm:-right-6 top-10 sm:top-16 p-3 sm:p-5 rounded-xl sm:rounded-2xl z-10"
                        style={{ background: T.cardBg, border: `1px solid ${T.gold}30` }}>
                        <div className="text-xl sm:text-3xl font-light italic" style={{ color: T.gold }}><Counter to={12} suffix="+" /></div>
                        <div className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] mt-0.5 sm:mt-1" style={{ color: T.muted }}>Years</div>
                     </motion.div>

                     <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4.5, repeat: Infinity, delay: 1 }}
                        className="absolute -left-3 sm:-left-6 bottom-16 sm:bottom-24 p-3 sm:p-5 rounded-xl sm:rounded-2xl z-10"
                        style={{ background: T.cardBg, border: `1px solid ${T.sage}30` }}>
                        <div className="text-xl sm:text-3xl font-light italic" style={{ color: T.sage }}><Counter to={350} suffix="+" /></div>
                        <div className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] mt-0.5 sm:mt-1" style={{ color: T.muted }}>Events</div>
                     </motion.div>
                  </motion.div>

                  {/* Text */}
                  <div>
                     <SectionLabel color={T.gold}>Our Story</SectionLabel>
                     <motion.h2 {...ltr(1)}
                        className="font-light leading-tight mb-4 sm:mb-6"
                        style={{ color: T.cream, fontSize: "clamp(1.75rem, 5vw, 3.5rem)" }}>
                        {d.aboutUsTitle}
                     </motion.h2>
                     <motion.div {...ltr(2)} className="h-px mb-6 sm:mb-8"
                        style={{ background: `linear-gradient(to right, ${T.gold}60, transparent)`, width: "40%" }} />
                     <motion.p {...ltr(3)} className="text-sm sm:text-base leading-loose mb-6 sm:mb-8 font-light"
                        style={{ color: T.muted, letterSpacing: "0.02em" }}>
                        {d.bio}
                     </motion.p>
                     <motion.div {...ltr(4)} className="flex flex-wrap gap-2 sm:gap-3 mb-7 sm:mb-10">
                        {["Story-Led", "Detail-Obsessed", "Globally Capable", "Client-First"].map((pill, i) => (
                           <span key={i} className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em]"
                              style={{ border: `1px solid ${[T.gold, T.sage, T.mintAccent, T.gold][i]}40`, color: [T.gold, T.sage, T.mintAccent, T.gold][i] }}>
                              {pill}
                           </span>
                        ))}
                     </motion.div>
                     <motion.a {...ltr(5)} href="#contact"
                        className="inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] transition-all hover:scale-105 touch-manipulation"
                        style={{ background: T.gold, color: T.obsidian, fontWeight: 600 }}>
                        Work With Us <span>→</span>
                     </motion.a>
                  </div>
               </div>
            </div>
         </section>

         {/* ── SERVICES ─────────────────────────────────────────────────────── */}
         <section id="services" className="py-16 sm:py-24 lg:py-36 px-4 sm:px-6 relative" style={{ background: T.obsidian }}>
            <div className="max-w-7xl mx-auto">
               <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-16 gap-4 sm:gap-6">
                  <div>
                     <SectionLabel color={T.sage}>Our Craft</SectionLabel>
                     <motion.h2 {...ltr(1)}
                        className="font-light"
                        style={{ color: T.cream, fontSize: "clamp(1.75rem, 5vw, 3.5rem)" }}>
                        Expertise<br /><span className="italic" style={{ color: T.gold }}>Refined.</span>
                     </motion.h2>
                  </div>
                  <motion.p {...ltr(2)} className="text-sm font-light max-w-xs leading-relaxed" style={{ color: T.muted }}>
                     Each service is backed by dedicated artisans, seasoned vendors, and years of domain mastery.
                  </motion.p>
               </div>

               <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {services.map((svc, i) => (
                     <motion.div key={i} {...fadeUp(i)}
                        whileHover={{ y: -6 }}
                        className="group rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer relative"
                        style={{ background: T.cardBg, border: `1px solid ${T.gold}12` }}>
                        <div className="relative h-40 sm:h-48 overflow-hidden">
                           <img src={svc.img || "/images/templates/template-img-40.jpg"} alt={svc.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              style={{ filter: "saturate(0.5) brightness(0.7)" }} />
                           <div className="absolute inset-0"
                              style={{ background: `linear-gradient(to top, ${T.cardBg}, transparent 50%)` }} />
                           <div className="absolute top-3 sm:top-4 right-3 sm:right-4 text-xl sm:text-2xl"
                              style={{ color: svc.color || T.gold }}>{svc.icon || "✦"}</div>
                        </div>
                        <div className="p-5 sm:p-6">
                           <h3 className="text-base sm:text-lg font-light mb-2 tracking-wide" style={{ color: svc.color || T.gold }}>{svc.name}</h3>
                           <p className="text-xs sm:text-sm leading-relaxed font-light" style={{ color: T.muted }}>{svc.desc}</p>
                           <div className="mt-4 sm:mt-5 flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity"
                              style={{ color: svc.color || T.gold }}>
                              Discover <span>→</span>
                           </div>
                        </div>
                        <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
                           style={{ background: `linear-gradient(to right, ${svc.color || T.gold}, transparent)` }} />
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── EVENT CATEGORIES ─────────────────────────────────────────────── */}
         <section className="py-16 sm:py-24 lg:py-36 px-4 sm:px-6 relative" style={{ background: T.deepForest }}>
            <div className="max-w-7xl mx-auto">
               <div className="text-center mb-10 sm:mb-16">
                  <SectionLabel color={T.mintAccent}>Specialisations</SectionLabel>
                  <motion.h2 {...ltr(1)}
                     className="font-light"
                     style={{ color: T.cream, fontSize: "clamp(1.75rem, 5vw, 3.5rem)" }}>
                     Every Occasion,<br /><span className="italic" style={{ color: T.mintAccent }}>Mastered.</span>
                  </motion.h2>
               </div>
               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {CATEGORIES.map((cat, i) => (
                     <motion.div key={i}
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ y: -6, scale: 1.03 }}
                        className="p-4 sm:p-6 rounded-xl sm:rounded-2xl cursor-pointer relative overflow-hidden group"
                        style={{ background: T.cardBg, border: `1px solid ${cat.from}20` }}>
                        <div className="text-2xl sm:text-3xl mb-3 sm:mb-4 font-light" style={{ color: cat.from }}>{cat.icon}</div>
                        <div className="text-xs sm:text-sm font-light uppercase tracking-[0.15em] sm:tracking-[0.2em]" style={{ color: T.offWhite }}>{cat.label}</div>
                        <div className="absolute -bottom-6 -right-6 w-16 sm:w-20 h-16 sm:h-20 rounded-full opacity-10 group-hover:scale-150 group-hover:opacity-20 transition-all duration-500"
                           style={{ background: cat.from }} />
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── PORTFOLIO CAROUSEL ───────────────────────────────────────────── */}
         <section id="work" className="py-16 sm:py-24 lg:py-36 px-4 sm:px-6 relative overflow-hidden" style={{ background: T.obsidian }}>
            <div className="max-w-7xl mx-auto">
               <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-16 gap-4 sm:gap-6">
                  <div>
                     <SectionLabel color={T.gold}>Portfolio</SectionLabel>
                     <motion.h2 {...ltr(1)}
                        className="font-light"
                        style={{ color: T.cream, fontSize: "clamp(1.75rem, 5vw, 3.5rem)" }}>
                        Defining<br /><span className="italic" style={{ color: T.gold }}>Moments.</span>
                     </motion.h2>
                  </div>
               </div>

               <Carousel
                  items={projects}
                  interval={5000}
                  renderItem={(project) => (
                     <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden"
                        style={{ height: "clamp(280px, 55vw, 60vh)" }}>
                        <img src={project?.img || "/images/templates/template-img-44.jpg"}
                           alt={project?.name} className="w-full h-full object-cover"
                           style={{ filter: "saturate(0.5) brightness(0.6)" }} />
                        <div className="absolute inset-0"
                           style={{ background: "linear-gradient(to top, rgba(8,12,10,0.95) 0%, rgba(8,12,10,0.4) 50%, transparent 100%)" }} />

                        <div className="absolute top-4 sm:top-6 left-4 sm:left-8">
                           <span className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-semibold"
                              style={{ background: `${project?.color || T.gold}20`, color: project?.color || T.gold, border: `1px solid ${project?.color || T.gold}40` }}>
                              {project?.tag} · {project?.year}
                           </span>
                        </div>

                        <div className="absolute top-4 sm:top-6 right-4 sm:right-8 text-right">
                           <div className="text-2xl sm:text-3xl font-light italic" style={{ color: project?.color || T.gold }}>{project?.stat}</div>
                           <div className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] sm:tracking-[0.3em]" style={{ color: T.muted }}>Guests</div>
                        </div>

                        <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-8 right-4 sm:right-8">
                           <h3 className="font-light tracking-tight mb-2 sm:mb-3"
                              style={{ color: T.cream, fontSize: "clamp(1.25rem, 4vw, 3rem)" }}>
                              {project?.name}
                           </h3>
                           <p className="text-xs sm:text-sm font-light max-w-md line-clamp-2" style={{ color: T.muted }}>{project?.desc}</p>
                        </div>
                     </div>
                  )}
               />

               {/* Thumbnail strip */}
               <div className="grid grid-cols-4 gap-2 sm:gap-3 mt-4 sm:mt-6">
                  {projects.map((p, i) => (
                     <motion.div key={i}
                        initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                        className="relative rounded-lg sm:rounded-xl overflow-hidden"
                        style={{ height: 60, border: `1px solid ${T.gold}15` }}>
                        <img src={p.img} alt={p.name} className="w-full h-full object-cover"
                           style={{ filter: "saturate(0.4) brightness(0.6)" }} />
                        <div className="absolute bottom-1 left-2 right-2 text-[7px] sm:text-[9px] uppercase tracking-wider truncate" style={{ color: T.offWhite }}>{p.name}</div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── MARQUEE 2 ────────────────────────────────────────────────────── */}
         <Marquee items={["Elevated", "Refined", "Curated", "Immersive", "Bespoke", "Legendary"]} reverse speed={25} />

         {/* ── PROCESS ──────────────────────────────────────────────────────── */}
         <section id="process" className="py-16 sm:py-24 lg:py-36 px-4 sm:px-6 relative" style={{ background: T.deepForest }}>
            <div className="max-w-6xl mx-auto">
               <div className="text-center mb-10 sm:mb-16">
                  <SectionLabel color={T.sage}>How We Work</SectionLabel>
                  <motion.h2 {...ltr(1)}
                     className="font-light"
                     style={{ color: T.cream, fontSize: "clamp(1.75rem, 5vw, 3.5rem)" }}>
                     The AURUM <span className="italic" style={{ color: T.sage }}>Method</span>
                  </motion.h2>
               </div>

               {/* Mobile: vertical stack; Tablet+: horizontal row */}
               <div className="flex flex-col sm:grid sm:grid-cols-5 gap-0">
                  {PROCESS.map((step, i) => (
                     <motion.div key={i}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.65, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                        className="relative flex flex-row sm:flex-col sm:items-center sm:text-center gap-4 sm:gap-0 px-0 sm:px-4 pb-6 sm:pb-0"
                     >
                        {/* Mobile vertical connector */}
                        {i < PROCESS.length - 1 && (
                           <div className="absolute left-5 top-10 w-px sm:hidden" style={{ height: "calc(100% - 24px)", background: `${step.color}30` }} />
                        )}

                        {/* Step circle */}
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm font-light flex-shrink-0 relative z-10"
                           style={{ background: T.cardBg, border: `1px solid ${step.color}60`, color: step.color }}>
                           {step.step}
                        </div>

                        {/* Desktop horizontal connector */}
                        {i < PROCESS.length - 1 && (
                           <div className="absolute top-5 sm:top-6 left-[calc(50%+28px)] right-0 h-px hidden sm:block"
                              style={{ background: `linear-gradient(to right, ${step.color}40, ${PROCESS[i + 1].color}40)` }} />
                        )}

                        {/* Content */}
                        <div className="flex-1 sm:mt-4">
                           <div className="text-lg sm:text-xl mb-1 sm:mb-2" style={{ color: step.color }}>{step.icon}</div>
                           <h4 className="font-light text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-1 sm:mb-2" style={{ color: T.cream }}>{step.title}</h4>
                           <p className="text-xs leading-relaxed font-light" style={{ color: T.muted }}>{step.desc}</p>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── WHY US ───────────────────────────────────────────────────────── */}
         <section className="py-16 sm:py-24 lg:py-36 px-4 sm:px-6" style={{ background: T.cardBg }}>
            <div className="max-w-7xl mx-auto">
               <div className="text-center mb-10 sm:mb-16">
                  <SectionLabel color={T.gold}>Why AURUM</SectionLabel>
                  <motion.h2 {...ltr(1)}
                     className="font-light"
                     style={{ color: T.cream, fontSize: "clamp(1.75rem, 5vw, 3.5rem)" }}>
                     Numbers Tell<br /><span className="italic" style={{ color: T.gold }}>the Story</span>
                  </motion.h2>
               </div>

               <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-16">
                  {[
                     { v: 350, s: "+", l: "Events Produced", icon: "✦" },
                     { v: 98, s: "%", l: "Client Satisfaction", icon: "◎" },
                     { v: 600, s: "+", l: "Five-Star Reviews", icon: "◇" },
                     { v: 25, s: "+", l: "Destinations Covered", icon: "◈" },
                  ].map((stat, i) => (
                     <motion.div key={i}
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ y: -4 }}
                        className="p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl text-center"
                        style={{ background: T.obsidian, border: `1px solid ${[T.gold, T.sage, T.mintAccent, T.gold][i]}20` }}>
                        <div className="text-base sm:text-lg mb-1 sm:mb-2" style={{ color: [T.gold, T.sage, T.mintAccent, T.gold][i] }}>{stat.icon}</div>
                        <div className="text-2xl sm:text-3xl lg:text-4xl font-light mb-1 sm:mb-2 italic"
                           style={{ color: [T.gold, T.sage, T.mintAccent, T.gold][i] }}>
                           <Counter to={stat.v} suffix={stat.s} />
                        </div>
                        <div className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em]" style={{ color: T.muted }}>{stat.l}</div>
                     </motion.div>
                  ))}
               </div>

               <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
                  {[
                     { title: "Artisan Precision", desc: "Every element — from centrepieces to sound checks — is executed with artisan-level care.", icon: "◎", color: T.gold },
                     { title: "Zero Anxiety", desc: "You should be a guest at your own event. We handle every detail from first call to final wrap.", icon: "◇", color: T.sage },
                     { title: "Enduring Impact", desc: "We build moments people talk about for years — not just for the night.", icon: "✦", color: T.mintAccent },
                  ].map((item, i) => (
                     <motion.div key={i}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                        className="flex gap-4 sm:gap-5 p-5 sm:p-7 rounded-xl sm:rounded-2xl"
                        style={{ background: T.deepForest, border: `1px solid ${item.color}18` }}>
                        <div className="text-lg sm:text-xl flex-shrink-0 mt-0.5" style={{ color: item.color }}>{item.icon}</div>
                        <div>
                           <h4 className="font-light text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-1 sm:mb-2" style={{ color: item.color }}>{item.title}</h4>
                           <p className="text-xs leading-relaxed font-light" style={{ color: T.muted }}>{item.desc}</p>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── PRICING ──────────────────────────────────────────────────────── */}
         <section id="pricing" className="py-16 sm:py-24 lg:py-36 px-4 sm:px-6 relative" style={{ background: T.obsidian }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 sm:w-96 h-64 sm:h-96 rounded-full blur-[80px] sm:blur-[120px] opacity-5 pointer-events-none"
               style={{ background: T.gold }} />
            <div className="max-w-6xl mx-auto relative z-10">
               <div className="text-center mb-10 sm:mb-16">
                  <SectionLabel color={T.gold}>Investment</SectionLabel>
                  <motion.h2 {...ltr(1)}
                     className="font-light"
                     style={{ color: T.cream, fontSize: "clamp(1.75rem, 5vw, 3.5rem)" }}>
                     Choose Your <span className="italic" style={{ color: T.gold }}>Experience</span>
                  </motion.h2>
               </div>

               <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-start">
                  {PRICING.map((pkg, i) => (
                     <motion.div key={i}
                        initial={{ opacity: 0, x: i === 0 ? -60 : i === 2 ? 60 : 0, y: i === 1 ? 30 : 0 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ y: -8 }}
                        className="relative rounded-2xl sm:rounded-3xl overflow-hidden"
                        style={{
                           background: pkg.popular ? `linear-gradient(160deg, ${T.surfaceBg}, ${T.deepForest})` : T.cardBg,
                           border: pkg.popular ? `1px solid ${T.gold}50` : `1px solid ${T.gold}12`,
                           boxShadow: pkg.popular ? `0 0 60px ${T.gold}12` : "none",
                        }}>
                        {pkg.popular && (
                           <div className="absolute top-0 left-0 right-0 h-px"
                              style={{ background: `linear-gradient(90deg, transparent, ${T.gold}, transparent)` }} />
                        )}
                        <div className="p-5 sm:p-7 lg:p-9">
                           {pkg.popular && (
                              <div className="inline-block px-3 py-1 rounded-full text-[9px] uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-4 sm:mb-5"
                                 style={{ border: `1px solid ${T.gold}50`, color: T.gold }}>
                                 ✦ Most Chosen
                              </div>
                           )}
                           <div className="text-xl sm:text-2xl mb-2 sm:mb-3" style={{ color: pkg.color }}>{["✦", "◎", "◈"][i]}</div>
                           <h3 className="text-lg sm:text-xl font-light uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-2" style={{ color: pkg.popular ? T.gold : pkg.color }}>{pkg.name}</h3>
                           <p className="text-xs font-light mb-4 sm:mb-6 leading-relaxed" style={{ color: T.muted }}>{pkg.desc}</p>
                           <div className="text-3xl sm:text-4xl lg:text-5xl font-light italic mb-6 sm:mb-8" style={{ color: pkg.popular ? T.cream : pkg.color }}>
                              {pkg.price}
                              {pkg.price !== "Custom" && <span className="text-xs font-light opacity-50 ml-2">+</span>}
                           </div>
                           <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                              {pkg.features.map((f, j) => (
                                 <li key={j} className="flex items-center gap-2.5 sm:gap-3 text-xs font-light">
                                    <span style={{ color: pkg.color }}>✦</span>
                                    <span style={{ color: T.muted }}>{f}</span>
                                 </li>
                              ))}
                           </ul>
                           <button
                              className="w-full py-3.5 sm:py-4 rounded-full text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] transition-all hover:scale-105 touch-manipulation"
                              style={pkg.popular
                                 ? { background: T.gold, color: T.obsidian, fontWeight: 600 }
                                 : { border: `1px solid ${pkg.color}50`, color: pkg.color }}>
                              Begin Consultation
                           </button>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── TESTIMONIALS CAROUSEL ────────────────────────────────────────── */}
         <section className="py-16 sm:py-24 lg:py-36 px-4 sm:px-6 relative overflow-hidden" style={{ background: T.deepForest }}>
            <div className="max-w-4xl mx-auto">
               <div className="text-center mb-10 sm:mb-16">
                  <SectionLabel color={T.sage}>Testimonials</SectionLabel>
                  <motion.h2 {...ltr(1)}
                     className="font-light"
                     style={{ color: T.cream, fontSize: "clamp(1.75rem, 5vw, 3.5rem)" }}>
                     In Their <span className="italic" style={{ color: T.sage }}>Words</span>
                  </motion.h2>
               </div>

               <Carousel
                  items={TESTIMONIALS}
                  interval={5500}
                  renderItem={(t) => (
                     <div className="p-6 sm:p-10 lg:p-14 rounded-2xl sm:rounded-3xl text-center"
                        style={{ background: T.cardBg, border: `1px solid ${t?.color || T.gold}25` }}>
                        <div className="text-4xl sm:text-6xl font-light italic mb-4 sm:mb-6 opacity-20" style={{ color: t?.color || T.gold }}>"</div>
                        <p className="text-base sm:text-xl lg:text-2xl font-light leading-relaxed mb-7 sm:mb-10"
                           style={{ color: T.offWhite, letterSpacing: "0.02em" }}>
                           {t?.text}
                        </p>
                        <div className="h-px mb-6 sm:mb-8 mx-auto w-12 sm:w-16"
                           style={{ background: `linear-gradient(to right, transparent, ${t?.color || T.gold}, transparent)` }} />
                        <div className="flex items-center justify-center gap-3 sm:gap-4">
                           <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xs sm:text-sm font-light flex-shrink-0"
                              style={{ background: `${t?.color || T.gold}20`, border: `1px solid ${t?.color || T.gold}40`, color: t?.color || T.gold }}>
                              {t?.avatar}
                           </div>
                           <div className="text-left">
                              <div className="text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] font-light" style={{ color: T.cream }}>{t?.name}</div>
                              <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] mt-0.5" style={{ color: T.muted }}>{t?.role}</div>
                           </div>
                        </div>
                     </div>
                  )}
               />
            </div>
         </section>

         {/* ── TEAM ─────────────────────────────────────────────────────────── */}
         <section className="py-16 sm:py-24 lg:py-36 px-4 sm:px-6" style={{ background: T.obsidian }}>
            <div className="max-w-6xl mx-auto">
               <div className="text-center mb-10 sm:mb-16">
                  <SectionLabel color={T.mintAccent}>Our Principals</SectionLabel>
                  <motion.h2 {...ltr(1)}
                     className="font-light"
                     style={{ color: T.cream, fontSize: "clamp(1.75rem, 5vw, 3.5rem)" }}>
                     The <span className="italic" style={{ color: T.mintAccent }}>Artisans</span>
                  </motion.h2>
               </div>
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
                  {TEAM.map((member, i) => (
                     <motion.div key={i}
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ y: -6 }}
                        className="group rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer"
                        style={{ background: T.cardBg, border: `1px solid ${member.color}15` }}>
                        <div className="h-32 sm:h-44 lg:h-56 flex items-center justify-center relative overflow-hidden"
                           style={{ background: `linear-gradient(135deg, ${member.color}10, ${member.color}20)` }}>
                           <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center text-base sm:text-xl font-light"
                              style={{ background: `${member.color}20`, border: `1px solid ${member.color}60`, color: member.color }}>
                              {member.name.split(" ").map(n => n[0]).join("")}
                           </div>
                           <div className="absolute top-2 sm:top-3 left-2 sm:left-3 w-6 sm:w-8 h-6 sm:h-8 pointer-events-none"
                              style={{ borderTop: `1px solid ${member.color}40`, borderLeft: `1px solid ${member.color}40` }} />
                           <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 w-6 sm:w-8 h-6 sm:h-8 pointer-events-none"
                              style={{ borderBottom: `1px solid ${member.color}40`, borderRight: `1px solid ${member.color}40` }} />
                        </div>
                        <div className="p-3 sm:p-5">
                           <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] sm:tracking-[0.3em] font-light mb-1 sm:mb-2 block" style={{ color: member.color }}>{member.badge}</span>
                           <h4 className="font-light text-xs sm:text-sm tracking-wide" style={{ color: T.cream }}>{member.name}</h4>
                           <p className="text-[9px] sm:text-[10px] mt-0.5 sm:mt-1 uppercase tracking-[0.15em] sm:tracking-[0.2em]" style={{ color: T.muted }}>{member.role}</p>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── GALLERY ──────────────────────────────────────────────────────── */}
         <section className="py-16 sm:py-24 lg:py-36 px-4 sm:px-6" style={{ background: T.deepForest }}>
            <div className="max-w-7xl mx-auto">
               <div className="text-center mb-10 sm:mb-16">
                  <SectionLabel color={T.gold}>Archive</SectionLabel>
                  <motion.h2 {...ltr(1)}
                     className="font-light"
                     style={{ color: T.cream, fontSize: "clamp(1.75rem, 5vw, 3.5rem)" }}>
                     Visual <span className="italic" style={{ color: T.gold }}>Stories</span>
                  </motion.h2>
               </div>

               <div className="mb-6 sm:mb-8">
                  <Carousel
                     items={GALLERY}
                     interval={3500}
                     renderItem={(img) => (
                        <div
                           className="relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer"
                           style={{ height: "clamp(250px, 50vw, 55vh)" }}
                           onClick={() => setLightbox(img)}
                        >
                           <img src={img} alt="Gallery" className="w-full h-full object-cover"
                              style={{ filter: "saturate(0.6) brightness(0.75)" }} />
                           <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                              style={{ background: `${T.obsidian}50` }}>
                              <span className="text-2xl" style={{ color: T.gold }}>✦</span>
                           </div>
                        </div>
                     )}
                  />
               </div>

               {/* Grid strip */}
               <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
                  {GALLERY.slice(0, 5).map((img, i) => (
                     <motion.div key={i}
                        initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                        onClick={() => setLightbox(img)}
                        className="relative rounded-lg sm:rounded-xl overflow-hidden cursor-pointer group"
                        style={{ height: 64 }}>
                        <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                           style={{ filter: "saturate(0.4) brightness(0.6)" }} />
                     </motion.div>
                  ))}
               </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
               {lightbox && (
                  <motion.div
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                     className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
                     style={{ background: "rgba(8,12,10,0.97)", backdropFilter: "blur(12px)" }}
                     onClick={() => setLightbox(null)}
                  >
                     <motion.img
                        initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.85, opacity: 0 }}
                        src={lightbox} alt="Gallery"
                        className="max-w-4xl w-full max-h-[85vh] object-contain rounded-xl sm:rounded-2xl"
                        style={{ border: `1px solid ${T.gold}30` }}
                     />
                     <button
                        className="absolute top-4 sm:top-6 right-4 sm:right-6 text-xl w-10 h-10 flex items-center justify-center rounded-full touch-manipulation"
                        style={{ color: T.muted, background: `${T.obsidian}80` }}
                        onClick={() => setLightbox(null)}>
                        ✕
                     </button>
                  </motion.div>
               )}
            </AnimatePresence>
         </section>

         {/* ── FAQ ──────────────────────────────────────────────────────────── */}
         <section className="py-16 sm:py-24 lg:py-36 px-4 sm:px-6" style={{ background: T.cardBg }}>
            <div className="max-w-3xl mx-auto">
               <div className="text-center mb-10 sm:mb-16">
                  <SectionLabel color={T.sage}>Questions</SectionLabel>
                  <motion.h2 {...ltr(1)}
                     className="font-light"
                     style={{ color: T.cream, fontSize: "clamp(1.75rem, 5vw, 3.5rem)" }}>
                     Frequently <span className="italic" style={{ color: T.sage }}>Asked</span>
                  </motion.h2>
               </div>
               <div className="space-y-2.5 sm:space-y-3">
                  {FAQS.map((faq, i) => (
                     <motion.div key={i}
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                        className="rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-all duration-200"
                        style={{ background: T.obsidian, border: `1px solid ${activeFaq === i ? T.gold : T.gold + "15"}` }}
                        onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                        <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 gap-3 sm:gap-4">
                           <h4 className="font-light text-xs sm:text-sm tracking-wide leading-snug" style={{ color: T.cream }}>{faq.q}</h4>
                           <motion.div animate={{ rotate: activeFaq === i ? 45 : 0 }}
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm border"
                              style={{ borderColor: activeFaq === i ? T.gold : T.midMuted, color: activeFaq === i ? T.gold : T.midMuted }}>
                              +
                           </motion.div>
                        </div>
                        <AnimatePresence>
                           {activeFaq === i && (
                              <motion.div
                                 initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                                 exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                                 className="overflow-hidden">
                                 <div className="px-4 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm font-light leading-relaxed"
                                    style={{ color: T.muted, borderTop: `1px solid ${T.gold}15` }}>
                                    {faq.a}
                                 </div>
                              </motion.div>
                           )}
                        </AnimatePresence>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── CONTACT ──────────────────────────────────────────────────────── */}
         <section id="contact" className="py-16 sm:py-24 lg:py-36 px-4 sm:px-6 relative overflow-hidden" style={{ background: T.obsidian }}>
            <div className="absolute inset-0 opacity-[0.03]"
               style={{ backgroundImage: `repeating-linear-gradient(45deg, ${T.gold} 0, ${T.gold} 1px, transparent 1px, transparent 30px)` }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-[600px] h-64 sm:h-[600px] rounded-full pointer-events-none opacity-5"
               style={{ background: `radial-gradient(circle, ${T.gold}, transparent 70%)` }} />
            <div className="max-w-6xl mx-auto relative z-10">
               <div className="text-center mb-10 sm:mb-16">
                  <SectionLabel color={T.gold}>Begin</SectionLabel>
                  <motion.h2 {...ltr(1)}
                     className="font-light leading-tight"
                     style={{ color: T.cream, fontSize: "clamp(2rem, 6vw, 4.5rem)" }}>
                     Let's Create<br /><span className="italic" style={{ color: T.gold }}>Something Timeless</span>
                  </motion.h2>
               </div>

               <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">
                  {/* Contact info */}
                  <div className="space-y-3 sm:space-y-5">
                     {[
                        { icon: "✉", label: "Email", val: d.contactEmail, color: T.gold },
                        { icon: "◎", label: "Phone", val: d.phone || "+91 98765 43210", color: T.sage },
                        { icon: "◇", label: "Atelier", val: d.address, color: T.mintAccent },
                     ].map((item, i) => (
                        <motion.div key={i}
                           initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                           whileHover={{ x: 6 }}
                           className="flex gap-4 sm:gap-5 p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl"
                           style={{ background: T.cardBg, border: `1px solid ${item.color}18` }}>
                           <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-base sm:text-lg flex-shrink-0"
                              style={{ background: `${item.color}10`, border: `1px solid ${item.color}30`, color: item.color }}>
                              {item.icon}
                           </div>
                           <div className="min-w-0">
                              <div className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] sm:tracking-[0.35em] mb-0.5 sm:mb-1" style={{ color: item.color }}>{item.label}</div>
                              <div className="text-xs sm:text-sm font-light break-words" style={{ color: T.offWhite }}>{item.val}</div>
                           </div>
                        </motion.div>
                     ))}

                     <motion.div
                        initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ delay: 0.4 }}
                        className="p-5 sm:p-6 rounded-xl sm:rounded-2xl text-center"
                        style={{ background: `linear-gradient(135deg, ${T.gold}12, ${T.goldDim}08)`, border: `1px solid ${T.gold}30` }}>
                        <div className="text-base sm:text-xl font-light italic mb-0.5 sm:mb-1" style={{ color: T.gold }}>✦ 350+ Events Crafted</div>
                        <div className="text-[9px] sm:text-xs font-light uppercase tracking-[0.15em] sm:tracking-[0.2em]" style={{ color: T.muted }}>Join our family of distinguished clients</div>
                     </motion.div>
                  </div>

                  
               </div>
            </div>
         </section>

         {/* ── FOOTER ───────────────────────────────────────────────────────── */}
         <footer className="px-4 sm:px-6 pt-12 sm:pt-16 pb-6 sm:pb-8" style={{ background: T.deepForest, borderTop: `1px solid ${T.gold}15` }}>
            <div className="max-w-7xl mx-auto">
               <div className="flex flex-col md:flex-row justify-between items-start gap-10 sm:gap-12 pb-10 sm:pb-12"
                  style={{ borderBottom: `1px solid ${T.gold}10` }}>
                  <motion.div {...ltr(0)} className="max-w-xs">
                     <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                           style={{ background: `linear-gradient(135deg, ${T.gold}, ${T.goldDim})`, color: T.obsidian }}>A</div>
                        <span className="text-sm sm:text-lg font-light tracking-[0.15em] sm:tracking-[0.2em] uppercase" style={{ color: T.gold }}>{d.agencyName}</span>
                     </div>
                     <p className="text-xs font-light leading-relaxed mb-5 sm:mb-6" style={{ color: T.muted, letterSpacing: "0.03em" }}>{d.tagline}</p>
                     <div className="flex gap-2 sm:gap-3">
                        {["in", "tw", "ig", "yt"].map(s => (
                           <a key={s} href="#"
                              className="w-8 h-8 rounded-full flex items-center justify-center text-[9px] font-light uppercase transition-all hover:scale-110 touch-manipulation"
                              style={{ border: `1px solid ${T.gold}30`, color: T.gold }}>
                              {s}
                           </a>
                        ))}
                     </div>
                  </motion.div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10 w-full md:w-auto">
                     {[
                        { title: "Services", links: ["Gala & Galas", "Festivals", "Immersive", "Corporate"] },
                        { title: "Company", links: ["About", "Portfolio", "Our Team", "Journal"] },
                        { title: "Legal", links: ["Privacy Policy", "Terms", "Cookies"] },
                     ].map((col) => (
                        <div key={col.title}>
                           <h5 className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-[0.35em] sm:tracking-[0.4em] mb-4 sm:mb-5" style={{ color: T.gold }}>{col.title}</h5>
                           <ul className="space-y-2.5 sm:space-y-3">
                              {col.links.map(link => (
                                 <li key={link}>
                                    <a href="#"
                                       className="text-[10px] sm:text-[11px] font-light uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-colors"
                                       style={{ color: T.muted }}
                                       onMouseEnter={e => e.target.style.color = T.cream}
                                       onMouseLeave={e => e.target.style.color = T.muted}>
                                       {link}
                                    </a>
                                 </li>
                              ))}
                           </ul>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 pt-6 sm:pt-8">
                  <p className="text-[9px] sm:text-[10px] font-light uppercase tracking-[0.25em] sm:tracking-[0.3em] text-center sm:text-left" style={{ color: T.midMuted }}>
                     {d.footerCopyright}
                  </p>
                  <div className="flex items-center gap-2 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em]" style={{ color: T.midMuted }}>
                     <span>Crafted with</span>
                     <span style={{ color: T.gold }}>✦</span>
                     <span>for every extraordinary occasion</span>
                  </div>
               </div>
            </div>
         </footer>
      </div>
   );
}