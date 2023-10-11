import Link from "next/link"
import { Modal, message } from 'antd'
import { useRouter } from "next/router";
import { useState,useRef } from "react"
import { EmailOff, InformationOutline } from "mdi-material-ui"
import { Alert } from '@mui/material'
import emailjs from '@emailjs/browser';
import { sendMail } from "../../../services/sendMail"; 

const Pricing = () => {
  const form1 = useRef();
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isThankModal, setIsThankModal] = useState(false)
  const [isShown, setIsShown] = useState(false);

  const [name, setName] = useState('');

  const [surname, setSurname] = useState('');

  const [email, setEmail] = useState('');
  const [msg, setmsg] = useState('');
  const [terms, setterms] = useState(false);

  const [enqMsg, setenqMsg] = useState(false);

  const [nameErr, setnameErr] = useState('');
  const [surnameErr, setsurnameErr] = useState('');
  const [emailErr, setemailErr] = useState('');
  const [msgErr, setmsgErr] = useState('');
  const [msgLenErr, setmsgLenErr] = useState('');
  const [validEmailErr, setvalidEmailErr] = useState('');
  const [message, setErrorMsg] = useState(false);
  const [isAccept, setisAccept] = useState(false);
  const [TermMsg, setTermlMsg] = useState('');
  const handleCheckboxClick = () => {
    setisAccept((isAccept) => !isAccept);
  };
  

  const showModal = () => {
    setIsModalVisible(true)
    const element =  document.getElementsByClassName("pro");
  
  }
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const handleClose = () => {
    setIsThankModal(false);
  };

  const storePlan = (e) => {
    e.preventDefault();
    const planId = event.target.getAttribute('data-id');
    localStorage.setItem('planId', planId);
    console.log('here');

    router.push('/client/register');
  };

  const thankModal = () => {
    setIsModalVisible(false)
    setIsThankModal(true)
  }
  async function sendMailFunc (email,content,$subject){   
    let response = await sendMail(email,$subject,content);   
  
    console.log('response',response);
  }    

  const onSubmit = (event) => {
    event.preventDefault();
    let err=0;
    setenqMsg(false);
    setnameErr('');
    setsurnameErr('');
    setemailErr('');
    setmsgErr('');
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

                      if(msg.length <= 250){
                        setmsgLenErr('Minimum of 250 words Required');
                        err=err+1;
                            }
                          }

                      if(isAccept == false){
                        setTermlMsg('Please Accept This');
                        err=err+1;
              
                       }

    if(err == 0){
      // emailjs.sendForm('service_mwla9qu', 'template_4uf3noc', form1.current, 'kSYqPWVMFZAxQB2yI')
      // .then((result) => {
      //     console.log(result.text);
      //     setenqMsg(true);
      //   //  action.resetForm();
          
          
      // }, (error) => {
      //     console.log(error.text);
      // });

      const logoUrl = 'https://wabya.com/images/logo-new.png';
      const usermsg = `
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
          <p style="color: #3498db;text-align: center;font-size: 36px;">Enquire Received!</p>
      <p style="font-size: 18px; text-align: center; color: #864985;">Thank you for reaching out to us! We have received your inquiry and appreciate your interest in our Service. Our team is reviewing your message and will get back to you shortly.</p>
      
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
    sendMailFunc('abhinavkumar3256@gmail.com',usermsg,'"Confirmation: Your Enquiry has been Received"');  
  




   
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
        <p style="color: #3498db;text-align: center;font-size: 36px;">Enquire Received!</p>
    <p style="font-size: 18px; text-align: center; color: #864985;">A new inquiry has been submitted on website.</p>
    <p style="font-size: 18px; text-align: center; color: #864985;">Here are the details:</p>
    <p style="font-size: 16px; text-align: center; margin:0 0 10px;">Name: ${name} ${surname}</p>
    <p style="font-size: 16px; text-align: center; margin:0 0 10px;">Email: ${email}</p>
    <p style="font-size: 16px; text-align: center; margin:0 0 10px;">Message: ${msg}</p>
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
  sendMailFunc('abhinav@htlogics.com',adminmsg, `New Inquiry Received - ${name} ${surname}`);  



    setenqMsg(true);}
    else{
      console.log('error');
    }
  }

  return(

    <>




<div className="modal fade PROBONO-modal" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"  aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      
      <div className="modal-body">
      <div className="front-pricing">
                    <div className="pr-modal">
                      <div onClick={handleCancel}><i className="fa fa-angle-left"></i></div>
                      <div className="pro"><span>PROBONO COACHING</span></div>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><i className="fa fa-close"></i></button>
                    </div>
                    <div className="divider"></div>
                    <div className="para-modal">
                      <p>We're on a mission to make coaching accessible and affordable to everyone - that also means to those that can't afford our prices.</p>
                      <p>If that's your case, we'd ask two things before we accept your probono coaching request:</p>
                      <p className="para-space"> <img src={`${router.basePath}/images/shape-01.png`} alt="" /> attest that you are not in a financial position to afford coaching <sup> <InformationOutline style={{ width: "12px", marginLeft: "-5px", cursor:"pointer"}} onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}/>  </sup>
                      {isShown && (
                        <div className="info_box">
                          <p>This is not a legally binding engagement - we're operating on the honour system!</p>
                        </div>
                      )}

                      </p>
                      <p> <img src={`${router.basePath}/images/shape-04.png`} alt="" /> write 300 to 500 works below as to how you think you might benefit from coaching.</p>
                      {message ? (
              <Alert  className="text-left mb-4" id="sucmsg"> Thank you for showing interest. Our Wabya team will be contact you shortly.</Alert>
              ) : null}
                      <form className="prob-from" ref={form1}>
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="form-group">
                            <input type="text" name="name" value={name} id="" className="form-control" onChange={(event) => setName(event.target.value)}  placeholder="name"/>   
                           
                            {nameErr && <Alert severity='error' style={{ margin :'0 0 20px 0'}}>{nameErr}</Alert>}
                           
                            </div>
                       
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <input type="text" name="surname" value={surname} id="" className="form-control" onChange={(event) => setSurname(event.target.value)}  placeholder="surname"/>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <input type="email" name="email" value={email} id="" onChange={(event) => setEmail(event.target.value)}  className="form-control" placeholder="email"/>
                              {emailErr && <Alert severity='error' style={{ margin :'0 0 20px 0'}}>{emailErr}</Alert>}
                              {validEmailErr && <Alert severity='error' style={{ margin :'0 0 20px 0'}}>{validEmailErr}</Alert>}
                            </div>
                          </div>
                          
                          <div className="col-sm-12" style={{'marginTop':'20px'}}>
                            <div className="form-group">
                              <input type="checkbox" name="" id="" onClick={handleCheckboxClick} /> <span>I attest that I'm not currently in a financial position to afford coaching</span>
                              
                            </div>
                           
                          </div>
                          <div className="col-sm-4">
                          <div className="form-group">
                          {TermMsg && <Alert severity='error' style={{ margin :'0 0 20px 0'}}>{TermMsg}</Alert>}
                            </div>
                            </div>
                          
                          <div className="col-sm-12">
                            <div className="form-group">
                              <textarea name="message" id="" cols="30" rows="5" placeholder="your message here" className="form-control" value={msg} onChange={(event) => setmsg(event.target.value)}></textarea>
                              {msgErr && <Alert severity='error' style={{ margin :'0 0 20px 0'}}>{msgErr}</Alert>}
                              {msgLenErr && <Alert severity='error' style={{ margin :'0 0 20px 0'}}>{msgLenErr}</Alert>}
                            </div>
                          </div>
                          <div className="col-sm-12">
                            <input type="submit" value="submit" className="btn btn-submit" onClick={onSubmit}/>
                          </div>
                          <div className="col-sm-12">
                          {enqMsg ? (
              <Alert  className="text-left mb-4" id="sucmsg"> Thank you for showing interest. Our Wabya team will be contact you shortly.</Alert>
              ) : null}  </div>
                        </div>
                      </form>
                    </div>
                  </div>
      </div>
      
    </div>
  </div>
</div>
    <section className="pricing-wrap" id="pricing-option">
        <div className="container">
          <div className="row">

            <div className="col-sm-6">
            <h2><span>pricing options</span> pick your plan</h2>
            <p>We’ve got options to fit your needs - and your budget. Whichever you pick, remember that every coach we work with has graduated from a <a href="https://www.emccglobal.org/about_emcc/gcma/" target="_blank" rel="noreferrer"><u>GCMA</u></a> member’s accredited programme.</p>
            <p>Note: the most you’ll pay for a coaching session is £65. The least you’ll pay is £40.</p>
            </div>
            <div className="col-sm-6">
              <figure>
                <img src="../../images/pricing.webp"  alt="Load price..." />
              </figure>
            </div>

            <div className="volt-head">
              <div className="col-sm-12">
                <h3>Our rates are based on the coach experience level you need, so before you start your journey, choose your coach experience</h3>
              </div>
            </div>

            <div className="col-sm-12">
            {
              isModalVisible ?
              (
                <>
                  <div className="front-pricing">
                    <div className="pr-modal">
                      <div onClick={handleCancel}><i className="fa fa-angle-left"></i></div>
                      <div className="pro"><span>PROBONO COACHING</span></div>
                      <div onClick={handleCancel}><i className="fa fa-close"></i></div>
                    </div>
                    <div className="divider"></div>
                    <div className="para-modal">
                      <p>We're on a mission to make coaching accessible and affordable to everyone - that also means to those that can't afford our prices.</p>
                      <p>If that's your case, we'd ask two things before we accept your probono coaching request:</p>
                      <p className="para-space"> <img src={`${router.basePath}/images/shape-01.png`} alt="" /> attest that you are not in a financial position to afford coaching <sup> <InformationOutline style={{ width: "12px", marginLeft: "-5px", cursor:"pointer"}} onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}/>  </sup>
                      {isShown && (
                        <div className="info_box">
                          <p>This is not a legally binding engagement - we're operating on the honour system!</p>
                        </div>
                      )}

                      </p>
                      <p> <img src={`${router.basePath}/images/shape-04.png`} alt="" /> write 300 to 500 works below as to how you think you might benefit from coaching.</p>
                      {message ? (
              <Alert  className="text-left mb-4" id="sucmsg"> Thank you for showing interest. Our Wabya team will be contact you shortly.</Alert>
              ) : null}
                      <form className="prob-from" ref={form1}>
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="form-group">
                            <input type="text" name="name" value={name} id="" className="form-control" onChange={(event) => setName(event.target.value)}  placeholder="name"/>   
                           
                            {nameErr && <Alert severity='error' style={{ margin :'0 0 20px 0'}}>{nameErr}</Alert>}
                           
                            </div>
                       
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <input type="text" name="surname" value={surname} id="" className="form-control" onChange={(event) => setSurname(event.target.value)}  placeholder="surname"/>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <input type="email" name="email" value={email} id="" onChange={(event) => setEmail(event.target.value)}  className="form-control" placeholder="email"/>
                              {emailErr && <Alert severity='error' style={{ margin :'0 0 20px 0'}}>{emailErr}</Alert>}
                              {validEmailErr && <Alert severity='error' style={{ margin :'0 0 20px 0'}}>{validEmailErr}</Alert>}
                            </div>
                          </div>
                          
                          <div className="col-sm-12" style={{'marginTop':'20px'}}>
                            <div className="form-group">
                              <input type="checkbox" name="" id="" onClick={handleCheckboxClick} /> <span>I attest that I'm not currently in a financial position to afford coaching</span>
                              
                            </div>
                           
                          </div>
                          <div className="col-sm-4">
                          <div className="form-group">
                          {TermMsg && <Alert severity='error' style={{ margin :'0 0 20px 0'}}>{TermMsg}</Alert>}
                            </div>
                            </div>
                          
                          <div className="col-sm-12">
                            <div className="form-group">
                              <textarea name="message" id="" cols="30" rows="5" placeholder="your message here" className="form-control" value={msg} onChange={(event) => setmsg(event.target.value)}></textarea>
                              {msgErr && <Alert severity='error' style={{ margin :'0 0 20px 0'}}>{msgErr}</Alert>}
                              {msgLenErr && <Alert severity='error' style={{ margin :'0 0 20px 0'}}>{msgLenErr}</Alert>}
                            </div>
                          </div>
                          <div className="col-sm-12">
                            <input type="submit" value="submit" className="btn btn-submit" onClick={onSubmit}/>
                          </div>
                          <div className="col-sm-12">
                          {enqMsg ? (
              <Alert  className="text-left mb-4" id="sucmsg"> Thank you for showing interest. Our Wabya team will be contact you shortly.</Alert>
              ) : null}  </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </>
              ) : null
            }

            </div>

            <div className="col-sm-4 pw-coll">
              <div className="inner one-box">
                <h3>probono </h3>
              <p>If our services seem outside your budget, drop us a line. You might be eligible for this free-of-charge option.</p>
              <p className="btn-wrap">
<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
enquire
</button></p>
              </div>
            </div>

          <div className="col-sm-4 pw-coll">
            <div className="inner two-box">
              <h3>novice </h3>
              <ul>
                <li> <img src='../images/shape-04.png' alt=''/> This is a newly-accredited coach</li>
                  <li> <img src='../images/shape-04.png' alt=''/>  Good place to start if you’ve never been coached</li>
                  <li> <img src='../images/shape-04.png' alt=''/> Pick this if you’re on a budget.</li>

                  <br /><strong>Prices per session</strong>
                    <li> <img src='../images/shape-04.png' alt=''/> First session: <strong>FREE</strong></li>
                    <li> <img src='../images/shape-04.png' alt=''/> Pay as you go: <strong> £40</strong></li>
                    <li> <img src='../images/shape-04.png' alt=''/> Bundle: <strong> £210 for 6</strong> sessions</li>
              </ul>
            <p className="btn-wrap"><Link href="/client/register" ><a className="btn" onClick={storePlan} data-id="6ZpZd4IrzORGQfyu0IqT">select</a></Link></p>
            </div>
          </div>

          <div className="col-sm-4 pw-coll">
            <div className="inner three-box">
              <h3>experienced</h3>
              <ul>
                <li> <img src='../images/shape-04.png' alt=''/> This coach has more than 100 client sessions under their belt.</li>
                <li> <img src='../images/shape-04.png' alt=''/> Pick this if you’re familiar with coaching</li>
                <li> <img src='../images/shape-04.png' alt=''/> Pick this if budget isn’t a concern</li>
                 <br /> <strong>Prices per session</strong>
                <li> <img src='../images/shape-04.png' alt=''/> First session: <strong>FREE</strong></li>
                    <li> <img src='../images/shape-04.png' alt=''/> Pay as you go: <strong> £65</strong></li>
                    <li> <img src='../images/shape-04.png' alt=''/> Bundle: <strong> £360 for 6</strong> sessions</li>
              </ul>
            <p className="btn-wrap"><Link href="/client/register" ><a className="btn" onClick={storePlan} data-id="sH2iLHtr5PWg3gdSjIIn">select</a></Link></p>
            </div>
          </div>

            {
            isThankModal ?
              (
                <>
                <div className="thank-modal">
                  <div className="front-pricing thank-note">
                    <div className="pr-modal">
                      {/* <div onClick={handleBack}><i className="fa fa-angle-left"></i></div> */}
                      <div></div>
                      <div className="text-center"><span>thank you</span></div>
                      <div onClick={handleClose}><i className="fa fa-close"></i></div>
                    </div>
                    <div className="divider"></div>
                    <div className="para-modal">
                      <p>Thanks for submitting your application. Someone from the team will be in touch with you shortly.</p>
                    </div>
                  </div>
                </div>
                </>
              ) : null
            }

          <div className="col-sm-12"> 
            <div className="note bottom">
              <h5>Note: we won’t take payment details until you’ve completed your free discovery session
and decided to go ahead with your coaching journey. </h5>
              <Link href='/client/register' passHref><a className="btn">book my session</a></Link>
            </div>
          </div>

          </div>
        </div>
      </section>
    </>
  )
}
export default Pricing
