"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { templates } from "@/data/templates";
import PortfolioTemplate from "@/components/templates/PortfolioTemplate";
import PortfolioTemplate2 from "@/components/templates/PortfolioTemplate2";
import PortfolioTemplate3 from "@/components/templates/PortfolioTemplate3";
import BusinessTemplate from "@/components/templates/BusinessTemplate";
import BusinessTemplate2 from "@/components/templates/BusinessTemplate2";
import BusinessTemplate3 from "@/components/templates/BusinessTemplate3";
import DoctorTemplate from "@/components/templates/DoctorTemplate";
import DoctorTemplate2 from "@/components/templates/DoctorTemplate2";
import DoctorTemplate3 from "@/components/templates/DoctorTemplate3";
import EventTemplate1 from "@/components/templates/EventTemplate1";
import EventTemplate2 from "@/components/templates/EventTemplate2";
import EventTemplate3 from "@/components/templates/EventTemplate3";
import RealEstateTemplate1 from "@/components/templates/RealEstateTemplate1";
import RealEstateTemplate2 from "@/components/templates/RealEstateTemplate2";
import RealEstateTemplate3 from "@/components/templates/RealEstateTemplate3";
import CATemplate1 from "@/components/templates/CATemplate1";
import CATemplate2 from "@/components/templates/CATemplate2";
import CATemplate3 from "@/components/templates/CATemplate3";
import TeacherTemplate1 from "@/components/templates/TeacherTemplate1";
import TeacherTemplate2 from "@/components/templates/TeacherTemplate2";
import TeacherTemplate3 from "@/components/templates/TeacherTemplate3";
import GraphicDesignerTemplate1 from "@/components/templates/GraphicDesignerTemplate1";
import GraphicDesignerTemplate2 from "@/components/templates/GraphicDesignerTemplate2";
import GraphicDesignerTemplate3 from "@/components/templates/GraphicDesignerTemplate3";
import { countryCodes } from "@/data/countryCodes";
import PhoneInput from "@/components/PhoneInput";
import { useAuth } from "@/context/AuthContext";
import { resizeImage } from "@/utils/imageUtils";
import { motion, AnimatePresence } from "framer-motion";


// Channel for cross-tab communication
let previewChannel;
if (typeof window !== "undefined") {
  previewChannel = new BroadcastChannel("template_preview_channel");
}

// Map template IDs to their components
const templateMap = {
  "portfolio-1": PortfolioTemplate,
  "portfolio-2": PortfolioTemplate2,
  "portfolio-3": PortfolioTemplate3,
  "business-1": BusinessTemplate,
  "business-2": BusinessTemplate2,
  "business-3": BusinessTemplate3,
  "doctor-1": DoctorTemplate,
  "doctor-2": DoctorTemplate2,
  "doctor-3": DoctorTemplate3,
  "event-1": EventTemplate1,
  "event-2": EventTemplate2,
  "event-3": EventTemplate3,
  "realestate-1": RealEstateTemplate1,
  "realestate-2": RealEstateTemplate2,
  "realestate-3": RealEstateTemplate3,
  "ca-1": CATemplate1,
  "ca-2": CATemplate2,
  "ca-3": CATemplate3,
  "teacher-1": TeacherTemplate1,
  "teacher-2": TeacherTemplate2,
  "teacher-3": TeacherTemplate3,
  "g1": GraphicDesignerTemplate1,
  "g2": GraphicDesignerTemplate2,
  "g3": GraphicDesignerTemplate3,
};

