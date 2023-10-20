   
import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";   
import {useRouter} from 'next/router';   
	
import { sendMail } from "../../../../src/services/sendMail";    
import { database } from '../../../../firebaseConfig'
import { collection, query, addDoc, where, getDocs,doc,getDoc,updateDoc } from 'firebase/firestore';


export default function AvblCheck() {
  
    const router = useRouter();	
    const payment_id = (router.query.payment_id != null)?router.query.payment_id:''; 
    const payRef = collection(database, "payments");
    const [payment_detail, setpayment_detail] = useState(null);
    const [new_plan_id, setnew_plan_id] = useState('');
    const payments = collection(database, "payments");
        // get all meeting data


  
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



