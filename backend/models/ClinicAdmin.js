const mongoose = require("mongoose");
const { Schema } = mongoose;

const clinicAdminSchema = new Schema({
	// name: String,
	username: String,
	password: String,
	// email: String,
});

const ClinicAdmin = mongoose.model("ClinicAdmin", clinicAdminSchema);
module.exports = ClinicAdmin;
