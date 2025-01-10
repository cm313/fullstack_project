import React, {useState, useEffect} from 'react';
import JobApplications from './JobApplications';

const GetApplications = () => {

    const [jobApplications, setJobApplications] = useState([]);
    //const{setJobApplicationsList} = useContext(userContext);
  
          useEffect(() => {
            fetchJobs();
          }, []);
  
       
          const fetchJobs = async ()=>{
            const options = {
                method: 'GET',
                headers:{
                  'Content-Type': 'application/json',
                  'authorization': `Bearer ${JSON.parse(localStorage.getItem('accesstoken'))}`
                }
            }
          const response = await fetch("http://localhost:5000/getJobApplications", options);
          const jobsdata = await response.json();
          if(response.ok){
            setJobApplications(jobsdata[0]);
           // setJobApplicationsList(jobsdata[0]);
          }
          else{
            alert(jobsdata);
          }
        }


  return (
    jobApplications.length ===0 ?
    <>
    <div className="text-center my-4 font-bold font-serif text-xl">No Job Applications Found</div>
    </> :
    <div className="flex flex-wrap">
      {
      jobApplications.map((job) => {
      return  <JobApplications key={job.id}  jobApplication = {job} />         
       }) 
      }
    </div>
  )
}

export default GetApplications