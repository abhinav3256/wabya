import { useState, ReactNode, useEffect } from 'react'
import CheckoutButton from "../../../../src/components/CheckoutButton";		

export default function Home() {
  const [price, setPrice] = useState(0);
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
  return (
    <section className="client-password">		
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h3>Payment Now</h3>  
            <div className="row">
              <div className="col-sm-7">
                <div className='inner-info'>
                
                  <div className="row">
                    <div className="col-sm-5">	
                      <label>Price: ${price}.00</label>
                    </div>
                    <div className="col-sm-5">
                        <CheckoutButton />                          
                    </div>                     
                  </div>
                  
                
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}   