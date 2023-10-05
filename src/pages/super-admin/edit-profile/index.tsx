//  ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Button, { ButtonProps } from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import { useRouter } from 'next/router';

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// firebase config
import { database, storage } from '../../../../firebaseConfig'
import { collection, doc, updateDoc, getDoc } from 'firebase/firestore'
import { useFormik } from 'formik';
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { Alert } from 'antd'

// ** React Imports
import { SyntheticEvent, useState, useEffect, forwardRef } from 'react'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

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


const EditProfile = () => {
  const router = useRouter();
  const [proName, setName] = useState('');
  const [proEmail, setEmail] = useState('');
  const [proPhone, setPhone] = useState('');
  const [proCountry, setCountry] = useState('');
  const [proLanguage, setLanguage] = useState('');
  const [proTimeZone, setTimeZone] = useState('');
  const [proBio, setBio] = useState('');
  const [proAbout, setAbout] = useState('');
  const [proImage,setImage] = useState('');

  // ** State
  const [value, setValue] = useState<string>('account')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  const [imgSrc, setImgSrc] = useState<string>('/images/user-image.png')
  const [date, setDate] = useState<Date | null | undefined>(null)

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)
      reader.readAsDataURL(files[0]);
      console.log(files)
    }
  }

  // edit profile super-admin
  const [message, setMessage] = useState(false);

  useEffect(() => {

    const editAdmin = async () => {

      const adminIds = sessionStorage.getItem('adminId');
      const userCollection = collection(database, 'admin_user');
      const userDocRef = doc(userCollection, adminIds);
      const userDoc = await getDoc(userDocRef);

      setName(userDoc.data().name),
      setEmail(userDoc.data().email),
      setPhone(userDoc.data().phone),
      setCountry(userDoc.data().country),
      setLanguage(userDoc.data().languages),
      setTimeZone(userDoc.data().timezone),
      setBio(userDoc.data().bio),
      setAbout(userDoc.data().about)
      setImage(userDoc.data().profile)
    };
    editAdmin();

  }, []);


  const handleSubmit = async () =>{

    const adminIds = sessionStorage.getItem('adminId');
    const userDocRef = doc(collection(database, 'admin_user'), adminIds);

    const updatedData = {
        name: proName,
        phone : proPhone,
        country : proCountry,
        timezone : proTimeZone,
        languages : proLanguage,
        bio : proBio,
        about : proAbout,
        profile : 'https://firebasestorage.googleapis.com/v0/b/wabya-45dba.appspot.com/o/super-admin%2Fprofile%2Fimageedit_5_2493534812.png?alt=media&token=d538d2b9-e2ef-4967-9468-2cab763aa3df&_gl=1*ve6mq7*_ga*MTIzMzY1Njg1LjE2OTA4MDU4Nzg.*_ga_CW55HF8NVT*MTY5NjUwMTg3NC42OC4xLjE2OTY1MDE4ODQuNTAuMC4w'
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

    nameField.value = updatedData.name;
    bioField.value = updatedData.bio;
    aboutField.value = updatedData.about;
    countryField.value = updatedData.country;
    languageField.value = updatedData.languages;
    timezoneField.value = updatedData.timezone;
    phoneField.value = updatedData.phone;

    router.push('/super-admin/dashboard');

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

      const storageRef = ref(storage, `/super-admin/profile/${file.name}`)
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

        // setFile(null);
        console.log('File Uploaded!');
    });
    }
    );

  }
  }

  useEffect(() => {

    console.log(file);
    if(file != null){
      profile();
    }

  }, [file]);



  return (
    <>
    <section className="edit-profile desktop-hidden">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h2>edit profile</h2>
            <div className='inner-info'>

      <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {file ? (<ImgStyled src={URL.createObjectURL(file)} alt='Profile Pic' />) : (<ImgStyled src={proImage} alt='Profile Pic' />)}

              <Box>
                <ButtonStyled className='btn' component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input name='pro_image'
                    hidden
                    type='file'
                    onChange={handleFileChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>

                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
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
            <TextField fullWidth type='text' label='Country' placeholder='Country' name='pro_country' id='pro_country' value={proCountry} onChange={event => setCountry(event.target.value)} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth type='text' label='Language' placeholder='Language' name='pro_language' id='pro_language' value={proLanguage} onChange={event => setLanguage(event.target.value)} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth type='text' label='Time Zone' placeholder='Time Zone' name='pro_timezone' id='pro_timezone' value={proTimeZone} onChange={event => setTimeZone(event.target.value)} />
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
          </div>
        </div>
      </div>
    </section>
    <section className="user-detail new-user-profile-edit mobile-hidden">
 
    <div className="user-profile mrb-20">
      <figure>
      {file ? (<ImgStyled src={URL.createObjectURL(file)} alt='Profile Pic' />) :
        (<img src={proImage} alt="" />)}
      </figure>
      
      <Box>
            <ButtonStyled className='btn' component='label' variant='contained' htmlFor='account-settings-upload-image'>
              Upload New Photo
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
        <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
        <div className="close-back"><a href="/superadmin/dashboard"><i class="fa fa-times" aria-hidden="true"></i></a></div>
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

           
          

            <li className="col-12">
              <span className="bold">timezone</span>{" "}
              <input
                type="text"
                className="form-control"
                placeholder='Phone' name='pro_timezone' id='pro_timezone' value={proTimeZone} onChange={event => setTimeZone(event.target.value)}
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
</>
  )
}

export default EditProfile
