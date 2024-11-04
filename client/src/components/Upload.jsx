import { assets } from "../assets/assets";
import { useDispatch } from "react-redux";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { removeBg } from "../app/appSlice";

const Upload = () => {
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
    <div className="pb-16">
      {/* title */}
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent py-6 md:py-16">
        See the magic. Try now
      </h1>
      <div className="text-center mb-24">
        <input
          onChange={handleImageUpload}
          type="file"
          accept="image/*"
          id="upload2"
          hidden
        />
        <label
          className="inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 m-auto hover:scale-105 transition-all duration-700"
          htmlFor="upload2"
        >
          <img width={20} src={assets.upload_btn_icon} alt="Upload Icon" />
          <p className="text-white text-sm">Upload Your Image</p>
        </label>
      </div>
    </div>
  );
};

export default Upload;
