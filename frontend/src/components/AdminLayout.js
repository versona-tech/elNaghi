import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { 
  FaHome, FaNewspaper, FaCalendar, FaEnvelope, FaImages, 
  FaClipboardList, FaSignOutAlt, FaBars, FaTimes, FaUser 
} from 'react-icons/fa';

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);

  useState(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/admin/login');
  };

  const menuItems = [
    { name: 'لوحة التحكم', href: '/admin/dashboard', icon: <FaHome /> },
    { name: 'الأخبار', href: '/admin/news', icon: <FaNewspaper /> },
    { name: 'الفعاليات', href: '/admin/events', icon: <FaCalendar /> },
    { name: 'الرسائل', href: '/admin/messages', icon: <FaEnvelope /> },
    { name: 'البرنامج الانتخابي', href: '/admin/program', icon: <FaClipboardList /> },
    { name: 'المكتبة الإعلامية', href: '/admin/media', icon: <FaImages /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`bg-gradient-to-b from-primary-800 to-primary-900 text-white transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-20'
      } flex flex-col`}>
        <div className="p-4 border-b border-primary-700">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div>
                <h2 className="text-xl font-bold">لوحة الإدارة</h2>
                <p className="text-sm text-primary-200">المرشح الناغي</p>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white hover:bg-primary-700 p-2 rounded transition-colors"
            >
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        <nav className="flex-1 py-6">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-3 hover:bg-primary-700 transition-colors ${
                router.pathname === item.href ? 'bg-primary-700 border-r-4 border-white' : ''
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-primary-700">
          {sidebarOpen && user && (
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <FaUser className="text-2xl" />
                <div>
                  <p className="font-semibold">{user.fullName}</p>
                  <p className="text-xs text-primary-200">{user.role}</p>
                </div>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition-colors"
          >
            <FaSignOutAlt />
            {sidebarOpen && <span>تسجيل الخروج</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
