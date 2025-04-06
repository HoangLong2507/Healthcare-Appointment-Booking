import React,{useState, useEffect} from 'react';
const Calendar = ({selectedDate,setSelectedDate}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState([]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay(); 
    const daysInMonth = new Date(year, month + 1, 0).getDate(); 
    return { firstDay, daysInMonth };
  };
  
  useEffect(() => {
    const { firstDay, daysInMonth } = getDaysInMonth(currentDate);
    const daysArray = [];

    for (let i = 0; i < firstDay; i++) {
      daysArray.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    }

    setDays(daysArray);
  }, [currentDate]);

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDayClick = (day) => {
    if (day && day >= new Date()) {
      setSelectedDate(day);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDayOfWeek = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const formatMonth = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short' });
  }

  return (
    <div className="w-[35vw] mx-auto mt-6">
      {/* Header: Ngày hiện tại và nút chuyển tháng */}
      <div className="flex justify-between items-center mb-4">
        <span className="font-bold text-xl">
          {formatDate(selectedDate || currentDate)}
        </span>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="text-2xl">&lt;</button>
          <button onClick={nextMonth} className="text-2xl">&gt;</button>
        </div>
      </div>

      {/* Danh sách các ngày */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          const isDisabled = day && (day < new Date() || day.getDay()==0); // Ngày nhỏ hơn ngày hiện tại
          const isSelected = day && selectedDate && day.toDateString() === selectedDate.toDateString();

          return (
            <div
              key={index}
              onClick={() => handleDayClick(day)}
              className={`p-2 text-center border rounded-md 
                ${day ? 'cursor-pointer' : 'cursor-default'} 
                ${isDisabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-blue-500 hover:text-white'} 
                ${isSelected ? 'bg-blue-500 text-white' : ''}`}
            >
              {day ? (
                <>
                  <div className="text-xs">{formatDayOfWeek(day)}</div>
                  <div>{day.getDate()}</div>
                  <div>{formatMonth(day)}</div>
                </>
              ) : (
                <div>&nbsp;</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};


export default Calendar;