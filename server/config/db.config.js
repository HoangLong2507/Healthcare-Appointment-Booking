import mongoose from 'mongoose';

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

const dbconnection = mongoose.connect(DB, {}).then(con => {
  console.log('DB connection successful!');
});

export default dbconnection;

