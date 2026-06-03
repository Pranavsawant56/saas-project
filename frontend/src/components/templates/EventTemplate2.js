import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence, useInView } from "framer-motion";

// ─── DATA DEFAULTS ────────────────────────────────────────────────────────────
const DEFAULT_DATA = {
   agencyName: "Pulse Events",
   tagline: "Where Every Moment Hits Different",
   heroTitle: "We Craft Events That Move People.",
   bio: "Pulse is a next-generation event production studio that lives at the intersection of technology, design, and human connection. From intimate brand activations to 50,000-person festivals—we build moments that people carry with them forever.",
   aboutUsTitle: "About Pulse",
   contactEmail: "hello@pulseevents.io",
   phone: "+91 98765 43210",
   address: "Studio 404, Bandra West, Mumbai — 400050",
   footerCopyright: `© ${new Date().getFullYear()} Pulse Events. All rights reserved.`,
   logoUrl: null,
   headerType: "Text",
   heroImage: "/images/templates/template-img-38.jpg",
   aboutImage: "/images/templates/template-img-39.jpg",
   services: [],
   projects: [],
};

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const COLORS = {
   electric: "#4F6EF7",
   violet: "#8B5CF6",
   coral: "#FF6B6B",
   cyan: "#22D3EE",
   mint: "#34D399",
   bg: "#F8F7FF",
   surface: "#FFFFFF",
   dark: "#0F0E17",
   mid: "#2D2B55",
   muted: "#6B7280",
};

