import { createContext } from "react";



const userContext = createContext({
    userName: '',
    setUserName: ()=>{}
});

export default userContext;