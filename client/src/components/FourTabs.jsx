import React, { useState } from "react";
import { Link } from "react-router-dom";
import pages from "../assets/pages.png";
import multiple from "../assets/multiple-pages-add.png";

const FourTabs = ({
  tab1Display,
  tab1Tag,
  tab2Display,
  tab2Tag,
  tab3Display,
  tab3Tag,
  tab4Display,
  tab4Tag,
  testCaseTableFunction,
}) => {
  const [openTab, setOpenTab] = useState(1);

  const activeClasses =
    "border-b-2 border-b-blue-700 text-blue-700 font-semibold";
  const inactiveClasses = "text-textgray";

  const tabs = [
    {
      id: 1,
      title: tab1Tag,
      content: tab1Display,
    },
    {
      id: 2,
      title: tab2Tag,
      content: tab2Display,
    },
    {
      id: 3,
      title: tab3Tag,
      content: tab3Display,
    },
    {
      id: 4,
      title: tab4Tag,
      content: tab4Display,
    },
  ];

  return (
    <div className="rounded-sm border-b border-stroke bg-white shadow-default mt-4">
      <div className="flex flex-wrap gap-2 border-b border-stroke bg-white ">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            className={`px-4 py-1 border flex gap-2 items-center justify-center ${
              openTab === tab.id ? activeClasses : inactiveClasses
            }`}
            onClick={() => setOpenTab(tab.id)}
          >
            <img src={pages} />
            {tab.title}
          </Link>
        ))}
        <div className="py-1 px-4 ml-8">
          <button>
            <img src={multiple} onClick={testCaseTableFunction} />
          </button>
        </div>
      </div>

      <div>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`leading-relaxed ${
              openTab === tab.id ? "block" : "hidden"
            }`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FourTabs;
