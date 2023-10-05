const express = require("express");
const {
	getPrescriptions,
	getFamilyMembers,
	addFamilyMember,
	getDoctors,
	getAppointments,
} = require("../controllers/patientController");

const router = express.Router();

// Get all patient prescriptions
router.get("/prescriptions", getPrescriptions);

// Get all patient's registered family members
router.get("/family", getFamilyMembers);

// Register a patient's family member
router.post("/family", addFamilyMember);

// Get all doctors
router.get("/doctors", getDoctors);

// Get all appointments
router.get("/appointments", getAppointments);

module.exports = router;
