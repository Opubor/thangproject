import React from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
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
          <form>
            <div>
              <input
                placeholder="E-mail"
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
