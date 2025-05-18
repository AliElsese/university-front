import { useEffect, useState } from 'react'
import { useStore } from '../../Store'
import ChartPie from '../../Components/ChartsType/ChartPie';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../Layout/Loader';


const ChartPage = () => {
  // Hooks
  const { mSection } = useParams();
  const navigate = useNavigate();
  // Global State
  const { BASE_URL, token, chartActive } = useStore();
  // Local State
  const [smallCards, setSmallCards] = useState([]);
  const [yearsKeys] = useState(["ساقط", "مقبول", "جيد", "جيد جدا", "امتياز"]);
  const [yearsValues, setYearsValues] = useState([]);
  const [yearsData, setYearsData] = useState([]);
  // loader
  const [loader, setLoader] = useState(true)

  const colors = ['red', 'orange', 'yellow', "blue", "green"];

  const getData = async () => {
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
      setYearsData(res.data.data.yearsData);
      const newValues = [];
      res.data.data.yearsData.forEach((year) => {
        newValues.push(Object.values(year.students))
      })
      setYearsValues(newValues)
      setTimeout(() => {
        setLoader(false);
      }, 200);
    } catch (error) {
      // navigate("/error");
      console.log(error)
    }
  }

  useEffect(() => {
    getData();
    chartActive();
  }, [])

  return (
    <div className="grow relative px-6 mt-2">
      {
        loader
          ?
          <Loader />
          :
          <>
            <div className="grid grid-cols-12 gap-4 mb-4">
              {
                smallCards.map((card) => (
                  <div
                    key={Math.random()}
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
                    key={Math.random()}
                    className='col-span-12 md:col-span-6 lg:col-span-4 bg-[#171e2e26] dark:bg-gray-800 backdrop-blur shadow-lg rounded-lg'
                  >
                    <h2 className='text-center text-lg text-gray-200 font-bold py-3'>سنة {year.name}</h2>
                    <ChartPie keys={yearsKeys} values={yearsValues[index]} colors={colors} />
                  </div>
                ))
              }
            </div>
          </>
      }
    </div>
  );
}

export default ChartPage