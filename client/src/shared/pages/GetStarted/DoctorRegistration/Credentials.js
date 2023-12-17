// Credentials.js
import React from 'react';
import FileInput from "../../../Components/FileInput/index.js";

const Credentials = ({ formik }) => {
  return (
    <div className="space-y-4">
        <FileInput
        label='NationalID*'
        id='nationalId'
        name='nationalId' 
        error={formik.errors.nationalId}
        touch={formik.touched.nationalId}
              onChange={(file) => formik.setFieldValue("nationalId", file)}
              onBlur={() => formik.setFieldTouched("nationalId", true)} // To handle touch status
        />
      <FileInput
        label="Medical Degree*"
        id="medicalDegree"
        name="medicalDegree"
        error={formik.errors.medicalDegree}
        touch={formik.touched.medicalDegree}
        onChange={(file) => formik.setFieldValue("medicalDegree", file)}
        onBlur={() => formik.setFieldTouched("medicalDegree", true)}
        className="w-full"
      />
      <FileInput
        label="Medical License*"
        id="medicalLicense"
        name="medicalLicense"
        error={formik.errors.medicalLicense}
        touch={formik.touched.medicalLicense}
        onChange={(file) => formik.setFieldValue("medicalLicense", file)}
        onBlur={() => formik.setFieldTouched("medicalLicense", true)}
        className="w-full"
      />
    </div>
  );
};

export default Credentials;
