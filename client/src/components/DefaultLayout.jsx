import React, { useState } from "react";
import baseStep from "../assets/BaseStep.png";
import profilePic from "../assets/Vector (20).png";
import faq from "../assets/Vector (19).png";
import logoutIcon from "../assets/Vector (18).png";
import plus from "../assets/add-circle.png";
import avatar from "../assets/avatar.png";
import dashboardicon from "../assets/report-columns.png";
import testmanagementicon from "../assets/share-android.png";
import testenvironmenticon from "../assets/paste-clipboard.png";
import testexecutionicon from "../assets/stats-report.png";
import testreporticon from "../assets/Vector (15).png";
import settingsicon from "../assets/Path.png";
import { NavLink, Navigate, useNavigate, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import axios from "../sevices/axios";
import Input from "./Input";

function DefaultLayout({ children }) {
  const [openFolder, setOpenFolder] = useState(false);
  const [openAvatarDropdown, setOpenAvatarDropdown] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openAddFolderModal, setOpenAddFolderModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [folder, setFolder] = useState({
    foldername: "",
  });
  function handleChange(e) {
    setFolder((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/folder", {
        foldername: folder?.foldername,
      })
      .then((res) => {
        toast.success(res.data);
        setLoading(false);
        window.location.reload(true);
      })
      .catch((err) => {
        toast.error(err);
        setLoading(false);
      });
  };

  const menus = [
    { name: "Dashboard", link: "/dashboard", icon: dashboardicon },
    {
      name: "Test Enviroment",
      link: "/test_environment",
      icon: testenvironmenticon,
    },
    {
      name: "Test Management",
      link: "/test_management",
      icon: testmanagementicon,
    },
    {
      name: "Test Execution",
      link: "/test_execution",
      icon: testexecutionicon,
    },
    { name: "Test Report", link: "/test_report", icon: testreporticon },
    { name: "Setting", link: "/profile", icon: settingsicon },
  ];
  return (
    <div className="w-full">
      {/* ========Avatar====== */}
      <div className="fixed top-0 right-0 left-0 bg-white pr-8 p-2 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={baseStep}
            className="bg-blue-900 w-6 block xl:hidden"
            onClick={() => {
              openSidebar === true
                ? setOpenSidebar(false)
                : setOpenSidebar(true);
            }}
          />
          <div className="font-bold pl-12 text-lg flex items-center gap-2 pl-8">
            <img src={testreporticon} /> Test Management
          </div>
        </div>
        <img
          className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
          src={avatar}
          alt=""
          onClick={() => {
            openAvatarDropdown === true
              ? setOpenAvatarDropdown(false)
              : setOpenAvatarDropdown(true);
          }}
        />
      </div>
      {/* =========Avatar Dropdown========== */}
      <div
        className={`bg-white shadow shadow-lg w-72 fixed right-12 z-50 top-8 py-4 rounded-xl border ${
          openAvatarDropdown ? "block" : "hidden"
        }`}
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
        <div className="flex items-center gap-4 py-2 border-b-2 px-6">
          <img src={profilePic} />
          <h1 className="text-lg">Profile</h1>
        </div>
        <div className="flex items-center gap-4 py-2 border-b-2 px-6">
          <img src={settingsicon} />
          <h1 className="text-lg">Settings</h1>
        </div>
        <div className="flex items-center gap-4 py-2 border-b-2 px-6">
          <img src={faq} />
          <h1 className="text-lg">FAQ</h1>
        </div>
        <div className="flex items-center gap-4 py-2 px-6">
          <img src={logoutIcon} />
          <h1 className="text-lg">Logout</h1>
        </div>
      </div>
      {/* =============Sidebar/Navbar============= */}
      <div className="w-full bg-themegray pb-4 flex justify-between mt-12">
        {/* =============Sidebar============= */}
        <div
          className={`xl:flex xl:w-2/12 mt-4 fixed left-0 flex-col pl-8 ${
            openSidebar ? "flex bg-themegray w-full" : "hidden"
          }`}
        >
          <h1 className="font-bold text-lg text-textgray">Test Repository</h1>
          <h1
            onClick={() => setOpenAddFolderModal(true)}
            className="bg-darkblue px-8 py-2 text-white mt-8 rounded-md flex justify-between items-center cursor-pointer"
          >
            Add Folder
            <img src={plus} />
          </h1>
          <div>
            <Sidebar />
          </div>
        </div>
        {/* ==============Navbar=============== */}
        <div className="w-full xl:w-10/12 bg-themegray mt-4 xl:ml-72">
          <div className="max-w-full overflow-x-auto px-4 xl:px-16 bg-white fixed xl:left-72 left-0 right-0 rounded flex justify-between items-center gap-4 xl:gap-12">
            {menus?.map((menu, i) => (
              <NavLink
                to={menu?.link}
                key={i}
                className={({ isActive }) =>
                  isActive
                    ? "group flex items-center text-sm gap-2 p-2 text-blue-900 hover:text-gray-400 border-b-2 border-b-blue-900 font-bold"
                    : "group flex items-center text-sm gap-2 p-2 text-textgray font-semibold hover:text-blue-900 transition-0.5"
                }
              >
                <img src={menu?.icon} />
                <h2>{menu?.name}</h2>
              </NavLink>
            ))}
          </div>
          {/* =================CHILDREN================ */}
          <div className="bg-white rounded-sm" style={{ marginTop: "56px" }}>
            {children}
          </div>
        </div>
      </div>
      {/* ==============Footer================ */}
      <div className="bg-white w-full px-12 py-4 flex justify-between items-center text-sm">
        <h1 className="text-textdark font-semibold">Cong ty The Thang</h1>
        <div className="flex gap-4">
          <Link className="text-blue-900 font-semibold">License</Link>
          <Link className="text-blue-900 font-semibold">Documentation</Link>
          <Link className="text-blue-900 font-semibold">Support</Link>
        </div>
      </div>
      {/* =============AddFolderModal========= */}
      <div
        className={`bg-black bg-opacity-70 absolute z-50 left-0 right-0 top-0 flex justify-center items-center h-screen ${
          openAddFolderModal ? "flex" : "hidden"
        }`}
      >
        <div className="bg-white p-8 w-3/12 rounded-md">
          <h1 className="text-center text-lg font-semibold">Add Folder</h1>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <Input
                placeholder={"Folder 1"}
                label={"Folder Name"}
                name={"foldername"}
                type="text"
                onchange={handleChange}
              />
            </div>
            <div className="flex justify-center items-center gap-12 mt-8">
              <span
                onClick={() => setOpenAddFolderModal(false)}
                className="bg-red-600 px-4 py-2 text-white rounded-md hover:bg-red-700 cursor-pointer"
              >
                Cancel
              </span>
              <button className="bg-green-600 px-4 py-2 text-white rounded-md hover:bg-green-900">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;
