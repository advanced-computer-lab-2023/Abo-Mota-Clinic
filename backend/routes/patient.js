const express = require("express");
const {
	getPatient,
	getPrescriptions,
	getFamilyMembers,
	addFamilyMember,
	getDoctors,
	getAppointments,
	changePassword,
	getPackages,
	getAvailableAppointments,
	linkFamilyMember,
	subscribeForFamily,
	subscribeForMyself,
	getMyPackage,
	getFamilyPackages,
	payAppointmentByWallet,
	viewWallet,
	uploadMedicalHistory,
	deleteMedicalHistory,
	bookAppointment,
	creditDoctor,
	viewMyPackageStatus,
	viewFamilyPackageStatus,
	selfCancelSubscription,
	familyCancelSubscription,
	packageUnsubscribe,
} = require("../controllers/patientController");

const router = express.Router();
const authorize = require("../middlewares/authorization");
const multer = require("multer");
const path = require("path");

// Get Patient
router.get("/", authorize, getPatient);

// Get all patient prescriptions
router.get("/prescriptions", authorize, getPrescriptions);

// Get all patient's registered family members
router.get("/family", authorize, getFamilyMembers);

// Register a patient's family member
router.post("/family", authorize, addFamilyMember);

// Get all doctors
router.get("/doctors", authorize, getDoctors);

// Get all appointments
router.get("/appointments", authorize, getAppointments);

//handle uploads
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/");
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({ storage });

//Upload a medical history record
router.post(
	"/uploadMedicalHistory",
	authorize,
	upload.single("medicalHistory"),
	uploadMedicalHistory
);

//Delete a medical history record
router.delete("/deleteMedicalHistory/:recordId", authorize, deleteMedicalHistory);

// Change Password
router.patch("/changePassword", authorize, changePassword);

// Get all packages
router.get("/packages", authorize, getPackages);

// Get available appointments
router.get("/availableAppointments", authorize, getAvailableAppointments);

// Link Family Member Account
router.post("/linkFamily", authorize, linkFamilyMember);

// Pay appointment by card
// router.patch("/payCard", authorize, payAppointmentByCard);

// Pay appointment by wallet
router.patch("/payWallet", authorize, payAppointmentByWallet);

router.patch("/creditDoctor", authorize, creditDoctor);

// Subscribe for myself
router.post("/selfSubscribe", authorize, subscribeForMyself);

// Subscribe for a family member
router.post("/familySubscribe", authorize, subscribeForFamily);

// Get Subscribed Package for myself
router.get("/myPackage", authorize, getMyPackage);

// Get Subscribed Family Member Packages
router.get("/familyPackages", authorize, getFamilyPackages);

router.post("/test", test);

// Finalizes appointment booking in database
// Sets status to booked
router.post("/bookAppointment", authorize, bookAppointment);

// Get Amount in my Wallet
router.get("/wallet", authorize, viewWallet);

// Get Status of my package
router.get("/myPackageStatus", authorize, viewMyPackageStatus);

// Get status of family member
router.get("/familyPackageStatus", authorize, viewFamilyPackageStatus);

// Cancel my subscription
router.post("/cancelMySub", authorize, selfCancelSubscription);

// Cancel family member subscription
router.post("/cancelFamilySub", authorize, familyCancelSubscription);

// Unsubscribe from my package
router.post("/unsubscribe", packageUnsubscribe);
module.exports = router;
