import Link from "next/link"

const CoachingJourney = () => {

  return(

    <>
      <section className="about-coaching" id="this-coaching">
        <div className="container">
          <div className="row">

          <div className="col-sm-6 left">
            <div className="inner">
            <h2> this is coaching</h2>
            <p>Put simply, we believe coaching puts you firmly in the driver’s seat on your journey to self-realisation.</p>
            <p>A coach’s responsibility is simply to:</p>
            <p>1.Explore and clarify what you want to achieve; <br />
            2.Draw out solutions and strategies; <br />
            3.Hold you accountable for the process and results; <br/>
            4.Encourage self-discovery throughout.
            </p>
            <p>Ultimately, the coaching process encourages you to become more aware of your strengths and abilities, to take control and responsibility for your life - and to realise your goals.</p>
            <div><Link href="/frontend/apply"><a className="btn">book a free coaching session</a></Link></div>
          </div>
            </div>

          <div className="col-sm-6 right">
            <figure><img src="../../images/img-06.png" alt=""/></figure>
            </div>

          </div> {/* <!-- row --> */}
        </div> {/* <!-- container --> */}
      </section> {/* <!--/ banner --> */}

      <section className="coaching-journey" id="coaching-journey">
        <div className="container">
          <div className="row">

          <div className="col-sm-12 top">
            <h2>your coaching journey</h2>
          </div> {/* <!--/ col-sm --> */}

          <div className="col-sm-4 cj-coll">
            <div className="inner">
              <h3>create your account</h3>
            <p>You’ll be asked to sync your calendar and other important details. </p>
            </div>
          </div> {/* <!--/ col-sm --> */}

          <div className="col-sm-4 cj-coll">
            <div className="inner">
              <h3>book your free coaching session</h3>
              <p>Select a time that works best for you; we’ll find a coach that matches your availability. </p>
            </div>
          </div> {/* <!--/ col-sm --> */}

          <div className="col-sm-4 cj-coll">
            <div className="inner">
              <h3>meet your coach</h3>
              <p>Discovery sessions are also called chemistry sessions for a reason... if the two of you don’t vibe, we’ll connect you with another coach. </p>
            </div>
          </div> {/* <!--/ col-sm --> */}

          </div> {/* <!--/ row --> */}
        </div>
      </section> {/* <!--/ coaching-journey --> */}

      <section className="philosophy">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h3>our philosophy</h3>
            </div>
            <div className="col-sm-12">
              <div className="philosophy-box">
                <figure>
                  <img src="../../../../images/shape-01.png" alt="" />
                </figure>
                <span>a certified coach can coach anyone, on any topic</span>
              </div>
              <div className="philosophy-box">
                <figure>
                  <img src="../../../../images/shape-04.png" alt="" />
                </figure>
                <span>everyone is coachable</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default CoachingJourney
