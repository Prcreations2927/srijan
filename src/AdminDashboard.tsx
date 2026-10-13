import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, 
  Trash2, 
  LogOut, 
  Plus, 
  Link as LinkIcon,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  X,
  Loader2,
  Users
} from 'lucide-react';

interface ImageData {
  id: number;
  type: 'upload' | 'url';
  value: string;
  originalName?: string;
  size?: number;
  uploadDate: string;
}

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('admin_token'));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [images, setImages] = useState<ImageData[]>([]);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [healthStatus, setHealthStatus] = useState<'checking' | 'ok' | 'error'>('checking');

  const fetchImages = useCallback(async () => {
    try {
      const res = await fetch('/api/images');
      const data = await res.json();
      setImages(data);
    } catch (err) {
      console.error('Failed to fetch images:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Check system health on load
    fetch('/api/health')
      .then(res => res.ok ? setHealthStatus('ok') : setHealthStatus('error'))
      .catch(() => setHealthStatus('error'));

    if (isLoggedIn) {
      fetchImages();
    }
  }, [isLoggedIn, fetchImages]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('admin_token', data.token);
        setIsLoggedIn(true);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Connection error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsLoggedIn(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File is too large! Maximum size is 5MB.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: formData,
      });

      if (res.ok) {
        fetchImages();
      } else if (res.status === 401 || res.status === 403) {
        handleLogout();
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) return;

    try {
      const res = await fetch('/api/images/url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify({ url: imageUrl }),
      });

      if (res.ok) {
        setImageUrl('');
        fetchImages();
      }
    } catch (err) {
      console.error('URL submittal failed:', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    try {
      const res = await fetch(`/api/images/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
      });
      if (res.ok) {
        setImages(prev => prev.filter(img => img.id !== id));
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white p-10 rounded-2xl border border-border shadow-2xl"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-fg text-bg rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users size={32} />
            </div>
            <h1 className="text-3xl font-black tracking-tighter uppercase text-fg">Admin Access</h1>
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className={`w-2 h-2 rounded-full ${healthStatus === 'ok' ? 'bg-green-500 animate-pulse' : healthStatus === 'error' ? 'bg-red-500' : 'bg-gray-300'}`} />
              <p className="text-muted text-[10px] uppercase tracking-widest font-bold">
                {healthStatus === 'ok' ? 'System Online' : healthStatus === 'error' ? 'System Offline' : 'Checking System...'}
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full p-4 bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-fg transition-all text-sm"
                placeholder="Enter username"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full p-4 bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-fg transition-all text-sm"
                placeholder="Enter password"
                required
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl text-xs font-bold">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-fg text-bg py-5 rounded-xl font-black uppercase tracking-[0.2em] transform active:scale-95 transition-all shadow-lg hover:bg-muted text-xs"
            >
              Enter Portal
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <nav className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-fg text-bg rounded-lg flex items-center justify-center font-black">PR</div>
            <span className="font-extrabold tracking-tighter text-xl uppercase">Admin Dashboard</span>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-surface px-4 py-2 rounded-full border border-border hover:bg-red-50 hover:text-red-500 transition-all"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Controls Section */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-border shadow-xl">
              <h2 className="text-xl font-black tracking-tight mb-6 uppercase">Add Image</h2>
              
              <div className="space-y-6">
                {/* File Upload */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted">Upload File</label>
                  <div className="relative group">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="border-2 border-dashed border-border rounded-2xl p-6 flex flex-col items-center justify-center text-center group-hover:border-fg transition-colors bg-surface/50 group-hover:bg-surface">
                      <div className="w-10 h-10 bg-fg text-bg rounded-full flex items-center justify-center mb-3 transform group-hover:scale-110 transition-transform">
                        {uploading ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Click to Upload</p>
                      <p className="text-[8px] text-muted font-bold uppercase tracking-widest">Max 5MB</p>
                    </div>
                  </div>
                </div>

                <div className="relative flex items-center py-4">
                  <div className="flex-grow border-t border-border"></div>
                  <span className="flex-shrink mx-4 text-[10px] text-muted font-bold uppercase tracking-widest">OR</span>
                  <div className="flex-grow border-t border-border"></div>
                </div>

                {/* URL Link */}
                <form onSubmit={handleUrlSubmit} className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted">Connect via Link</label>
                  <div className="flex gap-2">
                    <input 
                      type="url" 
                      value={imageUrl}
                      onChange={e => setImageUrl(e.target.value)}
                      placeholder="Paste image URL..."
                      className="flex-1 p-4 bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-fg transition-all text-[10px] font-bold placeholder:text-muted/50"
                      required
                    />
                    <button 
                      type="submit"
                      className="bg-fg text-bg p-4 rounded-xl hover:bg-muted transition-colors"
                    >
                      <LinkIcon size={18} />
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="bg-fg text-bg p-8 rounded-3xl shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={24} className="text-green-400" />
                <h3 className="text-sm font-black uppercase tracking-widest leading-none">System Sync</h3>
              </div>
              <p className="text-[10px] text-muted-bg leading-relaxed font-bold uppercase tracking-[0.1em]">
                Your changes are reflected instantly on the homepage community section.
              </p>
            </div>
          </div>

          {/* Library Section */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black tracking-tighter uppercase px-2">Community Gallery</h2>
              <div className="px-5 py-2 bg-white border border-border rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                {images.length} Assets
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-32 space-y-4">
                <Loader2 className="animate-spin text-fg" size={48} />
                <p className="text-[10px] font-black uppercase tracking-widest text-muted">Scanning Files...</p>
              </div>
            ) : images.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-40 bg-white border-2 border-border border-dashed rounded-3xl space-y-6">
                <div className="w-16 h-16 bg-surface text-border rounded-full flex items-center justify-center">
                  <ImageIcon size={32} />
                </div>
                <div className="text-center">
                  <p className="text-xs font-black uppercase tracking-widest mb-1">Gallery is Empty</p>
                  <p className="text-[10px] text-muted font-bold uppercase tracking-widest">Start uploading or linking images</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {images.map(img => (
                  <motion.div 
                    layout
                    key={img.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="group bg-white p-3 rounded-2xl border border-border shadow-sm hover:shadow-xl transition-all"
                  >
                    <div className="aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-surface relative group/item">
                      <img src={img.value} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Gallery" />
                      
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity">
                         <button 
                          onClick={() => handleDelete(img.id)}
                          className="w-12 h-12 bg-white text-red-600 rounded-full flex items-center justify-center transform translate-y-4 group-hover/item:translate-y-0 transition-all shadow-2xl hover:scale-110"
                        >
                          <Trash2 size={24} />
                        </button>
                      </div>

                      <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 backdrop-blur-md rounded-md">
                        <span className="text-[8px] font-black uppercase text-white tracking-widest">
                          {img.type === 'upload' ? 'File' : 'Link'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="px-1 flex justify-between items-start">
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-fg/80 truncate max-w-[120px]">
                          {img.type === 'upload' ? img.originalName : 'URL Asset'}
                        </p>
                        <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-muted">
                           {new Date(img.uploadDate).toLocaleDateString()}
                        </p>
                      </div>
                      {img.size && (
                        <span className="text-[8px] font-bold uppercase text-muted">
                          {(img.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
