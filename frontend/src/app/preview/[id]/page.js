"use client";

import { useState, useEffect, use } from "react";
import dynamic from "next/dynamic";
import { useAuth } from "@/context/AuthContext";
import { getPreviewData } from "@/utils/db";

// Dynamic imports for templates - loaded on demand
const PortfolioTemplate = dynamic(() => import("@/components/templates/PortfolioTemplate"));
const PortfolioTemplate2 = dynamic(() => import("@/components/templates/PortfolioTemplate2"));
const PortfolioTemplate3 = dynamic(() => import("@/components/templates/PortfolioTemplate3"));
const PortfolioTemplate4 = dynamic(() => import("@/components/templates/PortfolioTemplate4"));
const PortfolioTemplate5 = dynamic(() => import("@/components/templates/PortfolioTemplate5"));
const PortfolioTemplate6 = dynamic(() => import("@/components/templates/PortfolioTemplate6"));
const PortfolioTemplate7 = dynamic(() => import("@/components/templates/PortfolioTemplate7"));
const PortfolioTemplate8 = dynamic(() => import("@/components/templates/PortfolioTemplate8"));
const PortfolioTemplate9 = dynamic(() => import("@/components/templates/PortfolioTemplate9"));
const PortfolioTemplate10 = dynamic(() => import("@/components/templates/PortfolioTemplate10"));
const PortfolioTemplatePremium = dynamic(() => import("@/components/templates/PortfolioTemplatePremium"));
const BusinessTemplate = dynamic(() => import("@/components/templates/BusinessTemplate"));
const BusinessTemplate2 = dynamic(() => import("@/components/templates/BusinessTemplate2"));
const BusinessTemplate3 = dynamic(() => import("@/components/templates/BusinessTemplate3"));
const DoctorTemplate = dynamic(() => import("@/components/templates/DoctorTemplate"));
const DoctorTemplate2 = dynamic(() => import("@/components/templates/DoctorTemplate2"));
const DoctorTemplate3 = dynamic(() => import("@/components/templates/DoctorTemplate3"));
const EventTemplate1 = dynamic(() => import("@/components/templates/EventTemplate1"));
const EventTemplate2 = dynamic(() => import("@/components/templates/EventTemplate2"));
const EventTemplate3 = dynamic(() => import("@/components/templates/EventTemplate3"));
const RealEstateTemplate1 = dynamic(() => import("@/components/templates/RealEstateTemplate1"));
const RealEstateTemplate2 = dynamic(() => import("@/components/templates/RealEstateTemplate2"));
const RealEstateTemplate3 = dynamic(() => import("@/components/templates/RealEstateTemplate3"));
const CATemplate1 = dynamic(() => import("@/components/templates/CATemplate1"));
const CATemplate2 = dynamic(() => import("@/components/templates/CATemplate2"));
const CATemplate3 = dynamic(() => import("@/components/templates/CATemplate3"));
const TeacherTemplate1 = dynamic(() => import("@/components/templates/TeacherTemplate1"));
const TeacherTemplate2 = dynamic(() => import("@/components/templates/TeacherTemplate2"));
const TeacherTemplate3 = dynamic(() => import("@/components/templates/TeacherTemplate3"));
const GraphicDesignerTemplate1 = dynamic(() => import("@/components/templates/GraphicDesignerTemplate1"));
const GraphicDesignerTemplate2 = dynamic(() => import("@/components/templates/GraphicDesignerTemplate2"));
const GraphicDesignerTemplate3 = dynamic(() => import("@/components/templates/GraphicDesignerTemplate3"));
const VideoEditorTemplate1 = dynamic(() => import("@/components/templates/VideoEditorTemplate1"));
const VideoEditorTemplate2 = dynamic(() => import("@/components/templates/VideoEditorTemplate2"));
const VideoEditorTemplate3 = dynamic(() => import("@/components/templates/VideoEditorTemplate3"));

