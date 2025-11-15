// src/components/LeftHomeDesign.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SuggestedUser from "./SuggestedUsers";
import { logoutUser } from "../../apiCalls/authCalls";
import { clearUserData } from "../redux/userSlice";

function LeftHome() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {userData} = useSelector(state => state.user)
  const {suggestedUsers} = useSelector(state => state.user);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      dispatch(clearUserData());
      navigate("/signin");
    }
  };

  console.log(suggestedUsers)
  return (
    <div
      className="
        hidden lg:flex flex-col
        w-[40%] h-[90vh] 
        bg-black text-white rounded-2xl
        shadow-[0_10px_40px_rgba(0,0,0,0.25)]
        overflow-hidden
      "
    >
      {/* Header (empty divider bar) */}
      <div className="w-full h-[40px] border-b border-neutral-800 px-6" />

      {/* Profile section with Logout */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate(`/profile/${userData?.userName}`)}
        >
          <div className="w-[60px] h-[60px] rounded-full overflow-hidden border border-neutral-600">
            <img src={userData?.profilePicture} alt="profile" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">{userData.userName}</div>
            <div className="text-xs text-neutral-300">{userData.name}</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs font-semibold text-red-400 hover:text-red-300"
        >
          Log out
        </button>
      </div>

      {/* Suggested Users */}
      <div className="flex flex-col gap-4 px-6 py-5">
        <h1 className="text-sm font-semibold text-white">
          Suggested Users
        </h1>
        {suggestedUsers?.slice(0,5).map((user)=>{
          return <SuggestedUser user={user}/>
        })}
      </div>
    </div>
  );
}

export default LeftHome;