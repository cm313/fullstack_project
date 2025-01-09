import React from 'react'
import {Link} from "react-router-dom"

const Jobs = ({jobApplication, handleApply}) => {
    const{title, aboutcompany, jobresponsibilities, qualifications, skills, id} = jobApplication
  return (
    <div className="font-serif border rounded-md pl-5 bg-slate-100 py-5 ml-5 my-2 w-[32%] h-4/12">
        <div className="m-auto left-0 right-0">
     <div className="my-2">
        <div className="font-semibold">Title:</div>
        <div>{title}</div>
     </div>
     <div className="my-2">
        <div className="font-semibold">About Company:</div>
        <div>{aboutcompany}</div>
     </div>
     <div className="my-2">
        <div className="font-semibold">Job Responsibilities:</div>
        <div>{jobresponsibilities}</div>
     </div>
     <div className="my-2">
        <div className="font-semibold"> Qualifications:</div>
        <div>{qualifications}</div>
     </div>
     <div className="my-2">
        <div className="font-semibold">Skills:</div>
        <div>{skills}</div>
     </div>
     <div className="">
      <Link to='/application'><button className=" py-2 px-3 bg-cyan-500 rounded-md font-semibold hover:bg-cyan-300">Apply</button></Link>  
     </div>
     </div>
    </div>
  )
}

export default Jobs