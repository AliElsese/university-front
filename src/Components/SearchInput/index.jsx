import { useEffect, useRef, useState } from "react";

const SearchInput = ({ data, setData, page, limit }) => {
  const searchRef = useRef(null);
  const [filterd, setFilterd] = useState([]);

  const handleSearch = () => {
    const value = searchRef.current.value; // Get input value directly
    const filteredData = data.filter(el => el.name.toLowerCase().includes(value.toLowerCase()));
    setFilterd(filteredData);
  };

  useEffect(() => {
    if (filterd.length != 0) {
      const newArray = []
      for (let i = (page - 1) * limit; i < (page * limit); i++) {
        const el = filterd[i];
        if (el) {
          newArray.push(el);
        }
      }
      setData(newArray);
    } else {
      const newArray = []
      for (let i = (page - 1) * limit; i < (page * limit); i++) {
        const el = data[i];
        if (el) {
          newArray.push(el);
        }
      }
      setData(newArray);
    }
  }, [filterd, page, limit])

  return (
    <div>
      <input
        ref={searchRef} // Attach useRef
        className="w-full text-center md:text-start p-2 bg-gray-100 dark:bg-gray-800 shadow text-[#171e2e] dark:text-white rounded"
        type="search"
        name="search"
        placeholder="ابحث بالاسم"
        onChange={handleSearch} // Trigger filtering when typing
      />
    </div>
  );
};

export default SearchInput;
