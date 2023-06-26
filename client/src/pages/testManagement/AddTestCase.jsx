import React, { useEffect, useState } from "react";
import Input from "../../components/Input";
import Select from "../../components/Select";
import TextArea from "../../components/TextArea";
import axios from "../../sevices/axios";
import { toast } from "react-toastify";
import ButtonPreloader from "../../components/ButtonPreloader";
import { useLocation } from "react-router-dom";

function AddTestCase({ setopenAddCaseModal, styles }) {
  const [loading, setLoading] = useState(false);
  const [testEnvironmentData, setTestEnvironmentData] = useState([]);
  // Getting Query From URL
  let search = useLocation().search;
  const folderId = new URLSearchParams(search).get("folder");
  const tableId = new URLSearchParams(search).get("table");
  // values
  const [testCase, setTestCase] = useState({
    priority: "",
    title: "",
    teststep: "",
    precondition: "",
    category: "",
    status: "",
    expectations: "",
    assignedstaff: "",
  });

  function handleChange(e) {
    setTestCase((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/testcase", {
        priority: testCase?.priority,
        title: testCase?.title,
        teststep: testCase?.teststep,
        precondition: testCase?.precondition,
        category: testCase?.category,
        status: testCase?.status,
        expectations: testCase?.expectations,
        assignedstaff: testCase?.assignedstaff,
        testcasetable: tableId,
        assignedfolderId: folderId,
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

  useEffect(() => {
    getTestEnvironments();
  }, []);

  return (
    <div
      className={`bg-black bg-opacity-70 absolute z-50 left-0 right-0 top-0 flex justify-center items-center h-screen ${styles}`}
    >
      <div className="bg-white p-8 w-6/12 rounded-md">
        <h1 className="text-center text-2xl font-semibold mb-2">Add Case</h1>
        <p className="text-center mb-6 text-sm">
          Provide data with this form to create your app.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center gap-6">
            <div className="w-8/12">
              <div className="mt-4">
                <Input
                  label={"Title"}
                  type="text"
                  name={"title"}
                  onchange={handleChange}
                />
              </div>

              <div className="mt-4">
                <Input
                  label={"Category"}
                  type="text"
                  name={"category"}
                  onchange={handleChange}
                />
              </div>

              <div className="mt-4">
                <TextArea
                  label={"Test Step"}
                  name="teststep"
                  rows={"1"}
                  onchange={handleChange}
                />
              </div>

              <div className="mt-4">
                <TextArea
                  label={"Expectation"}
                  name="expectations"
                  rows={"1"}
                  onchange={handleChange}
                />
              </div>
            </div>
            <div className="w-4/12">
              <Select
                label={"Status"}
                onchange={handleChange}
                name={"status"}
                type={"text"}
              >
                <option>Select Status</option>
                <option value="Pass">Pass</option>
                <option value="False">False</option>
                <option value="Pending">Pending</option>
                <option value="Cancel">Cancel</option>
                <option value="Block">Block</option>
                <option value="Blank">Blank</option>
              </Select>

              <div className="mt-4">
                <Select
                  label={"Precondition"}
                  onchange={handleChange}
                  name={"precondition"}
                  type={"text"}
                >
                  <option>Select Precondition</option>
                  {testEnvironmentData.map((data, i) => {
                    return (
                      <option value={data?.operatingsystem} key={i}>
                        {data?.operatingsystem} {" - "} {data?.browser}
                      </option>
                    );
                  })}
                </Select>
              </div>

              <div className="mt-4">
                <Select
                  label={"Priority"}
                  onchange={handleChange}
                  name={"priority"}
                  type={"text"}
                >
                  <option>Select Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </Select>
              </div>

              <div className="mt-4">
                <Input
                  label={"Assigned"}
                  type="text"
                  name={"assignedstaff"}
                  onchange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-12 mt-8">
            <span
              onClick={setopenAddCaseModal}
              className="bg-red-600 px-4 py-2 text-white rounded-md hover:bg-red-700 cursor-pointer"
            >
              Cancel
            </span>
            <button className="bg-green-600 px-4 py-2 text-white rounded-md hover:bg-green-900">
              {loading ? <ButtonPreloader /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTestCase;
