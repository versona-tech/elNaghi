const { google } = require('googleapis');
const path = require('path');

class GoogleSheetsService {
  constructor() {
    this.auth = null;
    this.sheets = null;
    this.spreadsheetId = process.env.GOOGLE_SHEET_ID;
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;

    try {
      // Load credentials
      const credentialsPath = path.join(__dirname, '..', process.env.GOOGLE_CREDENTIALS_PATH);
      
      // Create auth client
      this.auth = new google.auth.GoogleAuth({
        keyFile: credentialsPath,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      // Create sheets client
      this.sheets = google.sheets({ version: 'v4', auth: this.auth });
      
      // Initialize sheet headers if needed
      await this.initializeHeaders();
      
      this.initialized = true;
      console.log('✅ Google Sheets API initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing Google Sheets:', error.message);
      throw error;
    }
  }

  async initializeHeaders() {
    try {
      // Check if headers already exist
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: 'Sheet1!A1:Z1',
      });

      // If no data or empty headers, create them
      if (!response.data.values || response.data.values.length === 0) {
        const headers = [
          'رقم',
          'التاريخ',
          'الوقت',
          'الاسم الكامل',
          'رقم الهاتف',
          'البريد الإلكتروني',
          'العمر',
          'المنطقة / القرية',
          'المؤهل الدراسي',
          'اللجنة الرئيسية',
          'اللجنة الفرعية',
          'خبرة سابقة؟',
          'المهارات',
          'الوقت المتاح',
          'دوافع الانضمام'
        ];

        await this.sheets.spreadsheets.values.update({
          spreadsheetId: this.spreadsheetId,
          range: 'Sheet1!A1',
          valueInputOption: 'RAW',
          resource: {
            values: [headers],
          },
        });

        // Format headers
        await this.sheets.spreadsheets.batchUpdate({
          spreadsheetId: this.spreadsheetId,
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
                      backgroundColor: { red: 0.2, green: 0.4, blue: 0.8 },
                      textFormat: {
                        foregroundColor: { red: 1, green: 1, blue: 1 },
                        fontSize: 11,
                        bold: true,
                      },
                      horizontalAlignment: 'CENTER',
                    },
                  },
                  fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)',
                },
              },
              {
                autoResizeDimensions: {
                  dimensions: {
                    sheetId: 0,
                    dimension: 'COLUMNS',
                    startIndex: 0,
                    endIndex: 15,
                  },
                },
              },
            ],
          },
        });

        console.log('✅ Sheet headers initialized');
      }
    } catch (error) {
      console.error('Error initializing headers:', error.message);
    }
  }

  async addVolunteer(volunteerData) {
    try {
      await this.initialize();

      // Get current row count to generate sequential number
      const currentData = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: 'Sheet1!A:A',
      });

      const rowNumber = (currentData.data.values?.length || 1);
      const now = new Date();
      const dateStr = now.toLocaleDateString('ar-EG');
      const timeStr = now.toLocaleTimeString('ar-EG');

      // Map committee keys to Arabic names
      const committeeNames = {
        technical: 'اللجنة الفنية',
        administrative: 'اللجنة الإدارية',
        advisory: 'لجنة الحكماء والمستشارين'
      };

      const subCommitteeNames = {
        // Technical
        media_pr: 'لجنة الإعلام والعلاقات الصحفية',
        design_production: 'لجنة التصميم والإنتاج المرئي',
        social_media: 'لجنة السوشيال ميديا والإعلانات الرقمية',
        field_events: 'لجنة الفعاليات الميدانية',
        documentation: 'لجنة التوثيق والتصوير',
        monitoring: 'لجنة الرصد والتحليل الإعلامي',
        // Administrative
        organization: 'لجنة التنظيم والمتابعة',
        logistics: 'لجنة الدعم اللوجستي والمواصلات',
        hr_volunteers: 'لجنة الموارد البشرية والمتطوعين',
        finance: 'لجنة الشؤون المالية والتوريدات',
        field_communication: 'لجنة التواصل الميداني',
        security: 'لجنة أمن الحملة وحماية المقرات',
        // Advisory
        legal: 'اللجنة القانونية',
        political: 'اللجنة السياسية والاستراتيجية',
        conflict_resolution: 'لجنة حل النزاعات والمصالحات',
        public_relations: 'لجنة العلاقات العامة والمجتمعية',
        planning: 'لجنة التخطيط والبرامج الانتخابية'
      };

      const availabilityNames = {
        fulltime: 'متفرغ بالكامل',
        parttime_daily: 'بضع ساعات يومياً',
        weekends: 'نهاية الأسبوع فقط',
        flexible: 'مرن حسب الحاجة'
      };

      // Prepare row data
      const rowData = [
        rowNumber,
        dateStr,
        timeStr,
        volunteerData.fullName || '',
        volunteerData.phone || '',
        volunteerData.email || '',
        volunteerData.age || '',
        volunteerData.area || '',
        volunteerData.education || '',
        committeeNames[volunteerData.mainCommittee] || volunteerData.mainCommittee || '',
        subCommitteeNames[volunteerData.subCommittee] || volunteerData.subCommittee || '',
        volunteerData.hasExperience === 'yes' ? 'نعم' : volunteerData.hasExperience === 'no' ? 'لا' : '',
        volunteerData.skills || '',
        availabilityNames[volunteerData.availability] || volunteerData.availability || '',
        volunteerData.motivation || ''
      ];

      // Append data to sheet
      const appendResponse = await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: 'Sheet1!A:O',
        valueInputOption: 'RAW',
        resource: {
          values: [rowData],
        },
      });

      console.log(`✅ Volunteer added to sheet: ${volunteerData.fullName}`);

      return {
        success: true,
        rowNumber,
        range: appendResponse.data.updates.updatedRange,
      };
    } catch (error) {
      console.error('❌ Error adding volunteer to sheet:', error.message);
      throw error;
    }
  }

  async getVolunteers() {
    try {
      await this.initialize();

      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: 'Sheet1!A2:O',
      });

      const rows = response.data.values || [];
      
      return rows.map(row => ({
        number: row[0],
        date: row[1],
        time: row[2],
        fullName: row[3],
        phone: row[4],
        email: row[5],
        age: row[6],
        area: row[7],
        education: row[8],
        mainCommittee: row[9],
        subCommittee: row[10],
        hasExperience: row[11],
        skills: row[12],
        availability: row[13],
        motivation: row[14],
      }));
    } catch (error) {
      console.error('Error getting volunteers:', error.message);
      throw error;
    }
  }

  async getStats() {
    try {
      const volunteers = await this.getVolunteers();
      
      const stats = {
        total: volunteers.length,
        byCommittee: {},
        byArea: {},
        byAvailability: {},
      };

      volunteers.forEach(v => {
        // By committee
        stats.byCommittee[v.mainCommittee] = (stats.byCommittee[v.mainCommittee] || 0) + 1;
        
        // By area
        stats.byArea[v.area] = (stats.byArea[v.area] || 0) + 1;
        
        // By availability
        stats.byAvailability[v.availability] = (stats.byAvailability[v.availability] || 0) + 1;
      });

      return stats;
    } catch (error) {
      console.error('Error getting stats:', error.message);
      throw error;
    }
  }
}

module.exports = new GoogleSheetsService();
