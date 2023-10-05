const Admin = require("../models/ClinicAdmin");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const HealthPackage = require("../models/HealthPackage");
const bcrypt = require("bcrypt");
const saltRounds = 10;


// View All Packages
const getPackages = async (req, res) => {
	const packages = await HealthPackage.find({});
	res.status(200).json(packages);
};

// Update Package
const updatePackage = async (req, res) => {
	try {
		const { id } = req.params;
		const filter = { _id: id };

		// const packageExists = await HealthPackage.findOne(filter);
		// if (!packageExists) {
		// 	throw new Error("This package does not exist");
		// }
		const update = req.body;
		const updatedPackage = await HealthPackage.updateOne(filter, update);
		if(updatedPackage.modifiedCount === 0) {
			throw new Error("Package not found");
		}
		
		res.status(200).json(updatedPackage);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
};

// add Package
const addPackage = async (req, res) => {
	try {
		const { name } = req.body;
		// Check if the package already exists
		//$or: [{ name }]
		const packageExists = await HealthPackage.findOne({ name: name.toLowerCase() });
		if (packageExists) {
			throw new Error("A package with this name already exists");
		}
		const addedPackage = {
			...req.body,
			name: name.toLowerCase(),
		};
		const package = await HealthPackage.create(addedPackage);

		res.status(200).json(package);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
};

// delete Package
const deletePackage = async (req, res) => {
	try {
		const { id } = req.params;
		const filter = { _id: id };

		const deletedPackage = await HealthPackage.deleteOne(filter);
		res.status(200).json(deletedPackage);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
};

// Add an Admin
const addAdmin = async (req, res) => {
	try {
		const { username, password } =  req.body;

		const existingAdmin = await Admin.findOne({ username: username.toLowerCase() });

		if (existingAdmin) {
			res.status(400).json({ error: "Admin with this username already exists" });
		}
		
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		const newAdmin = await Admin.create({
			...req.body,
			username: username.toLowerCase(),
			password: hashedPassword
		});

		res.status(200).json({ message: "Admin added successfully", admin: newAdmin });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Delete a specific Admin - tested initially
const deleteAdmin = async (req, res) => {
	try {
		const { id } = req.params;
		const filter = { _id: id };
		const admin = await Admin.findOne(filter);

		if (!admin) {
			throw new Error("Admin not found")
		} 

		const deletedAdminResponse = await Admin.deleteOne(filter);
		res.status(200).json(deletedAdminResponse);

	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Delete a specific Patient - tested initially
const deletePatient = async (req, res) => {
	try {
		const { id } = req.params;
		const filter = { _id: id };
		const patient = await Patient.findOne(filter);

		if (!patient) {
			throw new Error( "Patient not found" );
		} 
		
		const deletedPatientResponse = await Patient.deleteOne(filter);
		res.status(200).json(deletedPatientResponse);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Delete a specific Doctor
const deleteDoctor = async (req, res) => {
	try {
		const { id } = req.params;
		const filter = { _id: id };
		const doctor = await Doctor.findOne(filter);

		if (!doctor) {
			throw new Error("Doctor not found" );
		} 
		
		const deletedDoctorResponse = await Doctor.deleteOne(filter);
		res.status(200).json(deletedDoctorResponse);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get all doctor applications
const getApplications = async (req, res) => {
	try {
		const applications = await Doctor.find({ registrationStatus: "pending"});
		res.status(200).json(applications);
	} catch (error) {
		// console.log("Error fetching doctor applications");
		res.status(500).json({ error: error.message });
	}
};

// View Doctor Application Info
const getApplicationInfo = async (req, res) => {
	try {
		const { id } = req.params;
		const application = await Doctor.findOne({$and: [{ _id: id }, {registrationStatus: "pending"}]});
		if(!application) {
			throw new Error("Application not found");
		}
		res.status(200).json(application);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Handle doctor application
const handleApplication = async (req, res) => {
	try {
		const { id } = req.params;
		const { registrationStatus } = req.body;
		const filter = { _id: id };
		const update = { registrationStatus };

		const handledApplication = await Doctor.updateOne(filter, update);
		if(handledApplication.modifiedCount === 0) {
			throw new Error("Application not found");
		}
		res.status(200).json({ response: "Successfully handled application", application: handledApplication });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	getPackages,
	updatePackage,
	addPackage,
	deletePackage,
	getApplications,
	getApplicationInfo,
	handleApplication,
	addAdmin,
	deleteAdmin,
	deletePatient,
	deleteDoctor,
};
