const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'عنوان الفعالية مطلوب'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'وصف الفعالية مطلوب'],
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'تاريخ الفعالية مطلوب']
  },
  endDate: {
    type: Date
  },
  time: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: [true, 'مكان الفعالية مطلوب'],
    trim: true
  },
  locationCoordinates: {
    lat: Number,
    lng: Number
  },
  category: {
    type: String,
    enum: ['لقاء شعبي', 'ندوة', 'زيارة ميدانية', 'اجتماع', 'أخرى'],
    default: 'لقاء شعبي'
  },
  capacity: {
    type: Number
  },
  registrationLink: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  registeredCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for upcoming events
eventSchema.index({ date: 1, isPublished: 1 });

module.exports = mongoose.model('Event', eventSchema);
