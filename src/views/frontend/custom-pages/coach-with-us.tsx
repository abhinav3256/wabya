import Link from "next/link"
import { useState } from "react";

const CoachWithUs = () => {

  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [showDropdown3, setShowDropdown3] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };
  const handleDropdownToggle2 = () => {
    setShowDropdown2(!showDropdown2);
  };
  const handleDropdownToggle3 = () => {
    setShowDropdown3(!showDropdown3);
  };

  return(

      <>
        <section className="why-coach-wabya">
          <div className="container-fluid">
            <div className="row">

            <div className="col-sm-12 wcw-coll">
              <div className="inner">
                <div className="info-grid">
                  <h2>welcome!</h2>
                  <p>Hello there, you wonderful human! We know that, by your chosen profession, you get <Link passHref href='/frontend/about'><a>what we’re trying to do here with wabya.</a></Link></p>
                <p>We’re also delighted that you would consider working with us - so let’s get you started addressing a few questions most coaches typically have.</p>
                <p>Pssst... can’t find what you’re looking for? <Link passHref href='/frontend/contact'><a>Drop us a line!</a></Link></p>
                <p><Link href="/frontend/apply" ><a className="btn">apply to be a wabya coach</a></Link></p>
                </div>
              </div>
            </div>

            </div> {/* --/ row --> */}
          </div>
        </section> {/* <!--/ why-coach-wabya --> */}

        <section className="text-wrap-coach wcw-text-coach">
          <div className="container">
            <div className="row align-items-center">

            <div className="col-sm-12 mrb-70">
              <h2>Why should I coach with wabya?</h2>
              <h4>Because through both our probono and paying coaching streams you’ll be helping transform people’s lives.</h4>
            </div>

            <div className="col-sm-6 left">
              <div className="inner">
                <h3>it’s simple.</h3>
              <p>Our coaching philosophy makes it easy to connect with clients ready to be coached.</p>

              <h3>it’s flexible.</h3>
              <p>You’ve got complete control on when to schedule your sessions - and how to run them.</p>

              <h3>you’re not alone.</h3>
              <p>You’ll be joining a community of coaches, where you can engage with, and learn, from your peers.</p>

              <h3>you’re growing.</h3>
              <p>Not only do we enable your practice - we also enhance it through our <a href="#">collaborations</a> with coaching academies with proven track records.</p>
              <p>We know the coach / client relationship is a ver y special one, and it’s important you feel comfortable with who you’re matched with. If the chemistr y isn’t flowing after the discover y session, we’ll match you with someone else.</p>
              <p>Finally - although there are a number of coaching platforms out there, ours is the only one tailored to truly help new coaches jump-start their coaching practice.</p>
              </div>
            </div>

            <div className="col-sm-6 right">
              <figure><img src="../../../../images/shape-05.png" alt=""/></figure>
              </div>

            </div>
          </div>
        </section>

        <section className="four-easy-steps">
          <div className="container">
            <div className="row">

            <div className="col-sm-12 top">
              <h2><span>four easy steps</span>how does it work?</h2>
            </div>

            <div className="col-sm-3 es-coll">
              <div className="inner">
                <h3>Step 1</h3>
              <p>Fill out <Link href='/frontend/apply' passHref><a>this form</a></Link></p>
              </div>
            </div>

            <div className="col-sm-3 es-coll">
              <div className="inner">
                <h3>Step 2</h3>
              <p>Talk to someone in our coaching team (they’ll be in touch!)</p>
              </div>
            </div>
            <div className="col-sm-3 es-coll">
              <div className="inner">
                <h3>Step 3</h3>
              <p>Get onboarded</p>
              </div>
            </div>

            <div className="col-sm-3 es-coll">
              <div className="inner">
                <h3>Step 4</h3>
              <p>Get matched and connect with clients - all on our platform!</p>
              </div>
            </div>

            </div>
          </div>
        </section> {/* <!-- / easy-steps --> */}

        <section className="get-paid">
          <div className="container">
            <div className="row align-items-center">

            <div className="col-sm-6 left">
              <div className="inner">
                <h2>how much <br/>do I get paid?</h2>
              <p>Our Mission is to make coaching accessible and affordable for everyone - so we’ve established different payment tiers based on your experience level.</p>
              <p>In all cases, your hours can be counted towards additional accreditation with the ICF, AC or EMCC.</p>
              <p>As always, don’t be shy to <Link passHref href='/frontend/contact'><a>reach out</a></Link> with any questions!</p>
              </div>
            </div>

            <div className="col-sm-6 right">
              <div className="session-grid">
              <div className="dropdown">
                <div className="inner">
                <button className={`btn dropdown-toggle ${showDropdown ? "show" : ""}`} type="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={handleDropdownToggle}>novice <span><small>per session</small> £ 20</span></button>
                <div className={`dropdown-menu ${showDropdown ? "show" : ""}`}><p>you’re newly or recently certified but have not reached your ICF ACC level (or AC / EMCC equivalent). You will make £20 per 45 minute coaching session.</p></div>
              </div>
              </div>

              <div className="dropdown">
                <div className="inner">
                <button className={`btn dropdown-toggle ${showDropdown2 ? "show" : ""}`} type="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={handleDropdownToggle2}>experienced <span><small>per session</small> £ 50</span></button>
                <div className={`dropdown-menu ${showDropdown2 ? "show" : ""}`}><p>you’re newly or recently certified but have not reached your ICF ACC level (or AC / EMCC equivalent). You will make £20 per 45 minute coaching session.</p></div>
              </div>
              </div>

              <div className="dropdown">
                <div className="inner">
                <button className={`btn dropdown-toggle ${showDropdown3 ? "show" : ""}`} type="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={handleDropdownToggle3}>probono <span>
                  {/* <small>free of charge sessions</small> */}
                  <Link href='/client/login' passHref><a className="text-white"><small>client attestation</small></a></Link>
                  </span></button>
                <div className={`dropdown-menu ${showDropdown3 ? "show" : ""}`}><p>you’re newly or recently certified but have not reached your ICF ACC level (or AC / EMCC equivalent). You will make £20 per 45 minute coaching session.</p></div>
              </div>
              </div>

            </div>
              </div>

            </div>
          </div>
        </section> {/* <!-- / get paid --> */}

      </>
  )
}
export default CoachWithUs
