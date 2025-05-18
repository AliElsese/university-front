import style from "./index.module.css"
import { useEffect, useState } from "react";
import { useStore } from "../../Store";
import axios from "axios";

const LayoutLoader = () => {
  const { BASE_URL, token, setUser } = useStore();

  const getUser = async () => {
    let newUser = {}
    try {
      const res = await axios.get(`${BASE_URL}auth/userData`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      newUser = {
        role: res.data.role,
        id: res.data.data._id,
        name: res.data.data.name,
        nationalId: res.data.data.nationalId,
        phoneNumber: res.data.data.phoneNumber,
        email: res.data.data.email,
      }
      setTimeout(() => {
        setUser(newUser);
      }, 1000);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <div className="fixed top-0 end-0 bottom-0 start-0 z-50 flex justify-center items-center bg-[#171e2e61] dark:bg-gray-900 backdrop-blur">
      <span className={`${style.loader}`}></span>
    </div>
  )
}

export default LayoutLoader