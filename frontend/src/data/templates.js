export const templates = [
  {
    id: "portfolio-1",
    name: "Modern Portfolio",
    description: "A sleek, dark-themed portfolio for developers and creatives.",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    category: "Portfolio",
    tags: ["developer", "designer", "creative", "tech"],
    fields: [
      { id: "headerType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Header" },
      { id: "name", label: "Full Name", type: "text", placeholder: "John Doe", section: "Header" },
      { id: "logoUrl", label: "Logo URL", type: "image", placeholder: "Choose from gallery", section: "Header" },

      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "Hi, I'm John", section: "Hero Banner" },
      { id: "role", label: "Professional Role", type: "text", placeholder: "Full Stack Developer", section: "Hero Banner" },
      { id: "avatarUrl", label: "Avatar/Profile Image URL", type: "image", placeholder: "Choose from gallery", section: "Hero Banner" },

      { id: "service1_name", label: "Skill 1 Name", type: "text", placeholder: "Web Design", section: "Skills" },
      { id: "service1_image", label: "Skill 1 Icon URL", type: "image", placeholder: "Choose from gallery", section: "Skills" },
      { id: "service1_desc", label: "Skill 1 Description", type: "textarea", placeholder: "Creating beautiful interfaces...", section: "Skills" },

      { id: "service2_name", label: "Skill 2 Name", type: "text", placeholder: "Development", section: "Skills" },
      { id: "service2_image", label: "Skill 2 Icon URL", type: "image", placeholder: "Choose from gallery", section: "Skills" },
      { id: "service2_desc", label: "Skill 2 Description", type: "textarea", placeholder: "Building scalable apps...", section: "Skills" },

      { id: "service3_name", label: "Skill 3 Name", type: "text", placeholder: "Cloud Solutions", section: "Skills" },
      { id: "service3_image", label: "Skill 3 Icon URL", type: "image", placeholder: "Choose from gallery", section: "Skills" },
      { id: "service3_desc", label: "Skill 3 Description", type: "textarea", placeholder: "Deploying and managing...", section: "Skills" },

      { id: "service4_name", label: "Skill 4 Name", type: "text", placeholder: "UI/UX Strategy", section: "Skills" },
      { id: "service4_image", label: "Skill 4 Icon URL", type: "image", placeholder: "Choose from gallery", section: "Skills" },
      { id: "service4_desc", label: "Skill 4 Description", type: "textarea", placeholder: "User research and flows...", section: "Skills" },

      { id: "project1_name", label: "Project 1 Name", type: "text", placeholder: "E-Commerce App", section: "Projects" },
      { id: "project1_image", label: "Project 1 Image URL", type: "image", placeholder: "Project screenshot", section: "Projects" },
      { id: "project1_desc", label: "Project 1 Description", type: "textarea", placeholder: "A full-stack e-commerce solution...", section: "Projects" },
      { id: "project1_link", label: "Project 1 Link (GitHub/Live)", type: "text", placeholder: "https://github.com/...", section: "Projects" },

      { id: "project2_name", label: "Project 2 Name", type: "text", placeholder: "Task Manager", section: "Projects" },
      { id: "project2_image", label: "Project 2 Image URL", type: "image", placeholder: "Project screenshot", section: "Projects" },
      { id: "project2_desc", label: "Project 2 Description", type: "textarea", placeholder: "Real-time task management...", section: "Projects" },
      { id: "project2_link", label: "Project 2 Link (GitHub/Live)", type: "text", placeholder: "https://github.com/...", section: "Projects" },

      { id: "project3_name", label: "Project 3 Name", type: "text", placeholder: "Weather Dashboard", section: "Projects" },
      { id: "project3_image", label: "Project 3 Image URL", type: "image", placeholder: "Project screenshot", section: "Projects" },
      { id: "project3_desc", label: "Project 3 Description", type: "textarea", placeholder: "React-based weather data...", section: "Projects" },
      { id: "project3_link", label: "Project 3 Link (GitHub/Live)", type: "text", placeholder: "https://github.com/...", section: "Projects" },

      { id: "aboutUsTitle", label: "About Title", type: "text", placeholder: "My Story", section: "About Us" },
      { id: "bio", label: "About Content", type: "textarea", placeholder: "Tell us about your journey...", section: "About Us" },
      { id: "aboutImage", label: "About Image URL", type: "image", placeholder: "Choose from gallery", section: "About Us" },

      { id: "email", label: "Email", type: "text", placeholder: "hello@example.com", section: "Footer" },
      { id: "phone", label: "Phone Number", type: "number", placeholder: "1234567890", section: "Footer" },
      { id: "location", label: "Location", type: "text", placeholder: "New York, NY", section: "Footer" },
      { id: "githubUrl", label: "GitHub", type: "text", placeholder: "https://github.com/...", section: "Footer" },
      { id: "linkedinUrl", label: "LinkedIn", type: "text", placeholder: "https://linkedin.com/...", section: "Footer" },
      { id: "footerCopyright", label: "Copyright Text", type: "text", placeholder: "© 2024 Your Name", section: "Footer" },
    ]
  },
  {
    id: "portfolio-2",
    name: "Creative Developer",
    description: "A vibrant and creative portfolio template for developers and designers.",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    category: "Portfolio",
    fields: [
      { id: "headerType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Header" },
      { id: "name", label: "Full Name", type: "text", placeholder: "Jane Doe", section: "Header" },
      { id: "logoUrl", label: "Logo URL", type: "image", placeholder: "Choose from gallery", section: "Header" },

      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "Hi, I'm Jane", section: "Hero Banner" },
      { id: "role", label: "Professional Role", type: "text", placeholder: "Creative Technologist", section: "Hero Banner" },
      { id: "avatarUrl", label: "Avatar/Profile Image URL", type: "image", placeholder: "Choose from gallery", section: "Hero Banner" },

      { id: "service1_name", label: "Skill 1 Name", type: "text", placeholder: "UI/UX Design", section: "Skills" },
      { id: "service1_image", label: "Skill 1 Icon URL", type: "image", placeholder: "Choose from gallery", section: "Skills" },
      { id: "service1_desc", label: "Skill 1 Description", type: "textarea", placeholder: "Crafting user-centered designs...", section: "Skills" },

      { id: "service2_name", label: "Skill 2 Name", type: "text", placeholder: "Frontend Dev", section: "Skills" },
      { id: "service2_image", label: "Skill 2 Icon URL", type: "image", placeholder: "Choose from gallery", section: "Skills" },
      { id: "service2_desc", label: "Skill 2 Description", type: "textarea", placeholder: "Interactive web experiences...", section: "Skills" },

      { id: "service3_name", label: "Skill 3 Name", type: "text", placeholder: "Mobile Apps", section: "Skills" },
      { id: "service3_image", label: "Skill 3 Icon URL", type: "image", placeholder: "Choose from gallery", section: "Skills" },
      { id: "service3_desc", label: "Skill 3 Description", type: "textarea", placeholder: "Natively compiled...", section: "Skills" },

      { id: "service4_name", label: "Skill 4 Name", type: "text", placeholder: "Product Design", section: "Skills" },
      { id: "service4_image", label: "Skill 4 Icon URL", type: "image", placeholder: "Choose from gallery", section: "Skills" },
      { id: "service4_desc", label: "Skill 4 Description", type: "textarea", placeholder: "Vision to reality...", section: "Skills" },

      { id: "project1_name", label: "Project 1 Name", type: "text", placeholder: "Social Platform", section: "Projects" },
      { id: "project1_image", label: "Project 1 Image URL", type: "image", placeholder: "Project screenshot", section: "Projects" },
      { id: "project1_desc", label: "Project 1 Description", type: "textarea", placeholder: "Connecting users worldwide...", section: "Projects" },
      { id: "project1_link", label: "Project 1 Link", type: "text", placeholder: "https://github.com/...", section: "Projects" },

      { id: "project2_name", label: "Project 2 Name", type: "text", placeholder: "Finance Tracker", section: "Projects" },
      { id: "project2_image", label: "Project 2 Image URL", type: "image", placeholder: "Project screenshot", section: "Projects" },
      { id: "project2_desc", label: "Project 2 Description", type: "textarea", placeholder: "Secure money management...", section: "Projects" },
      { id: "project2_link", label: "Project 2 Link", type: "text", placeholder: "https://github.com/...", section: "Projects" },

      { id: "project3_name", label: "Project 3 Name", type: "text", placeholder: "Fitness Coach", section: "Projects" },
      { id: "project3_image", label: "Project 3 Image URL", type: "image", placeholder: "Project screenshot", section: "Projects" },
      { id: "project3_desc", label: "Project 3 Description", type: "textarea", placeholder: "Daily workout planning...", section: "Projects" },
      { id: "project3_link", label: "Project 3 Link", type: "text", placeholder: "https://github.com/...", section: "Projects" },

      { id: "aboutUsTitle", label: "About Title", type: "text", placeholder: "About Me", section: "About Us" },
      { id: "bio", label: "About Content", type: "textarea", placeholder: "Passionate about bridging art and technology...", section: "About Us" },
      { id: "aboutImage", label: "About Image URL", type: "image", placeholder: "Choose from gallery", section: "About Us" },

      { id: "email", label: "Email", type: "text", placeholder: "hello@jane.com", section: "Footer" },
      { id: "phone", label: "Phone Number", type: "number", placeholder: "1234567890", section: "Footer" },
      { id: "location", label: "Location", type: "text", placeholder: "San Francisco, CA", section: "Footer" },
      { id: "githubUrl", label: "GitHub", type: "text", placeholder: "https://github.com/...", section: "Footer" },
      { id: "linkedinUrl", label: "LinkedIn", type: "text", placeholder: "https://linkedin.com/...", section: "Footer" },
      { id: "footerCopyright", label: "Copyright Text", type: "text", placeholder: "© 2024 Jane Doe", section: "Footer" },
    ]
  },
  {
    id: "portfolio-3",
    name: "Minimalist Maker",
    description: "A clean, minimalist portfolio focusing on your work and projects.",
    thumbnail: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800",
    category: "Portfolio",
    fields: [
      { id: "headerType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Header" },
      { id: "name", label: "Full Name", type: "text", placeholder: "Alex Smith", section: "Header" },
      { id: "logoUrl", label: "Logo URL", type: "image", placeholder: "Choose from gallery", section: "Header" },

      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "Hello.", section: "Hero Banner" },
      { id: "role", label: "Professional Role", type: "text", placeholder: "Digital Product Designer", section: "Hero Banner" },
      { id: "avatarUrl", label: "Avatar/Profile Image URL", type: "image", placeholder: "Choose from gallery", section: "Hero Banner" },

      { id: "service1_name", label: "Skill 1 Name", type: "text", placeholder: "Product Strategy", section: "Skills" },
      { id: "service1_image", label: "Skill 1 Icon URL", type: "image", placeholder: "Choose from gallery", section: "Skills" },
      { id: "service1_desc", label: "Skill 1 Description", type: "textarea", placeholder: "Defining product vision...", section: "Skills" },

      { id: "service2_name", label: "Skill 2 Name", type: "text", placeholder: "Prototyping", section: "Skills" },
      { id: "service2_image", label: "Skill 2 Icon URL", type: "image", placeholder: "Choose from gallery", section: "Skills" },
      { id: "service2_desc", label: "Skill 2 Description", type: "textarea", placeholder: "Rapid iteration and testing...", section: "Skills" },

      { id: "service3_name", label: "Skill 3 Name", type: "text", placeholder: "Branding", section: "Skills" },
      { id: "service3_image", label: "Skill 3 Icon URL", type: "image", placeholder: "Choose from gallery", section: "Skills" },
      { id: "service3_desc", label: "Skill 3 Description", type: "textarea", placeholder: "Consistency across channels...", section: "Skills" },

      { id: "service4_name", label: "Skill 4 Name", type: "text", placeholder: "UX Research", section: "Skills" },
      { id: "service4_image", label: "Skill 4 Icon URL", type: "image", placeholder: "Choose from gallery", section: "Skills" },
      { id: "service4_desc", label: "Skill 4 Description", type: "textarea", placeholder: "Data-backed decisions...", section: "Skills" },

      { id: "project1_name", label: "Project 1 Name", type: "text", placeholder: "Mobile App Design", section: "Projects" },
      { id: "project1_image", label: "Project 1 Image URL", type: "image", placeholder: "Project screenshot", section: "Projects" },
      { id: "project1_desc", label: "Project 1 Description", type: "textarea", placeholder: "Next-gen iOS experience...", section: "Projects" },
      { id: "project1_link", label: "Project 1 Link", type: "text", placeholder: "https://github.com/...", section: "Projects" },

      { id: "project2_name", label: "Project 2 Name", type: "text", placeholder: "Landing Page", section: "Projects" },
      { id: "project2_image", label: "Project 2 Image URL", type: "image", placeholder: "Project screenshot", section: "Projects" },
      { id: "project2_desc", label: "Project 2 Description", type: "textarea", placeholder: "Conversion-optimized...", section: "Projects" },
      { id: "project2_link", label: "Project 2 Link", type: "text", placeholder: "https://github.com/...", section: "Projects" },

      { id: "project3_name", label: "Project 3 Name", type: "text", placeholder: "Dashboard UI", section: "Projects" },
      { id: "project3_image", label: "Project 3 Image URL", type: "image", placeholder: "Project screenshot", section: "Projects" },
      { id: "project3_desc", label: "Project 3 Description", type: "textarea", placeholder: "Complex data visualization...", section: "Projects" },
      { id: "project3_link", label: "Project 3 Link", type: "text", placeholder: "https://github.com/...", section: "Projects" },

      { id: "aboutUsTitle", label: "About Title", type: "text", placeholder: "Background", section: "About Us" },
      { id: "bio", label: "About Content", type: "textarea", placeholder: "I design simple solutions to complex problems.", section: "About Us" },
      { id: "aboutImage", label: "About Image URL", type: "image", placeholder: "Choose from gallery", section: "About Us" },

      { id: "email", label: "Email Address", type: "text", placeholder: "alex@example.com", section: "Footer" },
      { id: "phone", label: "Phone Number", type: "number", placeholder: "1234567890", section: "Footer" },
      { id: "location", label: "Location", type: "text", placeholder: "Austin, TX", section: "Footer" },
      { id: "githubUrl", label: "GitHub Profile URL", type: "text", placeholder: "https://github.com/...", section: "Footer" },
      { id: "linkedinUrl", label: "LinkedIn Profile URL", type: "text", placeholder: "https://linkedin.com/...", section: "Footer" },
      { id: "footerCopyright", label: "Copyright Text", type: "text", placeholder: "© 2024 Alex Smith", section: "Footer" },
    ]
  },
  {
    id: "business-1",
    name: "Corporate Pro",
    description: "A professional and clean landing page for businesses and startups.",
    thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
    category: "Business",
    fields: [
      { id: "headerType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Header" },
      { id: "companyName", label: "Company Name", type: "text", placeholder: "Acme Corp", section: "Header" },
      { id: "logoUrl", label: "Logo URL", type: "image", placeholder: "Choose from gallery", section: "Header" },

      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "Leading Innovation", section: "Hero Banner" },
      { id: "tagline", label: "Company Tagline", type: "text", placeholder: "Innovating the future", section: "Hero Banner" },
      { id: "heroImage", label: "Hero Image URL", type: "image", placeholder: "Choose from gallery", section: "Hero Banner" },

      { id: "service1_name", label: "Service 1 Name", type: "text", placeholder: "Strategic Planning", section: "Services" },
      { id: "service1_image", label: "Service 1 Icon/Image URL", type: "image", placeholder: "Choose from gallery", section: "Services" },
      { id: "service1_desc", label: "Service 1 Description", type: "textarea", placeholder: "We help you plan for the future...", section: "Services" },

      { id: "service2_name", label: "Service 2 Name", type: "text", placeholder: "Market Analysis", section: "Services" },
      { id: "service2_image", label: "Service 2 Icon/Image URL", type: "image", placeholder: "Choose from gallery", section: "Services" },
      { id: "service2_desc", label: "Service 2 Description", type: "textarea", placeholder: "Understanding the market trends...", section: "Services" },

      { id: "service3_name", label: "Service 3 Name", type: "text", placeholder: "Financial Advisory", section: "Services" },
      { id: "service3_image", label: "Service 3 Icon/Image URL", type: "image", placeholder: "Choose from gallery", section: "Services" },
      { id: "service3_desc", label: "Service 3 Description", type: "textarea", placeholder: "Expert guidance for your finances...", section: "Services" },

      { id: "service4_name", label: "Service 4 Name", type: "text", placeholder: "Digital Transformation", section: "Services" },
      { id: "service4_image", label: "Service 4 Icon/Image URL", type: "image", placeholder: "Choose from gallery", section: "Services" },
      { id: "service4_desc", label: "Service 4 Description", type: "textarea", placeholder: "Modernizing your business operations...", section: "Services" },

      { id: "aboutUsTitle", label: "About Title", type: "text", placeholder: "Who We Are", section: "About Us" },
      { id: "aboutUsContent", label: "About Content", type: "textarea", placeholder: "Describe your company values and history...", section: "About Us" },
      { id: "aboutUsImage", label: "About Image URL", type: "image", placeholder: "Choose from gallery", section: "About Us" },

      { id: "contactEmail", label: "Contact Email", type: "text", placeholder: "contact@acme.com", section: "Footer" },
      { id: "phone", label: "Phone Number", type: "number", placeholder: "1234567890", section: "Footer" },
      { id: "address", label: "Office Address", type: "text", placeholder: "123 Business St, NY", section: "Footer" },
      { id: "footerAbout", label: "Footer About Text", type: "textarea", placeholder: "Making the world a better place...", section: "Footer" },
      { id: "footerCopyright", label: "Copyright Text", type: "text", placeholder: "© 2024 Acme Corp", section: "Footer" },
      { id: "facebookUrl", label: "Facebook URL", type: "text", placeholder: "https://facebook.com/...", section: "Footer" },
      { id: "twitterUrl", label: "Twitter URL", type: "text", placeholder: "https://twitter.com/...", section: "Footer" },
      { id: "linkedinUrl", label: "LinkedIn URL", type: "text", placeholder: "https://linkedin.com/...", section: "Footer" },
    ]
  },
  {
    id: "business-2",
    name: "Startup Launchpad",
    description: "Perfect landing page for modern startups to showcase their product.",
    thumbnail: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800",
    category: "Business",
    fields: [
      { id: "headerType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Header" },
      { id: "companyName", label: "Company Name", type: "text", placeholder: "NovaTech", section: "Header" },
      { id: "logoUrl", label: "Logo URL", type: "image", placeholder: "Choose from gallery", section: "Header" },

      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "Building the Future", section: "Hero Banner" },
      { id: "tagline", label: "Company Tagline", type: "text", placeholder: "Next generation digital solutions", section: "Hero Banner" },
      { id: "heroImage", label: "Hero Image URL", type: "image", placeholder: "Choose from gallery", section: "Hero Banner" },

      { id: "service1_name", label: "Service 1 Name", type: "text", placeholder: "SaaS Platforms", section: "Services" },
      { id: "service1_image", label: "Service 1 Icon/Image URL", type: "image", placeholder: "Choose from gallery", section: "Services" },
      { id: "service1_desc", label: "Service 1 Description", type: "textarea", placeholder: "Scalable cloud-based applications...", section: "Services" },

      { id: "service2_name", label: "Service 2 Name", type: "text", placeholder: "Data Analytics", section: "Services" },
      { id: "service2_image", label: "Service 2 Icon/Image URL", type: "image", placeholder: "Choose from gallery", section: "Services" },
      { id: "service2_desc", label: "Service 2 Description", type: "textarea", placeholder: "Actionable insights for your business...", section: "Services" },

      { id: "service3_name", label: "Service 3 Name", type: "text", placeholder: "Mobile Solutions", section: "Services" },
      { id: "service3_image", label: "Service 3 Icon/Image URL", type: "image", placeholder: "Choose from gallery", section: "Services" },
      { id: "service3_desc", label: "Service 3 Description", type: "textarea", placeholder: "Next-gen mobile experiences...", section: "Services" },

      { id: "service4_name", label: "Service 4 Name", type: "text", placeholder: "AI Integration", section: "Services" },
      { id: "service4_image", label: "Service 4 Icon/Image URL", type: "image", placeholder: "Choose from gallery", section: "Services" },
      { id: "service4_desc", label: "Service 4 Description", type: "textarea", placeholder: "Leveraging intelligence for growth...", section: "Services" },

      { id: "aboutUsTitle", label: "About Title", type: "text", placeholder: "Our Vision", section: "About Us" },
      { id: "aboutUsContent", label: "About Content", type: "textarea", placeholder: "Empowering businesses through technology...", section: "About Us" },
      { id: "aboutUsImage", label: "About Image URL", type: "image", placeholder: "Choose from gallery", section: "About Us" },

      { id: "contactEmail", label: "Email", type: "text", placeholder: "hello@novatech.io", section: "Footer" },
      { id: "phone", label: "Phone Number", type: "number", placeholder: "1234567890", section: "Footer" },
      { id: "address", label: "Location", type: "text", placeholder: "Innovation Park, CA", section: "Footer" },
      { id: "footerAbout", label: "About (Footer)", type: "textarea", placeholder: "Driving digital transformation...", section: "Footer" },
      { id: "footerCopyright", label: "Copyright Text", type: "text", placeholder: "© 2024 NovaTech", section: "Footer" },
      { id: "facebookUrl", label: "Facebook", type: "text", placeholder: "https://facebook.com/...", section: "Footer" },
      { id: "twitterUrl", label: "Twitter", type: "text", placeholder: "https://twitter.com/...", section: "Footer" },
      { id: "linkedinUrl", label: "LinkedIn", type: "text", placeholder: "https://linkedin.com/...", section: "Footer" },
    ]
  },
  {
    id: "business-3",
    name: "Agency Elite",
    description: "A premium agency template to highlight services and case studies.",
    thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
    category: "Business",
    fields: [
      { id: "headerType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Header" },
      { id: "companyName", label: "Company Name", type: "text", placeholder: "Elite Media", section: "Header" },
      { id: "logoUrl", label: "Logo URL", type: "image", placeholder: "Choose from gallery", section: "Header" },

      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "Creative Excellence", section: "Hero Banner" },
      { id: "tagline", label: "Company Tagline", type: "text", placeholder: "Award-winning digital agency", section: "Hero Banner" },
      { id: "heroImage", label: "Hero Image URL", type: "image", placeholder: "Choose from gallery", section: "Hero Banner" },

      { id: "service1_name", label: "Service 1 Name", type: "text", placeholder: "Brand Identity", section: "Services" },
      { id: "service1_image", label: "Service 1 Icon/Image URL", type: "image", placeholder: "Choose from gallery", section: "Services" },
      { id: "service1_desc", label: "Service 1 Description", type: "textarea", placeholder: "Creating cohesive brand experiences...", section: "Services" },

      { id: "service2_name", label: "Service 2 Name", type: "text", placeholder: "Digital Marketing", section: "Services" },
      { id: "service2_image", label: "Service 2 Icon/Image URL", type: "image", placeholder: "Choose from gallery", section: "Services" },
      { id: "service2_desc", label: "Service 2 Description", type: "textarea", placeholder: "Data-driven marketing campaigns...", section: "Services" },

      { id: "service3_name", label: "Service 3 Name", type: "text", placeholder: "Video Production", section: "Services" },
      { id: "service3_image", label: "Service 3 Icon/Image URL", type: "image", placeholder: "Choose from gallery", section: "Services" },
      { id: "service3_desc", label: "Service 3 Description", type: "textarea", placeholder: "Compelling visual storytelling...", section: "Services" },

      { id: "service4_name", label: "Service 4 Name", type: "text", placeholder: "Web Architecture", section: "Services" },
      { id: "service4_image", label: "Service 4 Icon/Image URL", type: "image", placeholder: "Choose from gallery", section: "Services" },
      { id: "service4_desc", label: "Service 4 Description", type: "textarea", placeholder: "Scalable and robust web solutions...", section: "Services" },

      { id: "aboutUsTitle", label: "About Title", type: "text", placeholder: "Our Team", section: "About Us" },
      { id: "aboutUsContent", label: "About Content", type: "textarea", placeholder: "We are a collective of creators and strategists...", section: "About Us" },
      { id: "aboutUsImage", label: "About Image URL", type: "image", placeholder: "Choose from gallery", section: "About Us" },

      { id: "contactEmail", label: "Contact Email", type: "text", placeholder: "info@elitemedia.com", section: "Footer" },
      { id: "phone", label: "Phone Number", type: "number", placeholder: "1234567890", section: "Footer" },
      { id: "address", label: "Office Address", type: "text", placeholder: "Creative District, London", section: "Footer" },
      { id: "footerAbout", label: "Footer About Text", type: "textarea", placeholder: "Transforming ideas into reality...", section: "Footer" },
      { id: "footerCopyright", label: "Copyright Text", type: "text", placeholder: "© 2024 Elite Media", section: "Footer" },
      { id: "facebookUrl", label: "Facebook URL", type: "text", placeholder: "https://facebook.com/...", section: "Footer" },
      { id: "twitterUrl", label: "Twitter URL", type: "text", placeholder: "https://twitter.com/...", section: "Footer" },
      { id: "linkedinUrl", label: "LinkedIn URL", type: "text", placeholder: "https://linkedin.com/...", section: "Footer" },
    ]
  },
  {
    id: "doctor-1",
    name: "SafeCare Medical",
    description: "A modern and trustworthy template for clinics and private practices.",
    thumbnail: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
    category: "Doctor",
    fields: [
      { id: "headerType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Header" },
      { id: "clinicName", label: "Clinic/Doctor Name", type: "text", placeholder: "SafeCare Medical", section: "Header" },
      { id: "logoUrl", label: "Logo URL", type: "image", placeholder: "Choose from gallery", section: "Header" },

      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "Your Health, Our Priority", section: "Hero Banner" },
      { id: "specialty", label: "Primary Specialty", type: "text", placeholder: "General Internal Medicine", section: "Hero Banner" },
      { id: "heroImage", label: "Hero Image URL", type: "image", placeholder: "Consultation image", section: "Hero Banner" },

      { id: "aboutUsTitle", label: "About Title", type: "text", placeholder: "Meet Dr. Smith", section: "About Us" },
      { id: "bio", label: "Doctor Biography", type: "textarea", placeholder: "Dr. Smith has over 15 years of experience...", section: "About Us" },
      { id: "aboutImage", label: "Doctor Image URL", type: "image", placeholder: "Doctor profile photo", section: "About Us" },

      { id: "education", label: "Education & Training", type: "textarea", placeholder: "MD from Harvard Medical School...", section: "Professional" },
      { id: "experience", label: "Years of Experience", type: "number", placeholder: "15", section: "Professional" },

      { id: "contactEmail", label: "Contact Email", type: "text", placeholder: "appointments@safecare.com", section: "Footer" },
      { id: "phone", label: "Phone Number", type: "number", placeholder: "1234567890", section: "Footer" },
      { id: "address", label: "Clinic Address", type: "text", placeholder: "456 Medical Way, NY", section: "Footer" },
      { id: "workingHours", label: "Working Hours", type: "text", placeholder: "Mon-Fri: 9AM - 5PM", section: "Footer" },
      { id: "footerCopyright", label: "Copyright Text", type: "text", placeholder: "© 2024 SafeCare Medical", section: "Footer" },
    ]
  },
  {
    id: "doctor-2",
    name: "Evergreen Wellness",
    description: "A calming and holistic template for wellness centers and specialists.",
    thumbnail: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    category: "Doctor",
    fields: [
      { id: "headerType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Header" },
      { id: "clinicName", label: "Wellness Center Name", type: "text", placeholder: "Evergreen Wellness", section: "Header" },
      { id: "logoUrl", label: "Logo URL", type: "image", placeholder: "Choose from gallery", section: "Header" },

      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "Holistic Path to Wellness", section: "Hero Banner" },
      { id: "specialty", label: "Focus Area", type: "text", placeholder: "Integrative Medicine & Nutrition", section: "Hero Banner" },
      { id: "heroImage", label: "Hero Image URL", type: "image", placeholder: "Serene wellness image", section: "Hero Banner" },

      { id: "aboutUsTitle", label: "About Title", type: "text", placeholder: "Our Philosophy", section: "About Us" },
      { id: "bio", label: "Philosophy Content", type: "textarea", placeholder: "We believe in treating the whole person...", section: "About Us" },
      { id: "aboutImage", label: "Philosophy Image URL", type: "image", placeholder: "Peaceful nature image", section: "About Us" },

      { id: "contactEmail", label: "Email", type: "text", placeholder: "hello@evergreen.com", section: "Footer" },
      { id: "phone", label: "Phone", type: "number", placeholder: "1234567890", section: "Footer" },
      { id: "address", label: "Location", type: "text", placeholder: "789 Green St, CA", section: "Footer" },
      { id: "footerCopyright", label: "Copyright Text", type: "text", placeholder: "© 2024 Evergreen Wellness", section: "Footer" },
    ]
  },
  {
    id: "doctor-3",
    name: "Precision Surgical",
    description: "A professional, high-tech template for surgeons and specialists.",
    thumbnail: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800",
    category: "Doctor",
    fields: [
      { id: "headerType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Header" },
      { id: "clinicName", label: "Surgical Center Name", type: "text", placeholder: "Precision Surgical", section: "Header" },
      { id: "logoUrl", label: "Logo URL", type: "image", placeholder: "Choose from gallery", section: "Header" },

      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "Advanced Surgical Excellence", section: "Hero Banner" },
      { id: "specialty", label: "Surgical specialty", type: "text", placeholder: "Orthopedic & Sports Medicine", section: "Hero Banner" },
      { id: "heroImage", label: "Hero Image URL", type: "image", placeholder: "High-tech surgery room", section: "Hero Banner" },

      { id: "aboutUsTitle", label: "About Title", type: "text", placeholder: "Expert Precision", section: "About Us" },
      { id: "bio", label: "Expertise Description", type: "textarea", placeholder: "Leading the field in minimally invasive...", section: "About Us" },
      { id: "aboutImage", label: "Center Image URL", type: "image", placeholder: "Medical technology photo", section: "About Us" },

      { id: "contactEmail", label: "Email", type: "text", placeholder: "info@precisionsurgical.com", section: "Footer" },
      { id: "phone", label: "Phone", type: "number", placeholder: "1234567890", section: "Footer" },
      { id: "address", label: "Address", type: "text", placeholder: "101 Tech Plaza, TX", section: "Footer" },
      { id: "footerCopyright", label: "Copyright Text", type: "text", placeholder: "© 2024 Precision Surgical", section: "Footer" },
    ]
  }
];
