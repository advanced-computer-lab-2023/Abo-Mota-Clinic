const express = require("express");
const {
	getPatient,
	getPrescriptions,
	getFamilyMembers,
	addFamilyMember,
	getDoctors,
	getAppointments,
	changePassword,
	getPackages,
	getAvailableAppointments,
} = require("../controllers/patientController");

const router = express.Router();

// Get Patient
router.get("/", getPatient);

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

// Change Password
router.patch("/changePassword", changePassword);

// Get all packages
router.get("/packages", getPackages);

// Get available appointments
router.get("/availableAppointments", getAvailableAppointments);

module.exports = router;
