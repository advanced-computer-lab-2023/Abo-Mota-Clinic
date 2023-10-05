const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const Prescription = require("../models/Prescription");

// Get all patient prescriptions
const getPrescriptions = async (req, res) => {
	try {
		const prescriptions = await Prescription.find({ patient: req.body.patientId });
		res.status(200).json(prescriptions);
	} catch (error) {
		res.status(500).json({ error: "Failed to retrieve prescriptions" });
	}
};

// Get all patient's registered family members
const getFamilyMembers = async (req, res) => {
	try {
		const patient = await Patient.findById(req.body.patientId).populate("familyMembers");
		res.status(200).json(patient.familyMembers);
	} catch (error) {
		res.status(500).json({ error: "Failed to retrieve family members" });
	}
};

// Add a patient's family member
const addFamilyMember = async (req, res) => {
	try {
		const { nationalId } = req.body;
		const familyMember = await Patient.find({ nationalId: nationalId });

		patient.familyMembers.push(familyMember._id);
		await patient.save();

		res.status(200).json({ message: "Family member added successfully" });
	} catch (error) {
		res.status(500).json({ error: "Failed to add family member" });
	}
};

// Get all doctors
const getDoctors = async (req, res) => {
	try {
		const doctors = await Doctor.find().select("-password"); // Excluding password field from the output
		res.status(200).json(doctors);
	} catch (error) {
		res.status(500).json({ error: "Failed to retrieve doctors" });
	}
};

// Get all appointments
const getAppointments = async (req, res) => {
	try {
		const appointments = await Appointment.find({ patient: req.params.patientId });

		res.status(200).json(appointments);
	} catch (error) {
		res.status(500).json({ error: "Failed to retrieve appointments" });
	}
};

module.exports = {
	getPrescriptions,
	getFamilyMembers,
	addFamilyMember,
	getDoctors,
	getAppointments,
};
