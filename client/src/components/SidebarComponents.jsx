import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pages from "../assets/pages.png";
import multiple from "../assets/multiple-pages-add.png";
import dotsIcon from "../assets/Vector (21).png";
import addPage from "../assets/add-page.png";
import arrowdown from "../assets/arrowdown.png";
import filepic from "../assets/Vector (7).png";
import axios from "../sevices/axios";
import { useLocation } from "react-router-dom";

const SidebarComponents = ({ styles, setOpenRenameFolderModal }) => {
  // Getting Query From URL
  let search = useLocation().search;
  const folderId = new URLSearchParams(search).get("folder");
  const tableId = new URLSearchParams(search).get("table");

  const [openFolder, setOpenFolder] = useState(false);
  const [openedFolderId, setOpenedFolderId] = useState("");
  const [openedTableId, setOpenedTableId] = useState("");
  const [renameDelete, setRenameDelete] = useState(false);
  const [renameDeleteId, setRenameDeleteId] = useState("");
  const [folders, setFolders] = useState([]);

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
    if (tableId) {
      setOpenedTableId(tableId);
    }
  }, [tableId]);

  return (
    <>
      {folders.map((data, i) => {
        return (
          <div key={i}>
            <Link
              to={`/test_management?folder=${data._id}`}
              className={`flex justify-between items-center mt-6 text-textdark p-2 font-semibold cursor-pointer ${
                openedFolderId === data._id
                  ? "bg-gray-300 text-black shadow shadow-sm"
                  : ""
              } ${styles}`}
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
            {/* ======Tables===== */}
            <div
              className={`${
                openedFolderId === data?._id ? "block" : "hidden"
              } px-4`}
            >
              <p>
                {data?.testtables.map((data, i) => {
                  return (
                    <Link
                      to={`/test_management?folder=${openedFolderId}&table=${data._id}`}
                      className={`flex items-center gap-2 py-2 ${
                        openedTableId === data._id
                          ? "bg-blue-500 text-black shadow shadow-sm"
                          : ""
                      }`}
                      onClick={() => setOpenedTableId(data._id)}
                    >
                      <img src={addPage} />
                      <p>{data?.tablename}</p>
                    </Link>
                  );
                })}
              </p>
            </div>
            <div
              className={`bg-gray-200 rounded-xl shadow shadow-lg text-sm text-center fixed left-56 w-32 -translate-y-4 z-50 ${
                renameDeleteId === data?._id ? "block" : "hidden"
              }`}
            >
              <div className="border-b border-b-gray-300 p-2 cursor-pointer hover:bg-gray-400 rounded-t-xl w-full">
                <Link
                  to={`/test_management?renamefolder=${data?._id}`}
                  className="px-8"
                >
                  Rename
                </Link>
              </div>
              <div className="hover:bg-gray-400 rounded-b-xl p-2">
                <Link
                  to={`/test_management?deletefolder=${data?._id}`}
                  className="px-8"
                >
                  Delete
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SidebarComponents;
