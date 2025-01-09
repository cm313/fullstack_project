import React from 'react'
import RECRUITER_IMG from "../../images/recruiter.webp"

const RecruiterInterface = () => {
  return (
    <div>
    <div className="text-center text-5xl font-serif">Welcome to the Recruiter Interface</div>
    <div className=""><img className="mx-auto left-0 right-0 mt-5 w-screen h-screen object-contain" src={RECRUITER_IMG}></img></div>
    </div>
  )
}

export default RecruiterInterface