const mongoose = require("mongoose");
const { Schema } = mongoose;

const pharmacyAdminSchema = new Schema({
	name: String,
	username: String,
	password: String,
	email: String,
});

const PharmacyAdmin = mongoose.model("PharmacyAdmin", pharmacyAdminSchema);
module.exports = PharmacyAdmin;
