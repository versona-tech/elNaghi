import Head from 'next/head';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { 
  FaUsers, FaHandsHelping, FaBullhorn, FaPencilRuler, FaLaptop,
  FaCamera, FaChartLine, FaClipboardList, FaTruck, FaUserTie,
  FaMoneyBillWave, FaPhoneAlt, FaShieldAlt, FaBalanceScale, FaLightbulb,
  FaHandshake, FaUserGraduate, FaMapMarkedAlt, FaCheckCircle, FaPaperPlane
} from 'react-icons/fa';

const VolunteerPage = () => {
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [error, setError] = useState('');
  const [selectedCommittee, setSelectedCommittee] = useState('');
  
  const watchCommittee = watch('mainCommittee');

  // البيانات الهيكلية للجان
  const committees = {
    technical: {
      name: 'اللجنة الفنية',
      icon: <FaBullhorn />,
      color: 'from-blue-600 to-blue-800',
      description: 'إدارة الصورة الإعلامية للحملة ورفع الوعي بالبرنامج الانتخابي',
      subCommittees: [
        {
          id: 'media_pr',
          name: 'لجنة الإعلام والعلاقات الصحفية',
          icon: <FaBullhorn />,
          skills: ['إعداد البيانات الصحفية', 'التواصل الإعلامي', 'كتابة المحتوى الإعلامي', 'العلاقات العامة'],
          tasks: [
            'إصدار البيانات الرسمية للحملة',
            'التنسيق مع القنوات والصحف المحلية',
            'إعداد النشرات والدعاية الورقية',
            'التواصل مع الإعلاميين'
          ]
        },
        {
          id: 'design_production',
          name: 'لجنة التصميم والإنتاج المرئي',
          icon: <FaPencilRuler />,
          skills: ['التصميم الجرافيكي', 'المونتاج', 'الإنتاج المرئي', 'Photoshop/Illustrator', 'After Effects/Premiere'],
          tasks: [
            'إعداد الشعارات واللافتات والبوسترات',
            'إنتاج الفيديوهات التعريفية',
            'توحيد الهوية البصرية للحملة'
          ]
        },
        {
          id: 'social_media',
          name: 'لجنة السوشيال ميديا والإعلانات الرقمية',
          icon: <FaLaptop />,
          skills: ['إدارة السوشيال ميديا', 'كتابة المحتوى الرقمي', 'الإعلانات الممولة', 'التحليل الرقمي'],
          tasks: [
            'إدارة صفحات الحملة الرسمية',
            'نشر الأخبار والفعاليات',
            'الرد على التعليقات والاستفسارات',
            'تحليل البيانات الرقمية'
          ]
        },
        {
          id: 'field_events',
          name: 'لجنة الفعاليات الميدانية',
          icon: <FaMapMarkedAlt />,
          skills: ['التنظيم والإدارة', 'التنسيق اللوجستي', 'إدارة الجمهور', 'حل المشكلات'],
          tasks: [
            'تنظيم المؤتمرات والاجتماعات',
            'إعداد جداول الزيارات',
            'التنسيق مع فرق الدعم',
            'ضمان نجاح الفعاليات'
          ]
        },
        {
          id: 'documentation',
          name: 'لجنة التوثيق والتصوير',
          icon: <FaCamera />,
          skills: ['التصوير الفوتوغرافي', 'تصوير الفيديو', 'المونتاج', 'الأرشفة الرقمية'],
          tasks: [
            'توثيق جميع الفعاليات',
            'إنشاء أرشيف مرئي للحملة',
            'إعداد محتوى مصور احترافي'
          ]
        },
        {
          id: 'monitoring',
          name: 'لجنة الرصد والتحليل الإعلامي',
          icon: <FaChartLine />,
          skills: ['التحليل الإعلامي', 'الرصد الرقمي', 'كتابة التقارير', 'البحث والتحليل'],
          tasks: [
            'متابعة ما يُنشر عن الحملة',
            'رصد المنافسين',
            'إعداد تقارير تحليلية دورية'
          ]
        }
      ]
    },
    administrative: {
      name: 'اللجنة الإدارية',
      icon: <FaClipboardList />,
      color: 'from-green-600 to-green-800',
      description: 'إدارة العمل اليومي الميداني وتنظيم الموارد',
      subCommittees: [
        {
          id: 'organization',
          name: 'لجنة التنظيم والمتابعة',
          icon: <FaClipboardList />,
          skills: ['التخطيط والتنظيم', 'المتابعة الإدارية', 'كتابة التقارير', 'إدارة المشاريع'],
          tasks: [
            'إعداد خطة العمل الميداني',
            'توزيع المهام على الفرق',
            'رفع تقارير دورية'
          ]
        },
        {
          id: 'logistics',
          name: 'لجنة الدعم اللوجستي والمواصلات',
          icon: <FaTruck />,
          skills: ['التنسيق اللوجستي', 'إدارة النقل', 'التخطيط العملي'],
          tasks: [
            'تنظيم وسائل النقل',
            'تجهيز المقرات والمخازن',
            'توفير الأدوات والمعدات'
          ]
        },
        {
          id: 'hr_volunteers',
          name: 'لجنة الموارد البشرية والمتطوعين',
          icon: <FaUsers />,
          skills: ['إدارة الموارد البشرية', 'التدريب والتطوير', 'قواعد البيانات'],
          tasks: [
            'تسجيل بيانات المتطوعين',
            'تدريب الفرق',
            'متابعة الأداء والانضباط'
          ]
        },
        {
          id: 'finance',
          name: 'لجنة الشؤون المالية والتوريدات',
          icon: <FaMoneyBillWave />,
          skills: ['المحاسبة والمالية', 'إدارة الميزانية', 'المشتريات', 'الشفافية المالية'],
          tasks: [
            'إدارة الميزانية بشفافية',
            'مراقبة التبرعات',
            'توريد المواد الدعائية'
          ]
        },
        {
          id: 'field_communication',
          name: 'لجنة التواصل الميداني',
          icon: <FaPhoneAlt />,
          skills: ['التواصل الفعال', 'التنسيق الميداني', 'حل المشكلات'],
          tasks: [
            'التنسيق بين مقرات الحملة',
            'رفع الملاحظات الميدانية',
            'دعم حضور المرشح'
          ]
        },
        {
          id: 'security',
          name: 'لجنة أمن الحملة وحماية المقرات',
          icon: <FaShieldAlt />,
          skills: ['الأمن والحماية', 'إدارة الأزمات', 'السرية والخصوصية'],
          tasks: [
            'تأمين مقرات الحملة',
            'حفظ البيانات من التسريب',
            'التنسيق مع الجهات الرسمية'
          ]
        }
      ]
    },
    advisory: {
      name: 'لجنة الحكماء والمستشارين',
      icon: <FaUserTie />,
      color: 'from-purple-600 to-purple-800',
      description: 'الإشراف على التوجه السياسي والقانوني وتقديم المشورة',
      subCommittees: [
        {
          id: 'legal',
          name: 'اللجنة القانونية',
          icon: <FaBalanceScale />,
          skills: ['القانون الانتخابي', 'المراجعة القانونية', 'الاستشارات القانونية'],
          tasks: [
            'مراجعة البيانات قبل النشر',
            'متابعة القوانين الانتخابية',
            'الرد على الشكاوى القانونية'
          ]
        },
        {
          id: 'political',
          name: 'اللجنة السياسية والاستراتيجية',
          icon: <FaLightbulb />,
          skills: ['التحليل السياسي', 'التخطيط الاستراتيجي', 'الخطاب السياسي'],
          tasks: [
            'وضع التوجه العام للحملة',
            'تحليل الوضع السياسي',
            'اقتراح التحالفات'
          ]
        },
        {
          id: 'conflict_resolution',
          name: 'لجنة حل النزاعات والمصالحات',
          icon: <FaHandshake />,
          skills: ['الوساطة والتفاوض', 'حل النزاعات', 'التواصل الفعال'],
          tasks: [
            'التدخل في الخلافات الداخلية',
            'الحفاظ على وحدة الصف',
            'بناء علاقات إيجابية'
          ]
        },
        {
          id: 'public_relations',
          name: 'لجنة العلاقات العامة والمجتمعية',
          icon: <FaHandsHelping />,
          skills: ['العلاقات العامة', 'التواصل المجتمعي', 'الدبلوماسية'],
          tasks: [
            'التواصل مع الشخصيات العامة',
            'دعم العلاقات مع الجمعيات',
            'تعزيز الصورة الإيجابية'
          ]
        },
        {
          id: 'planning',
          name: 'لجنة التخطيط والبرامج الانتخابية',
          icon: <FaUserGraduate />,
          skills: ['التخطيط الاستراتيجي', 'البحث والتطوير', 'تحليل الاحتياجات'],
          tasks: [
            'إعداد البرنامج الانتخابي',
            'جمع المقترحات التنموية',
            'تحويل الوعود إلى خطط'
          ]
        }
      ]
    }
  };

  // الحصول على اللجان الفرعية بناءً على اللجنة الرئيسية المختارة
  const getSubCommittees = () => {
    if (!watchCommittee || !committees[watchCommittee]) return [];
    return committees[watchCommittee].subCommittees;
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    
    try {
      // إرسال للإيميل مباشرة عبر Formspree (مجاني)
      const response = await fetch('https://formspree.io/f/xanyjorq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          الاسم: data.fullName,
          الهاتف: data.phone,
          البريد: data.email,
          العمر: data.age,
          المنطقة: data.area,
          المؤهل: data.education,
          اللجنة_الرئيسية: data.mainCommittee,
          اللجنة_الفرعية: data.subCommittee,
          الخبرة: data.previousExperience,
          المهارات: data.skills,
          الوقت_المتاح: data.availability,
          الدوافع: data.motivation
        })
      });
      
      if (response.ok) {
        setSuccess(true);
        setSuccessData({ volunteerNumber: Date.now(), name: data.fullName });
        reset();
        setTimeout(() => setSuccess(false), 8000);
      } else {
        throw new Error('فشل الإرسال');
      }
    } catch (err) {
      setError('حدث خطأ أثناء إرسال الطلب');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>انضم للحملة - تطوع معنا | محمد الناغي 2026</title>
        <meta name="description" content="كن جزءاً من التغيير - انضم لحملة محمد الناغي الانتخابية وساهم في بناء مستقبل أفضل لدائرة منية النصر والجمالية" />
        <meta name="keywords" content="تطوع، حملة انتخابية، محمد الناغي، منية النصر، الجمالية، الدقهلية" />
      </Head>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-700 to-navy-900 text-white py-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-0 right-0 w-96 h-96 bg-gold-400 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl"
          />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block mb-6"
            >
              <div className="bg-gold-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-2xl">
                🤝 كن جزءاً من التغيير
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-black mb-6" style={{ fontFamily: 'Cairo, sans-serif' }}>
              انضم لحملة محمد الناغي
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-100 mb-4">
              نبحث عن كوادر وطنية مخلصة لخدمة الدائرة
            </p>
            
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              معاً نبني فريق عمل احترافي لتحقيق التنمية الحقيقية في منية النصر والكردي وميت سلسيل والجمالية
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Volunteer Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4" style={{ fontFamily: 'Cairo, sans-serif' }}>
              لماذا تنضم لحملتنا؟
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              التطوع في الحملة فرصة لخدمة وطنك واكتساب خبرات قيمة
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FaHandsHelping />,
                title: 'خدمة المجتمع',
                desc: 'ساهم في تحسين حياة أبناء دائرتك',
                color: 'from-blue-600 to-blue-700'
              },
              {
                icon: <FaUserGraduate />,
                title: 'اكتساب الخبرة',
                desc: 'تعلم مهارات جديدة في مجالات متعددة',
                color: 'from-green-600 to-green-700'
              },
              {
                icon: <FaUsers />,
                title: 'بناء العلاقات',
                desc: 'تواصل مع شباب طموح من كل المناطق',
                color: 'from-purple-600 to-purple-700'
              },
              {
                icon: <FaLightbulb />,
                title: 'التأثير الإيجابي',
                desc: 'كن جزءاً من صنع القرار والتغيير',
                color: 'from-gold-600 to-gold-700'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-white text-3xl mb-4 shadow-lg`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Committees Overview */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4" style={{ fontFamily: 'Cairo, sans-serif' }}>
              اللجان الرئيسية للحملة
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              اختر اللجنة التي تناسب مهاراتك واهتماماتك
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(committees).map(([key, committee], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-100"
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${committee.color} rounded-2xl flex items-center justify-center text-white text-4xl mb-6 shadow-lg mx-auto`}>
                  {committee.icon}
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4 text-center" style={{ fontFamily: 'Cairo, sans-serif' }}>
                  {committee.name}
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  {committee.description}
                </p>
                <div className="bg-primary-50 rounded-xl p-4">
                  <p className="text-sm font-semibold text-primary-800 mb-2">اللجان الفرعية:</p>
                  <ul className="space-y-1">
                    {committee.subCommittees.slice(0, 3).map((sub, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-primary-600 mt-1">•</span>
                        <span>{sub.name}</span>
                      </li>
                    ))}
                    {committee.subCommittees.length > 3 && (
                      <li className="text-sm text-primary-600 font-semibold">
                        + {committee.subCommittees.length - 3} لجان أخرى
                      </li>
                    )}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Form */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4" style={{ fontFamily: 'Cairo, sans-serif' }}>
                استمارة الانضمام للحملة
              </h2>
              <p className="text-lg text-gray-600">
                املأ البيانات التالية وسنتواصل معك في أقرب وقت
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
              {/* Success Message */}
              {success && successData && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border-2 border-green-400 rounded-xl p-6 mb-8"
                >
                  <div className="flex items-start gap-4">
                    <FaCheckCircle className="text-4xl text-green-600 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-green-900 mb-2">
                        تم إرسال طلبك بنجاح! 🎉
                      </h3>
                      <div className="bg-white rounded-lg p-4 mb-3">
                        <p className="text-sm text-gray-600 mb-1">رقم التسجيل الخاص بك:</p>
                        <p className="text-3xl font-black text-primary-700">#{successData.volunteerNumber}</p>
                        <p className="text-sm text-gray-600 mt-2">الاسم: <span className="font-bold text-gray-900">{successData.name}</span></p>
                      </div>
                      <p className="text-green-700 mb-2">
                        شكراً <strong>{successData.name}</strong> لانضمامك لحملة محمد الناغي. سيتم مراجعة طلبك والتواصل معك خلال 48 ساعة.
                      </p>
                      <p className="text-green-600 text-sm">
                        احتفظ برقم التسجيل للمتابعة. تحقق من هاتفك أو بريدك الإلكتروني للحصول على تأكيد الانضمام.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-2 border-red-400 text-red-700 rounded-xl p-4 mb-8">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
                    البيانات الشخصية
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="form-label">الاسم الكامل *</label>
                      <input
                        type="text"
                        {...register('fullName', { required: 'الاسم الكامل مطلوب' })}
                        className="form-input"
                        placeholder="أدخل اسمك الرباعي"
                      />
                      {errors.fullName && <p className="form-error">{errors.fullName.message}</p>}
                    </div>

                    <div>
                      <label className="form-label">رقم الهاتف *</label>
                      <input
                        type="tel"
                        {...register('phone', { 
                          required: 'رقم الهاتف مطلوب',
                          pattern: {
                            value: /^01[0-9]{9}$/,
                            message: 'رقم الهاتف غير صحيح'
                          }
                        })}
                        className="form-input"
                        placeholder="01xxxxxxxxx"
                        dir="ltr"
                      />
                      {errors.phone && <p className="form-error">{errors.phone.message}</p>}
                    </div>

                    <div>
                      <label className="form-label">البريد الإلكتروني</label>
                      <input
                        type="email"
                        {...register('email', {
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'البريد الإلكتروني غير صحيح'
                          }
                        })}
                        className="form-input"
                        placeholder="example@email.com"
                        dir="ltr"
                      />
                      {errors.email && <p className="form-error">{errors.email.message}</p>}
                    </div>

                    <div>
                      <label className="form-label">العمر *</label>
                      <input
                        type="number"
                        {...register('age', { 
                          required: 'العمر مطلوب',
                          min: { value: 18, message: 'يجب أن يكون العمر 18 سنة فأكثر' },
                          max: { value: 70, message: 'العمر غير صحيح' }
                        })}
                        className="form-input"
                        placeholder="مثال: 25"
                      />
                      {errors.age && <p className="form-error">{errors.age.message}</p>}
                    </div>

                    <div>
                      <label className="form-label">المنطقة / القرية *</label>
                      <select
                        {...register('area', { required: 'المنطقة مطلوبة' })}
                        className="form-input"
                      >
                        <option value="">اختر المنطقة</option>
                        <option value="منية النصر">منية النصر</option>
                        <option value="برمبال القديمة">برمبال القديمة</option>
                        <option value="الرياض">الرياض</option>
                        <option value="الكردي">الكردي</option>
                        <option value="ميت سلسيل">ميت سلسيل</option>
                        <option value="الجمالية">الجمالية</option>
                        <option value="أخرى">أخرى</option>
                      </select>
                      {errors.area && <p className="form-error">{errors.area.message}</p>}
                    </div>

                    <div>
                      <label className="form-label">المؤهل الدراسي *</label>
                      <select
                        {...register('education', { required: 'المؤهل الدراسي مطلوب' })}
                        className="form-input"
                      >
                        <option value="">اختر المؤهل</option>
                        <option value="ثانوية عامة">ثانوية عامة</option>
                        <option value="دبلوم">دبلوم</option>
                        <option value="بكالوريوس">بكالوريوس</option>
                        <option value="ليسانس">ليسانس</option>
                        <option value="دراسات عليا">دراسات عليا</option>
                      </select>
                      {errors.education && <p className="form-error">{errors.education.message}</p>}
                    </div>
                  </div>
                </div>

                {/* Committee Selection */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
                    اختيار اللجنة
                  </h3>

                  <div className="grid md:grid-cols-1 gap-6">
                    <div>
                      <label className="form-label">اللجنة الرئيسية *</label>
                      <select
                        {...register('mainCommittee', { required: 'اختيار اللجنة مطلوب' })}
                        className="form-input"
                      >
                        <option value="">اختر اللجنة الرئيسية</option>
                        {Object.entries(committees).map(([key, committee]) => (
                          <option key={key} value={key}>{committee.name}</option>
                        ))}
                      </select>
                      {errors.mainCommittee && <p className="form-error">{errors.mainCommittee.message}</p>}
                    </div>

                    {watchCommittee && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className="form-label">اللجنة الفرعية *</label>
                        <select
                          {...register('subCommittee', { required: 'اختيار اللجنة الفرعية مطلوب' })}
                          className="form-input"
                          onChange={(e) => setSelectedCommittee(e.target.value)}
                        >
                          <option value="">اختر اللجنة الفرعية</option>
                          {getSubCommittees().map((sub) => (
                            <option key={sub.id} value={sub.id}>{sub.name}</option>
                          ))}
                        </select>
                        {errors.subCommittee && <p className="form-error">{errors.subCommittee.message}</p>}
                      </motion.div>
                    )}

                    {/* Display selected committee info */}
                    {selectedCommittee && watchCommittee && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6"
                      >
                        {(() => {
                          const subComm = getSubCommittees().find(s => s.id === selectedCommittee);
                          if (!subComm) return null;
                          
                          return (
                            <>
                              <div className="flex items-start gap-4 mb-4">
                                <div className="text-3xl text-blue-600">
                                  {subComm.icon}
                                </div>
                                <div>
                                  <h4 className="text-lg font-bold text-blue-900 mb-2">{subComm.name}</h4>
                                  <p className="text-sm text-blue-700 font-semibold mb-2">المهارات المطلوبة:</p>
                                  <div className="flex flex-wrap gap-2">
                                    {subComm.skills.map((skill, idx) => (
                                      <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="bg-white rounded-lg p-4">
                                <p className="text-sm font-semibold text-gray-700 mb-2">المهام الأساسية:</p>
                                <ul className="space-y-1">
                                  {subComm.tasks.map((task, idx) => (
                                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                      <span className="text-blue-600 mt-0.5">✓</span>
                                      <span>{task}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </>
                          );
                        })()}
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Experience & Skills */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm">3</span>
                    الخبرات والمهارات
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <label className="form-label">هل لديك خبرة سابقة في العمل التطوعي؟</label>
                      <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            {...register('hasExperience')}
                            value="yes"
                            className="w-4 h-4 text-primary-600"
                          />
                          <span className="text-gray-700">نعم</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            {...register('hasExperience')}
                            value="no"
                            className="w-4 h-4 text-primary-600"
                          />
                          <span className="text-gray-700">لا</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="form-label">المهارات التي تمتلكها</label>
                      <textarea
                        {...register('skills')}
                        className="form-input min-h-[100px]"
                        placeholder="اذكر المهارات التي تمتلكها (مثال: التصميم الجرافيكي، الكتابة، التصوير، إدارة السوشيال ميديا، التنظيم، إلخ)"
                      />
                    </div>

                    <div>
                      <label className="form-label">الوقت المتاح للتطوع *</label>
                      <select
                        {...register('availability', { required: 'الوقت المتاح مطلوب' })}
                        className="form-input"
                      >
                        <option value="">اختر الوقت المتاح</option>
                        <option value="fulltime">متفرغ بالكامل</option>
                        <option value="parttime_daily">بضع ساعات يومياً</option>
                        <option value="weekends">نهاية الأسبوع فقط</option>
                        <option value="flexible">مرن حسب الحاجة</option>
                      </select>
                      {errors.availability && <p className="form-error">{errors.availability.message}</p>}
                    </div>

                    <div>
                      <label className="form-label">لماذا تريد الانضمام للحملة؟</label>
                      <textarea
                        {...register('motivation')}
                        className="form-input min-h-[120px]"
                        placeholder="أخبرنا عن دوافعك للانضمام وما تأمل أن تحققه من خلال هذه التجربة"
                      />
                    </div>
                  </div>
                </div>

                {/* Terms & Submit */}
                <div className="border-t pt-8">
                  <label className="flex items-start gap-3 mb-6 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('acceptTerms', { required: 'يجب الموافقة على الشروط' })}
                      className="w-5 h-5 text-primary-600 mt-1"
                    />
                    <span className="text-gray-700">
                      أوافق على الالتزام بمعايير العمل في الحملة والحفاظ على سرية المعلومات وأتعهد بالعمل بإخلاص لخدمة أهالي الدائرة
                    </span>
                  </label>
                  {errors.acceptTerms && <p className="form-error mb-4">{errors.acceptTerms.message}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-800 text-white text-xl font-bold rounded-xl hover:from-primary-700 hover:to-primary-900 transition-all duration-300 shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <>
                        <div className="spinner border-white"></div>
                        <span>جاري الإرسال...</span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        <span>إرسال الطلب</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-primary-800 to-navy-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">لديك أسئلة أو استفسارات؟</h2>
          <p className="text-xl text-primary-100 mb-8">
            تواصل معنا وسنكون سعداء بالإجابة على جميع تساؤلاتك
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+20"
              className="bg-white text-primary-800 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              <FaPhoneAlt />
              اتصل بنا
            </a>
            <a
              href="https://wa.me/20"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors inline-flex items-center gap-2"
            >
              <FaHandsHelping />
              واتساب
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default VolunteerPage;
