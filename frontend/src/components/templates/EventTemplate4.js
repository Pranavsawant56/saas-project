import { useState, useEffect, useRef, useCallback } from "react";
import {
   motion,
   useScroll,
   useTransform,
   AnimatePresence,
   useInView,
   useSpring,
} from "framer-motion";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const T = {
   sky: "#E8F4FD",
   skyMid: "#C5E4F8",
   azure: "#2B9FE8",
   azureDark: "#1A7CC5",
   lime: "#A8E63D",
   limeDark: "#7DC417",
   peach: "#FFB085",
   peachDark: "#FF8A42",
   rose: "#FF6B9D",
   roseDark: "#E84E84",
   mint: "#3DE8C5",
   mintDark: "#1EC9A6",
   gold: "#FFD166",
   goldDark: "#F0B429",
   pearl: "#FAFCFF",
   white: "#FFFFFF",
   ink: "#0D1B2A",
   slate: "#2C4A6E",
   muted: "#7A96B2",
   light: "#EBF4FF",
};

// ─── DEFAULT DATA ─────────────────────────────────────────────────────────────
const DEFAULT_DATA = {
   agencyName: "Luminary Events",
   tagline: "Where Dreams Become Celebrations",
   heroTitle: "Craft Moments That Last Forever.",
   bio: "Luminary Events is an award-winning full-service event production studio. We blend artistry, technology, and passion to create experiences that move people—from intimate soirées to grand spectacles. Every detail is thoughtfully designed, every moment meticulously orchestrated.",
   aboutUsTitle: "Our Story",
   contactEmail: "hello@luminaryevents.in",
   phone: "+91 98765 43210",
   address: "The Studio, Bandra West, Mumbai — 400050",
   footerCopyright: `© ${new Date().getFullYear()} Luminary Events. All rights reserved.`,
   heroImage: "/images/templates/template-img-38.jpg",
   aboutImage: "/images/templates/template-img-39.jpg",
   services: [],
   projects: [],
};

const DEFAULT_SERVICES = [
   { name: "Luxury Weddings", desc: "From intimate ceremonies to grand affairs—every love story deserves a perfect stage.", icon: "💍", color: T.rose, img: "/images/templates/template-img-36.jpg" },
   { name: "Music Festivals", desc: "Electrifying festival experiences with world-class stage design and production.", icon: "🎶", color: T.azure, img: "/images/templates/template-img-37.jpg" },
   { name: "Corporate Summits", desc: "Sophisticated corporate events that inspire, reward, and leave lasting impressions.", icon: "🏛", color: T.mint, img: "/images/templates/template-img-41.jpg" },
   { name: "Birthday Galas", desc: "Personalized birthday celebrations that become the talk of the season.", icon: "🎂", color: T.gold, img: "/images/templates/template-img-39.jpg" },
   { name: "Product Reveals", desc: "Cinematic product unveilings that ignite conversations and media coverage.", icon: "🚀", color: T.peach, img: "/images/templates/template-img-44.jpg" },
   { name: "Destination Events", desc: "Exotic event experiences in the world's most breathtaking locations.", icon: "🌊", color: T.lime, img: "/images/templates/template-img-45.jpg" },
];

const DEFAULT_PROJECTS = [
   { name: "Azure Coast Wedding", desc: "A seaside ceremony for 600 guests with ocean-view dining and fireworks.", tag: "Wedding", color: T.rose, img: "/images/templates/template-img-44.jpg", stat: "600", emoji: "💍" },
   { name: "Neon Nights 2024", desc: "Mumbai's premier music festival—20,000 attendees, 3 stages, 48 hours of music.", tag: "Festival", color: T.azure, img: "/images/templates/template-img-45.jpg", stat: "20K", emoji: "🎵" },
   { name: "Bloom Summit", desc: "A Fortune 100 company's annual gala reimagined as a floral fantasy world.", tag: "Corporate", color: T.mint, img: "/images/templates/template-img-46.jpg", stat: "1.5K", emoji: "🌸" },
   { name: "Casa Rooftop 40th", desc: "A surprise rooftop birthday under the stars—45 guests, pure magic.", tag: "Birthday", color: T.gold, img: "/images/templates/template-img-47.jpg", stat: "450", emoji: "🎂" },
];

const DEFAULT_CATEGORIES = [
   { label: "Weddings", emoji: "💍", from: "#FF6B9D", to: "#FFB085" },
   { label: "Conferences", emoji: "🎙", from: "#2B9FE8", to: "#3DE8C5" },
   { label: "Concerts", emoji: "🎵", from: "#A8E63D", to: "#2B9FE8" },
   { label: "Exhibitions", emoji: "🖼", from: "#3DE8C5", to: "#FFD166" },
   { label: "Product Launches", emoji: "🚀", from: "#FFB085", to: "#FF6B9D" },
   { label: "Corporate", emoji: "💼", from: "#FFD166", to: "#A8E63D" },
   { label: "Birthdays", emoji: "🎂", from: "#FF6B9D", to: "#2B9FE8" },
   { label: "Galas", emoji: "✨", from: "#3DE8C5", to: "#FFB085" },
];

const DEFAULT_PROCESS = [
   { step: "01", title: "Discovery Call", desc: "We understand your vision, goals, and the story you want to tell.", icon: "🔍", color: T.azure },
   { step: "02", title: "Concept Design", desc: "Moodboards, palettes, layouts—your event universe takes shape.", icon: "🎨", color: T.rose },
   { step: "03", title: "Production", desc: "Every element crafted: décor, staging, tech, logistics, catering.", icon: "⚙️", color: T.mint },
   { step: "04", title: "Rehearsal", desc: "A full dry-run to ensure flawless, stress-free execution.", icon: "🎭", color: T.gold },
   { step: "05", title: "Event Day", desc: "Our team orchestrates every moment so you can live in it.", icon: "✨", color: T.peach },
   { step: "06", title: "Memories", desc: "Curated photos, videos, and content delivered within 48 hours.", icon: "📸", color: T.lime },
];

const DEFAULT_TESTIMONIALS = [
   { name: "Ananya Reddy", role: "Bride, Azure Coast Wedding", text: "Luminary didn't just plan our wedding—they painted a dream. Every single detail was beyond what we imagined.", avatar: "AR", color: T.rose },
   { name: "Vikram Kapoor", role: "CEO, NovaTech", text: "Our product launch became a cultural moment. The design, the execution, the energy—completely world-class.", avatar: "VK", color: T.azure },
   { name: "Seema Jain", role: "Host, Casa Rooftop 40th", text: "I wept the moment I saw the setup. Luminary turned a blank rooftop into an absolute fairytale. Unmatched.", avatar: "SJ", color: T.mint },
   { name: "Rohit Sharma", role: "Director, Bloom Summit", text: "Working with Luminary is effortless. They anticipate everything. Our guests were absolutely blown away.", avatar: "RS", color: T.gold },
];

const DEFAULT_TEAM = [
   { name: "Aisha Verma", role: "Creative Director", badge: "Vision", color: T.rose },
   { name: "Dev Malhotra", role: "Production Head", badge: "Operations", color: T.azure },
   { name: "Priti Nair", role: "Design Lead", badge: "Aesthetics", color: T.mint },
   { name: "Sameer Khan", role: "Tech & Lighting", badge: "Production", color: T.gold },
   { name: "Neha Bose", role: "Client Relations", badge: "Experience", color: T.peach },
   { name: "Aryan Mehta", role: "Logistics Expert", badge: "Execution", color: T.lime },
];

