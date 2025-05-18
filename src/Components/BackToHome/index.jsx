import { Link } from "react-router-dom"

const BackToHome = () => {
  return (
    <Link
      to={"/"}
      className="px-6 py-2 rounded-lg text-white text-center font-semibold bg-[#2a52be] hover:bg-[#1a43b3] hover:shadow-lg duration-300 tracking-wider outline-none"
    >
      الرجوع للرئيسية
    </Link>
  )
}

export default BackToHome