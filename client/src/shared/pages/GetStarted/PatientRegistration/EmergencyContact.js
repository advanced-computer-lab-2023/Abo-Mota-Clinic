import React from 'react';
import Input from "../../../Components/InputField";

const EmergencyContact = ({ formik }) => {
  return (
    <div className="space-y-4">
      <Input
        label="Emergency Contact First Name*"
        type="text"
        name="emergencyContactFirstName"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.emergencyContactFirstName}
        placeholder="Enter first name"
        error={formik.touched.emergencyContactFirstName && formik.errors.emergencyContactFirstName}
      />

      <Input
        label="Emergency Contact Last Name*"
        type="text"
        name="emergencyContactLastName"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.emergencyContactLastName}
        placeholder="Enter last name"
        error={formik.touched.emergencyContactLastName && formik.errors.emergencyContactLastName}
      />

      <Input
        label="Emergency Contact Phone Number*"
        type="tel"
        name="emergencyContactMobileNumber"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.emergencyContactMobileNumber}
        placeholder="Enter phone number"
        error={formik.touched.emergencyContactMobileNumber && formik.errors.emergencyContactMobileNumber}
      />

      <Input
        label="Relationship to Patient*"
        type="text"
        name="emergencyContactRelation"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.emergencyContactRelation}
        placeholder="Enter your relationship"
        error={formik.touched.emergencyContactRelation && formik.errors.emergencyContactRelation}
      />
    </div>
  );
};

export default EmergencyContact;
