import React, { useContext, useState } from "react";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { Link, Navigate } from "react-router-dom";
import { loginContext } from "../../context/auth";
import ButtonPreloader from "../../components/ButtonPreloader";
import axios from "../../sevices/axios";
import { toast } from "react-toastify";

function Login() {
  const { login, loggedIn, user } = useContext(loginContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values, actions) => {
    setLoading(true);
    axios
      .post("/login", {
        email: values?.email,
        password: values?.password,
      })
      .then((response) => {
        login(response);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response?.data);
        setLoading(false);
      });
    actions.setSubmitting(false);
  };

  if (loggedIn) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-blue-300">
      <div className="bg-white p-6 lg:rounded-md w-full md:w-9/12 lg:w-6/12 xl:w-4/12">
        <div className="text-center mt-4">
          <h1 className="font-bold text-2xl">Smart Testcase Management</h1>
          <p>Enter your details to Log in</p>
        </div>
        <div className="mt-6">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email().required("Email is required"),
              password: Yup.string().required("Password is required"),
            })}
            onSubmit={handleSubmit}
          >
            <Form>
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
                {loading ? <ButtonPreloader /> : "LOGIN"}
              </button>
              <p className="text-center font-semibold mt-2">
                New on our platform?{" "}
                <Link to={"/register"} className="text-blue-900">
                  Create an account
                </Link>
              </p>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;
