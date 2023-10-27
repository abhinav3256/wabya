// owl carousel slider
import OwlCarousel from 'react-owl-carousel2';

// ** React Imports
import { useState, useEffect, SyntheticEvent, Fragment, ReactNode } from 'react'
import { useRouter } from 'next/router'
import { database } from '../../../firebaseConfig'
import { collection, getDocs, getDoc, doc, where, query,addDoc,updateDoc } from "firebase/firestore";
import { sendMail } from "../../services/sendMail";    
// ** MUI Imports
import Box from '@mui/material/Box'
import { styled, Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiMenu, { MenuProps } from '@mui/material/Menu'
import MuiAvatar, { AvatarProps } from '@mui/material/Avatar'
import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import Typography, { TypographyProps } from '@mui/material/Typography'
import Calendar from "react-calendar";

// ** Icons Imports


// ** Third Party Components
import PerfectScrollbarComponent from 'react-perfect-scrollbar'
import { devNull } from 'os'

import { Modal } from "antd";

// ** Styled Menu component
const Menu = styled(MuiMenu)<MenuProps>(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 380,
    overflow: 'hidden',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  '& .MuiMenu-list': {
    padding: 0
  }
}))

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)<MenuItemProps>(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`
}))

const styles = {
  maxHeight: 349,
  '& .MuiMenuItem-root:last-of-type': {
    border: 0
  }
}

// ** Styled PerfectScrollbar component
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  ...styles
})

// ** Styled Avatar component
const Avatar = styled(MuiAvatar)<AvatarProps>({
  width: '2.375rem',
  height: '2.375rem',
  fontSize: '1.125rem'
})

// ** Styled component for the title in MenuItems
const MenuItemTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  flex: '1 1 100%',
  overflow: 'hidden',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  marginBottom: theme.spacing(0.75)
}))

// ** Styled component for the subtitle in MenuItems
const MenuItemSubtitle = styled(Typography)<TypographyProps>({
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
})

// ** owl carousel slider

const options = {
  items: 4,
  loop: true,
  nav: true,
  rewind: true,

  // navText: [
  //   "<i class='fa fa-angle-left'></i>",
  //   "<i class='fa fa-angle-right'></i>"
  // ]
};




const getCurrentWeek = () => {
  const today = new Date();
  const currentDay = today.getDay();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - currentDay);

  const daysOfWeek = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    daysOfWeek.push(day);
  }

  return daysOfWeek;
};

const formatDay = (date) => {
  const dayNames = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
  const dayIndex = date.getDay();
  return dayNames[dayIndex];
};


const Calender = () => {

    // ** States
    const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null)

    // ** Hook
    const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

    const handleDropdownOpen = (event: SyntheticEvent) => {
      setAnchorEl(event.currentTarget)
    }

    const handleDropdownClose = () => {
      setAnchorEl(null)
    }

    const ScrollWrapper = ({ children }: { children: ReactNode }) => {
      if (hidden) {
        return <Box sx={{ ...styles, overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
      } else {
        return (
          <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
        )
      }
    }

    const [nextSevenDay, setnextSevenDay] = useState([{'date':'','day':'','month':''}]);
    const [allWeekDay, setallWeekDay] = useState([{'date':'','day':'','month':''}]);

    const [startLoop, setstartLoop] = useState(0);

    const [forloops, setforloops] = useState([0,1,2,3]);


    const router = useRouter()
    const [coach, setCoach] = useState(null);
    const [coachId,setCoachId]=useState();
    const [coachesCalUsername, setcoachesCalUsername] = useState("");
    const [myData, setMydata] = useState(null);
    const [isFormShow, setisFormShow] = useState(false);
    const [isSyncFormShow, setisSyncFormShow] = useState(false);

    const [selectDateMob, setSelectDateMob] = useState(new Date().toISOString().split('T')[0]);

    const [checkedDateMob, setCheckedDateMob] = useState();
    let m = 0;

     /// For Testing
  //const [apiUrl, setapiUrl] = useState("https://api.cal.dev/");

  ///For Production

  const [apiUrl, setapiUrl]=useState('https://api.cal.com/');

  const [coachesCalApiKey, setcoachesCalApiKey] = useState("");
  const [array1, setarray1]: any[] = useState([]);
  const [clientData, setclientData] = useState([]);

  const [myAvailability, setmyAvailability] = useState(null);

  const [active, setactive] = useState(0);
  const meetingRef = collection(database, "meeting");
  const clientRef = collection(database, "client_user");

  const [bookedTimeslot, setbookedTimeslot] = useState([{meetingDate:"",isCoachAccept:"",isCoachCancel:"",meet_idd:"",starttime:"",endtime:"",title:"",date:"",clientName:"",clientEmail:""}]);
  const [meeting, setMeeting] = useState([]);

  const [meetingClientJoinedData, setmeetingClientJoinedData] =useState([]);


  const [availability, setAvailability] = useState({
    mon: { startHour: '09', startMinute: '00', endHour: '17', endMinute: '00' },
    tue: { startHour: '09', startMinute: '00', endHour: '17', endMinute: '00' },
    wed: { startHour: '09', startMinute: '00', endHour: '17', endMinute: '00' },
    thu: { startHour: '09', startMinute: '00', endHour: '17', endMinute: '00' },
    fri: { startHour: '09', startMinute: '00', endHour: '17', endMinute: '00' },
    sat: { startHour: '09', startMinute: '00', endHour: '17', endMinute: '00' },
    sun: { startHour: '09', startMinute: '00', endHour: '17', endMinute: '00' }
  });

  // const handleHourChange = (event,day) => {
  //   const value = parseInt(event.target.value, 10);
  //   //const end_value = parseInt(end_time_hour, 10);
  //   const endvalue = value + 1
   
  //       setAvailability({ 'mon':{startHour:value}});
  //     }

    
  

  const handleHourChange = (e, day) => {
    console.log('working');
    const { name, value } = e.target;

    console.log(name,value);
    const numericValue = parseInt(value, 10);
  
    // Ensure the input value is within the valid range (00 to 23 for hours)
    const sanitizedValue = Math.max(0, Math.min(numericValue, 23));
  
    if (name === 'startHour') {
      // If changing startHour, update it directly
      setAvailability(prevState => ({
        ...prevState,
        [day]: {
          ...prevState[day],
          [name]: sanitizedValue.toString().padStart(2, '0')
        }
      }));
    } else {
      // If changing endHour, ensure it is greater than startHour
      const startHour = parseInt(availability[day].startHour, 10);
      const updatedEndHour = sanitizedValue < startHour ? startHour : sanitizedValue;
  
      setAvailability(prevState => ({
        ...prevState,
        [day]: {
          ...prevState[day],
          endHour: updatedEndHour.toString().padStart(2, '0')
        }
      }));
    }
  };
  

  const handleMinuteChange = (e, day) => {
    e.preventDefault();
    console.log("handleMinuteChange called");
   
    const { name, value } = e.target;
    console.log(e.target);
    const numericValue = parseInt(e.target.value, 10);
    const sanitizedValue = Math.max(0, Math.min(59, numericValue));
    console.log(name,value);
    const updatedAvailability = {
      ...availability,
      [day]: {
        ...availability[day],
        [name]: sanitizedValue.toString().padStart(2, '0')
      }
    };
    console.log(sanitizedValue);
    if (name === 'endMinute' && updatedAvailability[day].startHour === updatedAvailability[day].endHour) {
      const startMinute = parseInt(updatedAvailability[day].startMinute, 10);
      const endMinute = sanitizedValue >= startMinute ? sanitizedValue + 1 : startMinute;
      updatedAvailability[day].endMinute = endMinute.toString().padStart(2, '0');
    }
  
    if (name === 'startMinute' ) {
      
      console.log(sanitizedValue);
      const startMinute = parseInt(updatedAvailability[day].startMinute, 10);
      const endMinute = sanitizedValue >= startMinute ? sanitizedValue + 1 : startMinute;
      updatedAvailability[day].startMinute = endMinute.toString().padStart(2, '0');
    }
    setAvailability(updatedAvailability);
  };
  
  
  
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat','sun'];

  useEffect(() => {

    console.log('test');
    const coachId = sessionStorage.getItem('coachId');
    if(!coachId){
      router.push('/coach/login')
  }




}, [])

const getMyAvailability = async () => {
  console.log('testtt');
  const coachId = sessionStorage.getItem('coachId');
  const schedulesCollection = collection(database, 'schedules');
  const queryDoc = query(schedulesCollection, where("coach_id", "==", coachId));

  try {
    const response = await getDocs(queryDoc);
    const fetchedAvailability = response.docs.map((data) => {
      console.log(data.data());
      return { ...data.data(), availability_id: data.id };
    });
    setmyAvailability(fetchedAvailability);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};







const getMyMeeting = async () => {

  console.log('testtt');
  const coachId = sessionStorage.getItem('coachId');
  const meetingSessionCollection = collection(database, 'meeting');
  const queryDoc = query(meetingSessionCollection, where("coachId", "==", coachId));

    await getDocs(queryDoc).then((response) => {
      setMeeting(
        response.docs.map((data) => {
          console.log(data.data());
          return { ...data.data(), meet_id: data.id };
        })
      );
    });
   
 
 
 }

 useEffect(() => {
  if (myAvailability) {
    const updatedAvailability = { ...availability };
    myAvailability.forEach((myData) => {
      const { day, startHour, startMinute, endHour, endMinute } = myData;
      updatedAvailability[day] = {
        startHour: startHour.padStart(2, '0'),
        startMinute: startMinute.padStart(2, '0'),
        endHour: endHour.padStart(2, '0'),
        endMinute: endMinute.padStart(2, '0')
      };
    });
    setAvailability(updatedAvailability);
    
    console.log('my availability');
    console.log(myAvailability);
    console.log(updatedAvailability);

    myAvailability.forEach((myData) => {
      const { day, startHour } = myData;
      if (updatedAvailability[day]) {
        console.log(`Start Hour for ${day}: ${updatedAvailability[day].startHour}`);
      }
    });
  }
}, [myAvailability]);




useEffect(() => {
  
  getWeek();
  getAllWeek();

}, [])


    useEffect(() => {

      const coachId = sessionStorage.getItem('coachId');
      if(coachId == ""){
        router.push('/client/login')
    }
      setCoachId(coachId);

      if (coachId) {
        const fetchCoach = async () => {
          const coachRef = doc(collection(database, "coaches_user"), coachId);
          const coachDoc = await getDoc(coachRef);

          if (coachDoc.exists()) {
            setCoach(coachDoc.data());
            console.log('coach data',coachDoc.data());
            setcoachesCalApiKey(coachDoc.data().coach_api);
            setcoachesCalUsername(coachDoc.data().coach_uname);

          } else {
            console.log("No coach found");
          }
        };
        fetchCoach();
        getMyMeeting();
       getMyAvailability();
      }



  }, [coachId])


   
  useEffect(() => {

    getWeek();

}, [startLoop])



useEffect(() => {

  if(coachesCalApiKey!=''){

 // getTimeslots();

  //getBookedSchedule();
  }

  if(coachesCalUsername!=''){

   // getTimeslots();

    getBookedSchedule();
    }

}, [coachesCalApiKey,coachesCalUsername])


//Get next Seven day

 // const [date, setDate] = useState(null);
    const getWeek =() =>{

      const next7Days = [];
      var now = new Date(); // current date and time

 const options = { month: 'short' };
 console.log(now.toLocaleString('default', options));

 const options2 = { day: '2-digit'  };
 console.log(now.toLocaleDateString (undefined, options2));

 const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let endLoop=startLoop + 7;
 for (let i = startLoop; i < endLoop; i++) {
  let today = new Date(); // create a new date object with the current date and time
  let tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + i);

   // Get the day of the week (0 = Sunday, 1 = Monday, etc.)
   let dayOfWeek = tomorrow.getDay();

   // Convert the day of the week to a 3-digit string
   let dayOfWeekStr = '';

   if(dayOfWeek == 0){

    dayOfWeekStr = 'Sun';
   }

   if(dayOfWeek == 1){

     dayOfWeekStr = 'Mon';
   }

   if(dayOfWeek == 2){

     dayOfWeekStr = 'Tue';
   }

   if(dayOfWeek == 3){

     dayOfWeekStr = 'Wed';
   }

   if(dayOfWeek == 4){

     dayOfWeekStr = 'Thu';
   }

   if(dayOfWeek == 5){

     dayOfWeekStr = 'Fri';
   }
   if(dayOfWeek == 6){

     dayOfWeekStr = 'Sat';
   }
   let month=monthNames[tomorrow.getMonth()].toUpperCase();
  next7Days.push({'date':tomorrow.toLocaleDateString(undefined, options2),'day':dayOfWeekStr,'month':month});
 //console.log();
 }

 console.log(next7Days);
setnextSevenDay(next7Days);
    }



    //get next 1 month
    const getAllWeek =() =>{

      const next7Days = [];
      var now = new Date(); // current date and time

 const options = { month: 'short' };
 console.log(now.toLocaleString('default', options));

 const options2 = { day: '2-digit'  };
 console.log(now.toLocaleDateString (undefined, options2));

 const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let endLoop=startLoop + 7;
 for (let i = 0; i < 70; i++) {
  let today = new Date(); // create a new date object with the current date and time
  let tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + i);

   // Get the day of the week (0 = Sunday, 1 = Monday, etc.)
   let dayOfWeek = tomorrow.getDay();

   // Convert the day of the week to a 3-digit string
   let dayOfWeekStr = '';

   if(dayOfWeek == 0){

    dayOfWeekStr = 'Sun';
   }

   if(dayOfWeek == 1){

     dayOfWeekStr = 'Mon';
   }

   if(dayOfWeek == 2){

     dayOfWeekStr = 'Tue';
   }

   if(dayOfWeek == 3){

     dayOfWeekStr = 'Wed';
   }

   if(dayOfWeek == 4){

     dayOfWeekStr = 'Thu';
   }

   if(dayOfWeek == 5){

     dayOfWeekStr = 'Fri';
   }
   if(dayOfWeek == 6){

     dayOfWeekStr = 'Sat';
   }
   let month=monthNames[tomorrow.getMonth()].toUpperCase();
  next7Days.push({'date':tomorrow.toLocaleDateString(undefined, options2),'day':dayOfWeekStr,'month':month});
 //console.log();
 }

 console.log(next7Days);
setallWeekDay(next7Days);
    }


    const handleFormOk = () => {
      setisFormShow(true);
     // setisShowmsg(false);
    };
  
    const handleFormCancel = () => {
      setisFormShow(false);
     // setisShowmsg(false);
    };



    const handleSyncFormOk = () => {
      setisSyncFormShow(true);
     // setisShowmsg(false);
    };
  
    const handleSyncFormCancel = () => {
      setisSyncFormShow(false);
     // setisShowmsg(false);
    };

/**Get Timeslot */

const getTimeslots = async () => {

  var date = new Date(); // current date and time

  var tomorrow = new Date(date);
  tomorrow.setDate(date.getDate() + 1);
  var todayDate = new Date(tomorrow).toISOString().slice(0, 10);



  var startTime = "";
  var endTime = "";
  const d = date;
  var selectedDay = date.getDay();
  //console.log("selected days: " + selectedDay + "");


  var scheduleId = 62521;
  var included = 1;
  setarray1([]);

  try {
    const res = await fetch(
      "" +
        apiUrl +
        "v1/schedules/" +
        scheduleId +
        "?apiKey=" +
        coachesCalApiKey +
        "",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    // //console.log(res);
    //console.log(data);

    if (res.status == 200) {
      //console.log("testing");
      if (data.schedule.availability.length > 0) {
        //console.log(data.schedule.availability.length);

        for (
          let index = 0;
          index < data.schedule.availability.length;
          index++
        ) {
          const days = data.schedule.availability[index].days;
          if (days.includes(selectedDay)) {
            startTime = data.schedule.availability[index].startTime;
            endTime = data.schedule.availability[index].endTime;
            let endtimeArr = endTime.split(":");
            //console.log(endtimeArr[2]);

            if (endtimeArr[2] != "00") {
              endTime = setCharAt(endTime, 6, "0");
              endTime = setCharAt(endTime, 7, "0");
            }

            //console.log(endTime);

            //console.log(startTime);
            //console.log(endTime);
            included = 1;
            break;
          } else {
            included = 0;
          }
        }

        var timeslots = [startTime];
        //console.log(coachesEventTimeInterval);

//var interval = coachesEventTimeInterval;
var interval=90;

        var times = [
          { start: "10:00:00", end: "10:20:00" },
          { start: "10:40:00", end: "10:50:00" },
          { start: "14:00:00", end: "14:15:00" },
        ];

        while (
          Date.parse("01/01/2011 " + endTime + "") >
          Date.parse("01/01/2011 " + startTime + "")
        ) {
          //console.log(isBetween); // true
          startTime = addMinutes(startTime, interval);
          if (
            Date.parse("01/01/2011 " + endTime + "") >
            Date.parse("01/01/2011 " + startTime + "")
          ) {
            var isBetween = times.some(({ start, end }) => {
              return startTime >= start && startTime <= end;
            });

            var isBetween2 = times.some(({ start, end }) => {
              return (
                addMinutes(startTime, interval) > start &&
                addMinutes(startTime, interval) < end
              );
            });
            if (!isBetween && !isBetween2) {
              timeslots.push(startTime);
            }
          }
        }

        console.log(timeslots);
      } else {
        //console.log("no");
        //setisShow(false);
      }
   //   setarray1(timeslots);
    }
  } catch (err) {
    //console.log(err);
  }


};


 /* Get Booked Schedule  of Coaches */

 const getBookedSchedule = async () => {
  var dateFrom = "2023-03-27";
  var dateTo = "2023-04-27";
  var busySchedule = [];

  try {
    const res = await fetch(
      "" +
        apiUrl +
        "v1/availability?apiKey=" +
        coachesCalApiKey +
        "&dateFrom=" +
        dateFrom +
        "&dateTo=" +
        dateTo +
        "&username=" +
        coachesCalUsername +
        "",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (res.status == 200) {
      if (data.busy.length > 0) {
        //console.log(data.busy);
        for (let index = 0; index < data.busy.length; index++) {
          var start = data.busy[index].start;

          let stime = new Date(start).toLocaleTimeString("en-US");

          let date_ = new Date(start).getDate();
          let month_ = new Date(start).getMonth();
          let year_ = new Date(start).getFullYear();
          console.log(date_);
          console.log(month_);
          console.log(year_);
       let  meeting_title = data.busy[index].title;


          var convertedStartTime = new Date("1/1/2013 " + stime);
          let convertedStartTimeHourStr="";
          let convertedStartTimeMinStr="";


          let convertedEndTimeHourStr="";
          let convertedEndTimeMinStr="";

          if(convertedStartTime.getHours() < 10){
            convertedStartTimeHourStr="0"+convertedStartTime.getHours()+"";
          }else{
            convertedStartTimeHourStr=""+convertedStartTime.getHours()+"";
          }


          if(convertedStartTime.getMinutes() < 10){
            convertedStartTimeMinStr="0"+convertedStartTime.getMinutes()+"";
          }else{
            convertedStartTimeMinStr=""+convertedStartTime.getMinutes()+"";
          }




          var startTime =
          convertedStartTimeHourStr+
            ":" +
            convertedStartTimeMinStr +
            ":00";

          var end = data.busy[index].end;

          let etime = new Date(end).toLocaleTimeString("en-US");

          var convertedEndTime = new Date("1/1/2013 " + etime);

          if(convertedEndTime.getHours() < 10){
            convertedEndTimeHourStr="0"+convertedEndTime.getHours()+"";
          }else{
            convertedEndTimeHourStr=""+convertedEndTime.getHours()+"";
          }

          if(convertedEndTime.getMinutes() < 10){
            convertedEndTimeMinStr="0"+convertedEndTime.getMinutes()+"";
          }else{
            convertedEndTimeMinStr=""+convertedEndTime.getMinutes()+"";
          }
          var endTime =
          convertedEndTimeHourStr +
            ":" +
            convertedEndTimeMinStr +
            ":00";

          busySchedule.push({ starttime: startTime, endtime: endTime, title:meeting_title,date:date_,month:month_,year:year_ });

          //console.log(bookedTimeslot);
        }
      }
    }
  } catch (err) {
    //console.log(err);
  }
  //setbookedTimeslot(busySchedule);

  console.log(busySchedule); 
  // getTimeslots();
};

function addMinutes(time, minutes) {
  var date = new Date(
    new Date("01/01/2015 " + time).getTime() + minutes * 60000
  );
  var tempTime =
    (date.getHours().toString().length == 1
      ? "0" + date.getHours()
      : date.getHours()) +
    ":" +
    (date.getMinutes().toString().length == 1
      ? "0" + date.getMinutes()
      : date.getMinutes()) +
    ":" +
    (date.getSeconds().toString().length == 1
      ? "0" + date.getSeconds()
      : date.getSeconds());
  return tempTime;
}


/* Get All Event  of Coaches */

const getEventTypes = async () => {
  // settype_load(true);

  // settype_err_load(false);

   try {
     const res = await fetch(
       "" + apiUrl + "v1/event-types?apiKey=" + coachesCalApiKey + "",
       {
         method: "GET",
         headers: {
           "Content-Type": "application/json",
         },
       }
     );
     const data = await res.json();
     if (res.status == 200) {
       //console.log(data);
      // setcoachesEvents(data.event_types);

        if(data.event_types[0].id != null){


        setcoachesCalEventSelected(data.event_types[0].id);
        }

     }
   } catch (err) {
     //console.log(err);

   }

   // setNext(true);
 };






    const handleClick =(event) =>{

      let id=event.target.getAttribute("data-id")
      setactive(id);
      setstartLoop((id)*7);
    }


    // get all meeting data
  const getMeeting = async () => {
    const coachId = sessionStorage.getItem('coachId');
    const meetingQuery = query(meetingRef, where("coachId", "==", coachId), where("meetingApiCreated", "==", true));
    // Query for meeting data
  //  const meetingQuery = query(collection(db, 'meetings'), where("coachId", "==", coachId), where("meetingApiCreated", "==", true));

    // Query for client data
    const clientQuery = query(clientRef, where("assign_coach_id", "==", coachId));
   // const clientQuery = query(collection(db, 'clients'), where("assign_coach_id", "==", coachId));
console.log('abcddd');
try {
  const meetingData = await getDocs(meetingQuery);
  const clientData = await getDocs(clientQuery);

  const meetings = meetingData.docs.map((meetingDoc) => {
    const matchingClient = clientData.docs.find((clientDoc) => clientDoc.id === meetingDoc.data().clientId);

    const clients = matchingClient
      ? [{ clientId: matchingClient.id, name: matchingClient.data().client_name, email: matchingClient.data().client_email }]
      : [];

    return {
      ...meetingDoc.data(),
      meeting_id: meetingDoc.id,
     client_name: clients[0].name,
     client_email: clients[0].email,
    };
  });
setMeeting(meetings);
  console.log(meetings); // Logging the meetings with client details
} catch (error) {
  console.error("Error fetching data: ", error);
}
    console.error("dfbhbh");
  };
  

   // coach data fetch
   const getClientData = async () => {
    const queryDoc = query(clientRef);

    await getDocs(queryDoc).then((response) => {
      setclientData(
        response.docs.map((data) => { 

          return { ...data.data(), client_id: data.id };
        })
      );
    });


  };

  useEffect(() => {
//  let busySchedule=[];
//    console.log(meeting);

// for (let index = 0; index < meeting.length; index++) {
//   //const element = array[index];

//   let date_ = new Date(meeting[index].meetingDate).getDate();
//   let month_ = new Date(meeting[index].meetingDate).getMonth();
//   let year_ = new Date(meeting[index].meetingDate).getFullYear();

//    busySchedule.push({ starttime: meeting[index].meetingTime, endtime: meeting[index].meetingEndTime, title:meeting[index].meetingName,date:date_,month:month_,year:year_ });
// }

// console.log('here');
// console.log(busySchedule);
//setbookedTimeslot(busySchedule);

console.log('meeting');
console.log(meeting);
getClientData();
  }, [meeting]);


  function addMinutes(time, minutes) {
    var date = new Date(
      new Date("01/01/2015 " + time).getTime() + minutes * 60000
    );
    var tempTime =
      (date.getHours().toString().length == 1
        ? "0" + date.getHours()
        : date.getHours()) +
      ":" +
      (date.getMinutes().toString().length == 1
        ? "0" + date.getMinutes()
        : date.getMinutes()) +
      ":" +
      (date.getSeconds().toString().length == 1
        ? "0" + date.getSeconds()
        : date.getSeconds());
    return tempTime;
  }
  useEffect(() => {
    const myData = async () => {
    const coachIds = sessionStorage.getItem('coachId');
      const userCollection = collection(database, 'coaches_user');
      const userDocRef = doc(userCollection, coachIds);
      const userDoc = await getDoc(userDocRef);
      console.log(userDoc.data());

 var data=userDoc.data();
 setMydata(data);
 console.log('here i am')
 console.log(data)
      console.log('here i am')
      var starttime ="";
if(data.start_time != undefined){
  var starttime =data.start_time;
        }else{
          var starttime = "09:00:00";
        }


var interval = "45";
  if(data.start_time){
    var endtime = data.end_time;
         }else{
           var endtime = "17:00:00";
         }

         //var endtime = "17:00:00";
  var timeslots = [starttime];
    
  while (starttime < endtime) {
    
      starttime = addMinutes(starttime, interval); 
    
      if(starttime < endtime){
      // if(!isReserved(starttime)){
      timeslots.push(starttime);
    //  }
    }
     // settimeslot_load(false);
    }
    
    setarray1(timeslots);
  
        }
        
  





     
  //       if(data.start_time != undefined){
  //  var starttime =data.start_time;
  //       }else{
  //         var starttime = "09:00:00";
  //       }
  // var interval = "45";
  // if(data.start_time){
  //   var endtime = data.end_time;
  //        }else{
  //          var endtime = "17:00:00";
  //        }
  
  //       }
        
  // //var endtime = "17:00:00";
  // var timeslots = [starttime];
  
  
  
  // while (starttime < endtime) {
  
  //   starttime = addMinutes(starttime, interval); 
  
  //   if(starttime < endtime){
  //   // if(!isReserved(starttime)){
  //   timeslots.push(starttime);
  // //  }
  // }
  //   settimeslot_load(false);
  // }
  
  // setarray1(timeslots);
  
    
    myData();
    getMeeting();
   
   }, []);

   useEffect(()=>{

    const busySchedule = [];
    //console.log(meeting[0]);
    console.log('abty');
    console.log(meeting);
    for (const meetId in meeting) {

     

      console.log(meeting[meetId]);
     
      console.log(meeting[meetId].meet_id);
      console.log();

      console.log(meeting[meetId].meetingDate);

      let date_ = new Date(meeting[meetId].meetingDate).getDate();
      let month_ = new Date(meeting[meetId].meetingDate).getMonth();
      let year_ = new Date(meeting[meetId].meetingDate).getFullYear();

       busySchedule.push({ meetingDate:meeting[meetId].meetingDate,isCoachCancel:meeting[meetId].isCoachCancel,clientName:meeting[meetId].client_name,clientEmail:meeting[meetId].client_email,isCoachAccept:meeting[meetId].isCoachAccept,meet_idd: meeting[meetId].meeting_id,starttime: meeting[meetId].meetingTime, endtime: meeting[meetId].meetingEndTime, title:meeting[meetId].meetingName,date:date_,month:month_,year:year_});


        }
     

  //  for (let index = 0; index < meeting.length; index++) {

  //   for (let index2 = 0; index2 < clientData.length; index++) {

  //     if(clientData[index2].id == meeting[index].status){
  //       console.log('loop');
  //     }

  //   }

  //  }


    // for (const meetId in meeting) {
    //   if (Object.hasOwnProperty.call(meeting, meetId)) {
    //     const userData = clientData[meetId];
    //     const meetData = meeting[meetId];

    //     if (meetData) {
    //       joinedData.push({
    //         clientId: meetId,
    //         ...userData,
    //         ...meetData,
    //       });
    //     }
    //   }
    // }

    console.log('join');
//console.log(joinedData);

   // setmeetingClientJoinedData(busySchedule);
   setbookedTimeslot(busySchedule);
   console.log('testinnnnn  dhh vhn');
   console.log(busySchedule);
   }, [meeting]);



   const cancelMeet = (meet_iddd,clientName,clientEmail,meet_date,meet_day,meet_month,meeting_start_time,meeting_end_time) => {
    console.log(meet_iddd);
    console.log(clientName);
    console.log(clientEmail);
    const fieldToEdit2 = doc(database, 'meeting', meet_iddd);

    updateDoc(fieldToEdit2, {
      isCoachCancel:1
     
    })
    .then(() => {
      const msg = `
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <h1 style="color: #e74c3c; text-align: center;">Meeting Cancelled</h1>
          <p style="font-size: 18px; text-align: center;">We regret to inform you that the following meeting has been cancelled:</p>
          <p style="font-size: 16px; text-align: center;">Date: ${meet_date} ${meet_month} ${meet_day}<br>Time: ${meeting_start_time} - ${meeting_end_time}</p>
          <hr style="border: 1px solid #e74c3c;">
          <p style="font-size: 14px; color: #888; text-align: center;">We apologize for any inconvenience caused.<br>Thank you,<br>Wabya Team</p>
      </div>
  `;
      sendMailFunc('abhinavkumar3256@gmail.com',msg);  
      getMeeting();
  
     
    })
    .catch((err) => {
      console.log(err);
    })
   }










   const handleDateClick = (day) => {
    const inputDateString = day;
    const inputDate = new Date(inputDateString);
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const day_ = String(inputDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day_}`;

setSelectDateMob(formattedDate);
console.log(formattedDate);
m=0;
  };

  useEffect(() => {

   
    if(selectDateMob !=''){
      const inputDateString = selectDateMob;
    const inputDate = new Date(inputDateString);
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const day_ = String(inputDate.getDate()).padStart(2, '0');
   
    setCheckedDateMob(parseInt(day_));

  }




}, [selectDateMob])

  const formatDate = (date) => {
    const options = { day: '2-digit', weekday: 'short' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };



   
   const rejectMeet = (meet_iddd,clientName,clientEmail,meet_date,meet_day,meet_month,meeting_start_time,meeting_end_time) => {
    console.log(meet_iddd);
    console.log(clientName);
    console.log(clientEmail);
    const fieldToEdit2 = doc(database, 'meeting', meet_iddd);

    updateDoc(fieldToEdit2, {
      isCoachAccept:0
     
    })
    .then(() => {
      const msg = `
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <h1 style="color: #e74c3c; text-align: center;">Meeting Cancelled</h1>
          <p style="font-size: 18px; text-align: center;">We regret to inform you that the following meeting has been cancelled:</p>
          <p style="font-size: 16px; text-align: center;">Date: ${meet_date} ${meet_month} ${meet_day}<br>Time: ${meeting_start_time} - ${meeting_end_time}</p>
          <hr style="border: 1px solid #e74c3c;">
          <p style="font-size: 14px; color: #888; text-align: center;">We apologize for any inconvenience caused.<br>Thank you,<br>Wabya Team</p>
      </div>
  `;
      sendMailFunc('abhinavkumar3256@gmail.com',msg);  
      getMeeting();
  
     
    })
    .catch((err) => {
      console.log(err);
    })
   }

   async function sendMailFunc (email,content){   
    let response = await sendMail(email,"sample mail",content);   
  
    console.log('response',response);
  }    	

   const acceptMeet = (meet_iddd,meet_date,meet_day,meet_month,meeting_start_time,meeting_end_time) => {
    console.log(meet_iddd);
    const fieldToEdit2 = doc(database, 'meeting', meet_iddd);

    updateDoc(fieldToEdit2, {
      isCoachAccept:1
   
    })
    .then(() => {
      const msg = `
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <h1 style="color: #3498db; text-align: center;">Meeting Accepted!</h1>
          <p style="font-size: 18px; text-align: center;">Your meeting request  has been accepted. We are looking forward to seeing you there!</p>
          <p style="font-size: 16px; text-align: center;">Date: ${meet_date} ${meet_month}  ${meet_day}<br>Time: ${meeting_start_time} - ${meeting_end_time}</p>
          <hr style="border: 1px solid #3498db;">
          <p style="font-size: 14px; color: #888; text-align: center;">Thank you,<br>Wabya Team</p>
      </div>
  `;
      sendMailFunc('abhinavkumar3256@gmail.com',msg);  
      getMeeting();
  
     
    }) 
    .catch((err) => {
      console.log(err);
    })
   }


   const updateSchedule = (e) => {
    e.preventDefault();
  console.log('here we');
    // Convert availability object to an array of objects with day information
    const availabilityData = Object.entries(availability).map(([day, data]) => ({
      day: day, // Include the day information
      startHour: data.startHour,
      startMinute: data.startMinute,
      endHour: data.endHour,
      endMinute: data.endMinute,
      coach_id:coachId,
    }));
  
    // Add data to Firebase
    availabilityData.forEach((data) => {



      const coachId = sessionStorage.getItem('coachId');
      const userDocRef = collection(database, 'schedules');
      const queryDoc = query(userDocRef, where("coach_id", "==", coachId), where("day", "==", `${data.day}`));



      getDocs(queryDoc)
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          // The record exists; update it
          querySnapshot.forEach((doc) => {
            const existingDocRef = doc.ref;
            updateDoc(existingDocRef, {
              day: data.day, // Include the day information
              startHour: data.startHour,
              startMinute: data.startMinute,
              endHour: data.endHour,
              endMinute: data.endMinute,
              coach_id:coachId,
            })
              .then(() => {
               
              })
              .catch((err) => {
                console.error(err);
              });
          });
        } else {
     
    







         
      console.log(data);
     
      addDoc(userDocRef, {
        
        day: data.day, // Include the day information
        startHour: data.startHour,
        startMinute: data.startMinute,
        endHour: data.endHour,
        endMinute: data.endMinute,
        coach_id:coachId,
      
       
       
      })
        .then((docRef) => {
          console.log(docRef)
          console.log(docRef.id)
        

  
        })
        .catch((err) => {
          console.error(err);
        })
      }
    })
    });
  };
  

   useEffect(() => {
//     console.log(clientData);
//     console.log("ahhbhu");
//     //console.log(meeting);

//     const busySchedule = [];
//     //console.log(meeting[0]);

//     for (const meetId in meeting) {

//       for (const clientIdd in clientData) {
//        // console.log(clientData[clientIdd].client_id);
//         if(clientData[clientIdd].client_id == meeting[meetId].clientId){

//       console.log(meeting[meetId]);
//       console.log(clientData[clientIdd]);


//       console.log(meeting[meetId].meetingDate);

//       let date_ = new Date(meeting[meetId].meetingDate).getDate();
//       let month_ = new Date(meeting[meetId].meetingDate).getMonth();
//       let year_ = new Date(meeting[meetId].meetingDate).getFullYear();

//        busySchedule.push({ starttime: meeting[meetId].meetingTime, endtime: meeting[meetId].meetingEndTime, title:meeting[meetId].meetingName,date:date_,month:month_,year:year_ ,clientName:clientData[clientIdd].client_name});


//         }
//       }

//     }

//   //  for (let index = 0; index < meeting.length; index++) {

//   //   for (let index2 = 0; index2 < clientData.length; index++) {

//   //     if(clientData[index2].id == meeting[index].status){
//   //       console.log('loop');
//   //     }

//   //   }

//   //  }


//     // for (const meetId in meeting) {
//     //   if (Object.hasOwnProperty.call(meeting, meetId)) {
//     //     const userData = clientData[meetId];
//     //     const meetData = meeting[meetId];

//     //     if (meetData) {
//     //       joinedData.push({
//     //         clientId: meetId,
//     //         ...userData,
//     //         ...meetData,
//     //       });
//     //     }
//     //   }
//     // }

//     console.log('join');
// //console.log(joinedData);

//    // setmeetingClientJoinedData(busySchedule);
//    setbookedTimeslot(busySchedule);
//    console.log('testinnnnnn');
//    console.log(busySchedule);
   }, [clientData]);

  //  useEffect(() => {
  //   let busySchedule=[];
  //     console.log(meetingClientJoinedData);

  //  for (let index = 0; index < meetingClientJoinedData.length; index++) {
  //    //const element = array[index];

  //    let date_ = new Date(meetingClientJoinedData[index].meetingDate).getDate();
  //    let month_ = new Date(meetingClientJoinedData[index].meetingDate).getMonth();
  //    let year_ = new Date(meetingClientJoinedData[index].meetingDate).getFullYear();

  //     busySchedule.push({ starttime: meetingClientJoinedData[index].meetingTime, endtime: meetingClientJoinedData[index].meetingEndTime, title:meetingClientJoinedData[index].meetingName,date:date_,month:month_,year:year_ ,clientName:meetingClientJoinedData[index].client_name});
  //  }

  //  console.log('here');
  //  console.log(busySchedule);
  //  setbookedTimeslot(busySchedule);


  //    }, [meetingClientJoinedData]);

  const daysOfWeek = getCurrentWeek();

  
  return (
    <>
    <section className='calendar calendar-desktop'>
      <div className='container'>
        <div className='row'>
          <div className="upcoming-event">
            <div className="row">
              <div className="col-sm-8"></div>
              <div className="col-sm-4">
                {/* <div className="cal-icon">
                  <i className="fa fa-calendar-o"></i>
                  <p>upcoming meeting reminder <span>10 minutes : Client name</span></p>
                  <div className="join">
                    <h5>Join</h5>
                  </div>
                </div> */}

              </div>
            </div>
          </div>


          <div className="timesheet-carousel">
          <OwlCarousel options={options}>

          { forloops.map((floop, index) => {
            let i=(index)*7;
            let j=i+6;
            if (index== active) {
              return (
                <>
                  <div className='active-owl cal-item' onClick={handleClick} data-id={index}>{ allWeekDay.length>i ? allWeekDay[i].month : null} { allWeekDay.length>i ? allWeekDay[i].date : null } -  { allWeekDay.length>j ?  allWeekDay[j].month : null} { allWeekDay.length>j ?  allWeekDay[j].date : null}</div>
                </>
              )
            }else{
              return (

                <>
                  <div className='cal-item' onClick={handleClick} data-id={index}>{ allWeekDay.length>i ? allWeekDay[i].month : null} { allWeekDay.length>i ? allWeekDay[i].date : null } -  { allWeekDay.length>j ?  allWeekDay[j].month : null} { allWeekDay.length>j ?  allWeekDay[j].date : null}</div>
                </>
              );
            }

          })}
          </OwlCarousel>
          </div>


          {/* <div className='timesheet-carousel'>
            <div className='row'>
              <div className='col-sm-1'>
                <div className='left-arrow'>
                  <i className='fa fa-angle-left' aria-hidden='true'></i>
                </div>
              </div>
              <div className='col-sm-10'>
                <div className='center-arrow'>


                {forloops.map((floop, index) => {
                    let i=(index)*7;
                    let j=i+6;
                    if (index== active) {
                         return (

                          <>

                  <span className='active' onClick={handleClick} data-id={index}>{ allWeekDay.length>i ? allWeekDay[i].month : null} { allWeekDay.length>i ? allWeekDay[i].date : null } -  { allWeekDay.length>j ?  allWeekDay[j].month : null} { allWeekDay.length>j ?  allWeekDay[j].date : null}</span>
                  </>)
                }else{
                  return (

                    <>
                  <span className='' onClick={handleClick} data-id={index}>{ allWeekDay.length>i ? allWeekDay[i].month : null} { allWeekDay.length>i ? allWeekDay[i].date : null } -  { allWeekDay.length>j ?  allWeekDay[j].month : null} { allWeekDay.length>j ?  allWeekDay[j].date : null}</span>

                  <span>|</span>

</>


);
                  }

                })}



                </div>
              </div>
              <div className='col-sm-1'>
                <div className='right-arrow'>
                  <i className='fa fa-angle-right' aria-hidden='true'></i>
                </div>
              </div>
            </div>
          </div>  */}


          <div className='timesheet-buttons'>
            <div className='row'>
              <div className='col-sm-12'>
                {/* <button className='btn btn-two'>sync calendars</button> */}
                <button className='btn btn-four' >set availability</button>

                  <Fragment>

                            {/* <button className='btn btn-five' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>schedule session</button> */}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >

      {/* <div className="schedule-session">
        <div className="row">
          <div className="col-sm-12">
            <div className="schedule">
              <h2>
              <i className="fa fa-calendar-o"></i>
              schedule a session
              </h2>
              <div className="divider"></div>

            </div>
          </div>
        </div>
      </div> */}
        {/* <ScrollWrapper>

          <MenuItem onClick={handleDropdownClose}>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <Avatar alt='order' src='/images/avatars/3.png' />
              <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                <MenuItemTitle>Revised Order </MenuItemTitle>
                <MenuItemSubtitle variant='body2'>New order revised from john</MenuItemSubtitle>
              </Box>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                19 Mar
              </Typography>
            </Box>
          </MenuItem>

         </ScrollWrapper> */}

      </Menu>
                        </Fragment>

                  {/* <button className='btn btn-five'>schedule session</button> */}

              </div>
            </div>
          </div> 

          <div id="calendar-wrap">
              <div className="calendar">
              <div className="table-responsive">
                <table className="table table-calendar table-bordered">
                  <thead>
                    <tr>
                      <th></th>
                      {nextSevenDay.map((nextSeven, index) => {
                         return (
                    <th> { nextSeven.day  }  { nextSeven.date  }</th>
                    );
                    })}
                    </tr>
                  </thead>
                  <tbody>

                  {array1.map((timeslot:string, index:number) => {

                    let formattedTime = timeslot.slice(0, -3);
              //        var isBetween = bookedTimeslot.some(({ starttime, endtime }) => {

              //         return timeslot >= starttime && timeslot <= endtime

              // });

//               const matchingTimeslot = bookedTimeslot.find(({ starttime, endtime,title,date }) => timeslot >= starttime && timeslot <= endtime && date == nextSevenDay[index].date);

// const isBetween = !!matchingTimeslot; // will be true if matchingTimeslot is truthy, false otherwise

// const matchingStarttime = matchingTimeslot && matchingTimeslot.starttime; // will be the starttime of the matching timeslot, or undefined if no matching timeslot
// const matchingEndtime = matchingTimeslot && matchingTimeslot.endtime; // will be the endtime of the matching timeslot, or undefined if no matching timeslot
// const matchingTitle = matchingTimeslot && matchingTimeslot.title; // will be the endtime of the matching timeslot, or undefined if no matching timeslot





              return(<>

              <tr>

                      <th>{formattedTime}</th>

                      {array1.map((timeslot2, index2:number) => {
              //        var isBetween = bookedTimeslot.some(({ starttime, endtime }) => {

              //         return timeslot >= starttime && timeslot <= endtime

              // });


              const matchingTimeslot = bookedTimeslot.find(({clientEmail,meet_idd,isCoachAccept,isCoachCancel, starttime, endtime,title,date,clientName }) => timeslot >= starttime && timeslot < endtime && index2 < 7 && nextSevenDay[index2].date == date);

const isBetween = !!matchingTimeslot; // will be true if matchingTimeslot is truthy, false otherwise

const matchingStarttime = matchingTimeslot && matchingTimeslot.starttime.slice(0,-3); // will be the starttime of the matching timeslot, or undefined if no matching timeslot
const matchingEndtime = matchingTimeslot && matchingTimeslot.endtime.slice(0,-3); // will be the endtime of the matching timeslot, or undefined if no matching timeslot
const matchingTitle = matchingTimeslot && matchingTimeslot.title; // will be the endtime of the matching timeslot, or undefined if no matching timeslot
const clientName = matchingTimeslot && matchingTimeslot.clientName;
const clientEmail = matchingTimeslot && matchingTimeslot.clientEmail;
const meet_iddd = matchingTimeslot && matchingTimeslot.meet_idd;
const isCoachAccept_ = matchingTimeslot && matchingTimeslot.isCoachAccept;
const isCoachCancel_ = matchingTimeslot && matchingTimeslot.isCoachCancel;
if(isBetween)



return(<>
  <td>
                     <div className="blue-event">
                           <p><span>{ matchingStarttime} - {matchingEndtime} </span> </p>

                      

                       <p className='calendar-clientname'>Client :  {clientName}</p> 

                       {/* {isCoachAccept_ == undefined && isCoachAccept_ !== 1 ? (
  <p>
    <u onClick={() => acceptMeet(meet_iddd,clientName,clientEmail,nextSevenDay[index2].date,nextSevenDay[index2].day,nextSevenDay[index2].month,matchingStarttime,matchingEndtime)}>Accept</u>
  </p>
) : null}

{isCoachAccept_ !== undefined && isCoachAccept_ == 1 ? (
  <p>
    Accepted
      </p>
) : null}

                       {isCoachAccept_ == undefined && isCoachAccept_ !== 0 ? (
  <p>
    <u onClick={() => rejectMeet(meet_iddd,clientName,clientEmail,nextSevenDay[index2].date,nextSevenDay[index2].day,nextSevenDay[index2].month,matchingStarttime,matchingEndtime)}>Reject  {isCoachCancel_}</u>
  </p>
) : null}

{isCoachAccept_ !== undefined && isCoachAccept_ == 0 ? (
  <p>
    Rejected
      </p>
) : null} */} 


{isCoachCancel_ != undefined && isCoachCancel_ !== 1 ? (
  <p className='calendar-clientcanel'>
    <u onClick={() => cancelMeet(meet_iddd,clientName,clientEmail,nextSevenDay[index2].date,nextSevenDay[index2].day,nextSevenDay[index2].month,matchingStarttime,matchingEndtime)}>Cancel</u>
  </p>
) : null}

{isCoachCancel_ !== undefined && isCoachCancel_ == 1 ? (
  <p className='calendar-clientcanel'>
    Cancelled
      </p>
) : null}
                       
                        </div>
                      </td>
                      </>
                      )
                      else
                      if(index2 < 7){
                        return(
<><td></td></>
                      
                        )
                      }

})}

                      <td></td>
                      <td>
                        {/* <div className="green-event">
                          <p>personal event <span>09:00 - 10:00 </span></p>
                        </div> */}
                      </td>

                    </tr>


              </>)


})}

                    {/* <tr>
                      <th>10:00</th>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <div className="blue-event">
                          <p>client name <span>10:15 - 11:15 </span> </p>
                          <small>notes : <br /> Lorem ipsum dolor sit amet consectetur adipisicing elit.</small>
                        </div>
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <th>11:00</th>
                      <td></td>
                      <td><div className="blue-event">
                          <p>client name <span>11:00 - 12:00 </span> </p>
                          <small>notes : <br /> Lorem ipsum dolor sit amet consectetur adipisicing elit.</small>
                        </div></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                      <div className="green-event">
                          <p>personal event <span>11:00 - 12:00 </span></p>
                        </div>
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <th>12:00</th>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td><div className="blue-event">
                          <p>client name <span>12:15 - 01:15 </span> </p>
                          <small>notes : <br /> Lorem ipsum dolor sit amet consectetur adipisicing elit.</small>
                        </div></td>
                    </tr>
                    <tr>
                      <th>01:00</th>
                      <td></td>
                      <td></td>
                      <td>
                        <div className="green-event">
                          <p>personal event <span>01:00 - 02:00 </span></p>
                        </div></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
              </div>
          </div>

        </div> {/* // row */}



        <Modal
          centered
          className="unavailable-modal"
          visible={isFormShow}
          onOk={handleFormOk}
          onCancel={handleFormCancel}
          width={800}
          height={'200px'}
          footer={[]}
         
        >
          <div className="modal-data">
            <div className="modall">
              <div className="history-modal">

              <div className="cal-time">
              <form onSubmit={updateSchedule}>
      {days.map((day) => (
        <div className='row timerow' key={day} >
          <div className='col-md-2'>{day.toUpperCase()}</div>
          <div className='col-md-2'>
            <input
              type='number'
              value={availability[day].startHour}
              name='startHour'
              className='selecttime'
              onChange={(e) => handleHourChange(e, day)}
            />
          </div>
          <div className='col-md-2'>
            <input
              type='number'
              value={availability[day].startMinute}
              name='startMinute'
              className='selecttime'
              onKeyUp={(e) => handleMinuteChange(e, day)}
            />
          </div>
          <div className='col-md-1'>to</div>
          <div className='col-md-2'>
            <input
              type='number'
              value={availability[day].endHour}
              name='endHour'
              className='selecttime'
              onChange={(e) => handleHourChange(e, day)}
            />
          </div>
          <div className='col-md-2'>
            <input
              type='number'
              value={availability[day].endMinute}
              name='endMinute'
              className='selecttime'
              onChange={(e) => handleMinuteChange(e, day)}
            />
          </div>
        </div>
      ))}
      <button type='submit' >Submit</button>
    </form>

  
                    </div>
                </div>
                </div>

                </div>

  </Modal>

      </div> {/* container */}
    </section> 




    <Modal
          centered
          className="unavailable-modal avbl-modal-mobile"
          visible={isFormShow}
          onOk={handleFormOk}
          onCancel={handleFormCancel}
          width={800}
          height={1000}
          footer={[]}
         
        >
    
<div className="standard-availability">
  <div className="info">
    <div className="title">
      {" "}
      <i className="fa fa-calendar-o" /> standard availability
    </div>
  </div>

 
  <div className="availability-form">
    <div className="main-para">standard weekly availability</div>
    <div className="main-subpara">
      you can customise each day at the next step
    </div>
    <form action="" id="submit-av">
      <div className="row">

      {days.map((day) => (
        <div className="col-sm-12 form-group">
          <span>{day}:</span>
          <input
            type="number"
            className="text-top form-control dates"
            name="startHour"
           value={availability[day].startHour}
           onChange={(e) => handleHourChange(e, day)}
          />
          <input
            type="number"
            className="text-top form-control dates"
            name="startMinute"
            value={availability[day].startMinute}
            onChange={(e) => handleMinuteChange(e, day)}
          />
          <span>to</span>
          <input
            type="number"
            className="text-top form-control dates"
            name="endHour"
            value={availability[day].endHour}
            onChange={(e) => handleHourChange(e, day)}
          />
          <input
            type="number"
            className="text-top form-control dates"
            name="endMinute"
            value={availability[day].endMinute}
            onChange={(e) => handleMinuteChange(e, day)}
          />
        </div>
          ))}
       
       
    
      </div>
    </form>
  </div>
  <div className="close-button">
    <button className="btn btn-darkgreen btn-close" onClick={updateSchedule}>approve</button>
  </div>

</div>
</Modal>













  {/* <section className="user-detail-mobile">
    <div className="container">
      <div className="row">
        <div className="col-12">
          {/* <div className="meeting-reminder">
            <div className="info">
              <div className="title">upcoming meeting reminder</div>
              <p>10 minutes: client name</p>
            </div>
            <div className="meeting-link">
              <a href="#">join</a>
              <a href="#">dismiss</a>
            </div>
          </div> 
          <div className="client-name mrb-50">
            <div className="info-name mrb-10">
              {/* <h2 className="text-center">calendar show </h2> 
              <Calendar  />

      

            </div>

            <Modal
          centered
          className="unavailable-modal"
          visible={isSyncFormShow}
          onOk={handleSyncFormOk}
          onCancel={handleSyncFormCancel}
          width={800}
          height={1000}
          footer={[]}
         
        >
            <div className="personal-event">
  <div className="info">
    <div className="title">wednesday 11 january 2023</div>
  </div>
  <div className="meeting-link">
    <p className="clientname">
      <strong>client name</strong> <br /> <span>09:30 - 11:30</span>
    </p>
    <p className="notes">
      <small className="clientname">
        <strong>notes:</strong>
      </small>
      <br />
      <small>
        lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
        nonummy nibh euismod.
      </small>
    </p>
    <p className="clientname mt-5 mt-lg-4">
      <strong>personal event</strong> <br />
      <span>12:00 - 13:00 </span>
    </p>
  </div>
  <div className="close-button">
    <button className="btn btn-thulian-pink btn-close">close</button>
  </div>
</div>

</Modal>

<Modal
          centered
          className="unavailable-modal avbl-modal-mobile"
          visible={isFormShow}
          onOk={handleFormOk}
          onCancel={handleFormCancel}
          width={800}
          height={1000}
          footer={[]}
         
        >
    
<div className="standard-availability">
  <div className="info">
    <div className="title">
      {" "}
      <i className="fa fa-calendar-o" /> standard availability
    </div>
  </div>

 
  <div className="availability-form">
    <div className="main-para">standard weekly availability</div>
    <div className="main-subpara">
      you can customise each day at the next step
    </div>
    <form action="" id="submit-av">
      <div className="row">

      {days.map((day) => (
        <div className="col-sm-12 form-group">
          <span>{day}:</span>
          <input
            type="text"
            className="text-top form-control dates"
            name="startHour"
           value={availability[day].startHour}
           onChange={(e) => handleHourChange(e, day)}
          />
          <input
            type="text"
            className="text-top form-control dates"
            name="startMinute"
            value={availability[day].startMinute}
            onChange={(e) => handleMinuteChange(e, day)}
          />
          <span>to</span>
          <input
            type="text"
            className="text-top form-control dates"
            name="endHour"
            value={availability[day].endHour}
            onChange={(e) => handleHourChange(e, day)}
          />
          <input
            type="text"
            className="text-top form-control dates"
            name="endMinute"
            value={availability[day].endMinute}
            onChange={(e) => handleMinuteChange(e, day)}
          />
        </div>
          ))}
       
       
    
      </div>
    </form>
  </div>
  <div className="close-button">
    <button className="btn btn-darkgreen btn-close">approve</button>
  </div>

</div>
</Modal>



          </div>
          <div className="mrb-20">
            <p className="text-center btn-p">
              <a href="#" className="btn btn-lightgreen">
                sync calendars
              </a>
            </p>
            <p className="text-center btn-p">
              <a href="#" className="btn btn-chestnutred" >
                set availability
              </a>
            </p>
            <p className="text-center btn-p">
              <a href="#" className="btn btn-darkblue">
                schedule session
              </a>
            </p>
          </div>
         
        </div>
       
      </div>
     
    </div>
  </section> */}
  {/*/ tag wrap */}






  
  <section className="calendar-mobile user-detail-mobile">
    <div className="container">
      <div className="row align-items-center calendar-profile">
        <div className="col-8 left-top">
          <h2>
            hello <br />
            {myData !== null  && <>{myData.coach_name}</>}
          </h2>
        </div>
        <div className="col-4 right-top">
          <figure>
          {myData !== null  && 
            <img src={myData.coach_profile} />}
          </figure>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="calendar-weeksheet">

          {daysOfWeek.map((day, index) => (
         <div className={`col-weeksheet ${day.getDate() === checkedDateMob ? 'highlighted-date' : ''}`}  key={index} onClick={() => handleDateClick(day)}>
         <span>{day.getDate()}</span>
         <span>{formatDay(day)}</span>
       </div>
      ))}
            
          </div>
          {/*/ calendar-weeksheet */}
          <div className="calendar-timesheet">
            <div className="row">
              <div className="col-3 timesheet-left">
                <ul>
                {array1.map((timeslot:string, index:number) => {

let formattedTime = timeslot.slice(0, -3);


return(<>

  

         

 


  
                  <li>{formattedTime}</li>
                  </>)


})}
                </ul>
              </div>
              <div className="col-9 timesheet-right">

              {
 

  bookedTimeslot.map((item, index) => {
    // Check if the item's meeting date matches the selected date
    if (item.meetingDate === selectDateMob) {
      m = m + 1; // Increment the count for each meeting that matches the selected date
      return (
        <div key={index} className="timesheet-fix">
          <h3>{item.clientName}</h3>
          <p>
            <i className="fa fa-clock-o" aria-hidden="true" /> {item.starttime} - {item.endtime}
          </p>
        </div>
      );
    }
    return null; // Return null for items with different meeting dates
  })
}

{m === 0 ? <div className="timesheet-fix"><h3>No Meeting Found</h3></div> : null}



      
            
              </div>
            </div>
            {/*/ row */}
          </div>
          {/*/ calendar-timesheet */}
          <div className="calendar-btns">
            <p className="btn-p">
              <a href="#" className="btn btn-lightgreen">
                sync calendar
              </a>
            </p>
            <p className="btn-p">
              <a href="#" className="btn btn-orange">
                my availability
              </a>
            </p>
            <p className="btn-p">
              <a href="#" className="btn btn-darkblue">
                schedule session
              </a>
            </p>
          </div>
        </div>
        {/*/ cl-coll */}
      </div>
      {/*/ row */}
    </div>
  </section>
  {/*/ coach-feedback */}
</>




  )
}

export default Calender
