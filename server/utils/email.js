import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "long.nguyendt04@hcmut.edu.vn", 
    pass: process.env.EMAIL_PASSWORD,  
  },
});

const sendEmail = async (email,time) => {
  const mailOptions = {
    from: '"Appointment Booking" long.nguyendt04@hcmut.edu.vn',
    to: email,
    subject: "Booking notification",
    text: `Thông báo lịch hẹn\n\nXin chào,\n\nBạn có một lịch hẹn khám bệnh vào lúc ${time} ngày mai.\nVui lòng kiểm tra thông tin chi tiết trong hệ thống. `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Lỗi khi gửi email: ", error);
    } else {
      console.log("Email đã gửi thành công: ");
    }
  });
}

export default sendEmail;
