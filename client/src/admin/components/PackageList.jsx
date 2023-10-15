import '../styles.css';
import Package from './PackageShow'
import PackageCreate from "./PackageCreate";
import { useFetchPackagesQuery } from '../../store';


function PackageList() {
    
    const {data,error,isFetching} = useFetchPackagesQuery();
	
    return (
        <div>
            {isFetching && <div>Loading.....</div>}
            {!isFetching && 
                <div className='flex flex-wrap'>
                    {data.map((p) => (
                        <div key={p.id}>
                            <Package data={p}/>
                        </div>
                    ))}
                    <PackageCreate />

                </div> 

            }

        </div>
    );
}

export default PackageList;
