import axios from "axios";
import { useStore } from "../../Store";
import { toast } from "react-toastify";

const NextYearBtn = ({ yearId, nextYearId }) => {
  const { BASE_URL, token } = useStore();
  const moveStudents = async () => {
    try {
      const res = await axios.post(`${BASE_URL}degree/passStudentToNextYear/${yearId}/${nextYearId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(res)
      toast.success(res.data.message, { autoClose: 1000 });
    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 2000 });
      console.log(error)
    }
  }
  return (
    <button
      onClick={moveStudents}
      className={`bg-emerald-500 font-bold md:w-fit text-center block px-4 py-2 text-white rounded-lg cursor-pointer`}
    >
      نقل الطلاب
    </button>
  )
}

export default NextYearBtn