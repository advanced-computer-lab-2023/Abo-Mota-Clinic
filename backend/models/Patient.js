const mongoose = require("mongoose");
const Joi = require("joi");

const { Schema } = mongoose;
// ADDDDD NATIONALID PICTURE ATTRIBUTE YALLA
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
    wallet: {
      type: Number,
      default: 0,
    },
    familyDiscount: {
      type: Number,
      default: 0,
    },
    familyMembers: [
      {
        name: String,
        age: Number,
        gender: String,
        relationToPatient: {
          type: String,
          enum: ["child", "husband", "wife"],
        },
        nationalId: String,
      },
    ],
    linkedFamily: [
      {
        member: {
          type: Schema.Types.ObjectId,
          ref: "ClinicPatient",
        },
        relationToPatient: {
          type: String,
        },
      },
    ],
    emergencyContact: {
      name: String,
      mobile: String,
      relation: String,
    },
    healthPackage: {
      status: {
        type: String,
        default: null,
        enum: ["subscribed", "unsubscribed", "cancelled", null],
      },
      package: {
        type: Schema.Types.ObjectId,
        default: null,
        ref: "HealthPackage",
      },
      endDate: Date,
      cancelDate: Date,
      unsubscribeDate: Date,
      pricePaid: {
        type: Number,
        default: 0,
      },
    },
    healthRecords: [
      {
        data: Buffer,
        contentType: String,
      },
    ],
    medicalHistory: [
      {
        data: Buffer,
        contentType: String,
        fileName: String
      },
    ],
    // prescriptions: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Prescription",
    //   },
    // ],
    // appointments: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Appointment",
    //   },
    // ],
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

const Patient = mongoose.model("ClinicPatient", patientSchema);

module.exports = Patient;
