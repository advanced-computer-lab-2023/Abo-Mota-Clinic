const Admin = require('../models/ClinicAdmin');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');


// View All Packages
const getPackages = async (req, res) => {
    
}

// Update Package
const updatePackage = async (req, res) => {
    
}

// View Doctor Application Info
const getApplicationInfo = async (req, res) => {
    
}

// Add an Admin
const addAdmin = async (req, res) => {
    try {
        const adminData = req.body;

        
        const existingAdmin = await Admin.findOne({ email: adminData.username }); 

        if (existingAdmin) {
             res.status(400).json({ error: 'Admin with this username already exists' });
        }

        
        const newAdmin = new Admin(adminData);
        await newAdmin.save();

         res.status(200).json({ message: 'Admin added successfully', admin: newAdmin });
    } catch (error) {
         res.status(500).json({ error: 'Failed to add the admin' });
    }
}

// Delete a specific Admin
const deleteAdmin = async (req, res) => {
    try {
        const { adminId } = req.body;

        
        const admin = await Admin.findOne({ adminId: adminId }); 

      
        if (admin) {
            await admin.remove();
             res.status(200).json({ message: 'Admin deleted successfully' });
        } else {
             res.status(404).json({ error: 'Admin not found' });
        }
    } catch (error) {
         res.status(500).json({ error: 'Failed to delete the admin' });
    }
}

// Delete a specific Patient
const deletePatient = async (req, res) => {
    try {
        const { patientId } = req.body;

        
        const patient = await Patient.findOne({ patientId: patientId });

    
        if (patient) {
            await patient.remove();
             res.status(200).json({ message: 'Patient deleted successfully' });
        } else {
             res.status(404).json({ error: 'Patient not found' });
        }
    } catch (error) {
           res.status(500).json({ error: 'Failed to delete the patient' });
    }
}

// Delete a specific Doctor
const deleteDoctor = async (req, res) => {
    try {
        const { doctorId } = req.body;

        
        const doctor = await Doctor.findOne({ doctorId: doctorId });

        
        if (doctor) {
            await doctor.remove();
             res.status(200).json({ message: 'Doctor deleted successfully' });
        } else {
             res.status(404).json({ error: 'Doctor not found' });
        }
    } catch (error) {
             res.status(500).json({ error: 'Failed to delete the doctor' });
    }
}

module.exports={
    getPackages,
    updatePackage,
    getApplicationInfo,
    addAdmin,
    deleteAdmin,
    deletePatient,
    deleteDoctor

}