import React from "react";

function TotalNo({ totalnumber, tablename }) {
  return (
    <p className="text-base">
      Total number of <span className="font-semibold">{tablename}</span>:
      <span className="px-2 text-black dark:text-white rounded-xl font-semibold text-md">
        {totalnumber}
      </span>
    </p>
  );
}

export default TotalNo;
