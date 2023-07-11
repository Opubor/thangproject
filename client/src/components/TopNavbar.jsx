import React, { useContext } from "react";
import baseStep from "../assets/BaseStep.png";
import avatar from "../assets/avatar.png";
import testreporticon from "../assets/Vector (15).png";
import { loginContext } from "../context/auth";
import { FaBars } from "react-icons/fa";

function TopNavbar({ openSidebar, openAvatar }) {
  const { logout, loggedIn, user } = useContext(loginContext);

  return (
    <div className="fixed top-0 right-0 left-0 bg-white pr-8 p-2 flex justify-between items-center">
      <div className="flex items-center">
        <button onClick={openSidebar} className="xl:hidden">
          {React.createElement(FaBars, {
            size: "20",
          })}
        </button>
        <div className="font-bold text-lg flex items-center gap-2 pl-8">
          <img src={testreporticon} /> Test Management
        </div>
      </div>
      <img
        className="inline-block h-8 w-8 rounded-full ring-2 ring-white cursor-pointer"
        src={user?.profilepic ? user?.profilepic : avatar}
        alt=""
        onClick={openAvatar}
      />
    </div>
  );
}

export default TopNavbar;
