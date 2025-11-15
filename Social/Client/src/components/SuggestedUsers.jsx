import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser } from '../../apiCalls/authCalls';
import { setUserData, setSuggestedUsers } from '../redux/userSlice';

function SuggestedUsers({ user }) {
  const dispatch = useDispatch();
  const { userData, suggestedUsers } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const avatarSrc =
    user.profilePicture || user.profileImage || "/default-avatar.png";

  const handleFollow = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await followUser(user._id);

      // Optimistically update current user's following list
      if (userData) {
        const currentFollowing = Array.isArray(userData.following)
          ? userData.following.map((id) => id.toString())
          : [];
        if (!currentFollowing.includes(user._id.toString())) {
          const updatedUser = {
            ...userData,
            following: [...currentFollowing, user._id],
          };
          dispatch(setUserData(updatedUser));
        }
      }

      // Remove followed user from suggested list
      if (Array.isArray(suggestedUsers)) {
        const updatedSuggestions = suggestedUsers.filter(
          (u) => u._id !== user._id
        );
        dispatch(setSuggestedUsers(updatedSuggestions));
      }
    } catch (error) {
      console.error('Error following user from suggestions:', error);
      alert(
        typeof error === 'string'
          ? error
          : 'Failed to follow user. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
        <div className="w-[40px] h-[40px] rounded-full bg-neutral-700 overflow-hidden">
          <img
            src={avatarSrc}
            alt={user.userName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <p className="font-medium text-sm text-white">{user.name}</p>
          <p className="text-xs text-neutral-300">@{user.userName}</p>
        </div>
      </div>
      <button
        onClick={handleFollow}
        disabled={loading}
        className="text-[#0095F6] text-xs font-semibold hover:underline disabled:opacity-50"
      >
        {loading ? 'Following…' : 'Follow'}
      </button>
    </div>
  );
}

export default SuggestedUsers