export default function EditorPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const templateDef = templates.find((t) => t.id === id);
  const [activeMode, setActiveMode] = useState(templateDef?.category || "Portfolio");
  const [currentPreviewId, setCurrentPreviewId] = useState(id || templateDef?.id);
  const [formData, setFormData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [expandedItems, setExpandedItems] = useState({}); // { listId: { index: true } }
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [publishStep, setPublishStep] = useState("plans"); // 'plans' or 'domain'
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [publishData, setPublishData] = useState({ subdomain: "", customDomain: "" });

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, authLoading, router]);

  // Fields for each mode
  const modeFields = {
    Portfolio: [
      { id: "headerType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Header" },
      { id: "name", label: "Full Name", type: "text", placeholder: "John Doe", section: "Header", maxLength: 100 },
      { id: "nameFontSize", label: "Name Font Size (px)", type: "number", placeholder: "24", section: "Header", min: 10, max: 100 },
      { id: "logoUrl", label: "Logo URL", type: "image", section: "Header" },
      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "Hi, I'm John", section: "Hero Banner", maxLength: 200 },
      { id: "heroTitleFontSize", label: "Hero Title Font Size (px)", type: "number", placeholder: "72", section: "Hero Banner", min: 20, max: 200 },
      { id: "role", label: "Professional Role", type: "text", placeholder: "Developer", section: "Hero Banner", maxLength: 100 },
      { id: "roleFontSize", label: "Role Font Size (px)", type: "number", placeholder: "24", section: "Hero Banner", min: 10, max: 60 },
      { id: "avatarUrl", label: "Profile Image", type: "image", section: "Hero Banner" },
      { id: "bio", label: "Biography", type: "textarea", placeholder: "Tell your story...", section: "About", maxLength: 1000 },
      { id: "bioFontSize", label: "Bio Font Size (px)", type: "number", section: "About", min: 10, max: 40 },
      { id: "aboutUsTitle", label: "About Section Title", type: "text", placeholder: "The Backstory", section: "About", maxLength: 200 },
      { id: "aboutImage", label: "About Section Image", type: "image", section: "About" },

      {
        id: "services", label: "Skills & Expertise", type: "list", section: "Skills",
        itemSchema: [
          { id: "name", label: "Skill Name", type: "text", placeholder: "Web Design", maxLength: 100 },
          { id: "nameFontSize", label: "Name Size (px)", type: "number", min: 10, max: 80 },
          { id: "desc", label: "Description", type: "textarea", placeholder: "Experience with...", maxLength: 300 },
          { id: "descFontSize", label: "Desc Size (px)", type: "number", min: 10, max: 60 },
          { id: "image", label: "Icon/Image", type: "image" }
        ]
      },

      {
        id: "projects", label: "Featured Projects", type: "list", section: "Projects",
        itemSchema: [
          { id: "name", label: "Project Name", type: "text", placeholder: "E-Commerce App", maxLength: 100 },
          { id: "nameFontSize", label: "Name Size (px)", type: "number", min: 10, max: 80 },
          { id: "desc", label: "Description", type: "textarea", placeholder: "Project details...", maxLength: 500 },
          { id: "descFontSize", label: "Desc Size (px)", type: "number", min: 10, max: 60 },
          { id: "image", label: "Project Image", type: "image" },
          { id: "link", label: "Project Link", type: "text", placeholder: "https://..." }
        ]
      },

      { id: "email", label: "Email Address", type: "text", placeholder: "hello@example.com", section: "Footer", maxLength: 200 },
      { id: "countryCode", label: "Country Code", type: "select", options: countryCodes.map(c => `${c.flag} ${c.code} (${c.name})`), section: "Footer" },
      { id: "phone", label: "Phone Number", type: "text", placeholder: "1234567890", section: "Footer", maxLength: 15 },
      { id: "githubUrl", label: "GitHub URL", type: "text", placeholder: "https://github.com/...", section: "Footer" },
      { id: "linkedinUrl", label: "LinkedIn URL", type: "text", placeholder: "https://linkedin.com/...", section: "Footer" },
    ],
    Business: [
      { id: "headerType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Header" },
      { id: "companyName", label: "Business Name", type: "text", placeholder: "Acme Corp", section: "Header", maxLength: 100 },
      { id: "companyNameFontSize", label: "Company Name Font Size (px)", type: "number", placeholder: "24", section: "Header", min: 10, max: 80 },
      { id: "logoUrl", label: "Logo URL", type: "image", section: "Header" },

      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "Leading Innovation", section: "Hero Banner", maxLength: 300 },
      { id: "heroTitleFontSize", label: "Hero Title Font Size (px)", type: "number", placeholder: "60", section: "Hero Banner", min: 20, max: 150 },
      { id: "tagline", label: "Business Tagline", type: "text", placeholder: "The future is here", section: "Hero Banner" },
      { id: "taglineFontSize", label: "Tagline Font Size (px)", type: "number", placeholder: "20", section: "Hero Banner", min: 10, max: 60 },
      { id: "heroImage", label: "Hero Image URL", type: "image", section: "Hero Banner" },

      {
        id: "services", label: "Our Services", type: "list", section: "Services",
        itemSchema: [
          { id: "name", label: "Service Name", type: "text", placeholder: "Strategic Planning", maxLength: 100 },
          { id: "nameFontSize", label: "Name Size (px)", type: "number", min: 10, max: 80 },
          { id: "desc", label: "Service Description", type: "textarea", placeholder: "Description...", maxLength: 300 },
          { id: "descFontSize", label: "Desc Size (px)", type: "number", min: 10, max: 60 },
          { id: "image", label: "Service Image", type: "image" }
        ]
      },

      { id: "aboutUsTitle", label: "About Us Title", type: "text", placeholder: "Who We Are", section: "About", maxLength: 200 },
      { id: "aboutUsTitleFontSize", label: "About Title Size (px)", type: "number", section: "About", min: 10, max: 60 },
      { id: "aboutUsContent", label: "Business Description", type: "textarea", placeholder: "Describe your business...", section: "About", maxLength: 500 },
      { id: "aboutUsContentFontSize", label: "About Desc Size (px)", type: "number", section: "About", min: 10, max: 40 },
      { id: "aboutUsImage", label: "About Us Image", type: "image", section: "About" },

      { id: "contactEmail", label: "Contact Email", type: "text", placeholder: "contact@acme.com", section: "Footer", maxLength: 200 },
      { id: "address", label: "Office Address", type: "text", placeholder: "123 Business St", section: "Footer", maxLength: 600 },
      { id: "countryCode", label: "Country Code", type: "select", options: countryCodes.map(c => `${c.flag} ${c.code} (${c.name})`), section: "Footer" },
      { id: "phone", label: "Phone Number", type: "text", placeholder: "1234567890", section: "Footer", maxLength: 15 },
      { id: "facebookUrl", label: "Facebook URL", type: "text", placeholder: "https://facebook.com/...", section: "Footer" },
      { id: "twitterUrl", label: "Twitter URL", type: "text", placeholder: "https://twitter.com/...", section: "Footer" },
      { id: "linkedinUrl", label: "LinkedIn URL", type: "text", placeholder: "https://linkedin.com/...", section: "Footer" },
    ],
    Doctor: [
      { id: "headerType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Header" },
      { id: "clinicName", label: "Clinic/Doctor Name", type: "text", placeholder: "SafeCare Medical", section: "Header", maxLength: 100 },
      { id: "clinicNameFontSize", label: "Name Font Size (px)", type: "number", section: "Header", min: 10, max: 80 },
      { id: "logoUrl", label: "Logo URL", type: "image", section: "Header" },

      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "Your Health, Our Priority", section: "Hero Banner", maxLength: 300 },
      { id: "heroTitleFontSize", label: "Hero Title Size (px)", type: "number", section: "Hero Banner", min: 20, max: 150 },
      { id: "specialty", label: "Primary Specialty", type: "text", placeholder: "General Physician", section: "Hero Banner", maxLength: 100 },
      { id: "specialtyFontSize", label: "Specialty Size (px)", type: "number", section: "Hero Banner", min: 10, max: 60 },
      { id: "heroImage", label: "Hero Image URL", type: "image", section: "Hero Banner" },

      { id: "aboutUsTitle", label: "About Section Title", type: "text", placeholder: "Meet Dr. Smith", section: "About Doctor", maxLength: 200 },
      { id: "bio", label: "Biography", type: "textarea", placeholder: "Tell your medical journey...", section: "About Doctor", maxLength: 1000 },
      { id: "aboutImage", label: "Doctor Profile Photo", type: "image", section: "About Doctor" },

      { id: "education", label: "Education & Certs", type: "textarea", placeholder: "MD from...", section: "Professional Details", maxLength: 500 },
      { id: "experience", label: "Years of Practice", type: "number", placeholder: "15", section: "Professional Details", min: 0, max: 60 },

      {
        id: "services", label: "Medical Services", type: "list", section: "Services",
        itemSchema: [
          { id: "name", label: "Service Name", type: "text", placeholder: "Cardiology", maxLength: 100 },
          { id: "desc", label: "Description", type: "textarea", placeholder: "Heart health...", maxLength: 300 },
          { id: "image", label: "Service Icon/Img", type: "image" }
        ]
      },

      { id: "contactEmail", label: "Appointment Email", type: "text", placeholder: "dr@example.com", section: "Contact & Booking", maxLength: 200 },
      { id: "countryCode", label: "Country Code", type: "select", options: countryCodes.map(c => `${c.flag} ${c.code} (${c.name})`), section: "Contact & Booking" },
      { id: "phone", label: "Clinic Phone", type: "text", placeholder: "1234567890", section: "Contact & Booking", maxLength: 15 },
      { id: "address", label: "Clinic Address", type: "text", placeholder: "123 Med St", section: "Contact & Booking", maxLength: 600 },
      { id: "workingHours", label: "Working Hours", type: "text", placeholder: "Mon-Fri: 9-5", section: "Contact & Booking", maxLength: 200 },
      { id: "footerCopyright", label: "Footer Copyright", type: "text", placeholder: "© 2024 Precision Systems", section: "Footer", maxLength: 200 },
    ],
    "Event Management": [
      { id: "headerType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Header" },
      { id: "agencyName", label: "Agency Name", type: "text", placeholder: "Elite Events", section: "Header", maxLength: 100 },
      { id: "agencyNameFontSize", label: "Agency Name Font Size (px)", type: "number", placeholder: "24", section: "Header", min: 10, max: 100 },
      { id: "tagline", label: "Agency Tagline", type: "text", placeholder: "Making Moments Matter", section: "Header", maxLength: 200 },
      { id: "taglineFontSize", label: "Tagline Font Size (px)", type: "number", placeholder: "16", section: "Header", min: 10, max: 60 },
      { id: "logoUrl", label: "Agency Logo", type: "image", section: "Header" },

      { id: "heroTitle", label: "Hero Statement", type: "text", placeholder: "We Transform Any Space Into An Experience", section: "Hero Banner", maxLength: 300 },
      { id: "heroTitleFontSize", label: "Hero Title Font Size (px)", type: "number", placeholder: "72", section: "Hero Banner", min: 20, max: 200 },
      { id: "heroImage", label: "Hero Banner", type: "image", section: "Hero Banner" },

      { id: "aboutUsTitle", label: "Agency Story Title", type: "text", placeholder: "Our Craft", section: "About", maxLength: 200 },
      { id: "aboutUsTitleFontSize", label: "About Title Font Size (px)", type: "number", placeholder: "32", section: "About", min: 10, max: 80 },
      { id: "bio", label: "Agency Bio", type: "textarea", placeholder: "With over a decade of experience...", section: "About", maxLength: 1500 },
      { id: "bioFontSize", label: "Bio Font Size (px)", type: "number", placeholder: "18", section: "About", min: 10, max: 40 },
      { id: "aboutImage", label: "Team/Work Image", type: "image", section: "About" },

      {
        id: "services", label: "Our Specializations", type: "list", section: "Services",
        itemSchema: [
          { id: "name", label: "Service Type", type: "text", placeholder: "Corporate Planning", maxLength: 100 },
          { id: "nameFontSize", label: "Name Size (px)", type: "number", min: 10, max: 80 },
          { id: "desc", label: "Description", type: "textarea", placeholder: "Full-scale logistics...", maxLength: 300 },
          { id: "descFontSize", label: "Desc Size (px)", type: "number", min: 10, max: 60 },
          { id: "image", label: "Service Icon", type: "image" }
        ]
      },

      {
        id: "projects", label: "Featured Events Managed", type: "list", section: "Portfolio",
        itemSchema: [
          { id: "name", label: "Event Name", type: "text", placeholder: "Global Tech Summit", maxLength: 100 },
          { id: "nameFontSize", label: "Name Size (px)", type: "number", min: 10, max: 80 },
          { id: "desc", label: "Event Details", type: "textarea", placeholder: "Managed for 5000+ delegates...", maxLength: 500 },
          { id: "descFontSize", label: "Desc Size (px)", type: "number", min: 10, max: 60 },
          { id: "image", label: "Event Photo", type: "image" }
        ]
      },

      { id: "contactEmail", label: "Agency Email", type: "text", placeholder: "hello@agency.com", section: "Contact", maxLength: 200 },
      { id: "countryCode", label: "Country Code", type: "select", options: countryCodes.map(c => `${c.flag} ${c.code} (${c.name})`), section: "Contact" },
      { id: "phone", label: "Agency Phone", type: "text", placeholder: "1234567890", section: "Contact", maxLength: 15 },
      { id: "address", label: "Office Address", type: "text", placeholder: "123 Event St", section: "Contact", maxLength: 500 },
      { id: "footerCopyright", label: "Footer Copyright", type: "text", placeholder: "© 2024 Event Management Team", section: "Footer", maxLength: 200 },
    ],
    "Real Estate": [
      { id: "headerType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Header" },
      { id: "agencyName", label: "Agency/Agent Name", type: "text", placeholder: "Vista Realty", section: "Header", maxLength: 100 },
      { id: "agencyNameFontSize", label: "Name Font Size (px)", type: "number", placeholder: "24", section: "Header", min: 10, max: 100 },
      { id: "tagline", label: "Tagline", type: "text", placeholder: "Modern Living", section: "Header", maxLength: 200 },
      { id: "taglineFontSize", label: "Tagline Font Size (px)", type: "number", placeholder: "16", section: "Header", min: 10, max: 60 },
      { id: "logoUrl", label: "Logo URL", type: "image", section: "Header" },

      { id: "heroTitle", label: "Hero Headline", type: "text", placeholder: "Find Your Future Home", section: "Hero Banner", maxLength: 300 },
      { id: "heroTitleFontSize", label: "Hero Title Font Size (px)", type: "number", placeholder: "72", section: "Hero Banner", min: 20, max: 200 },
      { id: "heroImage", label: "Hero Photo", type: "image", section: "Hero Banner" },

      { id: "aboutUsTitle", label: "About Title", type: "text", placeholder: "About Jane Smith", section: "About", maxLength: 200 },
      { id: "aboutUsTitleFontSize", label: "About Title Font Size (px)", type: "number", placeholder: "32", section: "About", min: 10, max: 80 },
      { id: "bio", label: "Bio/Description", type: "textarea", placeholder: "Expert in local property...", section: "About", maxLength: 1500 },
      { id: "bioFontSize", label: "Bio Font Size (px)", type: "number", placeholder: "18", section: "About", min: 10, max: 40 },
      { id: "aboutImage", label: "Agent/Agency Photo", type: "image", section: "About" },

      {
        id: "projects", label: "Featured Properties", type: "list", section: "Listings",
        itemSchema: [
          { id: "name", label: "Property Name", type: "text", placeholder: "Sunset Villa", maxLength: 100 },
          { id: "nameFontSize", label: "Name Size (px)", type: "number", min: 10, max: 80 },
          { id: "desc", label: "Price & Details", type: "text", placeholder: "$1.2M | 4BR 3BA", maxLength: 200 },
          { id: "descFontSize", label: "Desc Size (px)", type: "number", min: 10, max: 60 },
          { id: "image", label: "Property Image", type: "image" }
        ]
      },

      { id: "contactEmail", label: "Inquiry Email", type: "text", placeholder: "info@realty.com", section: "Contact", maxLength: 200 },
      { id: "countryCode", label: "Country Code", type: "select", options: countryCodes.map(c => `${c.flag} ${c.code} (${c.name})`), section: "Contact" },
      { id: "phone", label: "Contact Phone", type: "text", placeholder: "1234567890", section: "Contact", maxLength: 15 },
      { id: "address", label: "Office Address", type: "text", placeholder: "123 Realty St", section: "Contact", maxLength: 500 },
      { id: "footerCopyright", label: "Footer Copyright", type: "text", placeholder: "© 2024 Realty Team", section: "Footer", maxLength: 200 },
    ],
    "Chartered Accountant": [
      { id: "headerType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Header" },
      { id: "firmName", label: "Firm Name / Name", type: "text", placeholder: "Smith & Associates", section: "Header", maxLength: 100 },
      { id: "firmNameFontSize", label: "Name Font Size (px)", type: "number", placeholder: "24", section: "Header", min: 10, max: 100 },
      { id: "tagline", label: "Tagline", type: "text", placeholder: "Excellence in Financial Services", section: "Header", maxLength: 200 },
      { id: "taglineFontSize", label: "Tagline Font Size (px)", type: "number", placeholder: "16", section: "Header", min: 10, max: 60 },
      { id: "logoUrl", label: "Logo", type: "image", section: "Header" },

      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "Trusted Financial Advisors", section: "Hero Banner", maxLength: 300 },
      { id: "heroTitleFontSize", label: "Hero Title Font Size (px)", type: "number", placeholder: "72", section: "Hero Banner", min: 20, max: 200 },
      { id: "heroImage", label: "Hero Photo", type: "image", section: "Hero Banner" },

      { id: "aboutUsTitle", label: "About Title", type: "text", placeholder: "Our Legacy", section: "About", maxLength: 200 },
      { id: "aboutUsTitleFontSize", label: "About Title Font Size (px)", type: "number", placeholder: "32", section: "About", min: 10, max: 80 },
      { id: "bio", label: "Firm Bio", type: "textarea", placeholder: "Over 20 years of delivering uncompromising financial advice...", section: "About", maxLength: 1500 },
      { id: "bioFontSize", label: "Bio Font Size (px)", type: "number", placeholder: "18", section: "About", min: 10, max: 40 },
      { id: "aboutImage", label: "Firm/Office Photo", type: "image", section: "About" },

      {
        id: "services", label: "Core Services", type: "list", section: "Services",
        itemSchema: [
          { id: "name", label: "Service Name", type: "text", placeholder: "Corporate Audit", maxLength: 100 },
          { id: "nameFontSize", label: "Name Size (px)", type: "number", min: 10, max: 80 },
          { id: "desc", label: "Description", type: "textarea", placeholder: "Comprehensive auditing...", maxLength: 300 },
          { id: "descFontSize", label: "Desc Size (px)", type: "number", min: 10, max: 60 },
          { id: "image", label: "Service Icon/Photo", type: "image" }
        ]
      },

      { id: "contactEmail", label: "Contact Email", type: "text", placeholder: "info@smithassociates.com", section: "Contact", maxLength: 200 },
      { id: "countryCode", label: "Country Code", type: "select", options: countryCodes.map(c => `${c.flag} ${c.code} (${c.name})`), section: "Contact" },
      { id: "phone", label: "Phone Number", type: "text", placeholder: "1234567890", section: "Contact", maxLength: 15 },
      { id: "address", label: "Office Address", type: "text", placeholder: "Financial District, NY", section: "Contact", maxLength: 500 },
      { id: "footerCopyright", label: "Footer Copyright", type: "text", placeholder: "© 2024 Smith & Associates", section: "Footer", maxLength: 200 },
    ],
    "Teacher": [
      { id: "headerType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Header" },
      { id: "name", label: "Name", type: "text", placeholder: "Prof. Sarah Jenkins", section: "Header", maxLength: 100 },
      { id: "nameFontSize", label: "Name Font Size (px)", type: "number", placeholder: "24", section: "Header", min: 10, max: 100 },
      { id: "tagline", label: "Title / Subject", type: "text", placeholder: "Department of Literature", section: "Header", maxLength: 200 },
      { id: "taglineFontSize", label: "Tagline Font Size (px)", type: "number", placeholder: "16", section: "Header", min: 10, max: 60 },
      { id: "logoUrl", label: "Logo", type: "image", section: "Header" },

      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "Fostering Critical Minds.", section: "Hero Banner", maxLength: 300 },
      { id: "heroTitleFontSize", label: "Hero Title Font Size (px)", type: "number", placeholder: "72", section: "Hero Banner", min: 20, max: 200 },
      { id: "heroImage", label: "Hero Photo", type: "image", section: "Hero Banner" },

      { id: "aboutUsTitle", label: "About Title", type: "text", placeholder: "Academic Background", section: "About", maxLength: 200 },
      { id: "aboutUsTitleFontSize", label: "About Title Font Size (px)", type: "number", placeholder: "32", section: "About", min: 10, max: 80 },
      { id: "bio", label: "Biography", type: "textarea", placeholder: "I have been teaching literature for over 15 years...", section: "About", maxLength: 1500 },
      { id: "bioFontSize", label: "Bio Font Size (px)", type: "number", placeholder: "18", section: "About", min: 10, max: 40 },
      { id: "aboutImage", label: "Profile Photo", type: "image", section: "About" },

      {
        id: "services", label: "Courses / Services", type: "list", section: "Services",
        itemSchema: [
          { id: "name", label: "Course Name", type: "text", placeholder: "Introduction to Modern Lit", maxLength: 100 },
          { id: "nameFontSize", label: "Name Size (px)", type: "number", min: 10, max: 80 },
          { id: "desc", label: "Description", type: "textarea", placeholder: "A survey of 20th-century literature.", maxLength: 300 },
          { id: "descFontSize", label: "Desc Size (px)", type: "number", min: 10, max: 60 },
          { id: "image", label: "Course Image", type: "image" }
        ]
      },

      { id: "contactEmail", label: "Contact Email", type: "text", placeholder: "s.jenkins@university.edu", section: "Contact", maxLength: 200 },
      { id: "countryCode", label: "Country Code", type: "select", options: countryCodes.map(c => `${c.flag} ${c.code} (${c.name})`), section: "Contact" },
      { id: "phone", label: "Phone Number", type: "text", placeholder: "1234567890", section: "Contact", maxLength: 15 },
      { id: "address", label: "Location", type: "text", placeholder: "Arts Building, Room 402", section: "Contact", maxLength: 500 },
      { id: "footerCopyright", label: "Footer Copyright", type: "text", placeholder: "© 2024 Sarah Jenkins", section: "Footer", maxLength: 200 },
    ],
    "Graphic Designer": [
      { id: "headerType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Header" },
      { id: "name", label: "Designer Name", type: "text", placeholder: "Alex Neon", section: "Header", maxLength: 100 },
      { id: "nameFontSize", label: "Name Font Size (px)", type: "number", placeholder: "24", section: "Header", min: 10, max: 100 },
      { id: "tagline", label: "Tagline", type: "text", placeholder: "Visual Artist", section: "Header", maxLength: 200 },
      { id: "taglineFontSize", label: "Tagline Font Size (px)", type: "number", placeholder: "16", section: "Header", min: 10, max: 60 },
      { id: "logoUrl", label: "Logo URL", type: "image", section: "Header" },

      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "Creating Visual Magic.", section: "Hero Banner", maxLength: 300 },
      { id: "heroTitleFontSize", label: "Hero Title Font Size (px)", type: "number", placeholder: "72", section: "Hero Banner", min: 20, max: 200 },
      { id: "heroImage", label: "Hero Image", type: "image", section: "Hero Banner" },

      { id: "aboutUsTitle", label: "About Title", type: "text", placeholder: "My Journey", section: "About", maxLength: 200 },
      { id: "aboutUsTitleFontSize", label: "About Title Font Size (px)", type: "number", placeholder: "32", section: "About", min: 10, max: 80 },
      { id: "bio", label: "Biography", type: "textarea", placeholder: "I craft digital experiences...", section: "About", maxLength: 1500 },
      { id: "bioFontSize", label: "Bio Font Size (px)", type: "number", placeholder: "18", section: "About", min: 10, max: 40 },
      { id: "aboutImage", label: "Profile Picture", type: "image", section: "About" },

      {
        id: "services", label: "Tools & Skills", type: "list", section: "Skills",
        itemSchema: [
          { id: "name", label: "Skill Name", type: "text", placeholder: "Illustrator", maxLength: 100 },
          { id: "nameFontSize", label: "Name Size (px)", type: "number", min: 10, max: 80 },
          { id: "desc", label: "Description", type: "textarea", placeholder: "Vector graphics...", maxLength: 300 },
          { id: "descFontSize", label: "Desc Size (px)", type: "number", min: 10, max: 60 },
          { id: "image", label: "Skill Icon", type: "image" }
        ]
      },

      {
        id: "projects", label: "Portfolio Works", type: "list", section: "Portfolio",
        itemSchema: [
          { id: "name", label: "Project Title", type: "text", placeholder: "Neon Branding", maxLength: 100 },
          { id: "nameFontSize", label: "Name Size (px)", type: "number", min: 10, max: 80 },
          { id: "desc", label: "Description", type: "textarea", placeholder: "Brand identity...", maxLength: 500 },
          { id: "descFontSize", label: "Desc Size (px)", type: "number", min: 10, max: 60 },
          { id: "image", label: "Project Thumbnail", type: "image" },
          { id: "link", label: "Project Link", type: "text", placeholder: "https://..." }
        ]
      },

      { id: "contactEmail", label: "Email", type: "text", placeholder: "hello@alexneon.com", section: "Footer", maxLength: 200 },
      { id: "countryCode", label: "Country Code", type: "select", options: countryCodes.map(c => `${c.flag} ${c.code} (${c.name})`), section: "Footer" },
      { id: "phone", label: "Phone", type: "text", placeholder: "1234567890", section: "Footer", maxLength: 15 },
      { id: "address", label: "Location", type: "text", placeholder: "Los Angeles, CA", section: "Footer", maxLength: 500 },
      { id: "behanceUrl", label: "Behance URL", type: "text", placeholder: "https://behance.net/...", section: "Footer" },
      { id: "dribbbleUrl", label: "Dribbble URL", type: "text", placeholder: "https://dribbble.com/...", section: "Footer" },
      { id: "footerCopyright", label: "Footer Copyright", type: "text", placeholder: "© 2024 Alex Neon", section: "Footer", maxLength: 200 },
    ],
  };

  const commonFields = [
    "name", "companyName", "agencyName", "firmName", "tagline", "title1", "title2", "eventDate", "email", "contactEmail", "phone", "countryCode",
    "address", "location", "githubUrl", "linkedinUrl",
    "facebookUrl", "twitterUrl", "behanceUrl", "dribbbleUrl", "aboutUsTitle", "aboutUsContent", "aboutImage", "fontSize"
  ];

  // Fetch existing data if any
  useEffect(() => {
    const fetchExistingData = async () => {
      if (!user) return;
      try {
        const res = await fetch("http://localhost:8000/api/templates/my-templates", {
          credentials: "include",
          cache: "no-store",
        });

        // User-specific storage key for shared data - CATEGORY SPECIFIC
        const sharedDataKey = `tekunik_shared_data_${activeMode}_${user.email}`;
        const sharedDataStr = localStorage.getItem(sharedDataKey);
        const sharedData = sharedDataStr ? JSON.parse(sharedDataStr) : {};

        if (res.ok) {
          const userTemplates = await res.json();
          const existing = userTemplates.find(t => t.templateId === id);

          if (existing) {
            // Merge: Template Specific Data > Shared Data defaults
            const mergedData = { ...sharedData, ...existing.data };
            setFormData(mergedData);
          } else {
            // If new template, pre-fill with shared data
            setFormData(sharedData);
          }
        } else {
          // Fallback for failed fetch: Use shared data if available
          setFormData(sharedData);
        }
      } catch (error) {
        console.error("Error fetching existing template data:", error);
      }
    };

    if (!authLoading && user) {
      fetchExistingData().then(() => {
        // Migration logic for legacy services
        setFormData(prev => {
          if ((!prev.services || prev.services.length === 0) && prev.service1_name) {
            const migratedServices = [];
            for (let i = 1; i <= 4; i++) {
              if (prev[`service${i}_name`]) {
                migratedServices.push({
                  name: prev[`service${i}_name`],
                  desc: prev[`service${i}_desc`],
                  image: prev[`service${i}_image`],
                  nameFontSize: prev[`service${i}_nameFontSize`],
                  descFontSize: prev[`service${i}_descFontSize`],
                });
              }
            }
            if (migratedServices.length > 0) {
              prev.services = migratedServices;
            }
          }

          // Migration logic for projects
          if ((!prev.projects || prev.projects.length === 0) && prev.project1_name) {
            const migratedProjects = [];
            for (let i = 1; i <= 3; i++) {
              if (prev[`project${i}_name`]) {
                migratedProjects.push({
                  name: prev[`project${i}_name`],
                  desc: prev[`project${i}_desc`],
                  image: prev[`project${i}_image`],
                  link: prev[`project${i}_link`],
                  nameFontSize: prev[`project${i}_nameFontSize`],
                  descFontSize: prev[`project${i}_descFontSize`],
                });
              }
            }
            if (migratedProjects.length > 0) {
              prev.projects = migratedProjects;
            }
          }
          return { ...prev };
        });
      });
    }
  }, [user, authLoading, id, activeMode]);

  // Sync preview ID when mode changes
  useEffect(() => {
    if (activeMode === "Business" && !currentPreviewId.startsWith("business")) {
      setCurrentPreviewId("business-1");
    } else if (activeMode === "Portfolio" && !currentPreviewId.startsWith("portfolio")) {
      setCurrentPreviewId("portfolio-1");
    } else if (activeMode === "Doctor" && !currentPreviewId.startsWith("doctor")) {
      setCurrentPreviewId("doctor-1");
    } else if (activeMode === "Real Estate" && !currentPreviewId.startsWith("realestate")) {
      setCurrentPreviewId("realestate-1");
    } else if (activeMode === "Chartered Accountant" && !currentPreviewId.startsWith("ca")) {
      setCurrentPreviewId("ca-1");
    } else if (activeMode === "Teacher" && !currentPreviewId.startsWith("teacher")) {
      setCurrentPreviewId("teacher-1");
    } else if (activeMode === "Graphic Designer" && !["g1", "g2", "g3"].includes(currentPreviewId)) {
      setCurrentPreviewId("g1");
    }
  }, [activeMode, currentPreviewId]);

  // Handle input changes
  const handleChange = (e) => {
    let { name, value } = e.target;

    // Special handling for phone to only allow digits
    if (name === 'phone') {
      value = value.replace(/\D/g, '').slice(0, 15);
    }

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      // Broadcast update to other tabs (real-time preview)
      if (previewChannel) {
        previewChannel.postMessage({ id: currentPreviewId, data: updated });
      }

      // Update global shared data if this is a common field
      if (commonFields.includes(name)) {
        try {
          const sharedDataKey = `tekunik_shared_data_${activeMode}_${user.email}`;
          const sharedDataStr = localStorage.getItem(sharedDataKey);
          const sharedData = sharedDataStr ? JSON.parse(sharedDataStr) : {};
          sharedData[name] = value;
          localStorage.setItem(sharedDataKey, JSON.stringify(sharedData));
        } catch (e) {
          console.warn("Could not save shared data to localStorage", e);
        }
      }

      // Clear validation error if field is filled
      if (value.trim() !== "") {
        setValidationErrors(prev => ({ ...prev, [name]: null }));
      }

      return updated;
    });
  };

  const toggleExpand = (listId, index) => {
    setExpandedItems(prev => ({
      ...prev,
      [listId]: {
        ...(prev[listId] || {}),
        [index]: !prev[listId]?.[index]
      }
    }));
  };

  // Handle image upload (Base64)
  const handleImageUpload = (e, fieldId) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File is too large. Please select an image under 5MB.");
      return;
    }

    resizeImage(file, 800, 800).then((base64) => {
      setFormData((prev) => {
        const updated = { ...prev, [fieldId]: base64 };
        if (previewChannel) {
          previewChannel.postMessage({ id: currentPreviewId, data: updated });
        }
        return updated;
      });
      setValidationErrors((prev) => ({ ...prev, [fieldId]: null }));
    });
  };

  const adjustNumberValue = (name, delta, min, max) => {
    setFormData(prev => {
      const current = parseInt(prev[name]) || 0;
      let newValue = current + delta;
      if (min !== undefined) newValue = Math.max(min, newValue);
      if (max !== undefined) newValue = Math.min(max, newValue);

      const updated = { ...prev, [name]: newValue };
      if (previewChannel) {
        previewChannel.postMessage({ id: currentPreviewId, data: updated });
      }
      return updated;
    });
  };

  const adjustListNumberValue = (listId, index, fieldId, delta, min, max) => {
    setFormData(prev => {
      const newList = [...(prev[listId] || [])];
      const current = parseInt(newList[index][fieldId]) || 0;
      let newValue = current + delta;
      if (min !== undefined) newValue = Math.max(min, newValue);
      if (max !== undefined) newValue = Math.min(max, newValue);

      newList[index] = { ...newList[index], [fieldId]: newValue };
      const updated = { ...prev, [listId]: newList };
      if (previewChannel) {
        previewChannel.postMessage({ id: currentPreviewId, data: updated });
      }
      return updated;
    });
  };

  const handleListImageUpload = (e, listId, index, fieldId) => {
    const file = e.target.files[0];
    if (file) {
      resizeImage(file, 800, 800).then((base64) => {
        handleListChange(listId, index, fieldId, base64);
      });
    }
  };

  // Handle List Changes (Add/Remove/Update items)
  const handleListChange = (listId, index, fieldId, value) => {
    setFormData((prev) => {
      const newList = [...(prev[listId] || [])];
      newList[index] = { ...newList[index], [fieldId]: value };
      const updated = { ...prev, [listId]: newList };

      if (previewChannel) {
        previewChannel.postMessage({ id: currentPreviewId, data: updated });
      }
      return updated;
    });
  };

  const addListItem = (listId, schema) => {
    setFormData((prev) => {
      const newItem = schema.reduce((acc, field) => ({ ...acc, [field.id]: "" }), {});
      const newList = [...(prev[listId] || []), newItem];
      const updated = { ...prev, [listId]: newList };

      // Auto-expand the new item
      setExpandedItems(ex => ({
        ...ex,
        [listId]: {
          ...(ex[listId] || {}),
          [newList.length - 1]: true
        }
      }));

      return updated;
    });
  };

  const removeListItem = (listId, index) => {
    setFormData((prev) => {
      const newList = (prev[listId] || []).filter((_, i) => i !== index);
      const updated = { ...prev, [listId]: newList };

      if (previewChannel) {
        previewChannel.postMessage({ id: currentPreviewId, data: updated });
      }
      return updated;
    });
  };

  // Auto-save debounced to Database
  useEffect(() => {
    if (!user || Object.keys(formData).length === 0) return;

    const timeoutId = setTimeout(async () => {
      try {
        await fetch("http://localhost:8000/api/templates/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ templateId: currentPreviewId, data: formData }),
          credentials: "include",
        });
        console.log("Auto-saved to database");
      } catch (error) {
        console.error("Auto-save failed", error);
      }
    }, 2000); // 2 second debounce

    return () => clearTimeout(timeoutId);
  }, [formData, id, user, currentPreviewId]);

  // Validation Logic
  const validateForm = () => {
    const errors = {};
    const isBusiness = activeMode === "Business";
    const requiredFields = isBusiness
      ? ["companyName", "heroTitle", "contactEmail"]
      : ["name", "role", "email"];

    const currentFields = modeFields[activeMode];

    // 1. Required Fields Check
    requiredFields.forEach(fieldId => {
      const field = currentFields.find(f => f.id === fieldId);
      if (!formData[fieldId] || formData[fieldId].toString().trim() === "") {
        errors[fieldId] = `${field ? field.label : fieldId} is required`;
      }
    });

    // 2. Specific Validation for Business Mode
    if (isBusiness) {
      // Character Limits (Server-side/Save-time sync)
      const limits = {
        companyName: 100,
        heroTitle: 300,
        service1_name: 100,
        service2_name: 100,
        service3_name: 100,
        service4_name: 100,
        service1_desc: 300,
        service2_desc: 300,
        service3_desc: 300,
        service4_desc: 300,
        aboutUsTitle: 200,
        aboutUsContent: 500,
        contactEmail: 200,
        address: 600,
      };

      // Add portfolio specific limits if in Portfolio mode
      const portfolioLimits = {
        name: 100,
        role: 100,
        heroTitle: 200,
        service1_name: 100,
        service2_name: 100,
        service3_name: 100,
        service4_name: 100,
        project1_name: 100,
        project2_name: 100,
        project3_name: 100,
        project1_desc: 500,
        project2_desc: 500,
        project3_desc: 500,
        bio: 1000,
        email: 200,
      };

      const activeLimits = isBusiness ? limits : { ...limits, ...portfolioLimits };

      Object.entries(activeLimits).forEach(([fieldId, limit]) => {
        if (formData[fieldId] && formData[fieldId].length > limit) {
          const field = currentFields.find(f => f.id === fieldId);
          errors[fieldId] = `${field ? field.label : fieldId} must be under ${limit} characters`;
        }
      });

      // Email Format (Business use contactEmail, Portfolio use email)
      const emailField = isBusiness ? 'contactEmail' : 'email';
      if (formData[emailField] && !/^\S+@\S+\.\S+$/.test(formData[emailField])) {
        errors[emailField] = "Invalid email format";
      }

      // Phone Number (Strict 10 digits) - Business only
      if (isBusiness && formData.phone) {
        const phoneDigits = formData.phone.toString().replace(/\D/g, "");
        if (phoneDigits.length !== 10) {
          errors.phone = "Phone number must be exactly 10 digits";
        }
      }

      // Social Media Links
      if (isBusiness) {
        if (formData.facebookUrl && !formData.facebookUrl.includes("facebook.com")) {
          errors.facebookUrl = "Must be a valid Facebook URL";
        }
        if (formData.twitterUrl && !(formData.twitterUrl.includes("twitter.com") || formData.twitterUrl.includes("x.com"))) {
          errors.twitterUrl = "Must be a valid Twitter/X URL";
        }
      } else {
        // Portfolio Social Checks
        if (formData.githubUrl && !formData.githubUrl.includes("github.com")) {
          errors.githubUrl = "Must be a valid GitHub URL";
        }
      }

      // Common Social (LinkedIn)
      if (formData.linkedinUrl && !formData.linkedinUrl.includes("linkedin.com")) {
        errors.linkedinUrl = "Must be a valid LinkedIn URL";
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle Save
  const handleSave = async () => {
    if (!user) {
      setMessage("❌ You must be logged in to save templates.");
      return;
    }

    if (!validateForm()) {
      setMessage("❌ Please fill in all required fields.");
      return;
    }

    setIsSaving(true);
    setMessage("");
    try {
      const res = await fetch("http://localhost:8000/api/templates/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          templateId: currentPreviewId,
          data: formData,
        }),
        credentials: "include",
      });

      const result = await res.json();
      if (res.ok) {
        setMessage("✅ Template saved successfully! Redirecting to profile...");
        setTimeout(() => {
          router.push("/profile");
        }, 2000);
      } else {
        setMessage(`❌ Error: ${result.message || "Failed to save template"}`);
        console.error("Save error result:", result);
      }
    } catch (error) {
      setMessage("❌ Network error while saving. Please check if the server is running.");
      console.error("Save fetch error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Full Preview (Open in new tab)
  const handleOpenPreview = () => {
    // Save current form data to localStorage for the preview tab to pick up
    try {
      localStorage.setItem(`tekunik_preview_${currentPreviewId}`, JSON.stringify(formData));
    } catch (e) {
      console.warn("Failed to save preview data to localStorage", e);
    }
    // Open in a new tab
    window.open(`/preview/${currentPreviewId}`, '_blank');
  };

  if (!templateDef) return <div className="p-10 text-center">Template not found.</div>;
  if (authLoading) return <div className="p-10 text-center text-white">Loading...</div>;

  const PreviewComponent = templateMap[currentPreviewId];

  return (
    <div className="flex flex-col lg:flex-row h-screen pt-20 bg-slate-100 dark:bg-slate-950">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 z-[60] transition-all shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image src="/tekunik.png" alt="Tekunik Logo" width={32} height={32} className="h-8 w-auto" />
          </Link>
          <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800" />
          <span className="text-sm font-black text-slate-400 uppercase tracking-[0.3em]">Editor</span>
        </div>

        <div className="flex items-center gap-6">
          {user && (
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-500 hidden md:block">{user.name}</span>
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                {user.name && user.name[0]}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Left Panel: Editor */}
      <div className="w-full lg:w-1/3 p-8 border-r border-slate-200 dark:border-slate-800 overflow-y-auto bg-white dark:bg-slate-900 shadow-xl z-10 ">
        <div className="mb-8">
          <button
            onClick={() => router.push("/templates")}
            className="text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-2 mb-4 hover:underline"
          >
            ← Back to Gallery
          </button>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            Customize Template
          </h1>
          <p className="text-slate-500 mt-2 mb-8">
            Details for {templates.find(t => t.id === currentPreviewId)?.name || templateDef.name}
          </p>

          {/* Static Category Label */}
          <div className="flex items-center gap-3 mb-10 px-6 py-4 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
            <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">
              Editing {activeMode} Template
            </span>
          </div>
        </div>

        <div
          className="space-y-10"
          id={`fields-panel-${activeMode}`}
          aria-live="polite"
        >
          {Object.entries(
            modeFields[activeMode].reduce((acc, field) => {
              const section = field.section || "General";
              if (!acc[section]) acc[section] = [];
              acc[section].push(field);
              return acc;
            }, {})
          ).map(([sectionName, sectionFields]) => (
            <div key={sectionName} className="space-y-6">
              <h2 className="text-lg font-black text-indigo-600 dark:text-indigo-400 border-b border-indigo-100 dark:border-indigo-900/50 pb-2 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-indigo-600 rounded-full" />
                {sectionName}
              </h2>
              <div className="space-y-6">
                {sectionFields.map((field) => {
                  if (field.type === "list") {
                    const listData = formData[field.id] || [];
                    return (
                      <div key={field.id} className="space-y-6 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">{field.label}</label>
                          <button
                            onClick={() => addListItem(field.id, field.itemSchema)}
                            className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase hover:bg-indigo-700 transition"
                          >
                            + Add Service
                          </button>
                        </div>

                        {listData.length === 0 && (
                          <div className="text-center py-10 text-slate-400 text-xs italic bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                            No services added yet. Click the button above to start.
                          </div>
                        )}

                        <div className="space-y-4">
                          {listData.map((item, idx) => {
                            const isExpanded = expandedItems[field.id]?.[idx];

                            return (
                              <div key={idx} className={`relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm group/item transition-all overflow-hidden ${isExpanded ? 'p-6 ring-2 ring-indigo-600/20' : 'p-4 hover:border-indigo-500/50 cursor-pointer'}`} onClick={() => !isExpanded && toggleExpand(field.id, idx)}>
                                {!isExpanded ? (
                                  /* Compact View */
                                  <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4 min-w-0">
                                      <div className="flex-shrink-0 w-8 h-8 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-lg flex items-center justify-center font-black text-xs shadow-inner">
                                        {idx + 1}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="text-sm font-black text-slate-900 dark:text-white truncate tracking-tight">
                                          {item.name || item.title || `Service ${idx + 1}`}
                                        </p>
                                        <p className="text-[10px] text-slate-400 truncate italic font-medium">
                                          {item.desc || "No description added yet..."}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                      <button
                                        onClick={() => toggleExpand(field.id, idx)}
                                        className="px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                                      >
                                        Edit
                                      </button>
                                      <button
                                        onClick={() => removeListItem(field.id, idx)}
                                        className="w-8 h-8 bg-rose-50 dark:bg-rose-900/30 text-rose-500 rounded-full flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                                      >
                                        ✕
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  /* Expanded View */
                                  <div onClick={(e) => e.stopPropagation()}>
                                    <div className="flex justify-between items-center mb-6">
                                      <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-black text-xs shadow-lg">
                                          {idx + 1}
                                        </div>
                                        <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">Editing Service</span>
                                      </div>
                                      <button
                                        onClick={() => removeListItem(field.id, idx)}
                                        className="w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-rose-600 transition"
                                        title="Remove Item"
                                      >
                                        ✕
                                      </button>
                                    </div>

                                    <div className="space-y-6">
                                      {field.itemSchema.map(sField => (
                                        <div key={sField.id}>
                                          <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 block">{sField.label}</label>
                                          {sField.type === "textarea" ? (
                                            <textarea
                                              value={item[sField.id] || ""}
                                              onChange={(e) => handleListChange(field.id, idx, sField.id, e.target.value)}
                                              className="w-full p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 transition shadow-inner"
                                              rows={3}
                                            />
                                          ) : sField.type === "image" ? (
                                            <div className="space-y-4">
                                              {(item[sField.id] && typeof item[sField.id] === 'string' && item[sField.id].trim() !== "") && (
                                                <div className="relative group/img inline-block">
                                                  <div className="relative h-32 w-48 mb-2">
                                                    <Image
                                                      src={item[sField.id]}
                                                      alt={item.name || "Service Image"}
                                                      fill
                                                      className="object-cover rounded-xl shadow-lg border-2 border-slate-100 dark:border-slate-800"
                                                    />
                                                  </div>
                                                  <button
                                                    onClick={() => handleListChange(field.id, idx, sField.id, "")}
                                                    className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity shadow-lg"
                                                  >
                                                    ✕
                                                  </button>
                                                </div>
                                              )}
                                              <div className="flex flex-col gap-3">
                                                <label className="flex items-center justify-center gap-3 p-6 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:border-indigo-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer">
                                                  <span className="text-xl">📁</span>
                                                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Upload Image</span>
                                                  <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleListImageUpload(e, field.id, idx, sField.id)}
                                                    className="hidden"
                                                  />
                                                </label>
                                                <div className="relative">
                                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <span className="text-slate-400 text-[10px]">🔗</span>
                                                  </div>
                                                  <input
                                                    type="text"
                                                    placeholder="Or paste URL here..."
                                                    value={typeof item[sField.id] === 'string' && item[sField.id].startsWith('data:image') ? 'Uploaded from file' : item[sField.id] || ""}
                                                    onChange={(e) => handleListChange(field.id, idx, sField.id, e.target.value)}
                                                    className="w-full pl-8 p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-[10px] shadow-inner focus:ring-2 focus:ring-indigo-500 transition-all"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          ) : (
                                            sField.type === "number" ? (
                                              <div className="relative flex items-center">
                                                <input
                                                  type="number"
                                                  value={item[sField.id] || ""}
                                                  onChange={(e) => handleListChange(field.id, idx, sField.id, e.target.value)}
                                                  min={sField.min}
                                                  max={sField.max}
                                                  className="w-full p-3 pr-12 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 transition shadow-inner appearance-none"
                                                />
                                                <div className="absolute right-2 flex flex-col gap-1">
                                                  <button
                                                    onClick={() => adjustListNumberValue(field.id, idx, sField.id, 1, sField.min, sField.max)}
                                                    className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition text-xs"
                                                  >
                                                    ▲
                                                  </button>
                                                  <button
                                                    onClick={() => adjustListNumberValue(field.id, idx, sField.id, -1, sField.min, sField.max)}
                                                    className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition text-xs"
                                                  >
                                                    ▼
                                                  </button>
                                                </div>
                                              </div>
                                            ) : (
                                              <input
                                                type={sField.type}
                                                value={item[sField.id] || ""}
                                                onChange={(e) => handleListChange(field.id, idx, sField.id, e.target.value)}
                                                className="w-full p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 transition shadow-inner"
                                              />
                                            )
                                          )}
                                        </div>
                                      ))}
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                                      <button
                                        onClick={() => toggleExpand(field.id, idx)}
                                        className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-xl active:scale-95"
                                      >
                                        Done
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }

                  // Existing field rendering logic
                  if (field.id === "logoUrl" && formData.headerType === "Text") return null;
                  if ((field.id === "name" || field.id === "companyName") && formData.headerType === "Image") return null;

                  // Skip countryCode standalone rendering if phone exists in the same section
                  if (field.id === "countryCode" && sectionFields.some(f => f.id === "phone")) return null;

                  // Special combined rendering for phone and countryCode using the modern PhoneInput component
                  if (field.id === "phone") {
                    const countryCodeField = sectionFields.find(f => f.id === "countryCode");

                    // Extract code from countryCode display string if it exists (e.g. "🇮🇳 +91 (India)" -> "+91")
                    let currentCode = formData.countryCode || "";
                    if (currentCode.includes(' ')) {
                      currentCode = currentCode.split(' ')[1];
                    }

                    return (
                      <div key={field.id} className="group space-y-3">
                        <label className={`text-[10px] font-black uppercase tracking-widest transition-colors ${validationErrors[field.id] ? "text-rose-500" : "text-slate-500 dark:text-slate-400 group-focus-within:text-indigo-600"}`}>
                          Mobile Connection
                        </label>
                        <PhoneInput
                          initialCountryCode={currentCode}
                          initialPhoneNumber={formData.phone || ""}
                          onChange={(data) => {
                            // Update both fields in formData
                            setFormData(prev => {
                              const updated = {
                                ...prev,
                                phone: data.phoneNumber,
                                // Keep the original format if it was "flag code (name)"
                                countryCode: countryCodeField?.options.find(opt => opt.includes(data.countryCode)) || data.countryCode
                              };

                              // Broadcast update to real-time preview
                              if (previewChannel) {
                                previewChannel.postMessage({ id: currentPreviewId, data: updated });
                              }

                              return updated;
                            });

                            // Clear validation error if valid
                            if (data.isValid) {
                              setValidationErrors(prev => ({ ...prev, phone: null }));
                            }
                          }}
                        />
                        {validationErrors[field.id] && (
                          <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-2 ml-1">
                            {validationErrors[field.id]}
                          </p>
                        )}
                      </div>
                    );
                  }
                  return (
                    <div key={field.id} className="group">
                      <div className="flex justify-between items-center mb-2">
                        <label className={`text-[10px] font-black uppercase tracking-widest transition-colors ${validationErrors[field.id] ? "text-rose-500" : "text-slate-500 dark:text-slate-400 group-focus-within:text-indigo-600"
                          }`}>
                          {field.label}
                        </label>
                        {field.maxLength && (
                          <span className={`text-[10px] font-bold ${(formData[field.id]?.length || 0) >= field.maxLength ? "text-rose-500" : "text-slate-400"
                            }`}>
                            {formData[field.id]?.length || 0} / {field.maxLength}
                          </span>
                        )}
                      </div>
                      {field.type === "textarea" ? (
                        <textarea
                          name={field.id}
                          value={formData[field.id] || ""}
                          placeholder={field.placeholder}
                          onChange={handleChange}
                          maxLength={field.maxLength}
                          className={`w-full p-4 rounded-xl border transition h-32 text-slate-900 dark:text-white placeholder:text-slate-400 ${validationErrors[field.id]
                            ? "border-rose-500 bg-rose-50/10 focus:ring-rose-500"
                            : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 focus:ring-indigo-500"
                            } focus:ring-2 focus:border-transparent`}
                        />
                      ) : field.type === "select" ? (
                        <select
                          name={field.id}
                          value={formData[field.id] || ""}
                          onChange={handleChange}
                          className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-slate-900 dark:text-white appearance-none cursor-pointer"
                        >
                          <option value="">Select Option</option>
                          {field.options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : field.type === "image" ? (
                        <div className="space-y-4">
                          {(formData[field.id] && typeof formData[field.id] === 'string' && formData[field.id].trim() !== "") && (
                            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
                              <Image src={formData[field.id]} alt="Section Preview" fill className="object-contain" />
                              <button
                                onClick={() => setFormData(prev => ({ ...prev, [field.id]: "" }))}
                                className="absolute top-2 right-2 bg-rose-500 text-white p-1.5 rounded-full shadow-lg hover:bg-rose-600 transition z-10"
                              >
                                ✕
                              </button>
                            </div>
                          )}
                          <div className="flex items-center gap-4">
                            <label className="flex-1">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, field.id)}
                                className="hidden"
                              />
                              <div className="flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 cursor-pointer transition">
                                <span className="text-2xl">📸</span>
                                <span className="font-bold text-slate-600 dark:text-slate-400">
                                  {formData[field.id] ? "Change Image" : "Upload Image from Gallery"}
                                </span>
                              </div>
                            </label>
                          </div>
                          <input
                            type="text"
                            name={field.id}
                            value={formData[field.id] || ""}
                            placeholder="Or paste image URL here..."
                            onChange={handleChange}
                            className="w-full p-3 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 focus:ring-1 focus:ring-indigo-500 transition text-slate-500"
                          />
                        </div>
                      ) : (
                        field.type === "number" ? (
                          <div className="relative flex items-center">
                            <input
                              type="number"
                              name={field.id}
                              value={formData[field.id] || ""}
                              placeholder={field.placeholder}
                              onChange={handleChange}
                              min={field.min}
                              max={field.max}
                              step={field.step || 1}
                              className={`w-full p-4 pr-12 rounded-xl border transition text-slate-900 dark:text-white placeholder:text-slate-400 ${validationErrors[field.id]
                                ? "border-rose-500 bg-rose-50/10 focus:ring-rose-500"
                                : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 focus:ring-indigo-500"
                                } focus:ring-2 focus:border-transparent appearance-none`}
                            />
                            <div className="absolute right-4 flex flex-col gap-1">
                              <button
                                onClick={() => adjustNumberValue(field.id, 1, field.min, field.max)}
                                className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition text-sm"
                              >
                                ▲
                              </button>
                              <button
                                onClick={() => adjustNumberValue(field.id, -1, field.min, field.max)}
                                className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition text-sm"
                              >
                                ▼
                              </button>
                            </div>
                          </div>
                        ) : (
                          <input
                            type={field.id === 'phone' ? 'text' : field.type}
                            name={field.id}
                            value={formData[field.id] || ""}
                            placeholder={field.placeholder}
                            onChange={handleChange}
                            maxLength={field.maxLength}
                            min={field.min}
                            max={field.max}
                            step={field.step || 1}
                            className={`w-full p-4 rounded-xl border transition text-slate-900 dark:text-white placeholder:text-slate-400 ${validationErrors[field.id]
                              ? "border-rose-500 bg-rose-50/10 focus:ring-rose-500"
                              : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 focus:ring-indigo-500"
                              } focus:ring-2 focus:border-transparent`}
                          />
                        )
                      )}

                      {validationErrors[field.id] && (
                        <p className="mt-2 text-xs font-bold text-rose-500 italic">
                          {validationErrors[field.id]}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/30 disabled:bg-indigo-400 active:scale-95"
            >
              {isSaving ? "Saving..." : "Save Template"}
            </button>

            {message && (
              <div className={`mt-4 p-4 rounded-xl text-center font-bold ${message.includes("✅") ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"}`}>
                {message}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Panel: Preview */}
      <div className="flex-1 p-4 lg:p-12 overflow-y-auto bg-slate-100 dark:bg-slate-950 mb-20">
        <div className="max-w-4xl mx-auto h-full min-h-[700px]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 px-4 bg-white/50 dark:bg-slate-800/50 w-fit py-1.5 rounded-full border border-slate-200/50 dark:border-slate-700/50">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="ml-2 text-xs font-bold text-slate-500 uppercase tracking-widest">Live Preview</span>
              </div>

              {/* Template Switcher - Pill Selector */}
              <div className="flex bg-slate-200/40 dark:bg-slate-800/40 p-1.5 rounded-2xl border border-white dark:border-slate-800 shadow-sm backdrop-blur-sm">
                {templates
                  .filter(t => t.category === activeMode)
                  .map((t, idx) => {
                    const label = activeMode === "Portfolio" ? `P${idx + 1}` :
                      activeMode === "Business" ? `B${idx + 1}` :
                        activeMode === "Doctor" ? `D${idx + 1}` :
                          activeMode === "Real Estate" ? `R${idx + 1}` :
                            activeMode === "Teacher" ? `T${idx + 1}` :
                              activeMode === "CA" ? `C${idx + 1}` :
                                activeMode === "Graphic Designer" ? `G${idx + 1}` : `E${idx + 1}`;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setCurrentPreviewId(t.id)}
                        className={`px-5 py-2 rounded-xl text-xs font-black transition-all relative ${currentPreviewId === t.id
                          ? "text-white"
                          : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                          }`}
                      >
                        {currentPreviewId === t.id && (
                          <motion.div
                            layoutId="activeSubTab"
                            className="absolute inset-0 bg-indigo-600 rounded-xl shadow-md z-0"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                        <span className="relative z-10">{label}</span>
                      </button>
                    );
                  })}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleOpenPreview}
                className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-full transition hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-2 border border-slate-200 dark:border-slate-700"
              >
                Full Preview ↗
              </button>
              <button
                onClick={() => setShowPublishModal(true)}
                className="px-6 py-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-xs font-black rounded-full transition shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20 flex items-center gap-2 active:scale-95 border border-indigo-500/30"
              >
                Publish
              </button>
            </div>
          </div>
          {PreviewComponent ? (
            <PreviewComponent data={formData} />
          ) : (
            <div className="h-full flex items-center justify-center text-slate-500 bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700">
              Select a valid template to preview
            </div>
          )}
        </div>
      </div>
      {/* Publish Modal */}
      <AnimatePresence>
        {showPublishModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setShowPublishModal(false); setPublishStep('plans'); }}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`relative w-full ${publishStep === 'plans' ? 'max-w-5xl' : 'max-w-lg'} bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-500`}
            >
              <div className="p-8 lg:p-12">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">
                      {publishStep === 'plans' ? "Choose Your Plan" : "Configure Your Domain"}
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-widest">
                      {publishStep === 'plans' ? "Select a subscription to take your site live" : "How should users find your masterpiece?"}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowPublishModal(false);
                      setPublishStep('plans');
                    }}
                    className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {publishStep === 'plans' ? (
                  /* Step 1: Subscription Plans */
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        id: 'bronze',
                        name: 'Bronze',
                        price: '$9',
                        desc: 'Essential for personal branding',
                        color: 'from-[#A77044] to-[#824E2B]',
                        bg: 'bg-orange-500/5',
                        icon: (
                          <svg viewBox="0 0 24 24" fill="none" stroke="#CD7F32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                          </svg>
                        ),
                        features: ['1 Personal Subdomain', 'Standard Templates', 'Tekunik Branding', 'Basic Support']
                      },
                      {
                        id: 'silver',
                        name: 'Silver',
                        price: '$19',
                        desc: 'The best value for growing businesses',
                        color: 'from-slate-400 to-slate-600',
                        bg: 'bg-indigo-500/5',
                        popular: true,
                        icon: (
                          <svg viewBox="0 0 24 24" fill="none" stroke="#C0C0C0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ),
                        features: ['Custom Domain Support', 'Premium Templates', 'No Branding', 'Priority Email Support']
                      },
                      {
                        id: 'gold',
                        name: 'Gold',
                        price: '$49',
                        desc: 'Ultimate power and white-labeling',
                        color: 'from-[#FFD700] to-[#DAA520]',
                        bg: 'bg-yellow-500/5',
                        icon: (
                          <svg viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                            <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                          </svg>
                        ),
                        features: ['Unlimited Domains', 'Exclusive Templates', 'Full White-label', '24/7 VIP Support']
                      }
                    ].map((plan, idx) => (
                      <motion.div
                        key={plan.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`relative p-10 rounded-[2.5rem] border transition-all duration-500 cursor-pointer overflow-hidden flex flex-col ${selectedPlan === plan.id
                          ? `border-indigo-500 bg-white dark:bg-slate-800 shadow-[0_20px_50px_rgba(79,70,229,0.15)] scale-[1.02] ring-1 ring-indigo-500/50`
                          : `border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30 hover:border-indigo-400 hover:shadow-2xl hover:scale-[1.01]`
                          }`}
                        onClick={() => setSelectedPlan(plan.id)}
                      >
                        {/* Background Decoration */}
                        <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${plan.color} opacity-[0.03] rounded-full blur-3xl`} />

                        {plan.popular && (
                          <div className="absolute top-0 right-0">
                            <motion.div
                              animate={{ opacity: [0.9, 1, 0.9], scale: [1, 1.02, 1] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                              className="px-6 py-2 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest rounded-bl-3xl shadow-lg"
                            >
                              Selected by Most
                            </motion.div>
                          </div>
                        )}

                        <div className="mb-10 flex items-center justify-between">
                          <div className={`w-20 h-20 rounded-full shadow-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-indigo-500/10 ${plan.id === 'bronze' ? 'bg-[#CD7F32]' :
                            plan.id === 'silver' ? 'bg-[#C0C0C0]' :
                              'bg-[#FFD700]'
                            }`}>
                            <div className="flex items-center justify-center text-white drop-shadow-md">
                              {/* Re-rendering icons with white stroke for solid BG */}
                              {plan.id === 'bronze' ? (
                                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                                </svg>
                              ) : plan.id === 'silver' ? (
                                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                              ) : (
                                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-white">
                                  <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                                </svg>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-baseline justify-end gap-1">
                              <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">{plan.price}</span>
                              <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">/mo</span>
                            </div>
                          </div>
                        </div>

                        <div className="mb-8">
                          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight group-hover:text-indigo-600 transition-colors">{plan.name}</h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{plan.desc}</p>
                        </div>

                        <div className="flex-grow space-y-5 mb-10 text-left">
                          {plan.features.map((feature, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + (i * 0.1) }}
                              className="flex items-start gap-4 group/item"
                            >
                              <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center transition-colors ${selectedPlan === plan.id ? 'bg-indigo-600 text-white' : 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600'}`}>
                                <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 tracking-tight group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400 transition-colors">
                                {feature}
                              </span>
                            </motion.div>
                          ))}
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPlan(plan.id);
                            setPublishStep('domain');
                          }}
                          className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden relative group/btn ${selectedPlan === plan.id
                            ? 'bg-indigo-600 text-white shadow-[0_10px_30px_rgba(79,70,229,0.3)]'
                            : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-indigo-600 hover:text-white'
                            }`}
                        >
                          <span className="relative z-10 transition-transform duration-500 flex items-center justify-center gap-2 group-hover/btn:translate-x-1">
                            Get Started
                            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </span>
                        </button>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  /* Step 2: Domain Configuration */
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                  >
                    <div className="group">
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 group-focus-within:text-indigo-600 transition-colors">
                        Subdomain
                      </label>
                      <div className="relative flex items-center">
                        <input
                          type="text"
                          placeholder="my-creative-site"
                          value={publishData.subdomain}
                          onChange={(e) => setPublishData(prev => ({ ...prev, subdomain: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') }))}
                          className="w-full p-4 pr-32 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white font-bold focus:border-indigo-500 focus:ring-0 transition-all outline-none"
                        />
                        <div className="absolute right-4 px-3 py-1 bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 text-[10px] font-black text-slate-400 uppercase tracking-widest pointer-events-none">
                          .techunik.com
                        </div>
                      </div>
                    </div>

                    {selectedPlan !== 'bronze' && (
                      <>
                        <div className="relative flex items-center py-2">
                          <div className="flex-grow border-t border-slate-100 dark:border-slate-800"></div>
                          <span className="flex-shrink mx-4 text-[10px] font-black text-slate-300 uppercase tracking-widest">OR</span>
                          <div className="flex-grow border-t border-slate-100 dark:border-slate-800"></div>
                        </div>

                        <div className="group">
                          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 group-focus-within:text-indigo-600 transition-colors">
                            Custom Domain
                          </label>
                          <input
                            type="text"
                            placeholder="www.yourdomain.com"
                            value={publishData.customDomain}
                            onChange={(e) => setPublishData(prev => ({ ...prev, customDomain: e.target.value }))}
                            className="w-full p-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white font-bold focus:border-indigo-500 focus:ring-0 transition-all outline-none"
                          />
                        </div>
                      </>
                    )}

                    <div className="mt-12 space-y-4">
                      <button
                        onClick={() => {
                          const templateName = templates.find(t => t.id === currentPreviewId)?.name || currentPreviewId;
                          alert(`Publishing "${templateName}" with plan ${selectedPlan.toUpperCase()}!`);
                          setShowPublishModal(false);
                          setPublishStep('plans');
                        }}
                        className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl transition shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3 text-sm uppercase tracking-widest active:scale-95"
                      >
                        Publish with {selectedPlan?.toUpperCase()} 🚀
                      </button>
                      <button
                        onClick={() => setPublishStep('plans')}
                        className="w-full py-3 text-slate-400 text-xs font-bold hover:text-slate-600 dark:hover:text-slate-200 transition"
                      >
                        ← Back to Plans
                      </button>
                      <p className="mt-6 text-center text-[10px] text-slate-400 italic">
                        By publishing, you agree to techunik&apos;s terms of service.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
