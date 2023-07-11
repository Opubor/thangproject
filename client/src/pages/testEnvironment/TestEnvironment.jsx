import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import DefaultLayout from "../../components/DefaultLayout";
import editpen from "../../assets/Vector (13).png";
import deletecircle from "../../assets/delete-circle.png";
import plusBlue from "../../assets/add-circle-blue.png";
import { Link } from "react-router-dom";
import axios from "../../../src/sevices/axios";
import { toast } from "react-toastify";
import ButtonPreloader from "../../components/ButtonPreloader";
import ReactPagination from "../../components/ReactPaginate";
import TotalNo from "../../components/TotalNo";
import SearchInput from "../../components/SearchInput";
import AddTestEnvironment from "./AddTestEnvironment";

function TestEnvironment() {
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const [deleteTestEnv, setDeleteTestEnv] = useState(false);
  const [openAddEnv, setOpenAddEnv] = useState(false);
  const [testEnvironmentData, setTestEnvironmentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  function getTestEnvironments() {
    axios
      .get("/testenvironment")
      .then((response) => {
        setTestEnvironmentData(response?.data);
      })
      .catch((response) => {
        console.log(response.data);
      });
  }

  useEffect(() => {
    getTestEnvironments();
  }, []);

  // PAGINATION
  // Get Current Posts
  const postsPerPage = 3;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = testEnvironmentData.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const pageCount = Math.ceil(testEnvironmentData.length / postsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  // SEARCH
  const search = (data) => {
    axios.get(`/testenvironment?q=${data}`).then((response) => {
      setTestEnvironmentData(response.data);
      setCurrentPage(1);
    });
  };

  const handleDelete = () => {
    setLoading(true);
    axios.delete(`/testenvironment/${deleteId}`).then((res) => {
      getTestEnvironments();
      toast.success(res.data);
      setLoading(false);
    });
  };

  return (
    <>
      <DefaultLayout>
        <div
          className={`p-6 pt-12 md:pt-8 lg:pt-6 h-screen ${
            openAddEnv ? "bg-modalbackground" : "bg-white"
          }`}
        >
          <div
            className={`${
              openAddEnv ? "hidden" : "block"
            } bg-white w-full mt-4 xl:mt-0`}
          >
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-semibold text-textdark">
                Test Environment
              </h1>
              <button
                className="flex justify-between items-center gap-2 text-sm border-2 border-lightblue rounded-lg px-4 py-2 text-lightblue font-semibold hover:bg-lightblue hover:text-white text-sm lg:text-base"
                onClick={() => setOpenAddEnv(true)}
              >
                Add Precondition
                <img src={plusBlue} />
              </button>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="w-full lg:w-7/12 pr-8">
                <SearchInput onSearch={search} />
              </div>
              <div className="w-full lg:w-5/12 flex justify-start lg:justify-end items-center gap-4">
                <ReactPagination
                  pageCount={pageCount}
                  handlePageClick={handlePageClick}
                />
                <TotalNo
                  tablename={"Test Environments"}
                  totalnumber={testEnvironmentData?.length}
                />
              </div>
            </div>

            {/* ==============TABLE============= */}
            {currentPosts.map((data, i) => {
              return (
                <div
                  className="border border-gray-200 rounded-3xl py-4 text-sm mt-2"
                  key={i}
                >
                  <div className="flex justify-between items-center pl-8 xl:pl-12 pr-4 mb-6">
                    <div className="flex justify-between items-center gap-4">
                      <h1 className="text-red-500 text-xl font-semibold">
                        {data?.operatingsystem} - {data?.browser}
                      </h1>
                      <Link to={`/edit_test_environment?edit=${data?._id}`}>
                        <img src={editpen} className="w-4" />
                      </Link>
                    </div>

                    <button
                      onClick={() => {
                        setDeleteModal(true),
                          setDeleteId(data?._id),
                          setDeleteTestEnv(data?.operatingsystem);
                      }}
                    >
                      <img src={deletecircle} className="w-4" />
                    </button>
                  </div>

                  <div className="border-b border-b-gray-200 text-gray-700 mb-4 flex justify-between items-center mx-4 xl:mx-8 px-4">
                    <h1 className="w-3/12 xl:w-2/12">Operating System</h1>
                    <p className="w-9/12 xl:w-10/12">{data?.operatingsystem}</p>
                  </div>
                  <div className="border-b border-b-gray-200 text-gray-700 mb-4 flex justify-between items-center mx-4 xl:mx-8 px-4">
                    <h1 className="w-3/12 xl:w-2/12">Description</h1>
                    <p className="w-9/12 xl:w-10/12">{data?.description}</p>
                  </div>
                  <div className="border-b border-b-gray-200 text-gray-700 mb-4 flex justify-between items-center mx-4 xl:mx-8 px-4">
                    <h1 className="w-3/12 xl:w-2/12">Browser</h1>
                    <p className="w-9/12 xl:w-10/12">{data?.browser}</p>
                  </div>
                </div>
              );
            })}
            {/* ================================================= */}
          </div>

          {/* ===========AddTestEnvironmentVariable========= */}
          <AddTestEnvironment
            styles={openAddEnv ? "block" : "hidden"}
            setOpenAddEnv={() => setOpenAddEnv(false)}
          />
        </div>
      </DefaultLayout>

      {/* ===============DeleteModal============ */}
      <div
        className={`bg-black bg-opacity-70 absolute z-50 left-0 right-0 top-0 flex justify-center items-center h-screen ${
          deleteModal ? "flex" : "hidden"
        }`}
      >
        <div className="bg-white px-8 py-4 w-10/12 md:w-6/12 lg:w-5/12 xl:w-3/12 rounded-sm">
          <h1 className="text-center text-xl font-semibold mb-2">
            Delete {deleteTestEnv} {" - "} {deleteTestEnv}
          </h1>
          <p className="text-center mb-6 text-sm text-textgray">
            Are you sure you want to delete this <br /> Test Enviroment?
          </p>
          <form>
            <div className="flex justify-center items-center gap-12 mt-8">
              <button
                onClick={() => setDeleteModal(false)}
                className="bg-red-600 px-4 py-2 text-white rounded-md hover:bg-red-700"
              >
                Cancel
              </button>
              <button
                className="bg-green-600 px-4 py-2 text-white rounded-md hover:bg-green-900"
                onClick={handleDelete}
              >
                {loading ? <ButtonPreloader /> : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default TestEnvironment;
