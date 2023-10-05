import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { collection, doc, getDoc, addDoc } from 'firebase/firestore';
import { ref } from 'firebase/storage';
import DailyIframe from '@daily-co/daily-js';

const Videocall = () => {
  const [callObject, setCallObject] = useState(null);
  const router = useRouter();
  const callFrameRef = useRef(null);
  const [client, setClient] = useState(null);

  const handleJoinCall = async () => {
    const callFrame = callFrameRef.current;

    // Create a Daily.co iframe
    const callObject = await DailyIframe.createFrame({
      url: 'https://abhinav19.daily.co/KqvExLVQiJkMvx8ZkZ5B',
      // ... other options ...
    });

    // Join the call
    callObject.join({ url: 'https://abhinav19.daily.co/KqvExLVQiJkMvx8ZkZ5B' });

    // Event handler for a participant joining
    callObject.on('joined-meeting', async () => {
      console.log('A user has joined the meeting!');
      // ... your logic ...
    });

    // Event handler for a participant leaving
    callObject.on('left-meeting', (event) => {
      console.log('Participant left:', event.participant);
    });

    // Append the callObject's iframe to a container element
    const videoFrame = callFrameRef.current;
    videoFrame.appendChild(callObject.iframe);
  };

  useEffect(() => {
    // Fetch client data and update state
    const fetchClient = async () => {
      const userId = sessionStorage.getItem('userId');
      if (userId) {
        const clientRef = doc(collection(database, 'client_user'), userId);
        const clientDoc = await getDoc(clientRef);
        if (clientDoc.exists()) {
          setClient(clientDoc.data());
        }
      }
    };
    fetchClient();
  }, []);

  useEffect(() => {
    if (client != null) {
      handleJoinCall();
    }
  }, [client]);

  return (
    <div>
      {/* This button is for manual joining */}
      <button onClick={handleJoinCall}>Join Call</button>
      {/* The container for the Daily.co iframe */}
      <div ref={callFrameRef} id="videoFrame"></div>
    </div>
  );
};

export default Videocall;
