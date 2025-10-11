import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaGraduationCap, FaHospital, FaBriefcase, FaRoad, 
  FaFutbol, FaChartLine, FaArrowLeft, FaCalendar,
  FaNewspaper, FaHandHoldingHeart 
} from 'react-icons/fa';
import { newsAPI, eventsAPI, programAPI } from '@/lib/api';
import { mockNews, mockEvents, mockProgram } from '@/lib/mockData';
import SEO from '@/components/SEO';

export default function Home() {
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [program, setProgram] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [newsRes, eventsRes, programRes] = await Promise.all([
        newsAPI.getAll({ limit: 3, isFeatured: true }),
        eventsAPI.getAll({ limit: 3, upcoming: true }),
        programAPI.getAll({ limit: 6 })
      ]);
      
      setNews(newsRes.data.data || []);
      setEvents(eventsRes.data.data || []);
      setProgram(programRes.data.data || []);
    } catch (error) {
      console.error('Error fetching data, using mock data:', error);
      // استخدام بيانات تجريبية إذا فشل الاتصال بـ API
      setNews(mockNews);
      setEvents(mockEvents);
      setProgram(mockProgram);
    } finally {
      setLoading(false);
    }
  };

  const programIcons = {
    'تعليم': <FaGraduationCap />,
    'صحة': <FaHospital />,
    'تشغيل': <FaBriefcase />,
    'بنية تحتية': <FaRoad />,
    'شباب ورياضة': <FaFutbol />,
    'تنمية': <FaChartLine />
  };

  return (
    <>
      <SEO 
        title="محمد الناغي - رقم 13 🐋 الحوت | مرشح مجلس النواب دائرة منية النصر"
        description="الموقع الرسمي للمرشح محمد إبراهيم علي الناغي - الرمز الانتخابي: رقم 13 - الحوت 🐋 - مرشح مجلس النواب عن دائرة منية النصر والكردي وميت سلسيل والجمالية - محافظة الدقهلية. معاً نبني مستقبل أفضل لأبناء الدائرة."
        image="/images/og-image.jpg"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-700 to-primary-900 text-white py-24 md:py-36 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-0 right-0 w-96 h-96 bg-gold-400 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute bottom-0 left-0 w-96 h-96 bg-accent-400 rounded-full blur-3xl"
          />
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Election Symbol Badge - Whale */}
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
              className="flex justify-center mb-8"
            >
              <div className="relative group">
                <motion.div
                  animate={{ 
                    y: [0, -12, 0],
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative"
                >
                  {/* Glowing background - Gold & Navy */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold-500 to-gold-700 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity" />
                  
                  {/* Main badge */}
                  <div className="relative bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 backdrop-blur-sm rounded-3xl px-8 py-5 shadow-2xl border-4 border-gold-500 flex items-center gap-4">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.08, 1],
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="relative w-16 h-16 md:w-20 md:h-20"
                      style={{ filter: 'drop-shadow(0 0 12px rgba(217, 119, 6, 0.5))' }}
                    >
                      <Image 
                        src="/images/whale.png" 
                        alt="رمز الحوت"
                        fill
                        className="object-contain"
                        priority
                      />
                    </motion.div>
                    <div className="text-right">
                      <div className="text-xs md:text-sm font-bold text-gold-400 uppercase tracking-wide">الرمز الانتخابي</div>
                      <div className="flex items-center gap-3">
                        <div className="text-4xl md:text-5xl font-black text-gold-400" style={{ fontFamily: 'Cairo, sans-serif' }}>
                          13
                        </div>
                        <div className="text-2xl md:text-3xl font-black text-white flex items-center gap-2" style={{ fontFamily: 'Cairo, sans-serif' }}>
                          🐋 الحوت
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Crown sparkles */}
                <motion.div
                  animate={{ 
                    scale: [0, 1.2, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-3 -right-3 text-2xl"
                >
                  👑
                </motion.div>
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
              className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-gold-300 via-white to-gold-300 bg-clip-text text-transparent"
              style={{ fontFamily: 'Cairo, sans-serif' }}
            >
              محمد الناغي
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-3xl md:text-4xl mb-4 font-bold text-gold-200"
              style={{ fontFamily: 'Tajawal, sans-serif' }}
            >
              مرشح مجلس النواب عن دائرة منية النصر والكردي وميت سلسيل والجمالية
            </motion.p>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-2xl mb-10 text-primary-100"
            >
              برنامج واقعي • أولويات واضحة • التزام بالمحاسبة — معاً لنخدم أهلنا في الدائرة الكريمة بمحافظة الدقهلية
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-wrap gap-6 justify-center"
            >
              <Link href="/program" className="group relative px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold rounded-xl shadow-2xl hover:shadow-gold-500/50 transition-all duration-300 hover:scale-105 text-lg">
                <span className="relative z-10">تعرف على البرنامج الانتخابي</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gold-600 to-gold-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="/contact" className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105 text-lg">
                اسأل المرشح
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-primary-700 to-primary-900 bg-clip-text text-transparent" style={{ fontFamily: 'Cairo, sans-serif' }}>
                من أنا؟
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                أنا محمد الناغي، ابن قرية الرياض بمركز منية النصر. تربيت على خدمة الناس واحترام الكلمة
                والوفاء بالوعد. أضع مصلحة أهلي في مقدمة الأولويات، وأسعى لبرنامج عملي يبدأ من احتياجات
                المواطن اليومية: تعليم جيد، رعاية صحية لائقة، فرص عمل كريمة، وبنية تحتية تخدم الجميع.
                منهجي بسيط: استماع دقيق، حلول قابلة للتنفيذ، ومتابعة مستمرة حتى نرى الأثر على الأرض.
              </p>
              <Link href="/biography" className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-300 group shadow-lg hover:shadow-xl">
                اقرأ المزيد عن السيرة الذاتية
                <FaArrowLeft className="group-hover:-translate-x-2 transition-transform" />
              </Link>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { icon: FaHandHoldingHeart, title: 'المصداقية', desc: 'وعود واقعية قابلة للتنفيذ', gradient: 'from-primary-600 to-primary-800' },
                { icon: FaGraduationCap, title: 'الخبرة', desc: 'سنوات من العمل المجتمعي', gradient: 'from-gold-500 to-gold-700' },
                { icon: FaBriefcase, title: 'التنمية', desc: 'خطة شاملة للتطوير', gradient: 'from-prosperity-600 to-prosperity-800' },
                { icon: FaChartLine, title: 'النتائج', desc: 'إنجازات ملموسة', gradient: 'from-navy-600 to-navy-800' }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="bg-white rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r ${item.gradient} flex items-center justify-center shadow-lg`}>
                    <item.icon className="text-3xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Program Preview */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-primary-700 to-primary-900 bg-clip-text text-transparent" style={{ fontFamily: 'Cairo, sans-serif' }}>
              البرنامج الانتخابي
            </h2>
            <p className="text-xl text-gray-600">خطة عمل شاملة لتطوير الدائرة</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {program.slice(0, 6).map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-primary-600 group"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <div className="text-4xl text-white">
                    {programIcons[item.category] || <FaChartLine />}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-center">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/program" className="inline-block px-10 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold rounded-xl shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 hover:scale-105 text-lg">
              عرض البرنامج الكامل
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-between items-center mb-16"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary-700 to-primary-900 bg-clip-text text-transparent" style={{ fontFamily: 'Cairo, sans-serif' }}>
                أحدث الأخبار
              </h2>
              <p className="text-xl text-gray-600 mt-2">تابع المستجدات لحظة بلحظة وكن جزءاً من الحدث</p>
            </div>
            <Link href="/news" className="hidden md:inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-accent-600 to-accent-700 text-white font-bold rounded-lg hover:from-accent-700 hover:to-accent-800 transition-all duration-300 shadow-lg hover:shadow-xl">
              جميع الأخبار
              <FaArrowLeft />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.length > 0 ? news.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <Link href={`/news/${item._id}`} className="block bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group h-full">
                  <div className="p-8">
                    <div className="flex items-center gap-3 text-sm mb-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-primary-100 to-gold-100 text-primary-700 rounded-full font-semibold">
                        <FaNewspaper className="inline ml-1" />
                        {item.category}
                      </span>
                      <span className="text-gray-500">{new Date(item.publishedAt).toLocaleDateString('ar-EG')}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-3 leading-relaxed">
                      {item.summary || item.body}
                    </p>
                  </div>
                </Link>
              </motion.div>
            )) : (
              <div className="col-span-3 text-center text-gray-500 py-12">
                لا توجد أخبار حالياً — عد إلينا قريباً لمتابعة آخر المستجدات.
              </div>
            )}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link href="/news" className="btn-secondary">
              جميع الأخبار
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-primary-50">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="section-title">الفعاليات القادمة</h2>
              <p className="section-subtitle">شاركنا لقاءات مباشرة ونقاشات مفتوحة مع أبناء الدائرة</p>
            </div>
            <Link href="/events" className="btn-secondary hidden md:flex items-center gap-2">
              جميع الفعاليات
              <FaArrowLeft />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.length > 0 ? events.map((event) => (
              <div key={event._id} className="card">
                <div className="bg-primary-600 text-white p-4 text-center">
                  <div className="text-3xl font-bold">
                    {new Date(event.date).getDate()}
                  </div>
                  <div className="text-sm">
                    {new Date(event.date).toLocaleDateString('ar-EG', { month: 'long', year: 'numeric' })}
                  </div>
                </div>
                <div className="p-6">
                  <span className="inline-block bg-primary-100 text-primary-700 text-sm px-3 py-1 rounded-full mb-3">
                    {event.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                  <div className="flex items-center text-gray-500 text-sm gap-2">
                    <FaCalendar />
                    <span>{event.time}</span>
                    <span>•</span>
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-3 text-center text-gray-500 py-8">
                لا توجد فعاليات قادمة حالياً — سنعلن عن المواعيد الجديدة قريباً.
              </div>
            )}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link href="/events" className="btn-secondary">
              جميع الفعاليات
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">لديك سؤال أو مقترح؟</h2>
          <p className="text-xl mb-8 text-primary-100">
            نحن هنا للاستماع إليك والعمل على حل مشاكلك
          </p>
          <Link href="/contact" className="btn-primary bg-white text-primary-700 hover:bg-gray-100">
            تواصل معنا الآن
          </Link>
        </div>
      </section>
    </>
  );
}
