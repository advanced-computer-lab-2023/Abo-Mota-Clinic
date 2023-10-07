import {BiFilter} from 'react-icons/bi'
import './styles.css';
import { useState } from 'react';

const FilterButton = ({options, filter, setFilter}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('Filter Usage');
  const onClick = (event) => {
    setOpen(!open);
  }

  const extension = options.map((option, index) => {
    const onClick = (event) => {
      if(option === selected){
        setFilter('');
        setSelected('Filter Usage');
      }else{
        setFilter(option);
        setSelected(option);
      }
      setOpen(false);
    }
    const selectedClass = option === filter ? 'filter-selected' : '';
    return (
      <div key={index} className={`filter-entry ${selectedClass}`} onClick={onClick}>
        {option}
      </div>
    );
  });

  const extraClass = open ? 'filter-button-open' : '';
  return (
    <div className={`filter-container ${extraClass}`} onClick={onClick}>
      <div className='filter-button'>
        <div className='filter-header'>
          <BiFilter color='#fff' size={22}/>
          <div className='filter-title'>{selected}</div>
        </div>
      </div>
      {open ? 
      <div className='filter-button-extension'>
        {extension}
      </div>
      : <></>}
    </div>
  );
};

export default FilterButton;