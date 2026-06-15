import { useState, useEffect, useRef } from "react";
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
const C = {
   deepOcean: "#04111D",
   midnight: "#071825",
   cardSurface: "#0C2233",
   cardElevated: "#122940",
   clay: "#E8622A",
   clayLight: "#F5894D",
   clayDim: "#C94E1A",
   teal: "#1DCACC",
   tealDim: "#0FA3A5",
   gold: "#F0B429",
   cream: "#FFF4E6",
   white: "#FFFFFF",
   muted: "#7A9AB0",
   dimMuted: "#3D5A6E",
   glass: "rgba(255,255,255,0.04)",
};

// ─── DEFAULT DATA ─────────────────────────────────────────────────────────────
const DEFAULT_DATA = {
   agencyName: "PULSE EVENTS",
   tagline: "Where Every Moment Becomes Legend",
   heroTitle: "Craft the Extraordinary",
   bio: "PULSE is a world-class event architecture studio. We sculpt immersive worlds — from rooftop galas and stadium concerts to intimate brand activations — with obsessive craft and an eye for the unforgettable.",
   aboutUsTitle: "Built for the Bold",
   contactEmail: "hello@pulseevents.co",
   phone: "+91 98765 43210",
   address: "Lower Parel, Mumbai, 400013",
   footerCopyright: `© ${new Date().getFullYear()} PULSE Events. All rights reserved.`,
   heroImage: "/images/templates/template-img-38.jpg",
   aboutImage: "/images/templates/template-img-39.jpg",
   services: [],
   projects: [],
};

const DEFAULT_SERVICES = [
   { name: "Live Concerts", desc: "Monumental stage builds with spatial audio that turns crowds into believers.", icon: "🎤", color: C.clay, img: "/images/templates/template-img-36.jpg" },
   { name: "Brand Activations", desc: "Experiential pop-ups that burn your brand into memory forever.", icon: "🚀", color: C.teal, img: "/images/templates/template-img-37.jpg" },
   { name: "Gala Evenings", desc: "Black-tie experiences dripping in detail, drama, and distinction.", icon: "🥂", color: C.gold, img: "/images/templates/template-img-41.jpg" },
   { name: "Immersive Festivals", desc: "Multi-day journeys where art, music, and culture converge.", icon: "🌐", color: C.clay, img: "/images/templates/template-img-44.jpg" },
   { name: "Tech Summits", desc: "Conference architecture that sparks ideas and forges lasting connections.", icon: "💡", color: C.teal, img: "/images/templates/template-img-45.jpg" },
   { name: "Product Reveals", desc: "Cinematic launch moments engineered to go viral and stay iconic.", icon: "✨", color: C.gold, img: "/images/templates/template-img-46.jpg" },
];

const DEFAULT_PROJECTS = [
   { name: "Horizon Festival", desc: "A 3-day art & music odyssey attended by 25,000 across a coastal amphitheatre.", tag: "Festival", color: C.clay, img: "/images/templates/template-img-44.jpg", stat: "25K", emoji: "🎵", year: "2024" },
   { name: "TechNova Summit", desc: "Global innovation conference with holographic keynotes in a converted warehouse.", tag: "Summit", color: C.teal, img: "/images/templates/template-img-45.jpg", stat: "8K", emoji: "💡", year: "2024" },
   { name: "Obsidian Gala", desc: "Luxury fundraiser gala blending fire art and live orchestra for 600 guests.", tag: "Gala", color: C.gold, img: "/images/templates/template-img-46.jpg", stat: "600", emoji: "🥂", year: "2023" },
   { name: "Launch: NOVA", desc: "A cinematic brand reveal for a global EV marque that broke the internet.", tag: "Brand", color: C.clay, img: "/images/templates/template-img-47.jpg", stat: "12M", emoji: "✨", year: "2023" },
];

const DEFAULT_TESTIMONIALS = [
   { name: "Anika Sharma", role: "CEO, Horizon Group", text: "PULSE didn't just deliver an event — they delivered a world. Our guests are still talking about it six months later. Nothing short of masterful.", avatar: "AS", color: C.clay },
   { name: "Rohan Iyer", role: "Head of Brand, NovaCorp", text: "The cinematic precision they bring is unmatched. Our launch felt like an Apple Keynote crossed with Cannes. Absolutely transformative for the brand.", avatar: "RI", color: C.teal },
   { name: "Priya Mehta", role: "Director, Luxe Foundations", text: "From first brief to final bow, PULSE operated at a level I've never experienced. Sophisticated, soulful, and supremely executed.", avatar: "PM", color: C.gold },
];

const DEFAULT_PROCESS = [
   { step: "01", title: "Discovery", desc: "We decode your brief into a spatial concept — mood, audience, purpose, and the one moment guests will never forget.", icon: "🔍", color: C.clay },
   { step: "02", title: "Architecture", desc: "Full production blueprints: venue schematics, lighting design, AV maps, flow choreography, and risk management.", icon: "📐", color: C.teal },
   { step: "03", title: "Fabrication", desc: "Our crews build every set piece, rig every light, and wire every speaker to exacting specification.", icon: "🏗", color: C.gold },
   { step: "04", title: "Premiere", desc: "Flawless on-day execution. You walk the room as a guest. We run every backstage moment.", icon: "🎬", color: C.clay },
   { step: "05", title: "Afterglow", desc: "Within 48h: curated photo drops, highlight reels, press kits, and full post-event analytics.", icon: "📸", color: C.teal },
];

const DEFAULT_TEAM = [
   { name: "Zoya Kapoor", role: "Creative Principal", badge: "Vision", color: C.clay },
   { name: "Arjun Nair", role: "Production Architect", badge: "Build", color: C.teal },
   { name: "Leila Chandra", role: "Atmosphere Designer", badge: "Light", color: C.gold },
   { name: "Vikram Das", role: "Sound Director", badge: "Audio", color: C.clay },
];

const DEFAULT_PRICING = [
   { name: "Prelude", price: "₹1.5L", desc: "Intimate events up to 250 guests with full production support.", color: C.teal, features: ["Up to 250 guests", "Stage & lighting design", "PA & AV system", "On-day coordination", "Event photography"] },
   { name: "Overture", price: "₹5L", desc: "Our signature package for mid-scale productions.", color: C.clay, popular: true, features: ["Up to 2,500 guests", "Custom set design", "LED & projection mapping", "Production crew of 20", "Artist/speaker booking", "Full content package"] },
   { name: "Opus", price: "Custom", desc: "Flagship productions that demand everything.", color: C.gold, features: ["Unlimited scale", "Bespoke world-building", "Global logistics", "Dedicated account team", "PR & media strategy", "365-day partnership"] },
];

const DEFAULT_FAQS = [
   { q: "How far in advance should we book?", a: "For large-scale festivals and summits, 9–12 months is ideal. For corporate and gala events, 6–10 weeks gives us full runway to craft something exceptional." },
   { q: "Do you handle international events?", a: "Yes. We've produced events in Dubai, Singapore, London, and Bali. Our international production division handles end-to-end logistics, local crew, and compliance." },
   { q: "Can you source artists and speakers?", a: "Absolutely. We have direct relationships with agents representing top international performers, keynote speakers, and immersive artists across every genre." },
   { q: "What post-event content do you deliver?", a: "Within 48 hours: a curated photo gallery, highlight reel, behind-the-scenes short, and a full social media content pack ready to publish." },
   { q: "Do you do hybrid or virtual events?", a: "Yes. We've pioneered hybrid event formats with multi-camera live streaming, interactive digital lobbies, and synchronized remote audience participation." },
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

const DEFAULT_CLIENTS = ["Horizon Group", "NovaCorp", "TechNova", "Luxe Found.", "Apex Brand", "CrestMedia", "OrbitXR", "SummitCo", "FluxHouse", "DawnLabel"];

const DEFAULT_CATEGORIES = [
   { label: "Concerts", emoji: "🎤", from: C.clay, to: "#B83000" },
   { label: "Galas", emoji: "🥂", from: C.gold, to: "#C8820A" },
   { label: "Festivals", emoji: "🌐", from: C.teal, to: "#0A8A8C" },
   { label: "Summits", emoji: "💡", from: C.clay, to: C.teal },
   { label: "Activations", emoji: "🚀", from: C.gold, to: C.clay },
   { label: "Immersive XR", emoji: "🕶", from: C.teal, to: C.gold },
   { label: "Weddings", emoji: "💍", from: "#E8C2A0", to: C.clay },
];

// ─── UTILS ────────────────────────────────────────────────────────────────────
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
         setVal(Math.floor(p * to));
         if (p < 1) requestAnimationFrame(animate);
         else setVal(to);
      };
      requestAnimationFrame(animate);
   }, [inView, to]);
   return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

