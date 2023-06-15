import React, { useState } from "react";
import filepic from "../../assets/Vector (7).png";
import filepluspic from "../../assets/Vector (12).png";
import sort from "../../assets/sort.png";
import exportpic from "../../assets/Vector (9).png";
import chartArrow from "../../assets/Vector (10).png";
import computer from "../../assets/Vector (11).png";
import search from "../../assets/search.png";
import filter from "../../assets/Vector (24).png";
import addPage from "../../assets/add-page.png";
import exportCylinders from "../../assets/database-export.png";
import { NavLink, Navigate, useNavigate, useLocation } from "react-router-dom";
import DefaultLayout from "../../components/DefaultLayout";
import FourTabs from "../../components/FourTabs";
import Table from "../../components/Table";
import clipBoard from "../../assets/paste-clipboard.png";
import folder from "../../assets/Vector (7).png";
import page from "../../assets/page.png";
import cancel from "../../assets/cancel.png";
import deleteCircle from "../../assets/delete-circle.png";
import Input from "../../components/Input";

function TestManagement() {
  // Getting Query From URL
  let search = useLocation().search;
  const folderId = new URLSearchParams(search).get("folder");
  const [openAddCaseModal, setopenAddCaseModal] = useState(false);
  const [openAddTestCaseModal, setopenAddTestCaseModal] = useState(false);
  const [importExport, setImportExport] = useState(false);
  const [afterImportExport, setAfterImportExport] = useState(false);
  const [testCaseTable, setTestCaseTable] = useState({
    tablename: "",
    description: "",
    date: "",
    precondition: "",
    version: "",
    assignedfolderId: folderId,
  });

  function handleChange(e) {
    setTestCaseTable((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/testenvironment", {
        tablename: testCaseTable?.tablename,
        description: testCaseTable?.description,
        date: testCaseTable?.date,
        precondition: testCaseTable?.precondition,
        version: testCaseTable?.version,
        assignedfolderId: testCaseTable?.assignedfolderId,
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
  return (
    <>
      <DefaultLayout>
        <div className="p-4 lg:h-screen">
          {/* ==================BreadCrumb=================== */}
          <div className="flex items-center gap-2 mb-4">
            <h1 className="text-sm flex items-center gap-1">
              <img src={clipBoard} /> Test Execution/{" "}
            </h1>
            <h1 className="text-sm flex items-center gap-1">
              <img src={folder} className="w-4 bg-gray-300" /> Folder 1/{" "}
            </h1>
            <h1 className="text-sm flex items-center gap-1">
              <img src={page} /> File 1
            </h1>
          </div>
          {/* ========Table Functions========= */}
          <div className="bg-white">
            <div className="flex justify-between items-center">
              <div className="w-9/12">
                <form>
                  {/* <img src={search} /> */}
                  <input
                    type="search"
                    className="px-4 py-2 rounded-md border border-gray-300 w-full focus:outline-none"
                    placeholder="Search"
                  />
                </form>
              </div>
              <div className="flex items-center">
                <div className="border border-gray-300 p-2 rounded-tl-lg rounded-bl-lg">
                  <img
                    src={addPage}
                    onClick={() => setopenAddCaseModal(true)}
                  />
                </div>
                <div className="border border-gray-300 p-2">
                  <img src={sort} />
                </div>
                <div
                  className="border border-gray-300 p-2"
                  style={{ padding: "10px" }}
                >
                  <img src={filter} />
                </div>
                <div className="border border-gray-300 p-2 rounded-tr-lg rounded-br-lg">
                  <img
                    src={exportCylinders}
                    onClick={() =>
                      importExport === true
                        ? setImportExport(false)
                        : setImportExport(true)
                    }
                  />
                  <div
                    className={`bg-gray-200 rounded-xl shadow shadow-lg text-sm text-center fixed right-8 w-32  ${
                      importExport ? "block" : "hidden"
                    }`}
                  >
                    <div className="border-b border-b-gray-300 p-2">
                      <button
                        onClick={() => {
                          setAfterImportExport(true);
                        }}
                      >
                        Import
                      </button>
                    </div>
                    <div>
                      <button className="p-2">Export</button>
                    </div>
                  </div>

                  <div
                    className={`bg-white rounded-md shadow shadow-xl text-sm text-center fixed right-8 p-4 ${
                      afterImportExport ? "block" : "hidden"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-8">
                      <h1 className="text-lg font-semibold text-gray-500">
                        Export
                      </h1>
                      <button>
                        <img
                          src={cancel}
                          onClick={() => {
                            setAfterImportExport(false), setImportExport(false);
                          }}
                        />
                      </button>
                    </div>
                    <button className="flex items-center gap-2 text-lg font-semibold px-20 py-1 border-2 border-gray-500 text-gray-500 rounded-sm">
                      SVG <img src={deleteCircle} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =========Main Table======== */}
          <FourTabs
            tab1Tag="File 1"
            tab1Display={<Table />}
            tab2Tag="File 2"
            tab2Display={<Table />}
            tab3Tag="File 3"
            tab3Display={<Table />}
            tab4Tag="File 4"
            tab4Display={<Table />}
            testCaseTableFunction={() => setopenAddTestCaseModal(true)}
          />
        </div>
      </DefaultLayout>
      {/* ==========Add Case=========== */}
      <div
        className={`bg-black bg-opacity-70 absolute z-50 left-0 right-0 top-0 flex justify-center items-center h-screen ${
          openAddCaseModal ? "flex" : "hidden"
        }`}
      >
        <div className="bg-white p-8 w-6/12 rounded-md">
          <h1 className="text-center text-2xl font-semibold mb-2">Add Case</h1>
          <p className="text-center mb-6 text-sm">
            Provide data with this form to create your app.
          </p>
          <form>
            <div className="flex justify-between items-center gap-6">
              <div className="w-8/12">
                <div className="mt-4">
                  <label className="font-semibold">Title</label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 border border-gray-300 px-4 py-1 rounded-md"
                  />
                </div>

                <div className="mt-4">
                  <label className="font-semibold">Category</label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 border border-gray-300 px-4 py-1 rounded-md"
                  />
                </div>

                <div className="mt-4">
                  <label className="font-semibold">Expectation</label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 border border-gray-300 px-4 py-1 rounded-md"
                  />
                </div>

                <div className="mt-4">
                  <label className="font-semibold">Precondition</label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 border border-gray-300 px-4 py-1 rounded-md"
                  />
                </div>
              </div>
              <div className="w-4/12">
                <div className="mt-4">
                  <label className="font-semibold">Status</label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 border border-gray-300 px-4 py-1 rounded-md"
                  />
                </div>

                <div className="mt-4">
                  <label className="font-semibold">Precondition</label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 border border-gray-300 px-4 py-1 rounded-md"
                  />
                </div>

                <div className="mt-4">
                  <label className="font-semibold">Priority</label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 border border-gray-300 px-4 py-1 rounded-md"
                  />
                </div>

                <div className="mt-4">
                  <label className="font-semibold">Assigned</label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 border border-gray-300 px-4 py-1 rounded-md"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center gap-12 mt-8">
              <button
                onClick={() => setopenAddCaseModal(false)}
                className="bg-red-600 px-4 py-2 text-white rounded-md hover:bg-red-700"
              >
                Cancel
              </button>
              <button className="bg-green-600 px-4 py-2 text-white rounded-md hover:bg-green-900">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* =========Add Test Case Table=========== */}
      <div
        className={`bg-black bg-opacity-70 absolute z-50 left-0 right-0 top-0 flex justify-center items-center h-screen ${
          openAddTestCaseModal ? "flex" : "hidden"
        }`}
      >
        <div className="bg-white p-8 w-6/12 rounded-md">
          <h1 className="text-center text-2xl font-semibold mb-2">
            Add TestCase Table
          </h1>
          <p className="text-center mb-6 text-sm">
            Provide data with this form to create your app.
          </p>
          <form>
            <div className="flex justify-between gap-6">
              <div className="w-8/12">
                <div>
                  <Input label={"Name"} type="text" />
                  <p className="text-gray-400 text-sm">
                    set the name of testcase table
                  </p>
                </div>

                <div className="mt-4">
                  <label className="font-semibold">Description</label>
                  <textarea
                    className="block bg-gray-50 border border-gray-200 rounded-md p-2 w-full mt"
                    rows="4"
                  ></textarea>
                  <p className="text-gray-400 text-sm">
                    Describe your variable
                  </p>
                </div>

                <div>
                  <label className="font-semibold">Attachments</label>
                  <input
                    type="text"
                    className="block bg-gray-50 border border-gray-200 rounded-md p-2 w-full mt"
                  />
                  <p className="text-gray-400 text-sm">
                    Drop files here to attack (only CSV file)
                  </p>
                </div>
              </div>
              <div className="w-4/12">
                <div className="">
                  <label className="font-semibold">Date</label>
                  <input
                    type="date"
                    className="w-full bg-gray-50 border border-gray-300 px-4 py-1 rounded-md"
                  />
                </div>

                <div className="mt-4">
                  <label className="font-semibold">Precondition</label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 border border-gray-300 px-4 py-1 rounded-md"
                  />
                </div>

                <div className="mt-4">
                  <label className="font-semibold">Version</label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 border border-gray-300 px-4 py-1 rounded-md"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center gap-12 mt-8">
              <button
                onClick={() => setopenAddTestCaseModal(false)}
                className="bg-red-600 px-4 py-2 text-white rounded-md hover:bg-red-700"
              >
                Cancel
              </button>
              <button className="bg-green-600 px-4 py-2 text-white rounded-md hover:bg-green-900">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default TestManagement;
