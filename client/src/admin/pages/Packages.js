import '../styles.css';
import PackageCreate from '../components/PackageCreate';
import PackageList from '../components/PackageList';

function Packages(){
    return <div className="flex m-10 flex-wrap">
        <PackageList  />
    </div>
}

export default Packages;

