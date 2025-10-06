import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';
import { authAPI } from '@/lib/api';

const AdminLoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      router.push('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'خطأ في تسجيل الدخول');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>تسجيل الدخول - لوحة الإدارة</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">لوحة الإدارة</h1>
            <p className="text-primary-200">موقع المرشح محمد إبراهيم علي الناغي</p>
          </div>

          <div className="card p-8">
            <div className="text-center mb-6">
              <div className="inline-block bg-primary-100 p-4 rounded-full mb-4">
                <FaUser className="text-primary-600 text-4xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">تسجيل الدخول</h2>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="form-label">اسم المستخدم</label>
                <div className="relative">
                  <FaUser className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    {...register('username', { required: 'اسم المستخدم مطلوب' })}
                    className="form-input pr-10"
                    placeholder="أدخل اسم المستخدم"
                  />
                </div>
                {errors.username && <p className="form-error">{errors.username.message}</p>}
              </div>

              <div>
                <label className="form-label">كلمة المرور</label>
                <div className="relative">
                  <FaLock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    {...register('password', { required: 'كلمة المرور مطلوبة' })}
                    className="form-input pr-10"
                    placeholder="أدخل كلمة المرور"
                  />
                </div>
                {errors.password && <p className="form-error">{errors.password.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="spinner w-5 h-5 border-2"></div>
                    <span>جاري تسجيل الدخول...</span>
                  </>
                ) : (
                  <>
                    <FaSignInAlt />
                    <span>تسجيل الدخول</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

// Disable layout for login page
AdminLoginPage.getLayout = (page) => page;

export default AdminLoginPage;
