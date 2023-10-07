const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const Prescription = require("../models/Prescription");

// Get all patient prescriptions
const getPrescriptions = async (req, res) => {
	try {
		const patient = Patient.findOne({}).populate("prescriptions");
		res.status(200).json(patient.prescriptions);
	} catch (error) {
		res.status(500).json({ error: "Failed to retrieve prescriptions" });
	}
};

// Get all patient's registered family members
const getFamilyMembers = async (req, res) => {
	try {
		// ???
		const patient = await Patient.findOne({}).populate("familyMembers._id");
		// ???
		res.status(200).json(patient.familyMembers);
	} catch (error) {
		res.status(500).json({ error: "Failed to retrieve family members" });
	}
};

// Add a patient's family member
const addFamilyMember = async (req, res) => {
	try {
		const { nationalId, name, gender, age, relationToPatient } = req.body;
		const loggedIn = await Patient.findOne({});
		const familyMember = await Patient.findOne({ nationalId: nationalId });
		loggedIn.familyMembers.push({
			_id: familyMember._id,
			relationToPatient: relationToPatient,
		});
		const updated = await Patient.updateOne(
			{ _id: loggedIn._id },
			{ familyMembers: loggedIn.familyMembers }
		);
		res.status(200).json({ message: updated });
	} catch (error) {
		res.status(500).json({ error: "Failed to add family member" });
	}
};

// Get all doctors
const getDoctors = async (req, res) => {
	try {
		const doctors = await Doctor.find({ registrationStatus: "approved" }).select("-password"); // Excluding password field from the output
		res.status(200).json(doctors);
	} catch (error) {
		res.status(500).json({ error: "Failed to retrieve doctors" });
	}
};

// Get all appointments
const getAppointments = async (req, res) => {
	try {
		const patient = await Patient.findOne({}).populate("appointments");
		res.status(200).json(patient.appointments);
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
