import { Modal, ModalDialog, ModalClose, DialogTitle, DialogContent, Stack, FormControl, FormLabel, Input } from '@mui/joy';
import Button from '../Components/Button';
import { useState } from 'react';
import { useChangeAdminPasswordMutation, useChangeDoctorPasswordMutation, useChangePatientPasswordMutation } from '../../store';
import Toast from '../../patient/components/Toast';


function ChangePassword(isDoctor, isPatient, isAdmin) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [changeAdminPassword, results1] = useChangeAdminPasswordMutation();
  const [changePatientPassword, results2] = useChangePatientPasswordMutation();
  const [changeDoctorPassword, results3]= useChangeDoctorPasswordMutation();
  

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
    if(isAdmin)
    {
        changeAdminPassword({ oldPassword, newPassword })
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
    }
    else if(isDoctor)
    {
        changeDoctorPassword({ oldPassword, newPassword })
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
    }
    else
    {
        changePatientPassword({ oldPassword, newPassword })
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
    }
    
  };


  return (

    <>
      <Button isFilled={false} onClick={() => setIsModalOpen(true)}>
        Change password
      </Button>

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


              <Button isFilled sx={{ gridColumn: "1/-1" }} type="submit">
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




function ChangePasswordSection({ patient }) {
  return (<div className="mt-6">
    <h3 className="text-lg font-medium text-gray-900">Password Settings</h3>
    <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200 mb-2">
      <div className="py-3 flex justify-between text-sm font-medium">
        <dt className="text-gray-500">Password</dt>
        <dd className="text-gray-900">********</dd>
      </div>

    </dl>

    {/* asterisks shown are just for looks, maybe turn functional ? */}
    <div className="flex justify-end ">
      <ChangePassword />
    </div>
  </div>)
}

export default ChangePasswordSection;
