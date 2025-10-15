const { google } = require('googleapis');

// ترجمة اللجان الرئيسية
const committeeNames = {
  technical: 'اللجنة التقنية',
  administrative: 'اللجنة الإدارية',
  advisory: 'اللجنة الاستشارية'
};

// ترجمة اللجان الفرعية
const subCommitteeNames = {
  // Technical
  webDev: 'تطوير المواقع والتطبيقات',
  socialMedia: 'إدارة السوشيال ميديا',
  design: 'التصميم والجرافيكس',
  video: 'المونتاج وإنتاج الفيديو',
  dataAnalysis: 'تحليل البيانات',
  
  // Administrative
  fieldCoordination: 'تنسيق العمل الميداني',
  volunteersManagement: 'إدارة المتطوعين',
  events: 'تنظيم الفعاليات',
  publicRelations: 'العلاقات العامة',
  logistics: 'اللوجستيات والإمدادات',
  
  // Advisory
  legal: 'الدعم القانوني',
  financial: 'التخطيط المالي',
  strategic: 'التخطيط الاستراتيجي',
  media: 'الاستشارات الإعلامية',
  research: 'البحث والدراسات'
};

// ترجمة الوقت المتاح
const availabilityNames = {
  fullTime: 'متفرغ بالكامل',
  partTime: 'جزء من الوقت (مساءً أو نهاية الأسبوع)',
  weekends: 'نهاية الأسبوع فقط',
  flexible: 'حسب الظروف'
};

async function initializeHeaders(sheets, spreadsheetId) {
  try {
    // التحقق من وجود headers
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A1:O1',
    });

    // إذا لم تكن الـ headers موجودة، نضيفها
    if (!response.data.values || response.data.values.length === 0) {
      const headers = [
        'رقم',
        'التاريخ',
        'الوقت',
        'الاسم',
        'الهاتف',
        'البريد الإلكتروني',
        'العمر',
        'المنطقة',
        'المؤهل الدراسي',
        'اللجنة الرئيسية',
        'اللجنة الفرعية',
        'خبرة سابقة',
        'المهارات',
        'الوقت المتاح',
        'دوافع الانضمام'
      ];

      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'Sheet1!A1:O1',
        valueInputOption: 'RAW',
        resource: {
          values: [headers],
        },
      });

      // تنسيق الـ headers
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        resource: {
          requests: [
            {
              repeatCell: {
                range: {
                  sheetId: 0,
                  startRowIndex: 0,
                  endRowIndex: 1,
                },
                cell: {
                  userEnteredFormat: {
                    backgroundColor: {
                      red: 0.2,
                      green: 0.4,
                      blue: 0.8,
                    },
                    textFormat: {
                      foregroundColor: {
                        red: 1.0,
                        green: 1.0,
                        blue: 1.0,
                      },
                      fontSize: 11,
                      bold: true,
                    },
                    horizontalAlignment: 'CENTER',
                    verticalAlignment: 'MIDDLE',
                  },
                },
                fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment)',
              },
            },
          ],
        },
      });

      console.log('✅ Headers initialized successfully');
    }
  } catch (error) {
    console.error('❌ Error initializing headers:', error);
    throw error;
  }
}

exports.handler = async (event, context) => {
  // Allow CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse request body
    const data = JSON.parse(event.body);

    // Validate required environment variables
    const CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
    const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const SHEET_ID = process.env.GOOGLE_SHEET_ID;

    if (!CLIENT_EMAIL || !PRIVATE_KEY || !SHEET_ID) {
      throw new Error('Missing required environment variables');
    }

    // Initialize Google Sheets API with JWT and authorize
    const auth = new google.auth.JWT(
      CLIENT_EMAIL,
      null,
      PRIVATE_KEY,
      ['https://www.googleapis.com/auth/spreadsheets']
    );

    // Get access token
    await auth.authorize();

    const sheets = google.sheets({ version: 'v4', auth });

    // Initialize headers if needed
    const sheetData = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A1:O1',
    });

    if (!sheetData.data.values || sheetData.data.values.length === 0) {
      await initializeHeaders(sheets, SHEET_ID);
    }

    // Get current row count to generate volunteer number
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A:A',
    });

    const rows = response.data.values || [];
    const volunteerNumber = rows.length; // Header is row 1, so first volunteer is 1

    // Prepare data with Arabic translation
    const now = new Date();
    const date = now.toLocaleDateString('ar-EG', { timeZone: 'Africa/Cairo' });
    const time = now.toLocaleTimeString('ar-EG', { timeZone: 'Africa/Cairo' });

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
      committeeNames[data.mainCommittee] || data.mainCommittee,
      subCommitteeNames[data.subCommittee] || data.subCommittee,
      data.previousExperience || 'لا',
      data.skills || '',
      availabilityNames[data.availability] || data.availability,
      data.motivation || ''
    ];

    // Add row to sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A:O',
      valueInputOption: 'RAW',
      resource: {
        values: [rowData],
      },
    });

    console.log(`✅ Volunteer #${volunteerNumber} added successfully`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: {
          volunteerNumber,
          name: data.fullName
        }
      }),
    };
  } catch (error) {
    console.error('❌ Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message || 'حدث خطأ أثناء إرسال الطلب'
      }),
    };
  }
};
