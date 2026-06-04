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
   darkBg: "#0B0914",
   cardBg: "#161324",
   neonPink: "#FF2A85",
   neonCyan: "#00F0FF",
   neonLime: "#39FF14",
   white: "#FFFFFF",
   muted: "#8A84A4",
   midMuted: "#5E5880",
};

// ─── DEFAULT DATA ─────────────────────────────────────────────────────────────
const DEFAULT_DATA = {
   agencyName: "VOLT EVENTS",
   tagline: "Amplifying Your Experiences",
   heroTitle: "Electric Moments. Unforgettable Nights.",
   bio: "VOLT Events is a next-generation event production powerhouse. We specialize in high-energy music festivals, immersive tech conferences, and epic nightlife experiences that push the boundaries of reality.",
   aboutUsTitle: "Who We Are",
   contactEmail: "book@voltevents.com",
   phone: "+91 99999 88888",
   address: "Cyber City, Gurugram, 122002",
   footerCopyright: `© ${new Date().getFullYear()} VOLT Events.`,
   heroImage: "/images/templates/template-img-38.jpg",
   aboutImage: "/images/templates/template-img-39.jpg",
   services: [],
   projects: [],
};

// ─── STATIC DATA ──────────────────────────────────────────────────────────────
const DEFAULT_SERVICES = [
   { name: "Music Festivals", desc: "Mind-blowing stage designs and audio-visual setups that rattle bones and lift souls.", icon: "🎵", color: C.neonPink, img: "/images/templates/template-img-36.jpg" },
   { name: "Tech Conferences", desc: "Immersive expos and networking zones that buzz with energy and spark ideas.", icon: "💻", color: C.neonCyan, img: "/images/templates/template-img-37.jpg" },
   { name: "Nightlife & Clubs", desc: "Curating the best DJs and atmospheric experiences for unforgettable nights.", icon: "🎧", color: C.neonLime, img: "/images/templates/template-img-41.jpg" },
   { name: "Corporate Events", desc: "High-impact brand events that leave audiences electrified and inspired.", icon: "💼", color: C.neonPink, img: "/images/templates/template-img-44.jpg" },
   { name: "Product Launches", desc: "Cinematic reveal experiences that make your product impossible to ignore.", icon: "🚀", color: C.neonCyan, img: "/images/templates/template-img-45.jpg" },
   { name: "Immersive Experiences", desc: "Multi-sensory event universes built with XR, projection, and spatial audio.", icon: "🌐", color: C.neonLime, img: "/images/templates/template-img-46.jpg" },
];

const DEFAULT_PROJECTS = [
   { name: "Neon Nights '24", desc: "A techno festival hosting 15,000 ravers across 5 stages.", tag: "Festival", color: C.neonPink, img: "/images/templates/template-img-44.jpg", stat: "15K", emoji: "🎵" },
   { name: "Future Summit", desc: "Global AI expo with holographic displays and 8K projection domes.", tag: "Tech Expo", color: C.neonCyan, img: "/images/templates/template-img-45.jpg", stat: "5K", emoji: "💻" },
   { name: "The Drop", desc: "Exclusive underground warehouse party that broke the internet.", tag: "Nightlife", color: C.neonLime, img: "/images/templates/template-img-46.jpg", stat: "3K", emoji: "🎧" },
   { name: "Cyber Gala", desc: "A black-tie corporate event fused with immersive tech art installations.", tag: "Corporate", color: C.neonPink, img: "/images/templates/template-img-47.jpg", stat: "1.5K", emoji: "💎" },
];

const DEFAULT_CATEGORIES = [
   { label: "Music Festivals", emoji: "🎵", from: "#FF2A85", to: "#FF6B35" },
   { label: "Tech Expos", emoji: "💻", from: "#00F0FF", to: "#9B5DE5" },
   { label: "Nightlife", emoji: "🎧", from: "#39FF14", to: "#00F0FF" },
   { label: "Corporate", emoji: "💼", from: "#FF2A85", to: "#9B5DE5" },
   { label: "Product Launches", emoji: "🚀", from: "#9B5DE5", to: "#FF2A85" },
   { label: "Immersive XR", emoji: "🌐", from: "#00F0FF", to: "#39FF14" },
   { label: "Brand Events", emoji: "⚡", from: "#FFD93D", to: "#FF2A85" },
];

const DEFAULT_PROCESS = [
   { step: "01", title: "Signal Drop", desc: "We decode your vision, energy, and audience to design the perfect frequency.", icon: "📡", color: C.neonPink },
   { step: "02", title: "Voltage Plan", desc: "Full production brief with stage schematics, light maps, and AV architecture.", icon: "⚡", color: C.neonCyan },
   { step: "03", title: "Build the Grid", desc: "Our crew assembles every rig, LED wall, and sound system with precision.", icon: "🏗", color: C.neonLime },
   { step: "04", title: "Showtime", desc: "Flawless on-site execution — so you can be in the crowd, not backstage.", icon: "🎬", color: C.neonPink },
   { step: "05", title: "The Echo", desc: "Event highlights, content drops, and media packs within 48 hours.", icon: "📸", color: C.neonCyan },
];

const DEFAULT_TESTIMONIALS = [
   { name: "Aryan Malhotra", role: "Founder, Neon Nights", text: "VOLT didn't just produce our festival — they redefined what's possible. 15,000 people lost their minds in the best way. Absolutely legendary execution.", avatar: "AM", color: C.neonPink },
   { name: "Shreya Bose", role: "CEO, FutureTech Summit", text: "Our conference felt like being inside a sci-fi film. The holographic displays and spatial audio had guests completely awestruck. VOLT are geniuses.", avatar: "SB", color: C.neonCyan },
   { name: "Dev Rajan", role: "Brand Director, The Drop", text: "I've thrown warehouse parties for years, but nothing touched what VOLT delivered. It went viral within hours. They understand atmosphere like nobody else.", avatar: "DR", color: C.neonLime },
];

const DEFAULT_TEAM = [
   { name: "Zara Khatri", role: "Creative Director", badge: "Vision", color: C.neonPink },
   { name: "Kiran Shetty", role: "Stage Architect", badge: "Production", color: C.neonCyan },
   { name: "Ravi Menon", role: "Lighting Designer", badge: "Atmosphere", color: C.neonLime },
   { name: "Preet Gill", role: "Sound Engineer", badge: "Audio", color: C.neonPink },
];

const DEFAULT_PRICING = [
   { name: "Spark", price: "₹1.2L", desc: "Perfect for intimate events up to 300 guests.", color: C.neonCyan, features: ["Up to 300 guests", "Basic stage design", "PA system & lighting", "Day-of coordination", "Event photography"] },
   { name: "Surge", price: "₹4.5L", desc: "Our signature production for mid-scale events.", color: C.neonPink, popular: true, features: ["Up to 2,000 guests", "Full stage & LED walls", "Production team of 15", "Artist booking support", "Video highlights reel", "Social media content"] },
   { name: "Overload", price: "Custom", desc: "For legendary events that demand everything.", color: C.neonLime, features: ["Unlimited scale", "Bespoke stage universe", "Full crew deployment", "Global logistics", "PR & media support", "Year-long partnership"] },
];

