const express = require("express");

const router = express.Router();

// View All Packages
router.get("/packages", (req, res) => {
	res.json({ message: "alyraafatlolito" });
});

// Update Package
router.patch("/packages/:id", (req, res) => {
	const packageId = req.params.id;
});

// View Doctor Application Info
router.get("/viewDoctorInfo", (req, res) => {
	res.json({ message: "lebito" });
});

// Add an Admin
router.post("/addAdmin", (req, res) => {
	res.json({ message: "addAdmin" });
});

// Delete a specific Admin
router.delete("/deleteAdmin/:userId", (req, res) => {
	const userId = req.params.userId;
});

// Delete a specific Patient
router.delete("/deletePatient/:userId", (req, res) => {
	const userId = req.params.userId;
});

// Delete a specific Doctor
router.delete("/deleteDoctor/:userId", (req, res) => {
	const userId = req.params.userId;
});

module.exports = router;
