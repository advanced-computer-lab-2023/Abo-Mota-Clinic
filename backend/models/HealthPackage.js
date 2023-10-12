const mongoose = require("mongoose");
const { Schema } = mongoose;

const healthPackageSchema = new Schema({
	pricePerYear: Number,
	doctorDiscount: Number,
	pharmacyDiscount: Number,
	familyDiscount: Number,
	name: String,
	isActivated: {
		type: Boolean,
		default: true,
	},
});

const HealthPackage = mongoose.model("HealthPackage", healthPackageSchema);
module.exports = HealthPackage;
