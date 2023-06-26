import React, { useContext, useEffect, useState } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import Tabs from "../../components/Tabs";
import avatar from "../../assets/avatar (1).png";
import { loginContext } from "../../context/auth";
import axios from "../../sevices/axios";
import { toast } from "react-toastify";
import ButtonPreloader from "../../components/ButtonPreloader";

function Settings() {
  const { logout, loggedIn, user } = useContext(loginContext);
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    company: "",
  });

  function handleChange(e) {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const id = user?._id;
  // To Get Current Details
  useEffect(() => {
    axios.get(`/staff/?edit=${id}`).then((response) => {
      setUserData(response.data);
    });
  }, []);

  // To Update Settings
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(`/staff/${id}`, {
        name: userData?.name,
        email: userData?.email,
        company: userData?.company,
      })
      .then(() => {
        setLoading(false), window.location.reload(true), { replace: true };
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data);
      });
  };

  const [resetPassword, setResetPassword] = useState({
    oldpassword: "",
    newpassword: "",
    confirmnewpassword: "",
  });
  function handlePasswordReset(e) {
    setResetPassword((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  // updatePassword
  const updatePassword = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(`/updatepassword/${id}`, {
        oldpassword: resetPassword?.oldpassword,
        newpassword: resetPassword?.newpassword,
        confirmnewpassword: resetPassword?.confirmnewpassword,
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
  };

  return (
    <DefaultLayout>
      <div className="">
        <Tabs
          tab1Tag={"Account"}
          tab1Display={
            <div className="p-4 h-screen">
              <div>
                <img src={avatar} alt="Profile Pic" className="w-32 h-32" />
              </div>
              <div className="mt-4">
                <form onSubmit={handleSubmit}>
                  <div>
                    <fieldset className="border border-gray-300 px-4 rounded-lg">
                      <legend className="text-sm px-1">Name</legend>
                      <input
                        className="w-full focus:outline-none pb-2"
                        type="text"
                        placeholder="John Doe"
                        name="name"
                        defaultValue={userData?.name}
                        onChange={handleChange}
                      />
                    </fieldset>
                  </div>
                  <div className="w-full flex justify-between items-center gap-4 mt-8">
                    <div className="w-6/12">
                      <fieldset className="border border-gray-300 px-4 rounded-lg">
                        <legend className="text-sm px-1">Email</legend>
                        <input
                          className="w-full focus:outline-none pb-2"
                          type="text"
                          placeholder="JohnDoe@gmail.com"
                          name="email"
                          defaultValue={userData?.email}
                          onChange={handleChange}
                        />
                      </fieldset>
                    </div>
                    <div className="w-6/12">
                      <fieldset className="border border-gray-300 px-4 rounded-lg">
                        <legend className="text-sm px-1">Company</legend>
                        <input
                          className="w-full focus:outline-none pb-2"
                          type="text"
                          placeholder="The Thang bao"
                          name="company"
                          defaultValue={userData?.company}
                          onChange={handleChange}
                        />
                      </fieldset>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-12 mt-16">
                    <button className="bg-red-600 px-4 py-2 text-white rounded-md hover:bg-red-700">
                      Cancel
                    </button>
                    <button className="bg-green-600 px-4 py-2 text-white rounded-md hover:bg-green-900">
                      {loading ? <ButtonPreloader /> : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          }
          tab2Tag={"Security"}
          tab2Display={
            <div className="h-screen">
              <form onSubmit={updatePassword}>
                <div className="flex justify-between items-center gap-2 p-4 text-sm">
                  <div className="w-full">
                    <div className="mt-4">
                      <input
                        placeholder="Current Password"
                        type="password"
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none w-full"
                        name="oldpassword"
                        onChange={handlePasswordReset}
                      />
                    </div>
                    <div className="mt-4">
                      <input
                        placeholder="New Password"
                        type="password"
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none w-full"
                        name="newpassword"
                        onChange={handlePasswordReset}
                      />
                    </div>
                    <div className="mt-4">
                      <input
                        placeholder="Confirm New Password"
                        type="password"
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none w-full"
                        name="confirmnewpassword"
                        onChange={handlePasswordReset}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end px-4 items-center gap-8 mt-4 mb-4 text-sm">
                  <button className="bg-red-600 px-4 py-2 text-white hover:bg-red-700 rounded-sm">
                    Cancel
                  </button>
                  <button className="bg-green-600 px-4 py-2 text-white hover:bg-green-900 rounded-sm">
                    {loading ? <ButtonPreloader /> : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          }
        />
      </div>
    </DefaultLayout>
  );
}

export default Settings;
