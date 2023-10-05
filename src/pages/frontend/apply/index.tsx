// ** React Imports
import { ReactNode, useState,useRef } from 'react'

// ** Next Imports
// import Link from 'next/link'

// import header & footer files
import Header from 'src/views/frontend/layouts/Header'
import Footer from 'src/views/frontend/layouts/Footer'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import emailjs from '@emailjs/browser';
import { Alert } from '@mui/material'
import { collection, addDoc} from 'firebase/firestore'
import { app, database } from '../../../../firebaseConfig'

const ApplyWabyaBasic = () => {
  const form1 = useRef();
  const [isThankModal, setIsThankModal] = useState(false)

  const [name, setName] = useState('');

  const [surname, setSurname] = useState('');

  const [email, setEmail] = useState('');
  const [msg, setmsg] = useState('');
  const [mobile, setmobile] = useState('');
  const [terms, setterms] = useState(false);

  const [enqMsg, setenqMsg] = useState(false);

  const [pass, setpass] = useState('');


  const [nameErr, setnameErr] = useState('');
  const [surnameErr, setsurnameErr] = useState('');
  const [emailErr, setemailErr] = useState('');
  const [mobileErr, setemobileErr] = useState('');
  const [msgErr, setmsgErr] = useState('');
  const [passErr, setpassErr] = useState('');
  const [msgLenErr, setmsgLenErr] = useState('');
  const [validEmailErr, setvalidEmailErr] = useState('');
  const [message, setErrorMsg] = useState(false);
  const [isAccept, setisAccept] = useState(false);
  const [TermMsg, setTermlMsg] = useState('');
  const [success, setsuccess] = useState('');
  const coachesRef = collection(database, 'coaches_user');

  const thankModal = () => {
    setIsThankModal(true)
  }

  const cancelModal = () => {
    setIsThankModal(false)
  }
  
  const onSubmit = (event) => {
    event.preventDefault();
    let err=0;
    setnameErr('');
    setsurnameErr('');
    setemailErr('');
    setmsgErr('');
    setemobileErr('');
    setTermlMsg('');
    setmsgLenErr('');
    setvalidEmailErr('');


   
    if(name == ""){
setnameErr('Name Field is Required');
err=err+1;
    }


    if(surname == ""){
      setsurnameErr('SurName Field is Required');
      err=err+1;
          }
          if(mobile == ""){
            setemobileErr('Mobile Field is Required');
            err=err+1;
                }

                if(pass == ""){
                  setpassErr('Password Field is Required');
                  err=err+1;
                      }

          if(email == ""){
            setemailErr('Email Field is Required');
            err=err+1;
                }else{
                   // Check if the entered value is a valid email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);

    if(!isValid){
      setvalidEmailErr('Please Enter Valid Email');
      err=err+1;
    }
                }


                if(msg == ""){
                  setmsgErr('Message Field is Required');
                  err=err+1;
                      }else{

                      // if(msg.length <= 250){
                      //   setmsgLenErr('Minimum of 250 words Required');
                      //   err=err+1;
                      //       }
                          }

                      if(isAccept == false){
                        setTermlMsg('Please Accept This');
                        err=err+1;
              
                       }

    if(err == 0){
    //  emailjs.sendForm('service_mwla9qu', 'template_4uf3noc', form1.current, 'kSYqPWVMFZAxQB2yI')
      // .then((result) => {
      //     console.log(result.text);
      //     setIsThankModal(true);
      //   //  action.resetForm();
      //   if (typeof window !== 'undefined') {
      //     window.scrollTo(0, 0);
      //   }
          
      // }, (error) => {
      //     console.log(error.text);
      // });

      addDoc(coachesRef, {
        coach_name: email.toLowerCase(),
        coach_country : String(),
        coach_email : email.toLowerCase(),
        coach_password : pass,
        coach_phone : Number(mobile),
        coach_timezone : String(),
        coach_api : String(),
        coach_uname : String(),
        coach_language: String(),
        coach_about: String(),
        coach_bio: String(),
        coach_profile: String(),
        coach_uid : Number(),
      })
        .then(() => {
        setsuccess('Coach Added');
        //  router.push('/pages/login')
        })
        .catch((err) => {
          console.error(err);
        })
    }
    else{
      console.log('error');
    }
  }

  const handleCheckboxChange = () => {
    setisAccept(!isAccept);
  };
  return (
    <>

    <section className="work-together">
      <div className="container">
        <div className="row align-items-center">

        <div className="col-sm-12">
          <div className="wt-title mrb-30">
            <h2>Let’s work together</h2>

            {
            isThankModal ?
              (
                <>
                <div className="thank-modal">
                  <div className="front-pricing thank-note apply-thank">
                    <div className="pr-modal">
                      <div><i className="fa fa-angle-left" onClick={cancelModal}></i></div>
                      <div><span>thank you</span></div>
                    </div>
                    <div className="divider"></div>
                    <div className="para-modal">
                      <p>Well done on taking the first step in your coaching journey with wabya! <br /> Someone from the team will be in touch with you shortly</p>
                    </div>
                  </div>
                </div>
                </>
              ) : null
            } 

            <p><strong>Please note, we only work with coaches who have graduated from an ICF, EMCC or AC-accredited coaching programme.</strong></p>
        </div>

          <div className="inner">
          <form ref={form1}>
            <div className="col-sm-6 form-group"><input className="form-control" name="name" value={name}  placeholder="name" onChange={(event) => setName(event.target.value)}/> {nameErr && <Alert severity='error' style={{ margin :'0 0 20px 0'}}>{nameErr}</Alert>}</div>

          <div className="col-sm-6 form-group"><input className="form-control" name="name" value={surname} placeholder="surname" onChange={(event) => setSurname(event.target.value)}/></div>
          <div className="col-sm-6 form-group"><input className="form-control" name="email" value={email} placeholder="email" onChange={(event) => setEmail(event.target.value)}/> {emailErr && <Alert severity='error' style={{ margin :'0 0 20px 0'}}>{emailErr}</Alert>}
                              <p className="form-error3"> {validEmailErr} </p></div>
          <div className="col-sm-6 form-group"><input className="form-control" name="mobile" placeholder="mobile number" value={mobile} onChange={(event) => setmobile(event.target.value)}/> {mobileErr && <Alert severity='error' style={{ margin :'0 0 20px 0'}}>{mobileErr}</Alert>}</div>
          <div className="col-sm-6 form-group"><textarea className="form-control" placeholder="a bit about me" value={msg} onChange={(event) => setmsg(event.target.value)}></textarea>  {msgErr && <Alert severity='error' style={{ margin :'0 0 20px 0'}}>{msgErr}</Alert>}
          {msgLenErr && <Alert severity='error' style={{ margin :'0 0 20px 0'}}>{msgLenErr}</Alert>}</div>


                              <div className="col-sm-6 form-group"><input type="password" className="form-control" name="pass" placeholder="password" value={pass} onChange={(event) => setpass(event.target.value)}/> {passErr && <Alert severity='error' style={{ margin :'0 0 20px 0'}}>{passErr}</Alert>}</div>                   
          <div className="col-sm-6 form-group"></div>
          <div className="col-sm-12 form-group">
              <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="accept" onClick={handleCheckboxChange}/>
              <small><strong>I have graduated from an ICF, EMCC or AC-accredited coaching programme</strong></small>
              {TermMsg && <Alert severity='error' style={{ margin :'0 0 20px 0'}}>{TermMsg}</Alert>}
            </div>
            </div>
          <div className="col-sm-12 form-group"><input className="btn" value="submit" type="button"  onClick={onSubmit}/></div>
          {success && <Alert severity='success' style={{ margin :'0 0 20px 0'}}>{success}</Alert>}
         
          </form>
          </div>
        </div> {/* <!--/ col-sm --> */}

        </div> {/* <!--/ row --> */}
      </div>
    </section> {/* <!--/ work-together --> */}

    </>
  )
}

ApplyWabyaBasic.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default ApplyWabyaBasic
