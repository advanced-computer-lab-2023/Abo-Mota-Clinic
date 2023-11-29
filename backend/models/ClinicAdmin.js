const mongoose = require("mongoose");
const { Schema } = mongoose;

const clinicAdminSchema = new Schema({
	// name: String,
	username: {
		type: String,
		unique: true,
	},
	password: String,
	email: {
		type: String,
		unique: true,
	},
});

const ClinicAdmin = mongoose.model("ClinicAdmin", clinicAdminSchema);
module.exports = ClinicAdmin;
