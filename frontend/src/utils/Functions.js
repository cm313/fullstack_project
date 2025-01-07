
import {useNavigate} from 'react-router-dom';


const Functions = ()=>{

const navigate = useNavigate();

function isTokenExpired(jwtToken){
    try{
    const payload =  JSON.parse(atob(jwtToken).split('.')[1]);
    const currentTime = Math.floor(Date.now()/1000);
    if(payload.exp < currentTime){
        return true;
    }
    else{
        return false;
    }
}
catch(e){
    return true;
}
};



async function generateNewToken(){
    const refreshToken = JSON.parse(localStorage.getItem("refreshtoken"));
   
    if(!refreshToken){
        navigate('/login');
    }
    const response = await fetch ("http://localhost/5000/accesstoken",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({refreshToken})
    });

    const data = response.json();
    if(response.ok){
       localStorage.setItem("accesstoken", JSON.stringyfy(data.jwtToken));
    }
    else{
        navigate('/login');
    }
}

return(<></>);

}
export {isTokenExpired, generateNewToken};
export default Functions

