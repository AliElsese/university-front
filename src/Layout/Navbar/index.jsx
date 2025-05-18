import { RiLogoutCircleRLine } from "react-icons/ri";
import { MdOutlineDarkMode, MdLightMode } from "react-icons/md";
import { useStore } from "../../Store";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const { theme, darkMode, clearToken, setUser, setMSections } = useStore();

  function toggleDarkMode() {
    const htmlElement = document.documentElement;
    const isDarkMode = htmlElement.classList.toggle('dark');
    darkMode(isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }

  const logOut = () => {
    clearToken();
    localStorage.removeItem("user");
    setUser(null);
    localStorage.removeItem("mSections");
    setMSections(null);
    navigate("/login");
  };

  const iconVariants = {
    hover: { scale: 1.1, boxShadow: "0 0 8px rgba(42, 82, 190, 0.6)" },
    tap: { scale: 0.95 }
  };

  const fadeSlide = {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 10, transition: { duration: 0.3 } }
  };

  return (
    <div className="sticky top-0 z-30 p-6 border-b dark:border-gray-600 text-white flex items-center justify-end gap-4">
      <motion.div
        onClick={toggleDarkMode}
        className="p-3 bg-white dark:bg-[#171e2e] text-[#2a52be] dark:text-white border border-white dark:border-gray-700 w-fit rounded-full cursor-pointer"
        whileHover="hover"
        whileTap="tap"
        variants={iconVariants}
        style={{ boxShadow: "0 0 0 rgba(0,0,0,0)" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {theme === "light" ? (
            <motion.span key="dark-mode" {...fadeSlide}>
              <MdOutlineDarkMode size={24} />
            </motion.span>
          ) : (
            <motion.span key="light-mode" {...fadeSlide}>
              <MdLightMode size={24} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        onClick={logOut}
        className="p-3 bg-white dark:bg-[#171e2e] text-[#2a52be] dark:text-white border border-white dark:border-gray-700 w-fit rounded-full cursor-pointer"
        whileHover="hover"
        whileTap="tap"
        variants={iconVariants}
        style={{ boxShadow: "0 0 0 rgba(0,0,0,0)" }}
      >
        <RiLogoutCircleRLine size={24} />
      </motion.div>
    </div>
  );
};

export default Navbar;
