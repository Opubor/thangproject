import React from "react";
import dotsIcon from "../../assets/Vector (21).png";
import deleteIcon from "../../assets/delete-circle.png";
import leftArrow from "../../assets/Vector (16).png";
import rightArrow from "../../assets/Vector (17).png";
import arrowdown from "../../assets/arrowdown.png";

function Table({ title }) {
  return (
    <>
      <table className="w-full">
        <thead className="bg-gray-100 border-b border-b-gray-300 text-left">
          <th className="flex items-center px-2">
            <input type="checkbox" className="w-4" />
            <p className="font-semibold m-2">ID</p>
          </th>
          <th>
            <p className="font-semibold border-l-2 border-l-gray-400 border-r-2 border-r-gray-400 mx-2 px-2">
              Title
            </p>
          </th>
          <th>
            <p className="font-semibold border-r-2 border-r-gray-400 m-2">
              Category
            </p>
          </th>
          <th>
            <p className="font-semibold border-r-2 border-r-gray-400 m-2">
              Priority
            </p>
          </th>
          <th>
            <p className="font-semibold border-r-2 border-r-gray-400 m-2">
              Assiged To
            </p>
          </th>
          <th className="w-4">
            <p>
              <img src={dotsIcon} />
            </p>
          </th>
        </thead>

        <tbody>
          <tr className="text-sm font-semibold">
            <td className="flex justify-start items-center gap-2 py-4 px-2">
              <input type="checkbox" className="w-4" />
              <p className="font-semibold">{title}</p>
            </td>
            <td>
              <p className="border-l-2 border-l-gray-400 border-r-2 border-r-gray-400 mx-2 px-2">
                Login page loads from homepage
              </p>
            </td>
            <td>
              <p className="font-semibold border-r-2 border-r-gray-400 m-2">
                Playwright
              </p>
            </td>
            <td>
              <div className="border-r-2 border-r-gray-400 m-2">
                <button className="px-8 py-1 bg-red-500 rounded-full text-white w-32 ">
                  High
                </button>
              </div>
            </td>
            <td className="flex justify-between items-center m-2">
              <p className="font-semibold">The Thang Bao</p>
              <img src={dotsIcon} />
            </td>
            <td className="w-4">
              <p>
                <img src={deleteIcon} />
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-end items-center gap-4 my-6">
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
    </>
  );
}

export default Table;
