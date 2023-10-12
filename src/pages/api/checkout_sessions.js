import Stripe from "stripe"; 
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try { 		
      const { price } = req.body; // Get price from the request body 	
      const { doc_id } = req.body; // Get price from the request body 
      const { plan_id } = req.body; // Get price from the request body 
      const { client_id } = req.body; // Get price from the request body 		
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
              unit_amount: price *100,	
            },
            quantity: 1,
          },
        ],
        mode: "payment",		 		
        success_url: `${req.headers.origin}/client/success?status=success&payment_id=${doc_id}`,		
        cancel_url: `${req.headers.origin}/client/failed?status=error&payment_id=${doc_id}`,  	
        metadata: {
          plan_id: plan_id, // Add your custom data here
          client_id: client_id, // You can add more custom key-value pairs as needed
          payment_id: doc_id,
        },				
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