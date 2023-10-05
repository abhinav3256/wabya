// ** Files Imports
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { app, database } from '../../../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const router = useRouter()
  const databaseRef = collection(database, 'admin_user');
  const [fireData, setFireData] = useState([]);

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

  const getData = async () => {
    await getDocs(databaseRef)
      .then((response) => {
        setFireData(response.docs.map((data) =>{
          return {...data.data(), admin_id: data.id}
        }))
      })
  }


return (
    <section className="user-profile">
      <div className="container">
        <div className="row">

        {fireData.map((data) => {
          return(
            <>
              <div className="col-sm-12 top">
                <div className="inner-info">
                  <figure><img src={ data.profile } alt={ data.name } /></figure>
                  <h2>{ data.name } </h2>
                  <div className="right-area">
                    <div className="dropdown">
                        <div className="inner">
                          <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Edit My Profile</button>
                          <ul className="dropdown-menu">
                            <li><Link href='/super-admin/edit-profile' passHref><a className="dropdown-item">Edit Profile</a></Link></li>
                          <li><Link href='/super-admin/change-password' passHref><a className="dropdown-item">Change Password</a></Link></li>
                          </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div> {/* <!--/ top --> */}

              <div className="col-sm-4 left mrb-30">
                <div className="info-grid">
                <p>Information</p>
                <p>Contact Details: <span><a href={`mailto:${data.email}`}>{data.email}</a></span></p>
                <p>Time Zone: <span>{data.timezone}</span></p>
                <p>Languages: <span> {data.languages} </span></p>
                </div>
              </div> {/* <!--/ left --> */}

              <div className="col-sm-8 right mrb-30">
                <div className="info-grid">
                <h3>Bio</h3>
                <p>{ data.bio } </p>
                <h3>About</h3>
                <p>{ data.about }</p>
                </div>
              </div> {/* <!--/ right --> */}
            </>

          )
        })}

        </div> {/* <!--/ row --> */}
      </div>
    </section> // user profile

  )
}

export default Dashboard
