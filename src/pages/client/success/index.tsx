   
import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";   
import {useRouter} from 'next/router';   
	
import { sendMail } from "../../../../src/services/sendMail";    
import { database } from '../../../../firebaseConfig'
import { collection, query, addDoc, where, getDocs,doc,getDoc,updateDoc } from 'firebase/firestore';


export default function Success() {
  
    const router = useRouter();	
    const payment_id = (router.query.payment_id != null)?router.query.payment_id:''; 
    const payRef = collection(database, "payments");
    const clientRef = collection(database, "client_user");
    const planRef = collection(database, "admin_plans");
    const [payment_detail, setpayment_detail] = useState(null);
    const [client_detail, setclient_detail] = useState(null);
    const [client_total_ses, setclient_total_ses] = useState(-1);
    const [client_remaining_ses, setclient_remaining_ses] = useState(-1);

    const [plan_total_ses, setplan_total_ses] = useState(-1);

    const [client_total_update_ses, setclient_total_update_ses] = useState(-1);
    const [client_remaining_update_ses, setclient_remaining_update_ses] = useState(-1);
    
    const [plan_detail, setplan_detail] = useState(null);
    const [new_plan_id, setnew_plan_id] = useState('');
    const [new_journey_type, setnew_journey_type] = useState('');
    const payments = collection(database, "payments");
        // get all meeting data

        async function sendMailFunc (email,content,subject){   
            let response = await sendMail(email,subject,content);   
          
            console.log('response',response);
          }   


        const getClientDetail = async () => {
            const userId = sessionStorage.getItem("userId");
          
            const queryDoc = query(clientRef, where("__name__", "==", userId));
          
            try {
              const querySnapshot = await getDocs(queryDoc);
          
              const clients = querySnapshot.docs.map((data) => {
                return { ...data.data(), client_id: data.id };
              });
              setclient_detail(clients);

          
              // Now you can access the length of the meetings array
            //   const numberOfMeetings = meetings.length;
          
            //   return numberOfMeetings;
            } catch (error) {
              console.error("Error getting client: ", error);
           //   return 0; // Return 0 if there was an error
            }
          };




          const getPlanDetail = async () => {
           
          
            const queryDoc = query(planRef, where("__name__", "==", new_plan_id));
          
            try {
              const querySnapshot = await getDocs(queryDoc);
          
              const plans = querySnapshot.docs.map((data) => {
                return { ...data.data(), plan_id: data.id };
              });
              setplan_detail(plans);

          
              // Now you can access the length of the meetings array
            //   const numberOfMeetings = meetings.length;
          
            //   return numberOfMeetings;
            } catch (error) {
              console.error("Error getting plans: ", error);
           //   return 0; // Return 0 if there was an error
            }
          };


        const getPeymentDetail = async () => {
            const userId = sessionStorage.getItem("userId");
          
            const queryDoc = query(payRef, where("client_id", "==", userId), where("__name__", "==", payment_id));
          
            try {
              const querySnapshot = await getDocs(queryDoc);
          
              const payments = querySnapshot.docs.map((data) => {
                return { ...data.data(), payment_id: data.id };
              });
              setpayment_detail(payments);

          
              // Now you can access the length of the meetings array
            //   const numberOfMeetings = meetings.length;
          
            //   return numberOfMeetings;
            } catch (error) {
              console.error("Error getting meetings: ", error);
           //   return 0; // Return 0 if there was an error
            }
          };


          const updatePlan = async () => {
            const userId = sessionStorage.getItem("userId");
            const fieldToEdit2 = doc(database, 'client_user', userId);

   
      

      updateDoc(fieldToEdit2, {
        plan_id:new_plan_id,
        remainingSession: client_remaining_update_ses,
        total_session: client_total_update_ses,
        journey_type:new_journey_type,
      })
      .then(() => {
       
        const fieldToEdit = doc(database, 'payments', payment_id);

   
      

      updateDoc(fieldToEdit, {
        status:'success',
        
      })
      .then(() => {
       











        const logoUrl = 'https://wabya.com/images/logo-new.png';
        const msg = `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
           <head>
              <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <title>Wabya</title>
              <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap" rel="stylesheet">
              <style type="text/css">
                 body{padding-top: 0 !important; padding-bottom: 0 !important; padding-top: 0 !important; padding-bottom: 0 !important; margin:0 !important; width: 100% !important; -webkit-text-size-adjust: 100% !important; -ms-text-size-adjust: 100% !important; -webkit-font-smoothing: antialiased !important; font-size:14px; line-height:22px; font-family: 'Lato', sans-serif; font-weight:400;}
              </style>
           </head>
           <body paddingwidth="0" paddingheight="0"  style="" offset="0" toppadding="0" leftpadding="0">
           <div style="display:table; width:600px !important; margin: 0 auto; background: #fff; padding:20px;">
              <table width="600" border="0" cellspacing="0" cellpadding="0" class="tableContent bgBody" align="center" style='width: 600px; display: block;'>
                 <tbody>
                    <tr>
                       <table class="MainContainer" width="600" cellspacing="0" cellpadding="0" border="0" bgcolor="#ece6d5" align="center" style='width: 600px; -webkit-border-radius: 15px; -moz-border-radius: 15px; border-radius: 15px;'>
                          <tbody style=''>
        <tr>
                                <td colspan="2"><div style="text-align: center; margin:35px 0 0" class="contentLogo"><a href="https://www.#.com"><img src="${logoUrl}" width="200px" alt="" border="0" style=""></a></div></td>
                             </tr>
                             <tr>
                                <td>
                                   <div style="padding:0 30px;  position: relative; z-index: 2;line-height: 22px;font-family: 'Lato', sans-serif;font-weight: 600;text-align: center;">
            <p style="color: #3498db;text-align: center;font-size: 36px;">Plan Updated!</p>
        <p style="font-size: 18px; text-align: center; color: #864985;">Your Plan  has been Successfully Updated.</p>
       
        <hr style="border: 1px solid #1c686b;">
        <p style="font-size: 14px; color: #242424; text-align: center;">Thank you,<br>Wabya Team</p>
         </div>  
                                </td>
                             </tr>
                          </tbody>
                       </table>
                    </tr>
                 </tbody>
              </table>
         </div>
           </body>
        </html>
  `;
      sendMailFunc('abhinavkumar3256@gmail.com',msg,'Plan Updated');  














       
      })
      .catch((err) => {
        console.log(err);
      })


      })
      .catch((err) => {
        console.log(err);
      })
  
     
    
    
    
          
       
          };
          
          useEffect(() => {
            if(payment_id != ''){
           getPeymentDetail();
            }
           }, [payment_id]);
           useEffect(() => {
            console.log(payment_detail);

            if(payment_detail != null){
              setnew_journey_type(payment_detail[0].journey_type)
            setnew_plan_id(payment_detail[0].plan_id)
           
            }
            
            }, [payment_detail]);

            useEffect(() => {
               if(new_plan_id != ""){
                getPlanDetail();
                
               }
                }, [new_plan_id]);

                useEffect(() => {
                    if(plan_detail != null){
                    
                      console.log('plan_detail',plan_detail);
                        setplan_total_ses(plan_detail[0].total_session)
                     getClientDetail();
                    }
                     }, [plan_detail]);
     


                useEffect(() => {
                    if(client_detail != null){
                    console.log(client_detail);
                    setclient_total_ses(client_detail[0].total_session);
                    setclient_remaining_ses(client_detail[0].remainingSession);
                    }
                     }, [client_detail]);


                     useEffect(() => {
                        if(client_total_ses != -1){
                        console.log('client_total_ses',client_total_ses);
                        console.log('client_remaining_ses',client_remaining_ses);
                        console.log('plan_total_session',plan_total_ses);
                    setclient_remaining_update_ses(parseInt(client_remaining_ses,10) + parseInt(plan_total_ses,10));
                    if(client_remaining_ses == 0){
                        setclient_total_update_ses(plan_total_ses);
                    }else{
                        setclient_total_update_ses(parseInt(client_total_ses,10) + parseInt(plan_total_ses,10));
                    }
                        }
                         }, [client_total_ses]);


                         useEffect(() => {
                            if(client_total_update_ses != -1){
                            console.log('client_total_update_session',client_total_update_ses);
                            console.log('client_remaining_update_session',client_remaining_update_ses);
                            updatePlan();
                     
                            }
                             }, [client_total_update_ses]);

               
  
  return (
    <>
    <section className="payment-successful">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="check">
              <i className="fa fa-check" aria-hidden="true" />
            </div>
            <h2>payment successful</h2>
            <h3>Your Plan is Now Active.</h3>
          </div>
          {/*/ cl-coll */}
        </div>
        {/*/ row */}
      </div>
    </section>
    {/*/ payment-successful */}
  </>
  
  );
}   



