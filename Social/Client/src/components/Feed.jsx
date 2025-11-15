// src/components/FeedDesign.jsx
import React from "react";
import logo from "../assets/socialLogo.png";
import Nav from './Nav'
import { useSelector } from "react-redux";
import Post from "./Post";
import StoriesBar from "./StoriesBar";

function FeedDesign() {
  const {postData} = useSelector(state=>state.post)
  return (
    <div
      className="
        w-full min-h-screen 
        bg-black
        flex items-start justify-center
      "
    >
      <div className="w-[95%] lg:max-w-[85%] min-h-[90vh] rounded-2xl flex flex-col overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.25)] bg-black text-white">
        
        {/* Stories */}
        <div className="flex w-full overflow-x-auto gap-4 px-6 py-4 border-b border-neutral-800">
          <StoriesBar/>
        </div>


        {/* Feed Posts */}
        <div className="flex-1 w-full px-6 py-6 overflow-y-auto bg-neutral-950">
           {postData?.map((post)=>(
             <Post post={post}/>
           ))}
        </div>
      </div>
    </div>
  );
}

export default FeedDesign;
