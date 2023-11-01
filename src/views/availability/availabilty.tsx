// ** MUI Imports
import Link from 'next/link'
import { useRouter } from 'next/router'
import { database } from '../../../firebaseConfig'
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  where,
  query,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import clientDetail from 'src/pages/coach/clientDetail/[id]';
import { ConsoleNetworkOutline } from 'mdi-material-ui';
import { Modal } from "antd";




const Availability = () => {

  
  const router = useRouter();

  const [date, setDate] = useState(new Date());
  const [Month, setMonth] = useState("");
  const [Date_, setDate_] = useState();
  const [Day_, setDay_] = useState("");
  const [clientData, setClientData] = useState(null);
  const [coachData, setCoachData] = useState(null);

  const [planData, setPlanData] = useState(null);

  const [MyUnavailability, setMyUnavailability] = useState([]);
  const [showUnavailability, setShowUnavailability] = useState(false);
  const [isFormShow, setisFormShow] = useState(false);

  const [isShowmsg, setisShowmsg] = useState(false);

  const [isShowErrmsg, setisShowErrmsg] = useState(false);
  const [isUnavailable, setIsUnavailable] = useState(false);
  const [unavailableId, setUnavailableId] = useState(null);

  const [userProfile, setuserProfile] = useState(null);
  const [array1, setarray1]: any[] = useState([]);
  const [selectedValueFrom, setSelectedValueFrom] = useState('');
  const [selectedValueTo, setSelectedValueTo] = useState('');

  // Filter the array for the options in the second select box based on the selectedValueFrom
  const optionsForSelectTo = array1.filter((timeSlot) => timeSlot > selectedValueFrom);

  const getTimeslots = async (date) => {
   

    var tomorrow = new Date(date);
    tomorrow.setDate(date.getDate() + 1);
    var todayDate = new Date(tomorrow).toISOString().slice(0, 10);

    console.log(todayDate);


    var startTime = "";
    var endTime = "";
    const d = date;
    var selectedDay = date.getDay();
    //console.log("selected days: " + selectedDay + "");

    setDate(date);
    setMonth(date.toLocaleString("default", { month: "long" }));
    setDate_(date.getDate());
    setDay_(date.toLocaleDateString("default", { weekday: "long" }));



   

      // //console.log(res);
      //console.log(data);



      showForm();

    //getBookedSchedule();
  };


  const setUnAvailablity = async()=>{
    setisShowErrmsg(false);
    setisShowmsg(false);
    if(selectedValueFrom == '' || selectedValueTo == ''){
      setisShowErrmsg(true);
      
    }
    else{

      const coachId = sessionStorage.getItem('coachId');
      const meetingSessionCollection = collection(database, 'unavailability');
      const queryDoc = query(meetingSessionCollection, where("coach_id", "==", coachId), where("date", "==", `${Day_} ${Month} ${Date_}`));



      getDocs(queryDoc)
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          // The record exists; update it
          querySnapshot.forEach((doc) => {
            const existingDocRef = doc.ref;
            updateDoc(existingDocRef, {
              startSlot: selectedValueFrom,
              endSlot: selectedValueTo,
            })
              .then(() => {
                setisShowmsg(true);
                getMyUnavailability();
              })
              .catch((err) => {
                console.error(err);
              });
          });
        } else {
     
    
    
          const userDocRef = collection(database, 'unavailability');
    addDoc(userDocRef, {
      
      coach_id:coachId,
      date : `${Day_} ${Month} ${Date_}`,
      startSlot:selectedValueFrom,
      endSlot:selectedValueTo,
     
     
    })
      .then((docRef) => {
        console.log(docRef)
        console.log(docRef.id)
      
setisShowmsg(true);
getMyUnavailability();

      })
      .catch((err) => {
        console.error(err);
      })
    }
  })
  }
  }

  const handleSelectFromChange = (e) => {
    setSelectedValueFrom(e.target.value);

    // If needed, you can also reset the selected value in the "to" select box here
    setSelectedValueTo('');
  };

  const handleSelectToChange = (e) => {
    setSelectedValueTo(e.target.value);
  };


  const getMyUnavailability = async () => {

    console.log('testtt');
    const coachId = sessionStorage.getItem('coachId');
    const meetingSessionCollection = collection(database, 'unavailability');
    const queryDoc = query(meetingSessionCollection, where("coach_id", "==", coachId));
  
      await getDocs(queryDoc).then((response) => {
        setMyUnavailability(
          response.docs.map((data) => {
            console.log(data.data());
            return { ...data.data(), un_id: data.id };
          })
        );
      });
     
     
   
   }

   const toggleUnavailability = () => {
    setShowUnavailability(!showUnavailability);
  };


  const handleFormOk = () => {
    setisFormShow(true);
    setisShowmsg(false);
  };

  const handleFormCancel = () => {
    setisFormShow(false);
    setisShowmsg(false);
  };


  const showForm = () => {
    console.log('testtttt');
    
    setisFormShow(true);
  };


  const checkAvailability = () => {
    const dateString = `${Day_} ${Month} ${Date_}`;
    const isDateAvailable = MyUnavailability.find((item) => item.date === dateString);
console.log(isDateAvailable);
    if(isDateAvailable){
      setUnavailableId(isDateAvailable.un_id);

      setSelectedValueFrom(isDateAvailable.startSlot);
      setSelectedValueTo(isDateAvailable.endSlot);
    }else{
      setUnavailableId(null);
      setSelectedValueFrom('');
      setSelectedValueTo('');
    }
    
    setIsUnavailable(!isDateAvailable);
  };

  const deleteDocument = async (deleteId) => {
    try {
      console.log("Deleting document with ID:", deleteId); // Debugging
      const fieldToEdit = doc(database, 'unavailability', deleteId);
      console.log("Document reference:", fieldToEdit); // Debugging
      await deleteDoc(fieldToEdit);
      setisShowmsg(true);
      await getMyUnavailability();
    } catch (err) {
      console.error("Error deleting document: ", err);
    }
  };



  // get single client data
  useEffect(() => {
   
     if(sessionStorage.getItem('coachId') != ''){
      getMyUnavailability();
     }
    
  }, []);


  useEffect(() => {
   
  checkAvailability();
   
 }, [Day_,Month,Date_,MyUnavailability]);

 useEffect(() => {
  console.log('testtt');

  const getProfile = async () => {

   console.log('testtt');
    const coachIds = sessionStorage.getItem('coachId');
    const userCollection = collection(database, 'coaches_user');
    const userDocRef = doc(userCollection, coachIds);
    const userDoc = await getDoc(userDocRef);
    console.log(userDoc.data());
    setuserProfile(userDoc.data())
    
  
  
  }
  getProfile();
}, []);

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
   
  if(userProfile != null){
    if(userProfile.start_time){
var starttime = userProfile.start_time;
    }else{
      var starttime = "09:00:00";
    }
var interval = "45";
if(userProfile.start_time){
var endtime = userProfile.end_time;
     }else{
       var endtime = "17:00:00";
     }

    }
    else{
      var starttime = "09:00:00";
      var interval = "45";
      var endtime = "17:00:00";
    }
