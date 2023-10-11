   
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
    const [payment_detail, setpayment_detail] = useState(null);
    const [new_plan_id, setnew_plan_id] = useState('');
    const payments = collection(database, "payments");
        // get all meeting data


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
          
       
        const fieldToEdit = doc(database, 'payments', payment_id);

   
      

      updateDoc(fieldToEdit, {
        status:'failed',
        
      })
      .then(() => {
       
       
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
            setnew_plan_id(payment_detail[0].plan_id)
            }
            
            }, [payment_detail]);

            useEffect(() => {
               if(new_plan_id != ""){
                updatePlan();
               }
                }, [new_plan_id]);

  
  return (
    <>
    <section className="payment-successful">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="check close">
              <i className="fa fa-times" aria-hidden="true" />
            </div>
            <h2>Payment Failed</h2>
           
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



