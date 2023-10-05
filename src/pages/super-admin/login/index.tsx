// ** React Imports
import { ReactNode, useState, useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'
import { app, database } from '../../../../firebaseConfig'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { collection, getDocs, doc, query, where } from 'firebase/firestore';


// ** MUI Components
import { Alert } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import Image from 'next/image'

// material ui icons
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))


const AdminLoginPage = () => {

  const router = useRouter()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState<boolean>(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Check if the user exists in the database
      const usersRef = collection(database, 'admin_user');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error('Credentials are invalid!');
      }

      // Check if the password is correct
      const user = querySnapshot.docs[0].data();
      if (user.password !== password) {
        throw new Error('Incorrect password');
      }

      // Set the user ID as a session variable
        sessionStorage.setItem('adminId', querySnapshot.docs[0].id);

      // Redirect to the home page
        router.push('/super-admin/dashboard');

    } catch (error) {
      setError(error.message);
    }
  };

  return (

    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }} className='card-after'>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image src='/images/logo.png' alt='Wabya Logo' width={'190px'} height={'50px'} layout='fixed' />

          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Welcome to {themeConfig.templateName} Admin
            </Typography>
            <Typography variant='body2'>Please sign-in to your account </Typography>
          </Box>

          {error && <Alert severity='error' style={{ margin :'0 0 20px 0'}}>{error}</Alert>}

          <form noValidate autoComplete='off' onSubmit={handleLogin}>
            <TextField autoFocus fullWidth id='email' label='Email' sx={{ marginBottom: 4 }}  type='email'  onChange={(event) => setEmail(event.target.value)} value={email} />
            <TextField autoFocus fullWidth id='password' label='Password' sx={{ marginBottom: 4 }}  type={visible ? 'text' : 'password'} className='text-pass' onChange={(event) => setPassword(event.target.value)} value={password} />
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

            </Box>
            <Button
              fullWidth
              size='large'
              variant='contained' type='submit'
              sx={{ marginBottom: 7, fontWeight:600 }} >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

AdminLoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default AdminLoginPage
