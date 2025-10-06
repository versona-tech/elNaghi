require('dotenv').config();
const bcrypt = require('bcryptjs');
const connectDB = require('../config/database');
const User = require('../models/User');
const Program = require('../models/Program');
const News = require('../models/News');

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('🌱 بدء عملية تعبئة قاعدة البيانات...');

    // Clear existing data
    await User.deleteMany({});
    await Program.deleteMany({});
    await News.deleteMany({});

    // Create admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    const admin = await User.create({
      username: 'admin',
      password: hashedPassword,
      fullName: 'مدير النظام',
      email: 'admin@elnagy.com',
      role: 'admin',
      isActive: true
    });

    console.log('✅ تم إنشاء المستخدم الأساسي');

    // Seed Program Data
    const programData = [
      {
        category: 'تعليم',
        title: 'تطوير المدارس والارتقاء بمستوى التعليم',
        description: 'رفع كفاءة المدارس وتجهيزها بأحدث الوسائل التعليمية',
        points: [
          'صيانة وتطوير المباني المدرسية القديمة',
          'توفير وسائل تعليمية حديثة',
          'دعم المعلمين وتدريبهم',
          'مكافحة التسرب من التعليم',
          'توفير حافلات مدرسية'
        ],
        icon: 'graduation-cap',
        order: 1
      },
      {
        category: 'صحة',
        title: 'تحسين الخدمات الصحية',
        description: 'توفير رعاية صحية متميزة لجميع المواطنين',
        points: [
          'تطوير الوحدات الصحية',
          'توفير الأدوية والمستلزمات الطبية',
          'دعم التأمين الصحي الشامل',
          'مكافحة الأمراض المزمنة',
          'توفير سيارات إسعاف مجهزة'
        ],
        icon: 'hospital',
        order: 2
      },
      {
        category: 'تشغيل',
        title: 'خلق فرص عمل للشباب',
        description: 'محاربة البطالة وتوفير فرص عمل حقيقية',
        points: [
          'دعم المشروعات الصغيرة والمتوسطة',
          'التدريب المهني للشباب',
          'ربط الخريجين بسوق العمل',
          'تشجيع الاستثمار المحلي',
          'برامج القروض الميسرة'
        ],
        icon: 'briefcase',
        order: 3
      },
      {
        category: 'بنية تحتية',
        title: 'تطوير البنية التحتية',
        description: 'رفع كفاءة الطرق والمرافق العامة',
        points: [
          'رصف وصيانة الطرق الداخلية',
          'توفير مياه شرب نظيفة',
          'تطوير شبكة الصرف الصحي',
          'إنارة الشوارع',
          'تحسين شبكة الكهرباء'
        ],
        icon: 'road',
        order: 4
      },
      {
        category: 'شباب ورياضة',
        title: 'رعاية الشباب وتطوير الرياضة',
        description: 'الاهتمام بالشباب ودعم المواهب الرياضية',
        points: [
          'إنشاء مراكز شباب حديثة',
          'تطوير الملاعب الرياضية',
          'دعم الفرق المحلية',
          'برامج اكتشاف المواهب',
          'تنظيم بطولات ومسابقات'
        ],
        icon: 'futbol',
        order: 5
      },
      {
        category: 'تنمية',
        title: 'التنمية الاقتصادية المحلية',
        description: 'تحسين الاقتصاد المحلي ودعم الأسر المنتجة',
        points: [
          'دعم المزارعين والفلاحين',
          'تطوير الصناعات الحرفية',
          'تشجيع المشروعات المنزلية',
          'توفير أسواق للمنتجات المحلية',
          'برامج محو الأمية'
        ],
        icon: 'chart-line',
        order: 6
      }
    ];

    await Program.insertMany(programData);
    console.log('✅ تم إضافة البرنامج الانتخابي');

    // Seed Sample News
    const newsData = [
      {
        title: 'انطلاق الحملة الانتخابية للمرشح محمد إبراهيم علي الناغي',
        body: 'في جو من الحماس والتفاؤل، انطلقت اليوم فعاليات الحملة الانتخابية للمرشح محمد إبراهيم علي الناغي عن دائرة منية النصر والجمالية. وقد شهدت الانطلاقة حضوراً كبيراً من أبناء الدائرة والمؤيدين.',
        summary: 'انطلاق رسمي للحملة الانتخابية بحضور جماهيري كبير',
        category: 'أخبار',
        isFeatured: true,
        author: admin._id,
        publishedAt: new Date()
      },
      {
        title: 'لقاء مع شباب قرية الرياض',
        body: 'عقد المرشح لقاءً مفتوحاً مع شباب قرية الرياض لمناقشة همومهم وطموحاتهم والاستماع إلى مقترحاتهم لتطوير القرية. وقد تم التأكيد على أولوية دعم الشباب وتوفير فرص عمل.',
        summary: 'حوار مفتوح مع الشباب حول التنمية وفرص العمل',
        category: 'أنشطة',
        author: admin._id,
        publishedAt: new Date(Date.now() - 86400000) // Yesterday
      }
    ];

    await News.insertMany(newsData);
    console.log('✅ تم إضافة أخبار تجريبية');

    console.log('\n✨ تمت عملية التعبئة بنجاح!');
    console.log('\n📋 بيانات الدخول:');
    console.log('   اسم المستخدم: admin');
    console.log('   كلمة المرور: admin123');
    console.log('\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ خطأ في عملية التعبئة:', error);
    process.exit(1);
  }
};

seedDatabase();
