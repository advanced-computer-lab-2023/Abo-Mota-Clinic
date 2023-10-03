const mongoose = require("mongoose");
const { Schema } = mongoose;

const pharmacyAdminSchema = new Schema({
	name: String,
	username: String,
	password: String,
	email: String,
});

mongoose.model("PharmacyAdmin", pharmacyAdminSchema);
