const express = require("express");
const {
	getDoctorProfile,
	editDetails,
	getDoctorAppointments,
	getDoctorPatients,
	changePassword,
	addFreeAppointmentSlots,
	acceptContract,
	scheduleFollowUp,
	viewWallet,
	uploadHealthRecords,
	getAllMedicines,
	viewPrescriptions,
	reschedulePatientAppointment,
	cancelAppointment,
	addMedicineToPrescription,
	deleteMedicineFromPrescription,
	updateMedicineInPrescription,
	addPrescription,
	updatePrescriptionDesc,
	getFollowUpRequests,
	handleFollowUpRequest,
} = require("../controllers/doctorController");

const authorize = require("../middlewares/authorization");

const router = express.Router();
const multer = require("multer");
const path = require("path");

// Get Doctor's Details
router.get("/", authorize, getDoctorProfile);

// Edit Email, Affiliation, Rate (?)
router.patch("/", authorize, editDetails);

// View All Doctor's Appointments
router.get("/appointments", authorize, getDoctorAppointments);

// View All Doctor's Patients
router.get("/patients", authorize, getDoctorPatients);

//handle uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });
//Upload a Patient's health record
router.post(
	"/uploadHealthRecord",
	authorize,
	upload.fields([{ name: "healthRecord", maxCount: 1 }]),
	uploadHealthRecords
);

// Change Password
router.patch("/changePassword", authorize, changePassword);

//Add Doctor Free Slots
router.post("/addFreeAppointmentSlots", authorize, addFreeAppointmentSlots);

//Accept Employment Contract
router.patch("/acceptContract", authorize, acceptContract);

//Add Patient Follow Up
router.post("/scheduleFollowUp", authorize, scheduleFollowUp);

//Get Amount in my Wallet
router.get("/wallet", authorize, viewWallet);

//View Health Records of My Patients
// router.get("/healthRecords", authorize, viewMyPatientHealthRecords);

router.get("/medicines", authorize, getAllMedicines);

//View Prescriptions
router.get("/prescriptions", authorize, viewPrescriptions);

//Reschedule Appointment
router.patch("/rescheduleAppointment", authorize, reschedulePatientAppointment);

//Cancel Appointment
router.patch("/cancelAppointment", authorize, cancelAppointment);

//Add medicine to prescription
router.patch("/addMedToPrescription", authorize, addMedicineToPrescription);

//Delete medicine from prescription
router.patch("/delMedFromPrescription", authorize, deleteMedicineFromPrescription);

//Update medicine dosage
router.patch("/updateMedInPrescription", authorize, updateMedicineInPrescription);

//Add prescription
router.post("/addPrescription", authorize, addPrescription);

//Update Prescription Description
router.patch("/updateDescription", authorize, updatePrescriptionDesc);

//Get Pending Follow Up Requests
router.get("/followUps", authorize, getFollowUpRequests);

//Handle Follow Up Request
router.post("/handleFollowUp", authorize, handleFollowUpRequest);

module.exports = router;
