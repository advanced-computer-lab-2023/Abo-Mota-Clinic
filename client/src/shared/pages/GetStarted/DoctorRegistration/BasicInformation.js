import React from 'react';
import Input from "../../../Components/InputField";
import DateInput from "../../../Components/DateInput";
import DropDown from "../../../Components/DropDown";

const BasicInformation = ({ formik }) => {
  return (
    <div>
      {/* Row for First Name and Last Name */}
      <div className="flex flex-wrap -mx-2 mb-4">
        <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
          <Input
            label="First Name*"
            type="text"
            name="firstName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            placeholder="Enter your first name"
            error={formik.touched.firstName && formik.errors.firstName}
          />
        </div>
        <div className="w-full md:w-1/2 px-2">
          <Input
            label="Last Name*"
            type="text"
            name="lastName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            placeholder="Enter your last name"
            error={formik.touched.lastName && formik.errors.lastName}
          />
        </div>
      </div>

      {/* Row for Date of Birth and Gender */}
      <div className="flex flex-wrap -mx-2 mb-4">
        <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
          <DateInput
            label="Date of Birth*"
            name="dateOfBirth"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dateOfBirth}
            error={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
          />
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
          <DropDown
            label="Gender*"
            name="gender"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.gender}
            options={["male", "female"]}
            error={formik.touched.gender && formik.errors.gender}
            className="dropdown-custom" // Use a custom class for styling
          />
        </div>
      </div>

      {/* Row for National ID and Phone Number */}
      <div className="flex flex-wrap -mx-2">
        <div className="w-full md:w-1/2 px-2">
          <Input
            label="Phone Number*"
            type="tel"
            name="mobileNumber"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.mobileNumber}
            placeholder="Enter your phone number"
            error={formik.touched.mobileNumber && formik.errors.mobileNumber}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
