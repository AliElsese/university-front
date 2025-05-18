import { motion } from "framer-motion";
import { useEffect } from "react";
import darkErrorImg from "/Assets/404-dark.svg";
import lightErrorImg from "/Assets/404-light.svg";
import { useStore } from "../../Store";
import BackToHome from "../../Components/BackToHome";

const Error = ({ message }) => {
  const { theme, errorActive } = useStore();

  useEffect(() => {
    errorActive();
  }, []);

  // Animation variants for container and children
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const bounceTransition = {
    y: {
      duration: 2,
      yoyo: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <motion.div
      className="max-h-full h-[550px] flex justify-center items-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="max-w-full w-[500px] flex flex-col items-center gap-3">
        <motion.img
          src={theme === "light" ? lightErrorImg : darkErrorImg}
          alt="not found"
          variants={itemVariants}
          animate={{ y: ["0%", "-10%", "0%"] }}
          transition={bounceTransition}
          style={{ originY: 0.5 }}
        />
        <motion.h2
          className="text-gray-900 dark:text-white text-xl 3xl:text-2xl font-medium tracking-wide"
          variants={itemVariants}
        >
          خطاء! لا توجد نتائج
        </motion.h2>
        <motion.p
          className="w-2/3 max-w-full text-center leading-loose text-gray-600 dark:text-gray-400"
          variants={itemVariants}
        >
          {message}.
        </motion.p>
        <motion.div variants={itemVariants}>
          <BackToHome />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Error;
