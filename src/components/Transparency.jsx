import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, BarChart3 } from 'lucide-react';

const Transparency = () => {
  return (
    <section id="transparency" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Built on <span className="text-gradient">Trust & Transparency</span></h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We believe a smart city is an open city. CivicEye bridges the gap between citizens and government by making infrastructure maintenance transparent and accountable.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-1 bg-primary/20 p-2 rounded-lg h-fit">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Government Accountability</h4>
                  <p className="text-gray-400">All reports are public. Track which departments are responding and hold authorities accountable for resolution times.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="mt-1 bg-accent/20 p-2 rounded-lg h-fit">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Citizen Engagement</h4>
                  <p className="text-gray-400">Upvote issues reported by neighbors to increase their priority. Collaborate to build a better community.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 bg-secondary/20 p-2 rounded-lg h-fit">
                  <BarChart3 className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Open Data Access</h4>
                  <p className="text-gray-400">Researchers and urban planners can access anonymized civic data to design smarter, resilient infrastructure.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px]"
          >
            {/* Abstract UI representation of data/transparency */}
            <div className="absolute inset-0 glass-card rounded-2xl p-8 border border-white/10 flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <h3 className="font-bold">City Performance Dashboard</h3>
                <span className="text-xs text-secondary bg-secondary/20 px-2 py-1 rounded">Live Data</span>
              </div>
              
              <div className="flex-1 flex gap-4">
                {/* Bar chart mockup */}
                <div className="flex-1 flex items-end gap-2 h-full pb-4 border-b border-white/5">
                  {[40, 70, 45, 90, 65, 80].map((height, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${height}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="flex-1 bg-gradient-to-t from-primary/50 to-primary rounded-t-sm"
                    ></motion.div>
                  ))}
                </div>
              </div>
              
              <div className="h-1/3 grid grid-cols-2 gap-4">
                 <div className="bg-surface/50 rounded-lg p-4 flex flex-col justify-center">
                    <span className="text-sm text-gray-400">Budget Allocated</span>
                    <span className="text-xl font-bold text-green-400">$4.2M</span>
                 </div>
                 <div className="bg-surface/50 rounded-lg p-4 flex flex-col justify-center">
                    <span className="text-sm text-gray-400">Contractors Active</span>
                    <span className="text-xl font-bold text-blue-400">142</span>
                 </div>
              </div>

            </div>
            
            {/* Decorative background elements */}
            <div className="absolute -z-10 -right-10 -bottom-10 w-64 h-64 bg-accent/20 blur-[80px] rounded-full"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Transparency;
