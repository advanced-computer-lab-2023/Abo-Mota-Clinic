const express = require("express");
const router = express.Router();
const {
	getPackages,
    updatePackage,
    addPackage,
    deletePackage,
    getApplicationInfo,
    addAdmin,
    deleteAdmin,
    deletePatient,
    deleteDoctor
}= require('../controllers/adminController');

// View All Packages
router.get("/getPackages", getPackages);

// Update Package
router.patch("/updatePackage/:id", updatePackage);

// Add Package
router.post("/addPackage", addPackage);

// Delete Package
router.delete("/deletePackage/:id", deletePackage);

// View Doctor Application Info
router.get("/viewDoctorInfo", getApplicationInfo);

// Add an Admin
router.post("/addAdmin", addAdmin);

// Delete a specific Admin
router.delete("/deleteAdmin/:id", deleteAdmin);

// Delete a specific Patient
router.delete("/deletePatient/:id", deletePatient);

// Delete a specific Doctor
router.delete("/deleteDoctor/:id", deleteDoctor);

module.exports = router;
