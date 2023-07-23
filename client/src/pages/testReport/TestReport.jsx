import React from "react";
import { Link } from "react-router-dom";
import DefaultLayout from "../../components/DefaultLayout";
import chartbg from "../../assets/chartbg.png";

function TestReport() {
  return (
    <DefaultLayout>
      <div
        className={`h-[39rem] flex justify-center items-center`}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.500), rgba(0, 0, 0, 0.500)),url(${chartbg})`,
          backgroundSize: "cover",
        }}
      >
        <div className="bg-white p-6 text-center">
          <h1 className="text-2xl font-bold">
            This feature is coming on next version! 🚧
          </h1>
          <p className="text-textgray pb-8 text-sm">
            Sorry for the inconvenience but we're performing some maintenance at
            the moment
          </p>
          <Link
            className="bg-blue-900 px-4 p-2 rounded-sm text-sm text-white"
            to={"/dashboard"}
          >
            Back To Home
          </Link>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default TestReport;
