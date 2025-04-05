import cron from 'node-cron';
import Appointment from '../model/appointmentModel.js'; 
import sendEmail from './email.js';
import Doctor from '../model/doctorModel.js';
import User from '../model/userModel.js';
import Rating from '../model/ratingModel.js';

const notification_periodic =  cron.schedule('* * * * *', async () => {
  try {
    const upcoming_appointments = await Appointment.find({status: 'approved',notification: false}).populate('user','email');
    for (const appointment of upcoming_appointments) {
      const { user, date, time } = appointment;
      const appointmentDate = new Date(`${date} ${time}:00`);
      const currentTime = Date.now();
      const difference =  appointmentDate.getTime() - currentTime;
      if (difference <= 86400000) {
        console.log(`Sending email to ${user.email} for appointment at ${time}`);
        await sendEmail.send_notification_email(user.email, time);
        await Appointment.findByIdAndUpdate(appointment._id,{notification: true});
      }
    }
    
  } catch (err) {
    console.log(err);
  }
  
});

const rating_update_schedule =  cron.schedule('0 * * * *', async () => {
  try {
    console.log("Cron is running");
    const upcoming_appointments = await Appointment.find({status: 'approved', rating: false});
    for (const appointment of upcoming_appointments) {
      const { doctor, user, date, time } = appointment;
      const appointmentDate = new Date(`${date} ${time}:00`);
      const currentTime = Date.now();
      const difference = currentTime - appointmentDate.getTime();
      if (difference >= 86400000*3) {
        await Rating.create({user,doctor,comment:"",rating: 5});
        console.log(`Set rating for appointment: ${appointment._id}`);
      }
    }
  } catch (err) {
    console.log(err);
  }
  
});



export default {notification_periodic , rating_update_schedule };

