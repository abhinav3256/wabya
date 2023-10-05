import Stripe from "stripe"; 
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try { 		
      const session = await stripe.checkout.sessions.create({
		// billing_address_collection: "required",   		
        payment_method_types: ["card"],    
        line_items: [
          {
            price_data: {
              currency: "usd",  			  
              product_data: {
                name: "sample item",   
              },
              unit_amount: 10*100,	
            },
            quantity: 1,
          },
        ],
        mode: "payment",		 		
        success_url: `${req.headers.origin}/client/checkout/success`,		
        cancel_url: `${req.headers.origin}/client/checkout/cancel`,  					
      });

      res.status(200).json({ sessionId: session.id });
    } catch (err) {
      res.status(500).json({ error: "Error creating checkout session" });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");		
  }
}