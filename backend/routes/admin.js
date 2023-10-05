const express = require("express");
const router = express.Router();
const {
	getPackages,
    updatePackage,
    getApplicationInfo,
    addAdmin,
    deleteAdmin,
    deletePatient,
    deleteDoctor
}= require('../controllers/adminController');

// View All Packages
router.get("/getPackages", getPackages);

// Update Package
router.patch("/packages/:id", updatePackage);

// View Doctor Application Info
router.get("/viewDoctorInfo", getApplicationInfo);

// Add an Admin
router.post("/addAdmin", addAdmin);

// Delete a specific Admin
router.delete("/deleteAdmin/:userId", deleteAdmin);

// Delete a specific Patient
router.delete("/deletePatient/:userId", deletePatient);

// Delete a specific Doctor
router.delete("/deleteDoctor/:userId", deleteDoctor);

module.exports = router;
