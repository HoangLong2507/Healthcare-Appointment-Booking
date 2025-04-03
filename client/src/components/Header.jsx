import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import avatar1 from "../assets/avatar3.webp"
import { FaChevronDown } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

export default function Header() {
  const navigate = useNavigate()
  const pages = [
    { name: "Home", path: "/" },
    { name: "Appointment", path: "/login"},
    { name: "Doctor", path: "/signup"},
    { name: "AboutUs", path: "/about" }
  ];
  
  const { logout, userInfor } = useAuth();

  return (
    <header className="top-0 left-0 w-full h-[10vh] bg-white shadow-sm z-50">
      <div className="max-w-[75%] h-[100%] mx-auto">
        <div className="flex justify-center items-center h-[100%]">
          {/* Title Logo */}
          <div className="flex items-center mr-auto">
            <div className="flex-shrink-0">
              <span onClick={()=>navigate('/')} className="text-5xl font-bold text-gradient cursor-pointer">HealthCare</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8 mr-8">
            {pages.map((page, index) => (
              <NavLink 
                key={index} 
                to={page.path} 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {page.name}
              </NavLink>
            ))}
            { 

            }
          </nav>

          {/* User Dropdown */}
          {userInfor ? (
            <UserDropdown userInfor={userInfor} logout={logout} />
          ) : (
            <div className="hidden md:block text-center justify-between space-x-4">
              <button
              onClick={()=>navigate('/login')}
              className="bg-indigo-500 text-white text-2xl px-6 py-3 rounded-full hover:bg-indigo-700 transition duration-300"
              >
                Login
              </button>
              <button 
              onClick={()=>navigate('/signup')}
              className="bg-blue-500 text-white text-2xl px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300"
              >
                Sign up
              </button>
            </div>
          )}

          
        </div>
      </div>
    </header>
  );
};

const UserDropdown = (({ userInfor, logout }) => {
  const dropdownMenu = [
    { name: "Profile", path: "/" },
    { name: "Appointment History", path: "/" },
  ];
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="relative">
      <div className="flex items-center space-x-2 text-gray-800 hover:text-gray-900 focus:outline-none">
        <span className="text-3xl">{`${userInfor.Lname} ${userInfor.Fname}`}</span>
        <FaUserCircle className="text-3xl" />
        <FaChevronDown 
          className={`h-4 w-4 transform transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} 
          onClick={toggleDropdown}  
        />
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-4 w-90 bg-white rounded-md py-1 z-50 border-2 border-gray-300 border-opacity-50 transition-all duration-300">
          <div className="text-xl flex items-center px-5 py-2 space-x-4 font-medium text-black border-b border-gray-300 border-opacity-50">
            <img src={avatar1} className="h-12 w-12 rounded-full object-cover" alt="User Avatar" />
            <div>
              <p>{`${userInfor.Lname} ${userInfor.Fname}`}</p>
              <p className="font-light">
                {userInfor.email.length >= 20 ? `${userInfor.email.slice(0, 10)}...@gmail.com` : userInfor.email}
              </p>
            </div>
          </div>
          {dropdownMenu.map((item, index) => (
            <NavLink key={index} to={item.path} className="flex items-center px-5 py-2 text-2xl text-gray-700 hover:bg-gray-100">
              {item.name}
            </NavLink>
          ))}
          <NavLink to="/" onClick={logout} className="flex items-center px-5 py-2 text-2xl text-gray-700 hover:bg-gray-100">
            Logout
            <span className="ml-4 flex items-center">
              <MdLogout />
            </span> 
          </NavLink>
        </div>
      )}
    </div>
  );
});
