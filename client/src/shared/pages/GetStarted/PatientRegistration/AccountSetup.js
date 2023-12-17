import React from 'react';
import Input from "../../../Components/InputField";

const AccountSetup = ({ formik }) => {
  return (
    <div className="space-y-4">
      <Input
        label="Username*"
        type="text"
        name="userName"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.userName}
        placeholder="Choose a username"
        error={formik.touched.userName && formik.errors.userName}
      />
      <Input
              label='Email*'
              type='text'
              id='email'
              error={formik.errors.email}
              touch={formik.touched.email}
              {...formik.getFieldProps("email")}
            />
      <Input
        label="Password*"
        type="password"
        name="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        placeholder="Enter a password"
        error={formik.touched.password && formik.errors.password}
      />

      <Input
        label="Confirm Password*"
        type="password"
        name="confirmPassword"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.confirmPassword}
        placeholder="Confirm your password"
        error={formik.touched.confirmPassword && formik.errors.confirmPassword}
      />
    </div>
  );
};

export default AccountSetup;
