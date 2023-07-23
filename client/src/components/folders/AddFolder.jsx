import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import ButtonPreloader from "../ButtonPreloader";
import axios from "../../sevices/axios";

function AddFolder({ styles, cancelButton }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values, actions) => {
    setLoading(true);
    axios
      .post("/folder", {
        foldername: values?.foldername,
      })
      .then((res) => {
        toast.success(res.data);
        setLoading(false);
        window.location.reload(true);
      })
      .catch((err) => {
        toast.error(err.response?.data);
        setLoading(false);
      });
    actions.setSubmitting(false);
  };

  return (
    <div
      className={`bg-black bg-opacity-70 absolute z-50 left-0 right-0 top-0 flex justify-center items-center h-screen ${styles}`}
    >
      <div className="bg-white p-8 w-3/12 rounded-md">
        <h1 className="text-center text-lg font-semibold">Add Folder</h1>
        <Formik
          initialValues={{
            foldername: "",
          }}
          validateOnMount
          validationSchema={Yup.object().shape({
            foldername: Yup.string().required("Required field"),
          })}
          onSubmit={handleSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <div className="mt-4">
                  <label className="font-semibold">Folder Name</label>
                  <Field
                    className="block bg-gray-50 border border-gray-200 rounded-md p-2 w-full"
                    placeholder={"Folder 1"}
                    name={"foldername"}
                    type="text"
                  />
                  <ErrorMessage
                    component="label"
                    name="foldername"
                    className="text-sm text-red-500"
                  />
                </div>

                <div className="flex justify-center items-center gap-12 mt-8">
                  <span
                    onClick={cancelButton}
                    className="bg-red-600 px-4 py-2 text-white rounded-md hover:bg-red-700 cursor-pointer"
                  >
                    Cancel
                  </span>
                  <button
                    className={` px-4 py-2 text-white rounded-md hover:bg-green-900 ${
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

export default AddFolder;
