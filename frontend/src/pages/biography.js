import Head from 'next/head';
import Image from 'next/image';
import { FaGraduationCap, FaBriefcase, FaAward, FaTrophy, FaUsers, FaHandshake, FaChartLine, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const BiographyPage = () => {
  const education = [
    { degree: 'بكالوريوس خدمة اجتماعية', icon: <FaGraduationCap /> },
    { degree: 'ليسانس حقوق', icon: <FaGraduationCap /> },
    { degree: 'دراسات عليا في العلوم الاجتماعية', icon: <FaGraduationCap /> },
    { degree: 'عدة دورات في إعداد القادة', icon: <FaAward /> },
  ];

  const experience = [
    {
      icon: <FaBriefcase />,
      title: 'جهة سيادية',
      details: '15 سنة خبرة في العمل - سفارة السعودية بالكويت',
      period: '15 سنة'
    },
    {
      icon: <FaTrophy />,
      title: 'رئيس مجلس إدارة مركز شباب الرياض',
      details: 'حصل المركز على المرتبة الأولى على الجمهورية خلال إدارته',
      period: 'سابق'
    },
    {
      icon: <FaUsers />,
      title: 'رئيس أول رابطة مراكز شباب الدقهلية',
      details: 'قيادة وتنسيق أنشطة مراكز الشباب بالمحافظة',
      period: 'مؤسس'
    },
    {
      icon: <FaHandshake />,
      title: 'أمين سابق حزب مستقبل وطن',
      details: 'المشاركة الفاعلة في العمل السياسي والمجتمعي',
      period: 'سابق'
    },
    {
      icon: <FaHandshake />,
      title: 'أمين عام حزب الجبهة الوطنية',
      details: 'قيادة العمل الحزبي والتنسيق مع القواعد الشعبية',
      period: 'حالي'
    },
  ];

  const achievements = [
    'قيادة مركز شباب الرياض للحصول على المرتبة الأولى على مستوى الجمهورية',
    'تأسيس أول رابطة لمراكز شباب الدقهلية وتطويرها',
    '15 عاماً من الخبرة في العمل بجهة سيادية (سفارة السعودية بالكويت)',
    'الحصول على عدة دورات متخصصة في إعداد القادة',
    'الاهتمام المستمر بالشباب والمرأة والتعليم',
    'المساهمة الفاعلة في تطوير العمل المجتمعي والشبابي',
    'بناء علاقات قوية مع المجتمع المحلي والمؤسسات الحكومية',
  ];

  const focusAreas = [
    { icon: <FaUsers />, title: 'الشباب', description: 'تمكين الشباب وتوفير فرص التدريب والتطوير' },
    { icon: <FaStar />, title: 'المرأة', description: 'دعم المرأة وتفعيل دورها في التنمية' },
    { icon: <FaGraduationCap />, title: 'التعليم', description: 'الارتقاء بالمنظومة التعليمية وتطويرها' },
  ];

  return (
    <>
      <Head>
        <title>السيرة الذاتية - محمد إبراهيم علي الناغي</title>
        <meta name="description" content="السيرة الذاتية للمرشح محمد إبراهيم علي الناغي - رقم 13 الحوت" />
      </Head>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-navy-800 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-cyber-grid" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-black mb-4" style={{ fontFamily: 'Cairo, sans-serif' }}>
              السيرة الذاتية
            </h1>
            <p className="text-2xl text-primary-100">رحلة خدمة وعطاء مستمر</p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          {/* Profile Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto mb-16"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative w-56 h-56 rounded-full overflow-hidden border-8 border-gold-400 shadow-2xl flex-shrink-0">
                  <Image 
                    src="/images/profile.jpg" 
                    alt="محمد الناغي"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="flex-1 text-center md:text-right">
                  <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3" style={{ fontFamily: 'Cairo, sans-serif' }}>
                    محمد إبراهيم علي الناغي
                  </h2>
                  <p className="text-2xl text-primary-700 font-bold mb-4">
                    مرشح مجلس النواب - رقم 13 🐋 الحوت
                  </p>
                  <p className="text-xl text-gray-600 mb-2">
                    دائرة منية النصر والكردي وميت سلسيل والجمالية - الدقهلية
                  </p>
                  <p className="text-lg text-gray-500">
                    ابن برمبال القديمة والرياض - مركز منية النصر
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Focus Areas */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-black text-center mb-10 text-gray-900" style={{ fontFamily: 'Cairo, sans-serif' }}>
              مجالات الاهتمام
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {focusAreas.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 border-t-4 border-gold-500"
                >
                  <div className="text-6xl text-primary-700 mx-auto mb-4">{area.icon}</div>
                  <h3 className="text-2xl font-black text-gray-900 mb-3">{area.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{area.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* About */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto mb-16"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <h2 className="text-4xl font-black text-gray-900 mb-8 text-center" style={{ fontFamily: 'Cairo, sans-serif' }}>
                نبذة عني
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                <p className="text-xl">
                  أنا محمد إبراهيم علي الناغي، ابن <strong className="text-primary-700">برمبال القديمة والرياض</strong> بمركز منية النصر بمحافظة الدقهلية. 
                  تعلّمت من أسرتي أن خدمة الناس شرف ومسؤولية، وأن احترام الوقت والكلمة أساس النجاح والعمل العام.
                </p>
                <p className="text-xl">
                  بدأت رحلتي في العمل المجتمعي مبكراً من خلال العمل مع الشباب، حيث كان لي شرف قيادة <strong className="text-primary-700">مركز شباب الرياض</strong> 
                  كرئيس لمجلس الإدارة، وبفضل الله ثم جهود فريق العمل المتميز، حصل المركز على <strong className="text-gold-600">المرتبة الأولى على مستوى الجمهورية</strong>. 
                  هذا الإنجاز لم يكن فردياً، بل كان نتاج عمل جماعي واهتمام حقيقي بتطوير قدرات شبابنا.
                </p>
                <p className="text-xl">
                  كما كان لي شرف تأسيس <strong className="text-primary-700">أول رابطة لمراكز شباب الدقهلية</strong>، وشغلت منصب رئيسها، حيث عملنا على 
                  تنسيق الجهود وتبادل الخبرات بين مراكز الشباب بالمحافظة لخدمة أبنائنا بشكل أفضل.
                </p>
                <p className="text-xl">
                  على المستوى المهني، أمضيت <strong className="text-primary-700">15 عاماً من العمل في جهة سيادية</strong> (سفارة المملكة العربية السعودية بدولة الكويت)، 
                  وهذه التجربة أكسبتني خبرة واسعة في العمل المؤسسي والإداري والتعامل مع مختلف الثقافات والبيئات.
                </p>
                <p className="text-xl">
                  أيضاً، شاركت في العمل السياسي والمجتمعي كأمين سابق <strong className="text-primary-700">لحزب مستقبل وطن</strong>، وحالياً أشغل منصب 
                  <strong className="text-primary-700"> أمين عام حزب الجبهة الوطنية</strong>، حيث أعمل على خدمة المواطنين والتواصل مع القواعد الشعبية.
                </p>
                <p className="text-xl border-r-4 border-gold-500 pr-6 italic bg-gray-50 p-4 rounded">
                  رؤيتي بسيطة: أن يحصل كل مواطن على حقه في <strong>تعليم جيد، ورعاية صحية لائقة، وفرصة عمل كريمة</strong>، وخدمات يومية تحفظ كرامته. 
                  أؤمن بالعمل المؤسسي القائم على التخطيط والمتابعة والمحاسبة، وبأن الإنجاز الحقيقي يُقاس بما يلمسه الناس في حياتهم اليومية.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Education */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto mb-16"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <h2 className="text-4xl font-black text-gray-900 mb-8 text-center" style={{ fontFamily: 'Cairo, sans-serif' }}>
                المؤهلات العلمية والتدريبية
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 p-6 bg-gradient-to-r from-primary-50 to-white rounded-xl border-r-4 border-primary-600"
                  >
                    <div className="text-4xl text-primary-700">{edu.icon}</div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">{edu.degree}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto mb-16"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <h2 className="text-4xl font-black text-gray-900 mb-8 text-center" style={{ fontFamily: 'Cairo, sans-serif' }}>
                الخبرات والمناصب
              </h2>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-6 border-r-4 border-gold-500 shadow-md hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-5xl text-primary-700 flex-shrink-0">{exp.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-black text-gray-900 mb-2">{exp.title}</h3>
                        <p className="text-gray-700 text-lg leading-relaxed mb-2">{exp.details}</p>
                        <span className="inline-block px-4 py-1 bg-gold-500 text-white text-sm font-bold rounded-full">
                          {exp.period}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <h2 className="text-4xl font-black text-gray-900 mb-8 text-center" style={{ fontFamily: 'Cairo, sans-serif' }}>
                الإنجازات والمساهمات
              </h2>
              <ul className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gold-600 text-3xl font-bold flex-shrink-0">✓</span>
                    <span className="text-gray-800 text-lg leading-relaxed">{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default BiographyPage;
