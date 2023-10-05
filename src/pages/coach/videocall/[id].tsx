// ** React Imports
import { ReactNode, useState, useEffect,  useRef  } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'
import { database } from '../../../../firebaseConfig'
import { collection, query, addDoc, where, getDocs,doc,getDoc } from 'firebase/firestore';

import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"


// ** MUI Components
import Box from '@mui/material/Box'
import { Alert } from '@mui/material'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'


// ** Configs
import themeConfig from 'src/configs/themeConfig'

// // ** Layout Import
// import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import Image from 'next/image'

// material ui icons
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { useRoom } from '@daily-co/daily-react';
import DailyIframe from '@daily-co/daily-js';

const Videocall = () => {
  const [callObject, setCallObject] = useState(null);
  const router = useRouter()
  const callFrameRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState<boolean>(false);
  const { id } = router.query;
  const [client, setClient] = useState(null);

  const handleJoinCall = async () => {
    const callFrame = callFrameRef.current;

    const callObject = await DailyIframe.createFrame({
      url: 'https://abhinav19.daily.co/WaXrUT9b1ZxHb5bQfMFx',
      showLeaveButton: true,
      iframeStyle: {
        position: 'relative',
        width: '100%',
        height: '100%',
        border: 'none',
        backgroundColor: '#f6f6f6',
      },
      dailyConfig: {
        properties: {
          maxTraffic: 1,
          enableLayerSuspension: true,
          enableRtx: true,
        },
        apiKey: 'YOUR_API_KEY_HERE',
      },
    });

    callObject.join({ url: 'https://abhinav19.daily.co/WaXrUT9b1ZxHb5bQfMFx' });
    callObject.on('joined-meeting', async() => {
      console.log('A user has joined the meeting!');

      const coachId = sessionStorage.getItem('coachId');
      const userDocRef = collection(database, 'meetingSession');
      const logRef = collection(database, 'meetingLogs');
      const now = new Date();
      const unixTimestamp = now.getTime();

    //   addDoc(userDocRef, {
    //     client_id: clientIds,
    //     coach_id:client.assign_coach_id,
    //     client_start_time : unixTimestamp,
    //     client_end_time : '',
    //     meeting_date : now,
    //     meeting_start_time:now,
    //     meeting_id : id,
    //     client_leave: 'no'
       
    //   })
    //     .then(() => {
    //     console.log('testtt');

    //     // addDoc(logRef, {
    //     //   meeting_user_id: clientIds,
    //     //   join_time : unixTimestamp,
    //     //   coach_id:client.assign_coach_id,
         
    //     //   meeting_date : now,
    //     //   meeting_start_time:now,
    //     //   meeting_id : id
         
    //     // })
    //     //   .then(() => {
    //     //   console.log('testtt');
    //     //   })
    //     //   .catch((err) => {
    //     //     console.error(err);
    //     //   })
  
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     })

     
    });
    // Wait for the callObject's iframe property to become available
    await new Promise((resolve) => {
      const checkIframe = () => {
        if (callObject.iframe) {
          resolve();
        } else {
          //setTimeout(checkIframe, 100);

          setTimeout(checkIframe, 1000);
        }
      };
      checkIframe();
    });

    // Append the callObject's iframe to the container element

    const c = document.getElementById('__next');
const iframe = c.iframe;

c.replaceWith(iframe);
    //callFrame.replaceWith(callObject.iframe);
  };


  useEffect(() => {
    handleJoinCall();
    // let userId = sessionStorage.getItem("userId");
    // console.log('testt');

    // if (userId) {
    //   const fetchClient = async () => {
    //     const clientRef = doc(collection(database, "client_user"), userId);
    //     const clientDoc = await getDoc(clientRef);
    //     if (clientDoc.exists()) {
    //       setClient(clientDoc.data());

    //       // //console.log('here');
    //       //console.log(clientDoc.data);
    //     } else {
    //       //console.log("No client found");
    //     }
    //   };
    //   fetchClient();
    // }

    // if (!userId) {
    //   router.push("/client/login");
    // }

    // const token = sessionStorage.getItem('Token')
   


   
    
  }, []);

  return (
    <><div>
    <button onClick={handleJoinCall}>Join Call </button>
   
  </div>
   <div ref={callFrameRef}></div></>
    
  );
}

// Videocall.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default Videocall
