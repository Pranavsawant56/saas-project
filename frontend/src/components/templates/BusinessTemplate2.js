'use client';

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import TemplateLayout from "./TemplateLayout";

export default function BusinessTemplate2({ data }) {
 const [scrolled, setScrolled] = useState(false);
 const [activeTab, setActiveTab] = useState("Home");
 const [activeFaq, setActiveFaq] = useState(null);
 const [mousePosHero, setMousePosHero] = useState({ x: 0, y: 0 });
 const [mousePosBento, setMousePosBento] = useState({ x: 0, y: 0 });
 const [focusedInput, setFocusedInput] = useState(null);
 
 // Destructure dynamic editor data safely
 const {
 companyName, heroTitle, tagline, heroImage, aboutUsTitle, aboutUsContent, aboutUsImage,
 headerType, logoUrl, address, contactEmail, email, phone, facebookUrl, twitterUrl, linkedinUrl,
 companyNameFontSize, heroTitleFontSize, taglineFontSize,
 aboutUsTitleFontSize, aboutUsContentFontSize,
 services, features, portfolio, team, testimonials, pricing, faq, blog,
 ctaTitle, ctaDesc, ctaButtonLink, ctaButtonText,
 footerDescription, newsletterTitle, newsletterDesc, footerCopyright,
 countryCode,
 } = data || {};

 // Standard safe rendering helper
 const safeRender = (value, fallback) => {
 if (value === undefined || value === null || value === "") return fallback;
 if (typeof value === 'string' && value.trim() === "") return fallback;
 return value;
 };

 const isValidImageUrl = (url) => {
 if (!url) return false;
 if (typeof url !== 'string') return false;
 const clean = url.trim();
 if (clean === "") return false;
 return clean.startsWith('data:image/') || clean.startsWith('/') || clean.startsWith('http');
 };

 const displayName = safeRender(companyName, "Aether");
 const displayPhone = phone ? `${countryCode ? countryCode.split(' ')[0] : ''} ${phone}` : phone;
 const displayEmail = safeRender(contactEmail || email, "hello@aetherlabs.io");
 const displayLocation = safeRender(address, "Silicon Valley, CA");

 // Track window scroll to shrink and darken floating glass navbar
 useEffect(() => {
 const handleScroll = () => {
 setScrolled(window.scrollY > 20);
 };
 window.addEventListener("scroll", handleScroll);
 return () => window.removeEventListener("scroll", handleScroll);
 }, []);

 // Tracking mouse positions for premium interactive glow effects
 const handleMouseMoveHero = (e) => {
 const rect = e.currentTarget.getBoundingClientRect();
 setMousePosHero({
 x: e.clientX - rect.left,
 y: e.clientY - rect.top
 });
 };

 const handleMouseMoveBento = (e) => {
 const rect = e.currentTarget.getBoundingClientRect();
 setMousePosBento({
 x: e.clientX - rect.left,
 y: e.clientY - rect.top
 });
 };

 // Apple-inspired easing curve
 const easeTransition = { duration: 1.2, ease: [0.22, 1, 0.36, 1] };
 
 const fadeUp = {
 hidden: { opacity: 0, y: 30 },
 visible: { opacity: 1, y: 0, transition: easeTransition }
 };

 const blurReveal = {
 hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
 visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: easeTransition }
 };

 const staggerContainer = {
 hidden: {},
 visible: { transition: { staggerChildren: 0.12 } }
 };

 // High-end fallback databases to guarantee dynamic values always look professional
 const displayServices = useMemo(() => {
 if (services && Array.isArray(services) && services.length > 0 && services.some(s => s.name || s.desc)) {
 return services;
 }
 return [
 { name: 'Cognitive Architecture', desc: 'Deploying neural agents and self-learning systems tailored for hyper-scale automation.' },
 { name: 'Quantum Data Science', desc: 'Analyzing complex multi-variable parameters via cloud computing pipelines.' },
 { name: 'Synthetic Operations', desc: 'Creating zero-latency digital twins to predict market shifts before they happen.' },
 { name: 'Immersive Interfaces', desc: 'Designing award-winning Web3 spatial interfaces for standard high-end corporate suites.' }
 ];
 }, [services]);

 const displayFeatures = useMemo(() => {
 if (features && Array.isArray(features) && features.length > 0) {
 return features;
 }
 return [
 { title: 'Zero Latency Analytics', desc: 'Execute multi-million pipeline data transformations in milliseconds with edge nodes.' },
 { title: 'Military-Grade Encryption', desc: 'Secure high-end client assets through post-quantum cryptography algorithms.' },
 { title: 'Autonomous Scaling', desc: 'Automate containerized microservices dynamically based on predictive traffic spikes.' }
 ];
 }, [features]);

 const displayProjects = useMemo(() => {
 if (portfolio && Array.isArray(portfolio) && portfolio.length > 0) {
 return portfolio;
 }
 return [
 { title: 'Nova Platform', desc: 'Artificial Intelligence Dashboard', image: '/images/templates/template-img-10.jpg', link: '#' },
 { title: 'Vortex Protocol', desc: 'Holographic Network Node', image: '/images/templates/template-img-11.jpg', link: '#' },
 { title: 'Helios Protocol', desc: 'Spatial Web Interface', image: '/images/templates/template-img-12.jpg', link: '#' }
 ];
 }, [portfolio]);

 const displayTeam = useMemo(() => {
 if (team && Array.isArray(team) && team.length > 0) {
 return team;
 }
 return [
 { name: 'Marcus Sterling', role: 'Founder / CEO', bio: 'Former Lead System Architect at NASA. Pioneer in neural grid structures.', image: '/images/templates/template-img-13.jpg' },
 { name: 'Dr. Evelyn Vance', role: 'Head of AI Core', bio: 'Stanford Ph.D. specialized in algorithmic cognitive models and synthetic twins.', image: '/images/templates/template-img-14.jpg' },
 { name: 'Kaelen Voss', role: 'Creative Director', bio: 'Award-winning digital interaction designer. Former lead at Cuberto.', image: '/images/templates/template-img-15.jpg' },
 { name: 'Seraphina Thorne', role: 'Chief of Infrastructure', bio: 'Former Senior Director at Vercel. Expert in globally distributed cloud nodes.', image: '/images/templates/template-img-16.jpg' }
 ];
 }, [team]);

 const displayTestimonials = useMemo(() => {
 if (testimonials && Array.isArray(testimonials) && testimonials.length > 0) {
 return testimonials;
 }
 return [
 { name: 'Sarah Jenkins', role: 'VP of Technology, Stripe', review: 'Aether reconstructed our predictive routing layer. The latency drop was instant and highly scalable.', image: '/images/templates/template-img-17.jpg' },
 { name: 'Devon Takahashi', role: 'Chief Architect, Linear', review: 'Their synthetic twin modelling saved us months of simulation time. A world-class cognitive framework.', image: '/images/templates/template-img-18.jpg' },
 { name: 'Elena Rostova', role: 'Lead Director, Vercel Labs', review: 'An immaculate aesthetic sense combined with uncompromising architectural execution. Outstanding partners.', image: '/images/templates/template-img-19.jpg' }
 ];
 }, [testimonials]);

 const displayPricing = useMemo(() => {
 if (pricing && Array.isArray(pricing) && pricing.length > 0) {
 return pricing;
 }
 return [
 { planName: 'Initiate Core', price: '$2,400', features: 'Neural nodes execution, Edge CDN integration, Basic analytics, Custom SVG endpoints', buttonText: 'Deploy Initiate' },
 { planName: 'Quantum Enterprise', price: '$8,500', features: 'Unlimited dynamic agents, Quantum ledger secure log, Predictor engine active, SLA guarantee, 24/7 dedicated support team', buttonText: 'Scale Up Now' },
 { planName: 'Cognitive Custom', price: 'Custom Quote', features: 'Fully sandboxed architecture, Customized AI model training, Infinite database clustering, Dedicated system architect', buttonText: 'Inquire Scope' }
 ];
 }, [pricing]);

 const displayFaq = useMemo(() => {
 if (faq && Array.isArray(faq) && faq.length > 0) {
 return faq;
 }
 return [
 { question: 'How does the predictive analytics module integrate with our existing stack?', answer: 'Our Edge API interfaces cleanly with standard corporate databases. It utilizes zero-latency WebSockets to stream synthetic twin telemetry directly into your cloud pipeline.' },
 { question: 'What security standards does the Cognitive Node adhere to?', answer: 'We secure client operations using end-to-end post-quantum cryptographic systems alongside isolated sandboxed containers.' },
 { question: 'Can we build custom neural agents for specialized company operations?', answer: 'Absolutely. The Quantum Enterprise plan provides dedicated computing sandboxes to train, compile, and run bespoke machine learning weights.' }
 ];
 }, [faq]);

 const displayBlog = useMemo(() => {
 if (blog && Array.isArray(blog) && blog.length > 0) {
 return blog;
 }
 return [
 { title: 'The Next Epoch: Algorithmic Synthetics in Enterprise Scaling', date: 'May 18, 2026', excerpt: 'How decentralized networks are utilizing spatial nodes to simulate real-time supply chain vulnerabilities.', image: '/images/templates/template-img-21.jpg', link: '#' },
 { title: 'Quantum Encryption Standards: Preparing Your Business Core', date: 'April 22, 2026', excerpt: 'A strict guide on securing enterprise databases against upcoming decentralized decryption algorithms.', image: '/images/templates/template-img-22.jpg', link: '#' },
 { title: 'Designing for the Future: Intuitive UX in Spatial Interfaces', date: 'March 11, 2026', excerpt: 'Exploring key principles of visual restraint, typography, and interactive responsive cues.', image: '/images/templates/template-img-23.jpg', link: '#' }
 ];
 }, [blog]);

 return (
 <TemplateLayout data={data} theme="dark" category="Business" hideHeader={true} hideFooter={true}>
 <div className="bg-[#000000] text-[#FFFFFF] font-sans selection:bg-[#0071E3] selection:text-white min-h-screen relative overflow-x-hidden antialiased">
 
 {/* Minimal Premium Noise Texture */}
 <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.015] mix-blend-overlay" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png")' }}></div>

 {/* Sophisticated Ambient Gradient Orbs - Very Subtle */}
 <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#0071E3]/8 to-transparent blur-[150px] pointer-events-none" />
 <div className="absolute top-[30%] right-[-200px] w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-[#5E5CE6]/6 to-transparent blur-[180px] pointer-events-none" />
 <div className="absolute bottom-[10%] left-[-100px] w-[700px] h-[700px] rounded-full bg-[#0071E3]/5 blur-[160px] pointer-events-none" />

 {/* Premium Scroll Progress Indicator */}
 <motion.div
 className="fixed top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-[#0071E3] via-[#5E5CE6] to-transparent z-50 origin-left"
 style={{
 scaleX: scrolled ? undefined : 0,
 transition: "scale-x 0.3s ease-out"
 }}
 />

 {/* 1. Header - Floating Premium Glass Navbar */}
 <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-8">
 <nav className={`mx-auto max-w-5xl rounded-2xl border border-white/[0.08] backdrop-blur-2xl bg-[#0A0A0A]/50 flex justify-between items-center transition-all duration-500 px-6 sm:px-8 ${scrolled ? 'py-3 shadow-2xl shadow-black/40 mt-1 max-w-4xl border-white/[0.08] bg-[#0A0A0A]/80 shadow-xl' : 'py-5'}`}>
 
 {/* Premium Logo / Branding */}
 <div className="flex items-center gap-3">
 {headerType === "Image" ? (
 isValidImageUrl(logoUrl) ? (
 <div className="relative h-8 w-28">
 <Image src={logoUrl} alt={displayName} fill className="object-contain object-left" />
 </div>
 ) : (
 <div className="flex items-center gap-2">
 <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0071E3] to-[#5E5CE6] flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-[#0071E3]/20">
 {displayName[0]}
 </span>
 <span className="font-semibold tracking-tight text-base">{displayName}</span>
 </div>
 )
 ) : (
 <a href="#home" className="flex items-center gap-2 group">
 <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0071E3] to-[#5E5CE6] flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-[#0071E3]/20 group-hover:scale-105 transition-transform duration-300">
 {displayName[0]}
 </span>
 <span 
 className="font-semibold tracking-tight text-base text-white group-hover:text-[#0071E3] transition-colors duration-300"
 style={{ fontSize: companyNameFontSize ? `clamp(14px, 3vw, ${companyNameFontSize}px)` : undefined }}
 >
 {displayName}
 </span>
 </a>
 )}
 </div>

 {/* Desktop Navigation Links */}
 <div className="hidden md:flex items-center gap-8">
 {['About', 'Services', 'Portfolio', 'Pricing', 'Contact'].map((item) => (
 <a 
 key={item} 
 href={`#${item.toLowerCase()}`}
 onClick={() => setActiveTab(item)}
 className={`text-[11px] font-semibold uppercase tracking-wider transition-all hover:text-white relative py-1 ${activeTab === item ? 'text-white' : 'text-[#A1A1AA]'}`}
 >
 {item}
 {activeTab === item && (
 <motion.span 
 layoutId="navGlow" 
 className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#0071E3]"
 transition={easeTransition}
 />
 )}
 </a>
 ))}
 </div>

 {/* Action CTA Button */}
 <div className="flex items-center gap-4">
 <a 
 href="#contact" 
 className="hidden sm:inline-flex items-center justify-center text-[11px] font-semibold uppercase tracking-wide bg-white text-[#000000] px-6 py-2.5 rounded-full hover:bg-[#0071E3] hover:text-white transition-all duration-500 shadow-lg hover:shadow-[#0071E3]/30 active:scale-95"
 >
 Get Started
 </a>

 {/* Minimal Hamburger */}
 <button 
 onClick={() => setActiveTab(activeTab === "Menu" ? "Home" : "Menu")}
 className="md:hidden flex flex-col gap-1.5 w-6 h-6 justify-center items-end"
 aria-label="Toggle Menu"
 >
 <span className={`h-[1.5px] bg-white transition-all duration-300 ${activeTab === "Menu" ? 'w-5 rotate-45 translate-y-[4px]' : 'w-5'}`} />
 <span className={`h-[1.5px] bg-white transition-all duration-300 ${activeTab === "Menu" ? 'w-0 opacity-0' : 'w-3'}`} />
 <span className={`h-[1.5px] bg-white transition-all duration-300 ${activeTab === "Menu" ? 'w-5 -rotate-45 -translate-y-[3px]' : 'w-4'}`} />
 </button>
 </div>
 </nav>
 </header>

 {/* Mobile Navigation Drawer */}
 <AnimatePresence>
 {activeTab === "Menu" && (
 <motion.div 
 initial={{ opacity: 0, y: -20 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -20 }}
 transition={{ duration: 0.4 }}
 className="fixed inset-x-0 top-[72px] z-40 px-4 md:hidden"
 >
 <div className="bg-[#0A0A0A]/95 border border-white/[0.08] backdrop-blur-2xl rounded-2xl p-8 flex flex-col gap-6 shadow-2xl">
 <div className="flex flex-col gap-4 text-center">
 {['About', 'Services', 'Portfolio', 'Pricing', 'Contact'].map((item) => (
 <a
 key={item}
 href={`#${item.toLowerCase()}`}
 onClick={() => setActiveTab(item)}
 className="text-base font-semibold uppercase tracking-wider text-[#A1A1AA] hover:text-white transition-colors py-2 border-b border-white/[0.08] last:border-none"
 >
 {item}
 </a>
 ))}
 </div>
 <a 
 href="#contact" 
 onClick={() => setActiveTab("Contact")}
 className="w-full text-center py-3 bg-gradient-to-r from-[#0071E3] to-[#5E5CE6] rounded-full text-xs font-semibold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all"
 >
 Get Started
 </a>
 </div>
 </motion.div>
 )}
 </AnimatePresence>


 <main>

 {/* 2. Hero Section (The Cinematic Split WOW) */}
 <section 
 id="home" 
 onMouseMove={handleMouseMoveHero}
 className="relative min-h-screen pt-36 md:pt-48 pb-20 px-8 flex items-center justify-center overflow-hidden border-b border-white/[0.08]"
 >
 {/* Interactive Mouse Follow Glow Orbg (Behind hero stack) */}
 <div 
 className="absolute pointer-events-none opacity-40 blur-[130px] bg-[#0071E3]/15 w-[380px] h-[380px] rounded-full transition-transform duration-[0.4s] ease-out hidden lg:block"
 style={{
 left: mousePosHero.x - 190,
 top: mousePosHero.y - 190
 }}
 />

 <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center relative z-10">
 
 {/* Left Side: Vertical typography headline stack */}
 <motion.div 
 initial="hidden"
 animate="visible"
 variants={staggerContainer}
 className="lg:col-span-6 flex flex-col items-start text-left"
 >
 <motion.div 
 variants={blurReveal}
 className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0A84FF]/10 to-[#5E5CE6]/10 border border-[#0071E3]/30 rounded-full text-xs font-black uppercase tracking-widest text-[#0071E3] mb-8 shadow-inner shadow-[#0071E3]/5"
 >
 <span className="w-1.5 h-1.5 bg-[#0071E3] rounded-full animate-ping" />
 Redefining Digital Synthesis
 </motion.div>

 <motion.h1 
 variants={blurReveal}
 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tight"
 style={{ fontSize: heroTitleFontSize ? `clamp(32px, 8vw, ${heroTitleFontSize}px)` : undefined }}
 >
 <span className="block text-white">Scale Your</span>
 <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#5E5CE6] font-sans tracking-tight">
 {heroTitle ? safeRender(heroTitle, "Aether Legacy") : "Aether Legacy"}
 </span>
 </motion.h1>

 <motion.p 
 variants={blurReveal}
 className="text-[#A1A1AA] text-base md:text-lg leading-relaxed max-w-lg mb-10 pl-6 border-l-[2.5px] border-[#0071E3]/40 font-light "
 style={{ fontSize: taglineFontSize ? `clamp(12px, 2.5vw, ${taglineFontSize}px)` : undefined }}
 >
 {safeRender(tagline, "We construct autonomous edge network pipelines, zero-latency synthetic twin analytics, and premium immersive design models to disrupt enterprise scale.")}
 </motion.p>

 <motion.div 
 variants={blurReveal}
 className="flex flex-wrap gap-5"
 >
 <a 
 href="#contact" 
 className="px-8 py-4 bg-[#0071E3] text-white text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-gradient-to-r hover:from-[#0A84FF] hover:to-[#5E5CE6] transition-all duration-500 shadow-2xl hover:shadow-[#0071E3]/40 group flex items-center gap-3"
 >
 Deploy Engine <span className="group-hover:translate-x-1.5 transition-transform duration-300 font-bold">→</span>
 </a>
 <a 
 href="#about" 
 className="px-8 py-4 bg-white/[0.04] text-white text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-white/10 border border-white/[0.08] transition-all flex items-center gap-2"
 >
 Explore Core
 </a>
 </motion.div>

 {/* Trust/Metric Indicator */}
 <motion.div 
 variants={blurReveal}
 className="mt-12 pt-8 border-t border-white/[0.08] flex gap-8 text-[#A1A1AA] text-[10px] font-bold uppercase tracking-wider"
 >
 <div>
 <span className="text-white text-base font-black block tracking-tight mb-1">99.98%</span>
 Operational Uptime
 </div>
 <div>
 <span className="text-white text-base font-black block tracking-tight mb-1">100M+</span>
 Pipeline Syncs / Day
 </div>
 </motion.div>
 </motion.div>

 {/* Right Side: Layered interactive glass dashboard widgets */}
 <motion.div 
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ duration: 1.5, ease: "easeOut" }}
 className="lg:col-span-6 relative aspect-square flex items-center justify-center"
 >
 {/* Background holographic grid system */}
 <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none rounded-[3rem]" />
 
 {/* Visual gradient orb */}
 <div className="absolute w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-[#0A84FF]/20 to-[#5E5CE6]/20 blur-[90px] animate-pulse duration-[8s]" />

 {/* Floating Widget 1: SVG Analytic Growth Wave Graph */}
 <motion.div 
 animate={{ y: [0, -10, 0] }}
 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
 className="absolute w-[90%] sm:w-[380px] p-6 rounded-3xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl shadow-2xl shadow-black/50 z-20 left-4 top-8"
 >
 <div className="flex justify-between items-center mb-6">
 <div>
 <span className="text-[10px] font-black uppercase tracking-widest text-[#A1A1AA]">Compute Flow</span>
 <h4 className="text-2xl font-black font-mono mt-1 tracking-tight">742.8 GB/s</h4>
 </div>
 <span className="px-2.5 py-1 rounded bg-[#0071E3]/10 text-[#0071E3] text-[9px] font-mono tracking-widest uppercase">Live Nodes</span>
 </div>
 {/* SVG Wave */}
 <svg className="w-full h-32 text-[#0071E3]" viewBox="0 0 100 30">
 <defs>
 <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
 <stop offset="0%" stopColor="#0071E3" stopOpacity="0.4" />
 <stop offset="100%" stopColor="#0071E3" stopOpacity="0" />
 </linearGradient>
 </defs>
 <path 
 d="M0 25 C10 20, 20 28, 30 22 C40 16, 50 24, 60 18 C70 12, 80 20, 90 10 L100 12 L100 30 L0 30 Z" 
 fill="url(#waveGrad)" 
 />
 <motion.path 
 d="M0 25 C10 20, 20 28, 30 22 C40 16, 50 24, 60 18 C70 12, 80 20, 90 10 L100 12" 
 fill="transparent" 
 stroke="#0071E3" 
 strokeWidth="1"
 initial={{ pathLength: 0 }}
 animate={{ pathLength: 1 }}
 transition={{ duration: 2, ease: "easeInOut" }}
 />
 </svg>
 <div className="flex justify-between items-center text-[8px] font-mono tracking-widest text-[#A1A1AA]/60 mt-4 border-t border-white/[0.08] pt-3">
 <span>NODE A: ACTIVE</span>
 <span>100% SECURE GRID</span>
 </div>
 </motion.div>

 {/* Floating Widget 2: Security Cluster Status */}
 <motion.div 
 animate={{ y: [0, 8, 0] }}
 transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
 className="absolute w-[180px] p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl shadow-2xl z-30 right-4 top-1/3"
 >
 <div className="flex items-center gap-2 mb-4">
 <span className="w-2.5 h-2.5 bg-[#0071E3] rounded-full animate-ping" />
 <span className="text-[9px] font-black uppercase tracking-widest text-white">Quantum Core</span>
 </div>
 <div className="space-y-2.5">
 <div className="flex justify-between text-[8px] font-mono text-[#A1A1AA]">
 <span>GRID STATUS</span>
 <span className="text-white">OPTIMAL</span>
 </div>
 <div className="w-full bg-white/[0.04] h-[3px] rounded-full overflow-hidden">
 <div className="bg-[#0071E3] w-[88%] h-full rounded-full" />
 </div>
 <div className="flex justify-between text-[8px] font-mono text-[#A1A1AA]">
 <span>DECRYPT SEC</span>
 <span className="text-white">0.02ms</span>
 </div>
 </div>
 </motion.div>

 {/* Floating Widget 3: Live Image Stack */}
 <motion.div 
 animate={{ y: [0, -6, 0] }}
 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
 className="absolute w-[75%] sm:w-[320px] aspect-video rounded-3xl overflow-hidden border border-white/[0.08] z-10 bottom-6 right-8 shadow-2xl shadow-black/40"
 >
 <Image
 src={isValidImageUrl(heroImage) ? heroImage : "/images/templates/template-img-24.jpg"}
 alt="Atmospheric enterprise core visualization"
 fill
 className="object-cover sepia-[0.1] contrast-[1.05]"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-[#060816] via-transparent to-transparent opacity-80" />
 <div className="absolute bottom-4 left-6">
 <span className="text-[8px] font-black tracking-widest text-[#0071E3] uppercase block mb-1">Aether Cluster</span>
 <h5 className="text-sm font-bold tracking-tight font-sans tracking-tight">Simulated Synthetic Grid</h5>
 </div>
 </motion.div>
 </motion.div>

 </div>
 </section>

 {/* 3. About Section (Story-driven Asymmetrical Grid) */}
 <section id="about" className="py-24 px-8 bg-[#0A0A0A] relative overflow-hidden border-b border-white/[0.08] scroll-mt-24">
 <div className="max-w-7xl mx-auto relative z-10">
 
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
 
 {/* Left Side: Overlapping floating image card stack */}
 <div className="lg:col-span-5 relative group">
 <div className="relative w-full aspect-[4/5] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl z-10 border border-white/[0.08] shadow-black/40">
 <Image
 src={isValidImageUrl(aboutUsImage) ? aboutUsImage : "/images/templates/template-img-1.jpg"}
 alt="Aether strategic operation core"
 fill
 className="object-cover grayscale hover:grayscale-0 transition-all duration-[1.5s]"
 />
 </div>
 {/* Backdrop glass decoration */}
 <div className="absolute -inset-4 border border-[#0071E3]/20 rounded-[3rem] md:rounded-[4.5rem] -rotate-3 transition-transform group-hover:rotate-0 duration-700 bg-white/[0.04] backdrop-blur-md" />
 </div>

 {/* Right Side: High-end editorial timeline layout */}
 <div className="lg:col-span-7 flex flex-col items-start">
 <span className="text-[#0071E3] font-black uppercase tracking-widest mb-6 text-[10px] block border-l-4 border-[#0071E3] pl-4">The Synthesis Vision</span>
 
 <h2 
 className="text-4xl md:text-6xl font-black mb-8 leading-[0.95] tracking-tight"
 style={{ fontSize: aboutUsTitleFontSize ? `clamp(24px, 5vw, ${aboutUsTitleFontSize}px)` : undefined }}
 >
 {aboutUsTitle ? safeRender(aboutUsTitle, "Structuring zero-friction cognitive futures.") : "Structuring zero-friction cognitive futures."}
 </h2>

 <p 
 className="text-[#A1A1AA] text-lg leading-relaxed mb-12 font-light "
 style={{ fontSize: aboutUsContentFontSize ? `clamp(14px, 2vw, ${aboutUsContentFontSize}px)` : undefined }}
 >
 {safeRender(aboutUsContent, "We believe that the next scale of digital transformation requires an uncompromising focus on proportion, high-performance edge architectures, and intuitive visual restraint. We build for the absolute limit.")}
 </p>

 {/* High-end metrics counters */}
 <div className="grid grid-cols-3 gap-8 md:gap-12 border-t border-white/[0.08] pt-10 w-full">
 <div>
 <div className="text-4xl md:text-5xl font-black mb-1 font-mono tracking-tight text-[#0071E3]">99.9%</div>
 <div className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Efficiency Yield</div>
 </div>
 <div>
 <div className="text-4xl md:text-5xl font-black mb-1 font-mono tracking-tight text-white">40ms</div>
 <div className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Edge Node Latency</div>
 </div>
 <div>
 <div className="text-4xl md:text-5xl font-black mb-1 font-mono tracking-tight text-[#0071E3]">1.8B+</div>
 <div className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Global Calls</div>
 </div>
 </div>
 </div>

 </div>

 </div>
 </section>

 {/* 4. Services Section (Bento Spotlight Grid) */}
 <section 
 id="services" 
 onMouseMove={handleMouseMoveBento}
 className="py-24 px-8 bg-[#000000] relative overflow-hidden border-b border-white/[0.08] scroll-mt-24"
 >
 {/* Interactive Spotlight Radial Light (Behind bento tiles) */}
 <div 
 className="absolute pointer-events-none opacity-25 blur-[120px] bg-[#0071E3]/25 w-[420px] h-[420px] rounded-full transition-all duration-[0.6s] ease-out hidden lg:block"
 style={{
 left: mousePosBento.x - 210,
 top: mousePosBento.y - 210
 }}
 />

 <div className="max-w-7xl mx-auto relative z-10">
 
 <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
 <div>
 <span className="text-[#0071E3] font-black uppercase tracking-widest text-[10px] mb-4 block">Our Core Matrix</span>
 <h2 className="font-sans tracking-tight text-4xl sm:text-5xl md:text-7xl font-black leading-none tracking-tight ">Bespoke Operations</h2>
 </div>
 <p className="text-[#A1A1AA] text-xs font-bold uppercase tracking-[0.25em] max-w-xs leading-relaxed">
 Engineered edge nodes and cognitive assets designed to scale your operations instantly.
 </p>
 </div>

 {/* Bento Grid */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 
 {displayServices.map((service, idx) => {
 const isWide = idx === 0 || idx === 3;
 return (
 <motion.div
 key={idx}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, margin: "-50px" }}
 variants={fadeUp}
 className={`p-10 rounded-[2.5rem] bg-white/[0.04] border border-white/[0.08] hover:border-[#0071E3]/40 hover:shadow-[0_0_50px_-12px_rgba(124,58,237,0.25)] transition-all duration-500 relative overflow-hidden group flex flex-col justify-between ${isWide ? 'md:col-span-2 min-h-[350px]' : 'md:col-span-1 min-h-[350px]'}`}
 >
 {/* Gradient spotlight background inside card on hover */}
 <div className="absolute inset-0 bg-gradient-to-tr from-[#0A84FF]/5 via-transparent to-[#5E5CE6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

 <div className="flex justify-between items-start mb-10 relative z-10">
 {/* Interactive holographic icon */}
 <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-3xl group-hover:scale-105 group-hover:border-[#0071E3]/50 transition-all duration-500 relative overflow-hidden shadow-inner">
 {isValidImageUrl(service.image) ? (
 <Image src={service.image} alt={service.name} fill className="object-cover" />
 ) : (
 <span className="font-sans tracking-tight text-[#0071E3]">✦</span>
 )}
 </div>
 <span className="font-mono text-xs text-[#A1A1AA]/30 font-black">/{(idx + 1).toString().padStart(2, '0')}</span>
 </div>

 <div className="relative z-10">
 <h3 className="text-2xl sm:text-3xl font-black font-sans tracking-tight mb-4 text-white group-hover:text-[#0071E3] transition-colors duration-300">
 {service.name}
 </h3>
 <p className="text-[#A1A1AA] text-sm md:text-base leading-relaxed font-light font-sans max-w-xl">
 {service.desc}
 </p>
 </div>
 </motion.div>
 );
 })}

 </div>

 </div>
 </section>

 {/* 5. Features Section (Alternating Futuristic Alternation) */}
 {displayFeatures && displayFeatures.length > 0 && (
 <section id="features" className="py-24 px-8 bg-[#0A0A0A] relative overflow-hidden border-b border-white/[0.08] scroll-mt-24">
 <div className="max-w-7xl mx-auto relative z-10">
 
 <div className="text-center mb-24">
 <span className="text-[#0071E3] font-black uppercase tracking-widest text-[10px] mb-4 block">Edge Performance</span>
 <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none font-sans tracking-tight">Structural Security</h2>
 </div>

 <div className="space-y-32">
 {displayFeatures.map((feature, idx) => {
 const isEven = idx % 2 === 0;
 return (
 <div key={idx} className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
 
 {/* Visual Node / Graphics Panel */}
 <motion.div 
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true }}
 variants={fadeUp}
 className={`lg:col-span-6 relative aspect-square flex items-center justify-center ${isEven ? 'lg:order-last' : ''}`}
 >
 <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none rounded-[3rem]" />
 <div className="absolute w-[300px] h-[300px] bg-gradient-to-tr from-[#0A84FF]/10 to-[#5E5CE6]/10 blur-[80px] rounded-full pointer-events-none" />

 {/* Concentric scan radar graphics */}
 <div className="absolute w-72 h-72 rounded-full border border-[#0071E3]/10 flex items-center justify-center animate-spin duration-[20s]">
 <div className="w-[90%] h-[90%] rounded-full border border-dashed border-[#0071E3]/20" />
 </div>

 <div className="relative w-56 h-56 rounded-3xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl flex flex-col items-center justify-center p-8 shadow-2xl shadow-black/50 group hover:border-[#0071E3]/50 transition-all duration-500">
 {isValidImageUrl(feature.icon) ? (
 <div className="relative w-16 h-16 rounded-full overflow-hidden">
 <Image src={feature.icon} alt={feature.title} fill className="object-cover" />
 </div>
 ) : (
 <span className="text-6xl mb-4 text-[#0071E3] animate-pulse">✦</span>
 )}
 <span className="text-[10px] font-mono text-[#A1A1AA]/60 uppercase tracking-widest mt-4">Node Active</span>
 </div>
 </motion.div>

 {/* Content text description panel */}
 <motion.div 
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true }}
 variants={fadeUp}
 className="lg:col-span-6 flex flex-col items-start text-left"
 >
 <span className="text-xs font-mono font-black text-[#0071E3] tracking-widest mb-4">/{(idx + 1).toString().padStart(2, '0')} MATRIX CORE</span>
 <h3 className="text-3xl sm:text-4xl font-black font-sans tracking-tight mb-6 text-white leading-none">
 {feature.title}
 </h3>
 <p className="text-[#A1A1AA] text-base leading-relaxed font-light mb-8">
 {feature.desc}
 </p>
 <div className="flex gap-4">
 <span className="w-5 h-5 rounded-full bg-[#0071E3]/20 text-[#0071E3] flex items-center justify-center text-xs">✓</span>
 <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Standard SLA Compliance</span>
 </div>
 </motion.div>

 </div>
 );
 })}
 </div>

 </div>
 </section>
 )}

 {/* 6. Portfolio Section (Cinematic Showcase) */}
 {displayProjects && displayProjects.length > 0 && (
 <section id="portfolio" className="py-24 px-8 bg-[#000000] relative overflow-hidden border-b border-white/[0.08] scroll-mt-24">
 <div className="max-w-7xl mx-auto relative z-10">
 
 <div className="text-center mb-24">
 <span className="text-[#0071E3] font-black uppercase tracking-widest text-[10px] mb-4 block">Holographic Vault</span>
 <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none font-sans tracking-tight">Selected Works</h2>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 {displayProjects.map((item, idx) => (
 <motion.a
 key={idx}
 href={item.link || '#'}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true }}
 variants={fadeUp}
 className="group block relative overflow-hidden rounded-[2.5rem] bg-[#0A0A0A] border border-white/[0.08] shadow-2xl hover:border-[#0071E3]/40 transition-all duration-700"
 >
 <div className="relative aspect-[4/5] overflow-hidden">
 {isValidImageUrl(item.image) ? (
 <Image 
 src={item.image} 
 alt={item.title || item.name} 
 fill 
 className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] grayscale group-hover:grayscale-0 filter contrast-[1.05]" 
 />
 ) : (
 <div className="w-full h-full bg-[#111111]" />
 )}
 {/* Overlay shadow layer */}
 <div className="absolute inset-0 bg-gradient-to-t from-[#060816] via-transparent to-transparent opacity-90 transition-opacity duration-500" />
 </div>
 
 {/* Floating details inside card */}
 <div className="absolute bottom-8 left-8 right-8 z-10 flex flex-col justify-end">
 <span className="text-[10px] font-black uppercase tracking-widest text-[#0071E3] mb-2 block">{item.desc}</span>
 <h4 className="text-2xl sm:text-3xl font-black text-white leading-none font-sans tracking-tight group-hover: transition-all duration-300">
 {item.title || item.name}
 </h4>
 </div>
 </motion.a>
 ))}
 </div>

 </div>
 </section>
 )}

 {/* 7. Team Section (Glass Leadership Cards) */}
 {displayTeam && displayTeam.length > 0 && (
 <section id="team" className="py-24 px-8 bg-[#0A0A0A] relative overflow-hidden border-b border-white/[0.08] scroll-mt-24">
 <div className="max-w-7xl mx-auto relative z-10">
 
 <div className="text-center mb-24">
 <span className="text-[#0071E3] font-black uppercase tracking-widest text-[10px] mb-4 block">System Architects</span>
 <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none font-sans tracking-tight">Executive Minds</h2>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
 {displayTeam.map((member, idx) => (
 <motion.div
 key={idx}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true }}
 variants={fadeUp}
 className="group relative rounded-[2rem] bg-white/[0.04] border border-white/[0.08] hover:border-[#0071E3]/40 transition-all duration-500 p-6 flex flex-col items-center text-center overflow-hidden"
 >
 <div className="relative w-44 h-44 mb-8 rounded-full overflow-hidden shadow-2xl border-4 border-slate-900 group-hover:border-[#0071E3] transition-all duration-700">
 {isValidImageUrl(member.image) ? (
 <Image 
 src={member.image} 
 alt={member.name} 
 fill 
 className="object-cover group-hover:scale-105 transition-transform duration-[1.2s] grayscale group-hover:grayscale-0 filter contrast-[1.05]" 
 />
 ) : (
 <div className="w-full h-full bg-slate-800" />
 )}
 </div>

 <h4 className="text-xl font-black text-white font-sans tracking-tight leading-none mb-2">{member.name}</h4>
 <span className="text-[#0071E3] font-black text-[9px] uppercase tracking-[0.25em] mb-4 block">{member.role}</span>
 <p className="text-[#A1A1AA] text-xs leading-relaxed font-light">{member.bio}</p>
 </motion.div>
 ))}
 </div>

 </div>
 </section>
 )}

 {/* 8. Testimonials Section (3D infinite Marquee overlay) */}
 {displayTestimonials && displayTestimonials.length > 0 && (
 <section id="testimonials" className="py-24 bg-[#000000] relative overflow-hidden border-b border-white/[0.08] scroll-mt-24">
 <div className="max-w-7xl mx-auto px-8 relative z-10 mb-16">
 <div className="text-center">
 <span className="text-[#0071E3] font-black uppercase tracking-widest text-[10px] mb-4 block">Telemetry Feed</span>
 <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none font-sans tracking-tight">Synthesizer Commends</h2>
 </div>
 </div>

 {/* Sliding Testimonial Row (Infinite animation using Framer Motion) */}
 <div className="flex flex-col gap-8 w-full overflow-hidden pointer-events-none select-none">
 
 {/* Row 1: Left to right scroll */}
 <motion.div 
 animate={{ x: [0, -1000] }}
 transition={{ ease: "linear", duration: 35, repeat: Infinity }}
 className="flex gap-8 whitespace-nowrap w-[2000px]"
 >
 {[...displayTestimonials, ...displayTestimonials].map((testi, idx) => (
 <div 
 key={idx} 
 className="inline-block w-[380px] p-8 rounded-3xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm shadow-xl flex-shrink-0"
 >
 <div className="text-[#0071E3] text-4xl mb-4 font-sans tracking-tight leading-none">“</div>
 <p className="text-sm font-light leading-relaxed mb-6 text-slate-300 whitespace-normal max-w-sm">
 {testi.review}
 </p>
 <div className="flex items-center gap-4 border-t border-white/[0.08] pt-4">
 <div className="w-10 h-10 relative rounded-full overflow-hidden border border-[#0071E3]/30 flex-shrink-0">
 {isValidImageUrl(testi.image) ? <Image src={testi.image} alt={testi.name} fill className="object-cover" /> : <div className="w-full h-full bg-slate-700" />}
 </div>
 <div>
 <h4 className="font-bold text-xs text-white">{testi.name}</h4>
 <span className="text-[8px] text-[#0071E3] uppercase tracking-widest mt-0.5 block">{testi.role}</span>
 </div>
 </div>
 </div>
 ))}
 </motion.div>

 {/* Row 2: Right to left scroll */}
 <motion.div 
 animate={{ x: [-1000, 0] }}
 transition={{ ease: "linear", duration: 35, repeat: Infinity }}
 className="flex gap-8 whitespace-nowrap w-[2000px]"
 >
 {[...displayTestimonials, ...displayTestimonials].reverse().map((testi, idx) => (
 <div 
 key={idx} 
 className="inline-block w-[380px] p-8 rounded-3xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm shadow-xl flex-shrink-0"
 >
 <div className="text-[#0071E3] text-4xl mb-4 font-sans tracking-tight leading-none">“</div>
 <p className="text-sm font-light leading-relaxed mb-6 text-slate-300 whitespace-normal max-w-sm">
 {testi.review}
 </p>
 <div className="flex items-center gap-4 border-t border-white/[0.08] pt-4">
 <div className="w-10 h-10 relative rounded-full overflow-hidden border border-[#0071E3]/30 flex-shrink-0">
 {isValidImageUrl(testi.image) ? <Image src={testi.image} alt={testi.name} fill className="object-cover" /> : <div className="w-full h-full bg-slate-700" />}
 </div>
 <div>
 <h4 className="font-bold text-xs text-white">{testi.name}</h4>
 <span className="text-[8px] text-[#0071E3] uppercase tracking-widest mt-0.5 block">{testi.role}</span>
 </div>
 </div>
 </div>
 ))}
 </motion.div>

 </div>
 </section>
 )}

 {/* 9. Pricing Section (Luxurious Subscription Tiers) */}
 {displayPricing && displayPricing.length > 0 && (
 <section id="pricing" className="py-24 px-8 bg-[#0A0A0A] relative overflow-hidden border-b border-white/[0.08] scroll-mt-24">
 <div className="max-w-7xl mx-auto relative z-10">
 
 <div className="text-center mb-24">
 <span className="text-[#0071E3] font-black uppercase tracking-widest text-[10px] mb-4 block">Resource Allocation</span>
 <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none font-sans tracking-tight">Licensing Structure</h2>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
 {displayPricing.map((plan, idx) => {
 const isPremium = idx === 1;
 const listItems = plan.features ? plan.features.split(',').map(f => f.trim()) : [];
 return (
 <motion.div
 key={idx}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true }}
 variants={fadeUp}
 className={`p-10 rounded-[2.5rem] bg-white/[0.04] border flex flex-col justify-between relative overflow-hidden backdrop-blur-sm transition-all duration-500 hover:shadow-2xl ${isPremium ? 'border-[#0071E3] shadow-2xl shadow-[#0071E3]/10 scale-105 z-10 bg-white/[0.04]' : 'border-white/[0.08]'}`}
 >
 {isPremium && (
 <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#0A84FF] to-[#5E5CE6] text-white px-5 py-1.5 rounded-b-2xl text-[9px] font-black uppercase tracking-widest">
 Most Deployed Nodes
 </div>
 )}

 <div>
 <h4 className="text-2xl font-black text-white mb-2 font-sans tracking-tight mt-4">{plan.planName}</h4>
 <div className="text-4xl sm:text-5xl font-mono font-black text-[#0071E3] tracking-tight mb-8 mt-2">{plan.price}</div>
 
 <ul className="space-y-4 mb-10 text-slate-300 text-sm font-light text-left">
 {listItems.map((feature, i) => (
 <li key={i} className="flex items-center gap-3">
 <span className="text-[#0071E3] text-base font-bold">✓</span> {feature}
 </li>
 ))}
 </ul>
 </div>

 <button className={`w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 ${isPremium ? 'bg-gradient-to-r from-[#0A84FF] to-[#5E5CE6] text-white hover:brightness-110 shadow-lg shadow-[#0071E3]/35 active:scale-95' : 'bg-white/[0.04] text-white hover:bg-white/10'}`}>
 {plan.buttonText || "Initialize Setup"}
 </button>
 </motion.div>
 );
 })}
 </div>

 </div>
 </section>
 )}

 {/* 10. FAQ Section (Accordion Height Transitions) */}
 {displayFaq && displayFaq.length > 0 && (
 <section id="faq" className="py-24 px-8 bg-[#000000] relative overflow-hidden border-b border-white/[0.08] scroll-mt-24">
 <div className="max-w-3xl mx-auto relative z-10">
 
 <div className="text-center mb-20">
 <span className="text-[#0071E3] font-black uppercase tracking-widest text-[10px] mb-4 block">Knowledge Repository</span>
 <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none font-sans tracking-tight">Frequent Enquiries</h2>
 </div>

 <div className="space-y-4">
 {displayFaq.map((q, idx) => {
 const isOpen = activeFaq === idx;
 return (
 <div 
 key={idx}
 className={`bg-white/[0.04] border rounded-[2rem] transition-all duration-500 overflow-hidden ${isOpen ? 'border-[#0071E3]/30 bg-white/[0.04]' : 'border-white/[0.08]'}`}
 >
 <button
 onClick={() => setActiveFaq(isOpen ? null : idx)}
 className="w-full flex justify-between items-center p-8 text-left font-sans tracking-tight text-lg md:text-xl font-bold tracking-tight text-white hover:text-[#0071E3] transition-colors focus:outline-none"
 >
 <span className={`${isOpen ? ' text-[#0071E3]' : ''}`}>{q.question}</span>
 <span className={`text-2xl font-light leading-none transform transition-transform duration-500 ${isOpen ? 'rotate-45 text-[#0071E3]' : 'text-slate-400'}`}>+</span>
 </button>

 <AnimatePresence initial={false}>
 {isOpen && (
 <motion.div
 initial={{ height: 0, opacity: 0 }}
 animate={{ height: "auto", opacity: 1 }}
 exit={{ height: 0, opacity: 0 }}
 transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
 >
 <div className="px-8 pb-8 text-[#A1A1AA] text-sm md:text-base leading-relaxed font-light border-t border-white/[0.08] pt-4">
 {q.answer}
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 );
 })}
 </div>

 </div>
 </section>
 )}

 {/* 11. Blog Section (Editorial Magazine Grid) */}
 {displayBlog && displayBlog.length > 0 && (
 <section id="blog" className="py-24 px-8 bg-[#0A0A0A] relative overflow-hidden border-b border-white/[0.08] scroll-mt-24">
 <div className="max-w-7xl mx-auto relative z-10">
 
 <div className="text-center mb-24">
 <span className="text-[#0071E3] font-black uppercase tracking-widest text-[10px] mb-4 block">Core Telemetry</span>
 <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none font-sans tracking-tight">Insights & Journal</h2>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
 
 {/* Left Featured Large Article Card */}
 <motion.a
 href={displayBlog[0].link || '#'}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true }}
 variants={fadeUp}
 className="lg:col-span-7 rounded-[2.5rem] overflow-hidden bg-white/[0.04] border border-white/[0.08] hover:border-[#0071E3]/40 hover:shadow-2xl transition-all duration-500 group flex flex-col justify-between"
 >
 <div className="relative aspect-video w-full overflow-hidden">
 <Image 
 src={isValidImageUrl(displayBlog[0].image) ? displayBlog[0].image : "/images/templates/template-img-21.jpg"} 
 alt={displayBlog[0].title} 
 fill 
 className="object-cover group-hover:scale-103 transition-transform duration-[1.5s] grayscale group-hover:grayscale-0 filter contrast-[1.05]" 
 />
 <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
 </div>

 <div className="p-10 text-left">
 <span className="text-[9px] font-black uppercase tracking-widest text-[#0071E3] mb-3 block">{displayBlog[0].date}</span>
 <h4 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight group-hover: transition-all duration-300 leading-tight mb-4">
 {displayBlog[0].title}
 </h4>
 <p className="text-[#A1A1AA] text-sm leading-relaxed font-light mb-6">
 {displayBlog[0].excerpt}
 </p>
 <span className="text-[9px] font-black text-[#0071E3] uppercase tracking-widest block">Access Protocol →</span>
 </div>
 </motion.a>

 {/* Right Secondary Articles Stack */}
 <div className="lg:col-span-5 flex flex-col gap-8 justify-between">
 {displayBlog.slice(1, 3).map((post, idx) => (
 <motion.a
 key={idx}
 href={post.link || '#'}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true }}
 variants={fadeUp}
 className="rounded-[2rem] overflow-hidden bg-white/[0.04] border border-white/[0.08] hover:border-[#0071E3]/40 hover:shadow-2xl transition-all duration-500 group p-8 flex gap-6 text-left items-center min-h-[220px]"
 >
 <div className="relative w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0 shadow-xl">
 <Image 
 src={isValidImageUrl(post.image) ? post.image : (idx === 0 ? "/images/templates/template-img-22.jpg" : "/images/templates/template-img-23.jpg")} 
 alt={post.title} 
 fill 
 className="object-cover grayscale group-hover:grayscale-0 filter contrast-[1.05]" 
 />
 </div>

 <div className="flex flex-col justify-center">
 <span className="text-[8px] font-black uppercase tracking-widest text-[#0071E3] mb-2 block">{post.date}</span>
 <h4 className="text-base sm:text-lg font-black text-white font-sans tracking-tight leading-snug mb-2 group-hover:text-[#0071E3] transition-colors">
 {post.title}
 </h4>
 <span className="text-[8px] font-black text-white/50 uppercase tracking-widest mt-1 block">Deploy Telemetry →</span>
 </div>
 </motion.a>
 ))}
 </div>

 </div>

 </div>
 </section>
 )}

 {/* 12. Contact Section (Split Form & Info Layout) */}
 <section id="contact" className="py-24 px-8 bg-[#000000] relative overflow-hidden border-b border-white/[0.08] scroll-mt-24">
 <div className="max-w-7xl mx-auto relative z-10">
 
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-stretch">
 
 {/* Left Side: Contact Coordinates */}
 <div className="lg:col-span-5 flex flex-col justify-between text-left">
 <div>
 <span className="text-[#0071E3] font-black uppercase tracking-widest text-[10px] mb-6 block border-l-4 border-[#0071E3] pl-4">Connection Core</span>
 <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none font-sans tracking-tight mb-8 text-white">
 Start the Dialogue.
 </h2>
 <p className="text-[#A1A1AA] text-base leading-relaxed font-light mb-10 max-w-sm">
 Our system integration teams are prepared to deploy tailored quantum operations for your enterprise network setup.
 </p>
 </div>

 <div className="space-y-6 font-bold uppercase tracking-widest text-slate-500 border-t border-white/[0.08] pt-8">
 <div className="flex flex-col gap-1">
 <span className="text-[9px] tracking-widest text-[#0071E3]/70">Quantum Node Link</span>
 <a href={`mailto:${displayEmail}`} className="text-base text-white hover:text-[#0071E3] transition-colors normal-case font-medium font-sans">{displayEmail}</a>
 </div>
 <div className="flex flex-col gap-1">
 <span className="text-[9px] tracking-widest text-[#0071E3]/70">Direct Telephony Call</span>
 <a href={`tel:${displayPhone}`} className="text-base text-white hover:text-[#0071E3] transition-colors font-medium font-sans">{displayPhone || "+1 (800) 555-0199"}</a>
 </div>
 <div className="flex flex-col gap-1">
 <span className="text-[9px] tracking-widest text-[#0071E3]/70">Base Coordinates</span>
 <span className="text-base text-white font-normal normal-case font-sans tracking-tight leading-relaxed">{displayLocation}</span>
 </div>
 </div>
 </div>

 {/* Right Side: Split Screen Glass Inputs */}
 <div className="lg:col-span-7 p-8 sm:p-12 rounded-[2.5rem] bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl shadow-2xl flex flex-col justify-between relative overflow-hidden group hover:border-[#0071E3]/30 transition-all duration-500">
 
 {/* Subtle card glow */}
 <div className="absolute top-0 right-0 w-44 h-44 bg-[#0071E3]/5 blur-[60px] rounded-full pointer-events-none" />

 <form className="space-y-8 relative z-10 text-left">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
 {/* Name input */}
 <div className="relative">
 <input 
 type="text" 
 id="clientName"
 onFocus={() => setFocusedInput("clientName")}
 onBlur={() => setFocusedInput(null)}
 placeholder=" "
 className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-[#0071E3] focus:bg-[#000000]/60 transition-all placeholder:opacity-0 peer"
 />
 <label 
 htmlFor="clientName"
 className={`absolute left-5 top-4 text-xs font-bold uppercase tracking-widest text-slate-500 transition-all duration-300 pointer-events-none ${focusedInput === "clientName" ? 'text-[#0071E3] -translate-y-8 scale-90' : 'peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-8 peer-focus:scale-90'}`}
 >
 Identity / Name
 </label>
 </div>

 {/* Email input */}
 <div className="relative">
 <input 
 type="email" 
 id="clientEmail"
 onFocus={() => setFocusedInput("clientEmail")}
 onBlur={() => setFocusedInput(null)}
 placeholder=" "
 className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-[#0071E3] focus:bg-[#000000]/60 transition-all placeholder:opacity-0 peer"
 />
 <label 
 htmlFor="clientEmail"
 className={`absolute left-5 top-4 text-xs font-bold uppercase tracking-widest text-slate-500 transition-all duration-300 pointer-events-none ${focusedInput === "clientEmail" ? 'text-[#0071E3] -translate-y-8 scale-90' : 'peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-8 peer-focus:scale-90'}`}
 >
 Node Email
 </label>
 </div>
 </div>

 {/* Scope Category selection */}
 <div className="relative">
 <select 
 id="clientScope"
 onFocus={() => setFocusedInput("clientScope")}
 onBlur={() => setFocusedInput(null)}
 className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-[#0071E3] focus:bg-[#000000]/60 transition-all cursor-pointer"
 >
 <option value="cognitive" className="bg-[#000000] text-white">Cognitive Automation</option>
 <option value="quantum" className="bg-[#000000] text-white">Quantum Computing Nodes</option>
 <option value="twin" className="bg-[#000000] text-white">Synthetic Analytics Grid</option>
 <option value="immersive" className="bg-[#000000] text-white">Immersive Interface Design</option>
 </select>
 <label 
 htmlFor="clientScope"
 className="absolute left-5 -translate-y-8 scale-90 text-xs font-bold uppercase tracking-widest text-[#0071E3]"
 >
 Operational Scope
 </label>
 </div>

 {/* Description text area */}
 <div className="relative">
 <textarea 
 id="clientDesc"
 rows="4"
 onFocus={() => setFocusedInput("clientDesc")}
 onBlur={() => setFocusedInput(null)}
 placeholder=" "
 className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-[#0071E3] focus:bg-[#000000]/60 transition-all placeholder:opacity-0 peer"
 />
 <label 
 htmlFor="clientDesc"
 className={`absolute left-5 top-4 text-xs font-bold uppercase tracking-widest text-slate-500 transition-all duration-300 pointer-events-none ${focusedInput === "clientDesc" ? 'text-[#0071E3] -translate-y-8 scale-90' : 'peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-8 peer-focus:scale-90'}`}
 >
 Synthesis Brief / Message
 </label>
 </div>

 {/* Submit Button */}
 <button 
 type="submit" 
 onClick={(e) => e.preventDefault()}
 className="w-full py-5 bg-gradient-to-r from-[#0A84FF] to-[#5E5CE6] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:brightness-110 shadow-xl shadow-[#0071E3]/20 hover:shadow-[#0071E3]/40 transition-all active:scale-95 duration-300"
 >
 Establish Connection Core
 </button>
 </form>
 </div>

 </div>

 </div>
 </section>

 {/* 13. CTA Section (Cinematic Final Call) */}
 <section className="py-32 px-8 bg-[#000000] text-white text-center relative overflow-hidden border-b border-white/[0.08]">
 {/* Spinning background dynamic gradient */}
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-[#0071E3]/10 blur-[160px] rounded-full pointer-events-none animate-spin duration-[15s]" />
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0071E3]/5 blur-[120px] rounded-full pointer-events-none" />

 <div className="max-w-4xl mx-auto relative z-10">
 <span className="text-[#0071E3] font-black uppercase tracking-widest text-[10px] mb-6 block">Ready to deploy?</span>
 <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-[0.95]">
 {ctaTitle ? safeRender(ctaTitle, "Redefine your database operational legacy.") : "Redefine your database operational legacy."}
 </h2>
 <p className="text-lg md:text-xl text-[#A1A1AA] mb-12 font-light max-w-2xl mx-auto">
 {safeRender(ctaDesc, "Integrate robust Edge network parameters inside our cloud database systems in seconds.")}
 </p>
 <a 
 href={safeRender(ctaButtonLink, '#contact')} 
 className="inline-block bg-white text-[#060816] px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gradient-to-r hover:from-[#0A84FF] hover:to-[#5E5CE6] hover:text-white hover:scale-105 active:scale-95 transition-all duration-500 shadow-2xl hover:shadow-[#0071E3]/30"
 >
 {safeRender(ctaButtonText, "Initialize Connection")}
 </a>
 </div>
 </section>

 </main>

 {/* 14. Footer (Luxury Digital Footer) */}
 <footer className="py-24 bg-[#0A0A0A]/80 backdrop-blur-md border-t border-white/[0.08] px-8 md:px-16 mt-auto relative overflow-hidden">
 
 {/* Giant low-opacity background branding logo */}
 <div className="absolute bottom-[-50px] right-[-50px] text-[16vw] font-black text-white/[0.015] pointer-events-none select-none tracking-tight leading-none font-sans tracking-tight">
 {displayName}
 </div>

 <div className="max-w-7xl mx-auto relative z-10">
 <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
 
 {/* Brand Column */}
 <div className="col-span-1">
 <div className="relative text-2xl font-black tracking-tight mb-8 flex items-center gap-2">
 <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0A84FF] to-[#5E5CE6] flex items-center justify-center text-white font-bold text-sm shadow-[0_0_15px_rgba(124,58,237,0.5)]">
 {displayName[0]}
 </span>
 <span className="font-sans tracking-tight font-black text-white">{displayName}<span className="text-[#0071E3]">_</span></span>
 </div>
 <p className="text-slate-500 text-xs leading-relaxed max-w-xs mb-8">
 {safeRender(footerDescription, "Scaling digital core networks through premium cognitive pipelines, spatial interfaces, and enterprise integrity.")}
 </p>
 
 {/* Social channels with animations */}
 <div className="flex gap-4">
 {linkedinUrl && (
 <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center hover:bg-white hover:text-slate-950 transition-all duration-300 group">
 <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
 <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
 </svg>
 </a>
 )}
 {facebookUrl && (
 <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center hover:bg-white hover:text-slate-950 transition-all duration-300 group">
 <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
 <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.324v-21.35c0-.732-.593-1.325-1.325-1.325z" />
 </svg>
 </a>
 )}
 {twitterUrl && (
 <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center hover:bg-white hover:text-slate-950 transition-all duration-300 group">
 <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
 <path d="M23.953 4.57c-.885.392-1.83.656-2.825.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
 </svg>
 </a>
 )}
 </div>
 </div>

 {/* Solutions Column */}
 <div>
 <h4 className="text-[10px] font-black uppercase tracking-[0.45em] text-white mb-8 border-l-2 border-[#0071E3] pl-3">Solutions</h4>
 <div className="flex flex-col gap-4 text-[10px] items-start font-black uppercase tracking-wider text-[#A1A1AA]">
 {displayServices.slice(0, 4).map((item, idx) => (
 <a key={idx} href="#services" className="hover:text-[#0071E3] transition-colors">{item.name}</a>
 ))}
 </div>
 </div>

 {/* Coordinates Info */}
 <div>
 <h4 className="text-[10px] font-black uppercase tracking-[0.45em] text-white mb-8 border-l-2 border-[#0071E3] pl-3">Operational Bases</h4>
 <div className="flex flex-col gap-4 text-[11px] font-medium text-slate-500 items-start">
 {address && <span className="flex items-center gap-2 text-left">📍 {address}</span>}
 {(contactEmail || email) && <a href={`mailto:${contactEmail || email}`} className="flex items-center gap-2 hover:text-[#0071E3] transition-colors text-left">📧 {contactEmail || email}</a>}
 {phone && <a href={`tel:${phone}`} className="flex items-center gap-2 hover:text-[#0071E3] transition-colors text-left">📞 {phone}</a>}
 </div>
 </div>

 {/* Newsletter Sub */}
 <div>
 <h4 className="text-[10px] font-black uppercase tracking-[0.45em] text-white mb-8 border-l-2 border-[#0071E3] pl-3">{newsletterTitle || "Digital Channels"}</h4>
 <p className="text-slate-500 text-xs mb-4 text-left">{newsletterDesc || "Subscribe for the latest insights."}</p>
 <div className="flex flex-col gap-3">
 <input type="email" placeholder="your@email.com" className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0071E3] transition-colors text-white placeholder:text-slate-600" />
 <button className="bg-gradient-to-r from-[#0A84FF] to-[#5E5CE6] py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all text-white">Subscribe</button>
 </div>
 </div>

 </div>

 <div className="pt-12 border-t border-white/[0.08] flex flex-col md:flex-row justify-between items-center gap-6">
 <div className="text-slate-600 text-[10px] font-mono tracking-widest uppercase">
 {footerCopyright || `© ${new Date().getFullYear()} / ${displayName} Intelligence. All rights reserved.`}
 </div>
 <div className="flex gap-8 text-[9px] font-black uppercase tracking-widest text-slate-700">
 <span className="hover:text-white transition-colors cursor-pointer">Privacy Protocol</span>
 <span className="hover:text-white transition-colors cursor-pointer">Security Standards</span>
 </div>
 </div>

 </div>
 </footer>

 </div>
 </TemplateLayout>
 );
}
