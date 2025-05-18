import { Link, useParams } from 'react-router-dom'
import { useStore } from '../../Store';
import { FaUserTie } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa6";
import { MdTimer } from "react-icons/md";
import { PiBooksFill } from "react-icons/pi";
import { PiChartPieSliceFill } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";

const EmployeeSide = () => {
  const { mSection } = useParams();
  const { pageName, closeSide } = useStore();

  return (
    <ul className="flex flex-col gap-2">
      <motion.li
        layout
        transition={{ duration: 0.3 }}
        className="list-none"
      >
        <Link
          to={`/${mSection}/chart`}
          className={`p-2 outline-0 ${pageName === "chart"
            ? "bg-[#2a52be] text-white text-lg"
            : "text-gray-500 hover:text-[#2a52be] hover:ps-3 dark:hover:text-white"
            } text-md rounded-lg flex items-center gap-2 transition-all duration-200
            ${closeSide ? "justify-start" : "justify-center"}
            `}
        >
          <PiChartPieSliceFill />
          <AnimatePresence mode="wait">
            {closeSide && (
              <motion.span
                key="chart-label"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="hidden md:inline-block shrink-0"
              >
                الاحصائيات
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </motion.li>
      <motion.li
        layout
        transition={{ duration: 0.3 }}
        className="list-none"
      >
        <Link
          to={`/${mSection}/study-years`}
          className={`p-2 outline-0 transition-all duration-200 ${pageName === "studyYears"
            ? "bg-[#2a52be] text-white text-lg"
            : "text-gray-500 hover:text-[#2a52be] hover:ps-3 dark:hover:text-white"
            } text-md rounded-lg flex items-center gap-2
            ${closeSide ? "justify-start" : "justify-center"}
            `}
        >
          <MdTimer />
          <AnimatePresence mode="wait">
            {closeSide && (
              <motion.span
                key="study-years-label"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="hidden md:inline-block shrink-0"
              >
                سنيين دراسية
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </motion.li>
      <motion.li
        layout
        transition={{ duration: 0.3 }}
        className="list-none"
      >
        <Link
          to={`/${mSection}/doctors`}
          className={`p-2 outline-0 transition-all duration-200 ${pageName === "doctors"
            ? "bg-[#2a52be] text-white text-lg"
            : "text-gray-500 hover:text-[#2a52be] hover:ps-3 dark:hover:text-white"
            } text-md rounded-lg flex items-center gap-2
            ${closeSide ? "justify-start" : "justify-center"}
            `}
        >
          <FaUserTie />
          <AnimatePresence mode="wait">
            {closeSide && (
              <motion.span
                key="doctors-label"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="hidden md:inline-block shrink-0"
              >
                الدكاترة
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </motion.li>
      <motion.li
        layout
        transition={{ duration: 0.3 }}
        className="list-none"
      >
        <Link
          to={`/${mSection}/subjects`}
          className={`p-2 outline-0 transition-all duration-200 
          ${pageName === "subjects" || pageName === "markes"
              ? "bg-[#2a52be] text-white text-lg"
              : "text-gray-500 hover:text-[#2a52be] hover:ps-3 dark:hover:text-white"
            } text-md rounded-lg flex items-center gap-2
            ${closeSide ? "justify-start" : "justify-center"}
            `}

        >
          <PiBooksFill />
          <AnimatePresence mode="wait">
            {closeSide && (
              <motion.span
                key="subjects-label"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="hidden md:inline-block shrink-0"
              >
                المواد
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </motion.li>
      <motion.li
        layout
        transition={{ duration: 0.3 }}
        className="list-none"
      >
        <Link
          to={`/${mSection}/students`}
          className={`p-2 outline-0 transition-all duration-200 ${pageName === "students"
            ? "bg-[#2a52be] text-white text-lg"
            : "text-gray-500 hover:text-[#2a52be] hover:ps-3 dark:hover:text-white"
            } text-md rounded-lg flex items-center gap-2
            ${closeSide ? "justify-start" : "justify-center"}
            `}
        >
          <FaUserGraduate />
          <AnimatePresence mode="wait">
            {closeSide && (
              <motion.span
                key="students-label"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="hidden md:inline-block shrink-0"
              >
                الطلاب
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </motion.li>
    </ul>
  )
}

export default EmployeeSide