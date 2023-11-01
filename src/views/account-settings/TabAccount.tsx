// ** React Imports
import { useState, ElementType, ChangeEvent, forwardRef, useEffect } from 'react'
import { useRouter } from 'next/router'

// firebase config
import { database, storage } from '../../../firebaseConfig'
import { collection, doc, updateDoc, getDoc } from 'firebase/firestore'
import { useFormik } from 'formik';
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { Alert } from 'antd'
import country_data from '../../@core/utils/all-countries'


// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

// import Link from '@mui/material/Link'
// import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'

// import AlertTitle from '@mui/material/AlertTitle'
// import IconButton from '@mui/material/IconButton'
// import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button, { ButtonProps } from '@mui/material/Button'

// ** Third Party Imports
// import DatePicker from 'react-datepicker'

// ** Styled Components
// import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Icons Imports
// import Close from 'mdi-material-ui/Close'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))
const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Birth Date' fullWidth {...props} />
})

const TabAccount = () => {

    const router = useRouter()

    useEffect(() => {
      const token = sessionStorage.getItem('coachId')

      if(!token){
          router.push('/client/login')
      }
    }, [])

  // ** State

  const [imgSrc, setImgSrc] = useState<string>('/images/user-image.png')
  const [date, setDate] = useState<Date | null | undefined>(null)

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)

      reader.readAsDataURL(files[0])
    }
  }

    // edit profile coach
    const [proName, setName] = useState('');
    const [proEmail, setEmail] = useState('');
    const [proPhone, setPhone] = useState('');
    const [proCountry, setCountry] = useState('');
    const [proLanguage, setLanguage] = useState('');
    const [proTimeZone, setTimeZone] = useState('');
    const [proBio, setBio] = useState('');
    const [proAbout, setAbout] = useState('');
    const [proImage,setImage] = useState('');
    const [message, setMessage] = useState(false);

    const [start_time_hour, setstart_time_hour] = useState("00");

    const [start_time_minute, setstart_time_minute] = useState("00");

    const handleStartTimeHour = (event) => {
      const value = parseInt(event.target.value, 10);
      const end_value = parseInt(end_time_hour, 10);
      const endvalue = value + 1
      if(value>=0){
      if (!isNaN(value) && value <= 22) {
        if(value < 10){
          setstart_time_hour("0"+value);
        }else{
          setstart_time_hour(value);
        }

if(end_value <= value){
        if(endvalue < 10){
          setend_time_hour("0"+endvalue);
        }else{
          setend_time_hour(endvalue);
        }

      }
      }
    }
    }


    const handleStartTimeMin = (event) => {
      console.log(event.target.value);
      let value = parseInt(event.target.value, 10);
if(value>=0){
      if(value==1){
        value=value+29;
      }
      if(value > 1 && value <= 59 && value!=30){
        value=60;
      }
      if(value==31){
        value=value+29;
      }

      if(value==60){
        value=0;
      }
      if (!isNaN(value) && value <= 60) {
        if(value < 10){
          setstart_time_minute("0"+value);
        }else{
          setstart_time_minute(value);
        }
      }
    }
    }


    const [end_time_hour, setend_time_hour] = useState("00");

    const [end_time_minute, setend_time_minute] = useState("00");

    const handleEndTimeHour = (event) => {
      const startvalue = parseInt(start_time_hour, 10);
      const value = parseInt(event.target.value, 10);
      if(value>=0){
      if (!isNaN(value) &&  value >startvalue  && value <= 23 ) {
        if(value < 10){
          setend_time_hour("0"+value);
        }else{
          setend_time_hour(value);
        }
      }
    }
    }


    const handleEndTimeMin = (event) => {
      console.log(event.target.value);
      let value = parseInt(event.target.value, 10);
      if(value>=0){
      if(value==1){
        value=value+29;
      }
      if(value > 1 && value <= 59 && value!=30){
        value=60;
      }

      if(value==60){
        value=0;
      }
      if (!isNaN(value) && value <= 60) {
        if(value < 10){
          setend_time_minute("0"+value);
        }else{
          setend_time_minute(value);
        }
      }
    }
    }
    const [country_sel, setcountry_sel] = useState('');

    const [lang_sel, setlang_sel] = useState('');

 
  




    const handleChangeCountry = (event) => {
      setcountry_sel(event.target.value);
     // values.clientCountry=event.target.value;
     
     
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
    

    useEffect(() => {


      
  
        setTimeZone(getTimeZoneOfSelectedCountry())
      //  values.clientLanguage=selectedCountryLanguages[0];
      
  
  
    }, [country_sel])

    useEffect(() => {

      const editAdmin = async () => {

       
        const coachIds = sessionStorage.getItem('coachId');
        const userCollection = collection(database, 'coaches_user');
        const userDocRef = doc(userCollection, coachIds);
        const userDoc = await getDoc(userDocRef);
        console.log(userDoc.data());
        setName(userDoc.data().coach_name),
        setEmail(userDoc.data().coach_email),
        setPhone(userDoc.data().coach_phone),
        setCountry(userDoc.data().coach_country),
        setcountry_sel(userDoc.data().coach_country),
        setLanguage(userDoc.data().coach_language),
        setTimeZone(userDoc.data().coach_timezone),
        setBio(userDoc.data().coach_bio),
        setAbout(userDoc.data().coach_about),
        setImage(userDoc.data().coach_profile),
        setfileUrl(userDoc.data().coach_profile)
        if(userDoc.data().start_time){
          var s_time = userDoc.data().start_time;
var parts1 = s_time.split(":");

setstart_time_hour(parts1[0])
setstart_time_minute(parts1[1])
        }else{
          setstart_time_hour("09")
          
        }


        if(userDoc.data().end_time){
          var e_time = userDoc.data().end_time;
var parts2 = e_time.split(":");

setend_time_hour(parts2[0])
setend_time_minute(parts2[1])
        }else{
          setstart_time_hour("17")
          
        }
        
      };
      editAdmin();

    }, []);


    const handleSubmit = async (e) =>{
      e.preventDefault();

      const coachIds = sessionStorage.getItem('coachId');
      const userDocRef = doc(collection(database, 'coaches_user'), coachIds);
      const s_time = ""+ start_time_hour + ":" + start_time_minute + ":00";
      const e_time = ""+ end_time_hour + ":" + end_time_minute + ":00";
      const updatedData = {
        coach_profile : fileUrl,
        coach_name: proName,
        coach_phone : proPhone,
        coach_country : country_sel,
        coach_timezone : proTimeZone,
        coach_language : proLanguage,
        coach_bio : proBio,
        coach_about : proAbout,
        
        start_time:s_time,
        end_time:e_time,
        
      };
      await updateDoc(userDocRef, updatedData);
      setMessage(true);

      //reflect changes instant
      const nameField = document.getElementById("pro_fullname");
      const bioField = document.getElementById("pro_bio");
      const aboutField = document.getElementById("pro_about");
      const countryField = document.getElementById("pro_country");
      const languageField = document.getElementById("pro_language");
      const timezoneField = document.getElementById("pro_timezone");
      const phoneField = document.getElementById("pro_phone");

      nameField.value = updatedData.coach_name;
      bioField.value = updatedData.coach_bio;
      aboutField.value = updatedData.coach_about;
      //countryField.value = updatedData.coach_country;
      languageField.value = updatedData.coach_language;
      timezoneField.value = updatedData.coach_timezone;
      phoneField.value = updatedData.coach_phone;
    }

    const handleClose = () => {
      setMessage(false);
    };

    const [file, setFile] = useState(null);
    const [fileUrl, setfileUrl] = useState("");
    const MAX_FILE_SIZE = 800 * 1024;

    function handleFileChange(event) {

      const selectedFile = event.target.files[0];
      const allowedTypes = ['image/jpeg', 'image/png'];

      if (!allowedTypes.includes(selectedFile.type)) {
        alert('Only JPEG and PNG files are allowed!');

        return;
      }
      if (selectedFile && selectedFile.size > MAX_FILE_SIZE) {
        alert("File size exceeds the limit of 800kb");

        return;
      }

      setFile(selectedFile);
    }

    function profile(){
      if (file != null) {

        const storageRef = ref(storage, `/coach/profile/${file.name}`)
        const uploadTask =  uploadBytesResumable(storageRef, file);
        uploadTask.on("state_changed",
          (snapshot) => {

            console.log('snapshot');

          },
      (err) => console.log(err),
          () => {
      // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setfileUrl(url);
          console.log('File Uploaded!');
      });
      }
      );

    }
    }

    useEffect(() => {
      var lang=getLanguagesOfSelectedCountry();
      console.log(lang);
      if(lang.length>0){
 
       setlang_sel(lang[0]);
       setLanguage(lang[0]);
      }
     

    }, [country_sel]);

    useEffect(() => {

      console.log(file);
      if(file != null){
        profile();
      }

    }, [file]);


  return (
    <>
      <section className="edit-profile coach-edit-desktop lower-letter">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
    <div className='inner-info'>

      <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {file ? (<ImgStyled src={URL.createObjectURL(file)} alt='Profile Pic' />) : (<ImgStyled src={proImage} alt='Profile Pic' />)}

              <Box>
                <ButtonStyled className='btn' component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  upload new photo
                  <input name='pro_image'
                    hidden
                    type='file'
                    onChange={handleFileChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>

                <Typography variant='body2' sx={{ marginTop: 5 }}>
                PNG or JPEG. Max 800KB.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField type='text' fullWidth label='Name' placeholder='Name' value={proName} onChange={event => setName(event.target.value)}  id='pro_fullname' name='pro_fullname' />
          </Grid> 
          <Grid item xs={12} sm={6}>
            <TextField type='text' fullWidth label='Email' placeholder='Email' value={proEmail} onChange={event => setEmail(event.target.value)} name='pro_email' id='pro_email' disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth type='text' label='Phone' placeholder='Phone' name='pro_phone' id='pro_phone' value={proPhone} onChange={event => setPhone(event.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* <TextField fullWidth type='text' label='Country' placeholder='Country' name='pro_country' id='pro_country' value={proCountry} onChange={event => setCountry(event.target.value)} /> */}
            <Select
  
  fullWidth
  type='text'
  name='clientCountry'
  id='clientCountry'
  label='Country'
  sx={{ marginBottom: 4 }}
  value={country_sel}
  onChange={handleChangeCountry}

>
{country_data.map((country, index) => (
<MenuItem value= {country.country}> {country.country}</MenuItem>
))}
</Select>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth type='text' label='Language' placeholder='Language' name='pro_language' id='pro_language' value={proLanguage} onChange={event => setLanguage(event.target.value)} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth type='text' label='Time Zone' placeholder='Time Zone' name='pro_timezone' id='pro_timezone' value={proTimeZone} onChange={event => setTimeZone(event.target.value)} />
          </Grid>

          <Grid item xs={12} sm={2}>
            <TextField fullWidth type='number' label='Start Time Hour'  value={start_time_hour} name='pro_timezone' id='pro_timezone' onChange={handleStartTimeHour}  />
          </Grid>
        
       
          <Grid item xs={12} sm={2}>
            <TextField fullWidth type='number' label='Start Time Minute' placeholder='00' name='pro_timezone' id='pro_timezone' value={start_time_minute} onChange={handleStartTimeMin} />
          </Grid>



          <Grid item xs={12} sm={2}>
            <TextField fullWidth type='number' label='End Time Hour' placeholder='09' name='pro_timezone' id='pro_timezone' value={end_time_hour} onChange={handleEndTimeHour} />
          </Grid>
        
       
          <Grid item xs={12} sm={2}>
            <TextField fullWidth type='number' label='End Time Minute' placeholder='00' name='pro_timezone' id='pro_timezone' value={end_time_minute} onChange={handleEndTimeMin} />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              label='Bio'
              minRows={2}
              placeholder='Bio'
              name='pro_bio'
              id='pro_bio'
              value= {proBio}
              onChange={event => setBio(event.target.value)}

              // value='The name’s John Deo. I am a tireless seeker of knowledge, occasional purveyor of wisdom and also, coincidentally, a graphic designer. Algolia helps businesses across industries quickly create relevant 😎, scalable 😀, and lightning 😍 fast search and discovery experiences.'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              label='About'
              minRows={2}
              placeholder='About'
              value={proAbout}
              id='pro_about'
              name='pro_about'
              onChange={event => setAbout(event.target.value)}
            />
          </Grid>

          <Grid item xs={12}>

            <button type='submit' className="btn btn-save" onClick={handleSubmit}>
              Save Changes
            </button>
            {/* <button type='reset' className="btn reset-btn">
              Reset
            </button> */}
          </Grid>
          <Grid item xs={12}>
          {message ? (
              <Alert message="Profile updated successfully" type="success" showIcon closable afterClose={handleClose} />
          ) : null}
          </Grid>
        </Grid>
      </form>

    </div>
    </div></div></div></section>


<section className="user-detail new-user-profile-edit coach-edit-mobile lower-letter">
 
        <div className="user-profile mrb-20">
          <figure>
          {file ? (<ImgStyled src={URL.createObjectURL(file)} alt='Profile Pic' />) :
            (<img src={proImage} alt="" />)}
          </figure>
          
          <Box>
                <ButtonStyled className='btn' component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  upload new photo
                  <input name='pro_image'
                    hidden
                    type='file'
                    onChange={handleFileChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>

               
              </Box>
          {/* <div className="accepting-info mrb-20">
            <span>accepting new client</span>
            <label className="switch">
              <input className="switch-input" type="checkbox" />
              <span className="switch-label" data-on="Yes" data-off="No" />
              <span className="switch-handle" />
            </label>
          </div> */}
          <br></br>
          <div className="user-bio">
            <form>
            <div className="close-back"><a href="/coach/dashboard"><i class="fa fa-times" aria-hidden="true"></i></a></div>
              <ul className="row">
                <li className="col-12">
                  <span className="bold">information</span>
                </li>
                <li className="col-12">
                  <span className="bold">Name</span>{" "}
                  <input
                    type="text"
                    className="form-control"
                    placeholder='Name' value={proName} onChange={event => setName(event.target.value)}  id='pro_fullname' name='pro_fullname'
                  />
                </li>
                <li className="col-6">
                  <span className="bold">email:</span>{" "}
                  <input
                    type="text"
                    className="form-control"
                    placeholder='Email' value={proEmail} onChange={event => setEmail(event.target.value)} name='pro_email' id='pro_email' disabled
                  />
                </li>
                <li className="col-6">
                  <span className="bold">phone</span>{" "}
                  <input
                    type="text"
                    className="form-control"
                    placeholder='Phone' name='pro_phone' id='pro_phone' value={proPhone} onChange={event => setPhone(event.target.value)}
                  />
                </li>

               
                <li className='col-12'>

                <select
  
  
 
  name='clientCountry'
  id='clientCountry'
 
 
  value={country_sel}
  className="form-control"
  onChange={handleChangeCountry}

>
{country_data.map((country, index) => (
<option value= {country.country}> {country.country}</option>
))}
</select>
                </li>

                <li className="col-12">
                  <span className="bold">timezone</span>{" "}
                  <input
                    type="text"
                    className="form-control"
                    placeholder='Timezone' name='pro_timezone' id='pro_timezone' value={proTimeZone} onChange={event => setTimeZone(event.target.value)}
                  />
                </li>
                <li className="col-12">
                  <span className="bold">languages</span>{" "}
                  <input
                    type="text"
                    className="form-control"
                    placeholder='Language' name='pro_language' id='pro_language' value={proLanguage} onChange={event => setLanguage(event.target.value)}
                  />
                </li>
                <li className="col-12">
                  <span className="bold">bio </span>{" "}
                  <textarea
                    className="form-control"
                    placeholder='Bio'
                    name='pro_bio'
                    id='pro_bio'
                    value= {proBio}
                    onChange={event => setBio(event.target.value)}
                    >{proBio}</textarea>
                  
                </li>
                <li className="col-12">
                  <span className="bold">about </span>{" "}
                  <textarea
                    className="form-control"
                    placeholder='About'
              value={proAbout}
              id='pro_about'
              name='pro_about'
              onChange={event => setAbout(event.target.value)}
                    >{proAbout}</textarea>
                
                </li>
                <li className='col-12'>{message ? (
              <Alert message="Profile updated successfully" type="success" showIcon closable afterClose={handleClose} />
          ) : null}</li>
                <li className="col-12 user-edit-btn">
                  <button className="btn btn-send" onClick={handleSubmit}>save</button>
                </li>
        
              
        
              </ul>
            </form>
          </div>
        </div>
     
</section>
{/*/ user */}
</>

  )
}

export default TabAccount
