import { useEffect, useState } from "react";
import MSectionsCard from "../../Components/MSectionsCard"
import Navbar from "../../Layout/Navbar"
import { useStore } from "../../Store";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UpdateSection from "../../Components/UpdateSection";
import Confirmation from "../../Components/Confirmation";
import gifBg from '/Assets/bg-vedio.mp4';

const MSectionsPage = () => {
  const navigate = useNavigate();
  // Global State
  const {
    BASE_URL,
    token,
    sectionsActive,
    mSections,
    setMSections,
    popUpUpdateToggel,
    popUpUpdateIsClosed,
    popUpUpdateIsOpen,
    confirmationPopUpToggel,
    confirmationPopUpIsClosed
  } = useStore();
  // Local State
  const [section, setSection] = useState({});

  const getData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}section/findAll`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMSections(res.data.sections);
    } catch (error) {
      navigate("/error")
    }
  }
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    getData();
    sectionsActive();
  }, []);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  // get Section
  const getSection = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}section/findOne/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newSection = {};
      newSection.id = res.data.section._id;
      newSection.name = res.data.section.name;
      newSection.slug = res.data.section.slug;
      setSection({ ...newSection });
    } catch (error) {
      navigate("/error");
    }
  }


  return (
    <div className="relative">
      <video autoPlay muted loop playsInline
        className="absolute z-10 top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2">
        <source src={gifBg} type="video/mp4" />
      </video>
      <div className="relative z-50 min-h-screen flex flex-col bg-[#0000004a] dark:bg-[#0d1321cc] backdrop-blur">
        <Navbar />
        <div
          className="grow px-5 md:px-10 xl:px-50 flex items-center gap-5 flex-wrap pt-5"
        >
          {
            confirmationPopUpToggel
            &&
            <div
              onClick={confirmationPopUpIsClosed}
              className="fixed top-0 end-0 bottom-0 start-0 z-50 flex justify-center items-center bg-[#171e2e61] backdrop-blur"
            >
              <Confirmation type="التعديل" passedFunction={() => {
                popUpUpdateIsOpen();
                confirmationPopUpIsClosed();
              }} />
            </div>
          }
          {
            popUpUpdateToggel &&
            <div
              onClick={popUpUpdateIsClosed}
              className="fixed top-0 end-0 bottom-0 start-0 z-50 flex justify-center items-center bg-[#171e2e61] backdrop-blur"
            >
              <UpdateSection data={section} getData={getData} />
            </div>
          }
          {
            mSections
            &&
            mSections.map((section) => (
              <MSectionsCard key={section._id} id={section._id} getOneData={getSection} name={section.name} />
            ))
          }
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default MSectionsPage