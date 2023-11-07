const express = require("express");
const {
	registerPatient,
	registerDoctor,
	requestOtp,
	forgotPassword,
} = require("../controllers/guestController");
const validatePatientRegister = require("../middlewares/validatePatientRegister");
const multer = require("multer");

const router = express.Router();

// register a guest as patient
router.post("/registerPatient", validatePatientRegister, registerPatient);

const storage = multer.memoryStorage();
const upload = multer({ storage });

// register a guest as doctor
router.post(
	"/registerDoctor",
	upload.fields([
		{ name: "medicalLicense", maxCount: 1 },
		{ name: "medicalDegree", maxCount: 1 },
	]),
	registerDoctor
);

// request new otp for password reset
router.post("/otp", requestOtp);

// verify user submitted otp
router.post("/forgotPassword", forgotPassword);

module.exports = router;
