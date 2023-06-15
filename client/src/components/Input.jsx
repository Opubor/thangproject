import React from "react";

function Input({
  placeholder,
  onChange,
  type,
  name,
  id,
  defaultValue,
  onchange,
  defaultChecked,
  label,
}) {
  return (
    <div className="mt-4">
      <label className="font-semibold">{label}</label>
      <input
        placeholder={placeholder}
        className="block bg-gray-50 border border-gray-200 rounded-md p-2 w-full mt"
        type={type}
        name={name}
        id={id}
        defaultValue={defaultValue}
        onChange={onchange}
        defaultChecked={defaultChecked}
      />
    </div>
  );
}

export default Input;
