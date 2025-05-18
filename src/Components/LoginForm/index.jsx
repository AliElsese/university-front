import style from "./index.module.css"
import { useFormik } from 'formik';
import logo from '/Assets/uni-logo.png';
import { IoMdArrowDropdown } from "react-icons/io";
import { FaIdCard } from "react-icons/fa6";
import { MdOutlineLockOpen } from "react-icons/md";
import { loginSchema } from './LoginSchema';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../Store';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from "framer-motion";

const LoginForm = () => {
  const { BASE_URL, setToken } = useStore();
  const navigate = useNavigate();

  // form on submit function
  const onSubmit = async (values, actions) => {
    // setIsLoading(true)
    const realValues = {
      ...values,
      nationalId: `${values.nationalId}`
    }
    try {
      const res = await axios.post(`${BASE_URL}auth/userLogin`, realValues);
      setToken(res.data.accessToken);
      const notify = () => toast.success(`${res.data.message}`, { autoClose: 1000 });
      notify();

      // Delay the navigation
      setTimeout(() => {
        navigate("/");
      }, 2100);

      actions.resetForm();
    } catch (error) {
      toast.error(`${error.response.data.message}` || "An error occurred", { autoClose: 3000 });
    }

  }
  // formik hook for handling login form actions
  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      userType: 'employee',
      nationalId: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit
  });
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className='max-w-full w-[400px] p-8 pt-[80px] bg-[#171e2e26] dark:bg-gray-800 backdrop-blur text-dark border-b-3 border-[#3182ce] rounded shadow-lg relative'
    >
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-3'
      >
        <img src={logo} alt="Tanta Universaty" className='w-30 h-30 rounded-full absolute top-0 left-50 -translate-1/2 border-6 border-[#fcfcfc] dark:border-gray-900 bg-[#fcfcfc] dark:bg-gray-900 shadow' />
        <div className='relative'>
          <select
            name="userType"
            value={values.userType}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`text-black w-full h-[40px] text-lg bg-white border border-[#2b6cb033] rounded ps-3`}
          >
            <option value="employee">شؤون ادارية</option>
            <option value="doctor">دكتور جامعي</option>
            <option value="student">طالب جامعي</option>
          </select>
          <div className='absolute top-1/2 -translate-y-1/2 end-[10px] pointer-events-none'>
            <IoMdArrowDropdown />
          </div>
        </div>
        {errors.userType && touched.userType && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="error text-[#dc3545]"
          >
            {errors.userType}
          </motion.p>
        )}
        <div className='flex'>
          <input
            type="number"
            name='nationalId'
            placeholder='رقم البطاقة (14 رقم)'
            value={values.nationalId}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`text-black h-[40px] bg-white border border-[#2b6cb033] border-e-0 rounded ps-3 rounded-e-none placeholder-[#718096] grow`}
          />
          <div className='w-[50px] flex justify-center items-center shadow text-xl text-[#3d4148] bg-white border border-[#2b6cb033] rounded rounded-s-none'>
            <FaIdCard />
          </div>
        </div>
        {errors.nationalId && touched.nationalId && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="error text-[#dc3545]"
          >
            {errors.nationalId}
          </motion.p>
        )}
        <div className='flex'>
          <input
            className={`text-black h-[40px] bg-white border border-[#2b6cb033] border-e-0 rounded ps-3 rounded-e-none placeholder-[#718096] grow`}
            type="password"
            name='password'
            placeholder='الرقم السري'
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div className='w-[50px] flex justify-center items-center shadow text-xl text-[#3d4148] bg-white border border-[#2b6cb033] rounded rounded-s-none'>
            <MdOutlineLockOpen />
          </div>
        </div>
        {errors.password && touched.password && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="error text-[#dc3545]"
          >
            {errors.password}
          </motion.p>
        )}

        <button
          disabled={isSubmitting}
          type='submit'
          className={`h-[40px] mt-3 relative flex items-center justify-center gap-4 bg-[#3182ce] hover:bg-[#2b6cb0] text-white border border-[#3182ce] rounded duration-200 overflow-hidden cursor-pointer outline-none
          ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}
          `}
        >
          {isSubmitting && <span className={`${style.loader} mr-2`}></span>} Login
        </button>

      </form>
    </motion.div>
  )
}

export default LoginForm