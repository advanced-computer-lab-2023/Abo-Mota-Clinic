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
	changePassword,
} = require("../controllers/adminController");
const authorize = require('../middlewares/authorization')

// View All Packages
router.get("/packages", authorize, getPackages);

// Update Package
router.patch("/packages/:id", authorize, updatePackage);

// Add Package
router.post("/packages",authorize, addPackage);

// Delete Package
router.delete("/packages/:id", authorize, deletePackage);

// Get all doctor applications
router.get("/applications", authorize, getApplications);

// View doctor application info
router.get("/applications/:id", authorize, getApplicationInfo);

// Handle doctor application
router.patch("/applications/:id", authorize, handleApplication);

// Add an admin
router.post("/admins", authorize,addAdmin);

// DELETES TBD IF PARAMS IN URL
// Delete a specific Admin
router.delete("/admins",authorize, deleteAdmin);

// Delete a specific patient
router.delete("/patients", authorize, deletePatient);

// Delete a specific doctor
router.delete("/doctors", authorize, deleteDoctor);

// Change Password
router.patch("/changePassword", authorize, changePassword);

module.exports = router;
