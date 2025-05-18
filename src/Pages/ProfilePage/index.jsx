import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../../Components/ProfileCard";
import { useStore } from "../../Store";
import Loader from './../../Layout/Loader';


const ProfilePage = () => {
  const navigate = useNavigate();
  // Global State
  const { profileActive, token } = useStore();
  // Local State
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    profileActive();
    if (!token) {
      navigate("/login");
    }
    setTimeout(() => {
      setLoader(false);
    }, 300);
  }, [token])
  return (
    <div
      className="grow pt-5 px-5 md:px-10 xl:px-50 flex justify-center items-center gap-5 relative">
      {
        loader
          ?
          <Loader />
          :
          <ProfileCard />
      }
    </div>
  )
}

export default ProfilePage