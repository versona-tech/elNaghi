function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById('1DnFeLt2Btqwo_SpFPKe_sM4ZYP8bM5i-DNnGA5N_ihA').getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    if (!sheet.getRange('A1').getValue()) {
      const headers = ['رقم', 'التاريخ', 'الوقت', 'الاسم', 'الهاتف', 'البريد', 'العمر', 'المنطقة', 'المؤهل', 'اللجنة الرئيسية', 'اللجنة الفرعية', 'خبرة', 'المهارات', 'الوقت المتاح', 'الدوافع'];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length).setBackground('#2563EB').setFontColor('#FFFFFF').setFontWeight('bold');
    }
    
    const lastRow = sheet.getLastRow();
    const volunteerNumber = lastRow;
    const now = new Date();
    const date = Utilities.formatDate(now, 'Africa/Cairo', 'dd/MM/yyyy');
    const time = Utilities.formatDate(now, 'Africa/Cairo', 'hh:mm a');
    
    const committees = {technical: 'التقنية', administrative: 'الإدارية', advisory: 'الاستشارية'};
    const subCommittees = {webDev: 'تطوير المواقع', socialMedia: 'السوشيال ميديا', design: 'التصميم', video: 'المونتاج', dataAnalysis: 'تحليل البيانات', fieldCoordination: 'العمل الميداني', volunteersManagement: 'إدارة المتطوعين', events: 'الفعاليات', publicRelations: 'العلاقات العامة', logistics: 'اللوجستيات', legal: 'القانوني', financial: 'المالي', strategic: 'الاستراتيجي', media: 'الإعلامي', research: 'البحث'};
    const availability = {fullTime: 'متفرغ', partTime: 'جزئي', weekends: 'نهاية الأسبوع', flexible: 'مرن'};
    
    const rowData = [volunteerNumber, date, time, data.fullName, data.phone, data.email || '', data.age, data.area, data.education, committees[data.mainCommittee] || data.mainCommittee, subCommittees[data.subCommittee] || data.subCommittee, data.previousExperience || 'لا', data.skills || '', availability[data.availability] || data.availability, data.motivation || ''];
    
    sheet.appendRow(rowData);
    
    return ContentService.createTextOutput(JSON.stringify({success: true, data: {volunteerNumber: volunteerNumber, name: data.fullName}})).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}
