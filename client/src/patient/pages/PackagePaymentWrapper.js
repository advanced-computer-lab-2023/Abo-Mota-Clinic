import { useNavigate, useParams } from "react-router-dom";
import {
  useFetchPackagesPatientQuery,
  useFetchPatientQuery,
  useSubscribeToHealthPackageMutation,
} from "../../store";
import PaymentPage from "./PaymentPage";
import { Box } from "@mui/joy";
import capitalize from "../utils/capitalize";
import { useState } from "react";
import Toast from "../components/Toast";

function PackagePaymentWrapper() {
  const { idx } = useParams();
  const navigate = useNavigate();
  const {
    data: packagesData,
    isFetching: isFetchingPackages,
    error: isErrorPackages,
  } = useFetchPackagesPatientQuery();
  const {
    data: patient,
    isFetching: isFetchingPatient,
    error: isErrorPatient,
  } = useFetchPatientQuery();
  const [subscribeToHealthPackage, results] = useSubscribeToHealthPackageMutation();
  const [selectedUser, setSelectedUser] = useState(-1);
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
  if (isFetchingPackages || isFetchingPatient) {
    return <div>Loading...</div>;
  }

  const healthPackage = packagesData[idx];
  console.log("healthPackage", healthPackage);
  // { items, type, details, discount, onPaymentSuccess, onPaymentFailure }

  const config = {
    items: [
      {
        label: `${capitalize(healthPackage.name)} Health Package (annual)`,
        price: healthPackage.pricePerYear,
      },
    ],
    type: "package",
    details: {
      packageName: `${capitalize(healthPackage.name)} - Health Package`,
      packageDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quam enim, tempus vel finibus ut, gravida aliquet augue. Duis dui ipsum, ultricies non velit pulvinar, viverra blandit nulla.",
    },

    discount: patient?.familyDiscount || 0,
    usersState: {
      selectedUser,
      setSelectedUser,
    },
    isSubscribing: true,
    onPaymentSuccess: () => {
      subscribeToHealthPackage({
        receiverId: selectedUser._id,
        _id: healthPackage._id,
      });

      setToast({
        ...toast,
        open: true,
        color: "success",
        message: "Payment completed successfully!",
      });

      setTimeout(() => {
        navigate("/patient/");
      }, 1500);
      // Subscribe route
    },

    onPaymentFailure: () => {
      setToast({
        ...toast,
        open: true,
        color: "danger",
        message: "Payment unsuccessful",
      });
    },
  };

  return (
    <Box sx={{ my: 5, mx: 20 }}>
      <PaymentPage {...config} />
      <Toast {...toast} onClose={onToastClose} />
    </Box>
  );
}

export default PackagePaymentWrapper;
