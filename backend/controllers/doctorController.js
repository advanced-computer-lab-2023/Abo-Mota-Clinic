const Doctor = require("../models/Doctor");

// Edit Email, Affiliation, Rate
const editDetails = async (req, res) => {
	try {
		const { id } = req.params;
		const filter = { _id: id };
		const doctorExists = await Doctor.findOne(filter);
		if (!doctorExists) {
			throw new Error("This doctor does not exist");
		}
		const update = req.body;
		const updatedDoctor = await Doctor.updateOne(filter, update);
		res.status(200).json(updatedDoctor);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
};

// View All Doctor's Appointments
const getDoctorAppointments = async (req, res) => {};

// View All Doctor's Patients
const getDoctorPatients = async (req, res) => {};

module.exports = {
	editDetails,
	getDoctorAppointments,
	getDoctorPatients,
};
