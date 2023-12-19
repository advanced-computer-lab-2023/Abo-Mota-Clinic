import React from 'react';
import Input from "../../../Components/InputField";
import DateInput from "../../../Components/DateInput";
import DropDown from "../../../Components/DropDown";

const BasicInformation = ({ formik }) => {
  return (
    <div>
      {/* Row for First Name and Last Name */}
      <div className="flex flex-wrap -mx-2 mb-4">
        <div className="w-full md:w-1/2 px-2 mb-4">
        <Input
              label='First Name*'
              type='text'
              id='firstName'
              error={formik.errors.firstName}
              touch={formik.touched.firstName}
              {...formik.getFieldProps("firstName")}
            />
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
        <Input
              label='Last Name*'
              type='text'
              id='lastName'
              error={formik.errors.lastName}
              touch={formik.touched.lastName}
              {...formik.getFieldProps("lastName")}
            />
        </div>
      </div>
      {/* Row for Date of Birth and Gender */}
      <div className="flex flex-wrap -mx-2 mb-4">
        <div className="w-full md:w-1/2 px-2 mb-4">
            <DateInput
              label='Date of Birth*'
              id='dob'
              error={formik.errors.dateOfBirth}
              touch={formik.touched.dateOfBirth}
              {...formik.getFieldProps("dateOfBirth")}
              onChange={formik.handleChange}
            />
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
        <DropDown
              label='Gender*'
              type='text'
              id='gender'
              error={formik.errors.gender}
              onChange={formik.handleChange}
              touch={formik.touched.gender}
              options={["male", "female"]}
              {...formik.getFieldProps("gender")}
            />
        </div>
      </div>

      {/* Row for National ID and Phone Number */}
      <div className="flex flex-wrap -mx-2">
        <div className="w-full md:w-1/2 px-2 mb-4">
        <Input
              label='NationalID*'
              type='text'
              id='nationalId'
              error={formik.errors.nationalId}
              touch={formik.touched.nationalId}
              {...formik.getFieldProps("nationalId")}
            />
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
        <Input
              label='Phone number*'
              type='tel'
              id='mobileNumber'
              error={formik.errors.mobileNumber}
              touch={formik.touched.mobileNumber}
              {...formik.getFieldProps("mobileNumber")}
            />
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
