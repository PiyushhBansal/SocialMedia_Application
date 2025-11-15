// src/pages/Home.jsx
import React from "react";
import LeftHome from "../components/LeftHome";
import Feed from "../components/Feed";
import Nav from "../components/Nav";
import SideNav from "../components/SideNav";

function Home() {
  return (
    <div
      className="
       w-full min-h-screen
        bg-black
        flex justify-center lg:justify-start
        px-2 sm:px-4 lg:px-10
        py-6
        text-white
      "
    >
      {/* Bottom navigation on mobile */}
      <Nav />

      {/* Left sidebar navigation on desktop (fixed) */}
      <SideNav />

      {/* Main content area (feed + suggestions) */}
      <div className="flex gap-4 w-full lg:max-w-[1200px] lg:ml-[260px] items-start">
        {/* Center feed */}
        <Feed />

        {/* Right suggestions / profile summary */}
        <LeftHome />
      </div>
    </div>
  );
}

export default Home;
