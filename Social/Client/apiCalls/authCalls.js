import axios from "axios";
import { API_BASE_URL } from "./config";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// route - /api/auth/signup

export const signUpUser = async ({ name, userName, email, password }) => {
  console.log(name, userName, password, email);
  try {
    const response = await api.post("/api/auth/signup", {
      name,
      userName,
      email,
      password,
    });

    console.log(response);
    return response.data; // return just the data
  }catch (error) {
    console.error("Signup API Error:", error); // debug in console
    throw error.response?.data?.message || error.message || "Something went wrong";
  }
};

export const signInUser = async ({ userName, password }) => {
  try {
    const response = await api.post("/api/auth/signin", {
      userName,
      password,
    });

    console.log(response);
    return response.data; // return just the data
  } catch (error) {
    // standardize error handling
    throw error.response?.data?.message || "Something went wrong";
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get("/api/user/current", {withCredentials:true});
    console.log(response);
    return response.data; // return just the data
  } catch (error) {
    // standardize error handling
    throw error.response?.data?.message || "Something went wrong";
  }
};

export const getProfile = async (userName) => {
  try {
    const response = await api.get(`/api/user/getprofile/${userName}`, {withCredentials:true});
    console.log(response);
    return response.data; // return just the data
  } catch (error) {
    // standardize error handling
    throw error.response?.data?.message || "Something went wrong";
  }
};

export const editProfile = async (formData) => {
  try {
    const response = await api.post(`/api/user/editprofile/`, formData , {withCredentials:true});
    console.log(response);
    return response.data; // return just the data
  } catch (error) {
    // standardize error handling
    throw error.response?.data?.message || "Something went wrong";
  }
};


export const createPost = async (formData)=>{
    try {
    const response = await api.post(`/api/post/uploadPost/`, formData , {withCredentials:true});
    console.log(response);
    return response.data; // return just the data
  } catch (error) {
    // standardize error handling
    throw error.response?.data?.message || "Something went wrong";
  }
}

export const getAllPosts = async ()=>{
    try {
    const response = await api.get(`/api/post/getAllPosts`,  {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch Posts";
  } 
}

export const likePost = async (postId)=>{
    try {
    const response = await api.post(`/api/post/like/${postId}`, {} , { withCredentials: true});
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to Like Post";
  } 
}
export const commentPost = async (postId, commentText )=>{
    try {
    const response = await api.post(`/api/post/comment/${postId}`, { commentText } , { withCredentials: true});
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to Comment on Post";
  } 
}


export const followUser = async (userId) => {
  try {
    const response = await api.post(`/api/follow/${userId}`, {}, { withCredentials: true })
    return response.data
  } catch (error) {
    throw error.response?.data?.message || "Failed to follow user";
  }
}

export const unfollowUser = async (userId) => {
  try {
    const response = await api.post(`/api/follow/unfollow/${userId}`, {}, { withCredentials: true })
    return response.data
  } catch (error) {
    throw error.response?.data?.message || "Failed to unfollow user";
  }
}

export const getFollowStatus = async (userId) => {
  try {
    const response = await api.get(`/api/follow/status/${userId}`, { withCredentials: true })
    return response.data
  } catch (error) {
    throw error.response?.data?.message || "Failed to get follow status";
  }
}
export const getSuggestions = async () => {
  try {
    const res = await api.get("/api/user/suggestedUsers");
    return res.data;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    throw error;
  }
};