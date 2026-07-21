import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';
import {
  User, Hero, Navbar, About, Stats, Skill, Project, Experience, Timeline, Service, Testimonial, ContactInfo, Message, Resume, Seo, Theme, Media
} from '../models/schemas.js';

// Define a simple schema to hold the entire store object
const StoreSchema = new mongoose.Schema({
  data: { type: mongoose.Schema.Types.Mixed }
});
const Store = mongoose.model('Store', StoreSchema);

import { projectsData } from '../../src/data/projectsData.js';
import { skillsCategories } from '../../src/data/skillsData.js';
import { educationData, certificationsData } from '../../src/data/timelineData.js';
import { servicesData } from '../../src/data/servicesData.js';
import { testimonialsData } from '../../src/data/testimonialsData.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'aniket_portfolio_secret_key_2026';
const DB_FILE = path.join(process.cwd(), 'server', 'db-store.json');

// Default Content Setup
const initialStore = {
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
  navbar: {
    logoText: 'Aniket.Singh',
    menuItems: [
      { label: 'Home', href: '#hero', order: 1 },
      { label: 'About', href: '#about', order: 2 },
      { label: 'Skills', href: '#skills', order: 3 },
      { label: 'Projects', href: '#projects', order: 4 },
      { label: 'Timeline', href: '#timeline', order: 5 },
      { label: 'Services', href: '#services', order: 6 },
      { label: 'Contact', href: '#contact', order: 7 }
    ],
    resumeBtnText: 'Resume'
  },
  about: {
    heading: 'Driven by Data, Powered by Code',
    biography: [
      "I'm Aniket Singh, an MCA student building at the intersection of data analytics, web development, and AI engineering.",
      "My technical core spans Python, Java, SQL, and JavaScript, with hands-on experience deploying production backend microservices."
    ],
    checklist: [
      "Responsive Websites",
      "AI Applications & RAG",
      "Dashboard Development",
      "API Systems & Auth",
      "Database Architecture"
    ]
  },
  stats: [
    { _id: 's1', num: '15+', label: 'Projects Completed', desc: 'AI Platforms, Web Apps & ML Dashboards', icon: 'FolderGit2' },
    { _id: 's2', num: '300+', label: 'LeetCode Solved', desc: 'Data Structures & Algorithmic Logic', icon: 'Code2' },
    { _id: 's3', num: '10+', label: 'Technologies', desc: 'Python, React, FastAPI, SQL, RAG, Docker', icon: 'Layers' },
    { _id: 's4', num: '7.74', label: 'MCA CGPA', desc: 'Software Engineering & Cloud Focus', icon: 'GraduationCap' }
  ],
  projects: [...projectsData.map(p => ({ ...p, _id: p._id || p.id || 'proj_' + Date.now() }))],
  skills: skillsCategories.flatMap(c => c.skills.map(s => ({ ...s, category: c.id, _id: s.name }))),
  timeline: {
    education: [...educationData.map(e => ({ ...e, _id: e.title }))],
    certifications: [...certificationsData.map(c => ({ ...c, _id: c.title }))]
  },
  services: [...servicesData.map(s => ({ ...s, _id: s.id }))],
  testimonials: [...testimonialsData.map(t => ({ ...t, _id: 'test_' + t.id }))],
  contact: {
    email: 'singh.ani2911@gmail.com',
    phone: '+91 83819 51053',
    location: 'India',
    github: 'https://github.com/ani-1129',
    linkedin: 'https://linkedin.com/in/aniket-singh-185770291',
    leetcode: 'https://leetcode.com/u/ani-1129/'
  },
  messages: [],
  resume: { fileUrl: 'resume.pdf', fileName: 'resume.pdf', version: '1.0' },
  seo: {
    metaTitle: 'Aniket Singh — Full Stack Developer & Data Analyst',
    metaDescription: 'MCA Student, Full Stack Developer, Data Analyst & AI Enthusiast.',
    keywords: 'Aniket Singh, Portfolio, Web Developer, Data Analyst, React, FastAPI',
    ogImage: 'photo.jpg'
  },
  theme: {
    accentColor: '#6366F1',
    darkBgColor: '#07090E',
    cardBgColor: '#0F141C',
    fontFamily: 'Sora',
    cursorStyle: 'spotlight'
  }
};

