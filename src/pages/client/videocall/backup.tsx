// ** React Imports
import { ReactNode, useState, useEffect } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'
import { database } from '../../../../firebaseConfig'
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


const Videocall = () => {

  const router = useRouter()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState<boolean>(false);
  const { id } = router.query;

  const handleLogin = async (event) => {
    event.preventDefault();
    const router = useRouter()

    try {
      // Check if the user exists in the database
      const usersRef = collection(database, 'client_user');
      const q = query(usersRef, where('client_email', '==', email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error('Credentials are invalid!');
      }

      // Check if the password is correct
      const user = querySnapshot.docs[0].data();
      if (user.client_password !== password) {
        throw new Error('Incorrect password');
      }

      // Set the user ID as a session variable
      sessionStorage.setItem('userId', querySnapshot.docs[0].id);

      // Redirect to the home page
      router.push('/client/dashboard');

    } catch (error) {
      setError(error.message);
    }
  };


  return (

    <iframe
    src={`https://abhinav19.daily.co/${id}`}
    width="100%"
    height="700px"
    frameborder="0"
   
allow="camera *;microphone *"

  ></iframe>
  )
}

Videocall.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default Videocall
