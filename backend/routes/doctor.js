const express = require("express");

const router = express.Router();

// Edit Email, Affiliation, Rate
router.patch("/editDetails/:id", (req, res) => {
	res.json({ email: "updated" });
});

// View All Doctor's Appointments
router.get("/getAppointments", (req, res) => {
	res.json({ allAppointments: "doctorappointment" });
});

// View All Doctor's Patients
router.get("/getPatients", (req, res) => {
	res.json({ allMyPatients: "lol" });
});

module.exports = router;
