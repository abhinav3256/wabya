// ** React Imports
import { useState, ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'

// import Firebase database
import { database } from '../../../../firebaseConfig'
import { collection, addDoc ,where, query,startAt,limit,orderBy,getDocs} from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import allCountries from '../../../@core/utils/countries'
import country_data from '../../../@core/utils/all-countries'
// ** Next Imports
import Link from 'next/link'
import emailjs from '@emailjs/browser';

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Alert } from '@mui/material'


import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import { Select, MenuItem } from '@mui/material';


// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

import Image from 'next/image'

// form validation
import { useFormik } from "formik";
import * as Yup from "yup";

// material ui icons
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { sendMail } from "../../../services/sendMail";  

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const RegisterPage = () => {

  const router = useRouter()
  const [visible, setVisible] = useState<boolean>(false);
  const [termChecked, settermChecked] = useState(false);
  const [termMsg, setTermMsg] = useState(false);
  const [planId, setplanId] = useState('');

  
  const [successMsg, setsuccessMsg] = useState(false);
  const handleCheckboxClick = () => {
    settermChecked(!termChecked);
  };

  useEffect(() => {
    // Try to get the value from localStorage
    try {
      const storedValue = localStorage.getItem('planId');
     
      // Update state with the value if it exists
      if (storedValue) {
        setplanId(storedValue);
      }
else{
  console.log('i am here in localstorage');
  router.push('/frontend/pricing');
}
    
    } catch (error) {
      // Handle potential errors accessing localStorage here
      console.error('Error accessing localStorage:', error);
      router.push('/frontend/pricing');
    }
  }, []);
  const initialValues = {
    clientName: "",
    clientEmail: "",
    clientPhone : "",
    clientCountry : "",
    clientZone : "",
    clientLanguage : "",
    // clientApi : "",
    // clientUsername: "",
    clientPassword : "",
    clientRePassword: "",
    gender:"",
    
    

  }



  async function sendMailFunc (email,content,$subject){   
    let response = await sendMail(email,$subject,content);   
  
    console.log('response',response);
  } 

  //  yup form validation
  const signUpSchema = Yup.object({
    clientName: Yup.string().min(2).max(25).required("Name field is required"),
    clientEmail: Yup.string().email('Invalid email').required("Email field is required"),
   // clientPhone: Yup.string().min(10).max(12).required("Phone number field is required"),
    clientCountry: Yup.string().required("Country field is required"),
    clientZone: Yup.string().required("Time Zone field is required"),
    clientLanguage: Yup.string().required("Language field is required"),
    // clientApi: Yup.string().required("Cal API key field is required"),
    // clientUsername: Yup.string().required("Cal Username field is required"),
    clientPassword: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      "Password must be at least 8 characters with one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password field is required"),
  clientRePassword: Yup.string().oneOf([Yup.ref("clientPassword"), null], "Passwords must match")
    .required("Confirm Password field is required"),
    
  });

  // formik form validates

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    
    initialValues : initialValues,
    validationSchema : signUpSchema,
    validateOnMount: false,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values, action) => {

      console.log('here');
      setConfirmMsg(false);
      setEmailExist(false);
      setTermMsg(false);
      
if(termChecked != true){
  setTermMsg(true);
}
else{
if(values.clientPassword == values.clientRePassword){
      if(await countData(values.clientEmail.toLowerCase()) == 0){
      console.log(
        "🚀 ~ file: index.tsx ~ line 81 ~ Registration ~ values",
        values,
       
          addDoc(clientRef, {
            client_name: values.clientName,
            client_country : values.clientCountry,
            client_email : values.clientEmail.toLowerCase(),
            client_language : String(),
            client_password : values.clientPassword,
            client_phone : Number(values.clientPhone),
            client_zone : values.clientZone,
            client_api : String(),
            client_uname : String(), 
            client_uid : Number(),
            // assign_coach_id:coachData[randomNo].coach_id,
            plan_id:planId,
            prefer_plan_id:planId,
            coach_prefer:selectedGender,
            coaching_before:selectedcoachingBefore,
            prefer_time:selectedpreferMeet,
            my_mind:commaSeparatedValues,
            total_session:'0',
            remainingSession:'0',
           
          })
            .then((docRef) => {

              const docId = docRef.id;
    localStorage.setItem('clientRegisteredId', docId);
    localStorage.removeItem('planId');

      //         const emailParams = {
      //           service_id: 'service_48nilue',
      //           template_id: 'template_3uazkzk',
      //           user_id: 'bHrOxc3becdFqRykK',
      //           template_params: {
      //             // Add your form data here, for example:
      //             name: values.clientName,
                 
      //             // Add other form fields as needed
      //           }
      //         };
      //         emailjs.sendForm('service_48nilue', 'template_3uazkzk', emailParams, 'bHrOxc3becdFqRykK')
      // .then((result) => {
      //    // console.log(result.text);
      //     toast.success('Client registered successfully')
      //     router.push('/client/login')
      // }, (error) => {
      //     console.log(error.text);
      // });
             

      const logoUrl = 'https://wabya.com/images/logo-new.png';
      const msg = `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
         <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Wabya</title>
            <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap" rel="stylesheet">
            <style type="text/css">
               body{padding-top: 0 !important; padding-bottom: 0 !important; padding-top: 0 !important; padding-bottom: 0 !important; margin:0 !important; width: 100% !important; -webkit-text-size-adjust: 100% !important; -ms-text-size-adjust: 100% !important; -webkit-font-smoothing: antialiased !important; font-size:14px; line-height:22px; font-family: 'Lato', sans-serif; font-weight:400;}
            </style>
         </head>
         <body paddingwidth="0" paddingheight="0"  style="" offset="0" toppadding="0" leftpadding="0">
         <div style="display:table; width:600px !important; margin: 0 auto; background: #fff; padding:20px;">
            <table width="600" border="0" cellspacing="0" cellpadding="0" class="tableContent bgBody" align="center" style='width: 600px; display: block;'>
               <tbody>
                  <tr>
                     <table class="MainContainer" width="600" cellspacing="0" cellpadding="0" border="0" bgcolor="#ece6d5" align="center" style='width: 600px; -webkit-border-radius: 15px; -moz-border-radius: 15px; border-radius: 15px;'>
                        <tbody style=''>
      <tr>
                              <td colspan="2"><div style="text-align: center; margin:35px 0 0" class="contentLogo"><a href="https://www.#.com"><img src="${logoUrl}" width="200px" alt="" border="0" style=""></a></div></td>
                           </tr>
                           <tr>
                              <td>
                                 <div style="padding:0 30px;  position: relative; z-index: 2;line-height: 22px;font-family: 'Lato', sans-serif;font-weight: 600;text-align: center;">
          
      <p style="font-size: 18px; text-align: center; color: #864985;">Thank you for registering with us. We are excited to have you on board!</p>
    
      <hr style="border: 1px solid #1c686b;">
      <p style="font-size: 14px; color: #242424; text-align: center;">Thank you,<br>Wabya Team</p>
       </div>  
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </tr>
               </tbody>
            </table>
       </div>
         </body>
      </html>
`;
    sendMailFunc(values.clientEmail,msg,'Registration Confirmation'); 




    
    const adminmsg = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
       <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Wabya</title>
          <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap" rel="stylesheet">
          <style type="text/css">
             body{padding-top: 0 !important; padding-bottom: 0 !important; padding-top: 0 !important; padding-bottom: 0 !important; margin:0 !important; width: 100% !important; -webkit-text-size-adjust: 100% !important; -ms-text-size-adjust: 100% !important; -webkit-font-smoothing: antialiased !important; font-size:14px; line-height:22px; font-family: 'Lato', sans-serif; font-weight:400;}
          </style>
       </head>
       <body paddingwidth="0" paddingheight="0"  style="" offset="0" toppadding="0" leftpadding="0">
       <div style="display:table; width:600px !important; margin: 0 auto; background: #fff; padding:20px;">
          <table width="600" border="0" cellspacing="0" cellpadding="0" class="tableContent bgBody" align="center" style='width: 600px; display: block;'>
             <tbody>
                <tr>
                   <table class="MainContainer" width="600" cellspacing="0" cellpadding="0" border="0" bgcolor="#ece6d5" align="center" style='width: 600px; -webkit-border-radius: 15px; -moz-border-radius: 15px; border-radius: 15px;'>
                      <tbody style=''>
    <tr>
                            <td colspan="2"><div style="text-align: center; margin:35px 0 0" class="contentLogo"><a href="https://www.#.com"><img src="${logoUrl}" width="200px" alt="" border="0" style=""></a></div></td>
                         </tr>
                         <tr>
                            <td>
                               <div style="padding:0 30px;  position: relative; z-index: 2;line-height: 22px;font-family: 'Lato', sans-serif;font-weight: 600;text-align: center;">
                             
                               <p style="font-size: 18px; text-align: center; color: #864985;">Hello Admin,</p>
                               <p style="font-size: 18px; text-align: center; color: #864985;">A new user has registered on our platform.</p>
                               <p style="font-size: 18px; text-align: center; color: #864985;">Here are the user's details:</p>
     
   
                               <p style="font-size: 16px; text-align: center; margin:0 0 20px;color: #242424;">Name: ${values.clientName} </p>
    <p style="font-size: 16px; text-align: center; margin:0 0 20px;color: #242424;">Email: ${values.clientEmail.toLowerCase()} </p>
  
    <hr style="border: 1px solid #1c686b;">
    <p style="font-size: 14px; color: #242424; text-align: center;">Thank you,<br>Wabya Team</p>
     </div>  
                            </td>
                         </tr>
                      </tbody>
                   </table>
                </tr>
             </tbody>
          </table>
     </div>
       </body>
    </html>
`;
  sendMailFunc('abhinavkumar3256@gmail.com',adminmsg,'Registration Confirmation'); 


setsuccessMsg(true);

            })
            .catch((err) => {
              console.error(err);
            })

      );
      action.resetForm();
          }else{
            toast.error('Email Already Registerd')
            setEmailExist(true);
          }
        }else{
          setConfirmMsg(true);
        }

      }
    },




  });

console.log(
  "🚀 ~ file: index.tsx ~ line 90 ~ Registration ~ errors",
  errors
);



const clientRef = collection(database, 'client_user');

const coachRef = collection(database, 'coaches_user');
const planRef = collection(database, 'admin_plans');
const [coachData, setCoachData] = useState([]);
const [planData, setplanData] = useState([]);

const [randomNo, setrandomNo] = useState(0);
const [confirmMsg, setConfirmMsg] = useState(false);
const [emailExist, setEmailExist] = useState(false);



useEffect(() => {
  if (successMsg == true) {
    // Wait for 3 seconds before redirecting to the pricing page
    const redirectTimeout = setTimeout(() => {
      router.push('/frontend/coaching-session/'); // Redirect to the pricing page
    }, 3000);

    // Clear the timeout if the component is unmounted
    return () => clearTimeout(redirectTimeout);
  }
}, [successMsg, router]);

  // coach data fetch
  const getCoachData = async () => {
console.log('test');
    const queryDoc = query(coachRef, where('coach_email', '!=', ''));

    await getDocs(queryDoc).then(response => {
      console.log(response.docs.length);
      setCoachData(
        response.docs.map(data => {
          return { ...data.data(), coach_id: data.id }
        })
      )
    })
  }
 

    // coach data fetch
    const getAllPlans = async () => {
      console.log('testsss');
          const queryDoc = query(planRef,where('status', '==', '1'));
      
          await getDocs(queryDoc).then(response => {
            console.log(response.docs.length);
            setplanData(
              response.docs.map(data => {
                return { ...data.data(), plan_id: data.id }
              })
            )
          })
        }
      
        const [country_sel, setcountry_sel] = useState('');

        const [lang_sel, setlang_sel] = useState('');

     
        const handleChangeCountry = (event) => {
          setcountry_sel(event.target.value);
          values.clientCountry=event.target.value;
          setTimeout(function() {
          const element =  document.getElementsByName("clientLanguage")[0];
          if (element) {
            console.log('here');
            const offsetTop = element.offsetTop + 300;
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth' // Scroll behavior (optional)
            });
          }
        }, 500); // 2000 milliseconds = 2 seconds
      }


        const handleChangeLang = (event) => {
          setlang_sel(event.target.value);
          values.clientLanguage=event.target.value;
        };
      
        const getLanguagesOfSelectedCountry = () => {
          const selectedCountry = country_data.find(country => country.country === country_sel);
          if (selectedCountry) {
            return selectedCountry.languages;
          }
          return [];
        };
      
        const getTimeZoneOfSelectedCountry = () => {
         const selectedCountry = country_data.find(country => country.country === country_sel);
         if (selectedCountry) {
           return selectedCountry.timezone;
         }
         return '';
       };
      
        const selectedCountryLanguages = getLanguagesOfSelectedCountry();
        const selectedCountryTimezone = getTimeZoneOfSelectedCountry();
   // coach data fetch
   const countData = async (client_em:string) => {
    console.log('test');
        const queryDoc = query(clientRef, where('client_email', '==', client_em));
    let count_data=0
        await getDocs(queryDoc).then(response => {
          console.log(response.docs.length); 
          count_data=response.docs.length;
        })
        return count_data;
      }
  useEffect(() => {


    getCoachData();

    getAllPlans();


  }, [])


  useEffect(() => {


    if(selectedCountryLanguages.length > 0){

      setlang_sel(selectedCountryLanguages[0])
      values.clientLanguage=selectedCountryLanguages[0];
    }


  }, [selectedCountryLanguages])


  useEffect(() => {


    if(selectedCountryTimezone != ""){

      values.clientZone=selectedCountryTimezone;
    }


  }, [selectedCountryTimezone])

  useEffect(() => {


    console.log(coachData);
    
    setrandomNo(Math.floor(Math.random() * (coachData.length - 0 + 1)) + 0);


  }, [coachData])


  const [selectedGender, setselectedGender] = useState('male');

  const handleGenderChange = (event) => {
    setselectedGender(event.target.value);
  };


  const [selectedcoachingBefore, setselectedcoachingBefore] = useState('yes');

  const handleCoachingBeforeChange = (event) => {
    setselectedcoachingBefore(event.target.value);
  };


  const [selectedpreferMeet, setselectedpreferMeet] = useState('dontmind');

  const handlePreferMeet = (event) => {
    setselectedpreferMeet(event.target.value);
  };


  const [selectMind, setselectMind] = useState(['family']);
  const [commaSeparatedValues, setCommaSeparatedValues] = useState('');

  const handleMind = (event) => {
   // setselectMind(event.target.value);

   if (selectMind.includes(event.target.value)) {

    setselectMind(selectMind.filter((item) => item !== event.target.value));
   }
   else{
    setselectMind([...selectMind, event.target.value]);
   }
  };


  useEffect(() => {
    // Create a comma-separated string from selectMind array
    const commaSeparatedString = selectMind.join(',');
    setCommaSeparatedValues(commaSeparatedString);
  
    // You can perform additional actions with the commaSeparatedString here if needed
  }, [selectMind]); // Run this effect whenever selectMind changes

  return (
//     <Box className='content-center'>
//       <ToastContainer theme="colored" autoClose={2000}/>
//       <Card sx={{ zIndex: 1 }} className='card-after'>
//         <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
//           <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//             <Image src='/images/logo.png' alt='Wabya Logo' width={'190px'} height={'50px'} layout='fixed' />
//           </Box>
//           <Box sx={{ mb: 6 }}>
//             <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
//               Adventure starts here 🚀
//             </Typography>
//             <Typography variant='body2'>Make your app management easy and fun!</Typography>
//           </Box>

//           <form onSubmit={handleSubmit} className='form-client-register'>
//             <TextField
//               autoFocus
//               fullWidth
//               type='text'
//               name='clientName'
//               id='clientName'
//               label='Name'
//               sx={{ marginBottom: 4 }}
//               value={values.clientName}
//               onChange={handleChange}
//               onBlur={handleBlur}
//             />

//               {
//               errors.clientName && touched.clientName ?
//                 (
//                   <p className="form-error">*{errors.clientName}</p>
//                 ) : null
//               }

//             <TextField
//               fullWidth
//               type='email'
//               name='clientEmail'
//               label='Email'
//               sx={{ marginBottom: 4 }}
//               value={values.clientEmail}
//               onChange={handleChange}
//               onBlur={handleBlur}
//             />
//               {
//                 errors.clientEmail && touched.clientEmail ?
//                 (
//                   <p className="form-error">*{errors.clientEmail}</p>
//                 ) : null
//               }
//             <TextField
//               autoFocus
//               fullWidth
//               type='text'
//               name='clientPhone'
//               id='clientPhone'
//               label='Phone Number'
//               sx={{ marginBottom: 4 }}
//               value={values.clientPhone}
//               onChange={handleChange}
//               onBlur={handleBlur}
//             />
//               {
//                 errors.clientPhone && touched.clientPhone ?
//                 (
//                   <p className="form-error">*{errors.clientPhone}</p>
//                 ) : null
//               }
// <Select
  
//   fullWidth
//   type='text'
//   name='clientCountry'
//   id='clientCountry'
//   label='Country'
//   sx={{ marginBottom: 4 }}
//   value={country_sel}
//   onChange={handleChangeCountry}
//   onBlur={handleBlur}
// >
// {country_data.map((country, index) => (
// <MenuItem value= {country.country}> {country.country}</MenuItem>
// ))}
// </Select>




//             {/* <TextField
//               autoFocus
//               fullWidth
//               type='text'
//               name='clientCountry'
//               id='clientCountry'
//               label='Country'
//               sx={{ marginBottom: 4 }}
//               value={values.clientCountry}
//               onChange={handleChange}
//               onBlur={handleBlur}
//             /> */}
//               {
//                 errors.clientCountry && touched.clientCountry ?
//                 (
//                   <p className="form-error">*{errors.clientCountry}</p>
//                 ) : null
//               }
//             <TextField
//               autoFocus
//               fullWidth
//               type='text'
//               name='clientZone'
//               id='clientZone'
//               label='Time Zone'
//               sx={{ marginBottom: 4 }}
//               value={selectedCountryTimezone}
//               onChange={handleChange}
//               onBlur={handleBlur}
//             />
//               {
//                 errors.clientZone && touched.clientZone ?
//                 (
//                   <p className="form-error">*{errors.clientZone}</p>
//                 ) : null
//               }


// {selectedCountryLanguages.length > 0 && (

// <Select
//   autoFocus
//   fullWidth
//   type='text'
//   name='clientLanguage'
//   id='clientLanguage'
//   label='Languages'
//   sx={{ marginBottom: 4 }}
//   value={lang_sel}
//   onChange={handleChangeLang}
//   onBlur={handleBlur}
// >

   
// {selectedCountryLanguages.map((language, index) => (
// <MenuItem value= {language}> {language}</MenuItem>
// ))}
// </Select>

// )} 

// {/* {selectedCountryLanguages.length > 0 && (
   
//    <select value={country_sel} onChange={handleChangeCountry}> 
//    {selectedCountryLanguages.map((language, index) => (
//       <option key={index} value={language}>
//       {language}
//     </option>
//    ))}
   
//    </select>
//      )} */}
//             {/* <TextField
//               autoFocus
//               fullWidth
//               type='text'
//               name='clientLanguage'
//               id='clientLanguage'
//               label='Languages'
//               sx={{ marginBottom: 4 }}
//               value={values.clientLanguage}
//               onChange={handleChange}
//               onBlur={handleBlur}
//             /> */}
//               {
//                 errors.clientLanguage && touched.clientLanguage ?
//                 (
//                   <p className="form-error">*{errors.clientLanguage}</p>
//                 ) : null
//               }



//             <TextField
//               fullWidth
//               type={visible ? 'text' : 'password'}
//               name='clientPassword'
//               label='Password'
//               sx={{ marginBottom: 4 }}
//               value={values.clientPassword}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               className='text-pass'
//             />
//             <span className="pass-eye" onClick={()=>setVisible(!visible)}>
//             {
//               visible ?
//               <EyeOutline fontSize='small' /> :
//               <EyeOffOutline fontSize='small' />
//             }
//             </span>

//               {
//                 errors.clientPassword && touched.clientPassword ?
//                 (
//                   <p className="form-error">*{errors.clientPassword}</p>
//                 ) : null
//               }

// {/* <TextField
//               autoFocus
//               fullWidth
//               type='text'
//               name='clientApi'
//               id='clientApi'
//               label='Cal API Key'
//               sx={{ marginBottom: 4 }}
//               value={values.clientApi}
//               onChange={handleChange}
//               onBlur={handleBlur}
//             />
//               {
//               errors.clientApi && touched.clientApi ?
//                 (
//                   <p className="form-error">*{errors.clientApi}</p>
//                 ) : null
//               } */}

//             {/* <TextField
//               autoFocus
//               fullWidth
//               type='text'
//               name='clientUsername'
//               id='clientUsername'
//               label='Cal Username'
//               sx={{ marginBottom: 4 }}
//               value={values.clientUsername}
//               onChange={handleChange}
//               onBlur={handleBlur}
//             />
//               {
//               errors.clientUsername && touched.clientUsername ?
//                 (
//                   <p className="form-error">*{errors.clientUsername}</p>
//                 ) : null
//               } */}

//             <Button fullWidth size='large' type='submit' variant='contained' sx={{ my: 7 }} >
//               Sign up
//             </Button>
//             <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
//               <Typography variant='body2' sx={{ marginRight: 2 }}>
//                 Already have an account?
//               </Typography>
//               <Typography variant='body2'>
//                 <Link passHref href='/client/login'>
//                   <LinkStyled>Sign In</LinkStyled>
//                 </Link>
//               </Typography>
//             </Box>
//           </form>
//         </CardContent>
//       </Card>
//       <FooterIllustrationsV1 />
//     </Box>

<> <section className="login-wrap register-wrap">
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
        
          <div className="login-grid">
            <div className="inner-info">
              <div className="logo-icon">
                <img src="../../images/logo-icon.png" />
              </div>
              <h2>start your journey here</h2>
              <h4 className="mrb-20">fill in your details</h4>
              <p className="reg-text mrb-40">
                already have an account? <a href="/client/login">sign in</a>
              </p>
              <form onSubmit={handleSubmit}>
                <div className="col-sm-12 form-group">
                  <input
                    className="form-control"
                    type='text'
                                  name='clientName'
                                  id='clientName'
                               
                                placeholder='name'
                                  value={values.clientName}
                                  onChange={handleChange}
                  />
                </div>
        
          {errors.clientName && touched.clientName && <Alert severity='error' style={{ margin :'0 0 20px 20px'}}>{errors.clientName}</Alert>}
                <div className="col-sm-12 form-group">
                  <input
                    className="form-control"
                    name=""
                    type="text"
                    placeholder="surname"
                  />
                </div>
               
                <div className="col-sm-12 form-group">
                  <select className="form-control select"  name='clientCountry'
  id='clientCountry'
  
  
  value={country_sel}
  onChange={handleChangeCountry}>
    <option>Select Country</option>
                  {country_data.map((country, index) => (
<option value= {country.country}> {country.country}</option>
))}
                  </select>
                </div>
                {/* {
                errors.clientCountry && touched.clientCountry ?
                (
                  <p className="form-error">*{errors.clientCountry}</p>
                ) : null
              } */}

{errors.clientCountry && touched.clientCountry && <Alert severity='error' style={{ margin :'0 0 20px 20px'}}>{errors.clientCountry}</Alert>}
            
             
                <div className="col-sm-12 form-group">
                <input
                    className="form-control"
                    type='text'
              name='clientZone'
              id='clientZone'
              
             
              value={selectedCountryTimezone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
             

{errors.clientZone && touched.clientZone && <Alert severity='error' style={{ margin :'15px 0 8px 5px',width:'70%'}}>{errors.clientZone}</Alert>}
      
                </div>
                <div className="col-sm-12 form-group mrb-10">
                  <div className="input-group">
                    <label className="label">
                      i would prefer my coach to be
                    </label>
                    <div className="p-t-10">
                      <label className="radio-container mrb-r">
                        <input
                          type="radio"
                          defaultChecked="checked"
                          name="gender"
                        />
                        <span className="checkmark" value="male"
          checked={selectedGender === 'male'}
          onChange={handleGenderChange} /> male
                      </label>
                      <label className="radio-container mrb-r">
                        <input type="radio" name="gender" value="female"
          checked={selectedGender === 'female'}
          onChange={handleGenderChange} />
                        <span className="checkmark" /> female
                      </label>
                      <label className="radio-container">
                        <input type="radio" name="gender" value="dontMind"
          checked={selectedGender === 'dontMind'}
          onChange={handleGenderChange} />
                        <span className="checkmark" /> i don’t mind
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 form-group mrb-10">
                  <div className="input-group red">
                    <label className="label">i’ve had coaching before</label>
                    <div className="p-t-10">
                      <label className="radio-container mrb-r">
                        <input
                          type="radio"
                          defaultChecked="checked"
                          name="coachingBefore"
                          value="yes"
          checked={selectedcoachingBefore === 'yes'}
          onClick={handleCoachingBeforeChange}
                        />
                        <span className="checkmark" /> yes
                      </label>
                      <label className="radio-container">
                        <input type="radio" name="coachingBefore"
                        value="no"
                        checked={selectedcoachingBefore === 'no'}
                        onClick={handleCoachingBeforeChange}
                        />
                        <span className="checkmark" /> no
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 form-group mrb-10">
                  <div className="input-group orange">
                    <label className="label">i’d prefer to meet in the</label>
                    <div className="p-t-10">
                      <label className="radio-container mrb-r">
                        <input type="radio" name="preferMeet" value="mornings"
          checked={selectedpreferMeet === 'mornings'}
          onClick={handlePreferMeet} />
                        <span className="checkmark" /> mornings
                      </label>
                      <label className="radio-container mrb-r">
                        <input type="radio" name="preferMeet" value="afternoons"
          checked={selectedpreferMeet === 'afternoons'}
          onClick={handlePreferMeet}/>
                        <span className="checkmark" /> afternoons
                      </label>
                      <label className="radio-container mrb-r">
                        <input type="radio" name="preferMeet" value="evenings"
          checked={selectedpreferMeet === 'evenings'}
          onClick={handlePreferMeet}/>
                        <span className="checkmark" /> evenings
                      </label>
                      <label className="radio-container">
                        <input type="radio" name="preferMeet" value="dontmind"
          checked={selectedpreferMeet === 'dontmind'}
          onClick={handlePreferMeet} />
                        <span className="checkmark" /> i don’t mind
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 form-group mrb-10">
                  <div className="input-group pastel">
                    <label className="label">what’s on my mind * :</label>
                    <div className="p-t-10">
                      <label className="radio-container mrb-r">
                        <input type="checkbox" name="mind" value="family"
          checked={selectMind.includes('family')}
          onChange={handleMind} />
                        <span className="checkmark" /> family
                      </label>
                      <label className="radio-container mrb-r">
                        <input type="checkbox" name="mind" value="health"
         
          checked={selectMind.includes('health')}
          onChange={handleMind} />
                        <span className="checkmark" /> health
                      </label>
                      <label className="radio-container mrb-r">
                        <input type="checkbox" name="mind" value="finances"
           checked={selectMind.includes('finances')}
          onChange={handleMind} />
                        <span className="checkmark" /> finances
                      </label>
                      <label className="radio-container mrb-r">
                        <input type="checkbox" name="mind" value="relationship"
           checked={selectMind.includes('relationship')}
          onChange={handleMind} />
                        <span className="checkmark" /> relationship(s)
                      </label>
                      <label className="radio-container mrb-r">
                        <input type="checkbox" name="mind" value="career"
           checked={selectMind.includes('career')}
          onChange={handleMind} />
                        <span className="checkmark" /> career
                      </label>
                      <label className="radio-container mrb-r">
                        <input type="checkbox" name="mind" value="other"
           checked={selectMind.includes('other')}
          onChange={handleMind} />
                        <span className="checkmark" /> other
                      </label>
                      <label className="radio-container pad-l0">
                        * select as many as you like
                      </label>
                    </div>
                  </div>
                </div>
                {/* <div className="col-sm-12 form-group">
                  <input
                    className="form-control"
                    name=""
                    type="text"
                    placeholder="if ‘other’ tell us more"
                  />
                </div> */}
                <div className="col-sm-12 form-group">
                  <input
                    className="form-control"
                    name='clientEmail'
                                 
                                  value={values.clientEmail}
                                  onChange={handleChange}
                    placeholder="email"
                  />
                </div>

                {/* {
                errors.clientEmail && touched.clientEmail ?
                (
                  <p className="form-error">*{errors.clientEmail}</p>
                ) : null
              } */}

{errors.clientEmail && touched.clientEmail  && <Alert severity='error' style={{ margin :'0 0 20px 20px'}}>{errors.clientEmail}</Alert>}
{emailExist  && <Alert severity='error' style={{ margin :'0 0 20px 20px'}}>*Email Already Exist</Alert>}
   
              
                <div className="col-sm-12 form-group">
                  <input
                    className="form-control"
                    name='clientPassword'
                                  type='password'
                                  value={values.clientPassword}
                                  onChange={handleChange}
                    placeholder="create password"
                  />
                </div>

                {/* {
                errors.clientPassword && touched.clientPassword ?
                (
                  <p className="form-error">*{errors.clientPassword}</p>
                ) : null
              } */}
   {errors.clientPassword && touched.clientPassword  && <Alert severity='error' style={{ margin :'0 0 20px 20px'}}>{errors.clientPassword}</Alert>}
             
                <div className="col-sm-12 form-group">
                  <input
                    className="form-control"
                    name='clientRePassword'
                    type='password'
                    value={values.clientRePassword}
                    onChange={handleChange}
                    placeholder="retype password"
                  />
                </div>
                {/* {
                errors.clientRePassword && touched.clientRePassword ?
                (
                  <p className="form-error">*{errors.clientRePassword}</p>
                ) : null
              } */}

{errors.clientRePassword && touched.clientRePassword && <Alert severity='error' style={{ margin :'0 0 20px 20px'}}>{errors.clientRePassword}</Alert>}
 

{/* {
                confirmMsg ?
                (
                  <p className="form-error">*Both Password Should be Match</p>
                ) : null
              } */}

{confirmMsg  && <Alert severity='error' style={{ margin :'0 0 20px 20px'}}>*Both Password Should be Match</Alert>}
            

              {/* {  emailExist ?
                (
                  <p className="form-error">*Email Already Exist</p>
                ) : null
              } */}

          
                <div className="col-sm-12 form-group">
                  <p className="mrb-0">
                    * required for login for your free session.
                    <br />
                    password must be at least 8 characters and include
                    uppercase,
                    <br />a number and special character.
                  </p>
                </div>
                <div className="col-sm-12 form-group">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="accept"
                      checked={termChecked}
                      onClick={handleCheckboxClick}
                    />
                    <label
                      className="custom-control-label ml-2"
                      htmlFor="remember"
                    >
                      i accept the <u>terms of service</u>
                    </label>
                  </div>


                </div>
{termMsg}
                {termMsg && <Alert severity='error' style={{ margin :'0 0 20px 20px'}}>Please Accept Terms & Condition</Alert>}
                {successMsg  && <Alert severity='success' style={{ margin :'15px 0 8px 5px',width:'97%'}}>Registration Successfully... Redirecting to Schedule your Discovery Session...</Alert>}          
                <div className="col-sm-12 form-group text-center mrb-40">
                  <input className="btn" defaultValue="login" type="submit" />
                </div>
                 
              </form>
            </div>
            {/*/ inner-info */}
          </div>
          {/*/ login grid */}
        </div>
        {/*/ col-sm */}
      </div>
      {/*/ row */}
    </div>
  </section>
  {/*/ login-wrap */}

</>
  )
}

RegisterPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default RegisterPage
