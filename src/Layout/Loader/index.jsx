import style from "./index.module.css";

const Loader = () => {

  return (
    <div className="absolute top-0 end-0 bottom-0 start-0 z-50 flex justify-center items-center bg-[#171e2e61] dark:bg-gray-900 backdrop-blur">
      <span className={`${style.loader}`}></span>
    </div>
  )
}

export default Loader