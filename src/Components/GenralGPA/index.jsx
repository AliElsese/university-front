import { Link } from "react-router-dom";

const GenralGPA = ({ data, setData }) => {



  return (
    <div>
      <Link
        to={"general-gpa"}
        className="bg-green-500 font-bold md:w-fit sm:w-full px-4 py-3 text-white rounded-lg cursor-pointer"
      >
        التقدير العام
      </Link>
    </div>
  );
};

export default GenralGPA;
