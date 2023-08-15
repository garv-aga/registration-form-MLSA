const express = require("express");
const { connect, Schema, model } = require("mongoose");
const dotenv = require('dotenv');
const cors = require("cors");
const Joi = require("joi");
dotenv.config();
const { MONGO_URI } = process.env;
console.log(MONGO_URI);

const app = express();

//For parsing the body as json and it is also important if you want to access body data as req.body.*
app.use(
    cors({
        credentials: true,
        origin: ['https://frontend.unknownclub.me', 'http://localhost:5173'],
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Server Side Data validations
const registerSchema = Joi.object({
    name: Joi.string().min(2).max(30).required().messages({
        'any.required': 'Name Required',
        'string.min': 'Name should have at least 2 characters',
        'string.max': 'Name should have at most 30 characters'
    }),
    rollNumber: Joi.string().min(6).max(9).required().messages({
        'any.required': 'Roll Number Required',
        'string.min': 'Roll Number should have at least 6 characters',
        'string.max': 'Roll Number should have at most 9 characters'
    }),
    currentYear: Joi.string().length(1).required().messages({
        'any.required': 'Current Year Required',
        'string.length': 'Current Year should have exactly 1 character'
    }),
    branch: Joi.string().min(1).max(25).required().pattern(/^(?=.*[A-Za-z])/).messages({
        'any.required': 'Branch Required',
        'string.min': 'Branch should have at least 1 character',
        'string.max': 'Branch should have at most 25 characters',
        'string.pattern.base': 'Branch should contain at least one alphabet'
    }),
    kiitEmailId: Joi.string().email().required().messages({
        'any.required': 'KIIT Email Required',
        'string.email': 'KIIT Email should be a valid email address'
    }),
    personalEmailId: Joi.string().email().required().messages({
        'any.required': 'Personal Email Required',
        'string.email': 'Personal Email should be a valid email address'
    }),
    interestedField: Joi.string().required(),
    phoneNumber: Joi.string().min(10).max(15).required().pattern(/^\d+$/).messages({
        'any.required': 'Phone Number Required',
        'string.min': 'Phone Number should have at least 10 digits',
        'string.max': 'Phone Number should have at most 15 digits',
        'string.pattern.base': 'Phone Number should contain only digits'
    }),
    linkedin: Joi.string().optional(),
    github: Joi.string().min(2).max(100).required().messages({
        'any.required': 'Github Required',
        'string.min': 'Github should have at least 2 characters',
        'string.max': 'Github should have at most 100 characters'
    }),
    expectation: Joi.string().optional(),
});

//Registrations MongoDB Schema
const registrationSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name Required'],
        minlength: [2, 'Name should have at least 2 characters'],
        maxlength: [30, 'Name should have at most 30 characters']
    },
    rollNumber: {
        type: String,
        required: [true, 'Roll Number Required'],
        minlength: [6, 'Roll Number should have at least 6 characters'],
        maxlength: [9, 'Roll Number should have at most 9 characters']
    },
    currentYear: {
        type: String,
        required: [true, 'Current Year Required'],
        validate: {
            validator: (value) => value.length === 1,
            message: 'Current Year should have exactly 1 character'
        }
    },
    branch: {
        type: String,
        required: [true, 'Branch Required'],
        minlength: [1, 'Branch should have at least 1 character'],
        maxlength: [25, 'Branch should have at most 25 characters'],
        validate: {
            validator: (value) => /^(?=.*[A-Za-z])/.test(value),
            message: 'Branch should contain at least one alphabet'
        }
    },
    kiitEmailId: {
        type: String,
        required: [true, 'KIIT Email Required'],
        validate: {
            validator: (value) => /^[A-Z0-9._%+-]+@kiit\.ac\.in$/i.test(value),
            message: 'KIIT Email should be a valid KIIT email address'
        }
    },
    personalEmailId: {
        type: String,
        required: [true, 'Personal Email Required'],
        validate: {
            validator: (value) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value),
            message: 'Personal Email should be a valid email address'
        }
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone Number Required'],
        minlength: [10, 'Phone Number should have at least 10 digits'],
        maxlength: [15, 'Phone Number should have at most 15 digits'],
        validate: {
            validator: (value) => /^\d+$/.test(value),
            message: 'Phone Number should contain only digits'
        }
    },
    interestedField: {
        type: String,
        required: true,
    },
    linkedin: {
        type: String,
        default: "None Given",
    },
    github: {
        type: String,
        required: [true, 'Github Required'],
        minlength: [2, 'Github should have at least 2 characters'],
        maxlength: [100, 'Github should have at most 100 characters']
    },
    expectation: {
        type: String,
        default: "None Given",
    },
    ip: {
        type: String,
    },
    host: {
        type: String,
    },
    userAgent: {
        type: String,
    }
}, { timestamps: true });

const reg = model('registration', registrationSchema);


//API Endpoints for registrations
app.post("/api/register", async (req, res) => {
    try {
        const { name, rollNumber, currentYear, branch, kiitEmailId, personalEmailId, phoneNumber, interestedField, linkedin, github, expectation } = req.body;
        const ip = req.ip;
        const host = req.get('host');
        const userAgent = req.get('user-agent');
        const existingRegistrations = await reg.findOne({ kiitEmailId: kiitEmailId });
        if (existingRegistrations) {
            return res.status(409).json({ message: "User already registered" });
        }
        
        const registration = new reg({
            name, rollNumber, currentYear, branch, kiitEmailId, personalEmailId, phoneNumber, interestedField, linkedin, github, expectation,
            ip,
            host,
            userAgent,
        });
        await registration.save();
        return res.status(200).json({ message: "Success" });
    } catch (err) {
        console.log(err);
        let errorMsg = "Invalid Data";

        return res.status(err.status || 400).json({ message: errorMsg });
    }

})

//For all other non existent endpoints error will be generated
app.use((req, res) => {
    res.status(404).json({
        reason: "invalid-request",
        message:
            "The endpoint you wanna reach is not available! Please check the endpoint again",
        success: false,
    });
});


//Recursive function to connect to the database and start the app at a particular port
const startApp = async () => {
    try {
        // Connection With DB
        await connect(MONGO_URI);

        console.log(`Successfully connected with the Database`);

        // Start Listenting for the server on PORT
        app.listen(5000, async () => {
            console.log(`Server started on PORT 5000`);
        });
    } catch (err) {
        console.log(`Unable to connect with Database \n${err}`);
        startApp();
    }
};

startApp();