import {useRef, useState} from "react"
import {Link} from "react-router-dom";

const UsersDetails = ()=>{
    const firstName = useRef(null);
    const lastName = useRef(null);
    const email = useRef(null);
    const userName = useRef(null);
    const password = useRef(null);
    const [responseData, setResponseData] = useState('');
    const[role, setRole] = useState("Recruiter");
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("refreshtoken");
    const handleSubmit = async ()=>{
    
        const obj = {
            firstName: firstName?.current?.value,
            lastName: lastName?.current?.value,
            email: email?.current?.value,
            userName: userName?.current?.value,
            password: password?.current?.value, 
            role
        }
        if(obj.firstName && obj.lastName && obj.email && obj.userName && obj.password){
        try{
              const response = await fetch('http://localhost:5000/',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
              });
              const data = await response.json();

              if(response.ok){
                setResponseData(data);
              }
              else{
                setResponseData(data)
              }
            }catch(error){
                setResponseData("error occured at fetch Api: "+error);
            }
        }
        else{
            setResponseData("enter the full detials, please");
        }

    }
    console.log(role);
 return (
    <>
    <div className="border border-black rounded-md w-3/12 mt-8 m-auto right-0 left-0 p-4">
    <form  onSubmit={(e)=>e.preventDefault()}>
    <div className="flex items-center mt-2">
            <div>First Name:</div>
            <div>
             <input ref={firstName} className="border border-black rounded-md p-2 w-full ml-5" type="text"  placeholder="enter first Name"></input>
            </div>
        </div>
        <div className="flex items-center mt-2">
            <div>Last Name:</div>
            <div>
             <input ref={lastName} className="border border-black rounded-md p-2 w-full ml-5" type="text"  placeholder="enter last Name"></input>
            </div>
        </div>
        <div className="flex items-center ml-9 mt-2">
            <div>Email:</div>
            <div>
             <input ref={email} className="border border-black rounded-md p-2 w-full ml-5" type="email"  placeholder="enter email"></input>
            </div>
        </div>
        <div className="flex items-center mt-2">
            <div>UserName:</div>
            <div>
             <input ref={userName} className="border border-black rounded-md p-2 w-full ml-5" type="text"  placeholder="enter user name"></input>
            </div>
        </div>
        <div className="flex items-center mt-2">
            <div>Password:</div>
            <div>
             <input ref={password} className="border border-black rounded-md p-2 w-full ml-6" type="password" placeholder="enter password"></input>
            </div>
        </div>  
        <div className="flex items-center mt-2">
            <div>Select Role:</div>
         <select value={role} onChange={(e)=>{setRole(e.target.value)}} className="border border-black rounded-md py-2  px-2 ml-7" name="roles" id="roles">
          <option value="Recruiter">Recruiter</option>
          <option value="JobSeeker">Job Seeker</option>
        </select>
        </div>
        <div className="text-center my-3">
         <button type="button" className="bg-blue-500 px-3 py-1 rounded-md font-serif hover:bg-blue-300" onClick={handleSubmit}>Register</button>
        </div>
    </form> 
    <div className="font-serif text-green-700 mt-6 text-center">{responseData}</div>
    </div>
    <Link to='/login'><div className='text-center font-serif mt-2 text-violet-700'>A registered user, Please login</div></Link>
    </>
 )
}

export default UsersDetails;