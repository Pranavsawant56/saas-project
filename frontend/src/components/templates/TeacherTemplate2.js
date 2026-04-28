import TemplateLayout from "./TemplateLayout";
import Image from "next/image";

export default function TeacherTemplate2({ data }) {
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

  const displayEmail = contactEmail || "emily@school.edu";
  const displayPhone = phone ? `${countryCode ? countryCode.split(' ')[0] : ''} ${phone}` : "123-456-7890";
  const displayAddress = address || "Room 101, Elementary Wing";
  const displayName = name || "Ms. Emily Art";

  const displayServices = services && services.length > 0 ? services : [
    { name: 'Watercolor Basics', desc: 'Learning color mixing and brush techniques.' },
    { name: 'Clay Modeling', desc: 'Developing fine motor skills through sculpture.' },
    { name: 'Digital Illustration', desc: 'Introduction to drawing on tablets.' }
  ];

  return (
    <TemplateLayout data={data} theme="light" category="Teacher" hideHeader={true} hideFooter={true}>
      <div className="scroll-smooth bg-[#fffaf0] text-[#333] flex flex-col min-h-screen font-sans">
        
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b-4 border-[#ff6b6b]">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              {headerType === "Image" && logoUrl ? (
                <div className="relative h-12 w-32">
                  <Image src={logoUrl} alt={displayName} fill className="object-contain object-left" />
                </div>
              ) : (
                <div className="flex flex-col">
                  <h1 
                    className="font-extrabold tracking-tight text-[#ff6b6b]"
                    style={{ fontSize: nameFontSize ? `${nameFontSize}px` : '24px' }}
                  >
                    {displayName}
                  </h1>
                  {tagline && (
                    <span 
                      className="text-[#4ecdc4] font-bold text-sm uppercase tracking-wider"
                      style={{ fontSize: taglineFontSize ? `${taglineFontSize}px` : undefined }}
                    >
                      {tagline}
                    </span>
                  )}
                </div>
              )}
            </div>
            <nav className="hidden md:flex gap-6 font-bold text-sm text-[#555]">
              <a href="#about" className="hover:text-[#ff6b6b] transition-colors">Meet the Teacher</a>
              <a href="#activities" className="hover:text-[#ffe66d] transition-colors">Class Activities</a>
              <a href="#contact" className="hover:text-[#4ecdc4] transition-colors">Contact</a>
            </nav>
          </div>
        </header>

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative pt-20 pb-32 px-6 overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffe66d] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-32 w-64 h-64 bg-[#ff6b6b] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-64 h-64 bg-[#4ecdc4] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
            
            <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2">
                <h2 
                  className="font-black leading-[1.1] mb-6 text-[#2d3436]"
                  style={{ fontSize: heroTitleFontSize ? `${heroTitleFontSize}px` : '64px' }}
                >
                  {heroTitle || "Inspiring Young Creators!"}
                </h2>
                <p className="text-xl text-[#636e72] mb-10 font-medium">
                  Welcome to our creative classroom, where every mistake is just a new design waiting to happen.
                </p>
                <a href="#activities" className="bg-[#ff6b6b] hover:bg-[#ff5252] text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-block">
                  See Our Projects
                </a>
              </div>
              <div className="w-full md:w-1/2">
                <div className="relative aspect-square w-full max-w-md mx-auto rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <Image 
                    src={heroImage || "/images/templates/template-img-2.jpg"} 
                    alt="Classroom" 
                    fill 
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-24 bg-white px-6">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
              {aboutImage && (
                <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 relative rounded-full overflow-hidden border-4 border-[#ffe66d] shadow-lg">
                  <Image src={aboutImage} alt="Teacher Profile" fill className="object-cover" />
                </div>
              )}
              <div className="text-center md:text-left">
                <h2 
                  className="text-4xl font-black text-[#2d3436] mb-6"
                  style={{ fontSize: aboutUsTitleFontSize ? `${aboutUsTitleFontSize}px` : undefined }}
                >
                  {aboutUsTitle || "Meet Your Teacher"}
                </h2>
                <div 
                  className="text-lg text-[#636e72] leading-relaxed bg-[#f8f9fa] p-6 rounded-2xl border-l-4 border-[#4ecdc4]"
                  style={{ fontSize: bioFontSize ? `${bioFontSize}px` : undefined }}
                >
                  <p>{bio || "I believe every student has an artist inside them waiting to be discovered. My goal is to create a safe, fun, and engaging environment where kids can express themselves freely and learn the joy of creation."}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Activities Section */}
          <section id="activities" className="py-24 bg-[#fafbfc] px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-black text-[#2d3436] mb-4">Class Activities</h2>
                <p className="text-lg text-[#636e72]">What we're learning this semester</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {displayServices.map((service, idx) => {
                  const colors = ['bg-[#ff6b6b]', 'bg-[#4ecdc4]', 'bg-[#ffe66d]'];
                  const color = colors[idx % colors.length];
                  return (
                    <div key={idx} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 border-2 border-transparent hover:border-gray-100">
                      <div className={`w-16 h-16 ${color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-md transform -rotate-6`}>
                        {service.image ? (
                          <div className="relative w-full h-full rounded-2xl overflow-hidden"><Image src={service.image} alt={service.name} fill className="object-cover" /></div>
                        ) : (
                          <span className="text-3xl">🎨</span>
                        )}
                      </div>
                      <h4 
                        className="text-2xl font-bold text-[#2d3436] mb-3"
                        style={{ fontSize: service.nameFontSize ? `${service.nameFontSize}px` : undefined }}
                      >
                        {service.name}
                      </h4>
                      <p 
                        className="text-[#636e72] leading-relaxed"
                        style={{ fontSize: service.descFontSize ? `${service.descFontSize}px` : undefined }}
                      >
                        {service.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer id="contact" className="bg-[#2d3436] text-white py-16 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-block p-4 bg-white/10 rounded-3xl mb-8">
              <h2 className="text-3xl font-black mb-2">{displayName}</h2>
              <p className="text-[#ffe66d] font-bold">{tagline || "Creative Arts & Design"}</p>
            </div>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 mb-12 text-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl text-[#ff6b6b]">📍</span>
                <span>{displayAddress}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl text-[#4ecdc4]">📧</span>
                <a href={`mailto:${displayEmail}`} className="hover:text-white transition-colors">{displayEmail}</a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl text-[#ffe66d]">📞</span>
                <span>{displayPhone}</span>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-8 text-sm text-gray-400">
              <p>{footerCopyright || `© ${new Date().getFullYear()} ${displayName}. All rights reserved.`}</p>
            </div>
          </div>
        </footer>
      </div>
    </TemplateLayout>
  );
}
