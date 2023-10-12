// ** Files Imports
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { app, database,storage } from "../../../../firebaseConfig";
import emailjs from '@emailjs/browser';
import { Alert } from 'antd'
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { countries } from 'countries-list';
import { Select, MenuItem } from '@mui/material';
import { sendMail } from "../../../services/sendMail";  


import allCountries from '../../../@core/utils/countries'
import country_data from '../../../@core/utils/all-countries'
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  where,
  query,
} from "firebase/firestore";
import { Modal } from "antd";

// import Cal, { getCalApi } from "@calcom/embed-react";
import Calendar from "react-calendar";
import { AnyAaaaRecord } from "dns";
import { Video } from "mdi-material-ui";
import { Clock } from "mdi-material-ui";
import { ArrowRightCircleOutline } from "mdi-material-ui";

const Dashboard = () => {
  const router = useRouter();
  const form = useRef();
  const formMobile = useRef();
  const form2 = useRef();
  const databaseRef = collection(database, "client_user");
  const coachRef = collection(database, "coaches_user");
  const planRef = collection(database, "admin_plans");
  const meetingRef = collection(database, "meeting");
  const helpRef = collection(database, "help");
  const msgRef = collection(database, "message");
  const requestRef = collection(database, "newPlanRequest");
  const billingRef = collection(database, "billingInfo");
  const billingRef3 = collection(database, "billingInfo");


  const [SearchVal, setSearchVal] = useState('');
  const [requestPlanId, setrequestPlanId] = useState('');
  const [helpText, sethelpText] = useState('');
  const [ShowHelpErr, setShowHelpErr] = useState(false);
  const [ShowHelpSuccess, setShowHelpSuccess] = useState(false);

  const [coachText, setcoachText] = useState('');
  const [ShowCoachErr, setShowCoachErr] = useState(false);
  const [ShowEmailSuccess, setShowEmailSuccess] = useState(false);

  const [ShowBillingSuccess, setShowBillingSuccess] = useState(false);


  const [ShowBankErr, setShowBankErr] = useState(false);
  const [ShowAccountErr, setShowAccountErr] = useState(false);
  const [ShowAccountHolderErr, setShowAccountHolderErr] = useState(false);
  const [ShowSwiftErr, setShowSwiftErr] = useState(false);
  const [isUnavailable, setIsUnavailable] = useState(false);
  const [selectOption, setSelectOption] = useState(true);
  const [emailOption, setemailOption] = useState(false);
  const [callOption, setcallOption] = useState(false);

  const [CoachUnavailability, setCoachUnavailability] = useState([]);
  const [unavailableId, setUnavailableId] = useState(null);
  const [UnavailableStartSlot, setUnavailableStartSlot] = useState(null);
  const [UnavailableEndSlot, setUnavailableEndSlot] = useState(null);

  const showEmailForm = () => {
    setSelectOption(false);
    setemailOption(true);
    setcallOption(false);
  };


  const makePhoneCall = () => {
    const phoneNumber = mycoach[0].coach_phone; // Replace with the phone number you want to call
    const dialCode = 'tel:'; // This is the dial code used to indicate that a phone call should be made
  
    // Construct the full phone number URL by concatenating the dial code and phone number
    const phoneUrl = dialCode + phoneNumber;
  
    // Use the window.open() method to open the phone number URL in a new window, which should trigger the phone app on the user's device
    window.open(phoneUrl);
  };
  /// For Testing
  //const [apiUrl, setapiUrl] = useState("https://api.cal.dev/");

  ///For Production

  const [apiUrl, setapiUrl]=useState('https://api.cal.com/');

  const [client, setClient] = useState(null);
  const [editDetail, setEditDetail] = useState(false);

  const editD = async () => {
    setEditDetail(true);

    const userIds = sessionStorage.getItem('userId');
    const userCollection = collection(database, 'client_user');
    const userDocRef = doc(userCollection, userIds);
    const userDoc = await getDoc(userDocRef);
    //console.log(userDoc);

    setClientEmail(userDoc.data().client_email),
    setClientPhone(userDoc.data().client_phone),
    setClientCountry(userDoc.data().client_country),
    setClientLanguage(userDoc.data().client_language),
    setClientTimeZone(userDoc.data().client_zone)
  };


 


  const saveD = async () => {
    setEditDetail(false);
    setdetailSaved(false);
    setsavedMsg("");
    const plan_id = sessionStorage.getItem('userId');
    const fieldToEdit = doc(database, 'client_user', plan_id);

    updateDoc(fieldToEdit, {
      client_email: clientEmail,
      client_phone : clientPhone,
      client_country : clientCountry,
      client_zone : clientTimeZone,
      client_language : clientLanguage
    })
    .then(() => {
      toast.success('Client details updated successfully!')
      setdetailSaved(true);
      setsavedMsg("Detail Saved!")
      setClientEmail('')
      setClientPhone('')
      setClientCountry('')
      setClientLanguage('')
      setClientTimeZone('')
      fetchClient();
    })
    .catch((err) => {
      //console.log(err);
    })

  };



  

  const openCalendar = (event) => {
    ////console.log(event.target.getAttribute("data-interval"));
    if (
      event.target.getAttribute("data-interval") != null ||
      event.target.getAttribute("data-interval") != ""
    ) {
      setcoachesEventTimeInterval(event.target.getAttribute("data-interval"));
      setcoachesCalEventSelected(
        event.target.getAttribute("data-coach_event_id")
      );
    } else {
      setcoachesEventTimeInterval(30);
    }

    setCoach(false);
    setEventChoose(false);
    setReschedule(true);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isContactCoach, setisContactCoach] = useState(false);
  const [isUploadNotes, setisUploadNotes] = useState(false);
  const [isSeeNotes, setisSeeNotes] = useState(false);
  const [isUpdateBilling, setisUpdateBilling] = useState(false);


  const [isVideoCallVisible, setIsVideoCallVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [reschedule, setReschedule] = useState(false);
  const [selectedTime, setselectedTime]: any = useState();
  const [next, setNext] = useState(false);

  const [eventChoose, setEventChoose] = useState(false);
  const [videoCall, setVideoCall] = useState(false);
  const [coach, setCoach] = useState(false);

  const [mycoach, setMyCoach] = useState(null);
  const [myplan, setMyPlan] = useState(null);
  const [coachesCalApiKey, setcoachesCalApiKey] = useState("");
  const [coachesFirebaseId, setcoachesFirebaseId] = useState("");
  
  const [coachesFirebaseName, setcoachesFirebaseName] = useState("");
  const [coachesEvents, setcoachesEvents] = useState([]);
  const [coachesEventTimeInterval, setcoachesEventTimeInterval] = useState(30);
  const [coachesCalUsername, setcoachesCalUsername] = useState("");
  const [coachesCalName, setcoachesCalName] = useState("");
  const [coachesCalEmail, setcoachesCalEmail] = useState("");
  const [coachesCalTimezone, setcoachesCalTimezone] = useState("");
  const [coachesCalEventSelected, setcoachesCalEventSelected] = useState();

  const [modal_action, setmodal_action] = useState("");
  const [res_action, setres_action] = useState("");


  //const [coachesCalUsername, setcoachesCalUsername] = useState('abhinav-kumar-r6xoe0');
  const [coachesCalDefaultScheduleId, setcoachesCalDefaultScheduleId] =
    useState();

  const [coachesCalUserId, setcoachesCalUserId] = useState();

  

    const [collectionUpdateId, setcollectionUpdateId] =
    useState("");

  const [updateAction, setupdateAction] = useState(false);
  const [clientCalName, setclientCalName] = useState("");
  const [clientCalEmail, setclientCalEmail] = useState("");

  const [clientFirebaseName, setclientFirebaseName] = useState("");
  const [clientFirebaseFirstName, setclientFirebaseFirstName] = useState("");
  const [clientFirebaseEmail, setclientFirebaseEmail] = useState("");
  const [clientPlanId, setclientPlanId] = useState("");

  const [clientTotalSession, setclientTotalSession] = useState("");

  const [clientCompletedSession, setclientCompletedSession] = useState("");
  const [clientRemainingSession, setclientRemainingSession] = useState("");
  const [clientFirebaseId, setclientFirebaseId] = useState("");

  const [BookedId, setBookedId] = useState();
  const [mySession, setmysSession] = useState([]);


  const [percent, setPercent] = useState(0);
  const [filecount, setfilecount] = useState(0);
  
  const [percentage, setpercentage] = useState("%");
  const [fileUrl, setfileUrl] = useState("");
  const [fileName, setfileName] = useState("");
  const [fileType, setfileType] = useState("");
  const resourceRef = collection(database, 'resources');

  const [file, setFile] = useState(null);
  const [showpercent, setshowpercent] = useState(false);
  const [showfile, setshowfile] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [detailSaved, setdetailSaved] = useState(false);
  const [savedMsg, setsavedMsg] = useState("");

  const [viewProfile, setviewProfile] = useState(false);
  const today = new Date();



  const [bank, setBank] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  

  const scheduleNewSes = () => {
    setcollectionUpdateId("");
    setmodal_action('SCHEDULE A SESSION');
    setres_action("scheduled");
    setarray1([]);
    settimeslot_load(false);
    setupdateAction(false);
    coachSession();
  };

  


  const scheduleReSes = (event) => {
    setcollectionUpdateId(event.target.getAttribute('data-id'));
    setmodal_action('RESCHEDULE A SESSION');
    setres_action("rescheduled");
    setarray1([]);
    settimeslot_load(false);
    setupdateAction(true);
    coachSession();
  };

  const coachSession = () => {
    //setcoachesCalUsername("abhinavkumar0325");

    //setcoachesCalApiKey("cal_test_023256ac85011cded16d8d4f8f137d99");

    //setcoachesCalDefaultScheduleId(133);
    setCoach(false);
    setEventChoose(false);
    setReschedule(true);
  };
  const coachOk = () => {
    setCoach(false);
  };

  const coachCancel = () => {
    setCoach(false);
  };

  const videoSession = () => {
    setVideoCall(true);
  };
  const videoOk = () => {
    setVideoCall(false);
  };

  const videoCancel = () => {
    setVideoCall(false);
  };

  // Function to toggle the value of viewProfile
function toggleProfile() {
  setviewProfile(!viewProfile);

  // You can perform other actions based on the new value of viewProfile here
}

  // const scheduleNext = () => {
  //   setNext(true)
  // }

  async function sendMailFunc (email,content,$subject){   
    let response = await sendMail(email,$subject,content);   
  
    console.log('response',response);
  }    	


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
      //console.log(data);
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
            <p style="color: #3498db;text-align: center;font-size: 36px;">Meeting ${res_action}!</p>
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
      



     
      } else {
        setbookingLoad(false);
        setbookingError(true);
      }

      ////console.log(data);
    } catch (err) {
      setbookingLoad(false);
      setbookingError(true);
      ////console.log(err);
    }

  }
  else{
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
        <p style="color: #3498db;text-align: center;font-size: 36px;">Meeting ${res_action}!</p>
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
  sendMailFunc('abhinavkumar3256@gmail.com',msg,'Meeting Rescheduled');   
    updateMeeting();
    

  }

    // setNext(true);
  };

  const getBookingId = async () => {


        const meetRef = collection(database, "meeting");

        addDoc(meetRef, {
          meetingId: BookedId,
          clientId: sessionStorage.getItem("userId"),
          coachId: coachesFirebaseId,
          coach_name: coachesCalName,
          meetingDate: meetingdate,
          meetingTime: meetingtime,
          meetingEndTime: ""+meetingendtime+":00",
          meetingLink: meetingLink,
          meetingApiCreated:meetingApiCreated,
          meetingName:meetingName,
          meetingPrivacy:meetingPrivacy,
          meetingCreatedAt:meetingCreatedAt,
          status: "true",
          meetingstatus: "wait",
        });


    // setNext(true);
  };
 
  // const getTimezone = () => {
  //   //console.log(selectedCountry);
  //   const countryData = countries[selectedCountry];

  //   //console.log(countryData);

  //   if (countryData) {
  //     const { languages } = countryData;
  //     return timezone;
  //   }

  //   return 'Timezone not found';
  // };

  const updateMeeting = async () => {


    const meetRef = doc(collection(database, "meeting"),collectionUpdateId);

   let update= updateDoc(meetRef, {

      meetingDate: meetingdate,
      meetingTime: meetingtime,
      meetingEndTime: ""+meetingendtime+":00",

    });

    setNext(true);
};



 // add new record
 const sendHelpMsg = () => {
  setShowHelpErr(false);
  setShowHelpSuccess(false);
  if(helpText == ""){
setShowHelpErr(true);
  }else{
    setShowHelpErr(false);
  addDoc(msgRef, {
    message: helpText,
    status:1,
   senderId:sessionStorage.getItem("userId"),
  })
    .then(() => {
      toast.success('Data sent successfully')
      setShowHelpSuccess("")
      getData()
      setShowHelpSuccess(true);
    
      if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      emailjs.sendForm('service_48nilue', 'template_3uazkzk', form.current, 'bHrOxc3becdFqRykK') .then((result) => {
        //console.log(result.text);
        sethelpText('')
        
    }, (error) => {
        //console.log(error.text);
    });
      }else{
        emailjs.sendForm('service_48nilue', 'template_3uazkzk', formMobile.current, 'bHrOxc3becdFqRykK') .then((result) => {
          //console.log(result.text);
          sethelpText('')
      }, (error) => {
          //console.log(error.text);
      });
      }
     
     
    })
    .catch((err) => {
      console.error(err);
    })
  }
}


