const mongoose = require("mongoose");
const { Schema } = mongoose;

const pharmacistSchema = new Schema({
	name: String,
	username: String,
	password: String,
	email: String,
	dob: Date,
	rate: Number,
	affiliation: String,
	educationalBackground: String,
	nationalId: Buffer,
	workingLicense: Buffer,
	pharmacyDegree: Buffer,
});

const Pharmacist = mongoose.model("Pharmacist", pharmacistSchema);
module.exports = Pharmacist;