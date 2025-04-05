import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Authentication/Login";
import Signup from "../pages/Authentication/Signup";
import Home from "../pages/User/Home";
import Appointment from "../pages/User/Appointment";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home/>
      }, 
      {
        path: "/appointment",
        element: <Appointment/>
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  }
  
]);

export default router;
