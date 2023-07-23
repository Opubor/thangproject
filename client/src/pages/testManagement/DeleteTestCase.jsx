import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "../../sevices/axios";
import { toast } from "react-toastify";
import ButtonPreloader from "../../components/ButtonPreloader";

function DeleteTestCase({ styles, setOpenDeleteModal }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Getting Query From URL
  let search = useLocation().search;
  const folderId = new URLSearchParams(search).get("folder");
  const tableId = new URLSearchParams(search).get("table");
  const deleteCase = new URLSearchParams(search).get("deleteCase");

  const handleDeleteCase = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .delete(`/testcase/${deleteCase}`)
      .then((res) => {
        setLoading(false), setOpenDeleteModal(false);
        navigate(`/test_management?folder=${folderId}&table=${tableId}`, {
          replace: true,
        }),
          toast.success(res.data);
        window.location.reload(true);
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
      <div className="px-6 py-8 w-full md:w-8/12 lg:w-6/12 xl:w-4/12 bg-white">
        <h1 className="text-center text-xl font-semibold mb-2">
          Delete TestCase
        </h1>
        <p className="text-center mb-6 text-sm text-textgray">
          Are you sure you want to delete this Test Case
        </p>

        <form onSubmit={handleDeleteCase}>
          <div className="flex justify-center items-center gap-12 mt-8">
            <Link
              to={`/test_management?folder=${folderId}&table=${tableId}`}
              onClick={setOpenDeleteModal}
              className="bg-red-600 px-4 py-2 text-white rounded-md hover:bg-red-700 cursor-pointer"
            >
              <span>Cancel</span>
            </Link>
            <button className="bg-green-600 px-4 py-2 text-white rounded-md hover:bg-green-900">
              {loading ? <ButtonPreloader /> : "Delete"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DeleteTestCase;
