import uploadFile from "../config/cloudinary.js";
import User from "../model/user.model.js";

export const getCurrentUser = async (req, res) => {
  const userId = req.userId;
  if (userId === undefined) {
    return res.status(401).json({ message: "Not authorized , no token" });
  }
  try {
    const verifiedUser = await User.findById(userId).select("-password");
    res.json(verifiedUser);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userName = req.params.userName;

    const user = await User.findOne({ userName }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" }); // Missing return statement
  }
};

export const editProfile = async (req,res)=>{
  try{

  const {userName, name , bio} =req.body
  const user = await  User.findById(req.userId)
  const existingUser = await User.findOne({ userName });
  if(existingUser && existingUser._id.toString() !== req.userId){
    return res.status(400).json({message:"Username already taken"})
  } 

  if(!user){
    return res.status(400).json({message:"user not found"})
  }

  let profileImage;
  if(req.file){
    profileImage= await uploadFile(req.file.path)
  }
  user.profilePicture=profileImage
  user.name=name
  user.userName=userName
  user.bio=bio

  await user.save()
  return res.status(200).json(user)
  }catch(error){
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

export const getSuggestedUsers = async(req,res)=>{
  try{
    const users = await User.find({_id:{$ne:req.userId}}).select("-password")
    return res.status(200).json(users)
  }catch(error){
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}