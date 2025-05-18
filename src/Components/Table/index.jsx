import style from "./index.module.css"
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { FaEye, FaPlus } from "react-icons/fa";
import { useStore } from "../../Store";
import { Link } from "react-router-dom";
import Confirmation from "../Confirmation";
import { useState } from "react";
import TablePagination from "../TablePagination";
import { motion, AnimatePresence } from "framer-motion";


const Table = ({ headers, tableData, id, pagenatedArray, page, setPage, limit, setLimit, deleteRow, getOneData, confirmPayment }) => {
  // Global State
  const {
    user,
    setSingleSubject,
    pageName,
    confirmationType,
    confirmationDelete,
    confirmationUpdate,
    popUpUpdateIsOpen,
    confirmationPopUpToggel,
    confirmationPopUpIsClosed,
    confirmationPopUpIsOpen,
  } = useStore();
  // Local State
  const [actionIndex, setActionIndex] = useState(null);

  return (
    <motion.div
      className='w-full'
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <AnimatePresence>
        {confirmationPopUpToggel && (
          <div
            onClick={confirmationPopUpIsClosed}
            className="fixed top-0 end-0 bottom-0 start-0 z-50 flex justify-center items-center bg-[#171e2e61] backdrop-blur"
          >
            <Confirmation
              id={actionIndex}
              type={confirmationType === "delete" ? "المسح" : "التعديل"}
              passedFunction={
                confirmationType === "delete"
                  ? deleteRow
                  : () => {
                    popUpUpdateIsOpen();
                    confirmationPopUpIsClosed();
                  }
              }
            />
          </div>
        )}
      </AnimatePresence>
      <div>
        <div className="overflow-auto">
          <table className="min-w-[800px] table-auto w-full border-separate border-spacing-y-4">
            <thead>
              <tr className={`${style.shadowCustomed} bg-gray-100 dark:bg-gray-800 shadow-lg text-gray-800 dark:text-gray-300`}>
                {
                  headers.map((header, index) => (
                    <th key={index} className={`text-start text-sm px-4 py-6`}>{header}</th>
                  ))
                }
              </tr>
            </thead>
            <tbody>
              {
                pagenatedArray.map((el, index) => (
                  <tr key={id[el.id - 1]} className={`${style.shadowCustomed} bg-gray-100 dark:bg-gray-800 shadow text-black dark:text-white`}>
                    {
                      Object.keys(el).map((key) => (
                        <td key={key} className="max-w-[250px] text-sm px-4 py-6">{el[key]}</td>
                      ))
                    }
                    {
                      pageName !== "doctorSubjects"
                      &&
                      <td className="flex items-center gap-2">
                        {
                          user.role === "employee" && pageName !== "finance"
                          &&
                          <div
                            onClick={() => {
                              setActionIndex(id[el.id - 1]);
                              confirmationUpdate();
                              confirmationPopUpIsOpen();
                              getOneData(id[el.id - 1]);
                            }}
                            className="text-lg px-2 py-6 text-orange-500 dark:text-yellow-500 cursor-pointer"
                          >
                            <BiSolidEdit />
                          </div>
                        }
                        {
                          pageName !== "markes"
                            ?
                            pageName !== "finance" && pageName != "generalGPA"
                            &&
                            <div
                              onClick={() => {
                                setActionIndex(id[el.id - 1]);
                                confirmationDelete();
                                confirmationPopUpIsOpen();
                              }}
                              className="text-lg px-2 py-6 text-red-500 hover:text-red-600 duration-150 cursor-pointer"
                            >
                              <MdDelete />
                            </div>
                            :
                            ""
                        }
                      </td>
                    }
                    {
                      pageName === "doctorSubjects"
                        ?
                        <td>
                          <Link
                            to={`${el.name}/markes`}
                            onClick={() => {
                              setSingleSubject({
                                name: el.name,
                                highestDegree: el.highestDegree
                              })
                            }}
                            className="text-lg py-6 px-4 text-blue-600 block w-fit ms-4"
                          >
                            <FaEye />
                          </Link>
                        </td>
                        :
                        pageName === "studentSubjects"
                          ?
                          <td>
                            <Link
                              to={`${el.name}/markes`}
                              onClick={() => {
                                setSingleSubject({
                                  name: el.name,
                                  highestDegree: el.highestDegree
                                })
                              }}
                              className="text-lg py-6 px-4 text-blue-600 block w-fit ms-4"
                            >
                              <FaEye />
                            </Link>
                          </td>
                          :
                          ""
                    }
                    {
                      pageName == "subjects"
                      &&
                      <td>
                        <div className="flex items-center gap-2">
                          <Link
                            to={`${el.name}`}
                            onClick={() => {
                              setSingleSubject({
                                name: el.name,
                                highestDegree: el.highestDegree
                              })
                            }}
                            className="text-sm px-2 py-6 text-green-600"
                          >
                            <FaPlus />
                          </Link>
                          <Link
                            to={`${el.name}/markes`}
                            onClick={() => {
                              setSingleSubject({
                                name: el.name,
                                highestDegree: el.highestDegree
                              })
                            }}
                            className="text-lg px-2 py-6 text-blue-600"
                          >
                            <FaEye />
                          </Link>
                        </div>
                      </td>
                    }
                    {
                      pageName === "studyYears"
                      &&
                      <td className="">
                        <Link
                          to={`${id[index]}/finance`}
                          className="text-lg py-6 px-4 text-blue-600 block w-fit ms-4"
                        >
                          <FaEye />
                        </Link>
                      </td>
                    }
                    {
                      pageName === "finance"
                      &&
                      <td className="">
                        {
                          el.isPaid == "غير مدفوع"
                          &&
                          <button
                            onClick={() => {
                              confirmPayment(id[index]);
                            }}
                            className="font-semibold py-2 px-4 bg-green-600 block w-fit ms-4 rounded-lg cursor-pointer"
                          >
                            تاكيد الدفع
                          </button>
                        }
                      </td>
                    }
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <TablePagination
          page={page}
          setPage={setPage}
          setLimit={setLimit}
          limit={limit}
          pagenatedArray={pagenatedArray}
          tableData={tableData}
        />
      </div>
    </motion.div >
  )
}

export default Table