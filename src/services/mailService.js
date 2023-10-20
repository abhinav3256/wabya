var nodemailer = require("nodemailer");
//-----------------------------------------------------------------------------
export async function sendMail(toEmail,subject,otpText) {
  var transporter = nodemailer.createTransport({
    service: "gmail",			
    auth: {
      user: "myselfmadhavsaraswat@gmail.com",
      pass: "qfot tqex kaov fuel",
    },
  });

  var mailOptions = {
    from: "myselfmadhavsaraswat@gmail.com",						
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