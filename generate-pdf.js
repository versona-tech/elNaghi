const htmlPdf = require('html-pdf-node');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
  console.log('🚀 بدء عملية إنشاء ملف PDF...');
  
  // مسار ملف HTML
  const htmlPath = path.join(__dirname, 'frontend', 'public', 'documents', 'electoral-program.html');
  
  // التحقق من وجود الملف
  if (!fs.existsSync(htmlPath)) {
    console.error('❌ خطأ: ملف HTML غير موجود في المسار:', htmlPath);
    process.exit(1);
  }
  
  console.log('✅ تم العثور على ملف HTML');
  
  // مسار حفظ PDF
  const outputPath = path.join(__dirname, 'frontend', 'public', 'documents', 'electoral-program.pdf');
  
  try {
    // قراءة محتوى HTML
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    console.log('📝 تحميل محتوى HTML...');
    
    // إعدادات الملف
    const file = { content: htmlContent };
    
    // خيارات PDF
    const options = { 
      format: 'A4',
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      },
      printBackground: true,
      preferCSSPageSize: false
    };
    
    console.log('🖨️  إنشاء ملف PDF...');
    
    // إنشاء PDF
    const pdfBuffer = await htmlPdf.generatePdf(file, options);
    
    // حفظ الملف
    fs.writeFileSync(outputPath, pdfBuffer);
    
    console.log('✅ تم إنشاء ملف PDF بنجاح!');
    console.log('📍 الموقع:', outputPath);
    
    // حجم الملف
    const stats = fs.statSync(outputPath);
    const fileSizeInKB = (stats.size / 1024).toFixed(2);
    console.log(`📊 حجم الملف: ${fileSizeInKB} KB`);
    
    console.log('🎉 انتهت العملية بنجاح!');
    
  } catch (error) {
    console.error('❌ حدث خطأ أثناء إنشاء PDF:', error.message);
    console.error(error);
    process.exit(1);
  }
}

// تشغيل الدالة
generatePDF().catch(error => {
  console.error('❌ خطأ غير متوقع:', error);
  process.exit(1);
});
