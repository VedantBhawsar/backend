import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 5001;
export const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://localhost:27017/your-database';
export const TMDB_URI = process.env.TMDB_URI || 'https://api.themoviedb.org/3';
export const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
export const API_URL =
  process.env.API_URL || 'https://backend1-dv9d.onrender.com/';
