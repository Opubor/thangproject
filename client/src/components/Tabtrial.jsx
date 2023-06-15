import React, { useState } from "react";
import { Link } from "react-router-dom";

const FolderTab = ({ addDisplay, viewDisplay, viewTag, addTag }) => {
  const [openTab, setOpenTab] = useState(1);

  const activeClasses = "bg-primary text-white";
  const inactiveClasses = "bg-gray dark:bg-meta-4 text-black dark:text-white";

  const tabs = [
    {
      id: 1,
      title: viewTag,
      content: viewDisplay,
    },
    {
      id: 2,
      title: addTag,
      content: addDisplay,
    },
  ];

  return (
    <div className="rounded-sm border-b border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="mb-7.5 flex flex-wrap gap-3 border-b border-stroke pb-5 dark:border-strokedark">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            className={`rounded-md py-3 px-4 text-sm font-medium hover:bg-primary hover:text-white dark:hover:bg-primary md:text-base lg:px-6 ${
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

export default FolderTab;
