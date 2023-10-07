import './styles.css'
import {AiOutlineSearch} from 'react-icons/ai'
const SearchBar = ({value, onChange, className}) => {
  const extendedClass = className ? className : '';
  return (
      <div className={`search-bar-container ${extendedClass}`}>
          <input id='search' className='search-bar' type="text" placeholder="Search" value={value} onChange={onChange}/>
          <label className='search-label' htmlFor='search' ><AiOutlineSearch size={30}/></label>
      </div>
  );
};

export default SearchBar;