export const templates = [
  {
    id: "portfolio-1",
    name: "Modern Portfolio",
    description: "A sleek, dark-themed portfolio for developers and creatives.",
    thumbnail: "/images/templates/template-img-1.jpg",
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
    thumbnail: "/images/templates/template-img-2.jpg",
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
    thumbnail: "/images/templates/template-img-3.jpg",
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
    thumbnail: "/images/templates/template-img-4.jpg",
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
    thumbnail: "/images/templates/template-img-5.jpg",
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
    thumbnail: "/images/templates/template-img-6.jpg",
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
    thumbnail: "/images/templates/template-img-7.jpg",
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
    thumbnail: "/images/templates/template-img-8.jpg",
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
    thumbnail: "/images/templates/template-img-9.jpg",
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
  },
  {
    id: "event-1",
    name: "Elite Event Management",
    description: "A premium and corporate template for event management agencies.",
    thumbnail: "/images/templates/template-img-10.jpg",
    category: "Event Management",
    tags: ["event", "management", "agency", "corporate"],
    fields: [
      { id: "headerType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Header" },
      { id: "agencyName", label: "Agency Name", type: "text", placeholder: "Elite Events", section: "Header" },
      { id: "tagline", label: "Agency Tagline", type: "text", placeholder: "Perfecting Every Detail", section: "Header" },
      { id: "logoUrl", label: "Agency Logo", type: "image", section: "Header" },
      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "We Create Extraordinary Experiences", section: "Hero Banner" },
      { id: "heroImage", label: "Hero Photo", type: "image", section: "Hero Banner" },
      { id: "aboutUsTitle", label: "About Agency Title", type: "text", placeholder: "Our Excellence", section: "About" },
      { id: "bio", label: "Agency Biography", type: "textarea", placeholder: "10 years of managing global events...", section: "About" },
      { id: "aboutImage", label: "Agency Work Photo", type: "image", section: "About" },
      { id: "contactEmail", label: "Agency Email", type: "text", placeholder: "contact@elite-events.com", section: "Footer" },
      { id: "address", label: "HQ Address", type: "text", placeholder: "456 Plaza St, London", section: "Footer" },
      { id: "footerCopyright", label: "Copyright", type: "text", placeholder: "© 2024 Elite Management", section: "Footer" }
    ]
  },
  {
    id: "event-2",
    name: "Aura Events Agency",
    description: "A creative and modern template for high-impact event management.",
    thumbnail: "/images/templates/template-img-11.jpg",
    category: "Event Management",
    tags: ["creative", "modern", "activations"],
    fields: [
      { id: "headerType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Header" },
      { id: "agencyName", label: "Agency Name", type: "text", placeholder: "Aura", section: "Header" },
      { id: "tagline", label: "Tagline", type: "text", placeholder: "Event Design for the Future", section: "Header" },
      { id: "logoUrl", label: "Logo", type: "image", section: "Header" },
      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "Memories Designed.", section: "Hero Banner" },
      { id: "heroImage", label: "Hero Banner", type: "image", section: "Hero Banner" },
      { id: "aboutUsTitle", label: "Vision Title", type: "text", placeholder: "Our Core Vision", section: "Vision" },
      { id: "bio", label: "Core Values", type: "textarea", placeholder: "Sustainability and Innovation in events...", section: "Vision" },
      { id: "aboutImage", label: "Vision Image", type: "image", section: "Vision" },
      { id: "contactEmail", label: "Email", type: "text", placeholder: "hello@aura.io", section: "Footer" },
      { id: "address", label: "Office", type: "text", placeholder: "Innovation Bay, CA", section: "Footer" },
      { id: "footerCopyright", label: "Copyright Info", type: "text", placeholder: "© 2024 Aura Agency", section: "Footer" }
    ]
  },
  {
    id: "event-3",
    name: "Party Pros Management",
    description: "A vibrant template for agencies focusing on social events and celebrations.",
    thumbnail: "/images/templates/template-img-12.jpg",
    category: "Event Management",
    tags: ["social", "party", "weddings"],
    fields: [
      { id: "headerType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Header" },
      { id: "agencyName", label: "Agency Name", type: "text", placeholder: "Party Pros", section: "Header" },
      { id: "tagline", label: "Tagline", type: "text", placeholder: "The Life of the Party", section: "Header" },
      { id: "logoUrl", label: "Logo", type: "image", section: "Header" },
      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "Let Us Manage Your Big Day!", section: "Hero Banner" },
      { id: "heroImage", label: "Hero Image", type: "image", section: "Hero Banner" },
      { id: "aboutUsTitle", label: "Agency Story", type: "text", placeholder: "Our Story", section: "About" },
      { id: "bio", label: "Background", type: "textarea", placeholder: "How we became the top party planners...", section: "About" },
      { id: "aboutImage", label: "Team Photo", type: "image", section: "About" },
      { id: "contactEmail", label: "Contact Us", type: "text", placeholder: "book@partypros.com", section: "Footer" },
      { id: "address", label: "Location", type: "text", placeholder: "Sunset Strip, Miami", section: "Footer" },
      { id: "footerCopyright", label: "Footer Info", type: "text", placeholder: "© 2024 Party Pros", section: "Footer" }
    ]
  },
  {
    id: "realestate-1",
    name: "Modern Realty",
    description: "A professional and clean template for real estate agents and agencies.",
    thumbnail: "/images/templates/template-img-13.jpg",
    category: "Real Estate",
    tags: ["realestate", "modern", "agency"],
    fields: [
      { id: "headerType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Header" },
      { id: "agencyName", label: "Agency Name", type: "text", placeholder: "Vista Realty", section: "Header" },
      { id: "tagline", label: "Agency Tagline", type: "text", placeholder: "Defining the Future of Living", section: "Header" },
      { id: "logoUrl", label: "Agency Logo", type: "image", section: "Header" },
      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "Find Your Dream Home", section: "Hero Banner" },
      { id: "heroImage", label: "Hero Photo", type: "image", section: "Hero Banner" },
      { id: "aboutUsTitle", label: "About Us Title", type: "text", placeholder: "Local Experts Since 1998", section: "About" },
      { id: "bio", label: "Agency/Agent Bio", type: "textarea", placeholder: "We pride ourselves on...", section: "About" },
      { id: "aboutImage", label: "Team Photo", type: "image", section: "About" },
      {
        id: "projects", label: "Featured Properties", type: "list", section: "Listings",
        itemSchema: [
          { id: "name", label: "Property Title", type: "text", placeholder: "Modern Sunset Villa" },
          { id: "desc", label: "Price/Info", type: "text", placeholder: "$1,250,000 | 4BR 3BA" },
          { id: "image", label: "Property Image", type: "image" }
        ]
      },
      { id: "contactEmail", label: "Inquiry Email", type: "text", placeholder: "sales@vista.com", section: "Footer" },
      { id: "phone", label: "Contact Phone", type: "text", placeholder: "+1-234-567-890", section: "Footer" },
      { id: "address", label: "Office Address", type: "text", placeholder: "123 Realty Lane, Seattle", section: "Footer" },
      { id: "footerCopyright", label: "Copyright", type: "text", placeholder: "© 2024 Vista Realty", section: "Footer" }
    ]
  },
  {
    id: "realestate-2",
    name: "Luxury Estates",
    description: "A high-end, minimalist template for luxury property showcases.",
    thumbnail: "/images/templates/template-img-14.jpg",
    category: "Real Estate",
    tags: ["luxury", "minimalist", "exclusive"],
    fields: [
      { id: "headerType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Header" },
      { id: "agencyName", label: "Estate Name", type: "text", placeholder: "Aura Estates", section: "Header" },
      { id: "tagline", label: "Tagline", type: "text", placeholder: "Exceptional Properties for Exceptional Lives", section: "Header" },
      { id: "logoUrl", label: "Logo", type: "image", section: "Header" },
      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "Elegance Defined.", section: "Hero Banner" },
      { id: "heroImage", label: "Hero Photo", type: "image", section: "Hero Banner" },
      { id: "aboutUsTitle", label: "Philosophy Title", type: "text", placeholder: "Our Core Philosophy", section: "About" },
      { id: "bio", label: "About Content", type: "textarea", placeholder: "Curating the world's most exclusive...", section: "About" },
      { id: "aboutImage", label: "Work Image", type: "image", section: "About" },
      {
        id: "projects", label: "Exclusive Portfolio", type: "list", section: "Gallery",
        itemSchema: [
          { id: "name", label: "Estate Name", type: "text", placeholder: "Villa Azure" },
          { id: "desc", label: "Details", type: "text", placeholder: "Malibu, CA | Price on Request" },
          { id: "image", label: "Image", type: "image" }
        ]
      },
      { id: "contactEmail", label: "Private Inquiry", type: "text", placeholder: "concierge@aura.com", section: "Footer" },
      { id: "address", label: "Global HQ", type: "text", placeholder: "Pacific Coast Hwy, CA", section: "Footer" },
      { id: "footerCopyright", label: "Copyright", type: "text", placeholder: "© 2024 Aura Luxury", section: "Footer" }
    ]
  },
  {
    id: "realestate-3",
    name: "Suburban Expert",
    description: "A friendly and community-focused template for neighborhood agents.",
    thumbnail: "/images/templates/template-img-15.jpg",
    category: "Real Estate",
    tags: ["suburban", "agent", "community"],
    fields: [
      { id: "headerType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Header" },
      { id: "agencyName", label: "Agent Name", type: "text", placeholder: "Jane Smith", section: "Header" },
      { id: "tagline", label: "Tagline", type: "text", placeholder: "Your Neighborhood Specialist", section: "Header" },
      { id: "logoUrl", label: "Logo", type: "image", section: "Header" },
      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "Welcome Home to Willow Creek", section: "Hero Banner" },
      { id: "heroImage", label: "Hero Photo", type: "image", section: "Hero Banner" },
      { id: "aboutUsTitle", label: "Agent Story", type: "text", placeholder: "Why I Love This Community", section: "About Me" },
      { id: "bio", label: "Agent Bio", type: "textarea", placeholder: "I've lived here for 20 years...", section: "About Me" },
      { id: "aboutImage", label: "Headshot", type: "image", section: "About Me" },
      {
        id: "projects", label: "Featured Listings", type: "list", section: "Homes",
        itemSchema: [
          { id: "name", label: "Home Type", type: "text", placeholder: "Family Craftsman" },
          { id: "desc", label: "Location", type: "text", placeholder: "Willow Creek | $650,000" },
          { id: "image", label: "Home Photo", type: "image" }
        ]
      },
      { id: "contactEmail", label: "Direct Email", type: "text", placeholder: "jane@willow.com", section: "Footer" },
      { id: "phone", label: "Cell Phone", type: "text", placeholder: "123-456-7890", section: "Footer" },
      { id: "footerCopyright", label: "Copyright", type: "text", placeholder: "© 2024 Jane Smith Realty", section: "Footer" }
    ]
  },
  {
    id: "ca-1",
    name: "Corporate Firm",
    description: "A professional and structured template for established CA and accounting firms.",
    thumbnail: "/images/templates/template-img-16.jpg",
    category: "Chartered Accountant",
    tags: ["ca", "accounting", "corporate", "firm"],
    fields: [
      { id: "headerType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Header" },
      { id: "firmName", label: "Firm Name", type: "text", placeholder: "Smith & Associates", section: "Header" },
      { id: "tagline", label: "Tagline", type: "text", placeholder: "Excellence in Financial Services", section: "Header" },
      { id: "logoUrl", label: "Logo", type: "image", section: "Header" },
      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "Trusted Financial Advisors", section: "Hero Banner" },
      { id: "heroImage", label: "Hero Photo", type: "image", section: "Hero Banner" },
      { id: "aboutUsTitle", label: "About Title", type: "text", placeholder: "Our Legacy", section: "About Firm" },
      { id: "bio", label: "Firm Bio", type: "textarea", placeholder: "Over 20 years of delivering uncompromising financial advice...", section: "About Firm" },
      { id: "aboutImage", label: "Firm/Office Photo", type: "image", section: "About Firm" },
      {
        id: "services", label: "Core Services", type: "list", section: "Services",
        itemSchema: [
          { id: "name", label: "Service Name", type: "text", placeholder: "Corporate Audit" },
          { id: "desc", label: "Description", type: "textarea", placeholder: "Comprehensive auditing and assurance..." },
          { id: "image", label: "Service Icon/Photo", type: "image" }
        ]
      },
      { id: "contactEmail", label: "Contact Email", type: "text", placeholder: "info@smithassociates.com", section: "Footer" },
      { id: "phone", label: "Phone Number", type: "text", placeholder: "+1-800-555-0199", section: "Footer" },
      { id: "address", label: "Office Address", type: "text", placeholder: "Financial District, NY", section: "Footer" },
      { id: "footerCopyright", label: "Copyright", type: "text", placeholder: "© 2024 Smith & Associates CA", section: "Footer" }
    ]
  },
  {
    id: "ca-2",
    name: "Modern Consultant",
    description: "A clean, minimalist template for independent CAs or freelance financial advisors.",
    thumbnail: "/images/templates/template-img-17.jpg",
    category: "Chartered Accountant",
    tags: ["ca", "consultant", "independent", "modern"],
    fields: [
      { id: "headerType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Header" },
      { id: "firmName", label: "Your Name", type: "text", placeholder: "Alex Johnson, CA", section: "Header" },
      { id: "tagline", label: "Tagline", type: "text", placeholder: "Strategic Financial Consulting", section: "Header" },
      { id: "logoUrl", label: "Logo/Initials", type: "image", section: "Header" },
      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "Clarity for Your Finances", section: "Hero Banner" },
      { id: "heroImage", label: "Hero Photo", type: "image", section: "Hero Banner" },
      { id: "aboutUsTitle", label: "About Title", type: "text", placeholder: "Meet Your Consultant", section: "About Me" },
      { id: "bio", label: "Professional Bio", type: "textarea", placeholder: "I specialize in personalized tax strategies and wealth management...", section: "About Me" },
      { id: "aboutImage", label: "Headshot", type: "image", section: "About Me" },
      {
        id: "services", label: "Expertise", type: "list", section: "Services",
        itemSchema: [
          { id: "name", label: "Area of Expertise", type: "text", placeholder: "Wealth Management" },
          { id: "desc", label: "Details", type: "textarea", placeholder: "Personalized portfolio strategy..." },
          { id: "image", label: "Icon/Image", type: "image" }
        ]
      },
      { id: "contactEmail", label: "Direct Email", type: "text", placeholder: "alex@ajconsulting.com", section: "Footer" },
      { id: "phone", label: "Direct Phone", type: "text", placeholder: "123-456-7890", section: "Footer" },
      { id: "address", label: "Location", type: "text", placeholder: "Remote / Bay Area", section: "Footer" },
      { id: "footerCopyright", label: "Copyright", type: "text", placeholder: "© 2024 Alex Johnson", section: "Footer" }
    ]
  },
  {
    id: "ca-3",
    name: "Tax & Audit Experts",
    description: "A straightforward, approachable design focused on tax filing and compliance.",
    thumbnail: "/images/templates/template-img-18.jpg",
    category: "Chartered Accountant",
    tags: ["ca", "tax", "audit", "compliance"],
    fields: [
      { id: "headerType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Header" },
      { id: "firmName", label: "Firm Name", type: "text", placeholder: "Apex Tax Advisors", section: "Header" },
      { id: "tagline", label: "Tagline", type: "text", placeholder: "Navigating Complexity with Ease", section: "Header" },
      { id: "logoUrl", label: "Logo", type: "image", section: "Header" },
      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "Stress-Free Tax & Compliance", section: "Hero Banner" },
      { id: "heroImage", label: "Hero Photo", type: "image", section: "Hero Banner" },
      { id: "aboutUsTitle", label: "About Title", type: "text", placeholder: "Our Expertise", section: "About Us" },
      { id: "bio", label: "Firm Bio", type: "textarea", placeholder: "Dedicated to providing accurate and timely tax solutions...", section: "About Us" },
      { id: "aboutImage", label: "Team/Office Photo", type: "image", section: "About Us" },
      {
        id: "services", label: "Our Services", type: "list", section: "Services",
        itemSchema: [
          { id: "name", label: "Service Name", type: "text", placeholder: "Tax Filing" },
          { id: "desc", label: "Details", type: "textarea", placeholder: "Individual and corporate tax returns..." },
          { id: "image", label: "Icon/Image", type: "image" }
        ]
      },
      { id: "contactEmail", label: "Email", type: "text", placeholder: "support@apextax.com", section: "Footer" },
      { id: "phone", label: "Phone", type: "text", placeholder: "+1-888-555-TAX1", section: "Footer" },
      { id: "address", label: "Address", type: "text", placeholder: "100 Compliance Way, TX", section: "Footer" },
      { id: "footerCopyright", label: "Copyright", type: "text", placeholder: "© 2024 Apex Tax Advisors", section: "Footer" }
    ]
  },
  {
    id: "teacher-1",
    name: "Academic Professional",
    description: "A traditional, highly structured design suited for university professors or formal educators.",
    thumbnail: "/images/templates/template-img-1.jpg",
    category: "Teacher",
    tags: ["teacher", "professor", "academic", "formal"],
    fields: [
      { id: "headerType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Header" },
      { id: "name", label: "Name", type: "text", placeholder: "Prof. Sarah Jenkins", section: "Header" },
      { id: "tagline", label: "Title/Department", type: "text", placeholder: "Department of Literature", section: "Header" },
      { id: "logoUrl", label: "University/School Logo", type: "image", section: "Header" },
      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "Fostering Critical Minds.", section: "Hero Banner" },
      { id: "heroImage", label: "Hero Photo", type: "image", section: "Hero Banner" },
      { id: "aboutUsTitle", label: "About Title", type: "text", placeholder: "Academic Background", section: "About" },
      { id: "bio", label: "Biography", type: "textarea", placeholder: "I have been teaching literature for over 15 years, focusing on modern contemporary themes...", section: "About" },
      { id: "aboutImage", label: "Profile Photo", type: "image", section: "About" },
      {
        id: "services", label: "Courses Taught", type: "list", section: "Courses",
        itemSchema: [
          { id: "name", label: "Course Name", type: "text", placeholder: "Introduction to Modern Lit" },
          { id: "desc", label: "Description", type: "textarea", placeholder: "A survey of 20th-century literature." },
          { id: "image", label: "Course Image/Icon", type: "image" }
        ]
      },
      { id: "contactEmail", label: "Email", type: "text", placeholder: "s.jenkins@university.edu", section: "Footer" },
      { id: "phone", label: "Office Phone", type: "text", placeholder: "123-456-7890", section: "Footer" },
      { id: "address", label: "Office Location", type: "text", placeholder: "Arts Building, Room 402", section: "Footer" },
      { id: "footerCopyright", label: "Copyright", type: "text", placeholder: "© 2024 Sarah Jenkins", section: "Footer" }
    ]
  },
  {
    id: "teacher-2",
    name: "Creative Educator",
    description: "A vibrant, approachable design perfect for elementary teachers, art instructors, or creative subjects.",
    thumbnail: "/images/templates/template-img-2.jpg",
    category: "Teacher",
    tags: ["teacher", "creative", "elementary", "art"],
    fields: [
      { id: "headerType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Header" },
      { id: "name", label: "Teacher Name", type: "text", placeholder: "Ms. Emily Art", section: "Header" },
      { id: "tagline", label: "Subject", type: "text", placeholder: "Creative Arts & Design", section: "Header" },
      { id: "logoUrl", label: "Logo/Icon", type: "image", section: "Header" },
      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "Inspiring Young Creators!", section: "Hero Banner" },
      { id: "heroImage", label: "Classroom Photo", type: "image", section: "Hero Banner" },
      { id: "aboutUsTitle", label: "About Title", type: "text", placeholder: "Meet Your Teacher", section: "About" },
      { id: "bio", label: "Teaching Philosophy", type: "textarea", placeholder: "I believe every student has an artist inside them waiting to be discovered...", section: "About" },
      { id: "aboutImage", label: "Teacher Photo", type: "image", section: "About" },
      {
        id: "services", label: "Class Activities", type: "list", section: "Activities",
        itemSchema: [
          { id: "name", label: "Activity Name", type: "text", placeholder: "Watercolor Basics" },
          { id: "desc", label: "Description", type: "textarea", placeholder: "Learning color mixing and brush techniques." },
          { id: "image", label: "Activity Photo", type: "image" }
        ]
      },
      { id: "contactEmail", label: "Email", type: "text", placeholder: "emily@school.edu", section: "Footer" },
      { id: "phone", label: "Phone", type: "text", placeholder: "123-456-7890", section: "Footer" },
      { id: "address", label: "Classroom", type: "text", placeholder: "Room 101, Elementary Wing", section: "Footer" },
      { id: "footerCopyright", label: "Copyright", type: "text", placeholder: "© 2024 Emily Art", section: "Footer" }
    ]
  },
  {
    id: "teacher-3",
    name: "Private Tutor",
    description: "A conversion-focused design tailored for 1-on-1 coaching, highlighting specific subjects and booking.",
    thumbnail: "/images/templates/template-img-3.jpg",
    category: "Teacher",
    tags: ["tutor", "coaching", "private", "math"],
    fields: [
      { id: "headerType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Header" },
      { id: "name", label: "Tutor Name", type: "text", placeholder: "David Mathers", section: "Header" },
      { id: "tagline", label: "Subject", type: "text", placeholder: "Advanced Mathematics Tutor", section: "Header" },
      { id: "logoUrl", label: "Logo", type: "image", section: "Header" },
      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "Master Math with Confidence.", section: "Hero Banner" },
      { id: "heroImage", label: "Hero Photo", type: "image", section: "Hero Banner" },
      { id: "aboutUsTitle", label: "About Title", type: "text", placeholder: "Why Choose Me?", section: "About" },
      { id: "bio", label: "Experience", type: "textarea", placeholder: "With a background in Engineering, I break down complex concepts into simple steps...", section: "About" },
      { id: "aboutImage", label: "Tutor Photo", type: "image", section: "About" },
      {
        id: "services", label: "Tutoring Subjects", type: "list", section: "Subjects",
        itemSchema: [
          { id: "name", label: "Subject Name", type: "text", placeholder: "Calculus I & II" },
          { id: "desc", label: "Description", type: "textarea", placeholder: "Limits, derivatives, and integrals made easy." },
          { id: "image", label: "Subject Icon", type: "image" }
        ]
      },
      { id: "contactEmail", label: "Booking Email", type: "text", placeholder: "book@davidtutors.com", section: "Footer" },
      { id: "phone", label: "Phone", type: "text", placeholder: "123-456-7890", section: "Footer" },
      { id: "address", label: "Location", type: "text", placeholder: "Online via Zoom", section: "Footer" },
      { id: "footerCopyright", label: "Copyright", type: "text", placeholder: "© 2024 David Tutors", section: "Footer" }
    ]
  }
];
