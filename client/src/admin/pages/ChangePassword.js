import { Modal, ModalDialog, ModalClose, DialogTitle, DialogContent, Stack, FormControl, FormLabel, Input, Select, DatePicker, LocalizationProvider } from '@mui/joy';
import Button from '../../shared/Components/Button';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from 'react';
import { useChangeAdminPasswordMutation } from '../../store';
import Toast from '../../patient/components/Toast';

function ChangePassword() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [changePassword, results] = useChangeAdminPasswordMutation();
  

  const [formState, setFormState] = useState({
    oldPassword: null,
    newPassword: null,
  });

  const [toast, setToast] = useState({
    open: false,
    duration: 4000,
  });

  const onToastClose = (event, reason) => {
    if (reason === "clickaway") return;

    setToast({
      ...toast,
      open: false,
    });
  };

  const onFormChange = (e) => {

    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const { oldPassword, newPassword } = formState;
    changePassword({ oldPassword, newPassword })
      .unwrap()
      .then(() => {
        setToast({
          ...toast,
          open: true,
          message: "Password changed successfully",
          color: "success",
        });
        setIsModalOpen(false);
      })
      .catch((err) => {
        setToast({
          ...toast,
          open: true,
          message: "Old password is incorrect",
          color: "danger",
        });
      });
  };


  return (

    <>
      <button className='cursor-pointer bg-blue-500 text-white p-2 rounded-md' onClick={() => setIsModalOpen(true)}>
        Change password
      </button>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalDialog sx={{ overflowY: "auto", maxHeight: "90vh", p: 3 }}>
          <ModalClose onClick={() => setIsModalOpen(false)} />
          <DialogTitle>Change password</DialogTitle>
          <DialogContent>Fill in your current and new passwords below</DialogContent>
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
                <FormLabel>Current Password</FormLabel>
                <Input
                  value={formState.oldPassword}
                  type="password"
                  name="oldPassword"
                  placeholder="Enter Password"
                />
              </FormControl>

              <FormControl sx={{ gridColumn: "1/-1" }}>
                <FormLabel>New Password</FormLabel>
                <Input
                  value={formState.newPassword}
                  type="password"
                  name="newPassword"
                  placeholder="Enter Password"
                />
              </FormControl>


              <Button sx={{ gridColumn: "1/-1" }} type="submit">
                Submit
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>

      <div>
        <Toast {...toast} onClose={onToastClose} />
      </div>

    </>
  )
}

export default ChangePassword;
