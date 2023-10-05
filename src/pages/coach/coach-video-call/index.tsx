import React, { useEffect, useState, useRef } from 'react';
import DailyIframe from '@daily-co/daily-js';
// ** React Imports


// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'
import { database } from '../../../../firebaseConfig'
import { collection, query, addDoc, where, getDocs,doc,getDoc } from 'firebase/firestore';

const VideoCallPage = () => {
  const [callObject, setCallObject] = useState(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    if (!iframeLoaded) {
      const createCallObject = async () => {

        
        const callObj = await DailyIframe.createFrame({
          url: 'https://abhinav19.daily.co/WaXrUT9b1ZxHb5bQfMFx',
          showLeaveButton: true,
          iframeStyle: {
            position: 'absolute',
            top: '63px',
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            backgroundColor: '#f6f6f6',
          },
        });
        
        setCallObject(callObj);

        callObj.join({ url: 'https://abhinav19.daily.co/WaXrUT9b1ZxHb5bQfMFx' });

        // Set the iframe as loaded
        setIframeLoaded(true);
      };

      createCallObject();
    }
  }, [iframeLoaded]);

  useEffect(() => {
    if (callObject) {
      callObject.on('joined-meeting', () => {
        console.log('A user has joined the meeting!');


        const clientId = sessionStorage.getItem('userId');
        const userDocRef = collection(database, 'meetingSession');
        const logRef = collection(database, 'meetingLogs');
        const now = new Date();
        const unixTimestamp = now.getTime();
  
        addDoc(userDocRef, {
        //   client_id: clientId,
        //   coach_id:'5eNqmtJvs66IAgvXVWmE',
        //   client_start_time : unixTimestamp,
        //   client_end_time : '',
        //   meeting_date : now,
        //   meeting_start_time:now,
        //   meeting_id : 'WaXrUT9b1ZxHb5bQfMFx',
        //   client_leave: 'no'
         
        })
          .then(() => {
          console.log('testtt');
  
          // addDoc(logRef, {
          //   meeting_user_id: clientIds,
          //   join_time : unixTimestamp,
          //   coach_id:client.assign_coach_id,
           
          //   meeting_date : now,
          //   meeting_start_time:now,
          //   meeting_id : id
           
          // })
          //   .then(() => {
          //   console.log('testtt');
          //   })
          //   .catch((err) => {
          //     console.error(err);
          //   })
    
          })
          .catch((err) => {
            console.error(err);
          })
  
      });

      callObject.on('left-meeting', (event) => {
        console.log('Participant left:', event.participant);
      });
    }
  }, [callObject]);

  return (
    <>
      {iframeLoaded ? null : <h1>Loading...</h1>}
      <div id="iframeContainer"></div>
    </>
  );
};

export default VideoCallPage;
