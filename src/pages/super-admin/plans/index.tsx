// ** React Imports
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {app, database} from '../../../../firebaseConfig'
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddPlan = () => {

  const router = useRouter();
  const databaseRef = collection(database, 'admin_plans');
  const [count, setCount] = useState(1);
  const [plan_id, setID] = useState(null);
  const [planName, setPlanName] = useState('');
  const [planDesc, setPlanDesc] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [fireData, setFireData] = useState([]);

  const [payg_price, setPAYGPrice] = useState('');
  const [bundle_price, setBundlePrice] = useState('');
  const [total_session, setTotalSession] = useState(0);
  const [free_session, setFreeSession] = useState(0);
  const [bg_color, setBgColor] = useState('');
  useEffect(() => {
    let token = sessionStorage.getItem('Token')
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
          return { ...data.data(), plan_id: data.id }
        }))
      })
  }

  // add new record
  const addData = () => {
    addDoc(databaseRef, {
      plan_name: planName,
      plan_desc : planDesc,
      bundle_price:bundle_price,
      payg_price:payg_price,
      total_session:total_session,
      free_session:free_session,
      status:'1'
    })
      .then(() => {
        toast.success('Data sent successfully')
        getData()
        setPlanName('')
        setPlanDesc('')
        setBundlePrice('')
        setPAYGPrice('')
      })
      .catch((err) => {
        console.error(err);
      })
  }

  // edit record
  const getID = (plan_id, plan_name, plan_desc,payg_price,bundle_price,total_session,free_session,bg_color) => {
    setID(plan_id)
    setPlanName(plan_name)
    setPlanDesc(plan_desc)
    setPAYGPrice(payg_price)
    setBundlePrice(bundle_price)
    setIsUpdate(true)
    setTotalSession(total_session)
    setFreeSession(free_session)
    setBgColor(bg_color)

    
  }

  // update record
  const updateFields = () => {
    let fieldToEdit = doc(database, 'admin_plans', plan_id);
    updateDoc(fieldToEdit, {
      plan_name: planName,
      plan_desc: planDesc,
      bundle_price:bundle_price,
      payg_price:payg_price,
      total_session:total_session,
      free_session:free_session,
      bg_color:bg_color,
    })
    .then(() => {
      toast.success('Data updated successfully!')
      getData()
      setPlanName('')
      setPlanDesc('')
      setBundlePrice('')
      setPAYGPrice('')
      setIsUpdate(false)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  // delete record
  const deleteDocument = (plan_id) => {
    let fieldToEdit = doc(database, 'admin_plans', plan_id);
    deleteDoc(fieldToEdit)
    .then(() => {
      toast.success('Data deleted successfully!')
      getData()
    })
    .catch((err) => {
      toast.error('Cannot Delete that field..')
    })
  }

  return (
    <section className="client-password coaches-list">
      <div className="container">
        <div className="row">
          <ToastContainer/>
          <div className="col-sm-12">
            <h3>add plans:</h3>
            <div className="row">
              <div className="col-sm-7">
                <div className='inner-info'>
                <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()} className='form-plans'>
                  <div className="row">
                    <div className="col-sm-12">
                      <label>Plan Name:</label>
                    </div>
                    <div className="col-sm-12">
                        <input type="text" name="plan_name" id="plan_name" className='form-control' onChange={(event) => setPlanName(event.target.value)} value={planName} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <label>Plan Description:</label>
                    </div>
                    <div className="col-sm-12">
                      <textarea name="plan_desc" id="plan_desc" cols="30" rows="4" className='form-control' onChange={(event) => setPlanDesc(event.target.value)} value={planDesc}></textarea>
                    </div>
                  </div>
                  

                  <div className="row">
                    <div className="col-sm-12">
                      <label>PAYG Price:</label>
                    </div>
                    <div className="col-sm-12">
                        <input type="number" name="payg_price" id="bundle_price" className='form-control' onChange={(event) => setPAYGPrice(event.target.value)} value={payg_price} />
                    </div>
                  </div>


                  <div className="row">
                    <div className="col-sm-12">
                      <label>Bundle Price:</label>
                    </div>
                    <div className="col-sm-12">
                        <input type="number" name="bundle_price" id="bundle_price" className='form-control' onChange={(event) => setBundlePrice(event.target.value)} value={bundle_price} />
                    </div>
                  </div>


                  <div className="row">
                    <div className="col-sm-12">
                      <label>Total Session:</label>
                    </div>
                    <div className="col-sm-12">
                        <input type="number" name="total_session" id="total_session" className='form-control' onChange={(event) => setTotalSession(event.target.value)} value={total_session} />
                    </div>
                  </div>

                 
                  <div className="row">
                    <div className="col-sm-12">
                      <label>Background Color:</label>
                    </div>
                    <div className="col-sm-12">
                        <input type="color" name="bg_color" id="bg_color" className='form-control' onChange={(event) => setBgColor(event.target.value)} value={bg_color} />
                    </div>
                  </div>
                 



                      {
                        isUpdate ?
                        (
                          <>
                            <div className="row">
                              <div className="col-sm-12">
                                <input type="submit" value="update" className='btn btn-save' onClick={updateFields} />
                              </div>
                            </div>
                          </>
                        ) :
                        (
                          <>
                            <div className="row">
                              <div className="col-sm-12">
                                <input type="submit" value="save" className='btn btn-save' onClick={addData} />
                              </div>
                            </div>
                          </>
                        )
                      }

                </form>
                </div>
              </div>
              <div className="col-sm-5">
                  <figure>
                    <img src="../../images/banner-bg.png" alt="Images Logo" />
                  </figure>
              </div>
            </div>
            <div className='col-sm-12'>
            <div className='coach-table'>

              <div className='table-responsive'>
                  <table className='table table-coaches-list'>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Plan Name</th>
                        <th>Description</th>

                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fireData.map((data) => {
                        return (
                        <>
                        <tr>
                          <td>{count++} </td>
                          <td>{data.plan_name}</td>
                          <td>{data.plan_desc}</td>
                          <td>

                              <button className='btn btn-edit'  onClick={() => getID(data.plan_id, data.plan_name, data.plan_desc, data.payg_price, data.bundle_price,data.total_session,data.free_session,data.bg_color)}>
                                <i className='fa fa-pencil'></i>
                              </button>


                              <button className='btn btn-delete' onClick={() => deleteDocument(data.plan_id)}>
                                <i className='fa fa-trash'></i>
                              </button>

                          </td>
                        </tr>
                        </>
                        )

                      })}


                    </tbody>
                  </table>
              </div>
            </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default AddPlan
