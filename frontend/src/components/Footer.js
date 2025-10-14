import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  FaFacebook, FaTwitter, FaYoutube, FaWhatsapp, FaInstagram,
  FaPhone, FaEnvelope, FaMapMarkerAlt 
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'الرئيسية', href: '/' },
    { name: 'السيرة الذاتية', href: '/biography' },
    { name: 'البرنامج الانتخابي', href: '/program' },
    { name: 'الأخبار', href: '/news' },
    { name: 'الفعاليات', href: '/events' },
    { name: 'اتصل بنا', href: '/contact' },
  ];

  const services = [
    { name: 'الخريطة التفاعلية', href: '/map' },
    { name: 'الخدمات الحكومية', href: '/services' },
    { name: 'مكتبة الوعي السياسي', href: '/awareness' },
    { name: 'اسأل المرشح', href: '/contact' },
  ];

  const socialLinks = [
    { icon: FaFacebook, href: 'https://www.facebook.com/', color: 'from-blue-600 to-blue-700' },
    { icon: FaTwitter, href: 'https://twitter.com/', color: 'from-sky-500 to-sky-600' },
    { icon: FaYoutube, href: 'https://www.youtube.com/', color: 'from-red-600 to-red-700' },
    { icon: FaWhatsapp, href: 'https://wa.me/20', color: 'from-green-600 to-green-700' },
    { icon: FaInstagram, href: 'https://www.instagram.com/', color: 'from-pink-600 to-purple-600' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-3xl font-black bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent" style={{ fontFamily: 'Cairo, sans-serif' }}>
                محمد الناغي
              </h3>
              <motion.div
                animate={{ 
                  y: [0, -5, 0],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative w-9 h-9"
                style={{ filter: 'drop-shadow(0 0 8px rgba(217, 119, 6, 0.4))' }}
              >
                <Image 
                  src="/images/whale.png" 
                  alt="رمز الحوت"
                  fill
                  className="object-contain"
                />
              </motion.div>
            </div>
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-navy-800 to-navy-900 text-white border-2 border-gold-500 px-4 py-2 rounded-lg mb-4">
              <span className="text-2xl font-black text-gold-400" style={{ fontFamily: 'Cairo, sans-serif' }}>
                13
              </span>
              <span className="text-sm font-bold">
                🐋 الرمز الانتخابي: الحوت
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              مرشح مجلس النواب عن دائرة منية النصر والكردي وميت سلسيل والجمالية – محافظة الدقهلية.
              نلتزم ببرنامج واقعي يقيس الأثر على حياة الناس، وبالشفافية والمساءلة والعمل الميداني مع أبناء الدائرة.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`رابط ${social.icon.name}`}
                  className={`bg-gradient-to-r ${social.color} p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-6 text-gold-400">روابط سريعة</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-gold-400 transition-colors 
                             flex items-center gap-2 group"
                  >
                    <span className="text-primary-500 group-hover:translate-x-1 transition-transform">◄</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-6 text-gold-400">الخدمات</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link 
                    href={service.href}
                    className="text-gray-400 hover:text-gold-400 transition-colors 
                             flex items-center gap-2 group"
                  >
                    <span className="text-primary-500 group-hover:translate-x-1 transition-transform">◄</span>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-6 text-gold-400">اتصل بنا</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 hover:text-gold-400 transition-colors">
                <FaMapMarkerAlt className="text-primary-500 mt-1 flex-shrink-0" />
                <span>قرية برمبال القديمة والرياض - مركز منية النصر<br />محافظة الدقهلية</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 hover:text-gold-400 transition-colors">
                <FaPhone className="text-primary-500 flex-shrink-0" />
                <span className="text-left" dir="ltr">+20 XXX XXX XXXX</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 hover:text-gold-400 transition-colors">
                <FaEnvelope className="text-primary-500 flex-shrink-0" />
                <span>info@elnagy.com</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8 text-center"
        >
          <p className="text-gray-400 mb-2 text-lg">
            جميع الحقوق محفوظة © {currentYear} - <span className="font-bold text-gold-400">محمد الناغي</span>
          </p>
          <p className="text-sm text-gray-500">
            تم التطوير بواسطة <span className="text-primary-400 font-semibold">الفريق الرقمي للحملة</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
