import '../styles.css';
import Package from './PackageShow'
import { useFetchPackagesQuery } from '../../store';


function PackageList() {
    
    const {data,error,isFetching} = useFetchPackagesQuery();
	
    return (
        <div>
            {isFetching && <div>Loading.....</div>}
            {!isFetching && 
                <div>
                    {data.map((p) => (
                        <div key={p.id}>
                            <Package data={p}/>
                        </div>
                    ))}
                </div> 
            }
        </div>
    );
}

export default PackageList;
