import TemplateLayout from "./TemplateLayout";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

// ─── Utility: useInView hook ───────────────────────────────────────────────
function useInView(options = {}) {
   const ref = useRef(null);
   const [inView, setInView] = useState(false);
   useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const observer = new IntersectionObserver(([entry]) => {
         if (entry.isIntersecting) { setInView(true); if (options.once !== false) observer.disconnect(); }
      }, { threshold: options.threshold || 0.1 });
      observer.observe(el);
      return () => observer.disconnect();
   }, []);
   return [ref, inView];
}

// ─── Animated Counter ──────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
   const [count, setCount] = useState(0);
   const [ref, inView] = useInView();
   useEffect(() => {
      if (!inView) return;
      let start = 0;
      const step = target / (duration / 16);
      const timer = setInterval(() => {
         start += step;
         if (start >= target) { setCount(target); clearInterval(timer); }
         else setCount(Math.floor(start));
      }, 16);
      return () => clearInterval(timer);
   }, [inView, target, duration]);
   return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Marquee ──────────────────────────────────────────────────────────────
function Marquee({ items, speed = 40 }) {
   const doubled = [...items, ...items];
   return (
      <div className="overflow-hidden whitespace-nowrap">
         <motion.div
            className="inline-flex gap-8 sm:gap-16 items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
         >
            {doubled.map((item, i) => (
               <div key={i} className="inline-flex items-center gap-2 sm:gap-3 group cursor-default shrink-0">
                  <span className="text-lg sm:text-2xl font-black tracking-tight text-[#c8a96e]/30 group-hover:text-[#c8a96e] transition-all duration-500 uppercase">{item}</span>
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#c8a96e]/20 group-hover:bg-[#c8a96e] transition-colors shrink-0"></span>
               </div>
            ))}
         </motion.div>
      </div>
   );
}

// ─── Section Reveal ───────────────────────────────────────────────────────
function Reveal({ children, delay = 0, y = 40, className = "" }) {
   const [ref, inView] = useInView();
   return (
      <motion.div
         ref={ref}
         initial={{ opacity: 0, y }}
         animate={inView ? { opacity: 1, y: 0 } : {}}
         transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
         className={className}
      >
         {children}
      </motion.div>
   );
}

// ─── Magnetic Button ──────────────────────────────────────────────────────
function MagneticBtn({ children, className = "", onClick }) {
   const x = useMotionValue(0);
   const y = useMotionValue(0);
   const sx = useSpring(x, { stiffness: 300, damping: 20 });
   const sy = useSpring(y, { stiffness: 300, damping: 20 });
   const handleMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
      y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
   };
   const handleLeave = () => { x.set(0); y.set(0); };
   return (
      <motion.button
         style={{ x: sx, y: sy }}
         onMouseMove={handleMove}
         onMouseLeave={handleLeave}
         className={className}
         onClick={onClick}
         whileTap={{ scale: 0.96 }}
      >
         {children}
      </motion.button>
   );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────
function Lightbox({ src, alt, onClose }) {
   useEffect(() => {
      const handler = (e) => e.key === "Escape" && onClose();
      window.addEventListener("keydown", handler);
      return () => window.removeEventListener("keydown", handler);
   }, [onClose]);
   return (
      <AnimatePresence>
         <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm p-3 sm:p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
         >
            <motion.div
               className="relative max-w-5xl w-full max-h-[90vh] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl"
               initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
               transition={{ type: "spring", stiffness: 260, damping: 22 }}
               onClick={(e) => e.stopPropagation()}
            >
               <Image src={src} alt={alt} width={1200} height={800} className="object-cover w-full h-full" />
               <button onClick={onClose} className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 text-white flex items-center justify-center text-lg sm:text-xl hover:bg-black transition-colors">✕</button>
            </motion.div>
         </motion.div>
      </AnimatePresence>
   );
}

