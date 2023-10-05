const patientValidationSchema = require("../validations/validatePatientRegistration");

const validateRegisterSchema = async (req, res, next) => {
	const { error } = await patientValidationSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}
	next();
};

module.exports = validateRegisterSchema;
