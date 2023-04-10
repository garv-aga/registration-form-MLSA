import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { signUpSchema } from "../../Schemas/Index";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import docsIcon from "/assets/docs.svg";

const errNotify = (msg) => toast.error(msg);

const initialValues = {
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
};

const Form = () => {
  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema,
    onSubmit: async (values, action) => {
      let res;
      try {
        res = await axios.post("/api/save-response", values);        
      } catch (error) {
        errNotify(error);
      }


      if (res.status === 200) {
        action.resetForm();
        navigate("/success", { replace: true });
      } else {
        errNotify("Something went wrong");
      }
    },
  });

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="registrationForm">
      <div className='registrationFormELLipse'>
      <img src={docsIcon}/>
      </div>
        <div className="registrationFormContainer">
          <form onSubmit={handleSubmit}>
            <div className="registrationFormHeading formFirstHeading">
              <p>Personal information</p>
            </div>
            <div className="formHeadingBorder"></div>
            <div className="registrationInputField">
              <label htmlFor="name">Name</label>
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                type="text"
                id="name"
                name="name"
                placeholder="Please Enter Your Name"
                value={values.name}
                className={errors.name && touched.name ? "invalidInput" : ""}
              />
            </div>
            <div className="registrationInputField">
              <label htmlFor="rollNumber">Roll Number</label>
              <input
                type="number"
                autoComplete="off"
                name="rollNumber"
                id="rollNumber"
                placeholder="Please Enter Your Roll Number"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.rollNumber}
                className={errors.rollNumber && touched.rollNumber ? "invalidInput" : ""}
              />
            </div>
            <div className="registrationInputField">
              <label htmlFor="currentYear">Current Year</label>
              <input
                type="number"
                autoComplete="off"
                id="currentYear"
                name="currentYear"
                placeholder="Select Your Year"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.currentYear}
                className={errors.currentYear && touched.currentYear ? "invalidInput" : ""}
              />
            </div>
            <div className="registrationInputField">
              <label htmlFor="branch">Branch</label>
              <input
                type="text"
                autoComplete="off"
                id="branch"
                name="branch"
                placeholder="Please Enter Your Branch"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.branch}
                className={errors.branch && touched.branch ? "invalidInput" : ""}
              />
            </div>
            <div className="registrationInputField">
              <label htmlFor="kiitEmailId">Kiit Email Id</label>
              <input
                type="email"
                autoComplete="off"
                id="kiitEmailId"
                name="kiitEmailId"
                placeholder="Please Enter Your Email Id"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.kiitEmailId}
                className={errors.kiitEmailId && touched.kiitEmailId ? "invalidInput" : ""}
              />
            </div>
            <div className="registrationInputField">
              <label htmlFor="personalEmailId">Personal Email Id</label>
              <input
                type="email"
                autoComplete="off"
                id="personalEmailId"
                name="personalEmailId"
                placeholder="Please Enter Your Email Id"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.personalEmailId}
                className={errors.personalEmailId && touched.personalEmailId ? "invalidInput" : ""}
              />
            </div>
            <div className="registrationInputField">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="number"
                autoComplete="off"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Please Enter Your Phone Number"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phoneNumber}
                className={errors.phoneNumber && touched.phoneNumber ? "invalidInput" : ""}
              />
            </div>
            <div className="registrationFormHeading formPadding">
              <p>Social information</p>
            </div>
            <div className="registrationInputField">
              <label htmlFor="linkedin">Linkedin</label>
              <input
                type="text"
                autoComplete="off"
                id="linkedin"
                name="linkedin"
                placeholder="Drop Your Profile Link"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.linkedin}
                className={errors.linkedin && touched.linkedin ? "invalidInput" : ""}
              />
            </div>
            <div className="registrationInputField">
              <label htmlFor="github">Github</label>
              <input
                type="text"
                autoComplete="off"
                id="github"
                name="github"
                placeholder="Drop Your Profile Link"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.github}
                className={errors.github && touched.github ? "invalidInput" : ""}
              />
            </div>
            <div className="registrationFormHeading formPadding">
              <p>Survey information</p>
            </div>
            <div className="registrationInputField">
              <label htmlFor="expectation">What Do You Expect From This Event ? </label>
              <textarea
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                id="expectation"
                name="expectation"
                placeholder="Write in Brief..."
                value={values.expectation}
                className={errors.expectation && touched.expectation ? "invalidInput" : ""}
              />
            </div>

            {(errors.name && touched.name) ||
            (errors.rollNumber && touched.rollNumber) ||
            (errors.currentYear && touched.currentYear) ||
            (errors.branch && touched.branch) ||
            (errors.kiitEmailId && touched.kiitEmailId) ||
            (errors.personalEmailId && touched.personalEmailId) ||
            (errors.phoneNumber && touched.phoneNumber) ||
            (errors.linkedin && touched.linkedin) ||
            (errors.github && touched.github) ? (
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
            ) : null}
            <div className="registrationFormButtonContainer">
              <button type="submit" className="submitBtn">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
