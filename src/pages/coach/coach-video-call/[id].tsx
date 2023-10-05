import React, { useEffect, useState, useRef } from 'react';
import DailyIframe from '@daily-co/daily-js';
// ** React Imports


// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'
import { database } from '../../../../firebaseConfig'
import { collection, query, addDoc, where, getDocs,doc,getDoc,updateDoc } from 'firebase/firestore';
import { request } from 'http';

const VideoCallPage = () => {
    const router = useRouter();
    const videoId=router.query.id;
  const [callObject, setCallObject] = useState(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const [meetId, setmeetId] = useState('');


  useEffect(() => {
    try {
      if (router.query.id !== undefined) {
        if (!iframeLoaded) {
          const createCallObject = async () => {

            const dynamicURL = `https://abhinav19.daily.co/${router.query.id}`;
            
            const callObj = await DailyIframe.createFrame({
              url: dynamicURL,
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

            callObj.join({ url: dynamicURL });

            // Set the iframe as loaded
            setIframeLoaded(true);
          };

          createCallObject();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [router.query.id, iframeLoaded]);

  useEffect(() => {
   console.log('meetId');
   console.log(meetId);
   console.log(videoId);
  }, [meetId]);

  useEffect(() => {
    if (callObject) {
      let mId='';
      callObject.on('joined-meeting', () => {
        console.log('A user has joined the meeting!');


        const coachId = sessionStorage.getItem('coachId');
        const userDocRef = collection(database, 'meetingSession');
       
        const now = new Date();
        const unixTimestamp = now.getTime();

        const collectionRef = collection(database, "meetingSession");
        const q = query(collectionRef, where("meeting_id", "==", router.query.id));
      
        
        getDocs(q)
        .then((querySnapshot) => {
          const updatePromises = [];
      
          querySnapshot.forEach((doce) => {
            const fieldToEdit = doc(database, "meetingSession", doce.id);
      
            // Push each update promise to the array
            updatePromises.push(
              updateDoc(fieldToEdit, {
                coachJoinTime: unixTimestamp,
                coachJoined:'yes',
                
                // ...
              })
            );
          });
      
          // Use Promise.all to update all documents concurrently
          return Promise.all(updatePromises);
        })
        .then(() => {
          console.log('All updates completed successfully.');
        })
        .catch((error) => {
          console.error('Error updating documents:', error);
        });
     
      
      
      
      
      
  
  
      });

      callObject.on('left-meeting', (event) => {
        console.log('Participant left:', event.participant);

        console.log(mId);

        const update = doc(collection(database, "meetingSession"), mId);
        const now = new Date();
        const unixTimestamp = now.getTime();
updateDoc(update, {
  client_leave: 'yes',
  client_end_time: unixTimestamp,
})
 


        
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
