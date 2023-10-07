import { sendMail } from "../../services/mailService";		
const handler = async (req, res) => {
  try {
    const { method } = req;  	 
	
	const to_email = req.body.email;    
	const subject = req.body.subject;  
	const message = req.body.message;   
	
    switch (method) {
      case "POST": {
        //Do some thing
        await sendMail(           
          to_email,						
          subject,
		  message,    			  	
        );
        res.status(200).send("Success");
        break;
      }
      case "GET": {
		await sendMail(
          "Sample Mail",  
          "madhavsaraswat25@gmail.com",						
          '<h1>Welcome User</h1><p>That is a html mail.</p>'     
        );
        res.status(200).send("Success");  
        //Do some thing
        res.status(200).send(req.auth_data);
        break;
      }
      default:
        res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }  
  } catch (err) {
    res.status(400).json({
      error_code: "api_err",		
      message: err.message,
    });
  }
};

export default handler;