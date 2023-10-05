const express = require("express");
const {
	editDetails,
    getDoctorAppointments,
    getDoctorPatients
} = require('../controllers/doctorController');

const router = express.Router();

// Edit Email, Affiliation, Rate
router.patch("/editDetails/:id", editDetails);

// View All Doctor's Appointments
router.get("/getAppointments", getDoctorAppointments);

// View All Doctor's Patients
router.get("/getPatients", getDoctorPatients);

module.exports = router;
