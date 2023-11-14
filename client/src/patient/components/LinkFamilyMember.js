import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Option,
  Modal,
  ModalDialog,
  Stack,
  ModalClose,
} from "@mui/joy";
import { LinkOutlined } from "@mui/icons-material";
import { useLinkFamilyMemberMutation } from "../../store";
function LinkFamilyMember({ toast, setToast }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState({
    method: null,
    mobile: null,
    email: null,
    relationToPatient: null,
  });
  const [linkFamilyMember, results] = useLinkFamilyMemberMutation();
  const isAdding = results.isFetching;
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

  const onFormSubmit = (e) => {
    e.preventDefault();
    linkFamilyMember({ ...formState })
      .unwrap()
      .then((payload) => {
        setToast({
          ...toast,
          open: true,
          color: "success",
          message: "Family member Linked successfully!",
        });
        setIsModalOpen(false);
        setFormState({
          method: null,
          phoneNumber: null,
          email: null,
          relationToPatient: null,
        });
      })
      .catch((err) => {
        setToast({
          ...toast,
          open: true,
          color: "danger",
          message: "Error linking family member!",
        });
      });
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    setFormState({
      method: null,
      phoneNumber: null,
      email: null,
      relationToPatient: null,
    });
  };
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="primary"
        startDecorator={<LinkOutlined />}
        onClick={() => setIsModalOpen(true)}
      >
        Link Family Member
      </Button>
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <ModalDialog sx={{ overflowY: "auto", maxHeight: "90vh", minWidth: "auto" }}>
          <ModalClose onClick={() => setIsModalOpen(false)} />
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
                <FormLabel>Choose method to link family member</FormLabel>
                <Select
                  name="method"
                  value={formState.method}
                  placeholder="Choose method to link family member"
                  onChange={(e, n) => {
                    onFormChange(e, "method", n);
                  }}
                >
                  <Option value="phone number">Phone Number</Option>
                  <Option value="email">Email</Option>
                </Select>
              </FormControl>
              {formState.method === "email" && (
                <FormControl sx={{ gridColumn: "1/-1" }}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    value={formState.email}
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                  />
                </FormControl>
              )}

              {formState.method === "phone number" && (
                <FormControl sx={{ gridColumn: "1/-1" }}>
                  <FormLabel>Mobile Number</FormLabel>
                  <Input
                    value={formState.mobile}
                    type="mobile"
                    name="mobile"
                    placeholder="Enter Mobile Number"
                  />
                </FormControl>
              )}

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
                Link
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}

export default LinkFamilyMember;
