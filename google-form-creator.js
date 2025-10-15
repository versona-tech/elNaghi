// نسخ هذا الكود في Google Apps Script
// https://script.google.com/

function createVolunteerForm() {
  const form = FormApp.create('استمارة الانضمام - حملة محمد الناغي');
  
  // =====================
  // البيانات الشخصية
  // =====================
  form.addSectionHeaderItem()
    .setTitle('البيانات الشخصية')
    .setHelpText('املأ بياناتك الشخصية بدقة');
  
  form.addTextItem()
    .setTitle('الاسم الكامل')
    .setHelpText('أدخل اسمك الرباعي')
    .setRequired(true);
  
  form.addTextItem()
    .setTitle('رقم الهاتف')
    .setHelpText('مثال: 01012345678')
    .setRequired(true);
  
  form.addTextItem()
    .setTitle('البريد الإلكتروني (اختياري)')
    .setHelpText('سنستخدمه للتواصل معك');
  
  form.addTextItem()
    .setTitle('العمر')
    .setHelpText('أدخل عمرك بالأرقام')
    .setRequired(true);
  
  form.addTextItem()
    .setTitle('المنطقة')
    .setHelpText('منطقة السكن')
    .setRequired(true);
  
  form.addMultipleChoiceItem()
    .setTitle('المؤهل الدراسي')
    .setChoiceValues([
      'ثانوية عامة أو أقل',
      'دبلوم متوسط',
      'بكالوريوس',
      'دراسات عليا (ماجستير/دكتوراه)'
    ])
    .setRequired(true);
  
  // =====================
  // اختيار اللجنة
  // =====================
  form.addSectionHeaderItem()
    .setTitle('اختيار اللجنة')
    .setHelpText('اختر اللجنة التي تناسب مهاراتك واهتماماتك');
  
  form.addMultipleChoiceItem()
    .setTitle('اللجنة الرئيسية')
    .setChoiceValues([
      'اللجنة الفنية',
      'اللجنة الإدارية',
      'لجنة الحكماء والمستشارين'
    ])
    .setRequired(true);
  
  // اللجان الفرعية
  var subCommittees = form.addMultipleChoiceItem();
  subCommittees.setTitle('اللجنة الفرعية')
    .setHelpText('اختر اللجنة الفرعية المناسبة لمهاراتك')
    .setRequired(true);
  
  var choices = [
    // اللجنة الفنية
    'لجنة الإعلام والعلاقات الصحفية',
    'لجنة التصميم والإنتاج المرئي',
    'لجنة السوشيال ميديا والإعلانات الرقمية',
    'لجنة الفعاليات الميدانية',
    'لجنة التوثيق والتصوير',
    'لجنة الرصد والتحليل الإعلامي',
    
    // اللجنة الإدارية
    'لجنة التنظيم والمتابعة',
    'لجنة الدعم اللوجستي والمواصلات',
    'لجنة الموارد البشرية والمتطوعين',
    'لجنة الشؤون المالية والتوريدات',
    'لجنة التواصل الميداني',
    'لجنة أمن الحملة وحماية المقرات',
    
    // لجنة الحكماء والمستشارين
    'اللجنة القانونية',
    'اللجنة السياسية والاستراتيجية',
    'لجنة حل النزاعات والمصالحات',
    'لجنة العلاقات العامة والمجتمعية',
    'لجنة التخطيط والبرامج الانتخابية'
  ];
  subCommittees.setChoiceValues(choices);
  
  // =====================
  // الخبرة والمهارات
  // =====================
  form.addSectionHeaderItem()
    .setTitle('الخبرة والمهارات')
    .setHelpText('أخبرنا عن خبراتك ومهاراتك');
  
  form.addMultipleChoiceItem()
    .setTitle('هل لديك خبرة سابقة في الحملات الانتخابية؟')
    .setChoiceValues(['نعم', 'لا'])
    .setRequired(true);
  
  form.addParagraphTextItem()
    .setTitle('المهارات والخبرات (اختياري)')
    .setHelpText('اذكر أي مهارات أو خبرات لديك تفيد الحملة');
  
  // =====================
  // التفرغ والدوافع
  // =====================
  form.addSectionHeaderItem()
    .setTitle('الوقت المتاح والدوافع')
    .setHelpText('ساعدنا في فهم مدى تفرغك ودوافع انضمامك');
  
  form.addMultipleChoiceItem()
    .setTitle('الوقت المتاح للمشاركة')
    .setChoiceValues([
      'متفرغ بالكامل',
      'جزء من الوقت (مساءً أو نهاية الأسبوع)',
      'نهاية الأسبوع فقط',
      'حسب الظروف'
    ])
    .setRequired(true);
  
  form.addParagraphTextItem()
    .setTitle('لماذا تريد الانضمام للحملة؟ (اختياري)')
    .setHelpText('أخبرنا عن دوافعك للانضمام');
  
  // =====================
  // الإعدادات والربط
  // =====================
  
  // ربط الفورم بالشيت الموجود
  form.setDestination(FormApp.DestinationType.SPREADSHEET, '1DnFeLt2Btqwo_SpFPKe_sM4ZYP8bM5i-DNnGA5N_ihA');
  
  // رسالة التأكيد
  form.setConfirmationMessage('شكراً لك! تم إرسال طلبك بنجاح. سنتواصل معك في أقرب وقت.');
  
  // السماح بتعديل الردود
  form.setAllowResponseEdits(false);
  
  // جمع البريد الإلكتروني
  form.setCollectEmail(false);
  
  // طباعة الروابط
  Logger.log('✅ تم إنشاء الفورم بنجاح!');
  Logger.log('📝 رابط الفورم: ' + form.getPublishedUrl());
  Logger.log('✏️ رابط التعديل: ' + form.getEditUrl());
  Logger.log('📊 رابط الردود: https://docs.google.com/spreadsheets/d/1DnFeLt2Btqwo_SpFPKe_sM4ZYP8bM5i-DNnGA5N_ihA/edit');
  
  // إرجاع رابط الفورم
  return form.getPublishedUrl();
}

// تشغيل الدالة
function run() {
  var url = createVolunteerForm();
  
  // عرض رسالة منبثقة بالرابط
  var ui = SpreadsheetApp.getUi();
  ui.alert('تم إنشاء الفورم بنجاح!', 
           'رابط الفورم:\n' + url + '\n\nافتح Logs (View > Logs) لرؤية جميع الروابط', 
           ui.ButtonSet.OK);
}
