import TemplateLayout from "./TemplateLayout";
import Image from "next/image";
import { motion } from "framer-motion";

export default function EventTemplate2({ data }) {
  const {
    agencyName,
    agencyNameFontSize,
    tagline,
    taglineFontSize,
    heroTitle,
    heroTitleFontSize,
    heroImage,
    bio,
    bioFontSize,
    aboutUsTitle,
    aboutUsTitleFontSize,
    aboutImage,
    services,
    projects,
    contactEmail,
    phone,
    countryCode,
    address,
    headerType,
    logoUrl,
    footerCopyright
  } = data || {};

  const displayAgency = agencyName || "Aura Events Agency";
  const displayTagline = tagline || "Designing Experiences for a New World";
  const displayEmail = contactEmail || "hello@aura.agency";
  const displayPhone = phone ? `${countryCode?.split(' ')[0] || ''} ${phone}`.trim() : (phone || "+1 888 AURA");

  const displayServices = services || [
    { name: 'Brand Activations', desc: 'Crafting immersive stories that connect brands with consumers in physical spaces.', image: '/images/templates/template-img-36.jpg' },
    { name: 'Festival Production', desc: 'Large-scale logistical management for multi-day cultural events.', image: '/images/templates/template-img-37.jpg' }
  ];

  const displayProjects = projects || [
    { name: 'Summit X 2024', desc: 'Visual identity and management for a future-tech summit.', image: '/images/templates/template-img-33.jpg' },
    { name: 'Neon Nights Festival', desc: 'An underground immersive music experience.', image: '/images/templates/template-img-12.jpg' }
  ];

  const reveal = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <TemplateLayout data={data} theme="dark" category="Event Management" hideHeader={true} hideFooter={true}>
      <div className="scroll-smooth bg-slate-950 text-white flex flex-col min-h-screen font-sans tracking-tight">
        
        {/* Modern Sticky Nav */}
        <header className="w-full bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50 border-b border-white/5">
          <div className="container mx-auto px-8 py-6 flex justify-between items-center">
            <div className="flex items-center gap-4">
              {headerType === "Image" ? (
                logoUrl ? (
                  <div className="relative h-10 w-24 grayscale invert">
                    <Image src={logoUrl} alt="Logo" fill className="object-contain" />
                  </div>
                ) : (
                  <span className="text-2xl font-black italic tracking-tighter">A/E</span>
                )
              ) : (
                <div className="flex flex-col">
                  <span className="text-sm font-black uppercase tracking-[0.5em]" style={{ fontSize: agencyNameFontSize ? `${agencyNameFontSize}px` : undefined }}>{displayAgency}</span>
                  <div className="h-0.5 w-6 bg-white mt-1"></div>
                </div>
              )}
            </div>
            <nav className="hidden md:flex gap-12 items-center text-[10px] font-black uppercase tracking-[0.3em] overflow-hidden">
              <a href="#about" className="hover:text-amber-400 transition-colors">Philosophy</a>
              <a href="#services" className="hover:text-amber-400 transition-colors">Capability</a>
              <a href="#work" className="hover:text-amber-400 transition-colors">Cases</a>
              <a href="#contact" className="px-6 py-3 bg-white text-slate-950 rounded-full hover:bg-amber-400 transition-all font-black">Brief Us</a>
            </nav>
          </div>
        </header>

        <main className="flex-1">
          {/* Asymmetrical High-Contrast Hero */}
          <section className="pt-24 pb-48 px-8 overflow-hidden relative">
            <div className="container mx-auto">
               <div className="flex flex-col lg:flex-row gap-16 items-start">
                  <div className="lg:w-1/2 relative z-10">
                     <motion.div
                       initial={{ opacity: 0, x: -30 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ duration: 0.8 }}
                     >
                        <h1 className="text-7xl md:text-[8rem] font-black leading-[0.85] tracking-tighter mb-12" style={{ fontSize: heroTitleFontSize ? `${heroTitleFontSize}px` : undefined }}>
                           {heroTitle || "WE BUILD WORLDS."}
                        </h1>
                        <p className="text-xl text-slate-400 max-w-sm mb-12 font-medium leading-relaxed">
                          We are a creative agency specializing in the architecture of modern events and experiential storytelling.
                        </p>
                        <div className="flex gap-8 items-center">
                           <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center animate-bounce">↓</div>
                           <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Scroll For Impact</span>
                        </div>
                     </motion.div>
                  </div>
                  <div className="lg:w-1/2 relative h-[500px] md:h-[800px] w-full">
                     <motion.div 
                        className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-1000 overflow-hidden rounded-[3rem]"
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.5 }}
                     >
                        <Image 
                           src={heroImage || "/images/templates/template-img-38.jpg"}
                           alt="Experimental Event"
                           fill
                           className="object-cover"
                           priority
                        />
                     </motion.div>
                     <div className="absolute -bottom-10 -right-10 bg-amber-400 text-slate-950 p-10 rounded-[2rem] shadow-2xl rotate-6 hidden lg:block">
                        <p className="text-4xl font-black tracking-tighter leading-none mb-2 underline">NEW YORK</p>
                        <p className="text-sm font-bold uppercase tracking-widest leading-none">Est. 2012</p>
                     </div>
                  </div>
               </div>
            </div>
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
          </section>

          {/* Philosophy Section */}
          <section id="about" className="py-48 px-8 border-t border-white/5 relative">
             <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                   <motion.div {...reveal}>
                      <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-10" style={{ fontSize: aboutUsTitleFontSize ? `${aboutUsTitleFontSize}px` : undefined }}>{aboutUsTitle || "AGENCY PHILOSOPHY"}</h2>
                      <h3 className="text-5xl md:text-8xl font-black mb-16 leading-none italic tracking-tighter">Beyond The Ordinary.</h3>
                      <div className="space-y-10 text-xl font-medium text-slate-400 leading-relaxed border-l-2 border-amber-400 pl-12 max-w-lg">
                         <p style={{ fontSize: bioFontSize ? `${bioFontSize}px` : undefined }}>{bio || "Aura is born from the belief that an event is more than a gathering—it is a designed environment for transformation. We blend technology, physical space, and human psychology."}</p>
                         <p className="text-white">"We don't meet expectations. We define them."</p>
                      </div>
                   </motion.div>
                   <motion.div 
                     className="relative aspect-square grayscale"
                     {...reveal}
                     transition={{ delay: 0.2 }}
                   >
                       <Image 
                         src={aboutImage || "/images/templates/template-img-39.jpg"}
                         alt="Work Context"
                         fill
                         className="object-cover rounded-[4rem] border-2 border-white/10"
                       />
                       <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 to-transparent"></div>
                   </motion.div>
                </div>
             </div>
          </section>

          {/* Capabilities */}
          <section id="services" className="py-48 px-8 bg-slate-900 rounded-[5rem] mx-4 md:mx-12">
             <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-10">
                   <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter">CORE POWER.</h2>
                   <p className="text-slate-400 font-bold max-w-xs text-right">01//Planning 02//Design 03//Execution</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-40">
                   {displayServices.map((service, idx) => (
                     <motion.div 
                       key={idx} 
                       className="group"
                       {...reveal}
                       transition={{ delay: idx * 0.1 }}
                     >
                        <div className="relative aspect-[16/9] mb-12 overflow-hidden rounded-[3rem]">
                           <Image 
                             src={service.image || "/images/templates/template-img-40.jpg"} 
                             alt={service.name || "Service"} 
                             fill 
                             className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                           />
                           <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors"></div>
                        </div>
                        <div className="flex gap-8 items-start">
                           <span className="text-4xl font-black font-serif italic text-amber-400">0{idx+1}</span>
                           <div>
                              <h4 className="text-3xl font-black mb-4 uppercase tracking-tighter" style={{ fontSize: service.nameFontSize ? `${service.nameFontSize}px` : undefined }}>{service.name}</h4>
                              <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-md" style={{ fontSize: service.descFontSize ? `${service.descFontSize}px` : undefined }}>{service.desc}</p>
                           </div>
                        </div>
                     </motion.div>
                   ))}
                </div>
             </div>
          </section>

          {/* Portfolio Grid */}
          <section id="work" className="py-48 px-8">
             <div className="container mx-auto">
                <div className="text-center mb-32">
                   <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-8">Selected Case Studies</h2>
                   <h3 className="text-5xl md:text-[6rem] font-black leading-none tracking-tighter">PROOF OF CONCEPT.</h3>
                </div>

                <div className="space-y-12">
                   {displayProjects.map((project, idx) => (
                     <motion.div 
                        key={idx} 
                        className="group relative h-[80vh] w-full rounded-[4rem] overflow-hidden border border-white/5"
                        {...reveal}
                     >
                        <Image 
                          src={project.image || "/images/templates/template-img-41.jpg"} 
                          alt={project.name || "Event"} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                        <div className="absolute bottom-20 left-20 right-20 flex flex-col md:flex-row justify-between items-end">
                           <div className="max-w-xl">
                              <h4 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter italic" style={{ fontSize: project.nameFontSize ? `${project.nameFontSize}px` : undefined }}>{project.name}</h4>
                              <p className="text-xl text-slate-300 font-medium" style={{ fontSize: project.descFontSize ? `${project.descFontSize}px` : undefined }}>{project.desc}</p>
                           </div>
                           <button className="hidden lg:block px-12 py-5 bg-amber-400 text-slate-950 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white transition-all transform group-hover:translate-x-4">
                              Explore Study
                           </button>
                        </div>
                     </motion.div>
                   ))}
                </div>
             </div>
          </section>
        </main>

        {/* Impactful Footer */}
        <footer id="contact" className="bg-white text-slate-950 py-48 rounded-t-[8rem]">
           <div className="container mx-auto px-8">
              <div className="flex flex-col lg:flex-row items-end gap-20 mb-32">
                 <h4 className="text-7xl md:text-[12rem] font-black leading-[0.85] tracking-tighter lg:w-2/3">PROJECT BRIEF?</h4>
                 <div className="lg:w-1/3 text-right">
                    <p className="text-2xl font-black mb-10 italic">Let's talk about the next landmark event.</p>
                    <div className="space-y-4">
                       <p className="text-lg font-black">{displayEmail}</p>
                       <p className="text-lg font-black">{displayPhone}</p>
                    </div>
                 </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-20 border-t border-slate-950 pt-24 pb-12">
                 <div>
                    <h5 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-slate-400">Headquarters</h5>
                    <p className="text-xl font-bold max-w-xs">{address || "Creative District, Studio 7A, New York"}</p>
                 </div>
                 <div>
                    <h5 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-slate-400">Collaborations</h5>
                    <div className="flex gap-10 text-sm font-black uppercase tracking-widest underline underline-offset-8">
                       <span>Press</span>
                       <span>Careers</span>
                    </div>
                 </div>
                 <div className="text-right">
                    <h5 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-slate-400">Presence</h5>
                    <div className="flex gap-10 justify-end text-sm font-black uppercase tracking-widest underline underline-offset-8">
                       <span>In</span>
                       <span>Be</span>
                       <span>Tw</span>
                    </div>
                 </div>
              </div>

              <div className="pt-24 flex justify-between items-center opacity-30 text-[10px] font-bold uppercase tracking-[0.5em]">
                 <span>{footerCopyright || `© ${new Date().getFullYear()} Aura Agency`}</span>
                 <span>All Rights Reserved. Digital First.</span>
              </div>
           </div>
        </footer>
      </div>
    </TemplateLayout>
  );
}
