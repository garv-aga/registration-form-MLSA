import * as Yup from "yup";

export const signUpSchema = Yup.object(
    {
        name: Yup.string().min(2).max(30).required(""),
        rollNumber: Yup.string().min(6).max(9).required(""),
        currentYear: Yup.string().min(1).max(1).required(""),
        branch: Yup.string().min(1).max(25).required('').matches('^(?=.*[A-Za-z])'),
        kiitEmailId: Yup.string().email().required('').matches('@kiit.ac.in'),
        personalEmailId: Yup.string().email().required(""),
        phoneNumber: Yup.string().min(10).max(15).required(""),
        linkedin: Yup.string().min(2).max(100).required(""),
        github: Yup.string().min(2).max(100).required(""),
    }
); 
