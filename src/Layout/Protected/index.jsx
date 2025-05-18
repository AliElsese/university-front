import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../../Store';

const Protected = ({children}) => {
  const navigate = useNavigate();
  
  const chickRole = () => {}

  useEffect(() => {
    
  }, []);

  return (
    {children}
  )
}

export default Protected