import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "long.nguyendt04@hcmut.edu.vn", 
    pass: process.env.EMAIL_PASSWORD,  
  },
});

const createMailOptions = (email, subject, text) => {
  return {
    from: '"Appointment Booking" long.nguyendt04@hcmut.edu.vn',
    to: email,
    subject,
    text
  };
};

const send_notification_email = async (email,time) => {
  const subject_email = 'Booking Notification';
  const text_email = `Thông báo lịch hẹn\n\nXin chào,\n\nBạn có một lịch hẹn khám bệnh vào lúc ${time} ngày mai.\nVui lòng kiểm tra thông tin chi tiết trong hệ thống. `
  const mailOptions = createMailOptions(email,subject_email,text_email);
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Lỗi khi gửi email: ", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

const send_confirmation_email = async (email,time,date) => {
  const subject_email = 'Appointment Confirmation';
  const text_email = `Xác nhận lịch hẹn\n\nXin chào,\n\nLịch hẹn của bạn đã được xác nhận vào lúc ${time} ngày ${date}. Chúng tôi mong gặp bạn tại thời gian đã hẹn.`;
  const mailOptions = createMailOptions(email,subject_email,text_email);
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Lỗi khi gửi email: ", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

export default {send_notification_email,send_confirmation_email };
