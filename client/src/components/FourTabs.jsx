import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import pages from "../assets/pages.png";
import multiple from "../assets/multiple-pages-add.png";
import axios from "../sevices/axios";
import Table from "./table/Table";
import dotsIcon from "../assets/Vector (21).png";
import deleteIcon from "../assets/delete-circle.png";
import leftArrow from "../assets/Vector (16).png";
import rightArrow from "../assets/Vector (17).png";
import arrowdown from "../assets/arrowdown.png";
import TableFunctions from "./table/TableFunctions";
import SearchInput from "./SearchInput";
import ReactPagination from "./ReactPaginate";
import TotalNo from "./TotalNo";
import BreadCrumb from "./BreadCrumb";

const FourTabs = ({
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

  // Getting Query From URL
  let search = useLocation().search;
  let folderId = new URLSearchParams(search).get("folder");
  let tableId = new URLSearchParams(search).get("table");

  const activeClasses =
    "border-b-2 border-b-blue-700 text-blue-700 font-semibold";
  const inactiveClasses = "text-textgray";

  const getTestCaseTable = () => {
    axios
      .get("/testcasetable")
      .then((response) => {
        setTestCaseTable(response?.data);
        setTablename(
          response?.data.map((data, i) => {
            return <>{tableId === data._id && data?.tablename}</>;
          })
        );
      })
      .catch((response) => {
        console.log(response.data);
      });
  };
  // GET TEST CASES
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
  // GET FOLDERS
  function getFolders() {
    axios
      .get("/folders")
      .then((response) => {
        setFoldername(
          response?.data.map((data, i) => {
            return <>{folderId === data._id && data?.foldername}</>;
          })
        );
      })
      .catch((response) => {
        console.log(response.data);
      });
  }
  // SEARCH
  const searchTable = (data) => {
    axios.get(`/testcase?q=${data}&tableid=${tableId}`).then((response) => {
      setTestCases(response.data);
      console.log(response.data);
      setCurrentPage(1);
    });
  };
  // SORT_HIGH
  const sortPriorityHigh = (data) => {
    axios.get(`/testcase?sortHigh=High&tableid=${tableId}`).then((response) => {
      setTestCases(response.data);
      console.log(response.data);
      setCurrentPage(1);
    });
  };
  // SORT_MEDIUM
  const sortPriorityMedium = (data) => {
    axios
      .get(`/testcase?sortMedium=Medium&tableid=${tableId}`)
      .then((response) => {
        setTestCases(response.data);
        console.log(response.data);
        setCurrentPage(1);
      });
  };
  // SORT_LOW
  const sortPriorityLow = (data) => {
    axios.get(`/testcase?sortLow=Low&tableid=${tableId}`).then((response) => {
      setTestCases(response.data);
      console.log(response.data);
      setCurrentPage(1);
    });
  };

  useEffect(() => {
    getTestCaseTable();
    getTestCases();
    getFolders();
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
            <SearchInput onSearch={searchTable} />
          </>
        }
        setopenAddCaseModal={setopenAddCaseModal}
        sortHigh={sortPriorityHigh}
        sortMedium={sortPriorityMedium}
        sortLow={sortPriorityLow}
      />

      <div className="rounded-sm border-b border-stroke bg-white shadow-default mt-4">
        <div className="flex flex-wrap gap-2 border-b border-stroke bg-white ">
          {testCaseTable.map((tab, i) => {
            return (
              <>
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
              </>
            );
          })}
          <div className="py-1 px-4 ml-8">
            <button>
              <img src={multiple} onClick={testCaseTableFunction} />
            </button>
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 border-b border-b-gray-300 text-left">
              <th className="flex items-center px-2">
                <input type="checkbox" className="w-4" />
                <p className="font-semibold m-2">ID</p>
              </th>
              <th>
                <p className="font-semibold border-l-2 border-l-gray-400 border-r-2 border-r-gray-400 mx-2 px-2">
                  Title
                </p>
              </th>
              <th>
                <p className="font-semibold border-r-2 border-r-gray-400 m-2">
                  Category
                </p>
              </th>
              <th>
                <p className="font-semibold border-r-2 border-r-gray-400 m-2">
                  Priority
                </p>
              </th>
              <th>
                <p className="font-semibold border-r-2 border-r-gray-400 m-2">
                  Assiged To
                </p>
              </th>
              <th className="w-4">
                <p>
                  <img src={dotsIcon} />
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((data, i) => {
              return (
                <>
                  {data.testcasetable === tableId && (
                    <tr className="text-sm font-semibold" key={i}>
                      <td className="flex justify-start items-center gap-2 py-4 px-2">
                        <input type="checkbox" className="w-4" />
                        <p className="font-semibold">
                          {tablename}
                          {"-"}
                          {tableId && (
                            <>{i + 1 * (currentPage * postsPerPage - 9)}</>
                          )}
                        </p>
                      </td>
                      <td>
                        <p className="border-l-2 border-l-gray-400 border-r-2 border-r-gray-400 mx-2 px-2">
                          {data?.title}
                        </p>
                      </td>
                      <td>
                        <p className="font-semibold border-r-2 border-r-gray-400 m-2">
                          {data?.category}
                        </p>
                      </td>
                      <td>
                        <div className="border-r-2 border-r-gray-400 m-2">
                          {data?.priority === "High" && (
                            <button className="px-8 py-1 bg-red-600 rounded-full text-white w-32 ">
                              {data?.priority}
                            </button>
                          )}
                          {data?.priority === "Medium" && (
                            <button className="px-8 py-1 bg-yellow-500 rounded-full text-white w-32 ">
                              {data?.priority}
                            </button>
                          )}
                          {data?.priority === "Low" && (
                            <button className="px-8 py-1 bg-green-500 rounded-full text-white w-32 ">
                              {data?.priority}
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="flex justify-between items-center m-2">
                        <p className="font-semibold">{data?.assignedstaff}</p>
                        <Link
                          to={`/test_management?caseId=${data._id}&folder=${folderId}&table=${tableId}`}
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
                          <img
                            src={deleteIcon}
                            onClick={setOpenDeleteModal}
                            className="cursor-pointer"
                          />
                        </Link>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
            <tr></tr>
          </tbody>
        </table>

        {/* <div>
          {testCaseTable.map((tab) => (
            <div
              key={tab._id}
              className={`leading-relaxed ${
                openTab === tab._id ? "block" : "hidden"
              }`}
            >
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 border-b border-b-gray-300 text-left">
                    <th className="flex items-center px-2">
                      <input type="checkbox" className="w-4" />
                      <p className="font-semibold m-2">ID</p>
                    </th>
                    <th>
                      <p className="font-semibold border-l-2 border-l-gray-400 border-r-2 border-r-gray-400 mx-2 px-2">
                        Title
                      </p>
                    </th>
                    <th>
                      <p className="font-semibold border-r-2 border-r-gray-400 m-2">
                        Category
                      </p>
                    </th>
                    <th>
                      <p className="font-semibold border-r-2 border-r-gray-400 m-2">
                        Priority
                      </p>
                    </th>
                    <th>
                      <p className="font-semibold border-r-2 border-r-gray-400 m-2">
                        Assiged To
                      </p>
                    </th>
                    <th className="w-4">
                      <p>
                        <img src={dotsIcon} />
                      </p>
                    </th>
                  </tr>
                </thead>

                {tableId === tab._id && (
                  <tbody>
                    {tab.testcases.map((data, i) => {
                      return (
                        <tr className="text-sm font-semibold" key={i}>
                          <td className="flex justify-start items-center gap-2 py-4 px-2">
                            <input type="checkbox" className="w-4" />
                            <p className="font-semibold">
                              {tab?.tablename}
                              {"-"}
                              {i + 1 * (1 * 10 - 9)}
                            </p>
                          </td>
                          <td>
                            <p className="border-l-2 border-l-gray-400 border-r-2 border-r-gray-400 mx-2 px-2">
                              {data?.title}
                            </p>
                          </td>
                          <td>
                            <p className="font-semibold border-r-2 border-r-gray-400 m-2">
                              {data?.category}
                            </p>
                          </td>
                          <td>
                            <div className="border-r-2 border-r-gray-400 m-2">
                              {data?.priority === "High" && (
                                <button className="px-8 py-1 bg-red-600 rounded-full text-white w-32 ">
                                  {data?.priority}
                                </button>
                              )}
                              {data?.priority === "Medium" && (
                                <button className="px-8 py-1 bg-yellow-500 rounded-full text-white w-32 ">
                                  {data?.priority}
                                </button>
                              )}
                              {data?.priority === "Low" && (
                                <button className="px-8 py-1 bg-green-500 rounded-full text-white w-32 ">
                                  {data?.priority}
                                </button>
                              )}
                            </div>
                          </td>
                          <td className="flex justify-between items-center m-2">
                            <p className="font-semibold">
                              {data?.assignedstaff}
                            </p>
                            <Link
                              to={`/test_management?caseId=${data._id}&folder=${folderId}&table=${tableId}`}
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
                              <img
                                src={deleteIcon}
                                onClick={setOpenDeleteModal}
                                className="cursor-pointer"
                              />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                )}
              </table>
            </div>
          ))}
        </div> */}
      </div>
      <div className="flex justify-end items-center gap-4">
        <ReactPagination
          pageCount={pageCount}
          handlePageClick={handlePageClick}
        />
        <TotalNo tablename={"Test Cases"} totalnumber={testCases?.length} />
      </div>
    </>
  );
};

export default FourTabs;
