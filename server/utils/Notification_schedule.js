import cron from 'node-cron';
import Appointment from '../model/appointmentModel.js'; 
import sendEmail from './email.js';

const notification_periodic =  cron.schedule('* * * * *', async () => {
  try {
    const upcoming_appointments = await Appointment.find({status: 'approved',notification: false}).populate('user','email');
    for (const appointment of upcoming_appointments) {
      const { user, date, time } = appointment;
      const appointmentDate = new Date(`${date} ${time}:00`);
      const currentTime = Date.now();
      const difference = Math.abs(currentTime - appointmentDate.getTime());
      
      if (difference <= 3600000) {
        await sendEmail(user.email, time);
      }
    }
  } catch (err) {
    console.log(err);
  }
  
});

export default notification_periodic;

