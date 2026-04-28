"use client";

import { useState, useEffect, use } from "react";
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

import { useAuth } from "@/context/AuthContext";

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
};

export default function PreviewPage({ params }) {
  const { id } = use(params);
  const { user, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    const userEmail = user?.email || 'guest';

    // 0. Fallback: Check localStorage for temporary preview data from the editor
    const localData = localStorage.getItem(`tekunik_preview_${id}`);
    if (localData) {
      try {
        setFormData(JSON.parse(localData));
        setLoading(false);
      } catch (e) {
        console.error("Failed to parse local preview data", e);
      }
    }

    // 1. Initial Load: Fetch from Database (User's saved templates)
    const fetchFromDB = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/templates/my-templates", {
          credentials: "include",
          cache: "no-store",
        });
        if (res.ok) {
          const myTemplates = await res.json();
          const match = myTemplates.find(t => t.templateId === id);
          if (match) {
            setFormData(match.data);
          }
        }
      } catch (err) {
        console.error("Error fetching preview from DB", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFromDB();

    // 2. Real-time Subscription: Listen for changes via BroadcastChannel
    const previewChannel = new BroadcastChannel("template_preview_channel");

    previewChannel.onmessage = (event) => {
      const { id: incomingId, data } = event.data;
      if (incomingId === id) {
        setFormData(data);
      }
    };

    return () => {
      previewChannel.close();
    };
  }, [id, user, authLoading]);

  if (authLoading || (loading && !formData)) return <div className="p-10 text-center text-white bg-slate-950 min-h-screen">Loading Preview...</div>;

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
