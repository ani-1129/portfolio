import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { FolderGit2, Code2, Layers, GraduationCap, BarChart2 } from 'lucide-react';

const iconMap = { FolderGit2, Code2, Layers, GraduationCap, BarChart2 };

function CountUp({ target, duration = 1800 }) {
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        const numericPart = parseFloat(target);
        const suffix = target.replace(String(numericPart), '');
        let start = 0;
        const step = numericPart / (duration / 16);
        const tick = () => {
          start = Math.min(start + step, numericPart);
          el.textContent = (Number.isInteger(numericPart) ? Math.floor(start) : start.toFixed(2)) + suffix;
          if (start < numericPart) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{target}</span>;
}

export default function Stats() {
  const { content } = usePortfolio();
  const stats = content.stats || [
    { icon: 'FolderGit2', num: '15+', label: 'Projects Completed', desc: 'AI Platforms, Web Apps & ML Dashboards' },
    { icon: 'Code2', num: '300+', label: 'LeetCode Solved', desc: 'Data Structures & Algorithmic Logic' },
    { icon: 'Layers', num: '10+', label: 'Technologies', desc: 'Python, React, FastAPI, SQL, RAG, Docker' },
    { icon: 'GraduationCap', num: '7.74', label: 'MCA CGPA', desc: 'Software Engineering & Cloud Focus' }
  ];

  return (
    <section className="relative z-20 -mt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const IconComp = iconMap[stat.icon] || BarChart2;
          return (
            <motion.div
              key={stat.label || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-6 rounded-[20px] overflow-hidden cursor-default"
              style={{
                background: 'rgba(17,24,39,0.7)',
                border: '1px solid rgba(0,255,255,0.08)',
                backdropFilter: 'blur(20px)',
                transition: 'all 0.35s ease'
              }}
              whileHover={{
                borderColor: 'rgba(0,229,255,0.35)',
                y: -4,
                boxShadow: '0 20px 40px -10px rgba(0,229,255,0.2)'
              }}
            >
              {/* Top Icon + Index */}
              <div className="flex items-center justify-between mb-4">
                <div
                  className="p-3 rounded-2xl transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: 'rgba(0,229,255,0.08)',
                    border: '1px solid rgba(0,229,255,0.15)',
                    color: '#00E5FF'
                  }}
                >
                  <IconComp className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-gray-600 group-hover:text-gray-500 transition-colors">
                  //#0{idx + 1}
                </span>
              </div>

              {/* Number */}
              <div
                className="text-3xl sm:text-4xl font-extrabold font-display mb-1 transition-colors duration-300"
                style={{ color: 'white' }}
              >
                <CountUp target={stat.num} />
              </div>

              {/* Label */}
              <div className="text-xs sm:text-sm font-bold text-gray-200 mb-1">{stat.label}</div>

              {/* Desc */}
              <div className="text-[11px] text-gray-500 line-clamp-1">{stat.desc}</div>

              {/* Bottom glow on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                style={{ background: 'linear-gradient(90deg, transparent, #00E5FF, transparent)' }}
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
