import { useEffect, useState } from "react";
import style from "./index.module.css"
import { HiOutlineArrowLongRight, HiOutlineArrowLongLeft } from "react-icons/hi2";

const TablePagination = ({ tableData, page, setPage, limit, setLimit }) => {

  const nextPage = () => {
    if (page < Math.ceil(tableData.length / limit)) {
      setPage(prv => prv + 1)
    }
  }
  const prevPage = () => {
    if (page > 1) {
      setPage(prv => prv - 1)
    }
  }

  return (
    <div
      className={`${style.shadowCustomed} mb-4 px-4 py-6 bg-gray-100 dark:bg-gray-800 shadow-lg text-gray-900 dark:text-gray-400 rounded flex justify-center items-center md:gap-2`}
    >
      <div
        className={`hover:text-white hover:bg-gray-900 p-2 rounded-full ${page === Math.ceil(tableData.length / limit) ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <HiOutlineArrowLongRight onClick={nextPage} />
      </div>
      <p>
        <select
          className="mx-2 py-1 px-2 border border-gray-500 rounded"
          onChange={(e) => setLimit(Number(e.target.value))}
        >
          <option value="4">4</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
        صفحة
        <span className="px-2 py-px text-gray-900 dark:text-white">{page}</span>
        من
        <span className="px-2 py-px text-gray-500">{Math.ceil(tableData.length / limit)}</span>
      </p>
      <div
        className={`hover:text-white hover:bg-gray-900 p-2 rounded-full ${page === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <HiOutlineArrowLongLeft
          onClick={prevPage}
        />
      </div>
    </div>
  )
}

export default TablePagination