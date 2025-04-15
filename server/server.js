import app from './app.js';
import dbconnection from './config/db.config.js';

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on('SIGINT', async () => {
  await app.quitRedis(); 
  process.exit(0);  
});

