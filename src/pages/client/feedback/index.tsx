import React, { useEffect, useState, useRef } from 'react';
import DailyIframe from '@daily-co/daily-js';
// ** React Imports


// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'
import { database } from '../../../../firebaseConfig'
import { collection, query, addDoc, where, getDocs,doc,getDoc,updateDoc } from 'firebase/firestore';
import { Alert } from 'antd'


const Feedback = () => {
  
    const [starRating, setstarRating] = useState(0);
    const [isSkip, setisSkip] = useState(0);
    const ref = collection(database, 'session_feedback');
    const [message, setMessage] = useState(false);
    const [errmessage, seterrmessage] = useState(false);
    const [comment, setComment] = useState("");
    const handleInputChange = (event) => {
        const value = event.target.value;
        setstarRating(value);
        console.log(value);
      };


      const handleSubmit = async (e) =>{
        e.preventDefault();
        setMessage(false);
        seterrmessage(false);
   if(starRating > 0){
        addDoc(ref, {
            client_id: '6454',
            coach_id : '5fbvfdv',
            daily_api_meeting_id : 'atdvdv',
            meeting_id : 'anbgd',
            comment : comment,
            star_rating : Number(starRating),
            isSkip : isSkip,
           
          })
            .then(() => {

             setMessage(true);
            })
            .catch((err) => {
              console.error(err);
            })
          }else{
            seterrmessage(true);
          }

      
    }   


    const handleClose = () => {
      setMessage(false);
    };

    const handleComment = (event) => {
      setComment(event.target.value)
    }

    const handleErrClose = () => {
      seterrmessage(false);
    };


  return (
    <>
  <section className="coach-feedback">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <form>
            <div className="feedback-box">
              <h3 className="mrb-20 text-center">feedback</h3>
              <div className="form-group mrb-20">
                <label>
                  how would you rate your coaching experience today?
                </label>
                <span className="star-rating">
                {starRating <1 &&
  <input
    type="radio"
    name="rating"
    value={1}
    className=""
    onClick={ handleInputChange}
  />}
  {starRating >= 1 &&
  <input
    type="radio"
    name="rating"
    value={1}
    className="select-feeback"
    onClick={ handleInputChange}
  />
}
{starRating <2 &&
  <input type="radio" name="rating" value={2}  onClick={ handleInputChange} />}
  {starRating >= 2 &&
  <input
    type="radio"
    name="rating"
    value={2}
    className="select-feeback"
    onClick={ handleInputChange}
  />
}
{starRating <3 &&
  <input type="radio" name="rating" value={3}  onClick={ handleInputChange} /> }
  {starRating >= 3 &&
  <input
    type="radio"
    name="rating"
    value={3}
    className="select-feeback"
    onClick={ handleInputChange}
  />
}
{starRating <4 &&
  <input type="radio" name="rating" value={4}  onClick={ handleInputChange} />}
  {starRating >= 4 &&
  <input
    type="radio"
    name="rating"
    value={4}
    className="select-feeback"
    onClick={ handleInputChange}
  />}
  {starRating <5 &&
  <input type="radio" name="rating" value={5}  onClick={ handleInputChange} />}
  {starRating >= 5 &&
  <input
    type="radio"
    name="rating"
    value={5}
    className="select-feeback"
    onClick={ handleInputChange}
  />}
</span>

              </div>
              <div className="form-group">
                <label>any comments you would like to share with us?</label>
                <textarea className="form-control" value={comment} onChange={handleComment} />
              </div>
              <div className="form-group">
                <p className="skip-link">
                  <a href="/client/dashboard">
                    skip{" "}
                    <i className="fa fa-long-arrow-right" aria-hidden="true" />
                  </a>
                </p>
              </div>

              {errmessage ? (
              <Alert message="Please Select Rating" type="error" showIcon closable afterClose={handleErrClose} />
          ) : null}
              {message ? (
              <Alert message="Feedback Submitted" type="success" showIcon closable afterClose={handleClose} />
          ) : null}
              <div className="form-group">
                <button className="btn btn-send" onClick={handleSubmit}>Submit</button>
              </div>
            </div>
          </form>
        </div>
        {/*/ cl-coll */}
      </div>
      {/*/ row */}
    </div>
  </section>
  {/*/ coach-feedback */}
</>

  );
};

export default Feedback;
