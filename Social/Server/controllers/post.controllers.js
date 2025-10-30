import Post from '../model/post.model.js';
import User from '../model/user.model.js';
import uploadFile from "../config/cloudinary.js";

export const uploadPost = async (req,res)=>{
    try{
         const {mediaType, caption} = req.body
    let mediaUrl="";

    if(req.file){
        mediaUrl= await uploadFile(req.file.path)
    }
    else{
        return res.status(400).json({message:"Media file is required"})
    }


    if (!mediaUrl) {
      return res
        .status(500)
        .json({ message: "Failed to get media URL from Cloudinary" });
    }


    const post = await Post.create({mediaType, caption, mediaUrl,author:req.userId})
    const user = await User.findById(req.userId).populate('posts')
    user.posts.push(post._id)
    await user.save()

    
    const populatePost = await Post.findById(post._id).populate('author', 'userName profilePicture name')
   return res.status(201).send(populatePost)
    }
    catch(error){
        console.error(error);
        return res.status(500).json({message:"Server error"})
    }
    
}

export const getAllPosts = async (req, res) => {
  try {
    // Get current user with following list
    const currentUser = await User.findById(req.userId);
    
    // Create array of user IDs to fetch posts from (followed users + self)
    const userIds = [req.userId, ...currentUser.following];
    
    const posts = await Post.find({
      author: { $in: userIds }
    })
      .populate("author", "name userName profileImage")
      .sort({ createdAt: -1 }); // Latest posts first
    
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: `Cannot get posts error ${error}` });
  }
};