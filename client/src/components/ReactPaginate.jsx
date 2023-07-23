import React from "react";
import ReactPaginate from "react-paginate";

function ReactPagination({ pageCount, handlePageClick }) {
  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        nextClassName="bg-gray-300 rounded-sm font-extrabold mx-2 hover:bg-gray-400"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        previousClassName="bg-gray-300 rounded-sm font-extrabold mx-2 hover:bg-gray-400"
        renderOnZeroPageCount={null}
        containerClassName="flex my-4 text-base"
        pageLinkClassName="bg-gray-100 px-2 hover:bg-primary"
        previousLinkClassName="px-2"
        nextLinkClassName="px-2"
        activeLinkClassName="border-2 border-indigo-900 bg-white rounded-sm"
        className="bg-white rounded-sm mx-2 flex"
      />
    </>
  );
}

export default ReactPagination;
