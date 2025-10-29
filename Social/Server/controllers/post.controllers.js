import Post from '../model/post.model.js';
import User from '../model/user.model.js';
import uploadFile from "../config/cloudinary.js";

export const uploadPost = async (req,res)=>{
    const {mediaType, caption} = req.body
    let mediaUrl;

    if(req.file){
        mediaUrl= await uploadFile(req.file.path)
    }
    else{
        return res.status(400).json({message:"Media file is required"})
    }

    const post = await Post.create({mediaType, caption, mediaUrl,author:req.userId})
    const user = await User.findById(req.userId).populate('posts')
    user.posts.push(post._id)
    await user.save()

    const populatePost = await Post.findById(post._id).populate('author', 'userName profilePicture name')
   return res.status(201).send(populatePost)
}