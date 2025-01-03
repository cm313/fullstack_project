import {useRef, useState} from "react"

const UserDetails = ()=>{
    const username = useRef(null);
    const password = useRef(null);
    const [responseData, setResponseData] = useState('');
    const handleSubmit = async ()=>{
        let uniqueId = JSON.parse(localStorage.getItem("count")) || 1;
        const obj = {
            id: uniqueId,
            name: username?.current?.value,
            password: password?.current?.value, 
        }
        if(obj.id && obj.name && obj.password){
        try{
              const response = await fetch('http://localhost:5000/datapost',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
              });
              const res = await response.json();
              console.log(response);
              setResponseData(res);
            }catch(error){
                setResponseData("error occured at fetch Api: "+error)
                console.log(error);
            }
              localStorage.setItem("count", JSON.stringify(uniqueId+1));
        }
        else{
            setResponseData("enter the full detials, please");
        }

    }
    
 return (
    <div className="border border-black rounded-md w-3/12 mt-8 m-auto right-0 left-0 p-4">
    <form className="" onSubmit={(e)=>e.preventDefault()}>
        <div className="flex items-center mt-2">
            <div>UserName:</div>
            <div>
             <input ref={username} className="border border-black rounded-md p-2 w-full ml-5" type="text" defaultValue={username?.current?.value} placeholder="enter user name"></input>
            </div>
        </div>
        <div className="flex items-center mt-2">
            <div>Password:</div>
            <div>
             <input ref={password} className="border border-black rounded-md p-2 w-full ml-5" type="text" defaultValue={password?.current?.value} placeholder="enter password"></input>
            </div>
        </div>  
        <div className="text-center my-3">
            <button className="bg-blue-500 px-3 py-1 rounded-md font-serif hover:bg-blue-300" onClick={handleSubmit}>Submit</button>
        </div>
    </form> 
    <div className="font-serif text-green-700 mt-6 text-center">{responseData}</div>
    </div>
 )
}

export default UserDetails;