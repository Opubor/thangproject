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
import ButtonPreloader from "../../components/ButtonPreloader";

function EditTestCase({ styles }) {
  const [loading, setLoading] = useState(false);
  const [testEnvironmentData, setTestEnvironmentData] = useState([]);
  const [testcase, setTestcase] = useState({
    priority: "",
    title: "",
    teststep: "",
    precondition: "",
    category: "",
    expectations: "",
    testcaseid: "",
    // status: "",
    // assignedstaff: "",
    // results: "",
    // description: "",
  });

  function handleChange(e) {
    setTestcase((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  // Getting Query From URL
  let search = useLocation().search;
  const folderId = new URLSearchParams(search).get("folder");
  const tableId = new URLSearchParams(search).get("table");
  const caseId = new URLSearchParams(search).get("caseId");

  function getTestEnvironments() {
    axios
      .get("/testenvironment")
      .then((response) => {
        setTestEnvironmentData(response?.data);
      })
      .catch((response) => {
        console.log(response.data);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(`/testcase/${caseId}`, {
        priority: testcase?.priority,
        title: testcase?.title,
        teststep: testcase?.teststep,
        precondition: testcase?.precondition,
        category: testcase?.category,
        testcaseid: testcase?.testcaseid,
        expectations: testcase?.expectations,
        // status: testcase?.status,
        // assignedstaff: testcase?.assignedstaff,
        // results: testcase?.results,
        // description: testcase?.description,
      })
      .then((res) => {
        toast.success(res.data);
        setLoading(false);
        window.location.reload(true);
      })
      .catch((err) => {
        toast.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (caseId) {
      axios.get(`/testcase/?edit=${caseId}`).then((response) => {
        setTestcase(response.data);
        console.log(response.data);
      });
    }
    getTestEnvironments();
  }, [caseId]);

  return (
    <div
      className={`bg-black bg-opacity-70 absolute z-50 left-0 right-0 top-0 flex justify-end items-center h-screen ${styles}`}
    >
      <div className="px-6 py-8 w-full md:w-8/12 lg:w-6/12 xl:w-4/12 bg-white">
        <div className="flex justify-between items-center text-xl font-semibold">
          <div className="flex justify-center items-center gap-4 text-xl text-textdark">
            <p className="text-2xl">{"<"}</p>
            <h1 className="flex items-center gap-2">{testcase?.title}</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="border-b border-b-gray-400 flex justify-between items-center p-2 mt-8 text-sm">
            <label className="w-6/12">ID</label>
            <input
              className="w-6/12 border border-gray-400 px-2 py"
              name={"testcaseid"}
              type="text"
              defaultValue={testcase?._id}
              onChange={handleChange}
            />
          </div>

          <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
            <label className="w-6/12">Category</label>
            <input
              className="w-6/12 border border-gray-400 px-2 py"
              name={"category"}
              type="text"
              defaultValue={testcase?.category}
              onChange={handleChange}
            />
          </div>

          <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
            <label className="w-6/12">Title</label>
            <input
              className="w-6/12 border border-gray-400 px-2 py"
              name={"title"}
              type="text"
              defaultValue={testcase?.title}
              onChange={handleChange}
            />
          </div>

          <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
            <h1 className="w-6/12">Priority</h1>
            <div className="w-6/12 py">
              <select
                className="border border-gray-400 p-2 w-full mt"
                name={"priority"}
                type={"text"}
                onChange={handleChange}
              >
                <option value={testcase?.priority}>{testcase?.priority}</option>
                <option
                  value="High"
                  className="bg-red-500 px-8 text-white py rounded-full"
                >
                  High
                </option>
                <option
                  value="Medium"
                  className="bg-yellow-500 px-8 text-white py rounded-full"
                >
                  Medium
                </option>
                <option
                  value="Low"
                  className="bg-green-500 px-8 text-white py rounded-full"
                >
                  Low
                </option>
              </select>
            </div>
          </div>

          <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
            <label className="w-6/12">Precondition</label>
            <div className="w-6/12 py">
              <select
                className="border border-gray-400 p-2 w-full mt"
                name={"precondition"}
                type={"text"}
                onChange={handleChange}
              >
                <option value={testcase?.precondition}>
                  {testcase?.precondition}
                </option>
                {testEnvironmentData.map((data, i) => {
                  return (
                    <option value={data?.operatingsystem} key={i}>
                      {data?.operatingsystem}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
            <label className="w-6/12">Test Step</label>
            <div className="w-6/12 border border-gray-400 py">
              <textarea
                name="teststep"
                type="text"
                className="block border border-gray-200 p-2 w-full mt"
                defaultValue={testcase?.teststep}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
            <label className="w-6/12">Expectation</label>
            <div className="w-6/12 border border-gray-400 py">
              <textarea
                name="expectations"
                type="text"
                className="block border border-gray-200 p-2 w-full mt"
                defaultValue={testcase?.expectations}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
            <label className="w-6/12">Status Case</label>
            <p className="w-6/12 px-2 py">
              {testcase?.status === "Cancel" && (
                <p
                  className="w-24 text-center rounded-full text-white px-4 py-1"
                  style={{ backgroundColor: "#3A3541" }}
                >
                  {testcase?.status}
                </p>
              )}
              {testcase?.status === "Pending" && (
                <p
                  className="w-24 text-center rounded-full text-white px-4 py-1"
                  style={{ backgroundColor: "#EB7A12" }}
                >
                  {testcase?.status}
                </p>
              )}
              {testcase?.status === "Blank" && (
                <p
                  className="w-24 text-center rounded-full text-white px-4 py-1"
                  style={{ backgroundColor: "#DADADA" }}
                >
                  {testcase?.status}
                </p>
              )}
              {testcase?.status === "False" && (
                <p
                  className="w-24 text-center rounded-full text-white px-4 py-1"
                  style={{ backgroundColor: "#FF4C51" }}
                >
                  {testcase?.status}
                </p>
              )}
              {testcase?.status === "Pass" && (
                <p
                  className="w-24 text-center rounded-full text-white px-4 py-1"
                  style={{ backgroundColor: "#56CA00" }}
                >
                  {testcase?.status}
                </p>
              )}
              {testcase?.status === "Block" && (
                <p
                  className="w-24 text-center rounded-full text-white px-4 py-1"
                  style={{ backgroundColor: "#32BAFF" }}
                >
                  {testcase?.status}
                </p>
              )}
            </p>
          </div>

          <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
            <label className="w-6/12">Results</label>
            <p className="w-6/12 border border-gray-400 px-2 py-4">
              {testcase?.results}
            </p>
          </div>

          <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
            <label className="w-6/12">Description</label>
            <p className="w-6/12 border border-gray-400 px-2 py-4">
              {testcase?.description}
            </p>
          </div>

          <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
            <label className="w-6/12">Assigned</label>
            <p className="w-6/12 border border-gray-400 px-2 py">
              {testcase?.assignedstaff}
            </p>
          </div>
          <div className="flex justify-center items-center gap-12 mt-8">
            <Link
              to={`/test_management?folder=${folderId}&table=${tableId}`}
              onClick={() => {
                setsetOpenEditModal(false), window.location.reload(true);
              }}
              className="bg-red-600 px-4 py-2 text-white rounded-md hover:bg-red-700 cursor-pointer"
            >
              <span>Cancel</span>
            </Link>
            <button className="bg-green-600 px-4 py-2 text-white rounded-md hover:bg-green-900">
              {loading ? <ButtonPreloader /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTestCase;
