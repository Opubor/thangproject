import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
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
import ButtonPreloader from "../../components/ButtonPreloader";
import DeleteTestCase from "./DeleteTestCase";

function TestManagement() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [openAddCaseModal, setopenAddCaseModal] = useState(false);
  const [openAddTestCaseModal, setopenAddTestCaseModal] = useState(false);
  const [OpenEditModal, setsetOpenEditModal] = useState(false);
  const [OpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [testCaseTable, setTestCaseTable] = useState([]);

  // Getting Query From URL
  let search = useLocation().search;
  const folderId = new URLSearchParams(search).get("folder");
  const tableId = new URLSearchParams(search).get("table");
  const caseId = new URLSearchParams(search).get("caseId");
  const renamefolder = new URLSearchParams(search).get("renamefolder");
  const deletefolder = new URLSearchParams(search).get("deletefolder");
  const deleteCase = new URLSearchParams(search).get("deleteCase");

  return (
    <>
      <DefaultLayout>
        <div className="p-4 mt-24 md:mt-12 lg:h-screen">
          {folderId ? (
            <>
              {/* ==================BreadCrumb=================== */}

              {/* =========Main Table======== */}

              <FourTabs
                to={`/test_management?folder=${folderId}`}
                testCaseTableFunction={() => setopenAddTestCaseModal(true)}
                setOpenEditModal={() => setsetOpenEditModal(true)}
                setOpenDeleteModal={() => setOpenDeleteModal(true)}
                testCaseTable={testCaseTable}
                setopenAddCaseModal={() => setopenAddCaseModal(true)}
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
      <EditTestCase
        styles={OpenEditModal ? "flex" : "hidden"}
        setsetOpenEditModal={() => {
          setsetOpenEditModal(false);
        }}
      />
      <DeleteTestCase
        styles={OpenDeleteModal ? "flex" : "hidden"}
        setOpenDeleteModal={() => {
          setOpenDeleteModal(false);
        }}
      />
    </>
  );
}

export default TestManagement;
