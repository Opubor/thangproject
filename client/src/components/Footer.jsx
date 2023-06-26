import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-white w-full px-12 py-4 flex flex-col lg:flex-row justify-between items-center text-sm">
      <h1 className="text-textdark font-semibold">Cong ty The Thang</h1>
      <div className="flex gap-4">
        <Link className="text-blue-900 font-semibold">License</Link>
        <Link className="text-blue-900 font-semibold">Documentation</Link>
        <Link className="text-blue-900 font-semibold">Support</Link>
      </div>
    </div>
  );
}

export default Footer;
