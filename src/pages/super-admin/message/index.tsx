import Link from 'next/link'
import { useEffect, useState } from 'react'
import { app, database } from '../../../../firebaseConfig';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MsgList = ()  => {

  const router = useRouter()
  const databaseRef = collection(database, 'client_user');
  const [fireData, setFireData] = useState([]);

  const msgRef = collection(database, 'message');
  const [msgData, setMsgData] = useState([]);

  const [clientMsg, setClientMsg] = useState([]);
  const [count, setCount] = useState(1);

  // Function to increment count by 1
  const incrementCount = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    const token = sessionStorage.getItem('Token')
    getData();
    getMsg();

    // if (token) {
    //   getData()
    // }
    // if (!token) {
    //   router.push('/super-admin/login')
    // }
  }, [])


  useEffect(() => {
   if(msgData.length>0){
    console.log(msgData);

    const messeges=[];
    for (let index = 0; index < msgData.length; index++) {


      //console.log(data.data[index].room);
      
        for (let index2 = 0; index2 < fireData.length; index2++) {
      
          //console.log(meeting[index].meetingName);
      
          if(msgData[index].senderId == fireData[index2].client_id){

            console.log('working');
            messeges.push({client_name:fireData[index2].client_name,msg:msgData[index].message})
          
          }

        }

      }


      setClientMsg(messeges);
   }
   console.log(fireData);
  }, [msgData])

  // fetch all client records
  const getData = async () => {
    await getDocs(databaseRef)
      .then((response) => {
        setFireData(response.docs.map((data) =>{
          return {...data.data(), client_id: data.id}
        }))
      })
  }



  // fetch all client records
  const getMsg = async () => {
    await getDocs(msgRef)
      .then((response) => {
        setMsgData(response.docs.map((data) =>{
          return {...data.data(), msg_id: data.id}
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
            <h2>Message List</h2>
          </div>
          <div className='coach-table'>

            <div className='table-responsive'>
                <table className='table table-coaches-list'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Client Name</th>
                      <th>Message</th>
                    
                    </tr>
                  </thead>
                  <tbody>
                    {clientMsg.map((data) => {
                      return (
                      <>
                      <tr>
                        <td>{count++} </td>
                        <td>{data.client_name}</td>
                        <td>{data.msg}</td>
                       
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
    </section>
  )
}

export default MsgList
