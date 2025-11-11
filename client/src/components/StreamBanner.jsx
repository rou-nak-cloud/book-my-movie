import React from "react";
import { assets } from "../assets/assets";

const StreamBanner = () => {
  return (
    <div className="w-full h-[70%] flex justify-center items-center py-6 px-3 mt-9">
      <div className="w-full max-w-7xl rounded-xl overflow-hidden shadow-lg">
        <img
          src={assets.StreamBanner2}
          alt="BookMyShow Stream Banner"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default StreamBanner;
