const express = require('express');
const router = express.Router();
const googleSheetsService = require('../services/googleSheets');
const { body, validationResult } = require('express-validator');

// @route   POST /api/volunteers
// @desc    Submit volunteer application
// @access  Public
router.post(
  '/',
  [
    body('fullName').trim().notEmpty().withMessage('الاسم الكامل مطلوب'),
    body('phone').trim().matches(/^01[0-9]{9}$/).withMessage('رقم الهاتف غير صحيح'),
    body('age').isInt({ min: 18, max: 70 }).withMessage('العمر يجب أن يكون بين 18 و 70'),
    body('area').trim().notEmpty().withMessage('المنطقة مطلوبة'),
    body('education').trim().notEmpty().withMessage('المؤهل الدراسي مطلوب'),
    body('mainCommittee').trim().notEmpty().withMessage('اللجنة الرئيسية مطلوبة'),
    body('subCommittee').trim().notEmpty().withMessage('اللجنة الفرعية مطلوبة'),
    body('availability').trim().notEmpty().withMessage('الوقت المتاح مطلوب'),
    body('acceptTerms').equals('true').withMessage('يجب الموافقة على الشروط'),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'خطأ في البيانات المدخلة',
          errors: errors.array().map(err => ({
            field: err.param,
            message: err.msg
          }))
        });
      }

      const volunteerData = {
        fullName: req.body.fullName,
        phone: req.body.phone,
        email: req.body.email || '',
        age: req.body.age,
        area: req.body.area,
        education: req.body.education,
        mainCommittee: req.body.mainCommittee,
        subCommittee: req.body.subCommittee,
        hasExperience: req.body.hasExperience || '',
        skills: req.body.skills || '',
        availability: req.body.availability,
        motivation: req.body.motivation || '',
      };

      // Add to Google Sheets
      const result = await googleSheetsService.addVolunteer(volunteerData);

      res.status(201).json({
        success: true,
        message: 'تم تسجيل طلبك بنجاح! سنتواصل معك قريباً',
        data: {
          volunteerNumber: result.rowNumber,
          name: volunteerData.fullName,
        }
      });

    } catch (error) {
      console.error('Error submitting volunteer:', error);
      res.status(500).json({
        success: false,
        message: 'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
);

// @route   GET /api/volunteers
// @desc    Get all volunteers (for admin)
// @access  Public (should be protected in production)
router.get('/', async (req, res) => {
  try {
    const volunteers = await googleSheetsService.getVolunteers();
    
    res.json({
      success: true,
      count: volunteers.length,
      data: volunteers
    });
  } catch (error) {
    console.error('Error getting volunteers:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء جلب البيانات'
    });
  }
});

// @route   GET /api/volunteers/stats
// @desc    Get volunteer statistics
// @access  Public
router.get('/stats', async (req, res) => {
  try {
    const stats = await googleSheetsService.getStats();
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء جلب الإحصائيات'
    });
  }
});

module.exports = router;
