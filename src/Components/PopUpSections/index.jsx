import { useFormik } from 'formik';
import { IoClose } from "react-icons/io5";
import { BsAlphabet } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { PopUpSectionsSchema } from './PopUpSectionsSchema';
import { useStore } from '../../Store';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PopUpSections = ({ getData }) => {
  const navigate = useNavigate();
  // Global State
  const { BASE_URL, popUpIsClosed } = useStore();
  // Local State
  const [id, setId] = useState([]);
  const [years, setYears] = useState([]);
  
  const getYears = async () => {
    try {
      const res = await axios.get(`${BASE_URL}year/findAll`);
      const newYears = [];
      const newId = [];
      res.data.years.forEach((el) => {
        newYears.push(el.name);
        newId.push(el._id);
      })
      setYears(newYears);
      setId(newId);
    } catch (error) {
      navigate("/error")
    }
  }
  useEffect(() => {
    getYears();
  }, [])

  // form on submit function
  const onSubmit = async (values, actions) => {
    const newValues = {
      ...values,
      yearId: values.yearId === "undefined" ? id[0] : values.yearId,
    }
    try {
      // const res = await axios.post(`${BASE_URL}section/createSection`, values);
      // popUpIsClosed();
      // const notify = () => toast.success(`${res.data.message}`, { autoClose: 1000 });
      // notify();
      // getData();
      console.log(newValues)
    } catch (error) {
      const notify = () => toast.error(`${error.response.data.message}`, { autoClose: 2000 });
      notify();
    }
    actions.resetForm();
  }

  // formik hook for handling login form actions
  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      yearId: `${id[0]}`
    },
    validationSchema: PopUpSectionsSchema,
    onSubmit
  });

  return (
    <form
      onClick={(e) => { e.stopPropagation() }}
      onSubmit={handleSubmit}
      className='max-w-full w-[400px] flex flex-col gap-3 p-8 bg-[#f6f3f454] dark:bg-gray-800 text-dark rounded-lg shadow-lg relative'>
      <span
        onClick={popUpIsClosed}
        className='absolute top-[5px] start-[5px] text-gray-900 dark:text-white hover:text-white hover:bg-red-500 duration-150 rounded-full text-sm p-[2px] cursor-pointer'
      >
        <IoClose />
      </span>
      <div className='flex'>
        <input
          className={`h-[40px] bg-white border border-[#2b6cb033] border-e-0 rounded ps-3 rounded-e-none placeholder-[#718096] grow`}
          type="text"
          name='name'
          placeholder='اسم القسم'
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className='w-[50px] flex justify-center items-center shadow text-xl text-[#3d4148] bg-white border border-[#2b6cb033] rounded rounded-s-none'>
          <BsAlphabet />
        </div>
      </div>
      {
        errors.name && touched.name &&
        <p className='error text-[#dc3545]'>{errors.name}</p>
      }
      <div className='relative'>
        <select
          name="yearId"
          value={values.yearId}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full h-[40px] text-lg bg-white border border-[#2b6cb033] rounded ps-3`}
        >
          {
            years.map((year, index) => (
              <option key={id[index]} value={id[index]}>{year}</option>
            ))
          }
        </select>
        <div className='absolute top-1/2 -translate-y-1/2 end-[10px] pointer-events-none'>
          <IoMdArrowDropdown />
        </div>
      </div>
      {
        errors.yearId && touched.yearId &&
        <p className='error text-[#dc3545]'>{errors.yearId}</p>
      }
      <button
        disabled={isSubmitting}
        type='submit'
        className='h-[40px] mt-3 relative flex items-center justify-center gap-4 bg-[#3182ce] hover:bg-[#2b6cb0] text-white border border-[#3182ce] rounded duration-200 overflow-hidden cursor-pointer outline-none'
      >
        submit
      </button>
    </form>
  )
}

export default PopUpSections