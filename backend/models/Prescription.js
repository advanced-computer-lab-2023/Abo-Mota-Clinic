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
}, { toJSON: { virtuals: true } });

const options = {
    year: 'numeric', month: '2-digit', day: '2-digit'
};

prescriptionSchema.virtual('formattedDate').get(function() {
	return new Intl.DateTimeFormat('en-US', options).format(this.date);
  });

const Prescription = mongoose.model("Prescription", prescriptionSchema);
module.exports = Prescription;
