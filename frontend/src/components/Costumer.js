"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

export default function Costumer() {
  const stats = [
    { label: "Happy Customers", value: 89, suffix: "+" },
    { label: "Projects Delivered", value: 150, suffix: "+" },
    { label: "Templates", value: 36, suffix: "+" },
    { label: "Countries", value: 22, suffix: "+" }
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);
    }
  }, [isInView, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const duration = 1500; // ms
    const interval = 20;
    const steps = duration / interval;
    const increments = stats.map((s) => s.value / steps);

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep += 1;
      setCounts((prev) => prev.map((c, i) => {
        const next = c + increments[i];
        if (currentStep >= steps) return stats[i].value;
        return Math.min(stats[i].value, Math.round(next));
      }));
      if (currentStep >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [hasStarted]);

  return (
    <section
      ref={sectionRef}
      id="costumer-section"
      className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 text-white py-12"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">We help teams ship faster</h2>
          <p className="mt-2 text-slate-300 max-w-2xl mx-auto">Our customers trust us to build modern digital experiences quickly and reliably.</p>
        </div>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          {stats.map((stat, idx) => (
            <div key={stat.label} className="bg-white/10 border border-white/10 rounded-2xl p-4 text-center backdrop-blur">
              <p className="text-4xl font-bold bg-gradient-to-r from-indigo-300 via-violet-200 to-fuchsia-200 bg-clip-text text-transparent">{counts[idx]}{stat.suffix}</p>
              <p className="mt-2 text-sm text-slate-200">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
