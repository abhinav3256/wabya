// ** MUI Imports
import Link from 'next/link'
import { useRouter } from 'next/router'
import { database } from '../../../firebaseConfig'
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  where,
  query,
} from "firebase/firestore";
import clientDetail from 'src/pages/coach/clientDetail/[id]';
import { ConsoleNetworkOutline } from 'mdi-material-ui';



const ClientDetail = () => {

  
  const router = useRouter();
  const [clientData, setClientData] = useState(null);
  const [coachData, setCoachData] = useState(null);

  const [planData, setPlanData] = useState(null);
  const [file, setFile] = useState(null);
  
  const [showfile, setshowfile] = useState(false);
  
  const [allFiles, setAllFiles] = useState([]);
  const [meetingSession, setmeetingSession] = useState([]);
  const [SearchVal, setSearchVal] = useState('');
  const [meeting, setMeeting] = useState([]);
  const meetingRef = collection(database, "meeting");
  const [lastSessionDate, setLastSessionDate] = useState(null);

  

  
  function handleSearch(event) {
    console.log(event.target);
   setSearchVal(event.target.value);
//handleSubmit();

  }
  const getFiles = async () => {
    const meetRef = collection(database, "resources");
    const queryDoc = query(meetRef, where("parentId", "==", router.query.id));
  console.log('here i am');
    await getDocs(queryDoc).then((response) => {
      console.log(response.docs);
      setAllFiles(
        response.docs.map((data) => {
          return { ...data.data(), file_id: data.id };
        })
      );
     
      console.log(allFiles);
      setshowfile(true);
    });
  };

    // get all meeting data
    const getMeeting = async () => {
      const userId = sessionStorage.getItem("coachId");
  // Get the current date
const currentDate = new Date();
console.log(currentDate);
      const queryDoc = query(meetingRef, where("clientId", "==", router.query.id),where("meetingApiCreated", "==", true));
  
      await getDocs(queryDoc).then((response) => {
        setMeeting(
          response.docs.map((data) => {
            return { ...data.data(), meeting_id: data.id };
          })
        );
      });
  
   
    };

  const getMeetingSession = async () => {

    console.log('testtt');
    const coachId = sessionStorage.getItem('coachId');
    const meetingSessionCollection = collection(database, 'meetingSession');
    const queryDoc = query(meetingSessionCollection, where("client_id", "==", router.query.id),where("coach_id", "==", coachId));
  
      await getDocs(queryDoc).then((response) => {
        setmeetingSession(
          response.docs.map((data) => {
            console.log(data.data());
            return { ...data.data(), meet_id: data.id };
          })
        );
      });
     
   
   
   }

   useEffect(() => {
    // Get the last session's timestamp
    const lastSessionTimestamp = meetingSession.length > 0 ? meetingSession[0].client_start_time : null;

    // Format the date if a timestamp is available
    if (lastSessionTimestamp) {
      const date = new Date(lastSessionTimestamp);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = date.toLocaleDateString(undefined, options);
      setLastSessionDate(formattedDate);
    }
  }, [meetingSession]);







  useEffect(() => {
  
    console.log('abcd');
    if(meeting.length > 0){
      console.log('abcddd');
      console.log(meeting);
    }

  }, [meeting]);




  // get single client data
  useEffect(() => {
    const getClientData = async () => {
      try{

        console.log(router.query)
        if (router.query.id !== undefined) {

          const clientRef = doc(collection(database,"client_user"),router.query.id );
          const clientDoc = await getDoc(clientRef);

          if (clientDoc.exists()) {
            const clientData = clientDoc.data();
            setClientData(clientData);

            const coachRef = doc(collection(database,'coaches_user'),clientData.assign_coach_id);
            const coachDoc = await getDoc(coachRef);

            if (coachDoc.exists()) {
              const coachData = coachDoc.data();
              setCoachData(coachData);
            }



            const planRef = doc(collection(database,'admin_plans'),clientData.plan_id);
            const planDoc = await getDoc(planRef);

            if (coachDoc.exists()) {
              const planData = planDoc.data();

              console.log(planData);
              setPlanData(planData);
            }
          }
        }
      }catch (error) {
        console.log(error); 
      }
    };
    if (router.query.id !== undefined) {
    getClientData();
    getFiles();
    getMeetingSession();
    getMeeting();
    }
  }, [router.query.id]);


  return (

    <>
    <section className="client-profile cl-detail-desktop" >
      <div className="container">
        <div className="row">

        <div className="col-sm-12 top">
          <div className="inner-info">
            <figure><img src={`${router.basePath}/images/clients-01.png`} alt=""/></figure>
            <h2> {!clientData ? null : clientData.client_name} <span>{!clientData ? null : clientData.status}</span></h2>
          <div className="right-area">
            <p><a href="#" className="btn">Join Call</a></p>
            <p><Link href='/client-resources' passHref><a className="btn btn-resources">Resources</a></Link></p>
          </div>
          </div>
        </div>

        <div className="col-sm-4 left mrb-30">
          <div className="info-grid">
          <p>Contact details <span><a href="mailto:name@gmail.com">{!clientData ? null : clientData.client_email}</a></span></p>
          <p>Time zone <span>{!clientData ? null : clientData.client_zone }</span></p>
          <p>Current package <span>{!planData ? null : planData.plan_name }</span></p>
          <p>
    Last session {lastSessionDate ? <span>{lastSessionDate}</span> : "N/A"}
  </p>
          <p>Completed sessions  <span>{meetingSession.length === 0 ? "00" : meetingSession.length}</span></p>
          <p>Next sessions <span>Thursday</span><span>10 November 2023</span><span>09:30</span></p>
          </div>
        </div>

        <div className="col-sm-8 right mrb-30">


              <div className="info-grid">

          <div className="info-grid">


                <div className="client-light">
                    <div className="icons-bottom">
                      <span className="icons"><i className="fa fa-microphone-slash" aria-hidden="true"></i></span>
                      <span className="icons"><i className="fa fa-video-camera" aria-hidden="true"></i></span>
                      <span className="icons active"><i className="fa fa-phone" aria-hidden="true"></i></span>
                      <span className="icons"><i className="fa fa-arrows-alt" aria-hidden="true"></i></span>
                      <span className="icons"><i className="fa fa-bars" aria-hidden="true"></i></span>
                    </div>
                </div>
              </div>



      </div>
      </div>
        </div>
      </div>
    </section>

    <>
  <section className="user-detail cl-detail-mobile">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="user-profile mrb-60">
            <figure>
              <img src={`${router.basePath}/images/clients-01.png`} alt="" />
            </figure>
            <h3>
            {!clientData ? null : clientData.client_name} <span>{!clientData ? null : clientData.status}</span>
            </h3>
            <div className="user-bio">
              <ul className="row">
                <li className="col-6">
                  <span className="bold">email:</span>{" "}
                  <span>
                    <a href="mailto:name@gmail.com">{!clientData ? null : clientData.client_email}</a>
                  </span>
                </li>
                <li className="col-6">
                  <span className="bold">time zone</span>{" "}
                  <span>{!clientData ? null : clientData.client_zone}</span>
                </li>
                <li className="col-6">
                  <span className="bold">package</span>{" "}
                  <span>{!planData ? null : planData.plan_name }</span>
                </li>
                <li className="col-6">
                  <span className="bold">last session</span>{" "}
                  {lastSessionDate ? <span>{lastSessionDate}</span> : "N/A"}
                </li>
                <li className="col-12">
                  <span className="bold">completed sessions</span>{" "}
                  <span>{meetingSession.length === 0 ? "00" : meetingSession.length}</span>
                </li>
                <li className="col-12">
                <span className="bold">next session</span>{" "}
{
  (() => {
    const currentDate = new Date();
    let k = 0;

    for (let index = 0; index < meeting.length; index++) {
      const data = meeting[index];
      const meetingDate = new Date(data.meetingDate);

      if (meetingDate > currentDate && k === 0) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = meetingDate.toLocaleDateString(undefined, options);

        k = k + 1; // Increment k without printing

        return (
          <span key={index}>
            {formattedDate}
            <br />
            {data.meetingTime}
          </span>
        );
      }
    }

    return <span>No upcoming meetings</span>; // If no meeting meets the condition
  })()
}


              
                </li>
              </ul>
              <p className="btn-p">
                <a href="#" className="btn btn-thulian-pink">
                  start call
                </a>
              </p>
            </div>
          </div>
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
            
            <div className={allFiles.length == 0 || allFiles.every((myfile) =>
  myfile.fileName.toLowerCase().indexOf(SearchVal.toLowerCase()) === -1
) ? '' : 'file-list'}>
              <div className="file-list-scroll">

              {allFiles.length > 0 ? (
  allFiles.map((myfile, index) => {
    var file_name = myfile.fileName;

    if (file_name.indexOf(".")) {
      var ext_arr = file_name.split(".");

      if (ext_arr.length > 0) {
        var ext = ext_arr[ext_arr.length - 1];

        if (ext == 'png' || ext == 'jpg') {
          var image_ = "jpg";
          var img_ext = "png";
        } else if (ext == 'pdf') {
          var image_ = "pdf";
          var img_ext = "png";
        } else if (ext == 'mp4') {
          var image_ = "mp4";
          var img_ext = "png";
        } else {
          var image_ = "file-icon";
          var img_ext = "jpg";
        }
      } else {
        var image_ = "file-icon";
        var img_ext = "jpg";
      }
    }

    return (
      myfile.fileName.toLowerCase().indexOf(SearchVal.toLowerCase()) !== -1 ?
      (
        <div className="file-box" key={index}>
          <a href="#" className="file-link" target="_blank" />
          <div className="inner">
            <figure>
              <img src={`../../images/${image_}.${img_ext}`} alt="" />
            </figure>
            <h4>
              {myfile.fileName}<span>{myfile.uploadDate}</span>
            </h4>
            <figure className="download-right">
              <img src={`../../images/${image_}.${img_ext}`} alt="" />
            </figure>
          </div>
        </div>
      ) : null
    );
  })
) : (
  <div className='no-file'>No file found</div>
)}

{/* Add a condition to show "No file found" */}
{allFiles.length > 0 && allFiles.every((myfile) =>
  myfile.fileName.toLowerCase().indexOf(SearchVal.toLowerCase()) === -1
) ? (
  <div className='no-file'>No file found</div>
) : null}

                
           
                {/*/ file-box */}
              </div>
              {/*/ file-list-scroll */}
            </div>
            {/*/ file-list */}
          </div>
        </div>
        {/*/ cl-coll */}
      </div>
      {/*/ row */}
    </div>
  </section>
  {/*/ user */}
</>

    </>
  )
}

export default ClientDetail
