import React, { useEffect, useState, useRef } from "react";
import { useLocation, Link, useNavigate, Navigate } from "react-router-dom";
import DefaultLayout from "../../components/DefaultLayout";
import ManagementTable from "../../components/ManagementTable";
import AddTestCaseTable from "./AddTestCaseTable";
import AddTestCase from "./AddTestCase";
import RenameFolder from "../../components/folders/RenameFolder";
import DeleteFolder from "../../components/folders/DeleteFolder";
import EditTestCase from "./EditTestCase";
import DeleteTestCase from "./DeleteTestCase";
import DeleteTestCaseTable from "./DeleteTestCaseTable";
import EditTestCaseTable from "./EditTestCaseTable";

function TestManagement() {
  const navigate = useNavigate();
  const [openAddCaseModal, setopenAddCaseModal] = useState(false);
  const [openAddTestCaseModal, setopenAddTestCaseModal] = useState(false);
  const [OpenEditModal, setsetOpenEditModal] = useState(false);
  const [OpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [testCaseTable, setTestCaseTable] = useState([]);

  // Getting Query From URL=================
  let search = useLocation().search;
  const folderId = new URLSearchParams(search).get("folder");
  const tableId = new URLSearchParams(search).get("table");
  const caseId = new URLSearchParams(search).get("caseId");
  const renamefolder = new URLSearchParams(search).get("renamefolder");
  const deletefolder = new URLSearchParams(search).get("deletefolder");
  const edittable = new URLSearchParams(search).get("edit_table");
  const deletetable = new URLSearchParams(search).get("deletetable");
  let EditCaseRef = useRef();
  function editCaseModal() {
    let closeEditCaseModal = (e) => {
      if (EditCaseRef.current != null) {
        if (!EditCaseRef.current.contains(e.target)) {
          // navigate(`/test_management?folder=${folderId}&table=${tableId}`, {
          //   replace: true,
          // });
          return setsetOpenEditModal(false);
        }
      }
    };
    document.addEventListener("mousedown", closeEditCaseModal);
    return () => {
      document.removeEventListener("mousedown", closeEditCaseModal);
    };
  }
  useEffect(() => {
    editCaseModal();
  }, []);

  return (
    <>
      <DefaultLayout>
        <div className="p-4 mt-24 md:mt-12 lg:h-screen">
          {folderId ? (
            <>
              {/* ==================BreadCrumb=================== */}

              {/* =========Main Table======== */}

              <ManagementTable
                to={`/test_management?folder=${folderId}`}
                testCaseTableFunction={() => setopenAddTestCaseModal(true)}
                setOpenEditModal={() => setsetOpenEditModal(true)}
                setOpenDeleteModal={() => setOpenDeleteModal(true)}
                testCaseTable={testCaseTable}
                setopenAddCaseModal={() => setopenAddCaseModal(true)}
              />
            </>
          ) : (
            <div className="border border-blue-600 rounded-xl w-full p-44 mt-2">
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
        // testTableRef={tableRef}
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
      {edittable && (
        <EditTestCaseTable styles={edittable ? "flex" : "hidden"} />
      )}
      {deletetable && (
        <DeleteTestCaseTable styles={deletetable ? "flex" : "hidden"} />
      )}
      <EditTestCase
        EditCaseRef={EditCaseRef}
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
