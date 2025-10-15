const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

exports.handler = async (event, context) => {
  // السماح بـ CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // معالجة OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, error: 'Method not allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body);

    // إعداد Service Account من متغيرات البيئة
    let privateKey = process.env.GOOGLE_PRIVATE_KEY;
    
    // إصلاح تنسيق الـ Private Key
    if (privateKey && !privateKey.includes('\n')) {
      privateKey = privateKey.replace(/\\n/g, '\n');
    }
    
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // الاتصال بالـ Google Sheet
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    
    const sheet = doc.sheetsByIndex[0];

    // التحقق من وجود الهيدر
    const rows = await sheet.getRows();
    if (rows.length === 0) {
      await sheet.setHeaderRow(['رقم', 'التاريخ', 'الوقت', 'الاسم', 'الهاتف', 'البريد', 'العمر', 'المنطقة', 'المؤهل', 'اللجنة الرئيسية', 'اللجنة الفرعية', 'خبرة', 'المهارات', 'الوقت المتاح', 'الدوافع']);
    }

    // إعداد البيانات
    const now = new Date();
    const cairoTime = new Date(now.toLocaleString('en-US', { timeZone: 'Africa/Cairo' }));
    const date = cairoTime.toLocaleDateString('ar-EG');
    const time = cairoTime.toLocaleTimeString('ar-EG');
    const volunteerNumber = rows.length + 1;

    // ترجمة القيم للعربية
    const committees = {
      technical: 'اللجنة التقنية',
      administrative: 'اللجنة الإدارية',
      advisory: 'اللجنة الاستشارية'
    };

    const subCommittees = {
      webDev: 'تطوير المواقع والتطبيقات',
      socialMedia: 'إدارة السوشيال ميديا',
      design: 'التصميم والجرافيكس',
      video: 'المونتاج وإنتاج الفيديو',
      dataAnalysis: 'تحليل البيانات',
      fieldCoordination: 'تنسيق العمل الميداني',
      volunteersManagement: 'إدارة المتطوعين',
      events: 'تنظيم الفعاليات',
      publicRelations: 'العلاقات العامة',
      logistics: 'اللوجستيات والإمدادات',
      legal: 'الدعم القانوني',
      financial: 'التخطيط المالي',
      strategic: 'التخطيط الاستراتيجي',
      media: 'الاستشارات الإعلامية',
      research: 'البحث والدراسات'
    };

    const availability = {
      fullTime: 'متفرغ بالكامل',
      partTime: 'جزء من الوقت',
      weekends: 'نهاية الأسبوع فقط',
      flexible: 'حسب الظروف'
    };

    // إضافة الصف
    await sheet.addRow({
      'رقم': volunteerNumber,
      'التاريخ': date,
      'الوقت': time,
      'الاسم': data.fullName,
      'الهاتف': data.phone,
      'البريد': data.email || '',
      'العمر': data.age,
      'المنطقة': data.area,
      'المؤهل': data.education,
      'اللجنة الرئيسية': committees[data.mainCommittee] || data.mainCommittee,
      'اللجنة الفرعية': subCommittees[data.subCommittee] || data.subCommittee,
      'خبرة': data.previousExperience || 'لا',
      'المهارات': data.skills || '',
      'الوقت المتاح': availability[data.availability] || data.availability,
      'الدوافع': data.motivation || ''
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: {
          volunteerNumber,
          name: data.fullName
        }
      })
    };

  } catch (error) {
    console.error('❌ Error details:', {
      message: error.message,
      stack: error.stack,
      hasEmail: !!process.env.GOOGLE_CLIENT_EMAIL,
      hasKey: !!process.env.GOOGLE_PRIVATE_KEY,
      hasSheetId: !!process.env.GOOGLE_SHEET_ID
    });
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message,
        details: 'تحقق من Function Logs في Netlify'
      })
    };
  }
};
