import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import DefaultLayout from "../../components/DefaultLayout";
import plusBlue from "../../assets/add-circle-blue.png";
import dots from "../../assets/Vector (21).png";
import editpenblack from "../../assets/editpenblack.png";
import { useState } from "react";
import PieChart from "../../components/charts/PieChart";
import axios from "../../sevices/axios";
import { Link, useLocation } from "react-router-dom";
import ButtonPreloader from "../../components/ButtonPreloader";
import { toast } from "react-toastify";
import ReactPagination from "../../components/ReactPaginate";
import TotalNo from "../../components/TotalNo";
import BreadCrumb from "../../components/BreadCrumb";
import uilpadlock from "../../assets/uilpadlock.png";
import arrowdown from "../../assets/arrowdown.png";
import minusIcon from "../../assets/zondicons_minus-outline.png";

function TestExecution() {
  // Getting Query From URL
  let search = useLocation().search;
  let folderId = new URLSearchParams(search).get("folder");
  let tableId = new URLSearchParams(search).get("table");
  let caseId = new URLSearchParams(search).get("case");
  let currentCaseId = new URLSearchParams(search).get("id");
  // ========================
  const [pieTestCase, setPieTestCase] = useState([]);
  const [loading, setLoading] = useState(false);
  const [testCaseTable, setTestCaseTable] = useState([]);
  const [openTableList, setopenTableList] = useState(false);
  const [uu, setup] = useState(false);
  const [testcase, setTestcase] = useState([]);
  const [testCases, setTestCases] = useState([]);
  const [tablename, setTablename] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [foldername, setFoldername] = useState([]);
  const [staffs, setStaffs] = useState([]);

  function getTestCurrentCase() {
    if (caseId && uu) {
      axios.get(`/testcase/?edit=${caseId}`).then((response) => {
        setTestcase(response.data);
      });
    }
  }
  function getTestCaseTable() {
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
  }

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
            return folderId === data._id && data?.foldername;
          })
        );
      })
      .catch((response) => {
        console.log(response.data);
      });
  }

  const handleSubmit = (values, actions) => {
    setLoading(true);
    axios
      .put(`/testcase/${caseId}`, {
        status: values?.status,
        assignedstaff: values?.assignedstaff,
        results: values?.results,
        description: values?.description,
      })
      .then((res) => {
        toast.success(res.data);
        setLoading(false);
        getTestCases();
        getTestCaseTable();
      })
      .catch((err) => {
        toast.error(err);
        setLoading(false);
      });
    actions.setSubmitting(false);
  };

  function getStaffs() {
    axios
      .get("/staff")
      .then((response) => {
        setStaffs(response?.data);
      })
      .catch((response) => {
        console.log(response.data);
      });
  }

  useEffect(() => {
    getTestCaseTable();
    getTestCurrentCase();
    getTestCases();
    getFolders();
    getStaffs();
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
      .get(`/testexecution?tableid=${tableId}`)
      .then((response) => {
        setPieTestCase(findOcc(response?.data, "status"));
      })
      .catch((response) => {
        console.log(response.data);
      });
  }, [caseId, tableId, currentCaseId]);

  // PAGINATION
  // Get Current Posts
  const postsPerPage = 5;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = testCases.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(testCases.length / postsPerPage);
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <DefaultLayout>
      <div className="xl:flex justify-center gap-6 p-4 xl:pt-4 mt-24 md:mt-20 xl:mt-16">
        <div className="w-full xl:w-6/12">
          {/* ==================BreadCrumb=================== */}
          <BreadCrumb
            pageName={"Test Execution"}
            currentFolder={foldername}
            currentTable={tablename}
          />
          {/* ==============Pie-Chart============== */}
          <div className="mt-8 py-4 border-2 border-gray-50 shadow-md rounded-lg">
            <div className="flex items-center px-8">
              <h1 className="text-xl font-bold text-textdark">
                Total of status cases
              </h1>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center">
              <div className="w-full md:w-5/12 flex justify-center items-center">
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
                        backgroundColor: pieTestCase.map((data, i) => {
                          return data.status === "Pending"
                            ? "#EB7A12"
                            : data.status === "Blank"
                            ? "#DADADA"
                            : data.status === "Fail"
                            ? "#FF4C51"
                            : data.status === "Cancel"
                            ? "#3A3541"
                            : data.status === "Pass"
                            ? "#56CA00"
                            : data.status === "Block"
                            ? "#32BAFF"
                            : "#32BAFFP";
                        }),

                        borderWidth: 0,
                        Width: "20px",
                      },
                    ],
                  }}
                  opt={{
                    responsive: true,
                    radius: 100,
                    plugins: {
                      legend: {
                        display: false,
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
              <div className="w-full md:w-7/12 h-full p-8">
                {tableId && (
                  <>
                    {" "}
                    <div className="flex justify-start items-center gap-2 mb-6">
                      <h1 className="p-2 rounded-md bg-gray-200 text-2xl font-semibold">
                        {testCases.length}
                      </h1>
                      <p className="text-lg">Number of Results</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        {/* ===Fail=== */}
                        <div className="flex justify-center items-center gap-2">
                          <div className="bg-false rounded-full w-4 h-4"></div>
                          <h1 className="text-false font-semibold">
                            {
                              testCases.filter((element) => {
                                return element.status === "Fail";
                              }).length
                            }{" "}
                            Fail
                          </h1>
                        </div>
                        <div className="text-false text-sm">
                          (
                          {Math.round(
                            (testCases.filter((element) => {
                              return element.status === "Fail";
                            }).length /
                              testCases.length) *
                              100
                          )}
                          {"% "} set to Fail)
                        </div>
                      </div>

                      {/* ===Pass=== */}
                      <div className="flex items-center justify-between">
                        <div className="flex justify-center items-center gap-2">
                          <div className="bg-pass rounded-full w-4 h-4"></div>
                          <h1 className="text-pass font-semibold">
                            {
                              testCases.filter((element) => {
                                return element.status === "Pass";
                              }).length
                            }{" "}
                            Pass
                          </h1>
                        </div>
                        <div className="text-pass text-sm">
                          (
                          {Math.round(
                            (testCases.filter((element) => {
                              return element.status === "Pass";
                            }).length /
                              testCases.length) *
                              100
                          )}
                          {"% "} set to Pass)
                        </div>
                      </div>

                      {/* ===Pending=== */}
                      <div className="flex items-center justify-between">
                        <div className="flex justify-center items-center gap-2">
                          <div className="bg-pending rounded-full w-4 h-4"></div>
                          <h1 className="text-pending font-semibold">
                            {
                              testCases.filter((element) => {
                                return element.status === "Pending";
                              }).length
                            }{" "}
                            Pending
                          </h1>
                        </div>
                        <div className="text-pending text-sm">
                          (
                          {Math.round(
                            (testCases.filter((element) => {
                              return element.status === "Pending";
                            }).length /
                              testCases.length) *
                              100
                          )}
                          {"% "} set to Pending)
                        </div>
                      </div>

                      {/* ===Block=== */}
                      <div className="flex items-center justify-between">
                        <div className="flex justify-center items-center gap-2">
                          <div className="bg-block rounded-full w-4 h-4"></div>
                          <h1 className="text-block font-semibold">
                            {
                              testCases.filter((element) => {
                                return element.status === "Block";
                              }).length
                            }{" "}
                            Block
                          </h1>
                        </div>
                        <div className="text-block text-sm">
                          (
                          {Math.round(
                            (testCases.filter((element) => {
                              return element.status === "Block";
                            }).length /
                              testCases.length) *
                              100
                          )}
                          {"% "} set to Block)
                        </div>
                      </div>

                      {/* ===Cancel=== */}
                      <div className="flex items-center justify-between">
                        <div className="flex justify-center items-center gap-2">
                          <div className="bg-cancel rounded-full w-4 h-4"></div>
                          <h1 className="text-cancel font-semibold">
                            {
                              testCases.filter((element) => {
                                return element.status === "Cancel";
                              }).length
                            }{" "}
                            Cancel
                          </h1>
                        </div>
                        <div className="text-cancel text-sm">
                          (
                          {Math.round(
                            (testCases.filter((element) => {
                              return element.status === "Cancel";
                            }).length /
                              testCases.length) *
                              100
                          )}
                          {"% "} set to Cancel)
                        </div>
                      </div>

                      {/* ===Blank=== */}
                      <div className="flex items-center justify-between">
                        <div className="flex justify-center items-center gap-2">
                          <div className="bg-blank rounded-full w-4 h-4"></div>
                          <h1 className="text-blank font-semibold">
                            {
                              testCases.filter((element) => {
                                return element.status === "Blank";
                              }).length
                            }{" "}
                            Blank
                          </h1>
                        </div>
                        <div className="text-blank text-sm">
                          (
                          {Math.round(
                            (testCases.filter((element) => {
                              return element.status === "Blank";
                            }).length /
                              testCases.length) *
                              100
                          )}
                          {"% "}
                          set to Blank)
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* ==============Files============== */}
          {tableId ? (
            <div className="mt-6">
              <div className="flex justify-between items-center gap-2">
                <div className="w-full">
                  {/* =======Active Table Name====== */}
                  <div>
                    {testCaseTable.map((data, i) => {
                      return (
                        <div key={data?._id}>
                          {data?._id === tableId && (
                            <>
                              <div className="bg-white border px-4 py-2 rounded-lg shadow-sm flex justify-between items-center">
                                {data?._id === tableId && data?.tablename}
                                {openTableList ? (
                                  <img
                                    className="cursor-pointer"
                                    src={minusIcon}
                                    onClick={() => {
                                      openTableList === true
                                        ? setopenTableList(false)
                                        : setopenTableList(true);
                                    }}
                                  />
                                ) : (
                                  <img
                                    className="cursor-pointer"
                                    src={plusBlue}
                                    onClick={() => {
                                      openTableList === true
                                        ? setopenTableList(false)
                                        : setopenTableList(true);
                                    }}
                                  />
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {/* =======Dropdown TableList====== */}
                  <div
                    className={`flex flex-col bg-white shadow-lg rounded-lg mt-1 ${
                      openTableList ? "flex" : "hidden"
                    }`}
                  >
                    {testCaseTable.map((data, i) => {
                      return (
                        <Link
                          key={i}
                          className={`${
                            data?._id === tableId
                              ? "bg-white px-4 py-2 hover:bg-blue-50 w-full"
                              : "bg-gray-200 px-4 py-2 hover:bg-gray-300 w-full"
                          }`}
                          to={`/test_execution?folder=${folderId}&table=${data._id}`}
                          onClick={() => setopenTableList(false)}
                        >
                          {data?.assignedfolderId === folderId && (
                            <>{data?.tablename} </>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* ==========Active Table TestCases======== */}
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 border-b border-b-gray-300 text-left">
                    <th className="flex items-center px-2">
                      <p className="font-semibold m-2">ID</p>
                    </th>
                    <th className="w-[18rem]">
                      <p className="font-semibold border-l-2 border-l-gray-400 border-r-2 border-r-gray-400 mx-2 px-2">
                        Title
                      </p>
                    </th>

                    <th>
                      <p className="font-semibold border-r-2 border-r-gray-400 m-2">
                        Status
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentPosts.map((data, i) => {
                    return (
                      <tr className="text-sm font-semibold" key={data?._id}>
                        {data.testcasetable === tableId && (
                          <>
                            <td className="flex justify-start items-center gap-2 py-4 px-2">
                              <Link
                                onClick={() => {
                                  setup(true);
                                }}
                                to={`/test_execution?folder=${folderId}&table=${tableId}&case=${data._id}&id=${data.caseid}`}
                              >
                                <p className="font-semibold">
                                  {tableId && <>{data.caseid}</>}
                                </p>
                              </Link>
                            </td>
                            <td>
                              <Link
                                onClick={() => {
                                  setup(true);
                                }}
                                to={`/test_execution?folder=${folderId}&table=${tableId}&case=${data._id}&id=${data.caseid}`}
                              >
                                <p className="border-l-2 border-l-gray-400 border-r-2 border-r-gray-400 mx-2 px-2  truncate w-[18rem]">
                                  {data?.title}
                                </p>
                              </Link>
                            </td>
                            <td className="flex items-center font-semibold border-r-2 border-r-gray-400 m-2">
                              <Link
                                onClick={() => {
                                  setup(true);
                                }}
                                to={`/test_execution?folder=${folderId}&table=${tableId}&case=${data._id}&id=${data.caseid}`}
                                className="w-24 flex justify-center items-center"
                              >
                                {data?.status === "Cancel" && (
                                  <span
                                    className="w-24 text-center rounded-md text-white py-1"
                                    style={{
                                      backgroundColor: "#3A3541",
                                    }}
                                  >
                                    {data?.status}
                                  </span>
                                )}
                                {data?.status === "Pending" && (
                                  <span
                                    className="w-24 text-center rounded-md text-white py-1"
                                    style={{ backgroundColor: "#EB7A12" }}
                                  >
                                    {data?.status}
                                  </span>
                                )}
                                {data?.status === "Blank" && (
                                  <span
                                    className="w-24 text-center rounded-md text-white py-1"
                                    style={{ backgroundColor: "#DADADA" }}
                                  >
                                    {data?.status}
                                  </span>
                                )}
                                {data?.status === "Fail" && (
                                  <span
                                    className="w-24 text-center rounded-md text-white py-1"
                                    style={{ backgroundColor: "#FF4C51" }}
                                  >
                                    {data?.status}
                                  </span>
                                )}
                                {data?.status === "Pass" && (
                                  <span
                                    className="w-24 text-center rounded-md text-white py-1"
                                    style={{ backgroundColor: "#56CA00" }}
                                  >
                                    {data?.status}
                                  </span>
                                )}
                                {data?.status === "Block" && (
                                  <span
                                    className="w-24 text-center rounded-md text-white py-1"
                                    style={{ backgroundColor: "#32BAFF" }}
                                  >
                                    {data?.status}
                                  </span>
                                )}
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
              <div className="flex justify-end items-center gap-4">
                <div className="flex justify-end items-center gap-4 my-6 w-full">
                  <div className="flex justify-center items-center gap-2">
                    <h1>Rows per page: 5</h1> <img src={arrowdown} />
                  </div>
                  <TotalNo
                    tablename={"Test Cases"}
                    totalnumber={testCases?.length}
                  />

                  <div className="flex items-center gap-2">
                    <ReactPagination
                      pageCount={pageCount}
                      handlePageClick={handlePageClick}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="border-2 border-gray-100 rounded-lg py-32 mt-4">
              <p className="text-center text-gray-400">
                Choose table to get more details
              </p>
            </div>
          )}
        </div>

        {/* ===============Edit-Case[Test Execution]=========== */}
        {caseId ? (
          <div className="px-6 py-8 w-full xl:w-6/12 h-[42rem] overflow-auto">
            <div className="flex justify-between items-center text-xl font-semibold">
              <div className="flex justify-center items-center gap-4 text-xl text-textdark">
                <Link
                  to={`/test_execution?folder=${folderId}&table=${tableId}`}
                  className="text-2xl"
                >
                  {"<"}
                </Link>
                <h1 className="flex items-center gap-2">{currentCaseId}</h1>
              </div>
            </div>

            <div className="border-b border-b-gray-400 flex justify-between items-center p-2 mt-8 text-sm">
              <label className="w-6/12">ID</label>

              <h2 className="w-6/12 border border-gray-400 p-2">
                {currentCaseId}
              </h2>
            </div>

            <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
              <label className="w-6/12">Category</label>
              <h2 className="w-6/12 border border-gray-400 p-2 flex justify-between items-center">
                {testcase?.category}
                <img src={uilpadlock} />
              </h2>
            </div>

            <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
              <label className="w-6/12">Title</label>
              <h2 className="w-6/12 border border-gray-400 p-2 flex justify-between items-center">
                {testcase?.title}
                <img src={uilpadlock} />
              </h2>
            </div>

            <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
              <label className="w-6/12">Priority</label>
              <div className="w-6/12 p-2 flex justify-between items-center">
                {testcase?.priority === "High" && (
                  <button className="bg-red-500 px-8 text-white py rounded-full">
                    High
                  </button>
                )}
                {testcase?.priority === "Medium" && (
                  <button className="bg-yellow-500 px-8 text-white py rounded-full">
                    Medium
                  </button>
                )}
                {testcase?.priority === "Low" && (
                  <button className="bg-blue-500 px-8 text-white py rounded-full">
                    Low
                  </button>
                )}
                <img src={uilpadlock} />
              </div>
            </div>

            <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
              <label className="w-6/12">Precondition</label>
              <h2 className="w-6/12 border border-gray-400 p-2 flex justify-between items-center">
                {testcase?.precondition}
                <img src={uilpadlock} />
              </h2>
            </div>

            <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
              <h1 className="w-6/12">Test Step</h1>
              <div className="w-6/12 border border-gray-400 px-2 py">
                {testcase?.teststep?.split("\n").map((data, i) => (
                  <div key={i} className="block text-sm">
                    <span>{i + 1}.</span>
                    <span>{data}</span>
                  </div>
                ))}
                <div className="flex justify-end">
                  <img src={uilpadlock} />
                </div>
              </div>
            </div>

            <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
              <label className="w-6/12">Expectation</label>
              <h2 className="w-6/12 border border-gray-400 p-2 flex justify-between items-center">
                {testcase?.expectations}
                <img src={uilpadlock} />
              </h2>
            </div>

            <Formik
              enableReinitialize={true}
              initialValues={{
                status: testcase?.status ? testcase?.status : "",
                results: testcase?.results ? testcase?.results : "",
                description: testcase?.description ? testcase?.description : "",
                assignedstaff: testcase?.assignedstaff
                  ? testcase?.assignedstaff
                  : "",
              }}
              validationSchema={Yup.object().shape({
                status: Yup.string().required("Required field"),
                results: Yup.string().required("Required field"),
                description: Yup.string().required("Required field"),
                assignedstaff: Yup.string().required("Required field"),
              })}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
                  <h1 className="w-6/12">Status Case</h1>
                  <div className="w-6/12 py">
                    <Field
                      as="select"
                      name="status"
                      className="border border-gray-400 p-2 w-full mt"
                    >
                      <option value={testcase?.status}>
                        {testcase?.status}
                      </option>
                      <option
                        value="Cancel"
                        className="px-8 text-white py rounded-full"
                        style={{ backgroundColor: "#3A3541" }}
                      >
                        Cancel
                      </option>
                      <option
                        value="Pending"
                        className="bg-yellow-500 px-8 text-white py rounded-full"
                        style={{ backgroundColor: "#EB7A12" }}
                      >
                        Pending
                      </option>
                      <option
                        value="Blank"
                        className="px-8 text-white py rounded-full"
                        style={{ backgroundColor: "#DADADA" }}
                      >
                        Blank
                      </option>
                      <option
                        value="Fail"
                        className="px-8 text-white py rounded-full"
                        style={{ backgroundColor: "#FF4C51" }}
                      >
                        Fail
                      </option>
                      <option
                        value="Pass"
                        className="px-8 text-white py rounded-full"
                        style={{ backgroundColor: "#56CA00" }}
                      >
                        Pass
                      </option>
                      <option
                        value="Block"
                        className="px-8 text-white py rounded-full"
                        style={{ backgroundColor: "#32BAFF" }}
                      >
                        Block
                      </option>
                    </Field>
                    <ErrorMessage
                      component="label"
                      name="status"
                      className="text-sm text-red-500"
                    />
                  </div>
                </div>

                <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
                  <h1 className="w-6/12">Results</h1>
                  <div className="w-6/12  py">
                    <Field
                      as="textarea"
                      className="block border border-gray-400 p-2 w-full"
                      name={"results"}
                      rows="1"
                    />
                    <ErrorMessage
                      component="label"
                      name="results"
                      className="text-sm text-red-500"
                    />
                  </div>
                </div>

                <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
                  <h1 className="w-6/12">Description</h1>
                  <div className="w-6/12 py">
                    <Field
                      as="textarea"
                      className="block border border-gray-400 p-2 w-full"
                      name={"description"}
                      rows="1"
                    />
                    <ErrorMessage
                      component="label"
                      name="description"
                      className="text-sm text-red-500"
                    />
                  </div>
                </div>

                <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
                  <label className="w-6/12">Assigned</label>
                  <div className="flex-col w-6/12">
                    <Field
                      as="select"
                      name="assignedstaff"
                      className="border border-gray-400 p-2 py block w-full"
                    >
                      <option value={staffs?._id}>{staffs?.name}</option>
                      {staffs.map((data, i) => {
                        return (
                          <option value={data?._id} key={i}>
                            {data?.name}
                          </option>
                        );
                      })}
                    </Field>
                    <ErrorMessage
                      component="label"
                      name="assignedstaff"
                      className="text-sm text-red-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end items-center gap-12 mt-4 text-sm">
                  <Link
                    to={`/test_execution?folder=${folderId}&table=${tableId}`}
                    className="bg-red-600 px-4 py-2 text-white rounded-sm hover:bg-red-700"
                  >
                    Cancel
                  </Link>
                  <button
                    className="bg-green-600 px-4 py-2 text-white rounded-sm hover:bg-green-900"
                    type="submit"
                  >
                    {loading ? <ButtonPreloader /> : "Submit"}
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        ) : (
          <div className="px-6 py-8 w-full xl:w-6/12 border-2 border-gray-100 rounded-lg flex justify-center items-center">
            <p className="text-center text-gray-400">
              Choose case to get more details
            </p>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}

export default TestExecution;
