const Doctor = require("../models/Doctor");
const Medicine = require("../models/Medicine");

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

		const updatedDoctor = await Doctor.updateOne(filter, update);
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
		const doctor = await Doctor.findOne({}).populate({
			path: "appointments",
			populate: {
				path: "patient",
				model: "Patient",
			},
		});

		// const filter = { _id: id };
		// const doctor = await Doctor.findOne(filter).populate("appointments");
		const appointments = doctor.appointments;
		res.status(200).json(appointments);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// View All Doctor's Patients
// TO BE THOROUGHLY CHANGEDDDDDDD ----- ONLY TESTINGGGGGGG
const getDoctorPatients = async (req, res) => {
	try {
		// const { id } = req.body;
		// const filter = { _id : id }
		const doctor = await Doctor.findOne({});
		const populated = await doctor.populate({
			path: "patients",
			populate: [
				{
					path: "prescriptions",
					// model: "Prescription",
					populate: {
						path: "medicines",
						model: "Medicine",
					},
				},
				{
					path: "appointments",
					model: "Appointment",
					match: {
						doctor: doctor._id,
					},
				},
			],
		});
		const patients = populated.patients;
		console.log(populated);
		res.status(200).json(patients);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	editDetails,
	getDoctorAppointments,
	getDoctorPatients,
};
