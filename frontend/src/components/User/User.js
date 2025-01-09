import React,{useState, useEffect} from 'react'
import Jobs from './Jobs';

const User = () => {
  const [jobs, setJobs] = useState([]);
        const [application, setApplication] = useState({
          firstName: '',
          lastName: '',
          skills: '',
          jobId: ''
        });
      
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
        const response = await fetch("http://localhost:5000/getJobs", options);
        const data = await response.json();
        if(response.ok){
          setJobs(data[0]);
        }
        else{
          alert(data);
        }
      }
         
      
       const handleApply = async (jobId) => {
          setApplication({ ...application, jobId });
          const response = await fetch('http://localhost:5000/apply', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify(application)
          });
          if (response.ok) alert('Application submitted!');
        };
      
        return (
          <div className="flex flex-wrap">
            {
            jobs.map((job) => (
              <Jobs key={job.id} handleApply={handleApply} jobApplication = {job} />
            ))
            }
          </div>
        );
}

export default User;