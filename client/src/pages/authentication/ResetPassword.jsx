import React from "react";
import { Link } from "react-router-dom";

function ResetPassword() {
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
          <form>
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
