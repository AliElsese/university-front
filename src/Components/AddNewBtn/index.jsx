import { useStore } from '../../Store';
import { TiPlus } from "react-icons/ti";

const AddNewBtn = () => {
  const { popUpIsOpen } = useStore();
  return (
    <div
      onClick={() => { popUpIsOpen() }}
      className="addnew group flex items-center justify-center gap-4 bg-gray-100 dark:bg-gray-800 md:w-fit sm:w-full px-4 py-2 text-[#171e2e] dark:text-gray-400 rounded-lg border-2 border-gray-500 dark:border-gray-600 border-dashed cursor-pointer"
    >
      <span className="group-hover:text-gray-900 dark:group-hover:text-white duration-150">
        اضافة جديد
      </span>
      <div className="group-hover:shadow dark:group-hover:text-white duration-150 p-[5px] text-sm bg-white shadow dark:bg-gray-900 rounded-full">
        <TiPlus />
      </div>
    </div>
  )
}

export default AddNewBtn