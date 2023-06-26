import React, { useState } from "react";
import { Link } from "react-router-dom";
import ButtonPreloader from "../../components/ButtonPreloader";
import axios from "../../sevices/axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

function Register() {
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    company: "",
    password: "",
  });
  function handleChange(e) {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/staff", {
        name: userData?.name,
        email: userData?.email,
        company: userData?.company,
        password: userData?.password,
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
          <form onSubmit={handleSubmit}>
            <div>
              <input
                placeholder={"Name"}
                className="border p-4 rounded-md w-full mb-4"
                name={"name"}
                type="text"
                onChange={handleChange}
              />
            </div>
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
                placeholder="Company"
                className="border p-4 rounded-md w-full mb-4"
                name={"company"}
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

            <button className="bg-blue-500 py-2 text-white font-semibold w-full rounded-md mt-6">
              {loading ? <ButtonPreloader /> : "REGISTER"}
            </button>
            <p className="text-center font-semibold mt-2">
              Already have an account?{" "}
              <Link to={"/"} className="text-blue-900">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
