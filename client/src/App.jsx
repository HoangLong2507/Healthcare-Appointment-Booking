import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer"
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <Header/>
      <Outlet /> 
      <Footer/>
    </div>
);
}

export default App;