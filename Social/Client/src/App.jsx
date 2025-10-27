import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Landing from "./Pages/Landing.jsx";
import Home from "./pages/Home.jsx";
import useCurrentUser from "../hooks/useCurrentUser.jsx";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Profile from "./pages/Profile.jsx";
import EditProfile from "./pages/EditProfile.jsx";

function App() {
  useCurrentUser()
  const {userData,profileData} = useSelector(state=>state.user)

  return (
    <>
      <Routes>
        <Route path="/nav" element={<Nav />} />
        <Route path="/" element={!userData?<Landing />:<Navigate to='/home'/>} />
        <Route path="/signin" element={!userData?<SignIn />:<Navigate to='/home'/>} />
        <Route path="/signup" element={!userData?<SignUp />:<Navigate to='/home'/>} />
         <Route path="/home" element={userData?<Home />:<Navigate to='/signin'/>} />
        <Route path="/profile/:userName" element={userData?<Profile />:<Navigate to='/signin'/>} />
        <Route path="/editprofile/" element={userData?<EditProfile />:<Navigate to='/signin'/>} />
      </Routes>
    </>
  );
}

export default App;