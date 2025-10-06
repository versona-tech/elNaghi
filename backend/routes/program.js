const express = require('express');
const router = express.Router();
const Program = require('../models/Program');
const { protect, authorize } = require('../middleware/auth');

// @desc    Get all program items
// @route   GET /api/program
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;

    const query = { isActive: true };
    if (category) query.category = category;

    const programs = await Program.find(query).sort({ category: 1, order: 1 });

    res.json({
      success: true,
      count: programs.length,
      data: programs
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get program item by ID
// @route   GET /api/program/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);

    if (!program) {
      return res.status(404).json({ 
        success: false, 
        message: 'عنصر البرنامج غير موجود' 
      });
    }

    res.json({ success: true, data: program });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Create program item
// @route   POST /api/program
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const program = await Program.create(req.body);

    res.status(201).json({
      success: true,
      message: 'تم إضافة عنصر البرنامج بنجاح',
      data: program
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @desc    Update program item
// @route   PUT /api/program/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const program = await Program.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!program) {
      return res.status(404).json({ 
        success: false, 
        message: 'عنصر البرنامج غير موجود' 
      });
    }

    res.json({
      success: true,
      message: 'تم تحديث عنصر البرنامج بنجاح',
      data: program
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @desc    Delete program item
// @route   DELETE /api/program/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);

    if (!program) {
      return res.status(404).json({ 
        success: false, 
        message: 'عنصر البرنامج غير موجود' 
      });
    }

    res.json({
      success: true,
      message: 'تم حذف عنصر البرنامج بنجاح'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