// ─── TICKER ───────────────────────────────────────────────────────────────────
function Ticker({ items, speed = 30, reverse = false }) {
   return (
      <div className="flex overflow-hidden whitespace-nowrap py-3 sm:py-4 border-y"
         style={{ background: C.clay, borderColor: C.clayDim }}>
         <motion.div
            className="flex items-center gap-6 sm:gap-8"
            animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
            transition={{ duration: speed, ease: "linear", repeat: Infinity }}>
            {[...items, ...items, ...items, ...items].map((item, i) => (
               <span key={i} className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] shrink-0 flex items-center gap-3"
                  style={{ color: i % 3 === 0 ? C.deepOcean : i % 3 === 1 ? "rgba(4,17,29,0.6)" : C.deepOcean }}>
                  {item}
                  <span style={{ color: "rgba(4,17,29,0.35)" }}>◆</span>
               </span>
            ))}
         </motion.div>
      </div>
   );
}

// ─── SECTION LABEL ────────────────────────────────────────────────────────────
function Label({ color, children }) {
   return (
      <motion.div
         initial={{ opacity: 0, x: -20 }}
         whileInView={{ opacity: 1, x: 0 }}
         viewport={{ once: true }}
         transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
         className="flex items-center gap-3 mb-4 sm:mb-5">
         <div className="w-6 h-px" style={{ background: color }} />
         <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em]" style={{ color }}>{children}</span>
      </motion.div>
   );
}

// ─── CARD 3D HOVER ────────────────────────────────────────────────────────────
function Card3D({ children, className, style, intensity = 8 }) {
   const ref = useRef(null);
   const x = useMotionValue(0);
   const y = useMotionValue(0);
   const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 200, damping: 20 });
   const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 200, damping: 20 });

   const handleMouse = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
   };
   const handleLeave = () => { x.set(0); y.set(0); };

   return (
      <motion.div ref={ref} onMouseMove={handleMouse} onMouseLeave={handleLeave}
         style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800, ...style }}
         className={className}>
         {children}
      </motion.div>
   );
}

// ─── ANIMATION HELPERS ────────────────────────────────────────────────────────
const fadeUp = (i = 0) => ({
   initial: { opacity: 0, y: 40 },
   whileInView: { opacity: 1, y: 0 },
   viewport: { once: true, margin: "-40px" },
   transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
});

const fadeLeft = (i = 0) => ({
   initial: { opacity: 0, x: -50 },
   whileInView: { opacity: 1, x: 0 },
   viewport: { once: true, margin: "-40px" },
   transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
});

