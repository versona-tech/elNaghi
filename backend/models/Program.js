const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, 'تصنيف البرنامج مطلوب'],
    enum: ['تعليم', 'صحة', 'تشغيل', 'تنمية', 'بنية تحتية', 'خدمات', 'شباب ورياضة', 'ثقافة', 'بيئة', 'أخرى'],
    trim: true
  },
  title: {
    type: String,
    required: [true, 'عنوان المحور مطلوب'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'وصف المحور مطلوب'],
    trim: true
  },
  points: [{
    type: String,
    trim: true
  }],
  icon: {
    type: String,
    trim: true
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  targetAudience: {
    type: String,
    trim: true
  },
  expectedImpact: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for ordering
programSchema.index({ category: 1, order: 1 });

module.exports = mongoose.model('Program', programSchema);
