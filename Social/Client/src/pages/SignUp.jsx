import React, { useState } from "react";
import logo1 from "../assets/socialLogo.png";
import logo2 from "../assets/logo2.png";
import { Link, useNavigate } from "react-router-dom";
import { signUpUser } from "../../apiCalls/authCalls";
import { setUserData } from "../redux/userSlice";
import { useDispatch } from "react-redux";

function SignUp() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignUp = async () => {
    try {
        
      const data = await signUpUser({ name, userName, email, password });
      console.log("Signup Success:", data);
      dispatch(setUserData(data))
      navigate('/home')

    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  return (
    <div>
      <div className="w-full min-h-screen bg-black text-white flex flex-col justify-center items-center">
        <div className="w-full lg:max-w-[60%] h-[600px] bg-black rounded-2xl flex justify-center items-center overflow-hidden border border-neutral-800">
          <div className="w-full lg:w-[50%] h-full bg-black flex flex-col items-center p-6 gap-5">
            <div className="flex gap-2 items-center text-[20px] font-semibold mt-8 text-white">
              <span>Sign Up to </span>
              <img src={logo1} alt="" className="w-[70px]" />
            </div>

            <div className="w-[90%] h-[44px] mt-4">
              <input
                type="text"
                id="name"
                placeholder="Name"
                className="w-full h-full rounded-md px-4 border border-neutral-700 bg-neutral-900/70 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-neutral-500"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="w-[90%] h-[44px] mt-2">
              <input
                type="text"
                id="userName"
                placeholder="Username"
                className="w-full h-full rounded-md px-4 border border-neutral-700 bg-neutral-900/70 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-neutral-500"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="w-[90%] h-[44px] mt-2">
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="w-full h-full rounded-md px-4 border border-neutral-700 bg-neutral-900/70 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-neutral-500"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="w-[90%] h-[44px] mt-2">
              <input
                // type={showPassword ? "text" : "password"}
                id="password"
                type="password"
                placeholder="Password"
                className="w-full h-full rounded-md px-4 border border-neutral-700 bg-neutral-900/70 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-neutral-500"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              onClick={handleSignUp}
              className="w-[70%] h-[44px] bg-[#0095f6] text-white font-semibold rounded-lg mt-4 hover:opacity-90 active:scale-[.99] transition shadow-sm"
            >
              Sign Up
            </button>

            <p className="cursor-pointer text-neutral-300 text-sm">
              Already Have An Account?{" "}
              <span className="border-b border-neutral-400 pb-[2px] text-white hover:opacity-80">
                <Link to="/signin"> Sign In</Link>
              </span>
            </p>
          </div>

          <div className="md:w-[50%] h-full hidden lg:flex justify-center items-center bg-white/5 flex-col gap-2 text-white text-[16px] font-semibold rounded-l-[30px] shadow-2xl">
            <img src={logo2} alt="" className="w-[40%] drop-shadow-sm" />
            <p className="opacity-95">Scaler Gram - Scaling Connections</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;