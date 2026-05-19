export const templates = [
  {
    id: "portfolio-premium",
    name: "Apple Premium",
    description: "Ultra-high-end portfolio inspired by Apple's minimalist aesthetic. Perfect for world-class designers and engineers.",
    thumbnail: "/images/templates/template-img-1.jpg",
    category: "Portfolio",
    tags: ["apple", "minimalist", "premium", "saas", "clean"],
    fields: [
      { id: "navbarType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Navbar Section" },
      { id: "name", label: "Portfolio Name", type: "text", placeholder: "Julian Vance", section: "Navbar Section" },
      { id: "logoUrl", label: "Logo Upload", type: "image", section: "Navbar Section" },
      { id: "navFontSize", label: "Navbar Font Size", type: "range", min: 12, max: 40, step: 1, section: "Navbar Section" },
      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "CRAFTING THE DIGITAL AVANT-GARDE.", section: "Hero Section" },
      { id: "heroGradientText", label: "Gradient Word", type: "text", placeholder: "AVANT-GARDE", section: "Hero Section" },
      { id: "aboutUsTitle", label: "About Heading", type: "text", placeholder: "The Architecture of Intent", section: "About Section" },
      { id: "aboutBio", label: "About Description", type: "textarea", placeholder: "I believe that every pixel should serve a purpose...", section: "About Section" },
    ]
  },
  {
    id: "portfolio-1",
    name: "Modern Portfolio",
    description: "A sleek, dark-themed premium portfolio with cinematic animations and bento layouts.",
    thumbnail: "/images/templates/template-img-1.jpg",
    category: "Portfolio",
    tags: ["developer", "designer", "creative", "tech", "premium"],
    fields: [
      { id: "navbarType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Navbar Section" },
      { id: "name", label: "Portfolio Name", type: "text", placeholder: "Julian Vance", section: "Navbar Section" },
      { id: "logoUrl", label: "Logo Upload", type: "image", section: "Navbar Section" },
      { id: "navFontSize", label: "Navbar Font Size", type: "range", min: 12, max: 40, step: 1, section: "Navbar Section" },
      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "CRAFTING THE DIGITAL AVANT-GARDE.", section: "Hero" },
      { id: "role", label: "Professional Role", type: "text", placeholder: "Senior Experience Designer", section: "Hero" },
      { id: "bio", label: "Hero Description", type: "textarea", placeholder: "Specializing in the intersection of visual narrative...", section: "Hero" },
      { id: "avatarUrl", label: "Profile Image URL", type: "image", section: "Hero" },
      { id: "aboutUsTitle", label: "About Title", type: "text", placeholder: "The Architecture of Intent", section: "About" },
      { id: "experience_years", label: "Years of Experience", type: "number", placeholder: "08", section: "About" },
      {
        id: "skills", label: "Technical Stack", type: "list", section: "Skills",
        itemSchema: [
          { id: "category", label: "Category", type: "text", placeholder: "Frontend" },
          { id: "icon", label: "Icon Symbol", type: "text", placeholder: "✦" },
          { id: "items", label: "Skills (comma separated)", type: "text", placeholder: "React, Next.js, Tailwind" }
        ]
      },
      {
        id: "projects", label: "Selected Projects", type: "list", section: "Projects",
        itemSchema: [
          { id: "title", label: "Project Title", type: "text", placeholder: "VELOCITY CORE" },
          { id: "desc", label: "Description", type: "textarea", placeholder: "A high-frequency trading interface..." },
          { id: "image", label: "Project Image", type: "image" },
          { id: "tags", label: "Tags (comma separated)", type: "text", placeholder: "Fintech, UI/UX" }
        ]
      },
      {
        id: "experience", label: "Career Trajectory", type: "list", section: "Timeline",
        itemSchema: [
          { id: "role", label: "Role/Title", type: "text", placeholder: "Staff Product Designer" },
          { id: "company", label: "Company", type: "text", placeholder: "Aura Systems" },
          { id: "period", label: "Time Period", type: "text", placeholder: "2021 — Present" },
          { id: "desc", label: "Description", type: "textarea", placeholder: "Orchestrating design systems..." }
        ]
      },
      {
        id: "testimonials", label: "Testimonials", type: "list", section: "Social Proof",
        itemSchema: [
          { id: "name", label: "Client Name", type: "text", placeholder: "Sarah Chen" },
          { id: "role", label: "Client Role", type: "text", placeholder: "CTO @ Flux" },
          { id: "text", label: "Review Text", type: "textarea", placeholder: "Julian is an exceptional engineer..." },
          { id: "image", label: "Client Image", type: "image" }
        ]
      },
      {
        id: "services", label: "Core Services", type: "list", section: "Services",
        itemSchema: [
          { id: "title", label: "Service Title", type: "text", placeholder: "Web Development" },
          { id: "desc", label: "Description", type: "textarea", placeholder: "Building high-performance SaaS platforms..." },
          { id: "icon", label: "Icon Emoji", type: "text", placeholder: "🚀" }
        ]
      },
      { id: "email", label: "Contact Email", type: "text", placeholder: "julian@vance.design", section: "Contact" },
      { id: "phone", label: "Phone Number", type: "text", placeholder: "+1 234 567 890", section: "Contact" },
      { id: "location", label: "Location", type: "text", placeholder: "San Francisco, CA", section: "Contact" },
      { id: "githubUrl", label: "GitHub URL", type: "text", placeholder: "#", section: "Socials" },
      { id: "linkedinUrl", label: "LinkedIn URL", type: "text", placeholder: "#", section: "Socials" },
      { id: "twitterUrl", label: "Twitter URL", type: "text", placeholder: "#", section: "Socials" },
    ]
  },
  {
    id: "portfolio-2",
    name: "Creative Studio",
    description: "A minimalist, light-themed premium portfolio focused on bold typography and creative precision.",
    thumbnail: "/images/templates/template-img-2.jpg",
    category: "Portfolio",
    tags: ["designer", "creative", "studio", "premium"],
    fields: [
      { id: "navbarType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Navbar Section" },
      { id: "name", label: "Portfolio Name", type: "text", placeholder: "Aria Sterling", section: "Navbar Section" },
      { id: "logoUrl", label: "Logo Upload", type: "image", section: "Navbar Section" },
      { id: "navFontSize", label: "Navbar Font Size", type: "range", min: 12, max: 40, step: 1, section: "Navbar Section" },
      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "ELEVATING DIGITAL STANDARDS.", section: "Hero" },
      { id: "role", label: "Professional Role", type: "text", placeholder: "Creative Technologist", section: "Hero" },
      { id: "bio", label: "Hero Description", type: "textarea", placeholder: "Merging high-end aesthetics with technical precision...", section: "Hero" },
      { id: "avatarUrl", label: "Profile Image URL", type: "image", section: "Hero" },
      { id: "aboutUsTitle", label: "About Title", type: "text", placeholder: "A Philosophy of Clarity", section: "About" },
      {
        id: "skills", label: "Technical Stack", type: "list", section: "Skills",
        itemSchema: [
          { id: "category", label: "Category", type: "text", placeholder: "Frameworks" },
          { id: "icon", label: "Icon Symbol", type: "text", placeholder: "⚙️" },
          { id: "items", label: "Skills (comma separated)", type: "text", placeholder: "React, Next.js, Tailwind" }
        ]
      },
      {
        id: "projects", label: "Selected Projects", type: "list", section: "Projects",
        itemSchema: [
          { id: "title", label: "Project Title", type: "text", placeholder: "NEBULAE" },
          { id: "desc", label: "Description", type: "textarea", placeholder: "A generative art engine..." },
          { id: "image", label: "Project Image", type: "image" },
          { id: "tags", label: "Tags (comma separated)", type: "text", placeholder: "Generative, Three.js" }
        ]
      },
      {
        id: "experience", label: "Career Sequence", type: "list", section: "Timeline",
        itemSchema: [
          { id: "role", label: "Role/Title", type: "text", placeholder: "Senior Creative Dev" },
          { id: "company", label: "Company", type: "text", placeholder: "Metaverse Lab" },
          { id: "period", label: "Time Period", type: "text", placeholder: "2022 — 2024" },
          { id: "desc", label: "Description", type: "textarea", placeholder: "Building spatial web experiences..." }
        ]
      },
      {
        id: "services", label: "Studio Services", type: "list", section: "Services",
        itemSchema: [
          { id: "title", label: "Service Title", type: "text", placeholder: "Creative Dev" },
          { id: "desc", label: "Description", type: "textarea", placeholder: "High-end motion and 3D..." },
          { id: "icon", label: "Icon Emoji", type: "text", placeholder: "🌪️" }
        ]
      },
      { id: "email", label: "Studio Email", type: "text", placeholder: "aria@sterling.studio", section: "Contact" },
      { id: "phone", label: "Voice Line", type: "text", placeholder: "+1 234 567 890", section: "Contact" },
      { id: "githubUrl", label: "GitHub URL", type: "text", placeholder: "#", section: "Socials" },
      { id: "linkedinUrl", label: "LinkedIn URL", type: "text", placeholder: "#", section: "Socials" },
    ]
  },
  {
    id: "portfolio-3",
    name: "Apple Minimal",
    description: "An ultra-minimal, Apple-inspired portfolio with bold typography and refined motion.",
    thumbnail: "/images/templates/template-img-3.jpg",
    category: "Portfolio",
    tags: ["apple", "minimal", "premium", "clean"],
    fields: [
      { id: "navbarType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Navbar Section" },
      { id: "name", label: "Portfolio Name", type: "text", placeholder: "Alex Smith", section: "Navbar Section" },
      { id: "logoUrl", label: "Logo Upload", type: "image", section: "Navbar Section" },
      { id: "navFontSize", label: "Navbar Font Size", type: "range", min: 12, max: 40, step: 1, section: "Navbar Section" },
      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "Think different.", section: "Hero" },
      { id: "role", label: "Professional Role", type: "text", placeholder: "Digital Product Designer", section: "Hero" },
      { id: "bio", label: "Short Bio", type: "textarea", placeholder: "Designing simple solutions for complex problems.", section: "Hero" },
      { id: "avatarUrl", label: "Avatar Image", type: "image", section: "Hero" },
      { id: "aboutUsTitle", label: "About Title", type: "text", placeholder: "The Philosophy of Less", section: "About" },
      {
        id: "projects", label: "Featured Work", type: "list", section: "Projects",
        itemSchema: [
          { id: "name", label: "Project Title", type: "text", placeholder: "Minimal App" },
          { id: "desc", label: "Description", type: "textarea", placeholder: "A clean interface for..." },
          { id: "image", label: "Project Image", type: "image" },
          { id: "link", label: "Link", type: "text", placeholder: "#" }
        ]
      },
      {
        id: "services", label: "Studio Services", type: "list", section: "Services",
        itemSchema: [
          { id: "title", label: "Service Title", type: "text", placeholder: "Interaction Design" },
          { id: "desc", label: "Description", type: "textarea", placeholder: "Focusing on the touchpoints..." },
          { id: "icon", label: "Icon Emoji", type: "text", placeholder: "✨" }
        ]
      },
      {
        id: "skills", label: "Core Skills", type: "list", section: "Skills",
        itemSchema: [
          { id: "category", label: "Category", type: "text", placeholder: "Design" },
          { id: "items", label: "Skills (comma separated)", type: "text", placeholder: "Figma, Sketch, Framer" }
        ]
      },
      {
        id: "experience", label: "Experience", type: "list", section: "Timeline",
        itemSchema: [
          { id: "role", label: "Role", type: "text", placeholder: "Senior Designer" },
          { id: "company", label: "Company", type: "text", placeholder: "Apple Inc." },
          { id: "period", label: "Period", type: "text", placeholder: "2020 - Present" },
          { id: "desc", label: "Description", type: "textarea", placeholder: "Leading the creative team..." }
        ]
      },
      {
        id: "testimonials", label: "Kind Words", type: "list", section: "Testimonials",
        itemSchema: [
          { id: "name", label: "Name", type: "text", placeholder: "Jony Ive" },
          { id: "role", label: "Role", type: "text", placeholder: "Chief Design Officer" },
          { id: "text", label: "Text", type: "textarea", placeholder: "Incredible attention to detail." },
          { id: "image", label: "Avatar", type: "image" }
        ]
      },
      { id: "email", label: "Contact Email", type: "text", placeholder: "alex@smith.com", section: "Contact" },
      { id: "phone", label: "Phone Number", type: "text", placeholder: "+1 234 567 890", section: "Contact" },
      { id: "githubUrl", label: "GitHub URL", type: "text", placeholder: "#", section: "Socials" },
      { id: "linkedinUrl", label: "LinkedIn URL", type: "text", placeholder: "#", section: "Socials" },
    ]
  },
  {
    id: "portfolio-4",
    name: "Terminal Hacker",
    description: "A futuristic developer portfolio with a command-line interface aesthetic.",
    thumbnail: "/images/templates/template-img-4.jpg",
    category: "Portfolio",
    tags: ["hacker", "terminal", "dark", "neon", "developer"],
    fields: [
      { id: "navbarType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Navbar Section" },
      { id: "name", label: "Portfolio Name", type: "text", placeholder: "Neo", section: "Navbar Section" },
      { id: "logoUrl", label: "Logo Upload", type: "image", section: "Navbar Section" },
      { id: "navFontSize", label: "Navbar Font Size", type: "range", min: 12, max: 40, step: 1, section: "Navbar Section" },
      { id: "heroTitle", label: "Terminal Welcome Message", type: "text", placeholder: "SYSTEM BOOT COMPLETED...", section: "Hero" },
      { id: "role", label: "System Role", type: "text", placeholder: "Full-Stack Security Architect", section: "Hero" },
      { id: "bio", label: "Terminal Bio", type: "textarea", placeholder: "I hack together scalable solutions in the dark.", section: "Hero" },
      { id: "avatarUrl", label: "System Avatar", type: "image", section: "About" },
      { id: "aboutUsTitle", label: "About Section Title", type: "text", placeholder: "WHOAMI", section: "About" },
      {
        id: "projects", label: "Deployment Log", type: "list", section: "Projects",
        itemSchema: [
          { id: "name", label: "Project ID", type: "text", placeholder: "Project X" },
          { id: "desc", label: "Log Entry", type: "textarea", placeholder: "Initialized core modules..." },
          { id: "image", label: "Snapshot", type: "image" },
          { id: "link", label: "Source Code", type: "text", placeholder: "#" }
        ]
      },
      {
        id: "skills", label: "Tech Stack Modules", type: "list", section: "Skills",
        itemSchema: [
          { id: "category", label: "Module Type", type: "text", placeholder: "Languages" },
          { id: "items", label: "Active Modules", type: "text", placeholder: "JS, Rust, C++" }
        ]
      },
      {
        id: "experience", label: "Chronicle", type: "list", section: "Experience",
        itemSchema: [
          { id: "role", label: "Role", type: "text", placeholder: "Senior Engineer" },
          { id: "company", label: "Organization", type: "text", placeholder: "Zion Net" },
          { id: "period", label: "Timestamp", type: "text", placeholder: "2022 - 2024" },
          { id: "desc", label: "Mission Summary", type: "textarea", placeholder: "Overthrew the machines..." }
        ]
      },
      {
        id: "services", label: "Available Protocols", type: "list", section: "Services",
        itemSchema: [
          { id: "title", label: "Protocol Name", type: "text", placeholder: "Cloud Defense" },
          { id: "desc", label: "Protocol Details", type: "textarea", placeholder: "Protecting the infrastructure..." },
          { id: "icon", label: "Icon Emoji", type: "text", placeholder: "🛡️" }
        ]
      },
      {
        id: "testimonials", label: "User Feedback", type: "list", section: "Testimonials",
        itemSchema: [
          { id: "name", label: "User ID", type: "text", placeholder: "Morpheus" },
          { id: "role", label: "Affiliation", type: "text", placeholder: "Resistance Leader" },
          { id: "text", label: "Message", type: "textarea", placeholder: "He is the one." },
          { id: "image", label: "User Avatar", type: "image" }
        ]
      },
      { id: "email", label: "Secure Email", type: "text", placeholder: "neo@zion.net", section: "Contact" },
      { id: "phone", label: "Comm Line", type: "text", placeholder: "+1 010 101 0101", section: "Contact" },
      { id: "githubUrl", label: "GitHub Node", type: "text", placeholder: "#", section: "Socials" },
      { id: "linkedinUrl", label: "LinkedIn Node", type: "text", placeholder: "#", section: "Socials" },
    ]
  },
  {
    id: "portfolio-5",
    name: "Cyberpunk Holo",
    description: "A high-energy, futuristic portfolio with holographic UI and neon aesthetics.",
    thumbnail: "/images/templates/template-img-5.jpg",
    category: "Portfolio",
    tags: ["cyberpunk", "holographic", "neon", "futuristic", "creative"],
    fields: [
      { id: "navbarType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Navbar Section" },
      { id: "name", label: "Portfolio Name", type: "text", placeholder: "V", section: "Navbar Section" },
      { id: "logoUrl", label: "Logo Upload", type: "image", section: "Navbar Section" },
      { id: "navFontSize", label: "Navbar Font Size", type: "range", min: 12, max: 40, step: 1, section: "Navbar Section" },
      { id: "heroTitle", label: "Neural Uplink Message", type: "text", placeholder: "CONNECTING TO THE FUTURE...", section: "Hero" },
      { id: "role", label: "Specialization", type: "text", placeholder: "Neuro-Interface Architect", section: "Hero" },
      { id: "bio", label: "Agent Intel", type: "textarea", placeholder: "I build the bridge between the physical and digital void.", section: "Hero" },
      { id: "avatarUrl", label: "Neural Avatar", type: "image", section: "About" },
      { id: "aboutUsTitle", label: "About Title", type: "text", placeholder: "THE NEURAL MANIFESTO", section: "About" },
      {
        id: "projects", label: "Neural Repos", type: "list", section: "Projects",
        itemSchema: [
          { id: "name", label: "Repo ID", type: "text", placeholder: "Night City OS" },
          { id: "desc", label: "Description", type: "textarea", placeholder: "Real-time city management engine..." },
          { id: "image", label: "Visual Data", type: "image" },
          { id: "link", label: "Uplink", type: "text", placeholder: "#" }
        ]
      },
      {
        id: "skills", label: "Active Augmentations", type: "list", section: "Skills",
        itemSchema: [
          { id: "category", label: "Aug Type", type: "text", placeholder: "Direct Interface" },
          { id: "items", label: "Modules", type: "text", placeholder: "Three.js, WebGL, GLSL" }
        ]
      },
      {
        id: "experience", label: "Mission Timeline", type: "list", section: "Timeline",
        itemSchema: [
          { id: "role", label: "Designation", type: "text", placeholder: "Cyber-Architect" },
          { id: "company", label: "Megacorp", type: "text", placeholder: "Arasaka" },
          { id: "period", label: "Solar Cycle", type: "text", placeholder: "2077 - 2080" },
          { id: "desc", label: "Mission Summary", type: "textarea", placeholder: "Redesigned the global neural grid..." }
        ]
      },
      {
        id: "services", label: "Mercenary Services", type: "list", section: "Services",
        itemSchema: [
          { id: "title", label: "Service ID", type: "text", placeholder: "Ice Breaking" },
          { id: "desc", label: "Service Protocol", type: "textarea", placeholder: "Penetrating high-security firewalls..." },
          { id: "icon", label: "Icon Emoji", type: "text", placeholder: "🧊" }
        ]
      },
      {
        id: "testimonials", label: "Signal Echoes", type: "list", section: "Testimonials",
        itemSchema: [
          { id: "name", label: "Source ID", type: "text", placeholder: "Johnny Silverhand" },
          { id: "role", label: "Affiliation", type: "text", placeholder: "Rockerboy" },
          { id: "text", label: "Signal", type: "textarea", placeholder: "Wake up, Samurai. We have a city to burn." },
          { id: "image", label: "Source Avatar", type: "image" }
        ]
      },
      { id: "email", label: "Secure Uplink", type: "text", placeholder: "v@nightcity.io", section: "Contact" },
      { id: "phone", label: "Voice Link", type: "text", placeholder: "+1 777 000 7777", section: "Contact" },
      { id: "githubUrl", label: "GitHub Node", type: "text", placeholder: "#", section: "Socials" },
      { id: "linkedinUrl", label: "LinkedIn Node", type: "text", placeholder: "#", section: "Socials" },
    ]
  },
  {
    id: "portfolio-6",
    name: "Bento Portfolio",
    description: "A modern, asymmetrical bento grid layout with dashboard-inspired aesthetics.",
    thumbnail: "/images/templates/template-img-6.jpg",
    category: "Portfolio",
    tags: ["bento", "grid", "minimal", "dashboard", "modern"],
    fields: [
      { id: "navbarType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Navbar Section" },
      { id: "name", label: "Portfolio Name", type: "text", placeholder: "Elena Solaris", section: "Navbar Section" },
      { id: "logoUrl", label: "Logo Upload", type: "image", section: "Navbar Section" },
      { id: "navFontSize", label: "Navbar Font Size", type: "range", min: 12, max: 40, step: 1, section: "Navbar Section" },
      { id: "heroTitle", label: "Grid Welcome", type: "text", placeholder: "DESIGNING THE FUTURE OF INTERACTION.", section: "Hero" },
      { id: "role", label: "Professional Role", type: "text", placeholder: "Senior Product Designer", section: "Hero" },
      { id: "bio", label: "Short Bio", type: "textarea", placeholder: "Crafting high-fidelity digital experiences with a focus on human-centric design.", section: "Hero" },
      { id: "avatarUrl", label: "Profile Image", type: "image", section: "About" },
      { id: "aboutUsTitle", label: "About Section Title", type: "text", placeholder: "Behind the Pixels", section: "About" },
      {
        id: "projects", label: "Project Modules", type: "list", section: "Projects",
        itemSchema: [
          { id: "name", label: "Project Title", type: "text", placeholder: "Lumina App" },
          { id: "desc", label: "Short Summary", type: "textarea", placeholder: "A mental health platform..." },
          { id: "image", label: "Snapshot", type: "image" },
          { id: "link", label: "Visit", type: "text", placeholder: "#" },
          { id: "tags", label: "Tags (comma separated)", type: "text", placeholder: "Mobile, HealthTech" }
        ]
      },
      {
        id: "skills", label: "Stack Modules", type: "list", section: "Skills",
        itemSchema: [
          { id: "category", label: "Stack Type", type: "text", placeholder: "Frontend" },
          { id: "items", label: "Active Techs", type: "text", placeholder: "React, Next.js, Framer" }
        ]
      },
      {
        id: "experience", label: "Career Sequence", type: "list", section: "Experience",
        itemSchema: [
          { id: "role", label: "Position", type: "text", placeholder: "Lead Designer" },
          { id: "company", label: "Studio", type: "text", placeholder: "Stockholm Studio" },
          { id: "period", label: "Timeframe", type: "text", placeholder: "2021 - Present" },
          { id: "desc", label: "Summary", type: "textarea", placeholder: "Leading design systems..." }
        ]
      },
      {
        id: "services", label: "Core Services", type: "list", section: "Services",
        itemSchema: [
          { id: "title", label: "Service Name", type: "text", placeholder: "UI/UX Design" },
          { id: "desc", label: "Brief", type: "textarea", placeholder: "Creating intuitive interfaces..." },
          { id: "icon", label: "Icon Emoji", type: "text", placeholder: "🎨" }
        ]
      },
      {
        id: "testimonials", label: "Words from Clients", type: "list", section: "Testimonials",
        itemSchema: [
          { id: "name", label: "Client ID", type: "text", placeholder: "Sarah Chen" },
          { id: "role", label: "Role", type: "text", placeholder: "CTO @ Flux" },
          { id: "text", label: "Feedback", type: "textarea", placeholder: "Elena's vision is incredible." },
          { id: "image", label: "Client Avatar", type: "image" }
        ]
      },
      { id: "email", label: "Work Email", type: "text", placeholder: "hello@elenasolaris.com", section: "Contact" },
      { id: "phone", label: "Direct Line", type: "text", placeholder: "+46 8 123 45 67", section: "Contact" },
      { id: "githubUrl", label: "GitHub URL", type: "text", placeholder: "#", section: "Socials" },
      { id: "linkedinUrl", label: "LinkedIn URL", type: "text", placeholder: "#", section: "Socials" },
      { id: "twitterUrl", label: "Twitter URL", type: "text", placeholder: "#", section: "Socials" },
    ]
  },
  {
    id: "portfolio-7",
    name: "Agency Creative",
    description: "A bold, high-contrast agency-style portfolio with massive typography and smooth horizontal motion.",
    thumbnail: "/images/templates/template-img-7.jpg",
    category: "Portfolio",
    tags: ["agency", "bold", "creative", "horizontal-scroll", "premium"],
    fields: [
      { id: "navbarType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Navbar Section" },
      { id: "name", label: "Portfolio Name", type: "text", placeholder: "Xavier Storm", section: "Navbar Section" },
      { id: "logoUrl", label: "Logo Upload", type: "image", section: "Navbar Section" },
      { id: "navFontSize", label: "Navbar Font Size", type: "range", min: 12, max: 40, step: 1, section: "Navbar Section" },
      { id: "heroTitle", label: "Agency Headline", type: "text", placeholder: "CRAFTING THE FUTURE OF DIGITAL COMMERCE.", section: "Hero" },
      { id: "role", label: "Studio Specialization", type: "text", placeholder: "Creative Engineering Studio", section: "Hero" },
      { id: "bio", label: "Studio Philosophy", type: "textarea", placeholder: "We don't just build websites; we create digital landmarks.", section: "Hero" },
      { id: "avatarUrl", label: "Founder Image", type: "image", section: "About" },
      { id: "aboutUsTitle", label: "About Title", type: "text", placeholder: "THE ARCHITECTURE OF CRAFT", section: "About" },
      {
        id: "projects", label: "Featured Work", type: "list", section: "Projects",
        itemSchema: [
          { id: "name", label: "Project ID", type: "text", placeholder: "Neon Nexus" },
          { id: "desc", label: "Project Summary", type: "textarea", placeholder: "High-performance dashboard..." },
          { id: "image", label: "Featured Image", type: "image" },
          { id: "link", label: "Case Study", type: "text", placeholder: "#" },
          { id: "tags", label: "Category", type: "text", placeholder: "Web Design, 2024" }
        ]
      },
      {
        id: "skills", label: "Core Competencies", type: "list", section: "Skills",
        itemSchema: [
          { id: "category", label: "Service Pillar", type: "text", placeholder: "Creative Engineering" },
          { id: "items", label: "Modules", type: "text", placeholder: "React, Three.js, WebGL" }
        ]
      },
      {
        id: "experience", label: "The Timeline", type: "list", section: "Experience",
        itemSchema: [
          { id: "role", label: "Role", type: "text", placeholder: "Design Lead" },
          { id: "company", label: "Studio", type: "text", placeholder: "Arasaka Digital" },
          { id: "period", label: "Period", type: "text", placeholder: "2022 - Present" },
          { id: "desc", label: "Contribution", type: "textarea", placeholder: "Leading the creative engineering team..." }
        ]
      },
      {
        id: "services", label: "Service Catalog", type: "list", section: "Services",
        itemSchema: [
          { id: "title", label: "Service Name", type: "text", placeholder: "Interactive Design" },
          { id: "desc", label: "Service Description", type: "textarea", placeholder: "Building immersive interfaces..." },
          { id: "icon", label: "Visual Icon", type: "text", placeholder: "🎨" }
        ]
      },
      {
        id: "testimonials", label: "Kind Words", type: "list", section: "Testimonials",
        itemSchema: [
          { id: "name", label: "Client ID", type: "text", placeholder: "Elena Solaris" },
          { id: "role", label: "Position", type: "text", placeholder: "Head of Product" },
          { id: "text", label: "Testimonial", type: "textarea", placeholder: "A master of digital craft." },
          { id: "image", label: "Client Image", type: "image" }
        ]
      },
      { id: "email", label: "Business Email", type: "text", placeholder: "storm@cyber.io", section: "Contact" },
      { id: "phone", label: "Direct Line", type: "text", placeholder: "+1 777 000 7777", section: "Contact" },
      { id: "githubUrl", label: "GitHub Node", type: "text", placeholder: "#", section: "Socials" },
      { id: "linkedinUrl", label: "LinkedIn Node", type: "text", placeholder: "#", section: "Socials" },
    ]
  },
  {
    id: "portfolio-8",
    name: "Luxury Dark",
    description: "An ultra-premium, dark-themed portfolio with gold accents and cinematic serif typography.",
    thumbnail: "/images/templates/template-img-8.jpg",
    category: "Portfolio",
    tags: ["luxury", "dark", "gold", "premium", "serif"],
    fields: [
      { id: "navbarType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Navbar Section" },
      { id: "name", label: "Portfolio Name", type: "text", placeholder: "Aria Moss", section: "Navbar Section" },
      { id: "logoUrl", label: "Logo Upload", type: "image", section: "Navbar Section" },
      { id: "navFontSize", label: "Navbar Font Size", type: "range", min: 12, max: 40, step: 1, section: "Navbar Section" },
      { id: "heroTitle", label: "Luxury Headline", type: "text", placeholder: "CRAFTING TIMELESS DIGITAL LEGACIES.", section: "Hero" },
      { id: "role", label: "Signature Role", type: "text", placeholder: "Principal Experience Architect", section: "Hero" },
      { id: "bio", label: "Statement", type: "textarea", placeholder: "Defining the intersection of digital craft and luxury experience.", section: "Hero" },
      { id: "avatarUrl", label: "Portrait", type: "image", section: "About" },
      { id: "aboutUsTitle", label: "The Narrative", type: "text", placeholder: "The Art of the Possible", section: "About" },
      {
        id: "projects", label: "The Collection", type: "list", section: "Projects",
        itemSchema: [
          { id: "name", label: "Masterpiece Title", type: "text", placeholder: "The Royal Suite" },
          { id: "desc", label: "Curator's Note", type: "textarea", placeholder: "A seamless integration of heritage and technology..." },
          { id: "image", label: "Cinematic Snapshot", type: "image" },
          { id: "link", label: "View Experience", type: "text", placeholder: "#" },
          { id: "tags", label: "Classification", type: "text", placeholder: "Hospitality, 2024" }
        ]
      },
      {
        id: "skills", label: "The Arsenal", type: "list", section: "Skills",
        itemSchema: [
          { id: "category", label: "Domain", type: "text", placeholder: "Creative Direction" },
          { id: "items", label: "Expertise", type: "text", placeholder: "Strategy, UI/UX, Motion" }
        ]
      },
      {
        id: "experience", label: "The Heritage", type: "list", section: "Experience",
        itemSchema: [
          { id: "role", label: "Appointment", type: "text", placeholder: "Executive Director" },
          { id: "company", label: "Institution", type: "text", placeholder: "Vogue Global" },
          { id: "period", label: "Tenure", type: "text", placeholder: "2020 - Present" },
          { id: "desc", label: "Legacy", type: "textarea", placeholder: "Orchestrating the digital transformation..." }
        ]
      },
      {
        id: "services", label: "Signature Services", type: "list", section: "Services",
        itemSchema: [
          { id: "title", label: "Service Name", type: "text", placeholder: "Digital Strategy" },
          { id: "desc", label: "The Offering", type: "textarea", placeholder: "Tailored strategies for elite brands..." },
          { id: "icon", label: "Emblem Emoji", type: "text", placeholder: "⚜️" }
        ]
      },
      {
        id: "testimonials", label: "The Commendations", type: "list", section: "Testimonials",
        itemSchema: [
          { id: "name", label: "Patron Name", type: "text", placeholder: "Julian Vane" },
          { id: "role", label: "Affiliation", type: "text", placeholder: "Founder @ Vane Luxury" },
          { id: "text", label: "The Remark", type: "textarea", placeholder: "Aria's eye for detail is unparalleled." },
          { id: "image", label: "Patron Portrait", type: "image" }
        ]
      },
      { id: "email", label: "Private Line", type: "text", placeholder: "aria@luxury.com", section: "Contact" },
      { id: "phone", label: "Concierge", type: "text", placeholder: "+1 777 000 7777", section: "Contact" },
      { id: "githubUrl", label: "GitHub Node", type: "text", placeholder: "#", section: "Socials" },
      { id: "linkedinUrl", label: "LinkedIn Node", type: "text", placeholder: "#", section: "Socials" },
    ]
  },
  {
    id: "portfolio-9",
    name: "Monolith Industrial",
    description: "A bold, industrial portfolio with rigid grid lines and high contrast accents.",
    thumbnail: "/images/templates/template-img-9.jpg",
    category: "Portfolio",
    tags: ["industrial", "bold", "monolith", "structural"],
    fields: [
      { id: "navbarType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Navbar Section" },
      { id: "name", label: "Portfolio Name", type: "text", placeholder: "Victor Iron", section: "Navbar Section" },
      { id: "logoUrl", label: "Logo Upload", type: "image", section: "Navbar Section" },
      { id: "navFontSize", label: "Navbar Font Size", type: "range", min: 12, max: 40, step: 1, section: "Navbar Section" },
      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "CONSTRUCTING DIGITAL FORTRESSES.", section: "Hero" },
      { id: "bio", label: "Description", type: "textarea", placeholder: "Developing rigid, scalable infrastructure...", section: "Hero" },
      { id: "email", label: "Email", type: "text", placeholder: "iron@monolith.sys", section: "Contact" },
    ]
  },
  {
    id: "portfolio-10",
    name: "Neobrutalism",
    description: "A bold, playful portfolio with thick borders, hard shadows, and vibrant colors.",
    thumbnail: "/images/templates/template-img-10.jpg",
    category: "Portfolio",
    tags: ["neobrutalism", "bold", "vibrant", "playful", "cartoon"],
    fields: [
      { id: "navbarType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Navbar Section" },
      { id: "name", label: "Portfolio Name", type: "text", placeholder: "GUMMY BEAR", section: "Navbar Section" },
      { id: "logoUrl", label: "Logo Upload", type: "image", section: "Navbar Section" },
      { id: "navFontSize", label: "Navbar Font Size", type: "range", min: 12, max: 40, step: 1, section: "Navbar Section" },
      { id: "heroTitle", label: "Bold Headline", type: "text", placeholder: "DESIGNING THE LOUD STUFF.", section: "Hero" },
      { id: "role", label: "Cool Role", type: "text", placeholder: "Chaos Engineer & Designer", section: "Hero" },
      { id: "bio", label: "Fun Bio", type: "textarea", placeholder: "Making the web less boring, one pixel at a time.", section: "Hero" },
      { id: "avatarUrl", label: "Fun Portrait", type: "image", section: "About" },
      { id: "aboutUsTitle", label: "The Story", type: "text", placeholder: "Who Is This Person?", section: "About" },
      {
        id: "projects", label: "Cool Stuff I Made", type: "list", section: "Projects",
        itemSchema: [
          { id: "name", label: "Project Title", type: "text", placeholder: "Super App" },
          { id: "desc", label: "What is it?", type: "textarea", placeholder: "A very cool thing that does things." },
          { id: "image", label: "Project Image", type: "image" },
          { id: "link", label: "Check It Out", type: "text", placeholder: "#" },
          { id: "tags", label: "Tech Used", type: "text", placeholder: "REACT, CSS, CHAOS" }
        ]
      },
      {
        id: "skills", label: "Super Powers", type: "list", section: "Skills",
        itemSchema: [
          { id: "category", label: "Category", type: "text", placeholder: "Visuals" },
          { id: "items", label: "Skills", type: "text", placeholder: "Figma, Canva, Paint" }
        ]
      },
      {
        id: "experience", label: "Places I've Been", type: "list", section: "Experience",
        itemSchema: [
          { id: "role", label: "Role", type: "text", placeholder: "Visual Wizard" },
          { id: "company", label: "Place", type: "text", placeholder: "Google" },
          { id: "period", label: "When?", type: "text", placeholder: "2020 - 2024" },
          { id: "desc", label: "What I Did", type: "textarea", placeholder: "Made things look pretty." }
        ]
      },
      {
        id: "services", label: "Things I Can Do", type: "list", section: "Services",
        itemSchema: [
          { id: "title", label: "Service", type: "text", placeholder: "Web Design" },
          { id: "desc", label: "Description", type: "textarea", placeholder: "I make websites that don't suck." },
          { id: "icon", label: "Icon Emoji", type: "text", placeholder: "🚀" }
        ]
      },
      {
        id: "testimonials", label: "What People Say", type: "list", section: "Testimonials",
        itemSchema: [
          { id: "name", label: "Person", type: "text", placeholder: "Elon Tusk" },
          { id: "role", label: "Role", type: "text", placeholder: "Chief Meme Officer" },
          { id: "text", label: "The Quote", type: "textarea", placeholder: "This person is a legend." },
          { id: "image", label: "Portrait", type: "image" }
        ]
      },
      { id: "email", label: "Spam Me Here", type: "text", placeholder: "hello@gummy.com", section: "Contact" },
      { id: "phone", label: "Call Me Maybe", type: "text", placeholder: "+1 234 567 890", section: "Contact" },
      { id: "githubUrl", label: "GitHub", type: "text", placeholder: "#", section: "Socials" },
      { id: "linkedinUrl", label: "LinkedIn", type: "text", placeholder: "#", section: "Socials" },
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
  },
  {
    id: "g1",
    name: "Dark Neon Portfolio",
    description: "A dark, vibrant portfolio for graphic designers and illustrators.",
    thumbnail: "/images/templates/template-img-19.jpg",
    category: "Graphic Designer",
    tags: ["designer", "dark", "neon", "portfolio"],
    fields: [
      { id: "headerType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Header" },
      { id: "name", label: "Designer Name", type: "text", placeholder: "Alex Neon", section: "Header" },
      { id: "tagline", label: "Tagline", type: "text", placeholder: "Visual Artist & Designer", section: "Header" },
      { id: "logoUrl", label: "Logo/Icon", type: "image", section: "Header" },
      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "Creating Visual Magic.", section: "Hero Banner" },
      { id: "heroImage", label: "Hero Banner Image", type: "image", section: "Hero Banner" },
      { id: "aboutUsTitle", label: "About Title", type: "text", placeholder: "My Journey", section: "About" },
      { id: "bio", label: "Biography", type: "textarea", placeholder: "I craft digital experiences with bold colors and striking typography...", section: "About" },
      { id: "aboutImage", label: "Profile Picture", type: "image", section: "About" },
      {
        id: "services", label: "Tools & Skills", type: "list", section: "Skills",
        itemSchema: [
          { id: "name", label: "Skill Name", type: "text", placeholder: "Adobe Illustrator" },
          { id: "desc", label: "Description", type: "textarea", placeholder: "Vector graphics & logo design." },
          { id: "image", label: "Skill Icon", type: "image" }
        ]
      },
      {
        id: "projects", label: "Portfolio Works", type: "list", section: "Portfolio",
        itemSchema: [
          { id: "name", label: "Project Title", type: "text", placeholder: "Neon Nights Branding" },
          { id: "desc", label: "Description", type: "textarea", placeholder: "Brand identity for a modern club." },
          { id: "image", label: "Project Thumbnail", type: "image" },
          { id: "link", label: "Project Link (Behance/Dribbble)", type: "text", placeholder: "https://behance.net/..." }
        ]
      },
      { id: "contactEmail", label: "Email", type: "text", placeholder: "hello@alexneon.com", section: "Footer" },
      { id: "phone", label: "Phone", type: "text", placeholder: "+1 234 567 8900", section: "Footer" },
      { id: "address", label: "Location", type: "text", placeholder: "Los Angeles, CA", section: "Footer" },
      { id: "behanceUrl", label: "Behance URL", type: "text", placeholder: "https://behance.net/alexneon", section: "Footer" },
      { id: "dribbbleUrl", label: "Dribbble URL", type: "text", placeholder: "https://dribbble.com/alexneon", section: "Footer" },
      { id: "footerCopyright", label: "Copyright", type: "text", placeholder: "© 2024 Alex Neon", section: "Footer" }
    ]
  },
  {
    id: "g2",
    name: "Minimalist Grid",
    description: "A clean, grid-based layout focusing entirely on the artwork.",
    thumbnail: "/images/templates/template-img-20.jpg",
    category: "Graphic Designer",
    tags: ["designer", "minimalist", "clean", "grid"],
    fields: [
      { id: "headerType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Header" },
      { id: "name", label: "Designer Name", type: "text", placeholder: "Mia Minimal", section: "Header" },
      { id: "tagline", label: "Tagline", type: "text", placeholder: "Brand Designer", section: "Header" },
      { id: "logoUrl", label: "Logo/Icon", type: "image", section: "Header" },
      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "Less is More.", section: "Hero Banner" },
      { id: "heroImage", label: "Hero Banner Image", type: "image", section: "Hero Banner" },
      { id: "aboutUsTitle", label: "About Title", type: "text", placeholder: "The Designer", section: "About" },
      { id: "bio", label: "Biography", type: "textarea", placeholder: "I specialize in clean, timeless brand identities and editorial design...", section: "About" },
      { id: "aboutImage", label: "Profile Picture", type: "image", section: "About" },
      {
        id: "services", label: "Capabilities", type: "list", section: "Skills",
        itemSchema: [
          { id: "name", label: "Skill Name", type: "text", placeholder: "Typography" },
          { id: "desc", label: "Description", type: "textarea", placeholder: "Custom fonts & editorial layouts." },
          { id: "image", label: "Skill Icon", type: "image" }
        ]
      },
      {
        id: "projects", label: "Selected Projects", type: "list", section: "Portfolio",
        itemSchema: [
          { id: "name", label: "Project Title", type: "text", placeholder: "Kinfolk Redesign" },
          { id: "desc", label: "Description", type: "textarea", placeholder: "Editorial spread concepts." },
          { id: "image", label: "Project Thumbnail", type: "image" },
          { id: "link", label: "Project Link", type: "text", placeholder: "https://dribbble.com/..." }
        ]
      },
      { id: "contactEmail", label: "Email", type: "text", placeholder: "mia@minimal.com", section: "Footer" },
      { id: "phone", label: "Phone", type: "text", placeholder: "123-456-7890", section: "Footer" },
      { id: "address", label: "Location", type: "text", placeholder: "New York, NY", section: "Footer" },
      { id: "behanceUrl", label: "Behance URL", type: "text", placeholder: "https://behance.net/miaminimal", section: "Footer" },
      { id: "dribbbleUrl", label: "Dribbble URL", type: "text", placeholder: "https://dribbble.com/miaminimal", section: "Footer" },
      { id: "footerCopyright", label: "Copyright", type: "text", placeholder: "© 2024 Mia Minimal", section: "Footer" }
    ]
  },
  {
    id: "g3",
    name: "Creative Asymmetric",
    description: "A playful and artistic portfolio with overlapping elements and pastel gradients.",
    thumbnail: "/images/templates/template-img-21.jpg",
    category: "Graphic Designer",
    tags: ["designer", "creative", "playful", "asymmetric"],
    fields: [
      { id: "headerType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Header" },
      { id: "name", label: "Designer Name", type: "text", placeholder: "Sam Creative", section: "Header" },
      { id: "tagline", label: "Tagline", type: "text", placeholder: "UI/UX & Graphic Artist", section: "Header" },
      { id: "logoUrl", label: "Logo/Icon", type: "image", section: "Header" },
      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "Designing Outside the Lines.", section: "Hero Banner" },
      { id: "heroImage", label: "Hero Banner Image", type: "image", section: "Hero Banner" },
      { id: "aboutUsTitle", label: "About Title", type: "text", placeholder: "Who am I?", section: "About" },
      { id: "bio", label: "Biography", type: "textarea", placeholder: "I blend illustration with functional design to create memorable digital products...", section: "About" },
      { id: "aboutImage", label: "Profile Picture", type: "image", section: "About" },
      {
        id: "services", label: "Expertise", type: "list", section: "Skills",
        itemSchema: [
          { id: "name", label: "Skill Name", type: "text", placeholder: "Figma Prototyping" },
          { id: "desc", label: "Description", type: "textarea", placeholder: "Interactive web & mobile design." },
          { id: "image", label: "Skill Icon", type: "image" }
        ]
      },
      {
        id: "projects", label: "Recent Artworks", type: "list", section: "Portfolio",
        itemSchema: [
          { id: "name", label: "Project Title", type: "text", placeholder: "Pastel Dreams App" },
          { id: "desc", label: "Description", type: "textarea", placeholder: "UI design for a mindfulness app." },
          { id: "image", label: "Project Thumbnail", type: "image" },
          { id: "link", label: "Project Link", type: "text", placeholder: "https://behance.net/..." }
        ]
      },
      { id: "contactEmail", label: "Email", type: "text", placeholder: "sam@creative.co", section: "Footer" },
      { id: "phone", label: "Phone", type: "text", placeholder: "+44 123 456 789", section: "Footer" },
      { id: "address", label: "Location", type: "text", placeholder: "London, UK", section: "Footer" },
      { id: "behanceUrl", label: "Behance URL", type: "text", placeholder: "https://behance.net/samcreative", section: "Footer" },
      { id: "dribbbleUrl", label: "Dribbble URL", type: "text", placeholder: "https://dribbble.com/samcreative", section: "Footer" },
      { id: "footerCopyright", label: "Copyright", type: "text", placeholder: "© 2024 Sam Creative", section: "Footer" }
    ]
  },
  {
    id: "v1",
    name: "Cinematic Dark",
    description: "A dark, immersive template tailored for cinematic video editors and colorists.",
    thumbnail: "/images/templates/template-img-22.jpg",
    category: "Video Editor",
    tags: ["video", "editor", "cinematic", "dark", "vfx"],
    fields: [
      { id: "headerType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Header" },
      { id: "name", label: "Studio/Editor Name", type: "text", placeholder: "Noir Films", section: "Header" },
      { id: "tagline", label: "Tagline", type: "text", placeholder: "Cinematic Video Production", section: "Header" },
      { id: "logoUrl", label: "Logo/Icon", type: "image", section: "Header" },
      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "Crafting Visual Stories.", section: "Hero Banner" },
      { id: "heroImage", label: "Hero Banner/Reel Cover", type: "image", section: "Hero Banner" },
      { id: "heroVideoUrl", label: "Hero Background Video URL", type: "text", placeholder: "Optional: https://example.com/reel.mp4", section: "Hero Banner" },
      { id: "aboutUsTitle", label: "About Title", type: "text", placeholder: "The Director's Cut", section: "About" },
      { id: "bio", label: "Biography", type: "textarea", placeholder: "Specializing in high-end post-production, color grading, and visual effects for commercial and narrative films.", section: "About" },
      { id: "aboutImage", label: "Profile Picture", type: "image", section: "About" },
      {
        id: "services", label: "Services Provided", type: "list", section: "Services",
        itemSchema: [
          { id: "name", label: "Service Name", type: "text", placeholder: "Color Grading" },
          { id: "desc", label: "Description", type: "textarea", placeholder: "Industry standard color correction using DaVinci Resolve." },
          { id: "image", label: "Service Icon/Thumbnail", type: "image" }
        ]
      },
      {
        id: "projects", label: "Video Portfolio", type: "list", section: "Portfolio",
        itemSchema: [
          { id: "name", label: "Project Title", type: "text", placeholder: "Midnight Run - Short Film" },
          { id: "desc", label: "Role/Description", type: "textarea", placeholder: "Lead Editor & Colorist." },
          { id: "image", label: "Project Thumbnail", type: "image" },
          { id: "link", label: "Video Link (YouTube/Vimeo)", type: "text", placeholder: "https://vimeo.com/..." }
        ]
      },
      { id: "contactEmail", label: "Email", type: "text", placeholder: "contact@noirfilms.com", section: "Footer" },
      { id: "phone", label: "Phone", type: "text", placeholder: "+1 555 0192", section: "Footer" },
      { id: "address", label: "Location", type: "text", placeholder: "Los Angeles, CA", section: "Footer" },
      { id: "vimeoUrl", label: "Vimeo URL", type: "text", placeholder: "https://vimeo.com/noirfilms", section: "Footer" },
      { id: "youtubeUrl", label: "YouTube URL", type: "text", placeholder: "https://youtube.com/noirfilms", section: "Footer" },
      { id: "footerCopyright", label: "Copyright", type: "text", placeholder: "© 2024 Noir Films", section: "Footer" }
    ]
  },
  {
    id: "v2",
    name: "Modern Creator",
    description: "A clean, glassmorphic layout perfect for YouTube creators and vloggers.",
    thumbnail: "/images/templates/template-img-23.jpg",
    category: "Video Editor",
    tags: ["creator", "youtube", "vlogger", "glassmorphism"],
    fields: [
      { id: "headerType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Header" },
      { id: "name", label: "Creator Name", type: "text", placeholder: "Alex Vance", section: "Header" },
      { id: "tagline", label: "Tagline", type: "text", placeholder: "Filmmaker & Content Creator", section: "Header" },
      { id: "logoUrl", label: "Logo/Icon", type: "image", section: "Header" },
      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "Telling stories through the lens.", section: "Hero Banner" },
      { id: "heroImage", label: "Hero Banner Image", type: "image", section: "Hero Banner" },
      { id: "aboutUsTitle", label: "About Title", type: "text", placeholder: "Meet Alex", section: "About" },
      { id: "bio", label: "Biography", type: "textarea", placeholder: "I create engaging tech and lifestyle videos with a focus on high-quality cinematography.", section: "About" },
      { id: "aboutImage", label: "Profile Picture", type: "image", section: "About" },
      {
        id: "services", label: "Expertise", type: "list", section: "Skills",
        itemSchema: [
          { id: "name", label: "Skill Name", type: "text", placeholder: "Premiere Pro" },
          { id: "desc", label: "Description", type: "textarea", placeholder: "Fast, dynamic editing." },
          { id: "image", label: "Skill Icon", type: "image" }
        ]
      },
      {
        id: "projects", label: "Latest Videos", type: "list", section: "Portfolio",
        itemSchema: [
          { id: "name", label: "Video Title", type: "text", placeholder: "My 2024 Desk Setup" },
          { id: "desc", label: "Description", type: "textarea", placeholder: "Tech review and cinematic b-roll." },
          { id: "image", label: "Video Thumbnail", type: "image" },
          { id: "link", label: "Video Link", type: "text", placeholder: "https://youtube.com/..." }
        ]
      },
      { id: "contactEmail", label: "Email", type: "text", placeholder: "hello@alexvance.com", section: "Footer" },
      { id: "phone", label: "Phone", type: "text", placeholder: "123-456-7890", section: "Footer" },
      { id: "address", label: "Location", type: "text", placeholder: "Austin, TX", section: "Footer" },
      { id: "youtubeUrl", label: "YouTube URL", type: "text", placeholder: "https://youtube.com/alexvance", section: "Footer" },
      { id: "instagramUrl", label: "Instagram URL", type: "text", placeholder: "https://instagram.com/alexvance", section: "Footer" },
      { id: "footerCopyright", label: "Copyright", type: "text", placeholder: "© 2024 Alex Vance", section: "Footer" }
    ]
  },
  {
    id: "v3",
    name: "Studio Pro",
    description: "A structured, grid-heavy layout for commercial production agencies.",
    thumbnail: "/images/templates/template-img-24.jpg",
    category: "Video Editor",
    tags: ["studio", "production", "agency", "professional"],
    fields: [
      { id: "headerType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Header" },
      { id: "name", label: "Agency Name", type: "text", placeholder: "FRAMEWORKS", section: "Header" },
      { id: "tagline", label: "Tagline", type: "text", placeholder: "Commercial Video Production", section: "Header" },
      { id: "logoUrl", label: "Logo/Icon", type: "image", section: "Header" },
      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "We build visual experiences.", section: "Hero Banner" },
      { id: "heroImage", label: "Hero Banner Image", type: "image", section: "Hero Banner" },
      { id: "aboutUsTitle", label: "About Title", type: "text", placeholder: "Our Studio", section: "About" },
      { id: "bio", label: "Biography", type: "textarea", placeholder: "A full-service production house delivering end-to-end video solutions for global brands.", section: "About" },
      { id: "aboutImage", label: "Studio Image", type: "image", section: "About" },
      {
        id: "services", label: "Capabilities", type: "list", section: "Services",
        itemSchema: [
          { id: "name", label: "Service Name", type: "text", placeholder: "Motion Graphics" },
          { id: "desc", label: "Description", type: "textarea", placeholder: "2D & 3D animation for commercials." },
          { id: "image", label: "Service Icon", type: "image" }
        ]
      },
      {
        id: "projects", label: "Featured Work", type: "list", section: "Portfolio",
        itemSchema: [
          { id: "name", label: "Client/Project", type: "text", placeholder: "Nike - Urban Run" },
          { id: "desc", label: "Description", type: "textarea", placeholder: "National TV Campaign" },
          { id: "image", label: "Project Thumbnail", type: "image" },
          { id: "link", label: "Video Link", type: "text", placeholder: "https://vimeo.com/..." }
        ]
      },
      { id: "contactEmail", label: "Email", type: "text", placeholder: "hello@frameworks.tv", section: "Footer" },
      { id: "phone", label: "Phone", type: "text", placeholder: "+1 800 123 4567", section: "Footer" },
      { id: "address", label: "Location", type: "text", placeholder: "New York, NY", section: "Footer" },
      { id: "vimeoUrl", label: "Vimeo URL", type: "text", placeholder: "https://vimeo.com/frameworks", section: "Footer" },
      { id: "linkedinUrl", label: "LinkedIn URL", type: "text", placeholder: "https://linkedin.com/company/frameworks", section: "Footer" },
      { id: "footerCopyright", label: "Copyright", type: "text", placeholder: "© 2024 Frameworks Production", section: "Footer" }
    ]
  }
];
