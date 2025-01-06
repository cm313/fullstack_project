import userContext from "../utils/context";
import { useContext, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

const UserInterface = ()=>{
    const {userName} = useContext(userContext);
    const navigate = useNavigate();
    const[responseData, setResponseData] = useState('');

    useEffect(()=>{validateUser()},[])

    const jwtToken = JSON.parse(localStorage.getItem("accesstoken"));
   function validateUser(){
    if(!jwtToken)
        return navigate('/login');
    return;
   }
    
    const handleLogout = ()=>{
      localStorage.removeItem("accesstoken");
      localStorage.removeItem("refreshtoken");
      navigate('/login');
    }
   
    const handleGetData = async ()=>{
        const options = {
            method: 'GET',
            headers:{
              'Content-Type': 'application/json',
              'authorization': `Bearer ${jwtToken}`
            }
        }
      const response = await fetch("http://localhost:5000/userinterface", options);
      const data = await response.json();
      if(response.ok){
        const{message, payload} = data;
        setResponseData(message);
      }
      else{
        setResponseData(data);
      }
    }

    return (
        <div>
        <div className="text-center font-serif text-2xl bg-orange-600 mt-8">Welcome {userName}</div>
        <div className="text-center mt-3 ">
            <button onClick={handleLogout} className="bg-red-600 text-black rounded-md hover:bg-red-500 font-serif hover:text-white py-1 px-2">Logout</button>
            <button onClick={handleGetData}className="bg-red-600 text-black rounded-md hover:bg-red-500 font-serif hover:text-white py-1 px-2 ml-2">Get Data</button>
            <div>{responseData}</div>
        </div>
        </div>
    )
}

export default UserInterface;