const sendCoachMsg = () => {
  setShowCoachErr(false);
  setShowEmailSuccess(false);
  if(coachText == ""){
setShowCoachErr(true);
  }else{
    
    

      emailjs.sendForm('service_48nilue', 'template_l4z15n1', form2.current, 'bHrOxc3becdFqRykK')
      .then((result) => {
          //console.log(result.text);
          setcoachText('')
          // handleContactCancel();
          setShowEmailSuccess(true)
      }, (error) => {
          //console.log(error.text);
      });
     
   
  }
}
function test(){
  //console.log('abc');
}

const buyMore = (event) => {
  // Your logic for buyMore function

  // Redirect to /client/checkout
  console.log(event.target);
  localStorage.setItem('price', event.target.getAttribute("data-price"));
  localStorage.setItem('buy_plan_id', event.target.getAttribute("data-plan-id"));
  router.push('/client/checkout');
};

const addNewRequest = async (event :  any) =>{
event.preventDefault();
const addButton = event.target;
  addButton.setAttribute("disabled", true);
  addButton.textContent = "Loading...";
  if(await countMyRequest() == 0){
    var new_plan_id=event.target.getAttribute("data-plan-id");
 
    addDoc(requestRef, {
      plan_id: clientPlanId,
      new_plan_id:new_plan_id,
     client_id:sessionStorage.getItem("userId"),
     status:1,
    })
      .then(() => {
        getNewRequest();
        toast.success('Data Updated successfully')
       // Re-enable the button and remove loading state
    
      })
      .catch((err) => {
        console.error(err);
         // Re-enable the button and remove loading state
        
      })


  }
  else{
    var new_plan_id=event.target.getAttribute("data-plan-id");
    const client_id=sessionStorage.getItem("userId");
   // const fieldToEdit = doc(collection(database, "newPlanRequest"),client_id);
    //const fieldToEdit = query(requestRef, where('client_id', '==', client_id));

    const collectionRef = collection(database, "newPlanRequest");
    const q = query(collectionRef, where("client_id", "==", client_id),where("status", "==", 1));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doce) => {
      const fieldToEdit = doc(database, "newPlanRequest", doce.id);
      updateDoc(fieldToEdit, {
        new_plan_id: new_plan_id,
        status:1,
        
        // ...
      });
    });
    addButton.removeAttribute("disabled");
    addButton.textContent = "Requested"; 
    getNewRequest();
  }
  
  }


//update billing
  const updateBilling = async (event :  any) =>{
    let err=0;
    setShowBankErr(false);
    setShowAccountHolderErr(false);
    setShowAccountErr(false);
    setShowSwiftErr(false);
    setShowBillingSuccess(false);
    if(bank == ""){
      setShowBankErr(true);
      err=err+1;
        }

   if(accountHolder == ""){
          setShowAccountHolderErr(true);
          err=err+1;
            }     
 if(accountNo== ""){
              setShowAccountErr(true);
              err=err+1;
                }
 if(swiftCode== ""){
                  setShowSwiftErr(true);
                  err=err+1;
                    }
if(err == 0){
    if(await countBillingInfo() == 0){
      
      addDoc(billingRef, {
        user_id: sessionStorage.getItem("userId"),
        bankName:bank,
       accountHolder:accountHolder,
       accountNo:accountNo,
       swiftCode:swiftCode,
      })
        .then(() => {
          
          toast.success('Data Updated successfully')
        
          setShowBillingSuccess(true);
        })
        .catch((err) => {
          console.error(err);
        })
    }
    else{
     // var new_plan_id=event.target.getAttribute("data-plan-id");
      const client_id=sessionStorage.getItem("userId");
     // const fieldToEdit = doc(collection(database, "newPlanRequest"),client_id);
      //const fieldToEdit = query(requestRef, where('client_id', '==', client_id));
  
      const collectionRef = collection(database, "billingInfo");
      const q = query(collectionRef, where("user_id", "==", client_id));
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach((doce) => {
        const fieldToEdit = doc(database, "billingInfo", doce.id);
        updateDoc(fieldToEdit, {
          bankName:bank,
          accountHolder:accountHolder,
          accountNo:accountNo,
          swiftCode:swiftCode,
          
          // ...
        });
        setShowBillingSuccess(true);
      });
  
    
    }
  }
    }




  // coach data fetch
  const countMyRequest = async () => {
    //console.log('test');
    //console.log(sessionStorage.getItem("userId"));
    const collectionRef = collection(database, "newPlanRequest");
    const queryDoc = query(collectionRef, where("client_id", "==", sessionStorage.getItem("userId")),where("status", "==", 1));
  
    const snapshot = await getDocs(queryDoc);
    const count_data = snapshot.size;
  
    //console.log(`Number of documents in collection: ${count_data}`);
        //console.log(count_data);
        return count_data;
      }


       // count billig info 
  const countBillingInfo = async () => {
    //console.log('test');
    //console.log(sessionStorage.getItem("userId"));
    const collectionRef = collection(database, "billingInfo");
    const queryDoc = query(collectionRef, where("user_id", "==", sessionStorage.getItem("userId")));
  
    const snapshot = await getDocs(queryDoc);
    const count_data = snapshot.size;
  
    //console.log(`Number of documents in collection: ${count_data}`);
        //console.log(count_data);
        return count_data;
      }


// const getSessionHistory = async () => {

//   const session=[];
//   try {
//     const res = await fetch(
//       "https://api.daily.co/v1/meetings",
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization" :"Bearer a2c645d6f0369a165420d8b8b8a24894cfb18c209f1c43f8f2cb5ef35440f0a0",
//         },

//       }
//     );
//     const data = await res.json();
//     //console.log(data);



//     if (res.status == 200) {

// //console.log('meeting');
// ////console.log(data);
// ////console.log(meeting);

// for (let index = 0; index < data.data.length; index++) {


// ////console.log(data.data[index].room);

//   for (let index2 = 0; index2 < meeting.length; index2++) {

//     ////console.log(meeting[index].meetingName);

//     if(data.data[index].room == meeting[index2].meetingName){
//       // //console.log(index);
//       // //console.log(index2);
//       // //console.log(data.data[index].room);
//       // //console.log(data.data[index].start_time);
//       // //console.log(data.data[index].duration);
//       let todate=new Date(data.data[index].start_time * 1000).getDate();
//     let tomonth=new Date(data.data[index].start_time * 1000).getMonth()+1;
//     let toyear=new Date(data.data[index].start_time * 1000).getFullYear();
//     let original_date=tomonth+'/'+todate+'/'+toyear; //console.log(original_date);
//     let start_time=new Date(data.data[index].start_time * 1000).toLocaleTimeString();
//       session.push({date:original_date,start_time:start_time,duration:data.data[index].duration,coach_name:meeting[index2].coach_name})
//     }

//   }

// }

// setmysSession(session);

//     } else {

//     }

//     ////console.log(data);
//   } catch (err) {

//   }



//   // setNext(true);
// };