const DEFAULT_FAQS = [
   { q: "Do you handle artist bookings?", a: "Yes, we have direct connections with top-tier international DJs, live acts, and performers across genres. We manage the full rider and logistics." },
   { q: "Can you build custom stages?", a: "Absolutely. Our set designers build 100% custom stages with immersive LED walls, pyrotechnics, and spatial audio rigs for any scale." },
   { q: "How early should I book?", a: "For major festivals, 6–12 months ahead is ideal. For club nights and smaller events, 4–8 weeks gives us enough runway to build something extraordinary." },
   { q: "Do you do destination events?", a: "Yes. We've produced events in Goa, Dubai, Bali, London, and beyond. Our travel production division handles full logistics end-to-end." },
   { q: "How is content delivered post-event?", a: "Within 48 hours you'll receive a curated photo pack, highlight reel, and a full social content drop ready to publish." },
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

const DEFAULT_CLIENTS = ["Neon Nights", "FutureTech", "The Drop", "CyberGala", "SoundWave", "NovaCorp", "PulseXR", "Voltage Co", "GridFest", "DarkMatter"];

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────
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

// ─── MARQUEE ──────────────────────────────────────────────────────────────────
function Marquee({ items, speed = 20, reverse = false }) {
   return (
      <div className="flex overflow-hidden whitespace-nowrap py-4 border-y" style={{ background: C.cardBg, borderColor: "rgba(255,255,255,0.07)" }}>
         <motion.div
            className="flex items-center gap-8 sm:gap-10"
            animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
            transition={{ duration: speed, ease: "linear", repeat: Infinity }}
         >
            {[...items, ...items, ...items, ...items].map((item, i) => (
               <span key={i} className="text-xl sm:text-2xl md:text-4xl font-black uppercase italic tracking-tighter shrink-0"
                  style={{ color: i % 2 === 0 ? C.neonCyan : "transparent", WebkitTextStroke: i % 2 !== 0 ? `2px ${C.neonPink}` : "none" }}>
                  {item}
               </span>
            ))}
         </motion.div>
      </div>
   );
}

// ─── SECTION TAG ──────────────────────────────────────────────────────────────
function SectionTag({ color, children }) {
   return (
      <motion.span
         initial={{ opacity: 0, x: -30 }}
         whileInView={{ opacity: 1, x: 0 }}
         viewport={{ once: true }}
         transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
         className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest mb-3 sm:mb-4"
         style={{ background: `${color}15`, color, border: `1px solid ${color}40` }}
      >
         {children}
      </motion.span>
   );
}

// ─── ANIMATION HELPERS ────────────────────────────────────────────────────────
const rvL = (i = 0) => ({
   initial: { opacity: 0, x: -60 },
   whileInView: { opacity: 1, x: 0 },
   viewport: { once: true, margin: "-50px" },
   transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
});

const rvR = (i = 0) => ({
   initial: { opacity: 0, x: 60 },
   whileInView: { opacity: 1, x: 0 },
   viewport: { once: true, margin: "-50px" },
   transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
});

const rvU = (i = 0) => ({
   initial: { opacity: 0, y: 40, x: -20 },
   whileInView: { opacity: 1, y: 0, x: 0 },
   viewport: { once: true, margin: "-40px" },
   transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
});

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function EventTemplate5({ data }) {
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

   const heroRef = useRef(null);
   const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
   const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

   useEffect(() => {
      const t = setInterval(() => setActiveSlide(p => (p + 1) % projects.length), 4500);
      return () => clearInterval(t);
   }, [projects.length]);

   useEffect(() => {
      const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 4000);
      return () => clearInterval(t);
   }, [TESTIMONIALS.length]);

   // Close lightbox on escape key
   useEffect(() => {
      const handleKey = (e) => { if (e.key === "Escape") setLightbox(null); };
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
   }, []);

   return (
      <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", background: C.darkBg, color: C.white, overflowX: "hidden" }}>

         {/* ── NAVBAR ───────────────────────────────────────────────────────────── */}
         <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 p-3 sm:p-4 sm:p-6"
         >
            <div className="max-w-7xl mx-auto relative">
               <div className="flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl"
                  style={{ background: "rgba(22,19,36,0.92)", backdropFilter: "blur(16px)", border: `1px solid ${C.neonCyan}35` }}>

                  {/* Logo */}
                  <motion.div
                     initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                     className="flex items-center gap-2 sm:gap-3 min-w-0">
                     <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex-shrink-0 flex items-center justify-center text-black text-xs sm:text-sm font-black"
                        style={{ background: `linear-gradient(135deg, ${C.neonPink}, ${C.neonCyan})` }}>V</div>
                     <span className="font-black text-sm sm:text-base lg:text-lg italic tracking-tighter truncate"
                        style={{ color: C.neonLime, maxWidth: "clamp(100px, 30vw, 300px)" }}>{d.agencyName}</span>
                  </motion.div>

                  {/* Desktop Nav */}
                  <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-bold uppercase tracking-wider" style={{ color: C.muted }}>
                     {["Services", "Work", "Process", "Pricing", "Contact"].map((item, i) => (
                        <motion.a key={item} href={`#${item.toLowerCase()}`}
                           initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.1 * i + 0.3 }}
                           className="hover:text-white transition-colors whitespace-nowrap">{item}</motion.a>
                     ))}
                  </nav>

                  {/* Desktop CTA */}
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
                     className="hidden lg:block flex-shrink-0">
                     <motion.a href="#contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                        className="px-4 xl:px-5 py-2.5 rounded-full font-black text-black uppercase tracking-wider text-xs xl:text-sm whitespace-nowrap"
                        style={{ background: C.neonCyan, boxShadow: `0 0 20px ${C.neonCyan}50` }}>
                        Book Now ⚡
                     </motion.a>
                  </motion.div>

                  {/* Mobile Hamburger */}
                  <button className="lg:hidden p-2 rounded-lg flex-shrink-0 ml-2"
                     style={{ background: `${C.neonPink}20`, color: C.neonPink }}
                     onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                     aria-label="Toggle menu">
                     <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                           d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                     </svg>
                  </button>
               </div>

               {/* Mobile Menu */}
               <AnimatePresence>
                  {isMobileMenuOpen && (
                     <motion.div
                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 p-5 rounded-2xl lg:hidden flex flex-col gap-3 z-50"
                        style={{ background: C.cardBg, border: `1px solid ${C.neonCyan}30` }}>
                        {["Services", "Work", "Process", "Pricing", "Contact"].map((item, i) => (
                           <motion.a key={item} href={`#${item.toLowerCase()}`}
                              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="text-sm font-bold uppercase tracking-wider py-1" style={{ color: C.white }}>{item}</motion.a>
                        ))}
                        <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}
                           className="w-full text-center px-6 py-3 rounded-full text-sm font-black text-black mt-1"
                           style={{ background: C.neonCyan }}>Book Now ⚡</a>
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>
         </motion.header>

         {/* ── HERO ─────────────────────────────────────────────────────────────── */}
         <section ref={heroRef} className="relative min-h-[100svh] flex flex-col justify-center pt-28 sm:pt-32 pb-16 px-4 sm:px-6 overflow-hidden">
            {/* Background glows */}
            <div className="absolute top-1/4 left-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none opacity-30 sm:opacity-40" style={{ background: C.neonPink }} />
            <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none opacity-30 sm:opacity-40" style={{ background: C.neonCyan }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none opacity-15 sm:opacity-20" style={{ background: C.neonLime }} />

            <motion.div style={{ y: heroY }} className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
               {/* Left */}
               <div className="text-center lg:text-left">
                  <motion.div
                     initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                     className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-5 sm:mb-6"
                     style={{ border: `1px solid ${C.neonLime}`, color: C.neonLime, background: `${C.neonLime}10` }}>
                     <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 animate-pulse" />
                     Now Booking 2025–26
                  </motion.div>

                  {/* Hero Title — wraps cleanly on all screens */}
                  <motion.h1
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
                     className="text-[clamp(2rem,8vw,5rem)] xl:text-[5.5rem] font-black uppercase italic tracking-tighter leading-[0.9] mb-7 sm:mb-8 break-words">
                     {d.heroTitle.split(" ").map((w, i) => (
                        <motion.span key={i} className="inline-block mr-2 sm:mr-3"
                           initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}
                           transition={{ duration: 0.55, delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                           style={{ color: i % 2 === 0 ? C.white : C.neonCyan }}>
                           {w}
                        </motion.span>
                     ))}
                  </motion.h1>

                  <motion.p
                     initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                     className="text-sm sm:text-base md:text-lg font-medium max-w-lg mx-auto lg:mx-0 mb-8 sm:mb-10 leading-relaxed" style={{ color: C.muted }}>
                     {d.tagline}
                  </motion.p>

                  {/* CTA Buttons */}
                  <motion.div
                     initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                     className="flex flex-col xs:flex-row gap-3 mb-8 sm:mb-10 justify-center lg:justify-start">
                     <motion.a href="#contact" whileHover={{ scale: 1.05, x: 4 }} whileTap={{ scale: 0.97 }}
                        className="text-center px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-black text-black uppercase tracking-widest text-xs sm:text-sm"
                        style={{ background: C.neonPink, boxShadow: `0 0 30px ${C.neonPink}55` }}>
                        FEEL THE RUSH ⚡
                     </motion.a>
                     <motion.a href="#work" whileHover={{ scale: 1.05, x: 4 }} whileTap={{ scale: 0.97 }}
                        className="text-center px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-black text-xs sm:text-sm border"
                        style={{ borderColor: C.neonCyan, color: C.neonCyan, background: `${C.neonCyan}10` }}>
                        See Our Work
                     </motion.a>
                  </motion.div>

                  {/* Stats */}
                  <motion.div
                     initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.7, duration: 0.6 }}
                     className="flex gap-5 sm:gap-8 md:gap-10 flex-wrap justify-center lg:justify-start">
                     {[{ v: 500, s: "+", l: "Events Produced" }, { v: 99, s: "%", l: "Client Satisfaction" }, { v: 8, s: "", l: "Years of Voltage" }].map((stat, i) => (
                        <motion.div key={i}
                           initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: 0.8 + i * 0.1 }}
                           className="text-center sm:text-left">
                           <div className="text-xl sm:text-2xl md:text-3xl font-black italic" style={{ color: [C.neonPink, C.neonCyan, C.neonLime][i] }}>
                              <Counter to={stat.v} suffix={stat.s} />
                           </div>
                           <div className="text-[10px] sm:text-xs font-bold mt-0.5 uppercase tracking-wider" style={{ color: C.muted }}>{stat.l}</div>
                        </motion.div>
                     ))}
                  </motion.div>
               </div>

               {/* Right — Hero Image */}
               <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto mt-4 lg:mt-0">
                  <motion.div
                     initial={{ scale: 0.8, opacity: 0, x: 60 }} animate={{ scale: 1, opacity: 1, x: 0 }}
                     transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                     className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2"
                     style={{ aspectRatio: "4/5", rotate: 2, borderColor: C.neonPink, boxShadow: `0 0 60px ${C.neonPink}30` }}>
                     <img src={d.heroImage || "/images/templates/template-img-38.jpg"} alt="Event" className="w-full h-full object-cover" />
                     <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.darkBg}80, transparent 60%)` }} />
                  </motion.div>

                  {/* Floating badge — top right */}
                  <motion.div
                     initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.7, duration: 0.6 }}
                     className="absolute -right-2 sm:-right-5 top-6 sm:top-8 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 text-center z-10"
                     style={{ background: C.cardBg, border: `1px solid ${C.neonCyan}40`, boxShadow: `0 0 30px ${C.neonCyan}20` }}>
                     <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                        <div className="text-2xl sm:text-3xl md:text-4xl">⚡</div>
                        <div className="text-[9px] sm:text-xs font-black mt-1 uppercase tracking-wider whitespace-nowrap" style={{ color: C.neonCyan }}>500+ Events!</div>
                     </motion.div>
                  </motion.div>

                  {/* Floating review — bottom left */}
                  <motion.div
                     initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.9, duration: 0.6 }}
                     className="absolute -left-2 sm:-left-5 bottom-14 sm:bottom-20 rounded-xl sm:rounded-2xl px-2.5 sm:px-4 py-2 sm:py-3 z-10"
                     style={{ background: C.cardBg, border: `1px solid ${C.neonLime}30`, boxShadow: `0 0 20px ${C.neonLime}15` }}>
                     <div className="flex gap-0.5 mb-1">{"★★★★★".split("").map((s, i) => <span key={i} style={{ color: C.neonLime }} className="text-xs sm:text-sm">{s}</span>)}</div>
                     <div className="text-[10px] sm:text-xs font-black whitespace-nowrap" style={{ color: C.white }}>5.0 — 800+ Reviews</div>
                  </motion.div>

                  {/* Spinning badge */}
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                     className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full border-dashed border-2 flex items-center justify-center"
                     style={{ borderColor: C.neonCyan, color: C.neonCyan, background: C.darkBg }}>
                     <div className="font-black text-center text-[8px] sm:text-[9px] uppercase leading-tight">100%<br />Energy</div>
                  </motion.div>
               </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity }}
               className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1" style={{ color: C.muted }}>
               <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">Scroll Down</span>
               <div className="w-0.5 h-6 sm:h-8" style={{ background: `linear-gradient(to bottom, ${C.neonPink}, transparent)` }} />
            </motion.div>
         </section>

         {/* ── MARQUEE ──────────────────────────────────────────────────────────── */}
         <Marquee items={CLIENTS} speed={25} />

         {/* ── ABOUT ────────────────────────────────────────────────────────────── */}
         <section id="about" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden" style={{ background: C.darkBg }}>
            <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none opacity-20" style={{ background: C.neonCyan }} />
            <div className="max-w-7xl mx-auto">
               <div className="grid lg:grid-cols-2 gap-10 xl:gap-20 items-center">
                  {/* Image */}
                  <motion.div {...rvL(0)} className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">
                     <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2"
                        style={{ aspectRatio: "4/5", borderColor: `${C.neonPink}40`, boxShadow: `0 0 60px ${C.neonPink}20` }}>
                        <img src={d.aboutImage || "/images/templates/template-img-39.jpg"} alt="About" className="w-full h-full object-cover" />
                        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.darkBg}CC, transparent 60%)` }} />
                     </div>
                     {/* Floating stat — years */}
                     <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity }}
                        className="absolute -right-2 sm:-right-6 md:-right-8 top-1/4 p-3 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl font-black border"
                        style={{ background: C.cardBg, borderColor: `${C.neonPink}50`, boxShadow: `0 0 30px ${C.neonPink}25`, color: C.neonPink }}>
                        <div className="text-2xl sm:text-3xl md:text-4xl italic"><Counter to={8} suffix="+" /></div>
                        <div className="text-[9px] sm:text-xs opacity-70 mt-1 uppercase tracking-wider whitespace-nowrap">Years of Voltage</div>
                     </motion.div>
                     {/* Floating stat — events */}
                     <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                        className="absolute -left-2 sm:-left-5 md:-left-6 bottom-16 sm:bottom-20 p-3 sm:p-4 sm:p-5 rounded-xl sm:rounded-2xl border"
                        style={{ background: C.cardBg, borderColor: `${C.neonCyan}40`, boxShadow: `0 0 24px ${C.neonCyan}20` }}>
                        <div className="text-xl sm:text-2xl md:text-3xl font-black italic" style={{ color: C.neonCyan }}><Counter to={500} suffix="+" /></div>
                        <div className="text-[9px] sm:text-xs font-bold mt-1 uppercase tracking-wider whitespace-nowrap" style={{ color: C.muted }}>Events Done</div>
                     </motion.div>
                  </motion.div>

                  {/* Copy */}
                  <div className="mt-6 lg:mt-0">
                     <SectionTag color={C.neonPink}>Our Story ⚡</SectionTag>
                     <motion.h2 {...rvL(1)} className="text-[clamp(1.75rem,5vw,3.5rem)] xl:text-6xl font-black italic tracking-tighter leading-tight mb-5 sm:mb-6" style={{ color: C.white }}>
                        {d.aboutUsTitle || "We Live For\nThe Electric."}
                     </motion.h2>
                     <motion.p {...rvL(2)} className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8" style={{ color: C.muted }}>{d.bio}</motion.p>
                     <motion.div {...rvL(3)} className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-10">
                        {["High Voltage", "Zero Limits", "Pure Energy", "100% Live"].map((pill, i) => (
                           <span key={i} className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider"
                              style={{ background: `${[C.neonPink, C.neonCyan, C.neonLime, C.neonPink][i]}15`, color: [C.neonPink, C.neonCyan, C.neonLime, C.neonPink][i], border: `1px solid ${[C.neonPink, C.neonCyan, C.neonLime, C.neonPink][i]}40` }}>
                              {pill}
                           </span>
                        ))}
                     </motion.div>
                     <motion.a {...rvL(4)} href="#contact" whileHover={{ scale: 1.04, x: 6 }} whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 px-5 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-full font-black text-black text-xs sm:text-sm uppercase tracking-widest"
                        style={{ background: C.neonPink, boxShadow: `0 0 30px ${C.neonPink}40` }}>
                        Let's Make Noise ⚡
                     </motion.a>
                  </div>
               </div>
            </div>
         </section>

         {/* ── SERVICES ─────────────────────────────────────────────────────────── */}
         <section id="services" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative" style={{ background: C.cardBg }}>
            <div className="max-w-7xl mx-auto">
               <div className="text-center mb-10 sm:mb-16 md:mb-20">
                  <SectionTag color={C.neonCyan}>The Arsenal 🌟</SectionTag>
                  <motion.h2 {...rvL(1)} className="text-[clamp(1.75rem,5vw,3.5rem)] xl:text-6xl font-black italic tracking-tighter" style={{ color: C.white }}>
                     Every Event,<br />
                     <motion.span
                        initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }}
                        style={{ color: C.neonPink }}>Perfectly Amplified.</motion.span>
                  </motion.h2>
               </div>
               <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                  {services.map((svc, i) => (
                     <motion.div key={i} {...rvU(i)}
                        whileHover={{ y: -10, x: 4 }}
                        className="group rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer relative border"
                        style={{ background: C.darkBg, borderColor: `${svc.color || C.neonPink}25` }}>
                        <div className="relative overflow-hidden rounded-t-2xl sm:rounded-t-3xl" style={{ height: "clamp(160px, 25vw, 208px)" }}>
                           <img src={svc.img || "/images/templates/template-img-40.jpg"} alt={svc.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 mix-blend-luminosity group-hover:mix-blend-normal" />
                           <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.darkBg}EE, transparent 60%)` }} />
                           <div className="absolute top-3 left-3 w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center text-xl sm:text-2xl"
                              style={{ background: `${svc.color || C.neonPink}25`, border: `1px solid ${svc.color || C.neonPink}50` }}>{svc.icon}</div>
                        </div>
                        <div className="p-4 sm:p-5 md:p-6">
                           <h3 className="text-base sm:text-lg font-black uppercase italic mb-2" style={{ color: svc.color || C.neonCyan }}>{svc.name}</h3>
                           <p className="text-xs sm:text-sm leading-relaxed" style={{ color: C.muted }}>{svc.desc}</p>
                           <div className="mt-3 sm:mt-4 flex items-center gap-1 text-xs font-black opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider" style={{ color: svc.color || C.neonCyan }}>
                              Explore More →
                           </div>
                        </div>
                        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500" style={{ background: svc.color || C.neonCyan }} />
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── EVENT CATEGORIES ─────────────────────────────────────────────────── */}
         <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden" style={{ background: C.darkBg }}>
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 sm:w-96 h-64 sm:h-96 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none opacity-15" style={{ background: C.neonLime }} />
            <div className="max-w-7xl mx-auto">
               <div className="text-center mb-8 sm:mb-12 md:mb-16">
                  <SectionTag color={C.neonLime}>Event Types 🎭</SectionTag>
                  <motion.h2 {...rvL(1)} className="text-[clamp(1.75rem,5vw,3.5rem)] xl:text-6xl font-black italic tracking-tighter" style={{ color: C.white }}>
                     Every Occasion,<br />
                     <motion.span initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ color: C.neonLime }}>We've Got Voltage!</motion.span>
                  </motion.h2>
               </div>
               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4">
                  {CATEGORIES.map((cat, i) => (
                     <motion.div key={i}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ y: -8, x: 4, scale: 1.04 }}
                        className="relative p-4 sm:p-5 md:p-7 rounded-2xl sm:rounded-3xl cursor-pointer overflow-hidden group border"
                        style={{ background: `linear-gradient(135deg, ${cat.from}20, ${cat.to}20)`, borderColor: `${cat.from}40`, boxShadow: `0 4px 20px ${cat.from}15` }}>
                        <div className="text-2xl sm:text-3xl md:text-5xl mb-2 sm:mb-3">{cat.emoji}</div>
                        <div className="font-black text-xs sm:text-sm md:text-base uppercase tracking-wide leading-tight" style={{ color: C.white }}>{cat.label}</div>
                        <div className="absolute -bottom-8 -right-8 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500" style={{ background: cat.from }} />
                        <motion.div className="absolute top-2 sm:top-3 right-2 sm:right-3 text-base sm:text-lg opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: cat.from }}>⚡</motion.div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── PORTFOLIO ────────────────────────────────────────────────────────── */}
         <section id="work" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden" style={{ background: C.cardBg }}>
            <div className="max-w-7xl mx-auto">
               <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 md:mb-16 gap-4">
                  <div>
                     <SectionTag color={C.neonPink}>Past Glory 🏆</SectionTag>
                     <motion.h2 {...rvL(1)} className="text-[clamp(1.75rem,5vw,3.5rem)] xl:text-6xl font-black italic tracking-tighter" style={{ color: C.white }}>
                        Events That<br />
                        <motion.span initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ color: C.neonLime }}>Broke The Internet</motion.span>
                     </motion.h2>
                  </div>
                  <div className="flex gap-2">
                     {projects.map((_, i) => (
                        <button key={i} onClick={() => setActiveSlide(i)}
                           className="h-2 rounded-full transition-all duration-300"
                           style={{ width: i === activeSlide ? 32 : 8, background: i === activeSlide ? C.neonPink : `${C.neonPink}30` }} />
                     ))}
                  </div>
               </div>

               {/* Featured slide */}
               <AnimatePresence mode="wait">
                  <motion.div key={activeSlide}
                     initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -80 }}
                     transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                     className="relative rounded-2xl sm:rounded-[2rem] overflow-hidden cursor-pointer group mb-4 sm:mb-6 border"
                     style={{ height: "clamp(240px, 50vh, 480px)", borderColor: `${projects[activeSlide]?.color || C.neonPink}40`, boxShadow: `0 0 60px ${projects[activeSlide]?.color || C.neonPink}20` }}
                     onClick={() => setActiveSlide((activeSlide + 1) % projects.length)}>
                     <img src={projects[activeSlide]?.img || "/images/templates/template-img-44.jpg"}
                        alt={projects[activeSlide]?.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                     <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(11,9,20,0.9) 0%, rgba(11,9,20,0.4) 50%, transparent 100%)" }} />
                     <div className="absolute top-4 sm:top-6 md:top-8 left-4 sm:left-6 md:left-8">
                        <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider"
                           style={{ background: `${projects[activeSlide]?.color || C.neonPink}30`, color: projects[activeSlide]?.color || C.neonPink, border: `1px solid ${projects[activeSlide]?.color || C.neonPink}60` }}>
                           {projects[activeSlide]?.emoji} {projects[activeSlide]?.tag}
                        </span>
                     </div>
                     <motion.div className="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8 w-14 sm:w-16 md:w-20 h-14 sm:h-16 md:h-20 rounded-full flex flex-col items-center justify-center font-black border"
                        style={{ background: `${projects[activeSlide]?.color || C.neonPink}20`, borderColor: projects[activeSlide]?.color || C.neonPink, color: projects[activeSlide]?.color || C.neonPink, boxShadow: `0 0 20px ${projects[activeSlide]?.color || C.neonPink}40` }}
                        animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                        <span className="text-sm sm:text-base md:text-lg leading-none">{projects[activeSlide]?.stat}</span>
                        <span className="text-[7px] sm:text-[8px] opacity-70">guests</span>
                     </motion.div>
                     <div className="absolute bottom-5 sm:bottom-7 md:bottom-10 left-4 sm:left-7 md:left-10 right-4 sm:right-7 md:right-16">
                        <h3 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-black italic text-white tracking-tighter mb-1.5 sm:mb-2">{projects[activeSlide]?.name}</h3>
                        <p className="text-xs sm:text-sm md:text-base" style={{ color: "rgba(255,255,255,0.6)" }}>{projects[activeSlide]?.desc}</p>
                     </div>
                  </motion.div>
               </AnimatePresence>

               {/* Thumbnail grid */}
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4">
                  {projects.map((p, i) => (
                     <motion.div key={i}
                        initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                        onClick={() => setActiveSlide(i)} whileHover={{ scale: 1.04, x: 3 }}
                        className="relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer border"
                        style={{ height: "clamp(70px, 10vw, 100px)", borderColor: i === activeSlide ? (p.color || C.neonPink) : "transparent", opacity: i === activeSlide ? 1 : 0.5, boxShadow: i === activeSlide ? `0 0 16px ${p.color || C.neonPink}40` : "none" }}>
                        <img src={p.img || "/images/templates/template-img-44.jpg"} alt={p.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0" style={{ background: "rgba(11,9,20,0.5)" }} />
                        <div className="absolute bottom-1.5 left-2 text-white text-[9px] sm:text-[10px] md:text-xs font-bold truncate uppercase">{p.name}</div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         <Marquee items={["LOUDER", "FASTER", "HARDER", "STRONGER", "WILDER", "ELECTRIC"]} reverse speed={18} />

         {/* ── PROCESS ──────────────────────────────────────────────────────────── */}
         <section id="process" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden" style={{ background: C.darkBg }}>
            <div className="absolute -top-10 right-0 w-48 sm:w-72 h-48 sm:h-72 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none opacity-20" style={{ background: C.neonPink }} />
            <div className="max-w-6xl mx-auto relative z-10">
               <div className="text-center mb-10 sm:mb-16 md:mb-20">
                  <SectionTag color={C.neonCyan}>How We Work 🗺</SectionTag>
                  <motion.h2 {...rvL(1)} className="text-[clamp(1.75rem,5vw,3.5rem)] xl:text-6xl font-black italic tracking-tighter" style={{ color: C.white }}>
                     The VOLT<br />
                     <motion.span initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ color: C.neonCyan }}>Journey</motion.span>
                  </motion.h2>
               </div>

               <div className="relative">
                  {/* Vertical line — visible on sm+ */}
                  <div className="absolute left-5 sm:left-6 top-0 bottom-0 w-0.5 hidden xs:block"
                     style={{ background: `linear-gradient(to bottom, ${C.neonPink}, ${C.neonCyan}, ${C.neonLime}, ${C.neonPink}, ${C.neonCyan})` }} />

                  <div className="space-y-4 sm:space-y-6 md:space-y-8 xs:pl-14 sm:pl-16">
                     {PROCESS.map((step, i) => (
                        <motion.div key={i}
                           initial={{ opacity: 0, x: -60 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true, margin: "-40px" }}
                           transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                           className="relative flex gap-4 sm:gap-6 md:gap-8 items-start p-4 sm:p-5 md:p-7 rounded-2xl sm:rounded-3xl group cursor-default border"
                           style={{ background: C.cardBg, borderColor: `${step.color}25` }}
                           whileHover={{ x: 8, boxShadow: `0 0 40px ${step.color}20`, borderColor: `${step.color}60` }}>
                           {/* Step bubble */}
                           <div className="hidden xs:flex absolute -left-[46px] sm:-left-[52px] top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full items-center justify-center text-black text-[10px] sm:text-xs font-black z-10"
                              style={{ background: step.color, boxShadow: `0 0 16px ${step.color}70` }}>
                              {step.step}
                           </div>
                           {/* Icon */}
                           <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl md:text-3xl flex-shrink-0 border"
                              style={{ background: `${step.color}15`, borderColor: `${step.color}30` }}>
                              {step.icon}
                           </div>
                           <div>
                              <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest mb-0.5 xs:hidden" style={{ color: step.color }}>Step {step.step}</div>
                              <h3 className="text-base sm:text-lg md:text-xl font-black uppercase italic mb-1" style={{ color: step.color }}>{step.title}</h3>
                              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: C.muted }}>{step.desc}</p>
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </div>
         </section>

         {/* ── WHY US ───────────────────────────────────────────────────────────── */}
         <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden" style={{ background: C.cardBg }}>
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg, #FF2A85 0, #FF2A85 1px, transparent 1px, transparent 20px)" }} />
            <div className="max-w-7xl mx-auto relative z-10">
               <div className="text-center mb-10 sm:mb-16 md:mb-20">
                  <SectionTag color={C.neonPink}>Why VOLT 💎</SectionTag>
                  <motion.h2 {...rvL(1)} className="text-[clamp(1.75rem,5vw,3.5rem)] xl:text-6xl font-black italic tracking-tighter" style={{ color: C.white }}>
                     Numbers That<br />
                     <motion.span initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ color: C.neonPink }}>Say It All</motion.span>
                  </motion.h2>
               </div>

               {/* Stats grid */}
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-10 sm:mb-16 md:mb-20">
                  {[
                     { v: 500, s: "+", l: "Events Produced", icon: "⚡" },
                     { v: 99, s: "%", l: "Client Satisfaction", icon: "💎" },
                     { v: 800, s: "+", l: "Five-Star Reviews", icon: "⭐" },
                     { v: 30, s: "+", l: "Cities Covered", icon: "🌍" },
                  ].map((stat, i) => (
                     <motion.div key={i}
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ y: -6, x: 4, scale: 1.04 }}
                        className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl text-center relative overflow-hidden border"
                        style={{ background: C.darkBg, borderColor: `${[C.neonPink, C.neonCyan, C.neonLime, C.neonPink][i]}30`, boxShadow: `0 0 30px ${[C.neonPink, C.neonCyan, C.neonLime, C.neonPink][i]}10` }}>
                        <div className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3">{stat.icon}</div>
                        <div className="text-2xl sm:text-3xl md:text-5xl font-black italic mb-1.5 sm:mb-2" style={{ color: [C.neonPink, C.neonCyan, C.neonLime, C.neonPink][i] }}><Counter to={stat.v} suffix={stat.s} /></div>
                        <div className="text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider leading-tight" style={{ color: C.muted }}>{stat.l}</div>
                     </motion.div>
                  ))}
               </div>

               {/* Feature cards */}
               <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                  {[
                     { title: "Raw Energy", desc: "Every element of every event is engineered to hit harder, go louder, and feel more alive.", icon: "⚡", color: C.neonPink },
                     { title: "Zero Stress", desc: "You live in the moment. We handle every cable, every cue, every crowd surge with precision.", icon: "🧘", color: C.neonCyan },
                     { title: "Pure Voltage", desc: "From 48-hour pop-ups to 6-month mega productions — we always deliver maximum impact.", icon: "🔋", color: C.neonLime },
                  ].map((item, i) => (
                     <motion.div key={i}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                        className="flex gap-3 sm:gap-4 p-4 sm:p-5 md:p-7 rounded-xl sm:rounded-2xl border"
                        style={{ background: C.darkBg, borderColor: `${item.color}25` }}>
                        <div className="text-2xl sm:text-3xl flex-shrink-0">{item.icon}</div>
                        <div>
                           <h4 className="font-black uppercase italic mb-1.5 text-sm sm:text-base" style={{ color: item.color }}>{item.title}</h4>
                           <p className="text-xs sm:text-sm leading-relaxed" style={{ color: C.muted }}>{item.desc}</p>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── PRICING ──────────────────────────────────────────────────────────── */}
         <section id="pricing" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative" style={{ background: C.darkBg }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 sm:w-96 h-64 sm:h-96 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none opacity-15" style={{ background: C.neonPink }} />
            <div className="max-w-6xl mx-auto relative z-10">
               <div className="text-center mb-10 sm:mb-16 md:mb-20">
                  <SectionTag color={C.neonLime}>Packages 🎁</SectionTag>
                  <motion.h2 {...rvL(1)} className="text-[clamp(1.75rem,5vw,3.5rem)] xl:text-6xl font-black italic tracking-tighter" style={{ color: C.white }}>
                     Pick Your<br />
                     <motion.span initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ color: C.neonLime }}>Power Plan</motion.span>
                  </motion.h2>
               </div>

               {/* Pricing grid — stacks to 1 col on mobile, 3 cols on lg */}
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 items-start">
                  {PRICING.map((pkg, i) => (
                     <motion.div key={i}
                        initial={{ opacity: 0, x: i === 1 ? 0 : i === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ y: -12, scale: 1.02 }}
                        className="relative rounded-2xl sm:rounded-3xl overflow-hidden border"
                        style={{
                           background: pkg.popular ? `linear-gradient(135deg, ${C.neonPink}25, ${C.neonCyan}15)` : C.cardBg,
                           borderColor: pkg.popular ? C.neonPink : `${pkg.color}30`,
                           boxShadow: pkg.popular ? `0 0 60px ${C.neonPink}30` : `0 4px 20px rgba(0,0,0,0.3)`,
                        }}>
                        {pkg.popular && <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${C.neonPink}, ${C.neonCyan}, ${C.neonLime})` }} />}
                        <div className="p-5 sm:p-6 md:p-8">
                           {pkg.popular && <div className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 sm:mb-4 border" style={{ borderColor: `${C.neonPink}60`, color: C.neonPink, background: `${C.neonPink}15` }}>⭐ Most Powerful</div>}
                           <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{["⚡", "🔋", "💥"][i]}</div>
                           <h3 className="text-xl sm:text-2xl font-black uppercase italic mb-2" style={{ color: pkg.popular ? C.neonPink : pkg.color }}>{pkg.name}</h3>
                           <p className="text-xs sm:text-sm mb-4 sm:mb-5" style={{ color: C.muted }}>{pkg.desc}</p>
                           <div className="text-3xl sm:text-4xl md:text-5xl font-black italic mb-5 sm:mb-7" style={{ color: pkg.popular ? C.white : pkg.color }}>
                              {pkg.price}{pkg.price !== "Custom" && <span className="text-xs sm:text-sm font-semibold opacity-40 ml-1">onwards</span>}
                           </div>
                           <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                              {pkg.features.map((f, j) => (
                                 <li key={j} className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm">
                                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[9px] sm:text-[10px] border"
                                       style={{ borderColor: `${pkg.color}60`, color: pkg.color, background: `${pkg.color}15` }}>✓</div>
                                    <span style={{ color: C.muted }}>{f}</span>
                                 </li>
                              ))}
                           </ul>
                           <motion.button whileHover={{ scale: 1.03, x: 4 }} whileTap={{ scale: 0.97 }}
                              className="w-full py-3 sm:py-4 rounded-full font-black text-xs sm:text-sm uppercase tracking-widest"
                              style={pkg.popular
                                 ? { background: C.neonPink, color: "black", boxShadow: `0 0 20px ${C.neonPink}50` }
                                 : { background: `${pkg.color}15`, color: pkg.color, border: `1px solid ${pkg.color}50` }}>
                              Get Started ⚡
                           </motion.button>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── TESTIMONIALS ─────────────────────────────────────────────────────── */}
         <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden" style={{ background: C.cardBg }}>
            <div className="absolute top-0 right-0 w-48 sm:w-80 h-48 sm:h-80 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none opacity-15" style={{ background: C.neonCyan }} />
            <div className="max-w-4xl mx-auto relative z-10">
               <div className="text-center mb-10 sm:mb-16 md:mb-20">
                  <SectionTag color={C.neonCyan}>Love Notes 💌</SectionTag>
                  <motion.h2 {...rvL(1)} className="text-[clamp(1.75rem,5vw,3.5rem)] xl:text-6xl font-black italic tracking-tighter" style={{ color: C.white }}>
                     The Crowd<br />
                     <motion.span initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ color: C.neonCyan }}>Has Spoken!</motion.span>
                  </motion.h2>
               </div>

               <AnimatePresence mode="wait">
                  <motion.div key={activeTestimonial}
                     initial={{ opacity: 0, x: -60, scale: 0.95 }}
                     animate={{ opacity: 1, x: 0, scale: 1 }}
                     exit={{ opacity: 0, x: 60, scale: 0.95 }}
                     transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                     className="relative p-5 sm:p-7 md:p-10 rounded-2xl sm:rounded-3xl text-center overflow-hidden border"
                     style={{ background: C.darkBg, borderColor: `${TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.color || C.neonPink}40`, boxShadow: `0 0 60px ${TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.color || C.neonPink}15` }}>
                     <div className="text-5xl sm:text-6xl md:text-8xl font-black absolute top-2 sm:top-4 left-4 sm:left-6 leading-none opacity-10 italic"
                        style={{ color: TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.color || C.neonPink }}>"</div>
                     <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">💬</div>
                     <p className="text-base sm:text-lg md:text-2xl font-semibold leading-relaxed mb-6 sm:mb-8 relative z-10" style={{ color: C.white }}>
                        "{TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.text}"
                     </p>
                     <div className="flex items-center justify-center gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-black font-black text-sm border"
                           style={{ background: TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.color || C.neonPink, borderColor: TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.color || C.neonPink }}>
                           {TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.avatar}
                        </div>
                        <div className="text-left">
                           <div className="font-black text-sm sm:text-base uppercase italic" style={{ color: C.white }}>{TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.name}</div>
                           <div className="text-[10px] sm:text-xs uppercase tracking-wider" style={{ color: C.muted }}>{TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.role}</div>
                        </div>
                     </div>
                  </motion.div>
               </AnimatePresence>

               <div className="flex justify-center gap-2.5 sm:gap-3 mt-6 sm:mt-8">
                  {TESTIMONIALS.map((_, i) => (
                     <button key={i} onClick={() => setActiveTestimonial(i)}
                        className="h-2 rounded-full transition-all duration-300"
                        style={{ width: i === activeTestimonial % TESTIMONIALS.length ? 28 : 8, background: i === activeTestimonial % TESTIMONIALS.length ? C.neonPink : `${C.neonPink}30` }} />
                  ))}
               </div>
            </div>
         </section>

         {/* ── TEAM ─────────────────────────────────────────────────────────────── */}
         <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6" style={{ background: C.darkBg }}>
            <div className="max-w-6xl mx-auto">
               <div className="text-center mb-10 sm:mb-16 md:mb-20">
                  <SectionTag color={C.neonLime}>Our Crew 🤝</SectionTag>
                  <motion.h2 {...rvL(1)} className="text-[clamp(1.75rem,5vw,3.5rem)] xl:text-6xl font-black italic tracking-tighter" style={{ color: C.white }}>
                     The Voltage<br />
                     <motion.span initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ color: C.neonLime }}>Makers</motion.span>
                  </motion.h2>
               </div>
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                  {TEAM.map((member, i) => (
                     <motion.div key={i}
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ y: -10, x: 4 }}
                        className="group rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer border"
                        style={{ background: C.cardBg, borderColor: `${member.color}25` }}>
                        <div className="relative flex items-center justify-center overflow-hidden"
                           style={{ height: "clamp(120px, 20vw, 224px)", background: `linear-gradient(135deg, ${member.color}15, ${member.color}30)` }}>
                           <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center text-black font-black text-xl sm:text-2xl md:text-3xl border-2"
                              style={{ background: member.color, borderColor: member.color, boxShadow: `0 0 30px ${member.color}60` }}>
                              {member.name[0]}
                           </div>
                           <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2 sm:p-3"
                              style={{ background: `linear-gradient(to top, ${member.color}cc, transparent)` }}>
                              <div className="flex gap-1.5 sm:gap-2">
                                 {["in", "tw", "ig"].map(s => (
                                    <div key={s} className="w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-black text-[8px] sm:text-[9px] font-black uppercase" style={{ background: member.color }}>{s}</div>
                                 ))}
                              </div>
                           </div>
                        </div>
                        <div className="p-3 sm:p-4 md:p-5">
                           <span className="inline-block px-2 sm:px-2.5 py-1 rounded-full text-[8px] sm:text-[9px] font-black uppercase tracking-widest mb-1.5 sm:mb-2 border"
                              style={{ background: `${member.color}15`, color: member.color, borderColor: `${member.color}40` }}>
                              {member.badge}
                           </span>
                           <h4 className="font-black text-sm sm:text-base uppercase italic" style={{ color: C.white }}>{member.name}</h4>
                           <p className="text-[10px] sm:text-xs mt-0.5 uppercase tracking-wider" style={{ color: C.muted }}>{member.role}</p>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── GALLERY ──────────────────────────────────────────────────────────── */}
         <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative" style={{ background: C.cardBg }}>
            <div className="max-w-7xl mx-auto">
               <div className="text-center mb-10 sm:mb-16 md:mb-20">
                  <SectionTag color={C.neonCyan}>Gallery 📸</SectionTag>
                  <motion.h2 {...rvL(1)} className="text-[clamp(1.75rem,5vw,3.5rem)] xl:text-6xl font-black italic tracking-tighter" style={{ color: C.white }}>
                     Frames from<br />
                     <motion.span initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ color: C.neonCyan }}>Our Best Nights</motion.span>
                  </motion.h2>
               </div>

               {/* Responsive masonry — 2 cols on mobile, 3 on md+ */}
               <div className="columns-2 md:columns-3 gap-2.5 sm:gap-3 md:gap-4">
                  {GALLERY.map((img, i) => (
                     <motion.div key={i}
                        initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-30px" }}
                        transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ scale: 1.02, x: 2 }}
                        onClick={() => setLightbox(img)}
                        className="break-inside-avoid relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group mb-2.5 sm:mb-3 md:mb-4 border"
                        style={{
                           height: i % 3 === 0 ? "clamp(130px, 20vw, 220px)" : i % 3 === 1 ? "clamp(100px, 15vw, 160px)" : "clamp(115px, 17vw, 190px)",
                           borderColor: "transparent"
                        }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = C.neonPink}
                        onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}>
                        <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 mix-blend-luminosity group-hover:mix-blend-normal" />
                        <div className="absolute inset-0 bg-transparent group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
                           <div className="opacity-0 group-hover:opacity-100 text-2xl sm:text-3xl transition-opacity" style={{ color: C.neonPink }}>🔍</div>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
               {lightbox && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                     className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6 md:p-8"
                     onClick={() => setLightbox(null)}>
                     <motion.img initial={{ scale: 0.8, x: -60 }} animate={{ scale: 1, x: 0 }} exit={{ scale: 0.8, x: 60 }}
                        src={lightbox} alt="Gallery" className="max-w-4xl w-full max-h-[85vh] object-contain rounded-2xl sm:rounded-3xl border"
                        style={{ borderColor: `${C.neonPink}60`, boxShadow: `0 0 80px ${C.neonPink}30` }} />
                     <button className="absolute top-4 sm:top-6 right-4 sm:right-6 text-white/60 hover:text-white text-2xl sm:text-3xl font-black w-10 h-10 flex items-center justify-center" onClick={() => setLightbox(null)}>✕</button>
                  </motion.div>
               )}
            </AnimatePresence>
         </section>

         {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
         <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6" style={{ background: C.darkBg }}>
            <div className="max-w-3xl mx-auto">
               <div className="text-center mb-10 sm:mb-16 md:mb-20">
                  <SectionTag color={C.neonCyan}>FAQ 💬</SectionTag>
                  <motion.h2 {...rvL(1)} className="text-[clamp(1.75rem,5vw,3.5rem)] xl:text-6xl font-black italic tracking-tighter" style={{ color: C.white }}>
                     Got Questions?<br />
                     <motion.span initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ color: C.neonCyan }}>We've Got Voltage!</motion.span>
                  </motion.h2>
               </div>
               <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
                  {FAQS.map((faq, i) => (
                     <motion.div key={i}
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                        className="rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer border transition-colors duration-200"
                        style={{ background: C.cardBg, borderColor: activeFaq === i ? C.neonPink : `${C.neonPink}15`, boxShadow: activeFaq === i ? `0 0 30px ${C.neonPink}15` : "none" }}
                        onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                        <div className="flex items-center justify-between p-4 sm:p-5 md:p-6 gap-3 sm:gap-4">
                           <h4 className="font-black text-xs sm:text-sm md:text-base uppercase" style={{ color: C.white }}>{faq.q}</h4>
                           <motion.div animate={{ rotate: activeFaq === i ? 45 : 0 }}
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex-shrink-0 flex items-center justify-center font-black border"
                              style={{ background: activeFaq === i ? C.neonPink : "transparent", borderColor: activeFaq === i ? C.neonPink : C.muted, color: activeFaq === i ? "black" : C.muted }}>+</motion.div>
                        </div>
                        <AnimatePresence>
                           {activeFaq === i && (
                              <motion.div initial={{ height: 0, opacity: 0, x: -20 }} animate={{ height: "auto", opacity: 1, x: 0 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                                 <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 text-xs sm:text-sm leading-relaxed border-t" style={{ color: C.muted, borderColor: `${C.neonPink}20` }}>{faq.a}</div>
                              </motion.div>
                           )}
                        </AnimatePresence>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── CONTACT ──────────────────────────────────────────────────────────── */}
         <section id="contact" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden" style={{ background: C.cardBg }}>
            <div className="absolute top-0 left-0 w-48 sm:w-72 h-48 sm:h-72 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none opacity-25" style={{ background: C.neonPink }} />
            <div className="absolute bottom-0 right-0 w-56 sm:w-80 h-56 sm:h-80 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none opacity-20" style={{ background: C.neonCyan }} />
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg, #FF2A85 0, #FF2A85 1px, transparent 1px, transparent 20px)" }} />
            <div className="max-w-6xl mx-auto relative z-10">
               <div className="text-center mb-10 sm:mb-16 md:mb-20">
                  <SectionTag color={C.neonPink}>Let's Talk 🎊</SectionTag>
                  <motion.h2 {...rvL(1)} className="text-[clamp(2rem,6vw,4rem)] xl:text-7xl font-black italic tracking-tighter leading-tight" style={{ color: C.white }}>
                     Ready to Light<br />
                     <motion.span initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ delay: 0.25, duration: 0.65 }} style={{ color: C.neonPink }}>It Up?</motion.span>
                  </motion.h2>
               </div>

               <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start">
                  {/* Contact info */}
                  <div className="space-y-3 sm:space-y-4 md:space-y-5">
                     {[
                        { icon: "✉️", label: "Email", val: d.contactEmail, color: C.neonPink },
                        { icon: "📞", label: "Phone", val: d.phone || "+91 99999 88888", color: C.neonCyan },
                        { icon: "📍", label: "Studio", val: d.address, color: C.neonLime },
                     ].map((item, i) => (
                        <motion.div key={i}
                           initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                           whileHover={{ x: 8 }}
                           className="flex gap-3 sm:gap-4 p-3.5 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border"
                           style={{ background: C.darkBg, borderColor: `${item.color}25` }}>
                           <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center text-lg sm:text-xl flex-shrink-0 border"
                              style={{ background: `${item.color}15`, borderColor: `${item.color}40` }}>{item.icon}</div>
                           <div className="min-w-0">
                              <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest mb-0.5" style={{ color: item.color }}>{item.label}</div>
                              <div className="font-semibold text-xs sm:text-sm md:text-base break-all" style={{ color: C.white }}>{item.val}</div>
                           </div>
                        </motion.div>
                     ))}

                     <motion.div
                        initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ delay: 0.35 }}
                        className="p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl text-center border"
                        style={{ background: C.darkBg, borderColor: `${C.neonPink}40`, boxShadow: `0 0 30px ${C.neonPink}20` }}>
                        <div className="font-black text-sm sm:text-base md:text-lg mb-1 italic uppercase" style={{ color: C.neonPink }}>⚡ Over 500 Epic Events!</div>
                        <div className="text-xs sm:text-sm" style={{ color: C.muted }}>Join our roster of legendary clients</div>
                     </motion.div>
                  </div>

                  {/* Contact form */}
                  <motion.div
                     initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                     className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border"
                     style={{ background: C.darkBg, borderColor: `${C.neonPink}30`, boxShadow: `0 0 60px ${C.neonPink}10` }}>
                     <h3 className="text-base sm:text-lg md:text-xl font-black uppercase italic mb-4 sm:mb-5" style={{ color: C.white }}>Tell us about your event ⚡</h3>
                     <div className="space-y-3 sm:space-y-4">
                        <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                           {["Your Name ⚡", "Company / Brand"].map(ph => (
                              <input key={ph} placeholder={ph}
                                 className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold border-2 outline-none transition-colors"
                                 style={{ background: C.cardBg, borderColor: `${C.neonPink}20`, color: C.white }}
                                 onFocus={e => e.target.style.borderColor = C.neonPink}
                                 onBlur={e => e.target.style.borderColor = `${C.neonPink}20`} />
                           ))}
                        </div>
                        <input placeholder="Email Address 📧"
                           className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold border-2 outline-none transition-colors"
                           style={{ background: C.cardBg, borderColor: `${C.neonPink}20`, color: C.white }}
                           onFocus={e => e.target.style.borderColor = C.neonPink}
                           onBlur={e => e.target.style.borderColor = `${C.neonPink}20`} />
                        <select className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold border-2 outline-none cursor-pointer appearance-none"
                           style={{ background: C.cardBg, borderColor: `${C.neonPink}20`, color: C.muted }}>
                           <option value="">Event Type 🎭</option>
                           {CATEGORIES.map(c => <option key={c.label}>{c.emoji} {c.label}</option>)}
                        </select>
                        <textarea rows={4} placeholder="Describe the vibe. What are you building? ⚡"
                           className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold border-2 outline-none resize-none transition-colors"
                           style={{ background: C.cardBg, borderColor: `${C.neonPink}20`, color: C.white }}
                           onFocus={e => e.target.style.borderColor = C.neonPink}
                           onBlur={e => e.target.style.borderColor = `${C.neonPink}20`} />
                        <motion.button whileHover={{ scale: 1.02, x: 4 }} whileTap={{ scale: 0.97 }}
                           className="w-full py-3 sm:py-4 rounded-full font-black text-black text-xs sm:text-sm uppercase tracking-widest"
                           style={{ background: C.neonCyan, boxShadow: `0 0 30px ${C.neonCyan}40` }}>
                           Ignite Project ⚡ →
                        </motion.button>
                     </div>
                  </motion.div>
               </div>
            </div>
         </section>

         {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
         <footer className="px-4 sm:px-6 pt-12 sm:pt-16 md:pt-20 pb-6 sm:pb-8 border-t" style={{ background: C.darkBg, borderColor: "rgba(255,255,255,0.06)" }}>
            <div className="max-w-7xl mx-auto">
               <div className="flex flex-col md:flex-row justify-between items-start gap-8 sm:gap-10 pb-8 sm:pb-10 md:pb-14 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                  {/* Brand */}
                  <motion.div {...rvL(0)} className="max-w-xs">
                     <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center text-black font-black"
                           style={{ background: `linear-gradient(135deg, ${C.neonPink}, ${C.neonCyan})` }}>V</div>
                        <span className="font-black text-base sm:text-lg italic tracking-tighter" style={{ color: C.neonLime }}>{d.agencyName}</span>
                     </div>
                     <p className="text-xs sm:text-sm leading-relaxed" style={{ color: C.muted }}>{d.tagline}</p>
                     <div className="flex gap-2.5 sm:gap-3 mt-4 sm:mt-5">
                        {["in", "tw", "ig", "yt"].map(s => (
                           <a key={s} href="#"
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-black uppercase transition-all hover:scale-110 border"
                              style={{ background: `${C.neonPink}15`, borderColor: `${C.neonPink}40`, color: C.neonPink }}>
                              {s}
                           </a>
                        ))}
                     </div>
                  </motion.div>

                  {/* Links */}
                  <motion.div {...rvR(0)} className="grid grid-cols-3 gap-6 sm:gap-8 md:gap-12 w-full md:w-auto">
                     {[
                        { title: "Services", links: ["Festivals", "Tech Expos", "Nightlife", "Corporate"] },
                        { title: "Company", links: ["About Us", "Projects", "Our Crew", "Blog"] },
                        { title: "Legal", links: ["Privacy Policy", "Terms", "Cookies"] },
                     ].map(col => (
                        <div key={col.title}>
                           <h5 className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest mb-3 sm:mb-4" style={{ color: C.neonPink }}>{col.title}</h5>
                           <ul className="space-y-2 sm:space-y-2.5">
                              {col.links.map(link => (
                                 <li key={link}>
                                    <a href="#" className="text-[10px] sm:text-xs font-medium hover:text-white transition-colors uppercase tracking-wide" style={{ color: C.muted }}>{link}</a>
                                 </li>
                              ))}
                           </ul>
                        </div>
                     ))}
                  </motion.div>
               </div>

               {/* Footer bottom */}
               <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 pt-6 sm:pt-8">
                  <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider" style={{ color: C.midMuted }}>{d.footerCopyright}</p>
                  <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-wider" style={{ color: C.midMuted }}>
                     <span>Made with</span>
                     <span style={{ color: C.neonPink }}>⚡</span>
                     <span>for every electric night</span>
                  </div>
               </div>
            </div>
         </footer>
      </div>
   );
}