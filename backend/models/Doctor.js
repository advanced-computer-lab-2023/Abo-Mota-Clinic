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
	medicalLicense: {
		type: Buffer,
		contentType: String
	},
	medicalDegree: {
		type: Buffer,
		contentType: String
	},
	registerStatus: {
		type: String,
		enum: ["pending", "approved", "rejected"],
		default: "pending",
	},
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
