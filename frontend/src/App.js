import UsersDetails from "./components/UsersDetails";
import UserInterface from "./components/UserInterface";
import Login from "./components/Login";
import {createBrowserRouter, Outlet} from "react-router-dom";
import userContext from './utils/context';
import { useState } from "react";

function App() {
  const[userName, setUserName] = useState("");
  return (
    <userContext.Provider value={{userName, setUserName}}>
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
    }
  ]
  }
  
])

export default appRouter;
