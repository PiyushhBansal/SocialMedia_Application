import { useState,useRef } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editProfile } from "../../apiCalls/authCalls";
import { setProfileData, setUserData } from "../redux/userSlice";
import SideNav from "../components/SideNav";

function EditProfile() {

    const navigate = useNavigate();

    const { profileData } = useSelector(state => state.user)
    const [profileImage , setProfileImage]=useState(profileData?.profilePicture || '')
    const [serverProfileImage , setServerProfileImage]=useState(null)
    const imageInput = useRef()
    const [userName, setUserName] = useState(profileData.userName)
    const [name, setName] = useState(profileData.name)
    const [bio, setBio] = useState(profileData.bio)
    const dispatch = useDispatch()
    function handleImage(e){
        const file = e.target.files[0]

        const imageUrl = URL.createObjectURL(file)
        console.log(imageUrl)
        setProfileImage(imageUrl)
        setServerProfileImage(file); 

    }

    async function handleEditProfile(){   
        try{
            const formData = new FormData()
            formData.append('userName', userName)
            formData.append('name', name)
            formData.append('bio', bio)
            if(serverProfileImage){ 
                formData.append('profileImage', serverProfileImage)
            }
            const result = await editProfile(formData)
            dispatch(setProfileData(result))
            dispatch(setUserData(result))
            console.log("Profile edited successfully:", result);

            // Navigate to updated profile page
            navigate(`/profile/${result.userName || userName}`)
        }catch(error){
            console.error("Error editing profile:", error);
        }
    }

  return (
    <div
      className="
        w-full min-h-screen 
        bg-black
        flex
        px-2 sm:px-4 lg:px-10
        py-6
        text-white
      "
    >
      <SideNav />

      <div className="flex justify-center w-full lg:ml-[260px]">
        <div className="w-[95%] lg:max-w-[60%] bg-black border border-neutral-800 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.25)] p-6 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <MdOutlineKeyboardBackspace
            className="text-white cursor-pointer w-7 h-7"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-2xl font-bold text-white">Edit Profile</h1>
        </div>

   
        {/* {message && (
          <div className="p-3 bg-green-100 text-green-700 rounded-md text-sm">
            {message}
          </div>
        )} */}
        {/* {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )} */}

        {/* Profile Image */}
        <div className="flex flex-col items-center gap-3">
          <div
            className="relative w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-full overflow-hidden border-4 border-neutral-700 shadow group"
          >
            <input
              type="file"
              accept="image/*"
              hidden
              ref={imageInput}
              onChange={handleImage}
            />
            { (profileImage || profileData?.profilePicture) ? (
              <img
                src={profileImage || profileData?.profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-neutral-900 flex items-center justify-center text-neutral-400">
                No Image
              </div>
            )}
            
          </div>
          <button
            onClick={() => imageInput.current && imageInput.current.click()}
            className="text-blue-600 text-sm font-semibold hover:underline"
          >
            Change Profile Picture
          </button>
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="w-full h-[50px] bg-neutral-900/70 border border-neutral-700 rounded-lg px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="text"
            placeholder="Enter Your Username"
            value={userName}
            onChange={(e)=>setUserName(e.target.value)}
            className="w-full h-[50px] bg-neutral-900/70 border border-neutral-700 rounded-lg px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="text"
            placeholder="Bio"
            value={bio}
            onChange={(e)=>setBio(e.target.value)}
            className="w-full h-[50px] bg-neutral-900/70 border border-neutral-700 rounded-lg px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
         
        </div>

        {/* Save Button */}
        <button 
          onClick={handleEditProfile}
          className="w-full h-[50px] bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition"
        >
          Save Profile
        </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;