import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, AlertTriangle, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] -z-10"></div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10"></div>

      <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-xs font-medium text-secondary mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            Live Smart City Monitoring
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
            Empower Your City with <span className="text-gradient">CivicEye</span>
          </h1>
          
          <p className="text-lg text-gray-400 mb-8 max-w-xl leading-relaxed">
            Report infrastructure issues instantly. Join thousands of citizens creating smarter, safer, and more transparent communities through real-time civic engagement.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-semibold transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]">
              <AlertTriangle className="w-5 h-5" />
              Report an Issue
            </button>
            <button className="flex items-center justify-center gap-2 glass hover:bg-surface/80 text-white px-8 py-4 rounded-full font-semibold transition-all">
              Explore Map
              <MapPin className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="mt-10 flex items-center gap-4 text-sm text-gray-500">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`w-8 h-8 rounded-full border-2 border-background bg-surface flex items-center justify-center`}>
                   <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="w-full h-full rounded-full object-cover" />
                </div>
              ))}
            </div>
            <p>Joined by 10,000+ active citizens</p>
          </div>
        </motion.div>

        {/* Abstract/Interactive Visual Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative lg:h-[600px] flex items-center justify-center"
        >
          <div className="absolute inset-0 glass-card rounded-2xl p-6 overflow-hidden border border-white/10 shadow-2xl">
            {/* Dashboard Mockup Map Area */}
            <div className="w-full h-full bg-[#0d0d0d] rounded-xl relative overflow-hidden border border-white/5">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="City Map Mockup" className="w-full h-full object-cover opacity-40 mix-blend-luminosity" />
              
              {/* Floating UI Elements */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-10 left-10 glass-card p-3 rounded-xl shadow-lg flex items-center gap-3 border border-white/20"
              >
                <div className="bg-red-500/20 p-2 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">New Report</p>
                  <p className="text-sm font-semibold">Pothole on 5th Ave</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 right-10 glass-card p-3 rounded-xl shadow-lg flex items-center gap-3 border border-white/20"
              >
                <div className="bg-green-500/20 p-2 rounded-lg">
                  <MapPin className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Status Update</p>
                  <p className="text-sm font-semibold text-green-400">Resolved</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
