import Input from "../../../Components/InputField/index.jsx";

export default function AccountSetUp({formik}){


    return (
        <div className="space-y-4">
            <Input
              label='Username*'
              type='text'
              id='userName'
              error={formik.errors.userName}
              touch={formik.touched.userName}
              {...formik.getFieldProps("userName")}
            />
            <Input
            label="Email*"
            type="email"
            id="email"
            error={formik.errors.email}
            touch={formik.touched.email}
            {...formik.getFieldProps("email")}
            className="w-full"
          />
          <Input
              label='Password*'
              type='password'
              id='password'
              error={formik.errors.password}
              touch={formik.touched.password}
              {...formik.getFieldProps("password")}
            />
            <Input
              label='Confirm Password*'
              type='password'
              id='confirmPassword'
              error={formik.errors.confirmPassword}
              touch={formik.touched.confirmPassword}
              {...formik.getFieldProps("confirmPassword")}
            />
        </div>
    )
}