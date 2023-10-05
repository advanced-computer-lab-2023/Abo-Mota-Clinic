const express = require("express");
const {
	editDetails,
	getDoctorAppointments,
	getDoctorPatients,
} = require("../controllers/doctorController");

const router = express.Router();

// Edit Email, Affiliation, Rate (?)
router.patch("/:id", editDetails);

// View All Doctor's Appointments
router.get("/appointments", getDoctorAppointments);

// View All Doctor's Patients
router.get("/patients", getDoctorPatients);

module.exports = router;
