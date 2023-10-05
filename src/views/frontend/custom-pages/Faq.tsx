// import Link from "next/link"
// ** React Imports
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {app, database} from '../../../../firebaseConfig'
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Faq = () => {
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
            <h2><span>frequently asked questions</span>any questions?<br/> we've got you</h2>

            <div className="accordion-top">

            <div className="accordion" id="accordionExample">
            {/* <div className="accordion-item">
              <h3 className="accordion-header" id="headingOne"><button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">erm... what exactly is coaching?</button></h3>

            <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.</p>
              </div>
            </div>
            </div>

            <div className="accordion-item">
              <h3 className="accordion-header" id="headingTwo"><button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">why should I use coaching as a means to realise my goals?</button></h3>

              <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.</p>
              </div>
            </div>
            </div>

            <div className="accordion-item">
              <h3 className="accordion-header" id="headingThree"><button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">why should I use wabya?</button></h3>

              <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.</p>
              </div>
            </div>
            </div>

            <div className="accordion-item">
              <h3 className="accordion-header" id="headingFour"><button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">how does it work?</button></h3>

              <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.</p>
              </div>
            </div>
            </div>

            <div className="accordion-item">
              <h3 className="accordion-header" id="headingFive"><button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">how much does it cost?</button></h3>

              <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <p>Our mission is to make coaching accessible and affordable to everyone - so take a look at our membership options and don’t be shy to reach out with any questions!</p>
              </div>
            </div>
            </div>

            <div className="accordion-item">
              <h3 className="accordion-header" id="headingSix"><button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">have we missed something?</button></h3>

              <div id="collapseSix" className="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.</p>
              </div>
            </div>
            </div> */}

            {fireData.map((data) => {
                        return (
                        <>

            <div className="accordion-item">
              <h3 className="accordion-header" id={`heading${data.faq_id}`}><button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${data.faq_id}`}  aria-expanded="false" aria-controls="collapseSix">{data.question}</button></h3>

              <div id={`collapse${data.faq_id}`} className="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <p>{data.answer}</p>
              </div>
            </div>
            </div>
</>
            )

})}

          </div>
          </div>

        </div>
          </div>
        </div>
      </section> {/* <!--/ faq-sec --> */}
    </>
  )
}
export default Faq
