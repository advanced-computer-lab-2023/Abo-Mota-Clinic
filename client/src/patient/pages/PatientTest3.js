import axios from "axios";
import PaymentSummary from "../components/PaymentSummary";

function PatientTest3() {


  const items = [
    {
      name: "Consultation",
      price: 500
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
    <PaymentSummary patient={patient} doctor={doctor} deductible={100} items={items} discount={discount} />
  );
}

export default PatientTest3;