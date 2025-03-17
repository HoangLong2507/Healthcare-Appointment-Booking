import app from './app.js';
import dbconnection from './config/db.config.js';

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



const gracefulShutdown = async () => {
  server.close(() => {
    console.log('Express server closed');
  });

  await app.quitRedis();

  process.exit(0);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  gracefulShutdown();
});