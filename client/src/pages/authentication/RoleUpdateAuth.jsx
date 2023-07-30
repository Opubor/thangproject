import React, { useContext, useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import DefaultLayout from "../../components/DefaultLayout";
import { loginContext } from "../../context/auth";
import axios from "../../sevices/axios";
import { toast } from "react-toastify";
import ButtonPreloader from "../../components/ButtonPreloader";
import { Link, Navigate, useNavigate } from "react-router-dom";

function RoleUpdateOne() {
  const navigate = useNavigate();
  const { logout, loggedIn, user } = useContext(loginContext);
  let role = user?.role;
  const [loading, setLoading] = useState(false);

  const id = user?._id;
  // Update password==================
  const roleAuthentication = (values, actions) => {
    setLoading(true);
    axios
      .put(`/roleauth/${id}`, {
        passcodeOne: values?.passcodeOne,
        passcodeTwo: values?.passcodeTwo,
      })
      .then((res) => {
        setLoading(false);
        navigate("/dashboard", { replace: true });
        toast.success(res.data);
        window.location.reload(true);
      })
      .catch((err) => {
        toast.error(err.response.data);
        setLoading(false);
        navigate("/dashboard", { replace: true });
      });
    actions.setSubmitting(false);
  };

  return (
    <DefaultLayout>
      <div className="h-screen pt-8 lg:pt-2">
        <div className="flex-col items-center justify-center mx-72 border shadow shadow-lg mt-6 p-8">
          <p className="font-semibold text-lg mb-6 text-center">UPDATE ROLE</p>
          <div className="w-full">
            <Formik
              initialValues={{
                passcodeOne: "",
                passcodeTwo: "",
              }}
              validateOnMount
              validationSchema={Yup.object().shape({
                passcodeOne: Yup.string().required("Required field"),
                passcodeTwo: Yup.string().required("Required field"),
              })}
              onSubmit={roleAuthentication}
            >
              {(formik) => {
                return (
                  <Form>
                    <div className="mt-4">
                      <Field
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none w-full"
                        placeholder={"Enter pass-code ONE"}
                        name={"passcodeOne"}
                        type="password"
                      />
                      <ErrorMessage
                        component="label"
                        name="passcodeOne"
                        className="text-sm text-red-500"
                      />
                    </div>
                    <div className="mt-4">
                      <Field
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none w-full"
                        placeholder={"Enter pass-code TWO"}
                        name={"passcodeTwo"}
                        type="password"
                      />
                      <ErrorMessage
                        component="label"
                        name="passcodeTwo"
                        className="text-sm text-red-500"
                      />
                    </div>

                    <div className="flex justify-end items-center gap-12 mt-4 text-sm">
                      <h1
                        className="bg-red-600 px-4 py-2 text-white rounded-sm hover:bg-red-700 cursor-pointer"
                        //   onClick={setOpenAddEnv}
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
      </div>
    </DefaultLayout>
  );
}

export default RoleUpdateOne;