// Load or Initialize Store on Disk
let memoryStore = { ...initialStore };
if (fs.existsSync(DB_FILE)) {
  try {
    const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
    memoryStore = JSON.parse(fileContent);
    // Ensure all projects have an _id
    if (memoryStore.projects && Array.isArray(memoryStore.projects)) {
      memoryStore.projects = memoryStore.projects.map(p => ({ ...p, _id: p._id || p.id || 'proj_' + Date.now() }));
    }
    // Patch existing relative /uploads to absolute URLs for Cloudflare frontend
    const fixUrls = (obj) => {
      if (Array.isArray(obj)) return obj.map(fixUrls);
      if (obj && typeof obj === 'object') {
        const newObj = {};
        for (const key in obj) {
          if (typeof obj[key] === 'string' && obj[key].startsWith('/uploads/')) {
            newObj[key] = `https://portfolio-bcwq.onrender.com${obj[key]}`;
          } else {
            newObj[key] = fixUrls(obj[key]);
          }
        }
        return newObj;
      }
      return obj;
    };
    memoryStore = fixUrls(memoryStore);

    console.log('📂 Loaded existing DB store from disk.');
  } catch (err) {
    console.log('Initializing fresh store.');
  }
} else {
  fs.writeFileSync(DB_FILE, JSON.stringify(initialStore, null, 2));
}

// Function to load store from MongoDB
export async function loadStoreFromMongo() {
  if (mongoose.connection.readyState >= 1) {
    try {
      const storeDoc = await Store.findOne();
      if (storeDoc && storeDoc.data) {
        memoryStore = storeDoc.data;
        console.log('📂 Loaded existing DB store from MongoDB.');
        // Update local file just in case
        fs.writeFileSync(DB_FILE, JSON.stringify(memoryStore, null, 2));
      }
    } catch (err) {
      console.error('Failed to load store from MongoDB:', err);
    }
  }
}

function saveStoreToDisk() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(memoryStore, null, 2));
    if (mongoose.connection.readyState >= 1) {
      Store.findOneAndUpdate({}, { data: memoryStore }, { upsert: true }).catch(err => {
        console.error('Failed to save to MongoDB:', err);
      });
    }
  } catch (err) {
    console.error('Failed to save store to disk:', err);
  }
}

// ─── AUDIT LOG ───────────────────────────────────────────────
const AUDIT_LOG_FILE = path.join(process.cwd(), 'server', 'audit.log');
function auditLog(action, details, user = 'system') {
  const entry = `[${new Date().toISOString()}] [${user}] ${action}: ${typeof details === 'string' ? details : JSON.stringify(details)}\n`;
  try { fs.appendFileSync(AUDIT_LOG_FILE, entry); } catch (e) { /* ignore */ }
}

// ─── DYNAMIC STATS COMPUTATION ───────────────────────────────
// Recalculates derived statistics from live project data.
// Called automatically after project create/update/delete.
function recalculateDynamicStats() {
  const projects = memoryStore.projects || [];
  const publishedProjects = projects.filter(p => p.published !== false);
  const projectCount = publishedProjects.length;

  // Collect unique technologies from all project tags
  const allTechs = new Set();
  publishedProjects.forEach(p => {
    if (p.tags && Array.isArray(p.tags)) {
      p.tags.forEach(t => allTechs.add(t.trim()));
    }
  });
  const techCount = allTechs.size;

  // Update the stats array — find and update the specific counters
  if (memoryStore.stats && Array.isArray(memoryStore.stats)) {
    memoryStore.stats = memoryStore.stats.map(s => {
      if (s.label && s.label.toLowerCase().includes('projects completed')) {
        return { ...s, num: `${projectCount}+` };
      }
      if (s.label && s.label.toLowerCase().includes('technologies')) {
        return { ...s, num: `${techCount}+` };
      }
      return s;
    });
  }
  saveStoreToDisk();
}

