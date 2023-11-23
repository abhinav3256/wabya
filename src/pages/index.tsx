// owl carousel slider
import OwlCarousel from 'react-owl-carousel2';

// ** React Imports
import { ReactNode } from 'react'

// ** Next Imports
import Link from 'next/link'

// import header & footer files
import Header from 'src/views/frontend/layouts/Header'
import Footer from 'src/views/frontend/layouts/Footer'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

const options = {
  items: 3,
  loop: true,
  nav: true,
  rewind: true,

  // navText: [
  //   "<i class='fa fa-angle-left'></i>",
  //   "<i class='fa fa-angle-right'></i>"
  // ]
};

const Home = () => {

  return (
    <>


      <section className="banner" id="home">
        <div className="container">
          <div className="row">

          <div className="col-sm-8 left">
            <div className="banner-text">
            <h2><span>life. coached.</span>discover what coaching can do for you</h2>
              <div className="padd">
              <p>Exploring your goals and  experiencing genuine fulfillment shouldn’t be something you spend most of your life dreaming about.</p>
              <p>The truth is that you are the only expert on yourself in the whole, wide world.</p>
              <p>Coaching leverages this fact to help you move towards that ideal state - whatever it may be.</p>
              <p>So don’t delay: start exploring what matters to you by booking your free discovery session today.</p>
              <p><Link href="/frontend/coaching-session"><a className="btn"><u>book a free coaching session</u></a></Link></p>
            </div>
          </div>
            </div>

          <div className="col-sm-6 right hidden">
            <figure className="desktop-hidden"><img src="images/banner-bg.png" alt=""/></figure>
            <figure className="mobile-hidden"><img src="images/homepage-banner-mobile.png" alt=""/></figure>
            </div>

          </div> {/* <!-- row --> */}
        </div>
      </section>

      <section className="tag-wrap">
        <div className="container-fluid">
          <div className="row">

          <div className="col-sm-12 tw-coll">
            <div className="inner">
              <h2>1. book your free coaching session</h2>
              <p>This is also known as a discovery session. You'll need to select your coach, and a day / time that works for you. </p>
              <h2>2. meet your coach</h2>
              <p>You'll discuss what you would like to achieve from your coaching journey.
              If the two of you don’t vibe, we’ll connect you with another coach.</p>
              <h2>3. realise your goals</h2>
              <p>You're free to decide if you would like to continue your coaching journey
              or not. If you do, you'll be that much closer to realising your goals.</p>

            </div>
          </div> {/* <!--/ col-sm --> */}

          </div> {/* <!--/ row --> */}
        </div>
      </section>

      <section className="text-wrap">
        <div className="container">
          <div className="row align-items-center">

          <div className="col-sm-6 left">
            <div className="inner">
              <h2>you’re not alone</h2>
              <p>We know what it's like to feel there has to be something more to life than sleep, eat,  work, repeat. We've been there.</p>
              <p>And we believe everyone should have the opportunity to realise their goals and find fulfilment.</p>

              <p><Link href="/frontend/coaching-session"><a className="btn">book a free coaching session</a></Link></p>

            </div>
          </div> {/* <!--/ col-sm --> */}

          <div className="col-sm-6 right">
            <figure><img src="images/img-02.jpg" alt=""/></figure>
            </div>

          </div> {/* <!--/ row --> */}
        </div>
      </section>

      <section className="client-speak">
        <div className="container">
          <div className="row">


          <div className="col-sm-12 top">
            <h2>what our community has to say</h2>
          </div>

          <div className="col-sm-12 carousel-coll">
          <OwlCarousel options={options}>

              <div className="item">
                <div className="inner">
                  <p>"wabya has been such a fuss-free platform! The free discovery call was so amazing as I was nervous and didn't knoww what to expect from coaching, but after chatting with the coach I know this was a step in the rigth direction"</p>
                <h4>Jessica Varvy</h4>
                </div>{/* <!--/ inner --> */}
              </div>{/* <!--/ item --> */}

              <div className="item">
                <div className="inner">
                  <p>"The coaching journey has been really rewarding. I have learned how to better communicate with my team and to reflect on my leadership skills. My coach, Sarah, was a phenomenal listener and gave me fantastic tips to improve my performance. Sarah had that natural ability to make you recognize your own potential and help to guide you towards it."</p>
                <h4>Waldo Benjamin</h4>
                </div>{/* <!--/ inner --> */}
              </div>{/* <!--/ item --> */}

              <div className="item">
                <div className="inner">
                  <p>"My Coach Dave was an invaluable source of advice, motivation and guideance throughout my tumultuous post-college career search. He helped me to indentify my strengths and define what it wa that I really wanted to achieve. Dave was endlessly positive, supportive and motivating form the beginning of my search until my final interview. I would not have got here without him!"</p>
                <h4>Martha McEwan</h4>
                </div>{/* <!--/ inner --> */}
              </div>{/* <!--/ item --> */}
              <div className="item">
                <div className="inner">
                  <p>"wabya has been such a fuss-free platform! The free discovery call was so amazing as I was nervous and didn't knoww what to expect from coaching, but after chatting with the coach I know this was a step in the rigth direction"</p>
                <h4>Jessica Varvy</h4>
                </div>{/* <!--/ inner --> */}
              </div>{/* <!--/ item --> */}

              <div className="item">
                <div className="inner">
                  <p>"The coaching journey has been really rewarding. I have learned how to better communicate with my team and to reflect on my leadership skills. My coach, Sarah, was a phenomenal listener and gave me fantastic tips to improve my performance. Sarah had that natural ability to make you recognize your own potential and help to guide you towards it."</p>
                <h4>Waldo Benjamin</h4>
                </div>{/* <!--/ inner --> */}
              </div>{/* <!--/ item --> */}

              <div className="item">
                <div className="inner">
                  <p>"My Coach Dave was an invaluable source of advice, motivation and guideance throughout my tumultuous post-college career search. He helped me to indentify my strengths and define what it wa that I really wanted to achieve. Dave was endlessly positive, supportive and motivating form the beginning of my search until my final interview. I would not have got here without him!"</p>
                <h4>Martha McEwan</h4>
                </div>{/* <!--/ inner --> */}
              </div>{/* <!--/ item --> */}

          </OwlCarousel>

            </div> {/* <!--/ right --> */}

          </div> {/* <!--/ row --> */}
        </div>
      </section>


    </>
  )
}

Home.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default Home
