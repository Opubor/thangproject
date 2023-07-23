import React, { useContext, useState } from "react";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { Link, Navigate } from "react-router-dom";
import { loginContext } from "../../context/auth";
import ButtonPreloader from "../../components/ButtonPreloader";
import logo from "../../assets/fptlogo.png";
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
    <div className=" h-screen bg-white">
      <div className="px-12 md:px-36 py-4 font-bold text-xl flex items-center">
        <img className="w-16" src={logo} />
        <h1>Smart test management software</h1>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center md:px-56">
        <div className="py-24 md:py-52">
          <h1 className="font-bold text-5xl mb-5">Sign in to</h1>
          <p className="font-semibold text-2xl mb-6">
            Smart test management software
          </p>
          <p className="text-base">Don't have an account?</p>
          <Link
            to={"/register"}
            className="text-blue-900 text-sm font-semibold"
          >
            ~Register Here!!!
          </Link>
        </div>
        <div className="w-96">
          <h1 className="font-bold text-center text-2xl mb-4">Sign in</h1>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={Yup.object().shape({
              email: Yup.string().email().required("Email is required"),
              password: Yup.string().required("Password is required"),
            })}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="mb-4">
                <Field
                  className="bg-slate-100 text-black rounded-md px-6 py-3 w-full text-sm focus:border-none focus:outline-blue-500"
                  placeholder={"Enter your email"}
                  name={"email"}
                  type="text"
                />
                <ErrorMessage
                  component="label"
                  name="email"
                  className="text-sm text-red-500"
                />
              </div>

              <div className="mb-4">
                <Field
                  className="bg-slate-100 text-black rounded-md px-6 py-3 w-full text-sm focus:outline-blue-500"
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
              <Link
                to={"/forgotpassword"}
                className="text-blue-900 flex justify-end text-center text-sm"
              >
                Forgot password?
              </Link>
              <button
                type="submit"
                className="bg-blue-500 py-3 text-white font-semibold w-full rounded-md mt-6 text-sm shadow shadow-2xl shadow-blue-900 hover:bg-blue-700"
              >
                {loading ? <ButtonPreloader /> : "Login"}
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;
