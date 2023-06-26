import React, { useEffect, useState } from "react";
import { NavLink, Navigate, useNavigate, useLocation } from "react-router-dom";
import ButtonPreloader from "../../components/ButtonPreloader";
import Input from "../../components/Input";
import axios from "../../sevices/axios";
import { toast } from "react-toastify";
import Select from "../../components/Select";
import TextArea from "../../components/TextArea";

function AddTestCaseTable({ setopenAddTestCaseModal, styles }) {
  // Getting Query From URL
  let search = useLocation().search;
  const folderId = new URLSearchParams(search).get("folder");

  const [loading, setLoading] = useState(false);
  const [testEnvironmentData, setTestEnvironmentData] = useState([]);
  const [testCaseTable, setTestCaseTable] = useState({
    tablename: "",
    description: "",
    date: "",
    precondition: "",
    version: "",
  });

  function handleChange(e) {
    setTestCaseTable((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/testcasetable", {
        tablename: testCaseTable?.tablename,
        description: testCaseTable?.description,
        date: testCaseTable?.date,
        precondition: testCaseTable?.precondition,
        version: testCaseTable?.version,
        assignedfolderId: folderId,
      })
      .then((res) => {
        toast.success(res.data);
        setLoading(false);
        window.location.reload(true);
      })
      .catch((err) => {
        toast.error(err.response.data);
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
        <h1 className="text-center text-2xl font-semibold mb-2">
          Add TestCase Table
        </h1>
        <p className="text-center mb-6 text-sm">
          Provide data with this form to create your app.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between gap-6">
            <div className="w-8/12">
              <div>
                <Input
                  label={"Name"}
                  type="text"
                  placeholder={"Windows"}
                  name={"tablename"}
                  onchange={handleChange}
                />
                <p className="text-gray-400 text-sm">
                  set the name of testcase table
                </p>
              </div>

              <div className="mt-4">
                <TextArea
                  label={"Description"}
                  name="description"
                  rows={"1"}
                  onchange={handleChange}
                />
                <p className="text-gray-400 text-sm">Describe your variable</p>
              </div>

              <div>
                <Input
                  label={"Attachments"}
                  type="text"
                  placeholder={"csv files"}
                  name={"attachments"}
                  onchange={handleChange}
                />
                <p className="text-gray-400 text-sm">
                  Drop files here to attack (only CSV file)
                </p>
              </div>
            </div>
            <div className="w-4/12">
              <div className="">
                <Input
                  label={"Date"}
                  type="date"
                  name={"date"}
                  onchange={handleChange}
                />
              </div>

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
                      <option value={data?._id} key={i}>
                        {data?.operatingsystem} {" - "} {data?.browser}
                      </option>
                    );
                  })}
                </Select>
              </div>

              <div className="mt-4">
                <Input
                  label={"Version"}
                  type="text"
                  name={"version"}
                  onchange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-12 mt-8">
            <span
              onClick={setopenAddTestCaseModal}
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

export default AddTestCaseTable;
