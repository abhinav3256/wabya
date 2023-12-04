import Link from "next/link"
import { InformationOutline } from "mdi-material-ui"
import React, {useState} from 'react';

const About = () => {

  const [isShownOne, setIsShownOne] = useState(false);
  const [isShownTwo, setIsShownTwo] = useState(false);
  const [isShownThree, setIsShownThree] = useState(false);
  const [isShownFour, setIsShownFour] = useState(false);

  return(

    <>
    <section className="banner-info">
      <div className="container">
        <div className="row align-items-center">
        <div className="col-sm-6 left">
          <div className="inner">
          <h2> hi, nice to meet you </h2>
          <p>We know what it's likes to feel there has to be something more to life than sleep, eat, work, repeat. We've been there. </p>
          <p>And we've discovered realising our own goals and finding fulfilment is possible. </p>
          <p>In fact, we believe <strong>everyone</strong> should be given that opportunity.</p>
          <p>Because if <strong>you</strong> do it, your family, friends and those important to you will also benefit.</p>
          <p>So welcome to wabya, and join us as we do our bit to make a better society. </p>
          <p>For everyone. </p>
          <p>Everywhere.</p>
          <p><Link href="/frontend/coach-with-us"><a className="btn">learn more about coaching</a></Link></p>

        </div>
          </div>

        <div className="col-sm-6 right">
          <iframe src="https://www.youtube.com/embed/GpK8THC4KTM" title="discover what coaching can do for you" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          {/* <figure className="about-fig"><img src="../images/shape-01.png" alt=""/></figure> */}

          </div>

        </div>
      </div>
    </section>

    <section className="meet-team" id="meet-team">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 top">
              <h2>meet the team</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat id purus non lacinia. Aliquam a mauris vitae augue faucibus porta.
Nullam mattis ac ex in blandit. Aliquam ut accumsan ex.</p>
            </div>
            <div className="meet-client">
              <div className="col-sm-3">
              <div className="meet-client-box">
                <figure>
                  <img src="../../../../images/clients-01.png" alt="Co-founder"  />
                </figure>
                <h4>jf</h4>
                <span>co-founder</span>
                <p>Lorem ipsum dolor sit amet, consectetuer</p>
              </div>
              </div>
              <div className="col-sm-3">
              <div className="meet-client-box">
                <figure>
                  <img src="../../../../images/clients-01.png" alt="Co-founder"  />
                </figure>
                <h4>craig</h4>
                <span>co-founder</span>
                <p>Lorem ipsum dolor sit amet, consectetuer</p>
              </div>
              </div>

              <div className="col-sm-3">
              <div className="meet-client-box">
                <figure>
                  <img src="../../../../images/clients-01.png" alt="Head of Collaboration"  />
                </figure>
                <h4>martin</h4>
                <span>head of collaboration</span>
                <p>Lorem ipsum dolor sit amet, consectetuer</p>
              </div>
              </div>

              <div className="col-sm-3">
              <div className="meet-client-box">
                <figure>
                  <img src="../../../../images/clients-01.png" alt="Chief People Officer"  />
                </figure>
                <h4>ciara</h4>
                <span>chief people officer</span>
                <p>Lorem ipsum dolor sit amet, consectetuer</p>
              </div>
              </div>

            </div>
          </div>
        </div>
    </section>

    <section className="pvmv" id="mission">
        <div className="container">
          <div className="row">

          <div className="col-sm-3 gs-coll">
            <div className="inner">

                <InformationOutline className='info-outline' onMouseEnter={() => setIsShownOne(true)} onMouseLeave={() => setIsShownOne(false)} />
                {isShownOne && (

                  <div className="inside-box">
                    <p><strong>realisation</strong> in this context, means two things:</p>
                    <p>to become fully aware of (something) as a fact; to understand clearly; and, to cause to happen; to make real and tangible.</p>
                  </div>
                )}

              <h3>our purpose</h3>
              <p>To help humanity self-realise.</p>
            </div>
          </div>

          <div className="col-sm-3 gs-coll">
            <div className="inner">

            <InformationOutline className='info-outline' onMouseEnter={() => setIsShownTwo(true)} onMouseLeave={() => setIsShownTwo(false)} />
                {isShownTwo && (

                  <div className="inside-box">
                    <p><strong>realisation</strong> in this context, means two things:</p>
                    <p>to become fully aware of (something) as a fact; to understand clearly; and, to cause to happen; to make real and tangible.</p>
                  </div>
                )}

              <h3>our vision </h3>
              <p>A world where collective realisation is achieved through individual self-realisation.</p>
            </div>
          </div>

          <div className="col-sm-3 gs-coll">
            <div className="inner">

            <InformationOutline className='info-outline' onMouseEnter={() => setIsShownThree(true)} onMouseLeave={() => setIsShownThree(false)} />
                {isShownThree && (

                  <div className="inside-box">
                    <p><strong>realisation</strong> in this context, means two things:</p>
                    <p>to become fully aware of (something) as a fact; to understand clearly; and, to cause to happen; to make real and tangible.</p>
                  </div>
                )}

              <h3>our mission</h3>
              <p>To make coaching accessible and affordable to everyone.</p>
            </div>
          </div>

          <div className="col-sm-3 gs-coll">
            <div className="inner">

            <InformationOutline className='info-outline' onMouseEnter={() => setIsShownFour(true)} onMouseLeave={() => setIsShownFour(false)} />
                {isShownFour && (

                  <div className="inside-box">
                    <p><strong>realisation</strong> in this context, means two things:</p>
                    <p>to become fully aware of (something) as a fact; to understand clearly; and, to cause to happen; to make real and tangible.</p>
                  </div>
                )}

              <h3>our values</h3>
              <ul>
                <li>Openness</li>
                <li> Curiosity</li>
                <li> Courage</li>
                <li> Integrity</li>
                <li> Unity</li>
              </ul>
            </div>
          </div>

          </div>
        </div>
      </section>
    </>
  )
}
export default About
