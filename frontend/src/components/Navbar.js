import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { FaBars, FaTimes, FaFacebook, FaTwitter, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: 'الرئيسية', href: '/' },
    { name: 'السيرة الذاتية', href: '/biography' },
    { name: 'البرنامج الانتخابي', href: '/program' },
    { name: 'اعرف لجنتك', href: '/polling-station' },
    { name: 'الأخبار', href: '/news' },
    { name: 'الفعاليات', href: '/events' },
    { name: 'الخدمات', href: '/services' },
    { name: 'اسأل المرشح', href: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 shadow-2xl backdrop-blur-md">
      {/* Top Bar - Professional Egyptian Colors */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-primary-800 via-primary-900 to-navy-800 text-white py-2 border-b-2 border-gold-500 relative overflow-hidden"
      >
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-cyber-grid" style={{ backgroundSize: '50px 50px' }} />
        
        <div className="container-custom flex justify-between items-center text-xs md:text-sm relative z-10">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <span className="text-gold-400 font-semibold">📍</span>
            <span className="font-medium text-gray-100 hidden md:inline">دائرة منية النصر والكردي وميت سلسيل والجمالية - محافظة الدقهلية</span>
            <span className="font-medium text-gray-100 md:hidden">دائرة منية النصر - الدقهلية</span>
          </motion.div>
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3"
          >
            <motion.a 
              href="#" 
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="hover:text-gold-400 transition-colors"
            >
              <FaFacebook size={16} />
            </motion.a>
            <motion.a 
              href="#" 
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="hover:text-gold-400 transition-colors"
            >
              <FaTwitter size={16} />
            </motion.a>
            <motion.a 
              href="#" 
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="hover:text-gold-400 transition-colors"
            >
              <FaYoutube size={16} />
            </motion.a>
            <motion.a 
              href="#" 
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="hover:text-gold-400 transition-colors"
            >
              <FaWhatsapp size={16} />
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Navbar - Clean & Professional */}
      <div className="bg-white shadow-lg border-b-2 border-gold-200">
        <div className="container-custom">
          <div className="flex justify-between items-center py-3">
            {/* Logo - Clean Professional Design */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="relative"
              >
                {/* Simplified Hexagon Logo */}
                <div className="relative w-14 h-14 md:w-16 md:h-16">
                  {/* Outer gold ring */}
                  <motion.div
                    animate={{ 
                      rotate: 360,
                    }}
                    transition={{ 
                      rotate: { duration: 30, repeat: Infinity, ease: "linear" }
                    }}
                    className="absolute inset-0"
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <defs>
                        <linearGradient id="logoFrame" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#ca8a04" />
                          <stop offset="50%" stopColor="#eab308" />
                          <stop offset="100%" stopColor="#ca8a04" />
                        </linearGradient>
                      </defs>
                      <polygon
                        points="50,5 90,25 90,75 50,95 10,75 10,25"
                        fill="none"
                        stroke="url(#logoFrame)"
                        strokeWidth="2.5"
                        className="drop-shadow-lg"
                      />
                    </svg>
                  </motion.div>
                  
                  {/* Profile Photo */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="absolute inset-0 flex items-center justify-center p-1.5"
                  >
                    <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-gold-400 shadow-lg bg-gradient-to-br from-primary-100 to-white">
                      <Image 
                        src="/images/profile.jpg" 
                        alt="محمد الناغي"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Name - Compact & Professional */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col"
              >
                <motion.h1 
                  className="text-xl md:text-2xl font-black bg-gradient-to-r from-primary-800 to-primary-600 bg-clip-text text-transparent"
                  style={{ fontFamily: 'Cairo, sans-serif' }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  محمد الناغي
                </motion.h1>
                <motion.p 
                  className="text-xs md:text-sm font-semibold text-navy-700 hidden md:block"
                  style={{ fontFamily: 'Cairo, sans-serif' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  مرشح مجلس النواب - دائرة منية النصر
                </motion.p>
                <motion.p 
                  className="text-xs font-semibold text-navy-700 md:hidden"
                  style={{ fontFamily: 'Cairo, sans-serif' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  مرشح مجلس النواب
                </motion.p>
              </motion.div>
            </Link>

            {/* Desktop Menu - Professional Style */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="hidden lg:flex items-center gap-1"
            >
              {navigation.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="relative px-4 py-2 text-gray-700 font-semibold text-sm
                             rounded-lg transition-all duration-300
                             hover:bg-gradient-to-r hover:from-primary-800 hover:to-primary-600
                             hover:text-white hover:scale-105"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Mobile Menu Button - Clean Design */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative p-2.5 rounded-lg bg-primary-800 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:bg-primary-700"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? 'close' : 'open'}
                  initial={{ rotate: 0, scale: 0 }}
                  animate={{ rotate: isOpen ? 180 : 0, scale: 1 }}
                  exit={{ rotate: 0, scale: 0 }}
                  transition={{ duration: 0.3, type: "spring" }}
                >
                  {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Menu - Clean Dropdown */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="lg:hidden overflow-hidden"
              >
                <div className="pb-4 space-y-2 px-2">
                  {navigation.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      transition={{ delay: index * 0.05, type: "spring" }}
                    >
                      <Link
                        href={link.href}
                        className="block px-5 py-3 text-gray-800 font-semibold text-sm
                                 bg-gray-50 rounded-lg
                                 hover:bg-gradient-to-r hover:from-primary-800 hover:to-primary-600
                                 hover:text-white
                                 transition-all duration-300
                                 border border-gray-200
                                 hover:border-gold-400
                                 shadow-sm hover:shadow-md
                                 transform hover:scale-102"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="flex items-center justify-between">
                          {link.name}
                          <span className="text-xs opacity-70">◄</span>
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
