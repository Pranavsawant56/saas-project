import TemplateLayout from "./TemplateLayout";
import { motion } from "framer-motion";
import Image from "next/image";

export default function PortfolioTemplate2({ data }) {
  const {
    heroTitle,
    name,
    role,
    bio,
    avatarUrl,
    service1_name, service1_image, service1_desc,
    service2_name, service2_image, service2_desc,
    service3_name, service3_image, service3_desc,
    service4_name, service4_image, service4_desc,
    aboutUsTitle,
    aboutImage,
    email,
    phone,
    countryCode,
    linkedinUrl,
    githubUrl,
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
    services,
    projects,
  } = data || {};

  const displayServices = services || [
    { name: service1_name || 'App Design', desc: service1_desc || 'Crafting intuitive mobile experiences.', image: service1_image, nameFontSize: service1_nameFontSize, descFontSize: service1_descFontSize },
    { name: service2_name || 'Web Dev', desc: service2_desc || 'Building high-performance web applications.', image: service2_image, nameFontSize: service2_nameFontSize, descFontSize: service2_descFontSize },
    { name: service3_name, desc: service3_desc, image: service3_image, nameFontSize: service3_nameFontSize, descFontSize: service3_descFontSize },
    { name: service4_name, desc: service4_desc, image: service4_image, nameFontSize: service4_nameFontSize, descFontSize: service4_descFontSize },
  ].filter(s => s.name);

  const displayProjects = projects || [
    { name: data?.project1_name || 'Selected Work 1', desc: data?.project1_desc || 'Full-stack development for leading brands.', image: data?.project1_image, link: data?.project1_link, nameFontSize: project1_nameFontSize, descFontSize: project1_descFontSize },
    { name: data?.project2_name || 'Selected Work 2', desc: data?.project2_desc || 'Creative direction and UI/UX strategy.', image: data?.project2_image, link: data?.project2_link, nameFontSize: project2_nameFontSize, descFontSize: project2_descFontSize },
    { name: data?.project3_name || 'Selected Work 3', desc: data?.project3_desc || 'Interactive experiences and digital art.', image: data?.project3_image, link: data?.project3_link, nameFontSize: project3_nameFontSize, descFontSize: project3_descFontSize },
  ].filter(p => p.name);

  return (
    <TemplateLayout data={data} theme="dark" category="Portfolio" hideHeader={true} hideFooter={true}>
      {/* Floating Pill Header - Unique for Portfolio 2 */}
      <header className="sticky top-6 z-50 w-[95%] max-w-2xl mx-auto">
        <nav className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-full px-6 py-3 flex justify-between items-center shadow-2xl shadow-indigo-500/10">
          <div 
            className="font-black text-xl tracking-tighter"
            style={{ fontSize: nameFontSize ? `${nameFontSize}px` : undefined }}
          >
            {name?.split(' ')[0] || "JD"}<span className="text-indigo-500">_</span>
          </div>
          <div className="hidden md:flex gap-8">
            {['Home', 'Skills', 'About', 'Projects'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">{item}</a>
            ))}
          </div>
          <a href="#contact" className="bg-white text-slate-950 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all">
            Contact
          </a>
        </nav>
      </header>

      <div id="home" className="min-h-screen bg-slate-950 text-white p-4 md:p-12 scroll-smooth flex flex-col pt-6">

        <main className="flex-1 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

            {/* Hero Card - Large */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:col-span-8 bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-12 flex flex-col justify-center relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 blur-[120px] rounded-full group-hover:scale-110 transition-transform duration-1000" />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-indigo-500 font-black uppercase tracking-[0.5em] text-xs mb-6"
              >
                Creative Developer
              </motion.span>
              <h1 
                className="text-4xl lg:text-6xl font-black mb-6 tracking-tighter leading-[0.9]"
                style={{ fontSize: heroTitleFontSize ? `${heroTitleFontSize}px` : undefined }}
              >
                {heroTitle || `Building ${name || 'Digital'} Dreams.`}
              </h1>
              <p 
                className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed italic border-l-4 border-indigo-600 pl-8"
                style={{ fontSize: bioFontSize ? `${bioFontSize}px` : undefined }}
              >
                {bio || "A creative developer pushing the boundaries of digital experience through code and design."}
              </p>
            </motion.section>

            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="md:col-span-4 bg-indigo-600 rounded-3xl overflow-hidden flex items-center justify-center relative group"
            >
              <Image
                src={(avatarUrl && typeof avatarUrl === 'string' && avatarUrl.trim() !== "") ? avatarUrl : "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400"}
                alt={`${name || "User"}'s profile picture`}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-indigo-600/20 mix-blend-overlay" />
            </motion.div>

            {/* Skills Grid (Bento) */}
            <div id="skills" className="md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-6 scroll-mt-32">
              {displayServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index * 0.1) }}
                  className={`md:col-span-4 p-6 rounded-3xl border border-slate-800 bg-slate-900/60 transition-all hover:bg-slate-800/80 group relative overflow-hidden`}
                >
                  <div className="absolute -top-12 -right-12 w-24 h-24 bg-indigo-600/5 blur-xl rounded-full" />
                  <div className="relative w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-4 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500 rotate-6 group-hover:rotate-0 overflow-hidden">
                    {(service.image && typeof service.image === 'string' && service.image.trim() !== "") ? <Image src={service.image} alt={service.name} fill className="object-contain p-2" /> : <span className="text-2xl font-black">?</span>}
                  </div>
                  <h3 
                    className="text-xl font-black mb-2 tracking-tight"
                    style={{ fontSize: service.nameFontSize ? `${service.nameFontSize}px` : undefined }}
                  >
                    {service.name}
                  </h3>
                  <p 
                    className="text-slate-400 text-sm leading-relaxed font-medium"
                    style={{ fontSize: service.descFontSize ? `${service.descFontSize}px` : undefined }}
                  >
                    {service.desc || `Elevating digital standards through expert ${service.name.toLowerCase()} engineering.`}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* About Section - Wide */}
            <motion.section
              id="about"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="md:col-span-12 bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 scroll-mt-32"
            >
              <div className="relative w-full md:w-5/12 aspect-square rounded-3xl overflow-hidden rotate-2 hover:rotate-0 transition-transform duration-700 shadow-2xl border-4 border-slate-800">
                <Image
                  src={(aboutImage && typeof aboutImage === 'string' && aboutImage.trim() !== "") ? aboutImage : "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600"}
                  alt="About Section representing expertise"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <span className="text-indigo-500 font-black uppercase tracking-[0.5em] text-[10px] mb-6 block underline decoration-4 underline-offset-8">The Backstory</span>
                <h2 className="text-3xl font-black mb-4 leading-none tracking-tighter italic">
                  {aboutUsTitle || "Engineering experiences that matter."}
                </h2>
                <p 
                  className="text-slate-400 text-lg font-medium leading-relaxed mb-6"
                  style={{ fontSize: bioFontSize ? `${bioFontSize}px` : undefined }}
                >
                  {bio || "My journey in tech has always been about more than just writing code. It's about designing solutions that people love to use."}
                </p>
                <div className="flex justify-center md:justify-start gap-8">
                  <div className="bg-slate-800/80 px-4 py-3 rounded-2xl border border-slate-700">
                    <div className="text-2xl font-black text-white italic">08+</div>
                    <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mt-1">Tools</div>
                  </div>
                  <div className="bg-slate-800/80 px-4 py-3 rounded-2xl border border-slate-700">
                    <div className="text-2xl font-black text-white italic">24/7</div>
                    <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mt-1">Ideation</div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Projects Section */}
            <section id="projects" className="md:col-span-12 scroll-mt-32">
              <div className="bg-indigo-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden group shadow-2xl shadow-indigo-600/20">
                <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-white/5 blur-[120px] rounded-full -mr-80 -mt-80 group-hover:scale-125 transition-transform duration-[2s]" />
                <div className="relative z-10 text-center mb-10">
                  <span className="bg-white text-indigo-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block">Impactful Work</span>
                  <h3 className="text-4xl md:text-5xl font-black tracking-tighter italic">Hall of Fame ⭐</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                  {displayProjects.map((project, index) => (
                    <motion.a
                      key={index}
                      href={project.link || "#"}
                      whileHover={{ scale: 1.02 }}
                      className="bg-slate-950 rounded-3xl p-6 border border-white/5 shadow-2xl transition-all block group/card"
                    >
                      <div className="relative aspect-square bg-slate-900 rounded-3xl mb-8 overflow-hidden grayscale group-hover/card:grayscale-0 transition-all">
                        {(project.image && typeof project.image === 'string' && project.image.trim() !== "") ? <Image src={project.image} alt={project.name} fill className="object-cover" /> : <div className="w-full h-full flex items-center justify-center font-black text-slate-800 text-6xl">0{index + 1}</div>}
                      </div>
                      <h4 
                        className="font-black text-xl mb-2 tracking-tighter italic"
                        style={{ fontSize: project.nameFontSize ? `${project.nameFontSize}px` : undefined }}
                      >
                        {project.name}
                      </h4>
                      <p 
                        className="text-slate-500 text-sm leading-relaxed mb-8"
                        style={{ fontSize: project.descFontSize ? `${project.descFontSize}px` : undefined }}
                      >
                        {project.desc}
                      </p>
                      <div className="text-indigo-400 font-bold text-xs uppercase tracking-widest flex items-center gap-4">
                        View Case <span className="h-0.5 w-8 bg-indigo-400 group-hover/card:w-16 transition-all" />
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </section>

          </div>
        </main>

        <footer id="contact" className="mt-16 pb-12 pt-16 px-8 bg-slate-900/20 rounded-t-3xl border-t border-slate-900">
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black tracking-tighter text-center italic mb-10 text-indigo-50 leading-[0.8]"
            >
              Let&apos;s Make<br />Magic Happen <span className="text-indigo-600 font-sans not-italic">.</span>
            </motion.h4>

            <div className="flex flex-col md:flex-row justify-between w-full items-center gap-12 border-t border-white/5 pt-12">
              <div className="text-xl font-black italic tracking-tighter">
                {name || "John Doe"}
              </div>
              <div className="flex gap-12">
                {email && <a href={`mailto:${email}`} className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-indigo-500 transition-colors">Email</a>}
                {phone && (
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-indigo-500 transition-colors">
                    📞 {countryCode ? countryCode.split(' ')[0] : ''} {phone}
                  </span>
                )}
                {linkedinUrl && <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-indigo-500 transition-colors">LinkedIn</a>}
                {githubUrl && <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-indigo-500 transition-colors">GitHub</a>}
              </div>
              <div className="text-slate-600 font-mono text-xs">
                © {new Date().getFullYear()} / Creative Solutions
              </div>
            </div>
          </div>
        </footer>
      </div>
    </TemplateLayout>
  );
}
