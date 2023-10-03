const mongoose = require("mongoose");
const { Schema } = mongoose;

const appointmentSchema = new Schema({
	date: Date,
	status: String,
	doctor: {
		type: Schema.Types.ObjectId,
		ref: "Doctor",
	},
	patient: {
		type: Schema.Types.ObjectId,
		ref: "Patient",
	},
});

mongoose.model("Appointment", appointmentSchema);
