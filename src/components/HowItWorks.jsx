import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Send, CheckCircle, Bell } from 'lucide-react';

const steps = [
  {
    icon: <Camera className="w-6 h-6" />,
    title: "1. Capture",
    description: "Take a photo of the issue and let GPS tag the exact location."
  },
  {
    icon: <Send className="w-6 h-6" />,
    title: "2. Report",
    description: "Submit the issue with a brief description and category."
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "3. Action",
    description: "Authorities are notified instantly and work is assigned."
  },
  {
    icon: <Bell className="w-6 h-6" />,
    title: "4. Updates",
    description: "Get real-time push notifications when the issue is resolved."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 relative bg-surface/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">How It <span className="text-gradient">Works</span></h2>
          <p className="text-gray-400 text-lg">
            A seamless experience from spotting an issue to seeing it fixed. Transparency at every step.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-secondary transform -translate-y-1/2 opacity-30 z-0"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-2xl glass-card flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(255,255,255,0.05)] text-primary">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
