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