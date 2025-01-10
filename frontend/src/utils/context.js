import { createContext } from "react";



const userContext = createContext({
    userName: '',
    jobsList: '',
    setUserName: ()=>{},
    setJobsList: ()=>{},
});

export default userContext;