const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'عنوان الملف مطلوب'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  url: {
    type: String,
    required: [true, 'رابط الملف مطلوب'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'نوع الملف مطلوب'],
    enum: ['image', 'video', 'youtube', 'document'],
    default: 'image'
  },
  category: {
    type: String,
    enum: ['فعاليات', 'لقاءات', 'مشروعات', 'أخبار', 'أخرى'],
    default: 'أخرى'
  },
  tags: [{
    type: String,
    trim: true
  }],
  fileSize: {
    type: Number
  },
  mimeType: {
    type: String
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for faster queries
mediaSchema.index({ type: 1, uploadedAt: -1 });
mediaSchema.index({ category: 1 });

module.exports = mongoose.model('Media', mediaSchema);
