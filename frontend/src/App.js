import UsersDetails from "./components/UsersDetails";
import Login from "./components/Login";
import {createBrowserRouter} from "react-router-dom";

function App() {
  return (
    <div className="App">
     <UsersDetails/>
    </div>
  );
}

const appRouter = createBrowserRouter([
  {
    path:'/',
    element: <App/>,
    children: [{
      path: '/',
      element:<UsersDetails/>
    }]
  },
  {
    path:'/login',
    element:<Login/>
  }
])

export default appRouter;
