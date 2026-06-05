import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const T = {
   bg: "#020617",
   surface: "rgba(30, 41, 59, 0.4)",
   accent: "#3b82f6",
   accentSecondary: "#8b5cf6",
   text: "#f8fafc",
   muted: "#94a3b8",
   border: "rgba(148, 163, 184, 0.1)",
};

const DEFAULT_DATA = {
   agencyName: "SYNTAX",
   tagline: "Build the Future.",
   heroTitle: "SYSTEM.INIT()",
   bio: "We architect the most advanced tech events on the planet. From grueling 48-hour hackathons to elite developer summits, Syntax provides the infrastructure for innovation.",
   aboutUsTitle: "RUNTIME ENVIRONMENT",
   contactEmail: "ping@syntax-events.io",
   phone: "+1 010 110 100",
   address: "Data Center 04, Silicon Valley",
   footerCopyright: `© ${new Date().getFullYear()} Syntax Events.`,
   heroImage: "/images/templates/template-img-27.jpg",
   aboutImage: "/images/templates/template-img-28.jpg",
   services: [
      { name: "Hackathons", desc: "High-octane coding competitions.", icon: "{ }" },
      { name: "Tech Summits", desc: "Where the industry defines what's next.", icon: "</>" },
      { name: "Product Demos", desc: "Flawless technical showcases.", icon: "[ ]" },
   ],
   projects: [
      { name: "DevCon Global", tag: "Summit", img: "/images/templates/template-img-29.jpg" },
      { name: "NeuralHack", tag: "Hackathon", img: "/images/templates/template-img-30.jpg" },
      { name: "CloudScale", tag: "Conference", img: "/images/templates/template-img-31.jpg" },
   ],
};

const GlassPanel = ({ children, className = "" }) => (
   <div className={`backdrop-blur-xl border border-[${T.border}] bg-[${T.surface}] rounded-2xl ${className}`}>
      {children}
   </div>
);

export default function EventTemplate10({ data }) {
   const d = { ...DEFAULT_DATA, ...data };
   const services = d.services?.length ? d.services : DEFAULT_DATA.services;
   const projects = d.projects?.length ? d.projects : DEFAULT_DATA.projects;

   return (
      <div style={{ fontFamily: "'Inter', sans-serif", background: T.bg, color: T.text, minHeight: "100vh", overflowX: "hidden" }}>
         
         {/* BACKGROUND GRADIENTS */}
         <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 pointer-events-none" />
         <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 pointer-events-none" />

         {/* NAVBAR */}
         <nav className="fixed w-full z-50 p-4 md:p-6">
            <GlassPanel className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
               <div className="font-mono text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  {`<${d.agencyName} />`}
               </div>
               <div className="hidden md:flex gap-8 font-mono text-sm" style={{ color: T.muted }}>
                  {["// SERVICES", "// PROJECTS", "// CONNECT"].map((item) => (
                     <a key={item} href={`#${item.toLowerCase().replace(/\s|\//g, "")}`} className="hover:text-white transition-colors">
                        {item}
                     </a>
                  ))}
               </div>
               <button className="md:hidden font-mono text-sm" style={{ color: T.accent }}>_MENU</button>
            </GlassPanel>
         </nav>

         {/* HERO */}
         <section className="relative pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-center min-h-[90vh]">
            <div className="grid md:grid-cols-2 gap-12 items-center">
               <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                  <div className="font-mono text-sm mb-6" style={{ color: T.accentSecondary }}>{`> ${d.tagline}`}</div>
                  <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
                     {d.heroTitle}
                  </h1>
                  <p className="text-lg md:text-xl font-light leading-relaxed mb-10" style={{ color: T.muted }}>
                     {d.bio}
                  </p>
                  <div className="flex gap-4">
                     <button className="px-6 py-3 font-mono text-sm font-bold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors">
                        EXECUTE_PLAN
                     </button>
                     <button className="px-6 py-3 font-mono text-sm font-bold rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors">
                        READ_DOCS
                     </button>
                  </div>
               </motion.div>
               <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
                  <GlassPanel className="p-2 aspect-square relative overflow-hidden">
                     <img src={d.heroImage} alt="Tech" className="w-full h-full object-cover rounded-xl opacity-80" />
                     <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 mix-blend-overlay"></div>
                     <div className="absolute top-4 left-4 font-mono text-xs text-white/50 bg-black/50 px-2 py-1 rounded">SYS_MONITOR_ACTIVE</div>
                  </GlassPanel>
               </motion.div>
            </div>
         </section>

         {/* SERVICES */}
         <section id="services" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-slate-800">
            <div className="font-mono text-sm mb-12" style={{ color: T.accent }}>{`// MODULES`}</div>
            <div className="grid md:grid-cols-3 gap-6">
               {services.map((svc, i) => (
                  <GlassPanel key={i} className="p-8 group hover:border-blue-500/50 transition-colors">
                     <div className="font-mono text-3xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                        {svc.icon}
                     </div>
                     <h3 className="text-xl font-bold mb-4">{svc.name}</h3>
                     <p className="font-light" style={{ color: T.muted }}>{svc.desc}</p>
                  </GlassPanel>
               ))}
            </div>
         </section>

         {/* PROJECTS */}
         <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-slate-800">
            <div className="font-mono text-sm mb-12" style={{ color: T.accent }}>{`// DEPLOYMENTS`}</div>
            <div className="grid gap-12">
               {projects.map((proj, i) => (
                  <GlassPanel key={i} className="flex flex-col md:flex-row overflow-hidden group">
                     <div className="w-full md:w-1/2 h-[300px] relative overflow-hidden">
                        <img src={proj.img} alt={proj.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                        <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors"></div>
                     </div>
                     <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                        <div className="font-mono text-xs px-3 py-1 rounded-full border border-purple-500/30 text-purple-400 w-fit mb-6">
                           {proj.tag}
                        </div>
                        <h3 className="text-3xl font-bold mb-4">{proj.name}</h3>
                        <a href="#" className="font-mono text-sm text-blue-400 hover:text-blue-300 mt-auto flex items-center gap-2">
                           VIEW_SOURCE <span className="text-lg">→</span>
                        </a>
                     </div>
                  </GlassPanel>
               ))}
            </div>
         </section>

         {/* FOOTER */}
         <footer id="connect" className="py-24 px-6 md:px-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
               <div>
                  <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">INITIATE_CONNECTION</h2>
                  <a href={`mailto:${d.contactEmail}`} className="font-mono text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 border-b border-purple-500/30 pb-2">
                     {d.contactEmail}
                  </a>
               </div>
               <div className="font-mono text-sm text-right" style={{ color: T.muted }}>
                  <p className="mb-2">SYSTEM.STATUS: ONLINE</p>
                  <p>{d.footerCopyright}</p>
               </div>
            </div>
         </footer>

      </div>
   );
}
