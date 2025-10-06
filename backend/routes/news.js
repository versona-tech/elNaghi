const express = require('express');
const router = express.Router();
const News = require('../models/News');
const { protect, authorize } = require('../middleware/auth');

// @desc    Get all news
// @route   GET /api/news
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, isFeatured, page = 1, limit = 12 } = req.query;

    const query = { isPublished: true };
    if (category) query.category = category;
    if (isFeatured) query.isFeatured = isFeatured === 'true';

    const news = await News.find(query)
      .populate('author', 'fullName')
      .sort({ publishedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await News.countDocuments(query);

    res.json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      data: news
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get single news item
// @route   GET /api/news/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id)
      .populate('author', 'fullName');

    if (!news) {
      return res.status(404).json({ 
        success: false, 
        message: 'الخبر غير موجود' 
      });
    }

    // Increment views
    news.views += 1;
    await news.save();

    res.json({ success: true, data: news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Create news
// @route   POST /api/news
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const newsData = {
      ...req.body,
      author: req.user._id
    };

    const news = await News.create(newsData);

    res.status(201).json({
      success: true,
      message: 'تم إنشاء الخبر بنجاح',
      data: news
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @desc    Update news
// @route   PUT /api/news/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!news) {
      return res.status(404).json({ 
        success: false, 
        message: 'الخبر غير موجود' 
      });
    }

    res.json({
      success: true,
      message: 'تم تحديث الخبر بنجاح',
      data: news
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @desc    Delete news
// @route   DELETE /api/news/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin', 'moderator'), async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);

    if (!news) {
      return res.status(404).json({ 
        success: false, 
        message: 'الخبر غير موجود' 
      });
    }

    res.json({
      success: true,
      message: 'تم حذف الخبر بنجاح'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
