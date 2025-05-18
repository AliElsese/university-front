import { motion } from "framer-motion";
import profileImg from '/Assets/OIP.jpg';
import { useStore } from "../../Store";

const ProfileCard = () => {
  const { user } = useStore();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.12)" }}
      className="group max-w-full w-[75%] p-8 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg relative overflow-hidden cursor-pointer"
    >
      <div className="profile-header flex items-center gap-5">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ delay: 0.3, duration: 0.5 }}
          className="image w-[150px] border-4 border-[#fcfcfc] dark:border-gray-900 p-1 rounded-full overflow-hidden"
        >
          <img className="w-full" src={profileImg} alt={user?.name} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="content"
        >
          <h2 className="text-4xl text-gray-900 dark:text-white">{user?.name}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">{user?.role}</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="content my-4 flex flex-col gap-3 text-gray-900 dark:text-gray-200"
      >
        <p className="p-3 bg-gray-300 dark:bg-gray-900 rounded-lg">{user?.nationalId}</p>
        <p className="p-3 bg-gray-300 dark:bg-gray-900 rounded-lg">{user?.email}</p>
        <p className="p-3 bg-gray-300 dark:bg-gray-900 rounded-lg">{user?.phoneNumber}</p>
      </motion.div>
    </motion.div>
  )
}

export default ProfileCard;
