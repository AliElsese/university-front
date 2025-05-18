import { useEffect, useState } from "react";
import Table from "../../Components/Table";
import { useStore } from "../../Store";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import PopUpYears from "../../Components/PopUpYears";
import { ToastContainer, toast } from "react-toastify";
import AddNewBtn from "../../Components/AddNewBtn";
import SearchInput from "../../Components/SearchInput";
import NoContent from "../../Components/NoContent";
import Loader from "../../Layout/Loader";
import UpdateYear from "../../Components/UpdateYear";

const StudyYearsPage = () => {
  const navigate = useNavigate();
  // Global State
  const { BASE_URL,
    token,
    popUpToggel,
    popUpIsClosed,
    popUpUpdateToggel,
    popUpUpdateIsClosed,
    confirmationPopUpIsClosed,
    yearsActive,
  } = useStore();
  const { mSection } = useParams();
  // loader
  const [loader, setLoader] = useState(true)
  // Data
  const [yearId, setYearId] = useState([]);
  const [years, setYears] = useState([]);
  const [year, setYear] = useState({});
  const [pagenatedArray, setPagenatedArray] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);


  const getData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}year/findAll/${mSection}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newYears = [];
      const newId = [];
      res.data.years.forEach((el, index) => {
        newYears.push({
          id: index + 1,
          name: el.name
        });
        newId.push(el._id);
      })
      setYears(newYears);
      setYearId(newId);
      const newPagenatedArray = []
      for (let i = (page - 1) * limit; i < (page * limit); i++) {
        const el = newYears[i];
        if (el) {
          newPagenatedArray.push(el);
        }
      }
      setPagenatedArray(newPagenatedArray);
      setTimeout(() => {
        setLoader(false);
      }, 200);
    } catch (error) {
      navigate("/error");
    }
  }

  useEffect(() => {
    getData();
    yearsActive();
  }, []);

  // Pagenate Data
  const pagenateData = () => {
    const newArray = []
    for (let i = (page - 1) * limit; i < (page * limit); i++) {
      const el = years[i];
      if (el) {
        newArray.push(el);
      }
    }
    setPagenatedArray(newArray);
  }

  useEffect(() => {
    pagenateData();
  }, [page, limit])

  // Delete Year
  const deleteRow = async (index) => {
    try {
      const res = await axios.delete(`${BASE_URL}year/deleteOne/${index}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const notify = () => toast.success(`${res.data.message}`, { autoClose: 1000 });
      notify();
      getData();
      confirmationPopUpIsClosed();
    } catch (error) {
      const notify = () => toast.error(`${error.response.data.message}`, { autoClose: 2000 });
      notify();
      confirmationPopUpIsClosed();
    }
  }

  // get Year
  const getYear = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}year/findOne/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newYear = {};
      newYear.id = res.data.year._id;
      newYear.name = res.data.year.name;
      setYear({ ...newYear });
    } catch (error) {
      navigate("/error");
    }
  }

  return (
    <div className="grow relative px-6 py-2">
      {
        loader
          ?
          <Loader />
          :
          <>
            {
              popUpToggel &&
              <div
                onClick={popUpIsClosed}
                className="fixed top-0 end-0 bottom-0 start-0 z-50 flex justify-center items-center bg-[#171e2e61] backdrop-blur"
              >
                <PopUpYears getData={getData} />
              </div>
            }
            {
              popUpUpdateToggel &&
              <div
                onClick={popUpUpdateIsClosed}
                className="fixed top-0 end-0 bottom-0 start-0 z-50 flex justify-center items-center bg-[#171e2e61] backdrop-blur"
              >
                <UpdateYear data={year} getData={getData} />
              </div>
            }
            <div className="min-h-full pt-2 flex flex-col gap-2">
              <div
                className="actions flex md:flex-row md:justify-between md:items-end flex-col-reverse gap-2"
              >
                {
                  years.length != 0
                  &&
                  <SearchInput
                    data={years}
                    setData={setPagenatedArray}
                    page={page}
                    limit={limit}
                  />
                }
                <AddNewBtn />
              </div>
              {
                years.length != 0
                  ?
                  <>
                    <Table
                      headers={["#", "السـنة الدراسية", "", "المصاريف"]}
                      tableData={years}
                      id={yearId}
                      pagenatedArray={pagenatedArray}
                      page={page}
                      setPage={setPage}
                      limit={limit}
                      setLimit={setLimit}
                      deleteRow={deleteRow}
                      getOneData={getYear}
                    />
                    <ToastContainer />
                  </>
                  :
                  <NoContent data="سنين" />
              }
            </div>
          </>
      }
    </div>
  )
}

export default StudyYearsPage