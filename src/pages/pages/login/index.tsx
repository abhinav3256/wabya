// ** React Imports
import { ReactNode, useState, useEffect } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'
import { app, database } from '../../../../firebaseConfig'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { collection, query, where, getDocs } from 'firebase/firestore';


// ** MUI Components
import Box from '@mui/material/Box'
import { Alert } from '@mui/material'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'


import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// toast-reactify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import Image from 'next/image'


// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LoginPage = () => {

    // const auth = getAuth(app)
    const router = useRouter()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState(null);
    const [visible, setVisible] = useState<boolean>(false);


  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Check if the user exists in the database
      const usersRef = collection(database, 'coaches_user');
      const q = query(usersRef, where('coach_email', '==', email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error('Credentials are invalid!');
      }

      // Check if the password is correct
      const user = querySnapshot.docs[0].data();
      if (user.coach_password !== password) {
        throw new Error('Incorrect password');
      }

      // Set the user ID as a session variable
        sessionStorage.setItem('coachId', querySnapshot.docs[0].id);

      // Redirect to the home page
        router.push('/coach/dashboard');

    } catch (error) {
      setError(error.message);
    }
  };

  return (

    <Box className='content-center'>
      {/* <ToastContainer theme="colored" autoClose={5000} /> */}
      <Card sx={{ zIndex: 1 }} className='card-after'>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image src='/images/logo.png' alt='Wabya Logo' width={'190px'} height={'50px'} layout='fixed' />

          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              welcome to <span className="text-lowercase">{themeConfig.templateName}</span> ! 👋🏻
            </Typography>
            <Typography variant='body2'>Please sign-in to your account and start the adventure</Typography>
          </Box>

          {error && <Alert severity='error' style={{ margin :'0 0 20px 0'}}>{error}</Alert>}

          <form noValidate autoComplete='off' onSubmit={handleLogin} >
            <TextField autoFocus fullWidth id='email' label='Email' sx={{ marginBottom: 4 }}  type='email'  onChange={(event) => setEmail(event.target.value.toLowerCase())} value={email} />
            <TextField autoFocus  fullWidth id='password' label='Password' sx={{ marginBottom: 4 }}  type={visible ? 'text' : 'password'}  onChange={(event) => setPassword(event.target.value)} value={password} className='text-pass' />
            <span className="pass-eye" onClick={()=>setVisible(!visible)}>
            {
              visible ?
              <EyeOutline fontSize='small' /> :
              <EyeOffOutline fontSize='small' />
            }
            </span>


            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <FormControlLabel control={<Checkbox />} label='Remember Me' />

            </Box>
            <Button
            type='submit'
              fullWidth
              size='large'
              variant='contained'
              sx={{ marginBottom: 7, fontWeight:600 }}
            >
              Login
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                New on our platform?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/pages/register'>
                  <LinkStyled>Create an account</LinkStyled>
                </Link>
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginPage
