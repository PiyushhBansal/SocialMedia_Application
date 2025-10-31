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

export const like = async (req, res) => {
  // post id
  // userId
  // already liked the post - dislike
  // if not - like
  // userNamŵ
  const postId = req.params.postId;

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json({ message: "No post Found" });
  }

  // if this is already liked?
  // userId -> likes[] - all user Ids

  const alreadyLiked = post.likes.some(
    (id) => id.toString() === req.userId.toString()
  );

  if (alreadyLiked) {
    // post is already liked
    post.likes = post.likes.filter(
      (id) => id.toString() !== req.userId.toString()
    );
  } else {
    post.likes.push(req.userId);
  }

  await post.save();
  await post.populate("author", "userName");

  return res.status(200).json(post);
};


export const commentPost = async (req,res)=>{
    const postId = req.params.postId;
    const {commentText} = req.body  
    if(!commentText || commentText.trim() ===""){
        return res.status(400).json({message:"Comment text is required"})
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "No post Found" });
    }

    const comment = {  
        user: req.userId,
        text: commentText,
        createdAt: new Date()
    }

    post.comments.push(comment);
    await post.save();
    // await post.populate("comments.userId", "userName profilePicture");
    const populatedPost = await Post.findById(postId)
      .populate("author", "userName profileImage")
      .populate("comments.user", "userName profileImage");
    return res.status(200).json(populatedPost);
    
}