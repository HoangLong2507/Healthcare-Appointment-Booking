import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { FaIdCard } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Login() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [Lname, setLname] = useState("");
  const [Fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [ID, setID] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [dateofbirth, setDateofbirth] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [showpassword, setShowPassword] = useState(false);
  const [showConfirmpassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Kiểm tra nếu email hoặc password bị bỏ trống
    if (!email || !password) {
      toast.error("Invalid input login! Email and password are required.");
      return;
    }

    try {
      // Đăng nhập
      const result = await signup(ID,Lname,Fname,email,password,dateofbirth,phonenumber);

      if (result && result.success) {
        toast.success("Sign up new account successfully",{
          autoClose:2000,
          hideProgressBar:true
        })
        setTimeout(()=>navigate('/login'),2000)

      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.log("Login failed", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-gray-200">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg w-[35vw] h-72vh] border-4 border-gray-300 border-opacity-50 transition-all duration-300">
        <h2 className="text-5xl font-bold text-center mb-6">Signup</h2>
        <form onSubmit={handleSubmit} >
        <div className = "flex items-center justify-between">
            <div className="mb-2 w-[35%]">
              <label
                className="block text-gray-700 text-lg font-semibold mb-2"
                htmlFor="Lname"
              >
                Last name
              </label>
              <div className="flex items-center border rounded-md h-[5vh]">
                <span className="p-2 text-xl">
                  <FaUser />
                </span>
                <input
                  type="text"
                  id="Lname"
                  value={Lname}
                  onChange={(e)=>setLname(e.target.value)}
                  placeholder="Last name"
                  className="w-full p-2 outline-none text-xl"
                  required
                />
              </div>
            </div>
            <div className="mb-2 w-[60%]">
              <label
                className="block text-gray-700 text-lg font-semibold mb-2"
                htmlFor="Fname"
              >
                First Name
              </label>
              <div className="flex items-center border rounded-md h-[5vh]">
                <span className="p-2 text-xl">
                  <FaUser />
                </span>
                <input
                  type="text"
                  id="Fname"
                  value={Fname}
                  onChange={(e)=>setFname(e.target.value)}
                  placeholder="First name"
                  className="w-full p-2 outline-none text-xl"
                  required
                />
              </div>
            </div>
          </div>
          <div className = "flex items-center justify-between">
            <div className="mb-2 w-[35%]">
              <label
                className="block text-gray-700 text-lg font-semibold mb-2"
                htmlFor="ID"
              >
                ID
              </label>
              <div className="flex items-center border rounded-md h-[5vh]">
                <span className="p-2 text-xl">
                  <FaIdCard />
                </span>
                <input
                  type="text"
                  id="ID"
                  value={ID}
                  onChange={(e)=>setID(e.target.value)}
                  placeholder="ID"
                  className="w-full p-2 outline-none text-xl"
                  required
                />
              </div>
            </div>
            <div className="mb-2 w-[60%]">
              <label
                className="block text-gray-700 text-lg font-semibold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <div className="flex items-center border rounded-md h-[5vh]">
                <span className="p-2 text-xl">
                  <MdEmail />
                </span>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full p-2 outline-none text-xl"
                  required
                />
              </div>
            </div>
          </div>
          <div className = "flex items-center justify-between">
            <div className="mb-2 w-[35%]">
              <label
                className="block text-gray-700 text-lg font-semibold mb-2"
                htmlFor="dateofbirth"
              >
                Date of birth
              </label>
              <div className="flex items-center border rounded-md h-[5vh]">
                <span className="p-2 text-xl">
                  <FaIdCard />
                </span>
                <input
                  type="date"
                  id="dateofbirth"
                  value={dateofbirth}
                  onChange={(e)=>{ console.log(e.target.value);setDateofbirth(e.target.value);}}
                  placeholder="Date of birth"
                  className="w-full p-2 outline-none text-xl"
                  required
                />
              </div>
            </div>
            <div className="mb-2 w-[60%]">
              <label
                className="block text-gray-700 text-lg font-semibold mb-2"
                htmlFor="phonenumber"
              >
                Phone number
              </label>
              <div className="flex items-center border rounded-md h-[5vh]">
                <span className="p-2 text-xl">
                  <FaUser />
                </span>
                <input
                  type="text"
                  id="phonenumber"
                  value={phonenumber}
                  onChange={(e)=>setPhonenumber(e.target.value)}
                  placeholder="Phone number"
                  className="w-full p-2 outline-none text-xl"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-2">
            <label
              className="block text-gray-700 text-xl font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="flex items-center border rounded-md h-[5vh]">
              <span className="p-2 text-xl">
                <RiLockPasswordFill/>
              </span>
              <input
                type={showpassword?"text":"password"}
                id="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-2 outline-none text-xl"
                required
              />
              <span className="p-2 text-2xl" onClick={()=>setShowPassword(!showpassword)}>
                { showpassword?<IoEyeOff/>: <IoEye/>}
              </span>
            </div>
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 text-xl font-semibold mb-2"
              htmlFor="confirmpassword"
            >
              Confirm password
            </label>
            <div className="flex items-center border rounded-md h-[5vh]">
              <span className="p-2 text-xl">
                <RiLockPasswordFill/>
              </span>
              <input
                type={showConfirmpassword?"text":"password"}
                id="confirmpassword"
                value={confirmpassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full p-2 outline-none text-xl"
                required
              />
              <span className="p-2 text-2xl" onClick={()=>setShowConfirmPassword(!showConfirmpassword)}>
                { showConfirmpassword?<IoEyeOff/>: <IoEye/>}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button className="w-full bg-blue-600 text-white p-3 text-2xl font-bold rounded-md hover:bg-blue-700 transition mt-6 mb-6">
              Signup
            </button>
          </div>
        </form>
        <div>
          <h2 className = "text-center text-2xl text-blue-500 hover:text-blue-700 hover:underline cursor-pointer" onClick={()=> navigate("/login")}>
          Alrealdy have an account?
          </h2>
        </div>
      </div>
    </div>
  );
}
