import style from "./index.module.css";
import Confirmation from './../Confirmation/';
import { useParams } from "react-router-dom";
import { useRef, useState } from "react";
import { useStore } from "../../Store";
import { toast } from "react-toastify";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const SubmitSheet = ({ getData, headers, tableData, id }) => {
  const { subjectsName } = useParams();
  const { BASE_URL, token, singleSubject, confirmationPopUpToggel, confirmationPopUpIsOpen, confirmationPopUpIsClosed } = useStore();
  const [studentDegrees, setStudentDegrees] = useState([]);
  const inputRefs = useRef([]);

  const collectValues = () => {
    const inputValues = inputRefs.current.map(el => el.value || "0");
    const newvalues = []
    id.forEach((id, index) => {
      newvalues.push({
        studentId: id,
        subjectDegree: inputValues[index],
      })
      setStudentDegrees([...newvalues])
    });
  };

  const postDegree = async () => {
    const values = {
      subjectName: `${subjectsName}`,
      highestDegree: `${singleSubject.highestDegree}`,
      studentDegrees: studentDegrees,
    }
    try {
      const res = await axios.post(`${BASE_URL}degree/createDegree`, values, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const notify = () => toast.success(`${res.data.message}`, { autoClose: 1000 });
      notify();
      getData();
      confirmationPopUpIsClosed();
    } catch (error) {
      const notify = () => toast.error(`${error.response.data.message}`, { autoClose: 2000 });
      notify();
      confirmationPopUpIsClosed();
      console.log(error)
    }
  }

  return (
    <motion.div
      className='w-full'
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {
        confirmationPopUpToggel &&
        <div
          onClick={confirmationPopUpIsClosed}
          className="fixed top-0 end-0 bottom-0 start-0 z-50 flex justify-center items-center bg-[#171e2e61] backdrop-blur"
        >
          <Confirmation id={null} type="رفع الدرجات" passedFunction={postDegree} />
        </div>
      }
      <div>
        <div className="actions flex md:flex-row md:justify-between md:items-end flex-col gap-2">
          <div>
            <p
              className="px-10 py-3 text-center md:text-start p-2 bg-gray-100 dark:bg-gray-800 shadow text-[#171e2e] dark:text-gray-300 rounded"
            >
              <span>{singleSubject.name}</span> - (<span className="text-sm">{singleSubject.highestDegree} درجة</span>)
            </p>
          </div>
          <div
            onClick={() => {
              collectValues();
              confirmationPopUpIsOpen();
            }}
            className="addnew group flex items-center justify-center gap-4 bg-gray-100 dark:bg-gray-800 md:w-fit sm:w-full px-4 py-2 text-[#171e2e] dark:text-gray-400 rounded-lg border-2 border-gray-500 dark:border-gray-600 border-dashed cursor-pointer"
          >
            <span className="group-hover:text-gray-900 dark:group-hover:text-white duration-150">
              رفع الدرجات
            </span>
          </div>
        </div>
        <div className="overflow-auto">
          <table className="min-w-[800px] table-auto w-full border-separate border-spacing-y-4">
            <thead>
              <tr className={`${style.shadowCustomed} rounded bg-gray-100 dark:bg-gray-800 shadow-lg text-gray-800 dark:text-gray-300`}>
                {
                  headers.map((header, index) => (
                    <th key={index} className={`text-start text-sm px-4 py-6`}>{header}</th>
                  ))
                }
              </tr>
            </thead>
            <tbody>
              {
                tableData.map((el, index) => (
                  <tr key={id[el.id - 1]} className={`${style.shadowCustomed} rounded-lg bg-gray-100 dark:bg-gray-800 shadow text-black dark:text-white`}>
                    {
                      Object.keys(el).map((key) => (
                        <td key={key} className="max-w-[250px] text-sm px-4 py-6">{el[key]}</td>
                      ))
                    }
                    <td>
                      <input
                        className="text-sm px-4 py-6"
                        ref={(input) => (inputRefs.current[index] = input)}
                        placeholder="0"
                      />
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </motion.div >
  )
}

export default SubmitSheet