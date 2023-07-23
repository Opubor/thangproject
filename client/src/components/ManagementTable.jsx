import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import pages from "../assets/pages.png";
import multiple from "../assets/multiple-pages-add.png";
import axios from "../sevices/axios";
import dotsIcon from "../assets/Vector (21).png";
import arrowdown from "../assets/arrowdown.png";
import TableFunctions from "./table/TableFunctions";
import SearchInput from "./SearchInput";
import ReactPagination from "./ReactPaginate";
import TotalNo from "./TotalNo";
import BreadCrumb from "./BreadCrumb";
import { BiDownArrow } from "react-icons/bi";
import { BiUpArrow } from "react-icons/bi";
import { AiTwotoneDelete } from "react-icons/ai";

const ManagementTable = ({
  testCaseTableFunction,
  to,
  setOpenEditModal,
  setOpenDeleteModal,
  setopenAddCaseModal,
}) => {
  const [openTab, setOpenTab] = useState(1);
  const [testCaseTable, setTestCaseTable] = useState([]);
  const [testCases, setTestCases] = useState([]);
  const [tablename, setTablename] = useState([]);
  const [foldername, setFoldername] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [exportData, setExportData] = useState([]);

  // Getting Query From URL======================
  let search = useLocation().search;
  let folderId = new URLSearchParams(search).get("folder");
  let tableId = new URLSearchParams(search).get("table");
  // ====================================

  // Active classes=====================
  const activeClasses =
    "border-b-2 border-b-blue-700 text-blue-700 font-semibold";
  const inactiveClasses = "text-textgray";
  // ===================================

  // Get Test Case Table=================
  const getTestCaseTable = () => {
    axios
      .get("/testcasetable")
      .then((response) => {
        setTestCaseTable(response?.data);
        setTablename(
          response?.data.map((data, i) => {
            return tableId === data._id && data?.tablename;
          })
        );
      })
      .catch((response) => {
        console.log(response.data);
      });
  };
  // ===================================

  // Get test cases=====================
  const getTestCases = () => {
    axios
      .get(`/testcase?tableid=${tableId}`)
      .then((response) => {
        setTestCases(response?.data);
      })
      .catch((response) => {
        console.log(response.data);
      });
  };
  // ===================================

  // Get folders========================
  function getFolders() {
    axios
      .get("/folders")
      .then((response) => {
        setFoldername(
          response?.data.map((data, i) => {
            return folderId === data._id && data?.foldername;
          })
        );
      })
      .catch((response) => {
        console.log(response.data);
      });
  }
  // ===================================

  // Search============================
  const searchTable = (data) => {
    axios.get(`/testcase?q=${data}&tableid=${tableId}`).then((response) => {
      setTestCases(response.data);
      console.log(response.data);
      setCurrentPage(1);
    });
  };
  // ===================================

  // Sort high==========================
  const sortPriorityHigh = (data) => {
    axios.get(`/testcase?sortHigh=High&tableid=${tableId}`).then((response) => {
      setTestCases(response.data);
      console.log(response.data);
      setCurrentPage(1);
    });
  };
  // ===================================

  // Sort medium========================
  const sortPriorityMedium = (data) => {
    axios
      .get(`/testcase?sortMedium=Medium&tableid=${tableId}`)
      .then((response) => {
        setTestCases(response.data);
        setCurrentPage(1);
      });
  };
  // ===================================

  // Sort low==========================
  const sortPriorityLow = (data) => {
    axios.get(`/testcase?sortLow=Low&tableid=${tableId}`).then((response) => {
      setTestCases(response.data);
      setCurrentPage(1);
    });
  };
  // ===================================

  // Sort ascending====================
  const sortAscending = (data) => {
    axios
      .get(`/testcase?sortAsc=ascending&tableid=${tableId}`)
      .then((response) => {
        setTestCases(response.data);
        setCurrentPage(1);
      });
  };
  // ===================================

  // Sort descending====================
  const sortDescending = (data) => {
    axios
      .get(`/testcase?sortDsc=descending&tableid=${tableId}`)
      .then((response) => {
        setTestCases(response.data);
        setCurrentPage(1);
      });
  };
  // ===================================

  // Filter============================
  const submitFilter = (values, actions) => {
    axios
      .get(
        `/testcase?filterPriority=${values?.priority}&filterCategory=${values?.category}&filterStaff=${values?.assignedstaff}&tableid=${tableId}`
      )
      .then((res) => {
        setTestCases(res.data);
        setCurrentPage(1);
      })
      .catch((err) => {
        toast.error(err);
      });
    actions.setSubmitting(false);
  };
  // ===================================

  const handleExportData = () => {
    axios
      .get(`/exportData?tableid=${tableId}`)
      .then((response) => {
        setExportData(response.data);
      })
      .catch((response) => {
        console.log(response.data);
      });
  };

  useEffect(() => {
    getTestCaseTable();
    getTestCases();
    getFolders();
    handleExportData();
    if (tableId) {
      setOpenTab(tableId);
    }
  }, [tableId]);

  // PAGINATION
  // Get Current Posts
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = testCases.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(testCases.length / postsPerPage);
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };
  return (
    <>
      <BreadCrumb
        pageName={"Test Management"}
        currentFolder={foldername}
        currentTable={tablename}
      />
      <TableFunctions
        search={
          <>
            <SearchInput onSearch={searchTable} placeholder="Search by Title" />
          </>
        }
        setopenAddCaseModal={setopenAddCaseModal}
        sortHigh={sortPriorityHigh}
        sortMedium={sortPriorityMedium}
        sortLow={sortPriorityLow}
        fetchAll={getTestCases}
        sheetdata={exportData}
        submitFilter={submitFilter}
        reloadTestCase={getTestCases}
        tablename={tablename}
      />

      {/* ===============Test Management Table=============== */}
      <div className="rounded-sm border-b border-stroke bg-white shadow-default mt-4">
        <div className="flex flex-wrap gap-2 border-b border-stroke bg-white ">
          {/* =============Test Tables Tabs============= */}
          {testCaseTable.map((tab, i) => {
            return (
              <div key={tab?._id}>
                {tab?.assignedfolderId === folderId && (
                  <Link
                    key={tab?._id}
                    to={`${to}&table=${tab._id}`}
                    className={`px-4 py-1 border flex gap-2 items-center justify-center ${
                      openTab === tab._id ? activeClasses : inactiveClasses
                    }`}
                    onClick={() => {
                      setOpenTab(tab._id);
                    }}
                  >
                    <img src={pages} />
                    {tab.tablename}
                  </Link>
                )}
              </div>
            );
          })}
          {/* ========Add Test Case Table Button========= */}
          <div className="py-1 px-2">
            <button>
              <img src={multiple} onClick={testCaseTableFunction} />
            </button>
          </div>
          {/* ================================== */}
        </div>

        {/* ==============Test Case Table============= */}
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 border-b border-b-gray-300 text-left">
              <th className="flex items-center justify-between px-2">
                <div className="flex items-center">
                  <p className="font-semibold m-2">ID</p>
                </div>
                <div className="flex flex-col items-center justify-end gap-1">
                  <button onClick={sortAscending}>
                    {React.createElement(BiUpArrow, {
                      size: "10",
                    })}
                  </button>
                  <button onClick={sortDescending}>
                    {React.createElement(BiDownArrow, { size: "10" })}
                  </button>
                </div>
              </th>
              <th className="w-[32rem]">
                <p className="font-semibold border-l border-l-gray-200 border-r border-r-gray-200 mx-2 px-2">
                  Title
                </p>
              </th>
              <th>
                <p className="font-semibold border-r border-r-gray-200 m-2">
                  Category
                </p>
              </th>
              <th>
                <p className="font-semibold border-r border-r-gray-200 m-2">
                  Priority
                </p>
              </th>
              <th>
                <p className="font-semibold border-r border-r-gray-200 m-2">
                  Assiged To
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((data, i) => {
              return (
                <tr
                  className="text-sm font-semibold border-b-2 border-b-300"
                  key={data._id}
                >
                  {data.testcasetable === tableId && (
                    <>
                      <td className=" py-4 px-2">
                        <Link
                          to={`/test_management?caseId=${data._id}&id=${data?.caseid}&folder=${folderId}&table=${tableId}`}
                          className="w-full"
                          onClick={setOpenEditModal}
                        >
                          <p className="font-semibold">{data?.caseid}</p>
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={`/test_management?caseId=${data._id}&id=${data?.caseid}&folder=${folderId}&table=${tableId}`}
                          className="w-full"
                          onClick={setOpenEditModal}
                        >
                          <p className="border-l border-l-gray-200 border-r border-r-gray-200 mx-2 px-2 truncate w-[32rem]">
                            {data?.title}
                          </p>
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={`/test_management?caseId=${data._id}&id=${data?.caseid}&folder=${folderId}&table=${tableId}`}
                          className="w-full"
                          onClick={setOpenEditModal}
                        >
                          <p className="font-semibold border-r border-r-gray-200 m-2">
                            {data?.category}
                          </p>
                        </Link>
                      </td>
                      <td>
                        <div className="border-r border-r-gray-200 m-2">
                          <Link
                            to={`/test_management?caseId=${data._id}&id=${data?.caseid}&folder=${folderId}&table=${tableId}`}
                            className="w-full"
                            onClick={setOpenEditModal}
                          >
                            {data?.priority === "High" && (
                              <button className="px-8 py-1 bg-red-600 rounded-full text-white w-32">
                                {data?.priority}
                              </button>
                            )}
                            {data?.priority === "Medium" && (
                              <button className="px-8 py-1 bg-yellow-500 rounded-full text-white w-32">
                                {data?.priority}
                              </button>
                            )}
                            {data?.priority === "Low" && (
                              <button className="px-8 py-1 bg-green-500 rounded-full text-white w-32">
                                {data?.priority}
                              </button>
                            )}
                          </Link>
                        </div>
                      </td>
                      <td className="flex justify-between items-center m-2">
                        <Link
                          to={`/test_management?caseId=${data._id}&id=${data?.caseid}&folder=${folderId}&table=${tableId}`}
                          className="w-full"
                        >
                          <p
                            className="font-semibold cursor-pointer w-full"
                            onClick={setOpenEditModal}
                          >
                            {data?.assignedstaffname}
                          </p>
                        </Link>

                        <Link
                          to={`/test_management?caseId=${data._id}&id=${data?.caseid}&folder=${folderId}&table=${tableId}`}
                        >
                          <img
                            src={dotsIcon}
                            onClick={setOpenEditModal}
                            className="cursor-pointer"
                          />
                        </Link>
                      </td>
                      <td className="w-4">
                        <Link
                          to={`/test_management?deleteCase=${data._id}&folder=${folderId}&table=${tableId}`}
                        >
                          <span
                            onClick={setOpenDeleteModal}
                            className="cursor-pointer"
                          >
                            {React.createElement(AiTwotoneDelete, {
                              size: "20",
                            })}
                          </span>
                        </Link>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
            <tr></tr>
          </tbody>
        </table>
        {/* ===============Test Management Footer============== */}
        <div className="flex justify-end items-center gap-4 my-6 w-full">
          <div className="flex justify-center items-center gap-2">
            <h1>Rows per page: 10</h1> <img src={arrowdown} />
          </div>
          <TotalNo tablename={"Test Cases"} totalnumber={testCases?.length} />
          <div className="flex items-center gap-2">
            <ReactPagination
              pageCount={pageCount}
              handlePageClick={handlePageClick}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagementTable;
