import TemplateLayout from "./TemplateLayout";
import Image from "next/image";

export default function DoctorTemplate3({ data }) {
  const {
    clinicName,
    heroTitle,
    specialty,
    heroImage,
    bio,
    aboutUsTitle,
    aboutImage,
    education,
    experience,
    contactEmail,
    phone,
    countryCode,
    address,
    workingHours,
    headerType,
    logoUrl,
    clinicNameFontSize,
    heroTitleFontSize,
    specialtyFontSize,
    services,
    footerCopyright
  } = data || {};

  const displayEmail = contactEmail || "surgical.elite@medical.com";
  const displayPhone = phone ? `${countryCode?.split(' ')[0] || ''} ${phone}`.trim() : (phone || "+1 800 PRECISION");
  const displayLocation = address || "101 Surgical Plaza, Houston TX";
  const displayName = clinicName || "Precision Surgical";

  const displayServices = services || [
    { name: 'Orthopedics', desc: 'Advanced joint replacement and reconstruction.' },
    { name: 'Neurosurgery', desc: 'Precision care for complex neurological cases.' },
    { name: 'Cardiothoracic', desc: 'State-of-the-art cardiovascular intervention.' }
  ];

  return (
    <TemplateLayout data={data} theme="dark" category="Doctor" hideHeader={true} hideFooter={true}>
      <div className="scroll-smooth bg-slate-950 text-slate-200 flex flex-col min-h-screen font-sans">
        
        {/* Technical Header */}
        <header className="w-full bg-slate-900 border-b border-cyan-500/20 sticky top-0 z-50">
          <div className="container mx-auto px-10 py-5 flex justify-between items-center">
            <div className="flex items-center gap-4">
              {headerType === "Image" ? (
                logoUrl ? (
                  <div className="relative h-10 w-44">
                    <Image src={logoUrl} alt={displayName} fill className="object-contain" />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-cyan-600 rounded flex items-center justify-center text-white font-black">P</div>
                )
              ) : (
                <span 
                  className="text-2xl font-black uppercase tracking-tighter text-white"
                  style={{ fontSize: clinicNameFontSize ? `${clinicNameFontSize}px` : undefined }}
                >
                  {displayName}
                </span>
              )}
              <div className="h-6 w-[1px] bg-slate-700 hidden md:block"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400 hidden md:block">Precision Excellence</span>
            </div>

            <nav className="hidden lg:flex gap-10 items-center font-black text-xs uppercase tracking-widest text-slate-400">
              <a href="#home" className="hover:text-cyan-400 transition-all">Command</a>
              <a href="#expertise" className="hover:text-cyan-400 transition-all">Expertise</a>
              <a href="#about" className="hover:text-cyan-400 transition-all">Specialist</a>
              <a href="#contact" className="bg-cyan-600 text-white px-8 py-3 rounded-none hover:bg-cyan-500 transition-all shadow-[0_0_20px_rgba(8,145,178,0.3)]">Establish Connection</a>
            </nav>
          </div>
        </header>

        <main className="flex-1">
          {/* Split Hero Section */}
          <section id="home" className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[800px] border-b border-slate-900">
            <div className="flex flex-col justify-center px-10 lg:px-20 py-20 bg-slate-950">
              <div className="w-20 h-1.5 bg-cyan-600 mb-10"></div>
              <span 
                className="text-cyan-500 font-black uppercase tracking-[0.4em] text-xs mb-6 block"
                style={{ fontSize: specialtyFontSize ? `${specialtyFontSize}px` : undefined }}
              >
                {specialty || "Elite Surgical Specialist"}
              </span>
              <h1 
                className="text-6xl md:text-8xl font-black text-white mb-10 leading-[0.95] tracking-tighter"
                style={{ fontSize: heroTitleFontSize ? `${heroTitleFontSize}px` : undefined }}
              >
                {heroTitle || "Precision. Technical. Mastery."}
              </h1>
              <p className="text-xl text-slate-400 mb-12 leading-relaxed max-w-lg border-l border-slate-800 pl-8">
                Utilizing the world's most advanced surgical robotics and imaging technology to ensure absolute outcomes.
              </p>
              <div className="flex flex-wrap gap-6">
                <button className="px-10 py-5 bg-white text-slate-950 font-black text-xs uppercase tracking-widest hover:bg-cyan-400 transition-all">
                  Technical Data
                </button>
                <button className="px-10 py-5 border border-slate-700 font-black text-xs uppercase tracking-widest hover:border-cyan-400 transition-all">
                  Consultation
                </button>
              </div>
            </div>

            <div className="relative overflow-hidden group min-h-[400px] lg:min-h-full">
               <Image 
                src={heroImage || "/images/templates/template-img-29.jpg"}
                alt="Surgical Precision"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-2000"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-cyan-900/10 mix-blend-overlay"></div>
              
              {/* Floating UI Elements */}
              <div className="absolute bottom-10 left-10 p-8 bg-slate-900/80 backdrop-blur-xl border-l-4 border-cyan-500 shadow-2xl max-w-xs">
                 <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-2">Live Status</p>
                 <p className="text-sm font-bold text-white mb-4 italic">"Zero margin for error. Absolute commitment to recovery."</p>
                 <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                 </div>
              </div>
            </div>
          </section>

          {/* Technical Grid */}
          <section id="expertise" className="py-32 bg-slate-900 px-10">
            <div className="container mx-auto">
               <div className="flex flex-col md:flex-row items-end justify-between gap-10 mb-24 border-b border-slate-800 pb-12">
                  <div className="max-w-xl">
                    <h2 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.5em] mb-4">Functional Capabilities</h2>
                    <h3 className="text-5xl font-black text-white mb-0">Surgical Expertise.</h3>
                  </div>
                  <p className="text-slate-500 text-sm font-bold max-w-sm">Every procedure is architected with meticulous planning and executed with supreme technical skill.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-slate-800">
                  {displayServices.map((val, idx) => (
                    <div key={idx} className="p-12 border-slate-800 odd:bg-slate-950/30 even:bg-slate-950 hover:bg-cyan-950/20 transition-all border-r border-b group">
                       <div className="flex justify-between items-start mb-8">
                          <div className="text-4xl text-cyan-600 font-black opacity-20 group-hover:opacity-100 transition-opacity">0{idx+1}</div>
                          {val.image && (
                            <div className="relative w-12 h-12 rounded border border-slate-800 overflow-hidden group-hover:border-cyan-500 transition-colors">
                              <Image src={val.image} alt={val.name} fill className="object-cover" />
                            </div>
                          )}
                       </div>
                       <h4 className="text-3xl font-black text-white mb-6 tracking-tighter">{val.name}</h4>
                       <p className="text-slate-500 leading-relaxed text-sm mb-10">{val.desc}</p>
                       <div className="w-12 h-1 bg-slate-800 group-hover:w-full group-hover:bg-cyan-600 transition-all duration-500"></div>
                    </div>
                  ))}
               </div>
            </div>
          </section>

          {/* Specialist Section */}
          <section id="about" className="py-32 bg-slate-950 px-10">
             <div className="container mx-auto flex flex-col lg:flex-row items-stretch gap-0 border border-slate-800">
                <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-[600px]">
                   <Image 
                     src={aboutImage || "/images/templates/template-img-30.jpg"}
                     alt="The Specialist"
                     fill
                     className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                   />
                </div>
                <div className="w-full lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center">
                   <span className="text-[10px] font-black text-cyan-600 uppercase tracking-widest mb-10">{aboutUsTitle || "Lead Surgeon"}</span>
                   <h3 className="text-5xl lg:text-7xl font-black text-white mb-10 tracking-tight leading-none">Unrivaled Experience.</h3>
                   <p className="text-lg text-slate-400 mb-12 leading-relaxed border-l-4 border-cyan-600 pl-8 font-medium italic">
                     {bio || "With a career spanning over two decades at the forefront of surgical innovation, we provide a level of expertise that sets the global standard for patient care and technical outcome."}
                   </p>
                   
                   <div className="grid grid-cols-2 gap-12 pt-12 border-t border-slate-800">
                      <div>
                         <p className="text-sm font-black uppercase text-slate-500 mb-2">Experience</p>
                         <p className="text-3xl font-black text-white">{experience || "25"}+ Years</p>
                      </div>
                      <div>
                         <p className="text-sm font-black uppercase text-slate-500 mb-2">Credentials</p>
                         <p className="text-sm font-bold text-slate-300 italic">{education || "Fellowship Trained FACS"}</p>
                      </div>
                   </div>
                </div>
             </div>
          </section>
        </main>

        <footer id="contact" className="bg-slate-900 py-32 px-10">
           <div className="container mx-auto">
              <div className="flex flex-col lg:flex-row justify-between items-start gap-16">
                 <div className="max-w-md">
                    <h4 className="text-2xl font-black text-white mb-8 tracking-tighter uppercase">{displayName}</h4>
                    <p className="text-slate-500 text-sm mb-12 leading-relaxed">
                       Architecting the future of medical precision. Elite surgical solutions for a global patient base.
                    </p>
                    <div className="flex gap-4">
                       <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-cyan-600 cursor-pointer transition-all">𝑓</div>
                       <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-cyan-600 cursor-pointer transition-all">𝕏</div>
                       <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-cyan-600 cursor-pointer transition-all">𝑖𝑛</div>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                    <div>
                       <h5 className="text-[10px] font-black text-cyan-600 uppercase tracking-widest mb-8">Access</h5>
                       <div className="space-y-6">
                          <div className="flex flex-col">
                             <span className="text-[9px] uppercase font-bold text-slate-600 mb-1">Terminal</span>
                             <span className="text-sm text-slate-300">{displayPhone}</span>
                          </div>
                          <div className="flex flex-col">
                             <span className="text-[9px] uppercase font-bold text-slate-600 mb-1">Network</span>
                             <span className="text-sm text-slate-300">{displayEmail}</span>
                          </div>
                       </div>
                    </div>
                    <div>
                       <h5 className="text-[10px] font-black text-cyan-600 uppercase tracking-widest mb-8">Installation</h5>
                       <div className="flex flex-col">
                          <span className="text-[9px] uppercase font-bold text-slate-600 mb-1">Location</span>
                          <span className="text-sm text-slate-300">{displayLocation}</span>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="mt-24 pt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
                 <span className="text-[10px] font-black uppercase text-slate-700 tracking-widest">{data.footerCopyright || `© ${new Date().getFullYear()} Precision Systems`}</span>
                 <span className="text-[10px] font-black uppercase text-cyan-900 tracking-[1em]">Absolute Precision Absolute Outcome</span>
              </div>
           </div>
        </footer>
      </div>
    </TemplateLayout>
  );
}
