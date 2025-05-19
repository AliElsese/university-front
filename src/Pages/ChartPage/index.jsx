import { useEffect, useState } from 'react'
import { useStore } from '../../Store'
import ChartPie from '../../Components/ChartsType/ChartPie';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../Layout/Loader';


const ChartPage = () => {
  // Hooks
  const { mSection, yearId } = useParams();
  const navigate = useNavigate();
  // Global State
  const { BASE_URL, token, chartActive, user } = useStore();
  // Local State
  const [smallCards, setSmallCards] = useState([]);
  const [degreesKeys] = useState(["ساقط", "مقبول", "جيد", "جيد جدا", "امتياز"]);
  const [degreesValues, setDegreesValues] = useState([]);
  const [financeKeys] = useState(["لم يدفع", "دفع"]);
  const [financeValues, setFinanceValues] = useState([]);
  const [yearsData, setYearsData] = useState([]);
  const [subjectsData, setSubjectsData] = useState([]);
  // loader
  const [loader, setLoader] = useState(true)

  const degreesColors = ['red', 'orange', 'yellow', "blue", "green"];
  const financeColors = ['red', "green"];

  const getEmployeeStatistic = async () => {
    try {
      const res = await axios.get(`${BASE_URL}student/getStatistics/${mSection}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSmallCards([
        {
          name: "الدكاترة",
          number: res.data.data.doctorsNumber
        },
        {
          name: "الطلاب",
          number: res.data.data.studentsNumber
        },
        {
          name: "المواد",
          number: res.data.data.subjectsNumber
        },
      ])
      const newDegrees = [];
      const newPayments = [];
      res.data.data.yearsData.forEach((year) => {
        newDegrees.push(Object.values(year.students))
        newPayments.push(Object.values(year.payments))
      })
      setYearsData(res.data.data.yearsData);
      setDegreesValues(newDegrees);
      setFinanceValues(newPayments);
      setTimeout(() => {
        setLoader(false);
      }, 200);
    } catch (error) {
      navigate("/error");
    }
  }
  const getDoctorStatistic = async () => {
    try {
      const res = await axios.get(`${BASE_URL}doctor/getStatistics/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newDegrees = [];
      res.data.data.subjectsData.forEach((year) => {
        newDegrees.push(Object.values(year.students))
      })
      setSubjectsData(res.data.data.subjectsData);
      setDegreesValues(newDegrees);
      setTimeout(() => {
        setLoader(false);
      }, 200);
    } catch (error) {
      navigate("/error");
    }
  }
  const getStudentStatistic = async () => {
    try {
      const res = await axios.get(`${BASE_URL}student/getStudentStatistics/${yearId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newDegrees = [];
      res.data.data.subjectsData.forEach((year) => {
        newDegrees.push(Object.values(year.students))
      })
      setSubjectsData(res.data.data.subjectsData);
      setDegreesValues(newDegrees);
      setTimeout(() => {
        setLoader(false);
      }, 200);
    } catch (error) {
      // navigate("/error");
      console.log(error)

    }
  }

  useEffect(() => {
    chartActive();
    if (user.role === "employee") {
      getEmployeeStatistic()
    }
    else if (user.role === "doctor") {
      getDoctorStatistic();
    }
    else {
      getStudentStatistic();
    }
  }, [])

  return (
    <div className="grow relative px-6 py-2">
      {
        loader
          ?
          <Loader />
          :
          <>
            {
              user.role === "employee"
                ?
                <div className='flex flex-col gap-4'>
                  <div className="grid grid-cols-12 gap-4">
                    {
                      smallCards.map((card) => (
                        <div
                          key={Math.random() * Math.random()}
                          className='col-span-12 md:col-span-6 lg:col-span-4 bg-[#171e2e26] dark:bg-gray-800 backdrop-blur shadow-lg rounded-lg p-5 text-gray-200 font-bold flex flex-col items-center justify-center'
                        >
                          <h2>عدد {card.name}</h2>
                          <p className='text-8xl'>{card.number}</p>
                        </div>
                      ))
                    }
                  </div>
                  <div className='grid grid-cols-12 gap-4'>
                    {
                      yearsData.map((year, index) => (
                        <div
                          key={Math.random() * Math.random()}
                          className='col-span-12 md:col-span-6 lg:col-span-4 bg-[#171e2e26] dark:bg-gray-800 backdrop-blur shadow-lg rounded-lg'
                        >
                          <h2 className='text-center text-lg text-gray-200 font-bold py-3'>درجات سنة {year.name}</h2>
                          <ChartPie
                            keys={degreesKeys}
                            values={degreesValues[index]}
                            colors={degreesColors}
                          />
                        </div>
                      ))
                    }
                    {
                      yearsData.map((year, index) => (
                        <div
                          key={Math.random() * Math.random()}
                          className='col-span-12 md:col-span-6 lg:col-span-4 bg-[#171e2e26] dark:bg-gray-800 backdrop-blur shadow-lg rounded-lg'
                        >
                          <h2 className='text-center text-lg text-gray-200 font-bold py-3'>مصاريف سنة {year.name}</h2>
                          <ChartPie
                            keys={financeKeys}
                            values={financeValues[index]}
                            colors={financeColors}
                          />
                        </div>
                      ))
                    }
                  </div>
                </div>
                : user.role === "doctor"
                  ?
                  <div className='flex flex-col gap-4'>
                    <div className='grid grid-cols-12 gap-4'>
                      {
                        subjectsData.map((year, index) => (
                          <div
                            key={Math.random() * Math.random()}
                            className='col-span-12 md:col-span-6 lg:col-span-4 bg-[#171e2e26] dark:bg-gray-800 backdrop-blur shadow-lg rounded-lg'
                          >
                            <h2 className='text-center text-lg text-gray-200 font-bold py-3'>
                              درجات {year.name}
                            </h2>
                            <ChartPie
                              keys={degreesKeys}
                              values={degreesValues[index]}
                              colors={degreesColors}
                            />
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  :
                  <div className='flex flex-col gap-4'>
                    <div className='grid grid-cols-12 gap-4'>
                      {
                        subjectsData.map((year, index) => (
                          <div
                            key={Math.random() * Math.random()}
                            className='col-span-12 md:col-span-6 lg:col-span-4 bg-[#171e2e26] dark:bg-gray-800 backdrop-blur shadow-lg rounded-lg'
                          >
                            <h2 className='text-center text-lg text-gray-200 font-bold py-3'>
                              درجات {year.name}
                            </h2>
                            <ChartPie
                              keys={degreesKeys}
                              values={degreesValues[index]}
                              colors={degreesColors}
                            />
                          </div>
                        ))
                      }
                    </div>
                  </div>
            }
          </>
      }
    </div>
  );
}

export default ChartPage