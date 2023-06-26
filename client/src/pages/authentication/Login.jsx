import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { loginContext } from "../../context/auth";
import ButtonPreloader from "../../components/ButtonPreloader";
import axios from "../../sevices/axios";
import { toast } from "react-toastify";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  const [loading, setLoading] = useState(false);

  const { login, loggedIn, user } = useContext(loginContext);

  const submitLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/login", {
        email: formData?.email,
        password: formData?.password,
      })
      .then((response) => {
        login(response);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response?.data);
        setLoading(false);
      });
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
          <form onSubmit={submitLogin}>
            <div>
              <input
                placeholder="E-mail"
                className="border p-4 rounded-md w-full mb-4"
                name={"email"}
                type="text"
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                placeholder="Password"
                className="border p-4 rounded-md w-full mb-2"
                name={"password"}
                type="password"
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between items-center px-6 font-semibold text-sm">
              <div className="flex justify-center items-center gap-2">
                <input type="checkbox" />
                <p>Remember Me</p>
              </div>
              <div>
                <Link to="/forgotpassword" className="text-blue-900">
                  Forgot Password?
                </Link>
              </div>
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
