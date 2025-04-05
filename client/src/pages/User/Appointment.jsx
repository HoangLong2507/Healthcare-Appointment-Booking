import {useState,useEffect} from 'react';
import api from '../../api/axios'
export default function Appointment() {
  const [department, setDepartment] = useState('');
  const [doctor, setDoctor] = useState([]);
  const [currentDoctor, setCurrentDoctor] = useState('');
  const departments = [
    { label: 'Select department', disabled:true},
    { label: 'Cardiology' },
    { label: 'Neurology' },
    { label: 'Surgical' },
    { label: 'Dentistry' },
  ];

  useEffect(() => {
    const getdoctors = async () => {
      if (!department || department === 'Select department') {
        setDoctor([{ value: '', label: 'Select doctor', disabled: true }]);
        return;
      } 
      try {
        const response = await api.get(`/api/v1/doctor/${department}`, {
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "application/json"
          }
        });
        const data = response.data.data;
        const doctorList = [
          { value: '', label: 'Select doctor', disabled: true },
          ...data.map((doc) => ({ value: doc._id, label: `${doc.Lname} ${doc.Fname}` })),
        ];
        setDoctor(doctorList);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    }
    getdoctors()
},[department]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className=" w-[70vw] mx-auto flex items-center justify-between mt-20 mb-20">
        <div className="w-[55%] p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-left text-gray-800 mb-8">Book an Appointment</h2>
          <form className="mb-6">
            <div className="flex space-x-6">
              {/* Department Select */}
              <div className="flex-1">
                <label
                  htmlFor="department"
                  className="block text-lg font-semibold text-gray-700 mb-2 tracking-wide"
                >
                  Department
                </label>
                <select
                  id="department"
                  value={department === '' ? 'Select department' : department}
                  onChange={(e) => {
                    setDepartment(e.target.value);
                    setCurrentDoctor('');
                  }}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:border-gray-300 transition-all duration-300 ease-in-out appearance-none cursor-pointer"
                >
                  {departments.map((dept) => (
                    <option
                      key={dept.label}
                      value={dept.label}
                      disabled={dept.disabled}
                      className={dept.disabled ? 'text-gray-400 italic' : 'text-gray-700'}
                    >
                      {dept.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Doctor Select */}
              <div className="flex-1">
                <label
                  htmlFor="doctor"
                  className="block text-lg font-semibold text-gray-700 mb-2 tracking-wide"
                >
                  Doctor
                </label>
                <select
                  id="doctor"
                  value={currentDoctor === '' ? 'Select doctor' : currentDoctor}
                  onChange={(e) => setCurrentDoctor(e.target.value)}
                  disabled={doctor.length <= 1}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:border-gray-300 transition-all duration-300 ease-in-out appearance-none cursor-pointer disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  {doctor.map((doc) => (
                    <option
                      key={doc.label}
                      value={doc.label}
                      disabled={doc.disabled}
                      className={doc.disabled ? 'text-gray-400 italic' : 'text-gray-700'}
                    >
                      {doc.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              
            </div>
          </form>
          <div className="w-full flex items-center justify-center">
            <button
                type="submit"
                className="w-[40%] py-3 mt-4 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
              >
                Book Now
              </button>
          </div>
        </div>
        <div className="w-[40%] p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-left text-gray-800 mb-8">Appointment History</h2>
          {/* Appointment history content */}
          <p className="text-gray-600">No appointments booked yet.</p>  
        </div>
      </div>
      

    </div>
  );
}