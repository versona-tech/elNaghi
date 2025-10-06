const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { protect, authorize } = require('../middleware/auth');

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { status, category, priority, page = 1, limit = 20 } = req.query;

    const query = {};
    if (status) query.status = status;
    if (category) query.category = category;
    if (priority) query.priority = priority;

    const messages = await Message.find(query)
      .populate('respondedBy', 'fullName username')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Message.countDocuments(query);

    res.json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      data: messages
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get message by ID
// @route   GET /api/messages/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)
      .populate('respondedBy', 'fullName username');

    if (!message) {
      return res.status(404).json({ 
        success: false, 
        message: 'الرسالة غير موجودة' 
      });
    }

    res.json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Create new message (Public)
// @route   POST /api/messages
// @access  Public
router.post('/', async (req, res) => {
  try {
    const message = await Message.create(req.body);

    res.status(201).json({
      success: true,
      message: 'تم إرسال الرسالة بنجاح. سنتواصل معك قريباً',
      data: message
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @desc    Update message status/response
// @route   PUT /api/messages/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const { status, response, priority } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;
    if (response) {
      updateData.response = response;
      updateData.respondedBy = req.user._id;
      updateData.respondedAt = Date.now();
    }

    const message = await Message.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('respondedBy', 'fullName username');

    if (!message) {
      return res.status(404).json({ 
        success: false, 
        message: 'الرسالة غير موجودة' 
      });
    }

    res.json({
      success: true,
      message: 'تم تحديث الرسالة بنجاح',
      data: message
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({ 
        success: false, 
        message: 'الرسالة غير موجودة' 
      });
    }

    res.json({
      success: true,
      message: 'تم حذف الرسالة بنجاح'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get message statistics
// @route   GET /api/messages/stats/summary
// @access  Private
router.get('/stats/summary', protect, async (req, res) => {
  try {
    const total = await Message.countDocuments();
    const byStatus = await Message.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    const byCategory = await Message.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      data: {
        total,
        byStatus,
        byCategory
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
