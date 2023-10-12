import "../styles.css";
import { nanoid } from "nanoid";
import { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { useAddPackageMutation } from "../../store";

function PackageCreate() {
  const [createPackage, results] = useAddPackageMutation();
  const [create, setCreate] = useState(false);
  const initialDiscount = [
    { type: "doctor", content: "" },
    { type: "medicine", content: "" },
    { type: "family", content: "" },
  ];
  const [updatedPackage, setUpdatedPackage] = useState({
    pricePerYear: 0,
    doctorDiscount: 0,
    pharmacyDiscount: 0,
    familyDiscount: 0,
    name: "",
  });

  const handleNameChange = (event) => {
    setUpdatedPackage({ ...updatedPackage, name: event.target.value });
  };

  const handleCostChange = (event) => {
    setUpdatedPackage({ ...updatedPackage, pricePerYear: parseInt(event.target.value) });
  };

  const handleD1Change = (event) => {
    setUpdatedPackage({ ...updatedPackage, doctorDiscount: event.target.value });
  };

  const handleD2Change = (event) => {
    setUpdatedPackage({ ...updatedPackage, pharmacyDiscount: event.target.value });
  };

  const handleD3Change = (event) => {
    setUpdatedPackage({ ...updatedPackage, familyDiscount: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(updatedPackage);
    await createPackage(updatedPackage);
    setCreate(false);
    setUpdatedPackage({ id: nanoid(), name: "", discounts: initialDiscount, cost: 0 });
  };

  const handleClick = () => setCreate(true);

  let content = <FiPlusCircle color="lightgray" className="plus-icon" onClick={handleClick} />;

  if (create) {
    content = (
      <div>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input className="input" value={updatedPackage.name} onChange={handleNameChange} />
          <hr className="card-hr" />
          <label>Discount 1</label>
          <input
            className="input"
            value={updatedPackage.doctorDiscount || ""}
            onChange={handleD1Change}
          />
          <label>Discount 2</label>
          <input
            className="input"
            value={updatedPackage.pharmacyDiscount || ""}
            onChange={handleD2Change}
          />
          <label>Discount 3</label>
          <input
            className="input"
            value={updatedPackage.familyDiscount || ""}
            onChange={handleD3Change}
          />
          <hr className="card-hr" />
          <label>Cost</label>
          <input
            className="input"
            type="number"
            value={updatedPackage.pricePerYear || ""}
            onChange={handleCostChange}
          />
          <button className="package-button">Done</button>
        </form>
      </div>
    );
  }

  return <div className="card">{content}</div>;
}

export default PackageCreate;
