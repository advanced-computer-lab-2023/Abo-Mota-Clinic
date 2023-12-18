import { Button, DialogTitle, DialogContent, Stack, FormControl, FormLabel, Input, Card , Typography, CardContent } from '@mui/joy';
import { useState } from 'react';
import {
    useChangeAdminPasswordMutation,
    
  } from "../../store";
  import Toast from "../../patient/components/Toast";

function ChangePasswordPage() {

  const [changeAdminPassword, adminResults] = useChangeAdminPasswordMutation();

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

    changeAdminPassword({ oldPassword, newPassword })
    .unwrap()
    .then(() => {
        setToast({
        ...toast,
        open: true,
        message: "Password changed successfully",
        color: "success",
        });
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

    <div className='mt-28 ml-20 mr-20'>
        <Card sx={{
                maxHeight: 'max-content',
                maxWidth: '60%',
                mx: 'auto',
                
                overflow: 'auto',
                }} >
        <DialogTitle>Change password</DialogTitle>
          <DialogContent>Fill in your current and new passwords below</DialogContent>
          <CardContent>
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
          </CardContent>
        </Card>
        
      <div>
        <Toast {...toast} onClose={onToastClose} />
      </div>

    </div>
  )
}

export default ChangePasswordPage;