// Map template IDs to their components
const templateMap = {
  "portfolio-1": PortfolioTemplate,
  "portfolio-2": PortfolioTemplate2,
  "portfolio-3": PortfolioTemplate3,
  "portfolio-4": PortfolioTemplate4,
  "portfolio-5": PortfolioTemplate5,
  "portfolio-6": PortfolioTemplate6,
  "portfolio-7": PortfolioTemplate7,
  "portfolio-8": PortfolioTemplate8,
  "portfolio-9": PortfolioTemplate9,
  "portfolio-10": PortfolioTemplate10,
  "portfolio-premium": PortfolioTemplatePremium,
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
  "v1": VideoEditorTemplate1,
  "v2": VideoEditorTemplate2,
  "v3": VideoEditorTemplate3,
};

export default function PreviewPage({ params }) {
  const { id } = use(params);
  const { user, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadData = async () => {
      // 0. Primary: Try loading from IndexedDB first
      try {
        const indexedData = await getPreviewData(`tekunik_preview_${id}`);
        if (indexedData && Object.keys(indexedData).length > 0) {
          if (!active) return;
          // console.log("Loaded preview data from IndexedDB:", indexedData);
          setFormData(indexedData);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.error("Failed to read from IndexedDB:", err);
      }

      // 1. Secondary Fallback: Check localStorage
      const localData = localStorage.getItem(`tekunik_preview_${id}`);
      if (localData) {
        try {
          const parsedData = JSON.parse(localData);
          if (parsedData && Object.keys(parsedData).length > 0) {
            if (!active) return;
            // console.log("Loaded preview data from localStorage:", parsedData);
            setFormData(parsedData);
            setLoading(false);
            return;
          }
        } catch (e) {
          console.error("Failed to parse local preview data fallback", e);
        }
      }

      // 2. Tertiary Fallback: Fetch from Database (User's saved templates)
      if (!authLoading) {
        try {
          const res = await fetch("http://localhost:8000/api/templates/my-templates", {
            credentials: "include",
            cache: "no-store",
          });
          if (res.ok) {
            const myTemplates = await res.json();
            const match = myTemplates.find(t => t.templateId === id);
            if (match && match.data && Object.keys(match.data).length > 0) {
              if (!active) return;
              // console.log("Loaded preview data from database:", match.data);
              setFormData(match.data);
            } else {
              console.warn("No valid template data found in database");
            }
          }
        } catch (err) {
          console.error("Error fetching preview from DB", err);
        } finally {
          if (active) setLoading(false);
        }
      }
    };

    loadData();

    // If auth is loading, set up a safety timeout to stop loading spinner
    let authTimer;
    if (authLoading) {
      authTimer = setTimeout(() => {
        if (active && !formData) setLoading(false);
      }, 3000);
    }

    // 3. Real-time Subscription: Listen for active edits via BroadcastChannel
    const previewChannel = new BroadcastChannel("template_preview_channel");

    previewChannel.onmessage = (event) => {
      const { id: incomingId, data } = event.data;
      if (incomingId === id && data && Object.keys(data).length > 0) {
        // console.log("Received updated data via BroadcastChannel:", data);
        setFormData(data);
      }
    };

    return () => {
      active = false;
      if (authTimer) clearTimeout(authTimer);
      previewChannel.close();
    };
  }, [id, authLoading]);

  // Bypass authLoading if we already have formData from localStorage
  if ((loading && !formData) || (!formData && authLoading)) return <div className="p-10 text-center text-white bg-slate-950 min-h-screen">Loading Preview...</div>;

  if (!formData) return (
    <div className="p-10 text-center text-white bg-slate-950 min-h-screen">
      <h1 className="text-2xl font-bold">No preview data found.</h1>
      <p className="mt-2 text-slate-400">Please go back to the editor and click "Full Preview" again.</p>
    </div>
  );

  const PreviewComponent = templateMap[id];

  if (!PreviewComponent) return <div className="p-10 text-center">Template not found.</div>;

  return (
    <div className="min-h-screen bg-white">
      <PreviewComponent data={formData} />
    </div>
  );
}
