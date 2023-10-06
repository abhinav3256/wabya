import Link from 'next/link'
import { useEffect, useState } from 'react'
import { app, database } from '../../../../firebaseConfig';
import { collection, getDocs,doc, deleteDoc,updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RequestList = ()  => {

  const router = useRouter()
  const databaseRef = collection(database, 'newPlanRequest');
  const clientRef = collection(database, 'client_user');
  const planRef = collection(database, 'admin_plans');
  const [fireData, setFireData] = useState([]);
  const [clientData, setClientData] = useState([]);
  const [planData, setPlanData] = useState([]);
  const [count, setCount] = useState(1);

  // Function to increment count by 1
  const incrementCount = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    const token = sessionStorage.getItem('Token')
    getData()

    // if (token) {
    //   getData()
    // }
    // if (!token) {
    //   router.push('/super-admin/login')
    // }
  }, [])

  // fetch all coaches records
  const getData = async () => {
    await getDocs(databaseRef)
      .then((response) => {
        setFireData(response.docs.map((data) =>{
           
          return {...data.data(), request_id: data.id}
            
        }))
      })
  }


  const getAllPlans = async () => {
    await getDocs(planRef)
      .then((response) => {
        setPlanData(response.docs.map((data) =>{
          return {...data.data(), plan_id: data.id}
        }))
      })
  }

  useEffect(() => {
    if (fireData.length > 0) {
        getAllClient();
        getAllPlans();
    }
  }, [fireData]);


  useEffect(() => {
    if (fireData.length > 0) {
        getAllClient();
    }
  }, [fireData]);

  useEffect(() => {
    if (clientData.length > 0) {
       console.log(clientData);
       
    }
  }, [clientData]);
  // fetch all coaches records
  const getAllClient = async () => {
    await getDocs(clientRef)
      .then((response) => {
        setClientData(response.docs.map((data) =>{
            
          return {...data.data(), client_id: data.id}
            
        }))
      })
  }


  function getClientName(id){
   
        console.log(id);
       const item = clientData.find((obj) => obj.client_id === id.client_id);
        let a= item ? item.client_name : null;
console.log(a);
       return a;
  }


  function getPlanName(id){
   
    console.log(id);
   const item = planData.find((obj) => obj.plan_id === id.plan_id );
    let a= item ? item.plan_name : null;
console.log(a);
   return a;
}




function getNewPlanName(id){
   
    console.log(id);
   const item = planData.find((obj) => obj.plan_id === id.new_plan_id );
    let a= item ? item.plan_name : null;
console.log(a);
   return a;
}


const updateUserPlan = async (event) => {
    
    const new_plan_id =  event.target.getAttribute("data-new_plan_id")
    const client_id =  event.target.getAttribute("data-client_id")
    const request_id =  event.target.getAttribute("data-request_id")
    const fieldToEdit = doc(database, 'client_user', client_id);
    const fieldToEdit2 = doc(database, 'newPlanRequest', request_id);

    updateDoc(fieldToEdit, {
      plan_id:new_plan_id
    })
    .then(() => {
      toast.success('Client Plan updated successfully!')

      updateDoc(fieldToEdit2, {
        status:2
      })
      .then(() => {
        getData();
       
      })
      .catch((err) => {
        console.log(err);
      })
  
     
    })
    .catch((err) => {
      console.log(err);
    })

  };
  // view single coach record

  // delete coach

  const deleteDocument = (coach_id) => {
    let fieldToEdit = doc(database, 'coaches_user', coach_id);

      deleteDoc(fieldToEdit)
      .then(() => {
        toast.success('Coach deleted successfully!!')
        getData()
      })
      .catch((err) => {
        toast.error('Coach record is not deleted!')
      })
  }

  return (
    <section className='coaches-list'>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 mrb-30'>
            <h2>Request List</h2>
          </div>
          <div className='col-sm-12'>
          <div className='coach-table'>
            <div className='table-responsive'>

                <table className='table table-coaches-list'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Client Name</th>
                      <th>Current Plan</th>
                      <th>New Plan Request</th>
                      <th>Actions</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {fireData.map((data) => {

                        if(data.status == 1){
                        var client_name=getClientName(data);
                        var plan_name=getPlanName(data);
                        var new_plan_name=getNewPlanName(data);
                      return (
                      <>
                      <tr>
                        <td>{count++} </td>
                        <td>{client_name}</td>
                        <td>{plan_name}</td>
                        <td>{new_plan_name}</td>

                        <td><button className='btn btn-success'  data-request_id={data.request_id} data-new_plan_id={data.new_plan_id} data-client_id={data.client_id}  onClick={updateUserPlan}>Update Plan</button></td>
                        <td>

                          

                            <ToastContainer />
                            {/* <button className='btn btn-delete' onClick={() => deleteDocument(data.coach_id)}>
                              <i className='fa fa-trash'></i>
                            </button> */}

                        </td>
                      </tr>
                      </>
                      )
                        }
                    })}

{count == 1 ? (
        <tr>
            <td colSpan="6">No data found</td>
        </tr>
    ) : null }


                  </tbody>
                </table>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RequestList
