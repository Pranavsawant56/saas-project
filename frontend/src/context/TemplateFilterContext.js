"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { templates as staticTemplates } from "@/data/templates";

const TemplateContext = createContext();

export const TemplateProvider = ({ children }) => {
  const [filterType, setFilterType] = useState("");
  const [templates, setTemplates] = useState(staticTemplates);
  const [savedTypes, setSavedTypes] = useState([]);

  // Load from local storage on mount
  useEffect(() => {
    const savedFilter = localStorage.getItem("templateFilter");
    if (savedFilter) {
      setFilterType(savedFilter);
    }

    const savedTemplates = localStorage.getItem("customTemplates");
    if (savedTemplates) {
      try {
        const parsed = JSON.parse(savedTemplates);
        setTemplates([...staticTemplates, ...parsed]);
      } catch (e) {
        console.error("Error parsing custom templates", e);
      }
    }

    const storedSavedTypes = localStorage.getItem("savedTemplateTypes");
    if (storedSavedTypes) {
      try {
        setSavedTypes(JSON.parse(storedSavedTypes));
      } catch (e) {
        console.error("Error parsing saved types", e);
      }
    }
  }, []);

  // Filter Updates
  const updateFilter = (type) => {
    setFilterType(type);
    if (type) {
      localStorage.setItem("templateFilter", type);
      addSavedType(type);
    } else {
      localStorage.removeItem("templateFilter");
    }
  };

  const clearFilter = () => {
    setFilterType("");
    localStorage.removeItem("templateFilter");
  };

  // Saved Types Management
  const addSavedType = (type) => {
    if (!type) return;
    setSavedTypes(prev => {
      const normalized = type.trim();
      if (prev.includes(normalized)) return prev;
      const updated = [normalized, ...prev].slice(0, 5); // Keep last 5
      localStorage.setItem("savedTemplateTypes", JSON.stringify(updated));
      return updated;
    });
  };

  const removeSavedType = (type) => {
    setSavedTypes(prev => {
      const updated = prev.filter(t => t !== type);
      localStorage.setItem("savedTemplateTypes", JSON.stringify(updated));
      return updated;
    });
  };

  // Template Management (keeping it for the record/background)
  const addTemplate = (newTemplate) => {
    const customTemplates = JSON.parse(localStorage.getItem("customTemplates") || "[]");
    const updatedCustom = [...customTemplates, newTemplate];
    localStorage.setItem("customTemplates", JSON.stringify(updatedCustom));
    setTemplates([...staticTemplates, ...updatedCustom]);

    // Automatically filter and save the new type
    if (newTemplate.category) {
      updateFilter(newTemplate.category);
    }
  };

  const deleteTemplate = (id) => {
    const customTemplates = JSON.parse(localStorage.getItem("customTemplates") || "[]");
    const updatedCustom = customTemplates.filter(t => t.id !== id);
    localStorage.setItem("customTemplates", JSON.stringify(updatedCustom));
    setTemplates([...staticTemplates, ...updatedCustom]);
  };

  return (
    <TemplateContext.Provider value={{
      templates,
      filterType,
      updateFilter,
      clearFilter,
      addTemplate,
      deleteTemplate,
      savedTypes,
      removeSavedType
    }}>
      {children}
    </TemplateContext.Provider>
  );
};

export const useTemplates = () => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error("useTemplates must be used within a TemplateProvider");
  }
  return context;
};
