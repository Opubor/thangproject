import React, { useState } from "react";
import AddFolder from "./folders/AddFolder";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import RenameFolder from "./folders/RenameFolder";
import AvatarDropdown from "./AvatarDropdown";
import TopNavbar from "./TopNavbar";

function DefaultLayout({ children }) {
  const [openAvatarDropdown, setOpenAvatarDropdown] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openAddFolderModal, setOpenAddFolderModal] = useState(false);
  const [openRenameFolderModal, setopenRenameFolderModal] = useState(false);

  return (
    <div className="w-full">
      {/* ========Avatar/TopNavbar====== */}
      <TopNavbar
        openSidebar={() => {
          openSidebar === true ? setOpenSidebar(false) : setOpenSidebar(true);
        }}
        openAvatar={() => {
          openAvatarDropdown === true
            ? setOpenAvatarDropdown(false)
            : setOpenAvatarDropdown(true);
        }}
      />
      {/* =========Avatar Dropdown========== */}
      <AvatarDropdown styles={openAvatarDropdown ? "block" : "hidden"} />

      {/* =============Sidebar/Navbar============= */}
      <div className="w-full bg-themegray pb-4 flex justify-between mt-12">
        {/* =============Sidebar============= */}
        <Sidebar
          styles={openSidebar ? "flex bg-themegray w-full" : "hidden"}
          setOpenAddFolderModal={() => setOpenAddFolderModal(true)}
          setOpenRenameFolderModal={() => setopenRenameFolderModal(true)}
        />

        {/* ==============Navbar=============== */}
        <Navbar children={children} />
      </div>

      {/* ==============Footer================ */}
      <Footer />

      {/* =============AddFolderModal========= */}
      <AddFolder
        styles={openAddFolderModal ? "flex" : "hidden"}
        cancelButton={() => setOpenAddFolderModal(false)}
      />
    </div>
  );
}

export default DefaultLayout;
