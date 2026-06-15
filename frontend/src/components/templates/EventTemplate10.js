import { useState, useEffect, useRef } from "react";
import {
   motion,
   useScroll,
   useTransform,
   AnimatePresence,
   useInView,
} from "framer-motion";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
   bg: "#080A0F",
   surface: "#0E1118",
   card: "#111520",
   cardHover: "#161B2A",
   gold: "#D4A843",
   goldLight: "#F0C96A",
   crimson: "#C8293A",
   ice: "#A8BFCF",
   white: "#F2F0EB",
   muted: "#5A6070",
   border: "rgba(212,168,67,0.12)",
   borderHover: "rgba(212,168,67,0.35)",
};

// ─── DEFAULT DATA ─────────────────────────────────────────────────────────────
const DEFAULT_DATA = {
   agencyName: "FRAME EVENTS",
   tagline: "Where Every Moment Becomes Cinema",
   heroTitle: "Stories That Stay.",
   bio: "FRAME Events crafts cinematic experiences that blur the line between event and art. We engineer atmosphere, direct emotion, and produce moments that outlive the night.",
   aboutUsTitle: "The Vision",
   contactEmail: "direct@frameevents.com",
   phone: "+91 98100 00001",
   address: "Lower Parel, Mumbai, 400013",
   footerCopyright: `© ${new Date().getFullYear()} FRAME Events. All rights reserved.`,
   heroImage: "/images/templates/template-img-38.jpg",
   aboutImage: "/images/templates/template-img-39.jpg",
};

const DEFAULT_SERVICES = [
   { name: "Premiere Galas", desc: "Black-tie events engineered with film-grade lighting and spatial storytelling.", icon: "🎬", color: C.gold, img: "/images/templates/template-img-36.jpg" },
   { name: "Brand Activations", desc: "Immersive brand worlds built with projection, scent, and choreography.", icon: "💡", color: C.crimson, img: "/images/templates/template-img-37.jpg" },
   { name: "Festival Arenas", desc: "Large-scale festival stages with LED canopies and spatial audio grids.", icon: "🎭", color: C.ice, img: "/images/templates/template-img-41.jpg" },
   { name: "Corporate Summits", desc: "High-stakes conference environments that amplify leadership presence.", icon: "🏛", color: C.gold, img: "/images/templates/template-img-44.jpg" },
   { name: "Product Unveilings", desc: "Cinematic reveal moments that command attention and drive media.", icon: "📽", color: C.crimson, img: "/images/templates/template-img-45.jpg" },
   { name: "Immersive Worlds", desc: "Multi-room narrative installations powered by XR and live performance.", icon: "🌐", color: C.ice, img: "/images/templates/template-img-46.jpg" },
];

const DEFAULT_PROJECTS = [
   { name: "Noir Summit '24", desc: "A 3-day leadership summit transformed into a cinematic noir production.", tag: "Summit", color: C.gold, img: "/images/templates/template-img-44.jpg", stat: "2K", emoji: "🎬" },
   { name: "Scarlet Gala", desc: "Red-carpet gala with pyrotechnic synchronisation and live orchestra.", tag: "Gala", color: C.crimson, img: "/images/templates/template-img-45.jpg", stat: "800", emoji: "🎭" },
   { name: "The Grid", desc: "A tech expo inside a 20,000 sq ft LED matrix dome.", tag: "Expo", color: C.ice, img: "/images/templates/template-img-46.jpg", stat: "12K", emoji: "💡" },
   { name: "Chapter One", desc: "Intimate literary brand launch fusing film noir and editorial design.", tag: "Launch", color: C.gold, img: "/images/templates/template-img-47.jpg", stat: "500", emoji: "📽" },
];

const DEFAULT_PROCESS = [
   { step: "01", title: "Script", desc: "We decode your narrative: brand, audience, emotion, and the story you want told.", icon: "📜", color: C.gold },
   { step: "02", title: "Blueprint", desc: "Spatial plans, lighting schematics, and AV architecture drawn to the millimetre.", icon: "📐", color: C.crimson },
   { step: "03", title: "Production", desc: "Our crew builds the set — every truss, screen, and fixture positioned for impact.", icon: "🏗", color: C.ice },
   { step: "04", title: "Curtain Rise", desc: "On-night execution with military precision so you can be fully present.", icon: "🎬", color: C.gold },
   { step: "05", title: "The Reel", desc: "Cinematic highlight reels and content packs delivered within 48 hours.", icon: "📽", color: C.crimson },
];

const DEFAULT_TESTIMONIALS = [
   { name: "Nisha Kapoor", role: "CMO, Scarlet Brand", text: "FRAME turned our product launch into a film premiere. Guests literally gasped when the curtain dropped. Nothing like it.", avatar: "NK", color: C.gold },
   { name: "Arjun Mehta", role: "CEO, GridTech", text: "Our annual summit went from boardroom to cinematic experience. FRAME understands atmosphere at a level that's almost unfair.", avatar: "AM", color: C.crimson },
   { name: "Priya Rao", role: "Founder, Chapter One", text: "It felt like walking into a film. Every corner had intention. Our guests are still talking about it six months later.", avatar: "PR", color: C.ice },
];

const DEFAULT_TEAM = [
   { name: "Leila Nair", role: "Creative Director", badge: "Vision", color: C.gold },
   { name: "Dhruv Anand", role: "Production Architect", badge: "Build", color: C.crimson },
   { name: "Sia Pillai", role: "Lighting Designer", badge: "Atmosphere", color: C.ice },
   { name: "Kabir Rao", role: "Sound Director", badge: "Audio", color: C.gold },
];

const DEFAULT_PRICING = [
   { name: "Scene I", price: "₹1.5L", desc: "Intimate cinematic experiences for up to 300 guests.", color: C.ice, features: ["Up to 300 guests", "Curated lighting design", "PA system & AV", "Day-of direction", "Photo documentation"] },
   { name: "Scene II", price: "₹5L", desc: "Full cinematic production for 2,000+ guests.", color: C.gold, popular: true, features: ["Up to 2,000 guests", "Full LED & projection", "Film-crew production team", "Artist coordination", "Highlight reel", "Brand content suite"] },
   { name: "Scene III", price: "Custom", desc: "Legendary productions at any scale.", color: C.crimson, features: ["Unlimited scale", "Bespoke set design", "Global logistics", "PR & media relations", "Year-round partnership", "Full IP licensing"] },
];

