require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');

const connectDB = require('./config/database');
const errorHandler = require('./middleware/error');

// Initialize app
const app = express();

// Connect to database
connectDB();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'تم تجاوز الحد الأقصى للطلبات، يرجى المحاولة لاحقاً'
});
app.use('/api/', limiter);

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Compression
app.use(compression());

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/news', require('./routes/news'));
app.use('/api/events', require('./routes/events'));
app.use('/api/program', require('./routes/program'));
app.use('/api/media', require('./routes/media'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'الخادم يعمل بشكل صحيح',
    timestamp: new Date().toISOString()
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'مرحباً بك في API موقع المرشح محمد إبراهيم علي الناغي',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      messages: '/api/messages',
      news: '/api/news',
      events: '/api/events',
      program: '/api/program',
      media: '/api/media'
    }
  });
});

// Error handler (must be last)
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'المسار المطلوب غير موجود'
  });
});

const PORT = process.env.PORT || 5000;

// Start server and keep reference for graceful shutdown
const server = app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║  🚀 الخادم يعمل في وضع ${process.env.NODE_ENV || 'development'}           ║
║  📡 المنفذ: ${PORT}                                      ║
║  🌐 العنوان: http://localhost:${PORT}                   ║
║  📚 API Docs: http://localhost:${PORT}/api               ║
║                                                          ║
║  موقع المرشح محمد إبراهيم علي الناغي                    ║
║  دائرة منية النصر والجمالية - الدقهلية                 ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Unhandled Rejection: ${err && err.message ? err.message : err}`);
  // Close server & exit process (if server defined)
  if (typeof server !== 'undefined' && server.close) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});
