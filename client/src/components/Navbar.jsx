import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser, useAuth } from "@clerk/clerk-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadCreditsData } from "../app/appSlice";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  const { getToken } = useAuth(); // Access getToken from useAuth
  const dispatch = useDispatch();

  // Access credit from Redux state
  const credit = useSelector((state) => state.app.credit);

  // Load credit data when user is signed in
  useEffect(() => {
    if (isSignedIn) {
      dispatch(loadCreditsData(getToken)); // Pass getToken as an argument to the thunk
    }
  }, [isSignedIn, dispatch, getToken]);

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
      {isSignedIn ? (
        <div className="flex items-center gap-4">
          <Link
            to="/result"
            className="text-sm font-semibold hover:text-violet-600"
          >
            Result
          </Link>
          <Link
            to="/buy"
            className="text-sm font-semibold hover:text-violet-600"
          >
            Buy Credits
          </Link>
          <p className="text-sm font-semibold text-gray-600">
            Credits: {credit !== false ? credit : "Loading..."}
          </p>
          <UserButton />
        </div>
      ) : (
        <button
          onClick={() => openSignIn()}
          className="bg-zinc-800 text-white flex items-center gap-4 px-4 py-2 sm:px-8 sm:py-3 text-sm rounded-full"
        >
          Get Started{" "}
          <img
            className="w-3 sm:w-4"
            src={assets.arrow_icon}
            alt="Arrow Icon"
          />
        </button>
      )}
    </div>
  );
};

export default Navbar;
