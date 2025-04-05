import { useEffect, useState } from 'react';

export default function CurrentDateInfo() {
  const [dateInfo, setDateInfo] = useState({
    day: '',
    date: '',
    month: '',
    year: '',
  });

  useEffect(() => {
    const now = new Date();

    const daysOfWeek = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday',
      'Thursday', 'Friday', 'Saturday'
    ];
    const months = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];

    setDateInfo({
      day: daysOfWeek[now.getDay()],
      date: now.getDate(),
      month: months[now.getMonth()],
      year: now.getFullYear(),
    });
  }, []);

  return dateInfo
}
