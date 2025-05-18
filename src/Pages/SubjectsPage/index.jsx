import { useEffect, useState } from 'react'
import Table from '../../Components/Table';
import { useStore } from '../../Store';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import PopUpSubjects from '../../Components/PopUpSubjects';
import { useNavigate, useParams } from 'react-router-dom';
import SearchInput from '../../Components/SearchInput';
import AddNewBtn from '../../Components/AddNewBtn';
import NoContent from '../../Components/NoContent';
import Loader from '../../Layout/Loader';
import UpdateSubject from '../../Components/UpdateSubject';

const SubjectsPage = () => {
  const navigate = useNavigate();
  const { mSection } = useParams();
  // Golbal state
  const { BASE_URL,
    token,
    popUpToggel,
    popUpIsClosed,
    popUpUpdateToggel,
    popUpUpdateIsClosed,
    mSections,
    subjectsActive,
    confirmationPopUpIsClosed
  } = useStore();
  // Local State
  const [loader, setLoader] = useState(true);
  const [subjectId, setSubjectId] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState({});
  const [slug, setSlug] = useState(null);
  const [pagenatedArray, setPagenatedArray] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const getCurrentSlug = () => {
    mSections.forEach((el) => {
      if (mSection === el.name) {
        setSlug(el.slug);
      }
    })
  }


  const getData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}subject/findAll/${mSection}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newSubjects = [];
      const newId = [];
      res.data.newSubjects.forEach((el, index) => {
        newSubjects.push({
          id: index + 1,
          name: el.name,
          code: el.code,
          hoursNumber: el.hoursNumber,
          highestDegree: el.highestDegree,
          doctorName: el.doctorName,
          yearName: el.yearName,
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
    subjectsActive();
    getCurrentSlug();
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

  // Delete Subject
  const deleteRow = async (index) => {
    try {
      const res = await axios.delete(`${BASE_URL}subject/deleteOne/${index}`, {
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

  // get Subject
  const getSubject = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}subject/findOne/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newSubject = {};
      newSubject.id = res.data.newSubject._id;
      newSubject.name = res.data.newSubject.name;
      newSubject.yearName = res.data.newSubject.yearName;
      newSubject.hoursNumber = res.data.newSubject.hoursNumber;
      newSubject.highestDegree = res.data.newSubject.highestDegree;
      newSubject.doctorName = res.data.newSubject.doctorName;
      newSubject.code = res.data.newSubject.code;
      newSubject.term = res.data.newSubject.term;
      setSubject({ ...newSubject });
    } catch (error) {
      navigate("/error");
    }
  }

  return (
    <div className='grow relative px-6 py-2'>
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
                <PopUpSubjects slug={slug} getData={getData} />
              </div>
            }
            {
              popUpUpdateToggel &&
              <div
                onClick={popUpUpdateIsClosed}
                className="fixed top-0 end-0 bottom-0 start-0 z-50 flex justify-center items-center bg-[#171e2e61] backdrop-blur"
              >
                <UpdateSubject data={subject} getData={getData} />
              </div>
            }
            <div className='min-h-full pt-2 flex flex-col gap-2'>
              <div
                className="actions flex md:flex-row md:justify-between md:items-end flex-col-reverse gap-2"
              >
                {
                  subjects.length !== 0
                  &&
                  <SearchInput
                    data={subjects}
                    setData={setPagenatedArray}
                    page={page}
                    limit={limit}
                  />
                }
                <AddNewBtn />
              </div>
              {
                subjects.length !== 0
                  ?
                  <>
                    <Table
                      headers={["#", "الأسم", "الكود", "عدد الساعات", "اعلي درجة", "دكتور", "السنة", "", "الدرجات"]}
                      tableData={subjects}
                      id={subjectId}
                      pagenatedArray={pagenatedArray}
                      page={page}
                      setPage={setPage}
                      limit={limit}
                      setLimit={setLimit}
                      deleteRow={deleteRow}
                      getOneData={getSubject}
                    />
                    <ToastContainer />
                  </>
                  :
                  <NoContent data="مواد" />
              }
            </div>
          </>
      }
    </div>
  )
}

export default SubjectsPage