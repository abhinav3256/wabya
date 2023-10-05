// ** React Imports
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { database } from '../../../firebaseConfig'
import { collection, getDoc, doc, updateDoc } from 'firebase/firestore'

// ** MUI Imports
import Fab from '@mui/material/Fab'
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

// ** Icons Imports
import ArrowUp from 'mdi-material-ui/ArrowUp'

// ** Theme Config Import
import themeConfig from 'src/configs/themeConfig'

// ** Type Import
import { LayoutProps } from 'src/@core/layouts/types'

// ** Components
// import AppBar from './components/vertical/appBar'
// import Navigation from './components/vertical/navigation'
// import Footer from './components/shared-components/footer'
import ScrollToTop from 'src/@core/components/scroll-to-top'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import NavigationHeader from './components/shared-components/Header'

// const VerticalLayoutWrapper = styled('div')({
//   // height: '100%',
//   // display: 'flex'
// })

const MainContentWrapper = styled(Box)<BoxProps>({
  // flexGrow: 1,
  // minWidth: 0,
  // display: 'flex',
  // minHeight: '100vh',
  // flexDirection: 'column'
})

const ContentWrapper = styled('main')(({ theme }) => ({
  // flexGrow: 1,
  // width: '100%',
  // padding: theme.spacing(6),
  // transition: 'padding .25s ease-in-out',
  // [theme.breakpoints.down('sm')]: {
  //   paddingLeft: theme.spacing(4),
  //   paddingRight: theme.spacing(4)
  // }
}))

const VerticalLayout = (props: LayoutProps) => {
  // ** Props
  const { settings, children, scrollToTop } = props

  // ** Vars
  const { contentWidth } = settings
  const navWidth = themeConfig.navigationSize

  // ** States
  const [navVisible, setNavVisible] = useState<boolean>(false)

  // ** Toggle Functions
  const toggleNavVisibility = () => setNavVisible(!navVisible)

  const router = useRouter()
  const { asPath, pathname } = useRouter();

  const [coach, setCoach] = useState(null);
  const [coachId,setCoachId]=useState();

  const [calApi, setCalApi] = useState(false);
  const[calApiKey, setCalApiKey] = useState('');
  const[calUsername, setCalUsername] = useState('');

  const [errorApi, setErrorApi] = useState(false)
  const [errorUname, setErrorUname] = useState(false)
  const handleLogin = async (event) =>{
    event.preventDefault();

    if (calApiKey == '') {
      setErrorApi('Cal API key is required');
    }
    if (calUsername == '') {
      setErrorUname('Cal Username is required');
    }

    if(calApiKey !== '' && calUsername !== ''){
      const fieldToEdit = doc(collection(database, "coaches_user"), coachId);
      updateDoc(fieldToEdit, {
        coach_uname: calUsername,
        coach_api: calApiKey
      })
      .then(() => {
        alert('Data updated successfully!')
        setCalApiKey('')
        setCalUsername('')
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }

  useEffect(() => {

    const coachId = sessionStorage.getItem('coachId')
    setCoachId(coachId);

    if (coachId) {
      const fetchCoach = async () => {
        const coachRef = doc(collection(database, "coaches_user"), coachId);
        const coachDoc = await getDoc(coachRef);

        const field1 = coachDoc.get("coach_api");
        const field2 = coachDoc.get("coach_uname");

        if (!field1 && !field2) {
          console.log("Error: Both fields are empty.");
          setCalApi(false);
        } else {
          console.log("ok");
          setCalApi(true);
        }

        if (coachDoc.exists()) {
          setCoach(coachDoc.data());
        } else {
          console.log("No coach found");
        }
      };
      fetchCoach();
    }

}, [coachId])



  return (
    <>
        {/* Navigation Menu */}

        <NavigationHeader/>
        {
          router.pathname === '/client/dashboard' || router.pathname === '/client/change-password' || router.pathname === '/client/joinvideo' ?
          (
            <MainContentWrapper className='layout-content-wrapper'>

                    <ContentWrapper className='layout-page-content' >
                      {children}
                    </ContentWrapper>

                  </MainContentWrapper>
          ):
          (
            <>
              <MainContentWrapper className='layout-content-wrapper'>

                <ContentWrapper className='layout-page-content' >
                  {children}
                </ContentWrapper>

              </MainContentWrapper>
            </>
            
            // <>
            //   {
            //     calApi ?
            //     (
            //       <MainContentWrapper className='layout-content-wrapper'>

            //         <ContentWrapper className='layout-page-content' >
            //           {children}
            //         </ContentWrapper>

            //       </MainContentWrapper>
            //     ):
            //     (
            //       (
            //         <>
            //           <section className="follow-instructions">
            //             <div className="container">
            //               <div className="row">
            //                 <div className="col-sm-12">
            //                 <h3><span>You haven't added your Cal API Key and Cal Username. Visit <Link href='https://app.cal.com/auth/login' passHref><a className='cal' target='_blank'>cal.com</a></Link></span> Instructions </h3>

            //                 </div>
            //                 <div className="col-sm-12">
            //                   <form noValidate autoComplete='off' onSubmit={handleLogin} >
            //                     <TextField autoFocus fullWidth id='cal_api' label='Cal API key' sx={{ marginBottom: 4 }}
            //                     type='text'  onChange={(event) => setCalApiKey(event.target.value)} value={calApiKey}
            //                     />
            //                     {errorApi ? ( <p className='form-error'>*{errorApi}</p> ) : null}
            //                     <TextField autoFocus  fullWidth id='cal_uname' label='Cal Username' sx={{ marginBottom: 4 }}  type='text' onChange={(event) => setCalUsername(event.target.value)} value={calUsername} />
            //                     {errorUname ? ( <p className='form-error'>*{errorUname}</p> ) : null}

            //                   <Button
            //                   type='submit'
            //                     fullWidth
            //                     size='large'
            //                     variant='contained'
            //                     sx={{ margin: "20px 0", fontWeight:600 }}
            //                   >
            //                     Update
            //                   </Button>

            //                   </form>
            //                 </div>

            //               </div>
            //             </div>
            //           </section>
            //         </>
            //       )
            //     )
            //   }
            // </>
          )
        }


          {/* Footer Component */}
          {/* <Footer {...props} /> */}

          {/* Portal for React Datepicker */}
          <DatePickerWrapper sx={{ zIndex: 11 }}>
            <Box id='react-datepicker-portal'></Box>
          </DatePickerWrapper>


      {/* Scroll to top button */}
      {scrollToTop ? (
        scrollToTop(props)
      ) : (
        <ScrollToTop className='mui-fixed'>
          <Fab color='primary' size='small' aria-label='scroll back to top'>
            <ArrowUp />
          </Fab>
        </ScrollToTop>
      )}
    </>
  )
}

export default VerticalLayout
