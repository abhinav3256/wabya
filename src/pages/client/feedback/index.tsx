import React, { useEffect, useState, useRef } from 'react';
import DailyIframe from '@daily-co/daily-js';
// ** React Imports


// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'
import { database } from '../../../../firebaseConfig'
import { collection, query, addDoc, where, getDocs,doc,getDoc,updateDoc } from 'firebase/firestore';



const Feedback = () => {
  


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
                  <input type="radio" name="rating" defaultValue={1} />
                  <i />
                  <input type="radio" name="rating" defaultValue={2} />
                  <i />
                  <input type="radio" name="rating" defaultValue={3} />
                  <i />
                  <input type="radio" name="rating" defaultValue={4} />
                  <i />
                  <input type="radio" name="rating" defaultValue={5} />
                  <i />
                </span>
              </div>
              <div className="form-group">
                <label>any comments you would like to share with us?</label>
                <textarea className="form-control" defaultValue={""} />
              </div>
              <div className="form-group">
                <p className="skip-link">
                  <a href="#">
                    skip{" "}
                    <i className="fa fa-long-arrow-right" aria-hidden="true" />
                  </a>
                </p>
              </div>
              <div className="form-group">
                <button className="btn btn-send">Submit</button>
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
