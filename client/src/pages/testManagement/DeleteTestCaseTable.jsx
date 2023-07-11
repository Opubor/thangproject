import React, { useState } from "react";
import ButtonPreloader from "../../components/ButtonPreloader";
import axios from "../../sevices/axios";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function DeleteTestCaseTable({ styles }) {
  const [loading, setLoading] = useState(false);
  // Getting Query From URL
  let search = useLocation().search;
  const deleteId = new URLSearchParams(search).get("deletetable");
  const currentTable = new URLSearchParams(search).get("table");

  const handleDelete = () => {
    console.log("delete");
    setLoading(true);
    axios
      .delete(`/testcasetable/${deleteId}`)
      .then((res) => {
        navigate("/test_management", { replace: true }),
          setLoading(false),
          window.location.reload(true),
          toast.success(res.data);
      })
      .catch((err) => {
        toast.error(err.response?.data);
        setLoading(false);
      });
  };

  return (
    <div
      className={`bg-black bg-opacity-70 absolute z-50 left-0 right-0 top-0 flex justify-center items-center h-screen ${styles}`}
    >
      <div className="bg-white px-8 py-4 w-10/12 md:w-6/12 lg:w-5/12 xl:w-3/12 rounded-sm">
        <h1 className="text-center text-xl font-semibold mb-2">
          Delete {currentTable}
        </h1>
        <p className="text-center mb-6 text-sm text-textgray">
          Are you sure you want to delete {currentTable}
        </p>
        <form>
          <div className="flex justify-center items-center gap-12 mt-8">
            <Link
              to={"/test_management"}
              className="bg-red-600 px-4 py-2 text-white rounded-md hover:bg-red-700 cursor-pointer"
            >
              Cancel
            </Link>
            <button
              className="bg-green-600 px-4 py-2 text-white rounded-md hover:bg-green-900"
              onClick={handleDelete}
            >
              {loading ? <ButtonPreloader /> : "Delete"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DeleteTestCaseTable;
