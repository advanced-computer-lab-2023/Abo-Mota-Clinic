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
    return res.status(200).json({ newPatient });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const registerDoctor = async (req, res) => {
  try {
    const { username, nationalId, password, email } = req.body;

    const doctorExists = await Doctor.findOne({
      $and: [
        { $or: [{ username }, { nationalId }, { email }] },
        { registrationStatus: { $in: ["approved", "pending"] } },
      ],
    });

    if (doctorExists) {
      throw new Error("Doctor with these credentials already exists");
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const medicalLicense = {
      data: req.files.medicalLicense[0].buffer,
      contentType: req.files.medicalLicense[0].mimetype,
    };
    const medicalDegree = {
      data: req.files.medicalDegree[0].buffer,
      contentType: req.files.medicalDegree[0].mimetype,
    };

    const newDoctor = await Doctor.create({
      ...req.body,
      password: hashedPassword,
      medicalLicense,
      medicalDegree,
    });

    return res.status(200).json({ newDoctor });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerPatient,
  registerDoctor,
};
