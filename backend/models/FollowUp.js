const mongoose = require("mongoose");
const { Schema } = mongoose;

const followUpSchema = new Schema(
	{
		date: Date,
		oldDate: Date,
		doctor: {
			type: Schema.Types.ObjectId,
			ref: "Doctor",
		},
		patient: {
			type: Schema.Types.ObjectId,
			ref: "ClinicPatient",
		},
	},
	{ toJSON: { virtuals: true } }
);

const options = {
	year: "numeric",
	month: "2-digit",
	day: "2-digit",
	hour: "2-digit",
	minute: "2-digit",
	hour12: true,
};

followUpSchema.virtual("formattedDate").get(function () {
	return new Intl.DateTimeFormat("en-US", options).format(this.date);
});

const FollowUp = mongoose.model("FollowUp", followUpSchema);
module.exports = FollowUp;
