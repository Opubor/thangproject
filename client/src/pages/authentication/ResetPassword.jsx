import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import ButtonPreloader from "../../components/ButtonPreloader";
import axios from "../../../src/sevices/axios";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import logo from "../../assets//Group 26942.png";

function ResetPassword() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState([]);
  const [loading, setLoading] = useState(false);

  // Getting Query From URL
  let search = useLocation().search;
  const id = new URLSearchParams(search).get("resu");
  const token = new URLSearchParams(search).get("nekot");

  function getUserEmail() {
    axios
      .get(`/reset-password?id=${id}&token=${token}`)
      .then((response) => {
        setUserEmail(response?.data);
        console.log(response.data);
      })
      .catch((response) => {
        console.log(response.data);
      });
  }

  useEffect(() => {
    getUserEmail();
  }, []);

  const handleSubmit = (values, actions) => {
    setLoading(true);
    axios
      .post(`/reset-password?id=${id}&token=${token}`, {
        password: values?.newPassword,
      })
      .then((res) => {
        navigate("/", { replace: true }), toast.success(res.data);
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
        <img className="w-8" src={logo} />
        <h1>Test management</h1>
      </div>
      <div className="flex justify-between items-center px-56">
        <div className="py-52">
          <h1 className="font-bold text-5xl mb-5">Reset Password</h1>
          <p className="font-semibold text-2xl mb-6">
            Smart test management software
          </p>
          <p className="text-base">Don't have an account?</p>
          <Link to={"/"} className="text-blue-900 text-sm font-semibold">
            ~Back to Login~{" "}
          </Link>
        </div>
        <div className="w-96">
          <h1 className="font-bold text-center text-2xl mb-4">Sign in</h1>
          <Formik
            initialValues={{
              newPassword: "",
              comfirmPassword: "",
            }}
            validationSchema={Yup.object().shape({
              newPassword: Yup.string().required("Required field"),
              comfirmPassword: Yup.string()
                .required("Required field")
                .oneOf(
                  [Yup.ref("newPassword"), null],
                  "Passwords do not match"
                ),
            })}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="mb-4">
                <Field
                  className="bg-slate-100 text-black rounded-md px-6 py-3 w-full text-sm focus:border-none focus:outline-blue-500"
                  placeholder={"Enter your new password"}
                  name={"newPassword"}
                  type="password"
                />
                <ErrorMessage
                  component="label"
                  name="newPassword"
                  className="text-sm text-red-500"
                />
              </div>
              <div className="mb-4">
                <Field
                  className="bg-slate-100 text-black rounded-md px-6 py-3 w-full text-sm focus:border-none focus:outline-blue-500"
                  placeholder={"Comfirm new Password"}
                  name={"comfirmPassword"}
                  type="password"
                />
                <ErrorMessage
                  component="label"
                  name="comfirmPassword"
                  className="text-sm text-red-500"
                />
              </div>

              <button
                className="bg-blue-500 py-3 text-white font-semibold w-full rounded-md mt-6 text-sm shadow shadow-2xl shadow-blue-900 hover:bg-blue-700"
                type="submit"
              >
                {loading ? <ButtonPreloader /> : "Reset"}
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
