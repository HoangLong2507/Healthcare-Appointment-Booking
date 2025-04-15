import {useState,useEffect,useMemo} from 'react';
import api from '../../api/axios';
import Calendar from '../../components/Calendar';
import { Toaster,toast } from 'react-hot-toast';
import {useAuth} from '../../contexts/AuthContext';

export default function Appointment() {
  const [department, setDepartment] = useState('');
  const [doctor, setDoctor] = useState([]);
  const [currentDoctor, setCurrentDoctor] = useState('');
  const [currentDoctorLabel, setCurrentDoctorLabel] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState(null);
  const {userInfor} = useAuth();
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
  const doctorMap = useMemo(() => {
    const map = {};
    doctor.forEach(doc => {
      map[doc.label] = doc.value;
    });
    return map;
  }, [doctor]);

  const HandleSubmit = async () => {
    const formatDateToYYYYMMDD = (date) => {
      if (!date || !(date instanceof Date)) return '';
    
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); 
      const day = String(date.getDate()).padStart(2, '0'); 
    
      return `${year}/${month}/${day}`;
    };
    try {
      const result = await api.post('/api/v1', {
        "date": formatDateToYYYYMMDD(selectedDate),
        "time": selectedTime.split(' ')[0],
        "doctor": currentDoctor,
        "user": userInfor._id,
        "reason": reason
      }); 
      if (result.data.status == "success") {
        toast.success("You have booked an appointment successfully",{
          duration: 3000
        });
      } else {
        toast.error(result.data.message || "Failed to book an appointment",{
          duration:2500
        })
      }
      setCurrentDoctor('')
      setSelectedDate(null)
      setSelectedTime('')
      setDepartment('')
      setCurrentDoctorLabel('')
      setReason(null);
    } catch(err) {
      toast.error(err.response.data.message, { duration: 2500 });
    }
  }

  return (
    <>
      <Toaster/>
      <div className="min-h-screen bg-gray-100">
        <div className=" w-[87vw] mx-auto flex items-center justify-between mt-20 mb-20">
          <div className="w-full p-8 bg-white rounded-xl shadow-lg">
            <h2 className="text-4xl font-bold text-left text-gray-800 mb-8">Book an Appointment</h2>
            <div className="mb-20">
              <div className="flex">
                <div className="w-[55%] flex flex-col justify-center items-center space-y-12">
                <div className="w-full flex items-center space-x-6">
                    {/* Department Select */}
                    <div className="flex-1">
                      <label
                        htmlFor="department"
                        className="block text-lg font-bold text-gray-700 mb-2 tracking-wide"
                      >
                        Department
                      </label>
                      <select
                        id="department"
                        value={department === '' ? 'Select department' : department}
                        onChange={(e) => {
                          setDepartment(e.target.value);
                          setCurrentDoctor('');
                          setCurrentDoctorLabel('');
                        }}
                        className="w-full px-4 py-3 bg-white border border-gray-400 rounded-lg shadow-sm text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:border-gray-300 transition-all duration-300 ease-in-out appearance-none cursor-pointer"
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
                        className="block text-lg font-bold text-gray-700 mb-2 tracking-wide"
                      >
                        Doctor
                      </label>
                      <select
                        id="doctor"
                        value={currentDoctorLabel === '' ? 'Select doctor' : currentDoctorLabel}
                        onChange={(e) => {
                          const selectedLabel = e.target.value;
                          const selectedValue = doctorMap[selectedLabel];
                          setCurrentDoctor(selectedValue);
                          setCurrentDoctorLabel(selectedLabel);
                        }}
                        disabled={doctor.length <= 1}
                        className="w-full px-4 py-3 bg-white border border-gray-400 rounded-lg shadow-sm text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:border-gray-300 transition-all duration-300 ease-in-out appearance-none cursor-pointer disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
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
                  <div className="flex flex-col items-start gap-1 w-full">
                    <label htmlFor="reason" className="block text-lg font-bold text-gray-700 mb-2 tracking-wide">Symptom</label>
                    <input
                      id="reason"
                      onChange={e => setReason(e.target.value)}
                      value={reason}
                      type="text"
                      className="w-full bg-white border border-gray-400 rounded-lg shadow-sm px-4 py-3 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:border-gray-300 transition-all duration-300 ease-in-out appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                <div className="flex flex-col w-[40%] mx-10 my-2 shadow-lg justify-center items-center border-2 border-gray-300 rounded-lg p-6 bg-gray-100">
                  <label className="block text-3xl font-bold  mb-4 tracking-wide transform transition-all duration-300 ease-in-out hover:scale-105">
                    APPOINTMENT HEALTHCARE
                  </label>
                  <p className="text-gray-500 text-lg font-medium px-8 py-4 bg-white bg-opacity-60 rounded-lg shadow-lg hover:bg-opacity-80 transition-all duration-200">
                    Book your appointment with the best doctors in the field. Choose a department in advance and then doctor, select a date, select suitable time and book your appointment now. Note symtomps if any.
                  </p>
                </div>
              </div>
              
              <div className="flex mt-4">
                <div className="w-[55%]">
                  <div className="flex flex-col space-x-6 ">
                    <label className="block text-2xl mb-6 mt-10 font-bold text-gray-700 tracking-wide 
                          transition-all duration-300">
                      Choose Date
                    </label>
                    <Calendar {...{setSelectedDate,selectedDate}} />
                  </div>
                </div>
                <div className="flex flex-col w-[40%] px-10 mt-10">
                  <label className="block text-2xl mb-6 font-bold text-gray-700 tracking-wide 
                          transition-all duration-300">
                    Choose Time
                  </label>
                  <div>
                      <GetTime {...{selectedDate,currentDoctor,setSelectedTime}}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex items-center justify-center">
              <button
                type="click"
                onClick={HandleSubmit}
                className="w-[40%] py-3 mt-4 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



const GetTime = ({ selectedDate, currentDoctor, setSelectedTime }) => {
  

  const [selectedTimeLabel, setSelectedTimeLabel] = useState(null); 
  const [morning_time,setMorningtime] = useState([])
  const [afternoon_time,setAfternoontime] = useState([])
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const morningtime = [
    { label: '8:00 AM', disabled: false },
    { label: '8:30 AM', disabled: false },
    { label: '9:00 AM', disabled: false },
    { label: '9:30 AM', disabled: false },
    { label: '10:00 AM', disabled: false },
    { label: '10:30 AM', disabled: false },
    { label: '11:00 AM', disabled: false },
    { label: '11:30 AM', disabled: false },
  ];

  const afternoontime = [
    { label: '12:00 PM', disabled: false },
    { label: '12:30 PM', disabled: false },
    { label: '13:00 PM', disabled: false },
    { label: '13:30 PM', disabled: false },
    { label: '14:00 PM', disabled: false },
    { label: '14:30 PM', disabled: false },
    { label: '15:00 PM', disabled: false },
    { label: '15:30 PM', disabled: false },
    { label: '16:00 PM', disabled: false },
    { label: '16:30 PM', disabled: false },
  ];
  useEffect(() => {
    const getTime = async () => {
      if (!selectedDate || currentDoctor === '') {
        const morning_time = morningtime.map((time) => ({ ...time, disabled: true }));
        const afternoon_time = afternoontime.map((time) => ({ ...time, disabled: true }));
        setMorningtime(morning_time);
        setAfternoontime(afternoon_time);
        setSelectedTime('');
        return;
      }

      try {
        const response = await api.get(`/api/v1/doctor/timetable/${currentDoctor}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "application/json",
          },
        });
        const data = response.data.data.timetable;

        const daytime = data.find((item) => item.day === daysOfWeek[selectedDate.getDay()]);

        if (daytime.time == 1) {
          const morning_time = morningtime.map((time) => ({ ...time, disabled: false }));
          const afternoon_time = afternoontime.map((time) => ({ ...time, disabled: true }));
          setMorningtime(morning_time);
          setAfternoontime(afternoon_time);

        } else if (daytime.time == 2) {
          const morning_time = morningtime.map((time) => ({ ...time, disabled: true }));
          const afternoon_time = afternoontime.map((time) => ({ ...time, disabled: false }));
          setMorningtime(morning_time);
          setAfternoontime(afternoon_time);

        } else if (daytime.time == 0) {
          const morning_time = morningtime.map((time) => ({ ...time, disabled: true }));
          const afternoon_time = afternoontime.map((time) => ({ ...time, disabled: true }));
          setMorningtime(morning_time);
          setAfternoontime(afternoon_time);

        } 

      } catch (error) {
        console.error('Error fetching timetable:', error);

        const morning_time = morningtime.map((time) => ({ ...time, disabled: false }));
        const afternoon_time = afternoontime.map((time) => ({ ...time, disabled: false }));
        setMorningtime(morning_time);
        setAfternoontime(afternoon_time);
      }
    };
    getTime();
  }, [selectedDate, currentDoctor]);

  const handleTimeClick = (timeLabel) => {
      setSelectedTimeLabel(timeLabel);
      setSelectedTime(timeLabel); 
  };

  return (
    <div className="w-[600px] mx-auto mt-6">
      {/* Morning Section */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-700 mb-4">Morning</h3>
        <div className="grid grid-cols-5 gap-2">
          {morning_time.map((time, index) => (
            <div
              key={index}
              onClick={() => handleTimeClick(time.label)}
              className={`p-2 text-center border rounded-md 
                ${time.disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'cursor-pointer hover:bg-blue-500 hover:text-white'} 
                ${selectedTimeLabel === time.label && !time.disabled ? 'bg-blue-500 text-white' : ''}`}
            >
              {time.label}
            </div>
          ))}
        </div>
      </div>

      {/* Afternoon Section */}
      <div>
        <h3 className="text-lg font-bold text-gray-700 mb-4">Afternoon</h3>
        <div className="grid grid-cols-5 gap-2">
          {afternoon_time.map((time, index) => (
            <div
              key={index}
              onClick={() => handleTimeClick(time.label)}
              className={`p-2 text-center border rounded-md 
                ${time.disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'cursor-pointer hover:bg-blue-500 hover:text-white'} 
                ${selectedTimeLabel === time.label && !time.disabled ? 'bg-blue-500 text-white' : ''}`}
            >
              {time.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


