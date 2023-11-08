const express = require("express");
const {
	getDoctorProfile,
	editDetails,
	getDoctorAppointments,
	getDoctorPatients,
	changePassword,
} = require("../controllers/doctorController");

//const authorize = require('../middlewares/authorization')

const router = express.Router();

// Get Doctor's Details
router.get("/", getDoctorProfile);

// Edit Email, Affiliation, Rate (?)
router.patch("/", editDetails);

// View All Doctor's Appointments
router.get("/appointments", getDoctorAppointments);

// View All Doctor's Patients
router.get("/patients", getDoctorPatients);

// Change Password
router.patch("/changePassword", changePassword);

module.exports = router;
