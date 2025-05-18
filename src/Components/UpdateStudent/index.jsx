import { useFormik } from 'formik';
import { IoClose } from "react-icons/io5";
import { BsAlphabet } from "react-icons/bs";
import { useStore } from '../../Store';
import { MdEmail } from "react-icons/md";
import { FaIdCard } from "react-icons/fa6";
import { TbNumbers } from "react-icons/tb";
import { UpdateStudentsSchema } from './UpdateStudentsSchema';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const UpdateStudent = ({ data, getData }) => {
  const { BASE_URL, token, popUpUpdateIsClosed } = useStore();
  const [slug, setSlug] = useState(null);

  useEffect(() => {
    setSlug(data.universityId.slice(0, 3));
    console.log(data);
  }, [data]);

  const onSubmit = async (values, actions) => {
    const newValues = {
      ...values,
      nationalId: `${values.nationalId}`,
      phoneNumber: `${values.phoneNumber}`,
      hourCost: `${values.hourCost}`,
      universityId: `${slug}${values.universityId}`,
    };

    try {
      const res = await axios.put(`${BASE_URL}student/updateOne/${data.id}`, newValues, {
        headers: { Authorization: `Bearer ${token}` }
      });
      popUpUpdateIsClosed();
      toast.success(res.data.message, { autoClose: 1000 });
      actions.resetForm();
      getData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error', { autoClose: 2000 });
    }
  };

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      nationalId: `${data.nationalId}`,
      name: `${data.name}`,
      universityId: `${data.universityId.slice(3)}`,
      phoneNumber: `${data.phoneNumber}`,
      hourCost: `${data.hourCost}`,
      email: `${data.email}`,
    },
    validationSchema: UpdateStudentsSchema,
    onSubmit,
  });

  const formVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: 20, scale: 0.9, transition: { duration: 0.3, ease: "easeIn" } }
  };

  const buttonVariants = {
    hover: { scale: 1.05, backgroundColor: "#2b6cb0" },
    tap: { scale: 0.95 }
  };

  return (
    <motion.form
      onClick={e => e.stopPropagation()}
      onSubmit={handleSubmit}
      className="max-w-full w-[400px] flex flex-col gap-3 p-8 bg-[#f6f3f454] dark:bg-gray-800 text-dark rounded-lg shadow-lg relative"
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

      <div className="flex">
        <input
          type="number"
          name="nationalId"
          placeholder="رقم البطاقة (14 رقم)"
          value={values.nationalId}
          onChange={handleChange}
          onBlur={handleBlur}
          className="h-[40px] bg-white border border-[#2b6cb033] border-e-0 rounded ps-3 rounded-e-none placeholder-[#718096] grow"
        />
        <div className="w-[50px] flex justify-center items-center shadow text-xl text-[#3d4148] bg-white border border-[#2b6cb033] rounded rounded-s-none">
          <FaIdCard />
        </div>
      </div>
      {errors.nationalId && touched.nationalId && (
        <p className="error text-[#dc3545]">{errors.nationalId}</p>
      )}

      <div className="flex">
        <input
          type="text"
          name="name"
          placeholder="اسم الطالب"
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

      <div className="flex">
        <input
          type="number"
          name="universityId"
          placeholder="رقم الجلوس"
          value={values.universityId}
          onChange={handleChange}
          onBlur={handleBlur}
          className="h-[40px] bg-white border border-[#2b6cb033] border-e-0 rounded ps-3 rounded-e-none placeholder-[#718096] grow"
        />
        <div className="w-[50px] flex justify-center items-center shadow text-xl text-[#3d4148] bg-white border border-[#2b6cb033] rounded rounded-s-none">
          <TbNumbers />
        </div>
      </div>
      {errors.universityId && touched.universityId && (
        <p className="error text-[#dc3545]">{errors.universityId}</p>
      )}

      <div className="flex">
        <input
          type="text"
          name="phoneNumber"
          placeholder="رقم الهاتف"
          value={values.phoneNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          className="h-[40px] bg-white border border-[#2b6cb033] border-e-0 rounded ps-3 rounded-e-none placeholder-[#718096] grow"
        />
        <div className="w-[50px] flex justify-center items-center shadow text-xl text-[#3d4148] bg-white border border-[#2b6cb033] rounded rounded-s-none">
          <TbNumbers />
        </div>
      </div>
      {errors.phoneNumber && touched.phoneNumber && (
        <p className="error text-[#dc3545]">{errors.phoneNumber}</p>
      )}

      <div className="flex">
        <input
          type="number"
          name="hourCost"
          placeholder="سعر الساعة"
          value={values.hourCost}
          onChange={handleChange}
          onBlur={handleBlur}
          className="h-[40px] bg-white border border-[#2b6cb033] border-e-0 rounded ps-3 rounded-e-none placeholder-[#718096] grow"
        />
        <div className="w-[50px] flex justify-center items-center shadow text-xl text-[#3d4148] bg-white border border-[#2b6cb033] rounded rounded-s-none">
          <TbNumbers />
        </div>
      </div>
      {errors.hourCost && touched.hourCost && (
        <p className="error text-[#dc3545]">{errors.hourCost}</p>
      )}

      <div className="flex">
        <input
          type="email"
          name="email"
          placeholder="البريد الالكتروني"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className="h-[40px] bg-white border border-[#2b6cb033] border-e-0 rounded ps-3 rounded-e-none placeholder-[#718096] grow"
        />
        <div className="w-[50px] flex justify-center items-center shadow text-xl text-[#3d4148] bg-white border border-[#2b6cb033] rounded rounded-s-none">
          <MdEmail />
        </div>
      </div>
      {errors.email && touched.email && (
        <p className="error text-[#dc3545]">{errors.email}</p>
      )}

      <motion.button
        disabled={isSubmitting}
        type="submit"
        className="h-[40px] mt-3 relative flex items-center justify-center gap-4 bg-[#3182ce] text-white border border-[#3182ce] rounded cursor-pointer outline-none"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        submit
      </motion.button>
    </motion.form>
  );
};

const buttonVariants = {
  hover: { scale: 1.05, backgroundColor: "#2b6cb0" },
  tap: { scale: 0.95 }
};

export default UpdateStudent;
