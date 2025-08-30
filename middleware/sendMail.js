const nodemailer = require("nodemailer");

const sendMail = (name, email, message) => {
  // Create transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  // Mail options
  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: email,
    subject: "Thank you for contacting us!",
    text: `Hi ${name},\n\nThank you for reaching 
     out. We have received your 
     message:\n\n"${message}"\n\n`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = { sendMail };
