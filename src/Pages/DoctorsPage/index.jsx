import { useEffect, useState } from "react";
import Table from "../../Components/Table";
import { useStore } from "../../Store";
import PopUpDoctors from "../../Components/PopUpDoctors";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import SearchInput from "../../Components/SearchInput";
import AddNewBtn from "../../Components/AddNewBtn";
import NoContent from "../../Components/NoContent";
import Loader from "../../Layout/Loader";
import UpdateDoctor from "../../Components/UpdateDoctor";

const DoctorsPage = () => {
  const navigate = useNavigate();
  const { mSection } = useParams();
  // Global State
  const {
    BASE_URL,
    token,
    popUpToggel,
    popUpIsClosed,
    popUpUpdateToggel,
    popUpUpdateIsClosed,
    doctorsActive,
    confirmationPopUpIsClosed,
  } = useStore();
  // Local State
  const [loader, setLoader] = useState(true);
  const [docotrId, setDocotrId] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [filterdDoctors, setFilterdDoctors] = useState([]);
  const [doctor, setDoctor] = useState({});
  const [pagenatedArray, setPagenatedArray] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const getData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}doctor/findAll/${mSection}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newDoctors = [];
      const newId = [];
      res.data.doctors.forEach((el, index) => {
        newDoctors.push({
          id: index + 1,
          name: el.name,
          nationalId: el.nationalId,
          phoneNumber: el.phoneNumber,
          email: el.email,
        });
        newId.push(el._id);
      })
      setDoctors(newDoctors);
      setDocotrId(newId);
      const newPagenatedArray = []
      for (let i = (page - 1) * limit; i < (page * limit); i++) {
        const el = newDoctors[i];
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
    doctorsActive();
  }, []);

  // Pagenate Data
  const pagenateData = () => {
    const newArray = []
    for (let i = (page - 1) * limit; i < (page * limit); i++) {
      const el = doctors[i];
      if (el) {
        newArray.push(el);
      }
    }
    setPagenatedArray(newArray);
  }

  useEffect(() => {
    pagenateData();
  }, [page, limit])

  // Delete Doctor
  const deleteRow = async (index) => {
    try {
      const res = await axios.delete(`${BASE_URL}doctor/deleteOne/${index}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const notify = () => toast.success(`${res.data.message}`, { autoClose: 1000 });
      notify();
      getData();
      confirmationPopUpIsClosed();
    } catch (error) {
      const notify = () => toast.error(`${error.response.data.message}`, { autoClose: 1000 });
      notify();
      confirmationPopUpIsClosed();
    }
  }

  // get Doctor
  const getDoctor = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}doctor/findOne/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newDoctor = {};
      newDoctor.id = res.data.doctor._id;
      newDoctor.name = res.data.doctor.name;
      newDoctor.nationalId = res.data.doctor.nationalId;
      newDoctor.phoneNumber = res.data.doctor.phoneNumber;
      newDoctor.email = res.data.doctor.email;
      newDoctor.major = res.data.doctor.major;
      setDoctor({ ...newDoctor });
    } catch (error) {
      navigate("/error");
      console.log(error)
    }
  }

  return (
    <div className="grow relative px-6">
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
                <PopUpDoctors getData={getData} />
              </div>
            }
            {
              popUpUpdateToggel &&
              <div
                onClick={popUpUpdateIsClosed}
                className="fixed top-0 end-0 bottom-0 start-0 z-50 flex justify-center items-center bg-[#171e2e61] backdrop-blur"
              >
                <UpdateDoctor data={doctor} getData={getData} />
              </div>
            }
            <div className="min-h-full pt-2 flex flex-col gap-2">
              <div
                className="actions flex md:flex-row md:justify-between md:items-end flex-col-reverse gap-2 mt-2"
              >
                {
                  doctors.length !== 0
                  &&
                  <SearchInput
                    data={doctors}
                    setData={setPagenatedArray}
                    page={page}
                    limit={limit}
                  />
                }
                <AddNewBtn />
              </div>
              {
                doctors.length != 0
                  ?
                  <>
                    <Table
                      headers={["#", "الأسم", "الرقم القومي", "الهاتف", "البريد الالكتروني", ""]}
                      tableData={doctors}
                      id={docotrId}
                      pagenatedArray={pagenatedArray}
                      page={page}
                      setPage={setPage}
                      limit={limit}
                      setLimit={setLimit}
                      deleteRow={deleteRow}
                      getOneData={getDoctor}
                    />
                    <ToastContainer />
                  </>
                  :
                  <NoContent data="طلاب لهذه المادة" />
              }
            </div>
          </>
      }
    </div>
  )
}

export default DoctorsPage