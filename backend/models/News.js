const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'عنوان الخبر مطلوب'],
    trim: true
  },
  body: {
    type: String,
    required: [true, 'محتوى الخبر مطلوب'],
    trim: true
  },
  summary: {
    type: String,
    trim: true,
    maxlength: 200
  },
  category: {
    type: String,
    enum: ['أخبار', 'أنشطة', 'إنجازات', 'مشروعات', 'بيانات'],
    default: 'أخبار'
  },
  mediaUrl: [{
    type: {
      type: String,
      enum: ['image', 'video', 'youtube'],
      default: 'image'
    },
    url: String,
    caption: String
  }],
  tags: [{
    type: String,
    trim: true
  }],
  location: {
    type: String,
    trim: true
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  publishedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
newsSchema.index({ publishedAt: -1, isPublished: 1 });
newsSchema.index({ category: 1 });

module.exports = mongoose.model('News', newsSchema);
