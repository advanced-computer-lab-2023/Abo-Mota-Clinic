const express = require("express");
const { registerPatient, registerDoctor } = require("../controllers/guestController");
const validatePatientRegister = require("../middlewares/validatePatientRegister");
const multer = require('multer');
const upload = multer(); 

const router = express.Router();

// register a guest as patient
router.post("/registerPatient", validatePatientRegister, registerPatient);

// register a guest as doctor
router.post("/registerDoctor",upload.fields([{ name: 'medicalLicense', maxCount: 1 }, { name: 'medicalDegree', maxCount: 1 }]), registerDoctor);

module.exports = router;