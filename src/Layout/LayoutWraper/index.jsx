import Sidebar from '../Sidebar'
import Navbar from '../Navbar'
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../Store';
import { useEffect } from 'react';
import gifBg from '/Assets/bg-vedio.mp4';

const LayoutWraper = ({ children }) => {
  const { token } = useStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return (
    <div className="flex">
      <video autoPlay muted loop playsInline
        className="absolute z-10 top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2">
        <source src={gifBg} type="video/mp4" />
      </video>
      <div className='relative z-50 bg-[#0000004a] dark:bg-[#0d1321cc] backdrop-blur'>
        <Sidebar />
      </div>
      <div className="grow relative z-40 overflow-auto h-screen flex flex-col bg-[#0000004a] dark:bg-[#0d1321cc] backdrop-blur">
        <Navbar />
        {children}
      </div>
    </div>
  )
}

export default LayoutWraper