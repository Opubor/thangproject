import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import ButtonPreloader from "../../components/ButtonPreloader";
import axios from "../../../src/sevices/axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/fptlogo.png";

function ForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values, actions) => {
    setLoading(true);
    axios
      .post("/forgotpassword", {
        email: values?.email,
      })
      .then((res) => {
        navigate("/redirect", { replace: true }), toast.success(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data);
        setLoading(false);
      });
    actions.setSubmitting(false);
  };

  return (
    <div className=" h-screen bg-white">
      <div className="px-36 py-4 font-bold text-xl flex items-center">
        <img className="w-16" src={logo} />
        <h1>Test management</h1>
      </div>
      <div className="flex justify-between items-center px-56">
        <div className="py-52">
          <h1 className="font-bold text-5xl mb-5">Forgot Password?</h1>
          <p className="font-semibold text-2xl mb-6">
            Smart test management software
          </p>
          <Link to={"/"} className="text-blue-900 text-sm font-semibold">
            ~Back to Login~
          </Link>
        </div>
        <div className="w-96">
          <h1 className="font-bold text-center text-2xl mb-4">Sign in</h1>
          <Formik
            initialValues={{
              email: "",
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={Yup.object().shape({
              email: Yup.string().required("Required field"),
            })}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="">
                <Field
                  className="bg-slate-100 text-black rounded-md px-6 py-3 w-full text-sm focus:outline-blue-500"
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

              <button
                className="bg-blue-500 py-3 text-white font-semibold w-full rounded-md mt-6 text-sm shadow shadow-2xl shadow-blue-900 hover:bg-blue-700"
                type="submit"
              >
                {loading ? <ButtonPreloader /> : "Submit"}
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
