import React, { useState } from "react";
import logo from "../assets/socialLogo.png";
import logo2 from "../assets/logo2.png";
import { Link, useNavigate } from "react-router-dom";
import { signInUser } from "../../apiCalls/authCalls";
import { setUserData } from "../redux/userSlice";
import { useDispatch } from "react-redux";

function SignIn() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogIn = async () => {
    try {
      const data = await signInUser({ userName, password });
      console.log("SignIn Success:", data);
      dispatch(setUserData(data));

      navigate("/home");
    } catch (error) {
      console.error("Signup Error:", error);

      // Optionally, show an error message to the user here
    }
  };
  return (
    <div
      className="
        w-full min-h-screen 
        bg-black text-white
        flex items-center justify-center
      "
    >
      <div className="w-[95%] lg:max-w-[60%] h-[600px] rounded-2xl flex justify-center items-center overflow-hidden border border-neutral-800 bg-black">
        {/* LEFT (form) */}
        <div
          className="
            w-full lg:w-1/2 h-full 
            bg-black 
            flex flex-col items-center justify-center
            px-6 sm:px-10 
            gap-5
          "
        >
          {/* Header */}
          <div className="flex flex-col items-center gap-2 mb-4">
            <img src={logo} alt="" className="w-[96px] object-contain" />
            <h2 className="text-lg font-semibold text-white">
              Sign In to Scaler Gram
            </h2>
          </div>

          {/* Inputs */}
          <div className="w-full flex flex-col items-center gap-3">
            <input
              type="text"
              id="userName"
              placeholder="Username"
              className="w-[95%] h-[44px] px-3 rounded-md border border-neutral-700 bg-neutral-900/70 text-white text-sm focus:outline-none focus:border-neutral-500"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              id="password"
              placeholder="Password"
              className="w-[95%] h-[44px] px-3 rounded-md border border-neutral-700 bg-neutral-900/70 text-white text-sm focus:outline-none focus:border-neutral-500"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Forgot password */}
          <div className="w-[95%] text-right mt-1 text-sm text-[#0095F6] cursor-pointer hover:underline">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          {/* Button */}
          <button
            onClick={handleLogIn}
            className="
              w-[95%] h-[44px] mt-4 rounded-lg font-semibold 
              bg-[#0095F6] text-white 
              hover:bg-[#0086dd] active:scale-[0.99] transition
              shadow-[0_6px_16px_rgba(0,149,246,0.35)]
            "
          >
            Sign in
          </button>

          {/* Footer text */}
          <p className="text-neutral-400 text-sm mt-3">
            Want to create a new account?{" "}
            <span className="text-white font-medium underline underline-offset-4">
              <Link to="/signup"> Sign Up</Link>
            </span>
          </p>
        </div>

        {/* RIGHT (promo panel) */}
        <div
          className="
            md:w-1/2 h-full hidden lg:flex flex-col items-center justify-center 
            bg-white/5 backdrop-blur-[1px]
            text-white font-semibold
          "
        >
          <img
            src={logo2}
            alt=""
            className="w-[42%] drop-shadow-[0_10px_28px_rgba(0,0,0,0.25)]"
          />
          <p className="mt-4 text-white/95">Scaler Gram - Scaling Connections</p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;