import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import redisInstance from './utils/redis.js';
import schedule from './utils/schedule.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173', // Cung cấp chính xác domain mà frontend đang chạy
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Các phương thức HTTP được phép
    allowedHeaders: ['Content-Type', 'Authorization'], // Các header được phép
    credentials: true // Nếu bạn cần gửi cookie cùng với request
  }));

app.use('/api/v1', router);

app.use((err,req,res,next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';
  res.status(statusCode).json({
    status: status,
    message:err.message
  });
});

app.locals.redisClient = redisInstance;

app.quitRedis = async () => {
  try {
    await redisInstance.quit();
  } catch (err) {
    console.error('Error closing Redis:', err);
  }
};

schedule.notification_periodic.start();
schedule.rating_update_schedule.start();

export default app;