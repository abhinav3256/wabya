// ** React Imports
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {app, database} from '../../../../firebaseConfig'
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddFAQ = () => {

  const router = useRouter();
  const databaseRef = collection(database, 'faq');
  const [count, setCount] = useState(1);
  const [faq_id, setID] = useState(null);
  const [planName, setPlanName] = useState('');
  const [planDesc, setPlanDesc] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [fireData, setFireData] = useState([]);

  const [payg_price, setPAYGPrice] = useState('');
  const [bundle_price, setBundlePrice] = useState('');

  const [question, setquestion] = useState('');
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
        const sortedData = response.docs
          .map((data) => {
            return { ...data.data(), faq_id: data.id };
          })
          .sort((a, b) => String(a.order).localeCompare(String(b.order))); // Convert order to string before comparing
  
        setFireData(sortedData);
      });
  };
  
  // add new record
  const addData = () => {
    addDoc(databaseRef, {
      question: question,
      answer : answer,
      order : fireData.length + 1,
    })
      .then(() => {
        toast.success('Data sent successfully')
        getData()
        setquestion('')
        setanswer('')
       
      })
      .catch((err) => {
        console.error(err);
      })
  }

  // edit record
  const getID = (faq_id, question, answer) => {
    setID(faq_id)
   setquestion(question)
   setanswer(answer)
    setIsUpdate(true)
    
  }

  // update record
  const updateFields = () => {
    let fieldToEdit = doc(database, 'faq', faq_id);
    updateDoc(fieldToEdit, {
      question: question,
      answer: answer,
      
    })
    .then(() => {
      toast.success('Data updated successfully!')
      getData()
      setquestion('')
   setanswer('')
      setIsUpdate(false)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  // delete record
  const deleteDocument = (faq_id) => {
    let fieldToEdit = doc(database, 'faq', faq_id);
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
            <h3>add FAQ:</h3>
            <div className="row">
              <div className="col-sm-7">
                <div className='inner-info'>
                <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()} className='form-plans'>
                  <div className="row">
                    <div className="col-sm-12">
                      <label>FAQ Question:</label>
                    </div>
                    <div className="col-sm-12">
                    <textarea name="question" id="question" cols="30" rows="4" className='form-control' onChange={(event) => setquestion(event.target.value)} value={question}></textarea>
                     </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <label>FAQ Answer:</label>
                    </div>
                    <div className="col-sm-12">
                      <textarea name="answer" id="answer" cols="30" rows="4" className='form-control' onChange={(event) => setanswer(event.target.value)} value={answer}></textarea>
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
                        <th>Question</th>
                        <th>Answer</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fireData.map((data) => {
                        return (
                        <>
                        <tr>
                          <td>{count++} </td>
                          <td>{data.question}</td>
                          <td>{data.answer}</td>
                          <td>

                              <button className='btn btn-edit'  onClick={() => getID(data.faq_id, data.question, data.answer)}>
                                <i className='fa fa-pencil'></i>
                              </button>


                              <button className='btn btn-delete' onClick={() => deleteDocument(data.faq_id)}>
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

export default AddFAQ
