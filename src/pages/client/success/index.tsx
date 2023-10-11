   
import React from 'react'; 
import axios from "axios";   
import {useRouter} from 'next/router';   	
import { sendMail } from "../../../../src/services/sendMail";            

export default function Success() {
  const router = useRouter();	
  const client_email = (router.query.email_id != null)?router.query.email_id:'';  
  
  const mail_content = "<h3>Stripe Mail</h3>"+              
                "<p>Client Email:"+client_email+"</p>"+      
                "<p>Payment Status:Successful</p>";     		 			   
  
//   if(client_email !='')
//   {
// 	   (async () => await handleOnClick(client_email,mail_content))();   
	  
//   }

//   async function handleOnClick (email,content){   
//     let response = await sendMail(email,"sample mail",content);   
//     if(response==true)	  								  
// 	{
// 		router.query.email_id = ""; 
// 		router.push(router);				
// 	}
//   }    	
  
  return (
    <div>
	  <h1>Payment Successful! {client_email}</h1>
	  <p>Thank you for your purchase.</p>		
	</div>
  );
}   



