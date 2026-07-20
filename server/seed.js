import bcrypt from 'bcryptjs';
import { connectDB } from './db.js';
import {
  User, Hero, Navbar, About, Stats, Skill, Project, Timeline, Service, Testimonial, ContactInfo, Resume, Seo, Theme
} from './models/schemas.js';

import { projectsData } from '../src/data/projectsData.js';
import { skillsCategories } from '../src/data/skillsData.js';
import { educationData, certificationsData } from '../src/data/timelineData.js';
import { servicesData } from '../src/data/servicesData.js';
import { testimonialsData } from '../src/data/testimonialsData.js';

export async function seedDatabase() {
  await connectDB();

  try {
    // 1. Admin User
    const existingUser = await User.findOne({ username: 'admin' });
    if (!existingUser) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash('admin123', salt);
      await User.create({
        username: 'admin',
        email: 'admin@aniketsingh.dev',
        passwordHash,
        role: 'admin'
      });
      console.log('👤 Admin user seeded: admin / admin123');
    }

    // 2. Hero
    const heroCount = await Hero.countDocuments();
    if (heroCount === 0) {
      await Hero.create({
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
      });
      console.log('🚀 Hero section seeded.');
    }

    // 3. Navbar
    const navCount = await Navbar.countDocuments();
    if (navCount === 0) {
      await Navbar.create({
        logoText: 'Aniket.Singh',
        menuItems: [
          { label: 'Home', href: '#hero', order: 1 },
          { label: 'About', href: '#about', order: 2 },
          { label: 'Skills', href: '#skills', order: 3 },
          { label: 'Projects', href: '#projects', order: 4 },
          { label: 'Timeline', href: '#timeline', order: 5 },
          { label: 'Services', href: '#services', order: 6 },
          { label: 'Contact', href: '#contact', order: 7 }
        ]
      });
      console.log('📌 Navbar seeded.');
    }

    // 4. Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      for (let idx = 0; idx < projectsData.length; idx++) {
        const p = projectsData[idx];
        await Project.create({
          ...p,
          order: idx
        });
      }
      console.log(`⚡ ${projectsData.length} projects seeded.`);
    }

    // 5. Skills
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      let orderIndex = 0;
      for (const cat of skillsCategories) {
        for (const s of cat.skills) {
          await Skill.create({
            name: s.name,
            category: cat.id,
            level: s.level,
            icon: s.icon,
            tag: s.tag,
            order: orderIndex++
          });
        }
      }
      console.log('🛠️ Skills matrix seeded.');
    }

    // 6. Timeline (Education & Certs)
    const timelineCount = await Timeline.countDocuments();
    if (timelineCount === 0) {
      let orderIndex = 0;
      for (const edu of educationData) {
        await Timeline.create({
          type: 'education',
          period: edu.period,
          title: edu.title,
          institution: edu.institution,
          grade: edu.grade,
          badge: edu.badge,
          details: edu.details,
          courses: edu.courses || [],
          order: orderIndex++
        });
      }
      for (const cert of certificationsData) {
        await Timeline.create({
          type: 'certification',
          title: cert.title,
          issuer: cert.issuer,
          status: cert.status,
          icon: cert.icon,
          link: cert.link,
          order: orderIndex++
        });
      }
      console.log('🎓 Timeline & Certifications seeded.');
    }

    // 7. Services
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      for (let idx = 0; idx < servicesData.length; idx++) {
        const s = servicesData[idx];
        await Service.create({
          title: s.title,
          icon: s.icon,
          description: s.description,
          deliverables: s.deliverables,
          order: idx
        });
      }
      console.log('💼 Services seeded.');
    }

    // 8. Testimonials
    const testCount = await Testimonial.countDocuments();
    if (testCount === 0) {
      for (let idx = 0; idx < testimonialsData.length; idx++) {
        const t = testimonialsData[idx];
        await Testimonial.create({
          name: t.name,
          role: t.role,
          avatar: t.avatar,
          review: t.review,
          order: idx
        });
      }
      console.log('💬 Testimonials seeded.');
    }

    // 9. Contact Info & Resume
    const contactCount = await ContactInfo.countDocuments();
    if (contactCount === 0) {
      await ContactInfo.create({
        email: 'singh.ani2911@gmail.com',
        phone: '+91 83819 51053',
        location: 'India',
        github: 'https://github.com/ani-1129',
        linkedin: 'https://linkedin.com/in/aniket-singh-185770291',
        leetcode: 'https://leetcode.com/u/ani-1129/'
      });
      console.log('📬 Contact info seeded.');
    }

    console.log('✨ Seed complete!');
  } catch (err) {
    console.error('Seed error:', err);
  }
}
