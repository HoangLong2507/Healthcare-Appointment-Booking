import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { MdConstruction } from "react-icons/md";
export default function Login() {
  const { login, setUserInfor, userInfor } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // hoặc session, context, cookie,...
  const isLoggedIn = userInfor != null ? true: false;
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true }); // Chuyển hướng mà không lưu lại lịch sử
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Kiểm tra nếu email hoặc password bị bỏ trống
    if (!email || !password) {
      toast.error("Invalid input login! Email and password are required.");
      return;
    }

    try {
      // Đăng nhập
      const result = await login(email, password);
      if (result && result.success) {
        toast.success("Login successfully", {
          duration: 3000,    
        });
      
 
        setTimeout(() => {
          navigate('/',{replace:true}); 
          setUserInfor(result.user)
        }, 1000);
        
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.log("Login failed", error);
      toast.error("An error occurred. Please try again later.", {
        duration: 3000,    
      });
    }
  };

  return (
    <>
      <Header/>
      <Toaster ariaLive="assertive"/>
      <div className="min-h-[80vh] min-w-screen flex items-center justify-center auth">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[25vw] h-[65vh] border-4 border-gray-300 border-opacity-50 transition-all duration-300">
          <h2 className="text-5xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="border-b border-gray-300">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-xl font-semibold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <div className="flex items-center border rounded-md h-[6vh]">
                <span className="p-2 text-xl">
                  <FaUser />
                </span>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Email"
                  className="w-full p-2 outline-none text-xl"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-xl font-semibold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="flex items-center border rounded-md h-[6vh]">
                <span className="p-2 text-xl">
                  <RiLockPasswordFill/>
                </span>
                <input
                  type={showpassword?"text":"password"}
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Password"
                  className="w-full p-2 outline-none text-xl"
                  required
                />
                <span className="p-2 text-2xl" onClick={()=>setShowPassword(!showpassword)}>
                  { showpassword?<IoEyeOff/>: <IoEye/>}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button className="w-full bg-green-600 text-white p-3 text-2xl font-bold rounded-md hover:bg-green-700 transition mt-4 mb-8">
                Login
              </button>
            </div>
          </form>
          <div className="flex items-center justify-center">
            <button
              onClick={()=>navigate("/signup")} 
              className="w-[60%] h-[6vh] bg-blue-600 text-white p-2 text-2xl font-bold rounded-md hover:bg-blue-700 transition mt-6 mb-10"
            >
                Create new account
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </>
    
  );
}
