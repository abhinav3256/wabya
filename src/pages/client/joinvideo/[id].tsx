import React, { useEffect, useState, useRef } from 'react';
import DailyIframe from '@daily-co/daily-js';
// ** React Imports


// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'
import { database } from '../../../../firebaseConfig'
import { collection, query, addDoc, where, getDocs,doc,getDoc,updateDoc } from 'firebase/firestore';



const VideoCallPage = () => {
    const router = useRouter();
    const videoId=router.query.id;
  const [callObject, setCallObject] = useState(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const [notAuthMsg, setnotAuthMsg] = useState(false);
  const [meetId, setmeetId] = useState('');
  const [coachId, setcoachId] = useState('');
  const meetingRef = collection(database, "meeting");
  const [client, setClient] = useState(null);
  const [isSessionAvbl, setisSessionAvbl] = useState(false);
  

    // get all meeting data
    const getMeeting = async () => {
      const userId = sessionStorage.getItem("userId");
    
      const queryDoc = query(meetingRef, where("clientId", "==", userId),where("meetingName", "==", router.query.id), where("meetingApiCreated", "==", true));
    
      try {
        const querySnapshot = await getDocs(queryDoc);
    
        const meetings = querySnapshot.docs.map((data) => {
          return { ...data.data(), meeting_id: data.id };
        });
    
        // Now you can access the length of the meetings array
        const numberOfMeetings = meetings.length;
    
        return numberOfMeetings;
      } catch (error) {
        console.error("Error getting meetings: ", error);
        return 0; // Return 0 if there was an error
      }
    };
    
    useEffect(() => {
      let userId = sessionStorage.getItem("userId");
      
  
      if (userId) {
        const fetchClient = async () => {
          const clientRef = doc(collection(database, "client_user"), userId);
          const clientDoc = await getDoc(clientRef);
          if (clientDoc.exists()) {
            setClient(clientDoc.data());
  
            // //console.log('here');
            //console.log(clientDoc.data);
          } else {
            //console.log("No client found");
          }
        };
        fetchClient();
        
      }
  
      if (!userId) {
        router.push("/client/login");
      }
  
  
  
  
     
     
    }, [router.query.id]);


    useEffect(() => {
      
      if(client != null){
      console.log(client);
      console.log(client.remainingSession);

      if(client.remainingSession > 5){
        setisSessionAvbl(true);
      }
      }
  
  
  
     
     
    }, [client]);


  useEffect(() => {
    try {
      if (router.query.id !== undefined) {

        getMeeting()
  .then((numberOfMeetings) => {
    console.log("Number of meetings: ", numberOfMeetings);
  

  if(numberOfMeetings == 1 && isSessionAvbl){
    setnotAuthMsg(false);
        if (!iframeLoaded) {
          const createCallObject = async () => {
            const userIds = sessionStorage.getItem('userId');
            const userCollection = collection(database, 'client_user');
            const userDocRef = doc(userCollection, userIds);
            const userDoc = await getDoc(userDocRef);
            console.log(userDoc);
            console.log(userDoc.data().assign_coach_id);
            setcoachId(userDoc.data().assign_coach_id);
          
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
      else{
        setnotAuthMsg(true);
      }
    })
    .catch((error) => {
      console.error("Error: ", error);
      setnotAuthMsg(true);
    });
      }
    } catch (error) {
      console.log(error);
      setnotAuthMsg(true);
    }
 // }, [router.query.id, iframeLoaded,client]);
}, [isSessionAvbl]);

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


        const clientId = sessionStorage.getItem('userId');
        const userDocRef = collection(database, 'meetingSession');
        const logRef = collection(database, 'meetingLogs');
        const now = new Date();
        const unixTimestamp = now.getTime();

        
  
        addDoc(userDocRef, {
          client_id: clientId,
          coach_id:coachId,
          client_start_time : unixTimestamp,
          client_end_time : '',
          meeting_date : now,
          meeting_start_time:now,
          meeting_id : router.query.id,
          client_leave: 'no',
          meeting_end:'no',
          coachJoined:'no',
         
        })
          .then((docRef) => {
            console.log(docRef)
            console.log(docRef.id)
            setmeetId(docRef.id);
          console.log('testtt');
          mId=docRef.id;
  
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

        console.log(mId);

        const update = doc(collection(database, "meetingSession"), mId);
        const now = new Date();
        const unixTimestamp = now.getTime();
updateDoc(update, {
  client_leave: 'yes',
  client_end_time: unixTimestamp,
  meeting_end:'yes',
})
 


        
      });
    }
  }, [callObject]);

  return (
    <>
      {iframeLoaded  ? null :  !notAuthMsg ? <h3 className='loading-video'>Loading...</h3> : null }
      <div id="iframeContainer"></div>

      { notAuthMsg ?
      <div className="error-message-video">
  <h3>Sorry, you are not authorized to access this content.</h3>
 
</div>
    :null }
    </>
  );
};

export default VideoCallPage;
