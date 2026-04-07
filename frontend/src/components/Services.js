"use client";

import { motion } from "framer-motion";

export default function Services() {
  const services = [
    { title: "Custom Website Design", description: "Responsive, modern sites built to match your brand.", icon: "🎨" },
    { title: "Template Customization", description: "Start from a template and get fast custom updates.", icon: "⚙️" },
    { title: "SEO Optimization", description: "Improve search visibility and increase organic traffic.", icon: "🚀" },
    { title: "E-commerce Setup", description: "Launch fast online stores integrated with payments.", icon: "🛒" }
  ];

  return (
    <section id="services" className="max-w-7xl mx-auto px-6 pt-6 pb-12">
      <div className="mb-8 text-center">
        <h2 className="mt-2 text-3xl md:text-4xl font-bold">Services we provide to customers</h2>
        <p className="max-w-2xl mx-auto text-gray-600 mt-2">From beautiful landing pages to full-product websites, we support your project end-to-end.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <motion.article
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -8, scale: 1.06 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group rounded-xl border border-indigo-200 p-8 bg-white shadow-lg shadow-indigo-200/50 hover:shadow-2xl hover:shadow-indigo-300/30 transition-all relative overflow-hidden"
          >

            <div className="text-4xl mb-4 relative z-10">{service.icon}</div>
            <h3 className="font-bold text-xl mb-2 relative z-10 text-slate-900">{service.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-6 relative z-10">{service.description}</p>
            <span className="inline-flex items-center text-indigo-600 font-bold text-sm hover:gap-2 transition-all cursor-pointer">
              Learn more <span className="ml-1">→</span>
            </span>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
