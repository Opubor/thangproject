import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pages from "../assets/pages.png";
import multiple from "../assets/multiple-pages-add.png";
import dotsIcon from "../assets/Vector (21).png";
import addPage from "../assets/add-page.png";
import arrowdown from "../assets/arrowdown.png";
import filepic from "../assets/Vector (7).png";
import axios from "../sevices/axios";

const Sidebar = ({}) => {
  const [openFolder, setOpenFolder] = useState(false);
  const [openedFolderId, setOpenedFolderId] = useState("");
  const [renameDelete, setRenameDelete] = useState(false);
  const [renameDeleteId, setRenameDeleteId] = useState("");
  const [folders, setFolders] = useState([]);
  const [openRenameFolder, setopenRenameFolder] = useState(false);

  function getFolders() {
    axios
      .get("/folders")
      .then((response) => {
        setFolders(response?.data);
      })
      .catch((response) => {
        console.log(response.data);
      });
  }

  useEffect(() => {
    getFolders();
  }, []);

  return (
    <>
      {folders.map((data, i) => {
        return (
          <div key={i}>
            <Link
              to={`/test_management?folder=${data?._id}`}
              className={`flex justify-between items-center mt-6 text-textdark p-2 font-semibold cursor-pointer ${
                openedFolderId === data._id
                  ? "bg-gray-300 text-black rounded-lg shadow shadow-sm"
                  : ""
              }`}
              onClick={() => {
                openFolder === true
                  ? setOpenFolder(false)
                  : setOpenFolder(true);
                openedFolderId === data?._id
                  ? setOpenedFolderId(null)
                  : setOpenedFolderId(data._id);
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                renameDelete === true
                  ? setRenameDelete(false)
                  : setRenameDelete(true);
                renameDeleteId === data?._id
                  ? setRenameDeleteId(null)
                  : setRenameDeleteId(data?._id);
              }}
            >
              <div className={`flex items-center gap-2 `}>
                <img src={filepic} />
                {data?.foldername}
              </div>
              <div className="flex items-center gap-2">
                <img src={arrowdown} />
              </div>
            </Link>
            <div
              className={`${openedFolderId === data?._id ? "block" : "hidden"}`}
            >
              <p>{data?._id}</p>
            </div>
            <div
              className={`bg-gray-200 rounded-xl shadow shadow-lg text-sm text-center fixed left-56 w-32 -translate-y-4 ${
                renameDeleteId === data?._id ? "block" : "hidden"
              }`}
            >
              <div className="border-b border-b-gray-300 p-2">
                <button>Rename</button>
              </div>
              <button className="p-2">Delete</button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Sidebar;