const DEFAULT_FAQS = [
   { q: "Do you handle venue sourcing?", a: "Yes. We have relationships with 60+ premium venues across India and internationally. We scout, negotiate, and manage end-to-end." },
   { q: "Can you design custom stages?", a: "Always. Our production designers build fully bespoke stage environments — from intimate 200-seat theatres to 20,000-person arena builds." },
   { q: "How far ahead should we book?", a: "Large-format events: 6–12 months. Mid-scale galas: 3–6 months. For urgent activations, contact us — we've pulled off remarkable things in 6 weeks." },
   { q: "Do you do international events?", a: "Yes. Our logistics division has delivered events in Dubai, Singapore, London, and Cape Town. We travel, and we deliver." },
   { q: "What does post-event content look like?", a: "Within 48 hours: a curated photo archive, a cinematic highlight reel, and a social-ready content pack formatted for all platforms." },
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

const DEFAULT_CLIENTS = ["Noir Summit", "Scarlet Gala", "GridTech", "Chapter One", "Luminary Co", "ArcLight", "Obsidian", "VERSO", "Pantheon", "Dusk Labs"];

const DEFAULT_CATEGORIES = [
   { label: "Galas", emoji: "🎬", from: "#D4A843", to: "#F0C96A" },
   { label: "Tech Expos", emoji: "💡", from: "#A8BFCF", to: "#6B8FA8" },
   { label: "Festivals", emoji: "🎭", from: "#C8293A", to: "#E55566" },
   { label: "Corporate", emoji: "🏛", from: "#D4A843", to: "#C8293A" },
   { label: "Launches", emoji: "📽", from: "#A8BFCF", to: "#D4A843" },
   { label: "Immersive XR", emoji: "🌐", from: "#C8293A", to: "#A8BFCF" },
   { label: "Weddings", emoji: "🕊", from: "#F0C96A", to: "#A8BFCF" },
];

// ─── ANIMATED COUNTER ────────────────────────────────────────────────────────
function Counter({ to, suffix = "" }) {
   const ref = useRef(null);
   const inView = useInView(ref, { once: true });
   const [val, setVal] = useState(0);
   useEffect(() => {
      if (!inView) return;
      let start = null;
      const animate = (ts) => {
         if (!start) start = ts;
         const p = Math.min((ts - start) / 2200, 1);
         setVal(Math.floor(p * to));
         if (p < 1) requestAnimationFrame(animate);
         else setVal(to);
      };
      requestAnimationFrame(animate);
   }, [inView, to]);
   return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

// ─── MARQUEE ─────────────────────────────────────────────────────────────────
function Marquee({ items, speed = 22, reverse = false }) {
   return (
      <div className="flex overflow-hidden whitespace-nowrap py-4 border-y" style={{ background: C.surface, borderColor: C.border }}>
         <motion.div
            className="flex items-center gap-8 sm:gap-12"
            animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
            transition={{ duration: speed, ease: "linear", repeat: Infinity }}
         >
            {[...items, ...items, ...items, ...items].map((item, i) => (
               <span key={i} className="text-lg sm:text-2xl md:text-3xl font-black uppercase tracking-[0.15em] shrink-0 italic"
                  style={{ color: i % 2 === 0 ? C.gold : "transparent", WebkitTextStroke: i % 2 !== 0 ? `1.5px ${C.muted}` : "none" }}>
                  {item}
               </span>
            ))}
         </motion.div>
      </div>
   );
}

// ─── SECTION TAG ─────────────────────────────────────────────────────────────
function SectionTag({ color, children }) {
   return (
      <motion.span
         initial={{ opacity: 0, x: 30 }}
         whileInView={{ opacity: 1, x: 0 }}
         viewport={{ once: true }}
         transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
         className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] mb-3 sm:mb-4"
         style={{ background: `${color}10`, color, border: `1px solid ${color}35`, letterSpacing: "0.18em" }}
      >
         {children}
      </motion.span>
   );
}

// ─── FROM RIGHT ANIMATIONS ────────────────────────────────────────────────────
const rvR = (i = 0) => ({
   initial: { opacity: 0, x: 60 },
   whileInView: { opacity: 1, x: 0 },
   viewport: { once: true, margin: "-50px" },
   transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
});

const rvL = (i = 0) => ({
   initial: { opacity: 0, x: -60 },
   whileInView: { opacity: 1, x: 0 },
   viewport: { once: true, margin: "-50px" },
   transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
});

const rvU = (i = 0) => ({
   initial: { opacity: 0, y: 50, x: 30 },
   whileInView: { opacity: 1, y: 0, x: 0 },
   viewport: { once: true, margin: "-40px" },
   transition: { duration: 0.65, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] },
});

// ─── CAROUSEL COMPONENT ───────────────────────────────────────────────────────
function Carousel({ items, renderItem, autoInterval = 4500 }) {
   const [active, setActive] = useState(0);
   useEffect(() => {
      const t = setInterval(() => setActive(p => (p + 1) % items.length), autoInterval);
      return () => clearInterval(t);
   }, [items.length, autoInterval]);
   return { active, setActive };
}

