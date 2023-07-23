import React from "react";
import SidebarComponents from "./SidebarComponents";
import plus from "../assets/add-circle.png";

function Sidebar({ styles, setOpenAddFolderModal, setOpenRenameFolderModal }) {
  return (
    <div
      className={`xl:flex xl:w-72 mt-16 xl:mt-0 fixed left-0 flex-col p-8 ${styles}`}
    >
      <h1 className="font-bold text-lg text-textgray">Test Repository</h1>
      <h1
        onClick={setOpenAddFolderModal}
        className="bg-darkblue px-8 py-2 text-white mt-8 rounded-md flex justify-between items-center cursor-pointer"
      >
        Add Folder
        <img src={plus} />
      </h1>
      <div>
        <SidebarComponents
          setOpenRenameFolderModal={setOpenRenameFolderModal}
        />
      </div>
    </div>
  );
}

export default Sidebar;
