import React, { useState, useEffect, useRef } from 'react';
import { apiFetch } from '../../api/client';
import { usePortfolio } from '../../context/PortfolioContext';
import { Plus, Edit, Trash2, ExternalLink, Github, Star, CheckCircle2, Eye, X, Save, UploadCloud } from 'lucide-react';
import toast from 'react-hot-toast';
import ConfirmModal from '../../components/common/ConfirmModal';

export default function ProjectsEditor() {
  const { refetch } = usePortfolio();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  
  // Confirm Delete State
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, project: null });
  
  // File References
  const fileInputRef = useRef(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);

  const fetchProjects = async () => {
    try {
      const data = await apiFetch('/projects');
      setProjects(data || []);
    } catch (err) {
      console.log('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateNew = () => {
    const newId = 'proj_' + Date.now();
    setEditingProject({
      _id: newId,
      id: newId,
      title: '',
      subtitle: '',
      category: 'ai',
      featured: false,
      num: `0${projects.length + 1}`,
      status: 'Completed',
      published: true,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      description: '',
      metrics: [{ label: 'Metric', value: '1.0' }],
      highlights: ['System architecture highlight'],
      tags: ['Python', 'FastAPI'],
      github: 'https://github.com/ani-1129',
      demo: '',
      apiDocs: ''
    });
    setIsModalOpen(true);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleDelete = async (project) => {
    setDeleteConfirm({ isOpen: true, project });
  };

  const executeDelete = async () => {
    const project = deleteConfirm.project;
    if (!project) return;
    
    const targetId = project._id || project.id;
    if (!targetId) {
      toast.error('Cannot delete: project has no ID');
      setDeleteConfirm({ isOpen: false, project: null });
      return;
    }

    try {
      await apiFetch(`/projects/${targetId}`, { method: 'DELETE' });
      setProjects(prev => prev.filter(p => (p._id || p.id) !== targetId));
      await refetch();
      toast.success('Project deleted successfully');
    } catch (err) {
      toast.error('Delete failed: ' + err.message);
    } finally {
      setDeleteConfirm({ isOpen: false, project: null });
    }
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    setSaving(true);
    const targetId = editingProject._id || editingProject.id;
    try {
      const existing = projects.find(p => (p._id || p.id) === targetId);
      let savedProject = null;
      if (existing) {
        savedProject = await apiFetch(`/projects/${targetId}`, {
          method: 'PUT',
          body: JSON.stringify(editingProject)
        });
      } else {
        savedProject = await apiFetch('/projects', {
          method: 'POST',
          body: JSON.stringify(editingProject)
        });
      }
      
      // Handle Image Uploads if files were selected
      if (thumbnailFile || galleryFiles.length > 0) {
        setUploadingFiles(true);
        toast.loading('Uploading images...', { id: 'upload' });
        
        const formData = new FormData();
        if (thumbnailFile) formData.append('thumbnail', thumbnailFile);
        galleryFiles.forEach(file => formData.append('gallery', file));
        
        const uploadRes = await fetch(`https://portfolio-bcwq.onrender.com/api/projects/${targetId}/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          },
          body: formData
        });
        
        if (!uploadRes.ok) throw new Error('Image upload failed');
        toast.success('Images uploaded!', { id: 'upload' });
      }

      setIsModalOpen(false);
      setThumbnailFile(null);
      setGalleryFiles([]);
      await fetchProjects();
      await refetch();
      toast.success(existing ? 'Project updated' : 'Project created');
    } catch (err) {
      toast.error('Save failed: ' + err.message);
    } finally {
      setSaving(false);
      setUploadingFiles(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h1 className="text-xl font-bold font-display text-white">Projects CMS Manager ({projects.length})</h1>
          <p className="text-xs text-gray-400">Add, edit, reorder, feature, publish, or delete portfolio projects</p>
        </div>
        <button
          onClick={handleCreateNew}
          className="px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all"
          style={{ background: 'linear-gradient(90deg, #00E5FF, #009DFF)', color: '#000', boxShadow: '0 0 20px rgba(0,229,255,0.3)' }}
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => {
          const projId = p._id || p.id;
          return (
            <div key={projId || p.title} className="p-5 rounded-3xl glass-panel flex flex-col justify-between group relative">
              <div>
                <div className="relative h-40 rounded-2xl overflow-hidden mb-4 bg-dark-950">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/70 text-[10px] font-mono text-cyan-primary">
                    {p.num || '01'} // {p.category ? p.category.toUpperCase() : 'AI'}
                  </div>
                  {p.featured && (
                    <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full text-black text-[10px] font-bold" style={{ background: 'linear-gradient(90deg,#00E5FF,#009DFF)', boxShadow: '0 0 12px rgba(0,229,255,0.4)' }}>
                      ★ FEATURED
                    </div>
                  )}
                </div>

                <h3 className="text-base font-bold text-white font-display mb-1 line-clamp-1">{p.title}</h3>
                <p className="text-xs text-gray-400 mb-3 line-clamp-2">{p.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {p.tags?.slice(0, 4).map(t => (
                    <span key={t} className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-gray-300">{t}</span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full`} style={{ background: p.published !== false ? 'rgba(0,229,255,0.1)' : 'rgba(251,191,36,0.1)', color: p.published !== false ? '#00E5FF' : '#fbbf24', border: `1px solid ${p.published !== false ? 'rgba(0,229,255,0.25)' : 'rgba(251,191,36,0.25)'}` }}>
                  {p.published !== false ? 'Published' : 'Draft'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="p-2 rounded-xl bg-white/5 text-gray-300 hover:text-cyan-primary transition-colors"
                    title="Edit Project"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(p)}
                    className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit/Create Modal */}
      {isModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl my-8 p-6 sm:p-8 rounded-3xl bg-[#0E1217] border border-white/10 shadow-2xl max-h-[85vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <h2 className="text-lg font-bold text-white font-display">
                {projects.find(p => (p._id || p.id) === (editingProject._id || editingProject.id)) ? 'Edit Project' : 'Create New Project'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-mono uppercase mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-mono uppercase mb-1">Category</label>
                  <select
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0B0F14] border border-white/10 text-white"
                  >
                    <option value="ai">AI & ML Platforms</option>
                    <option value="dashboards">Data Dashboards</option>
                    <option value="fullstack">Full-Stack Web</option>
                    <option value="cloud">Cloud & CRM</option>
                  </select>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <label className="flex items-center gap-2 cursor-pointer text-gray-300 font-mono">
                    <input
                      type="checkbox"
                      checked={editingProject.featured || false}
                      onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                      className="accent-cyan-primary"
                    />
                    <span>Featured Project</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-gray-300 font-mono">
                    <input
                      type="checkbox"
                      checked={editingProject.published !== false}
                      onChange={(e) => setEditingProject({ ...editingProject, published: e.target.checked })}
                      className="accent-cyan-primary"
                    />
                    <span>Published</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-mono uppercase mb-1">Thumbnail Image</label>
                <div className="flex items-center gap-4">
                  {editingProject.image && !thumbnailFile && (
                    <img src={editingProject.image} alt="Thumbnail Preview" className="h-12 w-12 object-cover rounded-xl" />
                  )}
                  {thumbnailFile && (
                    <div className="h-12 w-12 rounded-xl bg-cyan-primary/20 flex items-center justify-center text-cyan-primary text-[10px] font-bold text-center">
                      New
                    </div>
                  )}
                  <div className="flex-1">
                    <label className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-dashed border-white/20 hover:border-cyan-primary/50 text-gray-400 hover:text-white transition-colors cursor-pointer">
                      <UploadCloud className="w-4 h-4" />
                      <span>{thumbnailFile ? thumbnailFile.name : 'Choose Image...'}</span>
                      <input
                        type="file"
                        accept="image/jpeg, image/png, image/webp"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setThumbnailFile(e.target.files[0]);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-mono uppercase mb-1">Short Description</label>
                <textarea
                  rows={3}
                  value={editingProject.description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-mono uppercase mb-1">Tags (Comma separated)</label>
                <input
                  type="text"
                  value={editingProject.tags ? editingProject.tags.join(', ') : ''}
                  onChange={(e) => setEditingProject({ ...editingProject, tags: e.target.value.split(',').map(t => t.trim()) })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-mono uppercase mb-1">GitHub Link</label>
                  <input
                    type="text"
                    value={editingProject.github || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, github: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-mono uppercase mb-1">Live Demo Link</label>
                  <input
                    type="text"
                    value={editingProject.demo || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, demo: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
              </div>

              {/* IMAGE UPLOADS */}
              <div className="pt-4 border-t border-white/10 mt-4">
                <h4 className="text-white font-bold mb-3 flex items-center gap-2"><UploadCloud className="w-5 h-5 text-mint-400" /> Image Uploads</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 font-mono uppercase mb-1">Project Thumbnail</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setThumbnailFile(e.target.files[0])}
                      className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-mono uppercase mb-1">Gallery Images (Multiple)</label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => setGalleryFiles(Array.from(e.target.files))}
                      className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-gray-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl font-bold text-xs transition-all"
                  style={{ background: 'linear-gradient(90deg, #00E5FF, #009DFF)', color: '#000', boxShadow: '0 0 16px rgba(0,229,255,0.3)' }}
                >
                  {saving ? 'Saving...' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        title="Delete Project"
        message={`Are you sure you want to delete "${deleteConfirm.project?.title}"? This action cannot be undone.`}
        confirmText="Delete Project"
        onConfirm={executeDelete}
        onCancel={() => setDeleteConfirm({ isOpen: false, project: null })}
        requirePassword={true}
      />
    </div>
  );
}
