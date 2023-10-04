import './styles.css'
import {AiOutlineSearch} from 'react-icons/ai'
const SearchBar = ({value, onChange}) => {
  return (
      <div className="search-bar-container">
          <input id='search' className='search-bar' type="text" placeholder="Search" value={value} onChange={onChange}/>
          <label className='search-label' htmlFor='search' ><AiOutlineSearch size={30}/></label>
      </div>
  );
};

export default SearchBar;