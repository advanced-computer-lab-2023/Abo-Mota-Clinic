const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// initial testing complete, needs further edge cases tested
const registerPatient = async (req, res) => {
	try {
		const { username, nationalId, password, email } = req.body;
		// 1. Check if the user already exists
		const userExists = await Patient.findOne({ $or: [{ username }, { nationalId }, { email }] });
		if (userExists) {
			throw new Error("User with these credentials already exists");
		}

		// 2. Hash the password
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		// 3. Create a new user instance and save it
		const newPatient = await Patient.create({
			...req.body,
			password: hashedPassword,
		});
		return res.status(200).json({ success: true, message: "User registered successfully" });
	} catch (error) {
		return res.status(404).json({ success: false, message: error.message });
	}
};

const registerDoctor = async (req, res) => {
	try {
		const { username, nationalId, password, email } = req.body;
		// 1. Check if the user already exists
		const doctorExists = await Doctor.findOne({ 
			$and: [
				{ $or: [{ username }, { nationalId }, { email }] },
				{ registerStatus: { $in: ['approved', 'pending'] } }
			] 
		});
		
		if (doctorExists) {
			throw new Error("Doctor with these credentials already exists");
		}

		// 2. Hash the password
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		// 3. Create a new user instance and save it
		const newDoctor = await Doctor.create({
			...req.body,
			password: hashedPassword,
		});

		return res.status(200).json({ success: true, message: "Application is submitted successfully" });
	} catch (error) {
		return res.status(404).json({ success: false, message: error.message });
	}
};

module.exports = {
	registerPatient,
	registerDoctor,
};
