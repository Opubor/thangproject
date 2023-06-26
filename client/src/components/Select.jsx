import React from "react";

function Select({ name, type, label, onchange, children }) {
  return (
    <div className="mt-4">
      <label className="font-semibold">{label}</label>
      <select
        className="block bg-gray-50 border border-gray-200 rounded-md p-2 w-full mt"
        name={name}
        type={type}
        onChange={onchange}
      >
        {children}
      </select>
    </div>
  );
}

export default Select;