// ══════════════════════════════════════════════════════════════════════════
export default function EventTemplate1({ data }) {
   const {
      agencyName, agencyNameFontSize, tagline, taglineFontSize,
      heroTitle, heroTitleFontSize, heroImage, bio, bioFontSize,
      aboutUsTitle, aboutUsTitleFontSize, aboutImage,
      services, projects, contactEmail, phone, countryCode,
      address, headerType, logoUrl, footerCopyright,
      trustedClients, eventCategories, eventPlanningProcess,
      whyChooseUs, pricing, testimonials: dataTestimonials,
      team: dataTeam, gallery, faqs: dataFaqs
   } = data || {};

   const displayAgency = agencyName || "Éclat Events";
   const displayTagline = tagline || "Excellence Crafted in Every Detail";
   const displayPhone = phone ? `${countryCode?.split(' ')[0] || ''} ${phone}`.trim() : "+1 800 ECLAT";

   const displayServices = (services?.length > 0 && services.some(s => s.name || s.desc)) ? services : [
      { name: 'Corporate Summits', desc: 'Flawless logistics for global conferences and C-suite retreats.', icon: '◈' },
      { name: 'Luxury Weddings', desc: 'Bespoke ceremonies crafted with artisan precision and romance.', icon: '◇' },
      { name: 'Product Launches', desc: 'Immersive brand debut experiences that captivate and convert.', icon: '◉' },
      { name: 'VIP Concierge', desc: 'Ultra-personalized service for high-profile guests and celebrities.', icon: '◎' },
      { name: 'Fashion Galas', desc: 'Runway-ready events that merge art, culture, and prestige.', icon: '◈' },
      { name: 'Destination Events', desc: 'International event coordination with local mastery.', icon: '◇' },
   ];

   const displayProjects = (projects?.length > 0 && projects.some(p => p.name || p.desc)) ? projects : [
      { name: 'Aurora Summit', desc: 'Global tech conference · 12,000 attendees', image: '/images/templates/template-img-37.jpg', tag: 'Corporate' },
      { name: 'Maison Blanc', desc: 'Luxury couture gala · Paris Fashion Week', image: '/images/templates/template-img-39.jpg', tag: 'Fashion' },
      { name: 'Volta Launch', desc: 'Electric vehicle brand experience · Berlin', image: '/images/templates/template-img-41.jpg', tag: 'Product Launch' },
      { name: 'Solstice Wedding', desc: 'Bespoke ceremony · Amalfi Coast', image: '/images/templates/template-img-42.jpg', tag: 'Wedding' },
   ];

   const clients = (trustedClients?.length > 0 && trustedClients.some(c => c.name)) 
      ? trustedClients.map(c => c.name) 
      : ['Vogue', 'Tesla', 'LVMH', 'Forbes', 'Sotheby\'s', 'Rolex', 'Condé Nast', 'Dior', 'Bentley', 'Bloomberg'];

   const categories = (eventCategories?.length > 0 && eventCategories.some(c => c.name)) ? eventCategories.map(c => ({
      name: c.name, img: c.image || '/images/templates/template-img-31.jpg', count: c.desc || ''
   })) : [
      { name: 'Weddings', img: '/images/templates/template-img-31.jpg', count: '180+ events' },
      { name: 'Corporate', img: '/images/templates/template-img-32.jpg', count: '220+ events' },
      { name: 'Concerts', img: '/images/templates/template-img-34.jpg', count: '95+ events' },
      { name: 'Fashion', img: '/images/templates/template-img-36.jpg', count: '65+ events' },
      { name: 'Exhibitions', img: '/images/templates/template-img-35.jpg', count: '110+ events' },
      { name: 'VIP Private', img: '/images/templates/template-img-33.jpg', count: '200+ events' },
   ];

   const process = (eventPlanningProcess?.length > 0 && eventPlanningProcess.some(p => p.step || p.desc)) ? eventPlanningProcess.map((p, i) => ({
      step: p.step || `0${i + 1}`, title: p.step, desc: p.desc
   })) : [
      { step: '01', title: 'Discovery & Vision', desc: 'Deep-dive consultation to understand your vision, objectives, and audience before a single plan is made.' },
      { step: '02', title: 'Concept Design', desc: 'Our creative directors craft mood boards, spatial concepts, and experiential narratives unique to your event.' },
      { step: '03', title: 'Logistics Blueprint', desc: 'Every detail mapped — vendors, timelines, contingencies, and communications aligned to perfection.' },
      { step: '04', title: 'Live Execution', desc: 'Our on-site teams operate with military precision so you experience your event, not manage it.' },
      { step: '05', title: 'Post-Event Analysis', desc: 'Comprehensive debrief, impact measurement, and insights to elevate your next event further.' },
   ];

   const reasons = (whyChooseUs?.length > 0 && whyChooseUs.some(r => r.title || r.desc)) ? whyChooseUs.map(r => ({
      title: r.title, desc: r.desc, icon: r.icon ? '✦' : '✦' // Editor passes an image, maybe we just use the fallback icon
   })) : [
      { title: 'Zero-Defect Standard', desc: 'Triple-layer quality control ensures nothing slips through — ever.', icon: '✦' },
      { title: 'Global Network', desc: '2,000+ vetted vendor partnerships across 45 countries.', icon: '✦' },
      { title: 'Creative Directors', desc: 'Award-winning designers with luxury brand pedigrees.', icon: '✦' },
      { title: '24/7 Dedicated Team', desc: 'Your account team is always reachable, always ready.', icon: '✦' },
   ];

   const pricingPlans = (pricing?.length > 0 && pricing.some(p => p.planName || p.price)) ? pricing.map((p, i) => ({
      name: p.planName, price: p.price, unit: 'starting', 
      features: p.features ? p.features.split(',').map(f => f.trim()) : [], 
      featured: i === 1 
   })) : [
      { name: 'Signature', price: '8,500', unit: 'starting', features: ['Up to 150 guests', 'Concept & Design', 'Vendor Coordination', 'Day-of Management', 'Post-Event Report'], featured: false },
      { name: 'Prestige', price: '22,000', unit: 'starting', features: ['Up to 500 guests', 'Full Creative Direction', 'International Vendors', 'Dedicated Team of 8', 'Live Broadcast Setup', 'VIP Concierge'], featured: true },
      { name: 'Maison', price: 'Bespoke', unit: 'custom', features: ['Unlimited Scale', 'Global Execution', 'Celebrity Talent', 'Security & Protocol', 'Media & PR Coverage', 'White-glove Service'], featured: false },
   ];

   const testimonials = (dataTestimonials?.length > 0 && dataTestimonials.some(t => t.clientName || t.review)) ? dataTestimonials.map(t => ({
      name: t.clientName, title: t.event, quote: t.review, avatar: t.image || '/images/templates/template-img-11.jpg'
   })) : [
      { name: 'Isabelle Fontaine', title: 'CMO, Maison Dior Paris', quote: 'Éclat redefined what we thought a product launch could be. The execution was so seamless, it felt like magic — until you see the army of professionals behind it.', avatar: '/images/templates/template-img-11.jpg' },
      { name: 'Marcus Webb', title: 'CEO, Summit Global', quote: 'We\'ve used many agencies worldwide, but the level of strategic thinking and creative vision here is unmatched. Our annual summit has never looked this exceptional.', avatar: '/images/templates/template-img-13.jpg' },
      { name: 'Priya Nair', title: 'Founder, Nair & Associates', quote: 'Our wedding was the most beautiful night of our lives. Every detail — down to the floral arrangement geometry — was exactly what we envisioned but couldn\'t articulate.', avatar: '/images/templates/template-img-14.jpg' },
      { name: 'Julian Mercer', title: 'Director, Cannes Film Fest', quote: 'The red carpet event they orchestrated drew global media attention and set a new standard for cinematic galas. Absolutely world-class performance.', avatar: '/images/templates/template-img-15.jpg' },
   ];

   const team = (dataTeam?.length > 0 && dataTeam.some(t => t.name || t.role)) ? dataTeam.map(t => ({
      name: t.name, role: t.role, spec: t.bio, img: t.image || '/images/templates/template-img-11.jpg'
   })) : [
      { name: 'Celeste Moreau', role: 'Creative Director', spec: 'Luxury Weddings & Fashion Events', img: '/images/templates/template-img-11.jpg' },
      { name: 'Damien Cole', role: 'Head of Strategy', spec: 'Corporate & Global Summits', img: '/images/templates/template-img-12.jpg' },
      { name: 'Ananya Sharma', role: 'Lead Producer', spec: 'Product Launches & Concerts', img: '/images/templates/template-img-13.jpg' },
      { name: 'Theo Blackwood', role: 'Logistics Director', spec: 'Destination & International Events', img: '/images/templates/template-img-14.jpg' },
   ];

   const galleryImgs = (gallery?.length > 0 && gallery.some(g => g.image)) ? gallery.map(g => g.image) : [
      '/images/templates/template-img-31.jpg',
      '/images/templates/template-img-32.jpg',
      '/images/templates/template-img-33.jpg',
      '/images/templates/template-img-34.jpg',
      '/images/templates/template-img-35.jpg',
      '/images/templates/template-img-36.jpg',
      '/images/templates/template-img-37.jpg',
      '/images/templates/template-img-38.jpg',
      '/images/templates/template-img-39.jpg',
   ];

   const faqs = (dataFaqs?.length > 0 && dataFaqs.some(f => f.question || f.answer)) ? dataFaqs.map(f => ({
      q: f.question, a: f.answer
   })) : [
      { q: 'How far in advance should I book?', a: 'For major events (500+ guests), we recommend 8–12 months. Intimate gatherings can often be arranged in 6–8 weeks depending on availability and scope.' },
      { q: 'Do you handle international events?', a: 'Absolutely. We have coordinated events in over 45 countries with a network of trusted local partners who meet our global quality standards.' },
      { q: 'What makes Éclat different from other agencies?', a: 'We assign a dedicated creative director and logistics lead to every project — no shared account managers. Your vision receives undivided, senior-level attention from day one.' },
      { q: 'Can you work within a strict budget?', a: 'Yes. Our Signature package is designed for high-quality events with budget constraints. We\'re transparent about costs and never upsell you on elements you don\'t need.' },
      { q: 'Do you provide post-event analytics?', a: 'Every project closes with a comprehensive impact report covering attendance data, media coverage metrics, guest satisfaction scores, and ROI analysis for corporate clients.' },
   ];

   // State
   const [activeTestimonial, setActiveTestimonial] = useState(0);
   const [activeFaq, setActiveFaq] = useState(null);
   const [lightbox, setLightbox] = useState(null);
   const [menuOpen, setMenuOpen] = useState(false);
   const heroRef = useRef(null);
   const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
   const heroBgY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
   const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

   // Auto-advance testimonials
   useEffect(() => {
      if (!testimonials || testimonials.length === 0) return;
      const t = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 5000);
      return () => clearInterval(t);
   }, [testimonials.length]);

   // Lock body scroll when menu is open
   useEffect(() => {
      document.body.style.overflow = menuOpen ? 'hidden' : '';
      return () => { document.body.style.overflow = ''; };
   }, [menuOpen]);

   const navLinks = ["Services", "Portfolio", "About", "Team", "Pricing", "Contact"];

   return (
      <TemplateLayout data={data} theme="dark" category="Event Management" hideHeader={true} hideFooter={true}>
         <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
        .gold { color: #c8a96e; }
        .gold-border { border-color: #c8a96e; }
        .gold-bg { background-color: #c8a96e; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #c8a96e; border-radius: 2px; }
        .text-balance { text-wrap: balance; }
        .clip-diagonal { clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%); }
        .noise-bg { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E"); }
        .line-clamp-3 { overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; }
        /* Responsive touch targets */
        @media (max-width: 640px) {
          .mobile-touch { min-height: 44px; min-width: 44px; }
        }
        /* Prevent text overflow on small screens */
        .break-words { word-break: break-word; overflow-wrap: break-word; }
        /* Smooth scroll */
        html { scroll-behavior: smooth; }
      `}</style>

         <div className="font-body bg-[#0a0a0a] text-white min-h-screen overflow-x-hidden">

            {/* ── NAVIGATION ─────────────────────────────────────────────── */}
            <motion.header
               className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 sm:py-4"
               initial={{ y: -80 }} animate={{ y: 0 }}
               transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
               <div className="max-w-7xl mx-auto flex items-center justify-between">
                  {/* Frosted bar */}
                  <div className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5"></div>

                  {/* Logo */}
                  <div className="relative z-10 flex items-center gap-3 min-w-0">
                     {headerType === "Image" && logoUrl ? (
                        <div className="relative h-8 sm:h-9 w-24 sm:w-28 shrink-0">
                           <Image src={logoUrl} alt="Logo" fill className="object-contain" />
                        </div>
                     ) : (
                        <div className="flex flex-col min-w-0">
                           <span
                              className="font-display font-light tracking-[0.15em] text-white truncate"
                              style={{
                                 fontSize: agencyNameFontSize ? `${agencyNameFontSize}px` : 'clamp(1.1rem, 4vw, 1.5rem)'
                              }}
                           >
                              {displayAgency}
                           </span>
                           <span
                              className="font-body font-medium tracking-[0.35em] sm:tracking-[0.45em] uppercase text-[#c8a96e] mt-0.5 truncate"
                              style={{
                                 fontSize: taglineFontSize ? `${taglineFontSize}px` : 'clamp(7px, 1.5vw, 9px)'
                              }}
                           >
                              {displayTagline}
                           </span>
                        </div>
                     )}
                  </div>

                  {/* Desktop Nav */}
                  <nav className="relative z-10 hidden lg:flex items-center gap-6 xl:gap-8">
                     {navLinks.map((link) => (
                        <a key={link} href={`#${link.toLowerCase()}`}
                           className="text-[10px] xl:text-[11px] font-medium tracking-[0.2em] xl:tracking-[0.25em] uppercase text-white/50 hover:text-[#c8a96e] transition-colors duration-300 whitespace-nowrap">
                           {link}
                        </a>
                     ))}
                     <MagneticBtn className="ml-2 xl:ml-4 px-4 xl:px-6 py-2 xl:py-2.5 border border-[#c8a96e] text-[#c8a96e] text-[10px] xl:text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#c8a96e] hover:text-black transition-all duration-300 rounded-sm whitespace-nowrap mobile-touch">
                        Get Proposal
                     </MagneticBtn>
                  </nav>

                  {/* Mobile Hamburger */}
                  <button
                     className="relative z-10 lg:hidden flex flex-col gap-1.5 p-2 mobile-touch"
                     onClick={() => setMenuOpen(!menuOpen)}
                     aria-label="Toggle menu"
                  >
                     <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }} className="w-6 h-px bg-white block origin-center transition-all" />
                     <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} className="w-6 h-px bg-white block" />
                     <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }} className="w-6 h-px bg-white block origin-center transition-all" />
                  </button>
               </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
               {menuOpen && (
                  <motion.div
                     className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col items-center justify-center gap-6 sm:gap-8 px-6"
                     initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  >
                     {navLinks.map((link, i) => (
                        <motion.a key={link} href={`#${link.toLowerCase()}`}
                           className="font-display text-3xl sm:text-4xl font-light text-white/80 hover:text-[#c8a96e] transition-colors mobile-touch flex items-center justify-center"
                           initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                           onClick={() => setMenuOpen(false)}
                        >
                           {link}
                        </motion.a>
                     ))}
                     <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: navLinks.length * 0.07 }}
                        className="mt-4"
                     >
                        <button
                           className="px-8 py-3 border border-[#c8a96e] text-[#c8a96e] text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#c8a96e] hover:text-black transition-all duration-300 rounded-sm mobile-touch"
                           onClick={() => setMenuOpen(false)}
                        >
                           Get Proposal
                        </button>
                     </motion.div>
                  </motion.div>
               )}
            </AnimatePresence>

            {/* ── HERO ───────────────────────────────────────────────────── */}
            <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
               {/* Parallax BG */}
               <motion.div className="absolute inset-0 z-0" style={{ y: heroBgY }}>
                  <Image
                     src={heroImage || "/images/templates/template-img-35.jpg"}
                     alt="Hero event" fill className="object-cover"
                     priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/75 to-[#0a0a0a]/40 sm:to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
               </motion.div>

               {/* Decorative grid - hidden on small screens for perf */}
               <div className="absolute inset-0 z-0 opacity-5 hidden sm:block"
                  style={{ backgroundImage: 'linear-gradient(#c8a96e 1px, transparent 1px), linear-gradient(90deg, #c8a96e 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

               <motion.div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-12 sm:pb-16 w-full" style={{ opacity: heroOpacity }}>
                  <div className="max-w-3xl">
                     <Reveal delay={0.1}>
                        <div className="flex items-center gap-3 mb-6 sm:mb-8">
                           <span className="w-8 sm:w-12 h-px bg-[#c8a96e]" />
                           <span className="text-[9px] sm:text-[10px] tracking-[0.35em] sm:tracking-[0.5em] uppercase text-[#c8a96e] font-medium">Award-Winning Event Agency</span>
                        </div>
                     </Reveal>

                     <Reveal delay={0.25}>
                        <h1 className="font-display font-light leading-[1.05] mb-6 sm:mb-8 text-balance break-words"
                           style={{ fontSize: heroTitleFontSize ? `${heroTitleFontSize}px` : 'clamp(2.8rem, 9vw, 7rem)' }}>
                           {heroTitle || (<>We Create<br /><em className="text-[#c8a96e]">Extraordinary</em><br />Experiences.</>)}
                        </h1>
                     </Reveal>

                     <Reveal delay={0.4}>
                        <p className="text-white/50 text-base sm:text-lg leading-relaxed max-w-xl mb-8 sm:mb-12">
                           From intimate luxury gatherings to global conferences of 20,000 — we engineer environments where moments become milestones.
                        </p>
                     </Reveal>

                     <Reveal delay={0.55}>
                        <div className="flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4">
                           <MagneticBtn className="px-7 sm:px-10 py-3.5 sm:py-4 bg-[#c8a96e] text-black font-medium text-xs sm:text-sm tracking-[0.12em] sm:tracking-[0.15em] uppercase hover:bg-[#e8d5a3] transition-all duration-300 rounded-sm shadow-[0_0_60px_rgba(200,169,110,0.2)] mobile-touch w-full xs:w-auto text-center">
                              Explore Our Work
                           </MagneticBtn>
                           <MagneticBtn className="px-7 sm:px-10 py-3.5 sm:py-4 border border-white/20 text-white/70 font-medium text-xs sm:text-sm tracking-[0.12em] sm:tracking-[0.15em] uppercase hover:border-[#c8a96e] hover:text-[#c8a96e] transition-all duration-300 rounded-sm mobile-touch w-full xs:w-auto text-center">
                              Start a Project
                           </MagneticBtn>
                        </div>
                     </Reveal>

                     {/* Stats Row */}
                     <Reveal delay={0.7}>
                        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-6 sm:gap-12 mt-12 sm:mt-20 pt-8 sm:pt-12 border-t border-white/10">
                           {[['500+', 'Events Delivered'], ['45', 'Countries'], ['98%', 'Client Retention'], ['15', 'Years Excellence']].map(([n, l]) => (
                              <div key={l}>
                                 <p className="font-display text-3xl sm:text-4xl font-light text-[#c8a96e]">{n}</p>
                                 <p className="text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white/40 mt-1">{l}</p>
                              </div>
                           ))}
                        </div>
                     </Reveal>
                  </div>
               </motion.div>

               {/* Scroll indicator */}
               <motion.div
                  className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
                  animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
               >
                  <span className="text-[9px] tracking-[0.4em] text-white/30 uppercase">Scroll</span>
                  <span className="w-px h-8 sm:h-12 bg-gradient-to-b from-[#c8a96e] to-transparent" />
               </motion.div>
            </section>

            {/* ── TRUSTED CLIENTS ────────────────────────────────────────── */}
            <section className="py-10 sm:py-16 border-y border-white/5 overflow-hidden relative">
               <div className="absolute inset-0 bg-[#111111]" />
               <div className="relative">
                  <div className="text-center mb-6 sm:mb-10">
                     <span className="text-[9px] sm:text-[10px] tracking-[0.4em] sm:tracking-[0.5em] uppercase text-white/25 font-medium">Trusted by world-class brands</span>
                  </div>
                  <Marquee items={clients} speed={35} />
               </div>
            </section>

            {/* ── ABOUT US ────────────────────────────────────────────────── */}
            <section id="about" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden">
               <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-20 items-center">

                  {/* Image side */}
                  <Reveal>
                     <div className="relative">
                        <div className="absolute -inset-2 sm:-inset-4 border border-[#c8a96e]/10 rounded-2xl" />
                        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[4/4] lg:aspect-[4/5]">
                           <Image src={aboutImage || "/images/templates/template-img-11.jpg"} alt="About" fill className="object-cover" />
                           <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
                        </div>
                        {/* Floating stat card */}
                        <motion.div
                           className="absolute -bottom-4 sm:-bottom-6 -right-2 sm:-right-6 bg-[#111111] border border-[#c8a96e]/20 rounded-xl p-4 sm:p-6 shadow-2xl"
                           initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                           viewport={{ once: true }} transition={{ delay: 0.4 }}
                        >
                           <p className="font-display text-4xl sm:text-5xl font-light text-[#c8a96e]">
                              <AnimatedCounter target={15} suffix="+" />
                           </p>
                           <p className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-white/40 mt-1">Years of Excellence</p>
                        </motion.div>
                     </div>
                  </Reveal>

                  {/* Text side */}
                  <div className="mt-4 sm:mt-0">
                     <Reveal delay={0.1}>
                        <span
                           className="tracking-[0.4em] sm:tracking-[0.5em] uppercase text-[#c8a96e] mb-4 block"
                           style={{ fontSize: aboutUsTitleFontSize ? `${aboutUsTitleFontSize}px` : 'clamp(9px, 1.5vw, 10px)' }}
                        >
                           {aboutUsTitle || "Our Story"}
                        </span>
                     </Reveal>
                     <Reveal delay={0.2}>
                        <h2 className="font-display font-light leading-tight mb-6 sm:mb-8"
                           style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}>
                           Mastering the Art of<br /><em className="text-[#c8a96e]">Unforgettable</em> Events.
                        </h2>
                     </Reveal>
                     <Reveal delay={0.3}>
                        <p className="text-white/50 leading-relaxed mb-6 sm:mb-8" style={{ fontSize: bioFontSize ? `${bioFontSize}px` : undefined }}>
                           {bio || "For over fifteen years, Éclat has been the silent force behind the world's most celebrated events. We don't just coordinate logistics — we compose experiences with the discipline of architects and the soul of storytellers. Our philosophy is simple: every event is a once-in-a-lifetime opportunity, and it deserves to be treated as such."}
                        </p>
                     </Reveal>

                     {/* Metrics */}
                     <Reveal delay={0.4}>
                        <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-10 pt-8 sm:pt-10 border-t border-white/8">
                           {[['500+', 'Events Managed'], ['98%', 'Client Retention'], ['45', 'Countries']].map(([n, l]) => (
                              <div key={l}>
                                 <p className="font-display text-3xl sm:text-4xl font-light text-[#c8a96e]">{n}</p>
                                 <p className="text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white/35 mt-1 sm:mt-2">{l}</p>
                              </div>
                           ))}
                        </div>
                     </Reveal>
                  </div>
               </div>
            </section>

            {/* ── SERVICES ─────────────────────────────────────────────────── */}
            <section id="services" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 bg-[#111111] relative overflow-hidden">
               {/* decorative */}
               <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-[#c8a96e]/3 blur-3xl" />

               <div className="max-w-7xl mx-auto">
                  <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-20 gap-6 sm:gap-8">
                     <div>
                        <Reveal>
                           <span className="text-[10px] tracking-[0.5em] uppercase text-[#c8a96e] mb-4 block">What We Do</span>
                        </Reveal>
                        <Reveal delay={0.1}>
                           <h2 className="font-display font-light leading-tight"
                              style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}>
                              End-to-End<br />Event Solutions.
                           </h2>
                        </Reveal>
                     </div>
                     <Reveal delay={0.2}>
                        <p className="text-white/40 max-w-sm leading-relaxed text-sm sm:text-base">Our comprehensive management suite covers every facet of the event lifecycle — from creative inception to final applause.</p>
                     </Reveal>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
                     {displayServices.map((service, idx) => (
                        <motion.div
                           key={idx}
                           className="bg-[#111111] p-6 sm:p-8 lg:p-10 group hover:bg-[#c8a96e]/5 transition-all duration-500 cursor-default"
                           initial={{ opacity: 0, y: 30 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: idx * 0.08 }}
                        >
                           <div className="flex items-start justify-between mb-6 sm:mb-8">
                              <span className="text-xl sm:text-2xl text-[#c8a96e]/40 group-hover:text-[#c8a96e] transition-colors">{service.icon || '◈'}</span>
                              <span className="font-display text-5xl sm:text-6xl font-light text-white/5 group-hover:text-white/10 transition-colors leading-none">0{idx + 1}</span>
                           </div>
                           <h3 className="font-display text-xl sm:text-2xl font-light text-white mb-3 sm:mb-4 group-hover:text-[#c8a96e] transition-colors" style={{ fontSize: service.nameFontSize ? `${service.nameFontSize}px` : undefined }}>
                              {service.name}
                           </h3>
                           <p className="text-white/40 text-sm leading-relaxed" style={{ fontSize: service.descFontSize ? `${service.descFontSize}px` : undefined }}>
                              {service.desc}
                           </p>
                           <div className="mt-6 sm:mt-8 w-0 group-hover:w-12 h-px bg-[#c8a96e] transition-all duration-500" />
                        </motion.div>
                     ))}
                  </div>
               </div>
            </section>

            {/* ── EVENT CATEGORIES ─────────────────────────────────────────── */}
            <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden">
               <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-12 sm:mb-20">
                     <Reveal>
                        <span className="text-[10px] tracking-[0.5em] uppercase text-[#c8a96e] mb-4 block">Specializations</span>
                     </Reveal>
                     <Reveal delay={0.1}>
                        <h2 className="font-display font-light" style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}>Event Categories</h2>
                     </Reveal>
                  </div>

                  {/* Responsive grid - 2 cols mobile, 3 cols desktop */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                     {categories.map((cat, idx) => (
                        <motion.div
                           key={idx}
                           className="relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer group aspect-square"
                           initial={{ opacity: 0, scale: 0.95 }}
                           whileInView={{ opacity: 1, scale: 1 }}
                           viewport={{ once: true }}
                           transition={{ delay: idx * 0.1 }}
                           whileHover={{ scale: 1.02 }}
                        >
                           <Image src={cat.img} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                           <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent group-hover:from-[#0a0a0a]/90 transition-all duration-500" />
                           <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-6">
                              <h3 className="font-display text-lg sm:text-2xl font-light text-white">{cat.name}</h3>
                              <p className="text-[10px] sm:text-xs text-[#c8a96e] tracking-[0.2em] uppercase mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{cat.count}</p>
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </section>

            {/* ── PORTFOLIO ──────────────────────────────────────────────────── */}
            <section id="portfolio" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 bg-[#111111] relative overflow-hidden">
               <div className="max-w-7xl mx-auto">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-20 gap-6 sm:gap-8">
                     <div>
                        <Reveal>
                           <span className="text-[10px] tracking-[0.5em] uppercase text-[#c8a96e] mb-4 block">Our Work</span>
                        </Reveal>
                        <Reveal delay={0.1}>
                           <h2 className="font-display font-light" style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}>Notable<br />Accomplishments.</h2>
                        </Reveal>
                     </div>
                     <Reveal delay={0.2}>
                        <button className="text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#c8a96e] border border-[#c8a96e]/30 px-6 sm:px-8 py-2.5 sm:py-3 hover:bg-[#c8a96e] hover:text-black transition-all duration-300 rounded-sm self-start mobile-touch">
                           View All Projects
                        </button>
                     </Reveal>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                     {displayProjects.map((project, idx) => (
                        <motion.div
                           key={idx}
                           className={`relative overflow-hidden rounded-xl sm:rounded-2xl group cursor-pointer ${idx === 0 ? 'lg:col-span-2 aspect-[16/9] sm:aspect-[16/7]' : 'aspect-[4/3]'}`}
                           initial={{ opacity: 0, y: 40 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: idx * 0.15 }}
                           whileHover={{ scale: 1.01 }}
                        >
                           <Image src={project.image || "/images/templates/template-img-37.jpg"} alt={project.name || "Project"} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                           <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
                           <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-10">
                              <span className="inline-block text-[8px] sm:text-[9px] tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[#c8a96e] border border-[#c8a96e]/30 px-2 sm:px-3 py-1 rounded-full mb-3 sm:mb-4">
                                 {project.tag || 'Event'}
                              </span>
                              <h3 className="font-display font-light text-white mb-2" style={{ fontSize: project.nameFontSize ? `${project.nameFontSize}px` : 'clamp(1.5rem, 3vw, 2.25rem)' }}>
                                 {project.name}
                              </h3>
                              <p className="text-white/50 text-xs sm:text-sm" style={{ fontSize: project.descFontSize ? `${project.descFontSize}px` : undefined }}>
                                 {project.desc}
                              </p>
                              <div className="flex items-center gap-2 mt-3 sm:mt-4 text-[#c8a96e] text-[10px] sm:text-xs tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                                 <span>Explore</span><span>→</span>
                              </div>
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </section>

            {/* ── PLANNING PROCESS ─────────────────────────────────────────── */}
            <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden">
               <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#c8a96e]/20 to-transparent hidden lg:block" />
               <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-12 sm:mb-20">
                     <Reveal>
                        <span className="text-[10px] tracking-[0.5em] uppercase text-[#c8a96e] mb-4 block">How We Work</span>
                     </Reveal>
                     <Reveal delay={0.1}>
                        <h2 className="font-display font-light" style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}>The Planning Process</h2>
                     </Reveal>
                  </div>

                  <div className="space-y-0">
                     {process.map((step, idx) => (
                        <motion.div
                           key={idx}
                           className="flex gap-5 sm:gap-8 md:gap-16 items-start py-8 sm:py-12 border-b border-white/5 group"
                           initial={{ opacity: 0, x: 0 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }}
                           transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        >
                           <div className="shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-[#c8a96e]/30 flex items-center justify-center group-hover:bg-[#c8a96e] group-hover:border-[#c8a96e] transition-all duration-500">
                              <span className="font-display text-xs sm:text-sm font-light text-[#c8a96e] group-hover:text-black transition-colors">{step.step}</span>
                           </div>
                           <div className="flex-1">
                              <h3 className="font-display font-light text-white mb-2 sm:mb-4 group-hover:text-[#c8a96e] transition-colors"
                                 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.875rem)' }}>
                                 {step.title}
                              </h3>
                              <p className="text-white/40 leading-relaxed text-sm sm:text-base">{step.desc}</p>
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </section>

            {/* ── WHY CHOOSE US ────────────────────────────────────────────── */}
            <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 bg-[#111111] relative overflow-hidden">
               <div className="absolute inset-0 noise-bg opacity-50" />
               <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center relative z-10">
                  {/* Left: Big visual */}
                  <Reveal>
                     <div className="relative">
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                           {['/images/templates/template-img-36.jpg', '/images/templates/template-img-37.jpg',
                              '/images/templates/template-img-38.jpg', '/images/templates/template-img-39.jpg'].map((img, i) => (
                                 <div key={i} className={`relative rounded-xl overflow-hidden ${i === 0 ? 'aspect-[3/4]' : i === 3 ? 'aspect-[3/4]' : 'aspect-square'}`}>
                                    <Image src={img} alt="" fill className="object-cover" />
                                    {i === 1 && (
                                       <div className="absolute inset-0 bg-[#c8a96e]/10 flex items-center justify-center">
                                          <div className="text-center px-2">
                                             <p className="font-display text-3xl sm:text-5xl font-light text-[#c8a96e]"><AnimatedCounter target={20} suffix="k+" /></p>
                                             <p className="text-[9px] sm:text-xs text-white/50 tracking-[0.2em] uppercase mt-1">Guests Served</p>
                                          </div>
                                       </div>
                                    )}
                                 </div>
                              ))}
                        </div>
                     </div>
                  </Reveal>

                  {/* Right: Content */}
                  <div>
                     <Reveal delay={0.1}>
                        <span className="text-[10px] tracking-[0.5em] uppercase text-[#c8a96e] mb-4 block">Why Éclat</span>
                     </Reveal>
                     <Reveal delay={0.2}>
                        <h2 className="font-display font-light leading-tight mb-6 sm:mb-8"
                           style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}>
                           The Standard Others<br /><em className="text-[#c8a96e]">Aspire</em> To Match.
                        </h2>
                     </Reveal>
                     <Reveal delay={0.3}>
                        <p className="text-white/40 leading-relaxed mb-8 sm:mb-12 text-sm sm:text-base">We operate at the intersection of precision engineering and artistic expression — the rare combination that produces truly legendary events.</p>
                     </Reveal>

                     <div className="space-y-5 sm:space-y-6">
                        {reasons.map((r, i) => (
                           <motion.div
                              key={i}
                              className="flex gap-4 sm:gap-5 items-start group"
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.3 + i * 0.1 }}
                           >
                              <span className="text-[#c8a96e] mt-1 text-sm shrink-0">{r.icon}</span>
                              <div>
                                 <h4 className="font-medium text-white mb-1 group-hover:text-[#c8a96e] transition-colors text-sm sm:text-base">{r.title}</h4>
                                 <p className="text-white/40 text-xs sm:text-sm leading-relaxed">{r.desc}</p>
                              </div>
                           </motion.div>
                        ))}
                     </div>
                  </div>
               </div>
            </section>

            {/* ── PRICING ──────────────────────────────────────────────────── */}
            <section id="pricing" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full bg-[#c8a96e]/4 blur-3xl pointer-events-none" />

               <div className="max-w-7xl mx-auto relative z-10">
                  <div className="text-center mb-12 sm:mb-20">
                     <Reveal>
                        <span className="text-[10px] tracking-[0.5em] uppercase text-[#c8a96e] mb-4 block">Investment</span>
                     </Reveal>
                     <Reveal delay={0.1}>
                        <h2 className="font-display font-light" style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}>Pricing Packages</h2>
                     </Reveal>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                     {pricingPlans.map((plan, idx) => (
                        <motion.div
                           key={idx}
                           className={`relative rounded-2xl p-6 sm:p-8 md:p-10 border transition-all duration-500 ${plan.featured
                              ? 'bg-[#c8a96e] border-[#c8a96e] text-black sm:col-span-2 lg:col-span-1'
                              : 'bg-[#111111] border-white/10 text-white hover:border-[#c8a96e]/30'
                              }`}
                           initial={{ opacity: 0, y: 40 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: idx * 0.15 }}
                           whileHover={{ y: -8 }}
                        >
                           {plan.featured && (
                              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-[#c8a96e] text-[8px] sm:text-[9px] tracking-[0.3em] sm:tracking-[0.4em] uppercase px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-[#c8a96e]/30 whitespace-nowrap">
                                 Most Popular
                              </span>
                           )}
                           <h3 className={`font-display text-2xl sm:text-3xl font-light mb-2 ${plan.featured ? 'text-black' : 'text-white'}`}>{plan.name}</h3>
                           <div className="flex items-baseline gap-1 mb-1">
                              {plan.price !== 'Bespoke' && <span className={`text-base sm:text-lg ${plan.featured ? 'text-black/60' : 'text-white/40'}`}>$</span>}
                              <span className={`font-display text-4xl sm:text-5xl font-light ${plan.featured ? 'text-black' : 'text-[#c8a96e]'}`}>{plan.price}</span>
                           </div>
                           <span className={`text-xs tracking-[0.2em] uppercase ${plan.featured ? 'text-black/50' : 'text-white/30'}`}>{plan.unit}</span>

                           <div className={`my-6 sm:my-8 border-t ${plan.featured ? 'border-black/10' : 'border-white/8'}`} />

                           <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                              {plan.features.map((f, fi) => (
                                 <li key={fi} className={`flex items-center gap-3 text-xs sm:text-sm ${plan.featured ? 'text-black/70' : 'text-white/50'}`}>
                                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] shrink-0 ${plan.featured ? 'bg-black/10 text-black' : 'bg-[#c8a96e]/10 text-[#c8a96e]'}`}>✓</span>
                                    {f}
                                 </li>
                              ))}
                           </ul>

                           <button className={`w-full py-3 sm:py-3.5 text-xs sm:text-sm tracking-[0.12em] sm:tracking-[0.15em] uppercase font-medium transition-all duration-300 rounded-sm mobile-touch ${plan.featured
                              ? 'bg-black text-[#c8a96e] hover:bg-black/80'
                              : 'border border-[#c8a96e]/30 text-[#c8a96e] hover:bg-[#c8a96e] hover:text-black'
                              }`}>
                              {plan.price === 'Bespoke' ? 'Request Quote' : 'Get Started'}
                           </button>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </section>

            {/* ── TESTIMONIALS ─────────────────────────────────────────────── */}
            <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 bg-[#111111] relative overflow-hidden">
               <div className="absolute top-0 right-0 w-1/2 h-full opacity-5"
                  style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #c8a96e, transparent 70%)' }} />

               <div className="max-w-7xl mx-auto relative z-10">
                  <div className="text-center mb-12 sm:mb-20">
                     <Reveal>
                        <span className="text-[10px] tracking-[0.5em] uppercase text-[#c8a96e] mb-4 block">Client Stories</span>
                     </Reveal>
                     <Reveal delay={0.1}>
                        <h2 className="font-display font-light" style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}>What Clients Say</h2>
                     </Reveal>
                  </div>

                  <div className="relative">
                     <AnimatePresence mode="wait">
                        <motion.div
                           key={activeTestimonial}
                           className="max-w-4xl mx-auto text-center px-2 sm:px-0"
                           initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}
                           transition={{ duration: 0.5 }}
                        >
                           <span className="font-display text-6xl sm:text-8xl text-[#c8a96e]/20 leading-none block mb-2 sm:mb-4">"</span>
                           <p className="font-display text-xl sm:text-2xl md:text-3xl font-light text-white/80 leading-relaxed mb-8 sm:mb-10 italic">
                              {testimonials[activeTestimonial % testimonials.length]?.quote}
                           </p>
                           <div className="flex items-center justify-center gap-3 sm:gap-4">
                              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-[#c8a96e]/30 shrink-0">
                                 <Image src={testimonials[activeTestimonial % testimonials.length]?.avatar || '/images/templates/template-img-11.jpg'} alt="" fill className="object-cover" />
                              </div>
                              <div className="text-left">
                                 <p className="font-medium text-white text-sm">{testimonials[activeTestimonial % testimonials.length]?.name}</p>
                                 <p className="text-[#c8a96e] text-xs tracking-[0.1em]">{testimonials[activeTestimonial % testimonials.length]?.title}</p>
                              </div>
                           </div>
                        </motion.div>
                     </AnimatePresence>

                     {/* Dots */}
                     <div className="flex justify-center gap-2 mt-8 sm:mt-12">
                        {testimonials.map((_, i) => (
                           <button key={i} onClick={() => setActiveTestimonial(i)}
                              className={`h-px transition-all duration-300 mobile-touch ${i === activeTestimonial ? 'w-10 sm:w-12 bg-[#c8a96e]' : 'w-3 sm:w-4 bg-white/20 hover:bg-white/40'}`}
                           />
                        ))}
                     </div>
                  </div>

                  {/* All testimonial cards below */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-12 sm:mt-16">
                     {testimonials.map((t, i) => (
                        <motion.div
                           key={i}
                           className={`p-4 sm:p-6 rounded-xl border cursor-pointer transition-all duration-300 ${i === activeTestimonial ? 'border-[#c8a96e]/50 bg-[#c8a96e]/5' : 'border-white/5 hover:border-white/15'}`}
                           onClick={() => setActiveTestimonial(i)}
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: i * 0.1 }}
                        >
                           <div className="flex items-center gap-3 mb-3 sm:mb-4">
                              <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-white/10 shrink-0">
                                 <Image src={t.avatar} alt="" fill className="object-cover" />
                              </div>
                              <div className="min-w-0">
                                 <p className="text-xs font-medium text-white truncate">{t.name}</p>
                                 <p className="text-[10px] text-[#c8a96e]/60 truncate">{t.title.split(',')[1]?.trim() || t.title}</p>
                              </div>
                           </div>
                           <p className="text-xs text-white/40 leading-relaxed line-clamp-3">{t.quote}</p>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </section>

            {/* ── TEAM ──────────────────────────────────────────────────────── */}
            <section id="team" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden">
               <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-12 sm:mb-20">
                     <Reveal>
                        <span className="text-[10px] tracking-[0.5em] uppercase text-[#c8a96e] mb-4 block">The Team</span>
                     </Reveal>
                     <Reveal delay={0.1}>
                        <h2 className="font-display font-light" style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}>
                           Meet the Architects<br /><em className="text-[#c8a96e]">of Excellence</em>
                        </h2>
                     </Reveal>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                     {team.map((member, idx) => (
                        <motion.div
                           key={idx}
                           className="group cursor-default"
                           initial={{ opacity: 0, y: 30 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: idx * 0.1 }}
                        >
                           <div className="relative overflow-hidden rounded-xl sm:rounded-2xl aspect-[3/4] mb-3 sm:mb-5">
                              <Image src={member.img} alt={member.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                 <p className="text-[10px] sm:text-xs text-[#c8a96e] tracking-[0.15em] sm:tracking-[0.2em] uppercase">{member.spec}</p>
                              </div>
                           </div>
                           <h3 className="font-display text-lg sm:text-xl font-light text-white group-hover:text-[#c8a96e] transition-colors">{member.name}</h3>
                           <p className="text-[10px] sm:text-xs text-white/40 tracking-[0.12em] sm:tracking-[0.15em] uppercase mt-1">{member.role}</p>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </section>

            {/* ── GALLERY ───────────────────────────────────────────────────── */}
            <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 bg-[#111111] relative overflow-hidden">
               <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-12 sm:mb-20">
                     <Reveal>
                        <span className="text-[10px] tracking-[0.5em] uppercase text-[#c8a96e] mb-4 block">Visual Journey</span>
                     </Reveal>
                     <Reveal delay={0.1}>
                        <h2 className="font-display font-light" style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}>Event Gallery</h2>
                     </Reveal>
                  </div>

                  <div className="columns-2 md:columns-3 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
                     {galleryImgs.map((img, idx) => (
                        <motion.div
                           key={idx}
                           className="relative overflow-hidden rounded-xl cursor-pointer group break-inside-avoid"
                           initial={{ opacity: 0 }}
                           whileInView={{ opacity: 1 }}
                           viewport={{ once: true }}
                           transition={{ delay: idx * 0.07 }}
                           onClick={() => setLightbox({ src: img, alt: `Gallery ${idx + 1}` })}
                           whileHover={{ scale: 1.02 }}
                        >
                           <Image src={img} alt={`Gallery ${idx + 1}`} width={600} height={idx % 3 === 0 ? 800 : 500}
                              className="object-cover w-full" />
                           <div className="absolute inset-0 bg-[#c8a96e]/0 group-hover:bg-[#c8a96e]/10 transition-all duration-300 flex items-center justify-center">
                              <span className="text-white text-xl sm:text-2xl opacity-0 group-hover:opacity-100 transition-opacity">⊕</span>
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </section>

            {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}

            {/* ── FAQ ───────────────────────────────────────────────────────── */}
            <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden">
               <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-12 sm:mb-20">
                     <Reveal>
                        <span className="text-[10px] tracking-[0.5em] uppercase text-[#c8a96e] mb-4 block">Common Questions</span>
                     </Reveal>
                     <Reveal delay={0.1}>
                        <h2 className="font-display font-light" style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}>Frequently Asked</h2>
                     </Reveal>
                  </div>

                  <div className="space-y-2">
                     {faqs.map((faq, idx) => (
                        <motion.div
                           key={idx}
                           className="border border-white/8 rounded-xl overflow-hidden"
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: idx * 0.08 }}
                        >
                           <button
                              className="w-full flex items-center justify-between px-5 sm:px-8 py-4 sm:py-6 text-left hover:bg-white/3 transition-colors group mobile-touch"
                              onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                           >
                              <span className={`font-display text-lg sm:text-xl font-light transition-colors pr-4 ${activeFaq === idx ? 'text-[#c8a96e]' : 'text-white group-hover:text-white/80'}`}>{faq.q}</span>
                              <motion.span
                                 animate={{ rotate: activeFaq === idx ? 45 : 0 }}
                                 className={`text-xl shrink-0 transition-colors ${activeFaq === idx ? 'text-[#c8a96e]' : 'text-white/30'}`}
                              >+</motion.span>
                           </button>
                           <AnimatePresence>
                              {activeFaq === idx && (
                                 <motion.div
                                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                    className="overflow-hidden"
                                 >
                                    <p className="px-5 sm:px-8 pb-5 sm:pb-8 text-white/45 leading-relaxed text-sm sm:text-base">{faq.a}</p>
                                 </motion.div>
                              )}
                           </AnimatePresence>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </section>

            {/* ── CONTACT ───────────────────────────────────────────────────── */}
            <section id="contact" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 bg-[#111111] relative overflow-hidden">
               <div className="absolute inset-0 noise-bg" />
               <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#c8a96e]/3 to-transparent" />

               <div className="max-w-7xl mx-auto relative z-10">
                  <div className="max-w-2xl">
                     {/* Left */}
                     <div>
                        <Reveal>
                           <span className="text-[10px] tracking-[0.5em] uppercase text-[#c8a96e] mb-4 block">Let's Create Together</span>
                        </Reveal>
                        <Reveal delay={0.1}>
                           <h2 className="font-display font-light leading-tight mb-6 sm:mb-8"
                              style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}>
                              Begin Your<br /><em className="text-[#c8a96e]">Extraordinary</em><br />Event Journey.
                           </h2>
                        </Reveal>
                        <Reveal delay={0.2}>
                           <p className="text-white/40 leading-relaxed mb-8 sm:mb-12 max-w-md text-sm sm:text-base">
                              Whether you're envisioning an intimate celebration or a global production, our team is ready to transform your vision into an unforgettable reality.
                           </p>
                        </Reveal>

                        <div className="space-y-5 sm:space-y-6">
                           {[
                              { label: 'Call Us', value: displayPhone, icon: '○' },
                              { label: 'Email Us', value: contactEmail || 'hello@eclat-events.com', icon: '◇' },
                              { label: 'Our Office', value: address || '12 Rue de Prestige, Paris · New York · Dubai', icon: '◈' },
                           ].map((item, i) => (
                              <Reveal key={i} delay={0.25 + i * 0.1}>
                                 <div className="flex items-start gap-4 group">
                                    <span className="text-[#c8a96e] mt-1 shrink-0">{item.icon}</span>
                                    <div className="min-w-0">
                                       <span className="text-[10px] tracking-[0.3em] uppercase text-white/25 block mb-1">{item.label}</span>
                                       <span className="text-white/70 group-hover:text-[#c8a96e] transition-colors text-sm sm:text-base break-words">{item.value}</span>
                                    </div>
                                 </div>
                              </Reveal>
                           ))}
                        </div>

                        {/* Social links */}
                        <Reveal delay={0.6}>
                           <div className="flex flex-wrap gap-4 sm:gap-6 mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-white/8">
                              {['Instagram', 'LinkedIn', 'Behance', 'Pinterest'].map(s => (
                                 <button key={s} className="text-[10px] tracking-[0.2em] uppercase text-white/30 hover:text-[#c8a96e] transition-colors mobile-touch">{s}</button>
                              ))}
                           </div>
                        </Reveal>
                     </div>


                  </div>
               </div>
            </section>

            {/* ── FOOTER ─────────────────────────────────────────────────────── */}
            <footer className="bg-[#0a0a0a] border-t border-white/5 pt-12 sm:pt-20 pb-8 sm:pb-10 px-4 sm:px-6">
               <div className="max-w-7xl mx-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-16">
                     {/* Brand */}
                     <div className="sm:col-span-2">
                        <span className="font-display text-2xl sm:text-3xl font-light text-white tracking-[0.1em] block mb-3 sm:mb-4">{displayAgency}</span>
                        <p className="text-white/30 text-sm leading-relaxed max-w-sm italic font-display">
                           Turning ambitious visions into seamless realities through precision management and creative artistry.
                        </p>
                        <div className="flex gap-3 sm:gap-4 mt-6 sm:mt-8">
                           {['IG', 'LI', 'BE', 'PT'].map(s => (
                              <button key={s} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/10 text-[10px] text-white/30 hover:border-[#c8a96e] hover:text-[#c8a96e] transition-all mobile-touch flex items-center justify-center">
                                 {s}
                              </button>
                           ))}
                        </div>
                     </div>

                     {/* Contact */}
                     <div>
                        <h5 className="text-[10px] tracking-[0.4em] uppercase text-[#c8a96e] mb-4 sm:mb-6">Contact</h5>
                        <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-white/40">
                           <p className="break-words">{displayPhone}</p>
                           <p className="break-words">{contactEmail || 'hello@eclat-events.com'}</p>
                        </div>
                     </div>

                     {/* Location */}
                     <div>
                        <h5 className="text-[10px] tracking-[0.4em] uppercase text-[#c8a96e] mb-4 sm:mb-6">Headquarters</h5>
                        <p className="text-xs sm:text-sm text-white/40 leading-relaxed">{address || '12 Rue de Prestige\nParis · New York · Dubai'}</p>
                     </div>
                  </div>

                  <div className="pt-6 sm:pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white/20">
                     <span className="text-center sm:text-left">{footerCopyright || `© ${new Date().getFullYear()} ${displayAgency}. All rights reserved.`}</span>
                     <div className="flex gap-4 sm:gap-6">
                        {['Privacy', 'Terms', 'Cookies'].map(l => (
                           <button key={l} className="hover:text-[#c8a96e] transition-colors mobile-touch">{l}</button>
                        ))}
                     </div>
                  </div>
               </div>
            </footer>

         </div>
      </TemplateLayout>
   );
}