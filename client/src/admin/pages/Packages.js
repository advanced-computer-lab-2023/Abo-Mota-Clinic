import '../styles.css';
import PackageCreate from '../components/PackageCreate';
import PackageList from '../components/PackageList';

function Packages(){
    return <div className="card-list">
        <PackageList  />
        <PackageCreate />
    </div>
}

export default Packages;