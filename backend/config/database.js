const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Remove elnagy_db from URI as it might cause issues
    const uri = process.env.MONGODB_URI;
    
    const conn = await mongoose.connect(uri, {
      dbName: 'elnagy_db', // Specify database name here instead
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      }
    });

    console.log(`MongoDB متصل: ${conn.connection.host}`);
    
    // Ping to confirm connection
    await mongoose.connection.db.admin().ping();
    console.log('تم التأكد من اتصال MongoDB بنجاح');
    
  } catch (error) {
    console.error(`خطأ في الاتصال بقاعدة البيانات: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
