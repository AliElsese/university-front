import { useEffect, useState } from "react";
import { useStore } from "../../Store"
import NoContent from "../../Components/NoContent";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../Layout/Loader";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import SearchInput from './../../Components/SearchInput/';
import Table from './../../Components/Table';

const Finance = () => {
  const navigate = useNavigate();
  const { yearId } = useParams();
  // Global State
  const {
    BASE_URL,
    token,
    financeActive,
  } = useStore();
  // Local State
  const [loader, setLoader] = useState([]);
  const [financeId, setFinanceId] = useState([]);
  const [finance, setFinance] = useState([]);
  const [pagenatedArray, setPagenatedArray] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const getData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}payment/getStudentsYearCost/${yearId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newFinance = [];
      const newId = [];
      res.data.payments.forEach((el, index) => {
        newFinance.push({
          id: index + 1,
          name: el.studentId.name,
          yearCost: el.yearCost,
          isPaid: el.isPaid ? "مدفوع" : "غير مدفوع",
        });
        newId.push(el._id);
      })
      setFinance(newFinance);
      setFinanceId(newId);
      const newPagenatedArray = []
      for (let i = (page - 1) * limit; i < (page * limit); i++) {
        const el = newFinance[i];
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
    financeActive();
  }, []);

  // Pagenate Data
  const pagenateData = () => {
    const newArray = []
    for (let i = (page - 1) * limit; i < (page * limit); i++) {
      const el = finance[i];
      if (el) {
        newArray.push(el);
      }
    }
    setPagenatedArray(newArray);
  }

  useEffect(() => {
    pagenateData();
  }, [page, limit])

  // Confirm payment 
  const confirmPayment = async (id) => {
    const value = {
      paymentId: `${id}`
    }
    try {
      const res = await axios.post(`${BASE_URL}payment/confirmPayment`, value, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const notify = () => toast.success(`${res.data.message}`, { autoClose: 1000 });
      notify();
      getData();
    } catch (error) {
      const notify = () => toast.error(`${error.response.data.message}`, { autoClose: 2000 });
      notify();
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
            <div className="min-h-full pt-2 flex flex-col gap-2">
              <div
                className="actions flex md:flex-row md:justify-between md:items-end flex-col-reverse gap-2"
              >
                {
                  finance.length != 0
                  &&
                  <SearchInput
                    data={finance}
                    setData={setPagenatedArray}
                    page={page}
                    limit={limit}
                  />
                }
              </div>
              {
                finance.length != 0
                  ?
                  <>
                    <Table
                      headers={["#", "الطالب", "سعر السنة", "الحالة", "", ""]}
                      tableData={finance}
                      id={financeId}
                      confirmPayment={confirmPayment}
                      pagenatedArray={pagenatedArray}
                      page={page}
                      setPage={setPage}
                      limit={limit}
                      setLimit={setLimit}
                    />
                    <ToastContainer />
                  </>
                  :
                  <NoContent data="مصاريف" />
              }
            </div>
          </>
      }
    </div>
  )
}

export default Finance