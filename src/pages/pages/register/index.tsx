// ** React Imports
import { useState, ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'

// import Firebase database
import { app, database } from '../../../../firebaseConfig'

import { getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { collection, addDoc} from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// form validation
import { useFormik } from "formik";
import * as Yup from "yup";

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import { Alert } from '@mui/material'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

import Image from 'next/image'


// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '30rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const RegisterPage = () => {
  const auth = getAuth(app)
  const router = useRouter()

  const initialValues = {
    username: "",
    email: "",
    phone : "",
    country : "",
    timezone : "",
    api : "",
    calUsername: "",
    password : "",
  }

  //  yup form validation
  const signUpSchema = Yup.object({
    username: Yup.string().min(2).max(25).required("Name field is required"),
    email: Yup.string().email().required("Email field is required"),
    phone: Yup.string().min(10).max(12).required("Phone number field is required"),
    country: Yup.string().required("Country field is required"),
    timezone: Yup.string().required("Time Zone field is required"),
    password: Yup.string().min(6).required("Password field is required"),

    // calUsername: Yup.string().required("Cal Username field is required"),
    // api: Yup.string().required("Cal API Key field is required"),
  });

const coachesRef = collection(database, 'coaches_user');

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({

    initialValues : initialValues,
    validationSchema : signUpSchema,
    validateOnMount: false,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: (values, action) => {
      console.log(
        "🚀 ~ file: index.tsx ~ line 81 ~ Registration ~ values",
        values,

          addDoc(coachesRef, {
            coach_name: values.username,
            coach_country : values.country,
            coach_email : values.email.toLowerCase(),
            coach_password : values.password,
            coach_phone : Number(values.phone),
            coach_timezone : values.timezone,
            coach_api : String(),
            coach_uname : String(),
            coach_language: String(),
            coach_about: String(),
            coach_bio: String(),
            coach_profile: String(),
            coach_uid : Number(),
          })
            .then(() => {
              toast.success('Coach registered successfully')
              router.push('/client/login')
            })
            .catch((err) => {
              console.error(err);
            })

      );
      action.resetForm();
    },
  });

console.log(
  "🚀 ~ file: index.tsx ~ line 90 ~ Registration ~ errors",
  errors
);



  const [visible, setVisible] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState("");


  useEffect(() => {
    const token = sessionStorage.getItem('Token')

    if(token){
        router.push('/dashboard')
    }
}, [])

  return (
    <Box className='content-center'>
      <ToastContainer theme="colored" autoClose={2000}/>
      <Card sx={{ zIndex: 1 }} className='card-after'>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image src='/images/logo.png' alt='Wabya Logo' width={'190px'} height={'50px'} layout='fixed' />
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Adventure starts here 🚀
            </Typography>
            <Typography variant='body2'>Make your app management easy and fun!</Typography>
          </Box>

          <Box>
            {
              errorMsg ?
              (
                  <Alert severity="error" className='my-4'>{errorMsg}</Alert>
              ): null
            }
          </Box>

          <form noValidate autoComplete='off' onSubmit={handleSubmit} className='form-client-register'>

            <TextField
              autoFocus
              fullWidth
              name='username'
              id='username'
              label='Full Name'
              sx={{ marginBottom: 4 }}
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {
              errors.username && touched.username ?
                (
                  <p className="form-error">*{errors.username}</p>
                ) : null
              }
            <TextField
              fullWidth
              type='email'
              name='email'
              label='Email'
              sx={{ marginBottom: 4 }}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}

            />
            {
              errors.email && touched.email ?
                (
                  <p className="form-error">*{errors.email}</p>
                ) : null
              }
            <TextField
              autoFocus
              fullWidth
              name='phone'
              id='phone'
              label='Phone'
              sx={{ marginBottom: 4 }}
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {
              errors.phone && touched.phone ?
                (
                  <p className="form-error">*{errors.phone}</p>
                ) : null
              }
            <TextField
              autoFocus
              fullWidth
              name='country'
              id='country'
              label='Country'
              sx={{ marginBottom: 4 }}
              value={values.country}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {
              errors.country && touched.country ?
                (
                  <p className="form-error">*{errors.country}</p>
                ) : null
              }

            <TextField
              autoFocus
              fullWidth
              name='timezone'
              id='timezone'
              label='Time Zone'
              sx={{ marginBottom: 4 }}
              value={values.timezone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {
              errors.timezone && touched.timezone ?
                (
                  <p className="form-error">*{errors.timezone}</p>
                ) : null
              }

<TextField
              fullWidth
              type={visible ? 'text' : 'password'}
              name='password'
              label='Password'
              sx={{ marginBottom: 4 }}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className='text-pass'
            />
            <span className="pass-eye" onClick={()=>setVisible(!visible)}>
            {
              visible ?
              <EyeOutline fontSize='small' /> :
              <EyeOffOutline fontSize='small' />
            }
            </span>

            {
              errors.password && touched.password ?
                (
                  <p className="form-error">*{errors.password}</p>
                ) : null
              }

            {/* <TextField
              autoFocus
              fullWidth
              name='api'
              id='api'
              label='API Key'
              sx={{ marginBottom: 4 }}
              value={values.api}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {
              errors.api && touched.api ?
                (
                  <p className="form-error">*{errors.api}</p>
                ) : null
              } */}
            {/* <TextField
              autoFocus
              fullWidth
              name='calUsername'
              id='cal_username'
              label='Cal Username'
              sx={{ marginBottom: 4 }}
              value={values.calUsername}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {
              errors.calUsername && touched.calUsername ?
                (
                  <p className="form-error">*{errors.calUsername}</p>
                ) : null
              } */}



            <Button fullWidth size='large' type='submit' variant='contained' sx={{ my: 7 }}>
              Sign up
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                Already have an account?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/client/login'>
                  <LinkStyled>Sign In</LinkStyled>
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

RegisterPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default RegisterPage