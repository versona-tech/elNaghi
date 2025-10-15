import { google } from 'googleapis';
import credentials from '../config/google-credentials.json';

const SHEET_ID = '1DnFeLt2Btqwo_SpFPKe_sM4ZYP8bM5i-DNnGA5N_ihA';

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

class GoogleSheetsService {
  constructor() {
    this.auth = null;
    this.sheets = null;
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;

    try {
      // إنشاء JWT client للمصادقة
      this.auth = new google.auth.JWT(
        credentials.client_email,
        null,
        credentials.private_key,
        ['https://www.googleapis.com/auth/spreadsheets']
      );

      // الحصول على Google Sheets API
      this.sheets = google.sheets({ version: 'v4', auth: this.auth });
      
      this.initialized = true;
      
      // التأكد من وجود headers في الشيت
      await this.initializeHeaders();
      
      console.log('✅ Google Sheets API initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing Google Sheets:', error);
      throw error;
    }
  }

  async initializeHeaders() {
    try {
      // التحقق من وجود headers
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
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

        await this.sheets.spreadsheets.values.update({
          spreadsheetId: SHEET_ID,
          range: 'Sheet1!A1:O1',
          valueInputOption: 'RAW',
          resource: {
            values: [headers],
          },
        });

        // تنسيق الـ headers (خلفية زرقاء، نص أبيض، محاذاة في المنتصف)
        await this.sheets.spreadsheets.batchUpdate({
          spreadsheetId: SHEET_ID,
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

  async addVolunteer(data) {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      // الحصول على آخر صف لحساب الرقم التسلسلي
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: 'Sheet1!A:A',
      });

      const rows = response.data.values || [];
      const volunteerNumber = rows.length; // رقم المتطوع (header في row 1، فالمتطوع الأول رقمه 1)

      // تجهيز البيانات مع الترجمة
      const now = new Date();
      const date = now.toLocaleDateString('ar-EG');
      const time = now.toLocaleTimeString('ar-EG');

      const rowData = [
        volunteerNumber, // رقم
        date, // التاريخ
        time, // الوقت
        data.fullName, // الاسم
        data.phone, // الهاتف
        data.email || '', // البريد الإلكتروني
        data.age, // العمر
        data.area, // المنطقة
        data.education, // المؤهل الدراسي
        committeeNames[data.mainCommittee] || data.mainCommittee, // اللجنة الرئيسية
        subCommitteeNames[data.subCommittee] || data.subCommittee, // اللجنة الفرعية
        data.previousExperience || 'لا', // خبرة سابقة
        data.skills || '', // المهارات
        availabilityNames[data.availability] || data.availability, // الوقت المتاح
        data.motivation || '' // دوافع الانضمام
      ];

      // إضافة الصف للشيت
      await this.sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: 'Sheet1!A:O',
        valueInputOption: 'RAW',
        resource: {
          values: [rowData],
        },
      });

      console.log(`✅ Volunteer #${volunteerNumber} added successfully`);
      
      return {
        success: true,
        volunteerNumber,
        name: data.fullName
      };
    } catch (error) {
      console.error('❌ Error adding volunteer:', error);
      throw error;
    }
  }

  async getVolunteers() {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: 'Sheet1!A2:O',
      });

      return response.data.values || [];
    } catch (error) {
      console.error('❌ Error getting volunteers:', error);
      throw error;
    }
  }

  async getStats() {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      const volunteers = await this.getVolunteers();
      
      const stats = {
        total: volunteers.length,
        byCommittee: {},
        byArea: {},
        byAvailability: {}
      };

      volunteers.forEach(row => {
        // تجميع حسب اللجنة الرئيسية (العمود 9)
        const committee = row[9] || 'غير محدد';
        stats.byCommittee[committee] = (stats.byCommittee[committee] || 0) + 1;

        // تجميع حسب المنطقة (العمود 7)
        const area = row[7] || 'غير محدد';
        stats.byArea[area] = (stats.byArea[area] || 0) + 1;

        // تجميع حسب الوقت المتاح (العمود 13)
        const availability = row[13] || 'غير محدد';
        stats.byAvailability[availability] = (stats.byAvailability[availability] || 0) + 1;
      });

      return stats;
    } catch (error) {
      console.error('❌ Error getting stats:', error);
      throw error;
    }
  }
}

// تصدير instance واحد فقط (Singleton)
const googleSheetsService = new GoogleSheetsService();
export default googleSheetsService;
