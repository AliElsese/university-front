import { FaFolderOpen } from "react-icons/fa";
import BackToHome from './../BackToHome';
import { motion } from "framer-motion";

const NoContent = ({ data }) => {
  return (
    <div className='grow flex justify-center items-center'>
      <div className="flex flex-col justify-center items-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaFolderOpen className="text-[200px] text-[#dc3545]" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mb-4 leading-loose text-white"
        >
          لا يوجد {data}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <BackToHome />
        </motion.div>
      </div>
    </div>
  )
}

export default NoContent;
