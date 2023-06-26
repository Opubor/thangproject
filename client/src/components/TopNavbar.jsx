import React from "react";
import baseStep from "../assets/BaseStep.png";
import avatar from "../assets/avatar.png";
import testreporticon from "../assets/Vector (15).png";

function TopNavbar({ openSidebar, openAvatar }) {
  return (
    <div className="fixed top-0 right-0 left-0 bg-white pr-8 p-2 flex justify-between items-center">
      <div className="flex items-center">
        <img
          src={baseStep}
          className="bg-blue-900 w-6 block xl:hidden"
          onClick={openSidebar}
        />
        <div className="font-bold pl-12 text-lg flex items-center gap-2 pl-8">
          <img src={testreporticon} /> Test Management
        </div>
      </div>
      <img
        className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
        src={avatar}
        alt=""
        onClick={openAvatar}
      />
    </div>
  );
}

export default TopNavbar;
