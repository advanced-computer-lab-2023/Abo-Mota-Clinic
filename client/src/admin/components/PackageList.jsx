import '../styles.css';
import Package from './PackageShow'

function PackageList({packages, editPackage, deletePackage}) {
    const handleEditPackage = (p) => editPackage(p);

	const handleDeletePackage = (id) => deletePackage(id);
	
	return packages.map((p) => {
		return (
            <div key={p.id}>
                <Package id={p.id} name={p.name} discounts={p.discounts} cost={p.cost}
                onEdit= {handleEditPackage}
		        onDelete={handleDeletePackage}/>
            </div>
        )})
}

export default PackageList;
