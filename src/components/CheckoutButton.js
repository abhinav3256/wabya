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

const CheckoutButton = () => {
  const router = useRouter();

  const [price, setPrice] = useState(0);
  const [showPayForm, setShowPayForm] = useState(false);
  useEffect(() => {
    // Try to get the value from localStorage
    try {
      const storedValue = localStorage.getItem('price');
     
      // Update state with the value if it exists
      if (storedValue) {
        setPrice(storedValue);
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
    plan_id: 'gdfhjh',
   
   client_id:sessionStorage.getItem("userId"),
   status:'pending',
   price:price,


  })
    .then(() => {
      
     
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