const fadeRight = (i = 0) => ({
   initial: { opacity: 0, x: 50 },
   whileInView: { opacity: 1, x: 0 },
   viewport: { once: true, margin: "-40px" },
   transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
});

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function EventTemplate9({ data }) {
   const d = { ...DEFAULT_DATA, ...data };
   const services = d.services?.length && d.services.some(s => s.name) ? d.services : DEFAULT_SERVICES;
   const projects = d.projects?.length && d.projects.some(p => p.name) ? d.projects : DEFAULT_PROJECTS;
   const CLIENTS = d.trustedClients?.length > 0 && d.trustedClients.some(c => c.name)
      ? d.trustedClients.map(c => c.name) : DEFAULT_CLIENTS;
   const CATEGORIES = d.eventCategories?.length > 0
      ? d.eventCategories.map((c, i) => ({ ...DEFAULT_CATEGORIES[i % DEFAULT_CATEGORIES.length], label: c.name }))
      : DEFAULT_CATEGORIES;
   const PROCESS = d.eventPlanningProcess?.length > 0 && d.eventPlanningProcess.some(p => p.step)
      ? d.eventPlanningProcess.map((p, i) => ({ ...DEFAULT_PROCESS[i % DEFAULT_PROCESS.length], title: p.step, desc: p.desc }))
      : DEFAULT_PROCESS;
   const TESTIMONIALS = d.testimonials?.length > 0 && d.testimonials.some(t => t.review)
      ? d.testimonials.map((t, i) => ({ name: t.clientName, role: t.event, text: t.review, avatar: t.clientName?.[0] || "T", color: DEFAULT_TESTIMONIALS[i % DEFAULT_TESTIMONIALS.length].color }))
      : DEFAULT_TESTIMONIALS;
   const TEAM = d.team?.length > 0 && d.team.some(t => t.name)
      ? d.team.map((t, i) => ({ ...DEFAULT_TEAM[i % DEFAULT_TEAM.length], name: t.name, role: t.role }))
      : DEFAULT_TEAM;
   const PRICING = d.pricing?.length > 0 && d.pricing.some(p => p.planName)
      ? d.pricing.map((p, i) => ({ ...DEFAULT_PRICING[i % DEFAULT_PRICING.length], name: p.planName, price: p.price, features: p.features ? p.features.split(",").map(f => f.trim()) : [] }))
      : DEFAULT_PRICING;
   const FAQS = d.faqs?.length > 0 && d.faqs.some(f => f.question)
      ? d.faqs.map(f => ({ q: f.question, a: f.answer }))
      : DEFAULT_FAQS;
   const GALLERY = d.gallery?.length > 0 && d.gallery.some(g => g.image)
      ? d.gallery.map(g => g.image) : DEFAULT_GALLERY;

   const [activeProject, setActiveProject] = useState(0);
   const [activeTestimonial, setActiveTestimonial] = useState(0);
   const [activeFaq, setActiveFaq] = useState(null);
   const [lightbox, setLightbox] = useState(null);
   const [mobileMenu, setMobileMenu] = useState(false);
   const [serviceSlide, setServiceSlide] = useState(0);

   const heroRef = useRef(null);
   const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
   const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
   const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

   useEffect(() => {
      const t = setInterval(() => setActiveProject(p => (p + 1) % projects.length), 5000);
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

   const visibleServices = 3;
   const maxServiceSlide = Math.max(0, services.length - visibleServices);

   return (
      <div style={{ fontFamily: "'Syne', 'Space Grotesk', system-ui, sans-serif", background: C.deepOcean, color: C.white, overflowX: "hidden" }}>

         {/* Google Font */}
         <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');
        .serif { font-family: 'DM Serif Display', Georgia, serif; }
        .sans { font-family: 'DM Sans', system-ui, sans-serif; }
        .syne { font-family: 'Syne', system-ui, sans-serif; }
        ::-webkit-scrollbar { width: 4px; background: ${C.deepOcean}; }
        ::-webkit-scrollbar-thumb { background: ${C.clay}; border-radius: 2px; }
        .mesh-bg { background: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(232,98,42,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(29,202,204,0.12) 0%, transparent 55%); }
      `}</style>

         {/* ── NAVBAR ────────────────────────────────────────────────────────────── */}
         <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 sm:py-4">
            <div className="max-w-7xl mx-auto">
               <div className="flex items-center justify-between px-4 sm:px-6 py-3 rounded-2xl border"
                  style={{ background: "rgba(4,17,29,0.88)", backdropFilter: "blur(20px)", borderColor: "rgba(232,98,42,0.2)" }}>
                  {/* Logo */}
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                     className="flex items-center gap-2.5 sm:gap-3">
                     <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center relative overflow-hidden"
                        style={{ background: `linear-gradient(135deg, ${C.clay}, ${C.clayLight})`, boxShadow: `0 0 20px ${C.clay}50` }}>
                        <span className="syne font-black text-sm text-white">P</span>
                     </div>
                     <span className="syne font-black text-sm sm:text-base tracking-tight" style={{ color: C.cream }}>{d.agencyName}</span>
                  </motion.div>

                  {/* Desktop nav */}
                  <nav className="hidden lg:flex items-center gap-6 xl:gap-8 sans text-sm font-medium" style={{ color: C.muted }}>
                     {["Services", "Work", "Process", "Team", "Contact"].map((item, i) => (
                        <motion.a key={item} href={`#${item.toLowerCase()}`}
                           initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.1 * i + 0.3 }}
                           className="hover:text-white transition-colors tracking-wide">{item}</motion.a>
                     ))}
                  </nav>

                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                     className="hidden lg:block">
                     <motion.a href="#contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                        className="syne px-5 py-2.5 rounded-full font-bold text-sm tracking-wide"
                        style={{ background: C.clay, color: C.white, boxShadow: `0 0 24px ${C.clay}45` }}>
                        Book Event →
                     </motion.a>
                  </motion.div>

                  {/* Mobile hamburger */}
                  <button className="lg:hidden p-2 rounded-xl" style={{ background: `${C.clay}20`, color: C.clay }}
                     onClick={() => setMobileMenu(!mobileMenu)}>
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                           d={mobileMenu ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                     </svg>
                  </button>
               </div>

               <AnimatePresence>
                  {mobileMenu && (
                     <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 mx-4 p-5 rounded-2xl z-50 border"
                        style={{ background: C.cardSurface, borderColor: `${C.clay}30` }}>
                        {["Services", "Work", "Process", "Team", "Contact"].map((item, i) => (
                           <motion.a key={item} href={`#${item.toLowerCase()}`}
                              initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                              onClick={() => setMobileMenu(false)}
                              className="block py-2.5 sans text-sm font-medium border-b last:border-0"
                              style={{ color: C.white, borderColor: `${C.clay}15` }}>{item}</motion.a>
                        ))}
                        <a href="#contact" onClick={() => setMobileMenu(false)}
                           className="block mt-3 text-center py-3 rounded-full syne font-bold text-sm"
                           style={{ background: C.clay, color: C.white }}>Book Event →</a>
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>
         </motion.header>

         {/* ── HERO ──────────────────────────────────────────────────────────────── */}
         <section ref={heroRef} className="relative min-h-[100svh] flex flex-col justify-center pt-28 sm:pt-32 pb-16 px-4 sm:px-6 overflow-hidden mesh-bg">
            {/* Decorative grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
               style={{ backgroundImage: `linear-gradient(${C.muted} 1px, transparent 1px), linear-gradient(90deg, ${C.muted} 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />

            {/* Floating orbs */}
            <motion.div animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-1/4 right-1/4 w-48 sm:w-72 h-48 sm:h-72 rounded-full pointer-events-none opacity-25"
               style={{ background: `radial-gradient(circle, ${C.clay} 0%, transparent 70%)`, filter: "blur(40px)" }} />
            <motion.div animate={{ y: [0, 15, 0], scale: [1, 1.08, 1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
               className="absolute bottom-1/3 left-1/5 w-40 sm:w-64 h-40 sm:h-64 rounded-full pointer-events-none opacity-20"
               style={{ background: `radial-gradient(circle, ${C.teal} 0%, transparent 70%)`, filter: "blur(40px)" }} />

            <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 w-full max-w-7xl mx-auto">
               <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_500px] gap-10 xl:gap-16 items-center">
                  {/* LEFT */}
                  <div>
                     <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full sans text-xs font-medium mb-6 sm:mb-8 border"
                        style={{ background: `${C.clay}12`, borderColor: `${C.clay}35`, color: C.clay }}>
                        <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }}
                           className="w-2 h-2 rounded-full" style={{ background: C.clay }} />
                        Now Accepting 2025–26 Projects
                     </motion.div>

                     {/* Hero headline — serif display */}
                     <div className="mb-6 sm:mb-8">
                        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
                           className="serif leading-[0.92] tracking-tight"
                           style={{ fontSize: "clamp(3rem, 9vw, 7rem)", color: C.cream }}>
                           {d.heroTitle.split(" ").map((w, i) => (
                              <motion.span key={i} className="inline-block mr-3"
                                 initial={{ opacity: 0, y: 60, skewX: 8 }} animate={{ opacity: 1, y: 0, skewX: 0 }}
                                 transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                 style={{ color: i % 3 === 1 ? C.clay : i % 3 === 2 ? C.teal : C.cream }}>
                                 {w}
                              </motion.span>
                           ))}
                        </motion.h1>
                     </div>

                     <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="sans text-sm sm:text-base max-w-lg leading-relaxed mb-8 sm:mb-10" style={{ color: C.muted }}>
                        {d.tagline}
                     </motion.p>

                     {/* CTAs */}
                     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-wrap gap-3 mb-10 sm:mb-12">
                        <motion.a href="#contact" whileHover={{ scale: 1.04, x: 4 }} whileTap={{ scale: 0.97 }}
                           className="syne px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-sm sm:text-base tracking-wide"
                           style={{ background: C.clay, color: C.white, boxShadow: `0 0 40px ${C.clay}40` }}>
                           Start Your Event
                        </motion.a>
                        <motion.a href="#work" whileHover={{ scale: 1.04, x: 4 }} whileTap={{ scale: 0.97 }}
                           className="syne px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-sm sm:text-base border tracking-wide"
                           style={{ borderColor: `${C.teal}50`, color: C.teal, background: `${C.teal}0A` }}>
                           View Our Work
                        </motion.a>
                     </motion.div>

                     {/* Stats bar */}
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                        className="flex gap-6 sm:gap-10 flex-wrap">
                        {[{ v: 400, s: "+", l: "Events" }, { v: 98, s: "%", l: "Satisfaction" }, { v: 12, s: "", l: "Years" }].map((stat, i) => (
                           <div key={i} className="flex flex-col gap-0.5">
                              <span className="serif text-2xl sm:text-3xl" style={{ color: [C.clay, C.teal, C.gold][i] }}>
                                 <Counter to={stat.v} suffix={stat.s} />
                              </span>
                              <span className="sans text-[10px] sm:text-xs font-medium uppercase tracking-widest" style={{ color: C.dimMuted }}>{stat.l}</span>
                           </div>
                        ))}
                     </motion.div>
                  </div>

                  {/* RIGHT — stacked image collage */}
                  <div className="relative w-full max-w-xs sm:max-w-sm mx-auto mt-4 lg:mt-0">
                     <motion.div initial={{ scale: 0.85, opacity: 0, rotate: -3 }} animate={{ scale: 1, opacity: 1, rotate: 2 }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="relative rounded-3xl overflow-hidden border-2"
                        style={{ aspectRatio: "3/4", borderColor: `${C.clay}50`, boxShadow: `0 40px 80px rgba(0,0,0,0.5), 0 0 60px ${C.clay}20` }}>
                        <img src={d.heroImage || "/images/templates/template-img-38.jpg"} alt="Event" className="w-full h-full object-cover" />
                        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.deepOcean}CC 0%, transparent 60%)` }} />
                     </motion.div>

                     {/* Floating card — stat */}
                     <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}
                        whileHover={{ y: -4 }}
                        className="absolute -right-4 sm:-right-8 top-10 rounded-2xl p-4 sm:p-5 border z-10"
                        style={{ background: C.cardSurface, borderColor: `${C.teal}40`, boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 20px ${C.teal}15` }}>
                        <div className="text-2xl sm:text-3xl mb-1">🌐</div>
                        <div className="serif text-xl sm:text-2xl" style={{ color: C.teal }}><Counter to={25} suffix="+" /></div>
                        <div className="sans text-[9px] sm:text-[10px] mt-0.5 uppercase tracking-widest" style={{ color: C.muted }}>Cities Worldwide</div>
                     </motion.div>

                     {/* Floating card — review */}
                     <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}
                        whileHover={{ y: -4 }}
                        className="absolute -left-4 sm:-left-8 bottom-16 sm:bottom-20 rounded-2xl px-4 py-3 border z-10"
                        style={{ background: C.cardSurface, borderColor: `${C.gold}35`, boxShadow: `0 16px 32px rgba(0,0,0,0.4)` }}>
                        <div className="flex gap-0.5 mb-1">{"★★★★★".split("").map((s, i) => <span key={i} style={{ color: C.gold }} className="text-xs">{s}</span>)}</div>
                        <div className="sans text-[10px] sm:text-xs font-semibold" style={{ color: C.cream }}>4.9 · 600+ Reviews</div>
                     </motion.div>

                     {/* Spinning ring */}
                     <motion.div animate={{ rotate: 360 }} transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                        className="absolute -bottom-5 -right-5 w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-dashed flex items-center justify-center"
                        style={{ borderColor: `${C.clay}60`, color: C.clay }}>
                        <span className="sans text-[7px] sm:text-[8px] font-bold uppercase text-center leading-tight">Pure<br />Craft</span>
                     </motion.div>
                  </div>
               </div>
            </motion.div>

            {/* Scroll cue */}
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
               className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5" style={{ color: C.dimMuted }}>
               <span className="sans text-[9px] uppercase tracking-[0.2em]">Scroll</span>
               <div className="w-px h-7 sm:h-8" style={{ background: `linear-gradient(to bottom, ${C.clay}, transparent)` }} />
            </motion.div>
         </section>

         {/* ── TICKER ──────────────────────────────────────────────────────────── */}
         <Ticker items={CLIENTS} speed={28} />

         {/* ── ABOUT ─────────────────────────────────────────────────────────── */}
         <section id="about" className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 relative overflow-hidden" style={{ background: C.midnight }}>
            <div className="absolute top-0 right-0 w-72 sm:w-[500px] h-72 sm:h-[500px] rounded-full pointer-events-none opacity-10"
               style={{ background: `radial-gradient(circle, ${C.teal} 0%, transparent 70%)`, filter: "blur(60px)" }} />
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 xl:gap-24 items-center">
               {/* Image */}
               <motion.div {...fadeLeft(0)} className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">
                  <Card3D intensity={6} className="relative rounded-3xl overflow-hidden border-2 cursor-pointer"
                     style={{ aspectRatio: "4/5", borderColor: `${C.clay}35`, boxShadow: `0 60px 100px rgba(0,0,0,0.5)` }}>
                     <img src={d.aboutImage || "/images/templates/template-img-39.jpg"} alt="About" className="w-full h-full object-cover" />
                     <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.midnight}CC 0%, transparent 60%)` }} />
                     {/* Overlay text */}
                     <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: C.clay }}>✓</div>
                           <div className="sans text-xs font-semibold" style={{ color: C.cream }}>ISO Certified Production Studio</div>
                        </div>
                     </div>
                  </Card3D>
                  {/* Year bubble */}
                  <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity }}
                     className="absolute -right-4 sm:-right-8 top-1/3 rounded-2xl p-4 sm:p-5 text-center border z-10"
                     style={{ background: C.cardSurface, borderColor: `${C.clay}40` }}>
                     <div className="serif text-3xl sm:text-4xl" style={{ color: C.clay }}><Counter to={12} suffix="+" /></div>
                     <div className="sans text-[9px] sm:text-xs mt-1 uppercase tracking-widest whitespace-nowrap" style={{ color: C.muted }}>Years Active</div>
                  </motion.div>
               </motion.div>

               {/* Copy */}
               <div className="mt-6 lg:mt-0">
                  <Label color={C.clay}>Our Story</Label>
                  <motion.h2 {...fadeLeft(1)} className="serif leading-tight mb-5 sm:mb-6"
                     style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)", color: C.cream }}>
                     {d.aboutUsTitle || "We Build\nWorlds."}{" "}
                     <span className="italic" style={{ color: C.clay }}>Beautifully.</span>
                  </motion.h2>
                  <motion.p {...fadeLeft(2)} className="sans text-sm sm:text-base leading-loose mb-6 sm:mb-8" style={{ color: C.muted }}>
                     {d.bio}
                  </motion.p>
                  <motion.div {...fadeLeft(3)} className="flex flex-wrap gap-2 mb-8 sm:mb-10">
                     {["World-Class", "Detail-Led", "Full Spectrum", "Award-Winning"].map((tag, i) => (
                        <span key={i} className="syne px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold border"
                           style={{ background: `${[C.clay, C.teal, C.gold, C.clay][i]}10`, color: [C.clay, C.teal, C.gold, C.clay][i], borderColor: `${[C.clay, C.teal, C.gold, C.clay][i]}30` }}>
                           {tag}
                        </span>
                     ))}
                  </motion.div>
                  <motion.a {...fadeLeft(4)} href="#contact" whileHover={{ scale: 1.04, x: 5 }} whileTap={{ scale: 0.97 }}
                     className="inline-flex items-center gap-2 syne px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm tracking-wide"
                     style={{ background: C.clay, color: C.white, boxShadow: `0 0 30px ${C.clay}35` }}>
                     Let's Create Together →
                  </motion.a>
               </div>
            </div>
         </section>

         {/* ── SERVICES – CAROUSEL ──────────────────────────────────────────────── */}
         <section id="services" className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 relative overflow-hidden" style={{ background: C.deepOcean }}>
            <div className="max-w-7xl mx-auto">
               <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-4">
                  <div>
                     <Label color={C.teal}>What We Do</Label>
                     <motion.h2 {...fadeLeft(1)} className="serif leading-tight" style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)", color: C.cream }}>
                        Every discipline,<br />
                        <span className="italic" style={{ color: C.teal }}>mastered.</span>
                     </motion.h2>
                  </div>
                  {/* Carousel controls */}
                  <div className="flex items-center gap-2">
                     <button onClick={() => setServiceSlide(Math.max(0, serviceSlide - 1))}
                        disabled={serviceSlide === 0}
                        className="w-10 h-10 rounded-full flex items-center justify-center border transition-all"
                        style={{ borderColor: serviceSlide === 0 ? C.dimMuted : C.clay, color: serviceSlide === 0 ? C.dimMuted : C.clay, background: serviceSlide === 0 ? "transparent" : `${C.clay}15` }}>←</button>
                     <span className="sans text-xs" style={{ color: C.dimMuted }}>{serviceSlide + 1} / {Math.max(1, services.length - visibleServices + 1)}</span>
                     <button onClick={() => setServiceSlide(Math.min(maxServiceSlide, serviceSlide + 1))}
                        disabled={serviceSlide >= maxServiceSlide}
                        className="w-10 h-10 rounded-full flex items-center justify-center border transition-all"
                        style={{ borderColor: serviceSlide >= maxServiceSlide ? C.dimMuted : C.clay, color: serviceSlide >= maxServiceSlide ? C.dimMuted : C.clay, background: serviceSlide >= maxServiceSlide ? "transparent" : `${C.clay}15` }}>→</button>
                  </div>
               </div>

               {/* Carousel track */}
               <div className="overflow-hidden">
                  <motion.div
                     animate={{ x: `-${serviceSlide * (100 / visibleServices)}%` }}
                     transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                     className="flex gap-4 sm:gap-6">
                     {services.map((svc, i) => (
                        <motion.div key={i} {...fadeUp(i)}
                           whileHover={{ y: -8 }}
                           className="group rounded-2xl sm:rounded-3xl overflow-hidden border flex-shrink-0 cursor-pointer"
                           style={{
                              width: `calc(${100 / visibleServices}% - 1.25rem)`,
                              minWidth: "240px",
                              background: C.cardSurface,
                              borderColor: `${svc.color || C.clay}20`
                           }}>
                           <div className="relative overflow-hidden" style={{ height: "clamp(150px, 22vw, 220px)" }}>
                              <img src={svc.img || "/images/templates/template-img-40.jpg"} alt={svc.name}
                                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                 style={{ filter: "saturate(0.6) brightness(0.8)" }} />
                              <div className="absolute inset-0 group-hover:opacity-0 transition-opacity duration-500"
                                 style={{ background: `linear-gradient(to top, ${C.cardSurface}EE, ${C.cardSurface}66 50%, transparent)` }} />
                              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                 style={{ background: `linear-gradient(135deg, ${svc.color || C.clay}30, transparent)` }} />
                              <div className="absolute top-3 left-3 w-9 h-9 rounded-xl flex items-center justify-center text-xl border"
                                 style={{ background: `${svc.color || C.clay}20`, borderColor: `${svc.color || C.clay}40` }}>{svc.icon}</div>
                           </div>
                           <div className="p-4 sm:p-5 md:p-6">
                              <h3 className="syne text-sm sm:text-base font-bold mb-1.5" style={{ color: svc.color || C.clay }}>{svc.name}</h3>
                              <p className="sans text-xs sm:text-sm leading-relaxed" style={{ color: C.muted }}>{svc.desc}</p>
                              <div className="mt-3 h-px w-0 group-hover:w-full transition-all duration-500"
                                 style={{ background: svc.color || C.clay }} />
                           </div>
                        </motion.div>
                     ))}
                  </motion.div>
               </div>

               {/* Dot indicators */}
               <div className="flex justify-center gap-2 mt-6 sm:mt-8">
                  {Array.from({ length: maxServiceSlide + 1 }).map((_, i) => (
                     <button key={i} onClick={() => setServiceSlide(i)}
                        className="rounded-full transition-all duration-300 h-1.5"
                        style={{ width: i === serviceSlide ? 24 : 6, background: i === serviceSlide ? C.clay : C.dimMuted }} />
                  ))}
               </div>
            </div>
         </section>

         {/* ── EVENT CATEGORIES ─────────────────────────────────────────────────── */}
         <section className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 relative overflow-hidden" style={{ background: C.midnight }}>
            <div className="max-w-7xl mx-auto">
               <div className="text-center mb-10 sm:mb-14">
                  <Label color={C.gold}><span className="w-full flex justify-center">Specialities</span></Label>
                  <motion.h2 {...fadeUp(1)} className="serif leading-tight" style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)", color: C.cream }}>
                     Built for every <span className="italic" style={{ color: C.gold }}>occasion.</span>
                  </motion.h2>
               </div>
               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {CATEGORIES.map((cat, i) => (
                     <motion.div key={i}
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.5, delay: i * 0.07 }}
                        whileHover={{ y: -6, scale: 1.03 }}
                        className="relative p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl cursor-pointer overflow-hidden border group"
                        style={{ background: `linear-gradient(135deg, ${cat.from}15, ${cat.to}08)`, borderColor: `${cat.from}30` }}>
                        <div className="text-3xl sm:text-4xl md:text-5xl mb-3">{cat.emoji}</div>
                        <div className="syne font-semibold text-xs sm:text-sm md:text-base uppercase tracking-wide leading-tight" style={{ color: C.cream }}>{cat.label}</div>
                        <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full opacity-15 group-hover:scale-150 transition-transform duration-500"
                           style={{ background: cat.from }} />
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── PORTFOLIO ─────────────────────────────────────────────────────────── */}
         <section id="work" className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 relative overflow-hidden" style={{ background: C.deepOcean }}>
            <div className="max-w-7xl mx-auto">
               <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-4">
                  <div>
                     <Label color={C.clay}>Portfolio</Label>
                     <motion.h2 {...fadeLeft(1)} className="serif leading-tight" style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)", color: C.cream }}>
                        Defining works<br />
                        <span className="italic" style={{ color: C.clay }}>that endure.</span>
                     </motion.h2>
                  </div>
                  <div className="flex gap-2">
                     {projects.map((_, i) => (
                        <button key={i} onClick={() => setActiveProject(i)}
                           className="h-1.5 rounded-full transition-all duration-300"
                           style={{ width: i === activeProject ? 28 : 6, background: i === activeProject ? C.clay : C.dimMuted }} />
                     ))}
                  </div>
               </div>

               {/* Featured */}
               <AnimatePresence mode="wait">
                  <motion.div key={activeProject}
                     initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }}
                     transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                     className="relative rounded-2xl sm:rounded-3xl overflow-hidden mb-4 sm:mb-5 cursor-pointer group border"
                     style={{ height: "clamp(260px, 52vh, 500px)", borderColor: `${projects[activeProject]?.color || C.clay}30`, boxShadow: `0 40px 80px rgba(0,0,0,0.5)` }}
                     onClick={() => setActiveProject((activeProject + 1) % projects.length)}>
                     <img src={projects[activeProject]?.img || "/images/templates/template-img-44.jpg"}
                        alt={projects[activeProject]?.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        style={{ filter: "saturate(0.7)" }} />
                     <div className="absolute inset-0"
                        style={{ background: `linear-gradient(to top, ${C.deepOcean}EE 0%, ${C.deepOcean}55 40%, transparent 70%)` }} />

                     {/* Year + Tag */}
                     <div className="absolute top-5 sm:top-7 left-5 sm:left-8 flex items-center gap-2">
                        <span className="sans text-[10px] sm:text-xs font-semibold px-3 py-1.5 rounded-full border"
                           style={{ background: `${projects[activeProject]?.color || C.clay}25`, borderColor: `${projects[activeProject]?.color || C.clay}60`, color: projects[activeProject]?.color || C.clay }}>
                           {projects[activeProject]?.emoji} {projects[activeProject]?.tag}
                        </span>
                        <span className="sans text-[10px] sm:text-xs" style={{ color: C.muted }}>{projects[activeProject]?.year}</span>
                     </div>

                     {/* Stat bubble */}
                     <div className="absolute top-5 sm:top-7 right-5 sm:right-8 rounded-2xl p-3 sm:p-4 text-center border"
                        style={{ background: `${projects[activeProject]?.color || C.clay}20`, borderColor: `${projects[activeProject]?.color || C.clay}60` }}>
                        <div className="serif text-lg sm:text-2xl" style={{ color: projects[activeProject]?.color || C.clay }}>{projects[activeProject]?.stat}</div>
                        <div className="sans text-[8px] sm:text-[9px]" style={{ color: C.muted }}>attendees</div>
                     </div>

                     <div className="absolute bottom-6 sm:bottom-10 left-5 sm:left-8 right-5 sm:right-16">
                        <h3 className="serif text-2xl sm:text-4xl lg:text-5xl leading-tight mb-1.5" style={{ color: C.cream }}>{projects[activeProject]?.name}</h3>
                        <p className="sans text-xs sm:text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>{projects[activeProject]?.desc}</p>
                     </div>
                  </motion.div>
               </AnimatePresence>

               {/* Thumbnails */}
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                  {projects.map((p, i) => (
                     <motion.div key={i} {...fadeUp(i)}
                        onClick={() => setActiveProject(i)} whileHover={{ scale: 1.04 }}
                        className="relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer border transition-all"
                        style={{ height: "clamp(70px, 11vw, 110px)", borderColor: i === activeProject ? (p.color || C.clay) : "transparent", opacity: i === activeProject ? 1 : 0.45, boxShadow: i === activeProject ? `0 0 16px ${p.color || C.clay}35` : "none" }}>
                        <img src={p.img || "/images/templates/template-img-44.jpg"} alt={p.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0" style={{ background: "rgba(4,17,29,0.45)" }} />
                        <div className="absolute bottom-1.5 left-2 sans text-[9px] sm:text-[10px] font-semibold uppercase truncate" style={{ color: C.cream }}>{p.name}</div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* Second Ticker */}
         <Ticker items={["Horizon", "TechNova", "Obsidian", "NOVA", "Pure Craft", "Made With Soul"]} reverse speed={22} />

         {/* ── PROCESS ──────────────────────────────────────────────────────────── */}
         <section id="process" className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 relative overflow-hidden" style={{ background: C.midnight }}>
            <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
               style={{ backgroundImage: `linear-gradient(${C.clay} 1px, transparent 1px), linear-gradient(90deg, ${C.clay} 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
            <div className="max-w-6xl mx-auto relative z-10">
               <div className="text-center mb-12 sm:mb-16">
                  <Label color={C.teal}><span className="w-full flex justify-center">How We Work</span></Label>
                  <motion.h2 {...fadeUp(1)} className="serif leading-tight" style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)", color: C.cream }}>
                     The PULSE <span className="italic" style={{ color: C.teal }}>Method.</span>
                  </motion.h2>
               </div>

               <div className="relative">
                  {/* Connecting line */}
                  <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px hidden sm:block"
                     style={{ background: `linear-gradient(to bottom, ${C.clay}, ${C.teal}, ${C.gold}, ${C.clay}, ${C.teal})` }} />
                  <div className="space-y-4 sm:space-y-5 sm:pl-20">
                     {PROCESS.map((step, i) => (
                        <motion.div key={i}
                           initial={{ opacity: 0, x: -50 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true, margin: "-40px" }}
                           transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                           whileHover={{ x: 8 }}
                           className="relative flex gap-4 sm:gap-6 md:gap-8 items-start p-4 sm:p-5 md:p-7 rounded-2xl sm:rounded-3xl border transition-all"
                           style={{ background: C.cardSurface, borderColor: `${step.color}20` }}>
                           {/* Step dot on line */}
                           <div className="hidden sm:flex absolute -left-[52px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full items-center justify-center syne text-[10px] font-black z-10 border-2"
                              style={{ background: step.color, borderColor: C.midnight, color: C.deepOcean }}>{step.step}</div>
                           {/* Icon */}
                           <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl flex-shrink-0 border"
                              style={{ background: `${step.color}15`, borderColor: `${step.color}30` }}>{step.icon}</div>
                           <div>
                              <div className="sm:hidden sans text-[9px] font-bold uppercase tracking-widest mb-0.5" style={{ color: step.color }}>Step {step.step}</div>
                              <h3 className="syne font-bold text-sm sm:text-base md:text-lg mb-1" style={{ color: step.color }}>{step.title}</h3>
                              <p className="sans text-xs sm:text-sm leading-relaxed" style={{ color: C.muted }}>{step.desc}</p>
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </div>
         </section>

         {/* ── WHY US ───────────────────────────────────────────────────────────── */}
         <section className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 relative" style={{ background: C.deepOcean }}>
            <div className="max-w-7xl mx-auto">
               <div className="text-center mb-12 sm:mb-16">
                  <Label color={C.clay}><span className="w-full flex justify-center">Why PULSE</span></Label>
                  <motion.h2 {...fadeUp(1)} className="serif leading-tight" style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)", color: C.cream }}>
                     Numbers that <span className="italic" style={{ color: C.clay }}>speak.</span>
                  </motion.h2>
               </div>
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-14">
                  {[
                     { v: 400, s: "+", l: "Events Produced", icon: "⚡" },
                     { v: 98, s: "%", l: "Client Satisfaction", icon: "💎" },
                     { v: 600, s: "+", l: "Five-Star Reviews", icon: "⭐" },
                     { v: 25, s: "+", l: "Cities Worldwide", icon: "🌍" },
                  ].map((stat, i) => (
                     <Card3D key={i} intensity={5}
                        className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl text-center cursor-pointer border"
                        style={{ background: C.cardSurface, borderColor: `${[C.clay, C.teal, C.gold, C.clay][i]}25` }}>
                        <motion.div {...fadeUp(i)}>
                           <div className="text-2xl sm:text-3xl mb-2">{stat.icon}</div>
                           <div className="serif text-3xl sm:text-4xl md:text-5xl mb-1.5" style={{ color: [C.clay, C.teal, C.gold, C.clay][i] }}>
                              <Counter to={stat.v} suffix={stat.s} />
                           </div>
                           <div className="sans text-[10px] sm:text-xs font-medium uppercase tracking-wider" style={{ color: C.muted }}>{stat.l}</div>
                        </motion.div>
                     </Card3D>
                  ))}
               </div>
               <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
                  {[
                     { title: "Obsessive Craft", desc: "Every prop, every cue, every gram of CO₂ from a pyro rig is designed with intention and precision.", icon: "🎯", color: C.clay },
                     { title: "Seamless Execution", desc: "You walk the floor as a guest. Behind the scenes, 40+ disciplines work in perfect sync.", icon: "🔧", color: C.teal },
                     { title: "Lasting Legacy", desc: "We don't just produce events — we create cultural moments people carry with them for years.", icon: "🏛", color: C.gold },
                  ].map((item, i) => (
                     <motion.div key={i} {...fadeUp(i)}
                        whileHover={{ y: -6 }}
                        className="flex gap-4 p-5 sm:p-6 rounded-2xl border"
                        style={{ background: C.cardSurface, borderColor: `${item.color}20` }}>
                        <div className="text-2xl sm:text-3xl flex-shrink-0">{item.icon}</div>
                        <div>
                           <h4 className="syne font-bold text-sm sm:text-base mb-1.5" style={{ color: item.color }}>{item.title}</h4>
                           <p className="sans text-xs sm:text-sm leading-relaxed" style={{ color: C.muted }}>{item.desc}</p>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── PRICING ──────────────────────────────────────────────────────────── */}
         <section id="pricing" className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 relative overflow-hidden" style={{ background: C.midnight }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full pointer-events-none opacity-10"
               style={{ background: `radial-gradient(circle, ${C.clay} 0%, transparent 70%)`, filter: "blur(60px)" }} />
            <div className="max-w-6xl mx-auto relative z-10">
               <div className="text-center mb-12 sm:mb-16">
                  <Label color={C.gold}><span className="w-full flex justify-center">Investment</span></Label>
                  <motion.h2 {...fadeUp(1)} className="serif leading-tight" style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)", color: C.cream }}>
                     Choose your <span className="italic" style={{ color: C.gold }}>level.</span>
                  </motion.h2>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 md:gap-8 items-start">
                  {PRICING.map((pkg, i) => (
                     <motion.div key={i}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.12 }}
                        whileHover={{ y: -10 }}
                        className="relative rounded-2xl sm:rounded-3xl overflow-hidden border"
                        style={{
                           background: pkg.popular ? `linear-gradient(160deg, ${C.clay}22, ${C.teal}10)` : C.cardSurface,
                           borderColor: pkg.popular ? C.clay : `${pkg.color}25`,
                           boxShadow: pkg.popular ? `0 0 60px ${C.clay}20` : `0 8px 30px rgba(0,0,0,0.3)`,
                        }}>
                        {pkg.popular && (
                           <div className="absolute top-0 left-0 right-0 h-0.5"
                              style={{ background: `linear-gradient(90deg, ${C.clay}, ${C.teal}, ${C.gold})` }} />
                        )}
                        <div className="p-5 sm:p-6 md:p-8">
                           {pkg.popular && (
                              <div className="inline-block px-3 py-1 rounded-full syne text-[10px] font-bold uppercase tracking-widest mb-3 border"
                                 style={{ color: C.clay, borderColor: `${C.clay}50`, background: `${C.clay}12` }}>
                                 ◆ Most Popular
                              </div>
                           )}
                           <div className="text-2xl sm:text-3xl mb-2">{["🎶", "🎬", "🏛"][i]}</div>
                           <h3 className="syne font-black text-xl sm:text-2xl mb-2" style={{ color: pkg.popular ? C.clay : pkg.color }}>{pkg.name}</h3>
                           <p className="sans text-xs sm:text-sm mb-4 sm:mb-5 leading-relaxed" style={{ color: C.muted }}>{pkg.desc}</p>
                           <div className="serif text-4xl sm:text-5xl mb-5 sm:mb-7" style={{ color: pkg.popular ? C.cream : pkg.color }}>
                              {pkg.price}{pkg.price !== "Custom" && <span className="sans text-xs font-normal opacity-40 ml-1">onwards</span>}
                           </div>
                           <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                              {pkg.features.map((f, j) => (
                                 <li key={j} className="flex items-center gap-2.5 sans text-xs sm:text-sm">
                                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[8px] border"
                                       style={{ borderColor: `${pkg.color}50`, color: pkg.color, background: `${pkg.color}10` }}>✓</div>
                                    <span style={{ color: C.muted }}>{f}</span>
                                 </li>
                              ))}
                           </ul>
                           <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                              className="w-full py-3 sm:py-3.5 rounded-full syne font-bold text-xs sm:text-sm tracking-wide border transition-all"
                              style={pkg.popular
                                 ? { background: C.clay, color: C.white, borderColor: C.clay, boxShadow: `0 0 20px ${C.clay}40` }
                                 : { background: "transparent", color: pkg.color, borderColor: `${pkg.color}50` }}>
                              Get Started →
                           </motion.button>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── TESTIMONIALS ─────────────────────────────────────────────────────── */}
         <section className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 relative overflow-hidden" style={{ background: C.deepOcean }}>
            <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full pointer-events-none opacity-10"
               style={{ background: `radial-gradient(circle, ${C.teal} 0%, transparent 70%)`, filter: "blur(60px)" }} />
            <div className="max-w-4xl mx-auto relative z-10">
               <div className="text-center mb-12 sm:mb-16">
                  <Label color={C.teal}><span className="w-full flex justify-center">Testimonials</span></Label>
                  <motion.h2 {...fadeUp(1)} className="serif leading-tight" style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)", color: C.cream }}>
                     Heard from the <span className="italic" style={{ color: C.teal }}>room.</span>
                  </motion.h2>
               </div>

               <AnimatePresence mode="wait">
                  <motion.div key={activeTestimonial}
                     initial={{ opacity: 0, scale: 0.95, y: 20 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.95, y: -20 }}
                     transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                     className="relative p-6 sm:p-10 rounded-3xl border text-center overflow-hidden"
                     style={{ background: C.cardSurface, borderColor: `${TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.color || C.clay}35`, boxShadow: `0 40px 80px rgba(0,0,0,0.4)` }}>
                     <div className="serif text-6xl sm:text-8xl absolute top-2 sm:top-4 left-4 sm:left-8 opacity-10 leading-none"
                        style={{ color: TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.color || C.clay }}>"</div>
                     <div className="text-3xl sm:text-4xl mb-4">💬</div>
                     <p className="sans text-base sm:text-xl leading-relaxed mb-7 relative z-10" style={{ color: C.cream }}>
                        "{TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.text}"
                     </p>
                     <div className="flex items-center justify-center gap-3 sm:gap-4">
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center syne font-bold text-sm border-2"
                           style={{ background: `${TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.color || C.clay}25`, borderColor: TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.color || C.clay, color: TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.color || C.clay }}>
                           {TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.avatar}
                        </div>
                        <div className="text-left">
                           <div className="syne font-bold text-sm sm:text-base" style={{ color: C.cream }}>{TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.name}</div>
                           <div className="sans text-[10px] sm:text-xs uppercase tracking-wider" style={{ color: C.muted }}>{TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.role}</div>
                        </div>
                     </div>
                  </motion.div>
               </AnimatePresence>

               <div className="flex justify-center gap-2 mt-6 sm:mt-8">
                  {TESTIMONIALS.map((_, i) => (
                     <button key={i} onClick={() => setActiveTestimonial(i)}
                        className="h-1.5 rounded-full transition-all duration-300"
                        style={{ width: i === activeTestimonial % TESTIMONIALS.length ? 28 : 6, background: i === activeTestimonial % TESTIMONIALS.length ? C.clay : C.dimMuted }} />
                  ))}
               </div>
            </div>
         </section>

         {/* ── TEAM ─────────────────────────────────────────────────────────────── */}
         <section id="team" className="py-20 sm:py-28 md:py-36 px-4 sm:px-6" style={{ background: C.midnight }}>
            <div className="max-w-6xl mx-auto">
               <div className="text-center mb-12 sm:mb-16">
                  <Label color={C.clay}><span className="w-full flex justify-center">The Crew</span></Label>
                  <motion.h2 {...fadeUp(1)} className="serif leading-tight" style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)", color: C.cream }}>
                     The minds <span className="italic" style={{ color: C.clay }}>behind it all.</span>
                  </motion.h2>
               </div>
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                  {TEAM.map((member, i) => (
                     <Card3D key={i} intensity={6}
                        className="group rounded-2xl sm:rounded-3xl overflow-hidden border cursor-pointer"
                        style={{ background: C.cardSurface, borderColor: `${member.color}20` }}>
                        <motion.div {...fadeUp(i)}>
                           <div className="relative flex items-center justify-center"
                              style={{ height: "clamp(120px, 20vw, 220px)", background: `linear-gradient(160deg, ${member.color}18, ${member.color}0A)` }}>
                              <div className="w-14 h-14 sm:w-18 sm:h-18 md:w-24 md:h-24 rounded-full flex items-center justify-center syne font-black text-2xl sm:text-3xl border-2"
                                 style={{ background: `${member.color}20`, borderColor: `${member.color}60`, color: member.color }}>
                                 {member.name[0]}
                              </div>
                              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3"
                                 style={{ background: `linear-gradient(to top, ${member.color}CC, transparent)` }}>
                                 <div className="flex gap-1.5">
                                    {["in", "tw", "ig"].map(s => (
                                       <div key={s} className="w-6 h-6 rounded-full flex items-center justify-center sans text-[8px] font-bold"
                                          style={{ background: member.color, color: C.deepOcean }}>{s}</div>
                                    ))}
                                 </div>
                              </div>
                           </div>
                           <div className="p-3 sm:p-4 md:p-5">
                              <span className="inline-block px-2 py-1 rounded-full sans text-[8px] sm:text-[9px] font-semibold uppercase tracking-widest mb-1.5 border"
                                 style={{ background: `${member.color}10`, color: member.color, borderColor: `${member.color}30` }}>
                                 {member.badge}
                              </span>
                              <h4 className="syne font-bold text-sm sm:text-base" style={{ color: C.cream }}>{member.name}</h4>
                              <p className="sans text-[10px] sm:text-xs mt-0.5 uppercase tracking-wide" style={{ color: C.muted }}>{member.role}</p>
                           </div>
                        </motion.div>
                     </Card3D>
                  ))}
               </div>
            </div>
         </section>

         {/* ── GALLERY ──────────────────────────────────────────────────────────── */}
         <section className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 relative" style={{ background: C.deepOcean }}>
            <div className="max-w-7xl mx-auto">
               <div className="text-center mb-12 sm:mb-16">
                  <Label color={C.teal}><span className="w-full flex justify-center">Gallery</span></Label>
                  <motion.h2 {...fadeUp(1)} className="serif leading-tight" style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)", color: C.cream }}>
                     Stills from the <span className="italic" style={{ color: C.teal }}>archive.</span>
                  </motion.h2>
               </div>
               <div className="columns-2 md:columns-3 gap-3 sm:gap-4">
                  {GALLERY.map((img, i) => (
                     <motion.div key={i}
                        initial={{ opacity: 0, scale: 0.92 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-30px" }}
                        transition={{ duration: 0.55, delay: i * 0.06 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setLightbox(img)}
                        className="break-inside-avoid relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group mb-3 sm:mb-4 border border-transparent hover:border-clay transition-all duration-300"
                        style={{ height: i % 3 === 0 ? "clamp(130px, 22vw, 230px)" : i % 3 === 1 ? "clamp(100px, 16vw, 170px)" : "clamp(115px, 19vw, 200px)" }}>
                        <img src={img} alt={`Gallery ${i}`}
                           className="w-full h-full object-cover transition-all duration-500 group-hover:scale-108 group-hover:saturate-100"
                           style={{ filter: "saturate(0.7) brightness(0.85)" }} />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                           style={{ background: "rgba(4,17,29,0.3)" }}>
                           <span className="text-2xl" style={{ color: C.clay }}>🔍</span>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>

            <AnimatePresence>
               {lightbox && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                     className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-8"
                     onClick={() => setLightbox(null)}>
                     <motion.img initial={{ scale: 0.85, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.85, y: 40 }}
                        src={lightbox} alt="Gallery"
                        className="max-w-4xl w-full max-h-[88vh] object-contain rounded-2xl sm:rounded-3xl border"
                        style={{ borderColor: `${C.clay}50`, boxShadow: `0 0 80px ${C.clay}25` }} />
                     <button className="absolute top-4 sm:top-6 right-4 sm:right-6 syne font-bold text-2xl w-10 h-10 flex items-center justify-center rounded-full border transition-all"
                        style={{ color: C.cream, borderColor: C.dimMuted }}
                        onClick={() => setLightbox(null)}>×</button>
                  </motion.div>
               )}
            </AnimatePresence>
         </section>

         {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
         <section className="py-20 sm:py-28 md:py-36 px-4 sm:px-6" style={{ background: C.midnight }}>
            <div className="max-w-3xl mx-auto">
               <div className="text-center mb-12 sm:mb-16">
                  <Label color={C.gold}><span className="w-full flex justify-center">FAQ</span></Label>
                  <motion.h2 {...fadeUp(1)} className="serif leading-tight" style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)", color: C.cream }}>
                     Everything you <span className="italic" style={{ color: C.gold }}>need to know.</span>
                  </motion.h2>
               </div>
               <div className="space-y-2.5 sm:space-y-3">
                  {FAQS.map((faq, i) => (
                     <motion.div key={i} {...fadeLeft(i)}
                        className="rounded-2xl overflow-hidden border cursor-pointer transition-all duration-200"
                        style={{ background: C.cardSurface, borderColor: activeFaq === i ? C.clay : `${C.clay}12`, boxShadow: activeFaq === i ? `0 0 24px ${C.clay}12` : "none" }}
                        onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                        <div className="flex items-center justify-between p-4 sm:p-5 gap-3">
                           <h4 className="syne font-semibold text-xs sm:text-sm md:text-base" style={{ color: C.cream }}>{faq.q}</h4>
                           <motion.div animate={{ rotate: activeFaq === i ? 45 : 0 }}
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex-shrink-0 flex items-center justify-center sans font-bold border transition-all"
                              style={{ background: activeFaq === i ? C.clay : "transparent", borderColor: activeFaq === i ? C.clay : C.dimMuted, color: activeFaq === i ? C.deepOcean : C.muted }}>+</motion.div>
                        </div>
                        <AnimatePresence>
                           {activeFaq === i && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                 transition={{ duration: 0.3 }} className="overflow-hidden">
                                 <div className="px-4 sm:px-5 pb-4 sm:pb-5 sans text-xs sm:text-sm leading-relaxed border-t pt-3"
                                    style={{ color: C.muted, borderColor: `${C.clay}15` }}>{faq.a}</div>
                              </motion.div>
                           )}
                        </AnimatePresence>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── CONTACT ──────────────────────────────────────────────────────────── */}
         <section id="contact" className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 relative overflow-hidden" style={{ background: C.deepOcean }}>
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full pointer-events-none opacity-15"
               style={{ background: `radial-gradient(circle, ${C.clay} 0%, transparent 70%)`, filter: "blur(60px)" }} />
            <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full pointer-events-none opacity-10"
               style={{ background: `radial-gradient(circle, ${C.teal} 0%, transparent 70%)`, filter: "blur(60px)" }} />
            <div className="max-w-6xl mx-auto relative z-10">
               <div className="text-center mb-12 sm:mb-16">
                  <Label color={C.clay}><span className="w-full flex justify-center">Contact</span></Label>
                  <motion.h2 {...fadeUp(1)} className="serif leading-tight" style={{ fontSize: "clamp(2rem, 6vw, 5rem)", color: C.cream }}>
                     Ready to build<br />
                     <span className="italic" style={{ color: C.clay }}>something legendary?</span>
                  </motion.h2>
               </div>

               <div className="max-w-2xl mx-auto">
                  {/* Info */}
                  <div className="space-y-3 sm:space-y-4">
                     {[
                        { icon: "✉️", label: "Email", val: d.contactEmail, color: C.clay },
                        { icon: "📞", label: "Phone", val: d.phone || "+91 98765 43210", color: C.teal },
                        { icon: "📍", label: "Studio", val: d.address, color: C.gold },
                     ].map((item, i) => (
                        <motion.div key={i} {...fadeLeft(i)}
                           whileHover={{ x: 8 }}
                           className="flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border"
                           style={{ background: C.cardSurface, borderColor: `${item.color}20` }}>
                           <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center text-lg sm:text-xl flex-shrink-0 border"
                              style={{ background: `${item.color}10`, borderColor: `${item.color}30` }}>{item.icon}</div>
                           <div className="min-w-0">
                              <div className="sans text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: item.color }}>{item.label}</div>
                              <div className="sans font-medium text-xs sm:text-sm break-all" style={{ color: C.cream }}>{item.val}</div>
                           </div>
                        </motion.div>
                     ))}
                     <motion.div {...fadeLeft(3)}
                        className="p-4 sm:p-5 rounded-2xl text-center border"
                        style={{ background: C.cardSurface, borderColor: `${C.clay}35` }}>
                        <div className="serif text-base sm:text-lg mb-1 italic" style={{ color: C.clay }}>400+ events crafted with obsessive care.</div>
                        <div className="sans text-xs" style={{ color: C.muted }}>Join the roster of legendary clients</div>
                     </motion.div>
                  </div>

                  
               </div>
            </div>
         </section>

         {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
         <footer className="px-4 sm:px-6 pt-14 sm:pt-18 pb-6 sm:pb-8 border-t"
            style={{ background: C.midnight, borderColor: "rgba(255,255,255,0.05)" }}>
            <div className="max-w-7xl mx-auto">
               <div className="flex flex-col md:flex-row justify-between items-start gap-8 pb-10 border-b"
                  style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                  {/* Brand */}
                  <motion.div {...fadeLeft(0)} className="max-w-xs">
                     <div className="flex items-center gap-3 mb-3.5">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                           style={{ background: `linear-gradient(135deg, ${C.clay}, ${C.clayLight})` }}>
                           <span className="syne font-black text-sm text-white">P</span>
                        </div>
                        <span className="syne font-black text-base tracking-tight" style={{ color: C.cream }}>{d.agencyName}</span>
                     </div>
                     <p className="sans text-xs sm:text-sm leading-relaxed" style={{ color: C.muted }}>{d.tagline}</p>
                     <div className="flex gap-2.5 mt-4">
                        {["in", "tw", "ig", "yt"].map(s => (
                           <a key={s} href="#"
                              className="w-8 h-8 rounded-full flex items-center justify-center sans text-[9px] font-bold uppercase border hover:scale-110 transition-transform"
                              style={{ background: `${C.clay}10`, borderColor: `${C.clay}30`, color: C.clay }}>
                              {s}
                           </a>
                        ))}
                     </div>
                  </motion.div>

                  {/* Links */}
                  <motion.div {...fadeRight(0)} className="grid grid-cols-3 gap-8 sm:gap-12">
                     {[
                        { title: "Services", links: ["Concerts", "Galas", "Festivals", "Summits"] },
                        { title: "Company", links: ["About", "Work", "Team", "Blog"] },
                        { title: "Legal", links: ["Privacy", "Terms", "Cookies"] },
                     ].map(col => (
                        <div key={col.title}>
                           <h5 className="sans text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mb-3 sm:mb-4" style={{ color: C.clay }}>{col.title}</h5>
                           <ul className="space-y-2 sm:space-y-2.5">
                              {col.links.map(link => (
                                 <li key={link}>
                                    <a href="#" className="sans text-[10px] sm:text-xs font-medium hover:text-white transition-colors uppercase tracking-wide" style={{ color: C.muted }}>{link}</a>
                                 </li>
                              ))}
                           </ul>
                        </div>
                     ))}
                  </motion.div>
               </div>
               <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6 sm:pt-8">
                  <p className="sans text-[9px] sm:text-[10px] font-medium uppercase tracking-wider" style={{ color: C.dimMuted }}>{d.footerCopyright}</p>
                  <div className="flex items-center gap-2 sans text-[10px] sm:text-xs uppercase tracking-wider" style={{ color: C.dimMuted }}>
                     <span>Crafted with</span>
                     <span style={{ color: C.clay }}>◆</span>
                     <span>for every legendary moment</span>
                  </div>
               </div>
            </div>
         </footer>
      </div>
   );
}