const DEFAULT_PRICING = [
   { name: "Spark", price: "₹75K", desc: "Perfect for intimate celebrations up to 100 guests.", color: T.azure, features: ["Up to 100 guests", "Creative direction", "Day-of coordination", "Décor package", "Event photography"] },
   { name: "Radiance", price: "₹2.2L", desc: "Our signature mid-scale package.", color: T.rose, popular: true, features: ["Up to 400 guests", "Full décor & styling", "Team of 12", "Premium A/V", "Video highlights", "Content delivery"] },
   { name: "Luminary", price: "Custom", desc: "For legendary, boundless experiences.", color: T.mint, features: ["Unlimited scale", "Bespoke universe", "Full production", "Global logistics", "PR & media", "Year-long support"] },
];

const DEFAULT_FAQS = [
   { q: "How far in advance should we book?", a: "For weddings and large events, 8–12 months is ideal. For smaller celebrations, 6–8 weeks typically works well." },
   { q: "Do you handle destination events?", a: "Absolutely. We've produced events in Goa, Udaipur, Maldives, Bali, and across Europe. Our destination team handles all logistics." },
   { q: "What's included in your packages?", a: "All packages include creative direction, vendor management, day-of coordination, and post-event content delivery." },
   { q: "Can you work with existing vendors?", a: "Yes. We collaborate seamlessly with your preferred vendors, or we can introduce you to our vetted partner network." },
   { q: "How is content delivered post-event?", a: "Within 48 hours: curated photo album, highlight video, and a complete social content pack." },
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

const DEFAULT_CLIENTS = ["Taj Hotels", "Infosys", "Zara India", "HDFC Bank", "Nykaa", "Tata Motors", "Google India", "Reliance", "Vogue India", "Netflix India"];

// ─── CSS HERO CANVAS (replaces ThreeHeroCanvas) ───────────────────────────────
function HeroCanvas() {
   const shapes = [
      { size: 88, color: T.azure, top: "18%", left: "8%", delay: 0, duration: 6 },
      { size: 68, color: T.rose, top: "65%", left: "82%", delay: 1.1, duration: 7 },
      { size: 80, color: T.lime, top: "22%", left: "78%", delay: 0.7, duration: 5.5 },
      { size: 56, color: T.gold, top: "72%", left: "14%", delay: 1.8, duration: 8 },
      { size: 44, color: T.mint, top: "44%", left: "92%", delay: 0.4, duration: 6.5 },
      { size: 36, color: T.peach, top: "10%", left: "55%", delay: 2.1, duration: 5 },
      { size: 52, color: T.azure, top: "82%", left: "60%", delay: 0.9, duration: 7.5 },
      { size: 30, color: T.rose, top: "50%", left: "3%", delay: 1.5, duration: 6 },
   ];

   return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
         {shapes.map((s, i) => (
            <motion.div
               key={i}
               className="absolute rounded-[30%] rotate-12"
               style={{
                  width: s.size,
                  height: s.size,
                  top: s.top,
                  left: s.left,
                  background: `${s.color}22`,
                  border: `2px solid ${s.color}40`,
                  backdropFilter: "blur(2px)",
               }}
               animate={{ y: [0, -20, 0], rotate: [12, 45, 12], scale: [1, 1.08, 1] }}
               transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
            />
         ))}
         {/* Particle dots */}
         {Array.from({ length: 24 }).map((_, i) => (
            <motion.div
               key={`dot-${i}`}
               className="absolute rounded-full"
               style={{
                  width: 4,
                  height: 4,
                  background: T.azure,
                  top: `${10 + (i * 37) % 80}%`,
                  left: `${5 + (i * 23) % 90}%`,
                  opacity: 0.35,
               }}
               animate={{ y: [0, -12, 0], opacity: [0.35, 0.65, 0.35] }}
               transition={{ duration: 3 + (i % 4), delay: i * 0.18, repeat: Infinity, ease: "easeInOut" }}
            />
         ))}
      </div>
   );
}