// ─── INPUT SANITIZATION ──────────────────────────────────────
function sanitize(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/javascript:/gi, '').replace(/on\w+=/gi, '');
}
function sanitizeObject(obj) {
  if (typeof obj === 'string') return sanitize(obj);
  if (Array.isArray(obj)) return obj.map(sanitizeObject);
  if (obj && typeof obj === 'object') {
    const cleaned = {};
    for (const key of Object.keys(obj)) {
      if (key.startsWith('$')) continue; // Block MongoDB injection operators
      cleaned[key] = sanitizeObject(obj[key]);
    }
    return cleaned;
  }
  return obj;
}
// Sanitize all incoming request bodies
router.use((req, res, next) => {
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeObject(req.body);
  }
  next();
});

// ─── SECURE MULTER ───────────────────────────────────────────
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
const ALLOWED_RESUME_TYPES = ['application/pdf'];
const ALL_ALLOWED = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_RESUME_TYPES];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate a secure, unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname).toLowerCase();
    const safeName = file.fieldname.replace(/[^a-zA-Z0-9_-]/g, '') + '-' + uniqueSuffix + ext;
    cb(null, safeName);
  }
});

function fileFilter(req, file, cb) {
  if (ALL_ALLOWED.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`File type ${file.mimetype} is not allowed. Allowed: jpg, png, webp, svg, pdf`), false);
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE }
});

// JWT Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
}

// AUTH
router.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'aniket@Sin29') {
    const token = jwt.sign({ userId: 'admin_id', username: 'admin', role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token, user: { id: 'admin_id', username: 'admin', role: 'admin' } });
  }
  res.status(400).json({ message: 'Invalid username or password' });
});

router.post('/auth/delete-verify', async (req, res) => {
  const { password } = req.body;
  if (password === 'delete') {
    return res.json({ success: true });
  }
  res.status(400).json({ message: 'Invalid delete password' });
});

router.get('/auth/me', authenticateToken, async (req, res) => res.json({ user: req.user }));

// CONTENT
router.get('/content', async (req, res) => res.json(memoryStore));

// HERO
router.get('/hero', async (req, res) => res.json(memoryStore.hero));
router.put('/hero', authenticateToken, async (req, res) => {
  memoryStore.hero = { ...memoryStore.hero, ...req.body };
  saveStoreToDisk();
  res.json(memoryStore.hero);
});

// NAVBAR
router.get('/navbar', async (req, res) => res.json(memoryStore.navbar));
router.put('/navbar', authenticateToken, async (req, res) => {
  memoryStore.navbar = { ...memoryStore.navbar, ...req.body };
  saveStoreToDisk();
  res.json(memoryStore.navbar);
});

// ABOUT
router.get('/about', async (req, res) => res.json(memoryStore.about));
router.put('/about', authenticateToken, async (req, res) => {
  memoryStore.about = { ...memoryStore.about, ...req.body };
  saveStoreToDisk();
  res.json(memoryStore.about);
});

// STATS
router.get('/stats', async (req, res) => res.json(memoryStore.stats));
// Dynamic computed stats endpoint
router.get('/stats/dynamic', async (req, res) => {
  const projects = memoryStore.projects || [];
  const publishedProjects = projects.filter(p => p.published !== false);
  const allTechs = new Set();
  publishedProjects.forEach(p => {
    if (p.tags && Array.isArray(p.tags)) {
      p.tags.forEach(t => allTechs.add(t.trim()));
    }
  });
  res.json({
    projectCount: publishedProjects.length,
    techCount: allTechs.size,
    technologies: [...allTechs]
  });
});
router.put('/stats', authenticateToken, async (req, res) => {
  memoryStore.stats = req.body;
  saveStoreToDisk();
  auditLog('STATS_UPDATE', 'Stats manually updated', req.user?.username);
  res.json(memoryStore.stats);
});