// ─── UTILITY: ANIMATED COUNTER ────────────────────────────────────────────────
function AnimatedCounter({ from = 0, to, suffix = "", duration = 2 }) {
   const ref = useRef(null);
   const inView = useInView(ref, { once: true });
   const [count, setCount] = useState(from);
   useEffect(() => {
      if (!inView) return;
      let start = null;
      const step = (ts) => {
         if (!start) start = ts;
         const progress = Math.min((ts - start) / (duration * 1000), 1);
         setCount(Math.floor(progress * (to - from) + from));
         if (progress < 1) requestAnimationFrame(step);
         else setCount(to);
      };
      requestAnimationFrame(step);
   }, [inView, to, from, duration]);
   return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ─── INFINITE MARQUEE ─────────────────────────────────────────────────────────
function Marquee({ items, speed = 40, reverse = false }) {
   return (
      <div className="overflow-hidden whitespace-nowrap">
         <motion.div
            className="inline-flex gap-16 items-center"
            animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
            transition={{ duration: speed, ease: "linear", repeat: Infinity }}
         >
            {[...items, ...items, ...items, ...items].map((item, i) => (
               <span key={i} className="flex items-center gap-4 text-sm font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors cursor-default shrink-0">
                  <span className="w-2 h-2 rounded-full bg-violet-400 shrink-0"></span>
                  {item}
               </span>
            ))}
         </motion.div>
      </div>
   );
}

// ─── FLOATING BLOB ────────────────────────────────────────────────────────────
function FloatingBlob({ color, size, x, y, delay = 0 }) {
   return (
      <motion.div
         className="absolute rounded-full blur-[80px] pointer-events-none"
         style={{ width: size, height: size, left: x, top: y, background: color, opacity: 0.18 }}
         animate={{ y: [0, -30, 0], x: [0, 15, 0], scale: [1, 1.1, 1] }}
         transition={{ duration: 8 + delay, repeat: Infinity, ease: "easeInOut", delay }}
      />
   );
}

// ─── GLASSMORPHISM CARD ───────────────────────────────────────────────────────
function GlassCard({ children, className = "", ...props }) {
   return (
      <motion.div
         className={`relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl ${className}`}
         whileHover={{ y: -6, scale: 1.02 }}
         transition={{ type: "spring", stiffness: 300, damping: 20 }}
         {...props}
      >
         {children}
      </motion.div>
   );
}

// ─── SECTION REVEAL ───────────────────────────────────────────────────────────
const revealUp = {
   initial: { opacity: 0, y: 50 },
   whileInView: { opacity: 1, y: 0 },
   viewport: { once: true, margin: "-80px" },
   transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
};
const stagger = (i) => ({ ...revealUp, transition: { ...revealUp.transition, delay: i * 0.12 } });

// ─── SERVICES DATA ────────────────────────────────────────────────────────────
const DEFAULT_SERVICES = [
   { name: "Festival Production", desc: "End-to-end creative direction and logistics for large-scale music and cultural festivals.", icon: "🎪", color: COLORS.coral, img: "/images/templates/template-img-36.jpg" },
   { name: "Brand Activations", desc: "Immersive experiences that make your brand unforgettable to every attendee.", icon: "⚡", color: COLORS.electric, img: "/images/templates/template-img-37.jpg" },
   { name: "Tech Conferences", desc: "Premium summit experiences for the world's most ambitious technology communities.", icon: "🚀", color: COLORS.violet, img: "/images/templates/template-img-41.jpg" },
   { name: "Virtual & Hybrid", desc: "Hybrid-first productions that break the barrier between physical and digital attendance.", icon: "🌐", color: COLORS.cyan, img: "/images/templates/template-img-39.jpg" },
   { name: "Product Launches", desc: "Cinematic reveal events that create cultural moments around your new products.", icon: "✨", color: COLORS.mint, img: "/images/templates/template-img-44.jpg" },
   { name: "Corporate Retreats", desc: "Strategic offsites designed to align, energize and inspire executive teams.", icon: "🏔", color: "#F59E0B", img: "/images/templates/template-img-45.jpg" },
];

const DEFAULT_PROJECTS = [
   { name: "Solstice Festival 2024", desc: "60,000 attendees across 5 stages. Zero compromises.", tag: "Music Festival", color: COLORS.coral, img: "/images/templates/template-img-44.jpg", stat: "60K+" },
   { name: "Nova Summit Tokyo", desc: "A 3-day deep-tech conference redefined for a new generation.", tag: "Tech Conference", color: COLORS.electric, img: "/images/templates/template-img-45.jpg", stat: "120+" },
   { name: "Prism Launch NYC", desc: "A multi-sensory product debut that went globally viral.", tag: "Product Launch", color: COLORS.violet, img: "/images/templates/template-img-46.jpg", stat: "8M+" },
   { name: "Apex Corporate Retreat", desc: "Transformative 5-day summit for Fortune 500 leadership.", tag: "Corporate", color: COLORS.cyan, img: "/images/templates/template-img-47.jpg", stat: "500" },
];

const DEFAULT_CATEGORIES = [
   { label: "Weddings", emoji: "💍", color: "#FF6B6B", bg: "from-rose-500 to-pink-600" },
   { label: "Conferences", emoji: "🎙", color: "#4F6EF7", bg: "from-blue-500 to-indigo-600" },
   { label: "Concerts", emoji: "🎵", color: "#8B5CF6", bg: "from-violet-500 to-purple-600" },
   { label: "Exhibitions", emoji: "🖼", color: "#22D3EE", bg: "from-cyan-500 to-sky-600" },
   { label: "Product Launches", emoji: "🚀", color: "#34D399", bg: "from-emerald-400 to-teal-500" },
   { label: "Corporate Events", emoji: "💼", color: "#F59E0B", bg: "from-amber-400 to-orange-500" },
   { label: "Birthdays", emoji: "🎂", color: "#EC4899", bg: "from-pink-500 to-fuchsia-600" },
];

const DEFAULT_PROCESS = [
   { step: "01", title: "Discovery Call", desc: "We listen deeply. Understand your vision, audience, and impact goals.", icon: "🔍" },
   { step: "02", title: "Creative Blueprint", desc: "A full creative & logistical strategy tailored to your event DNA.", icon: "🗺" },
   { step: "03", title: "Design & Build", desc: "Our team designs every touchpoint—visual, spatial, and experiential.", icon: "🎨" },
   { step: "04", title: "Live Production", desc: "Flawless on-ground execution with real-time coordination.", icon: "⚡" },
   { step: "05", title: "Post-Event Impact", desc: "Analytics, content harvesting, and lasting brand echoes.", icon: "📈" },
];

const DEFAULT_TESTIMONIALS = [
   { name: "Aanya Mehta", role: "CMO, Horizon Tech", text: "Pulse transformed our annual summit into a cultural phenomenon. Attendance doubled. Energy was electric.", avatar: "AM", color: COLORS.electric },
   { name: "James Okafor", role: "Founder, Neon Records", text: "The festival they delivered was beyond anything we imagined. Every detail was intentional and brilliant.", avatar: "JO", color: COLORS.coral },
   { name: "Sofia Reyes", role: "VP Events, Luminary Corp", text: "Working with Pulse felt like having a world-class creative partner who happened to also be flawless executors.", avatar: "SR", color: COLORS.violet },
];

const DEFAULT_TEAM = [
   { name: "Riya Desai", role: "Creative Director", badge: "Strategy", color: COLORS.electric },
   { name: "Marcus Webb", role: "Production Head", badge: "Logistics", color: COLORS.coral },
   { name: "Priya Nair", role: "Tech Experience Lead", badge: "Innovation", color: COLORS.violet },
   { name: "Liam Chen", role: "Brand Partnerships", badge: "Growth", color: COLORS.cyan },
];

const DEFAULT_PRICING = [
   {
      name: "Ignite", price: "₹1.2L", desc: "Perfect for intimate gatherings and brand micro-events.", color: COLORS.electric,
      features: ["Up to 200 guests", "Creative direction", "Day-of coordination", "Basic A/V setup", "Post-event report"],
   },
   {
      name: "Surge", price: "₹3.5L", desc: "Our most popular package for mid-scale events.", color: COLORS.violet, popular: true,
      features: ["Up to 1,000 guests", "Full creative & production", "Dedicated team of 8", "Premium A/V + lighting", "Live content capture", "30-day post analytics"],
   },
   {
      name: "Apex", price: "Custom", desc: "For landmark events that demand the absolute best.", color: COLORS.coral,
      features: ["Unlimited scale", "Full-stack production", "Bespoke creative universe", "Global logistics", "Media & PR support", "12-month partnership"],
   },
];

const DEFAULT_FAQS = [
   { q: "How far in advance should we book?", a: "For large-scale events we recommend 6–12 months. For intimate events, 6–8 weeks minimum gives us enough runway to deliver excellence." },
   { q: "Do you handle virtual or hybrid events?", a: "Absolutely. We have a dedicated Hybrid Experience team with proprietary streaming infrastructure and digital audience engagement tools." },
   { q: "What's your pricing model?", a: "Packages are a starting point. Most of our work is custom-quoted based on creative scope, guest count, and production requirements." },
   { q: "Can you handle international events?", a: "Yes. We have produced events across 18 countries and have trusted logistics partners globally." },
   { q: "How is post-event content delivered?", a: "Within 72 hours of the event, you receive a full digital content package: photos, video highlights, and engagement analytics." },
];

const DEFAULT_GALLERY_IMGS = [
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

const DEFAULT_CLIENTS = ["TechCorp", "Luminary", "NovaBrand", "Horizon", "Apex Studios", "FutureCo", "Neon Records", "Prism Labs", "Solstice Group", "Orbital Media"];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function EventTemplate2({ data }) {
   const d = { ...DEFAULT_DATA, ...data };
   const services = (d.services?.length && d.services.some(s => s.name)) ? d.services : DEFAULT_SERVICES;
   const projects = (d.projects?.length && d.projects.some(p => p.name)) ? d.projects : DEFAULT_PROJECTS;

   const CLIENTS = (d.trustedClients?.length > 0 && d.trustedClients.some(c => c.name)) ? d.trustedClients.map(c => c.name) : DEFAULT_CLIENTS;

   const CATEGORIES = (d.eventCategories?.length > 0 && d.eventCategories.some(c => c.name)) ? d.eventCategories.map((c, i) => ({
      label: c.name, emoji: "✨", color: DEFAULT_CATEGORIES[i % DEFAULT_CATEGORIES.length].color, bg: DEFAULT_CATEGORIES[i % DEFAULT_CATEGORIES.length].bg
   })) : DEFAULT_CATEGORIES;

   const PROCESS = (d.eventPlanningProcess?.length > 0 && d.eventPlanningProcess.some(p => p.step || p.desc)) ? d.eventPlanningProcess.map((p, i) => ({
      step: p.step || `0${i + 1}`, title: p.step, desc: p.desc, icon: "✨"
   })) : DEFAULT_PROCESS;

   const TESTIMONIALS = (d.testimonials?.length > 0 && d.testimonials.some(t => t.clientName || t.review)) ? d.testimonials.map((t, i) => ({
      name: t.clientName, role: t.event, text: t.review, avatar: "T", color: DEFAULT_TESTIMONIALS[i % DEFAULT_TESTIMONIALS.length].color
   })) : DEFAULT_TESTIMONIALS;

   const TEAM = (d.team?.length > 0 && d.team.some(t => t.name || t.role)) ? d.team.map((t, i) => ({
      name: t.name, role: t.role, badge: t.bio, color: DEFAULT_TEAM[i % DEFAULT_TEAM.length].color
   })) : DEFAULT_TEAM;

   const PRICING = (d.pricing?.length > 0 && d.pricing.some(p => p.planName || p.price)) ? d.pricing.map((p, i) => ({
      name: p.planName, price: p.price, desc: p.buttonText || '', color: DEFAULT_PRICING[i % DEFAULT_PRICING.length].color,
      features: p.features ? p.features.split(',').map(f => f.trim()) : [], popular: i === 1
   })) : DEFAULT_PRICING;

   const FAQS = (d.faqs?.length > 0 && d.faqs.some(f => f.question || f.answer)) ? d.faqs.map((f) => ({
      q: f.question, a: f.answer
   })) : DEFAULT_FAQS;

   const GALLERY_IMGS = (d.gallery?.length > 0 && d.gallery.some(g => g.image)) ? d.gallery.map(g => g.image) : DEFAULT_GALLERY_IMGS;

   const [activeProject, setActiveProject] = useState(0);
   const [activeTestimonial, setActiveTestimonial] = useState(0);
   const [activeFaq, setActiveFaq] = useState(null);
   const [lightbox, setLightbox] = useState(null);
   const heroRef = useRef(null);
   const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
   const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
   const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

   const mx = useMotionValue(0);
   const my = useMotionValue(0);
   const springX = useSpring(mx, { stiffness: 80, damping: 20 });
   const springY = useSpring(my, { stiffness: 80, damping: 20 });

   useEffect(() => {
      const move = (e) => { mx.set(e.clientX); my.set(e.clientY); };
      window.addEventListener("mousemove", move);
      return () => window.removeEventListener("mousemove", move);
   }, []);

   useEffect(() => {
      if (!TESTIMONIALS || TESTIMONIALS.length === 0) return;
      const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 4000);
      return () => clearInterval(t);
   }, [TESTIMONIALS.length]);

   return (
      <div className="relative overflow-x-hidden" style={{ fontFamily: "'DM Sans', 'Plus Jakarta Sans', system-ui, sans-serif", background: COLORS.bg, color: COLORS.dark }}>

         {/* ── Custom cursor dot (desktop only) ── */}
         <motion.div
            className="fixed w-5 h-5 rounded-full pointer-events-none z-[9999] mix-blend-difference bg-white hidden md:block"
            style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
         />

         {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
         <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-3 sm:py-4"
         >
            <div className="max-w-7xl mx-auto">
               <div className="backdrop-blur-2xl bg-white/70 border border-white/60 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between shadow-lg shadow-black/5">
                  <div className="flex items-center gap-2 sm:gap-3">
                     <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center text-white text-xs sm:text-sm font-black flex-shrink-0" style={{ background: `linear-gradient(135deg, ${COLORS.electric}, ${COLORS.violet})` }}>P</div>
                     <span className="font-black text-base sm:text-lg tracking-tight truncate" style={{ color: COLORS.dark }}>{d.agencyName}</span>
                  </div>
                  <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold" style={{ color: COLORS.muted }}>
                     {["Services", "Work", "Process", "Pricing", "Contact"].map(item => (
                        <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-indigo-600 transition-colors whitespace-nowrap">{item}</a>
                     ))}
                  </nav>
                  <motion.a
                     href="#contact"
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.97 }}
                     className="px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-black text-white shadow-lg whitespace-nowrap"
                     style={{ background: `linear-gradient(135deg, ${COLORS.electric}, ${COLORS.violet})`, boxShadow: `0 8px 24px ${COLORS.electric}40` }}
                  >
                     Get a Quote
                  </motion.a>
               </div>
            </div>
         </motion.header>

         {/* ── HERO ───────────────────────────────────────────────────────────── */}
         <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden" style={{ background: COLORS.dark }}>
            {/* Gradient mesh background */}
            <div className="absolute inset-0">
               <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 50%, #4F6EF730 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #8B5CF640 0%, transparent 60%), radial-gradient(ellipse at 50% 90%, #FF6B6B30 0%, transparent 60%)" }} />
               <FloatingBlob color={COLORS.electric} size={400} x="10%" y="20%" delay={0} />
               <FloatingBlob color={COLORS.violet} size={300} x="70%" y="10%" delay={2} />
               <FloatingBlob color={COLORS.coral} size={250} x="60%" y="60%" delay={4} />
               <FloatingBlob color={COLORS.cyan} size={200} x="20%" y="70%" delay={1} />
            </div>

            {/* Grid lines */}
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

            <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16 sm:pb-20">
               <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center">
                  {/* Left: Copy */}
                  <div>
                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest mb-6 sm:mb-8 border"
                        style={{ background: `${COLORS.electric}20`, borderColor: `${COLORS.electric}40`, color: COLORS.cyan }}
                     >
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0"></span>
                        Now Booking — Q3 2025
                     </motion.div>

                     <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black leading-[0.92] tracking-tight text-white mb-5 sm:mb-6"
                     >
                        {d.heroTitle}
                     </motion.h1>

                     <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-base sm:text-lg font-medium mb-8 sm:mb-10 max-w-md"
                        style={{ color: "rgba(255,255,255,0.55)" }}
                     >
                        {d.tagline}
                     </motion.p>

                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="flex flex-wrap gap-3 sm:gap-4 mb-10 sm:mb-12"
                     >
                        <motion.a href="#contact" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                           className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-white text-sm"
                           style={{ background: `linear-gradient(135deg, ${COLORS.electric}, ${COLORS.violet})`, boxShadow: `0 12px 32px ${COLORS.electric}50` }}
                        >
                           Start Your Event →
                        </motion.a>
                        <motion.a href="#work" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                           className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-sm border"
                           style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.05)" }}
                        >
                           View Our Work
                        </motion.a>
                     </motion.div>

                     {/* Stats row */}
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex gap-6 sm:gap-10 flex-wrap"
                     >
                        {[{ val: 500, suf: "+", label: "Events Produced" }, { val: 2.4, suf: "M+", label: "Attendees Reached" }, { val: 18, suf: "", label: "Countries" }].map((stat, i) => (
                           <div key={i}>
                              <div className="text-2xl sm:text-3xl font-black text-white leading-none">
                                 <AnimatedCounter to={stat.val} suffix={stat.suf} />
                              </div>
                              <div className="text-[10px] sm:text-xs font-semibold mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{stat.label}</div>
                           </div>
                        ))}
                     </motion.div>
                  </div>

                  {/* Right: Hero image with floating cards */}
                  <div className="relative h-[420px] sm:h-[480px] lg:h-[520px] mt-8 lg:mt-0">
                     {/* Main event image */}
                     <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="absolute inset-0 lg:top-0 lg:left-0 lg:right-16 lg:bottom-12 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10"
                        style={{ boxShadow: `0 40px 80px rgba(0,0,0,0.5)` }}
                     >
                        <img src={d.heroImage || "/images/templates/template-img-38.jpg"} alt="Event" className="w-full h-full object-cover" />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }} />
                     </motion.div>

                     {/* Floating card: Attendees — right side of image */}
                     <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        className="absolute right-0 top-[12%] backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 w-40 sm:w-48 z-20"
                        style={{ boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                     >
                        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                           <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🎉</div>
                           <div className="text-white font-black text-base sm:text-lg">60,000+</div>
                           <div className="text-[10px] sm:text-xs font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>Last Festival</div>
                        </motion.div>
                     </motion.div>

                     {/* Floating card: Active Project — bottom left of image */}
                     <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                        className="absolute bottom-0 left-[2%] backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 w-44 sm:w-52 z-20"
                        style={{ boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                     >
                        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
                           <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0"></span>
                              <span className="text-[9px] sm:text-xs font-black text-emerald-400 uppercase tracking-widest">Active Project</span>
                           </div>
                           <div className="text-white font-black text-sm sm:text-base">Nova Summit</div>
                           <div className="text-[10px] sm:text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>Tokyo · Feb 2025</div>
                        </motion.div>
                     </motion.div>

                     {/* Floating badge: Rating — right side, below attendees */}
                     <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.1, type: "spring" }}
                        className="absolute right-0 top-[52%] backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 z-20"
                     >
                        <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                           <div className="flex gap-0.5 mb-0.5 sm:mb-1">{"★★★★★".split("").map((s, i) => <span key={i} className="text-xs sm:text-sm" style={{ color: "#F59E0B" }}>{s}</span>)}</div>
                           <div className="text-white text-[10px] sm:text-xs font-black">4.98 Rating</div>
                        </motion.div>
                     </motion.div>
                  </div>
               </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
               animate={{ y: [0, 10, 0] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
            >
               <span className="text-[10px] font-black uppercase tracking-widest">Scroll</span>
               <div className="w-px h-8 sm:h-10 bg-gradient-to-b from-white/30 to-transparent"></div>
            </motion.div>
         </section>

         {/* ── CLIENTS MARQUEE ────────────────────────────────────────────────── */}
         <section className="py-10 sm:py-12 overflow-hidden" style={{ background: COLORS.dark }}>
            <div className="mb-2"><Marquee items={CLIENTS} speed={35} /></div>
            <div><Marquee items={[...CLIENTS].reverse()} speed={28} reverse /></div>
         </section>

         {/* ── ABOUT ──────────────────────────────────────────────────────────── */}
         <section id="about" className="py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden" style={{ background: COLORS.bg }}>
            <div className="max-w-7xl mx-auto">
               <div className="absolute -top-20 right-0 w-96 h-96 rounded-full blur-[120px] opacity-20" style={{ background: COLORS.electric }} />

               <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
                  {/* Image side */}
                  <motion.div {...stagger(0)} className="relative">
                     <div className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden aspect-[4/5]" style={{ boxShadow: `0 40px 80px ${COLORS.electric}30` }}>
                        <img src={d.aboutImage || "/images/templates/template-img-39.jpg"} alt="About" className="w-full h-full object-cover" />
                        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${COLORS.dark}90, transparent 50%)` }} />
                     </div>
                     {/* Floating stat card */}
                     <motion.div
                        animate={{ y: [0, -12, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -right-4 sm:-right-8 top-1/3 p-4 sm:p-6 rounded-2xl sm:rounded-3xl"
                        style={{ background: `linear-gradient(135deg, ${COLORS.electric}, ${COLORS.violet})`, boxShadow: `0 20px 40px ${COLORS.electric}50` }}
                     >
                        <div className="text-white text-3xl sm:text-4xl font-black leading-none"><AnimatedCounter to={12} suffix="+" /></div>
                        <div className="text-white/70 text-xs sm:text-sm font-semibold mt-1">Years Experience</div>
                     </motion.div>
                     {/* Second stat */}
                     <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                        className="absolute -left-3 sm:-left-6 bottom-16 p-4 sm:p-5 rounded-xl sm:rounded-2xl backdrop-blur-xl border border-white/20"
                        style={{ background: "rgba(255,255,255,0.9)", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                     >
                        <div className="text-2xl sm:text-3xl font-black leading-none" style={{ color: COLORS.dark }}><AnimatedCounter to={98} suffix="%" /></div>
                        <div className="text-xs sm:text-sm font-semibold mt-1" style={{ color: COLORS.muted }}>Client Satisfaction</div>
                     </motion.div>
                  </motion.div>

                  {/* Copy side */}
                  <div>
                     <motion.p {...stagger(1)} className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] mb-3 sm:mb-4" style={{ color: COLORS.electric }}>
                        About {d.agencyName}
                     </motion.p>
                     <motion.h2 {...stagger(2)} className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black leading-tight tracking-tight mb-6 sm:mb-8" style={{ color: COLORS.dark }}>
                        {d.aboutUsTitle || "We Live For the Moments That Matter."}
                     </motion.h2>
                     <motion.p {...stagger(3)} className="text-base sm:text-lg leading-relaxed mb-8 sm:mb-10" style={{ color: COLORS.muted }}>
                        {d.bio}
                     </motion.p>

                     {/* Value pills */}
                     <motion.div {...stagger(4)} className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-10">
                        {["Bold Concepts", "Flawless Execution", "Global Reach", "Data-Driven"].map((pill, i) => (
                           <span key={i} className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold border" style={{ borderColor: `${COLORS.electric}40`, color: COLORS.electric, background: `${COLORS.electric}10` }}>
                              {pill}
                           </span>
                        ))}
                     </motion.div>

                     <motion.a
                        {...stagger(5)}
                        href="#contact"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-white text-sm"
                        style={{ background: `linear-gradient(135deg, ${COLORS.electric}, ${COLORS.violet})`, boxShadow: `0 12px 32px ${COLORS.electric}40` }}
                     >
                        Let's Build Together <span>→</span>
                     </motion.a>
                  </div>
               </div>
            </div>
         </section>

         {/* ── SERVICES ───────────────────────────────────────────────────────── */}
         <section id="services" className="py-20 sm:py-32 px-4 sm:px-6 relative" style={{ background: COLORS.dark }}>
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, #4F6EF715 0%, transparent 70%)" }} />
            <div className="max-w-7xl mx-auto relative z-10">
               <div className="text-center mb-12 sm:mb-20">
                  <motion.p {...revealUp} className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] mb-3 sm:mb-4" style={{ color: COLORS.electric }}>What We Do</motion.p>
                  <motion.h2 {...stagger(1)} className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black text-white leading-tight tracking-tight">
                     Every Event. Every Scale.<br />
                     <span style={{ background: `linear-gradient(135deg, ${COLORS.electric}, ${COLORS.cyan})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Perfectly Executed.</span>
                  </motion.h2>
               </div>

               <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {services.map((service, i) => (
                     <motion.div
                        key={i}
                        {...stagger(i * 0.5)}
                        whileHover={{ y: -8, scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 cursor-pointer"
                        style={{ background: "rgba(255,255,255,0.03)" }}
                     >
                        <div className="relative h-40 sm:h-48 overflow-hidden">
                           <img src={service.img || "/images/templates/template-img-40.jpg"} alt={service.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                           <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${COLORS.dark}, transparent)` }} />
                           <div className="absolute top-3 sm:top-4 left-3 sm:left-4 w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl backdrop-blur-md bg-white/10 border border-white/20">
                              {service.icon || "✨"}
                           </div>
                        </div>
                        <div className="p-4 sm:p-6">
                           <h3 className="text-base sm:text-lg font-black text-white mb-2">{service.name}</h3>
                           <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{service.desc}</p>
                           <div className="mt-3 sm:mt-4 flex items-center gap-2 text-xs font-black uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: service.color || COLORS.electric }}>
                              Learn More <span>→</span>
                           </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" style={{ background: `linear-gradient(90deg, ${service.color || COLORS.electric}, transparent)` }} />
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── EVENT CATEGORIES ───────────────────────────────────────────────── */}
         <section className="py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden" style={{ background: COLORS.bg }}>
            <div className="max-w-7xl mx-auto">
               <div className="text-center mb-10 sm:mb-16">
                  <motion.p {...revealUp} className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] mb-3 sm:mb-4" style={{ color: COLORS.electric }}>Event Types</motion.p>
                  <motion.h2 {...stagger(1)} className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black tracking-tight">Every Occasion,<br />Covered.</motion.h2>
               </div>

               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {CATEGORIES.map((cat, i) => (
                     <motion.div
                        key={i}
                        {...stagger(i * 0.3)}
                        whileHover={{ y: -8, scale: 1.04 }}
                        className="group relative p-4 sm:p-6 rounded-2xl sm:rounded-3xl text-white cursor-pointer overflow-hidden"
                        style={{ background: `linear-gradient(135deg, ${cat.color}dd, ${cat.color}99)` }}
                     >
                        <div className="relative z-10">
                           <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{cat.emoji}</div>
                           <div className="font-black text-base sm:text-lg leading-tight">{cat.label}</div>
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-white/10 group-hover:scale-150 transition-transform duration-500 origin-center" />
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── PORTFOLIO ──────────────────────────────────────────────────────── */}
         <section id="work" className="py-20 sm:py-32 px-4 sm:px-6 relative" style={{ background: COLORS.dark }}>
            <div className="max-w-7xl mx-auto">
               <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-16 gap-4 sm:gap-6">
                  <div>
                     <motion.p {...revealUp} className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] mb-3 sm:mb-4" style={{ color: COLORS.electric }}>Portfolio</motion.p>
                     <motion.h2 {...stagger(1)} className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black text-white tracking-tight">Our Landmark<br />Events</motion.h2>
                  </div>
                  <div className="flex gap-2">
                     {projects.map((_, i) => (
                        <button key={i} onClick={() => setActiveProject(i)}
                           className="w-8 sm:w-10 h-2 rounded-full transition-all"
                           style={{ background: i === activeProject ? COLORS.electric : "rgba(255,255,255,0.15)" }}
                        />
                     ))}
                  </div>
               </div>

               {/* Feature project */}
               <AnimatePresence mode="wait">
                  <motion.div
                     key={activeProject}
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -30 }}
                     transition={{ duration: 0.5 }}
                     className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden cursor-pointer group mb-6 sm:mb-8"
                     style={{ height: "50vh", minHeight: 320 }}
                     onClick={() => setActiveProject((activeProject + 1) % projects.length)}
                  >
                     <img src={projects[activeProject].img || "/images/templates/template-img-44.jpg"} alt={projects[activeProject].name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                     <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)" }} />

                     {/* Tag */}
                     <div className="absolute top-5 sm:top-8 left-5 sm:left-8">
                        <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-black text-white backdrop-blur-md bg-white/10 border border-white/20">
                           {projects[activeProject].tag || "Event"}
                        </span>
                     </div>

                     {/* Stat bubble */}
                     <motion.div
                        className="absolute top-5 sm:top-8 right-5 sm:right-8 w-16 sm:w-20 h-16 sm:h-20 rounded-full flex flex-col items-center justify-center text-white font-black"
                        style={{ background: `linear-gradient(135deg, ${projects[activeProject].color || COLORS.electric}, ${COLORS.violet})`, boxShadow: `0 8px 24px ${projects[activeProject].color || COLORS.electric}60` }}
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                     >
                        <span className="text-sm sm:text-lg leading-none">{projects[activeProject].stat}</span>
                        <span className="text-[7px] sm:text-[8px] opacity-70">attendees</span>
                     </motion.div>

                     <div className="absolute bottom-6 sm:bottom-10 left-5 sm:left-10 right-5 sm:right-10 flex items-end justify-between gap-4">
                        <div>
                           <h3 className="text-2xl sm:text-4xl md:text-5xl xl:text-6xl font-black text-white tracking-tight mb-2 sm:mb-3">{projects[activeProject].name}</h3>
                           <p className="text-sm sm:text-lg text-white/60 max-w-lg">{projects[activeProject].desc}</p>
                        </div>
                        <motion.button
                           whileHover={{ scale: 1.1 }}
                           className="hidden sm:flex w-12 sm:w-14 h-12 sm:h-14 rounded-full items-center justify-center text-lg font-black text-white border border-white/30 backdrop-blur-md flex-shrink-0"
                           style={{ background: "rgba(255,255,255,0.1)" }}
                        >
                           →
                        </motion.button>
                     </div>
                  </motion.div>
               </AnimatePresence>

               {/* Thumbnail row */}
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {projects.map((p, i) => (
                     <motion.div
                        key={i}
                        onClick={() => setActiveProject(i)}
                        whileHover={{ scale: 1.03 }}
                        className="relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
                        style={{ height: 90, outline: i === activeProject ? `2px solid ${COLORS.electric}` : "none", opacity: i === activeProject ? 1 : 0.5 }}
                     >
                        <img src={p.img || "/images/templates/template-img-44.jpg"} alt={p.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40" />
                        <div className="absolute bottom-2 left-2 sm:left-3 text-white text-[10px] sm:text-xs font-bold truncate">{p.name}</div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── PROCESS ────────────────────────────────────────────────────────── */}
         <section id="process" className="py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden" style={{ background: COLORS.bg }}>
            <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 30% 50%, ${COLORS.electric}08 0%, transparent 60%)` }} />
            <div className="max-w-6xl mx-auto relative z-10">
               <div className="text-center mb-12 sm:mb-20">
                  <motion.p {...revealUp} className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] mb-3 sm:mb-4" style={{ color: COLORS.electric }}>How We Work</motion.p>
                  <motion.h2 {...stagger(1)} className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black tracking-tight">The Pulse<br />Method</motion.h2>
               </div>

               <div className="relative">
                  {/* Connecting line - hidden on mobile */}
                  <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px opacity-20 hidden sm:block" style={{ background: `linear-gradient(to bottom, transparent, ${COLORS.electric}, ${COLORS.violet}, transparent)` }} />

                  <div className="space-y-8 sm:space-y-12">
                     {PROCESS.map((step, i) => (
                        <motion.div
                           key={i}
                           {...stagger(i * 0.5)}
                           className={`flex gap-5 sm:gap-8 items-start ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse md:text-right"}`}
                        >
                           <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"} hidden md:block`} />
                           {/* Node */}
                           <motion.div
                              whileHover={{ scale: 1.2 }}
                              className="relative z-10 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-black text-white flex-shrink-0"
                              style={{ background: `linear-gradient(135deg, ${COLORS.electric}, ${COLORS.violet})`, boxShadow: `0 8px 24px ${COLORS.electric}40` }}
                           >
                              {step.icon}
                           </motion.div>
                           {/* Content */}
                           <div className="flex-1">
                              <div className="text-[10px] sm:text-xs font-black uppercase tracking-widest mb-1 sm:mb-2" style={{ color: COLORS.electric }}>{step.step}</div>
                              <h3 className="text-xl sm:text-2xl font-black mb-1 sm:mb-2" style={{ color: COLORS.dark }}>{step.title}</h3>
                              <p className="text-sm sm:text-base leading-relaxed" style={{ color: COLORS.muted }}>{step.desc}</p>
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </div>
         </section>

         {/* ── WHY CHOOSE US ──────────────────────────────────────────────────── */}
         <section className="py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden" style={{ background: COLORS.dark }}>
            <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 70% 50%, ${COLORS.violet}15 0%, transparent 60%)` }} />
            <FloatingBlob color={COLORS.cyan} size={300} x="0%" y="0%" delay={2} />

            <div className="max-w-7xl mx-auto relative z-10">
               <div className="text-center mb-12 sm:mb-20">
                  <motion.p {...revealUp} className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] mb-3 sm:mb-4" style={{ color: COLORS.cyan }}>Why Pulse</motion.p>
                  <motion.h2 {...stagger(1)} className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black text-white tracking-tight">
                     The Numbers<br />
                     <span style={{ background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.electric})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Speak for Us</span>
                  </motion.h2>
               </div>

               <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-16">
                  {[
                     { val: 500, suf: "+", label: "Events Produced", icon: "🎪", color: COLORS.electric },
                     { val: 98, suf: "%", label: "Client Retention", icon: "💎", color: COLORS.violet },
                     { val: 2.4, suf: "M+", label: "Attendees Reached", icon: "🌍", color: COLORS.coral },
                     { val: 18, suf: "", label: "Countries Served", icon: "✈️", color: COLORS.cyan },
                  ].map((stat, i) => (
                     <motion.div
                        key={i}
                        {...stagger(i * 0.3)}
                        whileHover={{ y: -6 }}
                        className="relative p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 text-center overflow-hidden group"
                        style={{ background: "rgba(255,255,255,0.03)" }}
                     >
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(ellipse at center, ${stat.color}15 0%, transparent 70%)` }} />
                        <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{stat.icon}</div>
                        <div className="text-3xl sm:text-5xl font-black text-white mb-2">
                           <AnimatedCounter to={stat.val} suffix={stat.suf} />
                        </div>
                        <div className="text-xs sm:text-sm font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>{stat.label}</div>
                        <div className="absolute bottom-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }} />
                     </motion.div>
                  ))}
               </div>

               {/* Feature list */}
               <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8">
                  {[
                     { title: "Creative-First Approach", desc: "Every brief starts with 'what would be unforgettable?' — not 'what's typical?'", icon: "🎨" },
                     { title: "Technology-Powered", desc: "Proprietary event management platform, live analytics, and hybrid streaming infrastructure.", icon: "⚡" },
                     { title: "Global Logistics", desc: "18 country footprint with trusted local partners who know the terrain.", icon: "🌐" },
                  ].map((item, i) => (
                     <motion.div key={i} {...stagger(i * 0.4)} className="flex gap-4 sm:gap-5 p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-white/5 bg-white/3">
                        <div className="text-2xl sm:text-3xl flex-shrink-0">{item.icon}</div>
                        <div>
                           <h4 className="text-white font-black mb-1 sm:mb-2 text-sm sm:text-base">{item.title}</h4>
                           <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{item.desc}</p>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── PRICING ────────────────────────────────────────────────────────── */}
         <section id="pricing" className="py-20 sm:py-32 px-4 sm:px-6 relative" style={{ background: COLORS.bg }}>
            <div className="max-w-6xl mx-auto">
               <div className="text-center mb-12 sm:mb-20">
                  <motion.p {...revealUp} className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] mb-3 sm:mb-4" style={{ color: COLORS.electric }}>Packages</motion.p>
                  <motion.h2 {...stagger(1)} className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black tracking-tight">
                     Find Your<br />Perfect Package
                  </motion.h2>
               </div>

               <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
                  {PRICING.map((pkg, i) => (
                     <motion.div
                        key={i}
                        {...stagger(i * 0.3)}
                        whileHover={{ y: -12, scale: 1.02 }}
                        className={`relative rounded-2xl sm:rounded-3xl overflow-hidden border ${pkg.popular ? "border-transparent sm:col-span-2 lg:col-span-1" : "border-gray-200"}`}
                        style={{
                           background: pkg.popular ? `linear-gradient(135deg, ${COLORS.electric}, ${COLORS.violet})` : COLORS.surface,
                           boxShadow: pkg.popular ? `0 30px 60px ${COLORS.electric}40` : "0 4px 20px rgba(0,0,0,0.06)",
                           transform: pkg.popular ? "scale(1.02) sm:scale(1.04)" : "scale(1)",
                        }}
                     >
                        {pkg.popular && (
                           <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #22D3EE, #8B5CF6, #FF6B6B)" }} />
                        )}
                        <div className="p-6 sm:p-8">
                           {pkg.popular && (
                              <div className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 sm:mb-4 bg-white/20 text-white">
                                 Most Popular
                              </div>
                           )}
                           <h3 className={`text-xl sm:text-2xl font-black mb-2`} style={{ color: pkg.popular ? "white" : COLORS.dark }}>{pkg.name}</h3>
                           <p className={`text-xs sm:text-sm mb-4 sm:mb-6`} style={{ color: pkg.popular ? "rgba(255,255,255,0.6)" : COLORS.muted }}>{pkg.desc}</p>
                           <div className={`text-4xl sm:text-5xl font-black mb-6 sm:mb-8`} style={{ color: pkg.popular ? "white" : COLORS.dark }}>
                              {pkg.price}
                              {pkg.price !== "Custom" && <span className="text-sm sm:text-base font-semibold opacity-50 ml-1">onwards</span>}
                           </div>
                           <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                              {pkg.features.map((f, j) => (
                                 <li key={j} className="flex gap-2.5 sm:gap-3 items-center text-xs sm:text-sm">
                                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] sm:text-[10px]"
                                       style={{ background: pkg.popular ? "rgba(255,255,255,0.2)" : `${COLORS.electric}20`, color: pkg.popular ? "white" : COLORS.electric }}>
                                       ✓
                                    </div>
                                    <span style={{ color: pkg.popular ? "rgba(255,255,255,0.8)" : COLORS.muted }}>{f}</span>
                                 </li>
                              ))}
                           </ul>
                           <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              className="w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm transition-all"
                              style={pkg.popular
                                 ? { background: "rgba(255,255,255,0.2)", color: "white", border: "1px solid rgba(255,255,255,0.3)" }
                                 : { background: `linear-gradient(135deg, ${COLORS.electric}, ${COLORS.violet})`, color: "white" }
                              }
                           >
                              Get Started
                           </motion.button>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── TESTIMONIALS ───────────────────────────────────────────────────── */}
         <section className="py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden" style={{ background: COLORS.dark }}>
            <FloatingBlob color={COLORS.coral} size={400} x="50%" y="30%" delay={3} />
            <div className="max-w-4xl mx-auto relative z-10">
               <div className="text-center mb-12 sm:mb-20">
                  <motion.p {...revealUp} className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] mb-3 sm:mb-4" style={{ color: COLORS.coral }}>Testimonials</motion.p>
                  <motion.h2 {...stagger(1)} className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black text-white tracking-tight">
                     Heard From<br />the Room
                  </motion.h2>
               </div>

               <AnimatePresence mode="wait">
                  <motion.div
                     key={activeTestimonial % TESTIMONIALS.length}
                     initial={{ opacity: 0, x: 60 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -60 }}
                     transition={{ duration: 0.4 }}
                     className="relative p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-white/10 text-center"
                     style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)" }}
                  >
                     <div className="text-5xl sm:text-7xl font-black opacity-10 absolute top-4 left-5 sm:left-8 leading-none" style={{ color: COLORS.electric }}>"</div>
                     <p className="text-lg sm:text-2xl md:text-3xl font-semibold text-white leading-relaxed mb-7 sm:mb-10 relative z-10">
                        "{TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.text}"
                     </p>
                     <div className="flex items-center justify-center gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-black text-base sm:text-lg flex-shrink-0"
                           style={{ background: `linear-gradient(135deg, ${TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.color || COLORS.electric}, ${COLORS.violet})` }}>
                           {TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.avatar}
                        </div>
                        <div className="text-left">
                           <div className="text-white font-black text-sm sm:text-base">{TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.name}</div>
                           <div className="text-xs sm:text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.role}</div>
                        </div>
                     </div>
                  </motion.div>
               </AnimatePresence>

               <div className="flex justify-center gap-3 mt-6 sm:mt-8">
                  {TESTIMONIALS.map((_, i) => (
                     <button key={i} onClick={() => setActiveTestimonial(i)}
                        className="w-8 sm:w-10 h-2 rounded-full transition-all"
                        style={{ background: i === (activeTestimonial % TESTIMONIALS.length) ? COLORS.electric : "rgba(255,255,255,0.15)" }}
                     />
                  ))}
               </div>
            </div>
         </section>

         {/* ── TEAM ───────────────────────────────────────────────────────────── */}
         <section className="py-20 sm:py-32 px-4 sm:px-6 relative" style={{ background: COLORS.bg }}>
            <div className="max-w-6xl mx-auto">
               <div className="text-center mb-12 sm:mb-20">
                  <motion.p {...revealUp} className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] mb-3 sm:mb-4" style={{ color: COLORS.electric }}>Our People</motion.p>
                  <motion.h2 {...stagger(1)} className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black tracking-tight">
                     The Minds<br />Behind the Magic
                  </motion.h2>
               </div>

               <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {TEAM.map((member, i) => (
                     <motion.div
                        key={i}
                        {...stagger(i * 0.3)}
                        whileHover={{ y: -10 }}
                        className="group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer border border-gray-100"
                        style={{ background: COLORS.surface, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
                     >
                        <div className="relative h-44 sm:h-56 flex items-center justify-center overflow-hidden"
                           style={{ background: `linear-gradient(135deg, ${member.color}20, ${member.color}40)` }}>
                           <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-white font-black text-2xl sm:text-3xl"
                              style={{ background: `linear-gradient(135deg, ${member.color}, ${COLORS.violet})`, boxShadow: `0 12px 32px ${member.color}60` }}>
                              {member.name[0]}
                           </div>
                           <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4"
                              style={{ background: `linear-gradient(to top, ${member.color}dd, transparent)` }}>
                              <div className="flex gap-1.5 sm:gap-2">
                                 {["in", "tw", "be"].map(s => (
                                    <div key={s} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-[9px] sm:text-[10px] font-black uppercase">{s}</div>
                                 ))}
                              </div>
                           </div>
                        </div>
                        <div className="p-4 sm:p-5">
                           <div className="inline-block px-2.5 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest mb-2 sm:mb-3"
                              style={{ background: `${member.color}15`, color: member.color }}>
                              {member.badge}
                           </div>
                           <h4 className="font-black text-base sm:text-lg" style={{ color: COLORS.dark }}>{member.name}</h4>
                           <p className="text-xs sm:text-sm" style={{ color: COLORS.muted }}>{member.role}</p>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── GALLERY ────────────────────────────────────────────────────────── */}
         <section className="py-20 sm:py-32 px-4 sm:px-6 relative" style={{ background: COLORS.dark }}>
            <div className="max-w-7xl mx-auto">
               <div className="text-center mb-12 sm:mb-20">
                  <motion.p {...revealUp} className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] mb-3 sm:mb-4" style={{ color: COLORS.electric }}>Gallery</motion.p>
                  <motion.h2 {...stagger(1)} className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black text-white tracking-tight">
                     Frames from<br />Our Finest Moments
                  </motion.h2>
               </div>

               {/* Masonry grid */}
               <div className="columns-2 md:columns-3 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
                  {GALLERY_IMGS.map((img, i) => (
                     <motion.div
                        key={i}
                        {...stagger(i * 0.2)}
                        whileHover={{ scale: 1.03 }}
                        onClick={() => setLightbox(img)}
                        className="break-inside-avoid relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group mb-3 sm:mb-4"
                        style={{ height: i % 3 === 0 ? 200 : i % 3 === 1 ? 150 : 180 }}
                     >
                        <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                           <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-2xl sm:text-3xl">⊕</div>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
               {lightbox && (
                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8"
                     onClick={() => setLightbox(null)}
                  >
                     <motion.img
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        src={lightbox}
                        alt="Gallery"
                        className="max-w-4xl w-full max-h-[85vh] object-contain rounded-xl sm:rounded-2xl"
                     />
                     <button className="absolute top-5 sm:top-8 right-5 sm:right-8 text-white/60 hover:text-white text-2xl sm:text-3xl font-black" onClick={() => setLightbox(null)}>✕</button>
                  </motion.div>
               )}
            </AnimatePresence>
         </section>

         {/* ── FAQ ────────────────────────────────────────────────────────────── */}
         <section className="py-20 sm:py-32 px-4 sm:px-6" style={{ background: COLORS.bg }}>
            <div className="max-w-3xl mx-auto">
               <div className="text-center mb-12 sm:mb-20">
                  <motion.p {...revealUp} className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] mb-3 sm:mb-4" style={{ color: COLORS.electric }}>FAQ</motion.p>
                  <motion.h2 {...stagger(1)} className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black tracking-tight">
                     Questions,<br />Answered.
                  </motion.h2>
               </div>

               <div className="space-y-3 sm:space-y-4">
                  {FAQS.map((faq, i) => (
                     <motion.div
                        key={i}
                        {...stagger(i * 0.2)}
                        className="rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200 cursor-pointer"
                        style={{ background: COLORS.surface }}
                        onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                     >
                        <div className="flex items-center justify-between p-4 sm:p-6 gap-3 sm:gap-4">
                           <h4 className="font-black text-base sm:text-lg" style={{ color: COLORS.dark }}>{faq.q}</h4>
                           <motion.div
                              animate={{ rotate: activeFaq === i ? 45 : 0 }}
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white font-black text-sm sm:text-base"
                              style={{ background: activeFaq === i ? COLORS.electric : COLORS.muted }}
                           >
                              +
                           </motion.div>
                        </div>
                        <AnimatePresence>
                           {activeFaq === i && (
                              <motion.div
                                 initial={{ height: 0, opacity: 0 }}
                                 animate={{ height: "auto", opacity: 1 }}
                                 exit={{ height: 0, opacity: 0 }}
                                 transition={{ duration: 0.3 }}
                                 className="overflow-hidden"
                              >
                                 <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-sm sm:text-base leading-relaxed" style={{ color: COLORS.muted }}>{faq.a}</div>
                              </motion.div>
                           )}
                        </AnimatePresence>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── CONTACT ────────────────────────────────────────────────────────── */}
         <section id="contact" className="py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden" style={{ background: COLORS.dark }}>
            <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 50%, ${COLORS.electric}15 0%, transparent 60%)` }} />
            <FloatingBlob color={COLORS.violet} size={500} x="20%" y="20%" delay={0} />
            <FloatingBlob color={COLORS.cyan} size={300} x="70%" y="60%" delay={3} />

            <div className="max-w-6xl mx-auto relative z-10">
               <div className="text-center mb-12 sm:mb-20">
                  <motion.p {...revealUp} className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] mb-3 sm:mb-4" style={{ color: COLORS.electric }}>Let's Connect</motion.p>
                  <motion.h2 {...stagger(1)} className="text-3xl sm:text-4xl md:text-5xl xl:text-7xl font-black text-white tracking-tight leading-tight">
                     Ready to Create<br />
                     <span style={{ background: `linear-gradient(135deg, ${COLORS.electric}, ${COLORS.cyan})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                        Something Extraordinary?
                     </span>
                  </motion.h2>
               </div>

               <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">
                  {/* Info cards */}
                  <div className="space-y-4 sm:space-y-6">
                     {[
                        { icon: "✉️", label: "Email Us", value: d.contactEmail, color: COLORS.electric },
                        { icon: "📞", label: "Call Us", value: d.phone || "+91 98765 43210", color: COLORS.violet },
                        { icon: "📍", label: "Visit Us", value: d.address, color: COLORS.coral },
                     ].map((item, i) => (
                        <motion.div
                           key={i}
                           {...stagger(i * 0.3)}
                           whileHover={{ x: 8 }}
                           className="flex gap-4 sm:gap-5 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/10 backdrop-blur-xl"
                           style={{ background: "rgba(255,255,255,0.04)" }}
                        >
                           <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl flex-shrink-0"
                              style={{ background: `${item.color}20` }}>
                              {item.icon}
                           </div>
                           <div>
                              <div className="text-[10px] sm:text-xs font-black uppercase tracking-widest mb-1" style={{ color: item.color }}>{item.label}</div>
                              <div className="text-white font-semibold text-sm sm:text-base break-all sm:break-normal">{item.value}</div>
                           </div>
                        </motion.div>
                     ))}
                  </div>

                  {/* Form */}
                  <motion.div {...stagger(2)} className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 backdrop-blur-xl" style={{ background: "rgba(255,255,255,0.04)" }}>
                     <div className="space-y-4 sm:space-y-5">
                        <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                           {["Your Name", "Company"].map(placeholder => (
                              <input key={placeholder} placeholder={placeholder}
                                 className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold placeholder:font-normal border border-white/10 outline-none focus:border-indigo-400 transition-colors text-white"
                                 style={{ background: "rgba(255,255,255,0.06)", color: "white" }}
                              />
                           ))}
                        </div>
                        <input placeholder="Email Address"
                           className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold placeholder:font-normal border border-white/10 outline-none focus:border-indigo-400 transition-colors text-white"
                           style={{ background: "rgba(255,255,255,0.06)", color: "white" }}
                        />
                        <select className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold border border-white/10 outline-none focus:border-indigo-400 transition-colors text-white/60 appearance-none cursor-pointer"
                           style={{ background: "rgba(255,255,255,0.06)" }}>
                           <option value="">Event Type</option>
                           {CATEGORIES.map(c => <option key={c.label}>{c.label}</option>)}
                        </select>
                        <textarea rows={4} placeholder="Tell us about your event vision..."
                           className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold placeholder:font-normal border border-white/10 outline-none focus:border-indigo-400 transition-colors resize-none text-white"
                           style={{ background: "rgba(255,255,255,0.06)", color: "white" }}
                        />
                        <motion.button
                           whileHover={{ scale: 1.02 }}
                           whileTap={{ scale: 0.97 }}
                           className="w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-white text-xs sm:text-sm"
                           style={{ background: `linear-gradient(135deg, ${COLORS.electric}, ${COLORS.violet})`, boxShadow: `0 12px 32px ${COLORS.electric}40` }}
                        >
                           Send Message →
                        </motion.button>
                     </div>
                  </motion.div>
               </div>
            </div>
         </section>

         {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
         <footer className="px-4 sm:px-6 pt-16 sm:pt-20 pb-8 sm:pb-10" style={{ background: "#0A091A" }}>
            <div className="max-w-7xl mx-auto">
               {/* Top row */}
               <div className="flex flex-col md:flex-row justify-between items-start gap-10 sm:gap-12 pb-12 sm:pb-16 border-b border-white/5">
                  <div className="max-w-xs">
                     <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center text-white text-base sm:text-lg font-black flex-shrink-0"
                           style={{ background: `linear-gradient(135deg, ${COLORS.electric}, ${COLORS.violet})` }}>P</div>
                        <span className="font-black text-lg sm:text-xl text-white">{d.agencyName}</span>
                     </div>
                     <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
                        {d.tagline}
                     </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12">
                     {[
                        { title: "Services", links: ["Festival Production", "Brand Activations", "Tech Conferences", "Virtual Events"] },
                        { title: "Company", links: ["About Us", "Our Work", "Team", "Careers"] },
                        { title: "Legal", links: ["Privacy Policy", "Terms of Use", "Cookie Policy"] },
                     ].map(col => (
                        <div key={col.title}>
                           <h5 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] mb-4 sm:mb-5" style={{ color: COLORS.electric }}>{col.title}</h5>
                           <ul className="space-y-2.5 sm:space-y-3">
                              {col.links.map(link => (
                                 <li key={link}>
                                    <a href="#" className="text-xs sm:text-sm font-medium transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.35)" }}>{link}</a>
                                 </li>
                              ))}
                           </ul>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Bottom row */}
               <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 pt-8 sm:pt-10">
                  <p className="text-[10px] sm:text-xs font-semibold text-center sm:text-left" style={{ color: "rgba(255,255,255,0.25)" }}>{d.footerCopyright}</p>
                  <div className="flex gap-3 sm:gap-4 flex-wrap justify-center">
                     {["LinkedIn", "Twitter", "Instagram", "Behance"].map(s => (
                        <a key={s} href="#" className="text-[10px] sm:text-xs font-black uppercase tracking-widest transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.25)" }}>{s}</a>
                     ))}
                  </div>
               </div>
            </div>
         </footer>
      </div>
   );
}