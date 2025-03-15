import express from 'express';
import cors from 'cors';
import router from './routes/index.js';

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
  res.status(err.statusCode).json({
    status: err.status,
    message:err.message
  });
});

export default app;