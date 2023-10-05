const mongoose = require("mongoose");
const { Schema } = mongoose;

const appointmentSchema = new Schema({
	date: Date,
	status: {
		type: String,
		enum: ["completed", "upcoming", "cancelled"],
		default: "upcoming",
	},
	doctor: {
		type: Schema.Types.ObjectId,
		ref: "Doctor",
	},
	patient: {
		type: Schema.Types.ObjectId,
		ref: "Patient",
	},
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
