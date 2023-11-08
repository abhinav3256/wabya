// import Link from "next/link"
// ** React Imports
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {app, database} from '../../../../firebaseConfig'
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Privacy = () => {
  const databaseRef = collection(database, 'faq');
  const [count, setCount] = useState(1);
  const [faq_id, setID] = useState(null);
  const [planName, setPlanName] = useState('');
  const [planDesc, setPlanDesc] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [fireData, setFireData] = useState([]);


  useEffect(() => {
    
    getData()

    // if (token) {
    //   getData()
    // }
    // if (!token) {
    //   router.push('/super-admin/login')
    // }
  }, [])

  // fetch records
  const getData = async () => {
    await getDocs(databaseRef)
      .then((response) => {
        setFireData(response.docs.map((data) => {
          return { ...data.data(), faq_id: data.id }
        }))
      })
  }


  return(

    <> 
      <section className="faq-sec" id="faq">
        <div className="container">
          <div className="row">

          <div className="col-sm-12">
            <h2>Privacy and Policy</h2>

           

        </div>
          </div>
        </div>
      </section> {/* <!--/ faq-sec --> */}
    </>
  )
}
export default Privacy
