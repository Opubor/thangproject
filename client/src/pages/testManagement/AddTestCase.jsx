import React, { useEffect, useState, useRef } from "react";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../sevices/axios";
import { toast } from "react-toastify";
import ButtonPreloader from "../../components/ButtonPreloader";
import { useLocation, useNavigate } from "react-router-dom";

function AddTestCase({ setopenAddCaseModal, styles, getTestCaseTable }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [testEnvironmentData, setTestEnvironmentData] = useState([]);
  const [staffs, setStaffs] = useState([]);

  // Getting Query From URL
  let search = useLocation().search;
  const folderId = new URLSearchParams(search).get("folder");
  const tableId = new URLSearchParams(search).get("table");

  const handleSubmit = (values, actions) => {
    setLoading(true);
    axios
      .post("/testcase", {
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
        setLoading(false), setopenAddCaseModal(false);
        getTestCaseTable;
        toast.success(res.data);
        window.location.reload(true);
      })
      .catch((err) => {
        toast.error(err.response.data);
        setLoading(false);
      });
    actions.setSubmitting(false);
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

  let addCaseRef = useRef();
  function addCaseModal() {
    let closeAddCaseModal = (e) => {
      if (addCaseRef.current != null) {
        if (!addCaseRef.current.contains(e.target)) {
          return setopenAddCaseModal(false);
        }
      }
    };
    document.addEventListener("mousedown", closeAddCaseModal);
    return () => {
      document.removeEventListener("mousedown", closeAddCaseModal);
    };
  }

  useEffect(() => {
    getTestEnvironments();
    getStaffs();
    addCaseModal();
  }, []);

  return (
    <div
      className={`bg-black bg-opacity-70 absolute z-50 left-0 right-0 top-0 flex justify-center items-center md:h-screen ${styles}`}
    >
      <div
        className="bg-white p-8 w-10/12 md:w-6/12 rounded-md"
        ref={addCaseRef}
      >
        <h1 className="text-center text-2xl font-semibold mb-2">Add Case</h1>
        <p className="text-center mb-6 text-sm">
          Provide data with this form to create your app.
        </p>
        <Formik
          initialValues={{
            priority: "",
            title: "",
            teststep: "",
            precondition: "",
            category: "",
            status: "",
            expectations: "",
            assignedstaff: "",
          }}
          validateOnMount
          validationSchema={Yup.object().shape({
            priority: Yup.string().required("Required field"),
            title: Yup.string().required("Required field"),
            teststep: Yup.string().required("Required field"),
            precondition: Yup.string().required("Required field"),
            category: Yup.string().required("Required field"),
            status: Yup.string(),
            expectations: Yup.string().required("Required field"),
            assignedstaff: Yup.string(),
          })}
          onSubmit={handleSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <div className="md:flex justify-between items-center gap-6">
                  <div className="w-full md:w-8/12">
                    <div className="mt-4">
                      <label className="font-semibold">Title</label>
                      <Field
                        className="block bg-gray-50 border border-gray-200 rounded-md p-2 w-full"
                        name={"title"}
                        type="text"
                      />
                      <ErrorMessage
                        component="label"
                        name="title"
                        className="text-sm text-red-500"
                      />
                    </div>

                    <div className="mt-4">
                      <label className="font-semibold">Category</label>
                      <Field
                        className="block bg-gray-50 border border-gray-200 rounded-md p-2 w-full"
                        name={"category"}
                        type="text"
                      />
                      <ErrorMessage
                        component="label"
                        name="category"
                        className="text-sm text-red-500"
                      />
                    </div>

                    <div className="mt-4">
                      <label className="font-semibold">Test Step</label>
                      <Field
                        as="textarea"
                        className="block border border-gray-200 rounded-md p-2 w-full"
                        name={"teststep"}
                        rows="1"
                      />
                      <ErrorMessage
                        component="label"
                        name="teststep"
                        className="text-sm text-red-500"
                      />
                    </div>

                    <div className="mt-4">
                      <label className="font-semibold">Expectation</label>
                      <Field
                        as="textarea"
                        className="block border border-gray-200 rounded-md p-2 w-full"
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
                  <div className="w-full md:w-4/12">
                    <label className="font-semibold">Status Case</label>
                    <Field
                      as="select"
                      name="status"
                      className="block bg-gray-50 border border-gray-200 rounded-md p-2 w-full mt"
                    >
                      <option value="Blank">Blank</option>
                      <option value="Pass">Pass</option>
                      <option value="Fail">Fail</option>
                      <option value="Pending">Pending</option>
                      <option value="Cancel">Cancel</option>
                      <option value="Block">Block</option>
                    </Field>
                    <ErrorMessage
                      component="label"
                      name="status"
                      className="text-sm text-red-500"
                    />

                    <div className="mt-4">
                      <label className="font-semibold">Precondition</label>
                      <Field
                        as="select"
                        name="precondition"
                        className="block bg-gray-50 border border-gray-200 rounded-md p-2 w-full mt"
                      >
                        <option>Select Precondition</option>
                        {testEnvironmentData.map((data, i) => {
                          return (
                            <option
                              value={`${data?.operatingsystem} - ${data?.browser}`}
                              key={i}
                            >
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

                    <div className="mt-4">
                      <label className="font-semibold">Priority</label>
                      <Field
                        as="select"
                        name="priority"
                        className="block bg-gray-50 border border-gray-200 rounded-md p-2 w-full mt"
                      >
                        <option>Select Priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </Field>
                      <ErrorMessage
                        component="label"
                        name="priority"
                        className="text-sm text-red-500"
                      />
                    </div>

                    <div className="mt-4">
                      <label className="font-semibold">Assigned</label>
                      <Field
                        as="select"
                        name="assignedstaff"
                        className="block bg-gray-50 border border-gray-200 rounded-md p-2 w-full"
                      >
                        <option>Select staff</option>
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
                </div>

                <div className="flex justify-center items-center gap-12 mt-8">
                  <span
                    onClick={setopenAddCaseModal}
                    className="bg-red-600 px-4 py-2 text-white rounded-sm hover:bg-red-700 cursor-pointer"
                  >
                    Cancel
                  </span>
                  <button
                    className={` px-4 py-2 text-white rounded-sm hover:bg-green-900 ${
                      formik.isValid
                        ? "bg-green-600"
                        : "bg-gray-500 hover:bg-gray-700 cursor-not-allowed"
                    }`}
                    type="submit"
                    disabled={!formik.isValid}
                  >
                    {loading ? <ButtonPreloader /> : "Submit"}
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default AddTestCase;