// PROJECTS
router.get('/projects', async (req, res) => res.json(memoryStore.projects));
router.post('/projects', authenticateToken, async (req, res) => {
  const newP = { ...req.body, _id: 'proj_' + Date.now() };
  memoryStore.projects.unshift(newP);
  recalculateDynamicStats();
  auditLog('PROJECT_CREATE', newP.title, req.user?.username);
  res.json(newP);
});
router.put('/projects/:id', authenticateToken, async (req, res) => {
  const idx = memoryStore.projects.findIndex(p => p._id === req.params.id || p.id === req.params.id);
  if (idx !== -1) memoryStore.projects[idx] = { ...memoryStore.projects[idx], ...req.body };
  recalculateDynamicStats();
  auditLog('PROJECT_UPDATE', req.params.id, req.user?.username);
  res.json(memoryStore.projects[idx] || req.body);
});
router.delete('/projects/:id', authenticateToken, async (req, res) => {
  const id = req.params.id;
  const deleted = memoryStore.projects.find(p => (p._id || p.id) === id);
  const before = memoryStore.projects.length;
  memoryStore.projects = memoryStore.projects.filter(p => {
    const pid = p._id || p.id;
    return pid !== id;
  });
  recalculateDynamicStats();
  auditLog('PROJECT_DELETE', deleted?.title || id, req.user?.username);
  res.json({ message: 'Project deleted', removed: before - memoryStore.projects.length });
});
// Project image upload
router.post('/projects/:id/upload', authenticateToken, upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'cover', maxCount: 1 },
  { name: 'gallery', maxCount: 10 },
  { name: 'architectureDiagram', maxCount: 1 }
]), async (req, res) => {
  try {
    const idx = memoryStore.projects.findIndex(p => p._id === req.params.id || p.id === req.params.id);
    if (idx === -1) return res.status(404).json({ message: 'Project not found' });

    const project = memoryStore.projects[idx];
    const files = req.files || {};

    const toBase64 = (file) => {
      const fileData = fs.readFileSync(file.path);
      const base64String = fileData.toString('base64');
      fs.unlinkSync(file.path); // Remove temp file
      return `data:${file.mimetype};base64,${base64String}`;
    };

    if (files.thumbnail?.[0]) project.image = toBase64(files.thumbnail[0]);
    if (files.cover?.[0]) project.coverImage = toBase64(files.cover[0]);
    if (files.architectureDiagram?.[0]) project.architectureDiagram = toBase64(files.architectureDiagram[0]);
    if (files.gallery) {
      project.galleryImages = (project.galleryImages || []).concat(
        files.gallery.map(f => toBase64(f))
      );
    }

    memoryStore.projects[idx] = project;
    saveStoreToDisk();
    auditLog('PROJECT_IMAGE_UPLOAD', `${project.title}: ${Object.keys(files).join(', ')}`, req.user?.username);
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// SKILLS
router.get('/skills', async (req, res) => res.json(memoryStore.skills));
router.post('/skills', authenticateToken, async (req, res) => {
  const newS = { ...req.body, _id: 'skill_' + Date.now() };
  memoryStore.skills.unshift(newS);
  saveStoreToDisk();
  auditLog('SKILL_CREATE', newS.name, req.user?.username);
  res.json(newS);
});
router.put('/skills/:id', authenticateToken, async (req, res) => {
  const idx = memoryStore.skills.findIndex(s => s._id === req.params.id || s.name === req.params.id);
  if (idx !== -1) memoryStore.skills[idx] = { ...memoryStore.skills[idx], ...req.body };
  saveStoreToDisk();
  auditLog('SKILL_UPDATE', req.params.id, req.user?.username);
  res.json(memoryStore.skills[idx] || req.body);
});
router.delete('/skills/:id', authenticateToken, async (req, res) => {
  memoryStore.skills = memoryStore.skills.filter(s => s._id !== req.params.id && s.name !== req.params.id);
  saveStoreToDisk();
  auditLog('SKILL_DELETE', req.params.id, req.user?.username);
  res.json({ message: 'Skill deleted' });
});

// TIMELINE
router.get('/timeline', async (req, res) => res.json(memoryStore.timeline));
router.put('/timeline', authenticateToken, async (req, res) => {
  memoryStore.timeline = req.body;
  saveStoreToDisk();
  auditLog('TIMELINE_UPDATE', 'Timeline updated', req.user?.username);
  res.json(memoryStore.timeline);
});

// SERVICES
router.get('/services', async (req, res) => res.json(memoryStore.services));
router.put('/services', authenticateToken, async (req, res) => {
  memoryStore.services = req.body;
  saveStoreToDisk();
  auditLog('SERVICES_UPDATE', 'Services updated', req.user?.username);
  res.json(memoryStore.services);
});

// TESTIMONIALS
router.get('/testimonials', async (req, res) => res.json(memoryStore.testimonials));
router.put('/testimonials', authenticateToken, async (req, res) => {
  memoryStore.testimonials = req.body;
  saveStoreToDisk();
  auditLog('TESTIMONIALS_UPDATE', `${req.body?.length || 0} testimonials`, req.user?.username);
  res.json(memoryStore.testimonials);
});

// CONTACT INFO
router.get('/contact', async (req, res) => res.json(memoryStore.contact));
router.put('/contact', authenticateToken, async (req, res) => {
  memoryStore.contact = { ...memoryStore.contact, ...req.body };
  saveStoreToDisk();
  res.json(memoryStore.contact);
});

// MESSAGES
router.post('/messages', async (req, res) => {
  const newMsg = { ...req.body, _id: 'msg_' + Date.now(), createdAt: new Date() };
  memoryStore.messages.unshift(newMsg);
  saveStoreToDisk();
  res.json({ message: 'Message sent successfully', id: newMsg._id });
});
router.get('/messages', authenticateToken, async (req, res) => res.json(memoryStore.messages));
router.put('/messages/:id/read', authenticateToken, async (req, res) => {
  const msg = memoryStore.messages.find(m => m._id === req.params.id);
  if (msg) msg.isRead = true;
  saveStoreToDisk();
  res.json(msg || { isRead: true });
});
router.delete('/messages/:id', authenticateToken, async (req, res) => {
  memoryStore.messages = memoryStore.messages.filter(m => m._id !== req.params.id);
  saveStoreToDisk();
  res.json({ message: 'Message deleted' });
});

// RESUME
router.get('/resume', async (req, res) => res.json(memoryStore.resume));
router.put('/resume', authenticateToken, async (req, res) => {
  memoryStore.resume = { ...memoryStore.resume, ...req.body };
  saveStoreToDisk();
  res.json(memoryStore.resume);
});

// SEO
router.get('/seo', async (req, res) => res.json(memoryStore.seo));
router.put('/seo', authenticateToken, async (req, res) => {
  memoryStore.seo = { ...memoryStore.seo, ...req.body };
  saveStoreToDisk();
  res.json(memoryStore.seo);
});

// THEME
router.get('/theme', async (req, res) => res.json(memoryStore.theme));
router.put('/theme', authenticateToken, async (req, res) => {
  memoryStore.theme = { ...memoryStore.theme, ...req.body };
  saveStoreToDisk();
  res.json(memoryStore.theme);
});

// MEDIA (secured with auth)
router.post('/media/upload', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file provided' });
    
    // Read file, convert to Base64 data URI, then delete the temp file
    const fileData = fs.readFileSync(req.file.path);
    const base64String = fileData.toString('base64');
    const url = `data:${req.file.mimetype};base64,${base64String}`;
    
    // Attempt to delete local file to save disk space
    try { fs.unlinkSync(req.file.path); } catch(e) {}
    
    const media = {
      _id: 'media_' + Date.now(),
      fileName: req.file.originalname,
      url,
      mimeType: req.file.mimetype,
      size: req.file.size
    };
    if (!memoryStore.media) memoryStore.media = [];
    memoryStore.media.unshift(media);
    saveStoreToDisk();
    auditLog('MEDIA_UPLOAD', media.fileName, req.user?.username);
    res.json(media);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/media', async (req, res) => res.json(memoryStore.media || []));

// BACKUP
router.get('/backup/export', authenticateToken, async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', 'attachment; filename=portfolio-backup.json');
  res.json(memoryStore);
});

export default router;
