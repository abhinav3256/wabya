import Link from 'next/link'

// import Script from 'next/script'

const Footer = () => {
  return (
    <>
      <footer className='footer'>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-8 left'>
              <div className='row'>
                <div className='col-sm-2'>
                  <div className='wg-1'>
                    <h4>home</h4>
                  </div>
                </div>

                <div className='col-sm-2'>
                  <div className='wg-1'>
                    <h4>about us</h4>
                    <ul>
                      <li>
                        <Link href='/frontend/about/#meet-team'>meet the team</Link>
                      </li>
                      <li>
                        <Link href='/frontend/about/#mission'>mission & vision</Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className='col-sm-2'>
                  <div className='wg-1'>
                    <h4>coaching journey</h4>
                    <ul>
                      <li>
                        <Link href='/frontend/coaching-journey/#this-coaching'>this is coaching</Link>
                      </li>
                      <li>
                        <Link href='/frontend/coaching-journey/#coaching-journey'>the coaching journey</Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className='col-sm-2'>
                  <div className='wg-1'>
                    <h4>pricing</h4>
                    <ul>
                      <li>
                        <Link href='/frontend/pricing/#pricing-option'>pricing options</Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className='col-sm-2'>
                  <div className='wg-1'>
                    <h4>FAQ</h4>
                    <ul>
                      <li>
                        <Link href='/frontend/faq/#faq'>privacy policy</Link>
                      </li>
                      <li>
                        <Link href='/frontend/faq/#faq'>terms & conditions</Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className='col-sm-2'>
                  <div className='wg-1'>
                    <h4>contact</h4>
                    <ul>
                      <li>
                        <Link href='/frontend/contact'>contact us</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-sm-4 right'>
              <div className='row'>
                <div className='col-sm-6'>
                  <div className='wg-1'>
                    <div className='coach-btn'>
                      <Link href='/frontend/coach-with-us'>
                        <a className='btn'>coach with us</a>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className='col-sm-6'>
                  <div className='wg-1'>
                    <div className='icon-ft'>
                      <Link href='https://www.instagram.com/wearebecauseyouare/' passHref>
                        <a target='_blank'><i className='fa fa-instagram'></i></a>
                      </Link>
                      <a target='_blank' href='#'>
                        <i className='fa fa-youtube-play'></i>
                      </a>
                      <a target='_blank' href='#'>
                        <i className='fa fa-linkedin'></i>
                      </a>

                      
                    </div>
<div className='footer-arrow mobile-hidden'><a href="#"><img src='https://wabya.com/images/arrow-up.png' alt="arrow" /></a></div>

                   
                  </div>
                </div>


                
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* <!-- Bootstrap Core JavaScript --> */}

      <script src="https://code.jquery.com/jquery-3.6.3.min.js" async> </script>
      <script src="/js/bootstrap.bundle.min.js" async> </script>
      <script src="/js/owl.carousel.min.js" async> </script>
      <script src="/js/jquery.twentytwenty.js" async> </script>
      <script src="/js/jquery.event.move.js" async> </script>
      <script type="text/javascript" src="/js/script.js" async> </script>
    </>
  )
}

export default Footer
