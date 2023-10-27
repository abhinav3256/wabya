import React from 'react';
import Link from 'next/link'
const MeetingCancelled = ({ meetingCancel,updateMeetCancelNotified }) => {
  return (
    <>


    





{meetingCancel.length > 0 ? meetingCancel.map((meet, index) => (


<div className='row coach-dash-desktop' key={index}>
<div className='col-sm-12'>
<div className='client-reminder notification-desktop'>
<p>
Meeting Cancelled.
{/* <span>45 minutes : Coach Name</span> */}
</p>
<div className='dismiss' onClick={() => updateMeetCancelNotified(meet.c_id)}>


{/* <h5><Link href={`/coach/coach-video-call/${meet.meeting_id}`}>Join</Link></h5> */}

<i className="fa-solid fa fa-remove"></i>
</div>
</div>
</div>
</div> 

)) : null}






    </>
  );
};

export default MeetingCancelled;
