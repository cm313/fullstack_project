import userContext from "../utils/context";
import { useContext, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

const UserInterface = ()=>{
    const {userName} = useContext(userContext);
    const navigate = useNavigate();
    const[responseData, setResponseData] = useState('');
    const[isTokenValid, setIsTokenValid]= useState(true); 
    const jwtToken = JSON.parse(localStorage.getItem("accesstoken"));


    useEffect(()=>{
    //  validateUser();
      const validateAndGenerateToken = async () => {
        console.log("enterd validtoken function");
        if (jwtToken && isTokenExpired(jwtToken)) {
          console.log("entered validtoken function if block")
          try {
            await generateNewToken();
            setIsTokenValid(true);
          } catch (error) {
            setIsTokenValid(false);
            return;
          }
        } else {
          console.log("entered validtoken function else block");
          setIsTokenValid(true);
        }
       
      };
     validateAndGenerateToken();},
     [isTokenValid]);

    function validateUser(){
      if(!jwtToken)
          return navigate('/login');
      return;
     }

     function isTokenExpired(token){
      try{
        console.log("isTokenFunction entered")
      const payload =  JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now()/1000);
      console.log(payload.exp);
      console.log(currentTime);
      if(payload.exp < currentTime){
        console.log("it entered if block returns true");
          return true;
      }
      else{
        console.log("it enterd else block returns false");
          return false;
      }
  }
  catch(e){
    console.log("it entered catch block returns false");
      return true;
  }
  };


    async function generateNewToken(){
      const refreshToken = JSON.parse(localStorage.getItem("refreshtoken"));
      console.log("entered generateNewToken Function");
     
      if(isTokenExpired(refreshToken)){
        console.log("is refresh token expired is true");
          navigate('/login');
          return;
      }
      console.log("refreshtoken exists");
      const response = await fetch ("http://localhost:5000/accesstoken",{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({refreshToken})
      });
  
      const data = await response.json();
      if(response.ok){
         localStorage.setItem("accesstoken", JSON.stringify(data.jwtToken));
         console.log(data.jwtToken);
         console.log("New access token is generated");
         return;
      }
  };

    
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
        setResponseData(data);
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