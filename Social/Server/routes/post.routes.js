import express from 'express'
import { uploadPost } from '../controllers/post.controllers.js'
import { upload } from '../middlewares/multer.js'

const postRouter = express.Router()

postRouter.post('/uploadPost', upload.single('mediaUrl') , uploadPost )


export default postRouter