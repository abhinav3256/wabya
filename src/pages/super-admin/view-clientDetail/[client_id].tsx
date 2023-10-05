// old [client_id].tsx

// ** MUI Imports
import { useRouter } from 'next/router'
import { database } from '../../../../firebaseConfig'
import React, { useEffect, useState } from "react";
import { collection, getDoc, doc } from "firebase/firestore";


const ViewBasic = () => {

  const router = useRouter();
  const [clientData, setClientData] = useState(null);
  const [coachData, setCoachData] = useState(null);

  const [planData, setPlanData] = useState(null);

  // get single client data
  useEffect(() => {
    const getClientData = async () => {
      try{
        if (router.query.client_id !== undefined) {

          const clientRef = doc(collection(database,"client_user"),router.query.client_id );
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
    getClientData();
  }, [router.query.client_id]);



    


  return (

    <section className="client-profile">
    <div className="container">
      <div className="row">
      <div className="col-sm-12 top">
        <div className="inner-info">
          <figure><img src={`${router.basePath}/images/clients-01.png`} alt=""/></figure>
          <h2> {!clientData ? null : clientData.client_name} <span>Private</span></h2>

        <div className="right-area">
          <p><a href="#" className="btn">Start Call</a></p>
        </div>
        </div>
      </div>

      <div className="col-sm-4 left mrb-30">
        <div className="info-grid">
        <p>Contact Details</p>
        <p>Assign Coach: <span>{!coachData ? null : coachData.coach_name}</span></p>
        <p>Email: <span><a href="mailto:name@gmail.com">{!clientData ? null : clientData.client_email}</a></span></p>
        <p>Time Zone: <span>{!clientData ? null : clientData.client_zone }</span></p>
        <p>Current Package <span>{!planData ? null : planData.plan_name}</span></p>
        <p>Last Session: <span>10 November 2023</span></p>
        <p>Completed Sessions: <span>00</span></p>
        <p>Next Sessions: <span>Thursday</span><span>10 November 2023</span><span>09:30</span></p>
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

  )
}

export default ViewBasic
