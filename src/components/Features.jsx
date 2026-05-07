import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Trash2, Droplet, Zap, Cone, ShieldAlert } from 'lucide-react';

const features = [
  {
    title: 'Potholes & Roads',
    description: 'Report dangerous potholes or damaged road surfaces for quick municipal repair.',
    icon: <AlertTriangle className="w-6 h-6 text-orange-400" />,
    color: 'border-orange-500/30 hover:border-orange-500/60',
    bg: 'bg-orange-500/10'
  },
  {
    title: 'Garbage Overflow',
    description: 'Flag uncollected trash or illegal dumping to keep neighborhoods clean.',
    icon: <Trash2 className="w-6 h-6 text-green-400" />,
    color: 'border-green-500/30 hover:border-green-500/60',
    bg: 'bg-green-500/10'
  },
  {
    title: 'Water Leakage',
    description: 'Alert authorities about burst pipes or massive leaks to prevent water waste.',
    icon: <Droplet className="w-6 h-6 text-blue-400" />,
    color: 'border-blue-500/30 hover:border-blue-500/60',
    bg: 'bg-blue-500/10'
  },
  {
    title: 'Electricity Outages',
    description: 'Report malfunctioning streetlights or area-wide power outages instantly.',
    icon: <Zap className="w-6 h-6 text-yellow-400" />,
    color: 'border-yellow-500/30 hover:border-yellow-500/60',
    bg: 'bg-yellow-500/10'
  },
  {
    title: 'Illegal Road Occupation',
    description: 'Notify traffic control of unauthorized encroachments causing congestion.',
    icon: <Cone className="w-6 h-6 text-red-400" />,
    color: 'border-red-500/30 hover:border-red-500/60',
    bg: 'bg-red-500/10'
  },
  {
    title: 'Unsafe Construction',
    description: 'Report hazardous building activities that violate safety regulations.',
    icon: <ShieldAlert className="w-6 h-6 text-purple-400" />,
    color: 'border-purple-500/30 hover:border-purple-500/60',
    bg: 'bg-purple-500/10'
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">What You Can <span className="text-gradient">Report</span></h2>
          <p className="text-gray-400 text-lg">
            CivicEye covers a wide range of urban infrastructure issues. Your reports are directly routed to the responsible civic departments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-card p-8 rounded-2xl border-t ${feature.color} group relative overflow-hidden`}
            >
              <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full ${feature.bg} blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>
              
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-xl ${feature.bg} flex items-center justify-center mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
