import React from 'react';
import { motion } from 'framer-motion';

const metrics = [
  { value: "45K+", label: "Issues Resolved" },
  { value: "120K", label: "Active Citizens" },
  { value: "24h", label: "Avg. Response Time" },
  { value: "98%", label: "Resolution Rate" }
];

const ImpactMetrics = () => {
  return (
    <section id="impact" className="py-20 border-y border-white/5 bg-background relative overflow-hidden">
      {/* Background flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6"
            >
              <h4 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
                {metric.value}
              </h4>
              <p className="text-gray-400 font-medium uppercase tracking-wider text-sm">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
