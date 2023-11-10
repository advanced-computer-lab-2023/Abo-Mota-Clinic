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
	payAppointmentByCard,
	payAppointmentByWallet,
	viewWallet
} = require("../controllers/patientController");

const router = express.Router();
const authorize = require("../middlewares/authorization");

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

// Change Password
router.patch("/changePassword", authorize, changePassword);

// Get all packages
router.get("/packages", authorize, getPackages);

// Get available appointments
router.get("/availableAppointments", authorize, getAvailableAppointments);

// Link Family Member Account
router.post("/linkFamily", authorize, linkFamilyMember);

// Pay appointment by card
router.patch("/payCard", authorize, payAppointmentByCard);

// Pay appointment by wallet
router.patch("/payWallet", authorize, payAppointmentByWallet);

// Subscribe for myself
router.post("/selfSubscribe", authorize, subscribeForMyself);

// Subscribe for a family member
router.post("/familySubscribe", authorize, subscribeForFamily);

// Get Subscribed Package for myself
router.get("/myPackage", authorize, getMyPackage);

// Get Subscribed Family Member Packages
router.get("/familyPackages", authorize, getFamilyPackages);

//Get Amount in my Wallet
router.get('/wallet', authorize, viewWallet)

module.exports = router;
