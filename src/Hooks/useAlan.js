import React,{useEffect,useState} from 'react'
import alanBtn from '@alan-ai/alan-sdk-web';
import { useNavigate } from 'react-router-dom';

function useAlan() {

    const [alanInstance, setAlanInstance] = useState()
    const navigate = useNavigate();

    useEffect(()=>{
        if(alanInstance != null) return 

        setAlanInstance(
        alanBtn({
            key: process.env.REACT_APP_ALAN_KEY,
            onCommand: (commandData) => {
              if (commandData.command === 'navigate') {
                const route = commandData.route.toLowerCase();
                navigate(`/${route}`);
              }
            }
        })
        )
    },[alanInstance, navigate])

  return null
}

export default useAlan