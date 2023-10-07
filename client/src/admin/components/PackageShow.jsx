import { FiCheck, FiEdit2, FiX } from "react-icons/fi";
import '../styles.css';
import { useState } from "react";

function Package({id, name, discounts, cost, onEdit, onDelete}) {
    const [edit, setEdit] = useState(false);
    const [updatedPackage, setUpdatedPackage] = useState({id, name, discounts, cost});

    const renderedDiscounts = discounts.map((discount) => {
        return <div key={discount.type} className="discount">
        {discount.content && <FiCheck className="icon"/>}
        {discount.content}
        </div>
    })

    const handleDelete = () => onDelete(id);

    const handleEdit = () => setEdit(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        onEdit(updatedPackage);
        setEdit(false);
    }

    const handleNameChange = (event) => {
        setUpdatedPackage({...updatedPackage, name: event.target.value});
    }

    const handleD1Change = (event) => {
        const updatedDiscounts = [...updatedPackage.discounts];
        updatedDiscounts[0] = { ...updatedDiscounts[0], content: event.target.value };
        setUpdatedPackage({ ...updatedPackage, discounts: updatedDiscounts });
      };
      
      const handleD2Change = (event) => {
        const updatedDiscounts = [...updatedPackage.discounts];
        updatedDiscounts[1] = { ...updatedDiscounts[1], content: event.target.value };
        setUpdatedPackage({ ...updatedPackage, discounts: updatedDiscounts });
      };
      
      const handleD3Change = (event) => {
        const updatedDiscounts = [...updatedPackage.discounts];
        updatedDiscounts[2] = { ...updatedDiscounts[2], content: event.target.value };
        setUpdatedPackage({ ...updatedPackage, discounts: updatedDiscounts });
      };
      

    const handleCostChange = (event) => {
        setUpdatedPackage({...updatedPackage, cost: event.target.value})
    }

    let content = (
        <div>
            <FiEdit2 className="icon" onClick={handleEdit}/>
            <FiX className="x-icon" onClick={handleDelete}/>
            <h2 className="card-title">{name}</h2>
            <hr className="card-hr" />
            <div className="card-body">{renderedDiscounts}</div>
            <hr className="card-hr" />
            <div className="card-bottom">
            <p className="cost-content">{cost} L.E /year</p>
            <button className="package-button">{`Start now  >`}</button>
            </div>
        </div>
        )

    if(edit){
        content = (
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Name</label>
                    <input className="input" value={updatedPackage.name} onChange={handleNameChange}/>
                    <hr className="card-hr" />
                    <label>Discount 1</label>
                    <input className="input" value={updatedPackage.discounts[0].content} onChange={handleD1Change}/>
                    <label>Discount 2</label>
                    <input className="input" value={updatedPackage.discounts[1].content} onChange={handleD2Change}/>
                    <label>Discount 3</label>
                    <input className="input" value={updatedPackage.discounts[2].content} onChange={handleD3Change}/>
                    <hr className="card-hr" />
                    <label>Cost</label>
                    <input className="input" type="number" value={updatedPackage.cost} onChange={handleCostChange}/>
                    <button className="package-button">Done</button>
                </form>
            </div>
            )
    }

    return <div className="card">{content}</div>
}

export default Package;