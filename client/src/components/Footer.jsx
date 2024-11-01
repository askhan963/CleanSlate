import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="flex items-center justify-between gap-4 px-4 lg:px-44 py-3">
      <div className="flex items-center gap-2">
        <img
          className="w-12 h-12"
          src={assets.logo_icon}
          alt="CleanSlate Logo"
        />
        <span className="text-lg font-semibold">CleanSlate</span>
      </div>
      <p className="flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 hidden sm:block">
        Copyright © Muhammad Awais Khan | All rights reserved.
      </p>
      <div className="flex gap-2">
        <img
          className="w-8 h-8"
          src={assets.facebook_icon}
          alt="Facebook Icon"
        />
        <img className="w-8 h-8" src={assets.twitter_icon} alt="Twitter Icon" />
        <img
          className="w-8 h-8"
          src={assets.google_plus_icon}
          alt="Google Plus Icon"
        />
      </div>
    </div>
  );
};

export default Footer;
