// ProfessionalDetails.js
import React from 'react';
import Input from "../../../Components/InputField/index.jsx";
import DropDown from "../../../Components/DropDown/index.jsx";

const ProfessionalDetails = ({ formik }) => {
  return (
    <div className="space-y-4">
      <Input
        label="Affiliation (Hospital)*"
        type="text"
        id="affiliation"
        error={formik.errors.affiliation}
        touch={formik.touched.affiliation}
        {...formik.getFieldProps("affiliation")}
        className="w-full"
      />
      <Input
        label="Educational Background*"
        type="text"
        id="educationalBackground"
        error={formik.errors.educationalBackground}
        touch={formik.touched.educationalBackground}
        {...formik.getFieldProps("educationalBackground")}
        className="w-full"
      />
      <Input
        label="Hourly Rate in USD*"
        type="number"
        id="hourlyRate"
        error={formik.errors.hourlyRate}
        touch={formik.touched.hourlyRate}
        {...formik.getFieldProps("hourlyRate")}
        className="w-full"
      />
      {/* Add more fields as required */}
    </div>
  );
};

export default ProfessionalDetails;
