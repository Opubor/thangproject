import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import ButtonPreloader from "../../components/ButtonPreloader";
import DefaultLayout from "../../components/DefaultLayout";
import axios from "../../sevices/axios";
import { toast } from "react-toastify";

function EditTestEnvironment() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [testEnvironment, setTestEnvironment] = useState([]);

  // Getting Query From URL
  let search = useLocation().search;
  const id = new URLSearchParams(search).get("edit");

  // To Get Current Details
  useEffect(() => {
    axios.get(`/testenvironment/?edit=${id}`).then((response) => {
      setTestEnvironment(response.data);
    });
  }, []);

  const handleSubmit = (values, actions) => {
    setLoading(true);
    axios
      .put(`/testenvironment/${id}`, {
        operatingsystem: values?.operatingsystem,
        description: values?.description,
        browser: values?.browser,
      })
      .then((res) => {
        toast.success(res.data);
        setLoading(false);
        navigate("/test_environment", { replace: true });
      })
      .catch((err) => {
        toast.error(err);
        setLoading(false);
      });
    actions.setSubmitting(false);
  };

  return (
    <DefaultLayout>
      <div className="p-6 h-screen">
        <div
          className={`lg:mx-24 xl:mx-64 mt-4 xl:mt-0 px-12 flex flex-col justify-center items-center bg-white py-12 rounded-md`}
        >
          <h1 className="font-semibold text-2xl">Edit Enviroment Variable</h1>
          <h2 className="text-sm">
            Create the enviroment variable first. Then combine multiple variable
            values to create a configuration
          </h2>

          <div className="w-full">
            <Formik
              enableReinitialize={true}
              validateOnMount
              initialValues={{
                operatingsystem: testEnvironment?.operatingsystem,
                description: testEnvironment?.description,
                browser: testEnvironment?.browser,
              }}
              validationSchema={Yup.object().shape({
                operatingsystem: Yup.string().required("Required field"),
                description: Yup.string(),
                browser: Yup.string().required("Required field"),
              })}
              onSubmit={handleSubmit}
            >
              {(formik) => {
                return (
                  <Form>
                    <div className="mt-4">
                      <label className="font-semibold">Operating System</label>
                      <Field
                        className="block bg-gray-50 border border-gray-200 rounded-md p-2 w-full"
                        placeholder={"Windows"}
                        name={"operatingsystem"}
                        type="text"
                      />
                      <ErrorMessage
                        component="label"
                        name="operatingsystem"
                        className="text-sm text-red-500"
                      />
                      <p className="text-gray-400 text-sm">
                        set the name of the variable
                      </p>
                    </div>

                    <div className="mt-4">
                      <label className="font-semibold">Description</label>
                      <Field
                        as="textarea"
                        className="block border border-gray-200 rounded-md p-2 w-full"
                        placeholder={"Description"}
                        name={"description"}
                        rows="4"
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
                      <label className="font-semibold">Browser</label>
                      <Field
                        className="block bg-gray-50 border border-gray-200 rounded-md p-2 w-full"
                        placeholder={"chrome"}
                        name={"browser"}
                        type="text"
                      />
                      <ErrorMessage
                        component="label"
                        name="browser"
                        className="text-sm text-red-500"
                      />
                      <p className="text-gray-400 text-sm">
                        set the name of the variable
                      </p>
                    </div>

                    <div className="flex justify-end items-center gap-12 mt-4 text-sm">
                      <Link
                        to={"/test_environment"}
                        className="bg-red-600 px-4 py-2 text-white rounded-sm hover:bg-red-700 cursor-pointer"
                      >
                        Cancel
                      </Link>
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
      </div>
    </DefaultLayout>
  );
}

export default EditTestEnvironment;
