const express = require('express');
const router = express.Router();
const Media = require('../models/Media');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

// @desc    Get all media
// @route   GET /api/media
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { type, category, page = 1, limit = 20 } = req.query;

    const query = { isPublic: true };
    if (type) query.type = type;
    if (category) query.category = category;

    const media = await Media.find(query)
      .populate('uploadedBy', 'fullName')
      .sort({ uploadedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Media.countDocuments(query);

    res.json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      data: media
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Upload media
// @route   POST /api/media/upload
// @access  Private
router.post('/upload', protect, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'الرجاء اختيار ملف' 
      });
    }

    const { title, description, category, tags, isPublic } = req.body;

    // Determine file type
    let type = 'document';
    if (req.file.mimetype.startsWith('image/')) type = 'image';
    else if (req.file.mimetype.startsWith('video/')) type = 'video';

    const media = await Media.create({
      title: title || req.file.originalname,
      description,
      url: `/uploads/${req.file.filename}`,
      type,
      category,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
      isPublic: isPublic !== 'false',
      uploadedBy: req.user._id
    });

    res.status(201).json({
      success: true,
      message: 'تم رفع الملف بنجاح',
      data: media
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @desc    Update media
// @route   PUT /api/media/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const media = await Media.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!media) {
      return res.status(404).json({ 
        success: false, 
        message: 'الملف غير موجود' 
      });
    }

    res.json({
      success: true,
      message: 'تم تحديث الملف بنجاح',
      data: media
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @desc    Delete media
// @route   DELETE /api/media/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin', 'moderator'), async (req, res) => {
  try {
    const media = await Media.findByIdAndDelete(req.params.id);

    if (!media) {
      return res.status(404).json({ 
        success: false, 
        message: 'الملف غير موجود' 
      });
    }

    // TODO: Delete actual file from filesystem

    res.json({
      success: true,
      message: 'تم حذف الملف بنجاح'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
