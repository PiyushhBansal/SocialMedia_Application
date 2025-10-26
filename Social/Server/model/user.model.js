import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name:{ type: String, required: true},
  userName: { type: String, required: true, unique: true }, 
  email:{ type: String, required: true, unique: true},
  password:{ type: String, required: true},
  profilePicture:{ type: String , default: ""},
  bio:{ type: String , default: ""},
  followers:[],
  following:[],
  reels:[],
  posts:[],
  stories:[]
});

const User = mongoose.model("user", userSchema);

export default User;