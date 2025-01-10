import Register from "../src/components/Register"
import UserInterface from "./components/UserInterface";
import Login from "./components/Login";
import {createBrowserRouter, Outlet} from "react-router-dom";
import userContext from './utils/context';
import { useState} from "react";
import Application from "./components/User/Application";




function App() {
  const[userName, setUserName] = useState("");
  const[jobsList, setJobsList] = useState([]);
  return (
    <userContext.Provider value={{userName, jobsList, setJobsList, setUserName}}>
    <div className="App">
     <Outlet/>
    </div>
    </userContext.Provider>
  );
}

const appRouter = createBrowserRouter([
  {
    path:'/',
    element: <App/>,
    children: [{
      path: '/',
      element:<Register/>
    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path: '/userinterface',
      element: <UserInterface/>
    },
    {
      path:'/application/:jobid',
      element: <Application/>
    }
  ]
  }
]);

export default appRouter;
