import React, { useState } from "react";
import "./style.css";
import docsIcon from "../../../public/assets/docs.svg";
import TopHeader from "./TopHeader";
import { useNavigate } from "react-router-dom";
function Form() {
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    currentYear: "",
    branch: "",
    kiitEmailId: "",
    personalEmailId: "",
    phoneNumber: "",
    linkedin: "",
    github: "",
    expectation: "",
  });

const navigate= useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);

    
navigate("/success");
  }
  return (
    <>
{/* <TopHeader/> */}
{/* <div className='registrationHeroELLipse'>
      <img src={docsIcon}/>
      </div> */}
    <div className="registrationForm">

      <div className="registrationFormContainer">
        <form onSubmit={handleSubmit}>
          <div className="registrationFormHeading formFirstHeading">
            <p>Personal information</p>
          </div>
          
          <div className="registrationInputField">
            <label htmlFor="name">Name</label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="Please Enter Your Name"
              value={formData.name}
            />
          </div>
          <div className="registrationInputField">
            <label htmlFor="rollNumber">Roll Number</label>
            <input
              type="text"
              name="rollNumber"
              placeholder="Please Enter Your Roll Number"
              onChange={handleChange}
              value={formData.rollNumber}
            />
          </div>
          <div className="registrationInputField">
            <label htmlFor="currentYear">Current Year</label>
            <input
              type="text"
              name="currentYear"
              placeholder="Select Your Year"
              onChange={handleChange}
              value={formData.currentYear}
            />
          </div>
          <div className="registrationInputField">
            <label htmlFor="branch">Branch</label>
            <input
              type="text"
              name="branch"
              placeholder="Please Enter Your Branch"
              onChange={handleChange}
              value={formData.branch}
            />
          </div>
          <div className="registrationInputField">
            <label htmlFor="kiitEmailId">Kiit Email Id</label>
            <input
              type="text"
              name="kiitEmailId"
              placeholder="Please Enter Your Email Id"
              onChange={handleChange}
              value={formData.kiitEmailId}
            />
          </div>
          <div className="registrationInputField">
            <label htmlFor="personalEmailId">Personal Email Id</label>
            <input
              type="text"
              name="personalEmailId"
              placeholder="Please Enter Your Email Id"
              onChange={handleChange}
              value={formData.personalEmailId}
            />
          </div>
          <div className="registrationInputField">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Please Enter Your Phone Number"
              onChange={handleChange}
              value={formData.phoneNumber}
            />
          </div>
          <div className="registrationFormHeading formPadding">
            <p>Social information</p>
          </div>
          <div className="registrationInputField">
            <label htmlFor="linkedin">Linkedin</label>
            <input
              type="text"
              name="linkedin"
              placeholder="Drop Your Profile Link"
              onChange={handleChange}
              value={formData.linkedin}
            />
          </div>
          <div className="registrationInputField">
            <label htmlFor="github">Github</label>
            <input
              type="text"
              name="github"
              placeholder="Drop Your Profile Link"
              onChange={handleChange}
              value={formData.github}
            />
          </div>
          <div className="registrationFormHeading formPadding">
            <p>Survey information</p>
          </div>
          <div className="registrationInputField">
            <label htmlFor="expectation">What To You Expect From Event?</label>
            <textarea
              onChange={handleChange}
              name="expectation"
              placeholder="Write in Brief..."
              value={formData.expectation}
            />
          </div>
          <div className="registrationFormErrorMessage">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.49375 13.75C4.04279 13.7465 1.2477 10.9468 1.25 7.49583C1.2523 4.04487 4.05112 1.24885 7.50208 1.25C10.953 1.25115 13.75 4.04903 13.75 7.5C13.7479 10.9534 10.9471 13.7514 7.49375 13.75ZM2.5 7.6075C2.52957 10.3583 4.77569 12.5685 7.52659 12.5537C10.2775 12.5389 12.4997 10.3047 12.4997 7.55375C12.4997 4.80281 10.2775 2.56861 7.52659 2.55375C4.77569 2.53903 2.52957 4.74922 2.5 7.5V7.6075ZM8.125 10.625H6.875V9.375H8.125V10.625ZM8.125 8.125H6.875V4.375H8.125V8.125Z"
                fill="#F94545"
              />
            </svg>
            <p>Check the data before submitting the form</p>
          </div>
          <div className="registrationFormButtonContainer">
            <button onSubmit={handleSubmit}>Submit</button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default Form;
