import TemplateLayout from "./TemplateLayout";
import { motion } from "framer-motion";
import Image from "next/image";

export default function PortfolioTemplate3({ data }) {
  const {
    heroTitle,
    name,
    role,
    bio,
    avatarUrl,
    service1_name, service1_desc,
    service2_name, service2_desc,
    service3_name, service3_desc,
    service4_name, service4_desc,
    aboutUsTitle,
    aboutImage,
    nameFontSize,
    heroTitleFontSize,
    roleFontSize,
    bioFontSize,
    service1_nameFontSize, service1_descFontSize,
    service2_nameFontSize, service2_descFontSize,
    service3_nameFontSize, service3_descFontSize,
    service4_nameFontSize, service4_descFontSize,
    project1_nameFontSize, project1_descFontSize,
    project2_nameFontSize, project2_descFontSize,
    project3_nameFontSize, project3_descFontSize,
    services: dynamicServices,
    projects: dynamicProjects,
    phone,
    countryCode,
  } = data || {};

  const displayServices = dynamicServices || [
    { name: service1_name || 'Direction', desc: service1_desc || 'Setting the creative tone and vision.', nameFontSize: service1_nameFontSize, descFontSize: service1_descFontSize },
    { name: service2_name || 'Development', desc: service2_desc || 'Translating designs into reality.', nameFontSize: service2_nameFontSize, descFontSize: service2_descFontSize },
    { name: service3_name, desc: service3_desc, nameFontSize: service3_nameFontSize, descFontSize: service3_descFontSize },
    { name: service4_name, desc: service4_desc, nameFontSize: service4_nameFontSize, descFontSize: service4_descFontSize },
  ].filter(s => s.name);

  const displayProjects = dynamicProjects || [
    { name: data?.project1_name || 'Project Case Study 1', desc: data?.project1_desc || 'Comprehensive analysis and execution.', link: data?.project1_link, nameFontSize: project1_nameFontSize, descFontSize: project1_descFontSize },
    { name: data?.project2_name || 'Project Case Study 2', desc: data?.project2_desc || 'Digital excellence for high-impact clients.', link: data?.project2_link, nameFontSize: project2_nameFontSize, descFontSize: project2_descFontSize },
    { name: data?.project3_name, desc: data?.project3_desc, link: data?.project3_link, nameFontSize: project3_nameFontSize, descFontSize: project3_descFontSize },
  ].filter(p => p.name);

  return (
    <TemplateLayout data={data} theme="light" category="Portfolio" hideHeader={true} hideFooter={true}>
      <div id="home" className="min-h-screen bg-[#fafaf9] text-[#1a1a1a] font-serif selection:bg-indigo-100 selection:text-indigo-900 scroll-smooth flex flex-col">

        {/* Editorial Header - Unique for Portfolio 3 */}
        <header className="px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-baseline border-b border-black/10 mx-6 md:mx-12">
          <div
            className="text-4xl italic tracking-tighter mb-4 md:mb-0"
            style={{ fontSize: nameFontSize ? `${nameFontSize}px` : undefined }}
          >
            {name || "Portfolio"}
          </div>
          <nav className="flex gap-8 items-center font-sans text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
            {['Home', 'About', 'Skills', 'Projects'].map((item, idx) => (
              <div key={item} className="flex items-center gap-8">
                <a href={`#${item.toLowerCase()}`} className="hover:text-black transition-colors">{item}</a>
                {idx < 3 && <div className="hidden md:block w-8 h-[1px] bg-slate-200" />}
              </div>
            ))}
            <a href="#contact" className="ml-4 px-4 py-2 border border-black/10 rounded-full hover:bg-black hover:text-white transition-all lowercase italic font-serif text-sm tracking-normal">reach out</a>
          </nav>
        </header>

        <main className="flex-1 relative">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
            <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-200 blur-[120px] rounded-full" />
            <div className="absolute top-[60%] -right-[5%] w-[30%] h-[30%] bg-amber-100 blur-[100px] rounded-full" />
          </div>

          <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12 md:pt-24 pb-32 relative">

            {/* Hero Section - Asymmetrical & Bold */}
            <section className="mb-48">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                <div className="lg:col-span-8">
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="inline-block font-sans text-xs font-black uppercase tracking-[0.5em] mb-6 text-indigo-600"
                  >
                    Portfolio {new Date().getFullYear()}
                  </motion.span>
                  <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[15vw] lg:text-[12rem] leading-[0.85] italic tracking-tighter"
                    style={{ fontSize: heroTitleFontSize ? `${heroTitleFontSize}px` : undefined }}
                  >
                    {name || "Portfolio"}
                  </motion.h1>
                </div>
                <div className="lg:col-span-4 lg:text-right pb-4">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="font-sans text-lg font-medium border-l-4 lg:border-l-0 lg:border-r-4 border-indigo-600 pl-4 lg:pl-0 lg:pr-4"
                    style={{ fontSize: roleFontSize ? `${roleFontSize}px` : undefined }}
                  >
                    {role || "Creative Technologist"} &<br />
                    Digital Problem Solver
                  </motion.p>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="mt-16 relative aspect-[16/7] md:aspect-[21/7] overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-1000 group shadow-2xl"
              >
                <Image
                  src={(aboutImage && typeof aboutImage === 'string' && aboutImage.trim() !== "") ? aboutImage : "/images/templates/template-img-49.jpg"}
                  className="object-cover group-hover:scale-105 transition-transform duration-[2s]"
                  alt="Hero Background"
                  fill
                />
                <div className="absolute inset-0 bg-indigo-900/10 mix-blend-multiply group-hover:bg-transparent transition-colors duration-1000" />
              </motion.div>
            </section>

            {/* About / Philosophy Section */}
            <section id="about" className="mb-48 scroll-mt-32">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-4">
                  <h2 className="text-4xl italic mb-8 border-b border-indigo-100 pb-4 inline-block">{aboutUsTitle || "The Philosophy"}</h2>
                  <div className="relative aspect-square w-32 md:w-48 overflow-hidden rounded-full mb-8 border-4 border-white shadow-lg">
                    <Image src={(avatarUrl && typeof avatarUrl === 'string' && avatarUrl.trim() !== "") ? avatarUrl : "/images/templates/template-img-50.jpg"} alt={`${name || "User"}'s profile`} fill className="object-cover" />
                  </div>
                </div>
                <div className="lg:col-span-8">
                  <p
                    className="text-3xl md:text-5xl font-light leading-[1.2] text-slate-800 italic"
                    style={{ fontSize: bioFontSize ? `${bioFontSize}px` : undefined }}
                  >
                    &ldquo;{bio || "Design is the bridge between functionality and human emotion, creating stories that resonate long after the first interaction."}&rdquo;
                  </p>
                </div>
              </div>
            </section>

            {/* Skills Grid */}
            <section id="skills" className="mb-48 scroll-mt-32">
              <div className="flex items-center gap-4 mb-16">
                <div className="h-[1px] flex-1 bg-slate-200" />
                <h3 className="font-sans text-xs font-black uppercase tracking-[0.4em] text-slate-400">Expertise</h3>
                <div className="h-[1px] w-24 bg-slate-200" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                {displayServices.map((service, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="border-t border-slate-100 pt-8"
                  >
                    <span className="font-sans text-[10px] font-black text-indigo-400 mb-4 block">0{index + 1}</span>
                    <h4
                      className="text-2xl mb-4 italic tracking-tight"
                      style={{ fontSize: service.nameFontSize ? `${service.nameFontSize}px` : undefined }}
                    >
                      {service.name}
                    </h4>
                    <p
                      className="text-slate-500 leading-relaxed font-sans text-sm font-medium"
                      style={{ fontSize: service.descFontSize ? `${service.descFontSize}px` : undefined }}
                    >
                      {service.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Projects Section - Editorial Style */}
            <section id="projects" className="scroll-mt-32">
              <div className="flex flex-col md:flex-row justify-between items-baseline mb-24 gap-8">
                <h3 className="text-6xl md:text-8xl italic tracking-tighter">Case Studies <span className="text-indigo-600 font-sans not-italic">⭐</span></h3>
                <p className="font-sans text-slate-400 max-w-xs text-sm leading-relaxed">
                  A curated selection of work focusing on digital architecture and visual identity.
                </p>
              </div>

              <div className="space-y-48">
                {displayProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}
                  >
                    <div className="w-full lg:w-7/12">
                      <a href={project.link || "#"} target="_blank" rel="noopener noreferrer" className="block relative group overflow-hidden shadow-2xl rounded-sm">
                        <div className="relative aspect-[4/3] md:aspect-[16/9] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                          {(project.image && typeof project.image === 'string' && project.image.trim() !== "") ? (
                            <Image src={project.image} alt={project.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                          ) : (
                            <div className="w-full h-full bg-slate-200 animate-pulse flex items-center justify-center italic text-slate-400">Project Image</div>
                          )}
                        </div>
                        <div className="absolute inset-0 border-[20px] border-white/0 group-hover:border-white/20 transition-all duration-500" />
                      </a>
                    </div>
                    <div className="w-full lg:w-5/12">
                      <span className="font-sans text-xs font-black uppercase tracking-widest text-indigo-600 mb-6 block underline decoration-2 underline-offset-8">Featured Case {index + 1}</span>
                      <h4
                        className="text-5xl md:text-6xl mb-8 italic tracking-tighter hover:text-indigo-700 transition-colors cursor-pointer"
                        style={{ fontSize: project.nameFontSize ? `${project.nameFontSize}px` : undefined }}
                      >
                        <a href={project.link || "#"} target="_blank" rel="noopener noreferrer">{project.name}</a>
                      </h4>
                      <p
                        className="text-xl text-slate-600 leading-relaxed mb-10 italic"
                        style={{ fontSize: project.descFontSize ? `${project.descFontSize}px` : undefined }}
                      >
                        {project.desc}
                      </p>
                      <a
                        href={project.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans text-xs font-black uppercase tracking-[0.3em] inline-flex items-center gap-4 group"
                      >
                        View Details
                        <span className="w-12 h-[2px] bg-slate-900 group-hover:w-24 group-hover:bg-indigo-600 transition-all duration-300" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        </main>

        {/* Magazine Style Footer */}
        <footer id="contact" className="px-6 md:px-12 pb-24 pt-48 border-t border-black/5 mx-6 md:mx-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="col-span-1 md:col-span-2">
              <h4 className="text-6xl md:text-8xl italic tracking-tighter mb-12">{name || "Portfolio"}</h4>
              <p className="text-slate-400 max-w-sm italic leading-relaxed">
                Based in worldwide locations, available for digital architectural projects and visual explorations.
              </p>
            </div>
            <div className="space-y-8">
              <h5 className="font-sans text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600">Navigation</h5>
              <ul className="space-y-4 italic text-lg">
                {['Home', 'About', 'Skills', 'Projects'].map(item => (
                  <li key={item}><a href={`#${item.toLowerCase()}`} className="hover:text-indigo-600 transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div className="space-y-8">
              <h5 className="font-sans text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600">Connect</h5>
              <ul className="space-y-4 italic text-lg">
                {email && <li><a href={`mailto:${email}`} className="hover:text-indigo-600 transition-colors">Email</a></li>}
                {phone && (
                  <li className="text-slate-600">
                    📞 {countryCode ? countryCode.split(' ')[0] : ''} {phone}
                  </li>
                )}
                {linkedinUrl && <li><a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">LinkedIn</a></li>}
                {githubUrl && <li><a href={githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">Digital Bento</a></li>}
              </ul>
            </div>
          </div>
          <div className="mt-48 flex flex-col md:flex-row justify-between items-center pt-8 border-t border-black/5 text-[10px] font-sans font-black uppercase tracking-[0.5em] text-slate-400">
            <div>© {new Date().getFullYear()} / All Rights Reserved</div>
            <div className="mt-4 md:mt-0">Designed for Human Emotion</div>
          </div>
        </footer>
      </div>
    </TemplateLayout>
  );
}
