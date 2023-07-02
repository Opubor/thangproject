import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import ButtonPreloader from "../../components/ButtonPreloader";
import axios from "../../sevices/axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

function Register() {
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleSubmit = (values, actions) => {
    setLoading(true);
    axios
      .post("/staff", {
        name: values?.name,
        email: values?.email,
        company: values?.company,
        password: values?.password,
      })
      .then((res) => {
        toast.success("Registration Successful");
        setLoading(false);
        setRegistered(true);
      })
      .catch((err) => {
        toast.error(err.response.data);
        setLoading(false);
      });
    actions.setSubmitting(false);
  };

  if (registered) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-blue-300">
      <div className="bg-white p-6 lg:rounded-md w-full md:w-9/12 lg:w-6/12 xl:w-4/12">
        <div className="text-center mt-4">
          <h1 className="font-bold text-2xl">Smart Testcase Management</h1>
          <p>Enter your details to Register</p>
        </div>
        <div className="mt-6">
          <Formik
            initialValues={{
              name: "",
              email: "",
              company: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Required field"),
              email: Yup.string().email().required("Email is required"),
              company: Yup.string().required("Required field"),
              password: Yup.string().required("Password is required"),
            })}
            onSubmit={handleSubmit}
          >
            <Form>
              <div>
                <label className="font-semibold">Name</label>
                <Field
                  className="border p-4 rounded-md w-full mb-4"
                  placeholder={"Hoang Thuy"}
                  name={"name"}
                  type="text"
                />
                <ErrorMessage
                  component="label"
                  name="name"
                  className="text-sm text-red-500"
                />
              </div>

              <div>
                <label className="font-semibold">E-mail</label>
                <Field
                  className="border p-4 rounded-md w-full mb-4"
                  placeholder={"hoangthuy@gmail.com"}
                  name={"email"}
                  type="text"
                />
                <ErrorMessage
                  component="label"
                  name="email"
                  className="text-sm text-red-500"
                />
              </div>

              <div>
                <label className="font-semibold">Company</label>
                <Field
                  className="border p-4 rounded-md w-full mb-4"
                  placeholder={"Thang Industrals"}
                  name={"company"}
                  type="text"
                />
                <ErrorMessage
                  component="label"
                  name="company"
                  className="text-sm text-red-500"
                />
              </div>

              <div>
                <label className="font-semibold">Password</label>
                <Field
                  className="border p-4 rounded-md w-full mb-4"
                  placeholder={"*******"}
                  name={"password"}
                  type="password"
                />
                <ErrorMessage
                  component="label"
                  name="password"
                  className="text-sm text-red-500"
                />
              </div>
              <button className="bg-blue-500 py-2 text-white font-semibold w-full rounded-md mt-6">
                {loading ? <ButtonPreloader /> : "REGISTER"}
              </button>
              <p className="text-center font-semibold mt-2">
                Already have an account?{" "}
                <Link to={"/"} className="text-blue-900">
                  Sign In
                </Link>
              </p>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Register;
