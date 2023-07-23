import React from "react";
import { useState } from "react";
import pages from "../assets/pages.png";

function Footer() {
  const [openDocModal, setOpenDocModal] = useState(false);
  return (
    <>
      <div className="bg-white w-full px-12 py-4 flex flex-col lg:flex-row justify-between items-center text-sm">
        <h1 className="text-textdark font-semibold">Cong ty The Thang</h1>
        <div className="flex gap-4">
          <h1
            className="text-blue-900 font-semibold cursor-pointer"
            onClick={() => setOpenDocModal(true)}
          >
            Documentation
          </h1>
        </div>
      </div>
      <div
        className={`bg-white bg-opacity-60 absolute z-50 left-0 right-0 top-0 flex justify-center items-center h-screen ${
          openDocModal ? "flex" : "hidden"
        }`}
      >
        <div className="bg-white px-8 py-4 w-10/12 md:w-6/12 lg:w-5/12 xl:w-3/12 rounded-lg shadow shadow-xl">
          <h1 className="text-center text-xl font-semibold mb-2">
            Download Documentation
          </h1>
          <p className="text-center mb-4 text-sm text-textgray">
            Are you sure you want to download <br /> documentation
          </p>
          <form>
            <div className="flex justify-center items-center gap-12 mt-4">
              <h1
                className="bg-red-600 px-4 py-2 text-white hover:bg-red-700 cursor-pointer shadow-xl text-sm"
                onClick={() => setOpenDocModal(false)}
              >
                Cancel
              </h1>
              <a
                href={pages}
                download="Documentation"
                className="bg-green-600 px-4 py-2 text-white hover:bg-green-900 text-sm cursor-pointer"
              >
                Download
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Footer;
