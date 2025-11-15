import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SideNav from "../components/SideNav";
import Nav from "../components/Nav";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { likePost } from "../../apiCalls/authCalls";
import { updatePost } from "../redux/postSlice";

function Reels() {
  const dispatch = useDispatch();
  const { postData } = useSelector((state) => state.post);
  const { userData } = useSelector((state) => state.user);

  const [likeLoadingId, setLikeLoadingId] = useState(null);

  const videoPosts = postData?.filter((post) => post.mediaType === "video");

  const handleLike = async (post) => {
    if (likeLoadingId === post._id) return;
    setLikeLoadingId(post._id);
    try {
      const updated = await likePost(post._id);
      dispatch(updatePost(updated));
    } catch (err) {
      console.error("Reel like error:", err);
    } finally {
      setLikeLoadingId(null);
    }
  };

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
      {/* Bottom nav on mobile */}
      <Nav />

      {/* Left sidebar on desktop */}
      <SideNav />

      {/* Reels list styled like story viewer, but vertically scrollable */}
      <div className="flex-1 lg:max-w-[800px] lg:ml-[260px] flex flex-col items-center">
        <h1 className="w-full text-xl font-semibold mb-4 px-2 lg:px-0">Reels</h1>

        {videoPosts && videoPosts.length > 0 ? (
          <div className="w-full max-h-[80vh] overflow-y-auto snap-y snap-mandatory pb-4">
            {videoPosts.map((post) => {
              const isLiked = post.likes?.some((id) => id === userData?._id);
              const likesCount = post.likes?.length || 0;

              return (
                <div
                  key={post._id}
                  className="w-full flex justify-center items-center snap-start mb-6"
                >
                  <div className="relative w-full max-w-[420px] h-[70vh] bg-black rounded-2xl overflow-hidden border border-neutral-800">
                    {/* Header similar to StoryViewer */}
                    <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3 z-10 bg-gradient-to-b from-black/80 to-transparent">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            post.author?.profilePicture ||
                            post.author?.profileImage ||
                            (post.author?._id === userData?._id
                              ? userData?.profilePicture
                              : null) ||
                            "/default-avatar.png"
                          }
                          alt={post.author?.userName || "user"}
                          className="w-10 h-10 rounded-full border-2 border-white"
                        />
                        <div>
                          <p className="text-white font-semibold text-sm">
                            {post.author?.userName || "Unknown"}
                          </p>
                          <p className="text-white/70 text-xs">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>

            {/* Right-side actions: like only */}
            <div className="absolute right-3 bottom-24 flex flex-col items-center gap-4 z-10">
              <button
                onClick={() => handleLike(post)}
                disabled={likeLoadingId === post._id}
                className="flex flex-col items-center gap-1 text-white disabled:opacity-50"
              >
                {isLiked ? (
                  <AiFillHeart className="w-7 h-7 text-red-500" />
                ) : (
                  <AiOutlineHeart className="w-7 h-7" />
                )}
                {likesCount > 0 && (
                  <span className="text-xs">{likesCount}</span>
                )}
              </button>
            </div>

            {/* Reel video content */}
            <video
              src={post.mediaUrl}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              controls={false}
            />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-neutral-400 px-2">No reels yet. Upload a video as a reel.</p>
        )}
      </div>
    </div>
  );
}

export default Reels;
