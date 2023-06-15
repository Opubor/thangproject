import React from "react";

function TotalNo({ totalnumber }) {
  return (
    <p className="text-base">
      Total:{" "}
      <span className="px-2 text-black dark:text-white rounded-xl">
        {totalnumber}
      </span>
    </p>
  );
}

export default TotalNo;
