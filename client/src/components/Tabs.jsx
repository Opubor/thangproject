import React, { useState } from "react";
import { Link } from "react-router-dom";

const Tabs = ({ tab2Display, tab1Display, tab1Tag, tab2Tag }) => {
  const [openTab, setOpenTab] = useState(1);

  const activeClasses = "text-blue-900 border-b-2 border-b-blue-900 ";
  const inactiveClasses = "text-black";

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
  ];

  return (
    <div className="rounded-sm border-b border-stroke bg-white p-7.5  pt-4 xl:pt-0">
      <div className="flex flex-wrap gap-3 border-b border-stroke bg-gray-50">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            className={`py-3 px-4 text-sm hover:bg-primary hover:font-semibold md:text-base lg:px-6 ${
              openTab === tab.id ? activeClasses : inactiveClasses
            }`}
            onClick={() => setOpenTab(tab.id)}
          >
            {tab.title}
          </Link>
        ))}
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

export default Tabs;
