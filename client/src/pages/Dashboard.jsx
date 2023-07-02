import React, { useState } from "react";
import leftArrow from "../assets/Vector (16).png";
import rightArrow from "../assets/Vector (17).png";
import arrowdown from "../assets/arrowdown.png";
import baseStep from "../assets/BaseStep.png";
import baseStep2 from "../assets/Base Step Elements (1).png";
import ColumnChart from "../assets/Group 1000004321.png";
import pieChart from "../assets/Group 26942.png";
import pieChartDetails from "../assets/Group 1000004342.png";
import { NavLink, Navigate, useNavigate, useLocation } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import axios from "../sevices/axios";
import { useEffect } from "react";
import PieChart from "../components/charts/PieChart";
import ReactPagination from "../components/ReactPaginate";
import TotalNo from "../components/TotalNo";
import BarChart from "../components/charts/BarChart";
import LineChart from "../components/charts/LineChart";

function Dashboard() {
  // Getting Query From URL
  let search = useLocation().search;
  let folderId = new URLSearchParams(search).get("folder");
  let tableId = new URLSearchParams(search).get("table");
  let caseId = new URLSearchParams(search).get("case");
  // ========================
  const [pieTestCase, setPieTestCase] = useState([]);
  const [testCaseTable, setTestCaseTable] = useState([]);
  const [folders, setFolders] = useState([]);
  const [testCases, setTestCases] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  function getTestCaseTable() {
    axios
      .get("/testcasetable")
      .then((response) => {
        setTestCaseTable(response?.data);
      })
      .catch((response) => {
        console.log(response.data);
      });
  }

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
  function getTestCases() {
    axios
      .get("/alltestcase")
      .then((response) => {
        setTestCases(response?.data);
      })
      .catch((response) => {
        console.log(response.data);
      });
  }

  useEffect(() => {
    getTestCaseTable();
    getFolders();
    getTestCases();
    function findOcc(arr, key) {
      let arr2 = [];

      arr.forEach((x) => {
        // Checking if there is any object in arr2
        // which contains the key value
        if (
          arr2.some((val) => {
            return val[key] == x[key];
          })
        ) {
          // If yes! then increase the occurrence by 1
          arr2.forEach((k) => {
            if (k[key] === x[key]) {
              k["occurrence"]++;
            }
          });
        } else {
          // If not! Then create a new object initialize
          // it with the present iteration key's value and
          // set the occurrence to 1
          let a = {};
          a[key] = x[key];
          a["occurrence"] = 1;
          arr2.push(a);
        }
      });

      return arr2;
    }
    axios
      .get("/testexecution")
      .then((response) => {
        setPieTestCase(findOcc(response?.data, "status"));
        console.log(findOcc(response?.data, "status"));
      })
      .catch((response) => {
        console.log(response.data);
      });
  }, []);

  // PAGINATION
  // Get Current Posts
  const postsPerPage = 4;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = folders.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(folders.length / postsPerPage);
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };
  return (
    <DefaultLayout>
      {/* ==========Body========= */}
      {/* =========Dashboard Cards============ */}
      <div className="bg-white px-4 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
          <div className="w-full flex-col justify-center items-center w-4/12 bg-themegray py-6 rounded-xl shadow shadow-md">
            <div className="flex justify-center items-center gap-4">
              <img src={baseStep} className="bg-blue-900 rounded-lg" />
              <h2 className="text-3xl text-textdark font-bold">
                {testCaseTable?.length}
              </h2>
            </div>
            <div className="text-center">
              <h1 className="text-sm text-textdark">
                Number of Testcase Table
              </h1>
            </div>
          </div>

          <div className="w-full flex-col justify-center items-center w-4/12 bg-themegray py-6 rounded-xl shadow shadow-md">
            <div className="flex justify-center items-center gap-4">
              <img src={baseStep2} className="bg-green-600 rounded-lg" />
              <h2 className="text-3xl text-textdark font-bold">
                {folders?.length}
              </h2>
            </div>
            <div className="text-center">
              <h1 className="text-sm text-textdark">Number of Folder</h1>
            </div>
          </div>

          <div className="w-full flex-col justify-center items-center w-4/12 bg-themegray py-6 rounded-xl shadow shadow-md">
            <div className="flex justify-center items-center gap-4">
              <img src={baseStep} className="bg-orange-400 rounded-lg" />
              <h2 className="text-3xl text-textdark font-bold">
                {testCases?.length}
              </h2>
            </div>
            <div className="text-center">
              <h1 className="text-sm text-textdark">Number of Case</h1>
            </div>
          </div>
        </div>
      </div>

      {/* ===============Column Chart/ Most testcase have fail cases============= */}
      <div className="bg-white mt-8 flex flex-col justify-between lg:flex-row gap-4 px-4">
        {/* ==========Column Chart========== */}
        <div className="w-full lg:w-8/12 p-4 h-80">
          <h1 className="font-semibold text-xl mb-4">
            Total of status case pass/fail
          </h1>
          {/* <img src={ColumnChart} /> */}
          <BarChart
            chartdata={{
              labels: pieTestCase.map((data, i) => {
                return data.status;
              }),
              datasets: [
                {
                  label: "Test Execution",
                  data: pieTestCase.map((data, i) => {
                    return data.occurrence;
                  }),
                  backgroundColor: [
                    "#EB7A12",
                    "#DADADA",
                    "#FF4C51",
                    "#3A3541",
                    "#56CA00",
                    "#32BAFF",
                    "#32BAGF",
                  ],
                  borderWidth: 0,
                  Width: "20px",
                },
              ],
            }}
            opt={{
              responsive: true,
              radius: 90,
              plugins: {
                legend: {
                  display: true,
                  position: "right",
                  labels: {
                    usePointStyle: true,
                    fontSize: 1,
                    pointStyle: "circle",
                  },
                },

                title: {
                  display: false,
                  text: "Chart.js Pie Chart",
                },
              },
            }}
          />
        </div>
        {/* ======== Most testcase have fail cases========== */}
        <div className="w-full lg:w-4/12 rounded-3xl border-2 p-6">
          <h1 className="text-center mb-8 font-semibold">
            Most testcase have fail cases
          </h1>
          <div className="flex justify-between items-center border-b border-b-gray-300 px-8 mt-4 text-sm py-2">
            <h1 className="text-darkblue font-semibold w-full">File</h1>
            <h2 className="text-darkblue font-semibold w-full">
              Number of case fail
            </h2>
          </div>

          {testCaseTable.map((data, i) => {
            return (
              <>
                <div>
                  {data.testcases.map((dd, i) => {
                    return (
                      <>
                        <div className="flex justify-between items-center">
                          {dd?.status === "False" && (
                            <>
                              <p>{data?.tablename}</p>
                              <p>{dd?.status}</p>
                            </>
                          )}
                        </div>
                      </>
                    );
                  })}
                </div>
              </>
            );
          })}
          {/* <div className="flex justify-between items-center border-b border-b-gray-300 px-8 mt-4 text-sm py-2">
            <h1 className="text-textdark font-semibold w-full">File 5</h1>
            <h2 className="text-textdark font-semibold w-full">150</h2>
          </div>
          <div className="flex justify-between items-center border-b border-b-gray-300 px-8 mt-4 text-sm py-2">
            <h1 className="text-textdark font-semibold w-full">File 7</h1>
            <h2 className="text-textdark font-semibold w-full">100</h2>
          </div>
          <div className="flex justify-between items-center border-b border-b-gray-300 px-8 mt-4 text-sm py-2">
            <h1 className="text-textdark font-semibold w-full">File 13</h1>
            <h2 className="text-textdark font-semibold w-full">10</h2>
          </div> */}
        </div>
      </div>

      {/* ===============Test Repository Details/Total of status case/PIECHART============= */}
      <div className="bg-white mt-8 flex flex-col lg:flex-row justify-between gap-4 pb-8 px-4">
        {/* ==========Test Repository Details========== */}
        <div className="w-full lg:w-8/12 p-4 h-80">
          <h1 className="font-semibold text-xl">Test Repository Details</h1>
          <table className="w-full text-left mt-6">
            <thead className="border-b-2">
              <tr>
                <th className="font-semibold px-4 py-2">Folder</th>
                <th className="font-semibold px-4 py-2">File</th>
                <th className="font-semibold px-4 py-2">Testcase</th>
              </tr>
            </thead>
            <tbody className="odd:bg-gray-100">
              {currentPosts.map((data, i) => {
                return (
                  <tr className="border-b-2 hover:bg-gray-100">
                    <td className="p-4">{data?.foldername}</td>
                    <td className="p-4">{data?.testtables?.length}</td>
                    <td className="p-4">{data?.testcases?.length}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex justify-end items-center gap-4">
            <ReactPagination
              pageCount={pageCount}
              handlePageClick={handlePageClick}
            />
            <TotalNo tablename={"Folders"} totalnumber={folders?.length} />
          </div>
          {/* <div className="flex justify-end items-center gap-4 mt-2">
            <div className="flex justify-center items-center gap-2">
              <h1>Rows per page: 10</h1>
              <img src={arrowdown} />
            </div>
            <h2>1-5 of 13</h2>
            <div className="flex items-center gap-2">
              <img src={leftArrow} />
              <img src={rightArrow} />
            </div>
          </div> */}
        </div>
        {/* ========Total of status case/PIECHART========== */}
        <div className="w-full lg:w-4/12 rounded-3xl border-2 p-6">
          <h1 className="text-xl mb-8 font-bold">Total of status case</h1>
          <div className="flex justify-between items-center h-60">
            <div className="w-full flex justify-center">
              <PieChart
                chartdata={{
                  labels: pieTestCase.map((data, i) => {
                    return data.status;
                  }),
                  datasets: [
                    {
                      label: "Test Execution",
                      data: pieTestCase.map((data, i) => {
                        return data.occurrence;
                      }),
                      backgroundColor: [
                        "#EB7A12",
                        "#DADADA",
                        "#FF4C51",
                        "#3A3541",
                        "#56CA00",
                        "#32BAFF",
                        "#32BAGF",
                      ],
                      borderWidth: 0,
                      Width: "20px",
                    },
                  ],
                }}
                opt={{
                  responsive: true,
                  radius: 90,
                  plugins: {
                    legend: {
                      display: true,
                      position: "right",
                      labels: {
                        usePointStyle: true,
                        fontSize: 1,
                        pointStyle: "circle",
                      },
                    },

                    title: {
                      display: false,
                      text: "Chart.js Pie Chart",
                    },
                  },
                }}
              />
            </div>
            {/* <div className="w-4/12 flex flex-col justify-end">
              {pieTestCase.map((data, i) => {
                return (
                  <>
                    <h1>{data.occurrence.length}</h1>
                    <div
                      className="flex items-center text-sm"
                      style={{ color: "#EB7A12" }}
                    >
                      {data.status === "Pending" && (
                        <div className="flex items-center">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: "#EB7A12" }}
                          >
                            {" "}
                          </div>
                          {data.occurrence}
                          {"  "}
                          {data.status}
                        </div>
                      )}
                    </div>

                    <div
                      className="font-semibold flex gap-2 items-center"
                      style={{ color: "#DADADA" }}
                    >
                      {data.status === "Blank" && (
                        <>
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: "#DADADA" }}
                          >
                            {" "}
                          </div>
                          {data.occurrence}
                          {"  "}
                          {data.status}
                        </>
                      )}
                    </div>

                    <div
                      className="font-semibold flex gap-2 items-center"
                      style={{ color: "#FF4C51" }}
                    >
                      {data.status === "False" && (
                        <>
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: "#FF4C51" }}
                          >
                            {" "}
                          </div>
                          {data.occurrence}
                          {"  "}
                          {data.status}
                        </>
                      )}
                    </div>

                    <div
                      className="font-semibold flex gap-2 items-center"
                      style={{ color: "#3A3541" }}
                    >
                      {data.status === "Cancel" && (
                        <>
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: "#3A3541" }}
                          >
                            {" "}
                          </div>
                          {data.occurrence}
                          {"  "}
                          {data.status}
                        </>
                      )}
                    </div>

                    <div
                      className="font-semibold flex gap-2 items-center"
                      style={{ color: "#56CA00" }}
                    >
                      {data.status === "Pass" && (
                        <>
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: "#56CA00" }}
                          >
                            {" "}
                          </div>
                          {data.occurrence}
                          {"  "}
                          {data.status}
                        </>
                      )}
                    </div>

                    <div
                      className="font-semibold flex gap-2 items-center"
                      style={{ color: "#32BAFF" }}
                    >
                      {data.status === "Block" && (
                        <>
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: "#32BAFF" }}
                          >
                            {" "}
                          </div>
                          {data.occurrence}
                          {"  "}
                          {data.status}
                        </>
                      )}
                    </div>
                  </>
                );
              })}
            </div> */}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Dashboard;
