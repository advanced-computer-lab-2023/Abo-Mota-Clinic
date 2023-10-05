const express = require("express");
const { 
	getPrescriptions,
	getFamilyMembers,
    addFamilyMember,
    getDoctors,
    getAppointments
} = require('../controllers/patientController');

const router = express.Router();

// Get all patient prescriptions
router.get("/getPrescriptions", getPrescriptions);

// Get all patient's registered family members
router.get("/getFamily", getFamilyMembers);

// Register a patient's family member
router.post("/addFamilyMember", addFamilyMember);

// Get all doctors
router.get("/getDoctors", getDoctors);

// Get all appointments
router.get("/getAppointments", getAppointments);

module.exports = router;
