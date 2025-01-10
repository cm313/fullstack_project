import React, {useState, useEffect} from 'react';
import JobApplications from './JobApplications';

const GetApplications = () => {

    const [jobApplications, setJobApplications] = useState([]);
    const [deleteJob, setDeleteJob] = useState(false);
    //const{setJobApplicationsList} = useContext(userContext);
  
          useEffect(() => {
            fetchJobs();
          }, [deleteJob]);
  
       
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

        const handleDelete = async (id)=>{
          const options = {
            method: 'DELETE',
            headers:{
              'Content-Type': 'application/json',
              'authorization': `Bearer ${JSON.parse(localStorage.getItem('accesstoken'))}`
            },
            body: JSON.stringify({id}),
        }
        try{
        const response = await fetch("http://localhost:5000/deleteJob", options);
        const result = await response.json();
        if(response.ok){
          setDeleteJob(!deleteJob);
        }
        else{
          alert(result);
        }
      }
      catch(e){
        alert("error while deleting jobs at fetch");
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
      return  <JobApplications key={job.id} handleDelete={handleDelete}  jobApplication = {job} />         
       }) 
      }
    </div>
  )
}

export default GetApplications