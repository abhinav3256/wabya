import axios from "axios";   
export const sendMail = async (to_mail,sub,msg) => {
  try {
    let request = await axios
      .post("https://email-api-z7re.onrender.com/api/email", {           
        email: to_mail,	    		  
        subject: sub,     
        message: msg,   		  
      })
      .then((res) => {
        return res;
      });
    return request.status === 200 ? true : false;;
  } catch (err) {
    console.error(err);
  }
};			