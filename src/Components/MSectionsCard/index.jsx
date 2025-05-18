import { Link } from "react-router-dom";
import { MdEditDocument } from "react-icons/md";
import { useStore } from "../../Store";
import { motion } from "framer-motion";

const MSectionsCard = ({ name, id, getOneData }) => {
  const { confirmationUpdate, confirmationPopUpIsOpen } = useStore();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{
        y: -12,
        boxShadow: `0 20px 30px rgba(42, 82, 190, 0.15), 
                    0 10px 10px rgba(42, 82, 190, 0.1)`,
        transition: { duration: 0.35, ease: "easeInOut" },
      }}
      className="group min-h-[400px] w-full md:w-[45%] lg:w-[30%] rounded-md cursor-pointer"
    >
      <Link
        to={`${name}`}
        className="flex justify-center items-center bg-[#171e2e26] dark:bg-gray-800 backdrop-blur text-lg text-dark border-b-3 border-[#2a52be] outline-0 rounded-md w-full min-h-[400px]"
      >
        <div
          onClick={(e) => {
            e.preventDefault();
            confirmationUpdate();
            confirmationPopUpIsOpen();
            getOneData(id);
          }}
          className="absolute top-2 right-2 text-2xl text-blue-600 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <MdEditDocument />
        </div>

        <span className="w-[170px] h-[170px] p-3 text-center flex justify-center items-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-semibold rounded-full">
          {name}
        </span>
      </Link>
    </motion.div>
  );
};

export default MSectionsCard;
