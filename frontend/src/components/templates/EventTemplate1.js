import TemplateLayout from "./TemplateLayout";
import Image from "next/image";
import { motion } from "framer-motion";

export default function EventTemplate1({ data }) {
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

  const displayAgency = agencyName || "Elite Event Management";
  const displayTagline = tagline || "Excellence in Every Detail";
  const displayPhone = phone ? `${countryCode?.split(' ')[0] || ''} ${phone}`.trim() : (phone || "+1 800 ELITE");
  
  const displayServices = services || [
    { name: 'Corporate Planning', desc: 'Seamless logistics for large-scale corporate summits.', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600' },
    { name: 'VIP Concierge', desc: 'Personalized experiences for your high-profile guests.', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=600' }
  ];

  const displayProjects = projects || [
    { name: 'Global Tech Expo', desc: 'Managed for 10,000+ attendees.', image: 'https://images.unsplash.com/photo-1540575861501-7c0f110f6f21?auto=format&fit=crop&q=80&w=800' },
    { name: 'Luxury Auto Launch', desc: 'An immersive brand experience.', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800' }
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <TemplateLayout data={data} theme="light" category="Event Management" hideHeader={true} hideFooter={true}>
      <div className="scroll-smooth bg-white text-slate-900 flex flex-col min-h-screen font-sans tracking-tight">
        
        {/* Corporate Header */}
        <header className="w-full bg-white border-b border-slate-100 sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              {headerType === "Image" ? (
                logoUrl ? (
                  <div className="relative h-10 w-32">
                    <Image src={logoUrl} alt="Agency Logo" fill className="object-contain" />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-slate-900 rounded flex items-center justify-center text-white font-bold">E</div>
                )
              ) : (
                <div className="flex flex-col">
                  <span className="text-xl font-black uppercase tracking-tighter leading-none" style={{ fontSize: agencyNameFontSize ? `${agencyNameFontSize}px` : undefined }}>{displayAgency}</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1" style={{ fontSize: taglineFontSize ? `${taglineFontSize}px` : undefined }}>{displayTagline}</span>
                </div>
              )}
            </div>
            <nav className="hidden md:flex gap-8 items-center text-xs font-bold uppercase tracking-widest text-slate-500">
               <a href="#services" className="hover:text-slate-900 transition-colors">Services</a>
               <a href="#portfolio" className="hover:text-slate-900 transition-colors">Portfolio</a>
               <a href="#contact" className="bg-slate-900 text-white px-6 py-2 rounded shadow-lg hover:bg-slate-800 transition-all">Get Proposal</a>
            </nav>
          </div>
        </header>

        <main className="flex-1">
          {/* Professional Hero */}
          <section className="relative min-h-[80vh] flex items-center bg-slate-50 overflow-hidden">
             <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                   <span className="inline-block px-4 py-1 rounded-full bg-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-widest mb-6">
                      Event Management Experts
                   </span>
                   <h1 className="text-5xl md:text-7xl font-black text-slate-950 mb-8 leading-[1.1]" style={{ fontSize: heroTitleFontSize ? `${heroTitleFontSize}px` : undefined }}>
                      {heroTitle || "We Manage Complexity, You Enjoy Success."}
                   </h1>
                   <p className="text-xl text-slate-500 mb-10 max-w-lg leading-relaxed">
                      From international summits to exclusive corporate retreats, we provide the strategic planning and creative vision to make every event a landmark success.
                   </p>
                   <div className="flex gap-4">
                      <button className="px-8 py-4 bg-slate-900 text-white font-bold rounded shadow-xl hover:translate-y-[-2px] transition-all">See Our Work</button>
                      <button className="px-8 py-4 border-2 border-slate-200 font-bold rounded hover:bg-slate-100 transition-all">Client Portals</button>
                   </div>
                </motion.div>
                <motion.div 
                   className="relative h-[600px] hidden lg:block"
                   initial={{ opacity: 0, x: 50 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.8 }}
                >
                   <div className="absolute inset-x-10 bottom-0 top-10 border-2 border-slate-200 rounded-2xl"></div>
                   <Image 
                     src={heroImage || "https://images.unsplash.com/photo-1540575861501-7c0f110f6f21?auto=format&fit=crop&q=80&w=1200"}
                     alt="Management Action"
                     fill
                     className="object-cover rounded-2xl shadow-2xl relative z-10 -rotate-2 hover:rotate-0 transition-transform duration-700"
                   />
                </motion.div>
             </div>
             {/* Decorative Background */}
             <div className="absolute top-0 right-0 w-1/3 h-full bg-white skew-x-12 translate-x-20 border-l border-slate-100"></div>
          </section>

          {/* About Agency */}
          <section className="py-32 px-6">
             <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <motion.div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl" {...fadeIn}>
                   <Image 
                     src={aboutImage || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800"}
                     alt="Agency Portfolio"
                     fill
                     className="object-cover hover:scale-105 transition-transform duration-1000"
                   />
                </motion.div>
                <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
                   <h2 className="text-sm font-black uppercase tracking-[0.4em] text-slate-400 mb-6" style={{ fontSize: aboutUsTitleFontSize ? `${aboutUsTitleFontSize}px` : undefined }}>{aboutUsTitle || "Our Agency Story"}</h2>
                   <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">Mastering The Art Of Logistics.</h3>
                   <div className="space-y-6 text-lg text-slate-500 leading-relaxed">
                      <p style={{ fontSize: bioFontSize ? `${bioFontSize}px` : undefined }}>{bio || "For over a decade, we have been the trusted partner for organizations looking to push the boundaries of what an event can be. We don't just plan events; we engineer environments that foster connection and drive results."}</p>
                      <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                         <div>
                            <p className="text-3xl font-black text-slate-950">500+</p>
                            <p className="text-xs uppercase font-bold text-slate-400 tracking-widest mt-1">Events Managed</p>
                         </div>
                         <div>
                            <p className="text-3xl font-black text-slate-950">98%</p>
                            <p className="text-xs uppercase font-bold text-slate-400 tracking-widest mt-1">Client Retention</p>
                         </div>
                      </div>
                   </div>
                </motion.div>
             </div>
          </section>

          {/* Specialized Services */}
          <section id="services" className="py-32 bg-slate-950 text-white px-6">
             <div className="container mx-auto">
                <div className="max-w-2xl mb-24">
                   <h2 className="text-4xl md:text-6xl font-black mb-8 italic">End-to-End Solutions.</h2>
                   <p className="text-slate-400 text-lg">Our comprehensive management suite covers every aspect of the event lifecycle, ensuring zero-defect execution.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                   {displayServices.map((service, idx) => (
                     <motion.div 
                       key={idx} 
                       className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group"
                       {...fadeIn}
                       transition={{ delay: idx * 0.1 }}
                     >
                        <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-8 border border-white/10 group-hover:bg-white group-hover:text-slate-900 transition-colors">
                           <span className="font-bold">{idx + 1}</span>
                        </div>
                        <h4 className="text-xl font-bold mb-4" style={{ fontSize: service.nameFontSize ? `${service.nameFontSize}px` : undefined }}>{service.name}</h4>
                        <p className="text-sm text-slate-400 leading-relaxed" style={{ fontSize: service.descFontSize ? `${service.descFontSize}px` : undefined }}>{service.desc}</p>
                     </motion.div>
                   ))}
                </div>
             </div>
          </section>

          {/* Case Studies / Portfolio */}
          <section id="portfolio" className="py-32 px-6">
             <div className="container mx-auto">
                <div className="text-center mb-24">
                   <h2 className="text-sm font-black uppercase tracking-[0.5em] text-slate-400 mb-4">Case Studies</h2>
                   <h3 className="text-5xl font-black text-slate-900 leading-none">Notable Accomplishments.</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                   {displayProjects.map((project, idx) => (
                     <motion.div 
                       key={idx} 
                       className="relative h-[500px] rounded-[2rem] overflow-hidden group shadow-2xl"
                       {...fadeIn}
                       transition={{ delay: idx * 0.2 }}
                     >
                        <Image src={project.image} alt={project.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                        <div className="absolute bottom-12 left-12 right-12">
                           <h4 className="text-3xl font-black text-white mb-4" style={{ fontSize: project.nameFontSize ? `${project.nameFontSize}px` : undefined }}>{project.name}</h4>
                           <p className="text-white/70 text-lg max-w-sm" style={{ fontSize: project.descFontSize ? `${project.descFontSize}px` : undefined }}>{project.desc}</p>
                           <button className="mt-8 text-white font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 group-hover:gap-4 transition-all pb-1 border-b border-white/30">
                              View Project ➔
                           </button>
                        </div>
                     </motion.div>
                   ))}
                </div>
             </div>
          </section>
        </main>

        {/* Agency Footer */}
        <footer className="bg-slate-50 border-t border-slate-100 py-24 px-6 mt-32">
           <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
                 <div className="col-span-1 lg:col-span-2">
                    <span className="text-2xl font-black uppercase tracking-tighter mb-8 block">{displayAgency}</span>
                    <p className="text-slate-500 text-lg max-w-md leading-relaxed italic">
                      Turning ambitious visions into seamless realities through precision management and creative strategy.
                    </p>
                 </div>
                 <div>
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8 font-black">Contact HQ</h5>
                    <div className="space-y-4 font-bold text-slate-700">
                       <p>{displayPhone}</p>
                       <p>{contactEmail || "hello@agency.com"}</p>
                    </div>
                 </div>
                 <div>
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8 font-black">Destination</h5>
                    <p className="font-bold text-slate-700 leading-relaxed">{address || "Global HQ, 123 Event Lane, City Center"}</p>
                 </div>
              </div>
              <div className="pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
                 <span className="text-[10px] font-black uppercase tracking-widest">{footerCopyright || `© ${new Date().getFullYear()} ${displayAgency}`}</span>
                 <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest">
                    <span className="cursor-pointer hover:text-slate-950 transition-colors">LinkedIn</span>
                    <span className="cursor-pointer hover:text-slate-950 transition-colors">Instagram</span>
                    <span className="cursor-pointer hover:text-slate-950 transition-colors">Behance</span>
                 </div>
              </div>
           </div>
        </footer>
      </div>
    </TemplateLayout>
  );
}
