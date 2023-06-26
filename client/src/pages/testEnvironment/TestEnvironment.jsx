import React, { useEffect, useState } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import filepic from "../../assets/Vector (7).png";
import editpen from "../../assets/Vector (13).png";
import deletecircle from "../../assets/delete-circle.png";
import plusBlue from "../../assets/add-circle-blue.png";
import cancel from "../../assets/cancel.png";
import { Link } from "react-router-dom";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import axios from "../../../src/sevices/axios";
import { toast } from "react-toastify";
import ButtonPreloader from "../../components/ButtonPreloader";
import DeleteButton from "../../components/DeleteButton";
import Modal from "../../components/Modal";
import ReactPagination from "../../components/ReactPaginate";
import TotalNo from "../../components/TotalNo";
import SearchInput from "../../components/SearchInput";

function TestEnvironment() {
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const [deleteTestEnv, setDeleteTestEnv] = useState(false);
  const [openAddEnv, setOpenAddEnv] = useState(false);
  const [testEnvironmentData, setTestEnvironmentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [testEnvironment, setTestEnvironment] = useState({
    operatingsystem: "",
    description: "",
    browser: "",
  });

  function handleChange(e) {
    setTestEnvironment((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/testenvironment", {
        operatingsystem: testEnvironment?.operatingsystem,
        description: testEnvironment?.description,
        browser: testEnvironment?.browser,
      })
      .then((res) => {
        toast.success(res.data);
        setLoading(false);
        window.location.reload(true);
      })
      .catch((err) => {
        toast.error(err);
        setLoading(false);
      });
  };

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
    console.log("delete");
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
          className={`p-6 h-screen ${
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
            <div className="flex justify-between items-center">
              <div>
                <SearchInput onSearch={search} />
              </div>
              <div className="flex items-center gap-4">
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
          <div
            className={`lg:mx-24 xl:mx-64 mt-4 xl:mt-0 px-12 flex flex-col justify-center items-center bg-white py-12 rounded-md ${
              openAddEnv ? "block" : "hidden"
            }`}
          >
            <h1 className="font-semibold text-2xl">Add Enviroment Variable</h1>
            <h2 className="text-sm">
              Create the enviroment variable first. Then combine multiple
              variable values to create a configuration
            </h2>

            <div className="w-full">
              <form onSubmit={handleSubmit}>
                <div>
                  <Input
                    placeholder={"Windows"}
                    label={"Operating System"}
                    name={"operatingsystem"}
                    type="text"
                    onchange={handleChange}
                  />
                  <p className="text-gray-400 text-sm">
                    set the name of the variable
                  </p>
                </div>

                <div>
                  <TextArea
                    label={"Description"}
                    name="description"
                    onchange={handleChange}
                    value={testEnvironment?.description}
                    rows={"4"}
                  />
                  <p className="text-gray-400 text-sm">
                    Describe your variable
                  </p>
                </div>

                <div>
                  <Input
                    placeholder={"chrome"}
                    label={"Browser"}
                    name={"browser"}
                    type="text"
                    onchange={handleChange}
                    value={testEnvironment?.browser}
                  />
                  <p className="text-gray-400 text-sm">Set the browser</p>
                </div>
                <div className="flex justify-end items-center gap-12 mt-4 text-sm">
                  <h1
                    className="bg-red-600 px-4 py-2 text-white rounded-sm hover:bg-red-700 cursor-pointer"
                    onClick={() => setOpenAddEnv(false)}
                  >
                    Cancel
                  </h1>
                  <button className="bg-green-600 px-4 py-2 text-white rounded-sm hover:bg-green-900">
                    {loading ? <ButtonPreloader /> : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
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
