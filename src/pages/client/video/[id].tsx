import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DailyIframe from '@daily-co/daily-js';

const VideoCallPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    if (id && !iframeLoaded) {
      const callObject = DailyIframe.createFrame({
        url: `https://abhinav19.daily.co/${id}`,
        showLeaveButton: true,
        iframeStyle: {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none',
          backgroundColor: '#f6f6f6',
        },
      });

      callObject.join({ url: `https://abhinav19.daily.co/${id}` });

      // Set the iframe as loaded
      setIframeLoaded(true);
    }
  }, [id, iframeLoaded]);

  return (
    <>
      {iframeLoaded ? null : (
        
        <div>
            
       
     
          <h1>Loading...</h1>
        </div>
      )}
      <div id="iframeContainer"></div>
    </>
  );
};

export default VideoCallPage;
