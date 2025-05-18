import React, { useEffect, useState } from 'react'
import { useStore } from '../../Store';
import Table from '../../Components/Table';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import SubmitSheet from '../../Components/SubmitSheet';
import NoContent from '../../Components/NoContent';
import Loader from '../../Layout/Loader';

const SingleSubject = () => {
  const navigate = useNavigate();
  const { subjectsName } = useParams()
  // Global State
  const { BASE_URL, token, singleSubjectActive } = useStore();
  // Local State
  const [loader, setLoader] = useState(true);
  const [marks, setMarks] = useState([]);
  const [markId, setMarkId] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}subject/getSubjectStudents/${subjectsName}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newMarks = [];
      const newId = [];
      res.data.students.forEach((el, index) => {
        newMarks.push({
          id: index + 1,
          name: el.studentId.name,
          universityId: el.studentId.universityId,
        });
        newId.push(el.studentId._id);
      })
      setMarks(newMarks);
      setMarkId(newId);
      setTimeout(() => {
        setLoader(false);
      }, 200);
    } catch (error) {
      navigate("/error")
    }
  }

  useEffect(() => {
    getData();
    singleSubjectActive();
  }, []);

  return (
    <div className='grow relative px-6 py-2'>
      {
        loader
          ?
          <Loader />
          :
          <>
            {
              marks.length !== 0
                ?
                <div className='flex justify-center items-center'>
                  <SubmitSheet
                    getData={getData}
                    headers={["#", "الطالب", "رقم الجلوس", "الدرجة"]}
                    tableData={marks}
                    id={markId}
                  />
                  <ToastContainer />
                </div>
                :
                <div className="h-full flex justify-center items-center">
                  <NoContent data="طلاب لهذه المادة" />
                </div>
            }
          </>
      }
    </div>
  )
}

export default SingleSubject