import { Link } from "react-router-dom";

const GenralGPA = ({ page, content, color }) => {
  return (
    <Link
      to={page}
      className={`${color} font-bold md:w-fit text-center block px-4 py-2 text-white rounded-lg cursor-pointer`}
    >
      {content}
    </Link>
  );
};

export default GenralGPA;