//var endtime = "17:00:00";
var timeslots = [starttime];

//console.log(meetingByDate);

while (starttime < endtime) {

starttime = addMinutes(starttime, interval); 

if(starttime < endtime){

timeslots.push(starttime);

}

}

setarray1(timeslots);

console.log('here');
console.log(userProfile);
}, [userProfile]);
  return (

    <section className="client-profile available-form lower-letter">
      <div className="container">
        <div className="row">

      

        <div className="col-sm-2 right mrb-30">
          </div>

        <div className="col-sm-6 right mrb-30">


              <div className="info-grid">

              <Calendar onChange={getTimeslots} value={date} />



      </div>
      </div>




      <div className="col-sm-4 right mrb-30">
    <div className='coash-off'>

      <h4>All Unavailable Date</h4>

     {/* <button onClick={toggleUnavailability}>See All Unavailable Date</button> */}
      {MyUnavailability.length > 0 ? MyUnavailability.map((my, index) => (



  <p>{my.date}</p>



)) : null}

      
     
      </div>
        </div>
      </div>
      </div>



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


           

                {/* <i className="fa fa-angle-left"></i> */}
                
              </div>
        
       
            <div className="row">
                <div className="col-md-3">.</div>
                <div className="col-md-8"><h2>{Day_} {Month} {Date_}
</h2></div>
         
         </div>
              {/* <div className="row">
                <div className="col-md-3">.</div>
                <div className="col-md-8">

                {isUnavailable ? (
                <button className="btn btn-unavailable" onClick={setUnAvailablity}>
                          Set as Unavailable <i className="fa fa-arrow-right"></i>
                        </button>
                )
: (

  <button className="btn btn-unavailable" onClick={() => deleteDocument(unavailableId)}>
  Set as available <i className="fa fa-arrow-right"></i>
</button> )}
                </div>
                </div> */}
                <div className="cal-time">
                <select
        className="btn btn-time"
        value={selectedValueFrom}
        onChange={handleSelectFromChange}
      >
        <option value="">Select from</option>
        {array1.map((timeSlot, index) => (
          <option key={index} value={timeSlot}>
            {timeSlot}
          </option>
        ))}
      </select>

      <p>to</p>

      <select
        className="btn btn-time"
        value={selectedValueTo}
        onChange={handleSelectToChange}
      >
        <option value="">Select to</option>
        {optionsForSelectTo.map((timeSlot, index) => (
          <option key={index} value={timeSlot}>
            {timeSlot}
          </option>
        ))}
      </select>

  
                    </div>
                    <div className="row">
               
                <div className="col-md-12 text-center mrb-20 availability-popbtn">
                    <button className="btn btn-unavailable" onClick={setUnAvailablity}>
                          Update 
                        </button>

                      
                        </div></div>






                        <div className="row">
               
                <div className="col-md-12 text-center mrb-20 availability-popbtn">
                  

                        {!isUnavailable ? (
                <button className="btn btn-unavailable" onClick={() => deleteDocument(unavailableId)}>
                Remove 
              </button>
                )
: null}

                        </div></div>
                <div className="row">
                <div className="col-md-3">.</div>

                {isShowErrmsg && (
                <div className="col-md-12 text-center mrb-20">

                 <p className='update-show'> Select Both Start And End Time...</p>
                </div>
 )}
                {isShowmsg && (
                <div className="col-md-12 text-center mrb-20">

<p className='update-show'>  Data Updated...</p>
                </div>
 )}
                </div>

               
                 
             
                
                
              </div>
              
            </div>
         
        </Modal>
    </section>
  )
}

export default Availability
