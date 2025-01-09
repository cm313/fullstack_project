import userContext from "../utils/context";
import { useContext, useEffect, useState } from "react";
import {useNavigate, Link} from "react-router-dom";
import User from "./User/User";
import CreateJob from "./Recruiter/CreateJob";

const UserInterface = ()=>{
    const {userName} = useContext(userContext);
    const navigate = useNavigate();
   // const[responseData, setResponseData] = useState('');
    const[isTokenValid, setIsTokenValid]= useState(true); 
    const[isJobButtonClicked, setIsJobButtonCliked] = useState(false);
    const jwtToken = JSON.parse(localStorage.getItem("accesstoken"));
    const refreshToken = JSON.parse(localStorage.getItem('refreshtoken'));
    const role = localStorage.getItem("role");

    useEffect(()=>{
      validateUser();
      if(isTokenExpired(refreshToken)){
        logout();
        navigate('/login');
        return;
      }
      const validateAndGenerateToken = async () => {
       // console.log("enterd validtoken function");
        if (jwtToken && isTokenExpired(jwtToken)) {
         // console.log("entered validtoken function if block")
          try {
         generateNewToken();
            //setIsTokenValid(!isTokenValid);
          } catch (error) {
            //setIsTokenValid(!isTokenValid);
            return;
          }
        } else {
         // console.log("entered validtoken function else block");
          setIsTokenValid(true);
        }
      };

    const payload =  JSON.parse(atob(jwtToken.split('.')[1]));
    const TimerCheck = payload.exp - payload.iat;
    const timer = setInterval(()=>{
       setIsTokenValid(!isTokenValid);
      }, TimerCheck);

     validateAndGenerateToken();
     return ()=> clearInterval(timer);
    },
     [isTokenValid]);

    function validateUser(){
      if(!jwtToken)
          return navigate('/login');
      return;
     }


     function isTokenExpired(token){
      try{
      //  console.log("isTokenFunction entered")
      const payload =  JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now()/1000);
     // console.log(payload.exp);
     // console.log(currentTime);
      if(payload.exp < currentTime){
       // console.log("it entered if block returns true");
          return true;
      }
      else{
      //  console.log("it enterd else block returns false");
          return false;
      }
  }
  catch(e){
   // console.log("it entered catch block returns false");
      return true;
  }
  };
  



    async function generateNewToken(){
     // console.log("entered generateNewToken Function");
     
      if(isTokenExpired(refreshToken)){
        console.log("is refresh token expired is true");
        logout();
          navigate('/login');
          return false;
      }
     // console.log("refreshtoken exists");
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
       //  console.log("New access token is generated");  
      //   console.log(data.jwtToken); 
       //  return true;
      }
      else{
        console.log(data);
      //  return false;
      }
  };

  function logout(){
    localStorage.removeItem('accesstoken');
    localStorage.removeItem('refreshtoken');
  }

    
    const handleLogout = ()=>{
      localStorage.removeItem("accesstoken");
      localStorage.removeItem("refreshtoken");
      localStorage.removeItem("role");
      navigate('/login');
    }
   
//     const handleGetData = async ()=>{
//         const options = {
//             method: 'GET',
//             headers:{
//               'Content-Type': 'application/json',
//               'authorization': `Bearer ${jwtToken}`
//             }
//         }
//       const response = await fetch("http://localhost:5000/userinterface", options);
//       const data = await response.json();
//       if(response.ok){
//         setResponseData(data);
//       }
//       else{
//         setResponseData(data);
//       }
//     }
//     <button onClick={handleGetData}className="bg-red-600 text-black rounded-md hover:bg-red-500 font-serif hover:text-white py-1 px-2 ml-2">Get Data</button>
//  <div>{responseData}</div>
    return (
        <div>
        <header className="flex items-center justify-between mx-4 border py-2 px-4 my-2 rounded-md bg-slate-300">
        <div className="text-center font-serif text-2xl mt-8">Welcome {userName}</div>
        {
            role==="Recruiter" &&
             <div className="flex font-serif items-center w-1/6 justify-between font-semibold cursor-pointer">
             <div onClick={()=>{setIsJobButtonCliked(!isJobButtonClicked)}} >{isJobButtonClicked ? "Cancel" : "Create Job"}</div>
                 <div>Get Applications</div>
            </div>    
        }
        {
          role === "JobSeeker" && <div className="font-semibold font-serif text-xl">Apply Jobs</div>
        }
        <div className="text-center mt-3">
            <button onClick={handleLogout} className=" bg-blue-500 text-black rounded-md hover:bg-red-500 font-serif hover:text-white py-1 px-2">Logout</button>       
        </div>
        </header>
        {
        <div className="mt-8">
           { role==="JobSeeker" && <User/>}
           {isJobButtonClicked && <CreateJob/>}
        </div>
       }
        </div>
    )
}

export default UserInterface;
