import React from 'react'

const JobApplications = ({jobApplication}) => {
    const {title, firstName, lastName, email, skills} = jobApplication;
  return (
    <div className="font-serif border rounded-md pl-5 bg-slate-100 py-5 ml-5 my-2 w-[32%] h-4/12">
        <div className="m-auto left-0 right-0">
     <div className="my-2">
        <div className="font-semibold">Job Role:</div>
        <div>{title}</div>
     </div>
     <div className="my-2">
        <div className="font-semibold">First Name:</div>
        <div>{firstName}</div>
     </div>
     <div className="my-2">
        <div className="font-semibold">Last Name</div>
        <div>{lastName}</div>
     </div>
     <div className="my-2">
        <div className="font-semibold"> email:</div>
        <div>{email}</div>
     </div>
     <div className="my-2">
        <div className="font-semibold">Skills:</div>
        <div>{skills}</div>
     </div>
     <div className="">
      <button className=" py-2 px-3  bg-red-500 rounded-md font-semibold hover:bg-green-400">Delete</button>
     </div>
     </div>
    </div>
  )
}

export default JobApplications