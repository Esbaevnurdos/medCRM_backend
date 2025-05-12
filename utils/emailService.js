const nodemailer = require("nodemailer");

const sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nurdosesbaev82@gmail.com",
      pass: "ztlk wpfo zfmt zozc",
    },
  });

  const mailOptions = {
    from: "nurdosesbaev82@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendOTPEmail;
