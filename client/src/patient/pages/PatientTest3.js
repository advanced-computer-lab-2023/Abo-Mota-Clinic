import axios from "axios";
import PaymentSummary from "../components/PaymentSummary";

function PatientTest3() {


  const items = [
    {
      name: "Consultation",
      price: 500
    },
    {
      name: "Follow Up",
      price: 200
    }
  ]

  // const subtotal = items.reduce((acc, item) => acc + item.price, 0);
  const discount = 0.1;


  const patient = {
    healthPackage: {
      package: {
        name: "silver"
      }
    }
  };

  const doctor = {
    rate: 500
  };

  return (
    <PaymentSummary items={items} discount={discount} optionalHeaders={undefined} />
  );
}

export default PatientTest3;