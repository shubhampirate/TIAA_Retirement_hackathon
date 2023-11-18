import React,{useEffect,useState} from 'react'
import alanBtn from '@alan-ai/alan-sdk-web';

function useAlan() {

    const [alanInstance, setAlanInstance] = useState()

    useEffect(()=>{
        if(alanInstance != null) return 

        setAlanInstance(
        alanBtn({
            key:process.env.REACT_APP_ALAN_KEY,
            onCommand: (commandData) =>{
                console.log(commandData)
            }
        })
        )
    },[])

  return null
}

export default useAlan