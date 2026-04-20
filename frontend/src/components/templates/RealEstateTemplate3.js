import TemplateLayout from "./TemplateLayout";
import Image from "next/image";
import { motion } from "framer-motion";

export default function RealEstateTemplate3({ data }) {
  const {
    agencyName,
    tagline,
    heroTitle,
    heroImage,
    bio,
    aboutUsTitle,
    aboutImage,
    projects,
    contactEmail,
    phone,
    address,
    headerType,
    logoUrl,
    footerCopyright
  } = data || {};

  const displayAgent = agencyName || "Jane Smith";
  const displayTagline = tagline || "Your Neighbor in Real Estate";
  const displayProperties = projects || [
    { name: 'Family Craftsman', desc: 'Willow Creek | $650,000', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800' },
    { name: 'Modern Farmhouse', desc: 'Oak Ridge | $720,000', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800' }
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <TemplateLayout data={data} theme="light" category="Real Estate" hideHeader={true} hideFooter={true}>
      <div className="bg-[#fffdfa] text-[#2d3a3a] min-h-screen font-sans selection:bg-[#065f46] selection:text-white">
        
        {/* Friendly Header */}
        <header className="w-full bg-white border-b border-[#f1f5f9] sticky top-0 z-50 shadow-sm">
          <div className="container mx-auto px-6 py-5 flex justify-between items-center">
            <div className="flex items-center gap-4">
              {headerType === "Image" ? (
                logoUrl ? (
                  <div className="relative h-12 w-32">
                    <Image src={logoUrl} alt="Logo" fill className="object-contain" />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-[#065f46] rounded-full flex items-center justify-center text-white font-bold text-xl">JS</div>
                )
              ) : (
                <div className="flex flex-col">
                  <span className="text-2xl font-black tracking-tight text-[#065f46] leading-none uppercase">{displayAgent}</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{displayTagline}</span>
                </div>
              )}
            </div>
            <nav className="hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-widest">
              <a href="#about" className="hover:text-[#065f46] transition-colors">My Story</a>
              <a href="#homes" className="hover:text-[#065f46] transition-colors">Homes</a>
              <a href="#contact" className="px-6 py-3 bg-[#065f46] text-white rounded-xl hover:bg-[#064e3b] transition-all shadow-lg shadow-[#065f46]/20">Let's Talk</a>
            </nav>
          </div>
        </header>

        <main>
          {/* Warm Hero */}
          <section className="py-20 px-6">
             <div className="container mx-auto max-w-6xl bg-white rounded-[3rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.05)] border border-[#f1f5f9] grid grid-cols-1 lg:grid-cols-2">
                <div className="p-12 lg:p-20 flex flex-col justify-center">
                   <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                   >
                      <h1 className="text-5xl md:text-7xl font-black text-[#065f46] mb-8 leading-[1.1] tracking-tight">
                         {heroTitle || "Home is where your story begins."}
                      </h1>
                      <p className="text-xl text-slate-500 mb-10 leading-relaxed font-medium">
                         Dedicated to helping you find more than just a house, but a community you love.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                         <button className="px-10 py-5 bg-[#065f46] text-white font-black rounded-2xl shadow-xl hover:-translate-y-1 transition-all uppercase text-xs tracking-widest">View Local Listings</button>
                         <button className="px-10 py-5 border-2 border-[#f1f5f9] font-black rounded-2xl hover:bg-slate-50 transition-all uppercase text-xs tracking-widest">Client Portal</button>
                      </div>
                   </motion.div>
                </div>
                <div className="relative h-[400px] lg:h-auto overflow-hidden">
                   <Image 
                     src={heroImage || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1200"}
                     alt="Suburban Street"
                     fill
                     className="object-cover"
                   />
                </div>
             </div>
          </section>

          {/* Personal Bio */}
          <section id="about" className="py-24 px-6">
             <div className="container mx-auto max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                   <motion.div className="relative" {...fadeIn}>
                      <div className="absolute -inset-4 bg-[#f8fafc] rounded-full rotate-3"></div>
                      <div className="relative aspect-square rounded-full overflow-hidden border-8 border-white shadow-2xl">
                         <Image 
                           src={aboutImage || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"}
                           alt="Agent Headshot"
                           fill
                           className="object-cover"
                         />
                      </div>
                      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#065f46] text-white rounded-full flex flex-col items-center justify-center shadow-2xl rotate-12 border-4 border-white">
                         <span className="text-3xl">🏠</span>
                         <span className="text-[10px] font-black uppercase tracking-widest mt-1">20+ Yrs</span>
                      </div>
                   </motion.div>
                   <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
                      <h2 className="text-[#065f46] text-xs font-black uppercase tracking-[0.4em] mb-6">{aboutUsTitle || "MEET YOUR AGENT"}</h2>
                      <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">I believe in people, not just properties.</h3>
                      <p className="text-lg text-slate-500 leading-relaxed font-medium italic">
                         {bio || "Growing up in Willow Creek, I saw firsthand how the right home can transform a family's life. Today, I use my deep local roots and professional expertise to match the right people with the right neighborhoods. My goal is simple: to make your move as stress-free and joyful as possible."}
                      </p>
                   </motion.div>
                </div>
             </div>
          </section>

          {/* Community Listings */}
          <section id="homes" className="py-24 px-6 bg-[#f8fafc]">
             <div className="container mx-auto max-w-6xl">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                   <div>
                      <h2 className="text-xs font-black uppercase tracking-[0.5em] text-slate-400 mb-4">The Neighborhood</h2>
                      <h3 className="text-5xl font-black text-[#065f46]">Latest To The Market.</h3>
                   </div>
                   <p className="text-lg font-bold text-[#065f46] flex items-center gap-2 cursor-pointer hover:underline underline-offset-4">Browse All Homes ➔</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                   {displayProperties.map((property, idx) => (
                     <motion.div 
                        key={idx} 
                        className="bg-white rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.03)] border border-[#f1f5f9] group"
                        {...fadeIn}
                        transition={{ delay: idx * 0.1 }}
                     >
                        <div className="relative h-80 overflow-hidden">
                           <Image 
                              src={property.image || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800"} 
                              alt={property.name} 
                              fill 
                              className="object-cover group-hover:scale-110 transition-transform duration-700" 
                           />
                           <div className="absolute inset-x-8 bottom-8">
                              <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl flex justify-between items-center shadow-lg">
                                 <span className="text-[#065f46] font-black">{property.desc.split('|')[0]}</span>
                                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Featured</span>
                              </div>
                           </div>
                        </div>
                        <div className="p-8">
                           <h4 className="text-3xl font-black mb-2 text-[#2d3a3a]">{property.name}</h4>
                           <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">{property.desc.split('|')[1] || "Neighborhood"}</p>
                        </div>
                     </motion.div>
                   ))}
                </div>
             </div>
          </section>
        </main>

        {/* Friendly Footer */}
        <footer id="contact" className="bg-[#2d3a3a] text-white py-24 px-6 rounded-t-[4rem]">
           <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
                 <div className="col-span-1 lg:col-span-2">
                    <span className="text-2xl font-black uppercase tracking-tight text-[#065f46] mb-8 block">{displayAgent}</span>
                    <p className="text-white/60 text-lg max-w-sm leading-relaxed font-medium italic">
                      "Real estate is about more than sales; it's about helping people build their future in a community that cares."
                    </p>
                 </div>
                 <div>
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-[#065f46] mb-8">Reach Out</h5>
                    <div className="space-y-4 font-bold">
                       <p>{phone || "123-456-7890"}</p>
                       <p>{contactEmail || "jane@willow.com"}</p>
                    </div>
                 </div>
                 <div>
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-[#065f46] mb-8">Office Link</h5>
                    <p className="font-bold opacity-60 leading-relaxed max-w-[200px]">{address || "Willow Creek Real Estate Office, Harbor Lane"}</p>
                 </div>
              </div>
              <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40 text-[10px] font-black uppercase tracking-[0.3em]">
                 <span>{footerCopyright || `© ${new Date().getFullYear()} ${displayAgent} Realty`}</span>
                 <div className="flex gap-10">
                    <span className="hover:text-white transition-colors cursor-pointer">Facebook</span>
                    <span className="hover:text-white transition-colors cursor-pointer">Realtor.com</span>
                    <span className="hover:text-white transition-colors cursor-pointer">Privacy</span>
                 </div>
              </div>
           </div>
        </footer>
      </div>
    </TemplateLayout>
  );
}
