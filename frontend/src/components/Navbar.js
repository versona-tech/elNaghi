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
    { name: 'الأخبار', href: '/news' },
    { name: 'الفعاليات', href: '/events' },
    { name: 'الخدمات', href: '/services' },
    { name: 'اسأل المرشح', href: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 shadow-2xl backdrop-blur-md">
      {/* Top Bar - Futuristic Gradient */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-primary-950 via-purple-900 to-neon-900 text-white py-3 border-b-2 border-cyan-400 relative overflow-hidden"
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-20 bg-cyber-grid" style={{ backgroundSize: '50px 50px' }} />
        
        <div className="container-custom flex justify-between items-center text-sm relative z-10">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <span className="text-cyan-300 font-semibold text-lg">📍</span>
            <span className="font-medium text-gray-100">دائرة منية النصر والجمالية - محافظة الدقهلية</span>
          </motion.div>
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4"
          >
            <motion.a 
              href="#" 
              whileHover={{ scale: 1.3, rotate: 360 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="hover:text-cyan-400 transition-colors"
            >
              <FaFacebook size={18} className="drop-shadow-cyan-glow" />
            </motion.a>
            <motion.a 
              href="#" 
              whileHover={{ scale: 1.3, rotate: -360 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="hover:text-cyan-400 transition-colors"
            >
              <FaTwitter size={18} className="drop-shadow-cyan-glow" />
            </motion.a>
            <motion.a 
              href="#" 
              whileHover={{ scale: 1.3, rotate: 360 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="hover:text-neon-400 transition-colors"
            >
              <FaYoutube size={18} className="drop-shadow-pink-glow" />
            </motion.a>
            <motion.a 
              href="#" 
              whileHover={{ scale: 1.3, rotate: -360 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="hover:text-lime-400 transition-colors"
            >
              <FaWhatsapp size={18} />
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Navbar - Glassmorphism */}
      <div className="bg-white/80 backdrop-blur-xl shadow-glass border-b border-white/20">
        <div className="container-custom">
          <div className="flex justify-between items-center py-4">
            {/* Logo - Modern 2026 Design with Profile Photo */}
            <Link href="/" className="flex items-center gap-4 group">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="relative"
              >
                {/* Multi-layered Hexagon Background with Glow */}
                <div className="relative w-20 h-20 md:w-24 md:h-24">
                  {/* Outer glow ring */}
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute inset-0 blur-xl"
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <defs>
                        <linearGradient id="outerGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#22d3ee" />
                          <stop offset="50%" stopColor="#d946ef" />
                          <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                      </defs>
                      <polygon
                        points="50,5 90,25 90,75 50,95 10,75 10,25"
                        fill="url(#outerGlow)"
                        opacity="0.6"
                      />
                    </svg>
                  </motion.div>

                  {/* Main hexagon frame */}
                  <motion.div
                    animate={{ 
                      rotate: -360,
                    }}
                    transition={{ 
                      rotate: { duration: 25, repeat: Infinity, ease: "linear" }
                    }}
                    className="absolute inset-0"
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <defs>
                        <linearGradient id="logoFrame" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#6366f1" />
                          <stop offset="33%" stopColor="#22d3ee" />
                          <stop offset="66%" stopColor="#d946ef" />
                          <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                        <filter id="neonGlow">
                          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>
                      <polygon
                        points="50,5 90,25 90,75 50,95 10,75 10,25"
                        fill="none"
                        stroke="url(#logoFrame)"
                        strokeWidth="3"
                        filter="url(#neonGlow)"
                        className="drop-shadow-neon"
                      />
                    </svg>
                  </motion.div>

                  {/* Inner decorative hexagon */}
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ 
                      rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                      opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute inset-2"
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <polygon
                        points="50,10 85,27.5 85,72.5 50,90 15,72.5 15,27.5"
                        fill="url(#logoFrame)"
                        opacity="0.2"
                      />
                    </svg>
                  </motion.div>
                  
                  {/* Profile Photo in center */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="absolute inset-0 flex items-center justify-center p-2"
                  >
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/30 shadow-neon bg-gradient-to-br from-primary-900 to-primary-700">
                      {/* Profile Image - Always visible */}
                      <Image 
                        src="/images/profile.jpg" 
                        alt="محمد الناغي"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </motion.div>

                  {/* Animated particles */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                      style={{
                        top: '50%',
                        left: '50%',
                      }}
                      animate={{
                        x: [0, Math.cos(i * 60 * Math.PI / 180) * 40],
                        y: [0, Math.sin(i * 60 * Math.PI / 180) * 40],
                        opacity: [1, 0],
                        scale: [1, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Name with Futuristic Typography */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col"
              >
                <motion.h1 
                  className="text-3xl md:text-4xl font-black bg-gradient-to-r from-primary-600 via-cyan-500 to-neon-600 bg-clip-text text-transparent drop-shadow-lg"
                  style={{ fontFamily: 'Cairo, sans-serif' }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  محمد الناغي
                </motion.h1>
                <motion.p 
                  className="text-sm md:text-base font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                  style={{ fontFamily: 'Tajawal, sans-serif' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  مرشح مجلس الشعب - دائرة منية النصر والجمالية
                </motion.p>
              </motion.div>
            </Link>

            {/* Desktop Menu - Glassmorphism Style */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="hidden lg:flex items-center gap-2"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="relative px-4 py-2.5 text-gray-800 font-bold text-sm
                             rounded-xl transition-all duration-300
                             group overflow-hidden hover:scale-105"
                  >
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                      {link.name}
                    </span>
                    {/* Glass background on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-primary-600 to-neon-600 opacity-0 group-hover:opacity-100 rounded-xl"
                      initial={false}
                      transition={{ duration: 0.3 }}
                    />
                    {/* Neon bottom border */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-primary-500 to-neon-500 scale-x-0 group-hover:scale-x-100 rounded-full shadow-neon"
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Mobile Menu Button - Modern Design */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative p-3 rounded-xl bg-gradient-to-r from-primary-600 to-neon-600 text-white shadow-neon hover:shadow-neon-lg transition-all duration-300"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? 'close' : 'open'}
                  initial={{ rotate: 0, scale: 0 }}
                  animate={{ rotate: isOpen ? 180 : 0, scale: 1 }}
                  exit={{ rotate: 0, scale: 0 }}
                  transition={{ duration: 0.3, type: "spring" }}
                >
                  {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Menu - Futuristic Dropdown */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="lg:hidden overflow-hidden"
              >
                <div className="pb-6 space-y-3 px-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      transition={{ delay: index * 0.05, type: "spring" }}
                    >
                      <Link
                        href={link.href}
                        className="block px-6 py-4 text-gray-800 font-bold
                                 bg-gradient-to-r from-white/60 to-white/40
                                 backdrop-blur-md rounded-2xl
                                 hover:from-cyan-500 hover:to-neon-600
                                 hover:text-white
                                 transition-all duration-300
                                 border-2 border-white/30
                                 hover:border-cyan-400
                                 shadow-glass hover:shadow-neon
                                 transform hover:scale-105"
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
