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
});

mongoose.model("Prescription", prescriptionSchema);
