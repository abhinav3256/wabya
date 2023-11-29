// import Link from 'next/link'
import Link from 'next/link'
import { useEffect,useState } from 'react'

import { useRouter } from 'next/router'
import { app,database } from '../../../firebaseConfig'
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  where,
  query,
} from "firebase/firestore";
import { Numeric0CircleOutline } from 'mdi-material-ui';
import DataTable from '../../components/Datatable';
import DataTable2 from '../../components/Datatable2';


function isSameMonth(date, targetMonth, targetYear) {
  const meetingDate = new Date(date.seconds * 1000); // Assuming 'seconds' is a Unix timestamp
  console.log('date', meetingDate.getMonth()); // Adding 1 to get the correct month
  console.log('target month', targetMonth); // Adding 1 to get the correct month
  return (
    meetingDate.getMonth() == targetMonth 
  );
}


function getCurrentMonthWeeks(year, month) {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const weeks = [];
  let currentWeekStart = new Date(firstDayOfMonth);

  // Find the next Friday or the first day of the month
  while (currentWeekStart.getDay() !== 5 && currentWeekStart <= lastDayOfMonth) {
    currentWeekStart.setDate(currentWeekStart.getDate() + 1);
  }

  if (currentWeekStart.getDate() === 1) {
    // First week starts on Friday
    const currentWeekEnd = new Date(currentWeekStart);
    currentWeekEnd.setDate(currentWeekStart.getDate() + 9);

    const startDay = '01';
    const endDay = currentWeekEnd.getDate().toString().padStart(2, '0');
    const weekHeader = `${startDay} - ${endDay}`;

    weeks.push(weekHeader);

    currentWeekStart.setDate(currentWeekStart.getDate() + 10);
  }

  while (currentWeekStart <= lastDayOfMonth) {
    const currentWeekEnd = new Date(currentWeekStart);
    currentWeekEnd.setDate(currentWeekStart.getDate() + 6);

    const startDay = currentWeekStart.getDate().toString().padStart(2, '0');
    const endDay = currentWeekEnd.getDate().toString().padStart(2, '0');
    const weekHeader = `${startDay} - ${endDay}`;

    weeks.push(weekHeader);

    currentWeekStart.setDate(currentWeekStart.getDate() + 7);
  }

  // Check if the last day of the month is not included in the last week
  if (weeks[weeks.length - 1].split(' - ')[1] !== lastDayOfMonth.getDate().toString().padStart(2, '0')) {
    weeks[weeks.length - 1] = `${weeks[weeks.length - 1].split(' - ')[0]} - ${lastDayOfMonth.getDate().toString().padStart(2, '0')}`;
  }

  return weeks;
}


