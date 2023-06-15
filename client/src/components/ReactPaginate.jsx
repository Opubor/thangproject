import React from "react";
import ReactPaginate from "react-paginate";

function ReactPagination({ pageCount, handlePageClick }) {
  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        nextClassName="hover:bg-primary"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<<"
        previousClassName="hover:bg-primary"
        renderOnZeroPageCount={null}
        containerClassName="flex my-4 text-base"
        pageLinkClassName="bg-gray-100 px-2 hover:bg-primary"
        previousLinkClassName="px-2"
        nextLinkClassName="px-2"
        activeLinkClassName="bg-indigo-900 rounded-sm font-bold text-white dark:text-white"
      />
    </>
  );
}

export default ReactPagination;
