import React from 'react';
import Input from "../../../Components/InputField";

const EmergencyContact = ({ formik }) => {
  return (
    <div className="space-y-4">
      <Input
              label='First Name*'
              type='text'
              id='emergencyContactFirstName'
              error={formik.errors.emergencyContactFirstName}
              touch={formik.touched.emergencyContactFirstName}
              {...formik.getFieldProps("emergencyContactFirstName")}
            />

        <Input
              label='Last Name*'
              type='text'
              id='emergencyContactLastName'
              error={formik.errors.emergencyContactLastName}
              touch={formik.touched.emergencyContactLastName}
              {...formik.getFieldProps("emergencyContactLastName")}
            />  

<Input
              label='Phone number*'
              type='tel'
              id='emergencyContactMobileNumber'
              error={formik.errors.emergencyContactMobileNumber}
              touch={formik.touched.emergencyContactMobileNumber}
              {...formik.getFieldProps("emergencyContactMobileNumber")}
            />

<Input
              label='Contact Relation*'
              type='text'
              id='emergencyContactRelation'
              error={formik.errors.emergencyContactRelation}
              touch={formik.touched.emergencyContactRelation}
              {...formik.getFieldProps("emergencyContactRelation")}
            />  
    </div>
  );
};

export default EmergencyContact;
