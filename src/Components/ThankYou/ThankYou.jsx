import React from 'react'
import "./style.css"
import checkedIcon from "../../../public/assets/check.svg";
function ThankYou() {
  return (
    <div className='registrationThankYou'>
    <div className='registrationThankYouContainer'>
      <h5>Thank You For Registering</h5>
      <div className='registrationThankYouELLipse'>
      <img src={checkedIcon}/>
      </div>
      <div className='registrationThankYouContent'>
        <p>Our Team Has Received Your Submission.We Will Contact You Asap.</p>
        <p>Till Then <span className='registrationThankYouSpan'>Be A Force For Good.</span></p>
      </div>

    </div>
        
    </div>
  )
}

export default ThankYou;