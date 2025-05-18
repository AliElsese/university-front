import { useEffect, useState } from 'react'
import Table from '../../Components/Table';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../Store';
import SearchInput from '../../Components/SearchInput';
import axios from 'axios';
import NoContent from '../../Components/NoContent';
import Loader from '../../Layout/Loader';

const DoctorSubjects = () => {
  const navigate = useNavigate();
  // Global State
  const { BASE_URL, token, doctorSubjectsActive, user } = useStore();
  // Local State
  const [loader, setLoader] = useState(true);
  const [subjectId, setSubjectId] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [pagenatedArray, setPagenatedArray] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const getData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}subject/getDoctorSubjects/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newSubjects = [];
      const newId = [];
      res.data.subjects.forEach((el, index) => {
        newSubjects.push({
          id: index + 1,
          name: el.name,
          code: el.code,
          hoursNumber: el.hoursNumber,
          highestDegree: el.highestDegree,
          term: el.term === "FirstTerm" ? "اولي" : "ثانية",
        });
        newId.push(el._id);
      })
      setSubjects(newSubjects);
      setSubjectId(newId);
      const newPagenatedArray = []
      for (let i = (page - 1) * limit; i < (page * limit); i++) {
        const el = newSubjects[i];
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
    doctorSubjectsActive();
  }, []);

  // Pagenate Data
  const pagenateData = () => {
    const newArray = []
    for (let i = (page - 1) * limit; i < (page * limit); i++) {
      const el = subjects[i];
      if (el) {
        newArray.push(el);
      }
    }
    setPagenatedArray(newArray);
  }

  useEffect(() => {
    pagenateData();
  }, [page, limit])

  return (
    <div className='grow relative px-6 py-2'>
      {
        loader
          ?
          <Loader />
          :
          <>
            {
              subjects.length != 0
                ?
                <>
                  <div
                    className="actions flex md:flex-row md:justify-between md:items-end flex-col-reverse gap-2"
                  >
                    <SearchInput
                      data={subjects}
                      setData={setPagenatedArray}
                      page={page}
                      limit={limit}
                    />
                  </div>
                  <Table
                    headers={["#", "اسم المادة", "كود المادة", "عدد الساعات", "اعلي درجة", "الترم", ""]}
                    tableData={subjects}
                    id={subjectId}
                    pagenatedArray={pagenatedArray}
                    page={page}
                    setPage={setPage}
                    limit={limit}
                    setLimit={setLimit}
                  />
                </>
                :
                <NoContent data="طلاب لهذه المادة" />
            }
          </>
      }
    </div>
  )
}

export default DoctorSubjects