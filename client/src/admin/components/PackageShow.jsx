import { FiCheck, FiEdit2, FiX } from "react-icons/fi";
import "../styles.css";
import { useState } from "react";
import { useUpdatePackageMutation, useDeletePackageMutation } from "../../store";

function Package({ data }) {
  const [edit, setEdit] = useState(false);
  const [pack, setUpdatedPackage] = useState(data);

  const [updatedPackage, result] = useUpdatePackageMutation();
  const [deletePackage, result2] = useDeletePackageMutation();

  const renderedDiscounts = (
    <>
      <div style={{display: "flex"}}>
        {data.pharmacyDiscount && <FiCheck className="check-icon"/>}
        {data.pharmacyDiscount}% off any medicine ordered from pharmacy platform
      </div>
      <br/>
      <div style={{display: "flex"}}>
        {data.doctorDiscount && <FiCheck className="check-icon"/>}
        {data.doctorDiscount}% off any doctor's session price
      </div>
      <br/>
      <div style={{display: "flex"}}>
        {data.familyDiscount && <FiCheck className="check-icon"/>}
        {data.familyDiscount}% discount on the subscription of any of his family members in any package
      </div>
    </>
  );
  const handleDelete = async () => {
    await deletePackage(data);
  };
  const handleEdit = () => setEdit(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    // const body = data;
    console.log(pack);
    // if(pack.name!=='')
    //   body.name = pack.name;
    // if(pack.pharmacyDiscount!=='')
    //   body.pharmacyDiscount= pack.pharmacyDiscount;
    // if(pack.doctorDiscount!=='')
    //   body.doctorDiscount= pack.doctorDiscount
    // if(pack.familyDiscount!=='')
    //   body.familyDiscount= pack.familyDiscount;
    // if(pack.pricePerYear!=='')
    //   body.pricePerYear= pack.pricePerYear;
    updatedPackage(pack);
    setEdit(false);
  };

  const handleNameChange = (event) => {
    setUpdatedPackage({ ...pack, name: event.target.value });
  };

  const handleDoctorDiscountChange = (event) => {
    setUpdatedPackage({ ...pack, doctorDiscount: event.target.value });
  };
  const handlePharmacyDiscountChange = (event) => {
    setUpdatedPackage({ ...pack, pharmacyDiscount: event.target.value });
  };
  const handleFamilyDiscountChange = (event) => {
    setUpdatedPackage({ ...pack, familyDiscount: event.target.value });
  };

  const handleCostChange = (event) => {
    setUpdatedPackage({ ...pack, pricePerYear: event.target.value });
  };

  let content = (
    <div>
      <div className="card-top">
        <FiEdit2 className="edit-icon" onClick={handleEdit} />
        <FiX className="x-icon" onClick={handleDelete} />
      </div>
      <h2 className="card-title">{data.name}</h2>
      <hr className="card-hr" />
      <div>{renderedDiscounts}</div>
      <hr className="card-hr" />
      <div className="card-bottom">
        <p className="cost-content">{data.pricePerYear} L.E /year</p>
        <button className="package-button">{`Start now  >`}</button>
      </div>
    </div>
  );

  if (edit) {
    content = (
      <div>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input className="input" value={pack.name} onChange={handleNameChange} />
          <hr className="card-hr" />
          <>
            <div>
              <label>Doctor discount</label>
              <input
                className="input"
                value={pack.doctorDiscount}
                onChange={(event) => handleDoctorDiscountChange(event)}
              />
            </div>
            <div>
              <label>Pharmacy discount</label>
              <input
                className="input"
                value={pack.pharmacyDiscount}
                onChange={(event) => handlePharmacyDiscountChange(event)}
              />
            </div>
            <div>
              <label>Family discount</label>
              <input
                className="input"
                value={pack.familyDiscount}
                onChange={(event) => handleFamilyDiscountChange(event)}
              />
            </div>
          </>

          <hr className="card-hr" />
          <label>Cost</label>
          <input
            className="input"
            type="number"
            value={pack.pricePerYear}
            onChange={handleCostChange}
          />
          <button className="package-button">Done</button>
        </form>
      </div>
    );
  }

  return <div className={`card ${edit ? "edit-mode" : ""}`}>{content}</div>;
}

export default Package;
