import React,{useState, useEffect} from 'react'

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
          <div>
            <h2>Available Jobs</h2>
            {jobs.map((job) => (
              <div key={job.id}>
                <h3>{job.title}</h3>
                <p>{job.aboutCompany}</p>
                <button onClick={() => handleApply(job.id)}>Apply</button>
              </div>
            ))}
          </div>
        );
}

export default User