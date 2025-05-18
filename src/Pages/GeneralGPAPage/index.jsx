import { useEffect, useState } from 'react'
import Table from '../../Components/Table';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../../Store';
import axios from 'axios';
import NoContent from '../../Components/NoContent';
import Loader from '../../Layout/Loader';

const GeneralGPAPage = () => {
  // Hooks
  const navigate = useNavigate();
  const { yearId } = useParams();
  // Global State
  const { BASE_URL, token, generalGPAActive, user } = useStore();
  // Local State
  const [loader, setLoader] = useState(true);
  const [generalGPAId, setGeneralGPAId] = useState([]);
  const [generalGPA, setGeneralGPA] = useState([]);
  const [singleSubject, setSingleSubject] = useState({});
  const [pagenatedArray, setPagenatedArray] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const getData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}degree/studentDegrees/${user.id}/${yearId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newGeneralGPA = [];
      const newId = [];
      res.data.studentDegrees.forEach((el, index) => {
        newGeneralGPA.push({
          id: index + 1,
          name: el.subjectId.name,
          term: el.subjectId.term === "FirstTerm" ? "الاول" : "الثاني",
          highestDegree: el.subjectId.highestDegree,
          subjectDegree: el.subjectDegree,
          GBA: el.GBA,
          grade: el.grade,
          hoursNumber: el.hoursNumber,
        });
        newId.push(el._id);
      })
      setSingleSubject({
        yearGba: res.data.yearGba,
        yearGrade: res.data.yearGrade,
      })
      setGeneralGPA(newGeneralGPA);
      setGeneralGPAId(newId);
      const newPagenatedArray = []
      for (let i = (page - 1) * limit; i < (page * limit); i++) {
        const el = newGeneralGPA[i];
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
    generalGPAActive();
  }, []);

  // Pagenate Data
  const pagenateData = () => {
    const newArray = []
    for (let i = (page - 1) * limit; i < (page * limit); i++) {
      const el = generalGPA[i];
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
    <div className='grow relative px-6 py-4'>
      {
        loader
          ?
          <Loader />
          :
          <>
            {
              generalGPA.length != 0
                ?
                <>
                  <div className="actions w-fit mx-auto bg-[#2a52be] px-6 py-4 text-xl text-center md:text-start shadow text-[#171e2e] dark:text-gray-300 rounded">
                    <div>
                      التقدير العام:
                      <span className='ms-2'>{singleSubject.yearGrade}</span> - {singleSubject.yearGba}
                    </div>
                  </div>
                  <Table
                    headers={["#", "المادة", "الترم", "الدرجة النهائية", "درجة الطالب", "GPA", "التقدير", ""]}
                    tableData={generalGPA}
                    id={generalGPAId}
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

export default GeneralGPAPage