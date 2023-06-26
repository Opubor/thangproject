import React, { useContext } from "react";
import profilePic from "../assets/Vector (20).png";
import faq from "../assets/Vector (19).png";
import logoutIcon from "../assets/Vector (18).png";
import settingsicon from "../assets/Path.png";
import avatar from "../assets/avatar.png";
import { loginContext } from "../context/auth";
import { Navigate } from "react-router-dom";

function AvatarDropdown({ styles }) {
  const { logout, loggedIn, user } = useContext(loginContext);
  if (!loggedIn) {
    return <Navigate to={"/"} />;
  }
  return (
    <div
      className={`bg-white shadow shadow-lg w-72 fixed right-12 z-50 top-8 py-4 rounded-xl border ${styles}`}
    >
      <div className="flex items-center gap-4 border-b-2 pb-4 px-6">
        <img
          className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
          src={avatar}
          alt=""
        />
        <div>
          <h1 className="font-bold text-lg">John Doe</h1>
          <h2 className="text-textgray">Admin</h2>
        </div>
      </div>
      <div className="flex items-center gap-4 py-2 border-b-2 px-6 cursor-pointer">
        <img src={profilePic} />
        <h1 className="text-lg">Profile</h1>
      </div>
      <div className="flex items-center gap-4 py-2 border-b-2 px-6 cursor-pointer">
        <img src={settingsicon} />
        <h1 className="text-lg">Settings</h1>
      </div>
      <div className="flex items-center gap-4 py-2 border-b-2 px-6 cursor-pointer">
        <img src={faq} />
        <h1 className="text-lg">FAQ</h1>
      </div>
      <button
        onClick={logout}
        className="flex items-center gap-4 py-2 px-6 cursor-pointer"
      >
        <img src={logoutIcon} />
        <h1 className="text-lg">Logout</h1>
      </button>
    </div>
  );
}

export default AvatarDropdown;
