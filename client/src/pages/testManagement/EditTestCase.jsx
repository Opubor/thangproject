import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../sevices/axios";
import { toast } from "react-toastify";
import ButtonPreloader from "../../components/ButtonPreloader";
import uilpadlock from "../../assets/uilpadlock.png";

function EditTestCase({ styles, setsetOpenEditModal }) {
  const navigate = useNavigate();
  // Getting Query From URL
  let search = useLocation().search;
  const folderId = new URLSearchParams(search).get("folder");
  const tableId = new URLSearchParams(search).get("table");
  const caseId = new URLSearchParams(search).get("caseId");
  let currentCaseId = new URLSearchParams(search).get("id");

  const [loading, setLoading] = useState(false);
  const [testEnvironmentData, setTestEnvironmentData] = useState([]);
  const [testcase, setTestcase] = useState([]);
  const [tablename, setTablename] = useState([]);

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

  function getTestCaseTable() {
    axios
      .get("/testcasetable")
      .then((response) => {
        setTablename(
          response?.data.map((data, i) => {
            return <>{tableId === data._id && data?.tablename}</>;
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
        priority: values?.priority,
        title: values?.title,
        teststep: values?.teststep,
        precondition: values?.precondition,
        category: values?.category,
        status: values?.status,
        expectations: values?.expectations,
        assignedstaff: values?.assignedstaff,
        testcasetable: tableId ? tableId : "",
        assignedfolderId: folderId ? folderId : "",
      })
      .then((res) => {
        setLoading(false), setsetOpenEditModal(false);
        navigate(`/test_management?folder=${folderId}&table=${tableId}`, {
          replace: true,
        }),
          toast.success(res.data);
        window.location.reload(true);
      })
      .catch((err) => {
        toast.error(err);
        setLoading(false);
      });
    actions.setSubmitting(false);
  };

  useEffect(() => {
    getTestCaseTable();
    if (caseId) {
      axios.get(`/testcase/?edit=${caseId}`).then((response) => {
        setTestcase(response.data);
        console.log(response.data);
      });
    }
    getTestEnvironments();
  }, [caseId, tableId]);

  return (
    <div
      className={`bg-black bg-opacity-70 absolute z-50 left-0 right-0 top-0 flex justify-end items-center h-screen ${styles}`}
    >
      <div className="px-6 py-8 w-full md:w-8/12 lg:w-6/12 xl:w-4/12 bg-white">
        <div className="flex justify-between items-center text-xl font-semibold">
          <div className="flex justify-center items-center gap-4 text-xl text-textdark">
            <Link
              to={`/test_management?folder=${folderId}&table=${tableId}`}
              onClick={setsetOpenEditModal}
              className="text-2xl"
            >
              {"<"}
            </Link>
            <h1 className="flex items-center gap-2">{testcase?.title}</h1>
          </div>
        </div>

        <Formik
          enableReinitialize={true}
          initialValues={{
            priority: testcase?.priority,
            title: testcase?.title,
            teststep: testcase?.teststep,
            precondition: testcase?.precondition,
            category: testcase?.category,
            status: testcase?.status,
            expectations: testcase?.expectations,
            assignedstaff: testcase?.assignedstaff,
          }}
          validationSchema={Yup.object().shape({
            priority: Yup.string().required("Required field"),
            title: Yup.string().required("Required field"),
            teststep: Yup.string().required("Required field"),
            precondition: Yup.string().required("Required field"),
            category: Yup.string().required("Required field"),
            status: Yup.string().required("Required field"),
            expectations: Yup.string().required("Required field"),
            assignedstaff: Yup.string().required("Required field"),
          })}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="border-b border-b-gray-400 flex justify-between items-center p-2 mt-8 text-sm">
              <label className="w-6/12">ID</label>
              <h2 className="w-6/12 border border-gray-400 p-2">
                {tablename}
                {"-"}
                {currentCaseId}
              </h2>
            </div>

            <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
              <label className="w-6/12">Category</label>
              <div className="w-6/12 ">
                <Field
                  className="border border-gray-400 p-2 block w-full"
                  name={"category"}
                  type="text"
                />
                <ErrorMessage
                  component="label"
                  name="category"
                  className="text-sm text-red-500"
                />
              </div>
            </div>

            <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
              <label className="w-6/12">Title</label>
              <div className="w-6/12 ">
                <Field
                  className="border border-gray-400 p-2 block w-full"
                  name={"title"}
                  type="text"
                />
                <ErrorMessage
                  component="label"
                  name="title"
                  className="text-sm text-red-500"
                />
              </div>
            </div>

            <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
              <label className="w-6/12">Priority</label>
              <div className="w-6/12 py">
                <Field
                  as="select"
                  name="priority"
                  className="border border-gray-400 p-2 w-full mt"
                >
                  <option value={testcase?.priority}>
                    {testcase?.priority}
                  </option>
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
                </Field>
                <ErrorMessage
                  component="label"
                  name="priority"
                  className="text-sm text-red-500"
                />
              </div>
            </div>

            <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
              <label className="w-6/12">Precondition</label>
              <div className="w-6/12 py">
                <Field
                  as="select"
                  name="precondition"
                  className="border border-gray-400 p-2 w-full mt"
                >
                  <option value={testcase?.precondition}>
                    {testcase?.precondition}
                  </option>
                  {testEnvironmentData.map((data, i) => {
                    return (
                      <option value={data?.operatingsystem} key={i}>
                        {data?.operatingsystem} {" - "} {data?.browser}
                      </option>
                    );
                  })}
                </Field>
                <ErrorMessage
                  component="label"
                  name="precondition"
                  className="text-sm text-red-500"
                />
              </div>
            </div>

            <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
              <label className="w-6/12">Test Step</label>
              <div className="w-6/12 py">
                <Field
                  as="textarea"
                  className="block border border-gray-400 p-2 w-full"
                  name={"teststep"}
                  rows="1"
                />
                <ErrorMessage
                  component="label"
                  name="teststep"
                  className="text-sm text-red-500"
                />
              </div>
            </div>

            <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
              <label className="w-6/12">Expectation</label>
              <div className="w-6/12 py">
                <Field
                  as="textarea"
                  className="block border border-gray-400 p-2 w-full"
                  name={"expectations"}
                  rows="1"
                />
                <ErrorMessage
                  component="label"
                  name="expectations"
                  className="text-sm text-red-500"
                />
              </div>
            </div>

            <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
              <label className="w-6/12">Status Case</label>
              <p className="w-6/12 px-2 py flex justify-between items-center">
                {testcase?.status === "Cancel" && (
                  <span
                    className="w-24 text-center rounded-full text-white px-4 py-1"
                    style={{ backgroundColor: "#3A3541" }}
                  >
                    {testcase?.status}
                  </span>
                )}
                {testcase?.status === "Pending" && (
                  <span
                    className="w-24 text-center rounded-full text-white px-4 py-1"
                    style={{ backgroundColor: "#EB7A12" }}
                  >
                    {testcase?.status}
                  </span>
                )}
                {testcase?.status === "Blank" && (
                  <span
                    className="w-24 text-center rounded-full text-white px-4 py-1"
                    style={{ backgroundColor: "#DADADA" }}
                  >
                    {testcase?.status}
                  </span>
                )}
                {testcase?.status === "False" && (
                  <span
                    className="w-24 text-center rounded-full text-white px-4 py-1"
                    style={{ backgroundColor: "#FF4C51" }}
                  >
                    {testcase?.status}
                  </span>
                )}
                {testcase?.status === "Pass" && (
                  <span
                    className="w-24 text-center rounded-full text-white px-4 py-1"
                    style={{ backgroundColor: "#56CA00" }}
                  >
                    {testcase?.status}
                  </span>
                )}
                {testcase?.status === "Block" && (
                  <span
                    className="w-24 text-center rounded-full text-white px-4 py-1"
                    style={{ backgroundColor: "#32BAFF" }}
                  >
                    {testcase?.status}
                  </span>
                )}
                <img src={uilpadlock} />
              </p>
            </div>

            <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
              <label className="w-6/12">Results</label>
              <p className="w-6/12 border border-gray-400 px-2 py-4 flex justify-between items-center">
                {testcase?.results}
                <img src={uilpadlock} />
              </p>
            </div>

            <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
              <label className="w-6/12">Description</label>
              <p className="w-6/12 border border-gray-400 px-2 py-4 flex justify-between items-center">
                {testcase?.description}
                <img src={uilpadlock} />
              </p>
            </div>

            <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
              <label className="w-6/12">Assigned</label>
              <p className="w-6/12 border border-gray-400 px-2 py flex justify-between items-center">
                {testcase?.staff && testcase?.staff[0]?.name}
                <img src={uilpadlock} />
              </p>
            </div>

            <div className="flex justify-center items-center gap-12 mt-8">
              <Link
                to={`/test_management?folder=${folderId}&table=${tableId}`}
                onClick={setsetOpenEditModal}
                className="bg-red-600 px-4 py-2 text-white rounded-md hover:bg-red-700 cursor-pointer"
              >
                <span>Cancel</span>
              </Link>
              <button
                className="bg-green-600 px-4 py-2 text-white rounded-md hover:bg-green-900"
                type="submit"
              >
                {loading ? <ButtonPreloader /> : "Submit"}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default EditTestCase;
