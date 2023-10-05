const mongoose = require("mongoose");
const Joi = require("joi");

const { Schema } = mongoose;
// ADDDDD NATOINALID PICTURE ATTRIBUTE YALLA
const patientSchema = new Schema({
	name: String,
	username: String,
	password: String,
	email: String,
	dob: Date,
	gender: String,
	mobile: String,
	nationalId: String,
	familyMembers: [
		{
			type: Schema.Types.ObjectId,
			ref: "Patient",
		},
	],
	emergencyContacts: [
		{
			type: Map,
			of: String,
		},
	],
	healthPackages: [
		{
			type: Schema.Types.ObjectId,
			ref: "HealthPackage",
		},
	],
	prescriptions: [
		{
			type: Schema.Types.ObjectId,
			ref: "Prescription",
		},
	],
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
