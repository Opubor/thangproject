import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import ButtonPreloader from "../../components/ButtonPreloader";
import axios from "../../../src/sevices/axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

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
    <div className="flex justify-center items-center h-screen bg-blue-300">
      <div className="bg-white p-6 rounded-md">
        <div className="mt-4">
          <h1 className="font-bold text-2xl text-center">Forgot Password</h1>
          <p>
            Enter your email and we'll send you instructions to reset your{" "}
            <br></br> password
          </p>
        </div>
        <div className="mt-6">
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().required("Required field"),
            })}
            onSubmit={handleSubmit}
          >
            <Form>
              <div>
                <label className="font-semibold">Email</label>
                <Field
                  className="block bg-gray-50 border border-gray-200 rounded-md p-2 w-full"
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
                className="bg-blue-500 py-2 text-white font-semibold w-full rounded-md mt-6"
                type="submit"
              >
                {loading ? <ButtonPreloader /> : "Submit"}
              </button>
              <p className="text-center font-semibold mt-2">
                <Link to="/" className="text-blue-900">
                  {"<"} Back to login
                </Link>
              </p>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
