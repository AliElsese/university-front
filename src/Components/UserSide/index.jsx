import { Link, useParams } from "react-router-dom";
import userImg from '/Assets/OIP.jpg';
import { useStore } from "../../Store";
import { motion, AnimatePresence } from "framer-motion";

const UserSide = () => {
  const { mSection } = useParams();
  const { closeSide, user } = useStore();

  const containerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  const imageVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  };

  return (
    <AnimatePresence mode="wait">
      {closeSide ? (
        <motion.div
          key="open"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Link
            to={user?.role === "employee" ? `/${mSection}` : `/`}
            className="user bg-gray-200 dark:bg-gray-800 p-px md:p-4 flex items-center gap-2 outline-0 rounded-lg mt-2 mb-4"
          >
            <motion.img
              key="open-img"
              className="shrink-0 w-10 h-10 border-2 border-white dark:border-gray-400 md:rounded-full rounded-lg bg-black"
              src={userImg}
              alt="بروفيل"
              variants={imageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            />
            <div className="content">
              <h2 className="text-sm font-medium uppercase tracking-wide text-gray-900 dark:text-white hidden md:block shrink-0">
                {user?.name}
              </h2>
              <span className="mt-1 text-xs text-gray-600 dark:text-gray-300 hidden md:block shrink-0">
                {user?.role}
              </span>
            </div>
          </Link>
        </motion.div>
      ) : (
        <motion.div
          key="closed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            to={user?.role === "employee" ? `/${mSection}` : `/`}
            className="user outline-0 rounded-lg mt-2 mb-4"
          >
            <motion.img
              className="w-10 h-10 mx-auto mt-2 mb-4 border-2 border-white dark:border-gray-400 rounded-full bg-black"
              src={userImg}
              alt="user"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserSide;
