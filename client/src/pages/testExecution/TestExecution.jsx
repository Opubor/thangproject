import React from "react";
import DefaultLayout from "../../components/DefaultLayout";
import pieChart from "../../assets/Group 26942.png";
import pieChartDetails from "../../assets/Group 1000004469.png";
import clipBoard from "../../assets/paste-clipboard.png";
import folder from "../../assets/Vector (7).png";
import dots from "../../assets/Vector (21).png";
import editpenblack from "../../assets/editpenblack.png";
import page from "../../assets/page.png";

function TestExecution() {
  return (
    <DefaultLayout>
      <div className="xl:flex justify-center gap-6 p-4 pt-8 xl:pt-4">
        <div className="w-full xl:w-6/12">
          {/* ==================BreadCrumb=================== */}
          <div className="flex items-center gap-2">
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
          {/* ==============Pie-Chart============== */}
          <div className="mt-8 py-6 border-2 border-gray-50 shadow shadow-md rounded-lg">
            <div className="flex justify-between items-center px-8">
              <h1 className="text-xl font-bold text-textdark">Pie Chart</h1>
              <img src={dots} />
            </div>
            <div className="flex justify-center items-center gap-6 ">
              <div>
                <img src={pieChart} />
              </div>
              <div>
                <img src={pieChartDetails} />
              </div>
            </div>
          </div>

          {/* ==============Files============== */}
          <div className="mt-6">
            <div className="flex justify-between items-center gap-2">
              <div className="w-full">
                <form>
                  <select className="w-full p-2 bg-gray-100">
                    <option className="p-2">File 1</option>
                    <option className="p-2">File 2</option>
                    <option className="p-2">File 3</option>
                    <option className="p-2">File 4</option>
                  </select>
                  {/* <input
                    type="search"
                    placeholder="File 1"
                    className="border w-full p-2"
                  /> */}
                </form>
              </div>
            </div>
            <div>
              <table className="w-full mt-4">
                <thead className="bg-gray-200 text-left">
                  <th className="flex justify-start items-center py-4 px-2">
                    <input type="checkbox" className="w-4" />
                    <p className="font-semibold">ID</p>
                  </th>
                  <th className="font-semibold text-textdark">Title</th>
                  <th className="font-semibold text-textdark">Status</th>
                </thead>
                <tbody>
                  <tr className="border-b border-b-gray-300">
                    <td className="flex justify-start items-center gap-2 py-4">
                      <input type="checkbox" className="w-4" />
                      <p className="font-semibold">FILE1-1</p>
                    </td>
                    <td className="font-semibold text-gray-700">
                      test_sum-two_decimals
                    </td>
                    <td>
                      <button className="bg-red-600 px-4 py-1 text-white rounded-md w-24 w-24">
                        False
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-b-gray-300">
                    <td className="flex justify-start items-center gap-2 py-4">
                      <input type="checkbox" className="w-4" />
                      <p className="font-semibold">FILE1-2</p>
                    </td>
                    <td className="font-semibold text-gray-700">
                      test_sum-two_decimals
                    </td>
                    <td>
                      <button className="bg-green-600 px-4 py-1 text-white rounded-md w-24">
                        Pass
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-b-gray-300">
                    <td className="flex justify-start items-center gap-2 py-4">
                      <input type="checkbox" className="w-4" />
                      <p className="font-semibold">FILE1-3</p>
                    </td>
                    <td className="font-semibold text-gray-700">
                      test_sum-two_decimals
                    </td>
                    <td>
                      <button className="bg-gray-500 px-4 py-1 text-white rounded-md w-24">
                        Cancel
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-b-gray-300">
                    <td className="flex justify-start items-center gap-2 py-4">
                      <input type="checkbox" className="w-4" />
                      <p className="font-semibold">FILE1-4</p>
                    </td>
                    <td className="font-semibold text-gray-700">
                      test_sum-two_decimals
                    </td>
                    <td>
                      <button className="bg-blue-400 px-4 py-1 text-white rounded-md w-24">
                        Block
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-b-gray-300">
                    <td className="flex justify-start items-center gap-2 py-4">
                      <input type="checkbox" className="w-4" />
                      <p className="font-semibold">FILE1-5</p>
                    </td>
                    <td className="font-semibold text-gray-700">
                      test_sum-two_decimals
                    </td>
                    <td>
                      <button className="bg-white text-gray-500 border-2 border-gray-500 px-4 py-1 rounded-md w-24">
                        Blank
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ===============File-Details=========== */}
        <div className="px-6 py-8 w-full xl:w-6/12">
          <div className="flex justify-between items-center text-xl font-semibold">
            <div className="flex justify-center items-center gap-4 text-xl text-textdark">
              <p className="text-2xl">{"<"}</p>
              <h1 className="flex items-center gap-2">
                File 1{" "}
                <img
                  src={editpenblack}
                  className="border-b-2 border-b-gray-500"
                />
              </h1>
            </div>
            <p>x</p>
          </div>

          <div className="border-b border-b-gray-400 flex justify-between items-center p-2 mt-8 text-sm">
            <h1 className="w-6/12">ID</h1>
            <h2 className="w-6/12 border border-gray-400 px-2 py">FILE1-1</h2>
          </div>

          <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
            <h1 className="w-6/12">Category</h1>
            <h2 className="w-6/12 border border-gray-400 px-2 py">Common</h2>
          </div>

          <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
            <h1 className="w-6/12">Title</h1>
            <h2 className="w-6/12 border border-gray-400 px-2 py">
              Verify the system will redirect to the "Add Agent pool" Screen
              after using Agent pool before
            </h2>
          </div>

          <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
            <h1 className="w-6/12">Priority</h1>
            <div className="w-6/12 px-2 py">
              <button className="bg-red-500 px-8 text-white py rounded-full">
                High
              </button>
            </div>
          </div>

          <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
            <h1 className="w-6/12">Precondition</h1>
            <h2 className="w-6/12 border border-gray-400 px-2 py">
              Window - Chrome
            </h2>
          </div>

          <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
            <h1 className="w-6/12">Test Step</h1>
            <div className="w-6/12 border border-gray-400 px-2 py">
              <ol>
                <li>1. Login</li>
                <li>2. Create new project</li>
                <li>3. Click runtime engine</li>
                <li>4. Click agent pools (left menu)</li>
              </ol>
            </div>
          </div>

          <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
            <h1 className="w-6/12">Expectation</h1>
            <h2 className="w-6/12 border border-gray-400 px-2 py">
              Don't have any agent
            </h2>
          </div>

          <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
            <h1 className="w-6/12">Status Case</h1>
            <div className="w-6/12 px-2 py">
              <button className="bg-red-500 px-8 text-white py rounded-full">
                False
              </button>
            </div>
          </div>

          <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
            <h1 className="w-6/12">Results</h1>
            <h2 className="w-6/12 border border-gray-400 px-2 py">
              There is no top-down redirect to the "Add Agent pool" Screen after
            </h2>
          </div>

          <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
            <h1 className="w-6/12">Description</h1>
            <h2 className="w-6/12 border border-gray-400 px-2 py">
              Just list all agents verify the system will redirect to the "Add
              Agent pool" Screen after using Agent pool before
            </h2>
          </div>

          <div className="border-b border-b-gray-400 flex justify-between items-center p-2 text-sm">
            <h1 className="w-6/12">Assigned</h1>
            <h2 className="w-6/12 border border-gray-400 px-2 py">
              The Thang Bao
            </h2>
          </div>

          <div className="flex justify-end items-center gap-12 mt-4 text-sm">
            <button className="bg-red-600 px-4 py-2 text-white rounded-sm hover:bg-red-700">
              Cancel
            </button>
            <button className="bg-green-600 px-4 py-2 text-white rounded-sm hover:bg-green-900">
              Submit
            </button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default TestExecution;
