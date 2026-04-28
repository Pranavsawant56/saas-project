import TemplateLayout from "./TemplateLayout";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function EventTemplate3({ data }) {
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

  const displayAgency = agencyName || "Party Pros Management";
  const displayTagline = tagline || "The Life of Every Celebration";
  const displayEmail = contactEmail || "party@pros.com";
  const displayPhone = phone ? `${countryCode?.split(' ')[0] || ''} ${phone}`.trim() : (phone || "+1 555 PARTY");

  const displayServices = services || [
    { name: 'Luxury Weddings', desc: 'Crafting the most romantic and seamless big days.', image: '/images/templates/template-img-42.jpg' },
    { name: 'Gala Parties', desc: 'High-energy social events that guests never forget.', image: '/images/templates/template-img-37.jpg' }
  ];

  const displayProjects = projects || [
    { name: 'The Emerald Ball', desc: 'A 500-guest charity gala in the heart of London.', image: '/images/templates/template-img-43.jpg' },
    { name: 'Oceanic Wedding', desc: 'A three-day coastal celebration in Mykonos.', image: '/images/templates/template-img-39.jpg' }
  ];

  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const fadeIn = {
    initial: { opacity: 0, scale: 0.95 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <TemplateLayout data={data} theme="light" category="Event Management" hideHeader={true} hideFooter={true}>
      <div className="scroll-smooth bg-[#fffaf5] text-[#3d2c1f] flex flex-col min-h-screen font-sans selection:bg-[#ffcfb9] selection:text-[#3d2c1f]">
        
        {/* Playful Floating Header */}
        <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-auto">
          <div className="bg-white/80 backdrop-blur-xl border border-[#ffcfb9] px-8 py-3 rounded-full flex gap-10 items-center justify-between shadow-lg shadow-[#ffcfb9]/20">
            <div className="flex items-center gap-4">
              {headerType === "Image" ? (
                logoUrl ? (
                   <div className="relative h-8 w-8 rounded-full overflow-hidden">
                      <Image src={logoUrl} alt="Logo" fill className="object-cover" />
                   </div>
                ) : (
                   <span className="text-xl">✨</span>
                )
              ) : (
                <span className="text-sm font-black uppercase text-[#ff8e51] tracking-widest" style={{ fontSize: agencyNameFontSize ? `${agencyNameFontSize}px` : undefined }}>{displayAgency}</span>
              )}
            </div>
            <nav className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-widest text-[#a89689]">
              <a href="#about" className="hover:text-[#ff8e51] transition-colors">Our Story</a>
              <a href="#services" className="hover:text-[#ff8e51] transition-colors">Capibilities</a>
              <a href="#projects" className="hover:text-[#ff8e51] transition-colors">Successes</a>
              <a href="#contact" className="hover:text-[#ff8e51] transition-colors">Say Hi</a>
            </nav>
          </div>
        </header>

        <main className="flex-1" ref={targetRef}>
          {/* Festive Hero */}
          <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#ffcfb9]/10">
            <motion.div 
              style={{ opacity, scale }}
              className="absolute inset-0 z-0"
            >
              <Image 
                src={heroImage || "/images/templates/template-img-44.jpg"}
                alt="Event Celebration"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fffaf5]/20 to-[#fffaf5]"></div>
            </motion.div>
            
            <div className="relative text-center z-10 px-6">
              <motion.div
                initial={{ rotate: -5, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="inline-block bg-[#ff8e51] text-white px-8 py-2 rounded-full font-black text-xs uppercase tracking-[0.3em] mb-12 shadow-xl"
              >
                {displayTagline}
              </motion.div>
              <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter text-[#3d2c1f]">
                {heroTitle || "We Plan. You Party."}
              </h1>
              <div className="flex justify-center gap-4 text-4xl mb-12">
                 <span>🎈</span>
                 <span>✨</span>
                 <span>🥂</span>
              </div>
            </div>

            {/* Organic Shapes */}
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#ffcfb9]/40 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#ffcfb9]/30 rounded-full blur-[100px] animate-pulse"></div>
          </section>

          {/* Agency Story */}
          <section id="about" className="py-32 px-6">
             <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                   <motion.div className="relative" {...fadeIn}>
                       <div className="mask-blob absolute inset-0 bg-[#ffcfb9]/40 -rotate-6"></div>
                       <div className="relative aspect-square overflow-hidden rounded-[4rem] border-8 border-white shadow-2xl rotate-3">
                          <Image 
                            src={aboutImage || "/images/templates/template-img-43.jpg"}
                            alt="Agency Team"
                            fill
                            className="object-cover"
                          />
                       </div>
                       <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white p-6 rounded-3xl shadow-2xl animate-bounce-slow border border-[#ffcfb9]/20 hidden md:flex flex-col items-center justify-center text-center">
                          <span className="text-4xl mb-4">🥂</span>
                          <p className="text-[10px] font-black uppercase tracking-widest leading-tight">Host With<br/>The Best</p>
                       </div>
                   </motion.div>

                   <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
                      <span className="text-[#a89689] font-black uppercase tracking-[0.5em] text-[10px] mb-8 block">{aboutUsTitle || "HOW WE WORK"}</span>
                      <h2 className="text-5xl md:text-7xl font-black mb-10 leading-none text-[#3d2c1f]">Your Big Vision. Our Small Details.</h2>
                      <p className="text-xl text-[#8d7c6f] leading-relaxed mb-12 font-medium italic">
                        {bio || "We don't just manage bookings; we manage memories. From the first sketch of your event to the last guest's departure, we're your silent partner in perfection. Every celebration is a unique story, and we make sure it's told beautifully."}
                      </p>
                      <button className="px-10 py-5 bg-[#3d2c1f] text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-[#ff8e51] transition-all transform hover:-rotate-3 shadow-xl">
                         Meet the Pros
                      </button>
                   </motion.div>
                </div>
             </div>
          </section>

          {/* Vibrant Services */}
          <section id="services" className="py-32 bg-[#ffcfb9]/5 px-6">
             <div className="container mx-auto">
                <div className="text-center mb-24">
                   <h2 className="text-5xl md:text-7xl font-black mb-6 italic">What We Do Best.</h2>
                   <p className="text-[#a89689] text-xl font-bold uppercase tracking-widest leading-none">Complete Celebration Management</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                   {displayServices.map((service, idx) => (
                     <motion.div 
                       key={idx} 
                       className="p-10 bg-white rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.03)] border border-[#ffcfb9]/30 hover:-translate-y-4 transition-all duration-500 group"
                       {...fadeIn}
                       transition={{ delay: idx * 0.1 }}
                     >
                        <div className="relative h-72 w-full mb-10 rounded-[2rem] overflow-hidden group-hover:rotate-2 transition-transform">
                           <Image 
                              src={service.image || "/images/templates/template-img-34.jpg"} 
                              alt={service.name || "Service"} 
                              fill 
                              className="object-cover" 
                           />
                        </div>
                        <h4 className="text-3xl font-black mb-4">{service.name}</h4>
                        <p className="text-[#8d7c6f] font-medium mb-6 leading-relaxed">{service.desc}</p>
                        <div className="h-1 w-12 bg-[#ffcfb9] group-hover:w-full transition-all duration-500"></div>
                     </motion.div>
                   ))}
                </div>
             </div>
          </section>

          {/* Project Successes */}
          <section id="projects" className="py-32 px-6">
             <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                   <div>
                      <h2 className="text-sm font-black uppercase tracking-[0.5em] text-[#a89689] mb-4">Past Work</h2>
                      <h3 className="text-5xl md:text-7xl font-black">History Of Success.</h3>
                   </div>
                   <p className="text-xl font-bold max-w-sm text-right opacity-30 italic">Browse our favorite moments.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                   {displayProjects.map((project, idx) => (
                     <motion.div 
                       key={idx} 
                       className="group relative h-[600px] rounded-[4rem] overflow-hidden shadow-2xl"
                       {...fadeIn}
                       transition={{ delay: idx * 0.2 }}
                     >
                        <Image 
                           src={project.image || "/images/templates/template-img-43.jpg"} 
                           alt={project.name || "Event Success"} 
                           fill 
                           className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#3d2c1f] via-transparent to-transparent"></div>
                        <div className="absolute bottom-12 left-12 right-12 text-white">
                           <h4 className="text-4xl font-black mb-4 uppercase tracking-tighter italic">{project.name}</h4>
                           <p className="text-white/70 text-lg max-w-md">{project.desc}</p>
                        </div>
                     </motion.div>
                   ))}
                </div>
             </div>
          </section>
        </main>

        {/* Funky Agency Footer */}
        <footer id="contact" className="bg-[#3d2c1f] text-[#fffaf5] pt-32 pb-16 px-6 rounded-t-[5rem]">
           <div className="container mx-auto max-w-6xl">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-20 mb-32">
                 <div className="text-center lg:text-left">
                    <h3 className="text-5xl font-black mb-8 italic">{displayAgency}</h3>
                    <p className="text-[#a89689] text-xl max-w-sm font-medium">Ready to celebrate? We're available for bookings globally. Let's make it unforgettable.</p>
                 </div>
                 <div className="flex flex-col items-center lg:items-end gap-10">
                    <div className="flex gap-4">
                       <span className="bg-[#ff8e51] p-4 rounded-full text-2xl shadow-lg">📸</span>
                       <span className="bg-[#a89689] p-4 rounded-full text-2xl shadow-lg">🕺</span>
                       <span className="bg-white p-4 rounded-full text-2xl shadow-lg text-[#3d2c1f]">🎁</span>
                    </div>
                    <div className="text-center lg:text-right">
                       <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-[#ff8e51]">Available Worldwide</p>
                       <p className="text-3xl font-black mb-1">{displayPhone}</p>
                       <p className="text-xl font-bold opacity-60 italic">{displayEmail}</p>
                    </div>
                 </div>
              </div>

              <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
                 <span className="text-[10px] font-black uppercase tracking-widest">{footerCopyright || `© ${new Date().getFullYear()} ${displayAgency}`}</span>
                 <p className="text-[10px] font-black uppercase tracking-widest italic">{address || "Beachside HQ, Miami & Ibiza"}</p>
              </div>
           </div>
        </footer>

        <style jsx>{`
          .mask-blob {
             border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          @keyframes bounce-slow {
             0%, 100% { transform: translateY(0) rotate(3deg); }
             50% { transform: translateY(-10px) rotate(-3deg); }
          }
          .animate-bounce-slow {
             animation: bounce-slow 4s ease-in-out infinite;
          }
        `}</style>
      </div>
    </TemplateLayout>
  );
}
