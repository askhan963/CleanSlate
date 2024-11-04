import { useState } from "react";
import { assets } from "../assets/assets";

const BgSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value);
  };

  return (
    <div className="pb-10 md:py-20 mx-2">
      {/* title */}
      <h1 className="mb-12 sm:mb-20 text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent">
        Remove Background With High <br /> Quality and Accuracy
      </h1>
      <div className="relative w-full max-w-lg m-auto rounded-xl overflow-hidden"> {/* Reduced max width */}
        {/* Background image */}
        <img
          src={assets.image_w_bg}
          className="w-full h-auto block"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          alt="Original Background Image"
        />
        {/* Foreground image */}
        <img
          className="absolute top-0 left-0 w-full h-auto block"
          src={assets.image_wo_bg}
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
          alt="Background Removed Image"
        />

        {/* Slider */}
        <input
          className="absolute top-1/2 left-0 w-full z-10 cursor-pointer opacity-75 slider transform -translate-y-1/2"
          type="range"
          min={0}
          max={100}
          value={sliderPosition}
          onChange={handleSliderChange}
        />
      </div>
    </div>
  );
};

export default BgSlider;
