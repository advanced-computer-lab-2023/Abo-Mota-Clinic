const Doctor = require("../models/Doctor");
const Medicine = require("../models/Medicine");
const Appointment = require("../models/Appointment");
const Prescription = require("../models/Prescription");
const Patient = require("../models/Patient")
const bcrypt = require("bcrypt");
const saltRounds = 10;
// Get Doctor's Profile
const getDoctorProfile = async (req, res) => {
	try {
		const username = req.userData.username
		const doctor = await Doctor.findOne({ username});
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
		const username = req.userData.username
		const doctorExists = await Doctor.findOne({username});
		if (!doctorExists || doctorExists.registrationStatus !== "approved") {
			throw new Error("This doctor does not exist");
		}
		const update = req.body;
		const keysArray = Object.keys(update);
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
		const username = req.userData.username
		const { _id } = await Doctor.findOne({username});
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
		const username = req.userData.username

		const { _id } = await Doctor.findOne({username});
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

const uploadHealthRecords = async (req, res) => {
	try{
		const {username} = req.body;
		const patient = await Patient.findOne({username});
		if(!patient)
			throw new Error();
		const healthRecord = {
			data: req.files.healthRecord[0].buffer,
			contentType: req.files.healthRecord[0].mimetype
		}
		console.log(healthRecord);
		const updated = await Patient.updateOne({username}, { healthRecords: [...patient.healthRecords, healthRecord] });
		res.status(200).json(updated);
	}catch(error) {
		return res.status(500).json({ error: error.message });
	}
}

const changePassword = async (req, res) => {
	try {
		const { oldPassword, newPassword } = req.body;
		// ** REPLACE THIS LINE WITH LOGIC TO FIND CURRENTLY LOGGED IN DOCTOR ** DONE
		const username = req.userData.username

		const loggedIn = await Doctor.findOne({ username });
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

const acceptContract = async (req, res) => {
	try{

		const username = req.userData.username;

		const doctor = await Doctor.findOne({username , registrationStatus: "approved"});
		if(!doctor)
			throw new Error("Doctor not approved by admin");

		const updatedDoctor = await Doctor.updateOne({_id: doctor._id}, {contractApproved: true});
		res.status(200).json({message: "Doctor accepted contract" , updatedDoctor});

	}catch(error){
		res.status(500).json({message: error.message})
	}
}



const addFreeAppointmentSlots = async (req, res) => {
	
	try{

		const username = req.userData.username;

		const doctor = await Doctor.findOne({username , registrationStatus: "approved", contractApproved: true});

		if(!doctor)
			throw new Error("Doctor not approved by admin or didn't approve contract");


		const {date, startTime, endTime, appointmentDuration, buffer} = req.body;
		console.log(req.body);
		// Parse the date and startTime from the request body
		const startTimeParts = startTime.split(':');
		const startHours = parseInt(startTimeParts[0], 10) - 2;
		const startMinutes = parseInt(startTimeParts[1], 10);

		const endTimeParts = endTime.split(":");
		const endHours = parseInt(endTimeParts[0]) - 2;
		const endMinutes = parseInt(endTimeParts[1]);

		const createdAppointments = [];
		//assuming that the buffer and duration and in mins
		for (let i = startHours * 60 + startMinutes; i < (endHours * 60 + endMinutes); i += appointmentDuration + buffer) {

			const dateTime = new Date(date);
			dateTime.setMinutes(i);
			const appointment = await Appointment.create({date: dateTime, doctor: doctor._id});
			createdAppointments.push(appointment);
		}

		console.log(createdAppointments)

		res.status(200).json({message: "Appointments created successfully", appointments: createdAppointments });

	}catch(error){
		res.status(500).json({message: error.message})
	}
};

const scheduleFollowUp = async(req, res) => {

	try{
		const username = req.userData.username;
		const doctor = await Doctor.findOne({username});

		const {patientUsername, followUpDate} = req.body;
		
		const patient = await Patient.findOne({username: patientUsername});

		if(!patient)
			throw new Error("This patient does not exist");

		const appointment = await Appointment.create({date: followUpDate, status: "upcoming", doctor: doctor._id, patient: patient._id});

		res.status(200).json({message: "Follow up added successfully" , appointment});

	}catch(error){
		res.status(500).json({message: error.message});
	}
};

const viewWallet = async (req, res) => {
	
	try{

		const username = req.userData.username;
		const loggedIn = await Doctor.findOne({username});

		res.status(200).json({wallet: loggedIn.wallet});

	}catch(error){
		res.status(500).json({message: error.message});
	}

};


module.exports = {
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

};
