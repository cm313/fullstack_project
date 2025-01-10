import React,{useState, useContext} from 'react'
import {useParams} from 'react-router-dom'
import userContext from '../../utils/context';

const Application = () => {
  const {jobid} = useParams();
  const{jobsList} = useContext(userContext);
  const jobObj = jobsList.find((job)=>job.id == jobid);

 
     const [applicationData, setApplicationData] = useState({
            title: jobObj?.title,
            firstName: '',
            lastName: '',
            email: '',
            skills: ''
          });
  
            
      const handleChange = (e) => {
        setApplicationData({ ...applicationData, [e.target.name]: e.target.value });
      };

    const handleSubmit = async () => {
        const response = await fetch('http://localhost:5000/apply', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('accesstoken'))}`
          },
          body: JSON.stringify(applicationData)
        });
        const data = await response.json();
        if (response.ok)
            alert(data);
            else
            alert(data);
      };

  return (
    <>
    <div className="border shadow-lg rounded-md w-3/12 mt-8 m-auto right-0 left-0 p-4 font-serif">
    <form  onSubmit={(e)=>e.preventDefault()}>
    <div className="flex  mt-2">
            <div className="w-1/4">Job Role:</div>
            <div>
             <input className="p-2 w-full ml-5" readOnly value={jobObj?.title}  type="text" name="title" placeholder="title"></input>
            </div>
        </div>
    <div className="flex  mt-2">
            <div className="w-1/4">First Name:</div>
            <div>
             <input onChange={handleChange} className="border shadow-sm border-gray-300 rounded-md p-2 w-full ml-5" type="text" name="firstName" placeholder="enter first Name"></input>
            </div>
        </div>
        <div className="flex  mt-2">
            <div className="w-1/4">Last Name:</div>
            <div>
             <input onChange={handleChange} className="border shadow-sm border-gray-300 rounded-md p-2 w-full ml-5" type="text" name="lastName"  placeholder="enter last Name"></input>
            </div>
        </div>
        <div className="flex  mt-2">
            <div className="w-1/4" >Email:</div>
            <div>
             <input onChange={handleChange} className="border shadow-sm border-gray-300 rounded-md p-2 w-full ml-5" type="email" name="email"  placeholder="enter email"></input>
            </div>
        </div>
        <div className="flex  my-4">
          <div className="w-1/4" >Skills:</div>
          <textarea onChange={handleChange} className="py-10 px-2 border border-gray-300 rounded-md w-full" name="skills" type="text" placeholder="Enter skills"></textarea>
        </div>
        <div className="text-center my-3">
         <button type="button" className="bg-blue-500 px-3 py-1 rounded-md font-serif hover:bg-blue-300 text-white hover:text-black" onClick={handleSubmit}>Submit</button>
        </div>
    </form>
    </div>
    </>
  )
}

export default Application