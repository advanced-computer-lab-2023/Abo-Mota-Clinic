const Joi = require('joi');


const sixteenYearsAgo = new Date();
sixteenYearsAgo.setFullYear(sixteenYearsAgo.getFullYear() - 16);

const patientValidationSchema = Joi.object({
    name: Joi.string().trim().pattern(/^[A-Za-z]+$/).message('Name can only contain letters'),
    username: Joi.string().trim().alphanum(),
    password: Joi.string().trim(),
    email: Joi.string().trim().email(),
    dob: Joi.date()
        .min('1900-01-01')
        .max(sixteenYearsAgo)
        .message('Date of birth must be between 1900 and 18 years before today.'),
    gender: Joi.string().trim().valid('Male', 'Female', 'Other'),
    mobile: Joi.string().trim().pattern(/^[0-9]+$/),
    nationalId: Joi.string().pattern(/^[0-9]+$/).message('National ID can only contain numbers'),
    familyMembers: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
    emergencyContacts: Joi.array().items(Joi.object().pattern(Joi.string(), Joi.string())),
    healthPackages: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
    prescriptions: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/))
});

module.exports = patientValidationSchema