// ─── FILM STRIP DIVIDER ───────────────────────────────────────────────────────
function FilmStrip() {
   return (
      <div className="relative overflow-hidden h-6 sm:h-8 flex items-center" style={{ background: C.surface }}>
         <div className="flex gap-2 w-full px-2">
            {Array.from({ length: 40 }).map((_, i) => (
               <div key={i} className="flex-shrink-0 w-4 h-3 sm:h-4 rounded-sm" style={{ background: i % 3 === 0 ? `${C.gold}25` : C.card }} />
            ))}
         </div>
         <div className="absolute inset-y-0 left-0 w-12 pointer-events-none" style={{ background: `linear-gradient(to right, ${C.surface}, transparent)` }} />
         <div className="absolute inset-y-0 right-0 w-12 pointer-events-none" style={{ background: `linear-gradient(to left, ${C.surface}, transparent)` }} />
      </div>
   );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function EventTemplate10({ data }) {
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

   const [activeSlide, setActiveSlide] = useState(0);
   const [activeTestimonial, setActiveTestimonial] = useState(0);
   const [activeFaq, setActiveFaq] = useState(null);
   const [lightbox, setLightbox] = useState(null);
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

   useEffect(() => {
      const t = setInterval(() => setActiveSlide(p => (p + 1) % projects.length), 5000);
      return () => clearInterval(t);
   }, [projects.length]);

   useEffect(() => {
      const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 4500);
      return () => clearInterval(t);
   }, [TESTIMONIALS.length]);

   useEffect(() => {
      const handleKey = (e) => { if (e.key === "Escape") setLightbox(null); };
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
   }, []);

   const heroRef = useRef(null);
   const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
   const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

   return (
      <div style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif", background: C.bg, color: C.white, overflowX: "hidden" }}>
         <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        body { font-family: 'Cormorant Garamond', Georgia, serif; }
        .mono { font-family: 'DM Mono', monospace; }
        ::-webkit-scrollbar { width: 3px; } ::-webkit-scrollbar-track { background: #080A0F; } ::-webkit-scrollbar-thumb { background: #D4A843; }
        .film-grain::after { content: ''; position: fixed; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E"); pointer-events: none; z-index: 9999; opacity: 0.4; }
      `}</style>

         {/* ── NAVBAR ──────────────────────────────────────────────────────────── */}
         <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-50 p-3 sm:p-4 sm:p-6"
         >
            <div className="max-w-7xl mx-auto">
               <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4"
                  style={{ background: "rgba(8,10,15,0.92)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${C.border}` }}>
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                     className="flex items-center gap-2 sm:gap-3">
                     <div className="w-6 h-6 sm:w-7 sm:h-7 relative flex-shrink-0">
                        <div className="w-full h-full border" style={{ borderColor: C.gold }} />
                        <div className="absolute inset-1 border" style={{ borderColor: C.gold, opacity: 0.4 }} />
                     </div>
                     <span className="font-black text-sm sm:text-base tracking-[0.25em] uppercase" style={{ color: C.white, fontFamily: "'DM Mono', monospace" }}>{d.agencyName}</span>
                  </motion.div>

                  <nav className="hidden lg:flex items-center gap-8 text-[11px] font-medium uppercase tracking-[0.2em] mono" style={{ color: C.muted }}>
                     {["Services", "Work", "Process", "Pricing", "Contact"].map((item, i) => (
                        <motion.a key={item} href={`#${item.toLowerCase()}`}
                           initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.1 * i + 0.3 }}
                           className="hover:text-white transition-colors relative group">
                           {item}
                           <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-px transition-all duration-300" style={{ background: C.gold }} />
                        </motion.a>
                     ))}
                  </nav>

                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
                     className="hidden lg:block">
                     <motion.a href="#contact" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                        className="px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] mono"
                        style={{ background: "transparent", border: `1px solid ${C.gold}`, color: C.gold }}>
                        Direct Inquiry
                     </motion.a>
                  </motion.div>

                  <button className="lg:hidden p-2 flex-shrink-0" style={{ color: C.gold }}
                     onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                           d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                     </svg>
                  </button>
               </div>

               <AnimatePresence>
                  {isMobileMenuOpen && (
                     <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="absolute left-0 right-0 mt-0 p-6 flex flex-col gap-4"
                        style={{ background: "rgba(8,10,15,0.98)", borderBottom: `1px solid ${C.border}` }}>
                        {["Services", "Work", "Process", "Pricing", "Contact"].map((item, i) => (
                           <motion.a key={item} href={`#${item.toLowerCase()}`}
                              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.06 }}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="text-sm font-medium uppercase tracking-[0.2em] mono" style={{ color: C.muted }}>{item}</motion.a>
                        ))}
                        <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}
                           className="w-full text-center py-3 text-xs font-black uppercase tracking-[0.2em] mono border"
                           style={{ borderColor: C.gold, color: C.gold }}>Direct Inquiry</a>
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>
         </motion.header>

         {/* ── HERO ────────────────────────────────────────────────────────────── */}
         <section ref={heroRef} className="relative min-h-[100svh] flex flex-col justify-center pt-28 sm:pt-32 pb-16 px-4 sm:px-6 overflow-hidden">
            {/* Cinematic vignette BG */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 70% 50%, ${C.gold}08 0%, transparent 60%)` }} />
            <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 20% 80%, ${C.crimson}06 0%, transparent 50%)` }} />
            {/* Grid lines */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
               style={{ backgroundImage: `linear-gradient(${C.gold} 1px, transparent 1px), linear-gradient(90deg, ${C.gold} 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />

            <motion.div style={{ y: heroY }} className="relative z-10 w-full max-w-7xl mx-auto">
               {/* Bento Hero Grid */}
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 md:gap-5 items-stretch min-h-[80vh]">

                  {/* Main title cell — spans 7 cols */}
                  <motion.div
                     initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                     className="lg:col-span-7 flex flex-col justify-end p-6 sm:p-8 md:p-12 relative overflow-hidden"
                     style={{ background: C.card, border: `1px solid ${C.border}`, minHeight: "clamp(300px, 45vh, 520px)" }}>
                     <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(135deg, ${C.gold}06 0%, transparent 60%)` }} />
                     <div className="absolute top-5 right-5 mono text-[10px] tracking-widest" style={{ color: C.muted }}>EST. 2016</div>
                     {/* Aperture decoration */}
                     <div className="absolute top-4 left-4 w-8 h-8 border-l border-t" style={{ borderColor: `${C.gold}50` }} />
                     <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b" style={{ borderColor: `${C.gold}50` }} />

                     <motion.div
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mono text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-4 sm:mb-5 flex items-center gap-2" style={{ color: C.gold }}>
                        <span className="w-5 h-px" style={{ background: C.gold }} />
                        Now Booking 2025–26
                     </motion.div>

                     <h1 className="text-[clamp(2.8rem,8vw,6.5rem)] xl:text-[7rem] font-bold italic leading-[0.88] tracking-tight mb-5 sm:mb-6" style={{ color: C.white }}>
                        {d.heroTitle.split(" ").map((w, i) => (
                           <motion.span key={i} className="inline-block mr-2"
                              initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                              style={{ color: i % 2 === 0 ? C.white : C.gold }}>
                              {w}
                           </motion.span>
                        ))}
                     </h1>

                     <motion.p initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
                        className="text-sm sm:text-base md:text-lg leading-relaxed max-w-xl font-light italic mb-6 sm:mb-8" style={{ color: C.ice }}>
                        {d.tagline}
                     </motion.p>

                     <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.65 }}
                        className="flex flex-col xs:flex-row gap-3">
                        <motion.a href="#contact" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                           className="text-center px-6 py-3 text-xs sm:text-sm font-black uppercase tracking-[0.2em] mono"
                           style={{ background: C.gold, color: C.bg }}>
                           Open the Frame →
                        </motion.a>
                        <motion.a href="#work" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                           className="text-center px-6 py-3 text-xs sm:text-sm font-medium uppercase tracking-[0.15em] mono border"
                           style={{ borderColor: C.border, color: C.muted }}>
                           View Reel
                        </motion.a>
                     </motion.div>
                  </motion.div>

                  {/* Right column — stacked bento cells */}
                  <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
                     {/* Hero image cell */}
                     <motion.div
                        initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="col-span-2 relative overflow-hidden"
                        style={{ border: `1px solid ${C.border}`, height: "clamp(180px, 28vh, 280px)" }}>
                        <img src={d.heroImage} alt="Event" className="w-full h-full object-cover" style={{ filter: "grayscale(20%) contrast(1.05)" }} />
                        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.bg}CC, transparent 50%)` }} />
                        <div className="absolute bottom-3 left-4 mono text-[9px] tracking-[0.25em] uppercase" style={{ color: C.gold }}>Noir Summit '24</div>
                     </motion.div>

                     {/* Stat: Events */}
                     <motion.div
                        initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.35 }}
                        className="flex flex-col justify-center p-4 sm:p-5 relative overflow-hidden"
                        style={{ background: C.card, border: `1px solid ${C.border}`, minHeight: "clamp(100px, 14vh, 150px)" }}>
                        <div className="text-2xl sm:text-3xl font-bold italic" style={{ color: C.gold }}><Counter to={350} suffix="+" /></div>
                        <div className="mono text-[9px] sm:text-[10px] mt-1 uppercase tracking-[0.2em]" style={{ color: C.muted }}>Events</div>
                     </motion.div>

                     {/* Stat: Satisfaction */}
                     <motion.div
                        initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.45 }}
                        className="flex flex-col justify-center p-4 sm:p-5"
                        style={{ background: C.crimson + "15", border: `1px solid ${C.crimson}30` }}>
                        <div className="text-2xl sm:text-3xl font-bold italic" style={{ color: C.crimson }}><Counter to={100} suffix="%" /></div>
                        <div className="mono text-[9px] sm:text-[10px] mt-1 uppercase tracking-[0.2em]" style={{ color: C.muted }}>Client Satisfaction</div>
                     </motion.div>
                  </div>

               </div>

               {/* Stats row */}
               <motion.div
                  initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="grid grid-cols-3 sm:grid-cols-3 mt-3 sm:mt-4 gap-3 sm:gap-4">
                  {[
                     { v: 15, s: "+", l: "Years" },
                     { v: 800, s: "+", l: "Reviews" },
                     { v: 20, s: "+", l: "Cities" },
                  ].map((stat, i) => (
                     <div key={i} className="p-4 sm:p-5 text-center border" style={{ background: C.surface, borderColor: C.border }}>
                        <div className="text-xl sm:text-2xl md:text-3xl font-bold italic" style={{ color: [C.gold, C.ice, C.crimson][i] }}>
                           <Counter to={stat.v} suffix={stat.s} />
                        </div>
                        <div className="mono text-[9px] sm:text-[10px] mt-1 uppercase tracking-widest" style={{ color: C.muted }}>{stat.l}</div>
                     </div>
                  ))}
               </motion.div>
            </motion.div>

            {/* Scroll hint */}
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
               className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
               <div className="mono text-[9px] tracking-[0.3em] uppercase" style={{ color: C.muted }}>Scroll</div>
               <div className="w-px h-8" style={{ background: `linear-gradient(to bottom, ${C.gold}, transparent)` }} />
            </motion.div>
         </section>

         {/* ── MARQUEE ─────────────────────────────────────────────────────────── */}
         <FilmStrip />
         <Marquee items={CLIENTS} speed={28} />
         <FilmStrip />

         {/* ── ABOUT — BENTO GRID ──────────────────────────────────────────────── */}
         <section id="about" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative" style={{ background: C.bg }}>
            <div className="max-w-7xl mx-auto">
               <div className="grid lg:grid-cols-12 gap-3 sm:gap-4 items-stretch">
                  {/* Image cell — tall */}
                  <motion.div {...rvL(0)} className="lg:col-span-5 relative overflow-hidden"
                     style={{ border: `1px solid ${C.border}`, minHeight: "clamp(260px, 40vw, 500px)" }}>
                     <img src={d.aboutImage} alt="About" className="w-full h-full object-cover" style={{ filter: "grayscale(15%) contrast(1.08)" }} />
                     <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.bg}EE 0%, transparent 55%)` }} />
                     {/* Floating stat */}
                     <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4.5, repeat: Infinity }}
                        className="absolute right-4 top-6 p-4 sm:p-5 border"
                        style={{ background: "rgba(8,10,15,0.92)", borderColor: `${C.gold}50`, backdropFilter: "blur(8px)" }}>
                        <div className="text-2xl sm:text-3xl font-bold italic" style={{ color: C.gold }}><Counter to={8} suffix="+" /></div>
                        <div className="mono text-[9px] uppercase tracking-widest mt-1" style={{ color: C.muted }}>Years</div>
                     </motion.div>
                  </motion.div>

                  {/* Right bento cells */}
                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                     {/* Title cell */}
                     <motion.div {...rvR(0)} className="sm:col-span-2 p-6 sm:p-8 relative overflow-hidden"
                        style={{ background: C.card, border: `1px solid ${C.border}` }}>
                        <div className="absolute top-4 right-4 w-6 h-6 border-r border-t" style={{ borderColor: `${C.gold}40` }} />
                        <SectionTag color={C.gold}>Our Vision ◈</SectionTag>
                        <h2 className="text-[clamp(1.8rem,4.5vw,3.5rem)] font-bold italic leading-tight tracking-tight mb-4" style={{ color: C.white }}>
                           {d.aboutUsTitle || "Crafting\nCinematic\nTruths."}
                        </h2>
                        <p className="text-sm sm:text-base leading-relaxed font-light italic" style={{ color: C.ice }}>{d.bio}</p>
                     </motion.div>

                     {/* Pill tags */}
                     <motion.div {...rvR(1)} className="p-5 sm:p-6 flex flex-col justify-between"
                        style={{ background: C.surface, border: `1px solid ${C.border}` }}>
                        <div className="mono text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: C.gold }}>Ethos</div>
                        <div className="flex flex-wrap gap-2">
                           {["Cinematic", "Intentional", "Precise", "Emotional"].map((p, i) => (
                              <span key={i} className="px-2.5 py-1 text-[10px] sm:text-xs font-medium uppercase tracking-wider border"
                                 style={{ borderColor: [C.gold, C.crimson, C.ice, C.gold][i] + "50", color: [C.gold, C.crimson, C.ice, C.gold][i], background: [C.gold, C.crimson, C.ice, C.gold][i] + "08" }}>
                                 {p}
                              </span>
                           ))}
                        </div>
                     </motion.div>

                     {/* CTA cell */}
                     <motion.div {...rvR(2)} className="p-5 sm:p-6 flex flex-col justify-between"
                        style={{ background: `${C.gold}10`, border: `1px solid ${C.gold}30` }}>
                        <div className="mono text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: C.gold }}>Direction</div>
                        <motion.a href="#contact" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                           className="block w-full text-center py-3 text-xs sm:text-sm font-black uppercase tracking-[0.2em] mono mt-auto"
                           style={{ background: C.gold, color: C.bg }}>
                           Begin Your Story →
                        </motion.a>
                     </motion.div>
                  </div>
               </div>
            </div>
         </section>

         {/* ── SERVICES — BENTO GRID ───────────────────────────────────────────── */}
         <section id="services" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6" style={{ background: C.surface }}>
            <div className="max-w-7xl mx-auto">
               <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
                  <div>
                     <SectionTag color={C.gold}>The Craft ◈</SectionTag>
                     <motion.h2 {...rvR(0)} className="text-[clamp(1.8rem,4.5vw,3.5rem)] font-bold italic tracking-tight" style={{ color: C.white }}>
                        Every Format,<br />
                        <motion.span initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ color: C.gold }}>Perfected.</motion.span>
                     </motion.h2>
                  </div>
                  <motion.p {...rvR(1)} className="text-sm max-w-xs font-light italic" style={{ color: C.muted }}>
                     Six disciplines, one language: atmosphere.
                  </motion.p>
               </div>

               {/* 3-col bento service grid */}
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {services.map((svc, i) => (
                     <motion.div key={i} {...rvU(i)}
                        whileHover={{ y: -8 }}
                        className="group relative overflow-hidden border cursor-pointer"
                        style={{ background: C.card, borderColor: C.border }}>
                        <div className="relative overflow-hidden" style={{ height: "clamp(140px, 18vw, 200px)" }}>
                           <img src={svc.img} alt={svc.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                              style={{ filter: "grayscale(30%) contrast(1.1)" }} />
                           <div className="absolute inset-0 transition-opacity duration-500"
                              style={{ background: `linear-gradient(to top, ${C.card}F5, ${svc.color || C.gold}10 100%)` }} />
                           <div className="absolute top-3 left-3 w-8 h-8 flex items-center justify-center text-base"
                              style={{ background: `${svc.color || C.gold}15`, border: `1px solid ${svc.color || C.gold}40` }}>
                              {svc.icon}
                           </div>
                           {/* Corner accent */}
                           <div className="absolute top-0 right-0 w-5 h-5 border-r border-t transition-colors duration-300"
                              style={{ borderColor: `${svc.color || C.gold}60` }} />
                        </div>
                        <div className="p-4 sm:p-5">
                           <h3 className="text-base sm:text-lg font-bold italic tracking-tight mb-1.5" style={{ color: svc.color || C.gold }}>{svc.name}</h3>
                           <p className="text-xs sm:text-sm leading-relaxed font-light" style={{ color: C.muted }}>{svc.desc}</p>
                           <div className="mt-3 mono text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: svc.color || C.gold }}>
                              View More →
                           </div>
                        </div>
                        <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500" style={{ background: svc.color || C.gold }} />
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── EVENT CATEGORIES ────────────────────────────────────────────────── */}
         <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6" style={{ background: C.bg }}>
            <div className="max-w-7xl mx-auto">
               <div className="text-center mb-8 sm:mb-12">
                  <SectionTag color={C.ice}>Format Guide ◈</SectionTag>
                  <motion.h2 {...rvR(1)} className="text-[clamp(1.8rem,4.5vw,3.5rem)] font-bold italic tracking-tight" style={{ color: C.white }}>
                     Every Occasion, a<br /><span style={{ color: C.ice }}>Different Lens.</span>
                  </motion.h2>
               </div>
               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
                  {CATEGORIES.map((cat, i) => (
                     <motion.div key={i}
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                        whileHover={{ y: -6, scale: 1.02 }}
                        className="relative p-4 sm:p-5 md:p-6 cursor-pointer overflow-hidden group border transition-all duration-300"
                        style={{ background: C.card, borderColor: C.border }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = cat.from + "70"}
                        onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                        <div className="text-2xl sm:text-3xl mb-2.5">{cat.emoji}</div>
                        <div className="font-semibold italic text-sm sm:text-base" style={{ color: C.white }}>{cat.label}</div>
                        <div className="absolute bottom-0 left-0 w-full h-0.5 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400"
                           style={{ background: `linear-gradient(90deg, ${cat.from}, ${cat.to})` }} />
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── PORTFOLIO — CAROUSEL + GRID ─────────────────────────────────────── */}
         <section id="work" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6" style={{ background: C.surface }}>
            <div className="max-w-7xl mx-auto">
               <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
                  <div>
                     <SectionTag color={C.crimson}>The Reel ◈</SectionTag>
                     <motion.h2 {...rvR(0)} className="text-[clamp(1.8rem,4.5vw,3.5rem)] font-bold italic tracking-tight" style={{ color: C.white }}>
                        Proof of<br /><span style={{ color: C.crimson }}>Direction.</span>
                     </motion.h2>
                  </div>
                  {/* Carousel dots */}
                  <div className="flex gap-2">
                     {projects.map((_, i) => (
                        <button key={i} onClick={() => setActiveSlide(i)}
                           className="h-1.5 transition-all duration-300"
                           style={{ width: i === activeSlide ? 28 : 8, background: i === activeSlide ? C.gold : C.muted + "50" }} />
                     ))}
                  </div>
               </div>

               {/* Carousel */}
               <AnimatePresence mode="wait">
                  <motion.div key={activeSlide}
                     initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -80 }}
                     transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                     className="relative overflow-hidden cursor-pointer group mb-3 sm:mb-4 border"
                     style={{ height: "clamp(240px, 45vh, 460px)", borderColor: `${projects[activeSlide]?.color || C.gold}30` }}
                     onClick={() => setActiveSlide((activeSlide + 1) % projects.length)}>
                     <img src={projects[activeSlide]?.img} alt={projects[activeSlide]?.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        style={{ filter: "grayscale(15%) contrast(1.08)" }} />
                     <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,10,15,0.92) 0%, rgba(8,10,15,0.3) 60%, transparent 100%)" }} />

                     {/* Tag */}
                     <div className="absolute top-5 left-6">
                        <span className="mono px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] border"
                           style={{ background: `${projects[activeSlide]?.color || C.gold}15`, color: projects[activeSlide]?.color || C.gold, borderColor: `${projects[activeSlide]?.color || C.gold}50` }}>
                           {projects[activeSlide]?.emoji} {projects[activeSlide]?.tag}
                        </span>
                     </div>

                     {/* Stat bubble */}
                     <div className="absolute top-5 right-6 p-3 sm:p-4 text-center border"
                        style={{ background: "rgba(8,10,15,0.85)", borderColor: `${projects[activeSlide]?.color || C.gold}50`, backdropFilter: "blur(8px)" }}>
                        <div className="text-lg sm:text-xl font-bold italic" style={{ color: projects[activeSlide]?.color || C.gold }}>{projects[activeSlide]?.stat}</div>
                        <div className="mono text-[8px] uppercase tracking-widest mt-0.5" style={{ color: C.muted }}>guests</div>
                     </div>

                     {/* Corner frames */}
                     <div className="absolute top-0 left-0 w-5 h-5 border-l border-t" style={{ borderColor: `${C.gold}60` }} />
                     <div className="absolute top-0 right-0 w-5 h-5 border-r border-t" style={{ borderColor: `${C.gold}60` }} />
                     <div className="absolute bottom-0 left-0 w-5 h-5 border-l border-b" style={{ borderColor: `${C.gold}60` }} />
                     <div className="absolute bottom-0 right-0 w-5 h-5 border-r border-b" style={{ borderColor: `${C.gold}60` }} />

                     <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-16">
                        <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold italic text-white tracking-tight leading-tight mb-2">{projects[activeSlide]?.name}</h3>
                        <p className="text-xs sm:text-sm font-light italic" style={{ color: "rgba(255,255,255,0.5)" }}>{projects[activeSlide]?.desc}</p>
                     </div>

                     {/* Progress bar */}
                     <motion.div className="absolute bottom-0 left-0 h-0.5"
                        style={{ background: projects[activeSlide]?.color || C.gold }}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        key={activeSlide}
                        transition={{ duration: 5, ease: "linear" }} />
                  </motion.div>
               </AnimatePresence>

               {/* Thumbnail row */}
               <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
                  {projects.map((p, i) => (
                     <motion.div key={i}
                        initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                        onClick={() => setActiveSlide(i)} whileHover={{ scale: 1.03 }}
                        className="relative overflow-hidden cursor-pointer border transition-all duration-300"
                        style={{ height: "clamp(55px, 9vw, 85px)", borderColor: i === activeSlide ? (p.color || C.gold) : "transparent" }}>
                        <img src={p.img} alt={p.name} className="w-full h-full object-cover" style={{ filter: "grayscale(40%)", opacity: i === activeSlide ? 1 : 0.5 }} />
                        <div className="absolute inset-0 flex items-end p-1.5" style={{ background: "rgba(8,10,15,0.5)" }}>
                           <span className="mono text-[8px] uppercase tracking-wider text-white truncate">{p.name}</span>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         <Marquee items={["CINEMATIC", "PRECISE", "ATMOSPHERIC", "INTENTIONAL", "ELEVATED", "DIRECTED"]} reverse speed={20} />

         {/* ── PROCESS ─────────────────────────────────────────────────────────── */}
         <section id="process" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6" style={{ background: C.bg }}>
            <div className="max-w-7xl mx-auto">
               <div className="text-center mb-10 sm:mb-16">
                  <SectionTag color={C.gold}>The Method ◈</SectionTag>
                  <motion.h2 {...rvR(1)} className="text-[clamp(1.8rem,4.5vw,3.5rem)] font-bold italic tracking-tight" style={{ color: C.white }}>
                     The FRAME<br /><span style={{ color: C.gold }}>Process.</span>
                  </motion.h2>
               </div>

               {/* Horizontal bento process grid */}
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
                  {PROCESS.map((step, i) => (
                     <motion.div key={i}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                        whileHover={{ y: -6 }}
                        className="relative p-5 sm:p-6 border group transition-all duration-300"
                        style={{ background: C.card, borderColor: C.border }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = step.color + "50"}
                        onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                        {/* Step number */}
                        <div className="mono text-[10px] tracking-[0.2em] mb-4" style={{ color: step.color }}>{step.step}</div>
                        <div className="text-2xl sm:text-3xl mb-3">{step.icon}</div>
                        <h3 className="font-bold italic text-base sm:text-lg mb-2 tracking-tight" style={{ color: step.color }}>{step.title}</h3>
                        <p className="text-xs sm:text-sm leading-relaxed font-light" style={{ color: C.muted }}>{step.desc}</p>
                        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500" style={{ background: step.color }} />
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── WHY US — STATS BENTO ────────────────────────────────────────────── */}
         <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6" style={{ background: C.surface }}>
            <div className="max-w-7xl mx-auto">
               <div className="text-center mb-10 sm:mb-16">
                  <SectionTag color={C.ice}>Why FRAME ◈</SectionTag>
                  <motion.h2 {...rvR(1)} className="text-[clamp(1.8rem,4.5vw,3.5rem)] font-bold italic tracking-tight" style={{ color: C.white }}>
                     Evidence<br /><span style={{ color: C.ice }}>Speaks.</span>
                  </motion.h2>
               </div>

               {/* Bento stats + features grid */}
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-5">
                  {[
                     { v: 350, s: "+", l: "Events Directed", icon: "🎬", color: C.gold },
                     { v: 100, s: "%", l: "Client Retention", icon: "🏛", color: C.crimson },
                     { v: 800, s: "+", l: "Five-Star Reviews", icon: "◈", color: C.ice },
                     { v: 22, s: "+", l: "Cities Worldwide", icon: "📍", color: C.gold },
                  ].map((stat, i) => (
                     <motion.div key={i}
                        initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="p-5 sm:p-7 border"
                        style={{ background: C.card, borderColor: C.border }}>
                        <div className="text-xl sm:text-2xl mb-2" style={{ color: stat.color }}>{stat.icon}</div>
                        <div className="text-2xl sm:text-4xl font-bold italic" style={{ color: stat.color }}><Counter to={stat.v} suffix={stat.s} /></div>
                        <div className="mono text-[9px] sm:text-[10px] mt-1.5 uppercase tracking-[0.2em]" style={{ color: C.muted }}>{stat.l}</div>
                     </motion.div>
                  ))}
               </div>

               <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
                  {[
                     { title: "Film-grade Production", desc: "Every event is approached as a cinematic project: scouted, scripted, lit, and directed.", icon: "🎬", color: C.gold },
                     { title: "Zero-margin Execution", desc: "Flawless on-night delivery — rehearsed, timed to the second, with contingencies built in.", icon: "⏱", color: C.ice },
                     { title: "Story Beyond the Night", desc: "We produce content assets that extend your event's impact across every channel and audience.", icon: "📽", color: C.crimson },
                  ].map((item, i) => (
                     <motion.div key={i}
                        initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}
                        className="flex gap-4 p-5 sm:p-7 border"
                        style={{ background: C.card, borderColor: C.border }}>
                        <div className="text-xl flex-shrink-0 mt-0.5">{item.icon}</div>
                        <div>
                           <h4 className="font-bold italic text-sm sm:text-base mb-1.5" style={{ color: item.color }}>{item.title}</h4>
                           <p className="text-xs sm:text-sm leading-relaxed font-light" style={{ color: C.muted }}>{item.desc}</p>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── PRICING ─────────────────────────────────────────────────────────── */}
         <section id="pricing" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6" style={{ background: C.bg }}>
            <div className="max-w-6xl mx-auto">
               <div className="text-center mb-10 sm:mb-16">
                  <SectionTag color={C.gold}>Packages ◈</SectionTag>
                  <motion.h2 {...rvR(1)} className="text-[clamp(1.8rem,4.5vw,3.5rem)] font-bold italic tracking-tight" style={{ color: C.white }}>
                     Choose Your<br /><span style={{ color: C.gold }}>Scene.</span>
                  </motion.h2>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 items-start">
                  {PRICING.map((pkg, i) => (
                     <motion.div key={i}
                        initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.65, delay: i * 0.12 }}
                        whileHover={{ y: -10 }}
                        className="relative border overflow-hidden"
                        style={{
                           background: pkg.popular ? `${C.gold}08` : C.card,
                           borderColor: pkg.popular ? C.gold : C.border,
                        }}>
                        {pkg.popular && <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${C.gold}, ${C.crimson}, ${C.ice})` }} />}
                        <div className="p-6 sm:p-8">
                           {pkg.popular && (
                              <div className="mono text-[9px] uppercase tracking-[0.25em] mb-4 border inline-block px-2.5 py-1"
                                 style={{ borderColor: `${C.gold}50`, color: C.gold, background: `${C.gold}10` }}>★ Feature</div>
                           )}
                           <div className="text-2xl mb-3">{["◻", "◈", "◆"][i]}</div>
                           <h3 className="text-xl sm:text-2xl font-bold italic tracking-tight mb-1.5" style={{ color: pkg.popular ? C.gold : pkg.color }}>{pkg.name}</h3>
                           <p className="text-xs sm:text-sm mb-5 font-light italic" style={{ color: C.muted }}>{pkg.desc}</p>
                           <div className="text-3xl sm:text-4xl md:text-5xl font-bold italic mb-6" style={{ color: pkg.popular ? C.white : pkg.color }}>
                              {pkg.price}{pkg.price !== "Custom" && <span className="text-xs font-normal opacity-40 ml-1">onwards</span>}
                           </div>
                           <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                              {pkg.features.map((f, j) => (
                                 <li key={j} className="flex items-center gap-2.5 text-xs sm:text-sm font-light">
                                    <span className="mono text-[10px] flex-shrink-0" style={{ color: pkg.color }}>◈</span>
                                    <span style={{ color: C.muted }}>{f}</span>
                                 </li>
                              ))}
                           </ul>
                           <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                              className="w-full py-3 sm:py-4 text-xs sm:text-sm font-black uppercase tracking-[0.2em] mono border"
                              style={pkg.popular
                                 ? { background: C.gold, color: C.bg, borderColor: C.gold }
                                 : { background: "transparent", color: pkg.color, borderColor: pkg.color + "50" }}>
                              Select Scene →
                           </motion.button>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── TESTIMONIALS ────────────────────────────────────────────────────── */}
         <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6" style={{ background: C.surface }}>
            <div className="max-w-4xl mx-auto">
               <div className="text-center mb-10 sm:mb-16">
                  <SectionTag color={C.ice}>Testimonials ◈</SectionTag>
                  <motion.h2 {...rvR(1)} className="text-[clamp(1.8rem,4.5vw,3.5rem)] font-bold italic tracking-tight" style={{ color: C.white }}>
                     The Audience<br /><span style={{ color: C.ice }}>Responds.</span>
                  </motion.h2>
               </div>

               <AnimatePresence mode="wait">
                  <motion.div key={activeTestimonial}
                     initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }}
                     transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                     className="relative p-6 sm:p-10 border"
                     style={{ background: C.card, borderColor: `${TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.color || C.gold}30` }}>
                     {/* Corner frames */}
                     <div className="absolute top-0 left-0 w-6 h-6 border-l border-t" style={{ borderColor: `${TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.color || C.gold}60` }} />
                     <div className="absolute top-0 right-0 w-6 h-6 border-r border-t" style={{ borderColor: `${TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.color || C.gold}60` }} />
                     <div className="absolute bottom-0 left-0 w-6 h-6 border-l border-b" style={{ borderColor: `${TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.color || C.gold}60` }} />
                     <div className="absolute bottom-0 right-0 w-6 h-6 border-r border-b" style={{ borderColor: `${TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.color || C.gold}60` }} />

                     <div className="text-5xl sm:text-7xl font-bold absolute top-3 left-5 leading-none opacity-10 italic"
                        style={{ color: TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.color || C.gold }}>"</div>
                     <p className="text-lg sm:text-2xl md:text-3xl font-light italic leading-relaxed mb-7 sm:mb-9 relative z-10 text-center" style={{ color: C.white }}>
                        "{TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.text}"
                     </p>
                     <div className="flex items-center justify-center gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center font-bold text-sm border"
                           style={{ background: `${TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.color || C.gold}15`, borderColor: TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.color || C.gold, color: TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.color || C.gold }}>
                           {TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.avatar}
                        </div>
                        <div>
                           <div className="font-bold italic text-sm sm:text-base" style={{ color: C.white }}>{TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.name}</div>
                           <div className="mono text-[10px] uppercase tracking-[0.18em]" style={{ color: C.muted }}>{TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.role}</div>
                        </div>
                     </div>
                  </motion.div>
               </AnimatePresence>

               <div className="flex justify-center gap-2.5 mt-6">
                  {TESTIMONIALS.map((_, i) => (
                     <button key={i} onClick={() => setActiveTestimonial(i)}
                        className="h-1.5 transition-all duration-300"
                        style={{ width: i === activeTestimonial % TESTIMONIALS.length ? 28 : 8, background: i === activeTestimonial % TESTIMONIALS.length ? C.gold : C.muted + "40" }} />
                  ))}
               </div>
            </div>
         </section>

         {/* ── TEAM ────────────────────────────────────────────────────────────── */}
         <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6" style={{ background: C.bg }}>
            <div className="max-w-6xl mx-auto">
               <div className="text-center mb-10 sm:mb-16">
                  <SectionTag color={C.gold}>The Crew ◈</SectionTag>
                  <motion.h2 {...rvR(1)} className="text-[clamp(1.8rem,4.5vw,3.5rem)] font-bold italic tracking-tight" style={{ color: C.white }}>
                     Behind the<br /><span style={{ color: C.gold }}>Lens.</span>
                  </motion.h2>
               </div>
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {TEAM.map((member, i) => (
                     <motion.div key={i}
                        initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.1 }}
                        whileHover={{ y: -8 }}
                        className="group border overflow-hidden cursor-pointer"
                        style={{ background: C.card, borderColor: C.border }}>
                        <div className="relative flex items-center justify-center overflow-hidden"
                           style={{ height: "clamp(110px, 16vw, 200px)", background: `${member.color}08` }}>
                           <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center font-bold text-xl sm:text-2xl md:text-3xl border"
                              style={{ background: `${member.color}12`, borderColor: `${member.color}50`, color: member.color }}>
                              {member.name[0]}
                           </div>
                           {/* Aperture */}
                           <div className="absolute top-2 left-2 w-4 h-4 border-l border-t" style={{ borderColor: `${member.color}40` }} />
                           <div className="absolute bottom-2 right-2 w-4 h-4 border-r border-b" style={{ borderColor: `${member.color}40` }} />
                        </div>
                        <div className="p-4 sm:p-5">
                           <span className="mono text-[9px] uppercase tracking-[0.2em] border inline-block px-2 py-0.5 mb-2"
                              style={{ borderColor: `${member.color}40`, color: member.color, background: `${member.color}08` }}>
                              {member.badge}
                           </span>
                           <h4 className="font-bold italic text-sm sm:text-base" style={{ color: C.white }}>{member.name}</h4>
                           <p className="mono text-[10px] sm:text-xs uppercase tracking-[0.15em] mt-0.5" style={{ color: C.muted }}>{member.role}</p>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── GALLERY ─────────────────────────────────────────────────────────── */}
         <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6" style={{ background: C.surface }}>
            <div className="max-w-7xl mx-auto">
               <div className="text-center mb-10 sm:mb-16">
                  <SectionTag color={C.ice}>Gallery ◈</SectionTag>
                  <motion.h2 {...rvR(1)} className="text-[clamp(1.8rem,4.5vw,3.5rem)] font-bold italic tracking-tight" style={{ color: C.white }}>
                     Stills from the<br /><span style={{ color: C.ice }}>Archive.</span>
                  </motion.h2>
               </div>

               {/* Masonry bento grid */}
               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
                  {GALLERY.map((img, i) => (
                     <motion.div key={i}
                        initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setLightbox(img)}
                        className="relative overflow-hidden cursor-pointer group border border-transparent transition-colors duration-300"
                        style={{ height: i % 4 === 0 ? "clamp(160px, 20vw, 240px)" : i % 4 === 2 ? "clamp(100px, 14vw, 160px)" : "clamp(130px, 16vw, 200px)" }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = `${C.gold}50`}
                        onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}>
                        <img src={img} alt={`Gallery ${i}`}
                           className="w-full h-full object-cover transition-all duration-500 group-hover:scale-108"
                           style={{ filter: "grayscale(25%) contrast(1.05)" }} />
                        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center"
                           style={{ background: "rgba(8,10,15,0.4)" }}>
                           <span className="mono text-[10px] uppercase tracking-[0.2em]" style={{ color: C.gold }}>View</span>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
               {lightbox && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                     className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8"
                     onClick={() => setLightbox(null)}>
                     <motion.div initial={{ scale: 0.85, x: 60 }} animate={{ scale: 1, x: 0 }} exit={{ scale: 0.85 }}
                        className="relative border" style={{ borderColor: `${C.gold}40` }}>
                        <img src={lightbox} alt="Gallery" className="max-w-4xl w-full max-h-[85vh] object-contain" />
                        {/* Corner frames on lightbox */}
                        <div className="absolute top-0 left-0 w-5 h-5 border-l border-t" style={{ borderColor: C.gold }} />
                        <div className="absolute top-0 right-0 w-5 h-5 border-r border-t" style={{ borderColor: C.gold }} />
                        <div className="absolute bottom-0 left-0 w-5 h-5 border-l border-b" style={{ borderColor: C.gold }} />
                        <div className="absolute bottom-0 right-0 w-5 h-5 border-r border-b" style={{ borderColor: C.gold }} />
                     </motion.div>
                     <button className="absolute top-5 right-5 mono text-xs uppercase tracking-[0.2em]" style={{ color: C.gold }} onClick={() => setLightbox(null)}>Close ✕</button>
                  </motion.div>
               )}
            </AnimatePresence>
         </section>

         {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
         <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6" style={{ background: C.bg }}>
            <div className="max-w-3xl mx-auto">
               <div className="text-center mb-10 sm:mb-16">
                  <SectionTag color={C.gold}>FAQ ◈</SectionTag>
                  <motion.h2 {...rvR(1)} className="text-[clamp(1.8rem,4.5vw,3.5rem)] font-bold italic tracking-tight" style={{ color: C.white }}>
                     In the Brief<br /><span style={{ color: C.gold }}>Details.</span>
                  </motion.h2>
               </div>
               <div className="space-y-2.5 sm:space-y-3">
                  {FAQS.map((faq, i) => (
                     <motion.div key={i}
                        initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                        className="border overflow-hidden cursor-pointer transition-colors duration-200"
                        style={{ background: C.card, borderColor: activeFaq === i ? C.gold : C.border }}
                        onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                        <div className="flex items-center justify-between p-4 sm:p-5 gap-4">
                           <div className="flex items-center gap-3">
                              <span className="mono text-[9px]" style={{ color: activeFaq === i ? C.gold : C.muted }}>◈</span>
                              <h4 className="font-semibold italic text-sm sm:text-base" style={{ color: C.white }}>{faq.q}</h4>
                           </div>
                           <motion.div animate={{ rotate: activeFaq === i ? 45 : 0 }}
                              className="w-6 h-6 flex-shrink-0 flex items-center justify-center border mono text-sm"
                              style={{ borderColor: activeFaq === i ? C.gold : C.muted, color: activeFaq === i ? C.gold : C.muted }}>+</motion.div>
                        </div>
                        <AnimatePresence>
                           {activeFaq === i && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                                 <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm leading-relaxed font-light italic border-t" style={{ color: C.muted, borderColor: `${C.gold}20` }}>{faq.a}</div>
                              </motion.div>
                           )}
                        </AnimatePresence>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── CONTACT ─────────────────────────────────────────────────────────── */}
         <section id="contact" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden" style={{ background: C.surface }}>
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
               style={{ backgroundImage: `linear-gradient(${C.gold} 1px, transparent 1px), linear-gradient(90deg, ${C.gold} 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
            <div className="max-w-6xl mx-auto relative z-10">
               <div className="text-center mb-10 sm:mb-16">
                  <SectionTag color={C.gold}>Contact ◈</SectionTag>
                  <motion.h2 {...rvR(1)} className="text-[clamp(2rem,5.5vw,4.5rem)] xl:text-7xl font-bold italic tracking-tight leading-tight" style={{ color: C.white }}>
                     Ready to Direct<br /><span style={{ color: C.gold }}>Your Story?</span>
                  </motion.h2>
               </div>

               <div className="max-w-2xl mx-auto">
                  <div className="space-y-3 sm:space-y-4">
                     {[
                        { icon: "✉", label: "Email", val: d.contactEmail, color: C.gold },
                        { icon: "◉", label: "Phone", val: d.phone || "+91 98100 00001", color: C.ice },
                        { icon: "◈", label: "Studio", val: d.address, color: C.crimson },
                     ].map((item, i) => (
                        <motion.div key={i}
                           initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.1 }}
                           whileHover={{ x: 8 }}
                           className="flex gap-4 p-4 sm:p-6 border"
                           style={{ background: C.card, borderColor: C.border }}>
                           <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center text-base border"
                              style={{ background: `${item.color}10`, borderColor: `${item.color}40`, color: item.color }}>{item.icon}</div>
                           <div className="min-w-0">
                              <div className="mono text-[9px] uppercase tracking-[0.2em] mb-0.5" style={{ color: item.color }}>{item.label}</div>
                              <div className="font-light italic text-sm sm:text-base break-all" style={{ color: C.white }}>{item.val}</div>
                           </div>
                        </motion.div>
                     ))}

                     <motion.div
                        initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ delay: 0.4 }}
                        className="p-5 sm:p-6 border text-center"
                        style={{ background: `${C.gold}06`, borderColor: `${C.gold}35` }}>
                        <div className="font-bold italic text-lg sm:text-xl mb-1" style={{ color: C.gold }}>350+ Events. One Standard.</div>
                        <div className="text-xs sm:text-sm font-light italic" style={{ color: C.muted }}>Join the roster of legendary productions.</div>
                     </motion.div>
                  </div>


               </div>
            </div>
         </section>

         {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
         <footer className="px-4 sm:px-6 pt-12 sm:pt-16 pb-6 sm:pb-8 border-t" style={{ background: C.bg, borderColor: C.border }}>
            <div className="max-w-7xl mx-auto">
               <div className="flex flex-col md:flex-row justify-between items-start gap-8 sm:gap-10 pb-8 sm:pb-12 border-b" style={{ borderColor: C.border }}>
                  <motion.div {...rvL(0)} className="max-w-xs">
                     <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
                        <div className="w-6 h-6 border relative flex-shrink-0" style={{ borderColor: C.gold }}>
                           <div className="absolute inset-1 border" style={{ borderColor: C.gold, opacity: 0.3 }} />
                        </div>
                        <span className="mono font-black text-sm tracking-[0.25em] uppercase" style={{ color: C.white }}>{d.agencyName}</span>
                     </div>
                     <p className="text-xs sm:text-sm font-light italic leading-relaxed" style={{ color: C.muted }}>{d.tagline}</p>
                     <div className="flex gap-2 mt-4 sm:mt-5">
                        {["in", "tw", "ig", "yt"].map(s => (
                           <a key={s} href="#"
                              className="w-7 h-7 flex items-center justify-center mono text-[9px] uppercase border transition-all hover:scale-110"
                              style={{ background: `${C.gold}08`, borderColor: `${C.gold}35`, color: C.gold }}>
                              {s}
                           </a>
                        ))}
                     </div>
                  </motion.div>

                  <motion.div {...rvR(0)} className="grid grid-cols-3 gap-6 sm:gap-10 w-full md:w-auto">
                     {[
                        { title: "Services", links: ["Galas", "Tech Expos", "Festivals", "Corporate"] },
                        { title: "Company", links: ["About", "Projects", "Crew", "Journal"] },
                        { title: "Legal", links: ["Privacy", "Terms", "Cookies"] },
                     ].map(col => (
                        <div key={col.title}>
                           <h5 className="mono text-[9px] uppercase tracking-[0.25em] mb-3 sm:mb-4" style={{ color: C.gold }}>{col.title}</h5>
                           <ul className="space-y-2 sm:space-y-2.5">
                              {col.links.map(link => (
                                 <li key={link}>
                                    <a href="#" className="text-[10px] sm:text-xs font-light italic hover:text-white transition-colors uppercase tracking-[0.12em]" style={{ color: C.muted }}>{link}</a>
                                 </li>
                              ))}
                           </ul>
                        </div>
                     ))}
                  </motion.div>
               </div>

               <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6 sm:pt-8">
                  <p className="mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em]" style={{ color: C.muted }}>{d.footerCopyright}</p>
                  <div className="flex items-center gap-2 mono text-[10px] uppercase tracking-[0.15em]" style={{ color: C.muted }}>
                     <span>Crafted with</span>
                     <span style={{ color: C.gold }}>◈</span>
                     <span>for every frame that matters</span>
                  </div>
               </div>
            </div>
         </footer>
      </div>
   );
}