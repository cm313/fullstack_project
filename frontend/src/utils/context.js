import { createContext } from "react";



const userContext = createContext({
    userName: '',
    role:'',
    setUserName: ()=>{},
    setRole: ()=>{},
});

export default userContext;