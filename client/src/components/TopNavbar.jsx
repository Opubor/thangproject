import React, { useContext, useRef } from "react";
import baseStep from "../assets/BaseStep.png";
import avatar from "../assets/avatar.png";
import testreporticon from "../assets/fptlogo.png";
import { loginContext } from "../context/auth";
import { FaBars } from "react-icons/fa";

function TopNavbar({ openSidebar, openAvatar, userDropDownRef }) {
  const { logout, loggedIn, user } = useContext(loginContext);

  return (
    <div className="fixed top-0 right-0 left-0 bg-white pr-8 p-2 flex justify-between items-center">
      <div className="flex items-center">
        <button onClick={openSidebar} className="xl:hidden">
          {React.createElement(FaBars, {
            size: "20",
          })}
        </button>
        <div className="font-bold text-lg flex items-center gap pl-8">
          <img src={testreporticon} className="w-16" /> Smart Test Management
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <h1 className="font-semibold text-md">
          {user?.role === "admin" && "ADMIN"}
        </h1>
        <img
          className="inline-block h-8 w-8 rounded-full ring-2 ring-white cursor-pointer"
          src={user?.profilepic ? user?.profilepic : avatar}
          alt=""
          onClick={openAvatar}
        />
      </div>
    </div>
  );
}

export default TopNavbar;