function getWeekRange(startDate, endDate) {
  const startDay = startDate.getDate();
  const startMonth = startDate.toLocaleString('default', { month: 'short' });
  const endDay = endDate.getDate();
  const endMonth = endDate.toLocaleString('default', { month: 'short' });

  return `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
}

function getDatesBetweenRange(weekRange) {
  const [startMonth, startDay, _, endMonth, endDay] = weekRange
    .replace(/,/g, '') // Remove commas
    .split(' '); // Split the string into an array of words

  const startDate = new Date(`${startMonth} ${startDay}, ${new Date().getFullYear()}`);
  const endDate = new Date(`${endMonth} ${endDay}, ${new Date().getFullYear()}`);

  const datesArray = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    datesArray.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return datesArray;
}



function generateDayLabels(startDate) {
  const dayLabels = [];
  for (let i = 0; i < 7; i++) {
    const currentDay = new Date(startDate);
    currentDay.setDate(startDate.getDate() + i);
    const dayName = currentDay.toLocaleString('default', { weekday: 'short' });
    const dayDate = currentDay.getDate();
    dayLabels.push(`${dayName} ${dayDate}`);
  }
  return dayLabels;
}

const generateDateRanges = (currentMonth, currentYear) => {
  const startDate = new Date(currentYear, currentMonth, 1);
  const endDate = new Date(currentYear, currentMonth + 1, 0);
  const dateRanges = [];

  let startOfWeek = startDate;

  while (startOfWeek <= endDate) {
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);

    // Ensure the end date is the last day of the month
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    endOfWeek.setDate(Math.min(endOfWeek.getDate(), lastDayOfMonth));

    const startDay = startOfWeek.getDate();
    const endDay = endOfWeek.getDate();

    let range;
    if (startDay <= 28) {
      range = `${startDay} - ${endDay}`;
    } else {
      range = `${startDay} - ${lastDayOfMonth}`;
    }

    dateRanges.push(range);

    startOfWeek.setDate(startOfWeek.getDate() + 7);
  }

  return dateRanges;
};


// const generateDateRanges = (currentMonth, currentYear) => {
//   const startDate = new Date(currentYear, currentMonth, 1);
//   const endDate = new Date(currentYear, currentMonth + 1, 0);
//   const dateRanges = [];

//   let startOfWeek = startDate;

//   while (startOfWeek <= endDate) {
//     const endOfWeek = new Date(startOfWeek);
//     endOfWeek.setDate(endOfWeek.getDate() + 6);

//     // Ensure the end date is the last day of the month
//     const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
//     endOfWeek.setDate(Math.min(endOfWeek.getDate(), lastDayOfMonth));

//     const startDay = startOfWeek.getDate();
//     const endDay = endOfWeek.getDate();

//     dateRanges.push(`${startDay} - ${endDay}`);

//     startOfWeek.setDate(startOfWeek.getDate() + 7);
//   }

//   return dateRanges;
// };
const Timesheet = () => {
  const router = useRouter()
  const clientRef = collection(database, "client_user");
  const [client, setClient] = useState(null);
  const [isActiveFilter, setIsActiveFilter] = useState('all');
  const currentDate = new Date();
  const [activeWeekIndex, setActiveWeekIndex] = useState(0);
  const weekRanges = [];
  const [meetingSession, setMeetingSession] = useState([]);
  
  const [datesArray, setdatesArray] = useState([]);
  const currentWeekStart = new Date(currentDate);
  currentWeekStart.setDate(currentWeekStart.getDate() - currentDate.getDay() + 1);
  
  // Move to the start of the week 4 weeks ago
  currentWeekStart.setDate(currentWeekStart.getDate() - 28);
  
  // const weekRanges = [];
  
  for (let i = 0; i < 5; i++) {
    const weekStart = new Date(currentWeekStart);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
  
    weekRanges.push(getWeekRange(weekStart, weekEnd));
  
    // Move to the next week
    currentWeekStart.setDate(currentWeekStart.getDate() + 7);
  }

  const goToPreviousWeek = () => {
    if (activeWeekIndex > 0) {
      setActiveWeekIndex(activeWeekIndex - 1);
    }
  };

  const goToNextWeek = () => {
    if (activeWeekIndex < weekRanges.length - 1) {
      setActiveWeekIndex(activeWeekIndex + 1);
    }
  };

  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentYear2, setCurrentYear2] = useState(currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentMonth2, setCurrentMonth2] = useState(currentDate.getMonth());
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];


  const months2 = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const [weeks, setWeeks] = useState(getCurrentMonthWeeks(currentYear, currentMonth));
 // Get date ranges for the current month
const weekDateRanges = generateDateRanges(currentMonth, currentYear);
  const activeWeek = weekRanges[activeWeekIndex];

  // Calculate the start date for the current active week
  const activeWeekStartDate = new Date(activeWeek.split(' - ')[0]);

  // Adjust the start date to the current day if it's later than the calculated start date
  const today = new Date();
  if (today > activeWeekStartDate) {
    activeWeekStartDate.setDate(today.getDate() -1);
  }

 // const dayLabels = generateDayLabels(activeWeekStartDate);
  const [dayLabels, setDayLabels] = useState([]);
   useEffect(() => {
    // Calculate day labels whenever activeWeekIndex changes
    const activeWeekStartDate = new Date(weekRanges[activeWeekIndex].split(' - ')[0]);
    setDayLabels(generateDayLabels(activeWeekStartDate));

    console.log(weekRanges[activeWeekIndex],'week range');
setdatesArray(getDatesBetweenRange(weekRanges[activeWeekIndex]));
  
  }, [activeWeekIndex]);
  useEffect(() => {
    // Update weeks whenever the currentMonth or currentYear changes
    const updatedWeeks = getCurrentMonthWeeks(currentYear, currentMonth);
    setWeeks(updatedWeeks);
    console.log(currentYear,'current year');
    console.log(currentMonth,'current month');
  }, [currentYear, currentMonth]);

  useEffect(() => {
    const token = sessionStorage.getItem('coachId')
console.log('abc');


    if(!token){
        router.push('/client/login')
    }else{
      getClients();
      getMeetingSession();
      console.log(client);
    }
}, [])



// Filter meeting sessions for the selected month
const filteredMeetingSessions = meetingSession.filter(
  meet => new Date(meet.meeting_start_time * 1000).getMonth() === currentMonth
);


const [currentWeek, setCurrentWeek] = useState(0);

// const getWeekDates = () => {
//   const firstDayOfMonth = new Date(currentYear2, currentMonth2, 1);
//   const startDay = (firstDayOfMonth.getDay() - 1 + 7) % 7; // Adjust for Sunday being index 0
//   const lastDateOfMonth = new Date(currentYear2, currentMonth2 + 1, 0).getDate();

//   const weekStart = currentWeek * 7 - startDay + 1;
//   const weekEnd = weekStart + 6;

//   return Array.from({ length: 7 }, (_, index) => weekStart + index <= lastDateOfMonth ? weekStart + index : null);
// };

// const getWeekDates = () => {
//   const firstDayOfMonth = new Date(currentYear2, currentMonth2, 1);
//   const startDay = firstDayOfMonth.getDay(); // Starting from 0 (Sunday) to 6 (Saturday)
//   const lastDateOfMonth = new Date(currentYear2, currentMonth2 + 1, 0).getDate();

//   let weekStart = currentWeek * 7 - startDay + 1;
//   weekStart = Math.max(1, weekStart);
//   weekStart = Math.min(weekStart, lastDateOfMonth);

//   const weekEnd = Math.min(weekStart + 6, lastDateOfMonth);

//   return Array.from({ length: 7 }, (_, index) => (weekStart + index) <= lastDateOfMonth ? weekStart + index : null);
// };

const getWeekDates = () => {
  const firstDayOfMonth = new Date(currentYear2, currentMonth2, 1);
  const startDay = firstDayOfMonth.getDay(); // Starting from 0 (Sunday) to 6 (Saturday)
  const lastDateOfMonth = new Date(currentYear2, currentMonth2 + 1, 0).getDate();

  let weekStart = currentWeek * 7 - (startDay - 1) + 1; // Adjusted this line
  weekStart = Math.max(1, weekStart);
  weekStart = Math.min(weekStart, lastDateOfMonth);

  const weekEnd = Math.min(weekStart + 6, lastDateOfMonth);

  return Array.from({ length: 7 }, (_, index) => (weekStart + index) <= lastDateOfMonth ? weekStart + index : null);
};





const weekDates = getWeekDates();
// Filter meeting sessions for the selected month
const filteredMeetingSessions2 = (a,b) =>{



return meetingSession.filter((meet) => {

  const meetingDate = new Date(meet.meeting_start_time * 1000);
  const meetingMonth = meetingDate.getMonth();
  const isMatchingMonth = meetingMonth === currentMonth;

  if (!isMatchingMonth) {
    return false;
  }

  

  const m_date= meetingDate.getDate();

  if(m_date >= a  && m_date <= b){
    return true;
  }
return false;



}

);

}


// Filter meeting sessions for the selected month
const filteredMeetingSessions3 = (a,b) =>{



  return meetingSession.filter((meet) => {
  
    const meetingDate = new Date(meet.meeting_start_time * 1000);
    const meetingMonth = meetingDate.getMonth();
    const isMatchingMonth = meetingMonth === currentMonth;
  
    if (!isMatchingMonth) {
      return false;
    }
  
    
  
    const m_date= meetingDate.getDate();
  
    if(m_date >= a  && m_date <= b){
      return true;
    }
  return false;
  
  
  
  }
  
  );
  
  }


  // Calculate earnings based on client plan
const calculateEarnings = (clientPlan) => {
  const noviceRate = 20; // Rate for novice clients per session
  const experiencedRate = 50; // Rate for experienced clients per session

  const sessions = filteredMeetingSessions3(1, 31); // Adjust the range as needed

  return sessions.reduce((totalEarnings, meet) => {
    if (meet.client_plan === clientPlan) {
      return totalEarnings + (clientPlan === 'novice' ? noviceRate : experiencedRate);
    }

    return totalEarnings;
  }, 0);
};

// Calculate total duration in minutes for the hardcoded "36 HOURS"
const totalDurationMinutes = filteredMeetingSessions.length * 30; // Assuming 1 meeting session is 30 minutes

// Convert total duration to hours
const totalDurationHours = totalDurationMinutes / 60;

// Calculate total earnings for the hardcoded "$000.00"
const totalEarnings = filteredMeetingSessions.length * 20; // Assuming $20 per session


  const getClients = async () => {
    const queryDoc = query(clientRef, where("assign_coach_id", "==",  sessionStorage.getItem('coachId')));
  
      await getDocs(queryDoc).then((response) => {
        setClient(
          response.docs.map((data) => {
            return { ...data.data(), client_id: data.id };
          })
        );
      });
  }


  const getMeetingSession = async () => {

    //console.log('testtt');
    
    const coachId = sessionStorage.getItem('coachId');
    const meetingSessionCollection = collection(database, 'meetingSession');
    const queryDoc = query(
      meetingSessionCollection,
      where('coach_id', '==', coachId),
      where('meeting_end', '==', 'yes')
    );
  
    try {
      const response = await getDocs(queryDoc);
      const sessionsData = response.docs.map((data) => {
        console.log(data.data());
        return { ...data.data(), meet_id: data.id };
      });
      setMeetingSession(sessionsData);
    } catch (error) {
      console.error(error);
    }
   
   
   }

   let probonoCount=0;
   let noviceCount =0;
   let experiencedCount=0;
  return (
    <> 
      <section className='timesheet timesheet-desktop lower-letter'>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-12 mrb-30'>
              <h2>weekly overview</h2>
            </div>
           <div className='timesheet-carousel'>
      <div className='row'>
        <div className='col-sm-1'>
          <div className='left-arrow' onClick={goToPreviousWeek}>
            <i className='fa fa-angle-left' aria-hidden='true'></i>
          </div>
        </div>
        <div className='col-sm-10'>
          <div className='center-arrow'>
            {weekRanges.map((week, index) => (
              <span key={index} className={index === activeWeekIndex ? 'active' : ''}>
                {week}
              </span>
            ))}
          </div>
        </div>
        <div className='col-sm-1'>
          <div className='right-arrow' onClick={goToNextWeek}>
            <i className='fa fa-angle-right' aria-hidden='true'></i>
          </div>
        </div>
      </div>
    </div>
            <div className='timesheet-buttons'>
              <div className='row'>
                <div className='col-sm-12'>
                  <button className='btn btn-one'>Experienced</button>
                  <button className='btn btn-two'>Novice</button>
                  <button className='btn btn-three'>Probono</button>
                </div>
              </div>
            </div>
            <div className='calendar-box'>
              <div className='row'>
                <div className='col-sm-12'>
                  <div className='table-responsive'>
                    <table className='table table-border'>
                      <tr>
                        {/* <td>
                          <div className='first'>
                            <p>
                              2 <span>hours</span>
                            </p>
                            <p>
                              $ <span>000.00</span>
                            </p>
                          </div>
                          <div className='second'>
                            <p>
                              4 <span>hours</span>
                            </p>
                            <p>
                              $ <span>000.00</span>
                            </p>
                          </div>
                        </td>
                        <td>
                          <div className='third'>
                            <p>
                              1 <span>hour</span>
                            </p>
                            <p>
                              $ <span>000.00</span>
                            </p>
                          </div>
                          <div className='second'>
                            <p>
                              2 <span>hours</span>
                            </p>
                            <p>
                              $ <span>000.00</span>
                            </p>
                          </div>
                        </td> */}


{meetingSession.map((m_session, index) => {
  const timestampInSeconds = m_session.meeting_date.seconds;

  const date = new Date(timestampInSeconds * 1000); // Convert seconds to milliseconds
  
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString(undefined, options);

  const date_=date.getDate();
  //console.log(formattedDate);
  
  //console.log(formattedDate);
return (
  <></>

)
})}
{datesArray.map((d_arr, index) => {
    const dateObject = new Date(d_arr); // Replace this with your actual Date object

    // Convert the Date object to a string
    const dateString = dateObject.getDate();
    const monthString = dateObject.getMonth() + 1;

    
      const probonoCount = meetingSession != null ? meetingSession.filter(meet => meet.client_plan === 'probono' && new Date(meet.meeting_date.seconds * 1000).getDate() == dateString && new Date(meet.meeting_date.seconds * 1000).getMonth() == monthString ).length : 0;
    
      const noviceCount = meetingSession != null ? meetingSession.filter(meet => meet.client_plan == 'novice' && new Date(meet.meeting_start_time.seconds * 1000).getDate() == dateString  ).length : 0;
    

      const experiencedCount = meetingSession != null ? meetingSession.filter(meet => meet.client_plan == 'experienced' && new Date(meet.meeting_start_time.seconds & 1000).getDate() == dateString  ).length : 0;
    
      return (
    
        <td key={index}>
            <div className='third'>
                <p>
                    {probonoCount}  <span>hour</span>
                </p>
                <p>
                £ <span>000.00</span>
                </p>
            </div>

            <div className='first'>
                <p>
                    {`${ (((filteredMeetingSessions2(dateString,dateString).filter(
        meet => meet.client_plan === 'novice'
      )).length * 30) / 60).toFixed(1)}`} <span>hours</span>
                </p>
                <p>
                £ <span>000.00</span>
                </p>
            </div>


            <div className='second'>
                <p>
                {`${ (((filteredMeetingSessions2(dateString,dateString).filter(
        meet => meet.client_plan === 'experienced'
      )).length * 30) / 60).toFixed(1)}`} <span>hours</span>
                </p>
                <p>
                £ <span>000.00</span>
                </p>
            </div>
        </td>
    );
})}
                        {/* <td>
                        <div className="first">
                            <p>3  <span>hours</span></p>
                            <p>$ <span>000.00</span></p>
                          </div>
                        </td>
                        <td>
                        <div className='first'>
                            <p>
                              2 <span>hour</span>
                            </p>
                            <p>
                              $ <span>000.00</span>
                            </p>
                          </div>
                          <div className='second'>
                            <p>
                              4 <span>hours</span>
                            </p>
                            <p>
                              $ <span>000.00</span>
                            </p>
                          </div>
                        </td>
                        <td>
                        <div className='first'>
                            <p>
                              1 <span>hour</span>
                            </p>
                            <p>
                              $ <span>000.00</span>
                            </p>
                          </div>
                        </td> */}
                        {/* <td></td> */}
                      </tr>
                      <tr className='week'>
                      {dayLabels.map((dayLabel, index) => (
              <th key={index}>
                <span>{dayLabel}</span>
              </th>
            ))}
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>


            <div className="client-overview">
              <div className="row">
                <div className="col-sm-12">
                  <h2>client overview</h2>
                </div>
                <div className="col-sm-12">
                <div className="month-overview-table">
                  <div className="table-responsive">
                    <table className="table table-month">
                      <thead>
                        <tr>

                          <th></th>
                          <th colSpan={6}><i className="fa fa-angle-left" onClick={() => {
                setCurrentMonth((prevMonth) => (prevMonth - 1 + 12) % 12);
                if (currentMonth === 0) {
                  setCurrentYear((prevYear) => prevYear - 1);
                }
              }}></i>  {" "}
              {months[currentMonth]}{" "} <i className="fa fa-angle-right" onClick={() => {
                setCurrentMonth((prevMonth) => (prevMonth + 1) % 12);
                if (currentMonth === 11) {
                  setCurrentYear((prevYear) => prevYear + 1);
                }
              }}></i></th>
                        </tr>

                     
                        {/* <tr>
                          <th>name</th>
                          <th>07 - 13</th>
                          <th>14 - 20</th>
                          <th>21 - 27</th>
                          <th>28 - 04</th>
                          <th>05 - 11 </th>
                          <th>total</th>
                        </tr> */}
                        <tr>
                        <th>name</th>  
          {/* {weeks.map((weekHeader, index) => (
            <th key={index}>{weekHeader}</th>
          ))} */}

{weekDateRanges.map((dateRange, index) => (
        <th key={index}>{dateRange}</th>
      ))}
        </tr>
                      </thead>
                      <tbody>
                      {client && client.map((cl, index) => {
      // Filter meeting sessions for the current client and selected month

      
      const clientMeetings = filteredMeetingSessions2(1,7).filter(
        meet => meet.client_id === cl.client_id
      );

      // Calculate total duration in minutes
      const totalDurationMinutes = clientMeetings.length * 30; // Assuming 1 meeting session is 30 minutes

      // Convert total duration to hours
      const totalDurationHours = totalDurationMinutes / 60;

      // Calculate earnings at $20 per session
      const earnings = clientMeetings.length * 20;

      return (
        <tr key={index}>
        <td className='bundle'>{cl.client_name}</td>

        <td>{`${ (((filteredMeetingSessions2(1,7).filter(
        meet => meet.client_id === cl.client_id
      )).length * 30) / 60).toFixed(1)} HOURS`}</td>

<td>{`${ (((filteredMeetingSessions2(8,14).filter(
        meet => meet.client_id === cl.client_id
      )).length * 30) / 60).toFixed(1)} HOURS`}</td>


<td>{`${ (((filteredMeetingSessions2(15,21).filter(
        meet => meet.client_id === cl.client_id
      )).length * 30) / 60).toFixed(1)} HOURS`}</td>



<td>{`${ (((filteredMeetingSessions2(22,28).filter(
        meet => meet.client_id === cl.client_id
      )).length * 30) / 60).toFixed(1)} HOURS`}</td>


<td>{`${ (((filteredMeetingSessions2(29,31).filter(
        meet => meet.client_id === cl.client_id
      )).length * 30) / 60).toFixed(1)} HOURS`}</td>

       
       
        
        
      </tr>
    );
  })}
    <tr>
                          <td colSpan={3}></td>
                          <td> <strong>Total</strong></td>
                          <td>{`${ (((filteredMeetingSessions3(1,31)).length * 30) / 60).toFixed(1)} HOURS`}</td>

                         
                          <td> <strong>Total</strong> <span>£{ calculateEarnings('novice') + calculateEarnings('experienced')}.00</span></td>

                        </tr>
                      </tbody>
                    </table>
                  </div>
                 </div>

                </div>
              </div>
            </div>

            <DataTable datesArray={datesArray} meetingSession={meetingSession} />
     
          </div>
        </div>
      </section>


   
      
  <section className="user-time-table timesheet-mobile">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="table-heading">
            <div className="info">
              <h2>weekly overview</h2>
              <p>{" "}
              {months2[currentMonth2]}{" "}</p>
              <div className="indicator-btn">
                <a className="page-link1" href="#" aria-label="Previous" onClick={(e) => {
              e.preventDefault();
                setCurrentMonth2((prevMonth) => (prevMonth - 1 + 12) % 12);
                if (currentMonth2 === 0) {
                  setCurrentYear2((prevYear) => prevYear - 1);
                }
              }}>
                  <img src="../../images/timetable-prev.png" alt="" />
                </a>
                <a className="page-link1" href="#" aria-label="Next" onClick={(e) => {
              e.preventDefault();
                setCurrentMonth2((prevMonth) => (prevMonth + 1 + 12) % 12);
                if (currentMonth2 === 11) {
                  setCurrentYear2((prevYear) => prevYear + 1);
                }
              }}>
                  <img src="../../images/timetable-next.png" alt="" />
                </a>
              </div>
            </div>
          </div>
          <div className="time-table-sec">
            <div className="info">
              <a className="page-link1" href="#" aria-label="Previous">
                <img src="../../images/timetable-prev.png" alt=""onClick={(e) => {
        e.preventDefault();
        if (currentWeek === 0) {
          setCurrentMonth2((prevMonth) => (prevMonth - 1 + 12) % 12);
          if (currentMonth2 === 0) {
            setCurrentYear2((prevYear) => prevYear - 1);
          }
          setCurrentWeek(4);
        } else {
          setCurrentWeek((prevWeek) => prevWeek - 1);
        }
      }}/>
              </a>
              <a className="page-link1" href="#" aria-label="Next">
                <img src="../../images/timetable-next.png" alt=""   onClick={(e) => {
        e.preventDefault();
        if (currentWeek === 4) {
          setCurrentMonth2((prevMonth) => (prevMonth + 1) % 12);
          if (currentMonth2 === 11) {
            setCurrentYear2((prevYear) => prevYear + 1);
          }
          setCurrentWeek(0);
        } else {
          setCurrentWeek((prevWeek) => prevWeek + 1);
        }
      }} />
              </a>
              <table className="table">
                <tbody>
                  <tr>
                    <th>SUN</th>
                    <th>MON</th>
                    <th>TUE</th>
                    <th>WED</th>
                    <th>THUS</th>
                    <th>FRI</th>
                    <th>SAT</th>
                  </tr>
                  
            
                  <tr>
      {weekDates.map((day, index) => (
        <td key={index}>
          {day != null ? day : ''}
        </td>
      ))}
    </tr>
        
          
                  <tr>
                    <td>
                      <div className="box">
                        <span>0 h</span>
                        <span>£0 0 0</span>
                      </div>
                      <div className="box">
                        <span>0 h</span>
                        <span>£0 0 0</span>
                      </div>
                    </td>
                    <td>
                      <div className="box">
                        <span>0 h</span>
                        <span>£0 0 0</span>
                      </div>
                      <div className="box">
                        <span>0 h</span>
                        <span>£0 0 0</span>
                      </div>
                    </td>
                    <td>
                      <div className="box">
                        <span>0 h</span>
                        <span>£0 0 0</span>
                      </div>
                      <div className="box">
                        <span>0 h</span>
                        <span>£0 0 0</span>
                      </div>
                    </td>
                    <td>
                      <div className="box">
                        <span>0 h</span>
                        <span>£0 0 0</span>
                      </div>
                      <div className="box">
                        <span>0 h</span>
                        <span>£0 0 0</span>
                      </div>
                    </td>
                    <td>
                      <div className="box">
                        <span>0 h</span>
                        <span>£0 0 0</span>
                      </div>
                      <div className="box">
                        <span>0 h</span>
                        <span>£0 0 0</span>
                      </div>
                    </td>
                    <td>
                      <div className="box">
                        <span>0 h</span>
                        <span>£0 0 0</span>
                      </div>
                      <div className="box">
                        <span>0 h</span>
                        <span>£0 0 0</span>
                      </div>
                    </td>
                    <td>
                      <div className="box">
                        <span>0 h</span>
                        <span>£0 0 0</span>
                      </div>
                      <div className="box">
                        <span>0 h</span>
                        <span>£0 0 0</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="client-sec">
            <h2>client overview</h2>
            <a className="page-link1 prev" href="#" aria-label="Previous" onClick={(e) => {
              e.preventDefault();
                setCurrentMonth((prevMonth) => (prevMonth - 1 + 12) % 12);
                if (currentMonth === 0) {
                  setCurrentYear((prevYear) => prevYear - 1);
                }
              }}>
              <img src="../../images/timetable-prev.png" alt="" />
            </a>
            <a className="page-link1 next" href="#" aria-label="Next" onClick={(e) => {
              e.preventDefault();
                setCurrentMonth((prevMonth) => (prevMonth + 1) % 12);
                if (currentMonth === 11) {
                  setCurrentYear((prevYear) => prevYear + 1);
                }
              }}>
              <img src="../../images/timetable-next.png" alt="" />
            </a>
            <table className="table">
              <tbody>
                <tr>
                  <th />
                  <th colSpan={2}>{" "}
              {months[currentMonth]}{" "}</th>
                </tr>
                <tr>
                  <th>name</th>
                  <th>hours</th>
                  <th>earning</th>
                </tr>
                {client && client.map((cl, index) => {
      // Filter meeting sessions for the current client and selected month
      const clientMeetings = filteredMeetingSessions.filter(
        meet => meet.client_id === cl.client_id
      );

      // Calculate total duration in minutes
      const totalDurationMinutes = clientMeetings.length * 30; // Assuming 1 meeting session is 30 minutes

      // Convert total duration to hours
      const totalDurationHours = totalDurationMinutes / 60;

      // Calculate earnings at $20 per session
      const earnings = clientMeetings.length * 20;

      return (
        <tr key={index}>
          <td className="aqua">{cl.client_name}</td>
          <td>{`${totalDurationHours.toFixed(1)} HOURS`}</td>
          <td>{`${earnings.toFixed(2)}`}</td>
        </tr>
      );
    })}
    {/* Total row */}
    <tr>
      <td />
      <td>{`${totalDurationHours.toFixed(1)} HOURS`}</td>
      {/* <td>{`$${totalEarnings.toFixed(2)}`}</td> */}
      <td>£{ calculateEarnings('novice') + calculateEarnings('experienced')}.00</td>
    </tr>
              </tbody>
            </table>
            <div className="month-sec">
              <h2>month overview</h2>
              <table className="table ">
                <tbody>
                  <tr>
                    <th>package</th>
                    <th>hours</th>
                    <th>earning</th>
                  </tr>


                  {/* {datesArray.map((d_arr, index) => {
    const dateObject = new Date(d_arr); // Replace this with your actual Date object

    // Convert the Date object to a string
    const dateString = dateObject.getDate();
    const monthString = dateObject.getMonth();
const timestampToMatch = dateObject.getTime() / 1000;
    // Filter meeting sessions based on client_plan
    const probonoCount = meetingSession != null ? meetingSession.filter(meet => meet.client_plan === 'probono').length : 0;
    const noviceCount = meetingSession != null ? meetingSession.filter(meet => meet.client_plan === 'novice').length : 0;
    const experiencedCount = meetingSession != null ? meetingSession.filter(meet => meet.client_plan === 'experienced').length : 0;

                  })} */}
                  {/* <tr>
                    <td className="aqua">probono</td>
                    <td>{probonoCount * 0.5 } HOURS</td>
                    <td>$000.00</td>
                  </tr>
                  <tr>
                    <td className="orange">novice</td>
                    <td>{noviceCount * 0.5} HOURS</td>
                    <td>${noviceCount * 20}</td>
                  </tr>
                  <tr>
                    <td className="pink">experinced</td>
                    <td>{experiencedCount * 0.5} HOURS</td>
                    <td>${experiencedCount * 20}</td>
                  </tr>
                  <tr>
                    <td />
                    <td>total</td>
                    <td>$000.00</td>
                  </tr> */}







{datesArray.map((d_arr, index) => {
const dateObject = new Date(d_arr);
const dateString = dateObject.getDate();
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthString = monthNames[dateObject.getMonth()];
const timestampToMatch = dateObject.getTime() / 1000; 


const currentMonth = new Date().getMonth();

console.log('add', currentMonth);
const currentYear = new Date().getFullYear();

const probonoCount = meetingSession != null ? meetingSession.filter(meet => meet.client_plan === 'probono' && isSameMonth(meet.meeting_start_time, currentMonth, currentYear)).length : 0;
const noviceCount = meetingSession != null ? meetingSession.filter(meet => meet.client_plan === 'novice' && isSameMonth(meet.meeting_start_time, currentMonth, currentYear)).length : 0;
const experiencedCount = meetingSession != null ? meetingSession.filter(meet => meet.client_plan === 'experienced' && isSameMonth(meet.meeting_start_time, currentMonth, currentYear)).length : 0;




// const probonoCount = meetingSession != null ? meetingSession.filter(meet => meet.client_plan === 'probono').length : 0;
// const noviceCount = meetingSession != null ? meetingSession.filter(meet => meet.client_plan === 'novice').length : 0;
// const experiencedCount = meetingSession != null ? meetingSession.filter(meet => meet.client_plan === 'experienced').length : 0;

return (
  index === 0 ? (
      <>
          <tr>
              <td className='bundle'>probono </td>
              <td>{probonoCount} hours</td>
              <td>£00.00</td>
          </tr>
          <tr>
              <td className='pay'>novice</td>
              <td>{noviceCount * 0.5} hours</td>
              <td>£{noviceCount * 20}.00</td>
          </tr>
          <tr>
              <td className='probono'>experienced</td>
              <td>{experiencedCount * 0.5} hours</td>
              <td>£{experiencedCount * 50}.00</td>
          </tr>
          <tr>
              <td colSpan={2}></td>
              <td><strong>Total</strong> <span>£{(probonoCount * 0) + (noviceCount * 20)  + (experiencedCount * 50)}.00</span></td>
          </tr>
      </>
  ) : null
);
})}

                </tbody>
              </table>
            </div>
          </div>
          {/* <div className="mrb-20 time-table-btn">
            <p className="text-center btn-p">
              <a href="#" className="btn btn-lightgreen">
                view past payslip
              </a>
            </p>
            <p className="text-center btn-p">
              <a href="#" className="btn btn-chestnutred">
                query my timesheet
              </a>
            </p>
          </div> */}
           <DataTable2 datesArray={datesArray} meetingSession={meetingSession} />
        </div>
        {/*/ col-sm */}
      </div>
      {/*/ row */}
    </div>
  </section>
  {/*/ tag wrap */}
</>

 


   
  )
}

export default Timesheet
