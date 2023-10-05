import Link from 'next/link'
import { Button } from '@mui/material'

const ProfileBasic = () => {

  return (
    <div className='MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-6 css-h2qpui'>
      <div className='MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 css-15j76c0'>
        <div className='MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation6 MuiCard-root css-sqt54j'>
          <img
            className='MuiCardMedia-root MuiCardMedia-media MuiCardMedia-img css-1uahu4n'
            src='/images/pages/profile-banner.png'
            alt='profile-header'
          />
          <div className='MuiCardContent-root css-1rqsvsc'>
            <img src='/images/avatars/1.png' alt='profile-picture' className='css-78r3e5' />
            <div className='MuiBox-root css-1y3xyx8'>
              <div className='MuiBox-root css-1fmg83x'>
                <h5 className='MuiTypography-root MuiTypography-h5 css-ay3j8z'>John Doe</h5>
                <div className='MuiBox-root css-16bhin1'>
                  <div className='MuiBox-root css-ib6wi8'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      xmlnsXlink='http://www.w3.org/1999/xlink'
                      aria-hidden='true'
                      role='img'
                      fontSize='1.5rem'
                      className='iconify iconify--mdi'
                      width='1em'
                      height='1em'
                      viewBox='0 0 24 24'
                    >
                      <path
                        fill='currentColor'
                        d='M12 19.58c-1.6 0-3.11-.62-4.24-1.75A5.951 5.951 0 0 1 6 13.58c0-1.58.62-3.11 1.76-4.24L12 5.1m5.66 2.83L12 2.27L6.34 7.93c-3.12 3.12-3.12 8.19 0 11.31A7.98 7.98 0 0 0 12 21.58c2.05 0 4.1-.78 5.66-2.34c3.12-3.12 3.12-8.19 0-11.31Z'
                      ></path>
                    </svg>
                    <p className='MuiTypography-root MuiTypography-body1 css-gkqnvh'>UX Designer</p>
                  </div>
                  <div className='MuiBox-root css-ib6wi8'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      xmlnsXlink='http://www.w3.org/1999/xlink'
                      aria-hidden='true'
                      role='img'
                      fontSize='1.5rem'
                      className='iconify iconify--mdi'
                      width='1em'
                      height='1em'
                      viewBox='0 0 24 24'
                    >
                      <path
                        fill='currentColor'
                        d='M12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7m0 2a5 5 0 0 0-5 5c0 1 0 3 5 9.71C17 12 17 10 17 9a5 5 0 0 0-5-5Z'
                      ></path>
                    </svg>
                    <p className='MuiTypography-root MuiTypography-body1 css-gkqnvh'>Vatican City</p>
                  </div>
                  <div className='MuiBox-root css-1mn1omo'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      xmlnsXlink='http://www.w3.org/1999/xlink'
                      aria-hidden='true'
                      role='img'
                      fontSize='1.5rem'
                      className='iconify iconify--mdi'
                      width='1em'
                      height='1em'
                      viewBox='0 0 24 24'
                    >
                      <path
                        fill='currentColor'
                        d='M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1V1'
                      ></path>
                    </svg>
                    <p className='MuiTypography-root MuiTypography-body1 css-gkqnvh'>Joined April 2021</p>
                  </div>
                </div>
              </div>
              <Button
                className='MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium css-atm61p'
                type='button'
                color='primary'
                variant='contained'
              >
                <span className='MuiButton-startIcon MuiButton-iconSizeMedium css-1l6c7y9'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    aria-hidden='true'
                    role='img'
                    fontSize='20'
                    className='iconify iconify--mdi'
                    width='1em'
                    height='1em'
                    viewBox='0 0 24 24'
                  >
                    <path
                      fill='currentColor'
                      d='m21.1 12.5l1.4 1.41l-6.53 6.59L12.5 17l1.4-1.41l2.07 2.08l5.13-5.17M11 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 2a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2m0 7c.68 0 1.5.09 2.41.26l-1.67 1.67l-.74-.03c-2.97 0-6.1 1.46-6.1 2.1v1.1h6.2L13 20H3v-3c0-2.66 5.33-4 8-4Z'
                    ></path>
                  </svg>
                </span>
                Connected<span className='MuiTouchRipple-root css-w0pj6f'></span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className='MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 css-15j76c0'>
        <div className='MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-6 css-h2qpui'>
          <div className='MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 css-15j76c0'>
            <div className='MuiTabs-root css-9w6mzi'>
              <div
                className='MuiTabs-scrollableX MuiTabs-hideScrollbar css-oqr85h'
                style={{ width: '99px', height: '99px', position: 'absolute', top: '-9999px', overflow: 'scroll' }}
              ></div>
              <div
                className='MuiTabs-scroller MuiTabs-hideScrollbar MuiTabs-scrollableX css-1t0s2fz'
                style={{ marginBottom: '0px' }}
              >
                <div aria-label='customized tabs example' className='MuiTabs-flexContainer css-7sga7m' role='tablist'>
                  <button
                    className='MuiButtonBase-root MuiTab-root MuiTab-textColorPrimary Mui-selected css-lwu3wh'
                    type='button'
                    role='tab'
                    aria-selected='true'
                    aria-controls='mui-p-3664-P-profile'
                    id='mui-p-3664-T-profile'
                  >
                    <div className='MuiBox-root css-wrdbaa'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        xmlnsXlink='http://www.w3.org/1999/xlink'
                        aria-hidden='true'
                        role='img'
                        fontSize='20'
                        className='iconify iconify--mdi'
                        width='1em'
                        height='1em'
                        viewBox='0 0 24 24'
                      >
                        <path
                          fill='currentColor'
                          d='M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 2a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2m0 7c2.67 0 8 1.33 8 4v3H4v-3c0-2.67 5.33-4 8-4m0 1.9c-2.97 0-6.1 1.46-6.1 2.1v1.1h12.2V17c0-.64-3.13-2.1-6.1-2.1Z'
                        ></path>
                      </svg>
                      Profile
                    </div>
                    <span className='MuiTouchRipple-root css-w0pj6f'></span>
                  </button>
                  <button
                    className='MuiButtonBase-root MuiTab-root MuiTab-textColorPrimary css-lwu3wh'
                    type='button'
                    role='tab'
                    aria-selected='false'
                    aria-controls='mui-p-3664-P-teams'
                    id='mui-p-3664-T-teams'
                  >
                    <div className='MuiBox-root css-wrdbaa'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        xmlnsXlink='http://www.w3.org/1999/xlink'
                        aria-hidden='true'
                        role='img'
                        fontSize='20'
                        className='iconify iconify--mdi'
                        width='1em'
                        height='1em'
                        viewBox='0 0 24 24'
                      >
                        <path
                          fill='currentColor'
                          d='M13.07 10.41a5 5 0 0 0 0-5.82A3.39 3.39 0 0 1 15 4a3.5 3.5 0 0 1 0 7a3.39 3.39 0 0 1-1.93-.59M5.5 7.5A3.5 3.5 0 1 1 9 11a3.5 3.5 0 0 1-3.5-3.5m2 0A1.5 1.5 0 1 0 9 6a1.5 1.5 0 0 0-1.5 1.5M16 17v2H2v-2s0-4 7-4s7 4 7 4m-2 0c-.14-.78-1.33-2-5-2s-4.93 1.31-5 2m11.95-4A5.32 5.32 0 0 1 18 17v2h4v-2s0-3.63-6.06-4Z'
                        ></path>
                      </svg>
                      Teams
                    </div>
                    <span className='MuiTouchRipple-root css-w0pj6f'></span>
                  </button>
                  <button
                    className='MuiButtonBase-root MuiTab-root MuiTab-textColorPrimary css-lwu3wh'
                    type='button'
                    role='tab'
                    aria-selected='false'
                    aria-controls='mui-p-3664-P-projects'
                    id='mui-p-3664-T-projects'
                  >
                    <div className='MuiBox-root css-wrdbaa'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        xmlnsXlink='http://www.w3.org/1999/xlink'
                        aria-hidden='true'
                        role='img'
                        fontSize='20'
                        className='iconify iconify--mdi'
                        width='1em'
                        height='1em'
                        viewBox='0 0 24 24'
                      >
                        <path
                          fill='currentColor'
                          d='M3 11h8V3H3m2 2h4v4H5m8 12h8v-8h-8m2 2h4v4h-4M3 21h8v-8H3m2 2h4v4H5m8-16v8h8V3m-2 6h-4V5h4Z'
                        ></path>
                      </svg>
                      Projects
                    </div>
                    <span className='MuiTouchRipple-root css-w0pj6f'></span>
                  </button>
                  <button
                    className='MuiButtonBase-root MuiTab-root MuiTab-textColorPrimary css-lwu3wh'
                    type='button'
                    role='tab'
                    aria-selected='false'
                    aria-controls='mui-p-3664-P-connections'
                    id='mui-p-3664-T-connections'
                  >
                    <div className='MuiBox-root css-wrdbaa'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        xmlnsXlink='http://www.w3.org/1999/xlink'
                        aria-hidden='true'
                        role='img'
                        fontSize='20'
                        className='iconify iconify--mdi'
                        width='1em'
                        height='1em'
                        viewBox='0 0 24 24'
                      >
                        <path
                          fill='currentColor'
                          d='M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7a5 5 0 0 0-5 5a5 5 0 0 0 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1M8 13h8v-2H8v2m9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1c0 1.71-1.39 3.1-3.1 3.1h-4V17h4a5 5 0 0 0 5-5a5 5 0 0 0-5-5Z'
                        ></path>
                      </svg>
                      Connections
                    </div>
                    <span className='MuiTouchRipple-root css-w0pj6f'></span>
                  </button>
                </div>
                <span className='MuiTabs-indicator css-1nss4zi' style={{ left: '0px', width: '130px' }}></span>
              </div>
            </div>
          </div>
          <div className='MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 css-2zddjz'>
            <div
              aria-labelledby='mui-p-3664-T-profile'
              className='MuiTabPanel-root css-mp8pt5'
              id='mui-p-3664-P-profile'
              role='tabpanel'
            >
              <div className='MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-6 css-h2qpui'>
                <div className='MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-5 MuiGrid-grid-xl-4 css-1neqem0'>
                  <div className='MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-6 css-h2qpui'>
                    <div className='MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 css-15j76c0'>
                      <div className='MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation6 MuiCard-root css-sqt54j'>
                        <div className='MuiCardContent-root css-1hta359'>
                          <div className='MuiBox-root css-1fobf8d'>
                            <span className='MuiTypography-root MuiTypography-caption css-ldb94d'>About</span>
                            <div className='MuiBox-root css-146kcmb'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                xmlnsXlink='http://www.w3.org/1999/xlink'
                                aria-hidden='true'
                                role='img'
                                fontSize='1.5rem'
                                className='iconify iconify--mdi'
                                width='1em'
                                height='1em'
                                viewBox='0 0 24 24'
                              >
                                <path
                                  fill='currentColor'
                                  d='M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 2a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2m0 7c2.67 0 8 1.33 8 4v3H4v-3c0-2.67 5.33-4 8-4m0 1.9c-2.97 0-6.1 1.46-6.1 2.1v1.1h12.2V17c0-.64-3.13-2.1-6.1-2.1Z'
                                ></path>
                              </svg>
                              <p className='MuiTypography-root MuiTypography-body1 css-1k1yxnw'>Full Name:</p>
                              <p className='MuiTypography-root MuiTypography-body1 css-1nlaf4b'>John Doe</p>
                            </div>
                            <div className='MuiBox-root css-146kcmb'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                xmlnsXlink='http://www.w3.org/1999/xlink'
                                aria-hidden='true'
                                role='img'
                                fontSize='1.5rem'
                                className='iconify iconify--mdi'
                                width='1em'
                                height='1em'
                                viewBox='0 0 24 24'
                              >
                                <path
                                  fill='currentColor'
                                  d='M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59L21 7Z'
                                ></path>
                              </svg>
                              <p className='MuiTypography-root MuiTypography-body1 css-1k1yxnw'>Status:</p>
                              <p className='MuiTypography-root MuiTypography-body1 css-1nlaf4b'>Active</p>
                            </div>
                            <div className='MuiBox-root css-146kcmb'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                xmlnsXlink='http://www.w3.org/1999/xlink'
                                aria-hidden='true'
                                role='img'
                                fontSize='1.5rem'
                                className='iconify iconify--mdi'
                                width='1em'
                                height='1em'
                                viewBox='0 0 24 24'
                              >
                                <path
                                  fill='currentColor'
                                  d='m12 15.39l-3.76 2.27l.99-4.28l-3.32-2.88l4.38-.37L12 6.09l1.71 4.04l4.38.37l-3.32 2.88l.99 4.28M22 9.24l-7.19-.61L12 2L9.19 8.63L2 9.24l5.45 4.73L5.82 21L12 17.27L18.18 21l-1.64-7.03L22 9.24Z'
                                ></path>
                              </svg>
                              <p className='MuiTypography-root MuiTypography-body1 css-1k1yxnw'>Role:</p>
                              <p className='MuiTypography-root MuiTypography-body1 css-1nlaf4b'>Developer</p>
                            </div>
                            <div className='MuiBox-root css-146kcmb'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                xmlnsXlink='http://www.w3.org/1999/xlink'
                                aria-hidden='true'
                                role='img'
                                fontSize='1.5rem'
                                className='iconify iconify--mdi'
                                width='1em'
                                height='1em'
                                viewBox='0 0 24 24'
                              >
                                <path
                                  fill='currentColor'
                                  d='m12.36 6l.4 2H18v6h-3.36l-.4-2H7V6h5.36M14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6'
                                ></path>
                              </svg>
                              <p className='MuiTypography-root MuiTypography-body1 css-1k1yxnw'>Country:</p>
                              <p className='MuiTypography-root MuiTypography-body1 css-1nlaf4b'>USA</p>
                            </div>
                            <div className='MuiBox-root css-146kcmb'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                xmlnsXlink='http://www.w3.org/1999/xlink'
                                aria-hidden='true'
                                role='img'
                                fontSize='1.5rem'
                                className='iconify iconify--mdi'
                                width='1em'
                                height='1em'
                                viewBox='0 0 24 24'
                              >
                                <path
                                  fill='currentColor'
                                  d='m12.87 15.07l-2.54-2.51l.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35C8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5l3.11 3.11l.76-2.04M18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12m-2.62 7l1.62-4.33L19.12 17h-3.24Z'
                                ></path>
                              </svg>
                              <p className='MuiTypography-root MuiTypography-body1 css-1k1yxnw'>Language:</p>
                              <p className='MuiTypography-root MuiTypography-body1 css-1nlaf4b'>English</p>
                            </div>
                          </div>
                          <div className='MuiBox-root css-1fobf8d'>
                            <span className='MuiTypography-root MuiTypography-caption css-ldb94d'>Contacts</span>
                            <div className='MuiBox-root css-146kcmb'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                xmlnsXlink='http://www.w3.org/1999/xlink'
                                aria-hidden='true'
                                role='img'
                                fontSize='1.5rem'
                                className='iconify iconify--mdi'
                                width='1em'
                                height='1em'
                                viewBox='0 0 24 24'
                              >
                                <path
                                  fill='currentColor'
                                  d='M20 15.5c-1.2 0-2.5-.2-3.6-.6h-.3c-.3 0-.5.1-.7.3l-2.2 2.2c-2.8-1.5-5.2-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1c-.3-1.1-.5-2.4-.5-3.6c0-.5-.5-1-1-1H4c-.5 0-1 .5-1 1c0 9.4 7.6 17 17 17c.5 0 1-.5 1-1v-3.5c0-.5-.5-1-1-1M5 5h1.5c.1.9.3 1.8.5 2.6L5.8 8.8C5.4 7.6 5.1 6.3 5 5m14 14c-1.3-.1-2.6-.4-3.8-.8l1.2-1.2c.8.2 1.7.4 2.6.4V19Z'
                                ></path>
                              </svg>
                              <p className='MuiTypography-root MuiTypography-body1 css-1k1yxnw'>Contact:</p>
                              <p className='MuiTypography-root MuiTypography-body1 css-1nlaf4b'>(123) 456-7890</p>
                            </div>
                            <div className='MuiBox-root css-146kcmb'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                xmlnsXlink='http://www.w3.org/1999/xlink'
                                aria-hidden='true'
                                role='img'
                                fontSize='1.5rem'
                                className='iconify iconify--mdi'
                                width='1em'
                                height='1em'
                                viewBox='0 0 24 24'
                              >
                                <path
                                  fill='currentColor'
                                  d='M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m0 14H5.2L4 17.2V4h16v12Z'
                                ></path>
                              </svg>
                              <p className='MuiTypography-root MuiTypography-body1 css-1k1yxnw'>Skype:</p>
                              <p className='MuiTypography-root MuiTypography-body1 css-1nlaf4b'>John.doe</p>
                            </div>
                            <div className='MuiBox-root css-146kcmb'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                xmlnsXlink='http://www.w3.org/1999/xlink'
                                aria-hidden='true'
                                role='img'
                                fontSize='1.5rem'
                                className='iconify iconify--mdi'
                                width='1em'
                                height='1em'
                                viewBox='0 0 24 24'
                              >
                                <path
                                  fill='currentColor'
                                  d='M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6m-2 0l-8 5l-8-5h16m0 12H4V8l8 5l8-5v10Z'
                                ></path>
                              </svg>
                              <p className='MuiTypography-root MuiTypography-body1 css-1k1yxnw'>Email:</p>
                              <p className='MuiTypography-root MuiTypography-body1 css-1nlaf4b'>John.doe@example.com</p>
                            </div>
                          </div>
                          <div>
                            <span className='MuiTypography-root MuiTypography-caption css-ldb94d'>Teams</span>
                            <div className='MuiBox-root css-vv7wn5'>
                              <span></span>
                              <p className='MuiTypography-root MuiTypography-body1 css-1k1yxnw'>Backend Developer</p>
                              <p className='MuiTypography-root MuiTypography-body1 css-1nlaf4b'>(126 Members)</p>
                            </div>
                            <div className='MuiBox-root css-194sult'>
                              <span></span>
                              <p className='MuiTypography-root MuiTypography-body1 css-1k1yxnw'>React Developer</p>
                              <p className='MuiTypography-root MuiTypography-body1 css-1nlaf4b'>(98 Members)</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 css-15j76c0'>
                      <div className='MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation6 MuiCard-root css-sqt54j'>
                        <div className='MuiCardContent-root css-1hta359'>
                          <div>
                            <span className='MuiTypography-root MuiTypography-caption css-ldb94d'>Bio</span>
                            <div className='MuiBox-root css-146kcmb'>
                              <p className='MuiTypography-root MuiTypography-body1 css-1nlaf4b'>
                                The name's John Deo. I am a tireless seeker of knowledge, occasional purveyor of wisdom
                                and also, coincidentally, a graphic designer. Algolia helps businesses across industries
                                quickly create relevant 😎, scalable 😀, and lightning 😍 fast search and discovery
                                experiences.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-7 MuiGrid-grid-xl-8 css-fc76wa'>
                  <div className='MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-6 css-h2qpui'>
                    <div className='MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 css-15j76c0'>
                      <div className='MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation6 MuiCard-root css-sqt54j'>
                        <div className='MuiCardHeader-root css-103sjs2'>
                          <div className='MuiCardHeader-avatar css-1p83tvv'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              xmlnsXlink='http://www.w3.org/1999/xlink'
                              aria-hidden='true'
                              role='img'
                              fontSize='1.5rem'
                              className='iconify iconify--mdi'
                              width='1em'
                              height='1em'
                              viewBox='0 0 24 24'
                            >
                              <path
                                fill='currentColor'
                                d='m3 14l.5.07L8.07 9.5a1.95 1.95 0 0 1 .52-1.91c.78-.79 2.04-.79 2.82 0c.53.52.7 1.26.52 1.91l2.57 2.57l.5-.07c.18 0 .35 0 .5.07l3.57-3.57C19 8.35 19 8.18 19 8a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2c-.18 0-.35 0-.5-.07l-3.57 3.57c.07.15.07.32.07.5a2 2 0 0 1-2 2a2 2 0 0 1-2-2l.07-.5l-2.57-2.57c-.32.07-.68.07-1 0L4.93 15.5L5 16a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2Z'
                              ></path>
                            </svg>
                          </div>
                          <div className='MuiCardHeader-content css-11qjisw'>
                            <span className='MuiTypography-root MuiTypography-body2 MuiCardHeader-title css-1mcvcsd'>
                              Activity Timeline
                            </span>
                          </div>
                        </div>
                        <div className='MuiCardContent-root css-1hta359'>
                          <ul className='MuiTimeline-root MuiTimeline-positionRight css-b0yy2i'>
                            <li className='MuiTimelineItem-root MuiTimelineItem-positionRight MuiTimelineItem-missingOppositeContent css-18cx7bq'>
                              <div className='MuiTimelineSeparator-root css-11tgw8h'>
                                <span className='MuiTimelineDot-root MuiTimelineDot-filled MuiTimelineDot-filledError css-yf5umk'></span>
                                <span className='MuiTimelineConnector-root css-clmno0'></span>
                              </div>
                              <div className='MuiTypography-root MuiTypography-body1 MuiTimelineContent-root MuiTimelineContent-positionRight css-afmj5b'>
                                <div className='MuiBox-root css-kthafc'>
                                  <p className='MuiTypography-root MuiTypography-body1 css-i0trl6'>
                                    8 Invoices have been paid
                                  </p>
                                  <span className='MuiTypography-root MuiTypography-caption css-1lfcoef'>
                                    Wednesday
                                  </span>
                                </div>
                                <p className='MuiTypography-root MuiTypography-body2 css-1t573wn'>
                                  Invoices have been paid to the company.
                                </p>
                                <div className='MuiBox-root css-70qvj9'>
                                  <img width='24' height='24' alt='invoice.pdf' src='/images/logos/pdf.png' />
                                  <h6 className='MuiTypography-root MuiTypography-subtitle2 css-5ofyxc'>invoice.pdf</h6>
                                </div>
                              </div>
                            </li>
                            <li className='MuiTimelineItem-root MuiTimelineItem-positionRight MuiTimelineItem-missingOppositeContent css-18cx7bq'>
                              <div className='MuiTimelineSeparator-root css-11tgw8h'>
                                <span className='MuiTimelineDot-root MuiTimelineDot-filled MuiTimelineDot-filledPrimary css-1ga7j79'></span>
                                <span className='MuiTimelineConnector-root css-clmno0'></span>
                              </div>
                              <div className='MuiTypography-root MuiTypography-body1 MuiTimelineContent-root MuiTimelineContent-positionRight css-afmj5b'>
                                <div className='MuiBox-root css-kthafc'>
                                  <p className='MuiTypography-root MuiTypography-body1 css-i0trl6'>
                                    Create a new project for client 😎
                                  </p>
                                  <span className='MuiTypography-root MuiTypography-caption css-1lfcoef'>
                                    April, 18
                                  </span>
                                </div>
                                <p className='MuiTypography-root MuiTypography-body2 css-plfevg'>
                                  Invoices have been paid to the company.
                                </p>
                                <div className='MuiBox-root css-70qvj9'>
                                  <div className='MuiAvatar-root MuiAvatar-circular css-1cqsglu'>
                                    <img alt='' src='/images/avatars/1.png' className='MuiAvatar-img css-1hy9t21' />
                                  </div>
                                  <p className='MuiTypography-root MuiTypography-body2 css-1coe79q'>
                                    John Doe (Client)
                                  </p>
                                </div>
                              </div>
                            </li>
                            <li className='MuiTimelineItem-root MuiTimelineItem-positionRight MuiTimelineItem-missingOppositeContent css-18cx7bq'>
                              <div className='MuiTimelineSeparator-root css-11tgw8h'>
                                <span className='MuiTimelineDot-root MuiTimelineDot-filled MuiTimelineDot-filledInfo css-1bb0wme'></span>
                                <span className='MuiTimelineConnector-root css-clmno0'></span>
                              </div>
                              <div className='MuiTypography-root MuiTypography-body1 MuiTimelineContent-root MuiTimelineContent-positionRight css-afmj5b'>
                                <div className='MuiBox-root css-kthafc'>
                                  <p className='MuiTypography-root MuiTypography-body1 css-i0trl6'>
                                    Order #37745 from September
                                  </p>
                                  <span className='MuiTypography-root MuiTypography-caption css-1lfcoef'>
                                    January, 10
                                  </span>
                                </div>
                                <p className='MuiTypography-root MuiTypography-body2 css-dvql1p'>
                                  Invoices have been paid to the company.
                                </p>
                              </div>
                            </li>
                            <li className='MuiTimelineItem-root MuiTimelineItem-positionRight MuiTimelineItem-missingOppositeContent css-18cx7bq'>
                              <div className='MuiTimelineSeparator-root css-11tgw8h'>
                                <span className='MuiTimelineDot-root MuiTimelineDot-filled MuiTimelineDot-filledWarning css-aytr78'></span>
                              </div>
                              <div className='MuiTypography-root MuiTypography-body1 MuiTimelineContent-root MuiTimelineContent-positionRight css-je1na2'>
                                <div className='MuiBox-root css-1c8ux76'>
                                  <p className='MuiTypography-root MuiTypography-body1 css-i0trl6'>Public Meeting</p>
                                  <span className='MuiTypography-root MuiTypography-caption css-1lfcoef'>
                                    September, 30
                                  </span>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className='MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-6 css-iol86l'>
                      <div className='MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation6 MuiCard-root css-sqt54j'>
                        <div className='MuiCardHeader-root css-5p0xdk'>
                          <div className='MuiCardHeader-content css-11qjisw'>
                            <span className='MuiTypography-root MuiTypography-h5 MuiCardHeader-title css-zy87dv'>
                              Connections
                            </span>
                          </div>
                          <div className='MuiCardHeader-action css-pka4ak'>
                            <button
                              className='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall css-1dhik7u'
                              type='button'
                              aria-haspopup='true'
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                xmlnsXlink='http://www.w3.org/1999/xlink'
                                aria-hidden='true'
                                role='img'
                                fontSize='1.5rem'
                                className='iconify iconify--mdi'
                                width='1em'
                                height='1em'
                                viewBox='0 0 24 24'
                              >
                                <path
                                  fill='currentColor'
                                  d='M12 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2Z'
                                ></path>
                              </svg>
                              <span className='MuiTouchRipple-root css-w0pj6f'></span>
                            </button>
                          </div>
                        </div>
                        <div className='MuiCardContent-root css-1hta359'>
                          <div className='MuiBox-root css-gkb96q'>
                            <div className='MuiBox-root css-70qvj9'>
                              <div className='MuiAvatar-root MuiAvatar-circular css-15ei8mt'>
                                <img alt='' src='/images/avatars/2.png' className='MuiAvatar-img css-1hy9t21' />
                              </div>
                              <div>
                                <p className='MuiTypography-root MuiTypography-body1 css-1afep5u'>Cecilia Payne</p>
                                <span className='MuiTypography-root MuiTypography-caption css-xx772w'>
                                  45 Connections
                                </span>
                              </div>
                            </div>
                            <button
                              className='MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeSmall MuiButton-outlinedSizeSmall MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeSmall MuiButton-outlinedSizeSmall css-1uojcz1'
                              type='button'
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                xmlnsXlink='http://www.w3.org/1999/xlink'
                                aria-hidden='true'
                                role='img'
                                fontSize='1.5rem'
                                className='iconify iconify--mdi'
                                width='1em'
                                height='1em'
                                viewBox='0 0 24 24'
                              >
                                <path
                                  fill='currentColor'
                                  d='M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 2a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2m0 7c2.67 0 8 1.33 8 4v3H4v-3c0-2.67 5.33-4 8-4m0 1.9c-2.97 0-6.1 1.46-6.1 2.1v1.1h12.2V17c0-.64-3.13-2.1-6.1-2.1Z'
                                ></path>
                              </svg>
                              <span className='MuiTouchRipple-root css-w0pj6f'></span>
                            </button>
                          </div>
                          <div className='MuiBox-root css-gkb96q'>
                            <div className='MuiBox-root css-70qvj9'>
                              <div className='MuiAvatar-root MuiAvatar-circular css-15ei8mt'>
                                <img alt='' src='/images/avatars/3.png' className='MuiAvatar-img css-1hy9t21' />
                              </div>
                              <div>
                                <p className='MuiTypography-root MuiTypography-body1 css-1afep5u'>Curtis Fletcher</p>
                                <span className='MuiTypography-root MuiTypography-caption css-xx772w'>
                                  1.32k Connections
                                </span>
                              </div>
                            </div>
                            <button
                              className='MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeSmall MuiButton-containedSizeSmall MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeSmall MuiButton-containedSizeSmall css-1ktik0e'
                              type='button'
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                xmlnsXlink='http://www.w3.org/1999/xlink'
                                aria-hidden='true'
                                role='img'
                                fontSize='1.5rem'
                                className='iconify iconify--mdi'
                                width='1em'
                                height='1em'
                                viewBox='0 0 24 24'
                              >
                                <path
                                  fill='currentColor'
                                  d='M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 2a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2m0 7c2.67 0 8 1.33 8 4v3H4v-3c0-2.67 5.33-4 8-4m0 1.9c-2.97 0-6.1 1.46-6.1 2.1v1.1h12.2V17c0-.64-3.13-2.1-6.1-2.1Z'
                                ></path>
                              </svg>
                              <span className='MuiTouchRipple-root css-w0pj6f'></span>
                            </button>
                          </div>
                          <div className='MuiBox-root css-gkb96q'>
                            <div className='MuiBox-root css-70qvj9'>
                              <div className='MuiAvatar-root MuiAvatar-circular css-15ei8mt'>
                                <img alt='' src='/images/avatars/4.png' className='MuiAvatar-img css-1hy9t21' />
                              </div>
                              <div>
                                <p className='MuiTypography-root MuiTypography-body1 css-1afep5u'>Alice Stone</p>
                                <span className='MuiTypography-root MuiTypography-caption css-xx772w'>
                                  125 Connections
                                </span>
                              </div>
                            </div>
                            <button
                              className='MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeSmall MuiButton-containedSizeSmall MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeSmall MuiButton-containedSizeSmall css-1ktik0e'
                              type='button'
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                xmlnsXlink='http://www.w3.org/1999/xlink'
                                aria-hidden='true'
                                role='img'
                                fontSize='1.5rem'
                                className='iconify iconify--mdi'
                                width='1em'
                                height='1em'
                                viewBox='0 0 24 24'
                              >
                                <path
                                  fill='currentColor'
                                  d='M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 2a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2m0 7c2.67 0 8 1.33 8 4v3H4v-3c0-2.67 5.33-4 8-4m0 1.9c-2.97 0-6.1 1.46-6.1 2.1v1.1h12.2V17c0-.64-3.13-2.1-6.1-2.1Z'
                                ></path>
                              </svg>
                              <span className='MuiTouchRipple-root css-w0pj6f'></span>
                            </button>
                          </div>
                          <div className='MuiBox-root css-gkb96q'>
                            <div className='MuiBox-root css-70qvj9'>
                              <div className='MuiAvatar-root MuiAvatar-circular css-15ei8mt'>
                                <img alt='' src='/images/avatars/5.png' className='MuiAvatar-img css-1hy9t21' />
                              </div>
                              <div>
                                <p className='MuiTypography-root MuiTypography-body1 css-1afep5u'>Darrell Barnes</p>
                                <span className='MuiTypography-root MuiTypography-caption css-xx772w'>
                                  456 Connections
                                </span>
                              </div>
                            </div>
                            <button
                              className='MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeSmall MuiButton-outlinedSizeSmall MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeSmall MuiButton-outlinedSizeSmall css-1uojcz1'
                              type='button'
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                xmlnsXlink='http://www.w3.org/1999/xlink'
                                aria-hidden='true'
                                role='img'
                                fontSize='1.5rem'
                                className='iconify iconify--mdi'
                                width='1em'
                                height='1em'
                                viewBox='0 0 24 24'
                              >
                                <path
                                  fill='currentColor'
                                  d='M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 2a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2m0 7c2.67 0 8 1.33 8 4v3H4v-3c0-2.67 5.33-4 8-4m0 1.9c-2.97 0-6.1 1.46-6.1 2.1v1.1h12.2V17c0-.64-3.13-2.1-6.1-2.1Z'
                                ></path>
                              </svg>
                              <span className='MuiTouchRipple-root css-w0pj6f'></span>
                            </button>
                          </div>
                          <div className='MuiBox-root css-gkb96q'>
                            <div className='MuiBox-root css-70qvj9'>
                              <div className='MuiAvatar-root MuiAvatar-circular css-15ei8mt'>
                                <img alt='' src='/images/avatars/8.png' className='MuiAvatar-img css-1hy9t21' />
                              </div>
                              <div>
                                <p className='MuiTypography-root MuiTypography-body1 css-1afep5u'>Eugenia Moore</p>
                                <span className='MuiTypography-root MuiTypography-caption css-xx772w'>
                                  1.2k Connections
                                </span>
                              </div>
                            </div>
                            <button
                              className='MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeSmall MuiButton-outlinedSizeSmall MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeSmall MuiButton-outlinedSizeSmall css-1uojcz1'
                              type='button'
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                xmlnsXlink='http://www.w3.org/1999/xlink'
                                aria-hidden='true'
                                role='img'
                                fontSize='1.5rem'
                                className='iconify iconify--mdi'
                                width='1em'
                                height='1em'
                                viewBox='0 0 24 24'
                              >
                                <path
                                  fill='currentColor'
                                  d='M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 2a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2m0 7c2.67 0 8 1.33 8 4v3H4v-3c0-2.67 5.33-4 8-4m0 1.9c-2.97 0-6.1 1.46-6.1 2.1v1.1h12.2V17c0-.64-3.13-2.1-6.1-2.1Z'
                                ></path>
                              </svg>
                              <span className='MuiTouchRipple-root css-w0pj6f'></span>
                            </button>
                          </div>
                          <div className='MuiBox-root css-kso463'>
                            <Link className='MuiTypography-root MuiTypography-body1 css-p5yx27' href='/'>
                              View all connections
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-6 css-iol86l'>
                      <div className='MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation6 MuiCard-root css-sqt54j'>
                        <div className='MuiCardHeader-root css-5p0xdk'>
                          <div className='MuiCardHeader-content css-11qjisw'>
                            <span className='MuiTypography-root MuiTypography-h5 MuiCardHeader-title css-zy87dv'>
                              Teams
                            </span>
                          </div>
                          <div className='MuiCardHeader-action css-pka4ak'>
                            <button
                              className='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall css-1dhik7u'
                              type='button'
                              aria-haspopup='true'
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                xmlnsXlink='http://www.w3.org/1999/xlink'
                                aria-hidden='true'
                                role='img'
                                fontSize='1.5rem'
                                className='iconify iconify--mdi'
                                width='1em'
                                height='1em'
                                viewBox='0 0 24 24'
                              >
                                <path
                                  fill='currentColor'
                                  d='M12 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2Z'
                                ></path>
                              </svg>
                              <span className='MuiTouchRipple-root css-w0pj6f'></span>
                            </button>
                          </div>
                        </div>
                        <div className='MuiCardContent-root css-1hta359'>
                          <div className='MuiBox-root css-1c8106r'>
                            <div className='MuiBox-root css-70qvj9'>
                              <div className='MuiAvatar-root MuiAvatar-circular css-15ei8mt'>
                                <img alt='' src='/images/logos/react-label.png' className='MuiAvatar-img css-1hy9t21' />
                              </div>
                              <div>
                                <p className='MuiTypography-root MuiTypography-body1 css-1afep5u'>React Developers</p>
                                <span className='MuiTypography-root MuiTypography-caption css-xx772w'>72 Members</span>
                              </div>
                            </div>
                            {/* <Link className="MuiBox-root css-toeg1h"
                                                        href="/">
                                                        <div className="MuiChip-root MuiChip-filled MuiChip-sizeSmall MuiChip-colorError MuiChip-filledError MuiChip-light css-1r9rte5"
                                                            >
                                                              <span
                                                                className="MuiChip-label MuiChip-labelSmall css-tavflp">Developer</span>
                                                        </div>
                                                    </Link> */}
                          </div>
                          <div className='MuiBox-root css-1c8106r'>
                            <div className='MuiBox-root css-70qvj9'>
                              <div className='MuiAvatar-root MuiAvatar-circular css-15ei8mt'>
                                <img
                                  alt=''
                                  src='/images/logos/support-label.png'
                                  className='MuiAvatar-img css-1hy9t21'
                                />
                              </div>
                              <div>
                                <p className='MuiTypography-root MuiTypography-body1 css-1afep5u'>Support Team</p>
                                <span className='MuiTypography-root MuiTypography-caption css-xx772w'>122 Members</span>
                              </div>
                            </div>
                            {/* <Link className="MuiBox-root css-toeg1h"
                                                        href="/materio-mui-react-nextjs-admin-template">
                                                        <div className="MuiChip-root MuiChip-filled MuiChip-sizeSmall MuiChip-colorPrimary MuiChip-filledPrimary MuiChip-light css-1o5wgne"
                                                            ><span
                                                                className="MuiChip-label MuiChip-labelSmall css-tavflp">Support</span>
                                                        </div>
                                                    </Link> */}
                          </div>
                          <div className='MuiBox-root css-1c8106r'>
                            <div className='MuiBox-root css-70qvj9'>
                              <div className='MuiAvatar-root MuiAvatar-circular css-15ei8mt'>
                                <img alt='' src='/images/logos/figma-label.png' className='MuiAvatar-img css-1hy9t21' />
                              </div>
                              <div>
                                <p className='MuiTypography-root MuiTypography-body1 css-1afep5u'>UI Designer</p>
                                <span className='MuiTypography-root MuiTypography-caption css-xx772w'>7 Members</span>
                              </div>
                            </div>
                            {/*<Link className="MuiBox-root css-toeg1h"
                                                        href="/materio-mui-react-nextjs-admin-template/demo-1/">
                                                        <div className="MuiChip-root MuiChip-filled MuiChip-sizeSmall MuiChip-colorInfo MuiChip-filledInfo MuiChip-light css-5bpjsz"
                                                            ><span
                                                                className="MuiChip-label MuiChip-labelSmall css-tavflp">Designer</span>
                                                        </div>
                                                    </Link> */}
                          </div>
                          <div className='MuiBox-root css-1c8106r'>
                            <div className='MuiBox-root css-70qvj9'>
                              <div className='MuiAvatar-root MuiAvatar-circular css-15ei8mt'>
                                <img alt='' src='/images/logos/vue-label.png' className='MuiAvatar-img css-1hy9t21' />
                              </div>
                              <div>
                                <p className='MuiTypography-root MuiTypography-body1 css-1afep5u'>Vue.js Developers</p>
                                <span className='MuiTypography-root MuiTypography-caption css-xx772w'>289 Members</span>
                              </div>
                            </div>
                            {/* <Link className="MuiBox-root css-toeg1h"
                                                        href="/materio-mui-react-nextjs-admin-template/demo-1/">
                                                        <div className="MuiChip-root MuiChip-filled MuiChip-sizeSmall MuiChip-colorError MuiChip-filledError MuiChip-light css-1r9rte5"
                                                            ><span
                                                                className="MuiChip-label MuiChip-labelSmall css-tavflp">Developer</span>
                                                        </div>
                                                    </Link> */}
                          </div>
                          <div className='MuiBox-root css-1c8106r'>
                            <div className='MuiBox-root css-70qvj9'>
                              <div className='MuiAvatar-root MuiAvatar-circular css-15ei8mt'>
                                <img
                                  alt=''
                                  src='/images/logos/twitter-label.png'
                                  className='MuiAvatar-img css-1hy9t21'
                                />
                              </div>
                              <div>
                                <p className='MuiTypography-root MuiTypography-body1 css-1afep5u'>Digital Marketing</p>
                                <span className='MuiTypography-root MuiTypography-caption css-xx772w'>24 Members</span>
                              </div>
                            </div>
                            {/* <Link className="MuiBox-root css-toeg1h"
                                                        href="/materio-mui-react-nextjs-admin-template/demo-1/">
                                                        <div className="MuiChip-root MuiChip-filled MuiChip-sizeSmall MuiChip-colorSecondary MuiChip-filledSecondary MuiChip-light css-vpcryb"
                                                            ><span
                                                                className="MuiChip-label MuiChip-labelSmall css-tavflp">Marketing</span>
                                                        </div>
                                                    </Link> */}
                          </div>
                          <div className='MuiBox-root css-kso463'>
                            <Link className='MuiTypography-root MuiTypography-body1 css-p5yx27' href='/'>
                              View all teams
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* blank braces */}
                    <div className='MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 css-15j76c0'></div>
                    {/* end here */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='buy-now-button mui-fixed MuiBox-root css-1j2q1g7'></div>
    </div>
  )
}

export default ProfileBasic
