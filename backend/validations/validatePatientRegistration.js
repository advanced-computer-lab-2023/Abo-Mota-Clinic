const Joi = require("joi");

const sixteenYearsAgo = new Date();
sixteenYearsAgo.setFullYear(sixteenYearsAgo.getFullYear() - 16);

const healthPackageValidation = Joi.object({
  package: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .message("Invalid HealthPackage ID format."),
  endDate: Joi.date().required(),
  // .message("Invalid date format for end date.")
});

const emergencyContactValidation = Joi.object({
  name: Joi.string()
    .trim()
    .pattern(/^[A-Za-z\s]+$/)
    .message("Name can only contain letters and spaces."),
  mobile: Joi.string()
    .trim()
    .pattern(/^[0-9]+$/)
    .message("Mobile can only contain numbers."),
  relation: Joi.string()
    .trim()
    .pattern(/^[A-Za-z\s]+$/)
    .message("Relation can only contain letters and spaces."),
});
const familyMemberSchema = Joi.object({
  name: Joi.string(),
  age: Joi.number().integer().min(0),
  gender: Joi.string().valid("male", "female"),
  nationalId: Joi.string().alphanum().min(7).max(20),
  relationToPatient: Joi.string(),
});

const patientValidationSchema = Joi.object({
  name: Joi.string()
    .trim()
    .pattern(/^[A-Za-z\s]+$/)
    .message("Name can only contain letters"),
  username: Joi.string().trim().alphanum(),
  password: Joi.string().trim(),
  email: Joi.string().trim().email(),
  dob: Joi.date()
    .min("1900-01-01")
    .max(sixteenYearsAgo)
    .message("Date of birth must be between 1900 and 18 years before today."),
  gender: Joi.string().trim().valid("male", "female"),
  mobile: Joi.string()
    .trim()
    .pattern(/^[0-9]+$/),
  nationalId: Joi.string()
    .pattern(/^[0-9]+$/)
    .message("National ID can only contain numbers"),
  familyMembers: familyMemberSchema,
  emergencyContact: emergencyContactValidation,
  healthPackage: healthPackageValidation,
  // prescriptions: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
});

module.exports = patientValidationSchema;
