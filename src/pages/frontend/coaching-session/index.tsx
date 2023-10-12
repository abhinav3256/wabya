// ** React Imports
import { ReactNode, useState,useEffect } from 'react'

// ** Next Imports
import Link from 'next/link'

// import header & footer files
import Header from 'src/views/frontend/layouts/Header'
import Footer from 'src/views/frontend/layouts/Footer'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

import { database } from '../../../../firebaseConfig'
import { collection, addDoc ,where, query,startAt,limit,orderBy,getDocs,doc,updateDoc} from 'firebase/firestore'
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';

import { Modal } from "antd";
import Calendar from "react-calendar";
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { Alert } from '@mui/material'
import { sendMail } from "../../../services/sendMail";  

const CoachSessionBasic = () => {

  const [isTrue, setIsTrue] = useState(true)
  const [isThankModal, setIsThankModal] = useState(false)
  const coachRef = collection(database, 'coaches_user');
const planRef = collection(database, 'admin_plans');
const [coachData, setCoachData] = useState([]);
const [randomNo, setrandomNo] = useState(0);
const clientRef = collection(database, 'client_user');

const [planData, setplanData] = useState([]);
const [coachId, setcoachId] = useState(0);

const [client_name, set_client_name] = useState('');
const [client_email, set_client_email] = useState('');
const [client_password, set_client_password] = useState('');
const [client_repassword, set_client_repassword] = useState('');



const [clientMsg, setClientMsg] = useState('');
const [clientEmailMsg, setClientEmailMsg] = useState('');
const [TermMsg, setTermlMsg] = useState('');
const [clientPassMsg, setClientPassMsg] = useState('');
const [clientRepassMsg, setsetClientRePassMsg] = useState('');

const [meetingDateMsg, setMeetingDateMsg] = useState('');

const [existErr, setExistErr] = useState('');
const [meetingSuccessMsg, setmeetingSuccessMsg] = useState('');
const [meetingTimeMsg, setMeetingTimeMsg] = useState('');

const [isShow, setisShow] = useState(true);

const [isAccept, setisAccept] = useState(false);
const [visible, setVisible] = useState<boolean>(false);
const [visible2, setVisible2] = useState<boolean>(false);
const handleCheckboxClick = () => {
  setisAccept((isAccept) => !isAccept);
};

const [userAddedId, setUserAddedId] = useState("");

  const [Month, setMonth] = useState("");
  const [Date_, setDate_] = useState();
  const [Day_, setDay_] = useState("");

  const [date, setDate] = useState(new Date());
  const [array1, setarray1]: any[] = useState([]);
  const meetingRef = collection(database, "meeting");
  const [timeslot_load, settimeslot_load] = useState(false);
  const [meetingdate, setmeetingdate] = useState("");
  const [meetingByDate, setMeetingByDate] = useState([]);
  const [selectedTime, setselectedTime]: any = useState();
  const [meetingtime, setmeetingtime] = useState("");
  const [collectionUpdateId, setcollectionUpdateId] =
  useState("");

const [updateAction, setupdateAction] = useState(false);
const [modal_action, setmodal_action] = useState("");
  const [res_action, setres_action] = useState("");


  const [ismodalShow, setismodalShow] = useState(false);
  // fetching records
  const [fireData, setFireData] = useState([]);
 
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientCountry, setClientCountry] = useState("");
  const [clientTimeZone, setClientTimeZone] = useState("");
  const [clientLanguage, setClientLanguage] = useState("");


  const [coachesEventTimeInterval, setcoachesEventTimeInterval] = useState(30);
  const [meetingendtime, setmeetingendtime] = useState("");
  const [showNext, setshowNext] = useState(false);


  const [count, setCount] = useState(1);

  const [selectedPlan, setSelectedPlan] = useState('');
  const [showPlanErr, setshowPlanErr] = useState(false);
  const [bookingLoad, setbookingLoad] = useState(false);
  const [bookingError, setbookingError] = useState(false);


  
  const [meetingCreatedAt, setmeetingCreatedAt] = useState("");

  const [meetingName, setmeetingName] = useState("");

  const [meetingLink, setmeetingLink] = useState("");

  const [meetingPrivacy, setmeetingPrivacy] = useState("");
  const [meetingApiCreated, setmeetingApiCreated] = useState("");

  
  const [BookedId, setBookedId] = useState();
  const [next, setNext] = useState(false);
  const [planId, setplanId] = useState('');
  const [clientRegisteredId, setclientRegisteredId] = useState('');


  async function sendMailFunc (email,content,$subject){   
    let response = await sendMail(email,$subject,content);   
  
    console.log('response',response);
  }  



  function addMinutes(time, minutes) {
    var date = new Date(
      new Date("01/01/2015 " + time).getTime() + minutes * 60000
    );
    var tempTime =
      (date.getHours().toString().length == 1
        ? "0" + date.getHours()
        : date.getHours()) +
      ":" +
      (date.getMinutes().toString().length == 1
        ? "0" + date.getMinutes()
        : date.getMinutes()) +
      ":" +
      (date.getSeconds().toString().length == 1
        ? "0" + date.getSeconds()
        : date.getSeconds());
    return tempTime;
  }

  function isReserved(time) {
    // assume reserved times are stored in an array called 'reservedTimes'
    for (let i = 0; i < meetingByDate.length; i++) {
      if (time === meetingByDate[i].meetingTime) {
        // if the time slot is reserved, return true
        return true;
      }
    }
    // if the time slot is not reserved, return false
    return false;
  }
  const thankModal = () => {
    setIsThankModal(true)
  }

  const handleTimeClick = (event: any) => {
    // //console.log( event.target.getAttribute("data-key"));
    ////console.log( event.target.getAttribute("data-time"));
    setmeetingtime(event.target.getAttribute("data-time"));

    // selectedTime.splice(0, selectedTime.length);
    //selectedTime.splice(0, array1.length);
    setselectedTime(event.target.getAttribute("data-key"));
    ////console.log(meetingdate);
    //console.log(meetingtime);
    var startTime = meetingdate + " " + meetingtime;
    //console.log(startTime);

    var newTime = new Date(
      new Date(
        "1970/01/01 " + event.target.getAttribute("data-time")
      ).getTime() +
        coachesEventTimeInterval * 60000
    ).toLocaleTimeString("en-UK", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    //console.log(newTime);
    setmeetingendtime(newTime);
    setshowNext(true);
   
  };


  useEffect(() => {
    // Try to get the value from localStorage
    try {
      const storedValue = localStorage.getItem('clientRegisteredId');
      // Update state with the value if it exists
      if (storedValue) {
        setclientRegisteredId(storedValue);
      }
    } catch (error) {
      // Handle potential errors accessing localStorage here
      console.error('Error accessing localStorage:', error);
    }
  }, []);

  useEffect(() => {
   
    var starttime = "09:00:00";
   var interval = "90";
   var endtime = "17:00:00";
   var timeslots = [starttime];
   
   console.log(meetingByDate);
   
   while (starttime < endtime) {
   
     starttime = addMinutes(starttime, interval); 
   
     if(!isReserved(starttime)){
     timeslots.push(starttime);
     }
     settimeslot_load(false);
   }
   
   setarray1(timeslots);
   
   
     }, [meetingByDate]);

  const calDiv = (e) =>{
    e.preventDefault();
    //extra setIsTrue(true);
    setIsTrue(true);
   // event.preventDefault();
  //  setshowPlanErr(false);
  //  if(selectedPlan != ""){
  //   setIsTrue(true);
  //  }else{
  //   setshowPlanErr(true);
  //  }
  }

  const handlePlan = (e) =>{
    e.preventDefault();
   // event.preventDefault();
   setshowPlanErr(false);
   var new_plan_id=e.target.getAttribute("data-id");
   setSelectedPlan(new_plan_id)
  }


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
  

      useEffect(() => {


        getCoachData();
    
        getAllPlans();
    
    
      }, [])
    
      useEffect(() => {
    
    
        console.log(coachData);


        
        setrandomNo(Math.floor(Math.random() * (coachData.length - 0 + 1)) + 0);
         
       // setcoachId(coachData[randomNo].coach_id)
    
      }, [coachData])


      useEffect(() => {
    
    
        console.log(coachData);

        
        
        // if(coachData.length > 0){
         
        // setcoachId(coachData[randomNo].coach_id)
        // }
    
      }, [randomNo])

      useEffect(() => {
        if (BookedId) {
          getBookingId();
        }
      }, [BookedId]);
      useEffect(() => {
        if (userAddedId != "") {
        //  scheduleNext();
        }
      }, [userAddedId]);


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


       // formik form validates
       const onChange =  (event) => {

         console.log(event.target);

         if(event.target.name == 'client_name'){
          set_client_name(event.target.value);
         }

         if(event.target.name == 'client_email'){
          set_client_email(event.target.value);
         }

         if(event.target.name == 'client_password'){
          set_client_password(event.target.value);
         }

         if(event.target.name == 'client_repassword'){
          set_client_repassword(event.target.value);
         }


       }



        const countDiscoveySes = async () => {
    console.log('test');
        const queryDoc = query(meetingRef, where('clientId', '==', clientRegisteredId),where('isDiscoverySession', '==', 1));
    let count_data=0
        await getDocs(queryDoc).then(response => {
          console.log(response.docs.length); 
          count_data=response.docs.length;
        })
        console.log(count_data);
        return count_data;
      }



        // formik form validates
        const onSubmit = async (event) => {

          console.log('i am here');
          console.log(event.target);

          setClientMsg('');
          setClientEmailMsg('');
          setClientPassMsg('');
          setsetClientRePassMsg('');
          setMeetingDateMsg('');
          setTermlMsg('');
          setmeetingSuccessMsg('');
          setExistErr('');

          let err=0;
 
        //  if(client_name ==''){
        //   setClientMsg('Client Name is Required');
        //   err=err+1;

        //  }

        //  if(isAccept == false){
        //   setTermlMsg('Please Accept This');
        //   err=err+1;

        //  }

        //  if(client_email ==''){
        //   setClientEmailMsg('Client Email is Required');
        //   err=err+1;
        //  }

        //  if(client_password ==''){
        //   setClientPassMsg('Client Password is Required');
        //   err=err+1;
        //  }

        //  if(client_repassword ==''){
        //   setsetClientRePassMsg('Client Confirm Password is Required');
        //   err=err+1;
        //  }


         if(meetingdate =='' || meetingtime ==''){
          setMeetingDateMsg('Please Select Available Timeslot');
          err=err+1;
         }


        

         if(err == 0){


          if(await countDiscoveySes() == 0){
          scheduleNext();
          }
          else{
            setExistErr('Discovery Session Already Exist');
          }
          // if(await countData(client_email.toLowerCase()) == 0){
          
      
                // addDoc(clientRef, {
                //   client_name: client_name,
                //   client_email : client_email,
                //   client_password : client_password,
                //   assign_coach_id:coachId,
                //   plan_id:planData[0].plan_id,
                 
                // })
                //   .then((docRef) => {
                //     const docId = docRef.id;
                //       setUserAddedId(docId)
                //     console.log('done');
                //     toast.success('Client registered successfully')
                //     //router.push('/client/login')
                //   })
                //   .catch((err) => {
                //     console.error(err);
                //   })
      
          
           
                // }else{
                //   toast.error('Email Already Registerd')
                // }
           
          

         }
 
        }


        const getBookingId = async () => {


          const meetRef = collection(database, "meeting");
  
          addDoc(meetRef, {
            meetingId: BookedId,
            clientId: clientRegisteredId,
            coachId: coachId,
          //  coach_name: coachesCalName,
            meetingDate: meetingdate,
            meetingTime: meetingtime,
            meetingEndTime: ""+meetingendtime+":00",
            meetingLink: meetingLink,
            meetingApiCreated:meetingApiCreated,
            meetingName:meetingName,
            meetingPrivacy:meetingPrivacy,
            meetingCreatedAt:meetingCreatedAt,
            isDiscoverySession:1,
            status: "true",
          });
  console.log('working');

  const client_id = clientRegisteredId;
  const fieldToEdit = doc(database, 'client_user', client_id);
  updateDoc(fieldToEdit, {
    isDiscoverySessionAdded: 1
  })
  .then(() => {
    
  })
  .catch((err) => {
    //console.log(err);
  })
  
      // setNext(true);
    };
  
        /**Get Timeslot */

  const getTimeslots = async (date) => {
    settimeslot_load(true);

    var tomorrow = new Date(date);
    tomorrow.setDate(date.getDate() + 1);
    var todayDate = new Date(tomorrow).toISOString().slice(0, 10);

    console.log(todayDate);

    getMeetingByDate(todayDate);

    setmeetingdate(todayDate);

    var startTime = "";
    var endTime = "";
    const d = date;
    var selectedDay = date.getDay();
    //console.log("selected days: " + selectedDay + "");

    setDate(date);
    setMonth(date.toLocaleString("default", { month: "long" }));
    setDate_(date.getDate());
    setDay_(date.toLocaleDateString("default", { weekday: "long" }));

    var included = 1;
    setarray1([]);

   

      // //console.log(res);
      //console.log(data);






    //getBookedSchedule();
  };

 
 

  // const scheduleNext = () => {
  //   setNext(true)
  // }
  const updateMeeting = async () => {


    const meetRef = doc(collection(database, "meeting"),collectionUpdateId);

   let update= updateDoc(meetRef, {

      meetingDate: meetingdate,
      meetingTime: meetingtime,
      meetingEndTime: ""+meetingendtime+":00",

    });

    setNext(true);
};


  const scheduleNext = async () => {
    setbookingLoad(true);
    setbookingError(false);
    if(updateAction == false){
   
    try {
      const res = await fetch(
        "https://api.daily.co/v1/rooms",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization" :"Bearer a2c645d6f0369a165420d8b8b8a24894cfb18c209f1c43f8f2cb5ef35440f0a0",
          },

        }
      );
      const data = await res.json();
      console.log(data);
      setmeetingLink(data.url);
      setmeetingName(data.name);
      setmeetingApiCreated(data.api_created);
      setmeetingPrivacy(data.privacy);

      setmeetingCreatedAt(data.created_at);
      setBookedId(data.id);
      if (res.status == 200) {
      

        setmeetingLink(data.url);
        setNext(true);

        setBookedId(data.id);

     
      } else {
        setbookingLoad(false);
        setbookingError(true);
      }

      //console.log(data);

     // setmeetingSuccessMsg('Discovery Session Added');


    setIsThankModal(true);


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
          <p style="color: #3498db;text-align: center;font-size: 36px;">Meeting Scheduled!</p>
      <p style="font-size: 18px; text-align: center; color: #864985;">Your meeting  has been Schedule. We are looking forward to seeing you there!</p>
      <p style="font-size: 16px; text-align: center; margin:0 0 10px;color: #242424;">Date: ${meetingdate}</p>
      <p style="font-size: 16px; text-align: center; margin:0 0 20px;color: #242424;">Time: ${meetingtime} - ${meetingendtime}</p>
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
    sendMailFunc('abhinavkumar3256@gmail.com',msg,'Meeting Scheduled');














    } catch (err) {
      setbookingLoad(false);
      setbookingError(true);
      //console.log(err);
    }

  }
  else{
    updateMeeting();

  }

    // setNext(true);
  };

  const scheduleNewSes = (e) => {
    e.preventDefault();
    setcollectionUpdateId("");
    setmodal_action('SCHEDULE A SESSION');
    setres_action("scheduled");
    setarray1([]);
    settimeslot_load(false);
    setupdateAction(false);
    showModal();
   // coachSession();
  };
    
  // get all meeting data
  const getMeetingByDate = async (todayDate: string) => {
    

    const queryDoc = query(meetingRef, where("coachId", "==", coachId),where("meetingDate", "==", todayDate));

    await getDocs(queryDoc).then((response) => {
      setMeetingByDate(
        response.docs.map((data) => {
          return { ...data.data(), meeting_id: data.id };
        })
      );
    });
  };

  const timeslotDone = () => {
    setismodalShow(false);
  };
  const showModalOk = () => {
    setismodalShow(false);
  };
  const showModalCancel = () => {
    setismodalShow(false);
  };

  const showModal = () => {
    setismodalShow(true);
  };

  return (
    <>

    <section className="journey-wrap">
      <div className="container">
        <div className="row mrb-70">
        <div className="col-sm-6 left">
          <h2><span>book a free coaching session</span>start your journey</h2>
        <p>Before you can sign up for your free session, please select the type of <br/>coach you'd like to work with when you'd like your session to be held</p>
        </div>

        <div className="col-sm-6 right">
          <figure><img src="../../images/shape-06.png" alt=""/></figure>
        </div>
      </div> {/* <!--/ row --> */}

      {
        isTrue ?
        (
          <>
            <div className="row mrb-60">
              <div className="col-sm-12 session-form">
                <form>
                <div className="col-sm-12 date-time mrb-60">
                  <h3>select your date & time</h3>
                <div className="time-btn"><button className="btn" onClick={scheduleNewSes}>select an available time</button></div>
                </div>
{/* scheduleNewSes */}

<div className="hidden">
                <div className="col-sm-12 date-time mrb-30">
                  <h3>fill in your details</h3>
                </div>

                <div className="col-sm-6 form-group"><input className="form-control" name="client_name" value={client_name}
              onChange={onChange} placeholder="name"/><p className='bookErr'>{clientMsg}</p></div>

                <div className="col-sm-6 form-group"><input className="form-control"  placeholder="surname"/></div>

                <div className="col-sm-6 form-group"><input className="form-control" name="client_email" value={client_email}
              onChange={onChange} placeholder="email"/><p className='bookErr'>{clientEmailMsg}</p></div>

                <div className="col-sm-6 form-grdoup"></div>

                <div className="col-sm-6 form-group pass-eye-main"><input className="form-control"  type={visible ? 'text' : 'password'} name="client_password" value={client_password}
              onChange={onChange} placeholder="account password *"/><span className="pass-eye" onClick={()=>setVisible(!visible)}>
              {
                visible ?
                <EyeOutline fontSize='small' /> :
                <EyeOffOutline fontSize='small' />
              }
              </span> <p className='bookErr'>{clientPassMsg}</p></div>



                <div className="col-sm-6 form-group form-p"><small><strong>* required for login for your free session. <br/>Password must be at least 8 characters and include uppercase, a number and special character</strong></small></div>

                <div className="col-sm-6 form-group pass-eye-main"><input className="form-control" type={visible2 ? 'text' : 'password'} name="client_repassword" value={client_repassword}
              onChange={onChange} placeholder="repeat account password"/>
              
              <span className="pass-eye" onClick={()=>setVisible2(!visible2)}>
              {
                visible2 ?
                <EyeOutline fontSize='small' /> :
                <EyeOffOutline fontSize='small' />
              }
              </span>
              <p className='bookErr'>{clientRepassMsg}</p></div>

                <div className="col-sm-6 form-group">
                  <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="accept" onClick={handleCheckboxClick}/>
                  <label className="custom-control-label ml-2">I accept the <a href="#">terms of service</a></label>
                  <p className='bookErr'>{TermMsg}</p>
                </div>
                </div>
                </div>
              </form>
              </div> {/* <!--/ session-form --> */}
	          </div>
            {meetingDateMsg &&  <Alert severity='error' style={{ margin :'0 0 20px 0',width:'70%'}}>{meetingDateMsg}</Alert>}        
            {meetingSuccessMsg &&  <Alert severity='success' style={{ margin :'0 0 20px 0',width:'70%'}}>{meetingSuccessMsg}</Alert>}        
            {existErr &&  <Alert severity='error' style={{ margin :'0 0 20px 0',width:'70%'}}>{existErr}</Alert>}                  
            <div className="row">
              <div className="col-sm-12 bottom">
              {/* <p className='bookErr'>{meetingDateMsg}</p> */}

              
                <p><button className="btn" onClick={onSubmit}>book my session</button></p>
              </div> {/* <!--/ col-sm --> */}
            </div> {/* <!--/ row --> */}

            {
              isThankModal ?
                (
                  <>
                  <div className="thank-modal">
                    <div className="front-pricing thank-note">
                      <div className="pr-modal">
                        <div><i className="fa fa-angle-left"></i></div>
                        <div><span>thank you</span></div>
                      </div>
                      <div className="divider"></div>
                      <div className="para-modal">
                        <p>Well done on taking the first step in your journey! <br/> You'll receive a confirmation email - please check it hasn't landed in your spam</p>
                      </div>
                    </div>
                  </div>
                  </>
                ) : null
            }
          </>
        ) :
        (
          <>
            <div className="row mrb-60">
              <div className="col-sm-12 title-text text-center">
                <h3>Our rates are based on the coach experience level you need, so before you start your journey, choose your coach experience</h3>
              <p>Note: we won’t take payment details until you’ve completed your free discovery session <br/>and decided to go ahead with your coaching journey</p>
              </div>
            </div>

            <div className="row justify-content-md-center">
              <div className="col-sm-4 pw-coll">
                <div className="inner">
                  <h4>novice</h4>
                <ul>
                  <li>This is a newly-accredited coach</li>
                <li>Good place to start if you’ve never been coached</li>
                <li>Pick this if you’re on a budget.</li>
                </ul>

                <ul>
                <h5>Prices per session</h5>
                <li>First session: <span>FREE</span></li>
                <li>Pay as you go: <span>£40</span></li>
                <li>Bundle: <span>£210 for 6</span> sessions</li>
                </ul>
                <p className="btn-wrap"><a href="/client/register" onClick={handlePlan} data-id="49eSJk5K9s4TeQZkKoJf" className="btn">{selectedPlan == '49eSJk5K9s4TeQZkKoJf' ? 'Selected' : 'Select'}</a></p>
                </div>
              </div> {/* <!--/ col-sm --> */}

              <div className="col-sm-4 pw-coll">
                <div className="inner">
                  <h4>experienced</h4>
                <ul>
                  <li>This coach has more than 100 client sessions under their belt.</li>
                <li>Pick this if you’re familiar with coaching</li>
                <li>Pick this if budget isn’t a concern</li>
                </ul>

                <ul>
                <h5>Prices per session</h5>
                <li>First session: <span>FREE</span></li>
                <li>Pay as you go: <span>£40</span></li>
                <li>Bundle: <span>£210 for 6</span> sessions</li>
                </ul>
                <p className="btn-wrap"><a href="/client/register" onClick={handlePlan} data-id="sH2iLHtr5PWg3gdSjIIn" className="btn">{selectedPlan == 'sH2iLHtr5PWg3gdSjIIn' ? 'Selected' : 'Select'}</a></p>
                </div>
              </div> {/* <!--/ col-sm --> */}
            </div> {/* <!--/ row --> */}
 
            <div className="row">
              <div className="col-sm-12 bottom">
                {showPlanErr ? <p style={{'color':'red'}}>Please Select Plan</p> : null }
                {/* <p><button onClick={calDiv} className="btn">continue</button></p> */}
                <p><Link  href="#" onClick={calDiv} ><a className="btn" onClick={calDiv}>continue</a></Link></p>

              </div> {/* <!--/ col-sm --> */}
            </div> {/* <!--/ row --> */}
          </>
        )
      }



<>
 <Modal
          centered
          className="session-history-modal"
          visible={ismodalShow}
          onOk={showModalOk}
          onCancel={showModalCancel}
          width={1100}
        >
                <div className="history-modal">
                  <h4>Discovery Session</h4>
                </div>

                <div className="reschedule-zone">
                  <div className="row">
                    <div className="col-sm-2">
                      <div className="coach-fig">
                        <figure>
                          <img
                            src="../../images/clients-01.png"
                            alt="Coach Name"
                          />
                        </figure>
                        {/* <p>{coachesCalName}</p> */}
                        <p>
                          <strong>next session</strong>
                        </p>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="resc-cal">
                        <h5>select a date &amp; time</h5>
                        <Calendar onChange={getTimeslots} value={date} />
                        <h5>time zone</h5>
                        {/* <p>{coachesCalTimezone}</p> */}
                      </div>
                    </div>
                    {isShow ? (
                      <div className="col-sm-4">
                        <div className="cal-time">
                          <p>
                            {Day_} {Month} {Date_}
                          </p>

                          {array1.map((timeSlot, index) => {
                            return selectedTime == index ? (
                              <button
                                className="btn btn-time"
                                data-key={index}
                                key={index} 
                                data-time={timeSlot}
                                style={{ backgroundColor: "#6dc1a4" }}
                                onClick={handleTimeClick}
                              >
                                {timeSlot}
                              </button>
                            ) : (
                              <button
                                className="btn btn-time"
                                data-time={timeSlot}
                                data-key={index}
                                key={index}
                                onClick={handleTimeClick}
                              >
                                {timeSlot}
                              </button>
                            );
                          })}

                          {timeslot_load ? (
                            <div className="btn btn-time"> Loading...</div>
                          ) : null}
                        </div>
                        <button className="btn btn-next" onClick={timeslotDone}>
                          next <i className="fa fa-arrow-right"></i>
                        </button>
                        {/* scheduleNext */}
                        {bookingLoad ? <p>Loading, Please Wait...</p> : null}

                        {bookingError ? <p>Something Went Wrong...</p> : null}
                      </div>
                    ) : (
                      <div className="col-sm-4">
                        <div className="cal-time">
                          <p>
                            {Day_} {Month} {Date_}
                          </p>
                          {timeslot_load ? (
                            <div className="btn btn-time">
                              Timeslot Loading...
                            </div>
                          ) : null}
                          <p>No Timeslot Available</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                </Modal>
              </> 


      </div>
    </section> {/* <!--/ book a free coaching session  --> */}

    </>
  )
}

CoachSessionBasic.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default CoachSessionBasic
