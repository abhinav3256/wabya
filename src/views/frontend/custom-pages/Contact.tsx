import Link from "next/link"
import { database } from '../../../../firebaseConfig'
import { useRouter } from 'next/router'
import { useState, useEffect,useRef } from 'react'
import { collection, addDoc } from 'firebase/firestore';

// form validation
import { useFormik } from "formik";
import * as Yup from "yup";

import { Alert } from '@mui/material'
import emailjs from '@emailjs/browser';

const Contact = () => {
 
  const router = useRouter()
  const form1 = useRef();
  const [message, setErrorMsg] = useState(false);

  const initialValues = {
    contactName: "",
    contactEmail: "",
    contactMessage : "",
    contactChoose : "",
  }

  //  yup form validation
  const signUpSchema = Yup.object({
    contactName: Yup.string().min(2).max(25).required("Name field is required"),
    contactEmail: Yup.string().email().required("Email field is required"),
    contactMessage: Yup.string().required("Message field is required"),
    contactChoose: Yup.string().required("Please choose any option"),
  });

  const contactRef = collection(database, 'Contact');

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

          addDoc(contactRef, {
            contactName: values.contactName,
            contactEmail : values.contactEmail,
            contactMessage : values.contactMessage,
            contactChoose : values.contactChoose,
          })
 
            .then(() => {
              emailjs.sendForm('service_mwla9qu', 'template_l8eegsc', form1.current, 'kSYqPWVMFZAxQB2yI')
              .then((result) => {
                  console.log(result.text);
                  action.resetForm();
                  const element =  document.getElementById("sucmsg");
          if (element) {
            console.log('here');
            const offsetTop = element.offsetTop -300 ;
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth' // Scroll behavior (optional)
            });
          }
                  
              }, (error) => {
                  console.log(error.text);
              });
             
              setErrorMsg(true);
            })
            .catch((err) => {
              console.error(err);
            })

      );
     
    },
  });

    console.log(
      "🚀 ~ file: index.tsx ~ line 90 ~ Registration ~ errors",
      errors
    );


  return(

    <>
      <section className="contact-wrap">
        <div className="container">
          <div className="row">

          <div className="col-sm-6 left">
            <h2>
              {/* <span>Contact Us</span> */}
              how can we help?</h2>
              {/* <p>Leave us your contact info and a short message with your query - we’ll get back to you asap! </p> */}

          </div> {/* <!--/ col-sm --> */}

          <div className="col-sm-6 right">
            <div className="inner">
            {message ? (
              <Alert  className="text-left mb-4" id="sucmsg"> thanks, we'll be in touch!.</Alert>
              ) : null}

            <form noValidate autoComplete='off' onSubmit={handleSubmit}   ref={form1}>
              <div className="form-group"><input className="form-control" placeholder="Name" type="text" name="contactName" value={values.contactName} onChange={handleChange} onBlur={handleBlur} />
              </div>
              {
              errors.contactName && touched.contactName ?
                (
                  <p className="form-error">*{errors.contactName}</p>
                ) : null
              }
              <div className="form-group"><input className="form-control" placeholder="Email" type="email" name="contactEmail" value={values.contactEmail} onChange={handleChange} onBlur={handleBlur} />
              </div>
              {
              errors.contactEmail && touched.contactEmail ?
                (
                  <p className="form-error">*{errors.contactEmail}</p>
                ) : null
              }
              <div className="form-group left">
                <small><strong>I’m a</strong></small>

                <span><input type="radio" name="contactChoose" id="choose_type" value='coach' onChange={handleChange}  /> coach</span>
                <span><input type="radio" name="contactChoose" id="choose_type" value='client' onChange={handleChange}  /> client</span>
                <span><input type="radio" name="contactChoose" id="choose_type" value='curious_visitor' onChange={handleChange}  /> curious visitor</span>
                </div>
                {
                  errors.contactChoose && touched.contactChoose ?
                  (
                    <p className="form-error">*{errors.contactChoose}</p>
                  ) : null
                }
              <div className="form-group"><textarea className="form-control" placeholder="Message" name="contactMessage" value={values.contactMessage} onChange={handleChange} onBlur={handleBlur}></textarea>
              </div>
              {
                errors.contactMessage && touched.contactMessage ?
                (
                  <p className="form-error">*{errors.contactMessage}</p>
                ) : null
              }
            <div className="form-group" style={{ textAlign: 'left'}}><button className="btn" type="submit" >send</button></div>
            </form>
            </div>
          </div> {/* <!--/ col-sm --> */}

          </div> {/* <!--/ row --> */}
        </div>
      </section> {/* <!--/ contact-wrap --> */}
    </>
  )
}
export default Contact
