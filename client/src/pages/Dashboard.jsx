import React, { useState } from "react";
import leftArrow from "../assets/Vector (16).png";
import rightArrow from "../assets/Vector (17).png";
import arrowdown from "../assets/arrowdown.png";
import baseStep from "../assets/BaseStep.png";
import baseStep2 from "../assets/Base Step Elements (1).png";
import ColumnChart from "../assets/Group 1000004321.png";
import pieChart from "../assets/Group 26942.png";
import pieChartDetails from "../assets/Group 1000004342.png";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";

function Dashboard() {
  return (
    <DefaultLayout>
      {/* ==========Body========= */}
      {/* =========Dashboard Cards============ */}
      <div className="bg-white px-4 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
          <div className="w-full flex-col justify-center items-center w-4/12 bg-themegray py-6 rounded-xl shadow shadow-md">
            <div className="flex justify-center items-center gap-4">
              <img src={baseStep} className="bg-blue-900 rounded-lg" />
              <h2 className="text-3xl text-textdark font-bold">1245</h2>
            </div>
            <div className="text-center">
              <h1 className="text-sm text-textdark">Number of Testcase</h1>
            </div>
          </div>

          <div className="w-full flex-col justify-center items-center w-4/12 bg-themegray py-6 rounded-xl shadow shadow-md">
            <div className="flex justify-center items-center gap-4">
              <img src={baseStep2} className="bg-green-600 rounded-lg" />
              <h2 className="text-3xl text-textdark font-bold">1245</h2>
            </div>
            <div className="text-center">
              <h1 className="text-sm text-textdark">Number of Folder</h1>
            </div>
          </div>

          <div className="w-full flex-col justify-center items-center w-4/12 bg-themegray py-6 rounded-xl shadow shadow-md">
            <div className="flex justify-center items-center gap-4">
              <img src={baseStep} className="bg-orange-400 rounded-lg" />
              <h2 className="text-3xl text-textdark font-bold">1245</h2>
            </div>
            <div className="text-center">
              <h1 className="text-sm text-textdark">Number of Case</h1>
            </div>
          </div>
        </div>
      </div>

      {/* ===============Column Chart/ Most testcase have fail cases============= */}
      <div className="bg-white mt-8 flex flex-col justify-between lg:flex-row gap-4 px-4">
        {/* ==========Column Chart========== */}
        <div className="w-full lg:w-8/12 p-4 h-80">
          <h1 className="font-semibold text-xl mb-4">
            Total of status case pass/fail
          </h1>
          <img src={ColumnChart} />
        </div>
        {/* ======== Most testcase have fail cases========== */}
        <div className="w-full lg:w-4/12 rounded-3xl border-2 p-6">
          <h1 className="text-center mb-8 font-semibold">
            Most testcase have fail cases
          </h1>
          <div className="flex justify-between items-center border-b border-b-gray-300 px-8 mt-4 text-sm py-2">
            <h1 className="text-darkblue font-semibold w-full">File</h1>
            <h2 className="text-darkblue font-semibold w-full">
              Number of case fail
            </h2>
          </div>
          <div className="flex justify-between items-center border-b border-b-gray-300 px-8 mt-4 text-sm py-2">
            <h1 className="text-textdark font-semibold w-full">File 1</h1>
            <h2 className="text-textdark font-semibold w-full">200</h2>
          </div>
          <div className="flex justify-between items-center border-b border-b-gray-300 px-8 mt-4 text-sm py-2">
            <h1 className="text-textdark font-semibold w-full">File 5</h1>
            <h2 className="text-textdark font-semibold w-full">150</h2>
          </div>
          <div className="flex justify-between items-center border-b border-b-gray-300 px-8 mt-4 text-sm py-2">
            <h1 className="text-textdark font-semibold w-full">File 7</h1>
            <h2 className="text-textdark font-semibold w-full">100</h2>
          </div>
          <div className="flex justify-between items-center border-b border-b-gray-300 px-8 mt-4 text-sm py-2">
            <h1 className="text-textdark font-semibold w-full">File 13</h1>
            <h2 className="text-textdark font-semibold w-full">10</h2>
          </div>
        </div>
      </div>

      {/* ===============Test Repository Details/Total of status case============= */}
      <div className="bg-white mt-8 flex flex-col lg:flex-row justify-between gap-4 pb-8 px-4">
        {/* ==========Test Repository Details========== */}
        <div className="w-full lg:w-8/12 p-4 h-80">
          <h1 className="font-semibold text-xl">Test Repository Details</h1>
          <table className="w-full text-left mt-6">
            <thead className="border-b-2">
              <tr>
                <th className="font-semibold px-4 py-2">Folder</th>
                <th className="font-semibold px-4 py-2">File</th>
                <th className="font-semibold px-4 py-2">Testcase</th>
              </tr>
            </thead>
            <tbody className="odd:bg-gray-100">
              <tr className="border-b-2 hover:bg-gray-100">
                <td className="p-4">Folder 1</td>
                <td className="p-4">1</td>
                <td className="p-4">1024</td>
              </tr>
              <tr className="border-b-2 bg-gray-100">
                <td className="p-4">Folder 2</td>
                <td className="p-4">7</td>
                <td className="p-4">567</td>
              </tr>
              <tr className="border-b-2">
                <td className="p-4">Folder 3</td>
                <td className="p-4">7</td>
                <td className="p-4">456</td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-end items-center gap-4 mt-2">
            <div className="flex justify-center items-center gap-2">
              <h1>Rows per page: 10</h1>
              <img src={arrowdown} />
            </div>
            <h2>1-5 of 13</h2>
            <div className="flex items-center gap-2">
              <img src={leftArrow} />
              <img src={rightArrow} />
            </div>
          </div>
        </div>
        {/* ========Total of status case========== */}
        <div className="w-full lg:w-4/12 rounded-3xl border-2 p-6">
          <h1 className="text-xl mb-8 font-bold">Total of status case</h1>
          <div className="flex justify-between items-center">
            <img src={pieChart} />
            <img src={pieChartDetails} />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Dashboard;
