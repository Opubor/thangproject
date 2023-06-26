import React, { useState } from "react";
import filter from "../../assets/Vector (24).png";
import addPage from "../../assets/add-page.png";
import sort from "../../assets/sort.png";
import exportCylinders from "../../assets/database-export.png";
import cancel from "../../assets/cancel.png";
import deleteCircle from "../../assets/delete-circle.png";

function TableFunctions({ search, setopenAddCaseModal }) {
  const [importExport, setImportExport] = useState(false);
  const [afterImportExport, setAfterImportExport] = useState(false);

  return (
    <div className="bg-white">
      <div className="flex justify-between items-center">
        <div className="w-9/12">{search}</div>

        <div className="flex items-center">
          <div className="border border-gray-300 p-2 rounded-tl-lg rounded-bl-lg cursor-pointer hover:bg-gray-100">
            <img src={addPage} onClick={setopenAddCaseModal} />
          </div>
          <div className="border border-gray-300 p-2 cursor-pointer hover:bg-gray-100">
            <img src={sort} />
          </div>
          <div
            className="border border-gray-300 p-2 cursor-pointer hover:bg-gray-100"
            style={{ padding: "10px" }}
          >
            <img src={filter} />
          </div>
          <div className="border border-gray-300 p-2 rounded-tr-lg rounded-br-lg cursor-pointer hover:bg-gray-100">
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
                <h1 className="text-lg font-semibold text-gray-500">Export</h1>
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
  );
}

export default TableFunctions;
