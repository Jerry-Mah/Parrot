import React from "react";
import box from "../assets/Vector.png";
import { Link } from "react-router-dom";
import { MdOutlineMonitor } from "react-icons/md";
import { VscSettings } from "react-icons/vsc";
import { LuWebcam } from "react-icons/lu";

const Sidebar = () => {
  return (
    <div className="w-80 py-16 bg-gradient-to-r from-customPurple to-customBlue rounded-3xl text-white font-chakra flex flex-col justify-start items-center">
      <div className="mt-10 mb-10 image__container flex flex-col items-center gap-8">
        <img src={box} alt="box" />

        <h1 className="text-[32px] font-bold">Dashboard</h1>
      </div>

      <ul className="link__container text-2xl">
        <li className="mb-6 p-2 flex justify-start items-center hover:bg-gray-700 rounded-full">
          <MdOutlineMonitor className="mr-2" />
          <Link to="/">Monitor</Link>
        </li>
        <li className="mb-6 p-2 flex justify-start items-center hover:bg-gray-700 rounded-full">
          <VscSettings className="mr-2 " />
          <Link to="/controls">Control</Link>
        </li>
        <li className="mb-6 p-2 flex justify-start items-center hover:bg-gray-700 rounded-full">
          <LuWebcam className="mr-2" />
          <Link to="/camerafeed">Camera Feed</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
