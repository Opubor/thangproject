import React, { useContext, useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import DefaultLayout from "../../components/DefaultLayout";
import Tabs from "../../components/Tabs";
import avatar from "../../assets/avatar (1).png";
import { loginContext } from "../../context/auth";
import axios from "../../sevices/axios";
import { toast } from "react-toastify";
import ButtonPreloader from "../../components/ButtonPreloader";
import { Link } from "react-router-dom";
import ReactPagination from "../../components/ReactPaginate";
import TotalNo from "../../components/TotalNo";

function Settings() {
  const { logout, loggedIn, user } = useContext(loginContext);
  let role = user?.role;
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [profilePicData, setProfilePicData] = useState(null);
  const [staffs, setStaffs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(false);

  function getStaffs() {
    axios
      .get("/staff")
      .then((response) => {
        setStaffs(response?.data);
      })
      .catch((response) => {
        console.log(response.data);
      });
  }

  const handleChange = (event) => {
    setProfilePicData(event.target.files[0]);
  };

  const id = user?._id;
  function getUserData() {
    axios.get(`/staff/?edit=${id}`).then((response) => {
      setUserData(response.data);
    });
  }
  // To Get Current Details
  useEffect(() => {
    getUserData();
    getStaffs();
  }, []);

  const SubmitUserDetails = (values, actions) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("profilepic", profilePicData);
    axios
      .put(`/staffpic/${id}`, formData)
      .then((response) => {
        setLoading(false), getUserData(), toast.success(response.data);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data);
        console.log(formData);
      });
    axios
      .put(`/staff/${id}`, {
        name: values?.name,
        email: values?.email,
        company: values?.company,
      })
      .then((response) => {
        setLoading(false), getUserData(), toast.success(response.data);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data);
        console.log(formData);
      });
    actions.setSubmitting(false);
  };

  const updatePassword = (values, actions) => {
    setLoading(true);
    axios
      .put(`/updatepassword/${id}`, {
        oldpassword: values?.oldpassword,
        newpassword: values?.newpassword,
        confirmnewpassword: values?.confirmnewpassword,
      })
      .then((res) => {
        toast.success(res.data);
        setLoading(false);
        window.location.reload(true);
      })
      .catch((err) => {
        toast.error(err.response.data);
        setLoading(false);
      });
    actions.setSubmitting(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.delete(`/staff/${deleteId}`).then((res) => {
      getStaffs();
      toast.success(res.data);
      setLoading(false);
      setDeleteModal(false);
    });
  };

  // PAGINATION
  // Get Current Posts
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = staffs.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(staffs.length / postsPerPage);
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <>
      <DefaultLayout>
        <div className="h-screen mt-16">
          <Tabs
            tab1Tag={"Account"}
            tab1Display={
              <div className="p-4 h-screen">
                <img
                  src={userData?.profilepic}
                  alt="Profile Pic"
                  className="w-32 h-32 fixed"
                />
                <label
                  htmlFor="profilepic"
                  className="absolute mt-24 ml-16 bg-blue-700 cursor-pointer p-4 rounded-full w-12 text-white flex items-center justify-center"
                >
                  <svg
                    className="fill-current"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                      fill=""
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                      fill=""
                    />
                  </svg>
                </label>
                <div className="mt-36">
                  <Formik
                    enableReinitialize={true}
                    initialValues={{
                      name: userData?.name,
                      email: userData?.email,
                      company: userData?.company,
                      profilepic: userData?.profilepic,
                    }}
                    validationSchema={Yup.object().shape({
                      name: Yup.string().required("Required field"),
                      email: Yup.string().required("Required field"),
                      company: Yup.string().required("Required field"),
                      profilepic: Yup.mixed(),
                    })}
                    onSubmit={SubmitUserDetails}
                  >
                    <Form encType="multipart/form-data">
                      <div>
                        <input
                          type="file"
                          name="profilepic"
                          className="block border border-gray-200 rounded-md p-2 sr-only"
                          onChange={handleChange}
                          id="profilepic"
                        />
                        <ErrorMessage
                          component="label"
                          name="profilepic"
                          className="text-sm text-red-500"
                        />
                      </div>
                      <div>
                        <fieldset className="border border-gray-300 px-4 rounded-lg">
                          <legend className="text-sm px-1">Name</legend>
                          <Field
                            className="w-full focus:outline-none pb-2"
                            placeholder={"John Doe"}
                            name={"name"}
                            type="text"
                          />
                        </fieldset>
                        <ErrorMessage
                          component="label"
                          name="name"
                          className="text-sm text-red-500"
                        />
                      </div>

                      <div className="w-full flex justify-between items-center gap-4 mt-8">
                        <div className="w-6/12">
                          <fieldset className="border border-gray-300 px-4 rounded-lg">
                            <legend className="text-sm px-1">Email</legend>
                            <Field
                              className="w-full focus:outline-none pb-2"
                              placeholder={"JohnDoe@gmail.com"}
                              name={"email"}
                              type="text"
                            />
                          </fieldset>
                          <ErrorMessage
                            component="label"
                            name="email"
                            className="text-sm text-red-500"
                          />
                        </div>
                        <div className="w-6/12">
                          <fieldset className="border border-gray-300 px-4 rounded-lg">
                            <legend className="text-sm px-1">Company</legend>
                            <Field
                              className="w-full focus:outline-none pb-2"
                              placeholder={"The Thang bao"}
                              name={"company"}
                              type="text"
                            />
                          </fieldset>
                          <ErrorMessage
                            component="label"
                            name="company"
                            className="text-sm text-red-500"
                          />
                        </div>
                      </div>

                      <div className="flex justify-center items-center gap-12 mt-16">
                        <h1 className="bg-red-600 px-4 py-2 text-white rounded-md hover:bg-red-700 cursor-pointer">
                          Cancel
                        </h1>
                        <button
                          className="bg-green-600 px-4 py-2 text-white rounded-md hover:bg-green-900"
                          type="submit"
                        >
                          {loading ? <ButtonPreloader /> : "Submit"}
                        </button>
                      </div>
                    </Form>
                  </Formik>
                </div>
              </div>
            }
            tab2Tag={"Security"}
            tab2Display={
              <div className="h-screen">
                <Formik
                  // enableReinitialize={true}
                  initialValues={{
                    oldpassword: "",
                    newpassword: "",
                    confirmnewpassword: "",
                  }}
                  validationSchema={Yup.object().shape({
                    oldpassword: Yup.string().required("Required field"),
                    newpassword: Yup.string().required("Required field"),
                    confirmnewpassword: Yup.string().required("Required field"),
                  })}
                  onSubmit={updatePassword}
                >
                  <Form>
                    <div className="flex justify-between items-center gap-2 p-4 text-sm">
                      <div className="w-full">
                        <div className="mt-4">
                          <Field
                            className="p-2 border border-gray-300 rounded-lg focus:outline-none w-full"
                            placeholder={"Current Password"}
                            name={"oldpassword"}
                            type="password"
                          />
                          <ErrorMessage
                            component="label"
                            name="oldpassword"
                            className="text-sm text-red-500"
                          />
                        </div>
                        <div className="mt-4">
                          <Field
                            className="p-2 border border-gray-300 rounded-lg focus:outline-none w-full"
                            placeholder={"New Password"}
                            name={"newpassword"}
                            type="password"
                          />
                          <ErrorMessage
                            component="label"
                            name="newpassword"
                            className="text-sm text-red-500"
                          />
                        </div>
                        <div className="mt-4">
                          <Field
                            className="p-2 border border-gray-300 rounded-lg focus:outline-none w-full"
                            placeholder={"Confirm New Password"}
                            name={"confirmnewpassword"}
                            type="password"
                          />
                          <ErrorMessage
                            component="label"
                            name="newpassword"
                            className="text-sm text-red-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center items-center gap-12 mt-16">
                      <h1 className="bg-red-600 px-4 py-2 text-white rounded-md hover:bg-red-700 cursor-pointer">
                        Cancel
                      </h1>
                      <button
                        className="bg-green-600 px-4 py-2 text-white rounded-md hover:bg-green-900"
                        type="submit"
                      >
                        {loading ? <ButtonPreloader /> : "Submit"}
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            }
            tab3Tag={role === "admin" && "Manage Staffs"}
            tab3Display={
              role === "admin" && (
                <>
                  <div className="flex justify-end items-center gap-4">
                    <ReactPagination
                      pageCount={pageCount}
                      handlePageClick={handlePageClick}
                    />
                    <TotalNo
                      tablename={"Staffs"}
                      totalnumber={staffs?.length}
                    />
                  </div>
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-100 border-b border-b-gray-300 text-left">
                        <th className="p-2">S/N</th>
                        <th className="p-2">ID</th>
                        <th className="p-2">Staff Name</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Company</th>
                        <th className="p-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPosts.map((data, i) => {
                        return (
                          <>
                            {data?.role !== "admin" && (
                              <tr
                                className="text-base border-b border-b-gray-300"
                                key={i}
                              >
                                <td className="p-2">
                                  {i + 1 * (currentPage * postsPerPage - 9)}
                                </td>
                                <td className="p-2">{data?.uniqueid}</td>
                                <td className="p-2">{data?.name}</td>
                                <td className="p-2">{data?.email}</td>
                                <td className="p-2">{data?.company}</td>
                                <td className="p-2">
                                  <button
                                    onClick={() => {
                                      setDeleteModal(true),
                                        setDeleteId(data?._id);
                                    }}
                                    className="bg-red-600 text-sm text-white px-4 py-1 rounded-md hover:bg-red-700"
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            )}
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </>
              )
            }
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
            Delete Staff
          </h1>
          <p className="text-center mb-6 text-sm text-textgray">
            Are you sure you want to delete this <br /> Staff?
          </p>
          <form>
            <div className="flex justify-center items-center gap-12 mt-8">
              <h1
                onClick={() => setDeleteModal(false)}
                className="bg-red-600 px-4 py-2 text-white rounded-md hover:bg-red-700 cursor-pointer"
              >
                Cancel
              </h1>
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

export default Settings;
