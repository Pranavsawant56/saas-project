"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { templates } from "@/data/templates";
import PortfolioTemplate from "@/components/templates/PortfolioTemplate";
import PortfolioTemplate2 from "@/components/templates/PortfolioTemplate2";
import PortfolioTemplate3 from "@/components/templates/PortfolioTemplate3";
import BusinessTemplate from "@/components/templates/BusinessTemplate";
import BusinessTemplate2 from "@/components/templates/BusinessTemplate2";
import BusinessTemplate3 from "@/components/templates/BusinessTemplate3";
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
      { id: "name", label: "Full Name", type: "text", placeholder: "John Doe", section: "Header" },
      { id: "logoUrl", label: "Logo URL", type: "image", section: "Header" },
      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "Hi, I'm John", section: "Hero Banner" },
      { id: "role", label: "Professional Role", type: "text", placeholder: "Developer", section: "Hero Banner" },
      { id: "avatarUrl", label: "Profile Image", type: "image", section: "Hero Banner" },

      { id: "service1_name", label: "Skill 1 Name", type: "text", placeholder: "Web Design", section: "Skills" },
      { id: "service1_desc", label: "Skill 1 Description", type: "textarea", placeholder: "Description...", section: "Skills" },
      { id: "service2_name", label: "Skill 2 Name", type: "text", placeholder: "Development", section: "Skills" },
      { id: "service2_desc", label: "Skill 2 Description", type: "textarea", placeholder: "Description...", section: "Skills" },
      { id: "service3_name", label: "Skill 3 Name", type: "text", placeholder: "Mobile Apps", section: "Skills" },
      { id: "service3_desc", label: "Skill 3 Description", type: "textarea", placeholder: "Description...", section: "Skills" },
      { id: "service4_name", label: "Skill 4 Name", type: "text", placeholder: "UI/UX Strategy", section: "Skills" },
      { id: "service4_desc", label: "Skill 4 Description", type: "textarea", placeholder: "Description...", section: "Skills" },

      { id: "project1_name", label: "Project 1 Name", type: "text", placeholder: "E-Commerce App", section: "Projects" },
      { id: "project1_desc", label: "Project 1 Description", type: "textarea", placeholder: "Project details...", section: "Projects" },
      { id: "project1_image", label: "Project 1 Image", type: "image", section: "Projects" },
      { id: "project1_link", label: "Project 1 Link", type: "text", placeholder: "https://github.com/...", section: "Projects" },

      { id: "project2_name", label: "Project 2 Name", type: "text", placeholder: "Task Manager", section: "Projects" },
      { id: "project2_desc", label: "Project 2 Description", type: "textarea", placeholder: "Project details...", section: "Projects" },
      { id: "project2_image", label: "Project 2 Image", type: "image", section: "Projects" },
      { id: "project2_link", label: "Project 2 Link", type: "text", placeholder: "https://github.com/...", section: "Projects" },

      { id: "project3_name", label: "Project 3 Name", type: "text", placeholder: "Weather App", section: "Projects" },
      { id: "project3_desc", label: "Project 3 Description", type: "textarea", placeholder: "Project details...", section: "Projects" },
      { id: "project3_image", label: "Project 3 Image", type: "image", section: "Projects" },
      { id: "project3_link", label: "Project 3 Link", type: "text", placeholder: "https://github.com/...", section: "Projects" },

      { id: "bio", label: "Biography", type: "textarea", placeholder: "Tell your story...", section: "About" },
      { id: "email", label: "Email Address", type: "text", placeholder: "hello@example.com", section: "Footer" },
      { id: "githubUrl", label: "GitHub URL", type: "text", placeholder: "https://github.com/...", section: "Footer" },
      { id: "linkedinUrl", label: "LinkedIn URL", type: "text", placeholder: "https://linkedin.com/...", section: "Footer" },
    ],
    Business: [
      { id: "headerType", label: "Branding Type", type: "select", options: ["Text", "Image"], section: "Header" },
      { id: "companyName", label: "Business Name", type: "text", placeholder: "Acme Corp", section: "Header" },
      { id: "logoUrl", label: "Logo URL", type: "image", section: "Header" },

      { id: "heroTitle", label: "Hero Title", type: "text", placeholder: "Leading Innovation", section: "Hero Banner" },
      { id: "tagline", label: "Business Tagline", type: "text", placeholder: "The future is here", section: "Hero Banner" },
      { id: "heroImage", label: "Hero Image URL", type: "image", section: "Hero Banner" },

      { id: "service1_name", label: "Service 1 Name", type: "text", placeholder: "Strategic Planning", section: "Services" },
      { id: "service1_desc", label: "Service 1 Description", type: "textarea", placeholder: "Description...", section: "Services" },
      { id: "service1_image", label: "Service 1 Image", type: "image", section: "Services" },
      { id: "service2_name", label: "Service 2 Name", type: "text", placeholder: "Market Analysis", section: "Services" },
      { id: "service2_desc", label: "Service 2 Description", type: "textarea", placeholder: "Description...", section: "Services" },
      { id: "service2_image", label: "Service 2 Image", type: "image", section: "Services" },
      { id: "service3_name", label: "Service 3 Name", type: "text", placeholder: "Digital Solutions", section: "Services" },
      { id: "service3_desc", label: "Service 3 Description", type: "textarea", placeholder: "Description...", section: "Services" },
      { id: "service3_image", label: "Service 3 Image", type: "image", section: "Services" },
      { id: "service4_name", label: "Service 4 Name", type: "text", placeholder: "Cloud Migration", section: "Services" },
      { id: "service4_desc", label: "Service 4 Description", type: "textarea", placeholder: "Description...", section: "Services" },
      { id: "service4_image", label: "Service 4 Image", type: "image", section: "Services" },

      { id: "aboutUsTitle", label: "About Us Title", type: "text", placeholder: "Who We Are", section: "About" },
      { id: "aboutUsContent", label: "Business Description", type: "textarea", placeholder: "Describe your business...", section: "About" },
      { id: "aboutUsImage", label: "About Us Image", type: "image", section: "About" },

      { id: "contactEmail", label: "Contact Email", type: "text", placeholder: "contact@acme.com", section: "Footer" },
      { id: "address", label: "Office Address", type: "text", placeholder: "123 Business St", section: "Footer" },
      { id: "phone", label: "Phone Number", type: "number", placeholder: "1234567890", section: "Footer" },
      { id: "facebookUrl", label: "Facebook URL", type: "text", placeholder: "https://facebook.com/...", section: "Footer" },
      { id: "twitterUrl", label: "Twitter URL", type: "text", placeholder: "https://twitter.com/...", section: "Footer" },
      { id: "linkedinUrl", label: "LinkedIn URL", type: "text", placeholder: "https://linkedin.com/...", section: "Footer" },
    ]
  };

  const commonFields = [
    "name", "companyName", "email", "contactEmail", "phone",
    "address", "location", "githubUrl", "linkedinUrl",
    "facebookUrl", "twitterUrl", "tagline", "aboutUsTitle", "aboutUsContent"
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
      fetchExistingData();
    }
  }, [user, authLoading, id, activeMode]);

  // Sync preview ID when mode changes
  useEffect(() => {
    if (activeMode === "Business" && !currentPreviewId.startsWith("business")) {
      setCurrentPreviewId("business-1");
    } else if (activeMode === "Portfolio" && !currentPreviewId.startsWith("portfolio")) {
      setCurrentPreviewId("portfolio-1");
    }
  }, [activeMode, currentPreviewId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
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

  // Handle image upload (Base64)
  const handleImageUpload = (e, fieldId) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File is too large. Please select an image under 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      // Optimize image size before storing
      const optimizedImage = await resizeImage(reader.result);

      setFormData((prev) => {
        const updated = { ...prev, [fieldId]: optimizedImage };

        // Broadcast update to other tabs
        if (previewChannel) {
          previewChannel.postMessage({ id: currentPreviewId, data: updated });
        }

        // Update global shared data if this is a common field (like logoUrl)
        if (commonFields.includes(fieldId)) {
          try {
            const sharedDataKey = `tekunik_shared_data_${activeMode}_${user.email}`;
            const sharedDataStr = localStorage.getItem(sharedDataKey);
            const sharedData = sharedDataStr ? JSON.parse(sharedDataStr) : {};
            sharedData[fieldId] = optimizedImage;
            localStorage.setItem(sharedDataKey, JSON.stringify(sharedData));
          } catch (e) {
            console.warn("Could not save shared image to localStorage", e);
          }
        }

        // Clear validation error if field is filled
        setValidationErrors(prev => ({ ...prev, [fieldId]: null }));

        return updated;
      });
    };
    reader.readAsDataURL(file);
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
  }, [formData, id, user]);

  // Validation Logic
  const validateForm = () => {
    const errors = {};
    const requiredFields = activeMode === "Business"
      ? ["companyName", "tagline", "contactEmail"]
      : ["name", "role", "email"];

    const currentFields = modeFields[activeMode];

    requiredFields.forEach(fieldId => {
      const field = currentFields.find(f => f.id === fieldId);
      if (!formData[fieldId] || formData[fieldId].toString().trim() === "") {
        errors[fieldId] = `${field ? field.label : fieldId} is required`;
      }
    });

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
            <img src="/tekunik.png" alt="Tekunik" className="h-8 w-auto" />
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
                  // Conditional visibility for Branding
                  if (field.id === "logoUrl" && formData.headerType === "Text") return null;
                  if ((field.id === "name" || field.id === "companyName") && formData.headerType === "Image") return null;

                  return (
                    <div key={field.id} className="group">
                      <label className="block text-xs font-black text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-widest group-focus-within:text-indigo-600 transition-colors">
                        {field.label}
                      </label>
                      {field.type === "textarea" ? (
                        <textarea
                          name={field.id}
                          value={formData[field.id] || ""}
                          placeholder={field.placeholder}
                          onChange={handleChange}
                          className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition h-32 text-slate-900 dark:text-white placeholder:text-slate-400"
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
                          {formData[field.id] && (
                            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
                              <img src={formData[field.id]} alt="Preview" className="w-full h-full object-contain" />
                              <button
                                onClick={() => setFormData(prev => ({ ...prev, [field.id]: "" }))}
                                className="absolute top-2 right-2 bg-rose-500 text-white p-1.5 rounded-full shadow-lg hover:bg-rose-600 transition"
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
                        <input
                          type={field.type}
                          name={field.id}
                          value={formData[field.id] || ""}
                          placeholder={field.placeholder}
                          onChange={handleChange}
                          className={`w-full p-4 rounded-xl border ${validationErrors[field.id]
                            ? "border-rose-500 ring-2 ring-rose-500/10"
                            : "border-slate-200 dark:border-slate-800"
                            } bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-slate-900 dark:text-white placeholder:text-slate-400`}
                        />
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
                    const label = activeMode === "Portfolio" ? `P${idx + 1}` : `B${idx + 1}`;
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

            <button
              onClick={handleOpenPreview}
              className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-full transition shadow-md flex items-center gap-2"
            >
              Full Preview ↗
            </button>
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
    </div>
  );
}
