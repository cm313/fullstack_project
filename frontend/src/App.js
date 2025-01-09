import UsersDetails from "./components/UsersDetails";
import UserInterface from "./components/UserInterface";
import Login from "./components/Login";
import {createBrowserRouter, Outlet} from "react-router-dom";
import userContext from './utils/context';
import { useState} from "react";
import CreateJob from "./components/Recruiter/CreateJob";
import Application from "./components/User/Application";




function App() {
  const[userName, setUserName] = useState("");
  const[role, setRole] = useState("");
  return (
    <userContext.Provider value={{userName, role, setRole, setUserName}}>
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
      element:<UsersDetails/>
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
      path:'/application',
      element: <Application/>
    }
  ]
  }
]);

export default appRouter;
