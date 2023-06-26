import React from "react";

function Thead({ children }) {
  return (
    <thead className="bg-gray-100 border-b border-b-gray-300 text-left">
      <tr>{children}</tr>
    </thead>
  );
}

export default Thead;
