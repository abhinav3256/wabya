import Link from 'next/link'
import { useEffect, useState } from 'react'
import { app, database } from '../../../../firebaseConfig';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClientList = ()  => {

  const router = useRouter()
  const databaseRef = collection(database, 'client_user');
  const [fireData, setFireData] = useState([]);
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

  // fetch all client records
  const getData = async () => {
    await getDocs(databaseRef)
      .then((response) => {
        setFireData(response.docs.map((data) =>{
          return {...data.data(), client_id: data.id}
        }))
      })
  }

  // view single client record

  // delete client
  const deleteDocument = (client_id) => {
    const fieldToEdit = doc(database, 'client_user', client_id);
    deleteDoc(fieldToEdit)
    .then(() => {
      // alert('Client deleted successfully!!')
      toast.success('Client deleted successfully!!');
      getData()
    })
    .catch((err) => {
      // alert('Client not deleted, due to some technical reasons!')
      toast.error('Client is not deleted!');
    })
  }

  return (

    <section className='coaches-list'>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 mrb-30'>
            <h2>Client List</h2>
          </div>

          <div className='col-sm-12'>
          <div className='coach-table'>

            <div className='table-responsive'>
                <table className='table table-coaches-list'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Client Name</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fireData.map((data) => {
                      return (
                      <>
                      <tr>
                        <td>{count++} </td>
                        <td>{data.client_name}</td>
                        <td>{data.client_email}</td>
                        <td>
                          <Link href={`/super-admin/view-clientDetail/${data.client_id}`} passHref>
                            <a className='btn btn-edit'>
                              <i className='fa fa-eye'></i>
                            </a>
                          </Link>

                              <ToastContainer/>
                            {/* <button className='btn btn-delete' onClick={() => deleteDocument(data.client_id)}>
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

export default ClientList
