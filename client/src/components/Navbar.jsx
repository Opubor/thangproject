import React from "react";
import { NavLink } from "react-router-dom";
import dashboardicon from "../assets/report-columns.png";
import testmanagementicon from "../assets/share-android.png";
import testenvironmenticon from "../assets/paste-clipboard.png";
import testexecutionicon from "../assets/stats-report.png";
import testreporticon from "../assets/Vector (15).png";
import settingsicon from "../assets/Path.png";

function Navbar({ children }) {
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
  );
}

export default Navbar;
