import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import {  useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
const {openSignIn } = useClerk();
const {isSignedIn,user } = useUser()

  return (
    <div className="flex items-center justify-between mx-4 py-3 lg:mx-44">
      <Link to="/" className="flex items-center gap-2">
        <img
          className="w-12 h-12 sm:w-14 sm:h-14"
          src={assets.logo_icon}
          alt="CleanSlate Logo"
        />
        <span className="text-lg font-semibold">CleanSlate</span>
      </Link>
      {
        isSignedIn ?
        <div className="flex items-center gap-4">
          <Link to="/result" className="text-sm font-semibold hover:text-violet-600">Result</Link>
          <Link to="/buy" className="text-sm font-semibold hover:text-violet-600">Buy Credits</Link>
          <UserButton />
        </div>
        :
        <button onClick={() => openSignIn()} className="bg-zinc-800 text-white flex items-center gap-4 px-4 py-2 sm:px-8 sm:py-3 text-sm rounded-full">
        Get Started{" "}
        <img className="w-3 sm:w-4" src={assets.arrow_icon} alt="Arrow Icon" />
      </button>
      }
    </div>
  );
};

export default Navbar;
