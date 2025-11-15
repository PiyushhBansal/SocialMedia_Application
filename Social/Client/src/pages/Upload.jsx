// src/pages/Upload.js
import React, { useState, useRef } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { FiPlusSquare } from "react-icons/fi";
import { ClipLoader } from "react-spinners";
import { createPost , createStory } from "../../apiCalls/authCalls";
// import { uploadPost } from "../../../Server/controllers/post.controllers";
import { useDispatch, useSelector } from "react-redux";
import { setPostData } from "../redux/postSlice";
// import { set } from "mongoose";
import { addStory } from "../redux/storySlice";
import { useNavigate } from "react-router-dom";
import SideNav from "../components/SideNav";

function Upload() {
  const { postData } = useSelector(state => state.post)
  const [uploadType, setUploadType] = useState("post");
  const [frontendMedia, setFrontendMedia] = useState(null);
  const [mediaType, setMediaType] = useState("");
  const [caption, setCaption] = useState("");
  const [backendMedia, setBackendMedia] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const mediaInput = useRef();
  const dispatch = useDispatch()


  const handleMedia = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const mediaUrl = URL.createObjectURL(file);

    if (file.type.includes("image")) {
      setMediaType("image");
    } else if (file.type.includes("video")) {
      setMediaType("video");
    } else {
      setMediaType(null);
      setError("Only images and videos are supported.");
      return;
    }

    // If user selected REEL but picked an image, show error
    if (uploadType === "reel" && !file.type.includes("video")) {
      setError("Reels must be video files.");
      return;
    }

    setError("");
    setFrontendMedia(mediaUrl);
    setBackendMedia(file);
  };

  const uploadStory = async () => {
    const formData = new FormData();
    formData.append("mediaType", mediaType);
    formData.append("mediaUrl", backendMedia); // MUST MATCH BACKEND FIELD NAME

    console.log("Uploading story:", mediaType, backendMedia);
    setLoading(true);
    setError("");

    try {
      const result = await createStory(formData);
      console.log("STORY RESULT ===>", result);
      dispatch(addStory(result));
      navigate("/home");
    } catch (err) {
      console.log("Story upload failed:", err);
      setError(
        typeof err === "string"
          ? err
          : "Failed to upload story. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const uploadPost = async () => {
    const formData = new FormData();
    formData.append("mediaType", mediaType);
    formData.append("caption", caption);
    formData.append("mediaUrl", backendMedia);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    setLoading(true);
    setError("");

    try {
      const result = await createPost(formData);
      dispatch(setPostData([...postData, result]));

      // If it's a reel (video), redirect to Reels page; otherwise to Home
      if (uploadType === "reel") {
        navigate("/reels");
      } else {
        navigate("/home");
      }
    } catch (err) {
      console.log("Post upload failed:", err);
      setError(
        typeof err === "string"
          ? err
          : "Failed to upload post. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = () => {
    if (uploadType === "reel" && mediaType !== "video") {
      setError("Reels must be a video. Please select a video file.");
      return;
    }

    if (uploadType === "story") uploadStory();
    else uploadPost();
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
      <SideNav />

      <div className="w-[95%] lg:max-w-[60%] h-[600px] rounded-2xl flex justify-center items-center overflow-hidden border border-neutral-800 bg-black lg:ml-[260px]">
        {/* Upload form area */}
        <div
          className="
            w-full h-full 
            bg-black 
            flex flex-col items-center justify-start
            px-6 sm:px-10 
            pt-8
            gap-5
          "
        >
          {/* Header */}
          <div className="flex items-center gap-3 w-full">
            <MdOutlineKeyboardBackspace
              className="w-6 h-6 text-white cursor-pointer"
              onClick={() => navigate("/home")}
            />
            <h2 className="text-lg font-semibold text-white">
              Upload Media
            </h2>
          </div>

          {/* Upload type switch */}
          <div className="w-[95%] h-[50px] bg-neutral-900/70 rounded-full flex justify-around items-center mt-2 border border-neutral-700">
            {["post", "story", "reel"].map((type) => (
              <div
                key={type}
                onClick={() => setUploadType(type)}
                className={`
                  w-[28%] h-[80%] flex justify-center items-center text-sm font-medium rounded-full cursor-pointer 
                  transition-all duration-200
                  ${
                    uploadType === type
                      ? "bg-[#0095F6] text-white shadow-md"
                      : "text-neutral-300 hover:bg-neutral-800"
                  }
                `}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </div>
            ))}
          </div>

          {/* Error message */}
          {error && (
            <p className="w-[95%] text-sm text-red-400 mt-2">{error}</p>
          )}

          {/* Upload box */}
          {!frontendMedia ? (
  <div
    className="
      w-[95%] h-[220px] bg-neutral-900 border border-dashed border-neutral-700 
      flex flex-col items-center justify-center gap-3 
      mt-6 rounded-xl cursor-pointer 
      hover:bg-neutral-800 transition
    "
    onClick={() => mediaInput.current.click()}
  >
    <input
      type="file"
      accept="image/*,video/*"
      hidden
      ref={mediaInput}
      onChange={handleMedia}
    />
    <FiPlusSquare className="text-neutral-300 w-8 h-8" />
    <p className="text-neutral-200 font-medium">
      Upload {uploadType}
    </p>
  </div>
) : (
  <div className="w-[95%] mt-6 flex flex-col items-center">
    {mediaType === "image" && (
      <img
        src={frontendMedia}
        className="w-full max-h-[220px] object-cover rounded-xl"
      />
    )}
    {mediaType === "video" && (
      <video
        src={frontendMedia}
        controls
        className="w-full max-h-[220px] rounded-xl"
      />
    )}

    <input
      type="text"
      placeholder="Write a caption..."
      value={caption}
      onChange={(e) => setCaption(e.target.value)}
      className="w-full mt-4 px-3 py-2 border border-neutral-700 bg-neutral-900/70 text-white"
    />
  </div>
)}

          {/* Button */}
          {frontendMedia && (
            <button
              onClick={handleUpload}
              disabled={loading}
              className="
                w-[95%] h-[44px] mt-6 rounded-lg font-semibold 
                bg-[#0095F6] text-white 
                hover:bg-[#0086dd] active:scale-[0.99] transition
                shadow-[0_6px_16px_rgba(0,149,246,0.35)]
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <ClipLoader size={20} color="white" />
                  Uploading...
                </span>
              ) : (
                `Upload ${uploadType.charAt(0).toUpperCase() + uploadType.slice(1)}`
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Upload;
