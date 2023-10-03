const mongoose = require("mongoose");
const { Schema } = mongoose;

const healthPackageSchema = new Schema({
	startDate: Date,
	endDate: Date,
	pricePerYear: Number,
	doctorDiscount: Number,
	pharmacyDiscount: Number,
	name: String,
});

mongoose.model("HealthPackage", healthPackageSchema);
