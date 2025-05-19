import { Link } from 'react-router-dom'
import { useStore } from '../../Store';
import { PiBooksFill, PiChartPieSliceFill } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";

const DoctorsSide = () => {
  const { pageName, closeSide } = useStore();

  return (
    <ul className="flex flex-col gap-2">
      <motion.li
        layout
        transition={{ duration: 0.3 }}
        className="list-none"
      >
        <Link
          to={`/chart`}
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
          to={`/doctor-subjects`}
          className={`p-2 outline-0 text-md rounded-lg flex items-center gap-2 transition-all duration-200
          ${pageName === "doctorSubjects"
              ? "bg-[#2a52be] text-white text-lg"
              : "text-gray-500 hover:text-[#2a52be] hover:ps-3 dark:hover:text-white"
            }
            ${closeSide ? "justify-start" : "justify-center"}         
          `}
        >
          <PiBooksFill />
          <AnimatePresence mode="wait">
            {closeSide && (
              <motion.span
                key="doctor-subjects-label"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="hidden md:inline-block shrink-0"
              >
                المواد الدراسية
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </motion.li>
    </ul>
  )
}

export default DoctorsSide