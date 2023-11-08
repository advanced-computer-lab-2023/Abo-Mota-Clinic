const express = require("express");
const {
	getDoctorProfile,
	editDetails,
	getDoctorAppointments,
	getDoctorPatients,
	changePassword,
} = require("../controllers/doctorController");

const authorize = require('../middlewares/authorization')

const router = express.Router();

// Get Doctor's Details
router.get("/", authorize, getDoctorProfile);

// Edit Email, Affiliation, Rate (?)
router.patch("/", authorize, editDetails);

// View All Doctor's Appointments
router.get("/appointments", authorize, getDoctorAppointments);

// View All Doctor's Patients
router.get("/patients", authorize, getDoctorPatients);

// Change Password
router.patch("/changePassword", authorize, changePassword);

module.exports = router;
