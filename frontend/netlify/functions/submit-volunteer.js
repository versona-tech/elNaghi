const { google } = require('googleapis');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

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

    // إعداد Service Account
    let privateKey = process.env.GOOGLE_PRIVATE_KEY;
    
    // إصلاح تنسيق الـ Private Key - إزالة المسافات الزيادة
    if (privateKey) {
      // إزالة المسافات بين BEGIN/END والـ key
      privateKey = privateKey.trim();
      // تحويل \n النصية لـ new lines حقيقية
      if (!privateKey.includes('-----BEGIN PRIVATE KEY-----\n')) {
        privateKey = privateKey.replace(/\\n/g, '\n');
      }
      // إزالة المسافات من كل سطر
      privateKey = privateKey.split('\n').map(line => line.trim()).join('\n');
    }
    
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // التحقق من وجود headers
    const checkHeaders = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A1:O1',
    });

    if (!checkHeaders.data.values || checkHeaders.data.values.length === 0) {
      const headerRow = ['رقم', 'التاريخ', 'الوقت', 'الاسم', 'الهاتف', 'البريد', 'العمر', 'المنطقة', 'المؤهل', 'اللجنة الرئيسية', 'اللجنة الفرعية', 'خبرة', 'المهارات', 'الوقت المتاح', 'الدوافع'];
      
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'Sheet1!A1:O1',
        valueInputOption: 'RAW',
        resource: { values: [headerRow] },
      });
    }

    // الحصول على آخر رقم متطوع
    const allData = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A:A',
    });
    
    const volunteerNumber = (allData.data.values?.length || 1);

    // إعداد البيانات
    const now = new Date();
    const date = new Date(now).toLocaleDateString('ar-EG', { timeZone: 'Africa/Cairo' });
    const time = new Date(now).toLocaleTimeString('ar-EG', { timeZone: 'Africa/Cairo' });

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

    // إضافة البيانات للشيت
    const rowData = [
      volunteerNumber,
      date,
      time,
      data.fullName,
      data.phone,
      data.email || '',
      data.age,
      data.area,
      data.education,
      committees[data.mainCommittee] || data.mainCommittee,
      subCommittees[data.subCommittee] || data.subCommittee,
      data.previousExperience || 'لا',
      data.skills || '',
      availability[data.availability] || data.availability,
      data.motivation || ''
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:O',
      valueInputOption: 'RAW',
      resource: { values: [rowData] },
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
    console.error('❌ Error:', error.message);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};
