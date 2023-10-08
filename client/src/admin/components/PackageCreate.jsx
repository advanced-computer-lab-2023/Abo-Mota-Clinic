import '../styles.css';
import { nanoid } from "nanoid";
import { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";

function PackageCreate({createPackage}){
    const[create, setCreate] = useState(false);
    const initialDiscount = [
        {type: 'doctor', content: ''},
        {type: 'medicine', content: ''},
        {type: 'family', content: ''}
    ]
    const [updatedPackage, setUpdatedPackage] = useState({name: '', discounts: initialDiscount, cost: 0});

    const handleNameChange = (event) => {
        setUpdatedPackage({...updatedPackage, name: event.target.value});
    }

    const handleCostChange = (event) => {
        setUpdatedPackage({...updatedPackage, cost: parseInt(event.target.value)});
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

    const handleSubmit = (event) => {
        event.preventDefault();
        createPackage(updatedPackage);
        setCreate(false);
        setUpdatedPackage({id: nanoid(), name: '', discounts: initialDiscount, cost: 0})
    }

    const handleClick = () => setCreate(true);

    let content = <FiPlusCircle color='lightgray' className='plus-icon' onClick={handleClick} />

    if(create){
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
                    <input className="input" type="number" value={updatedPackage.cost || ''} onChange={handleCostChange}/>
                    <button className="package-button">Done</button>
                </form>
            </div>
            )
    }

    return <div className="card">{content}</div>

}

export default PackageCreate;