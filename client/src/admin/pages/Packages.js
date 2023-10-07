import '../components/styles.css';
import { useState } from "react";
import {nanoid} from "nanoid";
import PackageCreate from '../components/PackageCreate';
import PackageList from '../components/PackageList';

function Packages(){
    const silverDiscounts = [
		{type: "doctor", content: "40% off any doctor's session price"},
		{type: "medicine", content: "20% off any medicine ordered from pharmacy platform"},
		{type: "family", content: "10% discount on the subscription of any of his family members in any package"}
	];
	const goldDiscounts = [
		{type: "doctor", content: "60% off any doctor's session price"},
		{type: "medicine", content: "30% off any medicine ordered from pharmacy platform"},
		{type: "family", content: "15% discount on the subscription of any of his family members in any package"}
	];
	const platinumDiscounts = [
		{type: "doctor", content: "80% off any doctor's session price"},
		{type: "medicine", content: "40% off any medicine ordered from pharmacy platform"},
		{type: "family", content: "20% discount on the subscription of any of his family members in any package"}
	];

    const initialPackages = [
		{
			id: nanoid(),
			name:"Silver",
			discounts:silverDiscounts,
			cost: 3600
		},
		{
			id: nanoid(),
			name:"Gold",
			discounts:goldDiscounts,
			cost: 6000
		},
		{
			id: nanoid(),
			name:"Platinum",
			discounts:platinumDiscounts,
			cost: 9000
		}
	];

	const [packages, setPackages] = useState(initialPackages);

    const handleCreate = (updatedPackage) => {
        const updatedPackages = [...packages, {id: nanoid(), name: updatedPackage.name, discounts: updatedPackage.discounts, cost: updatedPackage.cost}];
        setPackages(updatedPackages);
    }

    const handleDelete = (id) => {
        const updatedPackages = packages.filter((p) => p.id!==id);
        setPackages(updatedPackages);
    }

    const handleEdit = (updatedPackage) => {
		const updatedPackages = packages.map((p) => {
			if(p.id===updatedPackage.id){
				return updatedPackage;
			}
			return p;
		})
        setPackages(updatedPackages);
    }


    return <div className="card-list">
        <PackageList packages={packages} editPackage={handleEdit} deletePackage={handleDelete}/>
        <PackageCreate createPackage={handleCreate} />
    </div>
}

export default Packages;