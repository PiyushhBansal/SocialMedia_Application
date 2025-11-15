// src/components/SideNav.jsx
import React, { useState } from "react";
import logo from "../assets/logo2.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GoHomeFill } from "react-icons/go";
import { FiSearch, FiPlusSquare, FiSend } from "react-icons/fi";
import { RxVideo } from "react-icons/rx";
import { AiOutlineHeart } from "react-icons/ai";
import { IoClose } from "react-icons/io5";

function SideNav() {
  const navigate = useNavigate();
  const { userData, suggestedUsers } = useSelector((state) => state.user);

  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  const menuItemClass =
    "flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-neutral-900 cursor-pointer text-[15px]";

  const iconClass = "w-[26px] h-[26px]";

  return (
    <div
      className="hidden lg:flex flex-col justify-between fixed left-6 top-6
                 w-[240px] h-[90vh] bg-black text-white
                 rounded-2xl pt-2 pb-6 px-4
                 shadow-[0_10px_40px_rgba(0,0,0,0.35)] z-40"
    >
      {/* Top: logo + app name + menu */}
      <div>
        {/* Logo */}
        <div className="px-2 mb-8 flex items-center">
          <img src={logo} alt="Logo" className="w-[200px]" />
        </div>

        {/* Menu items */}
        <nav className="flex flex-col gap-1">
          <div
            className={menuItemClass}
            onClick={() => navigate("/home")}
          >
            <GoHomeFill className={iconClass} />
            <span>Home</span>
          </div>

          <div
            className={menuItemClass}
            onClick={() => setShowSearch(true)}
          >
            <FiSearch className={iconClass} />
            <span>Search</span>
          </div>

          <div
            className={menuItemClass}
            onClick={() => navigate("/reels")}
          >
            <RxVideo className={iconClass} />
            <span>Reels</span>
          </div>

          <div
            className={menuItemClass}
            onClick={() => navigate("/messages")}
          >
            <FiSend className={iconClass} />
            <span>Messages</span>
          </div>

          <div
            className={menuItemClass}
            onClick={() => {
              setShowNotifications(true);
              setShowSearch(false);
            }}
          >
            <AiOutlineHeart className={iconClass} />
            <span>Notifications</span>
          </div>

          <div
            className={menuItemClass}
            onClick={() => navigate("/upload")}
          >
            <FiPlusSquare className={iconClass} />
            <span>Create</span>
          </div>
        </nav>
      </div>

      {/* Search overlay */}
      {showSearch && (
        <div className="fixed inset-0 z-50 flex">
          {/* Left search panel */}
          <div className="w-[320px] sm:w-[360px] h-full bg-black border-r border-neutral-800 p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Search</h2>
              <IoClose
                className="w-6 h-6 cursor-pointer text-neutral-400 hover:text-white"
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery("");
                }}
              />
            </div>

            {/* Search input */}
            <div className="mb-4">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 focus-within:border-neutral-400">
                <FiSearch className="w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search users"
                  className="flex-1 bg-transparent outline-none text-sm text-white placeholder-neutral-500"
                />
              </div>
            </div>

            {/* Results list */}
            <div className="flex-1 overflow-y-auto mt-2">
              {(!suggestedUsers || suggestedUsers.length === 0) && (
                <p className="text-neutral-500 text-sm">
                  Start typing to search among suggested users.
                </p>
              )}

              {suggestedUsers && suggestedUsers.length > 0 && (
                <div className="flex flex-col gap-1">
                  {suggestedUsers
                    .filter((u) => {
                      if (!searchQuery.trim()) return true;
                      const q = searchQuery.toLowerCase();
                      return (
                        u.userName?.toLowerCase().includes(q) ||
                        u.name?.toLowerCase().includes(q)
                      );
                    })
                    .map((u) => (
                      <div
                        key={u._id}
                        onClick={() => {
                          navigate(`/profile/${u.userName}`);
                          setShowSearch(false);
                          setSearchQuery("");
                        }}
                        className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-neutral-900 cursor-pointer"
                      >
                        <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-800">
                          {u.profilePicture ? (
                            <img
                              src={u.profilePicture}
                              alt={u.userName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-neutral-400">
                              {u.userName?.[0]?.toUpperCase() || "U"}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{u.userName}</span>
                          {u.name && (
                            <span className="text-xs text-neutral-400">
                              {u.name}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>

          {/* Right dimmed area - click to close */}
          <div
            className="flex-1 bg-black/40"
            onClick={() => {
              setShowSearch(false);
              setSearchQuery("");
            }}
          />
        </div>
      )}

      {/* Notifications overlay */}
      {showNotifications && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="w-[340px] sm:w-[380px] h-full bg-black border-l border-neutral-800 p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Notifications</h2>
              <IoClose
                className="w-6 h-6 cursor-pointer text-neutral-400 hover:text-white"
                onClick={() => setShowNotifications(false)}
              />
            </div>

            <div className="flex gap-2 mb-4 text-sm">
              <button className="px-3 py-1 rounded-full bg-white text-black font-semibold">
                All
              </button>
              <button className="px-3 py-1 rounded-full bg-neutral-900 text-neutral-300">
                Likes
              </button>
              <button className="px-3 py-1 rounded-full bg-neutral-900 text-neutral-300">
                Follows
              </button>
            </div>

            <div className="flex-1 overflow-y-auto mt-1">
              <p className="text-neutral-500 text-sm">
                No notifications yet. When people like your posts, follow you,
                or interact with you, they will show up here.
              </p>
            </div>
          </div>

          {/* Click-through area to close */}
          <div
            className="flex-1"
            onClick={() => setShowNotifications(false)}
          />
        </div>
      )}
    </div>
  );
}

export default SideNav;
