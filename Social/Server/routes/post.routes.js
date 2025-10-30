import express from 'express'
import { getAllPosts, uploadPost } from '../controllers/post.controllers.js'
import { upload } from '../middlewares/multer.js'
import isAuth from '../middlewares/isAuth.js'

const postRouter = express.Router()

postRouter.post('/uploadPost',isAuth, upload.single('mediaUrl') , uploadPost )
postRouter.get("/getAllPosts" , isAuth ,getAllPosts );


export default postRouter