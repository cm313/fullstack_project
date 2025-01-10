import React,{useState} from 'react';

const CreateJob = () => {
    const [jobData, setJobData] = useState({
        title: '',
        aboutCompany: '',
        jopbResponsibilities: '',
        qualifications: '',
        skills: ''
      });
    
      const handleChange = (e) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value });
      };
    
      const handlePost = async () => {
        const response = await fetch('http://localhost:5000/createjobs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('accesstoken'))}`
          },
          body: JSON.stringify(jobData)
        });
        const data = await response.json();
        if (response.ok){
          alert(data);
        }
        else alert(data);
      };
    
      return (
    <div>
      <div className="text-xl font-serif text-center font-bold">Post Job</div>
      <div className=" w-2/5 mx-auto left-0 font-serif right-0 px-4 py-4 border bg-gray-400 rounded-md shadow-md">
          <form className="" onSubmit={(e)=>{e.preventDefault()}}>
              <div className="flex my-4">
              <div className="w-1/3">Title:</div>
              <input onChange={handleChange} name="title" className="py-2 px-2 border border-gray-300 rounded-md w-full" type="text" placeholder="Title"></input>
              </div> 
              <div className="flex  my-4">
              <div className="w-1/3" >About Company:</div>
              <textarea onChange={handleChange} name="aboutCompany" className="py-10 px-2 border border-gray-300 rounded-md w-full" type="text" placeholder="About Company"></textarea>
              </div> 
              <div className="flex  my-4">
              <div className="w-1/3" >Job Responsibilities:</div>
              <textarea onChange={handleChange} name="jobResponsibilities" className="py-10 px-2 border border-gray-300 rounded-md w-full " type="text" placeholder="Job Responsibilities"></textarea>
              </div> 
              <div className="flex  my-4">
              <div className="w-1/3" >Qualifications:</div>
              <textarea onChange={handleChange} name="qualifications" className="py-10 px-2 border border-gray-300 rounded-md w-full" type="text" placeholder="Qualifications"></textarea>
              </div> 
              <div className="flex  my-4">
              <div className="w-1/3" >Skills:</div>
              <textarea onChange={handleChange} name="skills" className="py-10 px-2 border border-gray-300 rounded-md w-full" type="text" placeholder="Skills"></textarea>
              </div>
              <div className="text-center">
              <button type="submit" onClick={handlePost} className="rounded-md bg-blue-600 font-serif font-bold py-2 px-4 hover:text-white">Post</button>  
              </div>                                      
          </form>
      </div>
    </div>
      );
}

export default CreateJob