import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'
import authrouter from './routes/auth.routes.js'
import userrouter from './routes/user.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import postrouter from './routes/post.routes.js'
import followRouter from './routes/follower.routes.js'

const app = express()
const PORT = 8000 

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your client's origin
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded())

//Authentication routes
app.use('/api/auth', authrouter)
app.use('/api/user', userrouter)
app.use('/api/post', postrouter)
app.use('/api/follow', followRouter)

//Database connection



connectDB()

app.get('/', (req, res) => {
  res.send('Hello from the social server!')
})

app.listen(PORT, () => {
  console.log(`Social server is running on http://localhost:${PORT}`)
})