const getMeetingSession = async () => {

  //console.log('testtt');
  
  const clientId = sessionStorage.getItem('userId');
  const meetingSessionCollection = collection(database, 'meetingSession');
  const queryDoc = query(
    meetingSessionCollection,
    where('client_id', '==', clientId),
    where('client_leave', '==', 'no')
  );

  try {
    const response = await getDocs(queryDoc);
    const sessionsData = response.docs.map((data) => {
      //console.log(data.data());
      return { ...data.data(), meet_id: data.id };
    });
    setMeetingSession(sessionsData);
  } catch (error) {
    console.error(error);
  }
 
 
 }

  const bookSession = () => {
    setOpen(true);
  };
  const bookOk = () => {
    setOpen(false);
  };
  const bookCancel = () => {
    setOpen(false);
  };

  const rescheduleSession = () => {
    setReschedule(true);
  };
  const rescheduleOk = () => {
    setReschedule(false);
  };
  const rescheduleCancel = () => {
    setReschedule(false);
    setNext(false);
    setbookingLoad(false);
    setbookingError(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showContactCoach = (event) => {
    //console.log('testtttt');
    event.preventDefault();
    setisContactCoach(true);
  };

  const showUploadNotes = (event) => {
    //console.log('testtttt');
    event.preventDefault();
    setisUploadNotes(true);
  };


  const showSeeNotes = (event) => {
    //console.log('testtttt');
    event.preventDefault();
    setisSeeNotes(true);
  };


  const showUpdateBilling = (event) => {
    //console.log('testtttt');
    event.preventDefault();
    setisUpdateBilling(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel2 = () => {
    setIsModalVisible(false);
  };


  const handleContactOk = () => {
    setisContactCoach(false);
  };
  const handleContactCancel = () => {
    setisContactCoach(false);
  };

  const handleUploadOk = () => {
    setisUploadNotes(false);
  };

  const handleSeeNotesOk = () => {
    setisSeeNotes(false);
  };

  const handleUploadCancel = () => {
    setisUploadNotes(false);
  };

  const handleSeeNotesCancel = () => {
    setisSeeNotes(false);
  };


  const handleUpdateBilling = () => {
    setisUpdateBilling(false);
  };

  const handleUpdateBillingCancel = () => {
    setisUpdateBilling(false);
  };
 

  const handleCancel = () => {
    setIsVideoCallVisible(false);
  };

  const showVideoCallModal = () => {
    setIsVideoCallVisible(true);
  };

  const showVideoCallModalOk = () => {
    setIsVideoCallVisible(false);
  };

  const showVideoCallModalCancel = () => {
    setIsVideoCallVisible(false);
  };

  const [userId, setUserId] = useState();
  const [meeting, setMeeting] = useState([]);
  const [meetindex, setMeetindex] = useState(null);
  const [timeRemain, setTimeRemain] = useState(null);

  const [meetingSession, setMeetingSession] = useState([]);
  const [help, setHelp] = useState(null);

  const [meetingByDate, setMeetingByDate] = useState([]);

  const [allFiles, setAllFiles] = useState([]);
  const [allNewRequest, setallNewRequest] = useState([]);

  useEffect(() => {
    let userId = sessionStorage.getItem("userId");
    setUserId(userId);

    if (userId) {
      const fetchClient = async () => {
        const clientRef = doc(collection(database, "client_user"), userId);
        const clientDoc = await getDoc(clientRef);
        if (clientDoc.exists()) {
          setClient(clientDoc.data());

          // ////console.log('here');
          ////console.log(clientDoc.data);
        } else {
          ////console.log("No client found");
        }
      };
      fetchClient();
      getMeetingSession();
    }

    if (!userId) {
      router.push("/client/login");
    }

    // const token = sessionStorage.getItem('Token')
    getData();
    getCoachData();
    getMeeting();
    getHelpText();


   
    if (coachesCalApiKey) {
    
    }
  }, [coachesCalApiKey, userId]);
  const fetchClient = async () => {
    let userId = sessionStorage.getItem("userId");
    const clientRef = doc(collection(database, "client_user"), userId);
    const clientDoc = await getDoc(clientRef);
    if (clientDoc.exists()) {
      setClient(clientDoc.data());

      // ////console.log('here');
      ////console.log(clientDoc.data);
    } else {
      ////console.log("No client found");
    }
  };
  

  // get all meeting data
  const getMeeting = async () => {
    const userId = sessionStorage.getItem("userId");

    const queryDoc = query(meetingRef, where("clientId", "==", userId),where("meetingApiCreated", "==", true));

    await getDocs(queryDoc).then((response) => {
      setMeeting(
        response.docs.map((data) => {
          return { ...data.data(), meeting_id: data.id };
        })
      );
    });

 
  };



   // get all meeting data
   const getHelpText = async () => {
    
    const queryDoc = query(helpRef, where("status", "==", 1));

    await getDocs(queryDoc).then((response) => {
      setHelp(
        response.docs.map((data) => {
          //console.log(data);
          return { ...data.data(), help_id: data.id };
        })
      );
    });
   //  //console.log(coachDoc);
    // if (coachDoc.exists()) {
    //   setMyCoach(coachDoc.data());

    //   // ////console.log('here');
    //   //console.log(coachDoc.data);
    // } else {
    //   ////console.log("No client found");
    // }
  };
  const fetchCoach = async () => {
    // const coachRef = doc(collection(database, "coaches_user"), coachesFirebaseId);
    // const coachDoc = await getDoc(coachRef);

    const queryDoc = query(coachRef, where("__name__", "==", coachesFirebaseId));

    await getDocs(queryDoc).then((response) => {
      setMyCoach(
        response.docs.map((data) => {
          //console.log(data);
          return { ...data.data(), coach_id: data.id };
        })
      );
    });







    
   //  //console.log(coachDoc);
    // if (coachDoc.exists()) {
    //   setMyCoach(coachDoc.data());

    //   // ////console.log('here');
    //   //console.log(coachDoc.data);
    // } else {
    //   ////console.log("No client found");
    // }
  };



  const fetchMyPlan = async () => {
   // const myplanRef = doc(collection(database, "admin_plans"), coachesFirebaseId);
    // const coachDoc = await getDoc(coachRef);

    const queryDoc = query(planRef, where("__name__", "==", clientPlanId));

    await getDocs(queryDoc).then((response) => {
      setMyPlan(
        response.docs.map((data) => {
          //console.log(data);
          return { ...data.data(), plan_id: data.id };
        })
      );
    });







    
   
  };


  // get all meeting data
  const getMeetingByDate = async (todayDate: string) => {
    const userId = sessionStorage.getItem("userId");

    const queryDoc = query(meetingRef, where("coachId", "==", coachesFirebaseId),where("meetingDate", "==", todayDate));

    await getDocs(queryDoc).then((response) => {
      setMeetingByDate(
        response.docs.map((data) => {
          return { ...data.data(), meeting_id: data.id };
        })
      );
    });
  };

  const updateCurrentMeeting = () => {
    const currentTime = new Date();
    let num=0;
    
    for (let index = 0; index < meeting.length; index++) {
      const meet = meeting[index];
      const meetingTimeParts = meet.meetingTime.split(':');
      const meetingHour = parseInt(meetingTimeParts[0], 10);
      const meetingMinute = parseInt(meetingTimeParts[1], 10);
    
      // Create a Date object for the meeting time
      const meetingDate = new Date(meet.meetingDate);
      meetingDate.setHours(meetingHour);
      meetingDate.setMinutes(meetingMinute);
      meetingDate.setSeconds(0); // Assuming seconds are always 0
    
      // Calculate the time remaining in minutes
      const timeRemaining = Math.floor((meetingDate - currentTime) / 1000 / 60);
  
      //console.log(timeRemaining, 'timeRemaining1');
      if (new Date(meet.meetingDate).toLocaleDateString() === new Date().toLocaleDateString() && timeRemaining > 0 && timeRemaining < 30) {
        //console.log(timeRemaining, 'timeRemaining');
        setMeetindex(index);
        setTimeRemain(timeRemaining);
        num=num+1;
        break;
      }
      if(num == 0){
        setMeetindex(null);
      }
    }
  };
  
  //updateCurrentMeeting(); // Initial check
  //const intervalId = setInterval(updateCurrentMeeting, 600); // Check every minute

  useEffect(() => {
    if (BookedId) {
      getBookingId();
    }
  }, [BookedId]);

  useEffect(() => {
    updateCurrentMeeting();
    const intervalId = setInterval(updateCurrentMeeting, 60000);
  
    return () => {
      clearInterval(intervalId); // Clear the interval when the component unmounts
    };
  }, [meeting]);
  useEffect(() => {
    if (client != null) {
      //console.log(client);
      ////console.log(client.client_api);
     // setclientCalAPIkey("cal_test_023256ac85011cded16d8d4f8f137d99");
      //setclientCaluserName(client.client_uname);
      setclientFirebaseId(client.id);
      setclientFirebaseName(client.client_name);
      const firstName = client.client_name.split(' ')[0];
      setclientFirebaseFirstName(firstName);
//console.log(firstName);
      setclientFirebaseEmail(client.client_email);
      //setcoachesCalUsername(client.assign_coach_uname);
      setclientPlanId(client.plan_id);
      setclientTotalSession(client.total_session);
      setclientCompletedSession(client.completedSession);
      setclientRemainingSession(client.remainingSession);
      setcoachesFirebaseId(client.assign_coach_id);
      getFiles();
     // fetchCoach();
    }

   

    //     if(!token){
    //         router.push('/pages/login')
    //     }
  }, [client]);



  useEffect(() => {
    if (coachesFirebaseId != '') {
      //console.log(coachesFirebaseId);
      //console.log('testtttttttt');
      //console.log(clientPlanId);
      fetchCoach();
      getNewRequest();
    //  fetchMyPlan();


    }

   

    //     if(!token){
    //         router.push('/pages/login')
    //     }
  }, [coachesFirebaseId]);


  useEffect(() => {
    if (allNewRequest.length > 0) {
      //console.log('ne wplan ');
      setrequestPlanId(allNewRequest[0].new_plan_id);


    }

   

    //     if(!token){
    //         router.push('/pages/login')
    //     }
  }, [allNewRequest]);

  

  const getFiles = async () => {
    const meetRef = collection(database, "resources");
   const queryDoc = query(meetRef, where("parentId", "in", [coachesFirebaseId, sessionStorage.getItem("userId")]));
   // const queryDoc = query(meetRef, where("parentId", "==", coachesFirebaseId)
  //  .where("parentId", "==", sessionStorage.getItem("userId"))

    await getDocs(queryDoc).then((response) => {
      //console.log(response.docs);
      setAllFiles(
        response.docs.map((data) => {
          return { ...data.data(), file_id: data.id };
        })
      );
     
      //console.log(allFiles);
     // setshowfile(true);
    });
  };



  const getNewRequest = async () => {
    //const meetRef = collection(database, "resources");
   const queryDoc = query(requestRef, where("client_id", "==", sessionStorage.getItem("userId")), where("status", "==", 1));
   // const queryDoc = query(meetRef, where("parentId", "==", coachesFirebaseId)
  //  .where("parentId", "==", sessionStorage.getItem("userId"))

    await getDocs(queryDoc).then((response) => {
      //console.log(response.docs);
      setallNewRequest(
        response.docs.map((data) => {
          return { ...data.data(), new_request_id: data.id };
        })
      );
     
      //console.log(allFiles);
     // setshowfile(true);
    });
  };


  useEffect(() => {
    // Fetch your data from an API or elsewhere
   
    // Sort the data by name in ascending order

    if(allFiles.length > 0){
      const sortedData = allFiles.sort((a, b) => a.fileName.localeCompare(b.fileName));

      setAllFiles(sortedData);
    }
    
  }, [allFiles]);
  
  

  const handleTimeClick = (event: any) => {
    // ////console.log( event.target.getAttribute("data-key"));
    //////console.log( event.target.getAttribute("data-time"));
    setmeetingtime(event.target.getAttribute("data-time"));

    // selectedTime.splice(0, selectedTime.length);
    //selectedTime.splice(0, array1.length);
    setselectedTime(event.target.getAttribute("data-key"));
    //////console.log(meetingdate);
    ////console.log(meetingtime);
    var startTime = meetingdate + " " + meetingtime;
    ////console.log(startTime);

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
    ////console.log(newTime);
    setmeetingendtime(newTime);
    setshowNext(true);
  };

  // fetching records
  const [fireData, setFireData] = useState([]);
  const [coachData, setCoachData] = useState([]);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientCountry, setClientCountry] = useState("");
  const [clientTimeZone, setClientTimeZone] = useState("");
  const [clientLanguage, setClientLanguage] = useState("");

  const [count, setCount] = useState(1);

  // Function to increment count by 1
  const incrementCount = () => {
    setCount(count + 1);
  };

 
  const getData = async () => {
    await getDocs(planRef).then((response) => {
      setFireData(
        response.docs.map((data) => {
          return { ...data.data(), plan_id: data.id };
        })
      );
    });
  };

  // coach data fetch
  const getCoachData = async () => {
    const queryDoc = query(coachRef, where("coach_api", "!=", ""));

    await getDocs(queryDoc).then((response) => {
      setCoachData(
        response.docs.map((data) => {
          return { ...data.data(), coach_id: data.id };
        })
      );
    });
  };

  const [date, setDate] = useState(new Date());
  const [array1, setarray1]: any[] = useState([]);

  const [meetingdate, setmeetingdate] = useState("");
  const [meetingCreatedAt, setmeetingCreatedAt] = useState("");

  const [meetingName, setmeetingName] = useState("");

  const [meetingLink, setmeetingLink] = useState("");

  const [meetingPrivacy, setmeetingPrivacy] = useState("");
  const [meetingApiCreated, setmeetingApiCreated] = useState("");

  const [meetingtime, setmeetingtime] = useState("");

  const [meetingtitle, setmeetingtitle] = useState("");
  const [meetinguser, setmeetinguser] = useState("");
  const [meetinguser2, setmeetinguser2] = useState("");
  const [meetinguseremail, setmeetinguseremail] = useState("");
  const [meetinguser2email, setmeetinguser2email] = useState("");
  const [type_load, settype_load] = useState(false);
  const [type_err_load, settype_err_load] = useState(false);
  const [timeslot_load, settimeslot_load] = useState(false);
  const [bookingLoad, setbookingLoad] = useState(false);
  const [bookingError, setbookingError] = useState(false);

  const [meetingendtime, setmeetingendtime] = useState("");
  const [showNext, setshowNext] = useState(false);

  const [upcomingMetting, setupcomingMetting] = useState([]);

  const [currentdate, setcurrentdate] = useState(new Date().toISOString());

  //const array1 = ['7:00','09:00', '10:00', '10:30', '11:00', '12:30', '14:00','17:00','18:00','20:00'];
  const [isShow, setisShow] = useState(true);

  const [Month, setMonth] = useState("");
  const [Date_, setDate_] = useState();
  const [Day_, setDay_] = useState("");


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

  
  const checkAvailability = () => {
    const dateString = `${Day_} ${Month} ${Date_}`;
    const isDateAvailable = CoachUnavailability.find((item) => item.date === dateString);
//console.log(isDateAvailable);
    if(isDateAvailable){
      setUnavailableId(isDateAvailable.un_id);
      setUnavailableStartSlot(isDateAvailable.startSlot);
      setUnavailableEndSlot(isDateAvailable.endSlot);
    }else{
      setUnavailableId(null);
      setUnavailableId(null);
      setUnavailableId(null);
    }
    
    setIsUnavailable(!isDateAvailable);
  };


  const getCoachUnavailability = async () => {

    //console.log('testtt');
    const coachId = coachesFirebaseId;
    const meetingSessionCollection = collection(database, 'unavailability');
    const queryDoc = query(meetingSessionCollection, where("coach_id", "==", coachId));
  
      await getDocs(queryDoc).then((response) => {
        setCoachUnavailability(
          response.docs.map((data) => {
            //console.log(data.data());
            return { ...data.data(), un_id: data.id };
          })
        );
      });
     
     
   
   }

 


  /**Get Timeslot */

  const getTimeslots = async (date) => {
    settimeslot_load(true);
    

    var tomorrow = new Date(date);
    tomorrow.setDate(date.getDate() + 1);
    var todayDate = new Date(tomorrow).toISOString().slice(0, 10);

    //console.log(todayDate);

    getMeetingByDate(todayDate);

    setmeetingdate(todayDate);

    var startTime = "";
    var endTime = "";
    const d = date;
    var selectedDay = date.getDay();
    ////console.log("selected days: " + selectedDay + "");

    setDate(date);
    setMonth(date.toLocaleString("default", { month: "long" }));
    setDate_(date.getDate());
    setDay_(date.toLocaleDateString("default", { weekday: "long" }));

    var included = 1;
    setarray1([]);

   

      // ////console.log(res);
      ////console.log(data);





    //getBookedSchedule();
  };

 
  function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
  }
  useEffect(() => {
    if(meeting.length>0){
  //getSessionHistory();


    }
  }, [meeting]);
  const [country_sel, setcountry_sel] = useState('');
  const handleChangeCountry = (event) => {
    setcountry_sel(event.target.value);
    setClientCountry(event.target.value);
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


    if(selectedCountryLanguages.length > 0){

      setClientLanguage(selectedCountryLanguages[0])
    //  values.clientLanguage=selectedCountryLanguages[0];
    }


  }, [selectedCountryLanguages])



  useEffect(() => {
   
    checkAvailability();
     
   }, [Day_,Month,Date_,CoachUnavailability]);


  // useEffect(() => {
  //   //console.log('i am here');
  //   //console.log(clientCountry);

  //   if(client != null ){

  //     const foundObject = country_data.some(obj => obj.country === country_sel);

  //     //console.log(country_sel);
  //     //console.log(foundObject); // Output: true (if found), false otherwise
  //     //console.log('i am here');

  //     if(!foundObject){
  //       client.client_country = 'South Africa';
  //       setcountry_sel('South Africa');
  //     }
  //   }


  // }, [client])


  useEffect(() => {


    if(selectedCountryTimezone != ""){

      setClientTimeZone(selectedCountryTimezone);
    }


  }, [selectedCountryTimezone])

  useEffect(() => {
   
    if(coachesFirebaseId != ''){
     getCoachUnavailability();
    }
   
 }, [coachesFirebaseId]);
  
  useEffect(() => {

 

    if (fileUrl != "") {
    addInFirebase();
    }

}, [fileUrl])



  
  useEffect(() => {
   
    if(mycoach != null){
      if(mycoach[0].start_time){
 var starttime = mycoach[0].start_time;
      }else{
        var starttime = "09:00:00";
      }
var interval = "45";
if(mycoach[0].start_time){
  var endtime = mycoach[0].end_time;
       }else{
         var endtime = "17:00:00";
       }

      }
      else{
        var starttime = "09:00:00";
        var interval = "45";
        var endtime = "17:00:00";
      }
//var endtime = "17:00:00";
var timeslots = [starttime];

//console.log(meetingByDate);

while (starttime < endtime) {

  starttime = addMinutes(starttime, interval); 

  if(starttime < endtime){
  if(!isReserved(starttime)){
  timeslots.push(starttime);
  }
}
  settimeslot_load(false);
}

setarray1(timeslots);


  }, [meetingByDate]);

  if(!client){
    return <div><img src={`${router.basePath}/images/loading.gif`} style={{ display:"block", margin:"0px auto"}} /></div>;
  }
 

function handleFileChange(event) {
  //console.log('test');
  setFile(event.target.files[0]);
//handleSubmit();
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
 

  function handleSearch(event) {
    //console.log(event.target);
   setSearchVal(event.target.value);
//handleSubmit();

  }
  

  function handleSubmit() {
    // event.preventDefault();
 
 
     if (file != null) {
      
        //console.log(file);
       // Upload the file to Firebase Cloud Storage
      // const storageRef = storage().ref();
       //const fileRef = storageRef.child('files/' + file.name);
       setshowpercent(true);
       let randomString = '';

          const randomNum = Math.floor(Math.random() * 1000);

  // Convert the number to a string and pad it with leading zeros if necessary
  const randomNumber = randomNum.toString().padStart(3, '0');
  //console.log(randomNumber);
       randomString +=randomNumber;
  
       // Generate three random letters
       for (let i = 0; i < 3; i++) {
         const randomCode = Math.floor(Math.random() * (122 - 97 + 1)) + 97;
         const randomLetter = String.fromCharCode(randomCode);
         randomString += randomLetter;
         //console.log(randomLetter);
       }

    

       const uniqueId = new Date().getTime();
       //console.log(uniqueId);
       randomString +=uniqueId;

       //console.log(randomString);
     const storageRef = ref(storage, `/resources/`+randomString+``)
       const uploadTask =  uploadBytesResumable(storageRef, file);
       uploadTask.on("state_changed",
     (snapshot) => {
     const percent = Math.round(
     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
         );
 // update progress
         setPercent(percent);
         },
     (err) => //console.log(err),
         () => {
     // download url
         getDownloadURL(uploadTask.snapshot.ref).then((url) => {
         //console.log(url);
         setfileName(file.name);
         
         setfileType(file.type);
         setfileUrl(url);
         setshowpercent(false);
         setfilecount(filecount + 1);
         setFile(null);
      //   toast.success('File Uploaded!');
     });
     }
     ); 
      
         }
       
     }

     
     function addInFirebase() {
       
      const today = new Date();
const date = today.getDate();
const month = today.getMonth() + 1; // add 1 because months are zero-indexed
const year = today.getFullYear();
      addDoc(resourceRef, {
          resourceURL: fileUrl,
          parentId : sessionStorage.getItem("userId"),
          fileName : fileName,
          fileType : fileType,
          uploadDate : ''+date+'-'+month+'-'+year,
         
        })
          .then(() => {
           // toast.success('File Uploaded')
            //router.push('/client/login')
            setErrorMessage("File Uploaded");
            getFiles();
          
          })
          .catch((err) => {
            console.error(err);
          })
         
       }
       

     
     function backToMain(){
      setemailOption(false);
      setSelectOption(true);
     }
     
      
      
  return (
    <>
    <section className="client-dashboard user-details-desktop">
      <div className="container">
        <ToastContainer/>

        {/* <div className='row'>
          <div className='col-sm-12'>
            <div className='client-reminder'>
              <p>
                upcoming meeting reminder <span>10 minutes : Coach Name</span>
              </p>
              <div className='dismiss'>
                <h5>Join</h5> <hr />
                <h6>dismiss</h6>
              </div>
            </div>
          </div>
        </div> */}

        <div className="row">
          <div className="col-sm-8 left">
            <div className="banner-text">
              <h2>
                <span>we are because you are</span>welcome{" "}
                {client ? <> {clientFirebaseFirstName} </> : null}
              </h2>
            </div>
          </div>
        </div>

        {/* modal - view session history starts */}
        <Modal
          centered
          className="session-history-modal"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel2}
          width={1100}
        >
          {/* <div className="modal-data">
            <div className="modall">
              <div className="history-modal">
                {/* <i className="fa fa-angle-left"></i> *
                <h4>History</h4>
              </div>
              <div className="table-session">
                <div className="table-responsive">
                  <table className="table table-sess">
                    <thead>
                      <tr>
                        <td></td>
                        <td>date</td>
                        <td>time</td>
                        <td>coach</td>
                       
                      </tr>
                    </thead>
                    <tbody>

                    {meetingSession.map((session, index) =>{
  // Convert the Unix timestamp to a readable time for each session
  const timestamp = session.meeting_start_time.seconds * 1000; // Convert seconds to milliseconds
  const date = new Date(timestamp);
  const readableTime = date.toLocaleTimeString(); 

  const readableDate = date.toLocaleDateString(); 

  return (
                    
                      
                        <tr key={session.meet_id}>
                        <th>{ index + 1}</th>
                        <td>{ readableDate}</td>
                        <td>{readableTime}</td>
                        <td> {mycoach ? mycoach[0].coach_name : null }</td>

                     
                      </tr>

                      );
                    })}



                    


                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>*/}

<>
  <section className="session-history">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h3 className="mrb-20">history</h3>
          <div className="session-info">
          {meetingSession.map((session, index) =>{
  // Convert the Unix timestamp to a readable time for each session
  const timestamp = session.meeting_start_time.seconds * 1000; // Convert seconds to milliseconds
  const date = new Date(timestamp);
  const readableTime = date.toLocaleTimeString(); 

  const readableDate = date.toLocaleDateString(); 

  return (
            <div className="session-inner">
              <div className="row">
                <div className="col-3">
                  <p>
                    <b>session {index + 1}</b>
                  </p>
                </div>
                <div className="col-3">
                  <p>{ readableDate} </p>
                </div>
                <div className="col-3">
                  <p>{readableTime}</p>
                </div>
                <div className="col-3">
                  <p>{mycoach ? mycoach[0].coach_name : null }</p>
                </div>
              </div>
              {/*/ row */}
              <p className="session-btn">
                <a href="#" className="btn btn-darkgreen">
                  download notes
                </a>
              </p>
            </div>

);
})}
          
          </div>
          {/*/ session-info */}
        </div>
        {/*/ cl-coll */}
      </div>
      {/*/ row */}
    </div>
  </section>
  {/*/ session-history */}
</>

        </Modal> 
        {/* modal - view session history ends */}





        <Modal
          centered
          className="session-history-modal"
          visible={isContactCoach}
          onOk={handleContactOk}
          onCancel={handleContactCancel}
          width={800}
        >
          <div className="modal-data">
            <div className="modall">
              <div className="history-modal">


           

                {/* <i className="fa fa-angle-left"></i> */}
                
              </div>
         { selectOption ?
         <>
            <div className="row">
                <div className="col-md-4">.</div>
                <div className="col-md-8"><h2>Select Option</h2></div>
         
         </div>
              <div className="row">
                <div className="col-md-3">.</div>
                <div className="col-md-6 cal-time"><button onClick={showEmailForm} className="btn btn-time">Send Email to Coach</button></div>
                </div>

                <div className="row">
                <div className="col-md-3">.</div>
                <div className="col-md-6 cal-time"><button className="btn btn-time" onClick={makePhoneCall}>Call to Coach</button></div>
                  </div>
</>
                  : null}

{ emailOption ?
         <>
         <div className="row">
                <div className="col-md-4"><button className="btn btn-success" onClick={backToMain}>Back</button></div>
                <div className="col-md-8"><h2>Send Email</h2></div>
         
         </div>
              <div className="row">
                <div className="col-md-2">.</div>
                <div className="col-md-8" style={{'marginBottom':'10px','fontSize':'18px', 'display':'none'}}>Coach Email - {mycoach ? mycoach[0].coach_email : null }</div></div>

              <div className="row">
                <div className="col-md-2">.</div>
          <div className="col-md-8">
                <form
                  noValidate
                  autoComplete="off"
                  onSubmit={(e) => e.preventDefault()}
                  ref={form2}
                >
                  <div className="form-group">
                    <textarea
                      name="coachText"
                      id=""
                      cols="30"
                      rows="10"
                      className="form-control"
                      placeholder="message"
                      onChange={(event) => setcoachText(event.target.value)} value={coachText}
                    ></textarea> 
                     <input type="hidden" name="message" value={helpText}/>
                    <input type="hidden" name="name" value={client.client_name}/>
                    <input type="hidden" name="email" value={mycoach ? mycoach[0].coach_email : null }/>
                  </div>
                  {ShowCoachErr ?  <b>Message Can't be Empty </b> : null }
                  {ShowEmailSuccess ?  <b style={{'color':'green'}}>Message Send. </b> : null }
                  <div className="two-button">
                    <button className="btn btn-send btn-primary" style={{'marginTop':'20px'}} onClick={sendCoachMsg}>send</button>
                   
                  </div>
                 
                </form>
                </div>
                
              </div>
              </> :null }
            </div>
          </div>
        </Modal>





        <Modal
          centered
          className="session-history-modal"
          visible={isUpdateBilling}
          onOk={handleUpdateBilling}
          onCancel={handleUpdateBillingCancel}
          width={800} 
         
        >
         

             
         <div className="row">
                <div className="col-md-3">.</div>
                <div className="col-md-8"><h2>Update Billing Information</h2></div>
         
         </div>
              <div className="row">
                <div className="col-md-2">.</div>
                <div className="col-md-8" style={{'marginBottom':'10px','fontSize':'18px', 'display':'none'}}>Coach Email - {mycoach ? mycoach[0].coach_email : null }</div></div>

              <div className="row">
                <div className="col-md-2">.</div>
          <div className="col-md-8">
                <form
                  noValidate
                  autoComplete="off"
                  onSubmit={(e) => e.preventDefault()}
                  ref={form2}
                >
                  <div className="form-group">
                   <label>Bank Name</label>
                    <input type="text" className="form-control" name="bank"  onChange={(event) => setBank(event.target.value)} value={bank}/>
                      </div>
                  {ShowBankErr ?  <b>Bank Name Can't be Empty </b> : null }
                


                  <div className="form-group">
                   <label>Account Number</label>
                    <input type="text" className="form-control" name="accountNo"  onChange={(event) => setAccountNo(event.target.value)} value={accountNo}/>
                       </div>
                  {ShowAccountErr ?  <b>Account Number Can't be Empty </b> : null }
                  


                  <div className="form-group">
                   <label>Account Holder Name</label>
                    <input type="text" className="form-control" name="accountHolder"  onChange={(event) => setAccountHolder(event.target.value)} value={accountHolder}/>
                       </div>
                  {ShowAccountHolderErr ?  <b>Account Holder Can't be Empty </b> : null }
                  


                  <div className="form-group">
                   <label>Swift Code</label>
                    <input type="text" className="form-control" name="swiftCode"  onChange={(event) => setSwiftCode(event.target.value)} value={swiftCode}/>
                       </div>
                  {ShowSwiftErr ?  <b>Swift Code Can't be Empty </b> : null }
                 



                  <div className="two-button">
                    <button className="btn btn-send btn-primary" style={{'marginTop':'20px'}} onClick={updateBilling}>SAVE</button>
                   
                  </div>
                  {ShowBillingSuccess ?  <b style={{'color':'green'}}>Billing Information Saved </b> : null }
                </form>
                </div>
                
              </div>
             
        </Modal>







        <Modal
          centered
          className="session-history-modal"
          visible={isUploadNotes}
          onOk={handleUploadOk}
          onCancel={handleUploadCancel}
          width={800} 
         
        >
        

            
          <div className="row">
                    
                  <div className="col-sm-4"></div>
                    <div className="col-sm-6">
                    <h2>Upload Notes</h2>
                      </div>   
                    </div>

                {/* <i className="fa fa-angle-left"></i> */}
                <form noValidate autoComplete='off' style={{'marginTop':'5%'}} onSubmit={e => e.preventDefault()} className='form-password'>
                
                  <div className="row">
                    
                  <div className="col-sm-2"></div>
                    <div className="col-sm-6">
                    
                    {/* <label  className="custom-file-upload">
    <i className="fa fa-cloud-upload"></i> choose File
    <input id="file-upload" type="file" onChange={handleFileChange}/>
</label> */}
<input  type="file" onChange={handleFileChange} className='form-control' style={{width:'100%'}}/>




                       
                    </div>
                  

                    <div className="col-sm-2">

                      <input type="submit" value="SAVE" className='btn btn-save btn-success' onClick={handleSubmit} />
                    
                     
                     </div>

                     <div className="col-sm-2">

                    
                      { showpercent ?
    percent  : null}
    { showpercent ?
    "%"  : null}
                     </div>
</div>

{/* <div className="row">
                    
                    <div className="col-sm-2"></div>
                    <div className="col-sm-4">
                    <input type="submit" value="SAVE" className='btn btn-primary' onClick={handleSubmit} />
                   
                    </div>
</div> */}


                    
                 
                 
                  <div className="row">
                  <div className="col-sm-12">
                      {errorMessage && <Alert message={errorMessage} className='mt-4' type="success"/> }
                    </div>

                  </div>
                </form>
                

              
        </Modal>




        {/* video join call - modal starts */}
        <Modal
          centered
          className="video-call-modal"
          visible={isVideoCallVisible}
          onOk={showVideoCallModalOk}
          onCancel={showVideoCallModalCancel}
          width={1400}
          height={620}
          footer={[]}
        >
          {/* <div className="modal-data">
            <div className="modall">
              {/* <div className="history-modal">
                <h4>Join Video Call</h4>
              </div> */}
              {/* <div className="video-call-frame">
                <iframe
                  src="https://abhinav19.daily.co/kNbrMIQyrVBz0KjApLVt"
                  width="100%"
                  height="540px"
                  frameborder="0"
                ></iframe>
              </div>
            </div>
          </div> */}
        </Modal>
        {/* video join call - ends modal */}

        {/* book new session - modal starts */}
        <Modal
          centered
          className="session-history-modal session-book-modal"
          visible={open}
          onOk={bookOk}
          onCancel={bookCancel}
          width={1200}
          footer={[]}
        >
          <div className="modal-data">
            <div className="history-modal">
              <h4>book a new session</h4>
            </div>

            <div className="reschedule-zone">
              <div className="row">
                <div className="col-sm-2">
                  <div className="coach-fig">
                    <figure>
                      <img src="../../images/clients-01.png" alt="Coach Name" />
                    </figure>
                    <p>{coachesCalName}</p>
                    <p>
                      <strong>next session</strong>
                    </p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="resc-cal">
                    <h5>select a date &amp; time</h5>
                    <Calendar onChange={setDate} value={date} minDate={today} />
                    <h5>time zone</h5>
                    <p>GMT, London Time</p>
                  </div>
                </div>
                <div className="col-sm-4">
                  
                  <div className="cal-time">
                    <p>Wednesday, January 11</p>

                    {array1.map((timeSlot, index) => {
                      return (
                        <button className="btn btn-time" key={index}>
                          {timeSlot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        {/* book new session - modal ends */}

        {/* reschedule & choose coach a session - modal */}
        <Modal
          centered
          className="session-table"
          visible={coach}
          onOk={coachOk}
          onCancel={coachCancel}
          width={1200}
          footer={[]}
        >
          <div className="modal-data">
            {eventChoose ? (
              <>
                <h4>
                  Event Types
                  <span>
                    Create events to share for people to book on your calendar -{" "}
                    {coachesCalEmail}
                  </span>
                </h4>
                <div className="choose-event-type">
                  {coachesEvents.map((event, index) => {
                    return (
                      <div
                        className="event-types"
                        data-coach_event_id={event.id}
                        data-interval={event.length}
                        onClick={openCalendar}
                      >
                        <div
                          className="box-left"
                          data-coach_event_id={event.id}
                          data-interval={event.length}
                        >
                          <h5
                            data-interval={event.length}
                            data-coach_event_id={event.id}
                          >
                            {event.title}
                          </h5>
                          <span
                            data-interval={event.length}
                            data-coach_event_id={event.id}
                          >
                            <Clock /> {event.length}
                          </span>
                        </div>
                        <div
                          className="box-right"
                          data-interval={event.length}
                          data-coach_event_id={event.id}
                          onClick={openCalendar}
                        >
                          {/* <ArrowRightCircleOutline/> */}
                        </div>
                      </div>
                    );
                  })}

                  {type_load ? (
                    <div>
                      <h3>Loading....</h3>
                    </div>
                  ) : null}

                  {type_err_load ? (
                    <div>
                      <h3>Something Went Wrong</h3>
                    </div>
                  ) : null}
                </div>
              </>
            ) : (
              <>

              </>
            )}
          </div>
        </Modal>

        <Modal
          centered
          className="session-history-modal session-reschedule-modal"
          visible={reschedule}
          onOk={rescheduleOk}
          onCancel={rescheduleCancel}
          width={1200}
          footer={[]}
        >
          <div className="modal-data">



            {next ? (
              <>
                <div className="meeting-schedule">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="tick-icon">
                        <i className="fa fa-check"></i>
                        <h2>This meeting is { res_action } </h2>
                        <p>
                          We emailed you and the other attendees a calendar
                          invitation with all the details.
                        </p>
                      </div>
                      {/* <div className="meet">
                        <div className="left-meet">
                          <strong>What</strong>
                        </div>
                        <div className="right-meet">
                          <p>{meetingtitle}</p>
                        </div>
                      </div> */}
                      {/* <div className="meet">
                        <div className="left-meet">
                          <strong>When</strong>
                        </div>
                        <div className="right-meet">
                          <p>Friday, March 17, 2023</p>
                          <p>
                            15:30 - 16:30 <span> (India Standard Time) </span>
                          </p>
                        </div>
                      </div> */}
                      {/* <div className="meet">
                        <div className="left-meet">
                          <strong>Who</strong>
                        </div>
                        <div className="right-meet">
                          <p>
                            {meetinguser} <br />
                            <span>{meetinguseremail}</span>
                          </p>
                          <p>
                            {meetinguser2} <br />
                            <span>{meetinguser2email}</span>
                          </p>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="history-modal">
                  <h4>{modal_action}</h4>
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
                        <p>{coachesCalName}</p>
                        <p>
                          <strong>next session</strong>
                        </p>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="resc-cal">
                        <h5>select a date &amp; time</h5>
                        <Calendar onChange={getTimeslots} value={date} minDate={today} />
                        <h5>time zone</h5>
                        <p>{coachesCalTimezone}</p>
                      </div>
                    </div>
                    {isShow ? (
                      <div className="col-sm-4">
                        <div className="cal-time">
                          <p>
                            {Day_} {Month} {Date_}
                          </p>
                          {isUnavailable ? (

                          array1.map((timeSlot, index) => {
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
                          })

                          )
                          : ( 
                            array1.map((timeSlot, index) => {

                              const timeSlotDate = new Date(`1970-01-01T${timeSlot}`);
  const unavailableStart = new Date(`1970-01-01T${UnavailableStartSlot}`);
  const unavailableEnd = new Date(`1970-01-01T${UnavailableEndSlot}`);

  // Check if timeSlot is outside the range
  const isOutsideRange = timeSlotDate < unavailableStart || timeSlotDate > unavailableEnd;

                              return isOutsideRange ? (
                                selectedTime == index ?
                                <button
                                  className="btn btn-time"
                                  data-key={index}
                                  key={index}
                                  data-time={timeSlot}
                                  style={{ backgroundColor: "#6dc1a4" }}
                                  onClick={handleTimeClick}
                                >
                                  {timeSlot}
                                </button>:

<button
className="btn btn-time"
data-time={timeSlot}
data-key={index}
key={index}
onClick={handleTimeClick}
>
{timeSlot}
</button>
                              ) : (
                              null
                              );
                            })


                            )
                        }
                          {timeslot_load ? (
                            <div className="btn btn-time"> Loading...</div>
                          ) : null}
                        </div>
                        <button className="btn btn-next" onClick={scheduleNext}  disabled={!meetingtime && isUnavailable}>
                          next <i className="fa fa-arrow-right"></i>
                        </button>
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
              </>
            )}
          </div>
        </Modal>
        {/* reschedule session = modal ends */}

        <div className="next-session">
          <div className="row">
            <div className="col-sm-8 left">
              <div className="banner-et">
                <div className="padd">
                  <div className="padd-left">
                    <h3>next session</h3>
                  </div>
                  <div className="padd-right">
                    <button className="btn btn-session" onClick={showModal}>
                      view session history
                    </button>
                  </div>
                </div>

                <table className="table table-coach">
                  <tbody>
                    <tr>
                      <td colSpan={2}>
                        <button
                          className="btn btn-book my-4"
                          onClick={scheduleNewSes}
                        >
                          Book a new session
                        </button>
                      </td>
                     
                      <td>
                        {/* <button className='btn btn-coach' onClick={videoSession}>

                          <Video /> Join Video
                        </button> */}
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                       {/* <td>
                        <p> </p>
                      </td>  */}
                      <td>{mycoach ? mycoach[0].coach_name : null }</td>
                      <td></td>
                      <td>
                        <Link href="#" onClick={showContactCoach}>
                          <a className="btn btn-coach" onClick={showContactCoach}> contact coach</a>
                        </Link>
                      </td>
                    </tr>

                    {meeting.map((data) => {

var myArr2=data.meetingTime.split(':');

var myArr=new Date(data.meetingDate).toLocaleDateString().split('/');



            if (new Date(data.meetingDate).toLocaleDateString() == new Date().toLocaleDateString() )
            
            return (
                        <>
                          <tr className="table-pad">
                            {/* <td>{data.coach_name}</td> */}
                            <td>
                              {new Date(data.meetingDate).toLocaleDateString()}
                            
                              
                            </td>
                            <td className="td-two">
                            <span>{myArr2[0]}H{myArr2[1]}</span>
                              <Link
                                passHref
                               // href={`videocall/${data.meetingName}`}
                               href={`/client/joinvideo/${data.meetingName}`}
                                target="_blank"
                               
                              >
                                <a className="btn btn-coach">Join Video</a>
                              </Link>
                               
                            </td>
                            <td className="td-two">
                              <button
                                className="btn btn-schedule"
                                data-id={data.meeting_id}
                                onClick={scheduleReSes}
                              
                              >
                                reschedule
                              </button>
                            </td>
                          </tr>
                        </>
                      );











                      if (new Date(data.meetingDate).getTime() > new Date().getTime() )
                     
                     
                      return (
                        
                        <>
                          <tr className="table-pad">
                            {/* <td>{data.coach_name}</td> */}
                            <td className="meetdate">
                              {/* {new Date(data.meetingDate).toLocaleDateString()} */}
                          {myArr[2]}/{myArr[1]}/{myArr[0]}
                        
                              
                            </td>
                            <td className="td-two">
                            {myArr2[0]}H{myArr2[1]}
                            <Link
                                passHref
                                 // href={`videocall/${data.meetingName}`}
                               href={`/client/joinvideo/${data.meetingName}`}
                                target="_blank"
                               
                              >
                                <a className="btn btn-coach">Join Video</a>
                              </Link>
                              {/* <Link
                                passHref
                                href="#"
                                
                               
                              >
                                <a className="btn">Join Video</a>
                              </Link> */}
                              
                            </td>
                            <td className="td-two">
                           
                              <button
                                className="btn btn-schedule"
                                data-id={data.meeting_id}
                                onClick={scheduleReSes}
                              
                              >
                                reschedule
                              </button>
                            </td>
                          </tr>
                        </>
                      );


                     









                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-sm-4 right">
              <div className="info-basic">
                <figure>
                  <img src="../../images/clients-01.png" alt="" />
                </figure>
                <h3>{client ? <> {client.client_name} </> : null}</h3>
                {/* { client ? ( <p> API key: {client.client_api} </p> )  : null }
                { client ? ( <p> Cal Uname: {client.client_uname} </p> )  : null } */}

                {editDetail ? (
                  <>
                    <form
                      noValidate
                      autoComplete='off'
                      onSubmit={e => e.preventDefault()}
                      className='client-edit-details'
                    >
                      <div className='row'>
                        <div className='col-sm-6'>
                          <p>
                            email:
                            <span>
                              <input
                                type='email'
                                name='client_email'
                                id='client_email'
                                className='form-control'
                                placeholder='name@gmail.com'
                                value={clientEmail}
                                onChange={e => setClientEmail(e.target.value)}
                              />
                            </span>
                          </p>
                        </div>
                        <div className='col-sm-6'>
                          <p>
                            mobile:
                            <span>
                              <input
                                type='text'
                                name='client_phone'
                                id='client_phone'
                                className='form-control'
                                placeholder='123-456-7890'
                                value={clientPhone}
                                onChange={e => setClientPhone(e.target.value)}
                              />
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-sm-6'>
                          <p>
                            country:
                            <span>
                            <select id="country" value={clientCountry} className="form-control" onChange={handleChangeCountry}>
  <option value="">-- Select --</option>
  {country_data.map((country, index) => (
    <option
      key={index}
      value={country.country}
     
    >
      {country.country} - {country.flag}
   </option>
  ))}
</select>

                              {/* <input
                                type='text'
                                name='client_country'
                                id=''
                                className='form-control'
                                placeholder='United Kingdom'
                                value={clientCountry}
                                onChange={e => setClientCountry(e.target.value)}
                              /> */}
                            </span>
                          </p>
                        </div>
                        <div className='col-sm-6'>
                          <p>
                            time zone:
                            <span>
                              <input
                                type='text'
                                name='client_zone'
                                id=''
                                className='form-control'
                                placeholder='London GMT'
                                value={clientTimeZone}
                                onChange={e => setClientTimeZone(e.target.value)}
                              />
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-sm-6'>
                          <p> 
                         
                            languages:
                            <span>
                            {/* <select id="language" value={clientLanguage} className="form-control"  onChange={e => setClientLanguage(e.target.value)}>
        <option value="">-- Select --</option>
        {selectedCountryLanguages.length > 0 && (

        selectedCountryLanguages.map((language, index) => (
          <option key={index} value={language}>
            {language} 
          </option>
        ))
        )}
      </select> */}
                              <input
                                type='text'
                                name='client_language'
                                id=''
                                className='form-control'
                                placeholder='English; French'
                                value={clientLanguage}
                                onChange={e => setClientLanguage(e.target.value)}
                              />
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-sm-12'>
                          <div className='left-link'>
                            <a className='' onClick={() => saveD()}>
                              Save my details
                            </a>
                          </div>
                        </div>
                      </div>
                    </form>
                  </>
                ) : (
                  <>
                    <div className="row">
                      <div className="col-sm-6">
                        <p>
                          email:{" "}
                          <span>
                            {client ? <> {client.client_email} </> : null}
                          </span>
                        </p>
                      </div>
                      <div className="col-sm-6">
                        <p>
                        mobile:
                          <span>
                            {client ? <> {client.client_phone} </> : null}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <p>
                          country:{" "}
                          <span>
                            {client ? <> {client.client_country} </> : null}
                          </span>
                        </p>
                      </div>
                      <div className="col-sm-6">
                        <p>
                          time zone:{" "}
                          <span>
                            {client ? <> {client.client_zone} </> : null}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <p>
                          languages:{" "}
                          <span>
                            {client ? <> {client.client_language} </> : null}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="left-link">
                          <a className="" onClick={() => editD()}>
                            Edit my details &nbsp;
                          </a>
                          |
                          <Link href="/client/change-password" passHref>
                            <a className=""> Change my password</a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="client-plans">
          <div className="row">
            <div className="col-sm-7">
              <h3>my plan</h3>
              <div className="divider-bottom"></div>

              <form
                noValidate
                autoComplete="off"
                onSubmit={(e) => e.preventDefault()}
              >
                {fireData.map((data) => {
                  return (
                    <>
                      <div className={data.slug}>
                        <div className="row">
                          <div className="col-sm-6">
                            <div className={`tooltip ${data.plan_id === clientPlanId ? '' : ''}`}>
                              <button className={`btn ${data.plan_id === clientPlanId ? 'planactive' : ''}`}>
                                {" "}
                                {data.plan_name}{" "}
                              </button>
                              <div className="tooltiptext">
                                <p>{data.plan_desc}</p>
                                <button className="btn buy-req btnn" data-price={data.bundle_price} onClick={data.plan_id === clientPlanId ? buyMore : addNewRequest}>
                                  {" "}
                                  {data.plan_id === clientPlanId ? 'Buy Again' : 'Requested'}
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-6">

         { data.plan_id == requestPlanId ?

                            <button  data-plan-id={data.plan_id} data-price={data.bundle_price} className="btn btnn buy-pro buyagain-btn"  onClick={data.plan_id === clientPlanId ? buyMore : addNewRequest}>
                              {" "} 
                              {data.plan_id === clientPlanId ? 'Buy Again' : 'Requested'}
                            </button>


                :
                <button  data-plan-id={data.plan_id} data-price={data.bundle_price} className={`btn btnn buy-pro  ${data.plan_id === clientPlanId ? 'buyagain-btn' : ''}`} onClick={data.plan_id === clientPlanId ? buyMore : addNewRequest}>
                {" "}
                {data.plan_id === clientPlanId ? 'Buy Again' : 'Request'}
              </button>
                }
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
                <div className="update">
                  <Link href="#" passHref onClick={showUpdateBilling}>
                    <a className="update-billing" onClick={showUpdateBilling}>
                      Update my billing information
                    </a>
                  </Link>
                </div>
              </form>
            </div>
            <div className="col-sm-5">
              <figure>
                <img src="../../images/banner-bg.png" alt="Images Logo" />
              </figure>
            </div>
          </div>
        </div>

        <div className="client-notes">
          <div className="row">
            <div className="col-sm-7">
              <h3>my notes. <span className="upload_notes_client" onClick={showUploadNotes}>Upload Notes</span>
             &nbsp;  <span className="upload_notes_client" onClick={showSeeNotes}>See Notes</span>
              </h3>
              <div className="divider-bottom"> </div>
            </div>
          </div>

          <Modal
          centered
          className="session-history-modal"
          visible={isSeeNotes}
          onOk={handleSeeNotesOk}
          onCancel={handleSeeNotesCancel}
          width={1200} 
         
        >
          <div className="client-bg">
            <div className="file-scroll">
              <div className="row">
                <div className="col-sm-12">
                  <div className="product_search_form">
                    <form id="searchForm" action="" method="POST">
                      <input
                        type="text"
                        name="keyword"
                        id="keyword"
                        className="form-control"
                        placeholder="search"
                        onKeyUp={handleSearch}
                      />
                      <input className="btn btn-search" type="submit" />
                      <i
                        className="fa fa-fw fa-search"
                        title="search"
                        aria-hidden="true"
                      ></i>
                    </form>
                  </div>
                </div>

                {allFiles.length> 0 ? allFiles.map((myfile, index) => {
             return (
              myfile.fileName.toLowerCase().indexOf(SearchVal.toLowerCase()) !== -1
              ? 
          <div className="col-sm-4 fi-coll">
              <a href={myfile.resourceURL} target='_blank'>
            <div className="inner">
             
              <figure><img src="../../images/file-icon.jpg" alt=""/></figure>
            <h4>{myfile.fileName} <span>{myfile.uploadDate}</span></h4>
            <div className="download-right">
                      <figure>
                        <img
                          src="../../images/download.png"
                          alt=""
                          className="download-file"
                        />
                      </figure>
                      {/* <div className="note-sec-full">
                        <h4>your notes drive is almost full</h4>
                        <div className="divider-bottom"></div>
                      </div> */}
                    </div>
              </div></a>
            </div>
            :null

             );
          }): <div className="col-sm-12 fi-coll" style={{'text-align':'center'}}>No File Found </div>
        }
         
 
               
               
            
              </div>
            </div>
          </div>




          </Modal>








        </div>


        <Modal
          centered
          className="session-history-modal"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel2}
          width={1100}
        >
          {/* <div className="modal-data">
            <div className="modall">
              <div className="history-modal">
                {/* <i className="fa fa-angle-left"></i> 
                <h4>History</h4>
              </div>
              <div className="table-session">
                <div className="table-responsive">
                  <table className="table table-sess">
                    <thead>
                      <tr>
                        <td></td>
                        <td>date</td>
                        <td>time</td>
                        <td>coach</td>
                       
                      </tr>
                    </thead>
                    <tbody>

                    {meetingSession.map((session, index) =>{
  // Convert the Unix timestamp to a readable time for each session
  const timestamp = session.meeting_start_time.seconds * 1000; // Convert seconds to milliseconds
  const date = new Date(timestamp);
  const readableTime = date.toLocaleTimeString(); 

  const readableDate = date.toLocaleDateString(); 

  return (
                    
                      
                        <tr key={session.meet_id}>
                        <th>{ index + 1}</th>
                        <td>{ readableDate}</td>
                        <td>{readableTime}</td>
                        <td> {mycoach ? mycoach[0].coach_name : null }</td>

                     
                      </tr>

                      );
                    })}



                    


                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div> */}

<>
  <section className="session-history">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h3 className="mrb-20">history</h3>
          <div className="session-info">

          {meetingSession.length === 0 ? (
  <p>No session history</p>
) : (
  meetingSession.map((session, index) => {
    // Convert the Unix timestamp to a readable time for each session
    const timestamp = session.meeting_start_time.seconds * 1000; // Convert seconds to milliseconds
    const date = new Date(timestamp);
    const readableTime = date.toLocaleTimeString();

    const readableDate = date.toLocaleDateString();

    return (
      <div className="session-inner" key={index}>
        <div className="row">
          <div className="col-3">
            <p>
              <b>session {index + 1}</b>
            </p>
          </div>
          <div className="col-3">
            <p>{readableDate} </p>
          </div>
          <div className="col-3">
            <p>{readableTime}</p>
          </div>
          <div className="col-3">
            <p>{mycoach ? mycoach[0].coach_name : null}</p>
          </div>
        </div>
        {/*/ row */}
        <p className="session-btn">
          <a href="#" className="btn btn-darkgreen">
            download notes
          </a>
        </p>
      </div>
    );
  })
)}
           
           
          </div>
          {/*/ session-info */}
        </div>
        {/*/ cl-coll */}
      </div>
      {/*/ row */}
    </div>
  </section>
  {/*/ session-history */}
</>

        </Modal>







        <Modal
          centered
          className="session-history-modal session-reschedule-modal"
          visible={reschedule}
          onOk={rescheduleOk}
          onCancel={rescheduleCancel}
          width={1200}
          footer={[]}
        >
          <div className="modal-data">



            {next ? (
              <>
                <div className="meeting-schedule">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="tick-icon">
                        <i className="fa fa-check"></i>
                        <h2>This meeting is { res_action } </h2>
                        <p>
                          We emailed you and the other attendees a calendar
                          invitation with all the details.
                        </p>
                      </div>
                      {/* <div className="meet">
                        <div className="left-meet">
                          <strong>What</strong>
                        </div>
                        <div className="right-meet">
                          <p>{meetingtitle}</p>
                        </div>
                      </div> */}
                      {/* <div className="meet">
                        <div className="left-meet">
                          <strong>When</strong>
                        </div>
                        <div className="right-meet">
                          <p>Friday, March 17, 2023</p>
                          <p>
                            15:30 - 16:30 <span> (India Standard Time) </span>
                          </p>
                        </div>
                      </div> */}
                      {/* <div className="meet">
                        <div className="left-meet">
                          <strong>Who</strong>
                        </div>
                        <div className="right-meet">
                          <p>
                            {meetinguser} <br />
                            <span>{meetinguseremail}</span>
                          </p>
                          <p>
                            {meetinguser2} <br />
                            <span>{meetinguser2email}</span>
                          </p>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="history-modal">
                  <h4>{modal_action}</h4>
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
                        <p>{coachesCalName}</p>
                        <p>
                          <strong>next session</strong>
                        </p>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="resc-cal">
                        <h5>select a date &amp; time</h5>
                        <Calendar onChange={getTimeslots} value={date} minDate={today} />
                        <h5>time zone</h5>
                        <p>{coachesCalTimezone}</p>
                      </div>
                    </div>
                    {isShow ? (
                      <div className="col-sm-4">
                        <div className="cal-time">
                          <p>
                            {Day_} {Month} {Date_}
                          </p>
                          {isUnavailable ? (

                          array1.map((timeSlot, index) => {
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
                          })

                          )
                          : ( 
                            array1.map((timeSlot, index) => {

                              const timeSlotDate = new Date(`1970-01-01T${timeSlot}`);
  const unavailableStart = new Date(`1970-01-01T${UnavailableStartSlot}`);
  const unavailableEnd = new Date(`1970-01-01T${UnavailableEndSlot}`);

  // Check if timeSlot is outside the range
  const isOutsideRange = timeSlotDate < unavailableStart || timeSlotDate > unavailableEnd;

                              return isOutsideRange ? (
                                selectedTime == index ?
                                <button
                                  className="btn btn-time"
                                  data-key={index}
                                  key={index}
                                  data-time={timeSlot}
                                  style={{ backgroundColor: "#6dc1a4" }}
                                  onClick={handleTimeClick}
                                >
                                  {timeSlot}
                                </button>:

<button
className="btn btn-time"
data-time={timeSlot}
data-key={index}
key={index}
onClick={handleTimeClick}
>
{timeSlot}
</button>
                              ) : (
                              null
                              );
                            })


                            )
                        }
                          {timeslot_load ? (
                            <div className="btn btn-time"> Loading...</div>
                          ) : null}
                        </div>
                        <button className="btn btn-next" onClick={scheduleNext}  disabled={!meetingtime && isUnavailable}>
                          next <i className="fa fa-arrow-right"></i>
                        </button>
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
              </>
            )}
          </div>
        </Modal>

        <div className="client-contact">
          <div className="row">
            <div className="col-sm-5">
              <div className="coach-resp">
         
     



    
    
      
                <h5>a coach's responsibility is to :</h5>
                <ul>
                  <li>Create a safe and thought-provoking space</li>
                  <li>Explore and clarify what you want to achieve</li>
                  <li>Draw out your solutions and strategies</li>
                  <li>Promote accountability for the process and results</li>
                  <li>Encourage self-discovery throught</li>
                </ul>
                <h5>a client's responsibility is to :</h5>
                <ul>
                  <li>Show up with a curious &amp; open mind</li>
                  <li>Embrace self-discovery</li>
                  <li>Take inspired action</li>
                  <li>
                    Hold yourself accountable for the process and results.
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-7">
              <div className="client-help">
                <h3>how can we help you?</h3>
                <p>
                  {help ? help[0].helpText : null }
                </p>
                <form
                  noValidate
                  autoComplete="off"
                  onSubmit={(e) => e.preventDefault()}
                  ref={form}
                >
                  <div className="form-group">
                    <textarea
                      name="helpText"
                      id=""
                      cols="30"
                      rows="4"
                      className="form-control"
                      placeholder="message"
                      onChange={(event) => sethelpText(event.target.value)} value={helpText}
                    ></textarea> 
                     <input type="hidden" name="message" value={helpText}/>
                    <input type="hidden" name="name" value={client.client_name}/>
                  </div>
                  {ShowHelpErr && <Alert message="Message Can't be Empty" className='mt-4' type="error"/> }
                  {ShowHelpSuccess && <Alert message="Message Sent" className='mt-4' type="success"/> }
                  <br/>
                  <div className="two-button">
                    <button className="btn btn-send" onClick={sendHelpMsg}>send</button>
                    <button className="btn btn-chat">
                      <i className="fa fa-whatsapp"></i> chat now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <section className="user-detail-mobile">
  <div className="container">

  {viewProfile ? (
  
<>

<Modal
          centered
          className="session-history-modal session-reschedule-modal"
          visible={viewProfile}
          onOk={toggleProfile}
          onCancel={toggleProfile}
          width={1200}
          footer={[]}
        >
          <div className="modal-data">
  <div className="row">
    <div className="col-12">
      <div className="user-profile new-user-profile mrb-20">
        <figure>
          <img src="../../images/clients-01.png" alt="" />
        </figure>
        <h3>{client ? <> {client.client_name} </> : null}</h3>
        <div className="info-basic">
                
              
                {/* { client ? ( <p> API key: {client.client_api} </p> )  : null }
                { client ? ( <p> Cal Uname: {client.client_uname} </p> )  : null } */}

                {editDetail ? (
                  <>
                    <form
                      noValidate
                      autoComplete='off'
                      onSubmit={e => e.preventDefault()}
                      className='client-edit-details'
                    >
                      <div className='row'>
                        <div className='col-sm-6'>
                          <p>
                            email:
                            <span>
                              <input
                                type='email'
                                name='client_email'
                                id='client_email'
                                className='form-control'
                                placeholder='name@gmail.com'
                                value={clientEmail}
                                onChange={e => setClientEmail(e.target.value)}
                              />
                            </span>
                          </p>
                        </div>
                        <div className='col-sm-6'>
                          <p>
                            mobile:
                            <span>
                              <input
                                type='text'
                                name='client_phone'
                                id='client_phone'
                                className='form-control'
                                placeholder='123-456-7890'
                                value={clientPhone}
                                onChange={e => setClientPhone(e.target.value)}
                              />
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-sm-6'>
                          <p>
                            country:
                            <span>
                            <select id="country" value={clientCountry} className="form-control" onChange={handleChangeCountry}>
  <option value="">-- Select --</option>
  {country_data.map((country, index) => (
    <option
      key={index}
      value={country.country}
     
    >
      {country.country} - {country.flag}
   </option>
  ))}
</select>

                              {/* <input
                                type='text'
                                name='client_country'
                                id=''
                                className='form-control'
                                placeholder='United Kingdom'
                                value={clientCountry}
                                onChange={e => setClientCountry(e.target.value)}
                              /> */}
                            </span>
                          </p>
                        </div>
                        <div className='col-sm-6'>
                          <p>
                            time zone:
                            <span>
                              <input
                                type='text'
                                name='client_zone'
                                id=''
                                className='form-control'
                                placeholder='London GMT'
                                value={clientTimeZone}
                                onChange={e => setClientTimeZone(e.target.value)}
                              />
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-sm-6'>
                          <p> 
                         
                            languages:
                            <span>
                            {/* <select id="language" value={clientLanguage} className="form-control"  onChange={e => setClientLanguage(e.target.value)}>
        <option value="">-- Select --</option>
        {selectedCountryLanguages.length > 0 && (

        selectedCountryLanguages.map((language, index) => (
          <option key={index} value={language}>
            {language} 
          </option>
        ))
        )}
      </select> */}
                              <input
                                type='text'
                                name='client_language'
                                id=''
                                className='form-control'
                                placeholder='English; French'
                                value={clientLanguage}
                                onChange={e => setClientLanguage(e.target.value)}
                              />
                            </span>
                          </p>
                        </div>
                      </div>
                  
                    </form>
                  </>
                ) : (
                  <>
                    <div className="row">
                      <div className="col-sm-6">
                        <p>
                          email:{" "}
                          <span>
                            {client ? <> {client.client_email} </> : null}
                          </span>
                        </p>
                      </div>
                      <div className="col-sm-6">
                        <p>
                        mobile:
                          <span>
                            {client ? <> {client.client_phone} </> : null}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <p>
                          country:{" "}
                          <span>
                            {client ? <> {client.client_country} </> : null}
                          </span>
                        </p>
                      </div>
                      <div className="col-sm-6">
                        <p>
                          time zone:{" "}
                          <span>
                            {client ? <> {client.client_zone} </> : null}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <p>
                          languages:{" "}
                          <span>
                            {client ? <> {client.client_language} </> : null}
                          </span>
                        </p>
                      </div>
                    </div>
                
                  </>
                )}
              </div>
      </div>
       
             {detailSaved && <Alert message={savedMsg} className='mt-4' type="success"/> }
             <br/>
      {editDetail ? (
                  <>
                 
      <p className="btn-p">
        <a href="#" className="btn btn-thulian-pink" onClick={() => saveD()}>
         save Details
        </a>
      </p>
      </>):
      <p className="btn-p">
      <a href="#" className="btn btn-thulian-pink" onClick={() => editD()}>
        edit my details
      </a>
    </p>}
      <p className="btn-p">
        <a href="/client/change-password" className="btn btn-orange">
          change password
        </a>
      </p>
    </div>
    {/*/ cl-coll */}
  </div>
  </div></Modal>
  </>


  ):(
<>
    <div className="row">
      <div className="col-12">
        
      {meeting.map((meet,index) => {

const meetingTimeParts = meet.meetingTime.split(':');
const meetingHour = parseInt(meetingTimeParts[0], 10);
const meetingMinute = parseInt(meetingTimeParts[1], 10);

// Create a Date object for the meeting time
const meetingDate = new Date();
meetingDate.setHours(meetingHour);
meetingDate.setMinutes(meetingMinute);
meetingDate.setSeconds(0); // Assuming seconds are always 0

// Calculate the time remaining in minutes
const currentTime = new Date();
const timeRemaining = Math.floor((meetingDate - currentTime) / 60000);
        return (
          meetindex == index && meetindex != null ? (
        <div className="meeting-reminder">
          <div className="info">
            <div className="title">upcoming meeting reminder </div>
            <p>{timeRemain} minutes: {mycoach ? mycoach[0].coach_name : null }</p>
          </div>
          <div className="meeting-link">
            <a href="#">join</a>
            <a href="#">dismiss</a>
          </div>
        </div>
          ):null 

       );
})}
        <div className="client-name mrb-50">
          <div className="info-name mrb-10">
            <h2>welcome  {client ? <> {clientFirebaseFirstName} </> : null}</h2>
            <img src="../../images/clients-01.png" alt="" />
          </div>
          <p className="btn-p text-center">
            <a href="#" className="btn btn-maroon" onClick={toggleProfile}>
              view my profile
            </a>
          </p>
        </div>
        <div className="session-info mrb-50">
          <h4 className="mrb-15">next session</h4>
          <p className="text-center btn-p">
            <a href="#" className="btn btn-orange" onClick={showModal}>
              view session history
            </a>
          </p>
          <p className="text-center btn-p">
            <a href="#" className="btn btn-lightgreen" onClick={scheduleNewSes}>
              book a new session
            </a>
          </p>
        </div>
        <div className="session-info mrb-50">
          <h4 className="mrb-15">my plan</h4>
          
          {fireData.map((data) => {
            
                  return (
                    <>
          <div className={` ${data.plan_id === clientPlanId ? 'remaining-info mrb-20' : 'probono-text mrb-20'}`}>
            <h3>
            {data.plan_name}  {data.plan_id === clientPlanId ?<span>{ clientRemainingSession}/{clientTotalSession} remaining</span>: null}
            </h3>
            <p>
            {data.plan_desc}
            </p>
          </div>
          <p className="text-center btn-p mrb-30">
          { data.plan_id == requestPlanId ?
            <a href="#" data-plan-id={data.plan_id} data-price={data.bundle_price} className="btn btn-chestnutred"  onClick={data.plan_id === clientPlanId ? buyMore : addNewRequest}>
            {data.plan_id === clientPlanId ? 'Buy Again' : 'Requested'}
            </a>: 

<a href="#" data-plan-id={data.plan_id} data-price={data.bundle_price} className="btn btn-chestnutred"  onClick={data.plan_id === clientPlanId ? buyMore : addNewRequest}>
{data.plan_id === clientPlanId ? 'Buy Again' : 'Request'}
</a> }
          </p>
          </>
                  );
                })}

       
         
          
         
      
        </div>
        {/*/ session-info */}
        <div className="notes-list mrb-50">
          <h4 className="mrb-15">my notes</h4>
          <div className="notes-search mrb-20">
            <form>
              <input
                type="text"
                name="keyword"
                className="form-control"
                placeholder="search"
                onKeyUp={handleSearch}
              />
              <i
                className="fa fa-fw fa-search"
                title="search"
                aria-hidden="true"
              />
            </form>
          </div>
          <div className="file-list">
            <div className="file-list-scroll">

            {allFiles.length> 0 ? allFiles.map((myfile, index) => {
             return (
              myfile.fileName.toLowerCase().indexOf(SearchVal.toLowerCase()) !== -1
              ? 
              <div className="file-box">
                <a href={myfile.resourceURL} className="file-link" target="_blank" />
                <div className="inner">
                  <figure>
                    <img src="../../images/file-icon.jpg" alt="" />
                  </figure>
                  <h4>
                  {myfile.fileName}<span>{myfile.uploadDate}</span>
                  </h4>
                  <figure className="download-right">
                    <img src="../../images/download.png" alt="" />
                  </figure>
                </div>
              </div>

:null

);
}): <div className="file-box" style={{'text-align':'center'}}>No File Found </div>
}

        
            </div>
            {/*/ file-list-scroll */}
          </div>
          {/*/ file-list */}
        </div>
        {/*/ notes-search */}
        <div className="session-info mrb-50">
          <h3>a coach’s responsibility is to:</h3>
          <ul className="mrb-30">
            <li>create a safe and thought- provoking space;</li>
            <li>explore and clarify what you want to achieve;</li>
            <li>draw out your solutions and strategies;</li>
            <li>promote accountability for the process and results;</li>
            <li>encourage self- discovery throughout.</li>
          </ul>
          <h3>a client’s responsibility is to:</h3>
          <ul>
            <li>show up with a curious &amp; open mind;</li>
            <li>embrace self- discovery;</li>
            <li>take inspired action;</li>
            <li>hold yourself accountable for the process and results.</li>
          </ul>
        </div>
        {/*/ notes-search */}
        <div className="help-form">
          <h3>how can we help?</h3>
          <p>
          {help ? help[0].helpText : null }
          </p>
        
          <form onSubmit={(e) => e.preventDefault()}
                  ref={formMobile}>
            <div className="form-group">
              <textarea
                className="form-control"
                placeholder="message"
                defaultValue={""}
                onChange={(event) => sethelpText(event.target.value)} value={helpText}
              />
            </div>
            <input type="hidden" name="message" value={helpText}/>
                    <input type="hidden" name="name" value={client.client_name}/>
                    {ShowHelpErr && <Alert message="Message Can't be Empty" className='mt-4' type="error"/> }
                    {ShowHelpSuccess && <Alert message="Message Sent" className='mt-4' type="success"/> }<br/>
                    {/* {ShowHelpErr ?  <b>Message Can't be Empty </b> : null } */}
            <div className="form-group form-btn">
              <button className="btn btn-send" onClick={sendHelpMsg}>send</button>
            </div>
            <div className="form-group form-btn">
              <button className="btn btn-chat">
                <i className="fa fa-whatsapp" /> chat now
              </button>
            </div>
          </form>
        </div>
      </div>
    
    </div>
  
</>
  )}
  </div>
  
</section>






</>
  );
};

export default Dashboard;
