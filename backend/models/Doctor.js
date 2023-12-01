const mongoose = require("mongoose");
const { Schema } = mongoose;

const doctorSchema = new Schema(
	{
		name: String,
		username: {
			type: String,
			unique: true,
		},
		password: String,
		email: {
			type: String,
			unique: true,
		},
		dob: Date,
		rate: Number,
		affiliation: String,
		speciality: String,
		educationalBackground: String,
		nationalId: {
			data: Buffer,
			contentType: String,
		},
		medicalLicense: {
			data: Buffer,
			contentType: String,
		},
		medicalDegree: {
			data: Buffer,
			contentType: String,
		},
		registrationStatus: {
			type: String,
			enum: ["pending", "approved", "rejected"],
			default: "pending",
		},
		wallet: {
			type: Number,
			default: 0,
		},
		contractApproved: {
			type: Boolean,
			default: false,
		},
		notifications: [
			{
				type: Schema.Types.ObjectId,
				ref: "Notification",
			},
		],
		// patients: [
		// 	{
		// 		type: Schema.Types.ObjectId,
		// 		ref: "Patient",
		// 	},
		// ],
		// prescriptions: [
		// 	{
		// 		type: Schema.Types.ObjectId,
		// 		ref: "Prescription",
		// 	},
		// ],
		// appointments: [
		// 	{
		// 		type: Schema.Types.ObjectId,
		// 		ref: "Appointment",
		// 	},
		// ],
	},
	{ toJSON: { virtuals: true } }
);

const options = {
	year: "numeric",
	month: "2-digit",
	day: "2-digit",
};

doctorSchema.virtual("formattedDob").get(function () {
	return new Intl.DateTimeFormat("en-US", options).format(this.dob);
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
