import { assets } from "../assets/assets";

const Steps = () => {
  return (
    <div className="mx-4 lg:mx-44 py-20 xl:py-40">
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent">
        Steps to remove background <br /> image in seconds
      </h1>
      <div className="flex items-start flex-wrap gap-4 mt-16 xl:mt-24 justify-center">
        <div className="flex items-start gap-4 bg-white border drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500 cursor-pointer">
          <img className="max-w-9" src={assets.upload_icon} alt="Upload Icon" />
          <div>
            <p className="text-xl font-medium">Upload Image</p>
            <p className="text-sm text-neutral-500 mt-1">
              Choose an image from your device to get started. Just click the
              upload button, and select your image file.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 bg-white border drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500 cursor-pointer">
          <img
            className="max-w-9"
            src={assets.remove_bg_icon}
            alt="Remove Background Icon"
          />
          <div>
            <p className="text-xl font-medium">Remove Background</p>
            <p className="text-sm text-neutral-500 mt-1">
              Our tool will automatically detect the subject and remove the
              background, leaving you with a clean cutout.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 bg-white border drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500 cursor-pointer">
          <img
            className="max-w-9"
            src={assets.download_icon}
            alt="Download Icon"
          />
          <div>
            <p className="text-xl font-medium">Download Image</p>
            <p className="text-sm text-neutral-500 mt-1">
              Once the background is removed, simply download the edited image
              in high quality, ready to use for any project.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
