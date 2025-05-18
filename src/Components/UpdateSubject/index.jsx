import { useFormik } from "formik";
import { IoClose } from "react-icons/io5";
import { BsAlphabet } from "react-icons/bs";
import { TbNumbers } from "react-icons/tb";
import { IoMdArrowDropdown } from "react-icons/io";
import { UpdateSubjectSchema } from "./UpdateSubjectSchema";
import { useStore } from "../../Store";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const UpdateSubject = ({ data, getData }) => {
  const { BASE_URL, token, popUpUpdateIsClosed } = useStore();
  const [slug, setSlug] = useState(null);

  useEffect(() => {
    setSlug(data.code.slice(0, 3));
  }, [data]);

  const onSubmit = async (values, actions) => {
    const newValues = {
      ...values,
      hoursNumber: `${values.hoursNumber}`,
      code: `${slug}${values.code}`, // prepend slug to code
      highestDegree: `${values.highestDegree}`,
    };

    try {
      const res = await axios.put(`${BASE_URL}subject/updateOne/${data.id}`, newValues, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      popUpUpdateIsClosed();
      toast.success(res.data.message, { autoClose: 1000 });
      actions.resetForm();
      getData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating subject", { autoClose: 2000 });
    }
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: data.name,
      code: data.code.slice(3),
      hoursNumber: data.hoursNumber,
      highestDegree: data.highestDegree,
      term: data.term,
    },
    validationSchema: UpdateSubjectSchema,
    onSubmit,
  });

  const formVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: 20, scale: 0.9, transition: { duration: 0.3, ease: "easeIn" } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, backgroundColor: "#2b6cb0" },
    tap: { scale: 0.95 },
  };

  return (
    <motion.form
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSubmit}
      className={`max-w-full w-[400px] flex flex-col gap-3 p-8 bg-[#f6f3f454] dark:bg-gray-800 text-dark rounded-lg shadow-lg relative`}
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <span
        onClick={popUpUpdateIsClosed}
        className="absolute top-[5px] start-[5px] text-gray-900 dark:text-white hover:text-white hover:bg-red-500 duration-150 rounded-full text-sm p-[2px] cursor-pointer"
      >
        <IoClose />
      </span>

      {/* Subject Name */}
      <div className="flex">
        <input
          type="text"
          name="name"
          placeholder="اسم المادة"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className="h-[40px] bg-white border border-[#2b6cb033] border-e-0 rounded ps-3 rounded-e-none placeholder-[#718096] grow"
        />
        <div className="w-[50px] flex justify-center items-center shadow text-xl text-[#3d4148] bg-white border border-[#2b6cb033] rounded rounded-s-none">
          <BsAlphabet />
        </div>
      </div>
      {errors.name && touched.name && (
        <p className="error text-[#dc3545]">{errors.name}</p>
      )}

      {/* Term Select */}
      <div className="relative">
        <select
          name="term"
          value={values.term}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full h-[40px] text-lg bg-white border border-[#2b6cb033] rounded ps-3 cursor-pointer"
        >
          <option value="FirstTerm">الترم الاول</option>
          <option value="SecondTerm">الترم الثاني</option>
        </select>
        <div className="absolute top-1/2 -translate-y-1/2 end-[10px] pointer-events-none">
          <IoMdArrowDropdown />
        </div>
      </div>
      {errors.term && touched.term && (
        <p className="error text-[#dc3545]">{errors.term}</p>
      )}

      {/* Subject Code */}
      <div className="flex">
        <input
          type="text"
          name="code"
          placeholder="كود المادة"
          value={values.code}
          onChange={handleChange}
          onBlur={handleBlur}
          className="h-[40px] bg-white border border-[#2b6cb033] border-e-0 rounded ps-3 rounded-e-none placeholder-[#718096] grow"
        />
        <div className="w-[50px] flex justify-center items-center shadow text-xl text-[#3d4148] bg-white border border-[#2b6cb033] rounded rounded-s-none">
          <BsAlphabet />
        </div>
      </div>
      {errors.code && touched.code && (
        <p className="error text-[#dc3545]">{errors.code}</p>
      )}

      {/* Hours Number */}
      <div className="flex">
        <input
          type="number"
          name="hoursNumber"
          placeholder="ساعات المادة"
          value={values.hoursNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          className="h-[40px] bg-white border border-[#2b6cb033] border-e-0 rounded ps-3 rounded-e-none placeholder-[#718096] grow"
        />
        <div className="w-[50px] flex justify-center items-center shadow text-xl text-[#3d4148] bg-white border border-[#2b6cb033] rounded rounded-s-none">
          <TbNumbers />
        </div>
      </div>
      {errors.hoursNumber && touched.hoursNumber && (
        <p className="error text-[#dc3545]">{errors.hoursNumber}</p>
      )}

      {/* Highest Degree */}
      <div className="flex">
        <input
          type="number"
          name="highestDegree"
          placeholder="اعلي درجة للمادة"
          value={values.highestDegree}
          onChange={handleChange}
          onBlur={handleBlur}
          className="h-[40px] bg-white border border-[#2b6cb033] border-e-0 rounded ps-3 rounded-e-none placeholder-[#718096] grow"
        />
        <div className="w-[50px] flex justify-center items-center shadow text-xl text-[#3d4148] bg-white border border-[#2b6cb033] rounded rounded-s-none">
          <TbNumbers />
        </div>
      </div>
      {errors.highestDegree && touched.highestDegree && (
        <p className="error text-[#dc3545]">{errors.highestDegree}</p>
      )}

      {/* Submit Button */}
      <motion.button
        disabled={isSubmitting}
        type="submit"
        className="h-[40px] mt-3 relative flex items-center justify-center gap-4 
          bg-[#3182ce] hover:bg-[#2b6cb0] text-white border border-[#3182ce] 
          rounded duration-200 overflow-hidden cursor-pointer outline-none
          transform transition-transform"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        submit
      </motion.button>
    </motion.form>
  );
};

export default UpdateSubject;
