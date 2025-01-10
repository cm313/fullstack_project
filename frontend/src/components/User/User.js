import React,{useState, useEffect, useContext} from 'react'
import Jobs from './Jobs';
import userContext from '../../utils/context';

const User = () => {
  const [jobs, setJobs] = useState([]);
  const{setJobsList} = useContext(userContext);

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
        const jobsdata = await response.json();
        if(response.ok){
          setJobs(jobsdata[0]);
          setJobsList(jobsdata[0]);
        }
        else{
          alert(jobsdata);
        }
      }
        return (
          jobs.length ===0 ?
          <>
          <div className="text-center my-4 font-bold font-serif text-xl">No Jobs Available at this moment, please visit after some time</div>
          </> :
          <div className="flex flex-wrap">
            {
            jobs.map((job) => {
            return  <Jobs key={job.id}  jobApplication = {job} />         
             }) 
            }
          </div>
        );
}

export default User;