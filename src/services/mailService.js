var nodemailer = require("nodemailer");
//-----------------------------------------------------------------------------
export async function sendMail(toEmail,subject,otpText) {
  var transporter = nodemailer.createTransport({
    // service: "gmail",			
    // auth: {
    //   user: process.env.NODEMAILER_EMAIL,
    //   pass: process.env.NODEMAILER_PW,
    // },
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: 'abhinav.jha195@gmail.com',
      pass: 'upasoggdoennpvud',
    },
    secure: false,
  });

  var mailOptions = {
    from: 'abhinav.jha195@gmail.com',						
    to: toEmail,
    subject: subject,
    html: otpText,			
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      throw new Error(error);
	  console.log("Email Err...");  
    } else {
      console.log("Email Sent");
      return true;
    }
  });
}
