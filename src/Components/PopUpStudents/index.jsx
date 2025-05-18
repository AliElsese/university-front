import { useFormik } from 'formik';
import { IoClose } from "react-icons/io5";
import { BsAlphabet } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { useStore } from '../../Store';
import { MdEmail } from "react-icons/md";
import { FaIdCard } from "react-icons/fa6";
import { TbNumbers } from "react-icons/tb";
import { PopUpStudentsSchema } from './PopUpStudentsSchema';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const PopUpStudents = ({ slug, getData }) => {
  const { mSection } = useParams();
  const navigate = useNavigate();
  const { BASE_URL, token, popUpIsClosed } = useStore();
  const [years, setYears] = useState([]);
  const [yearId, setYearId] = useState([]);

  const getYears = async () => {
    try {
      const res = await axios.get(`${BASE_URL}year/findAll/${mSection}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const newYears = [];
      const newId = [];
      res.data.years.forEach((el) => {
        newYears.push(el.name);
        newId.push(el._id);
      });
      setYears(newYears);
      setYearId(newId);
    } catch {
      navigate("/error");
    }
  };

  useEffect(() => {
    getYears();
  }, []);

  const onSubmit = async (values, actions) => {
    const newValues = {
      ...values,
      nationalId: `${values.nationalId}`,
      phoneNumber: values.phoneNumber,
      universityId: `${slug}${values.universityId}`,
      hourCost: `${values.hourCost}`,
      sectionName: mSection,
      yearId: values.yearId === "undefined" ? yearId[0] : values.yearId,
    };
    try {
      const res = await axios.post(`${BASE_URL}student/createStudent`, newValues, {
        headers: { Authorization: `Bearer ${token}` }
      });
      popUpIsClosed();
      toast.success(res.data.message, { autoClose: 1000 });
      actions.resetForm();
      getData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error", { autoClose: 2000 });
    }
  };

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      nationalId: "",
      name: "",
      gender: "Male",
      universityId: "",
      phoneNumber: "",
      email: "",
      hourCost: "",
      yearId: yearId[0] || ""
    },
    enableReinitialize: true,
    validationSchema: PopUpStudentsSchema,
    onSubmit
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
        onClick={popUpIsClosed}
        className='absolute top-[5px] start-[5px] text-gray-900 dark:text-white hover:text-white hover:bg-red-500 duration-150 rounded-full text-sm p-[2px] cursor-pointer'
      >
        <IoClose />
      </span>
      <div className='flex'>
        <input
          type="number"
          name='nationalId'
          placeholder='رقم البطاقة (14 رقم)'
          value={values.nationalId}
          onChange={handleChange}
          onBlur={handleBlur}
          className='h-[40px] bg-white border border-[#2b6cb033] border-e-0 rounded ps-3 rounded-e-none placeholder-[#718096] grow'
        />
        <div className='w-[50px] flex justify-center items-center shadow text-xl text-[#3d4148] bg-white border border-[#2b6cb033] rounded rounded-s-none'>
          <FaIdCard />
        </div>
      </div>
      {errors.nationalId && touched.nationalId && (
        <p className='error text-[#dc3545]'>{errors.nationalId}</p>
      )}
      <div className='flex'>
        <input
          className='h-[40px] bg-white border border-[#2b6cb033] border-e-0 rounded ps-3 rounded-e-none placeholder-[#718096] grow'
          type="text"
          name='name'
          placeholder='اسم الطالب'
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className='w-[50px] flex justify-center items-center shadow text-xl text-[#3d4148] bg-white border border-[#2b6cb033] rounded rounded-s-none'>
          <BsAlphabet />
        </div>
      </div>
      {errors.name && touched.name && (
        <p className='error text-[#dc3545]'>{errors.name}</p>
      )}
      <div className='relative'>
        <select
          name="gender"
          value={values.gender}
          onChange={handleChange}
          onBlur={handleBlur}
          className='w-full h-[40px] text-lg bg-white border border-[#2b6cb033] rounded ps-3 cursor-pointer'
        >
          <option value="Male">ولد</option>
          <option value="Female">بنت</option>
        </select>
        <div className='absolute top-1/2 -translate-y-1/2 end-[10px] pointer-events-none'>
          <IoMdArrowDropdown />
        </div>
      </div>
      {errors.gender && touched.gender && (
        <p className='error text-[#dc3545]'>{errors.gender}</p>
      )}
      <div className='flex'>
        <input
          type="number"
          name='universityId'
          placeholder='رقم الجلوس'
          value={values.universityId}
          onChange={handleChange}
          onBlur={handleBlur}
          className='h-[40px] bg-white border border-[#2b6cb033] border-e-0 rounded ps-3 rounded-e-none placeholder-[#718096] grow'
        />
        <div className='w-[50px] flex justify-center items-center shadow text-xl text-[#3d4148] bg-white border border-[#2b6cb033] rounded rounded-s-none'>
          <TbNumbers />
        </div>
      </div>
      {errors.universityId && touched.universityId && (
        <p className='error text-[#dc3545]'>{errors.universityId}</p>
      )}
      <div className='flex'>
        <input
          type="text"
          name='phoneNumber'
          placeholder='رقم الهاتف'
          value={values.phoneNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          className='h-[40px] bg-white border border-[#2b6cb033] border-e-0 rounded ps-3 rounded-e-none placeholder-[#718096] grow'
        />
        <div className='w-[50px] flex justify-center items-center shadow text-xl text-[#3d4148] bg-white border border-[#2b6cb033] rounded rounded-s-none'>
          <TbNumbers />
        </div>
      </div>
      {errors.phoneNumber && touched.phoneNumber && (
        <p className='error text-[#dc3545]'>{errors.phoneNumber}</p>
      )}
      <div className='flex'>
        <input
          type="number"
          name='hourCost'
          placeholder='سعر الساعة'
          value={values.hourCost}
          onChange={handleChange}
          onBlur={handleBlur}
          className='h-[40px] bg-white border border-[#2b6cb033] border-e-0 rounded ps-3 rounded-e-none placeholder-[#718096] grow'
        />
        <div className='w-[50px] flex justify-center items-center shadow text-xl text-[#3d4148] bg-white border border-[#2b6cb033] rounded rounded-s-none'>
          <TbNumbers />
        </div>
      </div>
      {errors.hourCost && touched.hourCost && (
        <p className='error text-[#dc3545]'>{errors.hourCost}</p>
      )}
      <div className='flex'>
        <input
          type="email"
          name='email'
          placeholder='البريد الالكتروني'
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className='h-[40px] bg-white border border-[#2b6cb033] border-e-0 rounded ps-3 rounded-e-none placeholder-[#718096] grow'
        />
        <div className='w-[50px] flex justify-center items-center shadow text-xl text-[#3d4148] bg-white border border-[#2b6cb033] rounded rounded-s-none'>
          <MdEmail />
        </div>
      </div>
      {errors.email && touched.email && (
        <p className='error text-[#dc3545]'>{errors.email}</p>
      )}
      <div className='relative'>
        <select
          name="yearId"
          value={values.yearId}
          onChange={handleChange}
          onBlur={handleBlur}
          className='w-full h-[40px] text-lg bg-white border border-[#2b6cb033] rounded ps-3 cursor-pointer'
        >
          {years.map((year, index) => (
            <option key={yearId[index]} value={yearId[index]}>{year}</option>
          ))}
        </select>
        <div className='absolute top-1/2 -translate-y-1/2 end-[10px] pointer-events-none'>
          <IoMdArrowDropdown />
        </div>
      </div>
      {errors.yearId && touched.yearId && (
        <p className='error text-[#dc3545]'>{errors.yearId}</p>
      )}
      <motion.button
        disabled={isSubmitting}
        type='submit'
        className='h-[40px] mt-3 relative flex items-center justify-center gap-4 
          bg-[#3182ce] text-white border border-[#3182ce] rounded cursor-pointer outline-none'
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        submit
      </motion.button>
    </motion.form>
  );
};

export default PopUpStudents;
