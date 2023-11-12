import { useParams } from "react-router-dom";
import { useFetchPackagesPatientQuery, useFetchPatientQuery } from "../../store";
import PaymentPage from "./PaymentPage";
import { Box } from "@mui/joy";
import capitalize from "../utils/capitalize";

function PackagePaymentWrapper() {
  const { idx } = useParams();
  const { data: packagesData, isFetching: isFetchingPackages, error: isErrorPackages } = useFetchPackagesPatientQuery();
  const { data: patient, isFetching: isFetchingPatient, error: isErrorPatient } = useFetchPatientQuery();

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
      packageDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quam enim, tempus vel finibus ut, gravida aliquet augue. Duis dui ipsum, ultricies non velit pulvinar, viverra blandit nulla.",
    },

    discount: patient?.familyDiscount || 0,

    onPaymentSuccess: () => {
      alert("Payment successful");
      // Subscribe route
    },

    onPaymentFailure: () => {
      console.log("Payment failed");
    },
  }

  return (
    <Box sx={{my: 5, mx: 20}}>
      <PaymentPage {...config} />
    </Box>
  )
}

export default PackagePaymentWrapper;