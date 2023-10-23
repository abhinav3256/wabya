// ** Files Imports
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
// firebase config
import { database, storage } from '../../../../firebaseConfig'
import { collection, doc, updateDoc, getDoc,getDocs,where,query } from 'firebase/firestore'

import { useFormik } from 'formik';
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import MeetingReminder from '../../../components/MeetingRemainder';
import MeetingReminderMobile from '../../../components/MeetingRemainderMobile';

// ** MUI Components


const Dashboard = () => {

  const router = useRouter()
  const [coach, setCoach] = useState(null);
  const [coachId,setCoachId]=useState();

  const [accept_new_client,setAcceptNewUser]=useState(0);
  const [meeting, setMeeting] = useState([]);

  const [scheduleMeeting, setScheduleMeeting] = useState([]);
  const [newClient, setnewClient] = useState([]);
  useEffect(() => {

    const coachId = sessionStorage.getItem('coachId')
    setCoachId(coachId);

    if (coachId) {
      const fetchCoach = async () => {
        const coachRef = doc(collection(database, "coaches_user"), coachId);
        const coachDoc = await getDoc(coachRef);

        if (coachDoc.exists()) {
          setCoach(coachDoc.data());
        } else {
          console.log("No coach found");
        }
      };
      fetchCoach();
    }


    if(!coachId){
        router.push('/frontend/apply')
    }
}, [coachId])



const updateNewClientNotified = async (c_id: any) =>{
  console.log('notified',c_id);
  let a=0;

 

  
 



  const userDocRef = doc(collection(database, 'client_user'), c_id);

  const updatedData = {
    isNotified:1
  };
  await updateDoc(userDocRef, updatedData);
 // editAdmin();
 getNewClient();
}


const updateNotified = async (meet_id: any) =>{
  console.log('notified',meet_id);
  let a=0;

 

  
 



  const userDocRef = doc(collection(database, 'meeting'), meet_id);

  const updatedData = {
    isNotified:1
  };
  await updateDoc(userDocRef, updatedData);
 // editAdmin();
 getScheduleMeeting();
}



const handleChange = async () =>{
  console.log(accept_new_client);
  let a=0;

  if(accept_new_client == 0){
    setAcceptNewUser(1);
    a=1;
  }
  else{
    setAcceptNewUser(0);
    a=0;
  }

  
 


  const coachIds = sessionStorage.getItem('coachId');
  const userDocRef = doc(collection(database, 'coaches_user'), coachIds);

  const updatedData = {
    accept_new_client:a
  };
  await updateDoc(userDocRef, updatedData);
 // editAdmin();
  
}


useEffect(() => {
  console.log('testtt');

  const editAdmin = async () => {

   console.log('testtt');
    const coachIds = sessionStorage.getItem('coachId');
    const userCollection = collection(database, 'coaches_user');
    const userDocRef = doc(userCollection, coachIds);
    const userDoc = await getDoc(userDocRef);
    console.log(userDoc.data());
    setAcceptNewUser(userDoc.data().accept_new_client)
    
  
  
  }
  editAdmin();
}, []);
const getMeeting = async () => {

  console.log('testtt');
  const coachId = sessionStorage.getItem('coachId');
  const meetingSessionCollection = collection(database, 'meetingSession');
  const queryDoc = query(meetingSessionCollection, where("coach_id", "==", coachId), where("client_leave", "==", 'no'),where("coachJoined", "==", 'no'));

    await getDocs(queryDoc).then((response) => {
      setMeeting(
        response.docs.map((data) => {
          console.log(data.data());
          return { ...data.data(), meet_id: data.id };
        })
      );
    });
   
 
 
 }


 const getNewClient = async () => {

  console.log('testtt');
  const coachId = sessionStorage.getItem('coachId');
  const meetingSessionCollection = collection(database, 'client_user');
  const queryDoc = query(meetingSessionCollection, where("assign_coach_id", "==", coachId), where("isNotified", "==", 0));

    await getDocs(queryDoc).then((response) => {
      setnewClient(
        response.docs.map((data) => {
          console.log(data.data());
          return { ...data.data(), c_id: data.id };
        })
      );
    });
   
 
 
 }

 const getScheduleMeeting = async () => {

  console.log('testtt');
  const coachId = sessionStorage.getItem('coachId');
  const meetingSessionCollection = collection(database, 'meeting');
  const queryDoc = query(meetingSessionCollection, where("coachId", "==", coachId), where("isNotified", "==", 0));

    await getDocs(queryDoc).then((response) => {
      setScheduleMeeting(
        response.docs.map((data) => {
          console.log(data.data());
          return { ...data.data(), meet_id: data.id };
        })
      );
    });
   
 
 
 }
useEffect(() => {
  console.log('abc'); 
  const intervalId = setInterval(() => {
  //  Call your function here
   console.log('Function called!');

   getMeeting();
   getScheduleMeeting();
   getNewClient();
  }, 10000); // 10 seconds

  //Cleanup function to clear interval when component unmounts
return () => clearInterval(intervalId);
  
}, []);

  return (
    <>
  <MeetingReminderMobile
        meeting={meeting}
        newClient={newClient}
        scheduleMeeting={scheduleMeeting}
        updateNewClientNotified={updateNewClientNotified}
        updateNotified={updateNotified}
      />



    {
      coach ?
      (
          <>
          <section className="user-profile coach-dash-desktop">
            <div className="container">
              <div className="row">

                    <div className="col-sm-12 top">
                      <div className="inner-info">
                        <figure><img src={coach.coach_profile} alt={coach.coach_name} /></figure>

                              <h2>{coach.coach_name}</h2>

                      <div className="right-area">
                        <div className="accepting-info">
                        <span>Accepting New Clients</span>
                        <label className="switch">
  <input
    className="switch-input"
    type="checkbox"
    
    checked={accept_new_client !== 0}
    onChange={(e) => {
      if (e.target.checked) {
        setAcceptNewUser(1);

        const coachIds = sessionStorage.getItem('coachId');
  const userDocRef = doc(collection(database, 'coaches_user'), coachIds);

  const updatedData = {
    accept_new_client:1
  };
  updateDoc(userDocRef, updatedData);
      } else {
        setAcceptNewUser(0);
        const coachIds = sessionStorage.getItem('coachId');
        const userDocRef = doc(collection(database, 'coaches_user'), coachIds);
      
        const updatedData = {
          accept_new_client:0
        };
        updateDoc(userDocRef, updatedData);
      }
    }}
  />
  <span className={`switch-label  ${accept_new_client !== 0 ? 'btn-green' : 'btn-blue'}`} data-on="Yes" data-off="No"></span>
  <span className="switch-handle"></span>
</label>

                      </div>

                      <div className="dropdown">
                          <div className="inner">
                          <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Edit My Profile</button>
                          <ul className="dropdown-menu">
                            <li><Link href='/coach/edit-profile' passHref><a className="dropdown-item">Edit Profile</a></Link></li>
                          <li><Link href='/coach/change-password' passHref><a className="dropdown-item">Change Password</a></Link></li>
                          </ul>
                        </div>
                      </div>
                      </div>
                      </div>
                    </div> {/* <!--/ top --> */}

                    <div className="col-sm-4 left mrb-30">
                      <div className="info-grid">
                      {/* <p>Information</p> */}
                      <p>Contact details <span><a href={`mailto:${coach.coach_email}`}>{coach.coach_email}</a></span></p>
                      <p>Time zone <span>{coach.coach_timezone}</span></p>
                      <p>Languages <span>{coach.coach_language}</span></p>

                      </div>
                    </div> {/* <!--/ left --> */}

                    <div className="col-sm-8 right mrb-30">
                      <div className="info-grid">
                      <h3>Bio</h3>
                      <p>{coach.coach_bio}</p>
                      <h3>About</h3>
                      <p>{coach.coach_about}</p>

                      </div>
                    </div> {/* <!--/ left --> */}
              </div> {/* <!--/ row --> */}
            </div>
          </section>
          </>
      ) : null
    }

  <section className="user-detail coach-dash-mobile">
    <div className="container">
      <div className="row">

  



<MeetingReminder
        meeting={meeting}
        newClient={newClient}
        scheduleMeeting={scheduleMeeting}
        updateNewClientNotified={updateNewClientNotified}
        updateNotified={updateNotified}
      />
        <div className="col-12">
       { coach ?
      (
        <>
          <div className="user-profile  mrb-20">
            <figure>
              <img src={coach.coach_profile} alt="" />
            </figure>
            <h3>{coach.coach_name}</h3>
            <div className="accepting-info mrb-20">
              <span>accepting new clients</span>
              <label className="switch">
                <input className="switch-input" type="checkbox" checked={accept_new_client !== 0}
    onChange={(e) => {
      if (e.target.checked) {
        setAcceptNewUser(1);

        const coachIds = sessionStorage.getItem('coachId');
  const userDocRef = doc(collection(database, 'coaches_user'), coachIds);

  const updatedData = {
    accept_new_client:1
  };
  updateDoc(userDocRef, updatedData);
      } else {
        setAcceptNewUser(0);
        const coachIds = sessionStorage.getItem('coachId');
        const userDocRef = doc(collection(database, 'coaches_user'), coachIds);
      
        const updatedData = {
          accept_new_client:0
        };
        updateDoc(userDocRef, updatedData);
      }
    }} />
    <span className={`switch-label  ${accept_new_client !== 0 ? '' : 'btn-blue'}`} data-on="Yes" data-off="No"></span>

                {/* <span className="switch-label" data-on="Yes" data-off="No" /> */}
                <span className={`switch-handle ${accept_new_client !== 0 ? 'green-background' : ''}`} />
              </label>
            </div>
            <div className="user-bio">
              <ul className="row">
                <li className="col-12">
                  <span className="bold">information</span>
                </li>
                <li className="col-6">
                  <span className="bold">email:</span>{" "}
                  <span>
                    <a href="#">{coach.coach_email}</a>
                  </span>
                </li>
                <li className="col-6">
                  <span className="bold">time zone</span>{" "}
                  <span>{coach.coach_timezone}</span>
                </li>
                <li className="col-12">
                  <span className="bold">languages</span>{" "}
                  <span>{coach.coach_language}</span>
                </li>
                <li className="col-12">
                  <span className="bold">bio </span> {coach.coach_bio}
                </li>
                <li className="col-12">
                  <span className="bold">about </span> {coach.coach_about}
                </li>
              </ul>
            </div>
          </div>
          </>
      ):null }
          <p className="btn-p">
          <div className="btn btn-thulian-pink">
  <Link href="/coach/edit-profile">
    <a className='edit-profile-mob'>edit my details</a>
  </Link>
</div>
          </p>
          <p className="btn-p">
            <a href="/coach/change-password" className="btn btn-orange">
              change password
            </a>
          </p>
        </div>
        {/*/ cl-coll */}
      </div>
      {/*/ row */}
    </div>
  </section>
  {/*/ user */}

    
    </>

  )
}

export default Dashboard
