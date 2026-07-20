import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, default: 'admin' },
  createdAt: { type: Date, default: Date.now }
});

const HeroSchema = new mongoose.Schema({
  name: { type: String, default: 'ANIKET SINGH' },
  subtitle: { type: String, default: 'FULL STACK WEB DEVELOPER & DATA ANALYST' },
  typingTexts: [{ type: String }],
  description: { type: String },
  ctaPrimary: { text: String, link: String },
  ctaSecondary: { text: String, link: String },
  profileImage: { type: String, default: 'photo.jpg' },
  statusBadge: { type: String, default: 'Available for Roles & Internships' },
  floatingBadges: [{ label: String, sublabel: String }],
  socialLinks: [{ platform: String, url: String, icon: String }]
});

const NavbarSchema = new mongoose.Schema({
  logoText: { type: String, default: 'Aniket.Singh' },
  menuItems: [{ label: String, href: String, order: Number }],
  resumeBtnText: { type: String, default: 'Resume' },
  visible: { type: Boolean, default: true }
});

const AboutSchema = new mongoose.Schema({
  heading: { type: String, default: 'Driven by Data, Powered by Code' },
  biography: [{ type: String }],
  checklist: [{ type: String }],
  strengths: [{ title: String, desc: String, icon: String }],
  detailModalBio: [{ type: String }],
  contactInfoItems: [{ label: String, value: String }]
});

const StatsSchema = new mongoose.Schema({
  num: { type: String, required: true },
  label: { type: String, required: true },
  desc: { type: String },
  icon: { type: String },
  order: { type: Number, default: 0 }
});

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // frontend, backend, data, ai, database, devops
  level: { type: Number, default: 80 },
  icon: { type: String, default: 'Code' },
  tag: { type: String, default: 'Core' },
  order: { type: Number, default: 0 }
});

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  category: { type: String, default: 'ai' },
  featured: { type: Boolean, default: false },
  num: { type: String },
  status: { type: String, default: 'Completed' },
  published: { type: Boolean, default: true },
  image: { type: String },
  description: { type: String },
  metrics: [{ label: String, value: String }],
  highlights: [{ type: String }],
  tags: [{ type: String }],
  github: { type: String },
  demo: { type: String },
  apiDocs: { type: String },
  order: { type: Number, default: 0 }
});

const ExperienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  duration: { type: String },
  location: { type: String },
  description: { type: String },
  achievements: [{ type: String }],
  skills: [{ type: String }],
  logo: { type: String },
  order: { type: Number, default: 0 }
});

const TimelineSchema = new mongoose.Schema({
  type: { type: String, default: 'education' }, // education, certification
  period: { type: String },
  title: { type: String, required: true },
  institution: { type: String },
  grade: { type: String },
  badge: { type: String },
  details: { type: String },
  courses: [{ type: String }],
  issuer: { type: String },
  status: { type: String },
  icon: { type: String },
  link: { type: String },
  order: { type: Number, default: 0 }
});

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  icon: { type: String, default: 'Layout' },
  description: { type: String },
  deliverables: [{ type: String }],
  price: { type: String },
  order: { type: Number, default: 0 }
});

const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String },
  avatar: { type: String },
  review: { type: String },
  rating: { type: Number, default: 5 },
  order: { type: Number, default: 0 }
});

const ContactInfoSchema = new mongoose.Schema({
  email: { type: String, default: 'singh.ani2911@gmail.com' },
  phone: { type: String, default: '+91 83819 51053' },
  location: { type: String, default: 'India' },
  github: { type: String, default: 'https://github.com/ani-1129' },
  linkedin: { type: String, default: 'https://linkedin.com/in/aniket-singh-185770291' },
  leetcode: { type: String, default: 'https://leetcode.com/u/ani-1129/' }
});

const MessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const ResumeSchema = new mongoose.Schema({
  fileUrl: { type: String, default: 'resume.pdf' },
  fileName: { type: String, default: 'resume.pdf' },
  version: { type: String, default: '1.0' },
  updatedAt: { type: Date, default: Date.now }
});

const SeoSchema = new mongoose.Schema({
  metaTitle: { type: String, default: 'Aniket Singh — Full Stack Developer & Data Analyst' },
  metaDescription: { type: String, default: 'MCA Student, Full Stack Developer, Data Analyst & AI Enthusiast.' },
  keywords: { type: String, default: 'Aniket Singh, Portfolio, Web Developer, Data Analyst, React, FastAPI' },
  ogImage: { type: String, default: 'photo.jpg' },
  analyticsId: { type: String, default: '' }
});

const ThemeSchema = new mongoose.Schema({
  accentColor: { type: String, default: '#3B82F6' },
  darkBgColor: { type: String, default: '#050505' },
  cardBgColor: { type: String, default: '#0E1217' },
  fontFamily: { type: String, default: 'Sora' },
  cursorStyle: { type: String, default: 'spotlight' }
});

const MediaSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  url: { type: String, required: true },
  mimeType: { type: String },
  size: { type: Number },
  uploadedAt: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', UserSchema);
export const Hero = mongoose.model('Hero', HeroSchema);
export const Navbar = mongoose.model('Navbar', NavbarSchema);
export const About = mongoose.model('About', AboutSchema);
export const Stats = mongoose.model('Stats', StatsSchema);
export const Skill = mongoose.model('Skill', SkillSchema);
export const Project = mongoose.model('Project', ProjectSchema);
export const Experience = mongoose.model('Experience', ExperienceSchema);
export const Timeline = mongoose.model('Timeline', TimelineSchema);
export const Service = mongoose.model('Service', ServiceSchema);
export const Testimonial = mongoose.model('Testimonial', TestimonialSchema);
export const ContactInfo = mongoose.model('ContactInfo', ContactInfoSchema);
export const Message = mongoose.model('Message', MessageSchema);
export const Resume = mongoose.model('Resume', ResumeSchema);
export const Seo = mongoose.model('Seo', SeoSchema);
export const Theme = mongoose.model('Theme', ThemeSchema);
export const Media = mongoose.model('Media', MediaSchema);
