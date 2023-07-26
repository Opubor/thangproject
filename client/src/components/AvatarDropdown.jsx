import React, { useContext, useRef } from "react";
import profilePic from "../assets/Vector (20).png";
import faq from "../assets/Vector (19).png";
import logoutIcon from "../assets/Vector (18).png";
import settingsicon from "../assets/Path.png";
import avatar from "../assets/avatar.png";
import { loginContext } from "../context/auth";
import { Link, Navigate } from "react-router-dom";

function AvatarDropdown({ styles, userDropDownRef }) {
  const { logout, loggedIn, user } = useContext(loginContext);
  if (!loggedIn) {
    return <Navigate to={"/"} />;
  }
  return (
    <div
      className={`bg-white shadow shadow-lg w-64 fixed right-12 z-50 top-8 py-4 rounded-xl border ${styles}`}
      ref={userDropDownRef}
    >
      <div className="flex items-center gap-4 border-b-2 pb-4 px-6">
        <img
          className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
          src={user?.profilepic ? user?.profilepic : avatar}
          alt=""
        />
        <div>
          <h1 className="font-bold text-md">{user?.name}</h1>
          <h2 className="text-textgray">{user?.uniqueid}</h2>
        </div>
      </div>
      <Link
        to="/profile"
        className="flex items-center gap-4 py-2 border-b-2 px-6 cursor-pointer hover:bg-gray-100"
      >
        <img src={profilePic} />
        <h1 className="text-base">Profile</h1>
      </Link>
      <Link
        to="/profile"
        className="flex items-center gap-4 py-2 border-b-2 px-6 cursor-pointer hover:bg-gray-100"
      >
        <img src={settingsicon} />
        <h1 className="text-base">Settings</h1>
      </Link>
      <div className="flex items-center gap-4 py-2 border-b-2 px-6 cursor-pointer hover:bg-gray-100">
        <img src={faq} />
        {user?.role === "admin" ? (
          <Link to={"/profile"} className="text-base">
            Manage Staffs
          </Link>
        ) : (
          <Link to={"/role_auth_one"} className="text-base">
            Become an Admin
          </Link>
        )}
      </div>
      <button
        onClick={logout}
        className="flex items-center gap-4 py-2 px-6 cursor-pointer hover:bg-gray-100 w-full"
      >
        <img src={logoutIcon} />
        <h1 className="text-base">Logout</h1>
      </button>
    </div>
  );
}

export default AvatarDropdown;
