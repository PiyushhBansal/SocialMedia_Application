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
import Upload from "./pages/Upload.jsx";
import useAllPosts from "../hooks/useAllPosts.jsx";
import useSuggestedUsers from "../hooks/useSuggestedUsers";
import Messages from "./pages/Messages.jsx";
import Reels from "./pages/Reels.jsx";

function App() {
  useCurrentUser();
  useAllPosts();
  useSuggestedUsers();
  const { userData } = useSelector((state) => state.user);

  return (
    <>
      <Routes>
        <Route path="/nav" element={<Nav />} />
        <Route
          path="/"
          element={!userData ? <Landing /> : <Navigate to="/home" />}
        />
        <Route
          path="/signin"
          element={!userData ? <SignIn /> : <Navigate to="/home" />}
        />
        <Route
          path="/signup"
          element={!userData ? <SignUp /> : <Navigate to="/home" />}
        />
        <Route
          path="/home"
          element={userData ? <Home /> : <Navigate to="/signin" />}
        />
        <Route path="/profile/:userName" element={<Profile />} />
        <Route
          path="/editprofile/"
          element={userData ? <EditProfile /> : <Navigate to="/signin" />}
        />
        <Route
          path="/messages"
          element={userData ? <Messages /> : <Navigate to="/signin" />}
        />
        <Route
          path="/reels"
          element={userData ? <Reels /> : <Navigate to="/signin" />}
        />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </>
  );
}

export default App;
