const express = require("express");
const router = express.Router();
const {
	getPackages,
	updatePackage,
	addPackage,
	deletePackage,
	getApplications,
	getApplicationInfo,
	handleApplication,
	addAdmin,
	deleteAdmin,
	deletePatient,
	deleteDoctor,
} = require("../controllers/adminController");

// View All Packages
router.get("/packages", getPackages);

// Update Package
router.patch("/packages/:id", updatePackage);

// Add Package
router.post("/packages", addPackage);

// Delete Package
router.delete("/packages/:id", deletePackage);

// Get all doctor applications
router.get("/applications", getApplications);

// View doctor application info
router.get("/applications/:id", getApplicationInfo);

// Handle doctor application
router.patch("/applications/:id", handleApplication);

// Add an admin
router.post("/admins", addAdmin);

// Delete a specific Admin
router.delete("/admins/:id", deleteAdmin);

// Delete a specific patient
router.delete("/patients/:id", deletePatient);

// Delete a specific doctor
router.delete("/doctors/:id", deleteDoctor);

module.exports = router;
