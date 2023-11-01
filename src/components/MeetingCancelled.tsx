import React from 'react';
import Link from 'next/link'
const MeetingCancelled = ({ cancelMeeting,updateCancelMeet }) => {
  return (
    <>


    





{cancelMeeting.length > 0 ? cancelMeeting.map((meet, index) => (


<div className='row coach-dash-desktop' key={index}>
<div className='col-sm-12'>
<div className='client-reminder notification-desktop'>
<p>
meeting cancelled by coach.
<span>date : {meet.meetingDate}</span>
<span>time : {meet.meetingTime} - {meet.meetingEndTime}</span>
</p>
<div className='dismiss' onClick={() => updateCancelMeet(meet.c_id)}>


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
