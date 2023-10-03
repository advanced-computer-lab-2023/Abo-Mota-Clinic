const mongoose = require("mongoose");
const { Schema } = mongoose;

const patientSchema = new Schema({
	name: String,
	username: String,
	password: String,
	email: String,
	dob: Date,
	gender: String,
	mobile: String,
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
});

mongoose.model("Patient", patientSchema);
