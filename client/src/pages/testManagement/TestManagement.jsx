import React, { useEffect, useState } from "react";

import { useLocation, Link } from "react-router-dom";
import DefaultLayout from "../../components/DefaultLayout";
import FourTabs from "../../components/FourTabs";
import clipBoard from "../../assets/paste-clipboard.png";
import folder from "../../assets/Vector (7).png";
import page from "../../assets/page.png";
import axios from "../../sevices/axios";
import AddTestCaseTable from "./AddTestCaseTable";
import AddTestCase from "./AddTestCase";
import RenameFolder from "../../components/folders/RenameFolder";
import DeleteFolder from "../../components/folders/DeleteFolder";
import TableFunctions from "../../components/table/TableFunctions";
import { toast } from "react-toastify";
import EditTestCase from "./EditTestCase";

function TestManagement() {
  const [openAddCaseModal, setopenAddCaseModal] = useState(false);
  const [openAddTestCaseModal, setopenAddTestCaseModal] = useState(false);
  const [OpenEditModal, setsetOpenEditModal] = useState(false);

  // Getting Query From URL
  let search = useLocation().search;
  const folderId = new URLSearchParams(search).get("folder");
  const tableId = new URLSearchParams(search).get("table");
  const caseId = new URLSearchParams(search).get("caseId");
  const renamefolder = new URLSearchParams(search).get("renamefolder");
  const deletefolder = new URLSearchParams(search).get("deletefolder");

  return (
    <>
      <DefaultLayout>
        <div className="p-4 lg:h-screen">
          {folderId ? (
            <>
              {/* ==================BreadCrumb=================== */}
              <div className="flex items-center gap-2 mb-4">
                <h1 className="text-sm flex items-center gap-1">
                  <img src={clipBoard} /> Test Execution/{" "}
                </h1>
                <h1 className="text-sm flex items-center gap-1">
                  <img src={folder} className="w-4 bg-gray-300" /> Folder 1/{" "}
                </h1>
                <h1 className="text-sm flex items-center gap-1">
                  <img src={page} /> File 1
                </h1>
              </div>
              {/* ========Table Functions========= */}
              <TableFunctions
                search={
                  <form>
                    <input
                      type="search"
                      className="px-4 py-2 rounded-md border border-gray-300 w-full focus:outline-none"
                      placeholder="Search"
                    />
                  </form>
                }
                setopenAddCaseModal={() => setopenAddCaseModal(true)}
              />
              {/* =========Main Table======== */}

              <FourTabs
                to={`/test_management?folder=${folderId}`}
                testCaseTableFunction={() => setopenAddTestCaseModal(true)}
                setOpenEditModal={() => setsetOpenEditModal(true)}
              />
            </>
          ) : (
            <div className="border border-blue-600 rounded-xl w-full p-44">
              <p className="text-center text-gray-400 font-semibold">
                Select a folder to get more details
              </p>
            </div>
          )}
        </div>
      </DefaultLayout>
      {/* ==========Add Case=========== */}
      <AddTestCase
        setopenAddCaseModal={() => setopenAddCaseModal(false)}
        styles={openAddCaseModal ? "flex" : "hidden"}
      />
      {/* =========Add Test Case Table=========== */}
      <AddTestCaseTable
        setopenAddTestCaseModal={() => setopenAddTestCaseModal(false)}
        styles={openAddTestCaseModal ? "flex" : "hidden"}
      />
      {/*=================Rename Folder============= */}
      {renamefolder && (
        <RenameFolder styles={renamefolder ? "flex" : "hidden"} />
      )}
      {deletefolder && (
        <DeleteFolder styles={deletefolder ? "flex" : "hidden"} />
      )}
      <EditTestCase styles={OpenEditModal ? "flex" : "hidden"} />
    </>
  );
}

export default TestManagement;
