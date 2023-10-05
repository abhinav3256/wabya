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
  query
} from "firebase/firestore";


const ViewBasic = () => {

  const router = useRouter()
  const [meeting,setMeeting] = useState([]);

  // next meeting scheduled
  const [nextMeeting, setNextMeeting] = useState(null);

  // useEffect(() => {
  //   const today = new Date();
  //   db.collection("meeting")
  //     .where("user_id", "==", userId)
  //     .where("meeting_date", ">=", today)
  //     .orderBy("meeting_date")
  //     .limit(1)
  //     .get()
  //     .then((querySnapshot) => {
  //       if (!querySnapshot.empty) {
  //         const doc = querySnapshot.docs[0];
  //         const meetingDate = doc.data().meetingDate.toDate();
  //         const meetingTime = doc.data().meetingTime.toDate();
  //         setNextMeeting(new Date(
  //           meetingDate.getFullYear(),
  //           meetingDate.getMonth(),
  //           meetingDate.getDate(),
  //           meetingTime.getHours(),
  //           meetingTime.getMinutes(),
  //           meetingTime.getSeconds(),
  //           meetingTime.getMilliseconds()
  //         ));
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error getting next meeting date:", error);
  //     });
  // }, [userId]);


  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        if (router.query.coach_id !== undefined) { // check if coach_id is defined
          const coachesCollection = collection(database, 'client_user');
          const coachesQuery = query(coachesCollection, where('assign_coach_id', '==', router.query.coach_id));
          const coachesSnapshot = await getDocs(coachesQuery);
          // const coachesData = coachesSnapshot.docs.map((doc) => ({
          //   id: doc.id,
          //   ...doc.data(),
          // }));

          const coachesData = coachesSnapshot.docs.map((doc) => {
            const anonymizedName = doc.data().client_name.charAt(0) + "*".repeat(doc.data().client_name.length - 1);
            return {
              id: doc.id,
              ...doc.data(),
              anonymized_name: anonymizedName
            };
          }).sort((a, b) => a.client_name.localeCompare(b.client_name));
          setMeeting(coachesData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCoaches();
  }, [router.query.coach_id]);

  useEffect(() => {
    const token = sessionStorage.getItem('adminId')

    if(!token){
        router.push('/super-admin/login')
    }

}, []);



  return (
    <section className='clients-listing'>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 filter-coll'>
            <div className='client-filter'>
              <div className='dropdown'>
                <div className='inner'>
                  <button
                    className='btn btn-secondary dropdown-toggle'
                    type='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    Filter Clients
                  </button>
                  <ul className='dropdown-menu'>
                    <div className='form-check'>
                      <div className='checkbox'>
                        <label>
                          <input type='checkbox' value='' />
                          All
                        </label>
                      </div>
                      <div className='checkbox'>
                        <label>
                          <input type='checkbox' value='' />
                          Active
                        </label>
                      </div>
                      <div className='checkbox'>
                        <label>
                          <input type='checkbox' value='' />
                          Inactive
                        </label>
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          { meeting.map((data) => {
            return (
                <>
                  <div className='col-sm-3 cl-coll'>
                    <div className='info'>
                      <figure> <img src='../../../images/clients-01.png' alt='' /> </figure>
                      <h3> { data.anonymized_name } <span>Private</span> </h3>
                      <p> <span>Next Session</span> </p>
                      <p>client id : <br/> {data.id} </p>
                      <p>{ new Date(data.meetingDate).toLocaleDateString("en-US", { weekday: 'long' }) }</p>
                      <p>{ new Date(data.meetingDate).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }) }</p>
                      <p>{ data.meetingTime }</p>
                    </div>
                  </div>
                </>
              );
            })}

        </div>
        {/* <!--/ row --> */}
      </div>
    </section> // view-client-listing via coach
  )
}

export default ViewBasic
