import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FaBook, FaGavel, FaVoteYea, FaUsers, FaBalanceScale, 
  FaHandshake, FaLightbulb, FaChartLine, FaGraduationCap,
  FaNewspaper, FaFileAlt, FaQuestionCircle
} from 'react-icons/fa';
import SEO from '@/components/SEO';

export default function Awareness() {
  const awarenessTopics = [
    {
      icon: FaGavel,
      title: 'الدستور المصري',
      description: 'فهم الدستور المصري وحقوقك الأساسية كمواطن',
      color: 'from-primary-600 to-primary-800',
      articles: 5
    },
    {
      icon: FaVoteYea,
      title: 'العملية الانتخابية',
      description: 'كيفية المشاركة في الانتخابات وممارسة حقك الانتخابي',
      color: 'from-gold-600 to-gold-700',
      articles: 4
    },
    {
      icon: FaBalanceScale,
      title: 'حقوقك القانونية',
      description: 'التعرف على حقوقك وواجباتك القانونية',
      color: 'from-prosperity-600 to-prosperity-700',
      articles: 6
    },
    {
      icon: FaUsers,
      title: 'المشاركة المجتمعية',
      description: 'دورك في المجتمع وكيفية المساهمة في التنمية',
      color: 'from-navy-600 to-navy-800',
      articles: 4
    },
    {
      icon: FaHandshake,
      title: 'الشفافية والمساءلة',
      description: 'حقك في معرفة أداء ممثليك ومحاسبتهم',
      color: 'from-primary-700 to-primary-900',
      articles: 3
    },
    {
      icon: FaChartLine,
      title: 'التنمية المستدامة',
      description: 'فهم أهداف التنمية المستدامة ودورك فيها',
      color: 'from-gold-500 to-gold-700',
      articles: 4
    }
  ];

  const resources = [
    {
      icon: FaBook,
      title: 'مكتبة القوانين',
      description: 'أهم القوانين التي تهمك كمواطن',
      link: '#'
    },
    {
      icon: FaNewspaper,
      title: 'النشرة الدورية',
      description: 'آخر التحديثات القانونية والتشريعية',
      link: '#'
    },
    {
      icon: FaFileAlt,
      title: 'الأدلة الإرشادية',
      description: 'أدلة عملية لفهم حقوقك وواجباتك',
      link: '#'
    },
    {
      icon: FaQuestionCircle,
      title: 'الأسئلة الشائعة',
      description: 'إجابات على أكثر الأسئلة شيوعاً',
      link: '#'
    }
  ];

  const upcomingWorkshops = [
    {
      title: 'ورشة عمل: حقوقك الانتخابية',
      date: '15 أكتوبر 2025',
      location: 'قاعة المؤتمرات - منية النصر',
      seats: '50 مقعد متاح'
    },
    {
      title: 'ندوة: دور الشباب في التنمية',
      date: '22 أكتوبر 2025',
      location: 'مركز الشباب - الكردي',
      seats: '80 مقعد متاح'
    },
    {
      title: 'محاضرة: الدستور والمواطنة',
      date: '5 نوفمبر 2025',
      location: 'نادي ميت سلسيل',
      seats: '100 مقعد متاح'
    }
  ];

  return (
    <>
      <SEO 
        title="مكتبة الوعي السياسي والمجتمعي"
        description="مكتبة شاملة للوعي السياسي والمجتمعي - تعرف على حقوقك وواجباتك كمواطن في دائرة منية النصر والكردي وميت سلسيل والجمالية"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-navy-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-cyber-grid" style={{ backgroundSize: '50px 50px' }} />
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-3 bg-gold-500/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6 border border-gold-400/30">
              <FaGraduationCap className="text-gold-400 text-2xl" />
              <span className="text-gold-300 font-semibold">مكتبة الوعي السياسي</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 bg-clip-text text-transparent">
                معرفتك هي قوتك
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              هنا تجد معرفة مبسّطة وموثوقة تساعدك على ممارسة حقوقك والمطالبة بخدماتك وفهم دورك في الرقابة والمساءلة.
              مواطن واعٍ يعني مجتمع أقوى ودائرة أكثر تقدماً.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Topics */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black mb-4">
              <span className="bg-gradient-to-r from-primary-700 to-gold-600 bg-clip-text text-transparent">
                موضوعات رئيسية
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              مواد موجّهة بلغة بسيطة وأمثلة من واقعنا المحلي لشرح المفاهيم الأساسية.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {awarenessTopics.map((topic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-gold-400">
                  <div className={`bg-gradient-to-br ${topic.color} p-6 text-white`}>
                    <topic.icon className="text-5xl mb-4 opacity-90" />
                    <h3 className="text-2xl font-bold mb-2">{topic.title}</h3>
                    <div className="flex items-center gap-2 text-sm opacity-90">
                      <FaFileAlt />
                      <span>{topic.articles} مقالات</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {topic.description}
                    </p>
                    <button className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg">
                      اقرأ المزيد
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-navy-900 to-primary-900 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black mb-4">
              <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
                الموارد والمصادر
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              مصادر مختارة بعناية لتبقى على اطلاع بالقوانين والتحديثات والإجراءات.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <motion.a
                key={index}
                href={resource.link}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-gold-400 hover:bg-white/15 transition-all duration-300 cursor-pointer group"
              >
                <resource.icon className="text-4xl text-gold-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-gold-300 transition-colors">
                  {resource.title}
                </h3>
                <p className="text-gray-300 text-sm">
                  {resource.description}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Workshops */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black mb-4">
              <span className="bg-gradient-to-r from-primary-700 to-prosperity-600 bg-clip-text text-transparent">
                ورش العمل القادمة
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              انضم إلينا في ورش العمل والندوات التوعوية
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {upcomingWorkshops.map((workshop, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border-r-4 border-gold-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary-600"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {workshop.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <FaBook className="text-primary-600" />
                        <span>{workshop.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaUsers className="text-prosperity-600" />
                        <span>{workshop.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="bg-gold-100 text-gold-800 px-4 py-2 rounded-full text-sm font-bold">
                      {workshop.seats}
                    </span>
                    <button className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-6 py-2 rounded-lg font-bold transition-all duration-300 shadow-md hover:shadow-lg">
                      سجل الآن
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-700 via-gold-600 to-prosperity-700 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <FaLightbulb className="text-6xl mx-auto mb-6 animate-pulse" />
            <h2 className="text-4xl font-black mb-6">
              لديك سؤال؟ نحن هنا للمساعدة
            </h2>
            <p className="text-xl mb-8 text-white/90">
              تواصل معنا للحصول على مزيد من المعلومات أو المشاركة في برامج التوعية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-primary-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                اتصل بنا
              </Link>
              <Link
                href="/events"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-primary-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                تصفح الفعاليات
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
