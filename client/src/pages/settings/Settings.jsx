import React from "react";
import DefaultLayout from "../../components/DefaultLayout";
import Tabs from "../../components/Tabs";
import avatar from "../../assets/avatar (1).png";

function Settings() {
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
                <form>
                  <div>
                    <fieldset className="border border-gray-300 px-4 rounded-lg">
                      <legend className="text-sm px-1">Name</legend>
                      <input
                        className="w-full focus:outline-none pb-2"
                        type="text"
                        placeholder="John Doe"
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
                        />
                      </fieldset>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-12 mt-16">
                    <button className="bg-red-600 px-4 py-2 text-white rounded-md hover:bg-red-700">
                      Cancel
                    </button>
                    <button className="bg-green-600 px-4 py-2 text-white rounded-md hover:bg-green-900">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          }
          tab2Tag={"Security"}
          tab2Display={
            <div className="h-screen">
              <form>
                <div className="flex justify-between items-center gap-2 p-4 text-sm">
                  <div className="w-full">
                    <div className="mt-4">
                      <input
                        placeholder="Current Password"
                        type="password"
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none w-full"
                      />
                    </div>
                    <div className="mt-4">
                      <input
                        placeholder="New Password"
                        type="password"
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none w-full"
                      />
                    </div>
                    <div className="mt-4">
                      <input
                        placeholder="Confirm New Password"
                        type="password"
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end px-4 items-center gap-8 mt-4 mb-4 text-sm">
                  <button className="bg-red-600 px-4 py-2 text-white hover:bg-red-700 rounded-sm">
                    Cancel
                  </button>
                  <button className="bg-green-600 px-4 py-2 text-white hover:bg-green-900 rounded-sm">
                    Submit
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
