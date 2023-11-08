const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const Prescription = require("../models/Prescription");
const HealthPackage = require("../models/HealthPackage");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const getPatient = async (req, res) => {
	try {
		const username = req.userData.username;
		const patient = await Patient.findOne({username}).populate("healthPackage.package");
		res.status(200).json(patient);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get all patient prescriptions
const getPrescriptions = async (req, res) => {
	try {
		// const patient = await Patient.findOne({}).populate({
		//   path: "prescriptions",
		//   populate: [
		//     {
		//       path: "medicines",
		//       model: "Medicine",
		//     },
		//     {
		//       path: "doctor",
		//       model: "Doctor",
		//     },
		//   ],
		// });
		// res.status(200).json(patient.prescriptions);
		const username = req.userData.username;
		const { _id } = await Patient.findOne({username});
		const prescriptions = await Prescription.find({ patient: _id }).populate([
			{
				path: "medicines.medicine",
				model: "Medicine",
			},
			{
				path: "doctor",
				model: "Doctor",
			},
		]);
		res.status(200).json(prescriptions);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get all patient's registered family members
const getFamilyMembers = async (req, res) => {
	try {
		const username = req.userData.username;

		// ???
		const patient = await Patient.findOne({username});
		// .populate("familyMembers._id");
		// ???
		res.status(200).json(patient.familyMembers);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Add a patient's family member
const addFamilyMember = async (req, res) => {
	try {
		const { nationalId, name, gender, age, relationToPatient } = req.body;

		const username = req.userData.username;
		const loggedIn = await Patient.findOne({username});
		loggedIn.familyMembers.push({
			nationalId,
			name,
			gender,
			age,
			relationToPatient,
		});
		const updated = await Patient.updateOne({username}, { familyMembers: loggedIn.familyMembers });
		// const familyMember = await Patient.findOne({ nationalId: nationalId });
		// loggedIn.familyMembers.push({
		// 	_id: familyMember._id,
		// 	relationToPatient: relationToPatient,
		// });
		// const updated = await Patient.updateOne(
		// 	{ _id: loggedIn._id },
		// 	{ familyMembers: loggedIn.familyMembers }
		// );
		res.status(200).json(updated);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get all doctors
const getDoctors = async (req, res) => {
	try {
		const doctors = await Doctor.find({ registrationStatus: "approved" }).select("-password");
		const doctorsWithAppointments = await Promise.all(
			doctors.map(async (doctor) => {
				const appointments = await Appointment.find({ doctor: doctor._id, status: "unbooked" });
				return { ...doctor._doc, appointments };
			})
		);
		res.status(200).json(doctorsWithAppointments);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get all appointments
const getAppointments = async (req, res) => {
	try {
		// const patient = await Patient.findOne({}).populate({
		//   path: "appointments",
		//   populate: {
		//     path: "doctor",
		//     model: "Doctor",
		//   },
		// });
		// res.status(200).json(patient.appointments);
		const username = req.userData.username;
		const { _id } = await Patient.findOne({username});
		const appointments = await Appointment.find({ patient: _id }).populate("doctor");
		res.status(200).json(appointments);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const changePassword = async (req, res) => {
	try {
		const { oldPassword, newPassword } = req.body;
		// ** REPLACE THIS LINE WITH LOGIC TO FIND CURRENTLY LOGGED IN PATIENT ** DONE
		const username = req.userData.username;
		const loggedIn = await Patient.findOne({ username});
		// ** REPLACE THIS LINE WITH LOGIC TO FIND CURRENTLY LOGGED IN PATIENT **

		const isMatch = await bcrypt.compare(oldPassword, loggedIn.password);
		if (!isMatch) {
			throw new Error("Old Password is incorrect");
		}
		const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
		const updatedUser = await Patient.updateOne(
			{ _id: loggedIn._id },
			{ password: hashedPassword }
		);
		res.status(200).json(updatedUser);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getPackages = async (req, res) => {
	try {
		const filter = { isActivated: true };
		const packages = await HealthPackage.find(filter);
		res.status(200).json(packages);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getAvailableAppointments = async (req, res) => {
	try {
		const { doctorId } = req.body;
		if (!doctorId) {
			throw Error("Input a doctor ID");
		}
		if (!(await Doctor.findOne({ _id: doctorId }))) {
			throw Error("Doctor doesn't exist");
		}
		// Add milliseconds to Date.now if we want to change the starting range of appointments
		const currentDate = new Date(Date.now());
		const filter = {
			$and: [
				{ doctor: doctorId },
				{
					$or: [{ patient: { $exists: false } }, { patient: null }],
				},
				{ date: { $gt: currentDate } },
			],
		};
		const appointments = await Appointment.find(filter);
		res.status(200).json(appointments);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	getPatient,
	getPrescriptions,
	getFamilyMembers,
	addFamilyMember,
	getDoctors,
	getAppointments,
	changePassword,
	getPackages,
	getAvailableAppointments,
};
