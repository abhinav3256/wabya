import Link from 'next/link'

// import { getAuth } from 'firebase/auth'
// import { useRouter } from 'next/router'
// import { useState } from 'react'
// import { app } from '../../../../../firebaseConfig'

const Header = () => {

    // const auth = getAuth(app)
    // const router = useRouter()

    // const logout = () => {
    //   sessionStorage.removeItem('Token');
    //   router.push('/pages/login')
    // }

  return (
    <header className='admin-header superadmin-head'>
      <div className='menu-head'>
        <div className='container'>
          <nav className='navbar navbar-expand-lg'>
            <div className='container-fluid'>
              <Link href='/dashboard' passHref>
                <a className='navbar-brand'>
                  <img src='../../images/admin.png' alt='Long Island Tub Refinishing Logo' />
                </a>
              </Link>

              <div className='profile-button'>
                <figure>
                  <img src='../images/user-image.png' alt='' />
                </figure>

                <div className='dropdown'>
                  <div className='inner'>
                    <button
                      className='btn btn-secondary dropdown-toggle'
                      type='button'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'
                    >
                     Logout
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
                          <a className='dropdown-item'>Log Out</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                className='navbar-toggler'
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#navbarSupportedContent'
                aria-controls='navbarSupportedContent'
                aria-expanded='false'
                aria-label='Toggle navigation'
              >
                <span className='navbar-toggler-icon'></span>
              </button>

              <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                <ul className='navbar-nav'>
                  <li>
                    <Link href='#' passHref>
                      <a>Client</a>
                    </Link>
                  </li>
                  <li>
                    <Link href='#' passHref>
                      <a>Coaches</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        {/* <!--/ menu-head --> */}
      </div>
      {/* <!--/ container --> */}
    </header>
  )
}

export default Header
