import { useNavigate, useParams } from "react-router-dom";
import {
  // useFetchPackagesPatientQuery,
  useFetchPatientQuery,
  // useSubscribeToHealthPackageMutation,
  useFetchPrescriptionsQuery,
  useOrderPrescriptionMutation,
} from "../../store";
import PaymentPage from "./PaymentPage";
import { Box } from "@mui/joy";
import capitalize from "../utils/capitalize";
import { useState } from "react";
import Toast from "../components/Toast";

function PrescriptionPaymentWrapper() {
  const { idx } = useParams();
  const navigate = useNavigate();

  const { data: prescriptions, isFetching: isFetchingPrescriptions, error: isErrorPrescriptions } = useFetchPrescriptionsQuery();
  const [orderPrescription, results] = useOrderPrescriptionMutation();

  const {
    data: patient,
    isFetching: isFetchingPatient,
    error: isErrorPatient,
  } = useFetchPatientQuery();

  const [toast, setToast] = useState({
    open: false,
    duration: 4000,
  });

  const [selectedUser, setSelectedUser] = useState(-1);

  const onToastClose = (event, reason) => {
    if (reason === "clickaway") return;

    setToast({
      ...toast,
      open: false,
    });
  };

  if (isFetchingPatient || isFetchingPrescriptions) {
    return <div>Loading...</div>;
  }

  const prescription = prescriptions[idx];

  const items = prescription.medicines.map((prescriptionItem) => {
    const { medicine: { name, price } } = prescriptionItem;
    return {
      label: name,
      price: price,
    };
  });

  const config = {
    items,

    type: "prescription",

    details: {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quam enim, tempus vel finibus ut, gravida aliquet augue. Duis dui ipsum, ultricies non velit pulvinar, viverra blandit nulla.",
    },

    usersState: {},

    //TODO: Keep discount if cancelled? or unsubscribed? can't remember
    discount: patient.healthPackage?.package?.pharmacyDiscount || 0,

    onPaymentSuccess: () => {
      orderPrescription({ prescriptionId: prescription._id });

      setToast({
        ...toast,
        open: true,
        color: "success",
        message: "Prescription purchased successfully!",
      });

      setTimeout(() => {
        navigate("/patient/");
      }, 1500);
    },

    onPaymentFailure: () => {
      setToast({
        ...toast,
        open: true,
        color: "danger",
        message: "Prescription purchase unsuccessful",
      });
    },

    backNav: [
      {
        to: "/patient/",
        label: "Home",
      },
      {
        to: "/patient/prescriptions",
        label: "Prescriptions",
      },
    ],
  };

  return (
    <Box sx={{ my: 5, mx: 20 }}>
      <PaymentPage {...config} />
      <Toast {...toast} onClose={onToastClose} />
    </Box>
  );
}

export default PrescriptionPaymentWrapper;
