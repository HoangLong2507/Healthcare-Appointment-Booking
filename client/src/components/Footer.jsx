import React from 'react';
import { FaFacebook, FaPhone, FaEnvelope, FaLinkedin  } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 w-full">
      <div className="container mx-70 px-4  flex flex-col md:flex-row justify-center items-start">
        {/* Phần bên trái */}
        <div className="w-[35%] mb-6 pr-4 md:mb-0 mr-32 border-r-1 border-gray-300 border-opacity-50 transition-all duration-300">
          <h2 className="text-3xl font-bold">HealthCare</h2>
          <p className="mt-2 text-gray-300">
          Welcome to our healthcare appointment booking website, where we prioritize your well-being. Our team of skilled and compassionate doctors ensures top-quality care, while our user-friendly platform lets you book appointments effortlessly. Whether for a check-up or specialist visit, schedule your appointment with ease and experience healthcare that’s convenient and reliable. Book today for a healthier tomorrow!
          </p>
        </div>

        <div className='w-[25%]'>
          <h3 className="text-3xl font-semibold">Contact</h3>
          <ul className="mt-2 text-xl">
            <li className="flex items-center mt-2">
              <FaFacebook className="mr-2" />
              <a href="https://www.facebook.com/HoangLong4s" className="text-gray-400 hover:text-white">Facebook</a>
            </li>
            <li className="flex items-center mt-2">
              <FaPhone className="mr-2" />
              <span className="text-gray-400">+84 348 830 829</span>
            </li>
            <li className="flex items-center mt-2">
              <FaEnvelope className="mr-2" />
              <span className="text-gray-400">longnguyendt04@gmail.com</span>
            </li>
            <li className="flex items-center mt-2">
              <FaLinkedin className="mr-2" />
              <a href="https://www.linkedin.com/in/longnguyen2507" className="text-gray-400 hover:text-white">Linkedin</a>
            </li>
          </ul>
        </div>

        <div className="w-[20%] flex flex-col md:flex-row justify-between ml-auto">
          {/* Liên kết điều hướng */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-3xl font-semibold">Navigator</h3>
            <ul className="mt-2 text-xl">
              <li><a href="#" className="text-gray-400 hover:text-white mt-2">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white mt-2">Doctor</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white mt-2">Appointment</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white mt-2">About Us</a></li>
            </ul>
          </div>

          {/* Thông tin liên hệ */}
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
