const mongoose = require("mongoose");
const { Schema } = mongoose;

const doctorSchema = new Schema({
	name: String,
	username: String,
	password: String,
	email: String,
	dob: Date,
	rate: Number,
	affiliation: String,
	speciality: String,
	educationalBackground: String,
	nationalId: Buffer,
	medicalLicense: Buffer,
	medicalDegree: Buffer,
	patients: [
		{
			type: Schema.Types.ObjectId,
			ref: "Patient",
		},
	],
	prescriptions: [
		{
			type: Schema.Types.ObjectId,
			ref: "Prescription",
		},
	],
	appointments: [
		{
			type: Schema.Types.ObjectId,
			ref: "Appointment",
		},
	],
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
