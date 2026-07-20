import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiFetch } from '../api/client';
import { projectsData } from '../data/projectsData';
import { skillsCategories } from '../data/skillsData';
import { educationData, certificationsData } from '../data/timelineData';
import { servicesData } from '../data/servicesData';
import { testimonialsData } from '../data/testimonialsData';

const PortfolioContext = createContext();

const defaultContent = {
  hero: {
    name: 'ANIKET SINGH',
    subtitle: 'FULL STACK WEB DEVELOPER & DATA ANALYST',
    typingTexts: [
      'RAG AI Applications',
      'Interactive Data Dashboards',
      'Full-Stack Web Platforms',
      'Machine Learning Pipelines'
    ],
    description: 'MCA student with a passion for shipping real products. I turn raw data into interactive dashboards, business problems into AI solutions, and ideas into modern web experiences.',
    profileImage: 'photo.jpg',
    statusBadge: 'Available for Roles & Internships'
  },
  projects: projectsData,
  skills: skillsCategories,
  timeline: { education: educationData, certifications: certificationsData },
  services: servicesData,
  testimonials: testimonialsData,
  contact: {
    email: 'singh.ani2911@gmail.com',
    phone: '+91 83819 51053',
    location: 'India',
    github: 'https://github.com/ani-1129',
    linkedin: 'https://linkedin.com/in/aniket-singh-185770291',
    leetcode: 'https://leetcode.com/u/ani-1129/'
  },
  resume: { fileUrl: 'resume.pdf', fileName: 'resume.pdf' },
  theme: { accentColor: '#00E5FF', darkBgColor: '#05070D', cardBgColor: '#111827', fontFamily: 'Sora' }
};

export function PortfolioProvider({ children }) {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);
  const [livePreview, setLivePreview] = useState(null);

  const fetchContent = async () => {
    try {
      const data = await apiFetch('/content');
      if (data && data.hero) {
        let parsedTimeline = defaultContent.timeline;
        if (data.timeline) {
          if (Array.isArray(data.timeline)) {
            parsedTimeline = {
              education: data.timeline.filter(t => t.type === 'education'),
              certifications: data.timeline.filter(t => t.type === 'certification')
            };
          } else if (typeof data.timeline === 'object') {
            parsedTimeline = data.timeline;
          }
        }

        setContent({
          hero: data.hero || defaultContent.hero,
          navbar: data.navbar || defaultContent.navbar,
          about: data.about || defaultContent.about,
          projects: (data.projects && Array.isArray(data.projects)) ? data.projects : defaultContent.projects,
          skills: (data.skills && Array.isArray(data.skills)) ? data.skills : defaultContent.skills,
          stats: (data.stats && Array.isArray(data.stats)) ? data.stats : defaultContent.stats,
          timeline: parsedTimeline,
          services: (data.services && Array.isArray(data.services)) ? data.services : defaultContent.services,
          testimonials: (data.testimonials && Array.isArray(data.testimonials)) ? data.testimonials : defaultContent.testimonials,
          contact: data.contact || defaultContent.contact,
          resume: data.resume || defaultContent.resume,
          theme: data.theme || defaultContent.theme
        });
      }
    } catch (err) {
      console.log('⚡ PortfolioContext fallback to default content.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const activeData = livePreview || content;

  // Apply Theme CSS Variables dynamically in Real Time!
  useEffect(() => {
    if (activeData.theme) {
      const root = document.documentElement;
      if (activeData.theme.accentColor) {
        root.style.setProperty('--accent-color', activeData.theme.accentColor);
      }
      if (activeData.theme.darkBgColor) {
        root.style.setProperty('--dark-bg', activeData.theme.darkBgColor);
      }
      if (activeData.theme.cardBgColor) {
        root.style.setProperty('--card-bg', activeData.theme.cardBgColor);
      }
      if (activeData.theme.fontFamily) {
        root.style.setProperty('--font-family', `'${activeData.theme.fontFamily}', sans-serif`);
      }
    }
  }, [activeData.theme]);

  const updatePreview = (partialData) => {
    setLivePreview(prev => ({
      ...content,
      ...prev,
      ...partialData
    }));
  };

  const clearPreview = () => setLivePreview(null);

  return (
    <PortfolioContext.Provider
      value={{
        content: activeData,
        loading,
        refetch: fetchContent,
        updatePreview,
        clearPreview,
        isLivePreview: !!livePreview
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}
