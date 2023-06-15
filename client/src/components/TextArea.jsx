import React from "react";

function TextArea({ label, placeholder, name, id, defaultValue, onchange }) {
  return (
    <div className="mt-4">
      <label className="font-semibold">{label}</label>
      <textarea
        className="block border border-gray-200 rounded-md p-2 w-full mt"
        rows="4"
        placeholder={placeholder}
        name={name}
        id={id}
        defaultValue={defaultValue}
        onChange={onchange}
      ></textarea>
    </div>
  );
}

export default TextArea;
