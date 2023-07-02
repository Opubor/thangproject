import React from "react";
import clipBoard from "../assets/paste-clipboard.png";
import folder from "../assets/Vector (7).png";
import page from "../assets/page.png";

function BreadCrumb({ pageName, currentFolder, currentTable }) {
  return (
    <div className="flex items-center gap-2 mb-4 mt-4">
      <h1 className="text-sm flex items-center gap-1">
        <img src={clipBoard} /> {pageName}/{" "}
      </h1>
      <h1 className="text-sm flex items-center gap-1">
        <img src={folder} className="w-4 bg-gray-300" /> {currentFolder}/{" "}
      </h1>
      <h1 className="text-sm flex items-center gap-1">
        <img src={page} /> {currentTable}
      </h1>
    </div>
  );
}

export default BreadCrumb;
