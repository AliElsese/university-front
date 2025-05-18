import { Link } from 'react-router-dom'
import { useStore } from '../../Store';
import { PiBooksFill } from "react-icons/pi";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from "framer-motion";

const StudentSide = () => {
  const { BASE_URL, token, user, pageName, closeSide } = useStore();
  const [years, setYears] = useState([]);
  const getData = async () => {
    try {
      if (user) {
        const res = await axios.get(`${BASE_URL}student/getYearsByName/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setYears(res.data.years);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <ul className="flex flex-col gap-2">
      {
        years.map((el) => (
          <motion.li
            key={el.id}
            layout
            transition={{ duration: 0.3 }}
            className="list-none"
          >
            <Link
              to={`/${el.id}`}
              className={`p-2 outline-0 text-md rounded-lg flex items-center gap-2 transition-all duration-200
        ${pageName === "studentSubjects"
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
                    key={`${el.id}-label`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="hidden md:inline-block shrink-0"
                  >
                    {el.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </motion.li>
        ))
      }
    </ul>
  )
}

export default StudentSide