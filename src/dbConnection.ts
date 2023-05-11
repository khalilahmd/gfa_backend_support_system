import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDatabase = () => {
  const uri = process.env.DATABASE_URI || 'mongodb://localhost/gfa-support';
  mongoose.connect(uri);

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log("Connected successfully to server");
  });
};
