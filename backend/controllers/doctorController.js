const Doctor = require("../models/Doctor");
const Medicine = require("../models/Medicine");
const Appointment = require("../models/Appointment");
const Prescription = require("../models/Prescription");
const bcrypt = require("bcrypt");
const saltRounds = 10;
// Get Doctor's Profile
const getDoctorProfile = async (req, res) => {
	try {
		const doctor = await Doctor.findOne({ _id: "65398a29854fd97d222966bf" });
		// const doctor = await Doctor.findOne();
		// console.log(Object.bsonsize(doctor));
		// .populate({
		// 	path: "appointments",
		// 	populate: {
		// 		path: "patient",
		// 		model: "Patient",
		// 	},
		// });
		res.status(200).json(doctor);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
// Edit Email, Affiliation, Rate
const editDetails = async (req, res) => {
	try {
		// const { id } = req.params;
		// const filter = { _id: id };
		const doctorExists = await Doctor.findOne({});
		if (!doctorExists || doctorExists.registrationStatus !== "approved") {
			throw new Error("This doctor does not exist");
		}
		const update = req.body;
		keysArray = Object.keys(update);
		if (
			keysArray.length > 3 ||
			!keysArray.includes("email") ||
			!keysArray.includes("affiliation") ||
			!keysArray.includes("rate")
		) {
			throw new Error("You can only edit email, affiliation and rate");
		}

		const updatedDoctor = await Doctor.updateOne({ _id: doctorExists._id }, update);
		// if(updatedDoctor.modifiedCount === 0) {
		// 	throw new Error("Doctor not found");
		// }

		res.status(200).json(updatedDoctor);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// View All Doctor's Appointments
// TO BE THOROUGHLY CHANGEDDDDDDD ----- ONLY TESTINGGGGGGG
const getDoctorAppointments = async (req, res) => {
	try {
		// const doctor = await Doctor.findOne({}).populate({
		//   path: "appointments",
		//   populate: {
		//     path: "patient",
		//     model: "Patient",
		//   },
		// });

		// // const filter = { _id: id };
		// // const doctor = await Doctor.findOne(filter).populate("appointments");
		// const appointments = doctor.appointments;
		// res.status(200).json(appointments);
		const { _id } = await Doctor.findOne({});
		const appointments = await Appointment.find({ doctor: _id }).populate("patient");
		res.status(200).json(appointments);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// View All Doctor's Patients
// TO BE THOROUGHLY CHANGEDDDDDDD ----- ONLY TESTINGGGGGGG

function removeDuplicates(array, key) {
	const seen = new Set();
	return array.filter((item) => {
		const value = item[key];
		if (!seen.has(value)) {
			seen.add(value);
			return true;
		}
		return false;
	});
}
const getDoctorPatients = async (req, res) => {
	try {
		// const { id } = req.body;
		// const filter = { _id : id }
		// const doctor = await Doctor.findOne({});
		// const populated = await doctor.populate({
		//   path: "patients",
		//   populate: [
		//     {
		//       path: "prescriptions",
		//       // model: "Prescription",
		//       populate: {
		//         path: "medicines",
		//         model: "Medicine",
		//       },
		//     },
		//     {
		//       path: "appointments",
		//       model: "Appointment",
		//       match: {
		//         doctor: doctor._id,
		//       },
		//     },
		//   ],
		// });
		// const patients = populated.patients;
		// // console.log(populated);
		// res.status(200).json(patients);
		const { _id } = await Doctor.findOne({});
		const appointments = await Appointment.find({ doctor: _id }).populate("patient");
		const nonNullAppointments = appointments.filter((appointment) => appointment.patient !== null);
		const patients = nonNullAppointments.map((appointment) => appointment.patient._doc);
		const uniquePatients = removeDuplicates(patients, "_id");
		// console.log(uniquePatients);
		const prescriptions = await Prescription.find({ doctor: _id }).populate("medicines.medicine");
		const patientsWithPrescriptions = uniquePatients.map((patient) => {
			//   console.log(patient);
			const patientPrescriptions = prescriptions.filter((prescription) => {
				// console.log(prescription.patient.equals(patient._id));
				return prescription.patient.equals(patient._id);
			});
			return { ...patient, prescriptions: patientPrescriptions };
		});
		// console.log(patientsWithPrescriptions);
		// console.log(nonNullAppointments);

		const patientsWithAppointments = patientsWithPrescriptions.map((patient) => {
			const options = { year: "numeric", month: "2-digit", day: "2-digit" };
			patient.formattedDob = new Date(patient.dob).toLocaleDateString("en-US", options);

			let patientAppointments = nonNullAppointments.filter((appointment) => {
				return appointment.patient._id.equals(patient._id);
			});
			//   console.log(patientAppointments);
			patientAppointments = patientAppointments.map((appointment) => {
				appointment.patient = patient._id;
				return appointment;
			});

			return { ...patient, appointments: patientAppointments };
		});

		// console.log(patientsWithAppointments);
		res.status(200).json(patientsWithAppointments);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const changePassword = async (req, res) => {
	try {
		const { oldPassword, newPassword } = req.body;
		// ** REPLACE THIS LINE WITH LOGIC TO FIND CURRENTLY LOGGED IN DOCTOR **
		const loggedIn = await Doctor.findOne({ username: "kjfllkfjadla" });
		// ** REPLACE THIS LINE WITH LOGIC TO FIND CURRENTLY LOGGED IN DOCTOR **

		const isMatch = await bcrypt.compare(oldPassword, loggedIn.password);
		if (!isMatch) {
			throw new Error("Old Password is incorrect");
		}
		const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
		const updatedUser = await Doctor.updateOne({ _id: loggedIn._id }, { password: hashedPassword });
		res.status(200).json(updatedUser);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	getDoctorProfile,
	editDetails,
	getDoctorAppointments,
	getDoctorPatients,
	changePassword,
};
