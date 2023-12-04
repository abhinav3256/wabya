import Link from 'next/link'
import { useEffect,useState } from 'react'

import { useRouter } from 'next/router'
import { app,database } from '../../../../firebaseConfig'
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  where,
  query,
} from "firebase/firestore";


const Newmeet = () => {

  const router = useRouter()
  const clientRef = collection(database, "client_user");
  const [client, setClient] = useState(null);
  const [isActiveFilter, setIsActiveFilter] = useState('all');
  const [meeting, setMeeting] = useState([]);
  const meetingRef = collection(database, "meeting");
  

  useEffect(() => {
    const token = sessionStorage.getItem('coachId')
console.log('abc');


    if(!token){
        router.push('/coach/login')
    }else{
      getClients();
      console.log(client);
    }
}, [])

// get all meeting data
const getMeeting = async () => {
  const userId = sessionStorage.getItem("coachId");
// Get the current date
const currentDate = new Date();
console.log(currentDate);
  const queryDoc = query(meetingRef, where("coachId", "==", userId),where("meetingApiCreated", "==", true));

  await getDocs(queryDoc).then((response) => {
    setMeeting(
      response.docs.map((data) => {
        return { ...data.data(), meeting_id: data.id };
      })
    );
  });


};

useEffect(() => {

    console.log(client);
    getMeeting();

}, [client])




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



 // Event handler for the checkboxes
 const handleCheckboxChange = (event) => {
  const value = event.target.value;
  
  console.log(value);
  if (value === 'all') {
    // Handle 'all' checkbox if needed
    setIsActiveFilter('all');
  } else if (value === 'active') {
    setIsActiveFilter('active'); // Set the filter state based on the 'active' checkbox
  } else if (value === 'inactive') {
    // Handle 'inactive' checkbox if needed
    setIsActiveFilter('inactive');
  }
};

  return (
    <>
    <section className='clients-listing client-listing-desktop lower-letter'>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 filter-coll'>
            <div className='client-filter'>
              
            </div>
          </div>
          </div>
          <div className='row'>
          {meeting.map((meeting, index) => (
          <div className='col-sm-6 cl-coll'>
  
    <div className='info' key={index}>
      <h3>Abhinav</h3>
      <p>
        <span>Meeting Date:</span> <span>{meeting.meetingDate}</span>
      </p>
      <p>
        <span>Meeting Time:</span> <span>{meeting.meetingTime}  - {meeting.meetingEndTime}</span>
      </p>
      {/* Add additional meeting information as needed */}
    </div>
 
</div> ))}



           </div>
          {/* <!--/ cl-coll --> */}

        </div>
        {/* <!--/ row --> */}

    </section> 


<section className="clients-listing client-listing-mobile">
  <div className="container">
    <div className="row">
      <div className="col-12 filter-coll">
        <div className="client-filter">
          <div className="dropdown">
            <div className="inner">
              <button
                className="btn btn-darkgreen dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                filter clients
              </button>
              <ul className="dropdown-menu" style={{}}>
                <div className="form-check">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" name="filter"
              value="all"
              onChange={handleCheckboxChange} checked={isActiveFilter === "all"} />
                      all
                    </label>
                  </div>
                  <div className="checkbox">
                    <label>
                      <input type="checkbox"name="filter"
              value="active"
              onChange={handleCheckboxChange}  checked={isActiveFilter === "active"}/>
                      active
                    </label>
                  </div>
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" name="filter"
              value="inactive"
              onChange={handleCheckboxChange} checked={isActiveFilter === "inactive"}/>
                      inactive
                    </label>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {!client ? null : (
  client.filter((cl) => {
    const shouldRenderClient = cl.status === isActiveFilter || isActiveFilter === 'all';
    return shouldRenderClient;
  }).length === 0 ? (
    <h3 className='no-client'>No clients available</h3>
  ) : (
    client.map((cl, index) => {
      const shouldRenderClient = cl.status === isActiveFilter || isActiveFilter === 'all';
      return shouldRenderClient ? (
        <div className="col-6 cl-coll" key={index}>
          {/* <Link href={`${router.basePath}/coach/clientDetail/${cl.client_id}`} passHref> */}
          <Link href="#" passHref>
            <div className="info">
              <figure>
                <img src="../../images/clients-01.png" alt="" />
              </figure>
              <h3>
                {cl.client_name} <span> {cl.status}</span>
              </h3>
              <p>
                <span>Next Session</span>
              </p>
              {
              (() => {
    const currentDate = new Date();
    let k = 0;

    for (let index = 0; index < meeting.length; index++) {
      const data = meeting[index];
      const meetingDate = new Date(data.meetingDate);

      if (meetingDate > currentDate && k === 0 && data.clientId == cl.client_id) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = meetingDate.toLocaleDateString(undefined, options);

        k = k + 1; // Increment k without printing

        return (
          <span key={index}>
            {formattedDate}
           -
            {data.meetingTime}
          </span>
        );
      }
    }

    return <span>No upcoming meetings</span>; // If no meeting meets the condition
  })()
}
            </div>
          </Link>
        </div>
      ) : null;
    })
  )
)}
      {/*/ cl-coll */}
      
    
      {/*/ cl-coll */}
    </div>
    {/*/ row */}
  </div>
</section>
{/*/ clients-listing */}
</>

  )
}

export default Newmeet