// ─── CSS FLOATING ORBS (replaces ThreeFloatingOrbs) ───────────────────────────
function FloatingOrbs({ colors = [T.azure, T.rose, T.lime] }) {
   return (
      <div className="w-full h-full flex items-center justify-center gap-4 px-3">
         {colors.map((color, i) => (
            <motion.div
               key={i}
               className="rounded-full flex-shrink-0"
               style={{
                  width: 18 + i * 6,
                  height: 18 + i * 6,
                  background: `radial-gradient(circle at 35% 35%, ${color}CC, ${color}66)`,
                  boxShadow: `0 4px 16px ${color}55`,
               }}
               animate={{ y: [0, -8, 0] }}
               transition={{ duration: 2.5 + i * 0.5, delay: i * 0.7, repeat: Infinity, ease: "easeInOut" }}
            />
         ))}
      </div>
   );
}

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────
function Counter({ to, suffix = "" }) {
   const ref = useRef(null);
   const inView = useInView(ref, { once: true });
   const [val, setVal] = useState(0);
   useEffect(() => {
      if (!inView) return;
      let start = null;
      const go = (ts) => {
         if (!start) start = ts;
         const p = Math.min((ts - start) / 1800, 1);
         setVal(Math.floor(p * to));
         if (p < 1) requestAnimationFrame(go);
         else setVal(to);
      };
      requestAnimationFrame(go);
   }, [inView, to]);
   return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

// ─── SECTION TAG ─────────────────────────────────────────────────────────────
function Tag({ color, children }) {
   return (
      <motion.span
         initial={{ opacity: 0, y: 12 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
         style={{ background: `${color}18`, color, border: `1.5px solid ${color}30` }}
      >
         {children}
      </motion.span>
   );
}

// ─── REVEAL VARIANT ──────────────────────────────────────────────────────────
const rv = (i = 0, dir = "up") => ({
   initial: { opacity: 0, y: dir === "up" ? 36 : -36, x: dir === "left" ? -36 : dir === "right" ? 36 : 0 },
   whileInView: { opacity: 1, y: 0, x: 0 },
   viewport: { once: true, margin: "-50px" },
   transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
});

// ─── MARQUEE ─────────────────────────────────────────────────────────────────
function Marquee({ items, speed = 35, reverse = false }) {
   return (
      <div className="overflow-hidden">
         <motion.div
            className="inline-flex gap-12 items-center whitespace-nowrap"
            animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
            transition={{ duration: speed, ease: "linear", repeat: Infinity }}
         >
            {[...items, ...items, ...items, ...items].map((item, i) => (
               <span key={i} className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest shrink-0" style={{ color: T.muted }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: [T.azure, T.rose, T.mint, T.gold][i % 4] }} />
                  {item}
               </span>
            ))}
         </motion.div>
      </div>
   );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function EventTemplate4({ data }) {
   const d = { ...DEFAULT_DATA, ...data };
   const services = d.services?.length && d.services.some(s => s.name) ? d.services : DEFAULT_SERVICES;
   const projects = d.projects?.length && d.projects.some(p => p.name) ? d.projects : DEFAULT_PROJECTS;
   const CLIENTS = d.trustedClients?.length > 0 && d.trustedClients.some(c => c.name) ? d.trustedClients.map(c => c.name) : DEFAULT_CLIENTS;
   const CATEGORIES = d.eventCategories?.length > 0 ? d.eventCategories.map((c, i) => ({ ...DEFAULT_CATEGORIES[i % DEFAULT_CATEGORIES.length], label: c.name })) : DEFAULT_CATEGORIES;
   const PROCESS = d.eventPlanningProcess?.length > 0 && d.eventPlanningProcess.some(p => p.step) ? d.eventPlanningProcess.map((p, i) => ({ ...DEFAULT_PROCESS[i % DEFAULT_PROCESS.length], title: p.step, desc: p.desc })) : DEFAULT_PROCESS;
   const TESTIMONIALS = d.testimonials?.length > 0 && d.testimonials.some(t => t.review) ? d.testimonials.map((t, i) => ({ name: t.clientName, role: t.event, text: t.review, avatar: "T", color: DEFAULT_TESTIMONIALS[i % DEFAULT_TESTIMONIALS.length].color })) : DEFAULT_TESTIMONIALS;
   const TEAM = d.team?.length > 0 && d.team.some(t => t.name) ? d.team.map((t, i) => ({ ...DEFAULT_TEAM[i % DEFAULT_TEAM.length], name: t.name, role: t.role })) : DEFAULT_TEAM;
   const PRICING = d.pricing?.length > 0 && d.pricing.some(p => p.planName) ? d.pricing.map((p, i) => ({ ...DEFAULT_PRICING[i % DEFAULT_PRICING.length], name: p.planName, price: p.price, features: p.features ? p.features.split(",").map(f => f.trim()) : [] })) : DEFAULT_PRICING;
   const FAQS = d.faqs?.length > 0 && d.faqs.some(f => f.question) ? d.faqs.map(f => ({ q: f.question, a: f.answer })) : DEFAULT_FAQS;
   const GALLERY = d.gallery?.length > 0 && d.gallery.some(g => g.image) ? d.gallery.map(g => g.image) : DEFAULT_GALLERY;

   const [activeProject, setActiveProject] = useState(0);
   const [activeTestimonial, setActiveTestimonial] = useState(0);
   const [activeFaq, setActiveFaq] = useState(null);
   const [lightbox, setLightbox] = useState(null);
   const [menuOpen, setMenuOpen] = useState(false);

   const heroRef = useRef(null);
   const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
   const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
   const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

   // Auto-play project slider
   useEffect(() => {
      const t = setInterval(() => setActiveProject(p => (p + 1) % projects.length), 5000);
      return () => clearInterval(t);
   }, [projects.length]);

   // Auto-play testimonials
   useEffect(() => {
      const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 4500);
      return () => clearInterval(t);
   }, [TESTIMONIALS.length]);

   const accentColors = [T.azure, T.rose, T.mint, T.gold, T.peach, T.lime];

   return (
      <div style={{ fontFamily: "'DM Sans', 'Plus Jakarta Sans', system-ui, sans-serif", background: T.pearl, color: T.ink, overflowX: "hidden" }}>

         {/* ── NAVBAR ───────────────────────────────────────────────────────── */}
         <motion.header
            initial={{ y: -70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4"
         >
            <div className="max-w-7xl mx-auto">
               <div className="flex items-center justify-between px-5 sm:px-7 py-3 rounded-2xl"
                  style={{ background: "rgba(250,252,255,0.88)", backdropFilter: "blur(24px)", boxShadow: "0 4px 32px rgba(43,159,232,0.10)", border: "1px solid rgba(43,159,232,0.14)" }}>

                  {/* Logo */}
                  <div className="flex items-center gap-3">
                     <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm"
                        style={{ background: `linear-gradient(135deg, ${T.azure}, ${T.mint})` }}>L</div>
                     <span className="font-black text-lg tracking-tight" style={{ color: T.ink }}>{d.agencyName}</span>
                  </div>

                  {/* Desktop Nav */}
                  <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold" style={{ color: T.slate }}>
                     {["Services", "Work", "Process", "Pricing", "Contact"].map(item => (
                        <a key={item} href={`#${item.toLowerCase()}`}
                           className="relative group transition-colors hover:opacity-80">
                           {item}
                           <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300 rounded-full"
                              style={{ background: T.azure }} />
                        </a>
                     ))}
                  </nav>

                  <div className="hidden lg:block">
                     <motion.a href="#contact" whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.97 }}
                        className="px-5 py-2.5 rounded-xl text-sm font-bold text-white"
                        style={{ background: `linear-gradient(135deg, ${T.azure}, ${T.mint})`, boxShadow: `0 6px 20px ${T.azure}35` }}>
                        Get in Touch ✨
                     </motion.a>
                  </div>

                  {/* Hamburger */}
                  <button className="lg:hidden p-2 rounded-lg" style={{ background: `${T.azure}15`, color: T.azure }}
                     onClick={() => setMenuOpen(!menuOpen)}>
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                           d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                     </svg>
                  </button>
               </div>

               {/* Mobile Menu */}
               <AnimatePresence>
                  {menuOpen && (
                     <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-4 right-4 mt-2 p-5 rounded-2xl shadow-2xl"
                        style={{ background: "rgba(250,252,255,0.97)", border: `1.5px solid ${T.azure}20` }}>
                        {["Services", "Work", "Process", "Pricing", "Contact"].map(item => (
                           <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                              className="block py-3 text-sm font-semibold border-b" style={{ color: T.slate, borderColor: `${T.azure}15` }}>
                              {item}
                           </a>
                        ))}
                        <a href="#contact" onClick={() => setMenuOpen(false)}
                           className="block mt-4 py-3 text-center rounded-xl text-sm font-bold text-white"
                           style={{ background: `linear-gradient(135deg, ${T.azure}, ${T.mint})` }}>
                           Get in Touch ✨
                        </a>
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>
         </motion.header>

         {/* ── HERO ─────────────────────────────────────────────────────────── */}
         <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-20"
            style={{ background: `linear-gradient(135deg, #EBF7FF 0%, #F4FFFE 40%, #FFFBF0 100%)` }}>

            {/* CSS animated background */}
            <HeroCanvas />

            {/* Soft blobs */}
            <div className="absolute top-20 right-0 w-96 h-96 rounded-full blur-[100px] pointer-events-none opacity-40"
               style={{ background: `${T.azure}` }} />
            <div className="absolute bottom-20 left-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-30"
               style={{ background: T.rose }} />

            <motion.div style={{ y: heroY, opacity: heroOpacity }}
               className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-16">
               <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

                  {/* Left copy */}
                  <div>
                     <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-7"
                        style={{ background: `${T.azure}15`, color: T.azure, border: `1.5px solid ${T.azure}25` }}>
                        <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: T.lime }} />
                        Now Booking 2025 — 2026
                     </motion.div>

                     <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-6xl xl:text-[4.5rem] font-black leading-[1.05] tracking-tight mb-6"
                        style={{ color: T.ink }}>
                        {d.heroTitle.split(" ").map((w, i) => (
                           <motion.span key={i} className="inline-block mr-3"
                              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.15 + i * 0.07 }}
                              style={{ color: accentColors[i % accentColors.length] }}>
                              {w}
                           </motion.span>
                        ))}
                     </motion.h1>

                     <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
                        className="text-lg font-medium leading-relaxed mb-10 max-w-xl" style={{ color: T.slate }}>
                        {d.tagline}
                     </motion.p>

                     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
                        className="flex flex-col sm:flex-row gap-4 mb-12">
                        <motion.a href="#contact" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                           className="px-8 py-4 rounded-2xl font-bold text-sm text-white text-center"
                           style={{ background: `linear-gradient(135deg, ${T.azure}, ${T.mint})`, boxShadow: `0 12px 32px ${T.azure}40` }}>
                           Start Your Event ✨
                        </motion.a>
                        <motion.a href="#work" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                           className="px-8 py-4 rounded-2xl font-bold text-sm text-center border-2"
                           style={{ borderColor: T.azure, color: T.azure, background: "white" }}>
                           View Portfolio →
                        </motion.a>
                     </motion.div>

                     {/* Stats */}
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}
                        className="flex gap-8 sm:gap-12 flex-wrap">
                        {[
                           { v: 600, s: "+", l: "Events", c: T.azure },
                           { v: 98, s: "%", l: "Satisfaction", c: T.rose },
                           { v: 11, s: "yrs", l: "Experience", c: T.mint },
                        ].map((st, i) => (
                           <div key={i}>
                              <div className="text-2xl sm:text-3xl font-black" style={{ color: st.c }}><Counter to={st.v} suffix={st.s} /></div>
                              <div className="text-xs font-semibold mt-0.5" style={{ color: T.muted }}>{st.l}</div>
                           </div>
                        ))}
                     </motion.div>
                  </div>

                  {/* Right — hero image mosaic */}
                  <div className="relative w-full h-[400px] sm:h-[520px] hidden sm:block">
                     {/* Main image */}
                     <motion.div initial={{ opacity: 0, scale: 0.88, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 2 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="absolute inset-4 rounded-[2.5rem] overflow-hidden"
                        style={{ boxShadow: `0 32px 64px ${T.azure}22` }}>
                        <img src={d.heroImage || "/images/templates/template-img-38.jpg"} alt="Event" className="w-full h-full object-cover" />
                        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${T.azure}55, transparent 60%)` }} />
                     </motion.div>

                     {/* Badge 1 */}
                     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                        className="absolute -left-4 top-1/4 rounded-2xl p-4 text-white z-10"
                        style={{ background: `linear-gradient(135deg, ${T.rose}, ${T.peach})`, boxShadow: `0 16px 40px ${T.rose}45` }}>
                        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                           <div className="text-3xl font-black"><Counter to={600} suffix="+" /></div>
                           <div className="text-xs opacity-75 mt-1">Happy Events</div>
                        </motion.div>
                     </motion.div>

                     {/* Badge 2 */}
                     <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}
                        className="absolute -right-4 bottom-1/4 rounded-2xl px-5 py-4 z-10"
                        style={{ background: "white", boxShadow: "0 16px 40px rgba(0,0,0,0.09)" }}>
                        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }}>
                           <div className="flex gap-0.5 mb-1">{[...Array(5)].map((_, i) => <span key={i} style={{ color: T.gold }} className="text-sm">★</span>)}</div>
                           <div className="text-xs font-black" style={{ color: T.ink }}>5.0 • 980+ Reviews</div>
                        </motion.div>
                     </motion.div>

                     {/* Glow blob */}
                     <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-full -z-10"
                        style={{ background: `radial-gradient(circle, ${T.mint}55, transparent)`, filter: "blur(20px)" }} />
                  </div>
               </div>
            </motion.div>

            {/* Scroll cue */}
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
               className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
               style={{ color: T.muted, zIndex: 10 }}>
               <span className="text-[9px] font-bold uppercase tracking-widest">Scroll</span>
               <div className="w-px h-8" style={{ background: `linear-gradient(to bottom, ${T.azure}, transparent)` }} />
            </motion.div>
         </section>

         {/* ── MARQUEE ──────────────────────────────────────────────────────── */}
         <section className="py-5 overflow-hidden" style={{ background: "white", borderTop: `2px solid ${T.skyMid}`, borderBottom: `2px solid ${T.skyMid}` }}>
            <Marquee items={CLIENTS} speed={32} />
         </section>

         {/* ── ABOUT ────────────────────────────────────────────────────────── */}
         <section id="about" className="py-24 sm:py-36 px-4 sm:px-6 overflow-hidden" style={{ background: T.sky }}>
            <div className="max-w-7xl mx-auto">
               <div className="grid lg:grid-cols-2 gap-14 xl:gap-24 items-center">
                  {/* Image side with floating orbs */}
                  <motion.div {...rv(0)} className="relative">
                     <div className="relative rounded-[3rem] overflow-hidden aspect-[4/5]"
                        style={{ boxShadow: `0 40px 80px ${T.azure}20` }}>
                        <img src={d.aboutImage || "/images/templates/template-img-39.jpg"} alt="About" className="w-full h-full object-cover" />
                        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${T.azure}66, transparent 60%)` }} />
                     </div>
                     {/* CSS Orbs overlay */}
                     <div className="absolute -top-8 -right-6 w-32 h-20 rounded-2xl overflow-hidden flex items-center justify-center"
                        style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)", boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
                        <FloatingOrbs colors={[T.azure, T.rose, T.lime]} />
                     </div>
                     <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity }}
                        className="absolute -left-6 top-1/3 p-5 rounded-2xl text-white font-black"
                        style={{ background: `linear-gradient(135deg, ${T.azure}, ${T.mint})`, boxShadow: `0 16px 40px ${T.azure}45` }}>
                        <div className="text-3xl"><Counter to={11} suffix="+" /></div>
                        <div className="text-xs opacity-70 mt-1">Years Creating</div>
                     </motion.div>
                     <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 0.8 }}
                        className="absolute -right-5 bottom-24 p-4 sm:p-5 rounded-2xl"
                        style={{ background: "white", boxShadow: "0 12px 32px rgba(0,0,0,0.09)" }}>
                        <div className="text-2xl font-black" style={{ color: T.rose }}><Counter to={98} suffix="%" /></div>
                        <div className="text-xs font-semibold mt-1" style={{ color: T.muted }}>Client Happiness</div>
                     </motion.div>
                  </motion.div>

                  {/* Copy */}
                  <div>
                     <Tag color={T.azure}>Our Story 🌟</Tag>
                     <motion.h2 {...rv(1)} className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black leading-tight mb-6" style={{ color: T.ink }}>
                        {d.aboutUsTitle || "Creating Joy,<br/>One Event at a Time."}
                     </motion.h2>
                     <motion.p {...rv(2)} className="text-base sm:text-lg leading-relaxed mb-8" style={{ color: T.slate }}>
                        {d.bio}
                     </motion.p>
                     <motion.div {...rv(3)} className="flex flex-wrap gap-3 mb-10">
                        {["Bespoke Design", "Flawless Execution", "Premium Vendors", "Full Transparency"].map((p, i) => (
                           <span key={i} className="px-4 py-2 rounded-full text-sm font-semibold"
                              style={{ background: `${accentColors[i]}18`, color: accentColors[i], border: `1.5px solid ${accentColors[i]}28` }}>
                              {p}
                           </span>
                        ))}
                     </motion.div>
                     <motion.a {...rv(4)} href="#contact" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm text-white"
                        style={{ background: `linear-gradient(135deg, ${T.azure}, ${T.mint})`, boxShadow: `0 10px 28px ${T.azure}38` }}>
                        Let's Build Together ✨
                     </motion.a>
                  </div>
               </div>
            </div>
         </section>

         {/* ── SERVICES ─────────────────────────────────────────────────────── */}
         <section id="services" className="py-24 sm:py-36 px-4 sm:px-6" style={{ background: "white" }}>
            <div className="max-w-7xl mx-auto">
               <div className="text-center mb-14 sm:mb-20">
                  <Tag color={T.rose}>What We Craft 🎨</Tag>
                  <motion.h2 {...rv(1)} className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black tracking-tight" style={{ color: T.ink }}>
                     Every Event Type,<br />
                     <span style={{ background: `linear-gradient(90deg, ${T.azure}, ${T.mint})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                        Masterfully Executed.
                     </span>
                  </motion.h2>
               </div>
               <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {services.map((svc, i) => (
                     <motion.div key={i} {...rv(i * 0.15)}
                        whileHover={{ y: -10 }}
                        transition={{ type: "spring", stiffness: 280, damping: 22 }}
                        className="group rounded-3xl overflow-hidden cursor-pointer relative"
                        style={{ background: T.pearl, border: `1.5px solid ${svc.color || T.azure}20` }}>
                        <div className="relative h-48 sm:h-56 overflow-hidden">
                           <img src={svc.img || "/images/templates/template-img-40.jpg"} alt={svc.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                           <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${svc.color || T.azure}CC, transparent 50%)` }} />
                           <div className="absolute top-3 left-3 w-11 h-11 rounded-2xl flex items-center justify-center text-2xl bg-white/90">{svc.icon}</div>
                           <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full" style={{ background: svc.color || T.azure }} />
                        </div>
                        <div className="p-5 sm:p-6">
                           <h3 className="text-base font-black mb-2" style={{ color: T.ink }}>{svc.name}</h3>
                           <p className="text-sm leading-relaxed" style={{ color: T.slate }}>{svc.desc}</p>
                           <div className="mt-4 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: svc.color || T.azure }}>
                              Learn More →
                           </div>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── EVENT CATEGORIES ─────────────────────────────────────────────── */}
         <section className="py-24 sm:py-36 px-4 sm:px-6 overflow-hidden" style={{ background: T.sky }}>
            <div className="max-w-7xl mx-auto">
               <div className="text-center mb-12 sm:mb-16">
                  <Tag color={T.mint}>Event Types 🎭</Tag>
                  <motion.h2 {...rv(1)} className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black tracking-tight" style={{ color: T.ink }}>
                     Every Occasion,<br />We're Ready.
                  </motion.h2>
               </div>
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {CATEGORIES.map((cat, i) => (
                     <motion.div key={i} {...rv(i * 0.12)}
                        whileHover={{ y: -8, scale: 1.04 }}
                        className="relative p-5 sm:p-8 rounded-3xl text-white overflow-hidden cursor-pointer group"
                        style={{ background: `linear-gradient(135deg, ${cat.from}, ${cat.to})`, boxShadow: `0 8px 28px ${cat.from}38` }}>
                        <div className="text-4xl mb-3">{cat.emoji}</div>
                        <div className="font-bold text-sm sm:text-base">{cat.label}</div>
                        <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-white/10 group-hover:scale-150 transition-transform duration-500" />
                        <motion.span className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-lg">✨</motion.span>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── PORTFOLIO ────────────────────────────────────────────────────── */}
         <section id="work" className="py-24 sm:py-36 px-4 sm:px-6 overflow-hidden" style={{ background: "white" }}>
            <div className="max-w-7xl mx-auto">
               <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-4">
                  <div>
                     <Tag color={T.gold}>Our Work 🏆</Tag>
                     <motion.h2 {...rv(1)} className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black tracking-tight" style={{ color: T.ink }}>
                        Events That<br />Became Legends
                     </motion.h2>
                  </div>
                  <div className="flex gap-2">
                     {projects.map((_, i) => (
                        <button key={i} onClick={() => setActiveProject(i)}
                           className="h-2 rounded-full transition-all duration-300"
                           style={{ width: i === activeProject ? 28 : 8, background: i === activeProject ? T.azure : `${T.azure}28` }} />
                     ))}
                  </div>
               </div>

               {/* Featured */}
               <AnimatePresence mode="wait">
                  <motion.div key={activeProject}
                     initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }}
                     transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                     className="relative rounded-[2.5rem] overflow-hidden mb-5 cursor-pointer group"
                     style={{ height: "52vh", minHeight: 300 }}
                     onClick={() => setActiveProject((activeProject + 1) % projects.length)}>
                     <img src={projects[activeProject].img || "/images/templates/template-img-44.jpg"} alt={projects[activeProject].name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                     <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,27,42,0.82) 0%, rgba(13,27,42,0.25) 50%, transparent 100%)" }} />

                     <div className="absolute top-6 left-6">
                        <span className="px-4 py-2 rounded-full text-xs font-bold text-white"
                           style={{ background: `${projects[activeProject].color || T.azure}CC` }}>
                           {projects[activeProject].emoji} {projects[activeProject].tag}
                        </span>
                     </div>

                     <motion.div className="absolute top-6 right-6 w-16 sm:w-20 h-16 sm:h-20 rounded-full flex flex-col items-center justify-center text-white font-black"
                        style={{ background: `linear-gradient(135deg, ${projects[activeProject].color || T.azure}, ${T.mint})`, boxShadow: `0 8px 24px ${projects[activeProject].color || T.azure}55` }}
                        animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                        <span className="text-base sm:text-lg leading-none">{projects[activeProject].stat}</span>
                        <span className="text-[8px] opacity-70 leading-tight">guests</span>
                     </motion.div>

                     <div className="absolute bottom-8 left-8 right-10">
                        <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-2">{projects[activeProject].name}</h3>
                        <p className="text-sm sm:text-base text-white/65">{projects[activeProject].desc}</p>
                     </div>
                  </motion.div>
               </AnimatePresence>

               {/* Thumbnails */}
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {projects.map((p, i) => (
                     <motion.div key={i} onClick={() => setActiveProject(i)} whileHover={{ scale: 1.04 }}
                        className="relative rounded-2xl overflow-hidden cursor-pointer"
                        style={{ height: 90, outline: i === activeProject ? `3px solid ${T.azure}` : "none", opacity: i === activeProject ? 1 : 0.5 }}>
                        <img src={p.img || "/images/templates/template-img-44.jpg"} alt={p.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/30" />
                        <div className="absolute bottom-2 left-2 text-white text-[10px] sm:text-xs font-bold truncate">{p.name}</div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── PROCESS ──────────────────────────────────────────────────────── */}
         <section id="process" className="py-24 sm:py-36 px-4 sm:px-6 overflow-hidden relative" style={{ background: T.sky }}>
            <div className="max-w-6xl mx-auto">
               <div className="text-center mb-14 sm:mb-20">
                  <Tag color={T.peach}>How We Work 🗺</Tag>
                  <motion.h2 {...rv(1)} className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black tracking-tight" style={{ color: T.ink }}>
                     The Luminary<br />Process
                  </motion.h2>
               </div>

               {/* 6-step grid */}
               <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {PROCESS.map((step, i) => (
                     <motion.div key={i} {...rv(i * 0.12)}
                        whileHover={{ y: -8, boxShadow: `0 16px 48px ${step.color}22` }}
                        className="relative p-6 sm:p-7 rounded-3xl group cursor-default overflow-hidden"
                        style={{ background: "white", border: `1.5px solid ${step.color}20` }}>
                        <div className="absolute top-4 right-4 text-[10px] font-black px-2.5 py-1 rounded-full"
                           style={{ background: `${step.color}15`, color: step.color }}>
                           {step.step}
                        </div>
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4"
                           style={{ background: `${step.color}18` }}>
                           {step.icon}
                        </div>
                        <h3 className="text-base font-black mb-2" style={{ color: T.ink }}>{step.title}</h3>
                        <p className="text-sm leading-relaxed" style={{ color: T.slate }}>{step.desc}</p>
                        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
                           style={{ background: `linear-gradient(90deg, ${step.color}, transparent)` }} />
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── WHY US ───────────────────────────────────────────────────────── */}
         <section className="py-24 sm:py-36 px-4 sm:px-6 relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${T.azure} 0%, #1557A0 40%, ${T.mint}BB 100%)` }}>
            <div className="absolute inset-0 opacity-[0.07]"
               style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
            {/* CSS Floating orbs accent */}
            <div className="absolute right-10 top-10 w-40 h-28 opacity-40">
               <FloatingOrbs colors={[T.white, T.lime, T.gold]} />
            </div>
            <div className="max-w-7xl mx-auto relative z-10">
               <div className="text-center mb-14 sm:mb-20">
                  <motion.span {...rv(0)} className="inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-white/20 text-white mb-5">
                     Why Luminary 💎
                  </motion.span>
                  <motion.h2 {...rv(1)} className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black text-white tracking-tight">
                     The Numbers<br />Behind the Magic
                  </motion.h2>
               </div>

               <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-14">
                  {[
                     { v: 600, s: "+", l: "Events Crafted", icon: "🎪" },
                     { v: 98, s: "%", l: "Client Delight", icon: "💎" },
                     { v: 980, s: "+", l: "5-Star Reviews", icon: "⭐" },
                     { v: 40, s: "+", l: "Cities Reached", icon: "🌏" },
                  ].map((st, i) => (
                     <motion.div key={i} {...rv(i * 0.15)} whileHover={{ y: -6, scale: 1.04 }}
                        className="p-6 sm:p-8 rounded-3xl text-center"
                        style={{ background: "rgba(255,255,255,0.13)", backdropFilter: "blur(14px)", border: "1.5px solid rgba(255,255,255,0.22)" }}>
                        <div className="text-3xl sm:text-4xl mb-3">{st.icon}</div>
                        <div className="text-3xl sm:text-5xl font-black text-white mb-2"><Counter to={st.v} suffix={st.s} /></div>
                        <div className="text-xs sm:text-sm font-medium text-white/60">{st.l}</div>
                     </motion.div>
                  ))}
               </div>

               <div className="grid sm:grid-cols-3 gap-5">
                  {[
                     { title: "Experience-First", desc: "We design for emotion first. Every decision optimizes for the feeling your guests will carry home.", icon: "🎯" },
                     { title: "Zero Stress", desc: "From first call to last spotlight—we own every detail so you can be fully present.", icon: "🕊" },
                     { title: "On-Demand Excellence", desc: "Same-week microcelebrations or year-planned grand productions—we deliver both with precision.", icon: "⚡" },
                  ].map((item, i) => (
                     <motion.div key={i} {...rv(i * 0.2)}
                        className="flex gap-4 p-6 sm:p-7 rounded-2xl"
                        style={{ background: "rgba(255,255,255,0.13)", backdropFilter: "blur(14px)", border: "1.5px solid rgba(255,255,255,0.18)" }}>
                        <div className="text-3xl flex-shrink-0">{item.icon}</div>
                        <div>
                           <h4 className="text-white font-black mb-2">{item.title}</h4>
                           <p className="text-xs sm:text-sm text-white/65 leading-relaxed">{item.desc}</p>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── PRICING ──────────────────────────────────────────────────────── */}
         <section id="pricing" className="py-24 sm:py-36 px-4 sm:px-6" style={{ background: "white" }}>
            <div className="max-w-6xl mx-auto">
               <div className="text-center mb-14 sm:mb-20">
                  <Tag color={T.mint}>Packages 🎁</Tag>
                  <motion.h2 {...rv(1)} className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black tracking-tight" style={{ color: T.ink }}>
                     Choose Your<br />Perfect Plan
                  </motion.h2>
               </div>

               <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
                  {PRICING.map((pkg, i) => (
                     <motion.div key={i} {...rv(i * 0.2)}
                        whileHover={{ y: -10, scale: 1.02 }}
                        className={`relative rounded-3xl overflow-hidden ${pkg.popular ? "sm:col-span-2 lg:col-span-1" : ""}`}
                        style={{
                           background: pkg.popular ? `linear-gradient(145deg, ${T.azure}, #1557A0)` : "white",
                           border: pkg.popular ? "none" : `1.5px solid ${pkg.color}25`,
                           boxShadow: pkg.popular ? `0 28px 64px ${T.azure}38` : "0 4px 20px rgba(0,0,0,0.06)",
                           transform: pkg.popular ? "scale(1.02)" : "scale(1)",
                        }}>
                        {pkg.popular && (
                           <div className="absolute top-0 left-0 right-0 h-1"
                              style={{ background: `linear-gradient(90deg, ${T.lime}, ${T.mint}, ${T.azure})` }} />
                        )}
                        <div className="p-7 sm:p-8">
                           {pkg.popular && (
                              <div className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 bg-white/20 text-white">
                                 ⭐ Most Popular
                              </div>
                           )}
                           <div className="text-3xl mb-3">{["🌟", "✨", "🪄"][i]}</div>
                           <h3 className="text-2xl font-black mb-2" style={{ color: pkg.popular ? "white" : T.ink }}>{pkg.name}</h3>
                           <p className="text-sm mb-5" style={{ color: pkg.popular ? "rgba(255,255,255,0.65)" : T.muted }}>{pkg.desc}</p>
                           <div className="text-4xl sm:text-5xl font-black mb-7" style={{ color: pkg.popular ? "white" : T.ink }}>
                              {pkg.price}
                              {pkg.price !== "Custom" && <span className="text-sm font-medium opacity-40 ml-1">onwards</span>}
                           </div>
                           <ul className="space-y-3 mb-8">
                              {pkg.features.map((f, j) => (
                                 <li key={j} className="flex items-center gap-3 text-sm">
                                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px]"
                                       style={{ background: pkg.popular ? "rgba(255,255,255,0.22)" : `${pkg.color}18`, color: pkg.popular ? "white" : pkg.color }}>✓</div>
                                    <span style={{ color: pkg.popular ? "rgba(255,255,255,0.82)" : T.slate }}>{f}</span>
                                 </li>
                              ))}
                           </ul>
                           <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                              className="w-full py-3.5 rounded-2xl font-bold text-sm"
                              style={pkg.popular
                                 ? { background: "rgba(255,255,255,0.18)", color: "white", border: "1.5px solid rgba(255,255,255,0.28)" }
                                 : { background: `linear-gradient(135deg, ${pkg.color}, ${T.mint})`, color: "white" }}>
                              Get Started →
                           </motion.button>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
         <section className="py-24 sm:py-36 px-4 sm:px-6 overflow-hidden relative" style={{ background: T.sky }}>
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-40"
               style={{ background: T.gold }} />
            <div className="max-w-4xl mx-auto relative z-10">
               <div className="text-center mb-14 sm:mb-20">
                  <Tag color={T.rose}>Client Love 💌</Tag>
                  <motion.h2 {...rv(1)} className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black tracking-tight" style={{ color: T.ink }}>
                     Voices That<br />Inspire Us Daily
                  </motion.h2>
               </div>

               <AnimatePresence mode="wait">
                  <motion.div key={activeTestimonial}
                     initial={{ opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                     exit={{ opacity: 0, y: -30, scale: 0.96 }} transition={{ duration: 0.45 }}
                     className="relative p-7 sm:p-12 rounded-3xl text-center overflow-hidden"
                     style={{
                        background: "white",
                        boxShadow: `0 20px 56px ${TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.color || T.azure}20`,
                        border: `1.5px solid ${TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.color || T.azure}18`
                     }}>
                     <div className="text-7xl sm:text-8xl font-black absolute top-4 left-6 leading-none opacity-[0.06]"
                        style={{ color: TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.color || T.azure }}>"</div>
                     <div className="text-4xl mb-5">💬</div>
                     <p className="text-lg sm:text-2xl font-medium leading-relaxed mb-8 relative z-10 italic" style={{ color: T.slate }}>
                        "{TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.text}"
                     </p>
                     <div className="flex items-center justify-center gap-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black"
                           style={{ background: `linear-gradient(135deg, ${TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.color || T.azure}, ${T.mint})` }}>
                           {TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.avatar}
                        </div>
                        <div className="text-left">
                           <div className="font-black text-base" style={{ color: T.ink }}>{TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.name}</div>
                           <div className="text-xs" style={{ color: T.muted }}>{TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.role}</div>
                        </div>
                     </div>
                  </motion.div>
               </AnimatePresence>

               <div className="flex justify-center gap-3 mt-8">
                  {TESTIMONIALS.map((_, i) => (
                     <button key={i} onClick={() => setActiveTestimonial(i)}
                        className="h-2.5 rounded-full transition-all duration-300"
                        style={{ width: i === activeTestimonial % TESTIMONIALS.length ? 26 : 10, background: i === activeTestimonial % TESTIMONIALS.length ? T.azure : `${T.azure}28` }} />
                  ))}
               </div>
            </div>
         </section>

         {/* ── TEAM ─────────────────────────────────────────────────────────── */}
         <section className="py-24 sm:py-36 px-4 sm:px-6" style={{ background: "white" }}>
            <div className="max-w-7xl mx-auto">
               <div className="text-center mb-14 sm:mb-20">
                  <Tag color={T.azure}>The Team 🤝</Tag>
                  <motion.h2 {...rv(1)} className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black tracking-tight" style={{ color: T.ink }}>
                     The Visionaries<br />Behind the Magic
                  </motion.h2>
               </div>
               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
                  {TEAM.map((member, i) => (
                     <motion.div key={i} {...rv(i * 0.12)} whileHover={{ y: -10 }}
                        className="group rounded-3xl overflow-hidden cursor-pointer"
                        style={{ background: `${member.color}0E`, border: `1.5px solid ${member.color}20` }}>
                        <div className="relative h-36 sm:h-44 flex items-center justify-center overflow-hidden"
                           style={{ background: `linear-gradient(145deg, ${member.color}20, ${member.color}48)` }}>
                           <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-white font-black text-2xl sm:text-3xl"
                              style={{ background: `linear-gradient(135deg, ${member.color}, ${T.azure})`, boxShadow: `0 10px 28px ${member.color}55` }}>
                              {member.name[0]}
                           </div>
                           <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3"
                              style={{ background: `linear-gradient(to top, ${member.color}CC, transparent)` }}>
                              <div className="flex gap-1.5">
                                 {["in", "tw"].map(s => (
                                    <div key={s} className="w-6 h-6 rounded-full bg-white/25 flex items-center justify-center text-white text-[8px] font-bold uppercase">{s}</div>
                                 ))}
                              </div>
                           </div>
                        </div>
                        <div className="p-3 sm:p-4">
                           <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide mb-1.5"
                              style={{ background: `${member.color}18`, color: member.color }}>
                              {member.badge}
                           </span>
                           <h4 className="font-black text-sm" style={{ color: T.ink }}>{member.name}</h4>
                           <p className="text-[11px] mt-0.5" style={{ color: T.muted }}>{member.role}</p>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── GALLERY ──────────────────────────────────────────────────────── */}
         <section className="py-24 sm:py-36 px-4 sm:px-6" style={{ background: T.sky }}>
            <div className="max-w-7xl mx-auto">
               <div className="text-center mb-14 sm:mb-20">
                  <Tag color={T.peach}>Gallery 📸</Tag>
                  <motion.h2 {...rv(1)} className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black tracking-tight" style={{ color: T.ink }}>
                     Glimpses of<br />Pure Magic
                  </motion.h2>
               </div>
               <div className="columns-2 md:columns-3 gap-3 sm:gap-4">
                  {GALLERY.map((img, i) => (
                     <motion.div key={i} {...rv(i * 0.12)} whileHover={{ scale: 1.03 }}
                        onClick={() => setLightbox(img)}
                        className="break-inside-avoid relative rounded-2xl overflow-hidden cursor-pointer group mb-3 sm:mb-4"
                        style={{ height: i % 3 === 0 ? 220 : i % 3 === 1 ? 155 : 190 }}>
                        <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/22 transition-colors flex items-center justify-center">
                           <div className="opacity-0 group-hover:opacity-100 text-white text-2xl transition-opacity">🔍</div>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
               {lightbox && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                     className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/88 backdrop-blur-md p-4 sm:p-10"
                     onClick={() => setLightbox(null)}>
                     <motion.img initial={{ scale: 0.82 }} animate={{ scale: 1 }} exit={{ scale: 0.82 }}
                        src={lightbox} alt="Gallery" className="max-w-4xl w-full max-h-[85vh] object-contain rounded-3xl" />
                     <button className="absolute top-6 right-6 text-white/60 hover:text-white text-2xl font-black">✕</button>
                  </motion.div>
               )}
            </AnimatePresence>
         </section>

         {/* ── FAQ ──────────────────────────────────────────────────────────── */}
         <section className="py-24 sm:py-36 px-4 sm:px-6" style={{ background: "white" }}>
            <div className="max-w-3xl mx-auto">
               <div className="text-center mb-14 sm:mb-20">
                  <Tag color={T.azure}>FAQ 💬</Tag>
                  <motion.h2 {...rv(1)} className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black tracking-tight" style={{ color: T.ink }}>
                     Everything<br />You Want to Know
                  </motion.h2>
               </div>
               <div className="space-y-3">
                  {FAQS.map((faq, i) => (
                     <motion.div key={i} {...rv(i * 0.1)}
                        className="rounded-2xl overflow-hidden cursor-pointer"
                        style={{
                           background: T.sky, border: `1.5px solid ${activeFaq === i ? T.azure : "transparent"}`,
                           boxShadow: activeFaq === i ? `0 6px 28px ${T.azure}18` : "0 2px 12px rgba(0,0,0,0.04)"
                        }}
                        onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                        <div className="flex items-center justify-between p-5 sm:p-6 gap-4">
                           <h4 className="font-bold text-sm sm:text-base" style={{ color: T.ink }}>{faq.q}</h4>
                           <motion.div animate={{ rotate: activeFaq === i ? 45 : 0 }}
                              className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white font-black"
                              style={{ background: activeFaq === i ? T.azure : T.muted }}>+</motion.div>
                        </div>
                        <AnimatePresence>
                           {activeFaq === i && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                                 <div className="px-5 sm:px-6 pb-5 text-sm leading-relaxed" style={{ color: T.slate }}>{faq.a}</div>
                              </motion.div>
                           )}
                        </AnimatePresence>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── CONTACT ──────────────────────────────────────────────────────── */}
         <section id="contact" className="py-24 sm:py-36 px-4 sm:px-6 relative overflow-hidden" style={{ background: T.sky }}>
            <div className="absolute top-0 left-0 w-80 h-80 rounded-full blur-[120px] pointer-events-none opacity-40"
               style={{ background: T.azure }} />
            <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-[120px] pointer-events-none opacity-30"
               style={{ background: T.rose }} />
            <div className="max-w-6xl mx-auto relative z-10">
               <div className="text-center mb-14 sm:mb-20">
                  <Tag color={T.azure}>Let's Create 🎊</Tag>
                  <motion.h2 {...rv(1)} className="text-3xl sm:text-4xl md:text-5xl xl:text-7xl font-black tracking-tight leading-tight" style={{ color: T.ink }}>
                     Ready to Create<br />
                     <span style={{ background: `linear-gradient(135deg, ${T.azure}, ${T.mint})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                        Something Extraordinary?
                     </span>
                  </motion.h2>
               </div>

               <div className="grid lg:grid-cols-2 gap-10 sm:gap-14 items-start">
                  {/* Info cards */}
                  <div className="space-y-4">
                     {[
                        { icon: "✉️", label: "Email", val: d.contactEmail, color: T.azure },
                        { icon: "📞", label: "Phone", val: d.phone || "+91 98765 43210", color: T.rose },
                        { icon: "📍", label: "Studio", val: d.address, color: T.mint },
                     ].map((item, i) => (
                        <motion.div key={i} {...rv(i * 0.15)} whileHover={{ x: 5 }}
                           className="flex gap-4 p-5 sm:p-6 rounded-2xl"
                           style={{ background: "white", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: `1.5px solid ${item.color}18` }}>
                           <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
                              style={{ background: `${item.color}15` }}>{item.icon}</div>
                           <div>
                              <div className="text-[10px] font-black uppercase tracking-widest mb-0.5" style={{ color: item.color }}>{item.label}</div>
                              <div className="font-semibold text-sm sm:text-base break-all" style={{ color: T.ink }}>{item.val}</div>
                           </div>
                        </motion.div>
                     ))}

                     <motion.div {...rv(3)} className="p-6 rounded-2xl text-center"
                        style={{ background: `linear-gradient(135deg, ${T.azure}, ${T.mint})`, boxShadow: `0 10px 28px ${T.azure}38` }}>
                        <div className="text-white font-black text-lg mb-1">✨ 600+ Extraordinary Events</div>
                        <div className="text-white/70 text-sm">Be part of our growing story</div>
                     </motion.div>
                  </div>

                  {/* Form */}
                  <motion.div {...rv(2)} className="p-6 sm:p-9 rounded-3xl"
                     style={{ background: "white", boxShadow: "0 10px 48px rgba(0,0,0,0.08)", border: `1.5px solid ${T.azure}18` }}>
                     <h3 className="text-xl font-black mb-6" style={{ color: T.ink }}>Tell us about your event 🌟</h3>
                     <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                           {["Your Name 👋", "Brand / Company"].map(ph => (
                              <input key={ph} placeholder={ph}
                                 className="w-full px-4 py-3 rounded-xl text-sm font-medium border-2 outline-none transition-colors"
                                 style={{ background: T.sky, borderColor: `${T.azure}20`, color: T.ink }}
                                 onFocus={e => e.target.style.borderColor = T.azure}
                                 onBlur={e => e.target.style.borderColor = `${T.azure}20`} />
                           ))}
                        </div>
                        <input placeholder="Email Address 📧"
                           className="w-full px-4 py-3 rounded-xl text-sm font-medium border-2 outline-none transition-colors"
                           style={{ background: T.sky, borderColor: `${T.azure}20`, color: T.ink }}
                           onFocus={e => e.target.style.borderColor = T.azure}
                           onBlur={e => e.target.style.borderColor = `${T.azure}20`} />
                        <select className="w-full px-4 py-3 rounded-xl text-sm font-medium border-2 outline-none cursor-pointer"
                           style={{ background: T.sky, borderColor: `${T.azure}20`, color: T.muted }}>
                           <option value="">Event Type 🎭</option>
                           {CATEGORIES.map(c => <option key={c.label}>{c.emoji} {c.label}</option>)}
                        </select>
                        <textarea rows={4} placeholder="Describe your dream event ✨"
                           className="w-full px-4 py-3 rounded-xl text-sm font-medium border-2 outline-none resize-none transition-colors"
                           style={{ background: T.sky, borderColor: `${T.azure}20`, color: T.ink }}
                           onFocus={e => e.target.style.borderColor = T.azure}
                           onBlur={e => e.target.style.borderColor = `${T.azure}20`} />
                        <motion.button whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.97 }}
                           className="w-full py-4 rounded-2xl font-bold text-white text-sm"
                           style={{ background: `linear-gradient(135deg, ${T.azure}, ${T.mint})`, boxShadow: `0 10px 28px ${T.azure}38` }}>
                           Let's Make It Happen ✨ →
                        </motion.button>
                     </div>
                  </motion.div>
               </div>
            </div>
         </section>

         {/* ── FOOTER ───────────────────────────────────────────────────────── */}
         <footer className="px-4 sm:px-6 pt-16 sm:pt-20 pb-8" style={{ background: T.ink }}>
            <div className="max-w-7xl mx-auto">
               <div className="flex flex-col md:flex-row justify-between items-start gap-10 pb-12 border-b border-white/10">
                  <div className="max-w-xs">
                     <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black"
                           style={{ background: `linear-gradient(135deg, ${T.azure}, ${T.mint})` }}>L</div>
                        <span className="font-black text-lg text-white">{d.agencyName}</span>
                     </div>
                     <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>{d.tagline}</p>
                     <div className="flex gap-3 mt-5">
                        {["in", "tw", "ig", "yt"].map(s => (
                           <a key={s} href="#"
                              className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black uppercase transition-all hover:scale-110"
                              style={{ background: `${T.azure}28`, color: T.azure }}>
                              {s}
                           </a>
                        ))}
                     </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-14">
                     {[
                        { title: "Services", links: ["Weddings", "Festivals", "Corporate", "Birthdays"] },
                        { title: "Company", links: ["About Us", "Portfolio", "Our Team", "Blog"] },
                        { title: "Legal", links: ["Privacy", "Terms", "Cookies"] },
                     ].map(col => (
                        <div key={col.title}>
                           <h5 className="text-[10px] font-black uppercase tracking-widest mb-4" style={{ color: T.azure }}>{col.title}</h5>
                           <ul className="space-y-2.5">
                              {col.links.map(link => (
                                 <li key={link}>
                                    <a href="#" className="text-xs font-medium hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.32)" }}>{link}</a>
                                 </li>
                              ))}
                           </ul>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
                  <p className="text-[10px] font-medium" style={{ color: "rgba(255,255,255,0.22)" }}>{d.footerCopyright}</p>
                  <div className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.22)" }}>
                     <span>Crafted with</span>
                     <span style={{ color: T.azure }}>♥</span>
                     <span>for every celebration</span>
                  </div>
               </div>
            </div>
         </footer>
      </div>
   );
}