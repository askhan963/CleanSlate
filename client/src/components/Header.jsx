import { assets } from "../assets/assets";
import { useDispatch } from "react-redux";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { removeBg } from "../app/appSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      dispatch(removeBg({ image: uploadedImage, getToken, navigate }));
    }
  };

  return (
    <div className="flex items-center justify-between max-sm:flex-col-reverse gap-y-10 px-4 mt-10 lg:px-44 sm:mt-20">
      {/* left side */}
      <div>
        <h1 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 leading-tight">
          Remove the <br className="max-md:hidden" />{" "}
          <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
            background
          </span>{" "}
          from <br className="max-md:hidden" /> images for free.
        </h1>
        <p className="my-6 text-[15px] text-gray-500">
          Effortlessly transform your photos with our AI-powered background remover.{" "}
          <br className="max-sm:hidden" /> Upload an image, let our tool do the work, and get a
          ready-to-use cutout in seconds!
        </p>
        <div>
          <input
            onChange={handleImageUpload}
            type="file"
            accept="image/*"
            id="upload1"
            hidden
          />
          <label
            className="inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 m-auto hover:scale-105 transition-all duration-700"
            htmlFor="upload1"
          >
            <img width={20} src={assets.upload_btn_icon} alt="Upload Icon" />
            <p className="text-white text-sm">Upload Your Image</p>
          </label>
        </div>
      </div>
      {/* right side */}
      <div className="w-full max-w-md">
        <img src={assets.header_img} alt="Background Removal Header Image" />
      </div>
    </div>
  );
};

export default Header;
