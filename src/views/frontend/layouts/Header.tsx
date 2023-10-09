import Link from "next/link"
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Header = () => {
  const router = useRouter();
  const { pathname } = useRouter();
  console.log(pathname);

  const [logindropdown, setlogindropdown] = useState(false);
  const [signupdropdown, setsignupdropdown] = useState(false);
  const [menuCollapse, setmenuCollapse] = useState(false);
  const setlogin = () => {
    setlogindropdown(logindropdown => !logindropdown);
	setsignupdropdown(false);
  };
  const setsignups = () => {
	console.log('test');
    setsignupdropdown(signupdropdown => !signupdropdown);
	setlogindropdown(false);
  };

  const Setmenu = (event) => {
	event.preventDefault();
	console.log('test');
	setTimeout(() => {

		
		if(menuCollapse){
		$(".navbar-nav").slideUp("slow", function() {
			setmenuCollapse(menuCollapse => !menuCollapse);
		});
	}

	if(!menuCollapse){
		$(".navbar-nav").slideDown("slow", function() {
			setmenuCollapse(menuCollapse => !menuCollapse);
		});
	}

		
	  }, 200); // 1 second delay
  };

  useEffect(() => {
	

	setmenuCollapse(false);
	console.log('route changed');
 // 1 second delay
  }, [router.pathname])
  return(
  <header className="header">
  <div className="menu-head">
    <div className="container">

	  <nav className="navbar navbar-expand-lg">
	    <div className="container-fluid">
		  <Link href="/"><a className="navbar-brand"><img src={`${router.basePath}/images/logo.png`}  alt="Wabya"/></a></Link>
		  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon" onClick={Setmenu}></span></button>

		  <div className={`collapse navbar-collapse ${menuCollapse ? 'show' : ''}`} id="navbarSupportedContent">
		    <ul className="navbar-nav">
			  <li className={router.pathname == "/" ? "active" : ""}><Link href="/"><a>home</a></Link></li>
			  <li className={router.pathname == "/frontend/about" ? "about-active" : ""}><Link href="/frontend/about">about us</Link></li>
			  <li className={router.pathname == "/frontend/coaching-journey" ? "coaching-active" : ""}><Link href="/frontend/coaching-journey">coaching journey</Link></li>
			  <li className={router.pathname == "/frontend/pricing" ? "pricing-active" : ""}><Link href="/frontend/pricing">pricing</Link></li>
			  <li className={router.pathname == "/frontend/faq" ? "pricing-active" : ""}><Link href="/frontend/faq">FAQ</Link></li>
			  <li className={router.pathname == "/frontend/contact" ? "contact-active" : ""}><Link className="scroll" href="/frontend/contact">contact</Link></li>

			  
		    </ul>
		  </div>

         
		  <div className="login-info frontend-change">
		  {/* <div className="login-info">
		  <div className='dropdown'>
                      
					  <button
                          className='btn btn-secondary dropdown-toggle'
                          type='button'
                          data-bs-toggle='dropdown'
                          aria-expanded='false'
                        > 
						Abc
						</button>
						<ul className='dropdown-menu'>
						<li>
						  <Link href='/dashboard' passHref>
							<a className='dropdown-item'>Profile</a>
						  </Link>
						</li>
						<li>
						  <Link href='/timesheet' passHref>
							<a className='dropdown-item'>Timesheet</a>
						  </Link>
						</li>
						<li>
						  <Link href='/resources' passHref>
							<a className='dropdown-item'>Resources</a>
						  </Link>
						</li>
						<li>
							<a className='dropdown-item' >Log Out</a>
						</li>
					  </ul>
					
					</div>
        <Link href="/pages/login"><a className="btn">Log In
		
		
		<ul className='dropdown-menu'>
						<li>
						  <Link href='/dashboard' passHref>
							<a className='dropdown-item'>Profile</a>
						  </Link>
						</li>
						<li>
						  <Link href='/timesheet' passHref>
							<a className='dropdown-item'>Timesheet</a>
						  </Link>
						</li>
						<li>
						  <Link href='/resources' passHref>
							<a className='dropdown-item'>Resources</a>
						  </Link>
						</li>
						<li>
							<a className='dropdown-item' >Log Out</a>
						</li>
					  </ul>
					
		</a>
		
		</Link> */}
		<div className='profile-button'>
                  


                    <div className='dropdown'>
                      <div className='inner'>
                        <button
                          className='btn btn-secondary'
                          type='button'
                          data-bs-toggle='dropdown'
                          aria-expanded='false'
						  onClick={setlogin}
                        >
                       Log in
                        </button>
                        <ul className="dropdown-menu" style={{ display: logindropdown ? 'block' : 'none' }}>
  

						<li>
                            <Link href='/client/login' passHref >
                              <a className='dropdown-item' onClick={setlogin}>Client</a>
                            </Link>
                          </li>
                          <li>
                            <Link href='/coach/login' passHref >
                              <a className='dropdown-item' onClick={setlogin}>Coaches</a>
                            </Link>
                          </li>

						 
                         
                        </ul>
                      </div>
                    </div>
                  </div>


				  <div className='profile-button pb-signup'>
                  


				  <div className='dropdown'>
					<div className='inner'>
					  <button
						className='btn btn-secondary'
						type='button'
						data-bs-toggle='dropdown'
						aria-expanded='false'
						onClick={setsignups}
					  >
					 Signup
					  </button>
					  <ul className="dropdown-menu" style={{ display: signupdropdown ? 'block' : 'none' }}>

						<li>
						  <Link href='/client/register' passHref>
							<a className='dropdown-item' onClick={setsignups}>Client</a>
						  </Link>
						</li>

						<li>
						  <Link href='/frontend/apply' passHref>
							<a className='dropdown-item' onClick={setsignups}>Coaches</a>
						  </Link>
						</li>
					   
					  </ul>
					</div>
				  </div>
				</div>
          {/* <Link href="/pages/register"><a className="btn">Sign Up</a></Link>  */}

		  
      </div>
	    </div>
	  </nav> 

    </div> {/* <!--/ menu-head --> */}
  </div> {/* <!--/ container --> */}

  
</header>
  )
}
export default Header
