const mongoose = require("mongoose");
const Joi = require("joi");

const { Schema } = mongoose;
const patientSchema = new Schema(
  {
    name: String,
    username: String,
    password: String,
    email: String,
    dob: Date,
    gender: String,
    mobile: String,
    nationalId: String,
    // familyMembers: [
    //   {
    //     // _id: {
    //     // 	type: Schema.Types.ObjectId,
    //     // 	ref: "Patient",
    //     // },
    //     // relationToPatient: String, // Add your extra attribute here
    //     name: String,
    //     age: Number,
    //     gender: String,
    //     relationToPatient: {
    //       type: String,
    //       enum: ["child", "husband", "wife"],
    //     },
    //     nationalId: String,
    //   },
    // ],
    emergencyContact: {
      name: String,
      mobile: String,
      relation: String,
    },
    healthPackage: {
      package: {
        type: Schema.Types.ObjectId,
        ref: "HealthPackage",
      },
      endDate: Date,
    },
    cart: [
      {
        medicine: {
          type: Schema.Types.ObjectId,
          ref: "Medicine"
        },
        quantity: Number,
      }
    ],
    deliveryAddresses: [
      {
        apartmentNumber: Number,
        streetName: String,
        city: String
      }
    ],
    wallet: {
      type: Number,
      default: 0,
    },
  },
  { toJSON: { virtuals: true } }
);

const options = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
};

patientSchema.virtual("formattedDob").get(function () {
  return new Intl.DateTimeFormat("en-US", options).format(this.dob);
});

const PharmacyPatient = mongoose.model("PharmacyPatient", patientSchema);

module.exports = PharmacyPatient;
