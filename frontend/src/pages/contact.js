import Head from 'next/head';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import { messagesAPI } from '@/lib/api';

const ContactPage = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await messagesAPI.create(data);
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ أثناء إرسال الرسالة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>اسأل المرشح - محمد الناغي</title>
        <meta name="description" content="تواصل مع مرشح مجلس الشعب محمد الناغي" />
      </Head>

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">اسأل المرشح</h1>
          <p className="text-xl text-primary-100">صوتك مهم — نقرأ كل رسالة ونتابع كل طلب باهتمام</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">أرسل رسالتك</h2>
                
                {success && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex items-center gap-3">
                    <FaCheckCircle className="text-2xl" />
                    <div>
                      <p className="font-semibold">تم إرسال رسالتك بنجاح!</p>
                      <p className="text-sm">سنتواصل معك في أقرب وقت</p>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label className="form-label">الاسم الكامل</label>
                    <input
                      type="text"
                      {...register('name', { required: 'الاسم مطلوب' })}
                      className="form-input"
                      placeholder="أدخل اسمك الكامل"
                    />
                    {errors.name && <p className="form-error">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="form-label">رقم الهاتف / البريد الإلكتروني</label>
                    <input
                      type="text"
                      {...register('contact', { required: 'معلومات الاتصال مطلوبة' })}
                      className="form-input"
                      placeholder="رقم الهاتف أو البريد الإلكتروني"
                    />
                    {errors.contact && <p className="form-error">{errors.contact.message}</p>}
                  </div>

                  <div>
                    <label className="form-label">نوع الرسالة</label>
                    <select
                      {...register('category')}
                      className="form-input"
                    >
                      <option value="استفسار">استفسار</option>
                      <option value="شكوى">شكوى</option>
                      <option value="مقترح">مقترح</option>
                      <option value="طلب مساعدة">طلب مساعدة</option>
                      <option value="أخرى">أخرى</option>
                    </select>
                  </div>

                  <div>
                    <label className="form-label">المنطقة / القرية (اختياري)</label>
                    <input
                      type="text"
                      {...register('location')}
                      className="form-input"
                      placeholder="اسم القرية أو المنطقة"
                    />
                  </div>

                  <div>
                    <label className="form-label">الرسالة</label>
                    <textarea
                      {...register('message', { 
                        required: 'الرسالة مطلوبة',
                        minLength: { value: 10, message: 'الرسالة يجب أن تكون 10 أحرف على الأقل' }
                      })}
                      className="form-input min-h-[150px]"
                      placeholder="اكتب رسالتك هنا..."
                    ></textarea>
                    {errors.message && <p className="form-error">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="spinner w-5 h-5 border-2"></div>
                        <span>جاري الإرسال...</span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        <span>إرسال الرسالة</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">معلومات التواصل</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary-100 text-primary-600 p-4 rounded-lg">
                      <FaMapMarkerAlt size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">العنوان</h3>
                      <p className="text-gray-600">
                        قرية الرياض - مركز منية النصر<br />
                        محافظة الدقهلية
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary-100 text-primary-600 p-4 rounded-lg">
                      <FaPhone size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">الهاتف</h3>
                      <p className="text-gray-600" dir="ltr">+20 XXX XXX XXXX</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary-100 text-primary-600 p-4 rounded-lg">
                      <FaEnvelope size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">البريد الإلكتروني</h3>
                      <p className="text-gray-600">info@elnagy.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-8 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
                <h3 className="text-2xl font-bold mb-4">مواعيد الاستقبال</h3>
                <p className="text-primary-100 mb-4">
                  نستقبل المواطنين يومياً للاستماع إلى مشاكلهم ومقترحاتهم
                </p>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span>السبت - الخميس</span>
                    <span>9:00 ص - 5:00 م</span>
                  </p>
                  <p className="flex justify-between">
                    <span>الجمعة</span>
                    <span>مغلق</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
