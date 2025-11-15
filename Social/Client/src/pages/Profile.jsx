import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData } from "../redux/userSlice";
import logo from "../assets/socialLogo.png";
import Nav from "../components/Nav";
import SideNav from "../components/SideNav";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import {
  getProfile,
  getFollowStatus,
  followUser,
  unfollowUser,
  getUserPosts,
} from "../../apiCalls/authCalls";

function Profile() {
  const { userName } = useParams();
  const dispatch = useDispatch();
  const { profileData, userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [userPosts, setUserPosts] = useState([]);

  // Determine if this profile belongs to the logged-in user
  const isOwnProfile =
    !!profileData &&
    !!userData &&
    profileData.userName === userData.userName;

  const handleProfile = async (userName) => {
    try {
      const result = await getProfile(userName);
      dispatch(setProfileData(result));
      setFollowersCount(result.followers?.length || 0);

      // Fetch this user's posts
      const posts = await getUserPosts(result._id);
      setUserPosts(posts || []);

      // Check follow status if not own profile
      if (!isOwnProfile) {
        const statusResult = await getFollowStatus(result._id);
        setIsFollowing(statusResult.isFollowing);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const handleFollowToggle = async () => {
    if (!profileData?._id || followLoading) return;

    setFollowLoading(true);
    try {
      if (isFollowing) {
        await unfollowUser(profileData._id);
        setIsFollowing(false);
        setFollowersCount((prev) => prev - 1);
      } else {
        await followUser(profileData._id);
        setIsFollowing(true);
        setFollowersCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Follow toggle error:", error);
      alert(error);
    } finally {
      setFollowLoading(false);
    }
  };

  useEffect(() => {
    if (userName) {
      handleProfile(userName);
    }
  }, [userName, dispatch]);

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100"></div>
    );
  }

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
      {/* Left sidebar navigation on desktop (fixed) */}
      <SideNav />

      {/* Main profile content */}
      <div className="w-[95%] lg:max-w-[85%] min-h-[90vh] rounded-2xl flex flex-col overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.25)] bg-black text-white lg:ml-[260px]">
        {/* Header */}
        <div className="w-full h-[80px] flex items-center justify-between px-6 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <MdOutlineKeyboardBackspace
              className="w-6 h-6 text-white cursor-pointer"
              onClick={() => navigate("/home")}
            />
            {/* <img src={logo} alt="Logo" className="w-[100px]" /> */}
          </div>
          <div className="flex items-center gap-5">
            <div className="relative">
              {/* <div className="w-[26px] h-[26px] bg-neutral-200 rounded-full"></div> */}
              {/* <div className="w-[10px] h-[10px] bg-blue-600 rounded-full absolute top-0 right-[-5px]"></div> */}
            </div>
            {/* <div className="w-[26px] h-[26px] bg-neutral-200 rounded-full"></div> */}
          </div>
        </div>

        {/* Profile Section */}
        <div className="flex-1 w-full px-6 py-8 overflow-y-auto bg-neutral-950">
          <div className="w-full bg-black border border-neutral-800 rounded-xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              {/* Left: Avatar + Info */}
              <div className="flex items-center gap-6">
                <img
                  src={profileData.profilePicture || "/default-avatar.png"}
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover border-4 border-neutral-200 shadow-md"
                />
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {profileData.name || "No name"}
                  </h1>
                  <p className="text-sm text-neutral-300">
                    @{profileData.userName || "No username"}
                  </p>
                  <p className="mt-1 text-neutral-300 text-sm">
                    {profileData.bio || "No bio available"}
                  </p>
                  {profileData.profession && (
                    <span className="mt-2 inline-block bg-blue-500/10 text-blue-300 px-3 py-1 rounded-full text-xs">
                      {profileData.profession}
                    </span>
                  )}
                </div>
              </div>

              {/* Right: Action Button */}
              <div className="mt-4 sm:mt-0">
                {isOwnProfile ? (
                  <button
                    onClick={() => navigate(`/editprofile/`)}
                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-md hover:opacity-90 transition"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <button
                    onClick={handleFollowToggle}
                    disabled={followLoading}
                    className={`
                      px-5 py-2 rounded-lg font-semibold shadow-md transition
                      ${
                        isFollowing
                          ? "bg-neutral-200 text-neutral-800 hover:bg-neutral-300"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }
                      disabled:opacity-50 disabled:cursor-not-allowed
                      min-w-[100px]
                    `}
                  >
                    {followLoading ? (
                      <h1>Follwing</h1>
                    ) : isFollowing ? (
                      "Unfollow"
                    ) : (
                      "Follow"
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center border-t pt-4">
              <div>
                <div className="font-bold text-lg">
                  {userPosts.length}
                </div>
                <div className="text-neutral-300 text-sm">Posts</div>
              </div>
              <div>
                <div className="font-bold text-lg">{followersCount}</div>
                <div className="text-neutral-300 text-sm">Followers</div>
              </div>
              <div>
                <div className="font-bold text-lg">
                  {profileData.following?.length || 0}
                </div>
                <div className="text-neutral-300 text-sm">Following</div>
              </div>
            </div>

            {/* User posts grid */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">Posts</h2>
              {userPosts.length === 0 ? (
                <p className="text-neutral-400 text-sm">No posts yet.</p>
              ) : (
                <div className="grid grid-cols-3 gap-1 sm:gap-3 md:gap-4 mt-2">
                  {userPosts.map((post) => (
                    <div
                      key={post._id}
                      className="relative w-full aspect-square bg-neutral-900 rounded-md overflow-hidden"
                    >
                      {post.mediaType === "image" ? (
                        <img
                          src={post.mediaUrl}
                          alt={post.caption || "Post"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <video
                          src={post.mediaUrl}
                          className="w-full h-full object-cover"
                          muted
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Nav */}
        <Nav />
      </div>
    </div>
  );
}

export default Profile;
