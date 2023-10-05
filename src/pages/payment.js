import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";

const stripePromise = loadStripe(
  'pk_test_51NsKZOSIyeFhYqSuQ7KHAxGER0YSzwc8AISB3yswKP3VCZ5XlwD3TIakGSpQMtxx3YvHqvf30A1atizjDNzQotpu00KAimnjQu'
);

const CheckoutButton = () => {
  const router = useRouter();
  
  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { sessionId } = await response.json();
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
       // router.push("/error");
       console.log(error);
      }
    } catch (err) {
      console.error("Error in creating checkout session:", err);
    //  router.push("/error");
    }
  };
  
  return <button onClick={handleCheckout}>Buy Now</button>;
};

export default CheckoutButton;