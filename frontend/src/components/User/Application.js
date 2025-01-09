import React,{useState} from 'react'

const Application = () => {
 
     const [applicationData, setApplicationData] = useState({
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
    <div className="flex items-center mt-2">
            <div>First Name:</div>
            <div>
             <input onChange={handleChange} className="border shadow-sm rounded-md p-2 w-full ml-5" type="text" name="firstName" placeholder="enter first Name"></input>
            </div>
        </div>
        <div className="flex items-center mt-2">
            <div>Last Name:</div>
            <div>
             <input onChange={handleChange} className="border shadow-sm rounded-md p-2 w-full ml-5" type="text" name="lastName"  placeholder="enter last Name"></input>
            </div>
        </div>
        <div className="flex items-center ml-9 mt-2">
            <div>Email:</div>
            <div>
             <input onChange={handleChange} className="border shadow-sm rounded-md p-2 w-full ml-5" type="email" name="email"  placeholder="enter email"></input>
            </div>
        </div>
        <div className="flex  my-4">
          <div className="w-1/3" >Skills</div>
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