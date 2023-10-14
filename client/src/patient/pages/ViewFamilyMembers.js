import React, { useState } from "react";
import { useFetchFamilyMembersQuery, useAddFamilyMemberMutation } from "../../store";
import { Button, FormControl, FormLabel, Input, Select, Option, Modal, ModalDialog, DialogTitle, DialogContent, Stack, ModalClose } from "@mui/joy";
import Add from "@mui/icons-material/Add";
import Toast from "../components/Toast";
import MemberCard from "../components/MemberCard";

import { useFormik } from "formik";
import * as Yup from "yup";

// Home / Patient / View Family Members


const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  nationalId: Yup.string().required('National ID is required'),
  age: Yup.number().required('Age is required'),
  gender: Yup.string().required('Gender is required'),
  relation: Yup.string().required('Relation is required'),
});

export default function ViewFamilyMembers() {
  const { data, isFetching, error } = useFetchFamilyMembersQuery(0);
  const [addFamilyMember, results] = useAddFamilyMemberMutation();

  // console.log("DEBUG", results);

  const isAdding = results.isLoading;
  const isAddingError = results.isError;

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [formState, setFormState] = useState({
    name: null,
    nationalId: null,
    age: null,
    gender: null,
    relationToPatient: null,
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
        <div className='flex space-x-6'>
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
          relation: null,
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

  const buttonModal = (<React.Fragment>
    <Button
      variant="outlined"
      color="neutral"
      startDecorator={<Add />}
      onClick={() => setIsModalOpen(true)}

    >
      Add Family Member
    </Button>

    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <ModalDialog>
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
              <FormLabel>Name</FormLabel>
              <Input value={formState.name} name="name" placeholder="Enter name" />
            </FormControl>

            <FormControl sx={{ gridColumn: "1/-1" }}>
              <FormLabel>National ID</FormLabel>
              <Input value={formState.nationalId} name="nationalId" placeholder="Enter NID" />
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
                <Option value="sibling">Sibling</Option>
                <Option value="spouse">Spouse</Option>
                <Option value="parent">Parent</Option>
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
    <div>
      <div className="flex ml-5 mt-5 mb-5 flex-wrap space-y-4">{content}</div>
      {/* 
      <div className='mb-5'>
        <Button onClick={() => setIsFormOpen(!isFormOpen)}> + Add family member </Button>
      </div> */}

      {/* <div>
        {isFormOpen && form}
      </div> */}

      <div>
        <Toast {...toast} onClose={onToastClose} />
      </div>

      <div>{buttonModal}</div>
    </div>
  );
}
