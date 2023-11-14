import React, { useState } from "react";
import { useFetchFamilyMembersQuery, useAddFamilyMemberMutation } from "../../store";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Option,
  Modal,
  ModalDialog,
  DialogTitle,
  DialogContent,
  Stack,
  ModalClose,
  Link,
  Breadcrumbs,
  Typography,
  Box,
} from "@mui/joy";
import Add from "@mui/icons-material/Add";
import Toast from "../components/Toast";
import MemberCard from "../components/MemberCard";
import { Link as RouterLink } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LinkOutlined } from "@mui/icons-material";
import LinkFamilyMember from "../components/LinkFamilyMember";

// Home / Patient / View Family Members

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  nationalId: Yup.string().required("National ID is required"),
  age: Yup.number().required("Age is required"),
  gender: Yup.string().required("Gender is required"),
  relation: Yup.string().required("Relation is required"),
});

export default function ViewFamilyMembers() {
  const { data, isFetching, error } = useFetchFamilyMembersQuery(0);
  const [addFamilyMember, results] = useAddFamilyMemberMutation();

  // console.log("DEBUG", results);

  const isAdding = results.isLoading;
  const isAddingError = results.isError;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formState, setFormState] = useState({
    name: null,
    nationalId: null,
    age: null,
    gender: null,
    relationToPatient: null,
    phoneNumber: null,
    username: null,
    password: null,
    confirmPassword: null,
    dateOfBirth: null,
    email: null,
  });

  const [toast, setToast] = useState({
    open: false,
    duration: 4000,
  });

  const onFormChange = (e, fieldName, newVal) => {
    let updatedValue;
    let field;

    if (newVal) {
      updatedValue = newVal;
      field = fieldName;
    } else {
      updatedValue = e.target.value;
      fieldName = e.target.name;
    }

    setFormState({
      ...formState,
      [fieldName]: updatedValue,
    });
  };

  const onToastClose = (event, reason) => {
    if (reason === "clickaway") return;

    setToast({
      ...toast,
      open: false,
    });
  };

  let content;

  if (isFetching) {
    content = <div>Loading skeleton...</div>;
  } else if (error) {
    content = <div> Error ... </div>;
  } else {
    content = data.map((item) => {
      return (
        <div>
          <MemberCard {...item} />
        </div>
      );
    });
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    addFamilyMember({ ...formState })
      .unwrap()
      .then((payload) => {
        setToast({
          ...toast,
          open: true,
          color: "success",
          message: "Family member added successfully!",
        });
        setIsModalOpen(false);
        setFormState({
          name: null,
          nationalId: null,
          age: null,
          gender: null,
          relationToPatient: null,
          phoneNumber: null,
          username: null,
          password: null,
          confirmPassword: null,
          dateOfBirth: null,
          email: null,
        });
      })
      .catch((err) => {
        setToast({
          ...toast,
          open: true,
          color: "danger",
          message: "Error adding family member!",
        });
      });
  };
  const dateFormat = "MM/DD/YYYY";

  const handleDateChange = (dateString) => {
    const newDate = dayjs(dateString.$d).format(dateFormat);
    setFormState({ ...formState, dateOfBirth: newDate });
    setDate(newDate);
    // console.log(newDate);
  };
  const [date, setDate] = useState(null);

  const buttonModal = (
    <React.Fragment>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalDialog sx={{ overflowY: "auto", maxHeight: "90vh" }}>
          <ModalClose onClick={() => setIsModalOpen(false)} />
          <DialogTitle>Add a family member to your account</DialogTitle>
          <DialogContent>Fill in the information of your family member.</DialogContent>
          <form onChange={onFormChange} onSubmit={onFormSubmit}>
            <Stack
              spacing={2}
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(80px, 1fr))",
                gap: 1.5,
              }}
            >
              <FormControl sx={{ gridColumn: "1/-1" }}>
                <FormLabel>Full Name</FormLabel>
                <Input value={formState.name} name="name" placeholder="Enter Full Name" />
              </FormControl>

              <FormControl sx={{ gridColumn: "1/-1" }}>
                <FormLabel>National ID</FormLabel>
                <Input value={formState.nationalId} name="nationalId" placeholder="Enter NID" />
              </FormControl>

              <FormControl sx={{ gridColumn: "1/-1" }}>
                <FormLabel>Username</FormLabel>
                <Input value={formState.username} name="username" placeholder="Enter Username" />
              </FormControl>

              <FormControl sx={{ gridColumn: "1/-1" }}>
                <FormLabel>Email</FormLabel>
                <Input
                  value={formState.email}
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                />
              </FormControl>

              <FormControl sx={{ gridColumn: "1/-1" }}>
                <FormLabel>Password</FormLabel>
                <Input
                  value={formState.password}
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                />
              </FormControl>

              <FormControl sx={{ gridColumn: "1/-1" }}>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  value={formState.confirmPassword}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                />
              </FormControl>

              <FormControl sx={{ gridColumn: "1/-1" }}>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  value={formState.phoneNumber}
                  name="phoneNumber"
                  placeholder="Enter Phone Number"
                />
              </FormControl>

              <FormControl id="multiple-limit-tags" sx={{ gridColumn: "1/-1" }}>
                <FormLabel>Date of Birth</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={date}
                    onChange={handleDateChange}
                    sx={{
                      marginBottom: -3,
                      width: "100%",
                      "& .MuiInputBase-root": { height: "70%" },
                    }}
                  />
                </LocalizationProvider>
              </FormControl>

              <FormControl>
                <FormLabel>Age</FormLabel>
                <Input value={formState.age} name="age" type="number" placeholder="Enter age" />
              </FormControl>

              <FormControl>
                <FormLabel>Gender</FormLabel>
                <Select
                  name="gender"
                  value={formState.gender}
                  onChange={(e, n) => onFormChange(e, "gender", n)}
                  placeholder="Enter gender"
                >
                  <Option value="m">Male</Option>
                  <Option value="f">Female</Option>
                </Select>
              </FormControl>

              <FormControl sx={{ gridColumn: "1/-1" }}>
                <FormLabel>Relation</FormLabel>
                <Select
                  name="relation"
                  value={formState.relationToPatient}
                  placeholder="Enter relation to patient"
                  onChange={(e, n) => {
                    onFormChange(e, "relationToPatient", n);
                  }}
                >
                  <Option value="wife">Wife</Option>
                  <Option value="husband">Husband</Option>
                  <Option value="child">Child</Option>
                </Select>
              </FormControl>

              <Button loading={isAdding} sx={{ gridColumn: "1/-1" }} type="submit">
                Submit
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );

  return (
    <div className="ml-20 mr-20 mt-10 w-full">
      <Breadcrumbs aria-label="breadcrumbs" className="mb-2">
        <Link component={RouterLink} color="neutral" to="../">
          Home
        </Link>
        <Typography>Family</Typography>
      </Breadcrumbs>

      <div className="flex ml-5 mt-5 mb-5 flex-wrap space-x-6">{content}</div>

      <Box className="w-full flex justify-end space-x-2">
        <Button
          variant="outlined"
          color="primary"
          startDecorator={<Add />}
          onClick={() => setIsModalOpen(true)}
        >
          Add Family Member
        </Button>
        <LinkFamilyMember toast={toast} setToast={setToast} />
      </Box>
      <div>
        <Toast {...toast} onClose={onToastClose} />
      </div>

      <div className="">{buttonModal}</div>
    </div>
  );
}
