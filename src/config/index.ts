import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT || 5001
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/your-database'
export const TMDB_URI = process.env.TMDB_URI || 'https://api.themoviedb.org/3'