const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'الاسم مطلوب'],
    trim: true
  },
  contact: {
    type: String,
    required: [true, 'معلومات الاتصال مطلوبة'],
    trim: true
  },
  contactType: {
    type: String,
    enum: ['phone', 'email', 'whatsapp'],
    default: 'phone'
  },
  message: {
    type: String,
    required: [true, 'الرسالة مطلوبة'],
    trim: true,
    minlength: [10, 'الرسالة يجب أن تكون 10 أحرف على الأقل']
  },
  category: {
    type: String,
    enum: ['استفسار', 'شكوى', 'مقترح', 'طلب مساعدة', 'أخرى'],
    default: 'استفسار'
  },
  status: {
    type: String,
    enum: ['جديدة', 'قيد المراجعة', 'تم الرد', 'مغلقة'],
    default: 'جديدة'
  },
  priority: {
    type: String,
    enum: ['عادية', 'مهمة', 'عاجلة'],
    default: 'عادية'
  },
  response: {
    type: String,
    trim: true
  },
  respondedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  respondedAt: {
    type: Date
  },
  location: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for faster queries
messageSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Message', messageSchema);
