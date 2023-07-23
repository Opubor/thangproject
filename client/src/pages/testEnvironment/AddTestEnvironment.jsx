import React from "react";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import ButtonPreloader from "../../components/ButtonPreloader";
import axios from "../../../src/sevices/axios";
import { toast } from "react-toastify";

function AddTestEnvironment({ styles, setOpenAddEnv }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values, actions) => {
    setLoading(true);
    axios
      .post("/testenvironment", {
        operatingsystem: values?.operatingsystem,
        description: values?.description,
        browser: values?.browser,
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
    actions.setSubmitting(false);
  };

  return (
    <div
      className={`lg:mx-24 xl:mx-64 mt-4 xl:mt-0 px-12 flex flex-col justify-center items-center bg-white py-12 rounded-md ${styles}`}
    >
      <h1 className="font-semibold text-2xl">Add Enviroment Variable</h1>
      <h2 className="text-sm">
        Create the enviroment variable first. Then combine multiple variable
        values to create a configuration
      </h2>
      <div className="w-full">
        <Formik
          initialValues={{
            operatingsystem: "",
            description: "",
            browser: "",
          }}
          validateOnMount
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
                  <h1
                    className="bg-red-600 px-4 py-2 text-white rounded-sm hover:bg-red-700 cursor-pointer"
                    onClick={setOpenAddEnv}
                  >
                    Cancel
                  </h1>
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

export default AddTestEnvironment;
