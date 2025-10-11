import Head from 'next/head';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaCalendar, FaMapMarkerAlt, FaClock, FaUsers, FaFacebook, FaHeart, FaComment, FaShare, FaPlay, FaImage, FaVideo } from 'react-icons/fa';
import { eventsAPI, facebookAPI } from '@/lib/api';
import { motion } from 'framer-motion';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpcoming, setShowUpcoming] = useState(true);
  
  // Facebook content
  const [facebookPosts, setFacebookPosts] = useState([]);
  const [facebookPhotos, setFacebookPhotos] = useState([]);
  const [facebookVideos, setFacebookVideos] = useState([]);
  const [activeTab, setActiveTab] = useState('posts'); // posts, photos, videos
  const [fbLoading, setFbLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
    fetchFacebookContent();
  }, [showUpcoming]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await eventsAPI.getAll({ 
        upcoming: showUpcoming,
        limit: 20 
      });
      setEvents(response.data.data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFacebookContent = async () => {
    setFbLoading(true);
    try {
      // Fetch all content types in parallel
      const [postsRes, photosRes, videosRes] = await Promise.all([
        facebookAPI.getPosts({ limit: 12 }),
        facebookAPI.getPhotos({ limit: 12 }),
        facebookAPI.getVideos({ limit: 8 })
      ]);

      setFacebookPosts(postsRes.data.data || []);
      setFacebookPhotos(photosRes.data.data || []);
      setFacebookVideos(videosRes.data.data || []);
    } catch (error) {
      console.error('Error fetching Facebook content:', error);
    } finally {
      setFbLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'اليوم';
    if (days === 1) return 'أمس';
    if (days < 7) return `منذ ${days} أيام`;
    if (days < 30) return `منذ ${Math.floor(days / 7)} أسابيع`;
    return date.toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <>
      <Head>
        <title>الفعاليات - محمد إبراهيم علي الناغي</title>
        <meta name="description" content="آخر الفعاليات والأخبار من صفحة المرشح محمد إبراهيم علي الناغي على الفيسبوك" />
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
            <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: 'Cairo, sans-serif' }}>
              الفعاليات والأنشطة
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-6">
              تابع آخر الأخبار والفعاليات من الصفحة الرسمية على الفيسبوك
            </p>
            <a 
              href="https://www.facebook.com/profile.php?id=100064061133842"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <FaFacebook size={24} />
              <span>تابعنا على فيسبوك</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Facebook Content Tabs */}
      <section className="bg-white border-b-2 border-gray-200 sticky top-0 z-40 shadow-md">
        <div className="container-custom">
          <div className="flex gap-2 md:gap-4 py-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab('posts')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm md:text-base whitespace-nowrap transition-all ${
                activeTab === 'posts'
                  ? 'bg-gradient-to-r from-primary-800 to-primary-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FaFacebook />
              <span>المنشورات</span>
              {facebookPosts.length > 0 && (
                <span className="bg-white text-primary-800 px-2 py-0.5 rounded-full text-xs font-black">
                  {facebookPosts.length}
                </span>
              )}
            </button>
            
            <button
              onClick={() => setActiveTab('photos')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm md:text-base whitespace-nowrap transition-all ${
                activeTab === 'photos'
                  ? 'bg-gradient-to-r from-primary-800 to-primary-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FaImage />
              <span>الصور</span>
              {facebookPhotos.length > 0 && (
                <span className="bg-white text-primary-800 px-2 py-0.5 rounded-full text-xs font-black">
                  {facebookPhotos.length}
                </span>
              )}
            </button>
            
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm md:text-base whitespace-nowrap transition-all ${
                activeTab === 'videos'
                  ? 'bg-gradient-to-r from-primary-800 to-primary-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FaVideo />
              <span>الفيديوهات</span>
              {facebookVideos.length > 0 && (
                <span className="bg-white text-primary-800 px-2 py-0.5 rounded-full text-xs font-black">
                  {facebookVideos.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Facebook Posts Tab */}
      {activeTab === 'posts' && (
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            {fbLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="spinner"></div>
              </div>
            ) : facebookPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {facebookPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                  >
                    {post.full_picture && (
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={post.full_picture}
                          alt="صورة المنشور"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                          <FaFacebook size={14} />
                          <span>فيسبوك</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <FaCalendar />
                        <span>{formatDate(post.created_time)}</span>
                      </div>
                      
                      <p className="text-gray-800 leading-relaxed mb-4 line-clamp-4">
                        {post.message || post.story || 'منشور من الحملة الانتخابية'}
                      </p>
                      
                      <a
                        href={post.permalink_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary-700 hover:text-primary-900 font-bold transition-colors"
                      >
                        <span>عرض على فيسبوك</span>
                        <span>←</span>
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <FaFacebook size={60} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">لا توجد منشورات متاحة حالياً</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Facebook Photos Tab */}
      {activeTab === 'photos' && (
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            {fbLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="spinner"></div>
              </div>
            ) : facebookPhotos.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {facebookPhotos.map((photo) => (
                  <motion.a
                    key={photo.id}
                    href={photo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                  >
                    <img
                      src={photo.images?.[0]?.source || photo.picture}
                      alt={photo.name || 'صورة من الحملة'}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white text-sm font-semibold line-clamp-2">
                          {photo.name || 'صورة من الحملة الانتخابية'}
                        </p>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <FaImage size={60} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">لا توجد صور متاحة حالياً</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Facebook Videos Tab */}
      {activeTab === 'videos' && (
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            {fbLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="spinner"></div>
              </div>
            ) : facebookVideos.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {facebookVideos.map((video) => (
                  <motion.a
                    key={video.id}
                    href={video.permalink_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                  >
                    <div className="relative h-56 bg-gray-900 overflow-hidden">
                      <img
                        src={video.picture}
                        alt={video.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                          <FaPlay className="text-white text-2xl ml-1" />
                        </div>
                      </div>
                      {video.length && (
                        <div className="absolute bottom-4 left-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-bold">
                          {Math.floor(video.length / 60)}:{String(video.length % 60).padStart(2, '0')}
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <FaCalendar />
                        <span>{formatDate(video.created_time)}</span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {video.title || 'فيديو من الحملة الانتخابية'}
                      </h3>
                      
                      {video.description && (
                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                          {video.description}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-2 text-primary-700 font-bold">
                        <FaPlay size={14} />
                        <span>مشاهدة الفيديو</span>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <FaVideo size={60} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">لا توجد فيديوهات متاحة حالياً</p>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default EventsPage;
