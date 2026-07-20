import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { servicesData as defaultServices } from '../data/servicesData';
import { Sparkles, Layout, BarChart2, Bot, Server, Database, Workflow, Check } from 'lucide-react';

const serviceIconMap = { Layout, BarChart2, Bot, Server, Database, Workflow };

export default function Services() {
  const { content } = usePortfolio();
  const servicesData = Array.isArray(content.services) && content.services.length > 0
    ? content.services : defaultServices;

  return (
    <section id="services" className="py-28 relative overflow-hidden" style={{ background: 'var(--dark-bg, #05070D)' }}>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-64 pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(0,229,255,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="section-label mb-4 mx-auto">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Core Capabilities</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-white mb-4">
            Services &amp; <span className="mint-gradient-text">Solutions</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-500">
            End-to-end software development, data analytics, and AI systems engineered for measurable outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, idx) => {
            const IconComponent = serviceIconMap[service.icon] || Layout;
            return (
              <motion.div
                key={service.id || service._id || idx}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 rounded-[24px] flex flex-col justify-between group cursor-default transition-all duration-300"
                style={{ background: 'rgba(17,24,39,0.65)', border: '1px solid rgba(0,229,255,0.08)', backdropFilter: 'blur(16px)' }}
                whileHover={{ borderColor: 'rgba(0,229,255,0.35)', y: -6, boxShadow: '0 24px 50px rgba(0,229,255,0.12)' }}
              >
                <div>
                  {/* Icon */}
                  <div
                    className="p-3.5 rounded-2xl w-fit mb-6 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.15)', color: '#00E5FF' }}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-white font-display mb-3 transition-colors group-hover:text-[#00E5FF]">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {service.deliverables?.length > 0 && (
                    <div className="space-y-2 pt-4" style={{ borderTop: '1px solid rgba(0,229,255,0.06)' }}>
                      {service.deliverables.map(item => (
                        <div key={item} className="flex items-center gap-2.5 text-xs text-gray-400">
                          <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#00E5FF' }} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Glow Line on Hover */}
                <div className="mt-6 h-px w-full transition-opacity duration-300 opacity-0 group-hover:opacity-100" style={{ background: 'linear-gradient(90deg, transparent, #00E5FF, transparent)' }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
