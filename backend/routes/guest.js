const express = require('express');
const { 
    registerPatient, 
    registerDoctor 
} = require('../controllers/guestController');
const validatePatientRegister = require('../middlewares/validatePatientRegister');

const router = express.Router();

// register a guest as patient
router.post('/registerPatient', validatePatientRegister, registerPatient);

// register a guest as doctor
router.post('/registerDoctor', registerDoctor);





module.exports = router;