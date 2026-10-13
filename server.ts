import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import multer from 'multer';
import Database from 'better-sqlite3';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const SECRET_KEY = process.env.JWT_SECRET || 'pr-creations-secure-key-2927';

// DB Setup
const db = new Database('metadata.db');
db.exec(`
  CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL, -- 'upload' or 'url'
    value TEXT NOT NULL, -- file path or url
    originalName TEXT,
    size INTEGER,
    uploadDate DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  );
`);

// Create default admin if none exists
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const existingAdmin = db.prepare('SELECT * FROM users WHERE username = ?').get(ADMIN_USERNAME);
if (!existingAdmin) {
  const hashedPassword = bcrypt.hashSync(ADMIN_PASSWORD, 10);
  db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run(ADMIN_USERNAME, hashedPassword);
}

// Multer Setup
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.random().toString(36).substr(2, 9)}${ext}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

async function startServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // Auth Middleware
  const authenticate = (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    try {
      req.user = jwt.verify(token, SECRET_KEY);
      next();
    } catch {
      res.status(403).json({ message: 'Invalid token' });
    }
  };

  // API Routes
  app.get('/api/health', (req, res) => {
    try {
      const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get() as any;
      res.json({ status: 'ok', users: userCount.count });
    } catch (err) {
      res.status(500).json({ status: 'error', message: 'Database unreachable' });
    }
  });

  app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const trimmedUsername = username?.trim();
    const trimmedPassword = password?.trim();
    
    console.log(`[DEBUG] Login attempt for user: "${trimmedUsername}"`);
    
    // Check with lowercase for robustness
    const user = db.prepare('SELECT * FROM users WHERE LOWER(username) = LOWER(?)').get(trimmedUsername) as any;
    
    if (user) {
      console.log(`[DEBUG] User found. Verifying password...`);
      if (bcrypt.compareSync(trimmedPassword, user.password)) {
        console.log(`[DEBUG] Login successful.`);
        const token = jwt.sign({ username: user.username, id: user.id }, SECRET_KEY, { expiresIn: '7d' });
        return res.json({ token, username: user.username });
      } else {
        console.log(`[DEBUG] Password mismatch.`);
      }
    } else {
      console.log(`[DEBUG] User matching "${trimmedUsername}" not found.`);
    }
    
    res.status(401).json({ message: 'Invalid credentials. Please use admin / admin123' });
  });

  app.get('/api/images', (req, res) => {
    const images = db.prepare('SELECT * FROM images ORDER BY uploadDate DESC').all();
    res.json(images);
  });

  app.post('/api/upload', authenticate, upload.single('image') as any, (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    
    const imagePath = `/uploads/${req.file.filename}`;
    const result = db.prepare('INSERT INTO images (type, value, originalName, size) VALUES (?, ?, ?, ?)')
      .run('upload', imagePath, req.file.originalname, req.file.size);
    
    res.json({ id: result.lastInsertRowid, path: imagePath });
  });

  app.post('/api/images/url', authenticate, (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ message: 'URL required' });
    
    const result = db.prepare('INSERT INTO images (type, value) VALUES (?, ?)')
      .run('url', url);
    
    res.json({ id: result.lastInsertRowid, url });
  });

  app.delete('/api/images/:id', authenticate, (req, res) => {
    const { id } = req.params;
    const img = db.prepare('SELECT * FROM images WHERE id = ?').get(id) as any;
    if (!img) return res.status(404).json({ message: 'Image not found' });

    if (img.type === 'upload') {
      const filePath = path.join(__dirname, img.value);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    db.prepare('DELETE FROM images WHERE id = ?').run(id);
    res.json({ message: 'Deleted' });
  });

  app.use('/uploads', express.static(uploadsDir));

  // Vite Integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
