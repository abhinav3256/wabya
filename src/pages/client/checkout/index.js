import CheckoutButton from "../../../../src/components/CheckoutButton";		

export default function Home() {
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
                      <label>Price: $10.00</label>
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