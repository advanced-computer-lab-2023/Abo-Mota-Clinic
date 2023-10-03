const express = require("express");

const router = express.Router();

// Get all patient prescriptions
router.get("/getPrescriptions", (req, res) => {
	res.json({ pres: "panadol" });
});

// Get all patient's registered family members
router.get("/getFamily", (req, res) => {
	res.json({ family: "lol&&2shrooos" });
});

// Register a patient's family member
router.post("/addFamilyMember", (req, res) => {
	res.json({ addedFamily: "member" });
});

// Get all doctors
router.get("/getDoctors", (req, res) => {
	res.json({ allDoctors: "doctor" });
});

// Get all appointments
router.get("/getAppointments", (req, res) => {
	res.json({ allAppointments: "appointment" });
});

module.exports = router;
