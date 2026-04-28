import TemplateLayout from "./TemplateLayout";
import Image from "next/image";

export default function TeacherTemplate1({ data }) {
  const {
    name,
    tagline,
    heroTitle,
    heroImage,
    services,
    aboutUsTitle,
    bio,
    aboutImage,
    contactEmail,
    phone,
    address,
    footerCopyright,
    headerType,
    logoUrl,
    nameFontSize,
    taglineFontSize,
    heroTitleFontSize,
    aboutUsTitleFontSize,
    bioFontSize,
    countryCode,
  } = data || {};

  const displayEmail = contactEmail || "s.jenkins@university.edu";
  const displayPhone = phone ? `${countryCode ? countryCode.split(' ')[0] : ''} ${phone}` : "123-456-7890";
  const displayAddress = address || "Arts Building, Room 402";
  const displayName = name || "Prof. Sarah Jenkins";

  const displayServices = services && services.length > 0 ? services : [
    { name: 'Intro to Modern Lit', desc: 'A survey of 20th-century literature and its major movements.' },
    { name: 'Creative Writing Workshop', desc: 'Practical writing exercises focusing on short fiction.' },
    { name: 'Advanced Seminars', desc: 'In-depth analysis of specific authors and periods.' }
  ];

  return (
    <TemplateLayout data={data} theme="light" category="Teacher" hideHeader={true} hideFooter={true}>
      <div className="scroll-smooth bg-[#fdfbf7] text-[#2c3e50] flex flex-col min-h-screen font-serif">
        
        {/* Header */}
        <header className="bg-white border-b-4 border-[#8e44ad] sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              {headerType === "Image" && logoUrl ? (
                <div className="relative h-16 w-48">
                  <Image src={logoUrl} alt={displayName} fill className="object-contain object-left" />
                </div>
              ) : (
                <div className="flex flex-col text-center md:text-left">
                  <h1 
                    className="font-bold tracking-tight text-[#2c3e50]"
                    style={{ fontSize: nameFontSize ? `${nameFontSize}px` : '28px' }}
                  >
                    {displayName}
                  </h1>
                  {tagline && (
                    <span 
                      className="text-[#7f8c8d] font-sans text-sm tracking-widest uppercase mt-1"
                      style={{ fontSize: taglineFontSize ? `${taglineFontSize}px` : undefined }}
                    >
                      {tagline}
                    </span>
                  )}
                </div>
              )}
            </div>
            <nav className="flex gap-6 font-sans text-sm font-bold text-[#34495e] uppercase tracking-wider">
              <a href="#about" className="hover:text-[#8e44ad] transition-colors">Biography</a>
              <a href="#courses" className="hover:text-[#8e44ad] transition-colors">Courses</a>
              <a href="#contact" className="hover:text-[#8e44ad] transition-colors">Contact</a>
            </nav>
          </div>
        </header>

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative py-24 px-8 border-b border-[#ecf0f1]">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2">
                <div className="inline-block bg-[#8e44ad] text-white font-sans text-xs font-bold uppercase tracking-widest px-3 py-1 mb-6 rounded-sm">
                  Welcome
                </div>
                <h2 
                  className="font-bold leading-tight mb-6 text-[#2c3e50]"
                  style={{ fontSize: heroTitleFontSize ? `${heroTitleFontSize}px` : '52px' }}
                >
                  {heroTitle || "Fostering Critical Minds."}
                </h2>
                <a href="#courses" className="inline-block mt-8 border-2 border-[#2c3e50] text-[#2c3e50] hover:bg-[#2c3e50] hover:text-white px-8 py-3 font-sans text-sm font-bold tracking-wider uppercase transition-all">
                  View Syllabus
                </a>
              </div>
              <div className="w-full md:w-1/2">
                <div className="relative aspect-[4/3] w-full shadow-2xl rounded-sm overflow-hidden">
                  <Image 
                    src={heroImage || "/images/templates/template-img-1.jpg"} 
                    alt="University Campus or Classroom" 
                    fill 
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    priority
                  />
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-24 px-8 bg-white">
            <div className="max-w-4xl mx-auto text-center">
              {aboutImage && (
                <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-10 shadow-lg border-4 border-[#fdfbf7]">
                  <Image src={aboutImage} alt="Profile" fill className="object-cover" />
                </div>
              )}
              <h2 
                className="text-3xl font-bold text-[#2c3e50] mb-8 relative inline-block"
                style={{ fontSize: aboutUsTitleFontSize ? `${aboutUsTitleFontSize}px` : undefined }}
              >
                {aboutUsTitle || "Academic Background"}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#8e44ad]"></div>
              </h2>
              <div 
                className="text-lg text-[#34495e] leading-loose mt-8"
                style={{ fontSize: bioFontSize ? `${bioFontSize}px` : undefined }}
              >
                <p>{bio || "I have been teaching literature for over 15 years, focusing on modern contemporary themes. My research explores the intersection of post-colonial theory and modern narrative structures. I believe in a dialectical approach to learning, encouraging students to challenge the text and their own preconceptions."}</p>
              </div>
            </div>
          </section>

          {/* Courses Section */}
          <section id="courses" className="py-24 bg-[#f9f9f9] px-8 border-t border-[#ecf0f1]">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-[#2c3e50]">Courses Taught</h2>
                <div className="w-16 h-1 bg-[#8e44ad] mx-auto mt-4"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {displayServices.map((service, idx) => (
                  <div key={idx} className="bg-white p-8 border border-[#ecf0f1] shadow-sm hover:shadow-md transition-shadow">
                    <h4 
                      className="text-xl font-bold text-[#2c3e50] mb-4 border-b border-[#ecf0f1] pb-4"
                      style={{ fontSize: service.nameFontSize ? `${service.nameFontSize}px` : undefined }}
                    >
                      {service.name}
                    </h4>
                    <p 
                      className="text-[#7f8c8d] leading-relaxed text-sm font-sans"
                      style={{ fontSize: service.descFontSize ? `${service.descFontSize}px` : undefined }}
                    >
                      {service.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer id="contact" className="bg-[#2c3e50] text-[#bdc3c7] py-16 px-8 font-sans">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 border-b border-[#34495e] pb-12">
              <div>
                <h3 className="text-white text-xl font-serif font-bold mb-6">{displayName}</h3>
                <p className="text-sm leading-relaxed max-w-xs">{tagline || "Department of Literature"}</p>
              </div>
              <div>
                <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-6">Contact</h4>
                <ul className="space-y-3 text-sm">
                  <li><a href={`mailto:${displayEmail}`} className="hover:text-white transition-colors">{displayEmail}</a></li>
                  <li>{displayPhone}</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-6">Office</h4>
                <p className="text-sm leading-relaxed">{displayAddress}</p>
                <p className="text-sm mt-4 text-[#8e44ad] font-bold">Office Hours: Mon/Wed 2-4 PM</p>
              </div>
            </div>
            <div className="text-center text-xs tracking-wider">
              <p>{footerCopyright || `© ${new Date().getFullYear()} ${displayName}. All rights reserved.`}</p>
            </div>
          </div>
        </footer>
      </div>
    </TemplateLayout>
  );
}
