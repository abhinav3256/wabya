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
const Timesheet = () => {
  const router = useRouter()
  const clientRef = collection(database, "client_user");
  const [client, setClient] = useState(null);
  const [isActiveFilter, setIsActiveFilter] = useState('all');
  const currentDate = new Date();
  const [activeWeekIndex, setActiveWeekIndex] = useState(0);
  const weekRanges = [];

  // Calculate the start of the current week (always starting on Monday)
  const currentWeekStart = new Date(currentDate);
  currentWeekStart.setDate(currentWeekStart.getDate() - currentDate.getDay() + 1);

  for (let i = 1; i < 7; i++) {
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
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const [weeks, setWeeks] = useState(getCurrentMonthWeeks(currentYear, currentMonth));
 
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
  }, [activeWeekIndex]);
  useEffect(() => {
    // Update weeks whenever the currentMonth or currentYear changes
    const updatedWeeks = getCurrentMonthWeeks(currentYear, currentMonth);
    setWeeks(updatedWeeks);
  }, [currentYear, currentMonth]);

  useEffect(() => {
    const token = sessionStorage.getItem('coachId')
console.log('abc');


    if(!token){
        router.push('/pages/login')
    }else{
      getClients();
      console.log(client);
    }
}, [])

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
  return (
    <> 
      <section className='timesheet timesheet-desktop'>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-12 mrb-30'>
              <h2>Weekly Overview</h2>
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
                  <button className='btn btn-one'>PAYG</button>
                  <button className='btn btn-two'>Bundle</button>
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
                        <td>
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
                              2 <span>hours</span>
                            </p>
                            <p>
                              $ <span>000.00</span>
                            </p>
                          </div>
                        </td>
                        <td>
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
                        </td>
                        <td></td>
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
          {weeks.map((weekHeader, index) => (
            <th key={index}>{weekHeader}</th>
          ))}
        </tr>
                      </thead>
                      <tbody>
                      {client && client.map((cl, index) => (
      <tr key={index}>
        <td className='bundle'>{cl.client_name}</td>
        <td>2 hours</td>
        <td>2 hours</td>
        <td>2 hours</td>
        <td>2 hours</td>
        <td>1 hour</td>
        <td>9 hours</td>
      </tr>
    ))}
    <tr>
                          <td colSpan={5}></td>
                          <td> <strong>Total</strong></td>
                          <td>3s hours</td>

                          <td colSpan={2}></td>
                          <td> <strong>Total</strong> <span>$000.00</span></td>

                        </tr>
                      </tbody>
                    </table>
                  </div>
                 </div>

                </div>
              </div>
            </div>

            <div className="month-overview">
              <div className="row">
                <div className="col-sm-12">
                  <h2>Month overview</h2>
                </div>
                <div className="col-sm-8">
                <div className="month-overview-table">
                  <div className="table-responsive">
                    <table className="table table-month">
                      <thead>
                        <tr>
                          <th>package</th>
                          <th>hours</th>
                          <th>earnings</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className='bundle'>bundle</td>
                          <td>9 hours</td>
                          <td>$000.00</td>
                        </tr>
                        <tr>
                          <td className='pay'>pay as you go</td>
                          <td>18 hours</td>
                          <td>$000.00</td>
                        </tr>
                        <tr>
                          <td className='probono'>Probono</td>
                          <td>9 hours</td>
                          <td>$000.00</td>
                        </tr>
                        <tr>
                          <td colSpan={2}></td>
                          <td> <strong>Total</strong> <span>$000.00</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* <div className="row">
                    <div className="col-sm-4">
                      <h5>package</h5>
                    </div>
                    <div className="col-sm-4"><h5>hours</h5></div>
                    <div className="col-sm-4"><h5>earnings</h5></div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4"><p><span className='bundle'></span> bundle</p></div>
                    <div className="col-sm-4"><p>9 hours</p></div>
                    <div className="col-sm-4"><p>$000.00</p></div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4"><p><span className='pay'></span> pay as you go</p></div>
                    <div className="col-sm-4"><p>18 hours</p></div>
                    <div className="col-sm-4"><p>$000.00</p></div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4"><p><span className='probono'></span> Probono</p></div>
                    <div className="col-sm-4"><p>9 hours</p></div>
                    <div className="col-sm-4"><p>$000.00</p></div>
                  </div> */}
                 </div>

                </div>
              </div>
            </div>
            <div className='timesheet-buttons'>
              <div className='row'>
                <div className='col-sm-12'>
                  <button className='btn btn-five'>view past payslips</button>
                  <button className='btn btn-four'>query my timesheet</button>
                </div>
              </div>
            </div>
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
              <p>October</p>
              <div className="indicator-btn">
                <a className="page-link1" href="#" aria-label="Previous">
                  <img src="../../images/timetable-prev.png" alt="" />
                </a>
                <a className="page-link1" href="#" aria-label="Next">
                  <img src="../../images/timetable-next.png" alt="" />
                </a>
              </div>
            </div>
          </div>
          <div className="time-table-sec">
            <div className="info">
              <a className="page-link1" href="#" aria-label="Previous">
                <img src="../../images/timetable-prev.png" alt="" />
              </a>
              <a className="page-link1" href="#" aria-label="Next">
                <img src="../../images/timetable-next.png" alt="" />
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
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td>7</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="box">
                        <span>2 h</span>
                        <span>$0 0 0</span>
                      </div>
                      <div className="box">
                        <span>4 h</span>
                        <span>$0 0 0</span>
                      </div>
                    </td>
                    <td>
                      <div className="box">
                        <span>2 h</span>
                        <span>$0 0 0</span>
                      </div>
                      <div className="box">
                        <span>4 h</span>
                        <span>$0 0 0</span>
                      </div>
                    </td>
                    <td>
                      <div className="box">
                        <span>2 h</span>
                        <span>$0 0 0</span>
                      </div>
                      <div className="box">
                        <span>4 h</span>
                        <span>$0 0 0</span>
                      </div>
                    </td>
                    <td>
                      <div className="box">
                        <span>2 h</span>
                        <span>$0 0 0</span>
                      </div>
                      <div className="box">
                        <span>4 h</span>
                        <span>$0 0 0</span>
                      </div>
                    </td>
                    <td>
                      <div className="box">
                        <span>2 h</span>
                        <span>$0 0 0</span>
                      </div>
                      <div className="box">
                        <span>4 h</span>
                        <span>$0 0 0</span>
                      </div>
                    </td>
                    <td>
                      <div className="box">
                        <span>2 h</span>
                        <span>$0 0 0</span>
                      </div>
                      <div className="box">
                        <span>2 h</span>
                        <span>$0 0 0</span>
                      </div>
                    </td>
                    <td>
                      <div className="box">
                        <span>2 h</span>
                        <span>$0 0 0</span>
                      </div>
                      <div className="box">
                        <span>4 h</span>
                        <span>$0 0 0</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="client-sec">
            <h2>client overview</h2>
            <a className="page-link1 prev" href="#" aria-label="Previous">
              <img src="../../images/timetable-prev.png" alt="" />
            </a>
            <a className="page-link1 next" href="#" aria-label="Next">
              <img src="../../images/timetable-next.png" alt="" />
            </a>
            <table className="table">
              <tbody>
                <tr>
                  <th />
                  <th colSpan={2}>November</th>
                </tr>
                <tr>
                  <th>name</th>
                  <th>hours</th>
                  <th>earning</th>
                </tr>
                {client && client.map((cl, index) => (
                <tr>
                  <td className="aqua">{cl.client_name}</td>
                  <td>9 HOURS</td>
                  <td>$000.00</td>
                </tr>
                ))}
               
                <tr>
                  <td />
                  <td>36 HOURS</td>
                  <td>$000.00</td>
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
                  <tr>
                    <td className="aqua">bundle</td>
                    <td>9 HOURS</td>
                    <td>$000.00</td>
                  </tr>
                  <tr>
                    <td className="orange">pay as you go</td>
                    <td>18 HOURS</td>
                    <td>$000.00</td>
                  </tr>
                  <tr>
                    <td className="pink">probono</td>
                    <td>4 HOURS</td>
                    <td>$000.00</td>
                  </tr>
                  <tr>
                    <td />
                    <td>total</td>
                    <td>$000.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mrb-20 time-table-btn">
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
          </div>
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
