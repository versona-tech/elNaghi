const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// MongoDB Connection
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db('elnagy_db');
  cachedDb = db;
  return db;
}

// CORS Headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Content-Type': 'application/json',
};

// Helper: Extract token from request
function getToken(event) {
  const authHeader = event.headers.authorization || event.headers.Authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
}

// Helper: Verify JWT token
function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'elnagy-secret-2026');
  } catch (error) {
    return null;
  }
}

// Main Handler
exports.handler = async (event, context) => {
  // Handle OPTIONS (CORS preflight)
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const db = await connectToDatabase();
    const path = event.path.replace('/.netlify/functions/api', '');
    const method = event.httpMethod;
    const body = event.body ? JSON.parse(event.body) : {};

    // ============================================
    // ROOT: GET /
    // ============================================
    if (path === '/' && method === 'GET') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          message: 'El-Nagy Campaign API - Netlify Functions',
          version: '1.0.0',
          status: 'running',
        }),
      };
    }

    // ============================================
    // AUTH: POST /api/auth/login
    // ============================================
    if (path === '/api/auth/login' && method === 'POST') {
      const { email, password } = body;

      if (!email || !password) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ message: 'البريد وكلمة المرور مطلوبان' }),
        };
      }

      const user = await db.collection('users').findOne({ email });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ message: 'بيانات الدخول غير صحيحة' }),
        };
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET || 'elnagy-secret-2026',
        { expiresIn: '7d' }
      );

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          token,
          user: { email: user.email, name: user.name },
        }),
      };
    }

    // ============================================
    // NEWS: GET /api/news
    // ============================================
    if (path === '/api/news' && method === 'GET') {
      const news = await db
        .collection('news')
        .find({})
        .sort({ createdAt: -1 })
        .limit(50)
        .toArray();

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(news),
      };
    }

    // NEWS: POST /api/news (Protected)
    if (path === '/api/news' && method === 'POST') {
      const token = getToken(event);
      const decoded = verifyToken(token);

      if (!decoded) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ message: 'غير مصرح' }),
        };
      }

      const { title, content, image } = body;
      const newsItem = {
        title,
        content,
        image: image || '/images/news-default.jpg',
        createdAt: new Date(),
      };

      const result = await db.collection('news').insertOne(newsItem);

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({ ...newsItem, _id: result.insertedId }),
      };
    }

    // ============================================
    // EVENTS: GET /api/events
    // ============================================
    if (path === '/api/events' && method === 'GET') {
      const events = await db
        .collection('events')
        .find({})
        .sort({ date: -1 })
        .limit(50)
        .toArray();

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(events),
      };
    }

    // EVENTS: POST /api/events (Protected)
    if (path === '/api/events' && method === 'POST') {
      const token = getToken(event);
      const decoded = verifyToken(token);

      if (!decoded) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ message: 'غير مصرح' }),
        };
      }

      const { title, description, date, location } = body;
      const eventItem = {
        title,
        description,
        date: new Date(date),
        location,
        createdAt: new Date(),
      };

      const result = await db.collection('events').insertOne(eventItem);

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({ ...eventItem, _id: result.insertedId }),
      };
    }

    // ============================================
    // PROGRAM: GET /api/program
    // ============================================
    if (path === '/api/program' && method === 'GET') {
      const program = await db.collection('programs').findOne({});

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(program || {}),
      };
    }

    // ============================================
    // MESSAGES: POST /api/messages
    // ============================================
    if (path === '/api/messages' && method === 'POST') {
      const { name, email, phone, message } = body;

      if (!name || !message) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ message: 'الاسم والرسالة مطلوبان' }),
        };
      }

      const messageItem = {
        name,
        email,
        phone,
        message,
        createdAt: new Date(),
        read: false,
      };

      const result = await db.collection('messages').insertOne(messageItem);

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({ message: 'تم إرسال رسالتك بنجاح', id: result.insertedId }),
      };
    }

    // MESSAGES: GET /api/messages (Protected)
    if (path === '/api/messages' && method === 'GET') {
      const token = getToken(event);
      const decoded = verifyToken(token);

      if (!decoded) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ message: 'غير مصرح' }),
        };
      }

      const messages = await db
        .collection('messages')
        .find({})
        .sort({ createdAt: -1 })
        .limit(100)
        .toArray();

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(messages),
      };
    }

    // ============================================
    // SEED: POST /api/seed (Development only)
    // ============================================
    if (path === '/api/seed' && method === 'POST') {
      // Check if already seeded
      const existingUser = await db.collection('users').findOne({ email: 'admin' });
      
      if (existingUser) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ message: 'البيانات موجودة بالفعل' }),
        };
      }

      // Create admin user
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await db.collection('users').insertOne({
        email: 'admin',
        password: hashedPassword,
        name: 'المسؤول',
        role: 'admin',
        createdAt: new Date(),
      });

      // Add sample news
      await db.collection('news').insertMany([
        {
          title: 'انطلاق الحملة الانتخابية',
          content: 'بدأت اليوم الحملة الانتخابية الرسمية للمرشح محمد الناغي...',
          image: '/images/news1.jpg',
          createdAt: new Date(),
        },
        {
          title: 'لقاء مع الناخبين',
          content: 'عقد المرشح محمد الناغي لقاءً موسعاً مع الناخبين...',
          image: '/images/news2.jpg',
          createdAt: new Date(Date.now() - 86400000),
        },
        {
          title: 'البرنامج الانتخابي الكامل',
          content: 'تم الإعلان عن البرنامج الانتخابي الكامل...',
          image: '/images/news3.jpg',
          createdAt: new Date(Date.now() - 172800000),
        },
      ]);

      // Add sample events
      await db.collection('events').insertMany([
        {
          title: 'لقاء جماهيري',
          description: 'لقاء مفتوح مع المواطنين',
          date: new Date(Date.now() + 86400000),
          location: 'القاعة الكبرى',
          createdAt: new Date(),
        },
        {
          title: 'ندوة حوارية',
          description: 'ندوة حول المستقبل والتنمية',
          date: new Date(Date.now() + 172800000),
          location: 'النادي الثقافي',
          createdAt: new Date(),
        },
      ]);

      // Add program
      await db.collection('programs').insertOne({
        title: 'برنامج محمد الناغي الانتخابي',
        sections: [
          {
            title: 'التعليم',
            points: ['تطوير المدارس', 'تدريب المعلمين', 'التعليم الرقمي'],
          },
          {
            title: 'الصحة',
            points: ['تحسين الخدمات', 'توفير الأدوية', 'دعم المستشفيات'],
          },
          {
            title: 'التنمية',
            points: ['مشاريع البنية التحتية', 'دعم الشباب', 'فرص العمل'],
          },
        ],
        createdAt: new Date(),
      });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: 'تم إضافة البيانات الأولية بنجاح' }),
      };
    }

    // ============================================
    // 404: Route not found
    // ============================================
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ message: 'المسار غير موجود' }),
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'خطأ في الخادم', error: error.message }),
    };
  }
};
