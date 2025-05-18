import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../../Store";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../Components/Table";
import { ToastContainer } from "react-toastify";
import SearchInput from "../../Components/SearchInput";
import NoContent from "../../Components/NoContent";
import Loader from './../../Layout/Loader';
import UpdateDegree from "../../Components/UpdateDegree";

const MarkesPage = () => {
  const navigate = useNavigate();
  const { subjectsName } = useParams();
  // Global State
  const {
    BASE_URL,
    user,
    token,
    popUpUpdateToggel,
    popUpUpdateIsClosed,
    markesActive

  } = useStore();
  // Local State
  const [loader, setLoader] = useState(true);
  const [marksId, setMarksId] = useState([]);
  const [marks, setMarks] = useState([]);
  const [filterdMarks, setFilterdMarks] = useState([]);
  const [degree, setDegree] = useState({});
  const [pagenatedArray, setPagenatedArray] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);



  const getData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}degree/showSubjectDegrees/${subjectsName}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newMarks = [];
      const newId = [];
      res.data.degrees.forEach((el, index) => {
        if (user.role === "student") {
          if (user.id === el.studentId._id) {
            newMarks.push({
              subjectDegree: el.subjectDegree,
              GBA: el.GBA,
              grade: el.grade,
            });
          }
        } else {
          newMarks.push({
            id: index + 1,
            name: el.studentId.name,
            subjectDegree: el.subjectDegree,
            GBA: el.GBA,
            grade: el.grade,
          });
        }
        newId.push(el._id);
      })
      setMarks(newMarks);
      setMarksId(newId);
      const newPagenatedArray = []
      for (let i = (page - 1) * limit; i < (page * limit); i++) {
        const el = newMarks[i];
        if (el) {
          newPagenatedArray.push(el);
        }
      }
      setPagenatedArray(newPagenatedArray);
      setTimeout(() => {
        setLoader(false);
      }, 200);
    } catch (error) {
      navigate("/error")
    }
  }

  useEffect(() => {
    getData();
    markesActive();
  }, []);

  // Pagenate Data
  const pagenateData = () => {
    const newArray = []
    for (let i = (page - 1) * limit; i < (page * limit); i++) {
      const el = marks[i];
      if (el) {
        newArray.push(el);
      }
    }
    setPagenatedArray(newArray);
  }

  useEffect(() => {
    pagenateData();
  }, [page, limit])

  // get degree
  const getDegree = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}degree/findOne/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newdegree = {};
      newdegree.id = res.data.subjectDegree._id;
      newdegree.subjectDegree = res.data.subjectDegree.subjectDegree;
      newdegree.subjectId = res.data.subjectDegree.subjectId;
      setDegree({ ...newdegree });
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
              popUpUpdateToggel &&
              <div
                onClick={popUpUpdateIsClosed}
                className="fixed top-0 end-0 bottom-0 start-0 z-50 flex justify-center items-center bg-[#171e2e61] backdrop-blur"
              >
                <UpdateDegree data={degree} getData={getData} />
              </div>
            }
            <div className="min-h-full pt-2 flex flex-col gap-2">

              {
                marks.length !== 0
                  ?
                  <>
                    {
                      user.role !== "student"
                      &&
                      <div
                        className="actions flex md:flex-row md:justify-between md:items-end flex-col-reverse gap-2"
                      >
                        <SearchInput
                          data={marks}
                          setData={setPagenatedArray}
                          page={page}
                          limit={limit}
                        />
                      </div>
                    }
                    <Table
                      headers={user.role === "student" ? ["الدرجة", "GPA", "grade", ""] : ["#", "الطالب", "الدرجة", "GPA", "grade", ""]}
                      tableData={marks}
                      id={marksId}
                      pagenatedArray={pagenatedArray}
                      page={page}
                      setPage={setPage}
                      limit={limit}
                      setLimit={setLimit}
                      getOneData={getDegree}
                    />
                    <ToastContainer />
                  </>
                  :
                  <div className="h-full flex justify-center items-center">
                    <NoContent data="درجات لهذه المادة" />
                  </div>
              }
            </div>
          </>
      }
    </div>
  )
}

export default MarkesPage