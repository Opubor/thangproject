import React, { useEffect, useState, useRef } from "react";
import filter from "../../assets/Vector (24).png";
import addPage from "../../assets/add-page.png";
import sort from "../../assets/sort.png";
import exportCylinders from "../../assets/database-export.png";
import cancel from "../../assets/cancel.png";
import attachDoc from "../../assets/attachDoc.png";
import filterlist from "../../assets/filter-list.png";
import * as XLSX from "xlsx";
import axios from "../../sevices/axios";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonPreloader from "../ButtonPreloader";

function TableFunctions({
  search,
  setopenAddCaseModal,
  sortHigh,
  sortMedium,
  sortLow,
  sheetdata,
  fetchAll,
  submitFilter,
  reloadTestCase,
  tablename,
}) {
  // Getting Query From URL
  let getdetails = useLocation().search;
  const folderId = new URLSearchParams(getdetails).get("folder");
  const tableId = new URLSearchParams(getdetails).get("table");

  const [importExport, setImportExport] = useState(false);
  const [afterExport, setAfterExport] = useState(false);
  const [afterImport, setAfterImport] = useState(false);
  const [openSort, setopenSort] = useState(false);
  const [openFilter, setopenFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [staffs, setStaffs] = useState([]);
  const [ImportTestCase, setImportTestCase] = useState(null);

  // handleImportTestCase ========================
  const handleImportTestCase = (event) => {
    setImportTestCase(event.target.files[0]);
  };
  // Import Test Case ============================
  const handleImport = (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("importFile", ImportTestCase);
    axios
      .post(
        `/importTestCase?testcasetable=${tableId}&assignedfolderId=${folderId}`,
        formData
      )
      .then((res) => {
        setLoading(false);
        toast.success(res.data);
        window.location.reload(true);
      })
      .catch((err) => {
        setLoading(false);
        console.log(formData);
        toast.error(err.response.data);
      });
  };
  // ===========================================

  // Export Test Case============================
  const title = [
    "Priority",
    "Title",
    "Test_Step",
    "Precondition",
    "Category",
    "Status Case",
    "Expectations",
    "Assigned_Staff",
    "Description",
    "Results",
  ];
  const titleDisplay = {
    caseid: "ID",
    category: "Category",
    title: "Title",
    priority: "Priority",
    precondition: "Precondition",
    teststep: "Test Steps",
    expectations: "Expectation",
    status: "Status case",
    results: "Result",
    description: "Description",
    assignedstaffname: "Assigned",
  };

  const newTitleData = [titleDisplay, ...sheetdata];
  const handleExport = () => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(newTitleData, {
      header: title,
      skipHeader: true,
    });

    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
    XLSX.writeFile(wb, `testcase.csv`);
  };

  // ===========================================

  // Get Staffs================================
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
  // =======================================

  let sortRef = useRef();
  let filterRef = useRef();
  let importExportRef = useRef();
  let exportRef = useRef();
  let importRef = useRef();
  function sortModal() {
    let closeSortModal = (e) => {
      if (sortRef.current != null) {
        if (!sortRef.current.contains(e.target)) {
          return setopenSort(false);
        }
      }
    };
    document.addEventListener("mousedown", closeSortModal);
    return () => {
      document.removeEventListener("mousedown", closeSortModal);
    };
  }
  function filterModal() {
    let closeFilterModal = (e) => {
      if (filterRef.current != null) {
        if (!filterRef.current.contains(e.target)) {
          return setopenFilter(false);
        }
      }
    };
    document.addEventListener("mousedown", closeFilterModal);
    return () => {
      document.removeEventListener("mousedown", closeFilterModal);
    };
  }
  function importExportModal() {
    let closeImportExportModal = (e) => {
      if (importExportRef.current != null) {
        if (!importExportRef.current.contains(e.target)) {
          return setImportExport(false);
        }
      }
    };
    document.addEventListener("mousedown", closeImportExportModal);
    return () => {
      document.removeEventListener("mousedown", closeImportExportModal);
    };
  }
  function exportModal() {
    let closeExportModal = (e) => {
      if (exportRef.current != null) {
        if (!exportRef.current.contains(e.target)) {
          return setAfterExport(false);
        }
      }
    };
    document.addEventListener("mousedown", closeExportModal);
    return () => {
      document.removeEventListener("mousedown", closeExportModal);
    };
  }
  function importModal() {
    let closeImportModal = (e) => {
      if (importRef.current != null) {
        if (!importRef.current.contains(e.target)) {
          return setAfterImport(false);
        }
      }
    };
    document.addEventListener("mousedown", closeImportModal);
    return () => {
      document.removeEventListener("mousedown", closeImportModal);
    };
  }

  useEffect(() => {
    getStaffs();
    sortModal();
    filterModal();
    importExportModal();
    exportModal();
    importModal();
  }, []);

  return (
    <div className="bg-white">
      <div className="flex flex-col justify-between items-end md:items-center md:flex-row">
        <div className="w-full md:w-9/12">{search}</div>

        <div className="flex items-center mt-2 md:mt-0">
          <div
            className="border border-gray-300 p-2 rounded-tl-lg rounded-bl-lg cursor-pointer hover:bg-gray-100"
            onClick={setopenAddCaseModal}
          >
            <img src={addPage} />
          </div>

          <div
            className="border border-gray-300 p-2 cursor-pointer hover:bg-gray-100"
            onClick={() => {
              openSort === true ? setopenSort(false) : setopenSort(true);
            }}
          >
            <img src={sort} />
          </div>

          <div
            className="border border-gray-300 p-2 cursor-pointer hover:bg-gray-100"
            style={{ padding: "10px" }}
            onClick={() => {
              openFilter === true ? setopenFilter(false) : setopenFilter(true);
            }}
          >
            <img src={filter} />
          </div>

          <div className="border border-gray-300 p-2 rounded-tr-lg rounded-br-lg cursor-pointer hover:bg-gray-100">
            <img
              src={exportCylinders}
              onClick={() =>
                importExport === true
                  ? setImportExport(false)
                  : setImportExport(true)
              }
            />

            {/* =================Modals===================== */}
            {/* =======ImportExportModai======== */}
            <div
              ref={importExportRef}
              className={`bg-gray-200 rounded-xl shadow shadow-lg text-sm text-center fixed right-8 w-32  ${
                importExport ? "block" : "hidden"
              }`}
            >
              <div className="border-b border-b-gray-300 p-2">
                <button
                  onClick={() => {
                    setAfterImport(true);
                  }}
                >
                  Import
                </button>
              </div>
              <div>
                <button
                  className="p-2"
                  onClick={() => {
                    setAfterExport(true);
                  }}
                >
                  Export
                </button>
              </div>
            </div>
            {/* ================================ */}

            {/* ========Export======== */}
            <div
              className={`bg-black bg-opacity-70 absolute z-50 left-0 right-0 top-0 flex flex-col justify-center items-center h-screen ${
                afterExport ? "flex" : "hidden"
              }`}
            >
              <div
                className="bg-white px-8 py-4 w-80 shadow shadow-2xl"
                ref={exportRef}
              >
                <div className="text-center mb-8 ">
                  <h1 className="text-base font-semibold mb-1">Export File</h1>
                  <p className="text-sm">
                    Are you sure you want to export this File?
                  </p>
                </div>
                <div className="flex justify-center items-center gap-12 mt-6">
                  <h1
                    className="bg-red-600 px-4 py-1 text-white hover:bg-red-700 cursor-pointer text-sm"
                    onClick={() => {
                      setAfterExport(false), setImportExport(false);
                    }}
                  >
                    Cancel
                  </h1>
                  <button
                    className="bg-green-600 px-4 py-1 text-white hover:bg-green-900 text-sm"
                    onClick={handleExport}
                  >
                    Export
                  </button>
                </div>
              </div>
            </div>
            {/* ================================ */}

            {/* ========Import======== */}
            <div
              className={`bg-black bg-opacity-70 absolute z-50 left-0 right-0 top-0 flex flex-col justify-center items-center h-screen ${
                afterImport ? "flex" : "hidden"
              }`}
            >
              <div
                className="bg-white pl-8 w-4/12 shadow shadow-2xl pb-12"
                ref={importRef}
              >
                <div className="flex justify-end items-center pt-4 pb-8 pr-4 pl-4">
                  <img
                    src={cancel}
                    onClick={() => {
                      setAfterImport(false), setImportExport(false);
                    }}
                  />
                </div>
                <div className="text-center mb-6 pr-8">
                  <h1 className="font-semibold text-2xl">
                    Import File Attachments
                  </h1>
                  <p className="text-sm text-gray-500">
                    Provide data with attachment csv file.
                  </p>
                </div>
                <form onSubmit={handleImport} encType="multipart/form-data">
                  <div className="flex flex-col pr-8">
                    <label className="font-semibold mb-2">Attachments</label>
                    <label
                      htmlFor="attachment"
                      className="w-full border border-gray-400 border-dotted rounded-lg py-2 flex justify-center items-center gap-2 cursor-pointer"
                    >
                      <img src={attachDoc} className="w-8" />
                      <p>
                        {ImportTestCase?.name
                          ? ImportTestCase?.name
                          : "Select CSV file"}
                      </p>
                    </label>
                    <p className="text-gray-400 text-sm">Attach your file</p>
                    <input
                      type="file"
                      name="importFile"
                      className="block border border-gray-200 rounded-md p-2 sr-only"
                      id="attachment"
                      onChange={handleImportTestCase}
                    />
                  </div>
                  <div className="flex justify-center items-center gap-12 mt-8 pr-8">
                    <h1
                      className="bg-red-600 px-6 py-2 text-white hover:bg-red-700 cursor-pointer text-base"
                      onClick={() => {
                        setAfterImport(false), setImportExport(false);
                      }}
                    >
                      Cancel
                    </h1>
                    <button className="bg-green-600 px-6 py-2 text-white hover:bg-green-900 text-base">
                      {loading ? <ButtonPreloader /> : "Import"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {/* ================================ */}

            {/* ========Sort======== */}
            <div
              className={`bg-white rounded-md shadow-xl text-sm text-center fixed right-8 p-4 ${
                openSort ? "block" : "hidden"
              }`}
              ref={sortRef}
            >
              <h1 className="font-semibold text-md mb-2">Sort: Priority</h1>
              <div className="flex flex-col gap-2 w-44">
                <h1
                  className="px-8 py-1 bg-red-600 rounded-full text-white hover:bg-red-700"
                  onClick={sortHigh}
                >
                  High
                </h1>
                <h2
                  className="px-8 py-1 bg-yellow-500 rounded-full text-white hover:bg-yellow-400"
                  onClick={sortMedium}
                >
                  Medium
                </h2>
                <h3
                  className="px-8 py-1 bg-green-500 rounded-full text-white hover:bg-green-600"
                  onClick={sortLow}
                >
                  Low
                </h3>
                <h3
                  className="text-white bg-gray-500 py-1 hover:bg-gray-400 rounded-full"
                  onClick={fetchAll}
                >
                  All
                </h3>
              </div>
            </div>
            {/* ================================ */}

            {/* =======Filter====== */}
            <div
              className={`bg-white border-2 border-gray-200 shadow-xl text-sm text-center fixed right-8 p-6 w-64 ${
                openFilter ? "block" : "hidden"
              }`}
              ref={filterRef}
            >
              <div className="flex justify-between items-center mb-8">
                <h1 className="font-semibold text-xl">Filter</h1>
                <img
                  src={cancel}
                  onClick={() => {
                    setopenFilter(false);
                  }}
                />
              </div>

              <Formik
                initialValues={{
                  priority: "",
                  category: "",
                  assignedstaff: "",
                }}
                validationSchema={Yup.object().shape({
                  priority: Yup.string(),
                  category: Yup.string(),
                  assignedstaff: Yup.string(),
                })}
                onSubmit={submitFilter}
              >
                <Form>
                  <div className="w-full flex flex-col items-start mb-4">
                    <label className="font-semibold mb-1">Priority</label>

                    <Field
                      as="select"
                      name="priority"
                      className="border rounded-lg p-2 w-full"
                    >
                      <option value="">Select Priority</option>
                      <option value="High" className="bg-red-500">
                        High
                      </option>
                      <option value="Medium" className="bg-yellow-500">
                        Medium
                      </option>
                      <option value="Low" className="bg-green-500">
                        Low
                      </option>
                    </Field>
                    <ErrorMessage
                      component="label"
                      name="priority"
                      className="text-sm text-red-500"
                    />
                  </div>

                  <div className="w-full flex flex-col items-start mb-4">
                    <label className="font-semibold mb-1">Category</label>
                    <Field
                      className="border rounded-lg p-2 w-full"
                      name={"category"}
                      type="text"
                    />
                    <ErrorMessage
                      component="label"
                      name="category"
                      className="text-sm text-red-500"
                    />
                  </div>

                  <div className="w-full flex flex-col items-start mb-4">
                    <label className="font-semibold mb-1">Assigned To</label>
                    <Field
                      as="select"
                      name="assignedstaff"
                      className="border rounded-lg p-2 w-full"
                    >
                      <option value="">Select Staff</option>
                      {staffs.map((data, i) => {
                        return (
                          <option value={data?._id} key={data?._id}>
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
                  <div className="flex justify-between items-center gap-2 mt-4 w-full">
                    <h1
                      onClick={reloadTestCase}
                      className="border-2 border-gray-500 px-8 py-1 text-gray-800 font-semibold rounded-md hover:bg-gray-200 cursor-pointer text-base"
                    >
                      Clear
                    </h1>
                    <button className="bg-gray-500 rounded-md px-8 py-2 text-white hover:bg-green-900 text-base flex justify-between items-center gap-1">
                      <span>Filter</span>
                      <img src={filterlist} className="w-4" />
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableFunctions;
