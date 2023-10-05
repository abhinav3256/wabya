// ** React Imports
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {app, database} from '../../../../firebaseConfig'
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Basic = () => {

  const router = useRouter();
  const databaseRef = collection(database, 'help');
  const [count, setCount] = useState(1);
  const [help_id, setID] = useState(null);
  const [planName, setPlanName] = useState('');
  const [planDesc, setPlanDesc] = useState('');
  const [isUpdate, setIsUpdate] = useState(true);
  const [fireData, setFireData] = useState([]);

  const [payg_price, setPAYGPrice] = useState('');
  const [bundle_price, setBundlePrice] = useState('');

  const [helpText, sethelpText] = useState('');
  const [answer, setanswer] = useState('');

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
          return { ...data.data(), help_id: data.id }
        }))
      })
  }

  useEffect(() => {
   
    if(fireData.length > 0){
      document.getElementById("helpid").click();
    }

    // if (token) {
    //   getData()
    // }
    // if (!token) {
    //   router.push('/super-admin/login')
    // }
  }, [fireData])

  // add new record
  const addData = () => {
    addDoc(databaseRef, {
      helpText: helpText
    
    })
      .then(() => {
        toast.success('Data sent successfully')
        getData()
        sethelpText('')
       
      })
      .catch((err) => {
        console.error(err);
      })
  }

  // edit record
  const getID = (help_id, helpText) => {
    setID(help_id)
  sethelpText(helpText)
    setIsUpdate(true)
    
  }

  // update record
  const updateFields = () => {
    let fieldToEdit = doc(database, 'help', help_id);
    updateDoc(fieldToEdit, {
      helpText: helpText,
    
      
    })
    .then(() => {
      toast.success('Data updated successfully!')
      getData()
     sethelpText('')
      setIsUpdate(false)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  // delete record
  const deleteDocument = (help_id) => {
    let fieldToEdit = doc(database, 'faq', help_id);
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
            <h3>Update Help Text:</h3>
            <div className="row">
              <div className="col-sm-7">
                <div className='inner-info'>
                <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()} className='form-plans'>
                  <div className="row">
                    <div className="col-sm-12">
                      <label>Text:</label>
                    </div>
                    <div className="col-sm-12">
                    <textarea name="question" id="question" cols="30" rows="4" className='form-control' onChange={(event) => sethelpText(event.target.value)} value={helpText}></textarea>
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
            <div className='coach-table' style={{ display: "none" }}>

              <div className='table-responsive'>
                  <table className='table table-coaches-list'>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Help Text</th>
                        <th>Answer</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      {fireData.map((data) => {
                        return (
                        <>
                        <tr>
                          <td>{count++} </td>
                          <td>{data.helpText}</td>
                          
                          <td>

                              <button className='btn btn-edit' id="helpid" onClick={() => getID(data.help_id, data.helpText)}>
                                <i className='fa fa-pencil'></i>
                              </button>


                              {/* <button className='btn btn-delete' onClick={() => deleteDocument(data.faq_id)}>
                                <i className='fa fa-trash'></i>
                              </button> */}

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
    </section>
  )
}

export default Basic
