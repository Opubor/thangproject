import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import ButtonPreloader from "../../components/ButtonPreloader";
import axios from "../../sevices/axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import logo from "../../assets/fptlogo.png";

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
    <div className=" h-screen bg-white">
      <div className="px-12 md:px-36 py-4 font-bold text-xl flex items-center">
        <img className="w-16" src={logo} />
        <h1>Test management</h1>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center md:px-56">
        <div className="py-16 md:py-52">
          <h1 className="font-bold text-5xl mb-5">Create Account</h1>
          <p className="font-semibold text-2xl mb-6">
            Smart test management software
          </p>
          <p className="text-base">Already have an account?</p>
          <Link to={"/"} className="text-blue-900 text-sm font-semibold">
            ~Sign in!!!
          </Link>
        </div>
        <div className="w-96">
          <h1 className="font-bold text-center text-2xl mb-4">
            Create Account
          </h1>
          <Formik
            initialValues={{
              name: "",
              email: "",
              company: "",
              password: "",
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Required field"),
              email: Yup.string().email().required("Email is required"),
              company: Yup.string().required("Required field"),
              password: Yup.string().required("Password is required"),
            })}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="mb-4">
                <Field
                  className="bg-slate-100 text-black rounded-md px-6 py-3 w-full text-sm focus:border-none focus:outline-blue-500"
                  placeholder={"Name"}
                  name={"name"}
                  type="text"
                />
                <ErrorMessage
                  component="label"
                  name="name"
                  className="text-sm text-red-500"
                />
              </div>

              <div className="mb-4">
                <Field
                  className="bg-slate-100 text-black rounded-md px-6 py-3 w-full text-sm focus:border-none focus:outline-blue-500"
                  placeholder={"E-mail"}
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
                  className="bg-slate-100 text-black rounded-md px-6 py-3 w-full text-sm focus:border-none focus:outline-blue-500"
                  placeholder={"Company"}
                  name={"company"}
                  type="text"
                />
                <ErrorMessage
                  component="label"
                  name="company"
                  className="text-sm text-red-500"
                />
              </div>

              <div className="mb-4">
                <Field
                  className="bg-slate-100 text-black rounded-md px-6 py-3 w-full text-sm focus:border-none focus:outline-blue-500"
                  placeholder={"Password"}
                  name={"password"}
                  type="password"
                />
                <ErrorMessage
                  component="label"
                  name="password"
                  className="text-sm text-red-500"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 py-3 text-white font-semibold w-full rounded-md mt-6 text-sm shadow shadow-2xl shadow-blue-900 hover:bg-blue-700"
              >
                {loading ? <ButtonPreloader /> : "Register"}
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
    // <div className="flex justify-center items-center h-screen bg-blue-300">
    //   <div className="bg-white p-6 lg:rounded-md w-full md:w-9/12 lg:w-6/12 xl:w-4/12">
    //     <div className="text-center mt-4">
    //       <h1 className="font-bold text-2xl">Smart Testcase Management</h1>
    //       <p>Enter your details to Register</p>
    //     </div>
    //     <div className="mt-6">
    //
    //     </div>
    //   </div>
    // </div>
  );
}

export default Register;
