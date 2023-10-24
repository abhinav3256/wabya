import { useState, ReactNode, useEffect } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import { app, database,storage } from "../../firebaseConfig";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  where,
  query,
} from "firebase/firestore";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const CheckoutButton = ({price,journey_type}) => {
  const router = useRouter();

 // const [price, setPrice] = useState(0);

  const [plan_id, setPlanId] = useState('');
  const [showPayForm, setShowPayForm] = useState(false);
  const [doc_id, setDocId] = useState('');
  useEffect(() => {
    // Try to get the value from localStorage
    try {
      const storedValue = localStorage.getItem('price');
      const storedValue2 = localStorage.getItem('buy_plan_id');
     
      // Update state with the value if it exists
      if (storedValue && storedValue2) {
        //setPrice(storedValue);
        setPlanId(storedValue2);
      }

    
    } catch (error) {
      // Handle potential errors accessing localStorage here
      console.error('Error accessing localStorage:', error);
    }
  }, []);
  const requestRef = collection(database, "payments");
  useEffect(() => {
    setShowPayForm(false);
    if(price != 0){
  addDoc(requestRef, {
    plan_id: plan_id,
   
   client_id:sessionStorage.getItem("userId"),
   status:'pending',
   price:price,
   journey_type:journey_type,


  })
    .then((docref) => {
      setDocId(docref.id);
     
     // Re-enable the button and remove loading state
  setShowPayForm(true);
    })
    .catch((err) => {
      console.error(err);
       // Re-enable the button and remove loading state
      
    })
  }
  }, [price]);  
  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price: price, // Send the price ID to the server
          plan_id: plan_id,
          doc_id:doc_id,
          client_id:sessionStorage.getItem("userId"),
        }),
      });

      const { sessionId } = await response.json();
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        router.push("/client/checkout/error");					
      }
    } catch (err) {
      console.error("Error in creating checkout session:", err);
      router.push("/error");
    }
  };
  
  return (
  <div>
      {/* Your other JSX elements */}
      {showPayForm && <button onClick={handleCheckout} className="btn buyagain-btn">Pay Now</button>}
    </div>	
  )	
};

export default CheckoutButton;    