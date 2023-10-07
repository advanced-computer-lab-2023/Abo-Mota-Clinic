const mongoose = require("mongoose");
const { Schema } = mongoose;

const prescriptionSchema = new Schema({
	date: Date,
	doctor: {
		type: Schema.Types.ObjectId,
		ref: "Doctor",
	},
	medicines: [
		{
			type: Schema.Types.ObjectId,
			ref: "Medicine",
		},
	],
	patient: {
		type: Schema.Types.ObjectId,
		ref: "Patient",
	},
	status: {
		type: String,
		enum: ["filled", "unfilled"],
		default: "unfilled",
	},
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);
module.exports = Prescription;
