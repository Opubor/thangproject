import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
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
  const [csvFile, setCsvFile] = useState(null);

  const handleChange = (event) => {
    setCsvFile(event.target.files[0]);
  };
  const handleSubmit = (values, actions) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("testcasetablecsv", csvFile);
    // axios
    //   .post(`/staffpic/${id}`, formData)
    //   .then((response) => {
    //     setLoading(false), getUserData(), toast.success(response.data);
    //   })
    //   .catch((err) => {
    //     setLoading(false);
    //     toast.error(err.response.data);
    //     console.log(formData);
    //   });
    axios
      .post("/testcasetable", {
        tablename: values?.tablename,
        description: values?.description,
        date: values?.date,
        precondition: values?.precondition,
        version: values?.version,
        assignedfolderId: folderId,
      })
      .then((res) => {
        toast.success(res.data);
        setLoading(false);
        window.location.reload(true);
      })
      .catch((err) => {
        toast.error(err.response.data);
        console.log(err.response.data);
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
        <Formik
          initialValues={{
            tablename: "",
            description: "",
            date: "",
            precondition: "",
            version: "",
          }}
          validationSchema={Yup.object().shape({
            tablename: Yup.string().required("Required field"),
            description: Yup.string().required("Required field"),
            date: Yup.string().required("Required field"),
            precondition: Yup.string().required("Required field"),
            version: Yup.string().required("Required field"),
          })}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="flex justify-between items-center gap-6">
              <div className="w-8/12">
                <div className="mt-4">
                  <label className="font-semibold">Name</label>
                  <Field
                    className="block bg-gray-50 border border-gray-200 rounded-md p-2 w-full"
                    name={"tablename"}
                    placeholder={"Windows"}
                    type="text"
                  />
                  <ErrorMessage
                    component="label"
                    name="tablename"
                    className="text-sm text-red-500"
                  />
                  <p className="text-gray-400 text-sm">
                    set the name of testcase table
                  </p>
                </div>

                <div className="mt-4">
                  <label className="font-semibold">Description</label>
                  <Field
                    as="textarea"
                    className="block border border-gray-200 rounded-md p-2 w-full"
                    name={"description"}
                    rows="1"
                  />
                  <ErrorMessage
                    component="label"
                    name="description"
                    className="text-sm text-red-500"
                  />
                  <p className="text-gray-400 text-sm">
                    Describe your variable
                  </p>
                </div>

                <div className="mt-4">
                  <label className="font-semibold">Attachments</label>
                  <Field
                    className="block bg-gray-50 border border-gray-200 rounded-md p-2 w-full"
                    name={"attachments"}
                    type="text"
                    placeholder="csv files"
                  />
                  <ErrorMessage
                    component="label"
                    name="attachments"
                    className="text-sm text-red-500"
                  />
                  <p className="text-gray-400 text-sm">
                    Drop files here to attack (only CSV file)
                  </p>
                </div>
              </div>
              <div className="w-4/12">
                <label className="font-semibold">Date</label>
                <Field
                  name="date"
                  className="block bg-gray-50 border border-gray-200 rounded-md p-2 w-full mt"
                  type="date"
                />
                <ErrorMessage
                  component="label"
                  name="date"
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

                <div className="mt-4">
                  <label className="font-semibold">Version</label>
                  <Field
                    className="block bg-gray-50 border border-gray-200 rounded-md p-2 w-full"
                    name={"version"}
                    type="text"
                  />
                  <ErrorMessage
                    component="label"
                    name="version"
                    className="text-sm text-red-500"
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

export default AddTestCaseTable;
