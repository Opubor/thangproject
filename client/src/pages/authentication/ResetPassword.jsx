import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import ButtonPreloader from "../../components/ButtonPreloader";
import axios from "../../../src/sevices/axios";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
    <div className="flex justify-center items-center h-screen bg-blue-300">
      <div className="bg-white p-6 rounded-md">
        <div className="mt-4">
          <h1 className="font-bold text-2xl text-center">Reset Password</h1>
          <p>
            Your new password must be different from previously used <br></br>{" "}
            passwords
          </p>
        </div>
        <div className="mt-6">
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
              <div>
                <label className="font-semibold">New Password</label>
                <Field
                  className="block bg-gray-50 border border-gray-200 rounded-md p-2 w-full"
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
              <div>
                <label className="font-semibold">Comfirm Password</label>
                <Field
                  className="block bg-gray-50 border border-gray-200 rounded-md p-2 w-full"
                  placeholder={"Comfirm Password"}
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
                className="bg-blue-500 py-2 text-white font-semibold w-full rounded-md mt-6"
                type="submit"
              >
                {loading ? <ButtonPreloader /> : "RESET"}
              </button>
              <p className="text-center font-semibold mt-2">
                <Link to="/" className="text-blue-900">
                  {"<"} Back to login
                </Link>
              </p>
            </Form>
          </Formik>
          {/* <form>
            <div>
              <input
                placeholder="New Password"
                className="border p-4 rounded-md w-full mb-4"
              />
            </div>
            <div>
              <input
                placeholder="Comfirm Password"
                className="border p-4 rounded-md w-full mb-4"
              />
            </div>

            <button className="bg-blue-500 py-2 text-white font-semibold w-full rounded-md mt-6">
              RESET
            </button>
            <p className="text-center font-semibold mt-2">
              <Link to="/" className="text-blue-900">
                {"<"} Back to login
              </Link>
            </p>
          </form> */}
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
